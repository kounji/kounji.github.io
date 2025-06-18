<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 숨은 자산 > KCB 본인인증
* @ 페이지설명 : 자산 > 숨은 자산 > KCB 본인인증
* @ 파일명     : src/views/page/AS/TN/ASTN4009/ASTN4009.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-03-25
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-03-25              CS541599              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>KCB 본인인증</h1>
			<button type="button" class="prev" @click.prevent="close()"><span class="blind">이전</span></button>
		</div>

		<div class="popup_content">
            <section class="close_account">
                <p class="headline">본인 확인을 위해<br>인증을 해주세요.</p>
                <div class="close_info">
                    <h2 @click.prevent="fnTest()">휴대폰</h2>
                    <div class="formItem" v-show="test">
                    <input type="text" v-model="t1" placeholder="이름"/>
                    <input type="text" inputmode="decimal" v-model="t2" placeholder="생년월일(20000101)" maxlength="8"/>
                    <input type="text" inputmode="decimal" v-model="t3" placeholder="성별(1:남자,0:여자)" maxlength="1"/>
                    </div>
                    <div class="formItem">
                        <span class="label">통신사</span>
                        <button type="button" class="btns_select" :disabled="isReq || isAuth" title="통신사 선택" @click.prevent="fnOpenTelco()">
                            <span aria-hidden="true" v-if="isEmpty(pttelCd)">선택</span>
                            <span class="blind" v-else>현재선택</span>{{pttelNm}}
                        </button> 
                    </div>
                </div>

                <div class="close_info">
                    <h2>약관동의</h2>
                    <!--
                    <div class="check_all">
                        <div class="checkbox border">
                            <input type="checkbox" name="allagree1" id="checkall1" required="" v-model="allChk" @change="fnChgAllAgree($event)">
                            <label for="checkall1">전체동의</label>
                        </div>
                    </div>
                    -->
                    <div class="view_cont">
                        <ul class="agree_list">
                            <li v-for="(item, idx) in stltArray" :key="idx">
                                <div class="checkbox">
                                    <input type="checkbox" name="check01_1" :id="'check01_'+idx" required="" :title="item.stltTinm" :disabled="isReq || isAuth" v-model="agreeList" :value="item.stltSqno" @change="fnChgOneAgree($event, item)" :checked="item.checked"/>
                                    <button type="button" class="btn_detail ico_arrow" :disabled="isReq || isAuth" @click.prevent="fnOpenDtlPop(item.stltSqno)">{{item.stltTinm}}<span class="blind">상세보기</span></button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="close_info">
                    <div class="formItem">
                        <label for="account_01">휴대폰번호</label>
                        <div class="input">
                            <input type="text" inputmode="decimal" name="" id="account_01" value="" @input="fnKeyDown(1, $event)" :disabled="isAuth || (isReq && !isAuth)" v-model="pttelNo" placeholder="휴대폰번호 입력" title="휴대폰번호"> 
                            <button type="button" class="btns" :disabled="!allChk || !telYn || isAuth || isReq" @click.prevent="fnRequestAuth()">{{isReAuth?'재요청':'인증요청'}}</button>
                            <!-- 시간초과 시 -->
                            <!-- <button type="button" class="btns" :disabled="!allChk || !telYn" @click.prevent="fnRequestAuth()">재요청</button> -->
                        </div>
                    </div>
                    <div class="close_info">
                        <h2>인증번호 입력</h2>
                        <div class="formItem">
                            <label for="account_num">인증번호</label>
                            <div class="input">
                                <input type="text" inputmode="numeric" name="" id="account_num" v-model="smsAttcNo" maxlength="6" @input="fnKeyDown(2, $event)" placeholder="숫자 6자리 입력" title="인증번호" :disabled="isAuth">  <!-- @@!telShow -->
                                <span class="time">{{timeoutCount}}</span>
                                <button type="button" class="btns" :disabled="!isBtn" @click.prevent="fnAuthPass()">인증확인</button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
		</div>

        <div class="popup_footer fixed">
			
            <div class="btn_full_box">
				<button type="button" class="btns lg primary" :disabled="!allChk || !isAuth" @click.prevent="fnNext()">확인</button>
            </div>
        </div>

		<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
		
	</div>
	<!--// full popup E -->
</template>

<script>

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

import apiService from '@/service/apiService'
import appService from '@/service/appService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'
import {mapActions} from 'vuex'
import {dayDiff, dateFormat} from '@/utils/date'
import {defineAsyncComponent} from 'vue'
import _ from 'lodash'
import Template from '../../../XX/template/template.vue'

export default {
    name : "ASTN4009",
    data: () => {
        return {
            termList             : [],     // 해지계좌정보목록
            pageNum              : 1,      // 페이지 번호
            allChk               : false,  // 전체 동의 여부
            agreeList            : [],     // 동의한 약관 목록
            stltArray            : [],     // 약관 목록
            pttelCd                : "",   // 통신사코드
            pttelNm              : "",     // 통신사명
            pttelNo              : "",     // 전화번호
            telYn                : false,  // 전화번호 형식 여부
            timeoutCount         : "",     // 타이머 시간
            isReAuth             : false,  // 재요청 여부
            clearIntervalTimeOut : null,
            trSqno               : "",     // 거래일련번호
            smsAttcNo            : "",     // 입력한 인증번호
            isBtn                : false,  // 인증확인 버튼 활성화 여부(true:활성화, false:비활성화)
            isReq                : false,  // 인증요청버튼 비활성화 여부
            isAuth               : false,  // 인증확인 여부
            test                 : false,
            t1 : "",
            t2 : "",
            t3 : "",

            isDev          : import.meta.env.VITE_ENV == 'D' || window.location.host.indexOf('localhost') > -1 // 개발과 로컬
        }
    },
	computed: {
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
        ...mapActions('myassets', [
            'getMyBizRegInfo','getAllMyAssetInfo'
        ]),
        initComponent(param) {
            this.getData()
        },
        getData() {
            let now = new Date()
            let sysdate = dateFormat(now, 'YYYYMMDD')       // 현재 날짜
            let m3before = new Date()
            m3before.setMonth(now.getMonth()-3)

            this.stltArray = [{stltTinm:'[필수] 개인정보 수집/이용/취급 위탁동의', stltCntn:'', url:'https://safe.ok-name.co.kr/eterms/agreement001.jsp'},
                              {stltTinm:'[필수] 본인확인서비스 이용약관', stltCntn:'', url:'https://safe.ok-name.co.kr/eterms/agreement002.jsp'},
                              {stltTinm:'[필수] 고유식별정보처리 동의', stltCntn:'', url:'https://safe.ok-name.co.kr/eterms/agreement003.jsp'},
                              {stltTinm:'[필수] 통신사 이용 약관', stltCntn:'', url:'https://safe.ok-name.co.kr/eterms/agreement004.jsp'},
                ]
            
            // sqno 채번
            this.stltArray.forEach((el, idx) => {
                el.stltSqno = idx+1
            })
        },

        /* 통신사 선택 팝업 열기 */
        fnOpenTelco() {
            let compName = defineAsyncComponent(() => import("@/views/page/AS/TN/ASTN4010/ASTN4010"))   // KCB 본인인증
            
            const config = {
                component: compName,
                params   :{pttelCd : this.pttelCd}
            }

            modalService.openPopup(config).then(response => {
                if(!_.isEmpty(response)) { // 통신사를 선택한 경우
                    this.pttelCd = response.pttelCd
                    this.pttelNm = response.pttelNm

                    this.timeoutCount = ""          // 타이머 문자열 초기화
                    this.isAuth       = false       // 인증확인 여부
                    this.isReAuth     = false       // 재요청 여부
                    this.isBtn        = false       // 인증확인 버튼 비활성화
                    this.isReq        = false       // 인증요청 비활성화여부
                    this.smsAttcNo    = ""          // 인증번호 초기화

                    this.agreeList    = []          // 약관 동의 초기화
                    //this.telShow      = true        // 인증요청버튼 show 여부

                    let idx = this.stltArray.findIndex(el => el.stltSqno == 5)

                    if(['04','05','06'].includes(response.pttelCd)) {
                        if(idx < 0) {
                            // 알뜰폰 통신사인 경우 제3자 동의 약관 추가
                            let idx = this.stltArray.length+1
                            this.stltArray.push({stltTinm:'[필수] 개인정보 제3자 동의(이통3사 알뜰폰)', stltCntn:'', url:'https://safe.ok-name.co.kr/eterms/agreement005.jsp', stltSqno:idx})
                        }
                        
                    } else {
                        // 3사 통신사인 경우 제3자 동의 약관 제거
                        if(idx >= 0) {
                            this.stltArray.splice(idx, 1)
                        }
                        
                    }
                }
            })
        },
        /* KCB 문자 인증 요청 */
        fnRequestAuth() {
            clearInterval(this.clearIntervalTimeOut);
            this.timeoutCount = ""    // 타이머 문자열 초기화
            this.trSqno       = ""    // 재요청의 경우 거래일련번호를 초기화 함
            // KCB 문자 인증 요청 API 호출
            const config1 = {
                url: '/as/tn/09r01',
                data: {
                    mydt_cusno           : this.getUserInfo("mydtCusno"),      // 마이데이터고객번호
                    pttelNo              : this.pttelNo,                       // 휴대폰번호
                    comucoDsc            : this.pttelCd,                       // 통신사코드
                    psnInfColAgrYn       : this.agreeList.includes(1) ?'Y':'', // 개인정보수집동의
                    natvIdInfPrcAgrYn    : this.agreeList.includes(2) ?'Y':'', // 고유식별정보처리동의
                    msfCnfSvcUsStltAgrYn : this.agreeList.includes(3) ?'Y':'', // 본인확인서비스이용약관동의
                    comucoUsStltAgrYn    : this.agreeList.includes(4) ?'Y':'', // 통신사이용약관동의
                    psnInfTrptyAgrYn     : this.agreeList.includes(5) ?'Y':'', // 개인정보제3자동의

                    name     : this.t1, // 이름
                    birth    : this.t2, // 생년월일
                    sex      : this.t3, // 성별
                    nfrerDsc : "1",     // 내외국인구분코드
                }
            }
            apiService.call(config1).then(response =>{
                //response.rsp_code:B000
                //response.rsp_msg:본인인증 완료
                //response.trSqno:202503280065530
                //response.enc_param:null
                if(!_.isEmpty(response)) {
                    if(response.rsp_code == "B000") { // 문자가 보내진 경우(인증요청 성공)
                        this.trSqno = response.trSqno // 거래일련번호를 매칭의 입력값으로 들고가야 함.
                        this.isReq        = true  // 인증요청 비활성화여부
                        this.isAuth       = false // 인증확인 여부
                        this.isBtn        = true  // 인증확인버튼 활성화
                        this.smsAttcNo    = ""    // 인증번호 초기화

                        let time = 5*60; // 기준시간(1.5분)
                        let min = "";   // 분
                        let sec = "";   // 초

                        this.clearIntervalTimeOut = setInterval(() => {

                            min = parseInt(time/60);
                            sec = time%60;
                            this.timeoutCount = min > 0? "0" + min + ":" + (sec < 10? "0" + sec:sec) : "00:" + (sec < 10? "0" + sec:sec);
                            // console.log("COAR2022 this.all=", this.timeoutCount);
                            // console.log("COAR2022 this.timeoutCount=", this.timeoutCount);

                            time--;

                            if(time < 0){
                                this.timeoutCount = "초과";
                                console.log("ASTN4009 time < 0 this.timeoutCount=", this.timeoutCount);
                                clearInterval(this.clearIntervalTimeOut);
                                this.isReq    = false  // 인증요청 비활성화여부
                                this.isAuth   = false // 인증확인 여부
                                this.isReAuth = true  // 인증요청 -> 재요청
                                this.isBtn    = false // 인증확인버튼 활성화
                                // 선택 여부 체크
                                //this.fn_returnMsgPopUpPaas('40106'); // 40106 서명시간이 유효시간 범위를 초과하였습니다.(인증 유효 시간이 만료 되었습니다.)
                                // modalService.alert("인증 유효시간이 만료 되었습니다.").then(() => {
                                //     clearInterval(this.clearIntervalTimeOut);
                                // })
                            }
                        }, 1000)
                    } else { // 잘못 입력한 경우(본인인증 처리에 실패했습니다.)
                        let errMsg = "인증요청 처리에 실패했습니다.".concat("[",response.rsp_code,"]")
                        modalService.alert(errMsg)
                    }
                }

            })
            
        },

        fnAuthPass() {
            const config1 = {
                url: '/as/tn/09r02',
                data: {
                    mydt_cusno           : this.getUserInfo("mydtCusno"),      // 마이데이터고객번호
                    trSqno               : this.trSqno,                        // 거래일련번호
                    smsAttcNo            : this.smsAttcNo,                     // SMS인증번호
                }
            }
            apiService.call(config1).then(response =>{
                //response.rsp_code:B000
                //response.rsp_msg:인증번호 매칭 성공
                //response.enc_param:null
                if(!_.isEmpty(response)) {
                    if(response.rsp_code == "B000") { // 본인인증이 완료된 경우
                        this.isReq        = true  // 인증요청 비활성화여부
                        this.isBtn        = false  // 인증확인 버튼 비활성화
                        this.timeoutCount = ""     // 타이머 문자열 초기화
                        this.isAuth       = true   // 인증확인 완료
                            
                        clearInterval(this.clearIntervalTimeOut);
                    } else {
                        let errMsg = "인증확인 처리에 실패했습니다.".concat("[",response.rsp_code,"]")
                        modalService.alert(errMsg)
                    }
                }
            })
        },

        /* 숫자 입력 이벤트 */
        fnKeyDown(flag, e) {
            //flag 1:전화번호, 2:인증번호
            if(flag == 1) {
                this.isAuth       = false       // 인증확인 여부
                this.isReAuth     = false       // 재요청 -> 인증요청
                this.timeoutCount = ""          // 타이머 문자열 초기화
                this.isBtn        = false       // 인증확인버튼 비활성화
                this.pttelNo      = e.target.value.toString().replace(/[^0-9]/g, '');
                this.fnTelRegExp()
            } else {
                this.smsAttcNo = e.target.value.toString().replace(/[^0-9]/g, '')

                //let regExp = /^[0-9]{6}$/
            }
            
        },
        /* 전화번호 형식 여부 */
        fnTelRegExp() {
            let regExp = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/

            this.telYn = regExp.test(this.pttelNo)
        },

        /* 개별 동의 */
        fnChgOneAgree(e, item) {
            //let chk = e.target.checked
            this.smsAttcNo = "" // 인증번호 초기화
            
            this.fnSetChk()
        },

        /* 전체 체크 세팅 */
        fnSetChk() {
            /* 동의 버튼 비활성화 여부 */
            if(this.stltArray.length == this.agreeList.length) {
                this.allChk   = true
            } else {
                this.allChk   = false
                this.isAuth   = false // 인증확인 여부
                this.isBtn    = false // 인증확인 버튼 비활성화
            }
            
            this.isReAuth = false // 재요청 -> 인증요청
            //this.telShow  = true  // 인증요청버튼 show 여부
        },

        /* 약관 상세 url 띄우기 */
        fnOpenDtlPop(sqno) {
            if(this.agreeList.findIndex(el => el == sqno) < 0) { // 혹시 모를 중복 방지(없는 경우만 push 하도록)
                this.agreeList.push(sqno)
            }

            let idx = this.stltArray.findIndex(el => el.stltSqno == sqno)
            let url = {"url":this.stltArray[idx].url}
            /*
            if(this.getUserInfo('chnl') === '385') {
                // 스뱅
                appService.executeBrowser(url)
            } else {
                // 콕뱅
                appService.cokBankOpenPopupWebBrowser(url)
            }
            */

            if(this.getUserInfo('chnl') === '385'){
                appService.openPopupWebView(url).then(rst => {
                    console.log("@@@스뱅 웹뷰다녀온 후 데이터 확인 :: ",rst)
                })
            }else{
                appService.cokBankOpenPopupWebView(url).then(rst => {
                    console.log("@@@콕뱅 웹뷰다녀온 후 데이터 확인 :: ",rst)
                }) 
            }
        },

        /* KCB 인증 완료 */
        fnNext() {
            this.close({flag:'success',customerPhoneNum:this.pttelNo})
        },
        /* KCB 문자인증 테스트 */
        fnTest() {
            if(this.isDev) { // 개발서버
                this.test = !this.test
            }
        },
        fnLpad(v, len, pv) {
            v = v + '';
            return v.length >= len ? v : new Array(len - v.length + 1 ).join(pv) + v;
        },

        isEmpty(a) {
            return _.isEmpty(a)
        }

    },
    components : {
        Template

    },
    destroyed() {
        this.getMyBizRegInfo()  //연결기관정보 조회/갱신
        clearInterval(this.clearIntervalTimeOut)
    }
}

</script>