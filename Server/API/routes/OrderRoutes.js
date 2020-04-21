"use strict";

module.exports = function (app) {
    let controller = require("../controllers/OrderController");

    app.route("/order/:id")
        .get(controller.list_all_orders)
        .post(controller.create_an_order);

    app.route("/order/:id")
        .delete(controller.delete_an_order);
};
