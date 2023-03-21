import { Body, Controller, Post, Headers } from '@nestjs/common';
import { CreateWorkoutDTO } from './dto/create-workout.dto';
import { WorkoutsEntity } from './workout.entity';
import { WorkoutsService } from './workouts.service';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutServ: WorkoutsService) {}

  @Post()
  async authUser(
    @Body() workout: CreateWorkoutDTO,
    @Headers('Authorization') head: any,
  ): Promise<WorkoutsEntity | string> {
    return await this.workoutServ.create(workout, head);
  }
}
