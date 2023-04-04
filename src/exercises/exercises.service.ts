import { Injectable } from '@nestjs/common';
import { ExerciseEntity } from './exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { authJwt } from 'src/shared/auth';
import { WorkoutsEntity } from 'src/workouts/workout.entity';
import { CreateExerciseDTO } from './dto/create-exercise.dto';
import { UpdateExerciseDTO } from './dto/update-exercise.dto';
import { isInArray } from 'src/shared/tools/is-in-array';
import { Role } from 'src/shared/types/role.enum';
import { IExercise } from './exercises.interface';

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

  // TODO: find all by user id
  async findAll(jwt: string): Promise<IExercise[] | string> {
    const token = await authJwt(jwt);
    if (!token) return 'Invalid token';
    if (isInArray(token.roles, Role.SuperAdmin)) {
      return await this.exerciseRepo.find();
    }
    return 'invalid request';
  }

  async updateById(
    id: number,
    exUpdate: UpdateExerciseDTO,
    jwt: string,
  ): Promise<UpdateResult | string> {
    const token = await authJwt(jwt);
    if (!token) return 'Invalid token';
    const exercise = await this.exerciseRepo.findOneBy({
      id,
    });

    if (exercise.workout.id) {
      console.log(exercise.workout.id);
      const user = await this.userRepo.findOneBy({ id: token.id });
      const workout = await this.woRepo.findOneOrFail({
        where: { user: { id: user.id }, id: exercise.workout.id },
      });
      if (workout) {
        return await this.exerciseRepo.update(id, exUpdate);
      }
    }
    return 'error';
  }

  async deleteById(id: number, jwt: string): Promise<DeleteResult | string> {
    const token = await authJwt(jwt);
    if (!token) return 'Invalid token';
    if (isInArray(token.roles, Role.SuperAdmin)) {
      return await this.exerciseRepo.delete(id);
    }

    const exercise = await this.exerciseRepo.findOneBy({
      id,
    });
    if (exercise.workout.id) {
      const user = await this.userRepo.findOneBy({ id: token.id });
      const workout = await this.woRepo.findOneOrFail({
        where: { user: { id: user.id }, id: exercise.workout.id },
      });
      if (workout) {
        return await this.exerciseRepo.delete(id);
      }
    }
    return 'error';
  }
}
