const TodoController = require("./controllers/TodoController");

module.exports = function (app) {
  app.route("/api/todos")
    .get(TodoController.index)
    .post(TodoController.create);

  app
    .route("/api/todos/:id")
    .get(TodoController.findOne)
    .put(TodoController.update)
    .delete(TodoController.delete);
};
