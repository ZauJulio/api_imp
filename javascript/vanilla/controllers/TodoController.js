let todos = require("../models/Todos");

module.exports = {
  async index() {
    return todos;
  },
  async findOne(todoId) {
    return todos.find((todo) => todo.id === todoId);
  },
  async delete(todoId) {
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    todos = [...newTodos];
  },
  async create(title, description) {
    const newTodo = {
      id: Number(todos[todos.length-1].id) + 1,
      title: title,
      description: description,
    };

    todos.push(newTodo);

    return newTodo;
  },
  async update(todoId, data) {
    await this.deleteOne(todoId);

    const todo = {
      id: todoId,
      title: data.title,
      description: data.description,
    };

    todos.push(todo);

    return todo;    
  }
};
