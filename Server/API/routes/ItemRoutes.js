'use strict';
const multer = require('../controllers/multer-config');

module.exports = function (app) {
    let itemController = require('../controllers/ItemController');

    app.route('/item')
        .get(itemController.list_all_items)
        .post(multer, itemController.create_a_item);

    app.route('/item/:id')
        .get(itemController.read_a_item)
        .put(itemController.update_a_item)
        .delete(itemController.delete_a_item);
};
