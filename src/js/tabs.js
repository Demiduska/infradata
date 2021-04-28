window.$ = global.$ = global.jQuery = $;

$(function () {
  $(".tabs__nav-link").on('click', function(e) {
    e.preventDefault();
    let anchor = $(this)[0].hash;
    if($(this).hasClass('active')){
      return null;
    } else {
      $('.tabs__nav-link').removeClass('active');
      $(this).addClass('active');
      $('.tabs__item').removeClass('active');
      $('.tabs__item').hide();
      $(anchor).show();
    }
  });
})
