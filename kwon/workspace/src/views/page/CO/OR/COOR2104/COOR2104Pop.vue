<!--
/*************************************************************************
* @ 서비스경로 : 더보기>타기관 마이데이터 관리>제3자 정보제공 조회 및 관리>제3자 제공 동의내역 통합조회>동의내역
* @ 페이지설명 : 동의내역
* @ 파일명     : src/views/page/CO/OR/COOR2104/COOR2104.vue
* @ 작성자     : CS530689
* @ 작성일     : 2024-11-25
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-11-25              CS530689                 최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_content com_no_bottom" v-if="totCnt.length > 0"><!-- 하단 버튼 없을때 com_no_bottom -->
            총 {{totCnt.length}} 개
			<textarea v-model="provConsentAllList" disabled style="height: 100%; border: 2px solid #ccc; padding: 10px; color: black;"/>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click="closeAllData(true)"><span class="blind">팝업닫기</span></a>
	</div>
</template>

<script>
    // import Page from '@/views/layout/Page.vue'

    import apiService from '@/service/apiService'
    import commonService from '@/service/commonService'
    import modalService from '@/service/modalService'
    import routerService from '@/service/routerService'
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'

    import {mapGetters} from 'vuex'
    
    // import _ from 'lodash'

    export default {
        name : "COOR2104",
        data: () => {
            return {
                provConsentAllList : [] //정보제공 모든 리스트
                , totCnt : 0  //총 개수
            }
        },
        computed: {
        },
        created() {
        },
        mounted() {

            this.initComponent()
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        methods: {
            initComponent() {
                this.totCnt = this.params
                this.provConsentAllList = JSON.stringify(this.params, null, 2) 
            },
        },
        components : {
            // Page
        }
    }
</script>