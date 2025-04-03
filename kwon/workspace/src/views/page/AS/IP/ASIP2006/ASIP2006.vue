<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산진단 > 지표별 재무 진단 (미래준비)
* @ 페이지설명 : 나의자산 > 자산진단 > 지표별 재무 진단 (미래준비)
* @ 파일명     : src\views\page\AS\IP\ASIP2006\ASIP2006.vue
* @ 작성자     : 
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-10              CS533437              최초작성
*************************************************************************/
-->
<template>

		<!-- 미래준비 tabBox 시작 -->
		<div id="tab_02" role="tabpanel" class="cmm-tab-panel on">
			<div class="com_inner">
				<ul class="assetDoughnutGrp layoutBox gray_box_2023">
					<li class="text">긴급 상황 준비 및 안락한<br>노후생활을 위한 준비 조건</li>
					<li class="grp">
						<template v-if="ixSatCnt > 2">
							
								<div class="donutBox safe">
									<div class="donutCh">
										<span>{{ctgrDgnRztTxt}}</span>
									</div>
								</div>
							
						</template>						
						<template v-else-if="ixSatCnt === 2">
														
							<div class="donutBox safeH">
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
						<template v-else>								
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
					<li class="peerCheck">
						<span>또래 보기</span>
						<span class="cmm-switch sm">							
							<input type="checkbox" id="check019" name="check01" v-model="peState" >
							<label for="check01"><em class="blind"></em></label>
						</span>
					</li>
					
				</ul>-->
									
				<div class="com_box_type01 bottomBtnType financeChk open" :class="grntpIsrIxSatYn">
					<div class="tit layoutBox wAuto">
						<div class="left tooltipBtnWrap"><!-- 1011 tooltipBtnWrap 클래스 추가 -->
							<strong class="titH4">보장보험부담비율</strong>
							<button class="tooltipBtn" @click.prevent="fn_openSlide('ASIP2015')"></button><!-- 1011 툴팁 버튼으로 변경 -->
							<!--<div class="custom_tooltip">
								<div class="com_tooltip_type02 com_tooltip_type03">
									<a href="javascript:void(0);" class="com_btn_info" role="button">
										<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
									</a>
									<div class="com_ballon_type01 com_ballon_type02" style="display:none;">
										<div>
											<strong class="title">* 보장보험부담비율이란?</strong>
											<p>
												보험상품을 이용하여 발생 가능한 위험에 대한 대비 정도를 평가하는 지표로 아래 항목으로 진단해요.<br><br>
												= 보장성 보험료 ÷ 총소득
											</p>
											<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
										</div> 
									</div>
								</div>
							</div>-->
						</div>
						<div class="right">
							<span class="txtFinish">{{grntpIsrIxSatYnTxt}}</span>
						</div>
					</div>
					<!-- progressBar -->
					<div class="custom_box peerType type2"><!-- 09/12 jlee .type2 추가 -->
						<div class="content_wrap">
							<div class="progressBar_wrapper">
								<div class="progressBar">
									<div class="bar">
										<div class="popover_wrap">
											<span class="popover bg_white">												
												<em class="num">{{grntpIsrCusIxVal}}</em>%
												<em class="num blind">{{grntpIsrCusIxVal/(grntpIsrApptIxVal*2)*100}}</em>	
												<span class="arrow"></span>
											</span>
										</div>
										<!-- <div class="peerAltBox"> -->
										<div class="peerAltBox per" style="left:40%;width:6rem;"><!-- 09/12 jlee .per 추가 -->
											<span>적정</span>
										</div>										
										<div class="peerAltBox pe" :style="{left: (grntpIsrPeerIxVal/(grntpIsrApptIxVal*2)*100)+'%', display:peState?'block':'none'}">																				
											<span></span>
										</div>
									</div>
								</div>
							</div>
							<div class="loan_date">									
								<span class="pe" :style="{display:peState?'block':'none'}">또래 <em class="num">{{grntpIsrPeerIxVal}}%</em></span>
								<!-- <span class="pe" :style="{display:peState?'block':'none'}">또래 <em class="num">10%</em></span> -->
								<span>적정 <em class="num">8~10%</em></span>
							</div>
						</div>
					</div>
					<!-- //progressBar -->
					<div class="slideBox">
						<div class="gray_box_2023 type2" id="firstBox">
							<!-- <p>총소득에 비해 보장성보험료가 적정 대비<br><span class="pointColor">{{icmIsrfeGapAm | numberFilter}}원</span> {{grntpIsrPhr}}</p> -->
							<p>{{grntpIsrPhr}}</p>
						</div>
						<ul class="list_type_02 financeType">
							<li>
								<span>총소득(연간)</span>
								<em>{{totIcmAm | numberFilter}}원</em>
							</li>
							<li>
								<span>보장성보험료(연간)</span>
								<em>{{grntpIsrfe | numberFilter}}원</em>
							</li>
						</ul>
					</div>
					<button class="bottomBtn">접기</button>
				</div>
				<div class="com_box_type01 bottomBtnType financeChk " :class="emcyRsrIxSatYn">
					<div class="tit layoutBox wAuto">
						<div class="left tooltipBtnWrap"><!-- 1011 tooltipBtnWrap 클래스 추가 -->
							<strong class="titH4">예비자금준비율</strong>
							<button class="tooltipBtn" @click.prevent="fn_openSlide('ASIP2016')"></button><!-- 1011 툴팁 버튼으로 변경 -->
							<!--<div class="custom_tooltip">
								<div class="com_tooltip_type02 com_tooltip_type03">
									<a href="javascript:void(0);" class="com_btn_info" role="button">
										<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
									</a>
									<div class="com_ballon_type01 com_ballon_type02" style="display:none;">
										<div>
											<strong class="title">* 예비자금준비율이란?</strong>
											<p>
												소득의 일시적 중단 및 감소 상황에서의 생활 유지 가능 정도를 평가하는 지표로 아래 항목으로 진단해요.<br><br>
												= 유동성 자산 ÷ 월평균 지출
											</p>
											<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
										</div> 
									</div>
								</div>
							</div>-->
						</div>
						<div class="right">
							<span class="txtFinish">{{emcyRsrIxSatYnTxt}}</span>
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
												<em class="num">{{emcyRsrCusIxVal}}</em>%
												<em class="num blind">{{emcyRsrCusIxVal/(emcyRsrApptIxVal*2)*100}}</em>	
												<span class="arrow"></span>
											</span>
										</div>
										<div class="peerAltBox">
											<span>적정</span>
										</div>										
										<div class="peerAltBox pe" :style="{left: (emcyRsrPeerIxVal/(emcyRsrApptIxVal*2)*100)+'%', display:peState?'block':'none'}">																					
											<span></span>
										</div>
									</div>
								</div>
							</div>
							<div class="loan_date">
								<!--span class="pe">또래 <em class="num">20%</em></span-->
								<span class="pe" :style="{display:peState?'block':'none'}">또래 <em class="num">{{emcyRsrPeerIxVal}}%</em></span>
								<span>적정 <em class="num">{{emcyRsrApptIxVal}}%이상</em></span>
							</div>
						</div>
					</div>
					<!-- //progressBar -->
					<div class="slideBox">
						<div class="gray_box_2023 type2" id="secondBox">
							<p>월평균지출에 비해 유동성자산이 적정 대비<br><span class="pointColor">{{xpsAsetGapAm | numberFilter}}원</span> 적어요</p>
						</div>
						<ul class="list_type_02 financeType">
							<li>
								<span>월평균지출(연간)</span>
								<em>{{mmAvgXpsAm | numberFilter}}원</em>
							</li>
							<li>
								<span>유동성자산(현재)</span>
								<em>{{fldtAsetAm | numberFilter}}원</em>
							</li>
						</ul>
					</div>
					<button class="bottomBtn">더보기</button>
				</div>
				<div class="com_box_type01 bottomBtnType financeChk " :class="pnsAsetIxSatYn">
					<div class="tit layoutBox wAuto">
						<div class="left tooltipBtnWrap"><!-- 1011 tooltipBtnWrap 클래스 추가 -->
							<strong class="titH4">연금자산준비율</strong>
							<button class="tooltipBtn" @click.prevent="fn_openSlide('ASIP2017')"></button><!-- 1011 툴팁 버튼으로 변경 -->
							<!--<div class="custom_tooltip">
								<div class="com_tooltip_type02 com_tooltip_type03">
									<a href="javascript:void(0);" class="com_btn_info" role="button">
										<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
									</a>
									<div class="com_ballon_type01 com_ballon_type02" style="display:none;">
										<div>
											<strong class="title">* 연금자산준비율이란?</strong>
											<p>
												총 저축 금액 중 은퇴 및 노후에 대한 저축 비중을 평가하는 지표로 아래 항목으로 진단해요.<br><br>
												= 노후대비저축 ÷ 저축/투자액
											</p>
											<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
										</div> 
									</div>
								</div>
							</div>-->
						</div>
						<div class="right">
							<span class="txtFinish">{{pnsAsetIxSatYnTxt}}</span>
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
												<em class="num">{{pnsAsetCusIxVal}}</em>%
												<em class="num blind">{{pnsAsetCusIxVal/(pnsAsetApptIxVal*2)*100}}</em>
												<span class="arrow"></span>
											</span>
										</div>
										<div class="peerAltBox">
											<span>적정</span>
										</div>
										<div class="peerAltBox pe" :style="{left: (pnsAsetPeerIxVal/(pnsAsetApptIxVal*2)*100)+'%', display:peState?'block':'none'}">										
											<span></span>
										</div>
									</div>
								</div>
							</div>
							<div class="loan_date">
								<!--span class="pe">또래 <em class="num">20%</em></span-->
								<span class="pe" :style="{display:peState?'block':'none'}">또래 <em class="num">{{pnsAsetPeerIxVal}}%</em></span>
								<span>적정 <em class="num">{{pnsAsetApptIxVal}}%이상</em></span>
							</div>
						</div>
					</div>
					<!-- //progressBar -->
					<div class="slideBox">
						<div class="gray_box_2023 type2" id="thirdBox">
							<p>저축/투자액에 비해 노후대비저축이 적정 대비<br><span class="pointColor">{{ivSvGapAm | numberFilter}}원</span> 적어요</p>
						</div>
						<ul class="list_type_02 financeType">
							<li>
								<span>저축/투자액(연간)</span>
								<em>{{svIvAm | numberFilter}}원</em>
							</li>
							<li>
								<span>노후대비저축(연간)</span>
								<em>{{dcyrRsvSvAm | numberFilter}}원</em>
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
import {stringCut} from '@/utils/data'

import ASIP2006 from '@/views/page/AS/IP/ASIP2006/ASIP2006'
import ASIP2015 from '@/views/page/AS/IP/ASIP2015/ASIP2015'
import ASIP2016 from '@/views/page/AS/IP/ASIP2016/ASIP2016'
import ASIP2017 from '@/views/page/AS/IP/ASIP2017/ASIP2017'
	

export default {
	
	name : "ASIP2006",
        data: () => {
            return {                
				currYmd              : "", // 현재년월일
				cusnm                : "", // 로그인 사용자 이름
				ctgrDgnRzt           : "", // 카테고리진단결과
				ctgrDgnRztTxt        : "", // 카테고리진단결과명
				ixSatCnt             : 0,  // 충족지수개수
				totIcmAm             : 0,  // 총소득
				grntpIsrfe           : 0,  // 보장성보험료
				mmAvgXpsAm           : 0,  // 월평균지출
				fldtAsetAm           : 0,  // 유동성자산
				svIvAm               : 0,  // 저축및투자액
				dcyrRsvSvAm          : 0,  // 노후대비저축
				icmIsrfeGapAm        : 0,  // 총소득보장성보험료차액
				xpsAsetGapAm         : 0,  // 월평균지출유동성자산차액
				ivSvGapAm            : 0,  // 저축및투자액노후대비저축차액
				
				tranList    		 : [], // 임시 리스트
				
				peerNo               : "", //또래값
				peerNo_1             : "", //또래값1
				peerNo_2             : "", //또래값2
				peerVal_1             : "", //또래값1
				peerVal_2             : "", //또래값2

				grntpIsrIxSatYn       : "", // 보장보험부담율 지표 결과
				grntpIsrIxSatYnTxt    : "", // 보장보험부담율 지표 결과값 (부족/충족/과다)
				grntpIsrCusIxVal      : "", // 보장보험부담율 지표 (%)
				grntpIsrPeerIxVal     : "", // 보장보험부담율 또래 지표 (%)
				grntpIsrApptIxVal     : "", // 보장보험부담율 적정 지표 (%)
				grntpIsrPhr           : "", // 보장보험부담율 문구

				emcyRsrIxSatYn        : "", // 예비자금준비율 지표 결과
				emcyRsrIxSatYnTxt     : "", // 예비자금준비율 지표 결과값 (충족/부족)
				emcyRsrCusIxVal       : "", // 예비자금준비율 지표 (%)
				emcyRsrPeerIxVal      : "", // 예비자금준비율 또래 지표 (%)
				emcyRsrApptIxVal      : "", // 예비자금준비율 적정 지표 (%)

				pnsAsetIxSatYn        : "", // 연금자산비율 지표 결과
				pnsAsetIxSatYnTxt     : "", // 연금자산비율 지표 결과값 (충족/부족)
				pnsAsetCusIxVal       : "", // 연금자산비율 지표 (%)
				pnsAsetPeerIxVal      : "", // 연금자산비율 또래 지표 (%)
				pnsAsetApptIxVal      : "", // 연금자산비율 적정 지표 (%)
			 
			 	peState			      : false,

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
                // 자산진단 유형별 미래 조회
                const config = {
                    url: '/as/ip/06r01', // 인터페이스ID: IF-MOB-PFM-ASIP06R01, 서비스코드: PFMASIP06R01
                    data: {
						"mydtCusno"  : this.getUserInfo('mydtCusno'),						
                        "basYmd"     : this.currYmd
                    }
                };

                //this.executeCnt++
                apiService.call(config).then(response => {
                    console.log("======= /as/ip/06r01 response =======", response)

					this.ctgrDgnRzt     = response.ctgrDgnRzt;
					this.ixSatCnt       = response.ixSatCnt;
					this.totIcmAm   	= response.totIcmAm;
					this.grntpIsrfe     = response.grntpIsrfe;
					this.mmAvgXpsAm     = response.mmAvgXpsAm;
					this.fldtAsetAm     = response.fldtAsetAm;
					this.svIvAm       	= response.svIvAm;
					this.dcyrRsvSvAm  	= response.dcyrRsvSvAm;
					this.icmIsrfeGapAm  = response.icmIsrfeGapAm;
					this.xpsAsetGapAm   = response.xpsAsetGapAm;
					this.ivSvGapAm     	= response.ivSvGapAm;

					if(this.ctgrDgnRzt === "1")
						this.ctgrDgnRztTxt = "적정"
					else
						this.ctgrDgnRztTxt = "개선"

					this.tranList = response.FinanceDiagnosisSvcSubListOutV2 || [];

					console.log("======= tranList ========", this.tranList);

					// console.log("======= tranList.length ========", this.tranList.length);

					if(this.tranList.length > 0)
					{
						for(let i = 0; i < this.tranList.length; i++) {
							if(this.tranList[i].fnaIxDsc === "GRNTP_ISR_BDN_IX") 
							{

								// if(this.tranList[i].ixSatYn  === "1")
								// {
								// 	this.grntpIsrIxSatYn = "true";
								// 	this.grntpIsrIxSatYnTxt = "충족";
								// 	this.fn_hideBox("#firstBox");
								// }
								// else
								// {
								// 	this.grntpIsrIxSatYn = "false";
								// 	//this.grntpIsrIxSatYnTxt = "부족";
								// }

								this.grntpIsrCusIxVal       = this.tranList[i].cusIxVal;
								this.grntpIsrPeerIxVal      = this.tranList[i].peerIxVal;
								this.grntpIsrApptIxVal      = this.tranList[i].apptIxVal;							

								if(this.grntpIsrCusIxVal == 0)								
								{
									this.grntpIsrIxSatYn = "false";
									this.grntpIsrIxSatYnTxt = "부족";
									this.grntpIsrPhr = "예기치 못한 위험 대비를 위해 보장성보험 준비가 필요해요.";
								}
								else if(this.grntpIsrCusIxVal > 0 && this.grntpIsrCusIxVal < 8)								
								{	
									this.grntpIsrIxSatYn = "true";
								 	this.grntpIsrIxSatYnTxt = "충족";
									this.grntpIsrPhr = "안락한 노후생활을 위해 보장성보험을 조금 더 준비해 보세요.";
								
								}								
								else if(this.grntpIsrCusIxVal >= 8 && this.grntpIsrCusIxVal <= 10)								
								{	
									this.grntpIsrIxSatYn = "true";
								 	this.grntpIsrIxSatYnTxt = "충족";
									this.fn_hideBox("#firstBox");
								
								}								
								else if(this.grntpIsrCusIxVal >= 11)
								{									
									this.grntpIsrIxSatYn = "false";	
									this.grntpIsrIxSatYnTxt = "과다";
									this.grntpIsrPhr = "총소득에 비해 보장성보험료 부담이 많아요.";
								}								

								// 첫번째만 또래 값 체크
								this.peerNo = this.tranList[i].peerNo;

							}
							else if (this.tranList[i].fnaIxDsc === "EMCY_RSR_CPT_IX") 
							{
								if(this.tranList[i].ixSatYn  === "1")
								{
									this.emcyRsrIxSatYn = "true";
									this.emcyRsrIxSatYnTxt = "충족";
									this.fn_hideBox("#secondBox");
								}
								else
								{
									this.emcyRsrIxSatYn = "false";
									this.emcyRsrIxSatYnTxt = "부족";
								}							
								this.emcyRsrCusIxVal       = this.tranList[i].cusIxVal;
								this.emcyRsrPeerIxVal      = this.tranList[i].peerIxVal;
								this.emcyRsrApptIxVal      = this.tranList[i].apptIxVal;

							}
							else if (this.tranList[i].fnaIxDsc === "PNS_ASET_WGT_IX") 
							{
								if(this.tranList[i].ixSatYn  === "1")
								{
									this.pnsAsetIxSatYn = "true";
									this.pnsAsetIxSatYnTxt = "충족";
									this.fn_hideBox("#thirdBox");
								}
								else
								{
									this.pnsAsetIxSatYn = "false";
									this.pnsAsetIxSatYnTxt = "부족";
								}							
								this.pnsAsetCusIxVal       = this.tranList[i].cusIxVal;
								this.pnsAsetPeerIxVal      = this.tranList[i].peerIxVal;
								this.pnsAsetApptIxVal      = this.tranList[i].apptIxVal;
								
							}
							else
							{

							}


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

				   this.$nextTick(() => {
					   fn_scrollProgressAni();

					   //roundTabWidth();
				   })
      
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

				if(slideId == 'ASIP2015'){
					component = ASIP2015;
				} else if (slideId == 'ASIP2016'){
					component = ASIP2016;
				} else if (slideId == 'ASIP2017'){
					component = ASIP2017;
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