<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나의 목표 > 내집마련 목표 > 취득세
* @ 페이지설명 : 취득세 계산 팝업
* @ 파일명     : src/views/page/PD/MY/PDMY2042/PDMY2042.vue
* @ 작성자     : CS515937
* @ 작성일     : 2021-08-20
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-08-20              CS515937              최초작성
* 2022-07-05              CS528053              고도화 파일명 변경(PD/TC/PDTC0002/PDTC0002.vue -> PD/MY/PDMY1009/PDMY1009.vue)
* 2023-08-04              CS533453              고도화 파일명 변경(PDMY1009.vue -> PDMY2042.vue)
*************************************************************************/
-->
<template>
    <div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>취득세 계산</h1>
		</div>
		
		<div class="popup_content com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<div class="custom_box">
					<div class="com_inputarea_type07 com_inputarea_type007">
						<div class="com_input_type01 com_word2">
							<input type="tel" id="com_input01" v-model="purchasedAmt" required maxlength="11" @keyup="addComma('purchasedAmt', $event)" ref="purchasedAmt" placeholder="주택 취득 금액을 입력하세요 " title="주택 취득 금액을 입력하세요 ">
							<label for="com_input01">
								<em><span class="blind">필수입력</span></em>
								<span class="txt_label_x">주택 취득 금액</span>
							</label>

							<div class="del_txt">
								<a href="javascript:void(0);" class="com_btn_delete2" style="display: none;" @click.prevent="delAmt('purchasedAmt')" v-show="purchasedAmt.length > 0"><span class="blind">삭제</span></a>
								<span class="com_inputtxtright2">만원</span>
							</div>
							<p class="com_sum" v-if="purchasedAmt">{{fn_hanValue(purchasedAmt)}}</p>

							<!-- 버튼(5만, 10만, 100만 1000만) -->
							<div class="btn_price_group">
								<button type="button" class="btn_price" @click.prevent="btnPriceEvt(5, 'purchasedAmt')">+<strong>5</strong>만</button>
								<button type="button" class="btn_price" @click.prevent="btnPriceEvt(10, 'purchasedAmt')">+<strong>10</strong>만</button>
								<button type="button" class="btn_price" @click.prevent="btnPriceEvt(100, 'purchasedAmt')">+<strong>100</strong>만</button>
								<button type="button" class="btn_price" @click.prevent="btnPriceEvt(1000, 'purchasedAmt')">+<strong>1000</strong>만</button>
							</div>
						</div>
					</div>
				
					<ul class="view_box custom_view_box custom_pd tooltip_toggle_box01 custom_card">
						<li>
							<dl>
								<dt>
									<em>주택 면적 85m² 초과 여부</em>
								</dt>
								<dd>
									<span class="cmm-switch custom-switch">
										<input type="checkbox" id="check01" v-model="isChecked" @change="getData" role="switch">
										<label for="check01"><em class="blind">주택면적초과여부</em></label>
									</span>
								</dd>
							</dl>
						</li>
					</ul>

					<div class="com_btn_area"><a href="javascript:void(0);" class="com_btn_round com_btn_round01" :style="isInputed" @click.prevent="getAcqTax(purchasedAmt)"><span class="btn_calculation">계산하기</span></a></div>

                    <!-- 계산 후 표시 -->
                    <template v-if="isComputed">
                        <div class="titbox_type01 style_up">
                            <strong class="com_box_tit01">취득세 계산결과</strong>
                        </div>

                        <!-- 취득세 / 지방교육세 / 농어촌특별세 -->
                        <div class="com_box_type01 com_box_list03 box_shadow01">
                            <ul class="list_type_02">
                                <li>
                                    <dl>
                                        <dt>
                                            <div>
                                                <em>취득세</em>
                                            </div>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{acqTax | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                    <span class="txt_etc">
                                        {{description}}
                                        <!-- <em class=""></em> -->
                                    </span>
                                </li>
                                <li>
                                    <dl>
                                        <dt>
                                            <div>
                                                <em>지방교육세</em>
                                            </div>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{localEduTax | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                    <span class="txt_etc">
                                        취득세의 <em class="num">10</em>%
                                    </span>
                                </li>
                                <li v-if="isChecked">
                                    <dl>
                                        <dt>
                                            <div><em>농어촌특별세</em></div>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{ruralSpecTax | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                    <span class="txt_etc">
                                        취득 금액의 <em class="num">0.2</em>%
                                    </span>
                                </li>
                            </ul>
                            <div class="total_list">
                                <div>
                                    <em>총 납부 금액</em>
                                </div>
                                <span class="com_price com_price02">
                                    <em class="num com_point_darkblue">{{totalAmt | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                        </div>
                        <!--// 취득세 / 지방교육세 / 농어촌특별세 -->
                        <ul class="bl_dot_list one_register_list">
                            <li>계산 결과는 비조정대상지역의 <em class="num">1</em>세대 <em class="num">1</em>주택 매매 기준으로 산정되었습니다.</li>
                        </ul>
                    </template>
				</div>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
</template>
<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import {keyupNumFormat} from '@/utils/number'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'

export default {
    name : "PDMY2042",
    data : () => {
        return {
            isFirstAppear   : true,         // 최초진입 여부
            isChecked       : false,        // 주택면적 85m2 초과여부
            purchasedAmt    : "",           // 주택 취득 금액
            acqTax          : 0,            // 취득세
            localEduTax     : 0,            // 지방교육세
            ruralSpecTax    : 0,            // 농어촌특별세
            totalAmt        : 0,            // 총 납부금액
            description     : "",           // 취득세 
            isComputed      : false,        // 계산 후 결과 표시 flag
        }
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    computed : {
        isInputed() {
            return this.isFirstAppear == true ? (this.purchasedAmt.length > 0 ? "" : "display:none") : ""
        },
        // forDelete() {
        //     return this.purchasedAmt.length > 0 ? "focusON focusforce" : ""
        // }
    },
    mixins : [
        commonMixin,
        popupMixin
    ],
    methods : {
        initComponent() {
            this.setFocus('purchasedAmt')
        },
        getData() {
            if(this.isComputed) {
                this.getAcqTax(this.purchasedAmt)
            }
        },

        // 금액 천단위 쉼표 표시
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
                case 'purchasedAmt' :
                    this.purchasedAmt = this.$refs[refNm].value;
                    break;
            }

            if(e.keyCode === 8) {
                this.$nextTick(()=>{
                    this.$refs[refNm].focus()
                    this.$refs[refNm].setSelectionRange(selectionStartPos,selectionEndPos)
                })
            }
        },

        // 한글금액표시
        fn_hanValue(amount) {
            const koreanUnits = ['', '만', '억', '조']
            let han_amount = parseInt(amount.split(',').join('')) * 10000   // 만원 단위 화면
            let answer = ''
            let unit = 10000
            let index = 0
            let division = Math.pow(unit, index)

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

        delAmt(str) {
            this.purchasedAmt = ""
            this.setFocus(str)
        },

        setFocus(str) {
            this.$nextTick(() => {
                this.$refs[str].focus()
            })
        },

        // 취득세 계산
        getAcqTax(amount) {
            // 주택 취득 금액에 따른 과세 표준
            // 6억원 이하 : 1.0%, 6억원 초과 9억원 이하 : (주택취득금액 * 2/3억 -3)* 1/100, 9억원 초과 : 3.0%
            let calculAmt = parseInt(amount.split(',').join('')) * 10000

            // 입력 금액 제한 100만 이상
            if(calculAmt >= 1000000) {
                if(calculAmt <= 600000000) { 
                    this.acqTax = calculAmt * 0.01
                    this.description = "6억원 이하 1.0%"
                }
                else if(600000000 < calculAmt && calculAmt <= 900000000) {
                    let intRate = (calculAmt * 2 / 300000000 - 3).toFixed(2) * 1 / 100
                    this.acqTax = calculAmt * intRate
                    this.description = "6억원 초과 9억원 이하 " + String(intRate * 100) + "%"
                }
                else if(calculAmt > 900000000) {
                    this.acqTax = calculAmt * 0.03
                    this.description = "9억원 초과 3.0%"
                }

                // 지방교육세 : 적용세율의 10%(소숫점 3자리)
                this.localEduTax = this.acqTax / 10
                // 농어촌 특별세 : 면적 85m2 이하 : 0원, 초과 : 취득가액의 0.2%
                this.ruralSpecTax = this.isChecked ? calculAmt * 0.002 : 0
                // 총 납부금액
                this.totalAmt = this.acqTax + this.localEduTax + this.ruralSpecTax

                this.isFirstAppear = false
                this.isComputed = true
            }
            else {
                modalService.alert("취득금액은 100만원 이상<BR>입력하셔야 합니다.", "", "확인")
            }
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
        }
    }
}
</script>