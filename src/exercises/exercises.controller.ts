import { Body, Controller, Headers, Post } from '@nestjs/common';
import { CreateExerciseDTO } from './dto/create-exercise.dto';
import { ExerciseEntity } from './exercise.entity';
import { ExercisesService } from './exercises.service';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exerciseServ: ExercisesService) {}

  @Post()
  async authUser(
    @Body() exercise: CreateExerciseDTO,
    @Headers('Authorization') head: any,
  ): Promise<ExerciseEntity | string> {
    return await this.exerciseServ.create(exercise, head);
  }
}
