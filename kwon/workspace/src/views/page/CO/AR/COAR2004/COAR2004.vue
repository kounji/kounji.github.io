<!--
/*************************************************************************
* @ 서비스경로 : 자산연결 > 금융자산 > 한번에 > 가입상품 목록 전송요구 및 개인(신용)정보 수집ㆍ이용 동의
* @ 페이지설명 : 가입상품 목록 전송요구 및 개인(신용)정보 수집ㆍ이용 동의
* @ 파일명     : src/views/page/CO/AR/COAR2004/COAR2004.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-08-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-18              CS528069              최초작성
* 2023-08-04			  CS533459				상호금융 마이데이터 확대 개발 적용
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1>{{isMramMod === '' ? "자산연결" : "연결 변경"}}</h1>
			<a href="javascript:void(0);" class="btn_back" @click.prevent="close()"><span class="blind">이전화면</span></a>
		</div>		
		<div class="popup_content" id="term_scroll" ref="term_scroll"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner progress_wrap">
				<strong class="titH1">자산을 확인하기 위해<br>동의가 필요해요</strong>
					<span class="progress_num"><em class="pointColor green">2</em>/5</span>
			</div>
			<div class="terms_view">
				<div>
					<div class="terms_cont">
						<strong class="terms_tit">가입상품 목록 전송요구 및<br/>개인(신용)정보 수집ㆍ이용 동의</strong>
						<p class="terms_txt">농업협동조합중앙회는 신용정보의 이용 및 보호에 관한 법률, 개인정보 보호법 등 관련 법령에 따라 다음과 같이 고객님의 개인(신용)정보를 처리합니다.</p>
						<dl>
							<dt>연결할 기관</dt>
							<dd>{{selOrgTxt}}</dd>
							<dt>정보를 받는 곳</dt>
							<dd>
								농업협동조합중앙회
							</dd>
							<dt>목적</dt>
							<dd>
								상세정보 전송요구를 위한 가입상품목록 조회
							</dd>
							<dt>종료 시점 및 정보 보유ㆍ이용 기간</dt>
							<dd>
								<strong class="terms_txt_point">상세정보 전송요구시까지 또는 7일중 짧은 기간</strong>
							</dd>
							<dt>정기적 전송 여부</dt>
							<dd>
								아니오
							</dd>
							<dt>거부할 권리 및 불이익</dt>
							<dd>
								귀하는 개인(신용)정보 수집ㆍ이용에 관한 동의를 거부하실 수 있습니다. 다만, “수집ㆍ이용에 관한 동의”는 본인신용정보 통합조회, 데이터분석 서비스의 이용을 위한 필수적 사항이므로 동의를 거부하실 경우 본인신용정보 통합조회, 데이터분석 서비스의 이용이 제한될 수 있습니다.
							</dd>
							<dt>전송을 요구하는 개인신용정보</dt>
							<dd>
								<ul class="bl_dot_list">
									<li v-show="viewBank">
										은행 : 계좌(수신/펀드/신탁/ISA/대출) 목록 및 퇴직연금(개인형IRP/DC형) 목록, 선불카드 목록
									</li>
									<li v-show="viewCard">
										카드 : 카드 목록 및 선불 카드 목록
									</li>
									<li v-show="viewInvest">
										증권(금융투자) : 계좌 목록 및 퇴직연금(개인형IRP/DC형) 목록
									</li>
									<li v-show="viewInsu">
										보험 : (계약자) 보험증권 목록, (계약자) 대출계좌 목록, (계약자) 퇴직연금(개인형IRP/DC형) 목록, 피보험자 보험증권 목록
									</li>
									<li v-show="viewEfin">
										페이(전자금융) : 선불전자지급수단 목록 및 계정 목록
									</li>
									<li v-show="viewCapital">
										할부금융 : 계좌(대출/운용리스) 목록
									</li>
									<li v-show="viewGinsu">
										보증보험 : 보증보험 증권 목록
									</li>
									<li v-show="viewTelecom">
										통신 : 통신 계약 목록
									</li>
									<li v-show="viewP2p">
										P2P : P2P 대출 목록
									</li>
									<li v-show="viewBond">
										인수채권 : 인수채권/금전대부 목록
									</li>
									<li v-show="viewUsury">
										대부 : 인수채권/금전대부 목록
									</li>
								</ul>
							</dd>
							<dt>수집ㆍ이용 정보</dt>
							<dd>
								<ul class="bl_dot_list">
									<li>
										<strong>개인식별정보</strong>
										<div class="sub_box">전자서명, 접근토큰, 인증서, 전송요구서</div>
									</li>
									<li>
										<strong>신용거래정보</strong>
										<div class="com_box_type01 toggle_list_box2" v-if="viewBank">
											<div data-ui-toggle="box" class="toggle_box_area"><!-- 활성화 class open -->
												<button type="button" class="view_btn" aria-expanded="false">
													<div class="new_tit_area">
														<div class="tit"><span>은행</span></div>
														<p class="top_sub_txt">계좌(수신/펀드/신탁/ISA/대출) 목록 , 퇴직연금(개인형IRP) 목록, 퇴직연금(DC형) 목록, 선불카드 목록</p>
													</div>
													<em class="open">열기</em>
													<em class="close">닫기</em>
												</button>
											</div>
											<ul class="view_cont list_type_info">
												<li>
													<p class="sub_box">
														고객정보, 최초생성일시, 계좌번호, 회차번호, 상품명, 외화계좌여부, 마이너스약정 여부, 계좌번호 별 구분 코드, 계좌번호 별 상태 코드, 개인형IRP 계좌의 상품명/계좌번호, 상품명, 상품관리번호
														카드식별자, 카드상품명, 발급일자, 액면한도 또는 최대충전한도
													</p>
												</li>
											</ul>
										</div>

										<div class="com_box_type01 toggle_list_box2" v-if="viewCard">
											<div data-ui-toggle="box" class="toggle_box_area"><!-- 활성화 class open -->
												<button type="button" class="view_btn" aria-expanded="false">
													<div class="new_tit_area">
														<div class="tit"><span>카드</span></div>
														<p class="top_sub_txt">카드 목록 및 선불 카드 목록</p>
													</div>
													<em class="open">열기</em>
													<em class="close">닫기</em>
												</button>
											</div>
											<ul class="view_cont list_type_info">
												<li>
													<p class="sub_box">
														카드번호, 카드식별자, 카드상품명, 본인/가족 구분(코드), 카드구분(코드), 카드식별자, 카드상품명, 발급일자, 액면한도 또는 최대충전한도
													</p>
												</li>
											</ul>
										</div>

										<div class="com_box_type01 toggle_list_box2" v-if="viewInvest">
											<div data-ui-toggle="box" class="toggle_box_area"><!-- 활성화 class open -->
												<button type="button" class="view_btn" aria-expanded="false">
													<div class="new_tit_area">
														<div class="tit"><span>증권(금융투자)</span></div>
														<p class="top_sub_txt">계좌 목록, 퇴직연금(개인형IRP) 목록, 퇴직연금(DC형) 목록</p>
													</div>
													<em class="open">열기</em>
													<em class="close">닫기</em>
												</button>
											</div>
											<ul class="view_cont list_type_info">
												<li>
													<p class="sub_box">
														계좌번호, 계좌명, 계좌종류(코드), 계좌개설일, 세제혜택 적용여부(계좌), CMA상품포함여부, 주식거래가능여부, 은행예수금방식계좌여부, 개인형IRP 계좌의 상품명, 계좌번호, 상품명, 상품관리번호
													</p>
												</li>
											</ul>
										</div>

										<div class="com_box_type01 toggle_list_box2" v-if="viewInsu">
											<div data-ui-toggle="box" class="toggle_box_area"><!-- 활성화 class open -->
												<button type="button" class="view_btn" aria-expanded="false">
													<div class="new_tit_area">
														<div class="tit"><span>보험</span></div>
														<p class="top_sub_txt">보험증권 및 피보험자 보험 목록, 대출계좌 목록, 퇴직연금(개인형IRP) 목록, 퇴직연금(DC형) 목록</p>
													</div>
													<em class="open">열기</em>
													<em class="close">닫기</em>
												</button>
											</div>
											<ul class="view_cont list_type_info">
												<li>
													<p class="sub_box">
														증권번호, 상품명, 보험종류 구분(코드), 계약상태(코드), 보험대출상품의 계좌번호/상품명, 계좌번호 별 구분 코드, 계좌번호 별 상태코드, 개인형IRP 계좌의 상품명/계좌번호, 상품명, 상품관리번호
													</p>
												</li>
											</ul>
										</div>

										<div class="com_box_type01 toggle_list_box2" v-if="viewEfin">
											<div data-ui-toggle="box" class="toggle_box_area"><!-- 활성화 class open -->
												<button type="button" class="view_btn" aria-expanded="false">
													<div class="new_tit_area">
														<div class="tit"><span>페이(전자금융)</span></div>
														<p class="top_sub_txt">선불전자지급수단 목록 및 계정 목록</p>
													</div>
													<em class="open">열기</em>
													<em class="close">닫기</em>
												</button>
											</div>
											<ul class="view_cont list_type_info">
												<li>
													<p class="sub_box">
														선불전자지급수단의 권면ID, 권면명, 가입일, 권면한도, 자동충전 등록여부,  출금가능여부, 계정ID 목록, 통화코드, 전자결제정보의 가입일, 계정ID  노출용 List, 계정ID Data 호출용 List, 결제수단 등록 여부
													</p>
												</li>
											</ul>
										</div>

										<div class="com_box_type01 toggle_list_box2" v-if="viewCapital">
											<div data-ui-toggle="box" class="toggle_box_area"><!-- 활성화 class open -->
												<button type="button" class="view_btn" aria-expanded="false">
													<div class="new_tit_area">
														<div class="tit"><span>할부금융</span></div>
														<p class="top_sub_txt">계좌(대출/운용리스) 목록</p>
													</div>
													<em class="open">열기</em>
													<em class="close">닫기</em>
												</button>
											</div>
											<ul class="view_cont list_type_info">
												<li>
													<p class="sub_box">
														고객정보 최초생성일시, 계좌번호, 회차번호, 상품명, 계좌번호 별 구분 코드, 계좌번호 별 상태 코드
													</p>
												</li>
											</ul>
										</div>

										<div class="com_box_type01 toggle_list_box2" v-if="viewGinsu">
											<div data-ui-toggle="box" class="toggle_box_area"><!-- 활성화 class open -->
												<button type="button" class="view_btn" aria-expanded="false">
													<div class="new_tit_area">
														<div class="tit"><span>보증보험</span></div>
														<p class="top_sub_txt">보증보험 증권 목록</p>
													</div>
													<em class="open">열기</em>
													<em class="close">닫기</em>
												</button>
											</div>
											<ul class="view_cont list_type_info">
												<li>
													<p class="sub_box">
														증권번호, 상품명, 보험종류 구분(코드), 계약상태(코드)
													</p>
												</li>
											</ul>
										</div>

										<div class="com_box_type01 toggle_list_box2" v-if="viewTelecom">
											<div data-ui-toggle="box" class="toggle_box_area"><!-- 활성화 class open -->
												<button type="button" class="view_btn" aria-expanded="false">
													<div class="new_tit_area">
														<div class="tit"><span>통신</span></div>
														<p class="top_sub_txt">통신 계약 목록</p>
													</div>
													<em class="open">열기</em>
													<em class="close">닫기</em>
												</button>
											</div>
											<ul class="view_cont list_type_info">
												<li>
													<p class="sub_box">
														계약관리번호, 가입번호, 통신구분(코드), 가입구분(코드)
													</p>
												</li>
											</ul>
										</div>

										<div class="com_box_type01 toggle_list_box2" v-if="viewUsury">
											<div data-ui-toggle="box" class="toggle_box_area"><!-- 활성화 class open -->
												<button type="button" class="view_btn" aria-expanded="false">
													<div class="new_tit_area">
														<div class="tit"><span>대부</span></div>
														<p class="top_sub_txt">인수채권/금전대부 목록</p>
													</div>
													<em class="open">열기</em>
													<em class="close">닫기</em>
												</button>
											</div>
											<ul class="view_cont list_type_info">
												<li>
													<p class="sub_box">
														채권번호, 기관분류, 채권인수일/특수채권편입일/최초대출일,최초대출기관, 잔액정보
													</p>
												</li>
											</ul>
										</div>

										<div class="com_box_type01 toggle_list_box2" v-if="viewBond">
											<div data-ui-toggle="box" class="toggle_box_area"><!-- 활성화 class open -->
												<button type="button" class="view_btn" aria-expanded="false">
													<div class="new_tit_area">
														<div class="tit"><span>인수채권</span></div>
														<p class="top_sub_txt">인수채권/금전대부 목록</p>
													</div>
													<em class="open">열기</em>
													<em class="close">닫기</em>
												</button>
											</div>
											<ul class="view_cont list_type_info">
												<li>
													<p class="sub_box">
														채권번호, 기관분류, 채권인수일/특수채권편입일/최초대출일,최초대출기관, 잔액정보
													</p>
												</li>
											</ul>
										</div>

										<div class="com_box_type01 toggle_list_box2" v-if="viewP2p">
											<div data-ui-toggle="box" class="toggle_box_area"><!-- 활성화 class open -->
												<button type="button" class="view_btn" aria-expanded="false">
													<div class="new_tit_area">
														<div class="tit"><span>P2P</span></div>
														<p class="top_sub_txt">P2P 대출 목록</p>
													</div>
													<em class="open">열기</em>
													<em class="close">닫기</em>
												</button>
											</div>
											<ul class="view_cont list_type_info">
												<li>
													<p class="sub_box">
														대출계약번호, 상품유형, 대출계약금액, 대출일, 대출금리,상환방식, 부동산담보LTV 비율, 잔액정보
													</p>
												</li>
											</ul>
										</div>
									</li>
								</ul>
							</dd>
						</dl>
					</div>
					<div class="custom_terms error mt50" :class="fn_chkEssentialAgr" ref="essentialAgr"><!-- 필수입력 미체크시 class error -->
						<div class="new_check_all">
							<span class="btn_check">
								<input type="checkbox" name="allagree" id="checkall_COAR2004" v-model="agreePersonalInfo" @change="fn_isEssentialChk()">
								<label for="checkall_COAR2004">
									<span>[필수] 개인(신용)정보 수집ㆍ이용 동의</span>
								</label>
								<!-- <button type="button" class="btn_arrow">상세보기</button> -->
							</span>
						</div>

						<div class="error_message" aria-live="polite" >
							<em class="blind">개인(신용)정보 수집 이용 동의</em><!-- 10/05 jlee 접근성 수정 -->
							<p>체크해 주세요</p>
						</div>

					</div>
					<p class="error_meg" aria-live="assertive" role="alert" v-if="!this.chkEssentialAgr && !this.isFirstChk">동의가 꼭 필요해요</p>
				</div>
			</div>
			
		</div>
		<div class="popup_footer fixed last_move">
			<div class="btn_full_box">
				<a href="javascript:void(0);" class="btn btn_mint btn_move_hide" id="term_btn"><span class="btn_down_arrow">끝까지 내려 보기</span></a>
				<a href="javascript:void(0);" class="btn btn_mint" @click.prevent="fn_moveNext()">동의하고 다음</a>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="closeAllLeftMain()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'

import COAR2005 from '@/views/page/CO/AR/COAR2005/COAR2005.vue'

export default {
    name : "COAR2004",
    data: () => {
        return {
			selOrgTxt 		: "",	// 화면 표시 선택 기관 텍스트
			moduleList 		: [],	// 선택 기관 리스트
			userAgreeInfo 	: {},	// 고객 동의 정보

			viewBank 			: false,	// 은행업권 신용거래정보 영역
			viewInvest 			: false,	// 증권업권 신용거래정보 영역
			viewCard 			: false,	// 카드업권 신용거래정보 영역
			viewInsu 			: false,	// 보험업권 신용거래정보 영역
			viewEfin 			: false,	// 전자금융업권 신용거래정보 영역
			viewCapital 		: false,	// 할부업권 신용거래정보 영역
			viewGinsu 			: false,	// 보증보험업권 신용거래정보 영역
			viewTelecom 		: false,	// 통신업권 신용거래정보 영역
			viewUsury 			: false,	// 대부업권 신용거래정보 영역
			viewBond 			: false,	// 채권업권 신용거래정보 영역
			viewP2p 			: false,	// P2P업권 신용거래정보 영역

			agreePersonalInfo 	: null,	// 개인(신용정보) 수집.이용 동의
			chkEssentialAgr 	: null,	// 필수 동의정보 체크여부
			isFirstChk			: true,	// 다음버튼 첫 클릭 여부

			isMramMod			: "",	// '연결기관 관리 변경'을 통해 넘어올 경우 falg 값 (1 : 연결자산관리 메인에서 변경, 2 : 만료예정 기관에서 만료일 변경)
        }
	},
    mounted() {
		this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)     
    },
    mixins: [
		commonMixin,
        popupMixin
	],
	computed:{
		fn_chkEssentialAgr() {
			return !this.chkEssentialAgr && !this.isFirstChk ? 'error' : ''
		}
	},
    methods: {
        initComponent(param = {}) {
			this.userAgreeInfo 	= param.userAgreeInfo || {}
			this.moduleList 	= param.moduleList || []
			this.isMramMod		= param.isMramMod || ""

			this.getData()
        },
        getData() {
			// 기관 리스트 내 업권 탐색
			if(this.isMramMod === '') {
				for(const unionItem of this.moduleList) {
					switch(unionItem.orgBzrgC) {
						case "bank" 	: this.viewBank 	= true; break;	// 은행
						case "card" 	: this.viewCard 	= true; break;	// 카드
						case "invest" 	: this.viewInvest 	= true; break;	// 투자
						case "insu" 	: this.viewInsu 	= true; break;	// 보험
						case "ginsu" 	: this.viewGinsu 	= true; break;	// 보증보험
						case "efin" 	: this.viewEfin 	= true; break;	// 전자금융
						case "capital" 	: this.viewCapital 	= true; break;	// 할부금융
						case "telecom" 	: this.viewTelecom 	= true; break;	// 통신
						case "usury" 	: this.viewUsury 	= true; break;	// 대부
						case "bond" 	: this.viewBond 	= true; break;	// 채권
						case "p2p" 		: this.viewP2p 		= true; break;	// P2P
						default : break;
					}
				}
			} else {
				for(const unionItem of this.moduleList) {
					switch(unionItem.orgBizDsc) {
						case "bank" 	: this.viewBank 	= true; break;	// 은행
						case "card" 	: this.viewCard 	= true; break;	// 카드
						case "invest" 	: this.viewInvest 	= true; break;	// 투자
						case "insu" 	: this.viewInsu 	= true; break;	// 보험
						case "ginsu" 	: this.viewGinsu 	= true; break;	// 보증보험
						case "efin" 	: this.viewEfin 	= true; break;	// 전자금융
						case "capital" 	: this.viewCapital 	= true; break;	// 할부금융
						case "telecom" 	: this.viewTelecom 	= true; break;	// 통신
						case "usury" 	: this.viewUsury 	= true; break;	// 대부
						case "bond" 	: this.viewBond 	= true; break;	// 채권
						case "p2p" 		: this.viewP2p 		= true; break;	// P2P
						default : break;
					}
				}
			}

			this.selOrgTxt = this.fn_setOrgnm()

			this.$nextTick(() => {
				this.callJQueryFncExcute()
			})
		},

		// 선택 기관명 set
		fn_setOrgnm() {
			let tmpOrgnm = ""
			let cnt = 0
			for(const item of this.moduleList) {
				if(cnt !== 0) {
					tmpOrgnm += ", " + item.orgnm
				} else if (cnt === 0){
					tmpOrgnm += item.orgnm
				}
				cnt++
			}

			return tmpOrgnm
		},

		fn_moveNext() {
			// 첫 클릭 여부 false 변경
			this.isFirstChk = false

			// 필수 동의 여부 확인
			if(!this.agreePersonalInfo) {
				this.chkEssentialAgr = false

				// 포커스 및 스크롤 이동
				this.$nextTick(() => {
					let scrollHeight = this.$refs.term_scroll.scrollHeight
					let clientHeight = this.$refs.term_scroll.clientHeight
					let scrollTop = this.$refs.term_scroll.scrollTop

					if(Math.ceil(clientHeight + scrollTop) <= scrollHeight) {
						let $cont = $("[id='term_scroll']")
						let $conIdx = $cont.length - 1

						$($cont[$conIdx]).animate({scrollTop : scrollHeight - clientHeight}, 500)
					}

					this.$refs.essentialAgr.focus()
				})
			} else {
				const config = {
					component : COAR2005,
					params : {
						moduleList		: this.moduleList,		// 선택한 기관 목록
						userAgreeInfo 	: this.userAgreeInfo,	// 사용자동의정보
						isMramMod		: this.isMramMod,		// '연결기관 관리 변경'을 통해 넘어올 경우 falg 값 (1 : 연결자산관리 메인에서 변경, 2 : 만료예정 기관에서 만료일 변경)
					}
				}
				modalService.openPopup(config).then(response => {
					// 동의 시 COAR2005, COAR2004 팝업 순차적으로 닫고 COAR2003으로 callback
					if(response === "moveNext") {
						this.close(response)
					}
				})
			}
		},

		fn_isEssentialChk() {
			if(this.agreePersonalInfo) {
				this.chkEssentialAgr = true
			}
		},

    },
    components : {
    }
}


</script>