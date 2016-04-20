import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  cities = [];
});


Meteor.methods({
  // The method expects a valid IPv4 address
  'getWeather': function (city) {

  	console.log(Weather.find({city:city}).fetch());

	// Construct the API URL
	var apiUrl = 'http://api.wunderground.com/api/fba2114278678c9a/conditions/q/netherlands/'+city+'.json';
	// query the API

	console.log("new request for city: " + city);

	var res = HTTP.get(apiUrl).data;

	var data = {
		date: new Date,
		location: res.current_observation.display_location.full,
		city: res.current_observation.display_location.city,
		temp_c: res.current_observation.temp_c,
		weather: res.current_observation.weather,
		wind_dir: res.current_observation.wind_dir,
		wind_degrees: res.current_observation.wind_degrees,
		wind_kph: res.current_observation.wind_kph,
		icon: res.current_observation.icon,
		icon_url: res.current_observation.icon_url
	};

	var cityId = Meteor.call('getLatestWeather', data.city);
	if (!cityId) {
		Weather.insert(data);
		return;
	}
	Weather.update(cityId._id, {
      $set: data
    });
  },

  'getLatestWeather': function (city) {
  	return Weather.findOne({city: city}, {sort: {date:-1}});
  },
  'test': function() {
  	console.log("test!!@1");
  },
  'addCity': function (city) {
  	cities.push(city);
  	console.log(cities);
  },
  'removeCity': function (city) {
  	console.log('remove from ' + cities);
  	var pos = cities.indexOf(city);
  	if (pos == -1) {
  		console.log("geen stad ?!?!");
  	} else {
  		cities.splice(pos,1);
  	}
  	console.log(cities);
  }
});

Meteor.setInterval(function(){
	cities.forEach(function(city) {
		console.log('updating weather for: ' + city);
		Meteor.call('getWeather', city, function(err,res){
			if (err) {
				console.log(err);
			};
			console.log("setTimeout");
		});

	});
}, 60000);


Meteor.publish('Weather', function(city) {
	return Weather.find({city: city},{sort: {date: -1}});
});