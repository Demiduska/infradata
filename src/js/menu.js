window.$ = global.$ = global.jQuery = $;
import 'mmenu-light';

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

  // $(document).on('click','.mobile-menu__button', function (e){
  //   e.preventDefault();
  //   if ($('.mobile-button-search').hasClass('active')){
  //     $('.mobile-button-search').trigger('click');
  //   }
  //   $(this).toggleClass('active');
  //   if ($(this).hasClass('active')){
  //     $('.mobile-menu-nav').fadeIn();
  //   } else{
  //     $('.mobile-menu-nav').fadeOut();
  //   }
  // });
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
})
document.addEventListener(
  "DOMContentLoaded", () => {
    const menu = new MmenuLight(
      document.querySelector( "#mobile-menu-nav" ),
      "all"
    );

    const navigator = menu.navigation({
      title: 'Главное меню',
    });
    const drawer = menu.offcanvas();
    const mobile_menu_button = document.querySelector(".mobile-menu__button");

      mobile_menu_button
      .addEventListener( "click", ( evnt ) => {
        evnt.preventDefault();
        if (mobile_menu_button.classList.contains('active')){
          drawer.close();
        } else {
          drawer.open();
        }
        mobile_menu_button.classList.toggle("active");
      });
  }
);
