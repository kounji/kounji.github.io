<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 상품추천 > 은퇴력진단
* @ 페이지설명 : 금융과생활 > 상품추천 > 은퇴력진단 > step 3. 은퇴정보입력(필요자금)
* @ 파일명     : src\views\page\PD\RT\PDRT2015\PDRT2015.vue
* @ 작성자     : CS533541
* @ 작성일     : 2023-07-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-17              CS533541              최초작성(PDRT1009.vue -> PDRT2015.vue)
*************************************************************************/
-->
<template>
    <!-- 전체 팝업 시작 -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1 class="">은퇴 준비 진단</h1>
		</div>
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner progress_wrap">
				<strong class="titH1">필요 자금</strong>
				<span class="progress_num" aria-label="전체 3단계 중 2단계"><em class="pointColor green">2</em>/3</span>

				<!-- 은퇴 후 월 생활비 -->
				<div class="com_btnselectbox_type01">
					<button type="button" class="com_btnselect_type01" title="은퇴 후 월 생활비" @click.prevent="fn_setRetMmLivAm()" ref="livAmPopBtn">
						<span>은퇴 후 월 생활비
                            <template v-if="retMmLivAm != ''">  {{retMmLivAm}}<em>만원</em></template>
                        </span>
					</button>
				</div>
				<!--// 은퇴 후 월 생활비 -->
				<!-- 연간 의료비 -->
				<div class="com_btnselectbox_type01">
					<button type="button" class="com_btnselect_type01" title="연간 의료비" @click.prevent="fn_setRetYyMdcAm()">
						<span>연간 의료비 
                            <template v-if="retYyMdcAm != ''">  {{retYyMdcAm}}<em>만원</em></template>
                        </span>
					</button>
				</div>
				<!--// 연간 의료비 -->
				<strong class="com_box_tit" v-show="nextStepYn">기타 필요 자금</strong>
				<!-- 연간 자녀교육 비용 -->
				<div class="com_input_type01 com_word2" v-show="nextStepYn">
					<input type="tel" class="com_right" id="com_chdrEduAm" value="0"  required="" placeholder="연간 자녀교육 비용을 입력하세요" ref="com_chdrEduAm"
                            :class="chdrEduAm.length > 0 && foc_cEduAm ? 'focusON focusforce' : ''" maxlength="11" v-model="chdrEduAm"  title="연간 자녀교육 비용"
                            @focus="fn_focusOnOff('chdrEduAm')" @keyup="fn_chkAm('chdrEduAm',chdrEduAm)" @input="fn_chkAm('chdrEduAm',chdrEduAm)" @keyup.enter="moveNextTag($event)">
					<label for="com_chdrEduAm">
						<span class="txt_label_x">연간 자녀교육 비용</span>
					</label>
					<div class="del_txt">
						<a href="javascript:void(0);" class="com_btn_delete2" v-if="chdrEduAm.length > 0" @click.prevent="fn_delAm('chdrEduAm')"> <span class="blind">삭제</span></a> 
						<span class="com_inputtxtright2">만원</span>
					</div>
					<p class="com_sum" v-if="chdrEduAm && chdrEduAm != 0">{{fn_hanValue(chdrEduAm)}}</p>
				</div>
				<!-- 연간 자녀교육 비용 -->
				<!-- 자녀 결혼 비용 -->
				<div class="com_input_type01 com_word2" v-show="nextStepYn">
					<input type="tel" class="com_right" id="com_chdrWeddAm" value="0"  required="" placeholder="자녀 결혼 비용을 입력하세요" ref="com_chdrWeddAm" 
                            :class="chdrWeddAm.length > 0 && foc_cWeddAm ? 'focusON focusforce' : ''" maxlength="11" v-model="chdrWeddAm" title="자녀 결혼 비용"
                            @focus="fn_focusOnOff('chdrWeddAm')" @keyup="fn_chkAm('chdrWeddAm',chdrWeddAm)" @input="fn_chkAm('chdrWeddAm',chdrWeddAm)" @keyup.enter="moveNextTag($event)">
					<label for="com_chdrWeddAm">
						<span class="txt_label_x">자녀 결혼 비용</span>
					</label>
					<div class="del_txt">
						<a href="javascript:void(0);" class="com_btn_delete2" v-if="chdrWeddAm.length > 0" @click.prevent="fn_delAm('chdrWeddAm')"><span class="blind">삭제</span></a>
						<span class="com_inputtxtright2">만원</span>
					</div>
					<p class="com_sum" v-if="chdrWeddAm && chdrWeddAm != 0">{{fn_hanValue(chdrWeddAm)}}</p>
				</div>
				<!--// 자녀 결혼 비용 -->
				<!-- 연간 기타 비용 -->
				<div class="com_input_type01 com_word2" v-show="nextStepYn">
					<input type="tel" class="com_right" id="com_etcYyAm" value="0"  required="" placeholder="연간 기타 비용을 입력하세요" title="연간 기타 비용" ref="com_etcYyAm"
                            :class="etcYyAm.length > 0 && foc_etcYyAm ? 'focusON focusforce' : ''" maxlength="11" v-model="etcYyAm" 
                            @focus="fn_focusOnOff('etcYyAm')" @keyup="fn_chkAm('etcYyAm',etcYyAm)" @input="fn_chkAm('etcYyAm',etcYyAm)" @keyup.enter="moveNextTag($event)">
					<label for="com_etcYyAm">
						<span class="txt_label_x">연간 기타 비용</span>
					</label>
					<div class="del_txt">
						<a href="javascript:void(0);" class="com_btn_delete2" v-if="etcYyAm.length > 0" @click.prevent="fn_delAm('etcYyAm')"><span class="blind">삭제</span></a>
						<span class="com_inputtxtright2">만원</span>
					</div>
					<p class="com_sum" v-if="etcYyAm && etcYyAm != 0">{{fn_hanValue(etcYyAm)}}</p>
				</div>
				<!--// 연간 기타비용 -->



			</div>
		</div>
        
		<div class="popup_footer fixed">
			<div class="com_btnhalfbox_type02">
				<a href="javascript:void(0);" class="btn btn_mint_gray" role="button" @click.prevent="close()">이전</a>
				<a href="javascript:void(0);" class="btn btn_mint" role="button" :class="!nextStepYn ? 'btn_off' : ''" @click.prevent="nextStepYn ? fn_nextStep() : ''">다음</a>
			</div>
		</div>
		
		<a href="#nolink" class="btn_close"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import {keyupNumFormat} from '@/utils/number'

    import PDRT2010 from '@/views/page/PD/RT/PDRT2010/PDRT2010' // 은퇴정보입력
    import PDRT2011 from '@/views/page/PD/RT/PDRT2011/PDRT2011' // 월생활비
    import PDRT2012 from '@/views/page/PD/RT/PDRT2012/PDRT2012' // 연의료비

    //import PDRT1011 from '@/views/page/PD/RT/PDRT1011/PDRT1011' // 은퇴정보입력

    export default {
        name : "PDRT2015",
        data: () => {
            return {
                // 기본정보
                mydtCusAge  : 0,  // 마이데이터고객나이
                retExpAge   : 0,  // 은퇴예상나이
                lifeExpAge  : 0,  // 기대수명

                // 필요자금
                retMmLivAm  : "", // 은퇴 후 월 생활비
                retYyMdcAm  : "", // 은퇴 후 의료비(연간)
                retYmAmYn   : false,
                chdrEduAm   : 0, // 자녀교육 비용
                chdrWeddAm  : 0, // 자녀결혼 비용
                etcYyAm     : 0, // 기타비용(연간)

                foc_cEduAm  : false,
                foc_cWeddAm : false,
                foc_etcYyAm : false,
                nextStepYn  : false
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
                // 기본정보
                this.mydtCusAge = param.mydtCusAge;
                this.retExpAge  = param.retExpAge;
                this.lifeExpAge = param.lifeExpAge;

                // 은퇴 후 월 생활비
                this.$refs.livAmPopBtn.click();
            },
            fn_closeAllPage() {
                const config = {
                    content : ['입력중인 정보는 저장되지 않습니다<br>정말로 취소하시겠습니까?'],
                    title   : "",
                }
                modalService.confirm(config).then(text => {
                    if(text == "예") {
                        this.closeAll();
                    }
                })
            },
            
            fn_setRetMmLivAm() {
                const config = {
                    renderer : {
                        component : PDRT2011
                    },
                    params : {
                        retMmLivAm : this.retMmLivAm
                    }
                }

                modalService.openSlidePagePopup(config).then((response) => {
                    this.retMmLivAm = response;

                    if (this.retYyMdcAm == "" || this.retYyMdcAm == "0") {
                        this.fn_setRetYyMdcAm();
                    }

                    this.fn_chkNextStep();
                });
            },
            fn_setRetYyMdcAm() {
                const config = {
                    renderer : {
                        component : PDRT2012
                    },
                    params : {
                        retYyMdcAm : this.retYyMdcAm
                    }
                }

                modalService.openSlidePagePopup(config).then((response) => {
                    this.retYyMdcAm = response;
                    this.retYmAmYn  = true;

                    this.fn_chkNextStep();
                });
            },
            // input 클릭 시 focus 관련
            fn_focusOnOff(type) {
                // let len = this.$refs[`com_${type}`].value.length
                // this.$refs[`com_${type}`].setSelectionRange(len, len)

                if(this.$refs[`com_${type}`].value == 0) {
                    this.$refs[`com_${type}`].value = this.$refs[`com_${type}`].value.slice(0, -1)
                    this[`${type}`] = ''
                }

                switch(type) {
                    case 'chdrEduAm':
                        this.foc_cEduAm  = true
                        this.foc_cWeddAm = false
                        this.foc_etcYyAm = false
                        break
                    case 'chdrWeddAm':
                        this.foc_cEduAm  = false
                        this.foc_cWeddAm = true
                        this.foc_etcYyAm = false
                        break
                    case 'etcYyAm':
                        this.foc_cEduAm  = false
                        this.foc_cWeddAm = false
                        this.foc_etcYyAm = true
                        break
                }
            },
            fn_chkAm(colNm, am) {
                if(am != null && am != '') {
                    am = am.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                    am = Number(am.split(",").join(""))

                    if(am > 0) {
                        if (am.length > 9) {
                            am = am.slice(0, -1)
                        }
                        am = keyupNumFormat(am.toString());
                    }

                    if (colNm == "chdrEduAm") {
                        this.chdrEduAm  = am
                        this.$refs.com_chdrEduAm.value = this.chdrEduAm
                    } else if (colNm == "chdrWeddAm") {
                        this.chdrWeddAm = am
                        this.$refs.com_chdrWeddAm.value = this.chdrWeddAm
                    } else if (colNm == "etcYyAm") {
                        this.etcYyAm    = am
                        this.$refs.com_etcYyAm.value = this.etcYyAm
                    }
                }
            },
            // 한글금액표시
            fn_hanValue(amount) {
                const koreanUnits = ['', '만', '억', '조']
                let han_amount = parseInt(amount.split(',').join('')) * 10000 // 만원 단위 화면
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
            fn_delAm(colNm) {
                if (colNm == "chdrEduAm") {
                    this.chdrEduAm  = "";
                } else if (colNm == "chdrWeddAm") {
                    this.chdrWeddAm = "";
                } else if (colNm == "etcYyAm") {
                    this.etcYyAm    = "";
                }
            },
            fn_chkNextStep() {
                if ((this.retMmLivAm != "" && this.retMmLivAm != "0") &&
                    (this.retYyMdcAm != "" && this.retYyMdcAm != "0"))
                {
                    this.nextStepYn = true;
                } else {
                    this.nextStepYn = false;
                }
            },
            fn_nextStep() {

                const config = {
                    component : PDRT2010,
                    params : {
                        // 기본정보
                        mydtCusAge : this.mydtCusAge, // 마이데이터고객나이
                        retExpAge  : this.retExpAge,  // 은퇴예상나이
                        lifeExpAge : this.lifeExpAge, // 기대수명

                        // 필요자금
                        retMmLivAm : this.retMmLivAm, // 은퇴 후 월 생활비
                        retYyMdcAm : this.retYyMdcAm, // 은퇴 후 의료비(연간)
                        chdrEduAm  : this.chdrEduAm  || "0", // 자녀교육 비용
                        chdrWeddAm : this.chdrWeddAm || "0", // 자녀결혼 비용
                        etcYyAm    : this.etcYyAm    || "0"  // 기타비용(연간)
                    }
                }

                modalService.openPopup(config).then(() => {});
            }
        }
    }
</script>