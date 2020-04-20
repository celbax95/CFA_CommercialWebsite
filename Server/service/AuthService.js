const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const accessTokenSecret = "TOKENdsMy1cktMklvaxXYzFHljZ82cvoLT";

exports.getEncryptedPassword = (password) => {
  return crypto.createHash("sha512").update(password).digest("base64");
};

exports.getUserFromEmail = (email, funct) => {
  const User = require("../API/models/User");
  User.findOne({ email: email }, funct);
};

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      let user = jwt.verify(token, accessTokenSecret);
      req.user = user;
      next();
    } catch (e) {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};

exports.service = (req, res, next) => {
  if (req.method === "POST" || req.url === "/login") {
    next();
    return;
  } else {
    authenticateJWT(req, res, next);
  }
};

exports.generateToken = (user) => {
  return jwt.sign(JSON.stringify(user), accessTokenSecret);
};
