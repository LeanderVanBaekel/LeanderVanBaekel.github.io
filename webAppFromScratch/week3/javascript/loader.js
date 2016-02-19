var loader = (function(){

	// loading the DOM elements
	var loaderElement = util.getId('loadXhr'),
		dataElement = util.getId('dataSection');

	var loaderObj = {

		toggleOn: function () { // show loader hide movie data
			loaderElement.classList.remove('hidden');
			dataElement.classList.add('hidden');
		},

		toggleOff: function () { // show moviedata hide loader
			loaderElement.classList.add('hidden');
			dataElement.classList.remove('hidden');
		}
	};

	return {toggleOn: loaderObj.toggleOn, toggleOff: loaderObj.toggleOff};
}());
