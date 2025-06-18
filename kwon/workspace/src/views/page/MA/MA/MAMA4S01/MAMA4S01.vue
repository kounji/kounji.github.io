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
							<li class="on" id="assetTab"><button type="button" role="tab" aria-selected="true">자산</button></li>
							<li id="xpsTab"><button type="button" role="tab" aria-selected="false">지출</button></li>
						</ul>

						<!--slick-->
						<div class="slick" ref="main">
                            <!--//늘은 경우 up, 줄은 경우 down class 추가-->
							<!-- <div class="details" :class="astIndSum > 0 ? 'up' : astIndSum === 0 ? '' : 'down'" v-show="selTab === 0"> -->
                            <div class="details">
								<h2>나의 총 자산</h2>

                                <div class="update">
                                    <template v-if="!isMyAssetGathering">
                                        <span>{{ lastUpdateDtm }}</span>
                                        <button type="button" class="btn_update" @click.prevent="fn_refreshApiCall()"><span class="blind">업데이트</span></button>
                                    </template>
                                    <span v-else class="ml5 num lsp0">자산 업데이트 중</span>
                                </div>

								<!-- <div class="toggle_money">
									<input type="checkbox" title="금액노출" name="" id="sum_view_01" v-model="hideAmtYn" @change="fn_setHidden('ASET', hideAmtYn)">
									<label for="sum_view_01" class="btns">
										<span class="hide">보기</span>
										<span class="show">숨김</span>
									</label>
									<div class="sum">
										<span class="hide"><em>금액숨김</em></span>
										<span class="show"><em>{{ totAsetAm | numberFilter }}</em>원</span>
									</div>
								</div> -->
                                <div class="toggle_money" :class="hideAmtYn ? 'on' : ''">
                                    <div class="sum">
                                        <span class="hide"><em>금액숨김</em></span>
                                        <span class="show"><em>{{ totAsetAm | numberFilter }}</em>원</span>
                                    </div>
                                    <button type="button" class="btns" @click="fn_setHidden('ASET', !hideAmtYn)">
                                        <span class="blind">금액</span>
                                        <span class="hide">보기</span>
                                        <span class="show">숨김</span>
                                    </button>
                                </div>
								
                                <div class="analysis">
                                    <p v-if="!hideAmtYn" class="latter" :class="astIndSum > 0 ? 'up' : astIndSum < 0 ? 'down' : ''">
                                        나의 총 자산이 
                                        <em>{{astIndSum > 0 ? '늘었어요.' : astIndSum < 0 ? '줄었어요.' : '동일해요.'}}</em>
                                    </p>
                                    <p v-else class="latter">나의 총 자산을 확인해 보세요.</p>

                                    <div class="custom_tooltip top">
										<div class="com_tooltip_type02">
											<a href="javascript:void(0);" class="com_btn_info" role="button">
												<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
											</a>
											<div class="com_ballon_type01 com_ballon_type02">
												<div>
													<ul class="dotted_list">
														<li>마지막 업데이트 시점의 총 자산과 마지막 업데이트 전 월 말일의 총자산을 비교했습니다.</li>
														<li>오늘 업데이트 하셨으면 전 월 말일 총 자산과 비교한 결과입니다.</li>
													</ul>
													<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
												</div>
											</div>
										</div>
									</div>
                                </div>
							</div>	

                            <div class="details">
                                <h2>{{currMm}}월 총 지출</h2>

                                <div class="update">
                                    <template v-if="!isMyAssetGathering">
                                        <span>{{ lastUpdateDtm }}</span>
                                        <button type="button" class="btn_update" @click.prevent="fn_refreshApiCall()"><span class="blind">업데이트</span></button>
                                    </template>
                                    <span v-else class="ml5 num lsp0">자산 업데이트 중</span>
                                </div>

                                <template v-if="xpsInfo.xpsTotAmt != 0 || (xpsInfo.xpsTotAmt == 0 && assetConnCnt != 0)">
                                    <!-- <div class="toggle_money">
                                        <input type="checkbox" title="금액노출" name="" id="sum_view_02" v-model="hideXpsYn" @change="fn_setHidden('XPS', hideXpsYn)">
                                        <label for="sum_view_02" class="btns">
                                            <span class="hide">보기</span>
                                            <span class="show">숨김</span>
                                        </label>
                                        <div class="sum">
                                            <span class="hide"><em>금액숨김</em></span>
                                            <span class="show"><em>{{xpsInfo.xpsTotAmt | numberFilter}}</em>원</span>
                                        </div>
                                    </div> -->
                                    <div class="toggle_money" :class="hideXpsYn ? 'on' : ''">
                                        <div class="sum">
                                            <span class="hide"><em>금액숨김</em></span>
                                            <span class="show"><em>{{ xpsInfo.xpsTotAmt | numberFilter }}</em>원</span>
                                        </div>
                                        <button type="button" class="btns" @click="fn_setHidden('XPS', !hideXpsYn)">
                                            <span class="blind">금액</span>
                                            <span class="hide">보기</span>
                                            <span class="show">숨김</span>
                                        </button>
                                    </div>

                                    <div class="analysis">
                                        <p v-if="!hideXpsYn" class="latter" :class="diffBfTotAm > 0 ? 'up' : diffBfTotAm < 0 ? 'down' : ''">
                                            나의 총 지출이 
                                            <em>{{diffBfTotAm > 0 ? '늘었어요.' : diffBfTotAm < 0 ? '줄었어요.' : '동일해요.'}}</em>
                                        </p>
                                        <p v-else class="latter">
                                            나의 총 지출을 확인해 보세요.
                                        </p>

                                        <div class="custom_tooltip top">
                                            <div class="com_tooltip_type02">
                                                <a href="javascript:void(0);" class="com_btn_info" role="button">
                                                    <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                                </a>
                                                <!-- 초기 탭 변경시 툴팁 노출 대응 -->
                                                <div class="com_ballon_type01 com_ballon_type02" style="display:none;">
                                                    <div>
                                                        <ul class="dotted_list">
                                                            <li>마지막 업데이트 시점의 총 지출과 마지막 업데이트  전 월 말일 총지출을 비교했습니다.</li>
                                                            <li>오늘 업데이트 하셨으면 전 월 말일 총 지출과 비교한 결과입니다.</li>
                                                        </ul>
                                                        <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
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
						<a href="javascript:void(0);" class="gotolink" @click.prevent="fn_movePage('ASTA4S01')">자산</a>
						<a href="javascript:void(0);" class="gotolink" @click.prevent="fn_movePage('LCTA4S01')">지출</a>
						<a href="javascript:void(0);" class="gotolink" @click.prevent="fn_movePage('PDTA4S01')">연금/절세</a>
						<a href="javascript:void(0);" class="credit" @click.prevent="fn_openPopup('ASCR4101')"><em>나의 신용점수 올리기</em>조회, 변동내역을 확인해 보세요</a>
						<a href="javascript:void(0);" class="phishing" @click.prevent="fn_openPopup('ASTA4S18')"><em>보이스피싱 예방 10계명</em>확인하고 함께 예방해요</a>
					</div>

                    <a href="javascript:void(0);" class="gotolink" @click="fn_openPopup('MAGU4S01')">
						NH콕마이데이터(자산관리)<br>
						큰글 서비스 이용안내
					</a>

					<!--상담센터-->
					<a href="tel:1600-2800" class="gotolink" title="전화앱 연결">
						NH콕뱅크 상담센터
						<span>1600-2800 (평일 09:00~18:00)</span>
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

import COAS4003 from '@/views/page/CO/AS/COAS4003/COAS4003'
import ASTA4S18 from '@/views/page/AS/TA/ASTA4S18/ASTA4S18'
import COCT4011 from '@/views/page/CO/CT/COCT4011/COCT4011'
import COAR4001 from '@/views/page/CO/AR/COAR4001/COAR4001'
import MAGU4S01 from '@/views/page/MA/GU/MAGU4S01/MAGU4S01'
import OXTP0001 from '@/views/page/OX/TP/OXTP0001/OXTP0001'
import OXTP0006 from '@/views/page/OX/TP/OXTP0006/OXTP0006'
import ASCR4101 from '@/views/page/AS/CR/ASCR4101/ASCR4101'

export default {
    name : "MAMA4S01",
    data: () => {
        return {
            currYm        : dateFormat(new Date(), "YYYYMM"), //현재년월
            currMm        : dateFormat(new Date(), "M"), //현재월
            finalUpdateDtm  : '',       // 최근 자산 업데이트 시기

            selTab: 0, // 자산/지출 탭 선택 (자산:0, 지출:1)
            hideAmtYn: true,   // 총 자산 show/hide 버튼 (default: show)
            hideXpsYn: true,   // 총 지출 show/hide 버튼 (default: show)

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

            editList        : [],       // 자산편집 목록
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
            nacfAccList     : [],   // v4 농.축협 계좌 리스트
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

            screen          : '',   // 콕뱅/스뱅에서 넘어온 화면ID
            eventOxInfo     : {},   // OX퀴즈조회정보
        }
    },
    computed: {
        ...mapGetters('myassets', [
			'isMyAssetGathering','lastUpdateDtm','myAssetInfo'
		]),
        ...mapGetters('layout', [
			'isAlreadyOpenMainPage'
        ]),
        ...mapGetters('user', [
            'userInfo'
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

        // this.screen = this.userInfo.screen
        // /**
        //  * OXTP0001 OX퀴즈
        //  * COCO1104 새소식
        //  * COCO4116 자주하는질문
        //  * MAGU4S01 큰글서비스소개
        //  */
        // if(this.screen == 'OXTP0001' || 
        //    this.screen == 'COCO1104' || 
        //    this.screen == 'COCO4116' || 
        //    this.screen == 'MAGU4S01') {
        //     if(this.screen == 'OXTP0001') {
        //         this.getEventOXInfo()
        //     } else {
        //         let component = ''
        //         switch(this.screen) {
        //             case 'COCO1104':
        //                 component = COCO1104
        //                 break
        //             case 'COCO4116':
        //                 component = COCO4116
        //                 break
        //             case 'MAGU4S01':
        //                 component = MAGU4S01
        //                 break
        //             default:
        //                 return
        //         }

        //         const config = {
        //             component: component,
        //             params: {}
        //         }
        //         modalService.openPopup(config)
        //     }
        // }
        // delete this.userInfo.screen

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {  
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
                this.getAllMyAssetInfo().then(() => {

                    this.$nextTick(() => {
                        this.slick()
                    })
                })

            }
        }, 
        initComponent() {
            let amtHdnList = this.getSecretAmInfo() || []
            this.hideAmtYn = amtHdnList.includes('ASET')
            this.hideXpsYn = amtHdnList.includes('XPS')

            this.getData()

            //자산수집요청 최초 1회만 사용함 20210105
            if(!this.isAlreadyOpenMainPage){
                // console.log('자산수집요청!')

                //this.fn_refreshApiCall() // v4 자동으로 자산수집 제외
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
                // this.getFinanceKlList(),    // 금융지식 조회
                this.getAssetConnData(),    // 자산연결데이터조회
                this.fn_COAS4003(),         // 선택약관 동의정보조회
            ])

            this.$nextTick(() => {
                this.slick()
            })
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
         * 선택약관 동의정보조회
         */
        fn_COAS4003(){
            // 약관대상구분코드 값 세팅 (1:비조합원, 2:조합원)
            let stltObjDsc = this.getUserInfo('macoYn') === "1" ? "2" : "1"
            
            let stltArray = []     // 전체 약관 목록
            let optlStltArray = [] // 동의해야할 선택 약관 목록

            const config = {
                url: '/co/as/02ra1',
                data: {
                    mydtCusno   : this.getUserInfo("mydtCusno"),    // 마이데이터고객번호
                    cusTpc      : "1",                              // 고객구분코드(TOBE는 서비스 가입 후 선택약관 재동의)
                    stltObjDsc  : stltObjDsc,                       // 약관대상구분코드 (1:비조합원, 2:조합원)
                }
            }
            
            apiService.call(config).then(response => {
            
              stltArray    = response.stltList || []    // 약관리스트
              
              for(var k = 0; k < stltArray.length; k++) {
              	if(stltArray[k].essYn === "0") {
	                 optlStltArray.push(stltArray[k])
	              }
              }

              if(optlStltArray.length > 0) {
                const compName = COAS4003

                const config = {
                    component: compName
                }

                modalService.openPopup(config).then((response) => {
                  
                })
              }
            })
              
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
            const config_con = {
                url : '/co/am/08r05', // /co/am/08r02
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
                this.conBankCnt      += tmpBankList.length
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

                /*은행, 카드, 전자금융 업권의 자산연결 건수 > 0 지출 데이터 조회*/
                this.assetConnCnt += this.conBankCnt + this.conCardCnt + this.conEfinCnt
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
                
                this.totAsetAm = Math.floor(this.respInfo?.totAsetAm || 0)	//총자산금액

                // 자산 증감 계산 start ############################################################
                this.indDbtTotAm        = this.respInfo?.myAssetInfo?.indDbtTotAm        || 0 // 부채 증감액
                this.indAsetFnAcAmSum   = this.respInfo?.myAssetInfo?.indAsetFnAcAmSum   || 0 // 증감금융자산금액
                this.indAsetRlthRlestAm = this.respInfo?.myAssetInfo?.indAsetRlthRlestAm || 0 // 증감실물자산부동산금액
                this.indAetRlthCarAm    = this.respInfo?.myAssetInfo?.indAetRlthCarAm    || 0 // 증감실물자산자동차금액
                this.indAsetEtcAmSum    = this.respInfo?.myAssetInfo?.indAsetEtcAmSum    || 0 // 증감기타자산금액합계

                this.indAsetFnAcSum     = this.respInfo?.myAssetInfo?.indAsetFnAcSum     || 0 // 증감금융자산금액

                this.astIndSum = 0
                this.astIndSum += this.indAsetFnAcSum
                this.editList = this.respInfo?.assetAmnIOList || [] // 자산편집 정보(부채:01, 현금:02, 부동산:03, 자동차:04, 금:05, 기타:06)
                let dbt = this.editList.find(el => el.asetAmnDsc === '01' && el.totYn === '1') //부채
                if (dbt) this.astIndSum -= this.indDbtTotAm
                let rlest = this.editList.find(el => el.asetAmnDsc === '03' && el.totYn === '1') //부동산
                if (rlest) this.astIndSum += this.indAsetRlthRlestAm
                let car = this.editList.find(el => el.asetAmnDsc === '04' && el.totYn === '1') //자동차
                if (car) this.astIndSum += this.indAetRlthCarAm
                let etc = this.editList.filter(el =>  ['02','05','06'].includes(el.asetAmnDsc) && el.totYn === '1') //자동차
                if (etc.length > 2) this.astIndSum += this.indAsetEtcAmSum   // 증감순자산총금액
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
            else if(popId == 'ASCR4101') popComp = ASCR4101
            else if(popId == 'COAR4001') popComp = COAR4001
            else if(popId == 'MAGU4S01') popComp = MAGU4S01

            const config = {
                component: popComp
            }
            modalService.openPopup(config).then(response => {
                if(popComp == COAR4001 && (response === 'move' || response === true)) {
                    this.getData()
                }
            })
        },
        /**
         * 금액숨김처리 스토리지 저장
         */
        fn_setHidden(flag, type) {
            if(flag == 'ASET') {
                this.hideAmtYn = type
            } else if(flag == 'XPS') {
                this.hideXpsYn = type
            }
			this.setSecretAmInfo(flag, type)
		},
        /**
         * OX퀴즈 정보조회
         */
        getEventOXInfo(){
            const config = {
                url: '/mr/ev/19r01', 
                data: {
                    "bltnDt" : dateFormat(new Date(), 'YYYYMMDD'),
                },
                disableLoading : true,
            }
            apiService.call(config).then(response =>{
                console.log('response : ', response)
                this.eventOxInfo = response

                const config2 = {
                    url: '/mr/ev/17r01', 
                    data: {
                        "mydtCusno" : this.getUserInfo("mydtCusno"),
                        "bltnDt"    : dateFormat(new Date(), 'YYYYMMDD'),
                    },
                    // disableLoading : true,
                }
                apiService.call(config2).then(response =>{
                    console.log('response : ', response)
                    //오늘퀴즈참여여부
                    this.eventOxInfo.quizPrgYn = response.quizPrgYn

                    if(!this.eventOxInfo.bltnDt){
                        modalService.alert("OX퀴즈를 준비하고 있어요.")
                    }else{
                        let component = ''
                        if(this.eventOxInfo.quizPrgYn === '1'){
                            component = OXTP0006
                        }else{
                            component = OXTP0001
                        }

                        const config = {
                            component: component,
                            params: this.eventOxInfo
                        }
                        modalService.openPopup(config)
                    }                    
                })
            })
        }, 
        slick(){
            if($('.slick').not('.slick-initialized').length != 0) {
                $('.slick').each(function(){
                    var $outline =  $(".outline .slick");
                                
                    $outline.slick({
                        fade:true,
                        infinite: false,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        adaptiveHeight: true,
                        speed: 300,
                        arrows:false,
                        dots:true
                    });

                    $(".outline .slick-dots li button").on('click', function(e){
                        e.stopPropagation(); // use this
                    });

                    $(".outline .inner_tab li").each(function(idx){
                        $("button", $(this)).click(function(){
                            $outline.slick('slickGoTo', idx);
                        });
                    })

                    $outline.on('afterChange', function(event, slick, currentSlide){
                        if(currentSlide == 0) {
                            document.querySelector('#assetTab').click()
                        } else {
                            document.querySelector('#xpsTab').click()
                        }
                    })

                    $('.toggle_money input').on('change input', function() {
                        $outline.slick('setPosition')
                    })
                })
            }
        }
    }
}
</script>