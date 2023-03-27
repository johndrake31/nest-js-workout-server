import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class ImagesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  mimetype: string;

  @CreateDateColumn()
  dateCreated: Date;

  @Column({ type: 'bigint', nullable: true })
  workoutId: number;

  @Column({ type: 'bigint', nullable: true })
  exerciseId: number;
}
