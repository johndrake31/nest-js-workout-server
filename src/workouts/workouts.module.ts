import { Module } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsEntity } from './workout.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutsEntity, UserEntity]), UserModule],
  providers: [
    WorkoutsService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [WorkoutsController],
})
export class WorkoutsModule {}
