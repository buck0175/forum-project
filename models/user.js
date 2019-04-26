const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  username: String,
  password: String,
  email: String,
  bio: String,
  profileImage: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);