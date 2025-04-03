<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 마이농가설정 > 상각관리 > 내용년수 선택
* @ 페이지설명 : 내용년수 선택
* @ 파일명     : src/views/page/SZ/ST/SZST2114/SZST2114.vue
* @ 작성자     : CS523299
* @ 작성일     : 2021-08-06
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-06              CS523299                 
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>내용년수 선택</h1>
		</div>
		<div class="popup_content com_bg_type00">
            <div class="com_inner com_inputarea_type07">
				<div class="com_input_type01 new_mb15 com_word1">
					<input type="tel" id="com_input01" class="" name="" value="" required="" placeholder="내용년수를 입력해주세요."  title="내용년수를 입력해주세요" maxlength="2" v-model="cntnYrcn" @input="numberCheck" @keyup="numberCheck" ref="cntnYrcnRef">
					<label for="com_input01"><em><span class="blind">필수입력</span></em><span class="txt_label_x">내용년수</span></label>
					<div class="del_txt">
						<a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
						<span class="com_inputtxtright2">년</span>
					</div>
				</div>
				<p class="com_txtinfo_type01">내용년수는 등록 후 수정이 불가 합니다.</p>
			</div>
		</div>
		<div class="popup_footer fixed">
			<div class="btn_full_box">
                <!-- 20210930 기획수정 요청 선택을 확인으로 버튼명 변경 --> 
				<a href="javascript:void(0);" role="button" @click.prevent="fn_retCntnYrcn" class="btn btn_mint">확인</a>
			</div>
		</div>
		<a href="javascript:void(0);" role="button" @click.prevent="closePopup" class="btn_close"><span class="blind">팝업닫기</span></a>	<!-- X 버튼 -->
	</div>
	<!--// full popup E -->
</template>
<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import {keyupNumFormat} from '@/utils/number'

    export default {
        name : "SZST2114",
        data: () => {
            return {
                cntnYrcn    : ""
			}
		},
        mixins: [
            popupMixin,
            commonMixin
        ],
        mounted() {
			this.initComponent(this.params)
			//PFM로그 처리 화면접속이력 등록 POST
			apiService.pfmLogSend(this.$options.name)
			},
		methods: {
            initComponent(param = {}) {
                // console.log("SZST2114 param=", param)
				this.getData(param)
            },
            getData(param) {
                if(param[0] != null){
                    this.cntnYrcn = param[0].cntnYrcn
                }

                this.$nextTick(() => {
					this.$refs.cntnYrcnRef.focus()
				})
            },
            // 입력된 내용년수 세팅
            fn_retCntnYrcn() {

                if(this.cntnYrcn == null || this.cntnYrcn == '' || this.cntnYrcn.length == 0 || this.cntnYrcn == 0){
                    modalService.alert("내용년수는 1년이상<br> 입력되어야  합니다.").then(() => {// cntnYrcnRef
                        this.$nextTick(() => {
                            this.$refs.cntnYrcnRef.focus()	
                        })
                    })
                    return;
                }
                const data = {
                    cntnYrcn: this.cntnYrcn   
                }
                this.close(data)
            },
            // 숫자만 
            numberCheck(e) {
                this.cntnYrcn = keyupNumFormat(e.target.value.replace(/[^0-9]/g, '').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')) //숫자만 입력 가능하도록
            },
            //[닫기]버튼 클릭         
            closePopup() {
                this.close("cancel");
            }
        }
    }
</script>