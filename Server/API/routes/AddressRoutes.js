"use strict";

module.exports = function (app) {
  let controller = require("../controllers/AddressController");

  app
    .route("/address")
    .get(controller.list_all_addresses)
    .post(controller.create_an_address);

  app
    .route("/address/:addressId")
    .get(controller.read_an_address)
    .put(controller.update_an_address)
    .delete(controller.delete_an_address);
};
