import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	// code to run on server at startup
});

Meteor.methods({
  // The method expects a valid IPv4 address
  'getWeather': function () {
  	var test = makkumWeather.find({});
  	console.log(test);
    console.log('Method.getWeather for');
    // Construct the API URL
    var apiUrl = 'http://api.wunderground.com/api/fba2114278678c9a/conditions/q/53.051,5.388.json';
    // query the API
    var response = HTTP.get(apiUrl).data;
    makkumWeather.insert({
		"temp_c": response.temp_c,
		"wind_dir": response.wind_dir,
		"wind_degrees": response.wind_degrees,
		"wind_mph": response.wind_mph,
		"wind_gust_mph": response.wind_gust_mph,
		"wind_kph": response.wind_kph,
		"wind_gust_kph": response.wind_gust_kph,
		"wind_string": response.wind_string,
		"temperature_string": response.temperature_string
	});
	//console.log(makkumWeather.find({}));
    return response;
  }
});