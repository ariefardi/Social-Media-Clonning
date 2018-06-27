const mongoose = require("mongoose");
const user  = require("../models/user-model");

module.exports = {
  getAllUsers: function(req, res) {
    user.find(function(err, users) {
      if (err) {
        res.status(400).json({ err });
        return console.log(err);
      }
      res.status(200).json({
        msg: "get users",
        users
      });
    });
  },
  updateUser: function(req, res) {
    let username = req.params.username;
    let updatedUser = req.body;
    user.findOneAndUpdate(
      { username },
      { $set: updatedUser },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          res.status(400).json({ err });
          return console.log(err);
        }
        res.status(201).json({
          msg: "update user successful",
          updatedUser
        });
      }
    );
  },
  deleteUser: function(req, res) {
    let id = req.params.id;
    let updatedUser = req.body;
    user.findOneAndDelete({ username }, (err, deletedUser) => {
      if (err) {
        res.status(400).json({ err });
        return console.log(err);
      }
      res.status(201).json({
        msg: "delete user successful",
        deletedUser
      });
    });
  }
};
