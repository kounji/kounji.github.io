<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 손익분석 > 상각비 > 농기계 상각 상세
* @ 페이지설명 : 농기계 상각 상세
* @ 파일명     : src/views/page/SZ/FP/SZFP2106/SZFP2106.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-06-07
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-06-07			  CS515897			    최초작성
*************************************************************************/
-->
<template>
<!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>농기계 상각 상세</h1>
		</div>
		<!-- 20210823 한별 수정 S -->		
		<div class="popup_content com_no_bottom com_bg_type00">
            <div class="com_inner com_inputarea_type07 original">
                <div class="com_input_type01">
                    <label for="com_input01"><span class="txt_label">농기구</span></label>
                    <input type="text" id="fmachDsnm" class="input_right" name="fmachDsnm" :value="this.fmachDsnm" readonly placeholder="" title="농기구">
                </div>
                <div class="com_input_type01 com_word1">
                    <label for="com_input02"><span class="txt_label">내용연수</span></label>
                    <input type="tel" id="cntnYrcn" class="com_input02" name="cntnYrcn" :value="this.cntnYrcn" readonly placeholder="" title="내용연수">
                    <div class="del_txt">
                        <a href="javascript:void(0);" class="com_btn_delete2" style="display: none;"><span class="blind">삭제</span></a>
                        <span class="com_inputtxtright2">년</span>
                    </div>
                </div>
				<div class="titbox_type01 style_up">
					<!-- <strong class="com_txt_sub01">작목 비율 설정</strong> -->
                    <strong class="com_txt_sub01">사용비율</strong>
					<span class="btn_area">
						<!-- <a href="javascript:void(0);" class="com_btnround_type04"><span>추가</span></a>
						<a href="javascript:void(0);" class="com_btnround_type04"><span>삭제</span></a> -->
					</span>
				</div>
                <!-- 작목 목록-->
                <div id="arrayUl">
                    <dl class="com_input_type03 view com_placeholder_right"  v-for="(abiCulp, index) in this.ugRtoList" :key="index"  
                        :data-naWrsLclc="abiCulp.naWrsLclc"     
                        :data-naWrsMclc="abiCulp.naWrsMclc"
                        :data-naWrsSclc="abiCulp.naWrsSclc"
                        >
                            <dt><label for="txt01">{{abiCulp.naWrsSclfnm}}</label></dt>
                            <dd class="one">
                                <div class="num">
                                    <input type="tel" :id="index" class="com_txtright_type02"  value="0" maxlength="3"  v-model="abiCulp.ugRto" placeholder=""  title="사용비율 입력" @keyup="chekNumber" @change="setVlueNanonga" readonly>
                                    <span class="com_inputtxtright type00">%</span>
                                </div>					
                            </dd>
                    </dl>
                    <!-- 나의 농장 nanonga -->
                    <dl class="com_input_type03 view com_placeholder_right" >
                        <dt><label for="txt01">나의 농장</label></dt>
                        <dd class="one">
                            <div>
                                <input type="tel" id="nanonga" class="com_txtright_type02" placeholder=""   v-model="nanonga" readonly>
                                <span class="com_inputtxtright type00">%</span>
                            </div>					
                        </dd>
                    </dl>
                </div>
                <div class="com_input_type01">
                    <label for="com_input03"><span class="txt_label">구입시기</span></label>
                    <input type="tel" id="buyDt" class="com_txtleft_type04" name="buyDt" :value="this.buyDt | dateFilter('YYYY.MM.DD')" readonly placeholder=""  title="구입시기">
                </div>
				<div class="com_input_type01 com_word1">
                    <label for="com_input04"><span class="txt_label">구입금액</span></label>
                    <input type="tel" id="buyAm" class="com_txtleft_type04" name="buyAm" :value="numberFormat(this.buyAm)" readonly placeholder=""  title="구입금액">
                    <div class="del_txt">
                        <span class="com_inputtxtright2">원</span>
                    </div>
                </div>
				<div class="com_input_type01">
                    <label for="com_input05"><span class="txt_label">제조업체</span></label>
                    <input type="text" id="mftConm" class="com_txtleft_type04 input_right" name="" :value="this.mftConm" readonly placeholder=""  title="제조업체">
                </div>
                <div class="com_input_type01">
					<label for="com_input12"><span class="txt_label">총 상각기간</span></label>
					<input type="tel" id="rdmPrdNew" class="com_txtleft_type04" name="" :value="this.rdmPrd+'개월'" readonly placeholder=""  title="상각기간">
				</div>
				<div class="com_input_type01 com_word1">
					<label for="com_input13"><span class="txt_label">월상각액</span></label>
					<input type="tel" class="com_txtleft_type04" id="mmRdmAm" name="mmRdmAm" :value="this.mmRdmAm != null ? numberFormat(this.mmRdmAm): 0 " readonly placeholder=""  title="월상각액">
					<div class="del_txt">
                        <span class="com_inputtxtright2">원</span>
                    </div>
				</div>
                <div class="com_input_type01">
					<label for="com_input14"><span class="txt_label">처분일자</span></label>
                    <!-- KHC_20210927 input class=input_right에서 class=com_txtleft_type04 으로 변경 -->
                    <template v-if="this.dpsDt != null">
                        <!-- <input type="date" id="dpsDt" name="dpsDt" readonly="readonly" placeholder="" class="com_txtleft_type04" :value="dpsDt | dateFilter('YYYY-MM-DD') " disabled> -->
                        <!-- <input type="text" id="dpsDt" name="dpsDt" readonly="readonly" placeholder="" class="input_cal_date com_txtleft_type04" :value="dpsDt | dateFilter('YYYY-MM-DD') " disabled> -->
                        <input type="text" id="dpsDt" name="dpsDt" readonly="readonly" placeholder=""  title="처분일자" class="com_txtleft_type04" :value="dpsDt | dateFilter('YYYY-MM-DD') " disabled>
                    </template>
                    <template v-else>
                        <!-- <input type="date" id="dpsDt" class="com_txtleft_type04" name="" v-model="dpsDt" date-placeholder="" disabled> -->
                        <!-- <input type="text" id="dpsDt" class="input_cal_date com_txtleft_type04" name="" v-model="dpsDt" date-placeholder="" disabled> -->
                        <input type="text" id="dpsDt" class="com_txtleft_type04" name="" v-model="dpsDt" date-placeholder=""  title="처분일자" disabled>
                    </template>
				</div>
            </div>
		</div>
		<a href="javascript:void(0);" @click="close" class="btn_close" role="button"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
	import commonMixin from '@/common/mixins/commonMixin'
	import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'

    export default {
		name : "SZFP2106",
		data: () => {
            return {
                // 변수 초기화_KHC
				fmachDsc    : "",   // 농기계구분코드
				fmachDsnm	: "",	// 농기계구분명
                cntnYrcn    : 0,    // 내용년수
                buyDt       : "",   // 구매일자
                buyAm       : 0,    // 구매금액
                mftConm     : "",   // 제조업체명
				dpsDt       : "",   // 처분일자
				rdmPrd		: "",	// 삼각기간
				mmRdmAm		: 0,	// 월상각금액
                ugRtoList   : [],   // 작목사용비율목록
                abiCulplList: [],   // 작목 목록
                naWrsLclc   : [],   // 상품분류코드(대분류)
				naWrsMclc   : [],   // 상품분류코드(중분류)
				naWrsSclc   : [],   // 상품분류코드(소분류)
                ugRto_in    : [],   // 사용비율    
                ugRtoAll    : 0,
                ugRtoNullCnt: 0,
                nanonga     : 0,
                rdmPrdNew   : ""
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
                this.inqDsc	    = param.inqDsc
                this.rdmPrd     = param.rdmPrd
                this.naWrsLclc  = param.naWrsLclc
                this.naWrsMclc  = param.naWrsMclc
                this.naWrsSclc  = param.naWrsSclc
                this.fmachDsnm  = param.fmachDsnm 
				this.getData(param)
			},
			getData(param = {}){
                // 일련번호
                this.sqno = param.sqno
                // 농기계상각상세조회 호출
                this.getFmachDprcDtlInfo(param);
            },
            // 농기계상각상세조회 
            getFmachDprcDtlInfo(param = {}){

				const config = {
					url: '/sz/fp/06r01',
					data: param
				}

				// console.log("config=", config)
				apiService.call(config).then(response => {

					this.fmachDsc	= response.fmachDsc   	    // 농기계구분코드
                    this.fmachDsnm	= response.fmachDsnm	    // 농기계구분명
                    this.cntnYrcn   = response.cntnYrcn         // 내용년수
                    this.buyDt      = response.buyDt   	        // 구매일자
                    this.buyAm      = response.buyAm    	    // 구매금액
                    this.mftConm    = response.mftConm   	    // 제조업체명
                    this.dpsDt      = response.dpsDt   	        // 처분일자
                    //this.rdmPrd		= response.rdmPrd		    // 삼각기간
                    this.mmRdmAm	= response.mmRdmAm		    // 월상각금액
                    this.ugRtoList  = response.ugRtoList 	    // 작목사용비율목록
                    
                    // 작목 나의 농가 값 초기화
                    this.ugRtoAll = 0;      // 초기화
                    for(let i=0 ; i<this.ugRtoList.length; i++){
                        this.ugRtoAll += Number(this.ugRtoList[i].ugRto);
                        this.nanonga = 100 - this.ugRtoAll;
                    }

                    // 작목 목록 없을시 
                    if(this.ugRtoList.length == 0){
                        this.nanonga = 100
                    }

                    // this.rdmPrdNew  = ""
                    // let arr = [] 
                    // if(this.rdmPrd !=null) arr = this.rdmPrd.split("/")

                    // if(arr.length > 0){
                    //     if(arr[0] != "0" && arr[0].length > 0 ){
                    //         this.rdmPrdNew = arr[0] + "년" + arr[1] + "개월";
                    //     }else{
                    //         this.rdmPrdNew = arr[1] + "개월";
                    //     }
                    // }

				})
			},
            //1000단위마다 금액 쉼표처리
            numberFormat(number){
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            },
			// 숫자만 입력
            chekNumber(e) {
                e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'') //숫자만 입력 가능하도록
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
                        modalService.alert("비율합이 100% 초과").then(() => {return});
                        e.target.value = 0;
                        return
                    }

                    this.nanonga = 100 - this.ugRtoAll;
                }
            }

		}
    }
</script>