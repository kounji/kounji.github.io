<!--
/*************************************************************************
* @ 서비스경로 : 금융생활 > NH콕마이카
* @ 페이지설명 : 금융생활 > NH콕마이카 > 차계부 지출내역
* @ 파일명     : src\views\page\AN\CA\ANCA2209\ANCA2209.vue
* @ 작성자     : CS528043
* @ 작성일     : 2022-07-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-26              CS528043              최초작성(PDCA1112 고도화 변경)
*************************************************************************/
-->
<template>

	<!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1 class="">차계부 지출내역</h1>
		</div>
		
		<!-- <div class="popup_content com_no_bottom"> --> <!-- 하단 버튼 없을때 com_no_bottom -->
		<div class="popup_content">
			<div class="com_inner com_line_type01 com_top_type02">
				<!-- 상단 날짜이동 버튼 -->
				<div class="select_date tac">
					<button class="cal_btn cal_prev" aria-label="한달 전 이동" @click.prevent="fn_moveMonth('P')"></button>
					<a href="javascript:void(0);" title="년월선택" class="year_month"  @click.prevent="openSlideMonthPop()">
						<span class="num">{{rzsBasYm | dateFilter('YYYY')}}</span>년 <span class="num">{{rzsBasYm | dateFilter('M')}}</span>월
					</a>
					<button class="cal_btn cal_next"  :class="monNext ? '' : 'disabled'" aria-label="한달 후 이동" @click.prevent="fn_moveMonth('N')"></button>
				</div>

				<!-- 자동차 슬라이드 팝업 -->
				<a href="javascript:void(0);" data-popup="slide_popup_01" class="com_box_type01 custom_box_type01" @click.prevent="fn_openCarList(vhcnoVal)">
					<div>
						<div class="com_pop_tit01">{{carBrannm.concat(' ', carCrtpnm)}}<br/>{{carGrdnm}}</div>
						<!-- <span class="car_num">
							<span>{{vhcnoVal}}</span>
						</span> -->
						<span class="label_bor"><em>{{vhcnoVal}}</em></span><!-- 2022-09-01 마크업 수정 --> 
					</div>
				</a>

				<div class="chart_box">
					<p class="chart_sub_txt">[단위: 원]</p>
					<!-- 차트가 삽입될 DIV -->
					<div id="chartHolder" role="img" :aria-label="ariaLabelText"></div>
					<!-- 차트가 삽입될 DIV -->

					<div class="re_flex">
						<div class="text_info gray">월 평균 지출 : <em class="ml6">{{rcnMt6AvgXpsAm | numberFilter}}</em>원</div>
						<a href="javascript:void(0);" class="com_btnround_type10" @click.prevent="fn_goPopPage()">
							<span>내차 소비 리포트</span>
						</a>
					</div>
				</div>
			</div>
			<div class="com_inner"><!--  버튼 플루팅일때 pd_fixed_bottom -->
				<!-- tab 영역 -->
				<template v-if="xpsTpList.length > 0"> 
					<div class="tab_radius">
						<ul role="button">
							<li v-for="(xpsTpInfo, index) in xpsTpList" :key="'key1_' + index">
								<a href="javascript:void(0);" :data-tab-tooltip="'XP_DSC_' + xpsTpInfo.xpsTpDsc" role="button" :class="inqXpsTpDsc == xpsTpInfo.xpsTpDsc ? 'active' : ''" @click.prevent="fn_initCall(xpsTpInfo.xpsTpDsc)" :ref="'XP_DSC_' + xpsTpInfo.xpsTpDsc">{{xpsTpInfo.xpsTpDsNm}}</a>
							</li>
						</ul>
					</div>
				</template>
				<!-- toolTip 영역 -->
				<template v-if="xpsTpList.length > 0">
					<div class="tab_tooltip_wrap">
						<div v-for="(xpsTpInfo, index) in xpsTpList" :key="'key2_' + index" :id="'XP_DSC_' + xpsTpInfo.xpsTpDsc" class="tab_tooltip">
							<!-- DATA -->
							<template v-if="xpsTpBrkDataList.length > 0">
								<template v-for="(item, index2) in xpsTpBrkDataList">
									<!-- 전체(9) -->
									<template v-if="xpsTpInfo.xpsTpDsc == '9'"> 
										<div class="re_detail_list"  :key="'key2_' + index2">	
											<i :class="item.classId"></i>
											<div class="re_flex">
												<strong class="text_info list_name">{{item.carbkXpsTpDsnm}}</strong>
												<span class="list_price">
													<em>{{item.tram | numberFilter}}</em>원
												</span>
											</div>									
										</div>
									</template>

									<!-- 차량유지비(1) -->
									<template v-if="xpsTpInfo.xpsTpDsc == '1'">
										<template v-if="xpsTpInfo.xpsTpDsc == item.carbkXpsTpDsc"> 
											<div class="re_detail_list"  :key="'key21_' + index2">	
												<i :class="item.classId"></i>
												<div class="re_flex">
													<strong class="text_info list_name">{{item.carbkXpsTpDsnm}}</strong>
													<span class="list_price">
														<em>{{item.tram | numberFilter}}</em>원
													</span>
												</div>									
											</div>
										</template>
									</template>

									<!-- 주유/충전비(2) -->
									<template v-if="xpsTpInfo.xpsTpDsc == '2'">
										<template v-if="xpsTpInfo.xpsTpDsc == item.carbkXpsTpDsc"> 
											<div class="re_detail_list"  :key="'key22_' + index2">	
												<i :class="item.classId"></i>
												<div class="re_flex">
													<strong class="text_info list_name">{{item.carbkXpsTpDsnm}}</strong>
													<span class="list_price">
														<em>{{item.tram | numberFilter}}</em>원
													</span>
												</div>									
											</div>
										</template>
									</template>
								</template>
							</template>
							<!-- NO DATA -->
							<template v-else>
								<!-- 차량유지비 클릭 시 -->
								<template v-if="inqXpsTpDsc=='1'">
									<div class="re_detail_list">		
										<i class="AS20000006"></i>
										<div class="re_flex">
											<strong class="text_info list_name">차량유지비</strong>
											<span class="list_price">
												<em>0</em>원
											</span>
										</div>
									</div>
								</template>
								<!-- 주유/충전비 클릭 시 -->
								<template v-else-if="inqXpsTpDsc=='2'">
									<div class="re_detail_list">
										<i class="CB40000001"></i>
										<div class="re_flex">
											<strong class="text_info list_name">주유/충전비</strong>
											<span class="list_price">
												<em>0</em>원
											</span>
										</div>
									</div>
								</template>
								<!-- 전체 클릭 시 -->
								<template v-else>
									<div class="re_detail_list">
										<i class="AS20000006"></i>
										<div class="re_flex">
											<strong class="text_info list_name">차량유지비</strong>
											<span class="list_price">
												<em>0</em>원
											</span>
										</div>
									</div>
									<div class="re_detail_list">													
										<i class="CB40000001"></i>
										<div class="re_flex">
											<strong class="text_info list_name">주유/충전비</strong>
											<span class="list_price">
												<em>0</em>원
											</span>
										</div>
									</div>
								</template>
							</template>
							<span class="arrow"></span>
						</div>
					</div>
				</template>	

				<!-- 2022-11-18 추가 -->
				<template v-if="inqXpsTpDsc !== '1'">
					<template v-if="unRegXpsList.length > 0">
						<div class="com_box_type01 toggle_list_box2 custom_list re_detail_list">
							<div data-ui-toggle="box" class="toggle_box_area" :class="fn_getCss">
								<button type="button" class="view_btn" :aria-expanded="fn_getAriaExpanded" @click.prevent="fn_showBtn()">
									<div class="new_tit_area">
										<div class="tit"><span class="com_txtinfo_type01">미등록 주유/충전비 {{unRegXpsList.length}}건</span></div>
									</div>
									<em class="open">열기</em>
									<em class="close">닫기</em>
								</button>
							</div>
							<ul class="view_cont">
								<li v-for="(xpsBrkInfo, idx) in unRegXpsList" :key="'unRegXpsList_' + idx">
									<a href="javascript:void(0)" role="button" @click.prevent="fn_goANCA2211(xpsBrkInfo)">
										<div class="re_flex">
											<strong class="text_info">{{xpsBrkInfo.prcMchtnm}}</strong>
											<span class="list_price">
												<em>{{xpsBrkInfo.tram | numberFilter}}</em>원
											</span>
											<div class="text_info">
												<em>{{xpsBrkInfo.trDt | dateFilter('D')}}일</em>
												<em>{{xpsBrkInfo.cdcoCdWrsnm}}</em>
											</div>
										</div>
									</a>
								</li>
							</ul>
						</div>
						<p class="dot_msg mt15">내역을 선택해 주유비와 주행거리를 등록하세요!</p>
					</template>
				</template>
				<!-- //2022-11-18 추가 -->





				<!-- 지출 데이터 영역 -->
				<template v-if="mstBasYmXpsBrkList.length > 0">					
					<div v-for="(mstBasYmXpsBrkInfo, index) in mstBasYmXpsBrkList" :key="'key3_' + index" class="re_detail_list ico_posi">
						<div class="new_tit_area">
							<div class="tit">
								<span>{{mstBasYmXpsBrkInfo.trDt | dateFilter('D')}}일({{fn_getDayName(mstBasYmXpsBrkInfo.trDt)}})</span>
							</div>
						</div>
						<ul>
							<template v-for="(basYmXpsBrkInfo, index2) in basYmXpsBrkList" :data="basYmXpsBrkInfo">
								<li :key="index2" v-if="basYmXpsBrkInfo.trDt == mstBasYmXpsBrkInfo.trDt">
									<i :class="basYmXpsBrkInfo.carbkCtgrId"><span class="blind">{{basYmXpsBrkInfo.carbkCtgrnm}}</span></i>
									<a href="javascript:void(0);" role="button" @click.prevent="fn_goCarExpenseDetail(basYmXpsBrkInfo.vhcnoVal, basYmXpsBrkInfo.trDt, basYmXpsBrkInfo.sqno)">
										<strong class="list_name" v-if="basYmXpsBrkInfo.inqKey != null">{{basYmXpsBrkInfo.prcMchtnm}}</strong>
										<strong class="list_name" v-else>{{basYmXpsBrkInfo.trCntn}}</strong>										
										<div class="re_flex">											
											<div class="text_info">
												<template v-if="basYmXpsBrkInfo.inqKey != null">
													<em v-if="basYmXpsBrkInfo.cdcoCdWrsnm != null">{{basYmXpsBrkInfo.cdcoCdWrsnm}}</em>
												</template>
												<template v-else>
													<em>{{basYmXpsBrkInfo.trDt | dateFilter('YYYY.MM.DD')}}</em>
												</template>												
											</div>
											<span class="list_price">
												<em>{{basYmXpsBrkInfo.tram | numberFilter}}</em>원
											</span>
											<template v-if="basYmXpsBrkInfo.inqKey != null">
												<div class="text_info">
													<em>{{basYmXpsBrkInfo.allIstSc == '0' ? '일시불' : '할부(' + basYmXpsBrkInfo.allIstSc + '개월)'}}</em>
												</div>
											</template>
										</div>
									</a>
								</li>							
							</template>
						</ul>
					</div>
				</template>
				<!-- No Data -->				
				<template v-else>
					<div class="no_data_box">
						<div class="no_data_list">
							<p>조회된 정보가 없습니다.</p>
						</div>
					</div>
				</template>
				<!-- 버튼삭제 / as-is 버튼적용필요 기획서 참고필요 -->
			</div>

			<!-- 2022-09-13 추가 -->
			<div class="com_btn_area fixed">
				<a href="javascript:void(0);" class="com_btn_round" role="button" @click="assetAdd('1')">
					<span class="btn_plus black">지출추가</span>
				</a>
			</div>
			<!-- //2022-09-13 추가 -->			
		</div>

        <!-- float S -->
        <!-- <div class="dimmed dimmed_1000 dim_soft" :style="'display:' + (isShowFloatDiv ? 'block' : '') + ';'" @click="fn_closeFloatDiv()"></div>
        <div class="toggle-box sticky dimmed_1100 popup_float">
            <div data-ui-toggle="sticky" :class="isShowFloatDiv ? 'active open' : 'close'">
                <button type="button" class="btn_float" :aria-expanded="isShowFloatDiv" @click="fn_showFloatDiv()">
                    <span class="tit">더보기 메뉴</span>
                    <em class="open">열기</em><em class="close">닫기</em>
                </button>
                <div class="view_box p0">
                    <button type="button" class="btn_01" @click="assetAdd('2')"><span>직접 입력</span></button>
                    <button type="button" class="btn_02" @click="assetAdd('1')"><span>지출 추가</span></button>
                </div>
            </div>
        </div> -->
        <!-- // float E -->

		<a href="javascript:void(0);" class="btn_close" @click.prevent="close('reload')"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import ANCA2211 from '@/views/page/AN/CA/ANCA2211/ANCA2211'		// 차계부 상세내역
import PDCA1115 from '@/views/page/PD/CA/PDCA1115/PDCA1115'		// 자동차 선택(슬라이드 팝업)
import ANCA2004 from '@/views/page/AN/CA/ANCA2004/ANCA2004' 	// 내차소비리포트
import {dateFormat, getDayDowCName, monthAdd, monthDiff} from '@/utils/date'
import _ from 'lodash'
import '@/assets/js/rMateChartH5/JS/rMateFunction.js'

//import {round} from '@/utils/number'

export default {
    name : "ANCA2209",
    data: () => {
		return {
            // input
			mydtCusno          : "",	// 마이데이터고객번호
			vhcnoVal           : "",	// 차량번호
            carBrannm          : "",	// 자동차브랜드명
            carCrtpnm          : "",	// 자동차모델명
            carGrdnm           : "",	// 자동차등급명
            carFuelCntn        : "",	// 자동차연료내용

            rzsBasYm           : "",	// 실적기준년월
            inqVhcDsc          : "",	// 조회차량구분코드 (1: 개별, 9:전체)
            inqXpsTpDsc        : "",	// 조회지출유형구분코드 (1: 차량유지비, 2:주유/충전비, 9: 전체)
            inqXpsTpDsNm       : "",	// 조회지출유형구분명

            // output
            hldVhcCcn          :0,		// 보유차량대수
            hldVhcList         :[],		// 보유차량목록
            rcnMt6XpsTtAm      :0,		// 최근6개월지출합계금액
            rcnMt6AvgXpsAm     :0,		// 최근6개월평균지출금액
            rcnMt6XpsList      :[],		// 최근6개월지출목록
            basYmXpsTtAm       :0,		// 기준년월지출합계금액
            basYmCarMtncsAm    :0,		// 기준년월차량유지비금액
            basYmOilgChggAm    :0,		// 기준년월주유충전비금액
            basYmCarMtncsCn    :0,		// 기준년월차량유지비건수
            basYmOilgChggCn    :0,		// 기준년월주유충전비건수
            basYmXpsCn         :0,		// 기준년월지출건수
            basYmXpsBrkList    :[],		// 기준년월지출내역목록
			mstBasYmXpsBrkList :[],		// 날짜순지출내역데이터
			xpsTpList          :[],		// 지출유형구분 카테고리 리스트
			xpsTpBrkDataList   :[],		// 지출유형별 합계
			unRegXpsList       :[],		// 차계부미등록지출내역 			

            // S :: add. 21.09.07 직접입력/수입추가 float, dimmed 처리용
            isShowFloatDiv : false,
			// E :: add. 21.09.07 직접입력/수입추가 float, dimmed 처리용
			isShowData         : true,		// 차계부 미등록내역show/hide

			monNext : false,			// 다음달 조회
			curYm   : "",				// 현재년월

			ariaLabelText: '',		    // 접근성 라벨
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
    computed : {
        fn_getCss() {
            return this.isShowData ? "active open" : "close"
		},
        fn_getAriaExpanded() {
            return this.isShowData ? "true" : "false"
		},		
    },	
    methods: {
        initComponent(params) {
			
            this.mydtCusno = this.getUserInfo('mydtCusno')
            this.rzsBasYm  = dateFormat(new Date(), 'YYYYMM')	// 실적기준년월
			this.curYm     = dateFormat(new Date(), 'YYYYMM')	// 현재년월

			// 2022 고도화에서는 개별조회 하기로 함
			this.inqVhcDsc      = "1"					// 조회차량구분코드 (1: 개별, 9:전체)	
            this.inqXpsTpDsc    = params.inqXpsTpDsc	// 조회지출유형구분코드 (1: 차량유지비, 2:주유/충전비, 9: 전체)
			this.inqXpsTpDsNm   = params.inqXpsTpDsNm	// 조회지출유형구분명	
			this.vhcnoVal       = params.vhcnoVal		// 차량번호값
		
			this.xpsTpList =  [{"xpsTpDsc" : "9", "xpsTpDsNm" : "전체"}
							, {"xpsTpDsc" : "1", "xpsTpDsNm" : "차량유지비"}
							, {"xpsTpDsc" : "2", "xpsTpDsNm" : "주유/충전비"}
								]	// 조회지출유형구분

			// 미래년월 선택못하게 처리(현재년월, 선택년월 비교)
			let mDiff = monthDiff(this.curYm, this.rzsBasYm)
	
			if(mDiff <= 0){
				this.monNext = false
			}else{
				this.monNext = true
			}

			console.log("화면에서 넘어온 값 : ", params)
			console.log("화면에서 넘어온 차량번호 : ", this.vhcnoVal)
			console.log("마이데이터 고객번호 : ", this.mydtCusno)
			console.log("실적기준년월 : ", this.rzsBasYm)
			console.log("조회지출유형구분코드 : ", this.inqXpsTpDsc)
			console.log("조회지출유형구분명 : ", this.inqXpsTpDsNm)
			console.log("조회차량구분코드 : ", this.inqVhcDsc)

			console.log("xpsTpList : ", this.xpsTpList)

			// toolTip view
			this.$nextTick(() => {
				
				let xpDsc = 'XP_DSC_'.concat('',this.inqXpsTpDsc)
				
				console.log('123123', this.$refs[xpDsc][0].className)

				if(this.$refs[xpDsc][0].className == 'active'){
					this.fn_initCall(this.inqXpsTpDsc)
				}
			})

			// 차계부 지출내역 조회
			//this.getData()
		},
		// toolTip view and Call
		fn_initCall(inqXpsTpDsc) {

			console.log("toolTipView !!!!")

			if(this.inqXpsTpDsc != inqXpsTpDsc){
				this.inqXpsTpDsc = inqXpsTpDsc
			}

			this.$nextTick(() => {

				$('.tab_radius a').each(function(){
					//e.stopImmediatePropagation();
					if($(this).hasClass('active')){
						var $this = $(this),
							_thisId = $this.attr('data-tab-tooltip'),
							_thisleft = $this.outerWidth(true)/2 + $this.offset().left - 30
						$('#'+_thisId).show().find('.arrow').css('left',_thisleft)
						$('#'+_thisId).siblings().hide()
					}
				})	
			})

			// 차계부 지출내역 조회
			this.getData()
		},		
        getData() {

            this.hldVhcCcn          = 0
            this.hldVhcList         = []
            this.rcnMt6XpsTtAm      = 0
            this.rcnMt6AvgXpsAm     = 0
            this.rcnMt6XpsList      = []
            this.basYmXpsTtAm       = 0
            this.basYmCarMtncsAm    = 0
            this.basYmOilgChggAm    = 0
            this.basYmCarMtncsCn    = 0
            this.basYmOilgChggCn    = 0
            this.basYmXpsCn         = 0
            this.basYmXpsBrkList    = []
			this.mstBasYmXpsBrkList = []
			this.xpsTpBrkDataList   = []

            const config = {
                url : '/pd/ca/12r01',
                data : {
                      mydtCusno   : this.mydtCusno   // 마이데이터고객번호
                    , rzsBasYm    : this.rzsBasYm    // 실적기준년월
                    , inqVhcDsc   : this.inqVhcDsc   // 조회차량구분코드
                    , inqVhcnoVal : this.vhcnoVal    // 조회차량번호값
                    , inqXpsTpDsc : this.inqXpsTpDsc // 조회지출유형구분코드
                }
            }
            apiService.call(config).then(response => {

				console.log("response >>>> ", response)
                
                this.hldVhcCcn       = response.hldVhcCcn
                this.hldVhcList      = response.hldVhcList      || []
                this.rcnMt6XpsTtAm   = response.rcnMt6XpsTtAm
                this.rcnMt6AvgXpsAm  = response.rcnMt6AvgXpsAm
                this.rcnMt6XpsList   = response.rcnMt6XpsList   || []
                this.basYmXpsTtAm    = response.basYmXpsTtAm
                this.basYmCarMtncsAm = response.basYmCarMtncsAm
                this.basYmOilgChggAm = response.basYmOilgChggAm
                this.basYmCarMtncsCn = response.basYmCarMtncsCn
                this.basYmOilgChggCn = response.basYmOilgChggCn
				this.basYmXpsBrkList = response.basYmXpsBrkList || []
				this.unRegXpsList	 = response.unRegXpsList || []

				let idx 			 = this.hldVhcList.findIndex(obj => obj.vhcnoVal === this.vhcnoVal)
				this.carBrannm       = response.hldVhcList[idx].carBrannm	// 자동차브랜드명
				this.carCrtpnm       = response.hldVhcList[idx].carCrtpnm	// 자동차모델명
				this.carGrdnm        = response.hldVhcList[idx].carGrdnm	// 자동차등급명
				this.carFuelCntn     = response.hldVhcList[idx].carFuelCntn	// 자동차연료내용

                this.rcnMt6XpsList = _.chain(this.rcnMt6XpsList)
                                    .orderBy(['rzsYm'],['asc'])
                                    .value()

                if(this.basYmXpsBrkList.length > 0) {
					this.mstBasYmXpsBrkList = this.fn_setMstBasYmXpsBrkList(this.basYmXpsBrkList)	// 날짜순으로 리스트 만들기
					this.xpsTpBrkDataList   = this.fn_setXpsTpBrkDataList(this.basYmXpsBrkList)		// 지출유형별 데이터 합계

					// 차량유지비(있는지 체크)
					if(!this.xpsTpBrkDataList.some((obj) => obj.carbkXpsTpDsc === '1')){
						this.xpsTpBrkDataList.push({"carbkXpsTpDsc":"1", "carbkXpsTpDsnm":"차량유지비", "classId" : "AS20000006", "tram" :  0, "carbkCtgrId" : "", "carbkCtgrnm" : ""})
					}

					// 주유충전비(있는지 체크)
					if(!this.xpsTpBrkDataList.some((obj) => obj.carbkXpsTpDsc === '2')){
						this.xpsTpBrkDataList.push({"carbkXpsTpDsc":"2", "carbkXpsTpDsnm":"주유/충전비", "classId" : "CB40000001", "tram" :  0, "carbkCtgrId" : "", "carbkCtgrnm" : ""})
					}
					console.log('있다? : ', this.xpsTpBrkDataList.some((obj) => obj.carbkXpsTpDsc === '1'))
					console.log('있다2? : ', this.xpsTpBrkDataList.some((obj) => obj.carbkXpsTpDsc === '2'))					
				}

				console.log("basYmXpsBrkList : ", this.xpsTpBrkDataList)

				//this.monNext = true
				
				// 차계부 지출내역 차트생성
				const chartData =  []
				this.rcnMt6XpsList.forEach(d => {
					chartData.push({ "rzsYm" : dateFormat(d.rzsYm, 'M월'), "rzsXpsAm" : d.rzsXpsAm })
				})

				// 접근성 라벨
				this.ariaLabelText = this.getAriaLabelText(chartData)				

				setTimeout(this.getChart(chartData), 10)				
            })
		},

		getAriaLabelText(dataList) {
			if (dataList.length == 0) return ''

			// 월 평균 지출 - 12월 812, 1월 785, 2월 785, 3월 10,000 입니다.
			let ariaLabelText = '월평균지출 - '

			dataList.forEach(d => {
				ariaLabelText += d.rzsYm + ' '
				ariaLabelText += d.rzsXpsAm + '원 '
			})
			
			ariaLabelText += '입니다.'

			return ariaLabelText
		},

		// 지출유형별 데이터 합계
        fn_setXpsTpBrkDataList(list) {
			let resultData = []

			_.reduce(list,function(res, value){
				if(!res[value.carbkXpsTpDsc]){
					res[value.carbkXpsTpDsc] = {carbkXpsTpDsc : value.carbkXpsTpDsc
											, carbkXpsTpDsnm : value.carbkXpsTpDsnm
											, carbkCtgrId : value.carbkCtgrId
											, carbkCtgrnm : value.carbkCtgrnm
											, classId : value.carbkXpsTpDsc == '1' ? "AS20000006" : "CB40000001"  
											, tram : 0}
					resultData.push(res[value.carbkXpsTpDsc])
				}
				res[value.carbkXpsTpDsc].tram += value.tram
				return res    
			}, {})
			
			return resultData 
		},

		// 날짜순으로 리스트 만들기
        fn_setMstBasYmXpsBrkList(list) {
			const result = _.chain(list)
						.groupBy('trDt')
						.keys()
						.map(d => {
							return {
                                trDt : d,
								list : _.filter(list, {trDt: d})
							}
						})
						.orderBy('trDt', 'desc')
						.value()
			return result
		},
		
		// 요일구하기
        fn_getDayName(yyyymmdd){
            return getDayDowCName(yyyymmdd)
		},
		
		// 차계부 상세		
        fn_goCarExpenseDetail(vhcnoVal, trDt, sqno) {

            let compName = ANCA2211

            var param = {vhcnoVal : vhcnoVal
                        ,trDt     : trDt
                        ,sqno     : sqno
                        ,modifyYn : 'Y' /* 수정 */
                        }
			const config = {
				component : compName,
				params    : param
			}
			modalService.openPopup(config).then((response) => {
                if(response === 'reSelect'){
                    this.getData()  // 재조회
                }
			})
		},
				
        /*
        *  S :: add. 21.09.07 직접입력/수입추가 버튼(Floating Btn , Dimmed) 이벤트 처리
        */
        fn_showFloatDiv() {
            if(this.isShowFloatDiv) {
                this.isShowFloatDiv = false
                $(".dimmed dimmed_1000").fadeOut(200)
            } else {
                this.isShowFloatDiv = true
                $(".dimmed dimmed_1000").fadeIn(200)
            }
		},
		
        /*
        * S :: add. 21.09.07 직접입력/수입추가 Dimmed 클릭 처리
        */
        fn_closeFloatDiv() {
            this.fn_showFloatDiv()
		},

		// 지출추가 + 버튼
        assetAdd(flag){
            
            // S :: add. 21.09.07 float dimmed, div close
            this.fn_closeFloatDiv()
            // E :: add. 21.09.07 float dimmed, div close

            let compName = ANCA2211

            var param = {
                "assetFlag"   : flag,
                "carBrannm"   : this.carBrannm,
                "carCrtpnm"   : this.carCrtpnm,
                "carGrdnm"    : this.carGrdnm,
                "vhcnoVal"    : this.vhcnoVal,
                "carFuelCntn" : this.carFuelCntn,
                modifyYn : 'N' /* 등록 */
            }
            const config = {
                component: compName,
                params : param
            }
            modalService.openPopup(config).then(response => {
                
                if(response === 'reSelect'){
                    // 재조회
                    this.getData()
                }
            })
		},

		// < 한달 전 후 이동 >
        fn_moveMonth(dsc) {
            if (dsc == "P") {
                this.rzsBasYm = monthAdd(-1, this.rzsBasYm, "YYYYMM")
                this.getData()
            }

            if (this.monNext && dsc == "N") {
                this.rzsBasYm = monthAdd(1, this.rzsBasYm, "YYYYMM")
                this.getData()
			}
			
			// 미래년월 선택못하게 처리(현재년월, 선택년월 비교)
			let mDiff = monthDiff(this.curYm, this.rzsBasYm)

			if(mDiff <= 0){
				this.monNext = false
			}else{
				this.monNext = true
			}
		},

		// 자동차 선택 팝업 호출
		fn_openCarList(vhcnoVal) {
			let compName = PDCA1115

			var param = {val : vhcnoVal}
			const config = {
				component : compName,
				params    : param
			}

			modalService.openPopup(config).then((response) => {
				console.log("팝업return", response)

				if(response.vhcnoVal != '') {
					this.inqVhcDsc   = "1"						// 조회차량구분코드 (1: 개별, 9:전체)
					this.vhcnoVal    = response.vhcnoVal		// 차량번호
					this.carBrannm   = response.carBrannm		// 자동차브랜드명
					this.carCrtpnm   = response.carCrtpnm		// 자동차모델명
					this.carGrdnm    = response.carCrtpnm		// 자동차등급명
					this.carFuelCntn = response.carFuelCntn 	// 자동차연료내용

					// 재조회
					this.getData()
				}
			})
		},

		// 내차 소비 리포트
        fn_goPopPage() {

            let compName = ANCA2004
			let param = {vhcnoVal : this.vhcnoVal}
			
			const config = {
				component : compName,
				params    : param
			}

			modalService.openPopup(config).then((response) => {
                if(response == 'reload' || response == true) {	// 재조회
					this.getData()
                }
			})
		},		

        // 년월 슬라이드팝업 호출
        openSlideMonthPop(){
            const config = {
                params: {
                    title: '년월 선택',
					yyyymm : this.rzsBasYm,
                    limit  : 60,
					includeCurYm : 'Y',  // 현재월 포함여부			
                },
            }
        
            modalService.openSlideSelectMonth(config).then(response => {

                this.rzsBasYm = dateFormat(response, 'YYYYMM');

				// 미래년월 선택못하게 처리(현재년월, 선택년월 비교)
				let mDiff = monthDiff(this.curYm, this.rzsBasYm)

				if(mDiff <= 0){
					this.monNext = false
				}else{
					this.monNext = true
				}

                // 재조회
                this.getData()
            })
		},
		
		fn_goANCA2211(xpsBrkInfo){

            let compName = ANCA2211

            var param = {
                "assetFlag"   : '1',
                "carBrannm"   : this.carBrannm,
                "carCrtpnm"   : this.carCrtpnm,
                "carGrdnm"    : this.carGrdnm,
                "vhcnoVal"    : this.vhcnoVal,
                "carFuelCntn" : this.carFuelCntn,
				modifyYn      : 'N', /* 등록 */
				"xpsBrkInfo"  : xpsBrkInfo,
				"carbkXpsTpDsc"  : '2',
				"carbkXpsTpDsnm" : '주유/충전비',
				"carbkCtgrId"    : 'CB40000001',
				"carbkCtgrnm"    : '주유/충전비',				
			}
			
			console.log('params : ', param)

            const config = {
                component: compName,
                params : param
            }
            modalService.openPopup(config).then(response => {
                
                if(response === 'reSelect'){
                    // 재조회
                    this.getData()
                }
            })		
		},

		// 차트생성
		getChart(chartData) {
			// -----------------------차트 설정 시작-----------------------
		
			// rMateChart 를 생성합니다.
			// 파라메터 (순서대로)
			//  1. 차트의 id ( 임의로 지정하십시오. )
			//  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
			//  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
			//  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
			//  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)
			rMateChartH5.create("chart1", "chartHolder", "useContextMenu=false", "100%", "170rem");
		
			// 스트링 형식으로 레이아웃 정의.
			var layoutStr =
				'<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
					+'<SeriesInterpolate id="ss"/>'
					/*
					Combination3D 차트 생성시에 필요한 Combination3DChart 정의합니다
					showHorizontalAxisDataTip : 가로축에 대한 데이터 팁 보여주기 여부를 설정합니다.
					showVerticalAxisDataTip : 세로축에 대한 데이터 팁 보여주기 여부를 설정합니다.
					axisDataTipJsFunction : 데이터 팁의 내용을 작성하는 자바스크립트 함수명을 지정
					*/
					// 22-10-25 selectionMode="single" 수정
					/* 22-10-26 접근성 추가 displayCompleteCallFunction="removeTabindex" */					
					+'<Column2DChart showDataTips="true" selectionMode="single" columnWidthRatio="0.48" showHorizontalAxisDataTip="true" showVerticalAxisDataTip="true" axisDataTipJsFunction="'+ axisDataTipFunc() +'" displayCompleteCallFunction="rMateFunction.removeTabindex">'
						// 천단위 구분자 추가
						+'<NumberFormatter id="numfmt" useThousandsSeparator="true" />'						
						+'<horizontalAxis>'
							+'<CategoryAxis categoryField="rzsYm"/>'
						+'</horizontalAxis>'
						+'<verticalAxis>'
							+'<LinearAxis formatter="{numfmt}" />'
						+'</verticalAxis>'
						+'<series>'
							+'<Column2DSeries itemRenderer="SemiCircleColumnItemRenderer" labelPosition="outside" yField="rzsXpsAm" displayName="지출 금액" showDataEffect="{ss}" showValueLabels="[]">'
								+'<fills>'
								/* Series안에 색을 채울 때(여러색) fills에 주목 */
									+'<SolidColor color="#23a0a5"/>'
									/* color:색깔 */
									+'<SolidColor color="#57c9ae"/>'
									+'<SolidColor color="#84b0fc"/>'
									+'<SolidColor color="#668ee2"/>'
								+'</fills>'
							+'</Column2DSeries>'
						+'</series>'
					+'</Column2DChart>'
				+'</rMateChart>';
				
			function axisDataTipFunc(id, text){
				return "rzsYm : " + text;
			}
		
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
			//function rMateChartH5ChangeTheme(theme){
			//	document.getElementById("chart1").setTheme(theme);
			//}
		},
		// show & hide
		fn_showBtn(){
			this.isShowData = !this.isShowData
		}		
    }
}

</script>