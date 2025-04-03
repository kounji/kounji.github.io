<!--
// 2025 NATIVE 호출 함수 수정
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 예금
* @ 페이지설명 : 나의자산 > 자산 > 예금 메인
* @ 파일명     : src/views/page/AS/AC/ASAC2001/ASAC2001.vue
* @ 작성자     : CS533039
* @ 작성일     : 2023-07-12
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-12             CS533039             ASAC1002 -> ASAC2001 마이데이터 확대개발 API2.0
*************************************************************************/
-->
<template>
		<page class="content-view hasLNB mydata2023">
		
        <!-- S :: 자산 카테고리 -->
		<!--
        <as-category-v2 type="AC"></as-category-v2>
		-->
        <!-- E :: 자산 카테고리 -->

        <!-- S :: 자산 SUB카테고리 -->
        <as-sub-category-v2 type="AC"></as-sub-category-v2>
        <!-- E :: 자산 SUB카테고리 -->

        <div id="content" class="renewal">
            <div class="com_inner" v-if="getIsDataYn">
                <div class="new_sub_info">
                    <div class="title">
                        <div class="text">
                            모으고 있는 돈<br>
                            <span class="fs-27">총 </span><strong><span class="num counter" :data-count="respInfo.acBalttAm">{{acBalttAm | numberFilter}}</span>원</strong>
                        </div>
                    </div>
                </div>

                <!-- S :: 추천배너 2021.11.12 -->
                <cmm-financial-banner asdbDsc="01"/>
                <!-- E :: 추천배너 2021.11.12 -->
                <!-- <div class="new_float_popover_wrap">
                    <div class="float_popover custom_float_popover">
                        <div class="text">
                            신한세배드림적금을 <strong>복리식정기예탁금</strong>에<br>예치하시고 높은이자를 받으세요.
                        </div>
                        <a href="#nolink" role="button" class="btn_close gray"><span class="blind">닫기</span></a>
                    </div>
                </div> -->
            </div>
            
            <hr class="hr02">

            <div class="com_inner" v-if="getIsDataYn">
                <!-- 입출금 -->
                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="rndaAcList.length > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>입출금</span> <span class="com_icon_num custom">{{rndaAccn}}</span></div>
                                <span class="total_price">
                                    <em class="num">{{rndaAcBaltt | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                    </div>
                    <ul class="view_cont list_type_01">
                        <li v-for="(item, idx) in rndaAcList" :key="idx">
                            <a href="javascript:void(0);" role="button" v-on:click.prevent="fn_openDetailPop('RNDA', item)">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                            <em class="prod_name">{{item.acWrsnm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{item.acNowBac | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- 입출금 계좌만 등록 시 배너 스와이핑 처리(고도화 요건) -->
                <template v-if="this.rndaAcList.length > 0 && this.dpAcList == 0 && this.isAcList == 0">
                    <div class="inner_banner">
                        <div class="banner_slider slick_refresh">
                            <div>
                                <a href="javascript:void(0)" role="button" @click.prevent="fn_movePage()">
                                    <img src="@/assets_v40/images/banner/img_benner_01.png" alt="송금수수료 무료 이제 타은행계좌도 콕뱅크에 등록하고 송금하세요">
                                </a>
                            </div>
                            <div>
                                <a href="javascript:void(0)" role="button" @click.prevent="fn_openPDMY2005()">
                                    <img src="@/assets_v40/images/banner/img_benner_03.png" alt="부자되는 첫 걸음 돈 모으기 목표부터 세우기!">
                                </a>
                            </div>
                        </div>
                    </div>
                </template>
                <!-- 입출금 계좌 등록 또는 예적금 계좌 미 등록 시 단독으로 표시 -->
                <template v-else>
                    <template v-if="rndaAcList.length > 0">
                        <div class="inner_banner">
                            <a href="javascript:void(0)" role="button" @click.prevent="fn_movePage()">
                                <img src="@/assets_v40/images/banner/img_benner_01.png" alt="송금수수료 무료 이제 타은행계좌도 콕뱅크에 등록하고 송금하세요">
                            </a>
                        </div>
                    </template>
                    <template  v-if="dpAcList.length == 0 && isAcList.length == 0">
                        <div class="inner_banner">
                            <a href="javascript:void(0)" role="button" @click.prevent="fn_openPDMY2005()">
                                <img src="@/assets_v40/images/banner/img_benner_03.png" alt="부자되는 첫 걸음 돈 모으기 목표부터 세우기!">
                            </a>
                        </div>
                    </template>                         
                </template>                       

                <!-- 예금 -->
                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="dpAcList.length > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="false">
                            <div class="new_tit_area">
                                <div class="tit"><span>예금</span> <span class="com_icon_num custom">{{dpAccn}}</span></div>
                                <span class="total_price">
                                    <em class="num">{{dpAcBaltt | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                    </div>
                    <ul class="view_cont list_type_01">
                        <li v-for="(item, idx) in dpAcList" :key="idx">
                            <a role="button" class="has_badge" v-on:click.prevent="fn_openDetailPop('DPAC', item)"><!-- 디데이 뱃지 있는 경우 .has_badge 추가 -->
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                            <em class="prod_name">{{item.acWrsnm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{item.acNowBac | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                                <!-- 주택청약은 만기일 없음. 만기일 존재할때만 표시 2021.11.18 -->
                                <template v-if="item.dueDt !== null">
                                    <span class="mint_badge">{{item.dueDds > 0 ? 'D-'+item.dueDds : '만기'}}</span>
                                </template>
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- 적금 -->
                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="isAcList.length > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>적금</span> <span class="com_icon_num custom">{{isAccn}}</span></div>
                                <span class="total_price">
                                    <em class="num">{{isAcBaltt | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                    </div>
                    <ul class="view_cont list_type_01">
                        <li v-for="(item, idx) in isAcList" :key="idx">
                            <a href="javascript:void(0);" role="button" class="has_badge" v-on:click.prevent="fn_openDetailPop('ISAC', item)"><!-- 디데이 뱃지 있는 경우 .has_badge 추가 -->
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                            <em class="prod_name">{{item.acWrsnm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{item.acNowBac | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                                <!-- 주택청약은 만기일 없음. 만기일 존재할때만 표시 2021.11.18 -->
                                <template v-if="item.dueDt !== null">
                                    <span class="mint_badge">{{item.dueDds > 0 ? 'D-'+item.dueDds : '만기'}}</span>
                                </template>
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- 돈모으기 배너 -->
                <div class="inner_banner" v-if="dpAcList.length > 0 || isAcList.length > 0">
                    <div>
                        <a href="javascript:void(0)" role="button" @click.prevent="fn_openPDMY2005()">
                            <img src="@/assets_v40/images/banner/img_benner_03.png" alt="부자되는 첫 걸음 돈 모으기 목표부터 세우기!">
                        </a>
                    </div>
                </div>

                <!-- 외화 -->
                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="fcAcList.length > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>외화</span> <span class="com_icon_num custom">{{fcAccn}}</span></div>
                                <span class="total_price">
                                    <em class="num">{{fcAcBaltt | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                    </div>
                    <ul class="view_cont list_type_01">
                        <li v-for="(item, idx) in  fcAcList" :key="idx">
                            <a href="javascript:void(0);" role="button" v-on:click.prevent="fn_openDetailPop('FCAC', item)">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                            <em class="prod_name">{{item.acWrsnm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{item.acNowBac | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="content" class="renewal" v-else>
                <div class="com_inner">
                        <!-- 조회내역이 없을경우 -->
                        <div class="no_data_box no_data_box01 grayExclamationType">
                            <div class="no_data_list">
                                <p class="txt_sub">조회된 정보가 없습니다.</p>
                            </div>
                        </div>
                        <!--// 조회내역이 없을경우 -->
                </div>
            </div>


            <div class="new_add_register"><a href="javascript:void(0);" role="button" v-on:click.prevent="fn_openAssetPage()"><span>더 연결할 자산이 있으신가요?</span></a></div>
        </div>
        <!-- <script src="../../../@pub_include/footer.js"></script>html용 footer.js 개발팀 별도 적용 -->
        <footersV2 type="as" />

    </page>
</template>

<script>
    import Page from '@/views/layout/Page.vue'
    import FootersV2 from "@/views/layout/FootersV2.vue"
    import commonMixin from '@/common/mixins/commonMixin'
    import modalService from '@/service/modalService'
    import AsCategoryV2 from '@/components/category/AsCategoryV2.vue'
    import AsSubCategoryV2 from '@/components/category/AsSubCategoryV2.vue'
    import CmmFinancialBanner from '@/components/CmmFinancialBanner.vue'    //상품추천배너 2021.11.12
    import {fncSlick} from '@/utils/slick'

    import apiService from '@/service/apiService'
    import appService from '@/service/appService'
    import commonService from '@/service/commonService'

    import ASAC2102 from '@/views/page/AS/AC/ASAC2102/ASAC2102'
    import ASAC1103 from '@/views/page/AS/AC/ASAC1103/ASAC1103'
    import ASAC1104 from '@/views/page/AS/AC/ASAC1104/ASAC1104'
    import ASAC1105 from '@/views/page/AS/AC/ASAC1105/ASAC1105'
    import COAR2001 from '@/views/page/CO/AR/COAR2001/COAR2001'

    import PDMY2005 from '@/views/page/PD/MY/PDMY2005/PDMY2005' //돈모으기 목표등록

	export default {
		name: 'ASAC2001',
		data: () => {
			return {
                respInfo      : {},

                rcnInqDtm     : 0,      //최근조회일시
                acBalttAm     : 0,      //계좌잔액합계금액
                totAccn       : 0,      //전체계좌수
                rndaAccn      : 0,      //입출금계좌수
                rndaAcBaltt   : 0,      //입출금계좌잔액합계
                rndaAcList    : [],     //입출금리스트
                dpAccn        : 0,      //예금계좌수
                dpAcBaltt     : 0,      //예금계좌잔액합계
                dpAcList      : [],     //예금리스트
                isAccn        : 0,      //적금계좌수
                isAcBaltt     : 0,      //적금계좌잔액합계
                isAcList      : [],     //적금리스트
                fcAccn        : 0,      //외화계좌수
                fcAcBaltt     : 0,      //외화계좌잔액합계
                fcAcList      : [],		//외화리스트
			}
        },
		mixins: [
			commonMixin
		],        
		computed: {
            getDataCss(){
                return this.totAccn > 0 ? "com_bg_type00" : "com_bg_type02"
            },
            getIsDataYn() {
                return this.totAccn > 0 ? true : false
            }          
        },
		created() {
            
		},
		mounted() {
            this.initComponent()

            // 자산수집 mutation 이벤트 감지 
            this.getGatheringListenSubscribe()

            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
		},        
		methods: {
            initComponent() {
                this.getData()
            },
            getData() {
                ///////////////////////////////////
                // 계좌목록 조회 
                const config = {
                    url: '/as/ac/01r02', 
					data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno')
                    }
                }
                apiService.call(config).then(response =>{

                    this.respInfo = response
                    
                    //입출금
                    this.rndaAccn    = this.respInfo.rndaAccn     //입출급계좌수
                    this.rndaAcBaltt = this.respInfo.rndaAcBaltt  //입출급계좌합계
                    this.rndaAcList  = this.respInfo.rndaAcList || []  //입출금계좌목록

                    //예금
                    this.dpAccn    = this.respInfo.dpAccn     //예금계좌수
                    this.dpAcBaltt = this.respInfo.dpAcBaltt  //예금계좌잔액합계
                    this.dpAcList  = this.respInfo.dpAcList || []   //예금계좌목록

                    //적금
                    this.isAccn    = this.respInfo.isAccn     //적금계좌수
                    this.isAcBaltt = this.respInfo.isAcBaltt  //적금계좌잔액합계
                    this.isAcList  = this.respInfo.isAcList || []   //적금계좌목록

                    //외화
                    this.fcAccn    = this.respInfo.fcAccn     //외화계좌수
                    this.fcAcBaltt = this.respInfo.fcAcBaltt  //외화계좌잔액합계
                    this.fcAcList  = this.respInfo.fcAcList || []   //외화계좌목록

                    //전체계좌잔액 합계금액
                    this.totAccn   = this.respInfo.totAccn
                    this.acBalttAm = this.respInfo.acBalttAm

                    this.$nextTick(() => {
                        this.callJQueryFncExcute()
                        
                        // 오픈뱅킹 링크 고도화 요건(입출금 계좌만 등록 시 스와이핑 처리(예적금등록X))
                        if(this.rndaAcList.length > 0 && this.dpAcList == 0 && this.isAcList == 0){
                            fncSlick()
                        }
                    })
                })
            },

            /*
            * 상세화면이동.
            */
            fn_openDetailPop(type, deposit) {

                let compName = ""
                if(type == "RNDA") { 
                    compName = ASAC2102 //입출금
                } else if(type == "DPAC") {
                    compName = ASAC1103 //예금
                } else if(type == "ISAC") {
                    compName = ASAC1104 //적금
                } else if(type == "FCAC") {
                    compName = ASAC1105 //외화
                }

                // 전달파라미터 세팅
                let popupParam = deposit
                popupParam.mydtCusno = this.getUserInfo('mydtCusno') //마이데이터고객번호

                const config = {
                    component: compName,
                    params : {"objAccInfo" : popupParam}
                }

                modalService.openPopup(config).then(() => {
                    this.getData()
                })
            },

            /*
            * 자산등록 팝업
            */
            fn_openAssetPage() {
                const config = {
                    component: COAR2001,
                }
                modalService.openPopup(config).then(() => {
                    this.getData()
                })
            },

            /*
            * 돈모으기 팝업
            */
            fn_openPDMY2005() {
                const config = {
                    component: PDMY2005,
                }
                modalService.openPopup(config).then(response => {

                    // 배너이미지를 통하여 목표등록을 하였을 경우
                    // 나의목표로 이동
                    if(response == 'reSelect') {
                        const menu = {
                            name: 'PDMY2001',
                            params : {}
                        }
                        commonService.movePage(menu)
                    }
                })
            },
            /*
            * 콕뱅크 링크로 이동
            */
            fn_movePage() {

                // 스뱅일경우
                if(this.getUserInfo('chnl') === '385') {
                    // 스뱅

					const pageInfo = 'navigate( "SSOB1000R", { psnFncWrsC:"", wrsC:"", serviceId:"", naac_dsc:"2", nhType:"2"} )'
					window.fg.of.exec(function() {},"SBView","navigateFromGNB",[pageInfo]);                    
                    
                    //let url = 'WEB=Y%26serviceId=SSOB1000R%26naac_dsc=2%26nhType=2'
                    //appService.moveFinancialProductPage(url)
                } else {
                    //COK-BANK
                    appService.cokBankGoMove("CBASP1000R")                
                }
            }

		},
		components: {
            Page,
            FootersV2,
            AsCategoryV2,
            AsSubCategoryV2,
            CmmFinancialBanner  //상품추천배너 2021.11.12
		}
    }
    
</script>

