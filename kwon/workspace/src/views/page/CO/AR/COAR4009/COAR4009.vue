<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 상세정보 전송요구 및 개인(신용)정보 수집ㆍ이용 동의(상세)
* @ 페이지설명 : 상세정보 전송요구 및 개인(신용)정보 수집ㆍ이용 동의(상세)
* @ 파일명     : src/views/page/CO/AR/COAR4009/COAR4009.vue
* @ 작성자     : CS540685
* @ 작성일     : 2025-02-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-05              CS540685              상호금융 NH콕마이데이터 4.0 추진 개발
*************************************************************************/
-->
<template>
	<!-- 전체 팝업 시작 -->
	<div class="full_popup " id="full_popup_01">
		<div class="popup_header">
			<h1>{{txRqInfo.termsTitle}}</h1>
		</div>		
		<div class="popup_content">
			<div class="terms_wrap">
				<div class="tit_area">
					<h2 class="headline"><strong>자산을 확인하기 위해<br>동의가 필요해요</strong></h2>
				</div>
				<div class="terms_view">
					<div>
						<div v-if="selectedBzrgTerms.length > 0" class="terms_cont">
							<div class="terms_group">
								<strong class="terms_tit">전송요구 및 개인(신용)정보<br> 수집&middot;이용 동의</strong>
								<p class="terms_txt">농업협동조합중앙회는 신용정보의 이용 및 보호에 관한 법률, 개인정보 보호법 등 관련 법령에 따라 다음과 같이 고객님의 개인(신용)정보를 처리합니다.</p>
								<dl>
									<dt>정보를 보내는 곳</dt>
									<dd>{{sendOrgName}}</dd>

									<dt>정보를 받는 곳</dt>
									<dd>농업협동조합중앙회</dd>

									<dt>목적</dt>
									<dd>전송요구를 통한 본인신용정보 통합조회, 데이터분석 서비스의 이용</dd>

									<dt>보유&middot;이용 기간</dt>
									<dd>
										<strong class="terms_txt_point">서비스 이용 종료 삭제 요청시까지,<br>									
											마지막 로그인 일로부터 1년이 경과한 때까지
										</strong>
									</dd>

									<dt>거부할 권리와 불이익</dt>
									<dd>개인신용정보 수집, 이용에 동의하지 않을 수 있습니다. 하지만 필수항목 수집, 이용에 동의하지 않으면 본인신용정보 통합조회, 데이터분석 서비스의 이용이 제한될 수 있습니다.</dd>
									
									<dt>전송을 요구하는 개인신용 정보</dt>
									<dd>
										<ul class="dotted_list">
											<li v-for="(item, idx) in selectedBzrgTerms" :key="idx">{{bzrgTerm[item].bzrgName}} : {{bzrgTerm[item].trxTerm}}</li>
										</ul>
									</dd>
								</dl>
							</div>

							<!-- <div class="terms_group">
								<strong class="terms_tit">수집&middot;이용 정보</strong>
								<dl>
									<dt>개인식별정보</dt>
									<dd>전자서명, 접근토큰, 인증서, 전송요구서</dd>

									<dt>신용거래정보</dt>
									<dd>
										<template v-for="(item, idx) in selectedBzrgTerms">
											<details v-if="bzrgTerm[item].creditTerm.length > 0" :key="idx" class="terms_detail">
												<summary>
													<strong>{{bzrgTerm[item].bzrgName}}</strong>
													<p>{{bzrgTerm[item].creditTerm[0].subTitle}}</p>
												</summary>
												<div class="cont">
													<p>{{bzrgTerm[item].creditTerm[0].content}}</p>
													<dl>
														<template v-for="(termItem, idx) in bzrgTerm[item].creditTerm.slice(1)">
															<dt :key="'dt' + idx">{{termItem.subTitle}}</dt>
															<dd :key="'dd' + idx">{{termItem.content}}</dd>
														</template>
													</dl>
												</div>
											</details>
										</template>
									</dd>
								</dl>
							</div> -->
						</div>

						<div class="terms_cont">
							<div class="terms_group">
								<strong class="terms_tit">개인신용정보 제공 동의서</strong>
								<p class="terms_txt">귀하는 개인(신용)정보 제공에 관한 동의를 거부하실 수 있습니다. 
									다만, 개인(신용)정보의 제공에 관한 동의는 본인신용정보 통합조회, 데이터분석 서비스, 
									마이데이터 서비스 가입 현황 안내 및 전송요구내역 통합조회 서비스 이용과 직접적으로 
									관련된 필수적 사항이므로 아래의 사항에 동의 하셔야만 본인신용정보 통합조회, 
									데이터분석, 서비스, 마이데이터 서비스 가입 현황 안내 및 전송요구내역 통합조회 서비스의 제공이 가능합니다.
								</p>
								<dl>
									<dt>정보를 받는 곳</dt>
									<dd>{{sendOrgName}}</dd>

									<dt>목적</dt>
									<dd><strong class="terms_txt_point">본인 확인 및 개인신용정보의 전송</strong></dd>

									<dt>보유&middot;이용 기간</dt>
									<dd><strong class="terms_txt_point">본인 확인 및 개인신용정보의 전송 목적 달성시까지</strong></dd>

									<dt>제공항목</dt>
									<dd><strong class="terms_txt_point">전자서명, CI, 인증서, 전송요구서</strong></dd>
								</dl>

								<dl>
									<dt>정보를 받는 곳</dt>
									<dd>한국신용정보원</dd>

									<dt>목적</dt>
									<dd><strong class="terms_txt_point">마이데이터서비스 가입현황 안내, 전송 요구내역 통합조회 서비스 제공</strong></dd>

									<dt>보유&middot;이용 기간</dt>
									<dd><strong class="terms_txt_point">한국신용정보원의 마이데이터서비스 가입현황 안내 및 전송 요구내역 통합조회 서비스 목적 달성시 까지</strong></dd>

									<dt>제공항목</dt>
									<dd><strong class="terms_txt_point">회원가입여부, 서비스 목록수, 서비스목록, 클라이언트ID, 전송요구내역수, 전송요구내역목록, 정보제공자 기관코드, 권한 범위, 전송요구일자, 전송요구종료시점</strong></dd>
								</dl>
							</div>

							<div class="terms_group">
								<strong class="terms_tit">수집&middot;이용 정보</strong>
								<dl>
									<dt>개인식별정보</dt>
									<dd>전자서명, 접근토큰, 인증서, 전송요구서</dd>

									<dt>신용거래정보</dt>
									<dd>
										<template v-for="(item, idx) in selectedBzrgTerms">
											<details v-if="bzrgTerm[item].creditTerm.length > 0" :key="idx" class="terms_detail">
												<summary>
													<strong>{{bzrgTerm[item].bzrgName}}</strong>
													<p>{{bzrgTerm[item].creditTerm[0].subTitle}}</p>
												</summary>
												<div class="cont">
													<p>{{bzrgTerm[item].creditTerm[0].content}}</p>
													<dl>
														<template v-for="(termItem, idx) in bzrgTerm[item].creditTerm.slice(1)">
															<dt :key="'dt' + idx">{{termItem.subTitle}}</dt>
															<dd :key="'dd' + idx">{{termItem.content}}</dd>
														</template>
													</dl>
												</div>
											</details>
										</template>
									</dd>

									<dt>정기적 전송여부</dt>
									<dd>
										<div class="radio_box_group">
											<div v-for="(item, idx) in scheduledItems" :key="idx" class="radio">
												<input type="radio" v-model="selectedScheduled" :value="item.value" name="transfer_agree" :id="'transfer_agree_' + idx" @change="fn_setTxPrd()">
												<label :for="'transfer_agree_' + idx">{{item.name}}</label>
											</div>
										</div>
									</dd>
									<dd>
										<div v-show="selectedScheduled && !isOnlyPublic" class="radio_box_group">
											<div v-for="(item, idx) in txPrdItems" :key="idx" class="radio">
												<input type="radio" v-model="selectedTxPrd" :value="item.value" name="period_agree" :id="'period_agree_' + idx">
												<label :for="'period_agree_' + idx">{{item.name}}</label>
											</div>
										</div>
										<ul class="dotted_list sm">
											<li>금융정보는 1주 단위로 선택 할 수 있습니다.</li>
											<li v-if="publicOrgName != ''">공공정보는 1개월 주기로 가져옵니다.</li>
											<li>정기적 전송에 "예" 선택 하시면, NH콕마이데이터에 들어오지 않아도 선택한 주기에 따라 자동으로 자산 업데이트 됩니다.</li>
											<li>6개월 동안 미 접속 시 자동 업데이트는 중단되며 1년간 미 접속 시 개인신용정보는 모두 삭제되고 서비스는 해지 됩니다.</li><!-- [v4.0]25-04-28 문구수정 -->
										</ul>
									</dd>

									<dt>전송요구 유효기간</dt>
									<dd>
										<div class="radio_box_group">
											<div v-for="(item, idx) in exprPrdDateItems" :key="idx" class="radio">
												<input type="radio" v-model="selectedExprPrd" :value="item.value" name="effect_agree" :id="'effect_agree_' + idx">
												<label :for="'effect_agree_' + idx">{{item.name}}</label>
											</div>
										</div>
										<ul class="dotted_list sm" v-if="publicOrgName != ''">
											<li>공공정보는 1년까지만 가져옵니다.</li>
										</ul>
									</dd>
									<template v-if="isShowRegion">
										<dt>재산세 납세 기관</dt>
										<dd>
											<div class="flex_box">
												<div>
													<button type="button" class="btn_select" title="시/도 선택" @click="fn_openCityPopup()"><span class="blind">현재선택</span>{{selectedCityName}}</button>
												</div>
												<div>
													<button type="button" class="btn_select" title="구/군 선택" @click="fn_openRegionPopup()"><span class="blind">현재선택</span>{{selectedRegionName}}</button>
												</div>
											</div>
										</dd>
									</template>
								</dl>
							</div>
						</div>

						<div class="terms_check">
							<strong v-if="isShowTermAccount" class="terms_check_tit">선택정보의 전송동의</strong>
							<ul class="checkbox_list">
								<li v-if="isShowTermAccount">
									<div class="checkbox">
										<input type="checkbox" name="terms_agree" id="terms_agree3" v-model="isAgreeAccountInfo">
										<label for="terms_agree3">
											<strong class="tit">[선택]계좌 출처&middot;메모 표시</strong>
											<span class="txt">송금인/수취인명 정보 등 본인의 사생활 및 경제활동 등에 관련된 상세한 정보가 포함되어 있습니다.</span>
										</label>
									</div>
								</li>
								<li v-if="isShowTermFranchise">
									<div class="checkbox">
										<input type="checkbox" name="terms_agree" id="terms_agree4" v-model="isAgreeFranchiseInfo">
										<label for="terms_agree4">
											<strong class="tit">[선택]가맹점명/사업자등록번호 표시</strong>
											<span class="txt">실제 구매한 상품이 아닌 해당 상품의 13가지 항목의 카테고리가 포함되어 있습니다.</span>
										</label>
									</div>
								</li>
								<li v-if="isShowTermCategory">
									<div class="checkbox">
										<input type="checkbox" name="terms_agree" id="terms_agree5" v-model="isAgreeCategoryInfo">
										<label for="terms_agree5">
											<strong class="tit">[선택]구매한 상품 카테고리 표시</strong>
											<span class="txt">본인의 소비생활 등에 관련된 상세한 정보가 포함되어 있습니다.</span>
										</label>
									</div>
								</li>
							</ul>
							<ul class="checkbox_list">
								<li>
									<div class="checkbox">
										<input type="checkbox" name="terms_agree" id="terms_agree1" v-model="isAgreeCollect">
										<label for="terms_agree1">[필수]개인(신용)정보 수집&middot;이용 동의</label>
									</div>
									<div class="error_message" aria-live="polite" >
										<em class="blind">[필수]개인(신용)정보 수집&middot;이용 동의</em>
										<p>체크해 주세요</p>
									</div>
								</li>
								<li>
									<div class="checkbox">
										<input type="checkbox" name="terms_agree" id="terms_agree2" v-model="isAgreeSupply">
										<label for="terms_agree2">[필수]개인(신용)정보 제공 동의</label>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>

			</div>
		</div>
		<div class="popup_footer fixed">
			<div class="btns_wrap btn_agree_wrap">
				<button type="button" class="btn btns lg primary btn_agree_move">
					<span class="btn_down_arrow">아래로 내려 보기</span>
				</button>
				<button type="button" class="btn btns lg primary btn_agree_stop" @click="fn_nextProcess()">동의하고 계속하기</button>
			</div>
		</div>
		<a href="javascript:void(0)" class="btn_close" @click="fn_close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import {dateFormat, monthAdd} from '@/utils/date'

import moment from 'moment'
import {mapGetters} from 'vuex'

import COAR2015 from '@/views/page/CO/AR/COAR2015/COAR2015.vue'
import COAR2016 from '@/views/page/CO/AR/COAR2016/COAR2016.vue'
import COAR4013 from '@/views/page/CO/AR/COAR4013/COAR4013.vue'

import _ from 'lodash'

export default {
    name: "COAR4009",
    data: () => {
        return {
			txRqInfo: {
				termsTitle: "자산연결",
				selectedOrgList: [], // 전송요구 기관 목록
			},

			scheduledItems: [
				{ value: false, name: "아니오" }
				, { value: true, name: "예" }
			],

			txPrdItems: [
				{ value: "1/1w", name: "1주"}
				, { value: "1/2w", name: "2주"}
				, { value: "1/3w", name: "3주"}
				, { value: "1/4w", name: "4주"}
			],
			
			exprPrdDateItems: [
				{ value: monthAdd(6, dateFormat(new Date(), "YYYY-MM-DD"), "YYYY-MM-DD"), name: "6개월" }
				, { value: dateFormat(moment().add("365", "days"), "YYYY-MM-DD"), name: "1년" }
				, { value: dateFormat(moment().add((365 * 5).toString(), "days"), "YYYY-MM-DD"), name: "5년" }
			],

			sendOrgName: "",
			publicOrgName: "",

			bzrgTerm: {},
			selectedBzrgTerms: [],

			isShowRegion: false,
			isShowTermAccount: false,
			isShowTermFranchise: false,
			isShowTermCategory: false,
			isOnlyPublic: false,

			selectedScheduled: false,
			selectedTxPrd: "",
			selectedExprPrd: "",

			selectedCity: "",
			selectedCityName: "시/도 선택",
			selectedRegion: "",
			selectedRegionName: "구/군 선택",

			isAgreeAccountInfo: false,
			isAgreeFranchiseInfo: false,
			isAgreeCategoryInfo: false,

			isAgreeCollect: false,
			isAgreeSupply: false,

			termsInfo: {
				isTermsAgree: false,
				rcv_org_code: "ZVAAAZ0000",
				is_scheduled: false,
				fnd_cycle: "",
				add_cycle: "",
				end_date: "",
				purpose: "전송요구를 통한 본인신용정보 통합조회 서비스의 이용",
				period: "99991231",
				is_consent_trans_memo: false,
				is_consent_merchant_name_regno: false,
				is_consent_trans_category: false,
				selectedRegion: "",
			},
			
        }
	},

	beforeMount() {
		
	},

    mounted() {
		this.initComponent(this.params);
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name);

		let lastScroll = 0; //초기 스크롤 위치
		let scrolling;
		let scrollEnding = false;

		$(document).ready(function() {
			let $termsCon = $('.terms_view');
			let $fullPop = $termsCon.closest('.full_popup');
			let $popCont = $('.popup_content',$fullPop);
			
			$popCont.off('scroll.full_popup_scroll').on('scroll.full_popup_scroll', function(){
				let nowScroll = $popCont.scrollTop();

				/*scroll ending check */
				if($termsCon){
					if((nowScroll + $popCont.height()) >= $termsCon.height()){
						scrollEnding = true;
						if (document.getElementsByClassName('.btn_agree_move') ) {
							$fullPop.find('.btn_agree_wrap').addClass('act');

							//check toast
							$fullPop.find('.error_message').addClass('on');
							setTimeout(function(){
								$fullPop.find('.error_message').removeClass('on').addClass('off');
							},2000)
						}
					}else{
						scrollEnding = false;
					}	
				}
			})
		});

		//약관 스크롤 애니 - click
		$(document).off('click.btn_agree_move_ani').on('click.btn_agree_move_ani', '.btn_agree_move', function() {

			let $btnTerms = $('.btn_agree_move');
			let $fullPop = $btnTerms.closest('.full_popup');
			let $popCont = $('.popup_content',$fullPop);
			let $termsCont = $('.terms_view',$fullPop);
			let nowScroll = $popCont.scrollTop();
			var posScroll = 0;

			$btnTerms.each(function(){
				if((nowScroll + $popCont.height()) >= $termsCont.height()){
					scrollEnding = true;
					$btnTerms.parent('.btn_agree_wrap').addClass('act');

					//check toast
					$fullPop.find('.error_message').addClass('on');
					setTimeout(function(){
						$fullPop.find('.error_message').removeClass('on').addClass('off');
					},2000)
				}else{
					scrollEnding = false;
					if($btnTerms.hasClass('go_last')){
						$popCont.animate({
							scrollTop: $popCont[0].scrollHeight //맨아래로 바로
						}, 400);
					}else{
						$popCont.animate({
							scrollTop: nowScroll + $popCont.height() // 조금조금 이동
						}, 400);
					}
				}	
			})
		});
    },

    mixins: [
		commonMixin,
        popupMixin
	],

	computed: {

	},

	watch: {
		isAgreeCollect(value) {
			this.termsInfo.isTermsAgree = this.isAgreeCollect && this.isAgreeSupply;
		},

		isAgreeSupply(value) {
			this.termsInfo.isTermsAgree = this.isAgreeCollect && this.isAgreeSupply;
		},

		selectedScheduled(value) {
			this.termsInfo.is_scheduled = value;
			if (!value) {
				this.selectedTxPrd = "";
			}
		},

		selectedTxPrd(value) {
			this.termsInfo.fnd_cycle = value;
			this.termsInfo.add_cycle = value;
		},

		selectedExprPrd(value) {
			this.termsInfo.end_date = dateFormat(value, "YYYYMMDD");
		},

		isAgreeAccountInfo(value) {
			this.termsInfo.is_consent_trans_memo = value;
		},

		isAgreeFranchiseInfo(value) {
			this.termsInfo.is_consent_merchant_name_regno = value;
		},

		isAgreeCategoryInfo(value) {
			this.termsInfo.is_consent_trans_category = value;
		},
	},

    methods: {
        initComponent(params = {}) {
			this.txRqInfo = {...this.txRqInfo, ...params.txRqInfo};

            this.getData();
        },

        getData() {
			this.bzrgTerm = this.fn_getBzrgTerm();
			this.selectedBzrgTerms = [...new Set(this.txRqInfo.selectedOrgList.map(t => t.orgBzrgC))];
			this.sendOrgName = this.txRqInfo.selectedOrgList.map(t => t.orgnm).join(", ");
			this.publicOrgName = this.txRqInfo.selectedOrgList.filter(t => t.orgBzrgC == "public")
													   .map(t => t.orgnm).join(", ");
			if (this.publicOrgName != '') {
				this.bzrgTerm.public.trxTerm = this.txRqInfo.selectedOrgList.filter(t => t.orgBzrgC == "public")
																			.map(t => t.assets.map(k => k.prod_name).join(", "))
																			.join(", ");
			}

			this.isShowRegion = Boolean(this.txRqInfo.selectedOrgList.filter(t => t.orgBzrgC == "public")
																	.find(t => t.assets.find(k => k.key == "L161")));
			this.isShowTermAccount = Boolean(this.selectedBzrgTerms.find(t => t == 'bank' || t == 'efin' || t == 'invest'));
			this.isShowTermFranchise = Boolean(this.selectedBzrgTerms.find(t => t == 'card' || t == 'efin' || t == 'telecom'));
			this.isShowTermCategory = Boolean(this.selectedBzrgTerms.find(t => t == 'efin'));
			if (this.txRqInfo.selectedOrgList.filter(t => t.orgBzrgC != "public").length == 0) {
				this.isOnlyPublic = true;
				this.selectedExprPrd = dateFormat(moment().add("365", "days"), "YYYY-MM-DD");
				this.exprPrdDateItems = this.exprPrdDateItems.filter(t => t.value == dateFormat(moment().add("365", "days"), "YYYY-MM-DD"));
			} else {
				this.selectedExprPrd = dateFormat(moment().add((365 * 5).toString(), "days"), "YYYY-MM-DD");
			}

			this.selectedScheduled = true;
			this.selectedTxPrd = "1/1w";

			this.$nextTick(() => {
				// 웹접근성관련 호출
				this.callJQueryWebAccessibility();
			});
		},

		fn_getBzrgTerm() {
			return {
				bank: {
					bzrgName: "은행",
					trxTerm: "계좌(수신/펀드/신탁/ISA/대출) 목록,퇴직연금(개인형IRP) 목록, 퇴직연금(DC형) 목록, 선불카드 목록, 수신계좌 정보, 펀드상품 정보, 대출상품 정보, 신탁/ISA상품 정보, 개인형  IRP 정보, DB형 퇴직연금 정보, 선불카드 정보, 휴면예금 정보",
					creditTerm: [{subTitle: "수신계좌 정보",
								content: "기본정보(통화코드, 저축방법, 계좌개설일자, 만기일, 약정액, 월 납입액), 추가정보(통화코드, 현재잔액, 출금 가능액, 계약금리, 최종납입회차), 거래내역(거래일시, 거래번호, 거래유형, 거래구분, 통화코드, 거래금액, 거래 후 잔액, 납입회차) 계좌지정 자동이체 등록정보(자동이체기관(코드), 자동이체계좌번호, 자동이체금액, 자동이체주기, 자동이체주기 상세, 적요)"}
								, {subTitle: "펀드상품 정보",
								content: "기본정보(표준펀드코드, 납입유형, 개설일, 만기일), 추가정보(통화코드, 잔액, 평가금액, 투자원금, 보유좌수), 거래내역(거래일시, 거래번호, 거래유형, 통화코드, 기준가, 거래좌수, 거래금액, 거래 후 잔고평가금액)"}
								, {subTitle: "대출상품 정보",
								content: "기본정보(대출일, 만기일, 최종적용금리, 월상환일, 상환방식, 자동이체 기관, 상환계좌번호(자동이체), 거치기간), 잔액정보(통화코드, 대출잔액, 대출원금, 다음 이자 상환일), 거래내역(거래일시, 거래번호, 거래유형, 통화코드, 거래금액, 거래 후 대출잔액, 거래금액 중 원금, 거래금액 중 이자, 환출이자, 이자적용수, 이자적용시작일, 이자적용종료일, 적용이율, 이자금액, 이자종류"}
								, {subTitle: "DB형 퇴직연금 정보",
								content: "기본정보(보유여부)"}
								, {subTitle: "DC형 퇴직연금 정보",
								content: "기본정보(계좌잔액, 계좌평가금액, 개설일), 거래내역(거래일시, 거래번호, 거래구분, 거래금액), 개별운용상품 정보(개별운용상품명, 상품가입번호, 상품유형, 평가금액, 납입(투자)원금, 보유좌수, 신규일, 만기일, 약정이자율)"}
								, {subTitle: "개인형IRP 정보",
								content: "기본정보(계좌잔액, 계좌평가금액, 사용자부담금, 가입자부담금, 개설일, 최초입금일, 최초 제도 가입일, 연금개시 시작(예정)일, 거래내역(거래일시, 거래번호, 거래구분, 거래금액), 개별운용상품 정보(개별운용상품명, 상품가입번호, 상품유형, 평가금액, 납입(투자)원금, 보유좌수, 신규일, 만기일, 약정이자율"}
								, {subTitle: "선불카드 정보",
								content: "잔액정보(총잔액, 충전포인트 잔액, 적립포인트 잔액, 적립예정, 소멸예정), 거래내역(거래유형, 거래일시, 거래번호, 거래금액, 거래 후 잔액, 거래상대기관, 거래상대 식별값), 결제내역(승인번호, 승인일시, 결제상태, 정정 또는 승인취소 일시, 가맹점명, 가맹점 사업자등록번호, 이용금액, 정정 후 금액, 전체할부회차)"}
								, {subTitle: "휴면예금 정보",
								content: "계좌번호, 전송요구여부, 회차번호, 상품명, 숨은금융자산구분코드 통화코드, 계좌잔액, 소멸시효완성일"}]
				},
				card: {
					bzrgName: "카드",
					trxTerm: "카드 목록 및 선불카드 목록, 카드 정보 및 선불카드 정보, 포인트 정보, 청구.결제 정보 및 리볼빙 정보,대출상품 정보",
					creditTerm: [{subTitle: "카드 정보",
								content: "카드 목록(카드번호, 카드식별자, 카드상품명, 본인/가족 구분(코드), 카드구분(코드)), 카드기본정보(교통 기능(여부), 현금카드기능(여부), 결제은행(코드), 결제계좌번호, 카드브랜드(코드), 상품 연회비, 발급일자)"}
								, {subTitle: "포인트 정보",
								content: "포인트정보(포인트명, 잔여 포인트, M+2월 소멸예정포인트)"}
								, {subTitle: "청구 결제 정보 및 리볼빙 정보",
								content: "월별 청구정보(결제순번, 월별 청구금액, 결제일, 청구년월, 결제년월일), 월별 청구 상세정보(사용일시 또는 사용일자, 카드식별자, 거래번호, 이용금액, 통화코드(이용금액), 가맹점명, (국내승인)가맹점 사업자등록번호, 신용판매 수수료, 전체 할부회차, 현재 할부회차, 할부 결제 후 잔액, 상품구분(코드)), 결제기본정보(일별 카드 이용정보)(리볼빙 약정여부, 결제순번, 결제예정일, 결제예정금액"
										+ ", 일시불, 할부, 단기대출(현금서비스), 리볼빙, 장기대출(카드론), 연회비 및 기타), 리볼빙 정보(일별 카드 이용정보)(리볼빙약정시작일, 리볼빙약정종료일, 리볼빙약정해지일자, 최소결제비율, 최소결제금액, 약정결제비율, 약정결제금액, 리볼빙 이월잔액), 승인 상세정보(건별 카드 이용정보)(승인번호, 결제상태, 사용구분(신용/체크), 승인일시, 정정 또는 승인취소 일시, 가맹점명, (국내승인)가맹점 "
										+ "사업자등록번호, 이용금액, 정정 후 금액, (국내승인)전체 할부회차, (해외승인)결제(승인)국가코드, (해외승인)결제(승인)시 통화코드, (해외승인)원화), 카드매입취소 정보(매입번호, 매입일자, 매출(취소)일자, 원승인번호, 원승인일시, 원승인금액, (해외매입)원승인금액 통화코드, (해외매입)원승인금액 원화, 사용구분(신용/체크), 가맹점명, (국내매입)가맹점 사업자번호, (해외매입)결제(매입)국가코드, (해외매입)결제(매입)통화코드, 이용금액, (국내매입)전체 할부 회차, (해외매입)원화"}
								, {subTitle: "대출상품 정보",
								content: "단기대출 이용정보(이용일시, 이용금액(취급앱), 단기대출잔액, 결제예정일, 이자율, 상환기관(코드), 상환계좌번호), 장기대출 이용정보(대출번호, 대출일시 또는 대출일자, 일자의 대출회차, 대출종류, 상품명, 이용금액, 이자율, 만기일, 장기대출 잔액, 상환방법(코드), 상환액 중 이자, 상환기관(코드), 상환 계쫘번호), 장기대출 거래내역 정보(거래일시 또는 거래일자, 거래번호, 거래유형, 통화코드, 거래금액, 거래 후 대출잔액, 거래금액 중 원금, 거래금액 중 이자"}]
				},
				invest: {
					bzrgName: "증권(금융투자)",
					trxTerm: "계좌목록, 퇴직연금(개인형IRP/DC형)목록, 계좌 정보, 개인형IRP정보, DB형 퇴직연금 정보, DC형 퇴직연금 정보",
					creditTerm: [{subTitle: "계좌 정보",
								content: "계좌목록(계좌번호, 계좌명, 계좌종류(코드), 계좌개설일, 세제혜택 적용여부(계좌), CMA상품포함여부, 주식거래가능여부, 은행예수금방식계좌여부), 잔액정보(기준일자, 통화코드, 예수금, 신용 융자, 대출금, 출금가능금액), 거래내역(종목명(상품명), 종목코드(상품코드), 거래일시 또는 거래일자, 거래번호, 거래종류(코드), 거래종류 상세, 거래수량, 수량단위명, 거래단가, 거래금액, 정산금액, 거래후잔액, 통화코드, 적요, 거래소코드)"}
								, {subTitle: "상품 정보",
								content: "개별상품 기본정보(기준일자, 상품종류(코드), 상품종류 상세, 종목코드(상품코드), 종목명, 거래소코드, 파생상품포지션구분(코드), 신용구분(코드), 세제혜택적용여부(상품), 매입금액, 보유수량, 수량단위명, 평가금액, 체결기준여부, 통화코드), 연금계좌 추가정보(연금가입일, 납부총액, 기출금액, 최종납입일, 연금기수령액, 연금개시(예정)일, 금년납입금, 통화코드), 계좌지정 자동이체 등록정보(자동이체기관(코드), 자동이체계좌번호, 자동이체금액, 자동이체주기, 자동이체주기 상세, 적요)"}
								, {subTitle: "DB형 퇴직연금 정보",
								content: "기본정보(보유여부)"}
								, {subTitle: "DC형 퇴직연금 정보",
								content: "기본정보(계좌잔액, 계좌평가금액, 개설일), 거래내역(거래일시, 거래번호, 거래구분, 거래금액), 개별운용상품 정보(개별운용상품명, 상품가입번호, 상품유형, 평가금액, 납입(투자)원금, 보유좌수, 신규일, 만기일, 약정이자율)"}
								, {subTitle: "개인형IRP 정보",
								content: "기본정보(계좌잔액, 계좌평가금액, 사용자부담금, 가입자부담금, 개설일, 최초입금일, 최초 제도 가입일, 연금개시 시작(예정)일, 거래내역(거래일시, 거래번호, 거래구분, 거래금액), 개별운용상품 정보(개별운용상품명, 상품가입번호, 상품유형, 평가금액, 납입(투자)원금, 보유좌수, 신규일, 만기일, 약정이자율"}]
				},
				insu: {
					bzrgName: "보험",
					trxTerm: "(계약자) 보험증권 목록, (계약자) 대출계좌목록, (계약자)퇴직연금)(개인형IRP/DC형)목록, (피보험자) 보험증권 목록, (계약자) 보험 정보, (계약자) 대출 상품정보, (계약자) 계약형 IRP 정보, (계약자)DB형 퇴직연금 정보, (계약자) DC형 퇴직연금 정보, (피보험자) 보험정보, 휴면보험금/미청구보험금 정보",
					creditTerm: [{subTitle: "보험 정보",
								content: "보험료납입 기본정보(납입기간구분, 납입주기, 총 납입 횟 수, 납입기관, 납입계좌번호, 납입일자, 납입종료일자, 납입 보험료, 통화코드, 자동대출납입 신청 여부), 납입내역(납입 일자, 납입연월, 납입회차, 실납입 보험료, 통화코드, 수금방법)"}
								, {subTitle: "장기인 보험정보(계약자)",
								content: "보험계약정보(갱신여부, 계약체결일, 만기일자, 통화코드, 보험가입금액, 변액보험 여부, 유니버셜 여부, 연금개시일, 연금수령주기, 대출실행 가능 상품 여부, 피보험자수, 피보 험자번호, 피보험자명, 주피보험자 여부), 특약정보(특약명, 특약의 상태, 특약만기일자, 특약가입금액, 통화코드, 특약 의 유형), 증권별 보장정보(계약관계자구분, 피보험자계약 자관계, 담보, 담보특성, 회사담보일렬번호, 회사담보명, 담 보상태, 담보금액, 담보기간시작일자, 담보기간종료일자)"}
								, {subTitle: "장기인 보험정보(피보험자)",
								content: "보험계약정보(갱신여부, 계약체결일, 만기일자, 통화코드, 보험가입금액, 변액보험 여부, 유니버셜 여부, 계약자명, 주 피보험자 여부), 특약정보(특약명, 특약의 상태, 특약만기일 자, 특약가입금액, 통화코드, 특약의 유형), 증권별 보장정보 (계약관계자구분, 피보험자계약자관계, 담보, 담보특성, 회 사담보일렬번호, 회사담보명, 담보상태, 담보금액, 담보기간시작일자, 담보기간종료일자)"}
								, {subTitle: "물및일반 보험정보(계약자)",
								content: "보험계약정보(갱신여부, 계약체결일, 만기일자, 통화코드, 보험가입금액, 목적물수, 인/물 구분코드, 피보험인/물 번 호, 피보험인/물명, 주피보험자 여부, 소재지, 물건구분, 목 적물), 특약정보(특약명, 특약의 상태, 특약만기일자, 특약 가입금액, 통화코드, 특약의 유형), 증권별 보장정보(계약관 계자구분, 피보험자계약자관계, 담보, 담보특성, 회사담보 일렬번호, 회사담보명, 담보상태, 담보금액, 담보기간시작 일자, 담보기간종료일자)"}
								, {subTitle: "물및일반 보험정보(피보험자)",
								content: "보험계약정보(갱신여부, 계약체결일, 만기일자, 통화코드, 보험가입금액, 계약자명, 목적물수, 인/물 구분코드, 피보험 인/물 번호, 피보험인/물명, 주피보험자 여부, 소재지, 물건 구분, 목적물), 특약정보(특약명, 특약의 상태, 특약만기일 자, 특약가입금액, 통화코드, 특약의 유형), 증권별 보장정보 (계약관계자구분, 피보험자계약자관계, 담보, 담보특성, 회 사담보일렬번호, 회사담보명, 담보상태, 담보금액, 담보기 간시작일자, 담보기간종료일자)"}
								, {subTitle: "자동차 보험정보(계약자)",
								content: "계약정보(차량번호, 자동차보험 구분, 계약자 차량명, 보험 시기, 보험종기, 연령특약, 운전자한정특약, 자기차량손해, 자기부담금 구분, 자기부담금 금액), 납입정보(거래일시, 거 래번호, 자동차보험 보험료, 납입회차, 실납입 보험료, 수금 방법, 납입기관, 납입계좌번호)"}
								, {subTitle: "자동차 보험정보(피보험자)",
								content: "계약정보(차량번호, 자동차보험 구분, 계약자 차량명, 보험 시기, 보험종기, 연령특약, 운전자한정특약, 자기차량손해, 자기부담금 구분, 자기부담금 금액)"}
								, {subTitle: "보험대출상품정보",
								content: "기본정보(대출일, 만기일, 상환방식, 증권번호, 납입기관, 납 입계좌번호, 월상환일), 잔액정보(통화코드, 대출잔액, 대출 원금, 다음 이자 상환일), 이자 납입 및 대출원금 상환내역 (거래일시, 거래번호, 통화코드, 대출원금상환액, 이자납입 액, 이자적용시작일, 이자적용종료일, 적용이율, 이자종류)"}
								, {subTitle: "DB형 퇴직연금 정보",
								content: "기본정보(보유여부)"}
								, {subTitle: "DC형 퇴직연금 정보",
								content: "기본정보(계좌잔액, 계좌평가금액, 개설일), 거래내역(거래일시, 거래번호, 거래구분, 거래금액), 개별운용상품 정보(개별운용상품명, 상품가입번호, 상품유형, 평가금액, 납입(투자)원금, 보유좌수, 신규일, 만기일, 약정이자율)"}
								, {subTitle: "개인형IRP 정보",
								content: "기본정보(계좌잔액, 계좌평가금액, 사용자부담금, 가입자부담금, 개설일, 최초입금일, 최초 제도 가입일, 연금개시 시작(예정)일, 거래내역(거래일시, 거래번호, 거래구분, 거래금액), 개별운용상품 정보(개별운용상품명, 상품가입번호, 상품유형, 평가금액, 납입(투자)원금, 보유좌수, 신규일, 만기일, 약정이자율"}
								, {subTitle: "휴면보험금 정보",
								content: "보험증권번호, 전송요구여부, 상품명, 숨은금융자산구분코드, 보험구분코드 업권구분코드, 기관명, 대표전화번호, 통화코드, 휴면계좌금액, 소멸시효완성일, 부가정보"}
								, {subTitle: "미청구보험금 정보",
								content: "상품구분코드, 통화코드, 미청구보험금, 원금산출기준, 이자산출기준, 계약체결일, 부가정보"}]
				},
				efin: {
					bzrgName: "페이(전자금융)",
					trxTerm: "선불전자지급수단 목록 및 계정목록, 선불전자 지급수단 정보 결제 정보",
					creditTerm: [{subTitle: "선불발행정보",
								content: "선불잔액정보(총잔액, 충전포인트 잔액, 적립포인트 잔액, 출금가능액, 적립예정, 소멸예정), 자동충전정보(충전지불 수단 기관, 충전지불수단 식별키, 충전조건, 기준날짜, 기준 금액, 충전금액)"}
								, {subTitle: "거래내역정보",
								content: "선불거래내역(거래유형, 거래일시, 거래번호, 거래금액, 거 래 후 잔액, 거래상대기관, 거래상대 식별키, 주문번호, 거래 메모, 가맹점명, 가맹점사업자등록번호, 상품(구매) 제목, 상 품(구매)분류, 결제방법, 정기결제여부)"}
								, {subTitle: "결제수단 등록정보",
								content: "결제수단 기관, 결제수단 식별코드, 결제수단 식별키, Primary 여부"}
								, {subTitle: "결제내역정보",
								content: "결제유형, 주문번호, 결제일시, 결제번호, 통화코드, 결제금 액, 결제수단 기관, 결제수단 식별코드, 결제수단 식별키, 카 드승인번호, 카드명, 할부개월, 거래메모, 가맹점명, 가맹점 사업자등록번호, 상품제목, 상품분류, 결제방법"}]
				},
				capital: {
					bzrgName: "할부금융",
					trxTerm: "계좌(대출/운용리스)목록, 대출상품 정보, 운용리스 정보",
					creditTerm: [{subTitle: "대출상품 정보",
								content: "계좌정보(계좌번호,회차번호,상품명,계좌구분(코드),계좌상태(코드)), 기본정보(대출일,만기일,최종적용금리,월상환일,상환방식(코드),자동이체 기관(코드),상환계좌번호(자동이체)), 잔액정보(통화코드,대출잔액,대출원금,다음 이자 상환일), 거래내역(거래일시,거래번호,거래유형(코드),통화코드,거래금액,거래 후 대출잔액,거래금액 중 원금,거래금액 중 이자,환출이자,이자적용수,이자적용목록,이자적용시작일,이자적용종료일,적용이율,이자금액,이자종류(코드))"}
								, {subTitle: "운용리스 정보",
								content: "기본정보(대출일,만기일,월상환일,상환방식(코드),자동이체 기관(코드),상환계좌번호(자동이체),다음 납입예정일), 거래내역(거래일시,거래번호,거래유형(코드),거래금액)"}]
				},
				telecom: {
					bzrgName: "통신 정보",
					trxTerm: "통신계약목록",
					creditTerm: [{subTitle: "통신 정보",
								content: "기본정보(계약관리번호,가입번호,통신구분 (코드),가입구분 (코드)), 청구정보(청구년월,청구금액,납부예정일자), 납부정보(납부년월,납부금액,납부수단 (코드)), 결제정보(이용일시,결제금액,가맹점명,결제상품명)"}]
				},
				public: {
					bzrgName: "공공기관",
					trxTerm: "",
					creditTerm: [],
				},
			};
		},

		// 시/도 선택 팝업 open
		fn_openCityPopup() {
			const config = {
				renderer : { component : COAR2015 }
			};
			modalService.openSlidePagePopup(config).then(res => {
				if (res.comnCVal) {
					this.selectedCity = res.comnCVal;
					this.selectedCityName = res.comnCExpl;
					this.selectedRegion = "";
					this.selectedRegionName = "구/군 선택";
					if(this.selectedCity) this.fn_openRegionPopup();
				}
			});
		},

		// 시/군/구 선택 팝업 open
		fn_openRegionPopup() {
			if (!this.selectedCity) {
				modalService.alert("시/도 지역부터 선택해주세요.");
				return;
			}

			const config = {
				renderer : { component : COAR2016 },
				params : {
					selectCity : this.selectedCity
				}
			};
			modalService.openSlidePagePopup(config).then(res => {
				if (res.comnCVal) {
					this.selectedRegion = res.comnCVal;
					this.selectedRegionName = res.comnCExpl;
				}
			});

		},

		fn_nextProcess() {
			if (this.isShowRegion) {
				if(!this.selectedCity) {
					modalService.alert('시/도 지역을 선택해주세요.');
					return;
				}

				if(!this.selectedRegion) {
					modalService.alert('시/군/구 지역을 선택해주세요.');
					return;
				}
			}

			if (!this.termsInfo.isTermsAgree) {
				modalService.alert('필수 동의를 해주세요.');
				return;
			} else {
				this.termsInfo.selectedRegion = this.selectedRegion;
				const isShowTermAccount = Boolean(this.isShowTermAccount ^ this.isAgreeAccountInfo)
					, isShowTermFranchise = Boolean(this.isShowTermFranchise ^ this.isAgreeFranchiseInfo)
					, isShowTermCategory = Boolean(this.isShowTermCategory ^ this.isAgreeCategoryInfo);
				if (isShowTermAccount || isShowTermFranchise || isShowTermCategory) {
					const config = {
						renderer : { component : COAR4013 },
						params : {
							isShowTermAccount : isShowTermAccount,
							isShowTermFranchise : isShowTermFranchise,
							isShowTermCategory : isShowTermCategory,
						}
					};

					modalService.openSlidePagePopup(config).then(res => {
						if (res != undefined) {
							if (res.isAgreeOptionalTerms) {
								this.termsInfo.is_consent_trans_memo = this.isShowTermAccount;
								this.termsInfo.is_consent_merchant_name_regno = this.isShowTermFranchise;
								this.termsInfo.is_consent_trans_category = this.isShowTermCategory;
							}
							this.fn_close(this.termsInfo);
						}
					});
				} else {
					this.fn_close(this.termsInfo);
				}
			}
		},

		fn_setTxPrd() {
			if (this.selectedScheduled) {
				this.selectedTxPrd = "1/1w";
			}
		},

		fn_close(response = {}) {
			this.close(response);
		},

    },

    components : {

    }
}


</script>