import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsEntity } from './workout.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutsEntity, UserEntity]), UserModule],
  providers: [WorkoutsService],
  controllers: [WorkoutsController],
})
export class WorkoutsModule {}
