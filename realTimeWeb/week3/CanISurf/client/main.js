import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

var city = "Stavoren";

// var cityDep = new Tracker.Dependency;

subscribeToCity = function(newCity) {

	console.log('newCity function ' + newCity)

  // window.removeEventListener('beforeunload';
	
	// cityDep.depend()

	Meteor.subscribe('Weather', newCity);
  Meteor.call('addCity', newCity);
  Meteor.call('getWeather', newCity);

  window.addEventListener("beforeunload", function (e) {
  	Meteor.call('removeCity', city);
  });

};

Template.hello.onCreated(function helloOnCreated() {

  subscribeToCity(city);

});

Meteor.setInterval

Template.hello.helpers({
  weather() {
  	// cityDep.changed();
  	var weather = Weather.findOne({});
  	console.log(weather);

  	if (weather.wind_kph > 20) {
  		weather.surfable = true;
  	} else {
  		weather.surfable = false;
  	}

    return weather;
  },
});

Template.hello.events( {

	'click .stavoren': function (event) {
		oldCity = city;
		Meteor.call('removeCity', city);
		city = "Stavoren";
		console.log(city);
		subscribeToCity(city);
		// Session.set('page','hello');
	},

	'click .ijmuiden': function (event) {
		oldCity = city;
		Meteor.call('removeCity', city);
		city = "Ijmuiden";
		console.log(city);
		subscribeToCity(city);
		// Session.set('page','hello');
	},

	'click .schaar': function (event) {
		oldCity = city;
		Meteor.call('removeCity', city);
		city = "Schaar";
		console.log(city);
		subscribeToCity(city);
		// Session.set('page','hello');
	}

});

Template.hello.onDestroyed(function helloOnDestroyed() {
	window.removeEventListener('beforeunload');
});
















