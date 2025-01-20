$(document).ready(function() {
	// new footer
	$('.footer-depth1 li:not(:last-child)').on('click',function(){
        //console.log($(this).attr('id'));
        $('.footer-wrap').show(0, function(){
            if($(this).hasClass('active')){
                $('.footer-depth1, .footer-depth2').removeClass('active');
                $('#footBtn').removeClass('active');
				$('.footer-cancle').removeClass('active');
                /* 초기값으로 */
                $('.footer-depth1 li, .footer-depth2 ul, .footer-contents p').removeClass('active');
                $('.footer-contents .item1,.footer-depth2 ul:nth-of-type(1),.footer-depth1 li.item1').addClass('active');
            } else {
                $('.footer-depth1, .footer-depth2').addClass('active');
                $('#footBtn').addClass('active');
				$('.footer-cancle').addClass('active');
				$('.footer-cancle').removeClass('out');
            }
        });
		$('.footer-cancle').click(
			function(){
				$('.footer-wrap').fadeOut(500);
				$('.footer-cancle').removeClass('active');
				$('.footer-cancle').addClass('out');
				/* 초기값으로 */
                $('.footer-depth1 li, .footer-depth2 ul, .footer-contents p').removeClass('active');
			}
		)
	});
	
	  //전체메뉴 테스트용
	  $('.footer-depth1 li.allmenu').on('click',function(){//누르면 나와요
		$('.allmenu-wrapper .ios,.com_btn_area.all_Menu').fadeToggle(100);
		$('.footer-depth1, .footer-depth2').removeClass('active');
		$('#footBtn').removeClass('active');
		$('.footer-cancle').removeClass('active');
		$('.footer-wrap').hide();		
	});
	$('.com_btn_area.all_Menu .all_close').on('click',function(){//누르면 닫혀요
		$('.allmenu-wrapper .ios,.com_btn_area.all_Menu').fadeToggle(300);
	});

    //footer 부채메뉴 이미지 테스트용
	$('.footer-depth1 a').on('click',function(){
		$('.footer-depth1 li, .footer-depth2 ul, .footer-contents p').removeClass('active');
        $('.footer-depth1 .bg, .footer-depth2 .bg').removeClass().addClass('bg');
		$(this).parent().addClass('active');
        var fidx = $(this).parent().index();
        $('.footer-depth1 .bg, .footer-depth2 .bg').addClass('item' + (fidx + 1));
        $('.footer-depth2 ul').eq(fidx).addClass('active');
		setTimeout(function(){
			$('.footer-contents').attr('tabindex',0).focus()
		},100);		
        $('.footer-contents p').eq(fidx).addClass('active');
	});

	//레이어 팝업 접근성 포커스 이동
	$("[aria-controls]").on("click", function() {
	  var op = $(this),
		lyp = $("#" + $(this).attr("aria-controls")),
		//lypHidden = lyp.find("[style='display:none']").empty(), ////포커스 받을 수 있는 요소 찾기 전 감춘 요소 없애기
		//lypObj = lyp.find(".dirPop_box"),
		lypClose = lyp.find(".btn_close"),
		lypTabable = lyp.find("button, [href], input:not([type='hidden']), select, textarea, iframe, [tabindex]:not([tabindex='-1'])"), //포커스 받을 수 있는 요소 찾기
		lypTabableFirst = lypTabable && lypTabable.first(),
		lypTabableLast = lypTabable && lypTabable.last(),
		tabDisable,
		nowScrollPos = $(window).scrollTop();
	  
	  //레이어 닫기 함수
	  function lyPopClose(){ 
		$(window).scrollTop(nowScrollPos); //레이어 닫은 후 화면 이동 방지
		if (tabDisable === true) lyp.attr("tabindex", "-1");
		lyp.removeClass("on");
		$("body").css("overflow", "visible");
		op.focus(); //레이어 닫은 후 원래 있던 곳으로 포커스 이동
	  }
	  op.blur();
	  lyp.addClass("on");
	//  $("body").css("overflow", "hidden");
  
	  lypTabable.length ? lypTabableFirst.focus().on("keydown", function(event){
		//레이어 열리자 마자 포커스 받을 수 있는 첫번째 요소로 포커스 이동
		if (event.shiftKey && (event.keyCode || event.which) === 9) {
		  //Shift + Tab키 : 포커스 받을 수 있는 첫번쨰 요소에서 마지막 요소로 초점 이동
		  event.preventDefault();
		  lypTabableLast.focus();
		}
	  }) : lyp.attr("tabindex", "0").focus().on("keydown", function(event){
		tabDisable = true;
		if ((event.keyCode || event.which) === 9) event.preventDefault();
		//Tab키 / Shift + Tab키 : 포커스 받을 수 있는 요소가 없을 경우 레이어 밖으로 초점 이동 안되게
	  });
  
	  lypTabableLast.on("keydown", function(event){
		if (!event.shiftKey && (event.keyCode || event.which) === 9) {
		  //Tab키 : 포커스 받을 수 있는 마지막 요소 첫번쨰 요소로 초점 이동
		  event.preventDefault();
		  lypTabableFirst.focus();
		}
	  });
  
	  lypClose.on("click", lyPopClose); //닫기 버튼 클릭 시 레이어 닫기
  
	  //Esc키 : 레이어닫기, 지금 사용안함(접근성 확장 대비)
	  // $(document).on("keydown", function(event){
	  //  var keyType = event.keyCode || event.which;
	  //  if (keyType === 27 && lyp.hasClass("on")) {
	  //    lyPopClose();
	  //  }
	  // });
	  
	  if($.trim($(this).attr("aria-controls")) == ""){
	  return;}
	  
	});
  });


	
		
	/****************************** Tab Page Link (X) S ******************************/
	$(document).on('click', '*[role="tablist"] button', function(){
		var target = $(this).attr('aria-controls');

		$(this).addClass('active').attr('aria-selected', true).siblings('button').removeClass('active').attr('aria-selected', false);
		$('#' + target).addClass('active').siblings('.cmm-tab-panel').removeClass('active');
	});
	/****************************** Tab Page Link (X) E ******************************/

		/****************************** Tab Page Link2 (X) S ******************************/
		
		$(document).on('click', '*[role="tablist"] li', function(){
			var target = $(this).attr('aria-controls');
	
			$(this).addClass('on').children().attr('aria-selected', true).parent().siblings('li').removeClass('on').children().attr('aria-selected', false);
			$('#' + target).addClass('on').siblings('.cmm-tab-panel').removeClass('on');
		});
		/****************************** Tab Page Link2 (X) E ******************************/
	
	
	// 토글 개별 컨트롤
    $(document).on('click', '*[data-ui-toggle] *[aria-expanded],*[data-toggle-target] a', function(){
        var target = $(this).closest('*[data-ui-toggle]'),
            targetType = target.attr('data-ui-toggle');
        if($(this).attr('aria-expanded') == 'true'){
            $(this).attr('aria-expanded', 'false');
            target.removeClass('active open');
            if(targetType == 'sticky'){
                target.addClass('close');
				$('.dimmed').removeAttr("style").fadeOut(200);
                $('#com_footer').removeAttr("style");
            }
        } else {
            target.removeClass('close');
            target.addClass('active');
            setTimeout(function(){
                target.addClass('open');
            },100);
            $(this).attr('aria-expanded', 'true');
			if(targetType == 'sticky'){
				$('.dimmed').css({'z-index':'500'}).fadeIn(200);
				$('#com_footer').css({'z-index':'400'});
			}
        }
    });

    // 토글 전체 컨트롤
    $(document).on('click', '*[data-toggle-target] button', function(){
        var targetName = $('*[data-toggle-target').attr('data-toggle-target'),
            target = $('#' + targetName).find('*[data-ui-toggle]'),
            targetType = target.attr('data-ui-toggle');
        if($(this).hasClass('btn-close')){
            target.find('*[aria-expanded]').attr('aria-expanded', 'false');
            if(targetType == 'table'){
                target.addClass('hide');
            } else {
                target.removeClass('active');
            }
        } else {
            target.find('*[aria-expanded]').attr('aria-expanded', 'true');
            if(targetType == 'table'){
                target.removeClass('hide');
            } else {
                target.addClass('active');
            }
        }
    });

    // 바디 클릭 시 토글 닫기
    // $(document).on('click', 'body', function(){
    //     if($('body').find('*[data-ui-toggle="layer"].open').length > 0 || $('body').find('*[data-ui-toggle="tooltip"].open').length > 0){
    //         $('*[data-ui-toggle].open').removeClass('active open').find('*[aria-expanded]').attr('aria-expanded', 'false');
    //     }
    // });

	// 기간설정 직접입력시 input 열기 닫기
	$(document).ready(function(){
		$('.cmm_radio').on('click',function(){
			$('.dir_input').hide();
		});
		$('.cmm_radio.btn_dir').on('click',function(){
			$('.dir_input').show();
		});
	});

	// 마이농가 서브메인 맞춤검색
	$(document).on('click' , '.com_btn_txtdelete', function(){
	$(this).parent('.com_btn_type01').css('display','none');
	// $(document).ready(function(){
	// 	$('.com_btn_toggle').on('click',function(){		
	// 		console.log('ffff');	
	// 	var _this = $(this);
	// 	_this.toggleClass('on');
	// 	if(_this.hasClass('on')){
	// 		$('.com_btnarea_type01 + .com_btnarea_type01').css('display','none');
	// 	}else{
	// 		$('.com_btnarea_type01 + .com_btnarea_type01').css('display','block');
	// 	}
	// 	});
	// });
});
	
$(function(){ 
	
	  // 개별선택 tab
	$('.com_tabmenu_type02 ul li').click(function(){
		var idx = $(this).index();
	  //	$('.tab_cont:first').show();
		$('.com_tabmenu_type02 ul li').removeClass('on').eq(idx).addClass('on');
	 // 	$('.tab_content:first').show();
		$('.tab_content').removeClass('on').eq(idx).addClass('on');
	});

	// 자산기관관리 tab (개발반영 X)
	$('.com_tabmenu_type04 ul li').click(function(){
		var idx = $(this).index();
	  //	$('.tab_cont:first').show();
		$('.com_tabmenu_type04 ul li').removeClass('on').eq(idx).addClass('on');
	 // 	$('.tab_content:first').show();
		$('.tab_content').removeClass('on').eq(idx).addClass('on');
	});

	 // 부동산 tab
	 $('.budongsan_list li').click(function(){
		var idx = $(this).index();
	  //	$('.tab_cont:first').show();
		$('.budongsan_list li').removeClass('on').eq(idx).addClass('on');
	 // 	$('.tab_content:first').show();
		$('.tab_content').removeClass('on').eq(idx).addClass('on');
	});



	// input X delete 
	$('.txt_input_02 input[type="search"]').keyup(function(){
		$('.btn_delete').show();
		 var searchVal = $(this).val(),
		   searchLen = searchVal.length
		 if(searchLen == 0){
		   $('.btn_delete').hide();
		 }
	});
		
		
	//20210804 이병철 수정 .siblings로 변경
	$('.txt_input_02 .btn_delete').on('click' , function(){ // x 버튼
		$('.btn_delete').hide();
		$(this).prev('input[type="search"]').val('');
		$(this).prev('input[type="text"]').val('');
	  });
	  $('.com_btn_delete2').on('click' , function(){ // x 버튼
		$(this).hide();
		$(this).parent('.del_txt').siblings('input').val('');
		$(this).parent('.del_txt').siblings('input').removeClass('focusON')
	  });
	  // input X delete 
	$('.com_input_type02 input[type="search"]').keyup(function(){
		$('.com_btn_delete').show();
		 var searchVal = $(this).val(),
		   searchLen = searchVal.length
		 if(searchLen == 0){
		   $('.com_btn_delete').hide();
		 }
	});
	//20210804 이병철 수정 라인이펙트용 append 추가 및 콘솔에러 focus 내 중첩 해결
	// input x button display / none 
	$('.com_btn_delete').hide();
	$('.com_btn_delete2').hide();
	$('.com_input_type01 input').after('<div class="lineEF"></div>')
	$('.com_input_type01 input').focus(
		function(){
			$('.com_input_type01 input').removeClass('focusforce')			
			$(this).addClass('focusforce')
			
		}	
	)	
	$('.com_input_type01 input').keyup(function(){
		// $(this).next('.del_txt').children('.com_btn_delete2').show();
		$(this).addClass('focusON')
		 var searchVal = $(this).val(),
		   searchLen = searchVal.length
		 if(searchLen == 0){
			// $(this).next('.del_txt').children('.com_btn_delete2').hide();
			$(this).removeClass('focusON')
		 }
	});
	//20210804 이병철 수정 necessary 붙는 위치 변경
	/* 필수 *표시 인풋 addclass로 구분*/
	$(document).ready(function(){
		$('.com_input_type01 label').has('em').parent().addClass('necessary')
		$('.com_textarea_type01 label').has('em').parent().addClass('necessary')
	});

	/* lnb 가지고 있는 레이아웃 분기를 위해 addclass*/
	// $(document).ready(function(){
	// 	$('#wrap').has('.lnb').addClass('hasLNB')
	// });

	
	/* $('.com_input_type02 .com_btn_delete').on('click' , function(){ // x 버튼
		$('.com_btn_delete').hide();
		$(this).prev('input[type="search"]').val('');
		$(this).prev('input[type="text"]').val('');
	  }); 20211022 X버튼삭제 */

	// alert popup 
	$('.alert_popup .popup_footer .btn_no').on('click' , function(){
		$('.alert_popup').hide();
		$('.dimmed').fadeOut(200);
	});

	function layerPopupOpen(self, target){
		var scrollTop = $('body').scrollTop();
		$('.dimmed').fadeIn(200);
	//	$('.slide_popup').animate({bottom:'0'});
		$('body').addClass('scroll-off').on('scroll touchmove mousewheel', function(e) {e.preventDefault()});
		$('#wrap').attr('aria-hidden', 'true').css('top', -scrollTop);
		$(target).show().attr('aria-hidden', 'false').siblings('.slide_popup,.full_popup').attr('aria-hidden', 'true');
		self.addClass('layerPopupOpen');
		$(target).find('.popup_header h1').attr('tabindex', 0).focus();
		
	}

	function layerPopupClose(self){
		var target = self.parents('.slide_popup,.full_popup').prev('*[aria-hidden]');
		var scrollTop = $('#wrap').css('top',0);

		$('body').removeClass('scroll-off').off('scroll touchmove mousewheel');
		$('body').removeAttr('style');
		$('body').scrollTop(scrollTop);
		$('#wrap').attr('aria-hidden', 'false');
		self.parents('.slide_popup,.full_popup').hide().attr('aria-hidden', 'true');
		$('#wrap').find('.layerPopupOpen').focus().removeClass('layerPopupOpen');

		$('.dimmed').fadeOut(200);
	}
	// slide popup
		// var vheight = $('.popup_box').height();
		// console.log(vheight);
		// $('.popup_box').css('height', vheight);

	//layer Popup Open
	$(document).on('click' , '*[data-popup]',function(){
		var target = $(this).attr('data-popup');
		layerPopupOpen($(this),'#' + target);

		
	});
	// $(document).on('click' , '*[aria-controls]',function(){
	// 	var target = $(this).attr('aria-controls');
	// 	layerPopupOpen($(this),'#' + target);
		
	// });
	//layer Popup Close
	$(document).on('click' , '.slide_popup .btn_close,.full_popup .btn_close', function(){
		if(
			$(this).hasClass('gray')
		){null}	else{
			layerPopupClose($(this));
		}
	});
	// 서브메인 배너
	$(document).ready(function(){
		$('.admin_banner_area .btn_close').on('click',function(){
			$('.admin_banner_area').fadeOut(400);
		});
	});

	
	// $(document).ready(function(){
	//     $('.slide_popup_open').on('click' , function(){
	//         $('.dimmed').fadeIn(200);
	//         $('.slide_popup').show().animate({bottom:'0'});
	//     });
	//     $('.btn_close').on('click' , function(){
	//         $('.dimmed').fadeOut(200);
	//         $('.slide_popup').hide();
	//     });
	//     $('.dimmed').on('click', function(){
	//         $('.dimmed').fadeOut(200);
	//         $('.slide_popup').hide();
	//     });
	// });

	//count up
	$('.counter').each(function(){
		var $this = $(this),
		countTo = $this.attr('data-count');
		
		$({countNum: $this.text()}).animate({
			countNum:countTo
		},
		{
			duration:1500,
			easing:'easeOutCubic',
			step:function(){
				$this.text(addCommas(Math.floor(this.countNum)));
			},
			complete:function(){
				$this.text(addCommas(this.countNum));
			}			
		});
		function addCommas(nStr){
			return nStr.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
		}
	});
	
	//플로팅 팝오버 닫기
	// 기간설정 직접입력시 input 열기 닫기
	$(document).ready(function(){
		$('.float_popover .btn_close.gray').on('click',function(){
			$('.float_popover_wrap .float_popover ').fadeOut(400);
			$('.float_popover_wrap').fadeOut(400);
			$('.new_float_popover_wrap .float_popover ').fadeOut(400);
			$('.new_float_popover_wrap').fadeOut(400);
		});
	});
	

	//인포 툴팁
	$(document).ready(function(){
		$('.com_ballon_type01').hide();
		$('.com_tooltip_type02 a > .arrow,.com_tooltip_type02 button > .arrow').hide();
		$('.com_btn_info').on('click',function(){
			$(this).parent().next('.com_ballon_type01').show()	
			$(this).next('.com_ballon_type01').show()			
			$(this).children('.arrow').show();
		});
		$('.com_ballon_type01 .com_btn_close').on('click',function(){
			$('.com_ballon_type01').hide();
			$('.com_tooltip_type02 a > .arrow,.com_tooltip_type02 button > .arrow').hide();
		});
	});
	
	

	//인풋 포커스 관련
	// $('input').focus(function(){
	// 	$(this).prev('label').addClass('star')
	// });
	// $('input').blur(function(){
	// 	$(this).prev('label').removeClass('star')
	// });

	//달력열고접기
		$(function(){
			$(".cal_tb tbody td").click(
				function(){
				 if($(this).hasClass('active')){
					 null; 
					}else{
					 $(".cal_tb tbody tr td").removeClass('active')
				 $(this).addClass('active')				 
				 }
				}
			)
		   
		 }
		);
});

$(document).ready(function(){
	$('.com_txtarea_type01').on('keyup' , function(){
		$(this).css('height','3rem');
		$(this).height(this.scrollHeight);
		if(event.keyCode === 8){ //백스페이스 키가 눌렸을때만 실행
			var replyTxt = $(this).closest('#wrap').find('.com_txtarea_type01');
			var replyLeng = replyTxt.find('.com_txtarea_type01'); //input에 입력값 확인
			var inKey = replyTxt.find('.com_txtarea_type01').val(); //input에 입력된 내용 체크
			//if(replyTxt.find('span').text() != ''){ //선택된 이름이 없으면 실행안됨
				
				// if(inKey == ''){
				// //	replyTxt.find('span').hide();
				// 	replyTxt.find('.com_txtarea_type01').css('height','2.6rem').val('');
				// //	$('.reply_area textarea').removeClass('name');
				// };
			//};
		};
	});
});
/*스크롤인터랙션 - ios이슈 해결용 test 20210712 이병철*/
$(function(){
	$(".sticky-scroll #content").bind('scroll', function(e){
		
		var scrollTop = $(e.target).scrollTop();
	//	var headerH = $('#header').height();
	//	console.log(headerH);
		if ( scrollTop > 55){
			$("#wrap").addClass("responsive");
			$('.select_date_wrap .select_date').prependTo('.content-view').addClass('move')
			// $('.select_dual_wrap .select_dual').prependTo('.content-view').addClass('move')
		}
		else{
			$("#wrap").removeClass("responsive");
			$('.content-view > .select_date').prependTo('.select_date_wrap').removeClass('move')
			// $('.content-view > .select_dual').prependTo('.select_dual_wrap').removeClass('move')
		}
	})
	$(".sticky-scroll:not('.type02') .popup_content").bind('scroll', function(e){
		
		var scrollTop = $(e.target).scrollTop();
		if ( scrollTop > 130 ){
			$(".full_popup").addClass("responsive_popup");
			$('.full_popup .select_date_wrap .date_inner').prependTo('.full_popup').addClass('move')
		}
		else{
			$(".full_popup").removeClass("responsive_popup");
			$('.full_popup > .date_inner').prependTo('.full_popup .select_date_wrap').removeClass('move')
		}
	})
	$(".sticky-scroll.type02 .popup_content").bind('scroll', function(e){
		
		var scrollTop = $(e.target).scrollTop();
		if ( scrollTop > 20 ){
			$(".full_popup").addClass("responsive_popup");
			$('.full_popup .select_date_wrap .date_inner').prependTo('.full_popup').addClass('move')
		}
		else{
			$(".full_popup").removeClass("responsive_popup");
			$('.full_popup > .date_inner').prependTo('.full_popup .select_date_wrap').removeClass('move')
		}
	})
});

/* 탭메뉴, lnb 포커스 */

$(document).ready(function(){
	$('.com_tabmenu_type02 > div').each(function(){
		var _width = $(this).width(),
		_length = $(this).find('li').length,
		_index = $(this).find('.on').index();
		$('.com_tabmenu_type02 > div').scrollLeft((_width/_length) * _index);
	}); 
	$('.lnb').each(function(){
		var _width = $(this).width(),
		_length = $(this).find('li').length,
		_index = $(this).find('.on').index();

		$('.lnb').scrollLeft((_width/_length) * _index);
	}); 
});

/* ios 스크롤 바운스 막는 코드 test */

function preventDefault(e){
	e.preventDefault();
}

function disableScroll(){
	document.body.addEventListener('touchmove', preventDefault,{passive: false});
}

function enableScroll(){
	document.body.removeEventListener('touchmove', preventDefault);
}
// 달력 리스트 X삭제
$(function(){
	$('.btn_delete_callist').on('click',function(){
		$(this).closest('dl').remove();


	});
})
// 이메일 영역 클릭시 노출
// $(function(){
// 	$('.new_check_all.type_02').on('change',function(){
// 		$('.com_inputarea_type00').show().animate({'padding-bottom':'5.6rem'},1000).slideDown('slow');
// 	});
// })

// 전세대출 클릭시 노출
// $(function(){
// 	$('.click_checkbox').on('change',function(){
// 		$('.hidden_area').show().animate({'padding-bottom':'5.6rem'},1000).slideDown('slow');
// 	});
// })
$(function(){
	$('.click_checkbox').on('click',function(){
		var chk = $('.click_checkbox input').is(":checked");
		if(chk){
			$(this).next('.hidden_area').slideDown('slow');
		}else{
			$(this).next('.hidden_area').slideUp('slow');
		}
	});
})

// 약관동의 스크롤시 동의버튼 활성화
$(function(){
	$('.separate_scroll .terms_text_wrap').bind('scroll',function(){
		var	topH = $('.separate_scroll .terms_text_wrap').innerHeight();
		var scroll = $('.separate_scroll .terms_text_wrap').scrollTop();
		if(scroll >= topH){
			$('.full_popup .popup_footer > div > a').removeClass('btn_off');
		}
	});
})
// 카드 노출 설정 순서변경
$('.order_list').sortable({
	item:'.page',
	revert: true,
	handle:'a',
	cancel:'li > span',
	opacity: 0.5,
	start: function(evt,ui){
		var link = ui.item.find('a');
	},
	stop: function(evt,ui){
		setTimeout(
			function(){
				var link = ui.item.find('a');
				link.attr('onclick', link.data('click-event'));
			}, 50
		)
	}
});
// 한번에등록 체크했을때
$(function(){

	$('.com_box_chk input').on('click',function(){
		var chk = $(this).is(":checked");
		if(chk){
			$(this).parents('.com_box_chk').addClass('active');
		}else{
			$(this).parents('.com_box_chk').removeClass('active');
		}
	});
})

// keyapd up down
// $(function(){
// 	$('input[type="text"],input[type="tel"],textarea').on({
// 		'focus':function(){
// 			$('body').addClass('keypad').css({'height': '100% + 2rem'});
// 		},
// 		'focusout':function(){
// 			$('body').removeClass('keypad');
// 		}
// 	});
// })

// function datepickerDay (){
// 	//달력(날짜입력)
// 	$('input[name="day"]').datepicker({
// 	   showOn:"both",
// 	   dayNames:['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
// 	   dayNamesMin:['일','월','화','수','목','금','토',],
// 	   monthNamesShort:['1','2','3','4','5','6','7','8','9','10','11','12'],
// 	   monthNames:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
// 	   changeMonth: true,
// 	   changeYear: true,
// 	   nextText: '다음달',
// 	   prevText: '이전달',
// 	   //numberOfMonths:[2,2]
// 	   showButtonPanel:true,
// 	   showMonthAfterYear:true,
// 	   yearSuffix:'<span>년</span>',
// 	   currentText:'오늘 날짜',
// 	   closeText:'닫기',
// 	   dateFormat:"yy-mm-dd",
// 	   buttonImage:"/resource/resource/images/icon_cal.png",
// 	   buttonImageOnly:false,
// 	   buttonText :"Seclect date"
// 	 });	
// 	}
/* 라디오버튼 접근성 */
$(function(){
	$('.btn_radio input[type=radio]').attr('aria-hidden', true);
	$('.btn_radio label').attr('aria-checked', false);
	$('.btn_radio label').attr('role','radio');
	$('.btn_radio label').on('click',function(){
		$(this).attr('aria-checked', true).parents().siblings().find('label').attr('aria-checked', false);
	});
})
/* 탭 접근성 */
$(function(){
	$('*[role="tablist"] a').attr('aria-selected', false);
	$('*[role="tablist"] a').attr('role','tab');
	$('*[role="tablist"] li').each(function(){
		var chk = $(this).hasClass('on');
		if(chk){
			$(this).children().attr('aria-selected', true);
		}else{
			$(this).children().attr('aria-selected', false);
		}
	});
})
/* 서브탭 라디오버튼 접근성 */
$(function(){
	$('.cmm_radio input[type=radio]').attr('aria-hidden', true);
	$('.cmm_radio label').attr('aria-checked', false);
	$('.cmm_radio label').attr('role','radio');
	$('.cmm_radio label').each(function(){
		var chk = $(this).prev($('input[type=radio]')).is(':checked');
		if(chk){
			$(this).attr('aria-checked', true);
		}else{
			$(this).attr('aria-checked', false);
		}
	});
	
	$('.cmm_radio label').on('click',function(){
		$(this).attr('aria-checked', true).parents().siblings().find('label').attr('aria-checked', false);
	});
})

/* 체크박스 접근성 */
$(function(){
	$('.btn_chk input[type=checkbox]').attr('aria-hidden', true);
	$('.btn_chk label').attr('aria-checked', false);
	$('.btn_chk label').attr('role','checkbox');
	$('.btn_chk label').on('click',function(){
		var chk = $(this).prev($('input[type=checkbox]')).is(':checked');
		if(!chk){
			$(this).attr('aria-checked', true);
		}else{
			$(this).attr('aria-checked', false);
		}
	});
})

$(function(){
	$('.list_type_01 li a,.list_type_02 li a,.list_type_03 li a,.terms_list.view_link_list2 a').attr('role','button');
})

// 버튼 role="button" 추가(접근성적용)
$(function(){
	$("#header > a").attr('role','button')
	$('.full_popup .btn_back').attr('role','button')
	$('.full_popup .btn_close').attr('role','button')
	$('.popup_footer > div > a').attr('role','button') // full pop, slide pop  공통적용
	$('.bottom_box > div > a').attr('role','button')
})
// 입력 input (접근성적용)
/* $(function(){
	$('.com_input_type01').attr('role','button')
	$('.com_input_type01 input').attr('aria-hidden','true')
	$('.com_input_type02').attr('role','button')
	$('.com_input_type02 input').attr('aria-hidden','true')	
}) */