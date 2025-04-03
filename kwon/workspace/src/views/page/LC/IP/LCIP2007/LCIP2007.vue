<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출분석
* @ 페이지설명 : 지출 > 지출분석 > 정기지출
* @ 파일명     : src\views\page\LC\IP\LCIP2007\LCIP2007.vue
* @ 작성자     : CS529599
* @ 작성일     : 2022-10-12
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-10-12              CS529599              최초작성
* 2023-08-10              CS533457              상호금융 마이데이터 확대 개발 LC\IP\LCIP1010\LCIP1010.vue -> LC\IP\LCIP2007\LCIP2007.vue 변경
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"><!-- 0803 .mydata2023 클래스 이동-->
		<div class="popup_header">
			<h1>정기지출</h1>
		</div>
		<!-- 데이터 있을때 -->
		<div class="popup_content com_no_bottom" v-show="viewYN == 'Y'"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<div class="new_sub_info expenditure_sub_info pt0">
					<div class="title">
						<div class="text">
							매 달 나가는 돈<br>
							<strong><span class="num counter" :data-count="this.xpsTotXpsAm.totXpsAm">{{this.xpsTotXpsAm.totXpsAm | numberFilter}}</span>원</strong>
						</div>
					</div>
				</div>
				<!-- 차트영역 -->
				<div class="chartArea assetDoughnut mt30">
					<div id="chartHolder3"></div><!-- 1004 접근성 반영 -->
				</div>
				<!--// 차트영역 -->
			</div>

			<hr class="hr02">

			<div class="com_inner">
				<div class="com_box_type01 toggle_list_box2 custom_list" v-for="(xpsCtgrInfo, idx1) in xpsCtgrList" :key="idx1">
					<div data-ui-toggle="box" class="toggle_box_area active close">
						<button type="button" class="view_btn" aria-expanded="false">
							<div class="new_tit_area">
								<div class="tit">
									<span>{{xpsCtgrInfo.xpsCtgrNm}}</span>
									<span class="com_icon_num custom">{{Math.round(xpsCtgrInfo.xpsRto*100)}}%</span>
								</div>
								<span class="total_price">
									<em class="num">{{xpsCtgrInfo.xpsAm | numberFilter}}</em><em class="unit">원</em>
								</span>
							</div>
							<em class="open">열기</em>
							<em class="close">닫기</em>
						</button>
					</div>
					<div class="view_cont expenditure_type">
						<div class="expend_detail" v-for="(dayInfo, idx2) in getXpsDtlList(xpsCtgrInfo.xpsCtgrNm)" :key="idx2">
							<p class="date">{{dayInfo.month}}월 {{dayInfo.day}}일 {{dayInfo.xpsStNm}}</p>
							<ul class="list_type_01">
								<template v-for="(xpsDtlInfo, idx3) in xpsDtlList">
									<template v-if="xpsCtgrInfo.xpsCtgrC == xpsDtlInfo.xpsCtgrC && dayInfo.xpsSt == xpsDtlInfo.xpsSt && dayInfo.trDt == xpsDtlInfo.trDt">
										<li :key="idx3">
											<a href="javascript:void(0);" @click.prevent="openDetailPop(xpsDtlInfo)" role="button">
												<dl>
													<dt>
														<div>
															<i :class="xpsDtlInfo.orgC"><span class="blind">{{xpsDtlInfo.orgNm}}</span></i>
															<em class="prod_name">{{xpsDtlInfo.mchtnm}}</em>
														</div>
													</dt>
													<dd>
														<span class="prod_num">{{xpsDtlInfo.wrsnm}}</span>
													</dd>
													<dd>
														<span class="com_price">
															<em class="num">{{xpsDtlInfo.xpsAm | numberFilter}}</em><em class="unit">원</em>
														</span>
													</dd>
												</dl>
											</a>
										</li>
									</template>
								</template>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<!-- 정기지출 추가 삭제 버튼 -->
			<div class="round_btn_wrap">
				<div class="round_btn">
					<a href="javascript:void(0);" @click.prevent="openPop('LCIP2009')" class="add">정기지출 추가</a> <!--LCIP2009 -> LCIP2010 -->
				</div>
				<div class="round_btn">
					<a href="javascript:void(0);" @click.prevent="openPop('LCIP2008')" class="remove">정기지출 삭제</a> <!--LCIP2008-->
				</div>
			</div>
			<!-- //정기지출 추가 삭제 버튼 -->
		</div>
		<!-- //데이터 있을때 -->
		
		<!-- 데이터 없을때 -->
		<div class="popup_content" v-show="viewYN == 'N'">
			<div class="com_inner">
				<div class="no_data_box no_data_box01 pt20">
					<div class="no_data_list">
						<p class="titH1">매 달 나가는 돈이 없어요</p>
						<span class="txt_sub mt10">
							결제 계좌나 카드를 연결 하거나<br>
							정기지출을 추가해서 현명한 지출 관리하세요.
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="popup_footer fixed" v-show="viewYN == 'N'">
			<div class="btn_full_box">
				<a href="javascript:void(0);" @click.prevent="openPop('COAR2002')" role="button" class="btn btn_mint">정기지출 추가</a> <!-- COAR2002 자산연결 -->
			</div>
		</div>
		<!-- //데이터 없을때 -->
		
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close('reSelect')"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>
import '@/assets/js/rMateChartH5/JS/rMateFunction.js'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import {dateFormat} from '@/utils/date'
import {amountCountAnimate} from '@/utils/jUtils'
import LCFD2003 from '@/views/page/LC/FD/LCFD2003/LCFD2003'
import COAR2002 from '@/views/page/CO/AR/COAR2002/COAR2002'
import LCIP2008 from '@/views/page/LC/IP/LCIP2008/LCIP2008'
import LCIP2009 from '@/views/page/LC/IP/LCIP2009/LCIP2009'
import _ from 'lodash'

export default {
    name : "LCIP2007",
    data: () => {
        return {
			viewYN: '',
            res: {},
            cusNb: '',              // 마이데이터고객번호
            basYm: null,            // 조회 기준년월 YYYYMM
			basDd: null,            // 조회 기준일   DD
			basDt: null,            // 조회 기준일자 YYYYMMDD
			xpsCtgrListView : [],	// 카테고리별지출(상위5개+그외) - 파이차트
			xpsTotXpsAm : [],       // 총지출금액
			xpsCtgr : [],           // 카테고리별 Top5
            xpsCtgrList : [],       // 카테고리별목록
            xpsDtlList : [],        // 지출내역상세
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
			this.basYm = this.params ? this.params.pBasYm : dateFormat(new Date(), "YYYYMM")
			this.basDd = dateFormat(new Date(), "DD")
			this.basDt = dateFormat(this.basYm+this.basDd, "YYYYMMDD")
			
			this.getData()
        },
        getData() {
            const config = {
				url: '/lc/ip/07r01', //인터페이스ID: IP-MOB-PFM-LCIP07R01, 서비스코드: PFMLCIP07R01
                data: {
                    "mydtCusno" : this.cusNb,
					"basYm" : this.basYm,
					"basDt" : this.basDt,
                }
            }
            apiService.call(config).then(response =>{
                console.log('response', JSON.parse(JSON.stringify(response)))
				this.res = response
				
				this.xpsTotXpsAm = response.xpsTotXpsAm || [] // 총지출금액
				//let xpsCtgr = response.xpsCtgr || [] //카테고리별 Top5
				let xpsCtgrList = response.xpsCtgrList || [] //카테고리별목록
				this.xpsDtlList = response.xpsDtlList || [] //지출내역상세

				this.viewYN = this.xpsDtlList.length > 0 ? 'Y' : 'N'
				
				let xpsCtgrListView = []
				let etcCnt = 0
				let etcRto = 0

				for (let i = 0; i < xpsCtgrList.length; i++) {
					if (i < 5) {
						xpsCtgrListView.push({ expenditure: xpsCtgrList[i].xpsCtgrNm, Profit: xpsCtgrList[i].xpsRto  })
					} else {
						etcCnt = etcCnt + 1
						etcRto = etcRto + xpsCtgrList[i].xpsRto
					}
				}
				if (etcCnt > 0) {
					xpsCtgrListView.push({ expenditure: `그 외 ${etcCnt}개`, Profit: etcRto  })
				}

				this.xpsCtgrList = xpsCtgrList
				this.xpsCtgrListView = xpsCtgrListView

				// data-count 애니메이션 효과
				if (this.viewYN == 'Y') amountCountAnimate('counter', this.xpsTotXpsAm.totXpsAm)

                this.$nextTick(()=>{
					this.makeChart()
					this.setData(this.res)
                })
            })
        },
        openPop(viewName) {
			let config = {}
			
			if (viewName == 'COAR2002') {
				config = {
					component: COAR2002,
					params : {}
				}
			}
			else if (viewName == 'LCIP2008') {
				config = {
					component: LCIP2008,
					params : {
                    "mydtCusno" : this.cusNb,
						"basDt" : this.basDt,
					}
				}
			}
			else if (viewName == 'LCIP2009') {
				config = {
					component: LCIP2009,
					params : {
                    "mydtCusno" : this.cusNb,
						"basDt" : this.basDt,
					}
				}
			}

            modalService.openPopup(config).then((response) => {
				if (response === 'complete') {
					this.getData()
				}
				// if(viewName == 'LCIP2008' || viewName == 'LCIP2009'){
				// 	this.getData()
				// }
            })
		},
		setData(data) {
			let xpsCtgrList = data.xpsCtgrList || []
			let xpsDtlList = data.xpsDtlList || []

			this.xpsCtgrList = xpsCtgrList
			this.xpsDtlList = xpsDtlList
		},
		getXpsDtlList(xpsCtgrNm) {
			let dayList = []
			let xpsDtlList = this.xpsDtlList
			let flagTrdt = false

			for (let i = 0; i < xpsDtlList.length; i++) {
				if (xpsCtgrNm != xpsDtlList[i].xpsCtgrNm) continue

				for(let j = 0; j < dayList.length; j++) {
					if (xpsDtlList[i].trDt == dayList[j].trDt && xpsDtlList[i].xpsSt == dayList[j].xpsSt) {
						flagTrdt = true
						break
					}
					else {
						flagTrdt = false
					}
				}
				if(flagTrdt == false) {
					if (xpsDtlList[i].xpsSt == 'EXPSTSC01') {
						dayList.push({ trDt: xpsDtlList[i].trDt, month: Number(xpsDtlList[i].trDt.substr(4, 2)), day: Number(xpsDtlList[i].trDt.substr(6, 2)), xpsSt: 'EXPSTSC01', xpsStNm: '완료' })
					}
					else if (xpsDtlList[i].xpsSt == 'EXPSTSC02') {
						dayList.push({ trDt: xpsDtlList[i].trDt, month: Number(xpsDtlList[i].trDt.substr(4, 2)), day: Number(xpsDtlList[i].trDt.substr(6, 2)), xpsSt: 'EXPSTSC02', xpsStNm: '미확인' })
					}
					else if (xpsDtlList[i].xpsSt == 'EXPSTSC03') {
						dayList.push({ trDt: xpsDtlList[i].trDt, month: Number(xpsDtlList[i].trDt.substr(4, 2)), day: Number(xpsDtlList[i].trDt.substr(6, 2)), xpsSt: 'EXPSTSC03', xpsStNm: '예정' })
					}
					else if (xpsDtlList[i].xpsSt == 'EXPSTSC04') {
						dayList.push({ trDt: xpsDtlList[i].trDt, month: Number(xpsDtlList[i].trDt.substr(4, 2)), day: Number(xpsDtlList[i].trDt.substr(6, 2)), xpsSt: 'EXPSTSC04', xpsStNm: '해당없음' })
					}
				}
			}
			dayList = _.orderBy(dayList, 'xpsSt', 'asc')
			dayList = _.chain(dayList).orderBy('trDt','desc').value()

			return dayList
			
		},
		// 상세내역(지출) 화면(LCFD2003) 오픈
        openDetailPop(xpsDtlInfo) {
			let paramList = []

			paramList.asetCtgrDsc = '2'
			paramList.dataSrcDsc  = xpsDtlInfo.dataSrcDsc
			paramList.inqKey      = xpsDtlInfo.inqKey
			paramList.reqFlag     = 'LCIP2007'  // LCFD2003에서 팝업닫을 때 close()를 쓰도록 구분하기 위한 flag

			console.log(xpsDtlInfo)

            let param = {
				"paramList" : paramList
            }
            const config = {
                component : LCFD2003,
                param : param,
            }
            modalService.openPopup(config).then(response => {
                if(response === 'complete') {
                    this.getData()
                }
            })
        },
		makeChart() {
			// -----------------------차트 설정 시작-----------------------

			// rMateChart 를 생성합니다.
			// 파라메터 (순서대로)
			//  1. 차트의 id ( 임의로 지정하십시오. )
			//  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
			//  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
			//  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
			//  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)
			rMateChartH5.create("chart1", "chartHolder3", "useContextMenu=false", "100%", "150px");//useContextMenu=false 차트메뉴 숨김
			
			// 스트링 형식으로 레이아웃 정의.
			var layoutStr =
			'<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
					+'<Options>'
						//+'<Caption text="Global Temperature"/>'
						+'<Legend position="right" direction="vertical" useVisibleCheck="true" borderStyle="none" />'// 범례 속성
					+'</Options>'
					+'<CurrencyFormatter id="numFmt" currencySymbol="%" alignSymbol="right" />'
					+'<Pie2DChart innerRadius="0.55" showDataTips="true" selectionMode="single">'
						/*
						Doughnut2D 차트 생성시에 필요한 Pie2DChart 정의합니다
						showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다.
						innerRadius : PieChart 가운데에 빈 공간을 만듭니다. 유효값 0.1 ~ 0.9 0은 PieChart 1은 차트 사라짐
						*/
							+'<series>'
								+'<Pie2DSeries nameField="expenditure" field="Profit" startAngle="270" renderDirection="clockwise" color="#fff">'
									+'<fills>'
										+'<SolidColor color="#06b0b2"/>' /* 주거/통신 */
										+'<SolidColor color="#499ae9"/>' /* 금융 */
										+'<SolidColor color="#8b68e5"/>' /* 보험 */
										+'<SolidColor color="#de7cc1"/>' /* 생활/마트 */
										+'<SolidColor color="#b2b2b2"/>' /* 미분류 */
										+'<SolidColor color="#eeeeee"/>' /* 그 외 5개 */
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

			// 차트 데이터
			// var chartData = [
			// 	{"expenditure":"주거/통신", "Profit":45}, 
			// 	{"expenditure":"금융", "Profit":20},
			// 	{"expenditure":"보험", "Profit":15},
			// 	{"expenditure":"생활/마트", "Profit":10},
			// 	{"expenditure":"미분류", "Profit":7},
			// 	{"expenditure":"그 외 5개", "Profit":3},
			// ];
			var chartData = this.xpsCtgrListView
			
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
			// rMateChartH5.registerTheme(rMateChartH5.themes);
			
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
			// 		document.getElementById("chart1").setTheme(theme);
			// }
			// -----------------------차트 설정 끝 -----------------------
		},
    },
    mixins: [
        commonMixin,
        popupMixin,
    ],
    components: {      
    }
}
</script>