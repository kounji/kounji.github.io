<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산진단 > 지표별 재무 진단 (가계재무)
* @ 페이지설명 : 나의자산 > 자산진단 > 지표별 재무 진단 (가계재무) 
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

		<!-- 가계재무 tabBox 시작 -->
		<div id="tab_02" role="tabpanel" class="cmm-tab-panel on">
			<div class="com_inner">
				<ul class="assetDoughnutGrp layoutBox gray_box_2023">
					<li class="text">지출 수준, 저축, 투자 등으로<br>목표 달성 준비 조건</li>
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
						<template v-else>								
							<div class="donutBox Nsafe">
								<div class="donutCh">
									<span>{{ctgrDgnRztTxt}}</span>
								</div>
							</div>								
						
						</template>   
					</li>
				</ul>

				<!-- 1011 기획 수정으로 인한 주석처리 -->
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
				<!-- //1011 기획 수정으로 인한 주석처리 -->
									
				<div class="com_box_type01 bottomBtnType financeChk open" :class="xpsWgtIxSatYn">
					<div class="tit layoutBox wAuto">
						<div class="left tooltipBtnWrap"><!-- 1011 tooltipBtnWrap 클래스 추가 -->
							<strong class="titH4">지출비율</strong>
							<button class="tooltipBtn" @click.prevent="fn_openSlide('ASIP2012')"></button><!-- 1011 툴팁 버튼으로 변경 -->
							<!-- <div class="custom_tooltip">
								<div class="com_tooltip_type02 com_tooltip_type03">
									<a href="javascript:void(0);" class="com_btn_info" role="button">
										<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
									</a>
									<div class="com_ballon_type01 com_ballon_type02" style="display:none;">
										<div>
											<strong class="title">* 지출비율이란?</strong>
											<p>
												소득 중 현재의 삶을 위해 지출 금액을 통해 현금흐름을 평가하는 지표로 아래 항목으로 진단해요.<br><br>
													= 총지출 ÷ 총소득
											</p>
											<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
										</div> 
									</div>
								</div>
							</div> -->
						</div>
						<div class="right">
							<span class="txtFinish">{{xpsWgtIxSatYnTxt}}</span>
						</div>
					</div>
					<!-- progressBar -->
					<div class="custom_box peerType"><!-- 1004 접근성 반영 -->
						<div class="content_wrap">
							<div class="progressBar_wrapper">
								<div class="progressBar">
									<div class="bar">
										<div class="popover_wrap">
											<span class="popover bg_white">
												<em class="num">{{xpsWgtCusIxVal}}</em>%
												<em class="num blind">{{xpsWgtCusIxVal/(xpsWgtApptIxVal*2)*100}}</em>												
												<span class="arrow"></span>
											</span>
										</div>
										<div class="peerAltBox">
											<span>적정</span>
										</div>
										<div class="peerAltBox pe" :style="{left: (xpsWgtPeerIxVal/(xpsWgtApptIxVal*2)*100)+'%', display:peState?'block':'none'}">										
											<span></span>
										</div>
									</div>
								</div>
							</div>
							<div class="loan_date">									
								<span class="pe" :style="{display:peState?'block':'none'}">또래 <em class="num">{{xpsWgtPeerIxVal}}%</em></span>
								<!-- <span class="pe" :style="{display:peState?'block':'none'}">또래 <em class="num">10%</em></span> -->
								<span>적정 <em class="num">{{xpsWgtApptIxVal}}%이하</em></span>
							</div>
						</div>
					</div>
					<!-- //progressBar -->
					<div class="slideBox">
						<div class="gray_box_2023 type2" id="firstBox">
							<p>총소득에 비해 총지출이 적정 대비<br><span class="pointColor">{{xpsWgtIxGapAm | numberFilter}}원</span> 많아요</p>
						</div>
						<ul class="list_type_02 financeType">
							<li>
								<span>총소득(연간)</span>
								<em>{{totIcmAm | numberFilter}}원</em>
							</li>
							<li>
								<span>총지출(연간)</span>
								<em>{{totXpsAm | numberFilter}}원</em>
							</li>
						</ul>
					</div>
					<button class="bottomBtn">접기</button>
				</div>
				<div class="com_box_type01 bottomBtnType financeChk " :class="fnasWgtIxSatYn">
					<div class="tit layoutBox wAuto">
						<div class="left tooltipBtnWrap"><!-- 1011 tooltipBtnWrap 클래스 추가 -->
							<strong class="titH4">금융자산비율</strong>
							<button class="tooltipBtn" @click.prevent="fn_openSlide('ASIP2013')"></button><!-- 1011 툴팁 버튼으로 변경 -->
							<!--<div class="custom_tooltip">
								<div class="com_tooltip_type02 com_tooltip_type03">
									<a href="javascript:void(0);" class="com_btn_info" role="button">
										<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
									</a>
									<div class="com_ballon_type01 com_ballon_type02" style="display:none;">
										<div>
											<strong class="title">* 금융자산비율이란?</strong>
											<p>
												가계 자산 중 금융 자산의 규모를 평가하는 지표로 아래 항목으로 진단해요.<br><br>
													= 금융자산 ÷ 총자산 
											</p>
											<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
										</div> 
									</div>
								</div>
							</div>-->
						</div>
						<div class="right">
							<span class="txtFinish">{{fnasWgtIxSatYnTxt}}</span>
						</div>
					</div>
					<!-- progressBar -->
					<div class="custom_box peerType"><!-- 1004 접근성 반영 -->
						<div class="content_wrap">
							<div class="progressBar_wrapper">
								<div class="progressBar">
									<div class="bar">
										<div class="popover_wrap">
											<span class="popover bg_white">												
												<em class="num">{{fnasWgtCusIxVal}}</em>%
												<em class="num blind">{{fnasWgtCusIxVal/(fnasWgtApptIxVal*2)*100}}</em>	
												<span class="arrow"></span>
											</span>
										</div>
										<div class="peerAltBox">
											<span>적정</span>
										</div>
											<div class="peerAltBox pe" :style="{left: (fnasWgtPeerIxVal/(fnasWgtApptIxVal*2)*100)+'%', display:peState?'block':'none'}">																					
											<span></span>
										</div>
									</div>
								</div>
							</div>
							<div class="loan_date">
								<!--span class="pe">또래 <em class="num">20%</em></span-->
								<span class="pe" :style="{display:peState?'block':'none'}">또래 <em class="num">{{fnasWgtPeerIxVal}}%</em></span>
								<span>적정 <em class="num">{{fnasWgtApptIxVal}}%이상</em></span>
							</div>
						</div>
					</div>
					<!-- //progressBar -->
					<div class="slideBox">
						<div class="gray_box_2023 type2" id="secondBox">
							<p>총자산에 비해 금융자산이 적정 대비<br><span class="pointColor">{{fnasWgtIxGapAm | numberFilter}}원</span> 적어요</p>
						</div>
						<ul class="list_type_02 financeType">
							<li>
								<span>총자산(현재)</span>
								<em>{{totAsetAm | numberFilter}}원</em>
							</li>
							<li>
								<span>금융자산(현재)</span>
								<em>{{fnasAm | numberFilter}}원</em>
							</li>
						</ul>
					</div>
					<button class="bottomBtn">더보기</button>
				</div>
				<div class="com_box_type01 bottomBtnType financeChk " :class="svIvWgtIxSatYn">
					<div class="tit layoutBox wAuto">
						<div class="left tooltipBtnWrap"><!-- 1011 tooltipBtnWrap 클래스 추가 -->
							<strong class="titH4">저축투자비율</strong>
							<button class="tooltipBtn" @click.prevent="fn_openSlide('ASIP2014')"></button><!-- 1011 툴팁 버튼으로 변경 -->
							<!--<div class="custom_tooltip">
								<div class="com_tooltip_type02 com_tooltip_type03">
									<a href="javascript:void(0);" class="com_btn_info" role="button">
										<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
									</a>
									<div class="com_ballon_type01 com_ballon_type02" style="display:none;">
										<div>
											<strong class="title">* 저축투자비율이란?</strong>
											<p>
												총소득 중 미래를 위해 저축하고 투자하는 저축 규모 평가하는 지표로 아래 항목으로 진단해요.<br><br>
													= 저축/투자액 ÷ 총소득
											</p>
											<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
										</div> 
									</div>
								</div>
							</div>-->
						</div>
						<div class="right">
							<span class="txtFinish">{{svIvWgtIxSatYnTxt}}</span>
						</div>
					</div>
					<!-- progressBar -->
					<div class="custom_box peerType"><!-- 1004 접근성 반영 -->
						<div class="content_wrap">
							<div class="progressBar_wrapper">
								<div class="progressBar">
									<div class="bar">
										<div class="popover_wrap">
											<span class="popover bg_white">												
												<em class="num">{{svIvWgtCusIxVal}}</em>%
												<em class="num blind">{{svIvWgtCusIxVal/(svIvWgtApptIxVal*2)*100}}</em>	
												<span class="arrow"></span>
											</span>
										</div>
										<div class="peerAltBox">
											<span>적정</span>
										</div>										
										<div class="peerAltBox pe" :style="{left: (svIvWgtPeerIxVal/(svIvWgtApptIxVal*2)*100)+'%', display:peState?'block':'none'}">
											<span></span>
										</div>
									</div>
								</div>
							</div>
							<div class="loan_date">
								<!--span class="pe">또래 <em class="num">20%</em></span-->
								<span class="pe" :style="{display:peState?'block':'none'}">또래 <em class="num">{{svIvWgtPeerIxVal}}%</em></span>
								<span>적정 <em class="num">{{svIvWgtApptIxVal}}%이상</em></span>
							</div>
						</div>
					</div>
					<!-- //progressBar -->
					<div class="slideBox">
						<div class="gray_box_2023 type2" id="thirdBox">
							<p>총소득에 비해 저축/투자액이 적정 대비<br><span class="pointColor">{{svIvWgtIxGapAm | numberFilter}}원</span> 적어요</p>
						</div>
						<ul class="list_type_02 financeType">
							<li>
								<span>총소득(연간)</span>
								<em>{{totIcmAm | numberFilter}}원</em>
							</li>
							<li>
								<span>저축/투자액(연간)</span>
								<em>{{svIvAm | numberFilter}}원</em>
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

import ASIP2005 from '@/views/page/AS/IP/ASIP2005/ASIP2005'
import ASIP2012 from '@/views/page/AS/IP/ASIP2012/ASIP2012'
import ASIP2013 from '@/views/page/AS/IP/ASIP2013/ASIP2013'
import ASIP2014 from '@/views/page/AS/IP/ASIP2014/ASIP2014'
	

export default {
	
	name : "ASIP2005",
        data: () => {
            return {                
				currYmd              : "", // 현재년월일
				cusnm                : "", // 로그인 사용자 이름
				ctgrDgnRzt           : "", // 카테고리진단결과
				ctgrDgnRztTxt        : "", // 카테고리진단결과명
				ixSatCnt             : 0,  // 충족지수개수
				totIcmAm             : 0,  // 총소득
				totXpsAm             : 0,  // 총지출
				totAsetAm            : 0,  // 총자산
				fnasAm               : 0,  // 금융자산
				svIvAm               : 0,  // 저축및투자액

				xpsWgtIxGapAm        : 0,  // 총소득대비총지출
				fnasWgtIxGapAm       : 0,  // 총자산대비금융자산
				svIvWgtIxGapAm       : 0,  // 총소득대비저축/투자액
				
				
				tranList    		 : [], // 임시 리스트
				
				peerNo               : "", //또래값
				peerVal_1            : "",
				peerVal_2            : "",

				


				xpsWgtIxSatYn       : "", // 지출비중지수 지표 결과
				xpsWgtIxSatYnTxt    : "", // 지출비중지수 지표 결과값 (충족/과다)
				xpsWgtCusIxVal      : "", // 지출비중지수 지표 (%)
				xpsWgtPeerIxVal     : "", // 지출비중지수 또래 지표 (%)
				xpsWgtApptIxVal     : "", // 지출비중지수 적정 지표 (%)

				fnasWgtIxSatYn        : "", // 금융자산비중지수 지표 결과
				fnasWgtIxSatYnTxt     : "", // 금융자산비중지수 지표 결과값 (충족/부족)
				fnasWgtCusIxVal       : "", // 금융자산비중지수 지표 (%)
				fnasWgtPeerIxVal      : "", // 금융자산비중지수 또래 지표 (%)
				fnasWgtApptIxVal      : "", // 금융자산비중지수 적정 지표 (%)

				svIvWgtIxSatYn        : "", // 저축투자비중지수 지표 결과
				svIvWgtIxSatYnTxt     : "", // 저축투자비중지수 지표 결과값 (충족/부족)
				svIvWgtCusIxVal       : "", // 저축투자비중지수 지표 (%)
				svIvWgtPeerIxVal      : "", // 저축투자비중지수 또래 지표 (%)
				svIvWgtApptIxVal      : "", // 저축투자비중지수 적정 지표 (%)
			 
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
                    url: '/as/ip/05r01', // 인터페이스ID: IF-MOB-PFM-ASIP06R01, 서비스코드: PFMASIP06R01
                    data: {
						"mydtCusno"  : this.getUserInfo('mydtCusno'),						
                        "basYmd"     : this.currYmd
                    }
                };

                //this.executeCnt++
                apiService.call(config).then(response => {
                    console.log("======= /as/ip/05r01 response =======", response)

					this.ctgrDgnRzt     = response.ctgrDgnRzt;
					
					this.ixSatCnt       = response.ixSatCnt;
					this.totIcmAm   	= response.totIcmAm;
					this.totXpsAm       = response.totXpsAm;
					this.totAsetAm      = response.totAsetAm;
					this.fnasAm         = response.fnasAm;
					this.svIvAm       	= response.svIvAm;

					this.xpsWgtIxGapAm  	= response.xpsWgtIxGapAm;
					this.fnasWgtIxGapAm  = response.fnasWgtIxGapAm;
					this.svIvWgtIxGapAm   = response.svIvWgtIxGapAm;					

					if(this.ctgrDgnRzt === "1")
						this.ctgrDgnRztTxt = "적정"
					else
						this.ctgrDgnRztTxt = "개선"

					this.tranList = response.FinanceDiagnosisSvcSubListOutV2 || [];

					console.log("======= tranList ========", this.tranList);

					
					if(this.tranList.length > 0)
					{
						for(let i = 0; i < this.tranList.length; i++) {
							if(this.tranList[i].fnaIxDsc === "XPS_WGT_IX") 
							{

								if(this.tranList[i].ixSatYn  === "1")
								{
									this.xpsWgtIxSatYn = "true";
									this.xpsWgtIxSatYnTxt = "충족";
									this.fn_hideBox("#firstBox");
								}
								else
								{
									this.xpsWgtIxSatYn = "false";
									this.xpsWgtIxSatYnTxt = "과다";
								}

								this.xpsWgtCusIxVal       = this.tranList[i].cusIxVal;
								this.xpsWgtPeerIxVal      = this.tranList[i].peerIxVal;
								this.xpsWgtApptIxVal      = this.tranList[i].apptIxVal;


								// 첫번째만 또래 값 체크
								this.peerNo = this.tranList[i].peerNo;

							}
							else if (this.tranList[i].fnaIxDsc === "FNAS_WGT_IX") 
							{
								if(this.tranList[i].ixSatYn  === "1")
								{
									this.fnasWgtIxSatYn = "true";
									this.fnasWgtIxSatYnTxt = "충족";
									this.fn_hideBox("#secondBox");
								}
								else
								{
									this.fnasWgtIxSatYn = "false";
									this.fnasWgtIxSatYnTxt = "부족";
								}							
								this.fnasWgtCusIxVal       = this.tranList[i].cusIxVal;
								this.fnasWgtPeerIxVal      = this.tranList[i].peerIxVal;
								this.fnasWgtApptIxVal      = this.tranList[i].apptIxVal;		

							}
							else if (this.tranList[i].fnaIxDsc === "SV_IV_WGT_IX") 
							{
								if(this.tranList[i].ixSatYn  === "1")
								{
									this.svIvWgtIxSatYn = "true";
									this.svIvWgtIxSatYnTxt = "충족";
									this.fn_hideBox("#thirdBox");
								}
								else
								{
									this.svIvWgtIxSatYn = "false";
									this.svIvWgtIxSatYnTxt = "부족";
								}							
								this.svIvWgtCusIxVal       = this.tranList[i].cusIxVal;
								this.svIvWgtPeerIxVal      = this.tranList[i].peerIxVal;
								this.svIvWgtApptIxVal      = this.tranList[i].apptIxVal;

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
			}
			,

			/*
            * 텍스트박스 숨김
            */
			fn_hideBox (params) 
			{
				$(params).hide();
			},

			fn_openSlide(slideId) {

				let component;

				if(slideId == 'ASIP2012'){
					component = ASIP2012;
				} else if (slideId == 'ASIP2013'){
					component = ASIP2013;
				} else if (slideId == 'ASIP2014'){
					component = ASIP2014;
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