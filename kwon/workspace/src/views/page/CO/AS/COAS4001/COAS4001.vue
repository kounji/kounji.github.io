<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 가입 > 서비스가입
* @ 페이지설명 : 공통 > 가입 > 서비스가입
* @ 파일명     : src/views/page/CO/AS/COAS4001/COAS4001.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-02-13
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-02-13              CS541599              최초작성(COAS2002,->COAS4001)
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>서비스 가입</h1>
			<button type="button" class="prev"><span class="blind">이전</span></button>
		</div>
		
		<div class="popup_content">
			<div class="signup">
				<div class="tit_area">
					<h2 class="headline">NH콕마이데이터<br>
						(자산관리) 이용을 위해<br>
						<strong>이용약관을 확인</strong>해주세요.	
					</h2><!-- [v4.0] 25-02-11 문구수정 -->
					<!-- [v4.0] 배경이미지 로티json으로 변경 -->
					<div class="bg">
						<!--<lottie-player src="../../../../src/assets_v40/images/lottie/bg_signup.json" loop="" autoplay="" aria-hidden="true" class="bg_signup" background="transparent"></lottie-player>-->
					</div>
					<!-- //[v4.0] 배경이미지 로티json으로 변경 -->
				</div>

				<div class="agree_wrap active open"  data-ui-toggle="box">
					<div class="check_all">
						<div class="checkbox border">
							<input type="checkbox" name="allagree1" id="estlAllChk" required="" v-model="estlAgreeCheckYn" @change="allAgreeCheck($event, 'estl')" ref="estlAllChk" title="모두 동의합니다.">
							<button type="button" class="btn_detail">[필수] 모두 동의합니다.<span class="blind">상세보기</span></button>
						</div>
						<button type="button" class="view_btn" aria-expanded="true"><span class="blind">필수약관</span></button>
					</div>
					<div class="view_cont">
						<ul class="agree_list">
							<li v-for="(item, index) in estlStltArray" :key="index">
								<div class="checkbox">
                                    <input type="checkbox" name="agree1" :checked="item.checked" :id="item.stltKeyNo"
                                    :essYn="item.essYn" @change="chngAgreeValue($event, item, 'estl')" required="" :title="item.asetAmnStltTinm">
									<button type="button" class="btn_detail ico_arrow"  @click.prevent="openDtlPop(item, '1')">{{item.asetAmnStltTinm}}<span class="blind">상세보기</span></button>
								</div>
							</li>
						</ul>
					</div>
				</div>

				<div class="agree_wrap active open"  data-ui-toggle="box">
					<div class="check_all">
						<div class="checkbox border">
							<input type="checkbox" name="allagree2" id="optlAllChk" v-model="optlAgreeCheckYn" @change="allAgreeCheck($event, 'optl')" required="" ref="optlAllChk" title="[선택] 모두 동의합니다.">
							<button type="button" class="btn_detail">[선택] 모두 동의합니다.<span class="blind">상세보기</span></button>
						</div>
						<button type="button" class="view_btn" aria-expanded="true" @click.prevent="setAllAgreeCheck('optl')"><span class="blind">선택약관</span></button>
					</div>
					<div class="view_cont">
						<ul class="agree_list">
							<li v-for="(item, index) in optlStltArray" :key="index">
								<div class="checkbox">
									<input type="checkbox" name="agree2" :checked="item.checked" :id="item.stltKeyNo"
                                    :essYn="item.essYn" @change="chngAgreeValue($event, item, 'optl')" :title="item.asetAmnStltTinm">
                                    <button type="button" class="btn_detail ico_arrow" @click.prevent="openDtlPop(item, '2')">{{item.asetAmnStltTinm}}<span class="blind">상세보기</span></button>
								</div>
							</li>
						</ul>
					</div>
				</div>
                <div class="formItem">
					<div class="input">
						<label for="input03">서비스 변경 내용 수신 동의해요.</label>
						<input type="text" name="" id="input03" title="이메일 주소" v-model="email" placeholder="이메일 주소를 입력해 주세요.">
					</div>
				</div>
                <div class="formItem" v-if="respRegInfo.entYn != '1'">
					<div class="input">
						<label for="input04">거래 지점을 선택해 주세요.</label>
						<input type="text" name="" id="input04" title="거래 지점" placeholder="거래 지점을 선택해 주세요." v-model="invtBrnm" readonly>
						<button type="button" class="btns" @click.prevent="fn_srchInvtBrc()">검색</button>
					</div>
				</div>

				<div class="formItem" v-if="respRegInfo.entYn != '1'">
					<div class="input">
						<label for="input01">권유 직원이 있어요.</label><!-- [v4.0] 25-02-11 마침표추가 -->
						<input type="text" name="" id="input01" title="권유 직원 이름" :value="setEnoInfo()" readonly placeholder="이름(사번)을 입력해주세요.">
						<button type="button" class="btns" v-if="enoModYn" @click.prevent="fn_srchInvtEno()">검색</button>
					</div>
				</div>
				<!-- [v4.0] 25-02-11 마침표추가 및 위치 변경 -->
				
				<div class="formItem">
					<div class="input">
						<label for="input02">추천인 코드를 입력해 주세요.</label>
						<input type="text" name="" id="input02" title="추천인 코드" v-model="rcmCd"  placeholder="친구의 초대 코드를 입력해 주세요.">
					</div>
				</div>
				<!-- //[v4.0] 25-02-11 마침표추가 및 위치 변경 -->
				<!-- //[v4.0] 25-01-20 체크삭제/레이블 형태로 변경 -->

                <details class="ico_detail_noti" open="">
					<summary><strong>알아두세요</strong></summary>
					<div class="cont">
						<p class="txt">
							마이데이터 서비스 가입 전 신중히 고민하고,
							꼭 필요한 서비스만 가입해 주세요.
							이용하지 않는 서비스는 해지를 권장합니다.
						</p>
						<ul class="dotted_list">
							<li><a href="#nolink" class="underline" @click.prevent="fn_openBrowser('1')">내가 가입한 마이데이터 서비스 현황</a></li>
							<li><a href="#nolink" class="underline" @click.prevent="fn_openBrowser('2')">개인정보 처리방침</a></li>
						</ul>
					</div>
				</details>

			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="btns_wrap">
                <template v-if="estlAgreeCheckYn">
                    <button type="button" class="btns lg primary" @click.prevent="fn_join()">동의하고 시작하기</button>
                </template>
                <template v-else>
                    <button type="button" class="btns lg primary" disabled>동의하고 시작하기</button>
                </template>
			</div>
		</div>

		<!--<a href="#nolink" class="btn_close"><span class="blind">팝업닫기</span></a>-->
	</div>
	<!--// full popup E -->
</template>

<script>

import COAS4004 from '@/views/page/CO/AS/COAS4004/COAS4004' // 약관상세팝업
import COAS4005 from '@/views/page/CO/AS/COAS4005/COAS4005' // 거래 지점 찾기
import COAS4009 from '@/views/page/CO/AS/COAS4009/COAS4009' // 권유 직원 찾기
import COAS4010 from '@/views/page/CO/AS/COAS4010/COAS4010' // 서비스 가입 완료

import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import appService from '@/service/appService'
import userService from '@/service/userService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import {mapGetters, mapActions} from 'vuex'
import {maskingformat} from '@/utils/data'
import _ from 'lodash'

export default {
    name : "COAS4001",
    data: () => {
        return {
                respStltInfo     : {},      // 응답결과 약관정보
                
                stltArray        : [],      // 약관목록 array
                estlstltDtlArray : [],      // 필수약관상세목록 array(동의체크용)
                optlstltDtlArray : [],      // 선택약관상세목록 array(동의체크용)
                estlAgreeCheckYn : false,   // 필수약관 모두 동의여부
                optlAgreeCheckYn : false,   // 선택약관 모두 동의여부
                estlStltArray    : [],      // 필수약관 Array
                optlStltArray    : [],      // 선택약관 Array

                tmpStltArray     : [],      // 상세팝업용 전환 Array

                emailAdr         : "",      // 이메일주소
                email            : "",      // 이메일주소(수신동의 on/off 처리위함)

                rcmCd            : "",      // 추천인 코드
                rcmFlag          : false,   // 추천인 여부

                respRegInfo      : {},      // 과거가입정보 객체
                invtBrc          : "",      // 거래지점코드
                invtBrnm         : "",      // 거래지점명
                invtAdr          : "",      // 거래지점주소
                invtEmpEno       : "",      // 권유 직원코드
                invtEmpnm        : "",      // 권유 직원명
                invtEmpBrc       : "",      // 권유 직원사무소
                invtEmpBrnm      : "",      // 권유 직원사무소명
                invtDt           : "",      // 권유일자(add 2021.10.26)

                enoModYn         : false,   // 권유 직원 변경 가능 여부
                brcModYn         : false,   // 거래지점 변경 가능 여부

                brList           : [],      // 거래지점 리스트
                brcObj           : {},      // 선택된 거래농축협 정보객체

                isProcessing     : false,   // 가입진행여부 (중복체크)
        }
    },
	computed: {
        ...mapGetters('user', [
            'userTermsAgreeList',
            'userTermsInvtInfo',
            'userRecvInfo'
        ]),
        btnOnOff(){
            return !this.estlAgreeCheckYn ? "btn_off" : "btn_mint"
        }
    },
    beforeMount() {
            this.removeAllAgreeTermInfo()
            this.removeUserRecvAgrInfo()
        },
    mounted() {
        this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        ...mapActions('user', [
            'addAgreeTermInfo',
            'removeAllAgreeTermInfo',
            'setUserTermInvtInfo',
            'setUserRecvAgrInfo',
            'removeUserRecvAgrInfo'
        ]),
        initComponent(params) {
            console.log("params=>",params)
            if(!this.isEmpty(params)) {
                this.rcmCd = params.rcmCd
                //this.rcmCd = param.rcmCd || ""; // 추천코드를 타고 온 경우
            }
            
            this.getData()
        },

        getData() {
            this.rcmCd = "28FK5KF9"
            // 약관조회
            // 약관대상구분코드 값 세팅 (1:비조합원, 2:조합원)
            let stltObjDsc = this.getUserInfo('macoYn') === "1" ? "2" : "1"

            const config = {
                url: '/co/as/02ra1',
                data: {
                    mydtCusno   : this.getUserInfo("mydtCusno"),    // 마이데이터고객번호
                    cusTpc      : this.getUserInfo("cusTpc"),       // 고객구분코드
                    stltObjDsc  : stltObjDsc,                       // 약관대상구분코드 (1:비조합원, 2:조합원)
                }
            }

            apiService.call(config).then(response => {
                console.log("response =>",response)
                this.respStltInfo = response;
                this.stltArray    = this.respStltInfo.stltList || []    // 약관리스트
                this.emailAdr     = this.respStltInfo.emailAdr || ""    // email주소
                this.email        = this.emailAdr                       // 수신동의 on/off 처리위함

                for(let k=0; k < this.stltArray.length; k++) {
                    // Checked 처리위함 초기값 정의
                    this.stltArray[k].checked = false

                    // 약관 KEY값 재정의 (약관비교위함)
                    // stltKeyNo = 약관대상구분코드 + "_" + 약관일련번호
                    this.stltArray[k].stltKeyNo = this.stltArray[k].stltTpc + "_" + this.stltArray[k].sqno

                    // store에 등록된 약관 선택 정보 설정
                    if(this.userTermsAgreeList.length > 0) {
                        for(let i=0; i < this.userTermsAgreeList.length; i++) {
                            let stltKeyNo   = this.userTermsAgreeList[i].stltKeyNo  // 약관키
                            let agrYn       = this.userTermsAgreeList[i].agrYn      // 동의여부

                            if(stltKeyNo === this.stltArray[k].stltKeyNo) {
                                this.stltArray[k].checked = (agrYn === "1") ? true : false
                                break
                            }
                        }
                    }

                    // 필수약관, 선택약관 별도 저장
                    // essYn    1 : 필수약관, 2 : 선택약관
                    if(this.stltArray[k].essYn === "1") {
                        this.estlStltArray.push(this.stltArray[k])
                    } else {
                        this.optlStltArray.push(this.stltArray[k])
                    }
                }

                //STORE 정보수신동의정보
                this.isRecvInfoAgree = (this.userRecvInfo.infDpzAgrYn === '1') ? true : false
                let recvEmailAdr = this.userRecvInfo.emailAdr || ""
                if(recvEmailAdr !== '') {
                    this.email = recvEmailAdr
                }

                // 페이지 이동시 STORE에 등록된 약관정보가 존재할때
                if(this.userTermsAgreeList.length > 0 )  {
                    this.setAllAgreeCheck('estl')
                }
                
                /////////////////////////////////////////////////////////
                ///// 필수 약관 상세 전체보기 파라미터 준비             ////
                ///// slick 기능과 api충돌로 인한 순서 안맞는 현상 회피 ////
                /////////////////////////////////////////////////////////
                let estlStltTpc         = ""    // 약관제목
                let estlSqno            = ""    // 일련번호
                this.stltDtlArray = []

                for(let i=0; i < this.estlStltArray.length; i++) {
                    setTimeout(() => {
                        estlStltTpc = this.estlStltArray[i].stltTpc || ""
                        estlSqno    = this.estlStltArray[i].sqno || ""

                        this.fn_callDtlApi(estlStltTpc, estlSqno, "estl")
                    }, 100)
                }

                /////////////////////////////////////////////////////////
                ///// 선택 약관 상세 전체보기 파라미터 준비             ////
                ///// slick 기능과 api충돌로 인한 순서 안맞는 현상 회피 ////
                /////////////////////////////////////////////////////////
                let optlStltTpc = ""        // 약관유형코드
                let optlSqno    = ""        // 일련번호
                this.stltDtlArray = []  // 약관상세목록

                for(let i=0; i < this.optlStltArray.length; i++) {
                    setTimeout(() => {
                        optlStltTpc = this.optlStltArray[i].stltTpc || ""
                        optlSqno    = this.optlStltArray[i].sqno || ""

                        this.fn_callDtlApi(optlStltTpc, optlSqno, "optl")
                    }, 100);
                }


            })

            this.setRespRegInfo() // 거래지점 및 권유 직원 가져오기 함수
            // this.getInvtEmpInfo() // 직원 변경 여부 함수(setRespRegInfo 안에서 호출하도록 로직 변경)
            
        },

        /* 필수/선택약관 상세 api 호출 */
        fn_callDtlApi(stltTpc, sqno, flag) {
            let stltTinm = ""
            let stltCntn = ""

            const config_api = {
                url : '/co/as/03r01',
                data : {
                    "stltTpc"   : stltTpc,  //약관유형코드
                    "sqno"      : sqno,     //일련번호
                    "mydtCusno" : this.getUserInfo('mydtCusno'),
                }
            }
            apiService.call(config_api).then(response => {
                stltTinm = response.asetAmnStltTinm || ""  //자산관리약관제목명
                stltCntn = response.asetAmnStltCntn || ""  //자산관리약관내용
                
                if(flag == "estl") { // 필수
                    this.estlstltDtlArray.push({"stltTinm" : stltTinm, "stltCntn" : stltCntn})
                } else {             // 선택
                    this.optlstltDtlArray.push({"stltTinm" : stltTinm, "stltCntn" : stltCntn})
                }
                
            })
        },

        /*
         * 필수/선택약관 개별선택시
         */
        chngAgreeValue(event, item, flag) {
            let stltArray = flag == "estl" ? this.estlStltArray : this.optlStltArray
            
            let stltKeyNo = item.stltKeyNo

            let isChecked = event.target.checked

            for(let k=0; k < stltArray.length; k++) {
                if(stltKeyNo === stltArray[k].stltKeyNo) {
                    stltArray[k].checked = isChecked
                    event.target.checked = isChecked
                    break
                }
            }

            this.setAllAgreeCheck(flag)
            
        },

        /*
         * 필수/선택약관 동의 체크처리
         */
        setAllAgreeCheck(flag) {
            let stltCheckCount = 0
            let stltArray = flag == "estl" ? this.estlStltArray : this.optlStltArray

            for(let k=0; k < stltArray.length; k++) {
                if(stltArray[k].checked === true) {
                    stltCheckCount++
                }
            }

            console.log(flag == "estl" ? "필수":"선택", "약관 목록 =>", stltArray)
            console.log("체크된 약관 개수 =>", stltCheckCount)

            if(stltArray.length === stltCheckCount) {
                if(flag == "estl") {
                    this.estlAgreeCheckYn = true
                } else {
                    this.optlAgreeCheckYn = true
                }
                
            } else {
                if(flag == "estl") {
                    this.estlAgreeCheckYn = false
                } else {
                    this.optlAgreeCheckYn = false
                }
            }
        },
        /*
         * 필수/선택약관 전체동의
         */
        allAgreeCheck(event, flag) {
            // flag:estl:필수, optl:선택
            let stltArray = flag == "estl" ? this.estlStltArray : this.optlStltArray;
            let stltDtlArray = flag == "estl" ? this.estlstltDtlArray : this.optlstltDtlArray;
            
            console.log("약관 상세 필수=>", this.estlStltArray)
            console.log("약관 상세 선택=>", this.optlStltArray)
            for(let k=0; k < stltArray.length; k++) {
                //필수동의 전체해제
                stltArray[k].checked = false
                $("#"+stltArray[k].stltKeyNo).prop("checked", false)
            }

            if(event.target.checked === false) {
                this.setAllAgreeCheck(flag)

            } else {
                // 필수 약관 전체동의 체크 우선 해제
                if(flag == "estl") {
                    this.$refs.estlAllChk.checked = false
                    this.estlAgreeCheckYn = false
                } else {
                    this.$refs.optlAllChk.checked = false
                    this.optlAgreeCheckYn = false
                }
                
                

                // 필수약관상세 팝업 호출
                const config = {
                    component: COAS4004, 
                    params: {
                        flag      : "all",              // 전체여부
                        stltArray : stltArray, // 필수/선택약관 array
                        stltDtlArray : stltDtlArray.sort((a,b)=>{  // as-is는 필수, 선택 팝업이 나누어져있어서 수정함
                        //stltDtlArray : this.stltDtlArray.sort((a,b)=>{
                            return stltArray.map(function(e){return e.asetAmnStltTinm}).indexOf(a.stltTinm) - stltArray.map(function(e){return e.asetAmnStltTinm}).indexOf(b.stltTinm)
                        })                              // 필수약관 상세 array
                    }
                }
                console.log("팝업 param =>", config.params.stlDtlArray)
                modalService.openPopup(config).then(response => {
                    let agreeStltIdArray = response.agreeStltIdArray

                    for(let i=0; i < agreeStltIdArray.length; i++) {
                        for(let k=0; k < stltArray.length; k++) {
                            if(agreeStltIdArray[i].stltKeyNo === stltArray[k].stltKeyNo) {
                                stltArray[k].checked = true
                                $("#"+stltArray[k].stltKeyNo).prop("checked", true)
                                break
                            }
                        }
                    }

                    this.setAllAgreeCheck(flag)

                    // 필수약관 전체동의인 경우만 거래지점 및 권유 직원 수정 가능
                    /*
                    if(flag == "estl") {
                        console.log("필수약관 전체동의됨.")
                        this.getInvtEmpInfo()
                    }
                    */
                })
            }
        },

        // 약관 상세 보기
        // flag 1:필수(estlStltArray), 2:선택(optlStlTArray)
        openDtlPop(item, flag) {
            let stltDtlArray = []           // 약관상세목록
            let stltKeyNo = item.stltKeyNo  // 약관키
            this.tmpStltArray = flag == '1' ? this.estlStltArray : this.optlStltArray;

            const config_api = {
                url : '/co/as/03r01',
                data : {
                    "stltTpc"   : item.stltTpc,  // 약관유형코드
                    "sqno"      : item.sqno,     // 일련번호
                    "mydtCusno" : this.getUserInfo('mydtCusno'),
                }
            }
            apiService.call(config_api).then(response => {
                let stltTinm = response.asetAmnStltTinm || ""  // 약관제목명
                let stltCntn = response.asetAmnStltCntn || ""  // 약관내용

                stltDtlArray.push({"stltTinm" : stltTinm, "stltCntn" : stltCntn})
            })

            //필수약관상세 팝업 호출
            const config = {
                component: COAS4004,
                params: {
                    flag      : "each",                 // 전체여부
                    stltDtlArray : stltDtlArray,        // 필수약관 array
                }
            }
            modalService.openPopup(config).then(response => {
                let isChecked = (response.agreeYn === "Y") ? true : false

                // 1:this.estlStltArray, 2:this.optlStltArray
                for(let k=0; k < this.tmpStltArray.length; k++) {
                    if(stltKeyNo === this.tmpStltArray[k].stltKeyNo) {
                        this.tmpStltArray[k].checked = isChecked
                        
                        $("#"+stltKeyNo).prop("checked", isChecked)
                        break
                    }
                }

                this.setAllAgreeCheck(flag)
            })
        },
        // 거래농축협 조회
        getBrList() {
            const config = {
                url : '/co/as/05r01',
                data : {
                    mydtCusno : this.getUserInfo('mydtCusno'),
                    eno : ""
                }
            }
            apiService.call(config).then(response => {
                this.brList = response.brList || []

                for(let i=0; i < this.brList.length; i++) {
                    this.brList[i].checked = false
                }
            })
        },

        fn_openBrowser(flag) {
            // 외부 브라우저 링크 오픈 
            // appService.executeBrowser("http://www.mydatacenter.or.kr")

            let url = "";

            if(flag == '1') {
                url = "";
            } else {
                url = "";
            }

            // 외부 브라우저 링크 오픈 
            // chnl : 385 -> 스마트뱅크 , 386 -> 콕뱅크
            if(this.getUserInfo('chnl') === '385') {
                // 스뱅
                appService.executeBrowser(url)
            } else {
                // 콕뱅
                appService.cokBankOpenPopupWebBrowser(url)
            }
        },

        /* 가입 버튼 이벤트 */
        fn_join() {
            // 추천인 코드 조회
            const config = {
                url: '/mr/ev/41r02',
                data: {
                    "inviCNo" : this.rcmCd
                }
            }
            apiService.call(config).then(response =>{
                if(response.inviCNo == "" || response.inviCNo == null || response.inviCNo == undefined) {
                    modalService.alert("올바르지 않은 추천인 코드입니다.","","확인")
                    return
                } else {
                    this.rcmFlag = true // 추천인에 등록되어야하는 경우(서비스 가입 완료에서 이력을 insert하기 위해 미리 저장)
                }
            })

            console.log("mutation 함수 호출")
            // 동의내역 mutation clear
            this.removeAllAgreeTermInfo()

            // 정보제공 수신 동의 여부 체크
            if(this.isRecvInfoAgree) {
                if(this.isNull(this.email)) {
                    modalService.alert("이메일주소를 입력하여주세요.")
                    return false
                }

                if(!isValidEmailAddr(this.email)) {
                    modalService.alert("이메일주소 형식을 확인후 재입력하여 주세요.")
                    return false
                }
            } 
            
            // 필수약관 mutation 등록
            for(let i=0; i < this.estlStltArray.length; i++) {
                let stltKeyNo   = this.estlStltArray[i].stltKeyNo
                let stltTpc     = this.estlStltArray[i].stltTpc     // 약관유형코드
                let sqno        = this.estlStltArray[i].sqno        // 일련번호
                let agrYn       = (this.estlStltArray[i].checked) ? "1" : "0"

                let estlData = {"stltKeyNo" : stltKeyNo, "stltTpc" : stltTpc, "sqno": sqno,  "agrYn" : agrYn}
                this.addAgreeTermInfo(estlData)
            }

            // 선택약관 mutation 등록
            for(let i=0; i < this.optlStltArray.length; i++) {
                let stltKeyNo = this.optlStltArray[i].stltKeyNo
                let stltTpc   = this.optlStltArray[i].stltTpc       //약관유형코드
                let sqno      = this.optlStltArray[i].sqno          //일련번호
                let agrYn     = (this.optlStltArray[i].checked) ? "1" : "0"

                let optlData  = {"stltKeyNo" : stltKeyNo, "stltTpc" : stltTpc, "sqno": sqno,  "agrYn" : agrYn}
                this.addAgreeTermInfo(optlData)
            }

            // 정보수신동의정보 mutation 등록
            let recvInfo = {
                "infDpzAgrYn" : (this.isRecvInfoAgree) ? "1" : "0", 
                "emailAdr" : this.email
            }
            this.setUserRecvAgrInfo(recvInfo)

            this.fn_saveComplCustInfo()
            // setRespRegInfo() 있던 자리
        },

        setRespRegInfo() {
            ///////////////////////////////////////////////////////
            // 거래농축협/권유 직원 등록 유무에 따라 분기처리
            // 1. 등록된 거래농축협이 없거나 해지 후 1년 이후       거래 농축협 선택-슬라이드팝업(COAS4009) 호출(X)
            // 2. 등록된 거래농축협은 있으나 권유 직원이 없는경우    권유 직원 선택 팝업(COAS2007) 호출(X)
            // 3. 등록된 거래농축협 & 권유 직원 모두 있을경우        서비스 가입 완료 팝업(COAS4010) 호출
            ///////////////////////////////////////////////////////
            // 과거가입정보조회
            const config = {
                url : '/co/as/02r02',
                data : {
                    mydtCusno : this.getUserInfo("mydtCusno")
                }
            }
            apiService.call(config).then(response => {
                this.respRegInfo = response || {}
                // this.respRegInfo.entYn = '0'
                // 1년이내 재가입시 권유사무소 및 권유 직원 수정 불가
                // response.entYn = '0' : 가입1년초과, '1' : 가입1년이내
                console.log("재가입 관련 =>",this.respRegInfo)
                if(this.respRegInfo.entYn === '1') {
                    
                    this.regEntYn = true    // 1년이내 재가입

                    this.invtBrc     = this.respRegInfo.brc          //거래지점코드
                    this.invtBrnm    = this.respRegInfo.brnm         //거래지점명
                    this.invtAdr     = this.respRegInfo.brAdr        //거래지점주소
                    this.invtEmpEno  = this.respRegInfo.invtEmpEno   //권유 직원코드
                    this.invtEmpnm   = this.respRegInfo.invtEmpnm    //권유 직원명
                    this.invtEmpBrc  = this.respRegInfo.invtEmpBrc   //권유 직원사무소
                    this.invtEmpBrnm = this.respRegInfo.invtEmpBrnm  //권유 직원사무소명
                    this.invtDt      = this.respRegInfo.invtDt       //권유일자(add 2021.10.26)

                    let invtInfo = {
                        "regEntYn"    : true,
                        "invtBrc"     : this.invtBrc,
                        "invtBrnm"    : this.invtBrnm,
                        "invtAdr"     : this.invtAdr,
                        "invtEmpEno"  : this.invtEmpEno,
                        "invtEmpnm"   : this.invtEmpnm,
                        "invtEmpBrc"  : this.invtEmpBrc,
                        "invtEmpBrnm" : this.invtEmpBrnm,
                        "invtDt"      : this.invtDt     //권유일자(add 2021.10.26)
                    }

                    // 1년내 가입시 권유 직원/거래지점 변경불가 처리위함. mutation 등록
                    this.setUserTermInvtInfo(invtInfo)

                    if(!this.estlAgreeCheckYn) { // 필수약관이 선택 되어있지 않은 경우 가입처리 api 호출 못타게 함
                        return
                    }
                    if(!this.isNull(this.invtBrc)) {
                        if(!this.isNull(this.invtEmpEno)) {
                            console.log(">>>> 1년이내 재가입/ 거래농축협, 권유 직원 있음 >>>>")
                            console.log("서비스 가입 완료 팝업(COAS2010) 호출")
                            // 가입처리 api 호출 후 서비스 가입 완료 팝업 호출
                            this.fn_saveComplCustInfo()
                        } else {
                            console.log(">>>> 1년이내 재가입/ 거래농축협 o, 권유 직원 x >>>>")
                            console.log("권유 직원 선택 팝업(COAS2007) 호출")
                            this.brcObj = {brAdr : this.invtAdr, brc : this.invtBrc, brnm : this.invtBrnm} // let brcObj에서 this.brcObj로 변경
                            //this.fn_openCOAS4009(this.brcObj, false)
                        }
                    } else {
                        console.log(">>>> 1년이내 재가입/ 거래농축협 x >>>>")
                        console.log("거래 농축협 선택-슬라이드팝업(COAS4009) 호출")
                        // 거래지점 선택 슬라이드 팝업 오픈
                        const config_slide = {
                            params : {},
                            renderer : {
                                component : COAS4009
                            }
                        }
                        /*
                        modalService.openSlidePagePopup(config_slide).then(response => {
                            if(!this.isNull(response)) {
                                // 슬라이드 팝업 요소 선택 후 '거래농축협/권유 직원 확인' 팝업 오픈
                                //this.fn_openCOAS4009(response.brcObj, true) // 거래농축협 팝업 필요!!!!!!!!!!!!!!!
                            }
                        })
                        */
                    }
                } else {
                    console.log(">>>> 탈퇴 1년초과 >>>>")
                    console.log("거래 농축협 선택-슬라이드팝업(COAS4009) 호출")
                    // 거래지점 선택 슬라이드 팝업 오픈
                    const config_slide = {
                        params : {},
                        renderer : {
                            component : COAS4009
                        }
                    }
                    /*
                    modalService.openSlidePagePopup(config_slide).then(response => {
                        if(!this.isNull(response)) {
                            // 슬라이드 팝업 요소 선택 후 '거래농축협/권유 직원 확인' 팝업 오픈
                            this.fn_openCOAS4009(response.brcObj, true)
                        }
                    })
                    */
                }
            })

            this.getInvtEmpInfo() // 거래지점 및 권유 직원 변경 여부
        },

        /* '거래농축협/권유 직원 확인' 팝업 오픈 */
        fn_openCOAS4009(obj, brcModYn) {
            const config_popup = {
                component : COAS4009,
                params : {
                    brcObj      : obj || {},    // 선택 거래농축협 정보
                    brcModYn    : brcModYn      // 거래 농축협 변경가능 여부
                }
            }
            modalService.openPopup(config_popup).then(response => {
                let enoObj = response.enoObj

                this.invtAdr          = enoObj.brAdr    // 거래지점주소
                this.invtEmpEno       = enoObj.eno      // 권유 직원코드
                this.invtEmpnm        = enoObj.empnm    // 권유 직원명
                this.invtEmpBrc       = enoObj.brc      // 권유 직원사무소
                this.invtEmpBrnm      = enoObj.brnm     // 권유 직원사무소명
            })

        },

        /* 권유 직원 변경 여부 */
        getInvtEmpInfo() {
            //this.brcObj     = this.params.brcObj || {}
            this.enoObj  = ""
            //this.brcModYn   = this.params.brcModYn || false

            console.log("@@@ 권유 직원 변경 여부 =>",this.userTermsInvtInfo)
            // 권유 직원정보 존재여부 체크
            if(this.userTermsInvtInfo.invtEmpEno === undefined 
                || this.userTermsInvtInfo.invtEmpEno === null || this.userTermsInvtInfo.invtEmpEno === "") {
                this.enoModYn = false    // 권유 직원 변경 가능
            } else {
                this.enoModYn = false   // 권유 직원 변경 불가
            }
        },
        /* 거래 지점 선택 팝업 */
        fn_srchInvtBrc() {
            const config_slide = {
                params : {},
                renderer : {
                    component : COAS4005
                }
            }
            modalService.openSlidePagePopup(config_slide).then(response => {
                console.log("@@@ response =>", response)
                let brcObj = response.brcObj

                this.invtBrc  = brcObj.brc
                this.invtBrnm = brcObj.brnm
                this.invtAdr  = brcObj.brAdr
            })
        },

        /* 권유 직원 검색 */
        fn_srchInvtEno() {
            const config = {
                component : COAS4009,
                params : {
                }
            }

            modalService.openPopup(config).then(response => {
                if(!this.isNull(response)) {
                    let enoObj = response.enoObj

                    this.invtAdr          = enoObj.brAdr    // 거래지점주소
                    this.invtEmpEno       = enoObj.eno      // 권유 직원코드
                    this.invtEmpnm        = enoObj.empnm    // 권유 직원명
                    this.invtEmpBrc       = enoObj.brc      // 권유 직원사무소
                    this.invtEmpBrnm      = enoObj.brnm     // 권유 직원사무소명
                }
            })

        },

        /* 1년 이내 가입 및 권유사무소, 권유직원 정보 보유중일 경우 
            * 가입 api 호출 후 완료팝업(COAS2010) 호출
            */
        fn_saveComplCustInfo() {
            // 약관정보 생성
            let agreeList = this.userTermsAgreeList || this.$store.state.user.userTermsInfo.agreeList

            let stltAgrList = [];
            for(let i=0; i < agreeList.length; i++) {
                let stltAgrObj = {}
                stltAgrObj.stltTpc = agreeList[i].stltTpc   // 약관유형코드
                stltAgrObj.sqno = agreeList[i].sqno // 일련번호
                stltAgrObj.agrYn = agreeList[i].agrYn   // 동의여부
                stltAgrObj.mydtCusno = this.getUserInfo("mydtCusno")

                stltAgrList.push(stltAgrObj)
            }

            let invtDate = ""
            let tempEno = ""
            let tempBrc = ""

            let selectedEno = this.invtEmpEno || ""
            let selectedBrc = this.invtBrc || ""

            if((selectedEno != 'undefined' && selectedEno != null && selectedEno != "")) {
                tempEno = selectedEno.replace(/ /gi, "")
            }
            if((selectedBrc != 'undefined' && selectedBrc != null && selectedBrc != "")) {
                tempBrc = selectedBrc.replace(/ /gi, "")
            }

            if(tempEno.length > 0 || tempBrc.length > 0) {
                // 과거 가입 권유일자가 존재하면
                if(this.userTermsInvtInfo.invtDt !== undefined) {
                    invtDate = this.userTermsInvtInfo.invtDt
                } else {
                    invtDate = dateFormat(new Date(), 'YYYYMMDD')
                }
            }

            // 정보수신동의정보
            let infDpzAgrYn = this.userRecvInfo.infDpzAgrYn // 정보수신동의여부
            let emailAdr = this.userRecvInfo.emailAdr   // 정보수신 email
            
            // 가입처리
            const config = {
                url : '/co/as/05i01',
                data : {
                    mydtCusno       : this.getUserInfo("mydtCusno"),    // 마이데이터고객번호
                    invtBrc         : selectedBrc,                      // 권유사무소코드(거래농축협코드)
                    invtEmpEno      : selectedEno,                      // 권유직원번호
                    invtDt          : invtDate,                         // 권유일자
                    macoYn          : this.getUserInfo("macoYn"),       // 조합원구분
                    firEntPathVal   : this.getUserInfo("chnlGbn"),      // 유입채널구분
                    infDpzAgrYn     : infDpzAgrYn,                      // 정보수신동의여부
                    emailAdr        : emailAdr,                         // 정보수신 email
                    stltAgrList     : stltAgrList,                      // 약관동의목록
                    lginInfVal      : this.getUserInfo('lginInfVal'),   // 로그인정보값
                    lginDtm         : this.getUserInfo('lginDtm'),      // 로그인일시
                }
            }
            
            apiService.call(config).then(response => {
                // 가입성공시
                if(response.rspC == "0000") {

                    // 추천인 내역 등록
                    const config = {
                        url: '/mr/ev/41s02',
                        data: {
                            mydtCusno : this.getUserInfo("mydtCusno"),
                            inviCNo   : this.rcmCd
                        }
                    }
                    apiService.call(config).then(response =>{
                        if(response.recvCode == "Y") {
                            
                        } else {
                            
                        }
                    })

                    const menu = {
                        component : COAS4010,
                        data      : {rcmFlag : this.rcmFlag}
                    }
                    userService.setUserInfo().then(response => {
                        this.$store.dispatch('user/setUserInfo', response)  // 사용자정보 재조회
                        modalService.openPopup(menu)
                    })
                } 
            })
        },

        setEnoInfo() {
            if(!this.isNull(this.invtEmpnm) && !this.isNull(this.invtEmpEno)) {
                return maskingformat(this.invtEmpnm, "name") + " (" + this.maskingData(this.invtEmpEno) + ")"
            }else if(!this.isNull(this.invtEmpnm) && this.isNull(this.invtEmpEno)) {
                return maskingformat(this.invtEmpnm, "namex")
            }
        },

        /* 사번 마스킹 */
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

        isEmpty(value) {
            if (value === null || value === undefined) return true
                    
            if (typeof value === "string") {              
            if (value.trim().length < 1) return true          
            }
            
            return false          
        },
        
    },
    components : {

    },
    destroyed() {
        //this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>