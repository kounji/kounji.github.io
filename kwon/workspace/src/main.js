import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './common/router'

// 필터는 자동 등록이므로 밑에 Import만 해줘도됨
import '@/common/filters/filter' 

//4.0 고도화 개발로 assets_v30 -> assets_v40으로 변경 2024-12-23

// Jquery는 Vite Config에서 전역 주입함
import '@/assets_v40/js/jquery-ui.min.js'
import '@/assets_v40/js/jquery.ui.touch-punch.js'

/* IMPORT START ******************************************/
import '@/assets_v40/font/pretendardvariable-dynamic-subset.css'
import "@/assets_v40/css/init.css";
import "@/assets_v40/css/common.css";
import "@/assets_v40/css/main.css";
import "@/assets_v40/css/mydata.css";
import '@/assets_v40/js/slick.min.js'
import "@/assets_v40/css/slick.css";
import '@/assets_v40/js/common-ui.js'

import "@/assets_v40/css/newmain.css";
import "@/assets_v40/css/style_2022.css";
import "@/assets_v40/css/style_2023.css";
import "@/assets_v40/css/style_2024.css";
/* IMPORT END ********************************************/  

import '@/assets/js/common_cokbank.js'                                // 콕뱅크 Native호출을 위한 자바스크립트
import '@/assets/js/common_ofa_2025.js'                                    // 스뱅 Native호출을 위한 자바스크립트
import '@/assets/js/communication_2025.js'                                 // common_ofa.js 를 호출 하기 위한 자바스크립트          
import '@/common/plugins/axios'                                       // Ajax와 같은 기능을 제공하는 자바스크립트

Vue.config.productionTip = false

// splash 이미지 삭제
document.getElementById('splash-img').style.display = 'none'

new Vue({
  router,
  store,
  //filter,
  render: h => h(App)
}).$mount("#app");