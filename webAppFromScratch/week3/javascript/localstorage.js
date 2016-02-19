var localstorage = (function () {

	
	var localstorageObj = {

		save : function (movieData) {

			var searchedMovies = localstorageObj.get(); // get data from localstorage
			
			if (!_.find(searchedMovies, movieData)) { // check if movie is already in the localstorage
				searchedMovies.push(movieData); // add new data to existing data
				localStorage.setItem("searchedMovies", JSON.stringify(searchedMovies)); // set new data to localstorage

			}
		},

		get : function () {
			if (localStorage.searchedMovies) { // check if there is data 
				return searchedMovies = JSON.parse(localStorage.searchedMovies); // return the data as an array with objects
			} else {
				return searchedMovies = []; // return an empty array
			};
		}
	};

	return {save: localstorageObj.save, get: localstorageObj.get};

}());


