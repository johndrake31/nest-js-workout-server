import { IsString, IsArray, IsNumber, IsBoolean } from 'class-validator';
//  @ValidateNested({ each: true })
export class UpdateExerciseDTO {
  @IsString()
  title?: string;

  @IsArray()
  sets?: number[];

  @IsArray()
  reps?: number[];

  @IsNumber()
  weight?: number;

  @IsBoolean()
  metric?: boolean;

  @IsBoolean()
  timed?: boolean;

  @IsNumber()
  timer?: number;

  @IsNumber()
  workoutId?: number;
}
