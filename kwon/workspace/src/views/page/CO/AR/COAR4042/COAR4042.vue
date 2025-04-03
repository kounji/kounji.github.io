<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 금융자산 > 연결 기관 선택 > 연결기관옵션
* @ 페이지설명 : 연결기관옵션
* @ 파일명     : src/views/page/CO/AR/COAR4042/COAR4042.vue
* @ 작성자     : CS540685
* @ 작성일     : 2025-02-28
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-28              CS540685              상호금융 NH콕마이데이터 4.0 추진 개발
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <h1>옵션 선택</h1>
                </div>
                <div class="popup_content">
                    <div class="radio_group">
                        <template v-for="(item, idx) in filterOpts">
                            <div v-if="item.scrmode.includes(scrmode)" :key="idx" class="radio">
                                <input type="radio" name="option_chk" :id="'option_chk_' + idx" v-model="filterOptCode" :value="item.code">
                                <label :for="'option_chk_' + idx">{{item.name}}</label>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="popup_footer fixed">
                    <div class="btns_wrap">
                        <button type="button" class="btns lg primary" @click="fn_selectFilterOpt()">확인</button>
                    </div>
                </div>
                
                <a href="javascript:void(0)" role="button" class="btn_close" @click="fn_closeSlide()"><span class="">닫기</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>

<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'

export default {
    name: 'COAR4042',
    data: () => {
        return {
            filterOpts: [
                {"code": "rec", "name": "추천기관", "scrmode": "UNSC",}
                , {"code": "all", "name": "전체기관", "scrmode": "UNSC",}
                , {"code": "expr", "name": "만료예정 기관", "scrmode": "UNSC",}
                , {"code": "conn", "name": "연결기관", "scrmode": "UNSC",}
                , {"code": "unConn", "name": "연결기관 제외", "scrmode": "UNSC",}
                , {"code": "bank", "name": "은행 추천", "scrmode": "UNSC",}
                , {"code": "card", "name": "카드사 추천", "scrmode": "UNSC",}
                , {"code": "insu", "name": "보험사 추천", "scrmode": "UNS",}
                , {"code": "telecom", "name": "통신업 추천", "scrmode": "UNS",}
                , {"code": "invest", "name": "증권 추천", "scrmode": "UNS",}
                , {"code": "efin", "name": "페이 추천", "scrmode": "UNSC",}
                , {"code": "public", "name": "공공 추천", "scrmode": "UNS",}
            ],
            resData: {},
            filterOptCode: ""
        }
    },
    props: {
        cdata: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        scrmode() {
			return this.getScrmode().mode || 'N';
		}
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    created() {
        
    },
    mounted() {
        this.initComponent();
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name);
    },
    methods: { 
        initComponent() {
            this.resData = this.cdata.filterOpt || {};
            this.filterOptCode = this.resData.code;
            
        },
        getData() {
        },

        fn_closeSlide() {
            this.close();
        },

        fn_selectFilterOpt() {
            this.close(this.filterOpts.find(t => t.code == this.filterOptCode));
        },

    },
    components: {      
        
    },
}
    
</script>