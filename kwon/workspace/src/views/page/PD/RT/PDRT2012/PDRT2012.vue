<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 상품추천 > 은퇴력진단
* @ 페이지설명 : 금융과생활 > 상품추천 > 은퇴력진단 > step 3. 은퇴정보입력(필요자금) 연의료비
* @ 파일명     : src\views\page\PD\RT\PDRT2012\PDRT2012.vue
* @ 작성자     : CS533541
* @ 작성일     : 2023-07-17  
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-17              CS533541              최초작성(PDRT1008.vue -> PDRT2012.vue)
*************************************************************************/
-->
<template>
    <div>
        <!-- 슬라이드 팝업 시작 -->
	<div class="dimmed" style="display: block;"></div>
	<div class="popup_box renewal mydata2023">
		<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
			<div class="popup_header">
				<strong class="com_pop_tit01">연간 의료비 목표</strong>
			</div>
			<div class="popup_content com_btn_bottom">
				<div class="radio_list noLine">
					<div class="btn_radio">
						<input type="radio" name="radio03" id="radio3-1" :checked="retYyMdcAm == chkMdcAm01 ? 'checked' : ''" @click.prevent="fn_chkMdcAm(chkMdcAm01)">
						<label for="radio3-1"><em>{{chkMdcAm01 | numberFilter}}</em>만원으로 절약하며 진료</label>
					</div>
					<div class="btn_radio">
						<input type="radio" name="radio03" id="radio3-2" :checked="retYyMdcAm == chkMdcAm02 ? 'checked' : ''" @click.prevent="fn_chkMdcAm(chkMdcAm02)">
						<label for="radio3-2"><em>{{chkMdcAm02 | numberFilter}}</em>만원으로 안정적인 진료</label>
					</div>
					<div class="btn_radio">
						<input type="radio" name="radio03" id="radio3-3" :checked="retYyMdcAm == chkMdcAm03 ? 'checked' : ''" @click.prevent="fn_chkMdcAm(chkMdcAm03)">
						<label for="radio3-3"><em>{{chkMdcAm03 | numberFilter}}</em>만원으로 여유로운 진료</label>
					</div>
				</div>
				<hr>
				<strong class="com_box_tit">목표한 다른 연간 진료비가 있나요?</strong>
				<div class="com_input_type01 input_title_type">
					<label for="com_input01">의료비 직접 입력</label>
					<input type="tel" id="com_input01" class="com_txtright_type02" name="" value="" required="" placeholder="" title="의료비 금액입력"
                    :class="retYyMdcAmInp.length > 0 && foc_mdcAm ? 'focusON focusforce' : ''" maxlength="5" v-model="retYyMdcAmInp"
                    @focus="fn_focusOnOff()" @keyup="fn_chkAm()" @input="fn_chkAm()">

					<div class="del_txt">
						<a href="javascript:void(0);" class="com_btn_delete2"><span class="blind" v-if="retYyMdcAmInp.length > 0" @click.prevent="fn_delAm()">삭제</span></a>
						<span class="com_inputtxtright2">만원</span>
					</div>
				</div>
				<strong class="com_txt_sub01 com_point_red" v-if="!flag_show && flag_fisrt">50만원~5000만원 사이에서 입력 가능합니다.</strong>
				<p class="com_txtinfo_type01">생명보험협회 1인 연간 평균 진료비 기준</p>
			</div>
			<div class="popup_footer">
				<div class="btn_box">
					<a href="javascript:void(0);" class="btn btn_mint" :class="flag_show ? '' : 'btn_off'" @click.prevent="flag_show ? fn_amInputBtn() : ''">확인</a>
				</div>
			</div>
			<a href="javascript:void(0);" role="button" class="btn_close" v-on:click.prevent="close()"><span class="">취소</span></a>
		</div>
	</div>
	<!--// 슬라이드 팝업 종료 -->
    </div>
</template>

<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    // import modalService from '@/service/modalService'
    import {keyupNumFormat} from '@/utils/number'

    export default {
        name : "PDRT2012",
        data: () => {
            return {
                chkMdcAm01    : "300", // 최소진료비
                chkMdcAm02    : "490", // 평균진료비
                chkMdcAm03    : "600", // 여유진료비

                retYyMdcAm    : "",    // 은퇴 후 의료비(연간)
                retYyMdcAmInp : "",    // 은퇴 후 의료비(연간) - 직접입력

                nextStepYn    : false,
                foc_mdcAm     : false,

                flag_show     : false, // 최소 최대값 입력 flag
                flag_fisrt    : false, // 범위 외 입력 노출 문구 flag
            }
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        mounted() {
            this.initComponent(this.params);

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        methods: {
            initComponent(param) {
                this.retYyMdcAm = param.retYyMdcAm;
                this.nextStepYn = param.retYyMdcAm != "" ? true : false;

                if (param.retYyMdcAm != this.chkMdcAm01 &&
                    param.retYyMdcAm != this.chkMdcAm02 &&
                    param.retYyMdcAm != this.chkMdcAm03)
                {
                    this.retYyMdcAmInp = param.retYyMdcAm;
                    this.retYyMdcAm    = "";
                    this.foc_mdcAm     = true;

                    if(this.retYyMdcAmInp >= 50 && this.retYyMdcAmInp <= 5000) {
                        this.flag_show = true
                    }
                }
            },
            fn_chkMdcAm(mdcAm) {
                this.retYyMdcAm = mdcAm;
                this.nextStepYn = true;
                this.foc_mdcAm  = false;

                this.close(this.retYyMdcAm);
            },
			// input 클릭 시 focus 관련
			fn_focusOnOff() {
                this.retYyMdcAm = "";
				this.foc_mdcAm  = true;
            },
            fn_chkAm() {
                this.flag_fisrt = true
                
                if(this.retYyMdcAmInp.length == 1 && this.retYyMdcAmInp == 0) {
                    this.retYyMdcAmInp = this.retYyMdcAmInp.slice(0, -1)
                } else {
                    this.retYyMdcAmInp = this.retYyMdcAmInp.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                    this.retYyMdcAmInp = Number(this.retYyMdcAmInp.split(",").join(""))
                    
                    if (this.retYyMdcAmInp.length > 6) {
                        this.retYyMdcAmInp = this.retYyMdcAmInp.slice(0, -1)
                    }
                    this.retYyMdcAmInp = keyupNumFormat(this.retYyMdcAmInp.toString())
                }

                let chkAm = Number(this.retYyMdcAmInp.split(",").join(""));
                if (chkAm < 50 || chkAm > 5000) {
                    this.flag_show = false
                } else {
                    this.flag_show = true
                }
            },
            fn_delAm() {
                this.retYyMdcAmInp = "";
            },
            fn_amInputBtn() {
                if(this.flag_show == true) {
                   this.close(this.retYyMdcAmInp);
                }
            }
        }
    }
</script>