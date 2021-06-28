const TodoController = require("./controllers/TodoController");
const getReqBody = require("./utils");

const contentTypeJSON = { "Content-Type": "application/json" };

function matchWithId(req) {
  return req.url.match(/\/api\/todos\/([a-z A-Z 0-9]+)/);
}

async function routes(req, res) {
  const { url, method } = req;

  // Index
  if (url === "/api/todos" && method === "GET") {
    const todos = await TodoController.index();

    res.writeHead(200, contentTypeJSON);
    res.end(JSON.stringify(todos));
  }

  // Create
  if (url === "/api/todos" && method === "POST") {
    const { title, description } = await getReqBody(req);

    const newTodo = await TodoController.create(title, description);

    res.writeHead(200, contentTypeJSON);
    res.end(JSON.stringify(newTodo));
  }

  // FindOne
  if (matchWithId(req) && method === "GET") {
    const todoId = req.url.split("/")[3];
    const result = await TodoController.findOne(todoId);

    if (result) {
      res.writeHead(200, contentTypeJSON);
      res.end(JSON.stringify(result));
    } else {
      res.writeHead(404, contentTypeJSON);
      res.end(JSON.stringify({ message: `Todo not found!` }));
    }
  }

  // Update
  if (matchWithId(req) && method === "PATCH") {
    const data = await getReqBody(req);
    const todoId = req.url.split("/")[3];
    const exist = await TodoController.findOne(todoId);

    if (exist) {
      const todo = await TodoController.update(todoId, data);

      res.writeHead(200, contentTypeJSON);
      res.end(JSON.stringify(todo));
    } else {
      res.writeHead(404, contentTypeJSON);
      res.end(JSON.stringify({ message: `Todo not found!` }));
    }
  }

  // Delete
  if (matchWithId(req) && method === "DELETE") {
    const todoId = req.url.split("/")[3];
    const exist = await TodoController.findOne(todoId);

    if (exist) {
      await TodoController.delete(todoId);

      res.writeHead(200, contentTypeJSON);
      res.end(JSON.stringify({ message: `Todo id:${todoId} deleted!` }));
    } else {
      res.writeHead(404, contentTypeJSON);
      res.end(JSON.stringify({ message: `Todo not found!` }));
    }
  }
  
  // Route Not Found
  else {
    res.writeHead(404, contentType);
    res.end(JSON.stringify({ message: "Route not found!" }));
  }
}

module.exports = routes;
