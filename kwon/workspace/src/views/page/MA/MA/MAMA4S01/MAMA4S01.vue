<!--
/*************************************************************************
* @ 서비스경로 : PFM메인 > 메인 (큰글씨 모드)
* @ 페이지설명 : 메인 (큰글씨 모드)
* @ 파일명     : src/views/page/MA/MA/MAMA4S01/MAMA4S01.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-02-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-10              CS541597              최초작성
***************************************************************************/
-->
<template>
    <div class="content-view">
            <div id="content">
                <section class="main_senior">
					<!--개요-->
					<div class="outline">
						<ul role="tablist" class="inner_tab green">
							<li class="on"><button type="button" role="tab" aria-selected="true" @click.prevent="fn_clickTab(0)">자산</button></li>
							<li><button type="button" role="tab" aria-selected="false" @click.prevent="fn_clickTab(1)">지출</button></li>
						</ul>

						<!--slick-->
						<div class="slick">
                            <!--//늘은 경우 up, 줄은 경우 down class 추가-->
							<!-- <div class="details" :class="astIndSum > 0 ? 'up' : astIndSum === 0 ? '' : 'down'" v-show="selTab === 0"> -->
                            <div class="details" v-show="selTab == 0">
								<h2>나의 총 자산</h2>

                                <div class="update">
                                    <template v-if="!isMyAssetGathering">
                                        <span>{{ lastUpdateDtm }}</span>
                                        <button type="button" class="btn_update" @click.prevent="fn_refreshApiCall()"><span class="blind">업데이트</span></button>
                                    </template>
                                    <span v-else class="ml5 num lsp0">자산 업데이트 중</span>
                                </div>

								<div class="toggle_money">
									<input type="checkbox" title="금액노출" name="" id="sum_view_01" v-model="showAmtYn">
									<label for="sum_view_01" class="btns">
										<span class="show">보기</span>
										<span class="hide">숨김</span>
									</label>
									<div class="sum">
										<span class="show"><em>금액숨김</em></span>
										<span class="hide"><em>{{ totAsetAm | numberFilter }}</em>원</span>
									</div>
								</div>
								
								<!-- <p class="analysis" v-if="!showAmtYn">나의 총 자산을 확인해보세요</p> -->
                                <div class="analysis">
                                    <p v-if="showAmtYn" class="latter" :class="astIndSum > 0 ? 'up' : astIndSum < 0 ? 'down' : ''">
                                        나의 총 자산이 
                                        <em>{{astIndSum > 0 ? '늘었어요.' : astIndSum < 0 ? '줄었어요.' : '동일해요.'}}</em>
                                    </p>
                                    <p v-else class="latter">나의 총 자산을 확인해보세요.</p>

                                    <div class="custom_tooltip top">
										<div class="com_tooltip_type02">
											<a href="#nolink" class="com_btn_info" role="button">
												<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
											</a>
											<div class="com_ballon_type01 com_ballon_type02">
												<div>
													<ul class="dotted_list">
														<li>마지막 업데이트 시점의 총 자산과 마지막 업데이트 전 월 말일의 총자산을 비교했습니다.</li>
														<li>오늘 업데이트 하셨으면 전 월 말일 총 자산과 비교한 결과입니다.</li>
													</ul>
													<a href="#nolink" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
												</div>
											</div>
										</div>
									</div>
                                </div>
							</div>	

                            <div class="details" v-show="selTab === 1">
                                <h2>{{currMm}}월 총 지출</h2>

                                <div class="update">
                                    <template v-if="!isMyAssetGathering">
                                        <span>{{ lastUpdateDtm }}</span>
                                        <button type="button" class="btn_update" @click.prevent="fn_refreshApiCall()"><span class="blind">업데이트</span></button>
                                    </template>
                                    <span v-else class="ml5 num lsp0">자산 업데이트 중</span>
                                </div>

                                <template v-if="xpsInfo.xpsTotAmt != 0 || (xpsInfo.xpsTotAmt == 0 && assetConnCnt != 0)">
                                    <div class="toggle_money">
                                        <input type="checkbox" title="금액노출" name="" id="sum_view_02" v-model="showXpsYn">
                                        <label for="sum_view_02" class="btns">
                                            <span class="show">보기</span>
                                            <span class="hide">숨김</span>
                                        </label>
                                        <div class="sum">
                                            <span class="show"><em>금액숨김</em></span>
                                            <span class="hide"><em>{{xpsInfo.xpsTotAmt | numberFilter}}</em></span>
                                        </div>
                                    </div>

                                    <div class="analysis">
                                        <p v-if="showXpsYn" class="latter" :class="diffBfTotAm > 0 ? 'up' : diffBfTotAm < 0 ? 'down' : ''">
                                            나의 총 지출이 
                                            <em>{{diffBfTotAm > 0 ? '늘었어요.' : diffBfTotAm < 0 ? '줄었어요.' : '동일해요.'}}</em>
                                        </p>
                                        <p v-else class="latter">
                                            나의 총 지출을 확인해보세요.
                                        </p>

                                        <div class="custom_tooltip top">
                                            <div class="com_tooltip_type02">
                                                <a href="#nolink" class="com_btn_info" role="button">
                                                    <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                                </a>
                                                <div class="com_ballon_type01 com_ballon_type02">
                                                    <div>
                                                        <ul class="dotted_list">
                                                            <li>마지막 업데이트 시점의 총 지출과 마지막 업데이트  전 월 말일 총지출을 비교했습니다.</li>
                                                            <li>오늘 업데이트 하셨으면 전 월 말일 총 지출과 비교한 결과입니다.</li>
                                                        </ul>
                                                        <a href="#nolink" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="toggle_money">
                                        <div class="sum">
                                            <span>연결한 카드,페이가 없어요.</span> 
                                        </div>
                                        <a href="javascript:void(0);" class="btns" @click.prevent="fn_openPopup('COAR4001')">연결</a>
                                    </div>
                                    <div class="analysis">
                                        <p class="latter up">
                                            연결하면 <em>지난달과 비교할 수 있어요.</em>
                                        </p>
                                    </div>
                                </template>
                            </div>
						</div>
						<!--//slick-->
					</div>

					<!--주요서비스-->
					<div class="staple_cont">
						<a href="#nolink" class="gotolink" @click.prevent="fn_movePage('ASTA4S01')">자산</a>
						<a href="#nolink" class="gotolink" @click.prevent="fn_movePage('LCTA4S01')">지출</a>
						<a href="#nolink" class="gotolink" @click.prevent="fn_movePage('PDTA4S01')">연금/절세</a>
						<a href="#nolink" class="gotolink" @click.prevent="fn_movePage('COCT4001')">금융지식</a>
                        <!-- <a href="#nolink" class="gotolink" @click.prevent="test('01', 'N', 'test01')">자산</a>
						<a href="#nolink" class="gotolink" @click.prevent="test('03', 'Y', 'test03')">지출</a>
                        <a href="#nolink" class="gotolink" @click.prevent="testget('01')">연금/절세</a>
						<a href="#nolink" class="gotolink" @click.prevent="testget('03')">금융지식</a>
                        <a href="#nolink" class="gotolink" @click.prevent="testNoSee('D')">자산</a>
						<a href="#nolink" class="gotolink" @click.prevent="testNoSee('W')">지출</a>
                        <a href="#nolink" class="gotolink" @click.prevent="testNoSee('D', '123')">지출</a>
                        <a href="#nolink" class="gotolink" @click.prevent="testNoSeeget1('01')">연금/절세</a>
                        <a href="#nolink" class="gotolink" @click.prevent="testNoSeeget2('01')">연금/절세</a> -->
						<a href="#nolink" class="phishing" @click.prevent="fn_openPopup('ASTA4S18')"><em>보이스피싱 예방 10계명</em>확인하고 함께 예방해요</a>
					</div>

					<!--금융지식-->
					<div class="finlit">
                        <h2 class="h_tit01">금융지식</h2>
                        <a href="javascript:void(0);" class="btn_lots" @click.prevent="fn_movePage('COCT4001')"><span class="blind">더보기</span></a>

                        <div class="scroller">
                            <ul>
                                <li v-for="(item, idx) in financeKlList" :key="idx">
                                    <a href="javascript:void(0);" @click.prevent="fn_openFncKlDtl(item.cntzId)">
                                        <img :src="item.thmnlImgUrlnm" alt="" @error="emptyImg"/>
                                        <strong>{{item.cntzTinm}}</strong>
                                        <span class="hash" v-if="!!item.rcmKwrdCntn">#{{item.rcmKwrdCntn}}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <a href="javascript:void(0);" class="gotolink" @click="fn_openPopup('MAGU4S01')">
						NH콕마이데이터(자산관리)<br>
						큰글 서비스 이용안내
					</a>

					<!--상담센터-->
					<a href="tel:1600-2800" class="gotolink">
						HN콕뱅크 상담센터
						<span>1600-2800</span>
					</a>
                </section>
			</div>

            <footersV2 type="" mktBannerYN='Y' />
		</div>
</template>
<script>
import FootersV2 from '@/views/layout/FootersV2.vue'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import commonService from '@/service/commonService'
import modalService from '@/service/modalService'
import {dateFormat, dayDiff} from '@/utils/date'
import {mapActions, mapGetters} from 'vuex'
import _ from 'lodash'

import ASTA4S18 from '@/views/page/AS/TA/ASTA4S18/ASTA4S18'
import COCT4011 from '@/views/page/CO/CT/COCT4011/COCT4011'
import COAR4001 from '@/views/page/CO/AR/COAR4001/COAR4001'
import MAGU4S01 from '@/views/page/MA/GU/MAGU4S01/MAGU4S01'

export default {
    name : "MAMA4S01",
    data: () => {
        return {
            currYm        : dateFormat(new Date(), "YYYYMM"), //현재년월
            currMm        : dateFormat(new Date(), "M"), //현재월
            finalUpdateDtm  : '',       // 최근 자산 업데이트 시기

            selTab: 0, // 자산/지출 탭 선택 (자산:0, 지출:1)
            showAmtYn: true,   // 총 자산 show/hide 버튼 (default: show)
            showXpsYn: true,   // 총 지출 show/hide 버튼 (default: show)

            // ==== 자산관련 Start
            respInfo: null, // 자산정보
            totAsetAm: 0,   // 총자산금액

            //////// 연결자산 관련 데이터
            userAsetList    : [], // 개인신용정보전송요구내역
            /* 은행 */
            bankList        : [], // 은행업권 데이터
            bankExprList    : [], // 은행업권 만료 데이터
            /* 카드 */
            cardList        : [], // 카드업권 데이터
            cardExprList    : [], // 카드업권 만료 데이터
            /* 증권 */
            investList      : [], // 금융투자업권 데이터
            investExprList  : [], // 금융투자업권 만료 데이터
            /* 보험 */
            insuList        : [], // 보험업권 데이터
            insuExprList    : [], // 보험업권 만료 데이터
            ginsuList       : [], // 보증보험업권 데이터
            ginsuExprList   : [], // 보증보험업권 만료 데이터
            /* 페이 */
            efinList        : [], // 전자금융업권 데이터
            efinExprList    : [], // 전자금융업권 만료 데이터
            /* 할부금융 */
            capitalList     : [], // 할부금융업권 데이터
            capitalExprList : [], // 할부금융업권 만료 데이터
            /* 기타금융 */
            telecomList     : [], // 통신업권 데이터
            telecomExprList : [], // 통신업권 만료 데이터
            usuryList       : [], // 대부 정보 데이터
            usuryExprList   : [], // 대부 정보 만료 데이터
            bondList        : [], // 인수채권 정보 데이터
            bondExprList    : [], // 인수채권 정보 만료 데이터
            p2pList         : [], // P2P 대출정보 데이터
            p2pExprList     : [], // P2P 대출정보 만료 데이터
            publicList      : [], // Public 대출정보 데이터
            publicExprList  : [], // Public 대출정보 만료 데이터

            astIndSum       : 0,   // 자산증감합계
            // ==== 자산관련 End

            // ==== 지출관련 Start
            xpsInfo         : {}, // 지출 정보
            diffBfTotAm     : 0,  // 전월대비증감액
            // ==== 지출관련 End

            // ==== 금융지식 Start
            financeKlList   : [],
            // ==== 금융지식 End

            // 지출 연결자산 확인 Start
            codeNmList      : [   // 업권코드별 명칭 리스트
                {"codeVal":"bank", 		"codeNm":"은행"		},
				{"codeVal":"card", 		"codeNm":"카드"		},
				{"codeVal":"efin", 		"codeNm":"전자금융"	},
				{"codeVal":"telecom", 	"codeNm":"통신"		},
            ],
            assetConnCnt    : 0,    // 은행,카드,전자금융 건수합계
            userAsetList    : [],   // 개인신용정보전송요구내역
            /* 은행 */
            conBankList     : [],   // 은행업권 데이터
            conBankExprList : [],   // 은행업권 만료 데이터
            /* 카드 */
            conCardList     : [],   // 카드업권 데이터
            conCardExprList : [],   // 카드업권 만료 데이터
            /* 페이 */
            conEfinList     : [],   // 전자금융업권 데이터
            conEfinExprList : [],   // 전자금융업권 만료 데이터
            /* 통신 */
            conTelList      : [],   // 통신업권 데이터
            conTelExprList  : [],   // 통신업권 만료 데이터
        }
    },
    computed: {
        ...mapGetters('myassets', [
			'isMyAssetGathering','lastUpdateDtm'
		]),
        ...mapGetters('layout', [
			'isAlreadyOpenMainPage'
        ]),
    },
    watch: {
        isMyAssetGathering(value) {
            if(!value) this.fn_getMainData('2')
        }
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    components: { 
        FootersV2
    },
    mounted() {
        this.initComponent()
        this.listenSubscribe()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {  
        // test(a, b, c) {
        //     this.setInteRgnInfo(a, b, c)
        // },
        // testget(rgn) {
        //     console.log('>>>>> return >>>> ', this.getInteRgnInfo(rgn))
        // },
        // testNoSee(dateDsc, bnnrDsc="") {
        //     this.setNoSeeFloat(dateDsc, bnnrDsc)
        // },
        // testNoSeeget1() {
        //     console.log(this.getNoSeeFloat())
        // },
        // testNoSeeget2() {
        //     console.log(this.getNoSeeFloat('123'))
        // },
        ...mapActions('myassets', [
            'getAllMyAssetInfo',
            'getMyAssetInfo'
        ]),
        ...mapActions('layout', [
            'setMainFirstOpen',
            'setTobePage'
        ]),
        ...mapActions('user', [
            'setMyCreditInfo'   //신용정보(점수/등급) add. 2021.11.22
        ]),
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
            this.getData()

            //자산수집요청 최초 1회만 사용함 20210105
            if(!this.isAlreadyOpenMainPage){
                // console.log('자산수집요청!')

                this.fn_refreshApiCall()
                this.setMainFirstOpen(true)              
            } 
        },
        getData(mainFlag) {
            if(mainFlag === '' || mainFlag === undefined || mainFlag === null) {
                mainFlag = '1'
            }
            Promise.all([
                this.fn_getMainData(mainFlag), // 전체 메인 정보 조회
                this.fn_getXpsData(), // 지출 정보 조회
                this.getFinanceKlList(),    // 금융지식 조회
                this.getAssetConnData(),    // 자산연결데이터조회
            ])
        },
        // 자산수집 mutation 이벤트 감지 
        listenSubscribe() {
            this.subscribe = this.$store.subscribe((mutation, state) => {
                const isMyAssetGathering = mutation.type === 'myassets/completeMyAssetGatherData'
                // 예금 전체조회
                if (isMyAssetGathering) {
                    setTimeout(() => {
                        // this.fn_console('자산수집 after getData() ')
                        let mainFlag = '1'
                        this.getData(mainFlag)
                    }, 1000)
                }
            })
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
            })
        },
        fn_getMainData(mainFlag) {
            const config = {
                // url: '/ma/ma/01ra1', // 인터페이스ID: IF-MOB-PFM-MAA01, 서비스코드: PFMMAMA01RA1
                url: '/ma/ma/01r03',
                data: {
                    "mydtCusno" : this.getUserInfo('mydtCusno'),
                    "basYm" : this.currYm,
                    "mainFlag" : mainFlag
                },
                disableLoading : true,
            }
            apiService.call(config).then(response =>{
                console.log('PFM Main API response done')
                this.respInfo = response
                
                this.totAsetAm = Math.floor(this.respInfo?.myAssetInfo?.asetTotAm || 0)	//총자산금액

                // 자산 증감 계산 start ############################################################
                this.astIndSum = 0
                this.astIndSum = this.respInfo?.myAssetInfo?.indNtAsetTotAm || 0    // 증감순자산총금액
                // 자산 증감 계산 end ##############################################################

                this.getMyAssetInfo(this.respInfo) // 자산정보 store 저장
            })
        },
        fn_getXpsData() {
            // 지출 정보 조회
            const config = {
                url: '/lc/le/01r03',  // 'lc/ip/01r03',
                data: {
                    mydtCusno: this.getUserInfo('mydtCusno'), // 마이데이터고객번호
                    inqYm: dateFormat(new Date(), "YYYYMM"),
                },
                disableLoading : true,
            };

            apiService.call(config).then(response => {
                console.log('response', response)
                
                this.xpsInfo = response || {}

                // 전월지출금액 합산
                let bmmTotAm = 0
                bmmTotAm = this.xpsInfo?.bmmCardApvSam + this.xpsInfo?.bmmSchXpsSam + this.xpsInfo?.bmmPayMnySam + this.xpsInfo?.bmmPpayCdApvSam
                this.diffBfTotAm = this.xpsInfo?.xpsTotAmt - bmmTotAm
            })
        },

        /**
         * 금융지식 컨텐츠 조회
         */
        getFinanceKlList() {
            this.getFinanInfo('MAMA4001', 4, true).then(response => {
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
        emptyImg(e) {
			e.target.src = new URL("@/assets_v40/images/event/ev_noimg.png", import.meta.url).href
		},
        
        // 자산/지출 탭변경
        fn_clickTab(selTab) {
            this.selTab = selTab

            // const config1 = {
            //     url: 'https://www.nongup.net/rss/allArticle.xml',
            //     data: {}
            // };
            // if(selTab == 0) {
            //     apiService.callRSS(config1).then(response => {
            //         console.log("axios RSS response 농림축산 >>>>>>>>>>> ", response)
            //     })
            // } else {
            //     apiService.callRSSAjax(config1).then(response => {
            //         console.log("ajax RSS response 농림축산 >>>>>>>>>>> ", response)
            //     })
            // }
        },
        // 서브메인 화면이동
        fn_movePage(page, param) {
            let params = {}
            params = param

            const config = {
                name: page,
                params: params
            }
            commonService.movePage(config)
        },
        /**
         * 팝업 오픈
         */
        fn_openPopup(popId) {
            let popComp = null
            if(popId == 'ASTA4S18') popComp = ASTA4S18
            else if(popId == 'COAR4001') popComp = COAR4001
            else if(popId == 'MAGU4S01') popComp = MAGU4S01

            const config = {
                component: popComp
            }
            modalService.openPopup(config)
        }
    }
}
</script>