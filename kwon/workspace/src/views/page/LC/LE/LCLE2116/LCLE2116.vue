<!--
/*************************************************************************
* @ 서비스경로 : 지출분석 > 지출현황 > 기타 > 기타목록
* @ 페이지설명 : 지출분석 > 지출현황 > 기타 > 기타목록 선택 슬라이드팝업
* @ 파일명     : src/views/page/LC/LE/LCLE2116/LCLE2116.vue
* @ 작성자     : CS515901
* @ 작성일     : 2021-06-16
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-16              CS515937                 최초작성
* 2023-08-28              CS533571                 마이데이터 확대개발 화면 ID변경(기존 LCLE1116)
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
    name : "LCLE2116",
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