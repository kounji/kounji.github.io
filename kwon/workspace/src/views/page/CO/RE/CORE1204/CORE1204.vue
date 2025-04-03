<!--
/*************************************************************************
* @ 서비스경로 : 자산등록 > 부동산
* @ 페이지설명 : 자산등록 > 부동산 > step 1-2. 부동산 주거형태 선택
* @ 파일명     : src/views/page/CO/RE/CORE1204/CORE1204.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-05-14
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-05-14              CS515897              최초작성
* 2022-07-19              CS528053              고도화 파일명, UI 변경 및 고도화 개발(CORE0002.vue -> CORE1204.vue)
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display:block;" @click.prevent="close()"></div>
        <div class="popup_box renewal">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
                <div class="popup_header">
                    <h1>주거형태 선택</h1>          
                </div>
                <div class="popup_content">
                    <div class="com_txt_type02">
                        <ul class="com_radio_type01">
                            <li v-for="(rlestItem, idx) in rlestInfo" :key="idx">
                                <span class="btn_radio" @click.prevent="setRlestAreaInfo(rlestItem.comnCVal, rlestItem.comnCExpl)">
                                    <input type="radio" :id="rlestItem.comnCVal + '_' + idx" name="rlestRadio" :value="rlestItem.comnCVal" v-model="selItem" />
                                    <label :for="rlestItem.comnCVal + '_' + idx">{{rlestItem.comnCExpl}}</label>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <a href="javascript:void(0);" @click.prevent="close()" class="btn_close"><span class="">취소</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>
<script>
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import {mapGetters} from 'vuex'

export default {
    name : "CORE1204",
    data: () => {
        return {
            rlestInfo : [],
            selItem : "",   // 기선택된 아이템
        }
    },
    computed: {
        ...mapGetters('config', [
                    'codeMap',
        ]),
    },
    mounted() {
        this.popInit(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        popupMixin
    ],
    methods: {
        // 팝업화면 초기화
        popInit(popupParams) {
            this.rlestInfo  = popupParams.list
            this.selItem    = popupParams.selectVal
        },
        // Item 선택 시 부모창으로 넘겨줄 파라미터 설정
        setRlestAreaInfo(val,name) {
            this.closeParams = {
                rlestTngDscVal: val,
                rlestTngDscNm : name
            }
            this.close(this.closeParams)
        }
    },

}
</script>