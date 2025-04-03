<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 상품추천 > 은퇴력진단
* @ 페이지설명 : 금융과생활 > 상품추천 > 은퇴력진단 > step 4. 은퇴정보입력(준비자금) 은퇴까지 월 평균 예상수입
* @ 파일명     : src\views\page\PD\RT\PDRT2013\PDRT2013.vue
* @ 작성자     : CS533541
* @ 작성일     : 2023-07-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-17              CS533541              최초작성(PDRT1010 -> PDRT2013.vue)
*************************************************************************/
-->
<template>
    <div>
       <!-- 슬라이드 팝업 시작 -->
	<div class="dimmed" style="display: block;"></div>
	<div class="popup_box renewal mydata2023">
		<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
			<div class="popup_header">
				<strong class="com_pop_tit01">은퇴까지 월 평균 예상수입</strong>
			</div>
			<div class="popup_content com_btn_bottom">
				<div class="radio_list noLine">
					<div class="btn_radio">
						<input type="radio" name="radio03" id="radio3-1" :checked="retExpMmAm == chkExpMmAm01 ? 'checked' : ''" @click.prevent="fn_chkExpMmAm(chkExpMmAm01)">
						<label for="radio3-1"><em>{{chkExpMmAm01 | numberFilter}}</em>만원</label>
					</div>
					<div class="btn_radio">
						<input type="radio" name="radio03" id="radio3-2" :checked="retExpMmAm == chkExpMmAm02 ? 'checked' : ''" @click.prevent="fn_chkExpMmAm(chkExpMmAm02)">
						<label for="radio3-2"><em>{{chkExpMmAm02 | numberFilter}}</em>만원</label>
					</div>
					<div class="btn_radio">
						<input type="radio" name="radio03" id="radio3-3" :checked="retExpMmAm == chkExpMmAm03 ? 'checked' : ''" @click.prevent="fn_chkExpMmAm(chkExpMmAm03)">
						<label for="radio3-3"><em>{{chkExpMmAm03 | numberFilter}}</em>만원</label>
					</div>
					<div class="btn_radio">
						<input type="radio" name="radio03" id="radio3-4" :checked="retExpMmAm == chkExpMmAm04 ? 'checked' : ''" @click.prevent="fn_chkExpMmAm(chkExpMmAm04)">
						<label for="radio3-4"><em>{{chkExpMmAm04 | numberFilter}}</em>만원</label>
					</div>

                    <div class="btn_radio">
						<input type="radio" name="radio03" id="radio3-5" :checked="retExpMmAm == chkExpMmAm05 ? 'checked' : ''" @click.prevent="fn_chkExpMmAm(chkExpMmAm05)">
						<label for="radio3-5"><em>{{chkExpMmAm05 | numberFilter}}</em>만원</label>
					</div>
				</div>
				<hr>
				<strong class="com_box_tit">예상하는 다른 수입이 있나요?</strong>
				<div class="com_input_type01 input_title_type">
					<label for="com_input01">예상수입 직접 입력</label>
					<input type="tel" id="com_input01" class="com_txtright_type02" name="" value="" required="" placeholder="" title="예상수입 입력"
                    :class="retExpMmAmInp.length > 0 && foc_expMmAm ? 'focusON focusforce' : ''" maxlength="6" v-model="retExpMmAmInp" 
                    @focus="fn_focusOnOff()" @keyup="fn_chkAm()" @input="fn_chkAm()">
                    

					<div class="del_txt">
						<a href="javascript:void(0);" class="com_btn_delete2" @click.prevent="fn_delAm()"><span class="blind">삭제</span></a>
						<span class="com_inputtxtright2">만원</span>
					</div>

				</div>
				<strong class="com_txt_sub01 com_point_red" v-if="!flag_show && flag_fisrt">100만원~10000만원 사이에서 입력 가능합니다.</strong>
			</div>
			<div class="popup_footer">
				<div class="btn_box">
					<a href="javascript:void(0);" class="btn btn_mint" :class="flag_show ? '' : 'btn_off'" @click.prevent="flag_show ? fn_amInputBtn() : ''">확인</a>
				</div>
			</div>
			<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="">취소</span></a>
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
        name : "PDRT2013",
        data: () => {
            return {
                chkExpMmAm01    : "300",
                chkExpMmAm02    : "400",
                chkExpMmAm03    : "500",
                chkExpMmAm04    : "600",
                chkExpMmAm05    : "700",
                
                retExpMmAm      : "",    // 은퇴까지 월 평균 예상수입
                retExpMmAmInp   : "",    // 은퇴까지 월 평균 예상수입 - 직접입력

                nextStepYn      : false,
                foc_expMmAm     : false,

                flag_show       : false, // 최소 최대값 입력 flag
                flag_fisrt       : false, // 범위 외 입력 노출 문구 flag
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
                this.retExpMmAm = param.expMmAm;
                this.nextStepYn = param.expMmAm != "" ? true : false;

                if (param.expMmAm != this.chkExpMmAm01 &&
                    param.expMmAm != this.chkExpMmAm02 &&
                    param.expMmAm != this.chkExpMmAm03 &&
                    param.expMmAm != this.chkExpMmAm04 &&
                    param.expMmAm != this.chkExpMmAm05)
                {
                    this.retExpMmAmInp = param.expMmAm;
                    this.retExpMmAm    = "";
                    this.foc_expMmAm     = true;

                    if(this.retExpMmAmInp >= 100 && this.retExpMmAmInp <= 10000) {
                        this.flag_show = true
                    }
                }
            },
            fn_chkExpMmAm(expMmAm) {
                this.retExpMmAm = expMmAm;
                this.nextStepYn = true;
                this.foc_expMmAm  = false;

                this.close(this.retExpMmAm);
            },
			// input 클릭 시 focus 관련
			fn_focusOnOff() {
                this.retExpMmAm = "";
				this.foc_expMmAm  = true;
            },
            fn_chkAm() {
                this.flag_fisrt = true

                if(this.retExpMmAmInp.length == 1 && this.retExpMmAmInp == 0) {
                    this.retExpMmAmInp = this.retExpMmAmInp.slice(0, -1)
                } else {
                    this.retExpMmAmInp = this.retExpMmAmInp.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                    this.retExpMmAmInp = Number(this.retExpMmAmInp.split(",").join(""))
                    
                    if (this.retExpMmAmInp.length > 7) {
                        this.retExpMmAmInp = this.retExpMmAmInp.slice(0, -1)
                    }
                    this.retExpMmAmInp = keyupNumFormat(this.retExpMmAmInp.toString())
                }

                let chkAm = Number(this.retExpMmAmInp.split(",").join(""));
                if (chkAm < 100 || chkAm > 10000) {
                    this.flag_show = false
                } else {
                    this.flag_show = true
                }
            },
            fn_delAm() {
                this.retExpMmAmInp = "";
            },
            fn_amInputBtn() {
                if(this.flag_show == true) {
                   this.close(this.retExpMmAmInp);
                }
            }
        }
    }
</script>