	<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 금융자산 > 한번애 > 상세정보 전송요구 및 개인(신용)정보 수집ㆍ이용 동의(상세) > 시/도 선택
* @ 페이지설명 : 한번에 > 상세정보 전송요구 및 개인(신용)정보 수집ㆍ이용 동의(상세)
* @ 파일명     : src/views/page/CO/AR/COAR2015/COAR2015.vue
* @ 작성자     : CS533459
* @ 작성일     : 2023-07-28
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-28              CS533459              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- 슬라이드 팝업 시작 -->
        <div class="dimmed" style="display: block;" @click="closeSlide()"></div>
        <div class="popup_box renewal mydata2023">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <strong class="com_pop_tit01">시/도 선택</strong>
                </div>
                <div class="popup_content">
                    <div class="radio_list noLine" >
                        <div class="btn_radio" v-for="(item, idx) in cityList" :key="idx">
                            <input type="radio" v-model="selectItem" :value="item" name="radio03" :id="'radio'+idx" @click="close(item)">
                            <label :for="'radio'+idx">{{item.comnCExpl}}</label>
                        </div>
                    </div>
                </div>
                <div class="popup_footer">
                </div>
                
                <!-- <a href="javascript:void(0);" role="button" class="btn_close" @click="close()"><span class="">닫기</span></a> -->
            </div>
        </div>
        <!--// 슬라이드 팝업 종료 -->
    </div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'

  export default {
        name : "COAR2015",
        data: () => {
            return {
                selectItem : {},
                cityList : [],  
            }
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        computed : {
        },
        mounted() {
            this.initComponent()
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)  //접근로그 주석 요청. 21.12.03
        },
        methods: {
            initComponent() {
                this.getData();
            },
            getData() {
                const config = {
                    url : "/co/co/00r05",
                    data : {
                        "comnCId" : "RP_SFGV_GRU_C",
                    }
                }
                apiService.call(config).then(response => {
                    this.cityList.push(...response.comnCList)
                })
            },
          
            /* 슬라이드 팝업 닫기 */
            closeSlide() {
                this.close(this.selectItem || {})
            },
        }
    }
    </script>