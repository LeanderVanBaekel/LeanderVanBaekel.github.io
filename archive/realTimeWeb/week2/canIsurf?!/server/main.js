import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  // The method expects a valid IPv4 address
  'getWeather': function () {

	// Construct the API URL
	var apiUrl = 'http://api.wunderground.com/api/fba2114278678c9a/conditions/q/53.051,5.388.json';
	// query the API

	var check = weatherMakkum.find({date: returnTodaysDate()}).fetch();
	console.log(check);
	if (check[0]) {
		return check;
	} else {
		console.log("new request");
		var res = HTTP.get(apiUrl).data;

		var data = {
			date: new Date,
			location: res.current_observation.display_location.full,
			temp_c: res.current_observation.temp_c,
			weather: res.current_observation.weather,
			wind_dir: res.current_observation.wind_dir,
			wind_degrees: res.current_observation.wind_degrees,
			wind_kph: res.current_observation.wind_kph,
			icon: res.current_observation.icon,
			icon_url: res.current_observation.icon_url
		};
		weatherMakkum.insert(data);
		return data;
	}
  },
  'getLatestWeather': function () {
  	return weatherMakkum.findOne({}, {sort: {date:-1}});
  }
});

Meteor.setInterval(function(){
	Meteor.call('getWeather', function(err,res){
		if (err) {
			console.log(err);
		};
		console.log("setTimeout");
	});
}, 60000);


Meteor.publish('weatherMakkum', function() {
	console.log();
	return weatherMakkum.find();
});
// Meteor.publish('weatherMakkum');





















