<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산진단 > 지표별 재무 진단 (부채관리)
* @ 페이지설명 : 나의자산 > 자산진단 > 지표별 재무 진단 (부채관리)
* @ 파일명     : src\views\page\AS\IP\ASIP2004\ASIP2004.vue
* @ 작성자     : 
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10              CS533437              최초작성
*************************************************************************/
-->
<template>
	<!-- 전체 팝업 시작 -->
	
		<!-- 부채관리 tabBox 시작 -->
		<div id="tab_03" role="tabpanel" class="cmm-tab-panel on">
			<div class="com_inner">
				<ul class="assetDoughnutGrp layoutBox gray_box_2023">
					<li class="text">부채 상환 비중을 통해 건강한<br>삶의 질 유지 조건</li>
					
					<li class="grp">
						<template v-if="ixSatCnt > 2">
							
								<div class="donutBox safe">
									<div class="donutCh">
										<span>{{ctgrDgnRztTxt}}</span>
									</div>
								</div>
							
						</template>		
						<!-- v4 추가 ixSatCnt == 2 : safeN -->
						<template v-else-if="ixSatCnt === 2">								
							<div class="donutBox safeN">
								<div class="donutCh">
									<span>{{ctgrDgnRztTxt}}</span>
								</div>
							</div>								
						
						</template>	
						<template v-else-if="ixSatCnt === 0">								
							<div class="donutBox safeNon nonInt"><!-- .nonInt ani효과X -->
								<div class="donutCh">
									<span>{{ctgrDgnRztTxt}}</span>
								</div>
							</div>	
						</template>						

						<template v-else-if="ixSatCnt === 1">							
							<div class="donutBox Nsafe">
								<div class="donutCh">
									<span>{{ctgrDgnRztTxt}}</span>
								</div>
							</div>								
						
						</template>   
					</li>
				</ul>
				<!--<ul class="layoutBox peerKeyword">
					<li class="keyword">
						<em class="unit">#{{peerVal_1}}</em>
						<em class="unit">#{{peerVal_2}}</em>
					</li>					
					<li class="peerCheck" >
						<span>또래 보기</span>
						<span class="cmm-switch sm">							
							<input type="checkbox" id="check019" name="check01" v-model="peState" >
							<label for="check01"><em class="blind"></em></label>
						</span>
					</li>
				</ul>-->
				<div class="com_box_type01 bottomBtnType financeChk open " :class="csmLfeIxSatYn"><!-- 상태class 부족 false, 충족 true -->
					<div class="tit layoutBox wAuto">
						<div class="left tooltipBtnWrap"><!-- 1011 tooltipBtnWrap 클래스 추가 -->
							<strong class="titH4">소비생활부채상환율</strong>
							<button class="tooltipBtn" @click.prevent="fn_openSlide('ASIP2018')"></button><!-- 1011 툴팁 버튼으로 변경 -->
							<!--<div class="custom_tooltip">
								<div class="com_tooltip_type02 com_tooltip_type03">
									<a href="javascript:void(0);" class="com_btn_info" role="button">
										<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
									</a>
									<div class="com_ballon_type01 com_ballon_type02" style="display:none;">
										<div>
											<strong class="title">* 소비생활부채상환율이란?</strong>
											<p>
												신용대출, 카드, 할부 등 일상 생활 중 일어나는 부채에 대한 평가하는 지표로 아래 항목으로 진단해요.<br><br>
												= 생활부채상환액 ÷ 총소득  
											</p>
											<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
										</div> 
									</div>
								</div>
							</div>-->
						</div>
						<div class="right">
							<span class="txtFinish">{{csmLfeIxSatYnTxt}}</span>
						</div>
					</div>
					<!-- progressBar -->
					<div class="custom_box peerType">
						<div class="content_wrap">
							<div class="progressBar_wrapper">
								<div class="progressBar">
									<div class="bar">
										<div class="popover_wrap">
											<span class="popover bg_white">												
												<em class="num">{{csmLfeCusIxVal}}</em>%
												<em class="num blind">{{csmLfeCusIxVal/(csmLfeApptIxVal*2)*100}}</em>	
												<span class="arrow"></span>
											</span>
										</div>
										<div class="peerAltBox">
											<span>적정</span>
										</div>										
										<div class="peerAltBox pe" :style="{left: (csmLfePeerIxVal/(csmLfeApptIxVal*2)*100)+'%', display:peState?'block':'none'}">										
											<span></span>
										</div>
									</div>
								</div>
							</div>
							<div class="loan_date">
								<span class="pe" :style="{display:peState?'block':'none'}">또래 <em class="num">{{csmLfePeerIxVal}}%</em></span>
								<span>적정 <em class="num">{{csmLfeApptIxVal}}%이하</em></span>
							</div>
						</div>
					</div>
					<!-- //progressBar -->
					<div class="slideBox">
						<div class="gray_box_2023 type2" id="firstBox">
							<p>총자산에 비해 소비생활부채상환액이 적정 대비<br><span class="pointColor">{{csmLfeDbtRpyIxGapAm | numberFilter}}원</span> 많아요</p>
						</div>
						<ul class="list_type_02 financeType">
							<li>
								<span>총소득(연간)</span>
								<em>{{totIcmAm | numberFilter}}원</em>
							</li>
							<li>
								<span>소비생활부채상환액(연간)</span>
								<em>{{csmLfeDbtRpyAm | numberFilter}}원</em>
							</li>
						</ul>
					</div>
					<button class="bottomBtn">접기</button>
				</div>
				<div class="com_box_type01 bottomBtnType financeChk " :class="dbtBdnIxSatYn">
					<div class="tit layoutBox wAuto">
						<div class="left tooltipBtnWrap"><!-- 1011 tooltipBtnWrap 클래스 추가 -->
							<strong class="titH4">부채비율</strong>
							<button class="tooltipBtn" @click.prevent="fn_openSlide('ASIP2019')"></button><!-- 1011 툴팁 버튼으로 변경 -->
							<!--<div class="custom_tooltip">
								<div class="com_tooltip_type02 com_tooltip_type03">
									<a href="javascript:void(0);" class="com_btn_info" role="button">
										<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
									</a>
									<div class="com_ballon_type01 com_ballon_type02" style="display:none;">
										<div>
											<strong class="title">* 부채비율란?</strong>
											<p>
												장기적인 측면에서 부채의 적정성을 평가하는 지표로 아래 항목으로 진단해요.<br><br>
												= 총부채 ÷ 총자산
											</p>
											<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
										</div> 
									</div>
								</div>
							</div>-->
						</div>
						<div class="right">
							<span class="txtFinish">{{dbtBdnIxSatYnTxt}}</span>
						</div>
					</div>
					<!-- progressBar -->
					<div class="custom_box peerType">
						<div class="content_wrap">
							<div class="progressBar_wrapper">
								<div class="progressBar">
									<div class="bar">
										<div class="popover_wrap">
											<span class="popover bg_white">												
												<em class="num">{{dbtBdnCusIxVal}}</em>%
												<em class="num blind">{{dbtBdnCusIxVal/(dbtBdnApptIxVal*2)*100}}</em>													
												<span class="arrow"></span>
											</span>
										</div>
										<div class="peerAltBox">
											<span>적정</span>
										</div>										
										<div class="peerAltBox pe" :style="{left: (dbtBdnPeerIxVal/(dbtBdnApptIxVal*2)*100)+'%', display:peState?'block':'none'}">										
											<span></span>
										</div>
									</div>
								</div>
							</div>
							<div class="loan_date">
								<span class="pe" :style="{display:peState?'block':'none'}">또래 <em class="num">{{dbtBdnPeerIxVal}}%</em></span>
								<span>적정 <em class="num">{{dbtBdnApptIxVal}}%이하</em></span>
							</div>
						</div>
					</div>
					<!-- //progressBar -->
					<div class="slideBox">
						<div class="gray_box_2023 type2" id="secondBox">
							<p>총자산에 비해 총부채잔액이 적정 대비<br><span class="pointColor">{{totDbtBdnIxGapAm | numberFilter}}원</span> 많아요</p>
						</div>
						<ul class="list_type_02 financeType">
							<li>
								<span>총자산(현재)</span>
								<em>{{totAsetAm | numberFilter}}원</em>
							</li>
							<li>
								<span>총부채(현재)</span>
								<em>{{totDbtAm | numberFilter}}원</em>
							</li>
						</ul>
					</div>
					<button class="bottomBtn">더보기</button>
				</div>
				<div class="com_box_type01 bottomBtnType financeChk " :class="dbtRpyIxSatYn">
					<div class="tit layoutBox wAuto">
						<div class="left tooltipBtnWrap"><!-- 1011 tooltipBtnWrap 클래스 추가 -->
							<strong class="titH4">부채상환비율</strong>
							<button class="tooltipBtn" @click.prevent="fn_openSlide('ASIP2020')"></button><!-- 1011 툴팁 버튼으로 변경 -->
							<!--<div class="custom_tooltip">
								<div class="com_tooltip_type02 com_tooltip_type03">
									<a href="javascript:void(0);" class="com_btn_info" role="button">
										<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
									</a>
									<div class="com_ballon_type01 com_ballon_type02" style="display:none;">
										<div>
											<strong class="title">* 부채상환비율이란?</strong>
											<p>
												가계 소득 중 부채상환을 위한 지출액 규모 평가하는 지표로 아래 항목으로 진단해요.<br><br>
												= 총부채 상환액 ÷ 총소득
											</p>
											<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
										</div> 
									</div>
								</div>
							</div>-->
						</div>
						<div class="right">
							<span class="txtFinish">{{dbtRpyIxSatYnTxt}}</span>
						</div>
					</div>
					<!-- progressBar -->
					<div class="custom_box peerType">
						<div class="content_wrap">
							<div class="progressBar_wrapper">
								<div class="progressBar">
									<div class="bar">
										<div class="popover_wrap">
											<span class="popover bg_white">												
												<em class="num">{{dbtRpyCusIxVal}}</em>%
												<em class="num blind">{{dbtRpyCusIxVal/(dbtRpyApptIxVal*2)*100}}</em>													
												<span class="arrow"></span>
											</span>
										</div>
										<div class="peerAltBox">
											<span>적정</span>
										</div>
										<div class="peerAltBox pe" :style="{left: (dbtRpyPeerIxVal/(dbtRpyApptIxVal*2)*100)+'%', display:peState?'block':'none'}">																				
											<span></span>
										</div>
									</div>
								</div>
							</div>
							<div class="loan_date">
								<span class="pe" :style="{display:peState?'block':'none'}">또래 <em class="num">{{dbtRpyPeerIxVal}}%</em></span>
								<span>적정 <em class="num">{{dbtRpyApptIxVal}}%이하</em></span>
							</div>
						</div>
					</div>
					<!-- //progressBar -->
					<div class="slideBox">
						<div class="gray_box_2023 type2" id="thirdBox">
							<p>총소득에 비해 총부채상환액이 적정 대비<br><span class="pointColor">{{totDbtRpyIxGapAm | numberFilter}}원</span> 많아요</p>
						</div>
						<ul class="list_type_02 financeType">
							<li>
								<span>총소득(연간)</span>
								<em>{{totIcmAm | numberFilter}}원</em>
							</li>
							<li>
								<span>총부채상환액(연간)</span>
								<em>{{totDbtRpyAm | numberFilter}}원</em>
							</li>
						</ul>
					</div>
					<button class="bottomBtn">더보기</button>
				</div>
			</div>
			<!--//com_inner -->
		</div>
		<!--// tabBox 종료 -->	
</template>

<script>

/*eslint-disable */    
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'    
import {dateFormat, monthAdd, monthDiff, dayDiff, dayAdd} from '@/utils/date'
import {infoToolipHandler} from '@/utils/jUtils'    

import ASIP2004 from '@/views/page/AS/IP/ASIP2004/ASIP2004'
import ASIP2018 from '@/views/page/AS/IP/ASIP2018/ASIP2018'
import ASIP2019 from '@/views/page/AS/IP/ASIP2019/ASIP2019'
import ASIP2020 from '@/views/page/AS/IP/ASIP2020/ASIP2020'
	

export default {
	
	name : "ASIP2004",
        data: () => {
            return {                
				currYmd              : "", // 현재년월일
				cusnm                : "", // 로그인 사용자 이름
				ctgrDgnRzt           : "", // 카테고리진단결과
				ixSatCnt             : 0,  // 충족지수개수
				totDbtRpyAm          : 0,  // 총부채상환액
				totDbtAm             : 0,  // 총부채
				totAsetAm            : 0,  // 총자산
				totIcmAm             : 0,  // 총소득
				csmLfeDbtRpyAm       : 0,  //소비생활부채상환액
				csmLfeDbtRpyIxGapAm  : 0,  //소비생활부채상환차이액
				totDbtBdnIxGapAm     : 0,  //총부채차이액
				totDbtRpyIxGapAm     : 0,  //총부채상환차이액
				ctgrDgnRztTxt        : "", //1: 적정, 2: 개선

				tranList    		 : [], // 임시 리스트
				
				peerNo               : "", //또래값
				peerNo_1             : "", //또래값1
				peerNo_2             : "", //또래값2
				peerVal_1             : "", //또래값1
				peerVal_2             : "", //또래값2

				csmLfeIxSatYn        : "", // 소비생활부채상환지수 지표 결과 (true/false)
				csmLfeIxSatYnTxt     : "", // 소비생활부채상환지수 지표 결과 (충족/과다)
				csmLfeCusIxVal       : "", // 소비생활부채상환지수 지표 (%)
				csmLfePeerIxVal      : "", // 소비생활부채상환지수 또래 지표 (%)
				csmLfeApptIxVal      : "", // 소비생활부채상환지수 적정 지표 (%)

				dbtBdnIxSatYn        : "", // 부채부담지수 지표 결과 (true/false)
				dbtBdnIxSatYnTxt     : "", // 부채부담지수 지표 결과 (충족/과다)
				dbtBdnCusIxVal       : "", // 부채부담지수 지표 (%)
				dbtBdnPeerIxVal      : "", // 부채부담지수 또래 지표 (%)
				dbtBdnApptIxVal      : "", // 부채부담지수 적정 지표 (%)

				dbtRpyIxSatYn        : "", // 부채상환부담지수 지표 결과 (true/false)
				dbtRpyIxSatYnTxt     : "", // 부채상환부담지수 지표 결과 (충족/과다)
				dbtRpyCusIxVal       : "", // 부채상환부담지수 지표 (%)
				dbtRpyPeerIxVal      : "", // 부채상환부담지수 또래 지표 (%)
				dbtRpyApptIxVal      : "", // 부채상환부담지수 적정 지표 (%)
             

				peState			: false,

				// /////////////////////////////////////
                // //추가 변수///////////////////////////
				// /////////////////////////////////////
				
            }
        },    
        mounted() {
            this.initComponent();

             // 자산수집 mutation 이벤트 감지 
            //this.getGatheringListenSubscribe()
            
            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
			 
			 this.$nextTick(() => {
				 $(document).ready(function() {

					//더보기 클릭
					 $('.bottomBtnType .bottomBtn').on('click',function(){
						 var _this = $(this),
								 _par = _this.parent();
						 if(_par.hasClass('open')){
							 _par.find('.slideBox').slideUp(300);
							 _par.removeClass('open');
							 _par.find('.bottomBtn').text('더보기');
						 }else{
							 _par.find('.slideBox').slideDown(300);
							 _par.addClass('open');
							 _par.find('.bottomBtn').text('접기');
						 };
					 });
	 
					 
					 
					
				 });
			 })
		},

		methods: {
            initComponent() {
				
				this.currYmd    = dateFormat(new Date(), 'YYYYMMDD');

				this.cusnm 		= this.getUserInfo('cusnm')

				this.getData();

			},

			getData() {
                // 자산진단 유형별 부채 조회
                const config = {
                    url: '/as/ip/04r01', // 인터페이스ID: IF-MOB-PFM-ASIP04R01, 서비스코드: PFMASIP04R01
                    data: {
						"mydtCusno"  : this.getUserInfo('mydtCusno'),						
                        "basYmd"     : this.currYmd
                    }
                };

                //this.executeCnt++
                apiService.call(config).then(response => {
                    console.log("======= /as/ip/04r01 response =======", response)

					this.ctgrDgnRzt           = response.ctgrDgnRzt;
					this.ixSatCnt             = response.ixSatCnt;
					this.totDbtRpyAm          = response.totDbtRpyAm;
					this.totDbtAm             = response.totDbtAm;
					this.totAsetAm            = response.totAsetAm;
					this.totIcmAm             = response.totIcmAm;
					this.csmLfeDbtRpyAm       = response.csmLfeDbtRpyAm;
					this.csmLfeDbtRpyIxGapAm  = response.csmLfeDbtRpyIxGapAm;
					this.totDbtBdnIxGapAm     = response.totDbtBdnIxGapAm;
					this.totDbtRpyIxGapAm     = response.totDbtRpyIxGapAm;

					if(this.ctgrDgnRzt === "1")
						this.ctgrDgnRztTxt = "적정"
					else
						this.ctgrDgnRztTxt = "개선"

					this.tranList = response.FinanceDiagnosisSvcSubListOutV2 || [];;

					console.log("======= tranList ========", this.tranList);

					console.log("======= tranList.length ========", this.tranList.length);

					
					for(let i = 0; i < this.tranList.length; i++) {
						if(this.tranList[i].fnaIxDsc === "CSM_LFE_DBT_RPY_IX") 
						{

							if(this.tranList[i].ixSatYn  === "1")
							{
								this.csmLfeIxSatYn    = "true";
								this.csmLfeIxSatYnTxt = "충족";
								this.fn_hideBox("#firstBox");
							}
							else
							{
								this.csmLfeIxSatYn    = "false";
								this.csmLfeIxSatYnTxt = "과다";
							}
							
							this.csmLfeCusIxVal       = this.tranList[i].cusIxVal;
							this.csmLfePeerIxVal      = this.tranList[i].peerIxVal;
							this.csmLfeApptIxVal      = this.tranList[i].apptIxVal;
							
							// 첫번째만 또래 값 체크
							this.peerNo = this.tranList[i].peerNo;

						}
						else if (this.tranList[i].fnaIxDsc === "TOT_DBT_BDN_IX") 
						{
							if(this.tranList[i].ixSatYn  === "1")
							{
								this.dbtBdnIxSatYn        = "true";
								this.dbtBdnIxSatYnTxt = "충족";
								this.fn_hideBox("#secondBox");
							}
							else
							{
								this.dbtBdnIxSatYn        = "false";
								this.dbtBdnIxSatYnTxt = "과다";
							}
							
							this.dbtBdnCusIxVal       = this.tranList[i].cusIxVal;
							this.dbtBdnPeerIxVal      = this.tranList[i].peerIxVal;
							this.dbtBdnApptIxVal      = this.tranList[i].apptIxVal;
						}
						else if (this.tranList[i].fnaIxDsc === "TOT_DBT_RPY_IX") 
						{
							if(this.tranList[i].ixSatYn  === "1")
							{
								this.dbtRpyIxSatYn        = "true";
								this.dbtRpyIxSatYnTxt = "충족";
								this.fn_hideBox("#thirdBox");
							}
							else
							{
								this.dbtRpyIxSatYn        = "false";
								this.dbtRpyIxSatYnTxt = "과다";
							}
							
							this.dbtRpyCusIxVal       = this.tranList[i].cusIxVal;
							this.dbtRpyPeerIxVal      = this.tranList[i].peerIxVal;
							this.dbtRpyApptIxVal      = this.tranList[i].apptIxVal;							
						}
						else
						{

						}
                	}

					if(this.peerNo != "" && this.peerNo.length > 4)
					{
						this.peerNo_1 = this.peerNo.substr(0,2);	
						this.peerNo_2 = this.peerNo.substr(3,5);	

						if(this.peerNo_1 === "G0")
						{	this.peerVal_1 = "20세미만"	}
						else if(this.peerNo_1 === "G1")
						{	this.peerVal_1 = "20대초반"	}
						else if(this.peerNo_1 === "G2")
						{	this.peerVal_1 = "20대후반_30대초반"	}
						else if(this.peerNo_1 === "G3")
						{	this.peerVal_1 = "30대후반"	}
						else if(this.peerNo_1 === "G4")
						{	this.peerVal_1 = "40대초반"	}
						else if(this.peerNo_1 === "G5")
						{	this.peerVal_1 = "40대후반_50대초반"	}
						else if(this.peerNo_1 === "G6")
						{	this.peerVal_1 = "50대후반"	}
						else if(this.peerNo_1 === "G7")
						{	this.peerVal_1 = "60세이상"	}
						else
						{	this.peerVal_1 = ""	}


						if(this.peerNo_2 === "J0")
						{	this.peerVal_2 = "농.축.임.어업인"	}
						else if(this.peerNo_2 === "J1")
						{	this.peerVal_2 = "공무원"	}
						else if(this.peerNo_2 === "J2")
						{	this.peerVal_2 = "급여소득자"	}
						else if(this.peerNo_2 === "J3")
						{	this.peerVal_2 = "학생"	}
						else if(this.peerNo_2 === "J4")
						{	this.peerVal_2 = "개인사업자"	}
						else if(this.peerNo_2 === "J5")
						{	this.peerVal_2 = "기타소득자"	}
						else if(this.peerNo_2 === "J6")
						{	this.peerVal_2 = "기타무직자"	}
						else
						{	this.peerVal_2 = ""	}

					}

				   console.log("retrived")      
				   this.$nextTick(() => {
					   fn_scrollProgressAni();

					   //roundTabWidth(); 
				   })

                //    $(document).ready(function() {
				// 		fn_scrollProgressAni();
				// 	});
                });
			},
			/*
            * 결과리스트 가공.
            */
            fn_generateList(objList) {
                if(objList.length > 0) {
                    for(let i=0; i < objList.length; i++) {
                        if(objList[i].mydtTrDtm != "00000000000000"){
                            objList[i].yyyyMM = dateFormat(objList[i].mydtTrDtm, "YYYYMM")
                            this.tranList.push(objList[i])
                        }
                    }
                } else {
                    this.tranList = []  //응답결과 없을때 초기화처리.
				}    
			},

			/*
            * 텍스트박스 숨김
            */
			fn_hideBox (params) 
			{
				$(params).hide();
			},

			fn_openSlide(slideId) {

				let component;

				if(slideId == 'ASIP2018'){
					component = ASIP2018;
				} else if (slideId == 'ASIP2019'){
					component = ASIP2019;
				} else if (slideId == 'ASIP2020'){
					component = ASIP2020;
				} 

				const config = {
					params : {},
					renderer: {
						component,
					}
				}
				
				modalService.openSlidePagePopup(config).then((response) => {

				});
			}			

			
		},

		mixins: [
			commonMixin,
			popupMixin
		],

		components : {
		
		}
}

function fn_scrollProgressAni() {
	var contHeight = $('.financeChk').height(); //박스 높이
	var currentNum = $('.financeChk.com_box_type01').length; //전체 박스갯수
	var progressBar = $('.progressBar .bar'); //그래프바
	var contHeight02 = contHeight * 2;
	var popoverWrap01 = progressBar.eq(0).children('.popover_wrap');
	var progressNum01 = progressBar.eq(0).children().find('.popover .num.blind').text(); //그래프 수치
	var n = 0;
	
	if(progressNum01 >= 100){//첫번째 그래프가 100을 넘을 경우
		progressNum01 = 100;
		progressBar.eq(0).addClass('over');
		popoverWrap01.addClass('full');
	}
	progressBar.css('width','0');
	popoverWrap01.css('left','0');
	progressBar.eq(0).animate({
		width: progressNum01 + '%',//그래프바 위치(직접 입력하는 경우 주석처리 후 .bar에 style로 넣으세요)
	},1000);
	popoverWrap01.eq(0).animate({
		left: progressNum01 + '%',//툴팁 위치(직접 입력하는 경우 주석처리 후 .popover_wrap에 style로 넣으세요)
	},1000);

	$('.popup_content').scroll(function(){

		if(n+1 <= currentNum) {
			var contTop = $('.financeChk').eq(n).position().top - contHeight02;
		// console.log(contTop);
			var progressNum = progressBar.eq(n).children().find('.popover .num.blind').text();
			var popoverWrap = progressBar.eq(n).children('.popover_wrap');

			if($(this).scrollTop() > contTop) {
				if(progressNum >= 100) {
					progressNum = 100;
					progressBar.eq(n).addClass('over');
					popoverWrap.animate({
						left: progressNum + "%"//툴팁 위치(직접 입력하는 경우 주석처리 후 .popover_wrap에 style로 넣으세요)
					},1000,function(){
						popoverWrap.addClass('full');
					}).css('transform','translateX(-100%)');// 230721 -100%로 수정
				} else if(progressNum == 0) {
					popoverWrap.addClass('zero');
				} else {
					popoverWrap.animate({
						left: progressNum +'%'//툴팁 위치(직접 입력하는 경우 주석처리 후 .popover_wrap에 style로 넣으세요)
					},1000);
				}

				progressBar.eq(n).animate({
					width: progressNum + '%'//그래프바 위치(직접 입력하는 경우 주석처리 후 .bar에 style로 넣으세요)
				},1000);
				n = n + 1;
			} 
		}
		// console.log($(this).scrollTop());
	});
}

// 라운드탭 사이즈(가장큰 탭사이즈를 기준으로 각탭 및 전체 적용하기)
function roundTabWidth(){
	var arr = [],
			_tabList = $('.switchType li');
	_tabList.each(function(e){
		arr[e] = $(this).outerWidth();
	});
	_tabList.css('width',Math.max(...arr)); //탭 사이즈 적용
	_tabList.parent().parent().css('width',Math.max(...arr)*arr.length); //탭전체 사이즈 적용
	//console.log('값 = '+arr+', 갯수 = '+arr.length+', 최고값 = '+Math.max(...arr));
};
</script>