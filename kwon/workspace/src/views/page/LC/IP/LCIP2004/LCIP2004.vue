<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출분석
* @ 페이지설명 : 지출 > 지출분석 > 지출패턴
* @ 파일명     : src\views\page\LC\IP\LCIP2004\LCIP2004.vue
* @ 작성자     : CS533045
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10              CS533045              최초작성
*************************************************************************/
-->
<template>
	<!-- 전체 팝업 시작 -->
	<div id="tab_03" role="tabpanel" class="cmm-tab-panel on">	
		<div class="com_inner">
			<strong class="titH1">주요 소비 활동 시간은<br><em>{{weekTimeTypNm}}</em> 이에요</strong>
			<!-- 차트영역 -->
			<!-- <div id="chartHolder2" class="chart_left_bor mt30" role="img" aria-label="정기지출 TOP 5 이번달 지출 - 의료건강 지난달 000 / 이번달 000, 교육 지난달 000 / 이번달 000, 교통 지난달 000 / 이번달 000, 주거통신 지난달 000 / 이번달 000, 금융 지난달 000 / 이번달 000 입니다."></div> -->
			<div id="chartHolder2" class="chart_left_bor mt30"></div><!-- 1004 접근성 반영 -->
			<!--// 차트영역 -->
		</div>

		<hr class="hr02">

		<div class="com_inner">
			<strong class="titH1">{{xpsChanNm}} 결제 비중이 높아요</strong>
			<!-- 차트영역 -->
			<!-- <div id="chartHolder3" class="mt30" role="img" aria-label="카테고리별 지출 - 쇼핑 지난달 000 / 이번달 000, 외식 지난달 000 / 이번달 000, 교통 지난달 000 / 이번달 000, 생활마트 지난달 000 / 이번달 000 입니다."></div> -->
			<div id="chartHolder3" class="mt30"></div><!-- 1004 접근성 반영 -->
			<!--// 차트영역 -->
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>
/* eslint-disable */
import '@/assets/js/rMateChartH5/JS/rMateFunction.js'

import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import {dateFormat} from '@/utils/date'
import {amountCountAnimate} from '@/utils/jUtils'

export default {
    name : "LCIP2004",
    data: () => {
        return {
			cusNb: '',              // 마이데이터고객번호
			ariaLabelText1: '',		// 접근성 라벨(정기지출)
			ariaLabelText2: '',		// 접근성 라벨(변동지출)
			basYm: '',				// 기준년월
			basMm: '',              // 조회 기준월   MM

            totXpsAm: 0,            // 총지출금액
            bmmTotXpsAm: 0,         // 전월총지출금액
			bmmCmprXpsAm: 0,        // 전월대비지출금액
			fxtmXpsAm: 0,			// 정기지출금액
			bmmCmprFxtmXpsAm: 0,	// 전월대비정기지출금액
			varXpsAm: 0,			// 변동지출금액
			bmmCmprVarXpsAm: 0,		// 전월대비변동지출금액

			bmmCmprFxtmXpsAmVary: '',   	// 전월대비정기지출금액 상승/하락/유지 icon class
			bmmCmprFxtmXpsAmVaryNm: '',		// 전월대비정기지출금액 상승/하락/유지 상승/하락/유지
			bmmCmprVarXpsAmVary: '',		// 전월대비변동지출금액 상승/하락/유지 icon class
			bmmCmprVarXpsAmVaryNm: '',		// 전월대비변동지출금액 상승/하락/유지 상승/하락/유지
			
			weekTimeTypNm : '',				
			xpsChanNm : '',
			xpsWkTimeList: [],		// 일시
			xpsChanList: [],		// 채널
        }
    },
    computed : {
    },
    created() {
		this.cusNb = this.getUserInfo("mydtCusno")
        this.basDt = dateFormat(new Date(), "YYYYMMDD")
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent() {
            this.getData();
        },
        getData() {
            const config = {
                url: '/lc/ip/04r02', 
                data: {
                    "mydtCusno": this.cusNb,
                    "basDt": this.basDt
                }
            }
            apiService.call(config).then(response =>{
				console.log('response', JSON.parse(JSON.stringify(response)))
				
				this.xpsWkTimeList = response.xpsWkTimeList || [] // 일시
				this.xpsChanList = response.xpsChanList || [] // 채널

				let wkCnt = this.xpsWkTimeList.length
				for(let i=0 ; i < wkCnt ; i++)
				{
					if ( this.xpsWkTimeList[i].ord == 1){
						this.weekTimeTypNm = this.xpsWkTimeList[i].weekTimeTypNm
					}					
				}

				let chanCnt = this.xpsChanList.length
				for(let i=0 ; i < chanCnt ; i++)
				{
					if ( this.xpsChanList[i].ord == 1){
						this.xpsChanNm = this.xpsChanList[i].xpsChanNm
					}					
				}				

				// data-count 애니메이션 효과
				//amountCountAnimate('counter', this.totXpsAm)
				amountCountAnimate('counter', 0)
				
				this.$nextTick(()=>{
					this.makeChart1()
					this.makeChart2()
				})
            })
		},
		makeChart1() {
			// -----------------------차트 설정 시작-----------------------
			
			// rMateChart 를 생성합니다.
			// 파라메터 (순서대로)
			//  1. 차트의 id ( 임의로 지정하십시오. )
			//  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
			//  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
			//  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
			//  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)
			rMateChartH5.create("chart2", "chartHolder2", "useContextMenu=false", "100%", "250rem");//useContextMenu=false 차트메뉴 숨김

			const chartData1 =  []
			let sortString = ['평일오전', '평일오후', '평일야간', '주말오전', '주말오후', '주말야간']
			sortString.forEach(d => {
				let findEl = this.xpsWkTimeList?.find(el => el.weekTimeTypNm === d) || {}
				// console.log('d, findEl ### ', d, findEl)
				chartData1.push({ "Month" : findEl?.weekTimeTypNm , "prev" : findEl?.xpsRto, 'ord': findEl?.ord }) 
			})
			// console.log('chartData1', chartData1)
			
			// 스트링 형식으로 레이아웃 정의.
			var layoutStr =
				'<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
					+'<Stroke id="stroke" color="#111" weight="1"/>'
					+'<Options>'
						//+'<Caption text="Sales by Month"/>'
						//+'<Legend defaultMouseOverAction="false" useVisibleCheck="true"/>'
					+'</Options>'
					+'<CurrencyFormatter id="nft" currencySymbol="%" alignSymbol="right"/>'
					/* displayCompleteCallFunction="removeTabindex" */
					+'<Bar2DChart barWidthRatio=".8" styleName="tickText" gutterBottom="0" showDataTips="false" selectionMode="single" dataTipJsFunction="tipTxt" displayCompleteCallFunction="rMateFunction.removeTabindex">'
						+'<verticalAxis>'
							+'<CategoryAxis categoryField="Month"/>'
						+'</verticalAxis>'
						+'<horizontalAxis>' 
							+'<LinearAxis interval="10"/>'
						+'</horizontalAxis>'
						+'<series>'
						/* Bar2D Multi-Sereis 를 생성시에는 Bar2DSeries 여러 개 정의합니다 */
							+'<Bar2DSeries itemRenderer="SemiCircleBarItemRenderer" styleName="valueLabelStyle" halfWidthOffset="5" labelPosition="outside" xField="prev" displayName="지난달" color="#888" formatter="{nft}" >'
								+'<showDataEffect>'
									+'<SeriesInterpolate/>'
								+'</showDataEffect>'
								+'<fills>'
									+'<SolidColor color="#cccccc"/>'
								+'</fills>'
								+'<fills>'
								/* Series안에 색을 채울 때(여러색) fills에 주목 */
								
									+`<SolidColor color="${chartData1[5].ord === 1 ? '#19b9be' : '#eee'}"/>`
									+`<SolidColor color="${chartData1[4].ord === 1 ? '#19b9be' : '#eee'}"/>`
									+`<SolidColor color="${chartData1[3].ord === 1 ? '#19b9be' : '#eee'}"/>`
									+`<SolidColor color="${chartData1[2].ord === 1 ? '#19b9be' : '#eee'}"/>`
									+`<SolidColor color="${chartData1[1].ord === 1 ? '#19b9be' : '#eee'}"/>`
									+`<SolidColor color="${chartData1[0].ord === 1 ? '#19b9be' : '#eee'}"/>`
									// +'<SolidColor color="#eee"/>'
									// +'<SolidColor color="#19b9be"/>'
									// +'<SolidColor color="#eee"/>'
									// +'<SolidColor color="#eee"/>'
									// +'<SolidColor color="#eee"/>'
									/* color:색깔 */
								+'</fills>'
							+'</Bar2DSeries>'
						+'</series>'
						+'<backgroundElements>'
							//+'<GridLines/>'
							+'<AxisMarker>'
								+'<lines>'
									+'<AxisLine value="0" label="" labelAlign="left" stroke="{stroke}"/>'
								+'</lines> '
							+'</AxisMarker>'
						+'</backgroundElements>'
					+'</Bar2DChart>'
					+'<Style>'
						+'.tickText{' 
							+'font-family: "Noto Sans KR";'
							+'fontSize:14;'
							+'color:#333;'
						+'}'
						+'.valueLabelStyle{'
							+'fontSize:12;'
							+'textAlign:center;'
						+'}'
					+'</Style>'
				+'</rMateChart>';
			
			chartData1.reverse()
			// xpsWkTimeList

			

			// 차트 데이터
			// var chartData1 =
			// 	[{"Month":"주말야간","prev":0},
			// 	{"Month":"주말오후","prev":20},
			// 	{"Month":"주말오전","prev":48},
			// 	{"Month":"평일야간","prev":15},
			// 	{"Month":"평일오후","prev":10},
			// 	{"Month":"평일오전","prev":5}];
			
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
				"setData" : chartData1
			});
			
			// function tipTxt(seriesId, seriesName, index, xName, yName, data, values) {
			// return values[1] +"<br>"+ seriesName +' '+ values[0]+'만원';
			// }
			// rMateChartH5.registerTheme(rMateChartH5.themes);
			// function rMateChartH5ChangeTheme1(theme){
			// 	document.getElementById("chart2").setTheme(theme);
			// }
			// function removeTabindex(seriesId){
			// 	$('#'+seriesId).find('div').removeAttr('tabindex');
			// }
			// //최고값에 색넣기
			// function fillJsFunc(seriesId, index, data, values) {
			// 	//console.log('ID == '+seriesId+', index == '+index+', data == '+data+', values == '+values);
			// 	if(values[0] > 45){
			// 		return {"color":"#19b9be"};
			// 	}else{
			// 		return {"color":"#eee"};
			// 	}
			// }
		},
		tipTxt(seriesId, seriesName, index, xName, yName, data, values) {
			return values[1] +"<br>"+ seriesName +' '+ values[0]+'만원';
		},
		rMateChartH5ChangeTheme1(theme){
			document.getElementById("chart2").setTheme(theme);
		},
		removeTabindex(seriesId){
			$('#'+seriesId).find('div').removeAttr('tabindex');
		},
		//최고값에 색넣기
		fillJsFunc(seriesId, index, data, values) {
			//console.log('ID == '+seriesId+', index == '+index+', data == '+data+', values == '+values);
			if(values[0] > 45){
				return {"color":"#19b9be"};
			}else{
				return {"color":"#eee"};
			}
		},
		makeChart2() {
		// -----------------------차트 설정 시작-----------------------

		// rMateChart 를 생성합니다.
		// 파라메터 (순서대로)
		//  1. 차트의 id ( 임의로 지정하십시오. )
		//  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
		//  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
		//  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
		//  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)
		rMateChartH5.create("chart3", "chartHolder3", "", "90%", "140px");// jlee 08/22 90%수정
		
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
									+'<SolidColor color="#fd9d2c"/>' /* 온라인결제 */
									+'<SolidColor color="#fbd82f"/>' /* 오프라인결제 */
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


		const chartData2 =  []
			this.xpsChanList.forEach(d => {
				let expenditureStr = `${d.xpsChanNm}<br><em>${d.xpsCnt}회</em><span class='num ml10'>${d.xpsRto}%</span>`
				chartData2.push({ "expenditure" : expenditureStr , "Profit" : d.xpsRto }) 
			})

		// 차트 데이터
		// var chartData2 = [
		// 	{"expenditure":"온라인 결제<br><em>34회</em><span class='num ml10'>75%</span>", "Profit":75},
		// 	{"expenditure":"오프라인<br><em>16회</em><span class='num ml10'>25%</span>", "Profit":25},
		// ];
		
		// rMateChartH5.calls 함수를 이용하여 차트의 준비가 끝나면 실행할 함수를 등록합니다.
		//
		// argument 1 - rMateChartH5.create시 설정한 차트 객체 아이디 값
		// argument 2 - 차트준비가 완료되면 실행할 함수 명(key)과 설정될 전달인자 값(value)
		// 
		// 아래 내용은 
		// 1. 차트 준비가 완료되면 첫 전달인자 값을 가진 차트 객체에 접근하여
		// 2. 두 번째 전달인자 값의 key 명으로 정의된 함수에 value값을 전달인자로 설정하여 실행합니다.
		rMateChartH5.calls("chart3", {
				"setLayout" : layoutStr,
				"setData" : chartData2
		});
		
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
		rMateChartH5.registerTheme(rMateChartH5.themes);
		},
		rMateChartH5ChangeTheme2(theme){
				document.getElementById("chart3").setTheme(theme);
		},
		//1000단위마다 금액 쉼표처리
		numberFormat(number){
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		}
    },
    mixins: [
        commonMixin,
        popupMixin
    ]
}
</script>