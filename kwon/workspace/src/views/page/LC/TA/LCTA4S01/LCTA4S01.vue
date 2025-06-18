<!--
/*************************************************************************
* @ 서비스경로 : 큰글모드 > 지출 > 지출메인
* @ 페이지설명 : 큰글모드 > 지출 > 지출메인
* @ 파일명     : src/views/page/LC/TA/LCTA4S01/LCTA4S01.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-02-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-18              CS541597              최초작성
*************************************************************************/
-->
<template>
    <page class="content-view">
        <div id="content">
            <section class="wallet_main_senior">
                <div class="update" v-show="xpsTotAmt > 0 || (xpsTotAmt == 0 && assetConnCnt > 0)">
                    <template v-if="!isMyAssetGathering">
                        <span>{{ lastUpdateDtm }}</span>
                        <button type="button" class="btn_update" @click.prevent="fn_refreshApiCall()"><span class="blind">업데이트</span></button>
                    </template>
                    <span v-else class="ml5 num lsp0">자산 업데이트 중</span>
                </div>

                <!--개요-->
                <div class="outline" :class="fn_totAmClassSet"><!--늘은경우 up, ,줄은 경우 down class 추가-->
                    <div class="board_box" v-if="assetConnCnt == 0">
                        <!-- <p class="txt">지출수단을 연결하고<br>
                            <em>지출 흐름을 한 눈에</em><br>
                            확인해 보세요.
                        </p>
                        <div>
                            <a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openAssetCon('bank')"><span class="icon_line_right">내역 불러오기</span></a>
                        </div> -->
                        <h2>나의 지출</h2>
                        <strong class="title">
                            연결한 지출이 없어요.
                            <button type="button" class="btns" @click.prevent="fn_openAssetCon('bank')">연결</button>
                        </strong>
                        <p class="txt">지출을 연결하면<br>지출 흐름을<br>확인할 수 있어요.</p>
                    </div>
                    <div class="board_box" v-else-if="xpsTotAmt > 0">
                        <h2><a href="javascript:void(0);" @click.prevent="selectMonth">{{basMm | numberFilter}}월 지출</a></h2>

                        <div class="toggle_money" :class="amtHiddenYn ? 'on' : ''">
                            <div class="sum">
                                <span class="hide">쉿! 비밀이에요.</span> 
                                <span class="show"><em>{{xpsTotAmt | numberFilter}}</em>원</span>
                            </div>
                            <button type="button" class="btns" @click="fn_amtHidden(!amtHiddenYn)">
                                <span class="blind">금액</span>
                                <span class="hide">보기</span>
                                <span class="show">숨김</span>
                            </button>
                        </div>

                        <div class="btn_area">
                            <button type="button" class="btns refresh" @click.prevent="callMmXpsData(basYm)"><em>{{basMm | numberFilter}}</em>월 불러오기</button>
                        </div>

                        <div class="details" :class="diffBfTotAm > 0 ? 'up' : diffBfTotAm < 0 ? 'down' : ''"><!--적게 쓴경우 down, 초과인 경우 up class 추가--> 
                            <div class="analysis">
                                <div>
                                    <template v-if="diffBfTotAm > 0 || diffBfTotAm < 0">
                                        <span class="text">지난달보다</span> <span class="num">{{Math.abs(diffBfTotAm) | numberFilter}}원</span> <em>{{diffBfTotAm > 0 ? '더 쓰고 있어요.' : '덜 쓰고 있어요.'}}</em>
                                    </template>
                                    <template v-else>
                                        <span class="text">지난달과 지출이</span> <em>동일해요.</em>
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

                            <lottie-animation v-show="diffBfTotAm > 0" :animationData="require('@/assets_v40/images/lottie/icon_wallet_up.json')"  :loop="false" :autoPlay="false" aria-hidden="true" class="icon_wallet" ref="walletUp"></lottie-animation>
                            <lottie-animation v-show="diffBfTotAm < 0" :animationData="require('@/assets_v40/images/lottie/icon_wallet_down.json')"  :loop="false" :autoPlay="false" aria-hidden="true" class="icon_wallet" ref="walletDown"></lottie-animation>
                            <lottie-animation v-show="diffBfTotAm == 0" :animationData="require('@/assets_v40/images/lottie/icon_wallet.json')"  :loop="false" :autoPlay="false" aria-hidden="true" class="icon_wallet" ref="wallet"></lottie-animation>
                            <!--
                                초과인 경우 icon_wallet_up.json
                                적게 쓸 경우 icon_wallet_down.json
                            -->
                        </div>
                    </div>
                    <div class="board_box" v-else-if="xpsTotAmt == 0">
                        <h2><a href="javascript:void(0);" @click.prevent="selectMonth">{{basMm | numberFilter}}월 지출</a></h2>

                        <div class="toggle_money" :class="amtHiddenYn ? 'on' : ''">
                            <div class="sum">
                                <span class="hide">쉿! 비밀이에요.</span> 
                                <span class="show"><em>{{xpsTotAmt | numberFilter}}</em>원</span>
                            </div>
                            <button type="button" class="btns" @click="fn_amtHidden(!amtHiddenYn)">
                                <span class="blind">금액</span>
                                <span class="hide">보기</span>
                                <span class="show">숨김</span>
                            </button>
                        </div>

                        <div class="btn_area">
                            <button type="button" class="btns refresh" @click.prevent="callMmXpsData(basYm)"><em>{{basMm | numberFilter}}</em>월 불러오기</button>
                        </div>

                        <div class="details">
                            <div class="analysis">
                                <p>{{basMm | numberFilter}}월 지출
                                    <span>내역이 없어요.</span>
                                </p>
                                <span class="custom_tooltip">
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
                                </span>
                            </div>
                        </div>
                    </div>
                    <a href="javascript:void(0);" v-if="assetConnCnt != 0 && xpsTotAmt >= 0" @click.prevent="fn_openExpAnls"><em>지출분석</em><span>상세보기</span></a>
                </div>
                <!-- // 개요 -->

                <!-- 카드 -->
                <div class="board_box" v-if="cardCn > 0">
                    <details class="wallet_toggle" open="">
                        <summary>
                            <span class="item">카드<em>{{cardCn}}</em></span>
                            <span class="num"><em>{{cardApvSam | numberFilter}}</em>원</span>
                        </summary>
                        <div class="cont">
                            <ul class="wallet_list">
                                <li v-for="(item, idx) in cardList" :key="'cardXps_'+idx">
                                    <a href="javascript:void(0);" @click.prevent="openCardDetail(item)">
                                        <i class="ico_bank" :class="item.infOfrmnOrgC"></i>
                                        <div>
                                            <strong class="org">{{item.cdcoCdWrsnm}}</strong>
                                            <strong class="account">{{item.cdcoCdNo}}</strong>
                                        </div>
                                        <span class="num"><em>{{item.cdUgUsAm | numberFilter}}</em>원</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </details>
                </div>
                <div class="board_box wallet_spend" v-else-if="cardCn == 0 && conCardCnt > 0">
                    <span class="item">카드</span>
                    <p class="txt"><span>이용 내역이 없어요. </span></p>
                </div>
                <div class="board_box wallet_spend" v-else>
                    <span class="item">카드</span>
                    <p class="txt">
                        <span>이용 금액 확인하기 </span>
                        <a href="javascript:void(0);" class="btns" @click.prevent="fn_openAssetCon('card')">
                            연결
                        </a>
                    </p>
                </div>
                
                <!-- <div class="board_box wallet_spend">
                    <template v-if="cardCn > 0">
                        <h2 class="title"><a href="javascript:void(0);" @click.prevent="fn_openDtlSlide('card', cardList)">카드 이용 금액</a></h2>
                        <div class="card">
                            <span class="num"><em>{{cardApvSam | numberFilter}}</em>원</span>
                        </div>
                    </template>
                    
                    <template v-else-if="cardCn == 0 && conCardCnt > 0">
                        <h2 class="title">카드 이용 금액</h2>
                        <div class="card">  
                            <p> 카드 이용 내역이 없어요.</p>
                        </div>
                    </template>
                    
                    <template v-else>
                        <h2 class="title">카드 이용 금액</h2>
                        <div>
                            <a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openAssetCon('card')"><span class="icon_line_right">내역 불러오기</span></a>
                        </div>
                    </template>
                </div> -->
                <!-- // 카드 -->

                <!-- 페이 -->
                <div class="board_box" v-if="(payMnyCn + ppayCdCn > 0)">
                    <details class="wallet_toggle" open="">
                        <summary>
                            <span class="item">페이<em>{{payMnyCn + ppayCdCn}}</em></span>
                            <span class="num"><em>{{(payMnySam + ppayCdApvSam) | numberFilter}}</em>원</span>
                        </summary>
                        <div class="cont">
                            <ul class="wallet_list">
                                <li v-for="(item, idx) in payMnyList" :key="'payMnyXps_'+idx">
                                    <a href="javascript:void(0);" @click.prevent="openPayDetail('payMny', item)">
                                        <i class="ico_bank" :class="item.infOfrmnOrgC"></i>
                                        <div>
                                            <strong class="org">{{item.faceOnm}}</strong>
                                            <strong class="account" v-if="item.accIdVal && item.accIdVal !== 'NA'">{{item.accIdVal}}</strong>
                                        </div>
                                        <strong class="num"><em>{{item.ppayTram | numberFilter}}</em>원</strong>
                                    </a>
                                </li>
                                <li v-for="(item, idx) in ppayCdList" :key="'ppayCdXps_'+idx">
                                    <a href="javascript:void(0);" @click.prevent="openPayDetail('ppayCd', item)">
                                        <i class="ico_bank" :class="item.infOfrmnOrgC"></i>
                                        <div>
                                            <strong class="org">{{item.cdcoCdWrsnm}}</strong>
                                        </div>
                                        <strong class="num"><em>{{item.cdUgUsAm | numberFilter}}</em>원</strong>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </details>
                </div>
                <div class="board_box wallet_spend" v-else-if="(payMnyCn + ppayCdCn == 0) && conEfinCnt > 0">
                    <span class="item">페이</span>
                    <p class="txt"><span>이용 내역이 없어요. </span></p>
                </div>
                <div class="board_box wallet_spend" v-else>
                    <span class="item">페이</span>
                    <p class="txt">
                        <span>이용 금액 확인하기 </span>
                        <a href="javascript:void(0);" class="btns" @click.prevent="fn_openAssetCon('efin')">
                            연결
                        </a>
                    </p>
                </div>

                <!-- <div class="board_box wallet_spend">
                    <template v-if="(payMnyCn + ppayCdCn > 0)">
                        <h2 class="title"><a href="javascript:void(0);" @click.prevent="fn_openDtlSlide('pay', null)">페이 이용 금액</a></h2>
                        <div class="pay">
                            <span class="num"><em>{{(payMnySam + ppayCdApvSam) | numberFilter}}</em>원</span>
                        </div>
                    </template>
                    
                    <template v-else-if="(payMnyCn + ppayCdCn == 0) && conEfinCnt > 0">
                        <h2 class="title">페이 이용 금액</h2>
                        <div class="pay">
                            <p> 페이 이용 내역이 없어요.</p>
                        </div>
                    </template>
                    
                    <template v-else>
                        <h2 class="title">페이 이용 금액</h2>
                        <div>
                            <a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openAssetCon('efin')"><span class="icon_line_right">내역 불러오기</span></a>
                        </div>
                    </template>
                </div> -->
                <!-- // 페이 -->

                <!--현금-->
                <div class="board_box" v-if="chsvCn > 0">
                    <details class="wallet_toggle" open="">
                        <summary>
                            <span class="item">현금<em>{{chsvCn}}</em></span>
                            <span class="num"><em>{{schXpsSam | numberFilter}}</em>원</span>
                        </summary>
                        <div class="cont">
                            <ul class="wallet_list">
                                <li v-for="(item, idx) in chsvList" :key="'chsvXps_'+idx">
                                    <a href="javascript:void(0);" @click.prevent="openCashDetail(item)">
                                        <i class="ico_bank icon_money"></i>
                                        <div>
                                            <strong class="org" v-if="item.chsvKdnm == '이체'">계좌 이체로 쓴 금액</strong>
                                            <strong class="org" v-else-if="item.chsvKdnm == '현금'">직접 등록한 지출 금액</strong>
                                        </div>
                                        <strong class="num"><em>{{item.tram | numberFilter}}</em>원</strong>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </details>
                </div>
                <div class="board_box wallet_spend" v-else-if="chsvCn == 0 && conBankCnt > 0">
                    <span class="item">현금</span>
                    <p class="txt"><span>이용 내역이 없어요. </span></p>
                </div>
                <div class="board_box wallet_spend" v-else>
                    <span class="item">현금</span>
                    <p class="txt">
                        <span>이용 금액 확인하기 </span>
                        <a href="javascript:void(0);" class="btns" @click.prevent="fn_openAssetCon('bank')">
                            연결
                        </a>
                    </p>
                </div>

                <!-- <div class="board_box wallet_spend">
                    <template v-if="chsvCn > 0">
                        <h2 class="title"><a href="javascript:void(0);" @click.prevent="fn_openDtlSlide('cash', chsvList)">현금 이용 금액</a></h2>
                        <div class="cash">
                            <span class="num"><em>{{schXpsSam | numberFilter}}</em>원</span>
                        </div>
                    </template>
                    
                    <template v-else-if="chsvCn == 0 && conBankCnt > 0">
                        <h2 class="title">현금 이용 금액</h2>
                        <div class="cash">
                            <p> 현금 이용 내역이 없어요.</p>
                        </div>
                    </template>
                    
                    <template v-else>
                        <h2 class="title">현금 이용 금액</h2>
                        <div>
                            <a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openAssetCon('bank')"><span class="icon_line_right">내역 불러오기</span></a>
                        </div>
                    </template>
                </div> -->

                <!--통신비-->
                <div class="board_box" v-if="rqsCn > 0">
                    <details class="wallet_toggle" open="">
                        <summary>
                            <span class="item">통신<em>{{modifiedRqsList.length}}</em>
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
                                                결제일 이후 카드/페이/현금 결제 내역에서 확인할 수 있습니다.
                                            </p>
                                            <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                        </div> 
                                    </div>
                                </div>
                            </span>
                            <a href="javascript:void(0);" class="num" @click.prevent="openRqsDetail()">
                                <em>{{rqsSam | numberFilter}}</em>원
                            </a>
                        </summary>
                        <div class="cont">
                            <ul class="wallet_list">
                                <li v-for="(item, idx) in modifiedRqsList" :key="'telXps_'+idx">
                                    <div class="box">
                                        <i class="ico_bank" :class="item.infOfrmnOrgC"></i>
                                        <div>
                                            <strong class="org">{{item.infOfrmnOrgCNm}}</strong>
                                        </div>
                                        <strong class="num"><em>{{item.comuRqsAmSum | numberFilter}}</em>원</strong>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </details>
                </div>
                <div class="board_box wallet_spend" v-else-if="rqsCn == 0 && conTelCnt > 0">
                    <span class="item">통신</span>
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
                                    결제일 이후 카드/페이/현금 결제 내역에서 확인할 수 있습니다.
                                </p>
                                <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                            </div> 
                        </div>
                    </div>
                    <p class="txt"><span>이용 내역이 없어요. </span></p>
                </div>
                <div class="board_box wallet_spend" v-else>
                    <span class="item">통신</span>
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
                                    결제일 이후 카드/페이/현금 결제 내역에서 확인할 수 있습니다.
                                </p>
                                <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                            </div> 
                        </div>
                    </div>
                    <p class="txt"><span>이용 금액 확인하기 </span> <a href="javascript:void(0);" class="btns" @click.prevent="fn_openAssetCon('telecom')">연결</a></p>
                </div>

                <!-- <div class="board_box wallet_spend">
                    <h2 class="title" v-if="rqsCn > 0"><a href="javascript:void(0);" @click.prevent="fn_openDtlSlide('tel', modifiedRqsList)">통신비 이용 금액</a></h2>
                    <h2 class="title" v-else>통신비 이용 금액</h2>
                    <div class="custom_tooltip up">
                        <div class="com_tooltip_type02 com_tooltip_type03">
                            <a href="javascript:void(0);" class="com_btn_info" role="button" @click.prevent="isTipShowYn = true">
                                <em class="tooltip_icon_gray"><span class="blind">툴팁열기</span></em>
                            </a>
                        </div>
                        <div class="com_ballon_type01 com_ballon_type02" v-show="isTipShowYn">
                            <div>
                                <p>
                                    결제 예정금액으로 총지출에는 포함되지 않습니다.<br>
                                    결제일 이후 카드/페이/현금 결제 내역에서 확인할 수 있습니다.
                                </p>
                                <a href="javascript:void(0);" class="com_btn_close" @click.prevent="isTipShowYn = false"><span class="blind">툴팁닫기</span></a>
                            </div> 
                        </div>
                    </div>
                    
                    <template v-if="rqsCn > 0">
                        <div class="phone">  
                            <span class="num"><em>{{rqsSam | numberFilter}}</em>원</span>
                        </div>
                    </template>
                    
                    <template v-else-if="rqsCn == 0 && conTelCnt > 0">
                        <div class="phone">
                            <p> 통신비 이용 내역이 없어요.</p>
                        </div>
                    </template>
                    
                    <template v-else>
                        <div>
                            <a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openAssetCon('telecom')"><span class="icon_line_right">내역 불러오기</span></a>
                        </div>
                    </template>
                </div> -->
            </section>
        </div>
        <footersV2 type="lc" />
    </page>
</template>

<script>

import Page from '@/views/layout/Page'
import FootersV2 from '@/views/layout/FootersV2'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import commonService from '@/service/commonService'
import modalService from '@/service/modalService'
import {dateFormat, getLastDay, dayDiff} from '@/utils/date'
import {mapActions, mapGetters} from 'vuex'
import LottieAnimation from 'lottie-web-vue'

import COAR4001 from '@/views/page/CO/AR/COAR4001/COAR4001'
import COAR4002 from '@/views/page/CO/AR/COAR4002/COAR4002'
import COCT4011 from '@/views/page/CO/CT/COCT4011/COCT4011'
// import LCTA4S03 from '@/views/page/LC/TA/LCTA4S03/LCTA4S03'
// import LCTA4S04 from '@/views/page/LC/TA/LCTA4S04/LCTA4S04'
// import LCTA4S06 from '@/views/page/LC/TA/LCTA4S06/LCTA4S06'
// import LCTA4S07 from '@/views/page/LC/TA/LCTA4S07/LCTA4S07'
import LCLE4002 from '@/views/page/LC/LE/LCLE4002/LCLE4002' // 일반 카드상세
import LCLE4003 from '@/views/page/LC/LE/LCLE4003/LCLE4003' // 일반 페이머니상세
import LCLE4004 from '@/views/page/LC/LE/LCLE4004/LCLE4004' // 일반 선불카드상세
import LCLE4104 from '@/views/page/LC/LE/LCLE4104/LCLE4104' // 일반 현금상세
import LCLE2107 from '@/views/page/LC/LE/LCLE2107/LCLE2107' // 일반 통신비상세
import LCTA4S08 from '@/views/page/LC/TA/LCTA4S08/LCTA4S08'

import _ from 'lodash'

export default {
    name : "LCTA4S01",
    data: () => {
        return {
            mydtCusno       : '',       // 마이데이터고객번호
            cusnm           : '',       // 고객명
            executeCnt      : 0,        // 실행 count
            finalUpdateDtm  : '',       // 최근 자산 업데이트 시기

            date            : null,
            todayBasYm      : null,
            basYm           : 0,
            basYy           : 0,
            basMm           : 0,
            basDt           : 0,

            amtHiddenYn     : false,    // 금액 보기/숨김 구분(true:숨김, false:보기)
            isTipShowYn     : false,    // 통신비 툴팁 보기 여부
        
            inqYm			: "",		// 조회년월
            xpsTotAmt		: 0,		// 지출총합계
            cardApvSam		: 0,		// 카드승인금액합계
            bmmCardApvSam	: 0,		// 전월카드승인금액합계
            schXpsSam		: 0,		// 현금지출금액합계
            bmmSchXpsSam	: 0,		// 전월현금지출금액합계
            ppayXpsSam		: 0,		// 선불지출금액합계
            payMnySam		: 0,		// 페이머니금액합계
            bmmPayMnySam	: 0,		// 전월페이머니금액합계
            ppayCdApvSam    : 0,    	// 선불카드승인금액합계
            bmmPpayCdApvSam : 0,    	// 전월선불카드승인금액합계
            rqsSam			: 0,		// 통신요금청구금액합계
            cardCn			: 0,		// 카드목록건수
            chsvCn			: 0,		// 현금목록건수
            payMnyCn		: 0,		// 페이머니목록건수
            ppayCdCn        : 0,		// 선불카드목록건수
            rqsCn			: 0,		// 통신청구목록건수
            currYm			: "",		// 현재년월(조회년월과 비교용도)
            totListCn       : 0,        // 목록 총개수(카드, 페이(페이머니, 선불카드), 현금(이체, 수기))
            totListCnWithRqs: 0,        // 통신비 포함 목록 총개수

            bmmTotAm        : 0,        // 전월지출금액합산
            diffBfTotAm     : 0,        // 전월대비 총지출 증감액

            // 각 목록 정렬기준
            // 카드 : 카드명, 기타 : 이체 -> 현금 순서, 페이머니 : 권면명칭, 선불결제 : 페이명
            cardList		: [],		// 카드목록
            chsvList		: [],   	// 현금목록
            payMnyList		: [],		// 페이머니목록
            ppayCdList      : [],   	// 선불카드목록
            rqsList			: [],		// 통신청구목록
            modifiedRqsList : [],		// 기관별로 묶은 통신청구목록

            //////// 연결자산 관련 데이터
            nacfAccList        : [], // v4 농.축협 계좌 리스트
            userAsetList       : [], // 개인신용정보전송요구내역
            /* 은행 */
            conBankList        : [], // 은행업권 데이터
            conBankExprList    : [], // 은행업권 만료 데이터
            conBankCnt         : 0,  // 은행업권 건수
            /* 카드 */
            conCardList        : [], // 카드업권 데이터
            conCardExprList    : [], // 카드업권 만료 데이터
            conCardCnt         : 0,  // 카드업권 건수
            /* 페이 */
            conEfinList        : [], // 전자금융업권 데이터
            conEfinExprList    : [], // 전자금융업권 만료 데이터
            conEfinCnt         : 0,  // 전자금융업권 건수
            /* 통신 */
            conTelList         : [], // 통신업권 데이터
            conTelExprList     : [], // 통신업권 만료 데이터
            conTelCnt          : 0,  // 통신업권 건수

            codeNmList 		   : [   // 업권 코드별 명칭 리스트
				{"codeVal":"bank", 		"codeNm":"은행"		},
				{"codeVal":"card", 		"codeNm":"카드"		},
				{"codeVal":"efin", 		"codeNm":"전자금융"	},
				{"codeVal":"telecom", 	"codeNm":"통신"		},
            ],  

            assetConnCnt       : 0,  // 은행, 카드, 전자금융 건수 합계
            financeKlList      : [], // 금융지식 컨텐츠 목록
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
        fn_totAmClassSet() {
            if(this.xpsTotAmt > 0) {
                // 전월대비 총지출 증감
                return this.diffBfTotAm > 0 ? 'up' : this.diffBfTotAm < 0 ? 'down' : ''
            } else if (this.conCardCnt == 0 && this.conBankCnt == 0 && this.conEfinCnt == 0) {
                // 총지출금액(통신비 제외) 0이면서 연결기관 없는 case
                return 'unconnected'
            } else {
                // 선택 월 지출금액 없는 case
                return 'nil'
            }
        }
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
        this.date       = new Date()
        this.todayBasYm = dateFormat(new Date(), "YYYYMM")
        this.basYm      = dateFormat(new Date(), "YYYYMM")
        this.basYy      = dateFormat(new Date(), "YYYY")
        this.basMm      = dateFormat(new Date(), "MM")
        this.basDt      = dateFormat(new Date(), "YYYYMMDD")
        this.mydtCusno  = this.getUserInfo("mydtCusno")
        this.cusnm      = this.getUserInfo("cusnm")
    },
    mounted() {
        this.initComponent()
        
        // 자산수집 mutation 이벤트 감지 
        this.getGatheringListenSubscribe()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        ...mapActions('myassets', [
            'getAllMyAssetInfo',
            'getMyAssetInfo',
            'getPrdMyAssetInfo'
        ]),        
        initComponent() {
            this.mydtCusno  = this.getUserInfo('mydtCusno')
            this.currYm     = dateFormat(new Date(), 'YYYYMM')
            this.inqYm      = dateFormat(new Date(), 'YYYYMM')      // 조회년월(초기세팅은 현재년월)

            this.amtHiddenYn = this.getSecretAmInfo().includes('LC')

            /* 자산연결 데이터 조회 */
            this.initData()
            this.getAssetConnData()

            //this.getData()
        },

        /**
         * 연결기관목록 초기화
         */
        initData() {
            ////////// 연결자산 관련 데이터
            this.userAsetList    = []   // 개인신용정보전송요구내역
            /* 은행 */
            this.conBankList     = []   // 은행업권 데이터
            this.conBankExprList = []   // 은행업권 만료 데이터
            /* 카드 */
            this.conCardList     = []   // 카드업권 데이터
            this.conCardExprList = []   // 카드업권 만료 데이터
            /* 페이 */
            this.conEfinList     = []   // 전자금융업권 데이터
            this.conEfinExprList = []   // 전자금융업권 만료 데이터
            /* 통신 */
            this.conTelList      = []   // 통신업권 데이터
            this.conTelExprList  = []   // 통신업권 만료 데이터
        },
        /**
         * 자산 연결 데이터 조회
         */
        getAssetConnData() {
            console.log("myAssetsBzrgList=======",this.myAssetsBzrgList)

            this.assetConnCnt = 0
            this.conBankCnt = 0

            // 사용자 중앙회 계좌 조회
            const config = {
                url : "/co/am/08r03", //"/co/am/05rb3", ///co/am/05ra2
                data : {
                    mydtCusno : this.getUserInfo("mydtCusno")
                }
            }
            apiService.call(config).then(response => {
                this.nacfAccList = response.nacfAccList || []

                // 은행업권 연결리스트 중앙회 계좌여부 확인
                this.conBankCnt += this.nacfAccList.length > 0 ? 1 : 0
                this.assetConnCnt += this.conBankCnt
            })

            // 은행업권
            this.conBankList     = []
            this.conBankExprList = []
            let tmpBankList	= (typeof _.find(this.myAssetsBzrgList, {"comnCVal":"bank"}) !== "undefined") ? _.find(this.myAssetsBzrgList, {"comnCVal":"bank"}).orgList : []
            for(let i=0; i<tmpBankList.length; i++) {
                tmpBankList[i].orgBizDsc = "bank"
                if(tmpBankList[i].acsTokenDusDtm == '0' && dayDiff(tmpBankList[i].tmsEdDt, this.currentDate) >= 0) {
                    // 토큰만료일자가 0이고, 전송종료일자가 현재일자보다 크거나 같을경우 연결목록에 포함
                    this.conBankList.push(tmpBankList[i])
                    this.conBankCnt++
                } else {
                    // 그 외 경우 만료로 판단
                    this.conBankExprList.push(tmpBankList[i])
                }
            }

            // 카드업권
            this.conCardList     = []
            this.conCardExprList = []
            let tmpCardList      = (typeof _.find(this.myAssetsBzrgList, {"comnCVal":"card"}) !== "undefined") ? _.find(this.myAssetsBzrgList, {"comnCVal":"card"}).orgList : []
            for(let i=0; i<tmpCardList.length; i++) {
                tmpCardList[i].orgBizDsc = "card"
                if(tmpCardList[i].acsTokenDusDtm == '0' && dayDiff(tmpCardList[i].tmsEdDt, this.currentDate) >= 0) {
                    this.conCardList.push(tmpCardList[i])
                    this.conCardCnt = this.conCardList.length
                } else {
                    this.conCardExprList.push(tmpCardList[i])
                }
            }

            // 전자금융업권
            this.conEfinList     = []
            this.conEfinExprList = []
            let tmpEfinList      = (typeof _.find(this.myAssetsBzrgList, {"comnCVal":"efin"}) !== "undefined") ? _.find(this.myAssetsBzrgList, {"comnCVal":"efin"}).orgList : []
            for(let i=0; i<tmpEfinList.length; i++) {
                tmpEfinList[i].orgBizDsc = "efin"
                if(tmpEfinList[i].acsTokenDusDtm == '0' && dayDiff(tmpEfinList[i].tmsEdDt, this.currentDate) >= 0) {
                    this.conEfinList.push(tmpEfinList[i])
                    this.conEfinCnt = this.conEfinList.length
                } else {
                    this.conEfinExprList.push(tmpEfinList[i])
                }
            }

            // 통신업권
            this.conTelList     = []
            this.conTelExprList = []
            let tmpTelecomList  = (typeof _.find(this.myAssetsBzrgList, {"comnCVal":"telecom"}) !== "undefined")? _.find(this.myAssetsBzrgList, {"comnCVal":"telecom"}).orgList : []
            for(let i=0; i<tmpTelecomList.length; i++) {
                tmpTelecomList[i].orgBizDsc = "telecom"
                if(tmpTelecomList[i].acsTokenDusDtm == '0' && dayDiff(tmpTelecomList[i].tmsEdDt, this.currentDate) >= 0) {
                    this.conTelList.push(tmpTelecomList[i])
                    this.conTelCnt = this.conTelList.length
                } else {
                    this.conTelExprList.push(tmpTelecomList[i])
                }
            }

            /*은행, 카드, 전자금융 업권의 자산연결 건수 > 0 지출 데이터 조회*/
            this.assetConnCnt += this.conBankCnt + this.conCardCnt + this.conEfinCnt

            /* 지출 데이터 조회 */
            this.getData() 
        },
        // getAssetConnData_() {
        //     this.assetConnCnt = 0
        //     this.conBankCnt = 0

        //     // 사용자 중앙회 계좌 조회
        //     const config = {
        //         url : "/co/am/08r03", //"/co/am/05rb3", ///co/am/05ra2
        //         data : {
        //             mydtCusno : this.getUserInfo("mydtCusno")
        //         }
        //     }
        //     apiService.call(config).then(response => {
        //         this.nacfAccList = response.nacfAccList || []

        //         // 은행업권 연결리스트 중앙회 계좌여부 확인
        //         this.conBankCnt += this.nacfAccList.length > 0 ? 1 : 0
        //         this.assetConnCnt += this.conBankCnt
        //     })

        //     // 개인신용정보 전송요구내역 조회
        //     const config_con = {
        //         url : '/co/am/08r05', // /co/am/08r02
        //         data: {
        //             mydtCusno: this.getUserInfo('mydtCusno')
        //         }
        //     }
        //     apiService.call(config_con).then(response => {
        //         this.userAsetList = response.bzrgList || []

        //         // 은행업권
        //         this.conBankList     = []
        //         this.conBankExprList = []
        //         let tmpBankList	     = (typeof _.find(this.userAsetList, {"comnCVal":"bank"}) !== "undefined") ? _.find(this.userAsetList, {"comnCVal":"bank"}).orgList : []
                
        //         for(let i=0; i<tmpBankList.length; i++) {
        //             tmpBankList[i].orgBizDsc = "bank"
        //             if(tmpBankList[i].acsTokenDusDtm == '0' && dayDiff(tmpBankList[i].tmsEdDt, this.currentDate) >= 0) {
        //                 // 토큰만료일자가 0이고, 전송종료일자가 현재일자보다 크거나 같을경우 연결목록에 포함
        //                 this.conBankList.push(tmpBankList[i])
        //                 this.conBankCnt++
        //             } else {
        //                 // 그 외 경우 만료로 판단
        //                 this.conBankExprList.push(tmpBankList[i])
        //             }
        //         }

        //         // 카드업권
        //         this.conCardList     = []
        //         this.conCardExprList = []
        //         let tmpCardList      = (typeof _.find(this.userAsetList, {"comnCVal":"card"}) !== "undefined") ? _.find(this.userAsetList, {"comnCVal":"card"}).orgList : []
        //         // this.conCardCnt      = tmpCardList.length
        //         for(let i=0; i<tmpCardList.length; i++) {
        //             tmpCardList[i].orgBizDsc = "card"
        //             if(tmpCardList[i].acsTokenDusDtm == '0' && dayDiff(tmpCardList[i].tmsEdDt, this.currentDate) >= 0) {
        //                 this.conCardList.push(tmpCardList[i])
        //                 this.conCardCnt = this.conCardList.length
        //             } else {
        //                 this.conCardExprList.push(tmpCardList[i])
        //             }
        //         }

        //         // 전자금융업권
        //         this.conEfinList     = []
        //         this.conEfinExprList = []
        //         let tmpEfinList      = (typeof _.find(this.userAsetList, {"comnCVal":"efin"}) !== "undefined") ? _.find(this.userAsetList, {"comnCVal":"efin"}).orgList : []
        //         // this.conEfinCnt      = tmpEfinList.length
        //         for(let i=0; i<tmpEfinList.length; i++) {
        //             tmpEfinList[i].orgBizDsc = "efin"
        //             if(tmpEfinList[i].acsTokenDusDtm == '0' && dayDiff(tmpEfinList[i].tmsEdDt, this.currentDate) >= 0) {
        //                 this.conEfinList.push(tmpEfinList[i])
        //                 this.conEfinCnt = this.conEfinList.length
        //             } else {
        //                 this.conEfinExprList.push(tmpEfinList[i])
        //             }
        //         }

        //         // 통신업권
        //         this.conTelList     = []
        //         this.conTelExprList = []
        //         let tmpTelecomList  = (typeof _.find(this.userAsetList, {"comnCVal":"telecom"}) !== "undefined")? _.find(this.userAsetList, {"comnCVal":"telecom"}).orgList : []
        //         // this.conTelCnt      = tmpTelecomList.length
        //         for(let i=0; i<tmpTelecomList.length; i++) {
        //             tmpTelecomList[i].orgBizDsc = "telecom"
        //             if(tmpTelecomList[i].acsTokenDusDtm == '0' && dayDiff(tmpTelecomList[i].tmsEdDt, this.currentDate) >= 0) {
        //                 this.conTelList.push(tmpTelecomList[i])
        //                 this.conTelCnt = this.conTelList.length
        //             } else {
        //                 this.conTelExprList.push(tmpTelecomList[i])
        //             }
        //         }

        //         /*은행, 카드, 전자금융 업권의 자산연결 건수 > 0 지출 데이터 조회*/
        //         this.assetConnCnt += this.conBankCnt + this.conCardCnt + this.conEfinCnt

        //         /* 지출 데이터 조회 */
        //         this.getData() 
        //     })
        // },

        /**
         * 월 지출 데이터 불러오기
         */
        callMmXpsData(yyyyMm) {
            this.getPrdMyAssetInfo(dateFormat(yyyyMm, 'YYYYMM'))
        },

        /**
         * 금액 숨김/보기 처리
         */
        fn_amtHidden(type) {
            this.amtHiddenYn = type
            this.setSecretAmInfo('LC', this.amtHiddenYn)
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
         * 데이터 조회
         */
        getData() {
            console.log("getData()===============================================")
            // 1년이상 전 데이터 조회 시 타임아웃 발생으로 지출내역 api 사용변경
            // const config = {
            //     url: '/lc/ta/01r01',    // asis) /lc/le/01r03
            //     data: {
            //         mydtCusno : this.mydtCusno,
            //         basYm     : this.basYm,
            //         basDt     : this.basDt,
            //         inqStrDt  : this.basYm + '01',
            //         inqEndDt  : this.basDt,
            //     }
            // }
            const config = {
                url: '/lc/le/01r03',
                data: {
                    mydtCusno : this.mydtCusno,
                    inqYm     : this.basYm,
                }
            }
            
            console.log("getData() config ========", config)

            apiService.call(config).then(response =>{
                console.log('getData() ======> response', JSON.parse(JSON.stringify(response)))
                this.mydtCusno 		= response.mydtCusno || ''
                this.inqYm 			= response.inqYm || ''
                this.xpsTotAmt 		= response.xpsTotAmt || 0
                
                // 카드
                this.cardApvSam		 = response.cardApvSam || 0
                this.bmmCardApvSam	 = response.bmmCardApvSam || 0
                this.cardCn 		 = response.cardCn || 0
                this.cardList 		 = response.cardList || []

                // 페이머니
                this.payMnySam       = response.payMnySam || 0
                this.bmmPayMnySam    = response.bmmPayMnySam || 0
                this.payMnyCn        = response.payMnyCn || 0
                this.payMnyList      = response.payMnyList || []

                // 선불카드
                this.ppayCdApvSam    = response.ppayCdApvSam || 0
                this.bmmPpayCdApvSam = response.bmmPpayCdApvSam || 0
                this.ppayCdCn        = response.ppayCdCn || 0
                this.ppayCdList      = response.ppayCdList || []

                // 현금
                // this.schXpsSam      = response.cashXpsSam || 0
                // this.bmmSchXpsSam   = response.bmmCashXpsSam || 0
                // this.chsvCn         = response.cashCn || 0
                // this.chsvList       = response.cashList || []
                // */lc/le/01r03 파라미터 매핑
                this.schXpsSam      = response.schXpsSam || 0
                this.bmmSchXpsSam   = response.bmmSchXpsSam || 0
                this.chsvCn         = response.chsvCn || 0
                this.chsvList       = response.chsvList || []
                
                // 통신
                this.rqsSam         = response.rqsSam || 0
                this.rqsCn			= response.rqsCn || 0
                this.rqsList        = response.rqsList || []

                // 기관별로 묶음
                this.modifiedRqsList = this.modifyRqsList(this.rqsList)

                this.totListCn = this.cardCn + this.payMnyCn + this.chsvCn + this.ppayCdCn
                this.totListCnWithRqs = this.totListCn + this.rqsCn

                // 전월지출금액 합산
                this.bmmTotAm = this.bmmCardApvSam + this.bmmSchXpsSam + this.bmmPayMnySam + this.bmmPpayCdApvSam
                this.diffBfTotAm = this.xpsTotAmt - this.bmmTotAm

                if(this.xpsTotAmt > 0) {
                    this.$nextTick(()=>{
                        if (this.diffBfTotAm > 0){
                            this.$refs.walletUp.stop()
                            this.$refs.walletUp.play()
                        } else if(this.diffBfTotAm < 0) {
                            this.$refs.walletDown.stop()
                            this.$refs.walletDown.play()
                        }else if(this.diffBfTotAm == 0) {
                            this.$refs.wallet.stop()
                            this.$refs.wallet.play()
                        }
                    })
                }
            })
        },
        /**
         * 년월 변경 슬라이드팝업 오픈
         */
        selectMonth(){
            // 년월선택
            const config = {
                params: {
                    title: '년월 선택',
                    yyyymm : this.basYy + '' + this.basMm,
                    limit  : 60,
                },
            }
            modalService.openSlideSelectMonth(config).then(response => {
                if( (this.basYy + '' + this.basMm) === (response.substring(0,4) + '' + response.substring(4,6)) ){
                    console.log('달력 변동없음.')
                    return false
                }
                this.basYy = response.substring(0,4)
                this.basMm = response.substring(4,6)
                this.basYm = this.basYy + '' + this.basMm
                this.basDt = dateFormat(getLastDay(this.basYm + '01'), 'YYYYMMDD')
                
                // 년월 선택 후 재조회
                this.getData() 
            })
        },

        /**
         * 기관별로 묶기
         */
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
        
        /**
         * 지출분석 팝업 오픈 전 조회
         */
        fn_openExpAnls() {
            const config = {
                url: '/lc/ip/01r02', // 인터페이스ID: IF-MOB-PFM-LCIP01R02, 서비스코드: PFMLCIP01R02
                data: {
                    "mydtCusno" : this.getUserInfo('mydtCusno'),
                    "basDt" : this.basDt
                }
            }
            apiService.call(config).then(response =>{
                const cusMmtpXpsOut 	= response.cusMmtpXpsOut
                const xpsAm0      	= response.cusMmtpXpsOut?.xpsAm0 || 0     // 당월

                const stlXpsOut      = response.stlXpsOut         // 결제수단별

                let param = {
                    basDt           : this.basDt,
                    cusMmtpXpsOut   : cusMmtpXpsOut,
                    xpsAm0          : xpsAm0,
                    stlXpsOut       : stlXpsOut
                }

                this.openSlide(param)
            })
        },
        /**
         * 슬라이드 오픈
         */
        openSlide(param) {
            const popConfig = {
				params : param,
				renderer : {
					component : LCTA4S08
				}
			}
            modalService.openSlidePagePopup(popConfig).then(response => {
                console.log(response)
            })
        },
        /**
         * 카드 상세팝업 호출
         */
        openCardDetail(obj){
            const config = {
                component: LCLE4002,
                params : {
                    mydtCusno		: this.getUserInfo("mydtCusno"),
                    inqYm 			: this.inqYm,
                    infOfrmnOrgC	: (obj==="ALL")?'':obj.infOfrmnOrgC,
                    mydtCdId		: (obj==="ALL")?'':obj.mydtCdId,
                    cdcoCdWrsnm		: (obj==="ALL")?'전체카드':obj.cdcoCdWrsnm,
                }
            }
            // renderer 사용 시 팝업 비정상 호출
            // config.renderer = this.modalConfig.renderer
            modalService.openPopup(config).then(() => {
                this.getData()
            })
        },
        /**
         * 페이 상세팝업 호출
         */
        openPayDetail(type, obj){
            let param = {}
            if(type == 'payMny') {
                param = {
                    mydtCusno		: this.getUserInfo("mydtCusno"),
                    inqYm 			: this.inqYm,
                    infOfrmnOrgC	: obj.infOfrmnOrgC,
                    faceNo			: obj.faceNo,
                    faceOnm         : obj.faceOnm,
                    accIdVal        : obj.accIdVal || '',
                }
            } else {
                param = {
                    mydtCusno       : this.getUserInfo('mydtCusno'),
                    inqYm           : this.inqYm,
                    infOfrmnOrgC	: obj.infOfrmnOrgC,
                    cdcoCdWrsnm		: obj.cdcoCdWrsnm,
                    mydtCdId		: obj.mydtCdId,
                }
            }

            const config = {
                component: type == 'payMny' ? LCLE4003 : LCLE4004,
                params : param
            }
            modalService.openPopup(config).then(() => {
                this.getData()
            })
        },
        /**
         * 현금 상세팝업 호출
         */
        openCashDetail(obj){
            
            const config = {
                component: LCLE4104,
                params : {
                    mydtCusno		: this.getUserInfo("mydtCusno"),
                    inqYm 			: this.inqYm,
                    inqDsc          : obj.chsvKdnm == '이체' ? 'F' : 'C'
                }
            }
            // renderer 사용 시 풀팝업 > 풀팝업 에서 다시 돌아올 때 화면요소 사라짐 이슈 확인필요
            //config.renderer = this.modalConfig.renderer
            modalService.openPopup(config).then(() => {
                this.getData()
            })
        },
        /**
         * 통신비 상세팝업 호출
         */
        openRqsDetail(){
            const config = {
                component: LCLE2107,
                params : {
                    mydtCusno		: this.getUserInfo("mydtCusno"),
                    inqYm 			: this.inqYm
                }
            }
            modalService.openPopup(config).then(() => {
                this.getData()
            })
        },
        /**
         * 자산연결 팝업오픈
         */
        fn_openAssetCon(orgDsc) {
            let asetParam = null

            if(!this.isNull(orgDsc)) {
                asetParam = {
                    isExternal: true,
                    orgDsc: orgDsc
                }
            }

            const config = {
                component: this.isNull(asetParam) ? COAR4001 : COAR4002,
                params: asetParam
            }
            modalService.openPopup(config).then(response => {
                if(response === 'move' || response === true) {
                    this.getData()
                }
            })

            // const config = {
            //     component: COAR4001,
            //     params: {}
            // }
            // modalService.openPopup(config).then(() => {
            //     this.getData()
            // })
        },
        emptyImg(e) {
			e.target.src = new URL("@/assets_v40/images/event/ev_noimg.png", import.meta.url).href
		},

    },
    components: {
        Page,
        FootersV2,
        LottieAnimation
    },
}
</script>