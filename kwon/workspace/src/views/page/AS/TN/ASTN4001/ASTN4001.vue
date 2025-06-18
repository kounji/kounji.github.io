<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 숨은 자산 > 휴면계좌/휴면보험금 목록
* @ 페이지설명 : 자산 > 숨은 자산 > 휴면계좌/휴면보험금 목록
* @ 파일명     : src/views/page/AS/TN/ASTN4001/ASTN4001.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-03-10
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-03-10              CS541599              최초작성
*************************************************************************/
-->
<template>
    
    <page class="content-view">
        <nav class="navi">
            <div class="inner">
                <ul role="navigation" aria-label="숨은자산" class="depth1-4">
                    <li><a href="javascript:void(0);" :aria-current="tabIdx == 0 ? 'page' : ''" @click.prevent="fnTab(0)"><span>휴면예금</span></a></li>
                    <li><a href="javascript:void(0);" :aria-current="tabIdx == 1 ? 'page' : ''" @click.prevent="fnTab(1)"><span>휴면보험금</span></a></li>
                </ul>
            </div>
        </nav>

        <div id="content">
            <section class="sleep_account">
                <template v-if="tabIdx == 0">
                    <!--update-->
                    <div class="update" v-if="bnkList.length &gt; 0 && myAssetsBzRgCnt &gt; 0">
                        <template v-if="!isMyAssetGathering">
                            <span>{{ assetUpdateDtm }}</span> <!-- V4.0 -->
                            <button type="button" class="btn_update" @click.prevent="fn_refreshApiCall()"><span class="blind">업데이트</span></button>
                        </template>
                        <template v-else>
                            <span>자산 업데이트 중</span>
                            <button type="button" class="btn_update"><span class="blind">업데이트</span></button>
                        </template>
                    </div>
                    <h2>휴면예금이란?</h2>
                    <div class="custom_tooltip up">
                        <div class="com_tooltip_type02 com_tooltip_type03">
                            <a href="javascript:void(0);" class="com_btn_info" role="button">
                                <em class="tooltip_icon_gray"><span class="blind">툴팁열기</span></em>
                            </a>
                        </div>
                        <div class="com_ballon_type01 com_ballon_type02" style="display: none;">
                            <div>
                                <ul class="bl_dot_list">
                                    <li>소멸시효가 완성된 후 아직 서민금융진흥원에 출연 되지 않은 예금입니다.</li>
                                    <li>계좌를 해지하여 잔액을 이전하거나, 서민금융진흥원에 기부할 수 있습니다.</li>
                                    <li>해지 처리가 완료된 이후 취소가 불가능합니다. </li>
                                </ul>

                                <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                            </div> 
                        </div>
                    </div>
                    
                    <!-- 25-03-10 숨은예금 조회하기 링크 추가/25-03-11 하단으로 이동 
                    <div class="top_area">
                        <a href="javascript:void(0);" class="btn_connect">자산연결 추가</a>
                    </div>
                    -->
                    <!-- //25-03-10 숨은예금 조회하기 링크 추가 -->

                    <!--계좌가 있을경우-->
                    <template v-if="bnkList.length &gt; 0 && myAssetsBzRgCnt &gt; 0">
                        <div class="board_box">
                            <div class="btn_wrap">
                                <button type="button" class="btns line md" @click.prevent="fnNewAsset()"><span class="ico_search_green">최신 숨은 자산 조회 하기</span></button>
                            </div>
                            <ul class="assets_list">
                                <li v-for="(item, idx) in bnkList" :key="idx">
                                    <a href="javascript:void(0);" role="button" @click.prevent="fnOpenDtl(1,item)">
                                        <i :class="'ico_bank '+item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgNm}}</span></i>
                                        <div>
                                            <strong class="org">{{item.infOfrmnOrgNm}} {{item.acWrsnm}}</strong>
                                            <div class="account"><span class="blind">계좌번호</span>{{item.mydtAcno}}</div>
                                            <strong class="num"><span class="blind">금액</span>{{item.acNowBac | numberFilter}}{{item.curc}}</strong>
                                        </div>
                                    </a>
                                    <div class="btn_area">
                                        <button type="button" @click.prevent="fnStltAgree(item)" class="btns" v-if="isShowBtn">
                                            {{(item.mydtAcStsc=='01' &&item.acNowBac &lt;= 1000000&&infInfo.includes(item.infOfrmnOrgC))
                                                                ?'해지가능여부조회':(item.mydtAcStsc)=='98'?'처리중':(item.mydtAcStsc)=='99'?'해지완료':'해지불가'}}
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </template>
                    <template v-else>
                        <template v-if="myAssetsBzRgCnt &gt; 0">
                            <div class="board_box">
                                <div class="no_result">
                                    <p class="text">조회 결과가 없어요.</p>
                                    <div class="bg">
                                        <lottie-animation :animationData="require('@/assets_v40/images/lottie/bg_no_result.json')" 
                                            ref="anim"
                                            :loop="true"
                                            :auto-play="true" 
                                            :speed="1"
                                            aria-hidden="true" 
                                            class="bg_no_result" 
                                        ></lottie-animation>
                                    </div>
                                    <div class="btn_wrap">
                                        <button type="button" class="btns line md" @click.prevent="fnNewAsset()"><span class="ico_search_green">최신 숨은 자산 조회 하기</span></button>
                                    </div>
                                </div>
					        </div>
                        </template>
                        <template v-else>
                            <div class="board_box">
                                <div class="no_connect">
                                    <p class="headline">잠자는 내 돈, 궁금하지 않으세요?</p>
                                    <p class="headline point">숨은 예금을 조회해 보세요.</p>
                                    <div class="cont">
                                        <p class="text">한눈에 보는 나의 금융생활
                                            자산현황, 소비습관을
                                            쉽게 알려드려요.</p>
                                        <div class="bg">
                                            <div class="bg">
                                            <lottie-animation :animationData="require('@/assets_v40/images/lottie/plz_asset_join.json')" 
                                                ref="anim"
                                                :loop="true"
                                                :auto-play="true" 
                                                :speed="1"
                                                aria-hidden="true" 
                                                class="plz_asset_join" 
                                            ><p class="blind">자산을 연결해보세요</p></lottie-animation>
                                        </div>
                                        </div>
                                    </div>
                                    <!--  25-03-21 상단으로 이동 
                                    <div class="btn_wrap">
                                        <button type="button" class="btns md"><span class="icon_line_right">자산연결 하러가기</span></button>
                                    </div>
                                    -->
                                    <!--25-03-25 하단으로 이동 -->
                                    <div class="btn_wrap">
                                        <button type="button" class="btns line md" @click.prevent="fnNewAsset()"><span class="ico_search_green">최신 숨은 자산 조회 하기</span></button>
                                    </div>
                                    <!--//25-03-25 하단으로 이동 -->
                                </div>
                            </div>
                        </template>
                    </template>
                    <!-- <div class="bottom" v-if="myAssetsBzRgCnt &gt; 0"> -->
                    <div class="bottom" v-if="myAssetsBzRgCnt &gt; 0">
                        <a href="javascript:void(0);" class="btns_txt" @click.prevent="fnOpenDtl(2)" v-if="isShowBtn"><span>해지계좌조회</span></a>
                    </div>
                </template>
                <!-- tabIdx == 1 휴면보험금 -->
                <template v-else>
                    <!--update-->
                    <div class="update" v-if="isrList.length &gt; 0 && myAssetsBzRgCnt &gt; 0">
                        <template v-if="!isMyAssetGathering">
                            <span>{{ assetUpdateDtm }}</span> <!-- V4.0 -->
                            <button type="button" class="btn_update" @click.prevent="fn_refreshApiCall()"><span class="blind">업데이트</span></button>
                        </template>
                        <template v-else>
                            <span>자산 업데이트 중</span>
                            <button type="button" class="btn_update"><span class="blind">업데이트</span></button>
                        </template>
                    </div>
                    <h2>휴면보험금이란?</h2>
                    <div class="custom_tooltip up">
                        <div class="com_tooltip_type02 com_tooltip_type03">
                            <a href="javascript:void(0);" class="com_btn_info" role="button">
                                <em class="tooltip_icon_gray"><span class="blind">툴팁열기</span></em>
                            </a>
                        </div>
                        <div class="com_ballon_type01 com_ballon_type02" style="display: none;">
                            <div>
                                <ul class="bl_dot_list">
                                    <li>휴면보험금은 조회만 가능합니다.</li>
                                    <li>소멸시효가 경과되어 서민금융진흥원으로 출연 예정에 있으나, 아직 출연되지 않아, 금융기관에서 보유중인 보험금 계좌입니다.</li>
                                    <li>소멸시효는 반기 또는 연에 1번 소멸시효가 완성된 계좌를 출연하므로, 최대 1년 이내로 금융 기관에서 보유한 상태를 의미합니다. </li>
                                </ul>
                                <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                            </div> 
                        </div>
                    </div>
    
                    <!--계좌가 있을경우-->
                    <template v-if="isrList.length &gt; 0 && myAssetsBzRgCnt &gt; 0">
                    <div class="board_box">
                        <div class="btn_wrap">
                            <button type="button" class="btns line md" @click.prevent="fnNewAsset()"><span class="ico_search_green">최신 숨은 자산 조회 하기</span></button>
                        </div>
                        <!-- 25-03-11 삭제 <h3 class="title">휴면보험금</h3> -->
                        <ul class="assets_list">
                            <li v-for="(item, idx) in isrList" :key="idx">
                                <a href="javascript:void(0);" role="button" @click.prevent="fnOpenDtl(1,item)">
                                    <i :class="'ico_bank '+item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgNm}}</span></i>
                                    <div>
                                        <strong class="org">{{item.infOfrmnOrgNm}} {{item.isrcoWrsnm}}</strong>
                                        <div class="account"><span class="blind">계좌번호</span>{{item.isrSctsNo}}<span v-if="item.dsc == '02'">휴면보험금</span></div><!--  25-03-11 문구변경 -->
                                        <strong class="num"><span class="blind">금액</span>{{item.isrCtrAm | numberFilter}}{{item.curc}}</strong>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    </template>
                    <template v-else>
                        <template v-if="myAssetsBzRgCnt &gt; 0">
                            <div class="board_box">
                                <div class="no_result">
                                    <p class="text">조회 결과가 없어요.</p>
                                    <div class="bg">
                                        <lottie-animation :animationData="require('@/assets_v40/images/lottie/bg_no_result.json')" 
                                            ref="anim"
                                            :loop="true"
                                            :auto-play="true" 
                                            :speed="1"
                                            aria-hidden="true" 
                                            class="bg_no_result" 
                                        ></lottie-animation>
                                    </div>
                                    <div class="btn_wrap">
                                        <button type="button" class="btns line md" @click.prevent="fnNewAsset()"><span class="ico_search_green">최신 숨은 자산 조회 하기</span></button>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="board_box">
                                <div class="no_connect">
                                    <p class="headline">잠자는 내 돈, 궁금하지 않으세요?</p>
                                    <p class="headline point">숨은 예금을 조회해 보세요.</p>
                                    <div class="cont">
                                        <p class="text">한눈에 보는 나의 금융생활
                                            자산현황, 소비습관을
                                            쉽게 알려드려요.</p>
                                        <div class="bg">
                                            <lottie-animation :animationData="require('@/assets_v40/images/lottie/plz_asset_join.json')" 
                                                    ref="anim"
                                                    :loop="true"
                                                    :auto-play="true" 
                                                    :speed="1"
                                                    aria-hidden="true" 
                                                    class="plz_asset_join" 
                                            ><p class="blind">자산을 연결해보세요</p></lottie-animation>
                                        </div>
                                    </div>
                                    <div class="btn_wrap">
                                        <button type="button" class="btns line md" @click.prevent="fnNewAsset()"><span class="ico_search_green">최신 숨은 자산 조회 하기</span></button>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </template>
                    <div class="gray_box">
                        <p class="dotted_list">휴면보험금은 조회만 가능합니다.</p>
                    </div>
                </template>
                
            </section>
        </div>
        <footersV2 type="as" />
    </page>
    
    
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'

import apiService from '@/service/apiService'
import commonService from '@/service/commonService'
import {mapActions,mapGetters} from 'vuex'
import {defineAsyncComponent} from 'vue'

import LottieAnimation from 'lottie-web-vue' // import lottie-web-vue

import _ from 'lodash'

export default {
    name : "ASTN4001",
    data: () => {
        return {
            tabIdx          : 0,  // 탭 index
            hdAcList        : [], // 숨은자산 휴면계좌(테스트용)
            hdIsList        : [], // 숨은자산 휴면보험(테스트용)

            bnkList         : [], // 숨은자산 휴면계좌 목록
            isrList         : [], // 숨은자산 휴면보험금 목록
            
            bnkInfo         : [], // 은행코드 목록(객체 형태)
            infInfo         : [], // 기관코드 목록(배열 형태)
            bankCode        : '', // 은행코드

            mydtAcStscList  : [], // 해지구분코드 목록
            stltList        : [
                                  {stltTinm : '[필수] 계좌통합관리서비스 이용약관', stltCntn : '<div class="terms_group03"><strong class="tit">제1조 (목적)</strong><p class="txt">이 약관은 “계좌통합관리서비스”를 이용하는 고객과 금융회사간의 서비스 이용에 관한 제반 사항을 정함을 목적으로 합니다.</p></div><div class="terms_group03"><strong class="tit">제2조 (용어의 정의)</strong><ul><li>① 이 약관에서 사용하는 용어의 의미는 다음 각 호와 같습니다.<ul><li>1. “계좌통합관리서비스”(이하 “본 서비스”라 함)라 함은 고객이 금융회사에 개설된 본인 명의 계좌(상호금융기관의 미지급출자금, 미지급배당금 포함) 및 카드 정보 등을 일괄조회하고, 일정 잔고이하의 비활동성 계좌(금융투자회사의 경우 다른 재산이 없고 현금으로만 보유한 계좌)를 잔고이전·해지하며, 금융사기 피해예방을 위한 “계좌지급정지” 및 1년 이상 이용실적이 없는 휴면카드에 대한 관리등을 할 수 있는 서비스를 의미합니다.</li><li>2. “잔고이전·해지”라 함은 계좌를 해지하고 해당 원리금(상호금융기관의 미지급 출자금 및 배당금의 경우 해당 미지급금)을 본인 명의 계좌에 입금하거나, 계좌를 해지하고 해당 원리금을 서민금융진흥원으로 기부하는 것을 의미합니다.</li><li>3. “비활동성 계좌”라 함은 최종입출금일(만기가 있는 경우 만기일)로부터 조회일까지의 기간이 1년을 초과한 계좌를 의미합니다. 다만, 다음 각 목의 경우 비활동성계좌로 취급하지 않습니다.<ul><li>가. 은행, 상호금융기관, 저축은행의 한도대출약정계좌(마이너스통장), 세금우대계좌(은행의 경우 구개인연금저축계좌 제외), 청약관련계좌, 당좌예금 등의 계좌</li><li>나. 상호금융기관의 압류·추심, 상속분쟁 등 조합이 지급불가 사유로 지정한 미지급 출자금 및 배당금</li><li>다. 우체국의 퇴직급여 계좌대월 약정계좌, 세금우대계좌, 펀드연결계좌 등의 계좌</li><li>라. 금융투자회사의 세제혜택상품계좌, 투자재산 보유계좌, 즉시 잔고출금 불가한 CMA계좌, 유효 계약상품 보유계좌 등의 계좌</li></ul></li><li>4. “활동성계좌”라 함은 “비활동성계좌”를 제외한 계좌를 의미합니다.</li><li>5. “소액 비활동성계좌”란 비활동성계좌 중 잔고이전·해지가 가능한 계좌를 의미하며, 소액의 범위는 계좌통합관리서비스 홈페이지 및 계좌통합관리서비스 애플리케이션(이하 “애플리케이션”이라 함)에 게시합니다.</li> <li>6. “계좌지급정지”란 고객이 금융사기 피해예방을 위하여 지정한 본인 명의 계좌에 대하여 자동이체를 포함한 모든 출금?고 거래가 정지되는 것을 의미합니다. 다만, 금융투자회사 계좌지급정지의 경우 매매거래는 제외됩니다.</li><li>7. “휴면카드”란 카드 최종 이용일(발급 후 카드를 전혀 이용하지 않은 경우는 발급일 기준)로부터 1년 이상 이용실적이 없는 신용카드를 의미합니다.</li><li>8. “휴면카드 관리”란 휴면카드의 정보를 조회하여 카드를 해지하거나 계속이용(휴면상태 해제)할 수 있도록 신청하는 것을 의미합니다.</li><li>9. “휴대폰 인증”이란 고객이 선택한 주거래 금융회사에 등록된 휴대폰 번호를 통해 인증을 받거나 통신사의 본인명의 휴대폰을 통해 인증을 받는 것을 의미합니다.</li><li>10. “간편번호”란 계좌통합관리서비스 애플리케이션(이하 “애플리케이션”이라 함)에서 서비스 이용등록시 고객이 직접 입력하는 6자리 숫자로 인증서 없이 애플리케이션에 로그인을 할 수 있는 식별번호를 의미합니다.</li><li>11. “바이오정보”란 지문, 얼굴, 홍채 등 개인을 식별할 수 있는 신체적 또는 행동적 특성에 관한 정보와 그로부터 가공 또는 생성된 정보로 인증서 없이 애플리케이션에 로그인할 수 있는 정보를 의미합니다.</li><li>12. “구개인연금저축”이라 함은 구조세특례제한법 제86조(2013.1.1 삭제)의 소득공제 대상이었던 은행의 개인연금저축으로 2000년 6월 30일에 판매 종료된 상품입니다.</li><li>13. “인증서”라 함은 실지명의가 확인된 전자서명법상 인증서를 의미합니다.</li><li>14. “금융회사”라 함은 금융결제원 계좌통합관리업무에 참가 중인 <p>은행, 다음 각 목의 상호금융기관(해당 상호금융기관의 회원을 포함), 저축은행, 우체국, 금융투자회사, 카드사 등을 의미합니다.</p><ul><li>가. 농업협동조합중앙회</li><li>나. 수산업협동조합중앙회</li><li>다. 새마을금고중앙회</li><li>라. 신용협동조합중앙회</li><li>마. 산림조합중앙회</li></ul></li><li>15. “계좌통합관리업무 이용기관”(이하 “이용기관”이라 함)이라 함은 금융결제원으로부터  계좌통합관리 서비스 이용 승인을 받아 금융결제원과 이용계약을 체결하고 계좌통합관리서비스를 이용하는 기관을 말합니다.</li><li>16. “비대면채널”이라 함은 인터넷 홈페이지 또는 모바일 애플리케이션을 말합니다.</li></ul></li><li>② 이 약관에서 별도로 정하지 아니한 용어는 전자금융거래법, 전자금융거래법 시행령, 전자금융감독규정, 전자금융감독규정 시행세칙 등에서 정하는 바에 따릅니다.</li></ul></div><div class="terms_group03"><strong class="tit">제3조 (이용대상)</strong><p class="txt">본 서비스는 만 19세 미만 미성년자 및 외국인을 제외한 개인에 한해 이용할 수 있으며 법인, 임의단체는 이용할 수 없습니다.</p></div><div class="terms_group03"><strong class="tit">제4조 (이용채널)</strong><p class="txt">본 서비스는 금융결제원이 운영하는 홈페이지 및 애플리케이션과 금융회사 창구, 금융회사 및 이용기관 비대면채널 등에서 이용할 수 있습니다. 단, 채널별로 제공되는 서비스는 상이할 수 있으며, 자세한 내용은 계좌통합관리서비스 홈페이지에서 확인할 수 있습니다.</p></div><div class="terms_group03"><strong class="tit">제5조 (계좌통합관리서비스 홈페이지 이용방법)</strong><p class="txt">계좌통합관리서비스 홈페이지에서 본인 명의 인증서 제출과 휴대폰 본인인증을 통해 이용이 가능합니다.</p></div><div class="terms_group03"><strong class="tit">제6조 (계좌통합관리서비스 애플리케이션 이용방법)</strong><ul><li>① 계좌통합관리서비스 애플리케이션은 휴대폰 등에 애플리케이션을 설치한 후 본인명의 인증서 제출과 휴대폰 인증을 거쳐 이용등록 후 이용이 가능합니다.</li><li>② 계좌통합관리서비스 애플리케이션 로그인 방법은 본인명의 인증서 제출, 바이오정보와 간편번호 입력 중 선택 가능하며, 로그인 방법과 간편번호는 애플리케이션에서 변경할 수 있습니다. </li><li>③ 간편번호를 5회 이상 오류입력한 경우에는 제1항의 이용등록에 준하는 인증절차를 거쳐 애플리케이션 상에서 간편번호를 재등록한 후 이용할 수 있습니다. </li><li>④ 바이오정보 5회 이상 오류시 본 조 제1항의 이용등록에 준하는 인증절차를 거쳐 애플리케이션 상에서 바이오정보를 재등록한 후 이용할 수 있습니다.</li><li>⑤ 이용등록은 애플리케이션에서 해지할 수 있으며, 이용 등록 후 계좌통합관리서비스 홈페이지 또는 애플리케이션에서 1년 이상 로그인하지 않을 경우 고객 정보보호를 위하여 사전에 고객에게 알린 후 「개인정보 보호법」에서 정한 파기절차에 따라 기존 이용등록 정보는 삭제됩니다.</li><li>⑥ 고객이 모바일 기기를 변경할 경우 고객 정보보호를 위하여 변경된 모바일 기기에서만 서비스 이용이 가능하며, 기존 모바일 기기에서는 더 이상 서비스 이용을 할 수 없습니다.</li></ul></div><div class="terms_group03"><strong class="tit">제7조 (금융회사창구 이용방법)</strong><p class="txt">고객은 서비스를 제공하는 금융회사 중 창구를 운영하는 금융회사의 경우에는 영업점 창구에서 예금주 본인확인 절차와 신청서 작성을 통해 서비스를 이용할 수 있습니다.</p></div><div class="terms_group03"><strong class="tit">제8조 (금융회사 비대면채널 이용방법)</strong><p class="txt">고객은 고객이 거래하는 금융회사의 비대면채널에서 해당 금융회사 인증 정책에 따른 본인인증 및 휴대폰 인증 등을 거쳐 서비스를 이용할 수 있습니다.</p></div><div class="terms_group03"><strong class="tit">제9조 (이용기관 비대면채널 이용방법)</strong><p class="txt">고객은 이용기관의 비대면채널에서 해당 이용기관의 인증 정책에 따른 본인인증 및 휴대폰인증 등을 거쳐 서비스를 이용할 수 있습니다.</p></div><div class="terms_group03"><strong class="tit">제10조 (조회)</strong><ul><li>① 고객은 제4조 이용채널에서 제5조부터 제9조까지 이용방법에 의한 본인인증 완료 후 비밀번호 확인 없이 금융회사에 개설된 계좌 및 카드 정보 등을 조회할 수 있습니다. 다만, 제8조에 따라 금융회사가 제공하는 비대면채널의 경우 금융회사가 계좌 및 카드정보 조회서비스 제공여부를 선택할 수 있으며, 고객이 제7조에 따라 은행창구를 이용하는 경우에는 활동성 계좌에 대한 상세정보를 확인할 수 없습니다.</li><li>② 본 서비스에서 조회되는 계좌 및 카드정보 등은 계좌통합관리서비스 홈페이지 또는 애플리케이션에 게시합니다.</li><li>③ 본 서비스에서는 고객이 금융회사 창구 및 비대면채널에서 거래가 제한되도록 요청한 계좌는 조회가 되지 않습니다.</li><li>④ 본 서비스에서는 거래 금융회사에서 확인된 사망자 계좌는 조회가 되지 않습니다.</li></ul></div><div class="terms_group03"><strong class="tit">제11조 (잔고이전·해지)</strong><ul><li>① 고객은 제4조 금융결제원이 운영하는 홈페이지 및 애플리케이션과 금융기관 및 이용기관 비대면채널에서 제2조제1항 제5호의 “소액 비활동성계좌”에 한하여 잔고이전·해지를 할 수 있습니다. 다만, 금융투자회사의 경우 현금(CMA평가금액 포함)만 보유한 계좌에 한하여 잔고이전·해지를 할 수 있습니다.</li><li>② 본 서비스에서는 통장 또는 금융투자회사의 경우 증권카드 등 거래매체의 제시, 인감의 날인, 비밀번호 입력 없이 고객의 신청만으로 계좌의 잔고이전·해지가 가능합니다. </li><li>③ 지급정지, 압류가 등록된 계좌 등 일부 계좌의 경우에는 잔고이전·해지가 되지 않을 수 있습니다.</li><li>④ 본 서비스에서 제1항에 따라 잔고이전·해지 할 경우 해당계좌에 등록된 자동이체와 카드를 해지할 수 있습니다.</li><li>⑤ 본 서비스에서 은행, 상호금융기관, 저축은행, 우체국의 정기예·적금 계좌를 해지요청 시 제4조 금융결제원이 운영하는 홈페이지 및 애플리케이션과 금융기관 및 이용기관 비대면채널 인증정책에 따라 인증된 휴대폰번호와 해지계좌 금융회사에 등록된 휴대폰번호가 불일치할 경우 인증된 휴대폰번호로 변경에 동의하는 경우에 한해 잔고이전·해지가 가능합니다.</li><li>⑥ 다만 제1항에도 불구하고, 금융투자회사의 즉시출금이 불가능한 CMA평가금액이 포함된 계좌에 대해서는 잔고이전?해지가 불가합니다.</li></ul></div><div class="terms_group03"><strong class="tit">제12조 (계좌지급정지)</strong><ul><li>① 고객은 제4조 이용채널에서 조회되는 수시입출금계좌 및 금융투자회사 계좌에 한하여 지급정지를 신청할 수 있습니다.</li><li>② 지급정지 신청을 받은 금융회사는 이를 지체없이 처리합니다.</li><li>③ 계좌지급정지시 해당계좌에 연결된 직불·체크카드 이용이 제한됩니다.</li><li>④ 계좌지급정지가 되더라도 채권 압류?추심 등 법령에 따른 강제집행 및 권리행사가 우선됩니다. 단, 계좌지급정지는 전기통신금융사기 피해 방지 및 피해금 환급에 관한 특별법에 따른 사기이용계좌의 지급정지의 효력에 영향을 미치지 않습니다.</li><li>⑤ 계좌지급정지에 의해 발생하는 자동이체 정지로 인한 결제대금·요금·대출원리금 등의 미납, 연체료 발생 등에 대해 금융회사와 금융결제원은 책임지지 않습니다.</li><li>⑥ 계좌지급정지의 해지는 금융회사를 통해 가능하며, 금융회사마다 해지 절차는 다를 수 있습니다.</li></ul></div><div class="terms_group03"><strong class="tit">제13조 (휴면카드 관리)</strong><ul><li>① 고객은 제5조, 제6조의 계좌통합관리서비스 홈페이지 및 애플리케이션에서 제10조에 따라 “휴면카드”로 조회되는 카드에 한하여 카드를 해지하거나 계속이용(휴면상태 해제)을 신청할 수 있습니다.</li><li>② 부가기능[고속도로 통행료 지불 기능(하이패스 카드), 현금인출 기능 등]을 사용중이거나, 미납금이 존재하는 등 카드사의 정책에 따라 카드해지 및 계속이용 신청이 제한될 수 있습니다.</li></ul></div><div class="terms_group03"><strong class="tit">제14조 (고객의 개인정보보호)</strong><ul><li>① 금융회사는 금융결제원과 제휴 혹은 사업승인을 받지 아니한 기업(기관)에서 스크린 스크래핑 등의 기술을 이용하여 본 서비스를 통한 고객의 데이터를 수집, 이용 또는 제공(전달)하는 행위를 불허합니다.</li><li>② 고객의 고의 또는 중과실로 금융결제원과 제휴 혹은 사업승인을 받지 않은 기업(기관)을 통해 본 서비스를 이용하여 발생한 고객정보유출 등의 피해에 대해서는 금융결제원 및 금융회사는 책임의 일부 또는 전부를 지지 않습니다. 다만 금융결제원 및 금융회사의 고의 또는 과실로 인한 귀책사유가 있는 경우 금융결제원 및 금융회사는 그 책임의 일부 또는 전부를 부담합니다.</li><li>③ 금융결제원은 고객의 개인정보보호를 위하여 제5조, 제6조의 계좌통합관리서비스 홈페이지 및 애플리케이션 서비스 이용이 부정사용이라는 것이 명백한 경우(경찰청의 수사협조요청 등) 고객의 서비스 이용을 제한 및 해지조치하고 사후 고지할 수 있습니다.</li></ul></div><div class="terms_group03"><strong class="tit">제15조 (서비스 이용수수료)</strong><p class="txt">본 서비스에서 해지원리금을 본인명의 계좌에 입금 시 발생하는 수수료는 해지계좌 금융회사에서 인터넷뱅킹 등에 고시한 이용수수료가 적용됩니다.</p></div><div class="terms_group03"><strong class="tit">제16조 (약관의 변경)</strong><p class="txt">전자금융거래 기본약관의 약관의 변경 조항을 준용합니다.</p></div><div class="terms_group03"><strong class="tit">제17조 (다른 약관과의 관계)</strong><p class="txt">이 약관에서 정하지 아니한 사항은 각 항에 준용합니다.</p><ul><li>① 은행, 우체국, 저축은행의 경우 예금거래기본약관, 전자금융거래 기본약관, 입출금이 자유로운 예금약관, 관련 예금 및 신탁약관을 준용합니다.</li><li>② 상호금융기관의 경우 예(탁)금거래기본약관, 전자금융거래 기본약관, 입출금이 자유로운 예(탁)금약관, 관련 예금 및 신탁약관 등을 준용합니다.</li><li>③ 금융투자회사, 카드사의 경우 전자금융거래 이용에 관한 기본약관을 준용합니다.</li></ul></div><div class="terms_group03"><strong class="tit">부 칙 (2024. 9. 24.)</strong><p>이 약관은 2024. 9. 24.부터 시행합니다. 다만, 이 약관 시행일 이전에 바이오정보를 등록하여 인증을 수행한 경우에는 종전 약관 제2조 제1항 제10호 및 제6조 제1항이 적용됩니다.</p></div><div class="terms_group03"><strong class="tit">부 칙 (2025. 6. .)</strong><p>이 약관은 2025. 6. .부터 시행합니다. 다만, 이 약관 시행일 이전에 바이오정보를 등록하여 인증을 수행한 경우에는 종전 약관 제2조 제1항 제10호 및 제6조 제1항이 적용됩니다.</p></div>'},
                                  {stltTinm : '[필수] 고객 위임 동의', stltCntn : '<p class="terms_txt">계좌해지&middot;잔고이전 서비스를 이용하기 위해 아래 위임 절차에 동의하여 주시기 바랍니다.</p><div class="terms_group02"><strong class="terms_tit">위임 받는 자</strong><div class="board_box"><ul><li><strong>기관명</strong><span>농협중앙회</span></li><li><strong>전화번호</strong><span>1234-1234</span></li><li><strong>관계</strong><span>정보주체로부터 위임을 받은 자</span></li><li><strong>주소</strong><span>00시 00구 00로</span></li></ul></div></div><div class="terms_group02"><strong class="terms_tit">위임 하는 자</strong><div class="board_box"><ul><li><strong>성명</strong><span>김농협</span></li><li><strong>전화번호</strong><span>1234-1234</span></li><li><strong>생년월일</strong><span>1999.01.01</span></li><li><strong>이메일주소</strong><span>abcde@gmial.com</span></li></ul></div></div><div class="terms_desc"><p class="terms_txt">개인정보보호법 제38조 제1항에 따라 위와 같이 계좌해지∙잔고 이전에 관한 일체의 행위를 위의 자에게 위임합니다.</p><div class="terms_sign"><span class="date">0000년 00월 00일</span><span class="name">위임자</span></div></div>'},
                                  {stltTinm : '[필수] 개인정보 수집·이용 동의', stltCntn : 'asdasdasdasdasdasd'},
                              ],
            finalUpdateDtm  : '', // 업데이트 일시
            tempUpdateDtm   : '', // 최초진입 시 업데이트 일시
            chgFlag         : false, // 최초 진입 여부

            isShowBtn       : false   // 버튼활성화 여부 (true:보임, false:숨김)
        }
    },
	computed: {
        ...mapGetters('myassets', [
            'myAssetsBzRgCnt',
			'myAssetsBzrgList',
            'isMyAssetGathering',
            'lastUpdateDtm'
		]),
        assetUpdateDtm(){
            this.finalUpdateDtm = this.lastUpdateDtm
            
            if(this.chgFlag) { // 최초 진입이 아니면서
                if(this.tempUpdateDtm != this.lastUpdateDtm) { // 최초 업데이트 일시와 마지막 업데이트 일시가 다른 경우
                    this.getData() // 재조회
                    this.tempUpdateDtm = this.lastUpdateDtm
                }
            } else {
                this.chgFlag = true // 최초 진입시에는 재조회를 태우지 않기 위해
            }
            
            /* 자산 업데이트 5분 체크 end */
            return this.finalUpdateDtm
        }
    },
    mounted() {
        this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        ...mapActions('myassets', [
            'getMyBizRegInfo','getAllMyAssetInfo'
        ]),
        initComponent(param) {
            this.tempUpdateDtm = this.lastUpdateDtm // 최초 진입 업데이트 일시를 담아둠(자산 업데이트 이벤트 호출 시 재조회하기 위함)
            
            this.getMydtAcStsc()
            this.getData()
        },
        
        /* 숨은자산 조회 */
        getData() {
            // 0 : 휴면계좌
            // 1 : 휴면보험금
            const config1 = {
                url: '/as/tn/01r03',
                data: {
                    inqDsc  : '3',                           // 1:기관코드->은행코드, 2:은행코드->기관코드
                    //inqCd   : item.infOfrmnOrgC              // 정보제공자기관코드
                }
            }
            apiService.call(config1).then(response =>{
                this.bnkInfo = response.bnkList

                response.bnkList.forEach(el=> this.infInfo.push(el.infOfrmnOrgC)) // 기관목록에 담기
            })

            const config = {
                url: '/as/tn/01r01',
                data: {
                    mydtCusno : this.getUserInfo("mydtCusno")
                }
            }
            apiService.call(config).then(response =>{
                if(!_.isEmpty(response)) {
                    if(!_.isEmpty(response.bnkList)) {
                        this.bnkList = response.bnkList // 휴면계좌 목록
                    }
                    if(!_.isEmpty(response.isrList)) {
                        this.isrList = response.isrList // 휴면보험금 목록
                    }
                }
                

            })
        },
        /* 테스트 함수 */
        fnChgAcObj(val0, val1, val2, val3, val4, val5, val6) {
            let rtn = {
                sqno          : val0, // 순서
                infOfrmnOrgC  : val1, // 기관코드
                acWrsnm       : val2, // 상품명
                mydtAcno      : val3, // 계좌번호
                acNowBac      : val4, // 잔액
                mydtAcStsc    : val5, // 해지구분코드 
                curc          : "원",
                mydtScno      : val6, // 예금회차
            }

            return rtn
        },

        fnTab(idx) {
            this.tabIdx = idx
        },
        /* 해지구분코드 목록 조회 */
        getMydtAcStsc() {
            /* 공통코드 해지구분코드 목록 */
            const config = {
                url: '/co/co/00r01',
                data: {
                    comnCId   : "MYDT_AC_STSC", // 테마구분코드
					delYn     : '0'         // 삭제여부
                }
            }

            apiService.call(config).then(response => {
                if(!_.isEmpty(response)) {
                    this.mydtAcStscList = response.comnCList
                }
            })
        },
        
        /* 약관동의 */
        fnStltAgree(item) {
            if(item.mydtAcStsc == "99") {
                // 2. 해지완료인 경우
                modalService.alert("해지 완료 되었어요. 자산연결 재 진행 시 목록에서 사라집니다.")
            } else if(item.mydtAcStsc == "98") {
                // 3. 잔고 이전 및 해지 신청하였으나 아직 완료 되지 않은 상태
                modalService.alert("처리 진행중이에요. 익일 다시 확인해 주세요.")
            } else if(item.acNowBac == 0) {
                // 4. 잔액이 0인 경우
                modalService.alert("잔액이 0원인 계좌는 NH콕마이데이터에서 해지가 어려워요. 해당 금융기관에서 해지하여 주세요.")
            } else if(item.acNowBac > 1000000
                    || this.mydtAcStscList.findIndex(el=>el.comnCVal != '01' && el.comnCVal != '98' && el.comnCVal != '99' && el.comnCVal == item.mydtAcStsc) >= 0
                    || !this.infInfo.includes(item.infOfrmnOrgC)
                    ) {
                // 5.계좌의 잔액이 100만원보다 큰 경우
                // 6. 해지여부조회 후 해지 불가 시
                // 7. 해지예상금액조회 후 해지 불가 시
                // 8. 잔고이전이 가능한 19개 은행을 제외한 계좌
                modalService.alert("NH콕마이데이터에서 해지가 어려운 계좌예요. 해당 금융기관에서 해지하여 주세요.")
            } else {
                // 09:00~22:00만 이용 가능
                let now = new Date()
                let hh  = this.fnLpad(now.getHours(),2,"0")
                let mi  = this.fnLpad(now.getMinutes(),2,"0")
                let sysdtm = hh+""+mi
                
                if(sysdtm < "0900" || sysdtm > "2200") {
                    modalService.alert("서비스 제공시간은 09:00 ~ 22:00입니다.")
                    return
                }

                // 정보제공자기관코드를 입력값으로 넣어 은행코드를 가져옴
                const config1 = {
                    url: '/as/tn/01r03',
                    data: {
                        inqDsc  : '1',                           // 1:기관코드->은행코드, 2:은행코드->기관코드
                        inqCd   : item.infOfrmnOrgC              // 정보제공자기관코드
                    }
                }
                apiService.call(config1).then(response =>{
                    this.bankCode = response.bnkList[0].repNbnkC   // 은행코드

                    // 약관 팝업 호출
                    //let tmpMydtScno = item.mydtScNo.replaceAll("NULL", "") // 회차번호가 없으면 NULL이라는 문자로 들어오기 때문에 api 입력으로 쓰기위해 공백으로 치환
                    let tmpMydtScno = item.mydtScNo == "NULL" ? null : item.mydtScNo // 회차번호가 없으면 NULL이라는 문자로 들어오기 때문에 api 입력으로 쓰기위해 null으로 치환

                    let compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4004/ASTN4004"))
                    const config = {
                        component: compName, 
                        params   : {
                                callDsc        : 'E',
                                eligibilityObj : {
                                        bankCode        : this.bankCode,     // 개설 금융회사 코드
                                        accountNum      : item.mydtAcno,     // 계좌 번호
                                        depositSequence : tmpMydtScno,       // 예금 회차 번호
                                        infOfrmnOrgC    : item.infOfrmnOrgC, // 정보제공자기관코드(계좌해지가능여부 조회 API 및 계좌해지 및 잔액이전 API에서 해지 비트를 업데이트 하기 위해 infOfrmnOrgC(PK)를 들고감)
                                        infOfrmnOrgNm   : item.infOfrmnOrgNm,// 정보제공자기관코드명
                                        acNowBac        : item.acNowBac      // 잔액이 0인 경우는 예상금액을 태우지 않아야하므로 들고 감
                                    },
                                stltList       : this.stltList
                            }
                    }

                    modalService.openPopup(config).then(response => {
                        // 해지가능여부 조회는 이미 약관에서 처리하고 돌아옴
                        if(!_.isEmpty(response)) { // 동의 완료
                            if(response.flag == 'success') {
                                // 계좌이체/기부로 이동
                                let compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4006/ASTN4006")) // 계좌이체/기부

                                const config = {
                                    component : compName,
                                    params    : {
                                        infOfrmnOrgC    : item.infOfrmnOrgC,        // 정보제공자기관코드(계좌해지가능여부 조회 API 및 계좌해지 및 잔액이전 API에서 해지 비트를 업데이트 하기 위해 infOfrmnOrgC(PK)를 들고감)
                                        infOfrmnOrgNm   : item.infOfrmnOrgNm,       // 정보제공자기관코드명(해지결과안내에서 사용)
                                        accountType     : response.param.accountType,     // 계좌 종류(1:수시입출금, 2:예적금)
                                        acWrsnm         : item.acWrsnm,             // 계좌상품명
                                        mydtAcno        : item.mydtAcno,            // 계좌번호
                                        mydtScNo        : tmpMydtScno,              // 회차번호
                                        acNowBac        : item.acNowBac,            // 잔액
                                        curc            : item.curc,                // 통화코드
                                        terminationId   : response.param.terminationId,   // 거래검증ID
                                        bankCode        : this.bankCode             // 해지될 계좌 은행코드
                                    }
                                }
                                
                                modalService.openPopup(config).then((response) => {
                                    if(response == 'refresh') {
                                        this.getData() // 재조회
                                    }

                                    if(response?.flag == 'refresh') {
                                        this.getData()
                                    }
                                    
                                    if(response.flag == 'impossible') { // 해지가 불가한 계좌
                                        modalService.alert(response.msg+"<br>해당 계좌 기관에 직접 문의<br>또는 해지 요청해 주세요.")
                                        this.getData()
                                    } else if(response == 'svcOut') {
                                        // 09:00~22:00만 이용 가능
                                        modalService.alert("서비스 제공시간은 09:00 ~ 22:00입니다.").then(()=>{
                                            this.closeAll()
                                        })
                                        return
                                    }
                                });
                            } else if(response.flag == 'impossible') {
                                modalService.alert(response.msg+"<br>해당 계좌 기관에 직접 문의<br>또는 해지 요청해 주세요.").then(()=>{
                                    this.getData()
                                })
                            } else if(response.flag == 'clear' || response.flag == 'refresh') {
                                this.getData()
                            }
                            
                        }
                    })
                })
            }
        },
        /* 팝업 열기 */
        fnOpenDtl(idx, item) {
            // idx 1:상세 2:해지계좌목록
            let compName = ''

            if(idx == 1) {                // 숨은자산 휴면예금/휴면보험금 상세 팝업
                // 1 : 휴면계좌
                // 2 : 휴면보험금
                // 3 : 휴면보험금(미청구)
                let tmpMydtAcno = (item.dsc == '01') ? item.mydtAcno : item.isrSctsNo
                let obj = {}

                const detail_config = {
                    url: '/as/tn/01r02',
                    data: {
                        mydtCusno    : this.getUserInfo("mydtCusno"),   // 마이데이터 고객번호
                        inqDsc       : item.dsc,                       // 구분코드 01:계좌 02:보험금 03:보험금(미청구)
                        mydtAcno     : tmpMydtAcno,                     // 계좌번호 또는 보험증권번호
                        infOfrmnOrgC : item.infOfrmnOrgC               // 정보제공자기관코드
                    }
                }
                apiService.call(detail_config).then(response => {
                    obj = response

                    compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4002/ASTN4002"))

                    const config = {
                        component: compName,
                        params   : {
                                paramObj : obj,
                                infInfo  : this.infInfo, // 제공기관 목록(19개)
                                stltList : this.stltList // 이용약관
                        }
                    }
                    modalService.openPopup(config).then((response) => {
                        if(response == 'refresh') {
                            this.getData() // 재조회
                        }
                    });
                })

                
            } else if(idx == 2) {         // 해지계좌목록
                compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4003/ASTN4003"))

                const config = {
                    component: compName
                }

                modalService.openPopup(config).then((response) => {


                });
            }
        },
        
        // 수집갱신 처리
        async fn_refreshApiCall() {
            // 20220422 두번 클릭 방지 
            if(!this.isMyAssetGathering){
                this.getAllMyAssetInfo()
            }
        },
        // 신규 자산 연결
        fnNewAsset() {
            let orgDsc = "bank" // 은행 카테고리
            let compName = defineAsyncComponent(() => import("@/views/page/CO/AR/COAR4002/COAR4002"))
            const config = {
                component : compName,
                params : {
                    isMramNew : true,
                    orgDsc : orgDsc
                }
            }
            modalService.openPopup(config).then(() => {
                this.getData();
            })
        },

        fnLpad(v, len, pv) {
            v = v + '';
            return v.length >= len ? v : new Array(len - v.length + 1 ).join(pv) + v;
        },
    },
    components : {
        Page,
        FootersV2,
        LottieAnimation
    },
    destroyed() {
        //this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>