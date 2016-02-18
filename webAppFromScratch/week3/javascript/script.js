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
		searchedMovies = [],
		mc,
		RTL = ["swipeleft", "RTL 0.3s 1"],
		LTR = ["swiperight", "LTR 0.3s 1"];


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
					self.templateRender('movieFinder', movieData);
					sections.enablePage();
					mobileGesture.movieFinder();
					getMovie.searchEngine();
				},
				'searchedMovies' : function () {
					getMovie.getLocalStorage();

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

					getMovie.getLocalStorage();

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
			var el = document.getElementById(id);
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
				_pageId = document.querySelector(thisPage);
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
				_pageId = document.querySelector(oldPage);
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
			movieRequest.then( // promise
			    // success handler
			    function(data, xhr) {
			    	loader.toggleOn();
			    	//setTimeout(function(){ // Timout om Spinner te showen!!!
				    	movieData = data;
				    	self.enterData();
				    	self.saveToLocalStorage();
			    //	}, 1000);
			    },
			    // error handler (optional)
			    function(data, xhr) {
			        console.error(data, xhr.status);
			        loader.toggleOff();
			        // TO DO add ERROR USER
			    }
			);
		},
		searchEngine: function () {
			var _searchForm = document.querySelector('form');
			var _searchField = document.getElementById('searchField');
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

	    	console.log(movieData);

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
		},
		saveToLocalStorage : function () {

			this.getLocalStorage();
			// check if movie is already in the localstorage
			if (!_.find(searchedMovies, movieData)) {
				searchedMovies.push(movieData);
				localStorage.setItem("searchedMovies", JSON.stringify(searchedMovies));
			}
		},
		getLocalStorage : function () {

			if (localStorage.searchedMovies) {
				searchedMovies = JSON.parse(localStorage.searchedMovies);
				// console.table(searchedMovies);
			};
		}
	}

	var mobileGesture = {
		_homePage: document.getElementById('home'),
		_movieFinder: document.getElementById('movieFinder'),
		_searchedMovies: document.getElementById('searchedMovies'),
		_info: document.getElementById('info'),

		home: function () {

			this.createMc(this._homePage)

			this.mcAddGesture(RTL, "movieFinder", this._movieFinder);
			this.mcAddGesture(LTR, "searchedMovies", this._searchedMovies);

		},

		createMc: function (element) {
			return mc = new Hammer(element);
		},
		mcAddGesture: function (direction, hash, element) {
			var direction = direction,
				hash = hash,
				element = element;
			mc.on(direction[0], function(ev) {
				//console.log(hash);
			    window.location.hash = hash;
			    element.style.animation = direction[1];
			});
		},

		movieFinder: function () {

			this.createMc(this._movieFinder)

			this.mcAddGesture(RTL, "searchedMovies", this._searchedMovies);
			this.mcAddGesture(LTR, "home", this._homePage);
		},
		searchedMovies: function () {

			this.createMc(this._searchedMovies)

			this.mcAddGesture(RTL, "home", this._homePage);
			this.mcAddGesture(LTR, "movieFinder", this._movieFinder);
		},
		info: function () {

			this.createMc(this._info)

			this.mcAddGesture(RTL, "searchedMovies", this._searchedMovies);
			this.mcAddGesture(LTR, "movieFinder", this._movieFinder);
		}
	};


	launch.init();

})();





































