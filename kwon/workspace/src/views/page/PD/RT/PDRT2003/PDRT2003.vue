<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 금융통통
* @ 페이지설명 : 금융과생활 > 금융통통 > 노후준비 > 납입 기간 중 월 평균소득
* @ 파일명     : src\views\page\PD\RT\PDRT2003\PDRT2003.vue
* @ 작성자     : CS533541
* @ 작성일     : 2023-08-11
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-11              CS533541              최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div> 
	<!-- 슬라이드 팝업 시작 -->
	<div class="dimmed" style="display: block;"></div>
	<div class="popup_box renewal old_age mydata2023">
		<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
			<div class="popup_header">
				<strong class="titH3">연금 맞춤 설정</strong>
			</div>
			<div class="popup_content com_btn_bottom">
				<strong class="com_box_tit">언제부터 받고 싶으세요?</strong>
				<div class="radio_list noLine">
					<div class="btn_radio" v-if="ageElyChk && chkLivAge01">
						<input type="radio" name="radio03" id="radio3-1" v-model="retMmLivAge" :value="chkLivAge01" @click="fn_chkLivAge(chkLivAge01)">
						<label for="radio3-1" >61세 부터 조금 일찍</label>
					</div>
					<div class="btn_radio" v-if="chkLivAge02">
						<input type="radio" name="radio03" id="radio3-2" v-model="retMmLivAge" :value="chkLivAge02" @click="fn_chkLivAge(chkLivAge02)">
						<label for="radio3-2">{{chkLivAge02}}세 부터 원래 나이에</label>
					</div>
					<div class="btn_radio" v-if="chkLivAge03">
						<input type="radio" name="radio03" id="radio3-3" v-model="retMmLivAge" :value="chkLivAge03" @click="fn_chkLivAge(chkLivAge03)">
						<label for="radio3-3">{{chkLivAge03}}세 부터 조금 늦게</label>
					</div>
				</div>
				<hr>
				<strong class="com_box_tit">몇 년 동안 받고 싶으세요?</strong>
				<ul class="com_radio_chk free">
					<li>
						<div class="btn_radio">
							<input type="radio" name="radio1" id="radio1-1" v-model="retMmLivYy" :value="chkLivYy01">
							<label for="radio1-1">
								<span>10년</span>
							</label>
						</div>
					</li>
					<li>
						<div class="btn_radio">
							<input type="radio" name="radio1" id="radi1-2"  v-model="retMmLivYy" :value="chkLivYy02" >
							<label for="radi1-2">
								<span>15년</span>
							</label>
						</div>
					</li>
					<li>
						<div class="btn_radio">
							<input type="radio" name="radio1" id="radio1-3" v-model="retMmLivYy" :value="chkLivYy03" >
							<label for="radio1-3">
								<span>20년</span>
							</label>
						</div>
					</li>
					<li>
						<div class="btn_radio">
							<input type="radio" name="radio1" id="radio1-4" v-model="retMmLivYy" :value="chkLivYy04" >
							<label for="radio1-4">
								<span>25년</span>
							</label>
						</div>
					</li>
					<li>
						<div class="btn_radio">
							<input type="radio" name="radio1" id="radio1-5" v-model="retMmLivYy" :value="chkLivYy05">
							<label for="radio1-5">
								<span>30년</span>
							</label>
						</div>
					</li>
				</ul>
				<strong class="com_box_tit">국민연금 가입기간 월 평균소득은 얼마예요?</strong>
				<div class="com_input_type01 input_title_type">
					<label for="com_input01">월 평균소득 직접 입력</label>
					<input type="tel" id="com_input01" class="com_txtright_type02" name="" value="" required="" placeholder="" title="평균소득 입력"
					:class="retMmLivAmInp.length > 0 && foc_livAm ? 'focusON focusforce' : ''" maxlength="5" v-model="retMmLivAmInp" 
					@focus="fn_focusOnOff()" @keyup="fn_chkAm()" @input="fn_chkAm()">

					<div class="del_txt">
						<a href="#nolink" class="com_btn_delete2"><span class="blind" v-if="retMmLivAmInp.length > 0" @click.prevent="fn_delAm()">삭제</span></a>
						<span class="com_inputtxtright2">만원</span>
					</div>
				</div>
				<strong class="com_txt_sub01 com_point_red" v-if="!flag_show && flag_fisrt">39만원~590만원 사이에서 입력 가능합니다.</strong>
			</div>
			<div class="popup_footer">
				<div class="btn_full_box2">
					<a href="javascript:void(0);" class="btn btn_mint" :class="flag_show ? '' : 'btn_off'" @click.prevent="flag_show ? fn_insert() : ''">저장</a>
				</div>
			</div>
			<a href="#nolink" role="button" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
		</div>
	</div>
	<!--// 슬라이드 팝업 종료 -->
	</div>
</template>

<script>

import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import {keyupNumFormat} from '@/utils/number'


export default {
    name : "PDRT20003",
        data: () => {
            return {

				//상단 국민연금나이	
				chkLivAge01    : "61", 
                chkLivAge02    : "", //정상나이
				chkLivAge03    : "", //지연나이
				retMmLivAge	   : "", 

				//퇴직연금+개인연금 연도
                chkLivYy01    : "10", 
                chkLivYy02    : "15", 
                chkLivYy03    : "20", 
				chkLivYy04    : "25", 
				chkLivYy05    : "30", 

                retMmLivYy    : "",    // 퇴직연금 + 개인연금 받고싶은 연도
				retMmLivAmInp : 0,    // 국민연금 월 평균소득 - 직접입력
				birYy	  	  : 0,    // 고객 출생연도
				ageElyChk	  : false,   // 조기연금 체크
				agCmprOprtC   : "",      // 조기(01), 정상(02), 지연(03)
				sPnsStrtAg	  : "",      //연금개시연령(관리자)
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

                this.retMmLivYy  = param.totEntPrdVal;// 총가입기간연도( 퇴직+개인여금)
				this.birYy       = param.birYy;

				let sAgCmprOprtC = param.agCmprOprtC 	//연령비교연산자코드(연금맞춤설정)
				this.agCmprOprtC = param.agCmprOprtC;
				this.retMmLivAmInp	= String(param.sDcyrMmLfecsNedAm / 10000); //월 평균소득(국민연금)

				

				console.log("pnsStrtAg===", param.pnsStrtAg);
				console.log("agYrcn===", param.agYrcn);
				console.log("sAgCmprOprtC===", sAgCmprOprtC);

				if( param.pnsStrtAg !== ""){
					
					this.chkLivAge01 = "61"; //조기
					this.chkLivAge02 = String(param.pnsStrtAg);//정상	
					this.chkLivAge03 = String(param.pnsStrtAg + 5);//지연

					if(sAgCmprOprtC === "01"){
						this.retMmLivAge  = "61"
					}else if(sAgCmprOprtC === "02"){
						this.retMmLivAge  = String(param.pnsStrtAg);
					}else if(sAgCmprOprtC === "03"){
						this.retMmLivAge  = String(param.pnsStrtAg + 5);//지연
					}else{
						this.retMmLivAge  = String(param.pnsStrtAg);
					}

					this.sPnsStrtAg = param.pnsStrtAg;

				}

				console.log("---------------------------------------------" );
				console.log("chkLivAge02" , this.chkLivAge02);
				console.log("retMmLivAge" , this.retMmLivAge);
				console.log("---------------------------------------------" );

				if( this.sPnsStrtAg > 63){
					this.ageElyChk = true;
				}else{
					this.ageElyChk =false;
				}


                if (this.retMmLivYy != this.chkLivYy01 &&
                    this.retMmLivYy != this.chkLivYy02 &&
                    this.retMmLivYy != this.chkLivYy03 &&
					this.retMmLivYy != this.chkLivYy04 &&
					this.retMmLivYy != this.chkLivYy05)
                {
					this.retMmLivYy = "20"; // 기등록된 연도가 없으면 20년으로 디폴트	
					this.foc_livAm  = true;

                }else{

					if(this.retMmLivYy  == this.chkLivYy01){
						this.retMmLivYy = this.chkLivYy01;
					}else if(this.retMmLivYy  == this.chkLivYy02){
						this.retMmLivYy = this.chkLivYy02;

					}else if(this.retMmLivYy  == this.chkLivYy03){
						this.retMmLivYy = this.chkLivYy03;

					}else if(this.retMmLivYy  == this.chkLivYy04){
						this.retMmLivYy = this.chkLivYy04;

					}else if(this.retMmLivYy  == this.chkLivYy05){
						this.retMmLivYy = this.chkLivYy05;
					}
				}

				if(this.retMmLivAmInp >= 37 && this.retMmLivAmInp <= 590) {
                    this.flag_show = true
                }
            },
            fn_chkLivYy(livYy) {

				this.retMmLivYy = livYy;
				this.foc_livAm  = false;

			},
			
			fn_chkLivAge(livAge) {

				console.log("---------------------------------------------" );
				console.log("----- livAge **", livAge );
				console.log("----- chkLivAge01 **", this.chkLivAge01 );
				console.log("----- chkLivAge02 **", this.chkLivAge02 );
				console.log("----- chkLivAge03 **", this.chkLivAge03 );

				

				if(this.chkLivAge02 > livAge ){
					this.agCmprOprtC = "01";
				}else if(this.chkLivAge02 == livAge){
					this.agCmprOprtC = "02";
				}else{
					this.agCmprOprtC = "03";
				}
				console.log("----- retMmLivAge **", this.retMmLivAge );

			},
			
			// input 클릭 시 focus 관련
			fn_focusOnOff() {
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
                if (chkAm < 37 || chkAm > 590) {
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
			},
			
			fn_insert() {
				const configConfirm = {
					content: ['저장하시겠습니까?'],
					title  : "",
				}
				console.log("retMmLivAge==" , this.retMmLivAge);
				console.log("agCmprOprtC==" , this.agCmprOprtC);
				console.log("retMmLivYy==" , this.retMmLivYy);
				console.log("retMmLivAmInp==" , this.retMmLivAmInp);

				if(this.retMmLivAge.length == 0 || this.retMmLivAge == '') {
					modalService.alert("나이 선택은 필수입력항목입니다.").then(() => {});
					return;
				}

				if(this.retMmLivYy.length == 0 || this.retMmLivYy == '') {
					modalService.alert("연도 선택은 필수입력항목입니다.").then(() => {});
					return;
				}

				if(this.retMmLivAmInp.length == 0 || this.retMmLivAmInp == '') {
					modalService.alert("국민연금 월평균소득은 필수입력항목입니다.").then(() => {});
					return;
				}

				/*
				let sDcyrMmLfecsNedAm = 0;
				let MmLivAmInp  = Number(this.retMmLivAmInp);
				let dMmLivAmInp = Number(this.retMmLivAmInp);

				if(this.agCmprOprtC == "01"){ //조기이면
					if( this.sPnsStrtAg == 64){
						sDcyrMmLfecsNedAm = Math.floor( MmLivAmInp - ( MmLivAmInp * 0.015) );
						this.retMmLivAmInp = sDcyrMmLfecsNedAm;
					}else if( this.sPnsStrtAg == 65 ){
						sDcyrMmLfecsNedAm = Math.floor(MmLivAmInp - ( MmLivAmInp * 0.020));
						this.retMmLivAmInp = sDcyrMmLfecsNedAm;
					}
					
				}else if( this.agCmprOprtC == "03"){ //지연이면

					sDcyrMmLfecsNedAm = Math.floor(MmLivAmInp + ( MmLivAmInp * 0.030));
					this.retMmLivAmInp = sDcyrMmLfecsNedAm;
				}else{
					this.retMmLivAmInp = dMmLivAmInp;
				}*/
				
				modalService.confirm(configConfirm).then(text => {
					if(text == "예") {

						const config = {
							url: '/pd/rt/03s01',

							data: {"mydtCusno":this.getUserInfo('mydtCusno')
									,"agYrcn": this.retMmLivAge				//연령년수
									,"agCmprOprtC" : this.agCmprOprtC	//연령비교연산자코드
									,"totEntPrdVal" : this.retMmLivYy		//총가입기간값
									,"dcyrMmLfecsNedAm" : this.retMmLivAmInp*10000  //노후월생활비필요금액
									}
						};
						
						apiService.call(config).then(response => {

							if(response.rspCd == '0000'){
								modalService.alert("저장되었습니다.").then(() => {
										this.close({
														name: 'PDRT2003',
														desc: 'reload'
													})
								});
							} else {
								modalService.alert("저장 중 오류가 발생하였습니다.").then(() => {
									//this.close(response);
								})
							}
						});
					}
				})
			},
        }
}
</script>