var searchForm = (function () {
	var searchFormObj = {

		listner: function (routes) {
			var _searchForm = util.getSelector('.search'), // gething some DOM elements
				_searchField = util.getId('searchField'),
				_searchQuery = "";
			
			_searchForm.onsubmit = function (event) { // listens to the onsubmit function of the form
				event.preventDefault(); // dont let it do its usual thing bit instead: 

				_searchQuery = _searchField.value; // get the value from the searchfied
				getMovie.dataRequest(_searchQuery, routes); // invoke the datarequest function
			};
		},
		listnerWizard: function () {
			var form = util.getId("searchWizardForm");

			var answers = {
				houseType: "",
				rooms: ""
			};

			form.onchange = function (event) {
				event.preventDefault();

				if (event.target.name == "houseType") {
					answers.houseType = event.target.value;
				} else if (event.target.name == "rooms") {
					answers.rooms = event.target.value;
				}
			};
		}
	};

	return {
		listner: searchFormObj.listner,
		listnerWizard: searchFormObj.listnerWizard
	};

}());
