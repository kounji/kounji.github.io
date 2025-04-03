<!--
/*************************************************************************
* @ 서비스경로 : 자산연결 > 금융자산 > 한번에 > 실패 기관 연결 재시도
* @ 페이지설명 : 실패 기관 연결 재시도
* @ 파일명     : src/views/page/CO/AR/COAR2014/COAR2014.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-08-31
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-31              CS528069              최초작성
* 2023-08-03              CS533459              상호금융 마이데이터 확대 개발
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;" @click="close()"></div>
        <div class="popup_box renewal mydata2023">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <strong class="com_pop_tit01"><em>{{orgFailInfo.length}}개</em> 기관에 요청한 연결 재시도<br/>
                        결과를 확인해 주세요
                    </strong>
                </div>

                <div class="popup_content com_btn_bottom">
                    <div class="custom_list com_box_type01 mt15 noBorder">
                        <div class="list_type_custom">
                            <div class="list_item" v-for="(item, idx) in orgFailInfo" :key="'reTry_'+idx">
                                <i :class="item.org_code"></i>
                                <strong class="tit">{{item.org_name}}</strong>
                                <span class="ico_result suc" v-if="item.isSucc">연결성공</span>
                                <span class="ico_result fail_tip" v-else>실패
                                    <div class="custom_tooltip up">
                                        <div class="com_tooltip_type02 com_tooltip_type03">
                                            <a href="javascript:void(0);" role="button" class="com_btn_info">
                                                <em class="com_icon_info3"><span class="blind">툴팁열기</span></em>
                                                <span class="arrow" style="display:none"></span>
                                            </a>
                                        </div>
                                        <div class="com_ballon_type01 com_ballon_type02" style="display:none;">
                                            <div>
                                                {{item.rsp_msg}}<br/>
                                                (오류코드 <em>{{item.rsp_code}}</em>)
                                                <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                            </div> 
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                    <!-- <p class="dot_msg mt-5">보유 자산이 없는 기관은 연결에 제외 됩니다.</p> -->
                </div>
                <div class="popup_footer">
                    <div class="btn_box">
                        <a href="javascript:void(0);" class="btn btn_mint" @click="close()">확인</a>
                    </div>
                </div>
                
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>

<script>
import apiService from '@/service/apiService'
// import modalService from '@/service/modalService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'

export default {
    name: 'COAR2014',
    data: () => {
        return {
            orgFailInfo : [],   // 재시도 기관 정보
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
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: { 
        initComponent(param={}) {
            this.orgFailInfo = param.orgFailInfo || []
            console.log(this.orgFailInfo)
        },
        getData() {

        },

    },
    components: {      
        
    },
}
    
</script>