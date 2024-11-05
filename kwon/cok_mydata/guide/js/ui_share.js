
var _gnbFnc = {
	init : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		var $gnbObj = this;
		$('#kmsHeader .btn-gnb').off('click.share').on('click.share',function(){
			var $btnPageTitle = $('#kmsHeader .page-title button');
			var $subMenu = $('.sub-menu-wrap', $parentTgt);
			$(this).attr('aria-expanded', 'true');
			if($subMenu.is(':visible')) $btnPageTitle.trigger('click.share');
			$gnbObj.gnbOpen();
		});
		$('.gnb-wrap .btn-gnb-close', $parentTgt).off('click.share').on('click.share',function(){
			$(this).attr('aria-expanded', 'false');
			$gnbObj.gnbClose();
		});
		_gnbFnc.subGnbOpen();
	},
	
	gnbOpen : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		var $gnbWrap = $('.gnb-wrap', $parentTgt);
		var $gnbInner = $('.inner', $gnbWrap);
		var $gnbClose = $('.btn-gnb-close', $gnbWrap);
		var $gnbMenu = $('.menu-list-box', $gnbWrap);
		var $depth2 = $('.sub-gnb-box.lv2', $gnbMenu);
		var $depth3 = $('.sub-gnb-box.lv3', $gnbMenu);
		var $depth4 = $('.sub-gnb-box.lv4', $gnbMenu);

		this.setGnb();
		$gnbInner.attr('tabindex', '0');
		$gnbWrap.prepend('<div class="accessbilityLast offscreen" tabindex="0" aria-hidden="true"></div>');
		$gnbWrap.append('<div class="accessbilityFirst offscreen" tabindex="0" aria-hidden="true"></div>');
		$('.accessbilityFirst', $gnbWrap).off('focusin.share').on('focusin.share',function() {
			$gnbInner.focus();
		});
		$('.accessbilityLast', $gnbWrap).off('focusin.share').on('focusin.share',function() {
			$gnbClose.focus();
		});

		$('body').addClass('pop');
		$gnbWrap.css({
			'left' : '0',
			'opacity' : '1'
		}).attr('aria-hidden', 'false');
		$gnbInner.focus();

	},
	gnbClose : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		var $gnbWrap = $('.gnb-wrap', $parentTgt);
		var $gnbClose = $('.btn-gnb-close', $gnbWrap);
		var $gnbMenu = $('.menu-list-box', $gnbWrap);
		var $depth2 = $('.sub-gnb-box.lv2', $gnbMenu);
		var $depth3 = $('.sub-gnb-box.lv3', $gnbMenu);
		var $depth4 = $('.sub-gnb-box.lv4', $gnbMenu);

		$('body').removeClass('pop');
		// $gnbWrap.prepend('<div class="accessbilityLast offscreen" tabindex="0" aria-hidden="true"></div>');
		// $gnbWrap.append('<div class="accessbilityFirst offscreen" tabindex="0" aria-hidden="true"></div>');
		$('.accessbilityLast', $gnbWrap).remove();
		$('.accessbilityFirst', $gnbWrap).remove();
		$gnbWrap.css({
			'left' : '100%',
			'opacity' : '0'
		}).attr('aria-hidden', 'true');
	},
	setGnb : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		var $gnbWrap = $('.gnb-wrap', $parentTgt);
		var $gnbMenu = $('.menu-list-box', $gnbWrap);
		var $subDepth = $('.sub-gnb-box', $gnbMenu);
		// var $depth2 = $('.sub-gnb-box.lv2', $gnbMenu);
		// var $depth3 = $('.sub-gnb-box.lv3', $gnbMenu);
		// var $depth4 = $('.sub-gnb-box.lv4', $gnbMenu);
		var $allItems = $('a', $gnbMenu);
		var $subItems = $('a', $subDepth);
		
		$allItems.each(function() {
			var $this = $(this);
			var $parent = $this.parent();
			var $next = $this.next();

			if($parent.hasClass('active')) {
				$next.show();
			}
		});
		$subItems.each(function() {
			var $this = $(this);
			var $next = $this.next();

			if($next.length) {
				$this.addClass('fold');
			}
		});
	},
	subGnbOpen : function($parentTgt){
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		$('.gnb-wrap .menu-list-box a', $parentTgt).off('click.share').on('click.share',function(e){
			var $this = $(this);
			var $parent = $this.parent();
			var $thisWrap = $parent.parent();
			var $thisSub = $this.next();
			//if($thisSub.length) e.preventDefault();

			if($thisSub.is(':hidden')) {
				$('> li', $thisWrap).removeClass('active').find('.sub-gnb-box').hide();
				$parent.addClass('active');
				$thisSub.show();
			}
		});
	}
}

var _globalSearchFnc = {
	clickItem : undefined,
	init : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		var $searchObj = this;
		$('.btn-gnb-search', $parentTgt).off('click.share').on('click.share', function() {
			// _gnbFnc.gnbClose();
			$searchObj.open($(this), $parentTgt);
		});
		$('.global-search-wrap .btn-search-close', $parentTgt).off('click.share').on('click.share', function() {
			$searchObj.close($parentTgt);
		});
		$('.global-search-wrap .inp-global-search input', $parentTgt).off('change.share keyup.share paste.share focusin.share').on('change.share keyup.share paste.share focusin.share', function() {
			var $this = $(this);
			var $thisVal = $this.val();
			var $wrap = $this.closest('.global-search-wrap');
			var $autoCompleteWrap = $('.auto-complete-search', $wrap);
			var $recentlyWrap = $('.recently-search-box', $wrap);

			if($thisVal === '') {
				$autoCompleteWrap.hide().attr('aria-hidden', 'true');
				$recentlyWrap.show().attr('aria-hidden', 'false');
			}else{
				$autoCompleteWrap.show().attr('aria-hidden', 'false');
				$recentlyWrap.hide().attr('aria-hidden', 'true');
			}

		});
	},
	open : function(clickItem, $parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		this.clickItem = $(clickItem);
		var $btnOpen = this.clickItem;
		var $searchWrap = $('.global-search-wrap', $parentTgt);
		var $innerSearch = $('.inner-recently-search', $searchWrap);
		var $btnClose = $('.btn-search-close', $searchWrap);
		var $autoCompleteWrap = $('.auto-complete-search', $searchWrap);
		var $recentlyWrap = $('.recently-search-box', $searchWrap);

		$autoCompleteWrap.attr('aria-hidden', 'true');
		$recentlyWrap.attr('aria-hidden', 'false');
		$innerSearch.attr('tabindex', '0');
		$searchWrap.prepend('<div class="accessbilityLast offscreen" tabindex="0" aria-hidden="true"></div>');
		$searchWrap.append('<div class="accessbilityFirst offscreen" tabindex="0" aria-hidden="true"></div>');

		$btnOpen.attr('aria-expanded', 'true');
		$searchWrap.show().attr('aria-hidden', 'false');
		$innerSearch.focus();

		$('.accessbilityFirst', $searchWrap).off('focusin.share').on('focusin.share',function() {
			$innerSearch.focus();
		});
		$('.accessbilityLast', $searchWrap).off('focusin.share').on('focusin.share',function() {
			$btnClose.focus();
		});
	},
	close : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		var $searchWrap = $('.global-search-wrap', $parentTgt);
		var $innerSearch = $('.inner-recently-search', $searchWrap);

		$searchWrap.hide().attr('aria-hidden', 'true');
		$('.accessbilityFirst', $searchWrap).remove();
		$('.accessbilityLast', $searchWrap).remove();
		this.clickItem.attr('aria-expanded', 'false').focus();
	}
}

var _goToTopFnc = {
	init : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		var $objGotoTop = this;

		$('.btn-go-top', $parentTgt).off('click.share').on('click.share',function() {
			$('html, body').animate({scrollTop : 0}, 300);
		});

		if($('.btn-go-top', $parentTgt).length) {
			$('.btn-go-top', $parentTgt).each(function() {
				var $this = $(this);
				$objGotoTop.set($this);
			});
		}
	},
	set : function(target) {
		var $btnToTop = $(target);
		var $btnStickyBot = $('#kmsContents .btn-page-wrap .sticky-bottom');
		if($btnStickyBot.length) {
			$btnToTop.css({'bottom' : '72px'});

			$(window).scroll(function() {
				if($btnStickyBot.hasClass('sticky-active')) {
					$btnToTop.css({'bottom' : '72px'});
				}else{
					$btnToTop.css({'bottom' : '18px'});
				}
			});
		}
	}
}

var _subMenuSelect = {
	init : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		var $subMenuSelect = this;
		var $subNavi = $('.sub-menu-wrap', $parentTgt);
		$('#kmsHeader .page-title > button', $parentTgt).off('click.share').on('click.share', function() {
			if($subNavi.is(':hidden')) {
				$subMenuSelect.open();
			}else{
				$subMenuSelect.close();
			}
		});
	},
	open : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		var $subMenuSelect = this;
		var $subNavi = $('.sub-menu-wrap', $parentTgt);
		var $naviList = $('.sub-menu-list', $subNavi);
		var $btnSubList = $('#kmsHeader .page-title > button');
		var $btnGnb = $('#kmsHeader .btn-gnb');


		$btnSubList.attr('aria-expanded', 'true');
		$subNavi.prepend('<div class="layerMask" aria-hidden="true"></div>');
		$naviList.attr('tabindex', '0');
		$naviList.before('<div class="accessbilityFirst offscreen" tabindex="0" aria-hidden="true"></div>');
		$naviList.after('<div class="accessbilityLast offscreen" tabindex="0" aria-hidden="true"></div>');

		$('.accessbilityFirst', $subNavi).off('focusin.share').on('focusin.share',function() {
			$subMenuSelect.close();
			$btnSubList.focus();
		});
		$('.accessbilityLast', $subNavi).off('focusin.share').on('focusin.share',function() {
			$subMenuSelect.close();
			$btnGnb.focus();
		});
		$('.layerMask', $subNavi).off('click.share').on('click.share',function() {
			$subMenuSelect.close();
		});
		$subNavi.show();
		$naviList.focus();
		$('body').addClass('mask');
	},
	close : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		var $subNavi = $('.sub-menu-wrap', $parentTgt);
		var $btnSubList = $('#kmsHeader .page-title > button');

		$btnSubList.attr('aria-expanded', 'false');
		$('body').removeClass('mask');
		$('.layerMask', $subNavi).remove();
		$('.accessbilityFirst', $subNavi).remove();
		$('.accessbilityLast', $subNavi).remove();
		$subNavi.hide();
	}
}

var _inpFocusFnc = {
	init : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		$('.inp-txt, .inp-pw, .inp-search, .inp-unit, .inp-date', $parentTgt).off('click.share').on('click.share', function(e) {//인풋텍스트 아닌 영역 클릭시 삭제 버튼 hide처리
			var $inpTxt = $('.inp-txt, .inp-pw, .inp-search, .inp-unit, .inp-date', $parentTgt);
			var $target = $(e.target);
			if(!$target.hasClass('inp-txt') && !$target.hasClass('inp-pw') && !$target.hasClass('inp-search') && !$target.hasClass('inp-unit')) {
				$inpTxt.removeClass('del-show');
			}
		});
		
		$('.inp-txt, .inp-pw, .inp-search, .inp-unit, .inp-date', $parentTgt).off('click.share').on('click.share', function(e) {e.stopPropagation();});
		$('.inp-txt input, .inp-pw input, .inp-search input, .inp-unit input, .inp-date input', $parentTgt).off('change.share keyup.share paste.share focusin.share').on('change.share keyup.share paste.share focusin.share', function() {
			var $this = $(this);
			var $val = $this.val();
			var $del = $this.next().length && $this.next().hasClass('del') ? $this.next() : undefined;

			// 삭제버튼 초기화
			$('.inp-txt, .inp-pw, .inp-search, .inp-unit, .inp-date', $parentTgt).removeClass('del-show');

			if(!$del) {
				$this.after('<button type="button" class="del"><span class="offscreen">삭제</span></button>');
				$del = $this.next();
				$del.off("click.share").on("click.share",function(){
					$this.val("");
					$this.parent().removeClass('del-show');
					$this.focus();
					$(this).hide();
				});
			}
			if($val == '') {
				$this.parent().removeClass('del-show');
				$del.hide();
			}else{
				$this.parent().addClass('del-show');
				$del.show();
			}
		});

		$('.inp-txt .del, .inp-pw .del, .inp-search .del, .inp-unit .del, .inp-date .del', $parentTgt).off("click.share").on("click.share",function(){
			var $this = $(this);
			$this.prev().val("");
			$this.parent().removeClass('del-show');
			$this.focus();
			$(this).hide();
		});
		
		$(document).off("click.inputdel focusin.inputdel").on("click.inputdel focusin.inputdel",function(e){
			var $target = $(e.target);
			if($target.hasClass(".del") || $target.parent().children(".del").length)
				return;
			$('.inp-txt .del, .inp-pw .del, .inp-search .del, .inp-unit .del, .inp-date .del', $parentTgt).parent().removeClass('del-show');
			$('.inp-txt .del, .inp-pw .del, .inp-search .del, .inp-unit .del, .inp-date .del', $parentTgt).hide();
		});
	}
}

var _calendarFnc = {
	init : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		$('.inp-sys-date', $parentTgt).each(function() {
			var $this = $(this);
			var $inp = $('input[type="date"], input[type="month"], input[type="datetime-local"], input[type="time"]', $this);
			var $inpVal = $inp.val();
			var $viewer = $('.date-viewer', $this);
			var $setDate = $('.setDate', $viewer);
			var $placeholder = $('.date-placeholder', $viewer);

			if($inpVal) {
				$setDate.remove();
				$viewer.append('<span class="setDate">' + $inpVal.replace(/\-/g, '.') + '</span>');
				$placeholder.hide().attr('aria-hidden', 'true');
			}else{
				$placeholder.show().attr('aria-hidden', 'false');
			}
		});
		$(document).off('change.share').on('change.share', '.inp-sys-date input[type="date"], .inp-sys-date input[type="month"], .inp-sys-date input[type="time"], .inp-sys-date input[type="datetime-local"]', function() {
			var $this = $(this);
			var $thisVal = $this.val();
			var $dateBox = $this.closest('.inp-sys-date');
			var $viewer = $('.date-viewer', $dateBox);
			var $setDate = $('.setDate', $viewer);
			var $placeholder = $('.date-placeholder', $viewer);

			if($thisVal) {
				$setDate.remove();
				$viewer.append('<span class="setDate">' + $thisVal.replace(/\-/g, '.') + '</span>');
				$placeholder.hide().attr('aria-hidden', 'true');
			}
		});
	}
}

var _checkInfomationFnc = {
	init : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		var $wrap = $('.check-infomation-wrap', $parentTgt);
		var $thisObj = this;

		if(!$wrap.length) return;

		$wrap.each(function() {
			$thisObj.setInit($(this));
		});

		$('.check-infomation-wrap .btn-expand', $parentTgt).off('click.share').on('click.share', function() {
			var $this = $(this);
			var $thisWrap = $this.closest('.check-infomation-wrap');
			if($this.hasClass('foldup')) {
				$this.removeClass('foldup');
				$thisWrap.css({'max-height' : 189});
			}else{
				$this.addClass('foldup');
				$thisWrap.css({'max-height' : 'initial'});
			}
		});
	},
	setInit : function(target) {
		var $targetWrap = $(target);
		var $titBox = $('.title-box', $targetWrap);
		var $btnExpend = $('.btn-expand', $titBox);
		var $contsBox = $('.check-info-contents', $targetWrap);
		var $contsH = $contsBox.outerHeight();

		if($contsH <= 120) {
			$targetWrap.addClass('inactivation');
			$btnExpend.attr('disabled', true);
		}
	}
}
//scrollStop
$.fn.scrollStop = function(callback){
	var that = this, $this = $(that);
	$(this).scroll(function(ev){
		clearTimeout($this.data('scrollTimeout'));
		$this.data('scrollTimeout',setTimeout(callback.bind(that),250,ev));
	});
};
var _tableScrollFnc = {
	init : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		var $tableScrollObj = this;
		var $fixeScroll = $('.tbl-list-wrap .fixed-scroll', $parentTgt);
		var $tblScroll = $('.tbl-list-wrap .scroll-x', $parentTgt);
		if($fixeScroll.length > 0) {
			$fixeScroll.each(function() {
				$tableScrollObj.fixeScroll($(this));
			});
		}
		if($tblScroll.length > 0) {
			$tblScroll.each(function() {
				$tableScrollObj.tblScroll($(this));
			});
		}
	},
	
	tblScroll : function(target){
		var $tableBox = $(target);
		$tableBox.append('<span class="arrow-left" aria-hidden="true"></span><span class="arrow-right" aria-hidden="true"></span>')
		$tableBox.scroll(function(){
			var $tableBox = $(target);
			var $nowPos = $tableBox.scrollLeft();
			$('.arrow-left', $tableBox).hide();
			$('.arrow-right', $tableBox).hide();
			if($nowPos == 0 ){
				$('.arrow-left', $tableBox).show();
				$('.arrow-right', $tableBox).show();
			}
		});
		$tableBox.scrollStop(function(ev){
			$('.arrow-left', $tableBox).show();
			$('.arrow-right', $tableBox).show();
		});
	}, 
	fixeScroll : function(target) {
		var $tableBox = $(target);
		var $rowViewNum = $tableBox.data('view-area');
		var $thead =  $('thead', $tableBox);
		var $tbody =  $('tbody', $tableBox);
		var $fixedItem = $('.fixed-item', $tableBox);
		var $tableBoxH = 0;
		var $fixedX = 0;

		$('tr', $tableBox).each(function() {
			var $fixItem = $('.fixed-item', this);
			var $fixedW = 0;
			$fixItem.each(function() {
				$fixedW += $(this).outerWidth();
			});
			$fixedX = Math.max($fixedX, $fixedW);
		});
		$tableBox.append('<div class="thead-line" aria-hidden="true" style="top:' + $thead.outerHeight() + 'px"></div>');
		if($fixedX > 0) $tableBox.append('<div class="gradation-x" aria-hidden="true" style="left:' + $fixedX + 'px"></div>');
		if($fixedX > 0) $tableBox.append('<div class="scroll-arrow-x" aria-hidden="true"></div>');
		
		if($('.fixed-item', $tableBox).length > 0) {//scroll x 셋팅
			$fixedItem.each(function() {
				var $this = $(this);
				$this.css({'left' : $this.position().left});
			});
		}

		if($rowViewNum) {//scroll y 셋팅
			$('tr', $thead).each(function() {
				$tableBoxH += $('th', this).outerHeight();
				$('th', this).each(function() {
					var $this = $(this);
					$this.css({'top' : $this.position().top});
				});
			});
			$('tr', $tbody).each(function(i) {
				if(i < parseInt($rowViewNum, 10)) {
					$tableBoxH += $('td', this).outerHeight();
				}
			});

			$tableBox.css({'height' : $tableBoxH});
		}

		$tableBox.scroll(function(){
			var $tableBox = $(target);
			var $nowPos = $tableBox.scrollLeft();
			$('.scroll-arrow-x', $tableBox).hide();
			if($nowPos == 0 ){
				$('.scroll-arrow-x', $tableBox).show();
			}
		});
		$tableBox.scrollStop(function(ev){
			$('.scroll-arrow-x', $tableBox).show();
		});
	}
}

var _accordianFnc = {
	init : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		var $accordianObj = this;
		var $accordianWrap = $('.accordian-wrap', $parentTgt);

		if($accordianWrap.length) {
			$accordianWrap.each(function() {
				$accordianObj.setAccodian($(this));
				if($accordianWrap.find('button').hasClass('btn-acco-full')){
					$accordianObj.accoAllAction($(this));
				}
			});
		}
		
		$('.accordian-wrap .btn-expand', $parentTgt).off('click.share').on('click.share', function() {
			var $this = $(this);
			var $wrap = $this.closest('.accordian-wrap');
			var $titBox = $this.closest('.tit-box');
			var $accoLi = $this.closest('li');
			var $conts = $titBox.next();
			
			if($wrap.hasClass('type02') || $wrap.hasClass('foot-menu')){
				if($conts.is(':hidden')) {
					$this.removeClass('foldup');
					$conts.show().attr('aria-hidden', 'false');
					$this.closest('li').siblings().find('.btn-expand').addClass('foldup');
					$this.closest('li').siblings().find('.conts-box').hide();
				}else{
					$this.addClass('foldup');
					$conts.hide().attr('aria-hidden', 'true');
				}
			}else{
				if($conts.is(':hidden')) {
					$this.removeClass('foldup');
					$conts.show().attr('aria-hidden', 'false');
					$wrap.each(function(){
						if($wrap.find('.btn-expand').hasClass('foldup') == false){
							$('.btn-acco-full', $accordianWrap).addClass('allAct');
							$('.btn-acco-full', $accordianWrap).find('span').text('모두닫기');
						}
					});
				}else{
					$this.addClass('foldup');
					$conts.hide().attr('aria-hidden', 'true');
					$('.btn-acco-full', $accordianWrap).removeClass('allAct');
					$('.btn-acco-full', $accordianWrap).find('span').text('모두열기');
				}
			}
		});
	},
	setAccodian : function(target) {
		var $accordianWrap = $(target);
		var $constBox = $('.conts-box', $accordianWrap);

		$constBox.each(function(i) {
			var $this = $(this);
			var $titBox = $this.prev();

			if($accordianWrap.hasClass('type02') || $accordianWrap.hasClass('foot-menu') ){
				$('.btn-expand', $titBox).addClass('foldup');
				$constBox.hide().attr('aria-hidden', 'true');
			}

			if($this.is(':hidden')) {
				$('.btn-expand', $titBox).addClass('foldup');
				$this.attr('aria-hidden', 'true');
			}else{
				$('.btn-expand', $titBox).removeClass('foldup');
				$this.attr('aria-hidden', 'false');
			}

		});
	},
	accoAllAction : function(target){
		var $accordianWrap = $(target);
		var $btnAccoFull = $('.btn-acco-full', $accordianWrap);
		var $constBox = $('.conts-box', $accordianWrap);
		var $titBox = $constBox.prev();
		$btnAccoFull.off('click.share').on('click.share', function() {
			if($btnAccoFull.hasClass('allAct')){
				$btnAccoFull.removeClass('allAct');
				$btnAccoFull.find('span').text('모두열기');
				$('.btn-expand', $titBox).addClass('foldup');
				$constBox.hide().attr('aria-hidden','true');
			}else{
				$btnAccoFull.addClass('allAct');
				$btnAccoFull.find('span').text('모두닫기');
				$('.btn-expand', $titBox).removeClass('foldup');
				$constBox.show().attr('aria-hidden','false');
			}
		});
	}
}

var _toggleBtnFnc = {
	init : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		var $toggleBtnObj = this;
		var $target = '.btn-toggle-case .btn-toggle, .period-toggle-case .btn-toggle';

		if($('.btn-toggle-case, .period-toggle-case', $parentTgt).length) {
			$($target, $parentTgt).each(function() {
				$toggleBtnObj.setToggle($('.btn-toggle-case, .period-toggle-case'));
			});
		}
		$('.btn-toggle-case .btn-toggle, .period-toggle-case .btn-toggle', $parentTgt).off('click.share').on('click.share',function(){
			var $this = $(this);
			var $thisWrap = $this.closest('.btn-toggle-case, .period-toggle-case');

			if(!$this.hasClass('active')) {
				$('.btn-toggle', $thisWrap).removeClass('active').attr('aria-selected', 'false');
				$this.addClass('active').attr('aria-selected', 'true');
			}
		});
	},
	setToggle : function(target) {
		var $btn = $('.btn-toggle', target);

		$btn.each(function() {
			var $this = $(this);
			if($this.hasClass('active')) {
				$this.attr('aria-selected', 'true');
			}else{
				$this.attr('aria-selected', 'false');
			}
		});
	}
}

var _scrapToggleFnc = {
	init : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		$('.btn-scrap', $parentTgt).off('click.share').on('click.share',function() {
			var $this = $(this);

			if($this.hasClass('active')) {
				$this.removeClass('active').attr('aria-pressed', 'false');
			}else{
				$this.addClass('active').attr('aria-pressed', 'true');
			}
		});
	}
}

var _boardDetailFnc = {
	init : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		/*
		$(document).on('click',function() {
			var $btnWriteSet = $('.board-detail-wrap .btn-write-set');
			$btnWriteSet.attr('aria-espanded', 'false');
			$btnWriteSet.next().hide().attr('aria-hidden', 'true');
		});
		*/
		$('.board-detail-wrap .write-set-wrap', $parentTgt).off('click.share').on('click.share',function(e) {e.stopPropagation();});
		$('.board-detail-wrap .btn-write-set', $parentTgt).off('click.share').on('click.share',function(e) {
			_boardDetailFnc.writeset();
		});
		$('.board-detail-wrap .original-write-box .tit-box button', $parentTgt).off('click.share').on('click.share',function(e) {
			_boardDetailFnc.originalset();
		});
		
	},
	writeset : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		var $this = $('.board-detail-wrap .btn-write-set', $parentTgt);
		var $menu = $this.next();
		if($menu.is(':hidden')) {
			$this.attr('aria-espanded', 'true');
			$menu.show().attr('aria-hidden', 'false');
		}else{
			$this.attr('aria-espanded', 'false');
			$menu.hide().attr('aria-hidden', 'true');
		}
	},
	originalset : function($parentTgt){
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		var $this = $('.board-detail-wrap .original-write-box .tit-box button', $parentTgt);
		var $menu = $this.parent().next();
		if($menu.is(':hidden')) {
			$this.attr('aria-espanded', 'true').removeClass('foldup');
			$menu.show().attr('aria-hidden', 'false');
		}else{
			$this.attr('aria-espanded', 'false').addClass('foldup');
			$menu.hide().attr('aria-hidden', 'true');
		}
	}
}

var _popupFnc = {
	clickEl : undefined,
	init : function() {
		var $layerObj = this;
		$('[layer-src]').off('click.share').on('click.share',function(){
			var $layerSrc = $(this).attr('layer-src');
			$layerObj.open($layerSrc, this);
		});

		$('.btn-tooltip').off('click.share').on('click.share', function(e) {
			var $tooltipWrap = $('.tooltip-wrap');
			$layerObj.tooltip($(this).closest('.tooltip-wrap'));
		});
		$('.tooltip-wrap').off('click.share').on('click.share', function(e) {e.stopPropagation();});
		$(document).off('click.share').on('click.share', function() {
			$('.tooltip-box').hide();
		});
	},
	open : function(target, clickEl) {
		var $layerObj = this;
		var $layerWrap = $('#'+target);
		var $layerBox = $('.layer-box', $layerWrap);
		var $layerHead = $('.layer-head', $layerWrap);
		var $layerBody = $('.layer-body', $layerWrap);
		var $layerFoot = $('.layer-foot', $layerWrap);
		var $btnClose = $('.btn-layer-close', $layerWrap);
		var $posY = 0;
		var $winH = window.innerHeight;
		var $maxH = $winH - 60 - 20 - $layerHead.outerHeight();
		$layerObj.clickEl = $(clickEl);

		// 팝업 셋팅
		$('body').addClass('pop');
		$layerWrap.show();
		$layerWrap.prepend('<div class="accessbilityLast offscreen" tabindex="0" aria-hidden="true"></div>');
		$layerWrap.append('<div class="accessbilityFirst offscreen" tabindex="0" aria-hidden="true"></div>');
		
		if($layerHead.length) {
			$layerBody.css({'padding-top' : !$layerBox.hasClass('fixed-bot') ? $layerHead.outerHeight() + 30 : $layerHead.outerHeight()});
		}
		if($layerFoot.length) {
			$layerBody.css({'padding-bottom' : $layerFoot.outerHeight() + 30});
		}

		$layerBody.css({'max-height' : !$layerBox.hasClass('full') ? $maxH : $layerBox.outerHeight()});

		// if(!$layerBox.hasClass('fixed-bot') && !$layerBox.hasClass('full')) {
		// 	$posY = ($winH - $layerBox.outerHeight()) / 2;
		// 	$layerBox.css({'top' : $posY})
		// }

		if($layerBox.hasClass('full')) {
			_scrollHideShowFnc.layerScrollEvent($layerWrap);
		}

		if($('.tab-list-wrap', $layerWrap).length) {
			$('.tab-list-wrap', $layerWrap).each(function(i) {
				_tabBoxFnc.setTabInit($(this));
			});
		}

		$layerBox.attr('tabindex', '0').before('<div class="layerMask" aria-hidden="true"></div>');
		$layerBox.focus();

		$btnClose.off('click.share').on('click.share', function() {
			$layerObj.close(target);
		});
		$('.accessbilityFirst', $layerWrap).off('focusin.share').on('focusin.share',function() {
			$layerBox.focus();
		});
		$('.accessbilityLast', $layerWrap).off('focusin.share').on('focusin.share',function() {
			if(!$btnClose.length) {
				$layerBox.focus();
			}else{
				$btnClose.focus();
			}
		});
		$('.layerMask', $layerWrap).off('click.share').on('click.share',function() {
			$layerObj.close(target);
		});

	},
	close : function(target) {
		var $layerObj = this;
		var $layerWrap = $('#'+target);


		$('body').removeClass('pop');
		$('.layerMask', $layerWrap).remove();
		$('.accessbilityLast', $layerWrap).remove();
		$('.accessbilityFirst', $layerWrap).remove();

		$layerWrap.hide();

		if($layerObj.clickEl) {
			$layerObj.clickEl.focus();
			$layerObj.clickEl = undefined;
		}
	},
	toast : function(target, clickEl) {
		var $layerObj = this;
		var $toastWrap = $('#'+target);
		var $clickEl = clickEl ? $(clickEl) : undefined;

		$toastWrap.attr('tabindex', '0');
		if($clickEl.hasClass('compare') && $clickEl.hasClass('active')){
			$toastWrap.find('.compare-save').hide();
			$toastWrap.hide();
			$clickEl.removeClass('active');
		}else{
			$toastWrap.show();
			$toastWrap.find('.compare-save').show();
			$clickEl.addClass('active');

			$('body').addClass('sendtocart');
			setTimeout(function(){
				$('body').removeClass('sendtocart');
				$toastWrap.hide();
			},1800);
		}
		$toastWrap.fadeIn(500, function() {
			if($clickEl) $toastWrap.focus();
			setTimeout(function() {
				$toastWrap.fadeOut(800);
				if($clickEl) $clickEl.focus();
			}, 1000);
		});
	},
	tooltip : function(target) {
		var $tooltipWrap = $(target);
		var $btnTooltip = $('.btn-tooltip', $tooltipWrap);
		var $tooltipBox = $('.tooltip-box', $tooltipWrap);
		var $btnClose = $('.btn-tooltip-close', $tooltipBox);
		var $posX = $tooltipWrap.offset().left - 18;

		$('.btn-tooltip-close').trigger('click.share');

		$tooltipBox.before('<div class="accessbilityLast offscreen" tabindex="0" aria-hidden="true"></div>');
		$tooltipBox.after('<div class="accessbilityFirst offscreen" tabindex="0" aria-hidden="true"></div>');
		$tooltipBox.css({'left' : $posX > 0 ? '-' + $posX + 'px' : 0}).attr('tabindex', '0').show().focus();
		$tooltipWrap.css({'z-index' : '11'});

		$btnClose.off('click.share').on('click.share', function() {
			$tooltipBox.hide();
			$btnTooltip.focus();
			$tooltipWrap.css({'z-index' : '10'});
			$('.accessbilityFirst', $tooltipWrap).remove();
			$('.accessbilityLast', $tooltipWrap).remove();
		});
		$('.accessbilityFirst', $tooltipWrap).off('focusin.share').on('focusin.share',function() {
			$tooltipBox.focus();
		});
		$('.accessbilityLast', $tooltipWrap).off('focusin.share').on('focusin.share',function() {
			$btnClose.focus();
		});
	}
}

var _footerSwiper = {
	init : function() {
		var $targetEl = $('#kmsFooter .foot-navi-inner');
		var $swiperWrap = $('.swiper-wrapper', $targetEl);
		var $slideItem = $('.swiper-slide', $swiperWrap);

		$slideItem.each(function() {

		});

		var opt = {
			freeMode : true,
			slidesPerView : 'auto',
			observer : true
		}
		var swiperLib = new Swiper($targetEl, opt);
	}
}

var _stickyBtnFnc = {
	init : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		var $stickyBtnFnc = this;
		var $stickyBtnBox = $('.btn-page-wrap .sticky-bottom', $parentTgt);
		if($stickyBtnBox.length) {
			$stickyBtnBox.each(function() {
				var $this = $(this);

				if($this.closest('.tab-panel').length) return;
				$stickyBtnFnc.setBtnbox($this);
			});
		}
	},
	setBtnbox : function(target) {
		var $stickBox = $(target);
		var $stickyWrap = $stickBox.closest('.btn-page-wrap');
		var $offT = $stickyWrap.offset().top;
		var $winST = $(window).scrollTop();
		var $winH = window.innerHeight;
		var $chPoint = ($offT + $stickyWrap.outerHeight()) - $winH;

		$stickBox.addClass('sticky-active');

		$(window).scroll(function() {
			$winST = $(window).scrollTop();
			if($chPoint <= $winST) {
				$stickBox.removeClass('sticky-active');
			}else{
				$stickBox.addClass('sticky-active');
			}
		});

	}
}

var _tabBoxFnc = {
	init : function() {
		var $tabBoxFnc = this;
		var $tabListWrap = $('.tab-list-wrap');

		if($tabListWrap.length) {
			$tabListWrap.each(function() {
				$tabBoxFnc.setTabInit($(this));
			});

			$(document).off('click.share').on('click.share', function() {
				var $tabListWrap = $('.tab-list-wrap');
				var $tabListInner = $('.tab-list-inner', $tabListWrap);
				var $tabListMore = $('.tab-list-more', $tabListWrap);
				var $btnMore = $('.btn-tab-more', $tabListWrap);

				if($tabListWrap.length && $tabListMore.length) {
					$tabListInner.removeClass('open-more');
					$tabListMore.hide().attr('aria-hidden', 'true');
					$btnMore.attr('aria-expanded', 'false').removeClass('active');
				}
			});
			$('.tab-list-wrap').off('click.share').on('click.share', function(e) {e.stopPropagation()});
			$('.tab-list-wrap .tab-list-box a').off('click.share').on('click.share', function(e) {
				var $this = $(this);
				var $idx = $this.parent().index();
				var $txt = $('span', $this).text();
				var $tabListWrap = $this.closest('.tab-list-wrap');
				var $tabListBox = $('.tab-list-box', $tabListWrap);
				var $tabItemBox = $('> ul > li', $tabListBox);
				if($('.top-fixed-area').length > 0){
					var $tabPanelBox = $tabListWrap.closest('#kmsContents').find('.tab-panel-wrap');
				}else{
					var $tabPanelBox = $tabListWrap.next('.tab-panel-wrap');
				}
				var $tabContBox = $('> .tab-content', $tabPanelBox);
				var $btnTabMore = $('.btn-tab-more', $tabListWrap);
				var $tabListMore = $('.tab-list-more', $tabListWrap);
				var $swiperLib = $tabListWrap.data('swiper-lib');

				if(!$this.hasClass('active')) {
					$tabItemBox.removeClass('active').find('a').attr('aria-selected', 'false');
					$this.attr('aria-selected', 'true').parent().addClass('active');
					if($tabContBox.length > 1) {
						$tabContBox.attr('aria-hidden', 'true').hide().eq($idx).attr('aria-hidden', 'false').show();
					}else if($tabContBox.length == 1) {
						$tabContBox.find('.offscreen').text($txt);
					}

					if($tabListMore.length) {
						$swiperLib.slideTo($idx);
						$('li', $tabListMore).removeClass('active').eq($idx).addClass('active');
						if($tabListMore.is(':visible')) $btnTabMore.trigger('click');
					}
				}

				//gallery in tab auto height
				if($tabListWrap.hasClass('type04')){
					var slideH = $tabListWrap.parent().outerHeight();
					$('.gallery-top > .swiper-container > .swiper-wrapper').height(slideH);
				}

				//main tab move
				if($tabListWrap.hasClass('tab-main')){
					var $offsetPos = $tabListWrap.offset();
					$('html, body').animate({
						scrollTop : $offsetPos.top
					},500);
				}

				//sticky button
				_stickyBtnFnc.init();  
			});
			$('.tab-list-wrap .btn-tab-more').off('click.share').on('click.share', function(e) {
				var $this = $(this);
				var $tabListWrap = $this.closest('.tab-list-wrap');
				var $tabListInner = $('.tab-list-inner', $tabListWrap);
				var $tabListMore = $('.tab-list-more', $tabListWrap);

				if($tabListMore.is(':hidden')) {
					$tabListInner.addClass('open-more');
					$tabListMore.show().attr('aria-hidden', 'false');
					$this.attr('aria-expanded', 'true').addClass('active');
				}else{
					$tabListInner.removeClass('open-more');
					$tabListMore.hide().attr('aria-hidden', 'true');
					$this.attr('aria-expanded', 'false').removeClass('active');
				}
			});
			$('.tab-list-wrap .tab-list-more a').off('click.share').on('click.share', function(e) {
				var $this = $(this);
				var $idx = $this.parent().index();
				var $tabListWrap = $this.closest('.tab-list-wrap');
				var $tabListBox = $('.tab-list-box', $tabListWrap);
				var $btnMore = $('.btn-tab-more', $tabListWrap);

				$('li', $tabListBox).eq($idx).find('a').trigger('click.share');
			});
		}
	},
	setTabInit : function(target) {
		var $tabListWrap = $(target);
		var $tabListInner = $('.tab-list-inner', $tabListWrap);
		var $tabListBox = $('.tab-list-box', $tabListWrap);
		var $tabItemBox = $('> ul > li', $tabListBox);
		if($('.top-fixed-area').length > 0){
			var $tabPanelBox = $tabListWrap.closest('#kmsContents').find('.tab-panel-wrap');
		}else{
			var $tabPanelBox = $tabListWrap.next('.tab-panel-wrap');
		}
		var $tabContBox = $('> .tab-content', $tabPanelBox);
		var $accordianWrap = $('.accordian-wrap', $tabContBox);
		var $btnStickPage = $('> .btn-page-wrap .sticky-bottom', $tabContBox);
		
		

		if($tabListInner.hasClass('fixed')) {
			$tabListWrap.css({'min-height' : $tabListBox.outerHeight()});
		}

		$tabItemBox.each(function(i) {
			
			var $this = $(this);
			if($tabContBox.length > 1) {
				if(!$tabContBox.eq(i).find('h1.offscreen').length) $tabContBox.eq(i).prepend('<h1 class="offscreen">' + $('> a > span', $this).text() + '</h1>');
				if($this.hasClass('active')) {
					$tabContBox.eq(i).attr('aria-hidden', 'false').show();
				}else{
					$tabContBox.eq(i).attr('aria-hidden', 'true').hide();
				}
			}else if($tabContBox.length == 1 && $this.hasClass('active')) {
				$tabContBox.attr('aria-hidden', 'false').show();
				if(!$tabContBox.find('h1.offscreen').length) $tabContBox.prepend('<h1 class="offscreen">' + $('> ul > li.active a span', $tabListBox).text() + '</h1>');
			}

			if($this.hasClass('active')) {
				$('> a', $this).attr('aria-selected', 'true');
			}else{
				$('> a', $this).attr('aria-selected', 'false');
			}
		});

		
		if(!$tabListWrap.hasClass('type02') && !$tabListWrap.hasClass('except01') && !$tabListWrap.hasClass('except02')) {
			//기본 탭메뉴 더보기
			this.moreDefault(target);
		}else if($tabListWrap.hasClass('type02')){
			this.tabMoreType02(target);
		}

		if($accordianWrap.length)_accordianFnc.setAccodian($accordianWrap);
		if($btnStickPage.length)_stickyBtnFnc.setBtnbox($btnStickPage);

	},
	moreDefault : function(target) {
		var $tabListWrap = $(target);
		var $tabListInner = $('.tab-list-inner', $tabListWrap);
		var $tabListBox = $('.tab-list-box', $tabListWrap);
		var $tabItemBox = $('> ul > li', $tabListBox);
		var $tabIdx = $('> ul > li.active', $tabListBox).index();
		if($('.top-fixed-area').length > 0){
			var $tabPanelBox = $tabListWrap.closest('#kmsContents').find('.tab-panel-wrap');
		}else{
			var $tabPanelBox = $tabListWrap.next('.tab-panel-wrap');
		}
		var $tabContBox = $('> .tab-content', $tabPanelBox);
		var $btnMore = $('.btn-tab-more', $tabListWrap);
		var $swiperLib = $btnMore.length ? $tabListWrap.data('swiper-lib') : undefined;

		if($tabItemBox.length <= 3) return;
		if($tabListWrap.hasClass('type03') || $tabListWrap.hasClass('type05') || $tabListWrap.hasClass('tab-main')) return;
		if($('.tab-list-more', $tabListWrap).length) {
			$swiperLib.update();
			return;
		}
		var html = '<button type="button" class="btn-tab-more" aria-expanded="false"><em class="offscreen">탭 더보기</em></button>';
		html += '<div class="tab-list-more" aria-hidden="true"></div>';
		html += '<div class="shadow-left" aria-hidden="true"></div>';
		html += '<div class="shadow-right" aria-hidden="true"></div>';
		$tabListInner.append(html);
		var $btnMore = $('.btn-tab-more', $tabListWrap);
		var $tabListMore = $('.tab-list-more', $tabListWrap);
		var $leftShadow = $('.shadow-left', $tabListWrap);
		var $rightShadow = $('.shadow-right', $tabListWrap);
		$tabListMore.append($('> ul', $tabListBox).clone());
		$tabListInner.addClass('type-more');
		$tabItemBox.addClass('swiper-slide').parent().addClass('swiper-wrapper');

		var $shadowFn = function(lib) {
			var $posX = Math.abs(lib.translate);
			var $lastPos = lib.virtualSize - lib.$el.outerWidth();

			if($posX <= 0) {
				$leftShadow.hide();
				$rightShadow.show();
			}else if($posX > 0 && $posX < $lastPos) {
				$leftShadow.show();
				$rightShadow.show();
			}else{
				$leftShadow.show();
				$rightShadow.hide();
			}
		}
		$swiperLib = new Swiper($tabListBox, {
			observer: true,
			observeParents: true,
			initialSlide : $tabIdx,
			freeMode : true,
			slidesPerView : 'auto',
			on : {
				init :function() {
					$shadowFn(this);
				},
				sliderMove : function() {
					$shadowFn(this);
				},
				transitionEnd : function() {
					$shadowFn(this);
				}
			}
		});
		$tabListWrap.data('swiper-lib', $swiperLib);
	},
	tabMoreType02 : function(target) {
		var $tabListWrap = $(target);
		var $tabListInner = $('.tab-list-inner', $tabListWrap);
		var $tabListBox = $('.tab-list-box', $tabListWrap);
		var $tabItemBox = $('> ul > li', $tabListBox);
		var $tabIdx = $('> ul > li.active', $tabListBox).index();
		if($('.top-fixed-area').length > 0){
			var $tabPanelBox = $tabListWrap.closest('#kmsContents').find('.tab-panel-wrap');
		}else{
			var $tabPanelBox = $tabListWrap.next('.tab-panel-wrap');
		}
		var $tabContBox = $('> .tab-content', $tabPanelBox);
		$tabItemBox.addClass('swiper-slide').parent().addClass('swiper-wrapper');
		$tabListInner.append('<div class="shadow-left" aria-hidden="true"></div>');
		$tabListInner.append('<div class="shadow-right" aria-hidden="true"></div>');
		var $leftShadow = $('.shadow-left', $tabListWrap);
		var $rightShadow = $('.shadow-right', $tabListWrap);

		var $shadowFn = function(lib) {
			var $posX = Math.abs(lib.translate);
			var $lastPos = lib.virtualSize - lib.$el.outerWidth();

			if($posX <= 0) {
				$leftShadow.hide();
				$rightShadow.show();
			}else if($posX > 0 && $posX < $lastPos) {
				$leftShadow.show();
				$rightShadow.show();
			}else{
				$leftShadow.show();
				$rightShadow.hide();
			}
		}
		var $swiperLib = new Swiper($tabListBox, {
			observer: true,
			observeParents: true,
			initialSlide : $tabIdx,
			freeMode : true,
			slidesPerView : 'auto',
			on : {
				init :function() {
					$shadowFn(this);
					if(this.virtualSize <= $tabListWrap.outerWidth()) {
						this.detachEvents();
						$leftShadow.hide();
						$rightShadow.hide();
					}
				},
				sliderMove : function() {
					$shadowFn(this);
				},
				transitionEnd : function() {
					$shadowFn(this);
				}
			}
		});

		$tabListWrap.data('swiper-lib', $swiperLib);
	},
}

var _scrollHideShowFnc = {
	init : function() {
		this.winScrollEvent();
	},
	winScrollEvent : function() {
		var $nowScroll = $(window).scrollTop();
		var $headH = $('#kmsHeader').outerHeight();
		var $tabFixed = $('.tab-list-wrap .tab-list-inner.fixed').length ? $('.tab-list-wrap .tab-list-inner.fixed') : false;//tab
		var $tabScrollFixed = $('.tab-list-wrap .tab-list-inner.scroll-fixed').length ? $('.tab-list-wrap .tab-list-inner.scroll-fixed') : false;//tab
		var $tabScrollFixedStart = $tabScrollFixed ? $tabScrollFixed.offset().top - 57 : false;
		var $searchFixed = $('.search-form-wrap .inner-box.fixed').length ? $('.search-form-wrap .inner-box.fixed') : false;//검색영역
		var $fundCateSlide = $('.recommend-fund-wrap .fund-category-box').length ? $('.recommend-fund-wrap .fund-category-box') : false;//검색영역
		var $topFixed = $('.top-fixed-area .inner-box.fixed').length ? $('.top-fixed-area .inner-box.fixed') : false; //상단 고정 영역
		var $topScrollFixed = $('.top-fixed-area .inner-box.scroll-fixed').length ? $('.top-fixed-area .inner-box.scroll-fixed') : false;//tab
		var $topScrollFixedStart = $topScrollFixed ? $topScrollFixed.offset().top - 57 : false;
	
		if($searchFixed) {
			var $searchFixedH = $searchFixed.outerHeight();
			$('.search-form-wrap').css({'height' : $searchFixedH});
		}
		if($fundCateSlide) {
			var $fundCateSlideH = $fundCateSlide.outerHeight();
			$('.recommend-fund-wrap').css({'height' : $fundCateSlideH});

		}
		
		$(window).scroll(function() {
			var $winST = $(window).scrollTop();
			var $isScrollUp = $winST - $nowScroll < 0 ? true : false;
			if(!$('.layer-pop-wrap').length || $('.layer-pop-wrap').is(':hidden')) {
				//검색영역 스크롤 노출/비노출
				if($searchFixed && $searchFixedH + 57 <= $winST) {
					$searchFixed.addClass('active');
					if($isScrollUp) {
						$searchFixed.removeClass('hide');
					}else{
						$searchFixed.addClass('hide');
					}
				}else if($searchFixed && 57 >= $winST){
					$searchFixed.removeClass('active');
				}

				if($fundCateSlide && $fundCateSlideH + 57 <= $winST) {
					$fundCateSlide.addClass('fixed');
					if($isScrollUp) {
						$fundCateSlide.removeClass('hide');
					}else{
						$fundCateSlide.addClass('hide');
					}
				}else if($fundCateSlide && 57 >= $winST){
					$fundCateSlide.removeClass('fixed');
				}

				//scroll fixed tab
				if($tabScrollFixed) {
					if($tabScrollFixedStart < $winST) {
						$tabScrollFixed.addClass('fixed');
					}else{
						$tabScrollFixed.removeClass('fixed t0');
					}

				}

				if($headH < $winST) {
					if($isScrollUp) {
						if($tabFixed) {
							$tabFixed.removeClass('t0');
						}else if($tabScrollFixed) {
							$tabScrollFixed.removeClass('t0');
						}
						$('#kmsHeader').removeClass('hide');
					}else{
						if($tabFixed) {
							$tabFixed.addClass('t0');
						}else if($tabScrollFixed) {
							$tabScrollFixed.addClass('t0');
						}
						$('#kmsHeader').addClass('hide');
					}
				}else{
					if($tabFixed) {
						$tabFixed.removeClass('t0');
					}else if($tabScrollFixed) {
						$tabScrollFixed.removeClass('t0');
					}
					$('#kmsHeader').removeClass('hide');
				}

				//scroll fixed top area
				if($topScrollFixed) {
					if($topScrollFixedStart < $winST) {
						$topScrollFixed.addClass('fixed');
					}else{
						$topScrollFixed.removeClass('fixed t0');
					}
				}

				if($headH < $winST) {
					if($isScrollUp) {
						if($topFixed) {
							$topFixed.removeClass('t0');
						}else if($topScrollFixed) {
							$topScrollFixed.removeClass('t0');
						}
						$('#kmsHeader').removeClass('hide');
					}else{
						if($topFixed) {
							$topFixed.addClass('t0');
						}else if($topScrollFixed) {
							$topScrollFixed.addClass('t0');
						}
						$('#kmsHeader').addClass('hide');
					}
				}else{
					if($topFixed) {
						$topFixed.removeClass('t0');
					}else if($topScrollFixed) {
						$topScrollFixed.removeClass('t0');
					}
					$('#kmsHeader').removeClass('hide');
				}
			}
			$nowScroll = $winST;
		});
	},
	layerScrollEvent : function(target) {
		var $layerWrap = $(target);
		var $layerHead = $('.layer-head', $layerWrap);
		var $layerFoot = $('.layer-foot', $layerWrap).length ? $('.layer-foot', $layerWrap) : undefined;
		var $layerClose = $('.btn-layer-close', $layerWrap);
		var $scrollArea = $('.layer-box.full .layer-body', $layerWrap);
		var $nowScroll = $scrollArea.scrollTop();
		var $headH = $('.layer-head',  $layerWrap).outerHeight();
		
		var $tabFixed = $('.tab-list-wrap .tab-list-inner.fixed', $layerWrap).length ? $('.tab-list-wrap .tab-list-inner.fixed', $layerWrap) : false;
		var $tabScrollFixed = $('.tab-list-wrap .tab-list-inner.scroll-fixed', $layerWrap).length ? $('.tab-list-wrap .tab-list-inner.scroll-fixed', $layerWrap) : false;//tab
		var $tabScrollFixedStart = $tabScrollFixed ? $tabScrollFixed.offset().top - 57 : false;
		
		var $topFixed = $('.top-fixed-area .inner-box.fixed', $layerWrap).length ? $('.top-fixed-area .inner-box.fixed', $layerWrap) : false;
		var $topScrollFixed = $('.top-fixed-area .inner-box.scroll-fixed', $layerWrap).length ? $('.top-fixed-area .inner-box.scroll-fixed', $layerWrap) : false;//tab
		var $topScrollFixedStart = $topScrollFixed ? $topScrollFixed.offset().top - 57 : false;

		var $compareSelectBox = $('.compare-select-wrap .inner-compare-select', $layerWrap);
		var $compareChPoint = $compareSelectBox.length ? $compareSelectBox.outerHeight() : undefined;//비교하기 팝업 헤더부분 노출/비노출 적용 위치 변경
		var $fundDetailInfoWrap = $('.fund-detail-info-wrap.type-sticky');
		var $fundDetailInfoChPoint = $fundDetailInfoWrap.length ? $fundDetailInfoWrap.outerHeight() : undefined;//펀드상세정보 팝업 헤더부분 노출/비노출 적용 위치 변경

		var $scrollfnc = function(e) {
			var $scrollST = $(e.target).scrollTop();
			var $isScrollUp = $scrollST - $nowScroll < 0 ? true : false;

			if($compareSelectBox.length) {//비교하기
				if($compareChPoint < $scrollST) {
					if($isScrollUp) {
						$compareSelectBox.removeClass('t0');
						$layerHead.removeClass('hide');
						$layerClose.removeClass('hide');
					}else{
						$layerHead.addClass('hide');
						$layerClose.addClass('hide');
						$compareSelectBox.addClass('t0');
					}
				}else{
					$compareSelectBox.removeClass('t0');
					$layerHead.removeClass('hide');
					$layerClose.removeClass('hide');
				}
			}else if($fundDetailInfoWrap.length) {//펀드상세정보 sticky
				var $fundDetailInner = $('.inner-detail-info', $fundDetailInfoWrap);
				if($fundDetailInfoChPoint < $scrollST) {
					$fundDetailInfoWrap.css({'height' : $fundDetailInfoChPoint});
					if(!$fundDetailInner.hasClass('fixed')){
						$fundDetailInner.addClass('fixed');
					} 
					if($layerFoot) $layerFoot.removeClass('hidden');
					if($isScrollUp) {
						$fundDetailInner.removeClass('t0');
						$layerHead.removeClass('hide');
						$layerClose.removeClass('hide');
					}else{
						$layerHead.addClass('hide');
						$layerClose.addClass('hide');
						$fundDetailInner.addClass('t0');
					}
				}else{
					$fundDetailInfoWrap.css({'height' : 'auto'});
					$fundDetailInner.removeClass('fixed');
					$fundDetailInner.removeClass('t0');
					if($isScrollUp) {
						$fundDetailInner.removeClass('t0');
						$layerHead.removeClass('hide');
						$layerClose.removeClass('hide');
					}else{
						$layerHead.addClass('hide');
						$layerClose.addClass('hide');
						$fundDetailInner.addClass('t0');
					}
					if($layerFoot) $layerFoot.addClass('hidden');
				}
			}else{
				//scroll fixed tab and top
				if($tabScrollFixed) {
					if($tabScrollFixedStart < $scrollST) {
						$tabScrollFixed.addClass('fixed');
					}else{
						$tabScrollFixed.removeClass('fixed t0');
					}
				}
				//scroll fixed top area
				if($topScrollFixed) {
					if($topScrollFixedStart < $scrollST) {
						$topScrollFixed.addClass('fixed');
					}else{
						$topScrollFixed.removeClass('fixed t0');
					}
				}
				if($headH < $scrollST) {
					if($isScrollUp) {
						if($tabFixed) {
							$tabFixed.removeClass('t0');
						}else if($tabScrollFixed) {
							$tabScrollFixed.removeClass('t0');
						}
						if($topFixed) {
							$topFixed.removeClass('t0');
						}else if($topScrollFixed) {
							$topScrollFixed.removeClass('t0');
						}
						$layerHead.removeClass('hide');
						$layerClose.removeClass('hide');
					}else{
						if($tabFixed) {
							$tabFixed.addClass('t0');
						}else if($tabScrollFixed) {
							$tabScrollFixed.addClass('t0');
						}
						if($topFixed) {
							$topFixed.addClass('t0');
						}else if($tabScrollFixed) {
							$topScrollFixed.addClass('t0');
						}
						$layerHead.addClass('hide');
						$layerClose.addClass('hide');
					}
				}else{
					if($tabFixed) {
						$tabFixed.removeClass('t0');
					}else if($tabScrollFixed) {
						$tabScrollFixed.removeClass('t0');
					}
					if($topFixed) {
						$topFixed.removeClass('t0');
					}else if($topScrollFixed) {
						$topScrollFixed.removeClass('t0');
					}
					$layerHead.removeClass('hide');
					$layerClose.removeClass('hide');
				}
			}
			$nowScroll = $scrollST;
		}
		$scrollArea[0].removeEventListener('scroll', $scrollfnc);
		$scrollArea[0].addEventListener('scroll', $scrollfnc);
	}
}

var _swiperFnc = {
	init : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		var $swiperLib;
		var $swiperObj = this;
		var $swiperWrap = $('.custom-swiper-wrap', $parentTgt);
		var $swiperSlide = $('> .swiper-box > .swiper-wrapper > .swiper-slide',$swiperWrap);
		if($swiperWrap.length) {
			$swiperWrap.each(function() {
				$swiperObj.setSwiper($(this));
			});
		}
	},
	setSwiper : function(target) {
		var $wrap = $(target);
		var $swiperBox = $('> .swiper-box', $wrap);
		var $swiperSlide = $('> .swiper-wrapper > .swiper-slide', $swiperBox);
		var $swiperPagination = $('> .swiper-control-box .swiper-pagination , > .swiper-pagination', $wrap).length ? $('> .swiper-control-box .swiper-pagination, > .swiper-pagination', $wrap) : null;
		
		if($swiperSlide.length == 1){//slide 개수가 한개일때 
			var $baseOpt = {
				autoplay: false,
				loop: false,
				resistanceRatio : 0,
			}
			$wrap.find('> .swiper-control-box , > .swiper-pagination').hide();
		}else{//slide 개수가 한개 이상일때
			var $baseOpt = {
				speed: 600,//공통
				loop: true,//공통
				// 필수 옵션
				observer: true,
				observeParents: true,
				a11y: {
					paginationBulletMessage: '{{index}}번 슬라이드 이동',
					prevSlideMessage: '이전 슬라이드 이동',
					nextSlideMessage: '다음 슬라이드 이동'
				},
			}
		}
		
		var $customOpt = $wrap.data();
		var $swiperOpt = $.extend(true, $baseOpt, $customOpt);
		
		if($('.swiper-pagination', $wrap).hasClass('num-type') == false) {//pagination default
			$swiperOpt.pagination = {
				el : $swiperPagination,
				type : 'bullets',
				clickable : true
			}
		}else{//pagination num type
			if($('.swiper-pagination', $wrap).hasClass('ir-main') == true){
				$swiperOpt.pagination = {
					el : $swiperPagination,
					type : 'bullets',
					clickable : true,
					renderBullet : function (index,className){
						return '<button type="button" class="' + className + ' bul' + (index+1) + '">'+ (index+1) +'</button>'
					}
				}
				var total = $('.swiper-slide', $wrap).length;
				$('.swiper-control-box > .swiper-total', $wrap).text(total);
			}else{
				$swiperOpt.pagination = {
					el : $swiperPagination,
					type : 'bullets',
					clickable : true,
					renderBullet : function (index,className){
						return '<button type="button" class="' + className + ' bul' + (index+1) + '">'+ (index+1) +'</button>'
					}
				}
			}
		}
		
		if($wrap.data('autoplay') == true) { /* autoplay */
			$swiperOpt.autoplay = {}
			// autoplay-delay 값이 0일 때, false로 인식되는 오류
			// 조건값 세분화
			if($swiperOpt.autoplayDelay == undefined || $swiperOpt.autoplayDelay  == null){
				$swiperOpt.autoplay.delay = 6000;
			}else{
				$swiperOpt.autoplay.delay  = $wrap.data('autoplay-delay');
			}
			
			$swiperOpt.autoplay.disableOnInteraction = false;

			$('.swiper-play', $wrap).off('click.share').on('click.share',function() {
				$(this).hide();
				$('.swiper-stop', $wrap).show();
				$swiperLib.autoplay.start();
			});
			$('.swiper-stop', $wrap).off('click.share').on('click.share',function() {
				$(this).hide();
				$('.swiper-play', $wrap).show();
				$swiperLib.autoplay.stop();
			});
		}
		
		var $swiperLib = new Swiper($swiperBox, $swiperOpt);
		$wrap.data('swiper-lib', $swiperLib);
	},
}
//carousel swiper
var _swiperCarouselFnc = {
	init : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		var $swiperWrap = $('.carousel-swiper-wrap', $parentTgt);
		var $btnPrev =$('.swiper-button-prev',$swiperWrap);
		var $btnNext =$('.swiper-button-next',$swiperWrap);

		if($swiperWrap.length) {
			var settings = {
				spaceBetween:12,
				slidesPerView:'auto',
				watchSlidesVisibility : true,
				watchSlidesProgress : true,
				navigation : {
					prevEl : $btnPrev,
					nextEl : $btnNext,
				},
			}
			var swiperCarousel = new Swiper('.carousel-swiper-wrap .swiper-container',settings);
		}
	},
}
//gallery swiper
var _swiperGalleryFnc = {
	init : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		var $swiperWrap = $('.gallery-swiper-wrap', $parentTgt);
		$('.gallery-thumb .swiper-slide', $parentTgt).each(function(){
			$(this).css('width',$(this).find('a').width() + 48);
		});
	
		var $thumbBox = $('.gallery-thumb', $swiperWrap);
		var $thumbIdx = $('.swiper-slide', $thumbBox).index();
		if($swiperWrap.length) {
			var galleryThumb = new Swiper('.gallery-thumb .swiper-container',{
				spaceBetween:0,
				slidesPerView:'auto',
				watchSlidesVisibility : true,
				watchSlidesProgress : true,
			});
			var galleryTop = new Swiper('.gallery-top .swiper-container',{
				threshold:30,//터치 민감도
				autoHeight: true,
				thumbs : {
					swiper : galleryThumb,
				},
			});
			
		}
	}
}

var _foldItemCaseFnc = {
	init : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		var $foldItemCaseObj = this;
		$('.fold-item-case .btn-fold', $parentTgt).off('click.share').on('click.share',function(){
			_foldItemCaseFnc.foldact();
		});
	},
	foldact : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		var $this = $('.fold-item-case .btn-fold', $parentTgt);
		var $itemCase = $this.closest('.fold-item-case');
		var $content = $('.fold-content', $itemCase);

		if($this.hasClass('active')) {
			$this.attr('aria-expanded', 'true').removeClass('active');
			$content.attr('aria-hidden', 'false').slideUp();
		}else{
			$this.attr('aria-expanded', 'true').addClass('active');
			$content.attr('aria-hidden', 'false').slideDown();
		}
	}
}

var _uiRangeSlider = {
	init: function($parentTgt){
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		var rangeObj = this;
		if(!$('.range-slider-case .range-slider-bar', $parentTgt).length) return; //range slide �붿냼 �놁쓣�� �꾨옒 �뚯뒪 �ㅽ뻾�섏� �딆쓬
		
		$('.range-slider-case .range-slider-bar', $parentTgt).each(function() {
			var $this = $(this);
			rangeObj.setRange($this);
		});
	},
	setRange : function(target) {
		var $target = $(target);
		if(!$target.data('label')) return;
		var $label = $target.data('label').split(',');
		var $min = $target.data('min');
		var $max = $target.data('max');
		var $firstSet  = $target.data('first-val');
		var $lastSet = $target.data('last-val');
		var $stepSet = $target.data('step');
		var $labeHtml = '';
		var $ulEl = document.createElement('ul');

		$('.range-slider', $target).slider({
			range: true,
			min: $min,
			max: $max,
			values: [$firstSet , $lastSet],
			step: $stepSet,
			// orientation: "vertical",
			slide: function(event, ui) {//callback
				// console.log('min value', ui.values[0]);//�꾩옱 理쒖냼媛�
				// console.log('max value', ui.values[1]); //�꾩옱 理쒕�媛�
			}
		});
		
		$.each($label, function(i, val) {
			$labeHtml += '<li><span>' + val.replace(' ', '') + '</span></li>'
		});
		
		$($ulEl).addClass('range-value').append($labeHtml);
		
		$target.append($ulEl);
	}
}
var _compareFloatFoldFnc = {
	init : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		var $compareFloatObj = this;
		var $comapreSticky = $('.sticky-compare-wrap', $parentTgt);
		if($comapreSticky.length) {
			$('.btn-go-top', $parentTgt).css({'bottom' : 66});
		}
		$('.sticky-compare-wrap .btn-compare-open', $parentTgt).off('click.share').on('click.share',function() {
			var $wrap = $(this).closest('.sticky-compare-wrap');
			if($(this).hasClass('active')) {
				$compareFloatObj.close($wrap);
			}else{
				$compareFloatObj.open($wrap);
			}
		});
	},
	open : function(target) {
		var $compareFloatObj = this;
		var $wrap = $(target);
		var $btnOpen = $('.btn-compare-open', $wrap);
		var $compareBox = $('.sticky-compare-box', $wrap);
		var $comapreHead = $('.sticky-compare-head', $compareBox);
		var $comapreBody = $('.sticky-compare-body', $compareBox);
		var $comapreConts = $('.sticky-compare-content', $compareBox);
		var $btnCompareCase = $('.btn-compare-case', $compareBox);
		var $winH = window.innerHeight;
		var $maxH = 0;
		if($btnCompareCase.length) {
			$maxH = window.innerHeight - $comapreHead.outerHeight() - $btnCompareCase.outerHeight() - 120;
		}else{
			$maxH = window.innerHeight - $comapreHead.outerHeight() - 120;
		}

		$('body').addClass('pop');
		$wrap.prepend('<div class="accessbilityLast offscreen" tabindex="0" aria-hidden="true"></div>');
		$wrap.append('<div class="accessbilityFirst offscreen" tabindex="0" aria-hidden="true"></div>');
		$compareBox.attr('tabindex', '0').before('<div class="layerMask" aria-hidden="true" style="opacity:0;transition:opacity .7s ease;"></div>');
		setTimeout(function() {
			$('.layerMask', $wrap).css({
				'opacity' : '1'
			});
		}, 100);

		$btnOpen.attr('aria-expanded', 'true').addClass('active');
		$comapreConts.css({
			'max-height' : $maxH
		})
		$comapreBody.attr('aria-hidden', 'false').slideDown();

		$('.layerMask', $wrap).off('click.share').on('click.share',function() {
			$compareFloatObj.close(target);
		});
		$('.accessbilityFirst', $wrap).off('focusin.share').on('focusin.share',function() {
			$btnOpen.focus();
		});
		$('.accessbilityLast', $wrap).off('focusin.share').on('focusin.share',function() {
			$compareBox.focus();
		});

	},
	close : function(target) {
		var $wrap = $(target);
		var $btnOpen = $('.btn-compare-open', $wrap);
		var $compareBox = $('.sticky-compare-box', $wrap);
		var $comapreBody = $('.sticky-compare-body', $compareBox);

		$('.layerMask', $wrap).css({
			'opacity' : '0'
		});
		setTimeout(function() {
			$('.layerMask', $wrap).remove();
		}, 700);
		$('.accessbilityLast', $wrap).remove();
		$('.accessbilityFirst', $wrap).remove();
		$('body').removeClass('pop');
		$btnOpen.attr('aria-expanded', 'false').removeClass('active');
		$comapreBody.attr('aria-hidden', 'true').slideUp();
	}
}

var _compareSelectFnc = {
	init : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		
		var $compareSelectObj = this;
		$('.compare-info-wrap', $parentTgt).off('click.share').on('click.share',function(){
			var $selectWrap = $('.compare-select-wrap');
			$('.compare-select-opt', $selectWrap).hide();
		})
		$('.compare-select-wrap', $parentTgt).off('click.share').on('click.share', function(e) {
			e.stopPropagation();
		});
		$('.compare-select-wrap .btn-compare-select', $parentTgt).off('click.share').on('click.share', function() {
			var $this =$(this);
			var $selectWrap = $this.closest('.compare-select-wrap');
			var $selectOpt = $this.next();

			$('.compare-select-opt', $selectWrap).hide();

			if($selectOpt.is(':hidden')) {
				$selectOpt.show();
			}else{
				$selectOpt.hide();
			}
		});
		$('.compare-select-wrap .compare-select-opt .opt', $parentTgt).off('click.share').on('click.share',function() {
			var $this =$(this);
			var $thisTxt = $this.text();
			var $color = ($this.hasClass('blue') && 'blue') || ($this.hasClass('orange') && 'orange') || ($this.hasClass('green') && 'green') || ($this.hasClass('purple') && 'purple')
			var $selectWrap = $this.closest('.compare-select-wrap');
			var $selectCase = $this.closest('.compare-select-case');
			var $btnSelect = $('.btn-compare-select', $selectCase);

			$btnSelect.removeClass('blue orange green purple').addClass($color);
			$('span', $btnSelect).text($thisTxt);
			$('.compare-select-opt', $selectCase).hide();
		});
	},
}

var _imgScrollFnc = {
	init : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		var $imgScrollObj = this;
		var $imgScroll = $('.img-wrap.scroll-type', $parentTgt);
		
		if($imgScroll.length > 0) {
			$imgScroll.each(function() {
				$imgScrollObj.imgScroll($(this));
			});
		}
	},
	imgScroll : function(target){
		var $imgBox = $(target);
		$imgBox.append('<span class="arrow-left" aria-hidden="true"></span><span class="arrow-right" aria-hidden="true"></span>')
		$imgBox.scroll(function(){
			var $imgBox = $(target);
			var $nowPos = $imgBox.scrollLeft();
			$('.arrow-left', $imgBox).hide();
			$('.arrow-right', $imgBox).hide();
			if($nowPos == 0 ){
				$('.arrow-left', $imgBox).show();
				$('.arrow-right', $imgBox).show();
			}
		});
		$imgBox.scrollStop(function(ev){
			$('.arrow-left', $imgBox).show();
			$('.arrow-right', $imgBox).show();
		});
	}, 
}

var _consumerGnbFnc = {
	init : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		if($('#kmsWrap').hasClass('consumerCont')){
			var $consumerGnbWrap = $('.menu-list-box', $parentTgt);
			var $constBox = $('.conts-box', $consumerGnbWrap);
			
			$constBox.each(function(i) {
				var $this = $(this);
				var $titBox = $this.prev();

				$('.btn-expand', $titBox).addClass('foldup');
				$constBox.hide().attr('aria-hidden', 'true');

				$('.btn-expand', $titBox).off('click.share').on('click.share', function() {
					var $this = $(this);
					var $wrap = $consumerGnbWrap;
					var $titBox = $this.closest('.tit-box');
					var $accoLi = $this.closest('li');
					var $conts = $titBox.next();

					if($conts.is(':hidden')) {
						$this.removeClass('foldup');
						$conts.show().attr('aria-hidden', 'false');
						$this.closest('li').siblings().find('.btn-expand').addClass('foldup');
						$this.closest('li').siblings().find('.conts-box').hide();
						$this.closest('li').siblings().removeClass('active');
					}else{
						$this.addClass('foldup');
						$conts.hide();
					}
				});
			});
			$('.btn-pop', $consumerGnbWrap).each(function(){
				$('.btn-pop', $consumerGnbWrap).off('click.share').on('click.share', function() {
					var $this = $(this);
					var $accoLi = $this.closest('li');
	
					if($accoLi.hasClass('active')){
						$accoLi.removeClass('active');
					}else{
						$accoLi.addClass('active').siblings().removeClass('active');
						$accoLi.siblings().find('.btn-expand').addClass('foldup');
						$accoLi.siblings().find('.conts-box').hide();
					}
				});
			});
		}
	},
}

var _etcFnc = {
	init : function($parentTgt) {
		$parentTgt	= (!$parentTgt || !$parentTgt.length)?$('body'):$parentTgt;
		//step
		var $stepWrap = $('.step-location-wrap', $parentTgt);
		if($stepWrap.length > 0){
			var $viewStepNum = $('.view-step-num',$stepWrap);
			$viewStepNum.find('span').each(function(){
				var $stepWrap = $('.step-location-wrap', $parentTgt);
				var nowStepNum = $('.step-tit > .num', $stepWrap).text();
				if(nowStepNum == $(this).text()){
					if($(this).hasClass('now') == false){
						$(this).addClass('now');
					}
				}
			});
		}
	},
}

/* loading
	실행 : loading('open') / 닫기 : loading('close') 
*/
function loading(action) {
	var $eleModule = $('.loading-wrap');
	var winH = $(window).height();
	var winW = $(window).width();
	var trgH = $eleModule.outerHeight();
	var trgW = $eleModule.outerWidth();

	$eleModule.css({'top':((winH-trgH)/2 + $(window).scrollTop()), 'left':(winW - trgW)/2});

    if(action == 'open'){
		setTimeout(function(){
			$eleModule.addClass('is-active');
        });
	}
    else if (action == 'close') {
        setTimeout(function(){
			$eleModule.removeClass('is-active'); 
        });
	}
}

$(document).ready(function() {
	/*
	FontFaceOnload("SpoqaHanSansNeo", {
		success: function() {
			// console.log('FontFaceOnload success');
			_gnbFnc.init();//GNB
			_globalSearchFnc.init();//통합검색
			_subMenuSelect.init();//서브메뉴 리스트 팝업
			_goToTopFnc.init();//탑으로 가기버튼
			_inpFocusFnc.init();//input focus 삭제 버튼 노출
			_calendarFnc.init();//달력
			_tableScrollFnc.init();//테이블 고정 스크롤
			_accordianFnc.init();//아코디언 박스
			_toggleBtnFnc.init();//토글버튼
			_scrapToggleFnc.init();//scrap 버튼
			_boardDetailFnc.init();//게시판 상세 수정삭제 팝업
			_popupFnc.init();//팝업
			_footerSwiper.init();//footer swiper 
			_stickyBtnFnc.init();//sticky button box 
			_tabBoxFnc.init();//tab box
			_compareFloatFoldFnc.init();//금융상품 비교하기 sticky bar
			_foldItemCaseFnc.init();//폴딩박스 접힘/펼침 기능
			_uiRangeSlider.init();//ui range slide
			_compareSelectFnc.init();//비교하기 select
			_checkInfomationFnc.init();//확인하세요
			_scrollHideShowFnc.init();//header scroll 방향에 따른 노출여부
			_swiperFnc.init();//swiper
			_swiperCarouselFnc.init();//swiper-Carousel 타입(좌우버튼)
			_swiperGalleryFnc.init();//gallery swiper 국내투자 시작하기 
			_imgScrollFnc.init();//img 가로 스크롤
			_consumerGnbFnc.init();//소비자보호포탈 전체메뉴
			_etcFnc.init(); //기타
		},
		error: function() {
			// console.log('FontFaceOnload error');
		},
		timeout: 5000 // in ms. Optional, default is 10 seconds
	});
	*/
});