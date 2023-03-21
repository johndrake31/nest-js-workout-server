/* eslint-disable prettier/prettier */
import { IExercise } from "../exercises/exercises.interface";
export interface IWorkout {
    id: number;
    mainTitle: string;
    discriptionShort?: string;
    discriptionExtra?: string;
    weekDuration: number[];
    exercises: IExercise[];
    restBreakSecs?: number;
    daysPerWeek?: number[];
    imgUrl?: string;
}