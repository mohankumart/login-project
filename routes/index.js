/**
 * Define all the routes here
 */

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcrypt');

//GET /
router.get('/', function(req, res, next) {
	//if the user id is in session redirect him to profile page
	if(req.session.userId){
		return res.redirect('/profile');
	}else{
		return res.render('index', { title: 'Home' });
	}
	
});

router.get('/logout', function(req, res, next) {
	//destroy the session
});

router.get('/profile', function(req, res, next) {
	User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
    	  bcrypt.compare('test', user.password , function(error, result) {
              if (result === true) {
                console.log('passwords are equal');
              } else {
                console.log('passwords are not equal')
              }
            })
    	  console.log(user.name);
    	  return res.render('profile', { title: 'Profile', name: user.name});
      }
    });
});


router.post('/signup', function(req, res, next){
	//parse the req body data
	//console.log(req);
	console.log(req.body);
	
	//create the object with form input
	var userData = {
		email: req.body.email,
	    name: req.body.name,
	    password: req.body.password
	};
	
	// use schema's `create` method to insert document into Mongo
    User.create(userData, function (error, user) {
    	if (error) {
            return next(error);
    	}else{
    		req.session.userId = user._id;
        	return res.redirect('/profile');
    	}
    });
});

module.exports = router;

