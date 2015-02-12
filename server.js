var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var GitHubApi = require('github');
var GitHubStrategy = require('passport-github').Strategy;

var port = 8080;

var app = express();

var github = new GitHubApi({
	version: '3.0.0'
});

var isAuthed = function(req, res, next) {
	if(!req.isAuthenticated) {
		return res.status(403).end();
	}
	return next();
}

//config middleware

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(session({
	secret: 'a8we35ga35sjr8yj6a3a3554h6a8at5h3a1eh86ja5te1ae'
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: 'e5086818e79064b4dbcd',
    clientSecret: '6449d0afc66ef2d3a22220e2d78934c07c0ab56d',
    callbackURL: "http://127.0.0.1:8080/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
  	/*console.log(profile);*/
  	return done(null, profile);
/*
  	User.findOrCreate({ githubId: profile.id }, function (err, user) {
    	console.log(profile);
      return done(err, user);
    });*/
  }
));

//endpoints
//auth

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', 
  passport.authenticate('github', { 
  	successRedirect: '/#/home',
  	failureRedirect: '/' 
  }));

//other

app.get('/api/github/following', isAuthed, function(req, res) {
	github.user.getFollowingFromUser({
    // optional:
    // headers: {
    //     "cookie": "blahblah"
    // },
    user: 'jasondawson' //req.user
}, function(err, res) {
	if (!err) {
		console.log(res);
		res.status(200).json(res);
	} else {
		res.status(400).end();
	}
});
});


app.get('/api/github/:username/activity', isAuthed, function() {

})

app.listen(port, function() {
	console.log('Listening on port ' + port);
})