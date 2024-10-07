//실행함수
$(window).on('load',function(){
    fullMenu();
    realTimeClock();
});

function fullMenu(){
    $('.header .btn_menu').on('click',function(){
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            $('.full_menu').addClass('active');
           // $('body').addClass('overflow');
            $('.header').addClass('blendMode');
        }
    });

    $('.full_menu').find('.btn_close').on('click',function(){
        $('.header .btn_menu').removeClass('active');
        $('.full_menu').removeClass('active');
        //$('body').removeClass('overflow');
        $('.header').removeClass('blendMode');
    });

}

function realTimeClock() {
    var today = new Date();

    var hours = ('0' + today.getHours()).slice(-2); 
    var pmHours = ('0' + (hours - 12)).slice(-2);
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2); 
    
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);

    var dateString = year + '/' + month  + '/' + day;
    var timeString = hours + ':' + minutes  + ':' + seconds;
    var pmTimeString = pmHours + ':' + minutes  + ':' + seconds;

   // console.log(today,hours,minutes,seconds, year, month, day, pmHours, dateString, timeString)

    if (hours > 12) {
        $('.visual_sec .profile .clock .mid').text('오후');
        $('.visual_sec .profile .clock .date').text(dateString);
        //$('.visual_sec .profile .clock .time').text(pmTimeString);
        $('.visual_sec .profile .clock .time .pmHours').text(pmHours)
        $('.visual_sec .profile .clock .time .minutes').text(minutes)
        $('.visual_sec .profile .clock .time .seconds').text(seconds)
    } else {
        $('.visual_sec .profile .clock .mid').text('오전');
        $('.visual_sec .profile .clock .date').text(dateString);
        //$('.visual_sec .profile .clock .time').text(timeString);
        $('.visual_sec .profile .clock .time .hours').text(hours)
        $('.visual_sec .profile .clock .time .minutes').text(minutes)
        $('.visual_sec .profile .clock .time .seconds').text(seconds)
    }	
    //real time
    //colckAct();
}
function colckAct() {
  setInterval(realTimeClock, 1000);
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
//cursor
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

