<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출분석
* @ 페이지설명 : 지출 > 지출분석 > 정기지출 삭제
* @ 파일명     : src\views\page\LC\IP\LCIP2008\LCIP2008.vue
* @ 작성자     : CS533457
* @ 작성일     : 2023-08-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-10              CS533457              최초작성
*************************************************************************/
-->
<template>
	<!-- 전체 팝업 시작 -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"><!-- 0803 .mydata2023 클래스 이동-->
		<div class="popup_header">
			<h1>정기지출 삭제</h1>
		</div>
		<div class="popup_content com_btn_bottom">
			<div class="com_inner">
				<strong class="titH1">삭제할 지출을 선택하세요</strong>
				<div class="remove_expenditure">
					<div class="custom_list" v-for="(xpsCtgrInfo, idx1) in xpsCtgrList" :key="idx1">
						<div class="custom_box flex_new_tit_area mt0">
							<div class="list_type_box">
								<div class="new_tit_area">
									<div class="tit"><span>{{xpsCtgrInfo.xpsCtgrNm}}</span></div>
								</div>
							</div>	
						</div>

						<ul class="list_type_01">
							<template v-for="(xpsDelInfo, idx2) in xpsDelList">
								<li :key="idx2" v-if="xpsCtgrInfo.xpsCtgrC === xpsDelInfo.xpsCtgrC">
									<div class="ipt_wrap">
										<input type="checkbox" :id="'checkbox'+idx1+'-'+idx2" v-model="selectCtgrList" :value="xpsDelInfo.inqKey+'#'+xpsDelInfo.dataSrcDsc+'#'+xpsDelInfo.mchtnm" @change="fn_delChkItem()">
										<label for="'checkbox'+idx1+'-'+idx2" class="bank_state_che">
											<i :class="'ico_bank ' + xpsDelInfo.orgC"></i>
											<div class="ipt_txt_flex">
												<strong class="bank_name">{{xpsDelInfo.mchtnm}}</strong>
												<p class="price"><span class="num">{{xpsDelInfo.xpsAm | numberFilter}}</span>원</p>
											</div>
										</label>
									</div>
								</li>
							</template>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" role="button" class="btn btn_mint" @click.prevent="deleteXps()"><em>{{chkCnt}}</em>개 정기지출 삭제</a>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import _ from 'lodash'

export default {
    name : "LCIP2008",
    data: () => {
        return {
            res: {},
			cusNb: '',              // 마이데이터고객번호
			basDt: null,            // 조회 기준일자 YYYYMMDD
			xpsDelList : [],        // 삭제목록
			xpsCtgrList : [],       // 카테고리목록
			selectList : [],        // 선택목록
			selectCtgrList : [],    // 선택목록 v-model
			p_inqKey     : '',
			p_dataSrcDsc : '',
			p_prcMchtnm  : '',
			changeList   : [],
        }
    },
    computed : {
		chkCnt() {
			return  this.selectCtgrList.length
		},
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    created() {
        
    },
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent(param) {
			this.cusNb = param.mydtCusno
			this.basDt = param.basDt

			this.getData()
        },
        getData() {
			const config = {
							url: '/lc/ip/08r01', //인터페이스ID: IP-MOB-PFM-LCIP08R01, 서비스코드: PFMLCIP08R01
                data: {
                    "mydtCusno" : this.cusNb,
                    "basDt" : this.basDt
                }
            }
            apiService.call(config).then(response =>{
				this.res = response				
				this.xpsDelList = response.xpsDelList || []
				this.getXpsDelList()
			})
		},
		getXpsDelList() {
			let xpsCtgrList = []
			let xpsDelList = this.xpsDelList
			let flagTrdt = false

			for (let i = 0; i < xpsDelList.length; i++) {
				for(let j = 0; j < xpsCtgrList.length; j++) {
					if (xpsDelList[i].xpsCtgrC == xpsCtgrList[j].xpsCtgrC) {
						flagTrdt = true
						break
					}
					else {
						flagTrdt = false
					}
				}
				if(flagTrdt == false) {
					xpsCtgrList.push({ xpsCtgrC: xpsDelList[i].xpsCtgrC, xpsCtgrNm: xpsDelList[i].xpsCtgrNm})
				}
			}

			this.xpsCtgrList = xpsCtgrList
		},
		fn_delChkItem() {
			let temp = event.target.value.split('#')
			if(event.target.checked) {
				this.selectList.push({inqKey : temp[0], dataSrcDsc : temp[1], mchtnm : temp[2]})
			} 
			else {
				const idx = this.selectList.indexOf(_.find(this.selectList, {"inqKey":temp[0]}))
				this.selectList.splice(idx, 1)
			}
		},
		deleteXps() {
			// 선택 여부 체크
			if(this.selectCtgrList.length == 0){
				modalService.alert("삭제 할 항목을 선택해 주세요.").then(() => {})
				return;
			}

			const configConfirm = {
				content: ['선택한 지출을 삭제하면 앞으로 반복해서 지출해도 자동으로 정기지출로 분류하지 않아요'],
				title  : "",
			}

			modalService.confirm(configConfirm).then(text => {
				if(text == "예") {


					for (let i = 0; i < this.selectList.length; i++)
					{
						this.p_inqKey     = ''
						this.p_dataSrcDsc = ''
						this.p_prcMchtnm  = ''
						
						this.p_inqKey     = this.selectList[i].inqKey
						this.p_dataSrcDsc = this.selectList[i].dataSrcDsc
						this.p_prcMchtnm  = this.selectList[i].mchtnm

						console.log(this.p_inqKey)
						console.log(this.p_dataSrcDsc)
						console.log(this.p_prcMchtnm)

						this.changeList.push({ 

							asetCtgrDsc			: '2' 					,	// 자산카테고리구분코드
							dataSrcDsc			: this.p_dataSrcDsc  	,	// 데이터원천구분코드
							inqKey				: this.p_inqKey 		,	// 조회키

							trPatnnm			: this.p_prcMchtnm 		,	// 거래상대자명
							trDtm				: ''					,	// 거래일시
							tram				: 0 					,	// 거래금액
							trCntn				: this.p_prcMchtnm 		,	// 거래내용
							asetAmnCtgrId		: ''  ,	// 자산관리카테고리ID
							memoCntn			: ''  ,	// 메모내용
							
							myFhsRevAdtYn		: '0' ,	// 마이농가수입추가여부
							myFhsXpsAdtYn		: '0' ,	// 마이농가지출추가여부
							myFhsCtgrid			: ''  ,	// MY농가카테고리ID
							naWrsLclc			: ''  ,	// 경제통합상품대분류코드
							naWrsMclc			: ''  ,	// 경제통합상품중분류코드
							naWrsSclc			: ''  ,	// 경제통합상품소분류코드
							revBrkFtrMveYn		: '0' ,	// 수입내역이체이동여부
							ftrBrkRevMveYn		: '0' ,	// 이체내역수입이동여부
							xpsBrkExpsYn		: '1' , // 지출내역노출여부
							bgtIncdYn			: '1' ,	// 예산포함여부
							xpsBrkFtrMveYn		: '0' ,	// 지출내역이체이동여부
							ftrBrkXpsMveYn		: '0' ,	// 이체내역지출이동여부
							smTrplXpsCtgrChgYn 	: '0' ,	// 동일거래처지출카테고리변경여부
							ctgrSmAplYn         : '0' ,	// 동일거래처지출카테고리변경여부
							prcMchtnm        	: this.p_prcMchtnm,		// 처리가맹점명
							fxtmXpsYn         	: '0',					// 정기지출여부
							ctgrFxtmDsc         : '2',		// 카테고리정기지출구분 1:카테고리, 2:정기지출
						})
					}				

					const config = {
						url : '/lc/fd/03u02', 
						data:	{
							changeListCnt       : this.changeList.length,
							changeList 			: this.changeList,
						}
					}
					
					apiService.call(config).then(response => {

						if(response.rspMsgC == '0000'){
							modalService.alert("선택한 정기지출이 삭제되었습니다.").then(() => {
								// 체크 상태 초기화
                                this.selectCtgrList = []
								this.close('complete')
							});
						} else {
							modalService.alert("삭제 중 오류가 발생하였습니다.").then(() => {
								//this.close(response);
								// 체크 상태 초기화
                                this.selectCtgrList = []
							})
						}
					});
				}
			})
		},
	}
}
</script>