<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출분석
* @ 페이지설명 : 지출 > 지출분석 > 정기지출 리포트
* @ 파일명     : src\views\page\LC\IP\LCIP1010\LCIP1010.vue
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
			<h1>정기지출 리포트</h1>
		</div>
			
		<div class="popup_content com_no_bottom">
			<div>
				<div class="select_date tac bottom_line">
                    <button class="cal_btn cal_prev" :class="monPrev ? '' : 'disabled'" :disabled="monPrev ? false : true" aria-label="한달 전 이동" @click.prevent="btn_moveMonth('P')"></button>
                    <a title="년월선택" class="year_month" href="javascript:console.log('월');"><span class="num">{{basYy}}</span>년 <span class="num">{{basMm}}</span>월 </a>
                    <button class="cal_btn cal_next" :class="monNext ? '' : 'disabled'" :disabled="monNext ? false : true" aria-label="한달 후 이동" @click.prevent="btn_moveMonth('N')"></button>
				</div>
			</div>

			<!-- 데이터 있을때 -->
			<div class="com_inner com_line_type01 com_top_type02" v-show="viewYN == 'Y'">
				<div class="wrap_item_box lcip">
					<div class="graph_box_wrap">
						<div class="top_info_box">
							<p class="subtxt">{{basMm}}월 예상금액</p>
							<div class="bill">
								총 <span id="counter" class="num counter" :data-count="totXpcCpsAm">{{totXpcCpsAm | numberFilter}}</span><span class="fs22 bold">원</span>
							</div>
						</div>
						<div class="graph_box">
							<div id="lcip1010ChartHolder" role="img" :aria-label="'정기지출 리포트 ' + basMm + '월'"></div>
							<div class="list_center">
								<ul class="list">
									<template v-for="(xpsCtgrInfo, idx) in xpsCtgrListView">
										<li :class="setChartCss(idx)" :key="idx">
											<span class="pie_tit">{{xpsCtgrInfo.xpsCtgrNm}}</span>
											<span class="pie_p num">{{Math.round(xpsCtgrInfo.xpsRto)}}%</span>
										</li>
									</template>
									<!--
									<li class="bl_lightcyan">
										<span class="pie_tit">생활</span>
										<span class="pie_p num">20%</span>
									</li>
									<li class="bl_orange">
										<span class="pie_tit">금융</span>
										<span class="pie_p num">20%</span>
									</li>
									<li class="bl_red">
										<span class="pie_tit">보험</span>
										<span class="pie_p num">20%</span>
									</li>
									<li class="bl_blue">
										<span class="pie_tit">구독</span>
										<span class="pie_p num">20%</span>
									</li>
									<li class="bl_purple2">
										<span class="pie_tit">기타</span>
										<span class="pie_p num">20%</span>
									</li>
									-->
								</ul>
							</div>
						</div>
						
					</div>

					<div class="com_box_type01 toggle_list_box2 custom_list re_detail_list" v-show="anwXpsDtlList.length > 0 && basYm == todayBasYm">
						<div data-ui-toggle="box" class="toggle_box_area close">
							<button type="button" class="view_btn" aria-expanded="false">
								<div class="new_tit_area">
									<div class="tit"><span class="com_txtinfo_type01">정기지출 {{anwXpsDtlList.length}}건을 발견했어요</span></div>
									
								</div>
								<em class="open">열기</em>
								<em class="close">닫기</em>
							</button>
						</div>
						<ul class="view_cont ">
							<li v-for="(anwXpsDtlInfo, idx) in anwXpsDtlList" :key="idx">
								<i :class="anwXpsDtlInfo.xpsCtgrC"></i>
								<div class="re_flex">
									<strong class="text_info">{{anwXpsDtlInfo.xpsDtlCntn}}</strong>
									<span class="list_price">
										<em>{{anwXpsDtlInfo.xpsAm | numberFilter}}</em>원
									</span>
									<div class="text_info">
										<em>{{Number(anwXpsDtlInfo.trDt.substr(6, 2))}}일</em>
										<em>{{anwXpsDtlInfo.orgnm}}</em>
									</div>
								</div>
							</li>
                            <!--
							<li>
								<i class="AS20000014"></i>
								<div class="re_flex">
									<strong class="text_info">
										가스 7월 - 1건
									</strong>
									<span class="list_price">
										<em>100,000</em>원
									</span>
									<div class="text_info">
										<em>3일</em>
										<em>신한은행</em>
									</div>
								</div>
							</li>
							<li>
								<i class="AS20000013"></i>
								<div class="re_flex">
									<strong class="text_info">
										가스 7월 - 1건
									</strong>
									<span class="list_price">
										<em>100,000</em>원
									</span>
									<div class="text_info">
										<em>3일</em>
										<em>올라운드카드</em>
									</div>
								</div>
							</li>
                            -->
						</ul>
					</div>
					<div class="btn_option">
						<button type="button" class="btn_round_new btn_mid_round bg_mint i_plus wh" @click.prevent="openPop('COAR2002')">자산연결</button>
					</div>
				</div>
			</div>
			
			<div class="com_inner" v-show="viewYN == 'Y'">
				<div class="com_tabmenu_type03 custom_tab">
					<ul role="tablist">
						<li role="tab" aria-controls="tab_01" :aria-selected="viewIndex == 0 ? true : false" :class="viewIndex == 0 ? 'on' : ''" @click.prevent="tabChangeEvent(0)"><a href="javascript:void(0);"><span>카테고리별</span></a></li>
						<li role="tab" aria-controls="tab_02" :aria-selected="viewIndex == 1 ? true : false" :class="viewIndex == 1 ? 'on' : ''" @click.prevent="tabChangeEvent(1)"><a href="javascript:void(0);"><span>예상날짜별</span></a></li>
					</ul>
				</div>

                <template v-if="viewIndex == 0">
                    <LCIP1010 ref="LCIP1010"></LCIP1010>
                </template>
                <template v-if="viewIndex == 1">
                    <LCIP1011 ref="LCIP1011"></LCIP1011>
                </template>
			</div>
			<!-- //데이터 있을때 -->

			<!-- 데이터 없을때 -->
			<div class="no_data_box mt50" v-if="viewYN == 'N'">
				<div class="no_data_list">
					<p>예상 정기지출을<br/>발견하지 못했어요</p>
					<span class="txt_sub">결제 계좌나 카드를 연결하여<br/>매월 정기지출 관리를 받으세요</span>
				</div>
			</div>
			<!-- //데이터 없을때 -->
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
import modalService from '@/service/modalService'
import {dateFormat, monthAdd, dayAdd} from '@/utils/date'
import {amountCountAnimate} from '@/utils/jUtils'

import LCIP1010 from '@/views/page/LC/IP/LCIP1010/LCIP1010'
import LCIP1011 from '@/views/page/LC/IP/LCIP1011/LCIP1011'

import COAR2002 from '@/views/page/CO/AR/COAR2002/COAR2002'

export default {
    name : "LCIP1010TAB",
    data: () => {
        return {
			viewIndex: 0,
			viewYN: '',
            res: {},
            cusNb: '',              // 마이데이터고객번호
            monPrev: false,         // 이전달 조회
            monNext: false,         // 다음달 조회
            basYm: null,            // 조회 기준년월 YYYYMM
            basYy: null,            // 조회 기준년도 YYYY
            basMm: null,            // 조회 기준월   MM
            befBasYm: null,         // 조회 기준년월 YYYYMM (현재년월의 지난달)
            befBasYy: null,         // 조회 기준년도 YYYY   (현재년월의 지난달)
			befBasMm: null,         // 조회 기준월   MM     (현재년월의 지난달)
			initBasYm: '',          // 초기 기준년월
			todayBasYm: '',         // 현재년월

			totXpcCpsAm: 0,			// 예상금액(총지출금액+예상지출금액)
			xpsCtgrList : [],       // 카테고리별지출
			xpsCtgrListView : [],	// 카테고리별지출(상위4개+이외) - 파이차트
            anwXpsDtlList : [],     // 신규정기지출목록
            xpsDtlList : [],        // 지출상태별지출
            xpsStList : [],         // 지출상태별지출
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
			this.basYm = this.params ? this.params.pBasYm : ''
			this.todayBasYm = dateFormat(new Date(), "YYYYMM")

			this.getBasYm()
        },
        /*
         * 기준일 조회
         */
        getBasYm() {
            const config = {
                url: '/lc/ip/11ra1', // 기준일 조회 : 인터페이스ID: IF-MOB-PFM-LCA11, 서비스코드: PFMLCIP11RA1
                data: {
                    "mydtCusno" : this.cusNb
                }
            }
            apiService.call(config).then(response =>{
				if (!this.basYm) this.basYm = response.basYm
				if (!this.basYm) this.basYm = dateFormat(dayAdd(-1, new Date()), "YYYYMM")
				if (!this.initBasYm) this.initBasYm = response.basYm
				if (!this.initBasYm) this.initBasYm = this.basYm
				
				this.fn_moveMonth('')
                this.getData()
            })
        },
        getData() {
            const config = {
                url: '/lc/ip/10ra1', // 인터페이스ID: IF-MOB-PFM-LCA10, 서비스코드: PFMLCIP10RA1
                data: {
                    "mydtCusno" : this.cusNb,
                    "basYm" : this.basYm
                }
            }
            apiService.call(config).then(response =>{
                // console.log('response', JSON.parse(JSON.stringify(response)))
                this.res = response

                let xpsCtgrList = response.xpsCtgrList || []
                this.anwXpsDtlList = response.anwXpsDtlList || []
                this.xpsDtlList = response.xpsDtlList || []
				this.xpsStList = response.xpsStList || []

				this.viewYN = this.xpsDtlList.length > 0 ? 'Y' : 'N'
				
				let sumEtcAm = 0
				let sumEtcEtc = 0
				let totXpsAm = 0
				let xpsCtgrListView = []

				for (let i = 0; i < xpsCtgrList.length; i++) {
					if (i == 0) totXpsAm = xpsCtgrList[i].totXpsAm

					if (xpsCtgrList.length <= 5 || i < 4) {
						// if 목록이 5개 이하이면 '이외' 없이 보여준다. or 상위 4개는 그대로 보여준다.
						xpsCtgrListView.push({ xpsCtgrNm: xpsCtgrList[i].xpsCtgrNm, xpsAm: xpsCtgrList[i].xpsAm, xpsRto: xpsCtgrList[i].xpsRto  })
					} else {
						// 상위 4개를 제외하고 나머지를 '이외'로 묶는다.
						sumEtcAm += xpsCtgrList[i].xpsAm
					}
				}

				sumEtcEtc = totXpsAm != 0 ? Math.floor(sumEtcAm / totXpsAm * 100 * 1000) / 1000 : 0

				if (sumEtcAm > 0) {
					xpsCtgrListView.push({ xpsCtgrNm: '이외', xpsAm: sumEtcAm, xpsRto: sumEtcEtc })
				}

				this.totXpcCpsAm = totXpsAm
				this.xpsCtgrList = xpsCtgrList
				this.xpsCtgrListView = xpsCtgrListView

				// data-count 애니메이션 효과
				if (this.viewYN == 'Y') amountCountAnimate('counter', this.totXpcCpsAm)

                this.$nextTick(()=>{
					this.makeChart()

					if (this.viewIndex == 0) this.$refs.LCIP1010.setData(this.res)
					if (this.viewIndex == 1) this.$refs.LCIP1011.setData(this.res)
                })
            })
        },
		makeChart() {
			// rMateChart 를 생성합니다.
			// 파라메터 (순서대로)
			//  1. 차트의 id ( 임의로 지정하십시오. )
			//  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
			//  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
			//  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
			//  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)
			rMateChartH5.create("lcip1010Chart", "lcip1010ChartHolder", "useContextMenu=false", "100%", "250rem");
			
			// 스트링 형식으로 레이아웃 정의.
			let layoutStr =
			'<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
				
				+'<Pie2DChart innerRadius="0.55" showDataTips="true" selectionMode="single" displayCompleteCallFunction="rMateFunction.lcipRemoveTabindex">'
				/*
				Doughnut2D 차트 생성시에 필요한 Pie2DChart 정의합니다
				showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다.
				innerRadius : PieChart 가운데에 빈 공간을 만듭니다. 유효값 0.1 ~ 0.9 0은 PieChart 1은 차트 사라짐
				*/
					+'<series>'
						+'<Pie2DSeries nameField="xpsCtgrNm" field="xpsAm" startAngle="-90" renderDirection="clockwise" color="#fff">'
							+'<fills>'
								+'<SolidColor color="#57c9ae"/>' /* 생활 */
								+'<SolidColor color="#fdbb68"/>' /* 금융 */
								+'<SolidColor color="#fa7288"/>' /* 보험 */
								+'<SolidColor color="#668ee2"/>' /* 구독 */
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
			let chartData = [{"expenditure":"생활", "Profit":20},
							{"expenditure":"금융", "Profit":25},
							{"expenditure":"보험", "Profit":15},
							{"expenditure":"구독", "Profit":10},
							{"expenditure":"기타", "Profit":5}];
			chartData = this.xpsCtgrListView
			
			// rMateChartH5.calls 함수를 이용하여 차트의 준비가 끝나면 실행할 함수를 등록합니다.
			//
			// argument 1 - rMateChartH5.create시 설정한 차트 객체 아이디 값
			// argument 2 - 차트준비가 완료되면 실행할 함수 명(key)과 설정될 전달인자 값(value)
			// 
			// 아래 내용은 
			// 1. 차트 준비가 완료되면 첫 전달인자 값을 가진 차트 객체에 접근하여
			// 2. 두 번째 전달인자 값의 key 명으로 정의된 함수에 value값을 전달인자로 설정하여 실행합니다.
			rMateChartH5.calls("lcip1010Chart", {
				"setLayout" : layoutStr,
				"setData" : chartData
			});
		},
        // 차트CSS
        setChartCss(index) {
			let arrCssClass = ['bl_lightcyan', 'bl_orange', 'bl_red', 'bl_blue' ,'bl_purple2']

            return arrCssClass[index]
        },
        tabChangeEvent(idx) {
            this.viewIndex = idx

			this.$nextTick(()=>{
				if (idx == 0) this.$refs.LCIP1010.setData(this.res)
				if (idx == 1) this.$refs.LCIP1011.setData(this.res)
			})
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
            let maxMonth = this.initBasYm ? this.initBasYm : dateFormat(monthAdd(0), 'YYYYMM');
            this.monNext = this.basYm < maxMonth ? true : false;

            // 이전달 조회 가능여부
            let minMonth = this.initBasYm ? dateFormat(monthAdd(-12, this.initBasYm), 'YYYYMM') : dateFormat(monthAdd(-12), 'YYYYMM');
            this.monPrev = this.basYm > minMonth ? true : false;
        },
        openPop(viewName) {
            let compName;

            if (viewName == 'COAR2002') compName = COAR2002

            const config = {
                component: compName,
                params : {}
            }
            modalService.openPopup(config).then(() => {
            })
        }
    },
    mixins: [
        commonMixin,
        popupMixin,
    ],
    components: {      
        LCIP1010,
        LCIP1011
    }
}
</script>