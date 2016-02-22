var searchForm = (function () {
	var searchFormObj = {

		listner: function (routes) {
			var _searchForm = util.getSelector('form'), // gething some DOM elements
				_searchField = util.getId('searchField'),
				_searchQuery = "";
			
			_searchForm.onsubmit = function (event) { // listens to the onsubmit function of the form
				event.preventDefault(); // dont let it do its usual thing bit instead: 

				_searchQuery = _searchField.value; // get the value from the searchfied
				getMovie.dataRequest(_searchQuery, routes); // invoke the datarequest function
			};
		}
	};

	return {
		listner: searchFormObj.listner
	};

}());