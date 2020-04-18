"use strict";

var Post = require("../model/Post");

exports.list_all_posts = function (req, res) {
  Post.find({}, function (err, posts) {
    if (err) res.send(err);
    res.json(posts);
  });
};

exports.read_a_post = function (req, res) {
  Post.findById(req.params.postId, function (err, post) {
    if (err) res.send(err);
    res.json(post);
  });
};

exports.create_a_post = function (req, res) {
  var new_post = new Post(req.body);
  new_post.save(function (err, post) {
    if (err) {
      res.send(err);
    } else {
      res.locals.io.emit("message", {
        action: "created",
        type: "post",
        data: post,
      });
      res.json(post);
    }
  });
};

exports.update_a_post = function (req, res) {
  Post.findOneAndUpdate(
    { _id: req.params.postId },
    req.body,
    { new: true },
    function (err, post) {
      if (err) res.send(err);
      else {
        res.locals.io.emit("message", {
          action: "updated",
          type: "post",
          data: post,
        });
        res.json(post);
      }
    }
  );
};

exports.delete_a_post = function (req, res) {
  Post.deleteOne(
    {
      _id: req.params.postId,
    },
    function (err, post) {
      if (err) res.send(err);
      else {
        res.locals.io.emit("message", {
          action: "deleted",
          type: "post",
          data: post,
        });
        res.json({ message: "Post sccessfully deleted" });
      }
    }
  );
};
