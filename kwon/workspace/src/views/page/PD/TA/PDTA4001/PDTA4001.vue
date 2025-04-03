<!--
/*************************************************************************
* @ 서비스경로 : 연금절세
* @ 페이지설명 : 연금절세 > 서브메인
* @ 파일명     : src\views\page\PD\TA\PDTA4001\PDTA4001.vue
* @ 작성자     : CS541015
* @ 작성일     : 2025-02-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-10              CS541015              최초작성
*************************************************************************/
-->
<template>
   <page class="content-view">
        <div id="content">
            <section class="pension_main">
                <!--배너-->
                <cmm-flot-banner bnnrExpsDsVal="44"/>

                <!--update-->
                <div class="update">
                    <template v-if="!isMyAssetGathering">
                        <span>{{ assetUpdateDtm }}</span> <!-- V4.0 -->
                        <button type="button" class="btn_update" @click.prevent="fn_refreshApiCall()"><span class="blind">업데이트</span></button>
                    </template>
                    <template v-else>
                        <span>자산 업데이트 중</span>
                        <button type="button" class="btn_update"><span class="blind">업데이트</span></button>
                    </template>
                </div>

                <!--개요-->
                <!--연결된 연금이 있는 경우-->
                
                <div class="outline" :class="pnsBacSum > pnsBf1BacSum ? 'up' : pnsBacSum < pnsBf1BacSum ? 'down' : ''"><!--//25-02-10 상태값 추가 : 늘은경우 up class, 줄은 경우 down class-->
                    <!--25-02-10 링크추가-->
                    <h2><a href="javascript:void(0);" @click.prevent="fn_movePage('PDRT4001')">노후준비를 위해 모은 돈</a></h2>
                    <!--//25-02-10 링크추가-->

                    <!-- 연결된 연금 있을때 -->
                    <template v-if="this.ntpsAssetYn == 'Y' || ppnsLength > 0 || sDcList.length > 0">
                        <!--25-02-10 금액숨김 수정-->
                        <div class="toggle_money">
                            <input type="checkbox" title="금액숨김" name="" id="sum_view_01" v-model="amHideYn" @change="fn_amHidden()">
                            <label for="sum_view_01" class="btns">
                                <span class="hide" aria-hidden="true">보기</span>
                                <span class="show" aria-hidden="true">숨김</span>
                            </label>
                            <div class="sum">
                                <span class="hide">쉿! 비밀이에요.</span>
                                <span class="show">{{allPnsTts | numberFilter}}원</span>
                            </div>
                        </div>
                        <!--//25-02-10 금액숨김 수정-->
                        <!--25-02-10 텍스트 수정-->

                        <div class="txt">
                            <!--늘은경우-->
                            <span class="text" v-if="pnsBacSum > pnsBf1BacSum">지난달보다 <span class="num">{{pnsDeltaBacSum | numberFilter}}원</span> <em>늘었어요.</em></span>    
                            
                            <!--줄은경우-->
                            <span class="text" v-else-if="pnsBacSum < pnsBf1BacSum">지난달보다 <span class="num">{{pnsDeltaBacSum | numberFilter}}원</span> <em>줄었어요.</em></span>    

                            <span class="text" v-else>지난달과 동일해요.</span>      
                            <div class="custom_tooltip">
                                <div class="com_tooltip_type02 com_tooltip_type03">
                                    <a href="#nolink" class="com_btn_info" role="button">
                                        <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                    </a>
                                    <div class="com_ballon_type01 com_ballon_type02" style="display: none;">
                                        <div>
                                            <ul class="dotted_list">
                                                <li>마지막 업데이트 시점의 총 연금과 마지막 업데이트 전 월 말일 총연금을 비교했습니다.</li>
                                                <li>오늘 업데이트 하셨으면 전 월 말일 총 연금과 비교한 결과입니다.</li>
                                            </ul>
                                            <a href="#nolink" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--//25-02-10 텍스트 수정-->
                    </template>

                    <!-- 연결된 연금 없을때 -->
                    <template v-else>
                        <p class="em">연결된 연금이 없어요. <button type="button" class="btns" @click.prevent="fn_COAR4002()">연결</button></p>
                        <p class="txt">연금 자산 연결하면 확인할 수 있어요.</p>
                    </template>

                </div>
                <!--//연결된 연금이 있는 경우-->

                <!--분류별 개요-->
                <div class="board_box pension_outline">
                    <template v-if="this.ntpsAssetYn == 'Y' || ppnsLength > 0 || sDcList.length > 0">
                        <div class="chart">
                            <div class="word_bubble" v-show="pnsDsc=='ntps'" >
                                <p>국민연금 <em>{{ntpsPct}}%</em></p><!--//25-02-10 텍스트 수정-->
                            </div>
                            <div class="word_bubble" v-show="pnsDsc=='ppns'" >
                                <p>개인연금 <em>{{ppnsPct}}%</em></p><!--//25-02-10 텍스트 수정-->
                            </div>
                            <div class="word_bubble" v-show="pnsDsc=='rtpn'" >
                                <p>퇴직연금 <em>{{rtrpnsPct}}%</em></p><!--//25-02-10 텍스트 수정-->
                            </div>

                            <!--25-02-14 로티수정-->
                            <!--국민연금 / 개인연금 경우-->
                            <lottie-animation v-show="pnsDsc!='rtpn'" :animationData="require('@/assets_v40/images/lottie/icon_pension.json')" 
                                            ref="anim"
                                            :loop="true"
                                            :auto-play="true" 
                                            :speed="1"
                                            aria-hidden="true" 
                                            class="icon_pension" 
                            ></lottie-animation>
                            

                            <!-- 퇴직연금의 경우 -->
                            <lottie-animation v-show="pnsDsc=='rtpn'" :animationData="require('@/assets_v40/images/lottie/icon_pension_3.json')" 
                                            ref="anim"
                                            :loop="true"
                                            :auto-play="true" 
                                            :speed="1"
                                            aria-hidden="true" 
                                            class="icon_pension" 
                            ></lottie-animation>
                            <!--//25-02-14 로티수정-->

                            <!--
                            <canvas id="cate_outline_chart"></canvas>
                            -->
                            
                            <!-- CANVAS 공통콤퍼넌트로 변경 -->
                            <cmm-canvas canvaMode="pdta4001" :cycledata=cycleData :cycleIdx=cycleIdx :pos="[150, 140, 132, false, Math.PI, 0, 15, '#f7f8fa', 1]" ></cmm-canvas>
                        </div>
                    
                        <ul role="tablist" class="inner_tab">
                            <li class="on"><button type="button" role="tab" aria-selected="true" @click.prevent="tabList('ntps')">국민연금</button></li><!--//25-02-10 텍스트 수정-->
                            <li><button type="button" role="tab" aria-selected="false" @click.prevent="tabList('ppns')">개인연금</button></li>
                            <li><button type="button" role="tab" aria-selected="false" @click.prevent="tabList('rtpn')">퇴직연금</button></li>
                        </ul>
                        <!-- 연결된연금이하나라도있을때  -->
                        <!--국민연금-->
                        <div class="details" v-if="pnsDsc=='ntps'">
                            <ul v-if="ntpsAssetYn == 'Y'">
                                <li>국민연금<span class="total"><em>{{sNtpsTotAm | numberFilter}}</em>원</span></li><!--//25-02-10 텍스트 수정-->
                                <li>
                                    <a href="javascript:void(0);" @click.prevent="fn_PDSC4001()">
                                        <i class="ico_bank PBAAVM0000"></i>
                                        <span class="org">국민연금공단</span>
                                        <span class="total"><em>총 가입기간 {{sNtpsTotPrdCn}}개월</em></span>
                                    </a>
                                </li>
                            </ul>
                            <p v-else>국민연금 <em>얼만만큼 납입했을까?</em></p>
                        </div>

                        <!--개인연금-->
                        <div class="details" v-if="pnsDsc=='ppns'">
                            <ul v-if="ppnsLength > 0">
                                <li>개인연금<em>{{ppnsLength}}</em><span class="total"><em>{{sPpnsTts | numberFilter}}</em>원</span></li>
                                <li v-for="(item, idx) in pnsvInsuList" :key="`0_${idx}`">
                                    <a href="javascript:void(0);" role="button" @click.prevent="fn_openDetailPop('PSIS', item)">
                                        <i :class="'ico_bank '+item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                        <span class="org">{{item.isrcoWrsnm}}</span>
                                        <span class="total"><em>{{item.isrTotPymAmt | numberFilter}}</em>원</span>
                                    </a>
                                </li>
                                <li v-for="(item, idx) in pnsvFundList" :key="idx">
                                    <a href="javascript:void(0);" role="button" @click.prevent="item.bsnDsc !== 'TS' ? fn_openDetailPop('PSIV', item) : fn_openDetailPop('PSTS', item)">
                                        <i :class="'ico_bank '+item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                        <span class="org">{{item.acWrsnm}}</span>
                                        <span class="total"><em>{{item.acNowBac | numberFilter}}</em>원</span>
                                    </a>
                                </li>
                            </ul>
                            <p v-else>개인연금 <em>세액공제 예상하기</em></p>
                        </div>

                        <!--퇴직연금-->
                        <div class="details" v-if="pnsDsc=='rtpn'">
                            <ul v-if="sDcList.length > 0">
                                <li>퇴직연금<em>{{sDcList.length}}</em><span class="total"><em>{{sRtrpnsTotAcEvlam| numberFilter}}</em>원</span></li>
                                <li v-for="(item, idx) in sDcList" :key="idx">
                                    <a href="javascript:void(0);" @click.prevent="item.wrsAmnno !== undefined ? fn_openDetailPop('DC',item) : fn_openDetailPop('IRP',item)">
                                        <i :class="'ico_bank '+item.infOfrmnOrgC"></i>
                                        <span class="org">{{item.dcRtrpnsWrsnm}}</span>
                                        <span class="total"><em>{{item.acEvlam| numberFilter}}</em>원</span>
                                    </a>
                                </li>
                            </ul>
                            <p v-else>퇴직연금 <em>내가 받을 연금액</em></p>
                        </div>
                    </template>

                    <!-- 연결된연금아예없을때 -->
                    <template v-else>
                        <lottie-animation :animationData="require('@/assets_v40/images/lottie/icon_pension_unconneted.json')" 
                                        ref="anim"
                                        :loop="true"
                                        :auto-play="true" 
                                        :speed="1"
                                        aria-hidden="true" 
                                        class="icon_pension" >
                        </lottie-animation>
                        <ul role="tablist" class="inner_tab">
                            <li><button type="button" role="tab" aria-selected="false" disabled>국민연금</button></li><!--//25-02-10 텍스트 수정-->
                            <li><button type="button" role="tab" aria-selected="false" disabled>개인연금</button></li>
                            <li><button type="button" role="tab" aria-selected="false" disabled>퇴직연금</button></li>
                        </ul>
                        <p class="guide">
                            안락한 노후를 위한 첫걸음,<br>NH콕마이데이터(자산관리)에서 준비해요.
                        </p>
                    </template>

                    <div class="bottom">
                        <button type="button" class="btn_connect" @click.prevent="fn_COAR4002()">연금자산 연결하기</button>
                    </div>
                </div>

                <!--금융지식-->
                <!--25-02-10 세대별 추가 -->
                <div class="finlit" v-if="financeKlList.length > 0">
                    <h2 class="h_tit01">세대별 절세 노하우</h2>
                    <a href="javascript:void(0);" class="btn_lots" @click.prevent="fn_movePage('COCT4001')" ><span class="blind">더보기</span></a>

                    <div class="scroller">
                        <ul>
                            <li v-for="(item, idx) in financeKlList" :key="idx">
                                <a href="javascript:void(0);" @click.prevent="fnOpenContents(item.cntzId)">
                                    <img :src="item.thmnlImgUrlnm" alt="" @error="emptyImg"/>
                                    <span class="gen">{{item.asetAgLrgDsnm}}</span>
                                    <strong>{{item.cntzTinm}}</strong>
                                    <span class="hash">#{{item.rcmKwrdCntn}}</span>
                                </a>
                            </li>
                        </ul>
                        <!--//25-02-10 세대별 추가 -->
                    </div>
                </div>

                <!--여러가지-->
                <!--25-02-10 텍스트 수정-->
                <div class="move_banner">
                    <a href="#nolink" class="board_box rect old" @click.prevent="fn_movePage('PDRT4001')">
                        <em>나의 노후준비</em>
                        안정적인 은퇴를 준비하세요.
                    </a>

                    <a href="#nolink" class="board_box rect tax" @click.prevent="fn_movePage('PDTX4004')">
                        <em>세금납부 확인</em>
                        내가 낸 세금, 쉽게 확인하세요.
                    </a>

                    <a href="#nolink" class="board_box rect insure" @click.prevent="fn_movePage('PDSC4004')">
                        <em>건강보험 가입내역</em>
                        내 건강보험 가입내역을 확인하세요.
                    </a>
                </div>
                <!--//25-02-10 텍스트 수정-->

                <!--상품추천-->
                <!--[v4.0] 25-01-23 추천 상품 컨텐츠 수정-->
                <div class="goods_for_you">
                    <h2 class="h_tit01">안락한 노후를 위한 추천상품</h2>

                    <!-- 약관 동의 내역이 없는 경우 노출 -->
                    <div class="board_box empty" v-if="isShowStltAgrYn == false">
                        <p>{{userName}}님!<br>꼭 맞는 상품<br>추천해 드려요.</p>
                        <button type="button" class="link" @click.prevent="openWrsStltPop()">상품추천 조회 동의</button>
                    </div>

                    <!--25-02-10 금리삭제 / 상품명 수정-->
                    <div class="slick_banner" v-if="isShowStltAgrYn == true && wrsRcmList.length > 0">
                        <div class="inner">
                            <a href="javascript:void(0);" v-for="(item, idx) in wrsRcmList" :key="idx" @click.prevent="openWrsDtlInfo(item.wrsDtlUrlnm)">
                                <dl class="deposit" :class="item.wrsGrTpc == 'DFFM' ? 'green' : item.wrsGrTpc == 'RVGTP' ? 'blue' : 'orange'"> <!-- green blue orange -->
                                    <dt>
                                        <strong>{{item.acWrsnm}}</strong>
                                    </dt>
                                    <dd class="txt">{{item.rcmWrsBrfCntn}}</dd>
                                    <dd class="tag" v-if="!!item.rcmKwrdCntn">
                                        <span v-for="(subItem, subIdx) in item.rcmKwrdCntn.split('^')" :key="subIdx">
                                            {{subItem}}&nbsp;
                                        </span>
                                    </dd>
                                </dl>
                            </a>
                        </div>

                        <div class="controls">
                            <p class="paging"></p>
                            <button type="button" class="prev"><span class="blind">이전</span></button>
                            <button type="button" class="next"><span class="blind">다음</span></button>
                        </div>
                    </div>
                    <!--//25-02-10 금리삭제 / 상품명 수정-->
                </div>
                <!--//[v4.0] 25-01-23 추천 상품 컨텐츠 수정-->


                
                <div class="board_box_wrap banner">
                    <a href="javascript:void(0);" class="board_box calc1" @click.prevent="fn_movePage('PDPD4051')">
                        <em>대출이자 계산기</em>
                        쉽고 빠른<br>대출금 계산하기
                    </a>
                    <a href="javascript:void(0);" class="board_box calc2" @click.prevent="fn_movePage('PDPD4061')">
                        <em>대출한도 계산기</em>
                        DSR계산하고 대출<br>가능금액 확인하기
                    </a>
                </div>

                <cmm-flot-icon/>
            </section>

        </div>


	<footersV2 type="pd" />
   </page>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import commonMixin from '@/common/mixins/commonMixin'
import _ from 'lodash'

import apiService from '@/service/apiService'
import appService from '@/service/appService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'

import {dateFormat} from '@/utils/date'
import {mapActions, mapGetters} from 'vuex'
import LottieAnimation from 'lottie-web-vue'
import CmmCanvas from '@/components/CmmCanvas.vue' //canvas 공통컴퍼넌트
import CmmFlotBanner from '@/components/CmmFlotBanner.vue'  // 플로팅배너
import CmmFlotIcon from '@/components/CmmFlotIcon.vue'  // 플로팅배너

import PDSC4001 from '@/views/page/PD/SC/PDSC4001/PDSC4001'
import ASPS2002 from '@/views/page/AS/PS/ASPS2002/ASPS2002'
import ASPS2004 from '@/views/page/AS/PS/ASPS2004/ASPS2004'
import ASIS2013 from '@/views/page/AS/IS/ASIS2013/ASIS2013'
import ASIV2002 from '@/views/page/AS/IV/ASIV2002/ASIV2002'
import ASIV2005 from '@/views/page/AS/IV/ASIV2005/ASIV2005'
import COCT4011 from '@/views/page/CO/CT/COCT4011/COCT4011'
import COAR4002 from '@/views/page/CO/AR/COAR4002/COAR4002'
import PDPD1002 from '@/views/page/PD/PD/PDPD1002/PDPD1002'     // 약관 슬라이드 팝업

export default {

	name : "PDTA4001",
    data: () => {
        return {
            amHideYn          : false,  // 금액 숨김 여부
            finalUpdateDtm    : '',     // 업데이트 일시
            ntpsAssetYn		  : "N", 	// 국민연금 연결 여부
            sNtpsTotAm        : 0,  	// 국민연금총금액
            sNtpsTotPrdCn	  : 0,  	// 국민연금총가입기간
            sRtrpnsTotAcEvlam : 0,	    // 퇴직연금DC_퇴직연금DC총평가금액
            sDcList    		  : [],     // 퇴직연금
            pnsvInsuList      : [],     // 연금저축보험목록
            pnsvFundList      : [],     // 연금저축펀드목록
            sNtpsMmAm		  : 0,	    // 국민연금 월금액
            sRtronsMmAm 	  : 0,	    // 퇴직연금 월금액
            sPpnsMmAm 		  : 0,	    // 개인연금 월금액
            sPpnsTts 		  : 0,	    // 개인연금 총 금액   
            ntpsPct			  : 0, 	    // 국민연금%
            rtrpnsPct		  : 0, 	    // 퇴직연금%
            ppnsPct			  : 0, 	    // 개인연금%
            ppnsLength        : 0,      // 개인연금 총 개수
            allPnsTts         : 0,      // 연금 총 합계
            pnsDsc            : 'ntps', // 연금구분

            financeKlList     : [],     // 금융지식 목록
            wrsRcmList        : [],     // 추천상품 목록
            bannerList        : [],     // 상단플로팅배너

            basDt             : '',     // 현재일자
            pnsBacSum         : 0,      // 현재연금합계금액
            pnsBf1BacSum      : 0,      // 이전달연금합계
            pnsDeltaBacSum    : 0,      // 증감액합계

            cycleData         : {},     // chart data
            cycleIdx          : 0,      // chart select Idx

            userName          : '',
            stltAgrYnList     : [],       // 약관 동의 여부 목록
            isShowStltAgrYn   : '',       // 약관 동의따른 show/hide
        }    
    },
    mounted() {

        this.initComponent()
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

    },
    methods: {
        ...mapActions('myassets', [
            'getAllMyAssetInfo',
            'getMyAssetInfo'
        ]),
        initComponent() {
            //금액 숨김/보기 처리
            this.amHideYn = this.getSecretAmInfo().includes('ISR')
            this.basDt    = dateFormat(new Date(), 'YYYYMMDD');
            this.userName = this.getUserInfo("cusnm")

            this.getInfoData();
            this.getData();
            this.getFinanceKlList();
        },
        getInfoData() {
            // 연금 종합정보 조회
            const config = {
				url: '/pd/ta/01r01',
				data: {
					mydtCusno : this.getUserInfo('mydtCusno'), // 마이데이터고객번호
                    basDt     : this.basDt
				}
			};
            apiService.call(config).then(response => {
                this.pnsBacSum      = response.acBacTot || 0;
                this.pnsBf1BacSum   = response.acBf1mBacTot || 0;
                this.pnsDeltaBacSum = response.acDeltaBacTot || 0;
            });

            this.getStltAgrYn();
        },
        getData(){
            console.log("와항항")
            //국민연결 여부 
			this.ntpsAssetYn = 'N'

			if(typeof this.myAssetsBzrgList != "undefined") {
				let publicAsset = this.myAssetsBzrgList.filter(item => item.comnCVal === 'public') || []
				if(publicAsset.length > 0) {
					let publicAssetList = this.myAssetsBzrgList.find(item => item.comnCVal === 'public').orgList || []
					if(publicAssetList.length > 0){
						this.ntpsAssetYn = publicAssetList.find(item => item.infOfrmnOrgC === 'PBAAVM0000') ? 'Y' : 'N'		// 국민연금
					}
				}
			}

            // 연금조회
            const config = {
				url: '/pd/rt/01r02',
				data: {
					mydtCusno : this.getUserInfo('mydtCusno') // 마이데이터고객번호
				}
			};
            //asetAgLrgDsc 연령
			apiService.call(config).then(response => {
                this.respInfo = response
                
                this.sNtpsTotAm			= this.respInfo.ntpsTotAm;		//국민연금총금액
                this.sNtpsTotPrdCn		= this.respInfo.ntpsTotPrdCn;	//국민연금총가입기간
                this.sRtrpnsTotAcEvlam 	= this.respInfo.rtrpnsTotAcEvlam //퇴직연금DC_퇴직연금DC총평가금액
                this.sDcList  		  	= this.respInfo.dcList || []  	  //퇴직연금DC_리스트

                this.sPpnsTts   		= this.respInfo.pPnsTotAcEvlam     // 개인연금총평가금액 
                this.pnsvInsuList     	= this.respInfo.pnsvInsuList || [] // 연금저축보험 목록
                this.pnsvFundList     	= this.respInfo.pnsvFundList || [] // 연금저축펀드 목록

                console.log("pnsvInsuList", this.respInfo.pnsvInsuList)
                console.log("pnsvFundList", this.respInfo.pnsvFundList)
                console.log("sDcList", this.sDcList)

                this.ppnsLength = this.pnsvInsuList.length + this.pnsvFundList.length  // 국민연금 총 개수

                this.allPnsTts 	= this.sNtpsTotAm	+ this.sRtrpnsTotAcEvlam + this.sPpnsTts //국민연금 + 퇴직연금+개인연금 총 합계

                if(this.sNtpsTotAm > 0){
                    this.ntpsPct  	= this.fn_PnsPct(this.sNtpsTotAm);// 국민연금%
                }

                if(this.sRtrpnsTotAcEvlam > 0){
                    this.rtrpnsPct  =  this.fn_PnsPct(this.sRtrpnsTotAcEvlam);//퇴직연금%
                }

                if(this.sPpnsTts > 0){
                    this.ppnsPct  	= this.fn_PnsPct(this.sPpnsTts);//개인연금%
                }
                
                if(this.allPnsTts > 0) {
                    this.$nextTick(() => {                        
                        this.cycleData = {
                            numberOfParts: 3,
                            parts:{"pt": [this.ntpsPct , this.ppnsPct , this.rtrpnsPct]},//percentage of each parts 
                            colors:{"cs": null }//color of each part
                        };
                        this.cycleIdx = 0;
                    })
                }
            });
        },
        // 추천상품목록 조회
        getWrsRcmList(){
            this.wrsRcmList = []       // 금융상품 추천 목록

            const config = {
                url : "/pd/pd/02ra1",
                data : {
                    mydtCusno       : this.getUserInfo('mydtCusno'),        // 마이데이터 고객번호
                    chnl            : this.getUserInfo('chnl')              // 채널구분
                }
            }
            apiService.call(config).then(response => {
                console.log('>>>>>>>>>>> ', response)
                this.wrsRcmList = response.wrsRcmList || []

                this.$nextTick(() => {
                    this.slick()
                })
            })
        },
        // 추천상품 안내화면 이동
        openWrsDtlInfo(dtlUrlnm) {
            console.log("상품안내 URL = " + dtlUrlnm)
            appService.moveFinancialProductPage(dtlUrlnm)
        },
        fn_amHidden() {
            this.setSecretAmInfo('ISR', this.amHideYn)
        },
        tabList(dsc) {
            switch(dsc) {
                case 'ntps' :
                    this.pnsDsc = 'ntps'
                    this.cycleIdx = 0;
                    break;
                case 'ppns' :
                    this.pnsDsc = 'ppns'
                    this.cycleIdx = 1;
                    break;
                case 'rtpn' :
                    this.pnsDsc = 'rtpn'
                    this.cycleIdx = 2;
                    break;
            }
        },
        /**
         * 수집갱신 처리
         */
        async fn_refreshApiCall() {
           //Vuex Store로 변경
           // 20220422 두번 클릭 방지 
           if(!this.isMyAssetGathering){
               this.getAllMyAssetInfo()
           }
        },
        /*
        * 화면이동
        */
        fn_movePage(pageId) {
            const config = {
                name: pageId
            } 
            commonService.movePage(config)
        },
        fn_PnsPct(amount){
			return Math.round( (amount/ this.allPnsTts) * 100) ;
		},
		fn_PDSC4001() {
			// 국민연금내역
			const config = {
				component : PDSC4001
			}

			modalService.openPopup(config).then(() => {
			});
		},
        fn_COAR4002() {
			// 자산연결
			const config = {
				component : COAR4002
			}

			modalService.openPopup(config).then(() => {
			});
		},
        // 연금 상세
		fn_openDetailPop(type, pension) {
			
			let popupParam = pension
			popupParam.mydtCusno = this.getUserInfo('mydtCusno') //마이데이터고객번호
			console.log(">>>>>>>>>>>>popupParam", popupParam)
			let config = {}
			
			if(type == "DC"){
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
						isrKdDsc: pension.isrKdDsc,
						mydtCusno : popupParam.mydtCusno
					}
				}
			} else if(type == "PSIV") {
				config = {
					component : ASIV2002, // 연금저축펀드
					params : {"objIvInfo" : popupParam}      
				}
			} else if(type == 'PSTS') {
				config = {
					component : ASIV2005, // 연금신탁
					params : {"objIvInfo" : popupParam}      
				} 
			}

			modalService.openPopup(config).then(() => {
				this.getData()
			})
		}, 
        slick () {
            var $banner =  $('.slick_banner');

            $(".inner", $banner).on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
                    var i = (currentSlide ? currentSlide : 0 ) + 1 ;
                    $(".paging", $banner).html('<em>'+i + '</em> / ' + slick.slideCount)

            });

            $(".inner", $banner).slick({
                speed : 300,
                dots : false,
                adaptiveHeight: true,
                infinite: true,
                draggable: true,
                accessibility:true,
                arrows : true,
                cssEase:'linear',
                prevArrow:$(".controls .prev", $banner),
                nextArrow:$(".controls .next", $banner),
            });
        
        },
        // 금융지식 컨텐츠 조회
        getFinanceKlList(){ 
            this.getFinanInfo('PDTA4001', 0, true).then(response =>{
                console.log("금융지식 : ", response)
                this.financeKlList = response
                // *출력값
                // -썸네일이미지URL명  = thmnlImgUrlnm
                // -글번호 = cntzId
                // -컨텐츠제목 = cntzTinm
                // -추천연령 = asetAgLrgDsnm
            })
        },
        // noimage
        emptyImg(e) {
            e.target.src = new URL("@/assets_v40/images/event/ev_noimg.png", import.meta.url).href
        },
        // 금융지식 컨텐츠 상세 팝업
        fnOpenContents(cntzId) {
            const config = {
                component: COCT4011,
                params   : cntzId
            }
            modalService.openPopup(config).then(() => {})
        },
        // 약관 슬라이드 팝업 오픈
        openWrsStltPop() {
            const config = {
                component: PDPD1002,        // 약관 팝업
                params : {
                }
            }
            modalService.openPopup(config).then((response) => {
                if(response == 'refresh') {
                    this.initComponent();
                }
            });
        },

        // 약관 동의 여부 조회
        getStltAgrYn() {
            this.stltAgrYnList      = [];           // 약관 동의 여부 목록

            // 개인자산관리_정보_제공_동의_내역 테이블에서 약관 동의 여부 조회
            const config = {
                url: '/co/at/01r01',
                data: {}
            }
            apiService.call(config).then(response => {
                const stltList = response.stltList || [];
                const wrsStlt = stltList.find((tmp) => tmp.stltTpc == 'PFM006') || [];

                const config2 = {
                    url : '/co/at/02ra1',
                    data : {
                        "stltTpc"   : wrsStlt.stltTpc,                          // 약관유형코드
                        "sqno"      : wrsStlt.sqno,                             // 일련번호
                        "mydtCusno" : this.getUserInfo('mydtCusno'),            // 마이데이터고객번호
                    }
                }
                apiService.call(config2).then(response => {
                    this.stltAgrYnList = response || [];                        // 약관 동의 여부 목록

                    if(this.stltAgrYnList.agrDtm) {                             // As-Is에서 동의 여부를 동의일시 데이터 있는지에 따라 판단함(COAT0005 참조)
                        this.isShowStltAgrYn = true;                            // 약관 동의따른 show/hide
                    } else {
                        this.isShowStltAgrYn = false;                           // 약관 동의따른 show/hide
                    }
                    this.$nextTick(() => {
                        this.getWrsRcmList();       // 상품추천 금융상품 추천 목록 조회
                    });
                })
            })
        },
    },
    computed : {
         ...mapGetters('myassets', [
             'isMyAssetGathering', 'lastUpdateDtm', 'myAssetsBzrgList'
		]),
        assetUpdateDtm(){
            this.finalUpdateDtm = this.lastUpdateDtm
            return this.finalUpdateDtm
        },   

    },
    mixins: [
        commonMixin
    ],
	components: {
		Page,
		FootersV2,
        LottieAnimation,
        CmmCanvas,
        CmmFlotBanner,
        CmmFlotIcon
	}   
}
</script>