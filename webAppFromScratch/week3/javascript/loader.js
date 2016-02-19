var loader = (function(){
	var loaderObj = {

		loaderElement: function () {
			return util.getId('loadXhr');
		},

		dataElement: function () {
			return util.getId('dataSection');
		},

		toggleOn: function () {
			// Try to refer to the main object with this
			this.loaderElement().classList.remove('hidden');
			this.dataElement().classList.add('hidden');
		},

		toggleOff: function () {
			this.loaderElement().classList.add('hidden');
			this.dataElement().classList.remove('hidden');
		}
	};

	return {toggleOn: loaderObj.toggleOn, toggleOff: loaderObj.toggleOff};
}());
