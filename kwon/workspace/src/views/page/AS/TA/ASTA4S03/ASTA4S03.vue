<!--
/*************************************************************************
* @ 서비스경로 : 큰글모드 > 자산 > 투자
* @ 페이지설명 : 큰글모드 > 자산 > 투자
* @ 파일명     : src/views/page/AS/TA/ASTA4S03/ASTA4S03.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-02-12
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-12              CS541597              ASIV2001 -> ASTA4S03 투자 큰글씨모드 신규
*************************************************************************/
-->
<template>
	<!-- 전체 팝업 시작 -->
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>투자</h1>
		</div>	
		<div class="popup_content">
			<div class="assets_senior">

				<div class="board_box" v-if="bankIvAccn > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">펀드<em>{{bankIvAccn | numberFilter}}</em></span>
							<span class="num"><em>{{bankIvAcBaltt | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
								<li v-for="(item, idx) in bankIvList" :key="idx">
									<a href="javascript:void(0);" @click.prevent="fn_openDetailPop(item)">
										<i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
										<div>
											<strong class="org">{{item.acWrsnm}}</strong>
											<strong class="account">{{item.mydtAcno}}</strong>
										</div>
										<strong class="num"><em>{{item.acNowBac | numberFilter}}</em>원</strong>
										<p class="latter" :class="item.strmPftrt === 0 ? '' : item.strmPftrt > 0 ? 'up' : 'down'">
                                            <i class="blind" :class="item.strmPftrt === 0 ? '' : item.strmPftrt > 0 ? 'up' : 'down'">
                                                {{item.strmPftrt === 0 ? '변동없음' : item.strmPftrt > 0 ? '상승' : '하락'}}
                                            </i>
                                            <em class="num">{{Math.abs(item.strmPftrt) | numberFilter('0,0.00', {precision: 2})}}</em>%
                                        </p>
									</a>
								</li>
							</ul>
							<!-- <a href="javascript:void(0);" class="btns lg" v-if="bankIvAccn > 3 && !moreBankIvYn" @click.prevent="fn_showMore('bankIv')">더보기</a> -->
                            <div class="btns_wrap" v-if="bankIvAccn > 3 && !moreBankIvYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('bankIv')">펀드계좌 더보기</button>
							</div>
						</div>
					</details>
				</div>

				<div class="board_box" v-if="bankTsIsaAccn > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">신탁/ISA<em>{{bankTsIsaAccn | numberFilter}}</em></span>
							<span class="num"><em>{{bankTsIsaEvlamtt | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
								<li v-for="(item, idx) in bankTsIsaList" :key="idx">
									<a href="javascript:void(0);" @click.prevent="fn_openDetailPop(item)">
										<i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
										<div>
											<strong class="org">{{item.acWrsnm}}</strong>
											<strong class="account">{{item.mydtAcno}}</strong>
										</div>
										<strong class="num"><em>{{item.acEvlam | numberFilter}}</em>원</strong>
									</a>
								</li>
							</ul>
                            <!-- <a href="javascript:void(0);" class="btns lg" v-if="bankTsIsaAccn > 3 && !moreTsIsaYn" @click.prevent="fn_showMore('tsIsa')">더보기</a> -->
                            <div class="btns_wrap" v-if="bankTsIsaAccn > 3 && !moreTsIsaYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('tsIsa')">신탁/ISA계좌 더보기</button>
							</div>
						</div>
					</details>
				</div>

				<div class="board_box" v-if="efinIvAccn > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">증권<em>{{efinIvAccn | numberFilter}}</em></span>
							<span class="num"><em>{{efinIvAcBaltt | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
								<li v-for="(item, idx) in efinIvList" :key="idx">
									<a href="javascript:void(0);" @click.prevent="fn_openDetailPop(item)">
										<i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
										<div>
											<strong class="org">{{item.fncIvAcOnm}}</strong>
											<strong class="account">{{item.mydtAcno}}</strong>
										</div>
										<strong class="num"><em>{{item.acNowBac | numberFilter}}</em>원</strong>
									</a>
								</li>
							</ul>
                            <!-- <a href="javascript:void(0);" class="btns lg" v-if="efinIvAccn > 3 && !moreEfinIvYn" @click.prevent="fn_showMore('efinIv')">더보기</a> -->
                            <div class="btns_wrap" v-if="efinIvAccn > 3 && !moreEfinIvYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('efinIv')">증권계좌 더보기</button>
							</div>
						</div>
					</details>
				</div>

				<div class="board_box" v-if="p2pInvestCnt > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">P2P투자<em>{{p2pInvestCnt | numberFilter}}</em></span>
							<span class="num"><em>{{p2pInvestTotAm | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
								<li v-for="(item, idx) in p2pInvestList" :key="idx">
									<a href="javascript:void(0);" @click.prevent="fn_openDetailPop(item)">
										<i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgCNm}}</span></i>
										<div>
											<strong class="org">{{item.p2PWrsTpcNm}}</strong>
                                            <strong class="account">{{item.ivCtrno}}</strong>
										</div>
										<strong class="num"><em>{{item.rmAm | numberFilter}}</em>원</strong>
									</a>
								</li>
							</ul>
                            <!-- <a href="javascript:void(0);" class="btns lg" v-if="p2pInvestCnt > 3 && !moreP2pIvYn" @click.prevent="fn_showMore('p2pIv')">더보기</a> -->
                            <div class="btns_wrap" v-if="p2pInvestCnt > 3 && !moreP2pIvYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('p2pIv')">P2P투자 더보기</button>
							</div>
						</div>
					</details>
				</div>
			</div>
		</div>

		<a href="javascript:void(0);" @click="close()" class="btn_close"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import modalService from '@/service/modalService'
    import apiService from '@/service/apiService'

    import ASIV2002 from '@/views/page/AS/IV/ASIV2002/ASIV2002'
    import ASIV2003 from '@/views/page/AS/IV/ASIV2003/ASIV2003'
    import ASIV2005 from '@/views/page/AS/IV/ASIV2005/ASIV2005'
    import ASIV2007 from '@/views/page/AS/IV/ASIV2007/ASIV2007'
 
    export default {
        name : "ASTA4S03",
        data: () => {
            return {
                respInfo           : {}, //응답결과
                bankIvList         : [], //은행투자계좌목록
                bankTsIsaList      : [], //은행신탁ISA목록
                efinIvList         : [], //전자금융투자계좌목록
                p2pInvestList      : [], //P2P투자계좌목록
                ivAcTotBac         : 0,  //투자계좌총액
                ivtotAccn          : 0,  //투자총계좌수
                bankIvAcBaltt      : 0,  //은행투자계좌잔액합계
                bankIvAccn         : 0,  //은행투자계좌수
                efinIvAcBaltt      : 0,  //전자금융계좌잔액합계
                efinIvAccn         : 0,  //전자금융토자계좌수
                bankTsIsaEvlamtt   : 0,  //은행신탁ISA평가금액합계
                bankTsIsaAccn      : 0,  //은행신탁ISA계좌수
                p2pInvestTotAm     : 0,  //P2P투자금액합계
                p2pInvestCnt       : 0,  //P2P투자계약건수

                moreBankIvYn       : false, //은행투자목록 더보기 선택 여부
                moreTsIsaYn        : false, //은행신탁ISA목록 더보기 선택 여부
                moreEfinIvYn       : false, //전자금융투자목록 더보기 선택 여부
                moreP2pIvYn        : false, //P2P투자목록 더보기 선택 여부
            }
        },
        computed : {
            
        },
        mounted() {
            this.initComponent()

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
                this.getData()
            },
            getData() {
                const config = {
                    url : "/as/iv/01r02",
                    data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno')
                    }
                }
                apiService.call(config).then(response =>{

                    // console.log('======= /as/iv/01r02 =======', response)

                    this.respInfo = response

                    this.ivAcTotBac       = this.respInfo.ivAcTotBac || 0        //투자계좌총액
                    this.ivtotAccn        = this.respInfo.ivtotAccn || 0         //투자총계좌수
                    this.bankIvAcBaltt    = this.respInfo.bankIvAcBaltt || 0     //은행투자계좌잔액합계
                    this.bankIvAccn       = this.respInfo.bankIvAccn || 0        //은행투자계좌수
                    this.efinIvAcBaltt    = this.respInfo.efinIvAcBaltt || 0     //전자금융계좌잔액합계
                    this.efinIvAccn       = this.respInfo.efinIvAccn || 0        //전자금융투자계좌수
                    this.bankTsIsaEvlamtt = this.respInfo.bankTsIsaEvlamtt || 0  //은행신탁ISA평가금액합계
                    this.bankTsIsaAccn    = this.respInfo.bankTsIsaAccn || 0     //은행신탁ISA계좌수
                    this.p2pInvestCnt     = this.respInfo.p2pInvestCnt || 0      //P2P투자금액합계
                    this.p2pInvestTotAm   = this.respInfo.p2pInvestTotAm || 0    //P2P투자계약수


                    this.bankIvList    = this.respInfo.bankIvList || []         //은행투자계좌목록
                    this.efinIvList    = this.respInfo.efinIvList || []         //전자금융투자계좌목록
                    this.bankTsIsaList = this.respInfo.bankTsIsaList || []      //은행신탁ISA목록
                    this.p2pInvestList = this.respInfo.p2pInvestList || []      //P2P투자목록

                    // 2025.02.12 신규) 항목별 목록 3개 이상일 경우 더보기 기능 추가
                    this.bankIvList = this.bankIvAccn > 3 && !this.moreBankIvYn ? this.bankIvList.slice(0, 3) : this.bankIvList
                    this.efinIvList = this.efinIvAccn > 3 && !this.moreEfinIvYn ? this.efinIvList.slice(0, 3) : this.efinIvList
                    this.bankTsIsaList = this.bankTsIsaAccn > 3 && !this.moreTsIsaYn ? this.bankTsIsaList.slice(0, 3) : this.bankTsIsaList
                    this.p2pInvestList = this.p2pInvestCnt > 3 && !this.moreP2pIvYn ? this.p2pInvestList.slice(0, 3) : this.p2pInvestList

                    // this.$nextTick(() => {
                    //     this.callJQueryFncExcute()
                    // })
                })
            },

            /**
             * 더보기 선택 이벤트
             */
            fn_showMore(type) {
                if(type === 'bankIv') {   // 펀드
                    this.bankIvList = this.respInfo.bankIvList
                    this.moreBankIvYn = true
                } else if(type === 'efinIv') {    // 증권
                    this.efinIvList = this.respInfo.efinIvList
                    this.moreEfinIvYn = true
                } else if(type === 'tsIsa') {    // 신탁/ISA
                    this.bankTsIsaList = this.respInfo.bankTsIsaList
                    this.moreTsIsaYn = true
                } else if(type === 'p2pIv') {    // P2P
                    this.p2pInvestList = this.respInfo.p2pInvestList
                    this.moreP2pIvYn = true
                }
            },

            /**
             * 투자 항목별 상세(일반모드) 팝업 오픈
             */
            fn_openDetailPop(ivObj) {
                const popParams = {
                    'mydtCusno' : ivObj.mydtCusno,
                    'infOfrmnOrgC' : ivObj.infOfrmnOrgC,
                    'mydtAcno' : ivObj.mydtAcno,
                    'mydtScNo' : ivObj.mydtScNo,
                    'bsnDsc' : ivObj.bsnDsc //B : 은행, BF : 금융펀드, TS : 신탁/ISA, F : 금융투자, PI : P2P투자
                }
                let config = {}

                ////////////////
                // 일반모드 연결 필요
                ////////////////
                let compName = ''
                if (ivObj.bsnDsc == 'F') {
                    // 증권(금융투자)
                    compName = ASIV2003
                } else if (ivObj.bsnDsc == 'TS') {
                    // 신탁ISA
                    compName = ASIV2005
                } else if (ivObj.bsnDsc == 'PI') {
                    // P2P
                    compName = ASIV2007
                } else {
                    // 은행 및 금융펀드
                    compName = ASIV2002
                }

                config = {
                    component: compName,
                    params: {objIvInfo: popParams}
                }
                modalService.openPopup(config).then(() => {
                    this.getData()
                })
            }
            
        }
    }

</script>