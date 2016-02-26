var mobileGesture = (function () {

	var gestureObj = {
		// some settings and values
		_homePage: util.getId('home'),
		_stap1: util.getId('stap1'),
		_stap2: util.getId('stap2'),
		_stap3: util.getId('stap3'),
		_stap4: util.getId('stap4'),
		_stap5: util.getId('stap5'),
		_object: util.getId('object'),
		_result: util.getId('result'),
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

			gestureObj.mcAddGesture(gestureObj.RTL, "stap1", gestureObj._stap1);
			//gestureObj.mcAddGesture(gestureObj.LTR, "searchedMovies", gestureObj._searchedMovies);

		},
		stap1: function () {

			gestureObj.createMc(gestureObj._stap1)

			gestureObj.mcAddGesture(gestureObj.RTL, "stap2", gestureObj._stap2);
			gestureObj.mcAddGesture(gestureObj.LTR, "home", gestureObj._homePage);

		},
		stap2: function () {

			gestureObj.createMc(gestureObj._stap2)

			gestureObj.mcAddGesture(gestureObj.RTL, "stap3", gestureObj._stap3);
			gestureObj.mcAddGesture(gestureObj.LTR, "stap1", gestureObj._stap1);

		},
		stap3: function () {

			gestureObj.createMc(gestureObj._stap3)

			gestureObj.mcAddGesture(gestureObj.RTL, "stap4", gestureObj._stap4);
			gestureObj.mcAddGesture(gestureObj.LTR, "stap2", gestureObj._stap2);

		},
		stap4: function () {

			gestureObj.createMc(gestureObj._stap4)

			gestureObj.mcAddGesture(gestureObj.RTL, "stap5", gestureObj._stap5);
			gestureObj.mcAddGesture(gestureObj.LTR, "stap3", gestureObj._stap3);

		},
		stap5: function () {

			gestureObj.createMc(gestureObj._stap5)

			gestureObj.mcAddGesture(gestureObj.RTL, "result", gestureObj._result);
			gestureObj.mcAddGesture(gestureObj.LTR, "stap4", gestureObj._stap4);

		},
		result: function () {

			gestureObj.createMc(gestureObj._result)

			//gestureObj.mcAddGesture(gestureObj.RTL, "result", gestureObj._result);
			gestureObj.mcAddGesture(gestureObj.LTR, "stap5", gestureObj._stap5);

		},
		object: function () {

			gestureObj.createMc(gestureObj._object)

			//gestureObj.mcAddGesture(gestureObj.RTL, "result", gestureObj._result);
			gestureObj.mcAddGesture(gestureObj.LTR, "result", gestureObj._result);

		}
	};

	return {
		home: gestureObj.home,
		stap1: gestureObj.stap1,
		stap2: gestureObj.stap2,
		stap3: gestureObj.stap3,
		stap4: gestureObj.stap4,
		stap5: gestureObj.stap5,
		result: gestureObj.result,
		object: gestureObj.object
	};

}());








