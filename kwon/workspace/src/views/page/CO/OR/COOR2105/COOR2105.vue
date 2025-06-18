<!--
/*************************************************************************
* @ 서비스경로 : 더보기>타기관 마이데이터 관리>제3자 정보제공 조회 및 관리>제3자 제공 동의내역 통합조회>철회내역
* @ 페이지설명 : 철회내역
* @ 파일명     : src/views/page/CO/OR/COOR2105/COOR2105.vue
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
					<div class="top_area mt15">
						<strong class="titH3">
							제3자 정보제공 동의내역을 새로 갱신하려면 <br>통합조회를 다시 실행해주세요
						</strong>
						<p class="desc"><a href="javascript:void(0)" class="link_arrow" @click="moveFirst">제3자 제공 동의 내역 통합조회</a></p>
					</div>
					
				</div>

				<div class="com_inner">
					<div class="com_tabmenu_type03 switchType btn2">
						<ul role="tablist">
							<li role="presentation" aria-controls="tab_01"><a href="javascript:void(0)" role="tab" @click="moveAgree"><span>동의 내역</span></a></li>
							<li class="on" role="presentation" aria-controls="tab_02"><a href="javascript:void(0)" role="tab"><span>철회 내역</span></a></li>
						</ul>
					</div>
				</div>
				
				<div class="com_inner" v-if="provRevokeList.length > 0">
					<div class="flex_area list_top">
						<p class="com_sum">총 게시물 <span class="txt_mint">{{provRevokeList.length}}</span>개</p>
					</div>
				
					<!-- box -->
					<div class="com_box_type01 agree_status_box" v-for="(provRevoke, idx) in provRevokeList" :key="'provRevoke_'+idx">
						<div class="flex_area">
							<div class="label_list">
								<span class="mint_badge" v-if="provRevoke.prov_consent_status == '03'">철회완료</span>
								<span class="badge_2023 soft_gray" v-if="provRevoke.prov_consent_status == '02'">철회중</span>
							</div>
						</div>
						<div class="tit_area">
							<strong class="tit">{{provRevoke.prov_service_name}}</strong>
						</div>
						<div class="cont_area">
							<ul class="data_list list_gray_box">
								<li>
									<div class="key">동의일시</div>
									<div class="val"><span class="num">{{provRevoke.prov_revoke_dtime | dateFilter('YYYY.MM.DD HH:mm:ss')}}</span></div>
								</li>
								<li>
									<div class="key">제공하는 기관</div>
									<div class="val">{{provRevoke.snd_org_name}}</div>
								</li>
								<li>
									<div class="key">제공받는 기관</div>
									<div class="val">{{provRevoke.consent_rcv_name}}</div>
								</li>
								<li class="w_fixed">
									<div class="key">제공항목</div>
									<div class="val">{{provRevoke.prov_consent_asset}}</div>
								</li>
							</ul>
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
    import commonService from '@/service/commonService'
    import modalService from '@/service/modalService'
    import routerService from '@/service/routerService'
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'

    import {mapGetters} from 'vuex'
    
    // import _ from 'lodash'

    export default {
        name : "COOR2105",
        data: () => {
            return {
                provConsentAllList : [] //정보제공 모든 리스트
                , provRevokeList : []  //정보제공 철회중+철회완료 리스트
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
                console.log('this.routeParams : ', this.routeParams)
                this.provConsentAllList = this.routeParams.provConsentList
                this.provRevokeList = this.routeParams.provConsentList.filter(d => (d.prov_consent_status == '02' || d.prov_consent_status == '03'))
            },
            moveAgree() {
                const config = {
                    name : 'COOR2104',
                    params : this.routeParams
                }
                commonService.movePage(config);
            },
            moveFirst() {
                const config = {
                    name : 'COOR2101',
                    params : 'noPrev'
                }
                commonService.movePage(config);
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