var getMovie = (function () {
	var getMovieObj = {

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
						templates.render('dataSection', movieData, true);
				    	loader.toggleOff(); // disable loader
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
		}
	};

	return {
		dataRequest: getMovieObj.dataRequest
	};

}());