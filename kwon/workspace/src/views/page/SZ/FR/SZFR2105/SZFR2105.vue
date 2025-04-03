<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 영농일지
* @ 페이지설명 : 작업설정(POP)
* @ 파일명     : src/views/page/SZ/FC/SZR0005/SZR0005.vue
* @ 작성자     : 
* @ 작성일     : 2021-07-02
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-07-02              		                 최초 작성
* 2021-07-09                                     수정 작업
*************************************************************************/
-->
<template>
<div>
    <div class="dimmed" style="display:block;"></div>
    <div class="popup_box">
		<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
			<!--[타이틀(Start)]-->
			<div class="popup_header">    
				<h1>작업 설정</h1>          
			</div>
			<!--[타이틀(Emd)]-->

			<!--메인(Body)-->
			<div class="popup_content com_btn_bottom">
				<div class="com_txt_type05">
					<div class="list">

						<!--재배지지역코드가 존재 and 영농작업목록 데이타가 존재할 경우~~(Start) -->
						<template v-if="prmCulplRgnC !== undefined || this.jobList.length > 0 "> 
							<ul class="com_radio_type03">
								<!--For(Start)--->			
								<li v-for="(job, index) in jobList" :key="index"> 
									<div class="btn_radio" v-on:click.prevent="fn_setRstInfo(index)">
										<input type="radio" name="house" :id="'job'+index">
										<label :for="'job'+index"> 
											<span>{{job.fangWkDsnm}}</span>					
										</label>	
									</div>	
								</li>
								<li >
									<div class="btn_radio">
										<input type="radio" name="house" id="radio18" :checked="culplAreaUntC==='0'" @click="fn_directInput('0')">
										<label for="radio18">
											<span>직접입력</span>							
										</label>	
									</div>	
								</li>
								<!--For(End)--->			
							</ul>
						</template> 
						<template v-else > 
							<ul class="com_radio_type03">
								<li >
									<div class="btn_radio">
										<input type="radio" name="house" id="radio18" :checked="culplAreaUntC==='1'" @click="fn_directInput('1')">
										<!-- <input type="radio" name="com_check" id="com_check01" :checked="culplAreaUntC==='1'" @click="fn_chngSelItem('01')"> -->
										<label for="radio18">
											<span>직접입력</span>							
										</label>	
									</div>	
								</li>
							</ul>
						</template> 
						<!--재배지지역코드가 존재 and 영농작업목록 데이타가 존재할 경우~~(End) -->

					</div>

					<!--입력항목(Start) -->
					<template v-if="btnShowYn === 'Y' "> <!--직접입력일 경우 btnShow = true 변경하여 보여주기-->
						<div class="self_add_input">  
							<div class="com_input_type01 ani-active">
								<label for="com_input21"></label>
								<input type="text" id="com_input21" class="" name="" required="" @input="fn_checkWord($event,50, 'fangWkDsnm')" ref="fangWkDsnm" placeholder="작업 항목명 입력해 주세요"  >
								<!-- <input type="tel" id="com_input03" class="" name="" value="" placeholder="시간입력" title="시간입력" @focus="hour1 = ''" maxlength="2" ref="hour1" @input="fn_hourMinuteCheck('hour1', '1')" @keyup="moveNextTag($event)" v-model="hour1"> -->

								<!-- <div class="del_txt">
									<a class="com_btn_delete2" v-on:click.prevent="delStr('fangWkDsnm')"><span class="blind">삭제</span></a>
								</div> -->
							</div>
						</div>
					</template> 
					<!--입력항목(End) -->

				</div>
			</div>
			<!--버튼1(Start)-->
			<template v-if="btnShowYn === 'Y' "> 
				<div class="popup_footer">  <!--직접입력일 경우 btnShow = true 변경하여 보여주기-->
					<div class="btn_full_box">
						<a href="javascript:void(0);" class="btn btn_mint" v-on:click.prevent="fn_conFirm()" >확인</a>
					</div>
				</div>
			</template> 
			<!--버튼1(End)-->
			<!--메인(Body)-->

			<!--버튼2(Start)-->
			<a href="javascript:void(0);" v-on:click.prevent="close()" class="btn_close"><span class="">취소</span></a>	
			<!--버튼2(End)-->

		</div>
	</div>
</div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import {checkWord} from '@/utils/data'

export default {
	name: 'SZFR2105',
	data: () => {
		return {

            culplAreaUntC  : "",  

			btnShowYn   : "",  
			fangWkDsnm  : "",
			prmCulplRgnC : "",   //재배지지역코드 

			jobList  : [],    //영농작업목록
		}
	},

    mixins: [
            popupMixin,
            commonMixin
	],
	
    mounted() {
		this.initComponent(this.params);
			
		//PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)     
    },

	methods: {
		initComponent() {

			this.prmCulplRgnC  = this.params.culplRgnC

			//*2021.10.06(수) 변경
			if ( this.prmCulplRgnC !== '' || this.prmCulplRgnC !== undefined) {   //재배지지역코드가 미존재할 경우
				this.culplAreaUntC = "0" 
				this.fn_directInput('0')
			} else {
				this.culplAreaUntC = "1" 
				this.fn_directInput('1')
			}

			this.getSearchList();  //조회
		},

		getSearchList() {

           const config ={
                url:'/sz/fr/04r01',
				data : {
					naWrsLclc   : this.params.naWrsLclc,  	//상품분류코드(대분류) = (params)상품분류코드(대분류)   		 
					naWrsMclc   : this.params.naWrsMclc,  	//상품분류코드(중분류) = (params)상품분류코드(중분류)		 
					naWrsSclc   : this.params.naWrsSclc,  	//상품분류코드(소분류) = (params)상품분류코드(소분류)		 
                 }
             }

             apiService.call(config).then(response => {
				//* 살제 자료 부분 */						
				this.jobList  = (response.jobList === undefined)?'':response.jobList || [];       //경제통합상품목록 = (출력)경제통합상품목록

				if (this.jobList.length == 0) this.btnShowYn = "Y" 
				//* 살제 자료 부분 */						

               this.$refs.fangWkDsnm.focus() 

			})
		},

		//입력 텍스트 삭제
        delStr(colNm) {
			if (colNm == "fangWkDsnm") {
				this.fangWkDsnm = ''   //작업항목명 
			}		

        },

        //선택 시 부모창으로 넘겨줄 파라미터 설정
        fn_setRstInfo(index) {

           this.closeParam = {
				fangWkDsnm   : this.jobList[index].fangWkDsnm,    //영농작업구분명
				fangWkDsExpl : this.jobList[index].fangWkDsExpl,  //영농작업구분설명
			}

			this.close(this.closeParam)
        }, 

		//'직접입력'을 선택하여, 작업구분명 필드와 [확인]버튼을 보여주기 위해서~
		fn_directInput(flag) {

			if (flag === "0" || flag === "1") {
				this.btnShowYn = "Y" //직접입력 클릭시 하단의 입력필드와 확인버튼 나오게 하기 위해서..	

				//console.log(">>> fn_directInput/flag=>> 여기1 ")

				if (flag === "0" ) {
					this.culplAreaUntC   = "0"  
				} else if (flag === "1" ) {
					this.culplAreaUntC   = "1"  
				}	
			}	
		},

		//[확인]버튼 클릭시
		fn_conFirm() {

			if (this.fangWkDsnm.length == 0 || this.fangWkDsnm.trim() == "") {
               modalService.alert("작업항목명는 필수입력항목입니다.").then(() => {});
               return;
			}

			//*
			this.closeParam = {
				fangWkDsnm   : this.fangWkDsnm,  //영농작업구분명
				fangWkDsExpl : "",               //영농작업구분설명
			}
			this.close(this.closeParam)

		},

		//2021.10.26(화) 추가
		fn_checkWord(event, maxByte, str) {

			if (str === "fangWkDsnm") {  //상세작업명	
				let rtnObj = checkWord(event.target.value, maxByte)  

				if(rtnObj.flag) {this.$refs.fangWkDsnm.blur()}   // 알럿 중복 방지
				event.target.value = rtnObj.value
				this.fangWkDsnm = event.target.value
			} 
		},	
	}

}
</script>

