<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나의목표
* @ 페이지설명 : 금융과생활 > 나의목표 > 자기계발 > 자기계발 카테고리 조회 팝업
* @ 파일명     : src\views\page\PD\MY\PDMY2036\PDMY2036.vue
* @ 작성자     : CS533453
* @ 작성일     : 2023-07-31
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-31              CS533453              최초작성
*************************************************************************/
-->


<template>
	<div class="full_popup mydata2023" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>버킷리스트</h1>
		</div>
		<div class="popup_content com_space_bottom com_bg_type00">
			<div class="com_inner">
				<strong class="titH1">새로운 도전, 자기계발로 시작!</strong>
				
				<ul class="mygoal_link_list">
					<li v-for="(codeInfo1, index) in codeListDepth1" :key="'key_'+index">
						<a href="javascript:void(0)" :class="chkClass(codeInfo1.comnCVal)" @click.prevent="close(codeInfo1)">{{codeInfo1.comnCExpl}}</a>
					</li>
				</ul>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
</template>

<script>

import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

export default {
    name : "PDMY2035",
    data: () => {
		return {
			mydtCusno           : '',   //마이데이터고객번호
            fncObtDsc           : '',   //금융목표구분코드 필수(06:여가생활)
            sqno                : '',   //일련번호(상세조회시 필수)
			codeListDepth1				: [],	// 1뎁스 코드 리스트
			comnCId : ''
        }
    },
    computed : {
	
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
	init() {
		
	},
    methods: {
		initComponent(params) {
			this.comnCId = params.comnCId

			this.getData()

		},
		chkClass(comnCVal) {
			let rtn = ""
			if(comnCVal == "100") {
				rtn = 'language'
			} else if(comnCVal == "200") {
				rtn = 'certificate'
			} else if(comnCVal == "300") {
				rtn = 'hobby'
			}
			return rtn
		},
		getData() {
			const config = {
				url: '/co/co/00r04',
				data: {
						"comnCId": this.comnCId
					}
			};
			apiService.call(config).then(response => {
				this.codeListDepth1 = response.comnCList || []
			});
		},
    },
}
</script>