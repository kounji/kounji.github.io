<!--
/*************************************************************************
* @ 서비스경로 : NH지역정보 > 자전거길 국토종주 > 국토종주 자전거길 > 자전거길100선 상세
* @ 페이지설명 : NH지역정보 > 자전거길 국토종주 > 국토종주 자전거길 > 자전거길100선 상세
* @ 파일명     : src/views/page/RG/BM/RGBM4101/RGBM4101.vue
* @ 작성자     : CS541601
* @ 작성일     : 2025-02-12
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-12              CS541601              최초작성
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
					<strong>{{ roadInfo.bkphNm }}</strong> <!-- 자전거길 100선명 (관리자) -->
					<p><em>국토종주 자전거길 100선</em>을 소개합니다.</p>
				</div>
				<p class="date">마지막 업데이트 기준 <span>{{ roadInfo.lschgDtm }}</span></p> <!-- 등록일 (관리자) -->
				<span v-if="!!roadInfo.brfCntn"><p class="subtit" v-html="roadInfo.brfCntn"></p></span> <!-- 부제목 (관리자) -->
				<span v-else><p class="desc"></p></span>
				<span v-if="!!roadInfo.dtlCntn"><p class="desc" v-html="roadInfo.dtlCntn"></p></span> <!-- 개요 (관리자) -->
				<span v-else><p class="desc"></p></span>
				
				<!-- 이미지 영역 (관리자) -->
				<div class="detail_img small">
					<img :src="`/assets/images/local_bike/${roadInfo.bkphNo1Imgnm}.png`" alt="" v-if="!!roadInfo.bkphNo1Imgnm">
					<img :src="`/assets/images/local_bike/${roadInfo.bkphNo2Imgnm}.png`" alt="" v-if="!!roadInfo.bkphNo2Imgnm">
				</div>
				<!-- // -->

				<div class="board_box">
					<div class="head bg02">
						<strong>여행코스</strong>
						<p>경로와 주행거리를 확인해주세요</p>
					</div>
					<!-- 여행경로 영역 (관리자) -->
					<!-- 코스 1 -->
					<dl class="info_list" v-if="roadInfoBkphList.length == 1">
						<div>
							<dt class="ico_flag">경로</dt>
							<dd v-if="!!roadInfo.bkphPathCntn">{{ roadInfo.bkphPathCntn }}</dd>
							<dd v-else></dd>
						</div>
						<div>
							<dt class="ico_star">소요시간</dt>
							<dd v-if="!!roadInfo.nedHrCntn">{{ roadInfo.nedHrCntn }}</dd>
							<dd v-else></dd>
						</div>
						<div>
							<dt class="ico_course">주행거리</dt>
							<dd v-if="!!roadInfo.odmdsCntn">{{ roadInfo.odmdsCntn }}</dd>
							<dd v-else></dd>
						</div>
					</dl>
					<!-- 코스 2 -->
					<dl v-else class="info_list" v-for="(item, i) in roadInfoBkphList" :key="item">
						<div>
							<dt class="ico_flag">경로</dt>
							<dd><em>{{ roadInfoBkphList[i].split(":")[0] }}</em> : {{ roadInfoBkphList[i].split(":")[1] }}</dd>
						</div>
						<div>
							<dt class="ico_star">소요시간</dt>
							<dd>{{ roadInfoNedList[i] }}</dd>
						</div>
						<div>
							<dt class="ico_course">주행거리</dt>
							<dd>{{ roadInfoOdmdsList[i] }}</dd>
						</div>
					</dl>
					<!-- // -->
				</div>

				<div class="board_box">
					<div class="head bg01">
						<strong>먹거리와 즐길거리</strong>
						<p>즐거운 여행 되시기를 바랍니다</p>
					</div>
					<dl class="info_list">
						<div>
							<dt class="ico_star_bg02">문의전화</dt>
							<dd v-if="!!roadInfo.ctcplCntn"> {{ roadInfo.ctcplCntn }} </dd>
							<dd v-else></dd>
						</div>
						<div>
							<dt class="ico_star02">감상포인트</dt>
							<dd v-if="!!roadInfo.bkphInfNo1Cntn"> {{ roadInfo.bkphInfNo1Cntn }} </dd>
							<dd v-else></dd>
						</div>
						<div>
							<dt class="ico_map">여행TIP</dt>
							<dd v-if="!!roadInfo.bkphInfNo2Cntn"> {{ roadInfo.bkphInfNo2Cntn }} </dd>
							<dd v-else></dd>
						</div>
						<div>
							<dt class="ico_map02">먹거리</dt>
							<dd v-if="!!roadInfo.bkphInfNo3Cntn"> {{ roadInfo.bkphInfNo3Cntn }} </dd>
							<dd v-else></dd>
						</div>
						<div>
							<dt class="ico_heart">대중교통</dt>
							<dd v-if="!!roadInfo.bkphInfNo4Cntn"> {{ roadInfo.bkphInfNo4Cntn }} </dd>
							<dd v-else></dd>
						</div>
						<div>
							<dt class="ico_store">자전거편의</dt>
							<dd v-if="!!roadInfo.bkphInfNo5Cntn"> {{ roadInfo.bkphInfNo5Cntn }} </dd>
							<dd v-else></dd>
						</div>
					</dl>
				</div>

			</section>

		</div>

		<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->

</div>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import RGCL4003 from '@/views/page/RG/CL/RGCL4003/RGCL4003' // 지역축제 상세 팝업  
import modalService  from '@/service/modalService'


export default {
    name : "RGBM4005",
	data: () => {
        return {
            roadInfo: {},
		}
	},
    mounted() {
        //this.initComponent()
		console.log(this.params)
		this.roadInfo = this.params
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        commonMixin
		,popupMixin
    ],
    methods: {
		  /* 문화시설 상세 팝업 */
        fn_goPopDetailPage() {

			
			let compName = RGCL4003
			let param    = {};

			const config = {
				component: compName,
				params : param
			}
			modalService.openPopup(config).then(() => {})
		},

    },
	computed: {
		
		roadInfoBkphList() {
			if (!!this.roadInfo.bkphPathCntn) {
				return this.roadInfo.bkphPathCntn.split("|")
			} 

			return []
		},

		roadInfoNedList() {
			if (!!this.roadInfo.nedHrCntn) {
				return this.roadInfo.nedHrCntn.split("|")
			}

			return []
		},

		roadInfoOdmdsList() {
			if (!!this.roadInfo.odmdsCntn) {
				return this.roadInfo.odmdsCntn.split("|")
			}

			return []
		},

	},
    components: {
		Page,
        FootersV2,
	}
}
</script>
