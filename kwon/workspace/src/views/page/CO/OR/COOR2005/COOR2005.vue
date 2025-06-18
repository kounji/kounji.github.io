<!--
/*************************************************************************
* @ 서비스경로 : 더보기>타기관 마이데이터 관리>마이데이터 가입·조회 및 관리>서비스 이용현황>전송요구내역 통합조회 결과
* @ 페이지설명 : 전송요구내역 통합조회 결과
* @ 파일명     : src/views/page/CO/OR/COOR2005/COOR2005.vue
* @ 작성자     : CS530689
* @ 작성일     : 2024-11-25
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-11-25              CS530689                 최초작성
*************************************************************************/
-->
<template>
    <div id="wrap" class="sticky-scroll">
		<!-- content-view S -->
		<div class="content-view mydata2023">
			<!-- content -->
			<div id="content" class="renewal other_mydata"><!-- 2024-11 : 타기관마이데이터 other_mydata 추가 -->

				<div class="com_inner">
					<div class="search_num">
						<div class="title">
							<div class="text" @click="openPop">
								조회번호<br>
								<strong class="num">{{getUserInfo('mydtCusno')}}</strong>
							</div>
						</div>
						<div class="flex_area mt10">
							<div class="desc_area mt0">
								<div class="custom_tooltip">
									<span class="txt">이용안내</span>
									<div class="com_tooltip_type02">
										<a href="javascript:void(0)" class="com_btn_info">
											<em class="com_icon_info"><span class="blind">도움말 툴팁열기</span></em>
										</a>
										<div class="com_ballon_type01 com_ballon_type02">
											<div>
												마이데이터 서비스 이용과 관련된 문의사항은 마이데이터 종합포털에 마련된 <a href="javascript:void(0)" @click.prevent="moveFaq" role="button" title="새창 열림" class="txt_link">FAQ</a>를 확인해 주시기 바랍니다.
												<a href="javascript:void(0)" role="button" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- <div>ㄴ -->
						</div>
					</div>
				</div>

				<hr class="hr02">

				<div class="com_inner">
					<div class="lnb lnb_filter">
						<div class="tablistBox">
							<ul role="tablist">
								<li class="on"><a href="javascript:void(0)" @click="filterOrgType('all')">전체</a></li>
								<li><a href="javascript:void(0)" @click="filterOrgType('01')">정보제공자(API자체구축)</a></li>
								<li><a href="javascript:void(0)" @click="filterOrgType('02')">정보제공자(중계기관이용)</a></li>
								<li><a href="javascript:void(0)" @click="filterOrgType('03')">마이데이터사업자</a></li>
								<li><a href="javascript:void(0)" @click="filterOrgType('04')">중계기관</a></li>
								<li><a href="javascript:void(0)" @click="filterOrgType('05')">통합인증기관(인증서본인확인기관)</a></li>
								<li><a href="javascript:void(0)" @click="filterOrgType('06')">통합인증기관(전자서명인증사업자)</a></li>
								<li><a href="javascript:void(0)" @click="filterOrgType('07')">종합포털</a></li>
								<li><a href="javascript:void(0)" @click="filterOrgType('99')">기타</a></li>
								<li><a href="javascript:void(0)" @click="filterOrgType('notMember')">미가입</a></li>
							</ul>
						</div>
					</div>
					<hr>
					<div class="flex_area list_top">
						<div class="no_respon_list">
							<a href="javascript:void(0)" class="btn_arrow" @click="moveNoResponse()">미응답 목록</a>
						</div>
					</div>
			
					<!-- box -->
					<div class="com_box_type01 toggle_list_box2 custom_list result_list" v-for="(orgInfo, idx) in rspOrgInfoList" :key="'orgInfo_' + idx">
						<div data-ui-toggle="box" class="toggle_box_area open">
							<button type="button" class="view_btn" aria-expanded="true">
								<div class="tit_area">
									<div class="tit"><span>{{orgInfo.orgnm}}</span></div>
									<div class="cont">
										<span>{{getOrgType(orgInfo.mydtOutsOrgDsc)}}</span>
									</div>
								</div>
								<!-- <em class="open">열기</em>
								<em class="close">닫기</em> -->
							</button>
						</div>
						<!-- <ul class="view_cont list_toggle">
							<li>
								<a href="javascript:void(0)" class="link_arrow">
									<strong class="tit">롯데멤버스주식회사</strong>
									<span class="cont">
										<span>전자금융</span>
										<span>2024.09.28</span>
									</span>
								</a>
							</li>
							<li>
								<a href="javascript:void(0)" class="link_arrow">
									<strong class="tit">케이뱅크은행</strong>
									<span class="cont">
										<span>은행</span>
										<span>2024.09.28</span>
									</span>
								</a>
							</li>
						</ul> -->
					</div>
					<!-- //box -->

					<!-- <a href="javascript:void(0);" role="button" class="com_btn_more mt30">더보기</a> -->
				</div>

				<!-- 조회결과 없을경우 S -->
				<div class="no_data_box" v-if="rspOrgInfoList.length < 1">
					<div class="no_data_list">
						<p>조회 결과가 없어요.</p>
					</div>
				</div>
				<!-- 조회결과 없을경우 E -->

				
			</div>
			<!--// content -->
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

    import COOR2005Pop from '@/views/page/CO/OR/COOR2005/COOR2005Pop'

    import {mapGetters} from 'vuex'
    
    // import _ from 'lodash'

    export default {
        name : "COOR2005",
        data: () => {
            return {
                rspOrgInfoAllList : []  // 응답+미응답 기관정보 리스트
                , rspOrgInfoList : []  // 응답 기관정보 리스트
                , orgCnt : 0  //   총 기관수
                // , unRspCnt : 0  // 미응답 수
                , outsOrgDscArr : {
                            "01" : "정보제공자(API자체구축)"
                            ,"02" : "정보제공자(중계기관이용)"
                            ,"03" : "마이데이터사업자"
                            ,"04" : "중계기관"
                            ,"05" : "통합인증기관(인증서본인확인기관)"
                            ,"06" : "통합인증기관(전자서명인증사업자)"
                            ,"07" : "종합포털"
                            ,"99" : "기타"
                        }
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
                this.rspOrgInfoAllList = this.routeParams.orgInfo
                // console.log('this.rspOrgInfoAllList :', this.rspOrgInfoAllList)
                // this.rspOrgInfoAllList[0].rsp_code = '00000'
                // this.rspOrgInfoAllList[0].isMember = 'true'
                // this.rspOrgInfoAllList[1].rsp_code = '00000'
                // this.rspOrgInfoAllList[1].isMember = 'false'
                this.rspOrgInfoList = this.rspOrgInfoAllList.filter(d => d.rsp_code == '00000' && d.isMember == 'true')
                this.orgCnt = this.routeParams.orgCnt
                // this.unRspCnt = this.routeParams.unRspCnt
            },
            getOrgType(outsOrgDsc) {
                return this.outsOrgDscArr[outsOrgDsc]
            },
            filterOrgType(org) {
                if(org !== 'all'){
                    if(org === "notMember"){
                        this.rspOrgInfoList = this.routeParams.orgInfo.filter(d => (d.rsp_code == '00000' && d.isMember == 'false'))
                    }else{
                        this.rspOrgInfoList = this.routeParams.orgInfo.filter(d => (d.rsp_code == '00000' && d.mydtOutsOrgDsc == org  && d.isMember == 'true'))
                    }
                }else{
                    this.rspOrgInfoList = this.routeParams.orgInfo.filter(d => d.rsp_code == '00000' && d.isMember == 'true')
                }
            },
            moveFaq() {
                let url = "https://www.mydatacenter.or.kr:3441/myd/bbsctt/faq1/faq/bbsctt.do"

                // chnl : 385 -> 스마트뱅크 , 386 -> 콕뱅크
                if(this.getUserInfo('chnl') === '385') {
                    // 스뱅
                    ckxm.executeBrowser(url)
                } else {
                    // 콕뱅
                    appService.cokBankOpenPopupWebBrowser(url)
                }
            },
            moveNoResponse() {
                const config = {
                    name : 'COOR2007',
                    params : this.routeParams
                }
                commonService.movePage(config);
            },
            movePrev() {
                routerService.movePrev()
            },
            openPop() {
                if(this.getUserInfo('tobeType')){
                    const config = {
                        component: COOR2005Pop,
                        title: "안내",
                        params: this.rspOrgInfoAllList
                    }
                    // this.close()
                    modalService.openPopup(config).then(() => {})
                }
            },
        },
        components : {
            // Page
        }
    }
</script>