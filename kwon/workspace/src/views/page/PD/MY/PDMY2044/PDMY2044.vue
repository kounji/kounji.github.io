<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나의목표 > 목표등록 > 버킷리스트
* @ 페이지설명 : 금융과생활 > 나의목표 > 목표등록 > 버킷리스트 > 외화 통화 선택
* @ 파일명     : src/views/page/PD/MY/PDMY2044/PDMY2044.vue
* @ 작성자     : CS528053
* @ 작성일     : 2022-07-15
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-13              CS528053            고도화 신규 개발
* 2023-08-04              CS533453            고도화 파일명 변경(PDMY1011.vue -> PDMY2044.vue)
*************************************************************************/
-->
<template>
    <div>
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box renewal">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <h1>통화 선택</h1>
                </div>
                <div class="popup_content">
                    <div class="com_txt_type02">
                        <ul class="com_slide_check_type03 custom_nation">
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
                
                <a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="">취소</span></a>
            </div>
        </div>
    </div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
//import modalService from '@/service/modalService'
//import PDMY2031 from '@/views/page/PD/MY/PDMY2031/PDMY2031'
//import {roundNumberWithDot} from '@/utils/number'

export default {
    name : "PDMY2044",
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
            let selCurc = this.curcList[idx];
            //selCurc.curc = this.curcList[idx].curc;
            //selCurc.curm = this.curcList[idx].curnm;
            //selCurc.ttxs = (selCurc === "JPY" || selCurc === "IDR" || selCurc === "VND") ? roundNumberWithDot(this.curcList[idx].ttxs/100, 2) : this.curcList[idx].ttxs;
            //selCurc.xcrtBasDt = this.scrtBasDt;

            e.target.checked = false;    // 체크 유지 x
            
            /* const config = {
                component : PDMY2031,
                params : {
                    curc        : this.curcList[idx].curc,  // 통화코드
                    curnm       : this.curcList[idx].curnm, // 통화명
                    // 추가사항 -> 엔, 루피아, 동 은 /100 하여 환율계산
                    ttxs        : (selCurc === "JPY" || selCurc === "IDR" || selCurc === "VND") ? roundNumberWithDot(this.curcList[idx].ttxs/100, 2) : this.curcList[idx].ttxs,
                    xcrtBasDt   : this.xcrtBasDt,           // 매도환율기준일자
                    popId       : "PDMY2031"                // (추가등록용)
                }
            }
            modalService.openPopup(config).then(() => {

            }) */
            this.close(selCurc);
        }
    }
}
</script>