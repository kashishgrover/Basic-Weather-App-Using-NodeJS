// server.js
// load the things we need
var express = require('express');
var ejs = require('ejs');
var weather = require('weather-js');
var formidable = require("formidable");
var _ = require("underscore");
var async = require('async');

var app = express();

var data = "";
var str = "";

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

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.post('/', function (req, res) {

    processFormFieldsIndividual(req, res);

});

function processFormFieldsIndividual(req, res) {

    var city1 = "";
    var city2 = "";

    var fields = [];
    
    var form = new formidable.IncomingForm();
    
    form.parse(req, function(err, fields) {

        city1 = fields.city1;
        city2 = fields.city2;

        console.log("City 1: ",city1);
        console.log("City 2: ",city2);

       	runTwoWeatherFinds(err, res);       

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

function runTwoWeatherFinds(err, res)
{
	if(err) console.log(err);
	else
	{
		console.log('1');
		weather.find({search: city1, degreeType: 'C'}, function(err, result) {
        	if(err) console.log(err); 
  			else {
  				data1 = result[0];
  				console.log(data1);
  				name1 = data.location.name;
  				lat1 = data.location.lat;
  				long1 = data.location.long;
  				temperature1 = data.current.temperature+" *"+data.location.degreetype;
  				skytext1 = data.current.skytext;	
  				observationtime1 = data.current.observationtime;
  			}
        });
		console.log('2');
        weather.find({search: city2, degreeType: 'C'}, function(err, result) {  			
  			if(err) console.log(err); 
  			else {
  				data2 = result[0];
  				console.log(data2);
	  			name2 = data.location.name;
  				lat2 = data.location.lat;
  				long2 = data.location.long;
  				temperature2 = data.current.temperature+" *"+data.location.degreetype;
  				skytext2 = data.current.skytext;
  				observationtime2 = data.current.observationtime;	
  			}
		});
		console.log('3');
	}	 
}
    form.parse(req);
}

app.listen(8888);
console.log('Server started at 8888');