import {
  Body,
  Controller,
  Headers,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateExerciseDTO } from './dto/create-exercise.dto';
import { ExerciseEntity } from './exercise.entity';
import { ExercisesService } from './exercises.service';
import { Express } from 'express';

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

  @Post(':upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return file;
  }
}
