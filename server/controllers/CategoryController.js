const Category = require("../models/CategoryModel");
const Task = require("../models/TaskModel");
class categoryController {
  static async addCategory(req, res) {
    const { name } = req.body;
    console.log(name, req.user.id);
    const category = new Category({ name, UserId: req.user.id });
    try {
      const inserted = await category.save();
      res.status(201).json(inserted);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async allCategories(req, res) {
    try {
      const findCategories = await Category.find({ UserId: req.user.id });
      res.status(200).json(findCategories);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async categoryById(req, res) {
    const { id } = req.params;
    try {
      const findCategory = await Category.findById(id).populate("tasks");
      res.status(200).json(findCategory);
      console.log(findCategory);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = categoryController;
