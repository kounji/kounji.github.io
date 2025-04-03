<!--
/*************************************************************************
* @ 서비스경로 : 큰글모드 > 지출 > 통신요금청구목록
* @ 페이지설명 : 큰글모드 > 지출 > 통신요금청구목록
* @ 파일명     : src/views/page/LC/TA/LCTA4S07/LCTA4S07.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-02-21
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-21              CS541597              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;" @click="close()"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup">
                <div class="popup_header">
                    <h1>통신비 이용 금액</h1>
                </div>
                <div class="popup_content">
                    <div class="wallet_senior">
                        <div class="gray_box">
                            <div class="analysis" :class="comparedRqsSam > 0 ? 'up' : comparedRqsSam < 0 ? 'down' : ''">
                                <p v-html="getComparedStr(comparedRqsSam)"></p>
                            </div>
                        </div>

                        <div class="board_box">
                            <ul class="lately_list">
                                <li v-for="(item, idx) in modRqsList" :key="idx">
                                    <a href="javascript:void(0);" @click.prevent="openRqsDetail(item)">
                                        <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgCNm}}</span></i>
                                        <div>
                                            <span class="name">{{item.infOfrmnOrgCNm}}</span>
                                        </div>
                                        <span class="num"><em>{{item.comuRqsAmSum | numberFilter}}</em>원</span>
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
import {monthAdd} from '@/utils/date'

import LCLE2107 from '@/views/page/LC/LE/LCLE2107/LCLE2107.vue'

export default {
    name : "LCTA4S07",
    data: () => {
        return {
            modRqsList      : [],   // 현금 이용금액 목록
            rqsSam          : 0,    // 선택 당월 통신비청구금액
            bmmRqsSam       : 0,    // 선택 전월 통신비청구금액
            inqYm           : '',   // 조회년월(일반모드 이용내역 조회 팝업 필요데이터)
        }
    },
    computed : {
        comparedRqsSam() {
            return this.rqsSam - this.bmmRqsSam
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
            this.modRqsList = param.trgtList || []
            this.rqsSam = param.nowSam || 0
            this.inqYm = param.inqYm || new Date('YYYYMM')

            // 통신비 이전월 지출내역 조회
            console.log(monthAdd(-1, this.inqYm, 'YYYYMM'))
            const config = {
                url : '/lc/le/07r01',
                data : {
                    mydtCusno : this.getUserInfo('mydtCusno'),
                    inqYm     : monthAdd(-1, this.inqYm, 'YYYYMM')
                }
            }
            apiService.call(config).then(response => {
                this.bmmRqsSam = response.rqsSam || 0
            })
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
            }else if(compared < 0) {
                text = "지난달보다<br><em class='num'>" + numberFormat(compared * -1) + "</em>원 <strong>적게 쓰고 있어요.</strong>"
            }
            return text;
        },
        openRqsDetail(obj){
            
            const config = {
                component: LCLE2107,
                params : {
                    mydtCusno		: this.getUserInfo("mydtCusno"),
                    inqYm 			: this.inqYm
                }
            }
            // renderer 사용 시 풀팝업 > 캘린더(슬라이드) 에서 다시 돌아올 때 화면요소 사라짐 이슈 확인필요
            //config.renderer = this.modalConfig.renderer
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