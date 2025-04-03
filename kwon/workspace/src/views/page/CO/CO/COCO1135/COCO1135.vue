<!--
/*************************************************************************
* @ 서비스경로 : 자산등록 > 자동차
* @ 페이지설명 : 자산등록 > 자동차> step 1-1. 서비스 이용 동의 약관 보기
* @ 파일명     : src/views/page/CO/CO/COCO1135/COCO1135.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-11-02
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-11-02              CS515897              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup">
        <div class="popup_header">    
			<h1>약관동의</h1>		
        </div>
        <div class="popup_content com_bg_type00 separate_scroll">
            <div class="com_inner com_line_type01 com_top_type01">
				<strong class="com_pop_tit01">{{asetAmnStltTinm}}</strong>
            </div>
            <div class="com_inner agree_cont terms_text_wrap" ref="stltCntn" v-html="asetAmnStltCntn" @scroll="stltCntnScroll">
				
			</div>
		</div>
		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" class="btn btn_mint" :class="{btn_off: isShowAgreeBtn === false}" @click.prevent="fn_certAgree($event)">동의</a>
				<!-- btn_off 제거시 활성화 -->
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close txt_cancel" @click.prevent="fn_cancel()"><span>취소</span></a>	
    </div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'

export default {
    name : "COCO1135",
    data: () => {
        return {
			asetAmnStltTinm 	: "",		// 약관제목
			asetAmnStltCntn 	: "",		// 약관내용
			isShowAgreeBtn   	: false,   	//동의버튼활성화여부
        }
    },
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    computed : {
        
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        // 화면 초기화
        initComponent(param = {}) {
			this.asetAmnStltTinm = param.asetAmnStltTinm || ""
			this.asetAmnStltCntn = param.asetAmnStltCntn || ""

			this.getData()
			this.$nextTick(()=>{
				this.stltCntnScroll()
			})
        },
        getData() {
            
		},

		// 약관내용 스크롤 이벤트
		stltCntnScroll() {
			let scrollHeight = this.$refs.stltCntn.scrollHeight
			let clientHeight = this.$refs.stltCntn.clientHeight
			let scrollTop    = this.$refs.stltCntn.scrollTop
			if(Math.ceil(clientHeight + scrollTop) >= scrollHeight) {
				// 동의버튼 활성화
				this.isShowAgreeBtn = true
			}
		},

		// 약관 동의 버튼 클릭 이벤트
		fn_certAgree(e) {
			if(e.target.className.indexOf("btn_off") > -1) return

			this.close("true")
		},

		// 취소버튼 클릭
		fn_cancel(){
			this.close("false")
		}
        
    },
    components : {
    }
}
</script>