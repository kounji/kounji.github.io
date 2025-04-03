<!--
/*************************************************************************
* @ 서비스경로 : 
* @ 페이지설명 : 화면설정
* @ 파일명     : src/views/page/MA/ASTA4002/ASTA4002.vue
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
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">
			<h1>순서 변경</h1>
			<button type="button" class="prev" @click="close()"><span class="blind">이전</span></button>
		</div>

        <div class="popup_content">
            <section class="assets_edit">
                <p>
                    <strong>관심자산별로 순서를 구성해보세요.</strong>
                    설정한 순서는 큰글모드에서도 동일하게 적용됩니다.
                </p>
                <!-- [v4.0] 25-03-18 클래스아이디 수정 -->
                <ul class="list_edit">
                    <template v-for="(item) in tabsList">
                        <li class="list_item" :id="item.id" :key="item.id">
                            <span :class="item.id">{{item.name}}</span>
                            <button type="button" class="edit_btn"><span class="blind">순서편집</span></button>
                        </li>
                    </template>
                </ul>
                <!-- //[v4.0] 25-03-18 클래스아이디 수정 -->
            </section>
		</div>

        <div class="popup_footer fixed">
            <div class="btns_wrap">
                <button type="button" class="btns lg" @click="close()">취소</button>
                <button type="button" class="btns lg primary" @click="fn_saveEvent()">저장</button>
            </div>
        </div>

		<a href="javascript:void(0);" class="btn_close" @click="close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import commonService from '@/service/commonService'
import {sortTabs} from '@/utils/slick'

export default {
    name : "ASTA4002",
    data : () => {
        return {
            tabsList: [],
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
        //this.tabsList = JSON.parse(JSON.stringify(commonService.getStorage('asetMain' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'tabsV4') || []))
        //this.tabsList = JSON.parse(JSON.stringify(this.getAsetMain() || []))
        this.tabsList = this.getAsetMain() || []
    },
    mounted() {
        $(document).ready(function () {
			$('.list_edit').each(function(){
                $(this).sortable({
                    handle :'button.edit_btn',
	                cancel :'li > span',
                });
            });

		});

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
            //commonService.setStorage('asetMain' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'tabsV4', tabs)
            this.setAsetMain(tabs)

            this.close({isSave: true})
        },
        
    },
    mixins: [
        commonMixin,
        popupMixin,
    ],
}

</script>