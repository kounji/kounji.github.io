<!--
/*************************************************************************
* @ 서비스경로 : PFM메인 > 메인 > 마케팅 배너
* @ 페이지설명 : 마케팅 배너
* @ 파일명     : src/views/page/MA/MA/MAMA2009/MAMA2009.vue
* @ 작성자     : CS529599
* @ 작성일     : 2022-08-25
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-25              CS529599                 최초작성
*************************************************************************/
-->
<template>
    <div class="marketing_popup_box">
        <div aria-hidden="false" class="marketing_popup_inner" id="slide_popup_02">
            <div class="popup_content">
                <!-- case 1 : popup 다건 -->
                <div id="slider_01" class="slider_wrap" v-if="bannerList.length > 1">
                    <div class="tab_cont">
                        <template v-for="(bannerItem, idx) in bannerList">
                            <template v-if="idx < 3">
                                <div role="tabpanel" class="cmm-tab-panel" :key="idx">
                                    <a href="javascript:void(0);" id="" v-on:click="linkClick(bannerItem)">
                                        <div class="slide slide01">
                                            <img :src="`/assets/images/banner/${bannerItem.cntzImgFlid}`" alt="">
                                            <p>{{bannerItem.bnnrDtlCntn}}</p>
                                            <button type="button">바로가기</button>
                                        </div>
                                    </a>
                                </div>
                            </template>
                        </template>
                        <!--
                        <div role="tabpanel" class="cmm-tab-panel">
                            <a href="javascript:void(0):;">
                                <div class="slide slide01">
                                    <img src="@/assets/images/newmain/img/img_slide_img01.png">
                                    <p>신차 견적내고 대출까지 바로! 신차</p>
                                </div>
                            </a>
                        </div>
                        <div role="tabpanel" class="cmm-tab-panel">
                            <a href="javascript:void(0):;">
                                <div class="slide slide02">
                                    <img src="@/assets/images/newmain/img/img_slide_img01.png">
                                    <p>글자 2 글자 2 글자</p>
                                </div>
                            </a>
                        </div>
                        -->
                    </div>
                </div>
                
                <!-- case 2 : popup 단건 -->
                <template v-if="bannerList.length == 1">
                    <div id="slider_01" class="slider_wrap slider_solo">
                        <div class="tab_cont">
                            <template v-for="(bannerItem, idx) in bannerList">
                                <div role="tabpanel" class="cmm-tab-panel" :key="idx">
                                    <a href="javascript:void(0);" role="button" v-on:click="linkClick(bannerItem)">
                                        <div class="slide slide01">
                                            <img :src="`/assets/images/banner/${bannerItem.cntzImgFlid}`" alt="" />
                                            <p>{{bannerItem.bnnrDtlCntn}}</p>
                                            <button type="button">바로가기</button>
                                        </div>
                                    </a>
                                </div>
                            </template>
                        </div>
                    </div>
                </template>
            </div>
            <a href="javascript:void(0);" class="btn_close" @click.prevent="closeMktBanner()"><span class="blind">닫기</span></a>
        </div>
    </div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import appService from '@/service/appService'
import commonService from '@/service/commonService'
import modalService from '@/service/modalService'
// import {dateFormat} from '@/utils/date'
import {fncSlick_MktBanner} from '@/utils/slick'

import MREV2002 from '@/views/page/MR/EV/MREV2002/MREV2002'

export default {
    name : "MAMA2009",
    data: () => {
        return {
            bannerList  : [], // 마케팅배너 목록
        }
    },
    computed: {
        mydtCusno(){
            return this.getUserInfo('mydtCusno')
        },
    },
    created() {
    },
    mounted() {
        this.initComponent()
    },
    methods: {
        initComponent() {
        },
        setData(bannerList) {
            // for (let i = 0; i < bannerList.length; i++) {
            //     if (!bannerList[i].cntzImgFlid) bannerList[i].cntzImgFlid = `banner/${bannerList[i].cntzImgFlid}`
            // }

            this.bannerList = bannerList
            this.$nextTick(()=>{
                fncSlick_MktBanner()
            })
        },
        closeMktBanner() {
            let currIdx = $('.marketing_popup_inner .popup_content .slider_wrap .tab_cont').slick('slickCurrentSlide');

            let bannerItem = this.bannerList[currIdx]
            let savedItem = {}
            savedItem['chanDsc'] = bannerItem.chanDsc
            savedItem['bnnrExpsDsVal'] = bannerItem.bnnrExpsDsVal
            savedItem['bnnrSqno'] = bannerItem.bnnrSqno
            // savedItem['savedDate'] = dateFormat(new Date(), "YYYYMMDD")

            let clickedList = commonService.getStorage('mktBanner' + this.getUserInfo('chnl'))
            if (!Array.isArray(clickedList)) clickedList = []

            let isExists = false
            let item = null
            for (let i = 0; i < clickedList.length; i++) {
                item = clickedList[i]
                if (item.chanDsc == bannerItem.chanDsc && item.bnnrExpsDsVal == bannerItem.bnnrExpsDsVal && item.bnnrSqno == bannerItem.bnnrSqno) {
                    isExists = true
                    // item['savedDate'] = dateFormat(new Date(), "YYYYMMDD")
                    break;
                }
            }

            if (!isExists) {
                clickedList.push(savedItem)
            }

            commonService.setStorage('mktBanner' + this.getUserInfo('chnl') , clickedList)
            // this.getData()
        },
        linkClick(bannerItem) {
            // 외부 URL 호출
            if (bannerItem.outUrlCallYn == '1') {
                let url = bannerItem.outUrlVal
                if (this.getUserInfo('chnl') === '385') {
                    appService.executeBrowser(url);
                } else {
                    appService.cokBankOpenPopupWebBrowser(url);
                }
            } else {
                // 호출 URL (채널ID)
                if (bannerItem.callUrlVal) {
                    this.fn_movePage(bannerItem.callUrlVal)
                }
            }
        },
        fn_movePage(pageId) {
            // pageId로 페이지 목록 찾기
            let page = commonService.findPageItem({name : pageId})
            console.log('findPageItem ## ', page)
            // 이동할 페이지가 페이지 목록에 없다면(팝업 호출)
            if (!page?.name) {
                let config = {
                    component : null,
                }
                if (pageId === 'MREV2002') {
                    config.component = MREV2002
                }
                modalService.openPopup(config).then()
            } else {
                // 이동할 페이지가 페이지 목록에 있다면(페이지 이동)
                const config = {
                    name : pageId
                }
                commonService.movePage(config);
            }
        }
    },
    mixins: [
        commonMixin
    ],
    components : {
    }
}
</script>