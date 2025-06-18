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
                        <!-- <template v-if="!isMyAssetGathering">
                            <span>{{ lastUpdateDtm }}</span>
                            <button type="button" class="btn_update" @click.prevent="fn_refreshApiCall()"><span class="blind">업데이트</span></button>
                        </template>
                        <span v-else class="ml5 num lsp0">자산 업데이트 중</span> -->
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
                            <button type="button" class="btns" @click.prevent="fn_openPopup('ASTA4C02')">보기</button>
                        </li>
                        <li class="wallet" :class="!(xpsInfo.xpsTotAmt != 0 || (xpsInfo.xpsTotAmt == 0 && assetConnCnt != 0)) ? 'nodata' : ''">
                            <template v-if="xpsInfo.xpsTotAmt != 0 || (xpsInfo.xpsTotAmt == 0 && assetConnCnt != 0)">
                                <strong class="tit" @click.prevent="fn_movePage('LCTA4C01')">나의 지출</strong>
                                <div class="sum" @click.prevent="fn_movePage('LCTA4C01')">
                                    <em>{{ xpsInfo.xpsTotAmt | numberFilter }}</em><span>원</span>
                                </div>
                                <div class="tooltip">
                                    <span class="txt" v-if="diffBfTotAm != 0">
                                        지난달보다<br>
                                        <em>{{diffBfTotAm > 0 ? '더 쓰고있어요.' : '덜쓰고 있어요.'}}</em>
                                    </span>
                                    <span class="txt" v-else>
                                        지난달과<br>
                                        <em>동일해요.</em>
                                    </span>
                                    <div class="custom_tooltip">
                                        <div class="com_tooltip_type02">
                                            <a href="javascript:void(0);" class="com_btn_info" role="button">
                                                <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                            </a>
                                            <div class="com_ballon_type01 com_ballon_type02">
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
                                <button type="button" class="btns" @click.prevent="fn_openPopup('LCTA4C02')">보기</button>
                            </template>
                            <template v-else>
                                <strong class="tit">나의 지출을<br>확인해 보세요</strong>
                                <button type="button" class="btns" @click="fn_openPopup('COAR4C01')">연결</button>
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
                    <!-- <a href="javascript:void(0);" class="board_box rect account" @click.prevent="showSample('ASTA4C01')">
                        <em>계좌, 페이</em>
                        내 자산 상세 정보 확인해 보세요.
                    </a> -->

                    <a href="javascript:void(0);" class="board_box rect connect" @click.prevent="fn_openPopup('COAR4C01')">
                        <em>자산연결</em>
                        자산과 지출 연결을 한번에!
                    </a>
                    
                    <!-- <a href="javascript:void(0);" class="board_box rect youth" @click.prevent="fn_openUserGuide">
                        <em>청소년 NH콕마이데이터</em>
                        용돈관리부터 소비습관까지!
                    </a> -->
                </div>

                <div class="local_sheet">
                    <div class="sheet">
                        <div>
                            <a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('RGFT4001')">
                                <dl class="item01">
                                    <dt>
                                        <span>NH지역정보</span>
                                        <strong>우리동네에는 어떤 축제가<br>열리고 있을까요?</strong>
                                    </dt>
                                    <dd>
                                        <p class="txt">지역별 축제를 확인해보세요.</p>
                                    </dd>
                                    <dd>
                                        <span class="link">지역축제</span>
                                    </dd>
                                </dl>
                            </a>
                        </div>
                        <div>
                            <a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('RGBM4001')">
                                <dl class="item02">
                                    <dt>
                                        <span>NH지역정보</span>
                                        <strong>가까운 자전거길부터<br>천천히 도전해봐요.</strong>
                                    </dt>
                                    <dd>
                                        <p class="txt">강과 산을 따라 달리는<br>자전거길을 확인해보세요.</p>
                                    </dd>
                                    <dd>
                                        <span class="link">자전거길 국토종주</span>
                                    </dd>
                                </dl>
                            </a>
                        </div>
                        <div>
                            <a href="javascript:void(0);" role="button" @click.prevent="fn_movePage('RGDM4001')">
                                <dl class="item03">
                                    <dt>
                                        <span>NH지역정보</span>
                                        <strong>몸과 마음을 쉬게하는<br>전국 둘레길</strong>
                                    </dt>
                                    <dd>
                                        <p class="txt">최고의 여행길,<br>전국 둘레길을 확인해보세요.</p>
                                    </dd>
                                    <dd>
                                        <span class="link">전국 둘레길</span>
                                    </dd>
                                </dl>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- [금융지식] -->
                <div class="fin_sheet">
                    <a href="javascript:void(0);" class="board_box menu_fin" role="button" @click.prevent="fn_movePage('COCT4001')">
                        <div class="box_tit">
                            <span>금융지식</span>
                            <strong>몰라도 괜찮아.<br>지금부터 배워가면 되니까!</strong>
                            <p>청소년을 위한 쉽고 재미있는 금융지식</p>
                        </div>
                        <div class="btns md"><span class="icon_line_right">금융지식 바로가기</span></div>
                    </a>
                    <!-- [OX퀴즈] -->
                    <a href="javascript:void(0);" class="board_box menu_ox" role="button" @click.prevent="getEventOXJoin">
                        <div class="box_tit">
                            <span>OX퀴즈</span>
                            <strong>누구나 참여할 수 있는<br>OX퀴즈!</strong>
                            <p>일상 속 금융지식을 쉽고 재미있게 풀어보세요.</p>
                        </div>
                        <div class="btns md"><span class="icon_line_right">OX퀴즈 도전하기</span></div>
                    </a>
                </div>

                <details class="ico_detail_noti" open=""> <!--[v4.0] 2025-04-04 알아두세요 추가 -->
                    <summary><strong>알아두세요</strong></summary>
                    <div class="cont">
                        <ul class="dotted_list">
                            <li>NH콕마이데이터(자산관리)의 청소년모드는 2025년 하반기 금융보안원 및 신용정보원의 가이드 확정 이후 제공될 예정입니다.</li>
                            <li>현재 청소년모드는 부모님을 위한 청소년모드 미리보기 서비스이며 청소년은 가입 및 이용이 불가능합니다.</li>
                            <li>청소년모드의 자산은 입출금, 예금, 적금, 페이, 포인트를 확인할 수 있으므로, 만18세 이상인 고객은 일반모드와 청소년모드에서 보이는 총자산이 다르게 보일 수 있습니다.</li>
                        </ul>
                    </div>
                </details>
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
    import {dateFormat, dayDiff} from '@/utils/date'
    import {mapActions, mapGetters} from 'vuex'
    import {defineAsyncComponent} from 'vue'
    import _ from 'lodash'

    import COAR4002 from '@/views/page/CO/AR/COAR4002/COAR4002'
    import COCO4051 from '@/views/page/CO/CO/COCO4051/COCO4051'
    import MAGU4C01 from '@/views/page/MA/GU/MAGU4C01/MAGU4C01'
    import COCO1104 from '@/views/page/CO/CO/COCO1104/COCO1104'
    import COCO4116 from '@/views/page/CO/CO/COCO4116/COCO4116'

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
                nacfAccList     : [],   // v4 농.축협 계좌 리스트
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

                screen          : '',   // 콕뱅/스뱅에서 넘어온 화면ID

                eventOxInfo : {},
            }
        },
        computed: {
            ...mapGetters('myassets', [
                'isMyAssetGathering','lastUpdateDtm'
            ]),
            ...mapGetters('user', [
                'userInfo'
            ]),
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        components: { 
            FootersV2,
        },
        watch: {
            isMyAssetGathering(value) {
                if(!value) this.fn_getMainData('2')
            }
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

                this.$nextTick(()=>{
                    this.fn_localInfoSlick()
                })
            },
            getData(mainFlag) {
                if(mainFlag === '' || mainFlag === undefined || mainFlag === null) {
                    mainFlag = '1'
                }
                Promise.all([
                    this.fn_getMainData(mainFlag), // 전체 메인 정보 조회
                    this.fn_getXpsData(), // 지출 정보 조회
                    this.getAssetConnData(),    // 자산연결데이터조회
                    this.getEventOXInfo(),  // OX퀴즈정보조회
                ])
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

                    this.rcnInqDtm             = this.respInfo.rcnInqDtm || ''    //최근조회일시
                    
                    // this.totAsetAm             = Math.floor(this.respInfo?.totAsetAm || 0)	//총자산금액
                    
                    // 청소년
                    // ** 청소년 : 예금 총 금액 + 페이/포인트 총 금액
                    this.bfNtAsetTotAm			= this.bfAsetFnAcAmSum + this.bfAsetFnPayPntAmSum	// 이전순자산
                    this.indAsetTotAm			= this.indAsetFnAcAmSum + this.indAsetFnPayPntAmSum	// 증감순자산
                    let asetFnAcAmSum       = this.respInfo?.myAssetInfo?.asetFnAcAmSum || 0
                    let asetFnPayPntAmSum   = this.respInfo?.myAssetInfo?.asetFnPayPntAmSum || 0
                    let indAsetFnAcAmSum    = this.respInfo?.myAssetInfo?.indAsetFnAcAmSum || 0
                    let indAsetFnPayPntAmSum= this.respInfo?.myAssetInfo?.indAsetFnPayPntAmSum || 0

                    this.totAsetAm          = asetFnAcAmSum + asetFnPayPntAmSum
                    this.astIndSum          = indAsetFnAcAmSum + indAsetFnPayPntAmSum

                    // 자산 증감 계산 start ############################################################
                    // this.indAsetFnAcSum = this.respInfo?.myAssetInfo?.indAsetFnAcSum || 0 // 증감금융자산금액
                    
                    // this.astIndSum = 0
                    // this.astIndSum += this.indAsetFnAcSum
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

                    /*은행, 카드, 전자금융 업권의 자산연결 건수 > 0 지출 데이터 조회*/
                    this.assetConnCnt += this.conBankCnt + this.conCardCnt + this.conEfinCnt
                })
            },
            /**
             * 지역정보 slick
             */
            fn_localInfoSlick() {
                var $local = $('.local_sheet')
                $local.each(function(){
                    let $this = $(this)

                    $('.sheet', $this).slick({
                        infinite: true,
                        speed: 300,
                        arrows: false,
                        dots: true,
                        centerPadding: '40px',
                    })
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
             * 서비스 가이드 팝업오픈
             */
            fn_openUserGuide() {
                const config = {
                    component: MAGU4C01
                }
                modalService.openPopup(config)
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
            },
            /**
             * 자산연결 팝업 호출
             */
            startAsetConn() {
                const config = {
                    component: COAR4002,
                    params: {
                        "orgDsc": "all"
                    }
                }
                modalService.openPopup(config).then(response => {
                    if(response === 'move' || response === true) {
                        this.getData()
                    }
                })
            },
            /**
             * 자산연결 업권선택 팝업 호출
             */
            openAsetConn(orgDsc) {
                let asetParam = {}

                if(!this.isNull(orgDsc)) {
                    asetParam = {
                        isExternal: true,
                        orgDsc: orgDsc
                    }
                }

                const config = {
                    component: COAR4002,
                    params: asetParam
                }
                modalService.openPopup(config).then(response => {
                    if(response === 'move' || response === true) {
                        this.getData()
                    }
                })
            },
            /**
             * 팝업호출
             */
            fn_openPopup(pageId, param) {
                let compName = ''
                if(pageId === 'OXTP0001') {
                    compName = defineAsyncComponent(() => import('@/views/page/OX/TP/OXTP0001/OXTP0001.vue'))
                } else if(pageId === 'OXTP0006'){
                    compName = defineAsyncComponent(() => import('@/views/page/OX/TP/OXTP0006/OXTP0006.vue'))
                } else if(pageId === 'ASTA4C02') {
                    compName = defineAsyncComponent(() => import('@/views/page/AS/TA/ASTA4C02/ASTA4C02.vue'))
                } else if(pageId === 'LCTA4C02') {
                    compName = defineAsyncComponent(() => import('@/views/page/LC/TA/LCTA4C02/LCTA4C02.vue'))
                } else if(pageId === 'COAR4C01') {
                    compName = defineAsyncComponent(() => import('@/views/page/CO/AR/COAR4C01/COAR4C01.vue'))
                }

                const config = {
					component: compName,
                    params: param,
                }
                modalService.openPopup(config).then(() => {
                    if(pageId === 'OXTP0001' && response === 'ok'){
                        this.eventOxInfo.quizPrgYn = '1'    //참여
                        this.fn_openPopup('OXTP0006', this.eventOxInfo)   //도전현황
                    }
                })
            },

            //ox퀴즈 정보 조회
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
                            "bltnDt" : dateFormat(new Date(), 'YYYYMMDD'),
                        },
                        // disableLoading : true,
                    }
                    apiService.call(config2).then(response =>{
                        console.log('response : ', response)
                        //오늘퀴즈참여여부
                        this.eventOxInfo.quizPrgYn = response.quizPrgYn
                    })
                })
            },
            //ox퀴즈 참여여부 조회
            getEventOXJoin(){
                if(!this.eventOxInfo.bltnDt){
                    modalService.alert("OX퀴즈를 준비하고 있어요.")
                }else{
                    if(this.eventOxInfo.quizPrgYn === '1'){
                        this.fn_openPopup('OXTP0006', this.eventOxInfo)   //도전현황
                    }else{
                        this.fn_openPopup('OXTP0001', this.eventOxInfo)   //ox문제
                    } 
                }
            },
        }
    }
</script>