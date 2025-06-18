<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 상품추천
* @ 페이지설명 : 금융과생활 > 상품추천 > 메인
* @ 파일명     : src\views\page\PD\PD\PDPD1101\PDPD1101.vue
* @ 작성자     : CS516029
* @ 작성일     : 2021-06-08
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-08              CS516029              최초작성
*************************************************************************/
-->
<template>
    <page class="content-view">
        <pd-category-v2 type="PDPD"></pd-category-v2>

        <div class="lnb pb0">
            <ul role="tablist">
                <li :class="currTabIdx === '1' ? 'on' : ''"><a href="javascript:void(0);" role="tab" :aria-selected="currTabIdx === '1' ? 'true' : 'false'" @click.prevent="fn_onTabClick('1')" ref="PDPD1101Tab1">상품추천</a></li>
                <li :class="currTabIdx === '2' ? 'on' : ''"><a href="javascript:void(0);" role="tab" :aria-selected="currTabIdx === '2' ? 'true' : 'false'" @click.prevent="fn_onTabClick('2')" ref="PDPD1101Tab2">은퇴 준비 진단</a></li>
            </ul>
        </div>

        <!-- content S -->
        <div id="content" class="com_sub_type02" :class="currTabIdx=='1'?'slider_layout':''">
            <!-- 상품추천 -->
            <template v-if="currTabIdx=='1'">
                <template v-if="dpidpList.length > 0 || lncdList.length > 0 || ivfndList.length > 0 || psnCrdevlScrVal > 0">
                    <div class="com_submainbox_type11 bg com_line_type01">
                        <p class="txt_submaincont_type01">금융 정보를 분석하여<br><strong>맞춤 상품을</strong> 소개해 드립니다.</p>
                    </div>
                    <div class="com_inner">
                        <strong class="com_box_tit mt35" v-if="dpidpList.length > 0">{{cusnm}}님을 위한 예적금 상품</strong>
                        <div class="com_box_type01 slide_box_wrap new_mb50 mt20 gray" v-if="dpidpList.length > 0">
                            <div class="slider_wrap">
                                <div class="tab_cont">
                                    <div role="tabpanel" class="cmm-tab-panel" v-for="(dpidpInfo, idx) in dpidpList" :key="idx">
                                        <a @click.prevent="fn_moveFinancialProductPage(dpidpInfo)" href="javascript:void(0);">
                                            <div class="slide type01 bg00 mb15">
                                                <h2>{{dpidpInfo.wrsnm}}</h2>
                                                <p>{{dpidpInfo.wrsBrfCntn}}</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="com_box_type01 credit_box_type" v-if="psnCrdevlScrVal > 0">
                            <a class="com_link" @click.prevent="openASCR4101()" href="javascript:void(0);">
                                <strong class="com_box_tit02 p0">고객님의 신용점수</strong>
                                <div class="gauge_chart_wrap">
                                    <div class="score mt20"><span class="num bold">{{psnCrdevlScrVal}}</span>점</div>
                                </div>
                            </a>
                        </div>
                        
                        <!-- 서비스 연계 미확정으로 해당 메뉴 주석 처리 운영반영 이후 처리됨 2021.12.13 -->
                        <a @click.prevent="fn_openPDPD1107()" href="javascript:void(0);">
                            <div class="com_box_type03 mt25 bg04">
                                <div class="text">신용,담보,전세대출<br> <span class="color">대출한도와 금리를 한번에!</span></div>
                            </div>
                        </a>

                        <strong class="com_box_tit02 mt20" v-if="lncdList.length > 0">고객님을 위한 대출 상품</strong>
                        <div class="com_box_type01 slide_box_wrap new_mb50" v-if="lncdList.length > 0">
                            <div class="slider_wrap">
                                <div class="tab_cont">
                                    <div role="tabpanel" class="cmm-tab-panel" v-for="(lncdInfo, idx) in lncdList" :key="idx">
                                        <a @click.prevent="fn_moveFinancialProductPage(lncdInfo)" href="javascript:void(0);">
                                            <div class="slide bg01">
                                                <span class="com_icon_num">대출</span>
                                                <h2>{{lncdInfo.wrsnm}}</h2>
                                                <p>{{lncdInfo.wrsBrfCntn}}</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <strong class="com_box_tit02" v-if="ivfndList.length > 0">미래 준비를 위한 펀드 상품</strong>
                        <div class="com_box_type01 slide_box_wrap new_mb50" v-if="ivfndList.length > 0">
                            <div class="slider_wrap">
                                <div class="tab_cont">
                                    <div role="tabpanel" class="cmm-tab-panel" v-for="(ivfndInfo, idx) in ivfndList" :key="idx">
                                        <a @click.prevent="fn_moveFinancialProductPage(ivfndInfo)" href="javascript:void(0);">
                                            <div class="slide bg02">
                                                <span class="com_icon_num">펀드</span>
                                                <h2>{{ivfndInfo.wrsnm}}</h2>
                                                <p>{{ivfndInfo.epyConm}} {{ivfndInfo.fndTpVal}}</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <strong class="com_box_tit02">고객의 안정된 행복을 위한 농협보험</strong>
                        <div class="linkbox_wrap type04">
                            <div class="box">
                                <a href="javascript:void(0);" @click.prevent="fn_openBrowser('1')">
                                    <div class="box_head">
                                        <div class="info">
                                            <div class="ico">
                                                <i class="bank_01"><span class="blind">NH손해보험</span></i>
                                            </div>
                                            <span>NH손해보험</span>
                                        </div>
                                        <div class="txt">든든한 일상을 <br/>위한 보장</div>
                                    </div>
                                </a>
                            </div>
                            <div class="box">
                                <a href="javascript:void(0);" @click.prevent="fn_openBrowser('2')">
                                    <div class="box_head">
                                        <div class="info">
                                            <div class="ico">
                                                <i class="bank_01"><span class="blind">NH생명보험</span></i>
                                            </div>
                                            <span>NH생명보험</span>
                                        </div>
                                        <div class="txt">안정된 내일을<br/>위한 보장</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="no_data_box">
                        <div class="no_data_list">
                            <p>조회된 정보가 없습니다.</p>
                        </div>
                    </div>
                </template>
            </template>

            <!-- 은퇴 준비 진단 -->
            <template v-if="currTabIdx=='2'">
                <div class="com_submainbox_type12 bg">
                    <p class="txt_submaincont_type01"><strong>편안한 노후 생활을 위한<br/>준비가 되셨나요?</strong></p>
                    <p class="txt_submaincont_type02 fs15">기대수명은 늘고, 은퇴 시기는<br/>
                        빨라 지고 있는 요즘, 나의 노후 준비는 어떤가요?
                    </p>
                </div>
                <div class="com_inner new_mb25">
                    <div class="com_box_type01">
                        <div class="compare_chart_wrap">
                            <div class="chart chart_type02">
                                <div class="bg">
                                    <div class="area mid">은퇴 생활기간 30년!</div>
                                    <div class="area bottom"></div>
                                </div>
                                <div class="bar_wrap">
                                    <div class="bars">
                                        <div class="bar bar01"></div>
                                        <div class="bar bar02"></div>
                                    </div>
                                    <div class="label">
                                        <span>기대수명</span>
                                        <span>평균퇴직연령</span>
                                    </div>
                                </div>
                            </div>
                            <p class="com_txt_sub01">[2020년 통계청 자료]</p>
                        </div>
                    </div>
                    <div class="com_box_type06 mt30 bg02">
                        <div class="text">나의 은퇴 준비 상태를 진단 하고<br><span class="color">지금부터 노후 준비 하세요!</span></div>
                    </div>
                    <div class="btn_full_box mt30">
                        <a class="btn btn_mint" role="button" @click.prevent="fn_openPDPD1104()">진단하기</a>
                    </div>
                </div>
            </template>
        </div>
        <!--// content E -->

        <footersV2 type="pd" />
    </page>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import commonMixin from '@/common/mixins/commonMixin'
import PdCategoryV2 from '@/components/category/PdCategoryV2.vue'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import {fncSlick} from '@/utils/slick'
import {dateFormat} from '@/utils/date'
//import ASCR4101 from '@/views/page/AS/CR/ASCR4101/ASCR4101'
import appService from '@/service/appService'
//import _ from 'lodash'

import PDPD1104 from '@/views/page/PD/PD/PDPD1104/PDPD1104'
//import PDPD1107 from '@/views/page/PD/PD/PDPD1107/PDPD1107'

export default {
    name : "PDPD1101",
    data: () => {
        return {
            currTabIdx:"",       // 1:상품추천, 2:은퇴 준비 진단
            cusnm: "",           // 로그인 사용자 이름
            mydtCusno:"",        // 마이데이터고객번호
            basDt:"",            // 조회일자
            psnCrdevlScrVal : 0, // 개인신용평가점수값
            dpidpCn: 0,          // 예적금목록건수
            lncdCn: 0,           // 대출카드목록건수
            ivfndCn: 0,          // 투자펀드목록건수
            dpidpList: [],       // 예적금목록
            lncdList:[],         // 대출카드목록
            ivfndList:[],        // 투자펀드목록
        }
    },
    computed : {

    },
    methods: {
        initComponent() {
            // this.currTabIdx = "1";
            this.currTabIdx = this.routeParams.currTabIdx || '1'
            this.cusnm      = this.getUserInfo("cusnm");
            this.mydtCusno  = this.getUserInfo("mydtCusno");
            //this.mydtCusno = 'MYDTCUST01234567890'
            this.basDt = dateFormat(new Date(), 'YYYYMMDD')
            
            this.getData()
        },
        getData(){
            this.psnCrdevlScrVal = 0
            this.dpidpCn   = 0
            this.lncdCn    = 0
            this.ivfndCn   = 0
            this.dpidpList = []
            this.lncdList  = []
            this.ivfndList = []

            if (this.currTabIdx == "1") {

                const config = {
                    url: '/pd/pd/01r01',
                    data: {"mydtCusno": this.mydtCusno // 마이데이터고객번호
                        ,"basDt"      : this.basDt     // 조회일자
                        }
                };

                apiService.call(config).then(response => {

                    this.psnCrdevlScrVal = response.psnCrdevlScrVal || 0
                    this.dpidpCn = response.dpidpCn || 0
                    this.lncdCn = response.lncdCn || 0
                    this.ivfndCn = response.ivfndCn || 0
                    this.dpidpList = response.dpidpList || []
                    this.lncdList = response.lncdList || []
                    this.ivfndList = response.ivfndList || []

                    /*
                    let responseDpidpList = response.dpidpList || []
                    let responseLncdList = response.lncdList || []
                    let responseIvfndList = response.ivfndList || []

                    // 랜덤으로 최대 3개
                    // ----------------------------------------------------------------
                    if(responseDpidpList.length > 0) {
                        if (responseDpidpList.length > 4) {
                            for (let i=0; i<3; i++) {
                                let num = Math.floor((Math.random() * responseDpidpList.length));
                                this.dpidpList.push(responseDpidpList[num])
                                responseDpidpList.splice(num, 1)
                            }
                        } else {
                            let maxLength = responseDpidpList.length
                            for (let j=0; j<maxLength; j++) {
                                let num = Math.floor((Math.random() * responseDpidpList.length));
                                this.dpidpList.push(responseDpidpList[num])
                                responseDpidpList.splice(num, 1)
                            }
                        }

                        this.dpidpList = _.chain(this.dpidpList)
                                            .orderBy(['wrsC'],['asc'])
                                            .value()
                    }

                    if(responseLncdList.length > 0) {
                        if (responseLncdList.length > 4) {
                            for (let i=0; i<3; i++) {
                                let num = Math.floor((Math.random() * responseLncdList.length));
                                this.lncdList.push(responseLncdList[num])
                                responseLncdList.splice(num, 1)
                            }
                        } else {
                            let maxLength = responseLncdList.length
                            for (let j=0; j<maxLength; j++) {
                                let num = Math.floor((Math.random() * responseLncdList.length));
                                this.lncdList.push(responseLncdList[num])
                                responseLncdList.splice(num, 1)
                            }
                        }

                        this.lncdList = _.chain(this.lncdList)
                                            .orderBy(['wrsC'],['asc'])
                                            .value()
                    }

                    if(responseIvfndList.length > 0) {
                        if (responseIvfndList.length > 4) {
                            for (let i=0; i<3; i++) {
                                let num = Math.floor((Math.random() * responseIvfndList.length));
                                this.ivfndList.push(responseIvfndList[num])
                                responseIvfndList.splice(num, 1)
                            }
                        } else {
                            let maxLength = responseIvfndList.length
                            for (let j=0; j<maxLength; j++) {
                                let num = Math.floor((Math.random() * responseIvfndList.length));
                                this.ivfndList.push(responseIvfndList[num])
                                responseIvfndList.splice(num, 1)
                            }
                        }

                        this.ivfndList = _.chain(this.ivfndList)
                                            .orderBy(['wrsC'],['asc'])
                                            .value()
                    }
                    */
                    // ----------------------------------------------------------------
                    // 랜덤으로 최대 10개

                    this.$nextTick(() => {
                        fncSlick()
                    })
                });
            }

        },
        openASCR4101(){

            // 신용정보상세보기
            /* var param = {}
            const config = {
                component: ASCR4101,
                params : param
            }
            modalService.openPopup(config).then(() => {

            }) */
        },
        fn_openPDPD1107() {
            /* const config = {
                component : PDPD1107
            }

            modalService.openPopup(config).then(() => {}); */
        },
        fn_onTabClick(tabIdx) {
            if (this.currTabIdx != tabIdx) {
                this.currTabIdx = tabIdx;
                this.getData();
            }
        },
        fn_openPDPD1104() {
            const config = {
                component : PDPD1104
            }

            modalService.openPopup(config).then((response) => {
                if (response == "PDPD1101_tab1") {
                    this.$refs.PDPD1101Tab1.click();
                }
            });
        },
        fn_openBrowser(gubn) {

            let url

            if(gubn == '1') {
                url = "https://m.nhfire.co.kr"
            } else {
                url = "https://m.nhlife.co.kr"
            }

            // 외부 브라우저 링크 오픈 
            // chnl : 385 -> 스마트뱅크 , 386 -> 콕뱅크
            if(this.getUserInfo('chnl') === '385') {
                // 스뱅
                appService.executeBrowser(url)
            } else {
                // 콕뱅
                appService.cokBankOpenPopupWebBrowser(url)
            }
            
        },
        /**
        *  금융상품페이지이동. add 2021.11.01
        */
        fn_moveFinancialProductPage(item){
            appService.moveFinancialProductPage(item.wrsDtlUrlnm)
        },
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        commonMixin
    ],
    created() {

    },
    components: {
        Page,
        FootersV2,
        PdCategoryV2,
        //AsSubCategoryV2
    },

}
</script>