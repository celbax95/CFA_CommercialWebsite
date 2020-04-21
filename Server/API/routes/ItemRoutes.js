'use strict';
module.exports = function (app) {
    let itemController = require('../controllers/ItemController');

    app.route('/item')
        .get(itemController.list_all_items)
        .post(itemController.create_a_item);

    app.route('/item/:id')
        .get(itemController.read_a_item)
        .put(itemController.update_a_item)
        .delete(itemController.delete_a_item);
};
