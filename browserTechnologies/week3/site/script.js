// source: http://www.html5rocks.com/en/tutorials/dnd/basics/
// source: http://html5demos.com/drag
// source: http://stackoverflow.com/questions/2856262/detecting-html5-drag-and-drop-support-in-javascript

/******************
** Drag and Drop **
*******************/

if('draggable' in document.createElement('span') && window.innerWidth >= 672) {

  document.querySelector('.drop-zone-field').classList.remove('hidden')

	function addEvent(to, type, fn){
	    if(document.addEventListener){
	        to.addEventListener(type, fn, false);
	    } else if(document.attachEvent){
	        to.attachEvent('on'+type, fn);
	    } else {
	        to['on'+type] = fn;
	    }  
	};

  var element = '';

  var products = document.querySelectorAll('.product'), el = null;
  for (var i = 0; i < products.length; i++) {
    el = products[i];

    el.setAttribute('draggable', 'true');
  
    addEvent(el, 'dragstart', function (e) {
    	element=e.target;
    	console.log(e);
      e.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
      e.dataTransfer.setData('Text', this.id); // required otherwise doesn't work
    	
    });
  }

  var dropZone = document.querySelector('.drop-zone');

  addEvent(dropZone, 'dragover', function (e) {
    if (e.preventDefault) e.preventDefault(); // allows us to drop
    // this.className += ' over';
    e.dataTransfer.dropEffect = 'copy';
    return false;
  });

  addEvent(dropZone, 'drop', function (e) {
    if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting...why???

    var list = document.getElementById('list');

    list.appendChild(element);

    var button = element.querySelector('button');
    button = createButton(button, 'Afstrepen', '-', 'strike')
    // button.setAttribute("aria-label", 'Afstrepen');
    // button.innerHTML = '-';
    // button.classList.add('strike');

    return false;
  });
}



/******************
**    Buttons    **
*******************/


var createButton = function(button, aria, content, cclass) {
  if (button) {
    button.setAttribute("aria-label", aria);
    button.innerHTML = content;
    button.classList.add(cclass);
  } else {
    var button = document.createElement('button');
    button.setAttribute("aria-label", aria);
    button.innerHTML = content;
    button.classList.add(cclass);
  }
  return button;
};

var buttonHandler = function () {

  var buttons = document.querySelectorAll('button');
  
  for (var i = 0; i < buttons.length; i++) {

    var thisButton = buttons[i];
    thisButton.addEventListener('click', function(event) {
      event.preventDefault;
      var classes = event.target.classList;

      switch (classes[0]) {

        case 'strike':
          var product = event.target.parentNode;
          var button = product.querySelector('button');

          product.querySelector('h3').classList.add('strike-through');          
          button.classList.remove('strike');
          button = createButton(button, 'weghalen', 'x', 'remove');
          break;

        case 'remove':
          var product = event.target.parentNode;
          var button = product.querySelector('button');
          var productContainer = document.getElementById('products').querySelector('.product-container');
          
          button.classList.remove('remove');
          button = createButton(button, 'toevoegen aan lijst', '+', 'add');
          product.querySelector('h3').classList.remove('strike-through');
          productContainer.appendChild(product);
          break;

        case 'add':
          var product = event.target.parentNode;
          var button = product.querySelector('button');
          var productContainer = document.getElementById('list').querySelector('.product-container');

          button.classList.remove('add');
          button = createButton(button, 'afstrepen', '-', 'strike');
          productContainer.appendChild(product);
          break;

      }
    });
  }
};

// buttonHandler();

var test = document.querySelector('body').classList; 
console.log(test);

if (test) {
  buttonHandler();
} else {
  console.log("neeee");
}

