<!--
/*************************************************************************
* @ 서비스경로 : 금융생활 > 금융브리핑
* @ 페이지설명 : 금융생활 > 금융브리핑 > 환율알림설정
* @ 파일명     : src\views\page\PD\BF\PDBF2002\PDBF2002.vue
* @ 작성자     : CS528061
* @ 작성일     : 2022-10-05
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-10-05              CS528061              최초작성
* 2023-10-06              CS533571              마이데이터 확대개발 화면ID만 변경
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>환율 알림 설정</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>

		<div class="popup_content com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner com_line_type01 custom_box_com_line_type01 pb22 pt20">
				<strong class="com_pop_tit01">알아두세요</strong>
				<ul class="bl_dot_list custom_list pb0 mt12">
					<li>환율 알림 대상 통화는 최대 3개까지 설정할 수 있습니다.</li>
					<li>매일 오전 6시에 업데이트 됩니다.</li>
				</ul>
			</div>
			<div class="com_inner">
				
				<div class="house_info custom_box custom_box_product01 com_box_list3">
					<div class="slick_refresh product">
						<div class="item">
							<div class="bg_box">
								<strong class="com_cont_tit01">선택 통화</strong>
								<button type="button" class="custom_box_btn" title="수정" @click.prevent="fn_updatePage()" v-if="myCurList != null">수정</button>
							</div>
							<div class="custom_country_list_box01">
								<div class="com_box_type01" v-for="(item, idx) in myCurList" :key="idx">
									<div class="house_price">
										<i class="ico" :class="'ico_'+item.curc"><span class="blind">{{item.curcCont}}</span></i>
										<span class="unit">{{item.curcCont.concat(' ', item.curc)}}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click.prevent="close(saveFlag)"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
// import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
// import commonService from '@/service/commonService'
import PDBF2003 from '@/views/page/PD/BF/PDBF2003/PDBF2003'

export default {
    name : "PDBF2002",
    data: () => {
        return {
            mydtCusno       : '',    // 마이데이터고객번호
            myCurList		: [],    // 선택 통화 목록
            saveFlag        : '',    // 저장성공여부
        }
    },
    mixins: [
        popupMixin
        // ,commonMixin
    ],
    methods: {
        initComponent() {
            this.mydtCusno = this.getUserInfo('mydtCusno')
            this.myCurList = []

            this.getData()
        },
        getData() {
            const config = {
                url: '/pd/bf/02ra1',
                data: {
                    mydtCusno : this.mydtCusno,     // 마이데이터고객번호
                }
            }
            apiService.syncCall(config).then(response => {
                this.myCurList = response.myCurList || []
            })
        },
        fn_updatePage() {
            const config = {
                params : {
                    title    : "통화선택"
                },
                renderer : {
                    component : PDBF2003,
                    cdata     : {
                        title    : "통화선택",
                    }
                }
            }
            modalService.openSlidePagePopup(config).then(response => {
                if(response === 'success') {
                    this.getData();
                    this.saveFlag = response
                }
            })
        },
    },
    mounted() {
        this.initComponent(this.params)
        
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
}
</script>