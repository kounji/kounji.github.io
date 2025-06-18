<!--
/*************************************************************************
* @ 서비스경로 : 메인 > 프로필
* @ 페이지설명 : 메인 > 프로필
* @ 파일명     : src/views/page/CO/CO/COCO1130/COCO1130.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-07-01
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-07-01              CS515897              최초작성
* 2021-07-16              CS523299              개발완료
* 2023-07-26              CS533461              고객번호 추가(고도화)
*************************************************************************/
-->
<template>
    <div class="full_popup">
        <div class="popup_header">    
			<h1>프로필</h1>
		</div>
		<div class="popup_content com_bg_type00">
			<div class="com_inner">
				<!-- KHC_20211001 mydtSvcEntDtm 를 최초가입일시 firEntDt 로 변경 했다가 다시 원복 --> 
				<div class="com_cont_tit01"><strong>{{getUserInfo("cusnm")}}</strong>님은 <strong>{{getUserInfo("mydtSvcEntDtm") | dateFilter("YYYY년 MM월 DD일")}}</strong> 부터<br>마이데이터 서비스와 함께 하고 계십니다.</div>
				<div class="com_box_type01 form_box_type01">
					<dl>
						<dt>고객번호</dt>
						<dd>{{getUserInfo("mydtCusno")}}</dd>
					</dl>
					<dl>
						<dt>생년월일</dt>
						<dd>{{getUserInfo("usrBirth") | dateFilter("YYYY년 MM월 DD일")}}</dd>
					</dl>
					<dl>
						<dt>직업</dt>
						<dd>
							<button type="button" class="com_btnselect_type01" @click="fn_openJobDsc">
								<template v-if=" this.jobNm != '' ">
									<span>{{this.jobNm}}</span>
								</template>
								<template v-else>
									<span>미설정</span>
								</template>
							</button>
						</dd>
					</dl>
					<dl>
						<dt>가족정보</dt>
						<dd>
							<button type="button" class="com_btnselect_type01" @click="fn_openFamCn">
								<template v-if="dfamCn > 0 && dfamCn < 10">
									<span>{{dfamCn}}</span>명
								</template>
								<template v-else-if="dfamCn >= 10">
									<span>10명 이상</span>
								</template>
								<template v-else>
									<span>미설정</span>
								</template>
							</button>
						</dd>
					</dl>
					<dl>
						<dt>정보수신 동의</dt>
						<dd>
							<span class="cmm-switch custom-switch">
								<input type="checkbox" id="infDpzAgrYnBox" :checked="this.infDpzAgrYn==='1'"  v-on:click="fn_checkEvent($event)" title="정보수신 동의">
								<label for="infDpzAgrYnBox">
									<span class="txt">설정</span>
									<!-- <template v-if="(this.infDpzAgrYn ==='1') ">                                                                      
										<span role="img" class="on">동의</span>
										<span role="img" class="off">미동의</span>
									</template>
									<template v-else>
										<span role="img" class="off">동의</span>
										<span role="img" class="on">미동의</span>
									</template> -->
								</label>
							</span>
						</dd>
					</dl>
					<!-- <div class="com_input_type01">
						<input type="email" id="com_input01" class="" name="" value="" required="required" maxlength="30" placeholder="이메일 주소를 입력하세요." title="이메일 주소를 입력하세요." v-model="showEmailAdr" v-show="infDpzAgrYnReady" ref="emailAdrRef" disabled>
						<template v-if="infDpzAgrYnReady">
							<label for="com_input01"><span class="txt_label_x">이메일 확인</span></label>
						</template>
						<template v-else>
						</template>
						<div class="del_txt">
							<a href="javascript:void(0);" role="button" class="com_btn_delete2 blur" style="display: none;"><span class="blind">삭제</span></a>
						</div>
					</div> -->
				</div>
				<!-- 20211018 한별 수정 S -->
				<div class="pr">
					<strong class="com_box_tit00 mt40 mb15">권유직원/거래농축협</strong>
					<div class="com_tooltip_type02 com_tooltip_type03">
						<button class="com_btn_info">
							<em class="com_icon_info3"><span class="blind">툴팁열기</span></em>                  
							<!--!!!!!!!!!!!툴팁 화살표 관련 : 툴팁 클릭시 display : block 
								, 툴팁 닫을 때 display : none 처리 부탁드립니다!!!!!!!!!-->
							<span class="arrow" style="display:none"></span>
							<!--!!!!!!!!!!!툴팁 화살표 관련 : 툴팁 클릭시 display : block 
								, 툴팁 닫을 때 display : none 처리 부탁드립니다!!!!!!!!!-->
						</button>                          
						<div class="com_ballon_type01 com_ballon_type02" style="display:none;top:7rem !important;padding:0 2rem;">       
							<div>등록하신 권유직원과 거래농축협은 변경할 수 없습니다.<br>
								변경은 서비스 해지 후 1년이 지나면 가능합니다.
								<a href="javascript:void(0);" role="button" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
							</div> <!-- 말풍선영역 -->
						</div>
					</div>
				</div>
				<div class="com_box_type01">
					<div class="com_center pb25" v-show="this.invtEmpEnoRed === null || this.invtEmpEnoRed === '' || this.invtEmpEnoRed === 't_emp'">
						<!-- <a href="javascript:void(0);" @click.prevent="fn_openFind" class="com_btn_round"><span class="btn_go">권유직원 검색</span></a> -->
						<!-- 20211021 한별 수정 com_btn_round 에서 com_btn_round02 으로 -->
						<a href="javascript:void(0);" role="button" @click.prevent="fn_openFind" class="com_btn_round02"><span>권유직원 검색</span></a>
					</div>
					<dl class="staff_list" v-show="this.invtEmpEno != null && this.invtEmpEno != '' && this.invtEmpEno != 't_emp'  ">
						<dt>권유직원</dt>
						<dd>
							<template v-if="empEno != null && empEno != ''">
								{{empEno | maskingFilter('name')}}({{maskingData(invtEmpEno)}})
							</template>
						</dd>
					</dl>
					<dl class="staff_list">
						<dt>거래농축협</dt>
						<dd>{{brnm}}</dd>
					</dl>
				</div>
				<!--// 20211018 한별 수정 E -->
			</div>
			<div class="weather_top_default pb30">
				<strong class="com_box_tit">금융관심사 (최대4개)</strong>
				<div class="gadgets mt28" v-if="fncInteList.length>0">
					<span class="car_badge" v-for="(item, idx) in fncInteList" :key="'inte_'+idx">
						{{item.expl}}
					</span>
					<a href="javascript:void(0);" role="button" @click.prevent="fn_openFncInte" class="com_btnwrite"><span class="blind">팝업열기</span></a>
				</div>
				<a href="javascript:void(0);" role="button" @click.prevent="fn_openFncInte" v-else>
					<div class="com_box_type01 mt15">
						<span class="add_btn_ico"></span>
						<strong class="com_box_tit">관심사를 등록해 주세요.</strong>
					</div>
				</a>
			</div>
        </div>

		<!-- KHC_20210715 삭제 / 수정 버튼 동시 사용시 주석 풀고 사용 -->
		<!-- <div class="popup_footer fixed">
			<template v-if="this.mydtCusnoChk != null ">
				<div class="btn_half_box">
					<a href="javascript:void(0);" class="btn btn_grey"  @click.prevent="fn_saveUserInfo('3')" >삭제</a>
					<a href="javascript:void(0);" class="btn btn_mint"  @click.prevent="fn_saveUserInfo('2')" >수정</a>
				</div>
			</template>
			<template v-else>
				<div class="btn_half_box">
					<a href="javascript:void(0);" class="btn btn_mint"  @click.prevent="fn_saveUserInfo('1')" >등록</a>
				</div>
			</template>
		</div> -->

		<!-- KHC_20210715 삭제 없이 등록 / 수정 버튼 풀 사이즈로 사용 -->
		<div class="popup_footer fixed">
			<template v-if="this.mydtCusnoChk != null ">
				<div class="btn_full_box">
					<a href="javascript:void(0);" role="button" class="btn btn_mint"  @click.prevent="fn_saveUserInfo('2')" >저장</a>
				</div>
			</template>
			<template v-else>
				<div class="btn_full_box">
					<a href="javascript:void(0);" role="button" class="btn btn_mint"  @click.prevent="fn_saveUserInfo('1')" >등록</a>
				</div>
			</template>
		</div>

		<a href="javascript:void(0);" role="button" @click="close()" class="btn_close"><span class="blind">팝업닫기</span></a>	
    </div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
// import {isValidEmailAddr} from '@/utils/data'
import commonService from '@/service/commonService'

import COCO1131 from '@/views/page/CO/CO/COCO1131/COCO1131'
import COCO1132 from '@/views/page/CO/CO/COCO1132/COCO1132'
import COCO1133 from '@/views/page/CO/CO/COCO1133/COCO1133'
import COCO1134 from '@/views/page/CO/CO/COCO1134/COCO1134'

export default {
    name : "COCO1130",
    data: () => {
        return {
			jobDsc 				: "",	// 직업구분코드
			jobNm				: "",	// 직업구분명
			dfamCn 				: "",	// 부양가족수
			dfamCnNm			: "",	// 부양가족수 명
			fncInteCntn 		: "",	// 금융관심내용
			infDpzAgrYn			: "0",	// 정보수신동의여부
			emailAdr			: "", 	// 이메일주소
			fncInteList 		: [],	// 금융관심내용리스트(화면가공)
			// KHC_20210716 ADD
			mydtCusnoChk		: "", 	// 프로필정보 존재 여부 확인(사용중) 
			jobDscList 			: [],	// 직업구분코드리스트(화면가공)
			fncInteIvListCd 	: [],	// 투자구분코드리스트(화면가공)
			fncInteBnfitListCd 	: [],	// 혜택구분코드리스트(화면가공)
			fncInteListNew		: [],	// 금융관심내용리스트(로드시 사용)
			infDpzAgrYnReady	: false,
			invtEmpEno			: "",	// 권유직원개인번호
			empEno				: "",	// 권유직원명
			brnm				: "",	// 권유사무소이름
			invtBrc				: "",	// 권유사무소코드
			invtEmpEnoRed		: "",	// 권유직원개인번호(저장 된 내용)	
			referPage			: "",	// 호출하는 팝업화면 아이디

			// 고도화 2.0) 화면 내 이메일 ID 부분 뒷자리 3자리 마스킹 처리..
			showEmailAdr		: "",	// 마스킹 처리된 이메일주소	
        }
    },
    mounted() {
		this.initComponent()
		
		//PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        // 화면 초기화
        initComponent() {

			if(this.params != null && this.params.referPage != null){
				this.referPage = this.params.referPage;
			}

			console.log("this.referPage=", this.referPage)
            this.getData()
        },
        getData() {

            const config = {
				url : "/co/co/24r01",
				data : {
					mydtCusno : this.getUserInfo("mydtCusno")
				}
			}

			apiService.call(config).then(response => {
				// console.log("프로필 ",response)
				this.fncInteListNew = []; // 초기화 처리
				if(response.mydtCusno != null){
					this.jobDsc	= response.jobDsc || "";				// 직업구분코드
					this.dfamCn	= response.dfamCn || "";				// 부양가족수
					this.fncInteCntn	= response.fncInteCntn || "";	// 금융관심사

					// 직업구분코드에 대응 된 작업명을 
					this.jobDscList = this.getCodeList("JOB_DSC") || "";
					for(let i=0; i<this.jobDscList.length; i++) {

						if(this.jobDscList[i].comnCVal === this.jobDsc) {
							this.jobNm = this.jobDscList[i].comnCExpl;
						}
					}

					// 부양가족수  공통코드 아니기에 화면에서 직접 값 처리(COCO1132.vue에 하드코딩)
					// 금융관심사(투자 / 혜택) 
					if(this.fncInteCntn.length > 0)	{
						this.fncInteList = (this.fncInteCntn).split("|");
					}

					this.fncInteIvListCd 	= this.getCodeList("FNC_INTE_IV_DSC") || "";		// 투자공통코드			
					this.fncInteBnfitListCd = this.getCodeList("FNC_INTE_BNFIT_DSC") || ""; 	// 혜택공통코드

					for(let i=0; i<this.fncInteIvListCd.length; i++) {

						for(let m=0; m<this.fncInteList.length; m++) {

							if(this.fncInteIvListCd[i].comnCVal === this.fncInteList[m]) {
								this.fncInteListNew.push({val : this.fncInteIvListCd[i].comnCVal, expl : this.fncInteIvListCd[i].comnCExpl})
							}
						}

					}

					for(let i=0; i<this.fncInteBnfitListCd.length; i++) {

						for(let m=0; m<this.fncInteList.length; m++) {

							if(this.fncInteBnfitListCd[i].comnCVal === this.fncInteList[m]) {
								this.fncInteListNew.push({val : this.fncInteBnfitListCd[i].comnCVal, expl : this.fncInteBnfitListCd[i].comnCExpl})
							}
						}

					}
					this.fncInteList = this.fncInteListNew;
				}

				this.mydtCusnoChk 	= response.mydtCusno;
				this.infDpzAgrYn	= response.infDpzAgrYn === null ? "0" : response.infDpzAgrYn;
				this.emailAdr		= response.emailAdr;
				this.invtEmpEno		= response.invtEmpEno;	// 권유직원개인번호
				this.empEno			= response.empEno;		// 권유직원명
				this.brnm			= response.brnm;		// 권유사무소이름
				this.invtBrc		= response.invtBrc;		// 권유사무소코드
				this.invtEmpEnoRed 	= response.invtEmpEno;  // 권유직원개인번호(저장 된 내용)

				// 고도화 2.0) 이메일 마스킹 처리
				// this.showEmailAdr	= this.fn_emailAdrMasking(response.emailAdr)
				// console.log(this.showEmailAdr)

				// 입력 활성화 여부 적용
				this.fn_infDpzAgrYnReady();
			}).then(()=>{
				// 키 패드 관련 함수 정상 호출
				this.callJQueryFncExcute()
			})
		},

		// 고도화 2.0) 이메일 ID 부분 뒤 3자리 마스킹(*) 처리
		fn_emailAdrMasking(orgEmail) {
			let originEmail = orgEmail
			let emailStr = originEmail.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)
			let strLength = ""

			if(this.isNull(originEmail) || this.isNull(emailStr)) {
				return originEmail
			} else {
				// 원본 이메일 아이디부분 길이 체크
				let chkStrLength = emailStr.toString().split("@")[0].length

				if(chkStrLength > 3) {
					strLength = 2
	
					return originEmail.toString().replace(new RegExp('.(?=.{0,' + strLength + '}@)', 'g'), '*')
				} else {
					strLength = emailStr.toString().split("@")[0].length

					return originEmail.toString().replace(new RegExp('.(?=.{0,' + strLength + '}@)', 'g'), '*')
				}

			}
		},

		// 금융관심사 팝업 오픈
		fn_openFncInte() {

			const config = {
				component : COCO1133,
				params : {
					list : this.fncInteList
				}
			}

			modalService.openPopup(config).then(response => {
				// console.log(response);
				this.fncInteList = []; // 배열 초기화
				this.fncInteList = response.rspList || [];
			})
		},
		// 직업 슬라이드 팝업 오픈
		fn_openJobDsc() {
			const config = {
				renderer : {
					component : COCO1131
				},
				params : {
					selected : this.jobDsc
				}
			}
			modalService.openSlidePagePopup(config).then(response => {
				this.jobDsc = response.val || this.jobDsc
				this.jobNm	= response.expl || this.jobNm
			})
		},
		// 가족정보 슬라이드 팝업 오픈
		fn_openFamCn() {
			const config = {
				renderer : {
					component : COCO1132
				},
				params : {
					selected : this.dfamCn
				}
			}
			modalService.openSlidePagePopup(config).then(response => {
				this.dfamCn 	= response.val || this.dfamCn
				this.dfamCnNm 	= response.expl || this.dfamCnNm
			})
		},
		// KHC_20210714
		fn_saveUserInfo(trDscIn){

			// if((this.infDpzAgrYn == '' ||this.infDpzAgrYn == '1') && (this.emailAdr == null || this.emailAdr.length == 0)){
			// 	modalService.alert("이메일 주소를 입력해주세요.").then(() => {
			// 		this.$nextTick(() => {
			// 			this.$refs.emailAdrRef.focus()	
			// 		})
			// 	})
			// 	return
			// }

			//email주소 체크
			// if((this.infDpzAgrYn == '' ||this.infDpzAgrYn == '1') && !isValidEmailAddr(this.emailAdr)) {
			// 	modalService.alert("이메일 주소를 정확히 입력해주세요.").then(() => {
			// 		this.$nextTick(() => {
			// 			this.$refs.emailAdrRef.focus()	
			// 		})
			// 	})
			// 	return
			// }

			// 필수가 아님
			// if(this.invtEmpEno == null || this.invtEmpEno == '' ){
			// 	modalService.alert("권유직원을 입력해주세요.")
			// 	return;
			// }

			// 정보수신 미동의 시 이메일 주소 초기화 처리
			// 고도화 2.0) 정보수신 미동의 시에도 이메일 주소 초기화하지 않음
			// if(this.infDpzAgrYn == '0'){
			// 	this.emailAdr = "";
			// }

			if(event.target.className.indexOf("btn_off") != -1) return false
			this.fncInteCntn = ""; // 초기화

			for (let k=0; k < this.fncInteList.length; k++) {
				if(k+1 != this.fncInteList.length){
					this.fncInteCntn = this.fncInteCntn + this.fncInteList[k].val + "|";
				}else{
					this.fncInteCntn = this.fncInteCntn + this.fncInteList[k].val ;
				}
			}

			const config0 = {
                url : "/co/co/24s01",
                data : {
                    trDsc		: trDscIn ,        						// 거래구분 코드 저장:1 , 수정:2, 삭제:3
                    mydtCusno 	: this.getUserInfo("mydtCusno"),        // 마이데이터고객번호
                    jobDsc   	: this.jobDsc,                          // 직업구분코드
                    dfamCn 		: this.dfamCn,                 			// 부양가족수
					fncInteCntn	: this.fncInteCntn,   					// 금융관심내용 // 재 확인 필요 
					infDpzAgrYn	: this.infDpzAgrYn,   					// 정보수신동의여부 
					emailAdr	: this.emailAdr,   						// 이메일주소

					invtEmpEno	: this.invtEmpEno,   					// 권유직원개인번호
					invtBrc		: this.invtBrc,   						// 권유사무소코드
					empEno		: this.empEno,   						// 권유직원명
					brnm		: this.brnm,   							// 권유사무소이름
				}
			}

			apiService.call(config0).then(response => {

				const rspC = response.rspC

				if(rspC === "0000" && trDscIn == "1") {
					modalService.alert("저장되었습니다.").then(() => {
						this.mydtCusnoChk = this.mydtCusno;
						if( this.referPage != 'PDPD1108'){
							this.movePage('MA')
						}
						this.close(true)
					});
				}else if(rspC === "0000" && trDscIn == "2") {
					modalService.alert("수정되었습니다.").then(() => {
						if( this.referPage != 'PDPD1108'){
							this.movePage('MA')
						}
						this.close(true)
					});
				}else if(rspC === "0000" && trDscIn == "3") {
					modalService.alert("삭제되었습니다.").then(() => {
						this.mydtCusnoChk = this.mydtCusno;
						this.getData()
					});
				} else {
					modalService.alert("처리 중 오류가 발생하였습니다.").then(() => {});
					this.getData()
				}
				
			})

		},
		// 이동 할 페이지
		movePage(type) {

			const config = {
				name: this.getMovePageName(type)
			}
			commonService.movePage(config)
		},
		// 등록(저장) 버튼 눌러서 페이지 이동시 이동할 화면 이름 리턴
		getMovePageName(type) {
			// if (type === 'PDMY') return 'PDMY1101' // 나의목표
			// if (type === 'PDPD') return 'PDPD1101' // 상품추천
			// if (type === 'PDCA') return 'PDCA1101' // 자동차
			if (type === 'AC')   return 'ASTA4001' // 자산(나의자산 > 자산) => ASAC1001 => ASTA2001 => ASTA4001 변경 20250327
			if (type === 'MA')   return  'MAMA4001' // 상호금융 NH콕마이데이터 4.0 추진 개발 자산 메인 MAMA2001 => MAMA4001 
			
			return ''
		},
		// 정보수신 동의 여부 관련 처리
		fn_checkEvent(e){

			if (e.target.checked) { 
				this.infDpzAgrYn = "1";
            } else{
				this.infDpzAgrYn = "0";
			}

			this.fn_infDpzAgrYnReady();
		},
		// 이메일 입력박스 활성화 비활성화
		fn_infDpzAgrYnReady(){

			if(this.infDpzAgrYn === "1"){
				this.infDpzAgrYnReady = true;
			}else{
				this.infDpzAgrYnReady = false;
			}
		},
		// 권유직원 찾기 팝업 오픈(KHC_20211018)
		fn_openFind() {

			const config = {
				component : COCO1134,
				params : {

				}
			}

			modalService.openPopup(config).then(response => {

				this.invtEmpEno 	= response.invtEmpEno;
				this.empEno 		= response.empEno;
				this.invtBrc		= response.invtBrc;
				this.invtEmpEnoRed  = "";
				//this.brnm 			= response.brnm; // 권유사무소이름 값 변경하면 안됨.
			})
		},
		maskingData(sVal) {
			if(sVal && sVal.length >= 2){
				if(sVal.length == 2) {
					return sVal.slice(0,-1) + "*"
				} else {
					var maskText2 = ""
					for(var j=2 ; j<sVal.length-2 ; j++){
						maskText2 += "*"
					}
					return sVal.substr(0,2) + maskText2 + sVal.substr(sVal.length-2);
				}
			} else {
				return;
			}
		},
    },
    components : {
    }
}
</script>