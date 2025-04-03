<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 마이농가설정
* @ 페이지설명 : 마이농가설정
* @ 파일명     : src/views/page/SZ/ST/SZST2101/SZST2101.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-05-21
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-21              CS515729                 최초작성
* 2021-08-10                                       수정(변경된 사항 추가)
*************************************************************************/
-->

<template>
    <!-- kimhc_20220922 수정-->
    <!-- <page class="content-view"> -->
    <page class="content-view hasLNB">
        <!-- <sz-category-v2 type="ST"></sz-category-v2> -->
        <an-category-v2 type="SZFC"></an-category-v2>
        <an-sub-category-v2 type="ST"></an-sub-category-v2>
       
        <div id="content" class="com_sub_type02 com_bg_type00"> <!--div(Start)-->
            <!--상단(Start)-->
            <div class="com_inner com_top_type04 pb30"> <!--div(Start)-->
                <ul class="com_radio_type01">  <!--ul(Start)-->
                    <li>
                        <span class="btn_radio">                                 
                            <input type="radio" name="com_check" id="com_check01" :checked="culplAreaUntC==='1'" @click="fn_chngSelItem('01')">
                            <label for="com_check01">
                                <span>작목/재배지 관리</span>   
                            </label>
                        </span>
                    </li>
                    <li>
                        <span class="btn_radio">
                            <input type="radio" name="com_check" id="com_check02" :checked="culplAreaUntC==='2'" @click="fn_chngSelItem('02')">
                            <label for="com_check02">
                                <span>농기계 상각 관리</span>   
                            </label>
                        </span>
                    </li> 
                    <li>
                        <span class="btn_radio">
                            <input type="radio" name="com_check" id="com_check03" :checked="culplAreaUntC==='3'" @click="fn_chngSelItem('03')">
                            <label for="com_check03">
                                <span>자가노동비 관리</span> 
                            </label>
                        </span>
                    </li>
                    <li>
                        <span class="btn_radio">
                            <input type="radio" name="com_check" id="com_check04" :checked="culplAreaUntC==='4'" @click="fn_chngSelItem('04')">
                            <label for="com_check04">
                                <span>계좌연동 설정</span> 
                            </label>
                        </span>
                    </li>
                </ul>  <!--ul(End)-->
            </div> <!--div(End)-->
            <!--상단(End)-->
            
            <!--하단(Start)-->
            <!--2021.08.20(금) 추가-->
            <template v-if="myfhsEstCn > 0  ">   <!--마이농가설정건수 > 0인 경우-->
                <div class="com_space_type01"></div>

                <template v-if="myfhsEstList.length > 0 ">  <!--마이농가설정목록 > 0인 경우-->
                    <div class="com_inner com_setlist_type01 mt0" v-for="(mfE, index) in myfhsEstList" :key="index" >

                        <dl class="com_line mb0">  <!--dl(Start)-->
                            <template v-if="(mfE.myfhsEstDsc ==='01') ">  <!--마이농가설정구분코드(01;광고배너노출여부)-->
                                <dt>광고배너 노출여부</dt>   
                            </template>
                            <template v-else>   <!--마이농가설정구분코드(02;절기정보 노출여부)-->
                                <dt>절기정보 노출여부</dt>   
                            </template>

                            <!-- <dd class="w5r">    -->
                                <!--dd(Start)-->
                                <!-- <span class="cmm-switch sm"> -->
                            <dd>
                                <span class="cmm-switch custom-switch">
                                    <input type="checkbox" :id="mfE.myfhsEstDsc" :title="mfE.myfhsEstVal ==='1'?'노출':'비노출' "  :checked="mfE.myfhsEstVal ==='1'" v-on:click="fn_checkEvent($event, mfE.myfhsEstDsc)" > 
                                    <label :for="mfE.myfhsEstDsc">
                                        <template v-if="(mfE.myfhsEstDsc ==='01') ">  <!--마이농가설정구분코드(01;광고배너노출여부)-->                                                                       
                                            <em class="blind">광고배너 노출여부 선택</em>
                                        </template>
                                        <template v-else>   <!--마이농가설정구분코드(02;절기정보 노출여부)-->
                                            <em class="blind">절기정보 노출여부 선택</em>
                                        </template>
                                    </label>
                                </span>
                            </dd>  <!--dd(End)-->
                        </dl> <!--dl(End)-->
                    </div> <!--div(End)-->
                </template>            
            </template> 
            <template v-else>    <!--조회내역이 없을경우-->
                <div class="no_data_box">
                    <div class="no_data_list">
                        <p>조회된 정보가 없습니다.</p>
                    </div>
                </div>
            </template> 
            <!--2021.08.20(금) 추가-->
            <!--하단(End)-->

        </div> <!--div(End)-->

        <footersV2 type="sz" />
    </page>
</template>

<script>
    import Page from '@/views/layout/Page.vue'
    import FootersV2 from "@/views/layout/FootersV2.vue"
    import commonMixin from '@/common/mixins/commonMixin'
    import modalService from '@/service/modalService'
    import apiService from '@/service/apiService'
    // import SzCategoryV2 from '@/components/category/SzCategoryV2.vue'
    import AnCategoryV2 from '@/components/category/AnCategoryV2.vue'
    import AnSubCategoryV2 from '@/components/category/AnSubCategoryV2.vue' 

    import popupMixin from '@/common/mixins/popupMixin'

    import SZST2102 from '@/views/page/SZ/ST/SZST2102/SZST2102'
    import SZST2108 from '@/views/page/SZ/ST/SZST2108/SZST2108'
    import SZST2111 from '@/views/page/SZ/ST/SZST2111/SZST2111'
    import SZST2113 from '@/views/page/SZ/ST/SZST2113/SZST2113'
    //import SZFC1111 from '@/views/page/SZ/FC/SZFC1111/SZFC1111'

    export default {
        name : "SZST2101",
        data: () => {
            return {
                culplAreaUntC  : "",      //관리선택 check(작목재배지관리,농기계상각관리,자간노동비관리,계좌연동설정)

                varChkdVal1    : "0",    
                varChkdVal2    : "0",    

                myfhsEstCn     : 0,      //마이농가설정건수
                myfhsEstList   : [],     //마이농가설정목록
            }
        },

        mixins: [
            popupMixin,
            commonMixin
        ],

        mounted() {
            this.initComponent()
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },

        methods: {
            initComponent() {
                //this.culplAreaUntC   = "1"   //'작목/재배지 관리' check 초기화 값 . 초기화면 진입시 checked 미표시 처리.

                this.fn_onLoadInit()
            },

            fn_onLoadInit(){
                console.log("[SZST2101]fn_onLoadInit()/여기인가여???/~~~ ")

                this.getSearchList()     
            },
        
            //**************
            // [조회]
            //***************/
            getSearchList() {

                const config = {
                    url:'/sz/st/01r01',
                    data : {
                        mydtCusno : this.getUserInfo('mydtCusno'),        //마이데이터고객번호 = (변수)마이데이터고객번호
                    }
                }
                apiService.call(config).then(response => {
                    
                    this.myfhsEstCn   = (response.myfhsEstCn === undefined)?0:response.myfhsEstCn  //마이농가설정건수
                    this.myfhsEstList  = (response.myfhsEstList === undefined)?'':response.myfhsEstList || []   //마이농가설정목록
               })      

            },

            /*
            * [작목재배지관리/농기계상각/자가노동비관리/계좌연동설정] 선택시
            */
            fn_chngSelItem(flag) {

                 let component;

                if (flag === '01') {
                    this.culplAreaUntC = "1" 
                    component = SZST2102     //작목/재배지 관리
                } else if (flag === '02') {
                    this.culplAreaUntC = "2" 
                    component = SZST2108     //농기계상각 관리
                } else if (flag === '03') {
                    this.culplAreaUntC = "3" 
                    component = SZST2111     //자가노동비 관리
                } else if (flag === '04') {
                    this.culplAreaUntC = "4" 
                    component = SZST2113     //계좌연동 설정
                }

                if (component !== "") {    
                     
                    const config = {
                        component: component,
                    }
                    modalService.openPopup(config).then(response => {

                        if(response === 'complete'){      

                            /* 2021.10.08(금) 추가 */        
                            if (flag === '01') {
                                this.culplAreaUntC = "1"  //작목/재배지 관리
                            } else if (flag === '02') {
                                this.culplAreaUntC = "2"  //농기계상각 관리
                            } else if (flag === '03') {
                                this.culplAreaUntC = "3"  //자가노동비 관리
                            } else if (flag === '04') { 
                                this.culplAreaUntC = "4"  //계좌연동 설정
                            /* 2021.10.08(금) 추가 */        
                            }
                            
                            //if (response) this.fn_onLoadInit() //this.initComponent()
                        }
                    })
                }

            }, 

            /*
            * [광고배너 노출여부/절기정보 노출여부] Switch Check 선택시
            */
            fn_checkEvent(e, flag) {

                if (e.target.checked) {
                   if (flag === "01") {  //마이농가설정구분코드가 01(광고배너 노출여부)인 경우
                       this.varChkdVal1 = '1'
                   } else {
                       this.varChkdVal2 = '1'
                   }
                } else {               
                   if (flag === "01") {  //마이농가설정구분코드가 01(광고배너 노출여부)인 경우
                       this.varChkdVal1 = '0'
                   } else {
                       this.varChkdVal2 = '0'
                   }
                }

                const config = {
                    url:'/sz/st/01s01',
                    data : {
                        mydtCusno : this.getUserInfo('mydtCusno'),     //마이데이터고객번호 = (변수)마이데이터고객번호
                        myfhsEstDsc : (flag === '01')?'01':'02',       //마이농가설정구분코드(01;광고배너노출여부,02;절기정보 노출여부)
                        myfhsEstVal : (flag === '01')?this.varChkdVal1:this.varChkdVal2,       //마이농가 설정값(1;여,0;부)
                    }
                }
                apiService.call(config).then(response => {
                    if (response.rspC == '0000') { 
                        this.getSearchList()     
                    }	 
                })

            }, 

        },
        components : {
            Page,
            FootersV2,
            // SzCategoryV2
            AnCategoryV2,
            AnSubCategoryV2,
        }
    }
</script>