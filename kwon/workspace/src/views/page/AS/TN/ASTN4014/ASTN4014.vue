<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 숨은 자산 > 해지완료
* @ 페이지설명 : 자산 > 숨은 자산 > 해지완료
* @ 파일명     : src/views/page/AS/TN/ASTN4014/ASTN4014.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-04-15
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-04-15              CS541599              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>해지완료</h1>
		</div>

		<div class="popup_content">
            <section class="close_account">
                <p class="done">
					<!-- 25-03-10 수정-->
                    <strong>{{recipientType == 'T' ? '잔고 이전':'잔액 기부'}} 및 계좌 해지 신청이<br>완료 되었습니다.</strong>
					<!-- //25-03-10 수정-->
                    아래 내용을 확인해 주세요.
                </p>

                <div class="board_box">    
                    <ul class="sleep_list">
                        <li><em>금융기관</em><span>{{infOfrmnOrgNm}}</span></li>
                        <li><em>예금종류(상품명)</em><span>{{prodName}}</span></li>
                        <li><em>해지계좌번호</em><span>{{accountNum}}</span></li>
                        <li><em>예금주명</em><span>{{accountName}}</span></li>
                        <li><em>처리일자시간</em><span>{{fnDateFormat(terminationDtm)}}</span></li>
                        <template v-if="recipientType == 'T'">
                            <li><em>잔고이전방법</em><span class="bank">계좌이체 <span>({{recvInfoOfrmnOrgCNm}} {{recvAccountNum}})</span></span></li>
                        </template>
                        <template v-else>
                            <li><em>잔고이전방법</em><span>서민금융진흥원 기부</span></li>
                            <template v-if="receiptYn == 'Y'"> 
                                <li><em>현금영수증 발급</em><span>발급</span></li>
                            </template>
                        </template>
                    </ul>
                </div>

                <a href="javascript:void(0);" target="_blank" title="새창열기" class="banner" @click.prevent="fnRcmDetail()" role="button"
                    v-if="this.getUserInfo('chnl') === '386'"> <!--[v4.0] 25-04-14 title 추가 -->
                    <img src="@/assets_v40/images/banner/img_banner_close_account_pocket.png" alt="계좌를 해지하셨네요! 농축협 금융상품을 만나보세요!" />
                </a>

            </section>
		</div>

        <div class="popup_footer fixed">
			
            <div class="btn_full_box">
				<button type="button" class="btns lg primary" @click.prevent="closeAllData({flag:'refresh'})">확인</button>
            </div>
        </div>

		<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="closeAllData({flag:'refresh'})"><span class="blind">팝업닫기</span></a><!-- 25-03-21 팝업닫기버튼추가 -->
	</div>
	<!--// full popup E -->
</template>

<script>

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

import apiService from '@/service/apiService'
import appService from '@/service/appService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'
import {mapGetters, mapActions} from 'vuex'
import {dayDiff, dateFormat} from '@/utils/date'
import _ from 'lodash'
import Template from '../../../XX/template/template.vue'

export default {
    name : "ASTN4014",
    data: () => {
        return {
            infOfrmnOrgNm       : '', // 정보제공자기관코드명
            prodName            : '', // 계좌상품명
            accountNum          : '', // 해지계좌번호
            accountName         : '', // 계좌예금주명
            terminationDtm      : '', // 처리일자
            recipientType       : '', // 잔고이전 구분
            recvInfoOfrmnOrgCNm : '', // 출금 계좌 은행명
            recvAccountNum      : '', // 출금 계좌번호
            receiptYn           : '', // 기부영수증 발급여부
        }
    },
	computed: {
        ...mapGetters('user', [
            'userTermsAgreeList',
            'userTermsInvtInfo',
            'userRecvInfo'
        ]),
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

        getData(param) {
            let now = new Date()
            let yy = now.getFullYear()
            let mm  = this.fnLpad((now.getMonth() + 1),2,"0")
            let dd  = this.fnLpad(now.getDate(),2,"0")
            let hh  = this.fnLpad(now.getHours(),2,"0")
            let mi  = this.fnLpad(now.getMinutes(),2,"0")

            //this.terminationDtm      = yy+mm+dd+' '+hh+':'+mi     // 처리일자(오늘)
            this.terminationDtm      = param.terminationDtm       // // H 거래일시(밀리세컨드).substr(0,8)
            this.infOfrmnOrgNm       = param.infOfrmnOrgNm,       // 정보제공자기관코드명
            this.prodName            = param.prodName,            // 계좌상품명
            this.accountNum          = param.accountNum,          // 해지계좌번호
            this.accountName         = param.accountName,         // 계좌예금주명
            this.recipientType       = param.recipientType,       // 잔고이전 구분
            this.recvInfoOfrmnOrgCNm = param.recvInfoOfrmnOrgCNm, // 출금 계좌 은행명
            this.recvAccountNum      = param.recvAccountNum,      // 출금 계좌번호
            this.receiptYn           = param.receiptYn            // 기부영수증 발급여부
        },
        /* 금융상품몰의 주머니상품으로 이동 */
        fnRcmDetail() {
            let url = "SFBCA0000R" // 주머니금리쇼핑예금(복리식정기예탁금)
            appService.moveFinancialProductPage(url)
        },
        fnLpad(v, len, pv) {
            v = v + '';
            return v.length >= len ? v : new Array(len - v.length + 1 ).join(pv) + v;
        },
        fnDateFormat(dt) {
            if(_.isEmpty(dt) || dt == "00000000") {
                return "-"
            }

            let tmpDt = dt.replace(/[^0-9]/g, '');

            if(_.isEmpty(tmpDt)) {
                return "-"
            } else {
                return dateFormat(tmpDt, 'YYYY.MM.DD')
            }
        },

    },
    components : {
        Template

    },
    destroyed() {
        this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>