var getMovie = (function(){

	return {
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
				    	console.log("measfm");
			    //	}, 1000);
			    },
			    // error handler (optional)
			    function(data, xhr) {
			    	alert("Onze excuses! Er is iets mis gegaan bij het laden van de pagina. Controleer de internetverbinding en herlaad de pagina.");
			        console.log("test");
			        console.error(data, xhr.status);
			        loader.toggleOff();
			        // TO DO add ERROR USER
			    }
			);
		},
		searchEngine: function () {
			var _searchForm = document.querySelector('form');
			console.log(_searchForm);
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
	};
}());