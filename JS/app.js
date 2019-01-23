// AOS initilazier
  AOS.init();

// Loader
function onReady(callback) {
    var intervalID = window.setInterval(checkReady, 1000);

    function checkReady() {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalID);
            callback.call(this);
        }
    }
}

function show(id, value) {
    document.getElementById(id).style.display = value ? 'block' : 'none';
}

onReady(function () {
    show('head', true);
    show('loader', false);
});

// Onload animation
$(function() {
    setInterval(function() {
        $('.hero').css({
            'opacity' : '1'
        })

        $('.hero-images-wrapper').css({
            'opacity' : '1'
        })
    }, 500);
});

// Paralex and navigation effects
$(window).scroll(function() {
    var wScroll = $(this).scrollTop();
    
    $('.head-wrapper').css({
        'transform' : 'translate(0px, '+ wScroll /2 +'px)',
        'position' : 'relative',
        'z-index' : '2'
    });

    $('.hero-man').css({
        'transform' : 'translate(0px, '+ wScroll /15 +'%)',
    });

    $('.big-circle').css({
        'transform' : 'translate(0px, '+ wScroll /4 +'%)'
    });

    $('.small-circle').css({
        'transform' : 'translate(0px, '+ -wScroll /4 +'%)'
    });
});

//Fixing the navigation on scroll
var navbar = $('.navigation');
var navOffset = navbar.offset().top;
var about = $('.about');
var aboutOffset = about.offset().top;

function checkPosition() {
    if (window.pageYOffset > navOffset) {
        console.log('true');
        console.log(window.pageYOffset + '>' + navOffset);
        $('.navigation').addClass('navigation-on_scroll');
    } else {
        console.log('false');
        console.log(window.pageYOffset + '>' + navOffset);
        $('.navigation').removeClass('navigation-on_scroll');
    }

    if (window.pageYOffset >= aboutOffset + 500) {
        $('.num').each(function () {
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            }, {
                duration: 4000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    }
};

window.onscroll = function() {
    checkPosition();
}

// Smooth scrolling and active link changer

$(document).ready(function() {
    var scrollLink = $('.scroll');

    //smooth scroll
    scrollLink.click(function(e) {
        e.preventDefault();
        $('body,html').animate({
            scrollTop: $(this.hash).offset().top  
        }, 1000 );
    });

    //Active link changer
    $(window).scroll(function() {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function() {
            var sectionOffset = $(this.hash).offset().top

            if (sectionOffset <= scrollbarLocation ) {
                $(this).addClass('nav-active');
                $(this).parent().siblings().children().removeClass('nav-active');
            }
        });
    });
});

// Mobile menu toggler
$('.mobile-menu').click(function() {
    $('.nav').addClass('nav-open');
    $('.mobile-menu').css({
        'transform': 'translateX(100vw)'
    })
});

//Close mobile nav

$('.close-nav-button').click(function() {
    $('.nav').removeClass('nav-open');
    $('.mobile-menu').css({
        'transform': 'translateX(0vw)'
    })
});

$('.nav li').click(function() {
    $('.nav').removeClass('nav-open');
    $('.mobile-menu').css({
        'transform': 'translateX(0vw)'
    })
});

// Modal toggler
var projects = $('.project');
var zoomIcon = $('.zoom-icon');
var modal;

$('.zoom-icon').click(function() {
    var id = $(this).attr("data-num");
    console.log(id);
    var modal = $.getJSON(`/work/modal${id}.json`, function(result) {
        console.log('radiiii');
        $('.modal-flex-wrap').html(`
            <h1>${modal.responseJSON.heading}</h1>
            <div class="modal-img">
                <img src="${modal.responseJSON.img}" alt="">
            </div>
            <p>${modal.responseJSON.text}</p>
            <button class="live-preview" onclick="window.open('${modal.responseJSON.link}')">Live preview</button>
        `);
    });
    $('.project-modal').addClass('modal-open');
    setTimeout(function() {
        $('.modal-wrapper').addClass('modal-wrapper-open');
    }, 300);
});

$(document).keyup(function(e) {
    if (e.keyCode == 27) {
        $('.modal-wrapper').removeClass('modal-wrapper-open');
        setTimeout(function() {
            $('.project-modal').removeClass('modal-open');
        }, 500);
   }
});

$('.close-modal-wrapper').click(function() {
    $('.modal-wrapper').removeClass('modal-wrapper-open');
    setTimeout(function() {
        $('.project-modal').removeClass('modal-open');
    }, 500);
});


