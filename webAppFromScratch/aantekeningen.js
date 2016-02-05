/*********************
 Aantekeningen week 1
 Web App From Scratch
  Leander van Baekel
*********************/

// Object Literal

var car = {
	wheels: 3,
	color: 'green',	// Property
	breaking: function () { // Method
		console.log(this.wheels); //this verwijst naar het ogbject
	}
};


// property toevoegen
car.maxSpeed = 120;

// Elke functie heeft z'n eigen scope


// iife (Immediately Invoked Function Expression)
(function () {

})();


// module pattern

var module = (function () {

	var _private = 'this is a private module';

	var publicFunction = function () {
		console.log(_private);
	}

	return {
		publicFunction: publicFunction
	};

})();

// variable met hoofdletter is Constructor functie
// Constructor functie!
var Clown = function (name, shoeSize, laughType) {
	this.name = name;
	this.shoeSize = shoeSize;

	this.laugh = function (laughType) {
		console.log(laughType);
	}
};

var pipo = new Clown('Pipo', 80, 'hahaha');
var bassie = new Clown ('Bassie', 57, 'hihi');
var it = new Clown ('It', 30, 'moehahaha');

pipo.laugh();
bassie.laugh();
it.laugh();

// Constructor met prototype

var Clown = function (name, shoeSize) {
	this.name = name;
	this.shoeSize = shoeSize;
}

Clown.prototype.laugh = function () {
	console.log('hahahah');
}

var pipo = new Clown('Pipo', 80);

pipo.laugh()


/*********************
 Aantekeningen week 2
 Web App From Scratch
  Leander van Baekel
*********************/














