<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 영농캘린더
* @ 페이지설명 : 수입/지출 카테고리 선택(POP)
* @ 파일명     : src/views/page/SZ/FC/SZFC2108/SZFC2108.vue
* @ 작성자     : 
* @ 작성일     : 2021-06-16
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-16              		                 최초작성
*************************************************************************/
-->
<template>
<div>
    <div class="dimmed" style="display:block;"></div>
    <div class="popup_box">
		<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
			<!--[타이틀(Start)]-->
			<div class="popup_header">    
				<h1>{{popTitleTxt}}</h1>          
			</div>
			<!--[타이틀(Emd)]-->

			<!--메인(Body)-->
			<div class="popup_content">
				<div class="com_txt_type01">
					<ul class="com_slide_check_type03">

						<template v-if="this.ctgrCn > 0">
							<li v-for="(ctgr, index) in ctgrList" :key="index">
								<div class="btn_radio"  v-on:click.prevent="fn_setRstInfo(index)">
									<input type="radio" name="category" :id="'ctgr'+index">
									<label :for="'ctgr'+index"> 
										<i :class="ctgr.ctgrIconFlnm !== '' ? ctgr.ctgrIconFlnm : '' "></i>  <!--카테고리아이콘파일명-->
										<span>{{ctgr.ctgrnm}}</span>  <!--카테고리명-->
									</label>	
								</div>	
							</li>
						</template>
						<template v-else>  <!-- 조회내역이 없을경우 -->
							<div class="no_data_box">
								<div class="no_data_list">
									<p>조회된 정보가 없습니다.</p>
								</div>
							</div>	            
						</template>
						<!--li(End)-->
					</ul>
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

export default {
	name: 'SZFC2108',
	data: () => {
		return {

            popTitleTxt : "",    //팝업 타이틀
            asetCtgrDsc : "",

			ctgrCn   : 0, 	
			ctgrList : [] , 
			//ctgrList : {}   //테스트용
		

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

            if (this.params.asetCtgrDsc === '1') {
                this.popTitleTxt = '수입 카테고리 선택'
            } else if (this.params.asetCtgrDsc === '2') {
                this.popTitleTxt = '지출 카테고리 선택'
			}

			//*
			this.getSearchList();
		},

		getSearchList() {

           const config ={
                 url  :'/sz/fc/08r01',
                 data : {
						asetCtgrDsc  : this.params.asetCtgrDsc  //자산카테고리구분코드 = (변수)자산카테고리구분코드(1;수입,2;지출)
                 }
             }

             apiService.call(config).then(response => {
				this.ctgrCn   = (response.ctgrCn === undefined)?0:response.ctgrCn;       
				this.ctgrList = (response.ctgrList === undefined)?'':response.ctgrList || [];       //(출력)카테고리 목록
			})

		},

        //선택 시 부모창으로 넘겨줄 파라미터 설정
        fn_setRstInfo(index) {
            this.closeParam = {
                asetAmnCtgrId : this.ctgrList[index].asetAmnCtgrId,  //자산관리카테고리ID
                ctgrnm        : this.ctgrList[index].ctgrnm,  		 //카테고리명
				ctgrIconFlnm  : this.ctgrList[index].ctgrIconFlnm    //카테고리아이콘명
            }
            this.close(this.closeParam)
        }
	}

}
</script>

