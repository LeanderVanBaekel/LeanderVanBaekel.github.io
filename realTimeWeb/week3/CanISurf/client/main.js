import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

// var city = "Stavoren";
var city = new ReactiveVar("Stavoren");

// var cityDep = new Tracker.Dependency;

subscribeToCity = function(newCity) {

	console.log('newCity function ' + newCity)

  // window.removeEventListener('beforeunload';
	
	// cityDep.depend()

	Meteor.subscribe('Weather', newCity);
  Meteor.call('addCity', newCity);
  Meteor.call('getWeather', newCity);

  window.addEventListener("beforeunload", function (e) {
  	Meteor.call('removeCity', newCity);
  });

};

Template.hello.onCreated(function helloOnCreated() {

  subscribeToCity(city.get());

});

Meteor.setInterval

Template.hello.helpers({
  weather() {
  	// cityDep.changed();
  	var weather = Weather.findOne({city:city.get()});
  	// console.log(weather);

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
		oldCity = city.get();
		Meteor.call('removeCity', city.get());
		city.set("Stavoren");
		console.log(city.get());
		subscribeToCity(city.get());
	},

	'click .ijmuiden': function (event) {
		oldCity = city.get();
		Meteor.call('removeCity', city.get());
		city.set( "Ijmuiden");
		console.log(city.get());
		subscribeToCity(city.get());
	},

	'click .schaar': function (event) {
		oldCity = city.get();
		Meteor.call('removeCity', city.get());
		city.set("Schaar");
		console.log(city.get());
		subscribeToCity(city.get());
	}

});

Template.hello.onDestroyed(function helloOnDestroyed() {
	window.removeEventListener('beforeunload');
});
















