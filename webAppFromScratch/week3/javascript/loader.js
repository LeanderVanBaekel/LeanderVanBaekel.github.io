var loader = (function(){
	var loaderOb = {

		loaderElement: function () {
			return document.getElementById('loadXhr');
		},

		dataElement: function () {
			return document.getElementById('dataSection');
		},

		toggleOn: function () {
			loaderOb.loaderElement().classList.remove('hidden');
			loaderOb.dataElement().classList.add('hidden');
		},

		toggleOff: function () {
			loaderOb.loaderElement().classList.add('hidden');
			loaderOb.dataElement().classList.remove('hidden');
		}
	};

	return {toggleOn: loaderOb.toggleOn, toggleOff: loaderOb.toggleOff};
}());
