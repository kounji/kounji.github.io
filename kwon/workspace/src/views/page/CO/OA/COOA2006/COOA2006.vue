<!--
/*************************************************************************
* @ 서비스경로 : 자산연결 > 농기계 > 농기계 > 농기계 등록
* @ 페이지설명 : 상각 등록
* @ 파일명     : src/views/page/CO/OA/COOA2006/COOA2006.vue
* @ 작성자     : CS523299
* @ 작성일     : 2021-08-19 
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-19              CS523299              최초작성   
* 2022-08-18              CS528061              고도화 및 파일명 변경(SZST2109 -> COOA2006)
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>농기계</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<div class="custom_box">
					<!-- 검색 영역 -->
					<button type="button" class="com_btn_select com_iconstar" title="농기계를 설정해주세요" @click="fn_openSzPop()">
						<template v-if="this.fmachDsnm == ''">
                            <span>농기계를 설정해 주세요.</span>
                        </template>
                        <template v-else>
                            <span>{{fmachDsnm}}</span>
                        </template>
					</button>
					<!--// 검색 영역 -->

					<!-- 내용연수 -->
					<div class="com_inputarea_type07">
						<div class="com_input_type01 com_word1 mb0">
							<label for="cntnYrcn"><span class="txt_label">내용연수</span></label>
							<input type="tel" id="cntnYrcn" class="" name="cntnYrcn" value="" readonly placeholder="" title="내용연수"><!--  20211112 한별 접근성 추가 (title="") -->
							<div class="del_txt">
								<a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
                                <span class="com_inputtxtright2">{{cntnYrcn}}</span>
								<span class="com_inputtxtright2">년</span>
							</div>
						</div>
					</div>
					<!--// 내용연수 -->

					<!-- 구입시기를 설정해 주세요 -->
					<div class="com_input_type01 com_word2 mt40 mb0" role="button" :aria-label="'필수입력, 구입시기 '+buyDt+', 구입시기 선택'" ><!-- 22-10-20 접근성 aria 추가-->
						<input type="text" data-popup="alert_popup" readonly id="buyDt" class="input_cal_date com_txtright_type01 tar" name="" value="" 
                                required="" placeholder="구입시기를 설정해 주세요" title="구입시기를 설정해 주세요" aria-hidden="true"
                                v-model="buyDt" @click="fn_popupCalendar($event)" @keyup="moveNextTag($event)">
						<label for="buyDt">
							<em><span class="blind">필수입력</span></em>
							<span class="txt_label_x">구입시기</span>
						</label>
					</div>
					<!--// 구입시기를 설정해 주세요 -->
				
					<!-- 구입금액을 입력해 주세요 -->
					<div class="com_input_type01 com_word1 mt40 mb0">
						<input type="tel" id="buyAm" name="buyAm" value="" maxlength="13" required="" placeholder="구입금액을 입력해 주세요" title="구입금액을 입력해 주세요"
                                v-model="buyAm"  ref="buyAm" @input="chekNumber" @keyup="chekNumber" @keyup.enter="moveNextTag($event)">
						<label for="buyAm">
							<em><span class="blind">필수입력</span></em>
							<span class="txt_label_x">구입금액</span>
						</label>
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
							<span class="com_inputtxtright2 style01">원</span>
						</div>
						<p class="com_sum">{{fn_hanValue(buyAm)}}</p>
						<div class="btn_price_group">
							<button type="button" class="btn_price" @click.prevent="addMoney(5)">+<strong>5</strong>만</button>
							<button type="button" class="btn_price" @click.prevent="addMoney(10)">+<strong>10</strong>만</button>
							<button type="button" class="btn_price" @click.prevent="addMoney(100)">+<strong>100</strong>만</button>
							<button type="button" class="btn_price" @click.prevent="addMoney(1000)">+<strong>1000</strong>만</button>
						</div>
					</div>
					<!--// 구입금액을 입력해 주세요 -->
				
					<!-- 제조업체를 입력해 주세요 -->
					<div class="com_input_type01 mt30 mb0">
						<input type="text" id="mftConm" name="mftConm" value="" maxlength="20" required="" placeholder="제조업체를 입력해 주세요" title="제조업체를 입력해 주세요" v-model="mftConm">
						<label for="mftConm">
							<span class="txt_label_x">제조업체</span>
						</label>
						<div class="del_txt">
							<a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
						</div>
					</div>
					<!--// 제조업체를 입력해 주세요 -->

					<!-- 작목 비율 설정 -->
					<div class="titbox_type01 style_up mt49">
						<strong class="com_pop_tit01">작목 비율 설정</strong>
						<span class="btn_area">
						</span>
					</div>
                    <!-- 작목 목록 -->
					<div class="com_inputbox_area01">
                        <!-- 나의 농장 -->
                        <dl class="com_input_type03 com_placeholder_right">
							<dt><label for="nanonga">나의농장</label></dt>
							<dd class="one">
								<div>
									<input type="tel" id="nanonga" class="com_txtright_type02-1" name="" value="" placeholder="사용 비율을 입력해주세요" title="사용 비율을 입력해주세요" v-model="nanonga" readonly>
									<span class="com_inputtxtright type02">%</span>
                                    <div class="del_txt">
                                        <a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
                                    </div>
								</div>
							</dd>
						</dl>
                        <!-- // 나의 농장 -->
						<dl class="com_input_type03 com_placeholder_right" v-for="(abiCulp, index) in this.itemList" :key="index" ref="abiculp"
                                :data-naWrsLclc="abiCulp.naWrsLclc" 
                                :data-naWrsMclc="abiCulp.naWrsMclc"
                                :data-naWrsSclc="abiCulp.naWrsSclc">
							<dt><label :for="'abiCulp_'+index">{{abiCulp.naWrsSclfnm}}</label></dt>
							<dd class="one">
								<div>
									<input type="tel" :id="'abiCulp_'+index" class="com_txtright_type02-1" name="" value="" maxlength="3" placeholder="사용 비율을 입력해주세요" title="사용 비율을 입력해주세요"
                                            @input="chekNumber_abiCulp" @change="setVlueNanonga" @keyup.enter="moveNextTag($event)" ref="ratio">
									<span class="com_inputtxtright type02">%</span>
                                    <div class="del_txt">
                                        <a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
                                    </div>
								</div>					
							</dd>
						</dl>
					</div>
					<!--// 작목 비율 설정 -->

					<!-- 작목 비율 설정 안내 글 -->
					<ul class="bl_dot_list farm_list mt11">
						<li>작목은 설정 &gt; 작목/재배지 관리에서 먼저 설정되어야 노출 됩니다.</li>
						<li>
							작목 비율은 합이 100%가 되도록 작성 됩니다.<br>
							(작목 비율을 0%로 지정 시 자동으로 나의농장이 
							100%로 입력되고 상각계산 시 선택한 작목 비중은 포함되지
							않습니다.)
						</li>
					</ul>
					<!--// 작목 비율 설정 안내 글 -->
					<!-- 마이농가에 추가 -->
					<div class="sortable_list">
						<div class="list_item mt20">
							<span class="list_item_tit">마이농가에 추가</span>
							<span class="cmm-switch custom-switch">
								<input type="checkbox" id="asetTrryDsc" ref="asetTrryDsc" role="switch"><!-- 22-10-21 role 추가 -->
								<label for="asetTrryDsc"><em class="blind">마이농가선택</em></label>
							</span>
						</div>
					</div>
					<!--// 마이농가에 추가 -->
				</div>
			</div>
		</div>
		
		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" role="button" class="btn btn_mint" @click.prevent="fn_saveDprcInfo()" aria-disabled="false">등록</a>
				<!-- btn_off 제거시 활성화 -->
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="closeAllData(true)"><span class="blind">팝업닫기</span></a>		
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
    import COCO2201 from '@/views/page/CO/CO/COCO2201/COCO2201'

    export default {
        name : "COOA2006",
        data: () => {
            return {
                // 변수 초기화_KHC
                fmachDsc    : "",   // 농기계구분코드
                fmachDsnm   : "",   // 농기계구분명
                cntnYrcn    : null, // 내용년수
                buyDt       : "",   // 구매일자
                buyAm       : "",   // 구매금액(as-is는 null로 정의)
                buyAm_han   : "",   // 구매금액(한글)
                mftConm     : "",   // 제조업체명
                dpsDt       : "",   // 처분일자
                itemList    : [],   // 작목목록
                abiCulplList: [],   // 작목사용비율목록
                naWrsLclc   : [],   // 상품분류코드(대분류)
				naWrsMclc   : [],   // 상품분류코드(중분류)
				naWrsSclc   : [],   // 상품분류코드(소분류)
                ugRto_in    : [],   // 사용비율    
                ugRtoAll    : 0,
                ugRtoNullCnt: 0,
                nanonga     : 0, 
                asetTrryDsc : ""    // 자산영역구분코드
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
                    url: '/sz/st/12ra1',
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

                let abiculp = this.$refs.abiculp
                if(abiculp == null){
                    this.nanonga = 100;
                }
            },
            fn_saveDprcInfo() {
                let abiculp = this.$refs.abiculp
                let ratio = this.$refs.ratio

                this.abiCulplList = []  // 초기화
                this.ugRtoAll = 0;      // 초기화
                this.ugRtoNullCnt = 0;  // 초기화

                if(abiculp != null) {
                    for(let i=0; i<abiculp.length ; i++){
                        let modDepositObj = {};
                        modDepositObj.naWrsLclc = abiculp[i].dataset['nawrslclc'];
                        modDepositObj.naWrsMclc = abiculp[i].dataset['nawrsmclc'];
                        modDepositObj.naWrsSclc = abiculp[i].dataset['nawrssclc'];
                        this.ugRtoAll += Number(ratio[i].value);

                        if(ratio[i].value.length == 0){
                            this.ugRtoNullCnt++; 
                        }

                        modDepositObj.ugRto = ratio[i].value;
                        this.abiCulplList.push(modDepositObj);
                    }
                }
                

                // 필수 체크(작목에 대한 비율 ugRtoNullCnt 우에서 먼저 체크 값 세팅하고 체크 진행) 
                if(!(this.fn_valueChek())) return;

                 // 구매금액 별도 처리
                if (String(this.buyAm).indexOf(",") > -1){
                    this.buyAm = this.buyAm.split(",").join("")
                } 

                const config = {
                    url : '/sz/st/09ia1',
                    data: {
                        mydtCusno   : this.getUserInfo('mydtCusno'),                            // 마이데이터고객번호
                        fmachDsc    : this.fmachDsc,                                            // 농기계구분코드  this.fmachDsc
                        cntnYrcn    : this.cntnYrcn,                                            // 내용년수
                        buyDt       : this.buyDt.split("-").join(""),                           // 구매일자
                        buyAm       : this.buyAm,                                               // 구매금액
                        mftConm     : this.mftConm,                                             // 제조업체명
                        dpsDt       : this.fmdpsDtachDsc,                                       // 처분일자
                        fmachDsnm   : this.fmachDsnm,				                            // 농기계구분명(신규 추가 필드)
                        itemList    : this.abiCulplList,                                        // 작목사용비율목록
                        asetTrryDsc : this.$refs['asetTrryDsc'].checked === true ? '03' : '02'  // 자산영역구분코드(기타자산에서 등록할 경우 : 02.기타자산, 03.기타자산+마이농가자산)
                    }
                }

                apiService.call(config).then(response => {
                    // 저장 성공시
                    if(response.rspC == "0000") {
                        this.openSuccess()
                        /*
                        modalService.alert("저장되었습니다.").then(() => {
                            this.close(response)
                        });
                        */
                    }
                })
            }, 
            // 농기계 등록 성공시 다음 팝업 오픈
            openSuccess() {
                const config = {
                    component : COCO2201,
                    params : {
                        titlTxt     : "농기계",
                        subTxt      : "농기계",
                        isAdd       : false,
                        isRlAsset   : true,
                        // popId       : this.popId,
                        assetId     : "Agri",
                        stsDsc      : "I",
                    }
                }
                modalService.openPopup(config).then(response => {
                    console.log("농기계 추가등록 ", response)
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
                for(let i=0; i<ratio.length ; i++){
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
            },
            addMoney(money) {
                let tmpBuyAm = Number(this.buyAm.split(",").join(""));
                
                tmpBuyAm += money * 10000;

                // 최대 금액 9,999,999,999 이상인 경우 최대값 고정
                if(tmpBuyAm >= 9999999999) {
                    tmpBuyAm = 9999999999;
                }
                this.buyAm = String(tmpBuyAm);
                this.addComma();
            },
        }
    }
</script>