"use strict";

var Address = require("../model/Address");

exports.list_all_addresses = function (req, res) {
  Address.find({}, function (err, addresses) {
    if (err) res.send(err);
    else res.json(addresses);
  });
};

exports.read_an_address = function (req, res) {
  Address.findById(req.params.IdAddress, function (err, address) {
    if (err) res.send(err);
    else res.json(address);
  });
};

exports.create_an_address = function (req, res) {
  var new_address = new Address(req.body);
  new_address.save(function (err, address) {
    if (err) {
      res.send(err);
    } else {
      res.json(address);
    }
  });
};

exports.update_an_address = function (req, res) {
  Address.findOneAndUpdate(
    { _id: req.params.IdAddress },
    req.body,
    { new: true },
    function (err, address) {
      if (err) res.send(err);
      else {
        res.json(address);
      }
    }
  );
};

exports.delete_an_address = function (req, res) {
  Address.deleteOne(
    {
      _id: req.params.IdAddress,
    },
    function (err, address) {
      if (err) res.send(err);
      else {
        res.json({ message: "address sccessfully deleted" });
      }
    }
  );
};
