var getResult = (function () {

	var requestData = {};

	var dataRequestObj = {
		//http://www.funda.nl/koop/heemskerk/1967ec/+10km/175000-2000000/woonhuis/2-2-kamers/tuin/
		dataRequest: function (baseUrl, searchQuery, urlOptions, cb) {
			var urlData = { // URL elements, with a function to tape them together
				baseUrl : baseUrl,
				searchQuery: searchQuery.split(' ').join('-'), // http://stackoverflow.com/questions/441018/replacing-spaces-with-underscores-in-javascript
				urlOptions: urlOptions,
				request : function(){
					if (urlOptions) {
						return pegasus(this.baseUrl + this.searchQuery + this.urlOptions);
					} else {
						return pegasus(this.baseUrl + this.searchQuery);
					}
				}
			};

			var urlRequest = urlData.request();

			loader.toggleOn(); // Show loader
			urlRequest.then( // start request to API with a promise
							    
				function(data, xhr) {
					if (data.Response !== "False") { // if there is movie data
			    		requestData = data; 
			    		console.log(requestData);
				    	loader.toggleOff(); // disable loader
			    		//return requestData;
			    		return cb();
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

	var getResultObj = {

		searchRequest: function (searchQuery) {
			var requestUrl = "http://funda.kyrandia.nl/feeds/Aanbod.svc/json/e2d60e885b8742d4b0648300e3703bd7/?type=koop&zo=/";
			dataRequestObj.dataRequest(requestUrl, searchQuery, '/&page=1&pagesize=25', function () {
				templates.render('metadata', requestData.Metadata); // Rendering the data for the page with Transparancy
				for (var i = 0; i < requestData.Objects.length; i++) {
					requestData.Objects[i].Prijs.Koopprijs = util.addPrice(requestData.Objects[i].Prijs.Koopprijs);
				}
				templates.render('dataSection', requestData.Objects, true);
			});
		},
		objectRequest: function (searchQuery) {
			var requestUrl = "http://funda.kyrandia.nl/feeds/Aanbod.svc/json/detail/e2d60e885b8742d4b0648300e3703bd7/koop/";
			dataRequestObj.dataRequest(requestUrl, searchQuery, null, function () {
				requestData.Prijs.Koopprijs = util.addPrice(requestData.Prijs.Koopprijs);
				templates.render('object', requestData, true);
			});
		}
	};

	return {
		searchRequest: getResultObj.searchRequest,
		objectRequest: getResultObj.objectRequest
	};

}());










