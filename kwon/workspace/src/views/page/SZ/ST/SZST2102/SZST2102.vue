<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 마이농가설정 > 작목/재배지
* @ 페이지설명 : 작목/재배지 목록
* @ 파일명     : src/views/page/SZ/ST/SZST2102/SZST2102.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-06-21
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-21              CS515729                 최초작성
*************************************************************************/
-->
<template>
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>작목/재배지 관리</h1>			
		</div>

        <div class="popup_content com_no_bottom com_bg_type00">
			<div class="com_inner">
				<div class="btn_r_box" >
					<a v-if="listNum < NUM_ELEVEN" href="javascript:void(0);" title="작목등록" @click="fn_openDetailPop('INSERT')" class="btn_gray">작목 등록</a>
				</div>

				<template v-if="abiCulplList.length > 0">

						<div class="com_box_type01 list_type_box2" v-for="(item, idx) in abiCulplList" :key="idx">
							<ul class="list_type_02">
								<li :key="idx">
									<a href="javascript:void(0);" @click="fn_openDetailPop('MODIFY',item)">
										<dl>
											<dt>
												<div><em>{{item.naWrsSclfnm}}</em></div>  <!--경제통합상품소분류명-->
												<template v-if="item.chkMyFramAreaYn">
													<span>대표 재배지를 등록해 주세요.</span>
												</template>
												<template v-else>
													<div class="depth_list">
														<span>{{item.provnm}}</span>  <!--시도명-->
														<span>{{item.ccwnm}}</span>   <!--군구명-->
														<span>{{item.ttvnm}}</span>   <!--읍면동명-->
													</div>
												</template>
											</dt>
											<dd>
											</dd>
										</dl>
									</a>
								</li>
							</ul>
						</div>

				</template>
				<!--2021/10/22(금) 추가-->
				<p class="com_txtinfo_type01 mt30">
					작목은 최대 10개 까지 등록 가능합니다.<br>
					<span>10개 등록 후 작목 변경을 원하실 경우 해당 작목의 
						상세화면에서 삭제 진행 후 새로 등록하시면 됩니다.</span>
				</p>
				<!--2021/10/22(금) 추가-->
			</div>	
		</div>

        <a href="javascript:void(0);"  class="btn_close" @click="close()"><span class="blind">팝업닫기</span></a>
    </div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
	import commonMixin from '@/common/mixins/commonMixin'
	import apiService from '@/service/apiService'
	import modalService from '@/service/modalService'

	import SZST2105 from '@/views/page/SZ/ST/SZST2105/SZST2105'		//재배지등록

    export default {
		name : "SZST2102",
        data: () => {
            return {
                respInfo      : {}, //응답결과
				abiCulplList  : [], //작목재배지목록
				chkMyFramCd   : "000000000",	//나의농장 비교위한값
				chkMyFramAreaYn   : false, //나의농장 지역설정 존재 여부
				listNum       : 0,
				NUM_ELEVEN    : 11,
				NUM_TEN       : 10,

            }
        },

        mixins: [
            popupMixin,
            commonMixin
		],

        mounted() {
			this.initComponent()
			//PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },

		methods: {
			initComponent() {
				this.getData()
			},

			//**************
			// [조회]
			//***************/
			getData() {
				const config = {
                    url: '/sz/st/02r01',
                    data: {
						"mydtCusno" : this.getUserInfo("mydtCusno")
					}
                }
                apiService.call(config).then(response => {
					this.respInfo = response
					this.abiCulplList = response.abiCulplList || []

					this.listNum = this.abiCulplList.length 

					//*2021.12.03(금) 추가
					//작목목록이 조회된 목록건수는 나의 농장을 포함하여 11건이 나오나, 화면에서는 10건이 나오도록만 보이게 하기 위해서 length값을 -1로 처리~
					if (this.abiCulplList.length >  this.NUM_TEN) {  
						this.abiCulplList.length = this.abiCulplList.length - 1 
					}
					//*2021.12.03(금) 추가

					for(let i=0; i < this.abiCulplList.length; i++) {

						let tmpWrsClc = this.abiCulplList[i].naWrsLclc + ""
										+ this.abiCulplList[i].naWrsMclc + ""
										+ this.abiCulplList[i].naWrsSclc

						//나의농장코드확인
						if(tmpWrsClc === this.chkMyFramCd) {
							let provnm = this.abiCulplList[i].provnm ||""	//최초가입시에는 지역설정이 안되어있음
							let ccwnm  = this.abiCulplList[i].ccwnm	||""	//최초가입시에는 지역설정이 안되어있음
							let ttvnm  = this.abiCulplList[i].ttvnm	||""	//최초가입시에는 지역설정이 안되어있음
							let cnt = provnm.length + ccwnm.length + ttvnm.length
							this.chkMyFramAreaYn = (cnt > 0) ? false : true
						} else {
							this.chkMyFramAreaYn = false
						}
						this.abiCulplList[i].chkMyFramAreaYn = this.chkMyFramAreaYn
					}
				})
			},

			/*
			* [작목/재배지 등록/수정] 슬라이드팝업 호출 
			*/
			fn_openDetailPop(callType, obj) {
				let wrsPathTxt

				if (callType === 'INSERT' ) {
					if (this.listNum  > this.NUM_TEN) {
						modalService.alert("최대 등록가능 개수를 초과 하였습니다.")
						return
					}
				}

				let popParams = obj || {}
				popParams.callType = callType
				
				wrsPathTxt = popParams.naWrsSclfnm
				popParams.wrsPathTxt = wrsPathTxt

				const config = {
					component: SZST2105,
					params : {"objAreaInfo" : popParams}
				}

				modalService.openPopup(config).then(response => {
					if(response.flag === "DONE") {

						this.getData()
					}
				})

			}
		}
    }
</script>