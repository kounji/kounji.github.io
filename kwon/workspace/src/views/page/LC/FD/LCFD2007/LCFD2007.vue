<!--
/*************************************************************************
* @ 서비스경로 : 하단메뉴 > 지출분석 > 금융달력 > 수입/지출 내역 추가
* @ 페이지설명 : 하단메뉴 > 지출분석 > 금융달력 > 수입/지출 내역 추가
* @ 파일명     : src/views/page/LC/FD/LCFD2007/LCFD2007.vue
* @ 작성자     : CS515901
* @ 작성일     : 2021-06-09
************************** 수정이력 ****************************************
*	날짜                    작업자					변경내용
*_________________________________________________________________________
*	2021-06-09              CS515901				최초작성
*	2021-10-18				CS515731				달력 팝업으로 변경(IOS처리를 위하여)
*   2022-08-23              CS528061                고도화 및 파일명 변경(LCFD1001 -> LCFD2007)
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<!-- 수입·지출 내역 추가 -->
			<h1>{{asetCtgrDsc == '1'?'수입 내역 추가':'지출 내역 추가'}}</h1>
			<!-- //수입·지출 내역 추가 -->
			<a href="javascript:void(0);" class="btn_back" @click.prevent="close()"><span class="blind">이전화면</span></a>
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<div class="com_input_type01 com_word1">
					<input type="tel" id="LC-FD-01-01" class="input_right" :class="tram.length > 0 ? 'focusON focusforce ' : ''" required="" maxlength="17" placeholder="금액을 입력해주세요." 
                            title="금액을 입력해주세요." v-model="tram" @keyup="addComma(), tram.length>0 ? moveNextTag($event):''" @input="fn_setVisible('sec1')" ref="tram">
					<label for="LC-FD-01-01">
						<em><span class="blind">필수입력</span></em>
						<span class="txt_label_x">금액</span>
					</label>
					<div class="del_txt">
						<a href="javascript:void(0);" class="com_btn_delete2 blur" @click="fn_inputDel('tram')" v-show="tram.length > 0"><span class="blind">삭제</span></a>
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
				<div class="com_btnselectbox_type01" v-show="vis_sec1">
					<button type="button" v-if="asetCtgrDsc === '1'" class="com_btnselect_type01 com_iconstar" title="카테고리 선택" @click="selectCategory('1')" ref="selectCategory">
                        <em class="blind">필수입력</em><span>{{asetAmnCtgrId == '' ? '카테고리를 선택하세요.' : ctgrnm}}</span>
                    </button>
                    <button type="button" v-if="asetCtgrDsc === '2'" class="com_btnselect_type01 com_iconstar" title="카테고리 선택" @click="selectCategory('2')" ref="selectCategory">
                        <em class="blind">필수입력</em><span>{{asetAmnCtgrId == '' ? '카테고리를 선택하세요.' : ctgrnm}}</span>
                    </button>
				</div>
				
                <!-- 수입 지출 -->
				<div class="com_input_type01" v-show="vis_sec2">
					<input type="text" id="LC-FD-06-02" v-if="asetCtgrDsc === '1'" class="" :class="trCntn.length > 0 ? 'focusON focusforce' : ''" name="trCntn" :value="trCntn" 
                            required="" placeholder="수입 내용을 입력하세요." title="수입 내용을 입력하세요." maxlength="40" @keyup="moveNextTag($event), fn_checkWord($event, 40, 'trCntn'), fn_setVisible('sec3')" ref="trCntn">
                    <input type="text" id="LC-FD-06-02" v-else class="" :class="trCntn.length > 0 ? 'focusON focusforce' : ''" name="trCntn" :value="trCntn" 
                            required="" placeholder="지출 내용을 입력하세요." title="지출 내용을 입력하세요." maxlength="40" @keyup="moveNextTag($event), fn_checkWord($event, 40, 'trCntn'), fn_setVisible('sec3')" ref="trCntn">
					<label for="LC-FD-06-02">
						<em><span class="blind">필수입력</span></em>
						<span class="txt_label_x">{{asetCtgrDsc == '1' ? '수입' : '지출'}} 내용</span>
					</label>
					<div class="del_txt">
						<a href="javascript:void(0);" class="com_btn_delete2" style="display: none;" @click="fn_inputDel('trCntn')" v-show="trCntn.length > 0"><span class="blind">삭제</span></a>
					</div>
				</div>
				<!-- //수입 지출 -->

				<!-- 날짜 -->
				<div class="com_input_type01 com_word2" role="button" v-show="vis_sec3" @click.prevent="fn_setVisible('sec4'), fn_popupCalendar($event)">
					<input type="text" id="LC-FD-06-03" data-popup="alert_popup" readonly class="input_cal_date com_txtright_type01 tar" :class="trDtm.length > 0 ? 'focusON focusforce' : ''" 
                            required="" data-placeholder="날짜를 선택하세요." title="날짜 선택" v-model="trDtm" 
							:aria-label="`${trDtm.substr(0,4)+'년 '+trDtm.substr(5,2)+'월 '+trDtm.substr(8,2)+'일'}`">
					<label for="LC-FD-06-03">
						<em><span class="blind">필수입력</span></em><span class="txt_label_x">날짜</span>
					</label>
                    <div class="del_txt">
						<a href="javascript:void(0);" class="com_btn_delete2 " @click="fn_inputDel('trDtm')"><span class="blind">삭제</span></a>
					</div>
				</div>
                <!-- //날짜 -->

                <!-- 메모 -->
				<div class="com_textarea_type01 com_no_iconstar" v-show="vis_sec3">
					<textarea name="memoCntn" id="txt00" class="com_txtarea_type01" cols="10" rows="5" required placeholder="메모를 입력하세요. (선택)" title="메모를 입력하세요. (선택)"
							v-show="vis_sec4" :value="memoCntn" maxlength="100" @keyup="fn_checkWord($event, 50, 'memoCntn')" ref="memoCntn"></textarea>
					<label for="txt00"><span class="txt_label_x">메모</span></label>
				</div>
                <!-- //메모 -->

                <!-- 설정 -->
				<div class="com_setlist_type01" v-show="vis_sec4">
					<strong class="com_pop_tit01 set">설정</strong>	
					<dl class="com_line">
						<dt>
							<p>마이농가 {{asetCtgrDsc==='1'?'수입':'지출'}}에 추가</p> 
							<span v-if="myFhsCtgrid !== ''">{{myFhsCtgrnm}} > {{naWrsSclfnm}}</span>
						</dt>
						<dd>
							<span class="com_btn_switch">
								<input type="checkbox" id="check02" @click="myNongAdd()" ref="my_check01" :aria-label="`${'마이농가 '+(asetCtgrDsc==='1'?'수입':'지출')+'에 추가 선택'}`">
								<label for="check02" aria-hidden="true"><!--  20211108 한별 접근성 추가 (aria-hidden="true") -->
									<span class="txt">선택</span>
									<span role="img" class="on">선택</span>
									<span role="img" class="off">해제</span>
								</label>
							</span>
						</dd>
					</dl>
				</div>
                <!-- //설정 -->
			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" class="btn btn_mint" @click="addAsset()">확인</a>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click="closeAll"><span class="blind">팝업닫기</span></a>	
	</div>
	<!--// full popup E -->
</template>
<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'

import {keyupNumFormat} from '@/utils/number'
import {dateFormat} from '@/utils/date'
import {checkWord} from '@/utils/data'
import apiService from '@/service/apiService'

import LCFD2004 from '@/views/page/LC/FD/LCFD2004/LCFD2004'
import LCFD2006 from '@/views/page/LC/FD/LCFD2006/LCFD2006'

export default {
    name : "LCFD2007",
    data: () => {
        return {
            asetAmnCtgrId   : "",
            ctgrnm          : "",

			asetCtgrDsc     : "",       // 자산카테고리 구분코드 1:수입, 2:지출, 3:이체
			
			tram : "",					// 거래금액
			trCntn : "",				// 거래내용
			trDtm : "",					// 거래일시
			memoCntn : "",				// 메모내용

			selectDate : "",

			myFhsCtgrid : "",
			myFhsCtgrnm : "",
			naWrsLclc : "",
			naWrsMclc : "",
			naWrsSclc : "",
			naWrsSclfnm : "",

			vis_sec1 : false,
			vis_sec2 : false,
			vis_sec3 : false,
			vis_sec4 : false,
			smTrplXpsCtgrChgYn : "0",	// 같은 지출 카테고리 적용 여부

			today : dateFormat(new Date(), "YYYY-MM-DD"),
        }
    },
    mounted() {
		this.initComponent()
        //PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
		
        setTimeout(() => {
            this.$refs.tram.focus()
        }, 100)
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
			this.asetCtgrDsc = this.modalConfig.param.assetFlag || ""
			this.trDtm = this.modalConfig.param.selectDate || ""
			console.log("선택된 날짜 확인",this.modalConfig.param.selectDate)
            if(this.asetCtgrDsc === ""){
                modalService.alert("수입/지출 추가가 선택되지 않았습니다.")
                this.close()
            }
			
        },
		selectCategory(flag){
			const config = {
				params: { // 파라미터
						title 		 : "자산카테고리",
						asetCtgrLclc : "1" ,	//자산카테고리대분류코드 1:지출, 2:마이농가
						asetCtgrDsc  : flag,		//자산카테고리구분코드   1:수입, 2:지출, 3:이체
						asetAmnCtgrId: this.asetAmnCtgrId,
						smTrplXpsCtgrChgYn: this.smTrplXpsCtgrChgYn,
						reqPage	 : "LCFD2007"
				},
				renderer: {
					component: LCFD2004
				}
			}

			modalService.openSlidePagePopup(config).then(response => {
				this.asetAmnCtgrId = response.asetAmnCtgrId
				this.ctgrnm = response.ctgrnm
				this.smTrplXpsCtgrChgYn = response.smTrplXpsCtgrChgYn
				console.log(response)
				this.fn_setVisible('sec2')
				this.$nextTick(() => {
					this.$refs.trCntn.focus()
				})
			})
		},
		// 글자수 체크
		fn_checkWord(event, maxByte, str) {
			let rtnObj = checkWord(event.target.value, maxByte)

			if(str == 'trCntn') {

				if(rtnObj.flag) {this.$refs.trCntn.blur()}   // 알럿 중복 방지
				event.target.value = rtnObj.value
				this.trCntn = event.target.value
			} else if(str == 'memoCntn') {

				if(rtnObj.flag) {this.$refs.memoCntn.blur()}   // 알럿 중복 방지
				event.target.value = rtnObj.value
				this.memoCntn = event.target.value
			}
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
        addComma() {
            if(this.tram.length == 1 && this.tram == 0) {
                this.tram = this.tram.slice(0, -1)
            } else {
                this.tram = this.tram.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                this.tram = this.tram.split(",").join("")
                this.tram = keyupNumFormat(this.tram)
            }
		},
        addDate(item) {
            switch(item) {
                case "trDtm" :
                    this.trDtm = this.chngDateFormat(this.trDtm)
                    break;
            }
		},
		// 날짜형식변경
        chngDateFormat(str) {
            let rtnStr = str
            
            // 0자리일 경우 null
            // 5자리일경우 첫 4자만 사용
            // 입력한 데이터가 6자리 또는 7자리일 경우 'yyyymmdd'포맷에 맞추어준다.
            if(rtnStr.length == 0) {
                return rtnStr
            } else if(rtnStr.length == 5)  {
                rtnStr = rtnStr.slice(0, 4)
            } else if(rtnStr.length == 6) {
                if(rtnStr.slice(4, 5) == '0') {
                    rtnStr = rtnStr + '01'
                } else {
                    rtnStr = rtnStr.slice(0, 4) + '0' + rtnStr.slice(4, 5) + '0' + rtnStr.slice(5, 6)
                }
            } else if(rtnStr.length == 7) {
                rtnStr = rtnStr.slice(0, 4) + '0' + rtnStr.slice(4, 7)
            } else if(rtnStr.length > 0 && rtnStr.length < 5){
				return ""
			}
            console.log(rtnStr)
            // 입력한 월이 12보다 크면 12월31일로 설정, 00이면 1월1일로 설정
            if(rtnStr.slice(4, 6) * 1 > 12) {
                rtnStr = rtnStr.slice(0, 4) + '1231'
            } else if(rtnStr.slice(4, 6) == '00') {
                rtnStr = rtnStr.slice(0, 4) + '0101'
            }
            
            let year = rtnStr.slice(0, 4)
            let month = rtnStr.slice(4, 6)
            let maxDate = dateFormat(new Date(year, month, 0), 'YYYYMMDD')
            
            // 입력한 월의 일자가 최대 일자를 넘겼을 경우 최대일자로 설정
            if(rtnStr * 1 > maxDate * 1) {
                rtnStr = maxDate 
            }
            
            rtnStr = dateFormat(rtnStr, 'YYYY.MM.DD')

            return rtnStr
		},
        // (년월일) 숫자데이터만 허용
        chkDate(item) {
            switch(item) {
                case "trDtm" :
                    this.trDtm = this.trDtm.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
                    break;
            }
		},
		// 저장
		addAsset(){
			if(this.tram === ""){
				modalService.alert("금액을 입력해주세요.")
				return false
			} else if(this.asetAmnCtgrId === ""){
				modalService.alert( (this.asetCtgrDsc === '1'?'수입':'지출') + "카테고리를 선택해주세요.")
				return false
			} else if(this.trCntn.trim().length < 1){
				modalService.alert( (this.asetCtgrDsc === '1'?'수입':'지출') + "항목을 입력해주세요.")
				return false
			} else if(this.trDtm === "" ){
				modalService.alert("거래일자를 입력해주세요.")
				return false
			}
			let myNongInYn = '0'
			let myNongOutYn = '0'
			if(this.asetCtgrDsc === '1'){
				//수입
				if(this.$refs['my_check01'].checked){
					myNongInYn = '1'
				}
			}else{
				//지출
				if(this.$refs['my_check01'].checked){
					myNongOutYn = '1'
				}				
			}
			const config = {
				url : "/lc/fd/07i01",
				data : {
					asetCtgrDsc		: this.asetCtgrDsc ,					// 자산카테고리구분코드
					mydtCusno		: this.getUserInfo('mydtCusno') ,		// 마이데이터고객번호
					tram			: this.tram.split(',').join('') ,		// 거래금액
					asetAmnCtgrId	: this.asetAmnCtgrId ,					// 자산관리카테고리ID
					trCntn			: this.trCntn ,							// 거래내용
					trDtm			: this.trDtm.split('-').join('') ,		// 거래일시
					memoCntn		: this.memoCntn ,						// 메모내용
					myFhsRevAdtYn	: myNongInYn ,							// 마이농가수입추가여부
					myFhsXpsAdtYn	: myNongOutYn ,							// 마이농가지출추가여부
					myFhsCtgrid		: this.myFhsCtgrid ,					// MY농가카테고리ID
					naWrsLclc		: this.naWrsLclc ,						// 경제통합상품대분류코드
					naWrsMclc		: this.naWrsMclc ,						// 경제통합상품중분류코드
					naWrsSclc		: this.naWrsSclc ,						// 경제통합상품소분류코드
					bgtIncdYn		: "1" ,									// 예산포함여부
					xpsBrkExpsYn	: "1" ,									// 지출내역노출여부
					ctgrSmAplYn		: "0" ,									// 카테고리동일적용여부
					prcMchtnm		: this.trCntn,							// 처리가맹점명
					fxtmXpsYn		: "0" 									// 정기지출여부
				}
			}
			console.log(config)

			apiService.call(config).then(response => {
				console.log(response)
				console.log(response.totPrcCn)

				if(response.totPrcCn > 0){
					modalService.alert("등록 완료되었습니다.").then(() => {
						//부모창 함수 call
						this.$parent.$parent.$children[this.$parent.$parent.$children.length-1].fn_setCurrentYm(this.trDtm.split('-').join('').substr(0,4), this.trDtm.split('-').join('').substr(4,2))

						this.closeAllData('complete')
					})
					
				}else{
					modalService.alert("등록 실패하였습니다.")
				}
			})
		},
		myNongAdd(){
			console.log('날짜확인 :: 선택날짜 :: ',this.trDtm, '오늘날짜 :: ', this.today)
			if(this.trDtm.split('-').join('') > this.today.split('-').join('')){
				let msg = ""
				if(this.asetCtgrDsc === '1'){
					msg = "당일 이후로 등록한 수입내역은 마이농가에 추가할 수 없습니다."
				}else{
					msg = "당일 이후로 등록한 지출내역은 마이농가에 추가할 수 없습니다."
				}
				modalService.alert(msg)
				this.$refs['my_check01'].checked = false
				this.fn_myNonReset()
				return false
			}
			if(this.$refs['my_check01'].checked){
				this.$refs['my_check01'].checked = false
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
							asetCtgrDsc  : this.asetCtgrDsc		//자산카테고리구분코드   1:수입, 2:지출, 3:이체
						}
					}
				}

				modalService.openSlidePagePopup(config).then(response => {
					console.log(response)
					if(response === 'close'){
						this.$refs['my_check01'].checked = false
					}else{
						this.$refs['my_check01'].checked = true
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
				this.myFhsCtgrid = ""
				this.myFhsCtgrnm = ""
				this.naWrsLclc = ""
				this.naWrsMclc = ""
				this.naWrsSclc = ""
				this.naWrsSclfnm = ""
			}
		},
        // section visible 처리
        fn_setVisible(mod) {
            switch(mod) {
                case "sec1" :
					this.vis_sec1 = true
                    break
                case "sec2" :
                    this.vis_sec2 = true
                    break
                case "sec3" :
					this.vis_sec3 = true
					this.vis_sec4 = true
					break
                case "sec4" :
                    this.vis_sec4 = true
                    break
                default : 
                    break
            }
		},
		fn_selectClick(){
			if(this.tram.length > 0){
				this.$refs.selectCategory.click()
			}
			
		},
        fn_popupCalendar(evt) {
			let tmpDt = ""
			if (this.trDtm !== null && this.trDtm !== '') 
			{
				tmpDt = this.trDtm
			}else{
				tmpDt = this.today
			}
			const config = {
								pDate   : tmpDt,
								minDate : '',
								maxDate : ''
							}            
            
            modalService.calendarPopup(config).then(response => {
                
                if(response !== undefined && response !== null && response !== '')
                {
                    evt.target.value = dateFormat(response, "YYYY-MM-DD")
					this.trDtm = evt.target.value
					this.moveNextTag(evt)

					if(this.trDtm.split('-').join('') > this.today.split('-').join('')){
						if(this.$refs['my_check01'].checked){
							let msg = ""
							if(this.asetCtgrDsc === '1'){
								msg = "당일 이후로 등록한 수입내역은 마이농가에 추가할 수 없습니다."
							}else{
								msg = "당일 이후로 등록한 지출내역은 마이농가에 추가할 수 없습니다."
							}
							modalService.alert(msg)
							this.$refs['my_check01'].checked = false
							this.fn_myNonReset()
						}
					}
                }            
            })

		},
		fn_myNonReset(){
			this.myFhsCtgrid = ""
			this.myFhsCtgrnm = ""
			this.naWrsLclc = ""
			this.naWrsMclc = ""
			this.naWrsSclc = ""
			this.naWrsSclfnm = ""
		},
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
                    answer = `${modToString}${koreanUnits[index]} ` + answer
                }
                division = Math.pow(unit, ++index)
            }
            return (answer + "원").replace(" 원","원")
        },
        addMoney(money) {
            let tmpTram = Number(this.tram.split(",").join(""));
            
            tmpTram += money * 10000;

            // 최대 금액 9,999,999,999,999 이상인 경우 최대값 고정
            if(tmpTram >= 9999999999999) {
                tmpTram = 9999999999999;
            }
            this.tram = String(tmpTram);
            this.addComma();
            this.fn_setVisible('sec1')
        }


    }
}
</script>