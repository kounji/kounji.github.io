<!--
/*************************************************************************
* @ 서비스경로 : 금융생활 > 금융통통
* @ 페이지설명 : 금융생활 > 금융통통 > 은퇴 준비 진단
* @ 파일명     : src\views\page\PD\RT\PDRT2009\PDRT2009.vue
* @ 작성자     : CS533541
* @ 작성일     : 2023-07-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-17              CS533541              최초작성(PDPD1101.vue -> PDRT2009.vue)
*************************************************************************/
-->
<template>
    <!-- 전체 팝업 시작 -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1>은퇴 준비 진단</h1>
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<div class="com_box_type01 noBorder">
					<div class="compare_chart_wrap imgType01">
						<strong class="com_cont_tit02">편안한 노후를 위해<br>얼마나 준비하고 계신가요?</strong>
						<p class="desc">나의 은퇴 준비 상태를 진단하고<br>지금부터 노후 준비를 시작해 보세요</p>
						<div class="chart chart_type02">
							<span class="blind">기대수명과 평균퇴직연령 사이 은퇴 생활기간을 표현하는 그래프</span>
							<div class="bg">
								<div class="txt">은퇴 생활기간 35년</div>
							</div>
							<ul class="label">
								<li class="left">
									<span>기대수명</span>
									<p>84세</p>
								</li>
								<li class="right">
									<span>평균퇴직연령</span>
									<p>49세</p>
								</li>
							</ul>
						</div>
						<p class="com_txt_sub01 ">&lt;2022년 통계청 자료&gt;</p>
					</div>
				</div>
			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" role="button" class="btn btn_mint" @click.prevent="fn_openPDRT2014()">진단하기</a>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import commonService from '@/service/commonService'
import modalService from '@/service/modalService'

import PDRT2014 from '@/views/page/PD/RT/PDRT2014/PDRT2014'

export default {
    name : "PDRT2009",
    data: () => {
        return {
        }
    },
    computed : {
    },
    created() {
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent() {
            this.getData();
        },
        getData(){
        },
        // 진단하기 버튼 클릭
        fn_openPDRT2014() {
            const config = {
                component : PDRT2014
            }

            modalService.openPopup(config).then((response) => {
                if (response == "PDPD1101_tab1") {
                    // this.$refs.PDPD1101Tab1.click();
                    this.fn_movePage('PDPD4001') // 상품추천 화면으로 이동
                }
            });
        },
        // 화면 이동
        fn_movePage(pageId) {
            let params = {}

            const config = {
                name : pageId,
                params : params
            }
            
			commonService.movePage(config);
        }
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    components: {
    },
}
</script>