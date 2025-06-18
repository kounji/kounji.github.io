<!--
/*************************************************************************
* @ 서비스경로 : 홈 > 서비스 소개
* @ 페이지설명 : 홈 > 서비스 소개
* @ 파일명     : src/views/page/CO/CO/COTP0050/COTP0050.vue
* @ 작성자     : CS540687
* @ 작성일     : 2025-03-06
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-06              CS540687              최초작성
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
			<div class="service_intro">
				<div class="tit_wrap">
					<span class="pin green">일반</span>
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
							<p class="txt">자산의 흐름을 한눈에!<br>
								재무 진단 받고 나의 금융스타일 확인해 보세요.</p>
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
							<p class="txt">자산, 부채 변화를 한눈에 파악하고,<br>
								금융 지식을 쌓으며 스마트하게 자산관리 하세요.</p>
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
							<p class="txt">돈 관리, 어렵지 않아요.<br>
								월별 지출과 카드, 페이, 현금 사용 내역을<br>
								한눈에 확인하세요.</p>
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
							<p class="txt">노후 준비를 위해 얼마나 모았을까?<br>
								연금자산 체크하고 절세 꿀팁 챙겨가세요.</p>
						</div>
					</div>

					<div class="board_box intro_recom">
						<div class="tit">
							<a href="#nolink" class="btn_acco">
								<strong>추천</strong>
								<div class="blind">
									<span class="show">열기</span> 
									<span class="hide">닫기</span>
								</div>
							</a>
						</div>
						<div class="cont">
							<div class="img_wrap"></div>
							<p class="txt">이벤트, 부동산 마이카, 지역축제소식, 금융브리핑<br>
								다양한 컨텐츠를 이용해 보세요.</p>
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
							<p class="txt">궁금했던 금융 정보, 12가지 테마로 쉽게 알아보세요!<br>
								생활 속 금융 지식을 다양한 주제로 한눈에<br>
								확인할 수 있어요.</p>
						</div>
					</div>

					<div class="board_box intro_local">
						<div class="tit">
							<a href="#nolink" class="btn_acco">
								<strong>NH지역정보</strong>
								<div class="blind">
									<span class="show">열기</span> 
									<span class="hide">닫기</span>
								</div>
							</a>
						</div>
						<div class="cont">
							<div class="sec_innner item01">
								<div class="img_wrap"></div>
								<strong class="tit">지역축제</strong>
								<p class="txt">신나는 축제 한가득.<br>
									한국관광공사와 함께 전국 축제 여행 떠나요!</p>
							</div>
							<div class="sec_innner item02">
								<div class="img_wrap"></div>
								<strong class="tit">지역문화시설</strong>
								<p class="txt">특별한 문화 체험, 이제 쉽게 찾아보세요!<br>
									전국의 멋진 문화시설을 확인해 보세요.</p>
							</div>
							<div class="sec_innner item03">
								<div class="img_wrap"></div>
								<strong class="tit">농촌여행</strong>
								<p class="txt">농가에서 함께 생활하며, 농사도 배우고,<br>
									문화도 즐기고, 농촌의 매력을 느껴봐요!</p>
							</div>
							<div class="sec_innner item04">
								<div class="img_wrap"></div>
								<strong class="tit">자전거길 국토종주</strong>
								<p class="txt">자전거 여행 계획 중이라면<br>
									인기 코스부터 주변 시설까지 한눈에 알려드려요!</p>
							</div>
							<div class="sec_innner item05">
								<div class="img_wrap"></div>
								<strong class="tit">전국 둘레길</strong>
								<p class="txt">한 걸음 한 걸음이 즐거운 길!<br>
									전국 둘레길 여행, 함께 떠나봐요.</p>
							</div>
							<div class="sec_innner item06">
								<div class="img_wrap"></div>
								<strong class="tit">군장병 TMO안내</strong>
								<p class="txt">편한 이동을 위해! 군장병 TMO 이용법,<br>
									쉽고 빠르게 안내해 드려요.</p>
							</div>
						</div>
					</div>

					<div class="board_box intro_event">
						<div class="tit">
							<a href="#nolink" class="btn_acco">
								<strong>이벤트/혜택</strong>
								<div class="blind">
									<span class="show">열기</span> 
									<span class="hide">닫기</span>
								</div>
							</a>
						</div>
						<div class="cont">
							<div class="sec_innner item01">
								<div class="img_wrap"></div>
								<strong class="tit">로또복권 번호만들기</strong>
								<p class="txt">매일매일~ 하루 다섯 번!<br>
									내 행운의 로또 번호 받아가세요.</p>
							</div>
							<div class="sec_innner item02">
								<div class="img_wrap"></div>
								<strong class="tit">친구초대</strong>
								<p class="txt">친구와 함께 금융 목표 달성!<br> 
									자산관리도 이용해 보세요.</p>
							</div>
						</div>
					</div>
					
					<div class="board_box intro_favorite">
						<div class="tit">
							<a href="#nolink" class="btn_acco">
								<strong>나의 관심서비스</strong>
								<div class="blind">
									<span class="show">열기</span> 
									<span class="hide">닫기</span>
								</div>
							</a>
						</div>
						<div class="cont">
							<div class="img_wrap"></div>
							<p class="txt">내가 자주 찾는 서비스, 이제 전체메뉴에서 바로바로!
									더 편리하게 이용하세요.</p>
						</div>
					</div>
				</div>
			</div>

		</div>
	
		<div class="popup_footer fixed">
			<div class="btn_full_box btns_wrap">
				<button type="button" @click.prevent="fn_close" class="btns lg primary">닫기</button>
			</div>
		</div>
		
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
		
	</div>
	<!--// full popup E -->
</template>
<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'


    export default {
        name : "COTP0050",
        data: () => {
            return {
                chkNoSeeAssets: false
            }
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        computed : {
        },
        mounted() {
            this.initComponent()
        },
        methods: {
            initComponent() {
                
            },
			// 페이지 이동
            fn_close() {
                this.close();
            },
        }
    }
</script>