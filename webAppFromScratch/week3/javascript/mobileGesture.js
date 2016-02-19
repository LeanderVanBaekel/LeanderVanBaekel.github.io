var mobileGesture = (function () {

	var gestureObj = {
		// some settings and values
		_homePage: util.getId('home'),
		_movieFinder: util.getId('movieFinder'),
		_searchedMovies: util.getId('searchedMovies'),
		_info: util.getId('info'),
		RTL: ["swipeleft", "RTL 0.3s 1"],
		LTR: ["swiperight", "LTR 0.3s 1"],
		mc: "",



		createMc: function (element) { // creating a new Hammer function
			return gestureObj.mc = new Hammer(element);
		},

		mcAddGesture: function (direction, hash, element) { // function to add gestures to the Hammer function
			var direction = direction,
				hash = hash,
				element = element;
			gestureObj.mc.on(direction[0], function(ev) {
			    window.location.hash = hash;
			    element.style.animation = direction[1];
			});
		},
		
		// Make the Hammer functions specific to the pages
		home: function () {

			gestureObj.createMc(gestureObj._homePage)

			gestureObj.mcAddGesture(gestureObj.RTL, "movieFinder", gestureObj._movieFinder);
			gestureObj.mcAddGesture(gestureObj.LTR, "searchedMovies", gestureObj._searchedMovies);

		},
		movieFinder: function () {

			gestureObj.createMc(gestureObj._movieFinder)

			gestureObj.mcAddGesture(gestureObj.RTL, "searchedMovies", gestureObj._searchedMovies);
			gestureObj.mcAddGesture(gestureObj.LTR, "home", gestureObj._homePage);
		},
		searchedMovies: function () {

			gestureObj.createMc(gestureObj._searchedMovies)

			gestureObj.mcAddGesture(gestureObj.RTL, "home", gestureObj._homePage);
			gestureObj.mcAddGesture(gestureObj.LTR, "movieFinder", gestureObj._movieFinder);
		},
		info: function () {

			gestureObj.createMc(gestureObj._info)

			gestureObj.mcAddGesture(gestureObj.RTL, "searchedMovies", gestureObj._searchedMovies);
			gestureObj.mcAddGesture(gestureObj.LTR, "movieFinder", gestureObj._movieFinder);
		}
	};

	return {home: gestureObj.home, movieFinder: gestureObj.movieFinder, searchedMovies: gestureObj.searchedMovies, info: gestureObj.info};

}());








