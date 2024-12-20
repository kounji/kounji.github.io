/*
 * [SEPTEM] UI Dev Team
 * @description [SEPTEM] Core Library
 */
;(function () {
	var $document = $(document),
		$window = $(window),
		Class = {
			winHeight: 0,
			winWidth: 0,
			upWinSY: 0,
			downWinSY: 0,
			popZIndex: 7000,
			popBtn: 0,
			theme: 'light',
			isMobile: navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i) ? true : false,
			isWide: false,
			evTouchStart: navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i) ? 'touchstart' : 'mousedown',
			evTouchMove: navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i) ? 'touchmove' : 'mousemove',
			evTouchEnd: navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i) ? 'touchend' : 'mouseup',
			evTouchCancel: navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i) ? 'touchcancel' : 'mouseover',
			/* debug */
			debug: function debug(str) {
				var $debug = $('#debug');
				if ($debug.length < 1) {
					$debug = $('<div id="debug"></div>');
					$('body').append($debug);
				}
				$debug.append('<span>' + str + '</span>').scrollTop(1000000);
			},
			/* initBrowser */
			initBrowserOnce: function initBrowserOnce() {
				var ua = navigator.userAgent;
				if ((/Android/i).test(ua)) {
					$('html').addClass('Android').data('browser', 'Android');
					var androidversion = parseFloat(ua.slice(ua.indexOf("Android") + 8));
				} else if ((/iPad|iPhone|iPod/i).test(ua)) {
					$('html').addClass('iOS').data('browser', 'iOS');
					let ver = function iOSversion(){
						var v = (ua).match(/nma-plf-os=(\d+).(\d+).?(\d+)?/);
						return v != null && [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
					}
					if(ver()[0] == 12) $('html').addClass('v12');
					if(ver()[0] == 14 && ver()[1] == 0) $('html').addClass('v140');
					if(ver()[0] == 17 && ver()[1] == 1 && ver()[2] == 1) $('html').addClass('v1711');
				} else if ((/Chrome/i).test(ua)) {
					$('html').addClass('Chrome').data('browser', 'Chrome');
				}
			},
			/* a preventDefault */
			initHrefOnce: function initHrefOnce() {
				$document
					.on('click', 'a[href="javascript:;"], a[href="#"]', function (e) {
						e.preventDefault();
					});
			},
			keypadCall: function keypadCall(state, dviceHeight){
				if (state == 'UP'){
					$('html').addClass('keypad');
					Class.upWinSY = window.scrollY;
				} else {
					$('html').removeClass('keypad');
					Class.downWinSY = window.scrollY;
					if($('html').hasClass('v12')) {
						$document.scrollTop(Class.downWinSY);
					}
				}
			},
			/* initGotoTopOnce */
			initGotoTopOnce: function initGotoTopOnce() {
				setTimeout(function () {
					window.scrollTo(0, 1)
				}, 100);
			},
			/* Toast �명똿 */
			initToastOnce: function initToastOnce() {
				var toastTimer = null;
				$document
					.on('show', '#js_toast', function (e, msg) {
						var $toast = $(this);
						$toast.html(msg);
						$toast.addClass('active');
						if(!$toast.find('.visible').length){
							clearTimeout(toastTimer);
							toastTimer = setTimeout(function () {
								$toast.trigger('hide');
							}, 6000);
						} else {
							setTimeout(function(){
								$('.container:visible .content:visible').css({'paddingBottom' : $('#js_toast').find('.inr').outerHeight() + 40});
							},200)
						}
					})
					.on('hide', '#js_toast', function () {
						$(this).removeClass('active');
						setTimeout(function(){
							$(this).remove();
							$('.container:visible .content:visible').css({'paddingBottom' : ''});
						},200)
					})
					.on('click', '#js_toast', function (e) {
						var $toast = $(this);
						if(!$toast.find('.visible').length){
							$toast.trigger('hide');
						}
						e.preventDefault();
					});
			},
			/* Toast 蹂댁씠湲� */
			toast: function toast(msg) {
				var $toast = $('#js_toast');
				$toast.remove();
				$toast = $('<div id="js_toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" tabindex="0"></div>');
				if($('.pop-wrap:visible:not(.center)').length){
					$toast.appendTo('.pop-wrap:visible .pop-inner');
				} else {
					$toast.appendTo('.container');
				}
				setTimeout(function () {
					$toast.trigger('show', msg);
				}, 100);
			},
			/* toastPopUnder */
			toastPopUnder: function toastPopUnder() {
				if($('#js_toast').hasClass('active')) $('#js_toast').addClass('type');
			},
			/* showLoading */
			showLoading: function showLoading(e, callback) {
				var $loading = $('#loading');
				if ($loading.length < 1) {
					$loading = $('<div id="loading"><span class="lottie inr" data-path="/content/json/motion_obj_loading.json" title="Loading"></span></div>').appendTo('body');
					if(callback instanceof Function) {callback();}
					$loading.addClass('active');
				} else {
					if(callback instanceof Function) {callback();}
					$loading.addClass('active');
				}
				Class.initLottieOnce();
			},
			/* hideLoading */
			hideLoading: function hideLoading(e, callback) {
				if(callback instanceof Function) {callback();}
				$('#loading').find('svg').remove();
				$('#loading').removeClass('active');
			},
			/* showDimed */
			showDimed: function showDimed(time, callback) {
				var $dimed = $('#dimed');
				if ($dimed.length < 1) {
					$dimed = $('<div id="dimed"></div>').appendTo('body');
					if(callback instanceof Function) {callback();}
					$dimed.addClass('active');
					setTimeout(function () {
						$dimed.removeClass('active');
					}, time ? time : 700);
				} else {
					if(callback instanceof Function) {callback();}
					$dimed.addClass('active');
					setTimeout(function () {
						$dimed.removeClass('active');
					}, time ? time : 700);
				}
			},
			/* hideDimed */
			hideDimed: function hideDimed(e, callback) {
				if(callback instanceof Function) {callback();}
				$('#dimed').remove();
			},
			/* initPopOpenCloseOnce */
			initPopOpenCloseOnce: function initPopOpenCloseOnce() {
				$document
					.on('show', '.pop-wrap', function (e, arg) {
						var $pop = $('.pop-wrap#' + arg.id);
						$pop.removeClass('center bottom full');
						$pop.addClass(arg.type);
						$pop.find('.pop-title').text(arg.title);
						$pop.find('.pop-content').text(arg.msg);
						$pop.trigger('openPopup');
					})
					.on('hide', '.pop-wrap', function (e, arg) {
						var $popup = $(this);
						if (typeof arg == 'number') {
							$popup.each(function(){
								var $zIndex = $(this).css('zIndex');
								if($zIndex == arg) $(this).trigger('closePopup');
							});
						} else if (typeof arg == 'string') {
							if (arg !== 'all') {
								$popup.each(function(){
									var $id = $(this).attr('id');
									if($id == arg) $(this).trigger('closePopup');
								});
							} else if (arg == 'all') {
								$popup.trigger('closePopup');
							}
						}
					});
			},
			/* popOpen */
			// 媛쒕컻�먯꽌 �먯껜 媛쒕컻 吏꾪뻾
			popOpen: function popOpen(id, type, title, msg) {
				var $pop = $('#' + id);
				if ($pop.length < 1) {
					var pop = '';
					pop += '<div role="dialog" aria-hidden="true" id="' + id + '" class="pop-wrap">'
					pop += '<div class="pop-inner"><div class="pop-header"><div class="pop-title"><span class="blind">�앹뾽</span></div></div>';
					pop += '<div class="pop-body"><div class="pop-content"></div>';
					pop += '</div><div class="pop-footer"><div class="btn-group-progress"><button type="button" class="btn js_pop-close">痍⑥냼</button><button type="button" data-popup="pop3" class="btn primary">�뺤씤</button></div></div>';
					pop += '<button type="button" aria-label="�リ린" class="pop-close js_pop-close"></button></div></div>';
					$pop = $(pop);
					$pop.appendTo('#insert-area');
					setTimeout(function () {
						$pop.trigger('show', {
							id,
							type,
							title,
							msg
						});
					}, 100);
				} else {
					$pop.trigger('show', {
						id,
						type,
						title,
						msg
					});
				}
			},
			// 媛쒕컻�먯꽌 �먯껜 媛쒕컻 吏꾪뻾
			/* popClose*/
			popClose: function popClose(arg) {
				var $pop = $('.pop-wrap');
				$pop.trigger('hide', arg);
			},
			getPath : function getPath() {
				var locHref = location.href;
				var locOrigin = location.origin;
				var locPath = locHref.replace(locOrigin, "");
				return locPath;
			},
			/* initPopupOnce */
			initPopupOnce: function initPopupOnce() {
				var oScrollTop;
				$document
					.off('.pop')
					.on('click.pop', '.js_pop-open', function (e) {
						e.preventDefault();
						var $openPopBtn = $(this);
						$openPopBtn.attr('data-popOpenBtn', 'popBtn'+Class.popBtn++);
						if(Class.getPath().indexOf('/pub/') > -1) {
							const $openPopId = $(this).data('popup');
							$('#' + $openPopId).trigger('openPopup');
						}
					})
					.on('click.pop', '.pop-wrap .js_pop-close', function () {
						if(Class.getPath().indexOf('/pub/') > -1) {
							const $closePopId = $(this).closest('.pop-wrap').attr('id')
							$('#' + $closePopId).trigger('closePopup');
						}
					})
					.on('click.pop','.pop-wrap .js_btn-click',function(e){
						var $popWrap = $(this).closest('.pop-wrap');
						var $contScrollTop = $popWrap.hasClass('move') ? $popWrap.find('.move-cont .inr') : $popWrap.find('.pop-inner .pop-content');
						$contScrollTop.scrollTop(0);
						if(!$popWrap.hasClass('expanded')){
							console.log('add expanded');
							$(this).closest('.pop-wrap').addClass('expanded');
						} else {
							console.log('remove expanded');
							$(this).closest('.pop-wrap').removeClass('expanded');
						}
						e.preventDefault();
						e.stopPropagation();
					})
					.on(Class.evTouchMove+'.pop', '.pop-wrap .js_btn-touch', function(){
						var $popWrap = $(this).closest('.pop-wrap');
						var $contScrollTop = $popWrap.hasClass('move') ? $popWrap.find('.move-cont .inr') : $popWrap.find('.pop-inner .pop-content');
						$contScrollTop.scrollTop(0);
						if(!$popWrap.hasClass('expanded')){
							console.log('add expanded');
							$(this).closest('.pop-wrap').addClass('expanded');
						} else {
							console.log('remove expanded');
							$(this).closest('.pop-wrap').removeClass('expanded');
						}
					})
					.on('keydown.pop', '.pop-wrap', function (event) {
						if (event.key === 'Escape') {
							const $popID = $(this).attr('id');
							$('#' + $popID).trigger('closePopup');
						}
					})
					.on('openPopup.pop', '.pop-wrap, .move-pop-wrap', function (e, callback) {
						Class.winWidth = window.innerWidth;
						Class.winHeight = window.innerHeight;
						var $popId = $(this);
						var $popWrap = $('.pop-wrap, .move-pop-wrap')
						var $popInr = $popId.find('.pop-inner');
						var $popTitle = $popId.find('.pop-title');
						var $contentH = $document.find('.container:visible > .content:visible').innerHeight();
						oScrollTop = $document.scrollTop();
						console.log('%coScrollTop : ' + oScrollTop,'color:yellowgreen');
						if(!$popId.hasClass('no-start-dimed')) $('.wrap>header.header, .wrap>.container, .wrap>footer.footer, .side-menu').attr('aria-hidden', 'true');
						if ($popTitle.html() == '') $popTitle.html('<span class="blind">�앹뾽</span>');
						if (!$popTitle.length) $popInr.prepend('<h2 class="pop-title" tabindex="0"><span class="blind">�앹뾽</span></h2>');
						$popWrap.attr('aria-hidden', 'true');
						$popId.css({zIndex: Class.popZIndex++}).fadeIn(100,function () {
							if ($popId.hasClass('bottom') || $popId.hasClass('expandable')) {
								$popId.off().on('transitionend', function(){
									$popId.off();
									if(callback instanceof Function) {callback(); }
								});
								$popId.find('.pop-inner').css({'bottom':'0%'});
								var popHeaderH = $popId.find('.pop-header').length ? $popId.find('.pop-header').outerHeight() : 0;
								var popContH = $popId.find('.pop-content').outerHeight() > (Class.winHeight * 0.6) ? Class.winHeight * 0.6 : $popId.find('.pop-content').outerHeight() ;
								var popFooterH = $popId.find('.pop-footer').length ? $popId.find('.pop-footer').outerHeight() : 0;
								if ($popId.hasClass('expandable') && !$popId.hasClass('heightFix')) { // expandable type
									$popInr.css('height', Math.floor(popHeaderH + popContH + popFooterH) + 32);
								} else if($popId.hasClass('expandable') && $popId.hasClass('heightFix')){ // expandable no-start-dimed type
									$popInr.css('height', Class.winHeight - $contentH);
								}
								// if ($popId.hasClass('heightFix')) { // expandable no-start-dimed type
								// 	$popInr.css('height', Class.winHeight - $contentH);
								// }
								if ($popId.find('.pop-content').hasClass('heightFix')) { //bottom type
									$popId.find('.pop-content').css('min-height', popContH);
									//console.log('pop-content heightFix')
								}
							} else {
								if(callback instanceof Function) {callback(); }
							}
							$popId.find('.pop-body').stop().animate({scrollTop:0},50);
							if($('html').hasClass('iOS')){
								if(!$popId.hasClass('no-start-dimed')) $popId.find('.pop-title').attr('tabindex', 0).focus();
							} else {
								//Android
								if(!$popId.hasClass('no-start-dimed'))
									setTimeout(function(){
										if(!$('html').hasClass('keypad')) $popId.find('.pop-title').attr('tabindex', 0).focus();
									},600);
							}
						}).attr('aria-hidden', 'false');

						$('body').css('overflow', 'hidden');
						if ($popId.hasClass('expandable')  || $popId.hasClass('move')) {
							Class.resizePopup($popId);
						}
						if($('.lottie').length){
							Class.initLottieOnce();
						}
						Class.setLayout();
					})
					.on('closePopup.pop', '.pop-wrap', function (e, callback) {
						const $popId = $(this);
						const $openPopId = $(this).attr('id');
						const $popOpenBtn = 'popBtn'+ --Class.popBtn;
						const $targetBtn = $('.js_pop-open[data-popup=' + $openPopId + '][data-popOpenBtn=' + $popOpenBtn + ']');
						if ($popId.hasClass('bottom') || $popId.hasClass('expandable')) $popId.find('.pop-inner').css('bottom', '-100%');
						if ($popId.hasClass('expanded')) $popId.removeClass('expanded');
						$popId.fadeOut(100,function(){ // FadeOut �좊땲硫붿씠�� 醫낅즺�섎뒗 �쒖젏�� 肄쒕갚�⑥닔 �몄텧(媛쒕컻�붿껌)
							if($('.pop-wrap:visible').length == 0){
								$('.wrap>header.header, .wrap>.container, .wrap>footer.footer, .side-menu').attr('aria-hidden', 'false');
								$('body').css('overflow', '');
							} else {
								var maxPopZindx = function(){
									var maxZindex = Math.max.apply(null,
										$('.pop-wrap:visible').map(function() {
											var z = $(this).css('zIndex');
											z = parseInt(z, 10);
											return z;
										})
									);
									var maxZindexlayer = $('.pop-wrap:visible').filter(function() {
										var z = $(this).css('zIndex');
										z = parseInt(z, 10);
										return (z == maxZindex);
									});
									return $.trim(maxZindexlayer.attr('id'));
								}
								var maxPopId = maxPopZindx();
								$('.pop-wrap[id="' + maxPopId + '"]').attr('aria-hidden', 'false');
							}
							if(callback instanceof Function) {callback(); } // Wrap 媛앹껜媛� ��젣�덈릺�� 踰꾧렇 �덉쓬.
						}).attr('aria-hidden', 'true');
						$document.scrollTop(oScrollTop);
						$targetBtn.focus();
						Class.setLayout();
					});
			},
			/* resize popup */
			resizePopup: function resizePopup(popup) {
				var $pop = $(popup);
				var $popInr = $pop.hasClass('move') ? $pop.find('.move-cont') : $pop.find('.pop-inner');
				var contScrollTop;
				var resizer = {
					touched : false,
					clientsY : 0,
					deltasY : 0,
					start : (e) => {
						//resizer.touched = true;
						resizer.clientsY = e.touches[0].clientY;
						$popInr[0].removeEventListener('touchmove', resizer.move);
						$popInr[0].removeEventListener('touchend', resizer.end);
						$popInr[0].addEventListener('touchmove', resizer.move, { passive: false });
						$popInr[0].addEventListener('touchend', resizer.end, { passive: false });
						contScrollTop = $pop.hasClass('move') ? $pop.find('.move-cont .inr').scrollTop() : $pop.find('.pop-content').scrollTop();
						//console.log('resizePopup start', contScrollTop);
						if($pop.hasClass('expanded')){
							resizer.touched = false;
						} else {
							resizer.touched = true;
						}
					},
					move : (e) => {
						if (resizer.touched === true) {
							e.preventDefault();
						} else {
							resizer.touched = false;
						}
					},
					end : (e) => {
						resizer.deltasY = e.changedTouches[0].clientY - resizer.clientsY;
						//console.log(e.target.tagName, resizer.deltasY > 10 , contScrollTop, !$(e.target).is('input'));
						if (resizer.deltasY > 10 && contScrollTop === 0 && !$(e.target).is('input')) {
							$pop.removeClass('expanded');
						} else if (-10 > resizer.deltasY && !$(e.target).is('input')) {
							$pop.addClass('expanded');
						}
						resizer.touched = false;
						resizer.finish();
					},
					finish : () => {
						$popInr[0].removeEventListener('touchmove', resizer.move);
						$popInr[0].removeEventListener('touchend', resizer.end);
					}
				}
				$popInr[0].addEventListener('touchstart', resizer.start, { passive: false });
			},
			/* jsTooltip */
			initTooltipOnce: function initTooltipOnce() {
				Class.winWidth = window.innerWidth;
				Class.winHeight = window.innerHeight;
				$(document)
					.on('click', '.tooltip button.js-btn-tooltip', function (e) {
						const $tooltipBtn = $(this);
						const $tooltipWrap = $tooltipBtn.closest('.tooltip');
						const $tooltipCont = $tooltipWrap.find(".tooltip-cont");
						const $tooltipContH= Math.floor($tooltipCont.outerHeight());
						let $bodyPd = 24;
						if($('html').hasClass('small') || $('html').hasClass('xsmall')){
							$bodyPd = 16;
						}
						if($tooltipCont.closest('.pop-wrap.center').length){
							$tooltipCont.css({
								'width': Class.winWidth - ($bodyPd * 4) + 'px'
							});
						} else {
							$tooltipCont.css({
								'width': Class.winWidth - ($bodyPd * 2) + 'px'
							});
						}
						$('.tooltip').removeClass('active');
						$('.tooltip').find('button.js-btn-tooltip').attr('aria-expanded', false);
						if (!$tooltipWrap.hasClass('active')) {
							$tooltipWrap.addClass('active');
							$tooltipBtn.attr('aria-expanded', true);
						} else {
							$tooltipWrap.removeClass('active');
							$tooltipBtn.attr('aria-expanded', false);
						}
					})
					.on('click', '.tooltip .tooltip-close', function () {
						const $tooltipClose = $(this);
						const $tooltipWrap = $tooltipClose.closest('.tooltip');
						const $tooltipBtn = $tooltipWrap.find(".js-btn-tooltip");
						$tooltipWrap.removeClass('active');
						$tooltipBtn.attr('aria-expanded', false).focus();
					});
			},
			/* jsAccDim */
			jsAccDim: function jsAccDim() {
				$('.js-btn-acc-dim')
					.on('click',function () {
						const $AccDimBtn = $(this);
						const $accWrap = $AccDimBtn.closest('.account-wrap');
						const $AccDim = $accWrap.find(".account-dim");
						$(".account-wrap .account-dim").hide();
						$(".account-wrap .js-btn-acc-dim").attr('aria-expanded', false);
						if ($AccDim.length > 0) {
							$AccDim.css({'display' : ''});
							$AccDimBtn.attr('aria-expanded', true);
						}
					});
				$('.account-dim .btn-delete')
					.on('click', function () {
						const $AccDimClose = $(this);
						const $AccDim = $AccDimClose.closest('.account-dim');
						const $AccDimBtn = $(this).closest('.account-wrap').find(".js-btn-acc-dim");
						$AccDim.css({'display' : 'none'});
						$AccDimBtn.attr('aria-expanded', false).focus();
					});
			},
			/* jsTabs */
			jsTabs: function jsTabs() {
				var $scrollCon = $('.tab-wrap').parents('.pop-wrap').length ? $('.pop-body') : $('html, body');
				$('.tab-wrap').find('.tab-nav.swipe')
					.on('tabSetting', function () {
						var $ul = $(this);
						clearTimeout(timeTabNavPos);
						var timeTabNavPos = setTimeout(function(){
							var _idx = 0;
							$ul.find('li .tab-item').each(function(index){
								if($(this).hasClass('active')) _idx = index;
							});
							var _curLeft = $ul.scrollLeft();
							var _left = $ul.find('li').eq(_idx).offset().left;
							$ul.stop().animate({scrollLeft: _left + _curLeft - 24}, {duration:200, easing:'linear'});
						},100);
					});
				$('.tab-wrap').find('.tab-item:not(.no_js)')
					.on('click', function () {
						const $clickedTab = $(this);
						const $tabWrap = $clickedTab.closest('.tab-wrap');
						const $tabNav = $clickedTab.closest('.tab-nav');
						const $panelId = $clickedTab.attr('aria-controls');
						const $btnTabFold = $tabWrap.find('.btn-tab-fold');
						$clickedTab.addClass('active').attr('aria-selected', 'true').parent().siblings().find('.tab-item').removeClass('active').attr('aria-selected', 'false');
						if ($tabWrap.hasClass('fold')) {
							$btnTabFold.attr('aria-controls', $panelId);
							$btnTabFold.removeClass('folded');
							$tabWrap.find('#' + $panelId).find('.tab-nav').removeClass('full');
						}
						if ($tabWrap.hasClass('sticky')) {
							$scrollCon.scrollTop($tabWrap.offset().top - 48);
						}
						$('#' + $panelId).addClass('active').siblings('.tab-panel').removeClass('active');
						$tabNav.trigger('tabSetting');
					});
				$('.tab-wrap').find('.btn-tab-fold')
					.on('click', function () {
						const $btnTabFold = $(this);
						const $tabNav = $btnTabFold.prev('.tab-nav');
						if($btnTabFold.attr('aria-controls')){
							const $panelId = $btnTabFold.attr('aria-controls');
							if (!$btnTabFold.hasClass('folded')) {
								$btnTabFold.addClass('folded').attr('aria-selected', 'true');
								$('#' + $panelId).addClass('active').siblings('.tab-panel').removeClass('active');
								$('#' + $panelId).find('.tab-nav').addClass('full');
							} else {
								$btnTabFold.removeClass('folded').attr('aria-selected', 'false');
								$('#' + $panelId).find('.tab-nav').removeClass('full');
							}
						} else {
							if(!$tabNav.hasClass('full')){
								$tabNav.addClass('full');
							} else {
								$tabNav.removeClass('full');
							}
						}
					});
			},
			/* jsFold */
			initFoldOnce: function initFoldOnce() {
				$document
					.on('click', '.js_show-btn', function (e) {
						var $jsFoldBtn = $(this);
						var target = $jsFoldBtn.data('target') ? $jsFoldBtn.data('target') : 'undefined';
						var $textTo = $jsFoldBtn.data('text');
						var $text = $jsFoldBtn.text();
						var $target;
						if (typeof target !== 'undefined') {
							$target = $('.js_show-wrap[id="' + target + '"]');
						}
						if (!$jsFoldBtn.hasClass('show')) {
							$jsFoldBtn.addClass('show').attr('aria-expanded', 'true');
							$target.slideDown(200).addClass('show').attr('aria-hidden', 'false').attr('tabindex', 0).focus();
							if($jsFoldBtn.is("input")){
								$jsFoldBtn.prop('checked', true);
							}
							if ($jsFoldBtn.closest('.please-check-wrap').length) {
								if ($jsFoldBtn.closest('.bottom').length) {
									$('html, body').stop().animate({
										scrollTop: $document.height()
									});
								} else {
									$jsFoldBtn.closest('.pop-inner').stop().animate({
										scrollTop: $document.height()
									});
								}
							}
						} else {
							$jsFoldBtn.removeClass('show').attr('aria-expanded', 'false').attr('tabindex', 0).focus();
							$target.slideUp(200).removeClass('show').attr('aria-hidden', 'true'); //.attr('tabindex', 0).focus();
							if($jsFoldBtn.is("input")){
								$jsFoldBtn.prop('checked', false);
							}
						}
						if (!$jsFoldBtn.data('text')=='') {
							$jsFoldBtn.data('text', $text).text($textTo);
						}
						if($('.form-textarea textarea').length){
							var $textarea = $('.form-textarea textarea');
							for (let i = 0; i < $textarea.length; i++) {
								$textarea[i].style.height = 'auto';
								$textarea[i].style.height = $textarea[i].scrollHeight + 'px';
							}
						}
						if($('.item-input-inner .input-text:not([readonly], [disabled])').length || $('.form-textarea textarea:not([readonly], [disabled])').length){
							$('.item-input-inner .input-text:not([readonly], [disabled]), .form-textarea textarea:not([readonly], [disabled])').each(function(){
								if($(this).val().length){
									$(this).next('.btn-reset').css({'display':'block','opacity':'1'});
								}
							});
						}
					})
					.on('click', '.js_show-wrap .btn-close', function (e) {
						var target = $(this).closest('.js_show-wrap').attr('id');
						var $target = $('.js_show-btn[data-target="' + target + '"]');
						$(this).closest('.js_show-wrap').slideUp(200).removeClass('show').attr('aria-hidden', 'true');
						$target.removeClass('show').attr('aria-expanded', 'false').focus();
					})
					.on('click', '.js_btn-fold', function () {
						var $jsBtnFold = $(this);
						if(!$jsBtnFold.siblings('ul').hasClass('open')) {
							$jsBtnFold.addClass('folded').siblings('ul').addClass('open');
						} else{
							$jsBtnFold.removeClass('folded').siblings('ul').removeClass('open');
						}
					});
			},
			/* jsScrollSpy */
			initScrollspyOnce: function initScrollspyOnce() {
				if($('.scrollspy-nav').length){
					var el = $('.scrollspy-nav');
					var elPosition = el.offset();
					var navHeight = el.height();
					var headerHeight = el.closest('.pop-wrap').length ? el.closest('.pop-wrap').find('.pop-header').outerHeight() : $('header.header').outerHeight();
					$document
						.off('.spy')
						.on('scrollspySetting.spy', '.scrollspy-menu', function () {
							var $swipe = $(this);
							var _idx = 0;
							$swipe.find('li a').each(function(index){
								if($(this).hasClass('active')) _idx = index;
							});
							var _curLeft = $swipe.scrollLeft();
							var _left = $swipe.find('li').eq(_idx).offset().left;
							$swipe.stop().animate({
								scrollLeft: _left + _curLeft - 24
							}, 100);
						})
						.on('click.spy', '.scrollspy-nav .nav-item', function(e){
							var $obj = $(this);
							var current = $obj.attr('data-item');
							headerHeight = $obj.closest('.pop-wrap').length ? $obj.closest('.pop-wrap').find('.pop-header').outerHeight() : $('header.header').outerHeight();
							navHeight = el.outerHeight();
							$obj.closest('.scrollspy-nav').find('.nav-item').attr('aria-pressed',false).removeAttr('title');
							$obj.attr('aria-pressed',true).attr('title','�ㅽ겕濡� �대룞');
							e.preventDefault();
							if(!$obj.closest('.pop-wrap').length){
								if($('#' + current).hasClass('accordion-item') && !$('#' + current).find('.js_accordion-btn').hasClass('collapsed')) {
									$('#' + current).find('.js_accordion-btn').trigger('click');
									$('#' + current).closest('.scrollspy-cont').find('.cont-list:visible').trigger('scrollspyResize');
									setTimeout(function(){
										$('html,body').scrollTop($('#' + current).offset().top - (navHeight + headerHeight));
									},200);
								} else {
									$('html,body').stop().animate({scrollTop:$('#' + current).offset().top - (navHeight + headerHeight)});
								}
							} else {
								$('.pop-body').stop().animate({scrollTop:$('#' + current).position().top - (navHeight)});
							}
							$obj.closest('.scrollspy').find('.cont-list:visible').removeAttr('tabindex');
							$('#' + current).attr('tabindex', 0).focus();
							if(!$obj.closest('.scrollspy-nav').hasClass('box')) $obj.closest('.scrollspy-menu').trigger('scrollspySetting');
						})
						.on('click.spy', '.scrollspy-nav .btn-fold', function () {
							var $btn = $(this);
							if (!$btn.prev('ul').hasClass('open')) {
								$btn.addClass('folded');
								$btn.prev('ul').addClass('open');
							} else {
								$btn.removeClass('folded');
								$btn.prev('ul').removeClass('open');
							}
							$btn.closest('.scrollspy-nav').find('.nav-item.active').trigger('click');
						})
						.on('scrollspyResize.spy', '.cont-list:visible' ,function(){
							function getProperties(self) {
								var obj = {};
								obj.elId = $(self).attr('id');
								obj.el = $('#' + obj.elId);
								obj.topOfEl = $(self).closest('body').hasClass('js_scroll-top') || !$(self).closest('.content, .pop-content').find('.scrollspy:nth-of-type(1)').length ? obj.el.offset().top - (navHeight + headerHeight) : obj.el.position().top - (navHeight + headerHeight);
								obj.筠lHeight = obj.el.outerHeight();
								obj.windowPosition = $(self).closest('.pop-wrap').length ? $('.pop-body').scrollTop() : $window.scrollTop();
								obj.windowHeight = $(self).closest('.pop-wrap').length ? $('.pop-wrap').height() : $window.height();
								obj.docHeight = $(self).closest('.pop-wrap').length ? $('.pop-content').outerHeight() + 48 : $document.height();
								obj.navHeight = $('.scrollspy-nav').height();
								return obj;
							}
							var $contList = $(this);
							$contList.each(function(){
								if ($(this).attr('id')) {
									var prop = getProperties(this);
									var topEl = prop.topOfEl - prop.navHeight;
									var elTopAndHeight = prop.topOfEl + prop.筠lHeight;
									var navItem = $document.find('.scrollspy-nav .nav-item');
									if (prop.windowPosition >= topEl && prop.windowPosition < elTopAndHeight) {
											navItem.each(function(index, element){
											if (prop.elId == $(this).attr('data-item')) {
												navItem.removeClass('active').attr('aria-selected',false);
												$(this).addClass('active').attr('aria-selected',true);
											}
										});
									}
									var pageHeight = prop.windowPosition + prop.windowHeight;
									if(pageHeight == prop.docHeight) {
										$('.scrollspy-nav .nav-item').removeClass('active').attr('aria-selected','false');
										$('.scrollspy-nav li:last-child .nav-item').addClass('active').attr('aria-selected','true');
									}
									if(!$contList.closest('.scrollspy').find('.scrollspy-nav').hasClass('box')) $('.scrollspy-menu').trigger('scrollspySetting');
								}
							});
						});
					$window
						.off('.spy')
						.on('scroll.spy', function (e) {
							var isBiggerThanTop = $window.scrollTop() + headerHeight > elPosition.top;
							if (isBiggerThanTop) {
								el.closest('.scrollspy').addClass('sticky');
								$('html').addClass('sticking');
							} else {
								el.closest('.scrollspy').removeClass('sticky');
								$('html').removeClass('sticking');
							}
							if( $window.scrollTop() < 10 ) {
								$('.scrollspy-menu').stop().animate({
									scrollLeft: 0
								}, 100);
								$('.scrollspy-nav .nav-item').removeClass('active').attr('aria-selected','false');
								$('.scrollspy-nav li:first-child .nav-item').addClass('active').attr('aria-selected','true');
							} else {
								el.closest('.scrollspy').find('.cont-list:visible').trigger('scrollspyResize');
							}
						});
					$('.pop-body')
						.off('.spy')
						.on('scroll.spy',function(e){
							var isBiggerThanTop = $document.find('.pop-body').scrollTop() + headerHeight > elPosition.top;
							if (isBiggerThanTop) {
								el.closest('.scrollspy').addClass('sticky');
							} else {
								el.closest('.scrollspy').removeClass('sticky');
							}
							el.closest('.scrollspy').find('.cont-list:visible').trigger('scrollspyResize');
						});
				}
			},
			/* jsAcc */
			initAccordionOnce: function initAccordionOnce() {
				$(document)
					.off('.acc')
					.on('showAllAcc.acc','.accordion-wrap',function(e){
						var $accordionWrap = $(this);
						$accordionWrap.find('.js_accordion-btn').addClass('collapsed').attr('aria-expanded', 'true');
						$accordionWrap.find('.accordion-body').slideDown(200).addClass('show').attr('aria-hidden', 'false');
						e.preventDefault();
					})
					.on('hideAllAcc.acc','.accordion-wrap',function(e){
						var $accordionWrap = $(this);
						$accordionWrap.find('.js_accordion-btn').removeClass('collapsed').attr('aria-expanded', 'false');
						$accordionWrap.find('.accordion-body').slideUp(200).removeClass('show').attr('aria-hidden', 'true');
						e.preventDefault();
					})
					.on('showAcc.acc','.js_accordion-btn',function(e){
						var $accordionBtn = $(this);
						var $target = $accordionBtn.attr('aria-controls');
						var $accordionWrap = $accordionBtn.closest('.accordion-wrap');
						$accordionWrap.find('.js_accordion-btn').removeClass('collapsed').attr('aria-expanded', 'false');
						$accordionWrap.find('.accordion-body').slideUp(200).removeClass('show');
						$accordionBtn.addClass('collapsed').attr('aria-expanded', 'true');
						$('.accordion-body[id="' + $target + '"]').slideDown(200).addClass('show').attr('aria-hidden', 'false');
						e.preventDefault();
					})
					.on('showOneAcc.acc','.js_accordion-btn',function(e){
						var $accordionBtn = $(this);
						var $target = $accordionBtn.attr('aria-controls');
						$accordionBtn.addClass('collapsed').attr('aria-expanded', 'true');
						$('.accordion-body[id="' + $target + '"]').slideDown(200).addClass('show').attr('aria-hidden', 'false');
						e.preventDefault();
					})
					.on('hideAcc.acc','.js_accordion-btn',function(e){
						var $accordionBtn = $(this);
						var $target = $accordionBtn.attr('aria-controls');
						$accordionBtn.removeClass('collapsed').attr('aria-expanded', 'false');
						$('.accordion-body[id="' + $target + '"]').slideUp(200).removeClass('show').attr('aria-hidden', 'true');
						e.preventDefault();
					})
					.on('click.acc', '.js_accordion-btn', function (e) {
						var $accordionBtn = $(this);
						var $accordionWrap = $accordionBtn.closest('.accordion-wrap');
						var isCollapsed = $accordionBtn.hasClass('collapsed');
						if (!isCollapsed) {
							if($accordionWrap.hasClass('each')){
								$accordionBtn.trigger('showOneAcc');
							} else {
								$accordionBtn.trigger('showAcc');
							}
						} else {
							$accordionBtn.trigger('hideAcc');
						}
						e.preventDefault();
					})
					.on('change.acc', '.js_accordion-switch',function(e){
						var $accordionBtn = $(this);
						var $target = $accordionBtn.attr('aria-controls');
						if(!$accordionBtn.prop('checked')){
							$('.accordion-wrap[id="' + $target + '"]').trigger('showAllAcc');
						} else {
							$('.accordion-wrap[id="' + $target + '"]').trigger('hideAllAcc');
						}
						if($accordionBtn.closest('.scrollspy')){
							$accordionBtn.closest('.scrollspy').find('.scrollspy-cont .cont-list:visible').trigger('scrollspyResize');
						}
					});
			},
			/* form �명똿 */
			initFormOnce: function initFormOnce() {
				if($('.item-input-inner .input-text:not([readonly], [disabled])').length || $('.form-textarea textarea:not([readonly], [disabled])').length){
					$('.item-input-inner .input-text:not([readonly], [disabled]), .form-textarea textarea:not([readonly], [disabled])').each(function(){
						if($(this).val().length){
							$(this).next('.btn-reset').css({'display':'block','opacity':'1'});
						}
					});
				}
				$document
					.off('.form')
					.on('change.form', '.term-check.all input:checkbox',function(e){
						var $target = $(this).next('label').find('.title');
						if($target.data('text')){
							var $textTo = $target.data('text');
							var $text = $target.text();
							$target.data('text', $text).text($textTo);
						}
					})
					.on('change.form','.select_box input', function(){
						var $input = $(this);
						var $name = $input.attr('name');
						var $id = $input.attr('id');
						var $type = $input.attr('type');
						if($type=='radio') {
							$('input[name="'+$name+'"]').closest('.item-radio').removeClass('checked');
							$('input[name="'+$name+'"]').closest('.select_box').find('.detail').slideUp(200).removeClass('show');

							$('input[id="'+$id+'"]').closest('.item-radio').addClass('checked');
							$('input[id="'+$id+'"]').closest('.select_box').find('.detail').slideDown(200).addClass('show');
						} else {
							if($input.is(':checked')){
								$input.closest('.item-check, .item-radio').addClass('checked');
								$input.closest('.select_box').find('.detail').slideDown(200).addClass('show');
							} else {
								$input.closest('.item-check, .item-radio').removeClass('checked');
								$input.closest('.select_box').find('.detail').slideUp(200).removeClass('show');
							}
						}
					})
					.on('input.form','.form-textarea textarea', function(){
						this.style.height = 'auto';
						this.style.height = this.scrollHeight + 'px';
						if($('html').hasClass('v1711') && $('html').hasClass('keypad')) {
							console.log('textarea ', Class.upWinSY, $document.scrollTop());
							$document.scrollTop(Class.upWinSY);
						}

					})
					.on('addStateValue.form', '.item-input-inner .input-text', function () {
						const input = $(this);
						const itemInput = input.closest('.item-input');
						const siblingsLabel = itemInput.siblings(".item-label");
						const closestLabel = itemInput.closest(".form-item").siblings(".item-label");
						itemInput.addClass('focus');
						if(input.val().trim()!==''){
							$(this).closest('.item-input-inner:not(.no-js)').find('.btn-reset').css({'display':'block','opacity':'1'});
							itemInput.addClass('typing');
							input.addClass('inputed');
						}
						if (siblingsLabel.length > 0 || closestLabel.length > 0) {
							siblingsLabel.add(closestLabel).addClass('highlight');
						}
					})
					.on('removeStateValue.form', '.item-input-inner .input-text', function (e) {
						const inputText = $(this);
						const itemInput = inputText.closest('.item-input');
						const siblingsLabel = itemInput.siblings('.item-label');
						const closestLabel = itemInput.closest('.form-item').siblings('.item-label');
						itemInput.removeClass('focus typing inputed');
						// setTimeout(function(){
						// 	inputText.closest('.item-input-inner:not(.no-js)').find('.btn-reset').css({'opacity':'0','display':'none'});
						// },300);
						if (siblingsLabel.length > 0 || closestLabel.length > 0) {
							siblingsLabel.add(closestLabel).removeClass('highlight');
						}
						e.preventDefault();
					})
					.on('focus.form', '.item-input-inner .input-text:not([readonly], [disabled], [type=password])', function () { //focusin
						if (!$(this).prop('readonly')) {
							$(this).trigger('addStateValue');
						}
					})
					.on('input.form', '.item-input-inner .input-text:not([readonly], [disabled], [type=password])', function () { //input
						if($(this).val().trim() !== '') {
							$(this).addClass('inputed');
							$(this).closest('.item-input-inner:not(.no-js)').find('.btn-reset').css({'display':'block','opacity':'1'});
						}
					})
					.on('keyup.form, keypress.form', '.item-input-inner .input-text:not([readonly], [disabled], [type=password])', function () { //input
						if ($(this).val().trim() !== '') {
							$(this).trigger('addStateValue');
						}
						//else {
							//$(this).trigger('removeStateValue');
						//}
					})
					// .on('keyup.form', '.item-input-inner .input-text:not([readonly], [disabled], [type=password])', function () {
					// 	if (!$(this).prop('readonly')) {
					// 		$(this).trigger('addStateValue');
					// 	}
					// })
					.on('blur.form', '.item-input-inner .input-text:not([readonly], [disabled], [type=password])', function () {
						$(this).trigger('removeStateValue');
					})
					.on('click.form ' + Class.evTouchEnd + '.form', '.item-input-inner:not(.no-js) button.btn-reset', function (e) {
						const btnReset = $(this);
						const itemInput = btnReset.closest('.item-input');
						const inputText = itemInput.find('.input-text');
						const siblingsLabel = itemInput.siblings(".item-label");
						const closestLabel = itemInput.closest(".form-item").siblings(".item-label");
						if (inputText.length) {
							itemInput.removeClass('typing error');
							siblingsLabel.add(closestLabel).removeClass('error');
							inputText.removeClass('inputed').val('').focus();
							btnReset.css({'display':'none'});
							// if(itemInput.find('.shy-text')){
							// 	itemInput.find('.shy-text .price').html('')
							// }
						}
					})
					.on('addTAStateValue.form', '.text-textarea', function () {
						const $this = $(this);
						if($this.val().trim()!==''){
							$this.closest('.item-textarea').find('.btn-reset').css({'display':'block','opacity':'1'});
						}
					})
					.on('removeTAStateValue.form', '.text-textarea', function (e) {
						const $this = $(this);
						// setTimeout(function(){
						// 	$this.closest('.item-textarea').find('.btn-reset').css({'opacity':'0','display':'none'});
						// },300);
					})
					.on('focus.form', '.item-textarea.has-reset .text-textarea', function () {
						if (!$(this).prop('readonly')) {
							$(this).trigger('addTAStateValue');
						}
					})
					.on('keyup.form', '.item-textarea.has-reset .text-textarea', function () {
						if ($(this).val().trim() !== '') {
							$(this).trigger('addTAStateValue');
						} else {
							$(this).trigger('removeTAStateValue');
						}
					})
					.on('blur.form', '.item-textarea.has-reset .text-textarea', function () {
						$(this).trigger('removeTAStateValue');
					})
					.on('click.form ' + Class.evTouchEnd + '.form', '.item-textarea button.btn-reset', function (e) {
						const btnReset = $(this);
						const itemTextarea = btnReset.closest('.item-textarea');
						const textareaText = itemTextarea.find('.text-textarea');
						if (itemTextarea.length) {
							textareaText.val('').focus();
							btnReset.css({'display':'none'});
						}
						textareaText.css('height','auto');
					});
			},
			/* toggle �명똿 */
			initToggleOnce: function initToggleOnce() {
				$document
					.on('click','.toggle-text .toggle-switch',function(){
						var $target = $(this);
						var $textTo = $target.data('text');
						var $text = $target.text();
						if( $target.data('text')){
							$target.data('text', $text).text($textTo);
						}
					});
			},
			/* swiper js */
			initSwiperOnce: function initSwiperOnce() {
				if ($('.swiper-container').length > 0) {
					var $swiperContainer = $('.swiper-container');
					$swiperContainer.each(function (i, target) {
						if ( this.swiper != null ) {
							this.swiper.destroy();
						}
						var $swiperObj = $(this);
						var $perView = 'auto';
						if ( $swiperObj.data('perview') ){
							$perView = $swiperObj.data('perview');
						}
						var option = {
								observer: true,
								observeParents: true,
								centeredSlides: true,
								loop: false,
								loopedSlides: 1,
								slidesPerView : $perView,
								spaceBetween : 0,
								loopAdditionalSlides: 0,
								//slideToClickedSlide: false,
								watchOverflow : true,
								effect: 'slide',
								autoplay: {
									delay: 6000,
									disableOnInteraction: false,
									pauseOnMouseEnter: true
								},
								autoHeight: false,
								hashNavigation:{
									watchState: true,
								},
								pagination: {
									el:  $swiperObj.find('.swiper-pagination'),
									clickable: true
								},
								navigation: {
									nextEl: $swiperObj.find('.swiper-button-next'),
									prevEl: $swiperObj.find('.swiper-button-prev'),
								},
								on: {
									init: function () {
										$swiperObj.find('.swiper-slide').attr('aria-hidden', true).removeAttr('tabindex');
										$swiperObj.find('.swiper-slide.swiper-slide-active').attr('aria-hidden', false).attr('tabindex', 0);
									},
									transitionEnd: function () {
										$swiperObj.find('.swiper-slide').attr('aria-hidden', true).removeAttr('tabindex');
										$swiperObj.find('.swiper-slide.swiper-slide-active').attr('aria-hidden', false).attr('tabindex', 0);
										$swiperObj.find('.swiper-pagination-bullet').attr('title', '');
										$swiperObj.find('.swiper-pagination-bullet-active').attr('title', '�좏깮��');
									}
									// slideChangeTransitionEnd: function () {
									// 	$swiperObj.find('.swiper-slide').attr('aria-hidden', true).removeAttr('tabindex');
									// 	$swiperObj.find('.swiper-slide.swiper-slide-active').attr('aria-hidden', false).attr('tabindex', 0);
									// 	$swiperObj.find('.swiper-pagination-bullet').attr('aria-pressed', false);
									// 	$swiperObj.find('.swiper-pagination-bullet-active').attr('aria-pressed', true);
									// }
								}
							};
						if ($swiperObj.hasClass('fraction')) {
							if ($swiperObj.find('.swiper-slide').length > 1) {
								option.loop = true;
								option.loopAdditionalSlides = 1;
								//option.slideToClickedSlide = true;
								option.pagination.type = 'fraction';
								option.pagination.renderFraction = (currentClass, totalClass) => {
									return '<strong class="' + currentClass + '"></strong>/<span class="' + totalClass + '"></span>'
								}
								option.watchOverflow = false;
								if ($swiperObj.hasClass('banner')) {
									option.spaceBetween = 0;
									option.autoHeight = true;
								} else {
									option.spaceBetween = 14 ;
								}
							} else {
								option.loop = false;
								option.navigation = false;
								option.pagination = false;
								$swiperObj.find('.swiper-button-control').length && $swiperObj.find('.swiper-button-control').hide();
								$swiperObj.find('.swiper-slide').attr('data-swiper-slide-index','0');
							}
							if(!$swiperObj.hasClass('autoplay')) option.autoplay = false;
							option.on = {
								init: function () {
									$swiperObj.find('.swiper-slide').attr('aria-hidden', false).attr('tabindex', 0);
									$swiperObj.find('.swiper-slide-duplicate').attr('aria-hidden', true).removeAttr('tabindex');;
								},
							}
						// } else if ($swiperObj.hasClass('autoplay') && !$swiperObj.hasClass('fraction')) {
						// 	option.spaceBetween = 24;
						} else if ($swiperObj.hasClass('prev_next')) {
							option.autoplay = false;
							option.spaceBetween = 24;
							option.autoHeight = true;
						} else if ($swiperObj.hasClass('autoheight')) {
							option.autoHeight = true;
						} else if ($swiperObj.hasClass('overflow')) {
							option.autoplay = false;
							option.spaceBetween = 12;
							option.centeredSlides = false;
						} else if ($swiperObj.hasClass('center')) {
							option.autoplay = false;
							option.spaceBetween = 20;
						} else if ($swiperObj.hasClass('acc')) {
							option.autoplay = false;
							option.spaceBetween = 12;
							option.pagination.type = 'fraction';
							option.pagination.renderFraction = (currentClass, totalClass) => {
								return '<strong class="' + currentClass + '"></strong>/<span class="' + totalClass + '"></span>'
							}
						} else if ($swiperObj.hasClass('mymenu')) {
							option.autoplay = false;
							option.spaceBetween = 40;
						} else if ($swiperObj.hasClass('main01')) {
							var sideScale = .9; //�묒そ 移대뱶 鍮꾩쑉, 以묒븰 移대뱶�� 1
							var sideOpa = 1; //�묒そ 移대뱶 �щ챸��
							var sidePositon = 0; //�ъ씠�� �ㅼ��� 1�� 寃쎌슦 �꾩튂px
							var sideX = -1 * (sidePositon);
							option.autoplay = false;
							option.slidesPerView = 'auto';
							option.loop = true,
							option.watchSlidesProgress = true, //progress 媛� 諛쏆븘�ㅺ린
							option.on = {
								progress: function () {
									var r = this.slides.length;
									for (var s = 0; s < r; s += 1) {
										var t = this.slides[s]
											, o = t.progress
											, i = Math.abs(o);
										var a = 1;
										i > 1 && (a = .3 * (i - 1) + 1);
										var l = o * a * sideX + "px"
											, c = 1 - (1 - sideScale) * i
											, u = r - Math.abs(Math.round(o));
										t.style.transform = `translateX(${l}) scale(${c})`,
										t.style.zIndex = u;
										var opa = Math.min(Math.max( 1-( (1 - sideOpa) * i), 0), 1);
										t.style.opacity = opa;
									};
								},
								setTransition: function (s) { //�ㅼ��댄봽�� �뺢린�� �꾩긽 �쒓굅
									for (let t = 0; t < this.slides.length; t += 1) {
										const r = this.slides[t];
										r.style.transitionDuration = `${s}ms`;
									}
								},
								init: function () {
									$swiperObj.find('.swiper-slide').attr('aria-hidden', false).attr('tabindex', 0);
									$swiperObj.find('.swiper-slide-duplicate').attr('aria-hidden', true).removeAttr('tabindex');;
								},
							}
							option.loopAdditionalSlides = 1; //留덉�留� �ㅼ��댄봽 諛섎났 �덈릺�� �꾩긽
							option.pagination.type = 'fraction';
							option.pagination.renderFraction = (currentClass, totalClass) => {
								return '<strong class="' + currentClass + '"></strong>/<span class="' + totalClass + '"></span>'
							}
						} else if ($swiperObj.hasClass('main02')) {
							option.spaceBetween = 24;
							option.pagination.type = 'fraction';
							option.pagination.renderFraction = (currentClass, totalClass) => {
								return '<strong class="' + currentClass + '"></strong>/<span class="' + totalClass + '"></span>'
							}
						} else if ($swiperObj.hasClass('main03')) {
							option.autoplay = false;
							option.spaceBetween = 24;
						} else if ($swiperObj.hasClass('sn')) {
							option.autoplay = false;
							option.spaceBetween = 12;
							if ($swiperObj.find('.swiper-slide').length > 1) {
								option.loop = true;
								option.pagination.type = 'fraction';
								option.pagination.renderFraction = (currentClass, totalClass) => {
									return '<strong class="' + currentClass + '"></strong>/<span class="' + totalClass + '"></span>'
								}
							} else {
								option.loop = false;
								option.pagination = false;
							}
						} else {
							option.autoplay = false;
							option.spaceBetween = 12;
						}
						var swiper = new Swiper($swiperObj, option);
						$(this).data('swiper', swiper);
						var $swp = target.swiper;
					});
					$swiperContainer.find('.swiper-pagination-bullet').attr('title', '');
					$swiperContainer.find('.swiper-pagination-bullet-active').attr('title', '�좏깮��');
					$swiperContainer.find('.swiper-pagination-bullet').each(function (index, item) {
						$(this).attr({
							"aria-label": index + 1 + '踰덉㎏ �щ씪�대뱶'
						});
					});
				}
			},
			/* �뚮쭏 : ��젣�꾩슂 */
			initSetThemeOnce: function initSetThemeOnce() {
				if(Class.getPath().indexOf('/pub/') > -1 && Class.getPath().indexOf('/mockup/') == -1) {
					$document
						.on('click', '.js-theme', function () {
							if (Class.theme === 'light') {
								$('html').attr('data-theme', 'dark');
								$(this).addClass('changed');
								Class.theme = 'dark';
							} else {
								$('html').attr('data-theme', 'light');
								$(this).removeClass('changed');
								Class.theme = 'light';
							}
						})
						.on('click', '#ta-chk-test', function () {
							var css = '<link rel="stylesheet" href="../../css/ta.css"></link>';
							if($(this).prop('checked')) {
								$('head').append(css);
							}
						});

					//mcTheme(); //�뚮쭏 �뚯뒪��
					function mcTheme(){
						var $pub = '<div class="pub_test">'
									+'<input type="checkbox" id="ta-chk-test"class="ta-check-test"><label for="ta-chk-test">泥�</label>'
									+'<button type="button" aria-label="紐⑤뱶蹂�寃�" class="btn-nav-theme js-theme"></button>'
									+'<select id="theme-sel">'
									+ '<option value="mc-color-01">01</option>' //泥�줉
									+ '<option value="mc-color-02">02</option>' //�몃옉(*)
									+ '<option value="mc-color-03">03</option>' //二쇳솴
									+ '<option value="mc-color-04">04</option>' //�곕텇��(*)
									+ '<option value="mc-color-05">05</option>' //�섎컯
									+ '<option value="mc-color-06">06</option>' //�곕낫��
									+ '<option value="mc-color-07">07</option>' //肄섑뵆�쇱썙
									+ '<option value="mc-color-08">08</option>' //�섎뒛(*)
									+ '<option value="mc-color-09">09</option>' //�쒖븞(*)
									+ '<option value="mc-color-10">10</option>' //�뚮옉
									+ '<option value="mc-color-11">11</option>' //吏꾪뙆��
									+ '<option value="mc-color-12">12</option>' //�뱀깋
									+ '<option value="mc-color-13">13</option>' //����
									+ '<option value="mc-color-14">14</option>' //媛덉깋
									+ '<option value="mc-color-15">15</option>' //�뚯깋
									+ '<option value="mc-color-16">16</option>' //媛먯깋
									+ '</select>';
									+'</div>';
						if(Class.getPath().indexOf('/pub/') > -1) {
							$('body').prepend($pub);
						}

						$('#theme-sel').on('change',function() {
							var $value = $(this).val();
							$('body').removeClass(function (index, css) {
								return (css.match(/\mc-color-\S+/g) || []).join(' ');
							}).addClass($value);
						});
					}
				}
			},
			/* 紐⑹뾽�� : ��젣�꾩슂 */
			initMockupOnce : function initMockupOnce() {
				if(Class.getPath().indexOf('/MOCKUP/') > -1 || Class.getPath().indexOf('/mockup/') > -1) {
					$('html').addClass('mockup');
					$('a, button, label').each(function(){
						var $this = $(this);
						if( $this.attr('onclick') !== undefined ) {
							if( $this.css('position') == 'static' ) {
								$this.css('position','relative');
							}
							$this.prepend('<span class="btn-intentd"></span>');
						}
					})
				}
			},
			initLikeOnce : function initLikeOnce(){
				$document
					.on('click', '.btn-like', function(){
						const $btn = $(this);
						$btn.toggleClass('active');
					});
			},
			// sortable
			initSortableOnce: function initSortableOnce() {
				if($('.js_sortable').length > 0){
					var $sortable = $('.js_sortable');
					$sortable.each(function(){
						var $sortable = $(this);
						var $handle = '.btn-drag';
						if($sortable.hasClass('menu-apply-list')) {
							$handle = 'li';
						}
						var sortable = Sortable.create($sortable[0], {
							//direction:'horizontal',
							ghostClass: 'ghost',
							animation: 300,
							filter: '.disabled',
							preventOnFilter: true,
							scroll: true,
							handle: $handle,
							// containment:'.menuSetUp.ui-sortable',
							// items:'li',
							group: {
								put: function (to, from) {
									return to.el.className !== from.el.className //&& from.el.className != 'js_sortable'
								},
								pull: function (to, from) {
									return to.el.className !== from.el.className //&& from.el.className != 'js_sortable'
								}
							}
						});
					})
				}
				$document
					.on('change', '.switch input',function(e){
						var target = $(this).data('target');
						if(target){
							if(!$(this).prop('checked')) {
								$('#'+ target).removeClass('disabled');
							} else {
								$('#'+ target).addClass('disabled');
							}
						}
					});
			},
			/* 硫붿씤 怨꾩쥖�곸뿭 */
			mainAccDrag: function mainAccDrag() {
				var $body = $('body');
				var $btn = $('.main-expanded-btn');
				var $box = $('.main-expand');
				var mainResizer = {
					touched : false,
					clientsY : 0,
					deltasY : 0,
					start : (e) => {
						mainResizer.touched = true;
						mainResizer.clientsY = e.touches[0].clientY;
						$btn[0].removeEventListener('touchmove', mainResizer.move);
						$btn[0].removeEventListener('touchend', mainResizer.end);
						$btn[0].addEventListener('touchmove', mainResizer.move, { passive: false });
						$btn[0].addEventListener('touchend', mainResizer.end, { passive: false });
					},
					move : (e) => {
						if (mainResizer.touched === true) {
							e.preventDefault();
						} else {
							mainResizer.touched = false;
						}
					},
					end : (e) => {
						mainResizer.deltasY = e.changedTouches[0].clientY - mainResizer.clientsY;
						if (mainResizer.deltasY > 10) {
							$body.addClass('js_expanded');
							$box.addClass('js_expanded');
						} else if (-10 > mainResizer.deltasY) {
							$body.removeClass('js_expanded');
							$box.removeClass('js_expanded');
						}
						mainResizer.touched = false;
						mainResizer.finish();
					},
					finish : () => {
						$btn[0].removeEventListener('touchmove', mainResizer.move);
						$btn[0].removeEventListener('touchend', mainResizer.end);
					}
				}
				$btn[0].addEventListener('touchstart', mainResizer.start, { passive: false });
			},
			/* �ㅽ겕濡� �낅떎�� : 議고쉶, 硫붿씤 怨꾩쥖�곸뿭 */
			asScroll : function asScroll() {
				var $scrollCon = $(window);
				var $body = $('body');
				var $scrollS =  0;
				var $scrollE = 0;
				var $btnTopMore = $('.btn-top-more');
				if ($('.content-in').length > 0 && $body[0].style.overflow !== 'hidden') {
					$body.addClass('js_scroll-top');
					var oContentBottom = document.querySelector('.content-bottom');
					var oContentTop = document.querySelector('.content-top');
					var $ContentTop = $('.content-top');
					// var $switchChekbox = $('.switch.abs input');
					var contentTopH = oContentTop.prevClientHeight ? oContentTop.prevClientHeight : oContentTop.clientHeight;
					var contentTopH2 = 92; //異뺤냼�먯쓣��
					var headerH = $('.content-top[class*=mn]').length ? 48 : 0;
					if ($ContentTop.hasClass('type2')){
						console.log('mna.type2:�쇰컲硫붿씤-怨꾩쥖誘몃벑濡�');
						contentTopH2 = 154;
					} else if ($ContentTop.hasClass('mna')) {
						console.log('mna:�쇰컲硫붿씤');
						contentTopH2 = 217;
					} else if ($ContentTop.hasClass('mnm')||$ContentTop.hasClass('mnn')){
						console.log('mnm:鍮꾨줈洹몄씤, mnn:鍮꾪쉶��/媛꾪렪�뚯썝媛���');
						contentTopH2 = 128;
					} else if ($ContentTop.parent('.content').hasClass('cm-m-notice')||$ContentTop.parent('.content').hasClass('cm-m')){
						console.log('肄뺣え��');
						contentTopH2 = 52;
					}
					$('.content-bottom').css('min-height',$('body').height()+10+'px');
					oContentTop.prevClientHeight = contentTopH;
					oContentBottom.style.paddingTop = contentTopH - headerH + 'px';
					oContentBottom.style.paddingBottom = '';
					let timer = 0;
					const throttle = function() {
						if(timer) {
							return;
						}
						timer = setTimeout(function() {
							$scrollE = $scrollCon.scrollTop(); //window.scrollY || window.pageYOffset;
							if( $scrollE < 10){ //�ㅽ겕濡� 理쒖긽��
								$body.removeClass('js_scroll-down js_scroll-up');
								$body.addClass('js_scroll-top');
								// contentTopH = oContentTop.clientHeight;
								oContentBottom.style.paddingTop = contentTopH - headerH + 'px';
								oContentBottom.style.paddingBottom = '';
								$('body').removeClass('js_expanded');
							} else {
								if ( $scrollS <= $scrollE ) { //�ㅽ겕濡� �대┫ ��
									$body.addClass('js_scroll-down');
									$body.removeClass('js_scroll-top js_scroll-up');
									oContentBottom.style.paddingTop = contentTopH2 - headerH + 'px';
									oContentBottom.style.paddingBottom = contentTopH - contentTopH2 - headerH + 40 + 'px';
								} else { // if ( $scrollS >= $scrollE+10 ) { //�ㅽ겕濡� �щ┫ ��
									$body.addClass('js_scroll-up');
									$body.removeClass('js_scroll-top');
									$('.main-expand, body').removeClass('js_expanded');
								}
								if( $('.main-expand').is(':visible')){
									$('.main-expand, body').removeClass('js_expanded');
								}
								$btnTopMore.removeClass('expand').attr('aria-expanded','false');
							}
							$scrollS = $scrollE;
							timer = 0;
						}, 16.66);
					}
					$scrollCon.on('scroll',function() {
						throttle();
					});
				}
				$btnTopMore.off('click').on('click', function(){
					if($btnTopMore.hasClass('expand')) {
						$btnTopMore.removeClass('expand').attr('aria-expanded','false');
						$body.removeClass('js_expanded');
						$body.addClass('js_scroll-down');
					} else {
						$btnTopMore.addClass('expand').attr('aria-expanded','true');
						$body.addClass('js_expanded');
						$body.removeClass('js_scroll-down');
					}
				});
			},
			// lottie
			initLottieOnce: function initLottieOnce(){
				var $lottie = $('.lottie');
				$lottie.each(function (i, element) {
					if ( $(element).data('lottie') == undefined ) {
						var animation = bodymovin.loadAnimation({
							container: element,
							renderer : 'svg',
							loop : element.getAttribute('data-loop') ? element.getAttribute('data-loop') : true,
							autoplay: true,
							path : element.getAttribute('data-path'),
						});
						$(element).data('lottie', animation);
					}
				});
			},
			// calendar date select
			dateSelect: function dateSelect() {
				$document
					.on('click', '.select-list .col button', function () {
						var $btn = $(this);
						$btn.closest('li').addClass('selected').siblings('li').removeClass('selected');
						setTimeout(function(){
							$btn.closest('.col').trigger('listMove');
						},0);
					})
					.on('listMove','.select-list .col',function(){
						var $col = $(this);
						var $selLi = $col.find('.selected');
						var $curTop = Math.floor($col.scrollTop());
						$col.find('li').attr('aria-hidden', true).find('button').removeAttr('title');
						$selLi.attr('aria-hidden', false).find('button').attr('title','�좏깮��');
						$selLi.prev('li').attr('aria-hidden', false);
						$selLi.prev('li').prev('li').attr('aria-hidden', false);
						$selLi.next('li').attr('aria-hidden', false);
						$selLi.next('li').next('li').attr('aria-hidden', false);
						if($selLi.length > 0){
							var $moveSize = Math.floor($selLi.position().top - 84);
							//$col.stop().animate({scrollTop : $curTop + $moveSize}, 100 );
							$col.scrollTop($curTop + $moveSize);
						}
					});
					$('.select-list .col').on('scroll', function (e) {
						var $lis = $(this).find('li');
						var $containerTop = Math.floor($(this).closest('.select-list').offset().top + 88);// + 88;
						for (let i = 0; i < $lis.length; i++) {
							if (Math.floor($($lis[i]).offset().top) == $containerTop) {
									$($lis[i]).addClass('selected').attr('aria-hidden', false).find('button').attr('title','�좏깮��');
									$($lis[i]).siblings('li').removeClass('selected').attr('aria-hidden', true).find('button').removeAttr('title');
									$($lis[i]).prev('li').attr('aria-hidden', false);
									$($lis[i]).prev('li').prev('li').attr('aria-hidden', false);
									$($lis[i]).next('li').attr('aria-hidden', false);
									$($lis[i]).next('li').next('li').attr('aria-hidden', false);
								}
							}
						e.preventDefault();
					});
					$('.select-list .col').trigger('listMove');
			},
			/* �덉씠�꾩썐 �명똿 */
			setLayout: function setLayout() {
				console.log('%csetLayout','color:yellowgreen');
				Class.winHeight = window.innerHeight;
				Class.winWidth = window.innerWidth;
				var $contentH = $document.find('.container:visible > .content:visible').innerHeight();
				if ($('.pop-wrap').is(':visible')) {
					$('.pop-wrap:visible').each(function () {
						var $popId = $(this);
						var $popInr = $popId.find('.pop-inner');
						var $popTitle = $popId.find('.pop-title');
						if($popId.css('zIndex') == 'auto') $popId.css({zIndex: Class.popZIndex++});
						if (!$popTitle.length) $popInr.prepend('<h2 class="pop-title" tabindex="0"><span class="blind">�앹뾽</span></h2>');
						if ($popTitle.html() == '') $popTitle.html('<span class="blind">�앹뾽</span>');
						if (($popId.hasClass('bottom') || $popId.hasClass('expandable')) && $popId.is(':visible') ) {
							$popInr.css({'bottom':'0%'});
							var popHeaderH = $popId.find('.pop-header').length ? $popId.find('.pop-header').outerHeight() : 0;
							var popContH = $popId.find('.pop-content').outerHeight() > (Class.winHeight * 0.6) ? Class.winHeight * 0.6 : $popId.find('.pop-content').outerHeight() ;
							var popFooterH = $popId.find('.pop-footer').length ? $popId.find('.pop-footer').outerHeight() : 0;
							if ($popId.hasClass('expandable') && !$popId.hasClass('heightFix')) { //�믪씠�� 留욊쾶�⑤뒗 �앹뾽
								//$popInr.css('height', '');
								setTimeout(function(){
									$popInr.css('height', Math.floor(popHeaderH + popContH + popFooterH) + 32);
								});
							}
							if ($popId.hasClass('heightFix')) { //鍮좊Ⅸ�↔툑踰꾪듉源뚯�留� �⑤뒗 �앹뾽
								$popInr.css('height', Class.winHeight - $contentH);
							}
							if ($popId.find('.pop-content').hasClass('heightFix')) { //bottom type tab�깆씠 �덈뒗 怨좎젙 �앹뾽
								$popId.find('.pop-content').css('min-height', popContH);
								//console.log('pop-content heightFix');
							}
							Class.dateSelect();
						}
						if ($popId.hasClass('expandable') || $popId.hasClass('move')) {
							Class.resizePopup($popId);
						}
						//if(!$popId.hasClass('no-start-dimed')) $popId.find('.pop-title').attr('tabindex', 0).focus();
						if($popId.find('.pop-footer .btn-group-progress').length) $popId.find('.pop-footer').addClass('hasBtn');
						if($('.map-cont.fix').length) {
							var $mapFix = $('.map-cont.fix');
							var PopHeaderHeight = $mapFix.closest('.pop-inner').find('.pop-header').outerHeight();
							var PopContHeight = $mapFix.closest('.pop-inner').find('.positon_info').outerHeight() + $mapFix.closest('.pop-inner').find('.btn-group').outerHeight() + 40;
							//console.log(PopContHeight, PopHeaderHeight)
							$('.map-cont.fix').css({'height': Class.winHeight - (PopContHeight + PopHeaderHeight)})
						}
					});
				}
				if($('.container:visible').find('.bottom').length){
					var $bottom = $('.container:visible').find('.bottom');
					var $bubbleH = $bottom.find('.btn-group-progress .bubble:not(.left) .bubbletext').length ? $bottom.find('.btn-group-progress .bubbletext').outerHeight() : 0;
					var $bottomH = $bottom.find('.btn-group-progress').length ? $bottom.find('.btn-group-progress').outerHeight() : 0;
					var $fixedH = $bottom.find('.fixed-wrap').length ? $bottom.find('.fixed-wrap').outerHeight() : 0;
					$bottom.css({'paddingBottom' : $bottomH + $bubbleH + $fixedH });
					if($bottom.find('.btn-group-progress').length) $bottom.addClass('hasBtn');
				}
				if($('.js_pb').length){
					if($('.js_pb').hasClass('pop-body')){
						$('.pop-body.js_pb').css({'paddingBottom':Class.winHeight*0.6});
					} else if($('.js_pb').hasClass('content')) {
						$('.js_pb.content').css({'paddingBottom':Class.winHeight*0.5});
					}
				}
				if($('.btn-group-progress').length){
					$('.btn-group-progress .btn').on('click', function() {
						if (!this.disabled) {
							this.classList.add('pressed');
							setTimeout(() => {
								this.classList.remove('pressed');
							}, 300);
						}
					});
				}
				if($('.swiper-container').length){
					$('.swiper-button-control')
						.off('click').on('click', function () {
							console.log('click');
							if (!$(this).closest('.swiper-container').hasClass('pause')) {
								$(this).closest('.swiper-container').addClass('pause');
								$(this).attr('aria-label','�ъ깮');
								$(this).closest('.swiper-container')[0].swiper.autoplay.stop();
							} else {
								$(this).closest('.swiper-container').removeClass('pause');
								$(this).attr('aria-label','�뺤�');
								$(this).closest('.swiper-container')[0].swiper.autoplay.start();
							}
						});
				}
				if($('.btn-top').length) Class.jsTopScroll();
				if($('.main-expanded-btn').length) Class.mainAccDrag();
				if($('.content-in').length) Class.asScroll();
				if($('.js-btn-acc-dim').length) Class.jsAccDim();
				if($('.tab-wrap').length) Class.jsTabs();
				if($('.form-textarea textarea').length){
					var $textarea = $('.form-textarea textarea');
					for (let i = 0; i < $textarea.length; i++) {
						$textarea[i].style.height = 'auto';
						$textarea[i].style.height = $textarea[i].scrollHeight + 'px';
					}
				}
				if($('.item-input-inner .input-text:not([readonly], [disabled])').length || $('.form-textarea textarea:not([readonly], [disabled])').length){
					$('.item-input-inner .input-text:not([readonly], [disabled]), .form-textarea textarea:not([readonly], [disabled])').each(function(){
						if($(this).val().length){
							$(this).next('.btn-reset').css({'display':'block','opacity':'1'});
						}
					});
				}
				if($('.tab-nav.swipe').length) $('.tab-nav.swipe').trigger('tabSetting');
			},
			/* topScroll */
			jsTopScroll: function jsTopScroll() {
				var $btnTop = $document.find('.btn-top');
				var $footer = $document.find('footer');
				if($btnTop.closest('.pop-wrap').is(':visible')){
					$target = $btnTop.closest('.pop-wrap').find('.pop-body');
					$target.on('scroll', function (e) {
						if( $target.scrollTop() > 10){
							$btnTop.stop().fadeIn();
						} else {
							$btnTop.stop().fadeOut();
						}
					});
				}
				$window.on('scroll', function (e) {
					var $target = $('html, body');
					if( $target.scrollTop() > 10){
						$btnTop.stop().fadeIn();
						$footer.css('bottom','');
					} else {
						$btnTop.stop().fadeOut();
						$footer.css('bottom','0');
					}
				});
				$document
					.off('click', '.btn-top')
					.on('click', '.btn-top', function (e) {
						var $obj = $(this);
						if($obj.closest('.pop-wrap').length){
							$obj.closest('.pop-wrap').find('.pop-body').stop().animate({scrollTop: 0}, {duration:100, easing:'linear'});
						} else {
							$( 'html, body' ).animate({scrollTop:0}, {duration:100, easing:'linear'});
						}
					});
				$('footer button')
					.on('focus',function(){
						$footer.css('bottom','0').attr('aria-hidden','false');
					})
			},
			//��긽 留덉�留됱뿉
			/* �ㅽ겕由� �ш린 蹂�寃쎌떆 */
			initResizeOnce: function initResizeOnce() {
				$window
					.on('resize', function () {
						Class.winWidth = window.innerWidth;
						/* 媛�濡쒕퉬�� */
						if (Class.winWidth > 414) {
							$('html').removeClass('small normal xsmall').addClass('wide');
							Class.isWide = true;
						} else if (Class.winWidth <= 280) {
							$('html').removeClass('wide normal small').addClass('xsmall');
							Class.isWide = false;
						} else if (Class.winWidth <= 320) {
							$('html').removeClass('wide normal xsmall').addClass('small');
							Class.isWide = false;
						} else {
							$('html').removeClass('wide small xsmall').addClass('normal');
							Class.isWide = false;
						}
						console.log('%cwinWidth : '+ Class.winWidth , 'color:yellowgreen');
						Class.setLayout();
					})
					.trigger('resize');
			},
			/* cokUI 珥덇린�� */
			init: function () {
				for (var func in Class) {
					if (Class.hasOwnProperty(func)) {
						if (func !== 'init' && func.indexOf('init') == 0) {
							if (func.lastIndexOf('Once') + 4 == func.length && !$document.data(func)) {
								$document.data(func, true);
								Class[func].call(this);
							}
							// else if (func.lastIndexOf('Once') + 4 != func.length) {
							// 	Class[func].call(this);
							// }
						}
					}
				}
			}
		};
	if (typeof this['cokUI'] !== 'undefined') {
		this['cokUI']['mobile'] = Class;
	} else {
		this['cokUI'] = {
			mobile: Class
		};
	}
})();

$.fn.cokUI = cokUI.mobile.init;
$(function() {
	$.fn.cokUI();
});