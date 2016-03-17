var sections = (function () {

	var hidden = "hidden",
		thisPage = window.location.hash,
		oldPage = undefined;

	var sectionsObj = {

		// function called in the app.innit to hide al pages
		// this is not done in the html because we want the page to be visible if there is no javascript in the browser
		hideAll: function () {
			if (document.querySelectorAll) {
				var allPages = document.querySelectorAll(".page"); // saving al the pages from the HTML
				
				for (var i = 0; i < allPages.length; i++) { // loop through the pages
					console.log(i);
					allPages[i].classList.add(hidden);
				};

				if (!window.location.hash) { // if the user did not enter a hash, he wil go to home
					window.location.hash = '#home';
				}
			}
		},

		// enabling page by removing .hidden class
		enablePage: function () {
			var _pageId;
			thisPage = window.location.hash;
			thisPage = thisPage.split('/')[0];

			if (thisPage) {
				_pageId = util.getSelector(thisPage);
				_pageId.classList.remove(hidden);
			}
			
			if (oldPage) { // if there was a previous page, disable that one
				sectionsObj.disablePage();
			}
			oldPage = thisPage;

		},

		// disabling page by adding hidden class
		disablePage: function () {

			var _pageId;
			if (oldPage && oldPage !== thisPage) {
				_pageId = util.getSelector(oldPage);
			}

			if (_pageId) {
				_pageId.classList.add(hidden);
			}
		}
	};

	return {
		hideAll: sectionsObj.hideAll, 
		enablePage: sectionsObj.enablePage, 
		disablePage: sectionsObj.disablePage
	};

}());


