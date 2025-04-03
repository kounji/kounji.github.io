<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부채 > 현금차용(빌린돈)
* @ 페이지설명 : 나의자산 > 부채 > 현금차용 > 현금차용 상세 slidepop
* @ 파일명     : src/views/page/AS/LN/ASLN2115/ASLN2115.vue
* @ 작성자     : CS515937
* @ 작성일     : 2021-06-03
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-03              CS515937              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display:block;"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
                <div class="popup_header">
                    <h1>빌린돈 상세</h1>          
                </div>
                <div class="popup_content com_btn_bottom">
                    <div class="com_txt_type01">
                        <dl>
                            <dt>빌린사람</dt>
                            <dd>
                                <span class="com_txt01">{{cashData.trPatnnm}}</span>
                            </dd>
                        </dl>
                        <dl v-if="cashData.mpno != '' && cashData.mpno != null">
                            <dt>휴대폰</dt>
                            <dd>
                                <span class="com_number01">{{cashData.mpno}}</span>
                            </dd>
                        </dl>
                        <dl>
                            <dt>빌린돈</dt>
                            <dd>
                                <span class="com_number01">{{cashData.prnAm | numberFilter}}</span>
                                <em>원</em>
                            </dd>
                        </dl>
                        <dl>
                            <dt>빌린날</dt>
                            <dd>
                                <span class="com_number01">{{cashData.stDt | dateFilter('YYYY.MM.DD')}}</span>
                            </dd>
                        </dl>
                        <dl v-if="cashData.edDt != '' && cashData.edDt != null">
                            <dt>갚을날</dt>
                            <dd>
                                <span class="com_number01">{{cashData.edDt | dateFilter('YYYY.MM.DD')}}</span>
                            </dd>
                        </dl>
                        <dl v-if="cashData.debtIntrt != '' && cashData.debtIntrt != null">
                            <dt>이자율</dt>
                            <dd>
                                <span class="com_number01">{{cashData.debtIntrt | numberFilter('0,0.00', {precision: 2})}}</span><span class="com_txt01">%</span>
                            </dd>
                        </dl>
                        <dl v-if="cashData.intPyDt != '' && cashData.intPyDt != null">
                            <dt>이자지급일(매월)</dt>
                            <dd>
                                <span class="com_number01">{{cashData.intPyDt}}</span><em>일</em>
                            </dd>
                        </dl>
                    </div>
                </div>
                <div class="popup_footer">
                    <div class="com_btnhalfbox_type02">
                        <a href="javascript:void(0);" v-on:click.prevent="deleteData()" class="btn btn_grey">삭제</a>
                        <a href="javascript:void(0);" v-on:click.prevent="openPage()" class="btn btn_mint">수정</a>
                        <!-- btn_off 제거시 활성화 -->
                    </div>
                </div>
                <a href="javascript:void(0);" class="btn_close" @click="close()"><span class="">취소</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import COOA2003 from '@/views/page/CO/OA/COOA2003/COOA2003'

export default {
    name : "ASLN2115",
    data: () => {
        return {
            mydtCusno   : "",   // 마이데이터고객번호
            cashData    : [],   // 현금차용 데이터(앞페이지에서 그대로 넘겨받음)
        }
    },
    mounted() {
        this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    methods: {
        initComponent(param) {
            this.mydtCusno  = param.mydtCusno || ''
            this.cashData   = param.cashData || []
        },

        getData() {
        },

        openPage() {
            const config = {
                component : COOA2003,
                params : {
                    mydtCusno   : this.mydtCusno,
                    sqno        : this.cashData.sqno,
                    isUpt       : true,
                }
            }
            // 슬라이드팝업 -> 팝업 호출 시 필수코드
            config.renderer = this.modalConfig.renderer
            
            modalService.openPopup(config).then(response => {
                console.log(response)
            })
        },
        // 빌린돈 삭제
        deleteData() {
            const config = {
                url : "/co/oa/08s01",
                data : {
                    trDsc       : '3',                              // 거래구분 코드 저장:1 , 수정:2, 삭제:3
                    mydtCusno   : this.getUserInfo("mydtCusno"),    // 마이데이터고객번호
                    sqno        : this.cashData.sqno,               // 일련번호
                }
            }
            apiService.call(config).then(response => {
                    if (response.rspC == '0000') {
                    modalService.alert("빌린돈이 삭제되었습니다.").then(() => {
                        this.close({mydtCusno : this.getUserInfo("mydtCusno"), uptCom : true});
                    })
                } else {
                    modalService.alert("삭제 중 오류가 발생하였습니다.").then(() => {});
                }
            })
        }
    },
    components : {
    }
}
</script>