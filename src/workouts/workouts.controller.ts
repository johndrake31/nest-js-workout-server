import { Body, Controller, Post, Headers, UseGuards } from '@nestjs/common';
import { CreateWorkoutDTO } from './dto/create-workout.dto';
import { WorkoutsEntity } from './workout.entity';
import { WorkoutsService } from './workouts.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/shared/roles.decorator';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutServ: WorkoutsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async addWorkout(
    @Body() workout: CreateWorkoutDTO,
    @Headers('Authorization') head: any,
  ): Promise<WorkoutsEntity | string> {
    return await this.workoutServ.create(workout, head);
  }
}
