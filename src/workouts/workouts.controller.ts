import {
  Body,
  Controller,
  Post,
  Headers,
  UseGuards,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateWorkoutDTO } from './dto/create-workout.dto';
import { WorkoutsEntity } from './workout.entity';
import { WorkoutsService } from './workouts.service';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult, UpdateResult } from 'typeorm';
import { IWorkout } from './workouts.interface';
import { UpdateWorkoutDTO } from './dto/update-workout.dto';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutServ: WorkoutsService) {}

  //Create Workout Methode
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async add(
    @Body() workout: CreateWorkoutDTO,
    @Headers('Authorization') head: any,
  ): Promise<WorkoutsEntity | string> {
    return await this.workoutServ.create(workout, head);
  }

  //UPDATE BY ID
  @UseGuards(AuthGuard('jwt'))
  @Post(':id')
  async update(
    @Body() workout: UpdateWorkoutDTO,
    @Headers('Authorization') head: any,
    @Param('id') id: number,
  ): Promise<string | UpdateResult> {
    return await this.workoutServ.updateById(id, workout, head);
  }

  //Get by ID
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(
    @Param('id') id,
    @Headers('Authorization') jwt: string,
  ): Promise<IWorkout | string> {
    return await this.workoutServ.getById(+id, jwt);
  }

  //Delete One
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteById(
    @Param('id') id: number | string,
    @Headers('Authorization') jwt: any,
  ): Promise<DeleteResult | string> {
    return await this.workoutServ.deleteOneById(+id, jwt);
  }

  //TODO: ADD ROLES GUARD
  //Get All
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async workouts(
    @Headers('Authorization') jwt: string,
  ): Promise<IWorkout[] | string> {
    return await this.workoutServ.findAll(jwt);
  }
}
