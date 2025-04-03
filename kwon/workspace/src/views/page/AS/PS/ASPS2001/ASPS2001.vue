<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산현황 > 연금
* @ 페이지설명 : 나의자산 > 자산현황> 연금
* @ 파일명     : src/views/page/AS/PS/ASPS2001/ASPS2001.vue
* @ 작성자     : CS533041
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10                              최초작성
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
        <as-sub-category-v2 type="PS"></as-sub-category-v2>
        <!-- E :: 자산 SUB카테고리 -->
        <!--
        <div id="content" class="renewal" v-if="pnsTotAcEvlam > 0">	
        -->
        <div id="content" v-if="pnsTotAcEvlam > 0">				
            <div class="com_inner" >
				<div class="new_sub_info">
					<div class="title">
						<div class="text">
							노후 준비를 위한 돈<br>
							<span class="fs-27">총 </span><strong><span class="num counter" data-count= "pnsTotAcEvlam"> {{pnsTotAcEvlam | numberFilter}}</span>원</strong>
						</div>
					</div>
				</div>

                <!-- S :: 추천배너  -->
                <!-- <cmm-financial-banner asdbDsc="14"/> -->
                <!-- E :: 추천배너  -->
			</div> 
				
			<hr class="hr02">

			<div class="com_inner" v-if="pnsTotAcEvlam > 0">
                <!-- 국민연금 -->
				<div class="com_box_type01 toggle_list_box2 custom_list" v-if="this.ntpsTotPayAm > 0">
					<div data-ui-toggle="box" class="toggle_box_area open">
						<button type="button" class="view_btn" aria-expanded="true">
							<div class="new_tit_area">
								<div class="tit"><span>국민연금</span></div>
								<span class="total_price">
									<em class="num">{{ntpsTotPayAm | numberFilter}}</em><em class="unit">원</em>
								</span>
							</div>
							<em class="open">열기</em>
							<em class="close">닫기</em>
						</button>
					</div>
					<ul class="view_cont list_toggle"> 
						<li>
							<dl class="pensoin_period"><!-- 0914 pensoin_period 클래스 추가 -->
								<dt>가입기간</dt>
                                <dd>{{ntpsTotEntPrd | numberFilter}}개월</dd>
							</dl>
                            <a href="#nolink" class="link_arrow txt_r"  @click.prevent="movePage('PDSC2001')" >연금가입내역</a>
						</li>
					</ul>
				</div>
                <!-- //국민연금 -->

				<!-- 퇴직연금 -->
				<div class="com_box_type01 toggle_list_box2 custom_list" v-if="rtrpnsCn > 0">
					<div data-ui-toggle="box" class="toggle_box_area open">
						<button type="button" class="view_btn" aria-expanded="false">
							<div class="new_tit_area">
								<div class="tit"><span>퇴직연금 </span><span class="com_icon_num custom">{{rtrpnsCn | numberFilter}}</span></div>
								<span class="total_price">
									<em class="num">{{rtrpnsTotAcEvlam | numberFilter}}</em><em class="unit">원</em>
								</span>
							</div>
							<em class="open">열기</em> 
							<em class="close">닫기</em>
						</button>
					</div>
					<ul class="view_cont list_type_01">
						<li v-for="(item, idx) in dcList" :key="`0_${idx}`">
							<a href="javascript:void(0);" role="button" v-on:click.prevent="fn_openDetailPop('DC', item)">
								<dl>
									<dt>
										<div>
											<i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
											<em class="prod_name">{{item.dcRtrpnsWrsnm}}</em>
										</div>
									</dt>
									<dd>
										<span class="prod_num">{{item.wrsAmnno}}</span>
									</dd>
									<dd>
										<span class="com_price">
											<em class="num">{{item.acEvlam| numberFilter}}</em><em class="unit">원</em>
										</span>
									</dd>
								</dl>
							</a>
						</li>
                        <li v-for="(item, idx) in irpList" :key="`1_${idx}`">
                            <a href="javascript:void(0);" role="button" v-on:click.prevent="fn_openDetailPop('IRP', item)">
                                <dl>
                                    <dt>
                                        <div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                            <em class="prod_name">{{item.acWrsnm}}</em>
                                        </div>
                                    </dt>
                                    <dd>
										<span class="prod_num">{{item.mydtAcno}}</span>
									</dd>
                                       <dd>
                                        <span class="com_price">
                                            <em class="num">{{item.acEvlam | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
					</ul>
				</div>
                <!-- //퇴직연금 -->
                
                <!-- 개인연금 -->
				<div class="com_box_type01 toggle_list_box2 custom_list" v-if="pPnsCn > 0">
					<div data-ui-toggle="box" class="toggle_box_area open">
						<button type="button" class="view_btn" aria-expanded="false">
							<div class="new_tit_area">
								<div class="tit"><span>개인연금 </span><span class="com_icon_num custom">{{pPnsCn | numberFilter}}</span></div>
								<span class="total_price">
									<em class="num">{{pPnsTotAcEvlam | numberFilter}}</em><em class="unit">원</em>
								</span>
							</div>
							<em class="open">열기</em>
							<em class="close">닫기</em>
						</button>
					</div>
					<ul class="view_cont list_type_01">
                        <li v-for="(item, idx) in pnsvInsuList" :key="`0_${idx}`">
							<a href="javascript:void(0);" class="has_badge" role="button" v-on:click.prevent="fn_openDetailPop('PSIS', item)"> 
								<dl>
									<dt>
										<div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i> 
                                            <em class="prod_name">{{item.isrcoWrsnm}}</em>
                                           
										</div>
									</dt>
                                    <dd>
										<span class="prod_num">{{item.isrSctsNo}}</span>
									</dd>
									<dd>
										<span class="com_price">
											<em class="num">{{item.isrTotPymAmt | numberFilter}}</em><em class="unit">원</em>
										</span>
									</dd> 
								</dl>
                                 <span><em class="mint_badge">{{item.isrCtrStsnm}}</em> </span>
							</a>
						</li>
                        <li v-for="(item, idx) in pnsvFundList" :key="`1_${idx}`">
							<a href="javascript:void(0);" role="button" v-on:click.prevent="fn_openDetailPop('PSIV', item)">
								<dl>
									<dt>
										<div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i> 
                                            <em class="prod_name">{{item.acWrsnm}}</em>
										</div>
									</dt>
                                    <dd>
										<span class="prod_num">{{item.mydtAcno}}</span>
									</dd>
									<dd>
										<span class="com_price">
											<em class="num">{{item.acNowBac | numberFilter}}</em><em class="unit">원</em>
										</span>
										<span class="change_rate up">
											<em>{{item.strmPftrt|numberFilter('0,0.00', {precision: 2}) }}</em>%
										</span>
									</dd> 
								</dl>
							</a>
						</li>
                        <li v-for="(item, idx) in pnsTsList" :key="`2_${idx}`">
							<a href="javascript:void(0);" role="button" v-on:click.prevent="fn_openDetailPop('PSTS', item)">
								<dl>
									<dt>
										<div>
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i> 
                                            <em class="prod_name">{{item.acWrsnm}}</em>
										</div>
									</dt>
									<dd>
										<span class="com_price">
											<em class="num">{{item.acEvlam | numberFilter}}</em><em class="unit">원</em>
										</span>
									</dd> 
								</dl>
							</a>
						</li>
                        <!-- //개인연금 -->
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
        
        <footersV2 type="as"/>
    </page>
</template>

<script>
    import Page from '@/views/layout/Page.vue'
    import FootersV2 from "@/views/layout/FootersV2.vue"
    import commonMixin from '@/common/mixins/commonMixin'
    import modalService from '@/service/modalService'
    import AsCategoryV2 from '@/components/category/AsCategoryV2.vue'
    import AsSubCategoryV2 from '@/components/category/AsSubCategoryV2.vue'
    //import CmmFinancialBanner from '@/components/CmmFinancialBanner.vue'    //상품추천배너 2021.11.12

    import apiService from '@/service/apiService'
    import commonService from '@/service/commonService'
    
    import ASPS2002 from '@/views/page/AS/PS/ASPS2002/ASPS2002'
    import ASPS2004 from '@/views/page/AS/PS/ASPS2004/ASPS2004'
    import ASIS2013 from '@/views/page/AS/IS/ASIS2012/ASIS2012'
    import ASIV2002 from '@/views/page/AS/IV/ASIV2002/ASIV2002'
    import ASIV2005 from '@/views/page/AS/IV/ASIV2005/ASIV2005'
    import COAR2001 from '@/views/page/CO/AR/COAR2001/COAR2001'

	export default {
		name: 'ASPS2001',
		data: () => {
			return {
                respInfo         : {},
                pnsTotAcEvlam    : 0,      // 연금총합산금액
                ntpsTotPayAm     : 0,      // 국민연금총납부금액
                ntpsTotEntPrd    : 0,      // 국민연금총가입기간
                rtrpnsTotAcEvlam : 0,      // 퇴직연금총평가금액 
                rtrpnsCn         : 0,      // 퇴직연금목록건수
                dcList           : [],     // DC퇴직연금목록
                irpList          : [],     // IRP퇴직연금목록
                pPnsTotAcEvlam   : 0,      // 개인연금총평가금액 
                pPnsCn           : 0,      // 개인연금목록건수
                pnsvInsuList     : [],     // 연금저축보험목록
                pnsvFundList     : [],     // 연금저축펀드목록
                pnsTsList        : []      // 연금신탁목록

			}
        },
		mixins: [
			commonMixin
		],        
		computed: {
            getIsDataYn() {
                return this.pnsTotAcEvlam > 0 ? true : false
            }           
        },
		created() {
            console.log('created')
		},
		mounted() {
            console.log('mounted')
            this.initComponent()

            // 자산수집 mutation 이벤트 감지 
            this.getGatheringListenSubscribe()

            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
		},        
		methods: {
            initComponent() {
                console.log('getData')
                this.getData()
            },
            getData() {
                ///////////////////////////////////
                // 계좌목록 조회 
                const config = {
                    url: '/as/ps/01r01',
					data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno')
                    }
                }
                apiService.call(config).then(response =>{

                    this.respInfo = response

                    // 국민연금
                    this.ntpsTotPayAm     = this.respInfo.ntpsTotPayAm     // 국민연금총납부금액
                    this.ntpsTotEntPrd    = this.respInfo.ntpsTotEntPrd    // 국민연금총가입기간

                    // 퇴직연금
                    this.rtrpnsTotAcEvlam = this.respInfo.rtrpnsTotAcEvlam   // 퇴직연금총평가금액
                    this.rtrpnsCn         = this.respInfo.rtrpnsCn           // 퇴직연금목록건수
                    this.dcList           = this.respInfo.dcList || []       // DC퇴직연금 목록
                    this.irpList          = this.respInfo.irpList || []      // IRP퇴직연금 목록

                    // 개인연금
                    this.pPnsTotAcEvlam   = this.respInfo.pPnsTotAcEvlam     // 개인연금총평가금액 
                    this.pPnsCn           = this.respInfo.pPnsCn             // 개인연금목록건수
                    this.pnsvInsuList     = this.respInfo.pnsvInsuList || [] // 연금저축보험 목록
                    this.pnsvFundList     = this.respInfo.pnsvFundList || [] // 연금저축펀드 목록
                    this.pnsTsList        = this.respInfo.pnsTsList    || [] // 연금신탁 목록

                    // 연금 총합계금액 (국민연금 + 퇴직연금 + 개인연금)
                    this.pnsTotAcEvlam    = this.respInfo.pnsTotAcEvlam

                    this.$nextTick(() => {
                        this.callJQueryFncExcute()
                    })
                })
            },
            movePage(pageId) {

				const config = {
					name: pageId
				}
				commonService.movePage(config)
            
            },


            /*
            * 상세화면이동.
            */
            fn_openDetailPop(type, pension) {

                //let compName = ""
                let popupParam = pension
                popupParam.mydtCusno = this.getUserInfo('mydtCusno') //마이데이터고객번호

                
                let config = {}
                if(type == "DC") { 
                    config = {
                        component : ASPS2002, // DC퇴직연금
                        params : {"objAccInfo" : popupParam}                   
                    } 
                } else if(type == "IRP") {
                    config = {
                        component : ASPS2004, // IRP
                        params : {"objAccInfo" : popupParam}                   
                    }
                } else if(type == "PSIS") {
                    config = {
                        component : ASIS2013, // 연금저축보험
                        params : {
                            infOfrmnOrgC: pension.infOfrmnOrgC,
                            isrSctsNo: pension.isrSctsNo,
                            isrKdDsc: pension.isrKdDsc
                        }
                    }
                } else if(type == "PSIV") {
                    config = {
                        component : ASIV2002, // 연금저축펀드
                        params : {"objIvInfo" : popupParam}      
                    }
                } 
                else if(type == 'PSTS') {
                    config = {
                        component : ASIV2005, // 연금신탁
                        params : {"objIvInfo" : popupParam}      
                    }                    
                } 

                // 전달파라미터 세팅           
                console.log('@@@popupParam' , popupParam);
                console.log('@@@params' , config.params);

                modalService.openPopup(config).then(() => {
                    this.getData()
                    console.log('@@@mydtCusno' , popupParam)
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
		},
		components: {
            Page,
            FootersV2,
            AsCategoryV2,
            AsSubCategoryV2,
            //CmmFinancialBanner  //상품추천배너 2021.11.12
		}
    }
    
</script>

