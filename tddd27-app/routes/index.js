var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var objectId = require('mongodb').ObjectID;
//var BSON = require('bson').BSONPure

var url = 'mongodb://localhost:27017/db';

//var user = require('../data/db/DBSchema').User;
//var poll = require('../data/db/DBSchema').Polls;

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
			//pollData['id'] = pollData._id;
			//console.log("id: " + pollData._id);
			//console.log("id again: " + pollData.id);
			//console.log("result: " + result);
			res.send(JSON.stringify(pollData));			
			db.close();
		});
	});
	
});

 router.get('/qPolls', function(req, res, next){
	var qPolls = [];
  	mongo.connect(url, function(err, db){
 		assert.equal(null, err);
  		var cursor = db.collection('qPolls').find();
  		cursor.forEach(function(doc, err){
  			assert.equal(null, err);
  			qPolls.push(doc);
		}, function(){
			db.close();
			res.send({"qPolls" : qPolls}); 			
 		});
   	});
 });

router.get('/qPoll/:qPollId', function(req, res, next){					
	var obj_id = objectId(req.params.qPollId);	
	console.log("objid: " + obj_id);	
	mongo.connect(url, function(err, db){
		assert.equal(null, err);		
		db.collection('qPolls').findOne({_id: obj_id}, function(err, doc){					
				console.log(doc);	
				assert.equal(null, err);					
				res.send(doc)
				db.close();
		});	
	});
});

router.post('/qVote', function(req, res, next){
	try {		
		var obj_id = objectId(req.body.qPollId);
		var index = req.body.index+1;
		console.log("index: " + index);
		}	
	catch (e) {
		   console.log(e);
		}

	//console.log('data index : ' + data[index].voteCount);
	mongo.connect(url, function(err, db){
		assert.equal(null, err);
		try {
			console.log("In try");
			db.collection('qPolls').updateOne({"_id" : obj_id}, {$inc: {["data." + index + ".voteCount"]: 1}});
			res.send("qVote updated");
		}	
		catch (e) {
		   console.log(e);
		}	
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
			res.send(JSON.stringify(newUser));
		});		
	});	
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
