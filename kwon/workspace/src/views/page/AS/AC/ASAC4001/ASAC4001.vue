<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 예금
* @ 페이지설명 : 나의자산 > 자산 > 예금 메인
* @ 파일명     : src/views/page/AS/AC/ASAC4001/ASAC4001.vue
* @ 작성자     : CS541017
* @ 작성일     : 2025-01-23
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-12             CS533039             ASAC1002 -> ASAC2001 마이데이터 확대개발 API2.0
* 2025-01-23             CS541017             ASAC2001 -> ASAC4001 마이데이터 확대개발 API4.0
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
        <as-sub-category-v4 type="AC"></as-sub-category-v4>
        <!-- E :: 자산 SUB카테고리 -->

        <div id="content" class="renewal">
            <div class="com_inner" v-if="getIsDataYn">
                <div class="new_sub_info">
                    <div class="title">
                        <div class="text">
                            모으고 있는 돈<br>
                            <div class="toggle_money" :class="hideYn === true ? 'on' : ''">
                                <div class="sum">
                                    <span class="hide">잔액숨김</span>
                                    <span class="show">{{acBalttAm | numberFilter}}원</span>
                                </div>
                                <button type="button" class="btns" @click="fn_setHidden('DP', !hideYn)">
                                    <span class="blind">금액</span>
                                    <span class="hide">보기</span>
                                    <span class="show">숨김</span>
                                </button>
                            </div>
                            <!-- <div class="toggle_money">
                                <input type="checkbox" title="금액노출" name="" id="sum_view_01" v-model="hideYn" @change="fn_setHidden('DP', hideYn)">
                                <label for="sum_view_01" class="btns">
                                    <span class="hide" aria-hidden="true">보기</span>
                                    <span class="show" aria-hidden="true">숨김</span>
                                </label>
                                <div class="sum">
                                    <span class="hide">잔액숨김</span>
                                    <span class="show">총 <em>{{acBalttAm | numberFilter}}</em>원</span>
                                </div>
                            </div> -->
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
                                <div class="tit"><span>입출금</span> <span class="com_icon_num custom">{{rndaAccn}}<i class="blind">건</i></span></div>
                                <span class="total_price">
                                    <em class="num"><span class="blind">금액</span>{{rndaAcBaltt | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                        <div class="list_top_btns">
                            <a href="javascript:void(0);" class="btn_sort" role="button" @click="fn_rndaAcSortPop()"><span>{{rndaAcSortNm}}</span></a>
                            <button v-if="btnType" type="button" class="stdBtn innerType01"  @click.prevent="fn_moveRmt()">송금하기</button>
                        </div>
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
                                    <!-- [v4.0] 계좌번호 추가 -->
                                    <dd>
                                        <span class="prod_num"><span class="blind">계좌번호</span>{{item.mydtAcno}}</span>
                                    </dd>
                                    <!-- //[v4.0] 계좌번호 추가 -->
                                    <dd>
                                        <span class="com_price">
                                            <em class="num"><span class="blind">금액</span>{{item.acNowBac | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                            <!--                             
                            <div v-if="btnType" class="exe_btns"> 요건 삭제
                                <button type="button" class="stdBtn innerType01" @click.prevent="fn_moveRmt()">송금</button>
                            </div> 
                            -->

                            <span v-if="item.acNowBac < 0" class="com_txtinfo_type01">마이너스 통장 대출잔액은 대출에서만 합산됩니다.</span>
                            <!-- //[v4.0] 마이너스 통장 케이스 추가 -->
                        </li>
                    </ul>
                </div>
                <!-- 입출금 계좌만 등록 시 배너 스와이핑 처리(고도화 요건) -->
                <template v-if="this.rndaAcList.length > 0 && this.dpAcList == 0 && this.isAcList == 0">
                    <div class="inner_banner">
                        <div class="banner_slider slick_refresh">
                            <div v-if="btnType">
                                <a href="javascript:void(0)" role="button" @click.prevent="fn_movePage()">
                                    <img src="@/assets_v40/images/banner/img_benner_01.png" alt="송금수수료 무료 이제 타은행계좌도 콕뱅크에 등록하고 송금하세요">
                                </a>
                            </div>
                            <div>
                                <a href="javascript:void(0)" role="button" @click.prevent="fn_openPDMY4005()">
                                    <img src="@/assets_v40/images/banner/img_benner_03.png" alt="부자되는 첫 걸음 돈 모으기 목표부터 세우기!">
                                </a>
                            </div>
                        </div>
                    </div>
                </template>
                <!-- 입출금 계좌 등록 또는 예적금 계좌 미 등록 시 단독으로 표시 -->
                <template v-else>
                    <template v-if="rndaAcList.length > 0 && btnType">
                        <div class="inner_banner">
                            <a href="javascript:void(0)" role="button" @click.prevent="fn_movePage()">
                                <img src="@/assets_v40/images/banner/img_benner_01.png" alt="송금수수료 무료 이제 타은행계좌도 콕뱅크에 등록하고 송금하세요">
                            </a>
                        </div>
                    </template>
                    <template  v-if="dpAcList.length == 0 && isAcList.length == 0">
                        <div class="inner_banner">
                            <a href="javascript:void(0)" role="button" @click.prevent="fn_openPDMY4005()">
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
                                <div class="tit"><span>예금</span> <span class="com_icon_num custom">{{dpAccn}}<i class="blind">건</i></span></div>
                                <span class="total_price">
                                    <em class="num"><span class="blind">금액</span>{{dpAcBaltt | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                        <a href="javascript:void(0);" class="btn_sort" role="button" @click="fn_dpAcSortPop()"><span>{{dpAcSortNm}}</span></a>
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
                                    <!-- [v4.0] 계좌번호 추가 -->
                                    <dd>
                                        <span class="prod_num"><span class="blind">계좌번호</span>{{item.mydtAcno}}</span>
                                    </dd>
                                    <!-- //[v4.0] 계좌번호 추가 -->
                                    <dd>
                                        <span class="com_price">
                                            <em class="num"><span class="blind">금액</span>{{item.acNowBac | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                                <!-- 주택청약은 만기일 없음. 만기일 존재할때만 표시 2021.11.18 -->
                                <template v-if="item.dueDt !== null && item.dueDdsDiv !== '0'">
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
                                <div class="tit"><span>적금</span> <span class="com_icon_num custom">{{isAccn}}<i class="blind">건</i></span></div>
                                <span class="total_price">
                                    <em class="num"><span class="blind">금액</span>{{isAcBaltt | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                        <a href="javascript:void(0);" class="btn_sort" role="button" @click="fn_isAcSortPop()"><span>{{isAcSortNm}}</span></a>
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
                                    <!-- [v4.0] 계좌번호 추가 -->
                                    <dd>
                                        <span class="prod_num"><span class="blind">계좌번호</span>{{item.mydtAcno}}</span>
                                    </dd>
                                    <!-- //[v4.0] 계좌번호 추가 -->
                                    <dd>
                                        <span class="com_price">
                                            <em class="num"><span class="blind">금액</span>{{item.acNowBac | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                                <!-- 주택청약은 만기일 없음. 만기일 존재할때만 표시 2021.11.18 -->
                                <template v-if="item.dueDt !== null && item.dueDdsDiv !== '0'">
                                    <span class="mint_badge">{{item.dueDds > 0 ? 'D-'+item.dueDds : '만기'}}</span>
                                </template>
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- 돈모으기 배너 -->
                <div class="inner_banner" v-if="dpAcList.length > 0 || isAcList.length > 0">
                    <div>
                        <a href="javascript:void(0)" role="button" @click.prevent="fn_openPDMY4005()">
                            <img src="@/assets_v40/images/banner/img_benner_03.png" alt="부자되는 첫 걸음 돈 모으기 목표부터 세우기!">
                            
                        </a>
                    </div>
                </div>

                <!-- 외화 -->
                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="fcAcList.length > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit"><span>외화</span> <span class="com_icon_num custom">{{fcAccn}}<i class="blind">건</i></span></div>
                                <span class="total_price">
                                    <em class="num"><span class="blind">금액</span>{{fcAcBaltt | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                        <a href="javascript:void(0);" class="btn_sort" role="button" @click="fn_fcAcSortPop()"><span>{{fcAcSortNm}}</span></a>
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
                                    <!-- [v4.0] 계좌번호 추가 -->
                                    <dd>
                                        <span class="prod_num"><span class="blind">계좌번호</span>{{item.mydtAcno}}</span>
                                    </dd>
                                    <!-- //[v4.0] 계좌번호 추가 -->
                                    <dd>
                                        <span class="com_price">
                                            <em class="num"><span class="blind">금액</span>{{item.acNowBac | numberFilter}}</em><em class="unit">원</em>
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
    import AsSubCategoryV4 from '@/components/category/AsSubCategoryV4.vue'
    import CmmFinancialBanner from '@/components/CmmFinancialBanner.vue'    //상품추천배너 2021.11.12
    import {fncSlick} from '@/utils/slick'

    import apiService from '@/service/apiService'
    import appService from '@/service/appService'
    import commonService from '@/service/commonService'

    import ASAC4102 from '@/views/page/AS/AC/ASAC4102/ASAC4102'
    import ASAC1103 from '@/views/page/AS/AC/ASAC1103/ASAC1103'
    import ASAC1104 from '@/views/page/AS/AC/ASAC1104/ASAC1104'
    import ASAC1105 from '@/views/page/AS/AC/ASAC1105/ASAC1105'
    import COAR4001 from '@/views/page/CO/AR/COAR4001/COAR4001'
    import PDMY4005 from '@/views/page/PD/MY/PDMY4005/PDMY4005' //돈모으기 목표등록
    import ASAC4004 from '@/views/page/AS/AC/ASAC4004/ASAC4004'
    

	export default {
		name: 'ASAC4001',
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
                rndaAcSortVal : '1',      //입출금정렬기준
                rndaAcSortNm  : '기본', //입출금정렬이름
                rndaAcListOrg : [],		//입출금리스트org
                dpAcSortVal : '1',        //예금정렬기준
                dpAcSortNm  : '기본',   //예금정렬이름
                dpAcListOrg : [],		//예금리스트org
                isAcSortVal : '1',      //적금금정렬기준
                isAcSortNm  : "기본", //적금정렬이름
                isAcListOrg : [],		//적금리스트org
                fcAcSortVal : '1',      //외화정렬기준
                fcAcSortNm  : '기본', //외화정렬이름
                fcAcListOrg : [],		//외화리스트org
                hideYn		: false,  // 숨김 여부
                btnType     : false, //콕뱅 여부
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
                this.hideYn = this.getSecretAmInfo().includes('DP')
                if(this.getUserInfo('chnl') === "386")this.btnType = true
                this.getData()
            },
            getData() {
                ///////////////////////////////////
                // 계좌목록 조회 
                const config = {
                    url: '/as/ac/01r03', 
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
                    this.rndaAcList.forEach((item,index) => {
                        this.rndaAcList[index].scrnPrtoSq = index //화면출력순서
                    })
                    this.rndaAcListOrg = [...this.rndaAcList] || []  //입출금계좌목록Org

                    //예금
                    this.dpAccn    = this.respInfo.dpAccn     //예금계좌수
                    this.dpAcBaltt = this.respInfo.dpAcBaltt  //예금계좌잔액합계
                    this.dpAcList  = this.respInfo.dpAcList || []   //예금계좌목록
                    this.dpAcList.forEach((item,index) => {
                        this.dpAcList[index].scrnPrtoSq = index //화면출력순서
                        if(item.dueDt === '' ||item.dueDt === null ){
                            this.dpAcList[index].dueDds = "99991231" //화면출력순서 만기일 정렬일때 맨 뒤로
                            this.dpAcList[index].dueDdsDiv = '0' //만기일 영역
                        }
                    })
                    this.dpAcListOrg = [...this.dpAcList] || []  //예금금계좌목록Org

                    //적금
                    this.isAccn    = this.respInfo.isAccn     //적금계좌수
                    this.isAcBaltt = this.respInfo.isAcBaltt  //적금계좌잔액합계
                    this.isAcList  = this.respInfo.isAcList || []   //적금계좌목록
                    this.isAcList.forEach((item,index) => {
                        this.isAcList[index].scrnPrtoSq = index //화면출력순서
                        if(item.dueDt === '' ||item.dueDt === null ){
                            this.isAcList[index].dueDds = "99991231" //화면출력순서 만기일 정렬일때 맨 뒤로
                            this.isAcList[index].dueDdsDiv = '0' //만기일 영역
                        }
                    })
                    
                    this.isAcListOrg  = [...this.isAcList] || []   //적금계좌목록Org

                    //외화
                    this.fcAccn    = this.respInfo.fcAccn     //외화계좌수
                    this.fcAcBaltt = this.respInfo.fcAcBaltt  //외화계좌잔액합계
                    this.fcAcList  = this.respInfo.fcAcList || []   //외화계좌목록
                    this.fcAcList.forEach((item,index) => {
                        this.fcAcList[index].scrnPrtoSq = index //화면출력순서
                    })
                    this.fcAcListOrg  = [...this.fcAcList] || []   //외화계좌목록Org

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
                    compName = ASAC4102 //입출금
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
                    component: COAR4001,
                }
                modalService.openPopup(config).then(() => {
                    this.getData()
                })
            },

            /*
            * 돈모으기 팝업
            */
            fn_openPDMY4005() {
                const config = {
                    component: PDMY4005,
                }
                modalService.openPopup(config).then(response => {

                    // 배너이미지를 통하여 목표등록을 하였을 경우
                    // 나의목표로 이동
                    if(response == 'reSelect') {
                        const menu = {
                            name: 'PDMY4001',
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
            },
            /*
                입출금 정렬 팝업 호출
            */
            fn_rndaAcSortPop(){
                const config = {
                    params : {
                        sortVal   : this.rndaAcSortVal,
                        sortDs   : '' //입출금,외화 "" , 예금,적금 "1"
                    },
                    renderer : {
                        component : ASAC4004
                    }
                }
                modalService.openSlidePagePopup(config).then(response => {
                    this.rndaAcSortVal = response.sortVal;
                    if(this.rndaAcSortVal === "1"){
                        this.rndaAcList = [...this.rndaAcListOrg] || [] 
                        this.rndaAcSortNm = "기본"
                    }else{
                        this.rndaAcList = this.rndaAcList.sort((a,b) => b.acNowBac - a.acNowBac || a.scrnPrtoSq - b.scrnPrtoSq)
                        this.rndaAcSortNm = "금액순"
                    }
                })
            },
            /*
                예금 정렬 팝업 호출
            */
            fn_dpAcSortPop(){
                const config = {
                    params : {
                        sortVal   : this.dpAcSortVal,
                        sortDs   : '1' //입출금,외화 "" , 예금,적금 "1"
                    },
                    renderer : {
                        component : ASAC4004
                    }
                }
                modalService.openSlidePagePopup(config).then(response => {
                    this.dpAcSortVal = response.sortVal;
                    if(this.dpAcSortVal === "1"){
                        this.dpAcList = [...this.dpAcListOrg] || [] 
                        this.dpAcSortNm = "기본"
                    }else if(this.dpAcSortVal === "2"){
                        this.dpAcList = this.dpAcList.sort((a,b) => b.acNowBac - a.acNowBac || a.scrnPrtoSq - b.scrnPrtoSq)
                        this.dpAcSortNm = "금액순"
                    }else if(this.dpAcSortVal === "3"){
                        this.dpAcList = this.dpAcList.sort((a,b) => b.aplItr - a.aplItr || a.scrnPrtoSq - b.scrnPrtoSq)
                        this.dpAcSortNm = "금리순"
                    }else{
                        this.dpAcList = this.dpAcList.sort((a,b) => a.dueDds - b.dueDds || a.scrnPrtoSq - b.scrnPrtoSq)
                        this.dpAcSortNm = "만기순"
                    }
                })
            },
            /*
                적금 정렬 팝업 호출
            */
            fn_isAcSortPop(){
                const config = {
                    params : {
                        sortVal   : this.isAcSortVal,
                        sortDs   : '1' //입출금,외화 "" , 예금,적금 "1"
                    },
                    renderer : {
                        component : ASAC4004
                    }
                }
                modalService.openSlidePagePopup(config).then(response => {
                    this.isAcSortVal = response.sortVal;
                    if(this.isAcSortVal === "1"){
                        this.isAcList = [...this.isAcListOrg] || [] 
                        this.isAcSortNm = "기본"
                    }else if(this.isAcSortVal === "2"){
                        this.isAcList = this.isAcList.sort((a,b) => b.acNowBac - a.acNowBac || a.scrnPrtoSq - b.scrnPrtoSq)
                        this.isAcSortNm = "금액순"
                    }else if(this.isAcSortVal === "3"){
                        this.isAcList = this.isAcList.sort((a,b) => b.aplItr - a.aplItr || a.scrnPrtoSq - b.scrnPrtoSq)
                        this.isAcSortNm = "금리순"
                    }else{
                        this.isAcList = this.isAcList.sort((a,b) => a.dueDds - b.dueDds || a.scrnPrtoSq - b.scrnPrtoSq)
                        this.isAcSortNm = "만기순"
                    }
                })
            },
            /*
                외화 정렬 팝업 호출
            */
            fn_fcAcSortPop(){
                const config = {
                    params : {
                        sortVal   : this.fcAcSortVal,
                        sortDs   : '' //입출금,외화 "" , 예금,적금 "1"
                    },
                    renderer : {
                        component : ASAC4004
                    }
                }
                modalService.openSlidePagePopup(config).then(response => {
                    this.fcAcSortVal = response.sortVal;
                    if(this.fcAcSortVal === "1"){
                        this.fcAcList = [...this.fcAcListOrg] || [] 
                        this.fcAcSortNm = "기본"
                    }else{
                        this.fcAcList = this.fcAcList.sort((a,b) => b.acNowBac - a.acNowBac || a.scrnPrtoSq - b.scrnPrtoSq)
                        this.fcAcSortNm = "금액순"
                    }
                })
            },
            /*
                숨김여부
            */
            fn_setHidden(flag, type) {
                this.hideYn = type
				this.setSecretAmInfo(flag, type)
			},
            /*
                송금버튼
            */
           fn_moveRmt(){
                modalService.alert("콕뱅크 송금 메뉴로 이동할게요.<BR><BR>출금계좌 확인 후 송금해 주세요. 계좌가 조회되지 않는 경우 콕뱅크에 계좌를 등록해 주세요.").then(text => {
                    if(text == "확인"){
                        //콕 송금으로 이동
                        let url = 'CBTRP0001R'
                        appService.cokBankGoMove( url )
                    }
                })
           },
		},
		components: {
            Page,
            FootersV2,
            AsSubCategoryV4,
            CmmFinancialBanner  //상품추천배너 2021.11.12
		}
    }
    
</script>

