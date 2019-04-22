const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
  },
  nickName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  encryptedPassword: {
    select: false,
    type: String,
    required: true,
  },
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

module.exports = User;
