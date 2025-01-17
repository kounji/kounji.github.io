//check mode 
var chkMod ="";
var isios=(/(ipod|iphone)/i).test(navigator.userAgent);//ios
var isipad=(/(ipad)/i).test(navigator.userAgent);//ipad
var isandroid=(/android/i).test(navigator.userAgent);//android


if(isios || isipad || isandroid){
	chkMod ="mobile";
	$(function(){
		$("body").addClass(chkMod);
	});
	console.log(chkMod+"기기로 접속하였습니다.");
}else{
	chkMod ="pc";
	console.log(chkMod+"기기로 접속하였습니다.");
}

var fnGuide = {};
fnGuide.setting = {
	mode : "mobile"
}

var today = new Date(),
	dd = today.getDate(),
	mm = today.getMonth()+1,
	yyyy = today.getFullYear();
if(dd < 10) dd = "0"+dd;
if(mm < 10) mm = "0"+mm;
	today = yyyy+"-"+mm+"-"+dd;


fnGuide.menu = function(target){
	var $target = $(target);
	$target.each(function(){
		var $parent = $(this).parent("li")
		$(this).click(function(){
			$parent.addClass("on");
			$parent.siblings().removeClass("on");
			var _url = $(this).data("url");
			if(!_url) return;
			$("#iframe").attr("src", _url)
		});
	});
};

fnGuide.guide = function(){
	var $guide = $("#styleGuide")
		$guideGroup = $guide.find(".guide_group"),
		$item = $guideGroup.find("section.view > .item");
	
	$item.each(function(){
		
		$(this).append("<div class='html-code'></div>");
		//$(this).append("<div class='btn_code_view'></div>");
		var $source = $(this).find(".source"),
			$code = $(this).find(".html-code"),
			$btn = $(this).find(".btn_code_view");
		//$btn.append("<button type='button' class='btnCodeView'>view code</button>");
		var _str = $source.html();
		_str = "<xmp>"+_str+"</xmp>";
		$code.height($source.height())
		$code.html(_str);
		$btn.find(".btnCodeView").click(function(){
			var $code = $(this).parent().siblings(".html-code"),
				$source = $(this).parent().siblings(".source")
			$(this).toggleClass("on");
			$code.height($source.height())
			if($(this).hasClass("on")){
				$code.slideDown(300);
				$(this).text("close code");
			}else{
				$code.slideUp(300);
				$(this).text("view code");
			}
			
		});
	});
	if(fnGuide.setting.mode=="mobile") $guide.addClass("mobile")
};

