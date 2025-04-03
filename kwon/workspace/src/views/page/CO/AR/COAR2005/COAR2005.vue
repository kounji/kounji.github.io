<!--
/*************************************************************************
* @ 서비스경로 : 자산연결 > 금융자산 > 한번에 > 개인(신용)정보 제공 동의
* @ 페이지설명 : 개인(신용)정보 제공 동의
* @ 파일명     : src/views/page/CO/AR/COAR2005/COAR2005.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-08-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-18              CS528069              최초작성
* 2023-08-07			  CS533459				상호금융 마이데이터 확대개발 적용
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
				<strong class="titH1">
					선택한 기관에 요청 내용을<br> 
					전달하기 위해 동의해 주세요.
					<span class="progress_num"><em class="pointColor green">3</em>/5</span>
				</strong>
			</div>
			<div class="terms_view">
				<div>
					<div class="terms_cont">
						<strong class="terms_tit">개인(신용)정보 제공 동의</strong>
							<p class="terms_txt">귀하는 개인(신용)정보 제공에 관한 동의를 거부하실 수 있습니다. 다만, 개인(신용)정보의 제공에 관한 동의는 본인신용정보 통합조회, 데이터분석 서비스, 마이데이터 서비스 가입 현황 안내 및 전송요구내역 통합조회 서비스 이용과 직접적으로 관련된 필수적 사항이므로 아래의 사항에 동의 하셔야만 본인신용정보 통합조회, 데이터분석 서비스, 마이데이터 서비스 가입 현황 안내 및 전송요구내역 통합조회 서비스의 제공이 가능합니다.</p>
						<dl>
							<dt>정보를 받는 곳</dt>
							<dd>
								<strong class="terms_txt_point">{{selOrgTxt}}</strong>
							</dd>
							<dt>목적</dt>
							<dd>
								<strong class="terms_txt_point">본인확인 및 개인(신용)정보의 전송</strong>
							</dd>
							<dt>보유 및 이용기간</dt>
							<dd>
								<strong class="terms_txt_point">본인확인 및 개인(신용)정보의 전송 목적 달성 시 까지</strong>
							</dd>
							<dt>제공 항목</dt>
							<dd>
								전자서명, CI, 인증서, 전송요구서
							</dd>
						</dl>
						<dl>
							<dt>정보를 받는 곳</dt>
							<dd>
								<strong class="terms_txt_point">한국신용정보원</strong>
							</dd>
							<dt>목적</dt>
							<dd>
								<strong class="terms_txt_point">마이데이터 서비스 가입 현황 안내 및 전송요구내역 통합조회 서비스 제공</strong>
							</dd>
							<dt>보유 및 이용기간</dt>
							<dd>
								<strong class="terms_txt_point">한국신용정보원의 마이데이터 서비스 가입 현황 안내 및 전송요구내역 통합조회 서비스 목적 달성 시 까지</strong>
							</dd>
							<dt>제공 항목</dt>
							<dd>
								회원 가입여부, 서비스 목록 수, 서비스 목록, 클라이언트ID, 전송요구내역수, 전송요구내역목록, 정보제공자 기관 코드, 권한 범위, 전송요구일자, 전송요구종료시점
							</dd>
						</dl>
					</div>
					<div class="custom_terms error mt50" :class="fn_chkEssentialAgr" ref="essentialAgr"><!-- 필수입력 미체크시 class error -->
						<div class="new_check_all">
							<span class="btn_check">
								<input type="checkbox" name="allagree" id="checkall_COAR2005" v-model="agreeProvideInfo" @change="fn_isEssentialChk()">
								<label for="checkall_COAR2005">
									<span>[필수] 개인(신용)정보 제공 동의</span>
								</label>
								<!-- <button type="button" class="btn_arrow">상세보기</button> -->
							</span>
						</div>

						<div class="error_message" aria-live="polite" ><!-- 10/05 jlee 접근성 수정 -->
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
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'

import apiService from '@/service/apiService'

import COAR2007 from '@/views/page/CO/AR/COAR2007/COAR2007.vue'  //자산연결 중 로딩화면

export default {
    name : "COAR2005",
    data: () => {
        return {
			selOrgTxt 		: "",	// 화면 표시 선택 기관 텍스트
			moduleList 		: [],	// 선택 기관 리스트
			userAgreeInfo 	: {},	// 고객 동의 정보
			isMramMod		: "",	// '연결기관 관리 변경'을 통해 넘어올 경우 falg 값 (1 : 연결자산관리 메인에서 변경, 2 : 만료예정 기관에서 만료일 변경)
			isOnlyPublic	: false,

			agreeProvideInfo 	: null,	// 개인(신용정보) 제공 동의
			chkEssentialAgr 	: null,	// 필수 동의정보 체크여부
			isFirstChk			: true,	// 다음버튼 첫 클릭 여부
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
			this.isOnlyPublic   = param.isOnlyPublic || false
			this.getData()
        },
        getData() {
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

			//선택한 기관에 공공기관이 포함된 경우 선택한 공공기관명과 행정안전부, 한국신용정보원 추가 노출
			if(this.moduleList.find(item => item.orgBzrgC === 'public')){
				if(this.moduleList.find(item => item.orgnm === '행정안전부')) tmpOrgnm += ", 한국신용정보원"
				else tmpOrgnm += ", 행정안전부, 한국신용정보원"
			}

			return tmpOrgnm
		},

		fn_moveNext() {
			// 첫 클릭 여부 false 변경
			this.isFirstChk = false

			// 필수 동의 여부 확인
			if(!this.agreeProvideInfo) {
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
				
				if(this.isOnlyPublic){
					const config = {
					component : COAR2007,
						params : {
							moduleList 		: this.moduleList,
							selectedCnt 	: this.moduleList.length,
							isOnlyPublic	: this.isOnlyPublic,
							publicOrgList : JSON.stringify(this.moduleList.map(item => {return {"org_code": item.orgC,"orgBzrgC" : item.orgBzrgC}})),
							isMramMod	  : this.isMramMod,
						}
					}

		
					modalService.openPopup(config).then(response => {
						console.log(response)
					})
				}else{
					// 동의 시 COAR2005, COAR2004 팝업 순차적으로 닫고 COAR2003으로 callback
					this.close("moveNext")
				}
				
			}
		},

		fn_isEssentialChk() {
			if(this.agreeProvideInfo) {
				this.chkEssentialAgr = true
			}
		},
		
    },
    components : {
    }
}


</script>