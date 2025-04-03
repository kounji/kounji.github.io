<!--
/*************************************************************************
* @ 서비스경로 : 자산관리 서비스 가입 > 거래농축협/권유직원 확인 선택 팝업
* @ 페이지설명 : 영업점 및 권유직원 선택 확인
* @ 파일명     : src/views/page/CO/AS/COAS2007/COAS2007.vue
* @ 작성자     : CS533035
* @ 작성일     : 2023-08-23
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-01              CS528069              최초작성
* 2023-08-23              CS533035              화면번호수정(COAS1007->COAS2007)
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>서비스 가입</h1>
			<a href="javascript:void(0);" class="btn_back" @click.prevent="closePopup()"><span class="blind">이전화면</span></a>
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner com_line_type01 com_top_type02">
				<strong class="com_pop_tit01">거래 농축협 영업점과<br/>
					권유직원을 선택해 주세요</strong>
			</div>
			<div class="com_inner">
				<div class="new_sec_box custom">
					<div class="tit_wrap">
						<strong class="com_pop_tit01">거래 농축협</strong>
						<div class="fr">
							<a href="javascript:void(0);" role="button" class="com_btnround_type03 custom_co" v-if="brcModYn" @click.prevent="fn_chngBrc()"><span>변경</span></a>
						</div>
					</div>
					<ul class="list_round_box">
                        <li v-if="brcObj !== {}">
                            <input type="radio" disabled name="area" id="area_01">
                            <label for="area_01">
                                <dl>
                                    <dt>{{brcObj.brnm}}</dt>
                                    <dd>{{brcObj.brAdr}}</dd>
                                </dl>
                            </label>
                        </li>
					</ul>
				</div>
				<div class="search_name">
					<strong class="com_pop_tit01">권유직원(선택)</strong>
					<div class="com_input_type02">
						<input type="search" id="txt01" class="inputClear" name="" :value="setEnoInfo()" placeholder="직원을 검색하세요" title="권유직원 찾기" readonly @click.prevent="fn_srchInvtEno()">
						<a href="javascript:void(0);" role="button" class="com_btn_delete" :class="enoDataYn" @click.prevent="deleteEnoInfo()"><span class="blind">삭제</span></a>
						<a href="javascript:void(0);" role="button" class="com_btn_search" v-if="enoModYn" @click.prevent="fn_srchInvtEno()"><span class="blind">검색</span></a>
					</div>
					<p class="txt01">등록한 거래 농축협과 권유직원은 서비스 해지 후<br>
						1년 이후 변경 가능합니다.</p>
				</div>
			</div>

		</div>

		<div class="popup_footer fixed">
			<div class="btn_full_box">
                <template v-if="isProcessing === false">
                    <a href="javascript:void(0);" role="button" class="btn btn_mint" @click.prevent="fn_chkEmptyEno()">가입하기</a>
                </template>
                <template v-else>
                    <a href="javascript:void(0);" role="button" class="btn btn_mint">가입 진행중</a>
                </template>
			</div>
		</div>

		<!-- <a href="javascript:void(0);" class="btn_close" @click.prevent="closePopup()"><span class="blind">팝업닫기</span></a>		 -->
	</div>
	<!--// full popup E -->
</template>

<script>
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import userService from '@/service/userService'
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import {maskingformat} from '@/utils/data'
    import {dateFormat} from '@/utils/date'
    import {mapGetters} from 'vuex'

    import COAS2006 from '@/views/page/CO/AS/COAS2006/COAS2006'
    import COAS2008 from '@/views/page/CO/AS/COAS2008/COAS2008'
    import COAS2009 from '@/views/page/CO/AS/COAS2009/COAS2009'
    import COAS2010 from '@/views/page/CO/AS/COAS2010/COAS2010'

    export default {
        name: 'COAS2007',
        data: () => {
            return {
                brcObj      : {},   // 선택된 거래농축협 정보객체
                brcModYn    : false,// 거래농축협 변경 가능 여부
                enoObj      : "",   // 선택된 권유직원 정보
                enoModYn    : false,// 권유직원 변경 가능 여부
                selectedEno : "",   // 선택된 권유직원 번호
                selectedBrc : "",   // 선택된 거래농축협 코드

                isProcessing : false,   // 가입진행여부 (중복체크)
            }
        },
        computed: {
            ...mapGetters('user', [
                'userTermsInvtInfo',
                'userTermsAgreeList',
                'userRecvInfo'
            ]),
            enoDataYn() {
                return this.isNull(this.enoObj) ? "" : "btnDeleteShow"
            }
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
            initComponent() {
                this.getData()
            },
            getData() {
                this.brcObj     = this.params.brcObj || {}
                this.enoObj  = ""
                this.brcModYn   = this.params.brcModYn || false

                console.log(this.userTermsInvtInfo)
                // 권유직원정보 존재여부 체크
                if(this.userTermsInvtInfo.invtEmpEno === undefined 
                    || this.userTermsInvtInfo.invtEmpEno === null || this.userTermsInvtInfo.invtEmpEno === "") {
                    this.enoModYn = true    // 권유직원 변경 가능
                } else {
                    this.enoModYn = false   // 권유직원 변경 불가
                }
            },

            /* 거래 농축협 변경 */
            fn_chngBrc() {
                const config = {
                    component : COAS2006,
                    params : {}
                }
                modalService.openPopup(config).then(response => {
                    this.brcObj = response.brcObj || this.brcObj
                })
            },

            /* 권유직원 검색 */
            fn_srchInvtEno() {
                this.enoObj = ""   // 선택 권유직원 정보 초기화

                const config = {
                    component : COAS2008,
                    params : {

                    }
                }
                modalService.openPopup(config).then(response => {
                    if(!this.isNull(response)) {
                        this.enoObj = response.selectEno || ""
                    }
                    console.log(this.enoObj)
                })
            },

            /* 권유직원 검색 리턴값 설정 */
            setEnoInfo() {
                if(!this.isNull(this.enoObj)) {
                    if(!this.isNull(this.enoObj.empnm) && !this.isNull(this.enoObj.eno)) {
                        return maskingformat(this.enoObj.empnm, "name") + " (" + this.maskingData(this.enoObj.eno) + ")"
                    } else if(!this.isNull(this.enoObj.empnm) && this.isNull(this.enoObj.eno)) {
                        return maskingformat(this.enoObj.empnm, "namex")
                    }
                } else {
                    return ""
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

            /* 권유직원 clear */
            deleteEnoInfo() {
                this.enoObj = ""
            },

            /* 마이데이터 서비스 가입 전 권유직원 확인 */
            fn_chkEmptyEno() {
                console.log("brcObj >>> ", this.brcObj)
                console.log("enoObj >>> ", this.enoObj)

                if(this.isNull(this.enoObj)) {
                    const config_noEno = {
                        params : {},
                        renderer : {
                            component : COAS2009
                        }
                    }
                    modalService.openSlidePagePopup(config_noEno).then(response => {
                        let nxFlag = response || ""

                        if(nxFlag === "selectEno") {
                            // 권유직원 찾기
                            this.fn_srchInvtEno()
                            return false
                        } else if(nxFlag === "continue") {
                            // 권유직원 없이 가입
                            console.log("권유직원 없이 가입!")
                            this.fn_saveCustInfo()
                        }
                    })
                } else {
                    console.log("권유직원 있고 가입!")
                    this.fn_saveCustInfo()
                }
            },

            /* 마이데이터 서비스 가입 */
            fn_saveCustInfo() {
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

                let invtDate = ""
                let tempEno = ""
                let tempBrc = ""

                this.selectedEno = this.enoObj.eno || ""
                this.selectedBrc = this.brcObj.brc || ""

                if((this.selectedEno != 'undefined' && this.selectedEno != null && this.selectedEno != "")) {
                    tempEno = this.selectedEno.replace(/ /gi, "")
                }
                if((this.selectedBrc != 'undefined' && this.selectedBrc != null && this.selectedBrc != "")) {
                    tempBrc = this.selectedBrc.replace(/ /gi, "")
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
                let emailAdr    = this.userRecvInfo.emailAdr    // 정보수신 email

                // 가입처리
                const config = {
                    url : '/co/as/05i01',
                    data : {
                        mydtCusno       : this.getUserInfo("mydtCusno"),    // 마이데이터고객번호
                        invtBrc         : this.selectedBrc,                 // 권유사무소코드(거래농축협코드)
                        invtEmpEno      : this.selectedEno,                 // 권유직원번호
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

                // 가입버튼 처리용
                this.isProcessing = true

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
                    } else {
                        this.isProcessing = false
                    }
                })
            },

            /* 팝업닫기 */
            closePopup() {
                this.close()
            }
        },
        components: {      
            
        },
    }
    
</script>