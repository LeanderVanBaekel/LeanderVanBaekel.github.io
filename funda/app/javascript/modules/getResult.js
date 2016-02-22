var getResult = (function () {
	var getResultObj = {

		dataRequest: function (searchQuery) {

			var urlData = { // URL elements, with a function to tape them together
				baseUrl : 'http://funda.kyrandia.nl/feeds/Aanbod.svc/json/e2d60e885b8742d4b0648300e3703bd7/?type=koop&zo=/',
				searchQuery: searchQuery.split(' ').join('-'), // http://stackoverflow.com/questions/441018/replacing-spaces-with-underscores-in-javascript
				urlOptions: '/&page=1&pagesize=25',
				request : function(){
					return pegasus(this.baseUrl + this.searchQuery + this.urlOptions);
				}
			};

			var urlRequest = urlData.request(),
				requestData = {};

			// https://github.com/Wasknijper/MWD-WebAppFromScratch/blob/gh-pages/week2-opdrachten/static/app.js
			// with help from Maaike Hek
				loader.toggleOn(); // Show loader
				urlRequest.then( // start request to API with a promise
							    
				function(data, xhr) {
					if (data.Response !== "False") { // if there is movie data
			    		requestData = data; 
			    		console.log(requestData);
						templates.render('dataSection', requestData.Objects, true);
				    	loader.toggleOff(); // disable loader
			    	} else {
			    		alert("We hebben helaas geen huis kunnen vinden."); // if no movie data give the user feedback
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
		dataRequest: getResultObj.dataRequest
	};

}());