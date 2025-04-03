<!--
/*************************************************************************
* @ 서비스경로 : 자산등록 > 기타
* @ 페이지설명 : 자산등록 > 기타 > step 1. 외화 통화 선택
* @ 파일명     : src/views/page/CO/OA/COOA2103/COOA2103.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-05-17
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-05-17              CS515897              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup">
        <div class="popup_header">    
            <h1>외화</h1>		
        </div>
        <div class="popup_content com_bg_type00">
            <div class="com_inner">
                <strong class="com_pop_tit01 mt20 mb30">통화를 선택하세요.</strong>
                <div class="com_txt_type02">
                    <ul class="com_slide_check_type03 etc">
                        <li v-for="(curc, idx) in curcList" :key="'curc_'+idx">
                            <div class="btn_radio" @click.prevent="chkItem(idx, $event)">
                                <input type="radio" name="currency" :id="'currency_'+idx" :value="curc.curc" aria-hidden="true">
                                <label :for="'currency_'+idx" role="radio" name="000" aria-checked="false">
                                    <i :class="'ico_'+curc.curc"><span class="blind">{{curc.natnm}}</span></i>
                                    <span><span>{{curc.natnm}}<br><em>{{curc.curc}}</em></span></span>
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <a href="javascript:void(0);" class="btn_close" @click.prevent="closeAllData(true)"><span class="blind">팝업닫기</span></a>
    </div>
</template>
<script>
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import COOA2002 from '@/views/page/CO/OA/COOA2002/COOA2002'
import {roundNumberWithDot} from '@/utils/number'

export default {
    name : "COOA2103",
    data: () => {
        return {
            curcList    : [],   // 통화목록
            xcrtBasDt   : "",   // 환율기준일자
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
            // 외화 통화 조회
            const config = {
                url : "/co/oa/03r01",
                data : {"mydtCusno" : this.getUserInfo("mydtCusno")}
            }
            apiService.call(config).then(response => {
                this.curcList = response.curcList || []
                this.xcrtBasDt = response.xcrtBasDt || ""
            })
        },
        chkItem(idx, e) {
            let selCurc = this.curcList[idx].curc

            e.target.checked = false    // 체크 유지 x
            
            const config = {
                component : COOA2002,
                params : {
                    curc        : this.curcList[idx].curc,  // 통화코드
                    curnm       : this.curcList[idx].curnm, // 통화명
                    // 추가사항 -> 엔, 루피아, 동 은 /100 하여 환율계산
                    ttxs        : (selCurc === "JPY" || selCurc === "IDR" || selCurc === "VND") ? roundNumberWithDot(this.curcList[idx].ttxs/100, 2) : this.curcList[idx].ttxs,
                    xcrtBasDt   : this.xcrtBasDt,           // 매도환율기준일자
                    popId       : "COOA2103"                // (추가등록용)
                }
            }
            modalService.openPopup(config).then(() => {

            })

        }
    },
    

}
</script>