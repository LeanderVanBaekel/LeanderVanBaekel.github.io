(function () {
    'use strict';
    
    // making some variables
    var hidden  = "hidden",
    	thisPage = window.location.hash,
    	oldPage = "",
    	url		= window.location.hash;

    var app = {
    	init: function () {
    		sections.hideAll();
    		routes.routie();
    	}
    };

	var routes = {

		routie: function () {
			routie ({
				'home': function () {

					var data = {
						welcome: "hallooo!"
					}

					Transparency.render(document.getElementById('home'), data);
					sections.enablePage();
				},

				'bestPractices': function () {
					sections.enablePage();
				},

				'apiData': function () {


					var movieData = {
						Title: "Je moet eerst zoeken!",
						Year: ""
					};

					var requestData = function(searchQuery) {
						var urlData = {
							baseUrl : 'http://www.omdbapi.com/?t=',
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
						      // load the list of pokemon into the pokedex, since it contains all the pokemon its the national pokedex.
						      // its not a string, so no need to parse the JSON
						      movieData = data;
						      console.log(movieData);
						      //log to check
						      enterData();

						    },
						    // error handler (optional)
						    function(data, xhr) {
						      console.error(data, xhr.status);
						    }
						);
					}


					var searchEngine = function () {
						var _searchForm = document.querySelector('form');
						var _searchField = document.getElementById('searchField');
						var _searchQuery = "";

						_searchForm.onsubmit = function (event) {
							event.preventDefault();
							_searchQuery = _searchField.value;
							requestData(_searchQuery);
						};
					}

					var enterData = function () {

						var derectives = {
					    	Poster: {
					    		src: function (params) {
					    			return this.Poster;
					   			}
					   		}
					   	};

						Transparency.render(document.getElementById('dataSection'), movieData,derectives);
					};

					Transparency.render(document.getElementById('apiData'), movieData);
					sections.enablePage();

					searchEngine();
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
			} else {
				this.notFound();
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
		},

		// if hash doesn't exist
		notFound: function () {
			window.location.hash = 'notFound';
			//this.enablePage();
		}
	};




	app.init();

})();





































