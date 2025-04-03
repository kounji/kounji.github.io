<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 농기계임대
* @ 페이지설명 : 농기계임대 메인-맞춤검색(POP)
* @ 파일명     : src/views/page/SZ/FL/SZFL2102/SZFL2102.vue
* @ 작성자     : 
* @ 작성일     : 2021-06-03
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-03              		                최초작성
* 2021-07-14			  CS515897				화면수정
*************************************************************************/
-->
<template>
	<div class="full_popup" id="full_popup_01"> 
		<!--상단(Titley)-->	
		<div class="popup_header">    
			<h1>맞춤검색</h1>
		</div>
		<!--상단(Titley)-->	

		<!--메인(Body)-->	
		<div class="popup_content com_btn_bottom com_bg_type00">
			<div class="com_inner">
				<div class="basic_list_box">
					<ul class="list_type_02">
						<li>
							<a href="javascript:void(0);" v-on:click.prevent="popupSel(1)">
								<div>
									<em>농기계 기종
										<span class="com_point_mint" v-if="wrsnmLength == ''">0</span>
										<span class="com_point_mint" v-else>{{wrsnmLength}}</span>
									</em>
								</div>
							</a>
						</li>
						<li>
							<a href="javascript:void(0);" v-on:click.prevent="popupSel(2)">
								<div>
									<em>대출한도 
										<span class="com_point_mint">{{rangeOutput}}</span>
									</em>
								</div>
							</a>
						</li>
						<li>
							<a href="javascript:void(0);" v-on:click.prevent="popupSel(3)">
								<div>
									<em>업체 
										<span class="com_point_mint"  v-if="spyConmLength == ''">0</span>
										<span class="com_point_mint"  v-else>{{spyConmLength}}</span>
									</em>
								</div>
							</a>
						</li>
					</ul>
				</div>	
			</div>
		</div>		
		<!--메인(Body)-->	

		<!--하단(버튼)-->	
		<div class="popup_footer fixed">
			<div class="btn_half_box">
				<a href="javascript:void(0);" class="btn btn_grey" @click.prevent="reset">취소</a>
				<a href="javascript:void(0);" class="btn btn_mint" v-on:click.prevent="apply">확인</a>
			</div>
		</div>
		<!--하단(버튼)-->	

		<a href="javascript:void(0);" @click.prevent="closePopup" class="btn_close"><span class="blind">팝업닫기</span></a>	
	</div>		
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'

import SZFL2103 from '@/views/page/SZ/FL/SZFL2103/SZFL2103'
import SZFL2104 from '@/views/page/SZ/FL/SZFL2104/SZFL2104'
import SZFL2105 from '@/views/page/SZ/FL/SZFL2105/SZFL2105'

export default {
	name: 'SZFL2102',
	data: () => {
		return {

			//변수 초기화
			wrsnmLength : "",   //선택된 농기계 기종 개수
			wrsnmList   : [],   //선택된 농기계 기종 리스트

			spyConmLength : "", //선택된 업체 개수
			spyConmList   : [], //선택된 업체 리스트

			lnLmtAmFrom : "",   //대출한도에 대한 최솟값
			lnLmtAmTo   : "",   //대출한도에 대한 최댓값
			directInput : false,//대출한도 직접입력 여부
			rangeOutput : ""    //대출한도에 대한 문장출력
		}
	},

	created() {
		this.initComponent()
	},

    mixins: [
            popupMixin,
            commonMixin
	],

	filters : {
		
	},
	
    mounted() {
        this.initComponent()

		//PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },

	methods: {

		initComponent() {
			this.getData()
        },

		getData() {
			this.wrsnmList     = this.params.wrsnmList;   		 //선택된 농기계 기종 리스트
			this.wrsnmLength   = this.params.wrsnmList.length;   //선택된 농기계 기종 개수
			this.spyConmList   = this.params.spyConmList;        //선택된 업체 리스트
			this.spyConmLength = this.params.spyConmList.length; //선택된 업체 개수
			this.lnLmtAmFrom   = this.params.lnLmtAmFrom;   	 //대출한도에 대한 최솟값
			this.lnLmtAmTo     = this.params.lnLmtAmTo;     	 //대출한도에 대한 최댓값
			this.directInput   = this.params.directInput		 //대출한도 직접입력 여부
			this.rangeOutput   = this.rangeSentence(this.lnLmtAmFrom, this.lnLmtAmTo);  //대출한도에 대한 문장출력
		},

		//[닫기]버튼 클릭
		closePopup(){
			this.close("cancel")
		},

		//[초기화]버튼 클릭
		reset(){
			// this.wrsnmList   	= []
			// this.lnLmtAmFrom 	= ""
			// this.lnLmtAmTo   	= ""
			// this.directInput 	= false
			// this.spyConmList 	= []
			// this.rangeOutput 	= ""
			// this.wrsnmLength 	= 0
			// this.spyConmLength 	= 0

			// this.apply()
			this.close("cancel")
		},

		//[확인]버튼 클릭     
		apply() {
			const data = {
				wrsnmList 	: this.wrsnmList,  		//선택된 농기계 기종 리스트
				lnLmtAmFrom : this.lnLmtAmFrom,  	//대출한도에 대한 최솟값
				lnLmtAmTo 	: this.lnLmtAmTo,  		//대출한도에 대한 최댓값
				directInput : this.directInput,	 	//대출한도 직접입력 여부
				spyConmList : this.spyConmList,  	//선택된 업체 리스트
				rangeOutput : this.rangeOutput,
			}
			
			this.close(data)
		},

		//[적용]버튼 클릭시, 원하는 맞춤검색 팝업으로 이동
		popupSel(filterNum) {
			let component;

			if (filterNum == 1){
				component = SZFL2103   //[팝업]농기계 기종 검색
			}
			else if(filterNum == 2){
				component = SZFL2104   //[팝업]대출한도 검색
			} 
			else if(filterNum == 3){
				component = SZFL2105   //[팝업]업체 검색
			}	
			const config = {
				component : component,
				params : {
					wrsnmList   : this.wrsnmList,    //선택된 농기계 기종 리스트
					spyConmList : this.spyConmList,  //선택된 업체 리스트
					lnLmtAmFrom : this.lnLmtAmFrom,  //대출한도에 대한 최솟값
					lnLmtAmTo   : this.lnLmtAmTo,    //대출한도에 대한 최댓값
					directInput : this.directInput,  //직접입력여부
					rangeOutput : this.rangeOutput,
				}
			}	
			modalService.openPopup(config).then(response => {
				if(response == "cancel") return

				if (response.name == "SZFL2103") {  //[팝업]농기계 기종 검색
					
					this.wrsnmList = response.data              //[팝업]농기계 기종검색에서 전달받은 리스트
					this.wrsnmLength = this.wrsnmList.length    //[팝업]농기계 기종검색에서 전달받은 리스트의 갯수

				} else if (response.name == "SZFL2104") { //[팝업]대출한도 검색
					this.lnLmtAmFrom = Number(response.min)
					this.lnLmtAmTo = Number(response.max)
					this.directInput = response.directInput
					this.rangeOutput = this.rangeSentence(this.lnLmtAmFrom, this.lnLmtAmTo);  

				} else if (response.name == "SZFL2105") {  //[팝업]업체 검색
					this.spyConmList = response.data
					this.spyConmLength = this.spyConmList.length
				}  
			})
		}, 

		//대출한도 문장출력
		rangeSentence(from, to){ 
			from = this.numberFormat(String(from));
			to = this.numberFormat(String(to));
			let sentence = "";

			if (to == -1 || to == ""){
				if(from == 0) sentence = ""
				else sentence = from+"만원 이상"
			} else if(from == 0){
				if(to == 0) sentence = ""
				else sentence = to+"만원 미만"
			} else{
				sentence = from+"만원 ~ " + to + "만원 미만"
			}

			return sentence
		},

		//숫자 1000단위마다 쉼표생성
		numberFormat(number){ 
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
		}
	}
}
</script>