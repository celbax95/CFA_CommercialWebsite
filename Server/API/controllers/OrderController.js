"use strict";

const Order = require("../models/Order");
const Item = require("../models/Item");

exports.list_all_orders = function (req, res) {
  Order.find({buyer: req.params.id}, function (err, orders) {
    if (err) res.send(err);
    else res.json(orders);
  });
};

exports.create_an_order = function (req, res) {
  Item.UpdateOne({_id: req.body.item}, {$set: {available: false}}, function (err, res) {
    if (err)
      console.log(err);
    else{
      const new_order = new Order({
        item: req.body.item,
        buyer: req.params.id
      });
      new_order.save(function (err, order) {
        if (err) {
          res.send(err);
        } else {
          res.json(order);
        }
      });
    }
  });
};
