//실행함수
$(window).on('load',function(){
    fullMenu();
});

function fullMenu(){
    $('.header .btn_menu').on('click',function(){
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            $('.full_menu').addClass('active');
            $('body').addClass('overflow');
            $('.header').addClass('blendMode');
        }
    });

    $('.full_menu').find('.btn_close').on('click',function(){
        $('.header .btn_menu').removeClass('active');
        $('.full_menu').removeClass('active');
        $('body').removeClass('overflow');
        $('.header').removeClass('blendMode');
    });

}
/*
function getTextColorByBackgroundColor(hexColor) {
    const c = hexColor.substring(1)      // 색상 앞의 # 제거
    const rgb = parseInt(c, 16)   // rrggbb를 10진수로 변환
    const r = (rgb >> 16) & 0xff  // red 추출
    const g = (rgb >>  8) & 0xff  // green 추출
    const b = (rgb >>  0) & 0xff  // blue 추출
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709
    // 색상 선택
    return luma < 127.5 ? "white" : "black" // 글자색이
}
    */
$(document).ready(function(){
    setTimeout(function() {
      $(".loading").fadeOut();
    }, 3500);
  
    //menu
    $(".menu").click(function(){
      $(".header").toggleClass("open");
      $(".menu").toggleClass("open");
      $(".nav-wrap").fadeToggle();
  
      if($(".header").is(".open")) {
        $("a.footer-more").addClass("white")
      } else {
        $("a.footer-more").removeClass("white")
      }
    })
  
    $(".blank").click(function(e){
      e.preventDefault();
      $(".alert").addClass("on")
  
      $(".close").click(function(){
        $(".alert").removeClass("on")
      })
    })
  })
  
  $(document).mousemove(function(e) {
    $(".cursor").eq(0).css({
      left: e.pageX,
      top: e.pageY,
    });
  
    setTimeout(function() {
      $(".cursor").eq(1).css({
        left: e.pageX,
        top: e.pageY,
      });
    }, 120);
  
    $("a:not('.work-box li a'), .menu").on({
      mouseenter: function () { 
        $(".cursor").addClass("big"); 
      },
      mouseleave: function () { 
        $(".cursor").removeClass("big"); 
      }
    });
  })
  
  