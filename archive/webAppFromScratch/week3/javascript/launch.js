(function () {
    'use strict';
    
    // making a variable
    var movieData = {
			Title: "Title",
			Year: "Year",
			Genre: "N/A",
			Plot: "Plot"
		};

	// start the web app
    var launch = {
    	init: function () {
    		sections.hideAll();
    		routes.routie(movieData);
    	}
    };

	launch.init();

})();





































