<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 수입/지출 상세내역 > 수입/지출 카테고리 설정
* @ 페이지설명 : 지출 > 수입/지출 상세내역 > 수입/지출 카테고리 설정
* @ 파일명     : src/views/page/LC/FD/LCFD2004/LCFD2004.vue
* @ 작성자     : CS515901
* @ 작성일     : 2021-06-09
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-09              CS515901              최초작성
* 2023-08-25              CS533457              상호금융 마이데이터 확대 개발 LC\FD\LCFD1104\LCFD1104.vue -> LC\FD\LCFD2004\LCFD2004.vue 변경
*************************************************************************/
-->
<template>
	<div>
		<!-- 슬라이드 팝업 시작 -->
		<div class="dimmed" style="display: block;" @click.prevent="close()"></div>
		<div class="popup_box renewal mydata2023">
			<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
				<div class="popup_header">
					<h1>{{titleAsetCtgrDsc}} 카테고리 설정</h1>
				</div>
				<div class="popup_content com_btn_bottom">
					<div class="com_formarea_type01">
						<ul class="com_slide_check_type03 expenListBox checkType">
							<li v-for="(item, idx) in CategoryList" :key="idx">
								<div class="btn_radio">
									<input type="radio" name="category" :id="'category_'+idx" v-model="selItem" :value="item.asetAmnCtgrId" @click="selectComplete(item)" aria-hidden="false">
									<label :for="'category_'+idx">
										<i :class="'expIcon '+item.asetAmnCtgrId"><span class="blind">{{item.ctgrnm}}</span></i>
										<span>{{item.ctgrnm}}</span>
									</label>
								</div>
							</li>
						</ul>
						<div class="btn_checkbox" v-if="this.asetCtgrDsc == '2'">
							<input type="checkbox" name="check01" id="check01" :checked="smTrplXpsCtgrChgYn == '1'" v-model="smTrplXpsCtgrChgYn">
							<label for="check01">
								<span>이전 지출 내역과 앞으로의 지출에 반영합니다.</span>
							</label>
						</div>
					</div>
				</div>

				<!-- 정기지출 LCIP2005 -->
				<div class="popup_footer" v-if="this.reqPage == 'LCIP2005'">
					<div class="btn_box">
						<a href="javascript:void(0);" class="btn btn_mint" @click="reqSave()">저장</a>
					</div>
				</div>
				<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="">취소</span></a>
			</div>
		</div>
	<!-- 슬라이드 팝업 종료 -->
	</div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'

// import CmmCheckBox from '@/components/CmmCheckBox'
// import LCFD1105 from '@/views/page/LC/FD/LCFD1105/LCFD1105'

export default {
    name : "LCFD2004",
    data: () => {
        return {
			CategoryList : [],  			// 카테고리리스트
			smTrplXpsCtgrChgYn	 : false, 	// 지출 일괄처리여부
			asetCtgrLclc : "",				// 자산카테고리대분류코드 1:지출, 2:마이농가
			asetCtgrDsc	 : "",				// 자산카테고리구분코드   1:수입, 2:지출
			// dataSrcDsc   : "",  			// 데이터원천구분코드
			inqKey       : "",  			// 조회키
			reqPage 	 : "",
			selItem      : "",     			// 선택카테고리
			selectList   : [],     			// 조회키 리스트
			CategoryInfo : [],     			// 선택카테고리정보
			ctgrFxtmDsc  : "",
			p_inqKey     : "",
			p_dataSrcDsc : "",
			p_prcMchtnm  : "",
			changeList   : [],

        }
	},
    props: {
        //   cdata: {
        //     type: Object,
        //     default: () => ({})
        //   },
    },	
    computed: {
		titleAsetCtgrDsc(){
			//asetCtgrLclc 자산카테고리대분류코드 1:지출, 2:마이농가
			//asetCtgrDsc  자산카테고리구분코드   1:수입, 2:지출
			if(this.asetCtgrDsc === "1") {
				return '수입'
			}else if(this.asetCtgrDsc === "2") {
				return '지출'
			}else {
				return ''
			}
		},
        xpsYn() {
			return (this.asetCtgrLclc === "1" && this.asetCtgrDsc === "2" && (this.reqPage==='LCFD2003' || this.reqPage==='LCIP2005')) ? true : false
        }
    },
    mixins: [
        commonMixin,
        popupMixin
	],
    components: {
      //CmmCheckBox,
	},
    mounted() {
		this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },	
    methods: {
        initComponent(param) {
			this.asetCtgrLclc 	= param.asetCtgrLclc  		// 자산카테고리대분류코드   1:지출,    2:마이농가
			this.asetCtgrDsc  	= param.asetCtgrDsc    		// 자산카테고리구분코드     1:수입,    2:지출
			this.ctgrFxtmDsc 	= param.ctgrFxtmDsc      	// 정기지출카테고리구분코드 1:카테고리, 2:정기지출
			this.selectList 	= param.selectList || []  	//inqKey : 조회키
			this.reqPage 		= param.reqPage
			this.selItem 		= param.asetAmnCtgrId
			if(param.smTrplXpsCtgrChgYn === "1") {
				this.smTrplXpsCtgrChgYn = true
			}else{
				this.smTrplXpsCtgrChgYn = false
			}
			
            this.getData()
        },
        getData() {
			const config = {
				url: '/lc/fd/04r01',
				data:	{
					asetCtgrLclc : this.asetCtgrLclc ,	//자산카테고리대분류코드 1:지출, 2:마이농가
					asetCtgrDsc  : this.asetCtgrDsc		//자산카테고리구분코드   1:수입, 2:지출
				}
			}
			apiService.call(config).then(response => {
				console.log(response)
				this.CategoryList = response.CategoryList || []
				
				for(let i=0; i<this.CategoryList.length; i++) {
					let category = this.CategoryList[i]
					if(category.asetAmnCtgrId == this.selItem) {
						this.CategoryInfo = category
					}
				}
			})
		},
		// setSelItem(evt, selItem){
		// 	this.selItem = selItem
		// 	if(this.selItem === "999")
		// 	{
		// 		this.openModalLCFD1105()
		// 	}
		// },
		// delSelItem(evt, selItem){
		// 	this.selItem = selItem
		// 	console.log("delSelItem", selItem)
		// },		
		// openModalLCFD1105() {
		// 		// console.log('------', event)
		// 		const config = {
		// 			component: LCFD1105,
		// 			params: { // 파라미터
		// 						asetCtgrLclc : this.asetCtgrLclc ,	//자산카테고리대분류코드 1:지출, 2:마이농가
		// 						asetCtgrDsc  : this.asetCtgrDsc		//자산카테고리구분코드   1:수입, 2:지출, 3:이체
		// 					}
		// 		}
		// 		//슬라이드팝업에서 풀팝업을 부르기 위한 오류 수정 (필수)
		// 		config.renderer = this.modalConfig.renderer
		// 		modalService.openPopup(config).then(response => {
		// 			console.log("openModalLCFD1105" ,response)
		// 		})
		// },
		selectComplete(item){
			console.log(item)
			this.CategoryInfo = item
			let smTrplXpsCtgrChgYn = "0"

			// 동일적용여부
			if(this.smTrplXpsCtgrChgYn) {
				smTrplXpsCtgrChgYn = "1"
			}
			
			//금융달력 상세
			if(this.reqPage==='LCFD2003' || this.reqPage == 'LCFD2007') {
				const res = {
					asetAmnCtgrId: this.CategoryInfo.asetAmnCtgrId, 
					ctgrnm: this.CategoryInfo.ctgrnm,
					smTrplXpsCtgrChgYn
				}

				this.close(res)
			}
		},
		reqSave(){
			if(this.selItem === ''){
				modalService.alert('카테고리를 선택해주세요.')
				return false
			}
			
			// if(this.dataSrcDsc === '05'){
			// 	if(this.prcMchtnm.trim().length < 1){
			// 		let msg = ""
			// 		if(this.asetCtgrDsc === '1'){
			// 			msg = "수입항목을 입력하세요."
			// 		}else{
			// 			msg = "지출항목을 입력하세요."
			// 		}
			// 		modalService.alert(msg)
			// 		return false
			// 	}
			// }
			// console.log('[LCFD2004]!!!selectList===',this.selectList)

			let smTrplXpsCtgrChgYn = "0"
			if(this.smTrplXpsCtgrChgYn) {
				smTrplXpsCtgrChgYn = "1"
			}
			

			
			if(this.reqPage == 'LCFD2003' || this.reqPage == 'LCFD2007') {
				
				const res = {
					asetAmnCtgrId: this.CategoryInfo.asetAmnCtgrId, 
					ctgrnm: this.CategoryInfo.ctgrnm,
					smTrplXpsCtgrChgYn
				}
				this.close(res)
				
			}else {

				console.log('else #####')
				for (let i = 0; i < this.selectList.length; i++)
				{
					this.p_inqKey     = ''
					this.p_dataSrcDsc = ''
					this.p_prcMchtnm  = ''
					
					this.p_inqKey     = this.selectList[i].inqKey
					this.p_dataSrcDsc = this.selectList[i].dataSrcDsc
					this.p_prcMchtnm  = this.selectList[i].prcMchtnm

					console.log(this.p_inqKey)
					console.log(this.p_dataSrcDsc)
					console.log(this.p_prcMchtnm)

					this.changeList.push({ 

						asetCtgrDsc			: this.asetCtgrDsc 		,	// 자산카테고리구분코드
						dataSrcDsc			: this.p_dataSrcDsc  	,	// 데이터원천구분코드
						inqKey				: this.p_inqKey 		,	// 조회키

						trPatnnm			: this.p_prcMchtnm 		,	// 거래상대자명
						trDtm				: ''					,	// 거래일시
						tram				: 0 					,	// 거래금액
						trCntn				: this.p_prcMchtnm 		,	// 거래내용
						asetAmnCtgrId		: this.CategoryInfo.asetAmnCtgrId 	,	// 자산관리카테고리ID
						memoCntn			: '' 					,	// 메모내용
						
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
						smTrplXpsCtgrChgYn 	: smTrplXpsCtgrChgYn,	// 동일거래처지출카테고리변경여부
						ctgrSmAplYn         : smTrplXpsCtgrChgYn,	// 동일거래처지출카테고리변경여부
						prcMchtnm        	: this.p_prcMchtnm,		// 처리가맹점명
						fxtmXpsYn         	: '',					// 정기지출여부
						ctgrFxtmDsc         : this.ctgrFxtmDsc,		// 카테고리정기지출구분 1:카테고리, 2:카테고리
					})
				}
				
				const config = {
					url : '/lc/fd/03u02', 
					data:	{
						changeListCnt       : this.changeList.length,
						changeList 			: this.changeList,
					}
				}
				console.log(config)
				apiService.call(config).then(response => {
					console.log(response)
					if(response.totPrcCn > 0){
						modalService.alert("등록 완료되었습니다.").then(() => {
							this.close('complete')
						})
					}else{
						modalService.alert("저장 실패하였습니다.")
					}
				})
			}
		},
    }
}
</script>