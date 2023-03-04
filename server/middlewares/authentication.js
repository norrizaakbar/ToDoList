const { verifyToken } = require("../helpers/jwt");
const User = require("../models/UserModel");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    const payload = verifyToken(access_token);

    const user = await User.findById(payload.id);

    if (!user) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    req.user = {
      id: user.id,
      email: user.email,
    };

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "ISE" });
  }
};

module.exports = authentication;
