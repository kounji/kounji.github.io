/**
* Html > Head include
* ------------------
* css& script include
*/

(function(){
var str='';
str+='<link rel="stylesheet" href="../../../../src/assets/css/mydata.css">';
// <!-- 알메이트 차트에서 사용하는 CSS 스타일 파일 -->
str+='<link rel="stylesheet" href="../../../../src/assets/rMateChartH5/Assets/Css/rMateChartH5.css">';
// <!-- 신규작업 -->
str+='<link rel="stylesheet" href="../../../../src/assets/css/contents.css">';
str+='<script type="text/javascript" src="../../../../src/assets/js/jquery-3.7.1.min.js"></script>';
str+='<script type="text/javascript" src="../../../../src/assets/js/jquery-ui.min.js"></script>';
str+='<script type="text/javascript" src="../../../resource/js/jquery.ui.touch-punch.js"></script>';
str+='<script type="text/javascript" src="../../../../src/assets/js/common-ui.js"></script>';
// <!-- 알메이트 차트 라이센스 파일 -->
str+='<script type="text/javascript" src="../../../../src/assets/js/rMateChartH5/LicenseKey/rMateChartH5License.js"></script>';
// <!-- 알메이트 자바스크립트 차팅 라이브러리 -->
str+='<script type="text/javascript" src="../../../../src/assets/js/rMateChartH5/JS/rMateChartH5.js"></script>';

// slick js
str+='<script type="text/javascript" src="../../../../src/assets/js/slick.min.js"></script>';

// <!-- 차트 세트 모음 -->
str+='<script type="text/javascript" src="../../../../src/assets/js/commonChart.js"></script>';
document.write(str);
})();
