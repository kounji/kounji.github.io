<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 자산분석
* @ 페이지설명 : 자산 > 자산분석 > 카테고리별 분석 - 유형별 금융자산
* @ 파일명     : src\components\category\AsIp2002Tab.vue
* @ 작성자     : CS533437
* @ 작성일     : 2023-07-12 
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-12              CS533437              최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal mydata2023" id="full_popup_01">
		<div class="popup_header">    
			<h1>유형별 금융자산</h1>
		</div>
		<div class="popup_content com_no_bottom">
			<!-- <div class="com_inner">  -->
                <div class="com_tabmenu_type03 switchType btn2 mt20">
					<ul role="tablist">
						<li role="presentation" :aria-selected="viewIndex == 0 ? true : false" aria-controls="tab_01" :class="viewIndex == 0 ? 'on' : ''"><a href="javascript:void(0);" @click.prevent="tabChangeEvent(0)"><span>금융자산</span></a></li>
						<li role="presentation" :aria-selected="viewIndex == 1 ? true : false" aria-controls="tab_02" :class="viewIndex == 1 ? 'on' : ''"><a href="javascript:void(0);" @click.prevent="tabChangeEvent(1)"><span>부채</span></a></li>
					</ul>
				</div>                

                <template v-if="viewIndex == 0">
                    <ASIP2002></ASIP2002>
                </template>
                <template v-if="viewIndex == 1">
                    <ASIP2003></ASIP2003>
                </template>
			<!-- </div>  -->
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'

import ASIP2002 from '@/views/page/AS/IP/ASIP2002/ASIP2002'
import ASIP2003 from '@/views/page/AS/IP/ASIP2003/ASIP2003'

export default {
    name : "ASIP2002TAB",
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
        roundTabWidth();
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
        ASIP2002,
        ASIP2003
    }
}

// 라운드탭 사이즈(가장큰 탭사이즈를 기준으로 각탭 및 전체 적용하기)
function roundTabWidth(){
	var arr = [],
			_tabList = $('.switchType li');
	_tabList.each(function(e){
		arr[e] = $(this).outerWidth();
	});
	_tabList.css('width', Math.max(...arr)); //탭 사이즈 적용
	_tabList.parent().parent().css('width',Math.max(...arr)*arr.length); //탭전체 사이즈 적용
	console.log('값 = '+arr+', 갯수 = '+arr.length+', 최고값 = '+Math.max(...arr));
}
</script>