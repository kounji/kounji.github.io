<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 농기계임대
* @ 페이지설명 : 농기계임대 메인-맞춤검색-농기계 검색(POP)
* @ 파일명     : src/views/page/SZ/FL/SZFL2103/SZFL2103.vue
* @ 작성자     : 
* @ 작성일     : 2021-06-04
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-04              		                최초작성
* 2021-07-14			  CS515897				화면수정
*************************************************************************/
-->
<template>
	<div class="full_popup" id="full_popup_01"> 
		<!--상단(Titley)-->	
		<div class="popup_header">    
			<h1>농기계 기종 검색</h1>
		</div>
		<!--상단(Titley)-->	

		<!--메인(Body)-->	
		<div class="popup_content com_bg_type00">

			<!--조건 검색(Start)-->	
			<div class="com_inner com_list_type01 com_line_type01 com_top_type02">
				<div class="com_input_type02">
					<label for="txt01"></label>
					<input type="search" id="txt01" placeholder="농기계명을 입력하세요.(예: 경운기)" title="농기계명을 입력하세요.(예: 경운기)" @focus="fmachWrsnm = ''" @keyup="fn_ValidChk, fn_checkWord($event, 50)" @keyup.enter="getSearchList" :value="fmachWrsnm" ref="fmachWrsnm">
					<a href="javascript:void(0);" class="com_btn_delete"  @click.prevent="delteSearchWord"><span class="blind">삭제</span></a>
					<a href="javascript:void(0);" class="com_btn_search"  @click.prevent="getSearchList"><span class="blind">검색</span></a>
				</div>
			</div>
			<!--조건 검색(End)-->	

			<!--조건내용(Start)-->	
			<div class="com_inner com_boxarea_type01" v-if="pageShowYn">
				<!--농기계 분류 First Box(Start)-->	
				<div class="com_box_type01 toggle_list_box2" v-for="(clfn, clfnIndex) in dataList" :key="clfnIndex" > 	
					<!--농기계 분류 부분(Start)-->		
					<div data-ui-toggle="box" class="toggle_box_area" :class="clfn.active ? 'active open' : ''">
						<button type="button" class="view_btn" :aria-expanded="clfn.ariaExpended ? 'true' : 'false'">
							<dl class="tit_list">
								<dt>
									<em>{{clfn.fmachClfnm}}</em>
									<span class="com_icon_num">{{clfn.wrsnmList.length}}</span>
								</dt>
								<dd></dd>
							</dl>
							<em class="open">열기</em>
							<em class="close">닫기</em>
						</button>
					</div>
					<!--농기계 분류 부분(Start)-->		

					<!---농기계상품명 부분(Start)-->
					<ul class="view_cont com_checkbox_type01">
						<li v-for="(wrsnm, widx) in clfn.wrsnmList" :key="widx">
							<input type="checkbox" :id="'wrsnm_'+clfnIndex+'_'+widx" :value="clfn.fmachClfnm+','+wrsnm.fmachWrsnm" :checked="wrsnm.checked" @change="selectFmach(clfnIndex, $event)">
							<label :for="'wrsnm_'+clfnIndex+'_'+widx">
								<span>{{wrsnm.fmachWrsnm}}</span>
							</label>
						</li>
					</ul>
					<!---농기계상품명 부분(End)-->
				</div>
				<!--농기계 분류 First Box(End)-->	
			</div>
			<div class="no_data_box" v-else-if="isSrch">
				<div class="no_data_list">
					<p>검색 결과가 없습니다.</p>
				</div>
			</div>
			<!--조건내용(End)-->	
		</div>
		<!--메인(Body)-->	

		<!--하단(버튼)-->	
		<div class="popup_footer fixed">
			<div class="btn_half_box">
				<a href="javascript:void(0);" class="btn btn_grey" @click.prevent="reset">전체해제</a>
				<a href="javascript:void(0);" class="btn btn_mint" :class="btnOnOff" v-on:click.prevent="applyList($event)">적용</a>
			</div>
		</div>
		<!--하단(버튼)-->	

		<a href="javascript:void(0);" @click.prevent="closePopup" class="btn_close txt_cancel"><span>닫기</span></a>
	</div>
</template>

<script>
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import {checkWord} from '@/utils/data'
import _ from 'lodash'

export default {
	name: 'SZFL2103',
	data: () => {
		return {
			//변수 초기화
			fmachWrsnm 			: "",       // 농기계 상품명
			clfnmList  			: [],       // 농기계 검색 결과 리스트
			pageShowYn 			: false,	// 검색 후 내용 show 여부
			isSrch 				: false,	// 검색결과 없을경우 true
			dataList 			: [],		// 농기계 상품명 리스트
			selectedList 		: [],      	// 선택된 농기계 상품명
			wrsnmList 			: [],		// 최종적으로 부모 팝업에 넘겨주는 리스트

			chkTot : 0,	// 체크된 요소 count
		}
	},

    mixins: [
		commonMixin,
        popupMixin
	],
	
    mounted() {
		this.initComponent()

		//PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
	},

	computed: {
		btnOnOff() {
			return this.chkTot > 0 ? "" : "btn_off"
		}
	},
	
	methods: {
		initComponent() {
			
        },

		//입력필드에서 값 입력후, '검색'이미지 클릭
		getSearchList() {
			this.dataList 	= []

			const config = {
				url : '/sz/fl/03r01',
				data : {
					fmachWrsnm : this.fmachWrsnm,   //(INPUT)농기계상품명 = (변수)농기계상품명
				}
			}
			apiService.call(config).then(response => {
				
				this.clfnmList 	= response.fmachClfnmList || []
				this.chkTot 	= 0

				this.$refs.fmachWrsnm.blur()

				if(this.clfnmList.length > 0) {
					for(let i = 0; i < this.clfnmList.length; i++){
						const data = {
							fmachClfnm 	: this.clfnmList[i].fmachClfnm, 	// 농기계 분류명  fmachClfnmList
							totalLength : this.clfnmList[i].ttcn, 			// 해당 항목의 최대 개수  fmachWrsnmList
							wrsnmList 	: this.clfnmList[i].fmachWrsnmList, // 농기계 리스트
							allChk 		: false,							// 전체선택 플래그
						}
						this.dataList.push(data)
					}
					for(let i=0; i<this.dataList.length; i++) {
						if(i === 0) {
							this.dataList[i].active = true
							this.dataList[i].ariaExpended = true
						} else {
							this.dataList[i].active = false
							this.dataList[i].ariaExpended = false
						}

						for(let j=0; j<this.dataList[i].wrsnmList.length; j++) {
							this.dataList[i].wrsnmList[j].checked = false
							$("#"+'wrsnm_'+i+'_'+j).prop("checked", false)
						}
					}

					this.pageShowYn = true
					this.isSrch = true
					
					this.$nextTick(() => {
						this.callJQueryFncExcute()
					})
				} else {
					this.dataList 		= []
					this.selectedList 	= []
					this.pageShowYn 	= false
					this.isSrch 		= true
				}
			})  
		},

		//입력필드에서 값 입력후, 'X'이미지 클릭
		delteSearchWord(){
			this.fmachWrsnm = ""
		},

		//[전체해제]버튼 클릭
		reset(){
			if(this.dataList.length == 0) return false

			const config = {
				content: ['선택항목을 전체 해제<br>하시겠습니까?'],
                title  : "",
			}
			modalService.confirm(config).then(text => {
				if(text === '예') {
					for(let i=0; i<this.dataList.length; i++) {
						for(let j=0; j<this.dataList[i].wrsnmList.length; j++) {
							this.dataList[i].wrsnmList[j].checked = false
							$("#"+'wrsnm_'+i+'_'+j).prop("checked", false)
						}
					}
					this.chkTot = 0
				}
			})
		}, 

		//선택된 농기계 이름과 농기계 분류명을 받아 넣어준다.
		selectFmach(clfnIndex, e){
			let eVal = e.target.value.split(',')
			let wrsNm = eVal[1]

			if(e.target.checked) {
				let chngVal = _.find(this.dataList[clfnIndex].wrsnmList, {fmachWrsnm : wrsNm})
				if(typeof chngVal != "undefined") {
					if(this.chkTot == 5) {
						modalService.alert("최대 5개까지만 선택가능합니다.")
						e.target.checked = false
						return false
					}
					chngVal.checked = true
					this.chkTot++
				}

			} else {
				const delidx = this.dataList[clfnIndex].wrsnmList.indexOf(_.find(this.dataList[clfnIndex].wrsnmList, {fmachWrsnm : wrsNm}))
				this.dataList[clfnIndex].wrsnmList[delidx].checked = false
				this.chkTot--
			}
		},

		//[닫기]버튼 클릭         
		closePopup() {
			this.close("cancel")
		},

		//[적용]버튼 클릭
		applyList(e){
			if(e.target.className.indexOf("btn_off") != -1) {
				return false
			}

			this.selectedList = []
			for(let i=0; i<this.dataList.length; i++) {
				for(let j=0; j<this.dataList[i].wrsnmList.length; j++) {
					if(!this.dataList[i].wrsnmList[j].checked) continue
					this.selectedList.push({fmachClfnm : this.dataList[i].fmachClfnm, fmachWrsnm : this.dataList[i].wrsnmList[j].fmachWrsnm})
				}
			}

			this.wrsnmList = this.selectedList
			const data = {
				name: 'SZFL2103',
				data: this.wrsnmList    //농기계 리스트
			}
			
			this.close(data)
		},

		// 입력필드에서 맨 앞 띄어쓰기 제거
        fn_ValidChk() {
            if(this.fmachWrsnm.length === 1 && this.fmachWrsnm.search(/\s/) === 0) {
                this.fmachWrsnm = ""
            }
        },

		// 글자수 체크(검색란)
		fn_checkWord(event, maxByte) {
			let rtnObj = checkWord(event.target.value, maxByte)

            if(rtnObj.flag) {this.$refs.fmachWrsnm.blur()}   // 알럿 중복 방지

            event.target.value = rtnObj.value
            this.fmachWrsnm = event.target.value
		}
	}
}
</script>