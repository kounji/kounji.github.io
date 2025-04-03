<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부채 > 카드
* @ 페이지설명 : 나의자산 > 부채 > 카드 메인
* @ 파일명     : src/views/page/AS/CD/ASCD4001/ASCD4001.vue
* @ 작성자     : CS515937
* @ 작성일     : 2021-05-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-10              CS515937                 최초작성
* 2022-06-27              CS528061                 AS/LN/ASLN1103/ASLN1103.vue -> AS/CD/ASCD2001/ASCD2001.vue 변경
* 2025-03-11              CS541017                 AS/CD/ASCD2001/ASCD2001.vue -> AS/CD/ASCD2001/ASCD4001.vue 변경
*************************************************************************/
-->
<template>
	<page class="content-view hasLNB mydata2023">
        <!-- S :: 자산 카테고리 -->
        <!--
        <as-category-v2 type="LN"></as-category-v2>
        -->	
        <!-- E :: 자산 카테고리 -->

        <!-- S :: 자산 서브 카테고리 -->
        <as-sub-category-v4 type="LN" typeDtl="03"></as-sub-category-v4>
        <!-- E :: 자산 서브 카테고리 -->

        <!-- content S -->
		<!--
        <div id="content" class="renewal">
        -->
        <div id="content" class="renewal">
            <template v-if="showFlagYN == 'Y'">
                <div class="com_inner">
                    <div class="new_sub_info">
                        <div class="title">
                            <!-- [v4.0] 25-02-17 잔액숨김 기능추가, 툴팁이동 -->
							<div class="text">
								<span>결제 예정인 돈</span>
								<div class="custom_tooltip">
									<div class="com_tooltip_type02 com_tooltip_type03">
										<a href="javascript:void(0);" class="com_btn_info" role="button">
											<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
										</a>
										<div class="com_ballon_type01 com_ballon_type02">
											<div>
												총 금액은 “이번달 결제예정금액”과 “남은 결제예정금액”의 합산 금액으로 산정됩니다.<!-- 09/20 jlee 문구수정 -->
												<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
											</div> 
										</div>
									</div>
								</div>

								<br>

								<div class="toggle_money">
									<input type="checkbox" title="금액숨김" name="" id="sum_view_01" v-model="hideYn" @change="fn_setHidden('CD', hideYn)">
									<label for="sum_view_01" class="btns">
										<span class="hide" aria-hidden="true">보기</span>
										<span class="show" aria-hidden="true">숨김</span>
									</label>
									<div class="sum">
										<span class="hide">잔액숨김</span>
										<span class="show">총 <em>{{totAm | numberFilter}}</em>원</span>
									</div>
								</div>
							</div>
							<!-- //[v4.0] 25-02-17 잔액숨김 기능추가, 툴팁이동 -->
                        </div>
                    </div>
                    <cmm-financial-banner asdbDsc="10"/>
                </div>
                <hr class="hr02">
                <div class="com_inner">
                    <!-- 이번달 결제예정금액 -->
                    <div class="com_box_type01 toggle_list_box2 custom_list" v-if="cardOut.length > 0">
                        <div data-ui-toggle="box" class="toggle_box_area open">
                            <button type="button" class="view_btn" aria-expanded="true">
                                <div class="new_tit_area">
                                    <div class="tit"><span>이번달 결제예정금액</span></div>
                                    <span class="total_price">
                                        <em class="num">{{ttAmnt | numberFilter}}</em>
                                        <em class="unit">원</em>
                                    </span>
                                </div>
                                <em class="open">열기</em>
                                <em class="close">닫기</em>
                            </button>
                            <a href="javascript:void(0);" class="btn_sort" @click="fn_cardSortPop()"><span>{{cardSortNm}}</span></a>
                        </div>                            
                        <ul class="view_cont list_type_01">
                            <li v-for="(cardOutObj, index) in cardOut" :key="index">
                                <a href="javascript:void(0);" role="button" v-on:click.prevent="openPayDtlPop(cardOutObj)">
                                    <dl>
                                        <dt>
                                            <div>
                                                <i :class="cardOutObj.infOfrmnOrgC"><span class="blind">{{cardOutObj.infOfrmnOrgCNm}}</span></i>
                                                <em class="prod_name">{{cardOutObj.infOfrmnOrgCNm}}</em>
                                            </div>
                                            <div class="date" v-if="cardOutObj.stlPlaDt!=''">{{cardOutObj.stlPlaDt | dateFilter('YYYY.MM.DD')}}</div>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{cardOutObj.cdStlPlaAm | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!-- //이번달 결제예정금액 -->

                    <!-- 남은 결제예정금액 -->
                    <!-- 리볼빙, 단기대출, 장기대출 --> 
                    <div class="com_box_type01 toggle_list_box2 custom_list" v-if="cardLoanOut.length > 0">
                        <div data-ui-toggle="box" class="toggle_box_area open">
                            <button type="button" class="view_btn" aria-expanded="false">
                                <div class="new_tit_area">
                                    <div class="tit"><span>남은 결제예정금액</span></div>
                                    <span class="total_price">
                                        <em class="num">{{ttCdLnBac | numberFilter}}</em>
                                        <em class="unit">원</em>
                                    </span>                                    
                                </div>
                                <em class="open">열기</em>
                                <em class="close">닫기</em>
                            </button>
                            <a href="javascript:void(0);" class="btn_sort" @click="fn_cardLoanSortPop()"><span>{{cardLoanSortNm}}</span></a>
                        </div>
                        <ul class="view_cont list_type_01">
                            <li v-for="(cardLoanOutObj, index) in cardLoanOut" :key="index" v-on:click.prevent="openCardLoanPop(cardLoanOutObj)">
                                <a href="javascript:void(0);" role="button">
                                    <dl>
                                        <dt>
                                            <div>
                                                <i :class="cardLoanOutObj.infOfrmnOrgC"><span class="blind">{{cardLoanOutObj.infOfrmnOrgCNm}}</span></i>
                                                <em class="prod_name" v-if="cardLoanOutObj.lnDsc !== 'LLN'">{{cardLoanOutObj.infOfrmnOrgCNm}}</em>
                                                <em class="prod_name" v-if="cardLoanOutObj.lnDsc === 'LLN'">{{cardLoanOutObj.cdcodLnWrsNm}}</em>
                                            </div>
                                        </dt>
                                        <dd v-if="cardLoanOutObj.lnDsc === 'LLN'">
                                            <span class="prod_num">{{cardLoanOutObj.cdlnLnNo}}</span>
                                        </dd>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{cardLoanOutObj.cdLnStlPlaBac | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!-- //남은 결제예정금액 -->

                    <!-- 청구내역 -->
                    <div class="com_box_type01 toggle_list_box2 custom_list" v-if="claimOut.length > 0">
                        <div data-ui-toggle="box" class="toggle_box_area open">
                            <button type="button" class="view_btn" aria-expanded="true">                        
                                <div class="new_tit_area">
                                    <div class="tit"><span>청구내역</span></div>
                                </div>
                                <em class="open">열기</em>
                                <em class="close">닫기</em>
                            </button>
                            <a href="javascript:void(0);" class="btn_sort" @click="fn_claimSortPop()"><span>{{claimSortNm}}</span></a>
                        </div>                        
                        <ul class="view_cont list_type_01">
                            <li v-for="(claimOutObj, index) in claimOut" :key="index" v-on:click.prevent="openClaimPop(claimOutObj)">
                                <a href="javascript:void(0);" role="button">
                                    <dl>
                                        <dt>
                                            <div>
                                                <i :class="claimOutObj.infOfrmnOrgC"><span class="blind">{{claimOutObj.infOfrmnOrgCNm}}</span></i>
                                                <em class="prod_name">{{claimOutObj.infOfrmnOrgCNm}}</em>
                                            </div>
                                            <div class="date">{{claimOutObj.stlDt | dateFilter('YYYY.MM.DD')}}</div>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{claimOutObj.colCdRqsAm | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!-- //청구내역 -->

                    <!-- 이번달 카드별 이용내역 -->
                    <div class="com_box_type01 toggle_list_box2 custom_list" v-if="expeOut.length > 0">
                        <div data-ui-toggle="box" class="toggle_box_area open">
                            <button type="button" class="view_btn" aria-expanded="false">      
                                <div class="new_tit_area">
                                    <div class="tit"><span>이번달 카드별 이용내역</span></div>
                                </div>
                                <em class="open">열기</em>
                                <em class="close">닫기</em>
                            </button>
                            <a href="javascript:void(0);" class="btn_sort" @click="fn_expeSortPop()"><span>{{expeSortNm}}</span></a>
                        </div>                                     
                        <ul class="view_cont list_type_01">
                            <li v-for="(expeOutObj, index) in expeOut" :key="index">
                                <a href="javascript:void(0);" v-on:click.prevent="openDetailPop(expeOutObj)">
                                    <dl>
                                        <dt>
                                            <div>
                                                <i :class="expeOutObj.infOfrmnOrgC"><span class="blind">{{expeOutObj.infOfrmnOrgCNm}}</span></i>
                                                <em class="prod_name">{{expeOutObj.cdcoCdWrsnm}}</em>
                                            </div>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{expeOutObj.cdUgUsAm | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!-- //이번달 카드별 이용내역 -->
                </div>
            </template>
            <template v-else-if="showFlagYN == 'N'">
                <div class="com_inner">
                    <!-- 조회내역이 없을경우 -->
                    <div class="no_data_box no_data_box01 grayExclamationType">
                        <div class="no_data_list">
                            <p class="txt_sub">조회된 정보가 없습니다.</p>
                        </div>
                    </div>
                    <!--// 조회내역이 없을경우 -->
                </div>
            </template>
            <div class="new_add_register"><a href="javascript:void(0);" role="button" v-on:click.prevent="movePage()"><span>더 연결할 자산이 있으신가요?</span></a></div>
        </div>
        <!--// content E -->

        <footersV2 type="as"/>
    </page>
</template>

<script>
import apiService from '@/service/apiService'
import Page from '@/views/layout/Page.vue'
import FootersV2 from "@/views/layout/FootersV2.vue"
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
//import AsCategoryV2 from '@/components/category/AsCategoryV2.vue'
import AsSubCategoryV4 from '@/components/category/AsSubCategoryV4.vue'
import CmmFinancialBanner from '@/components/CmmFinancialBanner.vue'    //상품추천배너 2021.11.12
import {dateFormat} from '@/utils/date'

import ASCD2002 from '@/views/page/AS/CD/ASCD2002/ASCD2002'     // 결제예정금액
import ASCD2004 from '@/views/page/AS/CD/ASCD2004/ASCD2004'     // 청구내역
import ASCD2007 from '@/views/page/AS/CD/ASCD2007/ASCD2007'     // 단기신용대출
import ASCD2008 from '@/views/page/AS/CD/ASCD2008/ASCD2008'     // 장기신용대출
import ASCD2009 from '@/views/page/AS/CD/ASCD2009/ASCD2009'     // 리볼빙
import LCLE2002 from '@/views/page/LC/LE/LCLE2002/LCLE2002'
import COAR4001 from '@/views/page/CO/AR/COAR4001/COAR4001'
import ASCD4010 from '@/views/page/AS/CD/ASCD4010/ASCD4010'     // 정렬팝업


export default {
    name : 'ASCD4001',
    data: () => {
        return {
            mydtCusno   : "",       // 마이데이터고객번호
            inqYm       : "",       // 조회년월
            ttAmnt      : 0,        // 결제 예정인 돈
            ttCdLnBac   : 0,        // 결제 예정인 대출 잔액
            totAm       : 0,        // 총 결제 예정인 돈 (결제 예정인 돈+결제 예정인 대출 잔액)
            cardOut     : [],       // 카드정보
            expeOut     : [],       // 카드 이용금액 리스트
            claimOut    : [],       // 카드 청구내역 리스트
            cardLoanOut : [],       // 카드 결제예정잔액 리스트
            showFlagYN  : "",       // 조회결과 있으면 'Y'
            hideYn		: false,  // 숨김 여부
            cardOutOrg          : [],           //이번달 결제예정Org
            cardSortNm        : "기본",       //이번달 결제예정정렬이름
            cardSortVal    : "1",          //이번달 결제예정정렬기준
            cardLoanOutOrg          : [],           //남은 결제예정금액Org
            cardLoanSortNm        : "기본",       //남은 결제예정금액정렬이름
            cardLoanSortVal    : "1",          //남은 결제예정금액정렬기준
            claimOutOrg          : [],           //청구내역Org
            claimSortNm        : "기본",       //청구내역정렬이름
            claimSortVal    : "1",          //청구내역정렬기준
            expeOutOrg          : [],           //이번달 카드별Org
            expeSortNm        : "기본",       //이번달 카드별정렬이름
            expeSortVal    : "1",          //이번달 카드별정렬기준


        }
    },
    computed : {
        // noData() {
        //     return (this.cardOut.length == 0 && this.expeOut.length == 0 && this.claimOut.length == 0 && this.cardLoanOut.length == 0)?'com_bg_type02':''
        // },
    },
    mounted() {
        this.initComponent()
        dateFormat()

        // 자산수집 mutation 이벤트 감지
        this.getGatheringListenSubscribe()


        // PFM로그 처리 화면 접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        commonMixin
    ],
    methods: {
        initComponent() {
            this.hideYn = this.getSecretAmInfo().includes('CD')
            this.mydtCusno = this.getUserInfo("mydtCusno")
            this.inqYm     = dateFormat(new Date(), 'YYYYMM')
            this.getData();
        },
        getData() {
            const config = {
                url: '/as/cd/01r01',
                data: {
                    mydtCusno : this.mydtCusno,     // 자산관리고객번호
                }
            }

            apiService.syncCall(config).then(response => {
                console.log("============================> ASCD2001 Response <============================")
                console.log(response)
                this.ttAmnt      = response.ttAmnt || 0             // 결제 예정인 돈
                this.ttCdLnBac   = response.ttCdLnBac || 0          // 결제 예정인 대출 잔액
                this.totAm       = this.ttAmnt + this.ttCdLnBac     // 총 결제 예정인 돈
                this.cardOut     = response.cardOut || []           // 이번달 결제예정금액
                this.cardLoanOut = response.cardLoanOut || []       // 남은 결제예정금액
                this.expeOut     = response.expeOut || []           // 청구내역
                this.claimOut    = response.claimOut || []          // 이번달 카드별 이용내역

                this.cardOut.forEach((item,index) => {
                    this.cardOut[index].scrnPrtoSq = index //화면출력순서
                })
                this.cardOutOrg = [...this.cardOut] || []  //이번달 결제예정Org

                this.cardLoanOut.forEach((item,index) => {
                    this.cardLoanOut[index].scrnPrtoSq = index //화면출력순서
                })
                this.cardLoanOutOrg = [...this.cardLoanOut] || []  //남은 결제예정금액Org

                this.claimOut.forEach((item,index) => {
                    this.claimOut[index].scrnPrtoSq = index //화면출력순서
                })
                this.claimOutOrg = [...this.claimOut] || []  //청구내역Org

                this.expeOut.forEach((item,index) => {
                    this.expeOut[index].scrnPrtoSq = index //화면출력순서
                })
                this.expeOutOrg = [...this.expeOut] || []  //이번달 카드별Org
                    
                if(this.cardOut.length > 0 || this.expeOut.length > 0 || this.claimOut.length || this.cardLoanOut.length > 0){
                    this.showFlagYN = 'Y'
                }
                else{
                    this.showFlagYN = 'N'
                }

                this.callJQueryFncExcute()
            })
        },

        // 결제예정금액 상세
        openPayDtlPop(obj) {
            console.log("============================> ASCD2002 Request <============================")
            const config = {
                component : ASCD2002,
                params    : {
                    mydtCusno       : obj.mydtCusno,
                    infOfrmnOrgC    : obj.infOfrmnOrgC,
                    infOfrmnOrgCNm  : obj.infOfrmnOrgCNm,
                    inqYmd          : obj.stlPlaDt,
                }
            }
            console.log("obj.stlPlaDt---------------------", obj.stlPlaDt)
            modalService.openPopup(config)
        },

        // 남은 결제예정금액 팝업 오픈
        openCardLoanPop(obj) {
            let config = {}

            if (obj.lnDsc == "SLN") {               
                config = {
                    component : ASCD2007,
                    params    : {
                        mydtCusno       : obj.mydtCusno,
                        infOfrmnOrgC    : obj.infOfrmnOrgC,
                        infOfrmnOrgCNm  : obj.infOfrmnOrgCNm,
                        lnDsc           : obj.lnDsc
                    }
                }                
            } else if (obj.lnDsc == "LLN") {                  
                config = {
                    component : ASCD2008,
                    params    : {
                        mydtCusno       : obj.mydtCusno,
                        infOfrmnOrgC    : obj.infOfrmnOrgC,
                        infOfrmnOrgCNm  : obj.infOfrmnOrgCNm,
                        lnDsc           : obj.lnDsc, 
                        cdlnLnNo        : obj.cdlnLnNo,
                        lnDt            : obj.lnDt,
                        dtLnSc          : obj.dtLnSc
                    }
                }                
            } else if (obj.lnDsc == "RVV") {               
                config = {
                    component : ASCD2009,
                    params    : {
                        mydtCusno       : obj.mydtCusno,
                        infOfrmnOrgC    : obj.infOfrmnOrgC,
                        infOfrmnOrgCNm  : obj.infOfrmnOrgCNm,
                        lnDsc           : obj.lnDsc
                    }
                }
            }   

            console.log(config)
            modalService.openPopup(config)
        },

        // 청구상세 팝업 오픈
        openClaimPop(obj) {
            let mydtStlSqnoList = obj.mydtStlSqno.split("^")
			let rtnData = []

            // return
            if(mydtStlSqnoList.length  > 0) {
                mydtStlSqnoList.map(d => rtnData.push({"mydtStlSqno" : d}))
            }else{
                rtnData = {}
            }

            const config = {
                component: ASCD2004,
                params : {
                    mydtCusno       : obj.mydtCusno,
                    infOfrmnOrgC    : obj.infOfrmnOrgC,
                    infOfrmnOrgCNm  : obj.infOfrmnOrgCNm,
                    cdRqsYm         : obj.cdRqsYm,
                    lastCdRqsYm     : obj.cdRqsYm,
                    mydtStlSqno     : rtnData,
                }
            }
            modalService.openPopup(config)
        },

        // 이번달 카드별 이용내역 오픈
        openDetailPop(obj) {
            const config = {
                component: LCLE2002,
                params : {
                    mydtCusno       : obj.mydtCusno,
                    inqYm           : this.inqYm,
                    infOfrmnOrgC    : obj.infOfrmnOrgC,
                    mydtCdId		: obj.mydtCdId,
                    cdcoCdWrsnm     : obj.cdcoCdWrsnm,
                }
            }
            modalService.openPopup(config)
        },
        movePage() {
            const config = {
                component: COAR4001,
            }
            modalService.openPopup(config)
        },
        /*
            숨김여부
        */
        fn_setHidden(flag, type) {
            this.setSecretAmInfo(flag, type)
        },
        /*
            이번달 결제예정 팝업 호출
        */
        fn_cardSortPop(){
            const config = {
                params : {
                    sortVal   : this.cardSortVal,
                    sortDs   : '' //입출금,외화 "" , 예금,적금 "1"
                },
                renderer : {
                    component : ASCD4010
                }
            }
            modalService.openSlidePagePopup(config).then(response => {
                this.cardSortVal = response.sortVal;
                if(this.cardSortVal === "1"){
                    this.cardOut = [...this.cardOutOrg] || [] 
                    this.cardSortNm = "기본"
                }else{
                    this.cardOut = this.cardOut.sort((a,b) => b.cdStlPlaAm - a.cdStlPlaAm || a.scrnPrtoSq - b.scrnPrtoSq)
                    this.cardSortNm = "금액순"
                }
            })
        },
        /*
            남은 결제예정금액 팝업 호출
        */
        fn_cardLoanSortPop(){
            const config = {
                params : {
                    sortVal   : this.cardLoanSortVal,
                    sortDs   : '' //입출금,외화 "" , 예금,적금 "1"
                },
                renderer : {
                    component : ASCD4010
                }
            }
            modalService.openSlidePagePopup(config).then(response => {
                this.cardLoanSortVal = response.sortVal;
                if(this.cardLoanSortVal === "1"){
                    this.cardLoanOut = [...this.cardLoanOutOrg] || [] 
                    this.cardLoanSortNm = "기본"
                }else{
                    this.cardLoanOut = this.cardLoanOut.sort((a,b) => b.cdLnStlPlaBac - a.cdLnStlPlaBac || a.scrnPrtoSq - b.scrnPrtoSq)
                    this.cardLoanSortNm = "금액순"
                }
            })
        },
        /*
            청구내역 팝업 호출
        */
        fn_claimSortPop(){
            const config = {
                params : {
                    sortVal   : this.claimSortVal,
                    sortDs   : '' //입출금,외화 "" , 예금,적금 "1"
                },
                renderer : {
                    component : ASCD4010
                }
            }
            modalService.openSlidePagePopup(config).then(response => {
                this.claimSortVal = response.sortVal;
                if(this.claimSortVal === "1"){
                    this.claimOut = [...this.claimOutOrg] || [] 
                    this.claimSortNm = "기본"
                }else{
                    this.claimOut = this.claimOut.sort((a,b) => b.cdLnStlPlaBac - a.cdLnStlPlaBac || a.scrnPrtoSq - b.scrnPrtoSq)
                    this.claimSortNm = "금액순"
                }
            })
        },
        /*
            이번달 카드별 이용내역 팝업 호출
        */
        fn_expeSortPop(){
            const config = {
                params : {
                    sortVal   : this.expeSortVal,
                    sortDs   : '' //입출금,외화 "" , 예금,적금 "1"
                },
                renderer : {
                    component : ASCD4010
                }
            }
            modalService.openSlidePagePopup(config).then(response => {
                this.expeSortVal = response.sortVal;
                if(this.expeSortVal === "1"){
                    this.expeOut = [...this.expeOutOrg] || [] 
                    this.expeSortNm = "기본"
                }else{
                    this.expeOut = this.expeOut.sort((a,b) => b.cdLnStlPlaBac - a.cdLnStlPlaBac || a.scrnPrtoSq - b.scrnPrtoSq)
                    this.expeSortNm = "금액순"
                }
            })
        },

    },
    components : {
        Page,
        FootersV2,
        //AsCategoryV2,
        AsSubCategoryV4,
        CmmFinancialBanner      // 상품추천배너 2021.11.12
    }
}
</script>