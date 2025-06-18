<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 기타자산 > 농기계 상세
* @ 페이지설명 : 농기계 상세
* @ 파일명     : src/views/page/AS/OA/ASOA2009/ASOA2009.vue
* @ 작성자     : CS523299
* @ 작성일     : 2021-08-19 
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-19              CS523299              최초작성
* 2022-08-18              CS528061              고도화 및 파일명 변경(SZST2112 -> ASOA1009)    \
* 2023-09-08              CS533571              마이데이터 확대개발 화면ID만 변경(ASOA1009 -> ASOA2009)            
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>농기계</h1>
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<div class="custom_box">
                    <!-- <div class="popup_content com_no_bottom com_bg_type00"> -->
                    <div class="com_inputarea_type07 original">
                        <!-- // 상각명 -->
                        <div class="com_input_type01">
                            <label for="fmachDsnm"><span class="txt_label">{{this.fmachDsnm}}</span></label>
                            <input type="text" id="fmachDsnm" class="input_right" name="fmachDsnm" value="" readonly placeholder="" title="상각명">
                        </div>
                        <!-- // 상각명 -->

                        <!--// 내용연수 -->
                        <div class="com_input_type01 com_word1">
                            <label for="cntnYrcn"><span class="txt_label">내용연수</span></label>
                            <input type="tel" id="cntnYrcn" class="" name="cntnYrcn" :value="this.cntnYrcn" readonly placeholder="" title="내용연수">
                            <div class="del_txt">
                                <a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
                                <span class="com_inputtxtright2">년</span>
                            </div>
                        </div>
                        <!--// 내용연수 -->
                        
                        <!--// 구입시기 -->
                        <div class="com_input_type01">
                            <label for="buyDt"><span class="txt_label">구입시기</span></label>
                            <input type="tel" id="buyDt" class="com_txtleft_type04" name="buyDt" :value="this.buyDt | dateFilter('YYYY.MM.DD')" readonly placeholder="" title="구입시기">
                        </div>
                        <!--// 구입시기 -->
                        
                        <!--// 구입금액 -->
                        <div class="com_input_type01 com_word1">
                            <label for="buyAm"><span class="txt_label">구입금액</span></label>
                            <input type="tel" id="buyAm" class="com_txtleft_type04" name="buyAm" :value="numberFormat(this.buyAm)" readonly placeholder="" title="구입금액">
                            <div class="del_txt">
                                <span class="com_inputtxtright2">원</span>
                            </div>
                        </div>
                        <!--// 구입금액 -->

                        <!-- 제조업체를 입력해 주세요 -->
                        <div class="com_input_type01 com_input_type001">
                            <input type="text" id="mftConm" name="mftConm" value="" required="" maxlength="20" placeholder="제조업체를 입력해 주세요" title="제조업체를 입력" v-model="mftConm">
                            <label for="mftConm">
                                <span class="txt_label_x">제조업체</span>
                            </label>
                            <div class="del_txt"> <!-- del함수 생성해야함 -->
                                <a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
                            </div>
                        </div>
                        <!--// 제조업체를 입력해 주세요 -->

                        <!-- 작목 비율 설정 -->
                        <div class="titbox_type01 style_up">
                            <strong class="com_pop_tit01">작목 비율 설정</strong>
                            <span class="btn_area">
                            </span>
                        </div>
                        <div class="com_inputbox_area01">
                            <!-- 나의농장 -->
                            <dl class="com_input_type03 view com_placeholder_right">
                                <dt><label for="nanonga">나의농장</label></dt>
                                <dd class="one">
                                    <div>
                                        <input type="tel" id="nanonga" class="" name="" value="" placeholder="" title="사용 비율을 입력해주세요" v-model="nanonga" disabled @keyup.enter="moveNextTag($event)">
                                        <span class="com_inputtxtright type02">%</span>
                                    </div>					
                                </dd>
                            </dl>
                            <!--// 나의농장 -->
                            <dl class="com_input_type03 view com_placeholder_right" v-for="(abiCulp, index) in this.itemList" :key="index" ref="abiculp"
                                    :data-naWrsLclc="abiCulp.naWrsLclc"     
                                    :data-naWrsMclc="abiCulp.naWrsMclc"
                                    :data-naWrsSclc="abiCulp.naWrsSclc">
                                <dt><label :for="'abiCulp_'+index">{{abiCulp.naWrsSclfnm}}</label></dt>
                                <dd class="one">
                                    <div>
                                        <input type="tel" :id="'abiCulp_'+index" class="" name="" value="" maxlength="3" placeholder="사용 비율을 입력해주세요" title="사용 비율을 입력해주세요" 
                                                v-model="abiCulp.ugRto" @click="chekZero" @keyup="chekNumber" @change="setVlueNanonga" @keyup.enter="moveNextTag($event)" ref="ratio">
                                        <span class="com_inputtxtright type02">%</span>
                                    </div>					
                                </dd>
                            </dl>
                        </div>
                        <!--// 작목 비율 설정 -->

                        <!-- 상각기간 -->
                        <div class="com_input_type01">
                            <label for="rdmPrdNew"><span class="txt_label">총 상각기간</span></label>
                            <input type="tel" id="rdmPrdNew" class="com_txtleft_type04" name="" :value="rdmPrdNew" readonly placeholder="" title="총 상각기간" @keyup.enter="moveNextTag($event)">
                        </div>
                        <!--// 상각기간 -->

                        <!-- 월상각금액 -->
                        <div class="com_input_type01 com_word1">
                            <label for="mmRdmAm"><span class="txt_label">월상각금액</span></label>
                            <input type="tel" id="mmRdmAm" class="" name="mmRdmAm" :value="this.mmRdmAm != null ? numberFormat(this.mmRdmAm): 0" readonly placeholder="" title="월상각금액" @keyup.enter="moveNextTag($event)">
                            <div class="del_txt"> <!-- del함수 생성해야함 -->
                                <a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
                                <span class="com_inputtxtright2">원</span>
                            </div>
                        </div>
                        <!--// 월상각금액 -->

                        <!-- 처분일자 -->
                        <div class="com_input_type01 com_word2" role="button" :aria-label="'필수입력, 처분일자 '+dpsDt+', 처분일자 선택'">
                            <input type="text" id="dpsDt" class="input_cal_date com_txtright_type01 tar" name="" value="" required="" 
                                    placeholder="처분일자를 입력해 주세요" title="처분일자" readonly="readonly" aria-hidden="true"
                                    v-model="dpsDt" date-placeholder="" @click="fn_popupCalendar($event)">
                            <label for="dpsDt">
                                <em><span class="blind">필수입력</span></em>
                                <span class="txt_label_x">처분일자</span>
                            </label>
                        </div>
                        <!--// 처분일자 -->

                        <!-- 마이농가에 추가 -->
                        <div class="sortable_list">
                            <div class="list_item">
                                <span class="list_item_tit">마이농가에 추가</span>
                                <span class="cmm-switch custom-switch">
                                    <input type="checkbox" id="asetTrryDsc" :checked="flagChecked" ref="asetTrryDsc" role="switch"><!-- 22-10-21 role 추가 -->
                                    <label for="asetTrryDsc"><em class="blind">마이농가선택</em></label>
                                </span>
                            </div>
                        </div>
                        <!--// 마이농가에 추가 -->
                    </div>
                    <!-- </div> -->
				</div>
			</div>
		</div>
		
		<div class="popup_footer fixed">
			<div class="btns_wrap">
				<!-- <a href="javascript:void(0);" role="button" class="btn btn_grey" @click="fn_delBtn()" aria-disabled="false">삭제</a>
				<a href="javascript:void(0);" role="button" class="btn btn_mint" @click="fn_editSaveDprcInfo('save')" aria-disabled="false">저장</a> -->
                <button type="button" class="btns lg" @click="fn_delBtn()">삭제</button>
				<button type="button" class="btns lg primary" @click="fn_editSaveDprcInfo('save')">저장</button>
				<!-- btn_off 제거시 활성화 -->
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click="close()"><span class="blind">팝업닫기</span></a>		
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
		name : "ASOA2009",
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
                mmRdmAm_han : "",   // 월상각금액(한글)
                asetTrryDsc : "",   // 자산영역구분코드
                flagChecked : "",   // 자산영역구분코드 체크여부
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
				this.getData(param)
			},
			getData(param = {}){
                // 일련번호
                this.sqno = param.sqno
                // 농기계상각상세조회 호출
                this.getFmachDprcDtlInfo();
                
            },
            // 농기계상각상세조회 
            getFmachDprcDtlInfo(){
				const config = {
					url: '/sz/st/12ra1',
					data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno'),
                        "sqno"      : this.sqno
					}
				}

				apiService.call(config).then(response => {
					this.fmachDsc	= response.fmachDsc   // 농기계구분코드
                    this.fmachDsnm	= response.fmachDsnm	    // 농기계구분명
                    this.cntnYrcn   = response.cntnYrcn         // 내용년수
                    this.buyDt      = response.buyDt   	        // 구매일자
                    this.buyAm      = response.buyAm    	    // 구매금액
                    this.mftConm    = response.mftConm        	// 제조업체명
                    this.mftConm_chk= response.mftConm          // 제조업체명(체크용)
                    //this.dpsDt      = response.dpsDt   	    // 처분일자
                    this.rdmPrd		= response.rdmPrd		    // 삼각기간
                    this.mmRdmAm	= response.mmRdmAm		    // 월상각금액
                    this.asetTrryDsc= response.asetTrryDsc      // 자산영역구분코드
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

                    // 기타자산 목록의 param은 rdmPrd(상각기간)을 넘기지 않아 현재 화면에서 조회되는 rdmPrd를 출력해주어 ANSZ2008과 코드의 위치가 다름
                    this.rdmPrdNew  = ""
                    let arr = [] 
                    if(this.rdmPrd !=null) arr = this.rdmPrd.split("/")
                    if(arr.length > 0){
                        if(arr[0] != "0" && arr[0].length > 0 ){
                            this.rdmPrdNew = arr[0] + "년" + arr[1] + "개월";
                        }else{
                            this.rdmPrdNew = arr[1] + "개월";
                        }
                    }

                    if(this.asetTrryDsc === '03') {
                        this.flagChecked = 'checked'
                    } else {
                        this.flagChecked = ''
                    }

				}).then(()=>{
                    // 키 패드 관련 함수 정상 호출
                    this.callJQueryFncExcute()
                })
            },
            fn_delBtn() {
                const config = {
                    content : ['등록된 자산을 삭제하시겠습니까?'],
                    title   : ""
                };

                modalService.confirm(config).then(text => {
                    if(text == "예") {
                        this.fn_editSaveDprcInfo('del')
                    }
                });
            },
			fn_editSaveDprcInfo(type) {
                var ratio = this.$refs.ratio
                let itemListNew = []    // 초기화
                this.ugRtoAll = 0;      // 초기화
                this.ugRtoNullCnt = 0;  // 초기화

                if(ratio != null) {
                    for(var i=0; i<ratio.length ; i++){
                        var modDepositObj = {};
                        modDepositObj.naWrsLclc = this.itemList[i].naWrsLclc;
                        modDepositObj.naWrsMclc = this.itemList[i].naWrsMclc;
                        modDepositObj.naWrsSclc = this.itemList[i].naWrsSclc;
                        this.ugRtoAll += Number(ratio[i].value);

                        if(ratio[i].value.length == 0){
                            this.ugRtoNullCnt++; 
                        }

                        modDepositObj.ugRto = ratio[i].value;
                        itemListNew.push(modDepositObj);
                    }
                }

                // 필수 체크 
                if(!(this.fn_valueChek())) return;

                // 구매금액 별도 처리
                if (String(this.buyAm).indexOf(",") > -1){
                    this.buyAm = this.buyAm.split(",").join("")
                } 

                const config = {
					url : '/sz/st/12sa1',
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
                        trDsc       : type === 'save' ? '2' : '3',                                      // 거래구분코드(1:저장, 2:수정, 3:삭제)
                        asetTrryDsc : this.$refs['asetTrryDsc'].checked === true ? '03' : '02'          // 자산영역구분코드(기타자산에서 등록할 경우 : 02.기타자산, 03.기타자산+마이농가자산)
                    }
                }

                apiService.call(config).then(response => {
                    //저장 성공시
                    if(response.rspC == "0000") {
                        let msg = ''
                        switch(type) {
                            case 'save':
                                msg = "저장되었습니다."
                                break
                            case 'del':
                                msg = "삭제되었습니다."
                                break
                        }
                        modalService.alert(msg).then(() => {
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
                let ratio = this.$refs.ratio
                this.ugRtoAll = 0;      // 초기화
                this.ugRtoNullCnt = 0;  // 초기화

                if(e.target.value > 100){
                    modalService.alert("비율을 100% 초과 입력 할수 없습니다").then(() => {return});
                    e.target.value = 0;
                    return;
                }
                
                this.ugRtoAll = 0;
                let overCnt = 100;
                for(let i=0; i<ratio.length; i++){
                    this.ugRtoAll += Number(ratio[i].value);
                    if(this.ugRtoAll > 100){
                        e.target.value=0;
                        this.ugRtoAll = 0;
                        overCnt = Number(e.target.id);
                        for(let i=0 ; i<ratio.length-1 ; i++){
                            if(overCnt != i) this.ugRtoAll += Number(ratio[i].value);
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
                        answer = `${modToString}${koreanUnits[index]} ` + answer
                    }
                    division = Math.pow(unit, ++index)
                }

                return (answer + "원").replace(" 원","원")
            },
		}
    }
</script>