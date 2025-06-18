<!--
/*************************************************************************
* @ 서비스경로 : 홈 > 홈화면 편집
* @ 페이지설명 : 홈 > 홈화면 편집
* @ 파일명     : src/views/page/MA/MA/MAMA4004/MAMA4004.vue
* @ 작성자     : CS540687
* @ 작성일     : 2025-03-06
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-06              CS540687              최초작성
*************************************************************************/
-->
<template>      
	<!-- full popup S -->
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>홈화면 순서 편집</h1>
			<!-- <button type="button" class="prev"><span class="blind">이전</span></button> -->
		</div>

		<div class="popup_content">
			<section class="assets_edit">
				<p><strong>홈 화면에서 보이는 순서를<br>원하는 대로 바꿀 수 있어요.</strong></p>
                <!-- [v4.0] 25-03-18 클래스아이디 수정 -->
                <ul class="list_edit">
                    <template v-for="(item) in tabsList">
                        <li v-if="item.id !=='item14'" class="list_item" :id="item.id" :key="item.id">
                            <span :class="item.id">{{item.name}}</span>
                            <button type="button" class="edit_btn"><span class="blind">순서편집</span></button>
                        </li>
                    </template>
                </ul>
                <!-- //[v4.0] 25-03-18 클래스아이디 수정 -->				
		<!--
				<ul class="list_edit">
					<template v-for="(item) in tabsList" >
					<li :id="item.id" :key="item.id" class="list_item" :class="fn_getTabsClass(item.id)">
						<span :class="item.id">{{item.name}}</span>
					</li>
					</template>
				</ul>	
		-->
				<!-- [D]
					item01 주가지수
					item02 추천서비스
					item03 주요자산 변동내역
					item04 자산분석을 통한 제안
					item05 신용과 건강
					item06 건강, 연금/절세
					item07 내가 연결한 자산
					item08 자산진단
					item09 나의 관심서비스

				<ul class="list_edit">
					<li>
						<span class="item01">주가지수</span>
					</li>
					<li>
						<span class="item02">추천서비스</span>
					</li>
					<li>
						<span class="item03">주요자산 변동내역</span>
					</li>
					<li>
						<span class="item04">자산분석을 통한 제안</span>
					</li>
					<li>
						<span class="item05">신용과 건강</span>
					</li>
					<li>
						<span class="item06">건강, 연금/절세</span>
					</li>
					<li>
						<span class="item07">내가 연결한 자산</span>
					</li>
					<li>
						<span class="item08">자산진단</span>
					</li>
					<li>
						<span class="item09">나의 관심서비스</span>
					</li>
				</ul>
				-->
			</section>
			<section class="assets_check">
				<p><strong>주요자산 변동 내역.<br>홈 화면에서 자산을 선택하세요.</strong>최대 5개 선택할 수 있어요.</p>
				<!-- [D]
					item01 예금
					item02 부동산
					item03 투자
					item04 연금
					item05 페이/포인트
					item06 보험
					item07 카드
					item08 대출
					item09 자동차
					item10 기타자산
					item11 할부금융
					item12 자동차할부
					item13 학자금대출
					item14 리스
					item15 빌린돈
				-->
				<ul>
					<li>
						<input type="checkbox" name="change_asset" id="ASAC4001" :checked="myAssetWrsList.findIndex(el=>el == 'ASAC4001') &gt; -1" ref="ASAC4001" @change.prevent="chkValidate($event, 'ASAC4001')" />
						<label for="ASAC4001" class="item01">예금</label>
					</li>
					<li>
						<input type="checkbox" name="change_asset" id="ASRE4001" :checked="myAssetWrsList.findIndex(el=>el == 'ASRE4001') &gt; -1" ref="ASRE4001" @change.prevent="chkValidate($event, 'ASRE4001')" />
						<label for="ASRE4001" class="item02">부동산</label>
					</li>
					<li>
						<input type="checkbox" name="change_asset" id="ASIV4001" :checked="myAssetWrsList.findIndex(el=>el == 'ASIV4001') &gt; -1" ref="ASIV4001" @change.prevent="chkValidate($event, 'ASIV4001')" />
						<label for="ASIV4001" class="item03">투자</label>
					</li>
					<li>
						<input type="checkbox" name="change_asset" id="ASPS4001" :checked="myAssetWrsList.findIndex(el=>el == 'ASPS4001') &gt; -1" ref="ASPS4001" @change.prevent="chkValidate($event, 'ASPS4001')" />
						<label for="ASPS4001" class="item04">연금</label>
					</li>
					<li>
						<input type="checkbox" name="change_asset" id="ASPT4001" :checked="myAssetWrsList.findIndex(el=>el == 'ASPT4001') &gt; -1" ref="ASPT4001" @change.prevent="chkValidate($event, 'ASPT4001')" />
						<label for="ASPT4001" class="item05">페이/포인트</label>
					</li>
					<li>
						<input type="checkbox" name="change_asset" id="ASIS4001" :checked="myAssetWrsList.findIndex(el=>el == 'ASIS4001') &gt; -1" ref="ASIS4001" @change.prevent="chkValidate($event, 'ASIS4001')" />
						<label for="ASIS4001" class="item06">보험</label>
					</li>
					<li>
						<input type="checkbox" name="change_asset" id="ASCD4001" :checked="myAssetWrsList.findIndex(el=>el == 'ASCD4001') &gt; -1" ref="ASCD4001" @change.prevent="chkValidate($event, 'ASCD4001')" />
						<label for="ASCD4001" class="item07">카드</label>
					</li>
					<li>
						<input type="checkbox" name="change_asset" id="ASLN4001" :checked="myAssetWrsList.findIndex(el=>el == 'ASLN4001') &gt; -1" ref="ASLN4001" @change.prevent="chkValidate($event, 'ASLN4001')" />
						<label for="ASLN4001" class="item08">대출</label>
					</li>
					<li>
						<input type="checkbox" name="change_asset" id="ASCA4001" :checked="myAssetWrsList.findIndex(el=>el == 'ASCA4001') &gt; -1" ref="ASCA4001" @change.prevent="chkValidate($event, 'ASCA4001')" />
						<label for="ASCA4001" class="item09">자동차</label>
					</li>
					<li>
						<input type="checkbox" name="change_asset" id="ASOA4001" :checked="myAssetWrsList.findIndex(el=>el == 'ASOA4001') &gt; -1" ref="ASOA4001" @change.prevent="chkValidate($event, 'ASOA4001')" />
						<label for="ASOA4001" class="item10">기타자산</label>
					</li>
					<li>
						<input type="checkbox" name="change_asset" id="ASIT4001" :checked="myAssetWrsList.findIndex(el=>el == 'ASIT4001') &gt; -1" ref="ASIT4001" @change.prevent="chkValidate($event, 'ASIT4001')" />
						<label for="ASIT4001" class="item11">할부금융</label>
					</li>
					<li>
						<input type="checkbox" name="change_asset" id="ASCL4001" :checked="myAssetWrsList.findIndex(el=>el == 'ASCL4001') &gt; -1" ref="ASCL4001" @change.prevent="chkValidate($event, 'ASCL4001')" />
						<label for="ASCL4001" class="item12">자동차할부</label>
					</li>
					<li>
						<input type="checkbox" name="change_asset" id="ASEL4001" :checked="myAssetWrsList.findIndex(el=>el == 'ASEL4001') &gt; -1" ref="ASEL4001" @change.prevent="chkValidate($event, 'ASEL4001')" />
						<label for="ASEL4001" class="item13">학자금대출</label>
					</li>
					<li>
						<input type="checkbox" name="change_asset" id="ASLS4001" :checked="myAssetWrsList.findIndex(el=>el == 'ASLS4001') &gt; -1" ref="ASLS4001" @change.prevent="chkValidate($event, 'ASLS4001')" />
						<label for="ASLS4001" class="item14">리스</label>
					</li>
					<li>
						<input type="checkbox" name="change_asset" id="ASBR4001" :checked="myAssetWrsList.findIndex(el=>el == 'ASBR4001') &gt; -1" ref="ASBR4001" @change.prevent="chkValidate($event, 'ASBR4001')" />
						<label for="ASBR4001" class="item15">빌린돈</label>
					</li>
				</ul>
			</section>
		</div>

		<div class="popup_footer fixed">
			<div class="btns_wrap">
				<button type="button" class="btns lg" @click.prevent="close()">취소</button>
				<button type="button" class="btns lg primary" @click.prevent="fn_saveEvent">저장</button>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>
<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
// import {mapGetters} from 'vuex'
import commonService from '@/service/commonService'
import modalService from '@/service/modalService'

import {sortTabs} from '@/utils/slick'

export default {
	name : "MAMA4004",
	data: () => {
		return {
		tabsList : [],	
		tabsList2: [
				{id:'item01', hidden:'N', name: '주가지수'},
				{id:'item02', hidden:'N', name: '추천서비스'},
				{id:'item03', hidden:'N', name: '주요자산 변동내역'},				
				{id:'item04', hidden:'N', name: '자산분석을 통한 제안'},
				{id:'item05', hidden:'N', name: '신용과 건강'},
				{id:'item06', hidden:'N', name: '건강, 연금/절세'},
				{id:'item07', hidden:'N', name: 'NH지역정보'},
				{id:'item08', hidden:'N', name: '로또복권 번호 만들기'},
				{id:'item09', hidden:'N', name: '나만의 캐릭터 설정하기'},
				{id:'item10', hidden:'N', name: '내가 연결한 자산'},
				{id:'item11', hidden:'N', name: '금융지식과 OX퀴즈'},
				{id:'item12', hidden:'N', name: '자산진단'},
				{id:'item13', hidden:'N', name: '나의 관심서비스'},
				//{id:'item14', hidden:'N', name: '홈편집'},
			],

            fvrList  : [],       // 선택된 관심서비스
            myAssetWrsList : [],		
		 		
		}
	},
	mixins: [
		commonMixin,
		popupMixin
	],
	computed : {
	},
	watch: {
		tabsList(value) {
			console.log('watch tabsList', value)
		}
	},
	created() {
		// 상단 탭 영역
		//this.tabsList = JSON.parse(JSON.stringify(commonService.getStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'tabsV4') || []))
		this.tabsList = JSON.parse(JSON.stringify(this.getMainTabs() || []))

		if(!this.tabsList || !this.tabsList.length || this.tabsList.length === 0  || this.tabsList.length < 14) {
			this.tabsList = this.tabsList2
			console.log('created tabsList 2 ', this.tabsList)			
		 }
	},		
	mounted() {
		this.initComponent()
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
		initComponent() {
			//let myAssetWrsList2 = commonService.getStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'myAssetWrs')
		 	this.myAssetWrsList = this.getMyAssetWrs();

			console.log("myAssetWrsList myAssetWrsList myAssetWrsList myAssetWrsList : ", this.myAssetWrsList)
			
            if(!this.myAssetWrsList || !this.myAssetWrsList.length || this.myAssetWrsList.length === 0 )  // || this.myAssetWrsList.length > 6
            {
				this.myAssetWrsList = ['ASAC4001','ASRE4001','ASIV4001','ASPS4001','ASPT4001']
                //commonService.setStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'myAssetWrs', this.myAssetWrsList)
				this.setMyAssetWrs(this.myAssetWrsList)
			}
		}, 
		fn_saveEvent() {
			// 탭 순서 저장
			let tabsId = []
			let tabs   = []
			$('.list_item').each(function() {
				let $this = $(this)
				tabsId.push($this.attr('id'))				
			});

            if(this.myAssetWrsList.length < 1) {
                modalService.alert("주요 변동 내역은 최소 1개는 선택하셔야 합니다.");
                return;
            }	

			// this.tabsList에서 상세 정보 획득
			tabsId.forEach(el => {
				let foundTab = this.tabsList?.find(tab => tab.id === el)
				if (foundTab && tabs.filter(el => el.id === foundTab.id).length === 0) tabs.push(foundTab)
			})

			// localstorage에 등록
			// 메인 탭
			//commonService.setStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'tabsV4', tabs)
			//let tabList = commonService.getStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'tabsV4')
			
			tabs.splice(3,0,{id:'item14', hidden:'N', name: '홈편집'}); // 홈편집은 메인에서 4번째 고정
			this.setMainTabs(tabs);
			let tabList = this.getMainTabs();	
			
			console.log("fn_saveEvent tabs : ", tabList);
			console.log("myAssetWrsList : ", this.myAssetWrsList);
			
			// 자산변동내역
            //commonService.setStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'myAssetWrs', this.myAssetWrsList)
			//let tmpList = commonService.getStorage('main' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'myAssetWrs')
			this.setMyAssetWrs(this.myAssetWrsList);
			let assetWrsist = this.getMyAssetWrs();		
			
			console.log("fn_saveEvent tabs : ", assetWrsist);

			// Close
			this.close({isSave: true})
		},

        // 선택 항목 6개 초과 체크
        chkValidate(e, targetId, _this) {
		
            let tmp = e.target.checked ? 1 : -1; // 1:체크,-1:체크해제
  
            if(this.myAssetWrsList.length + tmp > 5) {
                modalService.alert("주요 변동 내역은 최대 5개까지 선택할 수 있습니다.").then(() => {e.target.checked = false});
                return;
            }
		
            if(tmp === 1) { // 체크한 경우

                if(this.myAssetWrsList.findIndex(el=>el == targetId) < 0) { 
					// 기존 조회된 서비스는 push 안되게 막음
					this.myAssetWrsList.push(targetId)
                }

            } else {
                this.myAssetWrsList.splice(this.myAssetWrsList.findIndex(el=>el == targetId), 1)
            }
        },

		// 페이지 이동
		fn_close() {
			this.close({isSave: false})
		},
	}
}
</script>