const Category = require("../models/CategoryModel");
const Task = require("../models/TaskModel");

class taskController {
  static async addTask(req, res) {
    const { name, category } = req.body;
    try {
      const findCategory = await Category.findById(category);
      const task = new Task({
        name,
        UserId: req.user.id,
        category: findCategory,
      });

      const inserted = await task.save();
      res.status(201).json(inserted);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async allTasks(req, res) {
    try {
      const findTasks = await Task.find({ UserId: req.user.id }).populate(
        "category"
      );
      res.status(200).json(findTasks);
      console.log(findTasks);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteTask(req, res) {
    const { id } = req.params;

    try {
      const deleted = await Task.findByIdAndDelete(id);
      res.status(200).json(deleted);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateTask(req, res) {
    const { id } = req.params;

    try {
      // let task = await Task.findById(id);
      // console.log(task.status);
      // let update;
      // if (task.status === true) {
      //   update = await Task.findByIdAndUpdate(
      //     id,
      //     { status: false },
      //     { new: true }
      //   );
      // } else {
      //   update = await Task.findByIdAndUpdate(
      //     id,
      //     { status: true },
      //     { new: true }
      //   );
      // }
      const update = await Task.findByIdAndUpdate(
        id,
        { status: false },
        { new: true }
      );
      res.status(200).json(update);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = taskController;
