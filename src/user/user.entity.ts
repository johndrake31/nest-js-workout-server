/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

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

  @Column({ type: 'varchar', length: 500 })
  password: string;
}
