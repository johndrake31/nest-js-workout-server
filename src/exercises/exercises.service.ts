import { Injectable } from '@nestjs/common';
import { ExerciseEntity } from './exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { authJwt } from 'src/shared/auth';
import { WorkoutsEntity } from 'src/workouts/workout.entity';
import { CreateExerciseDTO } from './dto/create-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(ExerciseEntity)
    private readonly exerciseRepo: Repository<ExerciseEntity>,
    @InjectRepository(WorkoutsEntity)
    private woRepo: Repository<WorkoutsEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async create(exercise: CreateExerciseDTO, jwt: string) {
    const token = await authJwt(jwt);
    if (!token) return 'Invalid token';
    const user = await this.userRepo.findOneBy({ id: token.id });
    const workout = await this.woRepo.findOneOrFail({
      where: { user: { id: user.id }, id: exercise.workoutId },
    });

    if (!user || !workout) return 'Problems!!!!';
    if (user && workout) {
      const newEx = this.exerciseRepo.create(exercise);
      newEx.workout = workout;
      return await this.exerciseRepo.save(newEx);
    }
  }
}
