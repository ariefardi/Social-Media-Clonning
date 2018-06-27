const mongoose = require("mongoose");

let Schema = mongoose.Schema;

const emailValidator = function(email) {
  return /^\w([.!#$%&’*+/=?^_`{|}~-]*?\w+)+@\w+(\.\w{2,3})+$/.test(email);
};

let userSchema = new Schema({
  username: {
    type: String,
    required: [true, "username is needed"]
  },
  password: {
    type: String,
    minlength: [8, 'password need 8 characters'],
    required: [true, "password is needed"]
  },
  email: {
    type: String,
    required: [true, "email is needed"],
    validate: [emailValidator, "not valid email format"]
  }
});

module.exports = mongoose.model("users", userSchema);
