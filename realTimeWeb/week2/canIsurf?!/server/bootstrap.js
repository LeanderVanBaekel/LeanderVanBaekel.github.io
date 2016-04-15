// run this when the meteor app is started
Meteor.startup(function() {

  // if there are no polls available create sample data
  if (weatherMakkum.find().count() === 0) {

    // create sample polls
    var sampleWeather = [
        {
            date: new Date,
            location: "Makkum, Nederland",
            temp_c: 12.2,
            wind_dir: "sw",
            wind_degrees: 221,
            wind_kph: 1.6,
            icon: "cloudy",
            icon_url: "http://icons.wxug.com/i/c/k/cloudy.gif"
        }
    ];

    // loop over each sample poll and insert into database
    _.each(sampleWeather, function(day) {
      weatherMakkum.insert(day);
    });

  }

});