// Main js file
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#import-js-files
// window.$ = global.$ = global.jQuery = $;
import Blazy from 'blazy';
import 'jquery';
import 'selectize';
import 'jquery.nicescroll';
import 'jquery-validation';
import 'slick-carousel'
import './menu';
import Inputmask from "inputmask";

$(function () {
  const bLazy = new Blazy();
  icons_load();
  $(".views__slider").slick({
    dots: false,
    arrows: true,
    slidesToShow: 4,
    infinite: false,
    slidesToScroll: 1,
    lazyLoad: 'ondemand',
    rows: 0,
    prevArrow: '<button type="button" class="slick-prev"><svg class="icon"><use xlink:href="#arrow-left"></use></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg class="icon"><use xlink:href="#arrow-right"></use></svg></button>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          dots: true
        }
      }
      ]
  });

  //check input length
  $(document).on('input', '.input-search', function (e) {
    let count = $(this).val().length;
    if (count > 2) {
      $(this).parents('form').find('button').prop('disabled', false);
    } else {
      $(this).parents('form').find('button').prop('disabled', true);
    }
  });
  //style select in advansed filter
  $('.advanced-search__filter').selectize({
    'allowEmptyOption': true
  });

  $(".selectize-dropdown ").niceScroll({
    cursorcolor: "#f82249",
    cursorwidth: "24px",
    cursorborderradius: "0",
    autohidemode: false,
    cursordragontouch: true
  });

  $(document).on('click', '.header__search-form-filter', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $(this).parents('form').find('.header__search-form-advanced').slideToggle();
  })

  const phone = new Inputmask({
    mask: '+9 (999) 999 9999',
  });
  const email = new Inputmask({
    mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
    greedy: false,
    definitions: {
      '*': {
        validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
        casing: "lower"
      }
    }
  });

  phone.mask('input[type="tel"]');
  email.mask('.input--email');

  $(document).on('click', '.input--checkbox', function (e) {
    $(this).toggleClass('active');
    if($(this).hasClass('active')){
      $('#checkbox').prop('checked', true);
      $(this).parents('form').find('button').prop('disabled', false);
    } else{
      $('#checkbox').prop('checked', false);
      $(this).parents('form').find('button').prop('disabled', true);
    }


  })

  $("#contact-form").validate({
    submitHandler: function (e) {
      $('#loader').fadeIn();
      let form = $('#contact-form').serialize();
      $(this).submit();
      $.ajax({
        type: 'POST',
        url: 'form.php',
        data: form,
        success: function (data) {
          $('#loader').fadeOut();
          $("#results").html('Thanks for your question! We will reply you soon.');
        },
        error: function (xhr, str) {
          $('#loader').fadeOut();
          alert("Something wrong!");
        }
      })
    }
  });

  $(document).on('click', '.hamburger', function () {
    $(this).toggleClass('active');
    $('.menu-wrap').fadeToggle(500);
    $('body').toggleClass('no-scroll');
  });


});


/*
* SVG icon url update
* */

function icons_load() {
  var url = $('body').data('svg-sprite-url');
  $.ajax({
    url: url,
    localCache: true,
    cacheTTL: 1,
    dataType: 'text',
    cacheKey: 'svg-sprite'
  }).done(function (response) {
    $('body').append('<div id="svg-icons-container" style="height: 0; width: 0; position: absolute; top: -99999px; left: 0; visibility: hidden;">' + response + '</div>');
  });
}

function setVw() {
  let vw = document.documentElement.clientWidth / 100;
  document.documentElement.style.setProperty('--vw', `${vw}px`);
}

setVw();
window.addEventListener('resize', setVw);


