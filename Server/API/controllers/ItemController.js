'use strict';
let Item = require("../models/Item");

exports.list_all_items = function (req, res) {
    Item.find({available: true}, function (err, items) {
        if (err) res.send(err);
        res.json(items);
    });
};

exports.read_a_item = function (req, res) {
    Item.findById(req.params.id, function (err, item) {
        if (err) res.send(err);
        res.json(item);
    });
};

exports.create_a_item = function (req, res) {
    let data = req.body;
    data.category = data.category === "null" ? null : data.category;
    let new_item = new Item(data);
    new_item.save(function (err, item) {
        if (err) res.send(err);
        else res.json(item);
    });
};

exports.update_a_item = function (req, res) {
    let data = req.body;
    data.category = data.category === "null" ? null : data.category;
    Item.findOneAndUpdate({_id: req.params.id}, data, {new: true}, function (err, item) {
        if (err) res.send(err);
        else res.json(item);
    });
};

exports.delete_a_item = function (req, res) {
    Item.deleteOne({ _id: req.params.id}, function (err, item) {
        if (err) res.send(err);
        else res.json({message: 'Item successfully deleted'});
    });
};