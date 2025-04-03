<!--
/*************************************************************************
* @ 서비스경로 : 자산연결 > 금융자산 > 한번에 > 선택정보 수집ㆍ이용 동의 재확인 팝업
* @ 페이지설명 : 선택정보 수집ㆍ이용 동의 재확인 팝업
* @ 파일명     : src/views/page/CO/AR/COAR2013/COAR2013.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-08-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-26              CS528069              최초작성
* 2023-08-07              CS533459              상호금융 마이데이터 확대 개발
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;" @click="close()"></div>
        <div class="popup_box renewal mydata2023">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <strong class="com_pop_tit01">수집&middot;이용에 동의해 주세요</strong>
                </div>
                <div class="popup_content com_btn_bottom agreementViewList">
                    <div class="agreeViewList">
                        <strong class="com_txt_sub01" v-if="isAccSummYn">적요/거래메모 수집&middot;이용 동의</strong>
                        <div class="gray_box_m agreeBox" v-if="isAccSummYn">
                            <p class="title">
                                <b>예시</b>
                                <span>예상 정기지출을 알 수 있어요</span>
                            </p>
                            <div class="agreeTxt">
                                <i class="iconBox AS20000014"></i>
                                <dl class="cat">
                                    <dt>아파트 관리비</dt>
                                    <dd>50,000원</dd>
                                </dl>
                                <dl class="pod">
                                    <dt>MY콕통장</dt>
                                    <dd>4,285,000원</dd>
                                </dl>
                            </div>
                        </div>
                        <strong class="com_txt_sub01" v-if="isFranchInfoYn">가맹점명/사업자등록번호 수집&middot;이용 동의</strong>
                        <div class="gray_box_m agreeBox" v-if="isFranchInfoYn">
                            <p class="title">
                                <b>예시</b>
                                <span>지출 관리를 할 수 있어요</span>
                            </p>
                            <div class="agreeTxt">
                                <i class="iconBox AS20000003"></i>
                                <dl class="cat">
                                    <dt>외식/카페</dt>
                                    <dd>780,000원</dd>
                                </dl>
                                <dl class="pod">
                                    <dt>아웃백스테이크</dt>
                                    <dd>1,500,000원</dd>
                                </dl>
                            </div>
                        </div>
                        <strong class="com_txt_sub01" v-if="isCateYn">상품구매 카테고리 수집&middot;이용 동의</strong>
                        <div class="gray_box_m agreeBox" v-if="isCateYn">
                            <p class="title">
                                <b>예시</b>
                                <span>소비 리포트를 확인할 수 있어요</span>
                            </p>
                            <div class="agreeExt">
                                <div class="ext">
                                    <em>쇼핑</em>
                                    <em>마트</em>
                                    <em>금융</em>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="popup_footer">
                    <div class="com_btnhalfbox_type02">
                        <a href="javascript:void(0);" role="button" class="btn btn_mint_gray" @click="fn_rtnData(false)">나중에</a>
                        <a href="javascript:void(0);" role="button" class="btn btn_mint" @click="fn_rtnData(true)">동의하고 다음</a>
                    </div>
                </div>
                
                <a href="javascript:void(0);" role="button" class="btn_close" @click="close()"><span class="">닫기</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>

<script>
/* eslint-disable */
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'

export default {
    name: 'COAR2013',
    data: () => {
        return {
            agreeAccountSummary : null,	// '적요 또는 거래메모' 수집동의
			agreeFranchiseInfo	: null,	// '가맹점명 및 사업자등록번호' 수집동의
            agreeCategory 		: null,	// '상품구매 카테고리' 수집동의
            
            isAccSummYn         : false,// '적요 또는 거래메모' 수집동의 사용여부 (은행업권, 전금업권 존재하면서 모창에서 선택하지 않은경우)
            isFranchInfoYn      : false,// '가맹점명 및 사업자등록번호' 수집동의 사용여부 (카드업권, 전금업권, 통신업권 존재하면서 모창에서 선택하지 않은경우)
            isCateYn            : false,// '상품구매 카테고리' 수집동의 사용여부 (전금업권 존재하면서 모창에서 선택하지 않은경우)
        }
    },
    computed: {

    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    created() {
        
    },
    mounted() {
        this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: { 
        initComponent(param={}) {
            console.log(param)
            this.isAccSummYn = param.isAccSummYn || false
            this.isFranchInfoYn = param.isFranchInfoYn || false
            this.isCateYn = param.isCateYn || false

            this.getData()
        },
        getData() {
            if(this.isAccSummYn) this.agreeAccountSummary = true
            if(this.isFranchInfoYn) this.agreeFranchiseInfo = true
            if(this.isCateYn) this.agreeCategory = true
        },

        // '아니오' 또는 '선택 정보 동의' 버튼 클릭
        fn_rtnData(flag) {
            if(!flag) {
                this.close('no')
            } else {
                let rtnParam = {}

                if(this.isAccSummYn) {rtnParam.agreeAccountSummary = this.agreeAccountSummary}
                if(this.isFranchInfoYn) {rtnParam.agreeFranchiseInfo = this.agreeFranchiseInfo}
                if(this.isCateYn) {rtnParam.agreeCategory = this.agreeCategory}

                this.close(rtnParam)
            }
        }

    },
    components: {      
        
    },
}
    
</script>