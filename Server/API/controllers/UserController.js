"use strict";

const User = require("../models/User"),
    crypt = require("../../service/AuthService");

exports.list_all_users = function (req, res) {
    User.find({}, function (err, users) {
        if (err) res.send(err);
        else res.json(users);
    });
};

exports.read_an_user = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        else
            res.json(user);
    });
};

exports.create_an_user = function (req, res) {
    let data = req.body;
    data.password = crypt.getEncryptedPassword(data.password);
    const new_user = new User(data);
    new_user.save(function (err, user) {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
};

exports.update_an_user = function (req, res) {
    User.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true},
        function (err, user) {
            if (err) res.send(err);
            else {
                res.json(user);
            }
        }
    );
};

exports.delete_an_user = function (req, res) {
    User.deleteOne(
        {
            _id: req.params.id,
        },
        function (err, user) {
            if
            (err) res.send(err);
            else
                res.json({message: "category successfully deleted"});
        }
    );
};
