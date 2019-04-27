const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  bio: String,
  profileImage: {type: String, default: 'https://www.ekahiornish.com/wp-content/uploads/2018/07/default-avatar-profile-icon-vector-18942381.jpg'},
  gender: String,
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
