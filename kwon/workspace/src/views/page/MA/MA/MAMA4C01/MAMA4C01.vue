<!--
/*************************************************************************
* @ 서비스경로 : PFM메인 > 메인 (청소년 모드)
* @ 페이지설명 : 메인 (청소년 모드)
* @ 파일명     : src/views/page/MA/MA/MAMA4C01/MAMA4C01.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-02-14
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-14              CS541597              최초작성
***************************************************************************/
-->
<template>
    <div class="content-view">
        <div id="content">
            <section class="main_youth">
                <div class="top_area">
                    <button type="button" class="btns" @click.prevent="fn_changeMode()">청소년</button>
                    <div class="update">
                        <template v-if="!isMyAssetGathering">
                            <span>{{ lastUpdateDtm }}</span>
                            <button type="button" class="btn_update" @click.prevent="fn_refreshApiCall()"><span class="blind">업데이트</span></button>
                        </template>
                        <span v-else class="ml5 num lsp0">자산 업데이트 중</span>
                    </div>
                </div>

                <!--개요-->
                <div class="outline">
                    <ul>
                        <li class="asset">
                            <strong class="tit">나의 자산</strong>
                            <div class="sum">
                                <em>{{ totAsetAm | numberFilter }}</em><span>원</span>
                            </div>
                            <div class="tooltip">
                                <span class="txt" v-if="astIndSum != 0">
                                    지난달보다<br>
                                    <em>{{astIndSum > 0 ? '늘었어요.' : '줄었어요.'}}</em>
                                </span>
                                <span class="txt" v-else>
                                    지난달과<br>
                                    <em>동일해요.</em>
                                </span>
                                <div class="custom_tooltip">
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
                        </li>
                        <li class="wallet" :class="!(xpsInfo.xpsTotAmt != 0 || (xpsInfo.xpsTotAmt == 0 && assetConnCnt != 0)) ? 'nodata' : ''">
                            <template v-if="xpsInfo.xpsTotAmt != 0 || (xpsInfo.xpsTotAmt == 0 && assetConnCnt != 0)">
                                <strong class="tit">나의 지출</strong>
                                <div class="sum">
                                    <em>{{ xpsInfo.xpsTotAmt | numberFilter }}</em><span>원</span>
                                </div>
                                <div class="tooltip">
                                    <span class="txt" v-if="diffBfTotAm != 0">
                                        지난달보다<br>
                                        <em>{{diffBfTotAm > 0 ? '더 쓰고있어요.' : '덜쓰고있어요.'}}</em>
                                    </span>
                                    <span class="txt" v-else>
                                        지난달과<br>
                                        <em>동일해요.</em>
                                    </span>
                                    <div class="custom_tooltip">
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
                                <strong class="tit">나의 지출을<br>확인해 보세요</strong>
                                <button type="button" class="btns">연결</button>
                            </template>
                        </li>
                    </ul>
                </div>

                <!-- CASE 미연결 -->
                <!-- <div class="outline">
                    <ul>
                        <li class="asset nodata">
                            <strong class="tit">나의 자산을<br>확인해 보세요</strong>
                            <button type="button" class="btns">연결</button>
                        </li>
                        <li class="wallet nodata">
                            <strong class="tit">나의 지출을<br>확인해 보세요</strong>
                            <button type="button" class="btns">연결</button>
                        </li>
                    </ul>
                </div> -->

                <!-- [주요서비스] -->
                <div class="move_banner">
                    <a href="#nolink" class="board_box rect connect">
                        <em>자산연결</em>
                        자산과 지출 연결을 한번에!
                    </a>

                    <a href="#nolink" class="board_box rect fin">
                        <em>금융지식</em>
                        꼭 필요한 금융지식 콘텐츠
                    </a>
                    
                    <a href="#nolink" class="board_box rect youth">
                        <em>청소년 NH콕마이데이터</em>
                        용돈관리부터 소비습관까지!
                    </a>
                </div>
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
    import appService from '@/service/appService'
    import commonService from '@/service/commonService'
    import modalService from '@/service/modalService'
    import routerService from '@/service/routerService'
    import {dateFormat} from '@/utils/date'
    import {mapActions, mapGetters} from 'vuex'
    import _ from 'lodash'

    import COCO4051 from '@/views/page/CO/CO/COCO4051/COCO4051'

    export default {
        name : "MAMA4C01",
        data: () => {
            return {
                currYm        : dateFormat(new Date(), "YYYYMM"), //현재년월
                currMm        : dateFormat(new Date(), "M"), //현재월

                // ==== 자산관련 Start
                respInfo: null, // 자산정보
                totAsetAm: 0,   // 총자산금액

                astIndSum       : 0,   // 자산증감합계
                // ==== 자산관련 End

                // ==== 지출관련 Start
                xpsInfo         : {}, // 지출 정보
                diffBfTotAm     : 0,  // 전월대비증감액
                // ==== 지출관련 End

                // 지출 연결자산 확인 Start
                codeNmList      : [  // 업권코드별 명칭 리스트
                    {"codeVal":"bank", 		"codeNm":"은행"		},
                    {"codeVal":"card", 		"codeNm":"카드"		},
                    {"codeVal":"efin", 		"codeNm":"전자금융"	},
                ],
                assetConnCnt    : 0,   // 은행,카드,전자금융 건수합계
                userAsetList    : [],  // 개인신용정보전송요구내역
                /* 은행 */
                conBankList     : [],   // 은행업권 데이터
                conBankExprList : [],   // 은행업권 만료 데이터
                conBankCnt      : 0,    // 은행업권 건수
                /* 카드 */
                conCardList     : [],   // 카드업권 데이터
                conCardExprList : [],   // 카드업권 만료 데이터
                conCardCnt      : 0,    // 카드업권 건수
                /* 페이 */
                conEfinList     : [],   // 전자금융업권 데이터
                conEfinExprList : [],   // 전자금융업권 만료 데이터
                conEfinCnt      : 0,    // 전자금융업권 건수
            }
        },
        computed: {
            ...mapGetters('myassets', [
                'isMyAssetGathering','lastUpdateDtm'
            ]),
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        components: { 
            FootersV2,
        },
        mounted() {
            this.initComponent()

            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        methods: {
            ...mapActions('myassets', [
                'getAllMyAssetInfo',
                'getMyAssetInfo'
            ]),
            initComponent() {
                this.getData()
            },
            getData(mainFlag) {
                if(mainFlag === '' || mainFlag === undefined || mainFlag === null) {
                    mainFlag = '1'
                }
                Promise.all([
                    this.fn_getMainData(mainFlag), // 전체 메인 정보 조회
                    this.fn_getXpsData(), // 지출 정보 조회
                    this.getAssetConnData(),    // 자산연결데이터조회
                ])
            },
            fn_getMainData(mainFlag) {
                const config = {
                    // url: '/ma/ma/01ra1', // 인터페이스ID: IF-MOB-PFM-MAA01, 서비스코드: PFMMAMA01RA1
                    url: '/ma/ma/01r02',
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

                    this.rcnInqDtm             = this.respInfo.rcnInqDtm || ''    //최근조회일시
                    
                    this.totAsetAm             = Math.floor(this.respInfo?.totAsetAm || 0)	//총자산금액

                    // 자산 증감 계산 start ############################################################
                    this.indAsetFnAcSum = this.respInfo?.myAssetInfo?.indAsetFnAcSum || 0 // 증감금융자산금액
                    
                    this.astIndSum = 0
                    this.astIndSum += this.indAsetFnAcSum
                    // 자산 증감 계산 end ##############################################################
                })
            },
            fn_getXpsData() {
                // 지출 정보 조회
                const config = {
                    url: '/lc/le/01r03',  // 'lc/ip/01r03',
                    data: {
                        mydtCusno: this.getUserInfo('mydtCusno'), // 마이데이터고객번호
                        inqYm : dateFormat(new Date(), "YYYYMM") // 기준일자
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

                    /*은행, 카드, 전자금융 업권의 자산연결 건수 > 0 지출 데이터 조회*/
                    this.assetConnCnt = this.conBankCnt + this.conCardCnt + this.conEfinCnt
                })
            },
            /**
             * 서브메인 화면이동
             */
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
             * 모드변경 팝업 호출
             */
            fn_changeMode() {
                const config = {
                    component: COCO4051
                }
                modalService.openPopup(config).then(() => {

                })
            }
        }
    }
</script>