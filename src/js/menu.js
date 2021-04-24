import 'jquery';

$(function () {
  $( ".menu__item-sub" ).hover(function(){
    $(this).addClass('active');
    $(this).children('ul').fadeIn();
  }, function(){
    $(this).removeClass('active');
    $(this).children('ul').fadeOut();
  });
  $( ".submenu__item" ).hover(function(){
    $(this).addClass('active');
    $(this).children('ul').fadeIn();
  }, function(){
    $(this).removeClass('active');
    $(this).children('ul').fadeOut();
  });
})
