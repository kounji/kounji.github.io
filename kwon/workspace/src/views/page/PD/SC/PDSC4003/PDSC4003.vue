<!--
/*************************************************************************
* @ 서비스경로 : 연금절세 > 노후준비
* @ 페이지설명 : 조회기간 설정
* @ 파일명     : src\views\page\PD\SC\PDSC4003\PDSC4003.vue
* @ 작성자     : 
* @ 작성일     : 2023-08-16
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-16              CS533453              최초작성
* 2025-01-06              CS541015              고도화 파일명, UI변경 및 고도화 개발(PDSC2003.vue -> PDSC4003.vue)
*************************************************************************/
-->
<template>
	<div>
		<div class="dimmed" style="display: block;"></div>
		<div class="popup_box renewal">
			<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
				<div class="popup_header">
					<strong class="com_pop_tit01">조회 기간</strong>
				</div>
				<div class="popup_content">
					<div class="radio_list noLine">
						<div class="btn_radio" v-for="(yearInfo, index) in yearList" :key="'year_'+index" @click="fn_setData(yearInfo.year)">
							<input type="radio" name="year" :id="'year_'+index" :checked="chkYear == yearInfo.year ? 'checked' : ''" aria-hidden="true">
							<label :for="'year'+index">{{yearInfo.year}}년</label>
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

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
export default {
    name : "PDSC4003",
    data: () => {
		return {
            toYear	: '',
            chkYear	: '',
			yearList	: [], // 년도 목록
			maxYear : 40, // 년도 최대 범위 설정(국민연금:40, 건강보험:10)
        }
	},
	computed : {

    },
    methods: {
        initComponent(param) {
            this.yearList   = []
			this.toYear		= new Date().getFullYear()	// 현재년도
			this.chkYear	= ''
			if(param != null) {
				this.chkYear = param.toYear
				if(param.tabDsc == '1') {
					this.maxYear = 40
				} else {
					this.maxYear = 10
				}
			} else {
				this.maxYear = 40
			}

            this.setYearList()
		},
		setYearList() {
			
			let nowYear = this.toYear
			for(let i = 0; i <= this.maxYear; i++) {
				let obj = {}
				obj.year = nowYear - i
				this.yearList.push(obj)
			}
		},
		fn_setData(toYear) {
			let params = {
				"toYear": toYear
			}
			this.close(params)
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