<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출내역 > 기타목록
* @ 페이지설명 : 지출 > 지출내역 > 기타목록 > 기타목록 선택 슬라이드팝업
* @ 파일명     : src/views/page/LC/LE/LCLE4116/LCLE4116.vue
* @ 작성자     : CS515937
* @ 작성일     : 2021-06-03
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-03              CS515937              최초작성
* 2025-01-31              CS540687              마이데이터 v4.0
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;" @click.prevent="close()"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <h1>기타지출 선택</h1>          
                </div>
                <div class="popup_content">
                    <div class="com_txt_type02">
                        <ul class="com_radio_type01">
                            <li v-for="(item,index) in cashList" :key="index" @click.prevent="close(item)">
                            <span class="btn_radio">
                                <input type="radio" :name="'com_check' + index" :id="'com_check' + index" :value="item.inqDsc" v-model="inqDsc">
                                <label :for="'com_check' + index">
                                    <span>{{item.chsvKdnm}}</span>
                                </label>
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
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

export default {
    name : "LCLE4116",
    data: () => {
        return {
            mydtCusno   : "",
            inqDsc      : "",
            chsvKdnm    : "",
            cashList    : [],
        }
    },
    created() {
        this.initComponent(this.params)
    },
    mounted() {
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        initComponent(param) {
            this.mydtCusno = param.mydtCusno || ''
            this.inqDsc    = param.inqDsc || ''

            this.getData();
        },
        getData() {
            this.cashList = [
                {mydtCusno : this.mydtCusno, inqDsc : "", chsvKdnm : "전체"},
                {mydtCusno : this.mydtCusno, inqDsc : "F", chsvKdnm : "이체"},
				{mydtCusno : this.mydtCusno, inqDsc : "C", chsvKdnm : "현금"},
            ]
        },
    },
}
</script>