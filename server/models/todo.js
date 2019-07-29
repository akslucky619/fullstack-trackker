var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  description: {
    type: String
  },
  responsible: {
    type: String
  },
  priority: {
    type: String
  },
  completed: {
    type: Boolean
  }
},{timestamps:true}
);

var Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
