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
import './tabs';
import Inputmask from "inputmask";

const md = 768;
const lg = 1024;

$(function () {
  $(window).on('load resize', function () {
    const bLazy = new Blazy();
    console.log('resize');
    setEmptyCards();
    // console.log(document.body.clientWidth);
  });
  const setEmptyCards = () => {
    let colMd = $('.empty-cards').data('md');
    let colLg = $('.empty-cards').data('lg');
    let count = $('.empty-cards').data('count');
    $('.empty-cards').find('.card--empty').remove();
    let limitLg = (count + colLg) - (count % colLg);
    let limitMd = (count + colMd) - (count % colMd);
    let classes = $('.empty-cards').find('.card:first-child').attr('class');
    if (document.body.clientWidth > lg) {
      let i = count;
      while (i < limitLg) {
        $('.empty-cards').append('<div class="'+classes+' card--empty"></div>');
        i++;
      }
    }
    if ( document.body.clientWidth <= lg) {
      let i = count;
      while (i < limitMd) {
        $('.empty-cards').append('<div class="'+classes+' card--empty"></div>');
        i++;
      }
    }
    if (document.body.clientWidth <= md) {

    }
  }

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
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });
  $(".product__images").slick({
    dots: true,
    arrows: false,
    slidesToShow: 1,
    infinite: false,
    slidesToScroll: 1,
    lazyLoad: 'ondemand',
    rows: 0,
  });
  $(".project-slider").slick({
    dots: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    swipeToSlide: true,
    rows: 0,
    lazyLoad: 'ondemand',
    variableWidth: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
        }
      }
    ]
  });
  $(".news-slider").slick({
    dots: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    swipeToSlide: true,
    rows: 0,
    infinite: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,


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
    if ($(this).hasClass('active')) {
      $('#checkbox').prop('checked', true);
      $(this).parents('form').find('button').prop('disabled', false);
    } else {
      $('#checkbox').prop('checked', false);
      $(this).parents('form').find('button').prop('disabled', true);
    }
  });
  $(".scrollTo").on('click', function (e) {
    e.preventDefault();
    let target = $(this).attr('href');
    $('html, body').animate({
      scrollTop: ($(target).offset().top)
    }, 2000);
  });

  $(document).on('click', '.counter__item', function (e) {
    let button = $(this);
    let type = button.data('type');
    let oldValue = button.parent().find('input').val();
    console.log(type);
    let newValue;
    if (type === '+') {
      newValue = parseInt(oldValue) + 1;
    } else {
      if (oldValue > 0) {
        newValue = parseInt(oldValue) - 1;
      } else {
        newValue = 0;
      }
    }
    button.parent().find("input").val(newValue);
  });

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

  //ajax

  $(document).on('click', '.link--show', function (e) {
    let action = $(this).data('action');
    let $container = $('#popup-result');
    let data = {
      action: action
    }
    $.ajax({
      url: 'ajax/actions.php',
      data: data,
      type: "POST",
      beforeSend: function (response) {
        $container.fadeIn();
        $container.addClass("with-loader").append("<div class='loader loader--top'>" + loaderGetCode() + "</div>");
      },
      success: function (response) {
        if (response) {
          $container.find('.popup__content').empty().append(response);
          $container.removeClass("with-loader");
          $container.find(".loader").remove();
          console.log(response);
        }
      },
      error: function (jqXHR) {
        $container.find(".loader").remove();
        console.log('error');
      }
    });
  })

  $(document).on('click', '.popup-close', function (e) {
    e.preventDefault();
    $(this).parents('.popup').fadeOut();
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

function loaderGetCode() {
  return '<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">        <path fill="#4647a8" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z" transform="rotate(243.722 25 25)">        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>        </path>        </svg>';
}


