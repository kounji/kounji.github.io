<!--
/*************************************************************************
* @ 서비스경로 : PFM메인 > 메인 (미가입자)
* @ 페이지설명 : 메인 (미가입자)
* @ 파일명     : src/views/page/MA/MA/MAMA4U01/MAMA4U01.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-03-13
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-13              CS541597              최초작성
***************************************************************************/
-->
<template>
    <div class="content-view">
        <div id="content">
            <section class="main_united">
                <div class="join_title">
                    <strong>아직 가입하지 않으셨네요.<button type="button" class="btns" @click.prevent="fn_regService">가입</button></strong>
                    <p>NH콕마이데이터(자산관리) 가입하면<br>자산 리포트 확인할 수 있어요</p>
                </div>

                <ul class="regis_list">
                    <li class="analysis">
                        <a href="javascript:void(0);" class="head" @click.prevent="fn_movePage('ASTA4U01')">나의 재무진단</a>
                        <div class="cont">
                            <div class="img_area"></div>
                            <p>가계재무와 미래준비에 대한<br>전문 재무분석 받을 수 있어요</p>
                        </div>
                    </li>
                    <li class="diagnosis">
                        <a href="javascript:void(0);" class="head" @click.prevent="fn_movePage('PDTA4U01')">나의 노후진단</a>
                        <div class="cont">
                            <div class="img_area"></div>
                            <p>연금으로 노후 준비 점검해요.</p>
                        </div>
                    </li>
                    <li class="expend">
                        <a href="javascript:void(0);" class="head" @click.prevent="fn_movePage('LCTA4U01')">나의 지출</a>
                        <div class="cont">
                            <div class="img_area"></div>
                            <p>나의 수입, 지출을 한 눈에 확인해요.</p>
                        </div>
                    </li>
                    <li class="saving">
                        <a href="javascript:void(0);" class="head" @click.prevent="fn_movePage('PDTA4U01')">나의 연금/절세</a>
                        <div class="cont">
                            <div class="img_area"></div>
                            <p>연금 진단, 절세 노하우 알려드려요.</p>
                        </div>
                    </li>
                </ul>

                <!-- [금융지식] -->
                <div class="finlit" v-show="financeKlList.length > 0">
                    <h2 class="h_tit01">금융지식</h2>
                    <a href="javascript:void(0);" class="btn_lots" @click.prevent="fn_movePage('COCT4001')"><span class="blind">더보기</span></a>

                    <div class="scroller">
                        <ul>
							<li v-for="(item, idx) in financeKlList" :key="idx">
								<a href="javascript:void(0);" @click.prevent="fn_openFncKlDtl(item.cntzId)">
									<img :src="item.thmnlImgUrlnm" alt="" @error="emptyImg">
									<strong>{{item.cntzTinm}}</strong>
									<span class="hash" v-if="!!item.rcmKwrdCntn">#{{item.rcmKwrdCntn}}</span>
								</a>
							</li>
						</ul>
                    </div>
                </div>

                <div class="current_banner">
                    <div class="title">
                        <span>이용하지 않는 마이데이터<br>서비스는 탈퇴하는게</span>
                        <p>내 소중한 개인정보를<br>지킬 수 있어요.</p>
                    </div>
                    <button type="button" class="btns md" @click.prevent="fn_openBrowser">나의 마이데이터 가입 현황</button>
                </div>

            </section>

        </div>

        <footersV2 type="" mktBannerYN='Y' />
	</div>
</template>
<script>
    import FootersV2 from '@/views/layout/FootersV2.vue'
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    import appService from '@/service/appService'
    import commonService from '@/service/commonService'
    import modalService from '@/service/modalService'
    import routerService from '@/service/routerService'
    import {dateFormat} from '@/utils/date'
    import {mapActions, mapGetters} from 'vuex'

    import COCT4011 from '@/views/page/CO/CT/COCT4011/COCT4011'
    import COGU4001 from '@/views/page/CO/GU/COGU4001/COGU4001'

    export default {
        name : "MAMA4U01",
        data: () => {
            return {
                currYm        : dateFormat(new Date(), "YYYYMM"), //현재년월
                currMm        : dateFormat(new Date(), "M"), //현재월

                financeKlList : [], // 금융지식 컨텐츠 목록
            }
        },
        computed: {
            
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        components: { 
            FootersV2,
        },
        mounted() {
            this.initComponent()

            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        methods: {
            ...mapActions('myassets', [
                'getAllMyAssetInfo',
                'getMyAssetInfo'
            ]),
            ...mapActions('layout', [
                'setMainFirstOpen',
                'setTobePage'
            ]),
            ...mapActions('user', [
                'setMyCreditInfo'   //신용정보(점수/등급) add. 2021.11.22
            ]),
            initComponent() {
                this.getData()
            },
            getData(mainFlag) {
                if(mainFlag === '' || mainFlag === undefined || mainFlag === null) {
                    mainFlag = '1'
                }
                
                // 금융지식 컨텐츠 조회
                this.getFinanInfo('MAMA4001', 0, false).then(response => {
                    this.financeKlList = response
                })
            },
            emptyImg(e) {
                e.target.src = new URL("@/assets_v40/images/event/ev_noimg.png", import.meta.url).href
            },
            /**
             * 서비스 가입 팝업
             */
            fn_regService() {
                const config = {
                    component: COGU4001
                }
                modalService.openPopup(config)
            },
            /**
             * 화면이동
             */
            fn_movePage(page) {
                const config = {
                    name: page
                }
                commonService.movePage(config)
            },
            /**
             * 금융지식 컨텐츠 상세 팝업오픈
             */
            fn_openFncKlDtl(cntzId) {
                const config = {
                    component: COCT4011,
                    params: cntzId
                }
                modalService.openPopup(config)
            },
            /**
             * 외부 브라우저 오픈
             */
            fn_openBrowser() {
                // 외부 브라우저 링크 오픈 
                let url = "http://www.mydatacenter.or.kr"

                // 외부 브라우저 링크 오픈 
                // chnl : 385 -> 스마트뱅크 , 386 -> 콕뱅크
                if(this.getUserInfo('chnl') === '385') {
                    // 스뱅
                    appService.executeBrowser(url)
                } else {
                    // 콕뱅
                    appService.cokBankOpenPopupWebBrowser(url)
                }
            },
            
        }
    }
</script>