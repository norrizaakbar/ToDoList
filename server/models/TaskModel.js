const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    //   _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    UserId: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
  },
  {
    strictPopulate: false,
  }
);

const Task = mongoose.model("Tasks", TaskSchema);

module.exports = Task;
