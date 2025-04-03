<!--
/*************************************************************************
* @ 서비스경로 : 청소년모드 > 자산 메인
* @ 페이지설명 : 청소년모드 > 자산 메인
* @ 파일명     : src/views/page/AS/TA/ASTA4C01/ASTA4C01.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-03-24
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
________________________________________________________________________
* 2025-03-24             CS541597               최초작성
*************************************************************************/
-->
<template>
    <!-- content-view S -->
    <page class="content-view mydata2023"><!-- lnb 존재시 class hasLNB -->

		<div id="content">
			<section class="assets_youth">
				<div class="update">
					<span>2025.07.31 15:20</span>
					<button type="button" class="btn_update"><span class="blind">업데이트</span></button>
				</div>

				<!--개요-->
				<div class="board_box assets_net up"><!--늘은경우 up, ,줄은 경우 down class 추가-->
					<h2>순자산</h2>

					<p class="txt">508,780원</p>

					<div class="analysis">
						<span class="text">지난달보다</span> <span class="num">5,095,452원</span><em>늘었어요.</em>
						<div class="custom_tooltip">
							<div class="com_tooltip_type02 com_tooltip_type03">
								
								<a href="#nolink" class="com_btn_info" role="button">
									<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
								</a>
								<div class="com_ballon_type01 com_ballon_type02" style="display: none;">
									<div>
										<ul class="dotted_list">
											<li>마지막 업데이트 시점의 총 자산과 마지막 업데이트 전 월 말일 총자산을 비교했습니다.</li>
											<li>오늘 업데이트 하셨으면 전 월 말일 총 자산과 비교한 결과입니다.</li>
										</ul>
										<a href="#nolink" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!--동일한 경우
					<div class="analysis">
						<span class="text">지난 달과</span> <em>동일해요.</em>
						<div class="custom_tooltip">
							<div class="com_tooltip_type02 com_tooltip_type03">
								
								<a href="#nolink" class="com_btn_info" role="button">
									<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
								</a>
								<div class="com_ballon_type01 com_ballon_type02" style="display: none;">
									<div>
										<ul class="dotted_list">
											<li>마지막 업데이트 시점의 총 자산과 마지막 업데이트 전 월 말일 총자산을 비교했습니다.</li>
											<li>오늘 업데이트 하셨으면 전 월 말일 총 자산과 비교한 결과입니다.</li>
										</ul>
										<a href="#nolink" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					-->

					<!--줄은경우
					<div class="analysis">
						<span class="text">지난달보다</span> <span class="num">5,095,452원</span><br><em>줄었어요.</em>
						<div class="custom_tooltip">
							<div class="com_tooltip_type02 com_tooltip_type03">
								
								<a href="#nolink" class="com_btn_info" role="button">
									<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
								</a>
								<div class="com_ballon_type01 com_ballon_type02" style="display: none;">
									<div>
										<ul class="dotted_list">
											<li>마지막 업데이트 시점의 총 자산과 마지막 업데이트 전 월 말일 총자산을 비교했습니다.</li>
											<li>오늘 업데이트 하셨으면 전 월 말일 총 자산과 비교한 결과입니다.</li>
										</ul>
										<a href="#nolink" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
									</div>
								</div>
							</div>
						</div>
					</div>

					-->
				</div>

				<!--예금-->
				<div class="board_box assets_detail">
					<h2><a href="#nolink" class="title">예금<span class="num">2</span></a></h2>
					<div class="analysis up">
						<p class="num">220,000원</p>

						<p class="latter">지난달보다 1,000원<em> 늘었어요.</em></p>
						<!--동일한 경우
							<p class="latter">지난달과 <em>동일해요.</em></p>
						-->
					</div>
					<ul class="assets_list">
						<li>
							<a href="#nolink">
								<i class="ico_bank D1AAJB0000"></i>
								<div>
									<strong class="org">K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크</strong>
									<strong class="account">214210757669</strong>
								</div>
								<strong class="num">200원</strong>
							</a>
						</li>
						<li>
							<a href="#nolink">
								<i class="ico_bank D1AAMW0000"></i>
								<div>
									<strong class="org">광주은행</strong>
									<strong class="account">214210757669</strong>
								</div>
								<strong class="num">300원</strong>
							</a>
						</li>
						<li>
							<a href="#nolink">
								<i class="ico_bank D1AAHJ0000"></i>
								<div>
									<strong class="org">카카오뱅크</strong>
									<strong class="account">214210757669</strong>
								</div>
								<strong class="num">10원</strong>
							</a>
						</li>
					</ul>
				</div>
				

				<!--페이/포인트-->
				<div class="board_box assets_detail">
					<h2><a href="#nolink" class="title">페이/포인트<span class="num">3</span></a></h2>
					<div class="analysis down">
						<p class="num">220,000원</p>

						<p class="latter">지난달보다 1,000원<em> 늘었어요.</em></p>
					</div>

					<ul class="assets_list">
						<li>
							<a href="#nolink">
								<i class="ico_bank D1AAJB0000"></i>
								<div>
									<strong class="org">K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크</strong>
									<strong class="account">214210757669</strong>
								</div>
								<strong class="num">200원</strong>
							</a>
						</li>
						<li>
							<a href="#nolink">
								<i class="ico_bank D1AAMW0000"></i>
								<div>
									<strong class="org">광주은행</strong>
								</div>
								<strong class="num">300원</strong>
							</a>
						</li>
						<li>
							<a href="#nolink">
								<i class="ico_bank D1AAHJ0000"></i>
								<div>
									<strong class="org">카카오뱅크</strong>
									<strong class="account">214210757669</strong>
								</div>
								<strong class="num">10원</strong>
							</a>
						</li>
					</ul>
				</div>

				
				<!--금융지식-->
				<!--25-03-18 금융지식 삭제
				<div class="finlit">
					<h2 class="h_tit01">금융지식</h2>
					<a href="#nolink" class="btn_lots"><span class="blind">더보기</span></a>

					<div class="scroller">
						<ul>
							<li>
								<a href="#nolink">
									<img src="../../../../src/assets_v40/images/img/img_generation_60.png" alt="">
									<strong>부자의 첫걸음,<br>금리와 복리를 이해하라!</strong>
									<span class="hash">#콕셍긱</span>
								</a>
							</li>
							<li>
								<a href="#nolink">
									<img src="../../../../src/assets_v40/images/img/img_generation_50.png" alt="">
									<strong>2025년 트렌드 키워드<br>10초 요약</strong>
									<span class="hash">#일반/트렌드</span>
								</a>
							</li>
							!-- <li>
								<a href="#nolink">
									<img src="../../../../src/assets_v40/images/img/img_generation_40.png" alt="">
									<strong>연금저축 및 IRP 가입하고 노후 자금 준비</strong>
									<span class="hash">#40대</span>
								</a>
							</li>
							<li>
								<a href="#nolink">
									<img src="../../../../src/assets_v40/images/img/img_generation_30.png" alt="">
									<strong>맞벌이 부부를 위한 세금 절약 노하우</strong>
									<span class="hash">#30대</span>
								</a>
							</li>
							<li>
								<a href="#nolink">
									<img src="../../../../src/assets_v40/images/img/img_generation_20.png" alt="">
									<strong>첫 직장 생활에서의 소득공제 활용법</strong>
									<span class="hash">#20대</span>
								</a>
							</li>
							<li>
								<a href="#nolink">
									<img src="../../../../src/assets_v40/images/img/img_generation_10.png" alt="">
									<strong>첫 직장 생활에서의 소득공제 활용법</strong>
									<span class="hash">#10대</span>
								</a>
							</li> --
						</ul>
					</div>
				</div>
					-->
			</section>
		</div>
		<!--// content E -->
					
		<footersV2 type="as" />
    </page>
    <!--// content-view E -->
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from "@/views/layout/FootersV2.vue"
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'
import LottieAnimation from 'lottie-web-vue' 
import {mapGetters, mapActions} from 'vuex'    

export default {
	name : "ASTA4C01",
	data: () => {
		return {
			cusnm               : "",
			finalUpdateDtm  	: '',     // 최근 자산 업데이트 시기
			rcnInqDtm           : 0,      // 최근조회일시        
			ntAsetTotAm         : 0,      // 순자산총금액        
			bfNtAsetTotAm       : 0,      // 이전순자산총금액    
			indNtAsetTotAm      : 0,      // 증감순자산총금액    
			asetTotAm           : 0,      // 총자산금액          
			bfAsetTotAm         : 0,      // 이전총자산금액      
			indAsetTotAm        : 0,      // 증감총자산금액      
			asetFnAmSum         : 0,      // 금융자산금액        
			bfAsetFnAmSum       : 0,      // 이전금융자산금액    
			indAsetFnAcSum      : 0,      // 증감금융자산금액    
			asetFnAcAmSum       : 0,      // 금융자산계좌금액    
			asetFnAcTtcn        : 0,      // 금융자산계좌건수    
			asetFnIvAmSum       : 0,      // 금융자산투자금액    
			asetFnIvTtcn        : 0,      // 금융자산투자건수    
			asetFnPnsAmSum      : 0,      // 금융자산연금금액    
			asetFnPnsTtcn       : 0,      // 금융자산연금건수    
			asetFnPayPntAmSum   : 0,      // 금융자산페이머니금액
			asetFnPayPntTtcn    : 0,      // 금융자산페이머니건수
			asetRlthAmSum       : 0,      // 실물자산금액합계    
			bfAsetRlthAmSum     : 0,      // 이전실물자산금액합계
			indAsetRlthAmSum    : 0,      // 증감실물자산금액합계
			asetRlthRlestAm     : 0,      // 실물자산부동산금액  
			asetRlthRlestCn     : 0,      // 실물자산부동산건수  
			asetRlthCarAm       : 0,      // 실물자산자동차금액  
			asetRlthCarCn       : 0,      // 실물자산자동자건수  
			asetEtcAmSum        : 0,      // 기타자산금액합계    
			asetEtcTtcn         : 0,      // 기타자산건수        
			bfAsetEtcAmSum      : 0,      // 이전기타자산금액합계
			indAsetEtcAmSum     : 0,      // 증감기타자산금액합계
			asetEtcCshAmSum     : 0,      // 기타자산현금합계    
			asetEtcCshCn        : 0,      // 기타자산현금건수    
			asetEtcKrwCshAm     : 0,      // 기타자산한화현금금액
			asetEtcKrwCshCn     : 0,      // 기타자산한화현금건수
			asetEtcFcCshAm      : 0,      // 기타자산외화현금금액
			asetEtcFcCshCn      : 0,      // 기타자산외화현금건수
			asetEtcGoldAm       : 0,      // 기타자산골드금액    
			asetEtcGoldCn       : 0,      // 기타자산골드건수    
			asetEtcEtcAm        : 0,      // 기타자산기타금액    
			asetEtcEtcCn        : 0,      // 기타자산기타금액    
			dbtTotAm            : 0,      // 총부채금액          
			bfDbtTotAm          : 0,      // 이전총부채금액      
			indDbtTotAm         : 0,      // 증감총부채금액      
			dbtLonAmSum         : 0,      // 부채대출금액합계    
			dbtLonTtcn          : 0,      // 부채대출건수        
			stdntLonAmSum		: 0,	  // 학자금대출금액합계
			stdntLonTtcn		: 0,	  // 학자금대출건수
			dbtCdAmSum          : 0,      // 부채카드금액합계    
			dbtCdTcn            : 0,      // 부채카드총건수      
			dbtIstAm            : 0,      // 부채할부금융금액    
			dbtIstCn            : 0,      // 부채할부금융건수    
			dbtCarIstAm         : 0,      // 부채자동차할부금액  
			dbtCarIstCn         : 0,      // 부채자동차할부건수  
			dbtLeasAm           : 0,      // 부채금융리스금액    
			dbtLeasCn           : 0,      // 부채금융리스건수    
			dbtCshAm            : 0,      // 부채현금금액        
			dbtCshCn            : 0,      // 부채현금건수        
			isrPymIsrfeTt       : 0,      // 보험납입보험료합계  
			isrTtcn             : 0,      // 보험합계건수        
			isrMnTotPymIsrfe    : 0,      // 인보험납입총보험료  
			isrMnInsuCn         : 0,      // 인보험납입건수      
			isrTngTotPymIsrfe   : 0,      // 물보험납입총보험료  
			isrTngInsuCn        : 0,      // 물보험납입건수          
			
			asetRlthTtcn        : 0,      // 실물자산건수 
			dbtTtcn             : 0,      // 부채총건수 

			asetTotAmHideYn		: false,  // 순자산 숨김 여부
			asetFnAmHideYn		: false,  // 금융자산 총금액 숨김 여부
			asetRlthHideYn		: false,  // 실물자산 총금액 숨김 여부
			asetEtcHideYn		: false,  // 기타자산 총금액 숨김 여부
			dbtHideYn			: false,  // 부채 총금액 숨김 여부
			isrHideYn			: false,  // 보험료 총금액 숨김 여부

			asetTotCn			: 0,	  // 자산 총 건수
			asetFnTotCn			: 0,	  // 금융자산 총 건수 (예금 + 투자 + 연금 + 페이/포인트)
			asetRlTotCn			: 0,	  // 실물자산 총 건수 (부동산 + 자동차)
			asetEtcTotCn		: 0,	  // 기타자산 총 건수 (현금 + 외화 + 금 + 농기계)
			asetDbtTotCn		: 0,	  // 부채 총 건수 (카드 + 대출 + 학자금대출 + 할부금융 + 자동차할부 + 리스 + 빌린돈)
			asetIsrTotCn		: 0,	  // 보험 총 건수 (인보험 + 물보험)

			financeKlList		: [],	  // 금융지식 컨텐츠 목록

			asetTabs			: [],	  // 일반모드 설정 자산 영역 노출 순서
		}
	},
	computed : {
		...mapGetters('myassets', [
			'isMyAssetGathering','lastUpdateDtm'
		]),
	},
	mixins: [
		commonMixin
	],
	created() {
		//초기데이타 선언
		this.cusnm = this.getUserInfo("cusnm")
	},
	mounted() {
		this.initComponent()
		this.listenSubscribe() //자산수집 뮤테이션 처리용
		//PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
	},
	methods: {
		...mapActions('myassets', [
			'getAllMyAssetInfo'
		]),            
		initComponent() {
			
		},
		getData() {
			///////////////////////////////////
			// 계좌목록 조회 
			const config = {
				url: '/as/as/00ra2',
				data: {
					mydtCusno : this.getUserInfo('mydtCusno')
					// mydtCusno: '2000003756'
				}
			}
			apiService.call(config).then(async response =>{
				//console.log("======= /as/ip/00ra2 나의 자산조회 response =======", response)

				this.respInfo = response

				this.rcnInqDtm           = this.respInfo.rcnInqDtm           // 최근조회일시 
						
				this.ntAsetTotAm         = this.respInfo.ntAsetTotAm         // 순자산총금액        
				this.bfNtAsetTotAm       = this.respInfo.bfNtAsetTotAm       // 이전순자산총금액    
				this.indNtAsetTotAm      = this.respInfo.indNtAsetTotAm      // 증감순자산총금액    
				this.asetTotAm           = this.respInfo.asetTotAm           // 총자산금액          
				this.bfAsetTotAm         = this.respInfo.bfAsetTotAm         // 이전총자산금액      
				this.indAsetTotAm        = this.respInfo.indAsetTotAm        // 증감총자산금액 
				
				// 금융자산     
				this.asetFnAmSum         = this.respInfo.asetFnAmSum         // 금융자산금액        
				this.bfAsetFnAmSum       = this.respInfo.bfAsetFnAmSum       // 이전금융자산금액    
				this.indAsetFnAcSum      = this.respInfo.indAsetFnAcSum      // 증감금융자산금액    
				// 25.02.21) 계좌금액, 건수는 별도 api 호출
				//this.asetFnAcAmSum       = this.respInfo.asetFnAcAmSum       // 금융자산계좌금액    
				//this.asetFnAcTtcn        = this.respInfo.asetFnAcTtcn        // 금융자산계좌건수    
				this.asetFnIvAmSum       = this.respInfo.asetFnIvAmSum       // 금융자산투자금액    
				this.asetFnIvTtcn        = this.respInfo.asetFnIvTtcn        // 금융자산투자건수    
				this.asetFnPnsAmSum      = this.respInfo.asetFnPnsAmSum      // 금융자산연금금액    
				this.asetFnPnsTtcn       = this.respInfo.asetFnPnsTtcn       // 금융자산연금건수    
				this.asetFnPayPntAmSum   = this.respInfo.asetFnPayPntAmSum   // 금융자산페이머니금액
				this.asetFnPayPntTtcn    = this.respInfo.asetFnPayPntTtcn    // 금융자산페이머니건수
				
				// 실물자산
				this.asetRlthAmSum       = this.respInfo.asetRlthAmSum       // 실물자산금액합계    
				this.bfAsetRlthAmSum     = this.respInfo.bfAsetRlthAmSum     // 이전실물자산금액합계
				this.indAsetRlthAmSum    = this.respInfo.indAsetRlthAmSum    // 증감실물자산금액합계
				this.asetRlthRlestAm     = this.respInfo.asetRlthRlestAm     // 실물자산부동산금액  
				this.asetRlthRlestCn     = this.respInfo.asetRlthRlestCn     // 실물자산부동산건수  
				this.asetRlthCarAm       = this.respInfo.asetRlthCarAm       // 실물자산자동차금액  
				this.asetRlthCarCn       = this.respInfo.asetRlthCarCn       // 실물자산자동자건수  
				
				// 기타자산
				this.asetEtcAmSum        = this.respInfo.asetEtcAmSum        // 기타자산금액합계    
				this.asetEtcTtcn         = this.respInfo.asetEtcTtcn         // 기타자산건수        
				this.bfAsetEtcAmSum      = this.respInfo.bfAsetEtcAmSum      // 이전기타자산금액합계
				this.indAsetEtcAmSum     = this.respInfo.indAsetEtcAmSum     // 증감기타자산금액합계
				this.asetEtcCshAmSum     = this.respInfo.asetEtcCshAmSum     // 기타자산현금합계    
				this.asetEtcCshCn        = this.respInfo.asetEtcCshCn        // 기타자산현금건수    
				this.asetEtcKrwCshAm     = this.respInfo.asetEtcKrwCshAm     // 기타자산한화현금금액
				this.asetEtcKrwCshCn     = this.respInfo.asetEtcKrwCshCn     // 기타자산한화현금건수
				this.asetEtcFcCshAm      = this.respInfo.asetEtcFcCshAm      // 기타자산외화현금금액
				this.asetEtcFcCshCn      = this.respInfo.asetEtcFcCshCn      // 기타자산외화현금건수
				this.asetEtcGoldAm       = this.respInfo.asetEtcGoldAm       // 기타자산골드금액    
				this.asetEtcGoldCn       = this.respInfo.asetEtcGoldCn       // 기타자산골드건수    
				this.asetEtcEtcAm        = this.respInfo.asetEtcEtcAm        // 기타자산기타금액    
				this.asetEtcEtcCn        = this.respInfo.asetEtcEtcCn        // 기타자산기타금액  
				
				// 부채  
				this.dbtTotAm            = this.respInfo.dbtTotAm            // 총부채금액          
				this.bfDbtTotAm          = this.respInfo.bfDbtTotAm          // 이전총부채금액      
				this.indDbtTotAm         = this.respInfo.indDbtTotAm         // 증감총부채금액      
				this.dbtLonAmSum         = this.respInfo.dbtLonAmSum         // 부채대출금액합계    
				this.dbtLonTtcn          = this.respInfo.dbtLonTtcn          // 부채대출건수        
				this.dbtCdAmSum          = this.respInfo.dbtCdAmSum          // 부채카드금액합계    
				this.dbtCdTcn            = this.respInfo.dbtCdTcn            // 부채카드총건수      
				this.dbtIstAm            = this.respInfo.dbtIstAm            // 부채할부금융금액    
				this.dbtIstCn            = this.respInfo.dbtIstCn            // 부채할부금융건수    
				this.dbtCarIstAm         = this.respInfo.dbtCarIstAm         // 부채자동차할부금액  
				this.dbtCarIstCn         = this.respInfo.dbtCarIstCn         // 부채자동차할부건수  
				this.dbtLeasAm           = this.respInfo.dbtLeasAm           // 부채금융리스금액    
				this.dbtLeasCn           = this.respInfo.dbtLeasCn           // 부채금융리스건수    
				this.dbtCshAm            = this.respInfo.dbtCshAm            // 부채현금금액        
				this.dbtCshCn            = this.respInfo.dbtCshCn            // 부채현금건수 
				
				// 보험납입보험료       
				this.isrPymIsrfeTt       = this.respInfo.isrPymIsrfeTt       // 보험납입보험료합계  
				this.isrTtcn             = this.respInfo.isrTtcn             // 보험합계건수        
				this.isrMnTotPymIsrfe    = this.respInfo.isrMnTotPymIsrfe    // 인보험납입총보험료  
				this.isrMnInsuCn         = this.respInfo.isrMnInsuCn         // 인보험납입건수      
				this.isrTngTotPymIsrfe   = this.respInfo.isrTngTotPymIsrfe   // 물보험납입총보험료  
				this.isrTngInsuCn        = this.respInfo.isrTngInsuCn        // 물보험납입건수 	

				this.asetRlthTtcn        = this.asetRlthRlestCn + this.asetRlthCarCn   // 실물자산건수 = 실물자산부동산건수 + 실물자산자동차건수
				// 부채총건수 
				this.dbtTtcn             = this.dbtLonTtcn + this.dbtCdTcn + this.dbtIstCn + this.dbtCarIstCn + this.dbtLeasCn + this.dbtCshCn

				// 2025.02.11) 서비스 내 전월 대비 순자산 증감 계산로직 없으므로 화면 내 계산
				this.indNtAsetTotAm = 0	// 증감순자산총금액
				/** 이전순자산금액 = 이전금융자산금액 + 이전실물자산금액 + 이전기타자산금액 - 이전총부채금액 */
				this.bfNtAsetTotAm = this.bfAsetFnAmSum + this.bfAsetRlthAmSum + this.bfAsetEtcAmSum - this.bfDbtTotAm
				this.indNtAsetTotAm = Math.abs(this.ntAsetTotAm - this.bfNtAsetTotAm)

				this.asetIndAm =  Math.abs(this.indNtAsetTotAm)  // 증감순자산총금액

				//25.02.21) 예금(마이너스 계좌), 투자건수 갱신, 학자금 대출 추가 조회
				this.getMyAssetAdsv()

				this.$nextTick(() => {
					this.fn_setAsetCn()
				})
			})
		},
		/**
		 * 계좌 목록조회 (NH콕마이데이터4.0 추가정보 조회)
		 */
		getMyAssetAdsv() {
			const config = {
				url: '/as/as/00ra3',
				data: {
					"mydtCusno" : this.getUserInfo('mydtCusno')
					// mydtCusno: '2000003756'
				}
			}
			apiService.call(config).then(response =>{
				//예금
				this.asetFnAcTtcn 	= response.totAccn || 0		// 예금 총 건수
				this.asetFnAcAmSum	= response.acBalttAm || 0	// 예금 총 금액
				//투자
				// this.asetFnIvTtcn 	= response.ivtotAccn || 0	// 투자 총 건수
				// this.asetFnIvAmSum	= response.ivAcTotBac || 0	// 투자 총 금액
				// 학자금대출
				this.stdntLonTtcn 	= response.loanCnt || 0		// 학자금대출 총 건수
				this.stdntLonAmSum 	= response.loanAmnt || 0	// 학자금대출 총 금액

				// 학자금 제외 대출 정보 업데이트
				this.dbtLonTtcn 	= this.dbtLonTtcn - this.stdntLonTtcn	// 대출 총 카운트 - 학자금대출 카운트
				this.dbtLonAmSum 	= this.dbtLonAmSum - this.stdntLonAmSum	// 대출 총 금액 - 학자금대출 금액
			})
		},
		/**
		 * 마이너스 계좌 포함 조회 api (미사용)
		 */
		async getAcAset() {
			const config = {
				url: '/as/ac/01r03',
				data: {
					mydtCusno: this.getUserInfo('mydtCusno')
				}
			}
			await apiService.syncCall(config).then(response => {
				this.asetFnAcAmSum = response.acBalttAm		// 계좌총액 업데이트
				this.asetFnAcTtcn = response.totAccn		// 계좌건수 업데이트 (마이너스 계좌 건수 포함)

				//this.getStdntLn()
			})
		},

		/**
		 * 항목별 건수 설정
		 */
		fn_setAsetCn() {
			// asetTotCn		전체자산 총 건수
			// asetFnTotCn		금융자산 총 건수 (예금 + 투자 + 연금 + 페이/포인트)
			// asetRlTotCn		실물자산 총 건수 (부동산 + 자동차)
			// asetEtcTotCn 	기타자산 총 건수 (현금 + 외화 + 금 + 농기계)
			// asetDbtTotCn 	부채 총 건수 (카드 + 대출 + 학자금대출 + 할부금융 + 자동차할부 + 리스 + 빌린돈)
			// asetIsrTotCn 	보험 총 건수 (인보험 + 물보험)
			
			this.asetFnTotCn = this.asetFnAcTtcn + this.asetFnIvTtcn + this.asetFnPnsTtcn + this.asetFnPayPntTtcn
			this.asetRlTotCn = this.asetRlthRlestCn + this.asetRlthCarCn
			this.asetEtcTotCn = this.asetEtcTtcn
			this.asetDbtTotCn = this.dbtCdTcn + this.dbtLonTtcn + this.stdntLonTtcn + this.dbtIstCn + this.dbtCarIstCn + this.dbtLeasCn + this.dbtCshCn
			this.asetIsrTotCn = this.isrTtcn

			this.asetTotCn = this.asetFnTotCn + this.asetRlTotCn + this.asetEtcTotCn + this.asetDbtTotCn + this.asetIsrTotCn
		},

		/**
		 * 화면이동
		 */
		fn_movePage(menu) {
			const config = {
				name: menu
			}
			
			if (menu === 'ASRE4001') {
				config.params = {
					rlestTtAm : this.asetRlthRlestAm
				}
			}	
			//console.log('## config ##', config)			
			commonService.movePage(config)
		},

		/**
		 * 자산연결 팝업오픈
		 */
		fn_openConAset() {
			const config = {
				component: COAR4001
			}
			modalService.openPopup(config).then(() => {
				this.initComponent()
			})
		},

		/**
		 * 마이데이터4.0 신규
		 * 자산 상세팝업 호출
		 */
		fn_openDtlPop(menu) {
			let id = ''
			switch (menu) {
				///// 자산 S /////
				case 'fnAc' : 	// 예금
					id = ASTA4S02 
					break
				case 'fnIv' :	// 투자
					id = ASTA4S03
					break
				case 'fnPns' :	// 연금
					id = ASTA4S04
					break
				case 'fnPay' :	// 페이/포인트
					id = ASTA4S05
					break
				case 'asetRlest' : // 부동산
					id = ASTA4S06
					break
				case 'car' : // 자동차
					id = ASTA4S07
					break
				case 'etc' : // 기타자산
					id = ASTA4S08
					break
				///// 자산 E /////

				///// 부채 S /////
				case 'card' : // 카드
					id = ASTA4S09
					break
				case 'loan' : // 대출
					id = ASTA4S10
					break
				case 'edfln' : // 학자금대출
					id = ASTA4S17
					break
				case 'istFn' : // 할부금융
					id = ASTA4S11
					break
				case 'carIst' : // 자동차할부
					id = ASTA4S12
					break
				case 'lease' : // 리스
					id = ASTA4S13
					break
				case 'brrCsh' : // 빌린돈
					id = ASTA4S14
					break
				///// 부채 E /////

				///// 보험 S /////
				case 'humIsr' : // 인보험
					id = ASTA4S15
					break
				case 'tngIsr' : // 물보험
					id = ASTA4S16
					break
				default : return
			}

			const config = {
				component: id
			}

			modalService.openPopup(config).then(() => {
				this.getData()
			})
		},

		/*
		* 자산등록 팝업호출
		*/
		fn_openAssetPage() {                
			const config = {
				component: COAR2001,
			}
			modalService.openPopup(config).then(() => {
				this.getData();
			})
		},

		// 신규 자산 연결
		fn_openNewConnect(orgDsc) {
			// modalService.alert(orgDsc + " 자산 연결 준비중입니다.")
			const config = {
				component : COAR2002,
				params : {
					isMramNew : true,
					orgDsc : orgDsc
				}
			}
			modalService.openPopup(config).then(() => {
				
			})
		},
		/*
		* 자산 수집 호출 (기관코드 0000000000은 ==> 전체 수집 의미)
		*/
		fn_refreshApiCall() {
			this.getAllMyAssetInfo()
		},
		// 자산수집 mutation 이벤트 감지 
		listenSubscribe() {
			this.getGatheringListenSubscribe()
			// this.subscribe = this.$store.subscribe((mutation, state) => {
			//     const isMyAssetGathering = mutation.type === 'myassets/completeMyAssetGatherData'
			//     // 예금 전체조회
			//     if (isMyAssetGathering) {
			//         console.log('자산수집 subscribe  ###############################', mutation, state)
			//         this.getData()
			//     }
			// })
		},
		emptyImg(e) {
			e.target.src = new URL("@/assets_v40/images/event/ev_noimg.png", import.meta.url).href
		},
		/**
		 * 자산 영역 노출순서 정보 설정
		 */
		fn_setCompSortInfo() {
			console.log('>>> order >>> ', this.getAsetMain())
			this.asetTabs = this.getAsetMain()
			if(this.asetTabs.length == 0) {
				// 최초 접속하는경우 기본 값 처리 (로컬스토리지 저장 없음)
				this.asetTabs = [ {id:'finance', name:"금융자산", hidden:'N'}, {id:'real', name:"실물자산", hidden:'N'}, {id:'etc', name:"기타자산", hidden:'N'},
								  {id:'debt', name:"부채", hidden:'N'}, {id:'insure', name:"보험료 월 납입료", hidden:'N'} ]
			}
		},
	},
	components : {
		Page,
		FootersV2,
		LottieAnimation
	}
}
</script>