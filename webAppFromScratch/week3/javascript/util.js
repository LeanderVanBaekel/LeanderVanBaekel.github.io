var util = (function () {
	
	var utilObj = {
		getId: function (id) {
			return document.getElementById(id);
		},
		getSelector: function (selector) {
			return document.querySelector(selector);
		}
	};

	return {getId: utilObj.getId, getSelector: utilObj.getSelector};

}());


