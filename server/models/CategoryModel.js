const mongoose = require("mongoose");
const Task = require("./TaskModel");

const CategorySchema = mongoose.Schema({
  //   _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  UserId: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Categories", CategorySchema);

module.exports = Category;
