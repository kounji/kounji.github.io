<!--
/*************************************************************************
* @ 서비스경로 : 미가입자 > 연금/절세
* @ 페이지설명 : 미가입자 > 연금/절세
* @ 파일명     : src/views/page/PD/TA/PDTA4U01/PDTA4U01.vue
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
            <section class="pension_main">

                <!--25-02-10 텍스트 수정 / 버튼 추가 / 로티영역 추가-->
                <!--개요-->
                <div class="outline">
                    <h2>노후준비를 위해 모은 돈</h2>

                    <p class="em">아직 가입하지 않으셨네요! <button type="button" class="btns" @click.prevent="openJoinPop">가입</button></p>
                    <p class="txt">콕자산관리 가입하면 확인할 수 있어요.</p>
                </div>

                <!--분류별 개요-->
                <div class="board_box pension_outline">
                    <div class="plz">
                        <p><em>NH콕마이데이터(자산관리) 가입</em>하고<br>내가 모은 연금 진단해보세요!</p>
                        <lottie-animation :animationData="require('@/assets_v40/images/lottie/icon_pension_plz.json')" :loop="true" :autoPlay="true" aria-hidden="true" class="icon_pension" ></lottie-animation>
                    </div>

                    <div class="bottom">
                        <button type="button" class="btn_connect" @click.prevent="openJoinPop">NH콕마이데이터(자산관리) 가입하기</button>
                    </div>
                </div>
                <!--//25-02-10 텍스트 수정 / 버튼 추가 / 로티영역 추가-->
                
                <!--세대별 절세 노하우-->
                <div class="finlit">
                    <h2 class="h_tit01">세대별 절세 노하우</h2>
                    <a href="#nolink" class="btn_lots"><span class="blind">더보기</span></a>

                    <div class="scroller">
                        <ul>
                            <li v-for="(item, idx) in financeKlList" :key="idx">
                                <a href="javascript:void(0);" @click.prevent="fn_openFncKlDtl(item.cntzId)">
                                    <img :src="item.thmnlImgUrlnm" alt="" @error="emptyImg"/>
                                    <span class="gen">{{item.asetAgLrgDsnm}}</span>
                                    <strong>{{item.cntzTinm}}</strong>
                                    <span class="hash" v-if="!!item.rcmKwrdCntn">#{{item.rcmKwrdCntn}}</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <!--여러가지-->
                <div class="move_banner">
                    <a href="#nolink" class="board_box rect tax" @click.prevent="openJoinPop">
                        <em>세금납부 확인</em>
                        내가 낸 세금, 쉽게 확인하세요.
                    </a>

                    <a href="#nolink" class="board_box rect insure" @click.prevent="openJoinPop">
                        <em>건강보험 가입내역</em>
                        내 건강보험 가입내역을 확인하세요.
                    </a>
                </div>
                
                <!--대출계산기-->
                <div class="board_box_wrap banner">
                    <a href="#nolink" class="board_box calc1" @click.prevent="openJoinAlert">
                        <em>대출이자 계산기</em>
                        쉽고 빠른<br>대출금 계산하기
                    </a>
                    <a href="#nolink" class="board_box calc2" @click.prevent="openJoinAlert">
                        <em>대출한도 계산기</em>
                        DSR계산하고 대출<br>가능금액 확인하기
                    </a>
                </div>
                <!-- //[v4.0] 25-03-20 미가입자용 컨텐츠 추가 -->
            </section>
        </div>
        <footersV2 type="pd" />
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

import COCT4011 from '@/views/page/CO/CT/COCT4011/COCT4011'
import COAS4001 from '@/views/page/CO/AS/COAS4001/COAS4001'
import COAS4015 from '@/views/page/CO/AS/COAS4015/COAS4015'

export default {
    name : "PDTA4U01",
    data: () => {
        return {
            financeKlList: [],   // 금융지식 컨텐츠 목록
        }
    },
    computed : {
        
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
            this.getFinanInfo('PDTA4001', 0, true).then(response =>{
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
                params: cntzId,
            }
            modalService.openPopup(config)
        },
        emptyImg(e) {
            e.target.src = new URL("@/assets_v40/images/event/ev_noimg.png", import.meta.url).href
        },
        /**
         * 서비스 가입 이동
         */
        openJoinPop() {
            const config = {
                component: COAS4001,
            }
            modalService.openPopup(config)
        },
        /**
		 * 서비스 가입 필요 팝업
		 */
		openJoinAlert() {
            const config = {
                component: COAS4015,
            }
            modalService.openPopup(config).then(response => {
                console.log('>>> pop res >>> ', response)
            })
        }
    },
    components: {
        Page,
        FootersV2,
        LottieAnimation
    },
}
</script>