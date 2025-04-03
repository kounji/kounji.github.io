<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 농기계임대
* @ 페이지설명 : 농기계임대 메인-농기계구입 자금 설계(POP) - 상환기간선택
* @ 파일명     : src/views/page/SZ/FL/SZFL2107/SZFL2107.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-06-07
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-07-14              CS515897		        최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display:block;" @click.prevent="close()"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
                <div class="popup_header">
                    <h1>상환기간 선택</h1>          
                </div>
                <div class="popup_content">
                    <div class="com_txt_type02">
                        <ul class="com_radio_type01">
                            <li v-for="(rpyDscItem, idx) in rpyDscList" :key="idx">
                                <span class="btn_radio" @click.prevent="setRlestAreaInfo(rpyDscItem.rpyPyrcn, rpyDscItem.rpyDscNm)">
                                    <input type="radio" :id="rpyDscItem.rpyPyrcn" :value="rpyDscItem.rpyPyrcn" v-model="selItem" />
                                    <label :for="rpyDscItem.rpyPyrcn">{{rpyDscItem.rpyDscNm}}</label>
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
    name : 'SZFL2107',
    data: () => {
        return {
            rpyDscList  : [],
            selItem     : ""
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
            this.rpyDscList = popupParams.list
            this.selItem    = popupParams.selectVal
        },
        // Item 선택 시 부모창으로 넘겨줄 파라미터 설정
        setRlestAreaInfo(val,name) {
            this.closeParams = {
                rpyPyrcn    : val,
                rpyDscNm    : name
            }
            this.close(this.closeParams)
        }
    },
}   
</script>