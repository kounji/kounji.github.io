<!--
/*************************************************************************
* @ 서비스경로 : 
* @ 페이지설명 : 
* @ 파일명     : src\views\page\PD\SC\PDSC2004\PDSC2004.vue
* @ 작성자     : 
* @ 작성일     : 2023-08-16
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-16              CS533453              최초작성
*************************************************************************/
-->
<template>
	<div>
		<div class="dimmed" style="display: block;"></div>
		<div class="popup_box renewal">
			<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
				<div class="popup_header">
					<strong class="com_pop_tit01">보험료 선택</strong>
				</div>
				<div class="popup_content">
					<div class="radio_list noLine">
						<div class="btn_radio" v-for="(commInfo, index) in commList" :key="'key1_' + index" @click="fn_setData(commInfo.comnCExpl,commInfo.comnCVal)">
							<input type="radio" name="hlthIsrEntDsc" :id="'hlthIsrEntDsc_'+index" :checked="hlthIsrEntDsc == commInfo.comnCVal ? 'checked' : ''" aria-hidden="true">
							<label :for="'hlthIsrEntDsc'+index">{{commInfo.comnCExpl}}</label>
						</div>
					</div>
				</div>
				<div class="popup_footer">
				</div>
				
				<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="closeAll()"><span class="">닫기</span></a>
			</div>
		</div>
	</div>
</template>

<script>

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
export default {
    name : "PDSC2004",
    data: () => {
		return {
             commList          : [], // 공통코드 목록
             hlthIsrEntDsc    : '', // 건강보험가입구분코드
        }
	},
	computed : {

    },
    methods: {
        initComponent(param) {
			this.comnCList		= []
			if(param != null) {
				this.hlthIsrEntDsc	= param.hlthIsrEntDsc
			}

            this.getData()
		},
		getData() {
			const config = {
				url: '/co/co/00r01',
				data: {
						"comnCId": "HLTH_ISR_ENT_DSC" // 공통코드 ID(건강보험가입구분코드)
						}
			};

			apiService.call(config).then(response => {
				this.commList = response.comnCList || []
			});
		},
		fn_setData(comnCExpl, comnCVal) {
			let params = {
				"hlthIsrEntDscNm": comnCExpl
				,"hlthIsrEntDsc": comnCVal
			}
			this.closeAllData(params)
		},
	},
	mounted() {
		this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
	},
	mixins: [
        popupMixin,
        commonMixin
    ],
}

</script>