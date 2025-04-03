<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나의목표
* @ 페이지설명 : 금융과생활 > 나의목표 > 공통 슬라이드 팝업
* @ 파일명     : src\views\page\PD\MY\PDMY2007\PDMY2007.vue
* @ 작성자     : CS533453
* @ 작성일     : 2023-07-31
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-31              CS533453              최초작성
*************************************************************************/
-->


<template>
	<div class="mydata2023">
		<div class="dimmed" style="display: block;"></div>
		<div class="popup_box renewal">
			<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
				<div class="popup_header">
					<strong class="com_pop_tit01">{{popTit}}</strong>
				</div>
				<div class="popup_content">
					<div class="radio_list noLine">
						<div class="btn_radio" v-for="(comnInfo, index) in comnCList" :key="'key_'+index" @click="close(comnInfo)">
							<input type="radio" name="radio" :id="'radio'+index">
							<label :for="'radio'+index">{{comnInfo.comnCExpl}}</label>
						</div>
					</div>
				</div>
				<div class="popup_footer">
				</div>
				
				<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
			</div>
		</div>
	</div>
</template>

<script>

import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

export default {
    name : "PDMY2007",
    data: () => {
		return {
			comnCList	: [],	// 공통코드 리스트
			comnCId		: "",	// 공통코드ID
			refCntn1	: "",	// 공통코드 상세조회 조건
			popTit		: ""	// 공통코드 팝업명
        }
    },
    computed : {

	},
    methods: {
		init() {
			this.popTit		=  this.params.title
			this.comnCId	=  this.params.comnCId
			this.refCntn1	=  this.params.refCntn1
		},
		initComponent() {
			this.init()
			this.getData()
		},
		getData() {
			const config = {
				url: '/co/co/00r04',
				data: 
					{
						"comnCId"	: this.comnCId,	// 공통코드 ID
						"refCntn1"	: this.refCntn1 // 공통코드 상세조회 조건
					}
            };

			apiService.call(config).then(response => {
				this.comnCList = response.comnCList || []
            });
		},
		// nextStep(comnCId) {

		// },
		// 슬라이드 팝업
		openComCodePop(comnCId, comnCVal) {
			let params = {
				"comnCId": comnCId
				,"comnCVal": comnCVal
			}
			this.close(params)
		},
	},
    mounted() {
		this.initComponent()
		
		//PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    created() {

    },
    components: {      

    }

}
</script>