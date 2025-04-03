<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 상품추천 > 은퇴력진단
* @ 페이지설명 : 금융과생활 > 상품추천 > 은퇴력진단 > step 3. 은퇴정보입력(필요자금) 월생활비
* @ 파일명     : src\views\page\PD\RT\PDRT2011\PDRT2011.vue
* @ 작성자     : CS533541
* @ 작성일     : 2023-07-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-17              CS533541             최초작성(PDRT1007 -> PDRT2011)
*************************************************************************/
-->
<template>
    <div>
    <!-- 슬라이드 팝업 시작 -->
	<div class="dimmed" style="display: block;"></div>
	<div class="popup_box renewal mydata2023">
		<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
			<div class="popup_header">
				<strong class="com_pop_tit01">은퇴 후 월 생활비 목표</strong>
			</div>
			<div class="popup_content com_btn_bottom">
				<div class="radio_list noLine">
					<div class="btn_radio">
						<input type="radio" name="radio03" id="radio3-1" :checked="retMmLivAm == chkLivAm01 ? 'checked' : ''" @click.prevent="fn_chkLivAm(chkLivAm01)">
						<label for="radio3-1"><em>{{chkLivAm01 | numberFilter}}</em>만원으로 절약하며 생활</label>
					</div>
					<div class="btn_radio">
						<input type="radio" name="radio03" id="radio3-2" :checked="retMmLivAm == chkLivAm02 ? 'checked' : ''" @click.prevent="fn_chkLivAm(chkLivAm02)">
						<label for="radio3-2"><em>{{chkLivAm02 | numberFilter}}</em>만원으로 안정적인 생활</label>
					</div>
					<div class="btn_radio">
						<input type="radio" name="radio03" id="radio3-3" :checked="retMmLivAm == chkLivAm03 ? 'checked' : ''" @click.prevent="fn_chkLivAm(chkLivAm03)">
						<label for="radio3-3"><em>{{chkLivAm03 | numberFilter}}</em>만원으로 여유로운 생활</label>
					</div>
					<div class="btn_radio">
						<input type="radio" name="radio03" id="radio3-4" :checked="retMmLivAm == chkLivAm04 ? 'checked' : ''" @click.prevent="fn_chkLivAm(chkLivAm04)">
						<label for="radio3-4"><em>{{chkLivAm04 | numberFilter}}</em>만원으로 풍요로운 생활</label>
					</div>
				</div>
				<hr>
				<strong class="com_box_tit">목표한 다른 생활비가 있나요?</strong>
				<div class="com_input_type01 input_title_type">
					<label for="com_input01">생활비 직접 입력</label>
					<input type="tel" id="com_input01" class="com_txtright_type02" name="" value="" required="" placeholder="" title="생활비 금액입력"
                    :class="retMmLivAmInp.length > 0 && foc_livAm ? 'focusON focusforce' : ''" maxlength="5" v-model="retMmLivAmInp" 
                    @focus="fn_focusOnOff()" @keyup="fn_chkAm()" @input="fn_chkAm()">

					<div class="del_txt">
						<a href="javascript:void(0);" class="com_btn_delete2" v-if="retMmLivAmInp.length > 0" @click.prevent="fn_delAm()"><span class="blind">삭제</span></a>
						<span class="com_inputtxtright2">만원</span>
					</div>
				</div>
				<strong class="com_txt_sub01 com_point_red" v-if="!flag_show && flag_fisrt">124만원~1000만원 사이에서 입력 가능합니다.</strong>
				<p class="com_txtinfo_type01">국민연금공단 개인 노후 생활비 기준</p>
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
    //import modalService from '@/service/modalService'
    import {keyupNumFormat} from '@/utils/number'

    export default {
        name : "PDRT2011",
        data: () => {
            return {
                chkLivAm01    : "124", // 절약
                chkLivAm02    : "177", // 안정적인
                chkLivAm03    : "220", // 여유로운
                chkLivAm04    : "300", // 풍요로운

                retMmLivAm    : "",    // 은퇴 후 월 생활비
                retMmLivAmInp : "",    // 은퇴 후 월 생활비 - 직접입력

                nextStepYn    : false,
                foc_livAm     : false,
                
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
                this.retMmLivAm = param.retMmLivAm;
                this.nextStepYn = param.retMmLivAm != "" ? true : false;

                if (param.retMmLivAm != this.chkLivAm01 &&
                    param.retMmLivAm != this.chkLivAm02 &&
                    param.retMmLivAm != this.chkLivAm03 &&
                    param.retMmLivAm != this.chkLivAm04)
                {
                    this.retMmLivAmInp = param.retMmLivAm;
                    this.retMmLivAm    = "";
                    this.foc_livAm     = true;

                    if(this.retMmLivAmInp >= 124 && this.retMmLivAmInp <= 1000) {
                        this.flag_show = true
                    }
                }
            },
            fn_chkLivAm(livAm) {

                this.retMmLivAm = livAm;
                this.nextStepYn = true;
				this.foc_livAm  = false;

                this.close(this.retMmLivAm);
            },
			// input 클릭 시 focus 관련
			fn_focusOnOff() {
                this.retMmLivAm = "";
				this.foc_livAm  = true;
            },
            fn_chkAm() {
                this.flag_fisrt = true

                if(this.retMmLivAmInp.length == 1 && this.retMmLivAmInp == 0) {
                    this.retMmLivAmInp = this.retMmLivAmInp.slice(0, -1)
                } else {
                    this.retMmLivAmInp = this.retMmLivAmInp.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                    this.retMmLivAmInp = Number(this.retMmLivAmInp.split(",").join(""))
                    
                    if (this.retMmLivAmInp.length > 6) {
                        this.retMmLivAmInp = this.retMmLivAmInp.slice(0, -1)
                    }
                    this.retMmLivAmInp = keyupNumFormat(this.retMmLivAmInp.toString())
                }

                let chkAm = Number(this.retMmLivAmInp.split(",").join(""));
                if (chkAm < 124 || chkAm > 1000) {
                    this.flag_show = false

                } else {
                    this.flag_show = true
                }
            },
            fn_delAm() {
                this.retMmLivAmInp = "";
            },
            fn_amInputBtn() {
                
                if(this.flag_show == true) {
                   this.close(this.retMmLivAmInp); 
                }
            }
        }
    }
</script>