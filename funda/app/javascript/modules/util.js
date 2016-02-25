var util = (function () {
	
	var utilObj = {
		getId: function (id) { // simple function to get get element from the DOM
			return document.getElementById(id);
		},
		getSelector: function (selector) { // simple function to get get element from the DOM
			return document.querySelector(selector);
		},
		addPrice: function (x) {
    		x = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    		return x = "€ " + x
		}
	};

	return {
		getId: utilObj.getId, 
		getSelector: utilObj.getSelector,
		addPrice: utilObj.addPrice
	};

}());


