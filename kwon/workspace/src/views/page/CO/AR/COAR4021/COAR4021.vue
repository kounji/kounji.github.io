<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 금융자산 > 한번에 연결 > PASS 인증 확인
* @ 페이지설명 : 공통 > 자산연결 > 금융자산 > 한번에 연결 > PASS인증 정보 입력
* @ 파일명     : src/views/page/CO/AR/COAR4021/COAR4021.vue
* @ 작성자     : CS540685
* @ 작성일     : 2025-04-02
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-04-02              CS540685              상호금융 NH콕마이데이터 4.0 추진 개발
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1>PASS인증</h1>
			<a href="javascript:void(0);" role="button" @click.prevent="fn_close()" class="btn_back"><span class="blind">이전화면</span></a>
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<div class="custom_box custom_box_shadow border_no border_top_none custom_box_tit01 mt-16">
					<strong class="com_pop_tit01 custom">
						<em class="num">PASS</em> 인증서 사용을 위해<br/>
						인증해 주세요
					</strong>
				</div>
				<div class="custom_box">
					<!-- 이름 -->
					<div class="com_input_type01 com_word1">
						<input type="text" id="com_input01" value="" required="" placeholder="이름을 입력하세요" title="이름을 입력하세요" v-model="realName" maxlength="50"  ref="realName" @keyup="fn_btnMintOnOff()">
						<label for="com_input01">
							<span class="txt_label_x">이름</span>
						</label>
					</div>
					<!--// 이름 -->
				</div>
				
				<!-- 통신사 -->
				<div class="custom_box">
					<div class="custom_box">
					<div class="custom_check_list">
						<div class="tab_radio">
							<div class="btn_radio" @click="fn_radioCheck('S')">
								<input type="radio" name="radio01" id="radio1-1" aria-hidden="true">
								<label for="radio1-1" aria-checked="false" role="radio" >
									<span>SKT</span>
								</label>
							</div>
							<div class="btn_radio" @click="fn_radioCheck('K')">
								<input type="radio" name="radio01" id="radio1-2" aria-hidden="true">
								<label for="radio1-2" aria-checked="false" role="radio">
									<span>KT</span>
                  <!--서비스 지연 툴팁-->
									<div class="com_tooltip_type02 com_tooltip_type03 lg_noti" v-if="tooltipShow">
										<a href="javascript:void(0)" id="tooltip" class="com_btn_info fail_tip" role="button">
											<em class="com_icon_info3 bgred3"><span class="blind">툴팁열기</span></em>
										</a>
										<div class="com_ballon_type01 com_ballon_type02" style="left:-8.5rem">
											<div>
												<p class="title">서비스 중단 안내</p>
												KT전자서명인증시스템 개편에 따라 PASS 앱 사용 인증이 <em>2025년 2월 13일 04시부터 2월 13일 05시</em>까지 제한됩니다.
												<a href="javascript:void(0)" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
											</div>
										</div>
									</div>
									<!--//서비스 지연 툴팁-->
								</label>
							</div>
							<!-- LGU+ -->
							<div class="btn_radio">
							<!-- <div class="btn_radio" @click="this.fn_radioCheck('S')"> -->
								<input type="radio" name="radio01" id="radio1-3" @click="fn_radioCheck('L')" aria-hidden="true">
								<label for="radio1-3" aria-checked="false" role="radio" >
									<span>LGU+</span>
								</label>
							</div>
						</div>
					</div>
				</div>
				<!--// 통신사 -->

				</div>
				<div class="custom_box custom_box6">
					<!-- 휴대폰 번호 앞자리 -->
					<div class="com_inputarea_type07">
						<div class="com_btnselectbox_type01">
							<button type="button" class="com_btnselect_type01 com_iconstar" title="휴대폰 번호 앞자리를 입력하세요" @click.prevent="fn_openPhoneNum()"><span>{{phoneHeaderView}}</span></button>
						</div>
					</div>
					<!--// 휴대폰 번호 앞자리 -->
					<!-- 휴대폰 번호 box -->
					<div class="com_input_type01 com_word1 ipt_tel_left">
						<input type="tel" id="com_input03" value=""  required="" placeholder="휴대폰 번호 뒷자리를 입력하세요" title="휴대폰 번호 뒷자리를 입력하세요" maxlength="9" v-model="phoneBody" @keyup="chekNumber" ref="phoneBody" >
						<!-- 2022-09-14 : 김문용 부장님 요청으로 삭제 -->
						<!-- <label for="com_input03">
							<span class="txt_label_x">휴대폰 번호 뒷자리</span>
						</label> -->
					</div>
					<!--// 휴대폰 번호 box -->
				</div>
				<div class="custom_box">
					<!-- 안내문구 -->
					<p class="txt01 mt11">PASS 인증서 발급/재발급 등의 관리는 PASS 앱을 통해서 가능합니다.</p>
					<!--// 안내문구 -->
				</div>
				<div class="custom_box">
					<!-- PASS 인증서 이용안내 -->
					<div class="new_view_wrap">
						<a href="javascript:void(0);" role="button" class="view" @click.prevent="fn_openGuidePopup()">
							<em class="num">PASS</em> 인증서 이용안내<span class="ico_rightbar"></span>
						</a>
					</div>
					<!--// PASS 인증서 이용안내 -->
				</div>
			</div>
			<div class="popup_footer fixed">
				<!-- 활성화 버튼
				<div class="btn_full_box">
					<a href="javascript:void(0);" role="button" role="button" class="btn btn_mint">인증 요청</a>
				</div>
				-->
				<!-- 비활성화 버튼 -->
				<div class="btn_full_box">
					<!-- btn_off 제거시 활성화 -->
					<a href="javascript:void(0);" role="button" :class="btnMintOnOff" :aria-disabled="!fn_valueChekOnOff() ? 'true' : 'false'" @click.prevent="fn_certReq()">인증 요청</a>
				</div>
			</div>
			<a href="javascript:void(0);" role="button" class="btn_close gray" @click.prevent="fn_openAllCancel()"><span class="blind">팝업닫기</span></a>		
		</div>
	</div>
	<!--// full popup E -->
</template>
<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import {dateFormat} from '@/utils/date'

import _ from 'lodash'

import COAR2022 from '@/views/page/CO/AR/COAR2022/COAR2022'
import COAR2023 from '@/views/page/CO/AR/COAR2023/COAR2023' 
import COAR4024 from '@/views/page/CO/AR/COAR4024/COAR4024'
import COAR2026 from '@/views/page/CO/AR/COAR2026/COAR2026'

export default {
    name : "COAR4021",
    data: () => {
        return {
            consentList: [],
			endDate: "",

            com_check_pho   : "",
            realName        : "",
            comCheckPho     : "",      	// 통신사 구분 체크 값
            phoneHeader		: "+8210",  // 핸드폰 앞3자리
			phoneHeaderView	: "010",       
			phoneBody       : "",       // 핸드폰 번호
			btnMintOnOff	: "btn btn_mint btn_off",

			isLocal : window.location.host.indexOf('localhost') > -1 ? true : false,
        }       
    },
    computed: {
      tooltipShow() {
        const now = dateFormat(new Date(), 'YYYYMMDDHH')
        return (now == 2025021304)
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
    methods: {
        initComponent(params = {}) {
            this.consentList = params.consentList;
			this.endDate = params.endDate;

            this.getData();
        },

        getData() {
			
        },

        fn_openPhoneNum() {
            const config = {
                component : COAR2022,
                params : {
                    mydtCusno   : "",
                    sqno        : "",
                    isUpt       : "",
                }
            };
            
            config.renderer = this.modalConfig.renderer;
            modalService.openPopup(config).then(response => {
                this.phoneHeader = response;
				this.phoneHeaderView = response.replace('+82','0');
            })
        },

        fn_certReq() {
            let phone_num = this.phoneHeader + this.phoneBody.split("-").join("");
            let telco_tycd = this.comCheckPho;

			if (!this.fn_valueChek()) return;// 필수체크
			let name = "";
			if (this.realName != null && this.realName.length != 0) {
				name = String(this.realName).split(" ").join("");
			}

			const config = {
				component : COAR4024,
				params : {
					real_name: name,
					telco_tycd : telco_tycd,
					phone_num: phone_num,

					endDate: this.endDate,
					consentList: this.consentList,
				}
			};

			config.renderer = this.modalConfig.renderer

			modalService.openPopup(config).then(response => {
				this.$nextTick(() => {
					if (!_.isEmpty(response)) {
						if (response.resCode == "00000") {
							this.fn_close(response);
						} else {
							if (response.resCode == "40020"
								|| response.resCode == "40021"
								|| response.resCode == "40022"
								|| response.resCode == "40025"
								|| response.resCode == "40026"
								|| response.resCode == "40027"
								|| response.resCode == "40041"
								|| response.resCode == "50008") {
								this.fn_close();
							}
						}
					}
				})
			});
            
		},

		fn_openAllCancel() {
			const config = {
				component : COAR2023,
				params : {

				}
            };

            config.renderer = this.modalConfig.renderer;
            modalService.openPopup(config).then(response => {
			
				this.$nextTick(() => {
                    if (response === 'COAR2023') {
						this.fn_close();
					}
                });
            });
		},
 
        fn_valueChek() {
            let chekFlag = true;

            if (this.realName.length == 0 || this.realName.trim() == "") {
                modalService.alert("이름은 필수입력항목입니다.").then(() => {
                    this.$nextTick(() => {
                        this.$refs.realName.focus();
                    });
                    chekFlag = false;
				});
                return;
			}

            // 통신사 구분 필수 체크
            if (this.comCheckPho.length == 0 || this.comCheckPho.trim() == "") {
                modalService.alert("통신사 구분은 필수입력항목입니다.").then(() => {
                    chekFlag = false;
				});
                return;
			}

            // 핸드폰 번호 필수 체크
            if (this.phoneBody.length == 0 || this.phoneBody.trim() == "") {
                modalService.alert("핸드폰 번호는 필수입력항목입니다.").then(() => {
                    this.$nextTick(()=>{
                        this.$refs.phoneBody.focus();
                    })
                    chekFlag = false;
				});
                return;
			}
            return chekFlag;	
        },

        fn_radioCheck(flag) {// 체크 된 통신사 구분값  
			this.comCheckPho = flag;

            if(flag === "K" && this.tooltipShow){
                document.getElementById("tooltip").click();
                document.getElementById('radio1-2').checked = false;
                this.comCheckPho = "";
            }
			this.fn_btnMintOnOff();
        },

        fn_openGuidePopup() {// PASS 인증서 이용안내 COAR2026
            const config = {
                component : COAR2026,
                params : {
                    telco_tycd  : "",
                    phone_num   : "",   // 핸드폰 번호  
                }
            };

            // 슬라이드팝업 -> 팝업 호출 시 필수코드
            config.renderer = this.modalConfig.renderer;
            modalService.openPopup(config).then(response => {
                this.phoneHeader = response;
            })
        },

        // 숫자만 입력
        chekNumber(e) {
			const selectionStartPos = this.$refs.phoneBody.selectionStart;
			const selectionEndPos = this.$refs.phoneBody.selectionEnd;

			this.phoneBody = this.phoneBody.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'');
            
            let numTelNo = this.phoneBody.split("-").join("");
            if (numTelNo.length > 8) {
                this.phoneBody = this.phoneBody.slice(0, 8);
            }
            
            if (numTelNo.length == 8 || numTelNo.length == 7) {
                this.phoneBody = this.phoneBody.replace(/(\d{3,4})(\d{4}$)/, '$1-$2');
            } else {
                this.phoneBody = this.phoneBody.split("-").join("");
            }

            if (e.keyCode === 8) {
                this.$nextTick(()=>{
                    this.$refs.phoneBody.focus();
                    this.$refs.phoneBody.setSelectionRange(selectionStartPos,selectionEndPos);
                });
            }

			this.fn_btnMintOnOff();
		},

		fn_btnMintOnOff() {
			if(this.fn_valueChekOnOff()){
				this.btnMintOnOff = "btn btn_mint";
			}else{
				this.btnMintOnOff = "btn btn_mint btn_off";
			}
		},

		fn_valueChekOnOff() {
            let chekFlag = true;

            // 이름 항목 필수 체크
            if (this.realName.length == 0 || this.realName.trim() == "") {
                chekFlag = false;
                return;
			}

            // 통신사 구분 필수 체크
            if (this.comCheckPho.length == 0 || this.comCheckPho.trim() == "") {
                chekFlag = false;
                return;
			}

            // 핸드폰 번호 필수 체크
            if (this.phoneBody.length == 0 || this.phoneBody.trim() == "") {
                chekFlag = false;
                return;
			}
            return chekFlag;	
        },

		fn_close(response = {}) {
			this.close(response);
		},
    },

	destroyed() {
		
	}    
}
</script>