<!--
/*************************************************************************
* @ 서비스경로 : 자산등록 > 부동산
* @ 페이지설명 : 자산등록 > 부동산 > step 1. 부동산정보입력
* @ 파일명     : src/views/page/CO/RE/CORE2201/CORE2201.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-05-12
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-05-12              CS515897              최초작성
* 2022-07-18              CS528053              고도화 파일명, UI 변경 및 고도화 개발(CORE0001.vue -> CORE2201.vue)
*************************************************************************/
-->
<template>
    <div class="full_popup renewal" id="full_popup_01">
        <div class="popup_header">    
			<h1>부동산</h1>		
        </div>
        <div class="popup_content">
            <div class="com_inner">
                <!-- 아파트만 입력가능하게 할 시 -->
                <template v-if="!isTitleHide">
                    <strong class="com_pop_tit01">부동산 종류를 선택하세요.</strong>
                    <div class="com_tabmenu_type03 custom_tab">
                        <ul role="tablist">
                            <li :class="selItem === '0' ? 'on' : ''" :aria-selected="selItem === '0' ? true : false" @click.prevent="chngSelItem('0')"><a role="tab" aria-selected="true" href="javascript:void(0);"><span>아파트</span></a></li>
                            <li :class="selItem === '1' ? 'on' : ''" :aria-selected="selItem === '1' ? true : false" @click.prevent="chngSelItem('1')"><a role="tab" aria-selected="false" href="javascript:void(0);"><span>직접입력</span></a></li>
                        </ul>
                    </div>
                </template>

                <!-- 아파트 Start -->
                <template :class="isApt ? 'on' : ''" v-if="isApt">
                    <div class="tab_wrap02">
                        <div class="com_input_type02" @click.prevent="openAddrSrch">
                            <input type="search" id="txt01" role="button" placeholder="동/단지 명으로 아파트 찾기" v-model="aptNm" ref="aptNm"  readonly/>
                            <!-- <a href="javascript:void(0);" role="button" class="com_btn_delete"><span class="blind">삭제</span></a> -->
                            <a href="javascript:void(0);" class="com_btn_search"><span class="blind">검색</span></a>
                        </div>
                    </div>
                    <template v-if="isAptSrch">
                        <div class="com_btnselectbox_type01">
                            <button type="button" title="면적 선택" class="com_btnselect_type01" @click.prevent="openRlestAreaPop()" ref="areaWidth">
                                <span>{{newPytpAreaCntn===""?"면적 선택하세요.":(newPytpAreaCntn+'㎡')}}</span>
                            </button>
                        </div>
                        <div class="com_btnselectbox_type01">
                            <button type="button" title="주거형태 선택" class="com_btnselect_type01" @click.prevent="openRlestRsdFormPop($event)" ref="rlestDsc">
                                <span>{{rlestRsdFormDsc===""?"주거형태 선택하세요.":rlestRsdFormDscNm}}</span>
                            </button>
                        </div>
                    </template>
                </template>
                <!-- // 아파트 End -->
                <!-- 직접입력 Start -->
                <template :class="!isApt ? 'on' : ''" v-else-if="!isApt">
                    <div class="tab_wrap02">
                        <div class="com_btnselectbox_type01">
                            <button type="button" class="com_btnselect_type01" title="부동산 유형선택" @click.prevent="openRlestTngDscPop()">
                                <span>{{rlestTngDsc=='' || rlestTngDsc == null ? "부동산 유형을 선택하세요." : rlestTngDscNm}}</span>
                            </button>
                        </div>

                        <!-- 토지(6) 선택시 -->
                        <div class="com_btnselectbox_type01" v-if="rlestTngDsc == '6'">
                            <button type="button" class="com_btnselect_type01 com_iconstar" title="부동산 소재지 선택" @click.prevent="openAreaPop()">
                                <em class="blind">필수입력</em>
                                <span>{{(provC == '' || ccwC == '' || ttvC == '' || areaNm == '') ? "부동산 소재지를 선택하세요." : areaNm}}</span>
                            </button>
                        </div>
                        <!-- //토지 선택시 -->

                        <div class="com_input_type01 necessary" v-if="rlestTngDsc != '' && rlestTngDsc != null">
                            <input type="text" id="com_input01" :value="rlestNm" ref="rlestNm" required placeholder="부동산 별칭을 입력하세요" title="부동산 별칭 입력" @keyup="fn_checkWord($event, 30), setVisible('rlestNm')" @keyup.enter="moveNextTag($event)">
                            <label for="com_input01">
                                <em><span class="blind">필수입력</span></em>
                                <span class="txt_label_x">부동산 별칭</span>
                            </label>
                            <div class="del_txt">
                                <!-- <a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a> -->
                            </div>
                        </div>

                        <!-- 주택(5)/오피스텔(2) 선택 시  -->
                        <div class="com_btnselectbox_type01" v-if="(rlestNm != '' || rlestNmShow) && (rlestTngDsc == '5' || rlestTngDsc == '2')">
                            <button type="button" class="com_btnselect_type01" title="주거형태선택"  data-popup="slide_popup_01" @click.prevent="openRlestRsdFormPop($event)">
                                <span>{{rlestRsdFormDsc === "" ? "주거형태 선택하세요." : rlestRsdFormDscNm}}</span>
                            </button>
                        </div>
                        <!-- //주택/오피스텔 선택 시 -->

                        <!-- 자가이거나 토지/농지, 상가, 기타 일때 -->
                        <template v-if="rlestRsdFormDsc == '1' || rlestTngDsc == '6' || rlestTngDsc == '7' || rlestTngDsc == '9'">
                            <div class="com_input_type01 com_word2 necessary">
                                <input type="tel" id="com_input02" v-model="rlestTrPr" ref="rlestTrPr" required placeholder="매매가격 입력" title="매매가격을 입력하세요" @keyup="addComma('rlestTrPr', $event)" maxlength="11">
                                <label for="com_input02">
                                    <em><span class="blind">필수입력</span></em>
                                    <span class="txt_label_x">매매가격</span>
                                </label>
                                <div class="del_txt">
                                    <!-- <a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a> -->
                                    <span class="com_inputtxtright2">만원</span>
                                </div>
                                <p class="com_sum">{{fn_hanValue(rlestTrPr)}}</p>
                                <div class="btn_price_group">
                                    <button type="button" class="btn_price" @click.prevent="btnPriceEvt(10, 'rlestTrPr')">+<strong>10</strong>만</button>
                                    <button type="button" class="btn_price" @click.prevent="btnPriceEvt(100, 'rlestTrPr')">+<strong>100</strong>만</button>
                                    <button type="button" class="btn_price" @click.prevent="btnPriceEvt(1000, 'rlestTrPr')">+<strong>1000</strong>만</button>
                                    <button type="button" class="btn_price" @click.prevent="btnPriceEvt(10000, 'rlestTrPr')">+<strong>1</strong>억</button>
                                </div>
                            </div>

                            <div class="com_input_type01 com_word2 mb0 necessary" role="button" @click.prevent="fn_popupCalendar($event, 'dlDt')" :aria-label="'필수입력,' + getDateFormat(dlDt, '', '매매일') + '매매일 선택'">
                                <input type="text" id="cal_input03" class="input_cal_date com_txtright_type01 tar" name="" v-model="dlDt" ref="dlDt" readonly required placeholder="매매일자 선택" title="매매일자를 선택하세요." aria-hidden="true">
                                <label for="cal_input03">
                                    <em><span class="blind">필수입력</span></em>
                                    <span class="txt_label_x">매매일</span>
                                </label>
                            </div>
                        </template>
                        <!-- //자가 -->

                        <!-- 전월세 -->
                        <template v-else-if="rlestRsdFormDsc == '2' || rlestRsdFormDsc == '3'">
                            <div class="com_input_type01 com_word2 necessary">
                                <input type="tel" id="com_input04" v-model="grmy" ref="grmy" required placeholder="보증금 입력" title="보증금을 입력하세요" @keyup="addComma('grmy', $event)" maxlength="11">
                                <label for="com_input04">
                                    <!-- 전세일 경우만 필수입력 체크 -->
                                    <template v-if="rlestRsdFormDsc == '2'">
                                        <em><span class="blind">필수입력</span></em>
                                    </template>
                                    <span class="txt_label_x">보증금</span>
                                </label>
                                <div class="del_txt">
                                    <!-- <a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a> -->
                                    <span class="com_inputtxtright2">만원</span>
                                </div>
                                <p class="com_sum">{{fn_hanValue(grmy)}}</p>
                                <div class="btn_price_group">
                                    <button type="button" class="btn_price" @click.prevent="btnPriceEvt(10, 'grmy')">+<strong>10</strong>만</button>
                                    <button type="button" class="btn_price" @click.prevent="btnPriceEvt(100, 'grmy')">+<strong>100</strong>만</button>
                                    <button type="button" class="btn_price" @click.prevent="btnPriceEvt(1000, 'grmy')">+<strong>1000</strong>만</button>
                                    <button type="button" class="btn_price" @click.prevent="btnPriceEvt(10000, 'grmy')">+<strong>1</strong>억</button>
                                </div>
                            </div>

                            <!-- 월세 -->
                            <div class="com_input_type01 com_word2 necessary" v-if="rlestRsdFormDsc == '3'">
                                <input type="tel" id="com_input05" v-model="mmr" ref="mmr" required placeholder="월세 입력" title="월세를 입력하세요" @keyup="addComma('mmr', $event)" maxlength="11">
                                <label for="com_input05">
                                    <em><span class="blind">필수입력</span></em>
                                    <span class="txt_label_x">월세</span>
                                </label>
                                <div class="del_txt">
                                    <!-- <a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a> -->
                                    <span class="com_inputtxtright2">만원</span>
                                </div>
                                <p class="com_sum">{{fn_hanValue(mmr)}}</p>
                                <div class="btn_price_group">
                                    <button type="button" class="btn_price" @click.prevent="btnPriceEvt(1, 'mmr')">+<strong>1</strong>만</button>
                                    <button type="button" class="btn_price" @click.prevent="btnPriceEvt(10, 'mmr')">+<strong>10</strong>만</button>
                                    <button type="button" class="btn_price" @click.prevent="btnPriceEvt(50, 'mmr')">+<strong>50</strong>만</button>
                                    <button type="button" class="btn_price" @click.prevent="btnPriceEvt(100, 'mmr')">+<strong>100</strong>만</button>
                                </div>
                            </div>
                            <!-- //월세 -->

                            <div class="com_input_type01 com_word2 necessary" role="button" @click.prevent="fn_popupCalendar($event, 'ctrDt')" :aria-label="'필수입력,' + getDateFormat(ctrDt, '', '계약일') + '계약일 선택'">
                                <input type="text" id="com_input06" class="input_cal_date com_txtright_type01 tar" name="" v-model="ctrDt" ref="ctrDt" readonly required placeholder="계약일자 선택" title="계약일자를 선택하세요." aria-hidden="true">
                                <label for="com_input03">
                                    <em><span class="blind">필수입력</span></em>
                                    <span class="txt_label_x">계약일</span>
                                </label>
                            </div>

                            <div class="com_input_type01 com_word2 mb0 necessary" role="button" @click.prevent="fn_popupCalendar($event, 'dueDt')" :aria-label="'필수입력,' + getDateFormat(dueDt, '', '만기일') + '만기일 선택'">
                                <input type="text" id="com_input06" class="input_cal_date com_txtright_type01 tar" name="" v-model="dueDt" ref="dueDt" readonly required placeholder="만기일자 선택" title="만기일자를 선택하세요." aria-hidden="true">
                                <label for="com_input03">
                                    <em><span class="blind">필수입력</span></em>
                                    <span class="txt_label_x">만기일</span>
                                </label>
                            </div>
                        </template>

                        <!-- on/off 버튼 (주택/오피스텔일 때는 주거형태 입력 후 show, 토지/상가/기타일 때는 유형 입력 후 show) -->
                        <template v-if="((rlestTngDsc == '5' || rlestTngDsc == '2') && rlestRsdFormDsc != '') || (rlestTngDsc == '6' || rlestTngDsc == '7' || rlestTngDsc == '9')">
                            <div class="switch_list_wrap">
                                <!-- 자가이거나 부동산 물건구분코드가 토지/농지(6), 상가(7), 기타(9)인 경우 show -->
                                <div class="custom_list com_box_type01" v-if="rlestRsdFormDsc == '1' || rlestTngDsc == '6' || rlestTngDsc == '7' || rlestTngDsc == '9'">
                                    <div class="new_tit_area">
                                        <div class="tit"><span class="normal_font">공동투자 지분이 있어요</span></div>
                                        <span class="cmm-switch custom-switch fr" @change.prevent="onoffChg('1')">
                                            <input type="checkbox" id="check01" :checked="isCheckedInv" role="switch">
                                            <label for="check01"><em class="blind">공동투자 지분이 있어요 체크</em></label>
                                        </span>
                                    </div>
                                    <div class="switch_sub_box" v-if="isShowInv">
                                        <div class="com_input_type01 com_word1">
                                            <input type="tel" id="revn_input01" class="tar" v-model="commQtart" ref="commQtart" required placeholder="소유 지분율을 입력하세요" title="지분율을 입력" maxlength="3" @keyup="commQtartEvt($event)">
                                            <label for="revn_input01">
                                                <span class="txt_label_x">지분율</span>
                                            </label>
                                            <div class="del_txt">
                                                <a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
                                                <span class="com_inputtxtright2">%</span>
                                            </div>
                                        </div>
                                        <p class="com_txt_sub01">단독 소유는 100%를 입력해 주세요</p>
                                    </div>
                                </div>
            
                                <!-- 자가이고 주택(5)/오피스텔(2)인 경우만 show -->
                                <div class="custom_list com_box_type01" v-if="rlestRsdFormDsc == '1' && (rlestTngDsc == '5' || rlestTngDsc == '2')">
                                    <div class="new_tit_area">
                                        <div class="tit"><span class="normal_font">세입자가 있어요</span></div>
                                        <span class="cmm-switch custom-switch fr" @change.prevent="onoffChg('2')">
                                            <input type="checkbox" id="check02" :checked="isCheckedRevn" role="switch">
                                            <label for="check02"><em class="blind">세입자가 있어요 체크</em></label>
                                        </span>
                                    </div>
                                    <div class="switch_sub_box" v-if="isShowRevn">
                                        <div class="com_input_type01 com_word2 mb0 necessary" role="button" @click.prevent="fn_popupCalendar($event, 'ctrDtRevn')" :aria-label="'필수입력,' + getDateFormat(ctrDtRevn, '', '계약일') + '계약일 선택'">
                                            <input type="text" id="revn_input02" class="input_cal_date com_txtright_type01 tar" name="" v-model="ctrDtRevn" ref="ctrDtRevn" required placeholder="계약일 선택" title="계약일을 선택하세요." aria-hidden="true" readonly>
                                            <label for="revn_input02">
                                                <em><span class="blind">필수입력</span></em>
                                                <span class="txt_label_x">계약일</span>
                                            </label>
                                        </div>
                                        <div class="com_input_type01 com_word2 mb0 necessary" role="button" @click.prevent="fn_popupCalendar($event, 'dueDtRevn')" :aria-label="'필수입력,' + getDateFormat(dueDtRevn, '', '만기일') +'만기일 선택'">
                                            <input type="text" id="revn_input03" class="input_cal_date com_txtright_type01 tar" name="" v-model="dueDtRevn" ref="dueDtRevn" required placeholder="만기일 선택" title="만기일을 선택하세요." aria-hidden="true" readonly>
                                            <label for="revn_input03">
                                                <em><span class="blind">필수입력</span></em>
                                                <span class="txt_label_x">만기일</span>
                                            </label>
                                        </div>
                                        <div class="com_input_type01 com_word2 necessary">
                                            <input type="tel" id="revn_input04" v-model="grmyRevn" ref="grmyRevn" required placeholder="보증금을 입력하세요 " title="보증금을 입력" @keyup="addComma('grmyRevn', $event)" maxlength="11">
                                            <label for="revn_input04">
                                                <!-- <em><span class="blind">필수입력</span></em> -->
                                                <span class="txt_label_x">세입자 보증금</span>
                                            </label>
                                            <div class="del_txt">
                                                <a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
                                                <span class="com_inputtxtright2">만원</span>
                                            </div>
                                            <p class="com_sum">{{fn_hanValue(grmyRevn)}}</p>
                                            <div class="btn_price_group">
                                                <button type="button" class="btn_price" @click.prevent="btnPriceEvt(10, 'grmyRevn')">+<strong>10</strong>만</button>
                                                <button type="button" class="btn_price" @click.prevent="btnPriceEvt(100, 'grmyRevn')">+<strong>100</strong>만</button>
                                                <button type="button" class="btn_price" @click.prevent="btnPriceEvt(1000, 'grmyRevn')">+<strong>1000</strong>만</button>
                                                <button type="button" class="btn_price" @click.prevent="btnPriceEvt(10000, 'grmyRevn')">+<strong>1</strong>억</button>
                                            </div>
                                        </div>
                                        <div class="com_input_type01 com_word2 necessary">
                                            <input type="tel" id="revn_input05" v-model="mmrRevn" ref="mmrRevn" required placeholder="월세인 경우 월세 금액을 입력해 주세요" title="월세를 입력" @keyup="addComma('mmrRevn', $event)" maxlength="11">
                                            <label for="revn_input05">
                                                <!-- <em><span class="blind">필수입력</span></em> -->
                                                <span class="txt_label_x">세입자 월세</span>
                                            </label>
                                            <div class="del_txt">
                                                <a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
                                                <span class="com_inputtxtright2">만원</span>
                                            </div>
                                            <p class="com_sum">{{fn_hanValue(mmrRevn)}}</p>
                                            <div class="btn_price_group">
                                                <button type="button" class="btn_price" @click.prevent="btnPriceEvt(1, 'mmrRevn')">+<strong>1</strong>만</button>
                                                <button type="button" class="btn_price" @click.prevent="btnPriceEvt(10, 'mmrRevn')">+<strong>10</strong>만</button>
                                                <button type="button" class="btn_price" @click.prevent="btnPriceEvt(50, 'mmrRevn')">+<strong>50</strong>만</button>
                                                <button type="button" class="btn_price" @click.prevent="btnPriceEvt(100, 'mmrRevn')">+<strong>100</strong>만</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="custom_list com_box_type01">
                                    <div class="new_tit_area">
                                        <div class="tit"><span class="normal_font">대출이 있어요</span></div>
                                        <span class="cmm-switch custom-switch fr" @change.prevent="onoffChg('3')">
                                            <input type="checkbox" id="check03" :checked="isCheckedLoan" role="switch">
                                            <label for="check03"><em class="blind">대출이 있어요 체크</em></label>
                                        </span>
                                    </div>
                                    <div class="switch_sub_box" v-if="isShowLoan">
                                        <div class="com_txt_type02">
                                            <template v-if="msgFlag != 0">
                                                <ul class="list_type_01 chk_list_type_01">
                                                    <template v-for="(item, idx) in rlestInstArr">
                                                        <li :key="'loan_'+idx" v-if="item.checked">
                                                            <span class="btn_chk">
                                                                <input type="checkbox" disabled :id="'chk_'+idx">
                                                                <label :for="'chk_'+idx">
                                                                    <dl>
                                                                        <dt>
                                                                            <div>
                                                                                <i :class="item.infOfrmnOrgC"><span class="blind">{{item.orgnm}}</span></i>
                                                                                <em>{{item.acWrsnm}}</em>
                                                                                <span>{{item.mydtAcno}}</span>
                                                                            </div>
                                                                        </dt>
                                                                        <dd>
                                                                            <span class="com_price">
                                                                                <em class="num">{{item.acNowBac | numberFilter}}</em><em class="unit">원</em>
                                                                            </span>
                                                                        </dd>
                                                                    </dl>
                                                                </label>
                                                            </span>
                                                        </li>
                                                    </template>
                                                </ul>
                                            </template>
                                            <template v-else>
                                                <p class="dot_msg">부동산 관련 대출이 있으시다면 대출상품을 선택하세요.</p>
                                            </template>
                                        </div>
                                        <div class="com_btn_area">
                                            <a href="javascript:void(0);" class="com_btn_round" @click.prevent="createInstArr()"><span class="btn_go">{{btnMsg}}</span></a>
                                        </div>
                                    </div>
                                </div>
                                <p class="dot_msg">해당사항이 없으시면 선택하지 않으셔도 됩니다.</p>
                            </div>
                        </template>
                    </div>
                </template>
                <!-- // 직접입력 End -->
            </div>
        </div>
        
        <!-- footer S -->
		<div class="bottom_box">
			<div class="btn_full_box" v-if="isApt">
				<a href="javascript:void(0);" role="button" class="btn btn_mint" :class="btnOnOff" @click.prevent="nextPage($event)" :aria-disabled="btnOnOff == 'btn_off' ? true : false">다음</a>
			</div>
            <div class="btn_full_box" v-else>
                <a href="javascript:void(0);" role="button" class="btn btn_mint" :class="btnOnOffDir" @click.prevent="resistRlest($event)" :aria-disabled="btnOnOffDir == 'btn_off' ? true : false">{{isUpt?"수정":"등록"}}</a>
            </div>
        </div>
        <!--// footer E -->

        <a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="closePage"><span class="blind">팝업닫기</span></a>
    </div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import {keyupNumFormat} from '@/utils/number'
import {checkWord} from '@/utils/data'
import {dateFormat} from '@/utils/date' //monthAdd
import _ from 'lodash'

import CORE1202 from '@/views/page/CO/RE/CORE1202/CORE1202' // 아파트 검색
import CORE1203 from '@/views/page/CO/RE/CORE1203/CORE1203' // 면적 선택
import CORE1204 from '@/views/page/CO/RE/CORE1204/CORE1204' // 주거형태 선택(자가, 전세, 월세)
import CORE1205 from '@/views/page/CO/RE/CORE1205/CORE1205' // 부동산유형 선택(주택, 오피스텔, 토지, 상가, 기타)
import CORE2206 from '@/views/page/CO/RE/CORE2206/CORE2206' // 다음 넘어가서 아파트 시세 및 구입가격입력 단계
import COCO2201 from '@/views/page/CO/CO/COCO2201/COCO2201' // 자산 등록완료 화면
import COCO1002 from '@/views/page/CO/CO/COCO1002/COCO1002' // 계좌 없을 때의 슬라이드 팝업
//import COCO1109 from '@/views/page/CO/CO/COCO1109/COCO1109' // 자산 등록완료 화면(AS-IS)
import COCO1124 from '@/views/page/CO/CO/COCO1124/COCO1124' // 계좌 목록 조회 슬라이드 팝업
//import SZST2106 from '@/views/page/SZ/ST/SZST2106/SZST2106' // 토지일 경우 시도/시군구/읍면동 선택 팝업
import CORE2210 from '@/views/page/CO/RE/CORE2210/CORE2210' // 소재지 설정 팝업, 토지일 경우 시도/시군구/읍면동 선택 팝업

export default {
    name : "CORE2201",
    data: () => {
        return {
            selItem             : "0",
            isApt               : true,
            isAptSrch           : false,
            isData              : false, // 넘어온 데이터 있는지 여부
            isTitleHide         : false, // 아파트/직접입력 탭 숨김 여부
            isInterest          : false, // 관심부동산에서 자산등록하는지 여부

            // 아파트 데이터
            aptHscxIdvdc        : "", // 아파트단지개별코드
            aptNm               : "", // 아파트명(부동산명)
            newPytpAreaCntn     : "", // 면적
            rlestRsdFormDsc     : "", // 주거형태 (자가:1, 전세:2, 월세:3)
            rlestRsdFormDscNm   : "", // 주거형태명
            aptHfisArea         : "", // 아파트분양면적

            // 직접입력 데이터
            rlestTngDsc         : "", // 부동산유형(부동산물건구분코드)
            rlestTngDscNm       : "", // 부동산유형명
            rlestNm             : "", // 부동산명
            genDlAm             : "", // 시세금액
            rlestTrPr           : "", // 매매가격
            dlDt                : "", // 매매일자
            grmy                : "", // 보증금
            mmr                 : "", // 월세
            ctrDt               : "", // 계약일자
            dueDt               : "", // 만기일자
            commQtart           : "", // 지분율
            areaNm              : "", // 시도/시군구/읍면동 한글명
            provC               : "", // 시도코드
            ccwC                : "", // 시군구코드
            ttvC                : "", // 읍면동코드
            provnm              : "", // 시도명
            ccwnm               : "", // 시구명
            ttvnm               : "", // 동명

            // 세입자 여부에 따른 값 세팅(동일한 컬럼에 저장)
            revnMnEn            : "", // 세입자 여부
            grmyRevn            : "", // 세입자 보증금
            mmrRevn             : "", // 세입자 월세
            ctrDtRevn           : "", // 세입자 계약일자
            dueDtRevn           : "", // 세입자 만기일자
            
            rlestCnctAcList : [], // (수정) 부동산 대출 목록

            popId               : "",       // 부모창에서 띄운 팝업창id(추가등록용)
            isUpt               : false,    // 등록/수정 flag
            chkSelect           : false,    // 부동산대출 상품 선택 완료 여부

            // section visible on/off
            rlestNmShow         : false,    // 부동산 별칭

            // KHC_20210714 
            rlestHldSqno        : "", // 부동산보유일련번호
            rlestInstArr        : [], // 대출상품 리스트
            msgFlag             : 0,  
            btnMsg              : "부동산대출 선택하기",

            // on/off 버튼 체크여부
            isCheckedInv        : '', // 공동투자
            isCheckedRevn       : '', // 세입자
            isCheckedLoan       : '', // 대출

            // on/off 버튼 하위 항목 show 여부
            isShowInv           : false, // 공동투자
            isShowRevn          : false, // 세입자
            isShowLoan          : false, // 대출

            today               : dateFormat(new Date(), "YYYY-MM-DD") // 오늘 일자
        }
    },
    computed: {
        // 아파트
        btnOnOff() {
            return (this.aptNm === "" || this.newPytpAreaCntn === "" || this.rlestRsdFormDsc === "") ? "btn_off" : ""
        },
        // 직접입력
        btnOnOffDir() {
            if(this.rlestTngDsc == '5' || this.rlestTngDsc == '2') { // 부동산물건구분코드가 주택(5), 오피스텔(2)일 경우
                if(this.rlestRsdFormDsc == '1') { // 자가
                    // 부동산 별칭, 매매가격, 매매일자
                    if(this.rlestNm == '' || this.rlestTrPr <= 0 || this.dlDt == '')
                        return "btn_off";
                } else if(this.rlestRsdFormDsc == '2') { // 전세
                    // 부동산 별칭, 보증금, 계약일자, 만기일자
                    if(this.rlestNm == '' || this.grmy <= 0 || this.ctrDt == '' || this.dueDt == '')
                        return "btn_off";
                } else if(this.rlestRsdFormDsc == '3') { // 월세
                    // 부동산 별칭, 보증금 제외, 월세, 계약일자, 만기일자
                    if(this.rlestNm == '' || this.mmr <= 0 || this.ctrDt == '' || this.dueDt == '')
                        return "btn_off";
                } else {
                    // 주거형태 등 선택 안된 경우
                    return "btn_off";
                }
            } else if(this.rlestTngDsc == '6') { // 토지/농지(6)
                // 시도코드, 시군구코드, 읍면동코드, 부동산별칭, 매매가격, 매매일자
                if(this.provC == '' || this.ccwC == '' || this.ttvC == '' || this.rlestNm == '' || this.rlestTrPr <= 0 || this.dlDt == '')
                    return "btn_off";
            } else if(this.rlestTngDsc == '7' || this.rlestTngDsc == '9') { // 상가(7), 기타(9)
                // 부동산 별칭, 매매가격, 매매일자
                if(this.rlestNm == '' || this.rlestTrPr <= 0 || this.dlDt == '')
                    return "btn_off";
            } else {
                // 부동산 유형 선택 안된 경우
                return "btn_off";
            }

            // on/off 버튼 값 따라 하위 항목 체크
            if(this.isCheckedInv == 'checked') { // 공동투자
                // 지분율 0이하이면 off
                if(this.commQtart <= 0)
                    return "btn_off";
            }
            if(this.isCheckedRevn == 'checked') { // 세입자
                // 계약일자, 만기일자, 세입자 보증금, 세입자 월세
                if(this.ctrDtRevn == '' || this.dueDtRevn == '' || (this.grmyRevn <= 0 && this.mmrRevn <= 0))
                    return "btn_off";
            }
            if(this.isCheckedLoan == 'checked') { // 대출
                // 대출목록
                if(this.rlestInstArr == '' || this.rlestInstArr.length <= 0)
                    return "btn_off";
            }

            return '';
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
        // 화면 초기화
        initComponent(params = {}) {
            this.popId = params.popId || ""

            this.rlestHldSqno   = params.rlestHldSqno;
            this.isUpt          = params.isUpt;
            this.selItem        = '0';
            this.isData         = params.isData;
            this.isTitleHide    = params.isTitleHide || false;
            this.initRlestRsdFormDsc();                             // 주거형태 하위항목들 초기화

            if(this.isUpt) {
                this.getUpdData()
            }

            if(this.isData) {
                this.selItem            = '0'
                this.isApt              = true
                this.isAptSrch          = true
                this.aptHscxIdvdc       = params.aptHscxIdvdc || ""                     // 아파트단지개별코드
                this.aptNm              = params.aptNm || ""                            // 아파트단지명
                this.newPytpAreaCntn    = params.newPytpAreaCntn || ""                  // 신평형면적내용
                this.aptHfisArea        = params.aptHfisArea || ""                      // 아파트분양면적
                this.isInterest         = params.isInterest || false                    // 관심부동산에서 자산등록하는지 여부
            }
        },
        // 수정 시 등록된 데이터 출력
        getUpdData() {
            const config = {
                url : "/co/re/01ra1",
                data : {
                    mydtCusno : this.getUserInfo('mydtCusno'),  // 고객번호
                    rlestHldSqno : this.rlestHldSqno,           // 부동산보유일련번호
                }
            }
            apiService.call(config).then(response => {
                this.selItem = response.mmoInpYn || ""  // 수기입력여부

                if(this.selItem === '1') {          // 직접입력
                    this.isApt = false
                    this.isAptSrch = false

                    // on/off 버튼 활성/비활성 - 공동지분율
                    if(response.commQtart > 0) {
                        this.isCheckedInv = 'checked';
                        this.isShowInv = true;
                    } else {
                        this.isCheckedInv = '';
                        this.isShowInv = false;
                    }

                    // on/off 버튼 활성/비활성 - 세입자
                    if(response.revnMnEn == '1') {
                        this.isCheckedRevn = 'checked';
                        this.isShowRevn = true;
                    } else {
                        this.isCheckedRevn = '';
                        this.isShowRevn = false;
                    }

                    this.rlestNm            = response.rlestNm || ""                                                                            // 부동산명
                    this.rlestTngDsc        = response.rlestTngDsc || ""                                                                        // 부동산물건구분코드
                    this.rlestTngDscNm      = this.getComCodeNm("RLEST_TNG_DSC", this.rlestTngDsc)                                              // 부동산물건구분코드명
                    this.rlestRsdFormDsc    = response.rlestRsdFormDsc || ""                                                                    // 부동산거주형태구분코드
                    this.rlestRsdFormDscNm  = this.getComCodeNm("RLEST_RSD_FORM_DSC", this.rlestRsdFormDsc)                                     // 부동산거주형태구분코드명
                    this.rlestTrPr          = keyupNumFormat(response.rlestTrPr) || ""                                                          // 부동산거래가격(매매금액)
                    this.revnMnEn           = response.revnMnEn || ""                                                                           // 세입자여부
                    this.dlDt               = response.dlDt || ""                                                                               // 매매일자
                    this.commQtart          = response.commQtart || ""                                                                          // 공동지분율
                    this.provC              = response.provC || ""                                                                              // 시도코드
                    this.ccwC               = response.ccwC || ""                                                                               // 시군구코드
                    this.ttvC               = response.ttvC || ""                                                                               // 읍면동코드
                    this.aptHfisArea        = response.aptHfisArea || ""                                                                        // 아파트분양면적
                    this.provnm             = response.provnm || ""                                                                             // 시도명
                    this.ccwnm              = response.ccwnm || ""                                                                              // 시구명
                    this.ttvnm              = response.ttvnm || ""                                                                              // 동명

                    // 시도코드, 시군구코드, 읍면동코드 있을 경우만 지역명 세팅
                    if(this.provC != '' && this.ccwC != '' && this.ttvC != '') {
                        this.areaNm         = this.provnm + ' > ' + this.ccwnm + ' > ' + this.ttvnm                                             // 지역명
                    }

                    // 세입자여부에 따른 보증금/월세/계약일/만기일
                    if(response.revnMnEn == '1') {
                        this.grmyRevn = keyupNumFormat(response.grmy) || ""     // 세입자 보증금
                        this.mmrRevn = keyupNumFormat(response.mmr) || ""       // 세입자 월세
                        this.ctrDtRevn = response.ctrDt || ""                   // 세입자 계약일자
                        this.dueDtRevn = response.dueDt || ""                   // 세입자 만기일자
                    } else {
                        this.grmy = keyupNumFormat(response.grmy) || ""         // 보증금
                        this.mmr = keyupNumFormat(response.mmr) || ""           // 월세
                        this.ctrDt = response.ctrDt || ""                       // 계약일자
                        this.dueDt = response.dueDt || ""                       // 만기일자
                    }

                    // 일자 하이픈 처리
                    if(this.dlDt != '')         this.dlDt = this.getDateFormat(this.dlDt, '-');
                    if(this.ctrDt != '')        this.ctrDt = this.getDateFormat(this.ctrDt, '-');
                    if(this.dueDt != '')        this.dueDt = this.getDateFormat(this.dueDt, '-');
                    if(this.ctrDtRevn != '')    this.ctrDtRevn = this.getDateFormat(this.ctrDtRevn, '-');
                    if(this.dueDtRevn != '')    this.dueDtRevn = this.getDateFormat(this.dueDtRevn, '-');

                    // 연결계좌목록
                    this.rlestCnctAcList    = response.rlestCnctAcList || []

                    // on/off 버튼 활성/비활성 - 대출
                    if(response.rlestCnctAcList.length > 0) {
                        this.isCheckedLoan = 'checked';
                        this.isShowLoan = true;
                    } else {
                        this.isCheckedLoan = '';
                        this.isShowLoan = false;
                    }

                    // 연결계좌목록 및 대출 버튼 텍스트 처리
                    if(this.rlestCnctAcList.length > 0) {
                        let tmpArr = {}
                        for(let i=0; i<this.rlestCnctAcList.length; i++) {
                            tmpArr = {
                                "infOfrmnOrgC"  : this.rlestCnctAcList[i].infOfrmnOrgC,   // 정보제공자기관코드
                                "orgnm"         : this.rlestCnctAcList[i].trOrgnm,        // 기관명
                                "acWrsnm"       : this.rlestCnctAcList[i].acWrsnm,        // 할부금융상품명
                                "mydtAcno"      : this.rlestCnctAcList[i].mydtAcno,       // 마이데이터계좌번호
                                "mydtScNo"      : this.rlestCnctAcList[i].mydtScNo,       // 마이데이터회차번호
                                "acNowBac"      : this.rlestCnctAcList[i].acNowBac,       // 대출계좌잔액
                                "checked"       : true
                            }
                            this.rlestInstArr.push(tmpArr)
                            this.msgFlag++
                        }
                        if(this.msgFlag > 0) {
                            this.btnMsg = "부동산대출 다시선택하기"
                        } else {
                            this.btnMsg = "부동산대출 선택하기"
                        }
                    }

                } else if(this.selItem === '0') {   // 아파트
                    this.isApt = true
                    this.isAptSrch = true

                    // this.aptNm === "" || this.newPytpAreaCntn === "" || this.rlestRsdFormDsc === ""
                    this.aptHscxIdvdc       = response.aptHscxIdvdc || ""                                                                       // 아파트단지개별코드
                    this.aptNm              = response.aptHcxnm || ""                                                                           // 아파트단지명
                    this.newPytpAreaCntn    = response.newPytpAreaCntn || ""                                                                    // 신평형면적내용
                    this.aptHfisArea        = response.aptHfisArea || ""                                                                        // 아파트분양면적
                    this.rlestTngDsc        = response.rlestTngDsc || ""                                                                        // 부동산물건구분코드
                    this.rlestTngDscNm      = this.getComCodeNm("RLEST_TNG_DSC", this.rlestTngDsc)                                              // 부동산물건구분코드명
                    this.rlestRsdFormDsc    = response.rlestRsdFormDsc || ""                                                                    // 부동산거주형태구분코드
                    this.rlestRsdFormDscNm  = this.getComCodeNm("RLEST_RSD_FORM_DSC", this.rlestRsdFormDsc)                                     // 부동산거주형태구분코드명
                    this.genDlAm            = response.genDlAm || ""                                                                            // 일반매매금액(시세금액)
                    this.rlestTrPr          = response.rlestTrPr || ""                                                                          // 부동산거래가격(매매금액)
                    this.revnMnEn           = response.revnMnEn || ""                                                                           // 세입자여부
                    this.dlDt               = response.dlDt || ""                                                                               // 매매일자
                    this.commQtart          = response.commQtart || ""                                                                          // 공동지분율
                    this.provC              = response.provC || ""                                                                              // 시도코드
                    this.ccwC               = response.ccwC || ""                                                                               // 시군구코드
                    this.ttvC               = response.ttvC || ""                                                                               // 읍면동코드
                    this.aptHfisArea        = response.aptHfisArea || ""                                                                        // 아파트분양면적

                    // 세입자여부에 따른 보증금/월세/계약일/만기일 (아파트일 경우는 on/off 버튼 조작 안함)
                    if(response.revnMnEn == '1') {
                        this.grmyRevn = keyupNumFormat(response.grmy) || ""     // 세입자 보증금
                        this.mmrRevn = keyupNumFormat(response.mmr) || ""       // 세입자 월세
                        this.ctrDtRevn = response.ctrDt || ""                   // 세입자 계약일자
                        this.dueDtRevn = response.dueDt || ""                   // 세입자 만기일자
                    } else {
                        this.grmy = keyupNumFormat(response.grmy) || ""         // 보증금
                        this.mmr = keyupNumFormat(response.mmr) || ""           // 월세
                        this.ctrDt = response.ctrDt || ""                       // 계약일자
                        this.dueDt = response.dueDt || ""                       // 만기일자
                    }

                    this.rlestCnctAcList    = response.rlestCnctAcList || []    // 연결계좌목록
                }
            })
        },
        // 라디오 버튼 변경 이벤트
        chngSelItem(val) {
            this.selItem = val
            
            if(this.selItem == '0') {   // 아파트 클릭
                this.isApt              = true
                this.isAptSrch          = false
                this.rlestRsdFormDsc    = ""
                this.rlestRsdFormDscNm  = ""
                this.rlestNm            = ""
                this.newPytpAreaCntn    = ""
                this.aptHfisArea        = ""
                this.rlestTngDsc        = ""
                this.rlestTngDscNm      = ""
                this.initRlestRsdFormDsc();

                // section visible false 처리
                this.rlestNmShow        = false
            } else {                    // 직접입력 클릭
                this.isApt              = false
                this.rlestRsdFormDsc    = ""
                this.rlestRsdFormDscNm  = ""
                this.aptNm              = ""
                this.rlestTrPr          = ""
                this.grmy               = ""
                this.mmr                = ""
            }
        },
        // 아파트 주소 검색 팝업오픈
        openAddrSrch() {
            let param = {
                srchKwrd : this.aptNm,
            }
            const config = {
                component: CORE1202,
                params : param
            }
            modalService.openPopup(config).then(response => {
                this.aptNm          = response.aptNm
                this.aptHscxIdvdc   = response.aptHscxIdvdc
                this.isAptSrch      = true

                // 면적, 주거형태 초기화
                this.newPytpAreaCntn = response.newPytpAreaCntn
                this.aptHfisArea     = response.aptHfisArea

                // 주거형태 팝업 오픈
                this.$nextTick(() => {
                    this.$refs.rlestDsc.click()
                })
            })
        },
        // 면적 선택 레이어 팝업 오픈
        openRlestAreaPop() {
            let rlestInfo = []
            // 면적 리스트
            const config0 = {
                url : "/co/re/03ra1",
                data : {
                    aptHscxIdvdc : this.aptHscxIdvdc
                }
            }
            apiService.call(config0).then(response => {
                
                if(response.pytpAreaList != null && response.pytpAreaList != undefined) {
                    if(response.pytpAreaList.length > 0) {
                        rlestInfo = response.pytpAreaList;
                    }
                }
                
                const config1 = {
                    params : {
                        rlestInfo : rlestInfo,
                        selArea : this.newPytpAreaCntn,
                    },
                    renderer : {
                        component : CORE1203
                    }
                }
                modalService.openSlidePagePopup(config1).then(response => {
                    this.newPytpAreaCntn = response.newPytpAreaCntn
                    this.aptHfisArea = response.aptHfisArea
                })
            })
        },
        // 주거형태 선택 레이어 팝업 오픈
        openRlestRsdFormPop(e) {
            const listData = this.getCodeList("RLEST_RSD_FORM_DSC") // 공통(주거형태) 리스트

            const config = {
                params : {
                    selectVal : this.rlestRsdFormDsc,
                    list : listData
                },
                renderer : {
                    component : CORE1204
                }
            }
            modalService.openSlidePagePopup(config).then(response => {
                this.rlestRsdFormDsc    = response.rlestTngDscVal
                this.rlestRsdFormDscNm  = response.rlestTngDscNm

                // 하위 항목 초기화
                this.initRlestRsdFormDsc();

                // 다음 항목 이동
                this.$nextTick(()=>{
                    if(e !== null && !this.isApt) {
                        if(this.rlestRsdFormDsc === "1") {
                            this.$refs.rlestTrPr.focus()
                        } else {
                            this.$refs.grmy.focus()
                        }
                    }
                })
            })
        },
        // 다음 이동
        nextPage(e) {
            if(e.target.className.indexOf("btn_off") != -1) return false

            let param = {
                popId           : this.popId,               // 팝업ID(추가등록용)
                isUpt           : this.isUpt,               // 등록/수정 flag
                isInterest      : this.isInterest, 		    // 관심부동산에서 자산등록하는지 여부

                rlestRsdFormDsc : this.rlestRsdFormDsc,     // 주거형태구분코드(다음으로 넘어가는 경우는 아파트뿐이라서 아파트:1 값으로 고정)
                aptHscxIdvdc    : this.aptHscxIdvdc,        // 아파트단지개별코드
                aptNm           : this.aptNm,               // 아파트명
                newPytpAreaCntn : this.newPytpAreaCntn,     // 면적(신평형면적내용)
                aptHfisArea     : this.aptHfisArea,         // 아파트분양면적

                rlestHldSqno    : this.rlestHldSqno,        // 부동산보유일련번호
                rlestTrPr       : this.rlestTrPr,           // 매매가격
                rlestCnctAcList : this.rlestCnctAcList,     // 부동산 대출 상품 선택 리스트

                dlDt            : this.dlDt,                // 매매일자
                commQtart       : this.commQtart,           // 공동지분율
                revnMnEn        : this.revnMnEn,            // 세입자여부
                genDlAm         : this.genDlAm,             // 일반매매금액(시세)

                // 세입자여부에 따른 값 세팅
                grmy            : this.grmy,                // 보증금
                mmr             : this.mmr,                 // 월세
                ctrDt           : this.ctrDt,               // 계약일자
                dueDt           : this.dueDt,               // 만기일자
                grmyRevn        : this.grmyRevn,            // 세입자 보증금
                mmrRevn         : this.mmrRevn,             // 세입자 월세
                ctrDtRevn       : this.ctrDtRevn,           // 세입자 계약일자
                dueDtRevn       : this.dueDtRevn            // 세입자 만기일자
            }
            const config = {
                component: CORE2206,
                params : param
            }
            modalService.openPopup(config).then(response => {
                if(response === "add"){
                    this.clearData()
                }
            })
        },
        // 금액 단위 , 표시
        addComma(refNm, e) {
            if(e.keyCode === 13) return false

            let selectionStartPos = "" 
            let selectionEndPos = ""

            selectionStartPos = this.$refs[refNm].selectionStart
            selectionEndPos = this.$refs[refNm].selectionEnd

            if(this.$refs[refNm].length == 1 && this.$refs[refNm].value == 0) {
                this.$refs[refNm].value = this.$refs[refNm].value.slice(0, -1)
            } else {
                this.$refs[refNm].value = this.$refs[refNm].value.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                this.$refs[refNm].value = this.$refs[refNm].value.split(",").join("")
                this.$refs[refNm].value = keyupNumFormat(this.$refs[refNm].value)
            }

            // input값 금액 변경 후 한글명 입력되도록
            this.fn_hanValue(this.$refs[refNm].value);

            // 입력 금액이 두 항목 이상일 경우, 다른 항목 콤마에 영향이 가는 경우 방지
            switch(refNm) {
                case 'rlestTrPr' :
                    this.rlestTrPr = this.$refs[refNm].value;
                    break;
                case 'grmy' :
                    this.grmy = this.$refs[refNm].value;
                    break;
                case 'mmr' :
                    this.mmr = this.$refs[refNm].value;
                    break;
                case 'grmyRevn' :
                    this.grmyRevn = this.$refs[refNm].value;
                    break;
                case 'mmrRevn' :
                    this.mmrRevn = this.$refs[refNm].value;
                    break;
            }

            if(e.keyCode === 8) {
                this.$nextTick(()=>{
                    this.$refs[refNm].focus()
                    this.$refs[refNm].setSelectionRange(selectionStartPos,selectionEndPos)
                })
            }
        },
        //데이터 초기화
        clearData(){
            Object.assign(this.$data, this.$options.data())
            
        },
        // 화면 우상단 x버튼 클릭(모든 팝업창 close)
        closePage() {
            const config = {
                content: ['입력중인 정보는 저장되지 않습니다<br>정말로 취소하시겠습니까?'],
                title  : "",
            }
            modalService.confirm(config).then(text => {
                if(text == "예") {
                    this.closeAllData(true)
                }
            })
        },
        // KHC_20210714
        //대출 내역 리스트 생성
        createInstArr() {
            let contentData = []
            let uptList = []

            if(this.isUpt) {uptList = this.rlestInstArr}

            if((this.rlestInstArr.length < 1 || uptList.length > 0) && !this.chkSelect) {
                const config = {
                    //url : "/co/co/07r01",
                    url  : "/an/re/05ra1", // 부동산 통합 계좌 목록 조회(은행/보험의 신용/담보대출)
                    data : {
                        mydtCusno   : this.getUserInfo("mydtCusno"),    // 마이데이터고객번호
                        //bnkAcDsc    : '32',                             // 은행계좌구분코드(10 : 수신상품, 20 : 투자상품, 32: 담보대출(부동산) , 35: 할부금융(자동차))
                    }
                }

                apiService.call(config).then(response => {
                    //let acntList = response.accountList || []
                    let acntList  = response.cnctAcList || [];
                    if(acntList != null) {
                        for(let i=0; i<acntList.length; i++) {
                            contentData.push({
                                "orgC"      :acntList[i].infOfrmnOrgC,  // 정보제공자기관코드
                                "orgNm"     :acntList[i].trOrgnm,       // 기관명
                                "scNo"      :acntList[i].mydtScNo,      // 마이데이터회차번호
                                "goodsCode" :acntList[i].mydtAcno,      // 마이데이터계좌번호
                                "goodsName" :acntList[i].acWrsnm,       // 계좌상품명
                                "goodsPrice":acntList[i].acNowBac,      // 계좌현재잔액
                                "checked"   : (this.isUpt && (typeof _.find(this.rlestInstArr, {"mydtAcno":acntList[i].mydtAcno, "acWrsnm":acntList[i].acWrsnm}) != "undefined")) ? true : false
                            })
                        }
                    } 
                    this.openSelectRlestInst(contentData)
                })
            } else {
                for(let i=0; i<this.rlestInstArr.length; i++) {
                    const tempArr = {
                        'orgC'      :this.rlestInstArr[i].infOfrmnOrgC, // 정보제공자기관코드
                        'orgNm'     :this.rlestInstArr[i].orgnm,        // 기관명
                        'scNo'      :this.rlestInstArr[i].mydtScNo,     // 마이데이터회차번호
                        'goodsCode' :this.rlestInstArr[i].mydtAcno,     // 마이데이터계좌번호
                        'goodsName' :this.rlestInstArr[i].acWrsnm,      // 계좌상품명
                        'goodsPrice':this.rlestInstArr[i].acNowBac,     // 계좌현재잔액
                        'checked'   :this.rlestInstArr[i].checked       // 체크여부
                    }
                    contentData.push(tempArr)
                }
                this.openSelectRlestInst(contentData)
            }
        },
        // 대출상품 선택 팝업 오픈
        openSelectRlestInst(content) {
            if(content.length > 0) {
                const config = {
                    params : {
                        title : "대출상품 선택"
                    },
                    renderer : {
                        component : COCO1124,
                        cdata : {
                            "title":"대출상품 선택",
                            "contentList":[
                                {
                                    'contentData':content
                                }
                            ]
                        }
                    }
                }
                modalService.openSlidePagePopup(config).then(response => {
                    this.rlestInstArr = []
                    this.msgFlag = 0
                    for(let i=0; i<response.length; i++) {
                        const tmpArray = {
                            "infOfrmnOrgC"  :response[i].orgC,
                            "orgnm"         :response[i].orgNm,
                            "mydtScNo"      :response[i].scNo,
                            "mydtAcno"      :response[i].goodsCode,
                            "acWrsnm"       :response[i].goodsName,
                            "acNowBac"      :response[i].goodsPrice,
                            "checked"       :response[i].checked
                        }
                        this.rlestInstArr.push(tmpArray)
                        if(tmpArray.checked == true) { this.msgFlag++ }
                    }
                    
                    this.chkSelect = true   // 부동산 대출 상품 선택 완료

                    if(this.msgFlag > 0) {
                        this.btnMsg = "부동산대출 다시선택하기"
                    } else {
                        this.btnMsg = "부동산대출 선택하기"
                    }
                })
            } else {
                const config = {
                    component: COCO1002,
                    params : {}
                }
                modalService.openPopup(config).then((response) => {
                    //바이패스
                    console.log("CORE1202 close popup", response)
                })
            }
        },

        // KHC_20210714, 220810 서비스 변경
        // 부동산 등록
        resistRlest(e) {
            if(e.target.className.indexOf("btn_off") != -1) return false

            /* 세입자 여부에 따라 달라지는 값 세팅 */
            let insGrmy     = '';    // 등록할 보증금
            let insMmr      = '';    // 등록할 월세
            let insCtrDt    = '';    // 등록할 계약일자
            let insDueDt    = '';    // 등록할 만기일자

            if(this.isCheckedRevn == 'checked') {   // 세입자 여(1)일 때
                insGrmy = Number(this.grmyRevn.toString().replace(/[,]/g, ''));
                insMmr = Number(this.mmrRevn.toString().replace(/[,]/g, ''));
                insCtrDt = this.ctrDtRevn.replace(/[-]/g, '');
                insDueDt = this.dueDtRevn.replace(/[-]/g, '');
            } else {    // 세입자 부(0)일 때
                insGrmy = Number(this.grmy.toString().replace(/[,]/g, ''));
                insMmr = Number(this.mmr.toString().replace(/[,]/g, ''));
                insCtrDt = this.ctrDt.replace(/[-]/g, '');
                insDueDt = this.dueDt.replace(/[-]/g, '');
            }

            // 계약일 만기일 관련 유효성 체크
            if(insCtrDt != '' && insCtrDt != null && insDueDt != '' && insDueDt != null) {
                if(Number(dateFormat(insCtrDt, 'YYYYMMDD')) > Number(dateFormat(insDueDt, 'YYYYMMDD'))) {
                    modalService.alert("만기일이 계약일보다 일찍 설정되었습니다.").then(() => {});
                    return false;
                }
            }

            // 매매일 만기일 관련 유효성 체크
            if(this.dlDt != '' && this.dlDt != null && insDueDt != '' && insDueDt != null) {
                if(Number(dateFormat(this.dlDt.replace(/[-]/g, ''), 'YYYYMMDD')) > Number(dateFormat(insDueDt, 'YYYYMMDD'))) {
                    modalService.alert("만기일이 매매일보다 일찍 설정되었습니다.").then(() => {});
                    return false;
                }
            }

            const config0 = {
                url : "/co/re/01sa1",
                data : {
                    mydtCusno       : this.getUserInfo("mydtCusno"),                                // 마이데이터고객번호
                    rlestHldSqno    : this.rlestHldSqno || null,                                    // 부동산보유일련번호(새로등록 : null, 수정 : 해당 부동산 일련번호)

                    rlestNm         : this.rlestNm,                                                 // 부동산명
                    rlestTngDsc     : this.rlestTngDsc,                                             // 부동산물건구분코드(1:아파트, 5:주택, 2:오피스텔, 6:토지, 7:상가, 9:기타)
                    mmoInpYn        : '1',                                                          // 수기입력여부(1: 직접입력, 0: 아파트입력)
                    rlestRsdFormDsc : this.rlestRsdFormDsc,                                         // 부동산거주형태구분코드(1:자가,2:전세,3:월세)
                    aptHscxIdvdc    : this.aptHscxIdvdc,                                            // 아파트단지개별코드
                    newPytpAreaCntn : this.newPytpAreaCntn,                                         // 신평형면적내용
                    rlestTrPr       : this.rlestTrPr != "" ? this.rlestTrPr.toString().replace(/[,]/g, '') : "",   // 부동산거래가격
                    grmy            : insGrmy != "" || insGrmy != 0 ? insGrmy : '',                 // 보증금
                    mmr             : insMmr != "" || insMmr != 0 ? insMmr : '',                    // 월세
                    ctrDt           : insCtrDt != "" ? insCtrDt.replace(/[-]/g, '') : '',           // 계약일자
                    dlDt            : this.dlDt.replace(/[-]/g, '') || '',                          // 매매일자
                    commQtart       : this.commQtart || 0,                                          // 공동지분율
                    dueDt           : insDueDt != '' ? insDueDt.replace(/[-]/g, '') : '',           // 만기일자
                    revnMnEn        : this.isCheckedRevn == 'checked' ? '1' : '0',                  // 세입자여부(1:여, 0:부)
                    provC           : this.provC || '',                                             // 시도코드
                    ccwC            : this.ccwC || '',                                              // 시군구코드
                    ttvC            : this.ttvC || '',                                              // 읍면동코드
                    dtlAdr          : '',                                                           // 상세주소(입력은 하지않고 테이블 컬럼만 존재)
                    rlestCnctAcList : this.rlestInstArr.filter(d => d.checked==true),               // 연결계좌목록
                }
            }

            apiService.call(config0).then(response => {
                const rspC = response.rspC
                
                if(rspC === "0000") {
                    if(!this.isUpt) {
                        const config1 = {
                            component: COCO2201,
                            params : {
                                titlTxt     : "부동산",
                                subTxt      : "부동산",
                                popId       : this.popId,
                                assetId     : 'Rlest',      // 자산 ID (Rlest : 부동산)
                                stsDsc      : "I"           // 등록, 수정 구분 (등록 : I, 수정 : U)
                            }
                            /* component: COCO0009,
                            params : {
                                titlTxt     : "부동산",
                                subTxt      : "부동산",
                                isAdd       : true,
                                isRlAsset   : true,
                                popId       : this.popId,
                            } */
                        }
                        modalService.openPopup(config1).then((response) => {
                            //바이패스
                            console.log("CORE2201 close popup", response)
                        })
                    } else {
                        this.closeAll({uptCom:true})
                    }
                } else if(rspC === "9998"){
                    modalService.alert('부동산의 최대 등록 건 수(5000건)를 초과하였습니다.')
                } else {
                    modalService.alert('저장 중 오류가 발생하였습니다.')
                }
            })
        },

        // 글자수 체크
        fn_checkWord(event, maxByte) {
            let rtnObj = checkWord(event.target.value, maxByte)

            if(rtnObj.flag) {this.$refs.rlestNm.blur()}   // 알럿 중복 방지

            event.target.value = rtnObj.value
            this.rlestNm = event.target.value
        },

        // 금액 한글명
        fn_hanValue(amount) {
            const koreanUnits = ['', '만', '억', '조']
            let han_amount = parseInt(String(amount).split(',').join('')) * 10000
            let answer = ''
            let unit = 10000
            let index = 0
            let division = Math.pow(unit, index)
            if(amount === "") return

            while(Math.floor(han_amount / division) > 0) {
                const mod = Math.floor(han_amount % (division * unit) / division)
                if(mod) {
                    const modToString = mod.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
                    answer = `${modToString}${koreanUnits[index]} ` + answer
                }
                division = Math.pow(unit, ++index)
            }
            return (answer + "원").replace(" 원","원")
        },

        // 부동산 유형 선택 팝업(부동산 건물구분코드)
        // 1: 아파트, 5: 주택, 2: 오피스텔, 6: 토지, 7: 상가, 9: 기타
        openRlestTngDscPop(e) {
            const listData = this.getCodeList("RLEST_TNG_DSC") // 부동산 물건구분코드(주택, 오피스텔, 토지, 상가, 기타)

            const config = {
                params : {
                    selectVal : this.rlestTngDsc,
                    list : listData
                },
                renderer : {
                    component : CORE1205
                }
            }
            modalService.openSlidePagePopup(config).then(response => {
                this.rlestTngDsc    = response.rlestTngDscVal
                this.rlestTngDscNm  = response.rlestTngDscNm

                // 부동산별칭, 주거형태 및 하위 항목 초기화
                this.rlestNmShow        = false;
                this.rlestNm            = "";
                this.rlestRsdFormDsc    = "";
                this.initRlestRsdFormDsc();

                // 다음 항목 이동
                this.$nextTick(()=>{
                    if(e !== null && !this.isApt) {
                        if(this.rlestTngDsc === "4") {
                            this.$refs.grdNm.focus()
                        } else {
                            this.$refs.rlestNm.focus()
                        }
                    }
                })
            })
        },

        // 금액 버튼 이벤트
        btnPriceEvt(addPrice, refNm) {
            let tmpInputValue = this.$refs[refNm].value;
            let tmpFncObtAm = Number(tmpInputValue.replace(/[,.-]/g, ''));

            tmpFncObtAm += addPrice;

            // 최대금액 999,999,999 이상인 경우 최대값 고정
            if(tmpFncObtAm >= 999999999) {
                tmpFncObtAm = 999999999;
            }

            this.$refs[refNm].value = String(tmpFncObtAm);
            this.addComma(refNm, '');
        },

        // visible 세팅, 초기에만 hide 그 이후는 값을 지워도 hide로 전환하지 않기 위함
        setVisible(objNm) {
            switch(objNm) {
                case 'rlestNm' :
                    this.rlestNmShow = true;
                    break;
            }
        },

        // 달력
        fn_popupCalendar(evt, objNm) {
            let tmpDt = ""
            let minDate = ''
            let maxDate = ''

            if(this.$refs[objNm] !== undefined && this.$refs[objNm].value !== null && this.$refs[objNm].value !== '') {
                tmpDt = dateFormat(this.$refs[objNm].value, 'YYYY-MM-DD')
            } else {
                tmpDt = dateFormat(new Date(), 'YYYY-MM-DD')
            }
            minDate = ''
            maxDate = ''
            //maxDate = dateFormat(monthAdd(12), 'YYYY-MM-DD')
            
            let config = {
                pDate   : tmpDt,
                minDate : minDate,
                maxDate : maxDate
            }

            modalService.calendarPopup(config).then(response => {
                if(response !== undefined && response !== null && response !== '')
                {
                    evt.target.value = dateFormat(response, "YYYY-MM-DD")
                    this.$refs[objNm].value = evt.target.value

                    if(objNm == 'dlDt')
                        this.dlDt = evt.target.value
                    else if(objNm == 'ctrDt')
                        this.ctrDt = evt.target.value
                    else if(objNm == 'dueDt')
                        this.dueDt = evt.target.value
                    else if(objNm == 'ctrDtRevn')
                        this.ctrDtRevn = evt.target.value
                    else if(objNm == 'dueDtRevn')
                        this.dueDtRevn = evt.target.value
                }
            })
        },

        // 주거형태(자가/전세/월세) 수정 시, 관련 값 초기화
        initRlestRsdFormDsc() {
            // 자가일 때
            this.rlestTrPr = ''; // 매매가격
            this.dlDt = ''; // 매매일자

            // 전/월세일 때
            this.grmy = ''; // 보증금 & 세입자 보증금
            this.mmr = ''; // 월세 & 세입자 월세
            this.ctrDt = ''; // 계약일자 & 세입자 계약일자
            this.dueDt = '';// 만기일자 & 세입자 만기일자

            // on/off 버튼 하위 값 초기화
            this.onoffChg('init');
        },

        // on/off 버튼 변경 시 하위 값 초기화
        onoffChg(dsc) {
            /* 공통투자 지분 */
            if(dsc == '1') {
                if(this.isCheckedInv == 'checked') {
                    this.isCheckedInv = "";
                    this.isShowInv = false;     // 현재 체크된 상태이면, 하위항목 hide
                } else {
                    this.isCheckedInv = "checked";
                    this.isShowInv = true;      // 현재 체크해제된 상태이면, 하위항목 show
                }
                
                this.commQtart == ''; // 지분율
            }

            /* 세입자 */
            else if(dsc == '2') {
                if(this.isCheckedRevn == 'checked') {
                    this.isCheckedRevn = "";
                    this.isShowRevn = false;    // 현재 체크된 상태이면, 하위항목 hide
                } else {
                    this.isCheckedRevn = "checked";
                    this.isShowRevn = true;     // 현재 체크해제된 상태이면, 하위항목 show
                }

                this.revnMnEn   = ''; // 세입자여부
                this.ctrDtRevn  = ''; // 계약일
                this.dueDtRevn  = ''; // 만기일
                this.grmyRevn   = ''; // 세입자 보증금(전월세 시 보증금과 동일)
                this.mmrRevn    = ''; // 세입자 월세(전월세 시 월세와 동일)
            }
            
            /* 대출 */
            else if(dsc == '3') {
                if(this.isCheckedLoan == 'checked') {
                    this.isCheckedLoan = "";
                    this.isShowLoan = false;    // 현재 체크된 상태이면, 하위항목 hide
                } else {
                    this.isCheckedLoan = "checked";
                    this.isShowLoan = true;     // 현재 체크해제된 상태이면, 하위항목 show
                }

                this.rlestInstArr = []; // 대출목록
            }

            /* 초기화 */
            else {
                this.isCheckedInv = "";  // 공동투자 지분
                this.isCheckedRevn = ""; // 세입자
                this.isCheckedLoan = ""; // 대출

                this.isShowInv = false;  // 공동투자
                this.isShowRevn = false; // 세입자
                this.isShowLoan = false; // 대출

                this.commQtart == ''; // 지분율

                this.revnMnEn   = ''; // 세입자여부
                this.ctrDtRevn  = ''; // 계약일
                this.dueDtRevn  = ''; // 만기일
                this.grmyRevn   = ''; // 세입자 보증금(전월세 시 보증금과 동일)
                this.mmrRevn    = ''; // 세입자 월세(전월세 시 월세와 동일)

                this.rlestInstArr = []; // 대출목록
            }
        },
        // 지분율 자리 제한
        commQtartEvt(e) {
            this.addComma('commQtart', e);

            let tmpCommQtart = Number(this.$refs['commQtart'].value);

            if(tmpCommQtart > 100) {
                tmpCommQtart = 100;
            }
            
            this.$refs['commQtart'].value = tmpCommQtart == 0 ? '' : String(tmpCommQtart);
            this.commQtart = this.$refs['commQtart'].value;
        },
        // 지역 선택 팝업(시도/시군구/읍면동 선택)
        openAreaPop() {
            const config = {
                component : CORE2210
            }
            modalService.openPopup(config).then(response => {
                if(response.provC != '' && response.ccwC != '' && response.ttvC != '')
                    this.areaNm = (response.provnm || '') + ' > ' + (response.ccwnm || '') + ' > ' + (response.ttvnm || '');    // 시도/시군구/읍면동 한글명

                this.provC = response.provC || '';          // 시도코드
                this.ccwC = response.ccwC || '';            // 시군구코드
                this.ttvC = response.ttvC || '';            // 읍면동코드
            })
        },
        // 날짜 구분자 추가
        getDateFormat(value, format, dscTxt='') {
            if(value == '' || value == null)
                return '';

            const year = value.substring(0, 4);
            const month = value.substring(4, 6);
            const day = value.substring(6);
            let result = year + format + month + format + day;

            // 장차법 관련 aria-label 텍스트 리턴
            if(dscTxt != '') {
                result = dscTxt + ' ' + year + '년 ' + month + '월 ' + day + '일,'
            }
            
            return result;
        },
        // 공통코드 명칭 변환
        getComCodeNm(code, codeValue) {
            const codeList = this.getCodeList(code);
            let codeObj = '';

            if(codeList.length > 0) {
                codeObj = codeList.find((codeTmp) => codeTmp.comnCVal == codeValue);

                if(codeObj == 'undefined' || codeObj == null) {
                    return codeObj;
                }
            } else {
                return codeObj;
            }
            //console.log("codeList = ", codeList);
            //console.log("codeObj = ", codeObj);

            return codeObj.comnCExpl;
        }
    },
    components : {
    }
}
</script>