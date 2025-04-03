<!--
/*************************************************************************
* @ 서비스경로 : 자산관리 서비스 가입 > 서비스 안내 및 필수 약관 동의
* @ 페이지설명 : 자산관리서비스 약관동의
* @ 파일명     : src/views/page/CO/AS/COAS2002/COAS2002.vue
* @ 작성자     : CS533035
* @ 작성일     : 2023-08-23
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-06-24              CS528069              최초작성
* 2023-08-23              CS533035              화면번호수정(COAS1002->COAS2002)
*************************************************************************/
-->
<template>
    <!-- full popup S -->
    <div class="full_popup renewal" id="full_popup_01"> 
        <div class="popup_header">
            <h1>서비스 가입</h1>
            <a href="javascript:void(0);" class="btn_back" @click.prevent="fn_closePopup()"><span class="blind">이전화면</span></a>
        </div>
        
        <div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
            <div class="com_inner">
                <strong class="com_cont_tit02">서비스 이용을 위해<br/>
                    필수 약관에 동의해 주세요
                </strong>
                <div class="custom_terms">
                    <div class="new_check_all">
                        <span class="btn_check">
                            <input type="checkbox" name="allagree" id="checkall_0" v-model="estlAgreeCheckYn" @change="estlAllAgreeCheck($event)" ref="checkAll">
                            <label for="checkall_0">
                                <span>필수 약관 전체 동의</span>
                            </label>
                        </span>
                    </div>
                    <ul class="new_agree_list">
                        <li v-for="(item, index) in estlStltArray" :key="index">
                            <span class="btn_check">
                                <input type="checkbox" name="agree"
                                    :checked="item.checked" :id="item.stltKeyNo"
                                    :essYn="item.essYn" @change="chngEstlAgreeValue($event, item)">
                                <label :for="item.stltKeyNo">
                                    <span>{{item.asetAmnStltTinm}}</span>
                                </label>
                                <button type="button" class="btn_arrow" @click.prevent="openDtlPop(item)">상세보기</button>
                            </span>
                        </li>
                    </ul>
                </div>
            
                <div class="com_cont_tit02">
                    <span>
                        마이데이터 서비스 안내
                    </span>
                    <p class="txt_gray">
                        가입 신청 전 안전한 서비스 이용을 위해<br/>아래 사항을 꼭 기억해주세요.
                    </p>
                </div>
                <div class="com_box_type01 com_box_list">
                    <ul class="bl_dot_list f16">
                        <li>가입 전에 한 번 더 고민해 보기</li>
                        <li>꼭 필요한 서비스만 가입하기</li>
                        <li>사용하지 않는 서비스는 탈퇴하기</li>
                    </ul>
                </div>
                <p class="mydata_info">
                    마이데이터 가입 현황은 
                    <a href="javascript:void(0)" class="com_point_blue" @click.prevent="fn_openBrowser()">마이데이터<br/>종합포털</a>에서 확인 할 수 있습니다.
                </p>
            </div>
        </div>

        <div class="popup_footer fixed">
            <div class="btn_full_box">
                <a href="javascript:void(0);" class="btn" :class="btnOnOff" @click.prevent="fn_nextStep($event)">다음</a>
            </div>
        </div>

        <!-- <a href="javascript:void(0);" class="btn_close" @click.prevent="fn_closePopup()"><span class="blind">팝업닫기</span></a> -->
    </div>
</template>

<script>
    // import commonService from '@/service/commonService'
    import modalService from '@/service/modalService'
    import apiService from '@/service/apiService'
    import appService from '@/service/appService'
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import {mapGetters, mapActions} from 'vuex'

    import COAS2003 from '@/views/page/CO/AS/COAS2003/COAS2003'
    import COAS2004 from '@/views/page/CO/AS/COAS2004/COAS2004'

    export default {
        name: 'COAS2002',
        data: () => {
            return {
                respStltInfo     : {},      //응답결과 약관정보

                stltArray        : [],      //약관목록 array
                stltDtlArray     : [],      //약관상세목록 array
                estlAgreeCheckYn : false,   //필수약관 모두 동의여부
                estlStltArray    : [],      //필수약관 Array
                optlStltArray    : [],      //선택약관 array

                emailAdr         : "",      // 이메일주소
                email            : "",      // 이메일주소(수신동의 on/off 처리위함)
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
        mixins: [
            commonMixin,
            popupMixin
        ],
        beforeMount() {
            this.removeAllAgreeTermInfo()
            this.removeUserRecvAgrInfo()
        },
        mounted() {
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)

            this.initComponent()
        },
        methods: { 
            ...mapActions('user', [
                'removeAllAgreeTermInfo',
                'removeUserRecvAgrInfo',
            ]),
            ...mapActions('user', [
                'addAgreeTermInfo',
                'removeAllAgreeTermInfo',
                'setUserTermInvtInfo',
                'setUserRecvAgrInfo'
            ]),
            initComponent() {
                this.getData()
            },
            getData() {
                ////////////////////
                // 약관조회
                ////////////////////

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
                        this.setEstlAllAgreeCheck()
                    }
                    
                    /////////////////////////////////////////////////////////
                    ///// 필수 약관 상세 전체보기 파라미터 준비             ////
                    ///// slick 기능과 api충돌로 인한 순서 안맞는 현상 회피 ////
                    /////////////////////////////////////////////////////////
                    let stltTpc         = ""    // 약관제목
                    let sqno            = ""    // 일련번호
                    this.stltDtlArray = []

                    for(let i=0; i < this.estlStltArray.length; i++) {
                        setTimeout(() => {
                            stltTpc = this.estlStltArray[i].stltTpc || ""
                            sqno    = this.estlStltArray[i].sqno || ""

                            this.fn_callDtlApi(stltTpc, sqno)
                        }, 100)
                    }
                })
                
            },

            /*
             * 필수약관 전체동의
             */
            estlAllAgreeCheck(event) {
                for(var k=0; k < this.estlStltArray.length; k++) {
                    //필수동의 전체해제
                    this.estlStltArray[k].checked = false
                    $("#"+this.estlStltArray[k].stltKeyNo).prop("checked", false)
                }

                if(event.target.checked === false) {

                    this.setEstlAllAgreeCheck()

                } else {
                    // 필수 약관 전체동의 체크 우선 해제
                    this.$refs.checkAll.checked = false
                    
                    this.estlAgreeCheckYn = false

                    // 필수약관상세 팝업 호출
                    const config = {
                        component: COAS2004, 
                        params: {
                            flag      : "all",              // 전체여부
                            stltArray : this.estlStltArray, // 필수약관 array
                            stltDtlArray : this.stltDtlArray.sort((a,b)=>{
                                return this.estlStltArray.map(function(e){return e.asetAmnStltTinm}).indexOf(a.stltTinm) - this.estlStltArray.map(function(e){return e.asetAmnStltTinm}).indexOf(b.stltTinm)
                            })                              // 필수약관 상세 array
                        }
                    }
                    modalService.openPopup(config).then(response => {
                        let agreeStltIdArray = response.agreeStltIdArray

                        for(let i=0; i < agreeStltIdArray.length; i++) {
                            for(let k=0; k < this.estlStltArray.length; k++) {
                                if(agreeStltIdArray[i].stltKeyNo === this.estlStltArray[k].stltKeyNo) {
                                    this.estlStltArray[k].checked = true
                                    $("#"+this.estlStltArray[k].stltKeyNo).prop("checked", true)
                                    break
                                }
                            }
                        }

                        this.setEstlAllAgreeCheck()
                    })
                }
            },

            /* 필수약관 상세 api 호출 */
            fn_callDtlApi(stltTpc, sqno) {
                let estlstltTinm = ""
                let estlstltCntn = ""

                const config_api = {
                    url : '/co/as/03r01',
                    data : {
                        "stltTpc"   : stltTpc,  //약관유형코드
                        "sqno"      : sqno,     //일련번호
                        "mydtCusno" : this.getUserInfo('mydtCusno'),
                    }
                }
                apiService.call(config_api).then(response => {
                    estlstltTinm = response.asetAmnStltTinm || ""  //자산관리약관제목명
                    estlstltCntn = response.asetAmnStltCntn || ""  //자산관리약관내용
                    
                    this.stltDtlArray.push({"stltTinm" : estlstltTinm, "stltCntn" : estlstltCntn})
                })
            },

            /*
             * 필수약관 개별선택시
             */
            chngEstlAgreeValue(event, item) {
                
                let stltKeyNo = item.stltKeyNo

                let isChecked = event.target.checked

                for(let k=0; k < this.estlStltArray.length; k++) {
                    if(stltKeyNo === this.estlStltArray[k].stltKeyNo) {
                        this.estlStltArray[k].checked = isChecked
                        event.target.checked = isChecked
                        break
                    }
                }

                this.setEstlAllAgreeCheck()
            },

            /*
             * 필수약관 동의 체크처리
             */
            setEstlAllAgreeCheck() {
                let estlStltCheckCount = 0

                for(let k=0; k < this.estlStltArray.length; k++) {
                    if(this.estlStltArray[k].checked === true) {
                        estlStltCheckCount++
                    }
                }

                if(this.estlStltArray.length === estlStltCheckCount) {
                    this.estlAgreeCheckYn = true
                } else {
                    this.estlAgreeCheckYn = false
                }
            },

            /* 필수 약관 보기 */
            openDtlPop(item) {
                let stltDtlArray = []           // 약관상세목록
                let stltKeyNo = item.stltKeyNo  // 약관키

                const config_api = {
                    url : '/co/as/03r01',
                    data : {
                        "stltTpc"   : item.stltTpc,  //약관유형코드
                        "sqno"      : item.sqno,     //일련번호
                        "mydtCusno" : this.getUserInfo('mydtCusno'),
                    }
                }
                apiService.call(config_api).then(response => {
                    let estlstltTinm = response.asetAmnStltTinm || ""  //자산관리약관제목명
                    let estlstltCntn = response.asetAmnStltCntn || ""  //자산관리약관내용

                    stltDtlArray.push({"stltTinm" : estlstltTinm, "stltCntn" : estlstltCntn})
                })

                //필수약관상세 팝업 호출
                const config = {
                    component: COAS2004, 
                    params: {
                        flag      : "each",                 //전체여부
                        stltDtlArray : stltDtlArray,       //필수약관 array
                    }
                }
                modalService.openPopup(config).then(response => {
                    let isChecked = (response.agreeYn === "Y") ? true : false

                    for(let k=0; k < this.estlStltArray.length; k++) {
                        if(stltKeyNo === this.estlStltArray[k].stltKeyNo) {
                            this.estlStltArray[k].checked = isChecked
                            
                            $("#"+stltKeyNo).prop("checked", isChecked)
                            break
                        }
                    }

                    this.setEstlAllAgreeCheck()
                })
            },

            fn_openBrowser() {
                // 외부 브라우저 링크 오픈 
                // appService.executeBrowser("http://www.mydatacenter.or.kr")

                let url = "http://www.mydatacenter.or.kr"

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

            fn_nextStep(e) {
                if(e.target.className.indexOf("btn_off") != -1) return false

                console.log(this.optlStltArray)
                const config = {
                    component : COAS2003,
                    params : {
                        optlStltArray   : this.optlStltArray,   // 선택약관목록
                        estlStltArray   : this.estlStltArray,   // 필수약관목록
                        emailAdr        : this.emailAdr,        // 이메일주소
                        email           : this.email            // 이메일
                    }
                }
                modalService.openPopup(config).then()
            },

            fn_closePopup() {
                this.close()
            }
        },
        components: {      
            
        },
    }
</script>