/**
 * Users schema
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
	email :{
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	name: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	}
});

//hash the password
userSchema.pre('save', function(next) {
	var user = this;
	bcrypt.hash(user.password, 10, function(err, hash) {
		if (err) {
			return next(err);
		}
		user.password = hash;
		next();
	})
});

var User = mongoose.model('User', userSchema);
module.exports = User;


