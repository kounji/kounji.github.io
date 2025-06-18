<!--
/*************************************************************************
* @ 서비스경로 : 전체 메뉴 > 서비스해지
* @ 페이지설명 : 전체 메뉴 > 서비스해지 목록
* @ 파일명     : src/views/page/MR/CA/MRCA4001/MRCA4001.vue
* @ 작성자     : CS540685
* @ 작성일     : 2025-04-23
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-04-23             CS540685              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1>서비스 해지</h1>
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<strong class="titH1">{{totalOrgCnt}}개 기관의 정보를 삭제하고<br>서비스를 해지 하시겠어요?</strong>
				<p class="desc">수집된 모든 개인신용정보는 삭제 되고 연결된 기관의<br>자산을 더 이상 가져오지 않습니다.</p>
			</div>
			<div class="com_inner">
				<template v-if="assetList.length > 0">
					<template v-for="(item, idx) in assetList">
						<div v-for="(item1, idx1) in item" :key="`1d_${idx}_${idx1}`" class="com_box_type01 toggle_list_box2 custom_list inBtnType">
							<div data-ui-toggle="box" class="toggle_box_area" :key="`2d_${idx1}`"><!--활성화 class open -->
								<button type="button" class="view_btn" aria-expanded="false">
									<div class="new_tit_area">
										<i :class="`ico_bank ${item1.infOfrmnOrgC}`"><span class="blind">{{item1.orgnm}}</span></i>
										<div class="tit">
											<span>{{item1.orgnm}}</span>
										</div>
									</div>
									<em class="open">열기</em>
									<em class="close">닫기</em>
								</button>
							</div>
							<ul class="view_cont list_type_03" :key="`2d_${idx1}_`">
								<li v-for="(item2, idx2) in item1.wrsList" :key="'wrs_'+idx+'_'+idx1+'_'+idx2">
									<p class="bank_name">{{item2.wrsnm}}</p>
									<!-- 계좌번호(wrsCntn) : 공공업권 제외하고 조회 -->
									<template v-if="item1.orgBzrgC && (item1.orgBzrgC !== 'public')">  
										<p v-for="(item3, idx3) in item2.accList" :key="`${idx3}`" class="bank_num">{{item3.wrsCntn}}</p>
									</template>
								</li>
							</ul>
						</div>
					</template>
				</template>
			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="com_btnhalfbox_type02">
				<a href="javascript:void(0);" role="button" class="btn btn_mint_gray" @click.prevent="close()">취소</a>
				<a href="javascript:void(0);" role="button" class="btn btn_mint" @click.prevent="openSlidePopup()">서비스 해지</a>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>
	import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'
	import modalService from '@/service/modalService'
	import MRCA2002 from '@/views/page/MR/CA/MRCA2002/MRCA2002'
	import MRCA2003 from '@/views/page/MR/CA/MRCA2003/MRCA2003'

    import _ from 'lodash'
	export default {
		name : "MRCA4001",
		data: () => {
			return {
				assetList : []  //연결된 자산목록
			}
		},
		computed: {
			totalOrgCnt() { // 연결기관수 계산
				return this.assetList.reduce((acc, cur) => acc + cur.length, 0)
			}
		},
		mounted() {
			this.initComponent();

			// PFM로그 처리 화면접속이력 등록 POST
			apiService.pfmLogSend(this.$options.name);
		},
		mixins: [
			popupMixin,
			commonMixin
		],
		methods: {
			initComponent() {
				this.getData();
			},
			getData() {
				const config = {
					url: '/co/am/08r02', //'/co/am/05rb2', // 연결기관 조회
					data: {
						"mydtCusno" : this.getUserInfo('mydtCusno')
					}
				};
				apiService.call(config).then(response => {
					this.userAsetList = response.bzrgList || []

					let bankList 	= (typeof _.find(this.userAsetList, {"comnCVal":"bank"}) !== "undefined") 	? _.find(this.userAsetList, {"comnCVal":"bank"}).orgList.map(item => {return {...item ,"orgBzrgC":"bank"}}) : []
					let investList 	= (typeof _.find(this.userAsetList, {"comnCVal":"invest"}) !== "undefined") ? _.find(this.userAsetList, {"comnCVal":"invest"}).orgList.map(item => {return {...item ,"orgBzrgC":"invest"}}) : []
					let cardList 	= (typeof _.find(this.userAsetList, {"comnCVal":"card"}) !== "undefined") 	? _.find(this.userAsetList, {"comnCVal":"card"}).orgList.map(item => {return {...item ,"orgBzrgC":"card"}}) : []
					let insuList	= (typeof _.find(this.userAsetList, {"comnCVal":"insu"}) !== "undefined") 	? _.find(this.userAsetList, {"comnCVal":"insu"}).orgList.map(item => {return {...item ,"orgBzrgC":"insu"}}) : []
					let efinList 	= (typeof _.find(this.userAsetList, {"comnCVal":"efin"}) !== "undefined") 	? _.find(this.userAsetList, {"comnCVal":"efin"}).orgList.map(item => {return {...item ,"orgBzrgC":"efin"}}) : []
					let capitalList = (typeof _.find(this.userAsetList, {"comnCVal":"capital"}) !== "undefined")? _.find(this.userAsetList, {"comnCVal":"capital"}).orgList.map(item => {return {...item ,"orgBzrgC":"capital"}}) : []
					let ginsuList 	= (typeof _.find(this.userAsetList, {"comnCVal":"ginsu"}) !== "undefined") 	? _.find(this.userAsetList, {"comnCVal":"ginsu"}).orgList.map(item => {return {...item ,"orgBzrgC":"ginsu"}}) : []
					let telecomList	= (typeof _.find(this.userAsetList, {"comnCVal":"telecom"}) !== "undefined")? _.find(this.userAsetList, {"comnCVal":"telecom"}).orgList.map(item => {return {...item ,"orgBzrgC":"telecom"}}) : []
					/* 공공업권 구분을 위해 userAsetList에 orgBzrgC 항목 추가 */
					let publicList	= (typeof _.find(this.userAsetList, {"comnCVal":"public"}) !== "undefined")? _.find(this.userAsetList, {"comnCVal":"public"}).orgList.map(item => {return {...item ,"orgBzrgC":"public"}}) : []

					if(bankList.length > 0) this.assetList.push(bankList)
					if(investList.length > 0) this.assetList.push(investList)
					if(cardList.length > 0) this.assetList.push(cardList)
					if(insuList.length > 0) this.assetList.push(insuList)
					if(efinList.length > 0) this.assetList.push(efinList)
					if(capitalList.length > 0) this.assetList.push(capitalList)
					if(ginsuList.length > 0) this.assetList.push(ginsuList)
					if(telecomList.length > 0) this.assetList.push(telecomList)
					if(publicList.length > 0) this.assetList.push(publicList)
				})
			},
			openSlidePopup() {
				const config = {
                    params : {
						mydtCusno    : this.getUserInfo('mydtCusno'), // 고객번호
						tmsBrkDelDsc : "1",  //전송내역삭제구분코드 : "1" 탈회, "2" 철회
						clientId     : this.getUserInfo('svcClientId')
                    },
                    renderer : {
                        component: MRCA2002 // 서비스해지 > 확인 슬라이드 팝업
                    }
                }
                modalService.openSlidePagePopup(config).then(response => { 
					console.log(response)
					if(response === "Y") {
						this.fn_deleteData();
						//this.fn_movePage();
					}
				})
			},
			fn_deleteData() {  
				const config = {
                    url: '/cl/ba/01r01', // '/co/co/02sb3', // 수집데이터 삭제
                    data: {
                        mydtCusno    : this.getUserInfo('mydtCusno'), // 고객번호
                        tmsBrkDelDsc : "1",  //전송내역삭제구분코드 : "1" 탈회, "2" 철회
                        clientId     : this.getUserInfo('svcClientId')
                    }
                }
                apiService.call(config).then(response => {
                    if(response.rsp_code === "00000" || response.rsp_code === "6001" || response.rsp_code === "00001") {
                        //let crmCusno = response.crmCusno
                        this.fn_deletePFMData()
                    }
                })
			},
			fn_deletePFMData() {
                const config = {
                    url: '/mr/ca/01s01', // PFM 삭제
                    data: {
                        mydtCusno : this.getUserInfo('mydtCusno'),  //마데고객번호
                        cusno     : this.getUserInfo('crmCusno')    //CRM고객번호
                    }
                }
                apiService.call(config).then(response => {
                    let rspC = response.rspC;
                    if (rspC  === "0000") {
                        this.fn_movePage()
                    }
                })
			},
			fn_movePage() {
				const config = {
					component : MRCA2003 // 서비스해지 > 완료 팝업
				}
				modalService.openPopup(config)
			}
		}
	}
</script>