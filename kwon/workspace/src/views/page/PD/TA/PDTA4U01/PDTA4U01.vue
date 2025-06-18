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

                    <p class="em">아직 가입하지 않으셨네요! <button type="button" class="btns" @click.prevent="fn_openPopup('COAS4001')">가입</button></p>
                    <p class="txt">콕자산관리 가입하면 확인할 수 있어요.</p>
                </div>

                <!--분류별 개요-->
                <div class="board_box pension_outline">
                    <div class="plz">
                        <p><em>NH콕마이데이터(자산관리) 가입</em>하고<br>내가 모은 연금 진단해보세요!</p>
                        <lottie-animation :animationData="require('@/assets_v40/images/lottie/icon_pension_plz.json')" :loop="true" :autoPlay="true" aria-hidden="true" class="icon_pension" ></lottie-animation>
                    </div>

                    <div class="bottom">
                        <button type="button" class="btn_connect" @click.prevent="fn_openPopup('COAS4001')">NH콕마이데이터(자산관리) 가입하기</button>
                    </div>
                </div>
                <!--//25-02-10 텍스트 수정 / 버튼 추가 / 로티영역 추가-->
                
                <!--세대별 절세 노하우-->
                <div class="finlit" v-if="financeKlList.length > 0 && financeKlList">
                    <a href="javascript:void(0);" class="h_tit01" role="button" @click.prevent="fn_movePage('COCT4001')">세대별 절세 노하우</a> <!--[v4.0] 2025-05-27 타이틀 링크 영역 수정 -->

                    <div class="scroller">
                        <ul>
                            <li v-for="(item, idx) in financeKlList" :key="idx">
                                <a href="javascript:void(0);" @click.prevent="fn_openFncKlDtl(item.cntzId)">
                                    <img :src="`/assets/images/fin_cont/${item.thmnlImgUrlnm}`" alt="" @error="emptyImg"/>
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
                    <a href="javascript:void(0);" class="board_box rect tax" @click.prevent="fn_openPopup('COTP0004')">
                        <em>세금납부 확인</em>
                        내가 낸 세금, 쉽게 확인하세요.
                    </a>

                    <a href="javascript:void(0);" class="board_box rect insure" @click.prevent="fn_openPopup('COTP0004')">
                        <em>건강보험 가입내역</em>
                        내 건강보험 가입내역을 확인하세요.
                    </a>
                </div>
                
                <!--대출계산기-->
                <div class="board_box_wrap banner">
                    <a href="javascript:void(0);" class="board_box calc1" @click.prevent="fn_openPopup('COTP0004')">
                        <em>대출이자 계산기</em>
                        쉽고 빠른<br>대출금 계산하기
                    </a>
                    <a href="javascript:void(0);" class="board_box calc2" @click.prevent="fn_openPopup('COTP0004')">
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
import COTP0004 from '@/views/page/CO/TP/COTP0004/COTP0004'

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
            this.getFinanceKlList()
        },

        // 금융 지식 데이터 조회 
		getFinanceKlList() {       
			const config = {
			url: '/co/ct/01r03',
			data: {
					cntzTpc        : "N", // 화면모드(U 둘러보기/N 일반모드/S 큰글씨/C 청소년) >> 미가입자라하더라도 일반모드의 금융지식 노출
					scrnPsnEstCntn : "PDTA4001",  // 게시위치
					rowCnt         : 0,
					ageDsc         : "Y",          // 연령별구분여부코드
					}
			};

        	apiService.call(config).then(response => {
          		this.financeKlList = response.klList
        	})
		},

        // 금융 지식 컨텐츠 상세 조회
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

        // 화면 이동
        fn_movePage(page) {
            const config = {
                name: page
            }
            commonService.movePage(config)
        },

        // 팝업 호출
		fn_openPopup(compName) {
			let compenent = ''
            if(compName == "COAS4001") { // 서비스 가입 약관 팝업
				compenent = COAS4001	
			} else if(compName == "COTP0004") { // 미가입자 가입필요 팝업
				compenent = COTP0004	
			} 
			const config = {
				component: compenent,
			}
			modalService.openPopup(config)
		}, 

    },
    components: {
        Page,
        FootersV2,
        LottieAnimation
    },
}
</script>