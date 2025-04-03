<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 손익분석 > 손익분석 메인 
* @ 페이지설명 : 손익분석 메인 
* @ 파일명     : src/views/page/SZ/FP/SZFP2106/SZFP2101.vue
* @ 작성자     : CS523299
* @ 작성일     : 2021-08-12
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-08-12			  CS523299			    최초작성
*************************************************************************/
-->
<template>
	<!-- kimhc_20220922 수정-->
    <!-- <page class="content-view"> -->
    <page class="content-view hasLNB">
        <!-- S :: 마이농가 카테고리 -->
        <!-- <sz-category-v2 type="FP"></sz-category-v2> -->
		<an-category-v2 type="SZFC"></an-category-v2>
		<an-sub-category-v2 type="FP"></an-sub-category-v2>
        <!-- E :: 마이농가 카테고리 -->
			<!-- content-view S -->
			<!-- <div class="content-view"> -->
				<!-- content S -->
				<div id="content" class="com_sub_type02"> <!-- class="type_01" 일대 bg #f2f4f7 -->
					<div class="calendar_wrap ">
						<section class="cal_day_box"><!-- class="calendar_box" -->
							<!--   20210723 한별 년/월 셀렉트 디자인 바뀜 : 이병철 -->
							<div class="com_inner">
								<div class="select_dual_wrap hasNav">
									<div class="select_dual">
										<div class="area">
											<div class="select_date">
												<!--좌우 버튼에 disabled 클래스 추가 시 disabled 버튼 -->
												<button class="cal_btn cal_prev" title="선택 가능" v-on:click.prevent="selectClamp('p')"  aria-label="일년 전 이동"></button>  <!--년 이전 선택-->  
												<a title="년선택" href="javascript:void(0);" class="year_month"><span class="num">{{inqYy}}</span>년</a>
												<button :disabled="this.yerDisabled==='disabled'" :class="'cal_btn cal_next '+ this.yerDisabled" :title="this.yerDisabled=='disabled'? '선택 불가' : '선택 가능'" v-on:click.prevent="selectClamp('n')" aria-label="일년 후 이동"></button>  <!--년 다음 선택-->  
											</div>
										</div>
										<div class="area">
											<button class="select_date select_date_type02" v-on:click.prevent="fn_slidmyFarmPopOpen()" title="작목선택">   <!--  20211108 한별 접근성 추가 (title="작목선택") -->
												{{myFarmTxt}}<span class="caret"></span>
											</button>
										</div>
									</div>
								</div>
							</div>

						</section>
					</div>
					<div class="com_inner">
						<div class="com_box_type01 goal_warp">
							<strong class="com_box_tit mb40">수입지출현황</strong>
							<span class="fr notice">[단위: 원]</span><!-- 20211103 한별 추가 -->
							<!-- 차트가 삽입될 DIV -->
							<!-- 20211118 한별 접근성 수정 S -->
							<div id="chartHolder" aria-hidden="true"></div>
							<table class="text_over">
								<caption>수입지출현황 표</caption>
								<colgroup>
									<col style="width:">
									<col style="width:25%">
									<col style="width:25%">
								</colgroup>
								<thead>
									<tr>
										<th scope="col"></th>
										<!-- Rev 수입 / Xps 지출 -->
										<th scope="col">수입</th>
										<th scope="col">지출</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(chartDataItem, index) in this.chartData" :key="index">
										<td>{{chartDataItem.Month}}</td>
										<td>{{chartDataItem.Rev | numberFilter}}원</td>
										<td>{{chartDataItem.Xps | numberFilter}}원</td>
									</tr>
								</tbody>
							</table>
							<!--//  20211118 한별 접근성 수정 E -->
						</div>
						<div class="com_box_type01 com_box_list01">
							<div class="list_type_box">
								<a href="javascript:void(0);" @click.prevent="fn_openFpDtlPopup()" role="button">
									<div class="new_tit_area">
										<div class="tit"><span>영농수익분석</span></div>
									</div>
								</a>					
								<ul class="list_type_02">
									<li>
										<dl>
											<dt>
												<div>
													<em>총수입</em>
												</div>
											</dt>
											<dd>
												<span class="com_price">
													<em class="num">{{totRevAm  | numberFilter}}</em><em class="unit">원</em>
												</span>
											</dd>
										</dl>
									</li>
									<li>
										<dl>
											<dt>
												<div>
													<em>생산비</em>
												</div>
											</dt>
											<dd>
												<span class="com_price">
													<em class="num">{{pdcsAm  | numberFilter}}</em><em class="unit">원</em>
												</span>
											</dd>
										</dl>
									</li>
									<li>
										<dl>
											<dt>
												<div>
													<em>순수익</em>
												</div>
											</dt>
											<dd>
												<span class="com_price">
													<em class="num">{{gupftAm  | numberFilter}}</em><em class="unit">원</em>
												</span>
											</dd>
										</dl>
									</li>
									<li>
										<dl>
											<dt>
												<div>
													<em>소득</em>
												</div>
											</dt>
											<dd>
												<span class="com_price">
													<em class="num">{{icmAm  | numberFilter}}</em><em class="unit">원</em>
												</span>
											</dd>
										</dl>
									</li>
								</ul>
							</div>
						</div>
						<!-- 영농자금 대출금액이 0원인 경우는 해당영역 비노출 P106 -->
						<template v-if="fangCptlnBac > 0">
							<div class="com_box_type01 com_boxsub_type01">
								<div class="list_type_box">
									<div class="com_boxshadow_type01">
										<a href="javascript:void(0);" @click.prevent="fn_openAcLnPopup" class="mint">
											<div class="new_tit_area">
												<div class="tit"><span>영농자금대출잔액</span></div>
												<span class="total_price mint">
													<em class="num">{{fangCptlnBac  | numberFilter}}</em><em class="unit">원</em>
												</span>
											</div>
										</a>
									</div>				
								</div>
							</div>
						</template>
						<!-- 그래프 영역 -->
						<div class="com_box_type01">	
							<div class="com_box_tit mb30" v-if="basBfYyPnlAm==0 && basBfYyXpsAm==0 && basBfYyRevAm==0"><b>전년도 데이터가 없습니다</b><br><span class="sub_txt">(영농달력에 수집된 수입/지출 데이터 기준)</span></div>
							<!-- 손익차이금액 pnlDifAm -->
							<div class="com_box_tit mb30" v-else-if="pnlDifAm > 0">전년 손익 대비 <b>{{pnlDifAm  | numberFilter}}원 많아요</b><br><span class="sub_txt">(영농달력에 수집된 수입/지출 데이터 기준)</span></div>
							<div class="com_box_tit mb30" v-else-if="pnlDifAm == 0">전년도와 손익이 <b>같습니다.</b><br><span class="sub_txt">(영농달력에 수집된 수입/지출 데이터 기준)</span></div>
							<div class="com_box_tit mb30" v-else-if="pnlDifAm < 0">전년 손익 대비 <b>{{pnlDifAm_minus  | numberFilter}}원 적어요</b><br><span class="sub_txt">(영농달력에 수집된 수입/지출 데이터 기준)</span></div>
							<!-- 손익 = (수입 - 지출) 산식을 제거 하기로 20211105일에 기획에서 결정 -->
							<!-- <p class="dot_msg">손익 = (수입 - 지출)</p> -->
							<div class="horizon_chart_wrap mt10">
								<div class="horizon_chart type2">
									<!-- 음수인 경우 표시가 불가하기에 차트에서는 제외하는걸로 기획에서 결정 --> 
									<!-- <div class="chart_set">
										<div class="hori_chart_label">
											손익
										</div> 
										<div class="hori_chart">
											<div class="bar bar01" :style="'width:'+basBfYyPnlAm_percent+'%'"><span class="mount"><span>{{basBfYyPnlAm*0.001  | numberFilter}}</span></span></div>
											<div class="bar bar02" :style="'width:'+basYyPnlAm_percent+'%'"><span class="mount"><span>{{basYyPnlAm*0.001  | numberFilter}}</span></span></div>
										</div>
									</div> -->
									<div class="chart_set">
										<div class="hori_chart_label">
											지출
										</div>
										<div class="hori_chart">
											<div class="bar bar01" :style="'width:'+basBfYyXpsAm_percent+'%'">
												<span class="mount"><span>{{inqYy_1}}년</span>
													<span>{{basBfYyXpsAm | numberFilter}}원</span>
												</span>
											</div>
											<div class="bar bar02" :style="'width:'+basYyXpsAm_percent+'%'"><span class="mount"><span>{{inqYy}}년</span><span>{{basYyXpsAm | numberFilter}}원</span></span></div>
										</div>
									</div>
									<div class="chart_set">
										<div class="hori_chart_label">
											수입
										</div>
										<div class="hori_chart">
											<div class="bar bar01" :style="'width:'+basBfYyRevAm_percent+'%'"><span class="mount"><span>{{inqYy_1}}년</span><span>{{basBfYyRevAm | numberFilter}}원</span></span></div>
											<div class="bar bar02" :style="'width:'+basYyRevAm_percent+'%'"><span class="mount"><span>{{inqYy}}년</span><span>{{basYyRevAm | numberFilter}}원</span></span></div>
										</div>
									</div>
							</div>
							<!-- <div class="chart_legend type2"> -->
							<div class="chart_legend type3">
								<span class="lgnd b1"><i></i> {{inqYy_1}}년</span>
								<span class="lgnd b2"><i></i> {{inqYy}}년</span>
								<span class="fr notice">[단위: 원]</span></div>
							</div>
						</div>
						<!-- //그래프 영역 -->
						<!-- 이전년도 선택 시 과거 데이터이므로 비노출 처리 P106 -->
						<template v-if="year == inqYy">
							<div class="com_box_type01 com_box_list01">
								<div class="list_type_box">
									<div class="new_tit_area">
										<div class="tit"><span>다음달({{nextMonth}}월) 까지 여유자금 확인하기</span></div>
									</div>					
									<ul class="list_type_02">
										<li class="no_link"><!-- 20211025 한별 no_link 클래스 추가 -->
											<!-- 예금은 상세 팝업 없는걸로 기획과 합의 됨.(20210906) -->
											<!-- <a href="javscript:void(0);"  style="display: none;"> -->
											<dl>
												<dt>
													<div>
														<em>예금</em>
													</div>
												</dt>
												<dd>
													<!-- 20210909 링크 대신 pr17로 간격 유지 --> 
													<!-- 각 금액이 마이너스 일 경우 빨간색 으로 처리 20211020 한윤석과장(퍼블) 및 기획에서 모두 검정색으로 수정 요청-->
													<span class="com_price">
														<em class="num">{{dpAm  | numberFilter}}</em><em class="unit">원</em>
													</span>
												</dd>
											</dl>
										</li>
										<li class="no_link"><!-- 20211025 한별 no_link 클래스 추가 -->
											<dl>
												<dt>
													<div>
														<em>여유자금</em><!-- 20210820 한별 텍스트 수정 -->
													</div>
												</dt>
												<dd>
													<!-- 각 금액이 마이너스 일 경우 빨간색 으로 처리 20211020 한윤석과장(퍼블) 및 기획에서 모두 검정색으로 수정 요청-->
													<span class="com_price">
														<em class="num">{{nedAm  | numberFilter}}</em><em class="unit">원</em>
													</span>
												</dd>
											</dl>
										</li>
										<li>
											<a href="javascript:void(0);" @click.prevent="fn_openCrdInqPopup('1')" role="button"> 
												<dl>
													<dt>
														<div>
															<em>들어올 돈</em>
														</div>
													</dt>
													<dd>
														<!-- 각 금액이 마이너스 일 경우 빨간색 으로 처리 20211020 한윤석과장(퍼블) 및 기획에서 모두 검정색으로 수정 요청-->
														<span class="com_price">
															<em class="num">{{bndAm  | numberFilter}}</em><em class="unit">원</em>
														</span>
													</dd>
												</dl>
											</a>
										</li>
										<li>
											<a href="javascript:void(0);" @click.prevent="fn_openCrdInqPopup('2')" role="button">
												<dl>
													<dt>
														<div>
															<em>나갈 돈</em>
														</div>
													</dt>
													<dd>
														<!-- 각 금액이 마이너스 일 경우 빨간색 으로 처리 20211020 한윤석과장(퍼블) 및 기획에서 모두 검정색으로 수정 요청-->
														<span class="com_price">
															<em class="num">{{dbtAm  | numberFilter}}</em><em class="unit">원</em>
														</span>
													</dd>
												</dl>
											</a>
										</li>
									</ul>
								</div>
							</div>
						</template>
						<div class="com_box_link">
							<div class="com_box_type01 bg_link_01">
								<a href="javascript:void(0);" @click.prevent="movePage('PDPD')" role="button">
									<span>대출<br/>알아보기</span>
								</a>
							</div>
							<div class="com_box_type01 bg_link_02">
								<a href="javascript:void(0);" @click.prevent="movePage('AC')" role="button">
								<span>예적금<br>살펴보기</span>
								</a>
							</div>
						</div>
						<a href="javascript:void(0);" @click.prevent="movePage('PDMY')" role="button">
							<div class="com_box_type03 com_box_banner bg06">
								<div class="text ">
									목돈 준비를 위해<br><span class="color">목표자금 관리를 해보세요.</span>
								</div>
							</div>
						</a>
					</div>
					
				</div>
				<!--// content E -->
			<!-- </div> -->
			<!--// content-view E -->
		<footersV2 type="sz" />
    </page>
</template>
<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import Page from '@/views/layout/Page.vue'
import FootersV2 from "@/views/layout/FootersV2.vue"
// import SzCategoryV2 from '@/components/category/SzCategoryV2.vue'
import AnCategoryV2 from '@/components/category/AnCategoryV2.vue'
import AnSubCategoryV2 from '@/components/category/AnSubCategoryV2.vue'	

import commonService from '@/service/commonService'
import SZFP2102 from '@/views/page/SZ/FP/SZFP2102/SZFP2102'
import SZFP2107 from '@/views/page/SZ/FP/SZFP2107/SZFP2107'
import SZFP2109 from '@/views/page/SZ/FP/SZFP2109/SZFP2109'
import SZFC2103 from '@/views/page/SZ/FC/SZFC2103/SZFC2103'

export default {
    name : "SZFP2101",
    data: () => {
        return {
			// 초기값 세팅
			myFarmTxt				: "",
			yerDisabled				: "disabled",
			inqDsc					: "1",			// 작목구문이 마이농장일 경우 1 세부작목일 경우 2
			year 					: "",			// 현재 년
			inqYy    				: '',  			// 조회년도
			varNaWrsLclc   			: "000",		// 상품분류코드(대분류)
			varNaWrsMclc   			: "000",		// 상품분류코드(중분류)
			varNaWrsSclc   			: "000",		// 상품분류코드(소분류)
			varNaWrsSclfnm 			: "나의농장",	 // 상품소분류명
			myPnlAmInfo				: {},
			totRevAm				: 0, 			// 총수입금액
			pdcsAm					: 0, 			// 생산비
			gupftAm					: 0, 			// 순수익금액
			icmAm					: 0, 			// 소득금액
			fangCptlnBac			: 0,			// 영농자금대출잔액
			basYy					: 0, 			// 기준년도       
			basYyPnlAm				: 0, 			// 기준년월손익금액  
			basYyXpsAm				: 0, 			// 기준년월지출금액   
			basYyRevAm				: 0, 			// 기준년월수입금액   
			basBfYy					: 0, 			// 기준전년도      
			basBfYyPnlAm			: 0, 			// 기준전년월손익금액  
			basBfYyXpsAm			: 0, 			// 기준전년월지출금액  
			basBfYyRevAm			: 0, 			// 기준전년월수입금액  
			basYy_percent			: 0, 			// 기준년도       
			basYyPnlAm_percent		: 0, 			// 기준년월손익금액  
			basYyXpsAm_percent		: 0, 			// 기준년월지출금액   
			basYyRevAm_percent		: 0, 			// 기준년월수입금액   
			basBfYy_percent			: 0, 			// 기준전년도      
			basBfYyPnlAm_percent	: 0, 			// 기준전년월손익금액  
			basBfYyXpsAm_percent	: 0, 			// 기준전년월지출금액  
			basBfYyRevAm_percent	: 0, 			// 기준전년월수입금액  
			pnlDifAm				: 0,			// 손익차이금액
			pnlDifAm_minus			: 0,			// 손익차이금액(마이너스 경우에 마이너스 제거한 금액)
			dpAm					: 0,			// 예금금액
			bndAm					: 0,			// 채권금액(들어올돈)
			dbtAm					: 0,			// 채무금액(나갈돈)
			nedAm					: 0,			// 필요금액
			chartMinimum			: 0,
			chartMaximum			: 0,
			chartInterval			: 0,
			nextMonth				: "",			// 다음달(현재월의)
			chartData				: [],
			layoutStr				: "",
			endPointDisplayNa_showYn: false,
			nextDate				: ""
        }
    },
    mixins: [
		popupMixin,
		commonMixin
	],
	created() {
		const date        	= new Date()
		this.year			= date.getFullYear() 							// 현재 년(비교용)
		this.inqYy  		= date.getFullYear()    						// 년
		this.inqYy_1		= this.year -1									// 전년 
		this.currentMonth 	= ("0" + (date.getMonth() +1)).slice(-2)  		// 월 
		// this.nextMonth		= date.getMonth() +2						// 다음달
		this.nextDate		= new Date(date.setMonth(date.getMonth() +1))
		this.nextYear		= this.nextDate.getFullYear()					// 다음달에 해당하는 년
		this.nextMonth		= this.nextDate.getMonth() +1					// 다음달
    }, 
    mounted() {
		this.initComponent()
		//PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
		initComponent() {
			this.myFarmTxt = "나의농장"   //나의농장 Select 초기화
			this.getData()
		},
		getData() {
			this.fn_getSearchList();

		},
		// 영농수익분석 상세 팝업_SZFP2101
		fn_openFpDtlPopup(){
			//상세 팝업 호출
			const config = {
				component : SZFP2102,
				params : {
					mydtCusno 	: this.getUserInfo("mydtCusno"),	// 마이데이터고객번호
					inqYy 		: this.inqYy,						// 조회년도
					currentMonth: this.currentMonth,				// 현재 월
					inqDsc 		: this.inqDsc,						// 조회구분코드
					naWrsLclc 	: this.varNaWrsLclc,				// 경제통합상품대분류코드
					naWrsMclc 	: this.varNaWrsMclc,				// 경제통합상품중분류코드
					naWrsSclc 	: this.varNaWrsSclc					// 경제통합상품소분류코드
				}
			}

			modalService.openPopup(config)
		},
		// 영농자금대출 내역 상세 팝업
		fn_openAcLnPopup(){
			//상세 팝업 호출
			const config = {
				component: SZFP2107, 
				params: { // 파라미터
					"mydtCusno" : this.getUserInfo("mydtCusno"),
					"fmach" 	: ""
				}
			}

			modalService.openPopup(config)		
		},
		// 영농자금대출 내역 상세 팝업(채권채무(들어올돈, 나갈돈) 상세 조회)
		fn_openCrdInqPopup(val){ // 1 : 들어올 돈, 2: 나갈 돈
			//상세 팝업 호출
			const config = {
				component: SZFP2109, 
				params: { 		
					"mydtCusno" : this.getUserInfo("mydtCusno"),	// 마이데이터고객번호
					"inqDsc" 	: val,								// 조회구분코드(1 : 들어올 돈, 2: 나갈 돈)
					"nextMonth"	: this.nextMonth,
					"nextYear"	: this.nextYear,					// 다음달에 해당하는 년
				}
			}

			modalService.openPopup(config)		
		},
		// 하단 아이템 링크(3개)
		movePage(type) {

			const config = {
				name: this.getMovePageName(type)
			}
			commonService.movePage(config)
		},
		// 등록 버튼 눌러서 페이지 이동시 이동할 화면 이름 리턴
		getMovePageName(type) {
			// if (type === 'PDMY') return 'PDMY2001' // 나의목표
			if (type === 'PDMY') return 'PDMY2001' // 나의목표
			// if (type === 'PDPD') return 'PDPD1101' // 상품추천
			if (type === 'PDPD') return 'PDPD1001' // 상품추천
			if (type === 'PDCA') return 'PDCA1101' // 자동차
			// if (type === 'AC')  return 'ASAC1101' // 자산
			if (type === 'AC')  return 'ASAC2001' // 자산
			return ''
		},
        //[이전/이후 꺽쇠]선택시
        selectClamp(flag){

			this.varNaWrs = this.varNaWrsLclc+this.varNaWrsMclc+this.varNaWrsSclc

			// 작목구문이 마이농장일 경우 1 세부작목일 경우 2
			if (this.varNaWrs === "000000000") {// 나의농장일 경우
			this.inqDsc = "1";
			} else {//세부항목일 경우
			this.inqDsc = "2";
			}
			
			this.myFarmTxt = this.varNaWrsSclfnm   // (변수)상품분류명 = (response)상품분류명

            //이전 꺽쇠 AND 월이 00인 경우,    
            if (flag === 'p') {
				this.inqYy = Number(this.inqYy) - 1
				this.inqYy_1 =  Number(this.inqYy) - 1   
				if(this.inqYy >= this.year){
					this.yerDisabled = "disabled";  
				}else{
					this.yerDisabled = "";  
					this.fn_getSearchList()  // 해당 정보 조회 함수 호출
				}        
            } else if (flag === 'n') {

				this.inqYy = Number(this.inqYy)+ 1
				this.inqYy_1 =  Number(this.inqYy) - 1   
				
				if(this.inqYy > this.year){
					this.yerDisabled = "disabled"; 
					this.inqYy = this.year
				}else if(this.inqYy === this.year){
					this.yerDisabled = "disabled"; 
					this.inqYy = this.year
					this.fn_getSearchList()  // 해당 정보 조회 함수 호출
				}else{
					this.yerDisabled = "";  
					this.fn_getSearchList()  // 해당 정보 조회 함수 호출
				}           
			} 
		},
		//[나의농장] 클릭시(슬라이드팝업)
        fn_slidmyFarmPopOpen() {

            const config = {
				params : {
					mydtCusno : this.getUserInfo('mydtCusno') ,  //this.getUserInfo('mydtCusno') , //마이데이터고객번호
				},
                renderer: {
                    component: SZFC2103,
                }
			}
            modalService.openSlidePagePopup(config).then(response => {

                this.varNaWrsLclc   = response.naWrsLclc    // (변수)상품분류코드(대분류) = 상품분류코드(대분류)
                this.varNaWrsMclc   = response.naWrsMclc    // (변수)상품분류코드(중분류) = 상품분류코드(중분류)
                this.varNaWrsSclc   = response.naWrsSclc    // (변수)상품분류코드(소분류) = 상품분류코드(소분류)
                this.varNaWrsSclfnm = response.naWrsSclfnm  // (변수) 상품분류명= 상품분류명
                this.varNaWrs 		= this.varNaWrsLclc+this.varNaWrsMclc+this.varNaWrsSclc

				// 작목구문이 마이농장일 경우 1 세부작목일 경우 2
				if (this.varNaWrs === "000000000") {// 나의농장일 경우
				this.inqDsc = "1";
				} else {//세부항목일 경우
				this.inqDsc = "2";
				}
				
                this.myFarmTxt = this.varNaWrsSclfnm   // (변수)상품분류명 = (response)상품분류명
                this.fn_getSearchList()  				// 해당 정보 조회 함수 호출
            })
		},
		// 영농 손익분석 조회_SZFP2101
		fn_getSearchList(){
			const config = {
				url: '/sz/fp/01r01',
				data: {
					"mydtCusno" : this.getUserInfo('mydtCusno'),
					"inqYy"    	: this.inqYy,						// 조회년도
					"inqDsc"    : this.inqDsc,						// 조회구분코드
					"naWrsLclc" : this.varNaWrsLclc,				// 상품분류코드(대분류)
					"naWrsMclc" : this.varNaWrsMclc,				// 상품분류코드(중분류)
					"naWrsSclc" : this.varNaWrsSclc					// 상품분류코드(소분류)
				}
			}

			apiService.call(config).then(response => {

				this.myPnlAmInfo = response || {};
				this.naWrsLclc			=	this.varNaWrsLclc;
				this.naWrsMclc			=	this.varNaWrsMclc;
				this.naWrsSclc			=	this.varNaWrsSclc;
				this.totRevAm         	=	response.totRevAm;   
				this.pdcsAm	      		=	response.pdcsAm;		  
				this.gupftAm	      	=	response.gupftAm;	  
				this.icmAm            	=	response.icmAm;       
				this.fangCptlnBac     	=	response.fangCptlnBac;
				this.basYy	      		=	response.basYy;
				this.basYyPnlAm	      	=	response.basYyPnlAm;  
				this.basYyXpsAm	      	=	response.basYyXpsAm;
				this.basYyRevAm	      	=	response.basYyRevAm;  
				this.basBfYy	      	=	response.basBfYy;
				this.basBfYyPnlAm     	=	response.basBfYyPnlAm;
				this.basBfYyXpsAm     	=	response.basBfYyXpsAm;
				this.basBfYyRevAm     	=	response.basBfYyRevAm;
				this.pnlDifAm	      	=	response.pnlDifAm;	 
				if(this.pnlDifAm < 0) {
					this.pnlDifAm_minus = Math.abs(response.pnlDifAm);	// 음수를 양수로 변환
				}
				this.dpAm	      		=	response.dpAm;	  
				this.bndAm	      		=	response.bndAm;	  
				this.dbtAm	      		=	response.dbtAm;	  
				this.nedAm	      		=	response.nedAm;

				let maxBasAm = 0;
				if(Math.abs(response.basYyPnlAm) > maxBasAm){
					maxBasAm = Math.abs(response.basYyPnlAm)
				}
				if(Math.abs(response.basYyXpsAm) > maxBasAm){
					maxBasAm = Math.abs(response.basYyXpsAm)
				}
				if(Math.abs(response.basYyRevAm) > maxBasAm){
					maxBasAm = Math.abs(response.basYyRevAm)
				}
				if(Math.abs(response.basBfYyPnlAm) > maxBasAm){
					maxBasAm = Math.abs(response.basBfYyPnlAm)
				}
				if(Math.abs(response.basBfYyXpsAm) > maxBasAm){
					maxBasAm = Math.abs(response.basBfYyXpsAm)
				}
				if(Math.abs(response.basBfYyRevAm) > maxBasAm){
					maxBasAm = Math.abs(response.basBfYyRevAm)
				}

				if(maxBasAm != 0){
					this.basYyPnlAm_percent = Math.ceil(response.basYyPnlAm*100/maxBasAm);
					this.basYyXpsAm_percent = Math.ceil(response.basYyXpsAm*100/maxBasAm);
					this.basYyRevAm_percent = Math.ceil(response.basYyRevAm*100/maxBasAm);

					this.basBfYyPnlAm_percent = Math.ceil(response.basBfYyPnlAm*100/maxBasAm);
					this.basBfYyXpsAm_percent = Math.ceil(response.basBfYyXpsAm*100/maxBasAm);
					this.basBfYyRevAm_percent = Math.ceil(response.basBfYyRevAm*100/maxBasAm);
				}else{
					this.basYyPnlAm_percent = 0;
					this.basYyXpsAm_percent = 0;
					this.basYyRevAm_percent = 0;

					this.basBfYyPnlAm_percent = 0;
					this.basBfYyXpsAm_percent = 0;
					this.basBfYyRevAm_percent = 0;
				}

				// 차트 호출
				this.getChart();
			})
		},
		// 수입지출현황 차트
		getChart() {
			// rMateChart 를 생성합니다.
			// 파라메터 (순서대로)
			//  1. 차트의 id ( 임의로 지정하십시오. )
			//  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
			//  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
			//  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
			//  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)
			// rMateChartH5.create("chart1", "chartHolder", "", "100%", "200rem");

			rMateChartH5.create("chart1", "chartHolder", "useContextMenu=false", "100%", "200rem");

			// rMateChartH5.create("chart1", "chartHolder", "", "100%", "100%");
			// -----------------------차트 설정 시작-----------------------

			// rMateChart 를 생성합니다.
			// 파라메터 (순서대로)
			//  1. 차트의 id ( 임의로 지정하십시오. )
			//  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
			//  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
			//  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
			//  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)

			// 차트 데이터
			this.chartData = [];
			let allChartData = [];
			allChartData[0]  	=  {"Month":"1월",  "Rev":this.myPnlAmInfo.janRevAm, "Xps":this.myPnlAmInfo.janXpsAm};
			allChartData[1]  	=  {"Month":"2월",  "Rev":this.myPnlAmInfo.febRevAm, "Xps":this.myPnlAmInfo.febXpsAm};
			allChartData[2]  	=  {"Month":"3월",  "Rev":this.myPnlAmInfo.marRevAm, "Xps":this.myPnlAmInfo.marXpsAm};
			allChartData[3]  	=  {"Month":"4월",  "Rev":this.myPnlAmInfo.aprRevAm, "Xps":this.myPnlAmInfo.aprXpsAm};
			allChartData[4]  	=  {"Month":"5월",  "Rev":this.myPnlAmInfo.mayRevAm, "Xps":this.myPnlAmInfo.mayXpsAm};
			allChartData[5]  	=  {"Month":"6월",  "Rev":this.myPnlAmInfo.junRevAm, "Xps":this.myPnlAmInfo.junXpsAm};
			allChartData[6]  	=  {"Month":"7월",  "Rev":this.myPnlAmInfo.julRevAm, "Xps":this.myPnlAmInfo.julXpsAm};
			allChartData[7]  	=  {"Month":"8월",  "Rev":this.myPnlAmInfo.augRevAm, "Xps":this.myPnlAmInfo.augXpsAm};
			allChartData[8] 	=  {"Month":"9월",  "Rev":this.myPnlAmInfo.sepRevAm, "Xps":this.myPnlAmInfo.sepXpsAm};
			allChartData[9] 	=  {"Month":"10월", "Rev":this.myPnlAmInfo.octRevAm, "Xps":this.myPnlAmInfo.octXpsAm};
			allChartData[10] 	=  {"Month":"11월", "Rev":this.myPnlAmInfo.novRevAm, "Xps":this.myPnlAmInfo.novXpsAm};
			allChartData[11] 	=  {"Month":"12월", "Rev":this.myPnlAmInfo.decRevAm, "Xps":this.myPnlAmInfo.decXpsAm};

			let allChartDataNew = [];
			allChartDataNew.push({"Month":"1월",  "Rev":this.myPnlAmInfo.janRevAm, "Xps":this.myPnlAmInfo.janXpsAm});
			allChartDataNew.push({"Month":"2월",  "Rev":this.myPnlAmInfo.febRevAm, "Xps":this.myPnlAmInfo.febXpsAm});
			allChartDataNew.push({"Month":"3월",  "Rev":this.myPnlAmInfo.marRevAm, "Xps":this.myPnlAmInfo.marXpsAm});
			allChartDataNew.push({"Month":"4월",  "Rev":this.myPnlAmInfo.aprRevAm, "Xps":this.myPnlAmInfo.aprXpsAm});
			allChartDataNew.push({"Month":"5월",  "Rev":this.myPnlAmInfo.mayRevAm, "Xps":this.myPnlAmInfo.mayXpsAm});
			allChartDataNew.push({"Month":"6월",  "Rev":this.myPnlAmInfo.junRevAm, "Xps":this.myPnlAmInfo.junXpsAm});
			allChartDataNew.push({"Month":"7월",  "Rev":this.myPnlAmInfo.julRevAm, "Xps":this.myPnlAmInfo.julXpsAm});
			allChartDataNew.push({"Month":"8월",  "Rev":this.myPnlAmInfo.augRevAm, "Xps":this.myPnlAmInfo.augXpsAm});
			allChartDataNew.push({"Month":"9월",  "Rev":this.myPnlAmInfo.sepRevAm, "Xps":this.myPnlAmInfo.sepXpsAm});
			allChartDataNew.push({"Month":"10월", "Rev":this.myPnlAmInfo.octRevAm, "Xps":this.myPnlAmInfo.octXpsAm});
			allChartDataNew.push({"Month":"11월", "Rev":this.myPnlAmInfo.novRevAm, "Xps":this.myPnlAmInfo.novXpsAm});
			allChartDataNew.push({"Month":"12월", "Rev":this.myPnlAmInfo.decRevAm, "Xps":this.myPnlAmInfo.decXpsAm});

			let max	 = 0;
			let min  = 0;
			let max1 = 0;
			let max2 = 0;
			for(let i=0;i<allChartDataNew.length;i++){

				max1 = allChartDataNew[i].Rev;
				max2 = allChartDataNew[i].Xps;
				if(max1 > max){
					max = max1;
				}
				if(max2 > max){
					max = max2;
				}

				if(max1 < min){
					min = max1;
				}
				if(max2 < min){
					min = max2;
				}
			}

			this.chartMinimum = min+Math.ceil(min/5);	// 그래픽 상단 사이즈 조정
			this.chartMaximum = max+Math.ceil(max/5);	// 그래픽 상단 사이즈 조정
			this.chartInterval = Math.ceil(max/5) 		// 소수점 올림

			// 금액이 마이너스인 경우(원천데이터 없이 취소 데이터만 존재시 마이너스로 나옴.잘못된 데이터인 경우에 대한 예외 처리임.)
			if(this.chartInterval == 0){
				this.chartMaximum = Math.abs(min)
			}

			let newChartData = [];
			if(this.year == this.inqYy){ // 현재 년도시 현재 월까지만 차트 보여줌.
				for(let i=0;i<Number(this.currentMonth);i++){
					newChartData[i] = allChartData[i];
				}
				this.chartData	= newChartData;
			}else{
				this.chartData = allChartData;
			}

			if(this.chartData.length > 0){
				let size = 0
				size = this.chartData.length

				// 알메이트 차트 endPointDisplayName 중첩되는 경우 보이지 않기(최종 금액 차액이 글자 높이 보다 커야 중첩 방지.)
				if(Math.abs(this.chartData[size-1].Rev - this.chartData[size-1].Xps) > this.chartInterval){
					this.endPointDisplayNa_showYn = true
				}else{
					this.endPointDisplayNa_showYn = false
				}
			}else{
				this.endPointDisplayNa_showYn = false
			}

			// 스트링 형식으로 레이아웃 정의.
			this.layoutStr =
				'<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
					+'<Options>'
						+'<Caption text="배경에 이미지 삽입"/>'
						// +'<Legend />'
						// 수입-지출 클릭시 보여주기 숨기기 옵션(20210916_KHC)
						// +'<SubCaption text="[[단위: 원]]" fontSize="12" textAlign="right" color="#111"/>'
						+'<Legend useVisibleCheck="true" horizontalGap="0" position="bottom" horizontalScrollPolicy="off"/>'
					+'</Options>'
					+'<Line2DChart showDataTips="true" type="stacked" gutterTop="6" endPointDisplayName="'+this.endPointDisplayNa_showYn+'">'
						// 천단위 구분자 추가(20210914_KHC)
						+'<NumberFormatter id="numfmt" useThousandsSeparator="true" />'
						+'<horizontalAxis>'
							+'<CategoryAxis categoryField="Month"/>'
						+'</horizontalAxis>'
						+'<verticalAxis >'
							+'<LinearAxis maximum="'+this.chartMaximum+'" tickCount="5" interval="'+this.chartInterval+'" formatter="{numfmt}">원</LinearAxis>'
						+'</verticalAxis>'
                        +'<verticalAxisRenderers>'
                      +'</verticalAxisRenderers>'
						+'<series>'
							+'<Line2DSeries yField="Rev" displayName="수입" itemRenderer="CircleItemRenderer" radius="5">'
								+'<showDataEffect>'
									+'<SeriesInterpolate/>'
								+'</showDataEffect>'
								+'<lineStroke>'
									+'<Stroke color="#3b80df" weight="2.5"/>'
								+'</lineStroke>'
								+'<stroke>'
									+'<Stroke color="#3b80df" weight="3"/>'
								+'</stroke>'
								+'<fill>'
									+'<SolidColor color="#3b80df"/>'
								+'</fill>'
							+'</Line2DSeries>'
							+'<Line2DSeries yField="Xps" displayName="지출" itemRenderer="RectangleItemRenderer" radius="5">'
								+'<showDataEffect>'
									+'<SeriesInterpolate/>'
								+'</showDataEffect>'
								+'<lineStroke>'
									+'<Stroke color="#f9637c" weight="2.5"/>'
								+'</lineStroke>'
								+'<stroke>'
									+'<Stroke color="#f9637c" weight="3"/>'
								+'</stroke>'
								+'<fill>'
									+'<SolidColor color="#f9637c"/>'
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

			// rMateChartH5.calls 함수를 이용하여 차트의 준비가 끝나면 실행할 함수를 등록합니다.
			// argument 1 - rMateChartH5.create시 설정한 차트 객체 아이디 값
			// argument 2 - 차트준비가 완료되면 실행할 함수 명(key)과 설정될 전달인자 값(value)
			// 아래 내용은 
			// 1. 차트 준비가 완료되면 첫 전달인자 값을 가진 차트 객체에 접근하여
			// 2. 두 번째 전달인자 값의 key 명으로 정의된 함수에 value값을 전달인자로 설정하여 실행합니다.
			rMateChartH5.calls("chart1", {
				"setLayout" : this.layoutStr,
				"setData" : this.chartData
			});
		}
	},
	components : {
        Page,
		FootersV2,
		// SzCategoryV2,
		AnCategoryV2,
		AnSubCategoryV2,
    }
}
</script>