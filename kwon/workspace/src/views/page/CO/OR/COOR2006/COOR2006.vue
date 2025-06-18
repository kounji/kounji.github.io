<!--
/*************************************************************************
* @ 서비스경로 : 더보기>타기관 마이데이터 관리>마이데이터 가입·조회 및 관리>서비스 이용현황>전송요구내역 통합조회 결과>전송요구내역 상세 팝업
* @ 페이지설명 : 전송요구내역 상세 팝업
* @ 파일명     : src/views/page/CO/OR/COOR2006/COOR2006.vue
* @ 작성자     : CS530689
* @ 작성일     : 2024-11-25
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-11-25              CS530689                 최초작성
*************************************************************************/
-->
<template>
    <!-- 팝업 시작 -->
	<div class="popup_box renewal mydata2023 other_mydata"><!-- 2024-11 : 타기관마이데이터 other_mydata 추가 -->
		<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
			<div class="popup_header">
				<strong class="com_pop_tit01">전송요구내역</strong>
			</div>
			<div class="popup_content com_btn_bottom">
				<div class="request_detail">
					<div class="box">
						<div class="tit_area">
							<!-- case1. 로고 있을때
							<span class="logo"><i class="ZVAAAZ0000"><span class="blind">농협</span></i></span>
							-->
							<!-- case2. 로고 없을때 -->
							<span class="logo"><i class="no_logo"><span class="blind">로고 없음</span></i></span>
							<!-- //case2. 로고 없을때 -->
							<strong class="tit">롯데멤버스주식회사</strong>
							<span class="cont">
								<span>전자금융</span>
							</span>
						</div>
						<div class="cont_area">
							<ul class="data_list">
								<li>
									<div class="key">서비스명</div>
									<div class="val">우리마이데이터서비스</div>
								</li>
								<li>
									<div class="key">전송구분</div>
									<div class="val">마이데이터사업자</div>
								</li>
								<li>
									<div class="key">정보수신자</div>
									<div class="val">(주)우리은행</div>
								</li>
								<li>
									<div class="key">전송요구일</div>
									<div class="val"><span class="num">2024.09.28</span></div>
								</li>
								<li>
									<div class="key">전송요구 종료일</div>
									<div class="val"><span class="num">2025.09.27</span></div>
								</li>
								<li>
									<div class="key">전송요구내용</div>
									<div class="val">
										<p>전자지금수단 목록(efin.list)</p>
										<p>선불전자지금수단 정보(efin.prepaid)</p>
										<p>결제 정보(efin.paid)</p>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<ul class="bl_dot_list one_register_list mt10">
						<li>마이데이터 서비스 이용과 관련된 문의사항은 마이데이터 종합포털에 마련된 <a href="https://www.mydatacenter.or.kr:3441/myd/bbsctt/faq1/faq/bbsctt.do" targer="_blank" title="새창 열림" class="txt_link">FAQ</a>를 확인해 주시기 바랍니다.</li>
					</ul>
				</div>
			</div>
			<div class="popup_footer fixed">
				<div class="btn_full_box2">
					<a href="javascript:void(0);" class="btn btn_mint" role="button">확인</a>
					<!-- btn_off 제거시 활성화 -->
				</div>
			</div>
			<a href="#nolink" role="button" class="btn_close"><span class="">닫기</span></a>
		</div>
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>
    // import Page from '@/views/layout/Page.vue'

    import apiService from '@/service/apiService'
    import commonService from '@/service/commonService'
    import modalService from '@/service/modalService'
    import routerService from '@/service/routerService'
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'

    import {mapGetters} from 'vuex'
    
    // import _ from 'lodash'

    export default {
        name : "COOR2006",
        data: () => {
            return {

            }
        },
        computed: {
        },
        created() {
        },
        mounted() {

            this.initComponent()
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        methods: {
            initComponent() {

            },
            movePrev() {
                routerService.movePrev()
            },
        },
        components : {
            // Page
        }
    }
</script>