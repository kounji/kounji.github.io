<!--
/*************************************************************************
* @ 서비스경로 : 자산관리 서비스 가입 > 선택 약관 동의
* @ 페이지설명 : 선택 약관 동의
* @ 파일명     : src/views/page/CO/AS/COAS4003/COAS4003.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-06-05
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-06-05              CS541599              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01">

		<div class="popup_header">    
			<h1>선택약관동의</h1>
		</div>

		<div class="popup_content">
            <section class="signup">
				<div class="tit_area">
					<h2 class="headline">서비스 이용을 위해<br>
						<strong>이용약관</strong>에 동의해 주세요
					</h2>
				</div>

				<div class="agree_wrap full_view">
					<div class="check_all">
						<div class="checkbox border">
							<input type="checkbox" name="allagree1" id="checkall1" v-model="agreeCheckYn" @change="allAgreeCheck($event)" ref="allChk" >
							<label for="checkall1" class="label">전체동의</label>
						</div>
					</div>
					<div class="view_cont">
						<ul class="agree_list">
							<li v-for="(item, index) in optlStltArray" :key="index">
								<div class="checkbox">
									<input type="checkbox" name="agree1" :checked="item.checked" :id="item.stltKeyNo"
                                    :essYn="item.essYn" @change="chngAgreeValue($event, item)" required="" :title="item.asetAmnStltTinm">
									<button type="button" class="btn_detail ico_arrow" @click.prevent="openDtlPop(item)">{{item.asetAmnStltTinm}}<span class="blind">상세보기</span></button>
								</div>
							</li>
						</ul>
					</div>
                    <!--
					<div class="view_cont">
						<div class="checkbox">
							<input type="checkbox" name="agree1" id="check01_6" title="[선택] 서비스 변동 내용 수신 동의">
							<label for="check01_6" class="label">[선택] 서비스 변동 내용 수신 동의</label>
						</div>
					</div>
                    -->
				</div>
                <!--
				<div class="formItem">
					<div class="input">
						<label for="input01">이메일 주소를 입력해 주세요.</label>
						<input type="text" name="" id="input01" placeholder="이메일 주소를 입력해 주세요.">
					</div>
				</div>
                -->
            </section>
		</div>

        <div class="popup_footer fixed">
            <div class="btn_full_box">
				<button type="button" class="btns lg primary" @click.prevent="fnNext('next')">동의</button><!-- 활성화시 disabled 제거-->
            </div>
        </div>

		<a href="#nolink" role="button" class="btn_close" @click.prevent="fnNext('close')"><span class="blind">팝업닫기</span></a>		
		
	</div>
	<!--// full popup E -->
</template>

<script>
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import appService from '@/service/appService'
import {mapGetters, mapActions} from 'vuex'
import _ from 'lodash'

import COAS4004 from '@/views/page/CO/AS/COAS4004/COAS4004' // 약관상세팝업

export default {
    name: 'COAS4003',
    data: () => {
        return {
            respStltInfo    : [],     // 응답결과 약관정보
            stltArray       : [],     // 선택약관 목록
            stltDtlArray    : [],     // 선택약관 상세목록 array(동의체크용)
            optlStltArray   : [],     // 선택약관
            tmpStltArray    : [],     // 상세팝업용 전환 Array
            agreeCheckYn    : false,  // 선택약관 모두 동의여부


        }
    },
    computed: {
        ...mapGetters('user', [
            'userTermsAgreeList',
            'userTermsInvtInfo',
            'userRecvInfo'
        ]),
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    created() {
        
    },
    mounted() {
        this.initComponent()
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: { 
        ...mapActions('user', [
            'addAgreeTermInfo',
            'removeAllAgreeTermInfo',
            'setUserTermInvtInfo',
            'setUserRecvAgrInfo',
            'removeUserRecvAgrInfo'
        ]),
        initComponent() {
            this.getData()
        },
        getData() {
            // 약관조회
            // 약관대상구분코드 값 세팅 (1:비조합원, 2:조합원)
            let stltObjDsc = this.getUserInfo('macoYn') === "1" ? "2" : "1"

            const config = {
                url: '/co/as/02ra1',
                data: {
                    mydtCusno   : this.getUserInfo("mydtCusno"),    // 마이데이터고객번호
                    cusTpc      : "1",                              // 고객구분코드(TOBE는 서비스 가입 후 선택약관 재동의)
                    stltObjDsc  : stltObjDsc,                       // 약관대상구분코드 (1:비조합원, 2:조합원)
                }
            }

            apiService.call(config).then(response => {
                this.respStltInfo = response;
                this.stltArray    = this.respStltInfo.stltList || []    // 약관리스트

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

                    this.stltArray[k].checked = true // 기본값 = check
                    this.setAllAgreeCheck()

                    // 필수약관, 선택약관 별도 저장
                    // essYn    1 : 필수약관, 0 : 선택약관
                    if(this.stltArray[k].essYn === "0") {
                        this.optlStltArray.push(this.stltArray[k])
                    }
                }

                /////////////////////////////////////////////////////////
                ///// 선택 약관 상세 전체보기 파라미터 준비             ////
                ///// slick 기능과 api충돌로 인한 순서 안맞는 현상 회피 ////
                /////////////////////////////////////////////////////////
                let stltTpc = ""        // 약관유형코드
                let sqno    = ""        // 일련번호
                for(let i=0; i < this.optlStltArray.length; i++) {
                    setTimeout(() => {
                        stltTpc = this.optlStltArray[i].stltTpc || ""
                        sqno    = this.optlStltArray[i].sqno || ""

                        this.fn_callDtlApi(stltTpc, sqno)
                    }, 100);
                }

            })
        },

        /* 필수/선택약관 상세 api 호출 */
        fn_callDtlApi(stltTpc, sqno) {
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
                
                this.stltDtlArray.push({"stltTinm" : stltTinm, "stltCntn" : stltCntn, "stltKeyNo" : stltTpc + "_" + sqno})
            })
        },

        /*
         * 선택약관 개별선택시
         */
        chngAgreeValue(event, item) {
            let stltArray = this.optlStltArray
            let stltKeyNo = item.stltKeyNo
            let isChecked = event.target.checked

            for(let k=0; k < stltArray.length; k++) {
                if(stltKeyNo === stltArray[k].stltKeyNo) {
                    stltArray[k].checked = isChecked
                    event.target.checked = isChecked
                    break
                }
            }

            this.setAllAgreeCheck()
        },

        /*
         * 선택약관 동의 체크처리
         */
        setAllAgreeCheck() {
            let stltCheckCount = 0

            for(let k=0; k < this.optlStltArray.length; k++) {
                if(this.optlStltArray[k].checked === true) {
                    stltCheckCount++
                }
            }

            if(this.optlStltArray.length === stltCheckCount) {
                this.agreeCheckYn = true
            } else {
                this.agreeCheckYn = false
            }
        },

        /*
         * 필수/선택약관 전체동의
         */
        allAgreeCheck(event) {
            for(let k=0; k < this.optlStltArray.length; k++) {
                //필수동의 전체해제
                this.optlStltArray[k].checked = false
                $("#"+this.optlStltArray[k].stltKeyNo).prop("checked", false)
            }

            if(event.target.checked === false) {
                this.setAllAgreeCheck()

            } else {
                // 선택 약관 전체동의 체크 우선 해제
                this.$refs.allChk.checked = false
                this.agreeCheckYn = false
                
                for(let i=0; i < this.stltDtlArray.length; i++) {
                    for(let k=0; k < this.optlStltArray.length; k++) {
                        if(this.stltDtlArray[i].stltKeyNo === this.optlStltArray[k].stltKeyNo) {
                            this.optlStltArray[k].checked = true
                            $("#"+this.optlStltArray[k].stltKeyNo).prop("checked", true)
                            break
                        }
                    }
                }

                this.setAllAgreeCheck()
            }
        },

        // 약관 상세 보기
        openDtlPop(item) {
            let stltDtlArray = []           // 약관상세목록
            let stltKeyNo = item.stltKeyNo  // 약관키
            this.tmpStltArray = this.optlStltArray;

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

                for(let k=0; k < this.tmpStltArray.length; k++) {
                    if(stltKeyNo === this.tmpStltArray[k].stltKeyNo) {
                        this.tmpStltArray[k].checked = isChecked
                        
                        $("#"+stltKeyNo).prop("checked", isChecked)
                        break
                    }
                }

                this.setAllAgreeCheck()
            })
        },

        fnNext(flag) {
            // flag:next=동의, close=닫기
            if(flag == "close") {
                const config = {
                    content : ['선택 약관에 동의하지 않으셨습니다.<br>일부 서비스 이용이 제한될 수 있어요'],
                    ALERT_CONFIRM_TEXT 	: "확인",
					ALERT_CANCEL_TEXT 	: "취소",	
                    title   : ""
                };
                modalService.confirm(config).then(text => {
                    if(text == "확인") {
                        this.fnAgree('close')
                    }
                });
            } else {
                modalService.alert("선택 약관에 동의 완료하였습니다.").then((response) =>{
                    this.fnAgree()
                })
            }
        },

        fnAgree(flag) {
            // 동의내역 mutation clear
            this.removeAllAgreeTermInfo()
            // 선택약관 mutation 등록 
            for(let i=0; i < this.optlStltArray.length; i++) {
                let stltKeyNo = this.optlStltArray[i].stltKeyNo
                let stltTpc   = this.optlStltArray[i].stltTpc       //약관유형코드
                let sqno      = this.optlStltArray[i].sqno          //일련번호
                let agrYn     = (this.optlStltArray[i].checked) ? "1" : "0"

                if(flag == "close") agrYn = "0" // 닫기버튼을 누른 경우는 동의안함으로 간주

                let optlData  = {"stltKeyNo" : stltKeyNo, "stltTpc" : stltTpc, "sqno": sqno,  "agrYn" : agrYn}
                this.addAgreeTermInfo(optlData)
            }

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

            const config = {
                url: '/pd/pd/01ia1',
                data: {
                    mydtCusno       : this.getUserInfo('mydtCusno'),            // 마이데이터 고객번호
                    firEntPathVal   : this.getUserInfo('chnlgbn'),              // 최초가입경로값 (필요X)
                    infDpzAgrYn     : '',                                       // 정보수신동의여부 (필요X)
                    emailAdr        : '',                                       // 이메일 주소 (필요X)
                    stltAgrList     : stltAgrList                               // 약관 목록
                }
            }

            apiService.call(config).then(response => {
                if(!_.isEmpty(response)) {
                    if(response.rspC == "0000") { // 정상적으로 등록된 경우
                        this.close('home') // 메인으로
                    }
                }
            })
        }

    },
    components: {      
        
    },
}
    
</script>