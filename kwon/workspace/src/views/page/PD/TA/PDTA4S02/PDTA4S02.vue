<!--
/*************************************************************************
* @ 서비스경로 : 큰글모드 > 연금절세 > 나의 총 연금
* @ 페이지설명 : 큰글모드 > 연금절세 > 나의 총 연금
* @ 파일명     : src/views/page/PD/TA/PDTA4S02/PDTA4S02.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-03-04
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-04              CS541597              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;" @click="close()"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup">
                <div class="popup_header">
                    <h1>{{!isShowDtl ? '나의 총 연금' : '국민연금 임의계속가입'}}</h1>
                </div>
                <div class="popup_content">
                    <!-- 60세까지 연금 납입 후 은퇴 후 월 수령 예상금액 안내가 가능한 경우 -->
                    <div class="pension_senior" v-if="prtoDsc == '1'">
                        <p class="compare_txt">노후준비를 위해 모은 총 연금은<br>
                                <strong>{{allPnsTts | numberFilter}}</strong>원이고 
                                <template v-if="sAgYrcn > 0">
                                    {{sAgYrcn}}세부터 {{sTotEntPrdVal}}년간<br>
                                </template>
                                <template v-else>
                                    {{sPnsStrtAg}}세부터 20년간<br>
                                </template>
                            <strong v-if="mmPnsTts > 0">월 {{fn_hanValue(String(mmPnsTts))}}</strong> 
                            <strong v-else>월 0만원</strong> 
                            받을 수 있어요.
                        </p>

                        <!-- 월 연금수령예상 총액이 관리자에서 설정한 월 생활비 보다 적은경우. UI-PD-TA-4S02 -->
                        <template v-if="sMmLfecs > mmPnsTts">
                            <div class="gray_box">
                                <div class="compare_chart lack"><!-- 부족할때 lack class 추가, 충분할때는 class 없음 -->
                                    <div class="bars">
                                        <div class="bar bar_sd" style="height:100%;">
                                            <div class="bar_txt">적정<span class="blind">금액</span></div>
                                            <div class="bubble">
                                                <!-- <span><em class="num">150</em>만원</span> -->
                                                <span v-html="fn_hanValue(String(sMmLfecs), true, 'num')"></span>
                                            </div>
                                        </div>
                                        <div class="bar bar_me">
                                            <div class="bar_txt">나<span class="blind">부족함</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="compare_info lack"><!-- 부족할때 lack class 추가, 충분할때는 class 없음 -->
                                <p>안정된 노후 생활을 위해<br>
                                    <!-- <strong class="num">월 <em>88</em>만원</strong>이<br> -->
                                    <strong class="num" v-html="fn_hanValue(String(sMmLfecs-mmPnsTts), true, '', '월 ')"></strong>이<br>
                                    더 필요해요.
                                </p>
                            </div>
                        </template>

                        <!-- 월 연금수령예상 총액이 관리자에서 설정한 월 생활비 보다 많은경우. UI-PD-TA-4S03 -->
                        <template v-else>
                            <div class="gray_box">
                                <div class="compare_chart"><!-- 부족할때 lack class 추가, 충분할때는 class 없음 -->
                                    <div class="bars">
                                        <div class="bar bar_sd" style="height:100%;">
                                            <div class="bar_txt">적정<span class="blind">금액</span></div>
                                            <div class="bubble">
                                                <!-- <span><em class="num">150</em>만원</span> -->
                                                <span v-html="fn_hanValue(String(sMmLfecs), true, 'num')"></span>
                                            </div>
                                        </div>
                                        <div class="bar bar_me">
                                            <div class="bar_txt">나<span class="blind">충족함</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="compare_info"><!-- 부족할때 lack class 추가, 충분할때는 class 없음 -->
                                <p>안락한 노후생활을 위해<br>
                                    열심히 준비하셨네요.
                                </p>
                            </div>
                        </template>

                    </div>
                    <!-- 국민연금 미가입. UI-PD-TA-4S05 -->
                    <div class="pension_senior" v-else-if="prtoDsc == '2'">
                        <p class="compare_txt">
                            <strong>내가 받을 연금은 얼마일까?</strong><br>
                            연금자산 연결하면 예상 연금을 알려드려요.
                        </p>

                        <div class="gray_box">
                            <p class="stable money"><span>안정된 노후 생활을 위해<br>월 <em>???만원</em>이 더 필요해요.</span></p>
                        </div>
                    </div>

                    <!-- 연금 수령 대상인 경우. UI-PD-TA-4S06 -->
                    <div class="pension_senior" v-else-if="prtoDsc == '3'">
                        <p class="compare_txt">
                            <strong>모은 연금을 수령하고 있나요?</strong>
                        </p>

                        <div class="gray_box">
                            <p class="stable asset"><span>안락한 노후생활을 위한<br>자산을 살펴보세요.</span></p>
                        </div>
                    </div>

                    <!-- 만 60세까지 납입기간이 120개월 미만인 경우. UI-PD-TA-4S07/UI-PD-TA-4S08 -->
                    <div class="pension_senior" v-else-if="prtoDsc == '4'">
                        <template v-if="!isShowDtl">
                            <p class="compare_txt">
                                <strong>국민연금 가입 기간이 부족해요.</strong><br>
                                가입기간 10년 미만이면, 연금 받을 수 없어요.
                            </p>

                            <div class="gray_box">
                                <p class="stable period"><span>가입 기간이 부족해도<br>임의계속가입 하면<br>국민연금 받을 수 있어요.</span></p>
                            </div>
                        </template>
                        <template v-else>
                            <ul class="dotted_list">
                                <li>국민연금 최소 가입 기간이 부족한 경우 임의계속가입 제도를 신청하여 65세까지 120개월을 채우면 연금으로 수령이 가능합니다.</li>
                                <li>최소 가입 기간 조건이 충족되지 못한 경우 납부한 연금은 실시금으로 수령하며 일시금으로 수령할 경우 연금으로 수령하는 총 금액보다 적은 금액을 지급받습니다.</li>
                                <li>120개월 가입 기간 조건은 국민연금에 한하며 퇴직연금과 개인연금은 개별 연금 수령 조건에 따라 연금 신청이 가능합니다.</li>
                            </ul>
                        </template>
                    </div>
                </div>

                <div class="popup_footer">
                    <div class="btn_group">
                        <button v-if="prtoDsc == '1' || isShowDtl" type="button" class="btns lg primary" @click="close()">확인</button>
                        <button v-else-if="prtoDsc == '2'" type="button" class="btns lg primary" @click="fn_moveJoinPop()">국민연금 연결</button>
                        <button v-else-if="prtoDsc == '3'" type="button" class="btns lg primary" @click="fn_moveAsetMain()">내 자산관리</button>
                        <button v-else-if="prtoDsc == '4'" type="button" class="btns lg primary" @click="isShowDtl = true">국민연금 임의계속 자세히보기</button>
                    </div>
                </div>

                <a href="javascript:void(0);" class="btn_close" @click="close()"><span class="">닫기</span></a>
            </div>
            
        </div>
        <!-- slide popup E -->
    </div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import commonService from '@/service/commonService'
import modalService from '@/service/modalService'

import COAR2005 from '@/views/page/CO/AR/COAR2005/COAR2005' // 개인신용정보제공동의(ASIS)

export default {
    name : "PDTA4S02",
    data: () => {
        return {
            prtoDsc         : '',   // 국민연금 연결여부에 따른 레이아웃 출력구분
            allPnsTts       : 0,    // 모은 총연금액
            sPnsStrtAg      : 0,    // 연금개시연령(관리자)
            mydtCusAge      : 0,    // 마이데이터고객연령(api응답)
            sAgYrcn         : 0,    // 연령년수(연금맞춤설정)
            sTotEntPrdVal   : 0,    // 총가입기간값(연금맞춤설정)
            mmPnsTts        : 0,    // 월연금총합
            sMmLfecs        : 0,    // 월생활비(관리자)

            isShowDtl       : false,// 국민연금 임의계속가입 정보 상세 노출 여부
        }
    },
    created() {
        
    },
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent(param) {
            console.log('>>> param >>> ', param)

            this.prtoDsc        = param.prtoDsc || '1'
            this.allPnsTts      = param.allPnsTts || 0
            this.sPnsStrtAg     = param.sPnsStrtAg || 0
            this.mydtCusAge     = param.mydtCusAge || 0
            this.sAgYrcn        = param.sAgYrcn || 0
            this.sTotEntPrdVal  = param.sTotEntPrdVal || 0
            this.mmPnsTts       = param.mmPnsTts || 0
            this.sMmLfecs       = param.sMmLfecs || 0
        },
        
        /**
         * 한글금액표시
         * amount: 원금액
         * tagYn: em태그 포함 여부
         * classNm: 태그 내 사용될 클래스명
         * startStr: 반환 문자열 내 첫 문자
         */
        fn_hanValue(amount, tagYn=false, classNm="", startStr="") {
            if(amount == 0) return "0원"

            const korUnits = ['', '만', '억', '조']
            let han_amount = parseInt(amount.split(',').join(''))
            let answer = ''
            let unit = 10000
            let idx = 1
            let division = Math.pow(unit, idx)

            while(Math.floor(han_amount / division) > 0) {
                const mod = Math.floor(han_amount % (division * unit) / division)
                if(mod) {
                    const modToString = mod.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
                    if(tagYn) {
                        answer = '<em class="'+ classNm + '">' + `${modToString}` + '</em>' + `${korUnits[idx]} ` + answer
                    } else {
                        answer = `${modToString}${korUnits[idx]} ` + answer
                    }
                }
                division = Math.pow(unit, ++idx)
            }

            return !!startStr ? startStr + (answer + '원').replace(' 원', '원') : (answer + '원').replace(' 원', '원')
        },

        /**
         * 국민연금 연결팝업
         */
        fn_moveJoinPop() {
            let param = {}
            let moduleParam = {}
            let moduleList = []

            moduleParam.orgC        = "PBAAVM0000"
            moduleParam.orgBzrgC    = "public"
            moduleParam.orgnm       = "국민연금공단"
            moduleList.push(moduleParam)

            param.moduleList = moduleList
            param.isOnlyPublic = true

            const config = {
                component: COAR2005,
                params: param
            }
            modalService.openPopup(config).then(() => {})
        },

        /**
         * 자산서브메인 이동
         */
        fn_moveAsetMain() {
            this.close()

            const config = {
                name: 'ASTA4S01'
            }
            commonService.movePage(config)
        }
    },
    mixins: [
        commonMixin,
        popupMixin
    ]
}
</script>