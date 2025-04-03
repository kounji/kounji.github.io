<!--
/*************************************************************************
* @ 서비스경로 : 큰글모드 > 자산 > 보이스피싱 예방 10계명
* @ 페이지설명 : 큰글모드 > 자산 > 보이스피싱 예방 10계명
* @ 파일명     : src/views/page/AS/TA/ASTA4S17/ASTA4S18.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-03-04
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-04              CS541597               최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>보이스피싱 예방 10계명</h1>
		</div>

		<div class="popup_content">
            <div class="phishing_senior">
                <div class="board_box">
                    <h2>보이스피싱 예방<br>10계명</h2>
                    <p>확인하고 함께 예방해요</p>

                    <lottie-animation :animationData="require('@/assets_v40/images/lottie/plz_phishing.json')" :loop="true" :autoPlay="true" aria-hidden="true" class="plz_phishing" ></lottie-animation>

                    <ul>
                        <li>
                            <span>1</span>
                            <em>정보기관</em>에서  <em>자금이체를 요구</em>하면 보이스피싱 의심
                        </li>
                        <li>
                            <span>2</span>
                            <em>전화, 문자로 대출권유시</em> 금융회사 여부 확인
                        </li>
                        <li>
                            <span>3</span>
                            대출 처리 비용 등을 이유로 <em>선입금 요구</em>시 보이스피싱 의심
                        </li>
                        <li>
                            <span>4</span>
                            <em>저금리 대출을 위한 고금리 대출 상환 권유</em>는 100% 보이스 피싱
                        </li>
                        <li>
                            <span>5</span>
                            납치, 협박 전화를 받는 경우 <em>자녀 안전부터 확인</em>
                        </li>
                        <li>
                            <span>6</span>
                            채용을 이유로 <em>계좌비밀번호 등 요구시</em> 보이스피싱 의심
                        </li>
                        <li>
                            <span>7</span>
                            <em>가족 등 사칭 금전 요구</em>시 먼저 본인확인
                        </li>
                        <li>
                            <span>8</span>
                            <em>출처 불명 파일, 이메일, 문자</em>는 클릭하지 말고 삭제
                        </li>
                        <li>
                            <span>9</span>
                            <em>금감원 팝업창</em> 뜨고 <em>정보입력 요구</em>시 100% 보이스피싱
                        </li>
                        <li>
                            <span>10</span>
                            보이스피싱 피해 발생 시 <em>즉시 신고 후 피해금 환금신청</em>
                        </li>
                    </ul>

                    <p>출처 : 금융감독원</p>
                </div>
            </div>
		</div>
        
		<!-- 20211108 한별 접근성 role="button" 추가 S -->
		<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
		<!--// 20211108 한별 접근성 role="button" 추가 E -->			
		
	</div>
	<!--// full popup E -->
</template>

<script>

/*eslint-disable */
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import LottieAnimation from 'lottie-web-vue'

export default {
    name : "ASTA4S18",
    data: () => {
        return {
            
        }
    },
    computed : {
        
    },
    created() {
        
    },
    mounted() {
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)  
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    methods: {
        
    },
    components : {
        LottieAnimation
    }
}
</script>