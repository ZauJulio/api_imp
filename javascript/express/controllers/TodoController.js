let todos = require("../models/Todos");

module.exports = {
  async index(req, res) {
    res.status(200);
    res.send(JSON.stringify(todos));
    res.end();
  },
  async findOne(req, res) {
    const todoId = req.params.id;
    const todo = todos.find((td) => td.id === todoId);

    if (todo) {
      res.status(200);
      res.send(JSON.stringify(todo));
      res.end();
    } else {
      res.status(404);
      res.send("Todo not found!");
      res.end();
    }
  },
  async delete(req, res) {
    const todoId = req.params.id;
    const exist = todos.find((td) => td.id === todoId);

    if (exist) {
      const newTodos = todos.filter((todo) => todo.id !== todoId);
      todos = [...newTodos];

      res.status(200);
      res.send(JSON.stringify(exist));
      res.end();
    } else {
      res.status(404);
      res.send("Todo not found!");
      res.end();
    }
  },
  async create(req, res) {
    const { title, description } = req.body;

    const newTodo = {
      id: String(Number(todos[todos.length - 1].id) + 1),
      title: title,
      description: description,
    };

    todos.push(newTodo);

    res.status(200);
    res.send(JSON.stringify(newTodo));
    res.end();
  },
  async update(req, res) {
    const data = req.body;
    const todoId = req.url.split("/")[3];
    const exist = todos.find((td) => td.id === todoId);

    if (exist) {
      const newTodos = todos.filter((td) => td.id !== todoId);
      todos = [...newTodos];

      const todo = {
        id: todoId,
        title: data.title,
        description: data.description,
      };

      todos.push(todo);

      res.status(200);
      res.send(JSON.stringify(todo));
      res.end();
    } else {
      res.status(404);
      res.send("Todo not found!");
      res.end();
    }
  },
};
