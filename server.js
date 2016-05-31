// server.js
// load the things we need
var express = require('express');
var ejs = require('ejs');
var weather = require('weather-js');
var formidable = require("formidable");
var _ = require("underscore");
var async = require('async');

var app = express();

var lines = {};
var message = "";
var json="";

var data = "";
var str = "";
var name = "";
var lat = "";
var long = "";
var temperature = "";
var observationtime = "";
var skytext = ""; 

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
	res.locals.name = req.name;
    res.render('pages/index', {
   				name: name,
    	  		lat: lat,
	    		long: long,
   				temperature: temperature,
   				observationtime: observationtime,
  				skytext: skytext
			});
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.post('/', function (req, res) {
	json="";
    message = "";
    processFormFieldsIndividual(req, res);
});

function processFormFieldsIndividual(req, res) {

    var city = "";

    var fields = [];
    
    var form = new formidable.IncomingForm();
    
    form.parse(req, function(err, fields, files) {
    	    	
    	//console.log(fields);        
        city = fields.city;

        weather.find({search: city, degreeType: 'C'}, function(err, result) {  			
  			if(err) console.log(err); 
  			else{
  				data = result[0];
  				//console.log("1");
  				//console.log('Data (67): ', data);

	  			name = data.location.name;
  				console.log("71: "+name);
  				lat = data.location.lat;
  				console.log("73: "+lat);
  				long = data.location.long;
  				console.log("75: "+long);
  				temperature = data.current.temperature+" *"+data.location.degreetype;
  				console.log("77: "+temperature);
  				skytext = data.current.skytext;	
  				console.log("79: "+skytext);
  				observationtime = data.current.observationtime;
  				console.log("81: "+observationtime);
  				//console.log('Name (73): ', name);
  				res.render('pages/index', {
   					name: name,
    	  			lat: lat,
	    			long: long,
   					temperature: temperature,
   					observationtime: observationtime,
  					skytext: skytext
				}); 		
  			} 			
		});

    });

    form.parse(req);
}

app.listen(8888);
console.log('Server started at 8888');