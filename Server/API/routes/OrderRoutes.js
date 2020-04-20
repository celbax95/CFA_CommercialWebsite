"use strict";

module.exports = function (app) {
  let controller = require("../controllers/OrderController");

  app
    .route("/post")
    .get(controller.list_all_orders)
    .post(controller.create_an_order);

  app
    .route("/post/:postId")
    .get(controller.read_an_order)
    .put(controller.update_an_order)
    .delete(controller.delete_an_order);
};
