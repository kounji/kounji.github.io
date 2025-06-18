<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부채 > 학자금대출
* @ 페이지설명 : 나의자산 > 부채 > 학자금대출 메인
* @ 파일명     : src/views/page/AS/EL/ASEL4001/ASEL4001.vue
* @ 작성자     : CS541017
* @ 작성일     : 2024-12-30
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-12-30              CS541017                 최초작성
*************************************************************************/
-->
<template>
		<!--
		<page class="content-view hasLNB mydata2023">
		-->
		<page class="content-view hasLNB mydata2023">
		<!-- S :: 자산 카테고리 -->
        <!--
        <as-category-v2 type="LN"></as-category-v2>
        -->		
        <!-- E :: 자산 카테고리 -->

        <!-- S :: 자산 서브 카테고리 -->
        <as-sub-category-v4 type="LN" typeDtl="08"></as-sub-category-v4>
        <!-- E :: 자산 서브 카테고리 -->

        <!-- content S -->
        <!--
        <div id="content" class="renewal"  v-if="loanCnt > 0">
        -->
        <div id="content" class="renewal" v-if="loanCnt > 0">
            <div class="com_inner">
					<div class="new_sub_info">
						<div class="title">
							<div class="text">
								갚을 돈<br>
								
                                <div class="toggle_money" :class="hideYn === true ? 'on' : ''">
                                    <div class="sum">
                                        <span class="hide">잔액숨김</span>
                                        <span class="show">{{loanAmnt | numberFilter}}원</span>
                                    </div>
                                    <button type="button" class="btns" @click="fn_setHidden('EDUFD', !hideYn)">
                                        <span class="blind">금액</span>
                                        <span class="hide">보기</span>
                                        <span class="show">숨김</span>
                                    </button>
                                </div>

                                <!-- <div class="toggle_money">
                                    <input type="checkbox" title="금액노출" name="" id="sum_view_01" v-model="hideYn" @change="fn_setHidden('EDUFD', hideYn)">
                                    <label for="sum_view_01" class="btns">
                                        <span class="hide" aria-hidden="true">보기</span>
                                        <span class="show" aria-hidden="true">숨김</span>
                                    </label>
                                    <div class="sum">
                                        <span class="hide">잔액숨김</span>
                                        <span class="show">총 <em>{{loanAmnt | numberFilter}}</em>원</span>
                                    </div>
                                </div> -->
							</div>
						</div>
					</div>
					<!-- <cmm-financial-banner asdbDsc="08"/> -->
				</div>
				<hr class="hr02">
				<div class="com_inner">
                    <!-- 학자금 대출 -->
                    <div class="com_box_type01 toggle_list_box2 custom_list">
						<div data-ui-toggle="box" class="toggle_box_area open">
							<button type="button" class="view_btn" aria-expanded="true">
								<div class="new_tit_area">
									<div class="tit"><span>학자금 대출</span> <span class="com_icon_num custom">{{loanCnt}}<i class="blind">건</i></span></div>
									<span class="total_price">
										<em class="num"><span class="blind">금액</span>{{loanAmnt | numberFilter}}</em><em class="unit">원</em>
									</span>
								</div>
								<em class="open">열기</em>
								<em class="close">닫기</em>
							</button>
							<a href="javascript:void(0);" class="btn_sort" role="button" @click="fn_sortPop()"><span>{{sortNm}}</span></a>
						</div>
						<ul class="view_cont list_type_01">
							<template v-for="(totalOut, index) in totalOut">
                                <li v-if="totalOut.loanType == 'CREDIT_BANK' || totalOut.loanType == 'CREDIT_INSU'" :key="index">
									<a href="javascript:void(0);" @click="openCreditDetailPop(totalOut)">
										<dl>
											<dt>
												<div>
													<i :class="totalOut.infOfrmnOrgC"><span class="blind">{{totalOut.infOfrmnOrgCNm}}</span></i>
													<em class="prod_name">{{totalOut.wrsnm}}</em>
												</div>
											</dt>
                                            <dd>
                                                <span class="prod_num"><span class="blind">계좌번호</span>{{totalOut.mydtAcno}}</span>
                                            </dd>
											<dd>
												<span class="com_price">
													<em class="num"><span class="blind">금액</span>{{totalOut.bac | numberFilter}}</em>
													<em class="unit">원</em>
												</span>
											</dd>
										</dl>
									</a>
								</li>
								<li v-if="totalOut.loanType == 'MORT_INSU'" :key="'MORT_INSU'+index">                 
                                    <a href="javascript:void(0);" @click="openMortInsuDetailPop(totalOut)">
                                        <dl>
                                            <dt>
                                                <div>
                                                    <i :class="totalOut.infOfrmnOrgC"><span class="blind">{{totalOut.infOfrmnOrgCNm}}</span></i>
                                                    <em class="prod_name">{{totalOut.wrsnm}}</em>
                                                </div>
                                            </dt>
                                            <dd>
                                                <span class="prod_num"><span class="blind">계좌번호</span>{{totalOut.mydtAcno}}</span>
                                            </dd>
                                            <dd>
                                                <span class="com_price">
                                                    <em class="num"><span class="blind">금액</span>{{totalOut.bac | numberFilter}}</em>
                                                    <em class="unit">원</em>
                                                </span>
                                            </dd>
                                        </dl>
                                    </a>
                                </li> 
                                <li v-if="totalOut.loanType == 'MORT_BANK'" :key="'MORT_BANK'+index">                 
                                    <a href="javascript:void(0);" @click="openMortagageDetailPop(totalOut)">
                                        <dl>
                                            <dt>
                                                <div>
                                                    <i :class="totalOut.infOfrmnOrgC"><span class="blind">{{totalOut.infOfrmnOrgCNm}}</span></i>
                                                    <em class="prod_name">{{totalOut.wrsnm}}</em>
                                                </div>
                                            </dt>
                                            <dd>
                                                <span class="prod_num"><span class="blind">계좌번호</span>{{totalOut.mydtAcno}}</span>
                                            </dd>
                                            <dd>
                                                <span class="com_price">
                                                    <em class="num"><span class="blind">금액</span>{{totalOut.bac | numberFilter}}</em>
                                                    <em class="unit">원</em>
                                                </span>
                                            </dd>
                                        </dl>
                                    </a>
                                </li> 
							</template>
						</ul>
					</div>
					<!-- //학자금 대출 -->
				</div>
		    <div class="new_add_register"><a href="javascript:void(0);" role="button" v-on:click.prevent="movePage()"><span>더 연결할 자산이 있으신가요?</span></a></div>
        </div>
        <!--// content E -->
        <div id="content" class="renewal insur" v-else>
            <div class="com_inner">
                <div class="no_data_box no_data_box01 grayExclamationType">
                    <div class="no_data_list">
                        <p class="txt_sub">조회된 정보가 없습니다.</p>
                    </div>
                </div>
            </div>
            
            <div class="new_add_register"><a href="javascript:void(0);" role="button" v-on:click.prevent="movePage()"><span>더 연결할 자산이 있으신가요?</span></a></div>
        </div>
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
import ASLN2002 from '@/views/page/AS/LN/ASLN2002/ASLN2002'
import ASLN2003 from '@/views/page/AS/LN/ASLN2003/ASLN2003'
import ASLN2005 from '@/views/page/AS/LN/ASLN2005/ASLN2005'
import ASEL4003 from '@/views/page/AS/EL/ASEL4003/ASEL4003'
import COAR4001 from '@/views/page/CO/AR/COAR4001/COAR4001'
import {dateFormat} from '@/utils/date'

export default {
    name : 'ASEL4001',
    data: () => {
        return {
            mydtCusno           : "",           // 마이데이터고객번호
            loanCnt             : 0,            // 대출총계(갯수)
            loanAmnt            : 0,            // 대출합계금액
            creditCnt           : 0,            // 신용대출총계
            creditAmnt          : 0,            // 신용대출합계금액
            mortagageOutCnt     : 0,            // 담보대출총계
            mortagageOutAmnt    : 0,            // 담보대출합계금액
            creditOut           : [],           // 신용대출정보
            mortagageOut        : [],           // 담보대출정보
            totalOut            : [],           // 총대출정보
            totalOutOrg         : [],           // 총대출정보org
            sortNm              : "기본",           //정렬이름
            sortVal             : "1",           //정렬기준
            hideYn		: false,  // 숨김 여부
            // 모든 대출목록의 정렬기준은 대출실행일자, 회차 내림차순
        }
    },
    computed : {

    },
	created() {
        this.initComponent()
    },
    mounted() {
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
            this.hideYn = this.getSecretAmInfo().includes('EDUFD')
            this.mydtCusno = this.getUserInfo("mydtCusno")
            this.getData();
        },
        getData() {
          // 실제 구현
            const config = {
                url: '/as/el/01r01',
                data: {
                        mydtCusno: this.mydtCusno
                }
            };
            apiService.call(config).then(response => {
                console.log("========/as/el/01r01=======",response)
                this.loanCnt            = response.loanCnt || 0
                this.loanAmnt           = response.loanAmnt || 0
                this.creditCnt          = response.creditCnt || 0
                this.creditAmnt         = response.creditAmnt || 0
                this.mortagageOutCnt    = response.mortagageOutCnt || 0
                this.mortagageOutAmnt   = response.mortagageOutAmnt || 0
                this.creditOut          = response.creditOut || []
                this.mortagageOut       = response.mortagageOut || []
                this.totalOut           = [...this.creditOut || [], ...this.mortagageOut || []]
                this.totalOutOrg        = [...this.creditOut || [], ...this.mortagageOut || []]
            });
        },
        // 신용대출 상세조회 팝업 오픈
        openCreditDetailPop(obj) {
            const config = {
                component: ASLN2005,
                params : {
                    mydtCusno       : this.mydtCusno,
                    infOfrmnOrgC    : obj.infOfrmnOrgC,
                    mydtAcno        : obj.mydtAcno,
                    mydtScNo        : obj.mydtScNo,
                    isrSctsNo       : obj.isrSctsNo,
                    loanType        : obj.loanType,
                }
            }
            modalService.openPopup(config)
        },
        // 담보대출(보험) 상세조회 팝업 오픈
        openMortInsuDetailPop(obj) {
            const config = {
                component: ASLN2003,
                params : {
                    mydtCusno       : this.mydtCusno,
                    infOfrmnOrgC    : obj.infOfrmnOrgC,
                    mydtAcno        : obj.mydtAcno,
                    mydtScNo        : obj.mydtScNo,
                    isrSctsNo       : obj.isrSctsNo,
                    loanType        : obj.loanType,
                }
            }
            modalService.openPopup(config)
        },
        // 담보대출 상세조회 팝업 오픈
        openMortagageDetailPop(obj) {
            const config = {
                component: ASLN2002,
                params : {
                    mydtCusno       : this.mydtCusno,
                    infOfrmnOrgC    : obj.infOfrmnOrgC,
                    mydtAcno        : obj.mydtAcno,
                    mydtScNo        : obj.mydtScNo,
                    isrSctsNo       : obj.isrSctsNo,
                    loanType        : obj.loanType,
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
            정렬 팝업 호출
        */
        fn_sortPop(){
            const config = {
                params : {
                    sortVal   : this.sortVal
                },
                renderer : {
					component : ASEL4003
				}
            }
            modalService.openSlidePagePopup(config).then(response => {
                this.sortVal = response.sortVal;
                if(this.sortVal === "1"){
                    this.totalOut = [...this.totalOutOrg] || [] 
                    this.sortNm = "기본"
                }else{
                    this.totalOut.sort((a,b) => b.bac - a.bac || a.scrnPrtoSq - b.scrnPrtoSq)
                    this.sortNm = "금액순"
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