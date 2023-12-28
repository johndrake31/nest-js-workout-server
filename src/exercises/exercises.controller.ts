import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateExerciseDTO } from './dto/create-exercise.dto';
import { ExerciseEntity } from './exercise.entity';
import { IExercise } from './exercises.interface';
import { ExercisesService } from './exercises.service';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateExerciseDTO } from './dto/update-exercise.dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exerciseServ: ExercisesService) {}

  //create new exercise
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() exercise: CreateExerciseDTO,
    @Headers('Authorization') head: any,
  ): Promise<ExerciseEntity | string> {
    return await this.exerciseServ.create(exercise, head);
  }

  //UPDATE BY ID
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Body() workout: UpdateExerciseDTO,
    @Headers('Authorization') head: any,
    @Param('id') id: number,
  ): Promise<string | UpdateResult> {
    return await this.exerciseServ.updateById(id, workout, head);
  }

  //Get ALL Exercises AUTH ONLY
  //TODO: Add Roles Guard
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async FindAll(
    @Headers('Authorization') head: any,
  ): Promise<IExercise[] | string> {
    return await this.exerciseServ.findAll(head);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async FindOne(
    @Param('id') id,
    @Headers('Authorization') head: any,
  ): Promise<ExerciseEntity | string> {
    return await this.exerciseServ.getById(id, head);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async DeleteOne(
    @Param('id') id,
    @Headers('Authorization') head: any,
  ): Promise<DeleteResult | string> {
    return await this.exerciseServ.deleteById(id, head);
  }
}
