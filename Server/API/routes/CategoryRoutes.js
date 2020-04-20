"use strict";

module.exports = function (app) {
  let controller = require("../controllers/CategoryController");

  app
    .route("/post")
    .get(controller.list_all_categories)
    .post(controller.create_an_category);

  app
    .route("/post/:postId")
    .get(controller.read_an_category)
    .put(controller.update_an_category)
    .delete(controller.delete_an_category);
};
