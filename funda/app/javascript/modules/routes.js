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
					searchForm.listner();
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
				}
			});
		}
	};

	return {
		routie: routesObj.routie
	};

}());


