var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

var port = 8080;

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(session({
	secret: 'a8we35ga35sjr8yj6a3a3554h6a8at5h3a1eh86ja5te1ae'
}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new GitHubStrategy({
    clientID: 'e5086818e79064b4dbcd',
    clientSecret: '6449d0afc66ef2d3a22220e2d78934c07c0ab56d',
    callbackURL: "http://127.0.0.1:8080/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

app.listen(port, function() {
	console.log('Listening on port ' + port);
})