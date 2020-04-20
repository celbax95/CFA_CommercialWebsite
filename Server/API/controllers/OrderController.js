"use strict";

var Order = require("../model/Order");

exports.list_all_orders = function (req, res) {
  Order.find({}, function (err, orderes) {
    if (err) res.send(err);
    else res.json(orderes);
  });
};

exports.read_an_order = function (req, res) {
  Order.findById(req.params.IdOrder, function (err, order) {
    if (err) res.send(err);
    else res.json(order);
  });
};

exports.create_an_order = function (req, res) {
  var new_order = new Order(req.body);
  new_order.save(function (err, order) {
    if (err) {
      res.send(err);
    } else {
      res.json(order);
    }
  });
};

exports.update_an_order = function (req, res) {
  Order.findOneAndUpdate(
    { _id: req.params.IdOrder },
    req.body,
    { new: true },
    function (err, order) {
      if (err) res.send(err);
      else {
        res.json(order);
      }
    }
  );
};

exports.delete_an_order = function (req, res) {
  Order.deleteOne(
    {
      _id: req.params.IdOrder,
    },
    function (err, order) {
      if (err) res.send(err);
      else {
        res.json({ message: "order sccessfully deleted" });
      }
    }
  );
};
