var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var orm = require('./orm-lite');
var connection = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/ormlite';
var Users = new orm(connection, process.argv[2] || 'test_users');

var getAll = function(req, res, next){
	Users.getAll(function(data){
	 	console.log(data);
  	});
	next();
}

var getByID = function(req, res, next){
	Users.findById(process.argv[3] || 1, function(data){
		console.log(data);
  	});
	next();
}

app.use(getAll);
app.use(getByID);

app.get('*', function(req, res) {
    res.send("ORM-lite working. Check the console.");
});

app.listen(port, function () {
    console.log("App is running on port " + port);
});