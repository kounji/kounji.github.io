<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 금융통통
* @ 페이지설명 : 금융과생활 > 금융통통 > 노후준비 > 메인
* @ 파일명     : src\views\page\PD\RT\PDRT2001\PDRT2001.vue
* @ 작성자     : CS533541
* @ 작성일     : 2023-08-03
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-03              CS533541              최초작성
*************************************************************************/
-->
<template>

   <page class="content-view hasLNB mydata2023">
    <pd-category-v2 type="PDRT"></pd-category-v2>
    <pd-sub-category-v2 type="RT_"></pd-sub-category-v2>

	<!-- full popup S -->
		<div id="content" class="renewal old_age">

			<!-- 60세까지 연금 납입 후 은퇴 후 월 수령 예상금액 안내가 가능한 경우-->
			<div class="com_inner" v-if="prtoDsc =='1'">
				<div class="top_area">
					<p class="tag_wrap" v-if="sAgYrcn > 0">
						<span class="tag">#{{sAgYrcn}}세부터</span><span class="tag">#{{sTotEntPrdVal}}년간</span>
					</p>
					<p class="tag_wrap" v-else>
						<span class="tag">#{{sPnsStrtAg}}세부터</span><span class="tag">#20년간</span>
					</p>
				
					<strong class="titH1" v-if="mmPnsTts > 0">
						내 예상 연금 <span class="pointColor green">월{{ fn_hanValue(String(mmPnsTts))}}</span>
					</strong>

					<strong class="titH1" v-else>
						내 예상 연금 <span class="pointColor green">월 0만원</span>
					</strong>

					<button class="tooltipBtn" @click.prevent="fn_openSlide('PDRT2002')"></button>

					<div class="setting">
						<a href="javascript:void(0);" class="btnSet" role="button" title="연금맞춤설정 이동" @click.prevent="fn_openSlide('PDRT2003')">연금맞춤설정</a>
					</div>
				</div>

				<div class="com_box_type01 bottomBtnType" @click="showMore">
					<div class="layoutBox wAuto">
						<div class="custom_box_chart old_age_chart">

							<div class="compare_chart_wrap" v-if="sMmLfecs > mmPnsTts">
								<!-- 차트 -->
								<div class="chart">
									<div class="bar_wrap">
										<div class="bars">
											<div class="bar bar_sd" style="height:100%;">
												<div class="chart_tooltip_wrap">
													<span class="chart_tooltip"><em class="num">{{fn_hanValue(String(sMmLfecs))}}</em></span>
												</div>
												<div class="inner_text">적정</div>
											</div>
											<div class="bar bar_me" style="height:60%;">
												<div class="inner_text">나</div>
											</div>
										</div>
									</div>
								</div>
								<!--// 차트 -->	
								<div class="chart_info">
									<p>
										안정된 노후 생활을 위해<br>
										<strong><span class="pointColor red2">월 {{fn_hanValue(String(sMmLfecs-mmPnsTts))}} </span>이 더 필요해요</strong>
									</p>	
								</div>	
							</div>

							<!-- 정정하거나 많은 경우 -->
							<div class="compare_chart_wrap" v-else> 
								<!-- 차트 -->
								<div class="chart">
									<div class="bar_wrap">
										<div class="bars">
											<div class="bar bar_sd" style="height:100%;">
												<div class="chart_tooltip_wrap">
													<span class="chart_tooltip"><em class="num">{{fn_hanValue(String(sMmLfecs))}}</em></span>
												</div>
												<div class="inner_text">적정</div>
											</div>
											<div class="bar bar_me true">
												<div class="inner_text">나</div>
											</div>
										</div>
									</div>
								</div>
								<!--// 차트 -->
								<div class="chart_info">
									<p>
										안락한 노후생활을 위해<br>
										<strong>열심히 준비하셨네요.</strong>
									</p>	
								</div>	
							</div>
						</div>
					</div>
				
					<div class="slideBox">							
						<ul class="list_type_02 financeType">
							<li>
								<span>국민연금 예상금액</span>
								<em v-if="sNtpsMmAm > 10000"> {{fn_hanValue(String(sNtpsMmAm))}}</em> 
								<em v-else> 0만원</em>
							</li>
							<li>
								<span>퇴직연금 예상금액</span>
								<em v-if="sRtronsMmAm > 10000"> {{fn_hanValue(String( sRtronsMmAm))}}</em>
								<em v-else> 0만원</em>
							</li>
							<li>
								<span>개인연금 예상금액</span>
								<em v-if="sPpnsMmAm > 10000" >{{fn_hanValue(String(sPpnsMmAm))}}</em>
								<em v-else> 0만원</em>
							</li>
						</ul>
					</div>
					<button class="bottomBtn">더보기</button>
				</div>
			</div>

			<!-- 국민연금에 연결이 안된경우 -->
			<div class="com_inner" v-else-if="prtoDsc =='2'">
					<!-- 국민연금에 연결이 안된경우 -->
					<div class="top_area nonConnect">
						<strong class="titH1">국민연금 연결이 필요해요.</strong>
						<p class="tag_wrap imgBg">받을 수 있는 연금을 알아보고<br>필요 자금도 계산해 보세요.</p><!-- 08/08 imgBg 추가 -->
						<p class="com_txtinfo_type01">가지고 있는 연금을 모두 연결해 주세요.</p>
					</div>
					<div class="com_btn_area">
						<a href="javascript:void(0);" class="com_btnround_type02" role="button" @click.prevent="fn_moveJoinPop()"><span class="btn_plus">연금 추가하기</span></a>
					</div>
					<!--// 국민연금에 연결이 안된경우 -->
			</div>
			<!-- 연금 수령 대상 인 경우(출생년도 1962년생 이전)  -->
			<div class="com_inner" v-else-if="prtoDsc =='3'">
				<!-- 연금 수령 연령 도래 -->
					<div class="top_area nonConnect">
						<strong class="titH1">모은 연금을 수령 하고 있나요?</strong>
						<p class="tag_wrap">안락한 노후를 위한 <br>자금 마련 준비가 되었나요?</p>
					</div>
					<div class="com_btn_area">
						<a href="javascript:void(0);" class="com_btnround_type02" role="button" @click.prevent="movePage('ASIP2001')"><span class="btn_plus">나의 재무 진단</span></a>
					</div>
				<!--// 연금 수령 대상 인 경우(출생년도 1962년생 이전)  -->
			</div>	

			<!-- 만 60세까지 납입기간이 120개월 미만인 경우-->
			<div class="com_inner" v-else-if="prtoDsc =='4'">
				<!-- 가입 기간 부족 -->
				<div class="top_area nonConnect">
					<strong class="titH1">국민연금 가입 기간이 부족해요.</strong>
					<p class="tag_wrap">만 60세까지 가입기간이 10년 미만이면<br>연금으로 받을 수 없어요.</p>
					<div class="tooltipBox">
						<span>연금으로 받으려면</span>
						<button class="tooltipBtn" @click.prevent="fn_openSlide('PDRT2008')"></button>
					</div>
				</div>
				<!--// 가입 기간 부족 -->
			</div>

			<template v-if="sNtpsTotAm > 0 || sRtrpnsTotAcEvlam > 0 || sPpnsTts > 0">
			<hr class="hr03">
			<div class="com_inner">
				<strong class="titH3">{{cusnm}}님의 모은 연금 <span class="num">{{allPnsTts| numberFilter}}</span>원</strong>
				<div class="chart_wrap">
					<div class="pension_bar_chart">
						<div v-if="ntpsPct > 0" class="pension_bar national" :style="`width:${ntpsPct}%`"></div>
						<div v-else class="pension_bar national blind" style="width:0"></div>

						<div v-if="rtrpnsPct > 0" class="pension_bar retirement" :style="`width:${rtrpnsPct}%`"></div>
						<div v-else class="pension_bar retirement blind" style="width:0"></div>

						<div v-if="ppnsPct > 0" class="pension_bar personal" :style="`width:${ppnsPct}%`"></div>
						<div v-else class="pension_bar personal blind" style="width:0"></div>
					</div>

					<div class="pension_item_list">
						<dl class="item national">
							<dt>국민</dt>
							<dd><em class="num">{{ntpsPct}}</em>%</dd>
						</dl>
						<dl class="item retirement">
							<dt>퇴직</dt>
							<dd><em class="num">{{rtrpnsPct}}</em>%</dd>
						</dl>
						<dl class="item personal">
							<dt>개인</dt>
							<dd><em class="num">{{ppnsPct}}</em>%</dd>
						</dl>
					</div>
				</div>
			</div>
			</template>

			<div class="com_inner mt30">
				<!-- 국민연금 -->
				<div class="com_box_type01 toggle_list_box2 custom_list" v-if="sNtpsTotAm > 0" >
					<div data-ui-toggle="box" class="toggle_box_area open">
						<button type="button" class="view_btn" aria-expanded="true">
							<div class="new_tit_area">
								<div class="tit"><span>국민연금</span></div>
								<span class="total_price">
									<em class="num"> {{sNtpsTotAm | numberFilter}}</em><em class="unit">원</em>
								</span>
							</div>
							<em class="open">열기</em>
							<em class="close">닫기</em>
						</button>
					</div>
					<ul class="view_cont list_toggle">
						<li>
							<dl class="pensoin_period">
								<dt>가입기간</dt>
								<dd>{{sNtpsTotPrdCn}}개월</dd>
							</dl>

							<a href="javascript:void(0);" class="link_arrow txt_r" @click.prevent="movePage('PDSC2001')" >연금가입내역</a>
						</li>
					</ul>
				</div>
				<!-- //국민연금 -->

				<!-- 퇴직연금 -->
				<div class="com_box_type01 toggle_list_box2 custom_list" v-if="sRtrpnsTotAcEvlam > 0">
					<div data-ui-toggle="box" class="toggle_box_area open">
						<button type="button" class="view_btn" aria-expanded="false">
							<div class="new_tit_area">
								<div class="tit"><span>퇴직연금</span></div>
								<span class="total_price">
									<em class="num">{{sRtrpnsTotAcEvlam| numberFilter}} </em><em class="unit">원</em>
								</span>
							</div>
							<em class="open">열기</em>
							<em class="close">닫기</em>
						</button>
					</div>
					<ul class="view_cont list_type_01">
						<li v-for="(item, idx) in sDcList" :key="idx">
							<!--<a href="#nolink" role="button"> -->
								<dl>
									<dt>
										<div>
											<i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
											<em class="prod_name">{{item.dcRtrpnsWrsnm}}</em>
										</div>
									</dt>
									<dd>
										<span class="com_price">
											<em class="num">{{item.acEvlam| numberFilter}} </em><em class="unit">원</em>
										</span>
									</dd>
								</dl>
							<!--</a>-->
						</li>
					</ul>
				</div>
				<!-- //퇴직연금 -->

				<!-- 개인연금 -->
				<div class="com_box_type01 toggle_list_box2 custom_list" v-if="sPpnsTts > 0" >
					<div data-ui-toggle="box" class="toggle_box_area open">
						<button type="button" class="view_btn" aria-expanded="true">
							<div class="new_tit_area">
								<div class="tit"><span>개인연금</span></div>
								<span class="total_price">
									<em class="num">{{sPpnsTts | numberFilter}}</em><em class="unit">원</em>
								</span>
							</div>
							<em class="open">열기</em>
							<em class="close">닫기</em>
						</button>
					</div>
					<ul class="view_cont list_type_01">
						<li v-for="(item, idx) in pnsvInsuList" :key="`0_${idx}`">
							<!--<a href="#nolink" role="button"> -->
								<dl>
									<dt>
										<div>
											<i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
											<em class="prod_name">{{item.isrcoWrsnm}}</em>
										</div>
									</dt>
									<dd>
										<span class="com_price">
											<em class="num">{{item.isrTotPymAmt | numberFilter}}</em><em class="unit">원</em>
										</span>
									</dd> 
								</dl>
							<!--</a>-->
						</li>

						<li v-for="(item, idx) in pnsvFundList" :key="idx">
							<!--<a href="#nolink" role="button"> -->
								<dl>
									<dt>
										<div>
											<i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
											<em class="prod_name">{{item.acWrsnm}}</em>
										</div>
									</dt>
									<dd>
										<span class="com_price">
											<em class="num">{{item.acNowBac | numberFilter}}</em><em class="unit">원</em>
										</span>
									</dd>
								</dl>
							<!--</a> -->
						</li>
					</ul>
				</div>
				<!-- //개인연금 -->
			</div>
			<!-- 20231004_60세 이상일경우 기획에 문의결과 hidden 처리 요청 및 월 생활비가 관리자 월생활비 금액보다 클경우 빼기 -->
			<template  v-if="prtoDsc =='1'&& cusAge < 60 ">
			<hr class="hr03">
			<div class="com_inner">
				<strong class="titH3">노후 연금 시뮬레이션</strong>
				<div class="simulation_text">
					<p>
						<!-- 월 생활비 <a href="javascript:void(0);" class="select_btn" role="button" title="노후 월 생활비 목표 선택" @click.prevent="fn_openSlide('PDRT2004')"> {{fn_hanValue(smltMmAm.toString())}}</a> 을<br> -->
						월 생활비 <a href="javascript:void(0);" class="select_btn" role="button" title="노후 월 생활비 목표 선택" @click.prevent="fn_openSlide('PDRT2004')">{{fn_hanValue(smltMmAm.toString())}}</a> 을<br> 
					</p>
					<p>연금으로 받아 노후를 보내려면?</p>
				</div>
				<div class="gray_box_2023 iconLinkType" v-if="cusAmSvYn == 'N'" >  <!-- 시뮬레이션 미 실행(화면 첫 진입) -->
					<strong v-if="cusMmAm > 0" >60세까지 <em>월 {{cusMmAm| numberFilter}}</em>원<br>추가 저축이 필요해요</strong>
					<strong v-else>이미 <em>월 {{mmPnsTts - sMmLfecs  | numberFilter}}</em>원 여유가 있어요</strong>

					<div class="graybox_link">
						<a href="javascript:void(0);" @click.prevent="movePage('PDPD1001')">꼭 맞는 상품을 추천해 드려요</a>
					</div>
				</div>

				<div class="gray_box_2023 iconLinkType" v-else> <!-- 시뮬레이션 실행 -->
					<strong v-if="cusMmAm > 0" >60세까지 <em>월 {{cusMmAm| numberFilter}}</em>원<br>추가 저축이 필요해요</strong>
					<strong v-else>이미 <em>월 {{ mmPnsTts - smltMmAm | numberFilter}}</em>원 여유가 있어요</strong>

					<div class="graybox_link">
						<a href="javascript:void(0);" @click.prevent="movePage('PDPD1001')">꼭 맞는 상품을 추천해 드려요</a>
					</div>
				</div>
			</div>
			</template>

			<hr  class="hr03">

				<div class="com_inner">
					<!-- 부가 서비스 배너 -->
					<div class="subSvcBannerArea fixType">
						<div class="com_box_type01 bannerCard ret">
							<a href="javascript:void(0);" @click.prevent="fn_movePopup('PDRT2009')" >
								<p>부족한 금액 ?만원</p>
								<strong>나의 은퇴 준비 진단</strong>
							</a>
						</div>
						<div class="com_box_type01 bannerCard taxf">
							<a href="javascript:void(0);" @click.prevent="movePage('PDYT2002')">
								<p>내가 받을 수 있는</p>
								<strong>세액공제액은 얼마?</strong>
							</a>
						</div>
					</div>
					<!--// 부가 서비스 배너 -->
				</div>

			<div class="new_add_register"><a href="javascript:void(0);" role="button" @click.prevent="fn_movePopup('COAR2002')"><span>연금이 더 있나요?</span></a></div>
			
		</div>

	<footersV2 type="pd" />
   </page>
</template>

<script>

import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import commonMixin from '@/common/mixins/commonMixin'
import PdCategoryV2 from '@/components/category/PdCategoryV2.vue'
import PdSubCategoryV2 from '@/components/category/PdSubCategoryV2.vue'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import PDRT2002 from '@/views/page/PD/RT/PDRT2002/PDRT2002'
import PDRT2003 from '@/views/page/PD/RT/PDRT2003/PDRT2003'
import PDRT2004 from '@/views/page/PD/RT/PDRT2004/PDRT2004'
import PDRT2008 from '@/views/page/PD/RT/PDRT2008/PDRT2008'
import PDRT2009 from '@/views/page/PD/RT/PDRT2009/PDRT2009'
import COAR2002 from '@/views/page/CO/AR/COAR2002/COAR2002'
//import COAR2003 from '@/views/page/CO/AR/COAR2003/COAR2003'
import COAR2005 from '@/views/page/CO/AR/COAR2005/COAR2005' // 개인신용정보제공동의
import commonService from '@/service/commonService'
import {mapGetters} from 'vuex'
export default {

	name : "PDRT2001",
    data: () => {
        return {
				respInfo      		: {},
				sAgYrcn 			: 0,	//연령년수(연금맞춤설정)
				sAgCmprOprtC  		: "",	//연령비교연산자코드(연금맞춤설정)
				sTotEntPrdVal		: "",	//총가입기간값(연금맞춤설정)
				totEntPrdVal		: 0,	//총가입기간값
				sDcyrMmLfecsNedAm 	: 0,	//노후월생활비필요금액
				sMmLfecs   			: 0,	//월생활비(관리자)
				sPnsStrtAg 			: 0,	//연금개시연령(관리자)
				sPnsXpcAm 			: 0,	//연금예상금액(국민연금(예상연금월액표))
				sNtpsTotAm          : 0,  	//국민연금총금액
				sNtpsTotPrdCn		: 0,  	//국민연금총가입기간
				sRtrpnsTotAcEvlam	: 0,	//퇴직연금DC_퇴직연금DC총평가금액
				sDcList    			: [],    //퇴직연금
				pnsvInsuList     	: [],     // 연금저축보험목록
				pnsvFundList     	: [],      // 연금저축펀드목록
				cusnm				: "",	// 마이데이터 사용자명
				birYy				: 0,	// 고객출생연도
				sNtpsMmAm			: 0,	// 국민연금 월금액
				sRtronsMmAm 		: 0,	// 퇴직연금 월금액
				sPpnsMmAm 			: 0,	// 개인연금 월금액
				sPpnsTts 			: 0,	// 개인연금 총 금액
				cusMmAm				: 0,	// 노후 연금 시뮬레이션 월 생활비
				cusAmSvYn			: "N",	// 노후 연금 시뮬레이션 클릭 후 확인여부
				prtoDsc				: "",	//조건값에 따른 레이아웃 출력여부 변수
				//s1962Yy 			: 1962,  //1962년생
				cusAge				: 0, 	 //고객나이
				nowYear				: 0, 	 //현재년도
				mmPnsTts			: 0, 	 //월 연금 총합계
				allPnsTts			: 0, 	 //연금총 합계
				pnsJstYn			: "N", 	 //연금적정여부
				ntpsPct				: 0, 	 //국민연금%
				rtrpnsPct			: 0, 	 //퇴직연금%
				ppnsPct				: 0, 	 //개인연금%
				ntpsAssetYn			: "N", 	 //국민연금 연결 여부
				smltMmAm			: 0 	 //시뮬레이션 월 금액
        }    
    },
    computed : {
         ...mapGetters('myassets', [
             'myAssetsBzrgList'
		]),
    },
    methods: {
		showMore() {
			let _this = $('.bottomBtnType .bottomBtn')
			let _par = _this.parent()

			if(_par.hasClass('open')){
				_par.find('.slideBox').slideUp(300);
				_par.removeClass('open');
				_par.find('.bottomBtn').text('더보기');
			}else{
				_par.find('.slideBox').slideDown(300);
				_par.addClass('open');
				_par.find('.bottomBtn').text('접기');
			}
		},
        initComponent() {

            $('.lnb [role=tablist] > li').each(function(){

				$(this).on('click', function(){

					var scrollTo = $(this).position().left - 100;
					$(this).parents($('.lnb').not('.is_open')).animate({'scrollLeft':scrollTo},500);
					console.log(scrollTo);
				});		
			});
			/*
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
				}
			});
			*/
			this.cusnm	= this.getUserInfo('cusnm')	// 마이데이터 사용자명

			//국민연결 여부 
			this.ntpsAssetYn = 'N'

			if(typeof this.myAssetsBzrgList != "undefined") {
				let publicAsset = this.myAssetsBzrgList.filter(item => item.comnCVal === 'public') || []
				if(publicAsset.length > 0) {
					let publicAssetList = this.myAssetsBzrgList.find(item => item.comnCVal === 'public').orgList || []
					if(publicAssetList.length > 0){
						this.ntpsAssetYn = publicAssetList.find(item => item.infOfrmnOrgC === 'PBAAVM0000') ? 'Y' : 'N'		// 국민연금
					}
				}
			}
			console.log("ntpsAssetYn =====[" +this.ntpsAssetYn +"]");
			this.getData();
        },
        
        getData(){

			//노후준비 조회
			const config = {
				url: '/pd/rt/01r01', // IF-MOB-PFM-PDRT01R01 / DcyrPnsAmnV2.getSlfDcyrRsvDsgV2

				data: {
					mydtCusno : this.getUserInfo('mydtCusno') // 마이데이터고객번호
				}
			};

			apiService.call(config).then(response => {

			this.respInfo = response

			this.sAgYrcn       = this.respInfo.agYrcn;      //연령년수(연금맞춤설정)
			this.sAgCmprOprtC  = this.respInfo.agCmprOprtC; //연령비교연산자코드(연금맞춤설정)
			this.sTotEntPrdVal = this.respInfo.totEntPrdVal; //총가입기간값(연금맞춤설정)
			this.sDcyrMmLfecsNedAm	= this.respInfo.dcyrMmLfecsNedAm; //노후월생활비필요금액(연금맞춤설정)

			if(this.respInfo.mmLfecs > 0){
				this.sMmLfecs = this.respInfo.mmLfecs;			//월생활비(관리자) 	
			}else{
				this.sMmLfecs = 1770000;
			}
			this.sPnsStrtAg			= this.respInfo.pnsStrtAg;		//연금개시연령(관리자)
			this.sPnsXpcAm          = this.respInfo.pnsXpcAm;		//연금예상금액(국민연금(예상연금월액표))
			this.cusAge    			= this.respInfo.mydtCusAge;   	//고객만나이
			this.birYy  		  	= this.respInfo.birYy   		//고객출생연도
			this.sNtpsTotAm			= this.respInfo.ntpsTotAm;		//국민연금총금액
			this.sNtpsTotPrdCn		= this.respInfo.ntpsTotPrdCn;	//국민연금총가입기간
			this.sRtrpnsTotAcEvlam 	= this.respInfo.rtrpnsTotAcEvlam //퇴직연금DC_퇴직연금DC총평가금액
			this.sDcList  		  	= this.respInfo.dcList || []  	  //퇴직연금DC_리스트

			this.sPpnsTts   		= this.respInfo.pPnsTotAcEvlam     // 개인연금총평가금액 
            this.pnsvInsuList     	= this.respInfo.pnsvInsuList || [] // 연금저축보험 목록
			this.pnsvFundList     	= this.respInfo.pnsvFundList || [] // 연금저축펀드 목록
			
			this.smltMmAm  			= this.sMmLfecs;//어드민 월 생활비를 시뮬레이션 월 생활비로 Set

			this.allPnsTts 	= this.sNtpsTotAm	+ this.sRtrpnsTotAcEvlam + this.sPpnsTts //국민연금 + 퇴직연금+개인연금 총 합계

			if(this.sNtpsTotAm > 0){
				this.ntpsPct  	= this.fn_PnsPct(this.sNtpsTotAm);// 국민연금%
			}

			if(this.sRtrpnsTotAcEvlam > 0){
				this.rtrpnsPct  =  this.fn_PnsPct(this.sRtrpnsTotAcEvlam);//퇴직연금%
			}

			if(this.sPpnsTts > 0){
				this.ppnsPct  	= this.fn_PnsPct(this.sPpnsTts);//개인연금%
			}

			let  sumTotYear = 0;
			if(this.sTotEntPrdVal != "" &&  this.sTotEntPrdVal != undefined){ //연금맞춤설정에 저장된 기간 선택시 
				sumTotYear = 	Number(this.sTotEntPrdVal);
			}else{
				sumTotYear = 20; //디폴트 20년
			}

			//국민연금 월금액 구하기
			if( this.sPnsXpcAm > 0){
				let ntpsMmAm = Math.round(Number(this.sPnsXpcAm)/10000) *10000;			// //연금예상금액(국민연금(예상연금월액표))

				let sumNtpsMmAm = 0;

				if(this.sAgCmprOprtC == "01"){ //조기이면

					if( this.sPnsStrtAg == 64){
						sumNtpsMmAm = Math.floor( (ntpsMmAm - (ntpsMmAm * 0.015 )) /10000 ) *10000;
						this.sNtpsMmAm = sumNtpsMmAm;
					}else if( this.sPnsStrtAg == 65 ){

						sumNtpsMmAm = Math.floor( (ntpsMmAm - ( ntpsMmAm * 0.020)) /10000) * 10000;
						this.sNtpsMmAm = sumNtpsMmAm;
					}
					
				}else if( this.sAgCmprOprtC == "03"){ //지연이면

					sumNtpsMmAm = Math.round( (ntpsMmAm +  (ntpsMmAm * 0.030)) /10000 ) *10000;
					this.sNtpsMmAm = sumNtpsMmAm;

				}else{//정상이면
					this.sNtpsMmAm = ntpsMmAm;
				}

			}else{
				this.sNtpsMmAm = 0;
			}
			console.log("ntpsMmAm=== 111", this.sNtpsMmAm);

			/*
			if( this.sDcyrMmLfecsNedAm > 0 ){
				this.sNtpsMmAm = Math.round( Number(this.sDcyrMmLfecsNedAm)/10000 ) *10000;	 //노후월생활비필요금액(연금맞춤설정)
			}else{
				this.sNtpsMmAm = Math.round(Number(this.sPnsXpcAm)/10000) *10000;			// //연금예상금액(국민연금(예상연금월액표))
			}*/

			this.totEntPrdVal = sumTotYear;

			//퇴직연금 월금액 구하기
			if(this.sRtrpnsTotAcEvlam > 0){
				this.sRtronsMmAm =  Math.round( (Number(this.sRtrpnsTotAcEvlam) / (sumTotYear*12) ) / 10000) *10000;	
			}else{
				this.sRtronsMmAm = 0;	
			}

			//개인연금 월금액 구하기
			if( this.sPpnsTts > 0 ){
				this.sPpnsMmAm = Math.round( (Number(this.sPpnsTts) / (sumTotYear*12)) /10000) * 10000;	
			}else{
				this.sPpnsMmAm = 0;
			}

			this.mmPnsTts = this.sNtpsMmAm + this.sRtronsMmAm + this.sPpnsMmAm;//월 총연금액

			let pnsYn      = 'N'; //국민연금 납입 10년이상여부
			let sNptsAgeYn = 'N'; //국민연금 연금수령여부
			
			//국민연금 총가입기간이 10(120)년이상이면
			if(this.sNtpsTotPrdCn >= 120 ){
				pnsYn = 'Y';
			}else if( this.sNtpsTotPrdCn > 0 && this.sNtpsTotPrdCn <120){ //가입기간이 10년이 안되면 (총가입기간/12) + (60-만나이 *12)
				let sTotTt = ( this.sNtpsTotPrdCn/12) + (60- this.cusAge)*12 ;
				if(sTotTt >= 120){
					pnsYn = 'Y';
				}
			}else{
				pnsYn = 'N';
			}


			//if(this.birYy >= this.s1962Yy ){
		
				if( this.sPnsStrtAg > this.cusAge  ){ //관리자에 등록된 연금개시연령보다 적으면
					sNptsAgeYn = 'Y';	
				}
			//}

			//국민연금 월 수령액 , 국민연금 가입, 10년이상 납부, 연금수령전
			if(this.sNtpsMmAm > 0 && this.ntpsAssetYn == 'Y' && pnsYn == 'Y' && sNptsAgeYn == 'Y'){
				this.prtoDsc = 1;

			//국민연금 미가입	
			}else if(this.ntpsAssetYn == 'N' ){
				this.prtoDsc = 2;
			//국민연금 수령자	
			}else if(this.sNtpsTotAm > 0 && this.ntpsAssetYn == 'Y' && sNptsAgeYn == 'N'){
				this.prtoDsc = 3;
			//국민연금 가입 및 납부 10년 이하	
			}else if(this.sNtpsTotAm > 0 && this.ntpsAssetYn == 'Y' && pnsYn == 'N' && sNptsAgeYn == 'Y'){
				this.prtoDsc = 4;
			}else{
				this.prtoDsc = 1;
			}	

			this.getEsgSmltData();

			});

		},

		// 한글금액표시
		fn_hanValue(amount) {
			const koreanUnits = ['', '만', '억', '조']
			let han_amount = parseInt(amount.split(',').join('')) // 만원 단위 화면
			let answer     = ''
			let unit       = 10000
			let index      = 1 //만단위로 출력으로 1로 변경
			let division   = Math.pow(unit, index)

			while (Math.floor(han_amount / division) > 0) {
				const mod = Math.floor(han_amount % (division * unit) / division)
				if (mod) {
					const modToString = mod.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
					answer = `${modToString}${koreanUnits[index]} ` + answer
				}
				division = Math.pow(unit, ++index)
			}
			return (answer + "원").replace(" 원", "원")
            },
		
		fn_openSlide(slideId) {

			let component;

			if(slideId == 'PDRT2002'){
				component = PDRT2002;
			}else if( slideId== 'PDRT2003'){
				component = PDRT2003;
			}else if( slideId== 'PDRT2004'){
				component = PDRT2004;	
			}else{
				component = PDRT2008;
			}
			console.log("fn_openSlide totEntPrdVal ***************" ,this.totEntPrdVal)
			const config = {

				params: { // 파라미터
					agYrcn 		: this.sAgYrcn, 		 	//연령년수(연금맞춤설정)
					agCmprOprtC : this.sAgCmprOprtC, 		//연령비교연산자코드(연금맞춤설정)
					birYy  		  : this.birYy,				// 고객출생연도
					totEntPrdVal  : this.totEntPrdVal,		//총가입기간값
					sDcyrMmLfecsNedAm : this.sDcyrMmLfecsNedAm,	//국민연금 월 생활비
					pnsStrtAg	  : this.sPnsStrtAg,	    //연금개시연령(관리자)
					smltMmAm      : this.smltMmAm,			//시뮬레이션 월생활비
					mmPnsTts	  : this.mmPnsTts,			//월 연금총액		
					cusAge	  	  : this.cusAge				//고객 만나이
				},

				renderer : {
					component // 특약정보(슬라이드 팝업)
				}
			}
			
            modalService.openSlidePagePopup(config).then((response) => {
				console.log("=============================");
				console.log("response========",response);
				if (response?.name === 'PDRT2003') {
					this.getData();
				}else if(response?.name === 'PDRT2004'){

					this.cusMmAm   = parseInt(response.cusAmSv);
					this.cusAmSvYn = response.cusAmSvYn; //시뮬레이션 요청 처리여부
					this.smltMmAm  = response.sSmltMmAm    //시뮬레이션에서 선택한 월 생활비

				}
            });
		},

		fn_movePopup(popUpId) {

			let config = {
                component : null
			}
				
			if(popUpId == "PDRT2009"){
				config.component = PDRT2009;
			//}else if(popUpId == "COAR2003"){ // COAR2005로 변경
			//	config.component = COAR2003;
			}else{
				config.component = COAR2002;
			}
            modalService.openPopup(config).then(() => {});
		},
		
		movePage(pageId) {
			
			if(pageId =="PDYT2002"){

				const config = {
					name: pageId
				}
				commonService.movePage(config)

			}else if(pageId =="ASIP2001"){
				const config = {
					name: pageId
				}
				commonService.movePage(config)

			}else if(pageId =="PDPD1001"){ //상품추천

				const config = {
					name: pageId
				}
				commonService.movePage(config)		

			}else{
				const config = {
					name: pageId
				}
				commonService.movePage(config)
			}
		},
		
		fn_moveJoinPop() {

			let compName = COAR2005;

			let param = {}
			let moduleParam = {}
			let moduleList  = []
			
			moduleParam.orgC		= "PBAAVM0000"
			moduleParam.orgBzrgC	= "public"
			moduleParam.orgnm		= "국민연금공단"
			moduleList.push(moduleParam)
			
			param.moduleList = moduleList
			param.isOnlyPublic = true

            const config = {
                component: compName,
                params : param
			}
			console.log(config)
			modalService.openPopup(config).then(() => {});
			
		},

		//노후연금 초기 시뮬레이션
		getEsgSmltData(){
			/*

				(목표생활비-월 수령예상금액) * 240
				(60-만나이)) * 12 
				20년간 부족금액 / 노동 가능 개월

            */
			console.log("getEsgSmltData totEntPrdVal ***************" ,this.totEntPrdVal)
			console.log("getEsgSmltData totEntPrdVal ***************" ,this.sMmLfecs)
			console.log("getEsgSmltData totEntPrdVal ***************" ,this.mmPnsTts)
			console.log("getEsgSmltData totEntPrdVal ***************" ,this.cusAge)
			let cusAm  		= (this.sMmLfecs - this.mmPnsTts ) * (this.totEntPrdVal*12);//월생활비(관리자) - 월 연금합계
			let workMon 	= (60 - this.cusAge) *12;
			this.cusMmAm  = Math.floor(cusAm / workMon);
		},

		fn_PnsPct(amount){
			return Math.round( (amount/ this.allPnsTts) * 100) ;
		}

    },
    mounted() {

        this.initComponent()
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

    },
    mixins: [
        commonMixin
    ],
    created() {

    },

	components: {
		Page,
		FootersV2,
		PdCategoryV2,
		PdSubCategoryV2
	}   
}
</script>