var express = require('express')
// var tweetBank = require('../tweetBank')
var models = require('../models');

module.exports = function(io) {
	var router = express.Router()

	router.get('/', function(req, res) {
		// var tweets = tweetBank.list()
		console.log("hello?");

		models.Tweet.findAll({
			include: [ models.User ]
		}).then(function(tweets) {
			// tweets.forEach( function(tweet) {
			// 	console.log(tweet.dataValues);
			// });
			
			// res.status(200).end();
			res.render('index', {
				title: "Twitter.js",
				// tweets: tweets,
				showForm: true
			});
		});
		// get tweets
		//render index
	})

	router.get('/users/:name', function(req, res) {
		// var tweets = tweetBank.find({name: req.params.name})

		models.Tweet.findAll({include: [User] }).then(function(tweets) {
			res.render('index', {
				tweets: tweets,
				formName: req.params.name,
				showForm: true
			});
		});
		console.log(Tweet);
	})

	router.get('/users/:name/tweets/:id', function(req, res){
		req.params.id = parseInt(req.params.id)
		var tweets = tweetBank.find({id: req.params.id})
		res.render('index', {
			tweets: tweets
		})
	})

	router.post('/submit', function(req, res){
		tweetBank.add(req.body.name, req.body.text)
		var all_tweets = tweetBank.list()
		var last_tweet = all_tweets[all_tweets.length-1]
		io.sockets.emit('new_tweet', last_tweet)
		res.redirect(req.body.redirectUrl)
	})

	return router
}







