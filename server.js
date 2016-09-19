//Express
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('request')

//Mongoose Models
var User = require("./models/User");
mongoose.connect("mongodb://localhost/people-collector");

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/node_modules", express.static(__dirname + '/node_modules'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/models", express.static(__dirname + '/models'));
app.use("/css", express.static(__dirname + '/css'));

app.get('/', function(req, res){
	res.sendFile(__dirname + "/index.html");
});

app.get('/users', function(req,res){
	User.find({}, function(err, users){
		res.send(users)
	})
})

app.get('/user/:thief', function(req, res){
	User.find({}, function(err, users){

		function getRandUser(){
			var randInt = Math.floor(Math.random()*users.length)
			var user = users[randInt]
			return user
		}

		var user = getRandUser()
		while(user.stolenBy){
			user = getRandUser()
		}

		res.send(user)

		user.stolenBy = req.params.thief
		user.save()
	})
})

app.post('/addStolen', function(req,res){
	var user = new User(req.body)
	user.stolenFrom = user.origin
	user.save()
})

function getUserFromAPI(){
	request({
	  uri: 'https://randomuser.me/api/',
	  method: 'GET',

	}, function (error, response, body) {
	  var user = JSON.parse(body).results[0]
	  var u = new User({name:user.name.first, picture: user.picture.thumbnail, origin: "Jona"})
	  u.save()
	});
}

//setInterval(getUserFromAPI, 10000)

app.listen(2405)


