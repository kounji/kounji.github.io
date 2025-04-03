<!--
/*************************************************************************
* @ 서비스경로 : 서비스 가입 > 권유 직원 선택
* @ 페이지설명 : 권유 직원 선택
* @ 파일명     : src/views/page/CO/AS/COAS4009/COAS4009.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-02-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-17              CS541599              최초작성(COAS2008->COAS4009)
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <h1>권유직원 선택하기</h1>
                </div>
                <div class="popup_content">
                    <div class="input">
                        <input type="text" name="" id="input04" required="" v-model="keyword" placeholder="직원명을 입력해주세요.">
                        <button type="button" class="btn_search" @click.prevent="fn_srchInvtEno(keyword)"><span class="blind">검색</span></button>
                    </div>
                </div>
                <div class="popup_footer fixed">
                    <div class="btns_wrap">
                        <button type="button" class="btns lg primary">권유직원 없이 시작하기</button>
                    </div>
                </div>
                
                <a href="#nolink" role="button" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>

<script>
import COAS4008 from '@/views/page/CO/AS/COAS4008/COAS4008' // 권유직원 선택
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import {fncSlick_Terms} from '@/utils/slick'

export default {
    name: 'COAS4009',
    data: () => {
        return {
            enoObj  : "", // 선택된 권유직원 정보
            keyword : "", // 입력한 검색어
        }
    },
    computed: {
        
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    created() {
    },
    mounted() {
        this.initComponent(this.params)
    },
    methods: { 
        initComponent(param = {}) {
            this.getData()
        },
        getData() {
            
        },

        /* 권유직원 검색 팝업 */
        fn_srchInvtEno(enm) {
            const config = {
                component : COAS4008,
                params : {
                    invtEmpnm : this.keyword // 권유직원명
                }
            }
            modalService.openPopup(config).then(response => {
                if(!this.isNull(response)) {
                    this.enoObj = response.selectEno || ""
                    console.log("@@@ 선택된 권유 직원 =>",this.enoObj)
                    this.close({enoObj : this.enoObj})
                }
                
            })
        },

    },
    components: {      
        
    },
}
</script>