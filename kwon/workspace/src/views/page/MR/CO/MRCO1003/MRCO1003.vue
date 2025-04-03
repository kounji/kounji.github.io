<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > 자산관리 서비스 안내
* @ 페이지설명 : 더보기 > 전체메뉴 > 자산관리 서비스 안내
* @ 파일명     : src\views\page\MR\CO\MRCO1003\MRCO1003.vue
* @ 작성자     : CS528061
* @ 작성일     : 2022-10-14
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-10-14              CS528061              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1 class=""></h1>
		</div>
		
		<div class="popup_content com_no_bottom custom_box_service_info"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<div class="custom_box">
					<!-- intro : on 클래스 삽입시 글자 보임 -->
					<div class="section section_list01">
						<div class="ani_header">
							<strong class="com_cont_tit01">
								<span class="ani_txt txt01">모든 자산을 마이데이터에</span>
								<span class="ani_txt txt02">모아 한 눈에!</span>
							</strong>
							<p>
								내 자산을 직접 관리하고<br />
								효율적으로 활용해 보세요
							</p>
						</div>
						<div class="ani_content">
							<div class="inner_box">
								<div class="ani_item">
									<span class="ani_img ani_img01 kf_bounce1">
										<span class="ani_com_icon ani_img_01 kf_move_down1"></span>
									</span>
								</div>
								<div class="ani_item">
									<span class="ani_img ani_img02 kf_bounce2">
										<span class="ani_com_icon ani_img_01 kf_move_down2"></span>
									</span>
								</div>
								<div class="ani_item">
									<span class="ani_img ani_img03 kf_bounce3">
										<span class="ani_com_icon ani_img_01 kf_move_down3"></span>
									</span>
								</div>
								<div class="ani_item">
									<span class="ani_img ani_img04 kf_bounce4">
										<span class="ani_com_icon ani_img_01 kf_move_down4"></span>
									</span>
								</div>
							</div>
						</div>
						<div class="ani_footer">
							<button type="button" class="btn_down">
								<span class="blind">아래로</span>
							</button>
						</div>
					</div>
					
					<!-- 자산연결 : on 클래스 삽입시 글자 보임 -->
					<div class="section section_list02">
						<div class="ani_header">
							<strong class="com_cont_tit01">
								<span class="ani_txt txt01">흩어진 내 자산을 한 번에</span>
								<span class="ani_txt txt02">쉽고 안전하게 연결할 수 있어요</span>
							</strong>
						</div>
						<div class="ani_content">
							<div class="inner_box">
								<div class="ani_box">
									<div class="slider_root">
										<div class="scroll_box">
											<div class="img_list list1">
												<img src="@/assets/images/animation/ani_01_01_398x1281.png" alt="" />
												<span class="bg_cycle_wrap list1">
													<em class="bg_cycle"></em>
												</span>
											</div>
											<div class="img_list list2">
												<img src="@/assets/images/animation/ani_01_02_398x1281.png" alt="" />
												<span class="bg_cycle_wrap list1">
													<em class="bg_cycle"></em>
												</span>
											</div>
											<div class="img_list list3">
												<img src="@/assets/images/animation/ani_01_03_398x1281.png" alt="" />
												<span class="bg_cycle_wrap list1">
													<em class="bg_cycle"></em>
												</span>
											</div>
											<div class="img_list list4">
												<img src="@/assets/images/animation/ani_01_03_398x1281.png" alt="" />
												<span class="bg_cycle_wrap list1">
													<em class="bg_cycle"></em>
												</span>
											</div>
										</div>
									</div>
									<span class="hand"></span>
								</div>
							</div>
						</div>
						<div class="ani_footer">&nbsp;</div>
					</div>
					
					<!-- 자산 : on 클래스 삽입시 글자 보임 -->
					<div class="section section_list03">
						<div class="ani_header">
							<strong class="com_cont_tit01">
								<span class="ani_txt txt01 kf_opacity1">내 자산과 부채를 진단하고</span>
								<span class="ani_txt txt02 kf_opacity1">자산 흐름을 예측해 드려요</span>
							</strong>
						</div>
						<div class="ani_content">
							<div class="inner_box">
								<div class="ani_box phone_case1">
									<div class="scroll_box">
										<div class="img_list list1">
											<img src="@/assets/images/animation/ani_02_01_398x1888.png" alt="" />
										</div>
									</div>
								</div>
								<div class="ani_box phone_case2">
									<div class="scroll_box">
										<div class="img_list list1">
											<img src="@/assets/images/animation/ani_02_02_398x1852.png" alt="" />
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="ani_footer">&nbsp;</div>
					</div>


					<!-- 지출 : on 클래스 삽입시 글자 보임 -->
					<div class="section section_list04">
						<div class="parent_inner_box parent_list01">
							<div class="ani_header">
								<strong class="com_cont_tit01">
									<span class="ani_txt txt01">다가오는 정기지출을 관리하고</span>
									<span class="ani_txt txt02">미리 준비해 보세요</span>
								</strong>
							</div>
							<div class="ani_content">
								<div class="inner_box">
									<div class="ani_box box1">
										<div class="scroll_box">
											<div class="img_list list1">
												<img src="@/assets/images/animation/ani_03_398x2222.png" alt="" />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="ani_footer"></div>
						</div>
						<div class="parent_inner_box parent_list02">
							<div class="ani_header">
								<strong class="com_cont_tit01">
									<span class="ani_txt txt01">또래와 부자들의 소비 생활은</span>
									<span class="ani_txt txt02">어떤지 확인할 수 있어요</span>
								</strong>
							</div>
							<div class="ani_content">
								<div class="inner_box">
									<div class="ani_box box1">
										<div class="scroll_box">
											<div class="img_list list1">
												<img src="@/assets/images/animation/ani_02_398x1864.png" alt="" />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="ani_footer">&nbsp;</div>
						</div>
					</div>
					
					<!-- 속도 + 화면 안에서 슬라이딩  -->
					<!-- 목표 : on 클래스 삽입시 글자 보임 -->
					<div class="section section_list05">
						<div class="ani_header">
							<strong class="com_cont_tit01">
								<span class="ani_txt txt01">이루고 싶은 일이 있다면,</span>
								<span class="ani_txt txt02">목표를 세우고 시작해 보세요</span>
							</strong>
						</div>
						<div class="ani_content">
							<div class="inner_box list01">
								<div class="ani_box box1">
									<div class="scroll_box">
										<div class="img_list list1">
											<img src="@/assets/images/animation/ani_04_02_398x849.png" alt="" />
										</div>
										
										<span class="bg_cycle_wrap list1">
											<em class="bg_cycle"></em>
										</span> 
										
										<div class="show_box pfrm03_01">
											<div class="show_box_wrap">
												<div>
													<img src="@/assets/images/animation/ani_04_cut_03_686x390.png" alt="">
												</div>
											</div>
										</div>
										
										<div class="show_box pfrm03">
											<div class="show_box_wrap">
												<div>
													<img src="@/assets/images/animation/ani_04_cut_01_686x390.png" alt="">
												</div>
												<div>
													<img src="@/assets/images/animation/ani_04_cut_02_686x390.png" alt="">
												</div>
												<div>
													<img src="@/assets/images/animation/ani_04_cut_03_686x390.png" alt="">
												</div>
												<div>
													<img src="@/assets/images/animation/ani_04_cut_01_686x390.png" alt="">
												</div>
												<div>
													<img src="@/assets/images/animation/ani_04_cut_02_686x390.png" alt="">
												</div>
												<div>
													<img src="@/assets/images/animation/ani_04_cut_03_686x390.png" alt="">
												</div>
											</div>
										</div>
										
									</div>
								</div>

								<div class="ani_box box2">
									<div class="scroll_box">
										<div class="img_list list1">
											<img src="@/assets/images/animation/ani_04_03_398x1963.png" alt="" />
										</div>
									</div>
								</div>

							</div>
						</div>
						<div class="ani_footer">&nbsp;</div>
					</div>
					
					<!-- 제휴 : on 클래스 삽입시 글자 보임 -->
					<!-- 폰속의 이미지만 슬라이딩 -->
					<div class="section section_list06">
						<div class="ani_header">
							<strong class="com_cont_tit01">
								<span class="ani_txt txt01">금융과 연계한 생활밀착형</span>
								<span class="ani_txt txt02">제휴서비스도 이용할 수 있어요</span>
							</strong>
						</div>
						<div class="ani_content">
							<div class="inner_box">
								<div class="ani_box">
									<div class="slider_root">
										<div class="slider_wrap">
											<div class="cont">
												<div class="cmm-tab-panel">
													<a href="javascript:void(0)" role="button" class="slide">
														<img src="@/assets/images/animation/ani_05_01_390x787.png" alt="" />
													</a>
												</div>
												<div class="cmm-tab-panel">
													<a href="javascript:void(0)" role="button" class="slide">
														<img src="@/assets/images/animation/ani_05_02_390x787.png" alt="" />
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="ani_footer">&nbsp;</div>
					</div> 

					<!-- Outro : on 클래스 삽입시 글자 보임 -->
					<div class="section section_list07">
						<div class="ani_header">
							<strong class="com_cont_tit01">
								<span class="ani_txt txt01">이 모든 서비스가</span>
								<span class="ani_txt txt02">NH콕마이데이터 한 곳에!</span>
							</strong>
							<p>
								흩어진 내 자산, NH콕마이데이터에<br/>
								모아 다양한 혜택을 누리세요
							</p>
						</div>
						<div class="ani_content">
							<div class="inner_box">
								<div class="ani_item01">
									<span class="ani_star ani_img01">
										<span class="ani_com_star ani_star_01 kf_opacity"></span>
									</span>
									<span class="ani_star ani_img02">
										<span class="ani_com_star ani_star_01 kf_opacity"></span>
									</span>
									<span class="ani_star ani_img03">
										<span class="ani_com_star ani_star_01 kf_opacity"></span>
									</span>
									<span class="ani_star ani_img04">
										<span class="ani_com_star ani_star_01 kf_opacity"></span>
									</span>
								</div>
								<div class="ani_item02">
									<span class="ani_home ani_img01">
										<span class="ani_all_money ani_all_money1"></span>
										<span class="ani_all_money ani_all_money2"></span>
										<span class="ani_all_money ani_all_money3"></span>
										<span class="ani_all_money ani_all_money4"></span>
										<span class="ani_com_car kf_bouns5"></span>
									</span>
								</div>
								
							</div>
						</div>
						<div class="ani_footer">
							<div class="btn_full_box">
								<a href="javascript:void(0);" class="btn btn_mint" role="button" @click="fn_close()">시작하기</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import apiService from '@/service/apiService'
import routerService from '@/service/routerService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import {fncSlick, fncInite} from '@/utils/slick'

export default {
    name : "MRCO1003",
    data: () => {
        return {

        }
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    methods: {
        initComponent() {
			this.getData()
        },
        getData() {
			fncInite()
            fncSlick()

			this.scrollFn()
			// this.scrollUp()

			setInterval(() => {
				$(".btn-next").trigger("click")
			}, 1000);
		},

		scrollFn() {
			var scroll_target = $('.full_popup.renewal .popup_content');
			var section_list = $('.custom_box .section');
			scroll_target.on('scroll', function() {
				section_list.each(function() {
					var bottom_of_object = $(this).offset().top + $(this).outerHeight()/2;
					$(this).outerHeight()/2; //높이조절
					var bottom_of_window = section_list.scrollTop() + section_list.height();

					if( bottom_of_window > bottom_of_object ){
						$(this).addClass('on');
					}
					if( $('.section_list02').hasClass('on') ) {
						$('.btn_down').hide();
					}
				});
				var element = section_list.first();
				element.addClass('on');
			});
			$('.section_list01').addClass('on');
		},

		scrollUp() {
			var lastScrollTop = 0;
			var scroll_target = $('.full_popup .popup_content');

			scroll_target.on('scroll', function(){
				var scrollTop = $(this).scrollTop();
				if ( scrollTop > lastScrollTop ) {
					$('.section_list07').addClass('bgOn');
				} else {
					$('.section_list07').removeClass('bgOn');
				}
				lastScrollTop = scrollTop; // 스크롤 올리는 부분 감지 js
			})
		},
		
		fn_close() {
			this.close()

			routerService.moveMain()
		},
    },
    mounted() {
        this.initComponent(this.params)
        
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
}
</script>