var searchForm = (function () {
	var searchFormObj = {

		listner: function () {
			var _searchForm = util.getSelector('.search'), // gething some DOM elements
				searchButton = util.getId('searchButton'),
				_searchField = util.getId('searchField'),
				_searchQuery = "";
			
			searchButton.onsubmit = function (event) { // listens to the onsubmit function of the form
				event.preventDefault(); // dont let it do its usual thing bit instead: 

				_searchQuery = _searchField.value; // get the value from the searchfied
				getResult.searchRequest(_searchQuery); // invoke the datarequest function
			};
		},
		listnerWizard: function () {
			var form = util.getId("searchWizardForm")
				searchButton = util.getId('searchButton');

			var answers = {
				place: "heel-nederland",
				priceMin: "0",
				priceMax: "1999000000",
				houseType: "",
				outdoor: "",
				roomsMin: "0",
				roomsMax: "999",
				url: ""
			};

			var currentFieldset = 0;
			var fieldsets = document.querySelectorAll('fieldset');
			var nextButtons = document.querySelectorAll('.next');

			for (var i = 0; i < nextButtons.length; i++) {

				nextButtons[i].onclick = function (event) {
					event.preventDefault();
					console.log(fieldsets);
					fieldsets[currentFieldset].classList.add('hidden');
					currentFieldset ++;
					fieldsets[currentFieldset].classList.remove('hidden');
				};

    		};

			form.onchange = function (event) {
				event.preventDefault();
				console.log(event.target.value);

				switch (event.target.name) {
					case "place":
						answers.place = event.target.value;
						if (answers.place === "") {
							answers.houseType = "heel-nederland";
						}
						break;
					case "priceMin":
						answers.priceMin = event.target.value;
						break;
					case "priceMax":
						answers.priceMax = event.target.value;
						break;
					case "houseType":
						answers.houseType = event.target.value;
						break;
					case "outdoor":
						answers.outdoor = event.target.value;
					case "roomsMin":
						answers.roomsMin = event.target.value;
						break;
					case "roomsMax":
						answers.roomsMax = event.target.value;
						break;
				};
			};

			form.onsubmit = function (event) {
				event.preventDefault();
				answers.url = answers.place + "/" + answers.priceMin + "-" + answers.priceMax + "/" + answers.roomsMin + "-" + answers.roomsMax + "-kamers" + "/" + answers.houseType + "/" + answers.outdoor;
				console.log(answers);
				getResult.searchRequest(answers.url);
			};
		}
	};

	return {
		listner: searchFormObj.listner,
		listnerWizard: searchFormObj.listnerWizard
	};

}());





















