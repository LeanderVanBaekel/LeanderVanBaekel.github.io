// source: http://www.html5rocks.com/en/tutorials/dnd/basics/
// source: http://html5demos.com/drag

// function handleDragStart(e) {
//   this.style.opacity = '0.4';  // this / e.target is the source node.
// }

// function handleDragOver(e) {
//   if (e.preventDefault) {
//     e.preventDefault(); // Necessary. Allows us to drop.
//   }

//   e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

//   return false;
// }

// function handleDragEnter(e) {
//   // this / e.target is the current hover target.
//   this.classList.add('over');
// }

// function handleDragLeave(e) {
//   this.classList.remove('over');  // this / e.target is previous target element.
// }

// var cols = document.querySelectorAll('.product');
// [].forEach.call(cols, function(col) {
//   col.addEventListener('dragstart', handleDragStart, false);
//   col.addEventListener('dragenter', handleDragEnter, false);
//   col.addEventListener('dragover', handleDragOver, false);
//   col.addEventListener('dragleave', handleDragLeave, false);
// });
	function addEvent(to, type, fn){
	    if(document.addEventListener){
	        to.addEventListener(type, fn, false);
	    } else if(document.attachEvent){
	        to.attachEvent('on'+type, fn);
	    } else {
	        to['on'+type] = fn;
	    }  
	};

  var eat = ['yum!', 'gulp', 'burp!', 'nom'];
  var yum = document.createElement('p');
  var msie = /*@cc_on!@*/0;
  yum.style.opacity = 1;

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
    // this.className += 'over';
    e.dataTransfer.dropEffect = 'copy';
    return false;
  });

  // to get IE to work
  // addEvent(dropZone, 'dragenter', function (e) {
  //   this.className += 'over';
  //   return false;
  // });

  // addEvent(dropZone, 'dragleave', function () {
  //   this.className += '';
  // });

  addEvent(dropZone, 'drop', function (e) {
    if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting...why???

    var list = document.getElementById('list');
    console.log(element);

    list.appendChild(element);
    return false;
  });