var loader = (function(){
	return {
		toggleOn: function () {
			document.getElementById('loadXhr').classList.remove('hidden');
			document.getElementById('dataSection').classList.add('hidden');
		},
		toggleOff: function () {
			document.getElementById('loadXhr').classList.add('hidden');
			document.getElementById('dataSection').classList.remove('hidden');
		}
	};
}());