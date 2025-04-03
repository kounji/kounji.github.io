//import '@/assets/js/slick.min.js'
//import '@/assets/css/slick.css'

export const fncInite = (index) => {  

  // 영농일지 경락 가격 kimhc_20221014
  // $('.grap_toggle_wrap .custom_box4 .travel_wrap2 .tab_cont2').slick({
  //   slidesToShow:0,
  //   dots:false,
  //   arrows : false,
  //   vertical : true,
  //   autoplay:true,
  //   infinite: true,
  //   speed : 500,
  //   initialSlide: 0 // slide 시작 index 옵션
  // });

  $('#slider-01 .inner').slick({
    slide : 'div',
    speed : 100,
    dots : false,
    arrows : false,
    vertical : false,
    adaptiveHeight: false,
    infinite: false,
    asNavFor: '.slick-tab'
  });

  $('.slick-tab').slick({
      slidesToshow:3,
      slidesToScroll:3,
      dots: false,
      arrows : false,
      focusOnSelect: true,
      infinite: false,
      centerMode: true,
      asNavFor: '#slider-01 .inner',
      variableWidth: true,
  });

  $('.sc_Bottom .tab_cont').slick({
      speed : 500,
      dots : true,
      arrows : false,
      vertical : false,
      adaptiveHeight: false,
      infinite: true
  });
  $('.travel_wrap.travel_pdmy1002 .sc_Bottom .tab_cont2').slick({
    speed : 500,
    dots : true,
    arrows : false,
    vertical : false,
    adaptiveHeight: false,
    infinite: true
  });

  $('.sc_Mid .tab_cont').slick({
      speed : 500,
      dots : true,
      arrows : false,
      vertical : false,
      adaptiveHeight: false,
      infinite: false
  });
  $('.travel_wrap.travel_pdmy1002 .sc_Mid .tab_cont2').slick({
    speed : 500,
    dots : true,
    arrows : false,
    vertical : false,
    adaptiveHeight: false,
    infinite: false
  });

  $('.sc_Top .tab_cont').slick({
      centerMode:true,
      centerPadding:'5rem',
      speed : 500,
      dots : true,
      arrows : false,
      vertical : false,
      adaptiveHeight: false,
      infinite: false
  });
  $('.travel_wrap.travel_pdmy1002 .sc_Top .tab_cont2').slick({
    centerMode:true,
    centerPadding:'5rem',
    speed : 500,
    dots : true,
    arrows : false,
    vertical : false,
    adaptiveHeight: false,
    infinite: false
  });

  // UI-PD-RT-1001.html
  $('.target_money_wrap .slider_wrap .tab_cont').slick({
    vertical : false,
    verticalSwiping: false, // 상하스위핑
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    adaptiveHeight: true,
    infinite: false,
    useTransform: true,
    speed: 300,
    dots: true,
    focusOnSelect: false,
    autoplay: false,
    centerMode: false,				
    pauseOnHover: false
  });

  $('#slider-01 .inner').slick('slickGoTo', index)  

  // UI-MR-CO-1003.html
  $('.section_list06 .slider_root .cont').slick({
    centerMode:true,
    speed : 1200,
    dots : false,
    arrows : true,
    vertical : false,
    adaptiveHeight: false,
    infinite: true,
    draggable: false,
    autoplay: true,
    centerPadding: 0,
    prevArrow: "<button type='button' class='btn-prev'><span class='blind'>이전</span></button>",
    nextArrow: "<button type='button' class='btn-next'><span class='blind'>다음</span></button>"
  });

}

export const fncSlick = (vSpeed=300, arrowsBoolean=false, callback, startSlideIndex=0, clickCallback) => { 

  setTimeout(()=>{
    $('.slider_wrap .tab_cont').not('.slick-initialized').slick({
      speed : vSpeed,
      dots : arrowsBoolean ? false : true,
      arrows : arrowsBoolean,
      vertical : false,
      adaptiveHeight: false,
      infinite: true,
      initialSlide: startSlideIndex // slide 시작 index 옵션
    });
    $('.travel_wrap.travel_pdmy1002 .slider_wrap .tab_cont2').not('.slick-initialized').slick({
      speed : vSpeed,
      dots : arrowsBoolean ? false : true,
      arrows : arrowsBoolean,
      vertical : false,
      adaptiveHeight: false,
      infinite: true,
      initialSlide: startSlideIndex // slide 시작 index 옵션
    });
  }, 10);
  

  setTimeout(()=>{
    //메인화면 슬라이드 배너
    let $mainSlider = $('.slide_box.card')
    if($mainSlider.hasClass('slick-initialized')) {
      $mainSlider.slick('unslick')
    }
    $mainSlider.slick({
        dots:true,
        arrows:false,
        mobileFirst:true,
        pauseOnHover:false,
        pauseOnFocus:false,
        autoplay:true
    });
  }, 10);

  //가입_서비스안내
  setTimeout(()=>{
    $('#info_COAS0001 > ul').slick({
      speed : 350,
      dots : true,
      arrows : false,
      vertical : false,
      adaptiveHeight: true,
      infinite: true,
      autoplay:true,
      autoplaySpeed:5500
    })
  }, 100)

  //가입_서비스안내 (tobe)
  setTimeout(()=>{
    $('#info_COAS1001').slick({
      speed : 350,
			dots : true,
			arrows : false,
			infinite: true,
			autoplay:true,
      autoplaySpeed:6000,
      customPaging:function(slider,i){
        return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
      }
    })
  }, 100)

  //자산관리서비스안내
  setTimeout(()=>{
    $('#info_COCO0017 > ul').slick({
      speed : 350,
      dots : true,
      arrows : false,
      vertical : false,
      adaptiveHeight: true,
      infinite: true,
      autoplay:true,
			autoplaySpeed:5500
    })
  }, 100)

  // 마이농가이용안내 slide
  setTimeout(()=>{
    $('#info_COCO0023 > ul').slick({
      speed : 350,
      dots : true,
      arrows : false,
      vertical : false,
      adaptiveHeight: true,
      infinite: true,
      autoplay:true,
			autoplaySpeed:4500
    })
  }, 100)

  //메인 이벤트 베너
  setTimeout(()=>{
    $('#slide_popup_02 .tab_cont').slick({
      speed : 500,
      dots : true,
      arrows : false,
      infinite: true,
      autoplay:true,
      height: 'auto',
			autoplaySpeed:5000
    })
  }, 100)

  // 예금목록 오픈뱅킹 배너
  setTimeout(() => {
    $('.banner_slider').slick({
      dots:true,
      arrows:false,
      slidesToShow: 1,
      customPaging:function(slider,i){
        return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
      }      
    })  
  }, 10)

  // 노후준비
  setTimeout(() => {
    $('.target_money_wrap .slider_wrap .tab_cont').not('.slick-initialized').slick({
      vertical : false,
      verticalSwiping: false, // 상하스위핑
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: false,
      adaptiveHeight: true,
      infinite: false,
      useTransform: true,
      speed: vSpeed,
      dots: true,
      focusOnSelect: false,
      autoplay: false,
      centerMode: false,				
      pauseOnHover: false
    })
  }, 10)

  // 마이데이터 서비스 안내 팝업
  setTimeout(() => {
    $('.section_list06 .slider_root .cont').not('.slick-initialized').slick({
      centerMode:true,
      speed : 1200,
      dots : false,
      arrows : true,
      vertical : false,
      adaptiveHeight: false,
      infinite: true,
      draggable: false,
      autoplay: true,
      centerPadding: 0,
    });
  }, 10)

  $('.slider_wrap .tab_cont').on('afterChange', function(e, slick, currentSlide) {
    if (callback!==null && (typeof callback === 'function'))
    {
      callback(currentSlide)
    }
  });
  $('.travel_wrap.travel_pdmy1002 .slider_wrap .tab_cont2').on('afterChange', function(e, slick, currentSlide) {
    if (callback!==null && (typeof callback === 'function'))
    {
      callback(currentSlide)
    }
  });

  // slick div 클릭시 사용
  $('.slider_wrap .tab_cont').on('click', function() {
    if (clickCallback!==null && (typeof clickCallback === 'function'))
    {
      clickCallback()
    }
  });
  $('.travel_wrap.travel_pdmy1002 .slider_wrap .tab_cont2').on('click', function() {
    if (clickCallback!==null && (typeof clickCallback === 'function'))
    {
      clickCallback()
    }
  });

  // TOBE) 가입안내 COAS1001
  $('.info_intro').on('afterChange',function(e,slick,idx) {
    if(slick.slideCount-1 == idx) {
      $('.info_intro').slick('slickSetOption', 'autoplay',false);
    }
  });

}

export const fncSlick_Top = (vSpeed=300, arrowsBoolean=false, callback, startSlideIndex=0, clickCallback) => { 
  
  setTimeout(()=>{
    $('.slider_wrap.sc_Top .tab_cont').not('.slick-initialized').slick({
      speed : vSpeed,
      dots : arrowsBoolean ? false : true,
      arrows : arrowsBoolean,
      vertical : false,
      adaptiveHeight: false,
      infinite: true,
      initialSlide: startSlideIndex // slide 시작 index 옵션
    });
    $('.travel_wrap.travel_pdmy1002 .slider_wrap.sc_Top .tab_cont2').not('.slick-initialized').slick({
      speed : vSpeed,
      dots : arrowsBoolean ? false : true,
      arrows : arrowsBoolean,
      vertical : false,
      adaptiveHeight: false,
      infinite: true,
      initialSlide: startSlideIndex // slide 시작 index 옵션
    });
  }, 10);
  
  $('.slider_wrap.sc_Top .tab_cont').on('afterChange', function(e, slick, currentSlide) {
    if (callback!==null && (typeof callback === 'function'))
    {
      callback(currentSlide)
    }
  });
  $('.travel_wrap.travel_pdmy1002 .slider_wrap.sc_Top .tab_cont2').on('afterChange', function(e, slick, currentSlide) {
    if (callback!==null && (typeof callback === 'function'))
    {
      callback(currentSlide)
    }
  });

  // slick div 클릭시 사용
  $('.slider_wrap.sc_Top .tab_cont').on('click', function() {
    if (clickCallback!==null && (typeof clickCallback === 'function'))
    {
      clickCallback()
    }
  });
  $('.travel_wrap.travel_pdmy1002 .slider_wrap.sc_Top .tab_cont2').on('click', function() {
    if (clickCallback!==null && (typeof clickCallback === 'function'))
    {
      clickCallback()
    }
  });
}

export const fncSlick_Mid = (vSpeed=300, arrowsBoolean=false, callback, startSlideIndex=0, clickCallback) => { 

  setTimeout(()=>{
    $('.slider_wrap.sc_Mid .tab_cont').not('.slick-initialized').slick({
      speed : vSpeed,
      dots : arrowsBoolean ? false : true,
      arrows : arrowsBoolean,
      vertical : false,
      adaptiveHeight: false,
      infinite: true,
      initialSlide: startSlideIndex // slide 시작 index 옵션
    });
    $('.travel_wrap.travel_pdmy1002 .slider_wrap.sc_Mid .tab_cont2').not('.slick-initialized').slick({
      speed : vSpeed,
      dots : arrowsBoolean ? false : true,
      arrows : arrowsBoolean,
      vertical : false,
      adaptiveHeight: false,
      infinite: true,
      initialSlide: startSlideIndex // slide 시작 index 옵션
    });
  }, 10);
  
  $('.slider_wrap.sc_Mid .tab_cont').on('afterChange', function(e, slick, currentSlide) {
    if (callback!==null && (typeof callback === 'function'))
    {
      callback(currentSlide)
    }
  });
  $('.travel_wrap.travel_pdmy1002 .slider_wrap.sc_Mid .tab_cont2').on('afterChange', function(e, slick, currentSlide) {
    if (callback!==null && (typeof callback === 'function'))
    {
      callback(currentSlide)
    }
  });

  // slick div 클릭시 사용
  $('.slider_wrap.sc_Mid .tab_cont').on('click', function() {
    if (clickCallback!==null && (typeof clickCallback === 'function'))
    {
      clickCallback()
    }
  });
  $('.travel_wrap.travel_pdmy1002 .slider_wrap.sc_Mid .tab_cont2').on('click', function() {
    if (clickCallback!==null && (typeof clickCallback === 'function'))
    {
      clickCallback()
    }
  });
}

export const fncSlick_Bottom = (vSpeed=300, arrowsBoolean=false, callback, startSlideIndex=0, clickCallback) => { 

  setTimeout(()=>{
    $('.slider_wrap.sc_Bottom .tab_cont').not('.slick-initialized').slick({
      speed : vSpeed,
      dots : arrowsBoolean ? false : true,
      arrows : arrowsBoolean,
      vertical : false,
      adaptiveHeight: false,
      infinite: true,
      initialSlide: startSlideIndex // slide 시작 index 옵션
    });
    $('.travel_wrap.travel_pdmy1002 .slider_wrap.sc_Bottom .tab_cont2').not('.slick-initialized').slick({
      speed : vSpeed,
      dots : arrowsBoolean ? false : true,
      arrows : arrowsBoolean,
      vertical : false,
      adaptiveHeight: false,
      infinite: true,
      initialSlide: startSlideIndex // slide 시작 index 옵션
    });
  }, 10);
  
  $('.slider_wrap.sc_Bottom .tab_cont').on('afterChange', function(e, slick, currentSlide) {
    if (callback!==null && (typeof callback === 'function'))
    {
      callback(currentSlide)
    }
  });
  $('.travel_wrap.travel_pdmy1002 .slider_wrap.sc_Bottom .tab_cont2').on('afterChange', function(e, slick, currentSlide) {
    if (callback!==null && (typeof callback === 'function'))
    {
      callback(currentSlide)
    }
  });

  // slick div 클릭시 사용
  $('.slider_wrap.sc_Bottom .tab_cont').on('click', function() {
    if (clickCallback!==null && (typeof clickCallback === 'function'))
    {
      clickCallback()
    }
  });
  $('.travel_wrap.travel_pdmy1002 .slider_wrap.sc_Bottom .tab_cont2').on('click', function() {
    if (clickCallback!==null && (typeof clickCallback === 'function'))
    {
      clickCallback()
    }
  });
}

export const fncSlick_Farm = (vSpeed=300, callback, clickCallback, startSlideIndex=0) => {
  setTimeout(()=>{
    $('.banner_slider').not('.slick-initialized').slick({
      speed : vSpeed,
      infinite: true,
      dots:true,
      arrows:false,
      slidesToShow: 1,
      initialSlide: startSlideIndex, // slide 시작 index 옵션
      customPaging:function(slider,i){
				return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
      }
    });
  });
  $('.banner_slider').on('afterChange', function(e, slick, currentSlide) {
    if (callback!==null && (typeof callback === 'function'))
    {
      callback(currentSlide)
    }
  });
  $('.banner_slider').on('click', function() {
    if (clickCallback!==null && (typeof clickCallback === 'function'))
    {
      clickCallback()
    }
  });
}

export const fadeSlider = (vSpeed=300, callback, clickCallback) => {
  $('.fade_slider').not('.slick-initialized').slick({
    slidesToShow:1,
    dots:false,
    arrows : false,
    autoplay:true,
    autoPlaySpeed:2000,
    infinite: true,
    fade:true,
    centerMode: true,
    focusOnSelect: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    speed:vSpeed,
    customPaging:function(slider,i){
      return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
    }
  });
  $('.fade_slider').on('afterChange', function(e, slick, currentSlide) {
    if (callback!==null && (typeof callback === 'function'))
    {
      callback(currentSlide)
    }
  });
  $('.fade_slider').on('click', function() {
    if (clickCallback!==null && (typeof clickCallback === 'function'))
    {
      clickCallback()
    }
  });
}

export const fncSlick_Terms = (vSpeed=300, callback, startSlideIndex=0) => {
  setTimeout(()=>{
    $('.terms_view.slide').not('.slick-initialized').slick({
      speed : vSpeed,
      slidesToShow: 1,
      infinite: false,
      adaptiveHeight:true,
      height:'auto',
      initialSlide: startSlideIndex // slide 시작 index 옵션
    });
  }, 10);


  $('.terms_view.slide').on('afterChange', function(e, slick, currentSlide) {
    if (callback!==null && (typeof callback === 'function'))
    {
      callback(currentSlide)
    }
  });
}

/**
 * 메인 Slick 탭
 */
export const fncSlick_Main = (callbackFnc, isReload=false) => {
  $(function(){
    console.log(isReload)
    // mainSlider:function(){
      // 탭 영역 슬라이더
      $('.main .subMenuList').on('init', function() {
        $('.main .subMenuList .slick-slide.slick-current').addClass('is-active');
      })
      .slick({
        slidesToShow: 4, 		// 한 화면에 보여질 컨텐츠 개수
        slidesToScroll: 1, 		// 스크롤 한번에 움직일 컨텐츠 개수
        dots: false, 			// 점으로 보여질지 여부
        draggable : true, 		// 드레그 가능 여부
        focusOnSelect: false,
        infinite: false, 		// 반복 옵션
        autoplay: false, 		// 자동 슬라이딩 여부
        customPaging:function(slider,i){
					return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
				}
      });

      // 상세 내역 슬라이더
      $('.main .mainScroll .slideBox').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        adaptiveHeight: true,
        infinite: false,
        useTransform: true,
        speed: 300,
        cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
        dots: false,
        focusOnSelect: true,
        autoplay: false,
        centerMode: false,
				customPaging:function(slider,i){
					return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
				}
      });

      $('.main .mainScroll .slideBox').on('swipe',function(){
          let _waveIdx = $('.slideBox').slick('slickCurrentSlide');
          callbackFnc(_waveIdx);
          // $('.main .mainHeader .subMenu').removeClass('menu00 menu01 menu02 menu03');
          // $('.subMenu').addClass('menu0' + _waveIdx);
          
          let currentNavSlideElem = '.subMenuList .slick-slide[data-slick-index="' + _waveIdx + '"]';
          $('.main .subMenuList .slick-slide.is-active').removeClass('is-active');
          $(currentNavSlideElem).addClass('is-active');
          $(".main .mainHeader .subMenu .comTabmenuType01 .waveMove");
          
          // 엑티브된 id 찾아서 넣어준다.
          let menu_num = $('.main .subMenuList .slick-slide.is-active').attr("id");
          $('.main .mainHeader .subMenu').removeClass('menu00 menu01 menu02 menu03');
          $('.subMenu').addClass( menu_num );

          // console.log('menuId', menu_num)
          waveMove(_waveIdx, false, menu_num);

          // $(window).resize(function(){
          //   setTimeout(function(){
          //       waveMove(_waveIdx,true)
          //   },100);
          // }).trigger('resize');

      });

      var _waveIdx = 0;
      $('.main .comTabmenuType01 .subMenuList').on('click', '.slick-slide', function() {
          _waveIdx = $(this).data('slick-index');
          callbackFnc(_waveIdx);
          console.log("_waveIdx:"+_waveIdx+", isReload:")
          $('.main .mainScroll .slideBox').slick('slickGoTo', _waveIdx);
          
          var currentNavSlideElem = '.subMenuList .slick-slide[data-slick-index="' + _waveIdx + '"]';
          $('.main .subMenuList .slick-slide.is-active').removeClass('is-active');
          $(currentNavSlideElem).addClass('is-active');
          $(".main .mainHeader .subMenu .comTabmenuType01 .waveMove");
          
          let menu_num = $(this).attr("id");
          $('.main .mainHeader .subMenu').removeClass('menu00 menu01 menu02 menu03');
          $('.main .mainHeader .subMenu').addClass(menu_num)

          // console.log('menuId', menu_num)
          waveMove(_waveIdx, false, menu_num);

          // $(window).resize(function(){
          //   setTimeout(function(){
          //       waveMove(_waveIdx,true)
          //   },100);
          // }).trigger('resize');
      });

      function waveMoveW(){
          var $waveThis = $('.waveMove')
          var $waveTabLise = $('.subMenu .subMenuList .slick-slide')
          var _waveThisOffset = [];
          $waveTabLise.each(function(e){
              _waveThisOffset[e] = ($(this).offset().left + ($(this).width()/2)) - $waveThis.width()/2;
          });
          return _waveThisOffset
      }

      function waveMove(_idx,_resize,menuId){
          console.log('waveMove:'+_idx)
          var _waveThisOffset = waveMoveW();
          var $waveThis = $('.waveMove');
          var winH = $(window).height();
          // var contWinH = $('.mainScroll .slick-slide').eq(_idx).find('.container').height();
          // var contWinH = $('.mainScroll .mainH0'+_idx).height();

          var slideId = '';
          if (menuId == 'menu00') slideId = '.mainScroll .slide01';
          if (menuId == 'menu01') slideId = '.mainScroll .slide02';
          if (menuId == 'menu02') slideId = '.mainScroll .slide03';
          if (menuId == 'menu03') slideId = '.mainScroll .slide04';

          $('.container').css('padding-bottom',0)
          var contWinH = 0;
          contWinH = $(slideId).height();

          // console.log('[1] waveMove menu_num', menuId);
          // console.log('[1] waveMove contWinH', contWinH);
          // console.log('[1] winH', winH);
          if(contWinH < winH) {
            // console.log('run100', winH - contWinH)
            //$('.mainScroll .slick-slide').eq(_idx).find('.container').css('padding-bottom',100)
            //$('.mainScroll .mainH0'+_idx).css('padding-bottom',winH - contWinH)
            $(slideId + ' .container').css('padding-bottom',winH - contWinH)
          } else {
            //$('.mainScroll .mainH0'+_idx).css('padding-bottom',0)
            $(slideId + ' .container').css('padding-bottom',0)
          }
  
          if(_resize == true){
              $waveThis.css({'left':_waveThisOffset[_idx]});
              return false;
          }
          $waveThis.stop().animate({'left':_waveThisOffset[_idx]},300);
        }

      /*
        $(window).resize(function(){
          setTimeout(function(){
              waveMove(_waveIdx,true)
          },100);
      }).trigger('resize');
      */


    //   // 슬라이드 터치 후 드레그
    //   $('.main .mainScroll .slideBox').on('afterChange', function() {
    //     // 슬라이드 터치 후 드레그시 푸터 사라지는 현상 관련
    //     $('#wrap .main .mainFooter').removeClass('block');
    //   });

    //   $('.main .mainScroll .slideBox').on('swipe',function(){
    //     _waveIdx = $('.slideBox').slick('slickCurrentSlide');
    //     waveMove(_waveIdx);
    //     $('.main .mainHeader .subMenu').removeClass('menu00 menu01 menu02 menu03');
    //     $('.subMenu').addClass('menu0' + _waveIdx);

    //     var currentNavSlideElem = '.subMenuList .slick-slide[data-slick-index="' + _waveIdx + '"]';
    //     $('.main .subMenuList .slick-slide.is-active').removeClass('is-active');
    //     $(currentNavSlideElem).addClass('is-active');
    //     $(".main .mainHeader .subMenu .comTabmenuType01 .waveMove");
    //   });

    //   var $waveThis,
    //     $waveTabLise,
    //     _waveThisOffset,
    //     _waveIdx = 0;
    //     if(!isReload) {
    //   $('.main .comTabmenuType01 .subMenuList').on('click', '.slick-slide', function() {
    //     _waveIdx = $(this).data('slick-index');
    //     console.log("_waveIdx:"+_waveIdx+", isReload:"+isReload)
    //     $('.main .mainScroll .slideBox').slick('slickGoTo', _waveIdx);
    //     waveMove(_waveIdx);

    //     var currentNavSlideElem = '.subMenuList .slick-slide[data-slick-index="' + _waveIdx + '"]';
    //     $('.main .subMenuList .slick-slide.is-active').removeClass('is-active');
    //     $(currentNavSlideElem).addClass('is-active');
    //     $(".main .mainHeader .subMenu .comTabmenuType01 .waveMove");
        
    //     $('.main .mainHeader .subMenu').removeClass('menu00 menu01 menu02 menu03');
    //     $('.main .mainHeader .subMenu').addClass('menu0' + _waveIdx)
    //   });
    // }
      
    //   function waveMoveW(){
    //     $waveThis = $('.waveMove'),
    //     $waveTabLise = $('.subMenu .subMenuList .slick-slide'),
    //     _waveThisOffset = [];
    //     $waveTabLise.each(function(e){
    //       _waveThisOffset[e] = ($(this).offset().left + ($(this).width()/2)) - $waveThis.width()/2;
    //     });
    //   }
      
    //   // function waveTime(){
    //   //   $waveThis.addClass('active');
    //   //   var _setT = setTimeout(function(){
    //   //     $waveThis.removeClass('active');
    //   //   },1500);
    //   //   if($waveThis.is(':animated')){
    //   //     $waveThis.addClass('active');
    //   //     _setT;
    //   //   }
    //   // }
    //   function waveMove(_idx,_resize){
    //     console.log('waveMove:'+_idx)
    //     waveMoveW();
    //     $waveThis = $('.waveMove'),				
    //     _waveIdx = _idx;
    //     if(_resize == true){
    //       $waveThis.css({'left':_waveThisOffset[_idx]});
    //       return false;
    //     }
    //     $waveThis.stop().animate({'left':_waveThisOffset[_idx]},300);
    //   }

    //   $(window).resize(function(){
    //     setTimeout(function(){
    //         waveMove(_waveIdx,true)
    //       },100);
    //   }).trigger('resize');

      // var menu = $(".main .mainHeader .subMenu .comTabmenuType01 .subMenuList .slick-list .slick-track button[type='button']");
      // menu.each(function(index) {
      //   menu.eq(index).on('click', function () {
      //     // $('.main .mainHeader .subMenu').removeClass('menu0' + index);
      //     $('.main .mainHeader .subMenu').removeClass('menu00 menu01 menu02 menu03');
      //     $(this).parents('.subMenu').addClass('menu0' + index);
      //   });
      // });
      // if(!isReload) {
      //   $(document).on('click', '.main .comTabmenuType01 .subMenuList .slick-track button[type="button"]', function() {
      //     _waveIdx = $(this).data('slick-index')
      //     console.log("_waveIdx:"+_waveIdx+", isReload:"+isReload)
      //     $('.main .mainScroll .slideBox').slick('slickGoTo', _waveIdx)
      //     waveMove(_waveIdx)
  
      //     var currentNavSlideElem = '.subMenuList .slick-slide[data-slick-index="' + _waveIdx + '"]'
      //     $('.main .subMenuList .slick-slide.is-active').removeClass('is-active')
      //     $(currentNavSlideElem).addClass('is-active')
          
      //     $('.main .mainHeader .subMenu').removeClass('menu00 menu01 menu02 menu03');
      //     $('.main .mainHeader .subMenu').addClass('menu0' + _waveIdx)
      //   });
      // }
      
    // }



      // var renewalJ = renewalJ || {};
      // renewalJ = {
      //     init : function(){
      //         renewalJ.mainSlider();
      //     },,
      //     // 토글 버튼( play / pause )
      //     autoplayBtn :function() {
      //       var _slickDots = $('.slick-dots');
      //       _slickDots.wrap('<div class="slick-dots-wrap">');		
      //       $('.slick-dots-wrap').append('<div class="slick-play active"><button class="palyText" type="button">멈춤</button></div>');	
      //       var _verticalTabCon = $('.slider_wrap .auto_play');	
      //       var _slickPlay = $('.slick-play');
      //       _slickPlay.click( function () {						
      //           if($(this).hasClass("active")){						
      //               _verticalTabCon.slick('slickPause');			
      //               $(this).removeClass('active');
      //               $(this).children('.palyText').text('재생');
      //           } else {
      //               _verticalTabCon.slick('slickPlay');
      //               $(this).addClass('active');				
      //               $(this).children('.palyText').text('멈춤');
      //           }
      //       });
      //     }
      // }
      // renewalJ.init();
  });
}

/**
 * 탭 수동 이동 함수
 */
export const fncSlick_Main_GoTo = (waveIdx, menuId) => {
  $(function(){
    if (waveIdx < 0) return;
    console.log('goTo waveIdx:' + waveIdx);
    //$('.slideBox').slick('goTo', waveIdx);
    $('.main .mainScroll .slideBox').slick('slickGoTo', waveIdx);
    waveMove(waveIdx, false, menuId);

    var currentNavSlideElem = '.subMenuList .slick-slide[data-slick-index="' + waveIdx + '"]';
    $('.main .subMenuList .slick-slide.is-active').removeClass('is-active');
    $(currentNavSlideElem).addClass('is-active');
    $(".main .mainHeader .subMenu .comTabmenuType01 .waveMove");

    $('.main .mainHeader .subMenu').removeClass('menu00 menu01 menu02 menu03');
    $('.main .mainHeader .subMenu').addClass(menuId)

    function waveMoveW(){
      var $waveThis = $('.waveMove')
      var $waveTabLise = $('.subMenu .subMenuList .slick-slide')
      var _waveThisOffset = [];
      $waveTabLise.each(function(e){
          _waveThisOffset[e] = ($(this).offset().left + ($(this).width()/2)) - $waveThis.width()/2;
      });

      return _waveThisOffset
    }

  function waveMove(_idx,_resize, menuId){
      console.log('waveMove:'+_idx)
      var _waveThisOffset = waveMoveW();
      var $waveThis = $('.waveMove')
      var winH = $(window).height();

      var slideId = '';
      if (menuId == 'menu00') slideId = '.mainScroll .slide01';
      if (menuId == 'menu01') slideId = '.mainScroll .slide02';
      if (menuId == 'menu02') slideId = '.mainScroll .slide03';
      if (menuId == 'menu03') slideId = '.mainScroll .slide04';

      $('.container').css('padding-bottom',0)
      // var contWinH = $('.mainScroll .slick-slide').eq(_idx).find('.container').height();
      var contWinH = $(slideId).height();

      // console.log('[go] waveMove menuId', menuId);
      // console.log('[go] waveMove contWinH', contWinH);
      // console.log('[go] winH', winH);
      if(contWinH < winH) {
        $(slideId + ' .container').css('padding-bottom',winH - contWinH)
      } else {
        $(slideId + ' .container').css('padding-bottom',0)
      }

      if(_resize == true){
          $waveThis.css({'left':_waveThisOffset[_idx]});
          return false;
      }
      $waveThis.stop().animate({'left':_waveThisOffset[_idx]},300);
  }

  // $(window).resize(function(){
  //     setTimeout(function(){
  //         waveMove(waveIdx,true)
  //     },100);
  // }).trigger('resize');
});
}

// views/layout/FootersV2에서 사용
export const fncSlick_MktBanner = (isReload=false) => {
  $(function(){
    console.log(isReload)

    var lastScrollTop = 0;
    var footer = $('#com_footer');
    var marketingBanner = $('.marketing_popup_box'); // 마케팅 배너
    
    footer.addClass('block');
    marketingBanner.addClass('block');
    $('.mainScroll').on('scroll', function() {
      var scrollTop = $(this).scrollTop();
      if ( scrollTop > lastScrollTop ) {
        footer.removeClass('block');
        
        if( marketingBanner.hasClass('bottomAdd') == true ) {
          marketingBanner.addClass('bottomAdd')
        }
      } else {
        footer.addClass('block');

        if( marketingBanner.hasClass('bottomAdd') == false ) {
          marketingBanner.removeClass('bottomAdd')
        }
      }
      lastScrollTop = scrollTop; // 스크롤 올리는 부분 감지 js
    });

    // 마케팅 배너
    $('#slide_popup_02 .tab_cont').slick({
      speed : 300,
      dots : true,
      arrows : false,
      vertical : false,
      adaptiveHeight: true,
      infinite: false,
      
      autoplay: false,
      customPaging:function(slider,i){
        return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
      }
  });

    $('.marketing_popup_box .btn_close').on('click', function() {
      $(this).parent().parent().addClass('hideHeight');
    });
  });
}

export const sortTabs = () => {
  $(function() {
    $('.sortable_list').sortable({
      handle:'.btn_sortable',
      cancel:'',
      placeholder:'sort_highlight',
      // items:'div:not(".not")',
      revert:true,
      scroll:false,
      delay:100
    });
  });
}

export const fncSlick_Car = (length) => {
  $(function() {
    var renewalJ = renewalJ || {};
    renewalJ = {
        init : function(){
            renewalJ.carSlider();

            if(length > 1 && $(".tab_cont").hasClass("auto_play")){
                renewalJ.autoplayBtn (); // 토글 버튼( play / pause ) li 끝에 추가
            }
        },
        carSlider:function(){
          // 자산 탭 > 자동차 슬라이더
          //$('.main .left_car .slider_wrap .tab_cont').slick({
          $('.main .left_car .slider_wrap .tab_cont').not('.slick-initialized').slick({
            vertical : false,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: false,
            adaptiveHeight: true,
            infinite: true,
            useTransform: false,
            speed: 300,
            dots: true,
            focusOnSelect: false,
            autoplay: true,
            centerMode: false,
            pauseOnHover: false
          });
        },
        // 토글 버튼( play / pause )	
        autoplayBtn :function() {
          $('.slick-play').remove()
          $('.auto_play').each(function(){
            //var _slickDots = $(this).find('.slick-dots');
            var _slickDots = $(this).children('.slick-dots');
            _slickDots.wrap('<div class="slick-dots-wrap">');
            $('.slick-dots-wrap').append('<div class="slick-play active"><button class="palyText" type="button">멈춤</button></div>');	
            var _verticalTabCon = $('.slider_wrap .auto_play');	
            var _slickPlay = $('.slick-play');
            _slickPlay.click( function () {						
              if($(this).hasClass("active")){						
                _verticalTabCon.slick('slickPause');			
                $(this).removeClass('active');
                $(this).children('.palyText').text('재생');
              } else {
                _verticalTabCon.slick('slickPlay');
                $(this).addClass('active');				
                $(this).children('.palyText').text('멈춤');
              }
            });	
          })	
        },
        // 토글 버튼( play / pause )
        autoplayBtn_bak :function() {
          var _slickDots = $('.slick-dots');
          _slickDots.wrap('<div class="slick-dots-wrap">');		
          $('.slick-dots-wrap').append('<div class="slick-play active"><button class="palyText" type="button">멈춤</button></div>');	
          var _verticalTabCon = $('.slider_wrap .auto_play');	
          var _slickPlay = $('.slick-play');
          _slickPlay.click( function () {						
              if($(this).hasClass("active")){						
                  _verticalTabCon.slick('slickPause');			
                  $(this).removeClass('active');
                  $(this).children('.palyText').text('재생');
              } else {
                  _verticalTabCon.slick('slickPlay');
                  $(this).addClass('active');				
                  $(this).children('.palyText').text('멈춤');
              }
          });
        }
      }
      renewalJ.init()
  });
}

export const answerBar = () => {
  if($('body').find('div').hasClass('question_check_box')){
    var rows = [];
    $('.question_check_box').each(function(e){
      rows[e] = $(this).offset().top;
      rows[e] = rows[e] - rows[0];
    });
    $('.popup_content').scroll(function(){
      var _thisScroll = $(this).scrollTop()
      $('.question_check_box').each(function(event){ 
        if(_thisScroll+ $('.popup_content').height() < rows[event]){
          $('.question_check_box').eq(event).addClass('ani-active')
          return false;
        }
      });
    }).trigger('scroll')
  }
  $('.answer_radio input').on('change',function(){
    var $this = $(this),
      $thisParent = $this.parents('.answer_wrap'),
      _idx = $this.closest('div').index(),
      _boxLength = $thisParent.find('.answer_radio').length-1;
    $this.parents('.answer_wrap').find('.answer_bar').css('width',(100 / _boxLength) * _idx+'%');
  });
}

export const fncSlick_house1= (vSpeed=300, arrowsBoolean=false, callback, startSlideIndex=0, clickCallback) => { 
  setTimeout(()=>{
    $('.house_slick').not('.slick-initialized').slick({
      speed : vSpeed,
      dots : arrowsBoolean ? false : true,
      arrows : arrowsBoolean,
      vertical : false,
      adaptiveHeight: false,
      infinite: true,
      initialSlide: startSlideIndex, // slide 시작 index 옵션
      customPaging:function(slider,i){
        return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
      }
    });
  }, 10);

  $('.house_slick').on('afterChange', function(e, slick, currentSlide) {
    if (callback!==null && (typeof callback === 'function'))
    {
      callback(currentSlide)
    }
  });

  // slick div 클릭시 사용
  $('.house_slick').on('click', function() {
    if (clickCallback!==null && (typeof clickCallback === 'function'))
    {
      clickCallback()
    }
  });
}

export const fncSlick_house2= (vSpeed=300, arrowsBoolean=false, callback, startSlideIndex=0, clickCallback) => { 
  setTimeout(()=>{
    $('.house_slick2').not('.slick-initialized').slick({
      speed : vSpeed,
      dots : arrowsBoolean ? false : true,
      arrows : arrowsBoolean,
      vertical : false,
      adaptiveHeight: false,
      infinite: true,
      initialSlide: startSlideIndex, // slide 시작 index 옵션
      customPaging:function(slider,i){
        return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
      }
    });
  }, 10);

  $('.house_slick2').on('afterChange', function(e, slick, currentSlide) {
    if (callback!==null && (typeof callback === 'function'))
    {
      callback(currentSlide)
    }
  });

  // slick div 클릭시 사용
  $('.house_slick2').on('click', function() {
    if (clickCallback!==null && (typeof clickCallback === 'function'))
    {
      clickCallback()
    }
  });
}

export const fncSlick_carSrch = (vSpeed=300, arrowsBoolean=false, callback, startSlideIndex=0, clickCallback) => {
  setTimeout(()=>{
    $('.vertical_car .slider_wrap .tab_cont').not('.slick-initialized').slick({
         slidesToShow: 1,
         slidesToScroll: 1,
         arrows: false,
         fade: false,
         adaptiveHeight: true,
         infinite: true,
         useTransform: true,
         speed: vSpeed,
         dots: arrowsBoolean ? false : true,
         focusOnSelect: false,
         autoplay: true,
         centerMode: false,
         pauseOnHover: false,
         pauseOnFocus: false,
         initialSlide: startSlideIndex, // slide 시작 index 옵션
         customPaging:function(slider,i){
             return '<button type="button"><b>' + (i+1) + '</b> / ' + slider.$slides.length + '</button>';
         }
     })

     if($('.vertical_car .slider_wrap .tab_cont').hasClass("auto_play")){
         $('.auto_play').each(function(){
             var _slickDots = $(this).find('.slick-dots');
             _slickDots.wrap('<div class="slick-dots-wrap">');		
             $('.slick-dots-wrap').append('<div class="slick-play active"><button class="palyText" type="button">멈춤</button></div>');	
             var _verticalTabCon = $('.slider_wrap .auto_play');	
             var _slickPlay = $('.slick-play');
             _slickPlay.click( function () {						
                 if($(this).hasClass("active")){						
                     _verticalTabCon.slick('slickPause');			
                     $(this).removeClass('active');
                     $(this).children('.palyText').text('재생');
                 } else {
                     _verticalTabCon.slick('slickPlay');
                     $(this).addClass('active');				
                     $(this).children('.palyText').text('멈춤');
                 }
             });	
         })
     }

 }, 100)

  $('.vertical_car .slider_wrap .tab_cont').on('afterChange', function(e, slick, currentSlide) {
    if (callback!==null && (typeof callback === 'function'))
    {
      callback(currentSlide)
    }
  });

  // slick div 클릭시 사용
  $('.vertical_car .slider_wrap .tab_cont').on('click', function() {
    if (clickCallback!==null && (typeof clickCallback === 'function'))
    {
      clickCallback()
    }
  });  
}

export const fncSlick_carMain = (vSpeed=500, arrowsBoolean=false, callback, startSlideIndex=0, clickCallback) => {
  setTimeout(()=>{
    // 제휴서비스 > NH콕마이카 > 자동차메인(내차정보)
    $('.car_slide').not('.slick-initialized').slick({
      slidesToShow:1,  
      dots : arrowsBoolean ? false : true,
      arrows : arrowsBoolean,
      // centerMode: true,
      centerPadding:'0',
      infinite: false,
      // variableWidth:true
      speed : vSpeed,      
      initialSlide: startSlideIndex, // slide 시작 index 옵션
      customPaging:function(slider,i){
        return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
      }      
    })
  }, 10)

  $('.car_slide').on('afterChange', function(e, slick, currentSlide) {
    if (callback!==null && (typeof callback === 'function'))
    {
      callback(e, currentSlide)
    }
  });

  // slick div 클릭시 사용
  $('.car_slide').on('click', function(e) {
    if (clickCallback!==null && (typeof clickCallback === 'function'))
    {
      clickCallback(e)
    }
  });     
}

export const fncSlick_myCarAll = (vSpeed=500, arrowsBoolean=false, callback, startSlideIndex=0, clickCallback) => {
  setTimeout(()=>{
    // 제휴서비스 > NH콕마이카 > 자동차메인(마이카올인원케어배너)
    $('.travel_wrap:not(".vertical") .tab_cont2').not('.slick-initialized').slick({
      centerMode:true,
      speed : vSpeed,
      dots : arrowsBoolean ? false : true,
      arrows : arrowsBoolean,
      vertical : false,
      adaptiveHeight: false,
      infinite: true,
      initialSlide: startSlideIndex, // slide 시작 index 옵션
      customPaging:function(slider,i){
        return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
      }               
    })
  }, 10)
  
  $('.car_slide').on('afterChange', function(e, slick, currentSlide) {
    if (callback!==null && (typeof callback === 'function'))
    {
      callback(e, currentSlide)
    }
  });

  $('.travel_wrap:not(".vertical") .tab_cont2').on('afterChange', function(e, slick, currentSlide) {
    if (callback!==null && (typeof callback === 'function'))
    {
      callback(e, currentSlide)
    }
  });

  // slick div 클릭시 사용
  $('.travel_wrap:not(".vertical") .tab_cont2').on('click', function(e) {
    if (clickCallback!==null && (typeof clickCallback === 'function'))
    {
      clickCallback(e)
    }
  });      
}

export const fncSlick_oplrInfo = (vSpeed=500, arrowsBoolean=false, callback, startSlideIndex=0, clickCallback) => {
  setTimeout(()=>{
    // 제휴서비스 > NH콕마이카 > 자동차메인(오늘의 평균유가)
    $('.vertical_slider').not('.slick-initialized').slick({
      slidesToShow:1,
      dots:false,
      arrows : arrowsBoolean,
      vertical : true,
      autoplay:true,
      infinite: true,
      speed : vSpeed,
      initialSlide: startSlideIndex, // slide 시작 index 옵션
      customPaging:function(slider,i){
        return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
      }      
    })    
  }, 10)

  $('.vertical_slider').on('afterChange', function(e, slick, currentSlide) {
    if (callback!==null && (typeof callback === 'function'))
    {
      callback(e, currentSlide)
    }
  });

  // slick div 클릭시 사용
  $('.vertical_slider').on('click', function(e) {
    if (clickCallback!==null && (typeof clickCallback === 'function'))
    {
      clickCallback(e)
    }
  });        
}


// 영농일지 경락 가격 kimhc_20221014
export const fncSlick_actoLatcChart = (callback, clickCallback) => {
  // setTimeout(()=>{
    // 제휴서비스 > NH콕마이카 > 자동차메인(마이카올인원케어배너)
    // UI-AN-SZ-1002
    //$('.grap_toggle_wrap .custom_box4 .travel_wrap2 .tab_cont2').not('.slick-initialized').slick({
    //$('.tab_cont2').not('.slick-initialized').slick({
    $('.grap_toggle_wrap .custom_box4 .travel_wrap2 .tab_cont2').not('.slick-initialized').slick({
      centerMode:true,
      speed : 500,
      dots : true,
      arrows : false,
      vertical : false,
      adaptiveHeight: false,
      infinite: true,
      draggable: false,
      prevArrow: "<button type='button' class='slick-prev'>Next</button>",
      nextArrow: "<button type='button' class='slick-next'>Next</button>",
      // 2022-10-24 : 접근성 관련 추가 Start
      customPaging:function(slider,i){
        return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
      }
      // 2022-10-24 : 접근성 관련 추가 End
    });
  // }, 10)

  $('.tab_cont2').on('afterChange', function(e, slick, currentSlide) {
    if (callback!==null && (typeof callback === 'function'))
    {
      callback(e, currentSlide)
    }
  });

  // slick div 클릭시 사용
  $('.tab_cont2').on('click', function(e) {
    if (clickCallback!==null && (typeof clickCallback === 'function'))
    {
      clickCallback(e)
    }
  }); 
}

export const fncSlick_wrsRcmSlick1= (vSpeed=300, arrowsBoolean=false, callback, startSlideIndex=0, clickCallback) => { 
  setTimeout(()=>{
    $('.wrsRcmSlick1').not('.slick-initialized').slick({
      speed : vSpeed,
      dots : arrowsBoolean ? false : true,
      arrows : arrowsBoolean,
      vertical : false,
      adaptiveHeight: false,
      infinite: true,
      initialSlide: startSlideIndex, // slide 시작 index 옵션
      customPaging:function(slider,i){
        return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
      }
    });
  }, 10);

  $('.wrsRcmSlick1').on('afterChange', function(e, slick, currentSlide) {
    if (callback!==null && (typeof callback === 'function'))
    {
      callback(currentSlide)
    }
  });

  // slick div 클릭시 사용
  $('.wrsRcmSlick1').on('click', function() {
    if (clickCallback!==null && (typeof clickCallback === 'function'))
    {
      clickCallback()
    }
  });
}

export const fncSlick_wrsRcmSlick2= (vSpeed=300, arrowsBoolean=false, callback, startSlideIndex=0, clickCallback) => { 
  setTimeout(()=>{
    $('.wrsRcmSlick2').not('.slick-initialized').slick({
      speed : vSpeed,
      dots : arrowsBoolean ? false : true,
      arrows : arrowsBoolean,
      vertical : false,
      adaptiveHeight: false,
      infinite: true,
      initialSlide: startSlideIndex, // slide 시작 index 옵션
      customPaging:function(slider,i){
        return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
      }
    });
  }, 10);

  $('.wrsRcmSlick2').on('afterChange', function(e, slick, currentSlide) {
    if (callback!==null && (typeof callback === 'function'))
    {
      callback(currentSlide)
    }
  });

  // slick div 클릭시 사용
  $('.wrsRcmSlick2').on('click', function() {
    if (clickCallback!==null && (typeof clickCallback === 'function'))
    {
      clickCallback()
    }
  });
}

export const fncSlick_wrsRcmSlick3= (vSpeed=300, arrowsBoolean=false, callback, startSlideIndex=0, clickCallback) => { 
  setTimeout(()=>{
    $('.wrsRcmSlick3').not('.slick-initialized').slick({
      speed : vSpeed,
      dots : arrowsBoolean ? false : true,
      arrows : arrowsBoolean,
      vertical : false,
      adaptiveHeight: false,
      infinite: true,
      initialSlide: startSlideIndex, // slide 시작 index 옵션
      customPaging:function(slider,i){
        return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
      }
    });
  }, 10);

  $('.wrsRcmSlick3').on('afterChange', function(e, slick, currentSlide) {
    if (callback!==null && (typeof callback === 'function'))
    {
      callback(currentSlide)
    }
  });

  // slick div 클릭시 사용
  $('.wrsRcmSlick3').on('click', function() {
    if (clickCallback!==null && (typeof clickCallback === 'function'))
    {
      clickCallback()
    }
  });
}

export const fncSlick_travel_simple = (vSpeed=300, arrowsBoolean=false, callback, startSlideIndex=0, clickCallback) => { 
  setTimeout(()=>{
    $('.travel_simple .slider_wrap .tab_cont2').not('.slick-initialized').slick({
      centerMode:true,
      speed : vSpeed,
      dots : arrowsBoolean ? false : true,
      arrows : arrowsBoolean,
      vertical : false,
      adaptiveHeight: false,
      infinite: true,
      initialSlide: startSlideIndex, // slide 시작 index 옵션
      customPaging:function(slider,i){
        return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
      }
    });
  }, 10);

  $('.travel_simple .slider_wrap .tab_cont2').on('afterChange', function(e, slick, currentSlide) {
    if (callback!==null && (typeof callback === 'function'))
    {
      callback(currentSlide)
    }
  });

  // slick div 클릭시 사용
  $('.travel_simple .slider_wrap .tab_cont2').on('click', function() {
    if (clickCallback!==null && (typeof clickCallback === 'function'))
    {
      clickCallback()
    }
  });
}

export const fncSlick_briefing= () => { 
  setTimeout(()=>{
    $('.custom_box_info .slide').not('.slick-initialized').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: false,
      adaptiveHeight: true,
      infinite: false,
      useTransform: true,
      speed: 500,
      dots: true,
      focusOnSelect: false,
      autoplay: false,
      centerMode: false,
      pauseOnHover: false,
      customPaging:function(slider,i){
        return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
      }
    });
  }, 10);
}

export const fncSlick_briefing2= () => { 
  setTimeout(()=>{
    $('.custom_box_product01 .slide').not('.slick-initialized').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: false,
      adaptiveHeight: true,
      infinite: false,
      useTransform: true,
      speed: 500,
      dots: true,
      focusOnSelect: false,
      autoplay: false,
      centerMode: false,
      pauseOnHover: false,
      customPaging:function(slider,i){
        return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
      }
    });
  }, 10);
}