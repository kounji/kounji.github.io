<!--
/*************************************************************************
* @ 서비스경로 : 큰글모드 > 자산 > 부채 > 부채목록
* @ 페이지설명 : 큰글모드 > 자산 > 부채 > 부채목록
* @ 파일명     : src/views/page/AS/TA/ASTA4S09/ASTA4S09.vue
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
			<h1>카드</h1>
		</div>	
		<div class="popup_content">
			<div class="assets_senior">

				<div class="board_box" v-if="cardOut.length > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">이번달 결제예정금액</span>
							<span class="num"><em>{{ttAmnt | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
                                <li v-for="(cardObj, idx) in cardOut" :key="'card_'+idx">
                                    <a href="javascript:void(0);" @click.prevent="fn_openDtlPop(cardObj, 'CARD')">
                                        <i class="ico_bank" :class="cardObj.infOfrmnOrgC"><span class="blind">{{cardObj.infOfrmnOrgCNm}}</span></i>
                                        <div>
                                            <strong class="org">{{cardObj.infOfrmnOrgCNm}}</strong>
                                            <strong class="account">{{cardObj.stlPlaDt | dateFilter('YYYY.MM.DD')}}</strong>
                                        </div>
                                        <strong class="num"><em>{{cardObj.cdStlPlaAm | numberFilter}}</em>원</strong>
                                    </a>
                                </li>
							</ul>
							<div class="btns_wrap" v-if="cardCnt > 3 && !moreNowStlPlaYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('NOW_STL_PLA')">이번달 결제예정금액 더보기</button>
							</div>
						</div>
					</details>
				</div>

				<div class="board_box" v-if="cardLoanOut.length > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">남은 결제예정금액</span>
							<span class="num"><em>{{ttCdLnBac | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
                                <li v-for="(cardLoanObj, idx) in cardLoanOut" :key="'cardLoan_'+idx">
                                    <a href="javascript:void(0);" @click.prevent="fn_openDtlPop(cardLoanObj, 'CARD_LOAN')">
                                        <i class="ico_bank" :class="cardLoanObj.infOfrmnOrgC"><span class="blind">{{cardLoanObj.infOfrmnOrgCNm}}</span></i>
                                        <div>
                                            <strong class="org" v-if="cardLoanObj.lnDsc != 'LLN'">{{cardLoanObj.infOfrmnOrgCNm}}</strong>
                                            <strong class="org" v-else>{{cardLoanObj.cdcodLnWrsNm}}</strong>
                                            <strong class="account" v-if="cardLoanObj.lnDsc == 'LLN'">{{cardLoanObj.cdlnLnNo}}</strong>
                                        </div>
                                        <strong class="num"><em>{{cardLoanObj.cdLnStlPlaBac | numberFilter}}</em>원</strong>
                                    </a>
                                </li>
							</ul>
							<div class="btns_wrap" v-if="cardLoanCnt > 3 && !moreRmdStlPlaYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('RMD_STL_PLA')">남은 결제예정금액 더보기</button>
							</div>
						</div>
					</details>
				</div>

				<div class="board_box" v-if="claimOut.length > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">청구내역</span>
							<!-- <span class="num"><em>{{ttClmAm | numberFilter}}</em>원</span> -->
						</summary>
						<div class="cont">
							<ul class="assets_list">
                                <li v-for="(claimObj, idx) in claimOut" :key="'claim_'+idx">
                                    <a href="javascript:void(0);" @click.prevent="fn_openDtlPop(claimObj, 'RQS')">
                                        <i class="ico_bank" :class="claimObj.infOfrmnOrgC"><span class="blind">{{claimObj.infOfrmnOrgCNm}}</span></i>
                                        <div>
                                            <strong class="org">{{claimObj.infOfrmnOrgCNm}}</strong>
                                            <strong class="account">{{claimObj.stlDt | dateFilter('YYYY.MM.DD')}}</strong>
                                        </div>
                                        <strong class="num"><em>{{claimObj.colCdRqsAm | numberFilter}}</em></strong>
                                    </a>
                                </li>
							</ul>
                            <div class="btns_wrap" v-if="claimCnt > 3 && !moreRqsYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('RQS')">청구내역 더보기</button>
							</div>
						</div>
					</details>
				</div>

				<div class="board_box" v-if="expeOut.length > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">이번달 카드별 이용내역</span>
							<!-- <span class="num"><em>{{ttExpeAm | numberFilter}}</em>원</span> -->
						</summary>
						<div class="cont">
							<ul class="assets_list">
                                <li v-for="(expeObj, idx) in expeOut" :key="'expe_'+idx">
                                    <a href="javascript:void(0);" @click.prevent="fn_openDtlPop(expeObj, 'EXPE')">
                                        <i class="ico_bank" :class="expeObj.infOfrmnOrgC"><span class="blind">{{expeObj.infOfrmnOrgCNm}}</span></i>
                                        <div>
                                            <strong class="org">{{expeObj.cdcoCdWrsnm}}</strong>
                                        </div>
                                        <strong class="num"><em>{{expeObj.cdUgUsAm | numberFilter}}</em>원</strong>
                                    </a>
                                </li>
							</ul>
                            <div class="btns_wrap" v-if="expeCnt > 3 && !moreExpeYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('EXPE')">이번달 카드별 이용내역 더보기</button>
							</div>
						</div>
					</details>
				</div>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import {dateFormat} from '@/utils/date'

import ASCD2002 from '@/views/page/AS/CD/ASCD2002/ASCD2002'     // 결제예정금액
import ASCD2004 from '@/views/page/AS/CD/ASCD2004/ASCD2004'     // 청구내역
import ASCD2007 from '@/views/page/AS/CD/ASCD2007/ASCD2007'     // 단기신용대출
import ASCD2008 from '@/views/page/AS/CD/ASCD2008/ASCD2008'     // 장기신용대출
import ASCD2009 from '@/views/page/AS/CD/ASCD2009/ASCD2009'     // 리볼빙
import LCLE4002 from '@/views/page/LC/LE/LCLE4002/LCLE4002'

export default {
    name : 'ASTA4S09',
    data: () => {
        return {
            mydtCusno   : "",       // 마이데이터고객번호
            inqYm       : "",       // 조회년월
            ttAmnt      : 0,        // 결제 예정인 돈
            ttCdLnBac   : 0,        // 결제 예정인 대출 잔액
            totAm       : 0,        // 총 결제 예정인 돈 (결제 예정인 돈+결제 예정인 대출 잔액)
            ttClmAm     : 0,        // 마이데이터4.0 신규) 청구내역 총 금액
            ttExpeAm    : 0,        // 마이데이터4.0 신규) 카드별 총 이용금액
            cardOut     : [],       // 카드정보
            cardCnt     : 0,        // 이달 결제정보 총계
            cardLoanOut : [],       // 카드 결제예정잔액 리스트
            cardLoanCnt : 0,        // 카드결제예정정보 총계
            expeOut     : [],       // 카드 이용금액 리스트
            expeCnt     : 0,        // 카드이용정보 총계
            claimOut    : [],       // 카드 청구내역 리스트
            claimCnt    : 0,        // 카드청구내역 총계
            showFlagYN  : "",       // 조회결과 있으면 'Y'

            respInfo : [],              // 카드정보목록 응답 원본 데이터
            moreNowStlPlaYn : false,    // 이번달 결제예정 목록 더보기 여부
            moreRmdStlPlaYn : false,    // 남은 결제예정 목록 더보기 여부
            moreRqsYn       : false,    // 청구내역 목록 더보기 여부
            moreExpeYn      : false,    // 이용내역 카드목록 더보기 여부
        }
    },
    computed : {
        
    },
    mounted() {
        this.initComponent()
        dateFormat()

        // 자산수집 mutation 이벤트 감지
        this.getGatheringListenSubscribe()


        // PFM로그 처리 화면 접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    methods: {
        initComponent() {
            this.mydtCusno = this.getUserInfo("mydtCusno")
            this.inqYm     = dateFormat(new Date(), 'YYYYMM')
            this.getData()
        },
        getData() {
            const config = {
                url: '/as/cd/01r01',
                data: {
                    mydtCusno : this.mydtCusno,     // 자산관리고객번호
                }
            }

            apiService.syncCall(config).then(response => {
                console.log("============================> ASCD2001 Response <============================")
                console.log(response)
                this.respInfo    = response

                this.ttAmnt      = response.ttAmnt || 0             // 결제 예정인 돈
                this.ttCdLnBac   = response.ttCdLnBac || 0          // 결제 예정인 대출 잔액
                this.totAm       = this.ttAmnt + this.ttCdLnBac     // 총 결제 예정인 돈
                this.cardOut     = response.cardOut || []           // 이번달 결제예정금액
                this.cardLoanOut = response.cardLoanOut || []       // 남은 결제예정금액
                this.expeOut     = response.expeOut || []           // 지출
                this.claimOut    = response.claimOut || []          // 청구내역

                this.cardCnt     = this.cardOut.length || 0
                this.cardLoanCnt = this.cardLoanOut.length || 0
                this.expeCnt     = this.expeOut.length || 0
                this.claimCnt    = this.claimOut.length || 0

                // 청구내역 및 이달 이용내역 총 금액 산출
                this.claimOut.forEach(d => this.ttClmAm += d.colCdRqsAm)
                this.expeOut.forEach(d => this.ttExpeAm += d.cdUgUsAm)

                // 최초 3건 오픈 후 더보기 추가
                this.cardOut = this.cardCnt > 3 && !this.moreNowStlPlaYn ? this.cardOut.slice(0, 3) : this.cardOut
                this.cardLoanOut = this.cardLoanCnt > 3 && !this.moreRmdStlPlaYn ? this.cardLoanOut.slice(0, 3) : this.cardLoanOut
                this.claimOut = this.claimCnt > 3 && !this.moreRqsYn ? this.claimOut.slice(0, 3) : this.claimOut
                this.expeOut = this.expeCnt > 3 && !this.moreExpeYn ? this.expeOut.slice(0, 3) : this.expeOut
                
                if(this.cardOut.length > 0 || this.expeOut.length > 0 || this.claimOut.length > 0 || this.cardLoanOut.length > 0){
                    this.showFlagYN = 'Y'
                }
                else{
                    this.showFlagYN = 'N'
                }
            })
        },

        /**
         * 더보기 선택 이벤트
         */
        fn_showMore(type) {
            if(type == 'NOW_STL_PLA') {   // 이번달 결제예정목록
                this.cardOut = this.respInfo.cardOut
                this.moreNowStlPlaYn = true
            } else if(type == 'RMD_STL_PLA') {  // 남은 결제예정목록
                this.cardLoanOut = this.respInfo.cardLoanOut
                this.moreRmdStlPlaYn = true
            } else if(type == 'RQS') {  // 청구예정 목록
                this.claimOut = this.respInfo.claimOut
                this.moreRqsYn = true
            } else {    // 이달 카드별 이용목록
                this.expeOut = this.respInfo.expeOut
                this.moreExpeYn = true
            }
        },

        /**
         * 항목별 상세팝업 이동
         */
        fn_openDtlPop(obj, type) {
            //////////////////////////////////////
            // CARD         : 이달 결제금액
            // CARD_LOAN    : 남은 결제예정금액
            // RQS          : 청구내역
            // EXPE         : 카드별 이용내역
            //////////////////////////////////////
            let compName = ''
            let params = {}
            switch(type) {
                case 'CARD':
                    compName = ASCD2002
                    params = {
                        mydtCusno       : obj.mydtCusno,
                        infOfrmnOrgC    : obj.infOfrmnOrgC,
                        infOfrmnOrgCNm  : obj.infOfrmnOrgCNm,
                        inqYmd          : obj.stlPlaDt,
                    }
                    break
                case 'CARD_LOAN':
                    // SLN : 단기대출, LLN : 장기대출, RVV : 리볼빙
                    compName = obj.lnDsc == 'SLN' ? ASCD2007 : (obj.lnDsc == 'LLN' ? ASCD2008 : ASCD2009)
                    params = {
                        mydtCusno       : obj.mydtCusno,
                        infOfrmnOrgC    : obj.infOfrmnOrgC,
                        infOfrmnOrgCNm  : obj.infOfrmnOrgCNm,
                        lnDsc           : obj.lnDsc, 
                        cdlnLnNo        : obj.cdlnLnNo,
                        lnDt            : obj.lnDt,
                        dtLnSc          : obj.dtLnSc
                    }
                    break
                case 'RQS':
                    let mydtStlSqnoList = obj.mydtStlSqno.split("^")
                    let rtnData = []

                    // return
                    if(mydtStlSqnoList.length  > 0) {
                        mydtStlSqnoList.map(d => rtnData.push({"mydtStlSqno" : d}))
                    }else{
                        rtnData = {}
                    }

                    compName = ASCD2004
                    params = {
                        mydtCusno       : obj.mydtCusno,
                        infOfrmnOrgC    : obj.infOfrmnOrgC,
                        infOfrmnOrgCNm  : obj.infOfrmnOrgCNm,
                        cdRqsYm         : obj.cdRqsYm,
                        lastCdRqsYm     : obj.cdRqsYm,
                        mydtStlSqno     : rtnData,
                    }
                    break
                case 'EXPE':
                    compName = LCLE4002
                    params = {
                        mydtCusno       : obj.mydtCusno,
                        inqYm           : this.inqYm,
                        infOfrmnOrgC    : obj.infOfrmnOrgC,
                        mydtCdId		: obj.mydtCdId,
                        cdcoCdWrsnm     : obj.cdcoCdWrsnm,
                    }
                    break
                default :
                    return
            }
            const config = {
                component : compName,
                params : params
            }
            modalService.openPopup(config)
        },
    },
    components : {
        
    }
}
</script>