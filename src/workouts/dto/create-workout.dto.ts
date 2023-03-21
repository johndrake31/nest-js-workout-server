import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsArray,
  IsNumber,
} from 'class-validator';
//  @ValidateNested({ each: true })
export class CreateWorkoutDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  mainTitle: string;

  @IsString()
  discriptionShort: string;

  @IsString()
  discriptionExtra: string;

  @IsArray()
  weekDuration: number[];

  @IsNumber()
  restBreakSecs: number;

  @IsArray()
  daysPerWeek: number[];

  @IsString()
  imgUrl?: string;

  @IsNumber()
  user_id?: number;
}
