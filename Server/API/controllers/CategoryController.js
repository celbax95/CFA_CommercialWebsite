"use strict";

var Category = require("../models/Category");

exports.list_all_categories = function (req, res) {
  Category.find({}, function (err, categories) {
    if (err) res.send(err);
    else res.json(categories);
  });
};

exports.read_an_category = function (req, res) {
  Category.findById(req.params.id, function (err, category) {
    if (err) res.send(err);
    else res.json(category);
  });
};

exports.create_an_category = function (req, res) {
  var new_category = new Category(req.body);
  new_category.save(function (err, category) {
    if (err) {
      res.send(err);
    } else {
      res.json(category);
    }
  });
};

exports.update_an_category = function (req, res) {
  Category.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    function (err, category) {
      if (err) res.send(err);
      else {
        res.json(category);
      }
    }
  );
};

exports.delete_an_category = function (req, res) {
  Category.deleteOne(
    {
      _id: req.params.id,
    },
    function (err, category) {
      if
        (err) res.send(err);
      else
        res.json({ message: "category successfully deleted" });

    }
  );
};
