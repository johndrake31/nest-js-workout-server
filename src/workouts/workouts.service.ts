import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { WorkoutsEntity } from './workout.entity';
import { CreateWorkoutDTO } from './dto/create-workout.dto';
import { UpdateWorkoutDTO } from './dto/update-workout.dto';

import { UserEntity } from 'src/user/user.entity';
import { authJwt } from 'src/shared/auth';
import { IWorkout } from './workouts.interface';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(WorkoutsEntity)
    private readonly woRepo: Repository<WorkoutsEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async create(workout: CreateWorkoutDTO, jwt: string) {
    const token = await authJwt(jwt);
    if (!token) return 'Invalid token';

    //Email is the only unique identifier
    const user = await this.userRepo.findOneBy({ email: token.email });
    if (!user) return 'Problems!!!!';

    if (user) {
      const newWO = this.woRepo.create(workout);
      newWO.user = user;
      const newWorkout = await this.woRepo.save(newWO);
      return newWorkout;
    }
  }

  async getById(id: number, jwt: string): Promise<WorkoutsEntity | string> {
    const token = await authJwt(jwt);
    if (!token) return 'Invalid token';
    const workout = await this.woRepo.findOneOrFail({
      where: { user: { id: token.id }, id },
    });
    if (workout) return workout;
    return 'error';
  }

  async updateById(
    id: number,
    wo: UpdateWorkoutDTO,
    jwt: string,
  ): Promise<UpdateResult | string> {
    const token = await authJwt(jwt);
    if (!token) return 'Invalid token';

    //check user and workout match
    const workout = await this.woRepo.findOneOrFail({
      where: { user: { id: token.id }, id },
    });

    if (workout) {
      return await this.woRepo.update(id, wo);
    }
    return 'error';
  }

  async deleteOneById(id: number, jwt: string): Promise<DeleteResult | string> {
    // add jwt check logic;
    return await this.woRepo.delete(id);
  }
  async findAll(jwt: string): Promise<IWorkout[] | string> {
    // add jwt check logic;
    return await this.woRepo.find();
  }
}
