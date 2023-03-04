const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const { signToken } = require("../helpers/jwt");

class userController {
  static async register(req, res) {
    const user = new User(req.body);
    try {
      const inserted = await user.save();
      res.status(201).json(inserted);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req, res) {
    const { username, password } = req.body;
    try {
      //   console.log(username, password);
      if (!username) {
        res.status(400).json({
          message: "Username is required",
        });
        return;
      }
      if (!password) {
        res.status(400).json({
          message: "Password is required",
        });
        return;
      }

      const findUser = await User.findOne({ username });

      if (!findUser) {
        res.status(401).json({
          message: "Invalid username/password",
        });
        return;
      }

      const valid = bcrypt.compareSync(password, findUser.password);
      if (!valid) {
        res.status(401).json({
          message: "Invalid username/password",
        });
        return;
      }

      const access_token = signToken({
        id: findUser._id,
      });

      res.status(200).json({
        access_token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = userController;
