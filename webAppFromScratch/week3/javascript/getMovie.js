var getMovie = (function () {
	var getMovieObj = {

		searchEngine: function (routes) {
			var _searchForm = util.getSelector('form'); // gething some DOM elements
			var _searchField = util.getId('searchField');
			var _searchQuery = "";
			var self = getMovieObj;
			_searchForm.onsubmit = function (event) { // listens to the onsubmit function of the form
				event.preventDefault(); // dont let it do its usual thing bit instead: 

				_searchQuery = _searchField.value; // get the value from the searchfied
				self.dataRequest(_searchQuery, routes); // invoke the datarequest function
			};
		},

		dataRequest: function (searchQuery, routes) {

			var self = getMovieObj;

			var urlData = { // URL elements, with a function to tape them together
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
				loader.toggleOn(); // Show loader
				movieRequest.then( // start reqest to API with a promise
							    
				function(data, xhr) {
					if (data.Response !== "False") { // if there is movie data
			    		movieData = data;
			    		self.enterData(movieData, routes); // enter movie data in the DOM
			    		localstorage.save(movieData); // save it in localstorage
			    	} else {
			    		alert("We hebben helaas geen film kunnen vinden."); // if no movie data give the user feedback
			        	console.error(data, xhr.status); // log the error
			        	loader.toggleOff(); // turn loader off
			    	}
			    },
			    function(data, xhr) { // if something goes horribly wrong.....
			    	alert("Onze excuses! Er is iets mis gegaan bij het laden van de pagina. Controleer de internetverbinding en herlaad de pagina.");
			        console.error(data, xhr.status);
			        loader.toggleOff();
			    }
			);
		},

		enterData: function (movieData, routes) {

	    	loader.toggleOff(); // disable loader
	    	console.table(movieData);
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
			routes.templateRender('dataSection', movieData, directives); // add data to the DOM
		}

	}

	return {searchEngine: getMovieObj.searchEngine};

}());