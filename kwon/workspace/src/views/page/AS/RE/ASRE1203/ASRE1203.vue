<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부동산 > 재산세 계산기
* @ 페이지설명 : 재산세 계산 팝업
* @ 파일명     : src/views/page/AS/RE/ASRE1203/ASRE1203.vue
* @ 작성자     : CS515937
* @ 작성일     : 2021-08-27
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-08-27              CS515937              최초작성
* 2022-07-25              CS528205              고도화 파일명, UI 변경 및 고도화 개발(PDTC0001.vue -> ASRE1203.vue)
*************************************************************************/
-->
<template>
    <div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>재산세 계산</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
		
		<div class="popup_content com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<div class="custom_box">
					<div class="com_inputarea_type07">
						<div class="com_input_type01 com_word2 mb0 mt11">
							<!-- 주택 공시가격 -->
                            <!-- 최대 9자리까지 입력이지만 maxlength를 11으로 한 이유는 addComma에서 2자리를 가져가기 때문 -->
							<input type="tel" id="declaredValue" value=""  required="" placeholder="주택 공시가격을 입력하세요." maxlength="11" title="주택 공시가격을 입력하세요." v-model="declaredValue" @keyup="addComma($event)" ref="declaredValue">
							<label for="declaredValue">
								<em><span class="blind">필수입력</span></em>
								<span class="txt_label_x">주택 공시가격</span>
							</label>
							<!--// 주택 공시가격 -->
							<!-- 원 -->
							<div class="del_txt">
								<a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"  @click.prevent="delAmt('declaredValue')"><span class="blind">삭제</span></a>
								<span class="com_inputtxtright2">만원</span>
							</div>
							<!--// 원 -->
                            <p class="com_sum" v-if="declaredValue">{{fn_hanValue(declaredValue)}}</p>
							
							<!-- 2022-07-19 : title 속성 삽입 -->
							<!-- 버튼(5만, 10만, 100만 1000만) -->
							<div class="btn_price_group">
								<button type="button" class="btn_price" title="5만" @click.prevent="increaseAmt(5)">+<strong>5</strong>만</button>
								<button type="button" class="btn_price" title="10만" @click.prevent="increaseAmt(10)">+<strong>10</strong>만</button>
								<button type="button" class="btn_price" title="100만" @click.prevent="increaseAmt(100)">+<strong>100</strong>만</button>
								<button type="button" class="btn_price" title="1000만" @click.prevent="increaseAmt(1000)">+<strong>1000</strong>만</button>
							</div>
							<!--// 버튼(5만, 10만, 100만 1000만) -->
							<!--// 2022-07-19 : title 속성 삽입 -->
							
						</div>
					</div>
				
					<!-- 1세대 1주택 여부 / 도시지역분 포함 -->
					<ul class="view_box custom_view_box custom_pd tooltip_toggle_box01 custom_card">
						<li>
							<dl>
								<dt>
									<em>1세대 1주택 여부</em>
									<div class="custom_tooltip">
										<div class="com_tooltip_type02 com_tooltip_type03">
											<a href="javascript:void(0);" class="com_btn_info">
												<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
												<span class="arrow" style="display:none"></span>
											</a>
										</div>
										<div class="com_ballon_type01 com_ballon_type02" style="display:none;">
											<div>
												1세대가 공시가격 9억원 이하인 1주택 보유 시 2023년까지 한시적으로 특례세율이 적용됩니다.
												<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
											</div> <!-- 말풍선영역 -->
										</div>
									</div>
								</dt>
								<dd>
									<span class="cmm-switch custom-switch" >
										<input type="checkbox" id="check01" v-model="isOneHouse" @change="getData">
										<label for="check01"><em class="blind">부채선택</em></label>
									</span>
								</dd>
							</dl>
						</li>
						<li>
							<dl>
								<dt>
									<em>도시지역분 포함</em>
									<div class="custom_tooltip">
										<div class="com_tooltip_type02 com_tooltip_type03">
											<a href="javascript:void(0);" class="com_btn_info">
												<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
												<span class="arrow" style="display:none"></span>
											</a>
										</div>
										<div class="com_ballon_type01 com_ballon_type02" style="display:none;">
											<div>
												도시계획사업에 필요한 비용 충당을 위해 도시계획 구역 내 주택 소유자에게 부과하는 세금으로 대부분의 주택에 해당합니다. 
												<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
											</div> <!-- 말풍선영역 -->
										</div>
									</div>
								</dt>
								<dd>
									<span class="cmm-switch custom-switch">
										<input type="checkbox" id="check02" checked v-model="isLocalArea" @change="getData">
										<label for="check02"><em class="blind">부채선택</em></label>
									</span>
								</dd>
							</dl>
						</li>
					</ul>
					<!--// 1세대 1주택 여부 / 도시지역분 포함 -->
					<!-- button 계산하기 -->
					<div class="com_btn_area">
                        <a href="javascript:void(0);" :style="isInputed" class="com_btn_round com_btn_round01" @click.prevent="getPropertyTax(declaredValue)">
                            <span class="btn_calculation">계산하기</span>
                        </a>
                    </div>
					<!--// button 계산하기 -->
                    
                    <template v-if="isComputed">
                        <!-- 재산세 계산결과 -->
                        <div class="titbox_type01 style_up mt50">
                            <strong class="com_box_tit01">재산세 계산결과</strong>
                        </div>
                        <!--// 재산세 계산결과 -->
                        <!-- 과세표준 / 재산세 / 지방교육세 / 도시지역분 -->
                        <div class="com_box_type01 com_box_list03 box_shadow01">
                            <ul class="list_type_02">
                                <li>
                                    <dl>
                                        <dt>
                                            <div>
                                                <em>과세표준</em>
                                            </div>
                                        </dt>
                                        <dd>
                                            
                                            <span class="com_price">
                                                <em class="num">{{taxBase | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                    <span class="txt_etc">주택 공시가격의 <em class="num">60</em>%</span>
                                </li>
                                <li>
                                    <dl>
                                        <dt>
                                            <div>
                                                <em>재산세</em>
                                            </div>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{propertyTax | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                    <span class="txt_etc" v-html="description"></span>
                                    <!-- <span class="txt_etc"><em class="num">6</em>만원+(<em class="num">6000</em>만원초과금액의 <em class="num">0.15</em>%)</span> -->
                                </li>
                                <li>
                                    <dl>
                                        <dt>
                                            <div><em>지방교육세</em></div>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{localEduTax | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                    <span class="txt_etc">재산세 금액의 <em class="num">20</em>%</span>
                                </li>
                                <li>
                                    <dl>
                                        <dt>
                                            <div><em>도시지역분</em></div>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{localAreaTax | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                    <span class="txt_etc">과세표준 금액의 <em class="num">0.14</em>%</span>
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
					<!--// 과세표준 / 재산세 / 지방교육세 / 도시지역분 -->
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
import {numberFormat} from '@/utils/number'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'

export default {
    name : "ASRE1203",
    data : () => {
        return {
            isFirstAppear   : true,         // 최초진입 여부
            isOneHouse      : false,        // 1세대 1주택 여부
            isClicked1      : false,        // 툴팁1 클릭 여부
            isClicked2      : false,        // 툴팁2 클릭 여부
            isLocalArea     : true,         // 도시지역분 포함 여부, 디폴트는 선택(checked)
            declaredValue   : "",           // 주택 공시가격
            taxBase         : 0,            // 과세표준
            propertyTax     : 0,            // 재산세
            localEduTax     : 0,            // 지방교육세
            localAreaTax    : 0,            // 도시지역분
            totalAmt        : 0,            // 총 납부금액
            description     : "",           // 재산세 적용 금액 기준 문구
            isComputed      : false,        // 계산 후 결과 표시 flag
            hanValue       : "",           // 한글금액
            
            amtMaxLength    : 9
        }
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    computed : {
        isInputed() {
            return this.isFirstAppear == true ? (this.declaredValue.length > 0 ? "" : "display:none") : ""
        },
        // forDelete() {
        //     return this.declaredValue.length > 0 ? "focusON focusforce" : ""
        // },
    },
    mixins : [
        commonMixin,
        popupMixin
    ],
    methods : {
        initComponent() {
            this.setFocus('declaredValue')
        },
        getData() {
            // 한 번 계산한 이후에는 스위치 버튼 변경 시 자동계산
            if(this.isComputed) {
                this.getPropertyTax(this.declaredValue)
            }
        },
        
        setTooltip(str) {
            switch(str) {
                case 'open1' :
                    this.isClicked1 = true
                    break
                case 'close1' :
                    this.isClicked1 = false
                    break
                case 'open2' :
                    this.isClicked2 = true
                    break
                case 'close2' :
                    this.isClicked2 = false
                    break
                default :
                    break
            }
        },

        // 금액 천단위 쉼표 표시, 한글 금액 표시
        addComma(e="") {
            let amount = this.declaredValue
            let isInputEvent = (e !== undefined && e !== null && e !== "")
            let selectionStartPos = ""
            let selectionEndPos = "" 
            if(isInputEvent) {
                selectionStartPos = this.$refs.declaredValue.selectionStart
                selectionEndPos = this.$refs.declaredValue.selectionEnd
            }

            if(amount.length == 1 && amount == 0) {
                amount = amount.slice(0, -1)
            } else {
                amount = amount.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                amount = amount.split(",").join("")
                if(amount.length > this.amtMaxLength) {
                    amount = amount.slice(0, this.amtMaxLength)
                }

                if(amount.length > 0) {
                    amount = numberFormat(amount)
                }
            }
            if(event.keyCode === 8) {
                this.$nextTick(()=>{
                    this.$refs.declaredValue.focus()
                    this.$refs.declaredValue.setSelectionRange(selectionStartPos,selectionEndPos)
                })
            }

            if(isInputEvent) {
                e.target.value = amount
            }
            this.declaredValue = amount
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
            this.declaredValue = ""
            this.setFocus(str)
        },

        setFocus(str) {
            this.$nextTick(() => {
                this.$refs[str].focus()
            })
        },
        
        // 재산세 계산
        getPropertyTax(amount) {
            let intAmt = parseInt(amount.split(',').join('')) * 10000
            // 과세표준 : 주택 공시가격의 60%
            let calcAmt = intAmt * 0.6
            this.taxBase = calcAmt
            
            // 입력금액 100만원 이상 제한
            if(intAmt >= 1000000) {
                // 일반세율
                if(!this.isOneHouse) {
                    if(calcAmt <= 60000000) { 
                        this.propertyTax = calcAmt * 0.001
                        this.description = "<em class='num'>6</em>천만원 이하 0.1%"
                    }
                    else if(60000000 < calcAmt && calcAmt <= 150000000) {
                        this.propertyTax = 60000 + ((calcAmt - 60000000) * 0.0015)
                        this.description = "<em class='num'>6</em>만원 + (<em class='num'>6000</em>만원 초과금액의 <em class='num'>0.15</em>%)"
                    }
                    else if(150000000 < calcAmt && calcAmt <= 300000000) {
                        this.propertyTax = 195000 + ((calcAmt - 150000000) * 0.0025)
                        this.description = "<em class='num'>19</em>만<em class='num'>5</em>천원 + (<em class='num'>1</em>억<em class='num'>5</em>천만원 초과금액의 <em class='num'>0.25</em>%)"
                    }
                    else if(calcAmt > 300000000) {
                        this.propertyTax = 570000 + ((calcAmt - 300000000) * 0.004)
                        this.description = "<em class='num'>57</em>만원 + (<em class='num'>3</em>억원 초과금액의 <em class='num'>0.4</em>%)"
                    }
                }
                // 특별세율(1세대 1주택)
                else {
                    if(calcAmt <= 60000000) { 
                        this.propertyTax = calcAmt * 0.0005
                        this.description = "<em class='num'>6</em>천만원 이하 <em class='num'>0.05</em>%"
                    }
                    else if(60000000 < calcAmt && calcAmt <= 150000000) {
                        this.propertyTax = 30000 + ((calcAmt - 60000000) * 0.001)
                        this.description = "<em class='num'>3</em>만원 + (<em class='num'>6000</em>만원 초과금액의 <em class='num'>0.1</em>%)"
                    }
                    else if(150000000 < calcAmt && calcAmt <= 300000000) {
                        this.propertyTax = 120000 + ((calcAmt - 150000000) * 0.002)
                        this.description = "<em class='num'>12</em>만원 + (<em class='num'>1</em>억<em class='num'>5</em>천만원 초과금액의 <em class='num'>0.2</em>%)"
                    }
                    else if(calcAmt > 300000000) {
                        if(intAmt > 900000000) {
                            // 특례세율은 공시가격 9억원 이하인 경우에만 적용
                            this.propertyTax = 570000 + ((calcAmt - 300000000) * 0.004)
                            this.description = "<em class='num'>57</em>만원 + (<em class='num'>3</em>억원 초과금액의 <em class='num'>0.4</em>%)"
                        }
                        else {
                            this.propertyTax = 420000 + ((calcAmt - 300000000) * 0.0035)
                            this.description = "<em class='num'>42</em>만원 + (<em class='num'>3</em>억원 초과금액의 <em class='num'>0.35</em>%)"
                        }
                    }
                }
                // 지방교육세 : 재산세 금액의 20%
                this.localEduTax = this.propertyTax * 0.2
                // 도시지역분 : 과세표준 금액의 0.14%
                this.localAreaTax = this.isLocalArea ? calcAmt * 0.0014 : 0
                // 총 납부금액
                this.totalAmt = this.propertyTax + this.localEduTax + this.localAreaTax

                this.isFirstAppear = false
                this.isComputed = true
            }
            else {
                modalService.alert("공시가격은 100만원 이상<BR>입력하셔야 합니다.", "", "확인")
            }
        },
        increaseAmt(amt) {
            var tempAmt = this.declaredValue
            
            if (tempAmt === "") {
                tempAmt = amt
            } else {
                tempAmt = parseInt(tempAmt.split(',').join(''))
                tempAmt += amt

                var strMax = ""
                for (var i = 0; i < this.amtMaxLength; i++) {
                    strMax += "9"
                }
                tempAmt = Math.min(parseInt(strMax), tempAmt)
            }
            
            this.declaredValue = numberFormat(tempAmt)
        }
    }
}
</script>