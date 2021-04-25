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

  $(document).on('click','.mobile-menu__button', function (e){
    e.preventDefault();
    if ($('.mobile-button-search').hasClass('active')){
      $('.mobile-button-search').trigger('click');
    }
    $(this).toggleClass('active');
    if ($(this).hasClass('active')){
      $('.mobile-menu-nav').fadeIn();
    } else{
      $('.mobile-menu-nav').fadeOut();
    }
  });
  $(document).on('click','.mobile-button-search', function (e){
    e.preventDefault();
    if ($('.mobile-menu__button').hasClass('active')){
      $('.mobile-menu__button').trigger('click');
    }
    $(this).toggleClass('active');
    if ($(this).hasClass('active')){
      $('.mobile-search').fadeIn();
    } else{
      $('.mobile-search').fadeOut();
    }
  });
  $(document).on('click','.mobile-menu-icon__button',function (e){
    // $(this).parent('li').parent('ul').css({ 'transform' : 'translateX(-100%)'});
    // $(this).siblings('ul').css({ 'transform' : 'translateX(100%)','display' : block });

  });
  $(document).on('click','.mobile-menu__back',function (e){

  });
})
