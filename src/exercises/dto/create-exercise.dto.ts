import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsArray,
  IsNumber,
  IsBoolean,
} from 'class-validator';
//  @ValidateNested({ each: true })
export class CreateExerciseDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsArray()
  sets: number[];

  @IsArray()
  reps: number[];

  @IsNumber()
  weight: number;

  @IsBoolean()
  metric: boolean;

  @IsBoolean()
  timed: boolean;

  @IsNumber()
  timer?: number;

  @IsNumber()
  workoutId?: number;
}
