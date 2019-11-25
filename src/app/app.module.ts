import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutofocusModule } from 'angular-autofocus-fix';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { CustExtBrowserXhr } from './cust-ext-browser-xhr';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserXhr } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AutofocusModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [  {provide: BrowserXhr, useClass:CustExtBrowserXhr},
    {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
