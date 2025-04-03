<!--
/*************************************************************************
* @ 서비스경로 : 제휴서비스 > 귀농귀촌
* @ 페이지설명 : 귀농귀촌 > 귀농귀촌 정보
* @ 파일명     : src/views/page/AN/FM/ANFM2006/ANFM2006.vue
* @ 작성자     : CS528205
* @ 작성일     : 2022-08-23
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-23              CS528205              최초작성 
*************************************************************************/
-->
<template>
    <div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>귀농시작 교육지원</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>		
		<div class="popup_content com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->
			
			<!-- 안정적인 귀농 정착을 위한 전문인 교육이 필요한가요? -->
			<div class="com_inner com_top_type04">
				<strong class="com_pop_tit02">
					안정적인 귀농 정착을 위한<br/>
					전문인 교육이 필요한가요?
				</strong>
			</div>
			<!--// 안정적인 귀농 정착을 위한 전문인 교육이 필요한가요? -->

			<div class="com_inner">
				<!-- 귀농귀촌아카데미 -->
				<div class="custom_box_border_type01 custom_box_img04">
					<div class="content_wrap">
						<div class="com_box_list com_box_list01 com_box_list02">
							<div class="new_tit_area">
								<div class="tit"><span>귀농귀촌아카데미</span></div>
							</div>
							<ul class="list_type_01">
								<li class="list list01">
									<div class="custom_box_module01">
										<p>
											귀농귀촌 희망 도시민 및 은퇴 예정자를 위한 교육프로그램 및 정보 제공
										</p>
										<span class="custom_box_sub_text01">농정원 귀농귀촌종합센터</span>
										<div class="box_border_link02">
											<a href="javascript:void(0)" @click="openWebBrowser('https://www.greendaero.go.kr/svc/rfph/edc/offline/front/academiIntro.do')"><strong class="link">신청하기</strong></a>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<!--// 귀농귀촌아카데미 -->
				<!-- 귀농귀촌 심화교육 -->
				<div class="custom_box_border_type01 custom_box_img05">
					<div class="content_wrap">
						<div class="com_box_list com_box_list01 com_box_list02">
							<div class="new_tit_area">
								<div class="tit"><span>귀농귀촌 심화교육</span></div>
							</div>
							<ul class="list_type_01">
								<li class="list list01">
									<div class="custom_box_module01">
										<p>
											귀농귀촌 관심 &middot; 준비자를 대상으로 교육운영을 통해 농업 창업 및 안정적인 농촌 정착 지원
										</p>
										<span class="custom_box_sub_text01">농정원 귀농귀촌종합센터</span>
										<div class="box_border_link02">
											<a href="javascript:void(0)" @click="openWebBrowser('https://www.greendaero.go.kr/svc/rfph/edc/offline/front/intensificationIntro1.do')"><strong class="link">신청하기</strong></a>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<!--// 귀농귀촌 심화교육 -->
				<!-- 농업일자리 탐색교육 -->
				<div class="custom_box_border_type01 custom_box_img06">
					<div class="content_wrap">
						<div class="com_box_list com_box_list01 com_box_list02">
							<div class="new_tit_area">
								<div class="tit"><span>농업일자리 탐색교육</span></div>
							</div>
							<ul class="list_type_01">
								<li class="list list01">
									<div class="custom_box_module01">
										<p>
											코로나19로 인한 귀농귀촌 수요 증가에 대응, 접근성을 고려한 전국 단위 조직 활용 교육 제공
										</p>
										<span class="custom_box_sub_text01">농협중앙회</span>
										<div class="box_border_link02">
											<a href="javascript:void(0)" @click="openWebBrowser('https://www.greendaero.go.kr/svc/rfph/edc/offline/front/searchingIntro.do')"><strong class="link">신청하기</strong></a>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<!--// 농업일자리 탐색교육 -->
				<!-- 농업일자리 체험교육 -->
				<div class="custom_box_border_type01 custom_box_img07">
					<div class="content_wrap">
						<div class="com_box_list com_box_list01 com_box_list02">
							<div class="new_tit_area">
								<div class="tit"><span>농업일자리 체험교육</span></div>
							</div>
							<ul class="list_type_01">
								<li class="list list01">
									<div class="custom_box_module01">
										<p>
											코로나19로 인한 실직&middot;폐업 등으로 농업분야 취 &middot; 창업 희망자 대상으로 현장실습 및 일자리 연계
										</p>
										<span class="custom_box_sub_text01">㈜한국정책미디어</span>
										<div class="box_border_link02">
											<a href="javascript:void(0)" @click="openWebBrowser('https://www.greendaero.go.kr/svc/rfph/edc/offline/front/experienceIntro.do')"><strong class="link">신청하기</strong></a>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<!--// 농업일자리 체험교육 -->
				<!-- 지자체 귀농귀촌교육 -->
				<div class="custom_box_border_type01 custom_box_img08">
					<div class="content_wrap">
						<div class="com_box_list com_box_list01 com_box_list02">
							<div class="new_tit_area">
								<div class="tit"><span>지자체 귀농귀촌교육</span></div>
							</div>
							<ul class="list_type_01">
								<li class="list list01">
									<div class="custom_box_module01">
										<p>
											지자체에서 진행하는 귀농귀촌 교육 현황을 시군구별, 교육주제,모집지원 등에 정보 제공
										</p>
										<span class="custom_box_sub_text01">지방자치단체</span>
										<div class="box_border_link02">
											<a href="javascript:void(0)" @click="openWebBrowser('https://www.greendaero.go.kr/svc/rfph/edc/offline/front/localIntro.do')"><strong class="link">신청하기</strong></a>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<!--// 지자체 귀농귀촌교육 -->
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
</template>

<script>
    import apiService from '@/service/apiService'
	import appService from '@/service/appService'
	import popupMixin from '@/common/mixins/popupMixin'

    import commonMixin from '@/common/mixins/commonMixin'

    // TODO : 링크 확정시 수정
    export default {
        name : "ANFM2006",
        data: () => {
            return {
            }
        },
        mounted() {
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        mixins: [
			commonMixin,
			popupMixin
        ],
        methods: {
			/**
			 * 외부 브라우저 열기
			 */
            openWebBrowser(url) {
                if (this.getUserInfo('chnl') === '385') {
                    appService.executeBrowser(url);
                } else {
                    appService.cokBankOpenPopupWebBrowser(url);
                }
            },
        },
        components : {
        }
    }

</script>