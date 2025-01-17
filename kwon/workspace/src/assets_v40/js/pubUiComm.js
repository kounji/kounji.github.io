/* 
	2023 퍼블 스크립트 공통 jlee 
	함수화해서 화면로딩시 호출하는 방식으로 작업해주세요.

*/
jQuery(document).ready(function() {
	
	roundTabWidth(); // 라운드 탭 사이즈 적용하기

});
	
// 라운드탭 사이즈(가장큰 탭사이즈를 기준으로 각탭 및 전체 적용하기)
function roundTabWidth(){
	var arr = [],
			_tabList = jQuery('.switchType li');
	_tabList.each(function(e){
		arr[e] = jQuery(this).outerWidth();
	});
	_tabList.css('width',Math.max(...arr)); //탭 사이즈 적용
	_tabList.parent().parent().css('width',Math.max(...arr)*arr.length); //탭전체 사이즈 적용
	//console.log('값 = '+arr+', 갯수 = '+arr.length+', 최고값 = '+Math.max(...arr));
};



