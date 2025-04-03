<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 마이농가설정 > 농기계 상각 관리 > 농기계 상각 상세
* @ 페이지설명 : 농기계 상각 상세
* @ 파일명     : src/views/page/SZ/ST/SZST2112/SZST2112.vue
* @ 작성자     : CS523299
* @ 작성일     : 2021-08-19 
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-19              CS523299                 
*************************************************************************/
-->
<template>
<!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>농기계 상각 수정</h1>
		</div>
		<!-- 20210823 한별 수정 S -->		
		<div class="popup_content com_bg_type00">
            <div class="com_inner com_inputarea_type07 original">
                <div class="com_input_type01">
                    <label for="com_input01"><span class="txt_label">{{this.fmachDsnm}}</span></label>
                    <input type="text" id="fmachDsnm" class="input_right" name="fmachDsnm" value="" readonly placeholder=""  title="상각명">
                </div>
                <div class="com_input_type01 com_word1">
                    <label for="com_input02"><span class="txt_label">내용연수</span></label>
                    <input type="text" id="cntnYrcn" class="input_right" name="cntnYrcn" :value="this.cntnYrcn" readonly placeholder=""  title="내용연수">
                    <div class="del_txt">
                        <a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
                        <span class="com_inputtxtright2">년</span>
                    </div>
                </div>
				<div class="com_input_type01">
                    <label for="com_input03"><span class="txt_label">구입시기</span></label>
                    <input type="text" id="buyDt" class="input_right" name="buyDt" :value="this.buyDt | dateFilter('YYYY.MM.DD')" readonly placeholder=""  title="구입시기">
                </div>
                <!-- 제조업체 타이틀과 간격 유지 위함 mb60 사용 -->
				<div class="com_input_type01 com_word1 mb60">
                    <label for="com_input04"><span class="txt_label">구입금액</span></label>
                    <input type="text" id="buyAm" class="input_right" name="buyAm" :value="numberFormat(this.buyAm)" readonly placeholder=""  title="구입금액">
                    <div class="del_txt">
                        <span class="com_inputtxtright2 style01">원</span>
                    </div>
                    <!-- 20211108 한별 추가 -->
                    <!-- <p class="com_sum">{{buyAm_han}}</p> -->
                </div>
				<div class="com_input_type01">
                    <input type="text" id="mftConm" class="" required maxlength="20" name="mftConm" value=""  placeholder="제조 업체를  입력해 주세요."  title="제조 업체를 입력해 주세요" v-model="mftConm">
                    <label for="mftConm"><span class="txt_label_x">제조업체</span></label>
                </div>
				<div class="titbox_type01 style_up">
					<strong class="com_txt_sub01">작목 비율 설정</strong>
					<span class="btn_area">
						<!-- <a href="javascript:void(0);" class="com_btnround_type04"><span>추가</span></a>
						<a href="javascript:void(0);" class="com_btnround_type04"><span>삭제</span></a> -->
					</span>
				</div>
                <!-- 작목 목록-->
                <div id="arrayUl">
                    <dl class="com_input_type03 com_placeholder_right"  v-for="(abiCulp, index) in this.itemList" :key="index"  
                        :data-naWrsLclc="abiCulp.naWrsLclc"     
                        :data-naWrsMclc="abiCulp.naWrsMclc"
                        :data-naWrsSclc="abiCulp.naWrsSclc"
                        >
                            <dt><label :for="'abiCulp_'+index">{{abiCulp.naWrsSclfnm}}</label></dt>
                            <dd class="one" id="arrayUl2">
                                <div class="num">
                                    <input type="tel" :id="'abiCulp_'+index" class="com_txtright_type02-1"  value="" maxlength="3"  v-model="abiCulp.ugRto" placeholder="사용 비율을 입력해주세요" title="사용 비율을 입력해주세요."  @click="chekZero" @keyup="chekNumber" @change="setVlueNanonga" @keyup.enter="moveNextTag($event)">
                                    <span class="com_inputtxtright type02">%</span>
                                </div>					
                            </dd>
                    </dl>
                    <!-- 나의 농장 nanonga -->
                    <!-- <dl class="com_input_type03 com_placeholder_right" >
                        <dt><label for="txt01">나의 농장</label></dt>
                        <dd class="one">
                            <div>
                                <input type="tel" id="nanonga" class="com_txtright_type05" placeholder=""   v-model="nanonga" readonly>
                                <span class="com_inputtxtright type02">%</span>
                            </div>					
                        </dd>
                    </dl> -->

                    <!-- 나의 농장 -->
                    <dl class="com_input_type03 view com_placeholder_right" >
                        <dt><label for="nanonga">나의 농장</label></dt>
                        <dd class="one">
                            <div>
                                <input type="tel" id="nanonga" class="com_txtright_type02-1" placeholder=""   v-model="nanonga" readonly @keyup.enter="moveNextTag($event)"> 
                                <span class="com_inputtxtright type02">%</span>
                            </div>					
                        </dd>
                    </dl>
                </div>
                <div class="com_input_type01">
					<label for="com_input05"><span class="txt_label">총 상각기간</span></label>
					<input type="text" id="rdmPrdNew" class="input_right" name="" :value="rdmPrdNew" readonly placeholder=""  title="총 상각기간" @keyup.enter="moveNextTag($event)">
				</div>
				<div class="com_input_type01 com_word1">
					<label for="com_input06"><span class="txt_label">월상각액</span></label>
					<input type="text" class="input_right" id="mmRdmAm" name="mmRdmAm" :value="this.mmRdmAm != null ? numberFormat(this.mmRdmAm): 0 " readonly placeholder=""  title="월상각액" @keyup.enter="moveNextTag($event)">
					<div class="del_txt">
                        <span class="com_inputtxtright2 style01">원</span>
                    </div>
                    <!-- 20211108 한별 추가 -->
                    <!-- <p class="com_sum">{{mmRdmAm_han}}</p> -->
				</div>
                <div class="com_input_type01">
					<label for="com_input07"><span class="txt_label">처분일자</span></label>
                    <!-- KHC_20210927 input class=input_right에서 class=com_txtleft_type04 으로 변경 -->
                    <!-- <template v-if="this.dpsDt != null">
                        <input type="date" id="dpsDt" name="dpsDt" readonly="readonly" placeholder="" class="com_txtleft_type04" :value="dpsDt | dateFilter('YYYY-MM-DD') " disabled>
                    </template> -->
                    <!-- <template v-else> -->
                        <!-- <input type="date" id="dpsDt" class="com_txtleft_type04" name="" v-model="dpsDt" date-placeholder=""> -->
                        <input type="text" data-popup="alert_popup" readonly id="dpsDt" class="input_cal_date com_txtleft_type04" name="" v-model="dpsDt" date-placeholder=""  title="처분일자" @click="fn_popupCalendar($event)">
                    <!-- </template> -->
				</div>
            </div>
		</div>
		<!--// 20210823 한별 수정 E -->
		<div class="popup_footer fixed">
			<div class="btn_half_box">
				<a href="javascript:void(0);" role="button" @click="closePage" class="btn btn_grey">취소</a>
				<a href="javascript:void(0);" role="button" @click="fn_editSaveDprcInfo" class="btn btn_mint">저장</a>
			</div>
		</div>
		<a href="javascript:void(0);" role="button" @click="close" class="btn_close"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>
<script>
    import popupMixin from '@/common/mixins/popupMixin'
	import commonMixin from '@/common/mixins/commonMixin'
    import {keyupNumFormat} from '@/utils/number'
    import {dateFormat} from '@/utils/date'
	import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'

    export default {
		name : "SZST2112",
		data: () => {
            return {
                // 변수 초기화_KHC
				fmachDsc    : "",   // 농기계구분코드
				fmachDsnm	: "",	// 농기계구분명
                cntnYrcn    : 0,    // 내용년수
                buyDt       : "",   // 구매일자
                buyAm       : 0,    // 구매금액
                mftConm     : "",   // 제조업체명
                mftConm_chk : "",   // 제조업체명(체크용)
				dpsDt       : "",   // 처분일자
				rdmPrd		: "",	// 삼각기간
				mmRdmAm		: 0,	// 월상각금액
                itemList    : [],   // 작목사용비율목록
                abiCulplList: [],   // 작목 목록
                naWrsLclc   : [],   // 상품분류코드(대분류)
				naWrsMclc   : [],   // 상품분류코드(중분류)
				naWrsSclc   : [],   // 상품분류코드(소분류)
                ugRto_in    : [],   // 사용비율    
                ugRtoAll    : 0,
                ugRtoNullCnt: 0,
                nanonga     : 0,
                rdmPrdNew   : "",
                buyAm_han   : "",   // 구매금액(한글)
                mmRdmAm_han : ""    // 월상각금액(한글)

            }
        },
        mixins: [
            popupMixin,
            commonMixin
		],
		mounted() {
            this.initComponent(this.params)
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
		},
		methods: {
			initComponent(param = {}) {
                // console.log("param=", param)
				this.getData(param)
			},
			getData(param = {}){
                // 일련번호
                this.sqno = param.sqno
                // 농기계상각상세조회 호출
                this.getFmachDprcDtlInfo();
                this.rdmPrdNew  = ""
                let arr = [] 
                if(param.rdmPrd !=null) arr = param.rdmPrd.split("/")
                if(arr.length > 0){
                    if(arr[0] != "0" && arr[0].length > 0 ){
                        this.rdmPrdNew = arr[0] + "년" + arr[1] + "개월";
                    }else{
                        this.rdmPrdNew = arr[1] + "개월";
                    }
                }
            },
            // 농기계상각상세조회 
            getFmachDprcDtlInfo(){
                // console.log("getFmachDprcDtlInfo 호출")
				const config = {
					url: '/sz/st/12r01',
					data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno'),
                        "sqno"      : this.sqno
					}
				}

				// console.log("config=", config)
				apiService.call(config).then(response => {

					this.fmachDsc	= response.fmachDsc   	    // 농기계구분코드
                    this.fmachDsnm	= response.fmachDsnm	    // 농기계구분명
                    this.cntnYrcn   = response.cntnYrcn         // 내용년수
                    this.buyDt      = response.buyDt   	        // 구매일자
                    this.buyAm      = response.buyAm    	    // 구매금액
                    this.mftConm    = response.mftConm   	    // 제조업체명
                    this.mftConm_chk= response.mftConm   	    // 제조업체명(체크용)
                    //this.dpsDt      = response.dpsDt   	    // 처분일자
                    this.rdmPrd		= response.rdmPrd		    // 삼각기간
                    this.mmRdmAm	= response.mmRdmAm		    // 월상각금액
                    this.itemList   = response.itemList 	    // 작목사용비율목록

                    this.dpsDt = response.dpsDt === null ? "" : dateFormat(response.dpsDt, 'YYYY-MM-DD')
                    
                    // 작목 나의 농가 값 초기화
                    this.ugRtoAll = 0;      // 초기화
                    for(let i=0 ; i<this.itemList.length; i++){
                        this.ugRtoAll += Number(this.itemList[i].ugRto);
                    }
                    // 20211012 수정 루프 밖으로 
                    this.nanonga = 100 - this.ugRtoAll;

                    // 한글금액 표시 
                    this.buyAm_han      = this.fn_hanValue(keyupNumFormat(this.buyAm))
                    this.mmRdmAm_han    = this.fn_hanValue(keyupNumFormat(this.mmRdmAm))

				}).then(()=>{
                    // 키 패드 관련 함수 정상 호출
                    this.callJQueryFncExcute()
                })
			},
			fn_editSaveDprcInfo() {

                var liArrayInput = $("#arrayUl input");
                let itemListNew = []    // 초기화
                this.ugRtoAll = 0;      // 초기화
                this.ugRtoNullCnt = 0;  // 초기화

                for(var i=0 ; i<liArrayInput.length-1 ; i++){
                    var modDepositObj = {};
                    modDepositObj.naWrsLclc = this.itemList[i].naWrsLclc;
                    modDepositObj.naWrsMclc = this.itemList[i].naWrsMclc;
                    modDepositObj.naWrsSclc = this.itemList[i].naWrsSclc;
                    this.ugRtoAll += Number(liArrayInput.eq(i).val());

                    if(liArrayInput.eq(i).val().length == 0){
                        this.ugRtoNullCnt++; 
                    }

                    modDepositObj.ugRto = liArrayInput.eq(i).val();
                    itemListNew.push(modDepositObj);
                }

                // 필수 체크 
                if(!(this.fn_valueChek())) return;

                // 구매금액 별도 처리
                if (String(this.buyAm).indexOf(",") > -1){
                    this.buyAm = this.buyAm.split(",").join("")
                } 

                const config = {
					url : '/sz/st/12s01',
                    data: {
						mydtCusno   : this.getUserInfo('mydtCusno'),			                        // 마이데이터고객번호
						sqno		: this.sqno,								                        // 일련번호
                        fmachDsc    : this.fmachDsc,                                                    // 농기계구분코드  this.fmachDsc
                        cntnYrcn    : this.cntnYrcn,                                                    // 내용년수
                        buyDt       : this.buyDt.split("-").join(""),                                   // 구매일자
                        buyAm       : this.buyAm,                                                       // 구매금액
                        mftConm     : this.mftConm,                                                     // 제조업체명
                        dpsDt       : this.dpsDt != null? this.dpsDt.split("-").join("") : this.dpsDt,  // 처분일자
                        itemList    : itemListNew,                             	                        // 작목사용비율목록
                        trDsc       : "2"                                                               // 거래구분코드(1:저장, 2:수정, 3:삭제)
                    }
                }

                // console.log("config", config)

                apiService.call(config).then(response => {
                    //저장 성공시
                    if(response.rspC == "0000") {
                        modalService.alert("저장되었습니다.").then(() => {
                            this.close(response)
                        })
                    }
                })
            
            },
			// 입력 중 취소시 메시지
            closePage() {
                const config = {
                    content: ['입력중인 정보는 저장되지 않습니다','정말로 취소하시겠습니까?'],
                    title  : "",
                }
                modalService.confirm(config).then(text => {
                    if(text == "예") {
                        // if(!this.isUpt) this.closeAllData(true)
                        // else this.close()
                        this.close();
                    }
                })
            },
            //1000단위마다 금액 쉼표처리
            numberFormat(number){
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            },
			// 금액 천단위 쉼표 표시
            addComma(e) {
                e.target.value = keyupNumFormat(e.target.value.replace(/[^0-9]/g, '').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')) //숫자만 입력 가능하도록
			},
			// 숫자만 입력
            chekNumber(e) {
                if(e.target.value != "0"){
                    e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'') //숫자만 입력 가능하도록
                }
                // else{
                //     e.target.value = "";
                // }
            },
            // 0값 삭제
            chekZero(e){
                if(e.target.value == 0){
                    e.target.value = "";
                }
            },
            // 입력값 체크
            fn_valueChek(){

                // console.log("this.ugRtoAll=====", this.ugRtoAll);
                let chekFlag = true;
                // if(this.ugRtoNullCnt > 0){// 20211018 작목 하나라도 입력 않하면 체크하는 것으로 수정  기존 this.ugRtoNullCnt > 0 으로 체크
                //     modalService.alert("작목에 대한 사용 비율을 <br>입력해 주시기 바랍니다.").then(() => {return})
                //     chekFlag = false;
                //     return
                // }else 
                if(this.ugRtoAll + this.nanonga> 100){
					modalService.alert("비율합이 100%를 초과합니다. <br>확인 후 재입력해 주세요").then(() => {return})
                    chekFlag = false;
                    return
                }else if(this.ugRtoAll + this.nanonga< 100){
                    modalService.alert("비율합이 100% 미만입니다. <br>확인 후 재입력해 주세요").then(() => {return})
                    chekFlag = false;
                    return
                }

                let buyDtChk = this.buyDt.split("-").join("");
                let dpsDtChk = ""

                if(this.dpsDt.length !=0) {
                    dpsDtChk = this.dpsDt.split("-").join("");
                }

                if(dpsDtChk.length !=0 && buyDtChk > dpsDtChk){
                    modalService.alert("처분일자가 구매일자 보다 작을수 없습니다.").then(() => {return})
                    chekFlag = false;
                    return
                }

                return chekFlag;
            },
            setVlueNanonga(e){
                let liArrayInput = $("#arrayUl input");
                this.ugRtoAll = 0;      // 초기화
                this.ugRtoNullCnt = 0;  // 초기화

                if(e.target.value > 100){
                    modalService.alert("비율을 100% 초과 입력 할수 없습니다").then(() => {return});
                    e.target.value = 0;
                    return;
                }
                
                this.ugRtoAll = 0;
                let overCnt = 100;
                for(let i=0 ; i<liArrayInput.length-1 ; i++){
                    this.ugRtoAll += Number(liArrayInput.eq(i).val());
                    if(this.ugRtoAll > 100){
                        e.target.value=0;
                        this.ugRtoAll = 0;
                        overCnt = Number(e.target.id);
                        for(let i=0 ; i<liArrayInput.length-1 ; i++){
                            if(overCnt != i) this.ugRtoAll += Number(liArrayInput.eq(i).val());
                        }
                        this.nanonga = 100 - this.ugRtoAll;
                        modalService.alert("비율합이 100%를 초과합니다. <br>확인 후 재입력해 주세요").then(() => {return});
                        e.target.value = 0;
                        return
                    }

                    this.nanonga = 100 - this.ugRtoAll;
                }
            },

            // 달력 팝업 오픈
            fn_popupCalendar(e) {
                let tmpDt = ""
                if(this.dpsDt === "") tmpDt = dateFormat(new Date(), "YYYY-MM-DD")
                else tmpDt = this.dpsDt
                const config = {
                    pDate : tmpDt,
                    minDate : "",
                    maxDate : "",
                }
                modalService.calendarPopup(config).then(response => {
                    if(response !== undefined && response !== null && response !== '') {
                        e.target.value = dateFormat(response, "YYYY-MM-DD")
                        this.dpsDt = e.target.value
                    }
                })
            },
            // 한글금액 표시
            fn_hanValue(amount) {

                const koreanUnits = ['', '만', '억', '조']
                // let han_amount = parseInt(amount.split(',').join('')) * 10000   // 만원 단위 화면
                let han_amount = parseInt(amount.split(',').join(''))   // 만원 단위 화면
                let answer = ''
                let unit = 10000
                let index = 0
                let division = Math.pow(unit, index)

                while(Math.floor(han_amount / division) > 0) {
                    const mod = Math.floor(han_amount % (division * unit) / division)
                    if(mod) {
                        const modToString = mod.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
                        // console.log("1st index : ", index)
                        answer = `${modToString}${koreanUnits[index]} ` + answer
                    }
                    division = Math.pow(unit, ++index)
                }

                return (answer + "원").replace(" 원","원")
            }
		}
    }
</script>