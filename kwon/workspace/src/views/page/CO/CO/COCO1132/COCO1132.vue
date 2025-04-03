<!--
/*************************************************************************
* @ 서비스경로 : 메인 > 프로필
* @ 페이지설명 : 메인 > 프로필 > 가족정보 설정
* @ 파일명     : src/views/page/CO/CO/COCO1132/COCO1132.vue
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
					<h1>가족정보</h1>          
				</div>
				<div class="popup_content">
					<div class="com_txt_type03">
						<strong class="com_cont_tit01 fs16 p0">본인 포함 가족 구성원 수를 선택하세요.</strong>
						<ul class="com_radio_type03 mt10">
							<li v-for="(item, idx) in famDscList" :key="'fam_'+idx">
								<div class="btn_radio">
									<input type="radio" :name="'fam_'+idx" :id="'fam_'+idx" :checked="item.checked" @click="close({val:item.val, expl:item.expl})">
									<label :for="'fam_'+idx">
										<span>{{item.expl}}</span>
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
    name : "COCO1132",
    data: () => {
        return {
			famDscList 	: [],
			dfamCn		: "",
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
			this.getData()
			this.dfamCn = param.selected
			for(let i=0; i<this.famDscList.length; i++) {
				if(this.famDscList[i].val === this.dfamCn) this.famDscList[i].checked = true
				else this.famDscList[i].checked = false
			}
        },
        getData() {
			this.famDscList = [
				{val : 1, expl : "1명"},
				{val : 2, expl : "2명"},
				{val : 3, expl : "3명"},
				{val : 4, expl : "4명"},
				{val : 5, expl : "5명"},
				{val : 6, expl : "6명"},
				{val : 7, expl : "7명"},
				{val : 8, expl : "8명"},
				{val : 9, expl : "9명"},
				{val : 10, expl : "10명 이상"},
			]
		},
		
    },
    components : {
    }
}
</script>