const http = require("http");
const routes = require("./routes");

const PORT = process.env.PORT || 5000;
console.log(`Server listening on ${PORT}`);

const server = http.createServer(async (req, res) => {
  routes(req, res);
});

server.listen(PORT);
