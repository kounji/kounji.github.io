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
                    <div href="javascript:void(0);" class="board_box">
                        <h2>소비분석</h2>
                        <p>이번 달 지출 현황과 지난달의<br>변화를 한눈에 비교해 보세요.</p>
                        <a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openPopup('COAS4001')"><span class="icon_line_right">내역 불러오기</span></a>
                    </div>

                    <div href="javascript:void(0);" class="board_box">
                        <h2>지출수단별 사용내역</h2>
                        <p>카드, 페이, 현금 사용내역의<br>지출변화를 한눈에 확인해 보세요.</p>
                        <a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openPopup('COAS4001')"><span class="icon_line_right">내역 불러오기</span></a>
                    </div>

                    <div href="javascript:void(0);" class="board_box">
                        <h2>최근소비</h2>
                        <p>최근 나의 소비를<br>쉽고 빠르게 확인해 보세요.</p>
                        <a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openPopup('COAS4001')"><span class="icon_line_right">내역 불러오기</span></a>
                    </div>

                    <div href="javascript:void(0);" class="board_box">
                        <h2>유형별 지출분석</h2>
                        <p>나의 소비가 주로 어디에<br>사용되었는지 확인해 보세요.</p>
                        <a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openPopup('COAS4001')"><span class="icon_line_right">내역 불러오기</span></a>
                    </div>

                    <div href="javascript:void(0);" class="board_box">
                        <h2>정기지출</h2>
                        <p>이번 달 정기 지출<br>어디까지 나갔는지 확인해 보세요.</p>
                        <a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openPopup('COAS4001')"><span class="icon_line_right">내역 불러오기</span></a>
                    </div>

                    <div href="javascript:void(0);" class="board_box">
                        <h2>소비 줄이기</h2>
                        <p>계획적인 소비를 위한 지출 목표,<br>지금 설정하고 실천해 보세요.</p>
                        <a href="javascript:void(0);" class="btns md gray" @click.prevent="fn_openPopup('COAS4001')"><span class="icon_line_right">예산 설정하기</span></a>
                    </div>
                </div>
                <!--//25-02-10 텍스트 수정-->

                <!--배너-->
                <a href="javascript:void(0);" class="gotoCok" @click.prevent="fn_openPopup('COAS4001')" >
                    <img src="@/assets_v40/images/banner/img_banner_goto_cok.png" alt="나의 꿈을 현실로 NH콕뱅킹이 함께 합니다!" />
                </a>

                <a href="javascript:void(0);" class="img_banner" @click.prevent="fn_openPopup('COAS4001')"> <!--[v4.0] 2025-05-30 배너 추가 -->
                    <img src="@/assets_v40/images/banner/img_banner_spend.png" alt="월별 소비내역을 다운로드 받을 수 있어요">
                </a>

                <!--금융지식-->
                <div class="finlit" v-if="financeKlList.length > 0 && financeKlList"> 
                    <a href="javascript:void(0);" class="h_tit01" role="button" @click.prevent="fn_movePage('COCT4001')">금융지식</a>   
                    
                    <div class="scroller">
                        <ul>
                            <li v-for="(item, idx) in financeKlList" :key="idx">
                                <a href="javascript:void(0);" @click.prevent="fn_openFncKlDtl(item.cntzId)">
                                    <img :src="`/assets/images/fin_cont/${item.thmnlImgUrlnm}`" alt="" @error="emptyImg">
                                    <strong>{{item.cntzTinm}}</strong>
                                    <span class="hash" v-if="!!item.rcmKwrdCntn">#{{item.rcmKwrdCntn}}</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
        <footersV2 type="lc" />
    </page>
</template>

<script>

import COAS4001 from '@/views/page/CO/AS/COAS4001/COAS4001' // 서비스 가입
import COCT4011 from '@/views/page/CO/CT/COCT4011/COCT4011'

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
            financeKlList   : [],       // 금융지식 컨텐츠 목록
            rcmCd           : "",       // 추천인 코드
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
            this.getFinanceKlList()
        },  

        // 금융 지식 데이터 조회 
		getFinanceKlList() {       
			const config = {
			url: '/co/ct/01r03',
			data: {
					cntzTpc        : "N", // 화면모드(U 둘러보기/N 일반모드/S 큰글씨/C 청소년) >> 미가입자라하더라도 일반모드의 금융지식 노출
					scrnPsnEstCntn : "LCTA4001",  // 게시위치
					rowCnt         : 4,
					ageDsc         : "",          // 연령별구분여부코드
					}
			};

        	apiService.call(config).then(response => {
          		console.log("response ",response)
                this.financeKlList = response.klList
        	})
		},

        // 금융지식 컨텐츠 상세조회
        fn_openFncKlDtl(cntzId) {
            const config = {
                component: COCT4011,
                params: cntzId
            }
            modalService.openPopup(config)
        },

        // 팝업 호출
        fn_openPopup(compName) {
            let compenent = ''
            if(compName == "COAS4001") {  // 서비스 가입 약관 팝업
                compenent = COAS4001	
            }
            const config = {
                component: compenent,
            }
            modalService.openPopup(config)
        }, 

        fn_movePage(pageId) {
			const config = {
				name: pageId
			}
			commonService.movePage(config)
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