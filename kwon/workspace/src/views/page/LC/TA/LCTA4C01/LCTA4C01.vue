<!--
/*************************************************************************
* @ 서비스경로 : 청소년모드 > 지출 > 지출메인
* @ 페이지설명 : 청소년모드 > 지출 > 지출메인
* @ 파일명     : src/views/page/LC/TA/LCTA4C01/LCTA4C01.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-03-24
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-24              CS541597              최초작성
*************************************************************************/
-->
<template>
    <page class="content-view">
        <div id="content">
            <section class="wallet_youth">
                <div class="update">
                    <span>2025.07.31 15:20</span>
                    <button type="button" class="btn_update"><span class="blind">업데이트</span></button>
                </div>

                <!--개요-->
                <div class="outline down"><!--늘은경우 up ,줄은 경우 down class 추가, 0원인 경우 nil class 추가-->
                    <div class="board_box">
                        <h2><a href="#nolink">11월 지출</a></h2>

                        <p class="txt">508,780원</p>

                        <!--동일한 경우
                        <div class="analysis">
                            <span class="text">지난달 지출과</span> <em>동일해요.</em>
                            <div class="custom_tooltip">
                                <div class="com_tooltip_type02 com_tooltip_type03">
                                    <a href="#nolink" class="com_btn_info" role="button">
                                        <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                    </a>
                                    <div class="com_ballon_type01 com_ballon_type02" style="display: none;">
                                        <div>
                                            <ul class="dotted_list">
                                                <li>마지막 업데이트 시점의 총 지출과 마지막 업데이트 전 월 말일 총지출을 비교했습니다.</li>
                                                <li>오늘 업데이트 하셨으면 전 월 말일 총 지출과 비교한 결과입니다.</li>
                                            </ul>
                                            <a href="#nolink" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        -->

                        <!--줄은 경우 -->
                        <div class="analysis">
                            <span class="text">지난달보다</span> <span class="num">1,000원</span> <em>덜 쓰고 있어요.</em>
                            <div class="custom_tooltip">
                                <div class="com_tooltip_type02 com_tooltip_type03">
                                    <a href="#nolink" class="com_btn_info" role="button">
                                        <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                    </a>
                                    <div class="com_ballon_type01 com_ballon_type02" style="display: none;">
                                        <div>
                                            <ul class="dotted_list">
                                                <li>마지막 업데이트 시점의 총 지출과 마지막 업데이트 전 월 말일 총지출을 비교했습니다.</li>
                                                <li>오늘 업데이트 하셨으면 전 월 말일 총 지출과 비교한 결과입니다.</li>
                                            </ul>
                                            <a href="#nolink" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!--늘은경우 
                        <div class="analysis">
                            <span class="text">지난달보다</span> <span class="num">1,000원</span> <em>더 쓰고 있어요.</em>
                            <div class="custom_tooltip">
                                <div class="com_tooltip_type02 com_tooltip_type03">
                                    <a href="#nolink" class="com_btn_info" role="button">
                                        <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                    </a>
                                    <div class="com_ballon_type01 com_ballon_type02" style="display: none;">
                                        <div>
                                            <ul class="dotted_list">
                                                <li>마지막 업데이트 시점의 총 지출과 마지막 업데이트 전 월 말일 총지출을 비교했습니다.</li>
                                                <li>오늘 업데이트 하셨으면 전 월 말일 총 지출과 비교한 결과입니다.</li>
                                            </ul>
                                            <a href="#nolink" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        -->

                        <!--0원인 경우 
                        <div class="analysis">
                            <span class="text">11월 지출</span> <em class="text">내역이 없어요.</em>
                            <div class="custom_tooltip">
                                <div class="com_tooltip_type02 com_tooltip_type03">
                                    <a href="#nolink" class="com_btn_info" role="button">
                                        <em class="com_icon_info"><span class="blind">툴팁열기</span></em>
                                    </a>
                                    <div class="com_ballon_type01 com_ballon_type02" style="display: none;">
                                        <div>
                                            <ul class="dotted_list">
                                                <li>마지막 업데이트 시점의 총 지출과 마지막 업데이트 전 월 말일 총지출을 비교했습니다.</li>
                                                <li>오늘 업데이트 하셨으면 전 월 말일 총 지출과 비교한 결과입니다.</li>
                                            </ul>
                                            <a href="#nolink" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        -->

                    </div>

                    <a href="#nolink">지출분석 상세보기</a>
                </div>

                <!--카드-->
                <div class="board_box wallet_spend">
                    <h2><a href="#nolink" class="title">카드 이용 금액</a></h2>
                    <div class="card">
                        <span class="num">14,070원</span>
                    </div>
                </div>  

                <!--페이-->
                <div class="board_box wallet_spend">
                    <h2><a href="#nolink" class="title">페이 이용 금액</a></h2>
                    <div class="pay">
                        <span class="num">14,070원</span>
                    </div>
                </div>

                <!--현금-->
                <div class="board_box wallet_spend">
                    <h2><a href="#nolink" class="title">현금 이용 금액</a></h2>
                    <div class="cash">
                        <span class="num">14,070원</span>
                    </div>
                </div>
                
                <!--금융지식-->
                <!-- 25-03-18 금융지식 삭제
                <div class="finlit">
                    <h2 class="h_tit01">금융지식</h2>
                    <a href="#nolink" class="btn_lots"><span class="blind">더보기</span></a>

                    <div class="scroller">
                        <ul>
                            <li>
                                <a href="#nolink">
                                    <img src="../../../../src/assets_v40/images/img/img_generation_60.png" alt="">
                                    <strong>부자의 첫걸음,<br>금리와 복리를 이해하라!</strong>
                                    <span class="hash">#콕셍긱</span>
                                </a>
                            </li>
                            <li>
                                <a href="#nolink">
                                    <img src="../../../../src/assets_v40/images/img/img_generation_50.png" alt="">
                                    <strong>2025년 트렌드 키워드<br>10초 요약</strong>
                                    <span class="hash">#일반/트렌드</span>
                                </a>
                            </li>
                            !-- <li>
                                <a href="#nolink">
                                    <img src="../../../../src/assets_v40/images/img/img_generation_40.png" alt="">
                                    <strong>연금저축 및 IRP 가입하고 노후 자금 준비</strong>
                                    <span class="hash">#40대</span>
                                </a>
                            </li>
                            <li>
                                <a href="#nolink">
                                    <img src="../../../../src/assets_v40/images/img/img_generation_30.png" alt="">
                                    <strong>맞벌이 부부를 위한 세금 절약 노하우</strong>
                                    <span class="hash">#30대</span>
                                </a>
                            </li>
                            <li>
                                <a href="#nolink">
                                    <img src="../../../../src/assets_v40/images/img/img_generation_20.png" alt="">
                                    <strong>첫 직장 생활에서의 소득공제 활용법</strong>
                                    <span class="hash">#20대</span>
                                </a>
                            </li>
                            <li>
                                <a href="#nolink">
                                    <img src="../../../../src/assets_v40/images/img/img_generation_10.png" alt="">
                                    <strong>첫 직장 생활에서의 소득공제 활용법</strong>
                                    <span class="hash">#10대</span>
                                </a>
                            </li> --
                        </ul>
                    </div>
                </div>
                -->
            </section>
        </div>
        <footersV2 type="lc" />
    </page>
</template>

<script>

import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import commonService from '@/service/commonService'
import modalService from '@/service/modalService'
import {dateFormat, getLastDay, dayDiff} from '@/utils/date'
import {mapActions, mapGetters} from 'vuex'
import LottieAnimation from 'lottie-web-vue'

import COAR4001 from '@/views/page/CO/AR/COAR4001/COAR4001.vue'
import COCT4011 from '@/views/page/CO/CT/COCT4011/COCT4011.vue'
import LCTA4S03 from '@/views/page/LC/TA/LCTA4S03/LCTA4S03.vue'
import LCTA4S04 from '@/views/page/LC/TA/LCTA4S04/LCTA4S04.vue'
import LCTA4S06 from '@/views/page/LC/TA/LCTA4S06/LCTA4S06.vue'
import LCTA4S07 from '@/views/page/LC/TA/LCTA4S07/LCTA4S07.vue'
import LCTA4S08 from '@/views/page/LC/TA/LCTA4S08/LCTA4S08.vue'

import _ from 'lodash'

export default {
    name : "LCTA4C01",
    data: () => {
        return {
            mydtCusno       : '',       // 마이데이터고객번호
            cusnm           : '',       // 고객명
            executeCnt      : 0,        // 실행 count
            finalUpdateDtm  : '',       // 최근 자산 업데이트 시기

            
        }
    },
    computed : {
        ...mapGetters('myassets', [
            'isMyAssetGathering',
            'lastUpdateDtm',
            'myAssetsBzRgCnt',
            'myAssetInfo',
            'myAssetsBzrgList'
        ]),
    },
    watch: {
        isMyAssetGathering (value) {
            if(!value) this.getData()
        },
    },
    mixins: [
        commonMixin
    ],
    created() {
        
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        ...mapActions('myassets', [
            'getAllMyAssetInfo',
            'getMyAssetInfo',
        ]),        
        initComponent() {
            
        },
    },
    components: {
        Page,
        FootersV2,
        LottieAnimation
    },
}
</script>