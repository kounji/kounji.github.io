<!--
/*************************************************************************
* @ 서비스경로 : 공통
* @ 페이지설명 : 서브메인 플로팅 배너
* @ 파일명     : src/components/CmmFlotBanner.vue
* @ 작성자     : CS541015
* @ 작성일     : 2025-03-19
* @ 비고       : 
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-19              CS541015              최초작성
************************************************************************/
-->

<template>
<div class="float_link" v-if="bannerYn == false && bannerList !=='' && bannerList !== null && bannerList !== undefined">
    <div class="float" aria-label="플로팅 배너">
        <lottie-animation :animationData="require('@/assets_v40/images/lottie/icon_float_char.json')" 
                        ref="anim"
                        :loop="true"
                        :auto-play="true" 
                        :speed="1"
                        aria-hidden="true" 
                        class="icon_float" 
        ></lottie-animation>
    </div>
    <ul class="list">
        <li>
            <a href="javascript:void(0);" @click.prevent="fn_movePage(bannerList.callUrlVal)">{{bannerList.bnnrDtlCntn}}</a> 
        </li>
    </ul>
    <button type="button" class="close" aria-label="플로팅 배너 삭제" @click.prevent="fn_FlotingCtrl('I')"></button>
</div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'
import LottieAnimation from 'lottie-web-vue'
import _ from 'lodash'

import COCO4052 from '@/views/page/CO/CO/COCO4052/COCO4052'

export default {
    name: 'CmmFlotIcon',
    data: () => {
        return {
            bannerList : {},  // 배너
            bannerYn   : true,
        }
    },
    mixins: [
        commonMixin
    ],
    mounted() {
        this.getFlotBanner()
    },
    methods: {
        /*
        * 서브메인 배너 목록 조회
        */
        getFlotBanner() {
            const config = {
                url: '/co/fl/01r01',
                data: {
                        chanDsc : this.getUserInfo('chnl') == '385' ? '001' : '002', // 001: 스마트뱅크, 002: 콕뱅크
                        bnnrExpsDsVal: '31'  // 배너노출구분값
                        },
                disableLoading : true,
            };

            apiService.call(config).then(response => {
                this.bannerYn = this.getNoSeeFloat("I")
                console.log("배너비노출여부 : ", this.bannerYn)
                
                let bannerList = response.bannerList
                bannerList = _.sampleSize(bannerList, 1)

                if(this.bannerYn == false){
                    this.bannerList = bannerList[0]
                }else {
                    this.bannerList = null
                }

                console.log("배너 목록 : ", this.bannerList)
            })
        },
        /*
        * 화면이동
        */
        fn_movePage(pageId) {
            const config = {
                name: pageId
            } 
            commonService.movePage(config)
        },
        /*
        * 닫기 선택
        */
        fn_FlotingCtrl(bnnrDsc){
            const config = {
                params : {
                    bnnrDsc : bnnrDsc
                },
                renderer : {
                    component : COCO4052
                }
            }
            modalService.openSlidePagePopup(config).then((response) => {
                if(response === 'bnrClose') {
                    this.getFlotBanner();
                }
            })
        },
    },
    components: {
        LottieAnimation,
	}  
}
</script>