<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 상품추천 > 은퇴력진단
* @ 페이지설명 : 금융과생활 > 상품추천 > 은퇴력진단 > step 2. 은퇴정보입력(기본정보)
* @ 파일명     : src\views\page\PD\PD\PDPD1104\PDPD1104.vue
* @ 작성자     : CS516033
* @ 작성일     : 2021-08-12
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-12              CS516033              최초작성
* 2021-11-23              CS515731              닫기 버튼 하단으로 이동
* 2022-08-29              CS528061              UI 변경
*************************************************************************/
-->
<template>
    <div class="full_popup renewal"> <!-- renewal 클래스 추가 -->
        <div class="popup_header">
            <h1>은퇴 준비 진단</h1>
        </div>
        <div class="popup_content com_bg_type00">
            <div class="com_inner">
                <div class="steps mt20">
                    <ol role="img" aria-label="총 3단계 중 1단계">
                        <li class="on">1</li>
                        <li></li>
                        <li></li>
                    </ol>
                </div>
                <div class="com_box_type01 mt15 steps_top1">
                    <strong class="com_box_tit">기본 정보 </strong>
                </div>
                <div class="com_inputarea_type01 retire">
                    <p class="com_txtretire_type01">내 나이는 <span>{{birth | dateFilter('YYYY')}}</span>년생,</p>
                    <div class="com_input_type01 com_word1">
                        <input type="tel" id="com_input01" disabled v-model="mydtCusAge" title="현재나이">
                        <label for="com_input01"></label>
                        <div class="del_txt">
                            <span class="com_inputtxtright2">세</span>
                        </div>
                    </div>

                    <p class="com_txtretire_type01 ani-active">은퇴 예상 나이는,</p>
                    <div class="com_input_type01 ani-active com_word1">
                        <input type="tel" required :class="retExpAge.length > 0 && foc_retAge ? 'focusON focusforce' : ''" maxlength="2" id="com_input02" ref="retExpAge" v-model="retExpAge" @focus="fn_focusOnOff('retExpAge')" @keyup="fn_chkAge('retExpAge',retExpAge)" @input="fn_chkAge('retExpAge',retExpAge)" @keyup.enter="moveNextTag($event)" title="은퇴나이">
                        <label for="com_input02"></label>
                        <div class="del_txt">
                            <a href="javascript:void(0);" class="com_btn_delete2" v-if="retExpAge.length > 0" @click.prevent="fn_delAge('retExpAge')"><span class="blind">삭제</span></a>
                            <span class="com_inputtxtright2">세</span>
                        </div>
                    </div>
                    <p class="com_txtinfo_type01 ani-active" v-if="setExpAgeYn">국민연금 수급 개시 가능 연령 기준</p>

                    <p class="com_txtretire_type01 mt20 ani-active">나의 기대 수명은,</p>
                    <div class="com_input_type01 ani-active com_word1">
                        <input type="tel" required :class="lifeExpAge.length > 0 && foc_lifeAge ? 'focusON focusforce' : ''" maxlength="3" id="com_input03" v-model="lifeExpAge" @focus="fn_focusOnOff('lifeExpAge')" @keyup="fn_chkAge('lifeExpAge',lifeExpAge)" @input="fn_chkAge('lifeExpAge',lifeExpAge)" title="기대수명">
                        <label for="com_input03"></label>
                        <div class="del_txt">
                            <a href="javascript:void(0);" class="com_btn_delete2" v-if="lifeExpAge.length > 0" @click.prevent="fn_delAge('lifeExpAge')"><span class="blind">삭제</span></a>
                            <span class="com_inputtxtright2">세</span>
                        </div>
                    </div>
                    <p class="com_txtinfo_type01 ani-active" v-if="setExpAgeYn">통계청 발표 자료 기준 {{sexDscNm}} 평균 기대수명</p>
                </div>
            </div>
        </div>
        <div class="popup_footer fixed">
            <div class="btn_full_box">
                <a href="javascript:void(0);" class="btn btn_mint" @click.prevent="fn_nextStep">다음</a>
            </div>
        </div>
        
        <a href="javascript:void(0);" class="btn_close" @click.prevent="fn_closeAllPage"><span class="blind">화면닫기</span></a>        
    </div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'

import PDRT2011 from '@/views/page/PD/RT/PDRT2011/PDRT2011'

export default {
    name : "PDPD1104",
    data: () => {
        return {
            birth       : "", // 생년월일
            mydtCusAge  : "", // 마이데이터고객나이
            sexDsc      : "", // 고객성별
            sexDscNm    : "", // 고객성별명
            retExpAge   : "", // 은퇴예상나이
            lifeExpAge  : "", // 기대수명

            foc_retAge  : false,
            foc_lifeAge : false,
            setExpAgeYn : true
        }
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    mounted() {
        this.initComponent();

        // PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name);
    },
    methods: {
        initComponent() {
            this.getData();
        },
        getData() {
            // 은퇴기본정보 조회
            const config = {
                url: '/pd/pd/04r01',
                data: {
                    mydtCusno : this.getUserInfo('mydtCusno') // 마이데이터고객번호
                }
            };

            apiService.call(config).then(response => {
                this.birth      = response.birth;
                this.mydtCusAge = response.mydtCusAge;
                this.sexDsc     = response.sexDsc;

                // 60세 이상 접속시 안내문구 표시 안 함
                if (Number(this.mydtCusAge) >= 60) {
                    this.setExpAgeYn = false;
                    this.retExpAge   = "";
                    this.lifeExpAge  = "";

                    this.$refs.retExpAge.focus();
                } else {
                    this.setExpAgeYn = true;
                    this.retExpAge   = "60";
                    this.lifeExpAge  = this.sexDsc == "0" ? "86" : "80";
                }

                this.sexDscNm   = this.sexDsc == "0" ? "여자" : "남자"; // 0:여자, 1:남자
            });
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
        // input 클릭 시 focus 관련
        fn_focusOnOff(type) {
            switch(type) {
                case 'retExpAge':
                    this.foc_retAge  = true
                    this.foc_lifeAge = false
                    break
                case 'lifeExpAge':
                    this.foc_retAge  = false
                    this.foc_lifeAge = true
                    break
            }
        },
        fn_chkAge(colNm, age) {
            if(age.length == 1 && age == 0) {
                age = age.slice(0, -1)
            } else {
                age = age.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')

                let chkLen = colNm == "retExpAge" ? 2 : 3;
                if (age.length > chkLen) {
                    age = age.slice(0, -1)
                }
            }

            if (colNm == "retExpAge") {
                this.retExpAge = age.toString();
            } else if (colNm == "lifeExpAge") {
                this.lifeExpAge = age.toString();
            }
        },
        fn_delAge(colNm) {
            if (colNm == "retExpAge") {
                this.retExpAge = "";
            } else if (colNm == "lifeExpAge") {
                this.lifeExpAge = "";
            }
        },
        fn_nextStep() {
            let numMydtCusAge = Number(this.mydtCusAge);
            let numRetExpAge  = Number(this.retExpAge);
            let numLifeExpAge = Number(this.lifeExpAge);

            // 은퇴예상나이
            if (numMydtCusAge >= numRetExpAge) {
                modalService.alert("은퇴 예상 나이는 현재 보다 많아야 합니다.");
                return;
            } else if (numRetExpAge > 99) {
                modalService.alert("은퇴 예상 나이는 99세까지 입력 가능합니다.");
                return;
            }

            // 기대수명
            if (numRetExpAge >= numLifeExpAge) {
                modalService.alert("기대 수명은 은퇴 예상 나이보다 많아야 합니다.");
                return;
            } else if (numLifeExpAge > 120) {
                modalService.alert("기대 수명은 120세까지 입력 가능합니다.");
                return;
            }
            
            const config = {
                component : PDRT2011,
                params : {
                    mydtCusAge : numMydtCusAge, // 마이데이터고객나이
                    retExpAge  : numRetExpAge,  // 은퇴예상나이
                    lifeExpAge : numLifeExpAge  // 기대수명
                }
            }

            modalService.openPopup(config).then(() => {});
        }
    }
}
</script>