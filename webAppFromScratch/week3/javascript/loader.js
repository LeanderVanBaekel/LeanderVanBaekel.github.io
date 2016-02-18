var loader = (function(){
	var loaderObj = {

		loaderElement: function () {
			return util.getId('loadXhr');
		},

		dataElement: function () {
			return util.getId('dataSection');
		},

		toggleOn: function () {
			loaderObj.loaderElement().classList.remove('hidden');
			loaderObj.dataElement().classList.add('hidden');
		},

		toggleOff: function () {
			loaderObj.loaderElement().classList.add('hidden');
			loaderObj.dataElement().classList.remove('hidden');
		}
	};

	return {toggleOn: loaderObj.toggleOn, toggleOff: loaderObj.toggleOff};
}());
