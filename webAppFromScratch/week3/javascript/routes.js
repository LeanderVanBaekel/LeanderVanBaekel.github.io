var routes = (function () {
    // routie routes
	var routesObj = {
		searchedMovies: [], 
		
		routie: function (movieData) {
			var self = routesObj; // Takes care of the 'this' function when the routes go in to the Routie script
			routie ({
				'home': function () {
					self.searchedMovies = localstorage.get(); // get movies that are stored in the localstorage

					if (self.searchedMovies) { // checks if they exist
						self.searchedMovies = _.sortBy(searchedMovies, 'Title'); // use Underscore to sort by alphabetical order
						self.searchedMovies = _.filter(self.searchedMovies, function(movie){ return movie.Poster !== "N/A" }); // use underscore to filter out objects with no img
					}

					var directives = { // A Transparancy function to add atributes to al list of data
				    	Poster: {
				    		src: function (params) {
				    			return this.Poster;
				   			}
				   		},
				  		link: {
				    		href: function (params) {
				    			return "#info/" + this.Title;
				   			}
				   		}
				   	};

					self.templateRender('posters', self.searchedMovies, directives); // Rendering the data for the page with Transparancy
		    		mobileGesture.home(); // Adding mobile gestures to the homepage
					sections.enablePage(); // Showing the section to the user
				},
				'movieFinder': function () {
					self.templateRender('movieFinder', movieData); // Rendering the data for the page with Transparancy
					mobileGesture.movieFinder(); // Adding mobile gestures to the page
					sections.enablePage(); // Showing the page to the user
					getMovie.searchEngine(routesObj); // invoke the listner for the search form
				},
				'searchedMovies' : function () {
					self.searchedMovies = localstorage.get(); // Get data form localstorage
					if (self.searchedMovies) { // check if there is data
						self.searchedMovies = self.searchedMovies.reverse() // reverse the movies so te will be displayed in chronological order
					}
					// use underscore
					//var _underscoreMovieData = _.groupBy(self.searchedMovies, 'Type');
					//var _above = _.where(self.searchedMovies, {Rated: "PG-13"});

					var directives = { // A Transparancy function to add atributes to al list of data
				    	Title: {
				    		href: function (params) {
				    			return "#info/" + this.Title;
				   			}
				   		}
				   	};

					self.templateRender('movieList', self.searchedMovies, directives); // Render the page data with Transparanchy
					//self.templateRender('above', _above);

					mobileGesture.searchedMovies(); // Adding mobile gestures with Hammer

					sections.enablePage(); // Showing page to the user
				},

				'info/?:name': function (name) {

					self.searchedMovies = localstorage.get(); // Get data form localstorage

					for (var i = 0; i < self.searchedMovies.length; i++) { // looping through the data to find the movie matching the title
					 	if (self.searchedMovies[i].Title == name) {
					 		movieData = self.searchedMovies[i];
					 	};
					};
					
					var directives = {
				    	Poster: {
				    		src: function (params) {
				    			return this.Poster;
				   			}
				   		},
				   	};
				   	self.templateRender('info', movieData, directives);
					mobileGesture.info();
					sections.enablePage();
				}
			});
		},
		templateRender: function (id, data, directives) { // Function to render the Routie data
			var el = util.getId(id);
			if (directives) {
				Transparency.render(el, data, directives);
			} else {
				Transparency.render(el, data);
			}
		}
	};

	return {
		routie: routesObj.routie
		
	};

}());


