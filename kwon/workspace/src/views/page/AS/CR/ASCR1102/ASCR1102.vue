<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 금융건강도 > 신용정보
* @ 페이지설명 : 나의자산 > 금융건강도 > 신용정보 조회내역
* @ 파일명     : src/views/page/AS/CR/ASCR1102/ASCR1102.vue
* @ 작성자     : CS516033
* @ 작성일     : 2021-06-23
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-23              CS516033              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup">
        <div class="popup_header">
            <h1>신용정보</h1>
            <a href="javascript:void(0);" class="btn_back"  @click.prevent="fn_moveBack()" ><span class="blind">이전화면</span></a>
            <a href="javascript:void(0);" class="btn_close" @click.prevent="closeAll(true)"><span class="blind">화면닫기</span></a>
        </div>
        <div class="com_tabmenu_type01 menunum02">
            <ul role="tablist">
                <li :class="tabPgflag === '1' ? 'on' : ''"><a href="javascript:void(0);" role="tab" :aria-selected="tabPgflag === '1' ? 'true' : 'false'"  @click.prevent="fn_setTabPgflag('1')">조회내역</a></li>
                <li :class="tabPgflag === '2' ? 'on' : ''"><a href="javascript:void(0);" role="tab" :aria-selected="tabPgflag === '2' ? 'true' : 'false'"  @click.prevent="fn_setTabPgflag('2')">변동내역</a></li>
            </ul>
        </div>
        <div class="popup_content com_no_bottom com_sub_type02 com_bg_type00">
            <div class="com_submainbox_type01 m0 com_line_type01" :class="tabPgflag === '1' ? 'com_submainbox_type01-04 ui-as-cr-02' : 'com_submainbox_type01-05 ui-as-cr-03'">
                <div class="toptitle">
                    <div class="right time">
                        <span>{{selectedYm | dateFilter('YYYY.MM.DD HH:mm')}}</span>
                        <button class="refresh inline_refresh" @click.prevent="initComponent">
                            <span class="blind">새로고침</span>
                        </button>
                    </div>
                </div>
                <div class="com_box_type01" v-show="tabPgflag == '2' && varHis.length >= 2">
                    <div class="linemix_chart_wrap">
                        <div class="chart_title_underbar">
                            신용점수
                        </div>
                        <!-- 차트가 삽입될 DIV -->
                        <div id="chartHolderASCR02" aria-hidden="true"></div>
                    </div>
                </div>
                <div class="linkbox_wrap type03">
                    <div class="box">
                        <div class="tt_wrap">
                            <p class="tt_top">{{tabPgflag == '1' ? '최근 1년 내' : '일반정보 변동'}}</p>
                            <div class="tt">
                                <b>{{tabPgflag == '1' ? ryr1CrinfInqCn : ryr1GenCrinfVarCn}}</b>건
                            </div>
                        </div>
                        <div class="bar"></div>
                        <div class="tt_wrap">
                            <p class="tt_top">{{tabPgflag == '1' ? '1년 ~ 3년 내' : '연체정보 변동'}}</p>
                            <div class="tt">
                                <b>{{tabPgflag == '1' ? rcnYr3CrinfInqCn : ryr1OvdCrinfVarCn}}</b>건
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="com_inner pt30">
                <div class="com_tabmenu_type03">
                    <ul role="tablist">
                        <li aria-controls="tab_01" :class="tabPgLiflag === '1' ? 'on' : ''">
                            <a href="javascript:void(0);" role="tab" :aria-selected="tabPgLiflag === '1' ? 'true' : 'false'" 
                                @click.prevent="fn_setTabLiflag('1')"><span>{{tabPgflag == '1' ? '1년 이내' : '일반정보 변동'}}</span></a>
                        </li>
                        <li aria-controls="tab_02" :class="tabPgLiflag === '2' ? 'on' : ''">
                            <a href="javascript:void(0);" role="tab" :aria-selected="tabPgLiflag === '2' ? 'true' : 'false'" 
                                @click.prevent="fn_setTabLiflag('2')"><span>{{tabPgflag == '1' ? '1년 ~ 3년 내' : '연체정보 변동'}}</span></a>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 조회내역 컨텐츠 S-->
            <div role="tabpanel" id="tab_01" class="cmm-tab-panel on mt10" v-show="tabPgflag == '1' && crInfBrk.length > 0">
                <div class="com_inner credit_inquiry_box">
                    <div class="com_box_type01 card_use_box" v-for="(crInfInq, idx) in crInfBrk" :key="'tpg1_li1_'+idx">
                        <div class="new_tit_area">
                            <div class="tit">
                                <span>{{crInfInq.fncorgNm}}</span>
                            </div>
                        </div>
                        <ul class="list_type_02">
                            <li>
                                <dl>
                                    <dt>
                                        <div>
                                            <em>조회일자</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{crInfInq.inqDt | dateFilter('YYYY.MM.DD')}}</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dt>
                                        <div>
                                            <em>조회목록</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <span>{{crInfInq.inqRsnCntn}}</span>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                    <p class="dot_msg mt18">
                        코리아크레딧뷰로(KCB)에서 제공하는 정보이며,
                        KCB 데이터 산정일 및 기준금액의 차이로 실제 금융정보와 다를 수 있습니다.
                    </p>
                </div>
            </div>
            <!--// 조회내역 컨텐츠 E -->
            <!-- 변동내역 컨텐츠 S-->
            <div role="tabpanel" id="tab_01" class="cmm_tab_panel on" v-show="tabPgflag == '2' && crInfBrk.length > 0">
                <div class="com_inner info_change_box">
                    <div class="card_list_box">
                        <ul class="list_type_01">
                            <li v-for="(crinfVar, idx) in crInfBrk" :key="'tpg2_li1_'+idx">
                                <dl>
                                    <dt>
                                        <div>
                                            <em>{{crinfVar.trOrgnm}}</em>
                                            <span>정보등록일</span>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <span>{{crinfVar.chgRsnctt}}</span>
                                        </span>
                                        <span>
                                            <em class="num">{{crinfVar.infRgDt | dateFilter('YYYY.MM.DD')}}</em>
                                        </span>
                                    </dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                    <p class="dot_msg mt18">
                        코리아크레딧뷰로(KCB)에서 제공하는 정보이며,
                        KCB 데이터 산정일 및 기준금액의 차이로 실제 금융정보와 다를 수 있습니다.
                    </p>
                </div>
            </div>
            <!--// 변동내역 컨텐츠 E -->
            <!-- 조회내역 없을때 S -->
            <div class="com_inner" v-show="crInfBrk.length == 0">
                <div class="no_data_box">
                    <div class="no_data_list">
                        <p>조회 내역이 없습니다.</p>
                        <div class="dot_msg mt33">
                            코리아크레딧뷰로(KCB)에서 제공하는 정보이며,
                            KCB 데이터 산정일 및 기준금액의 차이로 실제 금융정보와 다를 수 있습니다.
                        </div>
                    </div>
                </div>
            </div>
            <!-- 조회내역 없을때 E -->
        </div>
    </div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'
    import {dateFormat} from '@/utils/date'

    export default {
        name : "ASCR1102",
        data: () => {
            return {
                selectedYm        : "",
                tabPgLogList      : [],
                tabPgflag         : "",
                tabPgLiflag       : "",
                crInfBrk          : [],

                // 조회내역
                ryr1CrinfInqCn    : 0,  // 최근1년신용정보조회건수
                rcnYr3CrinfInqCn  : 0,  // 최근3년신용정보조회건수
                inqDtmPg1         : "", // 조회일시
                crInfInqBrk1      : [], // 최근 1년내 조회내역 목록
                crInfInqBrk3      : [], // 1년 ~ 3년내 조회내역 목록

                // 변동내역
                varHis            : [], // 최근변동내역 목록
                ryr1GenCrinfVarCn : 0,  // 최근1년일반신용정보변동건수
                ryr1OvdCrinfVarCn : 0,  // 최근1년연체신용정보변동건수
                inqDtmPg2         : "", // 조회일시
                genCrinfVarBrk    : [], // 일반변동내역 목록
                ovdCrinfVarBrk    : []  // 연체변동내역 목록
            }
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        mounted() {
            this.initComponent(this.params);

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        methods: {
            initComponent(param) {
                this.selectedYm  = new Date();
                this.tabPgflag   = param.tabPg || this.tabPgflag;
                this.tabPgLiflag = "1"; // 1년 이내, 일반정보 변동

                this.getData();
            },
            getData() {
                const config = {
                    url  : this.tabPgflag == '1' ? '/as/cr/02r01' : '/as/cr/03r01',
                    data : {
                        mydtCusno : this.getUserInfo('mydtCusno') // 고객번호
                    }
                };

                apiService.call(config).then(response => {
                    // 조회내역
                    if (this.tabPgflag == '1') {
                        this.ryr1CrinfInqCn    = response.ryr1CrinfInqCn;
                        this.rcnYr3CrinfInqCn  = response.rcnYr3CrinfInqCn;
                        this.inqDtmPg1         = response.inqDtm;
                        this.crInfInqBrk1      = response.crInfInqBrk1 || [];
                        this.crInfInqBrk3      = response.crInfInqBrk3 || [];

                        this.crInfBrk = this.crInfInqBrk1;
                    }
                    // 변동내역
                    else {
                        this.varHis            = response.varHis || [];
                        this.ryr1GenCrinfVarCn = response.ryr1GenCrinfVarCn;
                        this.ryr1OvdCrinfVarCn = response.ryr1OvdCrinfVarCn;
                        this.inqDtmPg2         = response.inqDtm;
                        this.genCrinfVarBrk    = response.genCrinfVarBrk || [];
                        this.ovdCrinfVarBrk    = response.ovdCrinfVarBrk || [];

                        this.crInfBrk = this.genCrinfVarBrk;

                        for (var k=0; k<this.varHis.length; k++) {
                            this.varHis[k].basDt = dateFormat(this.varHis[k].basDt,'YYYY-MM-DD');
                        }

                        this.$nextTick(()=>{
                            this.getChart()
                        })
                       
                    }
                });
            },
            getChart() {
                // -----------------------차트 설정 시작-----------------------
                // rMateChart 를 생성합니다.
                // 파라메터 (순서대로)
                //  1. 차트의 id ( 임의로 지정하십시오. )
                //  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
                //  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
                //  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
                //  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)
                rMateChartH5.create("chartASCR02", "chartHolderASCR02", "useContextMenu=false", "100%", "200rem");

                var layoutStr =
                                '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
                                    +'<Options>'
                                        +'<Caption text="배경에 이미지 삽입"/>'
                                    +'</Options>'
                                    +'<Line2DChart showDataTips="true">'
                                        +'<horizontalAxis>'
                                            +'<CategoryAxis categoryField="basDt"/>'
                                        +'</horizontalAxis>'
                                        +'<verticalAxis >'
                                            +'<LinearAxis maximum="1000" id="vAxis" />'
                                        +'</verticalAxis>'
                                        +'<verticalAxisRenderers>'
                                            +'<Axis3DRenderer axis="{vAxis}" visible="true"/>'
                                        /* visible속성을 false로 하여 Chart에서는 보이지 않게 합니다 */
                                    +'</verticalAxisRenderers>'
                                        +'<series>'
                                            +'<Line2DSeries yField="psnCrdevlScrVal" displayName="신용점수" itemRenderer="CircleItemRenderer" radius="6">'
                                                +'<showDataEffect>'
                                                    +'<SeriesInterpolate/>'
                                                +'</showDataEffect>'
                                                +'<lineStroke>'
                                                    +'<Stroke color="#046fd9" weight="2.5"/>'
                                                +'</lineStroke>'
                                                +'<stroke>'
                                                    +'<Stroke color="#046fd9" weight="3"/>'
                                                +'</stroke>'
                                                +'<fill>'
                                                    +'<SolidColor color="#fff"/>'
                                                +'</fill>'
                                            +'</Line2DSeries>'
                                        +'</series>'
                                        /*
                                        차트 배경에 이미지를 넣을 경우에는 backgroundElements와 annotationElements 중 하나를 정의합니다
                                        backgroundElements는 그래프가 뿌려진 레이어를 기준으로 뒷면을 의미하고
                                        annotationElements는 그래프가 뿌려진 레이어를 기준으로 앞면을 의미합니다
                                        */
                                        // +'<backgroundElements>'
                                        //  +'<CanvasImage source="../rMateChartH5/Assets/Images/chart_background.jpg" maintainAspectRatio="false" alpha="1"/>'
                                        //  /*
                                        //      Image의 속성으로는
                                        //      source : 실제 이미지가 있는 URL경로입니다
                                        //      maintainAspectRation : 이미지 원본 비율을 유지할지를 나타냅니다
                                        //                      True면 고유비율을 유지하려 하고
                                        //                      False면 차트 크기에 맞춘 사이즈를 갖습니다
                                        //      alpha : 이미지의 투명도를 나타 냅니다
                                        //  */
                                        // +'</backgroundElements>'
                                    +'</Line2DChart>'
                                +'</rMateChart>';

                // 차트 데이터
                var chartData = this.varHis;
                // rMateChartH5.calls 함수를 이용하여 차트의 준비가 끝나면 실행할 함수를 등록합니다.
                //
                // argument 1 - rMateChartH5.create시 설정한 차트 객체 아이디 값
                // argument 2 - 차트준비가 완료되면 실행할 함수 명(key)과 설정될 전달인자 값(value)
                //
                // 아래 내용은
                // 1. 차트 준비가 완료되면 첫 전달인자 값을 가진 차트 객체에 접근하여
                // 2. 두 번째 전달인자 값의 key 명으로 정의된 함수에 value값을 전달인자로 설정하여 실행합니다.
                rMateChartH5.calls("chartASCR02", {
                    "setLayout" : layoutStr,
                    "setData"   : chartData
                });

            },
            fn_setTabPgflag(gbn) {
                if (this.tabPgflag != gbn) {
                    this.tabPgLogList.push({"tabPg" : this.tabPgflag});
                }

                this.tabPgflag   = gbn;
                this.tabPgLiflag = "1";
                this.getData();
            },
            fn_setTabLiflag(gbn) {
                this.tabPgLiflag = gbn;
                if (this.tabPgflag == '1') {
                    this.crInfBrk = gbn == '1' ? this.crInfInqBrk1 : this.crInfInqBrk3;
                } else {
                    this.crInfBrk = gbn == '1' ? this.genCrinfVarBrk : this.ovdCrinfVarBrk;
                }
            },
            fn_moveBack() {
                if (this.tabPgLogList.length > 0) {
                    this.tabPgflag   = this.tabPgLogList[this.tabPgLogList.length-1].tabPg;
                    this.tabPgLiflag = "1";
                    
                    this.tabPgLogList.pop();
                    this.getData();
                } else {
                    this.close(true);
                }
            }
        }
    }
</script>