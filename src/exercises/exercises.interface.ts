/* eslint-disable prettier/prettier */
export interface IExercise {
  title: string;
  sets: number[];
  weight: number;
  timed?: boolean;
  timer?: number | null;
  metric?: boolean;
  notes?: string | null;
  reps?: number[];
  uri?: string;
  imgUrl?: string | null;
}
