var searchForm = (function () {
	var searchFormObj = {


		 answers : {
				place: "heel-nederland",
				priceMin: "0",
				priceMax: "1999000000",
				houseType: "",
				outdoor: "",
				roomsMin: "0",
				roomsMax: "999",
				url: "",
				oldUrl: ""
			},

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

			for (var i = 0; i < fieldsets.length; i++) {

				fieldsets[i].onchange = function () {
					event.preventDefault();
					console.log(event.target.value);

					switch (event.target.name) {
						case "place":
							searchForm.answers.place = event.target.value;
							if (searchForm.answers.place === "") {
								searchForm.answers.houseType = "heel-nederland";
							}
							break;
						case "priceMin":
							searchForm.answers.priceMin = event.target.value;
							break;
						case "priceMax":
							searchForm.answers.priceMax = event.target.value;
							break;
						case "houseType":
							searchForm.answers.houseType = event.target.value;
							break;
						case "outdoor":
							searchForm.answers.outdoor = event.target.value;
							break;
						case "roomsMin":
							searchForm.answers.roomsMin = event.target.value;
							break;
						case "roomsMax":
							searchForm.answers.roomsMax = event.target.value;
							break;
					};
				}

    		};

			// form.onchange = function (event) {
			// 	event.preventDefault();
			// 	console.log(event.target.value);

			// 	switch (event.target.name) {
			// 		case "place":
			// 			answers.place = event.target.value;
			// 			if (answers.place === "") {
			// 				answers.houseType = "heel-nederland";
			// 			}
			// 			break;
			// 		case "priceMin":
			// 			answers.priceMin = event.target.value;
			// 			break;
			// 		case "priceMax":
			// 			answers.priceMax = event.target.value;
			// 			break;
			// 		case "houseType":
			// 			answers.houseType = event.target.value;
			// 			break;
			// 		case "outdoor":
			// 			answers.outdoor = event.target.value;
			// 			break;
			// 		case "roomsMin":
			// 			answers.roomsMin = event.target.value;
			// 			break;
			// 		case "roomsMax":
			// 			answers.roomsMax = event.target.value;
			// 			break;
			// 	};
			// };

			form.onsubmit = function (event) {
				event.preventDefault();
				window.location.hash = "result";
			};
		}
	};

	return {
		listner: searchFormObj.listner,
		listnerWizard: searchFormObj.listnerWizard,
		answers: searchFormObj.answers
	};

}());





















