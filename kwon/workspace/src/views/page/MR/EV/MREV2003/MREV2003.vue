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
	<div class="full_popup renewal mydata2023" id="full_popup_01"><!-- 0803 .mydata2023 클래스 이동-->
		<div class="popup_header">
			<h1></h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<div class="enter_event_info">
					<strong class="titH1">응모 정보를 입력해 주세요</strong>
					<p class="desc">당첨 결과 조회 시 입력한 이름, 휴대전화번호로 확인 하실 수 있습니다.</p>

					<div class="com_inputarea_type01">
						<div class="com_input_type01">
							<input type="text" id="com_input01" class="" :value="name" name="" required="" placeholder="" title="이름" readonly><div class="lineEF"></div>
							<label for="com_input01"><span class="txt_label_x">이름</span></label>
							<div class="del_txt">
								<a href="javascript:void(0);" class="com_btn_delete2" role="button" style="display: none;"><span class="blind">삭제</span></a>
							</div>
						</div>						
					</div>

					<div class="event_tel">
						<p class="title">휴대전화번호</p>
						<div class="custom_box custom_box6">						
							<!-- 휴대폰 번호 앞자리 -->
							<div class="com_inputarea_type07">
								<div class="com_btnselectbox_type01">
									<button type="button" class="com_btnselect_type01" title="휴대폰 번호 앞자리를 입력하세요" @click="fn_selFrontNum()">
										{{frTelNo}}
										<!-- <span>010</span> -->
									</button>
								</div>
							</div>
							<!--// 휴대폰 번호 앞자리 -->
							<div class="com_input_type01 com_word1 ipt_tel_left">
								<input type="tel" id="com_input03" v-model="bckTelNo" value="" @keyup="fn_addPhoneNum($event)" required="" placeholder="‘-’없이 입력" title="휴대폰 번호를 입력하세요" maxlength="8"><div class="lineEF"></div>
								<!-- <label for="com_input03">
									<span class="txt_label_x">휴대폰 번호 뒷자리</span>
								</label> -->
							</div>
							<!--// 휴대폰 번호 box -->
						</div>
					</div>
				</div>
				
		
				<div class="enter_event_terms">
					<strong class="titH3">이벤트 응모를 위한 약관 동의</strong>

					<div class="com_box_type01">
						<strong class="terms_tit">개인정보 수집·이용 동의서 [필수]</strong>
						<strong class="terms_sub_tit">[ NH콕마이데이터 「웰컴백 이벤트」 ]</strong>
						<div class="terms_txt">
							농업협동조합중앙회(이하 “농협중앙회” ) 귀중<br>
							농협중앙회와의 NH콕마이데이터 「웰컴백 이벤트」(이하 “이벤트”라 합니다)와 관련하여 본회가 본인의 개인정보를 수집·이용하고자 하는 경우에는 「개인정보 보호법」 등 관계 법령에 따라 본인의 동의가 필요합니다.
						</div>
						<dl>
							<dt>개인정보의 수집&middot;이용에 관한 사항</dt>
							<dd>
								<ul class="bl_dot_list">
									<li>
										<strong>수집&middot;이용 목적</strong>
										<p class="sub_box">이벤트 참여자 접수, 당첨자 선정, 경품 지급</p>
									</li>
									<li>
										<strong>보유 및 이용기간</strong>
										<p class="sub_box">
											수집&middot;이용 동의일로부터 경품 발송 완료 후 1개월까지 보유&middot;이용되며, 수집 및 이용 목적이 달성된 후에는 해당 정보를 파기합니다. 단, 당첨자 선정 후 미당첨자의 개인정보는 즉시 파기됩니다.<br>
											* 보유 및 이용기간 종료일 후에는 법령상 의무 이행이 필요한 경우 「개인정보 보호법」 제21조제3항에 따라 다른 개인정보와 분리하여 저장·관리될 수 있습니다.
										</p>
									</li>
									<li>
										<strong>거부 권리 및 불이익</strong>
										<p class="sub_box">귀하는 동의를 거부하실 수 있습니다. 다만, 위 개인정보 수집·이용에 관한 동의는 이벤트 참여를 위한 필수적 사항이므로 위 사항에 동의하셔야만 이벤트 참여 및 경품지급이 가능합니다.</p>
									</li>
									<li>
										<strong>수집&middot;이용 항목</strong>
										<p class="sub_box">성명, 휴대전화번호, 이벤트 기간 내 NH콕마이데이터 접속 횟수</p>
									</li>
								</ul>
							</dd>
						</dl>
					</div>

					<div :class="`custom_terms ${!agreePersonalInfo ? 'error' : ''}`"><!-- 필수입력 미체크시 class error -->
						<div class="new_check_all">
							<span class="btn_check">
								<input type="checkbox" name="allagree" id="checkall" v-model="agreePersonalInfo" @change="fn_isEssentialChk()">
								<label for="checkall">
									<span>[필수] 개인정보 수집&middot;이용 동의</span>
								</label>
							</span>
	
							<div class="error_message">
								<em class="blind">개인(신용)정보 수집 이용 동의 약관</em>
								<p>체크해 주세요</p>
							</div>
						</div>
					</div>
				</div>
				
				
			</div>
			
		</div>
		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" :disabled="fn_chkValid" :aria-disabled="fn_chkValid" :class="`btn btn_mint ${fn_chkValid ? 'btn_off' : ''}`" role="button" @click.prevent="fn_regEvent($event)">응모하기</a>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click="close('refresh')"><span class="blind">팝업닫기</span></a>
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

import MREV2004 from '@/views/page/MR/EV/MREV2004/MREV2004'

export default {
    name : "MREV2003",
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
			let isName = this.name.length === 0
			let isTel = (this.frTelNo + this.bckTelNo).length < 10
			let isEssentialAgr = !this.agreePersonalInfo
				
			return isName || isTel || isEssentialAgr
		},
		
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
		fn_addPhoneNum() {
			this.bckTelNo = this.bckTelNo.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')

			let numTelNo = this.bckTelNo.split("-").join("")
			if(numTelNo.length > 8) {
				this.bckTelNo = this.bckTelNo.slice(0, 11)
			}
		},

		// 휴대전화 앞자리 슬라이드 오픈
		fn_selFrontNum() {
			const config = {
				params : {},
				renderer : {
					component : MREV2004
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
		fn_regEvent() {
			if ((this.frTelNo + this.bckTelNo).length < 10) {
				modalService.alert("휴대전화번호를 확인해주세요.").then(() => {})
				return
			}
			if(!this.agreePersonalInfo) {
				modalService.alert("개인정보 수집 이용 동의는 필수 입니다.").then(() => {})
				return
			}

			const config = {
				url : "/mr/ev/03s01",
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
						this.close('refresh')
					})
				} else if(response.rsp_code === "9999") {
					modalService.alert("응모 기간이 아닙니다.").then(() => {
						// commonService.movePage(config)
						this.close('refresh')
					})
				} else if(response.rsp_code === "0001") {
					modalService.alert("응모 과정에서 오류가 발생하였습니다.").then(() => {
						// commonService.movePage(config)
						this.close('refresh')
					})
				} else if(response.rsp_code === "0000") {
					modalService.alert("응모가 완료되었습니다.").then(() => {
						// commonService.movePage(config)
						this.close('refresh')
					})
				}
			})
		}
        
    },
    components : {

    },
    destroyed() {
    }
}

</script>