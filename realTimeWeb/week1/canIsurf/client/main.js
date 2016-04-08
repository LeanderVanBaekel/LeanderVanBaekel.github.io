import { Template } from 'meteor/templating';

import './main.html';


var makkumData = {
	"temp_c":10.7,
	"wind_dir":"SSW",
	"wind_degrees":200,
	"wind_mph":21.0,
	"wind_gust_mph":0,
	"wind_kph":33.8,
	"wind_gust_kph":0,
	"wind_string":"From the SSW at 21.0 MPH",
	"temperature_string":"51.3 F (10.7 C)"
};

Template.info.helpers({
	data: makkumData
});

Meteor.call('getWeather', function(err,res){ 
	console.log(res);
});