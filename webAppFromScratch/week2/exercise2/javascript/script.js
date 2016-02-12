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
			pageTitle: "Movie Finder",
			Genre: "N/A",
			Plot: "Plot"
		};

	// start the web app
    var app = {
    	init: function () {
    		sections.hideAll();
    		routes.routie();
    	}
    };

    // routie routes
	var routes = {
		routieDirectives: {
	    	Poster: {
	    		src: function (params) {
	    			return this.Poster;
	   			}
	   		}
	   	},

		routie: function () {
			routie ({
				'home': function () {
					var data = { welcome: "hallooo!"};
					Transparency.render(document.getElementById('home'), data);
					sections.enablePage();
				},
				'bestPractices': function () {
					sections.enablePage();
				},
				'movieFinder': function () {

					Transparency.render(document.getElementById('movieFinder'), movieData);
					sections.enablePage();
					getMovie.searchEngine();
				},
				'moreInfo': function () {
					Transparency.render(document.getElementById('moreInfo'), movieData);
				},
				'*': function () {
					sections.enablePage();
				}
			});
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
				baseUrl : '//www.omdbapi.com/?t=',
				searchQuery: searchQuery.split(' ').join('+'), // http://stackoverflow.com/questions/441018/replacing-spaces-with-underscores-in-javascript
				urlOptions: '&y=&plot=full&r=json',
				request : function(base, searchQuery, urlOptions){
					return pegasus(base + searchQuery + urlOptions);
				}
			};

			var movieRequest = urlData.request(urlData.baseUrl, urlData.searchQuery, urlData.urlOptions);

			movieRequest.then(
			    // success handler
			    function(data, xhr) {
			    	movieData = data;
			    	console.log(movieData);
			    	self.enterData();
			    },
			    // error handler (optional)
			    function(data, xhr) {
			      console.error(data, xhr.status);
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

			var derectives = 
			Transparency.render(document.getElementById('dataSection'), movieData, routie.routieDerectives);
		}

	}

	app.init();

})();





































