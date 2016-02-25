var routes = (function () {
    // routie routes
	var routesObj = {
		
		routie: function (movieData) {
			var self = routesObj; // Takes care of the 'this' function when the routes go in to the Routie script
			routie ({
				'home': function () {
					templates.render('home', {welcome: "Hallo!"}); // Rendering the data for the page with Transparancy
		   //  		mobileGesture.home(); // Adding mobile gestures to the homepage
					// sections.enablePage(); // Showing the section to the user
					// searchForm.listner();
					sections.enablePage();
					//searchForm.listnerWizard();
				},
				'searchWizard': function () {
					sections.enablePage();
					searchForm.listnerWizard();
				},
				'object/?:objectId': function (objectId) {
					var objectData = getResult.objectRequest(objectId);
					templates.render('object', objectData, true); // Rendering the data for the page with Transparancy
		    		//mobileGesture.home(); // Adding mobile gestures to the homepage
					sections.enablePage(); // Showing the section to the user
					//searchForm.listner();
				},
				'stap1': function () {
					sections.enablePage();
				},
				'stap2': function () {
					sections.enablePage();
				},
				'stap3': function () {
					sections.enablePage();
				},
				'stap4': function () {
					sections.enablePage();
				},
				'stap5': function () {
					sections.enablePage();
				},
				'result': function () {
					sections.enablePage();
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


