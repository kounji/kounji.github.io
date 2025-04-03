<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 마이농가설정 > 농기계 상각 관리 > 상각 등록
* @ 페이지설명 : 상각 등록
* @ 파일명     : src/views/page/SZ/ST/SZST2109/SZST2109.vue
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
			<h1>농기계 상각 등록</h1>
		</div>
		<!-- 20210823 한별 수정 S -->	
		<div class="popup_content com_bg_type00">
            <div class="com_inner">
				<div class="com_inputarea_type07">
                    <button type="button" class="com_btn_select com_iconstar"  title="농기계를 설정해주세요" @click="fn_openSzPop()">
                        <template v-if="this.fmachDsnm == ''">
                            <span>농기계를 설정해 주세요.</span>
                        </template>
                        <template v-else>
                            <span>{{fmachDsnm}}</span>
                        </template>
                        </button>
                    <div class="com_input_type01 com_word1">
                        <label for="com_input01">
                            <em><span class="blind">필수입력</span></em>
                            <span class="txt_label">내용연수</span>
                            </label>
                        <input type="text" id="cntnYrcn" class="" name="cntnYrcn" value="" readonly placeholder=""  title="내용연수">
                        <div class="del_txt">
                            <a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
                            <span class="com_inputtxtright2">{{cntnYrcn}}</span>
                            <span class="com_inputtxtright2">년</span>
                        </div>
                    </div>
                    <div class="com_input_type01">
                        <!-- <input type="date" id="buyDt" class="focusforce" name="buyDt" value="" required data-placeholder="구입 시기를 설정해 주세요." v-model="buyDt"> -->
                        <input type="text" data-popup="alert_popup" readonly @click="fn_popupCalendar($event)" id="buyDt" class="input_cal_date  input_cal_date_tit" name="buyDt" value="" required placeholder="구입 시기를 설정해 주세요."  title="구입 시기를 설정해 주세요" v-model="buyDt" @keyup="moveNextTag($event)">
                        <label for="buyDt">
                            <em><span class="blind">필수입력</span></em>
                            <span class="txt_label_x">구입시기</span>
                        </label>
                    </div>
                    <div class="com_input_type01 com_word1">
                        <input type="tel" id="buyAm"  required maxlength="13" class="input_right com_txtright_type01" name="buyAm" value=""  placeholder="구입 금액을 입력해 주세요."  title="구입 금액을 입력해 주세요." v-model="buyAm"  ref="buyAm" @input="chekNumber" @keyup="chekNumber" @keyup.enter="moveNextTag($event)">                        
                        <label for="buyAm">
                            <em><span class="blind">필수입력</span></em>
                            <span class="txt_label_x">구입금액</span>
                        </label>
                        <div class="del_txt">
                            <a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
                            <span class="com_inputtxtright2 style01">원</span>
                        </div>
                        <!-- 20211108 한별 추가 -->
                        <p class="com_sum">{{this.buyAm_han}}</p>
                    </div>
                    <div class="com_input_type01">
						<input type="text" id="mftConm" class="" required maxlength="20" name="mftConm" value=""  placeholder="제조 업체를  입력해 주세요."  title="제조 업체를  입력해 주세요." v-model="mftConm">
                        <label for="mftConm"><span class="txt_label_x">제조업체</span></label>
						<div class="del_txt">
                            <a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
                        </div>
					</div>
                    <div class="titbox_type01 style_down">
                        <strong class="com_txt_sub01">작목 비율 설정</strong>
                        <span class="btn_area">
                            <!-- <a href="javascript:void(0);" @click="fn_openNaWrcPop()" class="com_btnround_type04"><span>추가</span></a> -->
                            <!-- <a href="javascript:void(0);" class="com_btnround_type04"><span>삭제</span></a> -->
                        </span>
                    </div>
                    <!-- 작목 목록-->
                    <div id="arrayUl">
                        <div class="com_input_type01 ani-active com_placeholder_right com_word1"  v-for="(abiCulp, index) in this.itemList" :key="index"  
                        :data-naWrsLclc="abiCulp.naWrsLclc" 
                        :data-naWrsMclc="abiCulp.naWrsMclc"
                        :data-naWrsSclc="abiCulp.naWrsSclc"
                         >
                            <label :for="'abiCulp_'+index"><span class="txt_label">{{abiCulp.naWrsSclfnm}}</span></label>
                            <input type="tel" class="com_txtleft_type02 com_txtright_type02" :id="'abiCulp_'+index"  value="" maxlength="3" placeholder="사용 비율을 입력해주세요"  title="사용 비율을 입력해주세요." @input="chekNumber_abiCulp" @change="setVlueNanonga" @keyup.enter="moveNextTag($event)">
                            <div class="del_txt">
                            <a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
                            <span class="com_inputtxtright2">%</span>
                        </div>
                        </div>
                        <!-- 나의 농장 -->
                        <div class="com_input_type01 ani-active com_placeholder_right com_word1">
                            <label for="nanonga"><span class="txt_label">나의 농장</span></label>
                            <input type="tel" class="com_txtleft_type02 com_txtright_type02" id="nanonga" value="" placeholder="" v-model="nanonga" readonly>
                            <div class="del_txt">
                                <a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
                                <span class="com_inputtxtright2">%</span>
                            </div>
                        </div>
                    </div>
                    <ul class="bl_dot_list farm_list mt15">
                        <li>작목은 설정 > 작목/재배지 관리에서 먼저 설정되어야 노출 됩니다.</li>
                        <!-- 8월27일 기획 수정 -->
                        <li>작목 비율은 합이 100%가 되도록 작성해주세요.<br>(작목 비뮬을 0%로 지정 시 자동으로 나의농장이 100%로 입력되고 상각계산 시 작목 비중은 포함되지 않습니다.)</li>
                    </ul>
				</div>		
            </div> 
		</div>
        <!--// 20210823 한별 수정 E -->
		<div class="popup_footer fixed">
			<div class="btn_half_box">
				<a href="javascript:void(0);" role="button" @click="closePage" class="btn btn_grey">취소</a>
				<a href="javascript:void(0);" role="button" @click="fn_saveDprcInfo" class="btn btn_mint">저장</a>
			</div>
		</div>
		<a href="javascript:void(0);" role="button" @click="close" class="btn_close"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>
<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import SZST2110 from '@/views/page/SZ/ST/SZST2110/SZST2110'		// 농기계 선택
    import modalService from '@/service/modalService'
    import apiService from '@/service/apiService'
    import {keyupNumFormat} from '@/utils/number'
    import {dateFormat} from '@/utils/date'
    import SZST2103 from '@/views/page/SZ/ST/SZST2103/SZST2103'		// 작목설정

    export default {
        name : "SZST2109",
        data: () => {
            return {
                // 변수 초기화_KHC
                fmachDsc    : "",   // 농기계구분코드
                fmachDsnm   : "",   // 농기계구분명
                cntnYrcn    : null, // 내용년수
                buyDt       : "",   // 구매일자
                buyAm       : null, // 구매금액
                buyAm_han   : "",   // 구매금액(한글)
                mftConm     : "",   // 제조업체명
                dpsDt       : "",   // 처분일자
                itemList    : [],   // 작목사용비율목록
                abiCulplList: [],   // 작목 목록
                naWrsLclc   : [],   // 상품분류코드(대분류)
				naWrsMclc   : [],   // 상품분류코드(중분류)
				naWrsSclc   : [],   // 상품분류코드(소분류)
                ugRto_in    : [],   // 사용비율    
                ugRtoAll    : 0,
                ugRtoNullCnt: 0,
                nanonga     : 0
            }
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        mounted() {
            this.initComponent()
            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
		methods: {
			initComponent() {
				this.getData()
			},
            getData() {
				this.getAbiCulplList()
            },
            setInput(cntnYrcn){
                this.cntnYrcn = cntnYrcn;
            },
            getAbiCulplList() {
                const config = {
                    url: '/sz/st/12r01',
                    data: {
                        "mydtCusno" : this.getUserInfo("mydtCusno"),
                        // "sqno"      : "0"   // 신규 등록 시, 상세조회 일련번호 0 or 미입력
                    }
                }

                apiService.call(config).then(response => {
                    this.itemList = response.itemList || []
                }).then(()=>{
                    this.callJQueryFncExcute()
                })

                let liArray = $("#arrayUl .com_input_type01.ani-active.com_placeholder_right.com_word1");
                if(liArray.length == 1){
                    this.nanonga = 100;
                }
            },
            fn_saveDprcInfo() {

                let liArray = $("#arrayUl .com_input_type01.ani-active.com_placeholder_right.com_word1");
                let liArrayInput = $("#arrayUl input");
                this.itemList = []      // 초기화
                this.ugRtoAll = 0;      // 초기화
                this.ugRtoNullCnt = 0;  // 초기화

                for(let i=0 ; i<liArray.length-1 ; i++){
                    let modDepositObj = {};
                    modDepositObj.naWrsLclc = liArray[i].getAttribute("data-naWrsLclc");
                    modDepositObj.naWrsMclc = liArray[i].getAttribute("data-naWrsMclc");
                    modDepositObj.naWrsSclc = liArray[i].getAttribute("data-naWrsSclc");
                    this.ugRtoAll += Number(liArrayInput.eq(i).val());

                    if(liArrayInput.eq(i).val().length == 0){
                        this.ugRtoNullCnt++; 
                    }

                    modDepositObj.ugRto = liArrayInput.eq(i).val();
                    this.itemList.push(modDepositObj);
                }

                // 필수 체크(작목에 대한 비율 ugRtoNullCnt 우에서 먼저 체크 값 세팅하고 체크 진행) 
                if(!(this.fn_valueChek())) return;

                 // 구매금액 별도 처리
                if (String(this.buyAm).indexOf(",") > -1){
                    this.buyAm = this.buyAm.split(",").join("")
                } 

                const config = {
                    url : '/sz/st/09i01',
                    data: {
                        mydtCusno   : this.getUserInfo('mydtCusno'),
                        fmachDsc    : this.fmachDsc,                    // 농기계구분코드  this.fmachDsc
                        cntnYrcn    : this.cntnYrcn,                    // 내용년수
                        buyDt       : this.buyDt.split("-").join(""),   // 구매일자
                        buyAm       : this.buyAm,                       // 구매금액
                        mftConm     : this.mftConm,                     // 제조업체명
                        dpsDt       : this.fmdpsDtachDsc,               // 처분일자
                        fmachDsnm   : this.fmachDsnm,				    // 농기계구분명(신규 추가 필드)
                        itemList    : this.itemList                     // 작목사용비율목록
                    }
                }

                apiService.call(config).then(response => {
                    // 저장 성공시
                    if(response.rspC == "0000") {
                        modalService.alert("저장되었습니다.").then(() => {
                            this.close(response)
                        });
                    }
                })
            }, 
            // 농기계 선택 팝업
            fn_openSzPop() {
                let compName = "";
                let param = {}
                compName = SZST2110     //농기계 선택
                const config = {
                    component: compName,
                    params : param
                }

                modalService.openPopup(config).then(response => {

					//취소버튼을 통해 돌아왔을 때
                    // if(response == "cancel"){
                    //     this.fmachDsc   = "";
                    //     this.fmachDsnm  = "";
                    //     this.cntnYrcn   = null;
                    //     return
                    // } 
                    
                    if(response != "cancel" && response[0] !=null){ // 농기계 선택 취소 버튼 클릭시 처리 대상 제외
                        this.fmachDsc   = response[0].fmachDsc;
                        this.fmachDsnm  = response[0].fmachDsnm;
                        this.cntnYrcn   = response[0].cntnYrcn;

                        this.fn_popupCalendar()
                    }
				})
            },
            // 금액 천단위 쉼표 표시
            addComma() {
                if(this.buyAm.length == 1 && this.buyAm == 0) {
                    this.buyAm = this.buyAm.slice(0, -1)
                } else {
                    this.buyAm = this.buyAm.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                    this.buyAm = this.buyAm.split(",").join("")
                    this.buyAm = keyupNumFormat(this.buyAm)
                }
            },
            // 숫자만 입력(구입 금액)
            chekNumber(e) {
                let hanValue = 0
                
                this.buyAm = keyupNumFormat(e.target.value.replace(/[^0-9]/g, '').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')) //숫자만 입력 가능하도록
                hanValue = e.target.value.replace(/[^0-9]/g, '').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                this.fn_hanValue(hanValue)
                
            },
            // 숫자만 입력(작목비율)
            chekNumber_abiCulp(e) {
                if(e.target.value != 0 ){
                    e.target.value = keyupNumFormat(e.target.value.replace(/[^0-9]/g, '').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')) //숫자만 입력 가능하도록
                }
            },
            // 입력 중 취소시 메시지
            closePage() {
                const config = {
                    content: ['입력중인 정보는 저장되지 않습니다','정말로 취소하시겠습니까?'],
                    title  : "",
                }
                modalService.confirm(config).then(text => {
                    if(text == "예") {
                        this.close();
                    }
                })
            },
            // 입력값 체크
            fn_valueChek(){

                const date        	= new Date()
                let year			= date.getFullYear() 						// 현재 년(비교용)
                let currentMonth 	= ("0" + (date.getMonth() +1)).slice(-2)  	// 월 
                let currentDay      = ("0" + date.getDate()).slice(-2)   		// 일
                let yyyymmdd        = year+currentMonth+currentDay;
                let buyDtInput = "";
                if(this.buyDt.length > 0){
                    buyDtInput = this.buyDt.split("-").join("");
                }
               
                let chekFlag = true;

                // 농기계 직접입력 경우 코드가 없음.이 경우는 체크에서 제외
                if(this.fmachDsc.length == 0 && this.fmachDsnm.length == 0){
                    modalService.alert("농기계를 선택해주세요").then(() => {this.getAbiCulplList()})
                    chekFlag = false;
                    return
                }else if(this.buyDt.length == 0){
                    modalService.alert("구입 시기를 설정해주세요").then(() => {this.getAbiCulplList()})
                    chekFlag = false;
                    return
                }else if(buyDtInput > yyyymmdd){
                    modalService.alert("구입 시기는 현재 날짜 까지 선택 가능 합니다").then(() => {this.getAbiCulplList()})
                    chekFlag = false;
                    return
                }else if( this.buyAm == null || this.buyAm == ""){
                    modalService.alert("구입금액을 입력해주세요").then(() => {this.getAbiCulplList()})
                    chekFlag = false;
                    return
                }
                // else if(this.ugRtoNullCnt > 0){
                //     modalService.alert("작목에 대한 사용 비율을 <br>입력해 주시기 바랍니다.").then(() => {this.getAbiCulplList()})
                //     chekFlag = false;
                //     return
                // }
                else if(Number(this.ugRtoAll) + Number(this.nanonga) > 100){
					modalService.alert("비율합이 100%를 초과합니다. <br>확인 후 재입력해 주세요").then(() => {this.getAbiCulplList()})
                    chekFlag = false;
                    return
                }else if(Number(this.ugRtoAll) + Number(this.nanonga) < 100){
                    modalService.alert("비율합이 100% 미만입니다. <br>확인 후 재입력해 주세요").then(() => {this.getAbiCulplList()})
                    chekFlag = false;
                    return
                }

                return chekFlag;
            },
            /*
            * 작목설정 팝업호출
            */
            fn_openNaWrcPop() {
				const config = {
					component: SZST2103,
				}
				modalService.openPopup(config).then(response => {
                    let info = response
                    this.wrsPathTxt  = info.naWrsLclfnm + " > " + info.naWrsMclfnm + " > "  + info.naWrsSclfnm
                    this.selNaWrsLclc = info.naWrsLclc    //대분류코드
                    this.selNaWrsMclc = info.naWrsMclc    //중분류코드
                    this.selNaWrsSclc = info.naWrsSclc    //소분류코드
				})
            },
            setVlueNanonga(e){

                e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'') //숫자만 입력 가능하도록
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
            // 달력 입력창 호출
            fn_popupCalendar() {

                let tmpDt = ""
                if(this.buyDt === "") tmpDt = dateFormat(new Date(), "YYYY-MM-DD")
                else tmpDt = this.buyDt
                const config = {
                    pDate : tmpDt,
                    minDate : "",
                    maxDate : ""
                }
                
                modalService.calendarPopup(config).then(response => {
                    if(response !== undefined && response !== null && response !== '') {
                        this.buyDt = dateFormat(response, "YYYY-MM-DD")
                        this.$nextTick(() => {
                            // 구입금액 입력 항목으로 이동(필수항목)
                            this.$refs.buyAm.focus();
                        })
                    }
                })
            },
            // 한글금액 표시
            fn_hanValue(amount) {

                const koreanUnits = ['', '만', '억', '조']
                let han_amount = parseInt(amount.split(',').join(''))   // 원 단위 화면
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

                this.buyAm_han =  (answer + "원").replace(" 원","원")
                return (answer + "원").replace(" 원","원")
            }
        }
    }
</script>