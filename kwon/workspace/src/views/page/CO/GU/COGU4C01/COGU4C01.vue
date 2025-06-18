<!--
/*************************************************************************
* @ 서비스경로 : 서비스가입 > 서비스 가이드
* @ 페이지설명 : 청소년모드 마이데이터 전체 개요
* @ 파일명     : src/views/page/CO/GU/COGU4C01/COGU4C01.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-02-28
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-02-28              CS541013              최초작성
*************************************************************************/
-->
<template>
    <page class="content-view">
        <div id="content">
            <div class="mydata_outline">
                <div class="slick">
                    <div class="item">
                        <div class="card ty_01">
                            <span>마이데이터</span>
                            <strong>청소년을 위한<br>콕마이데이터(자산관리)<br>함께 하세요.</strong>
                            <p>나만의 자산관리 플래너</p>
                        </div>
                    </div>
                    <div class="item">
                        <div class="card ty_02">
                            <span>자산이야기</span>
                            <strong>자산 흐름을 한 눈에!<br>지금 바로<br>경험해 보세요.</strong>
                            <p>내 손 안에 자산리포트</p>
                        </div>
                    </div>
                    <div class="item">
                        <div class="card ty_03">
                            <span>소비이야기</span>
                            <strong>똑똑한 지출 관리로,<br>알뜰하게<br>돈 모으는 법</strong>
                            <p>부자되는 지름길 함께해요.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="btns_wrap fixed">
                <button type="button" class="btns lg primary" @click.prevent="fnOpenStart()">가입하고 시작하기</button>
            </div>

        </div>
    </page>
</template>

<script>
import COAS4001 from '@/views/page/CO/AS/COAS4001/COAS4001' // 서비스 가입

import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import $ from 'jquery'

export default {
    name : "COGU4C01",
    data: () => {
        return {
            rcmCd : "",     // 추천인 코드
        }
    },
    mounted() {
        this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        initComponent(params) {
            this.param = params || {}
            this.slick()
            
			this.rcmCd = this.param.rcmCd
        },
        /**
         * 서비스 가입 팝업 호출
         */
        fnOpenStart() {
            const config = {
                component: COAS4001, 
                params: {
                    rcmCd      : this.rcmCd              // 추천인 코드ray
                }
            }
            modalService.openPopup(config).then({})
        },
        fnOpenNoRegisterStart() {
			const config = {
                component: MAMA4U01, 
                params: {}
            }
            modalService.openPopup(config).then({})
		},
        slick() {
            var $outline =  $('.mydata_outline .slick');

            // $outline.on('afterChange', function(event, slick, currentSlide, nextSlide){
            // 	$(slick.$slides[currentSlide]).addClass('on');
            // });

            $outline.slick({
                speed : 200,
                dots : true,
                infinite : true,
                draggable : true,
                accessibility : true,
                centerMode : true,
                centerPadding : '3.1rem',
                slidesToShow : 1,
                arrows : false,
                cssEase : 'linear'
            });
        },
    },
}
</script>