"use strict";

const Review = require('../models/Review');

exports.list_all_reviews = function (req, res) {
    Review.find({}, function(err, review) {
        if (err)
            res.send(err);
        res.json(review)
    })
};

exports.create_a_review = function (req, res) {
    const new_review= new Review(res.body);
    new_review.save(function(err, review) {
        if (err)
            res.send(err);
        res.json(review);
    });
};

exports.read_a_review = function (req, res) {
    Review.findById(req.params.id, function (err, review) {
        if (err)
            res.send(err);
        else
            res.json(review);
    });
};

exports.update_a_review = function (req, res) {
    Review.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true},
        function (err, review) {
            if (err) res.send(err);
            else {
                res.json(review);
            }
        }
    );
};

exports.delete_a_review = function (req, res) {
    Review.deleteOne(
        {
            _id: req.params.id,
        },
        function (err, review) {
            if
            (err) res.send(err);
            else
                res.json({message: "Review successfully deleted"});
        }
    );
};