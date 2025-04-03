<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 영농캘린더  
* @ 페이지설명 : 영농캘린더 마이농가 수입/지출 등록(POP)
* @ 파일명     : src/views/page/AN/SZ/ANSZ2001/ANSZ2001.vue
* @ 작성자     : 
* @ 작성일     : 2021-06-15
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-06-15              			           퍼블리싱 적용
* 2021-08-24              			           수정
* 2022-08-23              CS528061             고도화 및 파일명 변경(SZFC2109 -> ANSZ2001)
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<!-- 수입·지출 추가 - 현금 case -->
			<h1>{{popTitleTxt}}</h1>
			<!-- //수입·지출 추가 - 현금 case -->
			<a href="javascript:void(0);" class="btn_back" @click.prevent="closePopup"><span class="blind">이전화면</span></a>
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<div class="com_inputarea_type07">
					<!-- 수입·지출 추가 - 현금 case -->
					<div class="com_input_type01 com_word2" role="button" :aria-label="popSel === 8 ? '수입일자' : '날짜'+trDt+', '+popSel === 8 ? '수입일자' : '날짜' +'선택'" ><!-- 22-10-20 접근성 aria 추가-->
						<input type="text" id="txt01" data-popup="alert_popup" readonly required="" class="input_cal_date com_txtright_type01 tar" name="" value="" 
                                v-model="trDt" ref="trDt" data-placeholder="" title="날짜를 선택하세요." @click="fn_popupCalendar($event)" aria-hidden="true">
						<label for="txt01">
							<span class="txt_label_x">{{popSel === 8 ? '수입일자' : '날짜'}}</span>
						</label>
					</div>
					<!-- //수입·지출 추가 - 현금 case -->

					<div class="com_btnselectbox_type01" v-if="InExRegister === 'I' || InExRegister === 'E'">
						<button type="button" class="com_btnselect_type01 com_iconstar" title="카테고리 선택" @click.prevent="fn_openSlidePop1($event)">
                            <em class="blind">필수입력</em><span>{{asetCtgrDsc1.length > 0 ? asetCtgrDsc1 : '카테고리를 선택해 주세요.'}}</span>
                        </button>
					</div>

					<div class="com_btnselectbox_type01">
						<button type="button" class="com_btnselect_type01 com_iconstar" title="품목 선택" @click.prevent="fn_openSlidePop3()">
                            <em class="blind">필수입력</em><span>{{naWrs.length > 0 ? naWrs : '품목을 선택해 주세요.'}}</span>
                        </button>
					</div>

                    <!-- 마이농가-수입·지출일 경우(Start) -->
					<ul class="com_radio_chk" v-if="InExRegister === 'I' || InExRegister === 'E'">
						<li>
							<span class="btn_radio" title="현금">
								<input type="radio" name="com_check" id="com_check11" :checked="culplAreaUntC==='M'"  @input="chngSelItem('01')">
								<label for="com_check11">
									<span>현금</span>
								</label>
							</span>
						</li>
						<li>
							<span class="btn_radio" :title="popSel === '8' ? '수입내역' : '지출내역'">
								<input type="radio" name="com_check" id="com_check12" :checked="culplAreaUntC==='K'"  @input="chngSelItem('02')">
								<label for="com_check12">
									<span>{{btnTitleTxt}}</span>   
								</label>
							</span>
						</li>
					</ul>
                    <!-- //마이농가-수입·지출일 경우(End))-->

                    <!-- 마이농가-수입|지출 입력 -->
                    <template v-if="InExRegister === 'I' || InExRegister === 'E'">
                        <!-- 1.현금을 선택한 경우 -->
                        <div class="com_input_type01 com_word1" v-show="InpayMeth === '1' || ExpayMeth === '1'">
                            <input type="tel" id="com_input01" :class="tram.length > 0 ? 'focusON' : ''" name="" maxlength="17" required="" 
                                    placeholder="금액을 입력하세요." title="금액을 입력하세요." @input="addComma('tram')" v-model="tram" @keyup="moveNextTag($event)" ref="tram">
                            <label for="com_input01">
                                <em><span class="blind">필수입력</span></em>
                                <span class="txt_label_x">금액</span>
                            </label>
                            <div class="del_txt">
                                <a href="javascript:void(0);" class="com_btn_delete2" @click="fn_inputDel('tram')"><span class="blind">삭제</span></a>
                                <span class="com_inputtxtright2">원</span>
                            </div>
                            <p class="com_sum">{{fn_hanValue(tram)}}</p> 
                            <div class="btn_price_group">
                                <button type="button" class="btn_price" @click.prevent="addMoney(5)">+<strong>5</strong>만</button>
                                <button type="button" class="btn_price" @click.prevent="addMoney(10)">+<strong>10</strong>만</button>
                                <button type="button" class="btn_price" @click.prevent="addMoney(100)">+<strong>100</strong>만</button>
                                <button type="button" class="btn_price" @click.prevent="addMoney(1000)">+<strong>1000</strong>만</button>
                            </div>
                        </div>
                        <!-- //1.현금을 선택한 경우 -->

                        <!-- 2.수입·지출내역을 선택한 경우 -->
                        <div>
							<div class="com_btnselectbox_type01 ani-active"  v-if="InpayMeth === '2' || ExpayMeth === '2'" @click.prevent="fn_openSlidePop2($event)">
								<button type="button" class="com_btnselect_type01 com_iconstar" title="InpayMeth === '2' ? '수입항목 선택' : '지출항목 선택'">
									<template v-if="InpayMeth === '2' ">
										<span>{{Clu.length > 0 ? Clu : '수입 항목 노출'}}</span>
									</template>
									<template v-if="ExpayMeth === '2' ">
										<span>{{Clu.length > 0 ? Clu : '지출 항목 노출'}}</span>
									</template>
								</button>
							</div>
						</div>
                        <!-- //2.수입·지출을 선택한 경우 -->

                        <!-- 거래처 -->
                        <div class="com_input_type01">
                            <input type="text" id="com_input02" :class="trCntn.length>0?'focusON focusforce ':''" :value="trCntn" ref="trCntn" required="" @keyup="moveNextTag($event)"
                                    placeholder="거래처명 또는 임금자명을 입력해 주세요." title="거래처명 또는 임금자명을 입력해 주세요." @input="fn_checkWord($event,50, 'trCntn')" >
                            <label for="com_input02">
                                <em><span class="blind">필수입력</span></em>
                                <span class="txt_label_x">거래처</span>
                            </label>
                            <!-- <div class="del_txt">
                                <a href="javascript:void(0);" class="com_btn_delete2" @click="fn_inputDel('trCntn')"><span class="blind">삭제</span></a>
                            </div> -->
                        </div>
                        <!-- //거래처 -->
                    </template>
                    <!-- //마이농가-수입|지출 입력-->

                    <!-- 메모(퍼블 문의) -->
					<div class="com_textarea_type01 com_no_iconstar">
						<textarea id="txt10" class="com_txtarea_type01" :value="memoCntn" ref="memoCntn" cols="10" rows="3" @input="fn_checkWord($event,100, 'memoCntn')" 
                                required placeholder="메모를 입력하세요. (선택)" title="메모를 입력하세요. (선택)"></textarea>
						<label for="txt10">
                            <span class="txt_label_x">메모</span>
                        </label>
					</div>
                    <!-- //메모 -->
				</div>
			</div>
		</div>
		<div class="popup_footer fixed">
			<div class="com_btnhalfbox_type02">
                <template v-if="chkflag === '1' ">
                    <a href="javascript:void(0);" role="button" class="btn btn_mint_gray" @click.prevent="reset('1')">취소</a>
                    <a href="javascript:void(0);" role="button" class="btn btn_mint" @click.prevent="applyBtn('1')">저장</a>
                </template>
                <template v-else>
                    <a href="javascript:void(0);" role="button" class="btn btn_mint_gray" @click.prevent="reset('2')">취소</a>
                    <a href="javascript:void(0);" role="button" class="btn btn_mint" @click.prevent="applyBtn('2')">저장</a>
                </template>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="closePopup"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>
<script>
import modalService from '@/service/modalService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
//import SelectPopupCardRenderer from '@/components/renderer/SelectPopupCardRenderer'
import {keyupNumFormat} from '@/utils/number'
import {dateFormat} from '@/utils/date'
import apiService from '@/service/apiService'
import {checkWord} from '@/utils/data'

import SZFC2103 from '@/views/page/SZ/FC/SZFC2103/SZFC2103'
import SZFC2108 from '@/views/page/SZ/FC/SZFC2108/SZFC2108'
import SZFC2110 from '@/views/page/SZ/FC/SZFC2110/SZFC2110'

export default {
    name : "ANSZ2001",
    data: () => {
        return {
            popSel 		  : "",    //pop선택
            popTitleTxt   : "",    //팝업 타이틀
			btnTitleTxt   : "",    //버튼 타이틀

            year          : "",    //년도(yyyy)
            month         : "",    //월(month)

			trDt          : "",    //거래일자
			trDtm         : "",    //거래일시

            mydtCusno     : "",    //마이데이터고객번호	 
            inqYm         : "",    //조회년월(년월)

            infOfrmnOrgC  : "",    //정보제공자기관코드
            asetAmnCtgrId : "",    //자산관리카테고리ID
			ctgrnm 		  : "",    //카테고리명

            InpayMeth     : "",    //수입결제수단 
			ExpayMeth     : "",    //지출결제수단
			InExRegister  : "",    //수입지출
			asetCtgrDsc   : "",    //자산카테고리구분코드
			asetCtgrDsc1  : "",    //자산카테고리구분코드

            bsnDscnm      : "",    //업무구분코드명
			updateKey     : "",    //updateKey
			culplAreaUntC : "",    

			//****등록/	
			tram          : "",    // 거래금액
			trCntn        : "",    // 거래내용
			memoCntn      : "",    // 메모내용
            naWrsLclc     : "",    //상품분류코드(대분류)
            naWrsMclc     : "",    //상품분류코드(중분류)
            naWrsSclc     : "",    //상품분류코드(소분류)
            naWrsSclfnm   : "",    //상품소분류명
			naWrs   : "",
			Clu     : "",
			restMsg : "",
			restMsg1: "",
			msg     : "",
			chkflag : "",
			btnViewYn1 : true,
			btnViewYn2 : true,
			isbackYn : false,     
			selItem        : "",     
			selItem1        : "",     
			varAsetAmnCtgrId : "",

			today : dateFormat(new Date(), "YYYY-MM-DD")  //현재일자
        }
    },

    mixins: [
		commonMixin,
        popupMixin
	],
	
    mounted() {
		this.initComponent();

		//PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)     
    },

    methods: {
    
		initComponent() {

          this.getSearchList()
        },

		//입력필드에서 값 입력후, '검색'이미지 클릭
		getSearchList() {
            const date = new Date()
            this.year  = date.getFullYear()
			this.month = date.getMonth() + 1
			
			//this.today = new Date();
			//this.trDt = dateFormat(this.today, "YYYY-MM-DD");
			//this.trDtm = dateFormat(this.today, "YYYYMMDD HHmmss");

            //console.log('SZFC2109/today(금일자)=>>'+this.year);	
			//console.log('SZFC2109/trDt(거래일자)=>>'+this.trDtm);
			//console.log('SZFC2109/trDt(거래시간)=>>'+ dateFormat(new Date(), 'HHmm'));

            this.popSel = this.params.popSel;   	 //팝업선택
            this.mydtCusno = this.params.mydtCusno;  //마이데이터고객번호	 
            this.inqYm  = this.params.inqYm;   		 //조회년월(년월)

            console.log('[SZFC2109](변수-Param)pop팝업선택=>>'+this.popSel);	
            console.log('[SZFC2109](변수-Param)마이데이터고객번호=>>'+this.mydtCusno);	
            console.log('[SZFC2109](변수-Param)조회년월=>>'+this.inqYm);	

            this.trDt   =  dateFormat(this.params.trDt, 'YYYY-MM-DD')    //거래일자(2021.10.13(수) 추가)
			console.log('[SZFC2109]/(변수-Param)거래일자=>>'+this.trDt);

            if (this.popSel === '8') {
                this.popTitleTxt  = '마이농가 수입 등록'
				this.InExRegister = 'I'
				//this.InpayMeth    = '1'  
				this.btnTitleTxt  = '수입내역'
            } else if (this.popSel === '9') {
                this.popTitleTxt  = '마이농가 지출 등록'
				this.InExRegister = 'E'
				//this.EXpayMeth    = '1'  
				this.btnTitleTxt  = '지출내역'
            }

			this.culplAreaUntC = "M" //M;현금, K;수입내역 또는 수출내역
			console.log('[SZFC2109]SZFC2109/culplAreaUntC=>>'+this.culplAreaUntC);	

			this.chngSelItem('01')   //Tab 누르기 효과

			console.log('[SZFC2109]popTitleTxt=>>'+this.popTitleTxt);	
			console.log('[SZFC2109]InExRegister=>>'+this.InExRegister);	
			console.log('[SZFC2109]SZFC2109/btnTitleTxt=>>'+this.btnTitleTxt);	
        },

		//clickChk(flag){
		chngSelItem(flag){	

			console.log('SZFC2109/clickChk=>>'+flag);	

			if (flag === '01') {   //[현금] 선택시
				//event.target.checked = false

				//if (this.$refs['check_01'].checked) {

					console.log("현금 선택시~~~~~");	

					// this.btnViewYn2 = false    //수입내역/지출내역 enabled
					// this.btnViewYn1 = true    //수입내역/지출내역 enabled

					this.culplAreaUntC = "M" //M;현금, K;수입내역 또는 수출내역

					if (this.InExRegister == 'I') {   //수입인 경우
						this.InpayMeth = "1"    
						this.asetCtgrDsc = '1'

					} else if (this.InExRegister == 'E')  {   //지출인 경우
						this.ExpayMeth = "1" 
						this.asetCtgrDsc = '2'
					}	

					this.chkflag ='1'

					console.log("clickChk/(현금)수입/지출결제수단=>>"+this.InpayMeth, this.ExpayMeth)  
					console.log("chngSelItem/자산카테고리구분코드=>>"+this.asetCtgrDsc)  
					console.log("chngSelItem/chkflag=>>"+this.chkflag)  
					console.log("chngSelItem/btnViewYn1=>>"+this.btnViewYn1)  
					console.log("chngSelItem/btnViewYn2=>>"+this.btnViewYn2)  
				//}

			} else if( flag === '02') {  //[수입내역/지출내역] 선택시

				//if (this.$refs['check_02'].checked) {

					console.log("수입내역/지출내역 선택시~~~~~");	

					// this.btnViewYn1 = false   //현금 enabled
					// this.btnViewYn2 = true    //수입내역/지출내역 enabled

					this.culplAreaUntC = "K" //M;현금, K;수입내역 또는 수출내역

					if (this.InExRegister == 'I') {   //수입인 경우
						this.InpayMeth = "2"    
					} else if (this.InExRegister == 'E')  {   //지출인 경우
						this.ExpayMeth = "2" 
					}	
					this.chkflag ='2'

					console.log("clickChk/(수입내역/지출내역)수입/지출결제수단=>>"+this.InpayMeth, this.ExpayMeth)  
					console.log("chngSelItem/chkflag=>>"+this.chkflag)  
					console.log("chngSelItem/btnViewYn1=>>"+this.btnViewYn1)  
					console.log("chngSelItem/btnViewYn2=>>"+this.btnViewYn2)  
				//}
			}
		},

        // 금액 천단위 쉼표 표시
        addComma(str) {
            switch(str) {

				case "tram" :   //작업면적
					if(this.tram.length == 1 && this.tram == 0) {
						this.tram = this.tram.slice(0, -1)
					} else {
						this.tram = this.tram.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
						this.tram = this.tram.split(",").join("")
						this.tram = keyupNumFormat(this.tram)
					}
					break				
			}
        },

		//[취소]버튼 클릭
        reset(flag) {
			this.selItem = flag

			console.log("[SZFC2109]reset/flag=>>"+this.selItem)


			if (this.selItem === '1' || this.selItem === '2'  ) {   
				if (this.selItem === '1' ) {   
					this.restMsg = '수입 등록'
				} else if (this.selItem === '2' ) {   
					this.restMsg = '지출 등록'
				}
				this.msg = this.restMsg+' 정보는 저장되지 않습니다<br>정말로 취소하시겠습니까?'

				const config = {
					content: [this.msg],
					title  : "",
				}
				modalService.confirm(config).then(text => {
					if(text == "예") {
						this.close('complete')
					}
				})
			} else if (this.selItem === '9') {   
				this.close('complete')
			}
        },

		//[저장]버튼 클릭
        applyBtn(flag) {
			this.selItem = flag

			console.log("[SZFC2109]저장시/flag=>>"+this.selItem)
			console.log("[SZFC2109] Data :: " + this.trDt);
			console.log(dateFormat(this.trDt,'YYYYMMDD') + dateFormat(new Date(), 'HHmm'))
			console.log("[SZFC2109] 카테고리 :: " + this.asetAmnCtgrId)

			// 2021.07.21 거래일자 Validation 추가
			if (this.trDt.length == 0 || this.trDt.trim() == "") {
               modalService.alert("거래일자는 필수입력항목입니다.").then(() => {
					this.$refs.trDt.focus()
				});
				return;
			}

			if (!this.isDateValid(this.trDt)) {
                modalService.alert("거래일자의 날짜형식을 확인바랍니다.").then(() => {
					this.$refs.trDt.focus()
				});
               return;
			}

			if (Number(dateFormat(new Date, 'YYYYMMDD')) < Number(dateFormat(this.trDt, 'YYYYMMDD'))) {
				modalService.alert("거래일자는 현재일과 동일하거나, 적어야 합니다.").then(() => {
					this.$refs.trDt.focus()
				});
				return;
			}			

			if (this.asetAmnCtgrId.length == 0 || this.asetAmnCtgrId.trim() == "") {
               modalService.alert("카테고리는 필수입력항목입니다.").then(() => {
					this.$refs.asetAmnCtgrId.focus()
				});
				return;
			}			

			// 2021.07.21 품목음 대중소중에 대만 체크 해도 될꺼 같아요.
			if (this.naWrsLclc.length == 0 || this.naWrsLclc.trim() == "") {
               modalService.alert("품목은 필수입력항목입니다.").then(() => {
					this.$refs.naWrsLclc.focus()
				});
				return;
			}

			if (this.selItem === '1' ) {   //[수입/지출-현금]선택시
				console.log("[SZFC2109] 금액 :: " + this.tram)

				if (this.tram == 0) {
				modalService.alert("거래금액은 필수입력항목입니다.").then(() => {
						this.$refs.tram.focus()
					});
				return;
				}
				console.log("[SZFC2109] 거래금액 :: " + this.tram)
			}

			if (this.selItem === '2' ) {   //[수입/지출-수입내역/지출내역]선택시
				console.log("[SZFC2109] 항목 노출 :: " + this.Clu)
		
				if (this.Clu.length == 0 || this.Clu.trim() == "") {
					modalService.alert("항목 노출은 필수입력항목입니다.").then(() => {
						this.$refs.Clu.focus()
					});
					return;
				}	
			}	

			if (this.trCntn.length == 0 || this.trCntn.trim() == "") {

               modalService.alert("거래처는 필수입력항목입니다.").then(() => {
					this.$refs.trCntn.focus()
				});
               return;
			}
			console.log("[SZFC2109] 거래처 :: " + this.trCntn)


			// if (this.naWrsMclc.length == 0 || this.naWrsMclc.trim() == "") {
            //    modalService.alert("품목(중분류)는 필수입력항목입니다.").then(() => {});
            //    return;
			// }

			// if (this.naWrsSclc.length == 0 || this.naWrsSclc.trim() == "") {
            //    modalService.alert("품목(소분류)는 필수입력항목입니다.").then(() => {});
            //    return;
			// }

			//***
			if (this.selItem === '1' ) {   //[수입/지출-현금]선택시
			// 2021.07.21 저장 시 거래시간을 현재 시간으로 가져오게 수정 했습니다.
			console.log("수입/지출-현금인 경우(Insert)")

				const config = {
					url : "/sz/fc/09i01",
					data : {
						mydtCusno   : this.getUserInfo('mydtCusno'),    // 마이데이터고객번호
						trDt 	    : dateFormat(this.trDt,'YYYYMMDD'), //거래일자 = (입력)거래일자
						trDtm       :  dateFormat(this.trDt,'YYYYMMDD') + dateFormat(new Date(), 'HHmm'),  //거래일시 = (입력)거래일자+시분
						tram        : this.tram.split(",").join(""),    //거래금액 = (변수)거래금액	
						trCntn      : this.trCntn,           		    //거래내용 = (변수)거래내용(거래처) 	
						asetCtgrDsc : this.asetCtgrDsc, 			    //자산카테고리구분코드(1;수입,2;지출,3;이체)
						myFhsCtgrid : this.asetAmnCtgrId,               //마이농가카테고리ID([팝업]품목에서 값 넣어오는거 넣을 것)   주산물(SZ10000001),부산물(SZ10000002),기타외수익(SZ10000000)
						naWrsLclc   : this.naWrsLclc,				    //상품분류코드(대분류)
						naWrsMclc   : this.naWrsMclc,				    //상품분류코드(중분류)
						naWrsSclc   : this.naWrsSclc,	 			    //상품분류코드(소분류)
						memoCntn    : this.memoCntn                     //메모내용
					}
				}
				apiService.call(config).then(response => {

					if(response.rspC == '0000'){
						modalService.alert("등록 완료되었습니다.").then(() => {
							this.close('complete')
						})
					}else{
						modalService.alert("저장시 오류가 발생하였습니다.")
					}
				})

			} else if (this.selItem === '2' ) {   //[수입/지출-수입내역/지출내역]선택시

			console.log("수입/지출-수입내역/지출내역인 경우(Update)")

				const config = {
					url : "/sz/fc/09u01",
					//url : "/co/at/01r01",
					data : {

						mydtCusno   : this.getUserInfo('mydtCusno'),    // 마이데이터고객번호
						bsnDscnm 	: this.bsnDscnm,					//업무구분코드명 = (변수)업무구분코드명	2021.11.09(화) 변경
						updateKey   : this.updateKey,                   //updateKey    = (변수)updateKey   2021.11.09(화) 변경 
						myFhsCtgrid : this.asetAmnCtgrId,               //마이농가카테고리ID([팝업]품목에서 값 넣어오는거 넣을 것)   주산물(SZ10000001),부산물(SZ10000002),기타외수익(SZ10000000)
						naWrsLclc   : this.naWrsLclc,				    //(변수)상품분류코드(대분류)
						naWrsMclc   : this.naWrsMclc,				    //상품분류코드(중분류)
						naWrsSclc   : this.naWrsSclc,	 			    //상품분류코드(소분류)
						memoCntn    : this.memoCntn,                    //메모내용
						trCntn      : this.trCntn           		    //거래내용 = (변수)거래내용(거래처) 	
					}
				}
				apiService.call(config).then(response => {
					if (response.rspC == '0000') { 
						modalService.alert("등록 완료되었습니다.").then(() => {
							this.close('complete')
						})
					} else {
						modalService.alert("저장(수정)시 오류가 발생하였습니다.")
					}	 
				})
			}

			//* Close 부분
			// this.closeParam = {
            //     isbackYn :  true
            // }

            // this.close(this.closeParam)
        },

		//[닫기]버튼 클릭
        closePopup() {

			console.log(" >>> 닫기 <<<")
			console.log("[SZFC2109]chkflag=>>"+this.chkflag)

			this.reset('9')

        },

		//입력 텍스트 삭제
        delStr(colNm) {

			if (colNm == "tram") {
				this.tram = ''   //[현금]-금액(거래금액)
				this.$refs.tram.focus()
				
			} else if (colNm == "trCntn") {
				this.trCntn = ''   //[현금]-거래처(거래내용)
				this.$refs.trCntn.focus()
			}
        },

		//[수입항목지출] Slide 선택시
		fn_openSlidePop2(e) {

				console.log("[SZFC2109]fn_openSlidePop2로 들어왔나?")  
				console.log("[SZFC2109]fn_openSlidePop2/asetCtgrDsc=>>"+this.asetCtgrDsc)  

			const config = {
				params: { // 파라미터
                    mydtCusno   : this.getUserInfo('mydtCusno'),     //마이데이터고객번호 = (변수)마이데이터고객번호
                    trDt        : dateFormat(this.trDt,'YYYYMMDD'),  //거래일자 = (변수)거래일자
                    asetCtgrDsc : this.asetCtgrDsc,   				 //자산카테고리구분코드 = (변수)자산카테고리구분코드(1;수입,2;지출)	
                },

                renderer : {
                     component : SZFC2110 //수입/지출 대상 조회(POP)
                }
            };

			console.log("config", config)

            modalService.openSlidePagePopup(config).then(response => {

				//2021.11.09(화) 변경
				this.bsnDscnm = response.bsnDscnm    //(변수)업무구분코드명 = response(업무구분코드명)
				this.updateKey = response.updateKey  //(변수)updateKey = response(updateKey)
				this.Clu = response.coicTitnm        //(입력항목)선택타이틀명 = response(선택타이틀명)
				//2021.11.09(화) 변경

				console.log("[SZFC2109]fn_openSlidePop2()/response.업무구분코드명=>>"+response.bsnDscnm)  
				console.log("[SZFC2109]fn_openSlidePop2()/(변수)업무구분코드명=>>"+this.bsnDscnm)  
				console.log("[SZFC2109]fn_openSlidePop2()/response.updateKey=>>"+response.updateKey)  
				console.log("[SZFC2109]fn_openSlidePop2()/(변수)updateKey=>>"+this.updateKey)  
				console.log("[SZFC2109]fn_openSlidePop2()/response.선택타이틀명=>>"+response.coicTitnm)  
				console.log("[SZFC2109]fn_openSlidePop2()/(변수)선택타이틀명=>>"+this.Clu)  

				// 다음 항목 이동
				//this.$nextTick(()=>{
					if(e !== null) this.moveNextTag(e)
				//})				

            })
        },

		//[카테고리] Slide 선택시
		fn_openSlidePop1(e) {

			console.log("[SZFC2109]fn_openSlidePop1/asetCtgrDsc=>>"+this.asetCtgrDsc)

			const config = {
				params: { // 파라미터
                    asetCtgrDsc  : this.asetCtgrDsc,   //자산카테고리구분코드 = (변수)자산카테고리구분코드(1;수입,2;지출)	
                },

                renderer : {
                     component : SZFC2108 //수입/지출 카테고리 선택)(POP)
                }
            };

            modalService.openSlidePagePopup(config).then(response => {

				this.asetAmnCtgrId = response.asetAmnCtgrId //response.자산관리카테고리ID
				this.asetCtgrDsc1 = response.ctgrnm   //(입력필드)카테고리 = response.카테고리명

				console.log("[SZFC2109]fn_openSlidePop1()/(response)자산관리카테고리ID=>>"+response.asetAmnCtgrId)  
				console.log("[SZFC2109]fn_openSlidePop1()/(변수)자산관리카테고리ID=>>"+this.asetAmnCtgrId)  
				console.log("[SZFC2109]fn_openSlidePop1()/(response)카테고리명=>>"+this.ctgrnm)  
				console.log("[SZFC2109]fn_openSlidePop1()/(변수)카테고리명=>>"+this.asetCtgrDsc1)  

				// 다음 항목 이동
				this.$nextTick(()=>{
					if(e !== null) this.moveNextTag(e)
				})

            })
        },

        //[품목] Slide 선택시
        fn_openSlidePop3() {
            const config = {
				params : {
					mydtCusno :  this.getUserInfo('mydtCusno'),   //this.mydtCusno  //마이데이터고객번호
				},
                renderer: {
                    component: SZFC2103,
                }
			}
            modalService.openSlidePagePopup(config).then(response => {

                this.naWrsLclc   = response.naWrsLclc    //상품분류코드(대분류)
                this.naWrsMclc   = response.naWrsMclc    //상품분류코드(중분류)
                this.naWrsSclc   = response.naWrsSclc    //상품분류코드(소분류)
                this.naWrsSclfnm = response.naWrsSclfnm  //상품분류명

				console.log("[SZFC2109]fn_slidmyFarmPopOpen/(변수)상품분류코드(대/중/소)=>>"+this.naWrsLclc+this.naWrsMclc+this.naWrsSclc)  
				console.log("[SZFC2109]fn_slidmyFarmPopOpen/(변수)상품분류명=>>"+this.naWrsSclfnm)  

				// this.$refs.naWrs.value = this.naWrsSclfnm //(입력필드)품목 = (변수)상품분류명(소분류명)
				this.naWrs = this.naWrsSclfnm //(입력필드)품목 = (변수)상품분류명(소분류명)
				console.log("[SZFC2109]fn_slidmyFarmPopOpen/(변수)상품분류코드(합)=>>"+this.naWrs)  

				// // 다음 항목 이동
				// this.$nextTick(()=>{
				// 	if(e !== null) this.moveNextTag(e)
				// })
            })
		},

		fn_checkWord(event, maxByte, str) {

			if (str === "trCntn") {  //거래처	
				let rtnObj = checkWord(event.target.value, maxByte)

				if(rtnObj.flag) {this.$refs.trCntn.blur()}   // 알럿 중복 방지
				event.target.value = rtnObj.value
				this.trCntn = event.target.value
			} else if (str === "memoCntn") {  //메모	
				let rtnObj = checkWord(event.target.value, maxByte)

				if(rtnObj.flag) {this.$refs.memoCntn.blur()}   // 알럿 중복 방지
				event.target.value = rtnObj.value
				this.memoCntn = event.target.value
			}
		},

		isDateValid(chkDt){ // 날짜체크(날짜형식 및 현재날짜 이후인지)
				//날짜 형식 변경으로 인하여 변경함
				let chkDt2 = this.removeDot(chkDt).toString().split("-").join("")
				
                let year = Number(chkDt2.substr(0,4))
                let month = Number(chkDt2.substr(4,2))
                let day = Number(chkDt2.substr(6,2))
                let today = new Date()
                let currentYear = today.getFullYear()

                if (chkDt2.length <= 8)
                {
                    if ( 2000 > year || year > currentYear ){
                        return false
                    }

                    if ( 1 > month || month > 12 ){
                        return false
                    }

                    if ( 1 > day || day > 31 ) {
                        return false
                    }

                    if ((month == 4 || month == 6 || month == 9 || month == 11) && day ==31) {
                        return false
                    }

                    if(month ==2){
                        //윤달
                        let isleep = (year%4==0 && (year%100 !=0 || year%400 ==0))
                         if ( day > 29 || (day==29 && !isleep) )
                        {
                            return false
                        }
                    }
                    return true
                }else{
                    return false
                }
		},

		fn_popupCalendar(evt) {
            
            let config = {
				pDate	: evt.target.value, //this.trDt,
				minDate : '',
				maxDate : this.today

			}
            modalService.calendarPopup(config).then(response => {
                
                if(response !== undefined && response !== null && response !== '')
                {
					evt.target.value = dateFormat(response, "YYYY-MM-DD")
					this.trDt = evt.target.value

					this.moveNextTag(evt)
                }            
            })

        },		

		//입력단위 한글표기 2021.11.11(목) 추가
		fn_hanValue(amount) {
            const koreanUnits = ['', '만', '억', '조']
            let han_amount = parseInt(amount.split(',').join(''))
            let answer = ''
            let unit = 10000
            let index = 0
            let division = Math.pow(unit, index)

            while(Math.floor(han_amount / division) > 0) {
                const mod = Math.floor(han_amount % (division * unit) / division)
                if(mod) {
                    const modToString = mod.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
                    console.log("1st index : ", index)
                    answer = `${modToString}${koreanUnits[index]} ` + answer
                }
                division = Math.pow(unit, ++index)
            }
            return (answer + "원").replace(" 원","원")
        },
        // 입력된 텍스트 삭제
        fn_inputDel(type) {
            switch(type) {
                case 'tram':
                    this.tram = ""
					break
				case 'trCntn':
                    this.trCntn = ""
					break
				case 'trDtm':
                    this.trDtm = ""
					break
            }
		},
        addMoney(money) {
            let tmpTram = Number(this.tram.split(",").join(""));
            
            tmpTram += money * 10000;

            // 최대 금액 9,999,999,999,999 이상인 경우 최대값 고정
            if(tmpTram >= 9999999999999) {
                tmpTram = 9999999999999;
            }
            this.tram = String(tmpTram);
            this.addComma('tram');
        }

    },
    
	components : {
    }	

}
</script>