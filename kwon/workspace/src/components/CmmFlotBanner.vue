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
    <p class="top_banner" :class="addClass != '' ? addClass : ''" v-if="bannerYn == false && bannerList !=='' && bannerList !== null && bannerList !== undefined">
        <a href="javascript:void(0);" @click.prevent="fn_movePage(bannerList.callUrlVal)">{{bannerList.bnnrDtlCntn}}</a>
        <button type="button" class="btn_x" @click.prevent="fn_FlotingCtrl()"><span class="blind">삭제</span></button>
    </p>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'
import _ from 'lodash'
import COCO4052 from '@/views/page/CO/CO/COCO4052/COCO4052'
import COAR4001 from '@/views/page/CO/AR/COAR4001/COAR4001'
import MAGU4001 from '@/views/page/MA/GU/MAGU4001/MAGU4001'   // v4 서비스소개


export default {
    name: 'CmmFlotBanner',
    props: {
        bnnrExpsDsVal : String,
        addClass      : String
    },
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
        * 메인 상단 플로팅 배너 목록 조회
        */
        getFlotBanner() {
            const config = {
                url: '/co/fl/01r01',
                data: {
                        chanDsc : this.getUserInfo('chnl') == '385' ? '001' : '002', // 001: 스마트뱅크, 002: 콕뱅크
                        bnnrExpsDsVal: this.bnnrExpsDsVal  // 배너노출구분값 31: 통합메인아이콘, 41: 통합메인, 42: 자산, 43: 지출, 44: 연금절세, 45: NH지역정보
                      },
                disableLoading : true,
            };

            apiService.call(config).then(response => {
                this.bannerYn = this.getNoSeeFloat()
                console.log("배너비노출여부 : ", this.bannerYn)

                let bannerList = response.bannerList
                bannerList = _.sampleSize(bannerList, 1)

                if(this.bannerYn == false){
                    this.bannerList = bannerList[0]
                }else {
                    this.bannerList = null
                }
                console.log("상단배너 : ", this.bannerList)
            })
        },
        /*
        * 화면이동
        */
        fn_movePage(pageId) {
            let popName = "";

            if(pageId == 'COAR4001'){
                popName = COAR4001
            }else if(pageId == 'MAGU4001'){
                popName = MAGU4001
            }

            const config = {
                name : pageId,
                component : popName
            }

            if(popName){
                modalService.openPopup(config).then(() => {
                    this.$emit('reload');
                })
            }else{
                commonService.movePage(config)
            }
                     
        },
        /*
        * 닫기 선택
        */
        fn_FlotingCtrl(){
            const config = {
                params : {
                },
                renderer : {
                    component : COCO4052
                }
            }
            modalService.openSlidePagePopup(config).then((response) => {
                if(response === 'bnrClose') {
                    this.getFlotBanner()
                }
            })
        },
    }
}
</script>