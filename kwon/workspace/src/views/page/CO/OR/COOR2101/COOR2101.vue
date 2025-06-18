<!--
/*************************************************************************
* @ 서비스경로 : 더보기>타기관 마이데이터 관리>제3자 정보제공 조회 및 관리
* @ 페이지설명 : 제3자 정보제공 조회 및 관리
* @ 파일명     : src/views/page/CO/OR/COOR2101/COOR2101.vue
* @ 작성자     : CS530689
* @ 작성일     : 2024-11-25
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-11-25              CS530689                 최초작성
*************************************************************************/
-->
<template>
    <div id="wrap" class="sticky-scroll fix">
		<!-- content-view S -->
		<div class="content-view mydata2023">
			<!-- content -->
			<div id="content" class="renewal other_mydata"><!-- 2024-11 : 타기관마이데이터 other_mydata 추가 -->
				<div class="com_inner">
					<div class="top_area">
						<strong class="com_cont_tit02">제3자 제공 동의내역 <br>조회 전 동의해주세요</strong>
					</div>
					<p class="com_txt_sub mt12">마이데이터 서비스 이용 간에 제공된 개인(신용)정보의 제3자 정보제공 내역을 조회하실 수 있습니다.</p>
					<div class="info_box">
						<ul class="bl_dot_list one_register_list">
							<li>최근 3년 이내 제공/동의 내역만 확인할 수 있습니다.</li>
							<li>다른 사람의 아이디를 무단 도용해 조회하지 마세요.</li>
						</ul>
					</div>
				</div>

				<hr class="hr02">

				<div class="com_inner">
					<div class="notice_box">
						<strong class="notice_tit">확인하세요</strong>
						<ul class="bl_dot_list one_register_list">
							<li>마이데이터 서비스 이용과 관련된 문의사항은 마이데이터 종합포털에 마련된 <a href="javascript:void(0)" title="새창 열림" class="txt_link" @click.prevent="moveFaq">FAQ</a>를 확인해 주시기 바랍니다.</li>
						</ul>
					</div>
				</div>
			</div>
			<!--// content -->

			<div class="bottom_box">
				<div class="btn_full_box">
					<a href="javascript:void(0);" class="btn btn_mint" role="button" @click="moveAgree">제3자 제공 동의내역 통합조회 하기</a>
					<!-- btn_off 제거시 활성화 -->
				</div>
			</div>
		</div>
		<!--// content-view S -->
	</div>
</template>

<script>
    // import Page from '@/views/layout/Page.vue'

    import apiService from '@/service/apiService'
    import appService from '@/service/appService'
    import commonService from '@/service/commonService'
    import modalService from '@/service/modalService'
    import routerService from '@/service/routerService'
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'

    import {dateFormat} from '@/utils/date'
    import {mapGetters} from 'vuex'

    import COOR2102 from '@/views/page/CO/OR/COOR2102/COOR2102'
    import COOR2103 from '@/views/page/CO/OR/COOR2103/COOR2103'
    
    // import _ from 'lodash'

    export default {
        name : "COOR2101",
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
            moveFaq() {

                let url = "https://www.mydatacenter.or.kr:3441/myd/bbsctt/faq1/faq/bbsctt.do"

                // chnl : 385 -> 스마트뱅크 , 386 -> 콕뱅크
                if(this.getUserInfo('chnl') === '385') {
                    // 스뱅
                    appService.executeBrowser(url)
                } else {
                    // 콕뱅
                    appService.cokBankOpenPopupWebBrowser(url)
                }
            },
            moveAgree() {
                const today = new Date()
                const todayH = dateFormat(today, "HH")
                const day = today.getDay()
                
                if(day !==0 && day !== 6 && todayH >= 10 && todayH < 16){
                    const config = {
                        component: COOR2102,
                    }
                    
                    modalService.openPopup(config).then((res) => {
                        if(res === "ok"){
                            this.moveSearch()
                        }
                    })
                }else{
                    modalService.alert("서비스에 불편을 드려 죄송합니다. 정부 정책에 따른 서비스 이용 가능 시간이 아닙니다.<br>( 조회 가능 시간 : 평일 오전 10시~ 오후 16시)")
                }
            },
            moveSearch() {
                const config = {
					component: COOR2103,
                }
                
				modalService.openPopup(config).then((res) => {
                    if(res){
                        this.moveSearchResult(res)
                    }
                })
            },
            moveSearchResult(res) {
                const config = {
                    name : 'COOR2104',
                    params : res,
                }
                commonService.movePage(config);
            },
            movePrev() {
                console.log('this.routeParams : ', this.routeParams)
                if(this.routeParams === "noPrev"){
                    const config = {
                        name : 'MRMR2001',
                        params : 'noPrev'
                    }
                    commonService.movePage(config);
                }else{
                    routerService.movePrev()
                }
            },
        },
        components : {
            // Page
        }
    }
</script>