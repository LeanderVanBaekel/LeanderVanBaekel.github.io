var templates = (function () {
    // routie routes
	var templatesObj = {
		
		render: function (id, data, directives) { // Function to render the Routie data
			var el = util.getId(id);

			var directivesObj = { // A Transparancy function to add atributes to al list of data
		    	Poster: {
		    		src: function (params) {
		    			return this.Poster;
		   			}
		   		},
		  		link: {
		    		href: function (params) {
		    			return "#info/" + this.Title;
		   			}
		   		},
		    	Title: {
		    		href: function (params) {
		    			return "#info/" + this.Title;
		   			}
		   		}
		   	};

			if (directives) {
				Transparency.render(el, data, directivesObj);
			} else {
				Transparency.render(el, data);
			}
		}

	};

	return {
		render: templatesObj.render
	};

}());