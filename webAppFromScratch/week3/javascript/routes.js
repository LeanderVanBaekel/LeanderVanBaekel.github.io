var routes = (function(){

	return {
		movieData: {
			Title: "Title",
			Year: "Year",
			Genre: "N/A",
			Plot: "Plot"
		},
		
		routie: function () {
			var self = this;
			routie ({
				'home': function () {
					getMovie.getLocalStorage();
					
					var directives = {
				    	Poster: {
				    		src: function (params) {
				    			return this.Poster;
				   			}
				   		},
				   	};

					self.templateRender('posters', searchedMovies, directives)
		    		mobileGesture.home();
					sections.enablePage();
				},
				'movieFinder': function () {
					self.templateRender('movieFinder', this.movieData);
					sections.enablePage();
					mobileGesture.movieFinder();
					getMovie.searchEngine();
				},
				'searchedMovies' : function () {
					getMovie.getLocalStorage();

					// use underscore
					//var _underscorethis.MovieData = _.groupBy(searchedMovies, 'Type');
					//var _above = _.where(searchedMovies, {Rated: "PG-13"});

					var directives = {
				    	Title: {
				    		href: function (params) {
				    			return "#info/" + this.Title;
				   			}
				   		},
				   	};

					self.templateRender('movieList', searchedMovies, directives);

					mobileGesture.searchedMovies();

					sections.enablePage();
				},

				'info/?:name': function (name) {

					mobileGesture.info();

					getMovie.getLocalStorage();

					for (var i = 0; i < searchedMovies.length; i++) {
					 	if (searchedMovies[i].Title == name) {
					 		this.movieData = searchedMovies[i];
					 	};
					};
					
					var directives = {
				    	Poster: {
				    		src: function (params) {
				    			return this.Poster;
				   			}
				   		},
				   	};
				   	self.templateRender('info', this.movieData, directives);
					sections.enablePage();
				},
				'*': function () {
					sections.enablePage();
				}
			});
		},
		templateRender: function (id, data, directives) {
			var el = document.getElementById(id);
			if (directives) {
				Transparency.render(el, data, directives);
			} else {
				Transparency.render(el, data);
			}
		}
	};
}());