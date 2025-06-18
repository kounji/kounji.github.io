<!--
/*************************************************************************
* @ 서비스경로 : 청소년모드 > 지출 > 지출메인
* @ 페이지설명 : 청소년모드 > 지출 > 지출메인
* @ 파일명     : src/views/page/LC/TA/LCTA4C01/LCTA4C01.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-03-24
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-24              CS541597              최초작성
*************************************************************************/
-->
<template>
    <page class="content-view">
        <div id="content">
            <section class="wallet_youth">
                <div class="update"  v-show="xpsTotAmt > 0 || (xpsTotAmt == 0 && assetConnCnt > 0)">
                    <template v-if="!isMyAssetGathering">
                        <span>{{ lastUpdateDtm }}</span>
                        <button type="button" class="btn_update" @click.prevent="fn_refreshApiCall()"><span class="blind">업데이트</span></button>
                    </template>
                    <span v-else class="ml5 num lsp0">자산 업데이트 중</span>
                </div>

                <!--개요-->
                <div class="outline" :class="fn_totAmClassSet"><!--늘은경우 up ,줄은 경우 down class 추가, 0원인 경우 nil class 추가-->
                    <template v-if="xpsTotAmt != 0 || (xpsTotAmt == 0 && assetConnCnt != 0)">
                        <div class="board_box">
                            <h2><a href="javascript:void(0);" @click.prevent="selectMonth">{{basMm | numberFilter}}월 지출</a></h2>

                            <p class="txt">{{xpsTotAmt | numberFilter}}원</p>

                            <button type="button" class="btns refresh" @click.prevent="callMmXpsData(basYm)"><em>{{basMm | numberFilter}}</em>월 불러오기</button>

                            <div class="analysis">
                                <!-- <template v-if="diffBfTotAm == 0 && xpsTotAmt != 0">
                                    <span class="text">지난달 지출과</span> <em>동일해요.</em>
                                </template>
                                <template v-else-if="xpsTotAmt != 0">
                                    <span class="text">지난달보다</span> <span class="num">{{Math.abs(diffBfTotAm) | numberFilter}}원</span> <em>{{diffBfTotAm > 0 ? '더 쓰고 있어요.' : '덜 쓰고 있어요.'}}</em>
                                </template>
                                <template v-else>
                                    <span class="text">{{basMm | numberFilter}}월 지출</span> <em class="text">내역이 없어요.</em>
                                </template> -->
                                <template v-if="diffBfTotAm == 0 && xpsTotAmt != 0">
                                    <span class="text">지난달 지출과</span> <em>동일해요.</em>
                                </template>
                                <template v-else-if="xpsTotAmt != 0">
                                    <span class="text">지난달보다</span> <span class="num">{{Math.abs(diffBfTotAm) | numberFilter}}원</span> <em>{{diffBfTotAm > 0 ? '더 쓰고 있어요.' : '덜 쓰고 있어요.'}}</em>
                                </template>
                                <template v-else>
                                    <p>{{basMm | numberFilter}}월 지출
                                        <span>내역이 없어요.</span> 
                                    </p>
                                </template>
                                <div class="custom_tooltip">
                                    <div class="com_tooltip_type02 com_tooltip_type03">
                                        <a href="javascript:void(0);" class="com_btn_info" role="button">
                                            <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                        </a>
                                        <div class="com_ballon_type01 com_ballon_type02" style="display: none;">
                                            <div>
                                                <ul class="dotted_list">
                                                    <li>마지막 업데이트 시점의 총 지출과 마지막 업데이트 전 월 말일 총지출을 비교했습니다.</li>
                                                    <li>오늘 업데이트 하셨으면 전 월 말일 총 지출과 비교한 결과입니다.</li>
                                                </ul>
                                                <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <a href="javascript:void(0);" v-if="xpsTotAmt >= 0" @click.prevent="fn_openExpAnls">지출분석 상세보기</a>
                    </template>
                    <template v-else>
                        <div class="board_box">
                            <p>지출 수단을 연결하고<br>지출 흐름을 한눈에<br>확인해 보세요.</p>
                            <a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openAssetCon('bank')"><span class="icon_line_right">내역 불러오기</span></a>
                        </div>
                    </template>
                </div>

                <!--카드-->
                <template v-if="cardCn > 0">
                    <details class="board_box assets_detail" open>
                        <summary>
                            <h2 class="title">카드<span class="num">{{cardCn}}</span></h2>
                        </summary>
                        <div class="analysis" :class="setCardAmIndClassSet">
                            <p class="num">{{cardApvSam | numberFilter}}원</p>
                            <p class="latter" v-if="diffBfCardAm > 0 || diffBfCardAm < 0">지난달보다 {{Math.abs(diffBfCardAm) | numberFilter}}원<em> {{diffBfCardAm > 0 ? '더' : '덜'}} 쓰고 있어요.</em></p>
                            <p class="latter" v-else>지난달과<em> 동일해요.</em></p>
                        </div>
                        <ul class="assets_list">
                            <li v-for="(item, idx) in cardList" :key="'cardXps_'+idx">
                                <a href="javascript:void(0);" @click.prevent="openCardDetail(item)">
                                    <i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                    <div>
                                        <strong class="org">{{item.cdcoCdWrsnm}}</strong>
                                        <strong class="account">{{item.cdcoCdNo}}</strong>
                                    </div>
                                    <strong class="num">{{item.cdUgUsAm | numberFilter}}원</strong>
                                </a>
                            </li>
                        </ul>
                    </details>
                </template>
                <template v-else-if="cardCn == 0 && conCardCnt > 0">
                    <div class="board_box assets_detail">
                        <h2 class="title">카드</h2>
                        <p class="txt">이용 내역이 없어요.</p>
                    </div>
                </template>
                <template v-else>
                    <div class="board_box assets_detail">
						<h2 class="title">카드</h2>
						<div>
							<a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openAssetCon('card')"><span class="icon_line_right">카드 이용 금액 확인하기</span></a>
						</div>
					</div> 
                </template>
                
                <!-- <div class="board_box wallet_spend">
                    <template v-if="cardCn > 0">
                        <h2><a href="javascript:void(0);" class="title" @click.prevent="openXpsDtl('CARD')">카드 이용 금액</a></h2>
                        <div class="card">
                            <span class="num">{{cardApvSam | numberFilter}}원</span>
                        </div>
                    </template>
                    <template v-else-if="cardCn == 0 && conCardCnt > 0">
                        <h2 class="title">카드 이용 금액</h2>
                        <div class="card">
                            <p>카드 이용 내역이 없어요.</p>
                        </div>
                    </template>
                    <template v-else>
                        <h2 class="title">카드 이용 금액</h2>
                        <div>
                            <a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openAssetCon('card')"><span class="icon_line_right">내역 불러오기</span></a>
                        </div>
                    </template>
                </div>   -->

                <!--페이-->
                <template v-if="payMnyCn + ppayCdCn > 0">
                    <details class="board_box assets_detail" open>
                        <summary>
                            <h2 class="title">페이<span class="num">{{payMnyCn + ppayCdCn | numberFilter}}</span></h2>
                        </summary>
                        <div class="analysis" :class="setPayAmIndClassSet">
                            <p class="num">{{(payMnySam + ppayCdApvSam) | numberFilter}}</p>
                            <p class="latter" v-if="diffBfPayAm > 0 || diffBfPayAm < 0">지난달보다 {{Math.abs(diffBfPayAm) | numberFilter}}원<em> {{diffBfPayAm > 0 ? '더' : '덜'}} 쓰고 있어요.</em></p>
                            <p class="latter" v-else>지난달과<em> 동일해요.</em></p>
                        </div>
                        <ul class="assets_list">
                            <li v-for="(item, idx) in payMnyList" :key="'payMnyXps_'+idx">
                                <a href="javascript:void(0);" @click.prevent="openPayDetail('payMny', item)">
                                    <i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                    <div>
                                        <strong class="org">{{item.faceOnm}}</strong>
                                        <strong class="account" v-if="item.accIdVal && item.accIdVal !== 'NA'">{{item.accIdVal}}</strong>
                                    </div>
                                    <strong class="num">{{item.ppayTram | numberFilter}}원</strong>
                                </a>
                            </li>
                            <li v-for="(item, idx) in ppayCdList" :key="'ppayCdXps_'+idx">
                                <a href="javascript:void(0);" @click.prevent="openPayDetail('ppayCd', item)">
                                    <i class="ico_bank" :class="item.infOfrmnOrgC"></i>
                                    <div>
                                        <strong class="org">{{item.cdcoCdWrsnm}}</strong>
                                    </div>
                                    <strong class="num"><em>{{item.cdUgUsAm | numberFilter}}</em>원</strong>
                                </a>
                            </li>
                        </ul>
                    </details>
                </template>
                <template v-else-if="(payMnyCn + ppayCdCn) == 0 && conEfinCnt > 0">
                    <div class="board_box assets_detail">
                        <h2 class="title">페이</h2>
                        <p class="txt">이용 내역이 없어요.</p>
                    </div>
                </template>
                <template v-else>
                    <div class="board_box assets_detail">
                        <h2 class="title">페이</h2>
                        <div>
                            <a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openAssetCon('efin')"><span class="icon_line_right">페이 이용 금액 확인하기</span></a>
                        </div>
                    </div>
                </template>

                <!-- <div class="board_box wallet_spend">
                    <template v-if="payMnyCn + ppayCdCn > 0">
                        <h2><a href="javascript:void(0);" class="title" @click.prevent="openXpsDtl('PAY')">페이 이용 금액</a></h2>
                        <div class="pay">
                            <span class="num">{{(payMnySam + ppayCdApvSam) | numberFilter}}원</span>
                        </div>
                    </template>
                    <template v-else-if="(payMnyCn + ppayCdCn) == 0 && conEfinCnt > 0">
                        <h2 class="title">페이 이용 금액</h2>
                        <div class="pay">
                            <p>페이 이용 내역이 없어요.</p>
                        </div>
                    </template>
                    <template v-else>
                        <h2 class="title">페이 이용 금액</h2>
                        <div>
                            <a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openAssetCon('efin')"><span class="icon_line_right">내역 불러오기</span></a>
                        </div>
                    </template>
                </div> -->

                <!--현금-->
                <template v-if="chsvCn > 0">
                    <details class="board_box assets_detail" open>
                        <summary>
                            <h2 class="title">현금<span class="num">{{chsvCn}}</span></h2>
                        </summary>
                        <div class="analysis" :class="setCashAmIndClassSet">
                            <p class="num">{{schXpsSam | numberFilter}}원</p>
                            <p class="latter" v-if="diffBfCashAm > 0 || diffBfCashAm < 0">지난달보다 {{Math.abs(diffBfCashAm) | numberFilter}}원<em> {{diffBfCashAm > 0 ? '더' : '덜'}} 쓰고 있어요.</em></p>
                            <p class="latter" v-else>지난달과<em> 동일해요.</em></p>
                        </div>
                        <ul class="assets_list">
                            <li v-for="(item, idx) in chsvList" :key="'chsvXps_'+idx">
                                <a href="javascript:void(0);" @click.prevent="openCashDetail(item)">
                                    <i class="ico_bank icon_money"></i>
                                    <div>
                                        <strong class="org" v-if="item.chsvKdnm == '이체'">계좌 이체로 쓴 금액</strong>
                                        <strong class="org" v-else-if="item.chsvKdnm == '현금'">직접 등록한 지출 금액</strong>
                                    </div>
                                    <strong class="num"><em>{{item.tram | numberFilter}}</em>원</strong>
                                </a>
                            </li>
                        </ul>
                    </details>
                </template>
                <template v-else-if="chsvCn == 0 && conBankCnt > 0">
                    <div class="board_box assets_detail">
                        <h2 class="title">현금</h2>
                        <p class="txt">이용 내역이 없어요.</p>
                    </div>
                </template>
                <template v-else>
                    <div class="board_box assets_detail">
                        <h2 class="title">현금</h2>
                        <div>
                            <a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openAssetCon('bank')"><span class="icon_line_right">현금 이용 금액 확인하기</span></a>
                        </div>
                    </div>
                </template>

                <!-- <div class="board_box wallet_spend">
                    <template v-if="chsvCn > 0">
                        <h2><a href="javascript:void(0);" class="title" @click.prevent="openXpsDtl('CASH')">현금 이용 금액</a></h2>
                        <div class="cash">
                            <span class="num">{{schXpsSam | numberFilter}}원</span>
                        </div>
                    </template>
                    <template v-else-if="chsvCn == 0 && conBankCnt > 0">
                        <h2 class="title">현금 이용 금액</h2>
                        <div class="cash">
                            <p>현금 이용 내역이 없어요.</p>
                        </div>
                    </template>
                    <template v-else>
                        <h2 class="title">현금 이용 금액</h2>
                        <div>
                            <a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openAssetCon('bank')"><span class="icon_line_right">내역 불러오기</span></a>
                        </div>
                    </template>
                </div> -->
            </section>
        </div>
        <footersV2 type="lc" />
    </page>
</template>

<script>

import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import commonService from '@/service/commonService'
import modalService from '@/service/modalService'
import {dateFormat, getLastDay, dayDiff} from '@/utils/date'
import {mapActions, mapGetters} from 'vuex'
import _ from 'lodash'

import COAR4002 from '@/views/page/CO/AR/COAR4002/COAR4002'
// import LCTA4C03 from '@/views/page/LC/TA/LCTA4C03/LCTA4C03'
// import LCTA4C04 from '@/views/page/LC/TA/LCTA4C04/LCTA4C04'
// import LCTA4C06 from '@/views/page/LC/TA/LCTA4C06/LCTA4C06'
import LCTA4C08 from '@/views/page/LC/TA/LCTA4C08/LCTA4C08'
import LCLE4002 from '@/views/page/LC/LE/LCLE4002/LCLE4002' // 일반 카드상세
import LCLE4003 from '@/views/page/LC/LE/LCLE4003/LCLE4003' // 일반 페이머니상세
import LCLE4004 from '@/views/page/LC/LE/LCLE4004/LCLE4004' // 일반 선불카드상세
import LCLE4104 from '@/views/page/LC/LE/LCLE4104/LCLE4104' // 일반 현금상세

export default {
    name : "LCTA4C01",
    data: () => {
        return {
            mydtCusno       : '',       // 마이데이터고객번호
            cusnm           : '',       // 고객명

            basYm           : null,
            basYy           : null,
            basMm           : null,
            basDt           : null,

            xpsTotAmt		: 0,		// 지출총합계
            cardApvSam		: 0,		// 카드승인금액합계
            bmmCardApvSam	: 0,		// 전월카드승인금액합계
            schXpsSam		: 0,		// 현금지출금액합계
            bmmSchXpsSam	: 0,		// 전월현금지출금액합계
            ppayXpsSam		: 0,		// 선불지출금액합계
            payMnySam		: 0,		// 페이머니금액합계
            bmmPayMnySam	: 0,		// 전월페이머니금액합계
            ppayCdApvSam    : 0,    	// 선불카드승인금액합계
            bmmPpayCdApvSam : 0,    	// 전월선불카드승인금액합계
            rqsSam			: 0,		// 통신요금청구금액합계
            cardCn			: 0,		// 카드목록건수
            chsvCn			: 0,		// 현금목록건수
            payMnyCn		: 0,		// 페이머니목록건수
            ppayCdCn        : 0,		// 선불카드목록건수

            cardList		: [],		// 카드목록
            chsvList		: [],   	// 현금목록
            payMnyList		: [],		// 페이머니목록
            ppayCdList      : [],   	// 선불카드목록

            diffBfCardAm    : 0,        // 전월대비 카드승인금액 증감액
            diffBfCashAm    : 0,        // 전월대비 현금지출금액 증감액
            diffBfPayAm     : 0,        // 전월대비 페이지출금액 증감액

            bmmTotAm        : 0,        // 전월지출금액합산
            diffBfTotAm     : 0,        // 전월대비 총지출 증감액

            //////// 연결자산 관련 데이터
            nacfAccList        : [], // v4 농.축협 계좌 리스트
            userAsetList        : [], // 개인신용정보전송요구내역
            /* 은행 */
            conBankList        : [], // 은행업권 데이터
            conBankExprList    : [], // 은행업권 만료 데이터
            conBankCnt         : 0,  // 은행업권 건수
            /* 카드 */
            conCardList        : [], // 카드업권 데이터
            conCardExprList    : [], // 카드업권 만료 데이터
            conCardCnt         : 0,  // 카드업권 건수
            /* 페이 */
            conEfinList        : [], // 전자금융업권 데이터
            conEfinExprList    : [], // 전자금융업권 만료 데이터
            conEfinCnt         : 0,  // 전자금융업권 건수

            codeNmList 		   : [   // 업권 코드별 명칭 리스트
				{"codeVal":"bank", 		"codeNm":"은행"		},
				{"codeVal":"card", 		"codeNm":"카드"		},
				{"codeVal":"efin", 		"codeNm":"전자금융"	},
            ],
            assetConnCnt       : 0,  // 은행, 카드, 전자금융 건수 합계
        }
    },
    computed : {
        ...mapGetters('myassets', [
            'isMyAssetGathering',
            'lastUpdateDtm',
            'myAssetsBzRgCnt',
            'myAssetInfo',
            'myAssetsBzrgList'
        ]),
        fn_totAmClassSet() {
            if(this.xpsTotAmt > 0) {
                // 전월대비 총지출 증감
                return this.diffBfTotAm > 0 ? 'up' : this.diffBfTotAm < 0 ? 'down' : ''
            } else if (this.conCardCnt == 0 && this.conBankCnt == 0 && this.conEfinCnt == 0) {
                // 총지출금액(통신비 제외) 0이면서 연결기관 없는 case
                return 'unconnected'
            } else {
                // 선택 월 지출금액 없는 case
                return 'nil'
            }
        },
        setCardAmIndClassSet() {
            if(this.diffBfCardAm > 0) {
                return 'up'
            } else if(this.diffBfCardAm < 0) {
                return 'down'
            } else {
                return ''
            }
        },
        setCashAmIndClassSet() {
            if(this.diffBfCashAm > 0) {
                return 'up'
            } else if(this.diffBfCashAm < 0) {
                return 'down'
            } else {
                return ''
            }
        },
        setPayAmIndClassSet() {
            if(this.diffBfPayAm > 0) {
                return 'up'
            } else if(this.diffBfPayAm < 0) {
                return 'down'
            } else {
                return ''
            }
        },
    },
    watch: {
        isMyAssetGathering (value) {
            if(!value) this.getData()
        },
    },
    mixins: [
        commonMixin
    ],
    created() {
        this.basYm      = dateFormat(new Date(), "YYYYMM")
        this.basYy      = dateFormat(new Date(), "YYYY")
        this.basMm      = dateFormat(new Date(), "MM")
        this.basDt      = dateFormat(new Date(), "YYYYMMDD")
    },
    mounted() {
        this.initComponent()
        this.listenSubscribe() //자산수집 뮤테이션 처리용
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        ...mapActions('myassets', [
            'getAllMyAssetInfo',
            'getMyAssetInfo',
            'getPrdMyAssetInfo'
        ]),
        // 자산수집 mutation 이벤트 감지 
		listenSubscribe() {
			this.getGatheringListenSubscribe()
			// this.subscribe = this.$store.subscribe((mutation, state) => {
			//     const isMyAssetGathering = mutation.type === 'myassets/completeMyAssetGatherData'
			//     // 예금 전체조회
			//     if (isMyAssetGathering) {
			//         console.log('자산수집 subscribe  ###############################', mutation, state)
			//         this.getData()
			//     }
			// })
		},
        /**
         * 수집갱신 처리
         */
        async fn_refreshApiCall() {
           //Vuex Store로 변경
           // 20220422 두번 클릭 방지 
           if(!this.isMyAssetGathering){
               this.getAllMyAssetInfo()
           }
        },  
        initComponent() {
            /* 자산연결 데이터 조회 */
            this.initData()
            this.getAssetConnData()
        },
        /**
         * 연결기관목록 초기화
         */
        initData() {
            ////////// 연결자산 관련 데이터
            this.userAsetList    = []   // 개인신용정보전송요구내역
            /* 은행 */
            this.conBankList     = []   // 은행업권 데이터
            this.conBankExprList = []   // 은행업권 만료 데이터
            /* 카드 */
            this.conCardList     = []   // 카드업권 데이터
            this.conCardExprList = []   // 카드업권 만료 데이터
            /* 페이 */
            this.conEfinList     = []   // 전자금융업권 데이터
            this.conEfinExprList = []   // 전자금융업권 만료 데이터
        },
        /**
         * 자산 연결 데이터 조회
         */
        getAssetConnData() {
            this.conBankCnt = 0
            this.assetConnCnt = 0

            // 사용자 중앙회 계좌 조회
            const config = {
                url : "/co/am/08r03", //"/co/am/05rb3", ///co/am/05ra2
                data : {
                    mydtCusno : this.getUserInfo("mydtCusno")
                }
            }
            apiService.call(config).then(response => {
                this.nacfAccList = response.nacfAccList || []

                // 은행업권 연결리스트 중앙회 계좌여부 확인
                this.conBankCnt += this.nacfAccList.length > 0 ? 1 : 0
                this.assetConnCnt += this.conBankCnt
            })

            // 개인신용정보 전송요구내역 조회
            const config_conf = {
                url : '/co/am/08r05', // /co/am/08r02
                data: {
                    mydtCusno: this.getUserInfo('mydtCusno')
                }
            }
            apiService.call(config_conf).then(response => {
                this.userAsetList = response.bzrgList || []

                // 은행업권
                this.conBankList     = []
                this.conBankExprList = []
                let tmpBankList	     = (typeof _.find(this.userAsetList, {"comnCVal":"bank"}) !== "undefined") ? _.find(this.userAsetList, {"comnCVal":"bank"}).orgList : []
                // this.conBankCnt      += tmpBankList.length
                for(let i=0; i<tmpBankList.length; i++) {
                    tmpBankList[i].orgBizDsc = "bank"
                    if(tmpBankList[i].acsTokenDusDtm == '0' && dayDiff(tmpBankList[i].tmsEdDt, this.currentDate) >= 0) {
                        // 토큰만료일자가 0이고, 전송종료일자가 현재일자보다 크거나 같을경우 연결목록에 포함
                        this.conBankList.push(tmpBankList[i])
                        this.conBankCnt++
                    } else {
                        // 그 외 경우 만료로 판단
                        this.conBankExprList.push(tmpBankList[i])
                    }
                }

                // 카드업권
                this.conCardList     = []
                this.conCardExprList = []
                let tmpCardList      = (typeof _.find(this.userAsetList, {"comnCVal":"card"}) !== "undefined") ? _.find(this.userAsetList, {"comnCVal":"card"}).orgList : []
                // this.conCardCnt      = tmpCardList.length
                for(let i=0; i<tmpCardList.length; i++) {
                    tmpCardList[i].orgBizDsc = "card"
                    if(tmpCardList[i].acsTokenDusDtm == '0' && dayDiff(tmpCardList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.conCardList.push(tmpCardList[i])
                        this.conCardCnt = this.conCardList.length
                    } else {
                        this.conCardExprList.push(tmpCardList[i])
                    }
                }

                // 전자금융업권
                this.conEfinList     = []
                this.conEfinExprList = []
                let tmpEfinList      = (typeof _.find(this.userAsetList, {"comnCVal":"efin"}) !== "undefined") ? _.find(this.userAsetList, {"comnCVal":"efin"}).orgList : []
                // this.conEfinCnt      = tmpEfinList.length
                for(let i=0; i<tmpEfinList.length; i++) {
                    tmpEfinList[i].orgBizDsc = "efin"
                    if(tmpEfinList[i].acsTokenDusDtm == '0' && dayDiff(tmpEfinList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.conEfinList.push(tmpEfinList[i])
                        this.conEfinCnt = this.conEfinList.length
                    } else {
                        this.conEfinExprList.push(tmpEfinList[i])
                    }
                }
                
                /* 은행, 카드, 전자금융 업권의 자산연결 건수 > 0 지출 데이터 조회 */
                this.assetConnCnt += this.conBankCnt + this.conCardCnt + this.conEfinCnt

                /* 지출 데이터 조회 */
                this.getData()
            })
        },
        /**
         * 지출데이터 조회
         */
        getData() {
            // 1년이상 전 데이터 조회 시 타임아웃 발생으로 지출내역 api 사용변경
            // const config = {
            //     url: '/lc/ta/01r01',
            //     data: {
            //         mydtCusno : this.getUserInfo('mydtCusno'),
            //         basYm     : this.basYm,
            //         basDt     : this.basDt,
            //         inqStrDt  : this.basYm + '01',
            //         inqEndDt  : this.basDt,
            //     }
            // }
            const config = {
                url: '/lc/le/01r03',
                data: {
                    mydtCusno : this.getUserInfo('mydtCusno'),
                    inqYm     : this.basYm,
                }
            }
            apiService.call(config).then(response => {
                this.xpsTotAmt 		= response.xpsTotAmt || 0
                
                // 카드
                this.cardApvSam		 = response.cardApvSam || 0
                this.bmmCardApvSam	 = response.bmmCardApvSam || 0
                this.cardCn 		 = response.cardCn || 0
                this.cardList 		 = response.cardList || []

                // 페이머니
                this.payMnySam       = response.payMnySam || 0
                this.bmmPayMnySam    = response.bmmPayMnySam || 0
                this.payMnyCn        = response.payMnyCn || 0
                this.payMnyList      = response.payMnyList || []

                // 선불카드
                this.ppayCdApvSam    = response.ppayCdApvSam || 0
                this.bmmPpayCdApvSam = response.bmmPpayCdApvSam || 0
                this.ppayCdCn        = response.ppayCdCn || 0
                this.ppayCdList      = response.ppayCdList || []

                // 현금
                // this.schXpsSam      = response.cashXpsSam || 0
                // this.bmmSchXpsSam   = response.bmmCashXpsSam || 0
                // this.chsvCn         = response.cashCn || 0
                // this.chsvList       = response.cashList || []
                //*/lc/le/01r03 파라미터
                this.schXpsSam      = response.schXpsSam || 0
                this.bmmSchXpsSam   = response.bmmSchXpsSam || 0
                this.chsvCn         = response.chsvCn || 0
                this.chsvList       = response.chsvList || []
                
                // 통신
                this.rqsSam         = response.rqsSam || 0
                this.rqsCn			= response.rqsCn || 0
                this.rqsList        = response.rqsList || []

                this.totListCn = this.cardCn + this.payMnyCn + this.chsvCn + this.ppayCdCn
                this.totListCnWithRqs = this.totListCn + this.rqsCn

                // 전월지출금액 합산
                this.diffBfCardAm = this.cardApvSam - this.bmmCardApvSam
                this.diffBfCashAm = this.schXpsSam - this.bmmSchXpsSam
                this.diffBfPayAm  = (this.payMnySam + this.ppayCdApvSam) - (this.bmmPayMnySam + this.bmmPpayCdApvSam)

                this.bmmTotAm     = this.bmmCardApvSam + this.bmmSchXpsSam + this.bmmPayMnySam + this.bmmPpayCdApvSam
                this.diffBfTotAm  = this.xpsTotAmt - this.bmmTotAm
            })
        },
        /**
         * 월 지출 데이터 불러오기
         */
        callMmXpsData(yyyyMm) {
            this.getPrdMyAssetInfo(dateFormat(yyyyMm, 'YYYYMM'))
        },
        /**
         * 년월 변경 슬라이드팝업 오픈
         */
        selectMonth(){
            // 년월선택
            const config = {
                params: {
                    title: '년월 선택',
                    yyyymm : this.basYy + '' + this.basMm,
                    limit  : 60,
                },
            }
            modalService.openSlideSelectMonth(config).then(response => {
                if( (this.basYy + '' + this.basMm) === (response.substring(0,4) + '' + response.substring(4,6)) ){
                    console.log('달력 변동없음.')
                    return false
                }
                this.basYy = response.substring(0,4)
                this.basMm = response.substring(4,6)
                this.basYm = this.basYy + '' + this.basMm
                this.basDt = dateFormat(getLastDay(this.basYm + '01'), 'YYYYMMDD')
                
                // 년월 선택 후 재조회
                this.getData() 
            })
        },
        /**
         * 지출분석 팝업 오픈 전 조회
         */
        fn_openExpAnls() {
            const config = {
                url: '/lc/ip/01r02', // 인터페이스ID: IF-MOB-PFM-LCIP01R02, 서비스코드: PFMLCIP01R02
                data: {
                    "mydtCusno" : this.getUserInfo('mydtCusno'),
                    "basDt" : this.basDt
                }
            }
            apiService.call(config).then(response =>{
                const cusMmtpXpsOut 	= response.cusMmtpXpsOut
                const xpsAm0      	= response.cusMmtpXpsOut?.xpsAm0 || 0     // 당월

                const stlXpsOut      = response.stlXpsOut         // 결제수단별

                let param = {
                    basDt           : this.basDt,
                    cusMmtpXpsOut   : cusMmtpXpsOut,
                    xpsAm0          : xpsAm0,
                    stlXpsOut       : stlXpsOut
                }

                this.openSlide(param)
            })
        },
        /**
         * 지출분석 슬라이드 오픈
         */
        openSlide(param) {
            const popConfig = {
				params : param,
				renderer : {
					component : LCTA4C08
				}
			}
            modalService.openSlidePagePopup(popConfig).then(response => {
                console.log(response)
            })
        },
        /**
         * 카드 상세팝업 호출
         */
        openCardDetail(obj){
            const config = {
                component: LCLE4002,
                params : {
                    mydtCusno		: this.getUserInfo("mydtCusno"),
                    inqYm 			: this.basYm,
                    infOfrmnOrgC	: obj.infOfrmnOrgC,
                    mydtCdId		: obj.mydtCdId,
                    cdcoCdWrsnm		: obj.cdcoCdWrsnm,
                }
            }
            modalService.openPopup(config).then(() => {
                this.getData()
            })
        },
        /**
         * 페이 상세팝업 호출
         */
        openPayDetail(type, obj){
            let param = {}
            if(type == 'payMny') {
                param = {
                    mydtCusno		: this.getUserInfo("mydtCusno"),
                    inqYm 			: this.basYm,
                    infOfrmnOrgC	: obj.infOfrmnOrgC,
                    faceNo			: obj.faceNo,
                    faceOnm         : obj.faceOnm,
                    accIdVal        : obj.accIdVal || '',
                }
            } else {
                param = {
                    mydtCusno       : this.getUserInfo('mydtCusno'),
                    inqYm           : this.basYm,
                    infOfrmnOrgC	: obj.infOfrmnOrgC,
                    cdcoCdWrsnm		: obj.cdcoCdWrsnm,
                    mydtCdId		: obj.mydtCdId,
                }
            }

            const config = {
                component: type == 'payMny' ? LCLE4003 : LCLE4004,
                params : param
            }
            modalService.openPopup(config).then(() => {
                this.getData()
            })
        },
        /**
         * 현금 상세팝업 호출
         */
        openCashDetail(obj){
            
            const config = {
                component: LCLE4104,
                params : {
                    mydtCusno		: this.getUserInfo("mydtCusno"),
                    inqYm 			: this.basYm,
                    inqDsc          : obj.chsvKdnm == '이체' ? 'F' : 'C'
                }
            }
            // renderer 사용 시 풀팝업 > 풀팝업 에서 다시 돌아올 때 화면요소 사라짐 이슈 확인필요
            //config.renderer = this.modalConfig.renderer
            modalService.openPopup(config).then(() => {
                this.getData()
            })
        },
        /**
         * 자산연결 팝업오픈
         */
        fn_openAssetCon(orgDsc) {
            const config = {
                component: COAR4002,
                params: {
                    isExternal: true,
                    orgDsc: orgDsc
                }
            }
            modalService.openPopup(config).then(() => {
                if(response === 'move' || response === true) {
                    this.initComponent()
                }
            })
        },
    },
    components: {
        Page,
        FootersV2
    },
}
</script>