(function () {
    'use strict';

    // making some variables
    var hidden  = "hidden",
    	urlHash = "",
    	url		= window.location.href;

    // starting app
    var app = {
		init: function () {
			// calling eventListener for the hashtags
			routes.init();
			// hidding al the pages
			sections.hideAll();
		}
	};

	// functions for helping the user change pages
	var routes = {

		// the eventlistner for whatching the hash change
		init: function () {
			window.addEventListener('hashchange', function (event) {

				// saving the new and old hash in a variable
				var _newHash = routes.getUrlHash(event.newURL);
				var _oldHash = routes.getUrlHash(event.oldURL);

				// enable the page that the user whants to see
				sections.enablePage(_newHash);

				// hide the old page
				if (_oldHash) {
					sections.disablePage(_oldHash);
				}

			}, false);
		},

		// function (method) for splitting the hash from the url
		getUrlHash: function (urlIn) {

			var _url;

			if (urlIn) {
				_url = urlIn;
				_url = _url.split('#');
				urlHash = _url[1];
				return urlHash;
			}
		}
	}

	// functions for changing pages
	var sections = {

		// function called in the app.innit to hide al pages
		// this is not done in the html because we want the page to be visible if there is no javascript in the browser
		hideAll: function () {

			// saving al the pages from the HTML
			var allPages = document.querySelectorAll(".page");

			// get the hash the visitor came in with
			var _startHash = routes.getUrlHash(url); 

			// loop through the pages
			for (var i = 0; i < allPages.length; i++) {
				allPages[i].classList.add(hidden);
			};

			// checking if start hash exist if so direct to that page, else go to home			
			if (_startHash) {
				this.enablePage(_startHash)
			} else {
				window.location.hash = 'home';
			}
		},

		// enabeling the page by removing the hidden class
		enablePage: function (urlHash) {
			var _pageId = document.getElementById(urlHash);

			if (_pageId) {
				_pageId.classList.remove(hidden);
			} else {
				this.fourOfour();
			}
		},

		// disabeling page by adding hidden class
		disablePage: function (urlHash) {

			var _pageId = document.getElementById(urlHash);

			if (_pageId) {
				_pageId.classList.add(hidden);
			} else {
				this.fourOfour();
			}
		},

		// if hash doesn't exist
		fourOfour: function () {
			window.location.hash = '404';
			this.enablePage("404");
		}
	}

	app.init();

})();











