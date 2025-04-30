import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});


var checkWeather = function() {
	weatherMakkum.find({}, {sort: {'_id':1}});
};

Meteor.methods({
  // The method expects a valid IPv4 address
  'getWeather': function () {

	// Construct the API URL
	var apiUrl = 'http://api.wunderground.com/api/fba2114278678c9a/hourly/q/53.051,5.388.json';
	// query the API

	var check = weatherMakkum.find({date: returnTodaysDate()}).fetch();
	console.log(check);
	if (check[0]) {
		return check;
	} else {
		var res = HTTP.get(apiUrl).data;
		weatherMakkum.insert({
			date: returnTodaysDate(),
			hours: [
				{
					
				}
			]
		});
	}
	//console.log(response);

	//weatherMakkum.insert(response);


	// makkumWeather.insert({
	// 	"temp_c": response.temp_c,
	// 	"wind_dir": response.wind_dir,
	// 	"wind_degrees": response.wind_degrees,
	// 	"wind_mph": response.wind_mph,
	// 	"wind_gust_mph": response.wind_gust_mph,
	// 	"wind_kph": response.wind_kph,
	// 	"wind_gust_kph": response.wind_gust_kph,
	// 	"wind_string": response.wind_string,
	// 	"temperature_string": response.temperature_string
	// });
	//console.log(makkumWeather.find({}));

	return response;

  }

});