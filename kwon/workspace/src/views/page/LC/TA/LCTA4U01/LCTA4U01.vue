<!--
/*************************************************************************
* @ 서비스경로 : 미가입자 > 지출
* @ 페이지설명 : 미가입자 > 지출
* @ 파일명     : src/views/page/LC/TA/LCTA4U01/LCTA4U01.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-03-19
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-19              CS541597              최초작성
*************************************************************************/
-->
<template>
    <page class="content-view">
        <div id="content">
            <section class="wallet_main">
                
                <!--가입유도-->
                <!--25-02-10 텍스트 수정-->
                <div class="plz_join">
                    <div href="#nolink" class="board_box">
                        <h2>소비분석</h2>
                        <p>이번 달 지출 현황과 지난달의<br>변화를 한눈에 비교해 보세요.</p>
                        <a href="#" class="btns md gray"><span class="icon_line_right">내역 불러오기</span></a>
                    </div>

                    <div href="#nolink" class="board_box">
                        <h2>지출수단별 사용내역</h2>
                        <p>카드, 페이, 현금 사용내역의<br>지출변화를 한눈에 확인해 보세요.</p>
                        <a href="#" class="btns md gray"><span class="icon_line_right">내역 불러오기</span></a>
                    </div>

                    <div href="#nolink" class="board_box">
                        <h2>최근소비</h2>
                        <p>최근 나의 소비를<br>쉽고 빠르게 확인해 보세요.</p>
                        <a href="#" class="btns md gray"><span class="icon_line_right">내역 불러오기</span></a>
                    </div>

                    <div href="#nolink" class="board_box">
                        <h2>유형별 지출분석</h2>
                        <p>나의 소비가 주로 어디에<br>사용되었는지 확인해 보세요.</p>
                        <a href="#" class="btns md gray"><span class="icon_line_right">내역 불러오기</span></a>
                    </div>

                    <div href="#nolink" class="board_box">
                        <h2>정기지출</h2>
                        <p>이번 달 정기 지출<br>어디까지 나갔는지 확인해 보세요.</p>
                        <a href="#" class="btns md gray"><span class="icon_line_right">내역 불러오기</span></a>
                    </div>

                    <div href="#nolink" class="board_box">
                        <h2>소비 줄이기</h2>
                        <p>계획적인 소비를 위한 지출 목표,<br>지금 설정하고 실천해 보세요.</p>
                        <a href="#" class="btns md gray"><span class="icon_line_right">예산 설정하기</span></a>
                    </div>
                </div>
                <!--//25-02-10 텍스트 수정-->

                <!--배너-->
                <a href="#nolink" class="gotoCok">
                    <img src="@/assets_v40/images/banner/img_banner_goto_cok.png" alt="나의 꿈을 현실로 NH콕뱅킹이 함께 합니다!" />
                </a>

                <!--금융지식-->
                <div class="finlit">
                    <h2 class="h_tit01">금융지식</h2>
                    <a href="#nolink" class="btn_lots"><span class="blind">더보기</span></a>

                    <div class="scroller">
                        <ul>
                            <li>
                                <a href="#nolink">
                                    <img src="@/assets_v40/images/img/img_generation_60.png" alt="">
                                    <strong>진화하는 보이스 피싱</strong>
                                    <span class="hash">#사고예방</span>
                                </a>
                            </li>
                            <li>
                                <a href="#nolink">
                                    <img src="@/assets_v40/images/img/img_generation_60.png" alt="">
                                    <strong>나의 지출이 줄지 않는 이유?!</strong>
                                    <span class="hash">#금융지식</span>
                                </a>
                            </li>
                            <!-- <li>
                                <a href="#nolink">
                                    <img src="../../../../src/assets_v40/images/img/img_generation_60.png" alt="">
                                    <strong>연금저축 및 IRP 가입하고<br>노후 자금 준비</strong>
                                    <span class="hash">#40대</span>
                                </a>
                            </li>
                            <li>
                                <a href="#nolink">
                                    <img src="../../../../src/assets_v40/images/img/img_generation_60.png" alt="">
                                    <strong>맞벌이 부부를 위한 세금<br>절약 노하우</strong>
                                    <span class="hash">#30대</span>
                                </a>
                            </li>
                            <li>
                                <a href="#nolink">
                                    <img src="../../../../src/assets_v40/images/img/img_generation_60.png" alt="">
                                    <strong>첫 직장 생활에서의<br>소득공제 활용법</strong>
                                    <span class="hash">#20대</span>
                                </a>
                            </li>
                            <li>
                                <a href="#nolink">
                                    <img src="../../../../src/assets_v40/images/img/img_generation_60.png" alt="">
                                    <strong>첫 직장 생활에서의<br>소득공제 활용법</strong>
                                    <span class="hash">#10대</span>
                                </a>
                            </li> -->
                        </ul>
                    </div>
                </div>
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
import LottieAnimation from 'lottie-web-vue'

export default {
    name : "LCTA4U01",
    data: () => {
        return {
            financeKlList      : [], // 금융지식 컨텐츠 목록
        }
    },
    computed : {

    },
    watch: {
        
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
        initComponent() {
            this.getData()
        },   
        /*
         * 데이터 조회
         */
        getData() {
            this.getFinanInfo('LCTA4001', 5, false).then(response => {
                this.financeKlList = response
                // *출력값
                // -썸네일이미지URL명  = thmnlImgUrlnm
                // -글번호 = cntzId
                // -컨텐츠제목 = cntzTinm
                // -추천연령 = asetAgLrgDsnm
            })
        },
        /**
         * 금융지식 컨텐츠 상세조회
         */
        fn_openFncKlDtl(cntzId) {
            const config = {
                component: COCT4011,
                params: cntzId
            }
            modalService.openPopup(config)
        },
        emptyImg(e) {
			e.target.src = new URL("@/assets_v40/images/event/ev_noimg.png", import.meta.url).href
		},
    },
    components: {
        Page,
        FootersV2,
        LottieAnimation
    },
}
</script>