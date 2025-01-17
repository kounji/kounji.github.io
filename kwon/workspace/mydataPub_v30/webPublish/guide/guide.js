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
		$(this).find(".source").wrap('<div class="item_box"></div>');
		$(this).find('.item_box').append("<div class='code_view'></div>");
		var $source = $(this).find(".source");
		var	$code = $(this).find(".code_view");
		
		var _str = $source.html();
		_str = "<pre><code class='language-markup'><script type='prism-html-markup'>"+_str+"</script></code></pre>";
		$code.height($source.height()+40);
		$code.html(_str);
	});
	if(fnGuide.setting.mode=="mobile") $guide.addClass("mobile")
	document.write("<script type='text/javascript' src='../../resource/lib/prism.js'></script>");
};

