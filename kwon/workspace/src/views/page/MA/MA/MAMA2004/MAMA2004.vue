<!--
/*************************************************************************
* @ 서비스경로 : 
* @ 페이지설명 : 화면설정
* @ 파일명     : src/views/page/MA/MAMA2004/MAMA2004.vue
* @ 작성자     : 
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10                                    최초작성
*************************************************************************/
-->
<template>
    <!-- 전체 팝업 시작 -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1 class="">메인 화면 편집</h1>
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<strong class="titH1">내가 자주보는 정보를<br>원하는 순서대로 바꿀 수 있어요</strong>
				<div class="sortable_list">
					<!-- <div class="list_item asset">
						<span class="list_item_tit">자산</span>
						<button type="button" class="btn_sortable">순서변경</button>
					</div>
					<div class="list_item expen">
						<span class="list_item_tit">지출</span>
						<button type="button" class="btn_sortable not">순서변경</button>
					</div>
					<div class="list_item target">
						<span class="list_item_tit">목표</span>
						<button type="button" class="btn_sortable">순서변경</button>
					</div> -->
                    <div v-for="(item) in tabsList" :id="item.id" :key="item.id" class="list_item" :class="fn_getTabsClass(item.id)">
                        <span class="list_item_tit">{{item.name}}</span>
                        <button type="button" class="btn_sortable">순서변경</button>
                        <!-- <template v-if="item.id === 'as' || item.id === 'lc'">
                            <span class="com_btnround_type07 gray">고정</span>
                        </template>
                        <template v-else>
                            <span class="cmm-switch custom-switch">
                                <input type="checkbox" :id="'check1-'+item.id" :checked="item.hidden=== 'N'" @change="fn_checkTabEvent($event, item)" role="switch">
                                <label :for="'check1-'+item.id"><em class="blind">{{item.name}}선택</em></label>
                            </span>
                        </template> -->
                    </div>
				</div>
				<strong class="com_pop_tit01">추천 서비스</strong>
				<ul class="service_list">
					<li v-for="(item) in bannerList" :id="`${item.id}_li`" :key="item.id" :class="`banner_item ${item.hidden === 'N' ? '' : 'dis'}`">
						<div class="service_item" :id="`${item.id}_div`" >
							<span class="service_item_tit" :id="`${item.id}_span`" >{{ item.name }}</span>
							<button type="button" class="btn_config" :id="`${item.id}_btn`" @touchstart="fn_toggleService(item)"></button>
						</div>
					</li>
					<!-- <li>
						<div class="service_item">
							<span class="service_item_tit">{{ item.name }}</span>
							<button type="button" class="btn_config"></button>
						</div>
					</li>
					<li>
						<div class="service_item">
							<span class="service_item_tit">{{ item.name }}</span>
							<button type="button" class="btn_config"></button>
						</div>
					</li>
					<li>
						<div class="service_item">
							<span class="service_item_tit">{{ item.name }}</span>
							<button type="button" class="btn_config"></button>
						</div>
					</li>
					<li class="dis">
						<div class="service_item">
							<span class="service_item_tit">콕부동산</span>
							<button type="button" class="btn_config"></button>
						</div>
					</li>
					<li class="dis">
						<div class="service_item">
							<span class="service_item_tit">콕마이카</span>
							<button type="button" class="btn_config"></button>
						</div>
					</li> -->
				</ul>
			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="#nolink" class="btn btn_mint" @click.prevent="fn_saveEvent">저장</a>
			</div>
		</div>

		<a href="#nolink" class="btn_close" @click="close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
// import {mapGetters} from 'vuex'
import commonService from '@/service/commonService'
import modalService from '@/service/modalService'

import {sortTabs} from '@/utils/slick'
// import {stringify} from '@/utils/data'

export default {
    name : "MAMA2004",
    data : () => {
        return {
            tabsList: [],
            bannerList: [],
            checkBannerList: [],
        }
    },
    computed: {
        // ...mapGetters('myassets', [
        //     'myAssetInfo',  //전체 자산 정보
        // ]),
        mydtCusno(){
            return this.getUserInfo('mydtCusno')
        },
        crmCusno(){
            return this.getUserInfo('mydtCusno')
        },
    },
    watch: {
        tabsList(value) {
            console.log('watch tabsList', value)
        }
    },
    created() {
        // 상단 탭 영역
        this.tabsList = JSON.parse(JSON.stringify(commonService.getStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'tabsV2') || []))
        // 하단 배너 영역 정보
        this.bannerList = JSON.parse(JSON.stringify(commonService.getStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'bannersV2') || []))
        console.log('Detail banners ### ', this.bannerList)
        // if(stringify(this.banners) === '{}') {
        //     // 최초 접속하는 경우 기본 값으로 설정 처리
        //     this.banners = [
        //         {id:'rt', name: '연금진단', desc: '매월 내 연금은?', hidden: 'N' },
        //         {id:'pd', name: '상품추천', desc: '맞춤 금융상품', hidden: 'N' },
        //         {id:'cr', name: '신용점수', desc: '더 높일 수 있어요', hidden: 'N' },
        //         {id:'tx', name: '세금현황', desc: '꼼꼼한 세금 관리', hidden: 'N' },
        //         {id:'re', name: '콕부동산', desc: '우리집 시세는 얼마?', hidden: 'N' },
        //         {id:'ca', name: '콕마이카', desc: '종합 자동차관리', hidden: 'N' },
        //     ]
        //     commonService.setStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'banners', this.banners)
        // }
        
    },
    mounted() {
        // 추천 서비스 순서변경
        $('.service_list').sortable({
            items: 'li:not(.dis)',
            //cancel:'.service_item.dis',
            delay:100
        })

        sortTabs()
    },
    methods: {
        fn_saveEvent() {
            // 탭 순서 저장
			let tabsId = []
			let tabs   = []
			$('.list_item').each(function() {
				let $this = $(this)
				tabsId.push($this.attr('id'))
				
			});

            // this.tabsList에서 상세 정보 획득
            tabsId.forEach(el => {
                let foundTab = this.tabsList?.find(tab => tab.id === el)
                if (foundTab && tabs.filter(el => el.id === foundTab.id).length === 0) tabs.push(foundTab)
            })

			// localstorage에 등록
            commonService.setStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'tabsV2', tabs)

            // 탭 순서 저장
            let bannerId = []
            let banners = []
			// let banners   = []
			$('.banner_item').each(function() {
				let $this = $(this)
				bannerId.push($this.attr('id')?.split('_')[0] || '')
            });

            bannerId.forEach(el => {
                let foundBanner = this.bannerList?.find(tab => tab.id === el)
                if (foundBanner && banners.filter(el => el.id === foundBanner.id).length === 0) banners.push(foundBanner)
            })

            commonService.setStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'bannersV2', banners)

            this.close({isSave: true})
        },
        fn_getTabsClass(id) {
            return id === 'as' ? 'asset' 
                : id === 'lc' ? 'expen'
                : id === 'tg' ? 'target' : ''
        },
        fn_toggleService(item) {
            let _cnt = this.bannerList.filter(el=> el.hidden === 'N')?.length || 0
            let hasClass = item.hidden === 'Y'
            if((hasClass && _cnt <= 3) || _cnt > 3){
                let fBanner = this.bannerList.find(el => el.id === (item.id))
                if (fBanner) fBanner.hidden = hasClass ? 'N' : 'Y'
            }else{
                modalService.alert('추천 서비스는 최소 3개 이상 선택해 주세요.');
                // alert("페이지 정보 필요")
            }
        }
    },
    mixins: [
        commonMixin,
        popupMixin,
    ],
}

</script>