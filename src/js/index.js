// Main js file
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#import-js-files
window.$ = global.$ = global.jQuery = $;
import Blazy from 'blazy';
import 'selectize';
import 'jquery.nicescroll';
import 'jquery-validation';
import 'slick-carousel'
import '@fancyapps/fancybox';
import './menu';
import './tabs';
import Inputmask from "inputmask";
import './cookie';

const md = 767;
const lg = 1024;

$(function () {
  const htmlForm = $('.header__search').html();
  $(window).on('load resize', function () {
    const bLazy = new Blazy();
    bLazy.revalidate();
    console.log('resize');
    setEmptyCards();
    if (document.body.clientWidth <= lg) {
      $('.header__search').empty();
    } else {
      $('.header__search').empty().html(htmlForm);
      $('.header__search .advanced-search__filter').selectize({
        'allowEmptyOption': true,
        openOnFocus: false,

        onInitialize: function () {
          var that = this;
          let open = false;

          this.$control.on("click", function () {
            that.ignoreFocusOpen = true;
            setTimeout(function () {
              that.ignoreFocusOpen = false;
            }, 50);
            if(open === false){
              that.open();
            }
            open = !open;
          });
        },

        onFocus: function () {
          if (!this.ignoreFocusOpen) {
            this.open();
          }
        }
      });
      $(".header__search .selectize-dropdown ").niceScroll({
        cursorcolor: "#f82249",
        cursorwidth: "24px",
        cursorborderradius: "0",
        autohidemode: false,
        cursordragontouch: true,
        railpadding: { top: 0, right: 4, left: 0, bottom: 0 }
      });
    }
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
      if (count % colLg !== 0) {
        while (i < limitLg) {
          $('.empty-cards').append('<div class="' + classes + ' card--empty"></div>');
          i++;
        }
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
        breakpoint: md,
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
        breakpoint: md,
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
        breakpoint: md,
        settings: {
          dots: true,


        }
      }
    ]
  });
  $(".gallery-slider").slick({
    dots: false,
    arrows: true,
    slidesToShow: 2.3,
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
          slidesToShow: 1.3
        }
      },
      {
        breakpoint: md,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 1,
        }
      }
    ]
  });

  //check input length
  $(document).on('input', '.input-search', function (e) {
    let count = $(this).val().length;
    if (count >= 2) {
      $(this).parents('form').find('button').prop('disabled', false);
    } else {
      $(this).parents('form').find('button').prop('disabled', true);
    }
  });
  //style select in advansed filter
  $('.advanced-search__filter').selectize({
    'allowEmptyOption': true,
    openOnFocus: false,

    onInitialize: function () {
      var that = this;
      let open = false;

      this.$control.on("click", function () {
        that.ignoreFocusOpen = true;
        setTimeout(function () {
          that.ignoreFocusOpen = false;
        }, 50);
        if(open === false){
          that.open();
        }
        open = !open;
      });
    },

    onFocus: function () {
      if (!this.ignoreFocusOpen) {
        this.open();
      }
    }
  });

  $(".selectize-dropdown ").niceScroll({
    cursorcolor: "#f82249",
    cursorwidth: "24px",
    cursorborderradius: "0",
    autohidemode: false,
    cursordragontouch: true,
    railpadding: { top: 0, right: 4, left: 0, bottom: 0 }
  });

  $(document).on('click', '.header__search-form-filter,.mobile-menu__filter', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    if ($(this).hasClass('mobile-menu__filter')){
      if($(this).hasClass('active')){
        $(this).html('Закрыть фильтры <svg class="icon"><use xlink:href="#close"></use></svg>');
        $('.filter').fadeIn();
      } else{
        $(this).html('Показать фильтры <svg class="icon"><use xlink:href="#filter"></use></svg>');
        $('.filter').fadeOut();
      }
    } else{
      $(this).parents('header').find('.header__search-form-advanced').slideToggle();
    }

  })

  const phone = new Inputmask({
    mask: '+9 (999) 999 9999',
  });
  const email = new Inputmask({
    greedy: false,
    definitions: {
      '*': {
        validator: "[0-9A-Za-zйцукенгшщзхъфывапролджэячсмитьбю@!#$%&'*+/=?^_`{|}~\-]",
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
    e.preventDefault();
    let button = $(this);
    let type = button.data('type');
    let oldValue = button.parent().find('input').val();
    // console.log(type);
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
    let title = $(this).data('title');
    let $container = $('#popup-result');
    let id = $(this).data('id');
    let data = {
      action: action,
      title: title,
      id: id
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
          // console.log(response);
        }
      },
      error: function (jqXHR) {
        $container.find(".loader").remove();
        console.log('error');
      }
    });
  })

  $(document).on('click', '.link--more', function (e) {
    let action = $(this).data('action');
    let title = $(this).data('title');
    let $container = $('#popup-result-more');
    let id = $(this).data('id');
    let data = {
      action: action,
      title: title,
      id: id
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
          // console.log(response);
        }
      },
      error: function (jqXHR) {
        $container.find(".loader").remove();
        console.log('error');
      }
    });
  })

  $(document).on('click', '.link--product', function (e) {
    let action = $(this).data('action');
    let title = $(this).data('title');
    let html = $('#tab-2').html();
    let $container = $('#popup-result-product');
    let id = $(this).data('id');
    let data = {
      action: action,
      title: title,
      id: id,
      html: html
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
          // console.log(response);
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

  const checkOnEmptyFilterFields = () => {
    if ($('.filter').length){
      let checked = [];
      $('.filter__checkbox input:checked').each(function() {
        checked.push($(this).val());
      });
      $('.filter .advanced-search__filter').each(function() {
        checked.push($(this).val());
      });

      let countInputSearch = $('.filter .input-filter-search').val().length;
      if (countInputSearch >= 2){
        checked.push(countInputSearch);
      }
      const empty = (element) => element  !== '';

      if (checked.some(empty)) {
        $('.filter .filter-reset').prop('disabled', false);
      } else{
        $('.filter .filter-reset').prop('disabled', true);
      }
      // console.log(checked);
    }
  }
  checkOnEmptyFilterFields();
  const clearFilterFields = () => {
    $('.filter__checkbox input:checked').each(function() {
      $(this).prop('checked', false);
    });
    $('.filter select.advanced-search__filter').each(function() {
      var $select = $( this ).selectize();
      var selectize = $select[0].selectize;
      let nameOption =  $select[0].selectize.options[''].text;
      if (nameOption !== ''){
        selectize.setValue(selectize.search(nameOption).items[0].id);
      }
    });
    $('.filter .input-filter-search').val('');
    window.history.pushState(null, null, window.location.pathname);
    location.reload();
  }
  const clearHeaderFilterFields = () => {
    $('.header__search-form input:checked').each(function() {
      $(this).prop('checked', false);
    });
    $('.header__search-form select.advanced-search__filter').each(function() {
      var $select = $( this ).selectize();
      var selectize = $select[0].selectize;
      let nameOption =  $select[0].selectize.options[''].text;
      if (nameOption !== ''){
        selectize.setValue(selectize.search(nameOption).items[0].id);
      }
    });
    $('.header__search-form .input-search').val('');

  }

  const checkOnEmptyHeaderFilterFields = () => {
    if ($('.header__search-form').length){
      let checked = [];
      $('.header__search-form input:checked').each(function() {
        checked.push($(this).val());
      });
      $('.header__search-form .advanced-search__filter').each(function() {
        checked.push($(this).val());
      });

      let countInputSearch = $('.header__search-form .input-search').val().length;
      if (countInputSearch >= 2){
        checked.push(countInputSearch);
      }
      const empty = (element) => element  !== '';

      if (checked.some(empty)) {
        $('.header__search-form .advanced-search__block-reset').removeClass('disabled');
      } else{
        $('.header__search-form .advanced-search__block-reset').addClass('disabled');
      }
      // console.log(checked);
    }
  }
  checkOnEmptyHeaderFilterFields();

  $(document).on('click','.header__search-form  .checkbox', function(e){
    checkOnEmptyHeaderFilterFields();
  });
  $(document).on('change','.header__search-form .advanced-search__filter', function(e){
    checkOnEmptyHeaderFilterFields();
  });
  $(document).on('input','.header__search-form .input-search', function(e){
    checkOnEmptyHeaderFilterFields();
  });

  $(document).on('click','.filter__checkbox input', function(e){
    checkOnEmptyFilterFields();
  });
  $(document).on('change','.filter .advanced-search__filter', function(e){
    checkOnEmptyFilterFields();
  });
  $(document).on('input','.filter .input-filter-search', function(e){
    checkOnEmptyFilterFields();
  });

  $(document).on('click','.filter .filter-reset', function(e){
    e.preventDefault();
    clearFilterFields();
  });

  $(document).on('click','.filter .filter-submit', function(e){
    e.preventDefault();
    let form = $('.filter .search-cat');
    if ($('.filter .type-favorite .check0').is(':checked')){
      $('.filter #fav-hid').removeAttr('disabled');
      $('.filter #fav-hid').prop('checked', true);
      $('.filter #fav-hid').val('1');
    }
    if ($('.filter .type-popular .check0').is(':checked')){
      $('.filter #pop-hid').removeAttr('disabled');
      $('.filter #pop-hid').prop('checked', true);
      $('.filter #pop-hid').val('1');
    }
    if ($('.filter .type-new .check0').is(':checked')){
      $('.filter #new-hid').removeAttr('disabled');
      $('.filter #new-hid').prop('checked', true);
      $('.filter #new-hid').val('1');
    }
    let selCat = $('.filter .select-category select').val();
    if (selCat!=''){
      $('.filter #par-hid').removeAttr('disabled');
      $('.filter #par-hid').val(selCat);
    }
    let selVen = $('.filter .select-vendor select').val();
    if (selVen!=''){
      $('.filter #ven-hid').removeAttr('disabled');
      $('.filter #ven-hid').val(selVen);
    }
    let l = 0;
    l = $('.search-cat input[name="query"]').val().length;
    if (l>=2) {
      form.submit();
    }
    else {
      let checked = [];
      $('.filter__checkbox input:checked').each(function() {
        checked.push($(this).val());
      });
      $('.filter .advanced-search__filter').each(function() {
        checked.push($(this).val());
      });

      const empty = (element) => element  !== '';

      if (checked.some(empty)) {

      } else{
        $('.filter .cat-error').html('Длина поиска меньше 3')
        console.log('длина меньше 3');
      }

    }
  });

  $(document).on('click','#header__search-button,.advanced-search-button',function (e){
    e.preventDefault();
    let selVenHead = $('.select-ven-header').val();
    if (selVenHead!=''){
      $('#ven-hid-header').removeAttr('disabled');
      $('#ven-hid-header').val(selVenHead);
    }
    let selCatHead = $('.select-cat-header').val();
    if (selCatHead!=''){
      $('#par-hid-header').removeAttr('disabled');
      $('#par-hid-header').val(selCatHead);
    }
    // let l = 0;
    // l = $('.input-search ').val().length;
    // console.log(l);
    // if (l>=3) {
      $('#mse2_form-header').submit();
    // }
    // else {
    //   $('.cat-error__head').html('Длина поиска меньше 3')
    //   console.log('длина меньше 3');
    // }

  });

  $(document).on('click','.header__search-form .advanced-search__block-reset',function (e){
    e.preventDefault();
    clearHeaderFilterFields();
  });
  $(document).on('click','#to-step-2',function (e){
    e.preventDefault();
    $('.tab-stages-1').fadeOut();
    $('.tab-stages-2').fadeIn();
  });
  $(document).on('click','#to-step-1',function (e){
    e.preventDefault();
    $('.tab-stages-1').fadeIn();
    $('.tab-stages-2').fadeOut();
  });
  // show input placeholder on focus

  $(document).on('focus','.input-search,.input-filter-search,.callback__form-input input,.input--textarea',function (e){
    $(this).siblings('.input--placeholder').fadeIn();
    $(this).addClass('focus');
  });
  $(document).on('blur','.input-search,.input-filter-search,.callback__form-input input,.input--textarea',function (e){
    if ($(this).val() === ''){
      $(this).siblings('.input--placeholder').fadeOut();
      $(this).removeClass('focus');
    }

  });




  // Антиспам
  $('.ajax_form').append('<input type="text" name="org" value="" class="_org" style="position:absolute; visibility:hidden; height: 0; width: 0; padding: 0; border:none;"/>')
  // Антиспам х

  if (typeof miniShop2 !== 'undefined'){
    miniShop2.Callbacks.Cart.add.response.success = function() {
      // console.log('товар добавлен');
    }
  }
  // if (typeof pdoPage !== 'undefined') {
  //   pdoPage.callbacks['after'] = function (config, response) {
  //     $('.card').each(function (){
  //       if ($(this).find('img').data('src')){
  //         let image = $(this).find('img').data('src');
  //         $(this).find('img').attr('src',image);
  //       }
  //
  //     });
  //   }
  // }

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



