import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


//var today = returnTodaysDate();

var data = new ReactiveVar(["foo"]);

callGetLatestWeather = function() {
	Meteor.call('getLatestWeather', function(err,res){
		if (err) {
			console.log(err);
		};
		// console.log(res);
		data.set(res);
	});
};


// callGetLatestWeather();
// Meteor.setInterval(function(){callGetLatestWeather()}, 10000);

Template.canI.onRendered(function() {
	Meteor.subscribe('weatherMakkum');
});

// Template.expertWeather.helpers({
//   today() {
//   	return returnTodaysDate();
//   },
//   data() {
//   	return data.get();
//   }
// });


Template.canI.helpers({
  data() {
	var surf = false;
	//console.log(weatherMakkum.findOne().wind_kph);
	// var tempData = weatherMakkumLast
	console.log("test");
	console.log(weatherMakkum.findOne({}, {sort: {date:-1}}));
	if (tempData.wind_kph >= 25) {
		surf = true;
	}

  	return {surf: surf, weather: tempData};
  }
});


















