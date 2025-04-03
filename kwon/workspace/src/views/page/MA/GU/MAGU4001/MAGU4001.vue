<!--
/*************************************************************************
* @ 서비스경로 : 연금절세 > 대출이자 계산기
* @ 페이지설명 : 연금절세 > 대출이자 계산기 > 상환방식 풀팝업
* @ 파일명     : src/views/page/MA/GU/MAGU4001/MAGU4001.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-02-26
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-02-26              CS541013              최초작성
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

			<div class="service_intro theme">
				<div class="slick">
					<div class="item on">
						<div class="title">
							<span>NH콕마이데이터(자산관리)</span>
							<strong>리포트</strong>
							<p>자산의 흐름을 한눈에!<br>재무 진단 받고 나의 금융스타일 확인해 보세요.</p>
						</div>
						<div class="img_wrap"></div>
					</div>
					<div class="item">
						<div class="title">
							<span>NH콕마이데이터(자산관리)</span>
							<strong>나의 자산</strong>
							<p>자산, 부채 변화를 한눈에 파악하고, <br>금융 지식을 쌓으며 스마트하게 자산관리 하세요.</p>
						</div>
						<div class="img_wrap"></div>
					</div>
					<div class="item">
						<div class="title">
							<span>NH콕마이데이터(자산관리)</span>
							<strong>나의 지출</strong>
							<p>돈 관리, 어렵지 않아요.<br>월별 지출과 카드, 페이, 현금 사용 내역을 한눈에 확인하세요.</p>
						</div>
						<div class="img_wrap"></div>
					</div>
					<div class="item">
						<div class="title">
							<span>NH콕마이데이터(자산관리)</span>
							<strong>나의 연금/절세</strong>
							<p>노후 준비를 위해 얼마나 모았을까?<br>연금자산 체크하고 절세 꿀팁 챙겨가세요.</p>
						</div>
						<div class="img_wrap"></div>
					</div>
					<div class="item">
						<div class="title">
							<span>NH콕마이데이터(자산관리)</span>
							<strong>추천</strong>
							<p>이벤트, 부동산, 마이카, 지역축제소식, <br>금융브리핑 다양한 컨텐츠 이용해 보세요.</p>
						</div>
						<div class="img_wrap"></div>
					</div>
					<div class="item">
						<div class="title">
							<span>NH콕마이데이터(자산관리)</span>
							<strong>금융지식</strong>
							<p>궁금했던 금융 정보, 12가지 테마로 쉽게 알아보세요!<br>생활 속 금융 지식을 다양한 주제로 한눈에 확인할 수 있어요.</p>
						</div>
						<div class="img_wrap"></div>
					</div>
					<div class="item">
						<div class="title">
							<span>NH콕마이데이터(자산관리)</span>
							<strong>NH지역정보 지역축제</strong>
							<p>신나는 축제 한가득.<br>한국관광공사와 함께 전국 축제 여행 떠나요!</p>
						</div>
						<div class="img_wrap"></div>
					</div>
					<div class="item">
						<div class="title">
							<span>NH콕마이데이터(자산관리)</span>
							<strong>NH지역정보 지역문화시설</strong>
							<p>특별한 문화 체험, 이제 쉽게 찾아보세요!<br>전국의 멋진 문화시설을 확인해 보세요.</p>
						</div>
						<div class="img_wrap"></div>
					</div>
					<div class="item">
						<div class="title">
							<span>NH콕마이데이터(자산관리)</span>
							<strong>NH지역정보 농촌여행</strong>
							<p>농가에서 함께 생활하며, 농사도 배우고, <br>문화도 즐기고, 농촌의 매력을 느껴봐요!</p>
						</div>
						<div class="img_wrap"></div>
					</div>
					<div class="item">
						<div class="title">
							<span>NH콕마이데이터(자산관리)</span>
							<strong>NH지역정보 자전거 국토종주</strong>
							<p>자전거 여행 계획 중이라면<br>인기 코스부터 주변 시설까지 한눈에 알려드려요!</p>
						</div>
						<div class="img_wrap"></div>
					</div>
					<div class="item">
						<div class="title">
							<span>NH콕마이데이터(자산관리)</span>
							<strong>NH지역정보 전국 둘레길</strong>
							<p>한 걸음 한 걸음이 즐거운 길!<br>전국 둘레길 여행, 함께 떠나봐요.</p>
						</div>
						<div class="img_wrap"></div>
					</div>
					<div class="item">
						<div class="title">
							<span>NH콕마이데이터(자산관리)</span>
							<strong>NH지역정보 군장병 TMO 안내</strong>
							<p>편한 이동을 위해! 군장병 TMO 이용법, <br>쉽고 빠르게 안내해 드려요.</p>
						</div>
						<div class="img_wrap"></div>
					</div>
					<div class="item">
						<div class="title">
							<span>NH콕마이데이터(자산관리)</span>
							<strong>로또복권 번호만들기</strong>
							<p>매일매일~ 하루 다섯 번!<br>내 행운의 로또 번호 받아가세요.</p>
						</div>
						<div class="img_wrap"></div>
					</div>
					<div class="item">
						<div class="title">
							<span>NH콕마이데이터(자산관리)</span>
							<strong>친구초대</strong>
							<p>친구와 함께 금융 목표 달성!<br>자산관리도 이용해 보세요.</p>
						</div>
						<div class="img_wrap"></div>
					</div>
					<div class="item">
						<div class="title">
							<span>NH콕마이데이터(자산관리)</span>
							<strong>나의 관심서비스</strong>
							<p>내가 자주 찾는 서비스,<br>이제 전체메뉴에서 바로바로! 더 편리하게 이용하세요.</p>
						</div>
						<div class="img_wrap"></div>
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
    }
}
</script>