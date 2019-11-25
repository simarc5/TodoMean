/**
 * Service for todo operations.
 */

'use strict';
const mongoose = require('mongoose'),
    Todo = mongoose.model('todos');


exports.search = function (params) {
    const promise = Todo.find(params).exec();
    return promise;
};


exports.save = function (todo) {
    const newTodo = new Todo(todo);
    const promise = newTodo.save();
    return promise;
};


exports.get = function (todoId) {
    const promise = Todo.findById(todoId).exec();
    return promise
};


exports.update = function (todo) {
    todo.modified_date = new Date();
    
    const promise = Todo.findOneAndUpdate({_id: todo._id}, todo).exec();
    return promise;
};


exports.delete = function (todoId) {
    const promise = Todo.remove({_id: todoId});
    return promise;
};