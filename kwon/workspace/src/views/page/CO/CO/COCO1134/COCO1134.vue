<!--
/*************************************************************************
* @ 서비스경로 : 메인 > 프로필
* @ 페이지설명 : 메인 > 프로필 > 권유직원 찾기
* @ 파일명     : src/views/page/CO/CO/COCO1134/COCO1134.vue
* @ 작성자     : CS523299
* @ 작성일     : 2021-10-18
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-10-18              CS523299              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>권유직원 찾기</h1>
		</div>
		<div class="popup_content com_bg_type00">
			<div class="com_inner com_line_type01 com_top_type02">
                <strong class="com_pop_tit01">등록하신 권유직원은 변경할 수 없습니다.</strong>
                <p class="com_txtinfo_type01 mt10">서비스 해지 후 1년이 지나면 변경 가능합니다.</p>
			</div>
			<!--권유직원 구분 선택-->
			<ul class="com_radio02_type01 style01 fixed">
				<li>
					<span class="btn_radio02">
						<input type="radio" name="agree" id="radio_name" aria-hidden="true" checked @click="fn_radioCheck('01')">
						<label for="radio_name" role="radio" aria-checked="false">
							<span>성명</span>
						</label>
					</span>
				</li>
				<li>
					<span class="btn_radio02">
						<input type="radio" name="agree" id="radio_eno" aria-hidden="true" @click="fn_radioCheck('02')">
						<label for="radio_eno" role="radio" aria-checked="false">
							<span>사원번호</span>
						</label>
					</span>
				</li>
			</ul>
			<!--//권유직원 구분 선택-->			
			<div class="com_inner com_boxarea_type01">
				<div class="com_input_type02">
					<label for="txt01"></label>
					<input type="search" id="txt01" :value="keyword" ref="keyword" @input="fn_checkWord($event, 10)" placeholder="권유직원 찾기" title="권유직원 찾기" @keyup.enter="searchEmpInfo()">				
					<a href="javascript:void(0);" role="button" @click.prevent="clearText()" class="com_btn_delete" v-if="keyword.length > 0"><span class="blind">삭제</span></a>
					<a href="javascript:void(0);" role="button" @click.prevent="searchEmpInfo()" class="com_btn_search"><span class="blind">검색</span></a>
				</div>
				<template v-if="empList != null">
					<!-- 20211021 한별 수정 S -->
					<div class="search_list_wrap"  v-if="empList.length > 0">
						<ul class="staff_result">
							<li v-for="(item, idx) in empList" :key="idx" :class="(item.eno === selectEno) ? 'select' : '' ">
								<a href="javascript:void(0);" role="button" @click="setEmpInfo(idx)" >
									<dl>
										<dt>{{item.empnm | maskingFilter('name')}}</dt>
										<dd class="num">{{maskingData(item.eno)}}</dd>								
									</dl>
									<p class="branch">{{item.brnm}}</p>
								</a>
							</li>
						</ul>
						<div class="com_btn_area02" v-show="isNextDataYn==='Y'"><a href="javascript:void(0);" role="button" @click="moreNextList()" class="com_btn_more"><span>더보기</span></a></div>					
					</div>
					<!--// 20211021 한별 수정 E -->
					<template v-if="searchShown">
						<div class="no_data_box">
							<div class="no_data_list">
								<p>검색 결과가 없습니다.</p>
							</div>
						</div>
					</template>
				</template>
				<template v-else>
				</template>
			</div>
		</div>
		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" role="button" @click.prevent="fn_closePopup" class="btn btn_mint">확인</a>
			</div>
		</div>
		<a href="javascript:void(0);" role="button" @click.prevent="close" class="btn_close"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
    // import Page from '@/views/layout/Page.vue' 
	import commonMixin from '@/common/mixins/commonMixin'
	import apiService from '@/service/apiService'
	import modalService from '@/service/modalService'
	import {checkWord} from '@/utils/data'
	import popupMixin from '@/common/mixins/popupMixin'

    export default {
		name : "COCO1134",
		data: () => {
			return {
				respInfo 	: {},  		// 응답결과
				empList  	: null,  	// 권유직원 리스트
				empType	 	: "01",		//검색타입 01:성명, 02:사번
				keyword     : "",  		//검색키워드
				// empnm    	: "",  		// 직원명
				pageNo   	: "",  		// 페이지번호
				isSearchYn 	: false,	// 검색전
				isShowInfo 	: true,		// 1년재가입시 권유직원/거래농축협 변경불가능 안내팝업여부
				empObj   	: {},
				selectEno 	: "",
				isNextDataYn: "N",
				searchShown	: false,	// 검색버튼 클릭여부
			}
		},
        mixins: [
			commonMixin,
			popupMixin
		],
        mounted() {
			this.initComponent()
			// PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
		methods: {
			initComponent() {
				this.getData()
			},
			getData() {
				this.pageNo = 1
			},
			hide() {
				this.isShowInfo = false
			},
			fn_checkWord(event, maxByte) {
				let rtnObj = checkWord(event.target.value, maxByte)

				if(rtnObj.flag) {this.$refs.keyword.blur()}   // 알럿 중복 방지
				event.target.value = rtnObj.value
				this.keyword = event.target.value
			},
			searchEmpInfo() {
				if(this.keyword === "") {
					if(this.empType === '01'){
						// 성명검색
						modalService.alert("권유직원을 입력해주세요.","","확인")
						return
					}else{
						// 사번검색
						modalService.alert("사번을 입력해주세요.","","확인")
						return
					}

				}

				this.empList		= []	// 초기화
				this.isNextDataYn	= "N"	// 초기화
				this.pageNo			=  1	// 초기화	

				const config = {
                    url: '/co/as/04r01',
                    data : {
						pageNo  	: this.pageNo,		//페이지번호
						empType 	: this.empType,		//검색타입 01:이름, 02:사번
                        keyword   	: this.keyword,		//검색키워드
                    }
                }
                apiService.call(config).then(response => {

                    this.respInfo = response
					this.empList = this.respInfo.empList || []
					this.isNextDataYn = this.respInfo.nxDataYn
					this.isSearchYn = true

					if(this.empList.length == 0){
						this.searchShown = true
					}else{
						this.searchShown = false
					} 
                })
			},
			// 선택 된 권유직원의 정보를 호출 팝업에 리턴
			fn_closePopup() {

				let rtnParam = {
						invtEmpEno	: this.empObj.eno,	// 권유직원개인번호
						empEno		: this.empObj.empnm,// 권유직원명
						invtBrc		: this.empObj.brc,	// 권유사무소코드
						brnm		: this.empObj.brnm	// 권유사무소이름
					}
				this.close(rtnParam)
			},
			moreNextList() {
				this.pageNo = this.pageNo +1

				const config = {
                    url: '/co/as/04r01',
                    data : {
						pageNo  	: this.pageNo,		//페이지번호
						empType 	: this.empType,		//검색타입 01:이름, 02:사번
                        keyword   	: this.keyword,		//검색키워드
                    }
				}
				
                apiService.call(config).then(response => {

                    this.respInfo = response
					let tmpEmpList = this.respInfo.empList || []
					this.isNextDataYn = this.respInfo.nxDataYn
					if(this.empList.length > 0) {
                        for(let i=0; i< tmpEmpList.length; i++) {
                            this.empList.push(tmpEmpList[i])
                        }
                    } else {
                        this.empList = tmpEmpList
                    }
                })
			},
			clearText() {
                this.keyword = ""
            },
			setEmpInfo(idx) {
				// console.log("idx=", idx)
				this.empObj = this.empList[idx];
				// console.log("this.empObj=", this.empObj)
				this.selectEno = this.empList[idx].eno
			},
			maskingData(sVal) {
				if(sVal && sVal.length >= 2){
					if(sVal.length == 2) {
						return sVal.slice(0,-1) + "*"
					} else {
						var maskText2 = ""
						for(var j=2 ; j<sVal.length-2 ; j++){
							maskText2 += "*"
						}
						return sVal.substr(0,2) + maskText2 + sVal.substr(sVal.length-2);
					}
				} else {
					return;
				}
			},
			fn_radioCheck(flag){
				this.empType = flag		// 01:성명, 02:사번
			}
		},
        components: {      
            // Page
        },
    }
</script>