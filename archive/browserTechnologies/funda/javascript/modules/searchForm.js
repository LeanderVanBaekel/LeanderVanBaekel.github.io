var searchForm = (function () {
	var searchFormObj = {

		 answers : {
			place: "heel-nederland",
			distance: "+15",
			priceMin: "0",
			priceMax: "1999000000",
			houseType: "",
			outdoor: "",
			roomsMin: "0",
			roomsMax: "999",
			url: "",
			oldUrl: ""
		},

		listnerWizard: function () {
			var form = util.getId("searchWizardForm");
			var fieldsets = document.querySelectorAll('fieldset');

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
						case "distance":
							searchForm.answers.distance = event.target.value;
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
		}
	};

	return {
		listner: searchFormObj.listner,
		listnerWizard: searchFormObj.listnerWizard,
		answers: searchFormObj.answers
	};

}());





















