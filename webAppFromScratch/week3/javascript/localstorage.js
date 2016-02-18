var localstorage = (function () {

	
	var localstorageObj = {

		save : function (movieData) {

			var searchedMovies = localstorageObj.get();
			// check if movie is already in the localstorage
			if (!_.find(searchedMovies, movieData)) {
				searchedMovies.push(movieData);
				localStorage.setItem("searchedMovies", JSON.stringify(searchedMovies));

			}
		},

		get : function () {
			if (localStorage.searchedMovies) {
				return searchedMovies = JSON.parse(localStorage.searchedMovies);
			} else {
				return searchedMovies = [];
			};
		}
	};

	return {save: localstorageObj.save, get: localstorageObj.get};

}());


