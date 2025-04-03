<!--
/*************************************************************************
* @ 서비스경로 : 더보기 > 도움말(이벤트) > 이벤트 > 당첨자 발표 목록 > 당첨 조회
* @ 페이지설명 : 당첨 조회
* @ 파일명     : src/views/page/MR/EV/MREV2008/MREV2008.vue
* @ 작성자     : CS530689
* @ 작성일     : 2024-02-23
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2024-02-23              CS530689              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"><!-- 0803 .mydata2023 클래스 이동-->
		<div class="popup_header">
			<h1>당첨자 발표</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>		
		<div class="popup_content com_bg_type00 com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner win">
                <div class="event_list">
                    <div>										
                        <a href="javascript:void(0);">{{eventInfo.evtTinm}}</a>
                        <p>{{eventInfo.stDt | dateFilter('YYYY.MM.DD')}} ~ {{eventInfo.edDt | dateFilter('YYYY.MM.DD')}}</p>
                    </div>
                </div>
            </div>

			<div class="com_inner">
				<!--당첨자 조회-->
				<div class="enter_event_info" v-show="!win">
                    <strong class="titH1">당첨자 조회</strong>
                    <p class="desc">당첨자 조회는 이벤트 응모 시 입력한 성명, 전화번호를 입력하시면 확인 가능합니다.</p>
                </div>
				<div class="enter_event_info mt10" v-show="!win">					
					<div class="com_inputarea_type01">
                        <p class="title">이름</p>
                        <div class="com_input_type01 mt0">
                            <input type="text" id="inputName" class="" v-model="name" name="" required="" placeholder="" title="이름" readonly><div class="lineEF"></div>
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
				<!--//당첨자 조회-->
				
				<!--당첨 결과-->
				<div class="com_inner e_prize" v-show="win == '1'">
					<p>{{name}} 고객님, 당첨을 축하드립니다.</p>
				</div>

				<div class="com_inner e_fail" v-show="win == '0' || win == '2'">
					<p>{{name}} 고객님께서는 해당 이벤트에 당첨되지 않으셨습니다.<br />참여해주셔서 감사합니다.</p>
				</div>

				<!-- <div class="com_inner e_fail" v-show="win == '2'">
					<p>아쉽게도 {{name}} 고객님께서는 해당 이벤트에 <span class="pointColor red2">응모한 내역이 없습니다.</span> 응모정보를 다시 확인해주세요.</p>
				</div> -->
				<!--//당첨 결과-->

				<div class="help_box win" v-show="win == '1'" v-html="eventInfo.refCntnStlt"></div>
			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" class="btn btn_mint" @click="fn_searchWin">{{win ? '확인' : '조회'}}</a>
			</div>
		</div>
		<!--//당첨자 조회 버튼-->

		<!--//응모내역 없음-->
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
    name : "MREV2008",
    data: () => {
        return {
			mydtEvtSqno			: "",	// 이벤트 일련번호
			eventInfo			: [],	// 이벤트 정보
            name            	: "",   // 고객 이름
            telNo           	: "",   // 고객 전화번호
			frTelNo         	: "",   // 고객 통신사 앞자리번호
			bckTelNo			: "",	// 휴대전화 뒷자리번호
			win					: ""	// 당첨여부
        }
    },
	computed: {
		fn_chkValid() {
			let isName = this.name.length === 0
			let isTel = (this.frTelNo + this.bckTelNo).length < 10
				
			return isName || isTel
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
			//cbt관리자는 이름 수정 가능
			if(this.getUserInfo('tobeType')){
				document.getElementById("inputName").readOnly = false
			}
            this.getData()
        },

        getData() {
			// 초기 default 정보 set
			this.mydtEvtSqno = this.params.mydtEvtSqno
			this.name = this.getUserInfo("cusnm")
			this.frTelNo = "010"

			const config = {
				url: '/mr/ev/11r01', 
				data: {
					"mydtCusno" : this.getUserInfo('mydtCusno'),
					"mydtEvtSqno" : this.mydtEvtSqno,
				},
				// disableLoading : true,
			}
			apiService.call(config).then(res =>{
				console.log('res : ', res)
				this.eventInfo = res

				//엔티티코드로 들어올경우 textarea에 넣어서 변환
				if(this.eventInfo.refCntnStlt && this.eventInfo.refCntnStlt.indexOf("&lt;") > -1){
					let refCntnStltHtml = document.createElement("textarea");
					refCntnStltHtml.innerHTML = this.eventInfo.refCntnStlt
					this.eventInfo.refCntnStlt = refCntnStltHtml.value
				}
            })
		},

		// 휴대전화 뒷자리 입력 시 '-' 추가
		fn_addPhoneNum(event) {
			if(isNaN(event.target.value)){
				event.target.value = event.target.value.slice(0, -1)
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
		
		// 당첨 조회 및 확인
		fn_searchWin() {
			if(!this.win){
				if ((this.frTelNo + this.bckTelNo).length < 10) {
					modalService.alert("휴대전화번호를 확인해주세요.").then(() => {})
					return
				}

				const config = {
					url : "/mr/ev/13r01",
					data : {
						mydtEvtSqno : this.mydtEvtSqno,									// 이벤트 일련번호
						mydtCusno 	: this.getUserInfo("mydtCusno"),					// 마이데이터 고객번호
						name 		: this.name,										// 성명
						telno 		: this.frTelNo + this.bckTelNo.split("-").join(""),	// 휴대전화번호
					}
				}

				apiService.call(config).then(response => {
					console.log(response)
					if(response.rsp_code === "0000") {
						this.win = "1"
					} else if(response.rsp_code === "9998") {
						this.win = "2"
					} else {
						this.win = "0"
					}
				})
			}else{
				this.win = ""
			}
		}
        
    },
    components : {

    },
    destroyed() {
    }
}

</script>