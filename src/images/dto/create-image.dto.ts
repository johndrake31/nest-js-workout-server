import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateImageDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDate()
  dateCreated: Date;

  @IsString()
  workoutId: number;

  @IsString()
  exerciseId: number;
}

export class CreateImageIdDto {
  @IsString()
  workoutId: number;

  @IsString()
  exerciseId: number;
}
