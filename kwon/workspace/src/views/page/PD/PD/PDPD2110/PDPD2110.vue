<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 상품추천 > 은퇴력진단
* @ 페이지설명 : 금융과생활 > 상품추천 > 은퇴력진단 > step 5. 은퇴 준비 진단결과
* @ 파일명     : src\views\page\PD\PD\PDPD2110\PDPD2110.vue
* @ 작성자     : CS533541
* @ 작성일     : 2023-07-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-18              CS533541              최초작성(PDPD1110.vue -> PDPD2110.vue )
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01">
        <div class="popup_header">
            <h1>은퇴 준비 진단</h1>
        </div>
        <div class="popup_content com_bg_type00">
            <div class="com_inner">
                <div class="com_box_type01 mt20">
                    <strong class="com_box_tit">은퇴 준비 달성률</strong>
                    <div class="chart_wrap mt20">
                        <!-- 차트가 삽입될 DIV -->
                        <div class="chart_inner">
                            <div id="chartHolderPDPD10" aria-hidden="true"></div>
                            <div class="percent">
                                <span class="num">{{retAcvmRt | numberFilter}}</span>%
                            </div>
                        </div>
                    </div>
                    <template v-if="retAcvmRt < 100">
                        <div class="com_box_type06 mt15">
                            <div class="text">
                                안락한 <span class="color">{{lifeExpAge - retExpAge | numberFilter}}년의 노후를 위해 <br/>
                                {{retExpAge - mydtCusAge | numberFilter}}년 동안 {{Math.abs(totRsvAm - totNcssAm) | numberFilter}}원</span>이 필요해요.
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="com_box_type06 mt15">
                            <div class="text">
                                <span class="color">체계적인 은퇴 준비</span>를 하고 계시네요.<br/>
                                이 상태를 유지해서 <span class="color">행복한 노후생활</span>을 누리세요.
                            </div>
                        </div>
                    </template>
                    <table class="submain_list_wrap type00 mt15">
                        <tr class="list case00 no-stroke">
                            <td class="title">필요자금</td>
                            <td class="content"><span class="num">{{totNcssAm | numberFilter}}</span>원</td>
                        </tr>
                        <tr class="list case00 no-stroke">
                            <td class="title">준비자금</td>
                            <td class="content"><span class="num">{{totRsvAm | numberFilter}}</span>원</td>
                        </tr>
                        <tr class="list case00 no-stroke">
                            <td class="title">과부족금액</td>
                            <td class="content"><span class="num">{{totRsvAm - totNcssAm | numberFilter}}</span>원</td>
                        </tr>
                    </table>
                </div>
                <div class="credit_list_box money_list_box">
                    <div class="com_box_type01">
                        <div class="list_type_box">
                                <div class="new_tit_area">
                                    <div class="tit"><span>필요자금</span></div>
                                    <div class="total_price">
                                        <em class="num">{{totNcssAm | numberFilter}}</em><em class="unit">원</em>
                                    </div>
                                </div>
                            <ul class="list_type_02">
                                <li>
                                    <dl>
                                        <dt>
                                            <em>생활비</em>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{retMmLivAmtt | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                     </dl>
                                </li>
                                <li>
                                    <dl>
                                        <dt>
                                            <em>의료비</em>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{retYyMdcAmtt | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                     </dl>
                                </li>
                                <li>
                                    <dl>
                                        <dt>
                                            <em>자녀교육비</em>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{chdrEduAm | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                     </dl>
                                </li>
                                <li>
                                    <dl>
                                        <dt>
                                            <em>자녀결혼비</em>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{chdrWeddAm | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                     </dl>
                                </li>
                                <li>
                                    <dl>
                                        <dt>
                                            <em>기타</em>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{etcYyAmtt | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                     </dl>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="com_box_type01">
                        <div class="list_type_box">
                                <div class="new_tit_area">
                                    <div class="tit"><span>준비자금</span></div>
                                    <div class="total_price">
                                        <em class="num">{{totRsvAm | numberFilter}}</em><em class="unit">원</em>
                                    </div>
                                </div>
                            <ul class="list_type_02">
                                <li>
                                    <dl>
                                        <dt>
                                            <em>총 수입</em>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{expMmAmtt | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                     </dl>
                                </li>
                                <li>
                                    <dl>
                                        <dt>
                                            <em>국민연금</em>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{ntnPnsAm | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                     </dl>
                                </li>
                                <li>
                                    <dl>
                                        <dt>
                                            <em>개인연금</em>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{psnPnsAm | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                     </dl>
                                </li>
                                <li>
                                    <dl>
                                        <dt>
                                            <em>퇴직연금</em>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{expRetAm | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                     </dl>
                                </li>
                                <li>
                                    <dl>
                                        <dt>
                                            <em>기타</em>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{etcFnasAm | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                     </dl>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <a href="javascript:void(0);" @click.prevent="fn_openExpensePop()">
                    <div class="com_box_type03 bg11 mt15">
                        <div class="text ">
                            돈 모으기 목표를 세워  <br><span class="color">노후 자금을 준비해 볼까요?</span>
                        </div>
                    </div>
                </a>
                <a href="javascript:void(0);" @click.prevent="closeAll('PDPD1101_tab1')">
                    <div class="com_box_type03 bg12 mt15">
                        <div class="text ">
                            미래 준비를 위한 더 많은<br><span class="color">상품을 추천해 드릴게요.</span>
                        </div>
                    </div>
                </a>
                <p class="dot_msg mt15">물가상승률과 은퇴자산의 기대 수익률이 반영되지 않은 단순 계산된 참고 자료입니다.</p>
            </div>
        </div>
        <div class="popup_footer fixed">
            <div class="btn_full_box">
                <a href="javascript:void(0);" class="btn btn_mint" @click.prevent="closeAllLeftMain()">다시 진단 하기</a>
            </div>
        </div>
        <a href="javascript:void(0);" class="btn_close" @click.prevent="closeAll(true)"><span class="blind">팝업닫기</span></a>
    </div>
</template>

<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import commonService from '@/service/commonService'

    import PDMY2005 from '@/views/page/PD/MY/PDMY2005/PDMY2005'

    export default {
        name : "PDPD2110",
        data: () => {
            return {
                // 기본정보
                mydtCusAge   : 0, // 마이데이터고객나이
                retExpAge    : 0, // 은퇴예상나이
                lifeExpAge   : 0, // 기대수명
                             
                // 필요자금     
                retMmLivAm   : 0, // 은퇴 후 월 생활비
                retYyMdcAm   : 0, // 은퇴 후 의료비(연간)
                chdrEduAm    : 0, // 자녀교육 비용
                chdrWeddAm   : 0, // 자녀결혼 비용
                etcYyAm      : 0, // 기타비용(연간)
                             
                // 준비자금     
                expMmAm      : 0, // 월예상수입
                ntnPnsAm     : 0, // 국민연금
                psnPnsAm     : 0, // 개인연금
                expRetAm     : 0, // 예상퇴직금
                etcFnasAm    : 0, // 기타금융자산
                             
                // 은퇴진단결과  
                retMmLivAmtt : 0, // 생활비
                retYyMdcAmtt : 0, // 의료비
                etcYyAmtt    : 0, // 기타
                expMmAmtt    : 0, // 총예상수입
                totNcssAm    : 0, // 필요자금합계
                totRsvAm     : 0, // 준비자금합계
                retAcvmRt    : 0  // 은퇴준비달성률
            }
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        mounted() {
            this.initComponent(this.params);

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        methods: {
            initComponent(param) {
                console.log(" param==[", param,"] **");
                // 기본정보
                this.mydtCusAge = param.mydtCusAge;
                this.retExpAge  = param.retExpAge;
                this.lifeExpAge = param.lifeExpAge;

                // 필요자금
                this.retMmLivAm = Number(this.removeComma(param.retMmLivAm)) * 10000;
                this.retYyMdcAm = Number(this.removeComma(param.retYyMdcAm)) * 10000;
                this.chdrEduAm  = Number(this.removeComma(param.chdrEduAm )) * 10000;
                this.chdrWeddAm = Number(this.removeComma(param.chdrWeddAm)) * 10000;
                this.etcYyAm    = Number(this.removeComma(param.etcYyAm   )) * 10000;

                // 준비자금
                this.expMmAm    = Number(this.removeComma(param.expMmAm   )) * 10000;
                this.ntnPnsAm   = Number(this.removeComma(param.ntnPnsAm  )) * 10000;
                this.psnPnsAm   = Number(this.removeComma(param.psnPnsAm  )) * 10000;
                this.expRetAm   = Number(this.removeComma(param.expRetAm  )) * 10000;
                this.etcFnasAm  = Number(this.removeComma(param.etcFnasAm )) * 10000;

                this.getData();
            },
            getData() {
                /*
                 * 은퇴진단결과
                 * 생활비 = 월생활비 * 12 * (기대수명-은퇴나이)
                 * 의료비 = 연의료비 * (기대수명-은퇴나이)
                 * 기타   = 기타비용 * (기대수명-은퇴나이)
                 * 총수입 = 월수입   * 12 * (은퇴나이-현재나이)
                 */
                this.retMmLivAmtt = this.retMmLivAm * 12 * (this.lifeExpAge - this.retExpAge);
                this.retYyMdcAmtt = this.retYyMdcAm * (this.lifeExpAge - this.retExpAge);
                this.etcYyAmtt    = this.etcYyAm    * (this.lifeExpAge - this.retExpAge);
                this.expMmAmtt    = this.expMmAm    * 12 * (this.retExpAge - this.mydtCusAge);

                // 필요자금, 준비자금 합계
                this.totNcssAm = this.retMmLivAmtt + this.retYyMdcAmtt + this.chdrEduAm + this.chdrWeddAm + this.etcYyAmtt;
                this.totRsvAm  = this.expMmAmtt + this.ntnPnsAm + this.psnPnsAm + this.expRetAm + this.etcFnasAm;

                // 은퇴준비 달성률 = (준비자금/필요자금*100%)
                this.retAcvmRt = (this.totRsvAm / this.totNcssAm) * 100;

                this.$nextTick(()=>{
                    this.getChart();
                })
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
                rMateChartH5.create("chartPDPD10", "chartHolderPDPD10", "useContextMenu=false", "100%", "200rem");

                // 스트링 형식으로 레이아웃 정의.
                var layoutStr =
                                '<rMateChart backgroundColor="transparent" borderStyle="none">'
                                    +'<Pie2DChart innerRadius="0.6" showDataTips="true" selectionMode="single">'
                                /*
                                Doughnut2D 차트 생성시에 필요한 Pie2DChart 정의합니다
                                showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다.
                                innerRadius : PieChart 가운데에 빈 공간을 만듭니다. 유효값 0.1 ~ 0.9 0은 PieChart 1은 차트 사라짐
                                */
                                        +'<series>'
                                            +'<Pie2DSeries nameField="AmTit" field="AmNum" startAngle="-90" renderDirection="clockwise" color="#ffffff">'
                                                +'<fills>'
                                                    +'<SolidColor color="#57c9ae"/>'
                                                    +'<SolidColor color="#23a0a5"/>'
                                                +'</fills>'
                                            /* Pie2DChart 정의 후 Pie2DSeries labelPosition="inside"정의합니다 */
                                                +'<showDataEffect>'
                                                /* 차트 생성시에 Effect를 주고 싶을 때 shoDataEffect정의합니다 */
                                                    +'<SeriesZoom duration="500" offset="1000" relativeTo="chart" horizontalFocus="right" />'
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
                                            +'<CanvasElement>'
                                            +'</CanvasElement>'
                                        +'</backgroundElements>'
                                    +'</Pie2DChart>'
                                +'</rMateChart>';

                // 차트 데이터
                var chartData = [{"AmTit":"준비자금", "AmNum":this.retAcvmRt},
                                 {"AmTit":"부족금액", "AmNum":100-this.retAcvmRt}];

                // rMateChartH5.calls 함수를 이용하여 차트의 준비가 끝나면 실행할 함수를 등록합니다.
                //
                // argument 1 - rMateChartH5.create시 설정한 차트 객체 아이디 값
                // argument 2 - 차트준비가 완료되면 실행할 함수 명(key)과 설정될 전달인자 값(value)
                //
                // 아래 내용은
                // 1. 차트 준비가 완료되면 첫 전달인자 값을 가진 차트 객체에 접근하여
                // 2. 두 번째 전달인자 값의 key 명으로 정의된 함수에 value값을 전달인자로 설정하여 실행합니다.
                rMateChartH5.calls("chartPDPD10", {
                    "setLayout" : layoutStr,
                    "setData"   : chartData
                });
            },
			removeComma(value) {
				return (typeof value === "string") ? value.split(",").join("") : value
			},
            fn_openExpensePop() {
                const config = {
                    component : PDMY2005
                };

                modalService.openPopup(config).then(response => {

                    // 배너이미지를 통하여 목표등록을 하였을 경우
                    // 나의목표로 이동
                    if(response == 'reSelect') {

                        this.closeAll()

                        const menu = {
                            name: 'PDMY2001',
                            params : {}
                        }
                        commonService.movePage(menu)
                    }
                });
            }
        }
    }
</script>