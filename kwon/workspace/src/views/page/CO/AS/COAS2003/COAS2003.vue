<!--
/*************************************************************************
* @ 서비스경로 : 자산관리 서비스 가입 > 선택약관 동의
* @ 페이지설명 : 자산관리서비스 선택약관 동의
* @ 파일명     : src/views/page/CO/AS/COAS2003/COAS2003.vue
* @ 작성자     : CS533035
* @ 작성일     : 2023-08-23
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-06-29              CS528069              최초작성
* 2023-08-23              CS533035              화면번호수정(COAS1003->COAS2003)
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>서비스 가입</h1>
			<a href="javascript:void(0);" class="btn_back" @click="fn_closePopup()"><span class="blind">이전화면</span></a>
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<strong class="com_cont_tit02">다양한 서비스 제공을 받기 위해<br/>
					약관에 동의해 주세요
				</strong>
				<div class="custom_terms">
					<div class="new_check_all">
						<span class="btn_check">
							<input type="checkbox" name="allagree" id="checkall_1" v-model="optlAgreeCheckYn" @change="optlAllAgreeCheck($event)" ref="checkAll">
							<label for="checkall_1">
								<span>선택 약관 전체 동의</span>
							</label>
						</span>
					</div>
					<ul class="new_agree_list">
                        <li v-for="(item, index) in optlStltArray" :key="index">
                            <span class="btn_check">
                                <input type="checkbox" name="agree"
                                    :checked="item.checked" :id="item.stltKeyNo"
                                    :essYn="item.essYn" @change="chngOptlAgreeValue($event, item)">
                                <label :for="item.stltKeyNo">
                                    <span>{{item.asetAmnStltTinm}}</span>
                                </label>
                                <button type="button" class="btn_arrow" @click.prevent="openDtlPop(item)">상세보기</button>
                            </span>
                        </li>
					</ul>
				</div>
				<div class="custom_terms">
					<div class="new_check_all">
						<span class="btn_check">
							<input type="checkbox" name="allagree" id="checkemail" v-model="isRecvInfoAgree">
							<label for="checkemail">
								<span>서비스 변동 내용 수신 동의</span>
							</label>
						</span>
					</div>
					<div class="new_agree_list terms_email" v-show="isRecvInfoAgree">
						<div class="com_input_type01">
							<input type="text" id="com_input01"
                                class="com_txtright_type02" name="" value="" required=""
                                placeholder="이메일 주소를 입력해 주세요." title="이메일 주소" ref="email" v-model="email">
							<label for="com_input01"><span class="txt_label_x">이메일 주소</span></label>
							<div class="del_txt">
                                <a href="javascript:void(0);" class="com_btn_delete2" @click.prevent="fn_delTxt()" v-show="email.length > 0"><span class="blind">삭제</span></a>
								<span class="com_inputtxtright2 type02"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="popup_footer fixed" id="content-bottom">
			<div class="btn_full_box">
				<a href="javascript:void(0);" class="btn btn_mint" @click.prevent="fn_saveAgreeNext()">다음</a>
			</div>
		</div>

		<!-- <a href="javascript:void(0);" class="btn_close" @click="fn_closePopup()"><span class="blind">팝업닫기</span></a>		 -->
	</div>
	<!--// full popup E -->
</template>

<script>
    import modalService from '@/service/modalService'
    import apiService from '@/service/apiService'
    import userService from '@/service/userService'
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import {mapGetters, mapActions} from 'vuex'
    import {dateFormat} from '@/utils/date'
    import {isValidEmailAddr} from '@/utils/data'

    import COAS2004 from '@/views/page/CO/AS/COAS2004/COAS2004'
    import COAS2005 from '@/views/page/CO/AS/COAS2005/COAS2005'
    import COAS2007 from '@/views/page/CO/AS/COAS2007/COAS2007'
    import COAS2010 from '@/views/page/CO/AS/COAS2010/COAS2010'

    export default {
        name: 'COAS2003',
        data: () => {
            return {
                estlStltArray       : [],       // 필수약관 목록
                optlStltArray       : [],       // 선택약관 목록
                stltDtlArray        : [],       // 약관상세목록 array
                optlAgreeCheckYn    : false,    // 선택 약관 전체 동의 체크 여부
                isRecvInfoAgree     : false,    // 이메일 수신 동의 여부

                email       : "",   // 이메일 주소
                emailAdr    : "",

                respRegInfo : {},       // 응답결과 가입정보(권유직원, 거래지점정보)
                regEntYn    : false,    // 1년이내 재가입 : true, 1년초과 : false
                invtBrc          : "",   //거래지점코드
                invtBrnm         : "",   //거래지점명
                invtAdr          : "",   //거래지점주소
                invtEmpEno       : "",   //권유직원코드
                invtEmpnm        : "",   //권유직원명
                invtEmpBrc       : "",   //권유직원사무소
                invtEmpBrnm      : "",   //권유직원사무소명
                invtDt           : "",   //권유일자 (add 2021.10.26)
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
                this.optlStltArray  = this.params.optlStltArray || []   // 선택약관목록
                this.estlStltArray  = this.params.estlStltArray || []   // 필수약관목록
                this.email          = this.params.email || ""           // 이메일
                this.emailAdr       = this.params.emailAdr || ""        // 이메일주소

                // 선택약관 목록 체크 여부 초기화
                for(let i=0; i < this.optlStltArray.length; i++) {
                    this.optlStltArray[i].checked = false
                }

                /////////////////////////////////////////////////////////
                ///// 선택 약관 상세 전체보기 파라미터 준비             ////
                ///// slick 기능과 api충돌로 인한 순서 안맞는 현상 회피 ////
                /////////////////////////////////////////////////////////
                let stltTpc = ""        // 약관유형코드
                let sqno    = ""        // 일련번호
                this.stltDtlArray = []  // 약관상세목록

                for(let i=0; i < this.optlStltArray.length; i++) {
                    setTimeout(() => {
                        stltTpc = this.optlStltArray[i].stltTpc || ""
                        sqno    = this.optlStltArray[i].sqno || ""

                        this.fn_callDtlApi(stltTpc, sqno)
                    }, 100);
                }
            },

            /*
             * 선택약관 전체동의
             */
            optlAllAgreeCheck(event) {
                for(let k=0; k < this.optlStltArray.length; k++) {
                    // 선택동의 전체해제
                    this.optlStltArray[k].checked = false
                    $("#"+this.optlStltArray[k].stltKeyNo).prop("checked", false)
                }

                if(event.target.checked === false) {

                    this.setOptlAllAgreeCheck()

                } else {
                    // 선택 약관 전체동의 체크 우선 해제
                    this.$refs.checkAll.checked = false
                    
                    this.optlAgreeCheckYn = false

                    // 약관상세 팝업 호출
                    const config = {
                        component: COAS2004, 
                        params: {
                            flag            : "all",                // 전체여부
                            stltArray       : this.optlStltArray,   // 필수약관 array
                            stltDtlArray    : this.stltDtlArray.sort((a,b)=>{
                                return this.optlStltArray.map(function(e){return e.asetAmnStltTinm}).indexOf(a.stltTinm) - this.optlStltArray.map(function(e){return e.asetAmnStltTinm}).indexOf(b.stltTinm)
                            })                              // 필수약관 상세 array
                        }
                    }
                    modalService.openPopup(config).then(response => {
                        let agreeStltIdArray = response.agreeStltIdArray

                        for(let i=0; i < agreeStltIdArray.length; i++) {
                            for(let k=0; k < this.optlStltArray.length; k++) {
                                if(agreeStltIdArray[i].stltKeyNo === this.optlStltArray[k].stltKeyNo) {
                                    this.optlStltArray[k].checked = true
                                    $("#"+this.optlStltArray[k].stltKeyNo).prop("checked", true)
                                    break
                                }
                            }
                        }

                        this.setOptlAllAgreeCheck()
                    })
                }
            },

            /* 선택약관 상세 api 호출 */
            fn_callDtlApi(stltTpc, sqno) {
                let optlstltTinm = ""
                let optlstltCntn = ""

                const config_api = {
                    url : '/co/as/03r01',
                    data : {
                        "stltTpc"   : stltTpc,  //약관유형코드
                        "sqno"      : sqno,     //일련번호
                        "mydtCusno" : this.getUserInfo('mydtCusno'),
                    }
                }
                apiService.call(config_api).then(response => {
                    optlstltTinm = response.asetAmnStltTinm || ""  //자산관리약관제목명
                    optlstltCntn = response.asetAmnStltCntn || ""  //자산관리약관내용

                    this.stltDtlArray.push({"stltTinm" : optlstltTinm, "stltCntn" : optlstltCntn})
                })
            },

            /*
             * 선택약관 개별선택시
             */
            chngOptlAgreeValue(event, item) {
                
                let stltKeyNo = item.stltKeyNo  // 약관키

                let isChecked = event.target.checked

                for(let k=0; k < this.optlStltArray.length; k++) {
                    if(stltKeyNo === this.optlStltArray[k].stltKeyNo) {
                        this.optlStltArray[k].checked = isChecked
                        event.target.checked = isChecked
                        break
                    }
                }

                this.setOptlAllAgreeCheck()
            },

            /* 선택 약관 상세 보기 */
            openDtlPop(item) {
                let stltDtlArray = []   // 약관상세목록
                let stltKeyNo = item.stltKeyNo

                const config_api = {
                    url : '/co/as/03r01',
                    data : {
                        "stltTpc"   : item.stltTpc,  //약관유형코드
                        "sqno"      : item.sqno,     //일련번호
                        "mydtCusno" : this.getUserInfo('mydtCusno'),
                    }
                }
                apiService.call(config_api).then(response => {
                    let optlstltTinm = response.asetAmnStltTinm || ""  //자산관리약관제목명
                    let optlstltCntn = response.asetAmnStltCntn || ""  //자산관리약관내용

                    stltDtlArray.push({"stltTinm" : optlstltTinm, "stltCntn" : optlstltCntn})
                })

                //필수약관상세 팝업 호출
                const config = {
                    component: COAS2004, 
                    params: { // 파라미터
                        flag      : "each",                 //전체여부
                        stltDtlArray : stltDtlArray,       //필수약관 array
                    }
                }
                modalService.openPopup(config).then(response => {
                    let isChecked = (response.agreeYn === "Y") ? true : false

                    for(let k=0; k < this.optlStltArray.length; k++) {
                        if(stltKeyNo === this.optlStltArray[k].stltKeyNo) {
                            this.optlStltArray[k].checked = isChecked
                            
                            $("#"+stltKeyNo).prop("checked", isChecked)
                            break
                        }
                    }

                    this.setOptlAllAgreeCheck()
                })
            },

            /*
             * 선택약관 동의 체크처리
             */
            setOptlAllAgreeCheck() {
                let optlStltCheckCount = 0

                for(let k=0; k < this.optlStltArray.length; k++) {
                    if(this.optlStltArray[k].checked === true) {
                        optlStltCheckCount++
                    }
                }

                if(this.optlStltArray.length === optlStltCheckCount) {
                    this.optlAgreeCheckYn = true
                } else {
                    this.optlAgreeCheckYn = false
                }
            },

            /* 정보수신동의 */
            changeInfoAgree(e) {
                // this.isRecvInfoAgree = e.target.checked

                // if(e.target.checked === false) {
                //     this.email = ""
                // } else {
                //     this.email = this.emailAdr
                //     setTimeout(() => {
                //         this.$refs.email.focus()

                //         let $content = $("#content-prev")
                //         let $footer = $("#content-bottom")

                //         let emailBottom = Number(this.$refs.email.getBoundingClientRect().Bottom)
                //         let footerPosTop = Number($footer[0].getBoundingClientRect().top)

                //         if((footerPosTop - emailBottom) < 10) {
                //             let currPosHeight = Number(this.$refs.email.getBoundingClientRect().height)
                //             let currScrollTop = $content[0].scrollTop

                //             $content[0].scrollTop = currScrollTop + currPosHeight + 50
                //         }
                //     }, 100)
                // }
            },

            /* 약관동의 후 '다음' 버튼 이벤트 */
            fn_saveAgreeNext() {
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

                ///////////////////////////////////////////////////////
                // 거래농축협/권유직원 등록 유무에 따라 분기처리
                // 1. 등록된 거래농축협이 없거나 해지 후 1년 이후       거래 농축협 선택-슬라이드팝업(COAS2005) 호출
                // 2. 등록된 거래농축협은 있으나 권유직원이 없는경우    권유직원 선택 팝업(COAS2007) 호출
                // 3. 등록된 거래농축협 & 권유직원 모두 있을경우        서비스 가입 완료 팝업(COAS2010) 호출
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
                    // 1년이내 재가입시 권유사무소 및 권유직원 수정 불가
                    // response.entYn = '0' : 가입1년초과, '1' : 가입1년이내
                    if(this.respRegInfo.entYn === '1') {
                        this.regEntYn = true    // 1년이내 재가입

                        this.invtBrc     = this.respRegInfo.brc          //거래지점코드
                        this.invtBrnm    = this.respRegInfo.brnm         //거래지점명
                        this.invtAdr     = this.respRegInfo.brAdr        //거래지점주소
                        this.invtEmpEno  = this.respRegInfo.invtEmpEno   //권유직원코드
                        this.invtEmpnm   = this.respRegInfo.invtEmpnm    //권유직원명
                        this.invtEmpBrc  = this.respRegInfo.invtEmpBrc   //권유직원사무소
                        this.invtEmpBrnm = this.respRegInfo.invtEmpBrnm  //권유직원사무소명
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

                        // 1년내 가입시 권유직원/거래지점 변경불가 처리위함. mutation 등록
                        this.setUserTermInvtInfo(invtInfo)

                        if(!this.isNull(this.invtBrc)) {
                            if(!this.isNull(this.invtEmpEno)) {
                                console.log(">>>> 1년이내 재가입/ 거래농축협, 권유직원 있음 >>>>")
                                console.log("서비스 가입 완료 팝업(COAS2010) 호출")
                                // 가입처리 api 호출 후 서비스 가입 완료 팝업 호출
                                this.fn_saveComplCustInfo()
                            } else {
                                console.log(">>>> 1년이내 재가입/ 거래농축협 o, 권유직원 x >>>>")
                                console.log("권유직원 선택 팝업(COAS2007) 호출")
                                let brcObj = {brAdr : this.invtAdr, brc : this.invtBrc, brnm : this.invtBrnm}
                                this.fn_openCOAS2007(brcObj, false)
                            }
                        } else {
                            console.log(">>>> 1년이내 재가입/ 거래농축협 x >>>>")
                            console.log("거래 농축협 선택-슬라이드팝업(COAS2005) 호출")
                            // 거래지점 선택 슬라이드 팝업 오픈
                            const config_slide = {
                                params : {},
                                renderer : {
                                    component : COAS2005
                                }
                            }
                            modalService.openSlidePagePopup(config_slide).then(response => {
                                if(!this.isNull(response)) {
                                    // 슬라이드 팝업 요소 선택 후 '거래농축협/권유직원 확인' 팝업 오픈
                                    this.fn_openCOAS2007(response.brcObj, true)
                                }
                            })
                        }
                    } else {
                        console.log(">>>> 탈퇴 1년초과 >>>>")
                        console.log("거래 농축협 선택-슬라이드팝업(COAS2005) 호출")
                        // 거래지점 선택 슬라이드 팝업 오픈
                        const config_slide = {
                            params : {},
                            renderer : {
                                component : COAS2005
                            }
                        }
                        modalService.openSlidePagePopup(config_slide).then(response => {
                            if(!this.isNull(response)) {
                                // 슬라이드 팝업 요소 선택 후 '거래농축협/권유직원 확인' 팝업 오픈
                                this.fn_openCOAS2007(response.brcObj, true)
                            }
                        })
                    }
                })
            },

            /* '거래농축협/권유직원 확인' 팝업 오픈 */
            fn_openCOAS2007(obj, brcModYn) {
                const config_popup = {
                    component : COAS2007,
                    params : {
                        brcObj      : obj || {},    // 선택 거래농축협 정보
                        brcModYn    : brcModYn      // 거래 농축협 변경가능 여부
                    }
                }
                modalService.openPopup(config_popup)
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
                        const menu = {
                            component : COAS2010
                        }
                        userService.setUserInfo().then(response => {
                            this.$store.dispatch('user/setUserInfo', response)  // 사용자정보 재조회
                            modalService.openPopup(menu)
                        })
                    } 
                })
            },

            /* input 내 x 버튼 클릭 */
            fn_delTxt() {
                this.email = ""
            },

            /* 팝업 close */
            fn_closePopup() {
                this.close()
            }

        },
        components: {      
            
        },
    }
</script>