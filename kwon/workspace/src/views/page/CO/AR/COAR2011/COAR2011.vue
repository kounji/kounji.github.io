<!--
/*************************************************************************
* @ 서비스경로 : 자산연결 > 금융자산 > 한번에 > 공동인증서 약관 동의
* @ 페이지설명 : 공동인증서 약관 동의
* @ 파일명     : src/views/page/CO/AR/COAR2011/COAR2011.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-08-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-18              CS528069              최초작성
* 2023-08-04              CS533459              상호금융 마이데이터 확대개발 반영
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;" @click.prevent="closeSlide()"></div>
        <div class="popup_box renewal mydata2023">
        <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                   <strong class="com_pop_tit01">{{certDsc === "joint" ? '공동인증서' : '금융인증서' }} 인증을 위해<br>동의해 주세요</strong>
                </div>

                <div class="popup_content com_btn_bottom">
                    <div class="custom_terms">
                        <div class="new_check_all">
                            <span class="btn_check">
                                <input type="checkbox" name="allagree" id="checkall_COAR2011" ref="termAgreeAll" @click="fn_termAgreeAll($event)">
                                <label for="checkall_COAR2011">
                                    <span>필수 약관 전체 동의</span>
                                </label>
                            </span>
                        </div>
                    </div>
                    <div class="custom_terms noBorder">
                        <ul class="new_agree_list">
                            <li>
                                <span class="btn_check">
                                    <input type="checkbox" name="agree" id="check01_COAR2011" @click="fn_termAgreePer()" ref="agreePer1" value="agree1">
                                    <label for="check01_COAR2011">
                                        <span>인증서 본인확인서비스</span>
                                    </label>
                                    <button type="button" class="btn_arrow" @click="fn_termDtl(1)">상세보기</button>
                                </span>
                            </li>
                            <li>
                                <span class="btn_check">
                                    <input type="checkbox" name="agree" id="check02_COAR2011" @click="fn_termAgreePer()" ref="agreePer2" value="agree2">
                                    <label for="check02_COAR2011">
                                        <span>개인정보 처리</span>
                                    </label>
                                    <button type="button" class="btn_arrow" @click="fn_termDtl(2)">상세보기</button>
                                </span>
                            </li>
                            <li>
                                <span class="btn_check">
                                    <input type="checkbox" name="agree" id="check03_COAR2011" @click="fn_termAgreePer()" ref="agreePer3" value="agree3">
                                    <label for="check03_COAR2011">
                                        <span>고객식별정보 수집이용 및 위탁</span>
                                    </label>
                                    <button type="button" class="btn_arrow" @click="fn_termDtl(3)">상세보기</button>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="popup_footer">
                    <div class="btn_box">
                        <a href="javascript:void(0);" class="btn btn_mint" :class="btnView" @click.prevent="fn_moveNextStep()">동의하고 다음</a>
                    </div>
                </div>
                
                <a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="closeSlide()"><span class="">닫기</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>

<script>
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'

    import COAR2017 from '@/views/page/CO/AR/COAR2017/COAR2017.vue'

    export default {
        name: 'COAR2011',
        data: () => {
            return {
                btnViewYn : false,  // 다음버튼 활성화 여부
                certDsc : "",
            }
        },
        computed: {
            btnView() {
                return this.btnViewYn ? "btn_mint" : "btn_off"
            }
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        created() {
            
        },
        mounted() {
            this.initComponent(this.params)
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        methods: { 
            initComponent(param = {}) {
               this.certDsc = param.certDsc
               this.getData()
            },
            getData() {
                // default 전체선택상태
                this.$refs.termAgreeAll.click()
            },

            /*
             * 필수약관 전체동의
             */
            fn_termAgreeAll(event) {
                if(event.target.checked) {
                    this.$refs.agreePer1.checked = true
                    this.$refs.agreePer2.checked = true
                    this.$refs.agreePer3.checked = true
                    this.btnViewYn = true
                } else {
                    this.$refs.agreePer1.checked = false
                    this.$refs.agreePer2.checked = false
                    this.$refs.agreePer3.checked = false
                    this.btnViewYn = false
                }
            },

            // 개별 약관 동의
            fn_termAgreePer() {
                // 전체 필수 약관 동의 확인
                if(this.$refs.agreePer1.checked && this.$refs.agreePer2.checked && this.$refs.agreePer3.checked) {
                    this.$refs.termAgreeAll.checked = true
                    this.btnViewYn = true
                } else {
                    this.$refs.termAgreeAll.checked = false
                    this.btnViewYn = false
                }
            },

            // 개별 약관 상세 오픈
            fn_termDtl(flag) {
                let title   = ""    // 약관 제목
                let url     = ""    // 약관 url

                if(flag === 1){
                    title = "인증서 본인 확인 서비스 이용약관"
                    url="https://www.mydatacert.org/mydata/terms.html"                
                }else if(flag === 2){
                    title="개인정보 처리 동의"
                    url="https://www.mydatacert.org/mydata/privacy_agreement.html"
                }else{
                    title="고객식별정보 수집·이용 및 위탁 동의"
                    url="https://www.mydatacert.org/mydata/consignment_agreement.html"
                }

                const config = {
                    component : COAR2017,
                    params : {
                        title   : title,
                        url     : url
                    }
                }
                //슬라이드팝업에서 풀팝업을 부르기 위한 오류 수정 (필수)
				config.renderer = this.modalConfig.renderer
                modalService.openPopup(config).then(response => {
                    if(response === "agree") {
                        if(flag === 1) {
                            if(!this.$refs.agreePer1.checked) this.$refs.agreePer1.click()
                        } else if(flag === 2) {
                            if(!this.$refs.agreePer2.checked) this.$refs.agreePer2.click()
                        } else if(flag === 3) {
                            if(!this.$refs.agreePer3.checked) this.$refs.agreePer3.click()
                        }
                    }
                })
            },

            // 동의하고 다음 프로세스 오픈
            fn_moveNextStep() {
                this.close("OK")
            },

            /* 슬라이드 팝업 닫기 */
            closeSlide() {
                this.close()
            },
            
        },
        components: {      
            
        },
    }
    
</script>