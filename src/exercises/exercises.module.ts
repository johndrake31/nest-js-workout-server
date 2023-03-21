/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { WorkoutsEntity } from 'src/workouts/workout.entity';
import { WorkoutsModule } from 'src/workouts/workouts.module';
import { ExerciseEntity } from './exercise.entity';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';

@Module({
    imports: [TypeOrmModule.forFeature([ExerciseEntity, WorkoutsEntity, UserEntity]), WorkoutsModule, UserModule],
    providers: [ExercisesService],
    controllers: [ExercisesController],
})

export class ExercisesModule { }
