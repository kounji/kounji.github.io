<!--
/*************************************************************************
* @ 서비스경로 : 메인 > 프로필
* @ 페이지설명 : 메인 > 프로필 > 금융관심분야 설정
* @ 파일명     : src/views/page/CO/CO/COCO1133/COCO1133.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-07-02
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-07-02              CS515897              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>관심사 설정</h1>
			<a href="javascript:void(0);" @click="fn_closePage" class="btn_close txt_cancel"><span>닫기</span></a>
		</div>
			
		<div class="popup_content com_no_bottom com_bg_type00">
			<div class="com_inner com_line_type01 com_top_type03">
                <strong class="com_pop_tit01">금융관심사를 선택해주세요(최대4개)</strong>
			</div>
            <div class="com_inner list_area">
				<strong class="com_cont_tit01 fs16">투자</strong>
				<ul class="com_radio_type03 m0">
					<li v-for="(item0, idx0) in fncInteIvList" :key="'IV_'+idx0">
						<div class="btn_radio">
							<input type="checkbox" :name="'IV_'+idx0" :id="'IV_'+idx0" :checked="item0.checked" :value="item0.comnCVal+','+item0.comnCExpl" @change.prevent="fn_chkItem()">
							<label :for="'IV_'+idx0">
								<span>{{item0.comnCExpl}}</span>
							</label>
						</div>
					</li>
				</ul>
				<strong class="com_cont_tit01 fs16">혜택</strong>
				<ul class="com_radio_type03">
					<li v-for="(item1, idx1) in fncInteBnfitList" :key="'BNFIT_'+idx1">
						<div class="btn_radio">
							<input type="checkbox" :name="'BNFIT_'+idx1" :id="'BNFIT_'+idx1" :checked="item1.checked" :value="item1.comnCVal+','+item1.comnCExpl" @change.prevent="fn_chkItem()">
							<label :for="'BNFIT_'+idx1">
								<span>{{item1.comnCExpl}}</span>
							</label>
						</div>
					</li>
				</ul>
            </div>
			<div class="popup_footer">
				<div class="btn_full_box">
					<a href="javascript:void(0);" class="btn btn_mint" :class="btnOnOff" @click="fn_complete">선택완료</a>
				</div>
			</div>
		</div>
	</div>
	<!--// full popup E -->
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import _ from 'lodash'
import apiService from '@/service/apiService'

export default {
    name : "COCO1133",
    data: () => {
        return {
			fncInteIvList 		: [],	// 투자리스트
			fncInteBnfitList 	: [],	// 혜택리스트
			inteDataList		: [],	// 투자+혜택리스트

			addDataList			: [],	// 리턴용 리스트
        }
    },
    mounted() {
		this.initComponent(this.params)
		
		//PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)			
	},
	computed: {
		btnOnOff() {
			return this.addDataList.length > 0 ? "" : "btn_off"
		}
	},
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        // 화면 초기화
        initComponent(param = {}) {
			this.inteDataList = param.list || []
			if(this.inteDataList.length > 0) {
				for(let i=0; i<this.inteDataList.length; i++) {
					this.addDataList.push(this.inteDataList[i])
				}
			}
            this.getData()
        },
        getData() {
			this.fncInteIvList = this.getCodeList("FNC_INTE_IV_DSC")
			this.fncInteBnfitList = this.getCodeList("FNC_INTE_BNFIT_DSC")

			for(let i=0; i<this.fncInteIvList.length; i++) {
				this.fncInteIvList[i].checked = typeof _.find(this.inteDataList, {"val":this.fncInteIvList[i].comnCVal}) !== "undefined" ? true : false
			}
			for(let j=0; j<this.fncInteBnfitList.length; j++) {
				this.fncInteBnfitList[j].checked = typeof _.find(this.inteDataList, {"val":this.fncInteBnfitList[j].comnCVal}) !== "undefined" ? true : false
			}
		},
		// 아이템 선택
		fn_chkItem() {
			if(this.addDataList.length === 4 && event.target.checked) {
				modalService.alert("관심사를 4개만 선택해주세요.")
				event.target.checked = false
				return false
			}
			let temp = event.target.value.split(',')
			if(event.target.checked) {
				this.addDataList.push({val : temp[0], expl : temp[1]})
			} else {
				const idx = this.addDataList.indexOf(_.find(this.addDataList, {"val":temp[0]}))
				
				this.addDataList.splice(idx, 1)
			}
		},
		// '선택완료' 클릭
		fn_complete() {
			if(event.target.className.indexOf("btn_off") != -1) return false
			this.close({rspList:this.addDataList})
		},
		// '닫기' 클릭
		fn_closePage() {
			this.close()
		}
    },
    components : {
    }
}
</script>