<!--
/*************************************************************************
* @ 서비스경로 : PFM메인 > 메인
* @ 페이지설명 : 마이데이터 전체 개요
* @ 파일명     : src/views/page/CO/GU/COGU4001/COGU4001.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-01-21
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-01-21              CS541013              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1></h1>
		</div>

		<div class="popup_content">
			<div class="mydata_outline">
				<div class="slick">
					<div class="item">
						<div class="card ty_01">
							<span>마이데이터</span>
							<strong>새로워진<br>NH콕마이데이터<br>(자산관리)</strong>
							<p>나만의 자산관리 플래너</p>
						</div>
					</div>
					<div class="item">
						<div class="card ty_02">
							<span>자산이야기</span>
							<strong>자산 흐름을 한 눈에!<br>지금 바로<br>체험해 보세요.</strong>
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
					<div class="item">
						<div class="card ty_04">
							<span>연금/절세</span>
							<strong>연금 자산 분석하고<br>부족한 부분을<br>채워드립니다.</strong>
							<p>공제한도 알아보기</p>
						</div>
					</div>
					<div class="item">
						<div class="card ty_05">
							<span>추천</span>
							<strong>연금과 부동산<br>최선의 선택은?</strong>
							<p>우리들의 노후 고민</p>
						</div>
					</div>
					<div class="item">
						<div class="card ty_06">
							<span>지역</span>
							<strong>지역 축제가<br>기다리고 있어요.</strong>
							<p>어디로 가볼까요?</p>
						</div>
					</div>
					<div class="item">
						<div class="card ty_07">
							<span>금융지식</span>
							<strong>모르면 손해!<br>알아야<br>돈이 모인다!</strong>
							<p>쉽고 재미있는 금융 지식</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	
		<div class="popup_footer fixed">
			<div class="btn_full_box btns_wrap">
				<button type="button" class="btns lg primary" @click.prevent="fnOpenStart()">가입하고 시작하기</button>
				<button type="button" class="btns_txt">체험하기</button>
			</div>
		</div>
		
		<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
		
	</div>
	<!--// full popup E -->
</template>

<script>
import COAS4001 from '@/views/page/CO/AS/COAS4001/COAS4001' // 서비스 가입

import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import $ from 'jquery'

export default {
    name : "COGU4001",
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
            this.slick()
            
            if(Object.keys(params).length == 0) {
                this.rcmCd = "DK38GKS95HB"
            } else {
                this.rcmCd = params.rcmCd
            }
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
        }
    }
}
</script>