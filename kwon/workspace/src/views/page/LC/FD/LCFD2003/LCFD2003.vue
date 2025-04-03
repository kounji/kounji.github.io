<!--
/*************************************************************************
* @ 서비스경로 : 하단메뉴 > 지출분석 > 금융달력 > 수입/지출 상세내역
* @ 페이지설명 : 하단메뉴 > 지출분석 > 금융달력 > 수입/지출 상세내역
* @ 파일명     : src/views/page/LC/FD/LCFD2003/LCFD2003.vue
* @ 작성자     : CS515901
* @ 작성일     : 2021-05-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-10              CS515901                 최초작성
* 2023-08-10              CS533457                 상호금융 마이데이터 확대 개발 LC\FD\LCFD1103\LCFD1103.vue -> LC\FD\LCFD2003\LCFD2003.vue 변경
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup mydata2023" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>{{asetCtgrTxt}}</h1>
            <a href="javascript:void(0);" class="btn_back" @click.prevent="fn_flagClose()"><span class="blind">이전화면</span></a>
		</div>
        <div class="popup_content com_bg_type00">
			<div class="top_box_wrapper">
				<!-- 수입 -->
				<div class="new_top_box type01" v-if="asetCtgrDsc === '1'">
					<div class="box_head">
						<div class="info">
							<div class="title">
								{{cdcoCdWrsnm}}
								<template v-if="dataSrcDsc === '01'">
									<div class="num">{{fn_maskingformat(mydtAcno, "account")}}</div>
								</template>
								<template v-if="dataSrcDsc === '04'">
									<div class="num">{{fn_maskingformat(faceNo, "account")}}</div>
								</template>
								<template v-if="dataSrcDsc === '05'">
									<div class="num">{{fn_maskingformat(mydtAcno, "account")}}</div>
								</template>

							</div>
						</div>
					</div>
					<div class="box_content">
						<div class="price">
							<div class="won"><span class="num">{{tram | numberFilter}}</span><span>원</span>
							</div>
							<div class="period"><span>{{fn_date(trDt, 'YYYY.MM.DD')}} {{fn_date(trDtm, 'a h시 mm분')}}</span></div>
						</div>
					</div>             
				</div>
				<!-- 지출 -->
				<div class="new_top_box type01" v-if="asetCtgrDsc === '2'">
					<div class="box_head">
						<div class="info">
							<div class="title">
								{{cdcoCdWrsnm}}
								<!-- dataSrcDsc 데이터원천구분코드 01:계좌, 02:카드_국내, 03:카드_해외, 04:선불, 05:수기-->
								<template v-if="dataSrcDsc === '01'">
									<div class="num">{{fn_maskingformat(mydtAcno, "account")}}</div>
									<!-- <div class="num">{{cdcoCdNo}}</div> -->
								</template>
								<template v-if="dataSrcDsc === '02' || dataSrcDsc === '03'">
									<div class="num">{{fn_maskingformat(cdcoCdNo, "card")}}</div>
								</template>
								<template v-if="dataSrcDsc === '04'">
									<div class="num">{{fn_maskingformat(faceNo, "account")}}</div>
								</template>
								<template v-if="dataSrcDsc === '05'">
									<div class="num">{{fn_maskingformat(mydtAcno, "account")}}</div>
								</template>
							</div>
						</div>
					</div>
					<div class="box_content">
						<div class="price">
							<p class="plan gray" v-if="allIstsc > 0">할부 {{allIstsc}}개월</p>
							<div class="won"><span class="num">{{tram | numberFilter}}</span><span>원</span>
							</div>
							<div class="period"><span>{{fn_date(trDt, 'YYYY.MM.DD')}} {{fn_date(trDtm, 'a h시 mm분')}}</span><span v-if="cdPpayStlStsc==='03'">{{cdPpayStlStsCnm}}</span></div>
						</div>
					</div>             
				</div>
				<!--이체-->
				<!-- <div class="new_top_box type01" v-if="asetCtgrDsc === '3'">
					<div class="box_head">
						<div class="info">
							<div class="title">
								{{cdcoCdWrsnm}}
								<div class="num">{{fn_maskingformat(mydtAcno, "account")}}</div>
							</div>
						</div>
					</div>
					<div class="box_content">
						<div class="price">
							<div class="won"><span class="num counter" :data-count="tram">{{tram | numberFilter}}</span><span>원</span>
							</div>
							<div class="period"><span>{{fn_date(trDt, 'YYYY.MM.DD a h시 mm분')}}</span></div>
						</div>
					</div>             
				</div> -->
			</div>
			<!-- <div class="com_inner com_line_type01" v-if="asetCtgrDsc === '3'">
				<dl class="com_setlist_type02" v-if="dpzAcTrTpc === '03'">
					<dt><strong class="com_pop_tit01">수입에 반영</strong></dt>
					<dd>
						<span class="com_btn_switch">
							<input type="checkbox" id="send_check01" @change="showToggle('1')" ref="incomeToggle">
							<label for="send_check01" aria-hidden="true">
								<span class="txt">선택</span>
								<span role="img" class="on">선택</span>
								<span role="img" class="off">해제</span>
							</label>
						</span>

					</dd>
				</dl>
				<dl class="com_setlist_type02" v-if="dpzAcTrTpc === '02'">
					<dt><strong class="com_pop_tit01">지출에 반영</strong></dt>
					<dd>
						<span class="com_btn_switch">
							<input type="checkbox" id="send_check02" @change="showToggle('2')" ref="outcomeToggle">
							<label for="send_check02" aria-hidden="true">
								<span class="txt">선택</span>
								<span role="img" class="on">선택</span>
								<span role="img" class="off">해제</span>
							</label>
						</span>
					</dd>
				</dl>
			</div> -->
			<!-- <div class="com_inner com_bg_type00 com_inputarea_type07" v-if="asetCtgrDsc !== '3' || inShowFlag || outShowFlag">
				<template v-if="asetCtgrDsc === '1' || inShowFlag"> -->
			<div class="com_inner com_bg_type00 com_inputarea_type07" v-if="asetCtgrDsc === '1' || asetCtgrDsc === '2'">
				<template v-if="asetCtgrDsc === '1'">
					<div class="com_btnselectbox_type01">
						<span class="com_iconstar"><span class="blind">필수입력</span><em>카테고리</em></span>
						<button type="button" class="com_btnselect_type01" @click="selectCategory('1')" :aria-label="`${'수입카테고리 선택 '+ ctgrnm}`">
							<span>{{asetAmnCtgrId == '' ? '수입카테고리 선택' : ctgrnm}}</span>
						</button>
					</div>
					<div :class="['com_input_type01 ani-active', dataSrcDsc !== '05' ? 'readonly' : '']" v-if="(prcMchtnm.length>0 && dataSrcDsc !== '05') || dataSrcDsc === '05' || dpzAcTrTpc === '03'">
						<input type="text" id="com_input01" class="" name="" :value="prcMchtnm" required placeholder="수입 내용을 입력하세요."
						title="수입 내용을 입력하세요." maxlength="40" :readonly="dataSrcDsc !=='05'" @keyup="fn_checkWord($event, 40, 'prcMchtnm')" ref="prcMchtnm">
						<label for="com_input01"><em><span class="blind">필수입력</span></em><span class="txt_label_x">수입 내용</span></label>
					</div>
				</template>
				<!-- <template v-if="asetCtgrDsc === '2' || outShowFlag"> -->
				<template v-if="asetCtgrDsc === '2'">
					<div class="com_btnselectbox_type01">
						<span class="com_iconstar"><span class="blind">필수입력</span><em>카테고리</em></span>
						<button type="button" class="com_btnselect_type01" @click="selectCategory('2')" :aria-label="`${'지출카테고리 선택 '+ ctgrnm}`">
							<span>{{asetAmnCtgrId == '' ? '지출카테고리 선택' : ctgrnm}}</span>
						</button>
					</div>					
					<div :class="['com_input_type01', dataSrcDsc !== '05' ? 'readonly' : '']" v-if="(prcMchtnm.length>0 && dataSrcDsc !== '05') || dataSrcDsc === '05' || dpzAcTrTpc === '02'">
						<input type="text" id="com_input02" class="" name="" :value="prcMchtnm" required placeholder="지출 내용을 입력하세요." 
						title="지출 내용을 입력하세요." maxlength="40" :readonly="dataSrcDsc !== '05'" @keyup="fn_checkWord($event, 40, 'prcMchtnm')" ref="prcMchtnm">
						<label for="com_input02"><em><span class="blind">필수입력</span></em><span class="txt_label_x">지출 내용</span></label>
					</div>
				</template>
				<div class="com_textarea_type01">
					<textarea name="" id="txt00" class="com_txtarea_type01" cols="10" rows="5" required placeholder="메모를 입력하세요" :value="memoCntn" maxlength="100" @keyup="fn_checkWord($event, 100, 'memoCntn')" ref="memoCntn"></textarea>
					<label for="txt00"><span class="txt_label_x">메모</span></label>
				</div>
			</div>
			<!-- <div class="com_inner com_bg_type00" v-show="asetCtgrDsc !== '3' || showFlag"> -->
			<div class="com_inner com_bg_type00" v-show="asetCtgrDsc === '1' || asetCtgrDsc === '2'">
				<div class="com_setlist_type01 ani-active">
					<strong class="com_pop_tit01 set">설정</strong>	
					<!-- <dl class="com_line" v-show="asetCtgrDsc === '1' || inShowFlag"> -->
					<dl class="com_line" v-show="asetCtgrDsc === '1'">
						<dt>
							<p>마이농가 수입에 추가</p>
							<span v-if="myFhsCtgrid !== ''">{{myFhsCtgrnm}} > {{naWrsSclfnm}}</span>
						</dt>
						<dd>
							<span class="com_btn_switch">
								<input type="checkbox" id="my_check01" @click="myNongAdd('1')" ref="my_check01" :checked="myFhsYn==='1'" aria-label="마이농가 수입에 추가 선택">
								<label for="my_check01" aria-hidden="true">
									<span class="txt">선택</span>
									<span role="img" class="on">선택</span>
									<span role="img" class="off">해제</span>
								</label>
							</span>
						</dd>
					</dl>
					<dl v-show="asetCtgrDsc === '2'">
						<dt>지출내역에서 숨김</dt>
						<dd>
							<span class="com_btn_switch">
								<input type="checkbox" id="hideMinus" @click="hideMinus()" ref="hideMinus" :checked="xpsBrkExpsYn==='1'?false:true" aria-label="지출내역에서 숨김 선택">
								<label for="hideMinus" aria-hidden="true">
									<span class="txt">선택</span>
									<span role="img" class="on">선택</span>
									<span role="img" class="off">해제</span>
								</label>
							</span>
						</dd>
					</dl>
					<dl v-show="asetCtgrDsc === '2'">
						<dt>지출목표에서 제외</dt>
						<dd>
							<span class="com_btn_switch">
								<input type="checkbox" id="deleteMinus" :checked="bgtIncdYn === '1'?false:true" ref="deleteMinus" aria-label="지출목표에서 제외 선택">
								<label for="deleteMinus" aria-hidden="true">
									<span class="txt">선택</span>
									<span role="img" class="on">선택</span>
									<span role="img" class="off">해제</span>
								</label>
							</span>
						</dd>
					</dl>
					<!-- <dl v-show="asetCtgrDsc === '2' || outShowFlag"> -->
					<dl v-show="asetCtgrDsc === '2'">
						<dt>
							<p>마이농가 지출에 추가</p>
							<span v-if="myFhsCtgrid !== ''">{{myFhsCtgrnm}} > {{naWrsSclfnm}}</span>
						</dt>
						
						<dd>
							<span class="com_btn_switch">
								<input type="checkbox" id="myMinusAdd" @click="myNongAdd('2')" ref="my_check02" :checked="myFhsYn==='1'" aria-label="마이농가 지출에 추가 선택">
								<label for="myMinusAdd" aria-hidden="true">
									<span class="txt">선택</span>
									<span role="img" class="on">선택</span>
									<span role="img" class="off">해제</span>
								</label>
							</span>
						</dd>
					</dl>
				</div>
			</div>
		</div>
		<div class="popup_footer fixed">
			<div class="btn_half_box" v-if="asetCtgrDsc === '1' || asetCtgrDsc === '2'">
				<a href="javascript:void(0);" class="btn btn_grey" v-if="dataSrcDsc === '05'" @click="assetDelete()">삭제</a>
				<a href="javascript:void(0);" class="btn btn_grey" v-else @click="close">취소</a>
				<a href="javascript:void(0);" class="btn btn_mint" @click="reqSave()">저장</a>
			</div>
			<!-- <div class="btn_full_box" v-if="asetCtgrDsc === '3' && inShowFlag"> 
				<a href="javascript:void(0);" @click="incomeSave()" class="btn btn_mint">수입으로 저장</a>
			</div>
			<div class="btn_full_box" v-if="asetCtgrDsc === '3' && outShowFlag">
				<a href="javascript:void(0);" @click="outcomeSave()" class="btn btn_mint">지출로 저장</a>
			</div> -->
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="fn_flagClose()"><span class="blind">팝업닫기</span></a>
	</div>
</template>
<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'

import LCFD2004 from '@/views/page/LC/FD/LCFD2004/LCFD2004'
import LCFD2006 from '@/views/page/LC/FD/LCFD2006/LCFD2006'


import {dateFormat} from '@/utils/date'
import {maskingformat} from '@/utils/data'
import {checkWord} from '@/utils/data'
export default {
    name : "LCFD2003",
    data: () => {
        return {
			asetCtgrTxt		: "",
			// showFlag		: false,
			// inShowFlag	: false,
			// outShowFlag	: false,

			p_asetCtgrDsc		: "",		// 자산카테고리구분코드 1:수입, 2:지출, 3:이체
			p_dataSrcDsc		: "",		// 데이터원천구분코드 01:계좌, 02:카드_국내, 03:카드_해외, 04:선불, 05:수기
			p_inqKey			: "",		// 조회키

			asetCtgrDsc			: "",		// 자산카테고리구분코드 1:수입, 2:지출, 3:이체
			dataSrcDsc			: "",		// 데이터원천구분코드 01:계좌, 02:카드_국내, 03:카드_해외, 04:선불, 05:수기
			dpzAcTrTpc			: "",		// 수신계좌거래유형코드
			trDt				: "",		// 거래일자
			trDtm				: "",		// 거래일시
			prcMchtnm			: "",		// 처리가맹점명
			cdcoCdWrsnm			: "",		// 카드사카드상품명
			tram				: 0,		// 거래금액
			allIstsc			: 0,		// 전체할부회차
			cdcoCdNo			: "",		// 카드사카드번호
			mydtAcno			: "",		// 마이데이터계좌번호
			faceNo				: "",		// 권면번호
			asetAmnCtgrId		: "",		// 자산관리카테고리ID
			ctgrnm				: "",		// 수입지출카테고리명
			memoCntn			: "",		// 메모내용
			myFhsYn				: "",		// MY농가여부
			myFhsCtgrid			: "",		// MY농가카테고리ID	
			naWrsLclc			: "",		// 경제통합상품대분류코드	
			naWrsMclc			: "",		// 경제통합상품중분류코드	
			naWrsSclc			: "",		// 경제통합상품소분류코드	
			xpsBrkExpsYn		: "",		// 지출내역노출여부	
			bgtIncdYn			: "",		// 예산포함여부	
			colCdUgDsc			: "",		// 수입카드사용구분코드	
			myFhsCtgrnm			: "",		// MY농가카테고리명	
			naWrsLclfnm			: "",		// 경제통합상품대분류명	
			naWrsMclfnm			: "",		// 경제통합상품중분류명	
			naWrsSclfnm			: "",		// 경제통합상품소분류명	
			trRefCntn			: "", 		// 거래참고내용


			cdPpayStlStsc		: "",
			cdPpayStlStsCnm		: "",

			smTrplXpsCtgrChgYn 	: "0",	// 같은 지출 카테고리 적용 여부 
			reqFlag 			: "",

			today				: dateFormat(new Date(), "YYYYMMDD"),

			ctgrFxtmDsc			: "1",		// 정기지출카테고리구분코드 1:카테고리, 2:정기지출			
			ctgrSmAplYn			: "", 		// 카테고리동일적용여부
			fxtmXpsYn			: "",		// 정기지출여부
			revXpsInfo 			: [],
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
            this.getData();
        },
        getData() {
			console.log('LCFD2003', this.modalConfig.param)

			// 조회 파라미터 start
			this.p_asetCtgrDsc 	= this.modalConfig.param.paramList.asetCtgrDsc || ""
			this.p_dataSrcDsc  	= this.modalConfig.param.paramList.dataSrcDsc || ""
			this.p_inqKey	   	= this.modalConfig.param.paramList.inqKey || ""
			this.dataSrcDsc    	= this.modalConfig.param.paramList.dataSrcDsc || ""
			// 조회 파라미터 end
			this.reqFlag 		= this.modalConfig.param.paramList.reqFlag || ""
			this.getDetl()
        },
        getDetl(){
            // 금융(수입, 지출, 이체) 상세 조회
            const config = {
                url : '/lc/fd/03r02',
                data : {
					asetCtgrDsc			: this.p_asetCtgrDsc
					, dataSrcDsc		: this.p_dataSrcDsc
					, inqKey			: this.p_inqKey
                }
			}

			apiService.call(config).then(response => {
                console.log('response', JSON.parse(JSON.stringify(response)))
				this.asetCtgrDsc 		= response.asetCtgrDsc || ""
				this.dpzAcTrTpc 		= response.dpzAcTrTpc || ""
				this.trDt 				= response.trDt || ""
				this.trDtm 				= response.trDtm || ""
				this.prcMchtnm 			= response.prcMchtnm || ""
				this.cdcoCdWrsnm 		= response.cdcoCdWrsnm || ""
				this.tram 				= response.tram 
				this.allIstsc			= response.allIstsc 
				this.cdcoCdNo			= response.cdcoCdNo || ""
				this.mydtAcno 			= response.mydtAcno || ""
				this.faceNo 			= response.faceNo || ""
				this.asetAmnCtgrId 		= response.asetAmnCtgrId || ""
				this.ctgrnm 			= response.ctgrnm || ""
				this.memoCntn 			= response.memoCntn || ""
				this.myFhsYn 			= response.myFhsYn || ""
				this.myFhsCtgrid 		= response.myFhsCtgrid || ""
				this.naWrsLclc 			= response.naWrsLclc || ""
				this.naWrsMclc 			= response.naWrsMclc || ""
				this.naWrsSclc 			= response.naWrsSclc || ""
				this.xpsBrkExpsYn 		= response.xpsBrkExpsYn || ""
				this.bgtIncdYn 			= response.bgtIncdYn || ""
				this.colCdUgDsc 		= response.colCdUgDsc || ""
				this.myFhsCtgrnm 		= response.myFhsCtgrnm || ""
				this.naWrsLclfnm 		= response.naWrsLclfnm || ""
				this.naWrsMclfnm 		= response.naWrsMclfnm || ""
				this.naWrsSclfnm 		= response.naWrsSclfnm || ""
				this.trRefCntn			= response.trRefCntn || ""
				this.cdPpayStlStsc		= response.cdPpayStlStsc || ''
				this.cdPpayStlStsCnm	= response.cdPpayStlStsCnm || ''

				if(this.asetCtgrDsc === '1'){
					this.asetCtgrTxt = "수입 상세내역"
				}else if(this.asetCtgrDsc === '2'){
					this.asetCtgrTxt = "지출 상세내역"
				}
				// else{
				// 	this.asetCtgrTxt = "이체 상세내역"
				// }
			}).then(()=>{
				this.callJQueryFncExcute()
			})
            
		},
		// 글자수 체크
		fn_checkWord(event, maxByte, str) {
			let rtnObj = checkWord(event.target.value, maxByte)

			if(str == 'prcMchtnm') {

				if(rtnObj.flag) {this.$refs.prcMchtnm.blur()}   // 알럿 중복 방지
				event.target.value = rtnObj.value
				this.prcMchtnm = event.target.value
			} else if(str == 'memoCntn') {

				if(rtnObj.flag) {this.$refs.memoCntn.blur()}   // 알럿 중복 방지
				event.target.value = rtnObj.value
				this.memoCntn = event.target.value
			}
		},
        // showToggle(flag){
		// 	if(flag === '1'){
		// 		if(this.$refs['incomeToggle'].checked){
		// 			console.log('수입 체크')
		// 			this.showFlag = true
		// 			this.inShowFlag = true
		// 		}else{
		// 			console.log('수입 비체크')
		// 			this.showFlag = false
		// 			this.inShowFlag = false
		// 		}
		// 	}else{
		// 		if(this.$refs['outcomeToggle'].checked){
		// 			this.showFlag = true
		// 			this.outShowFlag = true
		// 		}else{
		// 			this.showFlag = false
		// 			this.outShowFlag = false
		// 		}				
		// 	}
		// },
		selectCategory(flag){
			const config = {
				params: { // 파라미터
                        title 		  : "자산카테고리",
                        asetCtgrLclc  : "1" ,		//자산카테고리대분류코드 1:지출, 2:마이농가
						asetCtgrDsc   : flag,		//자산카테고리구분코드   1:수입, 2:지출, 3:이체
                        asetAmnCtgrId : this.asetAmnCtgrId,
                        smTrplXpsCtgrChgYn: this.smTrplXpsCtgrChgYn,
						reqPage      : 'LCFD2003'
				},
				renderer: {
					component: LCFD2004
				}
			}

			modalService.openSlidePagePopup(config).then(response => {
				console.log('카테고리 팝업 다녀온 후 .', response)
				this.asetAmnCtgrId = response.asetAmnCtgrId
				this.ctgrnm = response.ctgrnm
				this.smTrplXpsCtgrChgYn = response.smTrplXpsCtgrChgYn
			})
		},
		reqSave(){
			if(this.asetAmnCtgrId === ''){
				modalService.alert('카테고리를 선택해주세요.')
				return false
			}
			if(this.dataSrcDsc === '05'){
				if(this.prcMchtnm.trim().length < 1){
					let msg = ""
					if(this.asetCtgrDsc === '1'){
						msg = "수입항목을 입력하세요."
					}else{
						msg = "지출항목을 입력하세요."
					}
					modalService.alert(msg)
					return false
				}
			}

			let data = {}
			if(this.asetCtgrDsc === '1'){
				// 수입			
				data = {
					asetCtgrDsc		: this.asetCtgrDsc ,	// 자산카테고리구분코드
					dataSrcDsc		: this.dataSrcDsc ,		// 데이터원천구분코드
					inqKey			: this.p_inqKey ,		// 조회키

					trPatnnm		: this.prcMchtnm ,	// 거래상대자명
					trDtm			: this.trDtm ,	// 거래일시
					tram			: this.tram ,	// 거래금액
					trCntn			: this.prcMchtnm ,	// 거래내용
					asetAmnCtgrId	: this.asetAmnCtgrId ,	// 자산관리카테고리ID
					memoCntn		: this.memoCntn ,	// 메모내용
					
					myFhsRevAdtYn	: this.asetCtgrDsc === '1'?this.myFhsYn : '0' ,	// 마이농가수입추가여부
					myFhsXpsAdtYn	: this.asetCtgrDsc === '2'?this.myFhsYn : '0' ,	// 마이농가지출추가여부
					myFhsCtgrid		: this.myFhsCtgrid ,	// MY농가카테고리ID
					naWrsLclc		: this.naWrsLclc ,	// 경제통합상품대분류코드
					naWrsMclc		: this.naWrsMclc ,	// 경제통합상품중분류코드
					naWrsSclc		: this.naWrsSclc ,	// 경제통합상품소분류코드
					// revBrkFtrMveYn	: (this.dpzAcTrTpc === '03'?(this.$refs['imcomeMove'].checked?"0":"1"):"0")	 ,	// 수입내역이체이동여부
					// ftrBrkRevMveYn	: (this.dpzAcTrTpc === '03'?(this.$refs['imcomeMove'].checked?"1":"0"):"0")	 ,	// 이체내역수입이동여부
					revBrkFtrMveYn	: "0"	 ,	// 수입내역이체이동여부
					ftrBrkRevMveYn	: "0"	 ,	// 이체내역수입이동여부
					xpsBrkExpsYn	: "1",		// 지출내역노출여부
					bgtIncdYn		: "1" ,		// 예산포함여부
					xpsBrkFtrMveYn	: "0" ,		// 지출내역이체이동여부
					ftrBrkXpsMveYn	: "0" ,		// 이체내역지출이동여부
					smTrplXpsCtgrChgYn : "0",	// 동일거래처지출카테고리변경여부

					ctgrSmAplYn     : "0",	// 동일거래처지출카테고리변경여부
					prcMchtnm       : this.prcMchtnm,		// 처리가맹점명
					fxtmXpsYn       : '',					// 정기지출여부
					ctgrFxtmDsc     : this.ctgrFxtmDsc,		// 카테고리정기지출구분	  1:카테고리, 2:정기지출	
					// dpzAcTrTpc 02출금 03 입금
				}
			}else if(this.asetCtgrDsc === '2'){
				// 지출
				data = {
					asetCtgrDsc		: this.asetCtgrDsc ,	// 자산카테고리구분코드
					dataSrcDsc		: this.dataSrcDsc ,		// 데이터원천구분코드
					inqKey			: this.p_inqKey , 		// 조회키

					trPatnnm		: this.prcMchtnm ,	// 거래상대자명
					trDtm			: this.trDtm ,	// 거래일시
					tram			: this.tram ,	// 거래금액
					trCntn			: this.prcMchtnm ,	// 거래내용
					asetAmnCtgrId	: this.asetAmnCtgrId ,	// 자산관리카테고리ID
					memoCntn		: this.memoCntn ,	// 메모내용
					
					myFhsRevAdtYn	: this.asetCtgrDsc === '1'?this.myFhsYn : '0' ,	// 마이농가수입추가여부
					myFhsXpsAdtYn	: this.asetCtgrDsc === '2'?this.myFhsYn : '0' ,	// 마이농가지출추가여부
					myFhsCtgrid		: this.myFhsCtgrid ,	// MY농가카테고리ID
					naWrsLclc		: this.naWrsLclc ,	// 경제통합상품대분류코드
					naWrsMclc		: this.naWrsMclc ,	// 경제통합상품중분류코드
					naWrsSclc		: this.naWrsSclc ,	// 경제통합상품소분류코드
					revBrkFtrMveYn	: "0" ,	// 수입내역이체이동여부
					ftrBrkRevMveYn	: "0"	 ,	// 이체내역수입이동여부
					xpsBrkExpsYn	: this.$refs['hideMinus'].checked?"0":"1",			// 지출내역노출여부
					bgtIncdYn		: this.$refs['deleteMinus'].checked?"0":"1" ,		// 예산포함여부
					// xpsBrkFtrMveYn	: (this.dpzAcTrTpc === '02'?(this.$refs['minusMove'].checked?"0":"1"):"0") ,		// 지출내역이체이동여부
					// ftrBrkXpsMveYn	: (this.dpzAcTrTpc === '02'?(this.$refs['minusMove'].checked?"1":"0"):"0") ,		// 이체내역지출이동여부
					xpsBrkFtrMveYn	: "0" ,		// 지출내역이체이동여부
					ftrBrkXpsMveYn	: "0" ,		// 이체내역지출이동여부
					smTrplXpsCtgrChgYn : this.smTrplXpsCtgrChgYn,	// 동일거래처지출카테고리변경여부

					ctgrSmAplYn     : this.smTrplXpsCtgrChgYn,	// 동일거래처지출카테고리변경여부
					prcMchtnm       : this.prcMchtnm,		// 처리가맹점명
					fxtmXpsYn       : '',					// 정기지출여부
					ctgrFxtmDsc     : this.ctgrFxtmDsc,		// 카테고리정기지출구분	  1:카테고리, 2:정기지출					

				}
			}
			this.revXpsInfo.push(data)
			const config = {
				url : '/lc/fd/03u02',
				data : {
					changeCnt 	: this.revXpsInfo.length,
					changeList  : this.revXpsInfo,
				}
			}
			console.log(config)
			apiService.call(config).then(response => {
				console.log(response)
				if(response.totPrcCn > 0){
					modalService.alert("등록 완료되었습니다.").then(() => {
						// this.closeAllData('complete')
						this.close('complete')
						// if(this.reqFlag === 'LCLE1104'){
						// 	this.close('complete')
						// }else{
						// 	this.closeAllData('complete')
						// }
					})
				}else{
					modalService.alert("저장 실패하였습니다.")
				}
			})
		},
		fn_date(dates, format){
			return dateFormat(dates, format).replace("am", "오전").replace("pm", "오후")
		},
		fn_maskingformat(str, flag){
			return maskingformat(str, flag)
		},
		myNongAdd(flag){
			if(this.trDt > this.today){
				let msg = ""
				if(this.asetCtgrDsc === '1'){
					msg = "당일 이후로 등록한 수입내역은 마이농가에 추가할 수 없습니다."
				}else{
					msg = "당일 이후로 등록한 지출내역은 마이농가에 추가할 수 없습니다."
				}
				modalService.alert(msg)
				this.$refs['my_check0'+flag].checked = false
				this.myFhsYn = "0"
				this.myFhsCtgrid = ""
				this.myFhsCtgrnm = ""
				this.naWrsLclc = ""
				this.naWrsMclc = ""
				this.naWrsSclc = ""
				this.naWrsSclfnm = ""
				return false
			}
			if(this.$refs['my_check0'+flag].checked){
				this.$refs['my_check0'+flag].checked = false
				// 체크 상황 마이농가 수입에 추가 팝업 호출
				const config = {
					params: { // 파라미터
						title 		 : "마이농가 수입에 추가",
					},
					renderer: {
						component: LCFD2006,
						cdata    : {
							title 		 : "마이농가 수입에 추가",
							asetCtgrLclc : "2" ,	//자산카테고리대분류코드 1:지출, 2:마이농가
							asetCtgrDsc  : flag		//자산카테고리구분코드   1:수입, 2:지출, 3:이체
						}
					}
				}

				modalService.openSlidePagePopup(config).then(response => {
					console.log(response)
					if(response === 'close'){
						this.$refs['my_check0'+flag].checked = false
					}else{
						this.$refs['my_check0'+flag].checked = true
						this.myFhsYn = '1'
						this.myFhsCtgrid = response.myCategory.asetAmnCtgrId
						this.myFhsCtgrnm = response.myCategory.ctgrnm
						this.naWrsLclc = response.myAbi.naWrsLclc
						this.naWrsMclc = response.myAbi.naWrsMclc
						this.naWrsSclc = response.myAbi.naWrsSclc
						this.naWrsSclfnm = response.myAbi.naWrsSclfnm
					}

				})
			}else{
				// 비 체크 상황
				this.myFhsYn = "0"
				this.myFhsCtgrid = ""
				this.myFhsCtgrnm = ""
				this.naWrsLclc = ""
				this.naWrsMclc = ""
				this.naWrsSclc = ""
				this.naWrsSclfnm = ""
			}
		},
		hideMinus(){
			// 지출 내역에서 숨김
			if(this.$refs['hideMinus'].checked){
				modalService.alert("지출내역에서 숨기기 해제를 원할 경우 전체메뉴에서 '숨김 내역 보관함'을 이용하세요")
			}else{
				// 
			}
		},
		assetDelete(){
			const config = {
				content : ['해당 내역을 삭제하시곘습니까?'],
				title : "",
			}
            modalService.confirm(config).then(text => {
                if(text == "예") {
					// 삭제 서비스 아직 미정.
					let d_inqkey = JSON.parse(this.p_inqKey) 
					let d_trdt = d_inqkey.trDt
					let d_sqno = d_inqkey.sqno
					const config = {
						url : '/lc/fd/08s01',
						data : {
							mydtCusno : this.getUserInfo('mydtCusno'),
							trDt : d_trdt,
							sqno : d_sqno
						}
					}
					apiService.call(config).then(response => {
						if(response.totPrcCn > 0){
							modalService.alert("삭제 완료되었습니다.").then(() => {
								console.log('삭제 완료 콘솔')
								if(this.reqFlag === 'LCLE2104'){
									this.close('complete')
								}else{
									this.closeAllData('complete')
								}
							})
						}else{
							modalService.alert("삭제시 오류가 발생하였습니다.")
						}
					})
                }
            })
		},
		incomeSave(){
			// 수입으로 저장.
			if(this.asetAmnCtgrId === ''){
				modalService.alert('카테고리를 선택해주세요.')
				return false
			}
			if(this.dataSrcDsc === '05'){
				if(this.prcMchtnm.trim().length < 1){
					modalService.alert("수입항목을 입력하세요.")
					return false
				}
			}

            const config = {
                url : '/lc/fd/03u01',
                data : {
					asetCtgrDsc		: this.asetCtgrDsc ,	// 자산카테고리구분코드
					dataSrcDsc		: this.dataSrcDsc ,		// 데이터원천구분코드
					inqKey			: this.p_inqKey , 		// 조회키

					trPatnnm		: this.prcMchtnm ,	// 거래상대자명
					trDtm			: this.trDtm ,	// 거래일시
					tram			: this.tram ,	// 거래금액
					trCntn			: this.prcMchtnm ,	// 거래내용
					asetAmnCtgrId	: this.asetAmnCtgrId ,	// 자산관리카테고리ID
					memoCntn		: this.memoCntn ,	// 메모내용
					
					myFhsRevAdtYn	: this.myFhsYn ,								// 마이농가수입추가여부
					myFhsXpsAdtYn	: "0" ,											// 마이농가지출추가여부
					myFhsCtgrid		: this.myFhsCtgrid ,							// MY농가카테고리ID
					naWrsLclc		: this.naWrsLclc ,								// 경제통합상품대분류코드
					naWrsMclc		: this.naWrsMclc ,								// 경제통합상품중분류코드
					naWrsSclc		: this.naWrsSclc ,								// 경제통합상품소분류코드
					xpsBrkExpsYn	: "1" ,											// 지출내역노출여부
					bgtIncdYn		: "1" ,											// 예산포함여부
					revBrkFtrMveYn	: "0" ,											// 수입내역이체이동여부
					xpsBrkFtrMveYn	: "0" ,											// 지출내역이체이동여부
					ftrBrkRevMveYn	: "0" ,											// 이체내역수입이동여부
					ftrBrkXpsMveYn	: "0" ,											// 이체내역지출이동여부
					smTrplXpsCtgrChgYn : "0" 										// 동일거래처지출카테고리변경여부
				}
			}
			console.log(config)
			apiService.call(config).then(response => {
				if(response.totPrcCn > 0){
					modalService.alert("등록 완료되었습니다.").then(() => {
						this.close('complete')
					})
				}else{
					modalService.alert("저장시 오류가 발생하였습니다.")
				}
			})
		},
		outcomeSave(){
			// 지출로 저장.
			if(this.asetAmnCtgrId === ''){
				modalService.alert('카테고리를 선택해주세요.')
				return false
			}
			if(this.dataSrcDsc === '05'){
				if(this.prcMchtnm.trim().length < 1){
					modalService.alert("지출항목을 입력하세요.")
					return false
				}
			}

            const config = {
                url : '/lc/fd/03u01',
                data : {
					asetCtgrDsc		: this.asetCtgrDsc ,	// 자산카테고리구분코드
					dataSrcDsc		: this.dataSrcDsc ,		// 데이터원천구분코드
					inqKey			: this.p_inqKey , 		// 조회키

					trPatnnm		: this.prcMchtnm ,	// 거래상대자명
					trDtm			: this.trDtm ,	// 거래일시
					tram			: this.tram ,	// 거래금액
					trCntn			: this.prcMchtnm ,	// 거래내용
					asetAmnCtgrId	: this.asetAmnCtgrId ,	// 자산관리카테고리ID
					memoCntn		: this.memoCntn ,	// 메모내용
					
					myFhsRevAdtYn	: "0" ,								// 마이농가수입추가여부
					myFhsXpsAdtYn	: this.myFhsYn ,											// 마이농가지출추가여부
					myFhsCtgrid		: this.myFhsCtgrid ,							// MY농가카테고리ID
					naWrsLclc		: this.naWrsLclc ,								// 경제통합상품대분류코드
					naWrsMclc		: this.naWrsMclc ,								// 경제통합상품중분류코드
					naWrsSclc		: this.naWrsSclc ,								// 경제통합상품소분류코드
					xpsBrkExpsYn	: "1" ,											// 지출내역노출여부
					bgtIncdYn		: "1" ,											// 예산포함여부
					revBrkFtrMveYn	: "0" ,											// 수입내역이체이동여부
					xpsBrkFtrMveYn	: "0" ,											// 지출내역이체이동여부
					ftrBrkRevMveYn	: "0" ,											// 이체내역수입이동여부
					ftrBrkXpsMveYn	: "0" ,											// 이체내역지출이동여부
					smTrplXpsCtgrChgYn : this.smTrplXpsCtgrChgYn 					// 동일거래처지출카테고리변경여부
				}
			}
			console.log(config)
			apiService.call(config).then(response => {
				if(response.totPrcCn > 0){
					modalService.alert("등록 완료되었습니다.").then(() => {
						this.close('complete')
					})
				}else{
					modalService.alert("저장시 오류가 발생하였습니다.")
				}
			})
		},
		fn_flagClose(){
			if(this.reqFlag === ""){
				this.$parent.$parent.$children[this.$parent.$parent.$children.length-1].fn_setCurrentYm(this.trDtm.split('-').join('').substr(0,4), this.trDtm.split('-').join('').substr(4,2))
				this.closeAll('complete')
			}else{
				this.close()
			}
		}
    }
}
</script>