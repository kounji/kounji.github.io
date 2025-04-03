<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 마이농가설정 > 농기계 상각 관리 > 농기계 선택
* @ 페이지설명 : 농기계 선택
* @ 파일명     : src/views/page/SZ/ST/SZST2110/SZST2110.vue
* @ 작성자     : CS523299
* @ 작성일     : 2021-08-19 
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-19              CS523299                 
*************************************************************************/
-->
<template>
	<!-- wrap S -->
	<div class="full_popup" id="full_popup_01"> 
        <!-- header S -->
		<header id="header">
			<h1>농기계 선택</h1>
		</header>
		<!--// header E -->
        <!-- content S -->
		<!-- 20211201 한별 수정 S -->
		<div id="content" class="com_sub">
			<div class="com_inner com_top_type01">
                <div class="com_tabmenu_type03">
                    <ul role="tablist">
                        <li aria-controls="tab_01" :class="this.selItem === '0' ? 'on' : ''"><a href="javascript:void(0);" role="tab" :aria-selected="this.selItem === '0' ? 'true' : 'false'" @click="chngSelItem('0')"><span>농기계 검색</span></a></li>
                        <li aria-controls="tab_02" :class="this.selItem === '1' ? 'on' : ''"><a href="javascript:void(0);" role="tab" :aria-selected="this.selItem === '1' ? 'true' : 'false'" @click="chngSelItem('1')"><span>직접입력</span></a></li>
                    </ul>
                </div>
            </div>
			<div role="tabpanel" id="tab_01" class="cmm-tab-panel on" v-show="acWrs">
				<div class="com_inner com_top_type01">    
					<div class="com_input_type02">
						<label for="txt01"></label>
						<input type="search" id="txt01" class="" name="" value="" v-model="fmachDsnm" placeholder="농기계명을 입력하세요. (예:콤바인)"  title="농기계명을 입력하세요. (예:콤바인)" maxlength="50" @focus="fmachDsnm = ''" @input="fn_checkWord($event, 50)" @keyup="fn_ValidChk" @keyup.enter="getSearchList" ref="fmachDsnm">			
						<a href="javascript:void(0);" role="button" @click.prevent="delteSearchWord" class="com_btn_delete"><span class="blind">삭제</span></a>
						<a href="javascript:void(0);" role="button" @click.prevent="getSearchList" class="com_btn_search"><span class="blind">검색</span></a>
					</div>
				</div>  
				<div class="com_inner">
					<p class="com_txtinfo_type01">검색 된 농기계 항목의 우측 내용년수를 확인 해주세요.</p>
					<template v-if="comnCCn > 0">
						<ul class="com_radio_type01 style01">
							<li v-for="(clfn, clfnIndex) in comnCList" :key="clfnIndex"
								v-on:change.prevent="changeInfoAgree" 
							>
								<div class="btn_radio" v-on:change.prevent="changeInfoAgree" >
									<input type="radio" name="house" :id="'radio_'+clfnIndex"
										:data-fmachDsc="clfn.fmachDsc" 
										:data-fmachDsnm="clfn.fmachDsnm"
										:data-cntnYrcn="clfn.cntnYrcn"
									>
									<label :for="'radio_'+clfnIndex">
										<span>{{clfn.fmachDsnm}}</span>
										<span class="com_icon_num">{{clfn.cntnYrcn}}</span>		
									</label>	
								</div>	
							</li>
						</ul>
					</template>
					<template v-else-if="comnCCn === 0">
						<div class="no_data_box">
							<div class="no_data_list">
								<p>조회된 정보가 없습니다.</p>
							</div>
						</div>
					</template>
					<template v-else>
					</template>
				</div>
			</div>
			<div role="tabpanel" id="tab_02" class="cmm-tab-panel on" v-show="!acWrs">
				<div class="com_inner com_top_type01">
					<div class="com_input_type01 necessary">
						<input type="text" id="com_input01" class="focusforce" name="" value="" required="" placeholder="농기계명을 입력해 주세요."  title="농기계명을 입력해 주세요." maxlength="50" v-model="fmachDsnm_in" ref="fmachDsnm_in_ref" @keyup="fn_checkKrWord">
						<div class="lineEF"></div><!--  20211111 한별 접근성 추가 (title="") -->
						<label for="com_input01"><em><span class="blind">필수입력</span></em><span class="txt_label_x">농기계명</span></label>
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
						</div>
					</div>
				</div>
			</div>
            <!--// 20211201 한별 수정 E -->
			<!--// content E -->

			<!-- footer S -->
			<div class="bottom_box">
				<div class="btn_half_box">
					<a href="javascript:void(0);" role="button" @click.prevent="closePopup" class="btn btn_grey">취소</a>
					<template v-if="acWrs">
						<a href="javascript:void(0);" role="button" @click.prevent="applyOne" class="btn btn_mint" v-show="acWrs">확인</a>
					</template>
					<template v-else> 	
						<a href="javascript:void(0);" role="button" @click.prevent="fn_fmachDsnmChk" class="btn btn_mint" v-show="!acWrs">확인</a>
					</template>
				</div>
			</div>
			<!--// footer E -->
			<a href="javascript:void(0);" role="button" @click.prevent="close()" class="btn_close"><span class="blind">화면닫기</span></a>
		</div>
	</div>
	<!--// wrap E -->		
</template>
<script>
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import {checkWord} from '@/utils/data'
import SZST2114 from '@/views/page/SZ/ST/SZST2114/SZST2114'

export default {
	name: 'SZST2110',
	data: () => {
		return {
			// 변수 초기화
			fmachDsnm 			: "",       // 농기계 상품명
			comnCList  			: [],       // 농기계 검색 결과 리스트
			pageShowYn 			: false,	// 검색 후 내용 show 여부
			isSrch 				: false,	// 검색결과 없을경우 true
			dataList 			: [],		// 농기계 상품명 리스트
			selectedList 		: [],      	// 선택된 농기계 상품명
			wrsnmList 			: [],		// 최종적으로 부모 팝업에 넘겨주는 리스트
			fmachDsc			: "",   	// 농기계구분코드	 
			cntnYrcn	 		: "" ,		// 내용년수	 
			changeInfo			: [],		// 선택 농기계 정보
			chkTot 				: 0,		// 체크된 요소 count
			comnCCn				: null,
			radio_value			: "",
			selItem         	: "0",
			acWrs           	: true,
			fmachDsnm_in		: "",
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
			// 팝업 로드시 전체로 조회(20211122_이성재 차장 요청)
			this.getSearchList()
        },
		// 입력필드에서 값 입력후, '검색'이미지 클릭
		getSearchList() {
			
			// 입력 체크 없애고 전체 조회로 변경(20211122_이성재 차장 요청)
			// if(this.fmachDsnm == "") {// 농기계상품명이 존재하지 않을 경우, 입력요청 메시지 처리
			// 	modalService.alert("검색어를 입력하세요").then(() => {})
			// 	this.$refs.fmachDsnm.blur()
			// 	return
			// }

			// radio 박스 체크 값 초기화 v-model 라디오 체크 상태 완전 초기화 안됨. 
			//this.radio_value = "";

			// radio 버튼 선택 값 초기화
			this.changeInfo = [];

			// radio 박스 체크 값 초기화(체크 상태 완전 초기화)  
			$("input:radio[name='house']").prop('checked', false);

			const config = {
				url : '/sz/st/10r01',
				data : {
					fmachDsnm : this.fmachDsnm,   // (INPUT)농기계상품명 = (변수)농기계상품명
				}
			}

			apiService.call(config).then(response => {
				this.dataList 	= []
				this.comnCCn	= response.comnCCn
				this.comnCList 	= response.comnCList || []
				this.chkTot 	= 0

				if(this.comnCList.length > 0) {
					for(let i = 0; i < this.comnCList.length; i++){
						const data = {
							fmachDsc 	: this.comnCList[i].fmachDsc, 			// 농기계구분코드
							fmachDsnm 	: this.comnCList[i].fmachDsnm, 			// 농기계구분명
							cntnYrcn 	: this.comnCList[i].cntnYrcn, 			// 내용년수
						}
						this.dataList.push(data)
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
		// 입력필드에서 값 입력후, 'X'이미지 클릭
		delteSearchWord(){
			this.fmachDsnm = ""
		},
		// 선택된 농기계 이름과 농기계 분류명을 받아 넣어준다.
		changeInfoAgree(e){

			let obj = e.target;
			let fmachDsc = obj.getAttribute("data-fmachDsc");
			let fmachDsnm = obj.getAttribute("data-fmachDsnm");
			let cntnYrcn = obj.getAttribute("data-cntnYrcn");
			this.changeInfo = []
			this.changeInfo.push({fmachDsc : fmachDsc, fmachDsnm : fmachDsnm, cntnYrcn : cntnYrcn})

		},
		// [닫기]버튼 클릭         
		closePopup() {
			this.close("cancel");
		},
		// [확인]버튼 클릭
		applyOne(){

			if(this.changeInfo.length == 0 && this.acWrs){
				modalService.alert("검색한 농기계를 선택해주세요").then(() => {})
				return;
			}

			const config = {
				component	: SZST2114, // 내용년수 선택
				params 		: this.changeInfo 
			}

			modalService.openPopup(config).then(response => {

				// 취소버튼을 통해 돌아왔을 때(20211018 여기서 값초기화 하면 안됨)
				if(response == "cancel") {
					// this.fmachDsnm	= "";
					// this.cntnYrcn	= "";	
					// this.changeInfo = [];
					return
				}

				this.cntnYrcn = response.cntnYrcn;

				// 직접입력 아닌 경우 
				if(this.acWrs){
					this.changeInfo[0].cntnYrcn = response.cntnYrcn;
				}else{
					this.changeInfo.push({fmachDsc : "", fmachDsnm : this.fmachDsnm_in, cntnYrcn : this.cntnYrcn})
				}

				this.close(this.changeInfo)

			})
		},
		// 입력필드에서 맨 앞 띄어쓰기 제거
        fn_ValidChk() {
            if(this.fmachDsnm.length === 1 && this.fmachDsnm.search(/\s/) === 0) {
                this.fmachDsnm = ""
            }
        },
		// 글자수 체크(검색란)
		fn_checkWord(event, maxByte) {
			let rtnObj = checkWord(event.target.value, maxByte)
            if(rtnObj.flag) {this.$refs.fmachDsnm.blur()}   // 알럿 중복 방지
            event.target.value = rtnObj.value
            this.fmachDsnm = event.target.value
		},
		// 라디오 버튼 변경 이벤트
		chngSelItem(val) {

			// 탭 변경시 초기화
			$("input[name='com_check_N_']").prop("checked", false);
			this.addDataList = [];
			$("input[name='com_check_R_']").prop("checked", false);
			this.delDataList = [];
			this.selItem = val
			if(this.selItem == '0') {	// 농기계 검색 탭 클릭
				this.acWrs	= true
			} else {                 	// 직접입력 탭 클릭
				this.acWrs	= false
				this.$nextTick(() => {
					this.$refs.fmachDsnm_in_ref.focus()
				})
			}
		},
		// 입력항목값 한글 여부 체크(한글로만 입력 제한 제거_20211130 신민철)
		fn_checkKrWord(e){
			// let val = e.target.value;
			// let check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;// 한글체크
			this.fmachDsnm_in = e.target.value 
			// if(check.test(val)){
			// 	this.fmachDsnm_in = e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
			// }else{
			// 	e.target.value = "";
			// 	this.fmachDsnm_in = "";
			// }
		},
		// 농기계명 저장 전 체크 및 저장 처리 호출
		fn_fmachDsnmChk(){

			if(this.fmachDsnm_in.length == 0){
				modalService.alert("농기계명은 필수 입력 항목 입니다.").then(() => {
					this.$nextTick(() => {
						this.$refs.fmachDsnm_in_ref.focus()
					})
				})
				return
			}else{
				const config = {
                    content: ['농기계명은 수정이 불가합니다. 계속 진행 하시겠습니까?'],
                    title  : "",
                }
                modalService.confirm(config).then(text => {
                    if(text == "예") {
						this.changeInfo = []	// 초기화
						this.applyOne()
                    }
                })
			}

		}
	}
}
</script>