<!--
/*************************************************************************
* @ 서비스경로 : 금융생활 > NH콕마이카
* @ 페이지설명 : 금융생활 > NH콕마이카 > 차계부 상세내역
* @ 파일명     : src\views\page\AN\CA\ANCA2211\ANCA2211.vue
* @ 작성자     : CS528043
* @ 작성일     : 2022-08-01
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-01              CS528043              최초작성(PDCA1114 고도화 변경)
*************************************************************************/
-->

<template>
	<!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01">
        <!-- header -->
        <div class="popup_header">
			<h1>
				<template v-if="modifyYn == 'N'">
					차계부 지출추가
				</template>
				<template v-else>
					차계부 상세내역
				</template>
            </h1>
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner com_line_type01 com_top_type02">
				<div class="com_box_type01 custom_box_type01">
					<div>
						<div class="com_pop_tit01">{{carBrannm.concat(' ', carCrtpnm)}}<br/>{{carGrdnm}}</div>
						<span class="label_bor">
							<span>{{vhcnoVal}}</span>
						</span>
					</div>
					<a href="javascript:void(0);" v-show="hldVhcList.length > 1" class="com_btnwrite float" @click.prevent="fn_openCarList(vhcnoVal)" ref="vhcnoVal">
						<span class="blind">수정</span>
					</a>
				</div>

				<!-- 지출내역과 연동하였을 경우 -->
				<div class="new_top_box custom_card" v-if="xpsBrkInfo !== undefined && xpsBrkInfo !== null && xpsBrkInfo !== ''">
					<div class="box_head">
						<div class="info">
							<div class="title">
								<strong>{{xpsBrkInfo.dataSrcDsc != '05' ? xpsBrkInfo.cdcoCdWrsnm : xpsBrkInfo.prcMchtnm}}</strong>
								<span class="num">
									<template v-if="xpsBrkInfo.dataSrcDsc == '01'">
										{{fn_maskingformat(xpsBrkInfo.mydtAcno, "account")}}
									</template>
									<template v-else-if="xpsBrkInfo.dataSrcDsc == '02' || xpsBrkInfo.dataSrcDsc == '03'">
										{{fn_maskingformat(xpsBrkInfo.cdcoCdNo, "card")}}
									</template>
									<template v-else-if="xpsBrkInfo.dataSrcDsc == '04'">
										{{fn_maskingformat(xpsBrkInfo.faceNo, "account")}}
									</template>
									<template v-else-if="xpsBrkInfo.dataSrcDsc == '05'">
										{{xpsBrkInfo.mydtAcno != null ? fn_maskingformat(xpsBrkInfo.mydtAcno, "account") : ''}}
									</template>
								</span>
								<template v-if="xpsBrkInfo.allIstSc > 0">
									<span>할부 {{xpsBrkInfo.allIstSc}}개월</span>
								</template>
							</div>
						</div>
					</div>
					<div class="box_content">
						<div class="price">
							<div class="won">
								<span class="num counter" :data-count="xpsBrkInfo.tram">{{xpsBrkInfo.tram | numberFilter}}</span>
								<span>원</span>
							</div>
						</div>
						<div class="period">{{xpsBrkInfo.trDt | dateFilter('YYYY.MM.DD')}}</div>
					</div>
					<a href="javascript:void(0);" class="com_btnwrite float" @click.prevent="fn_goPDCA1117">
						<span class="blind">수정</span>
					</a>
				</div>

				<p class="gray_txt_cent" v-if="xpsBrkInfo === undefined || xpsBrkInfo === null || xpsBrkInfo === ''">결제수단 별로 지출내역이 있으시다면 해당하는 지출내역을 선택하세요.</p>
				<div class="com_btn_area">
					<a href="javascript:void(0);" class="com_btn_round" @click.prevent="fn_goPDCA1117()">
						<!-- 선택지출내역이 null일 경우(등록시) -->
						<span class="btn_go">
							<template v-if="xpsBrkInfo !== undefined && xpsBrkInfo !== null && xpsBrkInfo !== ''">
								지출내역 다시조회
							</template>
							<template v-else>
								지출내역 조회하기
							</template>
						</span>
					</a>
				</div>
			</div>
			<div class="com_inner">
				<div class="com_inputarea_type07">

					<!-- 카테고리 -->
					<div class="com_btnselectbox_type01">
						<button type="button" class="com_btnselect_type01 com_iconstar" @click.prevent="fn_openCarCategory(carbkCtgrId)" ref="carbkCtgrId" title="카테고리 선택">
							<em class="blind">필수입력</em>
							<span>{{carbkCtgrId == '' ? '카테고리를 선택하세요.' : carbkCtgrnm}}</span>
						</button>
					</div>

					<!-- 금액 -->
					<div class="com_input_type01 com_word1">
						<input type="tel" id="tram" :class="tram.length > 0 && foc_tram ? 'focusON focusforce' : ''" v-model="tram" :disabled="xpsBrkInfo !== undefined && xpsBrkInfo !== null && xpsBrkInfo !== '' ? true : false" maxlength="12" @keyup="addComma('tram', $event)" @keyup.enter="moveNextTag($event)" @focus="fn_focusOnOff('tram')" @blur.prevent="carbkXpsTpDsc == '2' ? fn_setFuelEfficiency() : ''" required="" ref="tram" placeholder="금액을 입력하세요." title="금액을 입력하세요.">
						<label for="tram">
							<em><span class="blind">필수입력</span></em>
							<span class="txt_label_x">금액</span>
						</label>
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2" @click.prevent="fn_delStr('tram')" v-if="tram.length > 0" style="display: none;"><span class="blind">삭제</span></a>
							<span class="com_inputtxtright2">원</span>
						</div>
						<p class="com_sum">{{fn_hanValue(tram)}}</p>

						<!-- 지출내역으로 조회 된 경우 hidden -->
						<template v-if="!xpsBrkInfo">
							<!-- 금액 입력 폼 -->
							<div class="btn_price_group">
								<button type="button" class="btn_price" @click.prevent="fn_btnAddMoney(5)">+<strong>5</strong>만</button>
								<button type="button" class="btn_price" @click.prevent="fn_btnAddMoney(10)">+<strong>10</strong>만</button>
								<button type="button" class="btn_price" @click.prevent="fn_btnAddMoney(100)">+<strong>100</strong>만</button>
								<button type="button" class="btn_price" @click.prevent="fn_btnAddMoney(1000)">+<strong>1000</strong>만</button>
							</div>
						</template>
					</div>

					<!-- 지출내용 -->
					<div class="com_input_type01">
						<input type="text" id="trCntn" :class="trCntn.length > 0 && foc_trCntn ? 'focusON focusforce' : ''" @focus="fn_focusOnOff('trCntn')" @keyup="fn_checkWord($event, 40, 'trCntn')" @keyup.enter="moveNextTag($event)" required="" ref="trCntn" :value="trCntn" maxlength="46" placeholder="지출 내용을 입력하세요." title="지출 내용을 입력하세요.">
						<label for="trCntn">
							<em><span class="blind">필수입력</span></em>
							<span class="txt_label_x">지출 내용</span>
						</label>
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
						</div>
					</div>

					<!-- 날짜 -->
					<div class="com_input_type01 com_word2" role="button" :aria-label="'필수입력, ' +  trDt  +', 날짜 선택'">
						<input type="text" id="trDt" ref="trDt" data-popup="alert_popup" readonly :class="trDt.length > 0 ? 'input_cal_date_tit' : ''" class="input_cal_date com_txtright_type01 tar" required="" v-model="trDt" @click="fn_popupCalendar($event)" placeholder="날짜를 선택하세요." title="날짜를 선택하세요." :disabled="xpsBrkInfo !== undefined && xpsBrkInfo !== null && xpsBrkInfo !== '' ? true : false" aria-hidden="true">
						<label for="trDt">
							<em><span class="blind">필수입력</span></em>
							<span class="txt_label_x">날짜</span>
						</label>
					</div>

					<!-- 카테고리(주유/충전비) 선택 시  -->
					<template v-if="carbkXpsTpDsc == '2'">
						<!-- 이전 주행거리  -->
						<!-- 해당 차량에 주유/충전비 총 등록건수가 0건 일때 최초 1회 노출 -->
						<div class="com_input_type01 com_word1 necessary" v-show="xpsOilgChggRgYn === '0'">
							<input type="tel" id="rbfOdmtrDist" ref="rbfOdmtrDist" readonly v-model="rbfOdmtrDist"  pattern="[0-9]*" maxlength="18" required="" title="이전 주행거리">
							<label for="rbfOdmtrDist">
								<em><span class="blind">필수입력</span></em>
								<span class="txt_label_x">이전 주행거리</span>
							</label>
							<div class="del_txt">
								<a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
								<span class="com_inputtxtright2">㎞</span>
							</div>
							<p class="com_txtinfo_type01">처음 이용 시 <strong>트립컴퓨터 주행거리</strong>가 필요합니다.</p>
						</div>
					</template>
						
					<!-- 총 주행거리 -->
					<div class="com_input_type01 com_word1 necessary">
						<input type="tel" id="odmtrDist" class="" ref="odmtrDist" maxlength="12" v-model="odmtrDist" required="" :class="[(odmtrDist.length > 0 && foc_odmtrDist ? 'focusON focusforce' : ''), (carbkXpsTpDsc === '2' && rbfOdmtrDist.length > 0 ? 'placeholder_r' : '')]"  :placeholder="carbkXpsTpDsc === '2' && rbfOdmtrDist.length > 0 ? [[rbfOdmtrDist]] : '총 주행거리 입력'" title="총 주행거리를 입력하세요." @keyup="addComma('odmtrDist', $event)" @keyup.enter="moveNextTag($event)" @blur.prevent="carbkXpsTpDsc == '2' ? fn_setFuelEfficiency() : ''" @focus="fn_focusOnOff('odmtrDist')">
						<label for="odmtrDist" :class="carbkXpsTpDsc === '2' && rbfOdmtrDist.length > 0 ? 'focus' : ''">
							<em><span class="blind">필수입력</span></em>							
							<span class="txt_label_x">총 주행거리</span>
						</label>
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
							<span class="com_inputtxtright2">㎞</span>
						</div>
					</div>

					<!-- 카테고리(주유/충전비) 선택 시  -->
					<template v-if="carbkXpsTpDsc == '2'">
						<!-- 리터당 금액 -->
						<div class="com_input_type01 com_word1 necessary" v-if="carbkXpsTpDsc == '2'">
							<input type="tel" id="oilgUpr" ref="oilgUpr" readonly v-model="oilgUpr" pattern="[0-9]*" maxlength="17" required="" title="리터당 금액">
							<label for="oilgUpr">
								<em><span class="blind">필수입력</span></em>
								<span class="txt_label_x">
									<template v-if="carFuelCntn == 'Diesel' || carFuelCntn == 'Gasoline' || carFuelCntn == 'Gasoline/Hybrid' || carFuelCntn == 'LPG'">
										리터당 금액
									</template>
									<template v-else>
										kW당 금액
									</template>
								</span>
							</label>
							<div class="del_txt">
								<a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
								<span class="com_inputtxtright2">원</span>
							</div>
							<!-- <p class="com_sum">4조 2,345억 6,789원</p> -->
							<p class="com_txtinfo_type01">오피넷에서 제공하는 <strong>전국주유소 평균유가</strong>입니다.</p>
						</div>

						<!-- 2022.09.06 비노출 -->
						<!-- 실제연비 -->
						<div class="com_input_type01 com_word2" v-if="carbkXpsTpDsc == '2'" style="display:none;">
							<input type="tel" id="fuelEfficiency" ref="fuelEfficiency" v-model="fuelEfficiency" required="" readonly :title="carFuelCntn == 'Diesel' || carFuelCntn == 'Gasoline' || carFuelCntn == 'Gasoline/Hybrid' || carFuelCntn == 'LPG' ? '실제연비' : '실제전비'">
							<label for="fuelEfficiency">
								<span class="txt_label_x">
									<template v-if="carFuelCntn == 'Diesel' || carFuelCntn == 'Gasoline' || carFuelCntn == 'Gasoline/Hybrid' || carFuelCntn == 'LPG'">
										실제연비
									</template>
									<template v-else>
										실제전비
									</template>
								</span>
							</label>
							<div class="del_txt">
								<a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
								<span class="com_inputtxtright2">
									<template v-if="carFuelCntn == 'Diesel' || carFuelCntn == 'Gasoline' || carFuelCntn == 'Gasoline/Hybrid' || carFuelCntn == 'LPG'">
										km/ℓ
									</template>
									<template v-else>
										km/㎾h
									</template>
								</span>
							</div>
							<p class="com_txtinfo_type01">
								<template v-if="carFuelCntn == 'Diesel' || carFuelCntn == 'Gasoline' || carFuelCntn == 'Gasoline/Hybrid' || carFuelCntn == 'LPG'">
									트립컴퓨터 <strong>평균연비</strong> 보다 오차 있음
								</template>
								<template v-else>
									트립컴퓨터 <strong>평균전비</strong> 보다 오차 있음
								</template>
							</p>
						</div>
					</template>

					<!-- 메모 -->
					<div class="com_input_type01">
						<input type="text" id="memoCntn" v-model="memoCntn" ref="memoCntn" required="" @keyup="fn_checkWord($event, 100, 'memoCntn')" @focus="fn_focusOnOff('memoCntn')" placeholder="메모를 입력하세요." title="메모을 입력하세요.">
						<label for="memoCntn">
							<span class="txt_label_x">메모</span>
						</label>
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
						</div>
					</div>

					<!-- 연비를 좋아지게 하는 운전습관 -->
					<template v-if="carbkXpsTpDsc == '2'">
						<div class="com_box_type01 com_box_list change_parts_box mt28">
							<div class="new_tit_area">
								<div class="tit">
									<span>
										<template v-if="carFuelCntn == 'Diesel' || carFuelCntn == 'Gasoline' || carFuelCntn == 'Gasoline/Hybrid' || carFuelCntn == 'LPG'">
											연비를 좋아지게 하는 운전 습관
										</template>
										<template v-else>
											전비를 좋아지게 하는 운전 습관
										</template>
									</span>
								</div>
							</div>
							<ul class="bl_dot_list">
								<li>급가속, 급제동, 급출발 금지</li>
								<li>정속주행과 중립기어</li>
								<li>주유는 80% 만 채우기</li>
								<li>트렁크 무게 줄이기</li>
								<li>주기적인 타이어 공기압 체크</li>
								<li>최대 공기압의 80% 주입</li>
								<li>고속주행 최소화</li>
								<li>여름철 에어컨 약하게 사용</li>
							</ul>
						</div>
					</template>

				</div>
			</div>
		</div>
		<div class="popup_footer fixed">
			<div class="com_btnhalfbox_type02">
				<template v-if="modifyYn == 'N' || (modifyYn == 'Y' && (xpsBrkInfo !== undefined && xpsBrkInfo !== null && xpsBrkInfo !== ''))">
					<a href="javascript:void(0);" role="button" class="btn btn_mint_gray"  @click.prevent="close()">취소</a>
				</template>
				<template v-else-if="modifyYn == 'Y' || ((xpsBrkInfo === undefined || xpsBrkInfo === null || xpsBrkInfo === ''))">
					<a href="javascript:void(0);" role="button" class="btn btn_mint_gray" @click.prevent="fn_deleteCarAccount()">삭제</a>
				</template>
				<a href="javascript:void(0);" role="button" class="btn btn_mint" @click.prevent="fn_insertCarAccount()">저장</a>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import {keyupNumFormat, round, floor, numberFormat} from '@/utils/number'
import {dateFormat} from '@/utils/date'
import {checkWord, maskingformat} from '@/utils/data'
import modalService from '@/service/modalService'
import PDCA1115 from '@/views/page/PD/CA/PDCA1115/PDCA1115' // 자동차 선택(슬라이드 팝업)
import PDCA1116 from '@/views/page/PD/CA/PDCA1116/PDCA1116' // 카테고리 선택(슬라이드 팝업)
import PDCA1117 from '@/views/page/PD/CA/PDCA1117/PDCA1117' // 지출내역조회
import Constant from '@/common/config/constants'
//import _ from 'lodash'

export default {
    name : "ANCA2211",
    data: () => {
		return {
			// input
			mydtCusno              : "",		// 마이데이터고객번호
			vhcnoVal               : "",		// 차량번호값
			trDt                   : "",		// 거래일자
			modifyTrDt             : "",		// 거래일자(수정용)
			sqno                   : 0,			// 일련번호
			toDay                  : "",		// 현재일자

			// 수정시 사용(날짜 변경시 처리용)
			delMydtCusno           : "",
			delVhcnoVal            : "",
			delTrDt                : "",
			delSqno                : "",

			// output1 (보유자동차정보)
			hldVhcCcn              : 0,			// 보유차량대수
			hldVhcList             : [],		// 보유차량목록

			// output2 (차계부 상세)
			carBrannm              : "",		// 자동차브랜드명
			carCrtpnm              : "",		// 자동차차종명
			carGrdnm               : "",		// 자동차등급명
			carbkXpsTpDsc          : "",		// 차계부지출유형구분코드
			carbkXpsTpDsnm         : "",		// 차계부지출유형구분명
			carbkCtgrId            : "",		// 차계부카테고리ID
			carbkCtgrnm            : "",		// 차계부카테고리명
			tram                   : "",		// 거래금액
			trCntn                 : "",		// 거래내용
			memoCntn               : "",		// 메모내용
			odmtrDist              : "",		// 주행거리
			oilgUpr                : "",		// 주유단가
			dataSrcDsc             : "",		// 데이터원천구분코드(01:계좌, 02:카드_국내, 03:카드_해외, 04:선불, 05:수기)
			inqKey                 : "",		// 조회키
			rbfOdmtrDist           : "",		// 직전주행거리
			rbfOilgOdmtrDist       : "",		// 직전주유주행거리
			carFuelCntn            : "",		// 자동차연료내용
			prcMchtnm              : "",		// 처리가맹점명
			cdcoCdWrsnm            : "",		// 카드사카드상품명
			allIstSc               : 0,			// 전체할부회차
			fuelEfficiency         : "",		// 실제연비/전비
			cdcoCdNo               : "",		// 카드사카드번호
			mydtAcno               : "",		// 마이데이터계좌번호
			faceNo                 : "",		// 권면번호
			trDtm                  : "",		// 거래일시
			xpsBrkInfo             : {},		// 선택 지출내역

			// output3(기준일자기준 최종주행거리 조회)
			rbfTrDt_14r03          : "",		// 직전거래일자
			rbfOdmtrDist_14r03     : "",		// 직전주행거리
			nxTrDt_14r03           : "",		// 다음거래일자
			nxOdmtrDist_14r03      : "",      	// 다음주행거리
			rbfOilgDt_14r03        : "",        // 직전주유일자
			rbfOilgOdmtrDist_14r03 : "",		// 직전주유주행거리

			// output3(차계부 기준일자기준 유가정보 조회)
			olprBasDt              : "",		// 유가기준일자
			oilC                   : "",		// 유류코드
			oilNm                  : "",		// 유류명
			avgOlprAm              : "",		// 평균유가금액
			bdCmprOlprRnf          : "",		// 전일대비유가등락률
			xpsOilgChggRgYn        : "",		// 차계부주유충전비등록여부

			// param
			modifyYn               : "",
			assetFlag              : "",        // 1:지출 추가, 2:직접 입력

			// focus
			foc_tram               : false,		// 거래금액 focus YN
			foc_trCntn             : false,		// 거래내용 focus YN
			foc_odmtrDist          : false,		// 주행거리 focus YN
			foc_memoCntn           : false,		// 메모내용 focus YN
			foc_rbfOdmtrDist       : false,		// 직전주행거리 focus YN
			foc_oilgUpr            : false,		// 주유단가 focus YN

        }
    },
    methods: {
        initComponent(params) {

			this.mydtCusno = this.getUserInfo('mydtCusno')
			this.xpsBrkInfo = ''
			this.toDay  = dateFormat(new Date(), 'YYYY-MM-DD') // 현재일자
			// 보유자동차 정보 조회(조회완료후 파라미터 세팅수행)
			this.fn_carList(params)
		},
		fn_setParam(params) {

			if (params !== undefined && params !== null 
				&& params.vhcnoVal !==undefined && params.vhcnoVal !== null && params.vhcnoVal !== ''
				&& params.trDt !==undefined && params.trDt !== null && params.trDt !== ''
				&& params.sqno !==undefined && params.sqno !== null && params.sqno !== ''
				&& params.modifyYn == 'Y')
			{
				this.modifyYn = params.modifyYn || ''
				this.vhcnoVal = params.vhcnoVal || ''
				this.trDt     = params.trDt || ''
				this.sqno     = params.sqno || ''

				// 날짜변경시 서비스 처리용
				this.delVhcnoVal = params.vhcnoVal || ''
				this.delTrDt = params.trDt || ''
				this.delSqno = params.sqno || ''

				this.getData()
			}
			else 
			{
				this.assetFlag = params.assetFlag || '' // 지출추가/직접입력 구분
				this.modifyYn = params.modifyYn || 'N'
				
				// 등록시 자동차 정보 세팅
				// carBrannm, carCrtpnm, carGrdnm, vhcnoVal 각 정보가 null일경우
				// 보유자동차 정보의 제일 첫번째 자동차 정보로 세팅
				if(params.carBrannm !==undefined && params.carBrannm !== null && params.carBrannm !== ''
				&& params.carCrtpnm !==undefined && params.carCrtpnm !== null && params.carCrtpnm !== ''
				&& params.carGrdnm  !==undefined && params.carGrdnm  !== null && params.carGrdnm  !== ''
				&& params.vhcnoVal  !==undefined && params.vhcnoVal  !== null && params.vhcnoVal  !== '') 
				{
					this.vhcnoVal    = params.vhcnoVal    || ''
					this.carBrannm   = params.carBrannm   || ''
					this.carCrtpnm   = params.carCrtpnm   || ''
					this.carGrdnm    = params.carGrdnm    || ''
					this.carFuelCntn = params.carFuelCntn || ''
				} 
				else 
				{
					this.vhcnoVal    = this.hldVhcList[0].vhcnoVal    || ''
					this.carBrannm   = this.hldVhcList[0].carBrannm   || ''
					this.carCrtpnm   = this.hldVhcList[0].carCrtpnm   || ''
					this.carGrdnm    = this.hldVhcList[0].carGrdnm    || ''
					this.carFuelCntn = this.hldVhcList[0].carFuelCntn || ''
				}

				// 2022-11-22 수정
				this.xpsBrkInfo = params.xpsBrkInfo || ''
				console.log('@@@@ : ', Object.keys(this.xpsBrkInfo).length)
				if(Object.keys(this.xpsBrkInfo).length > 0){
					
					// 금액 및 날짜세팅
					this.tram = keyupNumFormat(this.xpsBrkInfo.tram)
					this.trDt = dateFormat(this.xpsBrkInfo.trDt, 'YYYY-MM-DD')
					this.carbkXpsTpDsc  = params.carbkXpsTpDsc
					this.carbkXpsTpDsnm = params.carbkXpsTpDsnm
					this.carbkCtgrId    = params.carbkCtgrId
					this.carbkCtgrnm    = params.carbkCtgrnm

					// 기준일자기준 최종주행거리 조회
					this.fn_getRbfOdmtrDist()
				}				

				// 직접입력
				if(params.assetFlag == '2') {
					if(this.hldVhcList.length > 1) {
						this.$refs.vhcnoVal.click()
					} else {
						this.$refs.carbkCtgrId.click()
					}
				}
				
			}
		},
		fn_maskingformat(str, flag){
			return maskingformat(str, flag)
		},
		getData() {

			const config = {
				url: '/pd/ca/14r02',
				data: {
                         "mydtCusno" : this.mydtCusno // 마이데이터고객번호
						,"vhcnoVal"  : this.vhcnoVal  // 차량번호값
						,"trDt"      : this.trDt      // 거래일자
						,"sqno"      : this.sqno      // 일련번호
					}
			};
			
			apiService.call(config).then(response => {

				this.modifyTrDt       = response.trDt           || ''
				this.trDt             = dateFormat(response.trDt, 'YYYY-MM-DD') || ''
				this.carBrannm        = response.carBrannm      || ''
				this.carCrtpnm        = response.carCrtpnm      || ''
				this.carGrdnm         = response.carGrdnm       || ''
				this.carbkXpsTpDsc    = response.carbkXpsTpDsc  || ''
				this.carbkXpsTpDsnm   = response.carbkXpsTpDsnm || ''
				this.carbkCtgrId      = response.carbkCtgrId    || ''
				this.carbkCtgrnm      = response.carbkCtgrnm    || ''
				this.tram             = keyupNumFormat(response.tram) || 0
				this.trCntn           = response.trCntn         || ''
				this.memoCntn         = response.memoCntn       || ''
				this.odmtrDist        = keyupNumFormat(response.odmtrDist) || 0
				this.dataSrcDsc       = response.dataSrcDsc     || ''
				this.inqKey           = response.inqKey         || ''
				this.rbfOdmtrDist     = keyupNumFormat(response.rbfOdmtrDist) || 0
				this.rbfOilgOdmtrDist = response.rbfOilgOdmtrDist    || 0
				this.carFuelCntn      = response.carFuelCntn    || ''
				this.prcMchtnm        = response.prcMchtnm      || ''
				this.cdcoCdWrsnm      = response.cdcoCdWrsnm    || ''
				this.allIstSc         = response.allIstSc       || 0
				this.cdcoCdNo         = response.cdcoCdNo       || ''
				this.mydtAcno         = response.mydtAcno       || ''
				this.faceNo           = response.faceNo         || ''
				this.trDtm            = response.trDtm          || ''

				this.oilgUpr = response.oilgUpr || 0

				let fmt = this.fn_setNumberFmt(this.oilgUpr)
				this.oilgUpr = keyupNumFormat(this.oilgUpr, fmt, {precision: 2}) || 0

				// 연비/전비
				this.fn_setFuelEfficiency('N')

				// 조회키가 있을 경우 지출내역을 연동한것..
				if(this.inqKey != '') {
					this.xpsBrkInfo = {}
					this.xpsBrkInfo.inqKey = this.inqKey
					this.xpsBrkInfo.prcMchtnm = this.prcMchtnm
					this.xpsBrkInfo.cdcoCdWrsnm = this.cdcoCdWrsnm
					this.xpsBrkInfo.allIstSc = this.allIstSc
					this.xpsBrkInfo.tram = this.tram
					this.xpsBrkInfo.trDt = response.trDt
					this.xpsBrkInfo.dataSrcDsc = this.dataSrcDsc
					this.xpsBrkInfo.cdcoCdNo = this.cdcoCdNo
					this.xpsBrkInfo.mydtAcno = this.mydtAcno
					this.xpsBrkInfo.faceNo = this.faceNo
				}
				
				// 기준일자기준 최종주행거리 조회
				if(this.modifyYn == 'N') {
					this.fn_getRbfOdmtrDist()
				}				
			})
		},
		// 연비계산
		fn_setFuelEfficiency(msgYn = 'Y') {
			let tmpRbfOdmtrDist = Number(this.remove(this.rbfOdmtrDist))	// 이전 주행거리
			let tmpOdmtrDist    = Number(this.remove(this.odmtrDist   ))	// 총 주행거리
			let tmpOilgUpr      = Number(this.remove(this.oilgUpr     ))	// 주유단가(오피넷평균단가)
			let tmpTram         = Number(this.remove(this.tram        ))    // 금액

			// 연비/전비 계산(고도화:오피넷API 유가정보시세 기반으로 계산 TOBE요건)
			// ※ 연비는 소수점 2자릿수를 반올림 처리
			// ※ 전비는 소수점 2자릿수를 절삭 처리
			
			// 이전 주행거리, 리터당금액이 조회되었을 때 
			if(tmpOilgUpr > 0 && tmpRbfOdmtrDist > 0 && tmpOdmtrDist > 0 && tmpTram > 0) {
				// 총 주행거리보다 적게 입력했는지 확인
				if(msgYn == 'Y') {
					if(tmpRbfOdmtrDist > tmpOdmtrDist) {
						modalService.alert("주유전 총 주행거리가 총 주행거리보다 크게 입력되었습니다.").then(() => {});
						return;
					}
				}

				// 연비계산
				if(this.carFuelCntn == 'Diesel' || this.carFuelCntn == 'Gasoline' || this.carFuelCntn == 'Gasoline/Hybrid' || this.carFuelCntn == 'LPG') {
					this.fuelEfficiency = round((tmpOdmtrDist - tmpRbfOdmtrDist) / (tmpTram / tmpOilgUpr), 1) /* 연비 =  (총 주행거리 - 이전 주행거리) / (금액 / 주유단가)  */
				} 
				// 전비계산
				else {
					this.fuelEfficiency = floor((tmpOdmtrDist - tmpRbfOdmtrDist) / (tmpTram / tmpOilgUpr), 1) /* 전비 =  (총 주행거리 - 이전 주행거리) / (금액 / 주유단가)  */
				}
			} else {
				this.fuelEfficiency = '0'
			}
		},
		// number 포멧 설정
		fn_setNumberFmt(num) {

			let tempNum = String(num)
			
			let fmt =""
			let padStr =""

			// 소수점 자리가 없는경우
			if(tempNum.split(".").length == 1) {
				fmt = Constant.FORMAT.NUMBER
			} else {
				fmt = Constant.FORMAT.NUMBER
				fmt += "."

				let precision = tempNum.split(".")[1].length

				for (let i=0; i<precision; i++)
				{
					padStr +="#"
				}
				fmt += padStr
			}

			return Number(fmt)
		},
		fn_carList(params) {

			const config = {
				url: '/pd/ca/14r01',
				data: {
						"mydtCusno": this.mydtCusno // 마이데이터고객번호
					}
			};
			
			apiService.call(config).then(response => {

				this.hldVhcCcn  = response.hldVhcCcn  || 0
				this.hldVhcList = response.hldVhcList || []

				// 파라미터 세팅
				this.fn_setParam(params)
			});
		},
		fn_openCarList(vhcnoVal) {
			let compName = PDCA1115

			var param = {val : vhcnoVal}
			const config = {
				component: compName,
				params : param
			}

			modalService.openPopup(config).then((response) => {

				this.carBrannm   = response.carBrannm   || ''
				this.carCrtpnm   = response.carCrtpnm   || ''
				this.carGrdnm    = response.carGrdnm    || ''
				this.vhcnoVal    = response.vhcnoVal    || ''
				this.carFuelCntn = response.carFuelCntn || '' // 자동차연료내용(연료내용에 따라서 연비/전비 구분)

				if(this.assetFlag == '2' && this.modifyYn == 'N') {
					if(this.carbkCtgrId == '') {
						this.$refs.carbkCtgrId.click()
					}
				}
			})
		},
		addComma(str, e="") {

			if(e.keyCode === 13) return false

			let selectionStartPos
			let selectionEndPos

            switch(str) {
                case "tram" :

					selectionStartPos = this.$refs.tram.selectionStart
					selectionEndPos = this.$refs.tram.selectionEnd

                    if(this.tram.length == 1 && this.tram == 0) {
                        this.tram = this.tram.slice(0, -1)
                    } else {
                        this.tram = this.tram.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                        this.tram = this.tram.split(",").join("")
                        this.tram = keyupNumFormat(this.tram)
					}
					
					if(e.keyCode === 8) {
						this.$nextTick(()=>{
							this.$refs.tram.focus()
							this.$refs.tram.setSelectionRange(selectionStartPos,selectionEndPos)
						})
					}

					break

                case "odmtrDist" :

					selectionStartPos = this.$refs.odmtrDist.selectionStart
					selectionEndPos = this.$refs.odmtrDist.selectionEnd

                    if(this.odmtrDist.length == 1 && this.odmtrDist == 0) {
                        this.odmtrDist = this.odmtrDist.slice(0, -1)
                    } else {
                        this.odmtrDist = this.odmtrDist.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                        this.odmtrDist = this.odmtrDist.split(",").join("")
                        this.odmtrDist = keyupNumFormat(this.odmtrDist)
					}
					
					if(e.keyCode === 8) {
						this.$nextTick(()=>{
							this.$refs.odmtrDist.focus()
							this.$refs.odmtrDist.setSelectionRange(selectionStartPos,selectionEndPos)
						})
					}

					break

                case "rbfOdmtrDist" :

					selectionStartPos = this.$refs.rbfOdmtrDist.selectionStart
					selectionEndPos = this.$refs.rbfOdmtrDist.selectionEnd

                    if(this.rbfOdmtrDist.length == 1 && this.rbfOdmtrDist == 0) {
                        this.rbfOdmtrDist = this.rbfOdmtrDist.slice(0, -1)
                    } else {
                        this.rbfOdmtrDist = this.rbfOdmtrDist.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                        this.rbfOdmtrDist = this.rbfOdmtrDist.split(",").join("")
                        this.rbfOdmtrDist = keyupNumFormat(this.rbfOdmtrDist)
					}
					
					if(e.keyCode === 8) {
						this.$nextTick(()=>{
							this.$refs.rbfOdmtrDist.focus()
							this.$refs.rbfOdmtrDist.setSelectionRange(selectionStartPos,selectionEndPos)
						})
					}

					break

                case "oilgUpr" :

					selectionStartPos = this.$refs.oilgUpr.selectionStart
					selectionEndPos = this.$refs.oilgUpr.selectionEnd

                    if(this.oilgUpr.length == 1 && this.oilgUpr == 0) {
                        this.oilgUpr = this.oilgUpr.slice(0, -1)
                    } else {
						this.oilgUpr = this.oilgUpr.replace(/[^0-9.]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
						this.oilgUpr = this.oilgUpr.split(",").join("")
						
						let fmt = this.fn_setNumberFmt(this.oilgUpr)
						this.oilgUpr = keyupNumFormat(this.oilgUpr, fmt, {precision: 2})
					}
					
					if(e.keyCode === 8) {
						this.$nextTick(()=>{
							this.$refs.oilgUpr.focus()
							this.$refs.oilgUpr.setSelectionRange(selectionStartPos,selectionEndPos)
						})
					}

					break
            }
		},
		// 검색 텍스트 삭제
		fn_del(type) {

			if(type === 'tram') {
				this.tram = ''
			} else if(type === 'trCntn') {
				this.trCntn = ''
			} else if(type === 'oilgUpr') {
				this.oilgUpr = ''
				this.fuelEfficiency = ''
			} else if(type === 'odmtrDist') {
				this.odmtrDist = ''
			}
		},
        // 글자수 체크
        fn_checkWord(event, maxByte, str) {

			let rtnObj = checkWord(event.target.value, maxByte)

			if(str == 'trCntn') {

				if(rtnObj.flag) {this.$refs.trCntn.blur()}   // 알럿 중복 방지
				event.target.value = rtnObj.value
				this.trCntn = event.target.value
			} else if(str == 'memoCntn') {

				if(rtnObj.flag) {this.$refs.memoCntn.blur()}   // 알럿 중복 방지
				event.target.value = rtnObj.value
				this.memoCntn = event.target.value
			}
		},
		fn_openCarCategory(carbkCtgrId) {

			let compName = PDCA1116

			var param = {val : carbkCtgrId}
			const config = {
				component: compName,
				params : param
			}

			modalService.openPopup(config).then((response) => {

				this.carbkCtgrId = response.carbkCtgrId // 차계부카테고리ID
				this.carbkCtgrnm = response.carbkCtgrnm // 차계부카테고리명
				if(response.asetCtgrDsc == '4') { // 자산카테고리구분코드(1:차량유지비, 2:주유/충전비)
					this.carbkXpsTpDsc = '2'
					this.carbkXpsTpDsnm = '주유/충전비'
				} else {
					this.carbkXpsTpDsc = '1'
					this.carbkXpsTpDsnm = '차량유지비'
				}

				this.$nextTick(() => {
					this.$refs.tram.focus()
				})
			})
		},
		// input 클릭 시 focus 관련
		fn_focusOnOff(type) {
			switch(type) {
				case 'tram':
					this.foc_tram         = true
					this.foc_trCntn       = false
					this.foc_odmtrDist    = false
					this.foc_memoCntn     = false
					this.foc_rbfOdmtrDist = false
					this.foc_oilgUpr      = false
					break
				case 'trCntn':
					this.foc_tram         = false
					this.foc_trCntn       = true
					this.foc_odmtrDist    = false
					this.foc_memoCntn     = false
					this.foc_rbfOdmtrDist = false
					this.foc_oilgUpr      = false
					break
				case 'odmtrDist':
					this.foc_tram         = false
					this.foc_trCntn       = false
					this.foc_odmtrDist    = true
					this.foc_memoCntn     = false
					this.foc_rbfOdmtrDist = false
					this.foc_oilgUpr      = false
					break
				case 'memoCntn':
					this.foc_tram         = false
					this.foc_trCntn       = false
					this.foc_odmtrDist    = false
					this.foc_memoCntn     = true
					this.foc_rbfOdmtrDist = false
					this.foc_oilgUpr      = false
					break
				case 'rbfOdmtrDist':
					this.foc_tram         = false
					this.foc_trCntn       = false
					this.foc_odmtrDist    = false
					this.foc_memoCntn     = false
					this.foc_rbfOdmtrDist = true
					this.foc_oilgUpr      = false
					break
				case 'oilgUpr':
					this.foc_tram         = false
					this.foc_trCntn       = false
					this.foc_odmtrDist    = false
					this.foc_memoCntn     = false
					this.foc_rbfOdmtrDist = false
					this.foc_oilgUpr      = true
					break
			}
		},
		remove(value) {
			return (typeof value === "string") ? value.split(".").join("").split("-").join("").split(",").join("") : value
		},
		fn_insertCarAccount() {

			if(this.carbkCtgrId.length == 0 || this.carbkCtgrId == "") {
				modalService.alert("차계부카테고리는 필수입력항목입니다.").then(() => {});
				return;
			}

			if(this.carbkXpsTpDsc.length == 0 || this.carbkXpsTpDsc == "") {
				modalService.alert("차계부지출유형구분코드는 필수입력항목입니다.").then(() => {});
				return;
			}

			// 금액 필수입력항목 추가
			if(Number(this.tram) <= 0 ) {
				modalService.alert("지출금액은 필수입력항목입니다.").then(() => {});
				return;
			}

			if(this.trCntn.length == 0 || this.trCntn == "") {
				modalService.alert("거래내용은 필수입력항목입니다.").then(() => {});
				return;
			}

			if(this.trDt.length == 0 || this.trDt == "") {
				modalService.alert("거래일자는 필수입력항목입니다.").then(() => {});
				return;
			}

			// 주유/충전비 선택 시 총 주행거리 필수 입력 체크
			if(this.carbkXpsTpDsc === "2"){
				
				// 이전 주행거리 정보가 있고, 총 주행거리가 입력되지 않으면 이전주행거리로 입력
				console.log('1111 : ', this.rbfOdmtrDist)
				console.log('1112 : ', this.odmtrDist)

				if((this.remove(this.rbfOdmtrDist) > 0 || this.rbfOdmtrDist.length > 0) && (this.odmtrDist.length == 0 || this.odmtrDist == "")){
					this.odmtrDist = this.rbfOdmtrDist
				}

				if(this.odmtrDist.length == 0 || this.odmtrDist == "") {
					modalService.alert("주유/충전비 선택 시 총 주행거리는 필수입력항목입니다.").then(() => {});
					return;
				}				
			}
			
			// 주행거리 체크(등록, 수정시에는 날짜 or 차변경시에만 체크)
			if(this.modifyYn == 'N' || (this.modifyYn == 'Y' && (this.remove(this.trDt) != this.remove(this.delTrDt) || this.vhcnoVal != this.delVhcnoVal))) {
				if(this.remove(this.odmtrDist) > 0 || this.odmtrDist.length > 0) {
					if(this.remove(this.odmtrDist) > this.nxOdmtrDist_14r03 || this.remove(this.odmtrDist) < this.rbfOdmtrDist_14r03) {
						// 다음주행거리가 없는 경우 예외처리
						if(this.nxTrDt_14r03 == '99991231' && this.nxOdmtrDist_14r03 == '9999999'){
							modalService.alert("총 주행거리 입력값 확인바랍니다.<br>(직전거래일자 : " + dateFormat(this.rbfTrDt_14r03, 'YYYY.MM.DD') + ", 직전주행거리 : " + numberFormat(this.rbfOdmtrDist_14r03) + ")").then(() => {});
						}else{
							modalService.alert("총 주행거리 입력값 확인바랍니다.<br>(직전거래일자 : " + dateFormat(this.rbfTrDt_14r03, 'YYYY.MM.DD') + ", 직전주행거리 : " + numberFormat(this.rbfOdmtrDist_14r03) + ", 다음거래일자 : " + dateFormat(this.nxTrDt_14r03, 'YYYY.MM.DD') + ", 다음주행거리 : " + numberFormat(this.nxOdmtrDist_14r03) + ")").then(() => {});							
						}

						// modalService.alert("총 주행거리 입력값 확인바랍니다.<BR>(직전거래일자 : " + dateFormat(this.rbfTrDt_14r03, 'YYYY.MM.DD') + ", 직전주행거리 : " + numberFormat(this.rbfOdmtrDist_14r03) + ", 다음거래일자 : " + dateFormat(this.nxTrDt_14r03, 'YYYY.MM.DD') + ", 다음주행거리 : " + numberFormat(this.nxOdmtrDist_14r03) + ")").then(() => {});
						return;
					}
				}
			}

			let msgAlert

			if(this.modifyYn == 'N') {
				msgAlert = '등록하시겠습니까?'
			} else {
				msgAlert = '수정하시겠습니까?'
			}

			const configConfirm = {
				content: [msgAlert],
				title  : "",
			}

			modalService.confirm(configConfirm).then(text => {
				if(text == "예") {

					let inqKey

					// 지출내역 선택하지 않았을 경우
					if(this.xpsBrkInfo == '' || this.xpsBrkInfo == null || this.xpsBrkInfo == undefined) { 
						//this.dataSrcDsc = '05'
					} else {
						this.dataSrcDsc = this.xpsBrkInfo.dataSrcDsc
						inqKey = this.xpsBrkInfo.inqKey || ''
					}

					// 수기는 삭제가능
					// 그외는 삭제불가(수정은 가능)

					// 날짜가 수정되는 경우
					// 서비스 내부에서 삭제후 등록처리 함
					// (테이블의 키값으로 잡혀있기 때문)
					let delYn = ''
					let delMydtCusno = ''
					if(this.modifyYn == 'Y') {
						if(this.remove(this.trDt) != this.remove(this.delTrDt) || this.vhcnoVal != this.delVhcnoVal) {
							delYn = '1'
							delMydtCusno = this.mydtCusno
							this.sqno = '' // 순번초기화
						}
					} else {
						delYn = ''
						delMydtCusno = ''
					}

					const config = {
						url: '/pd/ca/14s01',

						data: {"mydtCusno":this.mydtCusno
								,"vhcnoVal": this.vhcnoVal
								,"trDt" : this.remove(this.trDt)
								,"sqno": this.sqno
								,"carbkXpsTpDsc" : this.carbkXpsTpDsc
								,"carbkXpsTpDsnm" : this.carbkXpsTpDsnm
								,"carbkCtgrId":this.carbkCtgrId
								,"carbkCtgrnm":this.carbkCtgrnm
								,"tram" : this.remove(this.tram)
								,"trCntn" : this.trCntn
								,"memoCntn" : this.memoCntn // 진행상태코드 0:전체, 1:진행중, 2:종료
								,"odmtrDist" : this.remove(this.odmtrDist)
								,"oilgUpr":this.remove(this.oilgUpr)
								,"dataSrcDsc":this.dataSrcDsc
								,"inqKey":inqKey /* 지출내역 선택시 등록 */

								// 날짜변경시 처리용(수정시)
								,"delYn":delYn
								,"delMydtCusno":delMydtCusno
								,"delVhcnoVal":this.delVhcnoVal
								,"delTrDt":this.remove(this.delTrDt)
								,"delSqno":this.delSqno
								}
					};
					console.log('data >>>', config)
					
					apiService.call(config).then(response => {

						if(response.rspMsgC == '0000'){
							modalService.alert("저장되었습니다.").then(() => {
								// 등록화면 닫기
								this.close('reSelect')
							});
						} else {
							modalService.alert(response.rspMsgCntn).then(() => {
								//this.close(response);
							})
						}
					});
				}
			})
		},
		fn_deleteCarAccount() {
			const configConfirm = {
				content: ['해당 내역을 삭제하시겠습니까?'],
				title  : "",
			}

			modalService.confirm(configConfirm).then(text => {
				if(text == "예") {

					// 수기는 삭제가능
					// 그외는 삭제불가(수정은 가능)

					const config = {
						url: '/pd/ca/14d01',

						data: {"mydtCusno":this.mydtCusno
								,"vhcnoVal": this.vhcnoVal
								,"trDt" : this.remove(this.trDt)
								,"sqno": this.sqno
								}
					};
					
					apiService.call(config).then(response => {

						if(response.rspMsgC == '0000'){
							modalService.alert("삭제되었습니다.").then(() => {
								// 전체페이지 닫기
								this.close('reSelect')
							});
						} else {
							modalService.alert("삭제 중 오류가 발생하였습니다.").then(() => {
								//this.close(response);
							})
						}
					});
				}
			})
		},
		// 지출내역 조회
		fn_goPDCA1117() {
			let compName = PDCA1117

			var param = {}
			const config = {
				component: compName,
				params : param
			}

			modalService.openPopup(config).then((response) => {
				this.xpsBrkInfo = response || ''

				// 금액 및 날짜세팅
				this.tram = keyupNumFormat(this.xpsBrkInfo.tram)
				this.trDt = dateFormat(this.xpsBrkInfo.trDt, 'YYYY-MM-DD')

				// 기준일자기준 최종주행거리 조회
				this.fn_getRbfOdmtrDist()
			})
		},
		// 리터당금액 - 소수점 자리 체크(최대1자리)
		chkOilgUpr() {
			let pattern1 = /^[0-9.]*$/;
			if(!pattern1.test(this.oilgUpr)){
				this.oilgUpr = this.oilgUpr.replace(/[^0-9.]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'');
			} else {
				if(this.oilgUpr.length == 1){
					if(this.oilgUpr == '.'){
						this.oilgUpr = this.oilgUpr.slice(0, -1);
					}
				} else {
					if(this.oilgUpr.split(".").length > 2){
						this.oilgUpr = this.oilgUpr.slice(0, -1);
					} else {
						if(this.oilgUpr.split(".").length == 1) { //소숫점이 없을 때
                            if(this.oilgUpr[0] == '0') {
                                this.oilgUpr = this.oilgUpr.slice(0, -1);
							}
                            if(this.oilgUpr.length > 15){
                                this.oilgUpr = this.oilgUpr.slice(0, -1);
							}
                            if(this.oilgUpr.length == 2){
                                if(this.oilgUpr[0] == 0 && this.oilgUpr[1] == 0){
                                    this.oilgUpr = this.oilgUpr.slice(0, -1);
                                }
                            }
						} else {
                            if(this.oilgUpr.length == 2){
                                if(this.oilgUpr[0] == 0 && this.oilgUpr[1] == 0){
                                    this.oilgUpr = this.oilgUpr.slice(0, -1);
                                }
                            } else {
                                let pattern2 = /^\d*[.]\d{2}$/;
                                if(pattern2.test(this.oilgUpr)){
                                    this.oilgUpr = this.oilgUpr.slice(0, -1);
                                }
                            }
						}
					}
				}
			}
		},
		// 기준일자기준 최종주행거리 조회(날짜선택시 호출)
		// 지출내역선택시, 수기등록시 날짜 등록시
		fn_getRbfOdmtrDist() {

			// 날짜수정
			let sqno

			// 차계부 수정시 날짜, 자동차 변경시 sqno ==> 0으로 세팅
			// 그외 기존 sqno로 세팅
			if(this.modifyYn == 'Y') {
				if(this.remove(this.trDt) != this.remove(this.delTrDt) || this.vhcnoVal != this.delVhcnoVal) {
					sqno = 0 // 순번초기화
				} else {
					sqno = this.sqno
				}
			} else {
				sqno = 0
			}
			
			console.log('거래일자 : ', this.trDt);
			console.log('거래번호 : ', sqno);
			
			
			const config = {
				url: '/an/ca/10ra1',

				data: {"mydtCusno":this.mydtCusno
						,"vhcnoVal": this.vhcnoVal
						,"trDt" : this.remove(this.trDt)
						,"sqno" : sqno
						}
			};

			apiService.call(config).then(response => {

				console.log('testData : ', response);

				this.rbfTrDt_14r03          = response.rbfTrDt          || ''
				this.rbfOdmtrDist_14r03     = response.rbfOdmtrDist     || 0
				this.nxTrDt_14r03           = response.nxTrDt           || ''
				this.nxOdmtrDist_14r03      = response.nxOdmtrDist      || 0
				this.rbfOilgDt_14r03        = response.rbfOilgDt        || ''
				this.rbfOilgOdmtrDist_14r03 = response.rbfOilgOdmtrDist || 0

				// 차계부 기준일자기준 유가정보 조회
				this.olprBasDt       = response.olprBasDt       || ''	// 유가기준일자
				this.oilC            = response.oilC            || ''	// 유류코드
				this.oilNm           = response.oilNm           || ''	// 유류명
				this.avgOlprAm       = response.avgOlprAm       || 0	// 평균유가금액
				this.bdCmprOlprRnf   = response.bdCmprOlprRnf   || 0	// 전일대비유가등락률
				this.xpsOilgChggRgYn = response.xpsOilgChggRgYn || ''	// 차계부주유충전비등록여부

				if(this.rbfOdmtrDist_14r03 == 0) {
					this.rbfOdmtrDist = '0'
				} else {
					this.rbfOdmtrDist = keyupNumFormat(this.rbfOdmtrDist_14r03)
				}

				// 평균유가금액(=주유단가)
				if(this.avgOlprAm == 0){
					this.oilgUpr = '0'
				}else{
					this.oilgUpr = keyupNumFormat(this.avgOlprAm)
				}
				
				// 이전 주행거리, 유가정보가 있으면 연비계산 함수 호출
				if(this.avgOlprAm > 0 && this.rbfOdmtrDist > 0){
					this.fn_setFuelEfficiency()
				}
			})
		},
        fn_popupCalendar(evt) {

			// 지출내역 선택하였으면 달력 선택 불가
			if(this.xpsBrkInfo !== undefined && this.xpsBrkInfo !== null && this.xpsBrkInfo !== '') {
				return false;
			}

			let tmpDt = ""
			//const toDay = dateFormat(new Date(), "YYYY-MM-DD")
			if (this.trDt !== undefined && this.trDt !== null && this.trDt !== '') 
			{
				tmpDt = this.trDt
			}else{
				tmpDt = ''
			}

			console.log('maxDate : ', this.toDay)

			// 미래날짜 선택 못하게 처리
			const config = {
								pDate   : tmpDt,
								minDate : '',
								maxDate : this.toDay
							}
            
            modalService.calendarPopup(config).then(response => {

                if(response !== undefined && response !== null && response !== '')
                {
                    evt.target.value = dateFormat(response, "YYYY-MM-DD")
					this.trDt = evt.target.value
					this.fn_getRbfOdmtrDist()
					this.moveNextTag(evt)
                }
            })

		},
		// 한글금액표시
		fn_hanValue(amount) {
			const koreanUnits = ['', '만', '억', '조']
			let han_amount = parseInt(amount.split(',').join(''))
			let answer     = ''
			let unit       = 10000
			let index      = 0
			let division   = Math.pow(unit, index)

			while (Math.floor(han_amount / division) > 0) {
				const mod = Math.floor(han_amount % (division * unit) / division)
				if (mod) {
					const modToString = mod.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
					answer = `${modToString}${koreanUnits[index]} ` + answer
				}
				division = Math.pow(unit, ++index)
			}
			return (answer + "원").replace(" 원", "원")
		},

		// 입력 텍스트 삭제
		fn_delStr(colNm) {

			
			console.log('colNm : ', colNm);

			if (colNm == "tram") {
				this.tram = ''   // 금액				
			}
		},	

		// 금액 임렵 폼 버튼
		fn_btnAddMoney(money){
			let tmpTram  = Number(this.remove(this.tram))		// 금액
			tmpTram += money * 10000

            // 최대금액 999,999,999 이상인 경우 최대값 고정
            if(tmpTram >= 999999999) {
                tmpTram = 999999999;
            }

			this.tram = String(tmpTram);
			if (this.carbkXpsTpDsc == '2') this.fn_setFuelEfficiency()			
			this.addComma('tram', '');
		},
	},
	
    mounted() {
		this.initComponent(this.params)
		
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        popupMixin
        ,commonMixin
    ],
}
</script>