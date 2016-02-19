var util = (function () {
	
	var utilObj = {
		getId: function (id) { // simple function to get get element from the DOM
			return document.getElementById(id);
		},
		getSelector: function (selector) { // simple function to get get element from the DOM
			return document.querySelector(selector);
		}
	};

	return {
		getId: utilObj.getId, 
		getSelector: utilObj.getSelector
	};

}());


