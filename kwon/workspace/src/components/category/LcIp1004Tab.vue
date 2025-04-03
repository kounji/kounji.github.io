<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출분석
* @ 페이지설명 : 지출 > 지출분석 > 카테고리별 지출 - 업종별 지출 비교
* @ 파일명     : src\components\category\LcIp1004Tab.vue
* @ 작성자     : CS529599
* @ 작성일     : 2022-10-19
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-10-19              CS529599              최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01">
		<div class="popup_header">    
			<h1>카테고리별 지출</h1>
		</div>
		<div class="popup_content com_no_bottom">
			<div class="com_inner">
                <!--
				<div class="com_tabmenu_type03 custom_tab">
					<ul role="tablist">
						<li role="tab" :aria-selected="viewIndex == 0 ? true : false" aria-controls="tab_01" :class="viewIndex == 0 ? 'on' : ''"><a href="javascript:void(0);" @click.prevent="tabChangeEvent(0)"><span>업종별 지출 비교</span></a></li>
						<li role="tab" :aria-selected="viewIndex == 1 ? true : false" aria-controls="tab_02" :class="viewIndex == 1 ? 'on' : ''"><a href="javascript:void(0);" @click.prevent="tabChangeEvent(1)"><span>지출 상세 내역</span></a></li>
					</ul>
				</div>
                -->

                <template v-if="viewIndex == 0">
                    <LCIP1004></LCIP1004>
                </template>
                <template v-if="viewIndex == 1">
                    <LCIP1006></LCIP1006>
                </template>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'

import LCIP1004 from '@/views/page/LC/IP/LCIP1004/LCIP1004'
import LCIP1006 from '@/views/page/LC/IP/LCIP1006/LCIP1006'

export default {
    name : "LCIP1004TAB",
    data: () => {
        return {
            viewIndex: 0
        }
    },
    computed : {
    },
    created() {
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent() {
            this.getData();
        },
        getData() {
        },
        tabChangeEvent(idx) {
            this.viewIndex = idx
        }
    },
    mixins: [
        commonMixin,
        popupMixin,
    ],
    components: {      
        LCIP1004,
        LCIP1006
    }
}
</script>