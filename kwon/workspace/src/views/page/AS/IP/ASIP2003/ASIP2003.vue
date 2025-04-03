<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산진단 > 유형별금융자산(부채)
* @ 페이지설명 : 나의자산 > 자산진단 > 유형별금융자산(부채)
* @ 파일명     : src\views\page\AS\IP\ASIP2003\ASIP2003.vue
* @ 작성자     : 
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10              CS533437              최초작성 (상호금융 마이데이터 확대 개발)
*************************************************************************/
-->
<template>
   <div id="tab_02" role="tabpanel" class="cmm-tab-panel on">
        <div v-if="dbtTotAm !== 0" class="com_inner">
            <div class="new_sub_info pt0">
                <div class="title">
                    <div class="text">
                        총 부채<br>
                        <strong><span class="counter" id="dbtTotAm" :data-count="dbtTotAm">{{dbtTotAm | numberFilter}}</span><em>원</em></strong>    
                        <!-- <span class="counter" id="totAsetAm" :data-count="totAsetAm"></span><em>원</em>                     -->                        
                    </div>                                        
                </div>    
            </div>   
            <template v-if="bmmDbtIndAm !== 0">
                <p :class="`amount ${bmmDbtIndAm > 0 ? 'up' : bmmDbtIndAm < 0 ? 'down' : ''}`">{{Math.abs(bmmDbtIndAm) | numberFilter}}원</p>  
            </template>
            <!-- 차트영역 -->

             <!-- <div class="chart_wrap">
                <div id="chartHolder3"></div> -->

            <!-- </div> -->
            <div class="chartArea assetDoughnut"><!-- 1004 접근성 반영 -->
                <div id="chartHolder3"></div>
            </div>
            <!--// 차트영역 -->
        </div>
        <div v-else class="com_inner">
            <div class="new_sub_info pt0">
                <div class="title">
                    <div class="text">
                        총 부채<br>
                        <strong><span class="num counter">0</span>원</strong>
                    </div>
                </div>
            </div>
            <p class="com_txtinfo_type01">자산을 연결하고 진단 받으세요</p>
            <div class="com_btn_area">
                <a href="javascript:void(0);" class="com_btnround_type02" role="button" v-on:click.prevent="movePage()"><span class="btn_plus">자산 연결하기</span></a>
            </div>
        </div>
        <!--//com_inner -->
        <hr class="hr02">
        <div class="com_inner">
            <strong class="titH3">유형별 부채 변동</strong>
            <div class="custom_box_chart peer"><!-- 1004 접근성 반영 -->               
                <!-- 차트 -->
                <div class="compare_chart_wrap">
                    <div class="chart">
                        <div class="bg"></div>
                        <div class="bar_wrap">
                            <div class="bars bar_saving">
                                <div class="bar bar01" :style="`height: ${(bmmCrlnHldWgt*1.15)}%`"></div>
                                <div class="bar bar02" :style="`height: ${(crlnHldWgt*1.15)}%`"></div>
                                <div class="title">신용대출</div>
                            </div>

                            <div class="bars bar_investment">
                                <div class="bar bar01" :style="`height: ${(bmmMgglnHldWgt*1.15)}%`"></div>
                                <div class="bar bar02" :style="`height: ${(mgglnHldWgt*1.15)}%`"></div>
                                <div class="title">담보대출</div>
                            </div>

                            <div class="bars bar_pension">
                                <div class="bar bar01" :style="`height: ${(bmmCdHldWgt*1.15)}%`"></div>
                                <div class="bar bar02" :style="`height: ${(cdHldWgt*1.15)}%`"></div>
                                <div class="title">카드</div>
                            </div>

                            <div class="bars bar_deposit">
                                <div class="bar bar01" :style="`height: ${(bmmHpfnHldWgt*1.15)}%`"></div>
                                <div class="bar bar02" :style="`height: ${(hpfnHldWgt*1.15)}%`"></div>
                                <div class="title">할부금융</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="legend_item">
                    <span class="peer">지난달</span>
                    <span class="me">이번달</span>
                </div>
                <!--//차트 -->
            </div> 
            <div class="asset_more_list">
                <ul>
                    <li>
                        <dl class="breakdown">
                            <dt>신용대출</dt>
                            <dd><em class="num">{{crlnHldAm | numberFilter}}</em>원</dd>
                        </dl>
                        <dl>
                            <dt class="num">{{crlnHldWgt}}%</dt>
                            <dd>
                                <template v-if="bmmCrlnIndAm > 0">
                                    <p class="amount up">{{bmmCrlnIndAm | numberFilter}}원</p><!-- 증가amount up, 감소amount down, 증감없음amount -->
                                </template>
                                <template v-else-if="bmmCrlnIndAm < 0">
                                    <p class="amount down">{{bmmCrlnIndAm | numberFilter}}원</p><!-- 증가amount up, 감소amount down, 증감없음amount -->
                                </template>
                            </dd>
                        </dl>
                    </li>
                    <li>
                        <dl class="breakdown">
                            <dt>담보대출</dt>
                            <dd><em class="num">{{mgglnHldAm | numberFilter}}</em>원</dd>
                        </dl>
                        <dl>
                            <dt class="num">{{mgglnHldWgt}}%</dt>
                            <dd>
                                 <template v-if="bmmMgglnIndAm > 0">
                                    <p class="amount up">{{bmmMgglnIndAm | numberFilter}}원</p><!-- 증가amount up, 감소amount down, 증감없음amount -->
                                </template>
                                <template v-else-if="bmmMgglnIndAm < 0">
                                    <p class="amount down">{{bmmMgglnIndAm | numberFilter}}원</p><!-- 증가amount up, 감소amount down, 증감없음amount -->
                                </template>
                            </dd>
                        </dl>
                    </li>
                    <li>
                        <dl class="breakdown pr"><!-- pr클래스는 custom_tooltip영역 지정 -->
                            <dt>
                                카드
                                <div class="custom_tooltip">
                                    <div class="com_tooltip_type02 com_tooltip_type03">
                                        <a href="javascript:void(0);" class="com_btn_info" role="button">
                                            <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                        </a>
                                        <div class="com_ballon_type01 com_ballon_type02" style="display:none;">
                                            <div>
                                                <p>카드 부채에는 이번달 결제예정금액, 현금서비스, 카드론, 리볼빙 금액이 포함되어 있어요.</p>
                                                <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                            </dt>
                            <dd><em class="num">{{cdHldAm | numberFilter}}</em>원</dd>
                        </dl>
                        <dl>
                            <dt class="num">{{cdHldWgt}}%</dt>
                            <dd>
                                <template v-if="bmmCdIndAm > 0">
                                    <p class="amount up">{{bmmCdIndAm | numberFilter}}원</p><!-- 증가amount up, 감소amount down, 증감없음amount -->
                                </template>
                                <template v-else-if="bmmCdIndAm < 0">
                                    <p class="amount down">{{bmmCdIndAm | numberFilter}}원</p><!-- 증가amount up, 감소amount down, 증감없음amount -->
                                </template>
                            </dd>
                        </dl>
                    </li>
                    <li>
                        <dl class="breakdown">
                            <dt>할부금융</dt>
                            <dd><em class="num">{{hpfnHldAm | numberFilter}}</em>원</dd>
                        </dl>
                        <dl>
                            <dt class="num">{{hpfnHldWgt}}%</dt>
                            <dd>
                                <template v-if="bmmHpfnIndAm > 0">
                                    <p class="amount up">{{bmmHpfnIndAm | numberFilter}}원</p><!-- 증가amount up, 감소amount down, 증감없음amount -->
                                </template>
                                <template v-else-if="bmmHpfnIndAm < 0">
                                    <p class="amount down">{{bmmHpfnIndAm | numberFilter}}원</p><!-- 증가amount up, 감소amount down, 증감없음amount -->
                                </template>
                            </dd>
                        </dl>
                    </li>
                </ul>
            </div>
        </div>
        <!--//com_inner -->
    </div>      
  
</template>

<script>
    /*eslint-disable */    
    import '@/assets/js/rMateChartH5/JS/rMateFunction.js'
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'    
    import {dateFormat, monthAdd, monthDiff, dayDiff, dayAdd} from '@/utils/date'
    import {infoToolipHandler} from '@/utils/jUtils'    
    import ASIP1002 from '@/views/page/AS/IP/ASIP1002/ASIP1002'
    // import ASIP1003 from '@/views/page/AS/IP/ASIP1003/ASIP1003'
    import ASCR1101 from '@/views/page/AS/CR/ASCR1101/ASCR1101'
    import COAR2001 from '@/views/page/CO/AR/COAR2001/COAR2001'
    import ASAC1003 from '@/views/page/AS/AC/ASAC1003/ASAC1003' 
    

    import COAR2002 from '@/views/page/CO/AR/COAR2002/COAR2002'

    export default {
        name : "ASIP2003",
        data: () => {
            return {
                 
                currYmd              : "", // 현재년월일
                
                /////////////////////////////////////
                //추가 변수///////////////////////////
                /////////////////////////////////////

                //유형별 부채 변동 그래프 (12 만땅)
                     

                dbtTotAm        : 0, // 총부채
                bmmDbtIndAm     : 0, // 총부채증감액

                crlnHldAm       : 0,   // 신용대출보유금액
                bmmCrlnIndAm    : 0,   // 신용대출전월증감액
                crlnHldWgt      : 0,   // 신용대출보유비중
                bmmCrlnHldWgt   : 0,   // 신용대출전월보유비중
                
                mgglnHldAm      : 0,   // 담보대출보유금액
                bmmMgglnIndAm   : 0,   // 담보대출전월증감액
                mgglnHldWgt     : 0,   // 담보대출보유비중
                bmmMgglnHldWgt  : 0,   // 담보대출전월보유비중


                cdHldAm         : 0,   // 카드보유금액
                bmmCdIndAm      : 0,   // 카드전월증감액
                cdHldWgt        : 0,   // 카드보유비중
                bmmCdHldWgt     : 0,   // 카드전월보유비중


                hpfnHldAm       : 0,   // 할부금융보유금액
                bmmHpfnIndAm    : 0,   // 할부금융전월증감액                         
                hpfnHldWgt      : 0,   // 할부금융보유비중
                bmmHpfnHldWgt   : 0,   // 할부금융전월보유비중
            }
        },    

        created() {
            
        },
        mounted() {
            this.initComponent();

            // 자산수집 mutation 이벤트 감지 
            this.getGatheringListenSubscribe()
            
            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        methods: {
            initComponent() {
                this.currYmd    = dateFormat(new Date(), 'YYYYMMDD');
                
                this.getData();
               
            },
            getData() {
                // 자산진단 유형별 부채 조회
                const config = {
                    url: '/as/ip/03r01', // 인터페이스ID: IF-MOB-PFM-ASIP03R01, 서비스코드: PFMASIP03R01
                    data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno'),
                        "basYmd"     : this.currYmd
                    }
                };

                //this.executeCnt++
                apiService.call(config).then(response => {
                    console.log("======= /as/ip/03r01 response =======", response)

                    this.dbtTotAm            = response.dbtTotAm;
                    this.bmmDbtIndAm         = response.bmmDbtIndAm;

                    this.crlnHldAm           = response.crlnHldAm;
                    this.bmmCrlnIndAm       = response.bmmCrlnIndAm;
                    this.crlnHldWgt         = response.crlnHldWgt;
                    this.bmmCrlnHldWgt         = response.bmmCrlnHldWgt;
                
                
                    this.mgglnHldAm      = response.mgglnHldAm;
                    this.bmmMgglnIndAm   = response.bmmMgglnIndAm;
                    this.mgglnHldWgt     = response.mgglnHldWgt;
                    this.bmmMgglnHldWgt     = response.bmmMgglnHldWgt;


                    this.cdHldAm         = response.cdHldAm;
                    this.bmmCdIndAm      = response.bmmCdIndAm;
                    this.cdHldWgt        = response.cdHldWgt;
                    this.bmmCdHldWgt        = response.bmmCdHldWgt;


                    this.hpfnHldAm       = response.hpfnHldAm;
                    this.bmmHpfnIndAm    = response.bmmHpfnIndAm;                     
                    this.hpfnHldWgt      = response.hpfnHldWgt;
                    this.bmmHpfnHldWgt      = response.bmmHpfnHldWgt;

                    
                    this.$nextTick(()=>{
                        if (this.executeCnt == 1) infoToolipHandler() // 툴팁 클릭이벤트 생성    

                        if(this.dbtTotAm != 0 )                      
                            this.getChart4() 
                    })

                });
            },
            
            // 신용 차트 
            getChart4() {    

                // 나의 총 부채
                // -----------------------차트 설정 시작-----------------------
                        
                // rMateChart 를 생성합니다.
                // 파라메터 (순서대로)
                //  1. 차트의 id ( 임의로 지정하십시오. )
                //  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
                //  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
                //  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
                //  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)

                rMateChartH5.create("chart2", "chartHolder3", "useContextMenu=false", "100%", "140px");
                // console.log('rMateChartH5', rMateChartH5)
                
		// 스트링 형식으로 레이아웃 정의.
		var layoutStr =
		'<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
				+'<Options>'
					//+'<Caption text="Global Temperature"/>'
					+'<Legend position="right" direction="vertical" useVisibleCheck="true" borderStyle="none" />'// 범례 속성
				+'</Options>'
				+'<CurrencyFormatter id="numFmt" currencySymbol="%" alignSymbol="right" />'
				+'<Pie2DChart innerRadius="0.55" showDataTips="false" selectionMode="single">'
					/*
					Doughnut2D 차트 생성시에 필요한 Pie2DChart 정의합니다
					showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다.
					innerRadius : PieChart 가운데에 빈 공간을 만듭니다. 유효값 0.1 ~ 0.9 0은 PieChart 1은 차트 사라짐
					*/
						+'<series>'
							+'<Pie2DSeries nameField="expenditure" field="Profit" startAngle="270" renderDirection="clockwise" color="#fff">'
								+'<fills>'
									+'<SolidColor color="#6877e5"/>' /* 신용대출 */
									+'<SolidColor color="#499ae9"/>' /* 담보대출 */
									+'<SolidColor color="#de7cc1"/>' /* 카드 */
									+'<SolidColor color="#b2b2b2"/>' /* 할부금융 */
								+'</fills>'
								/* Pie2DChart 정의 후 Pie2DSeries labelPosition="inside"정의합니다 */
								+'<showDataEffect>'
								/* 차트 생성시에 Effect를 주고 싶을 때 shoDataEffect정의합니다 */
										+'<SeriesZoom duration="1000" relativeTo="chart" horizontalFocus="right" verticalFocus="bottom" />'
										/*
										SeriesZoom 효과는 시리즈 데이터가 데이터로 표시될 때 특정 지점에서 점점 확대되어지며 나타나는 효과를 적용합니다
										- 공통속성 -
										elementOffset : effect를 지연시키는 시간을 지정합니다 default:20
										minimumElementDuration : 각 엘리먼트의 최소 지속 시간을 설정합니다 default:0
																이 값보다 짧은 시간에 effect가 실행되지 않습니다
										offset : effect개시의 지연시간을 설정합니다 default:0
										perElementOffset : 각 엘리먼트의 개시 지연시간을 설정합니다
										- SeriesZoom속성 -
										relativeTo : 이펙트의 기준을 어디로 잡을지에 대한 속성입니다. 유효값 : chart, series
										horizontalFocus : relativeTo를 기준으로 수평선 방향의 기준을 정합니다. 유효값 : left, center, right
										verticalFocus : relativeTo를 기준으로 수직선 방향의 기준을 정합니다. 유효값 : top, middle, bottom
										*/
								+'</showDataEffect>'
							+'</Pie2DSeries>'
						+'</series>'
						+'<backgroundElements>'

						+'</backgroundElements>'
				+'</Pie2DChart>'
		+'</rMateChart>';
                
                console.log('layoutStr', layoutStr)

                

                // 차트 데이터
                var chartData = [                    
                    {"expenditure":"신용대출 <span class='num'>"+ (this.crlnHldWgt) +"%</span>",  "Profit": (this.crlnHldWgt) },
                    {"expenditure":"담보대출 <span class='num'>"+ ( this.mgglnHldWgt) +"%</span>", "Profit": ( this.mgglnHldWgt)},
                    {"expenditure":"카드     <span class='num'>"+ ( this.cdHldWgt) +"%</span>", "Profit": ( this.cdHldWgt)},
                    {"expenditure":"할부금융 <span class='num'>"+ ( this.hpfnHldWgt) +"%</span>", "Profit": ( this.hpfnHldWgt)},                    
                ];
               
                
                // rMateChartH5.calls 함수를 이용하여 차트의 준비가 끝나면 실행할 함수를 등록합니다.
                //
                // argument 1 - rMateChartH5.create시 설정한 차트 객체 아이디 값
                // argument 2 - 차트준비가 완료되면 실행할 함수 명(key)과 설정될 전달인자 값(value)
                // 
                // 아래 내용은 
                // 1. 차트 준비가 완료되면 첫 전달인자 값을 가진 차트 객체에 접근하여
                // 2. 두 번째 전달인자 값의 key 명으로 정의된 함수에 value값을 전달인자로 설정하여 실행합니다.
                rMateChartH5.calls("chart2", {
                    "setLayout" : layoutStr,
                    "setData" : chartData
                });

                rMateChartH5.registerTheme(rMateChartH5.themes);
		
                /**
                 * 샘플 내의 테마 버튼 클릭 시 호출되는 함수입니다.
                 * 접근하는 차트 객체의 테마를 변경합니다.
                 * 파라메터로 넘어오는 값
                 * - simple
                 * - cyber
                 * - modern
                 * - lovely
                 * - pastel
                 * - default
                 *
                 * default : 테마를 적용하기 전 기본 형태를 출력합니다.
                 */
                // function rMateChartH5ChangeTheme(theme){
                //         document.getElementById("chart2").setTheme(theme);
                // }

            },

        /**
		 * rMateChartH5 3.0이후 버전에서 제공하고 있는 테마기능을 사용하시려면 아래 내용을 설정하여 주십시오.
		 * 테마 기능을 사용하지 않으시려면 아래 내용은 삭제 혹은 주석처리 하셔도 됩니다.
		 *
		 * -- rMateChartH5.themes에 등록되어있는 테마 목록 --
		 * - simple
		 * - cyber
		 * - modern
		 * - lovely
		 * - pastel
		 * -------------------------------------------------
		 *
		 * rMateChartH5.themes 변수는 theme.js에서 정의하고 있습니다.
		 */
            getCodeName(grpCd, cd) {
                let ret = ''
                let codeList = this.getCodeList(grpCd)
                for (let i = 0; i < codeList.length; i++) {
                    if (cd == codeList[i].comnCVal) {
                        ret = codeList[i].comnCExpl
                        break
                    }
                }
                return ret
            },
            /**
             * 샘플 내의 테마 버튼 클릭 시 호출되는 함수입니다.
             * 접근하는 차트 객체의 테마를 변경합니다.
             * 파라메터로 넘어오는 값
             * - simple
             * - cyber
             * - modern
             * - lovely
             * - pastel
             * - default
             *
             * default : 테마를 적용하기 전 기본 형태를 출력합니다.
             */
            MateChartH5ChangeTheme(theme) {
                    document.getElementById("chart2").setTheme(theme);
            },

            movePage() {
            const config = {
                component: COAR2001,
            }
            modalService.openPopup(config)
        },
            
        },    

        

        mixins: [
        commonMixin,
        popupMixin
        ],

        components : {
          
        }
    }


</script>