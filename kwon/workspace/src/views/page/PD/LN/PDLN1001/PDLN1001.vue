<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 상품추천 > 대출한도조회
* @ 페이지설명 : 금융과생활 > 상품추천 > 대출한도조회 > 연소득입력 슬라이드 팝업
* @ 파일명     : src\views\page\PD\LN\PDLN1001\PDLN1001.vue
* @ 작성자     : CS516033
* @ 작성일     : 2021-08-24
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-24              CS516033              최초작성
* 2022-08-02              CS528061              고도화 및 파일명 변경(src\views\page\PD\PD\PDPD1111\PDPD1111.vue -> src\views\page\PD\LN\PDLN1001\PDLN1001.vue)
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;" v-on:click.prevent="close()"></div>
        <div class="popup_box renewal">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <h1>연 소득 입력</h1>
                    <!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
                </div>
                <div class="popup_content com_btn_bottom">
                    <div class="com_input_type01 com_word2">
                        <input type="tel" id="txt01" required="" placeholder="연 소득을 입력하세요" title="연 소득 입력"
                                ref="yrincAmInput" v-model="yrincAm" @keyup="addComma($event)" @input="addComma">
                        <!-- <label for="txt01">
                            <span class="txt_label_x">연소득</span>
                        </label> -->
                        <div class="del_txt">
                            <a href="javascript:void(0);" class="com_btn_delete2" @click.prevent="del('delYrincAm')" v-show="yrincAm.length > 0" ><span class="blind">삭제</span></a> <!-- style="display: none;" -->
                            <span class="com_inputtxtright2">만원</span>
                        </div>
                        <p class="com_sum">{{fn_hanValue(yrincAm)}}</p>
                        <div class="btn_price_group">
                            <button type="button" class="btn_price" @click.prevent="addMoney(5)">+<strong>5</strong>만</button>
                            <button type="button" class="btn_price" @click.prevent="addMoney(10)">+<strong>10</strong>만</button>
                            <button type="button" class="btn_price" @click.prevent="addMoney(100)">+<strong>100</strong>만</button>
                            <button type="button" class="btn_price" @click.prevent="addMoney(1000)">+<strong>1000</strong>만</button>
                        </div>
                    </div>
                </div>
                <div class="popup_footer">
                    <div class="btn_full_box2">
                        <a href="javascript:void(0);" class="btn btn_mint" :class="yrincAm == '' ? 'btn_off' : ''" @click.prevent="yrincAm != '' ? fn_nextStep() : ''">등록</a>
                    </div>
                </div>
                <a href="javascript:void(0);" class="btn_close" v-on:click.prevent="close()"><span class="">닫기</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>

<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import {keyupNumFormat} from '@/utils/number'

    export default {
        name : "PDLN1001",
        data: () => {
            return {
                yrincAm : ""
            }
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        mounted() {
            this.initComponent(this.params);

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        methods: {
            initComponent(param) {
                this.yrincAm = param.yrincAm != "0" ? param.yrincAm : "";
                this.$refs.yrincAmInput.focus();
            },
            addComma() {
                if(this.yrincAm.length == 1 && this.yrincAm == 0) {
                    this.yrincAm = this.yrincAm.slice(0, -1)
                } else {
                    this.yrincAm = this.yrincAm.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                    this.yrincAm = this.yrincAm.split(",").join("")

                    if (this.yrincAm.length > 7) {
                        this.yrincAm = this.yrincAm.slice(0, -1)
                    }
                    this.yrincAm = keyupNumFormat(this.yrincAm)
				}
            },
            fn_nextStep() {
                let chkAm = Number(this.yrincAm.split(",").join(""));
                if (chkAm < 1000 || chkAm > 1000000) {
                    modalService.alert("연 소득은 1,000만원 ~ 1,000,000만원까지 입력 가능합니다.");
                    return;
                }
                
                this.close(this.yrincAm);
            },
            fn_hanValue(amount) {
                if(amount === "") return

                const koreanUnits = ['', '만', '억', '조']
                let han_amount = parseInt(amount.split(',').join(''))   // 만원 단위 화면
                let defaultUnit = 10000                                 // 단위기본값
                han_amount = han_amount*defaultUnit
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
            addMoney(money) {
                let tmpYrincAm = Number(this.yrincAm.split(",").join(""));
                
                tmpYrincAm += money;

                if(tmpYrincAm >= 9999999) {
                    tmpYrincAm = 9999999;
                }
                this.yrincAm = String(tmpYrincAm);
                this.addComma();
            },
            // 입력 텍스트 삭제
            del(type) {
                switch(type) {
                    case 'delYrincAm':
                        this.yrincAm = ""
                        break
                }
            },
        }
    }
</script>