/*eslint-disable*/

$(document).ready(function() {
	// new footer
	$('.footer-depth1 li:not(:last-child)').on('click',function(){
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
		$('.footer-cancle').click(function(){
			$('.footer-wrap').fadeOut(500);
			$('.footer-cancle').removeClass('active');
			$('.footer-cancle').addClass('out');
			/* 초기값으로 */
			$('.footer-depth1 li, .footer-depth2 ul, .footer-contents p').removeClass('active');
		});
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
	$("[aria-controls]").closest('ul').not('[role="tablist"]').on("click", function() {
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
		//$("body").css("overflow", "visible");
		$('body').removeClass('scroll-off').off('scroll touchmove mousewheel');
		op.focus(); //레이어 닫은 후 원래 있던 곳으로 포커스 이동
	  }
	  op.blur();
	  lyp.addClass("on");
	  $('body').addClass('scroll-off').on('scroll touchmove mousewheel', function(e) {e.preventDefault()});
	  lyp.attr("tabindex",-1).focus();
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
		//$(target).show().attr('aria-hidden', 'false').siblings('.slide_popup,.full_popup').attr('aria-hidden', 'true');
		self.addClass('layerPopupOpen');
		$(target).find('.popup_header h1').attr('tabindex', 0).focus();
		if(!$(target).find('div').hasClass('popup_header')){
			$(target).attr('tabindex', 0).focus();
		};
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
			$('.com_ballon_type01').hide();
			$('.com_tooltip_type02 a > .arrow,.com_tooltip_type02 button > .arrow').hide();		
			$(this).parent().next('.com_ballon_type01').show()	
			$(this).next('.com_ballon_type01').show()			
			$(this).children('.arrow').show();			
		});
		$('.com_ballon_type01 .com_btn_close').on('click',function(){
			$('.com_ballon_type01').hide();
			$('.com_tooltip_type02 a > .arrow,.com_tooltip_type02 button > .arrow').hide();		
		});
		// 영역밖 터치 시 키보드로 버튼 터치 안됨
		// $('html').click(function(e){	
		// 	if($(e.target).parents('.com_btn_info').length < 1){
		// 		$('.com_ballon_type01').hide();
		// 		$('.com_tooltip_type02 a > .arrow,.com_tooltip_type02 button > .arrow').hide();				
		// 	}	
		// });

		// UI-PD-RT-1001.html
		function arrowBtn () {
			var closeBtn = $('.target_money_wrap .tab_tooltip_wrap02 .com_btn_close');
			closeBtn.on('click', function() {
				$('.target_money_wrap .com_btn_info .arrow').hide();
				setTimeout(function(){},0)
			});
		}

		arrowBtn ();// 툴팁 arrow 버튼 js
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
		if ( scrollTop > 5){
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
	/*2022-10-18*/
	$('.popup_box a.btn_close').attr('role','button');
	$('.com_btn_area a').attr('role','button');
	$('.com_input_type01 a').attr('role','button');
	$('.com_btn_info').attr('role','button');
	$('.re_flex a').attr('role','button');
	// 알에이트 hidden 처리 // 개별처리 
	// $('#chartHolder,#chartHolder1,#chartHolder2,#chartHolder3,#chartHolder4,#chartHolder5').attr('aria-hidden','true')
})
// 입력 input (접근성적용)
/* $(function(){
	$('.com_input_type01').attr('role','button')
	$('.com_input_type01 input').attr('aria-hidden','true')
	$('.com_input_type02').attr('role','button')
	$('.com_input_type02 input').attr('aria-hidden','true')	
}) */
$(function(){
	var renewalJ = renewalJ || {};
	var renewalJ ={
		init : function(){
			renewalJ.bannerSlider();
			renewalJ.sotTable();
			renewalJ.checkBox();
			renewalJ.mainSlider();
			renewalJ.slide();
			renewalJ.optionCheck();
			renewalJ.tabTooltip();
			renewalJ.btnLastFun();
			renewalJ.subcotentFn(); // sub content
			renewalJ.footerFn();
			renewalJ.customFixedLnb();
			renewalJ.anFm1002();
			if($("div").hasClass("auto_play")){
				renewalJ.autoplayBtn (); // 토글 버튼( play / pause ) li 끝에 추가
			}
		},
		tabTooltip:function(){
			function tooltipArrow(){
				$('.tab_radius a').each(function(e){
					if($(this).hasClass('active')){
						var $this = $(this),
							_thisId = $this.attr('data-tab-tooltip'),
							_thisleft = $this.outerWidth(true)/2 + $this.offset().left - 30;
						$('#'+_thisId).show().find('.arrow').css('left',_thisleft);
						$('#'+_thisId).siblings().hide();
					};
				});
			}
			$(document).on('click','.tab_radius a',function(){
				$(this).addClass('active');
				$(this).closest('li').siblings().find('a').removeClass('active');
				tooltipArrow();
			});
			$(window).resize(function(){
				tooltipArrow();
			}).trigger('resize');
		},
		optionCheck:function(){
			$(document).on('click','.choice_option button',function(){
				$(this).addClass('active').attr('title','선택됨');
				$(this).siblings().removeClass('active').attr('title','선택안됨');
			});
		},
		checkBox:function(){
			$('.custom-switch input').on('change',function(){
				if($(this).prop('checked') == true){
					$(this).closest('.list_item').addClass('active');
				}else{
					$(this).closest('.list_item').removeClass('active');
				};
			});
		},
		slide:function(){
			//UI-CO-AS-1001
			$('.info_intro').slick({
				speed : 350,
				dots : true,
				arrows : false,
				autoplay:true,
				infinite: false,
				autoplaySpeed:6000,
				customPaging:function(slider,i){
					return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
				}
			});
			$('.info_intro').on('afterChange',function(e,slick,idx){
				if(slick.slideCount-1 == idx){
					$('.info_intro').slick('slickSetOption','autoplay',false)
				}
			})

			// // UI-AN-RE-1001
			$('.house_slide.slide').slick({
				speed : 500,
				dots : true,
				arrows : false,
				infinite:false,
				customPaging:function(slider,i){
					return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
				}
			});
			// UI-AS-CA-1001
			$('.custom_car .tab_cont').slick({
				speed : 500,
				dots : true,
				arrows : false,
				vertical : false,
				adaptiveHeight: true,
				infinite: false,
				slidesToShow: 1,
				customPaging:function(slider,i){
					return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
				}
				
			});
			// UI-AN-CA-1001
			$('.car_slide').slick({
				slidesToShow:1,
				dots:true,
				arrows : false,
				// centerMode: true,
				centerPadding:'0',
				infinite: false,
				// variableWidth:true,
				customPaging:function(slider,i){
					return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
				}
			});
			$('.vertical_slider').slick({
				slidesToShow:1,
				dots:false,
				arrows : false,
				vertical : true,
				verticalSwiping: true, // 상하스위핑
				autoplay:true,
				infinite: true,
				customPaging:function(slider,i){
					return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
				}
			});
			$('.fade_slider').slick({
				slidesToShow:1,
				dots:false,
				arrows : false,
				autoplay:true,
				autoPlaySpeed:2000,
				infinite: true,
				fade:true,
				centerMode: true,
				speed:200,
				customPaging:function(slider,i){
					return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
				}
			});
			// $('.goods_list_slide').slick({
			// 	// slidesToShow:1.66,
			// 	variableWidth:true,
			// 	dots:true,
			// 	arrows : false,
			// 	centerPadding:0,
			// 	infinite: false,
			// customPaging:function(slider,i,length){
			// 	var text = $(slider.$slides[i]).data();
			// 	return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
			// }
			// });
			$('.travel_wrap:not(".vertical") .tab_cont2').slick({
				centerMode:true,
				speed : 500,
				dots : true,
				arrows : false,
				vertical : false,
				adaptiveHeight: false,
				infinite: true,
				customPaging:function(slider,i){
					return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
				}
			});
			$('.travel_wrap.vertical .tab_cont2').slick({
				centerMode:true,
				speed : 500,
				dots : true,
				arrows : false,
				vertical : true,
				verticalSwiping: true, // 상하스위핑
				adaptiveHeight: false,
				infinite: true,
				customPaging:function(slider,i){
					return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
				}
			});
			
			// vertical
			$('.vertical_car .slider_wrap .tab_cont').slick({
				//vertical : true,
				//verticalSwiping: true, // 상하스위핑
				//fade: false,
				//adaptiveHeight: true,
				//useTransform: true,
				//focusOnSelect: false,
				//centerMode: false,
				//pauseOnHover: false,
				//slidesToShow: 2,
				//slidesToScroll: 1,
				arrows: false,
				infinite: true,
				speed: 300,
				dots: true,
				autoplay: true,
				customPaging:function(slider,i){
					return '<button type="button"><b>'+ (i+1) +'</b> / '+slider.$slides.length+'</button>';
				}
				//slickPause: 'slick-pause', //pause 버튼
				//slickPlay: 'slick-play' //play 버튼
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
				pauseOnHover: false,
				customPaging:function(slider,i){
					return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
				}
			});
			// UI-PD-BF-1001
			$('.custom_box_product01 .slide').slick({
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
			// UI-PD-BF-1001
			$('.custom_box_info .slide').slick({
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
			// UI-PD-PD-1001
			$('.custom_box_goods_root .banner_slider2').slick({
				dots:true,
				arrows:false,
				slidesToShow: 1,
				slidesToScroll: 1,
				fade: false,
				adaptiveHeight: true,
				infinite: false,
				useTransform: true,
				speed: 500,
				focusOnSelect: false,
				autoplay: false,
				centerMode: false,
				pauseOnHover: false,
				customPaging:function(slider,i){
					return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
				}

			});
		},
		bannerSlider : function(){
			$('.banner_slider').slick({
				dots:true,
				arrows:false,
				slidesToShow: 1,
				infinite: false,
				customPaging:function(slider,i){
					return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
				}
			});
			//[v4.0]페이지로 이동
			/*
			$('.terms_view.slide').slick({
				slidesToShow: 1,
				infinite: false,
				adaptiveHeight:true,
				height:'auto',
				customPaging:function(slider,i){
					return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
				}
			});
			*/
			// $('.terms_view').slick('refresh')
		},
		sotTable:function(){
			var sort = $('.sortable_list').sortable({
				handle:'.btn_sortable',
				cancel:'',
				placeholder:'sort_highlight',
				// items:'div:not(".not")',
				revert:true,
				scroll:false,
				delay:100
			});
		},
		btnLastFun:function(){
			if($('.popup_footer').hasClass('last_move')){
				//console.log($(this))
				var $btnBox = $('.last_move'),
					$cont = $btnBox.siblings('.popup_content'),	
					$viewBox = $cont.find('.terms_view'),
					_offT = $viewBox.offset().top,
					$btn = $btnBox.find('.btn'),
					$btnMove = $btnBox.find('.btn_move_hide'),
					_winH = $(window).height(),
					_pageHegiht = 0,
					_contH = $cont.outerHeight(true),
					_headH = $btnBox.siblings('.popup_header').height(),
					_scrollT = 0;
				function boxHeight(){
					_pageHegiht = 0;
					$cont.children('div').each(function(e){
						_pageHegiht += $(this).outerHeight(true);
					});
				};boxHeight()
				$btnMove.on('click',function(){
					_scrollT +=_contH-$btnBox.height() - _headH;
					$cont.animate({'scrollTop':_scrollT});
				});
				$cont.scroll(function(){
					boxHeight();
					var _scrollT = $cont.scrollTop();
					if(_scrollT + _winH - _offT >=  _pageHegiht){
						$btn.show();
						$btnBox.find('.btn_move_hide').hide();
						$viewBox.find('.error_message').addClass('on');// 07/24 jlee 하단 버튼팁 추가 util/jUtil.js 개발소스로 이동
						setTimeout(function(){$viewBox.find('.error_message').removeClass('on').addClass('off')},2000);
					};
					// else{
					// 	$btn.hide();
					// 	$btnBox.find('.btn_move_hide').show();
					// };
				});
			}
		},
		mainSlider:function(){
			$('.mainScroll .slideBox').slick({
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
				accessibility:false,
				customPaging:function(slider,i){
					return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
				}
			});			
			$('.main .subMenuList').on('init', function(event, slick) {
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
				accessibility:false,
				customPaging:function(slider,i){
					return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
				}
			});
			// 슬라이드 터치 후 드레그
			$('.main .mainScroll .slideBox').on('afterChange', function(event, slick, currentSlide) {
				// 슬라이드 터치 후 드레그시 푸터 사라지는 현상 관련
				// $('#wrap .main .mainFooter').removeClass('block');
			});
			var $waveThis,
				$waveTabLise,
				_waveThisOffset,
				_waveIdx = 0;
			$('.main .comTabmenuType01 .subMenuList').on('click', '.slick-slide', function(e) {
				_waveIdx = $(this).data('slick-index');
				$('.main .mainScroll .slideBox').slick('slickGoTo', _waveIdx);
				waveMove(_waveIdx);

				var currentNavSlideElem = '.subMenuList .slick-slide[data-slick-index="' + _waveIdx + '"]';
				$('.main .subMenuList .slick-slide.is-active').removeClass('is-active');
				var isActive = $(currentNavSlideElem).addClass('is-active');
				var $ElementMove = $(".main .mainHeader .subMenu .comTabmenuType01 .waveMove");

			});
			
			function waveMoveW(){
				$waveThis = $('.waveMove'),
				$waveTabLise = $('.subMenu .subMenuList .slick-slide'),
				_waveThisOffset = [];
				$waveTabLise.each(function(e){
					_waveThisOffset[e] = ($(this).offset().left + ($(this).width()/2)) - $waveThis.width()/2;
				});

			};
			function waveTime(){
				$waveThis.addClass('active');
				var _setT = setTimeout(function(){
					$waveThis.removeClass('active');
				},1500);
				if($waveThis.is(':animated')){
					$waveThis.addClass('active');
					_setT;
				};
			};
			function waveMove(_idx,_resize){
				waveMoveW();
				var $waveThis = $('.waveMove'),
				_waveIdx = _idx,
				_winH = $(window).height();
				if(_resize == true){
					$waveThis.css({'left':_waveThisOffset[_idx]});
					return false;
				};
				
				$waveThis.stop().animate({'left':_waveThisOffset[_idx]},300);
				if($('.mainScroll .slick-slide').eq(_idx).height() <= _winH){
					$('.mainScroll .slick-slide').eq(_idx).find('.container').css('padding-bottom',100)
				};
			};
			$(window).resize(function(){
				var move = setTimeout(function(){
						waveMove(_waveIdx,true)
					},100);
			}).trigger('resize');
			var menu = $(".main .mainHeader .subMenu .comTabmenuType01 .subMenuList .slick-list .slick-track button[type='button']");
			menu.each(function(index) {
				menu.eq(index).on('click', function () {
					// $('.main .mainHeader .subMenu').removeClass('menu00 menu01 menu02 menu03');
					// $(this).parents('.subMenu').addClass('menu0' + index);
					// 클릭한 버튼의 id 찾아서 넣어준다.
					menu_num = $(this).attr("id");
					$('.main .mainHeader .subMenu').removeClass('menu00 menu01 menu02 menu03');
					$(this).parents('.subMenu').addClass( menu_num );
				});
			});
			$('.mainScroll .slideBox').on('swipe',function(){
				_waveIdx = $('.slideBox').slick('slickCurrentSlide');
				waveMove(_waveIdx);
				// $('.main .mainHeader .subMenu').removeClass('menu00 menu01 menu02 menu03');
				// $('.subMenu').addClass('menu0' + _waveIdx);
				var currentNavSlideElem = '.subMenuList .slick-slide[data-slick-index="' + _waveIdx + '"]';
				$('.main .subMenuList .slick-slide.is-active').removeClass('is-active');
				var isActive = $(currentNavSlideElem).addClass('is-active');
				var $ElementMove = $(".main .mainHeader .subMenu .comTabmenuType01 .waveMove");
				
				// 엑티브된 id 찾아서 넣어준다.
				menu_num = $('.main .subMenuList .slick-slide.is-active').attr("id");
				$('.main .mainHeader .subMenu').removeClass('menu00 menu01 menu02 menu03');
				$('.subMenu').addClass( menu_num );
			});
			
			
			// 자산 탭 > 자동차 슬라이더
			$('.main .left_car .slider_wrap .tab_cont').slick({
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
				pauseOnHover: false,
				customPaging:function(slider,i){
					return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
				}
				// slickPause: 'slick-pause', //pause 버튼
				// slickPlay: 'slick-play' //play 버튼
			});

			// 마케팅 배너
			$('#slide_popup_02 .tab_cont').slick({
				speed : 300,
				dots : true,
				arrows : false,
				vertical : false,
				adaptiveHeight: true,
				infinite: false,
				customPaging:function(slider,i){
					return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
				}
				// autoplay: true
			});
		},
		// 토글 버튼( play / pause )	
		autoplayBtn :function($ele) {
			$('.auto_play').each(function(e){
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
		subcotentFn:function(){
			var lastScrollTop = 0;
			$(".sticky-scroll #content").on('scroll', function(e){
				var scrollTop = $(this).scrollTop();
				if ( scrollTop > lastScrollTop ) {
					$('#com_footer').removeClass('block');
				} else {
					$('#com_footer').addClass('block');
				}
				lastScrollTop = scrollTop; // 스크롤 올리는 부분 감지 js
			})
		},
		footerFn:function() {
			$(window).on('load',function () {
				var lastScrollTop = 0;
				var footer = $('#com_footer');
				var marketingBanner = $('.marketing_popup_box'); // 마케팅 배너
				
				footer.addClass('block');
				marketingBanner.addClass('block');
				$('.mainScroll').on('scroll', function(e) {
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
			});

			// 2022-10-20 : 접근성관련
			$('.custom_footer .allmenu-wrapper').addClass('disn');
			$('.custom_footer .com_btn_area.all_Menu .all_close').on('click', function() {
				$('.custom_footer .allmenu-wrapper').addClass('disn');
			});
			// 푸터 전체 메뉴 클릭
			$('.custom_footer .footer-depth1 li.allmenu a').on('click', function() {
				$('.custom_footer .allmenu-wrapper').addClass('on');
				// 2022-10-20 : 접근성관련
				$('.custom_footer .allmenu-wrapper').removeClass('disn');
			});

			// 푸터 닫기 메뉴 클릭
			$('.custom_footer .com_btn_area.all_Menu .all_close').on('click', function() {
				$('.custom_footer .allmenu-wrapper').removeClass('on');
			});

			// 마케팅 배너
			$('.marketing_popup_box .btn_close').on('click', function() {
				$(this).parent().parent().addClass('hideHeight');
			});
		},
		customFixedLnb:function(){
			if($('body').find('div').hasClass('custom_fixed_lnb')){
				var lngOffset = $('.custom_fixed_lnb .lnb').offset().top - $('.popup_header').height() -10;
				$('.custom_fixed_lnb').scroll(function(){
					var _thisS = $(this).scrollTop();
					if(117 <= _thisS){
						$(this).addClass('custom_fixed_active');
						// $(this).find('.lnb').prependTo('.popup_content');
					}else{
						$(this).removeClass('custom_fixed_active');
						// $(this).find('.lnb').appendTo('.com_top_type02');
					};
				});
			}
		},
		anFm1002:function(){
			// $('.answer_wrap').each(function(e){
			// 	var $this = $(this),
			// 		_boxLength = $this.find('.answer_radio').length-1,
			// 		_idx = 0;
			// 	$this.find('input').each(function(event){
			// 		if($(this).prop('checked') == true){
			// 			_idx = $(this).closest('div').index();
			// 		};
			// 	});
			// 	$this.find('.answer_bar').css('width',100/_boxLength * _idx+'%');
			// });

			if($('body').find('div').hasClass('question_check_box')){
				var rows = [];
				$('.question_check_box').each(function(e){
					rows[e] = $(this).offset().top;
					rows[e] = rows[e] - rows[0];
				});
				$('.popup_content').scroll(function(e){
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
	}
	renewalJ.init();


	$(".popup_box").addClass('sliding');
});	

/*[v4.0] 추가************************************************/
const observer_header = function(){
	console.log('observer start!!!!!!!!!!');

	const header = document.querySelector('header');

	const stickyNav = function(entries){
		 console.log("Observer ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★ :"  + entries[0].isIntersecting);
		// console.log("여기 ********************************************************: " + entries[0].intersectionRatio);
		// console.log("여기 ********************************************************: " + entries[0].rootBounds);

		if(!entries[0].isIntersecting){
			// $(".com_tabmenu_type01, .com_tabmenu_type02, .lnb").addClass('fixed');

			$("nav.navi").addClass('fixed');
			// $("nav.navi").height($("nav.navi .inner").outerHeight());
			// setTimeout(function(){
			// 	$("nav.navi").height($("nav.navi .inner").outerHeight());
			// }, 300);
		}else{
			console.log('★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★ observer');

			// $(".com_tabmenu_type01, .com_tabmenu_type02, .lnb").removeClass('fixed');

			$("nav.navi").removeClass('fixed');
			// setTimeout(function(){
			// 	$("nav.navi").height($("nav.navi .inner").outerHeight());
			// }, 300);
		}
	}

	const observer = new IntersectionObserver(stickyNav, {
		root:null,
		rootMargin :'0px 0px 0px 0px',
		threshold:0 // 대상의 전체기준
	});
	observer.observe(header);
}

const observer_content = function(){
	const content = document.querySelector('#wrap');

	const mutation_cont = function(mutations){
		console.log('★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★ mutations : ' + mutations[0]);

		// nav aria-current page 위치
		if($("nav.navi").length > 0) {
			$("li", $("nav.navi ul")).each(function(i){
				if($("> a", $(this)).attr("aria-current")){
					console.log('★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★ : ' +  i);
					console.log('★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★ : ' +  $(this).offset().left);
	
					const _left = $(this).offset().left;
					const _curLeft = $("nav.navi .inner ul").scrollLeft();
	
					$("nav.navi .inner ul").stop().animate({
						scrollLeft:_curLeft + _left + 20
					}, 400);
				}
			});
		}
	}

	const observer = new MutationObserver(mutation_cont)

	let option = {
		attributes:true,
		childList:true,
		characterData:true
	}
	observer.observe(content, option);
}

const observer_allNavi = function(){
	const allNavi = document.querySelector('.allNavi nav .category_tab');
	

	const stickyNav = function(entries){
		//console.log('★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★ all navi: ' + entries[0].isIntersecting);

		if(!entries[0].isIntersecting){
			$(".allNavi nav .category_tab").addClass('fixed');
			
		}else{
			$(".allNavi nav .category_tab").removeClass('fixed');
		}
	}

	const observer = new IntersectionObserver(stickyNav, {
		root:null,
		rootMargin :'-51px 0px 0px 0px',
		threshold:1
	});

	observer.observe(allNavi);


	const io = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
		  	const $target = $(entry.target);

			if($(".category_tab").hasClass('fixed')){
				if (entry.isIntersecting) {//true
					//$target.classList.add("screening");
					$target.removeClass("through");
				} else {
					//$target.classList.remove("screening");

					if($target.offset().top + $target.outerHeight() > $(window).outerHeight()){

					}else{
						$target.addClass("through");
					}
				}
			}

			const idx = $(".allNavi nav > ul > li.through").last().index();

			if(idx >= 0){
				$.each($(".allNavi .category_tab li"), function(i,obj){
					$("> a", $(obj)).attr('aria-selected', false);
				});

				$(">a", $(".allNavi .category_tab li").eq(idx)).attr('aria-selected', true);
				scroll_allNavi(idx);
			}else{
				$.each($(".allNavi .category_tab li"), function(i,obj){
					$("> a", $(obj)).attr('aria-selected', false);
				});
			}
		});
	  }, {
		root:null,
		rootMargin :'-125px 0px 0px 0px',
		threshold:1
	  });

	  const $items = document.querySelectorAll(".allNavi nav > ul > li");
	  $items.forEach((item) => {
		io.observe(item);
	  });


}

let lastScroll = 0; //초기 스크롤 위치
let scrolling;
let scrollEnding = false;

$(document).ready(function(){
	/*obsever 상태체크 ************/
	//observer_header();
	//observer_content();
	if($(".allNavi").length > 0){
		observer_allNavi();
	}

	/****** observer_content ***********************/
	// nav aria-current page 위치
	if($("nav.navi").length > 0) {
		$("li", $("nav.navi ul")).each(function(i){
			if($("> a", $(this)).attr("aria-current")){
				//console.log('★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★ : ' +  i);
				//console.log('★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★ : ' +  $(this).offset().left);

				const _left = $(this).offset().left;
				const _curLeft = $("nav.navi .inner ul").scrollLeft();

				$("nav.navi .inner ul").stop().animate({
					scrollLeft:_curLeft + _left - 20 
				}, 400);
			}
		});
	}

	$('html, body').off('scroll.layout').on('scroll.layout', function(){
		let nowScroll = $(this).scrollTop();

		// console.log("현재 스크롤 : ++++++++++++++++++++++++++++++++++++++" + nowScroll);
		
		/* layout ----------------------------*/
		if(nowScroll > 1) {
			if($("nav.navi").length > 0) {
				$("nav.navi").addClass('scrolling');
			}
		}else{
			$("nav.navi").removeClass('scrolling');
		}

		if(nowScroll > lastScroll){//내려가는 방향
			//console.log('down scrolling!');
			$("aside.tabbar").removeClass('block');
		}else{// 올라오는 방향
			//console.log('up scrolling!');
			//$("#com_footer").addClass('block');
		}

		if($(this).scrollTop() == ($(document).outerHeight() - $(window).outerHeight())){
			$("aside.tabbar").addClass('block');
		}
		lastScroll = nowScroll;

		/*scrolling 상태체크 ************/
		if(!scrolling){
			// console.log('start scrolling!');
		}
		
		clearTimeout(scrolling);
		scrolling = setTimeout(()=>{
			// console.log('stop scrolling!');
			$("aside.tabbar").addClass('block');
			scrolling = undefined;
		}, 250);

		/*scroll ending check */
		if((nowScroll + $(window).height()) == $(document).height()){
			scrollEnding = true;
		}else{
			scrollEnding = false;
		}	

		//console.log('★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★ scrollEnding : ' + scrollEnding);

		/* 전체메뉴 ----------------------------*/
		/*
		if($(".allNavi").length > 0){
			$.each($(".allNavi nav > ul > li"), function(idx,item){
				let _top = $(item).position().top - $(".allNavi nav .category_tab").outerHeight();
				if(_top <= nowScroll){
					$.each($(".allNavi .category_tab li"), function(i,obj){
						$("> a", $(obj)).attr('aria-selected', false);
					});

					$(">a", $(".allNavi .category_tab li").eq(idx)).attr('aria-selected', true);
					scroll_allNavi(idx);
				}
			});
		}
		*/
	});	
});

$(document).off('click.dimmed').on('click.dimmed', '.btn_float', function(){
	if($(".dimmed").css('display') == 'block' || $(".dimmed_float").css('display') == 'block' ){
		enableScroll();
	}else{
		disableScroll();
	}
});

$(document).off('click.scrolltop').on('click.scrolltop', '.lnb a', function(){
	setTimeout(function(){
		$(window).scrollTop(0);
	},0);	
	lastScroll = 0;
});

var scroll_allNavi = function(idx){
	const obj = $(".allNavi nav .category_tab li").eq(idx);
	/*const selector =  $(".allNavi nav .category_tab .selector");*/
	const _left = $(obj).offset().left;
	const _curLeft = $('.allNavi nav .category_tab .scroller').scrollLeft();

	$(".allNavi nav .category_tab .scroller").stop().animate({
		scrollLeft:_curLeft + _left - 20
	}, 400);

	/*
	$(selector).css({
		'left' : _curLeft + _left + 'px',
		'width':  $(obj).outerWidth()  + 'px'
	});
	*/
}

$(document).off('click.allNavi').on('click.allNavi', '.allNavi nav .category_tab a', function(){
	const id = $(this).attr('href');
	const _top = $(id).position().top - $(".allNavi nav .category_tab").outerHeight();
	const $this = $(this);

	$('html, body').stop().animate({
		scrollTop : _top
	},300, function(){
		if(scrollEnding){
			console.log('★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★ scrollEnding click : ' + scrollEnding);
			$.each($(".allNavi .category_tab li"), function(i,obj){
				$("> a", $(obj)).attr('aria-selected', false);
			});

			$this.attr('aria-selected', true);
			scroll_allNavi($this.parent().index())
		}
	});
});


/*input*/
$(document).off('focus.input focusout.input').on('focus.input focusout.input', '.input input', function(e){
	//console.log(e.type);
	//console.log($(this).attr('readonly'));
	if(e.type == 'focusin'){
		if($(this).attr('readonly') == 'readonly'){
			//console.log(e.type);
		}else{
			$(this).parent().addClass('focus');
		}
		
	}else if(e.type == 'focusout'){
		$(this).parent().removeClass('focus');
	}
});

// 서비스가입 checkbox toggle
/* 25-01-20 체크 삭제로 스크립트 삭제
$(document).off('click.signupCheckbox').on('click.signupCheckbox', '.signup .formItem .checkbox', function(){
	if( $(this).find('input[name="check_toggle"]').prop('checked')){
		//checked
		$(this).closest('.formItem').addClass('active')
	}else{
		//unchecked
		$(this).closest('.formItem').removeClass('active')
	}
});
*/
/*addition_utll*/
$(document).off('click.additional_util').on('click.additional_util', '.additional_util > button', function(){
	const $list = $(this).next('div');
	$list.addClass('open');

	$("button", $list).click(function(){
		$list.removeClass('open');
	})
});


/*topbanner*/
//$(document).off('click.topbanner').on('click.topbanner', '.top_banner .btn_x', function(){
//	$(this).parent().remove();
//});

/*update*/
$(document).off('click.update').on('click.update', '.update .btn_update', function(){
	$(this).addClass('ing');
	setTimeout(()=>{$(this).removeClass('ing');}, 1000);
});

/*category tab*/
$(document).off('click.category_tab').on('click.category_tab', '.category_tab.has_btn .btn_fold', function() {
	const $tabList = $(this).siblings('ul');
	const isExpanded = $tabList.hasClass('open');

	$(this).attr('aria-expanded', !isExpanded);
	$tabList.toggleClass('open');
});

//서비스이용가이드
$(document).off('click.service_intro_acco').on('click.service_intro_acco', '.service_intro .btn_acco', function(){
	if($(this).closest('.board_box').hasClass('open')){
		//close
		$(this).closest('.board_box').removeClass('open');
		$(this).closest('.board_box').find('.cont').slideUp();
	}else{
		//open
		$(this).closest('.board_box').addClass('open');
		$(this).closest('.board_box').find('.cont').slideDown();
	}
});

/* 통합메인 */
// 플로팅 배너
$(function () {
	setTimeout(function(){
		$('.float_link').addClass('is_active');
		setInterval(function(){floatRolling()},5000);
	},1500);
	
	$(document).off('click.close').on('click.close', '.float_link button.close', function () {
		$(this).closest('.float_link').remove();
	});

	function floatRolling() {
		$('.float_link').removeClass('is_active').find('ul li:first').fadeOut(function(){
			$(this).appendTo($('.float_link ul')).fadeIn().closest('.float_link').addClass('is_active');
		});
	}
});

// 주요자산 변동내역
$(document).off('click.toggle_btn').on('click.toggle_btn', '.asset_sheet .toggle_btn', function() {
	const $list = $(this).siblings('ul');
	$list.toggleClass('open');

	if ($list.hasClass('open')) {
		$list.find('.cont').slideDown(200);
		$(this).text('전체닫기');
	} else {
		$list.find('.cont').slideUp(200);
		$(this).text('전체열기');
	}
});

/****복붙시작영역 ****/


/*tooltip 다시정의[개발]
/*
$(document).off('click.com_btn_info_tooltip').on('click.com_btn_info_tooltip', '.custom_tooltip .com_btn_info', function(){
	$('.com_ballon_type01').hide();
	$('.com_tooltip_type02 a > .arrow,.com_tooltip_type02 button > .arrow').hide();		
	$(this).parent().next('.com_ballon_type01').show()	
	$(this).next('.com_ballon_type01').show()			
	$(this).children('.arrow').show();		
});
$(document).off('click.com_btn_close_tooltip').on('click.com_btn_close_tooltip', '.custom_tooltip .com_btn_close', function(){
	$('.com_ballon_type01').hide();
	$('.com_tooltip_type02 a > .arrow,.com_tooltip_type02 button > .arrow').hide();			
});
*/

/*tooltip 닫기 후 focus 이동*/
$(document).off('click.close_tooltip').on('click.close_tooltip', '.custom_tooltip .com_btn_close', function(){
	let $parent = $(this).parents('.custom_tooltip');

	setTimeout(function(){
		$(".com_btn_info", $parent).focus();
	}, 0)
})

/* 약관 스크롤 애니 -scroll */
$(document).ready(function () {
	let $this = $('.terms_view');
	let $fullPop = $this.closest('.full_popup');
	let $popCont = $('.popup_content',$fullPop);

	$popCont.off('scroll.full_popup_scroll').on('scroll.full_popup_scroll', function(){
		let nowScroll = $popCont.scrollTop();
	
		if(!scrolling){
			console.log(nowScroll,$popCont.height(), $this.height());
		}
		
		/*scroll ending check */
		if($this){
			if((nowScroll + $popCont.height()) >= $this.height()){
				console.log('pop_scroll ending')
				scrollEnding = true;
				if (document.getElementsByClassName('.btn_agree_move') ) {
					$fullPop.find('.btn_agree_wrap').addClass('act');
					//check toast
					$fullPop.find('.error_message').addClass('on');
					setTimeout(function(){
						$fullPop.find('.error_message').removeClass('on').addClass('off');
					},2000)
				}
			}else{
				scrollEnding = false;
			}	
		}
		
	})

});
/* 약관 스크롤 애니 - click */
$(document).off('click.btn_agree_move_ani').on('click.btn_agree_move_ani', '.btn_agree_move', function(){
	let $this = $('.btn_agree_move');
	let $fullPop = $this.closest('.full_popup');
	let $popCont = $('.popup_content', $fullPop);
	let $termsView = $('.terms_view', $fullPop);

	if ($popCont) {
		let nowScroll = $popCont.scrollTop();
	
		if(!scrolling){
			console.log(nowScroll,$popCont.height(),$termsView.height());
		}
		
		if($this){
			if((nowScroll + $popCont.height()) >= $termsView.height()){
				scrollEnding = true;
				$this.parent('.btn_agree_wrap').addClass('act');
				//check toast
				$fullPop.find('.error_message').addClass('on');
				setTimeout(function(){
					$fullPop.find('.error_message').removeClass('on').addClass('off');
				},2000)
			}else{
				scrollEnding = false;
				var num = 1000;
				$popCont.animate({
					//scrollTop: $('.popup_content')[0].scrollHeight
					scrollTop: num
				}, 400);
				num = num + 1000
				console.log(num)
			}	
		}
	}
});

/* [개발대응] 약관 스크롤 애니 (as-is 수정한 소스 25-03-12 새로 만듬)
let _scrollT = 0;
let _scrollT_start = false;
let check_scrollBottom = function($grand){
	$('.popup_content', $grand).scroll(function(){

		if(($(this).scrollTop() + $(this).outerHeight()) >= $('.terms_wrap',$grand).outerHeight() + 50){
			$('.btn_move_hide', $grand).hide();
			$('.btn_move_hide', $grand).next().show();
		}else{
			$('.btn_move_hide', $grand).show();
			$('.btn_move_hide', $grand).next().hide();
		}
	})
}


$(document).off('click.btn_move_hide').on('click.btn_move_hide','.last_move .btn_move_hide', function(){
	const $grand = $(this).closest('.full_popup');

	if(!_scorllT_start){
		check_scrollBottom($grand)
	}

	_scrollT += $('.popup_content', $grand).height();
	$('.popup_content',$grand).animate({'scrollTop':_scrollT});

	_scrollT_start = true;
});
*/ 

// aria-live test js
// $(document).ready(function(){
// 	setTimeout(function(){
// 		$(".reckoning").each(function(i){
// 			if(i == 0){
// 				$(this).removeClass("hide");
// 				//$(this).text("테스트입니다.");
// 			}
// 		})
// 	}, 5000);

// 	setTimeout(function(){
// 		$(".reckoning").each(function(i){
// 			if(i == 0){
// 				// $(this).removeClass("hide");
// 				$(this).text("잘 썼습니다.");
// 			}
// 		})
// 	}, 10000);
// });


/* CHART - src/utils/canvas.js 로 이동 */
function drawdountChart(canvas){
	this.x , this.y , this.dpr,this.radius , this.lineWidth , this.strockStyle , this.from , this.to, this.strockStyle, this.circle, this.bgdraw, this.dir, this.lineCap = null;

	this.set = function( x, y, radius, counterclockwise, from, to, lineWidth, strockStyle, circle, dir, lineCap){
		this.x = x;
		this.y = y;
		this.dpr = 2;
		this.radius = radius;
		this.counterclockwise = counterclockwise;
		this.from=from;
		this.to= to;
		this.lineWidth = lineWidth;
		this.strockStyle = strockStyle; 
		this.circle = circle;   /*1 - HALF; 2 - fULL*/
		if(dir == null){
			this.dir = 1;
		}else{
			this.dir = dir;
		}
		if(lineCap == null){
			this.lineCap = "round";
		}else{
			this.lineCap = lineCap;
		}

		//console.log(" 시작방향이 어디야 : " + this.dir);
	}

	/*bg 원 그리기*/
	this.bgdraw = function(){
		canvas.beginPath();
		canvas.lineWidth = this.lineWidth;
		canvas.strokeStyle = this.strockStyle;
		canvas.lineJoin = "miter";
		canvas.lineCap = this.lineCap;

		canvas.arc(this.x, this.y , this.radius , this.from , this.to, this.counterclockwise);
		canvas.stroke();
	}

	/*데이타 원 그리기*/
	this.draw = function(data){
		this.bgdraw();
		
		//var numberOfParts = data.numberOfParts;
		var parts = data.parts.pt;
		var df = Math.PI * this.dir;

		for(var i = 0; i<parts.length; i++){
			canvas.beginPath();
			var colors = data.colors.cs[i];
			var gradient = null;

			gradient = canvas.createLinearGradient(this.x, this.y, df, df + (Math.PI * this.circle) * (parts[i] / 100));
			
			for(var j=0; j<colors.length; j++){
			   gradient.addColorStop(colors[j][0], colors[j][1]);
			}
			
			canvas.strokeStyle = gradient;
			canvas.arc(this.x, this.y, this.radius, df, df + (Math.PI * this.circle) * (parts[i] / 100), this.counterclockwise);			
			canvas.stroke();			
			/*
			console.log("시작점 " + i + " : " + df);
			console.log("끝점 " + i + " : " + Math.PI*(1+ (parts[i] / 100))); 
			*/

			df += (Math.PI * this.circle) * (parts[i] / 100) ;
		}
	}
}

function drawlineChart(lineChart) {
	this.canvas, this.dpr, this.width, this.height, this.name, this.last_x = null
	this.set = function(canvas, width, height, x, y, x_gap){/*캔버스, 캔버스W, 캔버스H, 이름, startX, startY, x좌표 간격*/
		this.canvas =  canvas;
		//this.dpr = window.devicePixelRatio;
		this.dpr = 2;
		this.width = width;
		this.height = height - 28;
		this.x = x;
		this.gap = x_gap;
		this.y = y;
	}

	this.draw = function(data){
		//lineChart.clearRect(0, 0, 300, 300);

		lineChart.beginPath();
		
		lineChart.lineWidth = 2;
		lineChart.setLineDash([3, 5]);
		lineChart.lineJoin = "bevel";
		lineChart.lineCap = "round";
		lineChart.strokeStyle = "#FFB301";
		//lineChart.scale(this.dpr, this.dpr);

		if($(this.canvas).attr("id") == 'staple_spend'){
			lineChart.moveTo(this.x * this.dpr, (this.height + 2 - (this.height * data[data.length - 1]) / 100) * this.dpr);
			this.last_x = this.x; 

			for(var i=0; i < data.length-1; i++){
				lineChart.lineTo((this.last_x + this.gap) * this.dpr, (this.height + 2 - (this.height * data[i]) / 100)*this.dpr);
				this.last_x = this.last_x + this.gap;
			}
		}else{
			lineChart.moveTo(this.x, (this.height - (this.height * data[0]) / 100) * 0.75);
			this.last_x = this.x;
			for(var i=1; i < data.length; i++){
				lineChart.lineTo(this.last_x + this.gap, (this.height - (this.height * data[i]) / 100)* 0.75);
				this.last_x = this.last_x + this.gap;
			}
		}

		lineChart.stroke();

		if($(this.canvas).attr("id") == 'staple_spend'){
			lineChart.beginPath();
			lineChart.setLineDash([3, 0]);
			lineChart.lineWidth = 2;

			if($(".up", $(this.canvas).prev()).index() == (data.length - 1)){
				lineChart.strokeStyle = "#35CDA8";
			}else{
				lineChart.strokeStyle = "#BCC2CA";
			}

			lineChart.fillStyle = "#fff";
			lineChart.arc(this.x * this.dpr, (this.height + 2.5 - (this.height * data[data.length - 1]) / 100) * this.dpr, 4, 0, Math.PI*2);
			lineChart.stroke();
			lineChart.fill();
			lineChart.closePath();

			this.last_x = this.x + this.gap;

			for(var i=0; i < data.length-1; i++){
				lineChart.beginPath();
				lineChart.setLineDash([3, 0]);
				lineChart.lineWidth = 2;
				if($(".up", $(this.canvas).prev()).index() == i){
					lineChart.strokeStyle = "#35CDA8";
				}else{
					lineChart.strokeStyle = "#BCC2CA";
				}
				lineChart.fillStyle = "#fff";
				lineChart.arc(this.last_x * this.dpr , (this.height + 2.5 - (this.height * data[i]) / 100)* this.dpr, 4, 0, Math.PI*2);
				lineChart.stroke();
				lineChart.fill();
				lineChart.closePath();

				this.last_x = this.last_x + this.gap;
			}
		}
	}
} 