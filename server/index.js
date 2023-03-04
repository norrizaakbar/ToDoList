const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes");
const PORT = 4000;
const app = express();

mongoose.connect("mongodb://localhost:27017/ToDoList", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => console.log(err));
db.once("open", () => console.log("DB Connected"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log("Server is Running", PORT));
