var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var session = require('express-session');

// Requires the model with Passport-local Mongoose plugged in.
var User = require('./models/user');
var Comments = require('./models/comments');
var Post = require('./models/post');



mongoose.connect('mongodb://ben:Pickle6134@ds141960.mlab.com:41960/envocode');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

// Passport Configuration
app.use(require('express-session')({
  secret: "Once again Rusty wins cutest dog!",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
})


app.get('/', isLoggedIn, (req, res) => {
  Post.find({}, function(err, allPosts){
    if(err){
      console.log(err);
    }else {
      res.render('index', {posts:allPosts});
    }
  })
});

// Authentication Routes
// ==========================
app.get('/register', (req, res)=> {
  res.render('register');
});

app.post('/register', usernameToLowerCase, (req, res)=>{
  var newUser = new User(
    {
      username: req.body.username,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.redirect('register');
    }
    passport.authenticate('local')(req, res, function(){
      res.redirect('/');
    });
  });
});

function usernameToLowerCase(req, res, next){
    req.body.username = req.body.username.toLowerCase();
    next();
}

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', usernameToLowerCase, passport.authenticate('local',
  {
    successRedirect: '/',
    failureRedirect: '/login'
  }), (req, res) => {

});

// Logout Route

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

// End Authentication Routes
// ==========================

app.post('/post/new', (req, res)=> {
  var post = req.body.post;
  var author = {
    id: req.user._id,
    username: req.user.username,
    firstName: req.user.firstName,
    lastName: req.user.lastName
  }
  var newPost = {post: post, author: author};
  Post.create(newPost);
  res.redirect('/');
});

app.get('/activity', (req, res) =>{
  res.render('activity');
});


app.get('/login', (req, res) => {
  res.render('login');
})

app.get('/forum', (req, res) => {
  res.render('forum');
});



app.listen(3000, function(){
  console.log('server listening on port' + 3000);
});
