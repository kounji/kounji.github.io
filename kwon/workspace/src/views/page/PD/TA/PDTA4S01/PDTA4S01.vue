<!--
/*************************************************************************
* @ 서비스경로 : 큰글모드 > 연금/절세 > 연금절세 서브메인
* @ 페이지설명 : 큰글모드 > 연금/절세 > 연금절세 서브메인
* @ 파일명     : src/views/page/PD/TA/PDTA4S01/PDTA4S01.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-02-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-26              CS541597              최초작성
*************************************************************************/
-->
<template>
    <page class="content-view">
        <div id="content">
            <section class="pension_main_senior">

                <!--update-->
                <div class="update" @click.prevent="fn_refreshApiCall()">
                    <template v-if="!isMyAssetGathering">
                        <span>{{ lastUpdateDtm }}</span>
                        <button type="button" class="btn_update"><span class="blind">업데이트</span></button>
                    </template>
                    <span v-else class="ml5 num lsp0">자산 업데이트 중</span>
                </div>

                <!-- case 1) 연결한 연금 O -->
                <template v-if="ntpsAssetYn == 'Y' || (pnsvInsuList.length + pnsvFundList.length > 0) || sDcList.length > 0">
                    <div class="outline" :class="fn_chkPnsTot">
                        <div class="board_box">
                            <h2><a href="javascript:void(0);" @click.prevent="fn_showPnsSlide">모은연금</a></h2>

                            <div class="toggle_money" :class="amtHiddenYn ? 'on':''">
                                <div class="sum">
                                    <span class="hide">쉿! 비밀이에요.</span> 
                                    <span class="show"><em>{{allPnsTts| numberFilter}}</em>원</span>
                                </div>
                                <button type="button" class="btns" @click="fn_amtHidden(!amtHiddenYn)">
                                    <span class="blind">금액</span>
                                    <span class="hide">보기</span>
                                    <span class="show">숨김</span>
                                </button>
                            </div>

                            <div class="details" :class="pnsDeltaBacSum > 0 ? 'up' : pnsDeltaBacSum < 0 ? 'down' : 'no_spending'"><!--적게 쓴경우 down, 초과인 경우 up class 추가, 0원인 경우 no_spending class 추가--> 
                                <div class="analysis">
                                    <div>
                                        <template v-if="pnsDeltaBacSum > 0 || pnsDeltaBacSum < 0">
                                            <span class="text">지난달보다</span>
                                            <span class="num"><strong>{{Math.abs(pnsDeltaBacSum) | numberFilter}}</strong>원</span>
                                            <em>{{pnsDeltaBacSum > 0 ? '늘었어요.' : '줄었어요.'}}</em>
                                        </template>
                                        <template v-else>
                                            <span class="text">지난달과</span>
                                            <em>동일해요.</em>
                                        </template>

                                        <div class="custom_tooltip">
                                            <div class="com_tooltip_type02 com_tooltip_type03">
                                                <a href="javascript:void(0);" class="com_btn_info" role="button">
                                                    <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                                </a>
                                                <div class="com_ballon_type01 com_ballon_type02" style="display: none;">
                                                    <div>
                                                        <ul class="dotted_list">
                                                            <li>마지막 업데이트 시점의 총 연금과 마지막 업데이트 전 월 말일 총연금을 비교했습니다.</li>
                                                            <li>오늘 업데이트 하셨으면 전 월 말일 총 연금과 비교한 결과입니다.</li>
                                                        </ul>
                                                        <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- 증감 파라미터 설정완료 시 수정 -->
                                <lottie-animation v-show="pnsDeltaBacSum > 0" :animationData="require('@/assets_v40/images/lottie/icon_asset_up.json')" :loop="true" :autoPlay="true" aria-hidden="true" class="icon_pension" ></lottie-animation>
                                <lottie-animation v-show="pnsDeltaBacSum < 0" :animationData="require('@/assets_v40/images/lottie/icon_asset_down.json')" :loop="true" :autoPlay="true" aria-hidden="true" class="icon_pension" ></lottie-animation>
                                <lottie-animation v-show="pnsDeltaBacSum == 0" :animationData="require('@/assets_v40/images/lottie/icon_asset.json')" :loop="true" :autoPlay="true" aria-hidden="true" class="icon_pension" ></lottie-animation>

                                <!--
                                    늘어난 경우 icon_asset_up.json
                                    줄어든 경우 icon_asset_down.json
                                -->
                            </div>

                            <div class="chart">
                                <template v-if="allPnsTts > 0">
                                    <ul class="bar">
                                        <li v-if="ntpsPct > 0" ref="nation" class="nation" :style="`width:${ntpsPct}%`" @click.prevent="fn_onActBubble">
                                            <div class="bubble"><span class="cate">국민연금</span><span class="num">{{sNtpsTotAm | numberFilter}}원</span><span class="per"><em>{{ntpsPct}}</em>%</span></div>
                                            <div class="arrow"></div>
                                        </li>
                                        <li v-if="ppnsPct > 0" ref="person" class="person" :style="`width:${ppnsPct}%`" @click.prevent="fn_onActBubble">
                                            <div class="bubble"><span class="cate">개인연금</span><span class="num">{{sPpnsTts | numberFilter}}원</span><span class="per"><em>{{ppnsPct}}</em>%</span></div>
                                            <div class="arrow"></div>
                                        </li>
                                        <li v-if="rtrpnsPct > 0" ref="retire" class="retire" :style="`width:${rtrpnsPct}%`" @click.prevent="fn_onActBubble">
                                            <div class="bubble"><span class="cate">퇴직연금</span><span class="num">{{sRtrpnsTotAcEvlam | numberFilter}}원</span><span class="per"><em>{{rtrpnsPct}}</em>%</span></div>
                                            <div class="arrow"></div>
                                        </li>
                                    </ul>
                                </template>
                                <template v-else>
                                    <ul class="bar">
                                        <li class="nation act" style="width:40%">
                                            <div class="bubble"><span class="cate">연금 자산 추가 연결</span>하면 확인할 수 있어요.</div>
                                            <div class="arrow"></div>
                                        </li>
                                        <li class="person" style="width:30%" aria-hidden="true">
                                            <div class="bubble"><span class="cate">연금 자산 추가 연결</span>하면 확인할 수 있어요.</div>
                                            <div class="arrow"></div>
                                        </li>
                                        <li class="retire" style="width:30%" aria-hidden="true">
                                            <div class="bubble"><span class="cate">연금 자산 추가 연결</span>하면 확인할 수 있어요.</div>
                                            <div class="arrow"></div>
                                        </li>
                                    </ul>
                                </template>

                                <ul class="caption" aria-hidden="true">
                                    <li class="nation"><span>국민연금</span></li>
                                    <li class="person"><span>개인연금</span></li>
                                    <li class="retire"><span>퇴직연금</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </template>
                <!-- case 2) 연결한 연금 X -->
                <template v-else>
                    <div class="outline nil">
                        <div class="board_box">
                            <h2><a href="javascript:void(0);" @click.prevent="fn_showPnsSlide">모은연금</a></h2>

                            <p class="em">연결된 연금이 없어요. <button type="button" class="btns" @click.prevent="fn_openConAset()">연결</button></p>

                            <div class="details">
                                <!-- 동일한 경우 -->
                                <div class="analysis">
                                    <p>연금 자산<br>연결하면<br>확인할 수 있어요.</p>
                                </div>

                                <lottie-animation :animationData="require('@/assets_v40/images/lottie/icon_asset_up.json')" :loop="true" :autoPlay="true" aria-hidden="true" class="icon_pension" ></lottie-animation>
                            </div>

                            <div class="chart">
                                <ul class="bar">
                                    <li class="nation act" style="width:40%">
                                        <div class="bubble">아직 <span class="cate">연결된 연금</span>이 없어요.</div>
                                        <div class="arrow"></div>
                                    </li>
                                    <li class="person" style="width:30%" aria-hidden="true">
                                        <div class="bubble">아직 <span class="cate">연결된 연금</span>이 없어요.</div>
                                        <div class="arrow"></div>
                                    </li>
                                    <li class="retire" style="width:30%" aria-hidden="true">
                                        <div class="bubble">아직 <span class="cate">연결된 연금</span>이 없어요.</div>
                                        <div class="arrow"></div>
                                    </li>
                                </ul>

                                <ul class="caption" aria-hidden="true">
                                    <li class="nation"><span>국민연금</span></li>
                                    <li class="person"><span>개인연금</span></li>
                                    <li class="retire"><span>퇴직연금</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </template>

                <!-- 국민연금 -->
                <div class="board_box" v-if="ntpsAssetYn == 'Y'">
                    <details class="pension_toggle" open="">
                        <summary>
                            <span class="item">국민연금</span>
                            <span class="num"><em>{{sNtpsTotAm | numberFilter}}</em>원</span>
                        </summary>
                        <div class="cont">
                            <ul class="pension_list">
                                <li>
                                    <a href="javascript:void(0);" @click.prevent="fn_ntpsBrkPop()">
                                        <i class="ico_bank PBAAVM0000"></i>
                                        <div>
                                            <strong class="org">국민연금공단</strong>
                                            <strong class="account">총 가입기간 {{sNtpsTotPrdCn | numberFilter}}개월</strong>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </details>
                </div>
                
                <div class="board_box pension_spend" v-else-if="unConnShow">
                    <h2 class="title"><a href="javascript:void(0);" @click.prevent="fn_openConAset('public')">국민연금</a></h2>
                    <div class="cont">  
                        <p>얼만큼 납입했을까?</p>
                    </div>
                </div>
                <!-- // 국민연금 -->

                <!-- 개인연금 -->
                <div class="board_box" v-if="pnsvInsuList.length + pnsvFundList.length > 0">
                    <details class="pension_toggle" open="">
                        <summary>
                            <span class="item">개인연금<em>{{pnsvInsuList.length + pnsvFundList.length}}</em></span>
                            <span class="num"><em>{{sPpnsTts | numberFilter}}</em>원</span>
                        </summary>
                        <div class="cont">
                            <ul class="pension_list">
                                <li v-for="(item, idx) in pnsvInsuList" :key="'insu_'+idx">
                                    <a href="javascript:void(0);" @click.prevent="fn_openDetailPop(item, 'PSIS')">
                                        <i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                        <div>
                                            <strong class="org">{{item.isrcoWrsnm}}</strong>
                                            <strong class="account">{{item.isrSctsNo}}</strong>
                                        </div>
                                        <strong class="num"><em>{{item.isrTotPymAmt | numberFilter}}</em>원</strong>
                                    </a>
                                </li>
                                <li v-for="(item, idx) in pnsvFundList" :key="'fund_'+idx">
                                    <a href="javascript:void(0);" @click.prevent="item.bsnDsc !== 'TS' ? fn_openDetailPop(item, 'PSIV') : fn_openDetailPop(item, 'PSTS')">
                                        <i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                        <div>
                                            <strong class="org">{{item.acWrsnm}}</strong>
                                            <strong class="account">{{item.mydtAcno}}</strong>
                                        </div>
                                        <strong class="num"><em>{{item.acNowBac | numberFilter}}</em>원</strong>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </details>
                </div>
                
                <div class="board_box pension_spend" v-else-if="unConnShow">
                    <h2 class="title"><a href="javascript:void(0);" @click.prevent="fn_openConAset('bank')">개인연금</a></h2>
                    <div class="cont">  
                        <p>세액공제 예상하기</p>
                    </div>
                </div>
                <!-- // 개인연금 -->

                <!-- 퇴직연금 -->
                <div class="board_box" v-if="sDcList.length > 0">
                    <details class="pension_toggle" open="">
                        <summary>
                            <span class="item">퇴직연금<em>{{sDcList.length}}</em></span>
                            <span class="num"><em>{{sRtrpnsTotAcEvlam| numberFilter}}</em>원</span>
                        </summary>
                        <div class="cont">
                            <ul class="pension_list">
                                <li v-for="(item, idx) in sDcList" :key="'dc_'+idx">
                                    <a href="javascript:void(0);" @click.prevent="item.wrsAmnno !== undefined ? fn_openDetailPop(item, 'DC') : fn_openDetailPop(item, 'IRP')">
                                        <i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                        <div>
                                            <strong class="org">{{item.dcRtrpnsWrsnm}}</strong>
                                            <strong class="account">{{item.wrsAmnno}}</strong>
                                        </div>
                                        <strong class="num"><em>{{item.acEvlam | numberFilter}}</em>원</strong>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </details>
                </div>
                
                <div class="board_box pension_spend" v-else-if="unConnShow">
                    <h2 class="title"><a href="javascript:void(0);" @click.prevent="fn_openConAset('bank')">퇴직연금</a></h2>
                    <div class="cont">  
                        <p>내가 받을 연금액</p>
                    </div>
                </div>
                <!-- // 퇴직연금 -->


                <!--금융지식-->
                <!-- <div class="finlit">
                    <h2 class="h_tit01">세대별 절세 노하우</h2>
                    <a href="javascript:void(0);" class="btn_lots" @click.prevent="fn_movePage('COCT4001')"><span class="blind">더보기</span></a>

                    <div class="scroller">
                        <ul>
                            <li v-for="(item, idx) in financeKlList" :key="idx">
                                <a href="javascript:void(0);" @click.prevent="fn_openFncKlDtl(item.cntzId)">
                                    <img :src="item.thmnlImgUrlnm" alt="" @error="emptyImg"/>
                                    <span class="gen">{{item.asetAgLrgDsnm}}</span>
                                    <strong>{{item.cntzTinm}}</strong>
                                    <span class="hash" v-if="!!item.rcmKwrdCntn">#{{item.rcmKwrdCntn}}</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div> -->

                <!--여러가지-->
                <div class="move_banner">
                    <a href="javascript:void(0);" class="board_box rect old" @click.prevent="fn_movePage('PDRT4001')">
                        <em>나의 노후준비</em>
                        안정적인 은퇴를 준비하세요.
                    </a>

                    <a href="javascript:void(0);" class="board_box rect tax" @click.prevent="fn_movePage('PDTX4004')">
                        <em>세금 납부 확인</em>
                        내가 낸 세금,<br>
                        쉽게 확인하세요.
                    </a>

                    <a href="javascript:void(0);" class="board_box rect insure" @click.prevent="fn_movePage('PDSC4004')">
                        <em>건강보험 가입내역</em>
                        내 건강보험 가입내역을<br>
                        확인하세요.
                    </a>
                </div>

                <!--추천상품-->
                <div class="goods_for_you" v-if="wrsRcmList.length > 0">
                    <h2 class="h_tit01">안락한 노후를 위한 추천상품</h2>

                    <!-- 약관 동의 내역이 없는 경우 노출 -->
                    <div class="board_box empty" v-if="!isShowStltAgrYn">
                        <p>{{getUserInfo('cusnm')}}님!<br>꼭 맞는 상품<br>추천해 드려요.</p>
                        <button type="button" class="link" @click.prevent="openWrsStltPop()">상품추천 조회 동의</button>
                    </div>

                    <!--slick-->
                    <div class="slick_banner" v-else-if="isShowStltAgrYn && wrsRcmList.length > 0">
                        <div class="inner pns_slick">
                            <a href="javascript:void(0);" v-for="(item, idx) in wrsRcmList" :key="'rcm_'+idx" @click.prevent="openWrsDtlInfo(item.wrsDtlUrlnm)">
                                <dl class="deposit green">
                                    <dt>
                                        <span class="target">{{item.wrsGrTpc == 'RVGTP' ? '적금' : item.wrsGrTpc == 'DFFM' ? '예금' : '대출'}}</span>
                                        <strong>{{item.wrsnmPrtnm}}</strong>
                                    </dt>
                                    <dd class="txt">{{item.rcmWrsBrfCntn}}</dd>
                                    <dd class="tag" v-if="!!item.rcmKwrdCntn">
                                        <span v-for="(subItem, subIdx) in item.rcmKwrdCntn.split('^')" :key="'keyword_'+subIdx">
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
                </div>

            </section>

        </div>
        <footersV2 type="pd" />
    </page>
</template>

<script>

import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import commonMixin from '@/common/mixins/commonMixin'
import appService from '@/service/appService'
import apiService from '@/service/apiService'
import commonService from '@/service/commonService'
import modalService from '@/service/modalService'
import {dateFormat, getLastDay} from '@/utils/date'
import {mapActions, mapGetters} from 'vuex'
import LottieAnimation from 'lottie-web-vue'

import COAR4002 from '@/views/page/CO/AR/COAR4002/COAR4002'
import COCT4011 from '@/views/page/CO/CT/COCT4011/COCT4011'
import PDPD1002 from '@/views/page/PD/PD/PDPD1002/PDPD1002'
import ASPS2002 from '@/views/page/AS/PS/ASPS2002/ASPS2002'
import ASPS2004 from '@/views/page/AS/PS/ASPS2004/ASPS2004'
import ASIS2012 from '@/views/page/AS/IS/ASIS2012/ASIS2012'
import ASIV2002 from '@/views/page/AS/IV/ASIV2002/ASIV2002'
import ASIV2005 from '@/views/page/AS/IV/ASIV2005/ASIV2005'
import PDTA4S02 from '@/views/page/PD/TA/PDTA4S02/PDTA4S02'
import PDSC4001 from '@/views/page/PD/SC/PDSC4001/PDSC4001'

import _ from 'lodash'

export default {
    name : "PDTA4S01",
    data: () => {
        return {
            finalUpdateDtm  : '',       // 최근 자산 업데이트 시기

            respInfo            : {},   // 조회응답 원데이터
            allPnsTts           : 0,    // 연금 총 합계
            sNtpsTotAm          : 0,  	// 국민연금총금액
            sNtpsTotPrdCn		: 0,  	// 국민연금총가입기간
            sRtrpnsTotAcEvlam	: 0,	// 퇴직연금DC_퇴직연금DC총평가금액
            sDcList    			: [],   // 퇴직연금
            sNtpsMmAm			: 0,	// 국민연금 월금액
            sRtronsMmAm 		: 0,	// 퇴직연금 월금액
            sPpnsMmAm 			: 0,	// 개인연금 월금액
            sPpnsTts 			: 0,	// 개인연금 총 금액
            pnsvInsuList     	: [],   // 연금저축보험목록
            pnsvFundList     	: [],   // 연금저축펀드목록
            ntpsPct				: 0, 	// 국민연금%
            rtrpnsPct			: 0, 	// 퇴직연금%
            ppnsPct				: 0, 	// 개인연금%

            pnsBacSum           : 0,    // 현재연금합
            pnsBf1BacSum        : 0,    // 이전달연금합
            pnsDeltaBacSum      : 0,    // 연금증감액

            amtHiddenYn         : false,// 금액 보기/숨김 구분(true:숨김, false:보기)

            financeKlList       : [],   // 금융지식 컨텐츠 목록
            wrsRcmList          : [],   // 금융상품 추천목록
            stltAgrYnList       : [],   // 약관 동의 여부 목록
            isShowStltAgrYn     : '',   // 약관 동의따른 show/hide

            //////// 연결자산 관련 데이터
            ntpsAssetYn			: "N", 	// 국민연금 연결 여부
            unConnShow          : true, // 미연결 영역 노출여부

            //////// 연금 슬라이드팝업 관련 데이터
            sPnsXpcAm 			: 0,	// 연금예상금액(국민연금(예상연금월액표))
            sAgCmprOprtC  		: "",	// 연령비교연산자코드(연금맞춤설정)
            prtoDsc             : '',   // 국민연금 연결에따른 레이아웃 출력형태구분
            sPnsStrtAg 			: 0,	// 연금개시연령(관리자)
            mydtCusAge          : 0,    // 마이데이터고객연령(api응답)
            sAgYrcn             : 0,    // 연령년수(연금맞춤설정)
            sTotEntPrdVal       : 0,    // 총가입기간값(연금맞춤설정)
            mmPnsTts			: 0, 	// 월 연금 총합계
            sMmLfecs   			: 0,	// 월생활비(관리자)
        }
    },
    computed : {
        ...mapGetters('myassets', [
            'isMyAssetGathering',
            'lastUpdateDtm',
            'myAssetsBzRgCnt',
            'myAssetInfo',
            'myAssetsBzrgList'
        ]),
        fn_chkPnsTot() {
            if(this.allPnsTts > 0) {
                return ''
            } else {
                return 'nil'
            }
        },
    },
    watch: {
        isMyAssetGathering (value) {
            if(!value) this.getData()
        },
    },
    mixins: [
        commonMixin
    ],
    created() {
        
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        ...mapActions('myassets', [
            'getAllMyAssetInfo',
            'getMyAssetInfo',
        ]),
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

        initComponent() {
            //금액 숨김/보기 처리
            this.amtHiddenYn = this.getSecretAmInfo().includes('ISR')

            // this.getData()

            // this.fn_getFinanceKlList()
            // this.fn_getWrsRcmList()
            Promise.all([
                this.getData(),
                this.getInfoData(),
                this.fn_getFinanceKlList(),
                this.getStltAgrYn(),
            ])
        },

        /*
         * 데이터 조회
         */
        getData() {
            console.log("getData()===============================================")

            //국민연결 유효 여부 
			this.ntpsAssetYn = 'N'

			if(typeof this.myAssetsBzrgList != "undefined") {
				let publicAsset = this.myAssetsBzrgList.filter(item => item.comnCVal === 'public') || []
				if(publicAsset.length > 0) {
					let publicAssetList = this.myAssetsBzrgList.find(item => item.comnCVal === 'public').orgList || []
					if(publicAssetList.length > 0) {
                        let tmpPublicAssetList = publicAssetList.find(item => item.infOfrmnOrgC === 'PBAAVM0000')
                        if(tmpPublicAssetList?.acsTokenDusDtm == '0') {
                            this.ntpsAssetYn = 'Y'
                        } else {
                            this.ntpsAssetYn = 'N'
                        }
                    }
				}
			} else {
                this.ntpsAssetYn = 'N'
            }

            const config = {
                url: '/pd/rt/01r02',
                data: {
                    mydtCusno: this.getUserInfo('mydtCusno')
                }
            }
            apiService.call(config).then(response => {
                this.respInfo = response

                this.sAgYrcn            = this.respInfo.agYrcn || 0           // 연령년수(연금맞춤설정)
                this.sMmLfecs           = this.respInfo.mmLfecs || 0          // 월생활비(관리자설정)
                this.sTotEntPrdVal      = this.respInfo.totEntPrdVal || 0     // 총가입기간(연금맞춤설정)
                this.sPnsXpcAm          = this.respInfo.pnsXpcAm || 0         // 연금예상금액(국민연금(예상연금월액표))

                this.sNtpsTotAm			= this.respInfo.ntpsTotAm || 0		  //국민연금총금액
                this.sNtpsTotPrdCn		= this.respInfo.ntpsTotPrdCn || 0	  //국민연금총가입기간
                this.sRtrpnsTotAcEvlam 	= this.respInfo.rtrpnsTotAcEvlam || 0 //퇴직연금DC_퇴직연금DC총평가금액
                this.sDcList  		  	= this.respInfo.dcList || []          //퇴직연금DC_리스트

                this.sPpnsTts   		= this.respInfo.pPnsTotAcEvlam || 0   // 개인연금총평가금액 
                this.pnsvInsuList     	= this.respInfo.pnsvInsuList || []    // 연금저축보험 목록
                this.pnsvFundList     	= this.respInfo.pnsvFundList || []    // 연금저축펀드 목록

                this.sPnsStrtAg         = this.respInfo.pnsStrtAg || 0        // 연금개시연령(관리자)
                this.mydtCusAge         = this.respInfo.mydtCusAge || 0       // 고객만나이
                this.sAgCmprOprtC       = this.respInfo.agCmprOprtC || ''     // 연령비교연산자코드(연금맞춤설정)

                // 2025.02.13 신규) 퇴직/개인연금 내 세부 리스트 별 컬럼이 달라 구분을 위한 응답데이터 세부리스트 내 구분값 추가
                /////////////////////
                // 퇴직연금
                /////////////////////
                this.sDcList.forEach(d => {
                    d.rtrPsnDsc = d.wrsAmnno != undefined ? 'DC' : 'IRP'
                })
                
                /////////////////////
                // 개인연금
                /////////////////////
                this.pnsvInsuList.forEach(d => {
                    d.pPnsDsc = 'PSIS'
                })
                this.pnsvFundList.forEach(d => {
                    d.pPnsDsc = d.bsnDsc != 'TS' ? 'PSIV' : 'PSTS'
                })

                this.allPnsTts 	= this.sNtpsTotAm + this.sRtrpnsTotAcEvlam + this.sPpnsTts //국민연금 + 퇴직연금 + 개인연금 총 합계
                
                //this.allPnsTts = 0
                this.ntpsPct    = this.fn_PnsPct(this.sNtpsTotAm)        // 국민연금%
                this.ppnsPct    = this.fn_PnsPct(this.sPpnsTts)          // 개인연금%
                this.rtrpnsPct  = this.fn_PnsPct(this.sRtrpnsTotAcEvlam) // 퇴직연금%

                // 국민연금, 개인연금, 퇴직연금 목록영역 노출여부 설정
                this.unConnShow = 
                    (this.ntpsAssetYn == 'Y' || (this.pnsvInsuList.length + this.pnsvFundList.length > 0) || this.sDcList.length > 0) ?
                    true : false

                // 연금 카테고리 최초 말풍선 설정
                this.$nextTick(() => {
                    if(this.ntpsPct > 0) {
                        this.$refs.nation.classList.add('act')
                    } else if(this.ppnsPct > 0) {
                        this.$refs.person.classList.add('act')
                    } else if(this.rtrpnsPct > 0) {
                        this.$refs.retire.classList.add('act')
                    }
                })

                let  sumTotYear = 0;
                if(this.sTotEntPrdVal != "" &&  this.sTotEntPrdVal != undefined){ //연금맞춤설정에 저장된 기간 선택시 
                    sumTotYear = 	Number(this.sTotEntPrdVal);
                }else{
                    sumTotYear = 20; //디폴트 20년
                }

                this.totEntPrdVal = sumTotYear;

                //국민연금 월금액 구하기
                if( this.sPnsXpcAm > 0){
                    let ntpsMmAm = Math.round(Number(this.sPnsXpcAm)/10000) *10000;			// //연금예상금액(국민연금(예상연금월액표))

                    let sumNtpsMmAm = 0;

                    if(this.sAgCmprOprtC == "01"){ //조기이면

                        if( this.sPnsStrtAg == 64){
                            sumNtpsMmAm = Math.floor( (ntpsMmAm - (ntpsMmAm * 0.015 )) /10000 ) *10000;
                            this.sNtpsMmAm = sumNtpsMmAm;
                        }else if( this.sPnsStrtAg == 65 ){

                            sumNtpsMmAm = Math.floor( (ntpsMmAm - ( ntpsMmAm * 0.020)) /10000) * 10000;
                            this.sNtpsMmAm = sumNtpsMmAm;
                        }
                        
                    }else if( this.sAgCmprOprtC == "03"){ //지연이면

                        sumNtpsMmAm = Math.round( (ntpsMmAm +  (ntpsMmAm * 0.030)) /10000 ) *10000;
                        this.sNtpsMmAm = sumNtpsMmAm;

                    }else{//정상이면
                        this.sNtpsMmAm = ntpsMmAm;
                    }

                }else{
                    this.sNtpsMmAm = 0;
                }

                //퇴직연금 월금액 구하기
                if(this.sRtrpnsTotAcEvlam > 0){
                    this.sRtronsMmAm =  Math.round( (Number(this.sRtrpnsTotAcEvlam) / (sumTotYear*12) ) / 10000) *10000;	
                }else{
                    this.sRtronsMmAm = 0;	
                }

                //개인연금 월금액 구하기
                if( this.sPpnsTts > 0 ){
                    this.sPpnsMmAm = Math.round( (Number(this.sPpnsTts) / (sumTotYear*12)) /10000) * 10000;	
                }else{
                    this.sPpnsMmAm = 0;
                }

                this.mmPnsTts   = this.sNtpsMmAm + this.sRtronsMmAm + this.sPpnsMmAm    // 월 총연금액
                let pnsYn       = 'N' // 국민연금 납입 10년이상여부
                let sNtpsAgeYn  = 'N' // 국민연금 수령나이 미도달여부

                // 국민연금 총가입기간이 10년(120개월)이상이면
                if(this.sNtpsTotPrdCn >= 120) {
                    pnsYn = 'Y'
                } else if(this.sNtpsTotPrdCn > 0 && this.sNtpsTotPrdCn < 120) {
                    let sTotTt = (this.sNtpsTotPrdCn/12) + (60-this.mydtCusAge)*12
                    if(sTotTt >= 120) {
                        pnsYn = 'Y'
                    }
                } else {
                    pnsYn = 'N'
                }

                if(this.sPnsStrtAg > this.mydtCusAge) {
                    // 관리자에 등록된 연금개시연령보다 적으면
                    sNtpsAgeYn = 'Y'
                }

                // 국민연금 월 수령액, 가입, 10년이상 납부, 연금수령전
                if(this.sNtpsMmAm > 0 && this.ntpsAssetYn == 'Y' && pnsYn == 'Y' && sNtpsAgeYn == 'Y') {
                    this.prtoDsc = 1

                // 국민연금 미가입
                } else if(this.ntpsAssetYn == 'N') {
                    this.prtoDsc = 2

                // 국민연금 수령자
                } else if(this.sNtpsTotAm > 0 && this.ntpsAssetYn == 'Y' && sNtpsAgeYn == 'N') {
                    this.prtoDsc = 3

                // 국민연금 가입 및 납부 10년 이하
                } else if(this.sNtpsTotAm > 0 && this.ntpsAssetYn == 'Y' && pnsYn == 'N' && sNtpsAgeYn == 'Y') {
                    this.prtoDsc = 4

                } else {
                    this.prtoDsc = 1
                }

                // 연금 금액관련 정보 조회
                // this.getInfoData()
            })
        },
        /**
         * 연금 종합정보 조회
         */
        getInfoData() {
            const config = {
                url: '/pd/ta/01r01',
                data: {
                    mydtCusno: this.getUserInfo('mydtCusno'),
                    basDt: dateFormat(new Date(), 'YYYYMMDD')
                }
            }
            apiService.call(config).then(response => {
                this.pnsBacSum      = response.acBacTot || 0
                this.pnsBf1BacSum   = response.acBf1mBacTot || 0
                this.pnsDeltaBacSum = response.acDeltaBacTot || 0
            })
        },
        // 금융지식 컨텐츠 조회
        fn_getFinanceKlList(){ 
            this.getFinanInfo('PDTA4001', 0, true).then(response =>{
                this.financeKlList = response
                // *출력값
                // -썸네일이미지URL명  = thmnlImgUrlnm
                // -글번호 = cntzId
                // -컨텐츠제목 = cntzTinm
                // -추천연령 = asetAgLrgDsnm
            })
        },
        // 금융지식 컨텐츠 상세조회
        fn_openFncKlDtl(cntzId) {
            const config = {
                component: COCT4011,
                params: cntzId,
            }
            modalService.openPopup(config)
        },
        // 추천상품목록 조회
        fn_getWrsRcmList(){
            this.wrsRcmList         = []       // 금융상품 추천 목록

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
        /**
         * 약관동의여부 조회
         */
        getStltAgrYn() {
            this.stltAgrYnList = []    // 약관 동의 여부 목록

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
                    this.stltAgrYnList = response || [] // 약관 동의 여부 목록

                    if(this.stltAgrYnList.agrDtm) { // As-Is에서 동의 여부를 동의일시 데이터 있는지에 따라 판단함(COAT0005 참조)
                        this.isShowStltAgrYn = true     // 약관 동의따른 show/hide
                    } else {
                        this.isShowStltAgrYn = false    // 약관 동의따른 show/hide
                    }

                    this.fn_getWrsRcmList()
                })
            })
        },
        /**
         * 연금 퍼센티지 산출
         */
        fn_PnsPct(amount){
			return this.allPnsTts > 0 ? Math.round( (amount/this.allPnsTts) * 100) : 0
		},
        /**
         * 그래프 선택 말풍선 act class 설정
         */
        fn_onActBubble(e) {
            let targetEl = e.target
            $(targetEl).addClass('act')
            $(targetEl).siblings().removeClass('act')
        },
        /**
         * 총 연금 개요슬라이드 호출
         */
        fn_showPnsSlide() {
            const config = {
                renderer: {component: PDTA4S02},
                params: {
                    prtoDsc         : this.prtoDsc,      // 국민연금 연결에따른 레이아웃 출력형태구분
                    allPnsTts       : this.allPnsTts,    // 모은 총연금액
                    sPnsStrtAg 	    : this.sPnsStrtAg,   // 연금개시연령(관리자)
                    mydtCusAge      : this.mydtCusAge,   // 마이데이터고객연령(api응답)
                    sAgYrcn         : this.sAgYrcn,      // 연령년수(연금맞춤설계)
                    sTotEntPrdVal   : this.sTotEntPrdVal,// 총가입기간값(연금맞춤설정)
                    mmPnsTts	    : this.mmPnsTts,     // 월 연금 총합계
                    sMmLfecs   	    : this.sMmLfecs,     // 월생활비(관리자)
                }
            }
            modalService.openSlidePagePopup(config)
        },
        /**
         * 연금항목별 상세팝업 이동
         */
        fn_openDetailPop(obj, type) {
            obj.mydtCusno = this.getUserInfo('mydtCusno')

            let config = {}
            let params = {}
            let compName = ''
            
            switch(type) {
                case 'DC':  // DC퇴직연금
                    compName = ASPS2002
                    params = {objAccInfo: obj}
                    break
                case 'IRP': // IRP
                    compName = ASPS2004
                    params = {objAccInfo: obj}
                    break
                case 'PSIS':    // 연금저축보험
                    compName = ASIS2012
                    params = {
                        infOfrmnOrgC: obj.infOfrmnOrgC,
                        isrSctsNo: obj.isrSctsNo,
                        isrkdDsc: obj.isrKdDsc,
                        mydtCusno: obj.mydtCusno
                    }
                    break
                case 'PSIV':    // 연금저축펀드
                    compName = ASIV2002
                    params = {objIvInfo: obj}
                    break
                case 'PSTS':    // 연금신탁
                    compName = ASIV2005
                    params = {objIvInfo: obj}
                    break
                default: return
            }

            config = {
                component: compName,
                params: params
            }
            modalService.openPopup(config).then(() => {
                this.getData()
            })
        },
        /**
         * 금액 show/hide 설정
         */
        fn_amtHidden(type) {
            this.amtHiddenYn = type
            this.setSecretAmInfo('ISR', this.amtHiddenYn)
        },
        /**
         * 화면 이동
         */
        fn_movePage(page) {
            const config = {
                name: page
            }
            commonService.movePage(config).then(() => {

            })
        },
        /**
         * 자산 연결 팝업 오픈
         */
        fn_openConAset(orgDsc='bank') {
            const config = {
                component: COAR4002,
                params: {
                    isExternal: true,
                    orgDsc: orgDsc
                }
            }
            modalService.openPopup(config).then(() => {})
        },
        /**
         * 국민연금 가입 내역 팝업오픈
         */
        fn_ntpsBrkPop() {
            const config = {
                component: PDSC4001
            }
            modalService.openPopup(config)
        },
        /**
         * 약관 슬라이드 팝업 오픈
         */
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
        // 추천상품 안내화면 이동
        openWrsDtlInfo(dtlUrlnm) {
            appService.moveFinancialProductPage(dtlUrlnm)
        },
        emptyImg(e) {
            e.target.src = new URL("@/assets_v40/images/event/ev_noimg.png", import.meta.url).href
        },
        slick(){
            $('.slick_banner').each(function(){
                var $this = $(this)
    
                $this.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
                        var i = (currentSlide ? currentSlide : 0 ) + 1 ;
                        $(".controls .paging").html('<em>'+i + '</em> / ' + slick.slideCount)
                });
    
                $(".inner", $this).slick({
                    speed : 300,
                    dots : false,
                    adaptiveHeight: true,
                    infinite: true,
                    draggable: true,
                    accessibility:true,
                    arrows : true,
                    cssEase:'linear',
                    prevArrow:$(".controls .prev", $this),
                    nextArrow:$(".controls .next", $this),
                });
            })
        }
    },
    components: {
        Page,
        FootersV2,
        LottieAnimation
    },
}
</script>