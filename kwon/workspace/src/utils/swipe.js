/**
 * 화면 개발 중 화면 을 좌/우 로 넘기는데 필요한 스크립트.
 */
export const fncExcute = () => {
  // $('#full-box-01 .inner').each(function(){
  //   // var windowWidth = $(window).width(),
  //   var targetWidth = $(this).find('.checked').outerWidth()
  //   var targetPosition = $(this).find('.checked').position()
  //   var targetLeft = targetPosition.left
  //   var scrollLeft = $(this).scrollLeft();
  //   $(this).scrollLeft(scrollLeft + targetLeft - targetWidth*1.5);
  // });

  $("#full-box-01 input").on('change',  function(){
    $('#full-box-01 .inner').each(function(){
      // var windowWidth = $(window).width(),
      var targetWidth = $(this).find('.checked').outerWidth()
      var targetPosition = $(this).find('.checked').position()
      var targetLeft = targetPosition.left
      var scrollLeft = $(this).scrollLeft();
      $(this).scrollLeft(scrollLeft + targetLeft - targetWidth*1.5);
    });
  });
}

export const fncInite = () => {
  $('#full-box-01 .inner').each(function(){
    // var windowWidth = $(window).width(),
    var targetWidth = $(this).find('.checked').outerWidth()
    var targetPosition = $(this).find('.checked').position()
    var targetLeft = targetPosition.left
    var scrollLeft = $(this).scrollLeft();
    $(this).scrollLeft(scrollLeft + targetLeft - targetWidth*1.5);
  });
}