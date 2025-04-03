<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 자산진단
* @ 페이지설명 : 자산 > 자산진단 > 계좌별 예상잔액 
* @ 파일명     : src\views\page\AS\IP\ASIP2008\ASIP2008.vue
* @ 작성자     : CS533039
* @ 작성일     : 2023-08-28 
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-28              CS533039              최초작성
*************************************************************************/
-->
<template>
	<div class="full_popup renewal mydata2023" id="full_popup_01"><!-- 0803 .mydata2023 클래스 이동-->
		<div class="popup_header">
			<h1>계좌 별 잔액 예상</h1>
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner assetCheck">
				<div class="com_box_type01 custom_box_com_box_list02">
					<div class="list_type_custom">
						<a href="javascript:void(0)" role="button" class="list_item arrow" @click.prevent="fn_selAcc(selItem)">
							<span>
								<span class="tit">{{selItem.acWrsnm}}</span>
								<span class="subtxt">{{selItem.infOfrmnOrgnm}}</span><span class="num">{{selItem.mydtAcno}}</span>
								<span class="accountNum">계좌잔액 <b>{{selItem.acBac | numberFilter}}원</b></span>
							</span>
						</a>
					</div>
				</div>
				<div class="char_box01 chartArea">
					<div id="chartHolder"></div><!-- 1004 접근성 반영 -->
					<!-- 시작일 값 표시 첫 클릭 후 사라짐 jlee 08/28 추가 -->
					<div class="postPop top" style="top:25%;"><!-- 첫번째 값에 따라서 top을 10% ~ 50%로 넣어 주세요. -->
						<span class="day">{{ baseDtTt }}</span>
						<span class="won">{{ balanceItem.dtbyXpcBac | numberFilter }}원</span>
						<!-- Math.abs(balanceItem.dtbyXpcBac) > 1000000 ? balanceItem.dtbyXpcBac / 10000 : balanceItem.dtbyXpcBac -->
					</div>
					<div class="post_popup">
						<div class="com_arrow_box">
							<span class="arrow"></span>
						</div>
						<div class="com_content_box">
							<div>날짜를 선택해 잔액을 확인하세요</div>
						</div>
					</div>
				</div>
				<template v-if="balanceDetailList && balanceDetailList.length > 0">
					<div class="list_gray_box"><!-- 잔액이 0인 경우 .noAmt추가 -->
						<dl>
							<dd class="txt"><em>5월 25일</em> 예상 잔액</dd>
							<dt class="amt">원</dt>
						</dl>
						
					</div>
					<!-- 예상지출 -->
					<p class="accountTit">남은 예상지출</p>
					<div class="custom_box_com_box_list02 noBoard">
						<div class="custom_com_box">
							<div v-for="(item, index) in balanceDetailList" class="df" :key="index">
								<p>
									<strong class="txttotal">{{item.mchtnm}}</strong>
									<span class="num">{{item.expDt | dateFilter('MM.DD')}}</span>
								</p>
								<strong class="com_mumbertotal">
									<span class="num">-{{item.xpsAmt | numberFilter}}</span>
									<span class="unit">원</span>
								</strong>
							</div>
						</div>
					</div>
				</template>
				<!--// 예상지출 -->
				<!-- 예상 지출이 없는 날 이에요 -->
				<template v-else>
					<div class="no_data_box">
						<div class="no_data_list">
							<p>예상 지출이 없는 날 이예요</p>
							<span class="txt_sub">추가할 정기지출이 더 있지 않나요?</span>
							<div class="btn_wrap">
								<a role="button" class="small_btn_gray" @click="fn_openCOAR2002()">계좌연결</a>
							</div>
						</div>
					</div>
				</template>
				<!--// 예상 지출이 없는 날 이에요 -->
				<input type="hidden" ref="selBalanceItem" id="selBalanceItem" @click="selectBalance"/>
			</div>
		</div>
		<a class="btn_close" @click="close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import popupMixin from '@/common/mixins/popupMixin'
// import _ from 'lodash'
import {dateFormat, dayAdd} from '@/utils/date'
import '@/assets_v40/js/rMateChartH5/JS/rMateFunction.js'

import ASAC1007 from '@/views/page/AS/AC/ASAC1007/ASAC1007'
import COAR2002 from '@/views/page/CO/AR/COAR2002/COAR2002'

export default {
    name : "ASIP2008",
    data: () => {
        return {

			baseDt		 : "",	// 기준일자
			baseDtTt     : '', // 툴팁 기준일자
			chartShowHide:{}, // 차트 show hide
			ariaLabelText:"", // 차트 접근성 관련 텍스트

			selItem		  : "",	// ASIP2007에서 전달된 계좌정보
			//infOfrmnOrgCd : "",	// 정보제공자기관코드
			infOfrmnOrgnm : "",	// 정보제공자기관명
			mydtAcno      : "",	// 기준일자
			acWrsnm       : "",	// 계좌상품명
			cusAcBac      : 0,   // 고객계좌잔액

			//selItem		 : "",	// 선택된 계좌정보
			bankList	 : [],	// 계좌 목록
			balanceList	 : [],	// 계좌별 예상 잔액 목록
			balanceDList : [],  // 계좌별 예상 잔액 목록 (가공)
			balanceItem  : {},	// 선택 일자 계좌별 예상 정보
			balanceDetailList: [], // 선택일자 지출 예상 정보 목록
			isDtlYn		 : false,// 상세 리스트 존재 여부
			dtbyBacList  : [], // 일자별 잔액 목록
			selBalanceInfo : '',
			tempCheck    : true, 
        }
    },
    computed : {
	},
	watch: {
	},
    created() {
    },
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
    },
    methods: {
		selectBalance() {
			let tempCheck = true
			this.balanceItem = this.balanceList.find(el => dateFormat(el.inqDt, "MMDD") === this.$refs.selBalanceItem.value)
			this.balanceDetailList = this.balanceList.reduce((acc, el) => {
				if (tempCheck) {
					acc.push(...el.detailList)
					if (dateFormat(el.inqDt, "MMDD") === this.$refs.selBalanceItem.value) {
						tempCheck = false
					}
				}
				return acc
			},[]) || {}
			tempCheck = true
		},
        initComponent(param={}) {
			this.baseDt = dateFormat(new Date(), "YYYYMMDD")
			let tempBaseDtList =  dateFormat(this.baseDt, "MM.DD").split('.')
			this.baseDtTt = parseInt(tempBaseDtList[0])+"월 "+parseInt(tempBaseDtList[1])+"일"
			// console.log('mounted', $('#selBalanceItem'), this.$refs.selBalanceItem)
			// $('#selBalanceItem')[0].addEventListener('change', this.selectBalance)

			this.selItem = param.selItem || ""
			this.bankList = param.bankList || []

			//this.infOfrmnOrgCd = this.params.infOfrmnOrgCd	// 정보제공자기관코드
			this.infOfrmnOrgnm = this.params.infOfrmnOrgnm	// 정보제공자기관명
			this.mydtAcno      = this.params.mydtAcno    	// 계좌번호
			this.acWrsnm       = this.params.acWrsnm	    // 계좌상품명
			this.cusAcBac      = this.params.cusAcBac      // 고객계좌잔액

			this.getData()
        },
        getData(){
			// hidden input 초기화
			// this.$refs.hiddenInqDt.value = ""

			// 초기 상세 데이터 불러오기
			this.$nextTick(() => {
				this.callDtlData()
			})
		},

		// 차트 생성
		getChart() {
			// rMateChart 를 생성합니다.
            // 파라메터 (순서대로)
            //  1. 차트의 id ( 임의로 지정하십시오. )
            //  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
            //  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
            //  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
            //  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)
			//this.chartShowHide = {"display":""}
			rMateChartH5.create("chart1", "chartHolder", "useContextMenu=false", "100%", "100%")

			// 차트 데이터
			var chartData = []
			let maxDtbyXpcBac = Math.max(...this.balanceList.map(el => el.dtbyXpcBac))
			for(const balanceData of this.balanceList) {
				chartData.push({
					"Month":dateFormat(balanceData.inqDt, "MM.DD"),
					"Profit":Math.abs(maxDtbyXpcBac) > 100000 ? balanceData.dtbyXpcBac / 10000 : balanceData.dtbyXpcBac,
					dtbyXpcBac: balanceData.dtbyXpcBac,
				})
			}

			// 스트링 형식으로 레이아웃 정의.
			var layoutStr =
				'<rMateChart backgroundColor="#FFFFFF" borderStyle="none" >'
					+'<Stroke id="stroke1" color="#eee" weight="1"/>'
					+'<Stroke id="stroke2" color="#eee" weight="1"/>'
					+'<Options>'
						//+'<Caption text="Annual Report"/>'
						//+'<SubCaption text="" fontSize="11" textAlign="right"/>'
					+'</Options>'
					+'<NumberFormatter id="numfmt" useThousandsSeparator="true"/>' 
					// Area2DChart gutterLeft="0" showDataTips="true" : 왼쪽 라벨 없애는 속성(?)
					/* displayCompleteCallFunction="removeTabindex" */
					+'<Line2DChart gutterLeft="0" showDataTips="true" displayCompleteCallFunction="rMateFunction.removeTabindex" styleName="axisLabel" dataTipJsFunction="rMateFunction.asip2008DataTipFunc">'
						+'<horizontalAxis>'
							+'<CategoryAxis categoryField="Month" padding="0.5"/>'
						+'</horizontalAxis>'
						+'<verticalAxis>'
							+'<LinearAxis id="vAxis" interval="300" formatter="{numfmt}"/>'
						+'</verticalAxis>'
						+'<verticalAxisRenderers>'
							+'<Axis2DRenderer  axis="{vAxis}"/>'
						+'</verticalAxisRenderers>'
						+'<series>'
							+'<Line2DSeries radius="8" yField="Profit" form="segment" displayName="Profit" itemRenderer="CircleItemRenderer" strokeJsFunction="rMateFunction.strokeJsFunc">'
							/* fillJsFunction : Series의 채우기 Javascript함수로 html에 보내는 데이터값의 범위에 따라 */
							/* html내의 Javascript함수에서 데이터를 판단하고 데이터값에 맞는 색을 return합니다. */
								// 속도 문제로 주석처리
								//+'<showDataEffect>'
								//	+'<SeriesInterpolate duration="1200" elementOffset="60"/>'
								//+'</showDataEffect>'
								/* 컬러값 변경 : 녹색선 + 오피시티 */
								+'<stroke>'//영역선설정
									+'<Stroke color="#06b0b2" weight="2"/>'
								+'</stroke>'
								+'<lineStroke>'//선설정
									+'<Stroke color="#06b0b2" weight="2"/>'
								+'</lineStroke>'
								+'<fills>'//영역설정
									//+'<SolidColor color="#06b0b2" alpha="0.3"/>'
								+'</fills>'
							+'</Line2DSeries>'
						+'</series>'
						+'<horizontalAxis>'
							+'<CategoryLinearAxis id="hAxis" categoryField="Month"/>'
							/* Scroll_Column_2D차트를 생성시엔 verticalAxis에 CategoryLinearAxis를 정의해야합니다 */
						+'</horizontalAxis>'
						+'<horizontalAxisRenderers>'
							+'<ScrollableAxisRenderer axis="{hAxis}" visibleItemSize="7"/>'
							/*
							Scroll_Column_2D차트를 생성시엔 horizontalAxisRenderers ScrollableAxisRenderer를 정의해야 합니다
							*/
						+'</horizontalAxisRenderers>'
						+'<backgroundElements>'
						//+'<GridLines/>'
							+'<AxisMarker>'
								+'<lines>'//날짜별 배경라인 넣기

				for(const balanceData of this.balanceList) {
					layoutStr += `<AxisLine value="${dateFormat(balanceData.inqDt, 'MM.DD')}" label="" stroke="{stroke1}" lineStyle="normal" horizontal="false"/>`
				}
									// +'<AxisLine value="08.02" label="" stroke="{stroke1}" lineStyle="normal" horizontal="false"/>'
									// +'<AxisLine value="08.03" label="" stroke="{stroke1}" lineStyle="normal" horizontal="false"/>'
									// +'<AxisLine value="08.04" label="" stroke="{stroke1}" lineStyle="normal" horizontal="false"/>'
									// +'<AxisLine value="08.05" label="" stroke="{stroke1}" lineStyle="normal" horizontal="false"/>'
									// +'<AxisLine value="08.06" label="" stroke="{stroke1}" lineStyle="normal" horizontal="false"/>'
									// +'<AxisLine value="08.07" label="" stroke="{stroke1}" lineStyle="normal" horizontal="false"/>'
									// +'<AxisLine value="08.08" label="" stroke="{stroke1}" lineStyle="normal" horizontal="false"/>'
									// +'<AxisLine value="08.09" label="" stroke="{stroke1}" lineStyle="normal" horizontal="false"/>'
									// +'<AxisLine value="08.10" label="" stroke="{stroke1}" lineStyle="normal" horizontal="false"/>'
									// +'<AxisLine value="08.11" label="" stroke="{stroke1}" lineStyle="normal" horizontal="false"/>'
									// +'<AxisLine value="08.12" label="" stroke="{stroke1}" lineStyle="normal" horizontal="false"/>'
									// +'<AxisLine value="08.13" label="" stroke="{stroke1}" lineStyle="normal" horizontal="false"/>'
									// +'<AxisLine value="08.14" label="" stroke="{stroke1}" lineStyle="normal" horizontal="false"/>'
									// +'<AxisLine value="08.15" label="" stroke="{stroke1}" lineStyle="normal" horizontal="false"/>'
				layoutStr += '</lines>'
								//+'<lineStroke>'
								//	+'<Stroke color="#eee" weight="1"/>'
								//+'</lineStroke>'
							+'</AxisMarker>'
						+'</backgroundElements>'
						//+'<annotationElements>'
						//	+'<CrossRangeZoomer enableZooming="false" horizontalLabelFormatter="{numfmt}" horizontalStrokeEnable="false"/>'
						//+'</annotationElements>'
					+'</Line2DChart>'
					+'<Style>'
						+'.axisLabel{fontSize:1.2rem;color:#999;}'
						+'.strokeStyle{fontSize:1.2rem;color:#999;}'
					+'</Style>'
				+'</rMateChart>';

			rMateChartH5.calls("chart1", {
				"setLayout" : layoutStr,
				"setData" : chartData
			})
			// 기준일자 툴팁 및 안내 팝업 노출
			$('.post_popup, .postPop').fadeIn(500);
		},

		// 상세 불러오기
		callDtlData() {
			const config = {
				url : "/as/ip/08r01",  // 인터페이스ID: IF-MOB-PFM-ASIP08R01, 서비스코드: PFMAASIP08R01
				data : {
					mydtCusno       : this.getUserInfo("mydtCusno"),
					infOfrmnOrgCd 	: this.selItem.infOfrmnOrgCd,
					mydtAcno 		: this.selItem.mydtAcno,
				}
			}
			apiService.call(config).then(response => {
				this.balanceList = response.balanceList || []
				// console.log(">>> 일자 + 30일 >>> ", dayAdd(30, this.baseDt, "YYYYMMDD"))
				// this.balanceList = this.balanceList.map(el => {
				// 	return {...el, dtbyXpcBac: Number(el.dtbyXpcBac + '0000')}
				// })
				// 상세 데이터 중 과거일자 필터링
				if(this.balanceList.length > 0) {
					if (this.balanceList?.detailList?.length > 0) {
						this.balanceList.detailList = this.balanceList.detailList.filter(d => {
							return d.inqDt >= this.baseDt && d.inqDt <= dayAdd(30, this.baseDt, "YYYYMMDD")
						})
					}
					this.balanceItem = this.balanceList[0]
				}
				setTimeout(this.getChart(), 10)
			})
		},

		// 계좌 선택 슬라이드 오픈
		fn_selAcc(selItem) {
			const config = {
				renderer : {
					component : ASAC1007
				},
				params : {
					selItem : selItem,
					accountList : this.bankList,
				},
			}
			modalService.openSlidePagePopup(config).then(async response => {
				this.selItem = response

				// 선택 계좌에 대한 14일 간 예상 잔액 리스트 재조회
				await this.callDtlData()
				this.$refs.selBalanceItem.value = dateFormat(new Date(), "MMDD")
				this.selectBalance()
			})
		}, 

		// 자산연결
		fn_openCOAR2002() {
			const config = {
				component : COAR2002,
				params : {}
			}
			modalService.openPopup(config)
		},
    },
    mixins: [
        popupMixin
        ,commonMixin
	],
    components: {
    },
}
</script>