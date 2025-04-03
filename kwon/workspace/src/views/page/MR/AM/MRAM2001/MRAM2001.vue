<!--
/*************************************************************************
* @ 서비스경로 : 더보기 > 전체메뉴 > 연결자산관리 > 연결자산목록
* @ 페이지설명 : 전체메뉴 > 연결자산관리 > 연결자산목록
* @ 파일명     : src\views\page\MR\AM\MRAM2001\MRAM2001.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-07-28
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-28              CS528069              최초작성
* ! 공공데이터 개발 테스트 데이터가 존재하지않아 연결자산목록에서 제외 (데이터 유무에 따른 추가개발이 있을 수 있음)
*************************************************************************/
-->

<template>
    <page class="content-view mydata2023">
        
        <!-- content -->
        <div id="content" class="renewal com_sub_type01 bottomBtnType" ref="content">
            <div class="com_inner">
                <div class="layoutBox topTit">
                    <div class="left">
                        <strong class="titH1">연결한 <span>{{totalConOrgCnt}}</span>개의 기관을<br>관리하고 있어요</strong>
                    </div>
                    <div class="right">
                        <button type="button" class="stdBtn innerType01" @click="fn_openAssetPage()">자산연결</button>
                    </div>
                </div>
                <div v-if="orgPrdCnt > 0" class="box_border_link iconType01">
                    <a role="button" @click.prevent="fn_openExpr(1)"><span class="arrow"><em class="num">{{orgPrdCnt}}</em>개의 기관이 만료 예정 이예요.</span></a>
                </div>
                <div class="com_tabmenu_type03 switchType btn2">
                    <ul role="tablist">
                        <li :class="isConnectedTab ? 'on' : ''" role="presentation" aria-controls="tab_01"><a role="tab" @click="isConnectedTab = true"><span>연결 기관</span></a></li>
                        <li :class="!isConnectedTab ? 'on' : ''" role="presentation" aria-controls="tab_02"><a role="tab" @click="isConnectedTab = false"><span>만료&middot;해제 기관</span></a></li>
                    </ul>
                </div>
               

                <!-- 연결기관 tabBox 시작 -->
                <div v-show="isConnectedTab" id="tab_01" role="tabpanel" class="cmm-tab-panel on">
                    <template v-if="nacfAccList.length > 0 ? 1 + Number(bankList.length) : Number(bankList.length) > 0">

                        <!-- 은행 -->
                        <div class="custom_box">
                            <div class="list_type_box">
                                <div class="new_tit_area">
                                    <div class="tit"><span>은행</span> <span class="com_icon_num custom">{{nacfAccList.length > 0 ? 1 + Number(bankList.length) : Number(bankList.length)}}</span></div>
                                </div>
                            </div>
                        </div>
                        <!--// 은행 -->

                        <!-- <div data-ui-toggle="box" class="toggle_box_area">
                            <button type="button" class="view_btn" aria-expanded="false">
                                <div class="new_tit_area new_tit_area02">
                                    <div class="tit">
                                        <i :class="nacfAccList.length > 0 ? nacfAccList[0].infOfrmnOrgC : 'com_no_img'"><span class="blind">농협</span></i>
                                        <span>농협중앙회</span>
                                    </div>
                                </div>
                                <em class="open">열기</em>
                                <em class="close">닫기</em>
                            </button>
                        </div>
                        <ul class="view_cont list_type_01">
                            <li v-for="(nacfAcc, idx) in nacfAccList" :key="'nacfAcc_'+idx">
                                <dl>
                                    <dt>
                                        <em>{{nacfAcc.acWrsnm}}</em>
                                    </dt>
                                    <dd>
                                        <em class="num">{{nacfAcc.mydtAcno}}</em>
                                    </dd>
                                </dl>
                                <span class="cmm-switch custom-switch" v-if="nacfAccTogYn">
                                    <input type="checkbox" :id="'nacfAccChk_'+idx" :checked="nacfAcc.checked" role="switch" @change="fn_chngStsDsc(idx, $event)">
                                    <label :for="'nacfAccChk_'+idx"><em class="blind">선택</em></label>
                                </span>
                            </li>
                        </ul> -->
                        <!-- 농협중앙회 -->
                        <div class="com_box_type01 bottomBtnType">
                            <div class="tit">
                                <i :class="nacfAccList.length > 0 ? nacfAccList[0].infOfrmnOrgC : 'com_no_img'"><span class="blind">농협중앙회</span></i>
                                <div class="btn_check">
                                    <span class="nacf_name">농협중앙회</span>
                                </div>
                            </div>
                            <div class="slideBox">
                                <ul class="list_type_01">
                                    <li v-for="(nacfAcc, idx) in nacfAccList" :key="'nacfAcc_'+idx">
                                        <dl>
                                            <dt>
                                                <em class="prod_name">{{nacfAcc.acWrsnm}}</em>
                                            </dt>
                                            <dd>
                                                <em class="bank_num">{{nacfAcc.mydtAcno}}</em>
                                            </dd>
                                        </dl>
                                        <span class="cmm-switch fxn">
                                            <input type="checkbox" name="check01" :id="'nacfAccChk_'+idx" :checked="nacfAcc.checked" role="switch" @change="fn_chngStsDsc(idx, $event)">
                                            <label :for="'nacfAccChk_'+idx"><em class="blind">계좌선택</em></label>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <button class="bottomBtn">더보기</button>
                        </div>
                        <!--// 농협중앙회 -->
                        <!-- 다른 은행 -->
                        <template v-for="(bankItem, bankIdx) in bankList">
                            <div :class="`com_box_type01 bottomBtnType`" :key="'bank_'+bankIdx">
                                <div class="tit">
                                    <i :class="bankItem.infOfrmnOrgC !== '' ? bankItem.infOfrmnOrgC : 'com_no_img'"><span class="blind">{{ bankItem.orgnm }}</span></i>
                                    <div class="btn_check">
                                        <input type="checkbox" name="allagree" :id="`bank_${bankIdx}`" :value="`bank_${bankIdx}`" v-model="checkedList" @click="fn_chkOrgInfo('bank', bankItem, $event)">
                                        <label :for="`bank_${bankIdx}`">
                                            <span class="bank_name">{{ bankItem.orgnm }}</span>
                                            <span class="dat">연결만료<i>{{ bankItem.tmsEdDt | dateFilter("YYYY.MM.DD") }}</i></span>
                                        </label>
                                    </div>
                                    <span v-if="fn_dayDiff(bankItem.tmsEdDt , currentDate) >= 0 && fn_dayDiff(bankItem.tmsEdDt , currentDate) <=30" class="txtFinish">만료예정</span>
                                </div>
                                <div class="slideBox">
                                    <ul class="list_type_02">
                                        <li>
                                            <span>정기 업데이트</span>
                                            <em>{{bankItem.fxtmTmsYn === '1' ? "주 1회" : "아니오"}}</em>
                                        </li>
                                        <li>
                                            <span>적요&middot;거래메모 전송</span>
                                            <em>{{bankItem.snsColAgrYn === '1' ? "동의" : "미동의"}}</em>
                                        </li>
                                        <!-- <li v-if="bankItem.mchtInfColAgrYn">
                                            <span>가맹점&middot;사업자등록번호 전송</span>
                                            <em>{{bankItem.mchtInfColAgrYn === '1' ? "동의" : "미동의"}}</em>
                                        </li>
                                        <li v-if="bankItem.wrsInfColAgrYn">
                                            <span>상품구매 카테고리 전송</span>
                                            <em>{{efinItem.wrsInfColAgrYn === '1' ? "동의" : "미동의"}}</em>
                                        </li> -->
                                    </ul>
                                    <ul class="list_type_01">
                                        <li v-for="(bankWrsItem, bankWrsIdx) in bankItem.wrsList" :key="'bankWrs_'+bankWrsIdx">
                                            <dl>
                                                <dt>
                                                    <em class="prod_name">{{ bankWrsItem.wrsnm }}</em>
                                                </dt>
                                                <dd v-for="(bankAccItem, bankAccIdx) in bankWrsItem.accList" :key="'bankAcc_'+bankAccIdx">
                                                    <em class="bank_num">{{ bankAccItem.wrsCntn }}</em>
                                                </dd>
                                            </dl>
                                            <!-- <span class="cmm-switch fxn">
                                                <input type="checkbox" id="check01" name="check01" checked role="switch">
                                                <label for="check01"><em class="blind">계좌선택</em></label>
                                            </span> -->
                                        </li>
                                        <!-- <li>
                                            <dl>
                                                <dt>
                                                    <em class="prod_name">(가계일반)농업인멤버쉽대출-조합자 최저리자금</em>
                                                </dt>
                                                <dd>
                                                    <em class="bank_num">13246534325</em>
                                                </dd>
                                            </dl>
                                            <span class="cmm-switch fxn">
                                                <input type="checkbox" id="check02" name="check02" role="switch">
                                                <label for="check02"><em class="blind">계좌선택</em></label>
                                            </span>
                                        </li> -->
                                    </ul>
                                </div>
                                <button class="bottomBtn">더보기</button>
                                <!-- @click="fn_openDetail(bankItem)" -->
                            </div>
                        </template>
                        <!-- // 다른 은행 -->
                    </template>

                    <!-- 카드 -->
                    <template v-if="cardList.length > 0">
                        <div class="custom_box">
                            <div class="list_type_box">
                                <div class="new_tit_area">
                                    <div class="tit"><span>카드</span> <span class="com_icon_num custom">{{ cardList.length }}</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="com_box_type01 bottomBtnType" v-for="(cardItem, cardIdx) in cardList" :key="'card_'+cardIdx">
                            <!-- <template></template> -->
                            <div class="tit">
                                <i :class="cardItem.infOfrmnOrgC !== '' ? cardItem.infOfrmnOrgC : 'com_no_img'"><span class="blind">{{cardItem.orgnm}}</span></i>
                                <div class="btn_check">
                                    <input type="checkbox" name="allagree" :id="`card_${cardIdx}`" :value="`card_${cardIdx}`" v-model="checkedList" @click="fn_chkOrgInfo('card', cardItem, $event)">
                                    <label :for="`card_${cardIdx}`">
                                        <span class="card_name">{{cardItem.orgnm}}</span>
                                        <span class="dat">연결만료<i>{{cardItem.tmsEdDt | dateFilter("YYYY.MM.DD")}}</i></span>
                                    </label>
                                </div>
                                <span class="txtFinish" v-if="fn_dayDiff(cardItem.tmsEdDt , currentDate) >= 0 && fn_dayDiff(cardItem.tmsEdDt , currentDate) <=30">만료예정</span>
                            </div>
                            <div class="slideBox">
                                <ul class="list_type_02">
                                    <li>
                                        <span>정기 업데이트</span>
                                        <em>{{cardItem.fxtmTmsYn === '1' ? "주1회" : "아니오"}}</em>
                                    </li>
                                    <!-- <li>
                                        <span>적요&middot;거래메모 전송</span>
                                        <em>동의</em>
                                    </li> -->
                                    <li>
                                        <span>가맹점&middot;사업자등록번호 전송</span>
                                        <em>{{cardItem.mchtInfColAgrYn === '1' ? "동의" : "미동의"}}</em>
                                    </li>
                                    <!-- <li>
                                        <span>상품구매 카테고리 전송</span>
                                        <em>미동의</em>
                                    </li> -->
                                </ul>
                                <ul v-show="cardItem.wrsList.length > 0" class="list_type_01">
                                    <li v-for="(cardWrsItem, cardWrsIdx) in cardItem.wrsList" :key="'cardWrs_'+cardWrsIdx">
                                        <dl>
                                            <dt>
                                                <em class="prod_name">{{ cardWrsItem.wrsnm }}</em>
                                            </dt>
                                            <dd v-for="(cardAccItem, cardAccIdx) in cardWrsItem.accList" :key="'cardAcc_'+cardAccIdx">
                                                <em class="bank_num">{{ cardAccItem.wrsCntn }}</em>
                                            </dd>
                                        </dl>
                                    </li>
                                </ul>
                            </div>
                            <button class="bottomBtn">더보기</button>
                        </div>
                    </template>
                    <!--// 카드 -->
                    <!-- 증권 -->
                    <template v-if="investList.length > 0">
                        <div class="custom_box">
                            <div class="list_type_box">
                                <div class="new_tit_area">
                                    <div class="tit"><span>증권</span> <span class="com_icon_num custom">{{investList.length}}</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="com_box_type01 bottomBtnType" v-for="(investItem, investIdx) in investList" :key="'invest_'+investIdx">
                            <div class="tit">
                                <i :class="investItem.infOfrmnOrgC !== '' ? investItem.infOfrmnOrgC : 'com_no_img'"><span class="blind">{{investItem.orgnm}}</span></i>
                                <div class="btn_check">
                                    <input type="checkbox" name="allagree" :id="`invest_${investIdx}`" :value="`invest_${investIdx}`" v-model="checkedList" @click="fn_chkOrgInfo('invest', investItem, $event)">
                                    <label :for="`invest_${investIdx}`">
                                        <span class="bank_name">{{investItem.orgnm}}</span>
                                        <span class="dat">연결만료<i>{{investItem.tmsEdDt | dateFilter("YYYY.MM.DD")}}</i></span>
                                    </label>
                                </div>
                                <span v-if="fn_dayDiff(investItem.tmsEdDt , currentDate) >= 0 && fn_dayDiff(investItem.tmsEdDt , currentDate) <=30" class="txtFinish">만료예정</span>
                            </div>
                            <div class="slideBox">
                                <ul class="list_type_02">
                                    <li>
                                        <span>정기 업데이트</span>
                                        <em>{{investItem.fxtmTmsYn === '1' ? "주1회" : "아니오"}}</em>
                                    </li>
                                    <!-- <li>
                                        <span>적요&middot;거래메모 전송</span>
                                        <em>동의</em>
                                    </li>
                                    <li>
                                        <span>가맹점&middot;사업자등록번호 전송</span>
                                        <em>동의</em>
                                    </li>
                                    <li>
                                        <span>상품구매 카테고리 전송</span>
                                        <em>미동의</em>
                                    </li> -->
                                </ul>
                                <ul v-show="investItem.wrsList.length > 0" class="list_type_01">
                                    <li v-for="(investWrsItem, investWrsIdx) in investItem.wrsList" :key="'investWrs_'+investWrsIdx">
                                        <dl>
                                            <dt>
                                                <em class="prod_name">{{ investWrsItem.wrsnm }}</em>
                                            </dt>
                                            <dd v-for="(investAccItem, investAccIdx) in investWrsItem.accList" :key="'investAcc_'+investAccIdx">
                                                <em class="bank_num">{{ investAccItem.wrsCntn }}</em>
                                            </dd>
                                        </dl>
                                    </li>
                                </ul>
                            </div>
                            <button class="bottomBtn">더보기</button>
                        </div>
                    </template>
                    <!--// 증권 -->
                    <!-- 보험 -->
                    <template v-if="insuList.length > 0">
                        <div class="custom_box">
                            <div class="list_type_box">
                                <div class="new_tit_area">
                                    <div class="tit"><span>보험</span> <span class="com_icon_num custom">{{insuList.length}}</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="com_box_type01 bottomBtnType" v-for="(insuItem, insuIdx) in insuList" :key="'insu_'+insuIdx">
                            <div class="tit">
                                <i :class="insuItem.infOfrmnOrgC !== '' ? insuItem.infOfrmnOrgC : 'com_no_img'"><span class="blind">{{insuItem.orgnm}}</span></i>
                                <div class="btn_check">
                                    <input type="checkbox" name="allagree" :id="`insu_${insuIdx}`" :value="`insu_${insuIdx}`" v-model="checkedList" @click="fn_chkOrgInfo('insu', insuItem, $event)">
                                    <label :for="`insu_${insuIdx}`">
                                        <span class="bank_name">{{insuItem.orgnm}}</span>
                                        <span class="dat">연결만료<i>{{insuItem.tmsEdDt | dateFilter("YYYY.MM.DD")}}</i></span>
                                    </label>
                                </div>
                                <span v-if="fn_dayDiff(insuItem.tmsEdDt , currentDate) >= 0 && fn_dayDiff(insuItem.tmsEdDt , currentDate) <=30" class="txtFinish">만료예정</span>
                            </div>
                            <div class="slideBox">
                                <ul class="list_type_02">
                                    <li>
                                        <span>정기 업데이트</span>
                                        <em>{{insuItem.fxtmTmsYn === '1' ? "주1회" : "아니오"}}</em>
                                    </li>
                                    <!-- <li>
                                        <span>적요&middot;거래메모 전송</span>
                                        <em>동의</em>
                                    </li>
                                    <li>
                                        <span>가맹점&middot;사업자등록번호 전송</span>
                                        <em>동의</em>
                                    </li>
                                    <li>
                                        <span>상품구매 카테고리 전송</span>
                                        <em>미동의</em>
                                    </li> -->
                                </ul>
                                <ul v-show="insuItem.wrsList.length > 0" class="list_type_01">
                                    <li v-for="(insuWrsItem, insuWrsIdx) in insuItem.wrsList" :key="'insuWrs_'+insuWrsIdx">
                                        <dl>
                                            <dt>
                                                <em class="prod_name">{{ insuWrsItem.wrsnm }}</em>
                                            </dt>
                                            <dd v-for="(insuAccItem, insuAccIdx) in insuWrsItem.accList" :key="'insuAcc_'+insuAccIdx">
                                                <em class="bank_num">{{ insuAccItem.wrsCntn }}</em>
                                            </dd>
                                        </dl>
                                    </li>
                                </ul>
                            </div>
                            <button class="bottomBtn">더보기</button>
                        </div>
                    </template>
                    <!--// 보험 -->
                    <!-- 페이 -->
                    <template v-if="efinList.length > 0">
                        <div class="custom_box">
                            <div class="list_type_box">
                                <div class="new_tit_area">
                                    <div class="tit"><span>페이</span> <span class="com_icon_num custom">{{efinList.length}}</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="com_box_type01 bottomBtnType" v-for="(efinItem, efinIdx) in efinList" :key="'efin_'+efinIdx">
                            <div class="tit">
                                <i :class="efinItem.infOfrmnOrgC !== '' ? efinItem.infOfrmnOrgC : 'com_no_img'"><span class="blind">{{efinItem.orgnm}}</span></i>
                                <div class="btn_check">
                                    <input type="checkbox" name="allagree" :id="`efin_${efinIdx}`" :value="`efin_${efinIdx}`" v-model="checkedList" @click="fn_chkOrgInfo('efin', efinItem, $event)">
                                    <label :for="`efin_${efinIdx}`">
                                        <span class="bank_name">{{efinItem.orgnm}}</span>
                                        <span class="dat">연결만료<i>{{efinItem.tmsEdDt | dateFilter("YYYY.MM.DD")}}</i></span>
                                    </label>
                                </div>
                                <span v-if="fn_dayDiff(efinItem.tmsEdDt , currentDate) >= 0 && fn_dayDiff(efinItem.tmsEdDt , currentDate) <=30" class="txtFinish">만료예정</span>
                            </div>
                            <div class="slideBox">
                                <ul class="list_type_02">
                                    <li>
                                        <span>정기 업데이트</span>
                                        <em>{{efinItem.fxtmTmsYn === '1' ? "주1회" : "아니오"}}</em>
                                    </li>
                                    <li>
                                        <span>적요&middot;거래메모 전송</span>
                                        <em>{{efinItem.snsColAgrYn === '1' ? "동의" : "미동의"}}</em>
                                    </li>
                                    <li>
                                        <span>가맹점&middot;사업자등록번호 전송</span>
                                        <em>{{efinItem.mchtInfColAgrYn === '1' ? "동의" : "미동의"}}</em>
                                    </li>
                                    <li>
                                        <span>상품구매 카테고리 전송</span>
                                        <em>{{efinItem.wrsInfColAgrYn === '1' ? "동의" : "미동의"}}</em>
                                    </li>
                                </ul>
                                <ul v-show="efinItem.wrsList.length > 0" class="list_type_01">
                                    <li v-for="(efinWrsItem, efinWrsIdx) in efinItem.wrsList" :key="'efinWrs_'+efinWrsIdx">
                                        <dl>
                                            <dt>
                                                <em class="prod_name">{{ efinWrsItem.wrsnm }}</em>
                                            </dt>
                                            <dd v-for="(efinAccItem, efinAccIdx) in efinWrsItem.accList" :key="'efinAcc_'+efinAccIdx">
                                                <em class="bank_num">{{ efinAccItem.wrsCntn }}</em>
                                            </dd>
                                        </dl>
                                    </li>
                                </ul>
                            </div>
                            <button class="bottomBtn">더보기</button>
                        </div>
                    </template>
                    <!--// 페이 -->

                    <!-- 할부금융 -->
                    <template v-if="capitalList.length > 0">
                        <div class="custom_box">
                            <div class="list_type_box">
                                <div class="new_tit_area">
                                    <div class="tit"><span>할부금융</span> <span class="com_icon_num custom">{{capitalList.length}}</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="com_box_type01 bottomBtnType" v-for="(capitalItem, capitalIdx) in capitalList" :key="'capital_'+capitalIdx">
                            <div class="tit">
                                <i :class="capitalItem.infOfrmnOrgC !== '' ? capitalItem.infOfrmnOrgC : 'com_no_img'"><span class="blind">{{capitalItem.orgnm}}</span></i>
                                <div class="btn_check">
                                    <input type="checkbox" name="allagree" :id="`capital_${capitalIdx}`" :value="`capital_${capitalIdx}`" v-model="checkedList" @click="fn_chkOrgInfo('capital', capitalItem, $event)">
                                    <label :for="`capital_${capitalIdx}`">
                                        <span class="bank_name">{{capitalItem.orgnm}}</span>
                                        <span class="dat">연결만료<i>{{capitalItem.tmsEdDt | dateFilter("YYYY.MM.DD")}}</i></span>
                                    </label>
                                </div>
                                <span v-if="fn_dayDiff(capitalItem.tmsEdDt , currentDate) >= 0 && fn_dayDiff(capitalItem.tmsEdDt , currentDate) <=30" class="txtFinish">만료예정</span>
                            </div>
                            <div class="slideBox">
                                <ul class="list_type_02">
                                    <li>
                                        <span>정기 업데이트</span>
                                        <em>{{capitalItem.fxtmTmsYn === '1' ? "주1회" : "아니오"}}</em>
                                    </li>
                                    <!-- <li>
                                        <span>적요&middot;거래메모 전송</span>
                                        <em>{{capitalItem.snsColAgrYn === '1' ? "동의" : "미동의"}}</em>
                                    </li>
                                    <li>
                                        <span>가맹점&middot;사업자등록번호 전송</span>
                                        <em>{{capitalItem.mchtInfColAgrYn === '1' ? "동의" : "미동의"}}</em>
                                    </li>
                                    <li>
                                        <span>상품구매 카테고리 전송</span>
                                        <em>{{capitalItem.wrsInfColAgrYn === '1' ? "동의" : "미동의"}}</em>
                                    </li> -->
                                </ul>
                                <ul v-show="capitalItem.wrsList.length > 0" class="list_type_01">
                                    <li v-for="(capitalWrsItem, capitalWrsIdx) in capitalItem.wrsList" :key="'capitalWrs_'+capitalWrsIdx">
                                        <dl>
                                            <dt>
                                                <em class="prod_name">{{ capitalWrsItem.wrsnm }}</em>
                                            </dt>
                                            <dd v-for="(capitalAccItem, capitalAccIdx) in capitalWrsItem.accList" :key="'capitalAcc_'+capitalAccIdx">
                                                <em class="bank_num">{{ capitalAccItem.wrsCntn }}</em>
                                            </dd>
                                        </dl>
                                    </li>
                                </ul>
                            </div>
                            <button class="bottomBtn">더보기</button>
                        </div>
                    </template>
                    <!--// 할부금융 -->

                    <!-- 보증보험 -->
                    <template v-if="ginsuList.length > 0">
                        <div class="custom_box">
                            <div class="list_type_box">
                                <div class="new_tit_area">
                                    <div class="tit"><span>보증보험</span> <span class="com_icon_num custom">{{ginsuList.length}}</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="com_box_type01 bottomBtnType" v-for="(ginsuItem, ginsuIdx) in ginsuList" :key="'ginsu_'+ginsuIdx">
                            <div class="tit">
                                <i :class="ginsuItem.infOfrmnOrgC !== '' ? ginsuItem.infOfrmnOrgC : 'com_no_img'"><span class="blind">{{ginsuItem.orgnm}}</span></i>
                                <div class="btn_check">
                                    <input type="checkbox" name="allagree" :id="`ginsu_${ginsuIdx}`" :value="`ginsu_${ginsuIdx}`" v-model="checkedList" @click="fn_chkOrgInfo('ginsu', ginsuItem, $event)">
                                    <label :for="`ginsu_${ginsuIdx}`">
                                        <span class="ginsu_name">{{ginsuItem.orgnm}}</span>
                                        <span class="dat">연결만료<i>{{ginsuItem.tmsEdDt | dateFilter("YYYY.MM.DD")}}</i></span>
                                    </label>
                                </div>
                                <span v-if="fn_dayDiff(ginsuItem.tmsEdDt , currentDate) >= 0 && fn_dayDiff(ginsuItem.tmsEdDt , currentDate) <=30" class="txtFinish">만료예정</span>
                            </div>
                            <div class="slideBox">
                                <ul class="list_type_02">
                                    <li>
                                        <span>정기 업데이트</span>
                                        <em>{{ginsuItem.fxtmTmsYn === '1' ? "주1회" : "아니오"}}</em>
                                    </li>
                                    <!-- <li>
                                        <span>적요&middot;거래메모 전송</span>
                                        <em>{{ginsuItem.snsColAgrYn === '1' ? "동의" : "미동의"}}</em>
                                    </li>
                                    <li>
                                        <span>가맹점&middot;사업자등록번호 전송</span>
                                        <em>{{ginsuItem.mchtInfColAgrYn === '1' ? "동의" : "미동의"}}</em>
                                    </li>
                                    <li>
                                        <span>상품구매 카테고리 전송</span>
                                        <em>{{ginsuItem.wrsInfColAgrYn === '1' ? "동의" : "미동의"}}</em>
                                    </li> -->
                                </ul>
                                <ul v-show="ginsuItem.wrsList.length > 0" class="list_type_01">
                                    <li v-for="(ginsuWrsItem, ginsuWrsIdx) in ginsuItem.wrsList" :key="'ginsuWrs_'+ginsuWrsIdx">
                                        <dl>
                                            <dt>
                                                <em class="prod_name">{{ ginsuWrsItem.wrsnm }}</em>
                                            </dt>
                                            <dd v-for="(ginsuAccItem, ginsuAccIdx) in ginsuWrsItem.accList" :key="'ginsuAcc_'+ginsuAccIdx">
                                                <em class="bank_num">{{ ginsuAccItem.wrsCntn }}</em>
                                            </dd>
                                        </dl>
                                    </li>
                                </ul>
                            </div>
                            <button class="bottomBtn">더보기</button>
                        </div>
                    </template>
                    <!--// 보증보험 -->

                    <!-- 통신 -->
                    <template v-if="telecomList.length > 0">
                        <div class="custom_box">
                            <div class="list_type_box">
                                <div class="new_tit_area">
                                    <div class="tit"><span>통신</span> <span class="com_icon_num custom">{{telecomList.length}}</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="com_box_type01 bottomBtnType" v-for="(telecomItem, telecomIdx) in telecomList" :key="'telecom_'+telecomIdx">
                            <div class="tit">
                                <i :class="telecomItem.infOfrmnOrgC !== '' ? telecomItem.infOfrmnOrgC : 'com_no_img'"><span class="blind">{{telecomItem.orgnm}}</span></i>
                                <div class="btn_check">
                                    <input type="checkbox" name="allagree" :id="`telecom_${telecomIdx}`" :value="`telecom_${telecomIdx}`" v-model="checkedList" @click="fn_chkOrgInfo('telecom', telecomItem, $event)">
                                    <label :for="`telecom_${telecomIdx}`">
                                        <span class="telecom_name">{{telecomItem.orgnm}}</span>
                                        <span class="dat">연결만료<i>{{telecomItem.tmsEdDt | dateFilter("YYYY.MM.DD")}}</i></span>
                                    </label>
                                </div>
                                <span v-if="fn_dayDiff(telecomItem.tmsEdDt , currentDate) >= 0 && fn_dayDiff(telecomItem.tmsEdDt , currentDate) <=30" class="txtFinish">만료예정</span>
                            </div>
                            <div class="slideBox">
                                <ul class="list_type_02">
                                    <li>
                                        <span>정기 업데이트</span>
                                        <em>{{telecomItem.fxtmTmsYn === '1' ? "주1회" : "아니오"}}</em>
                                    </li>
                                    <!-- <li>
                                        <span>적요&middot;거래메모 전송</span>
                                        <em>{{telecomItem.snsColAgrYn === '1' ? "동의" : "미동의"}}</em>
                                    </li> -->
                                    <li>
                                        <span>가맹점&middot;사업자등록번호 전송</span>
                                        <em>{{telecomItem.mchtInfColAgrYn === '1' ? "동의" : "미동의"}}</em>
                                    </li>
                                    <!-- <li>
                                        <span>상품구매 카테고리 전송</span>
                                        <em>{{telecomItem.wrsInfColAgrYn === '1' ? "동의" : "미동의"}}</em>
                                    </li> -->
                                </ul>
                                <ul v-show="telecomItem.wrsList.length > 0" class="list_type_01">
                                    <li v-for="(telecomWrsItem, telecomWrsIdx) in telecomItem.wrsList" :key="'telecomWrs_'+telecomWrsIdx">
                                        <dl>
                                            <dt>
                                                <em class="prod_name">{{ telecomWrsItem.wrsnm }}</em>
                                            </dt>
                                            <dd v-for="(telecomAccItem, telecomAccIdx) in telecomWrsItem.accList" :key="'telecomAcc_'+telecomAccIdx">
                                                <em class="bank_num">{{ telecomAccItem.wrsCntn }}</em>
                                            </dd>
                                        </dl>
                                    </li>
                                </ul>
                            </div>
                            <button class="bottomBtn">더보기</button>
                        </div>
                    </template>
                    <!--// 통신 -->

                    <!-- 대부 -->
                    <template v-if="usuryList.length > 0">
                        <div class="custom_box">
                            <div class="list_type_box">
                                <div class="new_tit_area">
                                    <div class="tit"><span>대부</span> <span class="com_icon_num custom">{{usuryList.length}}</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="com_box_type01 bottomBtnType" v-for="(usuryItem, usuryIdx) in usuryList" :key="'usury_'+usuryIdx">
                            <div class="tit">
                                <i :class="usuryItem.infOfrmnOrgC !== '' ? usuryItem.infOfrmnOrgC : 'com_no_img'"><span class="blind">{{usuryItem.orgnm}}</span></i>
                                <div class="btn_check">
                                    <input type="checkbox" name="allagree" :id="`usury_${usuryIdx}`" :value="`usury_${usuryIdx}`" v-model="checkedList" @click="fn_chkOrgInfo('usury', usuryItem, $event)">
                                    <label :for="`usury_${usuryIdx}`">
                                        <span class="bank_name">{{usuryItem.orgnm}}</span>
                                        <span class="dat">연결만료<i>{{usuryItem.tmsEdDt | dateFilter("YYYY.MM.DD")}}</i></span>
                                    </label>
                                </div>
                                <span v-if="fn_dayDiff(usuryItem.tmsEdDt , currentDate) >= 0 && fn_dayDiff(usuryItem.tmsEdDt , currentDate) <=30" class="txtFinish">만료예정</span>
                            </div>
                            <div class="slideBox">
                                <ul class="list_type_02">
                                    <li>
                                        <span>정기 업데이트</span>
                                        <em>{{usuryItem.fxtmTmsYn === '1' ? "주1회" : "아니오"}}</em>
                                    </li>
                                    <!-- <li>
                                        <span>적요&middot;거래메모 전송</span>
                                        <em>{{usuryItem.snsColAgrYn === '1' ? "동의" : "미동의"}}</em>
                                    </li> -->
                                    <!-- <li>
                                        <span>가맹점&middot;사업자등록번호 전송</span>
                                        <em>{{usuryItem.mchtInfColAgrYn === '1' ? "동의" : "미동의"}}</em>
                                    </li> -->
                                    <!-- <li>
                                        <span>상품구매 카테고리 전송</span>
                                        <em>{{usuryItem.wrsInfColAgrYn === '1' ? "동의" : "미동의"}}</em>
                                    </li> -->
                                </ul>
                                <ul v-show="usuryItem.wrsList.length > 0" class="list_type_01">
                                    <li v-for="(usuryWrsItem, usuryWrsIdx) in usuryItem.wrsList" :key="'usuryWrs_'+usuryWrsIdx">
                                        <dl>
                                            <dt>
                                                <em class="prod_name">{{ usuryWrsItem.wrsnm }}</em>
                                            </dt>
                                            <dd v-for="(usuryAccItem, usuryAccIdx) in usuryWrsItem.accList" :key="'usuryAcc_'+usuryAccIdx">
                                                <em class="bank_num">{{ usuryAccItem.wrsCntn }}</em>
                                            </dd>
                                        </dl>
                                    </li>
                                </ul>
                            </div>
                            <button class="bottomBtn">더보기</button>
                        </div>
                    </template>
                    <!--// 대부 -->

                    <!-- 인수채권 -->
                    <template v-if="bondList.length > 0">
                        <div class="custom_box">
                            <div class="list_type_box">
                                <div class="new_tit_area">
                                    <div class="tit"><span>인수채권</span> <span class="com_icon_num custom">{{bondList.length}}</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="com_box_type01 bottomBtnType" v-for="(bondItem, bondIdx) in bondList" :key="'bond_'+bondIdx">
                            <div class="tit">
                                <i :class="bondItem.infOfrmnOrgC !== '' ? bondItem.infOfrmnOrgC : 'com_no_img'"><span class="blind">{{bondItem.orgnm}}</span></i>
                                <div class="btn_check">
                                    <input type="checkbox" name="allagree" :id="`bond_${bondIdx}`" :value="`bond_${bondIdx}`" v-model="checkedList" @click="fn_chkOrgInfo('bond', bondItem, $event)">
                                    <label :for="`bond_${bondIdx}`">
                                        <span class="bond_name">{{bondItem.orgnm}}</span>
                                        <span class="dat">연결만료<i>{{bondItem.tmsEdDt | dateFilter("YYYY.MM.DD")}}</i></span>
                                    </label>
                                </div>
                                <span v-if="fn_dayDiff(bondItem.tmsEdDt , currentDate) >= 0 && fn_dayDiff(bondItem.tmsEdDt , currentDate) <=30" class="txtFinish">만료예정</span>
                            </div>
                            <div class="slideBox">
                                <ul class="list_type_02">
                                    <li>
                                        <span>정기 업데이트</span>
                                        <em>{{bondItem.fxtmTmsYn === '1' ? "주1회" : "아니오"}}</em>
                                    </li>
                                    <!-- <li>
                                        <span>적요&middot;거래메모 전송</span>
                                        <em>{{bondItem.snsColAgrYn === '1' ? "동의" : "미동의"}}</em>
                                    </li> -->
                                    <!-- <li>
                                        <span>가맹점&middot;사업자등록번호 전송</span>
                                        <em>{{bondItem.mchtInfColAgrYn === '1' ? "동의" : "미동의"}}</em>
                                    </li> -->
                                    <!-- <li>
                                        <span>상품구매 카테고리 전송</span>
                                        <em>{{bondItem.wrsInfColAgrYn === '1' ? "동의" : "미동의"}}</em>
                                    </li> -->
                                </ul>
                                <ul v-show="bondItem.wrsList.length > 0" class="list_type_01">
                                    <li v-for="(bondWrsItem, bondWrsIdx) in bondItem.wrsList" :key="'bondWrs_'+bondWrsIdx">
                                        <dl>
                                            <dt>
                                                <em class="prod_name">{{ bondWrsItem.wrsnm }}</em>
                                            </dt>
                                            <dd v-for="(bondAccItem, bondAccIdx) in bondWrsItem.accList" :key="'bondAcc_'+bondAccIdx">
                                                <em class="bank_num">{{ bondAccItem.wrsCntn }}</em>
                                            </dd>
                                        </dl>
                                    </li>
                                </ul>
                            </div>
                            <button class="bottomBtn">더보기</button>
                        </div>
                    </template>
                    <!--// 인수채권 -->

                    <!-- P2P -->
                    <template v-if="p2pList.length > 0">
                        <div class="custom_box">
                            <div class="list_type_box">
                                <div class="new_tit_area">
                                    <div class="tit"><span>P2P</span> <span class="com_icon_num custom">{{p2pList.length}}</span></div>
                                </div>
                            </div>
                        </div>
                        <div class="com_box_type01 bottomBtnType" v-for="(p2pItem, p2pIdx) in p2pList" :key="'p2p_'+p2pIdx">
                            <div class="tit">
                                <i :class="p2pItem.infOfrmnOrgC !== '' ? p2pItem.infOfrmnOrgC : 'com_no_img'"><span class="blind">{{p2pItem.orgnm}}</span></i>
                                <div class="btn_check">
                                    <input type="checkbox" name="allagree" :id="`p2p_${p2pIdx}`" :value="`p2p_${p2pIdx}`" v-model="checkedList" @click="fn_chkOrgInfo('p2p', p2pItem, $event)">
                                    <label :for="`p2p_${p2pIdx}`">
                                        <span class="p2p_name">{{p2pItem.orgnm}}</span>
                                        <span class="dat">연결만료<i>{{p2pItem.tmsEdDt | dateFilter("YYYY.MM.DD")}}</i></span>
                                    </label>
                                </div>
                                <span v-if="fn_dayDiff(p2pItem.tmsEdDt , currentDate) >= 0 && fn_dayDiff(p2pItem.tmsEdDt , currentDate) <=30" class="txtFinish">만료예정</span>
                            </div>
                            <div class="slideBox">
                                <ul class="list_type_02">
                                    <li>
                                        <span>정기 업데이트</span>
                                        <em>{{p2pItem.fxtmTmsYn === '1' ? "주1회" : "아니오"}}</em>
                                    </li>
                                    <!-- <li>
                                        <span>적요&middot;거래메모 전송</span>
                                        <em>{{p2pItem.snsColAgrYn === '1' ? "동의" : "미동의"}}</em>
                                    </li> -->
                                    <!-- <li>
                                        <span>가맹점&middot;사업자등록번호 전송</span>
                                        <em>{{p2pItem.mchtInfColAgrYn === '1' ? "동의" : "미동의"}}</em>
                                    </li> -->
                                    <!-- <li>
                                        <span>상품구매 카테고리 전송</span>
                                        <em>{{p2pItem.wrsInfColAgrYn === '1' ? "동의" : "미동의"}}</em>
                                    </li> -->
                                </ul>
                                <ul v-show="p2pItem.wrsList.length > 0" class="list_type_01">
                                    <li v-for="(p2pWrsItem, p2pWrsIdx) in p2pItem.wrsList" :key="'p2pWrs_'+p2pWrsIdx">
                                        <dl>
                                            <dt>
                                                <em class="prod_name">{{ p2pWrsItem.wrsnm }}</em>
                                            </dt>
                                            <dd v-for="(p2pAccItem, p2pAccIdx) in p2pWrsItem.accList" :key="'p2pAcc_'+p2pAccIdx">
                                                <em class="bank_num">{{ p2pAccItem.wrsCntn }}</em>
                                            </dd>
                                        </dl>
                                    </li>
                                </ul>
                            </div>
                            <button class="bottomBtn">더보기</button>
                        </div>
                    </template>
                    <!--// P2P -->

                    <template v-if="publicList.length > 0">
                        <!-- 공공기관 -->
                        <div class="custom_box">
                            <div class="list_type_box">
                                <div class="new_tit_area">
                                    <div class="tit"><span>공공기관</span> <span class="com_icon_num custom">{{ publicList.length }}</span></div>
                                </div>
                            </div>
                        </div>
                        <!--// 공공기관 -->
                        <!-- 공공기관 -->
                        <div class="com_box_type01 bottomBtnType" v-for="(publicItem, publicIdx) in publicList" :key="'public_'+publicIdx">
                            <div class="tit">
                                <i :class="publicItem.infOfrmnOrgC"><span class="blind">{{publicItem.orgnm}}</span></i>
                                <div class="btn_check">
                                    <input type="checkbox" name="allagree" :id="`public_${publicIdx}`" :value="`public_${publicIdx}`" v-model="checkedList" @click="fn_chkOrgInfo('public', publicItem, $event)">
                                    <label :for="`public_${publicIdx}`">
                                        <span class="public_name">{{publicItem.orgnm}}</span>
                                        <span class="dat">연결만료<i>{{publicItem.tmsEdDt | dateFilter("YYYY.MM.DD")}}</i></span>
                                    </label>
                                </div>
                                <span v-if="fn_dayDiff(publicItem.tmsEdDt , currentDate) >= 0 && fn_dayDiff(publicItem.tmsEdDt , currentDate) <=30" class="txtFinish">만료예정</span>
                                    <!-- 필요시 주석 푸세요.
                                    <span class="txtFinish">만료예정</span> -->
                            
                            </div>
                            <div class="slideBox">
                                <ul class="list_type_02">
                                    <li>
                                        <span>정기 업데이트</span>
                                        <em>{{publicItem.fxtmTmsYn === '1' ? "월1회" : "아니오"}}</em>
                                    </li>
                                </ul>
                                <ul v-show="publicItem.wrsList.length > 0" class="list_type_01">
                                    <li v-for="(publicWrsItem, publicWrsIdx) in publicItem.wrsList" :key="'publicWrs_'+publicWrsIdx">
                                        <span class="prod_name">{{ publicWrsItem.wrsnm }}</span>
                                    </li>
                                    <!-- <li>
                                        <span class="prod_name">지방세납부확인서(등록면허세면허분)</span>
                                    </li> -->
                                </ul>
                            </div>
                            <button class="bottomBtn">더보기</button>
                        </div>
                        <!--// 국민연금공단 -->
                    </template>
                    <template v-if="totalConOrgCnt < 1">
                        <!-- 연결 기관이 없는 경우 -->
                        <div class="no_data_box no_data_box01 grayExclamationType">
                            <div class="no_data_list">
                                <p class="txt_sub">연결된 기관이 없어요.</p>
                            </div>
                        </div>
                        <!--// 만료,해제 기관이 없는 경우 -->
                    </template>
                </div>
                <!--// 연결 기관 tabBox 종료 -->

                <!-- <template v-for="(bankItem, bankIdx) in bankList">
                            <div :class="`com_box_type01 bottomBtnType`" :key="'bank_'+bankIdx">
                                <div class="tit">
                                    <i :class="bankItem.infOfrmnOrgC !== '' ? bankItem.infOfrmnOrgC : 'com_no_img'"><span class="blind">{{ bankItem.orgnm }}</span></i>
                                    <div class="btn_check">
                                        <input type="checkbox" name="allagree" :id="`bank_${bankIdx}`" :value="`bank_${bankIdx}`" v-model="checkedList" @click="fn_chkOrgInfo('bank', bankItem, $event)">
                                        <label :for="`bank_${bankIdx}`">
                                            <span class="bank_name">{{ bankItem.orgnm }}</span>
                                            <span class="dat">연결만료<i>{{ bankItem.tmsEdDt | dateFilter("YYYY.MM.DD") }}</i></span>
                                        </label>
                                    </div>
                                    <span v-if="fn_dayDiff(bankItem.tmsEdDt , currentDate) >= 0 && fn_dayDiff(bankItem.tmsEdDt , currentDate) <=30" class="txtFinish">만료예정</span>
                                </div> -->

                <!-- 만료해제 기관 tabBox 시작 -->
                <div v-show="!isConnectedTab" id="tab_02" role="tabpanel" class="cmm-tab-panel"><!-- 20230628 cmm-tab-panel 추가 jlee -->
                    <template v-if="orgExprCnt > 0">
                        <!-- 선택해제 -->
                        <div class="custom_box flex_new_tit_area mt0">
                            <div class="">
                            </div>
                            <div class="btn_check btn_check3 checkAll">
                                <input type="checkbox" name="checkedExprAll" id="checkedExprAll" ref="checkedExprAll" @click="fn_chkExprAll($event)">
                                <label for="checkedExprAll">{{ isAllChecked ? '선택해제' : '전체선택'}}</label>
                            </div>
                        </div>
                        <!--// 선택해제 -->
                        <!-- 은행 bankExprList-->
                        <div v-for="(bankItem, bankIdx) in bankExprList" :key="'bank_'+bankIdx" class="com_box_type01 bottomBtnType nonBtn">
                            <div class="tit">
                                <i :class="bankItem.infOfrmnOrgC !== '' ? bankItem.infOfrmnOrgC : 'com_no_img'"><span class="blind">{{ bankItem.orgnm }}</span></i>
                                <div class="btn_check">
                                    <input type="checkbox" :name="`bank_Expr_${bankIdx}`" ref="expr_" :id="`bank_Expr_${bankIdx}`" @click="fn_checkExpr($event, bankItem)">
                                    <label :for="`bank_Expr_${bankIdx}`">
                                        <span class="bank_name">{{ bankItem.orgnm }}</span>
                                        <span class="dat">만료/해제일<i>{{ bankItem.acsTokenDusDtm.substring(0,8) | dateFilter("YYYY.MM.DD") }}</i></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <!--// 은행 -->
                        <!-- 카드 -->
                        <div v-for="(cardItem, cardIdx) in cardExprList" :key="'card_'+cardIdx" class="com_box_type01 bottomBtnType nonBtn">
                            <div class="tit">
                                <i :class="cardItem.infOfrmnOrgC !== '' ? cardItem.infOfrmnOrgC : 'com_no_img'"><span class="blind">{{ cardItem.orgnm }}</span></i>
                                <div class="btn_check">
                                    <input type="checkbox" :name="`card_Expr_${cardIdx}`" ref="expr_" :id="`card_Expr_${cardIdx}`" @click="fn_checkExpr($event, cardItem)">
                                    <label :for="`card_Expr_${cardIdx}`">
                                        <span class="card_name">{{ cardItem.orgnm }}</span>
                                        <span class="dat">만료/해제일<i>{{ cardItem.acsTokenDusDtm.substring(0,8) | dateFilter("YYYY.MM.DD") }}</i></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <!--// 카드 -->
                        <!-- 증권 -->
                        <div v-for="(investItem, investIdx) in investExprList" :key="'invest_'+investIdx" class="com_box_type01 bottomBtnType nonBtn">
                            <div class="tit">
                                <i :class="investItem.infOfrmnOrgC !== '' ? investItem.infOfrmnOrgC : 'com_no_img'"><span class="blind">{{ investItem.orgnm }}</span></i>
                                <div class="btn_check">
                                    <input type="checkbox" :name="`invest_Expr_${investIdx}`" ref="expr_" :id="`invest_Expr_${investIdx}`" @click="fn_checkExpr($event, investItem)">
                                    <label :for="`invest_Expr_${investIdx}`">
                                        <span class="invest_name">{{ investItem.orgnm }}</span>
                                        <span class="dat">만료/해제일<i>{{ investItem.acsTokenDusDtm.substring(0,8) | dateFilter("YYYY.MM.DD") }}</i></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <!--// 증권 -->
                        <!-- 보험 -->
                        <div v-for="(insuItem, insuIdx) in insuExprList" :key="'insu_'+insuIdx" class="com_box_type01 bottomBtnType nonBtn">
                            <div class="tit">
                                <i :class="insuItem.infOfrmnOrgC !== '' ? insuItem.infOfrmnOrgC : 'com_no_img'"><span class="blind">{{ insuItem.orgnm }}</span></i>
                                <div class="btn_check">
                                    <input type="checkbox" :name="`insu_Expr_${insuIdx}`" ref="expr_" :id="`insu_Expr_${insuIdx}`" @click="fn_checkExpr($event, insuItem)">
                                    <label :for="`insu_Expr_${insuIdx}`">
                                        <span class="insu_name">{{ insuItem.orgnm }}</span>
                                        <span class="dat">만료/해제일<i>{{ insuItem.acsTokenDusDtm.substring(0,8) | dateFilter("YYYY.MM.DD") }}</i></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <!--// 보험 -->
                        <!-- 페이 -->
                        <div v-for="(ginsuItem, ginsuIdx) in ginsuExprList" :key="'ginsu_'+ginsuIdx" class="com_box_type01 bottomBtnType nonBtn">
                            <div class="tit">
                                <i :class="ginsuItem.infOfrmnOrgC !== '' ? ginsuItem.infOfrmnOrgC : 'com_no_img'"><span class="blind">{{ ginsuItem.orgnm }}</span></i>
                                <div class="btn_check">
                                    <input type="checkbox" :name="`ginsu_Expr_${ginsuIdx}`" ref="expr_" :id="`ginsu_Expr_${ginsuIdx}`" @click="fn_checkExpr($event, ginsuItem)">
                                    <label :for="`ginsu_Expr_${ginsuIdx}`">
                                        <span class="ginsu_name">{{ ginsuItem.orgnm }}</span>
                                        <span class="dat">만료/해제일<i>{{ ginsuItem.acsTokenDusDtm.substring(0,8) | dateFilter("YYYY.MM.DD") }}</i></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <!--// 페이 -->
                        <!-- 할부금융 -->
                        <div v-for="(efinItem, efinIdx) in efinExprList" :key="'efin_'+efinIdx" class="com_box_type01 bottomBtnType nonBtn">
                            <div class="tit">
                                <i :class="efinItem.infOfrmnOrgC !== '' ? efinItem.infOfrmnOrgC : 'com_no_img'"><span class="blind">{{ efinItem.orgnm }}</span></i>
                                <div class="btn_check">
                                    <input type="checkbox" :name="`efin_Expr_${efinIdx}`" ref="expr_" :id="`efin_Expr_${efinIdx}`" @click="fn_checkExpr($event, efinItem)">
                                    <label :for="`efin_Expr_${efinIdx}`">
                                        <span class="efin_name">{{ efinItem.orgnm }}</span>
                                        <span class="dat">만료/해제일<i>{{ efinItem.acsTokenDusDtm.substring(0,8) | dateFilter("YYYY.MM.DD") }}</i></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <!--// 할부금융 -->
                        <!-- 보증보험 -->
                        <div v-for="(capitalItem, capitalIdx) in capitalExprList" :key="'capital_'+capitalIdx" class="com_box_type01 bottomBtnType nonBtn">
                            <div class="tit">
                                <i :class="capitalItem.infOfrmnOrgC !== '' ? capitalItem.infOfrmnOrgC : 'com_no_img'"><span class="blind">{{ capitalItem.orgnm }}</span></i>
                                <div class="btn_check">
                                    <input type="checkbox" :name="`capital_Expr_${capitalIdx}`" ref="expr_" :id="`capital_Expr_${capitalIdx}`" @click="fn_checkExpr($event, capitalItem)">
                                    <label :for="`capital_Expr_${capitalIdx}`">
                                        <span class="capital_name">{{ capitalItem.orgnm }}</span>
                                        <span class="dat">만료/해제일<i>{{ capitalItem.acsTokenDusDtm.substring(0,8) | dateFilter("YYYY.MM.DD") }}</i></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <!--// 보증보험 -->
                        <!-- 통신 -->
                        <div v-for="(telecomItem, telecomIdx) in telecomExprList" :key="'telecom_'+telecomIdx" class="com_box_type01 bottomBtnType nonBtn">
                            <div class="tit">
                                <i :class="telecomItem.infOfrmnOrgC !== '' ? telecomItem.infOfrmnOrgC : 'com_no_img'"><span class="blind">{{ telecomItem.orgnm }}</span></i>
                                <div class="btn_check">
                                    <input type="checkbox" :name="`telecom_Expr_${telecomIdx}`" ref="expr_" :id="`telecom_Expr_${telecomIdx}`" @click="fn_checkExpr($event, telecomItem)">
                                    <label :for="`telecom_Expr_${telecomIdx}`">
                                        <span class="telecom_name">{{ telecomItem.orgnm }}</span>
                                        <span class="dat">만료/해제일<i>{{ telecomItem.acsTokenDusDtm.substring(0,8) | dateFilter("YYYY.MM.DD") }}</i></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <!--// 통신 -->
                        <!-- 대부 -->
                        <div v-for="(usuryItem, usuryIdx) in usuryExprList" :key="'usury_'+usuryIdx" class="com_box_type01 bottomBtnType nonBtn">
                            <div class="tit">
                                <i :class="usuryItem.infOfrmnOrgC !== '' ? usuryItem.infOfrmnOrgC : 'com_no_img'"><span class="blind">{{ usuryItem.orgnm }}</span></i>
                                <div class="btn_check">
                                    <input type="checkbox" :name="`usury_Expr_${usuryIdx}`" ref="expr_" :id="`usury_Expr_${usuryIdx}`" @click="fn_checkExpr($event, usuryItem)">
                                    <label :for="`usury_Expr_${usuryIdx}`">
                                        <span class="usury_name">{{ usuryItem.orgnm }}</span>
                                        <span class="dat">만료/해제일<i>{{ usuryItem.acsTokenDusDtm.substring(0,8) | dateFilter("YYYY.MM.DD") }}</i></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <!--// 대부 -->
                        <!-- 인수채권 -->
                        <div v-for="(bondItem, bondIdx) in bondExprList" :key="'bond_'+bondIdx" class="com_box_type01 bottomBtnType nonBtn">
                            <div class="tit">
                                <i :class="bondItem.infOfrmnOrgC !== '' ? bondItem.infOfrmnOrgC : 'com_no_img'"><span class="blind">{{ bondItem.orgnm }}</span></i>
                                <div class="btn_check">
                                    <input type="checkbox" :name="`bond_Expr_${bondIdx}`" ref="expr_" :id="`bond_Expr_${bondIdx}`" @click="fn_checkExpr($event, bondItem)">
                                    <label :for="`bond_Expr_${bondIdx}`">
                                        <span class="bond_name">{{ bondItem.orgnm }}</span>
                                        <span class="dat">만료/해제일<i>{{ bondItem.acsTokenDusDtm.substring(0,8) | dateFilter("YYYY.MM.DD") }}</i></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <!--// 인수채권 -->
                        <!-- p2p -->
                        <div v-for="(p2pItem, p2pIdx) in p2pExprList" :key="'p2p_'+p2pIdx" class="com_box_type01 bottomBtnType nonBtn">
                            <div class="tit">
                                <i :class="p2pItem.infOfrmnOrgC !== '' ? p2pItem.infOfrmnOrgC : 'com_no_img'"><span class="blind">{{ p2pItem.orgnm }}</span></i>
                                <div class="btn_check">
                                    <input type="checkbox" :name="`p2p_Expr_${p2pIdx}`" ref="expr_" :id="`p2p_Expr_${p2pIdx}`" @click="fn_checkExpr($event, p2pItem)">
                                    <label :for="`p2p_Expr_${p2pIdx}`">
                                        <span class="p2p_name">{{ p2pItem.orgnm }}</span>
                                        <span class="dat">만료/해제일<i>{{ p2pItem.acsTokenDusDtm.substring(0,8) | dateFilter("YYYY.MM.DD") }}</i></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <!--// p2p -->
                        <!-- 공공 -->
                        <div v-for="(publicItem, publicIdx) in publicExprList" :key="'public_'+publicIdx" class="com_box_type01 bottomBtnType nonBtn">
                            <div class="tit">
                                <i :class="publicItem.infOfrmnOrgC !== '' ? publicItem.infOfrmnOrgC : 'com_no_img'"><span class="blind">{{ publicItem.orgnm }}</span></i>
                                <div class="btn_check">
                                    <input type="checkbox" :name="`public_Expr_${publicIdx}`" ref="expr_" :id="`public_Expr_${publicIdx}`" @click="fn_checkExpr($event, publicItem)">
                                    <label :for="`public_Expr_${publicIdx}`">
                                        <span class="public_name">{{ publicItem.orgnm }}</span>
                                        <span class="dat">만료/해제일<i>{{ publicItem.acsTokenDusDtm.substring(0,8) | dateFilter("YYYY.MM.DD") }}</i></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <!--// 공공 -->

                        <p class="stdMsg star">만료 또는 해제된 기관의 개인신용정보는 만료&middot;해제일로부터 5년간 보존 됩니다.</p>
                    </template>
                    <template v-else>
                        <!-- 만료,해제 기관이 없는 경우 -->
                        <div class="no_data_box no_data_box01 grayExclamationType">
                            <div class="no_data_list">
                                <p class="txt_sub">만료&middot;해제 기관이 없어요.</p>
                            </div>
                        </div>
                        <!--// 만료,해제 기관이 없는 경우 -->
                    </template>
                </div>
                <!--// tabBox 종료 -->
                <!-- !!class="inner_banner"가 있어야 버튼영역 margin top 생김!!  -->
                <div class="inner_banner">
                </div>
                <!-- -->

            </div>
        </div>
        <!-- btn -->
        <div v-if="isConnectedTab && totalConOrgExNacfCnt > 0" class="com_btnhalfbox_type02 com_inner">
            <a href="javascript:void(0);" class="btn btn_mint_gray" @click.prevent="fn_disconData()">{{disconTxt}}</a>
            <a href="javascript:void(0);" class="btn btn_mint" @click.prevent="fn_modifyData()">{{modifyTxt}}</a>
        </div>
        <div v-else-if="orgExprCnt > 0 && !isConnectedTab" class="com_btnhalfbox_type02 com_inner">
            <a href="javascript:void(0);" class="btn btn_mint_gray" @click="fn_busDelete()">{{chkedExprCnt}}개 삭제</a>
            <a href="javascript:void(0);" class="btn btn_mint" @click="fn_busReAdd()">{{chkedExprCnt}}개 재연결</a>
        </div>
        <!--// btn -->
        <!--// content -->
        <footersV2 type="" />

    </page>
</template>

<script>
/*eslint-disable */
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import commonMixin from '@/common/mixins/commonMixin'
import {dayDiff, dateFormat} from '@/utils/date'
import _ from 'lodash'
import {mapActions, mapGetters} from 'vuex'

import MRAM2005 from '@/views/page/MR/AM/MRAM2005/MRAM2005'
import MRAM2004 from '@/views/page/MR/AM/MRAM2004/MRAM2004'
import MRAM2003 from '@/views/page/MR/AM/MRAM2003/MRAM2003'
import COAR2001 from '@/views/page/CO/AR/COAR2001/COAR2001'
import COAR2002 from '@/views/page/CO/AR/COAR2002/COAR2002'
import COAR2003 from '@/views/page/CO/AR/COAR2003/COAR2003'
import COAR2005 from '@/views/page/CO/AR/COAR2005/COAR2005'
import COAR2007 from '@/views/page/CO/AR/COAR2007/COAR2007'

export default {
    name : "MRAM2001",
    mixins: [
        commonMixin
    ],
    data: () => {
		return {
            currentDate		: dateFormat(new Date(), 'YYYYMMDD'), //금일
            //////// 농축협 계좌 관련 데이터
            nacfAccList     : [],   // 농.축협 계좌 리스트
            // nacfAccTogYn    : false,// 농.축협 계좌 리스트 show/hide 토글버튼 히든여부

            //////// 연결자산 관련 데이터
            userAsetList    : [], // 개인신용정보전송요구내역
            /* 은행 */
            bankList        : [], // 은행업권 데이터
            bankExprList    : [], // 은행업권 만료 데이터
            /* 카드 */
            cardList        : [], // 카드업권 데이터
            cardExprList    : [], // 카드업권 만료 데이터
            /* 증권 */
            investList      : [], // 금융투자업권 데이터
            investExprList  : [], // 금융투자업권 만료 데이터
            /* 보험 */
            insuList        : [], // 보험업권 데이터
            insuExprList    : [], // 보험업권 만료 데이터
            ginsuList       : [], // 보증보험업권 데이터
            ginsuExprList   : [], // 보증보험업권 만료 데이터
            /* 페이 */
            efinList        : [], // 전자금융업권 데이터
            efinExprList    : [], // 전자금융업권 만료 데이터
            /* 할부금융 */
            capitalList     : [], // 할부금융업권 데이터
            capitalExprList : [], // 할부금융업권 만료 데이터
            /* 기타금융 */
            telecomList     : [], // 통신업권 데이터
            telecomExprList : [], // 통신업권 만료 데이터
            usuryList       : [], // 대부 정보 데이터
            usuryExprList   : [], // 대부 정보 만료 데이터
            bondList        : [], // 인수채권 정보 데이터
            bondExprList    : [], // 인수채권 정보 만료 데이터
            p2pList         : [], // P2P 대출정보 데이터
            p2pExprList     : [], // P2P 대출정보 만료 데이터

            /* 공공기관 */
            publicList      : [], // 공공기관 데이터
            publicExprList  : [], // 공공기관 만료 데이터

            codeNmList 		: [   // 업권 코드별 명칭 리스트
				{"codeVal":"bank", 		"codeNm":"은행"		},
				{"codeVal":"card", 		"codeNm":"카드"		},
				{"codeVal":"invest", 	"codeNm":"금융투자"	},
				{"codeVal":"insu", 		"codeNm":"보험"		},
				{"codeVal":"ginsu", 	"codeNm":"보증보험"	},
				{"codeVal":"efin", 		"codeNm":"전자금융"	},
				{"codeVal":"capital", 	"codeNm":"할부금융"	},
				{"codeVal":"telecom", 	"codeNm":"통신"		},

				{"codeVal":"usury", 	"codeNm":"대부"		},
				{"codeVal":"bond", 		"codeNm":"인수채권"	},
				{"codeVal":"p2p", 		"codeNm":"P2P대출"	},
            ],

            orgExprCnt      : 0,    // 만료된 기관 개수
            orgPrdCnt       : 0,    // 만료 예정 기관 개수

            modifyTxt       : "",   // 변경 버튼 텍스트
            disconTxt       : "",   // 해제 버튼 텍스트

            chkOrgList      : [],   // 체크된 기관 리스트
            chkCnt          : 0,    // 체크된 기관 개수

            // orgListForFilter    : [],       // 변경 또는 해제 시 COAR2003넘기기 위한 필터링 데이터
            moduleList          : [],       // 변경 또는 해제 시 체크리스트 중 orgListForFilter를 바탕으로 필터링된 리스트
            isBckYn             : false,    // 변경 시 백업데이터 존재 유무

            // TOBE 연결기관/만료.해제기관 탭
            isConnectedTab : true,
            checkedList: [], // 선택 기관 목록
            selectedExprList: [], // 체그된 만료 해제 기관 목록
            // chkedExprCnt: 0, // 체크된 만료/해제 기관 체크 개수

            disconParam		: [],	// 만료/해제 기관 삭제관련 데이터 리스트
			disconCnt		: [],	// 삭제할 만료/해제 기관 수
            isWorked		: false,// api호출 후 데이터 변동 유무
            
            sessionTimerAuthor: null,
        }
    },
    computed : {
        // 업권별 만료예정정보 체크
        bankChkEnDt	: function(){
			return this.checkIndustryEdDt(this.bankList)
		},
		investChkEnDt	: function(){
			return this.checkIndustryEdDt(this.investList)
		},
		cardChkEnDt	: function(){
			return this.checkIndustryEdDt(this.cardList)
		},
		insuChkEnDt	: function(){
			return this.checkIndustryEdDt(this.insuList)
		},
		efinChkEnDt	: function(){
			return this.checkIndustryEdDt(this.efinList)
		},
		capitalChkEnDt	: function(){
			return this.checkIndustryEdDt(this.capitalList)
		},
		ginsuChkEnDt	: function(){
			return this.checkIndustryEdDt(this.ginsuList)
		},
		etcChkEnDt	: function(){
			if (this.checkIndustryEdDt(this.telecomList) || this.checkIndustryEdDt(this.p2pList) || this.checkIndustryEdDt(this.bondList) ||this.checkIndustryEdDt(this.usuryList))
			{
				return true
			}else{
				return false
			}
        },
        ...mapGetters('myassets', [
            'isMyAssetGathering'
        ]),
        totalConOrgCnt () {
            return (this.nacfAccList.length > 0 ? 1 : 0)
             + this.bankList.length
             + this.investList.length
             + this.cardList.length
             + this.insuList.length
             + this.efinList.length
             + this.capitalList.length
             + this.ginsuList.length
             + this.telecomList.length
             + this.p2pList.length
             + this.bondList.length
             + this.usuryList.length
             + this.publicList.length
        },
        totalConOrgExNacfCnt () {
            return this.bankList.length
             + this.investList.length
             + this.cardList.length
             + this.insuList.length
             + this.efinList.length
             + this.capitalList.length
             + this.ginsuList.length
             + this.telecomList.length
             + this.p2pList.length
             + this.bondList.length
             + this.usuryList.length
             + this.publicList.length
        },
        itemExprList() {
            return [...this.bankExprList
                , ...this.investExprList
                , ...this.cardExprList
                , ...this.insuExprList
                , ...this.efinExprList
                , ...this.capitalExprList
                , ...this.ginsuExprList
                , ...this.telecomExprList
                , ...this.p2pExprList
                , ...this.bondExprList
                , ...this.usuryExprList
                , ...this.publicExprList]
        },
        isAllChecked() {
            return this.chkedExprCnt === this.itemExprList?.length
        },
        chkedExprCnt() {
            return this.selectedExprList.length || 0
        }
    },
    mounted() {
        this.initComponent()
        this.tabLayerInit()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        ...mapActions('myassets', [
            'getAllMyAssetInfo',
            'getMyAssetInfo',
            'getMyBizRegInfo'
        ]),
        initComponent() {
            this.initData()
            this.getData()
            // this.getDefaultDataForFilter()
            this.fn_scrollMove()
        },
        initData() {
            this.nacfAccList     = []   // 농.축협 계좌 리스트
            // this.nacfAccTogYn    = false// 농.축협 계좌 리스트 show/hide 토글버튼 히든여부
            //////// 연결자산 관련 데이터
            this.userAsetList    = [] // 개인신용정보전송요구내역
            /* 은행 */
            this.bankList        = [] // 은행업권 데이터
            this.bankExprList    = [] // 은행업권 만료 데이터
            /* 카드 */
            this.cardList        = [] // 카드업권 데이터
            this.cardExprList    = [] // 카드업권 만료 데이터
            /* 증권 */
            this.investList      = [] // 금융투자업권 데이터
            this.investExprList  = [] // 금융투자업권 만료 데이터
            /* 보험 */
            this.insuList        = [] // 보험업권 데이터
            this.insuExprList    = [] // 보험업권 만료 데이터
            this.ginsuList       = [] // 보증보험업권 데이터
            this.ginsuExprList   = [] // 보증보험업권 만료 데이터
            /* 페이 */
            this.efinList        = [] // 전자금융업권 데이터
            this.efinExprList    = [] // 전자금융업권 만료 데이터
            /* 할부금융 */
            this.capitalList     = [] // 할부금융업권 데이터
            this.capitalExprList = [] // 할부금융업권 만료 데이터
            /* 기타금융 */
            this.telecomList     = [] // 통신업권 데이터
            this.telecomExprList = [] // 통신업권 만료 데이터
            this.usuryList       = [] // 대부 정보 데이터
            this.usuryExprList   = [] // 대부 정보 만료 데이터
            this.bondList        = [] // 인수채권 정보 데이터
            this.bondExprList    = [] // 인수채권 정보 만료 데이터
            this.p2pList         = [] // P2P 대출정보 데이터
            this.p2pExprList     = [] // P2P 대출정보 만료 데이터
            /* 공공기관 */
            this.publicList      = [] // 공공기관 데이터
            this.publicExprList  = [] // 공공기관 만료 데이터
            this.orgExprCnt      = 0    // 만료된 기관 개수
            this.orgPrdCnt       = 0    // 만료 예정 기관 개수
            this.modifyTxt       = "연결 변경" // 변경 버튼 텍스트
            this.disconTxt       = "연결 해제" // 해제 버튼 텍스트
            this.chkOrgList      = []   // 체크된 기관 리스트
            this.chkCnt          = 0    // 체크된 기관 개수
            // this.orgListForFilter    = []       // 변경 또는 해제 시 COAR2003넘기기 위한 필터링 데이터
            this.moduleList          = []       // 변경 또는 해제 시 체크리스트 중 orgListForFilter를 바탕으로 필터링된 리스트
            this.isBckYn             = false    // 변경 시 백업데이터 존재 유무
            // 연결기관/만료.해제기관 탭
            this.isConnectedTab = true
            this.checkedList= [] // 선택 기관 목록
            this.selectedExprList= [] // 체그된 만료 해제 기관 목록
            // this.chkedExprCnt= 0 // 체크된 만료/해제 기관 체크 개수
            this.disconParam		= []	// 만료/해제 기관 삭제관련 데이터 리스트
			this.disconCnt		= []	// 삭제할 만료/해제 기관 수
            this.isWorked		= false// api호출 후 데이터 변동 유무
            this.sessionTimerAuthor = null
        },
        fn_dayDiff(to, from){
			return dayDiff(to , from)
		},
        getData() {
            // 사용자 중앙회 계좌 조회
            const config = {
                url : "/co/am/08r03", //"/co/am/05rb3", ///co/am/05ra2
                data : {
                    mydtCusno : this.getUserInfo("mydtCusno")
                }
            }
            apiService.call(config).then(response => {
                this.nacfAccList = response.nacfAccList || []

                this.fn_setNacfAccList(this.nacfAccList)

                // 농.축협 보유계좌가 하나일 경우 숨김버튼 히든처리
                // if(this.nacfAccList.length === 1) this.nacfAccTogYn = false
                // else this.nacfAccTogYn = true
            })

            // 개인신용정보 전송요구내역 조회
            const config_con = {
                url : "/co/am/08r02", //"/co/am/05rb2", //"/co/am/05ra1",
                data : {
                    "mydtCusno" : this.getUserInfo('mydtCusno')
                    // "mydtCusno" : "2000000842"
                    // "mydtCusno" : "2000002900"   // 민도울
                }
            }
            apiService.call(config_con).then(response => {
                this.userAsetList = response.bzrgList || []
                // console.log("데이터 확인 :: ", this.userAsetList)
                this.modifyTxt = "연결 변경"
                this.disconTxt = "연결 해제"

// this.userAsetList[0].orgList[0].tmsEdDt = "20220901"
// this.userAsetList[0].orgList[2].tmsEdDt = "20220829"

                // 은행업권
                this.bankList = []
                this.bankExprList = []
                let tmpBankList		= (typeof _.find(this.userAsetList, {"comnCVal":"bank"}) !== "undefined") 	? _.find(this.userAsetList, {"comnCVal":"bank"}).orgList : []
                for(let i=0; i<tmpBankList.length; i++) {
                    tmpBankList[i].orgBizDsc = "bank"
                    if(tmpBankList[i].acsTokenDusDtm == '0' && this.fn_dayDiff(tmpBankList[i].tmsEdDt, this.currentDate) >= 0) {
                        // 토큰만료일자가 0이고, 전송종료일자가 현재일자보다 크거나 같을경우 연결목록에 포함
                        this.bankList.push(tmpBankList[i])
                    } else {
                        // 그 외 경우 만료로 판단
                        this.bankExprList.push(tmpBankList[i])
                    }
                }

                // 카드업권
                this.cardList = []
                this.cardExprList = []
                let tmpCardList 	= (typeof _.find(this.userAsetList, {"comnCVal":"card"}) !== "undefined") 	? _.find(this.userAsetList, {"comnCVal":"card"}).orgList : []
                for(let i=0; i<tmpCardList.length; i++) {
                    tmpCardList[i].orgBizDsc = "card"
                    if(tmpCardList[i].acsTokenDusDtm == '0' && this.fn_dayDiff(tmpCardList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.cardList.push(tmpCardList[i])
                    } else {
                        this.cardExprList.push(tmpCardList[i])
                    }
                }

                // 증권업권
                this.investList = []
                this.investExprList = []
                let tmpInvestList 	= (typeof _.find(this.userAsetList, {"comnCVal":"invest"}) !== "undefined") ? _.find(this.userAsetList, {"comnCVal":"invest"}).orgList : []
                for(let i=0; i<tmpInvestList.length; i++) {
                    tmpInvestList[i].orgBizDsc = "invest"
                    if(tmpInvestList[i].acsTokenDusDtm == '0' && this.fn_dayDiff(tmpInvestList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.investList.push(tmpInvestList[i])
                    } else {
                        this.investExprList.push(tmpInvestList[i])
                    }
                }

                // 보험업권
                this.insuList = []
                this.insuExprList = []
                let tmpInsuList		= (typeof _.find(this.userAsetList, {"comnCVal":"insu"}) !== "undefined") 	? _.find(this.userAsetList, {"comnCVal":"insu"}).orgList : []
                for(let i=0; i<tmpInsuList.length; i++) {
                    tmpInsuList[i].orgBizDsc = "insu"
                    if(tmpInsuList[i].acsTokenDusDtm == '0' && this.fn_dayDiff(tmpInsuList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.insuList.push(tmpInsuList[i])
                    } else {
                        this.insuExprList.push(tmpInsuList[i])
                    }
                }

                // 보증보헙엄권
                this.ginsuList = []
                this.ginsuExprList = []
                let tmpGinsuList	= (typeof _.find(this.userAsetList, {"comnCVal":"ginsu"}) !== "undefined") 	? _.find(this.userAsetList, {"comnCVal":"ginsu"}).orgList : []
                for(let i=0; i<tmpGinsuList.length; i++) {
                    tmpGinsuList[i].orgBizDsc = "ginsu"
                    if(tmpGinsuList[i].acsTokenDusDtm == '0' && this.fn_dayDiff(tmpGinsuList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.ginsuList.push(tmpGinsuList[i])
                    } else {
                        this.ginsuExprList.push(tmpGinsuList[i])
                    }
                }

                // 전자금융업권
                this.efinList = []
                this.efinExprList = []
                let tmpEfinList 	= (typeof _.find(this.userAsetList, {"comnCVal":"efin"}) !== "undefined") 	? _.find(this.userAsetList, {"comnCVal":"efin"}).orgList : []
                for(let i=0; i<tmpEfinList.length; i++) {
                    tmpEfinList[i].orgBizDsc = "efin"
                    if(tmpEfinList[i].acsTokenDusDtm == '0' && this.fn_dayDiff(tmpEfinList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.efinList.push(tmpEfinList[i])
                    } else {
                        this.efinExprList.push(tmpEfinList[i])
                    }
                }

                // 할부금융업권
                this.capitalList = []
                this.capitalExprList = []
                let tmpCapitalList 	= (typeof _.find(this.userAsetList, {"comnCVal":"capital"}) !== "undefined")? _.find(this.userAsetList, {"comnCVal":"capital"}).orgList : []
                for(let i=0; i<tmpCapitalList.length; i++) {
                    tmpCapitalList[i].orgBizDsc = "capital"
                    if(tmpCapitalList[i].acsTokenDusDtm == '0' && this.fn_dayDiff(tmpCapitalList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.capitalList.push(tmpCapitalList[i])
                    } else {
                        this.capitalExprList.push(tmpCapitalList[i])
                    }
                }

                // 통신업권
                this.telecomList = []
                this.telecomExprList = []
                let tmpTelecomList	= (typeof _.find(this.userAsetList, {"comnCVal":"telecom"}) !== "undefined")? _.find(this.userAsetList, {"comnCVal":"telecom"}).orgList : []
                for(let i=0; i<tmpTelecomList.length; i++) {
                    tmpTelecomList[i].orgBizDsc = "telecom"
                    if(tmpTelecomList[i].acsTokenDusDtm == '0' && this.fn_dayDiff(tmpTelecomList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.telecomList.push(tmpTelecomList[i])
                    } else {
                        this.telecomExprList.push(tmpTelecomList[i])
                    }
                }
                
                // 대부업권
                this.usuryList = []
                this.usuryExprList = []
                let tmpUsuryList	= (typeof _.find(this.userAsetList, {"comnCVal":"usury"}) !== "undefined")	? _.find(this.userAsetList, {"comnCVal":"usury"}).orgList : []
                for(let i=0; i<tmpUsuryList.length; i++) {
                    tmpUsuryList[i].orgBizDsc = "usury"
                    if(tmpUsuryList[i].acsTokenDusDtm == '0' && this.fn_dayDiff(tmpUsuryList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.usuryList.push(tmpUsuryList[i])
                    } else {
                        this.usuryExprList.push(tmpUsuryList[i])
                    }
                }

                // 채권업권
                this.bondList = []
                this.bondExprList = []
                let tmpBondList		= (typeof _.find(this.userAsetList, {"comnCVal":"bond"}) !== "undefined") 	? _.find(this.userAsetList, {"comnCVal":"bond"}).orgList : []
                for(let i=0; i<tmpBondList.length; i++) {
                    tmpBondList[i].orgBizDsc = "bond"
                    if(tmpBondList[i].acsTokenDusDtm == '0' && this.fn_dayDiff(tmpBondList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.bondList.push(tmpBondList[i])
                    } else {
                        this.bondExprList.push(tmpBondList[i])
                    }
                }

                // P2P업권
                this.p2pList = []
                this.p2pExprList = []
                let tmpP2pList 		= (typeof _.find(this.userAsetList, {"comnCVal":"p2p"}) !== "undefined")	? _.find(this.userAsetList, {"comnCVal":"p2p"}).orgList : []
                for(let i=0; i<tmpP2pList.length; i++) {
                    tmpP2pList[i].orgBizDsc = "p2p"
                    if(tmpP2pList[i].acsTokenDusDtm == '0' && this.fn_dayDiff(tmpP2pList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.p2pList.push(tmpP2pList[i])
                    } else {
                        this.p2pExprList.push(tmpP2pList[i])
                    }
                }
                
                // 공공업권
                this.publicList = []
                this.publicExprList = []
                let tmpPublicList 		= (typeof _.find(this.userAsetList, {"comnCVal":"public"}) !== "undefined")	? _.find(this.userAsetList, {"comnCVal":"public"}).orgList : []
                for(let i=0; i<tmpPublicList.length; i++) {
                    tmpPublicList[i].orgBizDsc = "public"
                    if(tmpPublicList[i].acsTokenDusDtm == '0' && this.fn_dayDiff(tmpPublicList[i].tmsEdDt, this.currentDate) >= 0) {
                        this.publicList.push(tmpPublicList[i])
                    } else {
                        this.publicExprList.push(tmpPublicList[i])
                    }
                }

                // 만료 예정 기관 개수 계산
                this.orgPrdCnt = this.fn_calcOrgPrdCnt()

                // 만료/해제 기관 개수 계산
                this.orgExprCnt = this.fn_calcOrgExprCnt()
                
                this.$nextTick(()=>{
                    this.fn_scrollMove()
                    this.callJQueryFncExcute()
                    setTimeout(() => {
                        this.initEvent() // 더보기 이벤트 추가
                    }, 100)
                    
				})
            })

        },
        // 만료 예정 기관 개수 계산
        fn_calcOrgPrdCnt() {
            let prdCnt = 0

            for(let i=0; i<this.userAsetList.length; i++) {
                // 개인신용정보전송요구내역 루프 start
                for(let j=0; j<this.userAsetList[i].orgList.length; j++) {
                    // 각 업권목록 루프 start
                    let tmpTmsEdDt = this.userAsetList[i].orgList[j].tmsEdDt || ""
                    let acsTknDusDtm = this.userAsetList[i].orgList[j].acsTokenDusDtm || ''
                    if(acsTknDusDtm === '0' && this.fn_dayDiff(tmpTmsEdDt, this.currentDate) >= 0 && this.fn_dayDiff(tmpTmsEdDt, this.currentDate) <= 30) {
                        // 전송요구종료일자가 30일 이내일 경우 만료예정으로 구분
                        prdCnt++
                    }
                }
            }

            return prdCnt
        },

        // 만료된 기관 개수 계산
        fn_calcOrgExprCnt() {
            let tmpExprCnt = 0
            tmpExprCnt = this.bankExprList.length + this.cardExprList.length + this.investExprList.length + this.insuExprList.length + 
                         this.ginsuExprList.length + this.efinExprList.length + this.capitalExprList.length + this.telecomExprList.length + 
                         this.usuryExprList.length + this.bondExprList.length + this.p2pExprList.length + this.publicExprList.length
            
            return tmpExprCnt
        },

        // 농.축협 계좌 조회 후 처리
        fn_setNacfAccList(list) {
            for(let i=0; i < list.length; i++) {
                if(list[i].bnkAcStsDsc === '99') {
                    list[i].checked = false
                } else {
                    list[i].checked = true
                }
            }
        },
        // 농.축협 계좌 show/hide 여부 변경 이벤트
        fn_chngStsDsc(idx, e) {
            if(!this.fn_chkChngStsDscValid(e)) {
                e.target.checked = true
                this.nacfAccList[idx].checked = true
                return false
            }
            if(this.nacfAccList[idx].checked) {
                if(this.nacfAccList.filter(el=> el.checked === true).length < 2) {
                    modalService.alert('최소 한 개 이상의 자산이 연결되어야 해요.').then(() => {
                        return false
                    })
                    return false
                }
                // show on
                const config_confirm = {
                    // 자산을 숨김 처리 하시겠습니까?
                    content : ["자산을 숨김 처리 할까요?"],
                    title : ""
                }
                modalService.confirm(config_confirm).then(text => {
                    if(text == "아니오") {
                        e.target.checked = true
                        this.nacfAccList[idx].checked = true
                        return false
                    } else {
                    
                        const config = {
                            url : '/mr/am/01s01', // "/co/am/05sa1",
                            data : {
                                mydtCusno : this.getUserInfo("mydtCusno"),
                                infOfrmnOrgC : "",
                                mydtAcno : this.nacfAccList[idx].mydtAcno,
                                bnkAcStsDsc : (this.nacfAccList[idx].bnkAcStsDsc === '99') ? '01' : '99'
                            }
                        }
                        apiService.call(config).then(response => {
                            const rspC = response.rspC || ""
                            if(rspC === '0000') {
                                this.nacfAccList[idx].checked = this.nacfAccList[idx].checked ? false : true
                                this.nacfAccList[idx].bnkAcStsDsc = (this.nacfAccList[idx].bnkAcStsDsc === '99') ? '01' : '99'
                                this.fn_refreshApiCall()
                            }
                        })
                    }
                })
            } else {
                // show off
                const config = {
                    url : '/mr/am/01s01', // "/co/am/05sa1",
                    data : {
                        mydtCusno : this.getUserInfo("mydtCusno"),
                        infOfrmnOrgC : "",
                        mydtAcno : this.nacfAccList[idx].mydtAcno,
                        bnkAcStsDsc : (this.nacfAccList[idx].bnkAcStsDsc === '99') ? '01' : '99'
                    }
                }
                apiService.call(config).then(response => {
                    const rspC = response.rspC || ""
                    if(rspC === '0000') {
                        this.nacfAccList[idx].checked = this.nacfAccList[idx].checked ? false : true
                        this.nacfAccList[idx].bnkAcStsDsc = (this.nacfAccList[idx].bnkAcStsDsc === '99') ? '01' : '99'
                        this.fn_refreshApiCall()
                    }
                })
            }

        },

        // 농.축협 계좌상태구분 변경 전 유효성 검사
        fn_chkChngStsDscValid(event) {
            // 체크해제 -> 체크 상태 변경일 경우 그대로 진행
            if(event.target.checked) return true

            // 최소 한 개 이상의 농.축협 계좌가 연결되어 있어야함.
            let chkCnt = 0

            for(let i=0; i<this.nacfAccList.length; i++) {
                if(this.nacfAccList[i].checked) chkCnt++
            }

            if(chkCnt <= 1) {
                // 최소 한 개 이상의<br> 자산이 연결되어야 합니다.
                modalService.alert("최소 한 개 이상의<br> 자산이 연결되어야 해요.")

                return false
            }

            return true
        },

        // 기관 체크박스 클릭 이벤트
        fn_chkOrgInfo(orgDiv, item, e) {
            
            let tmpObj = {}
            if(e.target.checked) {
                // 체크 on
                ////////////////// !! 추후 공공기관 데이터 개발 시 금융기관 과 함께 변경 불가 알럿 추가할것 !! ////////////////////
                if(this.chkOrgList.length + 1 > 25) {
                    modalService.alert("안전하고 신속한 자산 연결을 위해<br> 최대 25개까지 선택 가능합니다.").then(() => {
                        e.target.checked = false
                        return
                    })
                } else {
                    tmpObj.orgDiv       = orgDiv    // 기관구분
                    tmpObj.orgObj       = item      // 기관정보 Object
                    tmpObj.checked      = true      // 체크여부

                    this.chkOrgList.push(tmpObj)

                    this.chkCnt++
                    this.modifyTxt = this.chkCnt + "개 기관 변경"
                    this.disconTxt = this.chkCnt + "개 기관 해제"
                }
                
            } else {
                // 체크 off
                this.chkOrgList.splice( _.findIndex(this.chkOrgList, d => d.orgObj.infOfrmnOrgC === item.infOfrmnOrgC), 1 )

                this.chkCnt--
                this.modifyTxt = this.chkCnt === 0 ? "연결 변경" : this.chkCnt + "개 기관 변경"
                this.disconTxt = this.chkCnt === 0 ? "연결 해제" : this.chkCnt + "개 기관 해제"
            }
        },

        // 만료예정일 체크 (상단 리스트 클래스 변경)
        checkIndustryEdDt(objList) {
            let checkTF = false

            if(objList.length > 0) {
                for(const item of objList) {
                    if( ( this.fn_dayDiff(item.tmsEdDt, this.currentDate) >= 0 && this.fn_dayDiff(item.tmsEdDt, this.currentDate) <= 30 ) || ( this.fn_dayDiff(item.tmsEdDt, this.currentDate) < 0 ) ) {
                        checkTF = true
                        break
                    }
                }

                return checkTF
            } else {
                return false
            }
        },

        // 연결 해제 버튼 클릭
        fn_disconData() {
            if(this.chkCnt === 0) {
                modalService.alert("관리할 기관을 선택하세요.").then(() => {
                    return false
                })
            } else {
                const config = {
                    component : MRAM2005,
                    params : {
                        orgList : this.chkOrgList
                    }
                }
                modalService.openPopup(config).then(response => {
                    if(response === "complete") {
                        Object.assign(this.$data, this.$options.data())
                        // this.initComponent()
                        this.chkCnt = 0
                        this.getData()
                        this.$refs.content.scrollTop = 0
                    }
                })
            }
        },

        // 연결 변경 버튼 클릭
        fn_modifyData() {
            // if(this.chkOrgList.length === 0) return

            if(this.chkOrgList.length === 0) {
                modalService.alert("관리할 기관을 선택하세요.").then(() => {
                    return false
                })
            } else {
                // 연결 변경 start
                this.moduleList = []
                // this.moduleList.push({"infOfrmnOrgC":"A4AAAZ0000"})
                for(let i=0; i<this.chkOrgList.length; i++) {
    
                    // 1차인증 생략과정으로 인한 선택 기관 요소 input
                    this.moduleList.push( this.chkOrgList[i].orgObj )
                }
    
                this.isBckYn = false
                
                // console.log(">>> 간소화 가능?? >>> ", this.isBckYn)

                // 통합인증 접근토큰 리셋
                const config_tkReset = {
                    url:  "/co/ar/00r02",
                    data : {
                        "mydtCusno" : this.getUserInfo('mydtCusno')
                    }
                }
                apiService.call(config_tkReset).then(response => {
                    console.log(response)
                })

                this.moduleList = this.moduleList.map(item => {return {...item, "orgC": item.infOfrmnOrgC,"orgBzrgC" : item.orgBizDsc.toLowerCase() , "orgnm" : item.orgnm}})
                //기존 연결된 기관 외 선택 및 공공기관만 선택 여부 체크용
                let onlyPublic = this.moduleList.filter(item => item.orgBizDsc !== 'public').length

                let config = {}
                if(onlyPublic < 1) {
                    //COAR2005
                    console.log('공공기관만 선택 시 [COAR2005]')
                    config = {
                        component : COAR2005,
                        params : {
                            isMramMod		: '1',		// '연결기관 관리 변경'을 통해 넘어올 경우 falg 값 (1 : 연결자산관리 메인에서 변경, 2 : 만료예정 기관에서 만료일 변경)
                            moduleList		: this.moduleList,		// 선택한 기관 목록
                            isBckYn         : this.isBckYn, // '연결기관 관리 변경'을 통해 넘어오고 백업자산목록 존재유무 flag 값 (true : 선택기관 전체 자산 백업목록 존재, false : 미존재)
                            isOnlyPublic	: true,					// 공공기관만 (1차인증 필요 x)
                        }
                    }
                } else {
                    config = {
                        component : COAR2007,
                        params : {
                            isMramMod : '1',
                            selectedCnt 	 : this.moduleList.length,
                            isAlreadyConnect : true,
                            alreadyConList   : JSON.stringify(this.moduleList.map(item => {
																return {"org_code": item.orgC
																		,"orgBzrgC" : item.orgBzrgC}
															}))
                        }
                    }
                }
                modalService.openPopup(config).then(response => {
                    if(response === "completeMod") {
                        // 변경 완료시
                        this.$refs.content.scrollTop = 0
                        Object.assign(this.$data, this.$options.data())
                        if(!this.isMyAssetGathering){
                            this.getMyBizRegInfo().then(() => {
                                this.getAllMyAssetInfo().then(() => {
                                    // this.initComponent()
                                    this.getData()
                                })
                            })
                        }
                    }
                })
                    
                // })
            }

        },
        fn_busReAdd() {
            if(this.selectedExprList.length === 0) {
                modalService.alert("관리할 기관을 선택하세요.").then(() => {
                    return false
                })
                return false
            }
            this.moduleList = this.selectedExprList.map(item => {return {...item, "orgC": item.infOfrmnOrgC,"orgBzrgC" : item.orgBizDsc.toLowerCase() , "orgnm" : item.orgnm}})
            //기존 연결된 기관 외 선택 및 공공기관만 선택 여부 체크용
            let onlyPublic = this.moduleList.filter(item => item.orgBizDsc !== 'public').length

			if(onlyPublic < 1) {
				//COAR2005
				console.log('공공기관만 선택 시 [COAR2005]')
				const config = {
				component : COAR2005,
					params : {
						moduleList		: this.moduleList,		// 선택한 기관 목록
						isOnlyPublic	: true,					// 공공기관만 (1차인증 필요 x)
						isMramMod		: '2',		// '연결기관 관리 변경'을 통해 넘어올 경우 falg 값 (1 : 연결자산관리 메인에서 변경, 2 : 만료예정 기관에서 만료일 변경)
					}
				}
				modalService.openPopup(config)
				
			} else {
				//COAR2003
				console.log('기존 연결된 기관 외 선택 및 혼합 선택시 [COAR2003]')
				const config = {
                    component : COAR2003, 	
                    params : {
                        isMramMod : '2'
                        ,connectFlag : "aset"
                        ,moduleList : this.moduleList || []
                    }
				}
				modalService.openPopup(config).then(() => {
					
				})
			}
        },

        // 만료예정 기관관리 팝업 & 만료/해제 관리 팝업 MRAM2004 파일 내 통합.
        // 만료예정 기관관리 팝업 오픈
        fn_openExpr(tabIdx) {
            // modalService.alert("만료예정 기관관리 팝업 준비중입니다.")
            const config = {
                component : MRAM2004,
                params : {
                    selTab      : tabIdx,
                    bankList    : this.bankList,    // 은행리스트 (만료예정 기관 필터링 위함)
                    cardList    : this.cardList,    // 카드리스트 (만료예정 기관 필터링 위함)
                    investList  : this.investList,  // 증권리스트 (만료예정 기관 필터링 위함)
                    insuList    : this.insuList,    // 보험리스트 (만료예정 기관 필터링 위함)
                    efinList    : this.efinList,    // 페이리스트 (만료예정 기관 필터링 위함)
                    capitalList : this.capitalList, // 할부금융리스트 (만료예정 기관 필터링 위함)
                    ginsuList   : this.ginsuList,   // 보증보험리스트 (만료예정 기관 필터링 위함)
                    telecomList : this.telecomList, // 통신리스트 (만료예정 기관 필터링 위함)
                    usuryList   : this.usuryList,   // 대부리스트 (만료예정 기관 필터링 위함)
                    bondList    : this.bondList,    // 채권리스트 (만료예정 기관 필터링 위함)
                    p2pList     : this.p2pList,     // p2p리스트 (만료예정 기관 필터링 위함)
                    publicList  : this.publicList,     // public리스트 (만료예정 기관 필터링 위함)
                    bankExprList	: this.bankExprList,
                    cardExprList	: this.cardExprList,
                    investExprList	: this.investExprList,
                    insuExprList	: this.insuExprList,
                    efinExprList	: this.efinExprList,
                    capitalExprList	: this.capitalExprList,
                    ginsuExprList	: this.ginsuExprList,
                    telecomExprList	: this.telecomExprList,
                    usuryExprList	: this.usuryExprList,
                    bondExprList	: this.bondExprList,
                    p2pExprList		: this.p2pExprList,
                    publicExprList	: this.publicExprList,
                },
            }
            modalService.openPopup(config).then(response => {
                if(response === "completeWork") {
                    // 만료/해제 기관 신용정보 삭제 완료 시
                    this.$refs.content.scrollTop = 0
                    Object.assign(this.$data, this.$options.data())
                    this.getMyBizRegInfo().then(() => {
                        this.getAllMyAssetInfo().then(() => {
                            // this.initComponent()
                            this.getData()
                        })
                    })  
                } else if(response === "completeMod") {
                    // 만료/해제 예정 기관 만료일 변경 시
                    this.$refs.content.scrollTop = 0
                    Object.assign(this.$data, this.$options.data())
                    if(!this.isMyAssetGathering){
                        this.getMyBizRegInfo().then(() => {
                            this.getAllMyAssetInfo().then(() => {
                                // this.initComponent()
                                this.getData()
                            })
                        })
                    }
                }
            })
        },

        // 필터링용 기본 데이터 get
        // getDefaultDataForFilter() {
        //     const config = {
        //         url : '/co/ar/02r01', // '/co/ar/01ra1', 상호 마이데이터 고도화 2023.08.03 by CS533461
        //         data : {
        //             mydtCusno       : this.getUserInfo("mydtCusno"),
        //             ofrAttcMethC    : "01"
        //         }
        //     }
        //     apiService.call(config).then(response => {
        //         if(response.bank_cnt > 0) {
        //             for(const bankItem of response.bank_org) {
        //                 this.orgListForFilter.push(bankItem)
        //             }
        //         }
        //         if(response.card_cnt > 0) {
        //             for(const cardItem of response.card_org) {
        //                 this.orgListForFilter.push(cardItem)
        //             }
        //         }
        //         if(response.invest_cnt > 0) {
        //             for(const investItem of response.invest_org) {
        //                 this.orgListForFilter.push(investItem)
        //             }
        //         }
        //         if(response.insu_cnt > 0) {
        //             for(const insuItem of response.insu_org) {
        //                 this.orgListForFilter.push(insuItem)
        //             }
        //         }
        //         if(response.efin_cnt > 0) {
        //             for(const efinItem of response.efin_org) {
        //                 this.orgListForFilter.push(efinItem)
        //             }
        //         }
        //         if(response.capi_cnt > 0) {
        //             for(const capiItem of response.capi_org) {
        //                 this.orgListForFilter.push(capiItem)
        //             }
        //         }
        //         if(response.ginsu_cnt > 0) {
        //             for(const ginsuItem of response.ginsu_org) {
        //                 this.orgListForFilter.push(ginsuItem)
        //             }
        //         }
        //         if(response.tele_cnt > 0) {
        //             for(const teleItem of response.tele_org) {
        //                 this.orgListForFilter.push(teleItem)
        //             }
        //         }
        //         if(response.usury_cnt > 0) {
        //             for(const usuryItem of response.usury_org) {
        //                 this.orgListForFilter.push(usuryItem)
        //             }
        //         }
        //         if(response.bond_cnt > 0) {
        //             for(const bondItem of response.bond_org) {
        //                 this.orgListForFilter.push(bondItem)
        //             }
        //         }
        //         if(response.p2p_cnt > 0) {
        //             for(const p2pItem of response.p2p_org) {
        //                 this.orgListForFilter.push(p2pItem)
        //             }
        //         }
        //         if(response.public_cnt > 0) {
        //             for(const publicItem of response.public_org) {
        //                 this.orgListForFilter.push(publicItem)
        //             }
        //         }
        //     })
        // },

        // 신규 자산 연결
        fn_openNewConnect(orgDsc) {
            // modalService.alert(orgDsc + " 자산 연결 준비중입니다.")
            const config = {
                component : COAR2002,
                params : {
                    isMramNew : true,
                    orgDsc : orgDsc
                }
            }
            modalService.openPopup(config).then(() => {
                
            })
        },

        // 스크롤 및 카테고리 선택 이벤트 동작
        fn_scrollMove() {
            // 카테고리 클릭 이벤트
            $("#tab_scroll li").click(function(e){
                e.preventDefault();
                
                $(this).addClass('on');
                $(this).siblings().removeClass('on');
            });

            var $menu       = $("#tab_scroll li"),
                $contents   = $(".target"),
                $doc        = $("#content")

            $menu.on("click",'a',function(e) {
                e.preventDefault();

                var $target = $(this).parent(),
                    idx = $target.index(),
                    section = $contents.eq(idx),
                    // 스크롤동작에 따른 헤더 숨김처리 유무 대응
                    offsetTop = $("#wrap")[0].className.indexOf("responsive") != -1 ? section[0].offsetTop - 10 : section[0].offsetTop + 20;

                $doc.stop().animate({
                    scrollTop : offsetTop
                }, 800);

                return false
            });

            // 스크롤 동작 이벤트
            $("#content").scroll(function(e){
                e.preventDefault();

                var scltop = $(this).parent().children("#content").scrollTop() + 20;
                var calcScl_top = $(this).parent().children("#content").scrollTop(),
                    calcHeight = $(this).parent().children("#content")[0].offsetHeight,
                    calcScl_hgt = $(this).parent().children("#content")[0].scrollHeight;

                if(calcScl_top + calcHeight >= calcScl_hgt) {
                    // 스크롤 최하단 이동 시 '기타' 목록 표시
                    if($menu.eq($contents.length-1)[0]?.className?.indexOf("on") < 0) {
                        // 이미 '기타' 목록 표시가 된 경우 제외
                        $menu.removeClass('on');
                        $menu.eq($contents.length-1).addClass('on');

                        // 상단 카테고리 자동 스크롤
                        $(".com_tabmenu_type04 > div").each(function(){
                            let width = $(this).width()
                            let length = $(this).find("li").length
                            let index = Number(8) - 1
                            $("#tab_scroll").scrollLeft((width/length) * index)
                        })
                    }
                } else {
                    // 그 이외의 경우 스크롤 시 각 목록 자동 표시
                    $.each($contents, function(idx){
                        var $target = $contents.eq(idx),
                            targetTop = $target[0].offsetTop - 10;
                            targetTop = Math.floor(targetTop);
                        
                        if(calcScl_top == 0) {
                            // 스크롤 최상단 위치 시 'on' 클래스가 이상한 위치에 붙는 현상 방지
                            $menu.removeClass('on');
                            $menu.eq(0).addClass('on');
                        } else if(targetTop <= scltop) {
                            $menu.removeClass('on');
                            $menu.eq(idx).addClass('on');
                        }
                    })

                    // 상단 카테고리 자동 스크롤
                    $(".com_tabmenu_type04 > div").each(function(){
                        let $itemList = $(this).children().children()
                        let index = 100
                        
                        for(let i=0; i<$itemList.length; i++) {
                            if($itemList[i].className === 'on') index = i
                        }

                        let width = $(this).width()
                        let length = $(this).find("li").length
                        $("#tab_scroll").scrollLeft((width/length) * index)
                    })
                }

            })
        },
        //더보기 클릭
        // fn_openDetail(item) {
        //     // this.$refs.key
		// 	// $('.bottomBtnType .bottomBtn').on('click',function(){
		// 	// 	let _this = $(this),
		// 	// 			_par = _this.parent();
		// 	// 	if(_par.hasClass('open')){
		// 	// 		_par.find('.slideBox').slideUp(300);
		// 	// 		_par.removeClass('open');
		// 	// 		_par.find('.bottomBtn').text('더보기');
		// 	// 	}else{
		// 	// 		_par.find('.slideBox').slideDown(300);
		// 	// 		_par.addClass('open');
		// 	// 		_par.find('.bottomBtn').text('접기');
		// 	// 	}
        //     // });
        //     item.isOpen = !item.isOpen
        //     console.log('Click item ::: ', item.isOpen)
        // },
        // 만료/해제기관 체크 이벤트
		fn_checkExpr(evt, item) {
            console.log('fn_checkExpr', evt, item)
			if(evt.target.checked) {
				this.selectedExprList.push(item)

				// this.chkedExprCnt++

				// 기관이 전체 선택되었을 경우 '전체선택' 체크 활성화
				// if(this.chkedExprCnt === this.itemExprList?.length)  this.$refs.chkAllExpr.checked = true
			} else {
				let delIdx = _.findIndex(this.selectedExprList, d => d.infOfrmnOrgC === item.infOfrmnOrgC)
				this.selectedExprList.splice(delIdx, 1)

				// this.chkedExprCnt--
				// this.$refs.checkedExprAll.checked = false
			}
		},

		// 만료/해제기관 전체 체크 이벤트
		fn_chkExprAll(evt) {
            let inpExprList = this.$refs["expr_"]
            console.log('inpExprList', inpExprList)

			for(let i=0; i<inpExprList.length; i++) {
				inpExprList[i].checked = evt.target.checked ? true : false
			}

			if(evt.target.checked && this.itemExprList) {
				for(let i=0; i<this.itemExprList?.length; i++) {
					if(_.findIndex(this.selectedExprList, d => d.infOfrmnOrgC === this.itemExprList[i].infOfrmnOrgC) > -1) continue

					this.selectedExprList.push(this.itemExprList[i])
				}
			} else {
				this.selectedExprList = []
			}

			// this.chkedExprCnt = evt.target.checked ? this.itemExprList?.length || 0 : 0
		},
        initEvent() {
            //더보기 클릭
			$('.bottomBtnType .bottomBtn').on('click',function(){
				var _this = $(this),
						_par = _this.parent();
				if(_par.hasClass('open')){
					_par.find('.slideBox').slideUp(300);
					_par.removeClass('open');
					_par.find('.bottomBtn').text('더보기');
				}else{
					_par.find('.slideBox').slideDown(300);
					_par.addClass('open');
					_par.find('.bottomBtn').text('접기');
				}
			})
        },
        /*
        * 자산등록화면이동
        */
        fn_openAssetPage() {
            //자산등록
            const config = {
                component: COAR2001,
                params : {}
            }
            modalService.openPopup(config).then(response => {
                console.log(JSON.stringify(response))
                if(response === 'move' || response === true){
                  //this.getData()
                }
            })
        },
        // 삭제 버튼 이벤트
		fn_busDelete() {
			if(this.chkedExprCnt === 0) {
				modalService.alert("관리할 기관을 선택하세요.").then(() => {

				})
			} else {
				const config_slide = {
					params : {},
					renderer : {
						component : MRAM2003
					}
				}
				modalService.openSlidePagePopup(config_slide).then(response => {
					if(response === 'Y') {
						// 체크한 기관, 업권 리스트 생성
						let checkedList = []
						let tmpIdx = ""
						
						for(let i=0; i<this.itemExprList.length; i++) {
							tmpIdx = _.findIndex(this.selectedExprList, d => d.infOfrmnOrgC === this.itemExprList[i].infOfrmnOrgC)
	
							if(tmpIdx > -1) checkedList.push(this.itemExprList[i])
						}
						this.disconParam = []
						this.disconParam = _.chain(checkedList)
									.map(d => {
										return {
											orgC 		: d.infOfrmnOrgC,
											orgnm 		: d.orgnm,
											industry 	: d.orgBizDsc,
											isSuccess 	: false,
										}
									})
									.value()
	
						console.log("개인신용정보 삭제! >>> ", this.disconParam)
						this.disconCnt = 0
						// 데이터 삭제 api 호출

						this.startSessionTimerAuth()
						this.fn_dataDelete()
	
						// modalService.alert("개인신용정보가 삭제 되었습니다.").then(response => {
						// 	console.log(response)
						// })
					}
				})
			}

        },
        // 세션 연장
		startSessionTimerAuth(){
			//인터벌로 변경 처리
			this.sessionTimerAuthor = setInterval(() => {

				// if(this.getUserInfo('chnl') === '385'){
				// 	// 스뱅 로그인 연장 처리
				// 	this.$store.dispatch('config/extendSession')
				// }else{
				// 	// 콕뱅 로그인 연장 처리
				// }
				
				// 스뱅/콕뱅 로그인 연장 처리
				this.$store.dispatch('config/extendSession')

				//pfm 로그인 연장을 위한 더미 API콜 처리
				const config = {
					url: '/co/co/00r02',
					data: {
					"mydtCusno" : this.getUserInfo('mydtCusno'),
					}
				}
				apiService.call(config).then(() =>{
					//알람 더미 체크
				})

			}, 30*1000);
        },
        // 데이터 삭제 api
		fn_dataDelete() {
            console.log('데이터 삭제 api')
			const config = {
				url : '/co/co/02sb3', // "/co/co/02sa3", 
				data : {
					orgC 			: this.disconParam[this.disconCnt].orgC,
					mydtCusno 		: this.getUserInfo("mydtCusno"),
					tmsBrkDelDsc 	: "2",										// 전송내역삭제구분코드 >> "1" : 탈회, "2" : 철회
					clientId 		: this.getUserInfo("svcClientId"),
				}
			}
			apiService.call(config).then(response => {
				if(response.rsp_code === "00000") {
					// this.disconParam[this.disconCnt].isSuccess = true
					
					// // 만료/해제 기관 리스트에서 해당 기관 삭제
					// this.itemExprList.splice(_.findIndex(this.itemExprList, d => d.infOfrmnOrgC === this.disconParam[this.disconCnt].orgC), 1)
					
					// if(this.disconParam[this.disconCnt].industry === "bank") {
					// 	this.bankExprList.splice(_.findIndex(this.bankExprList, d => d.infOfrmnOrgC === this.disconParam[this.disconCnt].orgC), 1)
					// } else if(this.disconParam[this.disconCnt].industry === "card") {
					// 	this.cardExprList.splice(_.findIndex(this.cardExprList, d => d.infOfrmnOrgC === this.disconParam[this.disconCnt].orgC), 1)
					// } else if(this.disconParam[this.disconCnt].industry === "invest") {
					// 	this.investExprList.splice(_.findIndex(this.investExprList, d => d.infOfrmnOrgC === this.disconParam[this.disconCnt].orgC), 1)
					// } else if(this.disconParam[this.disconCnt].industry === "efin") {
					// 	this.efinExprList.splice(_.findIndex(this.efinExprList, d => d.infOfrmnOrgC === this.disconParam[this.disconCnt].orgC), 1)
					// } else if(this.disconParam[this.disconCnt].industry === "insu") {
					// 	this.insuExprList.splice(_.findIndex(this.insuExprList, d => d.infOfrmnOrgC === this.disconParam[this.disconCnt].orgC), 1)
					// } else if(this.disconParam[this.disconCnt].industry === "ginsu") {
					// 	this.ginsuExprList.splice(_.findIndex(this.ginsuExprList, d => d.infOfrmnOrgC === this.disconParam[this.disconCnt].orgC), 1)
					// } else if(this.disconParam[this.disconCnt].industry === "telecom") {
					// 	this.telecomExprList.splice(_.findIndex(this.telecomExprList, d => d.infOfrmnOrgC === this.disconParam[this.disconCnt].orgC), 1)
					// } else if(this.disconParam[this.disconCnt].industry === "capital") {
					// 	this.capitalExprList.splice(_.findIndex(this.capitalExprList, d => d.infOfrmnOrgC === this.disconParam[this.disconCnt].orgC), 1)
					// } else if(this.disconParam[this.disconCnt].industry === "bond") {
					// 	this.bondExprList.splice(_.findIndex(this.bondExprList, d => d.infOfrmnOrgC === this.disconParam[this.disconCnt].orgC), 1)
					// } else if(this.disconParam[this.disconCnt].industry === "usury") {
					// 	this.usuryExprList.splice(_.findIndex(this.usuryExprList, d => d.infOfrmnOrgC === this.disconParam[this.disconCnt].orgC), 1)
					// } else if(this.disconParam[this.disconCnt].industry === "p2p") {
					// 	this.p2pExprList.splice(_.findIndex(this.p2pExprList, d => d.infOfrmnOrgC === this.disconParam[this.disconCnt].orgC), 1)
					// }

					this.disconCnt++

					if(this.disconParam.length == this.disconCnt) {
						console.log("끝!")
						clearInterval(this.sessionTimerAuthor)

						// 목록 및 체크카운트 재구성
						for(let i=0; i<this.$refs["expr_"].length; i++) {
							this.$refs["expr_"][i].checked = false
						}
						// this.chkedExprCnt = 0

						modalService.alert("개인신용정보가 삭제 되었습니다.").then(() => {
							/**
							 * 체크한 만료/해제 기관 삭제 완료 후 리로드
							 */
                            this.isWorked = true

							// 완료 후 기관 관리 메인으로 이동
                            // this.close("completeWork")
                            // this.initComponent()
                            this.selectedExprList = []
                            this.getData()
						})
					} else {
						this.fn_dataDelete()
					}
				} else {
					modalService.alert("기관 삭제에 실패하였습니다.").then(text => {
                        console.log('text ## ', text)
						// if(text == "확인") this.close("completeWork")
					})
				}
			})
        },
        tabLayerInit() {
			let arr = [],
			_tabList = $('.switchType li');
			console.log('_tabList', _tabList)
			if (_tabList?.length > 0) {
				_tabList.each(function(e){
                    arr[e] = $(this).outerWidth();
				});
				console.log('arr ## ', arr)
				_tabList.css('width',Math.round(Math.max(...arr)) + 3); //탭 사이즈 적용
				_tabList.parent().parent().css('width',Math.round(Math.max(...arr)*arr.length) + 3); //탭전체 사이즈 적용
			}
			//console.log('값 = '+arr+', 갯수 = '+arr.length+', 최고값 = '+Math.max(...arr));
        },
        /**
         * 수집갱신 처리
         */
        async fn_refreshApiCall() {
           //Vuex Store로 변경
           // 20220422 두번 클릭 방지 
           console.log('isMyAssetGathering', this.isMyAssetGathering)
           if(!this.isMyAssetGathering){
               console.log('getAllMyAssetInfo')
               this.getAllMyAssetInfo()
           }
        },
    },
    created() {
    },
    updated(){
    },
    destroyed(){
        clearInterval(this.sessionTimerAuthor)
    },
    components: {
        Page,
        FootersV2,
        // PdCategoryV2,
    },
}
</script>