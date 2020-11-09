const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan')
const indexRouter = require('./routes/index')
const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy
const session = require('express-session')
const app = express();

passport.use(new TwitterStrategy({
  consumerKey: '95FP7prmP9wni6AEg9tD9mD81',
  consumerSecret: 'bOZEkFXETmlkuXUyYFY8s3a2AxGVAoHEoBXWRgQrJLHYn1txyg',
  callbackURL: "http://localhost:3000/twitter/callback"
},
function(token, tokenSecret, profile, callback) {
  return callback(null, profile);
 }
));

passport.serializeUser(function(user, callback) {
  callback(null, user);
})

passport.deserializeUser(function(obj, callback) {
  callback(null, obj);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'sdjasASDjioasd',
  resave: true,
  saveUninitialized: true,
  cookie : { secure: false }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter);

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/loggedin',
                                     failureRedirect: '/' }));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
