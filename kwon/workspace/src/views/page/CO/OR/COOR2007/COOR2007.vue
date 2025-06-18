<!--
/*************************************************************************
* @ 서비스경로 : 더보기>타기관 마이데이터 관리>마이데이터 가입·조회 및 관리>서비스 이용현황>미응답 목록
* @ 페이지설명 : 미응답 목록
* @ 파일명     : src/views/page/CO/OR/COOR2007/COOR2007.vue
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
							<div class="text">
								조회번호<br>
								<strong class="num">{{getUserInfo('mydtCusno')}}</strong>
							</div>
						</div>
						<div class="desc_area">
							<div class="custom_tooltip">
								<span class="txt">이용안내</span>
								<div class="com_tooltip_type02">
									<a href="javascript:void(0)" class="com_btn_info">
										<em class="com_icon_info"><span class="blind">도움말 툴팁열기</span></em>
									</a>
									<div class="com_ballon_type01 com_ballon_type02">
										<div>
											통신망 또는 전산장애 등의 사유로 인해 조회가 되지 않은 경우가 있사오니, 24시간 이내 재조회 시 동일하게 미응답으로 나오는 경우 해당 회사로 직접 문의하시기 바랍니다.
											<a href="javascript:void(0)" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<hr class="hr02">

				<div class="com_inner" v-if="unRspOrgInfoList.length > 0">
					<div class="flex_area list_top">
						<p class="com_sum">총 게시물 <span class="txt_mint">{{unRspOrgInfoList.length}}</span>개</p>
					</div>
					<!-- box -->
					<div class="com_box_type01 no_respon_box" v-for="(orgInfo, idx) in unRspOrgInfoList" :key="'orgInfo_' + idx">
						<div class="tit_area">
							<p class="tit">{{orgInfo.orgnm}}</p>
						</div>
						<div class="cont_area">
							<ul class="detail_list">
								<li>마이데이터사업자</li>
								<li>{{orgInfo.mydtOrgBzmnRgNo}}</li>
							</ul>
							<p class="status_msg">{{orgInfo.rsp_msg}}</p>
						</div>
					</div>
					<!-- //box -->

					<!-- <a href="javascript:void(0);" role="button" class="com_btn_more mt30">더보기</a> -->
				</div>

				<!-- 조회결과 없을경우 S -->
				<div class="no_data_box" v-else>
					<div class="no_data_list">
						<p>조회 결과가 없어요.</p>
					</div>
				</div>
				<!--// 조회결과 없을경우 E -->

			</div>
			<!--// content -->
		</div>
		<!--// content-view S -->
	</div>
</template>

<script>
    // import Page from '@/views/layout/Page.vue'

    import apiService from '@/service/apiService'
    import commonService from '@/service/commonService'
    import modalService from '@/service/modalService'
    import routerService from '@/service/routerService'
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'

    import {mapGetters} from 'vuex'
    
    // import _ from 'lodash'

    export default {
        name : "COOR2007",
        data: () => {
            return {
                unRspOrgInfoList : []   //  미응답 기관정보 리스트
                , orgCnt : 0  //   총 기관수
                , unRspCnt : 0  // 미응답 수
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
                console.log('params : ', this.routeParams)
                this.unRspOrgInfoList = this.routeParams.orgInfo.filter(d => d.rsp_code != '00000')
                this.orgCnt = this.routeParams.orgCnt
                this.unRspCnt = this.routeParams.unRspCnt
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