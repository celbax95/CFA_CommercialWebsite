'use strict';
let Address = require("../models/Address");

exports.list_all_address = function (req, res) {
    Address.find({}, function(err, address) {
        if (err)
            res.send(err);
        res.json(address)
    });
};

exports.create_an_address = function (req, res) {
    let data = req.body;
    let new_address = new Address (data);
    new_address.save(function (err, address) {
        if (err)
            res.send(err);
        else {
            res.json(address);
        }
    });
};

exports.read_an_address = function (req, res) {
    Address.findById(req.params.id, function (err, address) {
        if (err)
            res.send(err);
        else
            res.json(address);
    });

};

exports.update_an_address = function(req, res) {
    let data = req.body;
    Address.findOneAndUpdate({_id: req.params.id}, data, {new: true}, function (err, address) {
        if (err)
            res.send(err);
        else {
            res.json(address);
        }
    });
};

exports.delete_an_address = function(req, res) {
    Address.deleteOne({
        _id: req.params.id
    }, function (err, address) {
        if (err)
            res.send(err);
        else
            res.json({message: 'Item successfully deleted'});
    });
}