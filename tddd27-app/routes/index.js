var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017/db';

//var user = require('../data/db/DBSchema').User;
//var poll = require('../data/db/DBSchema').Polls;

//
/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

router.get('/', function(req, res, next){
	res.render('index',{title : "Poll City"});
});


//Chart collection
router.post('/qPoll', function(req, res, next){
	console.log("Entered qPoll POST method.");
	var pollData = {
		//question : req.body.question,
	}
	for (var i = 0; i<req.body.items.length; i++) {
		pollData[i] = req.body.items[i];
	}
	mongo.connect(url, function(err, db){
		assert(null, err);
		db.collection('qPolls').insertOne(pollData, function(err2, result){
			assert.equal(null, err2);
			console.log("qPoll inserted.")
			db.close();
		});
	});
	res.send(JSON.stringify(pollData));
});


router.get('/qPoll', function(req, res, next){
	var qPoll = {};
	mongo.connect(url, function(err, db){
		assert.equal(null, err);
		var cursor = db.collection('qpolls').find();
		cursor.forEach(function(doc, err){
			assert.equal(null, err);

		})
	})
})


//Users collection
router.post('/signup', function(req, res, next){	
	var newUser = {
		name : req.body.username,
		password : req.body.password
	};
	mongo.connect(url, function(err, db){
		assert.equal(null, err);
		//db.users.createIndex({userToken: ""}, {sparse : true});
		db.collection('users').insertOne(newUser, function(err2, result){
			assert.equal(null, err2);
			console.log('User iserted.');
			//db.users.createIndex({userToken: ""},{unique: true,	partialFilterExpression: { userToken: { $exists: true }}});
			db.close();
		});
		
	});
	res.send(JSON.stringify(newUser));
});

 router.get('/users', function(req, res, next){
	var users = [];
  	mongo.connect(url, function(err, db){
 		assert.equal(null, err);
  		var cursor = db.collection('users').find();
  		cursor.forEach(function(doc, err){
  			assert.equal(null, err);
  			users.push(doc);
		}, function(){
			db.close();
			res.send({"userArray" : users}); 			
 		});
   	});
 });

module.exports = router;



// router.post('/signup', function(req, res, next){	
// 	var newUser = user({
// 		userToken : req.body.userToken,
// 		name : req.body.username,
// 		password : req.body.password
// 	});
// 	newUser.save(function(err){
// 		if(err){
// 			throw err;
// 		}
// 		console.log('User saved successfully');
// 	});
// 	res.send(200);
// 	res.render(req.body);
// });
