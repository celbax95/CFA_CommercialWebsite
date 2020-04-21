"use strict";

const Order = require("../models/Order");
const Item = require ("../models/Item");

exports.list_all_orders = function (req, res) {
    Order.find({buyer: req.params.id}, function (err, orders) {
        if (err) res.send(err);
        else res.json(orders);
    });
};

exports.create_an_order = function (req, res) {
    let new_order;
    Item.updateOne({ _id: req.body.item }, { available: false})
        .then(() =>
                new_order = new Order({
                item: req.body.item,
                buyer: req.params.id
                }).save (function (err, order) {
                    if (err) res.send(err);
                    else res.json(order);
                }))
        .catch(error => res.status(400).json({ error }));
};

exports.delete_an_order = function (req, res) {
    Order.deleteOne({
        _id: req.params.id
    }, function (err, order) {
        if (err) res.send(err);
        else res.json({message: 'Order successfully deleted'});
    });
};