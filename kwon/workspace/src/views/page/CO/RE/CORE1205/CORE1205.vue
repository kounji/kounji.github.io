<!--
/*************************************************************************
* @ 서비스경로 : 자산등록 > 부동산
* @ 페이지설명 : 자산등록 > 부동산 > 부동산 유형 선택
* @ 파일명     : src/views/page/CO/RE/CORE1205/CORE1205.vue
* @ 작성자     : CS528053
* @ 작성일     : 2022-07-29
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2022-07-29              CS528053             최초작성
*************************************************************************/
-->
<template>
    <div>
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box renewal">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <h1>부동산 유형 선택</h1>
                    <!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
                </div>
                <div class="popup_content">
                    <div class="com_txt_type02">
                        <ul class="com_radio_type01">
                            <li v-for="(rlestItem, idx) in rlestInfo" :key="idx">
                                <span class="btn_radio" v-if="rlestItem.comnCVal != '1'" @click.prevent="setRlestAreaInfo(rlestItem.comnCVal, rlestItem.comnCExpl)">
                                    <input type="radio" name="com_check" :id="rlestItem.comnCVal" :value="rlestItem.comnCVal" v-model="selItem">
                                    <label :for="rlestItem.comnCVal">
                                        <span>{{rlestItem.comnCExpl}}</span>
                                    </label>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="">취소</span></a>
            </div>
        </div>
    </div>
</template>
<script>
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import {mapGetters} from 'vuex'

export default {
    name : "CORE1205",
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