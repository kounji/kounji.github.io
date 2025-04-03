<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나의 목표 > 내집마련 목표 > 중개수수료 계산
* @ 페이지설명 : 중개수수료 계산 팝업
* @ 파일명     : src/views/page/PD/MY/PDMY2043/PDMY2043.vue
* @ 작성자     : CS515937
* @ 작성일     : 2021-08-20
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-08-20              CS515937              최초작성
* 2022-07-05              CS528053              고도화 파일명 변경(PD/TC/PDTC0003/PDTC0003.vue -> PD/MY/PDMY1010/PDMY1010.vue)
* 2023-08-04              CS533453              고도화 파일명 변경(PDMY1010.vue -> PDMY2042.vue)
*************************************************************************/
-->
<template>
    <!-- full popup S -->
    <div class="full_popup renewal" id="full_popup_01">
		<div class="popup_header">    
			<h1>중개수수료 계산</h1>
		</div>
        <div class="popup_content com_no_bottom">
			<div class="com_inner">
                <div class="custom_box">
                    <div class="com_tabmenu_type03 custom_tab">
                        <ul role="tablist">
                            <li role="presentation" aria-controls="tab_01" :class="selectedTab == '01'?'on':''"><a href="javascript:void();" :aria-selected="selectedTab == '01'?'true':'false'" @click.prevent="selectTab('purchased')"><span>매매</span></a></li>
                            <li role="presentation" aria-controls="tab_02" :class="selectedTab == '02'?'on':''"><a href="javascript:void();" :aria-selected="selectedTab == '02'?'true':'false'" @click.prevent="selectTab('jeonse')"><span>전세</span></a></li>
                            <li role="presentation" aria-controls="tab_03" :class="selectedTab == '03'?'on':''"><a href="javascript:void();" :aria-selected="selectedTab == '03'?'true':'false'" @click.prevent="selectTab('monthlyPayment')"><span>월세</span></a></li>
                        </ul>
                    </div>

                    <!-- tab 에 따른 컨텐츠 표시 -->
                    <!-- 매매 : 거래금액, 전/월세 : 보증금, 월세 : 보증금 + 월세 -->
                    <!-- 매매 탭 -->
                    <div role="tabpanel" id="tab_01" class="cmm-tab-panel p0" :class="selectedTab == '01'?'on':''">
                        <div class="com_inputarea_type07">
                            <div class="com_input_type01 com_word2">
                                <input type="tel" id="purchasedAmt" v-model="purchasedAmt" required minlength="4" maxlength="11" @keyup="addComma($event,'purchasedAmt')" ref="purchasedAmt" placeholder="거래 금액을 입력하세요." title="거래 금액을 입력하세요.">
                                <label for="purchasedAmt"><span class="txt_label_x">거래 금액</span></label>
                                <div class="del_txt">
                                    <a href="javascript:void();" @click.prevent="delAmt('purchasedAmt')" class="com_btn_delete2"><span class="blind">삭제</span></a>
                                    <span class="com_inputtxtright2">만원</span>
                                </div>
                                <p class="com_sum" v-if="purchasedAmt">{{fn_hanValue(purchasedAmt)}}</p>
                                <div class="btn_price_group">
                                    <button type="button" class="btn_price" title="5만" @click.prevent="btnPriceEvt(5, 'purchasedAmt', 999999999)">+<strong>5</strong>만</button>
                                    <button type="button" class="btn_price" title="10만" @click.prevent="btnPriceEvt(10, 'purchasedAmt', 999999999)">+<strong>10</strong>만</button>
                                    <button type="button" class="btn_price" title="100만" @click.prevent="btnPriceEvt(100, 'purchasedAmt', 999999999)">+<strong>100</strong>만</button>
                                    <button type="button" class="btn_price" title="1000만" @click.prevent="btnPriceEvt(1000, 'purchasedAmt', 999999999)">+<strong>1000</strong>만</button>
                                </div>
                            </div>
                            <div class="com_btn_area"><a href="javascript:void();" class="com_btn_round com_btn_round01" :style="isInputed" @click.prevent="fn_getBrokerFees(selectedTab)"><span class="btn_calculation">계산하기</span></a></div>
                        </div>
                    </div>
                    <!-- 전세 탭 -->
                    <div role="tabpanel" id="tab_02" class="cmm-tab-panel p0" :class="selectedTab == '02'?'on':''">
                        <div class="com_inputarea_type07">
                            <div class="com_input_type01 com_word2">
                                <input type="tel" id="jeonseDepositAmt" v-model="jeonseDepositAmt" required minlength="4" maxlength="11" @keyup="addComma($event,'jeonseDepositAmt')" ref="jeonseDepositAmt" placeholder="보증금을 입력하세요." title="보증금을 입력하세요.">
                                <label for="jeonseDepositAmt"><span class="txt_label_x">보증금</span></label>
                                <div class="del_txt">
                                    <a href="javascript:void();" @click.prevent="delAmt('jeonseDepositAmt')" class="com_btn_delete2"><span class="blind">삭제</span></a>
                                    <span class="com_inputtxtright2">만원</span>
                                </div>
                                <p class="com_sum" v-if="jeonseDepositAmt">{{fn_hanValue(jeonseDepositAmt)}}</p>
                                <div class="btn_price_group">
                                    <button type="button" class="btn_price" title="5만" @click.prevent="btnPriceEvt(5, 'jeonseDepositAmt', 999999999)">+<strong>5</strong>만</button>
                                    <button type="button" class="btn_price" title="10만" @click.prevent="btnPriceEvt(10, 'jeonseDepositAmt', 999999999)">+<strong>10</strong>만</button>
                                    <button type="button" class="btn_price" title="100만" @click.prevent="btnPriceEvt(100, 'jeonseDepositAmt', 999999999)">+<strong>100</strong>만</button>
                                    <button type="button" class="btn_price" title="1000만" @click.prevent="btnPriceEvt(1000, 'jeonseDepositAmt', 999999999)">+<strong>1000</strong>만</button>
                                </div>
                            </div>
                            <div class="com_btn_area"><a href="javascript:void();" class="com_btn_round com_btn_round01" :style="isInputed" @click.prevent="fn_getBrokerFees(selectedTab)"><span class="btn_calculation">계산하기</span></a></div>
                        </div>
                    </div>
                    <!-- 월세 탭 -->
                    <div role="tabpanel" id="tab_03" class="cmm-tab-panel p0" :class="selectedTab == '03'?'on':''">
                        <div class="com_inputarea_type07">
                            <div class="com_input_type01 com_word2">
                                <input type="tel" id="monthlyDepositAmt" v-model="monthlyDepositAmt" required minlength="4" maxlength="11" @keyup="addComma($event,'monthlyDepositAmt')" ref="monthlyDepositAmt" placeholder="보증금을 입력하세요." title="보증금을 입력하세요.">
                                <label for="monthlyDepositAmt"><span class="txt_label_x">보증금</span></label>
                                <div class="del_txt">
                                    <a href="javascript:void();" @click.prevent="delAmt('monthlyDepositAmt')" class="com_btn_delete2"><span class="blind">삭제</span></a>
                                    <span class="com_inputtxtright2">만원</span>
                                </div>
                                <p class="com_sum" v-if="monthlyDepositAmt">{{fn_hanValue(monthlyDepositAmt)}}</p>
                                <div class="btn_price_group">
                                    <button type="button" class="btn_price" title="5만" @click.prevent="btnPriceEvt(5, 'monthlyDepositAmt', 999999999)">+<strong>5</strong>만</button>
                                    <button type="button" class="btn_price" title="10만" @click.prevent="btnPriceEvt(10, 'monthlyDepositAmt', 999999999)">+<strong>10</strong>만</button>
                                    <button type="button" class="btn_price" title="100만" @click.prevent="btnPriceEvt(100, 'monthlyDepositAmt', 999999999)">+<strong>100</strong>만</button>
                                    <button type="button" class="btn_price" title="1000만" @click.prevent="btnPriceEvt(1000, 'monthlyDepositAmt', 999999999)">+<strong>1000</strong>만</button>
                                </div>
                            </div>
                            <div class="com_input_type01 com_won02">
                                <input type="tel" id="paymentAmt" v-model="paymentAmt" required minlength="2" maxlength="4" @keyup="addComma($event,'paymentAmt')" ref="paymentAmt" placeholder="월세를 입력하세요." title="월세를 입력하세요.">
                                <label for="paymentAmt"><span class="txt_label_x">월세</span></label>
                                <div class="del_txt">
                                    <a href="javascript:void();" @click.prevent="delAmt('paymentAmt')" class="com_btn_delete2"><span class="blind">삭제</span></a>
                                    <span class="com_inputtxtright2">만원</span>
                                </div>
                                <p class="com_sum" v-if="paymentAmt">{{fn_hanValue(paymentAmt)}}</p>
                                <div class="btn_price_group">
                                    <button type="button" class="btn_price" title="5만" @click.prevent="btnPriceEvt(5, 'paymentAmt', 9999)">+<strong>5</strong>만</button>
                                    <button type="button" class="btn_price" title="10만" @click.prevent="btnPriceEvt(10, 'paymentAmt', 9999)">+<strong>10</strong>만</button>
                                    <button type="button" class="btn_price" title="100만" @click.prevent="btnPriceEvt(100, 'paymentAmt', 9999)">+<strong>100</strong>만</button>
                                    <button type="button" class="btn_price" title="1000만" @click.prevent="btnPriceEvt(1000, 'paymentAmt', 9999)">+<strong>1000</strong>만</button>
                                </div>
                            </div>
                            <div class="com_btn_area"><a href="javascript:void();" class="com_btn_round com_btn_round01" :style="isInputed" @click.prevent="fn_getBrokerFees(selectedTab)"><span class="btn_calculation">계산하기</span></a></div>
                        </div>
                    </div>
                    
                    <template v-if="isComputed">
                        <div class="titbox_type01 style_up">
                            <strong class="com_box_tit01">중개수수료 계산결과</strong>
                        </div>
                        <div class="com_box_type01 com_box_list03 box_shadow01">
                            <ul class="list_type_02">
                                <!-- 월세 탭에서만 거래금액 표시 -->
                                <li v-if="selectedTab == '03'">
                                    <dl>
                                        <dt>
                                            <div><em>거래금액</em></div>
                                            <span v-if="selectedTab == '03'">{{amtDescription}}</span>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{fixedAmt | numberFilter}}</em>
                                                <em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </li>
                                <li>
                                    <dl>
                                        <dt>
                                            <div><em>상한요율</em></div>
                                            <span>{{rateDescription}}</span>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{maxRate | numberFilter('0,0.00', {precision: 2})}}</em><em class="unit">%</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </li>
                            </ul>
                            <div class="total_list">
                                <div>
                                    <em>최대수수료</em>
                                    <span>VAT별도</span>
                                </div>
                                <span class="com_price">
                                    <em class="num">{{maxFees | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                        </div>
                        <ul class="bl_dot_list one_register_list">
                            <li>계산 결과는 서울/주택거래 기준으로 산정되었습니다.</li>
                            <li>실제 중개수수료는 공인중개사와 협의에 의해 결정할 수 있습니다.</li>
                        </ul>
                    </template>
                </div>
			</div>
        </div>
		<a href="javascript:void();" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
    <!--// full popup E -->
</template>
<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import {keyupNumFormat} from '@/utils/number'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'

export default {
    name : "PDMY2043",
    data : () => {
        return {
            isFirstPur          : true,         // 매매탭 최초진입 여부
            isFirstJeon         : true,         // 전세탭 최초진입 여부
            isFirstMon          : true,         // 월세탭 최초진입 여부
            selectedTab         : "",           // 선택한 탭 구분
            purchasedAmt        : "",           // 거래금액(매매)
            fixedAmt            : "",           // 거래금액(월세)
            jeonseDepositAmt    : "",           // 전세 보증금
            monthlyDepositAmt   : "",           // 월세 보증금
            paymentAmt          : "",           // 월세
            isPurchase          : false,        // 매매여부
            isDeposit           : false,        // 전/월세 여부(보증금 표시)
            isPayment           : false,        // 전/월세 여부(월세 표시)
            maxRate             : "",           // 상한요율
            maxFees             : "",           // 최대수수료
            maxRatePur          : "",           // 매매 상한요율
            maxFeesPur          : "",           // 매매 최대수수료
            maxRateJeon         : "",           // 전세 상한요율
            maxFeesJeon         : "",           // 전세 최대수수료
            maxRateMon          : "",           // 월세 상한요율
            maxFeesMon          : "",           // 월세 최대수수료
            amtDescription      : "",           // 거래금액 안내문구
            rateDescription     : "",           // 상한요율 거래금액 표시
            isComputed          : false,        // 계산 후 결과 표시 flag
        }
    },
    computed : {
        isInputed() {
            let returnStyle = ""
            if(this.selectedTab == '01') {
                returnStyle = this.isFirstPur == true ? (this.purchasedAmt.length > 0 ? "" : "display:none") : ""
            } else if(this.selectedTab == '02') {
                returnStyle = this.isFirstJeon == true ? (this.jeonseDepositAmt.length > 0 ? "" : "display:none") : ""
            } else if(this.selectedTab == '03') {
                returnStyle = this.isFirstMon == true ? ((this.monthlyDepositAmt.length > 0 && this.paymentAmt.length > 0) ? "" : "display:none") : ""
            }
            return returnStyle
        },
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins : [
        commonMixin,
        popupMixin
    ],
    methods : {
        initComponent() {
            this.selectTab('purchased')
            this.getData()
        },
        getData() {

        },

        // 탭 이동 시 이벤트
        // 입력값 유지, 입력값 없으면 포커스, 계산하기 버튼 유지, 결과 화면 각 탭 최초진입 시 초기화, 계산 후에는 탭마다 유지
        selectTab(str) {
            switch(str) {
                case 'purchased' :
                    this.selectedTab = '01'
                    if(this.isFirstPur == true) {
                        this.setFocus('purchasedAmt')
                        this.isComputed = false
                    }
                    else {
                        this.isComputed = true
                        this.maxRate = this.maxRatePur
                        this.maxFees = this.maxFeesPur
                    }
                    break
                case 'jeonse' : 
                    this.selectedTab = '02'
                    if(this.isFirstJeon == true) {
                        this.setFocus('jeonseDepositAmt')
                        this.isComputed = false
                    }
                    else {
                        this.isComputed = true
                        this.maxRate = this.maxRateJeon
                        this.maxFees = this.maxFeesJeon
                    }
                    break
                case 'monthlyPayment' :
                    this.selectedTab = '03'
                    if(this.isFirstMon == true) {
                        this.setFocus('monthlyDepositAmt')
                        this.isComputed = false
                    }
                    else {
                        this.isComputed = true
                        this.maxRate = this.maxRateMon
                        this.maxFees = this.maxFeesMon
                    }
                    break
                default :
                    break
            }
        },

        setFocus(str) {
            this.$nextTick(() => {
                this.$refs[str].focus()
            })
        },

        delAmt(str) {
            switch(str) {
                case 'purchasedAmt' :
                    this.purchasedAmt = ""
                    this.setFocus(str)
                    break
                case 'jeonseDepositAmt' :
                    this.jeonseDepositAmt = ""
                    this.setFocus(str)
                    break
                case 'monthlyDepositAmt' :
                    this.monthlyDepositAmt = ""
                    this.setFocus(str)
                    break
                case 'paymentAmt' :
                    this.paymentAmt = ""
                    this.setFocus(str)
                    break
                default :
                    break
            }
        },

        // 금액 천단위 쉼표 표시
        addComma(e, refNm) {
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
                    break
                case 'jeonseDepositAmt' : 
                    this.jeonseDepositAmt = this.$refs[refNm].value;
                    break
                case 'monthlyDepositAmt' : 
                    this.monthlyDepositAmt = this.$refs[refNm].value;
                    break
                case 'paymentAmt' : 
                    this.paymentAmt = this.$refs[refNm].value;
                    break
                default : 
                    break
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

        fn_getBrokerFees(tab) {
            let calcAmt = 0
            if(tab == '01') {   // 매매
                calcAmt = parseInt(this.purchasedAmt.split(',').join('')) * 10000
                if(calcAmt >= 1000000) {
                    switch(true) {
                        case (calcAmt < 50000000) :
                            this.rateDescription = "5천만원 미만"
                            this.maxRate = 0.6
                            this.maxFees = (calcAmt * this.maxRate / 100) >= 250000 ? 250000 : (calcAmt * this.maxRate / 100)
                            break
                        case (calcAmt >= 50000000 && calcAmt < 200000000) :
                            this.rateDescription = "5천만원 이상 2억원 미만"
                            this.maxRate = 0.5
                            this.maxFees = (calcAmt * this.maxRate / 100) >= 800000 ? 800000 : (calcAmt * this.maxRate / 100)
                            break
                        case (calcAmt >= 200000000 && calcAmt < 900000000) :
                            this.rateDescription = "2억원 이상 9억원 미만"
                            this.maxRate = 0.4
                            this.maxFees = calcAmt * this.maxRate / 100
                            break
                        case (calcAmt >= 900000000 && calcAmt < 1200000000) :
                            this.rateDescription = "9억원 이상 12억원 미만"
                            this.maxRate = 0.5
                            this.maxFees = calcAmt * this.maxRate / 100
                            break
                        case (calcAmt >= 1200000000 && calcAmt < 1500000000) :
                            this.rateDescription = "12억원 이상 15억원 미만"
                            this.maxRate = 0.6
                            this.maxFees = calcAmt * this.maxRate / 100
                            break
                        case (calcAmt >= 1500000000) :
                            this.rateDescription = "15억원 이상"
                            this.maxRate = 0.7
                            this.maxFees = calcAmt * this.maxRate / 100
                            break
                        default :
                            break
                    }

                    // 탭 이동 시에도 각 탭의 결과 남아있도록 계산결과 따로 저장
                    this.maxRatePur = this.maxRate
                    this.maxFeesPur = this.maxFees
                    this.isFirstPur = false
                    this.isComputed = true
                } else {
                    modalService.alert("거래금액은 100만원 이상<BR>입력하셔야 합니다.","","확인")
                }
            }
            else if(tab == '02' || tab == '03') {  // 전/월세
                let jeonseDeposit = parseInt(this.jeonseDepositAmt.split(',').join('')) * 10000
                let monthlyDeposit = parseInt(this.monthlyDepositAmt.split(',').join('')) * 10000
                let payment = parseInt(this.paymentAmt.split(',').join('')) * 10000
                // 금액 입력 제한 보증금 100만 이상, 월세 1만 이상
                let qualify = tab == '02' ? (jeonseDeposit >= 1000000 ? true : false) : (monthlyDeposit >= 1000000 && payment >= 10000 ? true : false)
                if(qualify) {
                    // 전세는 보증금, 월세는 거래금액(보증금+(월세*100), 단 5000만 이하 월세*70)
                    if(tab == '02') {
                        calcAmt = jeonseDeposit
                    } else if(tab == '03'){
                        calcAmt = monthlyDeposit + (payment * 100)
                        this.amtDescription = "보증금 + (월세 x 100)"
                        if(calcAmt < 50000000) {
                            calcAmt = monthlyDeposit + (payment * 70)
                            this.amtDescription = "보증금 + (월세 x 70)"
                        }
                        this.fixedAmt = calcAmt
                    }

                    switch(true) {
                        case (calcAmt < 50000000) :
                            this.rateDescription = "5천만원 미만"
                            this.maxRate = 0.5
                            this.maxFees = (calcAmt * this.maxRate / 100) >= 200000 ? 200000 : (calcAmt * this.maxRate / 100)
                            break
                        case (calcAmt >= 50000000 && calcAmt < 100000000) :
                            this.rateDescription = "5천만원 이상 1억원 미만"
                            this.maxRate = 0.4
                            this.maxFees = (calcAmt * this.maxRate / 100) >= 300000 ? 300000 : (calcAmt * this.maxRate / 100)
                            break
                        case (calcAmt >= 100000000 && calcAmt < 600000000) :
                            this.rateDescription = "1억원 이상 6억원 미만"
                            this.maxRate = 0.3
                            this.maxFees = calcAmt * this.maxRate / 100
                            break
                        case (calcAmt >= 600000000 && calcAmt < 1200000000) :
                            this.rateDescription = "6억원 이상 12억원 미만"
                            this.maxRate = 0.4
                            this.maxFees = calcAmt * this.maxRate / 100
                            break
                        case (calcAmt >= 1200000000 && calcAmt < 1500000000) :
                            this.rateDescription = "12억원 이상 15억원 미만"
                            this.maxRate = 0.5
                            this.maxFees = calcAmt * this.maxRate / 100
                            break
                        case (calcAmt >= 1500000000) :
                            this.rateDescription = "15억원 이상"
                            this.maxRate = 0.6
                            this.maxFees = calcAmt * this.maxRate / 100
                            break
                        default :
                            break
                    }
                    if(tab == '02') {
                        this.maxRateJeon = this.maxRate
                        this.maxFeesJeon = this.maxFees
                        this.isFirstJeon = false
                    } else {
                        this.maxRateMon = this.maxRate
                        this.maxFeesMon = this.maxFees
                        this.isFirstMon = false
                    }
                    this.isComputed = true
                } else {
                    if(tab == '03') {
                        if(monthlyDeposit >= 1000000) {
                            modalService.alert("월세는 1만원 이상<BR>입력하셔야 합니다.", "", "확인")
                        } else {
                            modalService.alert("보증금은 100만원 이상<BR>입력하셔야 합니다.", "", "확인")
                        }
                    } else {
                        modalService.alert("보증금은 100만원 이상<BR>입력하셔야 합니다.", "", "확인")
                    }
                }
            }
        },

        // 금액 버튼 이벤트
        btnPriceEvt(addPrice, refNm, maxPrice) {
            let tmpInputValue = this.$refs[refNm].value;
            let tmpFncObtAm = Number(tmpInputValue.replace(/[,.-]/g, ''));

            tmpFncObtAm += addPrice;

            // 최대금액 999,999,999 이상인 경우 최대값 고정
            if(tmpFncObtAm >= maxPrice) {
                tmpFncObtAm = maxPrice;
            }

            this.$refs[refNm].value = String(tmpFncObtAm);
            this.addComma('', refNm);
        }
    }, 
}
</script>