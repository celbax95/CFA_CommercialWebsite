const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const accessTokenSecret = "TOKENdsMy1cktMklvaxXYzFHljZ82cvoLT";

exports.getEncryptedPassword = (password) => {
  return crypto.createHash("sha512").update(password).digest("base64");
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
  if (req.method === "GET" || req.url === "/login") {
    next();
    return;
  } else {
    authenticateJWT(req, res, next);
  }
};

exports.generateToken = (user) => {
  return jwt.sign(user, accessTokenSecret);
};
