<!--
/*************************************************************************
* @ 서비스경로 : 제휴서비스 > 맞춤부동산
* @ 페이지설명 : 제휴서비스 > 맞춤부동산 > 나의자산조회
* @ 파일명     : src/views/page/AN/RE/ANRE120/ANRE120.vue
* @ 작성자     : CS528053
* @ 작성일     : 2022-07-25
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-25              CS528053              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1 class="">나의자산 조회</h1>
		</div>
		
		<div class="popup_content com_no_bottom">
			<div class="com_inner">
				<div class="custom_box">
					<strong class="com_pop_tit01 custom">보유 자산</strong>
					<div class="com_box_type01 com_box_list02">
						<div class="list_type_box toggle_list_box2">
							<div class="com_boxshadow_type01 open"  data-ui-toggle="box">
								<button type="button" class="view_btn" aria-expanded="true">
									<div class="new_tit_area">
										<div class="tit"><span>금융자산</span></div>
										<span class="total_price">
											<em class="num">{{addComma(nhTotAm + othTotAm + bankIvAcBaltt + efinIvAcBaltt)}}</em>
											<em class="unit">원</em>
										</span>
									</div>
								</button>
							</div>
							
							<ul class="list_type_02 view_cont">
								<li>
									<dl>
										<dt>
											<em>농축협 예/적금</em>
										</dt>
										<dd>
											<span class="com_price">
												<em class="num">{{addComma(Number(nhTotAm))}}</em><em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</li>
								<li>
									<dl>
										<dt>
											<em>타은행 예/적금</em>
										</dt>
										<dd>
											<span class="com_price">
												<em class="num">{{addComma(Number(othTotAm))}}</em><em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</li>
								<li>
									<dl>
										<dt>
											<em>펀드</em>
										</dt>
										<dd>
											<span class="com_price">
												<em class="num">{{addComma(Number(bankIvAcBaltt))}}</em><em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</li>
								<li>
									<dl>
										<dt>
											<em>증권</em>
										</dt>
										<dd>
											<span class="com_price">
												<em class="num">{{addComma(Number(efinIvAcBaltt))}}</em><em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</li>
							</ul>
						</div>
					</div>

					<div class="com_box_type01 com_boxsub_type01">
						<div class="list_type_box toggle_list_box2">
							<div class="com_boxshadow_type01 open"  data-ui-toggle="box">
								<button type="button" class="view_btn" aria-expanded="true">
									<dl class="tit_list">
										<dt><em>부동산</em><span class="com_icon_num custom">{{rlestBasList.length}}</span></dt>
										<dd>
											<span class="com_price">
												<em class="" v-html="fn_hanValue_classDiff(rlestTotAm)"></em>
												<!-- <em class="">{{rlestTotAm}}</em> -->
											</span>
										</dd>
									</dl>
								</button>
							</div>
							<ul class="list_type_02 list_subtype01 view_cont">
								<li v-for="(rlestBas, idx) in rlestBasList" :key="'rlest_'+idx">
									<dl>
										<div>
											<em>{{rlestBas.aptHcxnm}}</em>
											<span class="icon_mint">{{getComCodeNm('RLEST_RSD_FORM_DSC', rlestBas.rlestRsdFormDsc)}}</span>
											<span class="icon_mint" v-if="rlestBas.revnMnEn == '1'">임대중</span>
										</div>
									</dl>
									<ul class="depth_list3">
										<!-- 자가일때만 보임, 위티 실거래가 있는 경우에만 표시하고 없는 경우 한국부동산 시세로 표시 -->
										<li v-if="rlestBas.rlestRsdFormDsc == '1'">
											<a href="javascript:void(0);" role="button">
												<dl>
													<dt>
														<div><em>실거래가 </em></div>
													</dt>
													<dd>
														<span class="com_price">
															<!-- 위티 실거래가 있을 경우 -->
															<template v-if="rlestBas.uitiTrId != '' && rlestBas.uitiTrId != null && rlestBas.uitiTrId != undefined">
																<!-- 매매일 경우 -->
																<template v-if="rlestBas.uitiTrTpnm == 'deal' || rlestBas.uitiDlPr > 0">
																	<em v-html="fn_hanValue_classDiff(rlestBas.uitiDlPr, 'com_point_darkblue', 'won')"></em>
																</template>

																<!-- 전세일 경우 -->
																<template v-else-if="rlestBas.uitiTrTpnm == 'lease' || rlestBas.uitiTrTpnm == 'rent' || rlestBas.uitiGrmy > 0">
																	<em v-html="fn_hanValue_classDiff(rlestBas.uitiGrmy, 'com_point_darkblue', 'won')"></em>
																</template>
															</template>

															<!-- 위티 실거래가 없을 경우, 한국부동산 시세로 대체 -->
															<template v-else>
																<em class="" v-html="fn_hanValue_classDiff(rlestBas.genDlAm)"></em>
															</template>
															<!-- <em class="">{{rlestBas.genDlAm}}</em> -->
														</span>
													</dd>
												</dl>
											</a>
										</li>
										<!-- 매매금액 혹시 몰라서 hide로 넣어둠, 추후 필요 없을 시 제거 예정 -->
										<li style="display:none;">
											<a href="javascript:void(0);" role="button">
												<dl>
													<dt>
														<div><em>매매금액 </em></div>
													</dt>
													<dd>
														<span class="com_price">
															<em class="" v-html="fn_hanValue_classDiff(rlestBas.rlestTrPr)"></em>
															<!-- <em class="">{{rlestBas.rlestTrPr}}</em> -->
														</span>
													</dd>
												</dl>
											</a>
										</li>

										<!-- 자가이거나 부동산 물건구분코드가 토지/농지(6), 상가(7), 기타(9)인 경우일 때만 표시, 값이 없으면 100% -->
										<li v-if="rlestBas.rlestRsdFormDsc == '1' || rlestBas.rlestTngDsc == '6' || rlestBas.rlestTngDsc == '7' || rlestBas.rlestTngDsc == '9'">
											<a href="javascript:void(0);" role="button">
												<dl>
													<dt>
														<div><em>지분율 </em></div>
													</dt>
													<dd>
														<span class="com_price">
															<em class="num">{{rlestBas.commQtart || 100}}</em><em class="unit">%</em>
														</span>
													</dd>
												</dl>
											</a>
										</li>

										<!-- 전세/월세일 경우에만 표시 -->
										<li v-if="rlestBas.rlestRsdFormDsc == '2' || rlestBas.rlestRsdFormDsc == '3'">
											<a href="javascript:void(0);" role="button">
												<dl>
													<dt>
														<div><em>보증금 </em></div>
													</dt>
													<dd>
														<span class="com_price">
															<em class="" v-html="fn_hanValue_classDiff(rlestBas.grmy)"></em>
															<!-- <em class="">{{rlestBas.grmy}}</em> -->
															<template v-if="rlestBas.grmy == 0 || rlestBas.grmy == ''">
																<em><em class="num">0</em><em class="unit">원</em></em>
															</template>
														</span>
													</dd>
												</dl>
											</a>
										</li>

										<!-- 월세일 경우에만 표시 -->
										<!-- <li v-if="rlestBas.rlestRsdFormDsc == '3'">
											<a href="javascript:void(0);" role="button">
												<dl>
													<dt>
														<div><em>월세 </em></div>
													</dt>
													<dd>
														<span class="com_price">
															<em class="" v-html="fn_hanValue_classDiff(rlestBas.mmr)"></em>
														</span>
													</dd>
												</dl>
											</a>
										</li> -->

										<!-- 자가이고 임대인 경우 표시 -->
										<li v-if="rlestBas.rlestRsdFormDsc == '1' && rlestBas.revnMnEn == '1'">
											<a href="javascript:void(0);" role="button">
												<dl>
													<dt>
														<div><em>보증금 </em></div>
													</dt>
													<dd>
														<span class="com_price">
															<em class="" v-html="fn_hanValue_classDiff(rlestBas.grmy)"></em>
															<template v-if="rlestBas.grmy == 0 || rlestBas.grmy == ''">
																<em><em class="num">0</em><em class="unit">원</em></em>
															</template>
														</span>
													</dd>
												</dl>
											</a>
										</li>

										<!-- 자가일 경우에만 표시 -->
										<li v-if="rlestBas.rlestRsdFormDsc == '1'">
											<a href="javascript:void(0);" role="button">
												<dl>
													<dt>
														<div><em>팔때 사용가능금액</em></div>
													</dt>
													<dd>
														<span class="com_price"> <!-- 실거래가, 지분율, 보증금, 세입자여부 -->
															<!-- 위티 실거래가 있을 경우 -->
															<template v-if="rlestBas.uitiTrId != '' && rlestBas.uitiTrId != null && rlestBas.uitiTrId != undefined">
																<em class="" v-html="fn_hanValue_classDiff(calcSelAbleAm(rlestBas.uitiDlPr, rlestBas.commQtart, rlestBas.grmy, rlestBas.revnMnEn))"></em>
															</template>

															<!-- 위티 실거래가 없을 경우 한국부동산 시세로 계산 -->
															<template v-else>
																<em class="" v-html="fn_hanValue_classDiff(calcSelAbleAm(rlestBas.genDlAm, rlestBas.commQtart, rlestBas.grmy, rlestBas.revnMnEn))"></em>
															</template>
															<!-- <em class="">{{rlestBas.genDlAm}}</em> -->
														</span>
													</dd>
												</dl>
											</a>
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
				
					<div class="com_box_type01 com_box_list02">
						<div class="list_type_box toggle_list_box2">
							<div class="com_boxshadow_type01 open"  data-ui-toggle="box">
								<button type="button" class="view_btn" aria-expanded="true">
									<div class="new_tit_area">
										<div class="tit"><span>대출총액</span></div>
										<span class="total_price">
											<!-- 마이너스 대출 식 제거 -->
											<!-- <em class="num">{{addComma(creditAmnt + mortagageOutAmnt + minusAcTotAm)}}</em> -->
											<em class="num">{{addComma(creditAmnt + mortagageOutAmnt)}}</em>
											<em class="unit">원</em>
										</span>
									</div>
								</button>
							</div>
							
							<ul class="list_type_02 view_cont">
								<li>
									<dl>
										<dt>
											<em>신용대출잔액</em>
										</dt>
										<dd>
											<span class="com_price">
												<em class="num">{{addComma(Number(creditAmnt))}}</em><em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</li>
								<li>
									<dl>
										<dt>
											<em>담보대출잔액</em>
										</dt>
										<dd>
											<span class="com_price">
												<em class="num">{{addComma(Number(mortagageOutAmnt))}}</em><em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</li>
								<!-- <li>
									<dl>
										<dt>
											<em>마이너스대출</em>
										</dt>
										<dd>
											<span class="com_price">
												<em class="num">{{addComma(Number(minusAcTotAm))}}</em><em class="unit">원</em>
											</span>
										</dd>
									</dl>
								</li> -->
							</ul>
						</div>
					</div>

					<!-- 금융자산 + 부동산자산 - 대출총액이 해당 아파트 시세 이하인 경우에만 출력 -->
					<template v-if="isLowPrice">
						<div class="com_box_type01 com_box_list01 custom_box_link">
							<div class="list_type_box">
								<a href="javascript:void(0);" role="button" @click.prevent="connectLink('PDPD1107')">
									<div class="new_tit_area">
										<div class="tit"><span>예상 대출가능금액 확인해 보기</span></div>
									</div>
								</a>					
							</div>
						</div>
						<div class="com_box_type01 com_box_list01 custom_box_link">
							<div class="list_type_box">
								<a href="javascript:void(0);" role="button" @click.prevent="connectLink('cokLink')">
									<div class="new_tit_area">
										<div class="tit"><span>대출추천상품 알아보기</span></div>
									</div>
								</a>					
							</div>
						</div>
						<div class="com_box_type01 com_box_list01 custom_box_link">
							<div class="list_type_box">
								<a href="javascript:void(0);" role="button" @click.prevent="connectLink('PDMY2005')">
									<div class="new_tit_area">
										<div class="tit"><span>내집마련 목표세우기</span></div>
									</div>
								</a>					
							</div>
						</div>
					</template>
				
					<div class="custom_box">
						<strong class="com_pop_tit01 custom mt30">안내사항</strong>
						<p class="dot_msg">
							위 산출금액은 고객님이 등록한 마이데이터 계좌의 자산을 바탕으로 집계한 금액입니다. 보다 정확한 금액을 확인하시려면 자산을 추가/수정해 주세요.
						</p>
						<p class="dot_msg">
							부동산 자산은 아파트만을 대상으로 합니다. 
						</p>
						<p class="dot_msg">
							부동산 팔때 사용가능금액 = (실거래가*지분율)-보증금
						</p>
					</div>
					<div>
						<div class="com_btn_area mt37">
							<a href="javascript:void(0);" class="com_btn_round" @click.prevent="connectLink('ASTA2001')"><!-- asis ASAS0001 => ASAC1001 => ASTA2001-->
								<span class="btn_plus black">나의 자산 조회	&middot; 연결하기</span>
							</a>
						</div>
					</div>
				</div>

			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="closeAll()"><span class="blind">팝업닫기</span></a>		
	</div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import commonService from '@/service/commonService'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import {numberFormat} from '@/utils/number' // keyupNumFormat,

import PDPD1107 from '@/views/page/PD/PD/PDPD1107/PDPD1107'     // 대출한도조회 팝업
import PDMY2005 from '@/views/page/PD/MY/PDMY2005/PDMY2005'     // 나의목표 > 목표등록 팝업
//import PDMY1102 from '@/views/page/PD/MY/PDMY1102/PDMY1102'     // 나의목표 > 목표등록 팝업(AS-IS)

export default {
	name : "ANRE2202",
	data: () => {
        return {
			nhTotAm 			: '', 	// 농축협 예적금 합계
			othTotAm 			: '', 	// 타은행 예적금 합계
			bankIvAcBaltt 		: '', 	// 펀드 잔액 합계
			efinIvAcBaltt 		: '', 	// 증권 잔액 합계

			creditAmnt         	: '',	// 신용대출 잔액 합계
            mortagageOutAmnt   	: '',	// 담보대출 잔액 합계
			//minusAcTotAm		: '',	// 마이너스대출 합계

			rlestBasList 		: [],	// 부동산 보유 기본 목록
			rlestTotAm			: 0, 	// 부동산 총 금액
			isLowPrice			: false // 링크 버튼 노출 여부(모창에서 전달)
		}
	},
	props : {

    },
    mixins: [
        popupMixin
        ,commonMixin
	],
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
	},
	computed : {
		
	},
    methods: {
		// 초기화
		initComponent(param = {}) {	// 파라미터 필요 시 추가, param = {}
			this.isLowPrice = param.isLowPrice || false;	// 링크 버튼 노출 여부

			this.getAssetsAcToAmData();
			this.getInvestData();
			this.getLoanData();
			this.getRlestBasListData();
		},

		// 금융 및 대출 계좌 합계 조회
		getAssetsAcToAmData() {
			const config = {
				url : "/an/re/01ra1",
				data: {
					"mydtCusno" : this.getUserInfo('mydtCusno')
				}
			};
			apiService.call(config).then(response =>{
				this.nhTotAm		= response.nhTotAm || 0;			// 농축협계좌합계
				this.othTotAm		= response.othTotAm || 0;			// 타은행계좌합계
				//this.minusAcTotAm	= response.minusAcTotAm || 0;		// 마이너스대출계좌합계
			});
		},

		// 투자 잔액 합계 조회(펀드/증권)
		getInvestData() {
			const config = {
				url : "/as/iv/01r01",
				data: {
					"mydtCusno" : this.getUserInfo('mydtCusno')
				}
			}
			apiService.call(config).then(response =>{
				this.respInfo = response

				this.bankIvAcBaltt = this.respInfo.bankIvAcBaltt || 0   // 펀드 잔액 합계
				this.efinIvAcBaltt = this.respInfo.efinIvAcBaltt || 0   // 증권 잔액 합계

				this.$nextTick(() => {
					this.callJQueryFncExcute()
				})
			})
		},
		
		// 대출 잔액 합계 조회(신용대출, 담보대출)
		getLoanData() {
			const config = {
				//url: '/as/ln/01r01',
				url : '/an/re/04ra1',
                data: {
					"mydtCusno" : this.getUserInfo('mydtCusno')
                }
            };
            apiService.call(config).then(response => {
                this.creditAmnt         = response.creditAmnt || 0			// 신용대출 잔액 합계
				this.mortagageOutAmnt   = response.mortagageOutAmnt || 0	// 담보대출 잔액 합계

                this.callJQueryFncExcute()
            });
		},

		// 부동산 보유 기본 목록 조회
		getRlestBasListData() {
			const config = {
				url : "/co/re/02ra1",
				data: {
					"mydtCusno" : this.getUserInfo('mydtCusno'),
					"mmoInpYn"	: "0"		// 0:아파트, 1:직접입력, '':전체
				}
			};
			apiService.call(config).then(response =>{
				this.rlestBasList = response.rlestBasList;		// 부동산 보유 기본 목록
				
				// 부동산 총 금액 계산(팔때 사용금액, 보증금)
				for(let i=0; i<this.rlestBasList.length; i++) {
					let calcGenDlAm = 0;								// 실거래가
					let calcCommQtart = 0;								// 공동지분율
					let calcGrmy = 0;									// 세입자 보증금
					let calcTot = 0;									// 총금액

					calcCommQtart = this.rlestBasList[i].commQtart > 0 ? this.rlestBasList[i].commQtart : 100;

					// 위티 실거래가 있을 경우 실거래가로, 없을 경우 한국부동산 시세로
					if(this.rlestBasList[i].uitiTrId) {
						calcGenDlAm = this.rlestBasList[i].uitiDlPr;
					} else {
						calcGenDlAm = this.rlestBasList[i].genDlAm;
					}

					// 세입자여부로 보증금 값 세팅
					if(this.rlestBasList[i].revnMnEn == '1')	calcGrmy = this.rlestBasList[i].grmy;
					else calcGrmy = 0;

					if(this.rlestBasList[i].rlestRsdFormDsc == "1") {
						// 자가일 때는 실거래가로 계산 (실거래가 * 지분율 - 보증금)
						calcTot = calcGenDlAm * (calcCommQtart / 100) - calcGrmy;
					} else {
						// 전세/월세일 때는 보증금으로 계산
						calcTot = this.rlestBasList[i].grmy;
					}
					this.rlestTotAm += Number(calcTot);
				}
				console.log("ANRE2202 부동산 총금액 = ", this.rlestTotAm)
			});
		},

		// 링크 연결
		connectLink(pageId) {
            if(pageId == 'PDPD1107') {			// 대출한도조회 팝업 연결
                const config = {
                    component: PDPD1107,
                    params : {}
				};
				modalService.openPopup(config).then(() => {

				});
			} else if(pageId == 'cokLink') {	// 콕뱅크 URL 연결
				// 임시로 URL 변경
				const config = {
					name : 'PDPD1001'
					//name: 'PDPD1101'	// asis 반영시
				}
				commonService.movePage(config);
				this.closeAll();
				//modalService.alert("콕뱅크 URL 전달받은 후 링크 연결 예정입니다");
				//window.open("https://smartcard.nonghyup.com");
				return;
			} else if(pageId == 'PDMY2005') {	// 금융생활 > 목표관리 > 목표등록 > 버킷리스트로 이동
				const config = {
					component: PDMY2005,
					//component : PDMY1102,	// AS-IS 이관 시 AS-IS 소스로 연결
                    params : {}
				};
				modalService.openPopup(config).then(() => {

				});
			} else if(pageId == 'ASTA2001') {	// 나의자산 > 전체 탭 화면 연결 (asis 시 ASAS0001 => ASAC1001 => ASTA2001)
				const config = {
					name: pageId
				}
				commonService.movePage(config);
				this.closeAll();
			}
		},

		// 금액 단위 , 표시
        addComma(nStr){
            return nStr.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
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

            return codeObj.comnCExpl;
		},
		
		// 팔때 사용금액 계산
		calcSelAbleAm(genDlAm, commQtart, grmy, revnMnEn) {
			let selAm = 0;
			
			commQtart = commQtart > 0 ? commQtart : 100;	// 지분율 0이거나 값이 없으면 100으로 간주
			grmy = revnMnEn == '1' ? grmy : 0;				// 세입자가 없으면 보증금 0으로 간주

			// 팔때 사용금액 = 실거래가 * 지분율 - 보증금
			selAm = (genDlAm * (commQtart / 100)) - grmy;

			return selAm;
		},
		// 금액 한글명, 한글/숫자 class 다르게 적용(시세)
		fn_hanValue_classDiff(value) {
			const unit = ['', '만', '억', '조', '경']
            const splitAmt = 10000
            const splitCnt = unit.length

            let resultArray = []
            let resultString = ""

            for(let i=0; i<splitCnt; i++) {
				//let rst = (value % Math.pow(splitAmt, i+1)) / Math.pow(splitAmt, i)
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
                    resultString = ' <em class="num">' + String(numberFormat(resultArray[j])) + '</em><em class="unit">' + unit[j] + '원</em>' + resultString
                } else {
                    resultString = ' <em class="num">' + String(numberFormat(resultArray[j])) +'</em><em class="unit">'+ unit[j] + '</em> ' + resultString
                }
			}

            return resultString
		}
	}
}
</script>