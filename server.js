var express = require('express');
var ejs = require('ejs');
var weather = require('weather-js');
var formidable = require("formidable");
var _ = require("underscore");
var async = require("async");

var app = express();

var name1 = "";
var lat1 = "";
var long1 = "";
var temperature1 = "";
var observationtime1 = "";
var skytext1 = ""; 

var name2 = "";
var lat2 = "";
var long2 = "";
var temperature2 = "";
var observationtime2 = "";
var skytext2 = ""; 

var mainflag = false;

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
	res.locals.name1 = req.name1;
	res.locals.name2 = req.name2;
	res.render('pages/index', {
				name1: name1,
				lat1: lat1,
				long1: long1,
				temperature1: temperature1,
				observationtime1: observationtime1,
				skytext1: skytext1,
				name2: name2,
				lat2: lat2,
				long2: long2,
				temperature2: temperature2,
				observationtime2: observationtime2,
				skytext2: skytext2
			});
});


app.get('/about', function(req, res) {
	res.render('pages/about');
});

app.post('/', function (req, res) {
	processFormFieldsIndividual(req, res);
});



function processFormFieldsIndividual(req, res) 
{
	var flag1 = false;
	var flag2 = false;
	var city1 = "";
	var city2 = "";
	var fields = [];	
	var form = new formidable.IncomingForm();

	function final(callback)
	{
		form.parse(req, function(err, fields) {
			city1 = fields.city1;
			city2 = fields.city2;
			console.log("City 1: ",city1);
			console.log("City 2: ",city2);
			var data1, data2;

			weather.find({search: city1, degreeType: 'C'}, function(err, resultcity) //sets flag1 at completion
			{
				if(err) console.log(err); 
				else 
				{
					data1 = resultcity[0];
					name1 = data1.location.name;
					lat1 = data1.location.lat;
					long1 = data1.location.long;
					temperature1 = data1.current.temperature+" *"+data1.location.degreetype;
					skytext1 = data1.current.skytext;    
					observationtime1 = data1.current.observationtime;
					flag1 = true;
					if(flag2) callback();
				}
				console.log("CITY 1 FOUND");
			});
		
			weather.find({search: city2, degreeType: 'C'}, function(err, resultcity) //sets flag2 at completion
			{
				if(err) console.log(err); 
				else 
				{
					data2 = resultcity[0];
					name2 = data2.location.name;
					lat2 = data2.location.lat;
					long2 = data2.location.long;
					temperature2 = data2.current.temperature+" *"+data2.location.degreetype;
					skytext2 = data2.current.skytext;
					observationtime2 = data2.current.observationtime;		
					flag2 = true;
					if(flag1) callback();
				}
				console.log("CITY 2 FOUND");
			});
		});
	}

	final(function(){
		console.log("inside final");
		if(flag1&&flag2)
		{			
			res.render('pages/index', {
				name1: name1,
				lat1: lat1,
				long1: long1,
				temperature1: temperature1,
				observationtime1: observationtime1,
				skytext1: skytext1,
				name2: name2,
				lat2: lat2,
				long2: long2,
				temperature2: temperature2,
				observationtime2: observationtime2,
				skytext2: skytext2
			});
		}
	});
	

}

app.listen(8888);
console.log('Server started at 8888');