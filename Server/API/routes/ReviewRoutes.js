"use strict";

module.exports = function (app) {
    let controller = require("../controllers/ReviewController");

    app.route('/review')
        .get(controller.list_all_reviews)
        .post(controller.create_a_review);

    app.route('/item/:id')
        .get(controller.read_a_review)
        .put(controller.update_a_review)
        .delete(controller.delete_a_review);
};
