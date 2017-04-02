var express = require('express');
var router = express.Router();

var mongo = require('mongoose');

mongo.connect('mongodb://localhost:27017/db')

var user = require('/DBSchema').User;
var poll = require('/DBSchema').Polls;


//
/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

router.get('/', function(req, res){
	res.render('index');
});

app.post('/signup', function(req, res){
	var newUser = user({
		userToken : res.body.userToken,
		name : res.body.username,
		password : res.body.password
	});
	newUser.save(function(err){
		if(err){
			throw err;
		}
		console.log('User saved successfully');
	})
})

app.get('/users', function(req, res){
  mongo.model('users').find(function(err, users){
    res.send(users)
  })
})

app.get('/polls', function(req, res){
  mongo.model('polls').find(function(err, users){
    res.send(polls)
  })
})

module.exports = router;
