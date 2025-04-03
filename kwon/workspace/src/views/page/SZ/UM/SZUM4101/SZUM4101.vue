<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > NH지역정보 > 슬기로운영농생활 > 조합원 > 조합원
* @ 페이지설명 : 조합원 메인
* @ 파일명     : src/views/page/SZ/UM/SZUM4101/SZUM4101.vue
* @ 작성자     : 
* @ 작성일     : 2021-06-02
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-02              		                 최초작성
* 2021-09-14              		                 수정 작업
* 2025-03-04              CS540683              상호금융 NH콕마이데이터 4.0 추진 개발 SZUM2101 → SZUM4101
*************************************************************************/
-->
<template>
    <!-- kimhc_20220922 수정-->
    <!-- <page class="content-view"> -->
    <page class="content-view hasLNB">
        <!-- S :: 마이농가 카테고리 -->
        <!-- <sz-category-v2 type="UM"></sz-category-v2> -->
        <!--
        <an-category-v2 type="SZFC"></an-category-v2>
        -->
        <an-sub-category-v4 type="UM"></an-sub-category-v4>
        <!-- E :: 마이농가 카테고리 -->

		<div id="content" class="com_sub_type02 com_bg_type00">
            <div class="com_submainbox_type03 com_submainbox_type03-01">
                <strong class="com_box_tit">조합원 현황</strong>
                <!--추가/변경(2021.09.14)-->
                <a href="javascript:void(0);"  class="com_btn_view" v-if="this.inqCn > 0" v-on:click.prevent="fn_openDetailPop1()" ><span>자세히보기</span></a>

                <!--조합원현황(Start)-->
                <template v-if="mythsData.length > 0"> 
                    <template  v-for="(mythsDataObj, idx) in mythsData" :data="mythsDataObj" >
                        <div class="com_box_type01 slimcard" :key="idx" :class="(idx===0) ? 'mt20' : ''">
                            <div class="title"><span class="new_bank_ico bank01"></span><span class="text">{{mythsDataObj.brnm}}</span></div>
                            <div class="code num">{{mythsDataObj.brc}}</div>
                        </div>
                    </template>
                </template>
                <template v-else> 
                    <div class="no_data_box">
                        <div class="no_data_list">
                            <p>조회된 정보가 없습니다.</p>
                        </div>
                    </div>
                </template>
                <!--조합원현황(End)-->
            </div>

            <div class=" com_submainbox_type04 com_sub_radius">
                <strong class="com_box_tit">면세유 현황</strong>
                <div class="com_box_type01 goal_warp mt15">
                    <!--면세유현황(유종/기기) Tab(Start)-->
                    <div id="tabs" class="new_top_menu_box block mt-15 tab_header shadow">
                        <ul>
                            <li v-for="(tab, index) in tabs" :key="index">
                                <a href="javascript:void(0);"  :class="(currentTab===index)? 'on':''" v-on:click="fn_tabSel(index)">{{tab}}</a>
                            </li>
                        </ul>
                    </div>
                    <!--면세유현황 Tab(End)-->
                
                    <!--면세유현황(유종별)(Start)-->
                    <div v-show="currentTab == 0" class="tab_content mt25 on">
                        <template v-if="inqCn1 > 0"> 
                            <template v-for="(item, idx) in oilKindList" >
                                <div class="goal_box m0 mt30 type02" :key="'ol_'+idx">
                                    <div class="progressBar_wrapper">
                                        <div class="top">
                                            <div class="oil_wrap">
                                                <!--유종코드(01;경유,02;등유,03;휘발유,04;선박)-->
                                                <span class="ico" :class="'type'+item.okdC"></span>
                                                <div class="text_wrap">
                                                    <h1>{{item.fltynm}}</h1>
                                                    <p class="text">
                                                        배정량 <span class="num">{{item.extxolAsgqt | numberFilter}}</span>
                                                        사용량 <span class="num">{{item.ttrmUgqt | numberFilter}}</span>
                                                        잔량 <span class="num">{{item.asgRmqy | numberFilter}}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="date">
                                            <div class="st"><span class="num">0%</span></div>
                                            <div class="ed"><span class="num">100%</span></div>
                                        </div>
                                        <div class="progressBar" :class="'type'+item.okdC">
                                            <div class="bar" :style="'width:' + selectWidth(item.extxolAsgqt, item.asgRmqy) + '%'"> 
                                                <div class="popover_wrap">
                                                    <span class="popover">
                                                        {{selectWidth(item.extxolAsgqt, item.asgRmqy)}}% <!--면세유배정량,배정잔량-->
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>

                            <!--월별사용량--->
                            <a href="javascript:void(0);"  class="btn_round full mt30" v-on:click.prevent="fn_openDetailPop3()" >
                                <span>월별 사용량</span>
                            </a>
                        </template>
                        <template v-else> 
                            <div class="no_data_box">
                                <div class="no_data_list">
                                    <p>조회된 정보가 없습니다.</p>
                                </div>
                            </div>
                        </template>
                    </div>
                    <!--면세유현황(유종별)(End)-->

                    <!--면세유현황(기기별)(Start)-->
                    <div v-show="currentTab == 1" class="tab_content mt25 on">
                        <template v-if="inqCn2 > 0"> 
                            <template v-for="(item, idx) in machineList">
                                <div class="goal_box m0 mt30 type02" :key="'mach_'+idx">
                                    <div class="progressBar_wrapper">
                                        <div class="top">
                                            <div class="oil_wrap">
                                                <span class="ico" :class="'type1'+item.fmachEqkdC"></span>
                                                <div class="text_wrap">
                                                    <h1>{{item.fmachEqkdnm}}</h1>
                                                    <p class="text">
                                                        배정량 <span class="num">{{item.extxolAsgqt | numberFilter}}</span>
                                                        사용량 <span class="num">{{item.ttrmUgqt | numberFilter}}</span>
                                                        잔량 <span class="num">{{item.asgRmqy | numberFilter}}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="date">
                                            <div class="st"><span class="num">0%</span></div>
                                            <div class="ed"> <span class="num">100%</span></div>
                                        </div>
                                        <div class="progressBar" :class="'type1'+item.fmachEqkdC">
                                            <div class="bar" :style="'width:' + selectWidth(item.extxolAsgqt, item.asgRmqy) + '%'">
                                                <div class="popover_wrap">
                                                    <span class="popover">
                                                        {{selectWidth(item.extxolAsgqt, item.asgRmqy)}}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </template>
                        <template v-else> 
                            <div class="no_data_box">
                                <div class="no_data_list">
                                    <p>조회된 정보가 없습니다.</p>
                                </div>
                            </div>
                        </template>
                    </div>
                    <!--면세유현황(기기별)(End)-->
                </div>

                <!--영농자금대출 현황(신용대출 현황)(Start)-->
                <strong class="com_box_tit02">영농자금대출 현황</strong>
                <div class="com_box_type01 com_box_list01">
                    <div class="list_type_box">
                        <div class="new_tit_area">
                            <div class="tit"><span>신용대출 {{creditCnt | numberFilter}}건</span></div>  <!--신용대출총계-->
                            <div class="total_price">
                                <em class="num">{{creditAmnt | numberFilter}}</em><em class="unit">원</em> <!--신용대출합계금액-->
                            </div>
                        </div>
                        <!--신용대출총계 > 0인 경우-->
                        <template v-if="creditCnt > 0">  
                            <ul class="list_type_01">

                                <!--2021/11/16(화) 변경-->
                                <li v-for="(fmachDataObj, index) in creditList" :key="'credit_'+index" :class="fmachDataObj.loanType === 'CREDIT_MINUS'?'no_link':'' ">
                                   <template v-if="fmachDataObj.loanType === 'CREDIT_BANK'">  <!--대출타입(CREDIT_BANK, CREDIT_MINUS)-->
                                        <a href="javascript:void(0);"  v-on:click.prevent="fn_openDetailPop2(fmachDataObj)">
                                            <dl>
                                                <dt>
                                                    <div>
                                                        <i :class="fmachDataObj.infOfrmnOrgC">  <!--정보제공자기관코드-->
                                                            <span class="blind">{{fmachDataObj.infOfrmnOrgCNm}}</span>  <!--정보제공자기관코드명-->
                                                        </i> 
                                                        <em>{{fmachDataObj.branch}}</em> <!--지점정보-->
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <span class="com_price">
                                                        <em class="num">{{fmachDataObj.bac | numberFilter}}</em><em class="unit">원</em><!--대출잔액-->
                                                    </span>
                                                </dd>
                                            </dl>
                                        </a>
                                    </template>
                                    <template v-else> 
                                        <dl>
                                            <dt>
                                                <div>
                                                    <i :class="fmachDataObj.infOfrmnOrgC">  <!--정보제공자기관코드-->
                                                        <span class="blind">{{fmachDataObj.infOfrmnOrgCNm}}</span>  <!--정보제공자기관코드명-->
                                                    </i> 
                                                    <em>{{fmachDataObj.branch}}</em> <!--지점정보-->
                                                </div>
                                            </dt>
                                            <dd>
                                                <span class="com_price">

                                                   <template v-if="fmachDataObj.bac > 0">  <!--대출잔액 > 0인 경우-->
                                                        <em class="num">{{IMG_MINUSMRK}}{{fmachDataObj.bac | numberFilter}}</em><em class="unit">원</em>
                                                   </template>
                                                   <template v-else> 
                                                        <em class="num">{{fmachDataObj.bac | numberFilter}}</em><em class="unit">원</em><!--대출잔액-->
                                                   </template>
                                                   
                                                </span>
                                            </dd>
                                        </dl>
                                    </template>
                                    <!--2021/11/16(화) 변경-->
                                </li>
                            </ul> 
                        </template>
                        <template v-else> 
                            <div class="no_data_box">
                                <div class="no_data_list">
                                    <p>조회된 정보가 없습니다.</p>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <!--영농자금대출 현황(신용대출 현황)(End)-->

                <!--영농자금대출 현황(담보대출)(Start) 2021/11/16(화) 변경-->
                <div class="com_box_type01 com_box_list01">
                    <div class="list_type_box">
                        <div class="new_tit_area">
                            <div class="tit"><span>담보대출 {{mortaCnt | numberFilter}}건</span></div> <!--담보대출대출총계-->
                            <div class="total_price">
                                <em class="num">{{mortaAmnt | numberFilter}}</em><em class="unit">원</em> <!--담보대출대출합계금액-->
                            </div>
                        </div>
                        <!--담보대출대출총계 > 0인 경우-->
                        <template v-if="mortaCnt > 0">  
                            <ul class="list_type_01">
                                <li v-for="(fmacMortaDataObj, index) in mortaOut" :key="'mota_'+index" class="no_link">
                                    <dl>
                                        <dt>
                                            <div>
                                               <i :class="fmacMortaDataObj.infOfrmnOrgC">  <!--정보제공자기관코드-->
                                                   <span class="blind">{{fmacMortaDataObj.infOfrmnOrgCNm}}</span> <!--정보제공자기관코드명-->
                                               </i> 
                                               <em>{{fmacMortaDataObj.wrsnm}}</em> <!--대출상품명-->
                                               <span>{{fmacMortaDataObj.mydtAcno}}</span> 
                                            </div>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{fmacMortaDataObj.bac | numberFilter}}</em><em class="unit">원</em>  <!--대출잔액-->
                                            </span>
                                        </dd>
                                    </dl>
                                </li>
                            </ul>
                        </template>
                        <template v-else> 
                            <div class="no_data_box">
                                <div class="no_data_list">
                                    <p>조회된 정보가 없습니다.</p>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <!--영농자금대출 현황(담보대출)(End)-->
            </div>
        </div>

        <footersV2 type="sz" />
    </page>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from "@/views/layout/FootersV2.vue"
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
// import SzCategoryV2 from '@/components/category/SzCategoryV2.vue'
//import AnCategoryV2 from '@/components/category/AnCategoryV2.vue'
//import AnSubCategoryV2 from '@/components/category/AnSubCategoryV2.vue'	
import AnSubCategoryV4 from '@/components/category/AnSubCategoryV4.vue'	

import apiService from '@/service/apiService'

import SZUM2102 from '@/views/page/SZ/UM/SZUM2102/SZUM2102'
import SZUM2106 from '@/views/page/SZ/UM/SZUM2106/SZUM2106'
import SZUM2107 from '@/views/page/SZ/UM/SZUM2107/SZUM2107'

export default {
    name : 'SZUM4101',
    data: () => {
        return {
            inqCn       : 0,   //조회건수
            inqCn1       : 0,   //조회건수
            inqCn2       : 0,   //조회건수
            mythsData    : [],   // 조합원

            oilKindList  : [],  // 면세유현황(유종별)
            machineList  : [],  // 면세유현황(기기별)

            creditCnt    : 0,    //신용대출총계
            creditAmnt   : 0,    //신용대출합계금액
            creditList   : [],   //신용대출리스트

            mortaCnt     : 0,    //담보대출대출총계
            mortaAmnt    : 0,    //담보대출대출합계금액
            mortaOut     : [],   //담보대출Out
            IMG_MINUSMRK : "-",

            //Tab관련사항 
            currentTab : 0, 
            tabs : ['유종별','기기별'],
            //fltynm : "", 
        }
    },
    mounted() {
        this.initComponent()
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },

    mixins: [
        commonMixin
    ],

    methods: {
        initComponent() {
            this.getData()
        },

        //**************
        // [조회]
        //***************/
        getData() {
            console.log(">>> [SZUM2101]getData(Start) <<< ")        

            const config ={
                url : '/sz/um/01r01',
                data : {
                    mydtCusno : this.getUserInfo("mydtCusno")
                }
			}
            apiService.syncCall(config).then(response => {
                this.$nextTick(() => {
                    console.log("[SZUM2101]getData/(response)조회건수=>> ", response.unionMemberEaiOut.inqCn)
                    console.log("[SZUM2101]getData/(response)조합원 현황=>> ", JSON.stringify(response.unionMemberEaiOut.detailList))
                    
                    this.inqCn   = (response.unionMemberEaiOut.inqCn === undefined)?0:response.unionMemberEaiOut.inqCn  //조회건수
                    this.mythsData   = (response.unionMemberEaiOut.detailList === undefined)?'':response.unionMemberEaiOut.detailList || []   //조합원 현황
                    
                    console.log("[SZUM2101]getData/(변수)조회건수=>> ", this.inqCn)
                    console.log("[SZUM2101]getData/(변수)조합원 현황=>> ", this.mythsData)

                    console.log("[SZUM2101]getData/(response)조회건수=>> ", response.dutyFreeOilByOilKindOut.inqCn)
                    console.log("[SZUM2101]getData/(response)유종별 면세유 현황=>> ", JSON.stringify(response.dutyFreeOilByOilKindOut.detailList))

                    this.inqCn1 = (response.dutyFreeOilByOilKindOut.inqCn === undefined)?0:response.dutyFreeOilByOilKindOut.inqCn   //조회건수
                    this.oilKindList = (response.dutyFreeOilByOilKindOut.detailList === undefined)?'':response.dutyFreeOilByOilKindOut.detailList || []    //유종별 면세유 현황

                    console.log("[SZUM2101]getData/(변수)조회건수=>> ", this.inqCn1)
                    console.log("[SZUM2101]getData/(변수)유종별 면세유 현황=>> ", this.oilKindList)

                    console.log("[SZUM2101]getData/(response)조회건수=>> ", response.dutyFreeOilByMachineOut.inqCn)
                    console.log("[SZUM2101]getData/(response)기기별 면세유 현황 조회=>> ", JSON.stringify(response.dutyFreeOilByMachineOut.detailList))

                    this.inqCn2 = (response.dutyFreeOilByMachineOut.inqCn === undefined)?0:response.dutyFreeOilByMachineOut.inqCn  //조회건수
                    this.machineList = (response.dutyFreeOilByMachineOut.detailList === undefined)?'':response.dutyFreeOilByMachineOut.detailList || []    //기기별 면세유 현황 조회

                    console.log("[SZUM2101]getData/(변수)조회건수=>> ", this.inqCn2)
                    console.log("[SZUM2101]getData/(변수)기기별 면세유 현황 조회=>> ", this.machineList)

                    //대출현황 - 신용대출
                    console.log("[SZUM2101]getData/(response)신용대출총계=>> ", response.loanSvcTotalOut.creditCnt)
                    console.log("[SZUM2101]getData/(response)신용대출합계금액=>> ", response.loanSvcTotalOut.creditAmnt)
                    console.log("[SZUM2101]getData/response.loanSvcTotalOut.creditOut=>> ", JSON.stringify(response.loanSvcTotalOut.creditOut))

                    this.creditCnt   = (response.loanSvcTotalOut.creditCnt === undefined)?0:response.loanSvcTotalOut.creditCnt;       //(변수)신용대출총계  = (출력)신용대출총계
                    this.creditAmnt  = (response.loanSvcTotalOut.creditAmnt === undefined)?0:response.loanSvcTotalOut.creditAmnt;      //(변수)신용대출합계금액  = (출력)신용대출합계금액
                    this.creditList  = (response.loanSvcTotalOut.creditOut === undefined)?'':response.loanSvcTotalOut.creditOut || []

                    console.log("[SZUM2101]getData/(변수)신용대출총계=>> ", this.creditCnt)
                    console.log("[SZUM2101]getData/(변수)신용대출합계금액=>> ", this.creditAmnt)
                    console.log("[SZUM2101]getData/this.creditList=>> ", this.creditList)

                    //대출현황 - 담보대출
                    console.log("[SZUM2101]getData/(response)담보대출대출총계=>> ", response.loanSvcTotalOut.mortaCnt)
                    console.log("[SZUM2101]getData/(response)담보대출대출합계금액=>> ", response.loanSvcTotalOut.mortaAmnt)
                    console.log("[SZUM2101]getData/response.loanSvcTotalOut.motaOut=>> ", JSON.stringify(response.loanSvcTotalOut.mortaOut))

                    this.mortaCnt   = (response.loanSvcTotalOut.mortaCnt === undefined)?0:response.loanSvcTotalOut.mortaCnt;     //(변수)마이너스대출총계  = (출력)마이너스대출총계
                    this.mortaAmnt  = (response.loanSvcTotalOut.mortaAmnt === undefined)?0:response.loanSvcTotalOut.mortaAmnt;   //(변수)마이너스대출합계금액  = (출력)마이너스대출합계금액
                    this.mortaOut  = (response.loanSvcTotalOut.mortaOut === undefined)?'':response.loanSvcTotalOut.mortaOut	 || []
                    
                    console.log("[SZUM2101]getData/(변수)담보대출대출총계=>> ", this.mortaCnt)
                    console.log("[SZUM2101]getData/(변수)담보대출대출합계금액=>> ", this.mortaAmnt)
                    console.log("[SZUM2101]getData/this.motaOut=>> ", this.mortaOut)
                })
            })

            console.log(">>> [SZUM2101]getData(End) <<< ")        
        },

       /*
        * [조합원 현황] 팝업호출
        */
		fn_openDetailPop1() {
            const config = {
				component : SZUM2102,
			}	    
            modalService.openPopup(config)
        },

        fn_tabSel(idx) {
            this.currentTab = idx
        },

        selectWidth(quota, balance) {   //배정량(quota) / 잔량(balance)
            return Math.round(Number(balance / quota) * 100)
        },

       /*
        * [영농자금대출 신용대출 상세조회] 팝업호출
        */
        fn_openDetailPop2(obj) {

            console.log(">>> [SZUM2101]fn_openDetailPop2(Start) <<< ")        

            console.log("[SZUM2101]fn_openDetailPop2/obj=>> ", obj)

            const config = {
				component : SZUM2107, // 영농자금대출 신용대출 상세조회(POP)
				params : {
                    mydtCusno      : this.getUserInfo("mydtCusno"), //마이데이터고객번호		
                    mydtAcno       : obj.mydtAcno,                  //마이데이터계좌번호
                    mydtScNo       : obj.mydtScNo,                  //마이데이터회차번호 
                    infOfrmnOrgC   : obj.infOfrmnOrgC,              //정보제공자기관코드
                    infOfrmnOrgCNm : obj.infOfrmnOrgCNm,            //정보제공자기관코드명
                    loanType       : obj.loanType,                  //대출타입(CREDIT_BANK, CREDIT_MINUS)
				}
            }
            modalService.openPopup(config)

            console.log(">>> [SZUM2101]fn_openDetailPop2(End) <<< ")        

        },

       /*
        * [면세유현황-월별사용량] 팝업호출
        */
		fn_openDetailPop3() {
            const config = {
                component : SZUM2106, // 면세유현황-월별사용량
                // params : {
                //     fltynm  : this.fltynm, //업무구분코드명
				// }
			}	    
            modalService.openPopup(config)
		}
    },
    components : {
        Page,
        FootersV2,
        // SzCategoryV2,
        //AnCategoryV2,
        //AnSubCategoryV2,
        AnSubCategoryV4,
    }
}   
</script>