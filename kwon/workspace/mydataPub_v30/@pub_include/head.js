/**
* Html > Head include
* ------------------
* css& script include
*/

(function(){
var str='';
str+='<link rel="stylesheet" href="../../../../src/assets_v40/css/import.css">';
// <!-- 알메이트 차트에서 사용하는 CSS 스타일 파일 --> import.css로 이동
//str+='<link rel="stylesheet" href="../../../../src/assets_v40/css/rMateChartH5.css">';
// <!-- 신규작업 --> import.css로 이동
//str+='<link rel="stylesheet" href="../../../../src/assets_v40/css/contents.css">';
str+='<script type="text/javascript" src="../../../../src/assets_v40/js/jquery-3.7.1.min.js"></script>';
str+='<script type="text/javascript" src="../../../../src/assets_v40/js/jquery-ui.min.js"></script>';
str+='<script type="text/javascript" src="../../../resource/js/jquery.ui.touch-punch.js"></script>';
str+='<script type="text/javascript" src="../../../../src/assets_v40/js/common-ui-pub.js"></script>';
str+='<script type="text/javascript" src="../../../../src/assets_v40/js/pubUiComm.js"></script>';
// <!-- 알메이트 차트 라이센스 파일 -->
str+='<script type="text/javascript" src="../../../../src/assets_v40/js/rMateChartH5/LicenseKey/rMateChartH5License.js"></script>';
// <!-- 알메이트 자바스크립트 차팅 라이브러리 -->
str+='<script type="text/javascript" src="../../../../src/assets_v40/js/rMateChartH5/JS/rMateChartH5.js"></script>';

// slick js
str+='<script type="text/javascript" src="../../../../src/assets_v40/js/slick.min.js"></script>';

// <!-- 차트 세트 모음 -->
str+='<script type="text/javascript" src="../../../../src/assets_v40/js/commonChart.js"></script>';

// <!--[v4.0] plug-in 추가-->
str+='<script type="text/javascript" src="../../../../src/assets_v40/js/lottie-player.js"></script>';

document.write(str);
})();
