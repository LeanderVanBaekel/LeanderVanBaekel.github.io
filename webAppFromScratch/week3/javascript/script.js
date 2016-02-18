(function () {
    'use strict';
    
    // making some variables
    var hidden  = "hidden",
    	thisPage = window.location.hash,
    	oldPage = "",
    	url		= window.location.hash,
		movieData = {
			Title: "Title",
			Year: "Year",
			Genre: "N/A",
			Plot: "Plot"
		},
		searchedMovies = [];


	// start the web app
    var app = {
    	init: function () {
    		sections.hideAll();
    		routes.routie();
    	}
    };

	app.init();

})();





































