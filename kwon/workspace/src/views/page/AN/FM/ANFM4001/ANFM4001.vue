<!--
/*************************************************************************
* @ 서비스경로 : 제휴서비스 > 귀농귀촌 > 메인
* @ 페이지설명 : 귀농귀촌 > 메인
* @ 파일명     : src/views/page/AN/FM/ANFM4001/ANFM4001.vue
* @ 작성자     : CS528205
* @ 작성일     : 2022-08-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-17              CS528205              최초작성 
* 2025-08-17              CS540683              상호금융 NH콕마이데이터 4.0 추진 개발 ANFM2001 → ANFM4001 
*************************************************************************/
-->
<template>
    <page class="content-view">
        <!--
        <an-category-v2 type="ANFM"></an-category-v2>
        -->
        <div id="content" class="sub_main renewal">
            <div class="com_inner">
                <strong class="com_cont_tit01"><span class="txt_black">귀농을 희망하는</span>
                도시민의 성공적인 농촌 정착!</strong>
                <!-- 22-10-26 class banner_line 추가 -->
                <div class="banner_slider slick_refresh banner_line"  v-if="bannerList.length > 0">
                    <div v-for="(item, idx) in bannerList" :key="idx">
                        <a href="javascript:void(0);" v-if="item.outUrlCallYn === '1'" role="button" @click.prevent="openWebBrowser(item.outUrlVal)">
                            <img :src="`/assets/images/banner/${item.cntzActlImgFlnm}.${item.cntzImgFlXcrnm}`" :alt="item.bnnm + ', ' + item.bnnrDtlCntn">
                        </a>
                        <a href="javascript:void(0);" v-else-if="item.callUrlVal !== null && item.callUrlVal !== ''" role="button" @click.prevent="movePage(item.callUrlVal)">
                            <img :src="`/assets/images/banner/${item.cntzActlImgFlnm}.${item.cntzImgFlXcrnm}`" :alt="item.bnnm + ', ' + item.bnnrDtlCntn">
                        </a>
                        <a href="javascript:void(0);" v-else>
                            <img :src="`/assets/images/banner/${item.cntzActlImgFlnm}.${item.cntzImgFlXcrnm}`" :alt="item.bnnm + ', ' + item.bnnrDtlCntn">
                        </a>
                    </div>
                </div>
                <a href="javascript:void(0);" role="button" class="blue_link ico03" @click.prevent="openPopup('ANFM2002', null)">
                    <strong class="tit">귀농ㆍ귀촌을 꿈꾸고 있나요? </strong>
                    <p>한 계단씩 차근차근 준비할 것을
                        진단해보세요!
                    </p>
                </a>
                <strong class="com_cont_tit01 mt30">똑똑한 AI 맞춤 지도 추천</strong>
                <div class="map_point">
                    <!-- <span class="img">
                        <img src="" alt="">
                    </span> -->

                    <div class="point_box point01">
                        <i class="icon_point">
                            <i></i>
                        </i>
                        <a href="javascript:void(0)" role="button" @click.prevent="openPopup('ANFM2003', 1)">
                            주거지와 인근<br/>농지를 찾아줘요!
                            <span class="arrow">한번에 찾기</span>
                        </a>
                    </div>
                    <div class="point_box point02">
                        <i class="icon_point">
                            <i></i>
                        </i>
                        <a href="javascript:void(0)" role="button" @click.prevent="openPopup('ANFM2003', 0)">
                            귀농의 시작,<br/>최적의 농지 추천!
                            <span class="arrow">농지 찾기</span>
                        </a>
                    </div>
                    <div class="point_box point03">
                        <i class="icon_point">
                            <i></i>
                        </i>
                        <a href="javascript:void(0)" role="button" @click.prevent="openPopup('ANFM2003', 2)">
                            내 귀농 보금자리<br/>찾아봐요!
                            <span class="arrow">주거지 찾기</span>
                        </a>
                    </div>
                </div>
                <p class="com_txtinfo_type01 color_ty">매물 정보는 공시지가 평당 기준으로만 제공하며, 지번주소 기준으로 매매가 정보는 제공되지 않습니다.</p>
                <!-- 20240823 정책자금 제외      
                <div class="notice_post">
                    <strong class="post_tit ico01">지원정책</strong>
                    <div class="post_txt fade_slider slick_refresh">
                        <div v-for="(item, idx) in sptPlyFdList" class="" :key="idx" >
                            <a href="javascript:void(0)" role="button" @click.prevent="openPopup('SZPC2109', generateDetailPlyFdPopParams(item))">{{item.bbrdTinm}}</a>
                        </div>
                    </div>
                    <a href="javascript:void(0)" role="button" class="link_arrow" @click.prevent="movePage('SZPC2101')">더보기</a>
                </div>
                -->
                <div class="mint_box">
                    <div class="com_cont_tit01">
                        <strong>내게 맞는 금융상품 가이드</strong>
                    </div>
                    <span class="icon_mint">희망귀농인</span>
                    <p class="txt_box">퇴직해서 귀농을 계획중인데
                        미리 준비할 수 있는 
                        금융상품은 뭔가요?
                        </p>
                    <a href="javascript:void(0)" role="button" class="btn_sm arrow" @click.prevent="movePage('PDPD1001')">추천 금융상품 전체보기</a>
                    <a href="javascript:void(0)" role="button" class="link_arrow" @click.prevent="openPopup('ANFM2005', null)">바로가기</a>
                </div>
                <div class="inner_banner">
                    <a href="javascript:void(0);" role="button"  @click.prevent="openPopup('ANFM2006', null)">
                        <img src="@/assets/images/banner/img_benner_17.png" alt="예비 귀농귀촌인을 위한 교육프로그램 체계적인 교육지원을 받아보세요! - 추천 교육과정 신청하기">
                    </a>
                </div>
                <div class="box_border_link">
                    <a href="javascript:void(0)" role="button" class="ico07" @click.prevent="openWebBrowser('https://www.nongsaro.go.kr/portal/farmTechMain.ps?menuId=PS65291')">
                        <strong>어떤 작물 기를까요?</strong>
                        <strong class="link">희망 작물 찾기</strong>
                    </a>
                    <a href="javascript:void(0)" role="button" class="ico08" @click.prevent="openWebBrowser('http://soil.rda.go.kr/m/soil/soilmap/crop.jsp')">
                        <strong>생산작물에 최적지는?</strong>
                        <strong class="link">작물별 재배적지</strong>
                    </a>
                </div>
                <span class="com_cont_tit02 custom_f16 mt25"><strong>귀농ㆍ귀촌</strong>에 대한 더 많은 궁금증이 있다면?</span>
                <div class="bg_diary_cell car_buy">
                    <a href="javascript:void(0)" role="button" class="cell ico03" @click.prevent="openWebBrowser('https://www.greendaero.go.kr/svc/rfph/case/front/consultCaseListMain.do')">
                        <strong class="font_normal">귀농사례</strong>
                    </a>
                    <a href="javascript:void(0)" role="button" class="cell ico04" @click.prevent="openWebBrowser('https://www.greendaero.go.kr/svc/rfph/front/rfphConsultFaqMain.do')">
                        <strong class="font_normal">귀농FAQ</strong>
                    </a>
                    <a href="javascript:void(0)" role="button" class="cell ico05" @click.prevent="openWebBrowser('https://www.greendaero.go.kr/svc/rfph/edc/live/front/apply/list.do')">
                        <strong class="font_normal">귀농체험</strong>
                    </a>
                </div>
            </div>
        </div>

        <footersV2 type="an"/>
    </page>
</template>

<script>
    import Page from '@/views/layout/Page.vue'
    import AnCategoryV2 from '@/components/category/AnCategoryV2.vue'
    import FootersV2 from '@/views/layout/FootersV2.vue'
    import appService from '@/service/appService'
    import apiService from '@/service/apiService'
	import commonService from '@/service/commonService'
    import modalService from '@/service/modalService'
    import _ from 'lodash'
    import {fncSlick_Farm, fadeSlider} from '@/utils/slick'

    import SZPC2109 from '@/views/page/SZ/PC/SZPC2109/SZPC2109'
    import ANFM2003 from '@/views/page/AN/FM/ANFM2003/ANFM2003'
    import ANFM2002 from '@/views/page/AN/FM/ANFM2002/ANFM2002'
    import ANFM2005 from '@/views/page/AN/FM/ANFM2005/ANFM2005'
    import ANFM2006 from '@/views/page/AN/FM/ANFM2006/ANFM2006'

    import commonMixin from '@/common/mixins/commonMixin'

    export default {
        name : "ANFM4001",
        data: () => {
            return {
                /* 20240823 정책자금 제외
                sptPlyFdList : [],          // 정책자금목록
                cusInteKwrdList : [],       // 검색키워드목록
                */
                bannerList : [],            // 관리자연동배너목록
            }
        },
        mounted() {
            this.initComponent(this.params)

            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        mixins: [
            commonMixin
        ],
        methods: {
            initComponent() {
                this.getData()
                fncSlick_Farm(500, null, null, 0)
            },
            getData() {
                // this.getSupportPolFundsList()
                this.getBannerList()
            },
            /** 20240823 정책자금 제외
            
             * 지원정책자금 목록 가져오기
             
            getSupportPolFundsList() {
                // 지원정책자금 설정항목 조회
                const config = {
                    url : "/sz/pc/02r01",
                    data : {
                        cptDsc : '1',  
                    }
                }
                apiService.call(config).then(response => {
                    let sptDvsList 	= response.sptDvsList || []
                    let rgnList 		= response.rgnList || []
                    let bzcList 		= response.bzcList || []
                    let coprFormList 	= response.coprFormList || []

                    this.generateSearchKwdList(sptDvsList, rgnList, bzcList, coprFormList)

                    // 지원정책자금 목록 조회 
                    const config2 = {
                        url : '/an/fm/01ra1',
                        data : {
                            "cusInteKwrdList"     : this.cusInteKwrdList,
                            "pageNo"        : 1
                        }
                    }
                    apiService.call(config2).then(response => {
                        var tempList   = response.sptPlyFdList || []
                        // 지원정책 10개만 가져오기
                        if (tempList.length > 10) {
                            this.sptPlyFdList = tempList.slice(0, 10)
                        } else {
                            this.sptPlyFdList = tempList
                        }
                        this.$nextTick(()=> {
                            fadeSlider(200, null, null, 0)
                        })
                    })
                })
            }
            ,*/

            
            /**
             * 
             * 관리자 배너 목록 가져오기
             */
            getBannerList() {
                const config = {
                    url:        '/an/fm/01ra2',
                    data: 
                    {
                        bnnrExpsDsVal:  '02',   // 농림식품부
                        chanDsc:        this.getUserInfo('chnl') === '385' ? '001' : '002',   // 001 : 스뱅, 002 : 콕뱅
                    }
                }
                apiService.call(config).then(response => {
                    this.bannerList = response.bannerList || [];
                });
            },
            /**
             * 검색 조건 리스트 생성 
             *  - 지원분야 : 전체
             *  - 지역 : 전체
             *  - 업종 : 농업, 임업 및 어업
             *  - 기업형태 : 전체
             */
            generateSearchKwdList(sptDvsList, rgnList, bzcList, coprFormList) {
                let sptDvsTot 	= _.find(sptDvsList, {'inteKwrdCntnExpl':'전체'})
                let rgnTot 		= _.find(rgnList, {'inteKwrdCntnExpl':'전체'})
                let coprFormTot = _.find(coprFormList, {'inteKwrdCntnExpl':'전체'})

                if(typeof sptDvsTot != "undefined") {
                    sptDvsList.splice(sptDvsList.indexOf(sptDvsTot, 1))
                }
                if(typeof rgnTot != "undefined") {
                    rgnList.splice(rgnList.indexOf(rgnTot, 1))
                }
                if(typeof coprFormTot != "undefined") {
                    coprFormList.splice(coprFormList.indexOf(coprFormTot, 1))
                }

                var bzcTot
                var i
                for (i = 0; i < bzcList.length; i++) {
                    let item = bzcList[i]
                    if (item.inteKwrdCntnExpl.includes('농업')) {
                        bzcTot = item;
                        break;
                    }
                }

                this.changePycpDsc(sptDvsList, "01")
                this.changePycpDsc(rgnList, "02")
                this.changePycpDsc(bzcList, "03")
                this.changePycpDsc(coprFormList, "04")

                let tempList = [];
                tempList.push(bzcTot);
                this.pushItem(tempList, sptDvsList)
                this.pushItem(tempList, rgnList)
                this.pushItem(tempList, coprFormList)

                this.cusInteKwrdList = tempList
            },
            changePycpDsc(list, value) {
                for(var i=0; i<list.length; i++) {
                    list[i].pycpInteKwrdDsc = value
                }
            },
            pushItem(targetList, list) {
                for(var i=0; i<list.length; i++) {
                    targetList.push(list[i])
                }
            },
            openPopup(popupId, params) {
                let compName = null
                if (popupId === 'ANFM2003') {
                    compName = ANFM2003
                } else if (popupId === 'SZPC2109') {
                    compName = SZPC2109
                } else if (popupId === 'ANFM2002') {
                    compName = ANFM2002
                } else if (popupId === 'ANFM2006') {
                    compName = ANFM2006
                } else if (popupId === 'ANFM2005') {
                    compName = ANFM2005
                }

                if (compName === null) {
                    console.log("미구현 화면 :: ", popupId)
                    return
                }

                const config = {
                    component: compName,
                    params : params
                }

                modalService.openPopup(config).then((response) => {
                    if (response === 'SZPC2101') {
                        this.movePage(response)
                    }
                })
            },
            /**
             * 외부 브라우저 열기
             */
            openWebBrowser(url) {
                if (this.getUserInfo('chnl') === '385') {
                    appService.executeBrowser(url);
                } else {
                    appService.cokBankOpenPopupWebBrowser(url);
                }
            },
            generateDetailPlyFdPopParams(listData) {
                return {
                            pycpOrnDsc  : listData.pycpOrnDsc,
                            dataRflDt   : listData.dataRflDt,
                            sqno        : listData.sqno,
                        }
            },
            /**
             * 화면 전환
             */
            movePage(pageName) {
				const config = {
					name: pageName
				}
				commonService.movePage(config)
            }
        },
        components : {
            Page,
            FootersV2,
            AnCategoryV2
        }
    }

</script>