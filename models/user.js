const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
});

const User = new mongoose.Schema({
  email: String,
  books: [BookSchema],
});

const userModel = mongoose.model('user', User);

module.exports = userModel;
