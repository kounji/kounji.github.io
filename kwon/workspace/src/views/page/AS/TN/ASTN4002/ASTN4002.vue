<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 숨은 자산 > 휴면계좌/휴면보험금 계좌 상세
* @ 페이지설명 : 자산 > 숨은 자산 > 휴면계좌/휴면보험금 계좌 상세
* @ 파일명     : src/views/page/AS/TN/ASTN4002/ASTN4002.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-03-10
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-03-10              CS541599              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>{{param.dsc == '01' ? '계좌상세조회' : '입출금'}}</h1>
		</div>

		<div class="popup_content" v-if="param.dsc == '01'">
            <section class="sleep_details">
				<p class="inquiry_date">조회기준일 {{fnDateFormat(dorBnk.rcnInqDtm)}}</p>
                <div class="board_box">
                    <h2 class="title">
                        <i :class="'ico_bank ' + dorBnk.infOfrmnOrgC"></i>
                        {{dorBnk.infOfrmnOrgnm + ' ' + dorBnk.acWrsnm}}
                    </h2>

                    <div class="outline">
                        <span class="account">{{dorBnk.mydtAcno}}</span>
                        <span class="num">{{dorBnk.acNowBac | numberFilter}}{{dorBnk.curc}}</span>
                        <div class="exe_btns" v-if="dorBnk.dorDataDsc == '01'">
                            <button type="button" class="btns" @click.prevent="fnCloSrch()">해지가능여부조회</button>
                        </div>
                    </div>

                    <ul class="sleep_list">
                        <li><em>잔액</em><span>하드코딩 23,000원</span></li>
                        <li><em>계좌 상태</em><span>-</span></li>
                        <li><em>거래메모</em><span>하드코딩죽었다살아남</span></li>
						<li><em>최종 거래일</em><span>하드코딩 2020.02.02</span></li>
                    </ul>
                </div>
				<div class="gray_box">
					<p class="dotted_list">계좌에 연계된 자동납부 및 자동송금 내역은<br>08:00 ~ 24:00에만 조회 가능합니다.</p>
				</div>
            </section>
		</div>
        <div class="popup_content" v-else>
                <section class="sleep_details">

                    <div class="board_box">
                        <h2 class="title">
                            <i :class="'ico_bank '+dorIsr.infOfrmnOrgC"></i>
                            {{dorIsr.infOfrmnOrgNm}} {{dorIsr.isrcoWrsnm}}
                        </h2>

                        <div class="outline">
                            <span class="account">{{dorIsr.isrSctsNo}}</span>
                            <span class="num">105,790,783원</span>
                        </div>

                        <ul class="sleep_list">
                            <li><em>보험사명</em><span>{{dorIsr.infOfrmnOrgNm}}</span></li>
                            <li><em>증권번호</em><span>{{dorIsr.isrSctsNo}}</span></li>
                            <li><em>상품명</em><span>{{dorIsr.isrcoWrsnm}}</span></li>
                            <li><em>휴면 보험금 금액</em><span>{{dorIsr.isrCtrAm | numberFilter}}{{dorIsr.curc}}</span></li>
                            <li v-if="!isEmpty(dorIsr.xttPspPfnDt)"><em>소멸시효 만료일</em><span>2025.07.31</span></li>
                            <li><em>기록내용</em><span>{{dorIsr.recCntn}}</span></li>
                        </ul>
                    </div>
                </section>
            </div>
        <!-- 25-03-07 추가 -->
		<div class="popup_footer fixed">
            <div class="btn_full_box">
				<button type="button" class="btns lg primary" @click.prevent="close()">확인</button>
            </div>
        </div>
		<!-- 25-03-07 추가 -->
		<a href="#nolink" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
		
	</div>
	<!--// full popup E -->
</template>

<script>

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'

import apiService from '@/service/apiService'
import commonService from '@/service/commonService'
import {mapActions} from 'vuex'
import {defineAsyncComponent} from 'vue'
import {dateFormat} from '@/utils/date'

import LottieAnimation from 'lottie-web-vue' // import lottie-web-vue
import plzLotteryJson from "@/assets_v40/images/lottie/bg_no_result.json"

import _ from 'lodash'

export default {
    name : "ASTN4002",
    data: () => {
        return {
            param         : {},
            dorBnk        : [], // 숨은자산 휴면계좌
            dorIsr        : [], // 숨은자산 휴면보험
        }
    },
	computed: {
    },
    mounted() {
        this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        ...mapActions('myassets', [
            'getMyBizRegInfo','getAllMyAssetInfo'
        ]),
        initComponent(param) {
            this.getData(param)
        },
        /* 숨은자산 상세조회 */
        getData(param) {
            this.param = param
            console.log("@@@ 상세 input =>",param)
            // 1 : 휴면계좌
            // 2 : 휴면보험금
            // 3 : 휴면보험금(미청구)
            /*
            const config = {
                url: '/as/tn/01r02',
                data: {
                    mydtCusno    : param.mydtCusno,                                      // 마이데이터 고객번호
                    inqDsc       : param.dsc,                                            // 구분코드 01:계좌 02:보험금 03:보험금(미청구)
                    mydtAcno     : param.dsc == '01' ? param.mydtAcno : param.isrSctsNo, // 01:계좌번호 또는 02,03:보험증권번호
                    infOfrmnOrgC : param.infOfrmnOrgC                                    // 정보제공자기관코드
                }
            }
            apiService.call(config).then(response => {
                console.log("@@@ 숨은자산 상세조회 =>", response)
                
            })
            */
        },
        /* 약관동의 */
        fnStltAgree(item) {
            let stltList = [
                {stltTinm : '약관내용 1번 제목', stltCntn : '약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용약관내용 1번의 상세내용'},
                {stltTinm : '약관내용 2번 제목', stltCntn : '약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용약관내용 2번의 상세내용'},
                {stltTinm : '약관내용 3번 제목', stltCntn : '약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용'},
                {stltTinm : '약관내용 4번 제목', stltCntn : '약관내용 4번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용약관내용 3번의 상세내용'}
            ]

            // 약관 팝업 호출
            let compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4004/ASTN4004"))
            const config = {
                component: compName, 
                params   : {
                        callDsc        : 'E',
                        eligibilityObj : {
                                apiOrgCode      : this.apiOrgCode,   // 이용기관코드
                                bankCode        : '001',             // 개설 금융회사 코드
                                accountNum      : item.mydtAcno,     // 계좌 번호
                                depositSequence : item.mydtScno      // 예금 회차 번호
                            },
                        stltList       : stltList
                    }
            }

            modalService.openPopup(config).then(response => {
                // 해지가능여부 조회는 이미 약관에서 처리하고 돌아옴
                if(!this.isEmpty(response)) { // 동의 완료
                    // 계좌이체/기부로 이동
                    let compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4006/ASTN4006")) // 계좌이체/기부

                    const config = {
                        component : compName,
                        params    : {
                            apiOrgCode      : response.apiOrgCode      // 이용기관코드
                        }
                    }
                    
                    modalService.openPopup(config).then((response) => {

                    });
                }
            })
        },

        fnDateFormat(dt) {
            return dateFormat(dt, 'YYYY.MM.DD')
        },

        /* 팝업 열기 */
        fnOpenPopup(scrId) {
            let compName = ''

            if(scrId == "ASTN4003") {         // 해지계좌목록
                compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4003/ASTN4003"))
            } else if(scrId == "ASCR4101") {  // 나의신용점수올리기
                compName = defineAsyncComponent(() => import("@/views/page/AS/CR/ASCR4101/ASCR4101"))
            }

            const config = {
                component: compName
            }
            
            modalService.openPopup(config).then((response) => {
                /*
                if(scrId == "COCO4351") {
                    if(response == "refresh") {
                        this.getInteList()
                    }
                }
                */
            });

        },

        isEmpty(value) {
            if(typeof(value) == 'object') {
                if(Array.isArray(value)) {
                    return value.length < 1 ? true : false
                } else {
                    return Object.keys(value).length < 1 ? true : false
                }
            }
            
            return (value === null || value === undefined || value.length < 1) ? true : false
        },
    },
    components : {

    },
    destroyed() {
        //this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>