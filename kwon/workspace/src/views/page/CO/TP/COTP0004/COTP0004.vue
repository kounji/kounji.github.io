<!--
/*************************************************************************
* @ 서비스경로 : 미가입모드 > 서비스 가입 팝업
* @ 페이지설명 : 미가입모드 > 서비스 가입 팝업
* @ 파일명     : src/views/page/CO/TP/COTP0004/COTP0004.vue
* @ 작성자     : CS541817
* @ 작성일     : 2025-03-21
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-03-21              CS541817              최초작성
*************************************************************************/
-->
<template>
	<div>
		<div class="dimmed" style="display:block;"></div>	
        <div class="center_popup" id="center_popup" style="display:block;"> <!-- 개발시 style="display:block;" 제거 -->
            <div class="popup_content">
                <div class="cok_desc">
                    <p class="tit">선택하신 서비스 이용을 위해<br><em>서비스 가입</em>이 필요해요.</p><!-- [v4.0] 25-02-10 문구 수정 -->
                    <p class="txt">한눈에 보는 나의 금융생활<br>자산현황, 소비습관을 쉽게 알려드려요.</p>
                </div>
            </div>
            <div class="popup_footer">
                <div class="btns_wrap">
                    <button type="button" class="btns lg" @click.prevent="close()"> 다음에</button>
                    <button type="button" class="btns lg primary" @click.prevent="joinSvc()" >서비스 가입</button>
                </div>
            </div>
        </div>
	</div>
</template>

<script>

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import COAS4001 from '@/views/page/CO/AS/COAS4001/COAS4001' // 서비스 가입

import apiService from '@/service/apiService'
import _ from 'lodash'

export default {
    name : "COTP0004",
    data: () => {
        return {

        }
    },
	computed: {
    },
    mounted() {
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        // 서비스 가입 (마이데이터 가입 1단계로 이동)
        joinSvc() {          
            const config = {
                component: COAS4001
            }
            this.close();
            modalService.openPopup(config).then()
        },


    },
    components : {

    },
    destroyed() {

    }
}

</script>