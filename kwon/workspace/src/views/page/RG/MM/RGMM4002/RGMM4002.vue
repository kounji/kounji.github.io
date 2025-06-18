<!--
/*************************************************************************
* @ 서비스경로 : NH 지역정보 >	군장병 TMO 상세 팝업
* @ 페이지설명 : NH지역정보 > 군장병 TMO 상세 팝업
* @ 파일명     : src/views/page/RG/MM/RGMM4002/RGMM4002.vue
* @ 작성자     : CS541601
* @ 작성일     : 2025-02-12
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-12             CS541601                 신규
*************************************************************************/
-->
<template>
<div>
	<!-- wrap S -->
	<div id="wrap" class="sticky-scroll">
		<div>
			<a href="javascript:void(0);" class="btn_pop_view" data-popup="full_popup_01">팝업보기</a>
		</div>    
	</div>
	<!--// wrap E -->

	<!-- full popup S -->
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>상세정보</h1>
		</div>

		<div class="popup_content">

			<section class="local_detail">
				<div class="title">
					<strong>{{ detailInfo.plcnm }}</strong>
					<p>군장병 TMO를 안내합니다.</p>
				</div>

                <div class="board_box">
					<dl class="info_list">
						<div>
							<dt class="ico_star_bg01">전화번호</dt>
							<dd>{{ detailInfo.ctcplTelno }}</dd>
						</div>
						<div v-if="!!detailInfo.wkdSttm || !!detailInfo.wekdSttm">
							<dt class="ico_flag">운영시간</dt>
							<dd>{{ !!detailInfo.wkdSttm && !!detailInfo.wkdEdtm ? ('평일 ' + timeForm(detailInfo.wkdSttm) + ' ~ ' + timeForm(detailInfo.wkdEdtm)) : '' }}<br v-if="!!detailInfo.wkdSttm && !!detailInfo.wkdEdtm">{{ !!detailInfo.wekdSttm && !!detailInfo.wekdEdtm ? ('주말 ' + timeForm(detailInfo.wekdSttm) + ' ~ ' + timeForm(detailInfo.wekdEdtm)) : '' }}</dd>
						</div>
						<div v-if="!!detailInfo.plcCntn">
							<dt class="ico_star">위치설명</dt>
							<dd>{{ detailInfo.plcCntn }}</dd>
						</div>
                        <div v-if="!!detailInfo.rmk">
							<dt class="ico_star04">비고</dt>
							<dd>{{ detailInfo.rmk }}</dd>
						</div>
					</dl>
				</div>
			</section>

		</div>

		<a href="javascript:void(0);" role="button" class="btn_close"  @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</div>


</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from "@/views/layout/FootersV2.vue"
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService  from '@/service/modalService'


export default {
        name : "RGMM4002",
        data: () => {
			return {
				detailInfo: {},
			}
		},
		created() {
			console.log('파라메터')
			console.log(this.params)
			this.detailInfo = this.params
		},

        mounted() {
        	this.initComponent()

        	//PFM로그 처리 화면접속이력 등록 POST
        	apiService.pfmLogSend(this.$options.name)
    	},

		mixins: [
        	commonMixin
			,popupMixin
    	],

		methods: {

			initComponent() {
			},

			timeForm(t) {
				return t.substring(0, 2) + ':' + t.substring(2, 4)
			},

		},

       
        components : {
            Page,
            FootersV2,
        }
    }



</script>