<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 금융자산 > 공공 > 상세정보 전송요구 및 개인(신용)정보 수집ㆍ이용 동의
* @ 페이지설명 : 공공 > 상세정보 전송요구 및 개인(신용)정보 수집ㆍ이용 동의
* @ 파일명     : src/views/page/CO/AR/COAR2030/COAR2030.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-09-01
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-09-01              CS528069              최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>공공 정보 연결</h1>
			<a href="javascript:void(0);" class="btn_back" @click="close()"><span class="blind">이전화면</span></a>
		</div>		
		<div class="popup_content" id="term_scroll" ref="term_scroll"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner com_line_type01 com_top_type02">
				<strong class="com_pop_tit01">
					자산 관리를 위해 정보 수집에<br/>동의가 필요해요
				</strong>
			</div>
			<div class="terms_view">
				<div>
					<div class="terms_cont">
						<strong class="terms_tit">상세정보 전송요구 및<br/>개인(신용)정보 수집ㆍ이용 동의</strong>
						<p class="terms_txt">
							농업협동조합중앙회는 신용정보의 이용 및 보호에 관한 법률, 개인정보 보호법 등 관련 법령에 따라 다음과 같이 고객님의 개인(신용)정보를 처리합니다.
						</p>
						<dl>
							<dt>정보를 보내는 곳</dt>
							<dd>{{fn_setOrgnm()}}</dd>
							<dt>정보를 받는 곳</dt>
							<dd>
								농업협동조합중앙회
							</dd>
							<dt>목적</dt>
							<dd>전송 요구를 통한 본인신용정보 통합 조회, 데이터분석 서비스의 이용</dd>
							<dt>보유 및 이용기간</dt>
							<dd>
								<strong class="terms_txt_point">서비스 이용 종료시 또는 삭제 요구시 까지</strong>
							</dd>
							<dt>거부할 권리 및 불이익</dt>
							<dd>
								귀하는 개인(신용)정보 수집ㆍ이용에 관한 동의를 거부하실 수 있습니다. 다만, “필수 항목에 대한 수집ㆍ이용에 관한 동의”는 본인신용정보 통합 조회, 데이터분석 서비스의 이용을 위한 필수적 사항 이므로 동의를 거부하실 경우 본인신용정보 통합 조회, 데이터분석 서비스의 이용이 제한될 수 있으며, “선택 항목에 대한 수집ㆍ이용에 관한 동의”는 거부하실 경우 해당 선택 항목에 대한 본인신용정보 통합 조회, 데이터분석 서비스의 이용이 제한될 수 있습니다.
							</dd>
							<dt>전송을 요구하는 개인신용정보</dt>
							<dd>
								<ul class="bl_dot_list">
									<li v-if="viewMois">
										행정안전부 : 지방세납세증명서, 지방세납부확인서(등록면허세면허분), 지방세세목별과세(납세)증명서(자동차세), 지방세세목별과세(납세)증명서(재산세)
									</li>
									<li v-if="viewNts">
										국세청 : (국세)납세증명서, 납세사실증명서
									</li>
									<li v-if="viewCustoms">
										관세청 : 관세납세증명서, 관세납부내역
									</li>
									<li v-if="viewNhis">
										국민건강보험공단 : 건강·장기요양보험료납부확인서(직장가입자), 건강·장기요양보험료납부확인서(개인)
									</li>
									<li v-if="viewNps">
										국민연금공단 : 연금산정용 가입내역확인서
									</li>
									<li v-if="viewGeps">
										공무원연금공단 : 공무원연금내역서
									</li>
								</ul>
							</dd>
							<dt>수집.이용 정보</dt>
							<dd>
								<ul class="bl_dot_list">
									<li>
										<strong>개인식별정보 <span class="txt_gray">(필수항목)</span></strong>
										<div class="sub_box">전자서명, 접근토큰, 인증서, 전송요구서</div>
									</li>
								</ul>
							</dd>
							<dt>정기적 전송여부</dt>
							<dd>
								<div class="com_btnselectbox_type01">
									<button type="button" class="com_btnselect_type01" title="정기적 전송여부 선택" @click="fn_selectSchedule()"><span>{{isScheduledTxt}}</span></button>
								</div>
							</dd>
							<dt>전송요구 유효기간</dt>
							<dd>
								<div class="com_btnselectbox_type01">
									<button type="button" class="com_btnselect_type01" title="전송요구 유효기간 선택" @click="fn_selectDate()"><span>{{expDateTxt}}</span></button>
								</div>
							</dd>
						</dl>
					</div>
					<div class="custom_terms mt50" :class="fn_chkEssentialAgr" ref="essentialAgr"><!-- 필수입력 미체크시 class error -->
						<div class="new_check_all">
							<span class="btn_check">
								<input type="checkbox" name="allagree" id="check_COAR2030_01" v-model="agreePersonalInfo" @change="fn_isEssentialChk()">
								<label for="check_COAR2030_01">
									<span>[필수] 개인(신용)정보 수집ㆍ이용 동의</span>
								</label>
								<!-- <button type="button" class="btn_arrow">상세보기</button> -->
							</span>
						</div>
					</div>
					<p class="error_meg" aria-live="assertive" role="alert" v-if="!this.chkEssentialAgr && !this.isFirstChk">동의가 꼭 필요해요</p>
				</div>
			</div>
			
		</div>
		<div class="popup_footer fixed last_move">
			<div class="btn_full_box">
				<a href="javascript:void(0);" class="btn btn_mint btn_move_hide" id="term_btn"><span class="btn_down_arrow">끝까지 내려 보기</span></a>
				<a href="javascript:void(0);" class="btn btn_mint" @click="fn_moveNext()">동의하고 다음</a>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click="closeAllLeftMain()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import moment from 'moment'
import {dateFormat} from '@/utils/date'
import _ from 'lodash'

//import COAR2013 from '@/views/page/CO/AR/COAR2009/COAR_2009_13.vue'
//import COAR2014 from '@/views/page/CO/AR/COAR2009/COAR_2009_14.vue'
import COAR2031 from '@/views/page/CO/AR/COAR2031/COAR2031.vue'

export default {
    name : "COAR2030",
    data: () => {
        return {
			userAgreeInfo	: {},	// 사용자 동의 정보
			selectList		: [],	// '기관연결 완료 및 금융자산 선택' 팝업 내 자산 선택 리스트
			certDsc			: "",	// 인증방법구분 (공동인증 : joint, 금융인증 : finance, 패스인증 : pass)

			sortList : [],

			today 			: dateFormat(new Date(), "YYYY-MM-DD"),
			defExpDate 		: dateFormat(moment().add('365', 'days'), 'YYYY-MM-DD'),	// 기본 전송요구 유효기간 설정 (1년)
			expDateTxt 		: "",	// 전송정보 유효기간 화면 텍스트

			btnViewYn    	: true,

			end_period		: "",		// 전송요구 종료시점
			dateShowYn		: false,

			isScheduled		: "",		// 정기적 전송 여부 (true : 주1회, false : 전송하지않음)
			isScheduledTxt	: "",		// 정기적 전송 여부에 따른 텍스트

			checkedList		: [],
			mois_list 		: [],	// 행정안전부 업권 리스트
			nts_list 		: [],	// 국세청 업권 리스트
			customs_list 	: [],	// 관세청 업권 리스트
			nhis_list 		: [],	// 국민건강보험공단 업권 리스트
			nps_list 		: [],	// 국민연금공단 업권 리스트
			geps_list 		: [],	// 공무원연금공단 업권 리스트

			viewMois		: false,	// 행정안전부 영역 보이기 여부
			viewNts			: false,	// 국세청 영역 보이기 여부
			viewCustoms		: false,	// 관세청 영역 보이기 여부
			viewNhis		: false,	// 국민건강보험공단 영역 보이기 여부
			viewNps			: false,	// 국민연금공단 영역 보이기 여부
			viewGeps		: false,	// 공무원연금공단 영역 보이기 여부

			agreePersonalInfo 	: null,	// 개인(신용정보) 수집.이용 동의

			chkEssentialAgr : null,	// 필수 동의정보 체크여부
			isFirstChk		: true,	// 다음버튼 첫 클릭 여부
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
			this.userAgreeInfo 		= param.userAgreeInfo || {}
			this.selectList 		= param.selectList || []			
			this.certDsc			= param.certDsc || ""

            this.getData()
        },
        getData() {
			// 리스트 내 업권 별 신용거래정보 영역 보이기 여부 컨트롤
			for(const selItem of this.selectList) {
				switch(selItem.orgBzrgC) {
					case "mois" 	: this.viewMois 	= true; break;	// 행정안전부
					case "nts" 		: this.viewNts 		= true; break;	// 국세청
					case "customs" 	: this.viewCustoms 	= true; break;	// 관세청
					case "nhis" 	: this.viewNhis 	= true; break;	// 국민건강보험공단
					case "nps" 		: this.viewNps 		= true; break;	// 국민연금공단
					case "geps" 	: this.viewGeps 	= true; break;	// 공무원연금공단
					default : break;
				}
			}

			this.expDateTxt = "1년"
			this.end_period = this.defExpDate
			this.isScheduled = true
			this.isScheduledTxt = "주1회"

			this.$nextTick(() => {
				this.callJQueryFncExcute()
			})
		},

		// 선택 기관명 set
		//////////////////////////////// 손봐야함 !
		fn_setOrgnm() {
			let tmpOrgnm = ""
			let orgBzList = [
				{"code":"mois",		 "name":"행정안전부"},
				{"code":"nts",		 "name":"국세청"},
				{"code":"customs",	 "name":"관세청"},
				{"code":"nhis",		 "name":"국민건강보험공단"},
				{"code":"nps",		 "name":"국민연금공단"},
				{"code":"geps",		 "name":"공무원연금공단"},
			]

			for(const item of orgBzList) {
				// 코드/명칭 리스트를 순회하며 선택리스트 내 기관명 탐색
				if(_.findIndex(this.selectList, d => d.orgBzrgC === item.code) > -1 && tmpOrgnm.indexOf(item.name) === -1) {
					tmpOrgnm += ", " + item.name
				}
			}

			if(tmpOrgnm !== "") {
				// 앞자리 쉼표(, ) 제거
				tmpOrgnm = tmpOrgnm.substr(1, tmpOrgnm.length)
			}

			return tmpOrgnm
		},

		// // 정기적 전송여부 선택
		// fn_selectSchedule() {
		// 	const config = {
		// 		params : {
		// 			sel_is_scheduled : this.isScheduled,
		// 		},
		// 		renderer : {
		// 			component : COAR2013
		// 		}
		// 	}
		// 	modalService.openSlidePagePopup(config).then(response => {
		// 		this.isScheduled = response.selItem ? true : false
		// 		this.isScheduledTxt = this.isScheduled ? "주1회" : "전송하지 않음"
		// 	})
		// },

		// // 전송요구 유효기간 선택
		// fn_selectDate() {
		// 	const config = {
		// 		params : {
		// 			sel_end_period 	: this.end_period,
		// 			sel_end_txt		: this.expDateTxt,
		// 		},
		// 		renderer : {
		// 			component : COAR2014
		// 		}
		// 	}
		// 	modalService.openSlidePagePopup(config).then(response => {
		// 		this.end_period = response.endPeriod || ""
		// 		this.expDateTxt = response.endPeriodTxt || ""
		// 	})
		// },

		// 필수 동의 정보 체크 여부 확인
		fn_isEssentialChk() {
			if(this.agreePersonalInfo) {
				this.chkEssentialAgr = true
			}
		},
		
		// 다음버튼 클릭
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
				this.fn_runNextProcess()
			}
		},

		// 다음 프로세스 진행
		fn_runNextProcess() {
			console.log("종료시점 :: ", this.end_period, "정기전송 :: ", this.isScheduled)

			console.log("이전 인증 방법 :: ", this.certDsc)
			if(this.certDsc === "joint") {
				// 선택한 인증 방법이 "공동인증"일 경우
				this.fn_tempComplete()
			} else if(this.certDsc === "finance") {
				// 선택한 인증 방법이 "금융인증"일 경우
				this.fn_tempComplete()
			}
		},

		// 임시) 완료 팝업 이동
		fn_tempComplete() {
			console.log("(임시) COAR1017 거치지않고 완료팝업 이동")
			const config = {
				component : COAR2031,
				params : {
					selectList : this.selectList
				}
			}
			modalService.openPopup(config)
		}
		
    },
    components : {
    }
}


</script>