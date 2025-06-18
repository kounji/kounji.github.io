<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 포인트
* @ 페이지설명 : 나의자산 > 자산 > 포인트 메인
* @ 파일명     : src/views/page/AS/AC/ASAC1110/ASAC1110.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-08-03
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-03              CS515729                 최초작성
* 2021-10-14              CS515729                 선불카드 추가
* 2022-04-28              CS515901                 포인트카드 추가
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
        <as-sub-category-v4 type="PAY"></as-sub-category-v4>
        <!-- E :: 자산 SUB카테고리 -->

        <!--
        <div id="content" class="renewal" v-if="getIsDataYn">
        -->
        <div id="content" class="renewal" v-if="getIsDataYn">            
            <div class="com_inner">
                <div class="new_sub_info">
                    <div class="title">
                        <div class="text">
                            숨겨져 있는 돈<br>
                            <div class="toggle_money" :class="hideYn === true ? 'on' : ''">
                                <div class="sum">
                                    <span class="hide">잔액숨김</span>
                                    <span class="show">{{totPayAcAm | numberFilter}}원</span>
                                </div>
                                <button type="button" class="btns" @click="fn_setHidden('PNT', !hideYn)">
                                    <span class="blind">금액</span>
                                    <span class="hide">보기</span>
                                    <span class="show">숨김</span>
                                </button>
                            </div>

                            <!-- <div class="toggle_money">
                                <input type="checkbox" title="금액숨김" name="" id="sum_view_01" v-model="hideYn" @change="fn_setHidden('PNT', hideYn)">
                                <label for="sum_view_01" class="btns">
                                    <span class="hide" aria-hidden="true">보기</span>
                                    <span class="show" aria-hidden="true">숨김</span>
                                </label>
                                <div class="sum">
                                    <span class="hide">잔액숨김</span>
                                    <span class="show">총 <em>{{totPayAcAm | numberFilter}}</em>원</span>
                                </div>
                            </div> -->

                        </div>
                    </div>
                </div>
                
                <!-- S :: 추천배너 2021.11.12 -->
                <cmm-financial-banner asdbDsc="03"/>
                <!-- E :: 추천배너 2021.11.12 -->
            </div>

            <hr class="hr02">

            <div class="com_inner" v-if="getIsDataYn">
                <!-- 선불계좌 -->
                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="payMnyAcList.length > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit">
                                    <span>페이</span><span class="com_icon_num custom">{{paySumCn}}<i class="blind">건</i></span></div>
                                <span class="total_price">
                                    <em class="num"><span class="blind">금액</span>{{paySumAcAm | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                        <a href="javascript:void(0);" class="btn_sort" role="button" @click="fn_paySortPop()"><span>{{paySortNm}}</span></a>
                    </div>
                    <ul class="view_cont list_type_01">
                        <li v-for="(item, idx) in payTotalList" :key="idx">
                            <template v-if="item.type == 'PAY'">
                                <a href="javascript:void(0);" role="button" v-on:click.prevent="fn_openDetailPop('PAY',item)">
                                    <dl>
                                        <dt>
                                            <div>
                                                <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                                <em class="prod_name">{{item.faceOnm}}</em>
                                            </div>
                                            
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num"><span class="blind">금액</span>{{item.eltfncTotBac | numberFilter}}</em>
                                                <em class="unit">{{item.curc === "KRW" ? '원' : item.curnm}}</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </a>
                            </template>
                            <template v-if="item.type == 'CARD'">
                                <a href="javascript:void(0);" role="button" v-on:click.prevent="fn_openDetailPop('CARD',item)">
                                    <dl>
                                        <dt>
                                            <div>
                                                <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgCNm}}</span></i>
                                                <em class="prod_name">{{item.ppayCdnm}}</em>
                                            </div>
                                            
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num"><span class="blind">금액</span>{{item.ppaycdTotBac | numberFilter}}</em>
                                                <em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </a>
                            </template>
                        </li>
                    </ul>
                </div>
                <!-- 선불계좌 -->
                <!-- 금융포인트 -->
                <div class="com_box_type01 toggle_list_box2 custom_list" v-if="cardPntList.length > 0">
                    <div data-ui-toggle="box" class="toggle_box_area open">
                        <button type="button" class="view_btn" aria-expanded="true">
                            <div class="new_tit_area">
                                <div class="tit">
                                    <span>금융포인트</span>
                                    <span class="com_icon_num custom">{{cardPntcn}}<i class="blind">건</i></span>
                                </div>
                                <span class="total_price">
                                    <em class="num"><span class="blind">금액</span>{{cardPntBaltt | numberFilter}}</em>
                                    <em class="unit">원</em>
                                </span>
                            </div>
                            <em class="open">열기</em>
                            <em class="close">닫기</em>
                        </button>
                        <!-- [v4.0] 툴팁 추가 -->
                        <div v-if="tooltipYn" class="custom_tooltip up">
                            <div class="com_tooltip_type02 com_tooltip_type03">
                                <a href="javascript:void(0);" class="com_btn_info" role="button">
                                    <em class="com_icon_info"><span class="blind">금융포인트 툴팁열기</span></em>
                                </a>
                                <div class="com_ballon_type01 com_ballon_type02" style="display:none;">
                                    <div>
                                        <p>입금 신청시 포인트 전환 가능한 카드사와 NH콕에서 보이는 금융포인트는 상이할 수 있어요.</p>
                                        <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <!-- //[v4.0] 툴팁 추가 -->
                        <a href="javascript:void(0);" class="btn_sort"  role="button" @click="fn_cardPntSortPop()"><span>{{cardPntlSortNm}}</span></a>
                    </div>
                    <ul class="view_cont list_type_01"><!-- 클릭 없음.-->
                        <li v-for="(item, idx) in cardPntList" :key="`2_${idx}`">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgCNm}}</span></i>
                                            <em class="prod_name">{{item.pntnm}}</em>
                                        </div>
                                        
                                    </dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num"><span class="blind">금액</span>{{item.rmPnt | numberFilter}}</em>
                                            <em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                                <!-- [v4.0] 입금신청 버튼 추가 -->
								<!-- 20250410 요건삭제
                                <div v-if="item.rmPnt > 0 && orgcSome(item.infOfrmnOrgC)" class="exe_btns">
									<button type="button" class="stdBtn innerType01"  @click="fn_rrqr()">입금신청</button>
								</div> -->
								<!-- //[v4.0] 입금신청 버튼 추가 -->
                        </li>
                    </ul>
                </div>
            </div>    
            <div class="new_add_register"><a href="javascript:void(0);" role="button" v-on:click.prevent="fn_openAssetPage()"><span>더 연결할 자산이 있으신가요?</span></a></div>
        </div>
        <div id="content" class="renewal insur" v-else>
            <div class="com_inner">
                <div class="no_data_box no_data_box01 grayExclamationType">
                    <div class="no_data_list">
                        <p class="txt_sub">조회된 정보가 없습니다.</p>
                    </div>
                </div>
            </div>
            <div class="new_add_register"><a href="javascript:void(0);" role="button" v-on:click.prevent="fn_openAssetPage()"><span>더 연결할 자산이 있으신가요?</span></a></div>
        </div>
         <footersV2 type="as" />
    </page>
</template>
<script>
    import Page from '@/views/layout/Page.vue'
    import FootersV2 from "@/views/layout/FootersV2.vue"
    import commonMixin from '@/common/mixins/commonMixin'
    import modalService from '@/service/modalService'
    import apiService from '@/service/apiService'

    //import AsCategoryV2 from '@/components/category/AsCategoryV2.vue'
    import AsSubCategoryV4 from '@/components/category/AsSubCategoryV4.vue'
    import CmmFinancialBanner from '@/components/CmmFinancialBanner.vue'    //상품추천배너 2021.11.12

    import ASAC1106 from '@/views/page/AS/AC/ASAC1106/ASAC1106'
    import ASPT2002 from '@/views/page/AS/PT/ASPT2002/ASPT2002'
    import COAR4001 from '@/views/page/CO/AR/COAR4001/COAR4001'
    import ASPT4003 from '@/views/page/AS/PT/ASPT4003/ASPT4003'
    

    export default {
        name : "ASPT4001",
        data: () => {
            return {
                respInfo      : {},

                totPayAccn    : 0,  //총선불계좌수
                totPayAcAm    : 0,  //총선불계좌합계
                paySumCn      : 0,  //총페이포인트수
                paySumAcAm    : 0,

                payMnyAccn    : 0,  //선불계좌수
                payMnyAcBaltt : 0,  //선불계좌잔액
                payMnyAcList  : [], //선불계좌목록

                ppaycdcn      : 0,  //선불카드수
                ppaycdBaltt   : 0,  //선불카드잔액합계
                ppaycdList    : [],  //선불카드목록

                payTotalList      : [],     // 총페이목록
                payTotalListOrg   : [],     // 총페이목록org
                paySortVal    : "1",      //페이 정렬기준
                paySortNm    : "기본", //페이 정렬이름

                cardPntcn     : 0,  // 금융포인트 수
                cardPntBaltt  : 0,  // 금융포인트 합계
                cardPntList   : [], // 금융포인트 목록

                cardPntListOrg   : [],     // 총 금융포인트목록org
                cardPntSortVal   : "1",      //금융포인트 정렬기준
                cardPntlSortNm   : "기본", //금융포인트 정렬이름
                /* 롯데카드 비씨카드  삼성카드 신한카드 하나카드 
                현대카드 국민카드 농협카드 시티카드 우리카드 우정사업본부 */
                orgc             : ["D1AADO0000","D1AAFQ0000","D1AAEV0000","D1AAEX0000"
                                    ,"D1AABJ0000","D1AAFO0000","D1AAAF0000","D1AABG0000"
                                    ,"D1AAQE0000","D1AAAH0000","D1AAKA0000"],
                hideYn		    : false,  // 숨김 여부
                tooltipYn       : false, //툴팁 숨김 여부
            }
        },
        mixins: [
            commonMixin
        ],
        computed : {
            getDataCss(){
                return this.totPayAccn > 0 ? "com_bg_type00" : "com_bg_type02"
            },
            getIsDataYn() {
                return this.totPayAccn > 0 ? true : false
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
                this.hideYn = this.getSecretAmInfo().includes('PNT')
                this.getData();
            },
            
            getData() {
                ///////////////////////////////////
                // 페이머니목록 조회 
                const config = {
                    url: '/as/pt/01r01',
					data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno')
                    }
                }
                apiService.call(config).then(response =>{
                    this.respInfo = response

                    this.totPayAccn    = this.respInfo.totPayAccn   //총선불계좌수(계좌+카드+금융포인트)
                    this.totPayAcAm    = this.respInfo.totPayAcAm   //총선불계좌합계(계좌+카드+금융포인트)

                    this.payMnyAccn    = this.respInfo.payMnyAccn     //계좌수
                    this.payMnyAcBaltt = this.respInfo.payMnyAcBaltt  //계좌잔액합계
                    this.payMnyAcList  = this.respInfo.payMnyAcList || []   //계좌목록

                    this.ppaycdcn      = this.respInfo.ppaycdcn     //카드수
                    this.ppaycdBaltt   = this.respInfo.ppaycdBaltt  //카드잔액합계
                    this.ppaycdList    = this.respInfo.ppaycdList || []   //카드목록

                    let i = 0//페이 정렬순서
                    this.payMnyAcList.forEach((item,index) => {
                        this.payMnyAcList[index].scrnPrtoSq = i //화면출력순서
                        this.payMnyAcList[index].pntAmt = item.eltfncTotBac //포인트금액
                        this.payMnyAcList[index].type = 'PAY'//타입 
                        i++
                    })

                    this.ppaycdList.forEach((item,index) => {
                        this.ppaycdList[index].scrnPrtoSq = i //화면출력순서
                        this.ppaycdList[index].pntAmt = item.ppaycdTotBac //포인트금액
                        this.ppaycdList[index].type = 'CARD'//타입 
                        i++
                    })
                    //총 페이
                    this.payTotalList = [...this.payMnyAcList || [], ...this.ppaycdList || []]
                    this.payTotalListOrg = [...this.payTotalList || []]

                    this.cardPntcn     = this.respInfo.cardPntcn          // 금융포인트 수
                    this.cardPntBaltt  = this.respInfo.cardPntBaltt       // 금융포인트 합계
                    this.cardPntList   = this.respInfo.cardPntList || [], // 금융포인트 목록

                    this.cardPntList.forEach((item,index) => {
                        this.cardPntList[index].scrnPrtoSq = index //화면출력순서
                    })
                    //총 금융포인트
                    this.cardPntListOrg = [...this.cardPntList || []]

                    this.paySumCn = this.respInfo.payMnyAccn + this.respInfo.ppaycdcn
                    this.paySumAcAm = this.respInfo.payMnyAcBaltt + this.respInfo.ppaycdBaltt

                    this.$nextTick(() => {
                        this.callJQueryFncExcute()
                    })
                })
            },
            /*
            * 상세화면이동.
            */
            fn_openDetailPop(target, item) {
                let config = {}

                if(target === "PAY") {
                    //페이머니
                    let popupParam = {
                          "mydtCusno"    : this.getUserInfo('mydtCusno') //마이데이터고객번호
                        , "infOfrmnOrgC" : item.infOfrmnOrgC    //기관코드
                        , "faceNo"       : item.faceNo      //권면번호
                        , "accIdVal"     : item.accIdVal    //계정식별값
                    }

                    config = {
                        component: ASAC1106,
                        params : {"objAccInfo" : popupParam}
                    }
                } else {
                    //선불카드
                    let popupParam = {
                          "mydtCusno"    : this.getUserInfo('mydtCusno') //마이데이터고객번호
                        , "infOfrmnOrgC" : item.infOfrmnOrgC    //기관코드
                        , "mydtCdIdVal"  : item.mydtCdIdVal     //카드식별자
                    }

                    config = {
                        component: ASPT2002,
                        params : {"objAccInfo" : popupParam}
                    }
                }

                modalService.openPopup(config).then(() => {
                    this.getData();
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
                    this.getData();
                })
            },          
            /*
                페이 정렬 팝업 호출
            */
            fn_paySortPop(){
                const config = {
                    params : {
                        sortVal   : this.paySortVal
                    },
                    renderer : {
                        component : ASPT4003
                    }
                }
                modalService.openSlidePagePopup(config).then(response => {
                    this.paySortVal = response.sortVal;
                    if(this.paySortVal === "1"){
                        this.payTotalList = [...this.payTotalListOrg] || [] 
                        this.paySortNm = "기본"
                    }else{
                        this.payTotalList = this.payTotalList.sort((a,b) => b.pntAmt - a.pntAmt || a.scrnPrtoSq - b.scrnPrtoSq)
                        this.paySortNm = "금액순"
                    }
                })
            },          
            /*
                금융포인트 정렬 팝업 호출
            */
            fn_cardPntSortPop(){
                const config = {
                    params : {
                        sortVal   : this.cardPntSortVal
                    },
                    renderer : {
                        component : ASPT4003
                    }
                }
                modalService.openSlidePagePopup(config).then(response => {
                    this.cardPntSortVal = response.sortVal;
                    if(this.cardPntSortVal === "1"){
                        this.cardPntList = [...this.cardPntListOrg] || [] 
                        this.cardPntlSortNm = "기본"
                    }else{
                        this.cardPntList = this.cardPntList.sort((a,b) => b.rmPnt - a.rmPnt || a.scrnPrtoSq - b.scrnPrtoSq)
                        this.cardPntlSortNm = "금액순"
                    }
                })
            },
            /*
                입금신청 콕제휴>포인트입금신청 TODO 경로 확인
             */
            fn_rrqr(){
                alert("이동 url 확정 시 추가 작업 예정")
            },
            orgcSome(infOfrmnOrgC){
                let btnType = true
                btnType = this.orgc.some((item) => item === infOfrmnOrgC)
                if(this.getUserInfo('chnl') === "385"){
                    btnType = false
                }else{
                    this.tooltipYn = true
                }
                return btnType
            },
            /*
                숨김여부
            */
            fn_setHidden(flag, type) {
                this.hideYn = type
				this.setSecretAmInfo(flag, type)
			},
        },
        components : {
            Page,
            FootersV2,
            AsSubCategoryV4,
            CmmFinancialBanner  //상품추천배너 2021.11.12
        }
    }
</script>