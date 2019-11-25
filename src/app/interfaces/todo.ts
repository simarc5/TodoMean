import { Time } from '@angular/common';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;

  editing: boolean;
  description : String;
   dueDate : Date;
  // dueTime : Time;
}
