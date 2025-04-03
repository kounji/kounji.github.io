<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 영농캘린더
* @ 페이지설명 : 작목선택(POP)
* @ 파일명     : src/views/page/SZ/FC/SZFC2105/SZFC2105.vue
* @ 작성자     : 
* @ 작성일     : 2021-06-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-18              		                 최초작성
*************************************************************************/
-->
<template>
<div>
    <div class="dimmed" style="display:block;" v-on:click.prevent="close()"></div>
    <div class="popup_box">
		<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
			<!--[타이틀(Start)]-->
			<div class="popup_header">    
				<h1>작목 선택</h1>          
			</div>
			<!--[타이틀(Emd)]-->

			<!--메인(Body)-->
			<div class="popup_content">
				<div class="grain_wrapper">

					<div class="list">
						<ul class="com_radio_type03">
							<!--For(Start)--->			
							<li v-for="(naWrs, index) in naWrsList" :key="index"> 
								<div class="btn_radio" v-on:click.prevent="fn_setRstInfo(index)">
									<input type="radio" name="house" :id="'naWrs'+index">
									<label :for="'naWrs'+index"> 
										<span>{{naWrs.naWrsSclfnm}}</span>					
									</label>	
								</div>	
							</li>
							<!--For(End)--->			
						</ul>
					</div>

					<!--자료가 존재하지 않을 경우, 작목등록([팝업]작목/재배지관리) 버튼 나오게-->	
					<template v-if="btnShow"> 
						<!--버트(Start)-->
						<div title="작목등록" class="com_btn_area">   
							<a href="javascript:void(0);"  class="com_btnround_type02" v-on:click.prevent="fn_knCropReg($event,'000')" >
								<span class="btn_plus">작목등록</span>
							</a>
						</div>
						<!--버튼(End)-->
					</template>

				</div>						
			</div>
			<!--메인(Body)-->

			<!--버트(Start)-->
			<a href="javascript:void(0);"  v-on:click.prevent="close()" class="btn_close"><span class="">취소</span></a>	
			<!--버트(End)-->
		</div>
	</div>
</div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'

import SZST2102 from '@/views/page/SZ/ST/SZST2102/SZST2102'

export default {
	name: 'SZFC2103',
	data: () => {
		return {

			asetCtgrDsc : "", 
            selItem     : "",
			naWrCd 		: "",
			naWrCd1 	: "",
			btnShow     : false,  
			naWrsCd : "",

			//naWrsList : {},  //테스트용
			naWrsList  : [],
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
			this.getSearchList();
		},

		getSearchList() {

           const config ={
                url:'/sz/fc/03r01',
				//url : "/co/at/01r01",
				data : {
					mydtCusno   :  this.params.mydtCusno  	//(입력)마이데이터고객번호 = (params)마이데이터고객번호		 
                 }
             }

             apiService.call(config).then(response => {
						
						//* 살제 자료 부분 */						
						this.naWrsList  = (response.naWrsList === undefined)?'':response.naWrsList || [];       //경제통합상품목록 = (출력)경제통합상품목록

						//자료가 존재하지 않을 경우, '작목등록'이 보이도록 처리(true)
						if (response.naWrsList.length == 0) this.btnShow = true  
			})
		},

        //선택 시 부모창으로 넘겨줄 파라미터 설정
        fn_setRstInfo(index) {

             this.closeParam = {
					naWrsLclc     : this.naWrsList[index].naWrsLclc,    //상품분류코드(대분류)
					naWrsMclc     : this.naWrsList[index].naWrsMclc,    //상품분류코드(중분류)
					naWrsSclc     : this.naWrsList[index].naWrsSclc,    //상품분류코드(소분류)
					naWrsSclfnm   : this.naWrsList[index].naWrsSclfnm,  //상품소분류명
				}
			this.close(this.closeParam)
         }, 

		//[작목 등록]버튼 선택시
		fn_knCropReg(evt, selItem) {
			this.selItem = selItem
			
			if (this.selItem === "000")
			{
				this.fn_openModalSZST2102()  
			}
		},

		//[작목&재배지 관리]팝업을 보여주기 위해서....
		fn_openModalSZST2102() {
			const config = {
				component: SZST2102,
				params: {   /*넘기는 값이 없을 경우 이 부분은 필요 없음*/
						//asetCtgrLclc : this.asetCtgrLclc ,	//자산카테고리대분류코드 1:지출, 2:마이농가
						//asetCtgrDsc  : this.asetCtgrDsc		//자산카테고리구분코드   1:수입, 2:지출, 3:이체
						}
			}
			//슬라이드팝업에서 풀팝업을 부르기 위한 오류 수정 (필수)
			config.renderer = this.modalConfig.renderer

			modalService.openPopup(config).then(response => {
				console.log("openModalSZST2105" ,response)
			})
		}

	}

}
</script>

