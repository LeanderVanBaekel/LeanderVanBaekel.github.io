var sortData = (function () {
	
	var sortDataObj = {

		alphabetical: function (data) {
			if (data) { // checks if they exist
				data = _.sortBy(data, 'Title'); // use Underscore to sort by alphabetical order
				return data;
			}
		},

		filterImg: function (data) {
			if (data) {
				data = _.filter(data, function (movie) { 
					return movie.Poster !== "N/A" 
				}); // use underscore to filter out objects with no img
				return data;
			}
		},

		getSpecificMovie: function (name) {
			searchedMovies = localstorage.get(); // Get data form localstorage

			for (var i = 0; i < searchedMovies.length; i++) { // looping through the data to find the movie matching the title
			 	if (searchedMovies[i].Title == name) {
			 		return movieData = searchedMovies[i];
			 	};
			};
		},
		reverse: function () {
			searchedMovies = localstorage.get(); // Get data form localstorage
			if (self.searchedMovies) { // check if there is data
				return self.searchedMovies = self.searchedMovies.reverse(); // reverse the movies so te will be displayed in chronological order
			}
		}
	};

	return {
		getSpecificMovie: sortDataObj.getSpecificMovie,
		alphabetical: sortDataObj.alphabetical,
		filterImg: sortDataObj.filterImg,
		reverse: sortDataObj.reverse
	};

}());
