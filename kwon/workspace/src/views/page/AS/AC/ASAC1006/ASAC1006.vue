<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 예금
* @ 페이지설명 : 자산 > 예금 > 계좌별 잔액 예측 리포트 > 계좌별 예상잔액 조회
* @ 파일명     : src\views\page\AS\AC\ASAC1006\ASAC1006.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-10-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-10-26              CS528069              최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>계좌별 예상 잔액 조회</h1>
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<div class="custom_list com_box_type01 custom_box_com_box_list02">
					<div class="list_type_custom">
						<a href="javascript:void(0)" role="button" class="list_item arrow" @click.prevent="fn_selAcc(selItem)">
							<i :class="selItem.infOfrmnOrgC"><span class="blind">{{selItem.orgnm}}</span></i>
							<span>
								<strong class="tit">{{selItem.acWrsnm}}</strong>

								<span class="subtxt">{{selItem.orgnm}}</span><span class="num">{{selItem.mydtAcno}}</span>
							</span>
						</a>
					</div>
				</div>
				<div class="char_box01" :style="chartShowHide">
					<!-- 2022-11-16 : 기획 업데이트로 인해 삽입 -->
					<div class="chart_tit">
						<ul class="bl_dot_list">
							<li>날짜를 선택해 예상 잔액을 확인하세요.</li>
						</ul>
					</div>
					<!--// 2022-11-16 : 기획 업데이트로 인해 삽입 -->

					<!-- 차트가 삽입될 DIV -->
					<div id="chartHolder_ASAC1006" role="img" :aria-label="ariaLabelText"></div>

					<!-- 2022-11-16 : 기획 업데이트로 인해 삽입 -->
					<div class="post_popup" v-if="balanceList.length >= 8">
						<div class="com_arrow_box">
							<span class="arrow"></span>
						</div>
						<div class="com_content_box">
							<div>좌우로 차트를 밀면 감춰진 날짜를 볼 수 있어요</div>
						</div>
					</div>
					<!--// 2022-11-16 : 기획 업데이트로 인해 삽입 -->
				</div>
			
				<div class="new_tit_area pb16 pt30 bdb0">
					<strong class="com_pop_tit05">{{balanceItem.inqDt | dateFilter("M월 D일")}} {{inqWeekNm}}요일</strong>
                </div>
				
				<template v-if="isDtlYn">
					<div class="custom_box custom_box_com_box_list02">
						<div class="com_box_type02 custom_com_box">
							<div class="df first wh">
								<strong class="txttotal">통장 잔액</strong>
								<strong class="com_mumbertotal">
									<span class="num">{{balanceItem.cusAcBac | numberFilter}}</span>
									<span class="unit">원</span>
								</strong>
							</div>

							<template v-for="(dtlItem, dtlIdx) of balanceItem.detailList">
								<div class="df wh" :key="'dtl_'+dtlIdx">
									<p>
										<strong class="txttotal">{{dtlItem.xpsDtlCntn}}</strong>
										<span class="num">{{dtlItem.trDt | dateFilter("MM.DD")}}</span>
									</p>
									<strong class="com_mumbertotal">
										<span class="num">-{{dtlItem.casetXpsAm | numberFilter}}</span>
										<span class="unit">원</span>
									</strong>
								</div>
							</template>

							<div class="df end">
								<p>
									<strong class="txttotal">예상잔액</strong>
								</p>
								<strong class="com_mumbertotal">
									<span class="num com_point_darkblue">{{balanceItem.dtbyXpcBac | numberFilter}}</span>
									<span class="unit">원</span>
								</strong>
							</div>
						</div>
					</div>

					<div class="help_box pt15">
						<ul class="bl_dot_list one_register_list m0">
							<li>
								잔액 예상은 전월 기준 당월을 예상한 결과로 실제 잔액과 다를 수 있습니다.
							</li>
						</ul>
					</div>
				</template>

				<template v-else>
					<div class="no_data_box">
						<div class="no_data_list">
							<p>예상 지출이 없는 날 이예요</p>
							<span class="txt_sub">추가할 정기지출이 더 있지 않나요?</span>
							<div class="btn_wrap mt35">
								<a href="javascript:void(0);" role="button" class="com_btn_round" @click.prevent="fn_openCOAR2002()"><span class="btn_plus black">자산연결</span></a>
							</div>
						</div>
					</div>
				</template>
			</div>
		</div>
		<input type="text" id="hideIn_ASAC1006_inqDt" ref="hiddenInqDt" style="display: none;">
		<input type="button" id="hideBtn_ASAC1006" style="display: none;" @click="fn_setDtlData()">
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import popupMixin from '@/common/mixins/popupMixin'
import _ from 'lodash'
import {dateFormat, dayAdd} from '@/utils/date'
import '@/assets/js/rMateChartH5/JS/rMateFunction.js'

import ASAC1007 from '@/views/page/AS/AC/ASAC1007/ASAC1007'
import COAR2002 from '@/views/page/CO/AR/COAR2002/COAR2002'

export default {
    name : "ASAC1006",
    data: () => {
        return {
			baseDt		 : "",	// 기준일자
			chartShowHide:{}, // 차트 show hide
			ariaLabelText:"", // 차트 접근성 관련 텍스트

			selItem		: "",	// 선택된 계좌정보
			bankList	: [],	// 입출금 계좌 목록
			balanceList	: [],	// 계좌별 예상 잔액 목록
			balanceItem : {},	// 선택 일자 계좌별 예상 정보
			inqWeekMap			: [		// 요일 코드 별 명칭
				{code : '1',name : '일'},
				{code : '2',name : '월'},
				{code : '3',name : '화'},
				{code : '4',name : '수'},
				{code : '5',name : '목'},
				{code : '6',name : '금'},
				{code : '7',name : '토'}
			],
			inqWeekNm	: "",

			isDtlYn		: false,// 상세 리스트 존재 여부
        }
    },
    computed : {
    },
    created() {
    },
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent(param={}) {
			this.baseDt = dateFormat(new Date(), "YYYYMMDD")

			this.selItem = param.selItem || ""
			this.bankList = param.bankList || []

            this.getData()
        },
        getData(){
			// hidden input 초기화
			this.$refs.hiddenInqDt.value = ""

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
			rMateChartH5.create("chart_ASAC1006", "chartHolder_ASAC1006", "useContextMenu=false", "100%", "180rem")

			// 차트 데이터
			var chartData = []
			for(const balanceData of this.balanceList) {
				chartData.push({
					"Month":dateFormat(balanceData.inqDt, "MM.DD"),
					// "dtbyXpcBac":numberFormat(balanceData.dtbyXpcBac)+"원"
					"dtbyXpcBac":balanceData.dtbyXpcBac,
					"orgMonth":balanceData.inqDt,
				})
			}

			let curIdx = Number(dateFormat(new Date(), 'MMDD')) - 1
			
			// 스트링 형식으로 레이아웃 정의.
			var layoutStr =
				'<rMateChart backgroundColor="#FFFFFF" borderStyle="none" >'
					+'<Options>'
						// +'<Caption text="Annual Report"/>'
						+'<SubCaption text="" fontSize="11" textAlign="right"/>'
					+'</Options>'
					+'<NumberFormatter id="numfmt" useThousandsSeparator="true"/>' 
					// Area2DChart gutterLeft="0" showDataTips="true" : 왼쪽 라벨 없애는 속성(?)
					+'<Area2DChart gutterLeft="0" showDataTips="true" dataTipJsFunction="rMateFunction.asac1006setUnit" itemClickJsFunction="rMateFunction.asac1006setData" displayCompleteCallFunction="rMateFunction.asac1006removeTabIndex">'
					// +'<Area2DChart gutterLeft="0" showDataTips="true">'
						+'<horizontalAxis>'
							+'<CategoryAxis categoryField="Month" padding="0.5"/>'
						+'</horizontalAxis>'
						+'<verticalAxis>'
							+'<LinearAxis id="vAxis" formatter="{numfmt}"/>'
						+'</verticalAxis>'
						+'<verticalAxisRenderers>'
							+'<Axis2DRenderer  axis="{vAxis}"/>'
						+'</verticalAxisRenderers>'
						+'<series>'
							+'<Area2DSeries labelPosition="none" radius="6" yField="dtbyXpcBac" form="segment" displayName="예상잔액" itemRenderer="CircleItemRenderer" strokeJsFunction="rMateFunction.asac1006setDatatipColor">'
							/* fillJsFunction : Series의 채우기 Javascript함수로 html에 보내는 데이터값의 범위에 따라 */
							/* html내의 Javascript함수에서 데이터를 판단하고 데이터값에 맞는 색을 return합니다. */
								// +'<showDataEffect>'
								// 	+'<SeriesInterpolate/>'
								// +'</showDataEffect>'
								/* 컬러값 변경 : 녹색선 + 오피시티 */
								+'<areaStroke>'
									+'<Stroke color="#23a0a5" weight="0.7"/>'
									// +'<Stroke color="red" weight="0.7"/>'
								+'</areaStroke>'
								+'<areaFill>'
										+'<SolidColor color="#23a0a5" alpha="0.7"/>'
									+'</areaFill>'
							+'</Area2DSeries>'
						+'</series>'
						+'<horizontalAxis>'
							+'<CategoryLinearAxis id="hAxis" categoryField="Month"/>'
							/* Scroll_Column_2D차트를 생성시엔 verticalAxis에 CategoryLinearAxis를 정의해야합니다 */
						+'</horizontalAxis>'
						+'<horizontalAxisRenderers>'
							+'<ScrollableAxisRenderer scrollPosition="'+curIdx+'" axis="{hAxis}" visibleItemSize="7"/>'
							/*
							Scroll_Column_2D차트를 생성시엔 horizontalAxisRenderers ScrollableAxisRenderer를 정의해야 합니다
							*/
						+'</horizontalAxisRenderers>'
					+'</Area2DChart>'
				+'</rMateChart>';

			rMateChartH5.calls("chart_ASAC1006", {
				"setLayout" : layoutStr,
				"setData" : chartData
			})

			this.ariaLabelText = this.getAriaLabelText(this.balanceList)

			this.fn_toolTipFn01()
		},

		getAriaLabelText(balanceList) {
			// 계좌별 예상 잔액 조회 - MM.DD amt, MM.DD amt, MM.DD amt...
			let ariaLabelText = "계좌별 예상 잔액 조회 - "

			for(let i=0; i<balanceList.length; i++) {
				if(i > 0) ariaLabelText += ', '

				ariaLabelText += dateFormat(balanceList[i].inqDt, "MM.DD") + ' '
				ariaLabelText += balanceList[i].dtbyXpcBac
			}

			ariaLabelText += " 지출하였습니다"

			return ariaLabelText
		},

		// 상세 불러오기
		callDtlData() {
			const config = {
				url : "/as/ac/06ra2",
				data : {
					mydtCusno : this.getUserInfo("mydtCusno"),
					infOfrmnOrgC 	: this.selItem.infOfrmnOrgC,
					mydtAcno 		: this.selItem.mydtAcno
					// mydtCusno 		: "1000065467",
					// infOfrmnOrgC 	: "A1AAEQ0000",
					// mydtAcno 		: "33802103101035"
				}
			}
			apiService.call(config).then(response => {
				this.balanceList = response.balanceList || []

				console.log(">>> 일자 + 14일 >>> ", dayAdd(14, this.baseDt, "YYYYMMDD"))

				// 상세 데이터 중 과거일자 필터링
				if(this.balanceList.length > 0) {
					this.balanceList = this.balanceList.filter(d => {
						return d.inqDt >= this.baseDt && d.inqDt <= dayAdd(14, this.baseDt, "YYYYMMDD")
					})
				}

				console.log(">>> 일자별 잔액리스트 확인 >>> ", this.balanceList)

				// detailList 일자별 필터링
				if(this.balanceList.length > 0) {
					for(let i=0; i<this.balanceList.length; i++) {
						if(this.balanceList[i].detailList.length > 0) {
							/**
							 * ex) 11/09 :: 이전 데이터 + 11/09 데이터 , 11/10 :: 이전 데이터 + 11/10 데이터
							 * item.trDt <= this.balanceList[i].inqDt 	:: 거래일자 <= 조회 기준일자 필터링
							 * item.trDt >= this.baseDt 				:: 거래일자 >= 현재일자
							 */
							this.balanceList[i].detailList = this.balanceList[i].detailList.filter(item => {
								return item.trDt <= this.balanceList[i].inqDt && item.trDt >= this.baseDt
							})
						}
					}
				}

				//// last index 선택했다고 가정
				if(this.balanceList.length > 0) {
					//  14일 간 예상 잔액 리스트가 있을 경우
					this.balanceItem = this.balanceList[this.balanceList.length-1]

					this.isDtlYn = this.balanceItem.detailList.length > 0 ? true : false
					this.inqWeekNm = _.find(this.inqWeekMap, d => d.code === this.balanceItem.inqWeek).name

					setTimeout(this.getChart(), 10)
				} else {
					//  14일 간 예상 잔액 리스트가 없을 경우
					this.balanceItem = {}
					this.isDtlYn = false
				}
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
			modalService.openSlidePagePopup(config).then(response => {
				this.selItem = response

				// hidden input 초기화
				this.$refs.hiddenInqDt.value = ""

				// 선택 계좌에 대한 14일 간 예상 잔액 리스트 재조회
				this.callDtlData()
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


		// rMate DataTip 클릭
		fn_setDtlData() {
			this.balanceItem = _.find(this.balanceList, d => d.inqDt === this.$refs.hiddenInqDt.value)
			this.inqWeekNm = _.find(this.inqWeekMap, d => d.code === this.balanceItem.inqWeek).name

			this.isDtlYn = this.balanceItem.detailList.length > 0 ? true : false
		},

		// 툴팁
		fn_toolTipFn01() {
			this.$nextTick(() => {
				$(".renewal .char_box01 .post_popup").delay(3000).fadeOut(400)
			})
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