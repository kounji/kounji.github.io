<!--
/*************************************************************************
* @ 서비스경로 : 더보기 > 전체메뉴 > 연결자산관리 > 연결자산목록
* @ 페이지설명 : 전체메뉴 > 연결자산관리 > 연결자산목록
* @ 파일명     : src\views\page\MR\AM\MRAM1001\MRAM1001.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-07-28
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-28              CS528069              최초작성
* ! 공공데이터 개발 테스트 데이터가 존재하지않아 연결자산목록에서 제외 (데이터 유무에 따른 추가개발이 있을 수 있음)
*************************************************************************/
-->

<template>
    <page class="content-view">
        
        <!-- content -->
        <div id="content" class="renewal" ref="content">
            <div class="com_tabmenu_type01 menunum03" id="category_menu">
                <ul role="tablist">
                    <li class="on" style="width:50%"><a href="javascript:void(0);" role="tab" @click="tapChg('org')">마이데이터</a></li>
                    <li style="width:50%"><a href="javascript:void(0);" role="tab" @click="tapChg('new')">공공 마이데이터</a></li>
                </ul>
            </div>

            <br><br><br><br><br>

            <select v-model="selectValue" @change="searchData" v-if="tap === 'org'" style="font-size:15px">
                <option value="">--선택--</option>
                <option v-for="(option, idx) in orgOptionList" :key="idx" :value="option">{{option}}</option>
            </select>
            <select v-model="selectValue" @change="searchData" v-else-if="tap === 'new'" style="font-size:15px">
                <option value="">--선택--</option>
                <option v-for="(option, idx) in newOptionList" :key="idx" :value="option">{{option}}</option>
            </select>
            <br>
            <!-- <div class="tab_wrap02">
                        <div class="com_input_type02" role="button" @click.prevent="openAddrSrch">
                            <input type="search" id="txt01" placeholder="동/단지 명으로 아파트 찾기" v-model="aptNm" ref="aptNm" aria-hidden="true" readonly/>
                            <a href="javascript:void(0);" role="button" class="com_btn_delete"><span class="blind">삭제</span></a>
                            <a href="javascript:void(0);" class="com_btn_search"><span class="blind">검색</span></a>
                        </div>
                    </div> -->
            <!-- <div class="btn_box">
                <a href="javascript:void(0);" @click="searchData">조회</a>
            </div> -->
            <br/>
            <textarea v-model="txData" disabled style="height: 70%; border: 2px solid #ccc; padding: 10px; color: black;"/>
        </div>
        <!--// content -->
    </page>
</template>

<script>
// import apiService from '@/service/apiService'
import Page from '@/views/layout/Page.vue'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import commonService from '@/service/commonService'

export default {
    name : "COCO9999",
    mixins: [
        commonMixin
    ],
    data: () => {
		return {
            txData : '',
            selectValue : '',
            tap : 'org',
            orgOptionList : [
                            '수집_선불카드_승인내역_두번째'
                            ,'수집_DB_퇴직연금_기본'
                            ,'수집_DC_퇴직연금_목록'
                            ,'수집_DC_퇴직연금_기본'
                            ,'수집_DC_퇴직연금_상세'
                            ,'수집_DC_퇴직연금_거래내역'
                            ,'수집_은행_대출계좌_기본'
                            ,'수집_은행_신탁_ISA_기본'
                            ,'수집_은행_신탁_ISA_거래내역'
                            ,'수집_은행_신탁_ISA_상세'
                            ,'수집_은행_자동이체_내역'
                            ,'수집_카드_기본'
                            ,'수집_카드_청구_기본'
                            ,'수집_카드_청구_상세'
                            ,'수집_카드_결제예정_기본'
                            ,'수집_카드_리볼빙_기본'
                            ,'수집_카드_국내_승인내역_두번째'
                            ,'수집_카드_해외_승인내역_두번째'
                            ,'수집_카드_단기_대출_기본'
                            ,'수집_카드_장기_대출_기본_두번째'
                            ,'수집_카드_장기_대출_거래내역'
                            ,'수집_카드_국내_카드매입'
                            ,'수집_카드_해외_카드매입'
                            ,'수집_금융투자_계좌_목록'
                            ,'수집_금융투자_계좌_기본'
                            ,'수집_금융투자_계좌_거래내역'
                            ,'수집_금융투자_계좌_상품_기본'
                            ,'수집_금융투자_연금계좌_상세'
                            , '수집_금융투자_자동이체_내역'
                            , '수집_보험_자동차_목록'
                            , '수집_보험_납입'
                            , '수집_보험_자동차_거래내역'
                            , '수집_보험_대출상품_계좌_기본'
                            , '수집_피보험자_목록'
                            , '수집_피보험자_기본'
                            , '수집_피보험자_특약_내역'
                            , '수집_피보험자_자동차_목록'
                            , '수집_피보험자_보장기본'
                            , '수집_보험_물_일반_기본'
                            , '수집_보험_물_일반_기본_내역'
                            , '수집_보험_물_일반_특약_내역'
                            , '수집_보험_물_일반_납입'
                            , '수집_보험_물_일반_거래내역'
                            , '수집_보험_물_일반_보장기본'
                            , '수집_피보험자_물_일반_기본'
                            , '수집_피보험자_물_일반_기본_내역'
                            , '수집_피보험자_물_일반_특약_내역'
                            , '수집_피보험자_물_일반_보장'
                            , '수집_전자금융_목록'
                            , '수집_전자금융_잔액_내역'
                            , '수집_전자금융_선불_거래내역'
                            , '수집_전자금융_결제수단_내역'
                            , '수집_전자금융_결제내역'
                            , '수집_통신_결제내역'
                            , '수집_P2P_투자_목록'
                            , '수집_P2P_투자_기본'
                            , '수집_P2P_투자_거래내역'
            ],
            newOptionList : [
                            '수집_공공_목록'
                            , '수집_공공_건강보험료납부확인서조회내역'
                            , '수집_공공_건강보험료납부확인서조회상세'
                            , '수집_공공_공무원연금조회내역'
                            , '수집_공공_관세납세증명조회내역'
                            , '수집_공공_국세납세사실증명조회내역'
                            , '수집_공공_국세납세사실증명조회상세'
                            , '수집_공공_국세납세증명서조회내역'
                            , '수집_공공_국세납세증명서조회상세'
                            , '수집_공공_연금산정용가입내역조회내역'
                            , '수집_공공_연금산정용가입내역조회상세'
                            , '수집_공공_지방세납세증명서조회내역'
                            , '수집_공공_지방세납세증명서조회상세'
                            , '수집_공공_지방세등록면허세조회내역'
                            , '수집_공공_지방세자동차세조회내역'
                            , '수집_공공_지방세자동차세조회상세'
                            , '수집_공공_지방세재산세조회내역'
                            , '수집_공공_지방세재산세조회상세'
                            , '수집_공공_관세납부조회내역'

            ],
        }
    },
    computed : {
        
    },
    mounted() {
        this.initComponent()

        
    },
    methods: {
        initComponent() {
            if(!this.getUserInfo('tobeType')){
                const config = {
                    //상호금융 NH콕마이데이터 4.0 추진 개발 MAMA2001 => MAMA4001 
                    name : 'MAMA4001'
                }
                commonService.movePage(config);
            }

            this.selectValue = ''
            this.searchData()    
        },
        searchData() {
            if(this.selectValue){
                const config = {
                    url : "/co/co/99r99",
                    data : {
                        mydtCusno    : this.getUserInfo("mydtCusno"), // 고객번호
                        testTableNm   : this.selectValue
                    }
                }
                apiService.call(config).then(response => {
                    this.txData = JSON.stringify(JSON.parse(response.result), null, 2)
                })
            }
        },
        tapChg(type) {
            this.tap = type;
            this.selectValue = ''
            this.txData = ''
            $('.com_tabmenu_type01 li').removeClass('on')

            if(type === 'org'){
                $('.com_tabmenu_type01 li').eq(0).addClass('on')
            }else{
                $('.com_tabmenu_type01 li').eq(1).addClass('on')
            }
            
            this.searchData()
        },
    },
    created() {
    },
    updated(){
    },
    components: {
        Page,
    },
}
</script>