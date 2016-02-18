var sections = (function(){

	return {
		// function called in the app.innit to hide al pages
		// this is not done in the html because we want the page to be visible if there is no javascript in the browser
		hidden: "hidden",
    	thisPage: window.location.hash,
    	oldPage: "",
    	url: window.location.hash,

		hideAll: function () {
			
			var allPages = document.querySelectorAll(".page"); // saving al the pages from the HTML
			
			for (var i = 0; i < allPages.length; i++) { // loop through the pages
				allPages[i].classList.add(this.hidden);
			};

			if (!window.location.hash) {
				window.location.hash = '#home';
			}
		},

		enablePage: function () {
			var _pageId;
			this.thisPage = window.location.hash;
			this.thisPage = this.thisPage.split('/')[0];

			if (this.thisPage) {
				_pageId = document.querySelector(this.thisPage);
				_pageId.classList.remove(this.hidden);
			}
			
			if (this.oldPage) {
				this.disablePage();
			}
			this.oldPage = this.thisPage;

		},

		// disabeling page by adding hidden class
		disablePage: function () {

			var _pageId;
			if (this.oldPage && this.oldPage !== this.thisPage) {
				_pageId = document.querySelector(this.oldPage);
			}

			if (_pageId) {
				_pageId.classList.add(this.hidden);
			}
		}
	};
}());