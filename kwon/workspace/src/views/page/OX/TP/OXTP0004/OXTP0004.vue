<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > OX퀴즈
* @ 페이지설명 : 전체메뉴 > OX퀴즈 > 오늘의 퀴즈 > 정답(X)
* @ 파일명     : src\views\page\OX\TP\OXTP0004\OXTP0004.vue
* @ 작성자     : CS530689
* @ 작성일     : 2025-04-01
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-04-01              CS530689              최초작성
*************************************************************************/
-->
<template>
	<div>
        <div class="dimmed" style="display:block;"></div>	
        <div class="center_popup" id="center_popup" style="display:block;"> <!-- 개발시 style="display:block;" 제거 -->
            <div class="popup_content">
                <div class="oxquiz_result">
                <strong class="tit">정답이에요.</strong>
                <span class="shape correct_x"></span>
                <p class="txt">정답 : X</p>
                <p class="txt_sub">내일도 도전해 보세요.</p>
                </div>
            </div>
            <div class="popup_footer">
                <div class="btns_wrap">
                <button type="button" class="btns lg primary" @click.prevent="close('ok')">확인</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import {dateFormat} from '@/utils/date'

export default {
    name : "OXTP0004",
    data: () => {
        return {
            quizInfo : null,

        }
    },
    mounted() {
	    //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

        this.initComponent(this.params)
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    methods: {
        initComponent(param = {}) {
			this.quizInfo = param

            console.log('this.quizInfo :::', this.quizInfo)

            this.getData()
        },
        getData() {

		}
    }
}
</script>