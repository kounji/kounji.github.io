<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출분석
* @ 페이지설명 : 지출 > 지출분석 > 변동지출 현황
* @ 파일명     : src\views\page\LC\IP\LCIP1003\LCIP1003.vue
* @ 작성자     : CS529599
* @ 작성일     : 2022-10-12
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-10-12              CS529599              최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01">
		<div class="popup_header">    
			<h1>변동지출 현황</h1>
		</div>
		<div class="popup_content com_no_bottom">
			<div>
				<div class="select_date tac bottom_line">
                    <button class="cal_btn cal_prev" :class="monPrev ? '' : 'disabled'" :disabled="monPrev ? false : true" aria-label="한달 전 이동" @click.prevent="btn_moveMonth('P')"></button>
                    <a title="년월선택" class="year_month" href="javascript:console.log('월');"><span class="num">{{basYy}}</span>년 <span class="num">{{basMm}}</span>월 </a>
                    <button class="cal_btn cal_next" :class="monNext ? '' : 'disabled'" :disabled="monNext ? false : true" aria-label="한달 후 이동" @click.prevent="btn_moveMonth('N')"></button>
				</div>
			</div>
			<div class="com_inner com_line_type01 com_top_type02">
				<div class="wrap_item_box lcip">
					<div class="graph_box_wrap">
						<div class="top_info_box">
							<p class="subtxt">{{basMm}}월에는</p>
							<div class="bill">
								<span id="counter" class="num counter" :data-count="varXpsAm">{{varXpsAm | numberFilter}}</span><span class="fs22 bold">원을 썼어요.</span>
							</div>
						</div>
						<div class="graph_box" role="img" :aria-label="ariaLabelText">
							<div id="lcip1003ChartHolder" class="" aria-hidden="true"></div>
							<div class="list_center">
								<ul class="list">
									<li :class="setChartCss(index)" v-for="(ctgrChartInfo, index) in varXpsList" :key="index"><span class="pie_tit">{{ctgrChartInfo.rzsCtgrnm}}</span></li>
								</ul>
								<!--
								<ul class="list">
									<li class="bl_lightcyan">
										<span class="pie_tit">온라인쇼핑</span>
									</li>
									<li class="bl_blue">
										<span class="pie_tit">자동차</span>
									</li>
									<li class="bl_lightcyan2">
										<span class="pie_tit">식비</span>
									</li>
									<li class="bl_aqua2">
										<span class="pie_tit">생활·마트</span>
									</li>
									<li class="bl_purple2">
										<span class="pie_tit">미분류</span>
									</li>
								</ul>
								-->
							</div>
						</div>
						
					</div>
				</div>
			</div>
			<ul class="list_more_box custom">
				<li v-for="(varXpsInfo, idx1) in varXpsList" :key="idx1">
					<div class="com_inner">
						<div class="new_tit_area">
							<div class="tit"><span>{{varXpsInfo.rzsCtgrnm}}</span></div>
							<div class="total_price">
								<span>합계</span><em class="num">{{varXpsInfo.xpsTtAm | numberFilter}}</em><em class="unit">원</em>
							</div>
						</div>
						<template v-for="(varXpsBrkInfo, idx2) in varXpsBrkList">
							<ul class="list_type_02" v-if="varXpsInfo.rzsCtgrId == varXpsBrkInfo.xpsCtgrId" :key="idx2">
								<li>
									<dl>
										<dt>
											<strong>{{varXpsBrkInfo.trDt | dateFilter('D일')}}</strong>
											<div v-if="varXpsBrkInfo.prcMchtnm">
												<em>{{varXpsBrkInfo.prcMchtnm}}</em>
											</div>
											<span v-if="varXpsBrkInfo.cdcoCdWrsnm"><em>{{varXpsBrkInfo.cdcoCdWrsnm}}</em></span>
										</dt>
										<dd>
											<span class="com_price">
												<em class="num">{{varXpsBrkInfo.tram | numberFilter}}</em><em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</li>
							</ul>
						</template>
					</div>
				</li>
				<!--
				<li>
					<div class="com_inner">
						<div class="new_tit_area">
							<div class="tit"><span>온라인쇼핑</span></div>
							<div class="total_price">
								<span>합계</span><em class="num">560,000</em><em class="unit">원</em>
							</div>
						</div>
						<ul class="list_type_02">
							<li>
								<dl>
									<dt>
										<strong>6일</strong>
										<div>
											<em>삼성화재해상보험㈜</em>
										</div>
										<span><em>신한카드 Deep Oil</em></span>
									</dt>
									<dd>
										<span class="com_price">
											<em class="num">320,000</em><em class="unit">원</em>
										</span>
									</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt>
										<strong>9일</strong>
										<div>
											<em>삼성화재해상보험㈜</em>
										</div>
										<span><em>신한카드 Deep Oil</em></span>
									</dt>
									<dd>
										<span class="com_price">
											<em class="num">320,000</em><em class="unit">원</em>
										</span>
									</dd>
								</dl>
							</li>
						</ul>
					</div>
				</li>
				<li>
					<div class="com_inner">
						<div class="new_tit_area">
							<div class="tit"><span>자동차</span></div>
							<div class="total_price">
								<span>합계</span><em class="num">560,000</em><em class="unit">원</em>
							</div>
						</div>
						<ul class="list_type_02">
							<li>
								<dl>
									<dt>
										<strong>3일</strong>
										<div>
											<em>아파트관리비</em>
										</div>
										<span>
											<span>올라운드카드</span>
										</span>
									</dt>
									<dd>
										<span class="com_price">
											<em class="num">320,000</em><em class="unit">원</em>
										</span>
									</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt>
										<strong>6일</strong>
										<div>
											<em>삼천리도시가스</em>
										</div>
										<span>
											<span>롯데하이마트 프리미엄 DC카드</span>
										</span>
									</dt>
									<dd>
										<span class="com_price">
											<em class="num">320,000</em><em class="unit">원</em>
										</span>
									</dd>
								</dl>
							</li>
						</ul>
					</div>
				</li>
				-->
			</ul>
			<!-- <div class="com_inner">
				<div class="com_btn_area02"><a href="javascript:void(0);" class="com_btn_more"><span>더보기</span></a></div>
			</div> -->
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import '@/assets/js/rMateChartH5/JS/rMateFunction.js'

import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import {dateFormat, monthAdd} from '@/utils/date'
import {amountCountAnimate} from '@/utils/jUtils'

export default {
    name : "LCIP1003",
    data: () => {
        return {
			cusNb: '',              // 마이데이터고객번호
			ariaLabelText: '',		// 접근성 라벨

            monPrev: false,         // 이전달 조회
            monNext: false,         // 다음달 조회
            basYm: null,            // 조회 기준년월 YYYYMM
            basYy: null,            // 조회 기준년도 YYYY
            basMm: null,            // 조회 기준월   MM
            befBasYm: null,         // 조회 기준년월 YYYYMM (현재년월의 지난달)
            befBasYy: null,         // 조회 기준년도 YYYY   (현재년월의 지난달)
			befBasMm: null,         // 조회 기준월   MM     (현재년월의 지난달)

			varXpsAm: 0,			// 변동지출금액
            varXpsList    : [], 	// 고정변동지출구분별지출실적목록
            varXpsBrkList : [], 	// 고정변동지출구분별지출내역목록
        }
    },
    computed : {
    },
    created() {
		this.cusNb = this.getUserInfo("mydtCusno")
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent() {
			this.basYm = this.params.pBasYm
			this.fn_moveMonth('')
            this.getData();
        },
        getData() {
            const config = {
                url: '/lc/ip/03ra1', // 인터페이스ID: IF-MOB-PFM-LCA03, 서비스코드: PFMLCIP03RA1
                data: {
                    "mydtCusno": this.cusNb,
                    "basYm": this.basYm
                }
            }
            apiService.call(config).then(response =>{
				// console.log('response', JSON.parse(JSON.stringify(response)))
				this.varXpsAm = response.totXpsAm || 0 				// 변동지출금액
                this.varXpsList = response.varXpsList || []    		// 변동지출실적목록
				let varXpsBrkList = response.varXpsBrkList || [] 	// 변동지출내역목록

				/*
				this.varXpsAm = 123456789

				this.varXpsList = [
					{ rzsCtgrId: '111', rzsCtgrnm: '온라인쇼핑', xpsTtAm: 210001 },
					{ rzsCtgrId: '222', rzsCtgrnm: '자동차', xpsTtAm: 210002 },
					{ rzsCtgrId: '333', rzsCtgrnm: '식비', xpsTtAm: 210003 },
					{ rzsCtgrId: '444', rzsCtgrnm: '생활/마트', xpsTtAm: 210005 },
					{ rzsCtgrId: '555', rzsCtgrnm: '미분류', xpsTtAm: 210004 },
				]

				varXpsBrkList = [
					{ trDt: '20221001', prcMchtnm: '쿠팡1(쿠페이)', cdcoCdWrsnm: '카드A', xpsCtgrId: '111', rzsCtgrnm: '온라인쇼핑', tram: 100 },
					{ trDt: '20221002', prcMchtnm: '쿠팡2(쿠페이)', cdcoCdWrsnm: '   카드B', xpsCtgrId: '111', rzsCtgrnm: '온라인쇼핑', tram: 100 },
					{ trDt: '20221003', prcMchtnm: '쿠팡3(쿠페이)', cdcoCdWrsnm: '카드A', xpsCtgrId: '111', rzsCtgrnm: '온라인쇼핑', tram: 100 },
					{ trDt: '20221004', prcMchtnm: '쿠팡4(쿠페이)', cdcoCdWrsnm: '   카드B', xpsCtgrId: '111', rzsCtgrnm: '온라인쇼핑', tram: 100 },
					{ trDt: '20221005', prcMchtnm: '쿠팡5(쿠페이)', cdcoCdWrsnm: '카드A', xpsCtgrId: '111', rzsCtgrnm: '온라인쇼핑', tram: 100 },

					{ trDt: '20221001', prcMchtnm: '쿠팡6(쿠페이)', cdcoCdWrsnm: '카드A', xpsCtgrId: '333', rzsCtgrnm: '온라인쇼핑', tram: 100 },
					{ trDt: '20221002', prcMchtnm: '쿠팡7(쿠페이)', cdcoCdWrsnm: '카드B', xpsCtgrId: '222', rzsCtgrnm: '온라인쇼핑', tram: 100 },
					{ trDt: '20221003', prcMchtnm: '쿠팡8(쿠페이)', cdcoCdWrsnm: '카드A', xpsCtgrId: '222', rzsCtgrnm: '온라인쇼핑', tram: 100 },
					{ trDt: '20221004', prcMchtnm: '쿠팡9(쿠페이)', cdcoCdWrsnm: '카드B', xpsCtgrId: '333', rzsCtgrnm: '온라인쇼핑', tram: 100 },
					{ trDt: '20221005', prcMchtnm: '쿠팡10(쿠페이)', cdcoCdWrsnm: '카드A', xpsCtgrId: '333', rzsCtgrnm: '온라인쇼핑', tram: 100 },

					{ trDt: '20221001', prcMchtnm: '쿠팡11(쿠페이)', cdcoCdWrsnm: '카드A', xpsCtgrId: '444', rzsCtgrnm: '온라인쇼핑', tram: 100 },
					{ trDt: '20221002', prcMchtnm: '쿠팡12(쿠페이)', cdcoCdWrsnm: '카드B', xpsCtgrId: '444', rzsCtgrnm: '온라인쇼핑', tram: 100 },
					{ trDt: '20221003', prcMchtnm: '쿠팡13(쿠페이)', cdcoCdWrsnm: '카드A', xpsCtgrId: '444', rzsCtgrnm: '온라인쇼핑', tram: 100 },
					{ trDt: '20221004', prcMchtnm: '쿠팡14(쿠페이)', cdcoCdWrsnm: '카드B', xpsCtgrId: '444', rzsCtgrnm: '온라인쇼핑', tram: 100 },
					{ trDt: '20221005', prcMchtnm: '쿠팡15(쿠페이)', cdcoCdWrsnm: '카드A', xpsCtgrId: '555', rzsCtgrnm: '온라인쇼핑', tram: 100 },
				]
				*/

				this.ariaLabelText = this.getAriaLabelText(this.varXpsList, this.varXpsAm)
				
				if (varXpsBrkList && varXpsBrkList.length > 0) {
					for (let i =0; i < varXpsBrkList.length; i ++) {
                        let prcMchtnm   = varXpsBrkList[i].prcMchtnm || '' 
                        let cdcoCdWrsnm = varXpsBrkList[i].cdcoCdWrsnm || ''

                        prcMchtnm = prcMchtnm.trim()
                        cdcoCdWrsnm = cdcoCdWrsnm.trim()

                        varXpsBrkList[i].prcMchtnm = prcMchtnm
                        varXpsBrkList[i].cdcoCdWrsnm = cdcoCdWrsnm
					}
				}

				this.varXpsBrkList = varXpsBrkList

				// data-count 애니메이션 효과
				amountCountAnimate('counter', this.varXpsAm)

				this.$nextTick(()=>{
					this.makeChart()
				})
			})
		},
		getAriaLabelText(varXpsList, varXpsAm) {
			if (varXpsList.length == 0 || varXpsAm == 0) return ''

			// 변동지출 현황 - 온라인쇼핑 30%, 자동차 10%, 식비 10%, 생활마트 10%, 미분류 10% 입니다.
			let ariaLabelText = '변동지출 현황 - '
			
			for (let i = 0; i < varXpsList.length; i++) {
				if (i > 0) ariaLabelText += ', '
				
				ariaLabelText += varXpsList[i].rzsCtgrnm + ' '
				ariaLabelText += Math.round(varXpsList[i].xpsTtAm / varXpsAm * 100 * 10) / 10 + '%'
			}

			ariaLabelText += ' 입니다.'

			return ariaLabelText
		},
		makeChart() {
			// rMateChart 를 생성합니다.
			// 파라메터 (순서대로)
			//  1. 차트의 id ( 임의로 지정하십시오. )
			//  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
			//  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
			//  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
			//  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)
			rMateChartH5.create("chart1", "lcip1003ChartHolder", "useContextMenu=false", "100%", "250rem");
			
			// 스트링 형식으로 레이아웃 정의.
			let layoutStr =
			'<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
				// +'<Options>'
				//     +'<Caption text="Annual Report"/>'
				//     +'<Legend useVisibleCheck="true"/>'
				// +'</Options>'
				+'<Pie2DChart innerRadius="0.55" showDataTips="true" selectionMode="single" displayCompleteCallFunction="rMateFunction.lcipRemoveTabindex">'
				/*
				Doughnut2D 차트 생성시에 필요한 Pie2DChart 정의합니다
				showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다.
				innerRadius : PieChart 가운데에 빈 공간을 만듭니다. 유효값 0.1 ~ 0.9 0은 PieChart 1은 차트 사라짐
				*/
					+'<series>'
						+'<Pie2DSeries nameField="rzsCtgrnm" field="xpsTtAm" startAngle="-90" renderDirection="clockwise" color="#fff" >'/*labelPosition="inside"*/
							+'<fills>'
								+'<SolidColor color="#57c9ae"/>' /* 생활 */
								+'<SolidColor color="#668ee2"/>' /* 금융 */
								+'<SolidColor color="#19b9be"/>' /* 보험 */
								+'<SolidColor color="#94e39b"/>' /* 구독 */
								+'<SolidColor color="#ca7ae8"/>' /* 기타 */
							+'</fills>'
							/* Pie2DChart 정의 후 Pie2DSeries labelPosition="inside"정의합니다 */
							+'<showDataEffect>'
							/* 차트 생성시에 Effect를 주고 싶을 때 shoDataEffect정의합니다 */
								+'<SeriesZoom duration="1000" relativeTo="chart" horizontalFocus="right" />'
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

			// 차트 데이터
			let chartData = [{"expenditure":"온라인쇼핑", "Profit":20},
							{"expenditure":"자동차", "Profit":25},
							{"expenditure":"식비", "Profit":15},
							{"expenditure":"생활·마트", "Profit":10},
							{"expenditure":"미분류", "Profit":7}];
			chartData = this.varXpsList
			
			// rMateChartH5.calls 함수를 이용하여 차트의 준비가 끝나면 실행할 함수를 등록합니다.
			//
			// argument 1 - rMateChartH5.create시 설정한 차트 객체 아이디 값
			// argument 2 - 차트준비가 완료되면 실행할 함수 명(key)과 설정될 전달인자 값(value)
			// 
			// 아래 내용은 
			// 1. 차트 준비가 완료되면 첫 전달인자 값을 가진 차트 객체에 접근하여
			// 2. 두 번째 전달인자 값의 key 명으로 정의된 함수에 value값을 전달인자로 설정하여 실행합니다.
			rMateChartH5.calls("chart1", {
				"setLayout" : layoutStr,
				"setData" : chartData
			});
		},
        btn_moveMonth(dsc) {
            this.fn_moveMonth(dsc);
            this.getData();
        },
        fn_moveMonth(dsc) {
            if (this.monPrev && dsc == "P") {
                this.basYm = monthAdd(-1, this.basYm, "YYYYMM");
            }

            if (this.monNext && dsc == "N") {
                this.basYm = monthAdd(1, this.basYm, "YYYYMM");
            }

            this.basYy = dateFormat(this.basYm, "YYYY");
            this.basMm = dateFormat(this.basYm, "M");

            this.befBasYm = dateFormat(monthAdd(-1, this.basYm), 'YYYYMM'); // 선택한 월의 지난달
            this.befBasYy = dateFormat(this.befBasYm, "YYYY");
            this.befBasMm = dateFormat(this.befBasYm, "M");

            // 다음달 조회 가능여부
            let maxMonth = dateFormat(monthAdd(0), 'YYYYMM');
            this.monNext = this.basYm < maxMonth ? true : false;

            // 이전달 조회 가능여부
            let minMonth = dateFormat(monthAdd(-12), 'YYYYMM');
            this.monPrev = this.basYm > minMonth ? true : false;
        },
        // 차트CSS
        setChartCss(index) {
			let arrCssClass = ['bl_lightcyan', 'bl_blue', 'bl_lightcyan2', 'bl_aqua2' ,'bl_purple2']

            return arrCssClass[index]
        }
    },
    mixins: [
        commonMixin,
        popupMixin
    ]
}
</script>