import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { TodoService } from 'src/app/services/todo.service';

// Defining the component
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [TodoService],
  animations: [
    trigger('fade', [

      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(200, style({ opacity: 1, transform: 'translateY(0px)'}))
      ]),

      transition(':leave', [
        animate(200, style({ opacity: 0, transform: 'translateY(30px)' }))
      ]),

    ])
  ]
})
export class TodoListComponent implements OnInit {
  todoTitle: string;
  todoDescription : string;
  todoDate : Date;


  constructor(public todoService: TodoService) {
  }
  // Called on starting of component

  ngOnInit() {
    this.todoTitle = '';
    this.todoDate = new Date();
    this.todoDescription = '';
    this.todoDate.setDate( this.todoDate.getDate() + 3 );

  }

  // Add Todo Function
  addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }

    if (this.todoDescription.trim().length === 0) {
      return;
    }

    this.todoService.addTodo(this.todoTitle, this.todoDescription, this.todoDate);

    this.todoTitle = '';
    this.todoDescription = '';

  }
}

