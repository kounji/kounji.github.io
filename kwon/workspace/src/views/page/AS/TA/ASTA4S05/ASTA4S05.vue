<!--
/*************************************************************************
* @ 서비스경로 : 큰글모드 > 자산 > 페이/포인트
* @ 페이지설명 : 큰글모드 > 자산 > 페이/포인트
* @ 파일명     : src/views/page/AS/TA/ASTA4S05/ASTA4S05.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-02-14
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-14              CS541597               최초작성
*************************************************************************/
-->
<template>
	<!-- 전체 팝업 시작 -->
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>페이/포인트</h1>
		</div>	
		<div class="popup_content">
			<div class="assets_senior">

				<div class="board_box" v-if="paySumCn > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">페이<em>{{paySumCn | numberFilter}}</em></span>
							<span class="num"><em>{{paySumAcAm | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
								<li v-for="(item, idx) in payTotList" :key="idx">
									<a href="javascript:void(0);" v-if="item.payDsc === 'payAc'" @click.prevent="fn_openDetailPop('PAY', item)">
										<i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgCNm}}</span></i>
										<div>
											<strong class="org">{{item.faceOnm}}</strong>
										</div>
										<strong class="num"><em>{{item.eltfncTotBac | numberFilter}}</em>{{item.curc == 'KRW' ? '원' : item.curnm}}</strong>
									</a>
                                    <a href="javascript:void(0);" v-else-if="item.payDsc === 'payCd'" @click.prevent="fn_openDetailPop('CARD', item)">
										<i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgCNm}}</span></i>
										<div>
											<strong class="org">{{item.ppayCdnm}}</strong>
										</div>
										<strong class="num"><em>{{item.ppaycdTotBac | numberFilter}}</em>원</strong>
									</a>
								</li>
							</ul>
                            <!-- <a href="javascript:void(0);" class="btns lg" v-if="paySumCn > 3 && !morePayYn" @click.prevent="fn_showMore('pay')">더보기</a> -->
                            <div class="btns_wrap" v-if="paySumCn > 3 && !morePayYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('pay')">페이 더보기</button>
							</div>
						</div>
					</details>
				</div>

				<div class="board_box" v-if="cardPntcn > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">포인트<em>{{cardPntcn | numberFilter}}</em></span>
							<span class="num"><em>{{cardPntBaltt | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
								<li v-for="(item, idx) in cardPntList" :key="idx">
									<div>
										<i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgCNm}}</span></i>
										<div>
											<strong class="org">{{item.pntnm}}</strong>
										</div>
										<strong class="num"><em>{{item.rmPnt | numberFilter}}</em>원</strong>
									</div>
								</li>
							</ul>
							<!-- <a href="javascript:void(0);" class="btns lg" v-if="cardPntcn > 3 && !morePntYn" @click.prevent="fn_showMore('point')">더보기</a> -->
                            <div class="btns_wrap" v-if="cardPntcn > 3 && !morePntYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('point')">포인트 더보기</button>
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
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import modalService from '@/service/modalService'
    import apiService from '@/service/apiService'

    import ASAC1106 from '@/views/page/AS/AC/ASAC1106/ASAC1106'
    import ASPT2002 from '@/views/page/AS/PT/ASPT2002/ASPT2002'

    export default {
        name : "ASAS4S05",
        data: () => {
            return {
                respInfo      : {},

                totPayAccn    : 0,  //총선불계좌수
                totPayAcAm    : 0,  //총선불계좌합계
                paySumCn      : 0,  //총페이포인트수
                paySumAcAm    : 0,

                payMnyAccn    : 0,  //선불계좌수
                payMnyAcBaltt : 0,  //선불계좌잔액
                payMnyAcList  : [], //선불계좌목록

                ppaycdcn      : 0,  //선불카드수
                ppaycdBaltt   : 0,  //선불카드잔액합계
                ppaycdList    : [], //선불카드목록

                payTotList    : [], // 페이총목록

                cardPntcn     : 0,  // 금융포인트 수
                cardPntBaltt  : 0,  // 금융포인트 합계
                cardPntList   : [], // 금융포인트 목록

                morePayYn     : false,  // 페이 더보기 선택 여부
                morePntYn     : false,  // 포인트 더보기 선택 여부

            }
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        computed : {

        },
        created() {

        },
        mounted() {
            this.initComponent()

            // 자산수집 mutation 이벤트 감지 
            this.getGatheringListenSubscribe()
                        
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        methods: {
            initComponent() {
                this.getData()
            },
            
            getData() {
                ///////////////////////////////////
                // 페이머니목록 조회 
                const config = {
                    url: '/as/pt/01r01',
					data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno')
                    }
                }
                apiService.call(config).then(response =>{
                    this.respInfo = response

                    this.totPayAccn    = this.respInfo.totPayAccn   //총선불계좌수(계좌+카드+금융포인트)
                    this.totPayAcAm    = this.respInfo.totPayAcAm   //총선불계좌합계(계좌+카드+금융포인트)

                    this.payMnyAccn    = this.respInfo.payMnyAccn     //계좌수
                    this.payMnyAcBaltt = this.respInfo.payMnyAcBaltt  //계좌잔액합계
                    this.payMnyAcList  = this.respInfo.payMnyAcList || []   //계좌목록

                    this.ppaycdcn      = this.respInfo.ppaycdcn     //카드수
                    this.ppaycdBaltt   = this.respInfo.ppaycdBaltt  //카드잔액합계
                    this.ppaycdList    = this.respInfo.ppaycdList || []   //카드목록

                    this.cardPntcn     = this.respInfo.cardPntcn          // 금융포인트 수
                    this.cardPntBaltt  = this.respInfo.cardPntBaltt       // 금융포인트 합계
                    this.cardPntList   = this.respInfo.cardPntList || [], // 금융포인트 목록

                    // 페이 리스트 구분을 위한 구분값 추가
                    this.payMnyAcList.forEach(d => {
                        d.payDsc = 'payAc'
                    })
                    this.ppaycdList.forEach(d => {
                        d.payDsc = 'payCd'
                    })

                    this.paySumCn = this.respInfo.payMnyAccn + this.respInfo.ppaycdcn
                    this.paySumAcAm = this.respInfo.payMnyAcBaltt + this.respInfo.ppaycdBaltt
                    this.payTotList = []
                    this.payTotList.push(...this.payMnyAcList)
                    this.payTotList.push(...this.ppaycdList)

                    this.payTotList = this.paySumCn > 3 && !this.morePayYn ? this.payTotList.slice(0, 3) : this.payTotList
                    this.cardPntList = this.cardPntcn > 3 && !this.morePntYn ? this.cardPntList.slice(0, 3) : this.cardPntList

                    // this.$nextTick(() => {
                    //     this.callJQueryFncExcute()
                    // })
                })
            },
            /**
             * 더보기 선택 이벤트
             */
            fn_showMore(type) {
                switch(type) {
                    case 'pay':
                        // 페이는 전금/선불카드를 포함하여 전체 리스트 초기화 후 리스트 재구성
                        this.payTotList = []
                        this.payTotList.push(...this.payMnyAcList)
                        this.payTotList.push(...this.ppaycdList)
                        this.morePayYn = true
                        break
                    case 'point':
                        this.cardPntList = this.respInfo.cardPntList
                        this.morePntYn = true
                        break
                    default:
                        break
                }
            },
            /*
            * 상세화면이동.
            */
            fn_openDetailPop(target, item) {
                let config = {}

                if(target === "PAY") {
                    //페이머니
                    let popupParam = {
                          "mydtCusno"    : this.getUserInfo('mydtCusno') //마이데이터고객번호
                        , "infOfrmnOrgC" : item.infOfrmnOrgC    //기관코드
                        , "faceNo"       : item.faceNo      //권면번호
                        , "accIdVal"     : item.accIdVal    //계정식별값
                    }

                    config = {
                        component: ASAC1106,
                        params : {"objAccInfo" : popupParam}
                    }
                } else {
                    //선불카드
                    let popupParam = {
                          "mydtCusno"    : this.getUserInfo('mydtCusno') //마이데이터고객번호
                        , "infOfrmnOrgC" : item.infOfrmnOrgC    //기관코드
                        , "mydtCdIdVal"  : item.mydtCdIdVal     //카드식별자
                    }

                    config = {
                        component: ASPT2002,
                        params : {"objAccInfo" : popupParam}
                    }
                }

                modalService.openPopup(config).then(() => {
                    this.getData()
                })
            }
        }
    }
</script>