

window.onscroll = scroll;

small = false;
var header = document.querySelector('.mainheader');


function scroll () {
    if (window.pageYOffset >= 80 && small === false) {
        header.classList.add('small');
        small = true;
        console.log(header);
    } else if (window.pageYOffset < 80 && small === true) {
        header.classList.remove('small');
        small = false;
        console.log(header);
    }

}

//smooth scroll
$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
        || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
            }
        }
    });
});

var headlines = ["Metaal bewerken", "3D animatie", "Krachten simulatie", "Tekeningpakketten", "airflow simulatie", "3D ontwerpen"];
var headlinesCount = 0;
var designerText = document.querySelector('.designer-text');


if (designerText) {
  setInterval(function() {
    // designerText.innerHTML = "";
    window.setTimeout(function(){
      designerText.classList.remove('fade');

      designerText.innerHTML = headlines[headlinesCount];
      headlinesCount ++;
      if (headlinesCount == headlines.length) {
        headlinesCount = 0;
      }
    }, 500);

    designerText.classList.add('fade');

  }, 5 * 1000);
};
