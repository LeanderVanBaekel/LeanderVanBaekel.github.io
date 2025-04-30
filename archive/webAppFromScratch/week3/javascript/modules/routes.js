var routes = (function () {
    // routie routes
	var routesObj = {
		searchedMovies: [],
		
		routie: function (movieData) {
			var self = routesObj; // Takes care of the 'this' function when the routes go in to the Routie script
			routie ({
				'home': function () {
					self.searchedMovies = localstorage.get(); // get movies that are stored in the localstorage
					self.searchedMovies = sortData.filterImg(self.searchedMovies);
					self.searchedMovies = sortData.alphabetical(self.searchedMovies);
					templates.render('posters', self.searchedMovies, true); // Rendering the data for the page with Transparancy
		    		mobileGesture.home(); // Adding mobile gestures to the homepage
					sections.enablePage(); // Showing the section to the user
				},
				'movieFinder': function () {
					templates.render('movieFinder', movieData); // Rendering the data for the page with Transparancy
					mobileGesture.movieFinder(); // Adding mobile gestures to the page
					sections.enablePage(); // Showing the page to the user
					searchForm.listner(routesObj); // invoke the listner for the search form
				},
				'searchedMovies' : function () {
					self.searchedMovies = sortData.reverse();
					templates.render('movieList', self.searchedMovies, true); // Render the page data with Transparanchy
					mobileGesture.searchedMovies(); // Adding mobile gestures with Hammer
					sections.enablePage(); // Showing page to the user
				},

				'info/?:name': function (name) {
					movieData = sortData.getSpecificMovie(name);
				   	templates.render('info', movieData, true);
					mobileGesture.info();
					sections.enablePage();
				}
			});
		}
	};

	return {
		routie: routesObj.routie
	};

}());


