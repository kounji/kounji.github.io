<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출분석 > 유형별 지출 > 미확인 지출 확인
* @ 페이지설명 : 지출 > 지출분석 > 유형별 지출 > 미확인 지출 확인
* @ 파일명     : src\views\page\LC\IP\LCIP2010\LCIP2013.vue
* @ 작성자     : CS533045
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10              CS533045              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- 슬라이드 팝업 시작 -->
        <div class="dimmed" style="display: block;" @click.prevent="close()"></div>
        <div class="popup_box renewal mydata2023">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <strong class="com_pop_tit01">
                        내역 확인이 필요한 지출이<br>
                        <span class="num">{{unClfXpsAm | numberFilter}}</span>원 있어요
                    </strong>
                </div>
                <div class="popup_content com_btn_bottom">
                    <p class="com_txt_sub mt20">계좌 입출금, 카드 결제 가맹점, 페이 사용 정보 확인을 위해 연결 변경이 필요해요</p>

                    <ul class="change_bank_list">
                        <li class="list_item" v-for="(item, idx) in unCnfXpsList" :key="idx">
                            <i :class="item.orgCode"></i>
                            <span class="bank_name">{{item.orgNm}}</span>
                        </li>
                    </ul>
                </div>

                <div class="popup_footer">
                    <div class="btn_box">
                        <a href="javascript:void(0);" class="btn btn_mint" @click.prevent="openAssetPopup()">다음</a>
                    </div>
                </div>
                <a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
            </div>
        </div>
        <!--// 슬라이드 팝업 종료 -->
    </div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import COAR2007 from '@/views/page/CO/AR/COAR2007/COAR2007'

export default {
    name: "LCIP2013",
    data: () => {
        return {
            unClfXpsAm: 0,      // 미확인 지출 총 합계금액
            unCnfXpsList: [],   // 연결 변경 필요 기관
            moduleList: []      // 자산연결 선택기관목록
        }
    },
    mounted() {
        this.initComponent(this.params)
    },
    methods: {
        initComponent(params) {
            this.unClfXpsAm = params.unClfXpsAm
            this.unCnfXpsList = params.unCnfXpsList
            if(this.unCnfXpsList){
                this.moduleList = this.unCnfXpsList.map(item => {
                    return {
                        "infOfrmnOrgC": item.orgCode
                        ,"orgBizDsc" : item.orgBzrgC
                        ,"orgnm" : item.orgNm
                    }
                })
            }
        },
        openAssetPopup() {
            const config = {
                component : COAR2007,
                params : {
                    moduleList 		 : this.moduleList,
                    selectedCnt 	 : this.moduleList.length,
                    isAlreadyConnect : true,
                    isMramMod        : '1',
                    alreadyConList   : JSON.stringify(this.moduleList.map(item => {
                                                            return {"org_code": item.infOfrmnOrgC
                                                                    ,"orgBzrgC" : item.orgBizDsc}
                                                        }))
                }
            }
            modalService.openPopup(config).then(response => {
                console.log(response)
            })

            // moduleList 는 선택한 기관 목록 (배열) 입니다
            // 해당 배열엔 
            // org_code (기관코드) , orgBzrgC (업권코드) 의 값만 넘겨주시면 됩니다
        }
    },
    mixins: [
        commonMixin,
        popupMixin
    ]
}
</script>