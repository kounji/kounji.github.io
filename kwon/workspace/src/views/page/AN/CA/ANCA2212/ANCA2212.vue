<!--
/*************************************************************************
* @ 서비스경로 : 금융생활 > NH콕마이카
* @ 페이지설명 : 금융생활 > NH콕마이카 > 내차 소비 리포트
* @ 파일명     : src\views\page\AN\CA\ANCA2212\ANCA2212.vue
* @ 작성자     : CS528043
* @ 작성일     : 2022-08-08
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-08              CS528043              최초작성(신규)
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1 class="">내차 소비 리포트</h1>
		</div>
		
		<div class="popup_content com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner com_line_type01 com_top_type02">
				<!-- 상단 날짜이동 버튼 -->
				<div class="select_date tac">
					<button class="cal_btn cal_prev" aria-label="일년 전 이동" @click.prevent="fn_moveYear('P')"></button>
					<a href="javascript:void(0);" class="year_month" title="년월선택" @click.prevent="openSlideMonthPop()">
						<span class="num">{{basYy | dateFilter('YYYY')}}</span>년
					</a>
					<button class="cal_btn cal_next" :class="yyNext ? '' : 'disabled'" aria-label="일년 후 이동" @click.prevent="fn_moveYear('N')"></button>
				</div>
				<!-- 자동차 슬라이드 팝업 -->
				<a href="javascript:void(0);" data-popup="slide_popup_01" class="com_box_type01 custom_box_type01" @click.prevent="fn_openCarList(vhcnoVal)">
					<div>
						<!-- <div clas\s="com_pop_tit01">{{carBrannm.concat(' ', carCrtpnm)}}<br/>{{carGrdnm}}</div> -->
						<div class="com_pop_tit01">{{carDpName}}<br/>{{carGrdnm}}</div>						
						<!-- <span class="car_num">
							<span>{{vhcnoVal}}</span>
						</span> -->
						<span class="label_bor"><em>{{vhcnoVal}}</em></span><!-- 2022-09-01 마크업 수정 --> 
					</div>
				</a>
				<div class="chart_box">
					<div class="chart_total_price">
						<span>총 지출</span>
						<strong><em>{{yrAcmTotAmt | numberFilter}}</em><span>원</span></strong>
					</div>
					<div id="chartHolder1" role="img"></div>
					<div>
						<div class="chart_txt">
							<i style="background:#668ee2"></i>
							<span>총 차량 유지비</span>
							<!-- <span><em>75%</em></span> -->
							<span class="right"><em>{{yrAcmVhcMtncs | numberFilter}}</em><span class="won">원</span></span>
						</div>
						<div class="chart_txt">
							<i style="background:#57c9ae"></i>
							<span>총 주유/충전비</span>
							<!-- <span><em>25%</em></span> -->
							<span class="right"><em>{{yrAcmOilgChggCst | numberFilter}}</em><span class="won">원</span></span>
						</div>
					</div>
				</div>
				<div class="bg_diary_cell">
					<div class="cell">
						<span>총 주유량</span>
						<strong>{{yrAcmOilgQt | numberFilter}}L</strong>
					</div>
					<div class="cell">
						<span>총 주행거리</span>
						<strong>{{odmtrDist | numberFilter}}km</strong>
					</div>
					<div class="cell">
						<span>평균연비</span>
						<strong>{{yrAvgFuelCsmUtft | numberFilter}}km</strong>
					</div>
				</div>
			</div>
			<div class="com_inner">
				<div class="com_tabmenu_type03 custom_tab">
					<!-- 2022-07-19 li role / aria aria-selected 삭제 -->
					<ul role="tablist">
						<li role="presentation" aria-controls="tab_01" :class="selectTab === '0' ? 'on' : ''"><a href="javascript:void(0);" role="tab" :aria-selected="selectTab === '0' ? 'true' : 'false'" @click.prevent="fn_selectTab('0')"><span>차트보기</span></a></li>
						<li role="presentation" aria-controls="tab_02" :class="selectTab === '1' ? 'on' : ''"><a href="javascript:void(0);" role="tab" :aria-selected="selectTab === '1' ? 'true' : 'false'" @click.prevent="fn_selectTab('1')"><span>표로 보기</span></a></li>
					</ul>
				</div>
				<div id="tab_01" role="tabpanel" class="cmm-tab-panel" :class="selectTab === '0' ? 'on' : ''">

					<!-- 월별지출, 월별 주유/충전량, 월별 주행거리, 월별 평균연비가 있는 경우만 그래프 표시 -->
					<template v-if="mmXpsList.filter(obj => obj.mmAcmTotAmt > 0).length > 0
									|| mmOilQtList.filter(obj => obj.mmAcmOilgQt > 0).length > 0
									|| mmOdmtrDistList.filter(obj => obj.mmAcmOdmtrDist > 0).length > 0
									|| mmAvgMilList.filter(obj => obj.mmAvgFuelCsmUtft > 0).length > 0">
						<div class="chart_list">
							<!-- 월별지출 -->
							<div class="top_bar">
								<div class="new_tit_area">
									<div class="tit">
										<span>월별 지출</span>
									</div>
									<p class="chart_sub_txt">[단위: 원]</p>
								</div>
								<div id="chartHolder2" role="img" :aria-label="ariaLabelText2" class="ui_chart chart_left_bor"></div>
							</div>
							<!-- 월별 주유/충전량 -->
							<div class="top_bar">
								<div class="new_tit_area">
									<div class="tit">
										<span>월별 주유/충전량 <em class="txt_gray">(L/kWh)</em></span>
									</div>
								</div>
								<div id="chartHolder3" role="img" :aria-label="ariaLabelText3" class="ui_chart chart_left_bor"></div>
							</div>
							<!-- 월별 주행거리 -->
							<div class="top_bar">
								<div class="new_tit_area">
									<div class="tit">
										<span>월별 주행거리 <em class="txt_gray">(km)</em></span>
									</div>
								</div>
								<div id="chartHolder4" role="img" :aria-label="ariaLabelText4" class="ui_chart chart_left_bor"></div>
							</div>
							<!-- 월별 평균연비 -->
							<div class="top_bar">
								<div class="new_tit_area">
									<div class="tit">
										<span>월별 평균연비 <em class="txt_gray">(km/ℓ)</em></span>
									</div>
								</div>
								<div id="chartHolder5" role="img" :aria-label="ariaLabelText5" class="ui_chart chart_left_bor"></div>
							</div>
						</div>
					</template>
					<template v-else>
						<div class="no_data_box">
							<div class="no_data_list">
								<p>조회된 정보가 없습니다.</p>
							</div>
						</div>
					</template>
				</div>
				<div id="tab_02" role="tabpanel" class="cmm-tab-panel" :class="selectTab === '1' ? 'on' : ''">
					<!-- 데이터가 있으면 -->
					<!-- 월별 지출(02) -->
					<template v-if="mmXpsList.filter(obj => obj.mmAcmTotAmt > 0).length > 0">
						<div class="re_detail_list">
							<div class="new_tit_area">
								<div class="tit">
									<span>월별 지출</span>
								</div>
							</div>
							<ul>
								<template  v-for="(item, index) in mmXpsList">
									<template v-if="item.mmAcmTotAmt > 0">
										<li :key="index">
											<div class="re_flex total">
												<strong class="text_info">{{item.basYm | dateFilter('MM월')}}</strong>
												<span class="list_price">
													<em>{{item.mmAcmTotAmt | numberFilter}}</em>원
												</span>
											</div>
											<div class="re_flex">
												<div class="text_info">
													<em>차량 유지비</em>
												</div>
												<span class="list_price">
													<em>{{item.mmAcmVhcMtncs | numberFilter}}</em>원
												</span>
												<div class="text_info">
													<em>주유/충전비</em>
												</div>
												<span class="list_price">
													<em>{{item.mmAcmOilgChggCst | numberFilter}}</em>원
												</span>
											</div>
										</li>
									</template>
								</template>
							</ul>
						</div>
					</template>
					<!-- 월별 주유량(03) -->
					<template v-if="mmOilQtList.filter(obj => obj.mmAcmOilgQt > 0).length > 0">
						<div class="re_detail_list">
							<div class="new_tit_area">
								<div class="tit">
									<span>월별 주유/충전량 <em class="txt_gray">(L/kWh)</em></span>
								</div>
							</div>
							<ul>
								<template v-for="(item, index) in mmOilQtList">
									<template v-if="item.mmAcmOilgQt > 0">
										<li :key="index">
											<div class="re_flex total">
												<strong class="text_info">{{item.basYm | dateFilter('MM월')}}</strong>
												<span class="list_price">
													<em>{{item.mmAcmOilgQt | numberFilter}}L</em>
												</span>
											</div>
										</li>
									</template>
								</template>
							</ul>
						</div>							
					</template>
					<!-- 월별 주행거리(04) -->
					<template v-if="mmOdmtrDistList.filter(obj => obj.mmAcmOdmtrDist > 0).length > 0">
						<div class="re_detail_list">
							<div class="new_tit_area">
								<div class="tit">
									<span>월별 주행거리 <em class="txt_gray">(km)</em></span>
								</div>
							</div>
							<ul>
								<template  v-for="(item, index) in mmOdmtrDistList">
									<template v-if="item.mmAcmOdmtrDist > 0">
										<li :key="index">
											<div class="re_flex total">
												<strong class="text_info">{{item.basYm | dateFilter('MM월')}}</strong>
												<span class="list_price">
													<em>{{item.mmAcmOdmtrDist | numberFilter}}km</em>
												</span>
											</div>
										</li>
									</template>
								</template>
							</ul>
						</div>							
					</template>
					<!-- 월별 평균연비(05) -->
					<template v-if="mmAvgMilList.filter(obj => obj.mmAvgFuelCsmUtft > 0).length > 0">
						<div class="re_detail_list">
							<div class="new_tit_area">
								<div class="tit">
									<span>월별 평균연비 <em class="txt_gray">(km/ℓ)</em></span>
								</div>
							</div>
							<ul>
								<template v-for="(item, index) in mmAvgMilList">
									<template v-if="item.mmAvgFuelCsmUtft > 0">
										<li :key="index">
											<div class="re_flex total">
												<strong class="text_info">{{item.basYm | dateFilter('MM월')}}</strong>
												<span class="list_price">
													<em>{{item.mmAvgFuelCsmUtft | numberFilter}}km/ℓ</em>
												</span>
											</div>
										</li>
									</template>
								</template>
							</ul>
						</div>						
					</template>
					<!-- 데이터가 없으면 -->
					<template v-if="mmXpsList.filter(obj => obj.mmAcmTotAmt > 0).length == 0 
									&& mmOilQtList.filter(obj => obj.mmAcmOilgQt > 0).length == 0 
									&& mmOdmtrDistList.filter(obj => obj.mmAcmOdmtrDist > 0).length == 0 
									&& mmAvgMilList.filter(obj => obj.mmAvgFuelCsmUtft > 0).length == 0">
						<div class="no_data_box">
							<div class="no_data_list">
								<p>조회된 정보가 없습니다.</p>
							</div>
						</div> 						
					</template>
				</div>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close('reload')"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->

</template>
<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import PDCA1115 from '@/views/page/PD/CA/PDCA1115/PDCA1115'		// 자동차 선택(슬라이드 팝업)
import {round} from '@/utils/number'
import {dateFormat, monthAdd, monthDiff} from '@/utils/date'
import '@/assets/js/rMateChartH5/JS/rMateFunction.js'

export default {
    name : "ANCA212",
    data: () => {
		return {
            // input
			mydtCusno		  : "",		// 마이데이터고객번호
			vhcnoVal		  : "",		// 차량번호

			// output
			basYy             : "",		// 기준년도
			basYm			  : "",		// 기준년월
			odmtrDist		  : 0, 		// 총주행거리
			yrAcmOilgQt		  : 0,		// 년누적주유수량
			yrAcmOdmtrDist	  : 0,		// 년누적주행거리
			yrAvgFuelCsmUtft  : 0,		// 년평균연료소비효율
			yrAcmVhcMtncs	  : 0,		// 년누적차량유지비
			yrAcmOilgChggCst  : 0,		// 년누적주유충전비용
			yrAcmTotAmt       : 0,      // 년누적총지출액
			carBrannm         : "",		// 자동차브랜드명
			carCrtpnm         : "",		// 자동차모델명
			carGrdnm          : "",		// 자동차등급명
			carFuelCntn       : "",		// 자동차연료내용

			carXpsRptList     : [],		// 내차소비리포트 DataList
			yrDataList        : [],     // 년간 데이터(01)
			mmXpsList         : [],     // 월별 지출(02)
			mmOilQtList       : [],     // 월별 주유량(03)
			mmOdmtrDistList   : [],     // 월별 주행거리(04)
			mmAvgMilList      : [],     // 월별 평균연비(05)
			hldVhcList        : [],		// 보유차량목록

			carDpName         : "",     // 화면에 표시되는 자동차명(자동차브랜드명+자동차모델명)
			selectTab		  : "0",	// Tab(0:차트보기, 1:표로보기)
			yyNext            : false,	// 다음달 조회
			curYm   		  : "",		// 현재년월
			isChartYn         : false,  // 차트생성여부(표로보기로 조회 후 차트보기 시 차트로딩이 안되는 문제로 재생성해야 함)

			ariaLabelText1: '',		// 접근성 라벨
			ariaLabelText2: '',		// 접근성 라벨
			ariaLabelText3: '',		// 접근성 라벨
			ariaLabelText4: '',		// 접근성 라벨
			ariaLabelText5: '',		// 접근성 라벨												
        }
	},
    mixins: [
        popupMixin
        ,commonMixin
	],
    mounted() {
		this.initComponent(this.params)
		
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent(params) {
			
            this.mydtCusno = this.getUserInfo('mydtCusno')    // 마이데이터 고객번호
			this.vhcnoVal  = params.vhcnoVal                  // 차량번호값
			this.basYy     = dateFormat(new Date(), 'YYYY')   // 기준년도
			this.basYm     = dateFormat(new Date(), 'YYYYMM') // 기준년월
			this.curYm     = dateFormat(new Date(), 'YYYYMM') // 현재년월			

			// 미래년도 선택못하게 처리(현재년월, 선택년월 비교)
			let mDiff = monthDiff(this.curYm, this.basYm)
	
			if(mDiff <= 0){
				this.yyNext = false
			}else{
				this.yyNext = true
			}

			// 조회
			this.getData()
		},		
        getData() {
            const config = {
                url : '/an/ca/12ra1',
                data : {
					mydtCusno : this.mydtCusno   // 마이데이터고객번호
					, vhcnoVal  : this.vhcnoVal    // 조회차량번호값					  
					, basYy     : this.basYy    	 // 실적기준년월
                }
            }
            apiService.call(config).then(response => {
				console.log("response : ", response)
				console.log("재조회!!")

				this.hldVhcList      = response.hldVhcList		|| []	// 보유차량목록
				this.carXpsRptList   = response.carXpsRptList	|| []	// 내차소비리포트 DataList

				if(this.hldVhcList.length > 0){
					let idx 			 = this.hldVhcList.findIndex(obj => obj.vhcnoVal === this.vhcnoVal)
					this.carBrannm       = this.hldVhcList[idx].carBrannm	// 자동차브랜드명
					this.carCrtpnm       = this.hldVhcList[idx].carCrtpnm	// 자동차모델명
					this.carGrdnm        = this.hldVhcList[idx].carGrdnm	// 자동차등급명
					this.carFuelCntn     = this.hldVhcList[idx].carFuelCntn	// 자동차연료내용
					
					// 화면에 표시되는 자동차명(자동차브랜드명+자동차모델명)
					this.carDpName       = this.carBrannm.concat(' ', this.carCrtpnm)
				}

				// 내차 소비리포트
				// 데이터구분 (01:년간 데이터, 02:월별 지출, 03:월별 주유량, 04:월별 주행거리, 05:월별 평균연비)
				if(this.carXpsRptList.length > 0){
					this.yrDataList      = this.carXpsRptList.filter(item => item.dataGbn === "01")	 || [] 		// 년간 데이터(01)
					this.mmXpsList       = this.carXpsRptList.filter(item => item.dataGbn === "02")	 || []		// 월별 지출(02)
					this.mmOilQtList     = this.carXpsRptList.filter(item => item.dataGbn === "03")	 || []		// 월별 주유량(03)
					this.mmOdmtrDistList = this.carXpsRptList.filter(item => item.dataGbn === "04")	 || []		// 월별 주행거리(04)
					this.mmAvgMilList    = this.carXpsRptList.filter(item => item.dataGbn === "05")	 || []		// 월별 평균연비(05)				
				}else{
					this.yrDataList      = []
					this.mmXpsList       = []
					this.mmOilQtList     = []
					this.mmOdmtrDistList = []
					this.mmAvgMilList    = []				
				}

				// 01:년간 데이터가 있으면
				if(this.yrDataList.length > 0){
					this.odmtrDist		  = this.yrDataList[0].odmtrDist        || 0 	// 총주행거리
					this.yrAcmOilgQt	  = this.yrDataList[0].yrAcmOilgQt      || 0	// 년누적주유수량
					this.yrAcmOdmtrDist	  = this.yrDataList[0].yrAcmOdmtrDist   || 0	// 년누적주행거리
					this.yrAvgFuelCsmUtft = this.yrDataList[0].yrAvgFuelCsmUtft || 0	// 년평균연료소비효율
					this.yrAcmVhcMtncs	  = this.yrDataList[0].yrAcmVhcMtncs    || 0	// 년누적차량유지비
					this.yrAcmOilgChggCst = this.yrDataList[0].yrAcmOilgChggCst || 0	// 년누적주유충전비용
					this.yrAcmTotAmt      = this.yrDataList[0].yrAcmTotAmt      || 0    // 년누적총지출액
				}else{
					this.odmtrDist		  = 0
					this.yrAcmOilgQt	  = 0
					this.yrAcmOdmtrDist	  = 0
					this.yrAvgFuelCsmUtft = 0
					this.yrAcmVhcMtncs	  = 0
					this.yrAcmOilgChggCst = 0
					this.yrAcmTotAmt      = 0
				}

				//this.yyNext = true

				// 총 지출 년간데이터 반원Chart call
				setTimeout(this.getChart1(), 10)
				
				// 차트보기 선택 시 월별 데이터 Chart call
				if(this.selectTab === "0"){
					this.fn_getChartCall()
				}else{
					this.isChartYn = false
				}
			})
		},
		// 자동차 선택 팝업 호출
		fn_openCarList(vhcnoVal) {
			let compName = PDCA1115

			let param = {val : vhcnoVal}
			const config = {
				component : compName,
				params    : param
			}

			modalService.openPopup(config).then((response) => {
				console.log("팝업return", response)

				if(response.vhcnoVal != '') {
					this.vhcnoVal    = response.vhcnoVal		// 차량번호
					this.carBrannm   = response.carBrannm		// 자동차브랜드명
					this.carCrtpnm   = response.carCrtpnm		// 자동차모델명
					this.carGrdnm    = response.carCrtpnm		// 자동차등급명
					this.carFuelCntn = response.carFuelCntn 	// 자동차연료내용

					// 화면에 표시되는 자동차명(자동차브랜드명+자동차모델명)
					this.carDpName   = this.carBrannm.concat(' ', this.carCrtpnm)

					// 재조회
					this.getData()
				}
			})
		},
		// 일년전 후 이동
        fn_moveYear(dsc) {
            if (dsc == "P") {
				this.basYm = monthAdd(-12, this.basYm, "YYYYMM")
				this.basYy = dateFormat(this.basYm, 'YYYY')
                this.getData()
            }

            if (this.yyNext && dsc == "N") {
				this.basYm = monthAdd(12, this.basYm, "YYYYMM")
				this.basYy = dateFormat(this.basYm, 'YYYY')
                this.getData()
			}

			// 미래년도 선택못하게 처리(현재년월, 선택년월 비교)
			let mDiff = monthDiff(this.curYm, this.basYm)

			if(mDiff <= 0){
				this.yyNext = false
			}else{
				this.yyNext = true
			}
		},
		// Tab선택
		fn_selectTab(gbn){
			if(this.selectTab != gbn){
				this.selectTab = gbn

				if(this.selectTab === '0' && this.isChartYn === false){
					this.fn_getChartCall()
				}
			}			
		},
		fn_getChartCall(){
			// 차트보기 Tab일 때만 차트 생성
			if(this.selectTab !== '0'){
				return
			}else{
				this.$nextTick(() => {
					// 월별지출, 월별 주유/충전량, 월별 주행거리, 월별 평균연비가 있는 경우만 그래프 표시
					if(this.mmXpsList.filter(obj => obj.mmAcmTotAmt > 0).length > 0 || this.mmOilQtList.filter(obj => obj.mmAcmOilgQt > 0).length > 0
					|| this.mmOdmtrDistList.filter(obj => obj.mmAcmOdmtrDist > 0).length > 0 || this.mmAvgMilList.filter(obj => obj.mmAvgFuelCsmUtft > 0).length > 0){
						this.getChart2()
						this.isChartYn = true
					}
				})
			}
		},

        // 년월 슬라이드팝업 호출
        openSlideMonthPop(){
            const config = {
                params: {
                    title: '년월 선택',
					yyyymm : this.basYm,
                    limit  : 60,
					includeCurYm : 'Y',  // 현재월 포함여부			
                },
            }
        
            modalService.openSlideSelectMonth(config).then(response => {
				console.log('리턴 : ', response)

				this.basYm = dateFormat(response, 'YYYYMM')
				this.basYy = dateFormat(response, 'YYYY')
				
				// 미래년도 선택못하게 처리(현재년월, 선택년월 비교)
				let mDiff = monthDiff(this.curYm, this.basYm)

				if(mDiff <= 0){
					this.yyNext = false
				}else{
					this.yyNext = true
				}

                // 재조회
                this.getData()
            })
		},
		
		getAriaLabelText(dataList, gbn) {
			if (dataList.length == 0) return ''

			let ariaLabelText = '';

			// 월별 지출(L/kWh)
			if(gbn === '02'){
				// 월별 지출 - 6월 000, 7월 000, 8월 000, 9월 000, 10월 000, 11월 000 입니다.
				ariaLabelText = '월별 지출 - '				
				dataList.forEach(d => {
					ariaLabelText += d.basYm + ' '
					ariaLabelText += '차량유지비 ' + d.mmAcmVhcMtncs + '원 '
					ariaLabelText += '주유/충전비 ' + d.mmAcmOilgChggCst + '원 '
				})				
			}

			// 월별 주유/충전량
			if(gbn === '03'){
				// 월별 주유/충전량(L/kWh) - 6월 000, 7월 000, 8월 000, 9월 000, 10월 000, 11월 000 입니다.
				ariaLabelText = '월별 주유/충전량(L/kWh) - '

				dataList.forEach(d => {
					ariaLabelText += d.basYm + ' '
					ariaLabelText += d.mmAcmOilgQt + ' '
				})								
			}

			// 월별 주행거리(km)
			if(gbn === '04'){
				// 월별 주행거리(km) - 6월 000, 7월 000, 8월 000, 9월 000, 10월 000, 11월 000 입니다.
				ariaLabelText = '월별 주행거리(km) - '

				dataList.forEach(d => {
					ariaLabelText += d.basYm + ' '
					ariaLabelText += d.mmAcmOdmtrDist + ' '
				})								
			}

			// 월별 평균연비(km/ℓ)
			if(gbn === '05'){
				// 월별 평균연비(km/ℓ) - 6월 000, 7월 000, 8월 000, 9월 000, 10월 000, 11월 000 입니다.
				ariaLabelText = '월별 평균연비(km/ℓ) - '
				
				dataList.forEach(d => {
					ariaLabelText += d.basYm + ' '
					ariaLabelText += d.mmAvgFuelCsmUtft + ' '
				})								
			}

			ariaLabelText += '입니다.'

			return ariaLabelText
		},

		// 총 지출 년간데이터 반원차트
		getChart1(){
			// 차트데이터 비율계산
			let yrAcmVhcMtncs      = this.yrAcmVhcMtncs	  	// 년누적차량유지비
			let yrAcmOilgChggCst   = this.yrAcmOilgChggCst 	// 년누적주유충전비용
			let yrAcmTotAmt        = this.yrAcmTotAmt       // 년누적총지출액
			let yrAcmVhcMtncsRto   = 0				        // 년누적차량유지비비율
			let yrcmOilgChggCstRto = 0				        // 년누적주유충전비용비율
			let inside             = yrAcmTotAmt > 0 ? "inside" : ""
			let chartData          = []						// 차트데이터
			
			yrAcmVhcMtncsRto   = round(yrAcmVhcMtncs    / yrAcmTotAmt * 100, 1)  // 비율 = ( 년누적차량유지비   / 년누적총지출액 ) * 100
			yrcmOilgChggCstRto = round(yrAcmOilgChggCst / yrAcmTotAmt * 100, 1)	 // 비율 = ( 년누적주유충전비용 / 년누적총지출액 ) * 100

			// 차트 데이터
			if(yrAcmTotAmt > 0){
				chartData.push({"name":"총 차량 유지비","Profit": yrAcmVhcMtncsRto},
								{"name":"총 주유/충전비","Profit": yrcmOilgChggCstRto})
			}else{
				chartData.push({"name":"데이터 없음","Profit":1})
			}

			rMateChartH5.create("chart1", "chartHolder1", "useContextMenu=false", "100%", "180rem"); 

			var layoutStr =
				'<rMateChart backgroundColor="#FFFFFF" borderStyle="none" >'
					+'<CurrencyFormatter id="numFmt" currencySymbol="%" alignSymbol="right"/>'
					/* 22-10-26 접근성 추가 displayCompleteCallFunction="removeTabindex"*/					
					+'<HalfPie2DChart showDataTips="true" paddingBottom="40" explodable="false" displayCompleteCallFunction="rMateFunction.removeTabindex">'
				/* Pie2D 차트 생성시에 필요한 Pie2DChart 정의합니다. */
				/* showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다. */
						+'<series>'
							+'<HalfPie2DSeries nameField="name" field="Profit" outerRadius="1" labelPosition="'+ inside +'" color="#fff" labelField="Profit" alwaysShowInsideLabel="true" textOverflowEllipsis="true" zeroValueEnable="true">'
								+'<fills>'

								// 총금액이 있는경우
								if(yrAcmTotAmt > 0){
									layoutStr+= 
										'<SolidColor color="#668ee2"/>'
										+'<SolidColor color="#57c9ae"/>'
								}else{
									layoutStr+= 
										'<SolidColor color="#cccccc"/>'
								}

						layoutStr+=
								'</fills>'
							/* Pie2DChart 정의 후 Pie2DSeries labelPosition="inside"정의합니다 */
								+'<showDataEffect>'
								/* 차트 생성시에 Effect를 주고 싶을 때 shoDataEffect정의합니다 */
									+'<SeriesInterpolate duration="1000"/>'
									/* SeriesSlide 효과는 시리즈 데이터가 데이터로 표시될 때 한쪽에서 미끄러지듯 나타나는 효과를 적용합니다. */
									/* elementOffset : effect를 지연시키는 시간을 지정합니다 default:20 */
									/* minimumElementDuration : 각 엘리먼트의 최소 지속 시간을 설정합니다 default:0 */
													/* 이 값보다 짧은 시간에 effect가 실행되지 않습니다. */
									/* offset : effect개시의 지연시간을 설정합니다 default:0 */
									/* perElementOffset : 각 엘리먼트의 개시 지연시간을 설정합니다. */
									/* direction : left:왼쪽, right:오른쪽, up:위, down:아래 default는 left입니다. */
								+'</showDataEffect>'
							+'</HalfPie2DSeries>'
						+'</series>'
						+'<annotationElements>'
							+'<CanvasElement>'
								+'<CanvasLabel horizontalCenter="0" height="24" fontSize="19" verticalCenter="86" text="2019" color="#333333"/>'
								+'<CanvasLabel horizontalCenter="0" height="19" fontSize="14" verticalCenter="106" text="Annual Report" color="#666666"/>'
							+'</CanvasElement>'
						+'</annotationElements>'
					+'</HalfPie2DChart>'
				+'</rMateChart>';

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
				rMateChartH5.registerTheme(rMateChartH5.themes);

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
//				function rMateChartH5ChangeTheme(theme){
//					document.getElementById("chart1").setTheme(theme);
//				}
		},

		getChart2(){
			let curYmIdx  = Number(dateFormat(new Date(), 'M')) - 1 // index는 0부터 시작하므로 현재월 -1
		
			var layoutStr2 =
				'<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
					+'<Stroke id="stroke2" color="#cbcdd6" weight="1"/>'				
					+'<Options>'
						+'<Caption text="차트"/>'
						// +'<SubCaption text="From 2011 To 2013 (Annual %)" textAlign="center" />'
						+'<Legend defaultMouseOverAction="false" />'
					+'</Options>'
					/* 22-10-26 접근성 추가 displayCompleteCallFunction="removeTabindex"*/						
					+'<Column2DChart gutterLeft="65" showDataTips="true" columnWidthRatio="0.55" selectionMode="single" displayCompleteCallFunction="rMateFunction.removeTabindex">'
						// 천단위 구분자 추가
						+'<NumberFormatter id="numfmt" useThousandsSeparator="true" thousandsSeparatorTo="," />'
						+'<horizontalAxis>'
							+'<CategoryAxis categoryField="Month"/>'
						+'</horizontalAxis>'
						+'<verticalAxis>'
							+'<LinearAxis formatter="{numfmt}" />'
						+'</verticalAxis>'
						+'<series>'
							+'<Column2DSeries itemRenderer="SemiCircleColumnItemRenderer" labelPosition="outside" yField="mmAcmVhcMtncs" displayName="차량유지비" showValueLabels="[]">'
								+'<fill>'
									+'<SolidColor color="#668ee2"/>'
								+'</fill>'
								+'<showDataEffect>'
									+'<SeriesInterpolate/>'
								+'</showDataEffect>'
							+'</Column2DSeries>'
							+'<Column2DSeries itemRenderer="SemiCircleColumnItemRenderer" labelPosition="outside" yField="mmAcmOilgChggCst" displayName="주유/충전비" showValueLabels="[]">'
								+'<fill>'
									+'<SolidColor color="#57c9ae"/>'
								+'</fill>'
								+'<showDataEffect>'
									+'<SeriesInterpolate/>'
								+'</showDataEffect>'
							+'</Column2DSeries>'
						+'</series>'
						+'<backgroundElements>'
							//+'<GridLines/>'
							+'<AxisMarker>'
							+'<lines>'
							+'<AxisLine value="0" label="" labelAlign="left" stroke="{stroke2}"/>'           
							+'</lines> '               
							+'</AxisMarker>'
						+'</backgroundElements>'
						+'<verticalAxisRenderers>'
								// +'<Axis2DRenderer axis="{vAxis1}" showLine="false"/>'
								// +'<Axis2DRenderer axis="{vAxis2}" showLine="false"/>'
							+'</verticalAxisRenderers>'
							+'<horizontalAxis>'
								+'<CategoryLinearAxis id="hAxis" padding="0.5" categoryField="basYm"/>'
								/* Scroll_Line_2D챠트 생성시엔 horizontalAxis에 CategoryLinearAxis를 정의해야합니다 */
							+'</horizontalAxis>'
						+'<horizontalAxisRenderers>'
								+'<ScrollableAxisRenderer axis="{hAxis}" scrollPosition="'+ curYmIdx +'" visibleItemSize="6"/>'
								/*
								Scroll_Line_2D챠트 생성시엔 horizontalAxisRenderers ScrollableAxisRenderer를 정의해야 합니다
								visibleItemSize : 스크롤 차트가 한번에 표시할 데이터의 개수입니다
								*/
							+'</horizontalAxisRenderers>'
					+'</Column2DChart>'
				+'</rMateChart>';
				// selectionMode = multiple => single
				// 막대차트
				// gutterLeft="0" left text 삭제
				var layoutStr3 =
				'<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
					+'<Stroke id="stroke3" color="#cbcdd6" weight="1"/>'				
					+'<Options>'
						+'<Caption text="차트" />'
					+'</Options>'
					+'<SeriesInterpolate id="ss"/>'
					/* 22-10-26 접근성 추가 displayCompleteCallFunction="removeTabindex"*/						
					+'<Column2DChart gutterLeft="65" showDataTips="true" selectionMode="single" columnWidthRatio="0.48" styleName="seriesStyle" displayCompleteCallFunction="rMateFunction.removeTabindex">' /* gutterLeft="0"  삭제 */
						// 천단위 구분자 추가
						+'<NumberFormatter id="numfmt" useThousandsSeparator="true" />'
						+'<horizontalAxis>'
							+'<CategoryAxis categoryField="Country"/>'
						+'</horizontalAxis>'
						+'<verticalAxis>'
							+'<LinearAxis formatter="{numfmt}"/>'
						+'</verticalAxis>'
						+'<series>'
							+'<Column2DSeries itemRenderer="SemiCircleColumnItemRenderer" labelPosition="outside" yField="mmAcmOilgQt">'
								+'<fills>'
									+'<SolidColor color="#fa7288"/>'
									+'<SolidColor color="#f76896"/>'
								+'</fills>'
								+'<showDataEffect>'
									+'<SeriesInterpolate/>'
								+'</showDataEffect>'
							+'</Column2DSeries>'
						+'</series>'
						+'<backgroundElements>'
							//+'<GridLines/>'
							+'<AxisMarker>'
							+'<lines>'
							+'<AxisLine value="0" label="" labelAlign="left" stroke="{stroke3}"/>'           
							+'</lines> '               
							+'</AxisMarker>'
						+'</backgroundElements>'						
						+'<horizontalAxis>'
							+'<CategoryLinearAxis id="hAxis" padding="0.5" categoryField="basYm"/>'
							/* Scroll_Line_2D챠트 생성시엔 horizontalAxis에 CategoryLinearAxis를 정의해야합니다 */
						+'</horizontalAxis>'
						+'<horizontalAxisRenderers>'
							+'<ScrollableAxisRenderer axis="{hAxis}" scrollPosition="'+ curYmIdx +'" visibleItemSize="6"/>'
							/*
							Scroll_Line_2D챠트 생성시엔 horizontalAxisRenderers ScrollableAxisRenderer를 정의해야 합니다
							visibleItemSize : 스크롤 차트가 한번에 표시할 데이터의 개수입니다
							*/
						+'</horizontalAxisRenderers>'
					+'</Column2DChart>'
				+'</rMateChart>';

				var layoutStr4 =
				'<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
					+'<Stroke id="stroke4" color="#cbcdd6" weight="1"/>'				
					+'<Options>'
						+'<Caption text="차트" />'
					+'</Options>'
					+'<SeriesInterpolate id="ss"/>'
					/* 22-10-26 접근성 추가 displayCompleteCallFunction="removeTabindex"*/						
					+'<Column2DChart gutterLeft="65" showDataTips="true" selectionMode="single" columnWidthRatio="0.48" displayCompleteCallFunction="rMateFunction.removeTabindex">' /* gutterLeft="0"  삭제 */
						// 천단위 구분자 추가
						+'<NumberFormatter id="numfmt" useThousandsSeparator="true" />'
						+'<horizontalAxis>'
							+'<CategoryAxis categoryField="Country"/>'
						+'</horizontalAxis>'
						+'<verticalAxis>'
							+'<LinearAxis formatter="{numfmt}"/>'
						+'</verticalAxis>'
						+'<series>'
							+'<Column2DSeries itemRenderer="SemiCircleColumnItemRenderer" labelPosition="outside" yField="mmAcmOdmtrDist">'
								+'<fills>'
									+'<SolidColor color="#fdbb68"/>'
									+'<SolidColor color="#ffa270"/>'
								+'</fills>'
								+'<showDataEffect>'
									+'<SeriesInterpolate/>'
								+'</showDataEffect>'
							+'</Column2DSeries>'
						+'</series>'
						+'<backgroundElements>'
							//+'<GridLines/>'
							+'<AxisMarker>'
							+'<lines>'
							+'<AxisLine value="0" label="" labelAlign="left" stroke="{stroke4}"/>'           
							+'</lines> '               
							+'</AxisMarker>'
						+'</backgroundElements>'						
						+'<horizontalAxis>'
							+'<CategoryLinearAxis id="hAxis" padding="0.5" categoryField="basYm"/>'
							/* Scroll_Line_2D챠트 생성시엔 horizontalAxis에 CategoryLinearAxis를 정의해야합니다 */
						+'</horizontalAxis>'
						+'<horizontalAxisRenderers>'
							+'<ScrollableAxisRenderer axis="{hAxis}" scrollPosition="'+ curYmIdx +'" visibleItemSize="6"/>'
							/*
							Scroll_Line_2D챠트 생성시엔 horizontalAxisRenderers ScrollableAxisRenderer를 정의해야 합니다
							visibleItemSize : 스크롤 차트가 한번에 표시할 데이터의 개수입니다
							*/
						+'</horizontalAxisRenderers>'
					+'</Column2DChart>'
				+'</rMateChart>';

				var layoutStr5 =
				'<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
					+'<Stroke id="stroke5" color="#cbcdd6" weight="1"/>'				
					+'<Options>'
						+'<Caption text="차트" />'
					+'</Options>'
					+'<SeriesInterpolate id="ss"/>'
					/* 22-10-26 접근성 추가 displayCompleteCallFunction="removeTabindex"*/						
					+'<Column2DChart gutterLeft="65" showDataTips="true" selectionMode="single" columnWidthRatio="0.48" displayCompleteCallFunction="rMateFunction.removeTabindex">'/* gutterLeft="0"  삭제 */
						// 천단위 구분자 추가
						+'<NumberFormatter id="numfmt" useThousandsSeparator="true" />'
						+'<horizontalAxis>'
							+'<CategoryAxis categoryField="Country"/>'
						+'</horizontalAxis>'
						+'<verticalAxis>'
							+'<LinearAxis formatter="{numfmt}"/>'
						+'</verticalAxis>'
						+'<series>'
							+'<Column2DSeries itemRenderer="SemiCircleColumnItemRenderer" labelPosition="outside" yField="mmAvgFuelCsmUtft">'
								+'<fills>'
									+'<SolidColor color="#84b0fc"/>'
									+'<SolidColor color="#668ee2"/>'
								+'</fills>'
								+'<showDataEffect>'
									+'<SeriesInterpolate/>'
								+'</showDataEffect>'
							+'</Column2DSeries>'
						+'</series>'
						+'<backgroundElements>'
							//+'<GridLines/>'
							+'<AxisMarker>'
							+'<lines>'
							+'<AxisLine value="0" label="" labelAlign="left" stroke="{stroke5}"/>'           
							+'</lines> '               
							+'</AxisMarker>'
						+'</backgroundElements>'
						+'<horizontalAxis>'
							+'<CategoryLinearAxis id="hAxis" padding="0.5" categoryField="basYm"/>'
							/* Scroll_Line_2D챠트 생성시엔 horizontalAxis에 CategoryLinearAxis를 정의해야합니다 */
						+'</horizontalAxis>'
						+'<horizontalAxisRenderers>'
							+'<ScrollableAxisRenderer axis="{hAxis}" scrollPosition="'+ curYmIdx +'" visibleItemSize="6"/>'
							/*
							Scroll_Line_2D챠트 생성시엔 horizontalAxisRenderers ScrollableAxisRenderer를 정의해야 합니다
							visibleItemSize : 스크롤 차트가 한번에 표시할 데이터의 개수입니다
							*/
						+'</horizontalAxisRenderers>'
					+'</Column2DChart>'
				+'</rMateChart>';
				rMateChartH5.registerTheme(rMateChartH5.themes);

				rMateChartH5.create("chart2", "chartHolder2", "useContextMenu=false", "100%", "220rem");
				rMateChartH5.create("chart3", "chartHolder3", "useContextMenu=false", "100%", "220rem"); 
				rMateChartH5.create("chart4", "chartHolder4", "useContextMenu=false", "100%", "220rem"); 
				rMateChartH5.create("chart5", "chartHolder5", "useContextMenu=false", "100%", "220rem"); 

				// 월별 지출(02) ChartData
				const mmXpsData = this.mmXpsList.map((obj) => { return { basYm : dateFormat(obj.basYm, 'M월'), mmAcmVhcMtncs : obj.mmAcmVhcMtncs , mmAcmOilgChggCst : obj.mmAcmOilgChggCst } })		

				// 월별 주유량(03) ChartData
				const mmOilQtData = this.mmOilQtList.map((obj) => { return { basYm : dateFormat(obj.basYm, 'M월'), mmAcmOilgQt : obj.mmAcmOilgQt } })

				// 월별 주행거리(04) ChartData
				const mmOdmtrDistData = this.mmOdmtrDistList.map((obj) => { return { basYm : dateFormat(obj.basYm, 'M월'), mmAcmOdmtrDist : obj.mmAcmOdmtrDist } })

				// 월별 평균연비(05) ChartData
				const mmAvgMilData = this.mmAvgMilList.map((obj) => { return { basYm : dateFormat(obj.basYm, 'M월'), mmAvgFuelCsmUtft : obj.mmAvgFuelCsmUtft } })

				// 접근성 라벨
				this.ariaLabelText2 = this.getAriaLabelText(mmXpsData       , '02')	// 월별 지출(02)	
				this.ariaLabelText3 = this.getAriaLabelText(mmOilQtData     , '03')	// 월별 주유량(03)
				this.ariaLabelText4 = this.getAriaLabelText(mmOdmtrDistData , '04')  // 월별 주행거리(04)
				this.ariaLabelText5 = this.getAriaLabelText(mmAvgMilData    , '05')  // 월별 평균연비(05)

				rMateChartH5.calls("chart2", {"setLayout" : layoutStr2, "setData" : mmXpsData       });			
				rMateChartH5.calls("chart3", {"setLayout" : layoutStr3, "setData" : mmOilQtData     });
				rMateChartH5.calls("chart4", {"setLayout" : layoutStr4, "setData" : mmOdmtrDistData });
				rMateChartH5.calls("chart5", {"setLayout"  : layoutStr5, "setData" : mmAvgMilData   });
		}		
	}
}

</script>