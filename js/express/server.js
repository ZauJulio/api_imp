var express = require("express");
var bodyParser = require('body-parser')
var routes = require("./routes");

var PORT = process.env.PORT || 5000;
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);
app.listen(PORT)

console.log(`Server listening on ${PORT}`);
