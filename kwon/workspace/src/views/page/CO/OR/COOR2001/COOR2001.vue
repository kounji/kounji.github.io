<!--
/*************************************************************************
* @ 서비스경로 : 더보기>타기관 마이데이터 관리>마이데이터 가입·조회 및 관리
* @ 페이지설명 : 마이데이터 가입 조회 및 관리 메인
* @ 파일명     : src/views/page/CO/OR/COOR2001/COOR2001.vue
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
						<strong class="com_cont_tit02">전송요구내역 통합조회</strong>
					</div>
					<p class="com_txt_sub mt12">마이데이터 서비스 앱 또는 마이데이터 포켓을 통해 전송 요구한 내역을 한 번에 확인 하실 수 있습니다.</p>
					<div class="info_box">
						<ul class="bl_dot_list one_register_list">
							<li>조회시점에 유효한 전송 요구 내역만 확인 가능합니다.</li>
							<li>타인의 아이디를 무단으로 도용하여 조회하는 행위는 금지됩니다.</li>
						</ul>
					</div>
				</div>

				<hr class="hr02">

				<div class="com_inner">
					<div class="notice_box">
						<strong class="notice_tit">확인하세요</strong>
						<ul class="bl_dot_list one_register_list mt10">
							<li>마이데이터 서비스 이용과 관련된 문의사항은 마이데이터 종합포털에 마련된 <a href="javascript:void(0)" @click="moveFaq" title="새창 열림" class="txt_link">FAQ</a>를 확인해 주시기 바랍니다.</li>
						</ul>
					</div>
				</div>
			</div>
			<!--// content -->

			<div class="bottom_box">
				<div class="btn_full_box">
					<a href="javascript:void(0);" class="btn btn_mint" role="button" @click="moveAgree">전송요구내역 통합조회하기</a>
					<!-- btn_off 제거시 활성화 -->
				</div>
			</div>

		</div>
		<!--// content-view S -->
	</div>
</template>

<script>
    import appService from '@/service/appService'
    import apiService from '@/service/apiService'
    import commonService from '@/service/commonService'
    import modalService from '@/service/modalService'
    import routerService from '@/service/routerService'
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'

    import {dateFormat} from '@/utils/date'
    // import {mapGetters} from 'vuex'

    // import COOR2002 from '@/views/page/CO/OR/COOR2002/COOR2002'
    import COOR2003 from '@/views/page/CO/OR/COOR2003/COOR2003'
    import COOR2004 from '@/views/page/CO/OR/COOR2004/COOR2004'
    
    export default {
        name : "COOR2001",
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
            moveAgree() {
                const today = new Date()
                const todayH = dateFormat(today, "HH")
                const day = today.getDay()
                
                if(day !==0 && day !== 6 && todayH >= 10 && todayH < 16){
                    const config = {
                        component: COOR2003,
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
					component: COOR2004,
                }
                
				modalService.openPopup(config).then((res) => {
                    if(res){
                        this.moveSearchResult(res)
                    }
                })
            },
            moveSearchResult(res) {
                const config = {
                    name : 'COOR2005',
                    params : res
                }
                commonService.movePage(config)
                this.close()
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
            movePrev() {
                routerService.movePrev()
            },
        },
        components : {
            // Page
        }
    }
</script>