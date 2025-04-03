<!--
/*************************************************************************
* @ 서비스경로 : 더보기 > 도움말(이벤트) > 이벤트 > 이벤트 목록
* @ 페이지설명 : 이벤트 목록
* @ 파일명     : src/views/page/MR/EV/MREV2000/MREV2000.vue
* @ 작성자     : CS530689
* @ 작성일     : 2024-01-31
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2024-01-31              CS530689              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
    <div class="full_popup renewal mydata2023" id="full_popup_01"> 
        <div class="popup_header">
            <h1>이벤트</h1>
            <!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
        </div>
        
        <div class="popup_content com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_tabmenu_type01">
				<ul role="tablist">
					<li :class="tabIndex == 0 ? 'on' : ''" @click="tabChange(0)"><a href="javascript:void(0);">이벤트 목록</a></li>
					<li :class="tabIndex == 1 ? 'on' : ''" @click="tabChange(1)"><a href="javascript:void(0);">당첨자 발표</a></li>
				</ul>
			</div>
            <MREV2006 v-if="tabIndex == 0"/>
            <MREV2007 v-if="tabIndex == 1"/>
		</div>
        <a href="javascript:void(0);" class="btn_close" @click.prevent="closePage"><span class="blind">팝업닫기</span></a>
    </div>
    <!--// full popup E -->
</template>
<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
// import modalService from '@/service/modalService'

import MREV2006 from '@/views/page/MR/EV/MREV2006/MREV2006'
import MREV2007 from '@/views/page/MR/EV/MREV2007/MREV2007'

export default {
    name : "MREV2000",
    data: () => {
        return {
            tabIndex: 0
        }
    },
    computed: {
    },
    created: () => {
        
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    mounted() {
        
        this.initComponent()
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

    },
    methods: {
        initComponent(){
        },
        getData(){
        },
        tabChange(idx){
            this.tabIndex = idx
        },
        closePage(){
            this.close()
        },
    },
    components: {      
        MREV2006,
        MREV2007,
    }
}
</script>