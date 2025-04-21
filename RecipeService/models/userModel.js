const mongoose = require('mongoose');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email Already Exists"],
    match: [emailRegex, 'Invalid email format'] // Email format validation using the regular expression
  },
  username: {
    type: String,
    required: true,
    unique: [true, "Username Already Exists"]
  },
  password: {
    type: String,
    required: true
  },
  recepies: [
    {
      type: mongoose.Types.ObjectId,
      ref: "recepie"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.index({
  name: 'text',
  username: 'text',
});

const User = mongoose.model("User", userSchema);
module.exports = User;
