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


//poll collection
router.post('/qPoll', function(req, res, next){		
	var pollData = {'data' : {}};
	req.body.forEach(function(ele, i){
		pollData.data[i] = {'option' : ele, 'voteCount' : 0};
		
	});	

	mongo.connect(url, function(err, db){
		//assert(null, err); //IDK why this throws error
		db.collection('qPolls').insertOne(pollData, function(err2, result){
			assert.equal(null, err2);			
			pollData['id'] = pollData._id;
			console.log("id: " + pollData._id);
			console.log("id again: " + pollData.id);
			console.log("result: " + result);
			res.send(JSON.stringify(pollData));			
			db.close();
		});
	});
	
});


router.get('/qPoll', function(req, res, next){
	var qPoll = {};
	mongo.connect(url, function(err, db){
		assert.equal(null, err);
		var cursor = db.collection('qpolls').find();
		cursor.findById(req.params._id, function(doc, err){
			assert.equal(null, err);
			qPoll.push(doc);
		}, function(){
			db.close();
			res.render('index', {'qPolls': qPoll});
		});
	});
});

router.post('/qVote', function(req, res, next){
	var qPollId = req.body.qPollId;
	var index = req.body.index;
	mongo.connect(url, function(err, db){
		assert.equal(null, err);		
		db.collection('qPolls').update({"_id" : qPollId}, {$inc: { 'data[index].voteCount': 1 }}, true, function(err2, result){
			assert.equal(null, err2);
			console.log('Poll vote updated.');			
			db.close();
		});
		
	});
});

//Users collection
router.post('/signup', function(req, res, next){	
	var newUser = {
		name : req.body.username,
		password : req.body.password
	};
	mongo.connect(url, function(err, db){
		assert.equal(null, err);		
		db.collection('users').insertOne(newUser, function(err2, result){
			assert.equal(null, err2);
			console.log('User iserted.');			
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
