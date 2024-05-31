let mongoose = require("mongoose");

let todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

let todoData = mongoose.model("todoSchema", todoSchema);
module.exports = todoData;
