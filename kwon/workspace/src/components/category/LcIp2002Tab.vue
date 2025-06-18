<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출분석
* @ 페이지설명 : 지출 > 지출분석 > 정기지출 리포트
* @ 파일명     : src\components\category\LCIP2022Tab.vue
* @ 작성자     : CS533045
* @ 작성일     : 2023-08-23
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-23              CS533045              최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>유형별 지출</h1>
		</div>
		<div class="popup_content com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_tabmenu_type03 switchType btn2 mt20">
				<ul role="tablist">
					<li role="presentation" aria-controls="tab_01" :aria-selected="viewIndex == 0 ? true : false" :class="viewIndex == 0 ? 'on' : ''" @click.prevent="tabChangeEvent(0)"><a href="javascript:void(0)" role="tab" :aria-selected="viewIndex == 0 ? true : false"><span>지출현황</span></a></li>
					<li role="presentation" aria-controls="tab_02" :aria-selected="viewIndex == 1 ? true : false" :class="viewIndex == 1 ? 'on' : ''" @click.prevent="tabChangeEvent(1)"><a href="javascript:void(0)" role="tab" :aria-selected="viewIndex == 1 ? true : false"><span>전월비교</span></a></li>
					<li role="presentation" aria-controls="tab_03" :aria-selected="viewIndex == 2 ? true : false" :class="viewIndex == 2 ? 'on' : ''" @click.prevent="tabChangeEvent(2)"><a href="javascript:void(0)" role="tab" :aria-selected="viewIndex == 2 ? true : false"><span>지출패턴</span></a></li>
				</ul>
			</div>		

			<LCIP2002 v-if="viewIndex == 0" ref="LCIP2002"/>
			<LCIP2003 v-if="viewIndex == 1" ref="LCIP2003"/>
			<LCIP2004 v-if="viewIndex == 2" ref="LCIP2004"/>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
// import modalService from '@/service/modalService'
// import {dateFormat, monthAdd, dayAdd} from '@/utils/date'
// import {amountCountAnimate} from '@/utils/jUtils'

import LCIP2002 from '@/views/page/LC/IP/LCIP2002/LCIP2002'
import LCIP2003 from '@/views/page/LC/IP/LCIP2003/LCIP2003'
import LCIP2004 from '@/views/page/LC/IP/LCIP2004/LCIP2004'

export default {
    name : "LCIP2002TAB",
    data: () => {
        return {
			viewIndex: 0,
			viewYN: '',
            res: {},
            cusNb: '',              // 마이데이터고객번호
        }
    },
    computed : {
    },
    created() {
        this.cusNb = this.getUserInfo("mydtCusno")
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent() {
			// this.basYm = this.params ? this.params.pBasYm : ''
			// this.todayBasYm = dateFormat(new Date(), "YYYYMM")

			// this.getBasYm()
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
        LCIP2002,
        LCIP2003,
        LCIP2004
    }
}
</script>