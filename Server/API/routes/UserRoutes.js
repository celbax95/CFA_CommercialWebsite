"use strict";

module.exports = (app) => {
  let authController = require("../controllers/UserController");
  app.route("/login").post(authController.login);
};
