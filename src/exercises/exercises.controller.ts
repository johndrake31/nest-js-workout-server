import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { CreateExerciseDTO } from './dto/create-exercise.dto';
import { ExerciseEntity } from './exercise.entity';
import { ExercisesService } from './exercises.service';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exerciseServ: ExercisesService) {}

  @Post()
  async create(
    @Body() exercise: CreateExerciseDTO,
    @Headers('Authorization') head: any,
  ): Promise<ExerciseEntity | string> {
    return await this.exerciseServ.create(exercise, head);
  }

  @Get(':id')
  async FindOne(
    @Param('id') id,
    @Headers('Authorization') head: any,
  ): Promise<ExerciseEntity | string> {
    return await this.exerciseServ.getById(id, head);
  }
}
