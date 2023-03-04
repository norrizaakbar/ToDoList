const {
  addCategory,
  allCategories,
  categoryById,
} = require("../controllers/CategoryController");
const {
  addTask,
  allTasks,
  deleteTask,
  updateTask,
} = require("../controllers/TaskController");
const { register, login } = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);

router.use(authentication);

router.post("/category", addCategory);
router.get("/category/:id", categoryById);
router.get("/categories", allCategories);

router.post("/task", addTask);
router.get("/tasks", allTasks);
router.delete("/task/:id", deleteTask);
router.patch("/task/:id", updateTask);

module.exports = router;
