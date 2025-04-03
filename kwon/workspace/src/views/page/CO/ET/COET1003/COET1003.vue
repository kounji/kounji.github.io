<!--
/*************************************************************************
* @ 서비스경로 : 부동산/관심부동산 등록 > 부동산 이벤트 응모
* @ 페이지설명 : 부동산 이벤트 응모
* @ 파일명     : src/views/page/CO/ET/COET1003/COET1003.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-09-08
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2022-09-08              CS528069              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>이벤트 응모</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner com_line_type01 com_top_type02">
				<strong class="com_pop_tit01">
					NH콕마이데이터 리뉴얼 기념 이벤트
				</strong>
				<div class="com_txt2">
					입력한 응모정보는 당첨 결과 조회에 필요합니다.<br/>정확히 입력해 주세요.
				</div>
			</div>
			<div class="com_inner">
				<strong class="com_box_tit">이벤트 응모정보</strong>
				<div class="com_input_type01 com_word1">
					<input type="text" id="com_input01" v-model="name" required="" placeholder="이름을 입력하세요" title="이름을 입력하세요" readonly>
					<!-- <label for="com_input01">
						<span class="txt_label_x">이름</span>
					</label> -->
				</div>
				<div class="custom_box custom_box6">
					<!-- 휴대폰 번호 앞자리 -->
					<div class="com_inputarea_type07">
						<div class="com_btnselectbox_type01">
							<button type="button" class="com_btnselect_type01 com_iconstar" title="휴대폰 번호 앞자리를 입력하세요" @click="fn_selFrontNum()"><span>{{frTelNo}}</span></button>
						</div>
					</div>
					<!--// 휴대폰 번호 앞자리 -->
					<!-- 휴대폰 번호 box -->
					<div class="com_input_type01 com_word1 ipt_tel_left">
						<input type="tel" id="com_input03" v-model="bckTelNo" ref="bckTelNo" @keyup="fn_addPhoneNum($event)" required="" placeholder="휴대폰 번호 뒷자리를 입력하세요" title="휴대폰 번호를 입력하세요" maxlength="9">
						<!-- <label for="com_input03">
							<span class="txt_label_x">휴대폰 번호 뒷자리</span>
						</label> -->
					</div>
					<!--// 휴대폰 번호 box -->
				</div>
				<div class="terms_scroll_box">
					<div class="terms_cont">
						<strong class="terms_tit">[개인정보 수집ㆍ이용 동의서]</strong>
						<div class="terms_txt">
							농업협동조합중앙회 귀중<br/>『NH콕마이데이터 신규서비스 오픈 기념 이벤트』 (이하 “이벤트”라 합니다)를 위하여 본인의 개인정보를 수집·이용하는 경우에는 「개인정보 보호법」 등 관련 법령에 따라 본인의 동의가 필요합니다. 아래의 개인정보 수집·이용에 대한 내용을 자세히 읽어 보신 후 동의 여부를 결정하여 주시기 바랍니다.
						</div>
						<dl>
							<dt>개인정보의 수집 · 이용에 관한 사항</dt>
							<dd>
								<ul class="bl_dot_list">
									<li>
										<strong>수집·이용 목적</strong>
										<div class="sub_box">이벤트 응모자 접수, 당첨자 선정, 경품 지급</div>
									</li>
									<li>
										<strong>수집·이용 항목</strong>
										<div class="sub_box">성명, 휴대전화번호</div>
									</li>
									<li>
										<strong>보유·이용기간</strong>
										<div class="sub_box">위 개인정보는 수집·이용에 관한 동의일로부터 경품 발송 완료 후 1개월까지 위 이용 목적만을 위하여 보유·이용됩니다. 미당첨자의 개인정보는 그 즉시 파기됩니다.</div>
									</li>
									<li>
										<strong>동의를 거부할 권리 및 그에 따른 불이익 </strong>
										<div class="sub_box">위 개인정보의 수집·이용에 관한 동의는 거부하실 수 있으며, 동의 후에도 언제든지 철회 가능합니다. 다만, 동의하지 않은 경우 이벤트 참여 및 경품 지급이 불가합니다.</div>
									</li>
								</ul>
							</dd>
						</dl>
					</div>
				</div>
				<div class="new_check_all">
					<span class="btn_check">
						<input type="checkbox" name="allagree" id="check_coet1003" v-model="agreePersonalInfo" @change="fn_isEssentialChk()">
						<label for="check_coet1003">
							<span>[필수] 개인정보 수집·이용에 동의함</span>
						</label>
						<!-- <button type="button" class="btn_arrow">상세보기</button> -->
					</span>
				</div>

				<div class="com_box_type01 toggle_list_box2 custom_list mt50">
					<div data-ui-toggle="box" class="toggle_box_area open">
						<button type="button" class="view_btn" aria-expanded="true">
							<div class="new_tit_area">
								<div class="tit"><span>유의사항</span></div>
							</div>
							<em class="open">열기</em>
							<em class="close">닫기</em>
						</button>
					</div>
					<div class="view_cont">
						<ul class="bl_dot_list">
							<li>
								NH콕마이데이터 회원 중 이벤트 기간 응모 고객에 한해 추첨합니다.
							</li>
							<li>
								경품은 동일 금액의 다른 상품으로 변경될 수 있으며, 당첨자 발표 및 경품 발송 일정은 변경 될 수 있습니다.
							</li>
							<li>
								기타 자세한 내용은 가까운 영업점 또는 고객 행복센터(1661-2100)로 문의하시기 바랍니다.
							</li>
						</ul>
					</div>
				</div>
			</div>
			
		</div>
		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" role="button" class="btn btn_mint" :class="fn_chkValid" :aria-disabled="fn_chkValid === 'btn_off' ? 'true' : 'false'" @click.prevent="fn_regEvent($event)">응모하기</a><!-- 비활성화 class btn_off -->
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click="closeAllData('refresh')"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
// import commonService from '@/service/commonService'
import {mapActions} from 'vuex'

import COAR2022 from '@/views/page/CO/AR/COAR2022/COAR2022'

export default {
    name : "COET1003",
    data: () => {
        return {
            name            	: "",   // 고객 이름
            telNo           	: "",   // 고객 전화번호
			frTelNo         	: "",   // 고객 통신사 앞자리번호
			bckTelNo			: "",	// 휴대전화 뒷자리번호
			
			agreePersonalInfo 	: false,	// 개인정보 수집.이용 동의 여부
            chkEssentialAgr 	: "",   	// 필수 동의 체크 여부
        }
    },
	computed: {
        fn_chkEssentialAgr() {
			return !this.agreePersonalInfo ? 'error' : ''
		},
		fn_chkValid() {
			let isName = this.name.length > 0 ? true : false
			let isTel = this.bckTelNo.split("-").join("").length > 6 ? true : false
			let isEssentialAgr = this.agreePersonalInfo ? true : false

			return (isName && isTel && isEssentialAgr) ? "" : "btn_off"
		}
    },
    mounted() {
        this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        ...mapActions('myassets', [
            'getMyBizRegInfo','getAllMyAssetInfo'
        ]),
        initComponent(param = {}) {
            console.log(param)

            this.getData()
        },

        getData() {
            // 초기 default 정보 set
			this.name = this.getUserInfo("cusnm")
			this.frTelNo = "010"
		},

		// 휴대전화 뒷자리 입력 시 '-' 추가
		fn_addPhoneNum(e="") {
			const selectionStartPos = this.$refs.bckTelNo.selectionStart
			const selectionEndPos = this.$refs.bckTelNo.selectionEnd

			this.bckTelNo = this.bckTelNo.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')

			let numTelNo = this.bckTelNo.split("-").join("")
			if(numTelNo.length > 8) {
				this.bckTelNo = this.bckTelNo.slice(0, 11)
			}
			if(numTelNo.length === 8 || numTelNo.length === 7) {
				this.bckTelNo = this.bckTelNo.replace(/(\d{3,4})(\d{4}$)/, '$1-$2')
			} else {
				this.bckTelNo = this.bckTelNo.split("-").join("")
			}

			if(e.keyCode === 8) {
				this.$nextTick(() => {
					this.$refs.bckTelNo.focus()
					this.$refs.bckTelNo.setSelectionRange(selectionStartPos, selectionEndPos)
				})
			}
		},

		// 휴대전화 앞자리 슬라이드 오픈
		fn_selFrontNum() {
			const config = {
				params : {},
				renderer : {
					component : COAR2022
				}
			}
			modalService.openSlidePagePopup(config).then(response => {
				this.frTelNo = response || "010"
			})
		},
		
		// 필수 동의 정보 체크 여부 확인
		fn_isEssentialChk() {
			if(this.agreePersonalInfo) {
				this.chkEssentialAgr = true
			}
		},

		// 이벤트 응모 진행
		fn_regEvent(evt) {
			if(evt.target.className.indexOf("btn_off") > -1) return

			const config = {
				url : "/co/et/01sa1",
				data : {
					mydtCusno 	: this.getUserInfo("mydtCusno"),					// 마이데이터 고객번호
					name 		: this.name,										// 성명
					telNo 		: this.frTelNo + this.bckTelNo.split("-").join(""),	// 휴대전화번호
					psnInfAgrYn : this.agreePersonalInfo ? "1" : "0",				// 개인정보 수집.이용 동의 여부
				}
			}
			console.log(config)
			apiService.call(config).then(response => {
				console.log(">>> ", response)
				// const config = {
				// 	name : "ANRE1001"
				// }
				if(response.rsp_code === "9998") {
					modalService.alert("이미 응모하셨습니다.").then(() => {
						// commonService.movePage(config)
						this.closeAll('refresh')
					})
				} else if(response.rsp_code === "9999") {
					modalService.alert("응모 기간이 아닙니다.").then(() => {
						// commonService.movePage(config)
						this.closeAll('refresh')
					})
				} else if(response.rsp_code === "0001") {
					modalService.alert("응모 과정에서 오류가 발생하였습니다.").then(() => {
						// commonService.movePage(config)
						this.closeAll('refresh')
					})
				} else if(response.rsp_code === "0000") {
					modalService.alert("응모가 완료되었습니다.").then(() => {
						// commonService.movePage(config)
						this.closeAll('refresh')
					})
				}
			})
		}
        
    },
    components : {

    },
    destroyed() {
        this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>