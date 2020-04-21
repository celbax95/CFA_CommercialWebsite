"use strict";

module.exports = (app) => {
  let authController = require("../controllers/AuthController");
  app.route("/login").post(authController.login);
};
