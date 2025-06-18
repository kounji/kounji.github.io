<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > OX퀴즈
* @ 페이지설명 : 전체메뉴 > OX퀴즈 > 오늘의 퀴즈
* @ 파일명     : src\views\page\OX\TP\OXTP0001\OXTP0001.vue
* @ 작성자     : CS530689
* @ 작성일     : 2025-04-01
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-04-01              CS530689              최초작성
*************************************************************************/
-->
<template>
	<div class="full_popup oxquiz" id="full_popup_01">
		<div class="popup_header">    
			<h1>OX퀴즈</h1>
		</div>
		<div class="popup_content">
			<div class="oxquiz_question">
				<span class="badge">{{quizInfo.ctgrDsc}}</span>
				<p class="date">{{getBltnDtFormat}}</p>
				<strong class="tit">{{quizInfo.qstCntn}}</strong>
				<ul class="btn_ox">
					<li>
						<input type="radio" name="oxquiz_ch" id="oxquiz_ch1" v-model="answer" value="1">
						<label for="oxquiz_ch1">Yes</label>
					</li>
					<li>
						<input type="radio" name="oxquiz_ch" id="oxquiz_ch2" v-model="answer" value="0">
						<label for="oxquiz_ch2">No</label>
					</li>
				</ul>
				<a href="javascript:void(0)" v-if="quizInfo.cntzUrlnm" @click="fnOpenContents()" class="btns_txt"><span>힌트보기</span></a>
				<ul class="dotted_list sm" v-if="quizInfo.refCntn" v-html="quizInfo.refCntn">
				</ul>
			</div>
		</div>
        <div class="popup_footer fixed">
			<div class="btn_full_box">
				<button type="button" :class="'btns lg primary' + (answer === '' ? ' disabled' : '')" @click="sendAnswer()">정답 제출하기</button>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import {dateFormat} from '@/utils/date'

import OXTP0002 from '@/views/page/OX/TP/OXTP0002/OXTP0002'
import OXTP0003 from '@/views/page/OX/TP/OXTP0003/OXTP0003'
import OXTP0004 from '@/views/page/OX/TP/OXTP0004/OXTP0004'
import OXTP0005 from '@/views/page/OX/TP/OXTP0005/OXTP0005'
import COCT4011 from '@/views/page/CO/CT/COCT4011/COCT4011' // 금융지식 컨텐츠 상세

export default {
    name : "OXTP0001",
    data: () => {
        return {
            quizInfo : {},  //퀴즈정보
            answer : '',  //답변(o, x)
            sendYn : false, //정답제출여부
        }
    },
    computed: {
        getBltnDtFormat() {
            return dateFormat(this.quizInfo.bltnDt, 'YYYY년 MM월 DD일')
        }
    },
    mounted() {
	    //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

        this.initComponent(this.params)
        console.log('this.params :::', this.params)
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    methods: {
        initComponent(param = {}) {
			this.quizInfo = param

            console.log('this.quizInfo :::', this.quizInfo)

            // this.quizInfo.bltnDt = dateFormat(this.quizInfo.bltnDt, 'YYYY년 MM월 DD일')
        },
        //정답 제출
        sendAnswer() {
            if(this.sendYn){
                modalService.alert("이미 정답을 제출했습니다.").then(()=>{
                    this.close('ok')
                })
            }else{
                if(this.answer !== ''){
                    let compName = ''
                    let pzwnYn = ''

                    //정답이 O일경우
                    if(this.quizInfo.cranswYn === '1'){
                        //답변이 O일경우
                        if(this.answer === '1'){
                            compName = OXTP0002
                            pzwnYn = '1'
                        }else{
                            compName = OXTP0003
                            pzwnYn = '0'
                        }
                    }else{
                    //정답이 X일경우
                        //답변이 X일경우
                        if(this.answer === '0'){
                            compName = OXTP0004
                            pzwnYn = '1'
                        }else{
                            compName = OXTP0005
                            pzwnYn = '0'
                        }
                    }
                    
                    this.sendYn = true

                    const pConfig = {
                        component: compName,
                    }
                    //도전현황 조회
                    const config = {
                        url: '/mr/ev/20rs01', 
                        data: {
                            "mydtCusno" : this.getUserInfo('mydtCusno'),
                            "mydtEvtSqno" : this.quizInfo.mydtEvtSqno,
                            "bltnDt" : this.quizInfo.bltnDt,
                            "pzwnYn" : pzwnYn,
                        },
                    }
                    apiService.call(config).then(response =>{
                        modalService.openPopup(pConfig).then((response) => {
                            this.close(response)
                        })
                    })
                }else{
                    modalService.alert("정답을 선택해 주세요.")
                }
            }
		},
        // 금융지식 컨텐츠 상세 팝업
        fnOpenContents() {
            const config = {
                component: COCT4011,
                params   : this.params.cntzUrlnm
            }
            
            modalService.openPopup(config).then(() => {})
        },
    }
}
</script>