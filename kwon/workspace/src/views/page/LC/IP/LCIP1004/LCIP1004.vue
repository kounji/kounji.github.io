<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출분석
* @ 페이지설명 : 지출 > 지출분석 > 카테고리별 지출 - 업종별 지출 비교
* @ 파일명     : src\views\page\LC\IP\LCIP1004\LCIP1004.vue
* @ 작성자     : CS529599
* @ 작성일     : 2022-10-12
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-10-12              CS529599              최초작성
*************************************************************************/
-->
<template>
	<div id="tab_01" role="tabpanel" class="cmm-tab-panel pt0 on">
		<div class="choice_option">
			<button type="button" :title="ordMode == '0' ? '선택됨' : '선택안됨'" :class="ordMode == '0' ? 'active' : ''" @click.prevent="ordModeChangeEvent('0')">높은 금액순</button>
			<button type="button" :title="ordMode == '1' ? '선택됨' : '선택안됨'" :class="ordMode == '1' ? 'active' : ''" @click.prevent="ordModeChangeEvent('1')">많은 증가순</button>
		</div>
		<div class="com_line_type01 com_top_type02 full_inner_wrap">
			<div class="chart_box">
				<div class="new_tit_area chart_tit">
					<div class="tit ">
						<template v-if="ordMode == '0'">
							<span class="com_point_darkblue mr0">{{maxCtgrNm}}</span>에 가장 많이 썼어요!
						</template>
						<template v-if="ordMode == '1'">
							<template v-if="maxCtgrGbn == '1'">
								<span class="com_point_darkblue mr0">{{maxCtgrNm}}</span>에 지출이 가장 많이 늘었어요!
							</template>
							<template v-if="maxCtgrGbn == '2'">
								지난달 보다 늘어난 지출이 없어요!
							</template>
						</template>
					</div>
					<p class="chart_sub_txt">[단위: 만원]</p>
				</div>
				<div id="lcip1004ChartHolder" role="img" :aria-label="ariaLabelText"></div>
			</div>
		</div>
		<ul class="spend_list">
			<li v-for="(ctgrInfo, index) in ctgrListView" :key="index">
				<!-- AS20000004:카페/베이커리, AS20000011:뷰티/미용, AS2000001616:농업자금 -->
				<template v-if="ctgrInfo.xpsCtgrC == 'AS20000004' || ctgrInfo.xpsCtgrC == 'AS20000011' || ctgrInfo.xpsCtgrC == 'AS2000001616' || ctgrInfo.xpsCtgrC == 'AS20000000' || ctgrInfo.xpsCtgrC == 'AS29999999'">
					<div class="spend_item" style="padding-right:2rem">
						<strong class="spend_name">{{ctgrInfo.xpsCtgrNm}}</strong>
						<span class="spend_price"><em>{{ctgrInfo.xpsAm | numberFilter}}</em>원</span>
						<span :class="'price_sub_txt ' + ctgrInfo.vary" role="text"><span class="blind">{{ctgrInfo.varyNm}}</span><em>{{ctgrInfo.bmmCmprXpsAm | numberFilter}}</em>원</span>
					</div>
				</template>
				<template v-else>
					<a href="javascript:void(0)" role="button" data-popup="slide_popup_01" @click.prevent='ctgrClick(ctgrInfo)'>
						<div class="spend_item">
							<strong class="spend_name">{{ctgrInfo.xpsCtgrNm}}</strong>
							<span class="spend_price"><em>{{ctgrInfo.xpsAm | numberFilter}}</em>원</span>
							<span :class="'price_sub_txt ' + ctgrInfo.vary" role="text"><span class="blind">{{ctgrInfo.varyNm}}</span><em>{{ctgrInfo.bmmCmprXpsAm | numberFilter}}</em>원</span>
						</div>
					</a>
				</template>
			</li>
			<!--
			<li>
				<a href="javascript:void(0)" role="button">
					<div class="spend_item">
						<strong class="spend_name">쇼핑</strong>
						<span class="spend_price"><em>1,100,250,500</em>원</span>
						<span class="price_sub_txt raise"><span class="blind">상승</span><em>1,250,500</em>원</span>
					</div>
				</a>
			</li>
			<li>
				<a href="javascript:void(0)" role="button">
					<div class="spend_item">
						<strong class="spend_name">외식</strong>
						<span class="spend_price"><em>100,250,500</em>원</span>
						<span class="price_sub_txt decrease"><span class="blind">하락</span><em>10,250,500</em>원</span>
					</div>
				</a>
			</li>
			<li>
				<a href="javascript:void(0)" role="button">
					<div class="spend_item">
						<strong class="spend_name">쇼핑</strong>
						<span class="spend_price"><em>112,250,500</em>원</span>
						<span class="price_sub_txt"><span class="blind">유지</span><em>1,250,500</em>원</span>
					</div>
				</a>
			</li>
			<li>
				<a href="javascript:void(0)" role="button">
					<div class="spend_item">
						<strong class="spend_name">외식</strong>
						<span class="spend_price"><em>1,250,500</em>원</span>
						<span class="price_sub_txt"><span class="blind">유지</span><em>1,250,500</em>원</span>
					</div>
				</a>
			</li>
			<li>
				<a href="javascript:void(0)" role="button">
					<div class="spend_item">
						<strong class="spend_name">쇼핑</strong>
						<span class="spend_price"><em>1,250,500</em>원</span>
						<span class="price_sub_txt"><span class="blind">유지</span><em>1,250,500</em>원</span>
					</div>
				</a>
			</li>
			-->
		</ul>
		<div class="com_btn_area02" v-if="moreDisplay == 'Y'">
			<a href="javascript:void(0);" class="com_btn_more" @click.prevent="btnMoreClick()"><span>{{moreMode == 'ALL' ? '전체보기' : '접기'}}</span></a>
		</div>
	</div>
</template>

<script>
import '@/assets/js/rMateChartH5/JS/rMateFunction.js'

import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'

import LCIP1005 from '@/views/page/LC/IP/LCIP1005/LCIP1005'

export default {
    name : "LCIP1004",
    data: () => {
        return {
			cusNb: '', 				// 마이데이터고객번호
			ariaLabelText: '',		// 접근성 라벨

			ordMode: '0', 			// 0:높은금액순, 1:많은증가순
			moreSize: 5, 			// 접기시 보여지는 row
			moreDisplay: 'N', 		// ctgrList 이 moreSize 초과이면 'Y'
			moreMode: 'ALL', 		// ALL:전체보기, MIN:접기
			ctgrList: [], 			// 차트 데이터
			ctgrListView: [], 		// moreMode 에 따른 데이터

			maxCtgrGbn: '', 		// ordMode 1 많은증가순에서 특정 경우 보여질 메시지 구분
			maxCtgrNm: '' 			// 최대 지출 카테고리명
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
            this.getData();
        },
        getData() {
            const config = {
                url: '/lc/ip/04ra1', // 인터페이스ID: IF-MOB-PFM-LCA04, 서비스코드: PFMLCIP04RA1
                data: {
                    "mydtCusno": this.cusNb,
					"basYm": this.params.pBasYm,
					"inqGbnCd": this.ordMode == '0' ? 'XPS_AM_DESC' : 'BMM_CMPR_XPS_AM_DESC'
                }
            }
            apiService.call(config).then(response =>{
				// console.log('response', JSON.parse(JSON.stringify(response)))
				let ctgrList = response.ctgrList || []

				for (let i = 0; i < ctgrList.length; i++) {
					let vary = ''
					let varyNm = ''
					if (ctgrList[i].bmmCmprXpsAm > 0) {
						vary = 'raise'
						varyNm = '상승'
					} else if (ctgrList[i].bmmCmprXpsAm < 0) {
						vary = 'decrease'
						varyNm = '하락'
					} else {
						vary = ''
						varyNm = '유지'
					}
					ctgrList[i].vary = vary
					ctgrList[i].varyNm = varyNm
				}

				// 높은금액순에서 문구
				if (this.ordMode == '0') {
					this.maxCtgrNm = ctgrList.length > 0 ? ctgrList[0].xpsCtgrNm : ''
				}

				// 많은증가순에서 문구
				if (this.ordMode == '1') {
					if (ctgrList.length > 0) {
						this.maxCtgrGbn = ctgrList[0].bmmCmprXpsAm > 0 ? '1' : '2'
						this.maxCtgrNm = this.maxCtgrGbn == '1' ? ctgrList[0].xpsCtgrNm : ''
					} else {
						this.maxCtgrGbn = ''
						this.maxCtgrNm = ''
					}
				}

				// console.log('ctgrList', ctgrList)
				this.moreDisplay = ctgrList.length > this.moreSize ? 'Y' : 'N'
				this.ctgrList = ctgrList
				this.ctgrListView = this.moreDisplay == 'Y' ? this.ctgrList.slice(0, this.moreSize) : this.ctgrList

				this.ariaLabelText = this.getAriaLabelText(ctgrList)

				this.$nextTick(()=>{
					this.makeChart()
				})
			})
		},
		getAriaLabelText(ctgrList) {
			if (ctgrList.length == 0) return ''

			// 카테고리별 지출 - 쇼핑 지난달 000 / 이번달 000, 외식 지난달 000 / 이번달 000, 교통 지난달 000 / 이번달 000, 생활마트 지난달 000 / 이번달 000 입니다.
			let ariaLabelText = '카테고리별 지출 - '

			for (let i = 0; i < ctgrList.length; i++) {
				if (i > 0) ariaLabelText += ', '

				ariaLabelText += ctgrList[i].xpsCtgrNm + ' '
				ariaLabelText += '지난달 ' + this.numberFormat(Math.floor(ctgrList[i].bmmXpsAm / 10000 * 10) / 10) + '만원 / '
				ariaLabelText += '이번달 ' + this.numberFormat(Math.floor(ctgrList[i].xpsAm / 10000 * 10) / 10) + '만원'
			}

			ariaLabelText += ' 입니다.'

			return ariaLabelText
		},
        ordModeChangeEvent(idx) {
			this.ordMode = idx
			this.moreDisplay = 'N'
			this.moreMode = 'ALL'
			this.maxCtgrGbn = ''
			this.maxCtgrNm = ''
			
			this.getData()
		},
		/*
		 * 카테고리 클릭
		 */
		ctgrClick(ctgrInfo) {
			// console.log('ctgrInfo', JSON.stringify(ctgrInfo))
			let param = { basYm: this.params.pBasYm, ctgrInfo: ctgrInfo }
			// console.log('param', JSON.stringify(param))
            const config = {
                params : param,
                renderer : {
                    component : LCIP1005
                }
            }
            modalService.openSlidePagePopup(config).then(() => {
            })
		},
		// 전체보기/접기 클릭
		btnMoreClick() {
			if (this.moreMode == 'ALL') {
				this.moreMode = 'MIN'
				this.ctgrListView = this.ctgrList
			} else {
				this.moreMode = 'ALL'
				this.ctgrListView = this.ctgrList.slice(0, this.moreSize)
			}
		},
		makeChart() {
			// rMateChart 를 생성합니다.
			// 파라메터 (순서대로)
			//  1. 차트의 id ( 임의로 지정하십시오. )
			//  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
			//  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
			//  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
			//  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)
			rMateChartH5.create("chart1", "lcip1004ChartHolder", "useContextMenu=false", "100%", "170rem"); 
			
			// 스트링 형식으로 레이아웃 정의.
			var layoutStr =
				'<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
					+'<Stroke id="stroke" color="#cbcdd6" weight="1"/>'
					+'<Options>'
						+'<Caption text="GDP Growth of the BRICS Countries"/>'
						+'<Legend defaultMouseOverAction="false" />'
					+'</Options>'
					+'<Column2DChart gutterLeft="0" showDataTips="true" columnWidthRatio="0.55" selectionMode="single" dataTipJsFunction="rMateFunction.lcip1004TipTxt" displayCompleteCallFunction="rMateFunction.lcipRemoveTabindex">'
						+'<horizontalAxis>'
							+'<CategoryAxis categoryField="xpsCtgrNm"/>'
						+'</horizontalAxis>'
						+'<verticalAxis>'
							+'<LinearAxis/>'
						+'</verticalAxis>'
						+'<series>'
							+'<Column2DSeries labelPosition="outside" yField="bmmXpsAm" displayName="지난달" showValueLabels="[]">'
								+'<showDataEffect>'
									+'<SeriesInterpolate/>'
								+'</showDataEffect>'
								+'<fills>'
									+'<SolidColor color="#ababab"/>'
								+'</fills>'
							+'</Column2DSeries>'
							+'<Column2DSeries labelPosition="outside" yField="xpsAm" displayName="이번달" showValueLabels="[]">'
								+'<showDataEffect>'
									+'<SeriesInterpolate/>'
								+'</showDataEffect>'
								+'<fills>'
									+'<SolidColor color="#57c9ae"/>'
								+'</fills>'
							+'</Column2DSeries>'
						+'</series>'
						+'<backgroundElements>'
							//+'<GridLines/>'
							+'<AxisMarker>'
							+'<lines>'
							+'<AxisLine value="0" label="" labelAlign="left" stroke="{stroke}"/>'
							+'</lines> '
							+'</AxisMarker>'
						+'</backgroundElements>'
						+'<horizontalAxis>'
							+'<CategoryLinearAxis id="hAxis" padding="0.5" categoryField="xpsCtgrNm"/>'
							/* Scroll_Line_2D챠트 생성시엔 horizontalAxis에 CategoryLinearAxis를 정의해야합니다 */
						+'</horizontalAxis>'
						+'<horizontalAxisRenderers>'
							+'<ScrollableAxisRenderer axis="{hAxis}" scrollPosition="0" visibleItemSize="4"/>'
							/*
							Scroll_Line_2D챠트 생성시엔 horizontalAxisRenderers ScrollableAxisRenderer를 정의해야 합니다
							visibleItemSize : 스크롤 차트가 한번에 표시할 데이터의 개수입니다
							*/
						+'</horizontalAxisRenderers>'
					+'</Column2DChart>'
				+'</rMateChart>';
			
			// 차트 데이터
			var chartData = [{"xpsCtgrNm":"쇼핑", "bmmXpsAm":2.4, "xpsAm":3.1},
				{"xpsCtgrNm":"외식", "bmmXpsAm":3.8, "xpsAm":4.6},
				{"xpsCtgrNm":"교통", "bmmXpsAm":8.1, "xpsAm":9},
				{"xpsCtgrNm":"생활·마트", "bmmXpsAm":5.1, "xpsAm":4},
				{"xpsCtgrNm":"자동차", "bmmXpsAm":2.1, "xpsAm":3.9}];
			chartData = this.ctgrList
			
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
        openPop(viewName) {
            let compName;

            if (viewName == 'LCIP1005') compName = LCIP1005

            let param = { "pBasYm" : this.params.pBasYm }
            const config = {
                component: compName,
                params : param
            }
            modalService.openPopup(config).then(() => {
            })
        },
		//1000단위마다 금액 쉼표처리
		numberFormat(number){
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},
    },
    mixins: [
        commonMixin,
        popupMixin
    ]
}
</script>