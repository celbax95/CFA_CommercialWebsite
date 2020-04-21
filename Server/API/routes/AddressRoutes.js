'use strict';
module.exports = function (app) {
    let adrController = require('../controllers/AdressController');

    app.route('/address')
        .get(adrController.list_all_address)
        .post(adrController.create_an_address);

    app.route('/address/:id')
        .get(adrController.read_an_address)
        .put(adrController.update_an_address)
        .delete(adrController.delete_an_address);
};
