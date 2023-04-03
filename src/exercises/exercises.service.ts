import { Injectable } from '@nestjs/common';
import { ExerciseEntity } from './exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { authJwt } from 'src/shared/auth';
import { WorkoutsEntity } from 'src/workouts/workout.entity';
import { CreateExerciseDTO } from './dto/create-exercise.dto';
import { UpdateExerciseDTO } from './dto/update-exercise.dto';
import { isInArray } from 'src/shared/tools/is-in-array';
import { Role } from 'src/shared/types/role.enum';

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

  async getById(id: number, jwt: string): Promise<ExerciseEntity | string> {
    const token = await authJwt(jwt);
    if (!token) return 'Invalid token';
    const exercise = await this.exerciseRepo.findOneBy({
      id,
    });
    // Normal USER
    if (exercise.workout.id) {
      const user = await this.userRepo.findOneBy({ id: token.id });
      const workout = await this.woRepo.findOneOrFail({
        where: { user: { id: user.id }, id: exercise.workout.id },
      });
      if (workout) return exercise;
    }
    // Admin USER
    if (isInArray(token.roles, Role.SuperAdmin)) {
      return await this.exerciseRepo.findOneBy({ id });
    }
    return 'error';
  }

  // async updateById(
  //   id: number,
  //   exercise: UpdateExerciseDTO,
  //   jwt: string,
  // ): Promise<UpdateResult | string> {
  //   const token = await authJwt(jwt);
  //   if (!token) return 'Invalid token';
  //   const user = await this.userRepo.findOneBy({ id: token.id });
  //   const workout = await this.woRepo.findOneOrFail({
  //     where: { user: { id: user.id }, id: exercise.workoutId },
  //   });

  //   if (!user || !workout) return 'Problems!!!!';
  //   if (user && workout) {
  //     return 'add code';
  //   }
  //   return 'error';
  // }
}
