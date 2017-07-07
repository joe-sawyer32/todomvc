const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// MONGOOSE
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const DB = "todoDB";
const dbUrl = `mongodb://localhost:27017/${DB}`;
const Todo = require(path.join(__dirname, "models/Todo"));

// MIDDLEWARE
app.use("/static", express.static("static"));
app.use(bodyParser.json());

// CONNECT TO DATABASE
mongoose.connect(dbUrl).then((error, db) => {
  if (error) {
    res.send(`Error in connection to ${DB}`, error);
  }
  console.log(`Connected to database: ${DB}`);
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/static/index.html");
});

app.get("/api/todos", (req, res) => {
  Todo.find()
    .then(foundTodos => {
      res.send(foundTodos);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

app.post("/api/todos", (req, res) => {
  let newTodo = new Todo(req.body);
  newTodo
    .save()
    .then(addedTodo => {
      res.send(addedTodo);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

app.get("/api/todos/:id", (req, res) => {});

app.put("/api/todos/:id", (req, res) => {});

app.path("/api/todos/:id", (req, res) => {});

app.delete("/api/todos/:id", (req, res) => {});

app.listen(3000, function() {
  console.log("Express running on http://localhost:3000/.");
});
