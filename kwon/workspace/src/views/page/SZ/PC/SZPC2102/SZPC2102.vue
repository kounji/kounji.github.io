<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 정책자금 > 맞춤설정
* @ 페이지설명 : 정책자금 맞춤설정
* @ 파일명     : src/views/page/SZ/PC/SZPC2102/SZPC2102.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-06-08
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-08              CS515897              최초작성
*************************************************************************/
-->

<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>정책자금 맞춤설정</h1>
		</div>
		<div class="popup_content com_bg_type00">
            <div class=" com_line_type01 com_bg_type00 com_top_type01">
                <div class="com_inner">
                    <div class="com_title">
                        <div class="tit mb10">지원분야, 지역, 업종, 기업형태 중 <br/><span class="txt_mint bold">한 개 이상의 항목</span>을 선택하셔야 합니다.                                       
                        </div>
                    </div>
                </div>
            </div> 

            <div class="com_inner com_space_type01 chk_box_area">
				<strong class="com_cont_tit01">지원분야</strong>
				<div class="com_box_type01">
                    <span class="btn_checkbox">
						<input type="checkbox" name="checkall" id="checkall" v-model="sptDvsAllChkYn" @change="chkAll($event, '1')">
						<label for="checkall">
							<span>지원분야 항목 한번에 선택</span>
						</label>
					</span>
                </div>
                <ul class="com_checkbox_type01">
					<li v-for="(item0, idx0) in sptDvsList" :key="'_sptDvs'+idx0">
						<input type="checkbox" :name="'sel0_'+item0.inteKwrdCntn" :id="'sel0_'+item0.inteKwrdCntn" :checked="item0.checked" @change="chgItemValue('1', $event)">
						<label :for="'sel0_'+item0.inteKwrdCntn">
							<span>{{item0.inteKwrdCntnExpl}}</span>
						</label>
					</li>
				</ul>
            </div>

			<div class="com_inner com_space_type01 chk_box_area">
				<strong class="com_cont_tit01">지역</strong>
				<div class="com_box_type01">
                    <span class="btn_checkbox">
						<input type="checkbox" name="checkall2" id="checkall2" v-model="rgnAllChkYn" @change="chkAll($event, '2')">
						<label for="checkall2">
							<span>지역 항목 한번에 선택</span>
						</label>
					</span>
                </div>
                <ul class="com_checkbox_type01">
					<li v-for="(item1, idx1) in rgnList" :key="'rgn_'+idx1">
						<input type="checkbox" :name="'sel1_'+item1.inteKwrdCntn" :id="'sel1_'+item1.inteKwrdCntn" :checked="item1.checked" @change="chgItemValue('2', $event)">
						<label :for="'sel1_'+item1.inteKwrdCntn">
							<span>{{item1.inteKwrdCntnExpl}}</span>
						</label>
					</li>
				</ul>
            </div>

			<div class="com_inner com_space_type01 chk_box_area">
				<strong class="com_cont_tit01">업종</strong>
				<div class="com_box_type01">
                    <span class="btn_checkbox">
						<input type="checkbox" name="checkall3" id="checkall3"  v-model="bzcAllChkYn" @change="chkAll($event, '3')">
						<label for="checkall3">
							<span>업종 항목 한번에 선택</span>
						</label>
					</span>
                </div>
                <ul class="com_checkbox_type01">
					<li v-for="(item2, idx2) in bzcList" :key="'bzc_'+idx2">
						<input type="checkbox" :name="'sel2_'+item2.inteKwrdCntn" :id="'sel2_'+item2.inteKwrdCntn" :checked="item2.checked" @change="chgItemValue('3', $event)">
						<label :for="'sel2_'+item2.inteKwrdCntn">
							<span>{{item2.inteKwrdCntnExpl}}</span>
						</label>
					</li>
				</ul>
            </div>

			<div class="com_inner chk_box_area">
				<strong class="com_cont_tit01">기업형태</strong>
				<div class="com_box_type01">
                    <span class="btn_checkbox">
						<input type="checkbox" name="checkall4" id="checkall4" v-model="coprFormAllChkYn" @change="chkAll($event, '4')">
						<label for="checkall4">
							<span>기업 항목 한번에 선택</span>
						</label>
					</span>
                </div>
                <ul class="com_checkbox_type01">
					<li v-for="(item3, idx3) in coprFormList" :key="'coprForm_'+idx3">
						<input type="checkbox" :name="'sel3_'+item3.inteKwrdCntn" :id="'sel3_'+item3.inteKwrdCntn" :checked="item3.checked" @change="chgItemValue('4', $event)">
						<label :for="'sel3_'+item3.inteKwrdCntn">
							<span>{{item3.inteKwrdCntnExpl}}</span>
						</label>
					</li>
				</ul>
            </div>
		</div>

		<div class="popup_footer fixed">
			<div class="btn_half_box">
				<a href="javascript:void(0);" @click="resetComponent" class="btn btn_grey">전체해제</a>
				<a href="javascript:void(0);" class="btn btn_mint" @click="saveCusInte">저장</a>
			</div>
		</div>

		<a href="javascript:void(0);" @click.prevent="close()" class="btn_close"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'

import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import _ from 'lodash'

export default {
	name : "SZPC2102",
	data : () => {
		return {
			sptDvsList 		: [],	// 지원분야목록
			rgnList 		: [],	// 지역목록
			bzcList 		: [],	// 업종목록
			coprFormList 	: [],	// 기업형태목록

			// 설정 저장 및 이전 설정 불러오기용 리스트
			cusInteKwrdList : [],	// 고객관심키워드목록(저장용)
			cusKwrdViewList : [],	// 고객관심키워드목록(조회용)

			// 화면단 데이터
			sptDvsAllChkYn 		: false,	// 지원분야목록 전체체크여부
			rgnAllChkYn 		: false,	// 지역목록 전체체크여부
			bzcAllChkYn 		: false,	// 업종목록 전체체크여부
			coprFormAllChkYn 	: false,	// 기업형태목록 전체체크여부
			listCheckYn 		: false,	// 리스트 체크 여부(저장 버튼 활성화)

			// 리스트
			listA : [],	// 지원분야 항목 목록
			listB : [],	// 지역 항목 목록
			listC : [],	// 업종 항목 목록
			listD : [],	// 기업형태 항목 목록
		}
	},
	mounted() {
		this.initComponent()

		//PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    methods: {
        initComponent() {
			this.getData()
		},
		getData() {
			// 지원정책자금 설정항목 조회
			const config_1 = {
				url : "/sz/pc/02r01",
				data : {
					cptDsc : '1',
				}
			}
			apiService.call(config_1).then(response => {
				this.sptDvsList 	= response.sptDvsList || []
				this.rgnList 		= response.rgnList || []
				this.bzcList 		= response.bzcList || []
				this.coprFormList 	= response.coprFormList || []
				this.updateList()

				this.getUserData()
			})

			// 전체 체크 여부 초기화
			if(this.cusKwrdViewList.length == 0) {
				this.sptDvsAllChkYn 	= false
				this.rgnAllChkYn 		= false
				this.bzcAllChkYn 		= false
				this.coprFormAllChkYn 	= false
			}
			this.listCheckYn = false
		},
		// 사용자 맞춤 설정정보 조회
		getUserData() {
			// 지원정책자금 설정정보 조회 
			const config_2 = {
				url : "/sz/pc/08r02",
				data : {
					cptDsc 		: '1',
					mydtCusno 	: this.getUserInfo('mydtCusno'),
				}
			}
			apiService.call(config_2).then(response => {
				this.cusKwrdViewList = response.cusIntKwrdList || []
				
				this.listA = this.cusKwrdViewList.filter(d => d.pycpInteKwrdDsc === '01')
				this.sptDvsList = this.setUserItem(this.sptDvsList, this.listA)

				this.listB = this.cusKwrdViewList.filter(d => d.pycpInteKwrdDsc === '02')
				this.rgnList = this.setUserItem(this.rgnList, this.listB)

				this.listC = this.cusKwrdViewList.filter(d => d.pycpInteKwrdDsc === '03')
				this.bzcList = this.setUserItem(this.bzcList, this.listC)

				this.listD = this.cusKwrdViewList.filter(d => d.pycpInteKwrdDsc === '04')
				this.coprFormList = this.setUserItem(this.coprFormList, this.listD)

				this.setChkListAll('')
			})
		},
		// 리스트 후처리
		updateList() {
			// 항목 중 '전체'요소 제거
			let sptDvsTot 	= _.find(this.sptDvsList, {'inteKwrdCntnExpl':'전체'})
			let rgnTot 		= _.find(this.rgnList, {'inteKwrdCntnExpl':'전체'})
			let bzcTot 		= _.find(this.bzcList, {'inteKwrdCntnExpl':'전체'})
			let coprFormTot = _.find(this.coprFormList, {'inteKwrdCntnExpl':'전체'})

			if(typeof sptDvsTot != "undefined") {
				this.sptDvsList.splice(this.sptDvsList.indexOf(sptDvsTot, 1))
			}
			if(typeof rgnTot != "undefined") {
				this.rgnList.splice(this.rgnList.indexOf(rgnTot, 1))
			}
			if(typeof bzcTot != "undefined") {
				this.bzcList.splice(this.bzcList.indexOf(bzcTot, 1))
			}
			if(typeof coprFormTot != "undefined") {
				this.coprFormList.splice(this.coprFormList.indexOf(coprFormTot, 1))
			}

			for(let i=0; i<this.sptDvsList.length; i++) {
				this.sptDvsList[i].pycpInteKwrdDsc = "01"
			}
			for(let j=0; j<this.rgnList.length; j++) {
				this.rgnList[j].pycpInteKwrdDsc = "02"
			}
			for(let k=0; k<this.bzcList.length; k++) {
				this.bzcList[k].pycpInteKwrdDsc = "03"
			}
			for(let l=0; l<this.coprFormList.length; l++) {
				this.coprFormList[l].pycpInteKwrdDsc = "04"
			}
		},
		// 저장된 맞춤설정 항목이 있을경우 checked
		setUserItem(codeList, userList) {
			codeList = _.chain(codeList).map(d => {
				return{
					inteKwrdCntn 		: d.inteKwrdCntn,
					inteKwrdCntnExpl 	: d.inteKwrdCntnExpl,
					pycpInteKwrdDsc 	: d.pycpInteKwrdDsc,
					checked 			: typeof _.find(userList, {'inteKwrdCntn':d.inteKwrdCntn}) !== 'undefined' ? true : false
				}
			}).value()
			
			return codeList
		},
		// 체크박스 항목 개별선택
		chgItemValue(gbn, e) {
			switch(gbn) {
				case '1' :	// 지원분야
					for(let i=0; i<this.sptDvsList.length; i++) {
						if(e.target.id == ('sel0_'+this.sptDvsList[i].inteKwrdCntn)) {
							this.sptDvsList[i].checked = e.target.checked
							break
						}
					}
					this.setChkListAll('')
					break
				case '2' :	// 지역
					for(let i=0; i<this.rgnList.length; i++) {
						if(e.target.id == ('sel1_'+this.rgnList[i].inteKwrdCntn)) {
							this.rgnList[i].checked = e.target.checked
							break
						}
					}
					this.setChkListAll('')
					break
				case '3' :	// 업종
					for(let i=0; i<this.bzcList.length; i++) {
						if(e.target.id == ('sel2_'+this.bzcList[i].inteKwrdCntn)) {
							this.bzcList[i].checked = e.target.checked
							break
						}
					}
					this.setChkListAll('')
					break
				case '4' :	// 기업형태
					for(let i=0; i<this.coprFormList.length; i++) {
						if(e.target.id == ('sel3_'+this.coprFormList[i].inteKwrdCntn)) {
							this.coprFormList[i].checked = e.target.checked
							break
						}
					}
					this.setChkListAll('')
					break
				default :
					break
			}
		}, 
		// 항목 한번에 선택
		chkAll(e, gbn) {
			switch(gbn) {
				case '1' :	// 지원분야
					this.sptDvsAllChkYn = e.target.checked

					for(let i=0; i<this.sptDvsList.length; i++) {
						this.sptDvsList[i].checked = this.sptDvsAllChkYn
						$("#"+this.sptDvsList[i].inteKwrdCntn).prop("checked", this.sptDvsAllChkYn)
					}
					
					this.setChkListAll('A')
					break
				case '2' :	// 지역
					this.rgnAllChkYn = e.target.checked

					for(let i=0; i<this.rgnList.length; i++) {
						this.rgnList[i].checked = this.rgnAllChkYn
						$("#"+this.rgnList[i].inteKwrdCntn).prop("checked", this.rgnAllChkYn)
					}
					this.setChkListAll('A')
					break
				case '3' :	// 업종
					this.bzcAllChkYn = e.target.checked

					for(let i=0; i<this.bzcList.length; i++) {
						this.bzcList[i].checked = this.bzcAllChkYn
						$("#"+this.bzcList[i].inteKwrdCntn).prop("checked", this.bzcAllChkYn)
					}
					this.setChkListAll('A')
					break
				case '4' :	// 기업형태
					this.coprFormAllChkYn = e.target.checked

					for(let i=0; i<this.coprFormList.length; i++) {
						this.coprFormList[i].checked = this.coprFormAllChkYn
						$("#"+this.coprFormList[i].inteKwrdCntn).prop("checked", this.coprFormAllChkYn)
					}
					this.setChkListAll('A')
					break
				default :
					break
			}
		},
		// 전체선택 체크 확인
		setChkListAll(gbn) {
			let sptDvsCnt 	= 0	// 지원분야 항목 선택 개수
			let rgnCnt 		= 0	// 지역 항목 선택 개수
			let bzcCnt 		= 0	// 업종 항목 선택 개수
			let coprFormCnt = 0	// 기업형태 항목 선택 개수
			let ancCnt 		= 0	// 전체 항목 개별 선택 개수

			this.listCheckYn = false

			// 지원분야
			for(let i=0; i<this.sptDvsList.length; i++) {
				if(this.sptDvsList[i].checked == true && this.sptDvsList[i].inteKwrdCntnExpl !== '전체') {
					sptDvsCnt++
				}
			}
			if(gbn == '' || gbn == null) {
				if(this.sptDvsList.length == sptDvsCnt) {
					this.sptDvsAllChkYn = true
				} else {
					this.sptDvsAllChkYn = false
				}
			}

			// 지역
			for(let i=0; i<this.rgnList.length; i++) {
				if(this.rgnList[i].checked == true && this.rgnList[i].inteKwrdCntnExpl !== '전체') {
					rgnCnt++
				}
			}
			if(gbn == '' || gbn == null) {
				if(this.rgnList.length == rgnCnt) {
					this.rgnAllChkYn = true
				} else {
					this.rgnAllChkYn = false
				}
			}

			// 업종
			for(let i=0; i<this.bzcList.length; i++) {
				if(this.bzcList[i].checked == true && this.bzcList[i].inteKwrdCntnExpl !== '전체') {
					bzcCnt++
				}
			}
			if(gbn == '' || gbn == null) {
				if(this.bzcList.length == bzcCnt) {
					this.bzcAllChkYn = true
				} else {
					this.bzcAllChkYn = false
				}
			}

			// 기업형태
			for(let i=0; i<this.coprFormList.length; i++) {
				if(this.coprFormList[i].checked == true && this.coprFormList[i].inteKwrdCntnExpl !== '전체') {
					coprFormCnt++
				}
			}
			if(gbn == '' || gbn == null) {
				if(this.coprFormList.length == coprFormCnt) {
					this.coprFormAllChkYn = true
				} else {
					this.coprFormAllChkYn = false
				}
			}


			ancCnt = sptDvsCnt + rgnCnt + bzcCnt + coprFormCnt
			// 저장 버튼 활성화
			if(ancCnt > 0) {
				this.listCheckYn = true
			}
		},
		// 초기화
		resetComponent() {
			const config = {
				content: ['선택을 전체 해제 하시겠습니까?'],
                title  : "",
			}
			modalService.confirm(config).then(text => {
				if(text === '예') {
					for(let i=0; i<this.sptDvsList.length; i++) {
						this.sptDvsList[i].checked = false
					}
					for(let i=0; i<this.rgnList.length; i++) {
						this.rgnList[i].checked = false
					}
					for(let i=0; i<this.bzcList.length; i++) {
						this.bzcList[i].checked = false
					}
					for(let i=0; i<this.coprFormList.length; i++) {
						this.coprFormList[i].checked = false
					}

					this.sptDvsAllChkYn = false
					this.rgnAllChkYn = false
					this.bzcAllChkYn = false
					this.coprFormAllChkYn = false

					this.listCheckYn = false
				}
			})
		},
		// 정책자금 설정 저장
		saveCusInte() {
			this.setListForSave(this.cusInteKwrdList, this.sptDvsList)
			this.setListForSave(this.cusInteKwrdList, this.rgnList)
			this.setListForSave(this.cusInteKwrdList, this.bzcList)
			this.setListForSave(this.cusInteKwrdList, this.coprFormList)

			const config = {
				url : '/sz/pc/02s01',
				data : {
					cptDsc 			: '1',
					mydtCusno 		: this.getUserInfo('mydtCusno'),
					cusInteKwrdList : this.cusInteKwrdList,
				}
			}
			apiService.call(config).then(response => {
				let rspC = response.rspC;
				let msg  = "";
				rspC == "0000" ? msg = "저장되었습니다." : msg = "저장 중 오류가 발생하였습니다.";
				modalService.alert(msg).then(() => {
					if (rspC == "0000"){
						this.close(rspC)
					}
				});
			})
		},
		// 저장할 배열 설정
		setListForSave(setList, getList) {
			for(let k=0; k<getList.length; k++) {
				if(getList[k].checked == true) {
					setList.push(getList[k])
				}
			}
		}
    },
    components : {
    }
}
</script>