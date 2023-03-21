import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WorkoutsEntity } from './workout.entity';
import { CreateWorkoutDTO } from './dto/create-workout.dto';

import { UserEntity } from 'src/user/user.entity';
import { authJwt } from 'src/shared/auth/auth';

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
    const user = await this.userRepo.findOneBy({ email: token.email });
    if (!user) return 'Problems!!!!';
    if (user) {
      const newWO = this.woRepo.create(workout);

      newWO.user = user;
      console.log({ newWO });
      const newWorkout = await this.woRepo.save(newWO);
      return newWorkout;
    }
  }
}
