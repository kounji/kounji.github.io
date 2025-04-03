<!--
/*************************************************************************
* @ 서비스경로 : NH지역정보 > 전국 둘레길 > 현황 상세
* @ 페이지설명 : NH지역정보 > 전국 둘레길 > 현황 상세
* @ 파일명     : src/views/page/RG/DM/RGDM4002/RGDM4002.vue
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
			<a href="#nolink" class="btn_pop_view" data-popup="full_popup_01">팝업보기</a>
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
					<strong>{{dulegilList.trlcosNm}}</strong>
					<p>해당 코스는 <span v-if="dulegilList.wlkTwhlDsc == 'DNWW'">걷기</span> <span v-if="dulegilList.wlkTwhlDsc == 'DNBW'">자전거</span> 코스 입니다.</p>
				</div>
				<p class="date">마지막 업데이트 기준 <span>{{formDate}}</span></p>

				<div class="board_box">
					<div class="head bg02">
						<strong>코스안내</strong>
						<p>소요시간과 난이도를 확인해주세요</p>
					</div>
					<dl class="info_list">
						<div>
							<dt class="ico_flag">행정구역</dt>
							<dd>{{dulegilList.ccwnm}}</dd>
						</div>
						<div>
							<dt class="ico_course">코스길이</dt>
							<dd>{{dulegilList.trlcosLen}}km</dd>
						</div>
						<div>
							<dt class="ico_time">총 소요시간</dt>
							<dd>{{ (dulegilList.trlcosTotNedHr)/60 }}시간 소요</dd>
						</div>
					</dl>
				</div>
				
				<div class="board_box">
					<div class="head bg03">
						<strong>코스설명</strong>
					</div>
					<ul class="text_list ico_heart_cir">
						<li v-for="(conversionList1, index) in computedConversionList1" :key="index">{{conversionList1}}</li>
					</ul>
				</div>
			
				<div class="board_box" v-if="computedConversionList5 != ''">
					<div class="head bg04">
						<strong>코스개요</strong>
					</div>
					<ul class="text_list ico_check">
						<li v-for="(conversionList5, index) in computedConversionList5" :key="index">{{conversionList5}}</li>
					</ul>
				</div>
			
				<div class="board_box">
					<div class="head bg05">
						<strong>관광정보</strong>
					</div>
					<ul class="text_list ico_star_cir">
						<li v-for="(conversionList2, index) in computedConversionList2" :key="index">{{conversionList2}}</li>
						
					</ul>
				</div>

				<div class="board_box">
					<div class="head bg05">
						<strong>여행자정보</strong>
					</div>
					<ul class="text_list ico_star_cir02">
						<li v-for="(conversionList3, index) in computedConversionList3" :key="index">{{conversionList3}}</li>
						
					</ul>
					<dl class="info_list" v-if="computedStampYn == true">
						<div class="row">
							<dt class="ico_star03">스탬프함 위치</dt>
							<dd>{{computedConversionList4}}</dd>
						</div>
					</dl>
				</div>

				<a href="javascript:void(0);" @click.prevent="openWebBrowser('https://www.durunubi.kr/course-detail-view.do?crs_idx=T_CRS_MNG0000004220')" target="_blank" class="banner" title="새창열기">
					<img src="@/assets_v40/images/banner/img_durunubi_banner.png" class="img" alt="두루누비에 대해 더 상세하게 알아볼까요?">
				</a>
			</section>

		</div>

		<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="closeAll()"><span class="blind">팝업닫기</span></a>
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
import appService from '@/service/appService'

export default {
	name : "RGDM4002",
        data: () => {
			return {
					dulegilList : "", //둘레길 상세정보
					trlcosTotNedHr : "", //둘레길코스 총 소요시간
					idx : "", //둘레길코스 총 소요시간
					compu : "",
					conversionList1 : "", //코스 설명 데이터변환
					conversionList2 : "", //관광 정보 데이터변환
					conversionList3 : "", //여행자 정보 데이터변환
					conversionList4 : "", //스탬프함 위치 데이터변환
					conversionList5 : "", //코스개요 데이터변환
					lschgDtmYn : "N", 	  //개요내용 존재여부

				}
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
		computed :{

			formDate(){
				return this.params.dulegilList.modDtm.substring(0,4) + "." + this.params.dulegilList.modDtm.substring(4,6) + "." + this.params.dulegilList.modDtm.substring(6,8)
			},
			computedConversionList1(){
				return this.conversionList1.split(/<br\s*\/?>/).map(item => item.replace('-', '').trim()).filter(item => item.length > 0)
			},
			computedConversionList2(){
				return this.conversionList2.split(/<br\s*\/?>/).map(item => item.replace('-', '').trim()).filter(item => item.length > 0)
			},
			computedConversionList3(){
				let modifiedString = this.conversionList3

				if(modifiedString.includes("스탬프")){
					const lastBrIndex = modifiedString.lastIndexOf("<br")

					if(lastBrIndex !== -1){
						modifiedString = modifiedString.substring(0, lastBrIndex).trim()
						const secondLastBrIndex = modifiedString.lastIndexOf("<br")

						if(secondLastBrIndex !== -1){
							modifiedString = modifiedString.substring(0, secondLastBrIndex).trim()
						}
					}
				}

				return modifiedString.split(/<br\s*\/?>/).map(item => item.replace('-', '').trim()).filter(item => item.length > 0)
			},
			computedConversionList4(){
				const parts = this.conversionList4.split(/<br\s*\/?>/)
				const lastParts = parts[parts.length - 1].trim()
				return lastParts
			},
			computedConversionList5(){
				const res = this.conversionList5.split(/<br\s*\/?>/).map(item => item.replace('-', '')).filter(item => item.length > 0)

				if(res[0] == "-" || res[0] == "."){
					res[0] = "";
				}
				return res
			
			},
			//스탬프함 위치 YN
			computedStampYn(){
				return this.conversionList3.includes("스탬프")
			}
				
		},
		methods: {

			initComponent() {
				this.dulegilList = this.params.dulegilList;
				this.idx = this.params.idx;

				console.log("this.params.dulegilList:::::", this.params.dulegilList);
				console.log("this.params.idx:::::", this.params.idx);

			},
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
        created() {
			this.conversionList1 = this.params.dulegilList.dtlCntn
			this.conversionList2 = this.params.dulegilList.tusmInfCntn
			this.conversionList3 = this.params.dulegilList.trverInfCntn
			this.conversionList4 = this.params.dulegilList.trverInfCntn
			this.conversionList5 = this.params.dulegilList.brfCntn
			console.log("conversionList5",this.conversionList5);
				
        },
            Page,
        components : {
            FootersV2,
        }
    }



</script>
