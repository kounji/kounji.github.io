$(document).ready(function(){
	var scrollTop = [];
	$('.cont').each(function(i){
		scrollTop[i] = $('.cont').eq(i).position().top - 142;
		//console.log(i+' === '+scrollTop);
	});
	$(window).scroll(function(){
		for(var i=0;i<=scrollTop.length;i++){
			if($(this).scrollTop() > scrollTop[i]){
				$('#tab-menu li').eq(i).addClass('on').siblings('li').removeClass('on');
			}
		}
	});
	$('.tab li').on('click', function(e){
		var target = $(this).find('a').attr('data-target');
		$(this).addClass('on').siblings('li').removeClass('on');
		var scroll = target == '#list00' ? 0 : $(target).position().top -141;
		$('html, body').scrollTop(scroll);
	})
	
	$('body').click(function(e){
		if(!$(e.target).is('.btn-preview, .link, #tab-menu')){
			$('#preview').removeClass('is-open');
			$('body').find('tr.preview').removeClass('preview');
		}
	});
	//기존열이 없는 항목 버튼 숨기기
	var _wrap = jQuery('#wrap');
	$('.cont').each(function(i){
		var _this = jQuery(this);
		if(_this.find('#page tr.continue').length != 0){
			_this.find('> .btnContinue').removeClass('hidd');
		}else{
			_this.find('> .btnContinue').addClass('hidd');
			//console.log(i);
		};
	});
			
	//기존일괄 접기,펼치기
	$('.btnContinue.all').click(function(){
		var _wrap = jQuery('#wrap'),
				_this = jQuery(this);
		if(_this.hasClass('dn')){
			_this.removeClass('dn').text('기존 일괄 펼침');
			_wrap.find('#page tr.continue').hide();
			_wrap.find('> .cont > .btnContinue').removeClass('dn');
		}else{
			_this.addClass('dn').text('기존 일괄 접기');
			_wrap.find('#page tr.continue').show();
			_wrap.find('> .cont > .btnContinue').addClass('dn');
		};
	});

	//기존항목 접기,펼치기
	$('.btnContinue').click(function(){
		var _this = jQuery(this);
		if(_this.parent().find('#page tr.continue').length != 0){//해당 항목에 기존열이 있으면 실행
			if(_this.hasClass('dn')){
				_this.removeClass('dn');
				_this.parent().find('#page tr.continue').hide();
			}else{
				_this.addClass('dn');
				_this.parent().find('#page tr.continue').show();
			};
		};

		if(jQuery('#wrap').find('.cont > .dn').length >= 1){//기존 항목이 1개 이상 열리면 일괄닫기
			$('.btnContinue.all').addClass('dn').text('기존 일괄 접기');
		}else{
			$('.btnContinue.all').removeClass('dn').text('기존 일괄 펼침');
		};
	});
	
	$('.link').click(function(){
		$(this).closest('tr').addClass('preview').siblings('tr').removeClass('preview');
	});
	gridTab(); //탭메뉴
	setCount(); //건수 카운트
	htmlOverView() //마우스오버시 미니화면

	
	var worklist = (function(){
		/**
		* var
		* --------------------------------------
		*/
		var rMap ={
				root : $('html, body')
				, body : $('body')
				, header : $('.header')
				, tab_nav : $('.tab_nav')
				, tab_navList : $('li' , $('.tab_nav'))
				, info_section : $('.info_section')
				, tobe_section : $('.tobe_section')
				, content : $('#content')
				, tab_content : $('.tab_contents_wrap')
				, tab_title : $('h3')
			}

			, fileName = Util.getFileName()
			, fileDir = Util.getDirName()
			, url_info = String(window.location.href.slice(window.location.href.indexOf('?')+1).split('&'))
			, isLocalStorage = $('html').hasClass('localstorage') ? true : false
			, winScroll = 0 //현재 스크롤
		;

		/**
		* ColorBox : Footer Menu
		* --------------------------------------
		*/
		var ColorBox = (function(){
			var fMap = {}
				, cbVar = {}
			;

			var appendLayout =function(){
				var str = ''
						+ '<div class="footMenu ">'
						+ '	<div class="optionBar clearfix">'
						+ '		<div class="btn_area fl ">'
						+ '			<a href="javascript:void(0);" class="btn_cbox close_btn"><span>닫기</span></a>'
						+ '			<a href="javascript:void(0);" class="btn_cbox prev_btn"><span>이전</span></a>'
						+ '			<a href="javascript:void(0);" class="btn_cbox next_btn"><span>다음</span></a>'
						+ '			<a href="javascript:void(0);" class="btn resize_btn"><span>ReSize</span></a>'
						+ '			<a href="javascrpt:void(0);" class="btn id_link" target="_blank"><span>Open</span></a>'
						+ '			<strong class="cate" style="padding-left:3px;color:#555;"></strong>'
						+ '		</div>'
						+ '		<div class="btn_area fr">'
						+ '			<div class="info_area">'
						+ '				<span class="id_txt">pageID</span>'
						+ '				<p class="menu_txt" style="margin:0;"><span class="page"></span></p>'
						+ '			</div>'
						+ '			<select name="" id="autoSelect">'
						+ '				<option value="0.5">0.5</option>'
						+ '				<option value="0.8">0.8</option>'
						+ '				<option value="1" selected="selected">1.0</option>'
						+ '				<option value="2">2.0</option>'
						+ '				<option value="3">3.0</option>'
						+ '			</select>'
						+ '			<a href="javascript:void(0);" class="btn_cbox auto_btn"><span>Auto</span></a>'
						+ '			<a href="javascript:void(0);" class="btn_cbox prev_btn"><span>이전</span></a>'
						+ '			<a href="javascript:void(0);" class="btn_cbox next_btn"><span>다음</span></a>'
						+ '			<a href="javascript:void(0);" class="btn_cbox close_btn"><span>닫기</span></a>'
						+ '		</div>'
						+ '	</div>'
						+ '	<div class="resizeBar">'
						+ '		<div class="control">'
						+ '			<span class="bar s320" data-width="320"><span class="info_txt">320</span></span>'
						+ '			<span class="bar s340" data-width="340"></span>'
						+ '			<span class="bar s360" data-width="360"></span>'
						+ '			<span class="bar s375" data-width="375"></span>'
						+ '			<span class="bar s425" data-width="425"></span>'
						+ '			<span class="bar s768" data-width="768"></span>'
						+ '			<span class="bar s1000" data-width="1000"></span>'
						+ '			<span class="bar s1024" data-width="1024"></span>'
						+ '			<span class="bar s1200" data-width="1200"></span>'// 추가
						+ '			<span class="bar s1440" data-width="1440"></span>'
						+ '			<span class="bar s1600" data-width="1600"></span>'
						+ '			<span class="bar s1920" data-width="1920"></span>'
						+ '		</div>'
						+ '		<div class="control">'
						+ '		</div>'
						+ '	</div>'
						+ '</div>'
				;
				rMap.body.append(str);
			}

			var setColorBoxMap=function(){
				var bottomGap =40;
				fMap={
					footMenu : $('.footMenu')
					, autoSelect : $('#autoSelect')
					, resizeBtn : $('.resize_btn', this.footMenu)//리사이즈 토글 버튼
					, resizeBar : $('.resizeBar', this.footMenu)//사이즈바 컨트롤
					, control : $('.control', this.footMenu)
					, control_btn : $('.bar', this.footMenu)
					, infoTxt : $('.info_txt', this.footMenu)
				}

				cbVar = {
					className : 'iframe'
					, bottomGap : bottomGap
					, bottomGap_resize : bottomGap +19
					, outerGap : 28
					, curSize : isLocalStorage ? (Util.getStorage('curSize') ? Util.getStorage('curSize') : ($('body').data('resize') ? $('body').data('resize') : 1000 )) : 1000
					, resizeMode : isLocalStorage ? (Util.getStorage('resizeMode') ?Util.getStorage('resizeMode') : 'Resize') : 'Resize' // Resize, Fullsize
					, ARresize :[]
					, option : {width : '100%', height : $(window).height()- bottomGap, top : 0 }
					, autoID : 'autoID'
					, autoFlag : false
					// , saveResizeBtn : Object
					, saveResizeBtn : $('.'+cbVar.curSize)
				}


				//ARresize
				fMap.control_btn.each(function(i){
					var dataVal = $(this).data('width');
					cbVar.ARresize[i] = dataVal;
				});
			}

			var colorBoxHandler = function(){
				var curSize = cbVar.curSize;

				$('.'+cbVar.className).colorbox({
					iframe : true
					, width : cbVar.option.width
					, height : cbVar.option.height
					, top : cbVar.option.top
					, opacity : 1.0
					// , current : "html {current} of {total}"
					, current : ""
					, onOpen:function(){
						addFootMenu();
						return false;
					}
					, onLoad:function(){
						return false;
					}
					, onComplete :function(){
						// if(Util.getStorage('resizeMode') == 'Resize'){
						if(cbVar.resizeMode == 'Resize'){
							if(!cbVar.autoFlag){
								resizeBtnTrigger();
							}
						}else{
								fullsizeBtnTrigger();
							}
						return false;
					}
					, onCleanup:function(){
						return false;
					}
					, onClosed:function(){
						removeFootMenu();
						return false;
					}
				});

				function resetColorbox(){
					$('.'+cbVar.className).colorbox({
						width : cbVar.option.width
						, height : cbVar.option.height
						, top : cbVar.option.top
						, opacity : 1.0
						// , current : "{current} / {total}"
						, current : ''
					});
					$.colorbox.resize(cbVar.option);
				}
				function addFootMenu(){
					rMap.body.css({'overflow': 'hidden'});
					fMap.footMenu.addClass('on');
					addTitle();
				}
				function removeFootMenu(){
					rMap.body.css({'overflow': 'auto'});
					fMap.footMenu.removeClass('on');
				}
				
				function addTitle(){
					var prop = $.colorbox.element();
					var curDepNum = prop.closest('.cont').index();
					var curMenu = $('#tab-menu').find('li').eq(curDepNum).text();
					var curTitle = prop.context.title;
					var ARpath = prop.context.pathname.split('/');
					var _path1 = ARpath[ARpath.length -2];
					var _path2 = ARpath[ARpath.length -1];
					fMap.footMenu.find('.id_txt').text(_path1 +'/'+ _path2 );
					// fMap.footMenu.find('.menu_txt .cate').text(curMenu);
					fMap.footMenu.find('.optionBar .btn_area .cate').text(curMenu);
					fMap.footMenu.find('.menu_txt .page').text(curTitle);

					//레이어 팝업등에서 강제 포커스 가져오기 위해
					setTimeout(function(){
						$('html').focus();
					}, 200)
				}
				// Test (Dispatch )
				function nextCate(){
					var prop = $.colorbox.element();
					var curDepNum = prop.closest('.tab_contents_wrap').index();

					$('.tab_contents_wrap').eq(curDepNum +1).find('tr').each(function(i){

					});
				}
				//EVENT
				//새창 열기
				fMap.footMenu.find('.id_link').on('click', function(){
					var prop=$.colorbox.element();
					window.open(prop.context.href);
					clearAuto();
					return false;
				});
				//이전
				fMap.footMenu.find('.prev_btn').on('click', function(){
					$.colorbox.prev();
					clearAuto();
					addTitle();
					return false;
				});
				//다음
				fMap.footMenu.find('.next_btn').on('click', function(){
					$.colorbox.next();
					clearAuto();
					addTitle();
					return false;
				});
				//방향키
				$('html').keyup(function(e){
					clearAuto();
					if(fMap.footMenu.hasClass('on')){
						var key = e.which;
						if(key == 37 || key == 39) {
							addTitle();
						}
					}
					return false;
				});
				//닫기
				fMap.footMenu.find('.close_btn').on('click', function(){
					$.colorbox.close();
					clearAuto();
					return false;
				});
				//자동
				fMap.footMenu.find('.auto_btn').on('click', function(){
					if(!cbVar.autoFlag){
						var timeVal = fMap.autoSelect.val();
						cbVar.autoID=setInterval(function(){
							$.colorbox.next();
							addTitle();
						}, timeVal*1000);
						$(this).addClass('on');
						cbVar.autoFlag=true;
					}else{
						clearInterval(cbVar.autoID);
						$(this).removeClass('on');
						cbVar.autoFlag=false;
					}
					return false;
				});

				//자동 설정 셀렉트 박스
				fMap.autoSelect.on('change', function(){
					clearAuto();
				});

				//자동 Clear
				function clearAuto(){
					if(cbVar.autoFlag) {
						fMap.footMenu.find('.auto_btn').trigger('click');
					}
				}

				function resizeBtnTrigger(){
					// curSize='320';
					cbVar.resizeMode = "Resize";
					Util.setStorage('resizeMode', 'Resize');
					$('.s'+curSize).trigger('click');
					fMap.resizeBar.addClass('on');
					fMap.resizeBtn.find('span').text('Fullsize');
				}

				function fullsizeBtnTrigger(){
					cbVar.resizeMode = "Fullsize";
					Util.setStorage('resizeMode', 'Fullsize');
					cbVar.option = {width : '100%', height : $(window).height()-cbVar.bottomGap , top : 0};
					fMap.resizeBar.removeClass('on');
					fMap.resizeBtn.find('span').text('Resize');
				}

				//리사이즈 토글 버튼
				fMap.resizeBtn.on({
					click : function(){
						if(cbVar.resizeMode == "Fullsize"){
							resizeBtnTrigger();
						}else{
							fullsizeBtnTrigger();
						}
						resetColorbox();
						clearAuto();
						return false;
					}
				});

				//사이즈바 컨트롤
				fMap.control_btn.each(function(){
					var $btn=$(this);
					$btn.on({
						mouseenter : function(){
							var dataW=$(this).data('width');
							fMap.infoTxt.text(dataW);
							fMap.control_btn.removeClass('on');
							$(this).addClass('on').prevAll().addClass('on');
							return false;
						}
						, mouseleave : function(){
							fMap.infoTxt.text(curSize);
							fMap.control_btn.removeClass('on');
							cbVar.saveResizeBtn.addClass('on').prevAll().addClass('on');
							return false;
						}
						, click : function(){
							cbVar.resizeMode = 'Resize';
							Util.setStorage('resizeMode', 'Resize');

							var dataW = $(this).data('width');
							curSize = dataW;
							Util.setStorage('curSize', curSize);
							cbVar.saveResizeBtn =$(this);
							fMap.infoTxt.text(curSize);
							$(this).addClass('on').prevAll().addClass('on');

							cbVar.option = {width : dataW+cbVar.outerGap , height : $(window).height()- Number(cbVar.bottomGap_resize) , top : 0};
							resetColorbox();
							clearAuto();
							return false;
						}
					});
				});

				//Resize
				$(window).on('resize', function(){
					if(cbVar.resizeMode == 'Fullsize'){
						cbVar.option = {width : $(this).width() , height : $(this).height()-cbVar.bottomGap , top : 0};
						resetColorbox();
					}
				});
			}

			var eventHandler = function(){
				rMap.tab_content.find('tr').each(function(i){
					var target = 'td.num span.number';
					var target_a = $(this).find('.num a');
					// var $pageID = $(this).find('.pid').text();
					var $pageName = $(this).find('.page').text();
					var goURL = $(this).find('.path a').attr('href');
					// var goURL = $(this).find('.path a').attr('href');

					if($(this).hasClass('del') || !$(this).find('.rdate').text() || typeof goURL=="undefined" || $(this).context.style.display =='none'){
						target_a.removeClass('iframe cboxElement'); //colorbox object 삭제
					}else{
						//레이어 팝업일경우
						if($(this).hasClass('layer')){
							if(url_info.search('file') != -1) goURL = layerPopPath_local + goURL; //로컬로 볼경우
							else goURL = layerPopGuideURL + '?' + layerPopPath_server + goURL; //서버에서 볼경우
						}
						//팝업일경우 //다시 생갈해볼것
						/*else if($(this).hasClass('popup')){
							goURL = $(this).find('.path a').text();
						}*/

						// $(this).find(target).html("<a href="+goURL+" rel='"+cbVar.className+"' class='"+cbVar.className+"' title='"+$pageName+"'>"+$(this).find(target).text()+"</a>");
						$(this).find(target).html("<a href="+goURL+" rel='"+cbVar.className+"' class='"+cbVar.className+"' title='"+$pageName+"'>"+$(this).find(target).text()+"</a>");
					}
				});


				//링크 : Focus 색상
				rMap.tab_content.find('table tr td a').on({
					focusin : function(){
						$(this).closest('tr').addClass('focus');
						return false;
					}
					, focusout : function(){
						$(this).closest('tr').removeClass('focus');
						return false;
					}
				});
			}

			var localStorage = function(){
				//localStorage 초기 셋팅 : Default :  Fullsize
				// if(isLocalStorage){
					if(typeof (Util.getStorage('curSize')) == "undefined" || Util.getStorage('curSize') == null ){
						Util.setStorage('curSize', 320);
						cbVar.curSize = 320;
					}
					if(typeof (Util.getStorage('resizeMode')) == "undefined" ){
						Util.setStorage('resizeMode', 'Fullsize');
						cbVar.resizeMode = 'Fullsize';
					}
					if(Util.getStorage('resizeMode') == 'Resize'){
						cbVar.option = {width : cbVar.curSize + cbVar.outerGap , height : $(window).height()- Number(cbVar.bottomGap_resize) , top : 0};
						cbVar.saveResizeBtn = $('.'+cbVar.curSize);
					}

				/*
				}else{

					cbVar.curSize = 320;
					cbVar.resizeMode = 'resizeMode';
					cbVar.option = {width : cbVar.curSize + cbVar.outerGap , height : $(window).height()- Number(cbVar.bottomGap_resize) , top : 0};
					cbVar.saveResizeBtn = $('.'+cbVar.curSize);
				}*/

			}

			var initSet =function(){
				appendLayout();
				setColorBoxMap();
				eventHandler();
				colorBoxHandler();
			}

			var initModule =function(){
				initSet();
				localStorage();
			}

			var resetModule =function(){
				$('.footMenu').remove();
				initSet();
			}

			return {
				initModule: initModule
				, resetModule : resetModule
				, localStorage : localStorage
			}
		})();
		
		/**
		* init
		* --------------------------------------
		*/
		var initModule = function(){
				ColorBox.resetModule();
			// Layout.initModule();

			//Data.initModule();
			//Nav.initModule();
			// SideNav.initModule();

			//TableFolding.initModule();
			//HeaderFolding.initModule();
			//Quick.initModule();

			//Filter.initModule();

			//tableOption.initModule();

				//초기 보여지는 메뉴 -> 추후 set으로 변경
				//rMap.tab_navList.eq(allTabNum).find('a').click();

			//화면 튐현상 방지
			//rMap.content.css({'visibility' :'visible'});

		}

		return {
			initModule : initModule
		}
	})().initModule();
});

	// insertList("탭ID","업무구분","depth1","depth2","depth3","화면명","화면ID","구분","유형","작업구분","기획자","디자이너","작업자","상태(M작업,Y완료)","완료일자","확인(E수정,C확인)","비고");
	function insertList(menuid,gubun,depth1,depth2,depth3,name,id,type,view,wtype,user,designer,writer,status,date,check,comment){
		var cls = '';
		
		if(menuid.indexOf('list') != -1){
			var html = "";
			var disabled = '',
				cell = '',
				code = '',
				checked = '',
				state = '';
			code = id.substring(3,5);
			if(type != '수용'){
				disabled = 'disabled';
				cell = id;
			}else{
				//구분상태 체크
				switch(wtype){
					case "신규":
						disabled = 'new';
					break
					case "개선":
						disabled = 'repair';
					break
					case "기존":
						disabled = 'continue';
					break
				};
				//상태 변환(M작업,Y완료)
				if(status == 'Y'){	//완료
					if(id.lastIndexOf(".vw") > -1 || id.lastIndexOf(".do") > -1){
						cell = "<a href='"+id+"' class='link' target='_blank'>"+id+"</a><button type='button' class='btn-preview' onclick=\"fnPreview('"+id+"',this);\">미리보기</button>";
					} else if(id == 'error'){
						cell = "<a href='"+id+".html' class='link' target='_blank'>"+id+"</a><button type='button' class='btn-preview' onclick=\"fnPreview('"+id+"',this);\">미리보기</button>";
					} else {
						cell = "<a href='../../html/"+code+"/"+id+".html' class='link' target='_blank'>"+id+"</a><a rel='iframe' href=\ ../../html/"+code+"/"+id+".html\ class='iframe cboxElement btn-preview'>미리보기</button>";
						//cell = "<a href='webPublish/html/"+code+"/"+id+".html' class='link' target='_blank'>"+id+"</a><button type='button' class='btn-preview' onclick=\"fnPreview('"+id+"',this);\">미리보기</button>";
					}
					state = "<i class='comp'></i> 완료"
				}else if(status == 'M'){	//작업
					if(id.lastIndexOf(".vw") > -1 || id.lastIndexOf(".do") > -1){
						cell = "<a href='"+id+"' class='link' target='_blank'>"+id+"</a><button type='button' class='btn-preview' onclick=\"fnPreview('"+id+"',this);\">미리보기</button>";
					} else {
						cell = "<a href='../../html/"+code+"/"+id+".html' class='link' target='_blank'>"+id+"</a><a rel='iframe' href=\ ../../html/"+code+"/"+id+".html\ class='iframe cboxElement btn-preview'>미리보기</button>";
						//cell = "<a href='webPublish/html/"+code+"/"+id+".html' class='link' target='_blank'>"+id+"</a><button type='button' class='btn-preview' onclick=\"fnPreview('"+id+"',this);\">미리보기</button>";
					}
					state = "<i class='modi'></i> 작업"
				}else{
					cell = id;
				}
				//확인 변환(E수정,C확인)
				if(check == 'E'){ //수정
					checked = "<i class='edit'></i> 수정"
				}else if(check == 'C'){ //확인
					checked = "<i class='check'></i> 확인"
				}
			}
			html = "<tr class="+disabled+">" + 
				//"<td class='center'>"+gubun+"</td>" + //업무구분
				"<td>"+depth1+"</td>" + //depth1
				"<td>"+depth2+"</td>" + //depth2
				"<td>"+depth3+"</td>" + //depth3
				"<td>"+name+"</td>" + //화면명
				"<td>"+cell+"</td>" + //화면ID
				"<td class='center' data-element='"+type+"'>"+view+"</td>" + //유형
				"<td class='center'>"+wtype+"</td>" + //작업구분
				"<td class='center'>"+user+"</td>" + //기획자
				"<td class='center'>"+designer+"</td>" + //디자이너
				"<td class='center'>"+writer+"</td>" + //작업자
				"<td class='center state' data-element='"+status+"'>"+state+"</td>" + //상태
				"<td class='center'>"+date+"</td>" + //완료일자
				"<td class='center check'>"+checked+"</td>" + //확인
				"<td>"+comment+"</td>" + //비고
				"</tr>";
			$('#'+menuid).find('tbody').append(html);
		}
	}
	
	function gridTab(){
		var tabname = null;
		var tabid = null;
		var html = '';
		$('.cont').each(function(index){
			tabid = $(this).attr('id');
			tabname = $(this).find('#title').text();
			html = html + "<li><a href='#"+tabid+"' data-target='#"+tabid+"'>"+tabname+"</a></li>";
		});
		$('#tab-menu').append(html);
		$('#tab-menu').find('li:first-child').addClass('on');
		
		//$('#tab-menu').append("<li><a href='guide/guide.html' target='_blank'>퍼블 Guide</a></li>");//가이드
		//$('#tab-menu').append("<li><a href='../../../old_2022/index.html' target='_blank'>2022 퍼블</a></li>");//2022 화면
		//$('#tab-menu').append("<li><a href='../../../old_2021/index.html' target='_blank'>2021 퍼블</a></li>");//2021 화면
	}
	
	insertHeader();
	function insertHeader(){
		var colgroup = "";
			colgroup = "<colgroup>" + 
			//"<col style='width:5%;'>" + //업무구분
			"<col style='width:9%;'>" + //2Depth
			"<col style='width:9%;'>" + //3Depth
			"<col style='width:9%;'>" + //4Depth
			"<col style='width:9%;'>" + //화면명
			"<col style='width:9%;'>" + //화면ID
			"<col style='width:3%;'>" + //유형
			"<col style='width:3%;'>" + //작업구분
			"<col style='width:3%;'>" + //기획자
			"<col style='width:3%;'>" + //디자이너
			"<col style='width:3%;'>" + //작업자
			"<col style='width:4%;'>" + //상태(M작업,Y완료)
			"<col style='width:4%;'>" + //완료일자
			"<col style='width:4%;'>" + //확인(E수정,C확인)
			"<col style='width:*;'>" + //비고
		"</colgroup>";
		var thead = "";
		thead = "<thead>" + 
			"<tr>" + 
				//"<th>업무구분</th>" + 
				"<th>1Depth</th>" + 
				"<th>2Depth</th>" + 
				"<th>3Depth</th>" + 
				"<th>화면명</th>" + 
				"<th>화면ID</th>" + 
				"<th>유형</th>" + 
				"<th>구분</th>" + 
				"<th>기획</th>" + 
				"<th>디자인</th>" + 
				"<th>퍼블</th>" + 
				"<th>상태</th>" + 
				"<th>완료일자</th>" + 
				"<th>확인</th>" + 
				"<th>비고</th>" + 
			"</tr>" + 
		"</thead>";
		
		for(var i=0;i<=$('.cont').length;i++){
			$('#list0'+i+'-header').append(colgroup, thead);
			$('#list0'+i).find('#page table').prepend(colgroup);
		}
	}
	
	function fnPreview(id, obj){
		var code = id.substring(0,2);
		var left = $(obj).offset().left+65;
		if(id.lastIndexOf(".vw") > -1 || id.lastIndexOf(".do") > -1){
			$('#preview')/*.css('left', left+'px')*/.attr('src', id).addClass('is-open');
		} else if(id == 'error'){
			$('#preview')/*.css('left', left+'px')*/.attr('src',id+'.html').addClass('is-open');
		} else {
			$('#preview')/*.css('left', left+'px')*/.attr('src',code+'/'+id+'.html').addClass('is-open');
		}
		$(obj).closest('tr').addClass('preview').siblings('tr').removeClass('preview');
	}
	
	//마우스오버시 미니화면
	function htmlOverView(){
		$('a.link')
		.on('mouseover',function(){
			$('#preview').attr('src', $(this).attr('href')).addClass('is-open');
		})
		.on('mouseout',function(){
			$('#preview').removeClass('is-open');
		});
	}

	//화면 카운트
	function setCount(){
		var arr,
				arr2 = 0,
				arr3 = 0,
				arr4 = 0,
				count = 0,
				count2 = 0,
				count3 = 0, //삭제
				count4 = 0; //기존
		$('.cont').each(function(i){
			arr = $(this).find('#page').find('tr').not('.disabled').length;
			arr2 = arr + arr2;
			count = $(this).find('#page').find('tr').not('.disabled').find('td[data-element=Y]').length;// + $(this).find('#page').find('tr').not('.disabled').find('td[data-element=M]').length;
			count2 = count + count2;
			arr3 = $(this).find('#page').find('tr.disabled').length;
			count3 = arr3 + count3;
			arr4 = $(this).find('#page').find('tr.continue').not('.disabled').length;
			count4 = arr4 + count4;
			$('.stage').find('[aria-label=count]').eq(i).text(count +' / '+ arr);
			$('.stage').find('[aria-label=count-total]').text((count2 - count4) +' / '+ (arr2 - count4));
		});
		//console.log(count2 +"--"+ arr2);
		var per = ((count2-count4) * 100) / (arr2 - count4);
		per = per.toString();
		var per2 = per.split('.');
		$('.stage').find('[aria-label=count-rate]').text(per2[0] + '%');
		$('.stage').find('[aria-label=count-del]').text(count3);
		$('.stage').find('[aria-label=count-conti]').text(count4);
	}

/**
* Util Function
* --------------------------------------
*/
var Util = {
	getFileName : function() {
		var path=location.pathname.split("/");
		return path[path.length-1];
	}
	, getDirName : function() {
		var path=location.pathname.split("/");
		return path[path.length-2];
	}
	, isChrome : function(){
		if(navigator.userAgent.indexOf("Chrome") != -1){
			return true;
		}
		return false;
	}
	, isLocal : function(){
		if(window.location.toString().substr(0,4) == "http"){
			return false;
		}else{
			return true;
		}
	}
	, setStorage : function(name, val){
		window.localStorageAlias = window.localStorage;

		if(!$('html').hasClass('localstorage')){//로컬스토리지 지원 안할때
			window.localStorageAlias = {};
			window.localStorageAlias.removeItem = function () { };
		}else{
			if (typeof (Storage) !== "undefined") {
				localStorage.setItem(name, val);
			} else {
				window.alert('Please use a modern browser to properly view this template!');
			}
		}
	}
	, getStorage : function(name){
		window.localStorageAlias = window.localStorage;

		if(!$('html').hasClass('localstorage')){//로컬스토리지 지원 안할때
			window.localStorageAlias = {};
			window.localStorageAlias.removeItem = function () { };
		}else{
			if (typeof (Storage) !== "undefined") {
				return localStorage.getItem(name);
			} else {
				window.alert('Please use a modern browser to properly view this template!');
			}
		}
	}
	, windowPopup : function (_url, _win, _w, _h,_scroll){
		var popW=_w;
		var popH=_h;
		var windowX = Math.ceil( (window.screen.width - popW) / 2 );
		// var windowY = Math.ceil( (window.screen.height - popH) / 2 );
		var windowY =30;
		window.open(_url, _win, 'width='+_w+', height='+_h+', menubar=no, status=no, toolbar=no, scrollbars='+_scroll+', left='+windowX+', top='+windowY);
	}
	, tabHandler : function (_tabNav, _tabCon, _num, _callback){
		var initActNum=_num;
		var $tabNav=$(_tabNav);
		var $tabCon=$(_tabCon);
		var $navItem = $tabNav.find("li");

		$navItem.eq(initActNum).addClass("on");
		$tabCon.hide();
		$tabCon.eq(initActNum).show();

		$navItem.each(function(){
			$(this).find('a').attr('role', 'tab');
			$(this).find('a').attr('title', '선택하기');
			$(this).find('a').attr('aria-selected', 'false');
		});

		$navItem.eq(initActNum).find('a').attr('title', '선택됨');
		$navItem.eq(initActNum).find('a').attr('aria-selected', true);

		$tabNav.on('click','a',function(){
			var clickNum = $(this).parent().index();
			$navItem.removeClass("on").eq(clickNum).addClass("on");

			$navItem.find('a').attr('title', '선택하기');
			$navItem.find('a').attr('aria-selected', 'false');
			$navItem.eq(clickNum).find('a').attr('title', '선택됨');
			$navItem.eq(clickNum).find('a').attr('aria-selected', true);

			$tabCon.hide();
			$tabCon.eq(clickNum).show();

			if(_callback) _callback(clickNum);
			return false;
		});
	}
	, scrollWatch : function(_callback){
		var
			intervalID
			, checkNum = 0
			, tmpNum = 0
			, flag = false
			, aniSpeed = 360
		;
		var scrollEndCheck=function(_callback){
			clearInterval(intervalID);
			intervalID=setInterval(function(){
				if(tmpNum==checkNum){
					clearInterval(intervalID);
					checkNum=0;
					tmpNum=0;
					if(_callback) _callback();
					setTimeout(function(){
						flag=false;
					}, aniSpeed);
				}
				tmpNum=checkNum;
			},200);
		};
		$(window).scroll(function(event) {
			checkNum++;
			if(!flag) {
				flag=true;
				scrollEndCheck(_callback);
			}
		});
	}
	, resizeWatch : function(_callback){
		var
			intervalID
			, checkNum = 0
			, tmpNum = 0
			, flag = false
			, delay = 600
		;
		var resizeEndCheck=function(){
			clearInterval(intervalID);
			intervalID=setInterval(function(){
				if(tmpNum==checkNum){
					clearInterval(intervalID);
					checkNum=0;
					tmpNum=0;
					if(_callback) _callback();
					setTimeout(function(){
						flag=false;
						return false;
					}, delay);
				}
				tmpNum=checkNum;
			},200);
		};
		$(window).resize(function(event) {
			checkNum++;
			if(!flag) {
				flag=true;
				resizeEndCheck();
			}
		});
	}
};

$(document).ready(function(){
	// 기존 버튼 추가
	$('.cont').each(function(){
		if($(this).find('tr').hasClass('continue')) {
			$(this).find('h2').append('<button class="btn-continue">기존</button>')
		}
	});

	//각각
	$('.btn-continue').on('click',function(){
		var trContinue = $(this).parent().siblings().find('tr.continue');
		if(trContinue.css('display')=="none") {
			$(this).removeClass('hide').addClass('show');
			$('.btn-continue.all').removeClass('hide').addClass('show');
			trContinue.show();
		} else {
			$(this).removeClass('show').addClass('hide');
			$('.btn-continue.all').removeClass('show').addClass('hide');
			trContinue.hide();
		}
		$('.cont').each(function(){
			if($(this).find('tr.continue').css('display')=="table-row") {
				$('.btn-continue.all').removeClass('hide').addClass('show');
			} 
		});
	});

	//전체
	$('.btn-continue.all').on('click',function(){
		if($('tr.continue').css('display')=="none") {
			$('.btn-continue').removeClass('hide').addClass('show');
			$('tr.continue').show();
		} else {
			$('.btn-continue').removeClass('show').addClass('hide');
			$('tr.continue').hide();
		}
	});
});




