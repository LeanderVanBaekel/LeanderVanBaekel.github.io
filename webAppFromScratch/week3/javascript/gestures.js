var mobileGesture = (function(){

	return {
		_homePage: document.getElementById('home'),
		_movieFinder: document.getElementById('movieFinder'),
		_searchedMovies: document.getElementById('searchedMovies'),
		_info: document.getElementById('info'),
		mc: "",
		RTL: ["swipeleft", "this.RTL 0.3s 1"],
		LTR: ["swiperight", "LTR 0.3s 1"],

		home: function () {

			this.createMc(this._homePage)

			this.mcAddGesture(this.RTL, "movieFinder", this._movieFinder);
			this.mcAddGesture(this.LTR, "searchedMovies", this._searchedMovies);

		},

		createMc: function (element) {
			return mc = new Hammer(element);
		},
		mcAddGesture: function (direction, hash, element) {
			var direction = direction,
				hash = hash,
				element = element;
			mc.on(direction[0], function(ev) {
				//console.log(hash);
			    window.location.hash = hash;
			    element.style.animation = direction[1];
			});
		},

		movieFinder: function () {

			this.createMc(this._movieFinder)

			this.mcAddGesture(this.RTL, "searchedMovies", this._searchedMovies);
			this.mcAddGesture(this.LTR, "home", this._homePage);
		},
		searchedMovies: function () {

			this.createMc(this._searchedMovies)

			this.mcAddGesture(this.RTL, "home", this._homePage);
			this.mcAddGesture(this.LTR, "movieFinder", this._movieFinder);
		},
		info: function () {

			this.createMc(this._info)

			this.mcAddGesture(this.RTL, "searchedMovies", this._searchedMovies);
			this.mcAddGesture(this.LTR, "movieFinder", this._movieFinder);
		}
	};
}());