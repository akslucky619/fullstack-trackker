var express = require("express");
var router = express.Router();
var Todo = require("../models/todo");

// get all todos
router.get("/", (req, res) => {
  Todo.find({}, (err, todos) => {
    console.log(todos, 'in slash')
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

// get a single todo
router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  Todo.findById(id, (err, todo) => {
    res.json(todo);
  });
});

// adding todo
router.post("/add", (req, res) => {
  console.log(req.body, "body");
  Todo.create(req.body, (err, todo) => {
    if (err)
      return res.json({
        error: "coudnt added todo"
      });
    console.log(todo, "todo");
    res.json({
      message: "added todo"
    });
  });
});

// update todo

router.post("/:id/update", (req, res) => {
  var id = req.params.id;
  console.log(req.body, "in update");
  Todo.findByIdAndUpdate(id, req.body, { new: true }, (err, todo) => {
    console.log(todo, "in updaye");
    if (err)
      return res.status(400).json({
        error: "update not possible"
      });
    res.json({
      message: "todo updated",
      todo
    });
  });
});

// delete todo
router.get("/:id/delete", (req, res, next) => {
  var id = req.params.id;
  Todo.findByIdAndDelete(id, (err, todo) => {
    if (err)
      return res.status(400).json({
        error: "update not possible"
      });
    res.json({
      message: "todo deleted"
    });
  });
});

module.exports = router;
