<!--
/*************************************************************************
* @ 서비스경로 : 큰글모드 > 지출 > 카드이용금액
* @ 페이지설명 : 큰글모드 > 지출 > 카드이용금액
* @ 파일명     : src/views/page/LC/TA/LCTA4S03/LCTA4S03.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-02-19
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-19              CS541597              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;" @click="close()"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup">
                <div class="popup_header">
                    <h1>카드 이용 금액</h1>
                </div>
                <div class="popup_content">
                    <div class="wallet_senior">
                        <div class="gray_box">
                            <div class="analysis" :class="comparedCardSam > 0 ? 'up' : comparedCardSam < 0 ? 'down' : ''">
                                <p v-html="getComparedStr(comparedCardSam)"></p>
                            </div>
                        </div>

                        <div class="board_box">
                            <ul class="lately_list">
                                <li v-for="(item, idx) in cdUsgList" :key="idx">
                                    <a href="javascript:void(0);" @click.prevent="openCardDetail(item)">
                                        <i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgCNm}}</span></i>
                                        <div>
                                            <span class="name">{{item.cdcoCdWrsnm}}</span>
                                            <span class="account">{{item.cdcoCdNo}}</span>
                                        </div>
                                        <span class="num"><em>{{item.cdUgUsAm | numberFilter}}</em>원</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="popup_footer">
                    <div class="btn_group">
                        <button type="button" class="btns lg primary" @click="close()">확인</button>
                    </div>
                </div>

                <a href="javascript:void(0);" class="btn_close" @click="close()"><span class="">닫기</span></a>
            </div>
            
        </div>
        <!-- slide popup E -->
    </div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import commonService from '@/service/commonService'
import modalService from '@/service/modalService'
import {numberFormat} from '@/utils/number'

import LCLE4002 from '@/views/page/LC/LE/LCLE4002/LCLE4002.vue'

export default {
    name : "LCTA4S03",
    data: () => {
        return {
            cdUsgList       : [],   // 카드별 이용금액 목록
            cardApvSam      : 0,    // 선택 당월 카드승인금액
            bmmCardApvSam   : 0,    // 선택 전월 카드승인금액
            inqYm           : '',   // 조회년월(일반모드 이용내역 조회 팝업 필요데이터)
        }
    },
    computed : {
        comparedCardSam() {
            return this.cardApvSam - this.bmmCardApvSam
        }
    },
    created() {
        
    },
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent(param) {
            console.log('>>> param >>> ', param)

            this.getData(param)
        },
        /*
         * 모창에서 받은 데이터 기반 화면 노출 리스트 생성
         */
        getData(param) {
            this.cdUsgList = param.trgtList || []
            this.cardApvSam = param.nowSam || 0
            this.bmmCardApvSam = param.bfSam || 0
            this.inqYm = param.inqYm || new Date('YYYYMM')
        },
        /**
         * 슬라이드 팝업 내 증감구분 html 생성
         */
        getComparedStr(compared) {
            let text = "";
            if(compared == 0) {
                text = "지난달 지출과 <strong>같아요.</strong>";
            }else if(compared > 0) {
                text = "지난달보다<br><em class='num'>" + numberFormat(compared) + "</em>원 <strong>많이 쓰고 있어요.</strong>"
            }else{
                text = "지난달보다<br><em class='num'>" + numberFormat(compared * -1) + "</em>원 <strong>적게 쓰고 있어요.</strong>"
            }
            return text;
        },
        openCardDetail(obj){
            const config = {
                component: LCLE4002,
                params : {
                    mydtCusno		: this.getUserInfo("mydtCusno"),
                    inqYm 			: this.inqYm,
                    infOfrmnOrgC	: (obj==="ALL")?'':obj.infOfrmnOrgC,
                    mydtCdId		: (obj==="ALL")?'':obj.mydtCdId,
                    cdcoCdWrsnm		: (obj==="ALL")?'전체카드':obj.cdcoCdWrsnm,
                }
            }
            // renderer 사용 시 팝업 비정상 호출
            // config.renderer = this.modalConfig.renderer
            modalService.openPopup(config).then(() => {
                
            })
        },
        
    },
    mixins: [
        commonMixin,
        popupMixin
    ]
}
</script>