var getMovie = (function () {
	var getMovieObj = {
		dataRequest: function (searchQuery, routes) {

			var self = getMovieObj;
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
			    		self.enterData(movieData, routes);
			    		localstorage.save(movieData);
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
			    }
			);
		},
		searchEngine: function (routes) {
			var _searchForm = util.getSelector('form');
			var _searchField = util.getId('searchField');
			var _searchQuery = "";
			var self = getMovieObj;
			_searchForm.onsubmit = function (event) {
				event.preventDefault();

				_searchQuery = _searchField.value;
				self.dataRequest(_searchQuery, routes);
			};
		},
		enterData: function (movieData, routes) {

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

	return {searchEngine: getMovieObj.searchEngine};

}());