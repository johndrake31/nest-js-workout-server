import { IWorkout } from 'src/workouts/workouts.interface';

/* eslint-disable prettier/prettier */
export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password:string;
    roles: string[];
    workouts: IWorkout[];
    favoriteWorkouts?: IWorkout[];
}