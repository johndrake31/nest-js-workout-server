import { IsString, IsArray, IsNumber } from 'class-validator';
//  @ValidateNested({ each: true })
export class UpdateWorkoutDTO {
  @IsString()
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
}
