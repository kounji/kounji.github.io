<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > OX퀴즈
* @ 페이지설명 : 전체메뉴 > OX퀴즈 > 도전현황 > 문제 보기
* @ 파일명     : src\views\page\OX\TP\OXTP0007\OXTP0007.vue
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
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup">
                <div class="popup_header">
                    <h1>OX퀴즈</h1>
                </div>
                <div class="popup_content">
                    <div class="oxquiz_question">
                        <span class="badge">{{quizInfo.ctgrDsc}}</span>
                        <p class="date">{{quizInfo.bltnDt}}</p>
                        <strong class="tit">{{quizInfo.qstCntn}}</strong>
                        <em class="correct_txt">정답 : {{quizInfo.cranswYn == '1' ? 'O' : 'X'}}</em>
                        <p class="gray_box">{{quizInfo.answCntn}}</p>
                    </div>
                </div>

                <div class="popup_footer fixed" v-if="quizInfo.cntzUrlnm">
                    <div class="btns_wrap half">
                        <button type="button" class="btns lg primary" @click="fnOpenContents(quizInfo.cntzUrlnm)">관련 금융지식 보기</button>
                    </div>
                </div>

                <a href="javascript:void(0)" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
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

import COCT4011 from '@/views/page/CO/CT/COCT4011/COCT4011' // 금융지식 컨텐츠 상세

export default {
    name : "OXTP0007",
    data: () => {
        return {
            quizInfo : {},   //퀴즈 정보
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
            this.getData(param)
        },
        getData(param) {
            //퀴즈 정보 조회
            const config = {
                url: '/mr/ev/19r01', 
                data: {
                    "bltnDt" : param.bltnDt,
                },
            }
            apiService.call(config).then(response =>{
                console.log('response : ', response)
                this.quizInfo = response
                this.quizInfo.bltnDt = dateFormat(this.quizInfo.bltnDt, 'YYYY년 MM월 DD일')
            })
		},
        // 금융지식 컨텐츠 상세 팝업
        fnOpenContents(cntzId) {
            const config = {
                component: COCT4011,
                params   : cntzId
            }
            
            modalService.openPopup(config).then(() => {})
            this.close()
        }
    }
}
</script>