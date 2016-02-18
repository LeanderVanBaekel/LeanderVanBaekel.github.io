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
    var launch = {
    	init: function () {
    		sections.hideAll();
    		routes.routie();
    	}
    };

    // routie routes
	var routes = {
		routieDirectives: function () {

		},
		
		routie: function () {
			var self = this;
			routie ({
				'home': function () {
					searchedMovies = localstorage.get();
					if (searchedMovies) {
						searchedMovies = searchedMovies.reverse()
					}

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
					self.templateRender('movieFinder', movieData);
					sections.enablePage();
					mobileGesture.movieFinder();
					getMovie.searchEngine();
				},
				'searchedMovies' : function () {
					searchedMovies = localstorage.get();

					// use underscore
					//var _underscoreMovieData = _.groupBy(searchedMovies, 'Type');
					//var _above = _.where(searchedMovies, {Rated: "PG-13"});

					var directives = {
				    	Title: {
				    		href: function (params) {
				    			return "#info/" + this.Title;
				   			}
				   		},
				   	};

					self.templateRender('movieList', searchedMovies, directives);
					//self.templateRender('above', _above);

					mobileGesture.searchedMovies();

					sections.enablePage();
				},

				'info/?:name': function (name) {

					mobileGesture.info();

					searchedMovies = localstorage.get();

					for (var i = 0; i < searchedMovies.length; i++) {
					 	if (searchedMovies[i].Title == name) {
					 		movieData = searchedMovies[i];
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
					sections.enablePage();
				},
				'*': function () {
					sections.enablePage();
				}
			});
		},
		templateRender: function (id, data, directives) {
			var el = util.getId(id);
			if (directives) {
				Transparency.render(el, data, directives);
			} else {
				Transparency.render(el, data);
			}
		}
	};

	var sections = {

		// function called in the app.innit to hide al pages
		// this is not done in the html because we want the page to be visible if there is no javascript in the browser
		hideAll: function () {
			
			var allPages = document.querySelectorAll(".page"); // saving al the pages from the HTML
			
			for (var i = 0; i < allPages.length; i++) { // loop through the pages
				allPages[i].classList.add(hidden);
			};

			if (!window.location.hash) {
				window.location.hash = '#home';
			}
		},

		enablePage: function () {
			var _pageId;
			thisPage = window.location.hash;
			thisPage = thisPage.split('/')[0];

			if (thisPage) {
				_pageId = util.getSelector(thisPage);
				_pageId.classList.remove(hidden);
			}
			
			if (oldPage) {
				this.disablePage();
			}
			oldPage = thisPage;

		},

		// disabeling page by adding hidden class
		disablePage: function () {

			var _pageId;
			if (oldPage && oldPage !== thisPage) {
				_pageId = util.getSelector(oldPage);
			}

			if (_pageId) {
				_pageId.classList.add(hidden);
			}
		}
	};

	var getMovie = {
		dataRequest: function (searchQuery) {

			var self = this;
			var urlData = {
				baseUrl : 'https://www.omdbapi.com/?t=',
				searchQuery: searchQuery.split(' ').join('+'), // http://stackoverflow.com/questions/441018/replacing-spaces-with-underscores-in-javascript
				urlOptions: '&y=&plot=full&r=json',
				request : function(base, searchQuery, urlOptions){
					return pegasus(base + searchQuery + urlOptions);
				}
			};

			var movieRequest = urlData.request(urlData.baseUrl, urlData.searchQuery, urlData.urlOptions);

			// https://github.com/Wasknijper/MWD-WebAppFromScratch/blob/gh-pages/week2-opdrachten/static/app.js
			// with help from Maaike Hek
				loader.toggleOn();
				movieRequest.then( // promise
							    
			    // success handler
				function(data, xhr) {
					if (data.Response !== "False") {
			    		movieData = data;
			    		self.enterData();
			    		localstorage.save(movieData, searchedMovies);
			    	} else {
			    		alert("We hebben helaas geen film kunnen vinden.");
			        	console.error(data, xhr.status);
			        	loader.toggleOff();
			    	}
			    },
			    // error handler (optional)
			    function(data, xhr) {
			    	alert("Onze excuses! Er is iets mis gegaan bij het laden van de pagina. Controleer de internetverbinding en herlaad de pagina.");
			        console.error(data, xhr.status);
			        loader.toggleOff();
			        // TO DO add ERROR USER
			    }
			);
		},
		searchEngine: function () {
			var _searchForm = util.getSelector('form');
			var _searchField = util.getId('searchField');
			var _searchQuery = "";
			var self = this;
			_searchForm.onsubmit = function (event) {
				event.preventDefault();

				_searchQuery = _searchField.value;
				self.dataRequest(_searchQuery);
			};
		},
		enterData: function () {

	    	loader.toggleOff();


			var directives = {
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

			routes.templateRender('dataSection', movieData, directives);
		}

	}

	launch.init();

})();





































