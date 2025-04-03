<!--
/*************************************************************************
* @ 서비스경로 : 메인 > 프로필
* @ 페이지설명 : 메인 > 프로필 > 직업 설정
* @ 파일명     : src/views/page/CO/CO/COCO1131/COCO1131.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-07-02
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-07-02              CS515897              최초작성
*************************************************************************/
-->
<template>
	<div>
		<!-- slide popup S -->
		<div class="dimmed" style="display:block;" @click="close"></div>
		<div class="popup_box">
			<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
				<div class="popup_header">
					<h1>직업 선택</h1>          
				</div>
				<div class="popup_content">
					<div class="com_txt_type03">
						<strong class="com_cont_tit01 fs16 p0">직업을 선택해 주세요.</strong>
						<ul class="com_radio_type03 mt10">
							<li v-for="(item, idx) in jobDscList" :key="'job_'+idx">
								<div class="btn_radio">
									<input type="radio" :name="'job_'+idx" :id="'job_'+idx" :checked="item.checked" @click="close({val:item.comnCVal,expl:item.comnCExpl})">
									<label :for="'job_'+idx">
										<span>{{item.comnCExpl}}</span>
									</label>
								</div>
							</li>
						</ul>
					</div>
				</div>
				
				<a href="javascript:void(0);" role="button" @click="close" class="btn_close"><span class="">취소</span></a>
			</div>
		</div>
		<!--// slide popup E -->
	</div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'

export default {
    name : "COCO1131",
    data: () => {
        return {
			jobDscList : [],
			jobDsc : "",
		}
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
    methods: {
        // 화면 초기화
        initComponent(param = {}) {
			this.jobDsc = param.selected
            this.getData()
        },
        getData() {
			this.jobDscList = this.getCodeList("JOB_DSC")
			for(let i=0; i<this.jobDscList.length; i++) {
				if(this.jobDscList[i].comnCVal === this.jobDsc) this.jobDscList[i].checked = true
				else this.jobDscList[i].checked = false
			}
		},
		
    },
    components : {
    }
}
</script>