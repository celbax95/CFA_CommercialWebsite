"use strict";

var Category = require("../model/Category");

exports.list_all_category = function (req, res) {
  Category.find({}, function (err, categories) {
    if (err) res.send(err);
    res.json(categories);
  });
};

exports.read_a_category = function (req, res) {
  Category.findById(req.params.catergoryId, function (err, category) {
    if (err) res.send(err);
    res.json(category);
  });
};

exports.create_a_category = function (req, res) {
  var new_category = new Category(req.body);
  new_category.save(function (err, category) {
    if (err) {
      res.send(err);
    } else {
      res.locals.io.emit("message", {
        action: "created",
        type: "category",
        data: category,
      });
      res.json(category);
    }
  });
};

exports.update_a_category = function (req, res) {
  category.findOneAndUpdate(
    { _id: req.params.categoryId },
    req.body,
    { new: true },
    function (err, category) {
      if (err) res.send(err);
      else {
        res.locals.io.emit("message", {
          action: "updated",
          type: "category",
          data: category,
        });
        res.json(category);
      }
    }
  );
};

exports.delete_a_category = function (req, res) {
  category.deleteOne(
    {
      _id: req.params.categoryId,
    },
    function (err, category) {
      if (err) res.send(err);
      else {
        res.locals.io.emit("message", {
          action: "deleted",
          type: "category",
          data: category,
        });
        res.json({ message: "category sccessfully deleted" });
      }
    }
  );
};
