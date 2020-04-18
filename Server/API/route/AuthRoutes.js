"use strict";

module.exports = (app) => {
  let authController = require("../controller/AuthController");
  app.route("/login").post(authController.login);
};
