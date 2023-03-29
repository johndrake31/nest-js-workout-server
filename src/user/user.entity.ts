/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { WorkoutsEntity } from 'src/workouts/workout.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Injectable()
@Unique(['email'])
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 500 })
  firstName: string;

  @Column({ type: 'varchar', length: 500 })
  lastName: string;

  @Column({ type: 'varchar', length: 500 })
  email: string;

  @Column({ type: 'varchar', length: 500, select: false})
  password: string;
  
  @Column('simple-array', )
  roles: string[];


  @OneToMany(
    () => WorkoutsEntity,
    (workoutsEntity) => workoutsEntity.user,
    { cascade: ['insert', 'update'], onDelete: 'CASCADE' },
  )
  @JoinColumn()
  workouts: WorkoutsEntity[];


  @ManyToMany(
    () => WorkoutsEntity,
    (workoutsEntity) => workoutsEntity.user,
  )
  @JoinTable({ name: 'favoriteWorkouts' })
  favoriteWorkouts: WorkoutsEntity[];
}
