const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

server.listen(3001, () => {
  console.log("listening on Port 3000")
});
