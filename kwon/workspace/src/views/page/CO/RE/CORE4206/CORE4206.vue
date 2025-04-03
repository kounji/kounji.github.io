<!--
/*************************************************************************
* @ 서비스경로 : 자산등록 > 부동산
* @ 페이지설명 : 자산등록 > 부동산 > 부동산 구입가격 입력
* @ 파일명     : src/views/page/CO/RE/CORE4206/CORE4206.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-01-13
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-01-13              CS541013              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>부동산</h1>
            <a href="javascript:void(0);" class="btn_back" @click.prevent="close()"><span class="blind">이전화면</span></a>
		</div>
		
		<div class="popup_content ">
			<div class="com_inner com_line_type01 com_top_type02">
				<strong class="com_pop_tit01">{{aptNm}}</strong>
				<p class="detail_size">
					<span>면적</span>
					<em>{{newPytpAreaCntn}}㎡</em>
				</p>
				
				<!-- 자가인 경우만 시세 표시 -->
				<template v-if="rlestRsdFormDsc == '1'">
					<p class="com_txt_sub01">
						<strong class="bold_txt">
							<span class="normal_txt">매매 시세 </span>
							<em v-html="fn_hanValue_classDiff(genDlAm)"></em>
						</strong>
						<span class="txt_gray">
							한국부동산원
						</span>
					</p>
					<p class="com_txtinfo_type01 color_ty" v-if="uitiTrPr > 0">최근 실거래가는 <em v-html="fn_hanValue_classDiff(uitiTrPr)"></em> 입니다. <template v-if="Number(uitiLyno) != null && Number(uitiLyno) != undefined">({{uitiLyno}}층)</template></p>
				</template>
			</div>
			<div class="com_inner">
				
<!-- v4.0 추가 start -->
				<!-- 아파트 등록시 부동산 별칭란 추가 -->
				<template>
					<div class="com_input_type01 necessary">
                        <input type="text" id="com_input01" :value="rlestNm" ref="rlestNm" required placeholder="부동산 별칭을 입력하세요" title="부동산 별칭 입력" @keyup="fn_checkWord($event, 30), setVisible('rlestNm')" @keyup.enter="moveNextTag($event)">
                        <label for="com_input01">
                            <em><span class="blind">필수입력</span></em>
                            <span class="txt_label_x">부동산 별칭</span>
                        </label>
                        
                    </div>
				</template>
<!-- v4.0 추가 end-->

				<!-- 자가 -->
				<template v-if="rlestRsdFormDsc == '1'">
					<div class="com_input_type01 com_word2 necessary">
						<input type="tel" id="com_input01" v-model="rlestTrPr" ref="rlestTrPr" required placeholder="매매가격 입력" title="매매가격을 입력하세요" @keyup="addComma('rlestTrPr', $event)" maxlength="11">						
						<label for="com_input01">
							<em><span class="blind">필수입력</span></em>
							<span class="txt_label_x">매매가격</span>
						</label>
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
							<span class="com_inputtxtright2"  >만원</span>
						</div>
						<p class="com_sum" aria-hidden="true">{{fn_hanValue(rlestTrPr)}}</p>
						<div class="btn_price_group">
							<button type="button" class="btn_price" @click.prevent="btnPriceEvt(10, 'rlestTrPr')">+<strong>10</strong>만</button>
							<button type="button" class="btn_price" @click.prevent="btnPriceEvt(100, 'rlestTrPr')">+<strong>100</strong>만</button>
							<button type="button" class="btn_price" @click.prevent="btnPriceEvt(1000, 'rlestTrPr')">+<strong>1000</strong>만</button>
							<button type="button" class="btn_price" @click.prevent="btnPriceEvt(10000, 'rlestTrPr')">+<strong>1</strong>억</button>
						</div>
					</div>
					<div class="com_input_type01 com_word2 necessary" role="button" @click.prevent="fn_popupCalendar($event, 'dlDt')" :aria-label="'필수입력,' + getDateFormat(dlDt, '', '매매일') + '매매일 선택'">
						<input type="text" id="com_input02" class="input_cal_date com_txtright_type01 tar" name="" v-model="dlDt" ref="dlDt" readonly required placeholder="매매일 선택" title="매매일을 선택하세요." aria-hidden="true">
						<label for="com_input02">
							<em><span class="blind">필수입력</span></em>
							<span class="txt_label_x">매매일</span>
						</label>
					</div>
				</template>

				<!-- 전월세 -->
				<template v-else-if="rlestRsdFormDsc == '2' || rlestRsdFormDsc == '3'">
					<div class="com_input_type01 com_word2 necessary">
						<input type="tel" id="com_input03" v-model="grmy" ref="grmy" required placeholder="보증금 입력"  title="보증금을 입력하세요" @keyup="addComma('grmy', $event)" maxlength="11">						
						<label for="com_input03">
							<!-- 전세일 경우만 필수입력 체크 -->
							<template v-if="rlestRsdFormDsc == '2'">
								<em><span class="blind">필수입력</span></em>
							</template>
							<span class="txt_label_x">보증금</span>
						</label>
						<div class="del_txt">
							<!-- <a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a> -->
							<span class="com_inputtxtright2" >만원</span>
						</div>
						<p class="com_sum" aria-hidden="true">{{fn_hanValue(grmy)}}</p>
						<div class="btn_price_group">
							<button type="button" class="btn_price" @click.prevent="btnPriceEvt(10, 'grmy')">+<strong>10</strong>만</button>
							<button type="button" class="btn_price" @click.prevent="btnPriceEvt(100, 'grmy')">+<strong>100</strong>만</button>
							<button type="button" class="btn_price" @click.prevent="btnPriceEvt(1000, 'grmy')">+<strong>1000</strong>만</button>
							<button type="button" class="btn_price" @click.prevent="btnPriceEvt(10000, 'grmy')">+<strong>1</strong>억</button>
						</div>
					</div>

					<!-- 월세 -->
					<div class="com_input_type01 com_word2 necessary" v-if="rlestRsdFormDsc == '3'">
						<input type="tel" id="com_input04" v-model="mmr" ref="mmr" required placeholder="월세 입력" title="월세를 입력하세요" @keyup="addComma('mmr', $event)" maxlength="11">												
						<label for="com_input04">
							<em><span class="blind">필수입력</span></em>
							<span class="txt_label_x">월세</span>
						</label>
						<div class="del_txt">
							<!-- <a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a> -->
							<span class="com_inputtxtright2" >만원</span>
						</div>
						<p class="com_sum" aria-hidden="true">{{fn_hanValue(mmr)}}</p>
						<div class="btn_price_group">
							<button type="button" class="btn_price" @click.prevent="btnPriceEvt(1, 'mmr')">+<strong>1</strong>만</button>
							<button type="button" class="btn_price" @click.prevent="btnPriceEvt(10, 'mmr')">+<strong>10</strong>만</button>
							<button type="button" class="btn_price" @click.prevent="btnPriceEvt(50, 'mmr')">+<strong>50</strong>만</button>
							<button type="button" class="btn_price" @click.prevent="btnPriceEvt(100, 'mmr')">+<strong>100</strong>만</button>
						</div>
					</div>
					<!-- //월세 -->

					<div class="com_input_type01 com_word2 necessary" role="button" @click.prevent="fn_popupCalendar($event, 'ctrDt')" :aria-label="'필수입력,' + getDateFormat(ctrDt, '', '계약일') + '계약일 선택'">
						<input type="text" id="com_input05" class="input_cal_date com_txtright_type01 tar" name="" v-model="ctrDt" ref="ctrDt" readonly required placeholder="계약일자 선택" title="계약일자를 선택하세요." aria-hidden="true">
						<label for="com_input05">
							<em><span class="blind">필수입력</span></em>
							<span class="txt_label_x">계약일</span>
						</label>
					</div>

					<div class="com_input_type01 com_word2 mb0 necessary" role="button" @click.prevent="fn_popupCalendar($event, 'dueDt')" :aria-label="'필수입력,' + getDateFormat(dueDt, '', '만기일') + '만기일 선택'">
						<input type="text" id="com_input06" class="input_cal_date com_txtright_type01 tar" name="" v-model="dueDt" ref="dueDt" readonly required placeholder="만기일자 선택" title="만기일자를 선택하세요." aria-hidden="true">
						<label for="com_input06">
							<em><span class="blind">필수입력</span></em>
							<span class="txt_label_x">만기일</span>
						</label>
					</div>
				</template>

				<!-- on/off 버튼 -->
				<div class="switch_list_wrap">
					<!-- 자가인 경우 show -->
					<template v-if="rlestRsdFormDsc == '1'">
						<div class="custom_list com_box_type01">
							<div class="new_tit_area">
								<div class="tit"><span class="normal_font">공동투자 지분이 있어요</span></div>
								<span class="cmm-switch custom-switch fr" @change.prevent="onoffChg('1')">
									<input type="checkbox" id="check01" :checked="isCheckedInv" role="switch">
									<label for="check01"><em class="blind">공동투자 지분이 있어요 체크</em></label>
								</span>
							</div>
							<div class="switch_sub_box" v-if="isShowInv">
								<div class="com_input_type01 com_word1">
									<input type="tel" id="revn_input01" class="tar" v-model="commQtart" ref="commQtart" required placeholder="소유 지분율을 입력하세요" aria-hidden="true" title="지분율을 입력" maxlength="3" @keyup="commQtartEvt($event)">
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

						<div class="custom_list com_box_type01">
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
									<input type="tel" id="revn_input04" v-model="grmyRevn" ref="grmyRevn" required placeholder="보증금을 입력하세요 " aria-hidden="true" title="보증금을 입력" @keyup="addComma('grmyRevn', $event)" maxlength="11">
									<label for="revn_input04">
										<!-- <em><span class="blind">필수입력</span></em> -->
										<span class="txt_label_x">세입자 보증금</span>
									</label>
									<div class="del_txt">
										<a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
										<span class="com_inputtxtright2" aria-hidden="true">만원</span>
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
									<label for="revn_input05">
										<!-- <em><span class="blind">필수입력</span></em> -->
										<span class="txt_label_x">세입자 월세</span>
									</label>
									<input type="tel" id="revn_input05" v-model="mmrRevn" ref="mmrRevn" required placeholder="월세인 경우 월세 금액을 입력해 주세요" title="월세를 입력" @keyup="addComma('mmrRevn', $event)" maxlength="11">
									<div class="del_txt">
										<a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
										<span class="com_inputtxtright2" >만원</span>
									</div>
									<p class="com_sum" aria-hidden="true">{{fn_hanValue(mmrRevn)}}</p>
									<div class="btn_price_group">
										<button type="button" class="btn_price" @click.prevent="btnPriceEvt(1, 'mmrRevn')">+<strong>1</strong>만</button>
										<button type="button" class="btn_price" @click.prevent="btnPriceEvt(10, 'mmrRevn')">+<strong>10</strong>만</button>
										<button type="button" class="btn_price" @click.prevent="btnPriceEvt(50, 'mmrRevn')">+<strong>50</strong>만</button>
										<button type="button" class="btn_price" @click.prevent="btnPriceEvt(100, 'mmrRevn')">+<strong>100</strong>만</button>
									</div>
								</div>
							</div>
						</div>
					</template>
					
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
			</div>

		</div>
		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" role="button" class="btn btn_mint" :class="btnOnOff" :aria-disabled="btnOnOff == 'btn_off' ? true : false" @click.prevent="resistRlest($event)">{{isUpt?"수정":"등록"}}</a>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="closePage"><span class="blind">팝업닫기</span></a>

	</div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import {keyupNumFormat, numberFormat} from '@/utils/number'
import {dateFormat} from '@/utils/date' // monthAdd
import _ from 'lodash'

import COCO2201 from '@/views/page/CO/CO/COCO2201/COCO2201' 	// 자산 등록완료 화면
//import COCO1109 from '@/views/page/CO/CO/COCO1109/COCO1109' // 자산 등록완료 화면(AS-IS)
import COCO1124 from '@/views/page/CO/CO/COCO1124/COCO1124' 	// 계좌 목록 조회 슬라이드 팝업
import COCO1002 from '@/views/page/CO/CO/COCO1002/COCO1002' 	// 계좌 없을 때의 슬라이드 팝업
import COET1002 from '@/views/page/CO/ET/COET1002/COET1002'     // 부동산 이벤트 슬라이드
import COET1003 from '@/views/page/CO/ET/COET1003/COET1003'     // 부동산 이벤트 응모팝업

export default {
    name : "CORE2206",
    data : () => {
        return {
			/*--- 부모창 전달 파라미터 start ---*/
			popId           : '',           // 팝업ID(추가등록용)
			isUpt           : '',           // 등록/수정 flag
			isInterest      : false, 		// 관심부동산에서 자산등록하는지 여부

			rlestRsdFormDsc : '',     		// 주거형태구분코드
			aptHscxIdvdc    : '',        	// 아파트단지개별코드
			aptNm           : '',           // 아파트명
			newPytpAreaCntn : '',     		// 면적(신평형면적내용)

			rlestNm			: '',			// 부동산명

			// 수정 시에만 존재하는 값
			rlestHldSqno    : '',        	// 부동산보유일련번호
			rlestTrPr       : '',           // 매매가격
			rlestCnctAcList : [],     		// 부동산 대출 상품 선택 리스트(원본)

			dlDt            : '',           // 매매일자
			commQtart       : '',           // 공동지분율
			revnMnEn        : '',           // 세입자여부
			genDlAm         : '',           // 일반매매금액(시세)
			
			grmy            : '',           // 보증금
			mmr             : '',           // 월세
			ctrDt           : '',           // 계약일자
			dueDt           : '',           // 만기일자
			grmyRevn        : '',           // 세입자 보증금
			mmrRevn         : '',           // 세입자 월세
			ctrDtRevn       : '',           // 세입자 계약일자
			dueDtRevn       : '',           // 세입자 만기일자
			/*--- 부모창 전달 파라미터 end ---*/

			rlestInstArr    : [], // 대출상품 리스트
			msgFlag         : 0,  
			btnMsg          : "부동산대출 선택하기",
			
			// on/off 버튼 체크여부
            isCheckedInv    : '', 			// 공동투자
            isCheckedRevn   : '', 			// 세입자
            isCheckedLoan   : '', 			// 대출

            // on/off 버튼 하위 항목 show 여부
            isShowInv       : false, 		// 공동투자
            isShowRevn      : false, 		// 세입자
			isShowLoan      : false, 		// 대출
			
			uitiList 		: [], 			// 위티 아파트 실거래 목록
			uitiTrPr 		: 0,			// 위티 실거래가
			uitiLyno		: ''			// 위티 층수
        }
    },
    computed: {
		// 버튼 활성/비활성 이벤트
		btnOnOff() {
			if(this.rlestRsdFormDsc == '1') { 			// 자가
				// 매매가격, 매매일자
				if(this.rlestTrPr <= 0 || this.dlDt == '')
					return "btn_off";
			} else if(this.rlestRsdFormDsc == '2') {	// 전세
				// 보증금, 계약일자, 만기일자
				if(this.grmy <= 0 || this.ctrDt == '' || this.dueDt == '')
					return "btn_off";
			} else if(this.rlestRsdFormDsc == '3') {	// 월세
				// 보증금 제외, 월세, 계약일자, 만기일자
				if(this.mmr <= 0 || this.ctrDt == '' || this.dueDt == '')
					return "btn_off";
			} else {
				// 주거형태 등 선택 안된 경우
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
    mixins: [
        popupMixin,
        commonMixin
	],
	mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods : {
		// 화면 요소 초기화
        initComponent(param = {}) {
			this.popId           = param.popId || '';             	// 팝업ID(추가등록용)
			this.isUpt           = param.isUpt || '';             	// 등록/수정 flag
			this.isInterest      = param.isInterest || false; 		// 관심부동산에서 자산등록하는지 여부

			// on/off 버튼 활성/비활성 - 공동지분율
			if(param.commQtart > 0) {
				this.isCheckedInv = 'checked';
				this.isShowInv = true;
			} else {
				this.isCheckedInv = '';
				this.isShowInv = false;
			}

			// on/off 버튼 활성/비활성 - 세입자
			if(param.revnMnEn == '1') {
				this.isCheckedRevn = 'checked';
				this.isShowRevn = true;
			} else {
				this.isCheckedRevn = '';
				this.isShowRevn = false;
			}

			this.rlestRsdFormDsc = param.rlestRsdFormDsc || '';   									// 주거형태구분코드
			this.aptHscxIdvdc    = param.aptHscxIdvdc || '';      									// 아파트단지개별코드
			this.aptNm           = param.aptNm || '';             									// 아파트명
			this.newPytpAreaCntn = param.newPytpAreaCntn || '';   									// 면적(신평형면적내용)
			this.aptHfisArea	 = param.aptHfisArea || "";											// 아파트 분양면적

			this.rlestHldSqno    = param.rlestHldSqno || '';      									// 부동산보유일련번호
			this.rlestTrPr       = param.rlestTrPr != 0 ? numberFormat(param.rlestTrPr) : '';       // 매매가격
			this.rlestCnctAcList = param.rlestCnctAcList || [];   									// 부동산 대출 상품 선택 리스트

			this.dlDt            = param.dlDt || '';              									// 매매일자
			this.commQtart       = param.commQtart || '';         									// 공동지분율
			this.revnMnEn        = param.revnMnEn || '';          									// 세입자여부
			//this.genDlAm         = param.genDlAm || '';            								// 일반매매금액(시세)

			// 세입자여부에 따라 값 달라짐
			this.grmy            = param.grmy != 0 ? numberFormat(param.grmy) : '';         		// 보증금
			this.mmr             = param.mmr != 0 ? numberFormat(param.mmr) : '';           		// 월세
			this.ctrDt           = param.ctrDt || '';       										// 계약일자
			this.dueDt           = param.dueDt || '';       										// 만기일자
			this.grmyRevn        = param.grmyRevn != 0 ? numberFormat(param.grmyRevn) : '',       	// 세입자 보증금
			this.mmrRevn         = param.mmrRevn != 0 ? numberFormat(param.mmrRevn) : '',        	// 세입자 월세
			this.ctrDtRevn       = param.ctrDtRevn || '',      										// 세입자 계약일자
			this.dueDtRevn       = param.dueDtRevn || '',       									// 세입자 만기일자
			this.rlestNm		 = param.rlestNm || ''   											// v4.0 별칭 추가
			
			// 등록일 경우 시세 정보 안넘어와서 조회
			if(this.rlestRsdFormDsc === '1') {  // 자가일 경우에만 시세 조회
				const config = {
					url : "/co/re/05r01",
					data : {
						aptHscxIdvdc    : this.aptHscxIdvdc,
						newPytpAreaCntn : this.newPytpAreaCntn,
					}
				}
				apiService.call(config).then(response => {
					this.genDlAm = response.genDlAm || ""

					this.getUitiList(this.aptHscxIdvdc, this.aptHfisArea, this.newPytpAreaCntn);		// 위티 아파트 실거래 목록 조회
				})
			}

			// 일자 하이픈 처리
			if(this.dlDt != '')         this.dlDt = this.getDateFormat(this.dlDt, '-');
			if(this.ctrDt != '')        this.ctrDt = this.getDateFormat(this.ctrDt, '-');
			if(this.dueDt != '')        this.dueDt = this.getDateFormat(this.dueDt, '-');
			if(this.ctrDtRevn != '')    this.ctrDtRevn = this.getDateFormat(this.ctrDtRevn, '-');
			if(this.dueDtRevn != '')    this.dueDtRevn = this.getDateFormat(this.dueDtRevn, '-');

			// on/off 버튼 활성/비활성 - 대출
			if(this.rlestCnctAcList.length > 0) {
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
		},

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
                    rlestTngDsc     : '1',                                             				// 부동산물건구분코드(1:아파트, 5:주택, 2:오피스텔, 6:토지, 7:상가, 9:기타)
                    mmoInpYn        : '0',                                                          // 수기입력여부(1: 직접입력, 0: 아파트입력)
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
                    provC           : '',                                             				// 시도코드(아파트 입력 시 사용X)
                    ccwC            : '',                                              				// 시군구코드(아파트 입력 시 사용X)
                    ttvC            : '',                                              				// 읍면동코드(아파트 입력 시 사용X)
                    dtlAdr          : '',                                                           // 상세주소(입력은 하지않고 테이블 컬럼만 존재)
                    rlestCnctAcList : this.rlestInstArr.filter(d => d.checked==true),               // 연결계좌목록
                }
            }

            apiService.call(config0).then(response => {
                const rspC = response.rspC
                
                if(rspC === "0000") {
                    if(!this.isUpt) {
						// 관심부동산일 경우 삭제 여부 물어본 후 삭제/미삭제 후 이벤트 관련 로직 동작
						if(this.isInterest == true) {
							const config = {
								content: ['관심부동산을 삭제하시겠습니까?'],
								title  : "",
							}
							modalService.confirm(config).then(text => {
								if(text == "예") {
									const config_d = {
										url  : '/an/re/02da1',
										data : {
											mydtCusno           : this.getUserInfo('mydtCusno'),        // 고객번호
											aptHscxIdvdc        : this.aptHscxIdvdc,    				// 아파트단지개별코드
											newPytpAreaCntn     : this.newPytpAreaCntn  				// 신평형면적내용
										}
									};

									apiService.call(config_d).then(response => {
										if (response.rspC == '0000') {
											modalService.alert("관심부동산이 삭제되었습니다.").then(() => {
												this.inteCurrIdx      = 0;

												this.$nextTick(()=>{
													this.openEvtPopInsEndPop();		// 이벤트 팝업 및 자산등록 완료 팝업 오픈
												})
											});
										} else {
											modalService.alert("삭제 중 오류가 발생하였습니다.").then(() => {});
										}
									});
								} else {
									this.openEvtPopInsEndPop();		// 이벤트 팝업 및 자산등록 완료 팝업 오픈
								}
							})
						} else {
							this.openEvtPopInsEndPop();		// 이벤트 팝업 및 자산등록 완료 팝업 오픈
						}						
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

		// 이벤트 화면 오픈 및 자산등록 완료 화면 연결
		openEvtPopInsEndPop() {
			/* 고객 이벤트 응모 여부 확인 후 슬라이드 팝업 오픈 */
			/* const config_evt = {
				url : "/co/et/01ra1",
				data : {
					mydtCusno : this.getUserInfo("mydtCusno")
				}
			}
			apiService.call(config_evt).then(response => {
				let isJoin = response.isJoin === "true" ? true : false */
				let isJoin = false

				if(isJoin) {
					const config_evtSlide = {
						params : {},
						renderer : {
							component : COET1002
						}
					}
					modalService.openSlidePagePopup(config_evtSlide).then(response => {
						if(response === "evtYes") {
							const config_evtPop = {
								params : {},
								component : COET1003
							}
							modalService.openPopup(config_evtPop).then(response => {
								//바이패스 (응모 도중 팝업 닫을 시 완료팝업에서 팝업닫기 기능과 같은 역할)
								console.log("CORE2201 close popup", response)
							})
						} else {
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
						}
					})
				} else {
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
				}
			//})
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
                        rlestHldSqno    : this.rlestHldSqno,                             // 은행계좌구분코드(10 : 수신상품, 20 : 투자상품, 32: 담보대출(부동산) , 35: 할부금융(자동차))
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
		
        // 화면 우상단 x버튼 클릭(모든 팝업창 close)
        closePage() {
            const config = {
                content: ['입력중인 정보는 저장되지 않습니다<br>정말로 취소하시겠습니까?'],
                title  : "",
            }
            modalService.confirm(config).then(text => {
                if(text == "예") {
                    if(!this.isUpt) this.closeAllData(true);
                    else this.closeAll();
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

		// 금액 한글명, 한글/숫자 class 다르게 적용(시세)
		fn_hanValue_classDiff(value) {
			//if(this.genDlAm == undefined || this.genDlAm == '')		return;

			const unit = ['', '만', '억', '조', '경']
            const splitAmt = 10000
            const splitCnt = unit.length

            let resultArray = []
            let resultString = ""

            for(let i=0; i<splitCnt; i++) {
                let rst = ((value*10000) % Math.pow(splitAmt, i+1)) / Math.pow(splitAmt, i)
                rst = Math.floor(rst)

                if(rst > 0) {
                    resultArray[i] = rst
                }
            }

            let strIdx = 0  // 최초시작지점에 '원' 추가하기위함

            for(let j=0; j<resultArray.length; j++) {
                if(!resultArray[j]) {
                    strIdx++
                    continue
                }

                if(j === strIdx) {
                    resultString = ' <span class="com_point_darkblue">'+String(numberFormat(resultArray[j])) + '</span>' + unit[j] + '원' + resultString
                } else {
                    resultString = ' <span class="com_point_darkblue">'+String(numberFormat(resultArray[j])) +'</span>'+ unit[j] + ' ' + resultString
                }
			}

            return resultString
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
		
		// 위티 아파트 실거래 목록 조회
		getUitiList(uitiAptId='', xuseAreaVal='', newPytpAreaCntn='') {
			const config = {
				url : "/an/re/03ra1",
				data : {
					mydtCusno    	: this.getUserInfo("mydtCusno"),
					uitiAptId 		: uitiAptId,
					newPytpAreaCntn : newPytpAreaCntn,
					xuseAreaVal 	: xuseAreaVal
				}
			}
			apiService.call(config).then(response => {
				this.uitiList = response.uitiList || [];
				let tmpUitiObj = [];
				
				if(this.uitiList != [] && this.uitiList != undefined) {
					if(this.uitiList.length > 0) {
						if(this.rlestRsdFormDsc == '1') { 				// 자가일때
							tmpUitiObj = this.uitiList.find((tmp) => tmp.trTpnm == 'deal');

							if(tmpUitiObj != undefined && tmpUitiObj != '') {
								//if(tmpUitiObj.length > 0) {
									this.uitiTrPr = tmpUitiObj.dlPr;
									this.uitiLyno = tmpUitiObj.lyno;
								//}
							}
						} else {										// 전월세일때
							tmpUitiObj = this.uitiList.find((tmp) => tmp.trTpnm == 'lease' || tmp.trTpnm == 'rent');

							if(tmpUitiObj != undefined && tmpUitiObj != '') {
								//if(tmpUitiObj.length > 0) {
									this.uitiTrPr = tmpUitiObj.grmy;
									this.uitiLyno = tmpUitiObj.lyno;
								//}
							}
						}
					}
				}
			})
		}
    },
    components:{
    }
}
</script>