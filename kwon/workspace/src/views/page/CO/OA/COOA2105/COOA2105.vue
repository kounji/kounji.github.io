<!--
/*************************************************************************
* @ 서비스경로 : 자산등록 > 금
* @ 페이지설명 : 자산등록 > 금 > step 1-2. 금 순도 선택
* @ 파일명     : src/views/page/CO/OA/COOA2105/COOA2105.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-05-18
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-05-18              CS515897              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup">
        <div class="popup_header">    
            <h1>금</h1>		
        </div>
        <div class="popup_content com_no_bottom com_bg_type00">
            <div class="com_inner">
                <strong class="com_cont_tit01">순도를 선택하세요</strong>
                <div class="com_txt_type02">
                    <ul class="com_radio_type01">
                        <li v-for="(item, idx) in goldKdcList" :key="'gold_'+idx">
                            <span class="btn_radio" @click.prevent="fn_setRstInfo(item)">
                                <input type="radio" name="com_check" :id="'goldK_'+idx" :value="item.goldKdc">
                                <label :for="'goldK_'+idx">
                                    <span>{{item.goldKdnm}}</span>
                                </label>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <a href="javascript:void(0);" class="btn_close" @click.prevent="closeAll()"><span class="blind">팝업닫기</span></a>
    </div>
</template>
<script>
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'

import COOA2004 from '@/views/page/CO/OA/COOA2004/COOA2004'

export default {
    name : "COOA2105",
    data: () => {
        return {
            goldKdcList: [],    // 금 데이터 리스트
            goldMprBasDt : "",  // 금시세기준일자
        }
    },
    mixins: [
        popupMixin
    ],
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent() {
            this.getData()
        },
        getData() {
            // 최신 금시세 조회
            const config = {
                url: "/as/oa/05ra2"
            };

            apiService.call(config).then(response => {
                console.log(response);
                this.goldKdcList = response.gldMprList;
            });
        },
        fn_setRstInfo(item) {
            const config = {
                component : COOA2004,
                params : {
                    goldData        : item,                 // 선택된 금 데이터
                    goldMprBasDt    : item.goldMprBasDt,    // 금시세기준일자
                    popId           : "COOA2105"            // (추가등록용)
                }
            }
            modalService.openPopup(config).then(() => {
                
            })
        }
    },
    

}
</script>