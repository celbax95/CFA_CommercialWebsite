"use strict";

module.exports = function (app) {
    let controller = require("../controllers/UserController");

    app.route("/user")
        .get(controller.list_all_users)
        .post(controller.create_an_user);

    app.route("/user/:id")
        .get(controller.read_an_user)
        .put(controller.update_an_user)
        .delete(controller.delete_an_user);
};
