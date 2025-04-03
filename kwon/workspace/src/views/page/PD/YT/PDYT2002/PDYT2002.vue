<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나를위한금융
* @ 페이지설명 : 금융과생활 > 나를위한금융 > 나의 연말정산 > 메인
* @ 파일명     : src\views\page\PD\YT\PDYT2002\PDYT2002.vue
* @ 작성자     : CS533541
* @ 작성일     : 2023-07-25
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-25              CS533541              최초작성(PDYT1101 -> PDYT2002)
*************************************************************************/
-->
<template>
    <page class="content-view hasLNB mydata2023">
        <pd-category-v2 type="PDRT"></pd-category-v2>
        <pd-sub-category-v2 type="YT"></pd-sub-category-v2>

         <div id="content" class="renewal financial_life">
				<div class="com_inner top_area">
					<strong class="titH1">
						<span class="pointColor green">13월의 급여,</span><br> 
						나도 받을 수 있을까요?
					</strong>
					<p class="desc02">세금도 아끼고 소득공제까지!</p>
					
					<div class="tax_img_2023"></div>
					<div class="com_btn_area">
						<a href="javascript:void(0);" class="com_btnround_type02" role="button" @click.prevent="fn_openSlidePDYT2003()">내가 받는 공제 알아보기</a>
					</div>
				</div>

				<hr class="hr03">

				<div class="com_inner">
					<!-- 카드 소득공제 -->
					<div class="line_box_2023">
						<div class="title_area">
							<span class="badge_2023 green_badge02">카드 소득공제</span>
							<p class="text">신용카드/체크카드, 어떤 카드를 사용하는게 나을까요?</p>
						</div>
						<ul class="info_list">
							<li>조건 : 소득의 25% 초과 사용시</li>
							<li>한도 : 300만원(총소득 7,000만원 이하)</li>
						</ul>
					</div>
					<!-- //카드 소득공제 -->

					<!-- 청약 소득공제 -->
					<div class="line_box_2023">
						<div class="title_area">
							<span class="badge_2023 green_badge02">청약 소득공제</span>
							<p class="text">내 집 마련 준비 하면서 소득공제 혜택까지</p>
						</div>
						<ul class="info_list">
							<li>조건 : 소득 7천만원 이하 근로소득자</li>
							<li>한도 : 240만원 내 납입금액의 40%</li>
						</ul>
					</div>
					<!-- //청약 소득공제 -->

					<!-- 연금 소득공제 -->
					<div class="line_box_2023">
						<div class="title_area">
							<span class="mint_badge">연금 세액공제</span>
							<p class="text">안락한 노후 준비와 절세를 한번에</p>
						</div>
						<ul class="info_list">
							<li>
								700만원 한도 내에서 최대 1,155,000원까지<br>
								(총소득 5500만원 이하)
								</li>
						</ul>
					</div>
					<!-- //연금 소득공제 -->

					<!-- 기타 세액공제 -->
					<div class="line_box_2023">
						<div class="title_area">
							<span class="mint_badge">기타 세액공제</span>
							<p class="text">소득의 3% 초과된 의료비 사용 금액이 있다면 사용금액의 15% 세액공제가 가능해요</p>
						</div>
						<ul class="info_list">
							<li>
								<span class="question">납입한 보험료가 있나요?</span>
								100만원 범위 내 납입금액의 13.2% 세액공제가 가능해요
							</li>
						</ul>
					</div>
					<!-- //기타 세액공제 -->
				</div>
			</div>

        <!--// content E -->

        <footersV2 type="pd" />
    </page>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import commonMixin from '@/common/mixins/commonMixin'
import PdCategoryV2 from '@/components/category/PdCategoryV2.vue'
import PdSubCategoryV2 from '@/components/category/PdSubCategoryV2.vue'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import PDYT2003 from '@/views/page/PD/YT/PDYT2003/PDYT2003'

export default {
    name : "PDYT2002",
    data: () => {
        return {
        
        }
    },
    computed : {

    },
    methods: {

        initComponent() {

            $('.lnb [role=tablist] > li').each(function(){

				$(this).on('click', function(){

					var scrollTo = $(this).position().left - 100;
					$(this).parents($('.lnb').not('.is_open')).animate({'scrollLeft':scrollTo},500);
					console.log(scrollTo);
				});		
			});
        },
        
        getData(){

        },

        fn_openSlidePDYT2003() {
            const config = {
                params : {
                    
                },
                renderer : {
                    component : PDYT2003
                }
            }
            modalService.openSlidePagePopup(config)
        }
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

    },
    mixins: [
        commonMixin
    ],
    created() {

    },
    components: {
        Page,
        FootersV2,
        PdCategoryV2,
        PdSubCategoryV2
    },

}
</script>