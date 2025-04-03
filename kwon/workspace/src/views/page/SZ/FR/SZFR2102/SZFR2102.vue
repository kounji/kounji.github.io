<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 영농일지
* @ 페이지설명 : 작목선택(POP)
* @ 파일명     : src/views/page/SZ/FR/SZFR2102/SZFC1102.vue
* @ 작성자     : 
* @ 작성일     : 2021-07-07
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-07-07              		                 최초작성
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
						<template v-if="abiCulplCn > 0"> <!--작목재배지목록건수가 존재할 경우-->
							<ul class="com_radio_type03">
								<li v-for="(abiCulp, index) in abiCulplList" :key="index"> 
									<div class="btn_radio" v-on:click.prevent="fn_setRstInfo(index)">
										<input type="radio" name="house" :id="'abiCulp'+index">
										<label :for="'abiCulp'+index"> 
											<span>{{abiCulp.naWrsSclfnm}}</span>					
										</label>	
									</div>	
								</li>
							</ul>
						</template> 
						<template v-else> 
							<div class="no_data_box">
								<div class="no_data_list">
									<p>조회된 정보가 없습니다.</p>
								</div>
							</div>
						</template> 
					</div>

					<!--자료가 존재하지 않을 경우, 작목등록([팝업]작목/재배지관리) 버튼 나오게-->	
					<template v-if="btnShow"> 
						<!--버트(Start)-->
						<div class="com_btn_area">   
							<a href="javascript:void(0);" class="com_btnround_type02" v-if="abiCulplList.length  < NUMSEVEN " v-on:click.prevent="fn_knCropReg($event,'000')" >
								<span class="btn_plus">작목등록</span>
							</a>
						</div>
						<!--버튼(End)-->
					</template>
				</div>						
			</div>
			<!--메인(Body)-->

			<!--버트(Start)-->
			<a href="javascript:void(0);" v-on:click.prevent="close()" class="btn_close"><span class="">취소</span></a>	
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
	name: 'SZFR2102',
	data: () => {
		return {

			asetCtgrDsc : "", 
			btnShow     : false,  
            //asetCtgrLclc : "" ,	//자산카테고리대분류코드(1:지출,2:마이농가)
            //asetCtgrDsc  : ""		//자산카테고리구분코드(1:수입,2:지출,3:이체)

			NUMSEVEN   : 7,
			//abiCulplList : {},  //테스트용
			abiCulplList  : [],
			abiCulplCn    : 0, 
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

        //**************
        // [조회]
        //***************/
		getSearchList() {

           const config ={
                url:'/sz/fr/00r01',
				data : {
					mydtCusno   :  this.params.mydtCusno  	//(입력)마이데이터고객번호 = (params)마이데이터고객번호		 
                 }
             }

             apiService.call(config).then(response => {
				//* 살제 자료 부분 */						
				this.abiCulplCn  = (response.abiCulplCn === undefined)?0:response.abiCulplCn || [];       //작목재배지목록건수
				this.abiCulplList  = (response.abiCulplList === undefined)?'':response.abiCulplList || [];       //작목재배지목록 = response.작목재배지목록

				//자료가 존재하지 않을 경우, '작목등록'이 보이도록 처리(true)
				if (response.abiCulplList.length == 0) this.btnShow = true  
				//* 살제 자료 부분 */						
			})

			console.log("[SZFR2102]getSearchList(End)")		
		},

        //선택 시 부모창으로 넘겨줄 파라미터 설정
        fn_setRstInfo(index) {

             this.closeParam = {
					naWrsLclc     : this.abiCulplList[index].naWrsLclc,    //상품분류코드(대분류)
					naWrsMclc     : this.abiCulplList[index].naWrsMclc,    //상품분류코드(중분류)
					naWrsSclc     : this.abiCulplList[index].naWrsSclc,    //상품분류코드(소분류)
					naWrsSclfnm   : this.abiCulplList[index].naWrsSclfnm,  //상품소분류명
					culplRgnC     : this.abiCulplList[index].culplRgnC,    //재배지지역코드
					culplRgnNm    : this.abiCulplList[index].culplRgnNm,   //재배지지역명
				}
			this.close(this.closeParam)
         }, 

        //**************
        // [작목 등록]버튼 클릭
        //***************/
		fn_knCropReg(evt, flag) {

			if (flag === "000")
			{
				this.fn_openModalSZST2102()  
			}

		},

        /*
        * [작목&재배지 관리]팝업 호출 
        */
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

