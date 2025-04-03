<!--
/*************************************************************************
* @ 서비스경로 : 큰글모드 > 자산 > 부채 > 대출목록
* @ 페이지설명 : 큰글모드 > 자산 > 부채 > 대출목록
* @ 파일명     : src/views/page/AS/TA/ASTA4S10/ASTA4S10.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-02-24
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-24              CS541597               최초작성
*************************************************************************/
-->
<template>
	<!-- 전체 팝업 시작 -->
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>대출</h1>
		</div>	
		<div class="popup_content">
			<div class="assets_senior">

				<div class="board_box" v-if="creditCnt > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">신용대출<em>{{creditCnt}}</em></span>
							<span class="num"><em>{{creditAmnt | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
                                <li v-for="(creditOutObj, idx) in creditOut" :key="'credit_'+idx">
                                    <a href="javascript:void(0);" @click.prevent="fn_openDtlPop(creditOutObj, creditOutObj.loanType)">
                                        <i class="ico_bank" :class="creditOutObj.infOfrmnOrgC"><span class="blind">{{creditOutObj.infOfrmnOrgCNm}}</span></i>
                                        <div>
                                            <strong class="org">{{creditOutObj.wrsnm}}</strong>
                                            <strong class="account">{{creditOutObj.mydtAcno}}</strong>
                                        </div>
                                        <strong class="num"><em>{{creditOutObj.bac | numberFilter}}</em>원</strong>
                                    </a>
                                </li>
							</ul>
                            <div class="btns_wrap" v-if="creditCnt > 3 && !moreCreditYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('CREDIT')">신용대출 더보기</button>
							</div>
						</div>
					</details>
				</div>

				<div class="board_box" v-if="mortgageOutCnt > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">담보대출<em>{{mortgageOutCnt}}</em></span>
							<span class="num"><em>{{mortgageOutAmnt | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
                                <li v-for="(mortgageOutObj, idx) in mortgageOut" :key="'mortgage_'+idx">
                                    <a href="javascript:void(0);" @click.prevent="fn_openDtlPop(mortgageOutObj, mortgageOutObj.loanType)">
                                        <i class="ico_bank" :class="mortgageOutObj.infOfrmnOrgC"><span class="blind">{{mortgageOutObj.infOfrmnOrgCNm}}</span></i>
                                        <div>
                                            <strong class="org">{{mortgageOutObj.wrsnm}}</strong>
                                            <strong class="account">{{mortgageOutObj.mydtAcno}}</strong>
                                        </div>
                                        <strong class="num"><em>{{mortgageOutObj.bac | numberFilter}}</em>원</strong>
                                    </a>
                                </li>
							</ul>
                            <div class="btns_wrap" v-if="mortgageOutCnt > 3 && !moreMortgageYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('MORTGAGE')">담보대출 더보기</button>
							</div>
						</div>
					</details>
				</div>

				<div class="board_box" v-if="loanP2PCnt > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">P2P 금융<em>{{loanP2PCnt}}</em></span>
							<span class="num"><em>{{loanP2POutAmnt | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
                                <li v-for="(loanP2POutObj, idx) in loanP2POut" :key="'p2p_'+idx">
                                    <a href="javascript:void(0);" @click.prevent="fn_openDtlPop(loanP2POutObj, 'P2P')">
                                        <i class="ico_bank" :class="loanP2POutObj.infOfrmnOrgC"><span class="blind">{{loanP2POutObj.infOfrmnOrgCNm}}</span></i>
                                        <div>
                                            <strong class="org">{{loanP2POutObj.p2PWrsTpcNm}}</strong>
                                            <strong class="account">{{loanP2POutObj.lnCtrNo}}</strong>
                                        </div>
                                        <strong class="num"><em>{{loanP2POutObj.p2PLnBac | numberFilter}}</em></strong>
                                    </a>
                                </li>
							</ul>
                            <div class="btns_wrap" v-if="loanP2PCnt > 3 && !moreP2pYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('P2P')">P2P금융 더보기</button>
							</div>
						</div>
					</details>
				</div>

				<div class="board_box" v-if="bondCnt > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">대부<em>{{bondCnt}}</em></span>
							<span class="num"><em>{{bondOutAmnt | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
                                <li v-for="(bondOutObj, idx) in bondOut" :key="'bond_'+idx">
                                    <a href="javascript:void(0);" @click.prevent="fn_openDtlPop(bondOutObj, 'BOND')">
                                        <i class="ico_bank" :class="bondOutObj.infOfrmnOrgC"><span class="blind">{{bondOutObj.infOfrmnOrgCNm}}</span></i>
                                        <div>
                                            <!-- 채권/대부기관명 -->
                                            <strong class="org">{{bondOutObj.infOfrmnOrgCNm}}</strong>
                                            <strong class="account">{{bondOutObj.mydtAcno}}</strong>
                                        </div>
                                        <!-- 채권대출잔액 -->
                                        <strong class="num"><em>{{bondOutObj.mydtBndNo | numberFilter}}</em>원</strong>
                                    </a>
                                </li>
							</ul>
                            <div class="btns_wrap" v-if="bondCnt > 3 && !moreBondYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('BOND')">대부 더보기</button>
							</div>
						</div>
					</details>
				</div>

			</div>	
		
		</div>

		<a href="javascript:void(0);" class="btn_close" @click="close"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>

/*eslint-disable */
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'

import ASLN2005 from '@/views/page/AS/LN/ASLN2005/ASLN2005'
import ASLN2006 from '@/views/page/AS/LN/ASLN2006/ASLN2006'
import ASLN2007 from '@/views/page/AS/LN/ASLN2007/ASLN2007'
import ASLN2008 from '@/views/page/AS/LN/ASLN2008/ASLN2008'
import ASLN1119 from '@/views/page/AS/LN/ASLN1119/ASLN1119'
import ASLN2002 from '@/views/page/AS/LN/ASLN2002/ASLN2002'
import ASLN2003 from '@/views/page/AS/LN/ASLN2003/ASLN2003'
import ASLN4004 from '@/views/page/AS/LN/ASLN4004/ASLN4004'
import ASIV2003 from '@/views/page/AS/IV/ASIV2003/ASIV2003'

export default {
    name : "ASTA4S10",
    data: () => {
        return {
            mydtCusno           : "",           // 마이데이터고객번호
            loanCnt             : 0,            // 대출총계(갯수)
            loanAmnt            : 0,            // 대출합계금액
            creditCnt           : 0,            // 신용대출총계
            creditAmnt          : 0,            // 신용대출합계금액
            mortgageOutCnt      : 0,            // 담보대출총계
            mortgageOutAmnt     : 0,            // 담보대출합계금액
            loanP2POutCnt       : 0,            // P2P대출총계
            loanP2POutAmnt      : 0,            // P2P대출합계금액
            bondOutCnt          : 0,            // 채권대출총계
            bondOutAmnt         : 0,            // 채권대출합계금액
            creditOut           : [],           // 신용대출정보
            mortgageOut         : [],           // 담보대출정보
            loanP2POut          : [],           // P2P대출정보
            loanP2PCnt          : 0,            // P2P대출총계
            bondOut             : [],           // 채권대출정보
            bondCnt             : 0,            // 채권대출총계

            respInfo            : [],           // 응답데이터 원본 저장
            moreCreditYn        : false,        // 신용대출 더보기 여부
            moreMortgageYn      : false,        // 담보대출 더보기 여부
            moreP2pYn           : false,        // P2P 더보기 여부
            moreBondYn          : false,        // 대부 더보기 여부
        }
    },
    computed : {
        
    },
    created() {
        this.initComponent()
    },
    mounted() {
        // 자산수집 mutation 이벤트 감지 
        this.getGatheringListenSubscribe()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)    
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    methods: {
        initComponent() {
            this.mydtCusno  = this.getUserInfo('mydtCusno')
            this.getData()
        },
        // 초기 데이터 세팅
        getData() {
            // 실제 구현
            const config = {
                url: '/as/ln/01r03',
                data: {
                    mydtCusno: this.mydtCusno
                    // mydtCusno: '2000000543'
                }
            };
            
            apiService.call(config).then(response => {
                // response.creditCnt = 5
                // response.creditOut.push(...response.creditOut, ...response.creditOut, ...response.creditOut, ...response.creditOut, ...response.creditOut)
                console.log("========/as/ln/01r03=======",response)

                this.respInfo           = response  // 응답 원본데이터 저장

                this.loanCnt            = response.loanCnt || 0
                this.loanAmnt           = response.loanAmnt || 0
                this.creditCnt          = response.creditCnt || 0
                this.creditAmnt         = response.creditAmnt || 0
                this.mortgageOutCnt     = response.mortagageOutCnt || 0
                this.mortgageOutAmnt    = response.mortagageOutAmnt || 0
                this.loanP2POutCnt      = response.loanP2POutCnt || 0
                this.loanP2POutAmnt     = response.loanP2POutAmnt || 0
                this.bondOutCnt         = response.bondOutCnt || 0
                this.bondOutAmnt        = response.bondOutAmnt || 0
                this.creditOut          = response.creditOut || []
                this.mortgageOut        = response.mortagageOut || []
                this.loanP2POut         = response.loanP2POut || []
                this.loanP2PCnt         = this.loanP2POut.length || 0
                this.bondOut            = response.bondOut || []
                this.bondCnt            = this.bondOut.length || 0

                // 항목별 3개 초과시 더보기 버튼 기능 추가
                this.creditOut = this.creditCnt > 3 && !this.moreCreditYn ? this.creditOut.slice(0, 3) : this.creditOut
                this.mortgageOut = this.mortgageOut.length > 3 && !this.moreMortgageYn ? this.mortgageOut.slice(0, 3) : this.mortgageOut
                this.loanP2POut = this.loanP2POut.length > 3 && !this.moreP2pYn ? this.loanP2POut.slice(0, 3) : this.loanP2POut
                this.bondOut = this.bondOut.length > 3 && !this.moreBondYn ? this.bondOut.slice(0, 3) : this.bondOut
            })
        },
        /**
         * 더보기 선택 이벤트
         */
        fn_showMore(type) {
            if(type === 'CREDIT') {   // 신용대출
                this.creditOut = this.respInfo.creditOut
                this.moreCreditYn = true
            } else if(type === 'MORTGAGE') {    // 담보대출
                this.mortgageOut = this.respInfo.mortagageOut
                this.moreMortgageYn = true
            } else if(type === 'P2P') {    // P2P
                this.loanP2POut = this.respInfo.loanP2POut
                this.moreP2pYn = true
            } else if(type === 'BOND') {    // 대부
                this.bondOut = this.respInfo.bondOut
                this.moreBondYn = true
            }
        },

        /**
         * 항목별 일반상세팝업 연결
         */
        fn_openDtlPop(obj, type) {
            ////////////////////////////////////////////
            // type별 이동팝업
            // CREDIT_CARD              : ASLN2006
            // CREDIT_BANK, CREDIT_INSU : ASLN2005
            // CREDIT_MINUS             : ASLN4004
            // CREDIT_IV, MORT_IV       : ASIV2003
            // MORT_INSU                : ASLN2003
            // MORT_BANK                : ASLN2002
            // P2P                      : ASLN2007
            // BOND                     : ASLN2008
            ////////////////////////////////////////////
            let popId = ''
            let params = {}
            if(type == 'CREDIT_CARD') {
                popId = ASLN2006
                params = {
                    mydtCusno       : this.getUserInfo('mydtCusno'),
                    infOfrmnOrgC    : obj.infOfrmnOrgC,
                    lnDt            : obj.lnDt,
                    dtLnSc          : obj.dtLnSc,
                    loanType        : obj.loanType
                }
            } else if(type == 'CREDIT_BANK' || type == 'CREDIT_INSU') {
                popId = ASLN2005
                params = {
                    mydtCusno       : this.getUserInfo('mydtCusno'),
                    infOfrmnOrgC    : obj.infOfrmnOrgC,
                    mydtAcno        : obj.mydtAcno,
                    mydtScNo        : obj.mydtScNo,
                    isrSctsNo       : obj.isrSctsNo,
                    loanType        : obj.loanType
                }
            } else if(type == 'CREDIT_MINUS') {
                popId = ASLN4004
                params = {
                    mydtCusno       : this.getUserInfo('mydtCusno'),
                    infOfrmnOrgC    : obj.infOfrmnOrgC,
                    mydtAcno        : obj.mydtAcno,
                    mydtScNo        : obj.mydtScNo,
                    isrSctsNo       : obj.isrSctsNo,
                    loanType        : obj.loanType
                }
            } else if(type == 'CREDIT_IV' || type == 'MORT_IV') {
                popId = ASIV2003
                params = {
                    objIvInfo: {
                        mydtCusno       : this.getUserInfo('mydtCusno'),
                        infOfrmnOrgC    : obj.infOfrmnOrgC,
                        mydtAcno        : obj.mydtAcno,
                        mydtScNo        : obj.mydtScNo,
                        "bsnDsc"        : 'F'   //B : 은행, BF:금융펀드, F:금융투자, T:신탁(코드정의 추후 확인할것)
                    }
                }
            } else if(type == 'MORT_INSU') {
                popId = ASLN2003
                params = {
                    mydtCusno       : this.getUserInfo('mydtCusno'),
                    infOfrmnOrgC    : obj.infOfrmnOrgC,
                    mydtAcno        : obj.mydtAcno,
                    mydtScNo        : obj.mydtScNo,
                    isrSctsNo       : obj.isrSctsNo,
                    loanType        : obj.loanType
                }
            } else if(type == 'MORT_BANK'){
                popId = ASLN2002
                params = {
                    mydtCusno       : this.getUserInfo('mydtCusno'),
                    infOfrmnOrgC    : obj.infOfrmnOrgC,
                    mydtAcno        : obj.mydtAcno,
                    mydtScNo        : obj.mydtScNo,
                    isrSctsNo       : obj.isrSctsNo,
                    loanType        : obj.loanType
                }
            } else if(type == 'P2P') {
                popId = ASLN2007
                params = {
                    mydtCusno       : this.getUserInfo('mydtCusno'),
                    infOfrmnOrgC    : obj.infOfrmnOrgC,
                    lnCtrNo         : obj.lnCtrNo,
                }
            } else {
                // ASLN2008 오류로 인해 연결 팝업 변경
                popId = ASLN2008
                // popId = ASLN1119
                params = {
                    mydtCusno       : this.getUserInfo('mydtCusno'),
                    infOfrmnOrgC    : obj.infOfrmnOrgC,
                    mydtBndNo       : obj.mydtBndNo
                }
            }

            // params.mydtCusno = '2000000543'

            const config = {
                component: popId,
                params: params
            }
            console.log('>>>> config >>>> ', config)
            modalService.openPopup(config)
        },
    },
    components : {
        
    }
}
</script>