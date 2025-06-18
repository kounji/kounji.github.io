<!--
/*************************************************************************
* @ 서비스경로 : 더보기>타기관 마이데이터 관리>마이데이터 가입·조회 및 관리>서비스 이용현황>전송요구내역 통합조회 결과
* @ 페이지설명 : 전송요구내역 통합조회 결과
* @ 파일명     : src/views/page/CO/OR/COOR2005/COOR2005.vue
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
			<textarea v-model="rspOrgInfoAllList" disabled style="height: 100%; border: 2px solid #ccc; padding: 10px; color: black;"/>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click="closeAllData(true)"><span class="blind">팝업닫기</span></a>
	</div>
</template>

<script>
    import apiService from '@/service/apiService'
    import commonService from '@/service/commonService'

    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'

    import {mapGetters} from 'vuex'
    
    // import _ from 'lodash'

    export default {
        name : "COOR2005Pop",
        data: () => {
            return {
                rspOrgInfoAllList : []  // 응답+미응답 기관정보 리스트
                , totCnt : 0
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
                console.log('this.params', this.params)
                this.totCnt = this.params
                this.rspOrgInfoAllList = JSON.stringify(this.params, null, 2) 
            }
        },
        components : {
            // Page
        }
    }
</script>