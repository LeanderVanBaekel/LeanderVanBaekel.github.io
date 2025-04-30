var routes = (function () {
    // routie routes
	var routesObj = {
		
		routie: function (movieData) {
			var self = routesObj; // Takes care of the 'this' function when the routes go in to the Routie script
			routie ({
				'home': function () {
					templates.render('home', {welcome: "Hallo!"}); // Rendering the data for the page with Transparancy
		     		mobileGesture.home(); // Adding mobile gestures to the homepage
					sections.enablePage(); // Showing the section to the user
				},
				'object/?:objectId': function (objectId) {
					var objectData = getResult.objectRequest(objectId);
					templates.render('object', objectData, true); // Rendering the data for the page with Transparancy
		    		mobileGesture.object(); // Adding mobile gestures to the homepage
					sections.enablePage(); // Showing the section to the user
				},
				'stap1': function () {
					sections.enablePage();
					mobileGesture.stap1(); 
				},
				'stap2': function () {
					sections.enablePage();
					mobileGesture.stap2(); 
				},
				'stap3': function () {
					sections.enablePage();
					mobileGesture.stap3(); 
				},
				'stap4': function () {
					sections.enablePage();
					mobileGesture.stap4(); 
				},
				'stap5': function () {
					sections.enablePage();
					mobileGesture.stap5(); 
				},
				'result': function () {
					sections.enablePage();
					mobileGesture.result(); 
					searchForm.answers.url = searchForm.answers.place + "/" + searchForm.answers.distance + "/" + searchForm.answers.priceMin + "-" + searchForm.answers.priceMax + "/" + searchForm.answers.roomsMin + "-" + searchForm.answers.roomsMax + "-kamers" + "/" + searchForm.answers.houseType + "/" + searchForm.answers.outdoor;
					console.log(searchForm.answers);
					if (searchForm.answers.oldUrl != searchForm.answers.url) {
						getResult.searchRequest(searchForm.answers.url);
					}
					searchForm.answers.oldUrl = searchForm.answers.url;
				}
			});
		}
	};

	return {
		routie: routesObj.routie
	};

}());


