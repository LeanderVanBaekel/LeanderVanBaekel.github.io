import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

//var today = returnTodaysDate();

var data = new ReactiveVar(["foo"]);
Meteor.call('getWeather', function(err,res){
	if (err) {
		console.log(err);
	};
	data.set(res);
});

var getData = function () {
	//return weatherMakkum.find({date: returnTodaysDate()}).fetch();
	Meteor.call('getWeather', function(err,res, data){
		return res;
	});
}

Template.hello.helpers({
  today() {
  	return returnTodaysDate();
  },
  hour() {

	console.log(data.get());
  	return data.get()[0].hours;
  }
});

