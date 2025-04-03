<!--
/*************************************************************************
* @ 서비스경로 : 큰글 > 서비스소개
* @ 페이지설명 : 큰글 > 서비스소개
* @ 파일명     : src/views/page/MA/GU/MAGU4S01/MAGU4S01.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-02-26
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-02-26              CS541013              최초작성
* 2025-03-17			  CS541597				퍼블 수정본 반영
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup " id="full_popup_01">
		<div class="popup_header">
			<h1>서비스 소개</h1>
			<button type="button" class="prev"><span class="blind">이전</span></button>
		</div>

		<div class="popup_content">
			<div class="service_intro senior">
				<div class="tit_wrap">
					<span class="pin purple">큰글</span>
					<h2 class="headline"><strong>NH콕마이데이터(자산관리)<br>서비스를 소개합니다.</strong></h2>
				</div>
				<div class="intro_list">
					<div class="board_box intro_report">
						<div class="tit">
							<a href="#nolink" class="btn_acco">
								<strong>리포트</strong>
								<div class="blind">
									<span class="show">열기</span>
									<span class="hide">닫기</span>
								</div>
							</a>
						</div>
						<div class="cont">
							<div class="img_wrap"></div>
							<p class="txt">나의 자산, 지출, 연금/절세를<br>
								한 화면에서 큰 글씨로 쉽게 확인할 수 있어요.</p>
						</div>
					</div>

					<div class="board_box intro_asset">
						<div class="tit">
							<a href="#nolink" class="btn_acco">
								<strong>나의 자산</strong>
								<div class="blind">
									<span class="show">열기</span>
									<span class="hide">닫기</span>
								</div>
							</a>
						</div>
						<div class="cont">
							<div class="img_wrap"></div>
							<p class="txt">자산 변화를 큰 글씨로 간편하게 확인하고,<br>
								더 쉽게 관리해 보세요!</p>
						</div>
					</div>

					<div class="board_box intro_wallet">
						<div class="tit">
							<a href="#nolink" class="btn_acco">
								<strong>나의 지출</strong>
								<div class="blind">
									<span class="show">열기</span> 
									<span class="hide">닫기</span>
								</div>
							</a>
						</div>
						<div class="cont">
							<div class="img_wrap"></div>
							<p class="txt">돈 관리가 쉬워져요.<br> 
								월별 지출과 결제수단별 내역을 깔끔하게 보여드리고, 필요한 정보만 간편하게 제공해 드려요.</p>
						</div>
					</div> 

					<div class="board_box intro_pension">
						<div class="tit">
							<a href="#nolink" class="btn_acco">
								<strong>나의 연금/절세</strong>
								<div class="blind">
									<span class="show">열기</span> 
									<span class="hide">닫기</span>
								</div>
							</a>
						</div>
						<div class="cont">
							<div class="img_wrap"></div>
							<p class="txt">국민연금부터 퇴직연금까지, 내 연금자산을<br> 
								한곳에서 확인하고 절세 팁도 받아보세요!</p>
						</div>
					</div>

					<div class="board_box intro_finance">
						<div class="tit">
							<a href="#nolink" class="btn_acco">
								<strong>금융지식</strong>
								<div class="blind">
									<span class="show">열기</span> 
									<span class="hide">닫기</span>
								</div>
							</a>
						</div>
						<div class="cont">
							<div class="img_wrap"></div>
							<p class="txt">12가지 주제로 쉽게 풀어드리는 금융 정보,<br>
								궁금한 내용을 한눈에 확인하세요!</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	
		<div class="popup_footer fixed">
			<div class="btn_full_box btns_wrap">
				<button type="button" class="btns lg primary" @click.prevent="close()">닫기</button>
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
    name : "MAGU4001",
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
    },
}
</script>