<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 마이농가설정 > 농기계 상각 관리
* @ 페이지설명 : 농기계 상각 관리
* @ 파일명     : src/views/page/SZ/ST/SZST2108/SZST2108.vue
* @ 작성자     : CS523299
* @ 작성일     : 2021-08-06
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-06             CS523299               최초작성
* 2022-08-19             CS528061	    		
*************************************************************************/
-->
<template>
	<div class="full_popup"> 
		<div class="popup_header">    
			<h1>농기계 상각 관리</h1>	
		</div>
		<div class="popup_content com_no_bottom com_bg_type00">
			<div class="com_inner">
				<template v-if="this.fmachDprcList.length > 0">
					<!--   20210803 한별 수정 적용 S -->
					<div class="com_top_type01 btn_r_box">
						<!-- 2021.07.23 상각등록버튼 옆 타이틀 삭제 -->
						<a href="javascript:void(0);" role="button" class="com_btnround_type04"  @click.prevent="fn_delList()">삭제</a>
						<a href="javascript:void(0);" role="button" @click.prevent="fn_openRegPop()" class="com_btnround_type04">상각 등록</a>
					</div>            
					<!--//   20210803 한별 수정 적용 E -->
					<div class="card_list_box">
						<ul class="list_type_02 expand  chk_expand">
							<!-- 농기계상각목록 처리 -->
							<li v-for="(listObj, idx) in this.fmachDprcList" :key="idx">
								<template v-if="listObj.dpsDt == null || (listObj.dpsDt!== null && listObj.dpsDt.substring(0,4) >= year)">
										<dl v-bind=" itemListAll=''">
											<dt>
												<span class="btn_check">
													<input type="checkbox" name="check_fmachDsnm" :id="'check'+idx" :value="listObj.mydtCusno+','+listObj.sqno" @change.prevent="fn_chkItem()">
													<label :for="'check'+idx">
														<span>{{listObj.fmachDsnm}}</span>
													</label>
												</span>			
												<button type="button" class="btn_move" @click.prevent="fn_openDetailPop(listObj)"><span class="blind">팝업이동</span>
												</button>
											</dt>
											<!-- 제조업체명 -->
											<dd> 
												<span v-show="listObj.mftConm != null">{{listObj.mftConm}}</span>
											</dd>
											<dd>
												<span v-show="listObj.rdmPrd != ''">총 상각기간: {{fn_setNewRdmPrd(listObj.rdmPrd)}}</span>
												<span v-show="listObj.dpsDt != null">처분일자: {{listObj.dpsDt | dateFilter('YY.MM.DD')}}</span>
											</dd>
											<!-- 내용년수(개월) -->
											<dd>
												<span v-show="listObj.cntnYrcn != null">내용년수(개월): {{listObj.cntnYrcn*12}}개월</span>
											</dd>
											<!-- 농기계작목목록 합치는 처리 -->
											<dd v-show="false"><!-- 하단 span 태그로 간격 차이 생기는것 제거 -->
												<span v-for="(listObj2, idx2) in listObj.itemList" :key="'itemList'+idx2" v-show="false">
													<template v-if="listObj2.naWrsSclfnm !='' ? itemListAll += listObj2.naWrsSclfnm+'('+listObj2.ugRto+'%)':itemListAll += ''">
													</template>
												</span>
											</dd>
											<dd class="kind">{{itemListAll}}</dd>
										</dl>
								</template>
							</li>
						</ul>
					</div>
				</template>
				<template v-else>
					<!-- 등록 내역 없을 때 S -->
					<div class="weather_top_default pt0 pr0 pl0">
						<a href="javascript:void(0);" @click="fn_openRegPop()">
							<div class="com_box_type01 mt15">
								<span class="add_btn_ico"></span>
								<strong class="com_box_tit">보유한 농기계의 상각을 등록해 주세요.</strong>
							</div>
						</a>
					</div>
					<!-- // 등록 내역 없을 때 E -->
				</template>
			</div>
		</div>
		<a href="javascript:void(0);" role="button" class="btn_close" @click="close()"><span class="blind">팝업닫기</span></a>
		<!--// content E -->
	</div>
</template>
<script>
	import popupMixin from '@/common/mixins/popupMixin'
	import commonMixin from '@/common/mixins/commonMixin'
	import modalService from '@/service/modalService'
	import apiService from '@/service/apiService'
	import _ from 'lodash'

	// import SZST2109 from '@/views/page/SZ/ST/SZST2109/SZST2109'
	// import SZST2112 from '@/views/page/SZ/ST/SZST2112/SZST2112'
	import ANSZ2008 from '@/views/page/AN/SZ/ANSZ2008/ANSZ2008'
	import ANSZ2007 from '@/views/page/AN/SZ/ANSZ2007/ANSZ2007'

    export default {
		name : "SZST2108",
		data: () => {
            return {
				fmachDprcList	:	[],	// 농기계상각목록 변수 초기화
				year			:	"",
				delDataList		: 	[],	// 리턴용 리스트
			}
		},
		mixins: [
            popupMixin,
            commonMixin
		],
		created() {
			const date	= new Date()
			this.year	= date.getFullYear()	// 현재 년(비교용)
		},
		mounted() {
			this.initComponent()
			// PFM로그 처리 화면접속이력 등록 POST
			apiService.pfmLogSend(this.$options.name)
			},
		methods: {
            initComponent() {
				$("input:checkbox[name='check_fmachDsnm']").prop('checked', false);
				this.delDataList = [];
                this.getData()
            },
            getData() {
				this.getFmachDprcList()
            },// 개인신용정보 전송요구내역 조회
			getFmachDprcList(){
				const config = {
					url: '/sz/st/08ra1',
					data: {
						"mydtCusno" : this.getUserInfo('mydtCusno')
					}
				}

				apiService.call(config).then(response => {
					this.fmachDprcList = response.fmachDprcList || []
				})
			},
            fn_openRegPop() {
				
				$("input:checkbox[name='check_fmachDsnm']").prop('checked', false);
				this.delDataList = [];

                event.target.checked = false
                let compName = ""
                let param = {}
                compName = ANSZ2007
                const config = {
                    component: compName,
                    params : param
				}
				
				modalService.openPopup(config).then((response) => {
                    // if (response.rspC == '0000') {
					if(response == "refresh") {
						// checkbox 박스 체크 값 초기화(체크 상태 완전 초기화)  
						$("input:checkbox[name='check_fmachDsnm']").prop('checked', false);
						this.delDataList = [];
                        this.getData();
					} else if(response == "Agri") {
						$("input:checkbox[name='check_fmachDsnm']").prop('checked', false);
						this.delDataList = [];
						this.getData();
						this.fn_openRegPop();
                    }
                });
			},
            fn_openDetailPop(rlest) {
				$("input:checkbox[name='check_fmachDsnm']").prop('checked', false);
				this.delDataList = [];

                event.target.checked = false
                let compName = ""
				// compName = SZST2112     
				compName = ANSZ2008

                const config = {
                    component: compName,
                    params : rlest
				}
				
				modalService.openPopup(config).then((response) => {
                    if (response.rspC == '0000') {
                        this.getData();
                    }
                });
			},
			fn_setNewRdmPrd(param){
				let rdmPrdNew  = "";
                let arr = [];
                arr = param.split("/");
                if(arr.length > 0){
                    if(arr[0] != "0" && arr[0].length > 0 ){
                        rdmPrdNew = arr[0] + "년" + arr[1] + "개월";
                    }else{
                        rdmPrdNew = arr[1] + "개월";
                    }
				}
				return rdmPrdNew;	
			},
			// 목록 선택
			fn_chkItem() {
				
				let temp = event.target.value.split(',')
				if(event.target.checked) {
					this.delDataList.push({mydtCusno : temp[0], sqno : temp[1]})
				} else {
					const idx = this.delDataList.indexOf(_.find(this.delDataList, {"sqno":temp[1]}))
					
					this.delDataList.splice(idx, 1)
				}

				if(this.delDataList.length === 0 && event.target.checked) {
					modalService.alert("삭제 대상을 선택해주세요.")
					event.target.checked = false
					return false
				}

			},
			// 선택 된 행 삭제
			fn_delList(){

                // 선택 여부 체크
                if(this.delDataList.length == 0){
                    modalService.alert("삭제 할 항목을 선택해 주세요.").then(() => {})
                    return;
                }

                const configYn = {
                    content: ['선택한 항목을 삭제 하시겠습니까?'],
                    title  : "",
                    // 예-아니요 순서 변경을 위해 아래 내용 추가
                    buttons: [
                        {text: "아니오", class: 'btn btn_grey btn_no'}, // 아니오(취소)
                        {text: "예", class: 'btn btn_mint'},            // 예(확인)
                    ]
				}
				
                modalService.alert(configYn).then(text => {
                    if(text === "예") {

                        let successCnt = 0;
                        for(let i=0; i<this.delDataList.length; i++) {

                            const config = {
								url : '/sz/st/12sa1',
								data: {
									mydtCusno   : this.delDataList[i].mydtCusno,	// 마이데이터고객번호
									sqno		: this.delDataList[i].sqno,						// 일련번호
									trDsc		: "3"								// 1:저장, 2:수정, 3:삭제
								}
                            }

                            apiService.call(config).then(response => {
                                // 삭제 성공시
                                if(response.rspC == "0000") {
                                    successCnt++;
                                    if(this.delDataList.length === successCnt){
                                        modalService.alert("삭제되었습니다.").then(() => {
                                            if(this.delDataList.length === successCnt){
                                                // 체크 상태 초기화
                                                this.delDataList = [];
                                            }
										});
										// checkbox 박스 체크 값 초기화(체크 상태 완전 초기화)  
										$("input:checkbox[name='check_fmachDsnm']").prop('checked', false);
										this.delDataList = [];
                                        this.getData()
                                    }
                                }
                            })

                        }

                    }
                })

			}
        }
    }
</script>
