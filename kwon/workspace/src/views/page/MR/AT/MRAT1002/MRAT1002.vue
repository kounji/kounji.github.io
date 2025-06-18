<!--
/*************************************************************************
* @ 서비스경로 : 공통
* @ 페이지설명 : 약관/동의 > 이용약관 > 이용약관 상세(선택동의)
* @ 파일명     : src/views/page/MR/AT/MRAT1002/MRAT1002.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-05-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-11-24             CS515729                 최초작성
* 2021-12-07             CS515729                 동의안함 버튼 관련 숨김처리
* 2022-08-01             CS528061                 고도화 및 파일명 변경(src/views/page/CO/AT/COAT1105/COAT1105.vue -> src/views/page/MR/AT/MRAT1002/MRAT1002.vue)
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>약관동의</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>		
		<div class="popup_content" :class="{'com_no_bottom' : !isLastVerStlt}"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner com_line_type01 com_top_type02">
				<strong class="com_pop_tit01">{{stltTinm}}</strong>
			</div>
			<div class="terms_view">
				<div>
					<div class="tar">
						<button type="button" class="btn_select_round" @click="selectStltVerClick()">
							<span class="num">{{currentEfocDt | dateFilter("YYYY.MM.DD")}} </span><span class="txt">시행</span><span class="caret"></span>
						</button>
					</div>
					<div class="terms_txt">
                        <p v-html="stltCntn"></p>
                    </div>
				</div>
			</div>
			
		</div>
		<div class="popup_footer fixed" v-show="isLastVerStlt">
			<div class="btn_full_box">
                <template v-if="!agrDtm">
                    <a href="javascript:void(0);" class="btn btn_mint" v-if="!agrDtm" @click.prevent="fn_saveAgree('Y')">동의</a>
                </template>
                <template v-else>
                    <p class="btn btn_grey_e2">
                        <span class="com_txtinfo_type01">{{agrDtm | dateFilter("YYYY년 M월 D일")}} 본 약관(동의서)에 동의함</span>
                    </p>
                </template>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close txt_cancel" @click="close()"><span>취소</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import {dateFormat} from '@/utils/date'
import _ from 'lodash'

export default {
    name : "MRAT1002",
    data: () => {
        return {
            objStltInfo   : {},         // 전달파라미터
            selectStltTpc : "",	        // 약관유형코드
            selectSqno    : "",	        // 일련번호
            respInfo      : {},         // 응답결과
            respVerInfo   : {},         // 응답결과(버전)
            stltTinm      : "",	        // 약관제목
            stltCntn      : "",	        // 약관내용
            stltVerList   : [],	        // 변경이력
            agrDtm        : "",         // 동의일시
            currentEfocDt : "",         // 시행일자

            lastVerSqno   : "",         // 최종이력 약관일련번호

            today         : dateFormat(new Date(), "YYYY년 MM월 DD일") // 현재 날짜
        }
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    computed: {
        /* 최종버전약관 여부(약관일련번호 비교) */
        isLastVerStlt() {
            if(this.selectSqno == ""  && this.lastVerSqno == "") {
                return false
            } else {
                return this.selectSqno === this.lastVerSqno
            }
        }
    },
    created() {
        this.objStltInfo   = this.params.objStltInfo    	//전달파라미터
        this.selectStltTpc = this.objStltInfo.stltTpc	    //약관유형코드
        this.selectSqno    = String(this.objStltInfo.sqno)	//일련번호
    },
    mounted() {
        this.initComponent()
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent() {
            this.getData()	        // 상세조회
            this.getStltVerList()	// 이력조회
        },
        /* 약관상세조회 */
        getData() {
            const config = {
                url : '/co/at/02ra1',
                data : {
                    "stltTpc"   : this.selectStltTpc,               // 약관유형코드
                    "sqno"      : this.selectSqno,                  // 일련번호
                    "mydtCusno" : this.getUserInfo('mydtCusno'),    // 마이데이터고객번호
                }
            }
            apiService.call(config).then(response => {
                this.respInfo = response
                this.stltTinm = this.respInfo.asetAmnStltTinm || "" 
                this.stltCntn = this.respInfo.asetAmnStltCntn || ""
                this.agrDtm   = this.respInfo.agrDtm || ""          // 동의일시
                this.currentEfocDt = this.respInfo.efocDt || ""	    // 조회된 약관의 시행일자
            })
        },
        /* 약관변경이력 */
        getStltVerList() {
            const config2 = {
                url : '/co/at/02r02',
                data : {
                    "stltTpc" : this.selectStltTpc,	    // 약관유형코드
                }
            }
            apiService.call(config2).then(response => {
                this.respVerInfo = response
                this.stltVerList = this.respVerInfo.stltVerList
                this.stltVerList = _.chain(this.stltVerList).orderBy(['efocDt'],['desc']).value()

                //최종버전 약관일련번호
                this.lastVerSqno = String(this.stltVerList[0].sqno)
            })
        },
        /* 약관 시행일 팝업 */
        selectStltVerClick() {
            const config = {
                params : {
                    title : "시행날짜",
                    list : [], 
                    selectVal : this.selectStltTpc + "_" + this.selectSqno
                }
            }

            for (let i=0; i<this.stltVerList.length; i++) {
                let info={}
                info.comnCnm = dateFormat(this.stltVerList[i].efocDt)
                info.comnCId = this.stltVerList[i].stltTpc + "_" + this.stltVerList[i].sqno
                config.params.list.push(info)
            }
            
            modalService.openSelectSingle(config).then(response => {
                if (typeof response.comnCId !== "undefined") {
                    let comnCId = response.comnCId.split("_")

                    this.selectStltTpc = comnCId[0]	    // 약관유형코드
                    this.selectSqno    = comnCId[1]	    // 일련번호
                    
                    this.getData()
                }
            })
        },
        /* 제공약관 동의처리 */
        fn_saveAgree(flagYN) {
            let stltTpcFlag = ""

            /* 
            PFM006 : "[선택] 개인(신용)정보 수집·이용 동의서(상품·서비스안내)" : 000003
            PFM007 : "[선택] 개인(신용)정보 수집·이용 동의서(농협경제)"        : 000002
            */

            /* 제공항목코드 설정 */
            if(this.objStltInfo.stltTpc === "PFM006") {                  // 상품·서비스 안내 화면인 경우
                stltTpcFlag = "000003" // 제공항목코드 : 상품추천활용동의
            } else {                                                     // 농협경제 화면인 경우
                stltTpcFlag = "000002" // 제공항목코드 : 경제데이터
            }

            const config = {
                url : '/co/co/00i02',
                data : {
                    mydtCusno     : this.getUserInfo('mydtCusno'),   // 마이데이터고객번호
                    ofrHdngC      : stltTpcFlag,                     // 제공항목코드 : 값 고정 (000001 : 카드/자동차, 000002 : 경제데이터, 000003 : 상품추천활용동의)
                    agrYn         : (flagYN === "Y") ? "1" : "0",    // 동의여부
                    firEntPathVal : this.getUserInfo('chnlGbn'),     // 최초가입경로값 
                    lginInfVal    : this.getUserInfo('lginInfVal'),  // 로그인정보값
                    lginDtm       : this.getUserInfo('lginDtm'),     // 로그인일시(14자리)
                }
            }
            
            apiService.call(config).then(response => {
                if(response.rspC === "0000") {
                    let message = (flagYN ==="Y") ? this.today + "<br>약관의 동의처리가 완료되었습니다." : "약관의 동의처리가 철회되었습니다.";
                    modalService.alert(message).then(() => {
                        this.closeAll()
                        
                    })
                }
            })
        }
    }
}
</script>