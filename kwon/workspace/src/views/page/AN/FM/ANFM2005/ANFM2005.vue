<!--
/*************************************************************************
* @ 서비스경로 : 제휴서비스 > 귀농귀촌
* @ 페이지설명 : 귀농귀촌 > 금융상품 추천
* @ 파일명     : src/views/page/AN/FM/ANFM2005/ANFM2005.vue
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
			<h1>귀농귀촌 금융가이드</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
		
		<div class="popup_content com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->
			
			<!-- 행복한 귀농인의 꿈을 위한 추천 금융상품이 있을까요? -->
			<div class="com_inner com_top_type04 mt15">
				<strong class="com_pop_tit02">
					행복한 귀농인의 꿈을 위한 추천<br/>
					금융상품이 있을까요?
				</strong>
			</div>
			<!--// 행복한 귀농인의 꿈을 위한 추천 금융상품이 있을까요? -->

			<div class="com_inner mt26">
				<!-- 퇴직해서 귀농을 계획중인데 미리 준비할 수 있는 금융상품은 뭔가요? -->
				<div class="custom_module_box_parent module_list01">
					<div class="custom_module_box img img01">
						<strong class="custom_tit">
							퇴직해서 귀농을 계획중인데 미리 준비할 수 있는 금융상품은 뭔가요?
						</strong>
						<p class="custom_con">
							10~20년 퇴직 후 귀농 계획을 가지고<br/>
							계시다면 장기적 적금 우대금리<br/>
							상품을 추천 드립니다.
						</p>
					</div>
					<div class="gray_spend_box custom_box_gray">
						<ul class="dot_list">
							<li>
								<strong>귀농Start적금(자금마련형)</strong>
							</li>
							<li>
								<strong>농어가 목돈마련 대출</strong>
							</li>
						</ul>
						
					</div>
				</div>
				<!--// 퇴직해서 귀농을 계획중인데 미리 준비할 수 있는 금융상품은 뭔가요? -->
				
				<!-- 퇴직금을 좀 더 효율적으로 관리해서 귀농자금 마련을 할 수 있을까요? -->
				<div class="custom_module_box_parent module_list02">
					<div class="custom_module_box img img02">
						<strong class="custom_tit">
							퇴직금을 좀 더 효율적으로 관리해서 귀농자금 마련을 할 수 있을까요?
						</strong>
						<p class="custom_con">
							현재 퇴직금을 보유하고 있다면 우선은<br/>
							은퇴자금 관리를 위한 입출금 상품을<br/>
							권해 드립니다.
						</p>
					</div>
					<div class="gray_spend_box custom_box_gray">
						<ul class="dot_list">
							<li>
								<strong>귀농Start통장(자금관리형)</strong>
							</li>
						</ul>
					</div>
				</div>
				<!--// 퇴직금을 좀 더 효율적으로 관리해서 귀농자금 마련을 할 수 있을까요? -->
				
				<!-- 정작 귀농하고 나서 소득단절 어려움을 미리 대비할 수 있나요? -->
				<div class="custom_module_box_parent module_list03">
					<div class="custom_module_box img img03">
						<strong class="custom_tit">
							정작 귀농하고 나서 소득단절 어려움을 미리 대비할 수 있나요?
						</strong>
						<p class="custom_con">
							소득단절을 대비하기 위해 연금지급형<br/>
							적금에 가입하는 것을 추천 드립니다.
						</p>
					</div>
					<div class="gray_spend_box custom_box_gray">
						<ul class="dot_list">
							<li>
								<strong>귀농Start적금(연금지급형)</strong>
							</li>
						</ul>
					</div>
				</div>
				<!--// 정작 귀농하고 나서 소득단절 어려움을 미리 대비할 수 있나요? -->

				<!-- 여유자금으로 목돈을 만들어 안정적인 귀농 생활이 가능한가요? -->
				<div class="custom_module_box_parent module_list04">
					<div class="custom_module_box img img04">
						<strong class="custom_tit">
							여유자금으로 목돈을 만들어 안정적인 귀농 생활이 가능한가요?
						</strong>
						<p class="custom_con">
							퇴직 후에 목돈이 여유로운 상황이라면<br/>
							자금운용에 맞춰진 예금 상품을 추천<br/>
							드립니다.
						</p>
					</div>
					<div class="gray_spend_box custom_box_gray">
						<ul class="dot_list">
							<li>
								<strong>귀농Start예금(즉시연금형)</strong>
							</li>
							<li>
								<strong>귀농Start예금(자금운용형)</strong>
							</li>
						</ul>
					</div>
				</div>
				<!--// 여유자금으로 목돈을 만들어 안정적인 귀농 생활이 가능한가요? -->

				<p class="com_txtinfo_type01 custom_box_txtinfo_type01">
					해당 금융 상품 가입 문의는 가까운 영업점으로 방문하여 주시기 바랍니다.
				</p>

				<!-- banner -->
				<div class="inner_banner">
					<a href="javascript:void(0);" role="button" @click="openPDMY4005Popup()">
						<div class="com_box_type03 bg26">
							<div class="text">
								행복한 인생2막을 위한<span>목돈마련 목표를 세워볼까요?</span>
							</div>
						</div>
					</a>
				</div>
				<!--// banner -->
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
</template>

<script>
    import apiService from '@/service/apiService'
	import appService from '@/service/appService'
	import modalService from '@/service/modalService'
	
    import PDMY4005 from '@/views/page/PD/MY/PDMY4005/PDMY4005'

	import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'

    export default {
        name : "ANFM2005",
        data: () => {
            return {
            }
        },
        mounted() {
            //PFM로그 처리 화면접속이력 등록 POST
            this.initComponents()
            apiService.pfmLogSend(this.$options.name)
        },
        mixins: [
			commonMixin,
			popupMixin
        ],
        methods: {
            initComponents() {
            },
            openWebBrowser(url) {
                if (this.getUserInfo('chnl') === '385') {
                    appService.executeBrowser(url);
                } else {
                    appService.cokBankOpenPopupWebBrowser(url);
                }
			},
			/**
			 * 나의 목표 열기
			 */
			openPDMY4005Popup() {
                const config = {
                    component: PDMY4005,
                    params : {}
                }

                modalService.openPopup(config)
            },
        },
        components : {
        }
    }

</script>