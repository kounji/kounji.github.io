<!--
/*************************************************************************
* @ 서비스경로 : 자산관리 서비스 가입 > 서비스 안내 및 필수 약관 재동의
* @ 페이지설명 : 자산관리서비스 약관재동의
* @ 파일명     : src/views/page/CO/AS/COAS2104/COAS2104.vue
* @ 작성자     : CS533035
* @ 작성일     : 2023-08-23
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-04-18              CS530689              최초작성
* 2023-08-23              CS533035              화면번호수정(COAS1104->COAS2104)
*************************************************************************/
-->
<template>
    <!-- full popup S -->
    <div class="full_popup renewal" id="full_popup_01"> 
        <div class="popup_header">
            <h1>필수약관 (재)동의</h1>
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
            
            </div>
        </div>

        <div class="popup_footer fixed">
            <div class="btn_full_box">
                <a href="javascript:void(0);" class="btn" :class="btnOnOff" @click.prevent="fn_saveCustInfo($event)">동의</a>
            </div>
        </div>

        <!-- <a href="javascript:void(0);" class="btn_close" @click.prevent="fn_closePopup()"><span class="blind">팝업닫기</span></a> -->
    </div>
</template>

<script>
    import commonService from '@/service/commonService'
    import modalService from '@/service/modalService'
    import userService from '@/service/userService'
    import apiService from '@/service/apiService'
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import {mapGetters, mapActions} from 'vuex'

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
                // optlStltArray    : [],      //선택약관 array

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

            /* 마이데이터 재동의 */
            fn_saveCustInfo(e) {
                if(e.target.className.indexOf("btn_off") != -1) return false

                // 필수약관 mutation 등록
                for(let i=0; i < this.estlStltArray.length; i++) {
                    let stltKeyNo   = this.estlStltArray[i].stltKeyNo
                    let stltTpc     = this.estlStltArray[i].stltTpc     // 약관유형코드
                    let sqno        = this.estlStltArray[i].sqno        // 일련번호
                    let agrYn       = (this.estlStltArray[i].checked) ? "1" : "0"

                    let estlData = {"stltKeyNo" : stltKeyNo, "stltTpc" : stltTpc, "sqno": sqno,  "agrYn" : agrYn}
                    this.addAgreeTermInfo(estlData)
                }

                // 약관정보 생성
                let agreeList = this.userTermsAgreeList || this.$store.state.user.userTermsInfo.agreeList
                
                let stltAgrList = [];
                for(let i=0; i < agreeList.length; i++) {
                    let stltAgrObj = {}
                    stltAgrObj.stltTpc      = agreeList[i].stltTpc          // 약관유형코드
                    stltAgrObj.sqno         = agreeList[i].sqno             // 일련번호
                    stltAgrObj.agrYn        = agreeList[i].agrYn            // 약관 동의 여부 '1' : 동의, '0' : 미동의
                    stltAgrObj.mydtCusno    = this.getUserInfo("mydtCusno")

                    stltAgrList.push(stltAgrObj)
                }

                // 정보수신동의정보
                let infDpzAgrYn = this.userRecvInfo.infDpzAgrYn // 정보수신동의여부
                let emailAdr    = this.userRecvInfo.emailAdr    // 정보수신 email

                // 재동의 처리
                const config = {
                    url : '/co/as/02i01',
                    data : {
                        mydtCusno       : this.getUserInfo("mydtCusno"),    // 마이데이터고객번호
                        firEntPathVal   : this.getUserInfo("chnlGbn"),      // 유입채널구분
                        infDpzAgrYn     : infDpzAgrYn,                      // 정보수신동의여부
                        emailAdr        : emailAdr,                         // 정보수신 email
                        stltAgrList     : stltAgrList,                      // 약관동의목록
                    }
                }

                apiService.call(config).then(response => {
                    // 가입성공시
                    if(response.rspC == "0000") {
                        userService.setUserInfo().then(response => {
                            this.$store.dispatch('user/setUserInfo', response)  // 사용자정보 재조회

                            const menu = {
                                //name : "MAMA2001",
                                //상호금융 NH콕마이데이터 4.0 추진 개발
                                name : "MAMA4001",
                            }
                            commonService.movePage(menu)
                        })
                    }
                })
            },

            fn_closePopup() {
                this.close()
            }
        },
        components: {      
            
        },
    }
</script>