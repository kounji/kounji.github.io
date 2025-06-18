<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나를위한금융
* @ 페이지설명 : 금융과생활 > 나를위한금융 > 나의 연말정산 > 총 소득 입력
* @ 파일명     : src\views\page\PD\YT\PDYT2003\PDYT2003.vue
* @ 작성자     : CS533541
* @ 작성일     : 2023-07-25
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-25              CS533541              고도화 및 파일명 변경(PDYT1102 -> PDYT2003)
*************************************************************************/
-->
<template>
  <div>
	<!-- 슬라이드 팝업 시작 -->
	<div class="dimmed" style="display: block;"></div>
	<div class="popup_box renewal mydata2023">
		<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
			<div class="popup_header">
				<h1>총 소득 입력</h1>
				<!-- <a href="#nolink" class="btn_back"><span class="blind">이전화면</span></a> -->
			</div>
			<div class="popup_content com_btn_bottom">
				<div class="com_input_type01 com_word2 mt0">
					<input type="tel" id="txt01" :class="totSalAm.length > 0?'focusON focusforce':''" required="" maxlength="7" placeholder="총 소득 직접 입력" title="총 소득 입력"
                     v-model="totSalAm" @keyup="fn_addComma($event)" ref="totSalAm">
					<!-- <label for="com_input01">
						<span class="txt_label_x">연소득</span>
					</label> -->
					<div class="del_txt">
						<a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
						<span class="com_inputtxtright2">만원</span>
					</div>
					<p class="com_sum">{{fn_hanValue(totSalAm)}}</p>
					<div class="btn_price_group">
						<button type="button" class="btn_price" @click.prevent="addMoney(5)">+<strong>5</strong>만</button>
						<button type="button" class="btn_price" @click.prevent="addMoney(10)">+<strong>10</strong>만</button>
						<button type="button" class="btn_price" @click.prevent="addMoney(100)">+<strong>100</strong>만</button>
						<button type="button" class="btn_price" @click.prevent="addMoney(1000)">+<strong>1000</strong>만</button>
					</div>
					<p class="com_txtinfo_type01 mt20">총소득에 따라 공제 여부와 금액이 달라요.</p>
				</div>
			</div>
			<div class="popup_footer">
				<div class="btn_full_box2">
					<a href="javascript:void(0);" class="btn btn_mint" @click.prevent="fn_openModalPDYT4001($event)">확인</a>
				</div>
			</div>
			<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
		</div>
	</div>
	<!--// 슬라이드 팝업 종료 -->
   </div> 
</template>
<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import {mapGetters} from 'vuex'
import {keyupNumFormat} from '@/utils/number'

import PDYT4001 from '@/views/page/PD/YT/PDYT4001/PDYT4001'

export default {
    name : "PDYT2003",
    data: () => {
        return {
            totSalAm : "",
        }
    },
    computed: {
        ...mapGetters('config', [
                    'codeMap',
        ]),
        btnOnOff() {
            let convAmt = this.totSalAm.split(",").join("")
            return (this.totSalAm === "" || convAmt < 1000 || convAmt > 100000) ? "btn_off" : ""
        }
    },
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    methods: {

        // 팝업화면 초기화
        initComponent() {
        },

        // 금액 천단위 쉼표 표시
        fn_addComma(e="") {

            const selectionStartPos = this.$refs.totSalAm.selectionStart
            const selectionEndPos   = this.$refs.totSalAm.selectionEnd

            if(this.totSalAm.length == 1 && this.totSalAm == 0) {
                this.totSalAm = this.totSalAm.slice(0, -1)
            } else {
                this.totSalAm = this.totSalAm.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                this.totSalAm = this.totSalAm.split(",").join("")
                this.totSalAm = keyupNumFormat(this.totSalAm)
            }

            if(e.keyCode === 8) {
                this.$nextTick(() => {
                    this.$refs.totSalAm.focus()
                    this.$refs.totSalAm.setSelectionRange(selectionStartPos, selectionEndPos)
                })
            }
        },
        // 입력 금액 체크
        fn_chkInputAmt() {
            let convAmt = this.totSalAm.split(",").join("")
            
            if(convAmt < 1000 || convAmt > 100000 || convAmt === "") {
                this.totSalAm = ""
                modalService.alert("1,000만원 ~ 10억원 이하 금액만 입력가능합니다.")
                return false
            }
            return true
        },
        // 입력한 금액 삭제
        fn_delInput() {
            this.totSalAm = ""
        },

        fn_openModalPDYT4001() {
            if(!this.fn_chkInputAmt()) return false

            this.close()
            const config = {
                component: PDYT4001,
                params: { // 파라미터
                    totSalAm : this.totSalAm.split(",").join(""),
                }
            }
            
            modalService.openPopup(config).then(response => {
                console.log("openModalPDYT1105" ,response)
            })
        },

        fn_hanValue(amount) {
            const koreanUnits = ['', '만', '억', '조']
            let han_amount = parseInt(amount.split(',').join('')) * 10000
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

        addMoney(money) {
            let tmpTotSalAm = Number(this.totSalAm.split(",").join(""));
            
            tmpTotSalAm += money;

            // 최대 금액 100,000만원 이상인 경우 최대값 고정
            if(tmpTotSalAm >= 100000) {
                tmpTotSalAm = 100000;
            }
            this.totSalAm = String(tmpTotSalAm);
            this.fn_addComma();
        }
    },

}
</script>