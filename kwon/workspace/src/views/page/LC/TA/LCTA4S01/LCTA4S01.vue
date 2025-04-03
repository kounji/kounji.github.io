<!--
/*************************************************************************
* @ 서비스경로 : 큰글모드 > 지출 > 지출메인
* @ 페이지설명 : 큰글모드 > 지출 > 지출메인
* @ 파일명     : src/views/page/LC/TA/LCTA4S01/LCTA4S01.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-02-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-18              CS541597              최초작성
*************************************************************************/
-->
<template>
    <page class="content-view">
        <div id="content">
            <section class="wallet_main_senior">
                <div class="update" v-show="xpsTotAmt > 0 || (xpsTotAmt == 0 && assetConnCnt > 0)">
                    <template v-if="!isMyAssetGathering">
                        <span>{{ lastUpdateDtm }}</span>
                        <button type="button" class="btn_update" @click.prevent="fn_refreshApiCall()"><span class="blind">업데이트</span></button>
                    </template>
                    <span v-else class="ml5 num lsp0">자산 업데이트 중</span>
                </div>

                <!--개요-->
                <div class="outline" :class="fn_totAmClassSet"><!--늘은경우 up, ,줄은 경우 down class 추가-->
                    <div class="board_box" v-if="xpsTotAmt != 0">
                        <h2><a href="javascript:void(0);" @click.prevent="selectMonth">{{basMm | numberFilter}}월 지출</a></h2>

                        <div class="toggle_money">
                            <input type="checkbox" title="금액숨김" name="" id="sum_view_01" v-model="amtHiddenYn" @change="fn_amtHidden(amtHiddenYn)">
                            <label for="sum_view_01" class="btns">
                                <span class="hide" aria-hidden="true">보기</span>
                                <span class="show" aria-hidden="true">숨김</span>
                            </label> 
                            <div class="sum">
                                <span class="hide">쉿! 비밀이에요.</span> 
                                <span class="show"><em>{{xpsTotAmt | numberFilter}}</em>원</span>
                            </div>
                        </div>

                        <div class="details" :class="diffBfTotAm > 0 ? 'up' : diffBfTotAm < 0 ? 'down' : ''"><!--적게 쓴경우 down, 초과인 경우 up class 추가--> 
                            <div class="analysis">
                                <div>
                                    <template v-if="diffBfTotAm > 0 || diffBfTotAm < 0">
                                        <span class="text">지난달보다</span> <span class="num">{{Math.abs(diffBfTotAm) | numberFilter}}원</span> <em>{{diffBfTotAm > 0 ? '더 쓰고 있어요.' : '덜 쓰고 있어요.'}}</em>
                                    </template>
                                    <template v-else>
                                        <span class="text">지난달과 지출이</span> <em>동일해요.</em>
                                    </template>
                                    <div class="custom_tooltip">
                                        <div class="com_tooltip_type02 com_tooltip_type03">
                                            <a href="#nolink" class="com_btn_info" role="button">
                                                <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                            </a>
                                            <div class="com_ballon_type01 com_ballon_type02" style="display: none;">
                                                <div>
                                                    <ul class="dotted_list">
                                                        <li>마지막 업데이트 시점의 총 지출과 마지막 업데이트 전 월 말일 총지출을 비교했습니다.</li>
                                                        <li>오늘 업데이트 하셨으면 전 월 말일 총 지출과 비교한 결과입니다.</li>
                                                    </ul>
                                                    <a href="#nolink" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <lottie-animation v-show="diffBfTotAm > 0" :animationData="require('@/assets_v40/images/lottie/icon_wallet_up.json')"  :loop="true" :autoPlay="true" aria-hidden="true" class="icon_wallet" ></lottie-animation>
                            <lottie-animation v-show="diffBfTotAm < 0" :animationData="require('@/assets_v40/images/lottie/icon_wallet_down.json')"  :loop="true" :autoPlay="true" aria-hidden="true" class="icon_wallet" ></lottie-animation>
                            <lottie-animation v-show="diffBfTotAm == 0" :animationData="require('@/assets_v40/images/lottie/icon_wallet.json')"  :loop="true" :autoPlay="true" aria-hidden="true" class="icon_wallet" ></lottie-animation>
                            <!--
                                초과인 경우 icon_wallet_up.json
                                적게 쓸 경우 icon_wallet_down.json
                            -->
                        </div>
                    </div>
                    <div class="board_box" v-else-if="xpsTotAmt == 0 && assetConnCnt != 0">
                        <h2><a href="javascript:void(0);" @click.prevent="selectMonth">{{basMm | numberFilter}}월 지출</a></h2>

                        <div class="toggle_money">
                            <input type="checkbox" title="금액숨김" name="" id="sum_view_01" v-model="amtHiddenYn" @change="fn_amtHidden(amtHiddenYn)">
                            <label for="sum_view_01" class="btns">
                                <span class="hide" aria-hidden="true">보기</span>
                                <span class="show" aria-hidden="true">숨김</span>
                            </label> 
                            <div class="sum">
                                <span class="hide">쉿! 비밀이에요.</span> 
                                <span class="show"><em>{{xpsTotAmt | numberFilter}}</em>원</span>
                            </div>
                        </div>

                        <div class="details">
                            <div class="analysis">
                                <p>{{basMm | numberFilter}}월 지출<br/>내역이 없어요.</p>
                            </div>
                        </div>
                    </div>
                    <div class="board_box" v-else>
                        <p class="txt">지출수단을 연결하고<br>
                            <em>지출 흐름을 한 눈에</em><br>
                            확인해 보세요.
                        </p>
                        <div>
                            <a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openAssetCon"><span class="icon_line_right">내역 불러오기</span></a>
                        </div>
                    </div>
                    <a href="javascript:void(0);" v-if="xpsTotAmt > 0" @click.prevent="fn_openExpAnls"><em>지출분석</em><span>상세보기</span></a>
                </div>
                <!-- // 개요 -->

                <!-- 카드 -->
                <div class="board_box wallet_spend">
                    <!-- 카드 이용내역 있음 -->
                    <template v-if="cardCn > 0">
                        <h2 class="title"><a href="javascript:void(0);" @click.prevent="fn_openDtlSlide('card', cardList)">카드 이용 금액</a></h2>
                        <div class="card">
                            <span class="num"><em>{{cardApvSam | numberFilter}}</em>원</span>
                        </div>
                    </template>
                    <!-- // 카드 이용내역 있음 -->
                    <!-- 카드 이용내역 없으면서 연결기관 있음 -->
                    <template v-else-if="cardCn == 0 && conCardCnt > 0">
                        <h2 class="title">카드 이용 금액</h2>
                        <div class="card">  
                            <p> 카드 이용 내역이 없어요.</p>
                        </div>
                    </template>
                    <!-- // 카드 이용내역 없으면서 연결기관 있음 -->
                    <!-- 카드 연결기관 없음 -->
                    <template v-else>
                        <h2 class="title">카드 이용 금액</h2>
                        <div>
                            <a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openAssetCon"><span class="icon_line_right">내역 불러오기</span></a>
                        </div>
                    </template>
                    <!-- // 카드 연결기관 없음 -->
                </div>
                <!-- // 카드 -->

                <!-- 페이 -->
                <div class="board_box wallet_spend">
                    <!-- 페이 이용내역 있음 -->
                    <template v-if="payMnyCn + ppayCdCn > 0">
                        <h2 class="title"><a href="javascript:void(0);" @click.prevent="fn_openDtlSlide('pay', null)">페이 이용 금액</a></h2>
                        <div class="pay">
                            <span class="num"><em>{{(payMnySam + ppayCdApvSam) | numberFilter}}</em>원</span>
                        </div>
                    </template>
                    <!-- // 페이 이용내역 있음 -->
                    <!-- 페이 이용내역 없으면서 연결기관 있음 -->
                    <template v-else-if="payMnyCn + ppayCdCn == 0 && conEfinCnt > 0">
                        <h2 class="title">페이 이용 금액</h2>
                        <div class="pay">
                            <p> 페이 이용 내역이 없어요.</p>
                        </div>
                    </template>
                    <!-- // 페이 이용내역 없으면서 연결기관 있음 -->
                    <!-- 페이 연결기관 없음 -->
                    <template v-else>
                        <h2 class="title">페이 이용 금액</h2>
                        <div>
                            <a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openAssetCon"><span class="icon_line_right">내역 불러오기</span></a>
                        </div>
                    </template>
                    <!-- // 페이 연결기관 없음 -->
                </div>
                <!-- // 페이 -->

                <!--현금-->
                <div class="board_box wallet_spend">
                    <!-- 현금 이용내역 있음 -->
                    <template v-if="chsvCn > 0">
                        <h2 class="title"><a href="javascript:void(0);" @click.prevent="fn_openDtlSlide('cash', chsvList)">현금 이용 금액</a></h2>
                        <div class="cash">
                            <span class="num"><em>{{schXpsSam | numberFilter}}</em>원</span>
                        </div>
                    </template>
                    <!-- // 현금 이용내역 있음 -->
                    <!-- 현금 이용내역 없으면서 연결기관(은행) 있음 -->
                    <template v-else-if="chsvCn == 0 && conBankCnt > 0">
                        <h2 class="title">현금 이용 금액</h2>
                        <div class="cash">
                            <p> 현금 이용 내역이 없어요.</p>
                        </div>
                    </template>
                    <!-- // 현금 이용내역 없으면서 연결기관(은행) 있음 -->
                    <!-- 은행 연결기관 없음 -->
                    <template v-else>
                        <h2 class="title">현금 이용 금액</h2>
                        <div>
                            <a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openAssetCon"><span class="icon_line_right">내역 불러오기</span></a>
                        </div>
                    </template>
                    <!-- // 은행 연결기관 없음 -->
                </div>

                <!--통신비-->
                <div class="board_box wallet_spend">
                    <h2 class="title" v-if="rqsCn > 0"><a href="javascript:void(0);" @click.prevent="fn_openDtlSlide('tel', modifiedRqsList)">통신비 이용 금액</a></h2>
                    <h2 class="title" v-else>통신비 이용 금액</h2>
                    <div class="custom_tooltip up">
                        <div class="com_tooltip_type02 com_tooltip_type03">
                            <a href="javascript:void(0);" class="com_btn_info" role="button" @click.prevent="isTipShowYn = true">
                                <em class="tooltip_icon_gray"><span class="blind">툴팁열기</span></em>
                            </a>
                        </div>
                        <div class="com_ballon_type01 com_ballon_type02" v-show="isTipShowYn">
                            <div>
                                <p>
                                    결제 예정금액으로 총지출에는 포함되지 않습니다.<br>
                                    결제일 이후 카드/페이/현금 결제 내역에서 확인할 수 있습니다.
                                </p>
                                <a href="javascript:void(0);" class="com_btn_close" @click.prevent="isTipShowYn = false"><span class="blind">툴팁닫기</span></a>
                            </div> 
                        </div>
                    </div>
                    <!-- 통신비 이용내역 있음 -->
                    <template v-if="rqsCn > 0">
                        <div class="phone">  
                            <span class="num"><em>{{rqsSam | numberFilter}}</em>원</span>
                        </div>
                    </template>
                    <!-- // 통신비 이용내역 있음 -->
                    <!-- 통신비 이용내역 없으면서 연결기관 있음 -->
                    <template v-else-if="rqsCn == 0 && conTelCnt > 0">
                        <div class="phone">
                            <p> 통신비 이용 내역이 없어요.</p>
                        </div>
                    </template>
                    <!-- // 통신비 이용내역 없으면서 연결기관 있음 -->
                    <!-- 통신비 연결기관 없음 -->
                    <template v-else>
                        <div>
                            <a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openAssetCon"><span class="icon_line_right">내역 불러오기</span></a>
                        </div>
                    </template>
                    <!-- // 통신비 연결기관 없음 -->
                </div>

                <!--금융지식-->
                <!-- <div class="finlit" v-if="financeKlList.length > 0">
                    <h2 class="h_tit01">금융지식</h2>
                    <a href="javascript:void(0);" class="btn_lots" @click.prevent="fn_movePage('COCT4001')"><span class="blind">더보기</span></a>

                    <div class="scroller">
                        <ul>
                            <li v-for="(item, idx) in financeKlList" :key="idx">
                                <a href="javascript:void(0);" @click.prevent="fn_openFncKlDtl(item.cntzId)">
                                    <img :src="item.thmnlImgUrlnm" alt="" @error="emptyImg">
                                    <strong>{{item.cntzTinm}}</strong>
                                    <span class="hash" v-if="!!item.rcmKwrdCntn">#{{item.rcmKwrdCntn}}</span>
                                </a>
                            </li>
                        </ul>
                    </div>
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
import LottieAnimation from 'lottie-web-vue'

import COAR4001 from '@/views/page/CO/AR/COAR4001/COAR4001.vue'
import COCT4011 from '@/views/page/CO/CT/COCT4011/COCT4011.vue'
import LCTA4S03 from '@/views/page/LC/TA/LCTA4S03/LCTA4S03.vue'
import LCTA4S04 from '@/views/page/LC/TA/LCTA4S04/LCTA4S04.vue'
import LCTA4S06 from '@/views/page/LC/TA/LCTA4S06/LCTA4S06.vue'
import LCTA4S07 from '@/views/page/LC/TA/LCTA4S07/LCTA4S07.vue'
import LCTA4S08 from '@/views/page/LC/TA/LCTA4S08/LCTA4S08.vue'

import _ from 'lodash'

export default {
    name : "LCTA4S01",
    data: () => {
        return {
            mydtCusno       : '',       // 마이데이터고객번호
            cusnm           : '',       // 고객명
            executeCnt      : 0,        // 실행 count
            finalUpdateDtm  : '',       // 최근 자산 업데이트 시기

            date            : null,
            todayBasYm      : null,
            basYm           : null,
            basYy           : null,
            basMm           : null,
            basDt           : null,

            amtHiddenYn     : false,    // 금액 보기/숨김 구분(true:숨김, false:보기)
            isTipShowYn     : false,    // 통신비 툴팁 보기 여부
        
            inqYm			: "",		// 조회년월
            xpsTotAmt		: 0,		// 지출총합계
            topXpsCtgrC     : 0,        // 최고지출카테고리코드
            topXpsCtgrCNm   : 0,        // 최고지출카테고리코드명
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
            xpsObtAm		: 0,		// 지출목표금액
            cardCn			: 0,		// 카드목록건수
            chsvCn			: 0,		// 현금목록건수
            ppayCn			: 0,		// 선불목록건수
            payMnyCn		: 0,		// 페이머니목록건수
            ctgrCn			: 0,    	// 카테고리별지출목록건수
            ppayCdCn        : 0,		// 선불카드목록건수
            rqsCn			: 0,		// 통신청구목록건수
            currYm			: "",		// 현재년월(조회년월과 비교용도)
            totListCn       : 0,        // 목록 총개수(카드, 페이(페이머니, 선불카드), 현금(이체, 수기))
            totListCnWithRqs: 0,        // 통신비 포함 목록 총개수

            bmmTotAm        : 0,        // 전월지출금액합산
            diffBfTotAm     : 0,        // 전월대비 총지출 증감액

            // 각 목록 정렬기준
            // 카드 : 카드명, 기타 : 이체 -> 현금 순서, 페이머니 : 권면명칭, 선불결제 : 페이명
            cardList		: [],		// 카드목록
            chsvList		: [],   	// 현금목록
            ppayList		: [],   	// 선불목록
            payMnyList		: [],		// 페이머니목록
            ctgrList		: [],		// 카테고리별지출목록
            ppayCdList      : [],   	// 선불카드목록
            rqsList			: [],		// 통신청구목록
            modifiedRqsList : [],		// 기관별로 묶은 통신청구목록

            //////// 연결자산 관련 데이터
            userAsetList    : [], // 개인신용정보전송요구내역
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
            /* 통신 */
            conTelList         : [], // 통신업권 데이터
            conTelExprList     : [], // 통신업권 만료 데이터
            conTelCnt          : 0,  // 통신업권 건수

            codeNmList 		   : [   // 업권 코드별 명칭 리스트
				{"codeVal":"bank", 		"codeNm":"은행"		},
				{"codeVal":"card", 		"codeNm":"카드"		},
				{"codeVal":"efin", 		"codeNm":"전자금융"	},
				{"codeVal":"telecom", 	"codeNm":"통신"		},
            ],  

            assetConnCnt       : 0,  // 은행, 카드, 전자금융 건수 합계
            financeKlList      : [], // 금융지식 컨텐츠 목록
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
        }
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
        this.date       = new Date()
        this.todayBasYm = dateFormat(new Date(), "YYYYMM")
        this.basYm      = dateFormat(new Date(), "YYYYMM")
        this.basYy      = dateFormat(new Date(), "YYYY")
        this.basMm      = dateFormat(new Date(), "MM")
        this.basDt      = dateFormat(new Date(), "YYYYMMDD")
        this.mydtCusno  = this.getUserInfo("mydtCusno")
        this.cusnm      = this.getUserInfo("cusnm")
    },
    mounted() {
        this.initComponent()
        
        // 자산수집 mutation 이벤트 감지 
        this.getGatheringListenSubscribe()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        ...mapActions('myassets', [
            'getAllMyAssetInfo',
            'getMyAssetInfo',
        ]),        
        initComponent() {
            this.mydtCusno  = this.getUserInfo('mydtCusno')
            this.currYm     = dateFormat(new Date(), 'YYYYMM')
            this.inqYm      = dateFormat(new Date(), 'YYYYMM')      // 조회년월(초기세팅은 현재년월)

            this.amtHiddenYn = this.getSecretAmInfo().includes('LC')

            /* 자산연결 데이터 조회 */
            this.initData()
            this.getAssetConnData()

            //this.getData()

            this.finalUpdateDtm = dateFormat(new Date(), "YYYY.MM.DD HH:mm:ss")
            let lastUpdateDate  = dateFormat(new Date(this.lastUpdateDtm), "YYYY.MM.DD HH:mm:ss")

            console.log("this.lastUpdateDtm --------------------- ", this.lastUpdateDtm)
            console.log("this.finalUpdateDtm================", this.finalUpdateDtm)
            console.log("this.lastUpdateDate================", lastUpdateDate)

            const currDate = new Date() //new Date(this.finalUpdateDtm)
            const lastDate = new Date(this.lastUpdateDtm) //new Date(lastUpdateDate)
            const diffSec = currDate.getTime() - lastDate.getTime()

            console.log("this.currDate================", currDate)
            console.log("this.lastDate================", lastDate)
            console.log("this.diffSec================", diffSec)
            
            let difMm = Math.floor(diffSec %(1000*60*60)) / (1000*60)
            
            console.log("difMm --------------------- ", difMm)
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
            /* 통신 */
            this.conTelList      = []   // 통신업권 데이터
            this.conTelExprList  = []   // 통신업권 만료 데이터
        },
        /**
         * 자산 연결 데이터 조회
         */
        getAssetConnData() {
            // 개인신용정보 전송요구내역 조회
            const config_con = {
                url: "/co/am/08r02",
                data: {
                    mydtCusno: this.getUserInfo('mydtCusno')
                }
            }
            apiService.call(config_con).then(response => {
                this.userAsetList = response.bzrgList || []

                // 은행업권
                this.conBankList     = []
                this.conBankExprList = []
                let tmpBankList	     = (typeof _.find(this.userAsetList, {"comnCVal":"bank"}) !== "undefined") ? _.find(this.userAsetList, {"comnCVal":"bank"}).orgList : []
                this.conBankCnt      = tmpBankList.length
                for(let i=0; i<tmpBankList.length; i++) {
                    tmpBankList[i].orgBizDsc = "bank"
                    if(tmpBankList[i].acsTokenDusDtm == '0' && dayDiff(tmpBankList[i].tmsEdDt, this.currentDate) >= 0) {
                        // 토큰만료일자가 0이고, 전송종료일자가 현재일자보다 크거나 같을경우 연결목록에 포함
                        this.conBankList.push(tmpBankList[i])
                    } else {
                        // 그 외 경우 만료로 판단
                        this.conBankExprList.push(tmpBankList[i])
                    }
                }
                console.log("this.tmpBankList.length =============>",tmpBankList.length)
                console.log("this.conBankList =============>",this.conBankList)
                console.log("this.conBankExprList =============>",this.conBankExprList)
                console.log("this.conBankList.length =============>",this.conBankList.length)
                console.log("this.conBankExprList.length =============>",this.conBankExprList.length)

                // 카드업권
                this.conCardList     = []
                this.conCardExprList = []
                let tmpCardList      = (typeof _.find(this.userAsetList, {"comnCVal":"card"}) !== "undefined") ? _.find(this.userAsetList, {"comnCVal":"card"}).orgList : []
                this.conCardCnt      = tmpCardList.length
                for(let i=0; i<tmpCardList.length; i++) {
                    tmpCardList[i].orgBizDsc = "card"
                    if(tmpCardList[i].acsTokenDusDtm == '0' && dayDiff(tmpCardList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.conCardList.push(tmpCardList[i])
                    } else {
                        this.conCardExprList.push(tmpCardList[i])
                    }
                }
                console.log("this.tmpCardList.length =============>",tmpCardList.length)
                console.log("this.conCardList =============>",this.conCardList)
                console.log("this.conCardList.length =============>",this.conCardList.length)
                console.log("this.conCardExprList =============>",this.conCardExprList)
                console.log("this.conCardExprList.length =============>",this.conCardExprList.length)

                // 전자금융업권
                this.conEfinList     = []
                this.conEfinExprList = []
                let tmpEfinList      = (typeof _.find(this.userAsetList, {"comnCVal":"efin"}) !== "undefined") ? _.find(this.userAsetList, {"comnCVal":"efin"}).orgList : []
                this.conEfinCnt      = tmpEfinList.length
                for(let i=0; i<tmpEfinList.length; i++) {
                    tmpEfinList[i].orgBizDsc = "efin"
                    if(tmpEfinList[i].acsTokenDusDtm == '0' && dayDiff(tmpEfinList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.conEfinList.push(tmpEfinList[i])
                    } else {
                        this.conEfinExprList.push(tmpEfinList[i])
                    }
                }
                console.log("this.tmpEfinList.length =============>",tmpEfinList.length)
                console.log("this.conEfinList.length =============>",this.conEfinList.length)
                console.log("this.conEfinExprList.length =============>",this.conEfinExprList.length)
                console.log("this.conEfinList =============>",this.conEfinList)
                console.log("this.conEfinExprList =============>",this.conEfinExprList)

                // 통신업권
                this.conTelList     = []
                this.conTelExprList = []
                let tmpTelecomList  = (typeof _.find(this.userAsetList, {"comnCVal":"telecom"}) !== "undefined")? _.find(this.userAsetList, {"comnCVal":"telecom"}).orgList : []
                this.conTelCnt      = tmpTelecomList.length
                for(let i=0; i<tmpTelecomList.length; i++) {
                    tmpTelecomList[i].orgBizDsc = "telecom"
                    if(tmpTelecomList[i].acsTokenDusDtm == '0' && dayDiff(tmpTelecomList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.conTelList.push(tmpTelecomList[i])
                    } else {
                        this.conTelExprList.push(tmpTelecomList[i])
                    }
                }
                console.log("this.tmpTelecomList.length =============>",tmpTelecomList.length)
                console.log("this.conTelList.length =============>",this.conTelList.length )
                console.log("this.conTelExprList.length  =============>",this.conTelExprList.length )
                console.log("this.conTelList =============>",this.conTelList)
                console.log("this.conTelExprList =============>",this.conTelExprList)

                /*은행, 카드, 전자금융 업권의 자산연결 건수 > 0 지출 데이터 조회*/
                this.assetConnCnt = this.conBankCnt + this.conCardCnt + this.conEfinCnt

                /* 지출 데이터 조회 */
                this.getData() 
            })
        },

        /**
         * 금액 숨김/보기 처리
         */
        fn_amtHidden() {
            this.setSecretAmInfo('LC', this.amtHiddenYn)
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
        /*
         * 데이터 조회
         */
        getData() {
            console.log("getData()===============================================")

            const config = {
                url: '/lc/le/01r03',    // asis) /lc/le/01r02
                data: {
                    mydtCusno : this.mydtCusno,
                    inqYm     : this.basYm
                }
            }
            
            console.log("getData() config ========", config)

            apiService.call(config).then(response =>{
                console.log('getData() ======> response', JSON.parse(JSON.stringify(response)))
                this.mydtCusno 		= response.mydtCusno || ''
                this.inqYm 			= response.inqYm || ''
                this.xpsTotAmt 		= response.xpsTotAmt || 0
                this.topXpsCtgrC    = response.topXpsCtgrC || '';
                this.topXpsCtgrCNm  = response.topXpsCtgrCNm || '';
                this.cardApvSam		= response.cardApvSam || 0
                this.bmmCardApvSam	= response.bmmCardApvSam || 0
                this.schXpsSam 		= response.schXpsSam || 0
                this.bmmSchXpsSam 	= response.bmmSchXpsSam || 0
                this.ppayXpsSam 	= response.ppayXpsSam || 0
                this.payMnySam  	= response.payMnySam || 0
                this.bmmPayMnySam  	= response.bmmPayMnySam || 0
                this.xpsObtAm   	= response.xpsObtAm || 0
                this.ppayCdApvSam 	= response.ppayCdApvSam || 0
                this.bmmPpayCdApvSam = response.bmmPpayCdApvSam || 0
                this.rqsSam			= response.rqsSam || 0

                this.cardCn 		= response.cardCn || 0
                this.chsvCn 		= response.chsvCn || 0
                this.ppayCn 		= response.ppayCn || 0
                this.payMnyCn 		= response.payMnyCn || 0
                this.ctgrCn     	= response.ctgrCn || 0
                this.ppayCdCn   	= response.ppayCdCn || 0
                this.rqsCn			= response.rqsCn || 0

                this.cardList 		= response.cardList || []
                this.chsvList 		= response.chsvList	|| []
                this.ppayList 		= response.ppayList || []
                this.payMnyList 	= response.payMnyList || []
                this.ctgrList   	= response.ctgrList || []
                this.ppayCdList		= response.ppayCdList || []
                this.rqsList        = response.rqsList || []

                // 기관별로 묶음
                this.modifiedRqsList = this.modifyRqsList(this.rqsList)

                this.totListCn = this.cardCn + this.payMnyCn + this.chsvCn + this.ppayCdCn
                this.totListCnWithRqs = this.totListCn + this.rqsCn

                // 전월지출금액 합산
                this.bmmTotAm = this.bmmCardApvSam + this.bmmSchXpsSam + this.bmmPayMnySam + this.bmmPpayCdApvSam
                this.diffBfTotAm = this.xpsTotAmt - this.bmmTotAm
            })
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
         * 기관별로 묶기
         */
        modifyRqsList(objArray){
            console.log('modifyRqsList objArray ==================', JSON.parse(JSON.stringify(objArray)))
            let list = objArray || []
            let result = _.chain(list)
                .uniqBy('infOfrmnOrgC')
                .map(d => {
                    return {
                        infOfrmnOrgC 	: d.infOfrmnOrgC,
                        infOfrmnOrgCNm  : d.infOfrmnOrgCNm,
                        comuRqsAmSum    : _.sumBy(_.filter(list, {infOfrmnOrgC : d.infOfrmnOrgC}), d2 => {return d2.comuRqsAm}),
                        list         	: _.filter(list, {infOfrmnOrgC : d.infOfrmnOrgC})
                    }
                })
                .orderBy('infOfrmnOrgCNm', 'asc')
                .value()
            return result
        },   
        
        /**
         * 지출분석 슬라이드 팝업 오픈
         */
        fn_openExpAnls() {
            let param = {
                basDt : this.basDt
            }
            const popConfig = {
				params : param,
				renderer : {
					component : LCTA4S08
				}
			}
            modalService.openSlidePagePopup(popConfig).then(response => {
                console.log(response)
            })
        },
        /**
         * 항목별 지출내역 슬라이드 팝업 오픈
         */
        fn_openDtlSlide(pageId, list) {
            let trgtPage = null
            let nowSam = 0
            let bfSam = 0
            let inqYm = this.inqYm

            switch(pageId) {
                case 'card' :
                    trgtPage = LCTA4S03
                    nowSam = this.cardApvSam    // 이달 카드승인금액
                    bfSam = this.bmmCardApvSam  // 전달 카드승인금액
                    break
                case 'pay' :
                    trgtPage = LCTA4S04
                    this.payMnyList.forEach(d => d.key = 'payMny')  // 페이머니 식별자 할당
                    this.ppayCdList.forEach(d => d.key = 'ppayCd')  // 선불카드 식별자 할당
                    list = [...this.payMnyList, ...this.ppayCdList]
                    nowSam = this.payMnySam + this.ppayCdApvSam         // 이달 페이(머니 + 선불카드)지출금액
                    bfSam = this.bmmPayMnySam + this.bmmPpayCdApvSam    // 전달 페이(머니 + 선불카드)지출금액

                    break
                case 'cash' :
                    trgtPage = LCTA4S06
                    nowSam = this.schXpsSam     // 이달 현금사용금액
                    bfSam = this.bmmSchXpsSam   // 전달 현금사용금액
                    break
                case 'tel' :
                    trgtPage = LCTA4S07
                    nowSam = this.rqsSam
                    break
                default :
                    return
            }

            let param = {
                trgtList    : list || [],
                nowSam      : nowSam || 0,
                bfSam       : bfSam || 0,
                inqYm       : inqYm         // 조회년월(일반모드 이용내역 팝업 조회시 필요 데이터)
            }
            // 25.02.20) 슬라이드 -> 풀팝업 호출 시 슬라이드 팝업 유지 불가로 openPopup 사용
            // 25.02.20) LCLE4002 팝업 내 닫기 버튼 closeAll 적용되어있으므로 해당 슬라이드도 닫힘
            const popConfig = {
                params : param,
                renderer : {
                    component : trgtPage
                }
            }
            modalService.openSlidePagePopup(popConfig).then(response => {
                console.log(response)
            })
            // const popConfig = {
            //     component: trgtPage,
            //     params: param
            // }
            // modalService.openPopup(popConfig).then(response => {
            //     console.log(response)
            // })
        },
        /**
         * 금융지식 컨텐츠 조회
         */
        getFinanceKlList(){
            this.getFinanInfo('LCTA4001', 5, false).then(response => {
                this.financeKlList = response
                // *출력값
                // -썸네일이미지URL명  = thmnlImgUrlnm
                // -글번호 = cntzId
                // -컨텐츠제목 = cntzTinm
                // -추천연령 = asetAgLrgDsnm
            })
        },
        /**
         * 금융지식 컨텐츠 상세조회
         */
        fn_openFncKlDtl(cntzId) {
            const config = {
                component: COCT4011,
                params: cntzId
            }
            modalService.openPopup(config)
        },
        /**
         * 화면이동
         */
        fn_movePage(pageId) {
            commonService.movePage(pageId)
        },
        /**
         * 자산연결 팝업오픈
         */
        fn_openAssetCon() {
            const config = {
                component: COAR4001,
                params: {}
            }
            modalService.openPopup(config).then(() => {
                this.getData()
            })
        },
        emptyImg(e) {
			e.target.src = new URL("@/assets_v40/images/event/ev_noimg.png", import.meta.url).href
		},
    },
    components: {
        Page,
        FootersV2,
        LottieAnimation
    },
}
</script>