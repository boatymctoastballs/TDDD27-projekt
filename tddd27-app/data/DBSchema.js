var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	userToken : {
		type 		: String,
		required 	: false,
		unique 		: true
	},
	username : {
		type 		: String,
		required 	: true,
		unique 		: true
	},
	password : {
		type	: String,
		required : true
	}
});


var pollsSchema = new Schema({
	pollId	: {
		type 		: String,
		required 	: true,
		unique 		: true
	},
	pollTitle :  {
		type 		: String,
		required 	: true,
		unique 		: false
	},
	data :  {
		type 		: String,
		required 	: true,
		unique 		: true
	},
})




userSchema.methods.addUser = function(){
	//Do something
}




var Polls = mongoose.model('Polls', pollsSchema);
var User = mongoose.model('User', userSchema);

module.exports = User;
module.exports = Polls;