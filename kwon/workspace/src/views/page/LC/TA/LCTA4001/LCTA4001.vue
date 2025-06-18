<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 
* @ 페이지설명 : 지출 > 지출메인
* @ 파일명     : src/views/page/LC/TA/LCTA4001/LCTA4001.vue
* @ 작성자     : CS540687
* @ 작성일     : 2025-02-05
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-05              CS540687                 최초작성
*************************************************************************/
-->
<template>
    <page class="content-view mydata2023 subMainWrap" >
        <!-- content -->
        <div id="content" class="renewal expenDecom">
            <section class="wallet_main">
                <!--배너-->
                <cmm-flot-banner bnnrExpsDsVal="43" @reload="initComponent"/>

                <!--update-->
                <div class="update" @click.prevent="fn_refreshApiCall()">
                    <template v-if="!isMyAssetGathering">
                        <span>{{ lastUpdateDtm }}</span>
                        <button type="button" class="btn_update"><span class="blind">업데이트</span></button>
                    </template>                        
                    <span v-else class="ml5 num lsp0">자산 업데이트 중</span>
                </div>    
                <!--개요 : 자산연결기관(은행업권, 카드업권, 전자금융업권이 없는 경우 -->
                <div v-if="orgConCnt == 0" class="outline">
                    <h2>{{basMm|numberFilter}}월 지출</h2>
                    
                    <p class="em">연결된 지출이 없어요. <button type="button" class="btns" @click.prevent="fn_openAssetPage()">연결</button></p>
                    <p class="txt">결제 수단을 연결하면 확인할 수 있어요.</p>                
                </div>
                <!--개요 : 자산연결기관(은행업권, 카드업권, 전자금융업권이 있는 경우-->
                <div v-else :class="cmprXpsAmUpDown(cusMmtpXpsOut.bmmCmprXpsAm, 'outline')">
                    <h2><a href="javascript:void(0);" @click.prevent="fn_movePage('LCIP4001')"><em>{{basMm|numberFilter}}</em>월 지출</a></h2>
                    <!--금액숨김 수정-->
                    <div class="toggle_money" :class="amtHiddenYn === true ? 'on' : ''">
                        <div class="sum">
                            <span class="hide">쉿! 비밀이에요.</span>
                            <span class="show"><em>{{cusMmtpXpsOut.xpsAm0 | numberFilter}}</em>원</span>
                        </div>
                        <button type="button" class="btns" @click="fn_amtHidden(!amtHiddenYn)">
                            <span class="blind">금액</span>
                            <span class="hide">보기</span>
                            <span class="show">숨김</span>
                        </button>
                    </div>
                    
                    <div class="txt">
                        <template v-if="cusMmtpXpsOut.xpsAm0 > 0 && cusMmtpXpsOut.bmmCmprXpsAm > 0">
                            <span class="text">지난달보다</span> <span class="num">{{Math.abs(cusMmtpXpsOut.bmmCmprXpsAm) | numberFilter}}원</span> <em>더 쓰고 있어요.</em>
                        </template>
                        <template v-if="cusMmtpXpsOut.xpsAm0 > 0 && cusMmtpXpsOut.bmmCmprXpsAm < 0">
                            <span class="text">지난달보다</span> <span class="num">{{Math.abs(cusMmtpXpsOut.bmmCmprXpsAm) | numberFilter}}원</span> <em>덜 쓰고 있어요.</em>
                        </template>
                        <template v-if="cusMmtpXpsOut.xpsAm0 > 0 && cusMmtpXpsOut.bmmCmprXpsAm === 0">
                            <span class="text">지난달과 지출이</span> <em>동일해요.</em>
                        </template>
                        <template v-if="cusMmtpXpsOut.xpsAm0 === 0 ">
                            <span class="text">{{basMm|numberFilter}}월 지출내역이 없어요.</span>
                        </template>
                        <div class="custom_tooltip">
                            <div class="com_tooltip_type02 com_tooltip_type03">
                                <a href="javascript:void(0);" class="com_btn_info" role="button">
                                    <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                </a>
                                <div class="com_ballon_type01 com_ballon_type02" style="display: none;">
                                    <div>
                                        <ul class="dotted_list">
                                            <li>마지막 업데이트 시점의 총 지출과 마지막 업데이트 전 월 말일 총지출을 비교했습니다.</li>
                                            <li>오늘 업데이트 하셨으면 전 월 말일 총 지출과 비교한 결과입니다.</li>
                                        </ul>
                                        <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
                      
                <div class="wallet_outline">
                    <div class="board_box">
                        <!--25-02-14 타이틀 추가-->
                        <h3><a href="javascript:void(0);" @click.prevent="fn_movePage('LCLE4001')" class="title">지출내역</a></h3>
                        <!--//25-02-14 타이틀 추가-->
                        <ul role="tablist" class="inner_tab">
                            <li aria-controls="tab_01" :class="selectTab === 'CARD' ? 'on' : ''"><button type="button" role="tab" :aria-selected="selectTab === 'CARD' ? 'true' : 'false'" @click.prevent="fn_selectTab('CARD')">카드</button></li>
                            <li aria-controls="tab_02" :class="selectTab === 'PAY'  ? 'on' : ''"><button type="button" role="tab" :aria-selected="selectTab === 'PAY'  ? 'true' : 'false'" @click.prevent="fn_selectTab('PAY' )">페이</button></li>
                            <li aria-controls="tab_03" :class="selectTab === 'CASH' ? 'on' : ''"><button type="button" role="tab" :aria-selected="selectTab === 'CASH' ? 'true' : 'false'" @click.prevent="fn_selectTab('CASH')">현금</button></li>
                        </ul>
        
                        <!--카드 case-->
                        <div :class="`details ${xpsUpDownClass}`"><!-- 같은 경우 detail, 적게 쓸경우 down, 초과인 경우 up class 추가   -->
                            <div v-if="xpsUpDownClass === 'up' || xpsUpDownClass === 'down'" class="analysis">
                                <p class="h_tit01">{{xpsMns2}} 지난 달보다<br><em>{{xpsUpDownDsc}}</em> 쓰고 있어요.</p>
                                <p>이번달 {{xpsMns}} 이용 금액<span class="num"><em> {{xpsMnsAm | numberFilter}}</em>원</span></p>
                            </div>
                            <div v-else-if="xpsUpDownClass === '' " class="analysis">
                                <p class="h_tit01">지난달<br>지출과 <em>같아요.</em></p>
                                <p>이번달 {{xpsMns}} 이용 금액<span class="num"><em> {{xpsMnsAm | numberFilter}}</em>원</span></p>                                    
                            </div>
                            <div v-else-if="xpsUpDownClass === 'no' " class="analysis">
                                <p class="h_tit01">이번 달 {{xpsMns}} 이용<br><em>내역이 없어요.</em></p>
                                <p>이번달 {{xpsMns}} 이용 금액<span class="num"><em> {{xpsMnsAm | numberFilter}}</em>원</span></p>                                    
                            </div>
                            <div v-else-if="xpsUpDownClass === 'not' " class="analysis">
                                <p class="h_tit01">{{xpsMns}} 내역 확인하고<br>지출 관리 하세요.</p>                                   
                            </div>
                            <!-- 로또 로티애니매이션 -->
                            <!--
                                초과인 경우  icon_wallet_up.json        ../../../../src/assets_v40/images/lottie/icon_wallet_up.json
                                동일한 경우  icon_wallet_up.json        ../../../../src/assets_v40/images/lottie/icon_wallet_up.json
                                적게 쓸 경우 icon_wallet_down.json      ../../../../src/assets_v40/images/lottie/icon_wallet_down.json
                                0원인 경우   icon_wallet_down.json      ../../../../src/assets_v40/images/lottie/icon_wallet_no.json
                            -->                
                            <lottie-animation v-show="xpsUpDownClass == 'down'" :animationData="require('@/assets_v40/images/lottie/icon_wallet_down.json')" ref=walletDown :loop="false" :auto-play="false"  :speed="1" aria-hidden="true" class="icon_wallet"></lottie-animation>
                            <lottie-animation v-show="xpsUpDownClass == 'up'"   :animationData="require('@/assets_v40/images/lottie/icon_wallet_up.json')"   ref=walletUp   :loop="false" :auto-play="false"  :speed="1" aria-hidden="true" class="icon_wallet"></lottie-animation>
                            <lottie-animation v-show="xpsUpDownClass == ''"     :animationData="require('@/assets_v40/images/lottie/icon_wallet.json')"      ref=wallet     :loop="false" :auto-play="false"  :speed="1" aria-hidden="true" class="icon_wallet"></lottie-animation>
                            <lottie-animation v-show="xpsUpDownClass == 'no'"   :animationData="require('@/assets_v40/images/lottie/icon_wallet_no.json')"   ref=walletNo   :loop="false" :auto-play="false"  :speed="1" aria-hidden="true" class="icon_wallet"></lottie-animation>
                        </div>
                    </div> 
                    <!--카드 상세-->
                    <div class="spend_history" v-if="cardConCnt === 0 && selectTab == 'CARD'">
                        <a href="javascript:void(0);" @click.prevent="fn_openAssetPage()">{{xpsMns}} 연결 하기</a>
                    </div>                         
                    <div class="spend_history" v-if="cardConCnt > 0 && cardXpsCn > 0 && selectTab == 'CARD'" @click.prevent="setAssetDtl('card')">
                        <details :key="selectTab" :open="getAssetDtl('card') === true ? 'open' : null">
                        <!-- <details> -->
                            <!-- 25-03-17 보기/닫기로 수정 -->  
                            <summary>내 카드 지출 내역 
                                <span class="show">보기</span>
                                <span class="hide">닫기</span>
                            </summary>
                            <!-- //25-03-17 보기/닫기로 수정 -->  
                            <div class="cont">
                                <ul v-if="cardXpsList.length > 0" class="payment_list">
                                    <li v-for="(item,index) in cardXpsList" :key="'card_' + index">
                                        <a @click.prevent="openCardDetail(item)" href="javascript:void(0);" role="button">
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgCNm}}</span></i>
                                            <div>
                                                <span class="name">{{item.cdcoCdWrsnm}}</span>
                                                <span class="num">{{item.cdUgUsAm | numberFilter}}<em class="unit">원</em></span>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>                              
                        </details>
                    </div> 
                    <!--페이 상세-->
                    <div class="spend_history"  v-if="payConCnt === 0 && selectTab == 'PAY'" >  
                        <a href="javascript:void(0);" @click.prevent="fn_openAssetPage()">{{xpsMns}} 연결 하기</a>
                    </div>
                    <div class="spend_history"  v-if="payConCnt > 0 && (payMnyCn + ppayCdCn) > 0 && selectTab == 'PAY'" @click.prevent="setAssetDtl('pay')">                            
                        <!-- <details :key="selectTab" :open="selectTab === 'PAY' ? null : null"> -->
                        <details :key="selectTab" :open="getAssetDtl('pay') === true ? 'open' : null">
                            <summary>내 페이 지출 내역 
                                <span class="show">보기</span>
                                <span class="hide">닫기</span>
                            </summary>                                
                            <div class="cont">
                                <ul v-if="payMnyList.length > 0" class="payment_list">
                                    <li v-for="(item, index) in payMnyList" :key="'payMny_' + index">
                                        <a @click.prevent="openPayMnyDetail(item)" href="javascript:void(0);" role="button">
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgCNm}}</span></i>
                                            <div>
                                                <span class="name">{{item.faceOnm}}</span>
                                                <span class="num">{{item.ppayTram | numberFilter}}<em class="unit">원</em></span>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <ul v-if="ppayCdList.length > 0" class="payment_list">
                                    <li v-for="(item, index) in ppayCdList" :key="'ppayCd_' + index">
                                        <a  @click.prevent="openPpayCdDetail(item)" href="javascript:void(0);" role="button">
                                            <i :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgCNm}}</span></i>
                                            <div>
                                                <span class="name">{{item.cdcoCdWrsnm}}</span>
                                                <span class="num">{{item.cdUgUsAm | numberFilter}}<em class="unit">원</em></span>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </details>       
                    </div>

                    <!--현금 상세-->
                    <div class="spend_history" v-if="bankConCnt === 0 && selectTab == 'CASH'">
                        <a href="javascript:void(0);" @click.prevent="fn_openAssetPage()">{{xpsMns}} 연결 하기</a>
                    </div>
                    <div class="spend_history" v-if="bankConCnt > 0 && cashCn > 0 && selectTab == 'CASH'" @click.prevent="setAssetDtl('cash')">
                        <details :key="selectTab" :open="getAssetDtl('cash') === true ? 'open' : null">
                        <!-- <details :key="selectTab" :open="selectTab === 'CASH' ? null : null"> -->
                            <summary>내 현금 지출 내역 
                                <span class="show">보기</span>
                                <span class="hide">닫기</span>
                            </summary>                                    
                            <div class="cont">
                                <ul v-if="cashList.length > 0" class="payment_list">
                                    <li v-for="(item, index) in cashList" :key="'cash_' + index">
                                        <a  @click.prevent="openCashDetail(item)" href="javascript:void(0);" role="button">
                                            <dl>
                                                <dt>
                                                    <div>
                                                        <i class="icon_money"></i>
                                                        <em v-if="item.chsvKdnm == '이체'" class="prod_name">계좌 이체로 쓴 금액</em>
                                                        <em v-if="item.chsvKdnm == '현금'" class="prod_name">직접 등록한 지출 금액</em>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <span class="com_price">
                                                        <em class="num">{{item.tram | numberFilter}}</em><em class="unit">원</em>
                                                    </span>
                                                </dd>
                                            </dl>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </details>
                    </div>  
                </div>

                <!--최근소비-->
                <div v-if="rcnXpsList.length > 0" class="board_box lately_spend">
                    <h2><a href="javascript:void(0);" @click.prevent="fn_movePage('LCFD4001')" class="title">최근 내역</a></h2>
                    
                    <span class="date">{{rcnXpsDd}}일({{rcnXpsDayName}})</span>
                    <ul class="lately_list">
                        <li v-for="(item, index) in rcnXpsList" :key="'rcnXps_' + index">
                            <i :class="`expIcon ${item.asetAmnCtgrId}`"><span class="blind">{{item.ctgrnm}}</span></i>
                            <div>
                                <span class="name">{{item.mchtnm}}</span>
                                <span class="pay">{{item.cdcoCdWrsnm}}</span>
                            </div>
                            <span class="num">{{item.revXpsAm | numberFilter}}원</span>
                        </li>
                    </ul>
                </div>
                <!--최근소비-->
                <div v-if="rcnXpsList.length == 0" class="board_box lately_spend">
                    <h2><a href="javascript:void(0);" @click.prevent="fn_movePage('LCFD4001')" class="title">최근 내역</a></h2>                        
                    <p class="txt">이번 달 최근 내역이<br>없어요.</p>
                </div>                    

                <!--주요소비-->
                <div v-if="ctgrList.length > 0" class="board_box staple_spend">
                    <h2><a href="javascript:void(0);" class="title" @click.prevent="openPop('LCIP2002TAB')">주요 소비</a></h2>
                    <!--소비가 있는 경우-->
                    <div class="analysis">
                        <p class="txt">{{top1XpsCtgrNm}}에  가장 많은 지출,<br><em>{{top1XpsAm / 10000 | numberFilter}}만원</em>을 썼어요.</p>

                        <div class="gray_box">
                            <p>주요 소비 중 지난 달 대비<br><em>{{cmprTop1CtrgNm}}</em> 소비 변화가 많아요.</p>
                        </div>
                    </div>

                    <!--주요소비 상세-->
                    <details  class="board_box_details">
                        <summary>
                            <!--25-02-10 텍스트 수정 -->
                            <span class="show">소비 분석 보기</span>
                            <span class="hide">소비 분석 닫기</span>
                            <!--//25-02-10 텍스트 수정 -->
                        </summary>
                        <div class="cont">
                        <div class="chart" aria-hidden="true">
                            <div class="bar">
                                <!--1위/2위/3위순이고, 전달대비 증가폭이 큰 경우 up class 추가 -->
                                <div :class="top1XpsAmUpDown" :style="{height: top1ChartRto  + '%'}"><span>{{top1XpsCtgrNm}}</span></div>
                                <div :class="top2XpsAmUpDown" :style="{height: top2ChartRto  + '%'}"><span>{{top2XpsCtgrNm}}</span></div>
                                <div :class="top3XpsAmUpDown" :style="{height: top3ChartRto  + '%'}"><span>{{top3XpsCtgrNm}}</span></div>
                            </div>  

                            <!-- CANVAS 공통콤퍼넌트로 변경 -->
                            <cmm-canvas canvaMode="line" :linedata=linedata :pos="[184, 92, 16, 0, 60]" ></cmm-canvas>

                            <div class="model">
                                <span class="this">{{top1BasYm.substr(4,2)|numberFilter}}월</span>
                                <span class="prev">{{top1Bf1Ym.substr(4,2)|numberFilter}}월</span>
                            </div>
                        </div>         

                        <div class="scroller">
                                <ul>
                                    <li v-for="(item, index) in ctgrList" :key="'ctgr_' + index" class="box_spend ">
                                        <strong><span :class="item.xpsOrd == 1 ? 'pin lg purple' : 'pin lg'">{{item.xpsOrd}}위</span>{{item.xpsCtgrNm}}</strong>
                                        <i :class="item.xpsCtgrC"></i>
                                        <span :class="item.bmmCmprXpsAm >= 0 ? 'range up' : 'range down'">{{Math.abs(item.bmmCmprXpsAm) | numberFilter}}원</span>
                                        <span class="num">{{item.xpsAm | numberFilter}}원</span>
                                        <span class="hash sm">{{item.xpsRto | numberFilter}}%</span>
                                    </li>
                                </ul>
                        </div>
                        </div>
                    </details>
                </div>
                <div v-if="ctgrList.length == 0" class="board_box staple_spend">
                    <h2><a href="javascript:void(0);" @click.prevent="openPop('LCIP2002TAB')" class="title">주요 소비</a></h2>

                    <!--소비가 없는 경우-->
                    <div class="analysis">
                        <p class="txt">이번 달 지출 내역이<br>없어요.</p>
                    </div>
                </div>          

                <!--25-02-10 통신비 수정 -->
                <div v-if="rqsCn == 0" class="board_box phonebill">
                    <h2><a @click.prevent="moveMobilePay()" href="javascript:void(0);" class="title">통신비 청구 금액</a></h2>

                    <div class="custom_tooltip up">
                        <div class="com_tooltip_type02 com_tooltip_type03">
                            <a href="javascript:void(0);" class="com_btn_info" role="button">
                                <em class="tooltip_icon_gray"><span class="blind">툴팁열기</span></em>
                            </a>
                        </div>
                        <div class="com_ballon_type01 com_ballon_type02" style="display: none;">
                            <div>                                    
                                <p>
                                    결제 예정금액으로 총지출에는 포함되지 않습니다.<br>
                                    결제일 이 후 카드/페이/현금 결제 내역에서 확인할 수 있습니다.
                                </p>
                                <!--//25-02-10 텍스트 수정 -->

                                <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                            </div> 
                        </div>
                    </div>
                    <!--금액이 없는 경우-->
                    <p>이번달 통신비 청구 금액이 없어요.</p>
                </div>       

                <!--통신비-->
                <div v-if="rqsCn > 0" class="board_box phonebill">
                    <h2><a @click.prevent="moveMobilePay()" href="javascript:void(0);" class="title">통신비 청구 금액 </a></h2>
                    <div class="custom_tooltip up">
                        <div class="com_tooltip_type02 com_tooltip_type03">
                            <a href="javascript:void(0);" class="com_btn_info" role="button">
                                <em class="tooltip_icon_gray"><span class="blind">툴팁열기</span></em>
                            </a>
                        </div>
                        <div class="com_ballon_type01 com_ballon_type02" style="display: none;">
                            <div>                                    
                                <p>
                                    결제 예정금액으로 총지출에는 포함되지 않습니다.<br>
                                    결제일 이 후 카드/페이/현금 결제 내역에서 확인할 수 있습니다.
                                </p>
                                <!--//25-02-10 텍스트 수정 -->
                                <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>                                    
                            </div> 
                        </div>
                    </div>
                    <!--금액이 있는 경우-->
                    <div v-if="modifiedRqsList.length > 0">
                        <ul v-for="item in modifiedRqsList" :key="'rqsOrg_' + item.infOfrmnOrgC">
                            <li>{{item.infOfrmnOrgCNm}}<span class="num">{{item.comuRqsAmSum | numberFilter}}원</span></li>
                        </ul>
                    </div>                                              
                </div>

                <!--정기지출이 있는 경우-->
                <div v-if="fxtmCn > 0" class="board_box regular_spend">
                    <h2><a href="javascript:void(0);" @click.prevent="openPopFxtm()" class="title">정기 지출</a></h2>

                    <!--다가올 정기지출이 있는 경우-->
                    <div v-if="fxtmSt01Cn > 0">
                        <div class="analysis">
                            <p class="txt">다가올 정기지출 {{fxtmCn}}건 중<br><em>{{fxtmSt01Cn}}건</em> 예정되어 있어요.</p>
                        </div>                        

                        <!--정기지출 상세-->
                        <details v-if="fxtmSt01Cn > 0" class="board_box_details">
                            <summary>
                                <span class="show">다가올 정기지출 보기</span>
                                <span class="hide">다가올 정기지출 닫기</span>
                            </summary>
                            <div class="cont">
                                <span class="total">다가올 지출 <span><em>{{fxtmSt01Cn}}</em>건</span></span>
                                <ul class="regularly_list">
                                    <li v-for="(item, index) in fxtmList.filter((el,idx)=>idx < fxtmSt01Cn)" :key="`item1_${index}`">
                                        <i :class="`expIcon ${item.xpsCtgrC}`"></i>
                                        <div>
                                            <span class="name">{{item.mchtnm}}</span>
                                            <span class="num">{{item.xpsAm | numberFilter}}원</span>
                                        </div>
                                        <span class="due">{{getYmd(item.trDt, 'DD')}}일 {{xpsStNm(item.xpsSt)}}</span><!-- {{item.trDt.substr(6, 2)}} -->
                                    </li>
                                </ul>
                            </div>
                        </details>                        
                    </div>
                    <div v-else>
                        <div class="analysis">
                            <p class="txt">현재 예정된 <br>정기 지출이 없어요.</p>
                        </div>                        
                    </div>
                </div>                        
                <!-- 정기 지출 정보가 없는 경우 -->
                <div v-else class="board_box regular_spend">
                    <h2><a href="javascript:void(0);" @click.prevent="openPopFxtm()" class="title">정기 지출</a></h2>
                    <!--정기지출이 없는 경우-->
                    <div class="analysis">
                        <p class="txt">예상되는 정기지출을<br>찾을 수 없어요.</p><!--25-04-01 마침표추가-->
                        <p class="txt2">결제 계좌나 카드를 연결하거나<br>정기지출을 추가해서 현명한 지출 관리 하세요.</p><!--25-04-01 마침표추가-->
                        <a href="javascript:void(0);" @click.prevent="openPopFxtm()" class="btns md gray">정기지출 추가하기</a>
                    </div>                    
                </div>

                <!--소비 줄이기-->
                <div v-if="xpsObt.xpsObtAm > 0" :class="`board_box less_spend ${xpsObtClass}`">
                    <!--chart > now 막대의 width 85% 가 넘으면 초과임. 초과일 경우 up / 목표에 가까워지는 경우 nearby  class 추가-->
                    <h2><a href="javascript:void(0);" @click.prevent="openPopTarget()" class="title">소비 줄이기</a></h2>

                    <!--소비가 있는 경우-->
                    <div v-if="xpsObtRto <= 85" class="analysis">
                        <p class="txt">현재, 목표 예산에서<br><em>안정적</em>이에요.</p>
                        <p class="txt2">지금처럼만 잘 유지해 주세요.</p>
                    </div>

                    <div v-if="xpsObtRto >= 86 && xpsObtRto <= 100" class="analysis">
                        <p class="txt">현재, 목표 예산과<br><em>가까워요.</em></p>
                        <p class="txt2">현명한 목표 예산을 달성해 주세요.</p>
                    </div>

                    <div v-if="xpsObtRto > 100" class="analysis">
                        <p class="txt">현재, 목표 예산을<br><em>초과</em>했어요.</p>
                        <p class="txt2">지출한 금액을 한번 점검해 보세요.</p>
                    </div>

                    <!--소비목표 상세-->
                    <details class="board_box_details">
                        <summary>
                            <span class="show">한 달 예산 분석 보기</span>
                            <span class="hide">한 달 예산 분석 닫기</span>
                        </summary>
                        <div class="cont">
                            <div class="chart">
                                <div class="standard"><span>목표 : {{xpsObt.xpsObtAm | numberFilter}}원</span></div>
                                <div :class="xpsObtBarRto > 50 ? 'now' : 'now left'" :style="{width: xpsObtBarRto  + '%'}"><span><span class="blind">현재</span> {{xpsObt.xpsRzsAm | numberFilter}}원</span></div>
                            </div>
                            <!--소비가 있는 경우-->
                            <div v-if="xpsObtRto <= 100" class="gray_box">
                                <p>오늘까지 총 예산금액 내 <em>{{xpsObtRto | numberFilter}}%</em> 지출하고 있어요.<br><em>{{xpsObt.xpsObtAm | numberFilter}}원</em> 이내로 지출해 보세요!</p>
                            </div>

                            <!-- <div v-if="xpsObtRto >= 86 && xpsObtRto <= 100" class="gray_box">
                                <p>오늘까지 총 예산금액 내 <em>{{xpsObtRto | numberFilter}}%</em> 지출하고 있어요.<br><em>{{xpsObt.xpsObtAm | numberFilter}}원</em> 이내로 지출해 보세요!</p>
                            </div> -->

                            <div v-if="xpsObtRto > 100" class="gray_box">
                                <p>오늘까지 <em>{{xpsObt.xpsRzsAm - xpsObt.xpsObtAm | numberFilter}}원</em> 이 초과 되었어요.</p>
                                <p>조금 더 절약해야 해요!</p>
                            </div>

                        </div>
                    </details>
                </div>
                <div v-else class="board_box less_spend">
                    <h2><a href="javascript:void(0);" @click.prevent="openPopPDMY()" class="title">소비 줄이기</a></h2>
                    <!--소비가 없는 경우-->
                    <div class="analysis">
                        <p class="txt">계획적인 소비를 위한<br>지출목표</p>
                        <p class="txt2">지금 설정하고 실천해 보세요.</p><!--25-04-01 마침표, 띄어쓰기 수정-->
                        <a href="javascript:void(0);" @click.prevent="openPopPDMY()" class="btns md gray">예산 설정하기</a>
                    </div>
                </div>    
                                   
                <!--배너-->
                <a href="javascript:void(0);" class="gotoCok" @click.prevent="fn_movePage('PDMY4001')">
                    <img src="@/assets_v40/images/banner/img_banner_goto_cok.png" alt="나의 꿈을 현실로 NH콕뱅킹이 함께 합니다!" />
                </a>

                <a href="javascript:void(0);" class="img_banner" @click.prevent="fn_movePage('LCFD4001')"> <!--[v4.0] 2025-05-30 배너 추가 -->
                    <img src="@/assets_v40/images/banner/img_banner_spend.png" alt="월별 소비내역을 다운로드 받을 수 있어요">
                </a>

                <!--금융지식-->
                <div class="finlit" v-if="financeKlList.length > 0">
                    <a href="javascript:void(0);" class="h_tit01" role="button" @click.prevent="fn_movePage('COCT4001')">금융지식</a> <!--[v4.0] 2025-05-27 타이틀 링크 영역 수정 -->
					<div class="scroller">
						<ul>
							<li v-for="(item, idx) in financeKlList" :key="idx">
								<a href="javascript:void(0);" @click.prevent="fn_openFncKlDtl(item.cntzId)">
                                    <img :src="`/assets/images/fin_cont/${item.thmnlImgUrlnm}`" alt="" @error="emptyImg" />
									<strong>{{item.cntzTinm}}</strong>
									<span class="hash" v-if="!!item.rcmKwrdCntn">#{{item.rcmKwrdCntn}}</span>
								</a>
							</li>
						</ul>
					</div>
				</div>                                                                  
            </section>
        </div>
        <!--// content -->
        <footersV2 type="lc" />
    </page>
</template>

<script>

import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import commonService from '@/service/commonService'
import modalService from '@/service/modalService'
import {dateFormat,getDayDowCName, monthAdd, dayDiff} from '@/utils/date'

import {mapActions, mapGetters} from 'vuex'
import LCIP2007 from '@/views/page/LC/IP/LCIP2007/LCIP2007' // 정기 지출
import LCIP2002TAB from '@/components/category/LcIp2002Tab' // 유형별 지출
import LCIP4001 from '@/views/page/LC/IP/LCIP4001/LCIP4001' // 지출분석
import PDMY4033 from '@/views/page/PD/MY/PDMY4033/PDMY4033' // 지출목표(상세조회) v.40
import PDMY4032 from '@/views/page/PD/MY/PDMY4032/PDMY4032' // 지출목표 등록
import LCLE4002 from '@/views/page/LC/LE/LCLE4002/LCLE4002' // 카드 지출내역
import LCLE4003 from '@/views/page/LC/LE/LCLE4003/LCLE4003' // 페이머니 지출내역
import LCLE4004 from '@/views/page/LC/LE/LCLE4004/LCLE4004' // 선불카드 지출내역
import LCLE4104 from '@/views/page/LC/LE/LCLE4104/LCLE4104' // 현금 지출내역
import COAR4001 from '@/views/page/CO/AR/COAR4001/COAR4001' // 자산연결
import COAR4002 from '@/views/page/CO/AR/COAR4002/COAR4002' // 자산연결
import COCT4011 from '@/views/page/CO/CT/COCT4011/COCT4011'
import LCLE2107 from '@/views/page/LC/LE/LCLE2107/LCLE2107'

import {drawlineChart}  from '@/utils/canvas' //Import 선언
import LottieAnimation from 'lottie-web-vue' // import lottie-web-vue
import CmmCanvas from '@/components/CmmCanvas.vue' //canvas 공통컴퍼넌트
import CmmFlotBanner from '@/components/CmmFlotBanner.vue'  // 플로팅배너

import moment from 'moment'
import _ from 'lodash'


export default {
    name : "LCTA4001",
    data: () => {
        return {
            mydtCusno   : '',       // 마이데이터고객번호
            cusnm       : '',       // 고객명
            executeCnt  : 0,        // 실행 count

            monPrev     : false,    // 이전달 조회
            monNext     : false,    // 다음달 조회
            basYm       : null,     // 조회 기준년월 YYYYMM
            basYy       : null,     // 조회 기준년도 YYYY
            basMm       : null,     // 조회 기준월   MM
            befBasYm    : null,     // 조회 기준년월 YYYYMM (현재년월의 지난달)
            befBasYy    : null,     // 조회 기준년도 YYYY   (현재년월의 지난달)
            befBasMm    : null,     // 조회 기준월   MM     (현재년월의 지난달)
            initBasYm   : '',       // 초기 기준년월
            todayBasYm  : '',       // 현재년월
        
            /*------------------------------------------*/
            cusMmtpXpsOut 	: '', 	// 고객 월별 지출
            bmmCmprXpsAm    : 0 ,   // 지출증감액
            /*------------------------------------------*/
            
            peerGrpRto : 0,
            cusRto : 0,
            indDsc : 0,
            topXpsAmMchtnm : '',
            topXpsCntMchtnm : '',
            amSize : 0 ,
            cntSize : 0,
            peerIndDsc : '',

            fxtmCn : 0 ,
            fxtmSt01Cn : 0 ,
            
            xpsObt          : '', 			// 나의 목표(지출 목표)
            tmp             : '',
            selectTab		: "CARD",	// Tab(0:카드, 1:페이, 2:현금)
            oldTab          : "",

            mydtCusno		: "",		// 마이데이터고객번호
            inqYm			: "",		// 조회년월
            xpsTotAmt		: 0,		// 지출총합계(카드+페이머니+기타), 선불지출제외
            topXpsCtgrC     : 0,        // 최고지출카테고리코드
            topXpsCtgrCNm   : 0,        // 최고지출카테고리코드명
            cardApvSam		: 0,		// 카드승인금액합계
            bmmCardApvSam	: 0,		// 전월카드승인금액합계
            cashXpsSam		: 0,		// 현금지출금액합계
            bmmCashXpsSam	: 0,		// 전월현금지출금액합계
            ppayXpsSam		: 0,		// 선불지출금액합계
            payMnySam		: 0,		// 페이머니금액합계
            bmmPayMnySam	: 0,		// 전월페이머니금액합계
            ppayCdApvSam    : 0,    	// 선불카드승인금액합계
            bmmPpayCdApvSam : 0,    	// 전월선불카드승인금액합계
            rqsSam			: 0,		// 통신요금청구금액합계
            xpsObtAm		: 0,		// 지출목표금액
            cardXpsCn   	: 0,		// 카드목록건수
            cashCn			: 0,		// 현금목록건수
            ppayCn			: 0,		// 선불목록건수
            payMnyCn		: 0,		// 페이머니목록건수
            ctgrCn			: 0,    	// 카테고리별지출목록건수
            ppayCdCn        : 0,		// 선불카드목록건수
            rqsCn			: 0,		// 통신청구목록건수            
            rcnXpsCn        : 0,        // 최근소비목록건수
            currYm			: "",		// 현재년월(조회년월과 비교용도)


            // 각 목록 정렬기준
            // 카드 : 카드명, 기타 : 이체 -> 현금 순서, 페이머니 : 권면명칭, 선불결제 : 페이명
            cardXpsList		: [],		// 카드목록
            cashList		: [],   	// 현금목록
            ppayList		: [],   	// 선불목록
            payMnyList		: [],		// 페이머니목록
            ctgrList		: [],		// 카테고리별지출목록
            ppayCdList      : [],   	// 선불카드목록
            rqsList			: [],		// 통신청구목록
            modifiedRqsList : [],		// 기관별로 묶은 통신청구목록            
            rcnXpsList      : [],       // 최근소비목록
            fxtmList        : [],       // 다가올 지출(정기지출)

            rcnXpsDd        : 0,
            rcnXpsDayName   : '',       // 요일
            xpsUpDownClass  : '',       // detail, detail up, detail down, detail no, detail not
            xpsMns          : '',       // 카드, 페이, 현금
            xpsMns2         : '',       // 카드를, 페이를, 현금을
            xpsUpDownDsc    : '',       // 많이, 적게, 같게
            xpsMnsAm        : 0,        //                

            // 주요소비
            cmprTop1CtrgNm  : '',       // 전월대비 최고변동 카테고리
            
            top1BasYm             : '',
            top1XpsCtgrC          : '',
            top1XpsCtgrNm         : '',
            top1XpsAm             : 0,
            top1XpsRto            : 0,
            top1XpsOrd            : 0,
            top1ChartRto          : 0,
            top1Bf1Ym             : '',
            top1Bf1XpsAm          : 0,
            top1Bf1XpsRto         : 0,
            top1Bf1XpsOrd         : 0,
            top1Bf1ChartRto       : 0,
            top1BmmCmprXpsAm      : 0,
            top1BmmCmprXpsOrd     : 0,
            top1BmmCmprAbsXpsAm   : 0,
            top1BmmCmprAbsXpsOrd  : 0,
            top1XpsTopAm          : 0,
            top1XpsAmUpDown       : '',
                                
            top2XpsCtgrC          : '',
            top2XpsCtgrNm         : '',
            top2XpsAm             : 0,
            top2XpsRto            : 0,
            top2XpsOrd            : 0,
            top2ChartRto          : 0,
            top2Bf1XpsAm          : 0,
            top2Bf1XpsRto         : 0,
            top2Bf1XpsOrd         : 0,
            top2Bf1ChartRto       : 0,
            top2BmmCmprXpsAm      : 0,
            top2BmmCmprXpsOrd     : 0,
            top2BmmCmprAbsXpsAm   : 0,
            top2BmmCmprAbsXpsOrd  : 0,
            top2XpsAmUpDown       : '',

            top3XpsCtgrC          : '',
            top3XpsCtgrNm         : '',
            top3XpsAm             : 0,
            top3XpsRto            : 0,
            top3XpsOrd            : 0,
            top3ChartRto          : 0,
            top3Bf1XpsAm          : 0,
            top3Bf1XpsRto         : 0,
            top3Bf1XpsOrd         : 0,
            top3Bf1ChartRto       : 0,
            top3BmmCmprXpsAm      : 0,
            top3BmmCmprXpsOrd     : 0,
            top3BmmCmprAbsXpsAm   : 0,
            top3BmmCmprAbsXpsOrd  : 0,
            top3XpsAmUpDown       : '',            
            
            xpsObtRto       : 0, // 소비줄이기
            xpsObtBarRto    : 0, // 소비줄이기
            xpsObtClass     : "", //소비줄이기 class
            linedata        : [],       // 최근소비목록
            finalUpdateDtm  : '',
            basDtm          : '',
            basDtmBf5       : '',

            cavasPos        : [],

			financeKlList	: [],	  // v4 금융지식 컨텐츠 목록


            //////// 연결자산 관련 데이터
            nacfAccList     : [],       // v4 농.축협 계좌 리스트
            userAsetList    : [], // 개인신용정보전송요구내역
            /* 은행 */
            bankList        : [], // 은행업권 데이터
            bankExprList    : [], // 은행업권 만료 데이터
            bankCnt         : 0,  // 은행업권 건수
            /* 카드 */
            cardList        : [], // 카드업권 데이터
            cardExprList    : [], // 카드업권 만료 데이터
            cardCnt         : 0,  // 카드업권 건수
            /* 페이 */
            efinList        : [], // 전자금융업권 데이터
            efinExprList    : [], // 전자금융업권 만료 데이터
            efinCnt         : 0,  // 전자금융업권 건수
            /* 통신 */
            telecomList     : [], // 통신업권 데이터
            telecomExprList : [], // 통신업권 만료 데이터
            telecomCnt      : 0,  // 통신업권 건수

            codeNmList 		: [   // 업권 코드별 명칭 리스트
				{"codeVal":"bank", 		"codeNm":"은행"		},
				{"codeVal":"card", 		"codeNm":"카드"		},
				{"codeVal":"efin", 		"codeNm":"전자금융"	},
				{"codeVal":"telecom", 	"codeNm":"통신"		},
            ],  

            assetConnCnt    : 0,  // 은행, 카드, 전자금융 건수 합계
            amtHiddenYn     : false,    // 금액 보기/숨김 구분(true:숨김, false:보기)

            cardYn : false,
            payYn  : false, 
            cashYn : false,
            nacfAccCnt : 0,
        }
    },
    computed : {
        ...mapGetters('myassets', [
            'isMyAssetGathering','lastUpdateDtm','myAssetsBzRgCnt','myAssetInfo','myAssetsBzrgList'
        ]), 

        // 자산연결 기관 개수
        orgConCnt(){
            return ( this.nacfAccCnt > 0 ? 1 : 0 ) + this.bankCnt + this.cardCnt + this.efinCnt || 0
        },
        // 자산연결 기관 개수
        cardConCnt(){
            return this.cardCnt || 0
        },
        // 자산연결 기관 개수
        payConCnt(){
            return this.efinCnt || 0
        },
        // 자산연결 기관 개수
        bankConCnt(){
            return ( this.nacfAccCnt > 0 ? 1 : 0 ) + this.bankCnt || 0
        },                        

    },
    watch: {
        isMyAssetGathering (value) {
            if(!value) this.getData()
        },
    },    
    created() {
        this.date       = new Date()
        this.todayBasYm = dateFormat(new Date(), "YYYYMM")
        this.basYm      = dateFormat(new Date(), "YYYYMM")
        this.basMm      = dateFormat(new Date(), "MM")
        this.basDt      = dateFormat(new Date(), "YYYYMMDD")
        this.basDtm     = dateFormat(new Date(), "YYYYMMDDhhmm")
        this.mydtCusno  = this.getUserInfo("mydtCusno")
        this.cusnm      = this.getUserInfo("cusnm")
        
        this.basDtm     = dateFormat(new Date(), "YYYYMMDDhhmm")
        this.basDtmBf5  = this.date.getMinutes() - 25
    },
    mounted() {
        this.initComponent()
        
        // 자산수집 mutation 이벤트 감지 
        this.getGatheringListenSubscribe()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

        this.slick () //슬릭
    },
    methods: {
        ...mapActions('myassets', [
            'getAllMyAssetInfo',
            'getMyAssetInfo'
        ]),        
        initComponent() {
            this.mydtCusno  = this.getUserInfo('mydtCusno')
            this.currYm     = dateFormat(new Date(), 'YYYYMM')
            this.inqYm      = dateFormat(new Date(), 'YYYYMM')      // 조회년월(초기세팅은 현재년월)
            
            // 금액 숨김
            this.amtHiddenYn = this.getSecretAmInfo().includes('LC')

            /* 자산연결 데이터 조회 */
            this.initData()
            this.getAssetConnData()

            if(this.routeParams?.openPopup === 'LCIP2007') {
                this.openPopFxtm()
            }

        },
        slick () {
           var $banner =  $(".slick_banner")
           
           $banner.each(function(){
                let $this = $(this)

                $(".inner", $this).on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
                    var i = (currentSlide ? currentSlide : 0 ) + 1 
                    $(".paging", $this).html('<em>'+i + '</em> / ' + slick.slideCount)  
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

           });
        } , 
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
        // Tab선택
        fn_selectTab(gbn){
            if(this.selectTab != gbn) {
                this.selectTab = gbn
            }	            

            if (gbn == "CARD")	{

                this.xpsMns  = "카드"
                this.xpsMns2 = "카드를"

                if ( this.cardConCnt > 0 ) {
                    this.xpsMnsAm       = this.cardApvSam
                    this.bmmXpsMnsAm    = this.bmmCardApvSam  
                    this.xpsUpDownClass = "" 
                } else {
                    this.xpsUpDownClass = "not"
                }

                
            } else if (gbn == "PAY") {
                
                this.xpsMns  = "페이"
                this.xpsMns2 = "페이를"

                if ( this.payConCnt > 0 ) {
                    this.xpsMnsAm       = this.payMnySam + this.ppayCdApvSam
                    this.bmmXpsMnsAm    = this.bmmPayMnySam + this.bmmPpayCdApvSam  
                    this.xpsUpDownClass = "" 
                } else {
                    this.xpsUpDownClass = "not"
                }                
  
            } else if (gbn == "CASH") {
                
                this.xpsMns  = "현금"
                this.xpsMns2 = "현금을"

                if ( this.bankConCnt > 0 ) {
                    this.xpsMnsAm       = this.cashXpsSam
                    this.bmmXpsMnsAm    = this.bmmCashXpsSam   
                    this.xpsUpDownClass = ""
                } else {
                    this.xpsUpDownClass = "not"
                }                
                  
            }            

            if (this.xpsUpDownClass != "not") {

                if (this.xpsMnsAm > 0) {
                    if (this.xpsMnsAm > this.bmmXpsMnsAm || this.bmmXpsMnsAm == undefined) {
                        this.xpsUpDownDsc   = "많이"
                        this.xpsUpDownClass = "up"
                    } else if (this.xpsMnsAm < this.bmmXpsMnsAm) {
                        this.xpsUpDownDsc   = "적게"
                        this.xpsUpDownClass = "down"
                    } else if (this.xpsMnsAm == this.bmmXpsMnsAm) {
                        this.xpsUpDownDsc   = ""
                        this.xpsUpDownClass = ""
                    }
                } else  if (this.xpsMnsAm == 0) {
                        this.xpsUpDownDsc   = ""
                        this.xpsUpDownClass = "no"               
                }
            }

           this.$nextTick(()=>{
                if (this.xpsMnsAm > 0) {
                    if (this.xpsMnsAm > this.bmmXpsMnsAm) {
                        
                        if (this.$refs.walletUp != undefined) {
                            this.$refs.walletUp.stop()
                            this.$refs.walletUp.play()
                        }
                    } else if (this.xpsMnsAm < this.bmmXpsMnsAm) {
                        if (this.$refs.walletDown != undefined) {
                            this.$refs.walletDown.stop()
                            this.$refs.walletDown.play()
                        }                        
                    } else if (this.xpsMnsAm == this.bmmXpsMnsAm) {
                        if (this.$refs.wallet != undefined) {
                            this.$refs.wallet.stop()
                            this.$refs.wallet.play()
                        }
                    }
                } else if (this.xpsMnsAm == 0) {    
                        if (this.$refs.walletNo != undefined) {
                            this.$refs.walletNo.stop()
                            this.$refs.walletNo.play()
                        }
                }
            })

            console.log("this.xpsMns : ", this.xpsMns)
            console.log("this.xpsMnsAm : ", this.xpsMnsAm)
            console.log("this.bmmXpsMnsAm : ", this.bmmXpsMnsAm)
            console.log("this.xpsUpDownDsc : ", this.xpsUpDownDsc)
            console.log("this.xpsUpDownClass : ", this.xpsUpDownClass)
        },       
            
        initData() {

            //////// 연결자산 관련 데이터
            this.userAsetList    = [] // 개인신용정보전송요구내역
            /* 은행 */
            this.bankList        = [] // 은행업권 데이터
            this.bankExprList    = [] // 은행업권 만료 데이터
            /* 카드 */
            this.cardList        = [] // 카드업권 데이터
            this.cardExprList    = [] // 카드업권 만료 데이터
            /* 페이 */
            this.efinList        = [] // 전자금융업권 데이터
            this.efinExprList    = [] // 전자금융업권 만료 데이터
            /* 통신 */
            this.telecomList     = [] // 통신업권 데이터
            this.telecomExprList = [] // 통신업권 만료 데이터

        },
        /*
         * 자산 연결 데이터 조회
         */             
        getAssetConnData() {
            console.log("myAssetsBzrgList=======",this.myAssetsBzrgList)

            // 은행업권
            this.bankList = [];
            this.bankExprList = [];
            this.bankCnt      = 0
            let tmpBankList	= (typeof _.find(this.myAssetsBzrgList, {"comnCVal":"bank"}) !== "undefined") ? _.find(this.myAssetsBzrgList, {"comnCVal":"bank"}).orgList : []
            for(let i=0; i<tmpBankList.length; i++) {
                tmpBankList[i].orgBizDsc = "bank"
                if(tmpBankList[i].acsTokenDusDtm == '0' && dayDiff(tmpBankList[i].tmsEdDt, this.currentDate) >= 0) {
                    // 토큰만료일자가 0이고, 전송종료일자가 현재일자보다 크거나 같을경우 연결목록에 포함
                    this.bankList.push(tmpBankList[i]);
                    this.bankCnt = this.bankList.length;
                } else {
                    // 그 외 경우 만료로 판단
                    this.bankExprList.push(tmpBankList[i])
                }
            }                 

            // 카드업권
            this.cardList = [];
            this.cardExprList = [];
            let tmpCardList 	= (typeof _.find(this.myAssetsBzrgList, {"comnCVal":"card"}) !== "undefined") 	? _.find(this.myAssetsBzrgList, {"comnCVal":"card"}).orgList : []
            this.cardCnt = 0;
            for(let i=0; i<tmpCardList.length; i++) {
                tmpCardList[i].orgBizDsc = "card"
                if(tmpCardList[i].acsTokenDusDtm == '0' && dayDiff(tmpCardList[i].tmsEdDt, this.currentDate) >= 0) {
                    this.cardList.push(tmpCardList[i])
                    this.cardCnt = this.cardList.length;
                } else {
                    this.cardExprList.push(tmpCardList[i])
                }
            }

            // 전자금융업권
            this.efinList = [];
            this.efinExprList = [];
            let tmpEfinList 	= (typeof _.find(this.myAssetsBzrgList, {"comnCVal":"efin"}) !== "undefined") 	? _.find(this.myAssetsBzrgList, {"comnCVal":"efin"}).orgList : []
            this.efinCnt      = 0            
            for(let i=0; i<tmpEfinList.length; i++) {
                tmpEfinList[i].orgBizDsc = "efin"
                if(tmpEfinList[i].acsTokenDusDtm == '0' && dayDiff(tmpEfinList[i].tmsEdDt, this.currentDate) >= 0) {
                    this.efinList.push(tmpEfinList[i])
                    this.efinCnt = this.efinList.length
                } else {
                    this.efinExprList.push(tmpEfinList[i])
                }
            }  

            // 통신업권
            this.telecomList = [];
            this.telecomExprList = [];
            let tmpTelecomList	= (typeof _.find(this.myAssetsBzrgList, {"comnCVal":"telecom"}) !== "undefined")? _.find(this.myAssetsBzrgList, {"comnCVal":"telecom"}).orgList : []
            this.telecomCnt      = 0
            for(let i=0; i<tmpTelecomList.length; i++) {
                tmpTelecomList[i].orgBizDsc = "telecom"
                if(tmpTelecomList[i].acsTokenDusDtm == '0' && dayDiff(tmpTelecomList[i].tmsEdDt, this.currentDate) >= 0) {
                    this.telecomList.push(tmpTelecomList[i])
                    this.telecomCnt = this.telecomList.length
                } else {
                    this.telecomExprList.push(tmpTelecomList[i])
                }
            } 

            // 사용자 중앙회 계좌 조회
            const config = {
                url : "/co/am/08r03", 
                data : {
                    mydtCusno : this.getUserInfo("mydtCusno")
                }
            }
            apiService.call(config).then(response => {
                this.nacfAccList = response.nacfAccList || []                
                this.nacfAccCnt  = response.nacfAccCnt || 0

                this.bankCnt =  this.bankCnt + this.nacfAccCnt;

                /*은행, 카드, 전자금융 업권의 자산연결 건수 > 0 지출 데이터 조회*/
                this.assetConnCnt = this.bankCnt + this.cardCnt + this.efinCnt;
                
                /* 지출 데이터 조회 */
                this.getData() 
                // 금융지식 조회           
                this.getFinanceKlList()                
            })                   
        },
        /**
         * 금액 숨김/보기 처리
         */
        fn_amtHidden(type) {
            this.amtHiddenYn = type
            this.setSecretAmInfo('LC', this.amtHiddenYn)
        },
        /**
         * 카드/페이/현금 상세내역 펼침상태 설정
         */
        setAssetDtl(chkTab){
            let chkYn = false
            if (chkTab === 'card') {
                this.cardYn  = this.cardYn === false ? true : false
            } else if (chkTab === 'pay') {
                this.payYn  = this.payYn === false ? true : false
            } else if (chkTab === 'cash') {
                this.cashYn  = this.cashYn === false ? true : false                
            }            
        },
        /**
         * 카드/페이/현금 탭 상세내역 펼침상태 조회
         */
        getAssetDtl(chkTab){
            let tabChkYn = false
            if (chkTab === 'card') {
                tabChkYn = this.cardYn
            } else if (chkTab === 'pay') {
                tabChkYn = this.payYn
            } else if (chkTab === 'cash') {
                tabChkYn = this.cashYn
            }

            return tabChkYn
        },
		/**
		 * 금융지식 컨텐츠 조회
		 */
        getFinanceKlList(){ 
            this.getFinanInfo('LCTA4001', 6, false).then(response => {
                this.financeKlList = response
                // *출력값
                // -썸네일이미지URL명  = thmnlImgUrlnm
                // -글번호 = cntzId
                // -컨텐츠제목 = cntzTinm
                // -추천연령 = asetAgLrgDsnm
            })
        }, 
		/**
		 * 금융지식 이미지가 없는 경우
		 */        
		emptyImg(e) {
			e.target.src = new URL("@/assets_v40/images/event/ev_noimg.png", import.meta.url).href
		},  
		/**
		 * 날자 차이
		 */ 
        fn_dayDiff(to, from){
			return dayDiff(to , from)
		},             
        /*
         * 지출내역 데이터 조회
         */
        getData() {         
            const config = {
                url: '/lc/ta/01r01', 
                data: {
                    mydtCusno : this.mydtCusno,
                    basYm     : this.basYm,
                    basDt     : this.basDt,
                    inqStrDt  : this.basYm + '01',
                    inqEndDt  : this.basDt,
                }
            }
            this.executeCnt++; 
            apiService.call(config).then(response =>{
                console.log('getData() ======> response', JSON.parse(JSON.stringify(response)))
                
                this.mydtCusno        = response.mydtCusno || ''
                this.inqYm            = response.inqYm || this.basYm || ''

                // 고객월별지출
                this.cusMmtpXpsOut    = response.cusMmtpXpsOut || ''

                this.xpsTotAmt        = response.xpsTotAmt || 0

                // 카드
                this.cardApvSam       = response.cardApvSam || 0
                this.bmmCardApvSam    = response.bmmCardApvSam || 0
                this.cardXpsCn        = response.cardCn || 0
                this.cardXpsList      = response.cardList || []

                // 페이머니
                this.payMnySam        = response.payMnySam || 0
                this.bmmPayMnySam     = response.bmmPayMnySam || 0
                this.payMnyCn         = response.payMnyCn || 0
                this.payMnyList       = response.payMnyList || []

                // 선불카드
                this.ppayCdApvSam     = response.ppayCdApvSam || 0
                this.bmmPpayCdApvSam  = response.bmmPpayCdApvSam || 0
                this.ppayCdCn         = response.ppayCdCn || 0
                this.ppayCdList       = response.ppayCdList || []

                // 현금
                this.cashXpsSam       = response.cashXpsSam || 0
                this.bmmCashXpsSam    = response.bmmCashXpsSam || 0
                this.cashCn           = response.cashCn || 0
                this.cashList         = response.cashList || []

                // 연결금융기관수 = 연결금융기관수 + 현금건수가 0 이상이면 1
                this.bankCnt = this.bankCnt + (this.cashList.length > 0 ? 1 : 0)

                //chsvKdnm: '현금'
                //let tmpCash =  this.cashList.find(el => el.chsvKdnm === '현금')
                //console.log("tmpCash-----------------------------------------------------",tmpCash)


                // 통신
                this.rqsSam           = response.rqsSam || 0
                this.rqsCn            = response.rqsCn || 0
                this.rqsList          = response.rqsList

                // 최근소비
                this.rcnXpsList       = response.rcnXpsList || []

                // 주요소비
                this.ctgrCn           = response.ctgrCn || 0
                this.ctgrList         = response.ctgrList || []

                // 정기지출
                this.fxtmCn           = response.fxtmCn || 0
                this.fxtmSt01Cn       = response.fxtmSt01Cn
                
                this.fxtmList         = response.fxtmList || []

                // 소비줄이기 (금융 지출목표)
                this.xpsObt           = response.xpsObt
                
                if (this.xpsObt != null) {
                    //this.xpsObtAm         = this.xpsObt.xpsObtAm
                    this.xpsObtRto        = (this.xpsObt.xpsRzsAm / this.xpsObt.xpsObtAm) * 100
                    this.xpsObtBarRto     = this.xpsObtRto * 0.86 >= 99 ? 99 : this.xpsObtRto * 0.86

                    if (this.xpsObtRto <= 85) {
                        this.xpsObtClass = ""
                    } else if (this.xpsObtRto > 85 && this.xpsObtRto <= 100) {
                        this.xpsObtClass = "nearby"
                    } else if (this.xpsObtRto >  100) {
                        this.xpsObtClass = "up"
                    }
                }

                // 통신 : 기관별로 묶음
                this.modifiedRqsList = this.modifyRqsList(this.rqsList)
                console.log('getData this.modifiedRqsList', JSON.parse(JSON.stringify(this.modifiedRqsList)))

                // 최근소비
                let rcnTrDt = ''
                if (this.rcnXpsList.length > 0)
                {
                    rcnTrDt         = this.rcnXpsList[0].trDt
                    this.rcnXpsDd   = dateFormat(rcnTrDt, "DD")
                    this.rcnXpsDayName = getDayDowCName(rcnTrDt)
                }

                // 주요소비
                if (this.ctgrCn > 0)
                {
                    let i = 0
                    for(i=0; i < this.ctgrCn; i++)
                    {
                        if (this.ctgrList[i].xpsOrd == 1)
                        {
                            this.xpsCtgrTop1Nm        = this.ctgrList[i].xpsCtgrNm
                            this.xpsCtgrTop1Rto       = this.ctgrList[i].xpsRto
                            this.xpsCtgrTop1UpDown    = this.cmprXpsAmUpDown(this.ctgrList[i].bmmCmprXpsAm, '')
                                                      
                            this.xpsCtgrTop1Am        = this.ctgrList[i].xpsAm
                            this.xpsCtgrTop1Bf1Am     = this.ctgrList[i].bf1XpsAm
                                                      
                            this.bf1Ym                = this.ctgrList[i].bf1Ym

                            this.top1BasYm            = this.ctgrList[i].basYm
                            this.top1XpsCtgrC         = this.ctgrList[i].xpsCtgrC
                            this.top1XpsCtgrNm        = this.ctgrList[i].xpsCtgrNm
                            this.top1XpsAm            = this.ctgrList[i].xpsAm
                            this.top1XpsRto           = this.ctgrList[i].xpsRto
                            this.top1XpsOrd           = this.ctgrList[i].xpsOrd
                            this.top1ChartRto         = this.ctgrList[i].chartRto
                            this.top1Bf1Ym            = this.ctgrList[i].bf1Ym
                            this.top1Bf1XpsAm         = this.ctgrList[i].bf1XpsAm
                            this.top1Bf1XpsRto        = this.ctgrList[i].bf1XpsRto
                            this.top1Bf1XpsOrd        = this.ctgrList[i].bf1XpsOrd
                            this.top1Bf1ChartRto      = this.ctgrList[i].bf1ChartRto
                            this.top1BmmCmprXpsAm     = this.ctgrList[i].bmmCmprXpsAm
                            this.top1BmmCmprXpsOrd    = this.ctgrList[i].bmmCmprXpsOrd
                            this.top1BmmCmprAbsXpsAm  = this.ctgrList[i].bmmCmprAbsXpsAm
                            this.top1BmmCmprAbsXpsOrd = this.ctgrList[i].bmmCmprAbsXpsOrd
                            this.top1XpsTopAm         = this.ctgrList[i].xpsTopAm

                            this.top1XpsAmUpDown      = this.cmprXpsAmUpDown(this.ctgrList[i].bmmCmprXpsAm, '')

                        } else if (this.ctgrList[i].xpsOrd == 2) {
                            this.top2XpsCtgrC         = this.ctgrList[i].xpsCtgrC
                            this.top2XpsCtgrNm        = this.ctgrList[i].xpsCtgrNm
                            this.top2XpsAm            = this.ctgrList[i].xpsAm
                            this.top2XpsRto           = this.ctgrList[i].xpsRto
                            this.top2XpsOrd           = this.ctgrList[i].xpsOrd
                            this.top2ChartRto         = this.ctgrList[i].chartRto
                            this.top2Bf1XpsAm         = this.ctgrList[i].bf1XpsAm
                            this.top2Bf1XpsRto        = this.ctgrList[i].bf1XpsRto
                            this.top2Bf1XpsOrd        = this.ctgrList[i].bf1XpsOrd
                            this.top2Bf1ChartRto      = this.ctgrList[i].bf1ChartRto
                            this.top2BmmCmprXpsAm     = this.ctgrList[i].bmmCmprXpsAm
                            this.top2BmmCmprXpsOrd    = this.ctgrList[i].bmmCmprXpsOrd
                            this.top2BmmCmprAbsXpsAm  = this.ctgrList[i].bmmCmprAbsXpsAm
                            this.top2BmmCmprAbsXpsOrd = this.ctgrList[i].bmmCmprAbsXpsOrd

                            this.top2XpsAmUpDown      = this.cmprXpsAmUpDown(this.ctgrList[i].bmmCmprXpsAm, '')

                        } else if (this.ctgrList[i].xpsOrd == 3) {
                            this.top3XpsCtgrC         = this.ctgrList[i].xpsCtgrC
                            this.top3XpsCtgrNm        = this.ctgrList[i].xpsCtgrNm
                            this.top3XpsAm            = this.ctgrList[i].xpsAm
                            this.top3XpsRto           = this.ctgrList[i].xpsRto
                            this.top3XpsOrd           = this.ctgrList[i].xpsOrd
                            this.top3ChartRto         = this.ctgrList[i].chartRto
                            this.top3Bf1XpsAm         = this.ctgrList[i].bf1XpsAm
                            this.top3Bf1XpsRto        = this.ctgrList[i].bf1XpsRto
                            this.top3Bf1XpsOrd        = this.ctgrList[i].bf1XpsOrd
                            this.top3Bf1ChartRto      = this.ctgrList[i].bf1ChartRto
                            this.top3BmmCmprXpsAm     = this.ctgrList[i].bmmCmprXpsAm
                            this.top3BmmCmprXpsOrd    = this.ctgrList[i].bmmCmprXpsOrd
                            this.top3BmmCmprAbsXpsAm  = this.ctgrList[i].bmmCmprAbsXpsAm
                            this.top3BmmCmprAbsXpsOrd = this.ctgrList[i].bmmCmprAbsXpsOrd

                            this.top3XpsAmUpDown      = this.cmprXpsAmUpDown(this.ctgrList[i].bmmCmprXpsAm, '')

                        }

                        this.top1BasYm 
                        this.top1Bf1Ym
                        
                        if (this.ctgrList[i].bmmCmprAbsXpsOrd == 1)
                        {
                            this.cmprTop1CtrgNm = this.ctgrList[i].xpsCtgrNm
                        }
                    }
                }
                
                this.callJQueryFncExcute()

                // this.$nextTick(()=>{
                //     this.initEvent()
                    
                //     if (this.executeCnt == 1) infoToolipHandler() // 툴팁 클릭이벤트 생성

                // })


            }).then(()=>{
                // 카드 Tab 선택
                this.fn_selectTab("CARD")

                //주요소비 - 챠트 그리기
                /**/
                //const linedata = [100, 50, 60]; //이번달 1위, 2위, 3위 항목순 비율
                this.$nextTick(() => {
                    this.linedata = [this.top1Bf1ChartRto,this.top2Bf1ChartRto,this.top3Bf1ChartRto]
                })
                    
                console.log("getData() ======> this.linedata", this.linedata)

            })
        },

		/**
		 * 금융지식 컨텐츠 상세 팝업오픈
		 */
		fn_openFncKlDtl(cntzId) {
			const config = {
				component: COCT4011,
				params: cntzId
			}
			modalService.openPopup(config)
		},               
        /**
         * 
         */
        cmprXpsAmUpDown(cmprXpsAm, className){
            let upDown = ''

            if (cmprXpsAm > 0)
            {
                upDown =  className + " " + 'up' 
            } else if (cmprXpsAm < 0) {
                upDown =  className + " " + 'down' 
            } else {
                upDown =  className
            }

            return upDown
        },

        // 기관별로 묶기
        modifyRqsList(objArray){
            console.log('modifyRqsList objArray ==================', JSON.parse(JSON.stringify(objArray)))
            let list = objArray || []
            let result = _.chain(list)
                .uniqBy('infOfrmnOrgC')
                .map(d => {
                    return {
                        infOfrmnOrgC 	: d.infOfrmnOrgC,
                        infOfrmnOrgCNm  : d.infOfrmnOrgCNm,
                        comuRqsAmSum    : _.sumBy(_.filter(list, {infOfrmnOrgC : d.infOfrmnOrgC}), d2 => {return d2.comuRqsAm}),
                        list         	: _.filter(list, {infOfrmnOrgC : d.infOfrmnOrgC})
                    }
                })
                .orderBy('infOfrmnOrgCNm', 'asc')
                .value()
            return result
        },   

        /*
         * 기준일 이동 및 재조회 이벤트
         */
        btn_moveMonth(dsc) {
            this.fn_moveMonth(dsc)
            this.getData()
        },
        /*
         * 기준일자 계산
         */
        fn_moveMonth(dsc) {
            if (this.monPrev && dsc == "P") {
                this.basYm = monthAdd(-1, this.basYm, "YYYYMM")
            }

            if (this.monNext && dsc == "N") {
                this.basYm = monthAdd(1, this.basYm, "YYYYMM")
            }

            this.basYy = dateFormat(this.basYm, "YYYY")
            this.basMm = dateFormat(this.basYm, "M")
            console.log("기준년월 : "+this.basMm )

            this.befBasYm = dateFormat(monthAdd(-1, this.basYm), 'YYYYMM') // 선택한 월의 지난달
            this.befBasYy = dateFormat(this.befBasYm, "YYYY")
            this.befBasMm = dateFormat(this.befBasYm, "M")

            // 다음달 조회 가능여부
            let maxMonth = this.initBasYm ? this.initBasYm : dateFormat(monthAdd(0), 'YYYYMM')
            this.monNext = this.basYm < maxMonth ? true : false

            // 이전달 조회 가능여부
            let minMonth = this.initBasYm ? dateFormat(monthAdd(-12, this.initBasYm), 'YYYYMM') : dateFormat(monthAdd(-12), 'YYYYMM')
            this.monPrev = this.basYm > minMonth ? true : false
        },
        /*
         * 팝업
         */
        openPop(viewName) {
            let compName
            if (viewName == 'LCIP2007') compName = LCIP2007 // 정기지출          
            if (viewName == 'LCIP2002TAB') compName = LCIP2002TAB // 정기지출 리포트
            if (viewName == 'PDMY4032') compName = PDMY4032 // 지출목표 등록

            if (compName == null) {
                modalService.alert("미적용")
                return
            }

            let param = { "pBasYm" : this.basYm }

            const config = {
                component: compName,
                params : param
            }

            modalService.openPopup(config).then(() => {
                // if (viewName == 'PDMY2005') {
                if (viewName == 'PDMY4032') {    
                    this.getData()
                }
            })
        },
        openPopFxtm() {
            const config = {
                component: LCIP2007
            }
            modalService.openPopup(config).then((res) => {
                if (res === 'reSelect') this.getData()
            })
        },
        /*
         * 목표등록 팝업
         */
        openPopPDMY() {
            const config = {
                component: PDMY4032
            }
            modalService.openPopup(config).then((response) => {
                if (response == "reSelect") {
                    this.getData()
                }
            })
        },
        /*
         * 결제수단별 팝업
         */
        openPopLCLE(viewName) {
            let compName

            if (viewName == 'LCLE4002') compName = LCLE4002 // 카드 
            if (viewName == 'LCLE4003') compName = LCLE4003 // 페이
            if (viewName == 'LCLE4104') compName = LCLE4104 // 현금

            // selectList ALL 카드상세화면 호출시 전체카드로 표기용
            // inqDsc     ALL 기타상세화면 호출시 전체로 표기용
            var param = { "mydtCusno": this.mydtCusno
                            , "inqYm": this.basYm
                            , "cdcoCdWrsnm": "전체카드"
                            , "infOfrmnOrgC": ""
                            , "mydtCdId": "" 
                        }
            const config = {
                component: compName,
                params : param
            }
            modalService.openPopup(config).then(() => {
                //this.getData()
            })
        },
        // 년월 슬라이드팝업 호출
        openSlideMonthPop() {
            // if (this.monLimit == 0) { return; }

            let maxMonth = this.initBasYm ? this.initBasYm : dateFormat(monthAdd(0), 'YYYYMM')
            let minMonth = this.initBasYm ? dateFormat(monthAdd(-12, this.initBasYm), 'YYYYMM') : dateFormat(monthAdd(-12), 'YYYYMM')

            const config = {
                params: {
                    title        : '년월 선택',
                    yyyymm       : this.basYm,
                    limit        : 0,
                    includeCurYm : 'Y', // 현재월 포함여부
                    limitFromTo  : { minMonth, maxMonth }
                }
            }

            modalService.openSlideSelectMonth(config).then(response => {
                this.basYm = response
                this.fn_moveMonth('')
                this.getData()
            })
        },

        openCardConnect() {
            const config = {
                component : COAR4002,
                params : {
                    isExternal: true,
                    orgDsc: 'card'
                }
            }
            console.log(config)
            
            modalService.openPopup(config).then(() => {
                this.getData()
            })
        },

        openCashDetail(obj) {
            let inqDsc = ''
            if(obj.chsvKdnm == '이체') {
                inqDsc = 'F'
            }else if(obj.chsvKdnm == '현금') {
                inqDsc = 'C'
            }

            const config = {
                component : LCLE4104,
                params : {
                    mydtCusno		: this.mydtCusno,
                    inqYm 			: this.basYm,
                    inqDsc
                }
            }
            modalService.openPopup(config).then(() => {
                this.getData()
            })
        },
        openPayMnyDetail(obj) {
            const config = {
                component : LCLE4003,
                params : {
                    mydtCusno		: this.mydtCusno,
                    inqYm 			: this.basYm,
                    infOfrmnOrgC	: (obj==="ALL")?'':obj.infOfrmnOrgC,
                    faceNo			: (obj==="ALL")?'':obj.faceNo,
                    faceOnm         : (obj==="ALL")?'':obj.faceOnm,
                    accIdVal        : (obj==="ALL")?'':obj.accIdVal || '',
                }
            }
            modalService.openPopup(config).then(() => {
                this.getData()
            })

        },
        // 선불카드 상세 오픈
        openPpayCdDetail(obj) {
            const config = {
                component : LCLE4004,
                params : {
                    mydtCusno		: this.mydtCusno,
                    inqYm 			: this.basYm,
                    infOfrmnOrgC	: (obj==="ALL")?'':obj.infOfrmnOrgC,
                    cdcoCdWrsnm		: (obj==="ALL")?'':obj.cdcoCdWrsnm,
                    mydtCdId		: (obj==="ALL")?'':obj.mydtCdId,
                }
            }
            modalService.openPopup(config).then(() => {
                this.getData()
            })
        },
        // 지출내역 : 통신
        moveMobilePay(){
            const config = {
                component: LCLE2107,
                params : {
                    mydtCusno	: this.mydtCusno,
                    inqYm		: this.basYm,
                }
            }
            modalService.openPopup(config).then(() => {
                this.getData()
            })
        },

        /*
        * 자산등록화면이동
        */
        fn_openAssetPage() {
            // 팝업
            let compName = ""
            let params = {}

            if (this.xpsMns === "카드") {
                compName = COAR4002
                params = {
                        isExternal : true,
                        orgDsc : 'card'
                }
            } else if (this.xpsMns === "페이") {
                compName = COAR4002
                params = {
                        isExternal : true,
                        orgDsc : 'efin'
                }
            } else {
                // compName = COAR4001 
                compName = COAR4002
                params = {
                        isExternal : true,
                        orgDsc : 'bank'
                }                
            }
            //자산등록
            const config = {
                component: compName,
                params : params
            }
            modalService.openPopup(config).then(response => {
                console.log(JSON.stringify(response))
                if(response === 'move' || response === true){
                  this.getData()
                }
            })
        },
        /*
         * 페이지 이동
         */
        fn_movePage(pageId) {
            const config = {
                name : pageId
            }
            commonService.movePage(config)
        },
        /*
        * v4.0 지출목표조회 팝업
        */
        openPopTarget() {
            var param = { "stYm": this.basYm, "preXpsAm": this.xpsObt.xpsObtAm}
            const config = {
                component: PDMY4033,
                params : param
            }
            modalService.openPopup(config).then(() => {
                this.getData()
            })
        },       
        getYmd(trDt){
            return dateFormat(trDt, 'DD')
        },
        xpsStNm(xpsSt){
            let xpsStNm = ''
            if (xpsSt == 'EXPSTSC01') {
                xpsStNm = '완료'
            } else if (xpsSt == 'EXPSTSC02') {
                xpsStNm = '미확인'
            } else if (xpsSt == 'EXPSTSC03') {
                xpsStNm = '예정'
            } else if (xpsSt == 'EXPSTSC04') {
                xpsStNm = '해당없음'
            }
            return xpsStNm
        },
        openCardDetail(obj){
            const config = {
                component: LCLE4002,
                params : {
                    mydtCusno		: this.mydtCusno,
                    inqYm 			: this.basYm,
                    infOfrmnOrgC	: (obj==="ALL")?'':obj.infOfrmnOrgC,
                    mydtCdId		: (obj==="ALL")?'':obj.mydtCdId,
                    cdcoCdWrsnm		: (obj==="ALL")?'전체카드':obj.cdcoCdWrsnm,
                }
            }
            modalService.openPopup(config).then(() => {
                this.getData()
            })
        },

        initEvent() {
        //jQuery(document).ready(function(){
            //막대그래프 값세팅
            $('.inPopTypeChart .pension_bar_chart .pension_bar').each(function(){
                $(this).css({'width':$(this).find('em').text()+'%'});
            });
			var cnt = $('.pension_bar.blind').length, //0인 항목 갯수
					bleq = $('.pension_bar.blind').index(); //0인 항목 위치
			//console.log("갯수 == "+cnt+", blind위치 == "+bleq);
			if(cnt == 1){//0인 항목이 한개인 경우
				switch(bleq){
					case 0://0인 항목이 왼쪽인 경우
						$(".pension_bar:eq(1)").addClass('leftBR');
					break;
					case 2://0인 항목이 오른쪽인 경우
						$(".pension_bar:eq(1)").addClass('rightBR');
					break;
				}
			}else if(cnt == 2){//최대값만 보이는 경우
				$('.pension_bar.pop').addClass('allBR');
			}
            //예산 그래프
            var progressBar = $('.progressBar .bar');
            
            progressBar.each(function(){
                var progressNum = $(this).children().find('.popover .num').text();
                var popoverWrap = $(this).children('.popover_wrap');

                if(progressNum >= 100) {
                    progressNum = 100;
                    $(this).addClass('over');
                    popoverWrap.css('transform','translateX(-100%)');
                    popoverWrap.animate({
                        left: progressNum + "%"
                    },2000,function(){
                        popoverWrap.addClass('full');
                    });
                } else if(progressNum == 0) {
                    popoverWrap.addClass('zero');
                } else {
                    popoverWrap.animate({
                        left: progressNum +'%'
                    },2000);
                }

                progressBar.css('width','0');
                popoverWrap.css('left','0');
                $(this).animate({
                    width: progressNum + '%',
                },2000);
                
            });
            //더보기
            $('button.bottomBtn').unbind('click').on('click',function(){
                var _this = $(this);
                _this.toggleClass('up').prev().toggleClass('open');
                if(_this.hasClass('up')){
                    _this.text('접기');
                }else{
                    _this.text('더보기');
                }
            });
        },

        lottiePlay(){
            
            const lottiePlayer = this.$refs.anim; //lottie ELEMENT
            console.log("lottiePlayerlottiePlayerlottiePlayerlottiePlayerlottiePlayerlottiePlayer", lottiePlayer);
            lottiePlayer.play(1,true);
        },    
    },
    mixins: [
        commonMixin
    ],
    components: {
        Page,
        FootersV2,
        // LcCategoryV2,
        CmmCanvas,
        LottieAnimation,
        CmmFlotBanner
    },
}
</script>