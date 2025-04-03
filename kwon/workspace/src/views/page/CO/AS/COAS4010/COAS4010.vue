<!--
/*************************************************************************
* @ 서비스경로 : 서비스 가입 > 가입 완료
* @ 페이지설명 : 가입 완료
* @ 파일명     : src/views/page/CO/AS/COAS4010/COAS4010.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-02-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-17              CS541599              최초작성(COAS2010->COAS4010)
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box complete">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <strong class="com_pop_tit01">가입 완료</strong>
                </div>
                <div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
                    <div class="complete_box">
                        <p class="txt">NH콕마이데이터 서비스에 가입했어요.</p><!-- [v4.0] 25-02-11 문구수정 -->
                        <p class="txt_sub">이제 흩어진 자산을 한 곳에 모아<br>
                            맞춤 자산관리 서비스를 받아보세요.</p>
                    </div>
                </div>
                <div class="popup_footer fixed">
                    <div class="btns_wrap">
                        <button type="button" class="btns lg primary" @click.prevent="moveMainPage()">확인</button>
                    </div>
                </div>
                
                <a href="#nolink" role="button" class="btn_close" @click.prevent="moveMainPage()"><span class="">닫기</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>

<script>
import apiService from '@/service/apiService'
import commonService from '@/service/commonService'
import modalService from '@/service/modalService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'

export default {
    name: 'COAS4010',
    data: () => {
        return {
            param : {}
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
        console.log("@@@@@@@=>>>>",this.params)
        this.initComponent(this.params)
    },
    methods: { 
        initComponent(param = {}) {
            console.log('@@@@=>',param)
            this.param = param
            this.getData()
        },

        getData() {
            /*
            if(this.param.rcmFlag) {
                modalService.alert("@@@추천인 등록 경우","","확인")
            } else {
                modalService.alert("@@@추천인 미등록 경우","","확인")
            }
            */
        },
        
        moveMainPage() {
            // 가입 완료 후 메인 진입 시 디폴트 일반모드 설정
            this.setScrmode('N')

            this.closeAll()

            const menu = {
                name : "MAMA4001",
                params : {"addAssetYn" : "N"}
            }
            commonService.movePage(menu)
        }

    },
    components: {      
        
    },
}
</script>