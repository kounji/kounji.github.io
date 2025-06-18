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
                    <strong>아직 가입하지 않으셨네요.<button type="button" class="btns" @click.prevent="fn_openPopup('COAS4001')">가입</button></strong>
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

                <!--[v4.0] 25-06-02 컨텐츠 추가 -->
                <!-- [NH지역정보] -->
                <div class="local_sheet">
                    <div class="sheet">
                        <div>
                            <a href="javascript:void(0);" role="button">
                                <dl class="item01">
                                    <dt>
                                        <span>NH지역정보</span>
                                        <strong>우리동네에는 어떤 축제가<br>열리고 있을까요?</strong>
                                    </dt>
                                    <dd>
                                        <p class="txt">지역별 축제를 확인해보세요.</p>
                                    </dd>
                                    <dd>
                                        <span class="link" @click.prevent="fn_movePage('RGFT4001')">지역축제</span>
                                    </dd>
                                </dl>
                            </a>
                        </div>
                        <div>
                            <a href="javascript:void(0);" role="button">
                                <dl class="item02">
                                    <dt>
                                        <span>NH지역정보</span>
                                        <strong>가까운 자전거길부터<br>천천히 도전해봐요.</strong>
                                    </dt>
                                    <dd>
                                        <p class="txt">강과 산을 따라 달리는<br>자전거길을 확인해보세요.</p>
                                    </dd>
                                    <dd>
                                        <span class="link" @click.prevent="fn_movePage('RGBM4001')">자전거길 국토종주</span>
                                    </dd>
                                </dl>
                            </a>
                        </div>
                        <div> 
                            <a href="javascript:void(0);" role="button">
                                <dl class="item03">
                                    <dt>
                                        <span>NH지역정보</span>
                                        <strong>몸과 마음을 쉬게하는<br>전국 둘레길</strong>
                                    </dt>
                                    <dd>
                                        <p class="txt">최고의 여행길,<br>전국 둘레길을 확인해보세요.</p>
                                    </dd>
                                    <dd>
                                        <span class="link" @click.prevent="fn_movePage('RGDM4001')">전국 둘레길</span>
                                    </dd>
                                </dl>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- [로또복권 번호 만들기] -->
                <a href="javascript:void(0);" class="board_box menu_lotto" role="button" @click.prevent="fn_openPopup('COAS4001')">
                    <div class="box_tit">
                        <span>NH콕마이데이터(자산관리)</span>
                        <strong>가입하면 로또번호<br>추천 받을 수 있어요.</strong>
                    </div>
                    <div class="btns md"><span class="icon_line_right">NH콕마이데이터(자산관리) 가입</span></div>
                </a>
                <!--//[v4.0] 2025-06-02 컨텐츠 추가 -->

                <!-- [금융지식] -->
                <div class="fin_sheet">
                    <a href="javascript:void(0);" class="board_box menu_fin" role="button" @click.prevent="fn_movePage('COCT4001')">
                        <div class="box_tit">
                            <span>금융지식</span>
                            <strong>현명한 소비와 알뜰한<br>재테크의 시작</strong>
                            <p>미래 계획에 한걸음 내딛어 보세요.</p>
                        </div>
                        <div class="btns md"><span class="icon_line_right">금융지식 바로가기</span></div>
                    </a>
                </div>

                <div class="current_banner">
                    <div class="title">
                        <span>고객님의 소중한 개인정보,<br>안전하게 보호됩니다.</span>
                        <p>내 자산 안전하게 관리하는<br>NH콕마이데이터</p>
                    </div>
                    <!-- <button type="button" class="btns md" @click.prevent="fn_openBrowser">지금 가입하기</button> -->
                    <button type="button" class="btns md" @click.prevent="fn_openPopup('COAS4001')">지금 가입하기</button>
                    
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
    import COAS4001 from '@/views/page/CO/AS/COAS4001/COAS4001'

    export default {
        name : "MAMA4U01",
        data: () => {
            return {
                currYm        : dateFormat(new Date(), "YYYYMM"), //현재년월
                currMm        : dateFormat(new Date(), "M"), //현재월

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
                this.slick()
            },

            emptyImg(e) {
                e.target.src = new URL("@/assets_v40/images/event/ev_noimg.png", import.meta.url).href
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

            // 화면 이동
            fn_movePage(page) {
                const config = {
                    name: page
                }
                commonService.movePage(config)
            },

            // 금융지식 컨텐츠 상세 팝업오픈
            fn_openFncKlDtl(cntzId) {
                const config = {
                    component: COCT4011,
                    params: cntzId
                }
                modalService.openPopup(config)
            },

            // 외부 브라우저 오픈
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

            slick() {
                // NH지역정보 //[v4.0] 25-06-02 컨텐츠 추가
                var $local =  $('.main_united .local_sheet');
                $local.each(function(){
                    let $this = $(this);

                    $(".sheet", $this).slick({
                        infinite: true,
                        speed: 300,
                        arrows:false,
                        dots:true,
                        centerPadding: '40px',
                    });
                });
            }
        }
    }
</script>