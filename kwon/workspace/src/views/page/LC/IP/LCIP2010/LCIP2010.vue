<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출분석
* @ 페이지설명 : 지출 > 지출분석 > 지출내역에서 정기지출 추가
* @ 파일명     : src\views\page\LC\IP\LCIP2010\LCIP2010.vue
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
			<h1>정기지출 추가</h1>
		</div>
		<div class="popup_content com_btn_bottom">
			<!-- <div class="com_inner" v-if="trDtList.length > 0"> -->
			<div class="com_inner" v-if="showFlagYN == 'Y'">
				<strong class="titH1">추가할 지출을 선택하세요</strong>
				<div class="remove_expenditure">
					<div class="custom_list" v-for="(trDtInfo, idx1) in trDtList" :key="idx1">
						<div class="custom_box flex_new_tit_area mt0">
							<div class="list_type_box">
								<div class="new_tit_area">
									<div class="tit"><span>{{Number(trDtInfo.trDt.substr(4,2))}}월 {{Number(trDtInfo.trDt.substr(6,2))}}일</span></div>
								</div>
							</div>	
						</div>

						<ul class="list_type_01">
							<template v-for="(xpsAddInfo, idx2) in xpsAddList">
								<li :key="idx2" v-if="trDtInfo.trDt === xpsAddInfo.trDt">
									<div class="ipt_wrap">
										<input type="checkbox" :id="'checkbox'+idx1+'-'+idx2" v-model="selectTrDtList" :value="xpsAddInfo.inqKey+'#'+xpsAddInfo.dataSrcDsc+'#'+xpsAddInfo.mchtnm+'#'+xpsAddInfo.xpsCtgrC+'#'+xpsAddInfo.xpsAm" @change="fn_addChkItem()">
										<label for="'checkbox'+idx1+'-'+idx2" class="bank_state_che">
											<i :class="'ico_bank expIcon ' + xpsAddInfo.orgC"></i>
											<div class="ipt_txt_flex">
												<strong class="bank_name">{{xpsAddInfo.mchtnm}}</strong>
												<p class="price"><span class="num">{{xpsAddInfo.xpsAm | numberFilter}}</span>원</p>
											</div>
										</label>
									</div>
								</li>
							</template>
						</ul>
					</div>
				</div>
			</div>
			<div class="com_inner" v-else>
				<!-- 조회내역이 없을경우 S -->
				<div class="no_data_box no_data_box01">
					<div class="no_data_list">
						<p class="titH1">최근 지출 내역이 없어요</p>
					</div>
				</div>
				<!--// 조회내역이 없을경우 E -->
			</div>
		</div>
		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" role="button" class="btn btn_mint" @click.prevent="addXps()"><em>{{chkCnt}}</em>개 정기지출 추가</a>
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
import {dayAdd} from '@/utils/date'

export default {
    name : "LCIP2010",
    data: () => {
        return {
            res: {},
			cusNb: '',              // 마이데이터고객번호
			basDt: null,            // 조회 기준일자 YYYYMMDD
			xpsAddList : [],        // 추가목록
			trDtList : [],          // 거래일자목록
			selectList : [],        // 선택목록
			selectTrDtList : [],    // 선택목록 v-model
			
			p_inqKey     : '',
			p_dataSrcDsc : '',
			p_prcMchtnm  : '',
			p_xpsCtgrC   : '',
			changeList   : [],
			showFlagYN   : '',     // 최근 30일 지출내역이 있으면 'Y'
        }
    },
    computed : {
		chkCnt() {
			return  this.selectTrDtList.length
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
				url: '/lc/ip/10r01', //인터페이스ID: IP-MOB-PFM-LCIP10R01, 서비스코드: PFMLCIP10R01
                data: {
                    "mydtCusno" : this.cusNb,
                    "basDt" : this.basDt
                }
            }
            apiService.call(config).then(response =>{
				this.res = response				
				this.xpsAddList = response.xpsAddList || []
				this.getXpsAddList()
			})
		},
		getXpsAddList() {
			let trDtList = []
			let xpsAddList = this.xpsAddList
			let flagTrdt = false

			for (let i = 0; i < xpsAddList.length; i++) {
				for(let j = 0; j < trDtList.length; j++) {
					if (xpsAddList[i].trDt == trDtList[j].trDt) {
						flagTrdt = true
						break
					}
					else {
						flagTrdt = false
					}
				}
				if(flagTrdt == false) {
					trDtList.push({ trDt: xpsAddList[i].trDt })
				}
			}
			this.trDtList = _.chain(trDtList).orderBy('trDt','desc').value()

			// 최근 30일 지출내역이 있으면 'Y'
			for (let i = 0; i < trDtList.length; i++) {
				if(trDtList[i].trDt >= dayAdd(-30, new Date(), "YYYYMMDD")) {
					this.showFlagYN = 'Y'
					break
				}
			}
			if(this.showFlagYN == '') {
				this.showFlagYN = 'N'
			}
		},
		fn_addChkItem() {
			let temp = event.target.value.split('#')
			if(event.target.checked) {
				this.selectList.push({inqKey : temp[0], dataSrcDsc : temp[1], mchtnm : temp[2], xpsCtgrC : temp[3], xpsAm : temp[4]})
			} 
			else {
				const idx = this.selectList.indexOf(_.find(this.selectList, {"inqKey":temp[0]}))
				this.selectList.splice(idx, 1)
			}
		},
		addXps() {

			// 선택 여부 체크
			if(this.selectTrDtList.length == 0){
				modalService.alert("추가 할 항목을 선택해 주세요.").then(() => {})
				return;
			}

			const configConfirm = {
				content: ['선택한 정기지출을 추가하시겠습니까'],
				title  : "",
			}

			modalService.confirm(configConfirm).then(text => {
				if(text == "예") {
					let changeList = []
					for (let i = 0; i < this.selectList.length; i++)
					{						
						console.log('this.selectList ##### ', this.selectList)
						let inqKey     = ''
						let dataSrcDsc = ''
						let prcMchtnm  = ''
						let xpsCtgrC   = ''
						let xpsAm      = 0
						
						inqKey     	= this.selectList[i].inqKey
						dataSrcDsc 	= this.selectList[i].dataSrcDsc
						prcMchtnm  	= this.selectList[i].mchtnm
						xpsCtgrC   	= this.selectList[i].xpsCtgrC
						xpsAm   	= this.selectList[i].xpsAm
						
						changeList.push({ 

							asetCtgrDsc			: '2' 			,	// 자산카테고리구분코드
							dataSrcDsc			: dataSrcDsc  	,	// 데이터원천구분코드
							inqKey				: inqKey 		,	// 조회키

							trPatnnm			: prcMchtnm 	,	// 거래상대자명
							trDtm				: ''			,	// 거래일시
							tram				: xpsAm			,	// 거래금액
							trCntn				: prcMchtnm 	,	// 거래내용
							asetAmnCtgrId		: xpsCtgrC		,	// 자산관리카테고리ID
							memoCntn			: '' ,	// 메모내용
							
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
							prcMchtnm        	: prcMchtnm		,	// 처리가맹점명
							fxtmXpsYn         	: '1',						// 정기지출여부
							ctgrFxtmDsc         : '2',		// 카테고리정기지출구분 1:카테고리, 2:정기지출
						})
					}				

					const config = {
						url : '/lc/fd/03u02', 
						data:	{
							changeListCnt       : changeList.length,
							changeList 			: changeList,
						}
					}
					
					apiService.call(config).then(response => {

						if(response.rspMsgC == '0000'){
							modalService.alert("선택한 정기지출이 추가되었습니다.").then(() => {
								// 체크 상태 초기화
                                this.selectTrDtList = []
								this.close('complete')
							});
						} else {
							modalService.alert("추가 중 오류가 발생하였습니다.").then(() => {
								//this.close(response);
								// 체크 상태 초기화
                                this.selectTrDtList = []
							})
						}
					});
				}
			})
		},
	}
}
</script>