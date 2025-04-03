<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출분석
* @ 페이지설명 : 지출 > 지출분석 > 지난달 지출 비교
* @ 파일명     : src\views\page\LC\IP\LCIP1002\LCIP1002.vue
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
			<h1>지난달 지출 비교</h1>
		</div>
		<div class="popup_content com_no_bottom">
			<div class="com_inner com_line_type01 com_top_type02">
				<div class="wrap_item_box lcip">
					<div class="graph_box_wrap">
						<div class="top_info_box pb0">
							<p class="subtxt">{{basMm}}월에는</p>
							<div class="bill">
								<span id="counter" class="num counter" :data-count="totXpsAm">{{totXpsAm | numberFilter}}</span><span class="fs22 bold">원을 썼어요.</span>
							</div>
							<template v-if="bmmCmprXpsAm > 0">
								<p class="price_txt_info" role="text">지난달 지출 <em class="num">{{bmmTotXpsAm | numberFilter}}</em>원 (<em class="num">{{bmmCmprXpsAm | numberFilter}}원</em> <span class="price_vary raise"><span>상승</span></span> )</p>
							</template>
							<template v-else-if="bmmCmprXpsAm < 0">
								<p class="price_txt_info" role="text">지난달 지출 <em class="num">{{bmmTotXpsAm | numberFilter}}</em>원 (<em class="num">{{bmmCmprXpsAm | numberFilter}}원</em> <span class="price_vary decrease"><span>하락</span></span> )</p>
							</template>
							<template v-else>
								<p class="price_txt_info" role="text">지난달 지출 <em class="num">{{bmmTotXpsAm | numberFilter}}</em>원 (<em class="num">{{bmmCmprXpsAm | numberFilter}}원</em> <span class="price_vary zero"><span>유지</span></span> )</p>
							</template>
						</div>
						
					</div>
				</div>
			</div>
			<div class="com_inner">
				<div class="chart_price_tit">
					<strong class="com_pop_tit01">정기지출 TOP 5</strong>
					<p class="price_txt_info" role="text">
						이번달 지출 
						<em class="num">{{fxtmXpsAm | numberFilter}}</em>원 (
						<em class="num">{{bmmCmprFxtmXpsAm | numberFilter}}원</em> 
						<span :class="'price_vary ' + bmmCmprFxtmXpsAmVary"><span>{{bmmCmprFxtmXpsAmVaryNm}}</span></span> )
						<!-- <span class="price_vary decrease"><span>하락</span></span> ) -->
						<!-- <span class="price_vary zero"><span>유지</span></span> ) -->
					</p>
				</div>
				<div class="com_box_type01">
					<!-- <p class="chart_sub_txt">[단위: 만원]</p> -->
					<!--<div id="chartHolder1" class="chart_left_bor" aria-hidden="true"></div>-->
					<div id="lcip1002ChartHolder1" class="chart_left_bor" role="img" :aria-label="ariaLabelText1"></div>
				</div>
				<div class="chart_price_tit">
					<strong class="com_pop_tit01">변동지출 TOP 5</strong>
					<p class="price_txt_info" role="text">
						이번달 지출 
						<em class="num">{{varXpsAm | numberFilter}}</em>원 (
						<em class="num">{{bmmCmprVarXpsAm | numberFilter}}원</em> 
						<!-- <span class="price_vary raise"><span>상승</span></span> ) -->
						<span :class="'price_vary ' + bmmCmprVarXpsAmVary"><span>{{bmmCmprVarXpsAmVaryNm}}</span></span> )
						<!-- <span class="price_vary zero"><span>유지</span></span> ) -->
					</p>
				</div>
				<div class="com_box_type01">
					<!--<div id="chartHolder2" class="chart_left_bor" aria-hidden="true"></div>-->
					<div id="lcip1002ChartHolder2" class="chart_left_bor" role="img" :aria-label="ariaLabelText2"></div>
				</div>
			</div>
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
import {dateFormat} from '@/utils/date'
import {amountCountAnimate} from '@/utils/jUtils'

export default {
    name : "LCIP1002",
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
			
			fxtmCtgrList: [],		// 카테고리별정기지출목록
			varCtgrList: [],		// 카테고리별변동지출목록
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
			this.basMm = dateFormat(this.basYm, "M")

            this.getData();
        },
        getData() {
            const config = {
                url: '/lc/ip/02ra1', // 인터페이스ID: IF-MOB-PFM-LCA02, 서비스코드: PFMLCIP02RA1
                data: {
                    "mydtCusno": this.cusNb,
                    "basYm": this.params.pBasYm
                }
            }
            apiService.call(config).then(response =>{
				// console.log('response', JSON.parse(JSON.stringify(response)))
                this.totXpsAm = response.cusMmtpXpsOut.totXpsAm || 0 // 총지출금액
                this.bmmTotXpsAm = response.cusMmtpXpsOut.bmmTotXpsAm || 0 // 전월총지출금액
				this.bmmCmprXpsAm = response.cusMmtpXpsOut.bmmCmprXpsAm || 0 // 전월대비지출금액

				this.fxtmXpsAm = response.cusMmtpXpsOut.fxtmXpsAm || 0 // 정기지출금액
				this.bmmCmprFxtmXpsAm = response.cusMmtpXpsOut.bmmCmprFxtmXpsAm || 0 // 전월대비정기지출금액
				this.varXpsAm = response.cusMmtpXpsOut.varXpsAm || 0 // 변동지출금액
				this.bmmCmprVarXpsAm = response.cusMmtpXpsOut.bmmCmprVarXpsAm || 0 // 전월대비변동지출금액

				if (this.bmmCmprFxtmXpsAm > 0) {
					this.bmmCmprFxtmXpsAmVary = 'raise'
					this.bmmCmprFxtmXpsAmVaryNm = '상승'
				} else if (this.bmmCmprFxtmXpsAm < 0) {
					this.bmmCmprFxtmXpsAmVary = 'decrease'
					this.bmmCmprFxtmXpsAmVaryNm = '하락'
				} else {
					this.bmmCmprFxtmXpsAmVary = 'zero'
					this.bmmCmprFxtmXpsAmVaryNm = '유지'
				}

				if (this.bmmCmprVarXpsAm > 0) {
					this.bmmCmprVarXpsAmVary = 'raise'
					this.bmmCmprVarXpsAmVaryNm = '상승'
				} else if (this.bmmCmprVarXpsAm < 0) {
					this.bmmCmprVarXpsAmVary = 'decrease'
					this.bmmCmprVarXpsAmVaryNm = '하락'
				} else {
					this.bmmCmprVarXpsAmVary = 'zero'
					this.bmmCmprVarXpsAmVaryNm = '유지'
				}

				this.fxtmCtgrList = response.fxtmCtgrList || [] // 카테고리별정기지출목록
				this.varCtgrList = response.varCtgrList || [] // 카테고리별변동지출목록

				this.ariaLabelText1 = this.getAriaLabelText1(this.fxtmCtgrList)
				this.ariaLabelText2 = this.getAriaLabelText2(this.varCtgrList)

				// data-count 애니메이션 효과
				amountCountAnimate('counter', this.totXpsAm)
				
				this.$nextTick(()=>{
					this.makeChart1()
					this.makeChart2()
				})
            })
		},
		getAriaLabelText1(list) {
			if (list.length == 0) return ''

			// 정기지출 TOP 5 이번달 지출 - 의료건강 지난달 000 / 이번달 000, 교육 지난달 000 / 이번달 000, 교통 지난달 000 / 이번달 000, 주거통신 지난달 000 / 이번달 000, 금융 지난달 000 / 이번달 000 입니다.
			let ariaLabelText1 = '정기지출 TOP 5 - '

			for (let i = 0; i < list.length; i++) {
				if (i > 0) ariaLabelText1 += ', '

				ariaLabelText1 += list[i].xpsCtgrNm + ' '
				ariaLabelText1 += '지난달 ' + this.numberFormat(Math.floor(list[i].bmmFxtmXpsAm / 10000 * 10) / 10) + '만원 / '
				ariaLabelText1 += '이번달 ' + this.numberFormat(Math.floor(list[i].fxtmXpsAm / 10000 * 10) / 10) + '만원'
			}

			ariaLabelText1 += ' 입니다.'

			return ariaLabelText1
		},
		getAriaLabelText2(list) {
			if (list.length == 0) return ''
			
			// 변동지출 TOP 5 이번달 지출 - 의료건강 지난달 000 / 이번달 000, 교육 지난달 000 / 이번달 000, 교통 지난달 000 / 이번달 000, 주거통신 지난달 000 / 이번달 000, 금융 지난달 000 / 이번달 000 입니다.
			let ariaLabelText2 = '변동지출 TOP 5 - '

			for (let i = 0; i < list.length; i++) {
				if (i > 0) ariaLabelText2 += ', '

				ariaLabelText2 += list[i].xpsCtgrNm + ' '
				ariaLabelText2 += '지난달 ' + this.numberFormat(Math.floor(list[i].bmmVarXpsAm / 10000 * 10) / 10) + '만원 / '
				ariaLabelText2 += '이번달 ' + this.numberFormat(Math.floor(list[i].varXpsAm / 10000 * 10) / 10) + '만원'
			}

			ariaLabelText2 += ' 입니다.'

			return ariaLabelText2
		},
		makeChart1() {
			// rMateChart 를 생성합니다.
			// 파라메터 (순서대로)
			//  1. 차트의 id ( 임의로 지정하십시오. )
			//  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
			//  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
			//  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
			//  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)
			rMateChartH5.create("lcip1002Chart1", "lcip1002ChartHolder1", "useContextMenu=false", "100%", "450rem")
			
			// 스트링 형식으로 레이아웃 정의.
			let layoutStr =
				'<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
					+'<Stroke id="stroke" color="#111" weight="1"/>'
					+'<Options>'
						// +'<Caption text="Sales by Month"/>'
						+'<Legend defaultMouseOverAction="false" useVisibleCheck="true"/>'
					+'</Options>'
					+'<CurrencyFormatter id="nft" currencySymbol="만원" alignSymbol="right" precision="0" rounding="down"/>'
					+'<Bar2DChart barWidthRatio="0.66" styleName="tickText" gutterBottom="0" showDataTips="false" selectionMode="single" displayCompleteCallFunction="rMateFunction.lcipRemoveTabindex">'
						+'<verticalAxis>'
							+'<CategoryAxis categoryField="xpsCtgrNm"/>'
						+'</verticalAxis>'
						+'<horizontalAxis>' 
							+'<LinearAxis interval="10"/>'
						+'</horizontalAxis>'
						+'<series>'
						/* Bar2D Multi-Sereis 를 생성시에는 Bar2DSeries 여러 개 정의합니다 */
							+'<Bar2DSeries styleName="valueLabelStyle" halfWidthOffset="5" labelPosition="outside" xField="bmmFxtmXpsAm" displayName="지난달" color="#333333" formatter="{nft}" >'
								+'<showDataEffect>'
									+'<SeriesInterpolate/>'
								+'</showDataEffect>'
								+'<fills>'
									+'<SolidColor color="#cccccc"/>'
								+'</fills>'
							+'</Bar2DSeries>'
							+'<Bar2DSeries styleName="valueLabelStyle" halfWidthOffset="5" labelPosition="outside" xField="fxtmXpsAm" displayName="이번달" color="#333333" formatter="{nft}" >'
								+'<showDataEffect>'
									+'<SeriesInterpolate/>'
								+'</showDataEffect>'
								+'<fills>'
								+'<SolidColor color="#57c9ae"/>'
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
						+'.title{'
							+'fontSize:18;'
							+'color:#666'
							+'textAlign:center;'
						+'}'
					+'.title{color:#111; fontSize:14; fontWeight:bold;}'
					+'</Style>'
				+'</rMateChart>'
			
			// 차트 데이터
			let chartData =
				[
					{ "Month":"금융","bmmFxtmXpsAm":25,"fxtmXpsAm":20 },
					{ "Month":"주거<br/>통신","bmmFxtmXpsAm":46,"fxtmXpsAm":40 },
					{ "Month":"교통","bmmFxtmXpsAm":77,"fxtmXpsAm":53 },
					{ "Month":"교육","bmmFxtmXpsAm":70,"fxtmXpsAm":70 },
					{ "Month":"의료<br/>건강","bmmFxtmXpsAm":33,"fxtmXpsAm":48 }
				]
			chartData = []
			for (var i = this.fxtmCtgrList.length - 1; i >= 0; i--) {
				let item = this.fxtmCtgrList[i]
				let newItem = {}
				newItem.xpsCtgrNm = item.xpsCtgrNm.replace(/\//g, '<br/>')
				newItem.fxtmXpsAm = Math.floor(item.fxtmXpsAm / 10000 * 100) / 100
				newItem.bmmFxtmXpsAm = Math.floor(item.bmmFxtmXpsAm / 10000 * 100) / 100
				chartData.push(newItem)
			}
			// console.log('chartData1', chartData)
			// chartData = this.fxtmCtgrList
			
			// rMateChartH5.calls 함수를 이용하여 차트의 준비가 끝나면 실행할 함수를 등록합니다.
			//
			// argument 1 - rMateChartH5.create시 설정한 차트 객체 아이디 값
			// argument 2 - 차트준비가 완료되면 실행할 함수 명(key)과 설정될 전달인자 값(value)
			// 
			// 아래 내용은 
			// 1. 차트 준비가 완료되면 첫 전달인자 값을 가진 차트 객체에 접근하여
			// 2. 두 번째 전달인자 값의 key 명으로 정의된 함수에 value값을 전달인자로 설정하여 실행합니다.
			rMateChartH5.calls("lcip1002Chart1", {
				"setLayout" : layoutStr,
				"setData" : chartData
			})
		},
		makeChart2() {
			// rMateChart 를 생성합니다.
			// 파라메터 (순서대로)
			//  1. 차트의 id ( 임의로 지정하십시오. )
			//  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
			//  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
			//  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
			//  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)
			rMateChartH5.create("lcip1002Chart2", "lcip1002ChartHolder2", "useContextMenu=false", "100%", "450rem")
			
			// 스트링 형식으로 레이아웃 정의.
			let layoutStr =
				'<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
					+'<Stroke id="stroke" color="#111" weight="1"/>'
					+'<Options>'
						// +'<Caption text="Sales by Month"/>'
						+'<Legend defaultMouseOverAction="false" useVisibleCheck="true"/>'
					+'</Options>'
					+'<CurrencyFormatter id="nft" currencySymbol="만원" alignSymbol="right" precision="0" rounding="down"/>'
					+'<Bar2DChart barWidthRatio="0.66" styleName="tickText" gutterBottom="0" showDataTips="false" selectionMode="single" displayCompleteCallFunction="rMateFunction.lcipRemoveTabindex">'
						+'<verticalAxis>'
							+'<CategoryAxis categoryField="xpsCtgrNm"/>'
						+'</verticalAxis>'
						+'<horizontalAxis>' 
							+'<LinearAxis interval="10"/>'
						+'</horizontalAxis>'
						+'<series>'
						/* Bar2D Multi-Sereis 를 생성시에는 Bar2DSeries 여러 개 정의합니다 */
							+'<Bar2DSeries styleName="valueLabelStyle" halfWidthOffset="5" labelPosition="outside" xField="bmmVarXpsAm" displayName="지난달" color="#333333" formatter="{nft}" >'
								+'<showDataEffect>'
									+'<SeriesInterpolate/>'
								+'</showDataEffect>'
								+'<fills>'
									+'<SolidColor color="#cccccc"/>'
								+'</fills>'
							+'</Bar2DSeries>'
							+'<Bar2DSeries styleName="valueLabelStyle" halfWidthOffset="5" labelPosition="outside" xField="varXpsAm" displayName="이번달" color="#333333" formatter="{nft}" >'
								+'<showDataEffect>'
									+'<SeriesInterpolate/>'
								+'</showDataEffect>'
								+'<fills>'
								+'<SolidColor color="#57c9ae"/>'
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
						+'.title{'
							+'fontSize:18;'
							+'color:#666'
							+'textAlign:center;'
						+'}'
					+'.title{color:#111; fontSize:14; fontWeight:bold;}'
					+'</Style>'
				+'</rMateChart>'
			
			// 차트 데이터
			let chartData2 =
				[
					{ "Month":"쇼핑","bmmVarXpsAm":25,"varXpsAm":20 },
					{ "Month":"외식","bmmVarXpsAm":46,"varXpsAm":40 },
					{ "Month":"자동차","bmmVarXpsAm":60,"varXpsAm":53 },
					{ "Month":"여행<br/>숙박","bmmVarXpsAm":77,"varXpsAm":70 },
					{ "Month":"의료<br/>건강","bmmVarXpsAm":33,"varXpsAm":48 }
				]
			chartData2 = []
			for (var i = this.varCtgrList.length - 1; i >= 0; i--) {
				let item = this.varCtgrList[i]
				let newItem = {}
				newItem.xpsCtgrNm = item.xpsCtgrNm.replace(/\//g, '<br/>')
				newItem.varXpsAm = Math.floor(item.varXpsAm / 10000 * 100) / 100
				newItem.bmmVarXpsAm = Math.floor(item.bmmVarXpsAm / 10000 * 100) / 100
				chartData2.push(newItem)
			}
			// console.log('chartData2', chartData2)
			// chartData2 = this.varCtgrList
			
			// rMateChartH5.calls 함수를 이용하여 차트의 준비가 끝나면 실행할 함수를 등록합니다.
			//
			// argument 1 - rMateChartH5.create시 설정한 차트 객체 아이디 값
			// argument 2 - 차트준비가 완료되면 실행할 함수 명(key)과 설정될 전달인자 값(value)
			// 
			// 아래 내용은 
			// 1. 차트 준비가 완료되면 첫 전달인자 값을 가진 차트 객체에 접근하여
			// 2. 두 번째 전달인자 값의 key 명으로 정의된 함수에 value값을 전달인자로 설정하여 실행합니다.
			rMateChartH5.calls("lcip1002Chart2", {
				"setLayout" : layoutStr,
				"setData" : chartData2
			})
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