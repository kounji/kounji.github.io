<!--
/*************************************************************************
* @ 서비스경로 : 
* @ 페이지설명 : 
* @ 파일명     : src\views\page\PD\RT\PDRT2004\PDRT2004.vue
* @ 작성자     : 
* @ 작성일     : 2023-08-11
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-11              CS533541              최초작성
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
						<input type="radio" name="radio03" id="radio3-1" v-model="retMmLivAm" :value="chkLivAm01" @click="fn_delAm()">
						<label for="radio3-1"><em>{{chkLivAm01 | numberFilter}}</em>만원으로 절약하며 생활</label>
					</div>
					<div class="btn_radio">
						<input type="radio" name="radio03" id="radio3-2" v-model="retMmLivAm" :value="chkLivAm02" @click="fn_delAm()">
						<label for="radio3-2"><em>{{chkLivAm02 | numberFilter}}</em>만원으로 안정적인 생활</label>
					</div>
					<div class="btn_radio">
						<input type="radio" name="radio03" id="radio3-3" v-model="retMmLivAm" :value="chkLivAm03" @click="fn_delAm()">
						<label for="radio3-3"><em>{{chkLivAm03 | numberFilter}}</em>만원으로 여유로운 생활</label>
					</div>
					<div class="btn_radio">
						<input type="radio" name="radio03" id="radio3-4" v-model="retMmLivAm" :value="chkLivAm04" @click="fn_delAm()">
						<label for="radio3-4"><em>{{chkLivAm04 | numberFilter}}</em>만원으로 풍요로운 생활</label>
					</div>
				</div>


                <hr>
				<strong class="com_box_tit">목표한 다른 생활비가 있나요?</strong>
				<div class="com_input_type01 input_title_type">
					<label for="com_input01">생활비 직접 입력</label>
					<input type="tel" id="com_input01" class="com_txtright_type02" name="" value="" required="" placeholder="" title="생활비 금액입력"
                     :class="retMmLivAmInp > 0 && foc_livAm ? 'focusON focusforce' : ''" maxlength="5" v-model="retMmLivAmInp" 
                    @focus="fn_focusOnOff()" @keyup="fn_chkAm()" @input="fn_chkAm()">

					<div class="del_txt">
						<!--<a href="javascript:void(0);" class="com_btn_delete2" v-if="retMmLivAmInp > 0" @click.prevent="fn_delAm()"><span class="blind">삭제</span></a> -->
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
            name : "PDRT2004",
        data: () => {
            return {
                chkLivAm01    : "124", // 절약
                chkLivAm02    : "177", // 안정적인
                chkLivAm03    : "220", // 여유로운
                chkLivAm04    : "300", // 풍요로운

                retMmLivAm    : "",    // 은퇴 후 월 생활비
				retMmLivAmInp : "",    // 은퇴 후 월 생활비 - 직접입력
				sTotEntPrdVal  : 0,    // 총납입기간 
				sBirYy		   : 0,   // 고객생년	
				cusAge         : 0,   // 고객만나이
				cusAmSv		   : 0,   // 저축금액

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

                console.log('----------------------------param ', param)
                this.retMmLivAm    = String(param.smltMmAm/ 10000);// 시뮬레이션 월생활비

				this.sTotEntPrdVal = Number(param.totEntPrdVal); // 선택한 총기간( 퇴직+개인연금)
                this.sBirYy 	   = Number(param.birYy); 		 // 고객생년
                this.sMmPnsTts     = param.mmPnsTts;             // 월연금 총금액
                this.cusAge        = param.cusAge;               // 고객만나이

                console.log('************sTotEntPrdVal' , this.sTotEntPrdVal)
                console.log('************sBirYy' , this.sBirYy)
                console.log('************sMmPnsTts' , this.sMmPnsTts)
                console.log('************cusAge' , this.cusAge)

                if (this.retMmLivAm != this.chkLivAm01 &&
                    this.retMmLivAm != this.chkLivAm02 &&
                    this.retMmLivAm != this.chkLivAm03 &&
                    this.retMmLivAm != this.chkLivAm04)
                {
                    if(this.retMmLivAm.length == 4){ //천만원 단위이면
                        this.retMmLivAmInp = keyupNumFormat(this.retMmLivAm.toString())
                        this.flag_show = true
                    }else{
                        this.retMmLivAmInp = this.retMmLivAm;
                    }
                    
                    this.retMmLivAm    = "";
                    this.foc_livAm     = true;

                    if(this.retMmLivAmInp >= 124 && this.retMmLivAmInp <= 1000) {
                        this.flag_show = true
                    }
                }else{

                    let mmLivAm = this.retMmLivAm

                    if(mmLivAm == "124"){
                        this.chkLivYy01 = this.retMmLivAm;
                    }else if(mmLivAm == "177"){
                        this.chkLivYy02 = this.retMmLivAm;

                    }else if(mmLivAm == "220"){
                        this.chkLivYy03 = this.retMmLivAm;
                    }else{
                        this.chkLivYy04 = this.retMmLivAm;
                    }

                     if(this.retMmLivAm >= 124 && this.retMmLivAm <= 1000) {
                        this.flag_show = true
                    }
                }

            },
            fn_chkLivAm(livAm) {

                this.retMmLivAm = livAm;
				this.foc_livAm  = false;
                //this.close(this.retMmLivAm);
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
                
                this.flag_show = true;
                this.retMmLivAmInp = "";
            },
            fn_amInputBtn() {
				/*
				(목표생활비-월 수령예상금액) * 240
				(60-만나이)) * 12 
				20년간 부족금액 / 노동 가능 개월
                */
                let cusMmAm = 0;
                let cusAm   = 0;
                let workMon = 0;
                if( this.retMmLivAm != ""){
                    cusMmAm =  Number(this.retMmLivAm)*10000;      

                }else{

                     if(this.retMmLivAmInp.length > 4){ //천만원단위이면
                         cusMmAm = Number(this.retMmLivAmInp.split(",").join(""))*10000;
                     }else{
                        cusMmAm =  Number(this.retMmLivAmInp)*10000;      
                     }    
                }

                console.log('-----------------cusMmAm ----------------', cusMmAm )
                console.log('-----------------sTotEntPrdVal ----------------', this.sTotEntPrdVal )
                console.log('-----------------cusAge ----------------', this.cusAge )
                console.log('-----------------sMmPnsTts ----------------', this.sMmPnsTts )

                cusAm  = (cusMmAm - this.sMmPnsTts ) * (this.sTotEntPrdVal*12); //월생활비목표 금액 - 월 연금총액
                workMon = (60 - this.cusAge) *12;
				this.cusAmSv  = Math.floor(cusAm / workMon);

                console.log('--' , this.cusAmSv)
                if(this.flag_show == true) {

                   this.close({
                                    name     : 'PDRT2004',
                                    cusAmSv  : this.cusAmSv,
                                    cusAmSvYn: 'Y',
                                    sSmltMmAm  : cusMmAm  //월 생활비 선택금액
                               })
                }
            }
        }
}
</script>