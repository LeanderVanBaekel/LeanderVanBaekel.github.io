var mobileGesture = (function () {

	var gestureObj = {
		// some settings and values
		_homePage: util.getId('home'),
		RTL: ["swipeleft", "RTL 0.3s 1"], // RTL = Animation name for Right to Left page swipe
		LTR: ["swiperight", "LTR 0.3s 1"], // LTR = Animation name for Left to Right page swipe
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

			// gestureObj.mcAddGesture(gestureObj.RTL, "movieFinder", gestureObj._movieFinder);
			// gestureObj.mcAddGesture(gestureObj.LTR, "searchedMovies", gestureObj._searchedMovies);

		}
	};

	return {
		home: gestureObj.home
	};

}());








