<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산현황 > 보험목록 > 물보험 상세 > 목적물
* @ 페이지설명 : 나의자산 > 자산현황 > 보험목록 > 물보험 상세 > 목적물 슬라이드 팝업
* @ 파일명     : src/views/page/AS/IS/ASIS2025/ASIS2025.vue
* @ 작성자     : CS533571
* @ 작성일     : 2023-09-08
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-09-08              CS533571              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div v-on:click.prevent="close()" class="dimmed" style="display:block;"></div>
        <div class="popup_box mydata2023">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
                <div class="popup_header">
                    <h1>목적물 현황</h1>          
                </div>
                <div class="popup_content com_btn_bottom insur">
                    <div class="gray_box_2023">
                        목적물 총 합계 <span class="num">{{ obvmCn }}</span>개
                    </div>

                    <ul class="list_type_2023 list_type_line">
                        <li v-for="(item, idx) in obvmList" :key="idx">
                            <dl class="prodName">
                                <dt>{{item.atisrTngNm}}({{item.atisrTngNo}})</dt>
                                <dd></dd>
                            </dl>						
                            <dl>
                                <dt>인/물 구분</dt>
                                <dd>{{item.mnTngDsNm}}</dd>
                            </dl>
                            <dl>
                                <dt>주피보험자여부</dt>
                                <dd>{{item.pnpAtisrYn == '1' ? '주피보험자' : '종피보험자'}}</dd>
                            </dl>
                            <dl>
                                <dt>소재지</dt>
                                <dd>{{item.obvmLocaaAdr}}</dd>
                            </dl>
                            <dl>
                                <dt>물건구분</dt>
                                <dd>{{item.isrTngDsNm}}</dd>
                            </dl>
                            <dl>
                                <dt>목적물</dt>
                                <dd>{{item.isrObvmNm}}</dd>
                            </dl>
                        </li>
                    </ul>
                </div>
                <div class="popup_footer">
                    <div class="btn_group">
                        <a v-on:click.prevent="close()" href="javascript:void(0);" class="btn btn_mint">확인</a>
                    </div>
                </div>
                <a v-on:click.prevent="close()" href="javascript:void(0);" class="btn_close"><span class="">취소</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'

export default {
    name : "ASIS2025",
    data: () => {
        return {
            obvmCn     : 0,   // 목적물건수
            obvmList   : [],  // 목적물목록
        }
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    mounted() {
        this.initComponent(this.params);

        // PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name);
    },
    methods: {
        initComponent(param) {
            this.infOfrmnOrgC = param.infOfrmnOrgC
            this.isrSctsNo = param.isrSctsNo

            this.getData()
        },
        getData() {
            const config = {
                url: '/as/is/25r01',
                data: {
                    mydtCusno    : this.getUserInfo('mydtCusno'), // 고객번호
                    infOfrmnOrgC : this.infOfrmnOrgC,             // 정보제공자기관코드
                    isrSctsNo    : this.isrSctsNo,                // 보험증권번호
                }
            }

            apiService.call(config).then(response => {
                this.obvmCn = response.obvmCn
                this.obvmList = response.obvmList
            })
        }
    }
}
</script>