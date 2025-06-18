/**
 * 각 화면 개발에 필요한 공통함수 중 JQuery 함수 스크립트.
 */
/**
 * 금액 애니메이트
 * @param string 금액 Animate SPAN ID
 * @param int    금액
 * @return money currency
 */
export const amountCountAnimate = (...arg) => {

    const tagId = arg[0]
    const tagValue = arg[1]

    $(document).ready(function() {
    
        //VueJS Method에 의한 값이 변경이 될 경우
        //JQuery로 인한 값을 인지를 못하기 때문에 다음과 같이 Tag와 값을 셋팅
        $('#' + tagId).attr('data-count',tagValue)

        if ($('#' + tagId).hasClass("counter"))
        {
            $('#' + tagId + '.counter').each(function(){
                var $this = $(this),
                countTo = $this.attr('data-count')

                $({countNum: $this.text()}).animate({
                    countNum:countTo
                },
                {
                    duration:1500,
                    easing:'easeOutCubic',
                    step:function(){
                        $this.text(addCommas(Math.floor(this.countNum)))
                    },
                    complete:function(){
                        $this.text(addCommas(this.countNum))
                    }            
                });
                function addCommas(nStr){
                    var dotIndex = nStr.toString().indexOf('.')
                    var tmpNumber = ''
                    if (dotIndex > -1)
                    {
                        tmpNumber = nStr.toString().substring(0, dotIndex)
                        tmpNumber = tmpNumber.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                        return tmpNumber + nStr.toString().substring(dotIndex)
                    }else{
                        return nStr.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                    }
                }
                
            });
            
        }
    })
}

/**
 * jQuery Event 처리 commonMixin에서 처리
 * @param 
 * @return 
 */
export const jQueryFncExcute = () => {

    $(document).ready(function() {
        // input line effect
        $('.com_input_type01 input').after('<div class="lineEF"></div>')
        $('.com_input_type01 label').has('em').parent().addClass('necessary')

        //INPUT focus
        $('.com_input_type01 input, .com_input_type03 input').focus(
            function(){
                let $this = $(this)
                
                if(window.device == "android" 
                    && ($this.parents(".full_popup").length > 0 || $this.parents(".slide_popup").length > 0)) {

                    setTimeout(function(){
                        let $parent  = $this.parents(".full_popup").length > 0 ? $this.parents(".full_popup") : $this.parents(".slide_popup")
                        let $content = $parent.children(".popup_content")
                        let $footer  = $parent.children(".popup_footer").length > 0 ? $parent.children(".popup_footer") : $parent.children(".bottom_box")

                        if($footer.length > 0) {
                            let currPosBottom = Number($this[0].getBoundingClientRect().bottom)
                            let footerPosTop = Number($footer[0].getBoundingClientRect().top)

                            let gap = footerPosTop - currPosBottom
                            let addSpace = 40   //금액표시영역만큼

                            if(gap < 20 ) {
                                $content[0].scrollTop = $content[0].scrollTop + Math.abs(gap) + addSpace
                            } else {
                                $content[0].scrollTop = $content[0].scrollTop - Math.abs(gap) + addSpace
                            }
                        }
                    }, 600)
                }
            }	
        )
        
        //TEXTAREA focus
        $('.com_textarea_type01 textarea').focus(
            function(){
                let $this = $(this)
                if(window.device === "android" 
                    && ($this.parents(".full_popup").length > 0 || $this.parents(".slide_popup").length > 0)) {
                    setTimeout(function(){
                        let $parent  = $this.parents(".full_popup").length > 0 ? $this.parents(".full_popup") : $this.parents(".slide_popup")
                        let $content = $parent.children(".popup_content")
                        let $footer  = $parent.children(".popup_footer").length > 0 ? $parent.children(".popup_footer") : $parent.children(".bottom_box")
 
                        if($footer.length > 0) {
                            let currPosBottom = Number($this[0].getBoundingClientRect().bottom)
                            let footerPosTop = Number($footer[0].getBoundingClientRect().top)

                            let gap = footerPosTop - currPosBottom

                            if(gap < 20 ) {
                                $content[0].scrollTop = $content[0].scrollTop + Math.abs(gap)
                            } else {
                                $content[0].scrollTop = $content[0].scrollTop - Math.abs(gap)
                            }
                        }
                    }, 600)
                }
            }	
        )      

        //TEXTAREA 
        $('.com_txtarea_type01').on('keyup' , function(e){
            let $this = $(this)
            $this.css('height','3rem');
            $this.height(this.scrollHeight);

            //ENTER, BACKSPACE
            if(e.keyCode === 13 || e.keyCode == 8) {
                setTimeout(function(){
                    let $parent  = $this.parents(".full_popup").length > 0 ? $this.parents(".full_popup") : $this.parents(".slide_popup")
                    let $content = $parent.children(".popup_content")
                    let $footer  = $parent.children(".popup_footer").length > 0 ? $parent.children(".popup_footer") : $parent.children(".bottom_box")

                    if($footer.length > 0) {
                        let currPosBottom = Number($this[0].getBoundingClientRect().bottom)
                        let footerPosTop = Number($footer[0].getBoundingClientRect().top)

                        let gap = footerPosTop - currPosBottom

                        if(gap < 0) {
                            $content[0].scrollTop = $content[0].scrollTop + Math.abs(gap)
                        } else {
                            $content[0].scrollTop = $content[0].scrollTop - Math.abs(gap)
                        }
                    }
                }, 80)
            }
        })

        //상품추천 배너 close
        $('.admin_banner_area .btn_close').on('click',function(){
			$('.admin_banner_area').fadeOut(400);
		});
        

        // 전세대출 클릭시 노출
        // $('.click_checkbox').on('change',function(){
        //     $('.hidden_area').show().animate({'padding-bottom':'5.6rem'},1000).slideDown('slow');
        // });
        $('.click_checkbox').on('click',function(){
            var chk = $('.click_checkbox input').is(":checked");
            if(chk){
                $(this).next('.hidden_area').slideDown('slow');
            }else{
                $(this).next('.hidden_area').slideUp('slow');
            }
        });

        //플로팅 팝오버 닫기
        $('.float_popover .btn_close.gray').on('click',function(){
            $('.float_popover_wrap .float_popover ').fadeOut(400)
            $('.float_popover_wrap').fadeOut(400)
            $('.new_float_popover_wrap .float_popover ').fadeOut(400);
			$('.new_float_popover_wrap').fadeOut(400);
        });

        // 토글 개별 컨트롤
        $('*[data-ui-toggle] *[aria-expanded]').on('click',function(evt){
            //이벤트 두번 타는거 방지
            evt.stopImmediatePropagation()

            var target = $(this).closest('*[data-ui-toggle]')
            //var targetType = target.attr('data-ui-toggle')
            if($(this).attr('aria-expanded') == 'true'){
                $(this).attr('aria-expanded', 'false')
                target.removeClass('active open')
                target.addClass('close')
            } else {
                target.removeClass('close')
                target.addClass('active')
                setTimeout(function(){
                    target.addClass('open')
                },100);
                $(this).attr('aria-expanded', 'true')
            }
        }); 

        // 팝오버 닫힘 - 지출진단
        $(document).on('click' , '.btn_close', function(){
			$(this).parents('.com_box_type01').fadeOut(500);
        });

        /*스크롤인터랙션 */
        $(".sticky-scroll #content").scroll(function(e){
		
            var scrollTop = $(e.target).scrollTop();
            if ( scrollTop > 55){
                $("#wrap").addClass("responsive");
                $('.select_date_wrap .select_date').prependTo('.content-view').addClass('move')
                //$('.select_dual_wrap .select_dual').prependTo('.content-view').addClass('move')
            }
            else{
                $("#wrap").removeClass("responsive");
                $('.content-view > .select_date').prependTo('.select_date_wrap').removeClass('move')
                //$('.content-view > .select_dual').prependTo('.select_dual_wrap').removeClass('move')
            }
        })
        $(".sticky-scroll:not('.type02') .popup_content").scroll(function(e){
            
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
        $(".sticky-scroll.type02 .popup_content").scroll(function(e){
            
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

        // 인포 툴팁
        $('.com_ballon_type01').hide();
		$('.com_tooltip_type02 a > .arrow,.com_tooltip_type02 button > .arrow').hide();
		$('.com_btn_info').on('click',function(){
            $('.com_ballon_type01').hide();
			$('.com_tooltip_type02 a > .arrow,.com_tooltip_type02 button > .arrow').hide()

			$(this).parent().next('.com_ballon_type01').show()	
			$(this).next('.com_ballon_type01').show()			
			$(this).children('.arrow').show();
		});
		$('.com_ballon_type01 .com_btn_close').on('click',function(){
			$('.com_ballon_type01').hide();
			$('.com_tooltip_type02 a > .arrow,.com_tooltip_type02 button > .arrow').hide();
        });

        /////////////////////////////////////////
        ////// TOBE 추가 부분
        /////////////////////////////////////////
        /*
		    영업점명을 입력하세요 부분의 글자 입력시 x 버튼 활성화
		    입력 후 x 버튼 클릭시 글자 삭제
	    */
		$('.inputClear').each(function(){
            var $input = $(this);
            var $clearBtn = $input.siblings('.com_btn_delete');

            $input.on('keyup', function() {
                if($input.val().length == 0) {
                    $($clearBtn).removeClass('btnDeleteShow');
                } else {
                    $($clearBtn).addClass('btnDeleteShow');
                }
            })

            $clearBtn.on('click', function() {
                $(this).removeClass('btnDeleteShow');
                $input.val(''); 
                $input.focus();
            });

        });
        
        /**
         * 메인 화면 스크롤 기능
         */
        var lastScrollTop = 0;
        $('.mainScroll').on('scroll', function() {
            var topMenu      = $('.topMenu')
            var main         = $('.main')
            var footer       = $('.mainFooter')

            var scrollTop    = $(this).scrollTop()
            var scrollHeight = $(this).prop('scrollHeight') // 스크롤 포함 영역의 높이(스크롤로 감춰진 곳 계산 0)
            var innerHeight  = $(this).innerHeight()        // 현재 보이는 영역의 높이(스크롤로 감춰진 곳은 계산 x)
            // 신로직 start
            // console.log('scrollTop:' + scrollTop + ', lastScrollTop: ' + lastScrollTop + ', scrollHeight: ' + scrollHeight + ', scroll+height: ' + (scrollTop + innerHeight))
            
            if (scrollTop <= 0 ) { // 스크롤 맨 위
                topMenu.removeClass('topMenuHide');
                main.removeClass('responsive');
                footer.addClass('block');
            } else if (scrollHeight - 1 <= (scrollTop + innerHeight)) { // 스크롤 맨 아래
                topMenu.addClass('topMenuHide');
                main.addClass('responsive');
                footer.removeClass('block');
            } else if (scrollTop > lastScrollTop) { // 스크롤 내린다
                topMenu.addClass('topMenuHide');
                main.addClass('responsive');
                footer.removeClass('block');
                // adminPop.addClass('block');
            } else { // 스크롤 올린다
                main.removeClass('responsive');
                footer.addClass('block');
            }
            
            // if (scrollTop + innerHeight >= scrollHeight - 1) {
            //     $('#wrap .main').addClass('responsive');
            // }
            // 신로직 end

            // 구로직 start
            /*
            if (scrollTop <= 0 ) {
                topMenu.removeClass('topMenuHide');
                main.removeClass('responsive');
                footer.addClass('block');
            } else if ( scrollTop > lastScrollTop ) {
                topMenu.addClass('topMenuHide');
                main.addClass('responsive');
                footer.removeClass('block');
            } else if ( scrollTop < lastScrollTop ) {
                if(scrollHeight === (scrollTop + innerHeight)) {
                    footer.removeClass('block');
                } else {
                    footer.addClass('block');
                }
            } else {
                topMenu.addClass('topMenuHide');
                main.addClass('responsive');
                footer.removeClass('block');
            }
            */
            // 구로직 end
            
            lastScrollTop = scrollTop; // 스크롤 올리는 부분 감지
        });

        /**
         * 인증프로세스 약관 화면 스크롤 기능
         * -- 약관 하단 버튼이 '스크롤 하단 이동 버튼'과 '다음 프로세스 이동 버튼'으로 구분되어있을 경우 사용
         * 조건)    class="popup_content" div에 id="term_scroll" 추가
         *          클릭 할 버튼 내 id="term_btn" 추가
         * -- 화면별로 jQueryFncExcute 재호출 필요
         */
        var _scrollPos = 0

        $("[id='term_btn']").on("click", function(){
            if($(".popup_footer").hasClass("last_move")) {
                let $this = $(this)
                let $parent  = $this.parents(".full_popup").length > 0 ? $this.parents(".full_popup") : $this.parents(".slide_popup")
                let $content = $parent.children(".popup_content")
                let $header = $parent.children(".popup_header")
                let $conIdx = $content.length-1
                
                var $btnBox = $('.last_move'),
                    $btnBoxIdx = $btnBox.length - 1,
                    $btnBoxSelector = $($btnBox[$btnBoxIdx]),   // 퍼블 파일과 달리 팝업을 복수 오픈 시 대응
                    _contH = $content.outerHeight(true),
                    _headH = $header.height(),
                    _scrollT = $content[$conIdx].scrollTop
                
                console.log(_contH, $btnBoxSelector.height(), _headH)
                _scrollPos += _contH - $btnBoxSelector.height() - _headH;
                console.log(_scrollPos, _scrollT)

                $content.animate({'scrollTop' : _scrollPos})

            }
        })

        $("[id='term_scroll']").on("scroll", function(){
            let $this = $(this)
            let $parent  = $this.parents(".full_popup").length > 0 ? $this.parents(".full_popup") : $this.parents(".slide_popup")
            let $content = $parent.children(".popup_content")
            let $conIdx = $content.length-1
            let $viewBox = $content.find('.terms_view')

            var _scrollH = $content[$conIdx].scrollHeight,
                _clientH = $content[$conIdx].clientHeight,
                _scrollT = $content[$conIdx].scrollTop,
                $btnBox = $('.last_move'),
                $btn = $btnBox.find('.btn')

            // console.log("_scrollT >>>> ", _scrollT, " _clientH >>>> ", _clientH, " _scrollH >>>> ", _scrollH)
            if(_scrollT + _clientH >= _scrollH - 20) {
                // console.log("touch!!")
                $btn.show();
                $btnBox.find('.btn_move_hide').hide();
                $viewBox.find('.error_message').addClass('on');
                setTimeout(function(){$viewBox.find('.error_message').removeClass('on').addClass('off')},2000);
            }
        })

        if($('body').find('div').hasClass('custom_fixed_lnb')){
            let lngOffSet = $(".custom_fixed_lnb .lnb").offset().top - $('.popup_header').height();
        
            $(".custom_fixed_lnb").on("scroll", function() {
                let _thisS = $(this).scrollTop();
                
                if(lngOffSet <= _thisS) {
                    $(this).addClass("custom_fixed_active")
                } else {
                    $(this).removeClass("custom_fixed_active")
                }
            })
        }
    })
}

/*
* 웹접근성 처리. commonMixin updated 에서 호출
*/
export const jQueryWebAccessibility = (...arg) => {
    $(document).ready(function() {

        if (arg[0] === 0) //페이지 일 경우
        {
            /* 라디오버튼 접근성 */
            let $btnRadios      = $('.btn_radio input[type=radio]')
            let $btnRadioLabels = $('.btn_radio label')
            if($btnRadios.length > 0 ) {
                $btnRadios.each(function() {
                    if($(this).attr('aria-hidden') === undefined ) {
                        $(this).attr('aria-hidden', true)
                    }
                })
                $btnRadioLabels.each(function() {
                    if($(this).attr('role') === undefined || $(this).attr('aria-checked') === undefined ) {
                        $(this).attr({'role':'radio', 'aria-checked':false})
                    }
                })
            }

            /* 서브탭 라디오버튼 접근성 */
            let $cmmRadios      = $('.cmm_radio input[type=radio]')
            let $cmmRadioLabels = $('.cmm_radio label')
            if($cmmRadios.length > 0 ) {
                $cmmRadios.each(function() {
                    if($(this).attr('aria-hidden') === undefined ) {
                        $(this).attr('aria-hidden', true)
                    }
                })
                $cmmRadioLabels.each(function() {
                    if($(this).attr('role') === undefined || $(this).attr('aria-checked') === undefined ) {
                        $(this).attr({'role':'radio', 'aria-checked':false})
                    }
                })
            }

            /* 체크박스 접근성 */
            let $btnChecks      = $('.btn_chk input[type=checkbox]')
            let $btnCheckLabels = $('.btn_chk label')
            if( $btnChecks.length > 0 ) {

                $btnChecks.each(function() {
                    if($(this).attr('aria-hidden') === undefined ) {
                        $(this).attr('aria-hidden', true)
                    }
                })
                $btnCheckLabels.each(function() {
                    if($(this).attr('role') === undefined || $(this).attr('aria-checked') === undefined ) {
                        $(this).attr({'role':'radio', 'aria-checked':false})
                    }
                })
            }

        } else { //팝업일 경우

            let modalId = 'modal_' + arg[0]

            /* 라디오버튼 접근성 */
            let $btnRadios      = $("#" + modalId ).find('.btn_radio input[type=radio]')
            let $btnRadioLabels = $("#" + modalId ).find('.btn_radio label')
            if($btnRadios.length > 0) {
                $btnRadios.each(function() {
                    if($(this).attr('aria-hidden') === undefined ) {
                        $(this).attr('aria-hidden', true)
                    }
                })
                $btnRadioLabels.each(function() {
                    if($(this).attr('role') === undefined || $(this).attr('aria-checked') === undefined ) {
                        $(this).attr({'role':'radio', 'aria-checked':false})
                    }
                })
            }

            /* 서브탭 라디오버튼 접근성 */
            let $cmmRadios      = $("#" + modalId ).find('.cmm_radio input[type=radio]')
            let $cmmRadioLabels = $("#" + modalId ).find('.cmm_radio label')
            if($cmmRadios.length > 0) {
                $cmmRadios.each(function() {
                    if($(this).attr('aria-hidden') === undefined ) {
                        $(this).attr('aria-hidden', true)
                    }
                })
                $cmmRadioLabels.each(function() {
                    if($(this).attr('role') === undefined || $(this).attr('aria-checked') === undefined ) {
                        $(this).attr({'role':'radio', 'aria-checked':false})
                    }
                })
            }


            /* 체크박스 접근성 */
            let $btnChecks      = $("#" + modalId ).find('.btn_chk input[type=checkbox]')
            let $btnCheckLabels = $("#" + modalId ).find('.btn_chk label')
            if($btnChecks.length > 0 ) {
                $btnChecks.each(function() {
                    if($(this).attr('aria-hidden') === undefined ) {
                        $(this).attr('aria-hidden', true)
                    }
                })
                $btnCheckLabels.each(function() {
                    if($(this).attr('role') === undefined || $(this).attr('aria-checked') === undefined ) {
                        $(this).attr({'role':'radio', 'aria-checked':false})
                    }
                })
            }

            // 모달 팝업 버튼 role="button" 추가(접근성적용)
            let $btnBacks     = $("#" + modalId ).find('.full_popup .btn_back')
            if($btnBacks !== undefined && $btnBacks.length > 0 ) {
                $btnBacks.each(function() {
                    if($(this).attr('role') === undefined ) {
                        $(this).attr('role', "button")
                    }
                })
            }

            let $btnCloses    = $("#" + modalId ).find('.full_popup .btn_close')
            if($btnCloses !== undefined && $btnCloses.length > 0 ) {
                $btnCloses.each(function() {
                    if($(this).attr('role') === undefined ) {
                        $(this).attr('role', "button")
                    }
                })
            }

            let $footerAnchor = $("#" + modalId ).find('.popup_footer > div > a')
            if($footerAnchor !== undefined && $footerAnchor.length > 0 ) {
                $footerAnchor.each(function() {
                    if($(this).attr('role') === undefined ) {
                        $(this).attr('role', "button")
                    }
                })
            }

            var $bottomAnchor = $("#" + modalId ).find('.bottom_box > div > a')
            if($bottomAnchor !== undefined && $bottomAnchor.length > 0 ) {
                $bottomAnchor.each(function() {
                    if($(this).attr('role') === undefined ) {
                        $(this).attr('role', "button")
                    }
                })
            }
        }

        /* 라디오버튼/서브탭 라디오버튼 접근성 클릭이벤트 */
        $('.btn_radio label, .cmm_radio label').on('click',function(evt){
            evt.stopImmediatePropagation();

            let $this = $(this)
            $this.parents().siblings().find('label').attr('aria-checked', false)
            $this.attr('aria-checked', true)
        });

        // /* 체크박스 클릭한 것만 true 처리 */
        $('.btn_chk label').on('click',function(evt){
            evt.stopImmediatePropagation();
            var chk = $(this).prev($('input[type=checkbox]')).is(':checked');
            if(!chk){
                $(this).attr('aria-checked', true);
            }else{
                $(this).attr('aria-checked', false);
            }
        });

        if ($('.list_type_01 li a') !== undefined && $('.list_type_01 li a').attr('role') === undefined) {
            $('.list_type_01 li a').attr('role', 'button')
        }
        if ($('.list_type_02 li a') !== undefined && $('.list_type_02 li a').attr('role') === undefined) {
            $('.list_type_03 li a').attr('role', 'button')
        }
        if ($('.list_type_03 li a') !== undefined && $('.list_type_03 li a').attr('role') === undefined) {
            $('.list_type_03 li a').attr('role', 'button')
        }
        if ($('.terms_list.view_link_list2 a') !== undefined && $('.terms_list.view_link_list2 a').attr('role') === undefined) {
            $('.terms_list.view_link_list2 a').attr('role', 'button')
        }
    })
}

/**
 * 공통달력 Clear
 * @param 
 * @return 
 */
export const cmmCalendarClear = () => {
    $(".cal_tb tbody tr").removeClass('off');
    $(".cal_tb tbody tr").removeClass('active');
    $(".cal_tb tbody tr td").removeClass('active')
    $('.cal_tb').removeClass('clear')
    $('.calendar_open_wrap .view-btn').hide();
    $('.calendar_wrap section').removeClass('calendar_box')
    $(".cal_tb tbody tr td a").attr('title','') //웹접근성 2021.11.19
}

export const cmDatePicker = (...arg) => {
    console.log('cmDatePicker', arg)
    const tagId = arg[0]
    //VueJS Method에 의한 값이 변경이 될 경우
    //JQuery로 인한 값을 인지를 못하기 때문에 다음과 같이 Tag와 값을 셋팅
    //$('#' + tagId).datepicker()
    $(document).ready(function() {
        $('#' + tagId).on('click',function(evt){
            evt.stopImmediatePropagation()
			$('#' + tagId).datepicker().datepicker("show")
		});
    })
}

/**
 * 메인 금융생활 탭 게이지 차트
 * 
 * @param {*} counter 
 */
export const mainHalcircleClickFn = (counter) => {
    halfCircleFn(counter);
    circle01();

    /*
    let waveIdx = $('.slideBox').slick('slickCurrentSlide');
    if (waveIdx == 2) {
        halfCircleFn(counter);
        circle01();
    } else {
        // halfCircleFn(0);
        // circle02();
        halfCircleFn(counter);
        circle01();
    }
    */

    $('.main .mainScroll .slideBox').on('swipe',function(){
        // let waveIdx = $('.slideBox').slick('slickCurrentSlide');
        let btnId = $('.main .subMenuList .slick-slide.is-active').attr("id");
        if (btnId == 'menu02') {
            halfCircleFn(counter);
            circle01();
        } else {
            halfCircleFn(0);
            circle02();
        }
    });

    var btn = $(".main .subMenu .subMenuList button[type='button']"); // 자산, 지출, 금융생활, 제휴서비스
    btn.each(function(i){
        btn.eq(i).on('click', function() {
            let btnId = $(this).attr("id");
            if(btnId == 'menu02'){
                halfCircleFn( counter ); // 매인 > 금융생활 halfCircle 그래프
                circle01();
            } else {
                halfCircleFn( 0 ); // 값 0으로 초기화
                circle02();
            }
        });
    });

    // 매인 > 금융생활 halfCircle 그래프
    function halfCircleFn( counter ){
        var counter2 = counter > 100 ? 100 : counter; // 100 초과시 그냥 100
        var needle = $('.main .graphAreaBox .needle'); // 바늘
        var circlePink = $('.main .graphAreaBox .circlePink'); // 채워지는 데이터(핑크)
        var smailCircle = $('.main .graphAreaBox .smailCircle'); // 회색 배경
        needle.css( 'transform', 'rotateZ(' +(1.8*counter2+(-90)) + 'deg)');
        circlePink.css( 'transform', 'rotateZ(' + (1.8*counter2) + 'deg)' );
        smailCircle.html( '<span><span class="num">'+ counter + '</span>%</span>');
    }

    // 0 ~ 100 시작
    function circle01 () {
        var circlePink = $('.main .graphAreaBox .circlePink'); // 채워지는 데이터(핑크)
        var needle = $('.main .graphAreaBox .needle'); // 바늘
        circlePink.css('transition', 'all .6s');
        needle.css('transition', 'all .6s');
    }

    // 100 ~ 0 종료
    function circle02 () {
        var circlePink = $('.main .graphAreaBox .circlePink'); // 채워지는 데이터(핑크)
        var needle = $('.main .graphAreaBox .needle'); // 바늘
        circlePink.css('transition', 'all 1.5s');
        needle.css('transition', 'all 1.5s');
    }
}

export const infoToolipHandler = () => {
    // 인포 툴팁
    $('.com_ballon_type01').hide();
    $('.com_tooltip_type02 a > .arrow,.com_tooltip_type02 button > .arrow').hide();
    $('.com_btn_info').on('click',function(){
        $('.com_ballon_type01').hide();
        $('.com_tooltip_type02 a > .arrow,.com_tooltip_type02 button > .arrow').hide()

        $(this).parent().next('.com_ballon_type01').show()	
        $(this).next('.com_ballon_type01').show()			
        $(this).children('.arrow').show();
    });
    $('.com_ballon_type01 .com_btn_close').on('click',function(){
        $('.com_ballon_type01').hide();
        $('.com_tooltip_type02 a > .arrow,.com_tooltip_type02 button > .arrow').hide();
    });
}