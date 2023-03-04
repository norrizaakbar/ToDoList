const jwt = require("jsonwebtoken");
const SECRET = "SECRET";

const signToken = (payload) => jwt.sign(payload, SECRET);

const verifyToken = (token) => jwt.verify(token, SECRET);

module.exports = {
  signToken,
  verifyToken,
};
