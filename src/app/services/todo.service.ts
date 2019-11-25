import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';

// Api URL for connecting the front-end to rest API backend
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoTitle: string = '';
  beforeEditCache: string = '';
  filter: string = 'all';
  anyRemainingModel: boolean = true;
  todoDescription : string ='';
  date: Date ;
  todos: Todo[] = [];

  constructor(private http: HttpClient) {
    this.todos = this.getTodos();
  }

  // Get Function

  getTodos(): Todo[] {
    this.http.get(API_URL + '/todos')
      .pipe(catchError(this.errorHandler))
      .subscribe((response: any) => {
        this.todos = response;
      })

      return this.todos;
  }

  // Error ?HAndling
  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Something went wrong!!!!');
  }


  // Adding Todos
  addTodo(todoTitle: string, todoDescription:string, date:Date ): void {
    if (todoTitle.trim().length === 0) {
      return;
    }
    if (todoDescription.trim().length === 0) {
      return;
    }

    this.http.post(API_URL + '/todos/', {
      title: todoTitle,
      description : todoDescription,
      dueDate : date,
      completed: false
    })
      .subscribe((response: any) => {
        this.todos.push({
          id: response.id,
          title: todoTitle,
          completed: false,
          editing: false,
          description : todoDescription,
          dueDate : date
        });
      });


  }


  // Editing Todos
  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }

    if (todo.description.trim().length === 0) {
      todo.description = this.beforeEditCache;
    }

    this.anyRemainingModel = this.anyRemaining();
    todo.editing = false;

    this.http.patch(API_URL + '/todos/' + todo.id, {
      title: todo.title,
      completed: todo.completed
    })
      .subscribe((response: any) => {
        this.todos = this.todos.filter(todo => todo.id !== todo.id);
      });
  }


  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.description = this.beforeEditCache;
    todo.editing = false;
  }


   checkAllTodos(): void {
    const checkedTodo = (<HTMLInputElement>event.target).checked;

    this.http.patch(API_URL + '/todosCheckAll', {
      completed: checkedTodo
    })
      .subscribe((response: any) => {
        this.todos.forEach(todo => todo.completed = checkedTodo)
        this.anyRemainingModel = this.anyRemaining();
      })
  }



// Deleting Todos, remove operation
  deleteTodo(id: string): void {

    this.http.delete(API_URL + '/todos/' + id)
    .subscribe((response: any) => {
        this.todos = this.todos.filter(todo => todo.id !== id);
      })
  }

  // To check for remaining todos
  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }


  anyRemaining(): boolean {
    return this.remaining() !== 0;
  }

  // Filtering todos according to button
  todosFiltered(): Todo[] {
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }

    return this.todos;
  }
}
