<!--
/*************************************************************************
* @ 서비스경로 : 청소년모드 > 서비스소개
* @ 페이지설명 : 청소년모드 > 서비스소개
* @ 파일명     : src/views/page/MA/GU/MAGU4C01/MAGU4C01.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-02-26
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-02-26              CS541013              최초작성
* 2025-03-17			  Cs541597				퍼블 수정본 반영
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup " id="full_popup_01">
		<div class="popup_header">
			<h1>서비스 소개</h1>
			<!-- [v4.0] 25-03-31 이전버튼 삭제 <button type="button" class="prev"><span class="blind">이전</span></button> -->
		</div>

		<div class="popup_content">
			<div class="service_intro youth">
				<div class="tit_wrap">
					<span class="pin blue">청소년</span>
					<h2 class="headline"><strong>NH콕마이데이터(자산관리)<br>서비스를 소개합니다.</strong></h2>
				</div>
				<div class="intro_list">
					<div class="board_box intro_report">
						<div class="tit">
							<a href="javascript:void(0);" class="btn_acco" role="button">
								<strong>마이데이터 홈</strong>
								<div class="blind">
									<span class="show">열기</span>
									<span class="hide">닫기</span>
								</div>
							</a>
						</div>
						<div class="cont">
							<div class="img_wrap"></div>
							<p class="txt">내 자산, 내 지출!<br>
								이제 쉽게 관리하고, 똑똑하게 돈을 써보자!</p>
						</div>
					</div>

					<div class="board_box intro_asset">
						<div class="tit">
							<a href="javascript:void(0);" class="btn_acco" role="button">
								<strong>나의 자산</strong>
								<div class="blind">
									<span class="show">열기</span>
									<span class="hide">닫기</span>
								</div>
							</a>
						</div>
						<div class="cont">
							<div class="img_wrap"></div>
							<p class="txt">통장 잔액, 페이, 포인트 모두<br> 
								한곳에서 쉽게 확인할 수 있어요.</p>
						</div>
					</div>

					<div class="board_box intro_wallet">
						<div class="tit">
							<a href="javascript:void(0);" class="btn_acco" role="button">
								<strong>나의 지출</strong>
								<div class="blind">
									<span class="show">열기</span> 
									<span class="hide">닫기</span>
								</div>
							</a>
						</div>
						<div class="cont">
							<div class="img_wrap"></div>
							<p class="txt">내 소비 패턴이 궁금하다면?<br>
								월별 지출과 사용 내역을 쉽게 체크할 수 있어요!</p>
						</div>
					</div> 

					<!-- 
					<div class="board_box intro_finance">
						<div class="tit">
							<a href="javascript:void(0);" class="btn_acco">
								<strong>금융지식</strong>
								<div class="blind">
									<span class="show">열기</span> 
									<span class="hide">닫기</span>
								</div>
							</a>
						</div>
						<div class="cont">
							<div class="img_wrap"></div>
							<p class="txt">금융이 어렵지 않아요!<br>
								다양한 주제로 생활 속 금융 정보를 쉽게 배워보자!</p>
						</div>
					</div>
					-->
				</div>
			</div> 

		</div>
	
		<div class="popup_footer fixed">
			<div class="btn_full_box btns_wrap">
				<button type="button" class="btns lg primary" @click.prevent="close(0)">닫기</button>
			</div>
		</div>
		
		<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
		
	</div>
	<!--// full popup E -->
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import $ from 'jquery'

export default {
    name : "MAGU4C01",
    data: () => {
        return {
            
        }
    },
    mounted() {
        this.slick();
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        slick() {
            var $intro =  $('.service_intro .slick');
			
			$intro.on('afterChange', function(event, slick, currentSlide, nextSlide){
				if (currentSlide === 0) {
					$('.service_intro').addClass('theme');
				} else {
					$('.service_intro').removeClass('theme');
				}
				$(slick.$slides[currentSlide]).addClass('on');
			});

			$intro.slick({
				speed : 400,
				dots : true,
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,		
				draggable: true,
				accessibility:true,
				arrows : false,
				cssEase:'linear'
			});
        }
    }
}
</script>