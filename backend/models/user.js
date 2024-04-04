const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required : true,
    unique : true,
    minlength : 6,
    maxlength : 1024,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  }

});

module.exports = mongoose.model("User", UserSchema);
