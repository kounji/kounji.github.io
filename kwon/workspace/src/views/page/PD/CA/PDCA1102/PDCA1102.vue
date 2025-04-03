<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 자동차관리
* @ 페이지설명 : 금융과생활 > 자동차관리 > 자동차정보
* @ 파일명     : src\views\page\PD\CA\PDCA1102\PDCA1102.vue
* @ 작성자     : CS516029
* @ 작성일     : 2021-08-31
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-31              CS516029              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>자동차 정보</h1>
		</div>

        <div class="popup_content com_no_bottom com_bg_type00">
			<div class="new_sub_main_box">
				<div class="com_inner">
					<div class="top_info_box_wrap">
						<div class="top_info_box type02 noBG hasdetail">
							<div class="car_top_wrap">
								<div class="slider_wrap">
									<div class="slide">
										<div class="car_pic">
											<img v-if="pdcaUserAgent == 'else'" src="@/assets/images/icon/car_trax.png" :alt="setAlt(carBrannm, carModlnm, carGrdnm)">
											<img v-else :src="cartpRepImgUrlnm" :alt="setAlt(carBrannm, carModlnm, carGrdnm)">
										</div>
										<div class="car_name">
											{{carBrannm}} {{carModlnm}}<br/>
											{{carGrdnm}}
										</div>
										<span class="car_num">
											<span>{{vhcnoVal}}</span>
										</span>
									</div>
								</div>
							</div>
							<div class="box_toggle_wrap">
								<div class="box_toggle">
									<div class="toggle-box">
										<div data-ui-toggle="box" class="active force">
											<div class="view-box">
												<div class="info">
													<div class="title">모델명</div>
													<div class="text">{{carModlnm}}</div>
												</div>
												<div class="info">
													<div class="title">연식</div>
													<div class="text">{{carMdyrYy}}년형</div>
												</div>
												<div class="info">
													<div class="title">최초등록</div>
													<div class="text">{{fsrgDt | dateFilter('YYYY년 MM월 DD일')}}</div>
												</div>
												<div class="info">
													<div class="title">등급</div>
													<div class="text">{{carGrdnm}}</div>
												</div>
												<div class="info">
													<div class="title">주행거리</div>
													<div class="text">{{odmtrDist | numberFilter}}Km</div>
												</div>
												<div class="info">
													<div class="title">차체형태</div>
													<div class="text">{{carShapeCntn}}</div>
												</div>
												<div class="info">
													<div class="title">엔진</div>
													<div class="text">{{carFuelCntn}} {{carXhstqt | numberFilter}}cc</div>
												</div>
												<div class="info">
													<div class="title">변속기</div>
													<div class="text">{{carTrsmsCntn}}</div>
												</div>
												<div class="info">
													<div class="title">차고지</div>
													<div class="text">{{carbAdr}}</div>
												</div>
											</div>
										</div>
									</div>
								</div> 
							</div>  
						</div>
					</div>
					<div class="cost_wrap mt15">
						<div class="cost_notice">
							<div class="cost" v-html="fn_numberFormatKorAmt2"></div>
							<!-- <div class="cost"><p class="bold fs16 mb15">평균시세</p><span class="num fs24">{{odmtrDistMprAm / 10000 | numberFilter}}</span><span class="fs19">만원</span></div> -->
							<span class="bar"></span>
							<!-- <div class="cost out"><p class="bold fs16 mb15">출시가격</p><span class="num fs24">1</span><span class="fs19">억</span><span class="num fs24">2,416</span><span class="fs19">만원</span></div> -->
                            <div class="cost out" v-html="fn_numberFormatKorAmt"></div>
						</div>
					</div>
					<div class="com_box_type01 mt15">
						<strong class="com_box_tit02 p0">내차 시세</strong>
                        <div class="chart mt20">
                            <!-- 차트가 삽입될 DIV -->
                            <div id="chartHolderPDCA1102" aria-hidden="true"></div>
                            <!-- 차트가 삽입될 DIV -->
                        </div>
					</div>
				</div>
			</div>
        </div>

		<a class="btn_close" @click.prevent="close()" href="javascript:void(0);"><span class="blind">팝업닫기</span></a>
    </div>
</template>
<script>
import apiService from '@/service/apiService'
import appService from '@/service/appService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import {numberFormat} from '@/utils/number'

export default {
    name : "PDCA1102",
    data: () => {
		return {
			// etc
			pdcaUserAgent:"", // 실행플랫폼 (ios, android, else)

			// input
			mydtCusno:"", // 마이데이터고객번호
			vhcnoVal:"",  // 차량번호값

			// output
			vhcin:"",              // 차대번호
			carGrdNo:"",           // 자동차등급번호
			carGrdnm:"",           // 자동차등급명
			odmtrDistDsc:"",       // 주행거리구분코드
			comnCExpl:"",          // 공통코드설명(주행거리구분코드명)
			carCrtpnm:"",          // 자동차차종명
			carModlnm:"",          // 자동차모델명
			carMdyrYy:"",          // 자동차연식년도
			carFuelCntn:"",        // 자동차연료내용
			carXhstqt:0,           // 자동차배기량
			carShapeCntn:"",       // 자동차외형내용
			carTrsmsCntn:"",       // 자동차변속기내용
			carBranNo:"",          // 자동차브랜드번호
			carBrannm:"",          // 자동차브랜드명
			cartpRepImgUrlnm:"",   // 차종대표이미지URL명
			grdNcarPr:0,           // 등급신차가격
			odmtrDist:0,           // 주행거리
			odmtrDistMprAm:0,      // 주행거리시세금액
			odmtrYr1AfFctMprAm:0,  // 주행1년후예측시세금액
			odmtrYr2AfFctMprAm:0,  // 주행2년후예측시세금액
			odmtrYr3AfFctMprAm:0,  // 주행3년후예측시세금액
			fsrgDt:"",             // 최초등록일자
			carbAdr:"",            // 차고지주소
        }
    },
    computed : {
        fn_numberFormatKorAmt() {

            const unit = ['', '만', '억', '조', '경']
            const splitAmt = 10000
            const splitCnt = unit.length

            let resultArray = []
            let resultString = ""

            for(let i = 0; i < splitCnt; i++){
                let rst = (this.grdNcarPr % Math.pow(splitAmt, i+1)) / Math.pow(splitAmt, i)
                rst = Math.floor(rst)

                if(rst > 0){
                    resultArray[i] = rst
                }
            }

            let strIdx = 0  // 최초시작지점에 '원' 추가하기위함

            for(let j = 0; j < resultArray.length; j++){
                if(!resultArray[j])  {
                    strIdx++
                    continue
                }

                if(j === strIdx) {
                    resultString = '<span class="num fs24">'+String(numberFormat(resultArray[j])) +'</span><span class="fs19">'+ unit[j] + '원</span>' + resultString
                } else {
                    resultString = '<span class="num fs24">'+String(numberFormat(resultArray[j])) +'</span>'+ unit[j] + ' ' + resultString
                }
            }

            return '<p class="bold fs16 mb15">출시가격</p>' + resultString
		},
        fn_numberFormatKorAmt2() {

            const unit = ['', '만', '억', '조', '경']
            const splitAmt = 10000
            const splitCnt = unit.length

            let resultArray = []
            let resultString = ""

            for(let i = 0; i < splitCnt; i++){
                let rst = (this.odmtrDistMprAm % Math.pow(splitAmt, i+1)) / Math.pow(splitAmt, i)
                rst = Math.floor(rst)

                if(rst > 0){
                    resultArray[i] = rst
                }
            }

            let strIdx = 0  // 최초시작지점에 '원' 추가하기위함

            for(let j = 0; j < resultArray.length; j++){
                if(!resultArray[j])  {
                    strIdx++
                    continue
                }

                if(j === strIdx) {
                    resultString = '<span class="num fs24">'+String(numberFormat(resultArray[j])) +'</span><span class="fs19">'+ unit[j] + '원</span>' + resultString
                } else {
                    resultString = '<span class="num fs24">'+String(numberFormat(resultArray[j])) +'</span>'+ unit[j] + ' ' + resultString
                }
            }

            return '<p class="bold fs16 mb15">평균시세</p>' + resultString
        },
    },
    methods: {
        initComponent(params) {

			this.vhcnoVal = params.vhcnoVal || ''
			
			this.mydtCusno = this.getUserInfo('mydtCusno')

			// 실행플랫폼
			// chnl : 385 -> 스마트뱅크 , 386 -> 콕뱅크
			if(this.getUserInfo('chnl') === '385') {
				this.pdcaUserAgent = appService.getUserAgent()
			} else if(this.getUserInfo('chnl') === '386') {
				// 기기로 접속하였을 경우는 true
				if((window.$SMNATIVE.getOS('A') == true && window.$SMNATIVE.getOS('I') == false) || (window.$SMNATIVE.getOS('A') == false && window.$SMNATIVE.getOS('I') == true)) {
					this.pdcaUserAgent = 'cok'
				} else {
					this.pdcaUserAgent = 'else'
				}
			}
			
			this.getData()
		},
		getData() {

			const config = {
				url: '/pd/ca/02r01',
				data: {"mydtCusno":this.mydtCusno // 마이데이터고객번호
                      ,"vhcnoVal": this.vhcnoVal  // 차량번호값
					}
			};

			apiService.call(config).then(response => {

				this.vhcin              = response.vhcin              || '' // 차대번호
				this.carGrdNo           = response.carGrdNo           || '' // 자동차등급번호
				this.carGrdnm           = response.carGrdnm           || '' // 자동차등급명
				this.odmtrDistDsc       = response.odmtrDistDsc       || '' // 주행거리구분코드
				this.comnCExpl          = response.comnCExpl          || '' // 공통코드설명(주행거리구분코드명)
				this.carCrtpnm          = response.carCrtpnm          || '' // 자동차차종명
				this.carModlnm          = response.carModlnm          || '' // 자동차모델명
				this.carMdyrYy          = response.carMdyrYy          || '' // 자동차연식년도
				this.carFuelCntn        = response.carFuelCntn        || '' // 자동차연료내용
				this.carXhstqt          = response.carXhstqt          || '' // 자동차배기량
				this.carShapeCntn       = response.carShapeCntn       || '' // 자동차외형내용
				this.carTrsmsCntn       = response.carTrsmsCntn       || '' // 자동차변속기내용
				this.carBranNo          = response.carBranNo          || '' // 자동차브랜드번호
				this.carBrannm          = response.carBrannm          || '' // 자동차브랜드명
				this.cartpRepImgUrlnm   = response.cartpRepImgUrlnm   || '' // 차종대표이미지URL명
				this.grdNcarPr          = response.grdNcarPr          || 0  // 등급신차가격
				this.odmtrDist          = response.odmtrDist          || 0  // 주행거리
				this.odmtrDistMprAm     = response.odmtrDistMprAm     || 0  // 주행거리시세금액
				this.odmtrYr1AfFctMprAm = response.odmtrYr1AfFctMprAm || 0  // 주행1년후예측시세금액
				this.odmtrYr2AfFctMprAm = response.odmtrYr2AfFctMprAm || 0  // 주행2년후예측시세금액
				this.odmtrYr3AfFctMprAm = response.odmtrYr3AfFctMprAm || 0  // 주행3년후예측시세금액
				this.fsrgDt             = response.fsrgDt             || '' // 최초등록일자
				this.carbAdr            = response.carbAdr            || '' // 차고지주소

				// 자동차 슬라이드 및 하단 차트 처리
				this.$nextTick(() => {
					this.getChart()
				})
			});
		},
		setAlt(carBrannm, carModlnm, carGrdnm) {

			return carBrannm + " " + carModlnm + " " + carGrdnm
        },
		getChart() {

			// rMateChart 를 생성합니다.
			// 파라메터 (순서대로)
			//  1. 차트의 id ( 임의로 지정하십시오. )
			//  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
			//  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
			//  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
			//  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)
			rMateChartH5.create("chart1", "chartHolderPDCA1102", "useContextMenu=false", "100%", "200rem");

			// 현재가 기준
			//let maximum = 0
			//let interval = 0 
			
			let gijunAmt = this.odmtrDistMprAm / 10000      // 주행거리시세금액
			let gijunAmt2 = this.odmtrYr3AfFctMprAm / 10000 // 주행3년후예측시세금액

			// 백만원대(1~999)
			// 천만원대(1000~9999)
			// 억대(10000~99999)
			let maximum  = 0
			let minimum  = 0
			let interval = 0

			if(gijunAmt >= 1 && gijunAmt <= 999) {
				maximum = Math.ceil(gijunAmt / 100) * 100
				minimum = Math.floor(gijunAmt2 / 100) * 100
			} else if(gijunAmt >= 1000 && gijunAmt <= 9999) {
				maximum = Math.ceil(gijunAmt / 1000) * 1000
				minimum = Math.floor(gijunAmt2 / 1000) * 1000
			} else if(gijunAmt >= 10000 && gijunAmt <= 99999) {
				maximum = Math.ceil(gijunAmt / 10000) * 10000
				minimum = Math.floor(gijunAmt2 / 10000) * 10000
			}

			if(gijunAmt >= 3000) {
				interval = 500
			} else {
				interval = 200
			}

			let maxinumLength = maximum.toString().length

			// max값을 바로 세팅하면 제일큰값의 O가 짤려보임
			let chartMaxPlusValue = "1"
			for(let i = 0; i<maxinumLength-1; i++) {
				chartMaxPlusValue += '0'
			}

			maximum = maximum + Number(chartMaxPlusValue)
			minimum = minimum - 200

			var layoutStr =
							'<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
								+'<Options>'
                                    +'<Caption text="배경에 이미지 삽입"/>'
                                    +'<SubCaption text="[단위: 만원]" fontSize="12" textAlign="right" color="#111"/>'
								+'</Options>'
								+'<Line2DChart showDataTips="true">'
									+'<horizontalAxis>'
										+'<CategoryAxis categoryField="Month"/>'
									+'</horizontalAxis>'
									+'<verticalAxis >'
										//+'<LinearAxis maximum="6000" id="vAxis" interval="500"/>'
										+'<LinearAxis maximum="' + maximum + '" minimum="' + minimum + '" id="vAxis" interval="' + interval + '"/>'
									+'</verticalAxis>'
									+'<verticalAxisRenderers>'
										+'<Axis3DRenderer axis="{vAxis}" visible="true"/>'
									/* visible속성을 false로 하여 Chart에서는 보이지 않게 합니다 */
								+'</verticalAxisRenderers>'
									+'<series>'
										+'<Line2DSeries yField="Vancouver" displayName="금액" itemRenderer="CircleItemRenderer" radius="6" labelPosition="outside">'
											+'<showDataEffect>'
												+'<SeriesInterpolate/>'
											+'</showDataEffect>'
											+'<lineStroke>'
												+'<Stroke color="#23a0a5" weight="2.5"/>'
											+'</lineStroke>'
											+'<stroke>'
												+'<Stroke color="#23a0a5" weight="3"/>'
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
									// 	+'<CanvasImage source="../rMateChartH5/Assets/Images/chart_background.jpg" maintainAspectRatio="false" alpha="1"/>'
									// 	/*
									// 		Image의 속성으로는
									// 		source : 실제 이미지가 있는 URL경로입니다
									// 		maintainAspectRation : 이미지 원본 비율을 유지할지를 나타냅니다
									// 						True면 고유비율을 유지하려 하고
									// 						False면 차트 크기에 맞춘 사이즈를 갖습니다
									// 		alpha : 이미지의 투명도를 나타 냅니다
									// 	*/
									// +'</backgroundElements>'
								+'</Line2DChart>'
							+'</rMateChart>';

			// 차트 데이터
			var chartData = [{"Month":"현재","Vancouver":this.odmtrDistMprAm / 10000},
				{"Month":"1년","Vancouver":this.odmtrYr1AfFctMprAm / 10000},
				{"Month":"2년","Vancouver":this.odmtrYr2AfFctMprAm / 10000},
				{"Month":"3년","Vancouver":this.odmtrYr3AfFctMprAm / 10000}
				];
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
    },
    mounted() {
		this.initComponent(this.params)
		
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        popupMixin
        ,commonMixin
    ],
}
</script>