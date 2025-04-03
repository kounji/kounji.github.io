<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출분석
* @ 페이지설명 : 지출 > 지출분석 > 또래 지출 비교
* @ 파일명     : src\views\page\LC\IP\LCIP1007\LCIP1007.vue
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
			<h1>또래 지출 비교</h1>
		</div> 
		<div class="popup_content com_no_bottom">
			<div class="com_inner">
				<!-- btn box -->
				<div class="custom_box_com_box_list01 mt10">
					<div class="new_tit_area">
						<a href="javascript:void(0);" class="" @click.prevent="peerClick()">
							<span class="unit txt01">또래</span>
							<template v-for="(peer, idx) in peerAttr.split('^')">
								<em :class="'unit txt0'+(idx+2)" :key="idx">{{peer}}</em>
							</template>
							<!--
							<em class="unit txt02">#30대 후반</em>
							<em class="unit txt03">#급여소득</em>
							-->
						</a>
					</div>
				</div>
				<!--// btn box -->
				<!-- 총 지출 금액 비교 -->
				<div class="householdBook mb50">
					<div class="new_tit_area pb15 pt30 bdb0">
						<strong class="com_pop_tit05">총 지출 금액 비교</strong>
					</div>
					<div class="cal_pop_info_wrap com_box_type01 custom_box_com_box_type08">
						<div class="car_pop_bar_area">
							<div class="com_box_type01 goal_warp no-stroke no-shadow">
								<div class="goal_box m0">
									<div class="progressBar_wrapper">
										<div class="progressBar mt5">
											<div class="bar" :style="'width:' + peerCompXpsAm + '%'">
											</div>
										</div>
										<div class="date">
											<div class="st">
												<span class="unit-tit">또래</span>
												<p>
													<em class="num">{{peerXpsAm | numberFilter}}</em><span class="unit">원</span>
												</p>
											</div>
											<div class="ed">
												<span class="unit-tit">나</span>
												<em class="num">{{totXpsAm | numberFilter}}</em><span class="unit">원</span>
											</div>
										</div>
									</div>
								</div>
							</div>	
						</div>
					</div>
				</div>
				<!--// 총 지출 금액 비교 -->
				<div class="new_tit_area pb15 bdb0">
					<strong class="com_pop_tit05">또래와의 결제수단 비교</strong>
					
				</div>
				<div class="com_box_type01">
					<div class="txt ty2">
						{{maxIndNm}} 지출이 <em>{{Math.round(maxIndVal)}}</em>%로 가장 많고 
						<p class="in_txt">
							{{maxPeerIndNm}} 지출이 또래보다 <strong class="com_point_mint"><em>{{Math.round(maxPeerIndVal)}}</em>% 더 많아요.</strong>
						</p>
					</div>
					
					<div class="duel_Pie_chart">
						<div class="chart_box">
							<div class="graph_box">
								<div id="lcip1007ChartHolder2" role="img" aria-label="또래"></div>
								<div class="block_list">
									<ul class="list">
										<template v-for="(peerStlXpsInfo, idx) in peerStlXpsRightList">
											<li :class="setChartCss(peerStlXpsInfo.stlMnsIdVal)" :key="idx">
												<span class="pie_tit">{{peerStlXpsInfo.stlMnsIdNm}}</span>
												<span class="pie_p num">{{Math.round(peerStlXpsInfo.peerXpsRto)}}%</span>
											</li>
										</template>
										<!--
										<li class="bl_lightcyan">
											<span class="pie_tit">카드</span>
											<span class="pie_p num">20%</span>
										</li>
										<li class="bl_orange">
											<span class="pie_tit">페이머니</span>
											<span class="pie_p num">20%</span>
										</li>
										<li class="bl_red">
											<span class="pie_tit">선불카드</span>
											<span class="pie_p num">20%</span>
										</li>
										<li class="bl_blue">
											<span class="pie_tit">기타</span>
											<span class="pie_p num">20%</span>
										</li>
										-->
									</ul>
								</div>
							</div>
						</div>
						<div class="chart_box">
							<div class="graph_box">
								<div id="lcip1007ChartHolder1" role="img" aria-label="나"></div>
								<div class="block_list">
									<ul class="list">
										<template v-for="(peerStlXpsInfo, idx) in peerStlXpsList">
											<li :class="setChartCss(peerStlXpsInfo.stlMnsIdVal)" :key="idx">
												<span class="pie_tit">{{peerStlXpsInfo.stlMnsIdNm}}</span>
												<span class="pie_p num">{{Math.round(peerStlXpsInfo.xpsRto)}}%</span>
											</li>
										</template>
										<!--
										<li class="bl_lightcyan">
											<span class="pie_tit">카드</span>
											<span class="pie_p num">50%</span>
										</li>
										<li class="bl_red">
											<span class="pie_tit">선불카드</span>
											<span class="pie_p num">25%</span>
										</li>
										<li class="bl_blue">
											<span class="pie_tit">기타</span>
											<span class="pie_p num">20%</span>
										</li>
										<li class="bl_orange">
											<span class="pie_tit">페이머니</span>
											<span class="pie_p num">5%</span>
										</li>
										-->
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 카테고리별 지출 비교 -->
				<div class="new_tit_area pb15 bdb0 mt50">
					<strong class="com_pop_tit05">카테고리별 지출 비교</strong>
				</div>
				<div class="com_box_type01 com_box_type07 custom_box_com_box_type09">
					<div class="txt ty2">
						또래 보다 {{maxPeerCtgrNm}} 비중이 가장 높아요
					</div>
					<div class="date">
						<div class="st">
							<span class="unit-tit">또래</span>
						</div>
						<div class="ed">
							<span class="unit-tit">나</span>
						</div>
					</div>
					<div class="chart">
						<template v-for="(peerMmtpCtgrInfo, idx) in peerMmtpCtgrListView">
							<div class="bars case01" :key="idx">
								<div class="bar_txt_tit" v-html="'<span>' + peerMmtpCtgrInfo.xpsCtgrNm2 + '</span>'">
									<!--<span>{{peerMmtpCtgrInfo.xpsCtgrNm2}}</span>-->
								</div>
								<div class="bar bar01">
									<span class="blind">또래</span>
									<div class="side_chart">
										<div :style="'width:' + Math.round(peerMmtpCtgrInfo.peerXpsRto * 10) / 10 + '%'"></div>
									</div>
									<div>
										<strong class="sub_bar num_p">
											<em class="num">{{Math.round(peerMmtpCtgrInfo.peerXpsRto * 10) / 10}}%</em>
										</strong>
										<span class="sub_bar gray_txt">
											<em class="num">{{peerMmtpCtgrInfo.peerXpsAm | numberFilter}}</em>
											<span class="unit">원</span>
										</span>
									</div>
								</div>
								
								<div class="bar bar02">
									<span class="blind">나</span>
									<div class="side_chart">
										<div :style="'width:' + Math.round(peerMmtpCtgrInfo.xpsRto * 10) / 10 + '%'"></div>
									</div>
									<div>
										<strong class="sub_bar num_p">
											<em class="num">{{Math.round(peerMmtpCtgrInfo.xpsRto * 10) / 10}}%</em>
										</strong>
										<span class="sub_bar gray_txt">
											<em class="num">{{peerMmtpCtgrInfo.xpsAm | numberFilter}}</em>
											<span class="unit">원</span>
										</span>
									</div>
								</div>
							</div>
						</template>
						<!--
						<div class="bars case01">
							<div class="bar_txt_tit">
								<span>카페<br/>베이커리</span>
							</div>
							<div class="bar bar01">
								<span class="blind">또래</span>
								<div class="side_chart">
									<div style="width:95%"></div>
								</div>
								<div>
									<strong class="sub_bar num_p">
										<em class="num">15.6%</em>
									</strong>
									<span class="sub_bar gray_txt">
										<em class="num">134,123,456</em>
										<span class="unit">원</span>
									</span>
								</div>
							</div>
							
							<div class="bar bar02">
								<div class="side_chart">
									<div style="width:82.2%"></div>
								</div>
								<div>
									<strong class="sub_bar num_p">
										<em class="num">18.0%</em>
									</strong>
									<span class="sub_bar gray_txt">
										<em class="num">134,123,456</em>
										<span class="unit">원</span>
									</span>
								</div>
							</div>
						</div>
						<div class="bars case01">
							<div class="bar_txt_tit">
								<span>쇼핑</span>
							</div>
							<div class="bar bar01">
								<span class="blind">또래</span>
								<div class="side_chart">
									<div style="width:95%"></div>
								</div>
								<div>
									<strong class="sub_bar num_p">
										<em class="num">15.6%</em>
									</strong>
									<span class="sub_bar gray_txt">
										<em class="num">134,123,456</em>
										<span class="unit">원</span>
									</span>
								</div>
							</div>
							<div class="bar bar02">
								<span class="blind">나</span>
								<div class="side_chart">
									<div style="width:82.2%"></div>
								</div>
								<div>
									<strong class="sub_bar num_p">
										<em class="num">18.0%</em>
									</strong>
									<span class="sub_bar gray_txt">
										<em class="num">134,123,456</em>
										<span class="unit">원</span>
									</span>
								</div>
							</div>
						</div>
						<div class="bars case01">
							<div class="bar_txt_tit">
								<span>가구<br/>침구</span>
							</div>
							<div class="bar bar01">
								<span class="blind">또래</span>
								<div class="side_chart">
									<div style="width:95%"></div>
								</div>
								<div>
									<strong class="sub_bar num_p">
										<em class="num">15.6%</em>
									</strong>
									<span class="sub_bar gray_txt">
										<em class="num">134,123,456</em>
										<span class="unit">원</span>
									</span>
								</div>
							</div>
							
							<div class="bar bar02">
								<span class="blind">나</span>
								<div class="side_chart">
									<div style="width:82.2%"></div>
								</div>
								<div>
									<strong class="sub_bar num_p">
										<em class="num">18.0%</em>
									</strong>
									<span class="sub_bar gray_txt">
										<em class="num">134,123,456</em>
										<span class="unit">원</span>
									</span>
								</div>
							</div>
						</div>
						<div class="bars case01">
							<div class="bar_txt_tit">
								<span>교육</span>
							</div>
							<div class="bar bar01">
								<span class="blind">또래</span>
								<div class="side_chart">
									<div style="width:95%"></div>
								</div>
								<div>
									<strong class="sub_bar num_p">
										<em class="num">15.6%</em>
									</strong>
									<span class="sub_bar gray_txt">
										<em class="num">134,123,456</em>
										<span class="unit">원</span>
									</span>
								</div>
							</div>
							
							<div class="bar bar02">
								<span class="blind">나</span>
								<div class="side_chart">
									<div style="width:82.2%"></div>
								</div>
								<div>
									<strong class="sub_bar num_p">
										<em class="num">18.0%</em>
									</strong>
									<span class="sub_bar gray_txt">
										<em class="num">134,123,456</em>
										<span class="unit">원</span>
									</span>
								</div>
							</div>
						</div>
						<div class="bars case01">
							<div class="bar_txt_tit">
								<span>교육</span>
							</div>
							<div class="bar bar01">
								<span class="blind">또래</span>
								<div class="side_chart">
									<div style="width:95%"></div>
								</div>
								<div>
									<strong class="sub_bar num_p">
										<em class="num">15.6%</em>
									</strong>
									<span class="sub_bar gray_txt">
										<em class="num">134,123,456</em>
										<span class="unit">원</span>
									</span>
								</div>
							</div>
						
							<div class="bar bar02">
								<span class="blind">나</span>
								<div class="side_chart">
									<div style="width:82.2%"></div>
								</div>
								<div>
									<strong class="sub_bar num_p">
										<em class="num">18.0%</em>
									</strong>
									<span class="sub_bar gray_txt">
										<em class="num">134,123,456</em>
										<span class="unit">원</span>
									</span>
								</div>
							</div>
						</div>
						<div class="bars case02">
							<div class="bar_txt_tit">
								<span>교육</span>
							</div>
							<div class="bar bar01">
								<span class="blind">또래</span>
								<div class="side_chart">
									<div style="width:92.3%"></div>
								</div>
								<div>
									<strong class="sub_bar num_p">
										<em class="num">18.0%</em>
									</strong>
									<span class="sub_bar gray_txt">
										<em class="num">134,123,456</em>
										<span class="unit">원</span>
									</span>
								</div>
							</div>
							
							<div class="bar bar02">
								<span class="blind">나</span>
								<div class="side_chart">
									<div style="width:5.6%"></div>
								</div>
								<div>
									<strong class="sub_bar num_p">
										<em class="num">18.0%</em>
									</strong>
									<span class="sub_bar gray_txt">
										<em class="num">134,123,456</em>
										<span class="unit">원</span>
									</span>
								</div>
							</div>
						</div>
						-->
					</div>
					<div class="com_btn_area02" v-if="moreDisplay == 'Y'">
						<a href="javascript:void(0);" class="com_btn_more" @click.prevent="btnMoreClick()"><span>{{moreMode == 'ALL' ? '전체보기' : '접기'}}</span></a>
					</div>
				</div>
				<!--// 카테고리별 지출 비교 -->
			</div>
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

import ASIP1004 from '@/views/page/AS/IP/ASIP1004/ASIP1004'

export default {
    name : "LCIP1007",
    data: () => {
        return {
			cusNb: '',              // 마이데이터고객번호
			basYm: '',            	// 조회 기준년월 YYYYMM

			moreSize: 8, 			// 접기시 보여지는 row
			moreDisplay: 'N', 		// peerMmtpCtgrList 이 moreSize 초과이면 'Y'
			moreMode: 'ALL', 		// ALL:전체보기, MIN:접기

			peerNo: '', 			// 또래번호
			peerAttr: '',			// 또래속성
			totXpsAm: 0,            // 총지출금액
			peerXpsAm: 0,           // 또래지출금액
			peerCompXpsAm: 0,       // 또래대비지출비율

			maxIndNm: '',
			maxIndVal: '',
			maxPeerIndNm: '',
			maxPeerIndVal: '',
			maxPeerCtgrNm: '',

			cusMmtpXpsOut: [],
			peerStlXpsList: [],
			peerStlXpsRightList: [],
			peerMmtpCtgrList: [],
			peerMmtpCtgrListView: [], // moreMode 에 따른 데이터
        }
    },
    computed : {
	},
	beforeCreate() {
	},
    created() {
		this.cusNb = this.getUserInfo("mydtCusno")
		this.basYm = this.params.pBasYm
		this.peerNo = this.params.peerNo
		if (this.peerNo.length >= 6) {
			this.peerAttr = this.getCodeName('PEER_AG_STN_C', this.peerNo.substr(0, 2)) + '^' + this.getCodeName('PEER_JOBGR_C', this.peerNo.substr(2, 2))
		} else {
			this.peerAttr = ''
		}		
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
                url: '/lc/ip/07ra1', // 인터페이스ID: IF-MOB-PFM-LCA07, 서비스코드: PFMLCIP07RA1
                data: {
                    "mydtCusno" : this.cusNb,
					"basYm" : this.basYm,
					"inqGbnCd" : this.peerNo
					// "inqGbnCd" : 'G5J0A3'
                }
            }
            apiService.call(config).then(response =>{
				// console.log('response', JSON.parse(JSON.stringify(response)))
				this.totXpsAm = response.cusMmtpXpsOut.totXpsAm || 0
				this.peerXpsAm = response.cusMmtpXpsOut.peerXpsAm || 0
				this.peerCompXpsAm = this.totXpsAm + this.peerXpsAm != 0 ? Math.round(this.totXpsAm / (this.totXpsAm + this.peerXpsAm) * 100) : 0 // 또래대비지출비율
				
				let cusMmtpXpsOut = response.cusMmtpXpsOut || []
				let peerStlXpsList = response.peerStlXpsList || []
				let peerMmtpCtgrList = response.peerMmtpCtgrList || []

				for (let i = 0; i < peerStlXpsList.length; i++) {
					if (peerStlXpsList[i].stlMnsIdVal == 'DP') peerStlXpsList[i].stlMnsIdNm = '기타'
				}

				let peerStlXpsRightList = JSON.parse(JSON.stringify(peerStlXpsList))
				
				// 또래지출금액으로 내림차순 정렬
				peerStlXpsRightList.sort(function(a, b) {
					if (a.peerXpsAm < b.peerXpsAm) return 1;
					if (a.peerXpsAm > b.peerXpsAm) return -1;
					if (a.peerXpsAm == b.peerXpsAm) return 0;
				})

				// '/' 문자를 '<br/>' 문자로 변환
				for (let i = 0; i < peerMmtpCtgrList.length; i++) {
					peerMmtpCtgrList[i].xpsCtgrNm2 = peerMmtpCtgrList[i].xpsCtgrNm.replace(/\//g, '<br/>')
				}

				// 지출이 가장 많은 결제수단명 노출
				// 또래 대비 비율 차이가 가장 높은 결제수단명/비율차 노출
				let maxIndNm = ''
				let maxIndVal = 0
				let maxPeerIndNm = ''
				let maxPeerIndVal = 0
				
				for (let i = 0; i < peerStlXpsList.length; i++) {
					if (i == 0) {
						maxIndNm = peerStlXpsList[i].stlMnsIdNm
						maxIndVal = peerStlXpsList[i].xpsRto
					}

					if (peerStlXpsList[i].xpsRto - peerStlXpsList[i].peerXpsRto > maxPeerIndVal) {
						maxPeerIndNm = peerStlXpsList[i].stlMnsIdNm
						maxPeerIndVal = peerStlXpsList[i].xpsRto - peerStlXpsList[i].peerXpsRto
					}
				}

				this.maxIndNm = maxIndNm
				this.maxIndVal = maxIndVal
				this.maxPeerIndNm = maxPeerIndNm
				this.maxPeerIndVal = maxPeerIndVal

				// (내 지출 비중 % - 또래 지출 비중 %) 값이 최대인 카테고리명 노출
				let maxCompCtgrXpsRto = 0
				let maxPeerCtgrNm = ''

				for (let i = 0; i < peerMmtpCtgrList.length; i++) {
					if (peerMmtpCtgrList[i].xpsRto - peerMmtpCtgrList[i].peerXpsRto > maxCompCtgrXpsRto) {
						maxCompCtgrXpsRto = peerMmtpCtgrList[i].xpsRto - peerMmtpCtgrList[i].peerXpsRto
						maxPeerCtgrNm = peerMmtpCtgrList[i].xpsCtgrNm
					}
				}

				this.maxPeerCtgrNm = maxPeerCtgrNm

				// 최종데이터 바인딩
				this.cusMmtpXpsOut = cusMmtpXpsOut					// 고객월별
				this.peerStlXpsList = peerStlXpsList				// 또래 결제수단별
				this.peerStlXpsRightList = peerStlXpsRightList		// 또래 결제수단별 (또래지출금액 내림차순으로 재정렬)
				this.peerMmtpCtgrList = peerMmtpCtgrList			// 또래 카테고리별
				// console.log('peerStlXpsRightList', JSON.parse(JSON.stringify(this.peerStlXpsRightList)));

				this.moreMode = 'ALL'
				this.moreDisplay = peerMmtpCtgrList.length > this.moreSize ? 'Y' : 'N'
				this.peerMmtpCtgrListView = this.moreDisplay == 'Y' ? peerMmtpCtgrList.slice(0, this.moreSize) : peerMmtpCtgrList

                this.$nextTick(()=>{
					this.makeChart1()
					this.makeChart2()
                })
			})
		},
		// 또래 선택 클릭
		peerClick() {
			let param = { peerNo: this.peerNo }
            const config = {
                params : param,
                renderer : {
                    component : ASIP1004
                }
            }
            modalService.openSlidePagePopup(config).then(res => {
				// console.log('popClose', JSON.stringify(res))
				let selectedPeerNo = res.selectedPeerNo
				this.peerNo = selectedPeerNo
				if (selectedPeerNo.length >= 6) {
					this.peerAttr = this.getCodeName('PEER_AG_STN_C', selectedPeerNo.substr(0, 2)) + '^' + this.getCodeName('PEER_JOBGR_C', selectedPeerNo.substr(2, 2))
				} else {
					this.peerAttr = ''
				}
				this.getData()
            })
		},
		// 전체보기/접기 클릭
		btnMoreClick() {
			if (this.moreMode == 'ALL') {
				this.moreMode = 'MIN'
				this.peerMmtpCtgrListView = this.peerMmtpCtgrList
			} else {
				this.moreMode = 'ALL'
				this.peerMmtpCtgrListView = this.peerMmtpCtgrList.slice(0, this.moreSize)
			}
		},
		makeChart1() {
			// rMateChart 를 생성합니다.
			// 파라메터 (순서대로)
			//  1. 차트의 id ( 임의로 지정하십시오. )
			//  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
			//  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
			//  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
			//  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)
			rMateChartH5.create("chart1", "lcip1007ChartHolder1", "", "100%", "130px");

			let solidColor = ''
			for (let i = 0; i < this.peerStlXpsList.length; i++) {
				if (this.peerStlXpsList[i].stlMnsIdVal == 'CD') solidColor += '<SolidColor color="#57c9ae"/>' // 카드
				if (this.peerStlXpsList[i].stlMnsIdVal == 'ELTFNC') solidColor += '<SolidColor color="#fdbb68"/>' // 페이머니
				if (this.peerStlXpsList[i].stlMnsIdVal == 'PPAYCD') solidColor += '<SolidColor color="#fa7288"/>' // 선불카드
				if (this.peerStlXpsList[i].stlMnsIdVal == 'DP') solidColor += '<SolidColor color="#668ee2"/>' // 기타
			}
			
			var layoutStr =
				'<rMateChart backgroundColor="#FFFFFF" borderStyle="none" >'
					// +'<Options>'
					// 	+'<Caption text="Web Browser Market Share"/>'
					// 	+'<Legend useVisibleCheck="true"/>'
					// +'</Options>'
					// +'<CurrencyFormatter id="numFmt" currencySymbol="%" alignSymbol="right"/>'
					+'<Pie2DChart showDataTips="true" innerRadius="0.5" displayCompleteCallFunction="rMateFunction.lcipRemoveTabindex">'
				/* Pie2D 차트 생성시에 필요한 Pie2DChart 정의합니다. */
				/* showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다. */
						+'<series>'
							+'<Pie2DSeries nameField="stlMnsIdNm" field="xpsAm" color="#ffffff" zeroValueEnable="true">'
							/* Pie2DChart 정의 후 Pie2DSeries labelPosition="inside"정의합니다 */
								+'<fills>'
									+ solidColor
									// +'<SolidColor color="#57c9ae"/>'/* 카드 */
									// +'<SolidColor color="#fdbb68"/>'/*페이머니*/
									// +'<SolidColor color="#fa7288"/>'/*선불카드*/
									// +'<SolidColor color="#668ee2"/>'/*기타*/
								+'</fills>'
								+'<showDataEffect>'
								/* 차트 생성시에 Effect를 주고 싶을 때 showDataEffect정의합니다 */
									+'<SeriesSlide  duration="1000"/>'
				/* SeriesSlide 효과는 시리즈 데이터가 데이터로 표시될 때 한쪽에서 미끄러지듯 나타나는 효과를 적용합니다. */
				/* elementOffset : effect를 지연시키는 시간을 지정합니다 default:20 */
				/* minimumElementDuration : 각 엘리먼트의 최소 지속 시간을 설정합니다 default:0 */
								/* 이 값보다 짧은 시간에 effect가 실행되지 않습니다. */
				/* offset : effect개시의 지연시간을 설정합니다 default:0 */
				/* perElementOffset : 각 엘리먼트의 개시 지연시간을 설정합니다. */
				/* direction : left:왼쪽, right:오른쪽, up:위, down:아래 default는 left입니다. */
								+'</showDataEffect>'
							+'</Pie2DSeries>'
						+'</series>'
						+'<annotationElements>'
							+'<CanvasElement>'
								+'<CanvasLabel horizontalCenter="0" height="24" fontSize="14" fontWeight="bold" verticalCenter="0" text="나" color="#333333"/>'
							+'</CanvasElement>'
						+'</annotationElements>'
					+'</Pie2DChart>'
					
				+'</rMateChart>';
			
			// 차트 데이터
			var chartData =
					[{"browser":"카드", "share":40},
					{"browser":"페이머니", "share":21},
					{"browser":"선불카드", "share":19},
					{"browser":"기타", "share":20}];
			chartData = this.peerStlXpsList
				
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
				"setData" : chartData,
			});
		},
		makeChart2() {
			// rMateChart 를 생성합니다.
			// 파라메터 (순서대로)
			//  1. 차트의 id ( 임의로 지정하십시오. )
			//  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
			//  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
			//  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
			//  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)
			rMateChartH5.create("chart2", "lcip1007ChartHolder2", "useContextMenu=false", "100%", "130px");

			let solidColor = ''
			for (let i = 0; i < this.peerStlXpsRightList.length; i++) {
				if (this.peerStlXpsRightList[i].stlMnsIdVal == 'CD') solidColor += '<SolidColor color="#57c9ae"/>' // 카드
				if (this.peerStlXpsRightList[i].stlMnsIdVal == 'ELTFNC') solidColor += '<SolidColor color="#fdbb68"/>' // 페이머니
				if (this.peerStlXpsRightList[i].stlMnsIdVal == 'PPAYCD') solidColor += '<SolidColor color="#fa7288"/>' // 선불카드
				if (this.peerStlXpsRightList[i].stlMnsIdVal == 'DP') solidColor += '<SolidColor color="#668ee2"/>' // 기타
			}
			
			let layoutStr2 =
				'<rMateChart backgroundColor="#FFFFFF" borderStyle="none" >'
					// +'<Options>'
					// 	+'<Caption text="Web Browser Market Share"/>'
					// 	+'<Legend useVisibleCheck="true"/>'
					// +'</Options>'
					// +'<CurrencyFormatter id="numFmt" currencySymbol="%" alignSymbol="right"/>'
					+'<Pie2DChart showDataTips="true" innerRadius="0.5">'
				/* Pie2D 차트 생성시에 필요한 Pie2DChart 정의합니다. */
				/* showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다. */
						+'<series>'
							+'<Pie2DSeries nameField="stlMnsIdNm" field="peerXpsAm" color="#ffffff" zeroValueEnable="true">'
							/* Pie2DChart 정의 후 Pie2DSeries labelPosition="inside"정의합니다 */
								+'<fills>'
									+ solidColor
									// +'<SolidColor color="#57c9ae"/>'/* 카드 */
									// +'<SolidColor color="#fa7288"/>'/*선불카드*/
									// +'<SolidColor color="#668ee2"/>'/*기타*/
									// +'<SolidColor color="#fdbb68"/>'/*페이머니*/
								+'</fills>'
								+'<showDataEffect>'
								/* 차트 생성시에 Effect를 주고 싶을 때 showDataEffect정의합니다 */
									+'<SeriesSlide  duration="1000"/>'
				/* SeriesSlide 효과는 시리즈 데이터가 데이터로 표시될 때 한쪽에서 미끄러지듯 나타나는 효과를 적용합니다. */
				/* elementOffset : effect를 지연시키는 시간을 지정합니다 default:20 */
				/* minimumElementDuration : 각 엘리먼트의 최소 지속 시간을 설정합니다 default:0 */
								/* 이 값보다 짧은 시간에 effect가 실행되지 않습니다. */
				/* offset : effect개시의 지연시간을 설정합니다 default:0 */
				/* perElementOffset : 각 엘리먼트의 개시 지연시간을 설정합니다. */
				/* direction : left:왼쪽, right:오른쪽, up:위, down:아래 default는 left입니다. */
								+'</showDataEffect>'
							+'</Pie2DSeries>'
						+'</series>'
						+'<annotationElements>'
							+'<CanvasElement>'
								+'<CanvasLabel horizontalCenter="0" height="24" fontSize="14" fontWeight="bold" verticalCenter="0" text="또래" color="#333333"/>'
							+'</CanvasElement>'
						+'</annotationElements>'
					+'</Pie2DChart>'
					
				+'</rMateChart>';
			
			// 차트 데이터
			let chartData2 =
					[{"browser":"카드", "share":30},
					{"browser":"페이머니", "share":45},
					{"browser":"선불카드", "share":10},
					{"browser":"기타", "share":15}];
			chartData2 = this.peerStlXpsRightList
				
			// rMateChartH5.calls 함수를 이용하여 차트의 준비가 끝나면 실행할 함수를 등록합니다.
			//
			// argument 1 - rMateChartH5.create시 설정한 차트 객체 아이디 값
			// argument 2 - 차트준비가 완료되면 실행할 함수 명(key)과 설정될 전달인자 값(value)
			// 
			// 아래 내용은 
			// 1. 차트 준비가 완료되면 첫 전달인자 값을 가진 차트 객체에 접근하여
			// 2. 두 번째 전달인자 값의 key 명으로 정의된 함수에 value값을 전달인자로 설정하여 실행합니다.
			
			rMateChartH5.calls("chart2", {
				"setLayout" : layoutStr2,
				"setData" : chartData2
			});
		},
		getCodeName(grpCd, cd) {
			let ret = ''
			let codeList = this.getCodeList(grpCd)
			for (let i = 0; i < codeList.length; i++) {
				if (cd == codeList[i].comnCVal) {
					ret = codeList[i].comnCExpl
					break
				}
			}
			return ret
		},
        // 차트CSS
        setChartCss(cd) {
			let objCssClass = {
				CD: 'bl_lightcyan', // 카드
				ELTFNC: 'bl_orange', // 페이머니
				PPAYCD: 'bl_red', // 선불카드
				DP: 'bl_blue', // 기타
			}

            return objCssClass[cd]
        }
    },
    mixins: [
        commonMixin,
        popupMixin
    ]
}
</script>