<!--
/*************************************************************************
* @ 서비스경로 : 자산등록 > 자동차
* @ 페이지설명 : 자산등록 > 자동차> step 1-1. 서비스 이용 동의
* @ 파일명     : src/views/page/CO/CA/COCA2106/COCA2106.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-11-02
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-11-02              CS515897              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup">
        <div class="popup_header">    
			<h1>서비스 이용 동의</h1>		
        </div>
        <div class="popup_content com_bg_type00">
			<div class="com_inner mt28">
                <div class="secede_box_service">
                    <p class="txt">개인정보 제공 동의를 하시면<br>이용할 수 있는 서비스!</p>
                </div>
                
                <div class="com_box_type01 agree mt30 new_mb30">
                    <ul class="list_dot_type_01">
                        <li>차량번호 등록만으로 차량유지관리, 신차정보 
                            등을 제공 하는 <em>자동차관리</em></li>
                        <li>내 카드 소비성향, 내게 맞는 카드 추천 등을 
                            제공하는 <em>카드활용가이드</em></li>
                    </ul>
                </div>
                <p class="com_cont_subtit01">서비스 이용을 위해 동의가 필요합니다.</p>
                <ul class="new_agree_list mt15">
                    <li>
                        <span class="btn_check">
                            <input type="checkbox" name="agree" id="check01" @click.prevent="fn_openCertPopup($event)" v-model="chkYn">
                            <label for="check01">
                                <span>개인(신용)정보 수집ㆍ이용ㆍ제공 동의서</span>
                            </label>
                        </span>							
                    </li>
                </ul>
                <p class="dot_msg mt35">
                    위에 내용은 자동차관리, 카드활용가이드 서비스 동의 절차를 통해 이용 하실 수 있습니다.
                </p>
			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" class="btn btn_mint" :class="btnOnOff" @click.prevent="fn_useService($event)">서비스 이용하기</a>
				<!-- btn_off 제거시 활성화 -->
			</div>
		</div>

        <a href="javascript:void(0);" class="btn_close" @click.prevent="fn_closePopup()"><span class="blind">팝업닫기</span></a>	
    </div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import routerService from '@/service/routerService'

import COCO1135 from '@/views/page/CO/CO/COCO1135/COCO1135'

export default {
    name : "COCA2106",
    data: () => {
        return {
            popId       : "",       // call 페이지 ID
            certAgrYn   : false,    // 동의여부
            chkYn       : false,    // 체크박스체크여부
            stltTpc     : "",       // 약관유형코드
            sqno        : "",       // 일련번호
            asetAmnStltTinm : "",   // 약관제목명
            asetAmnStltCntn : "",   // 약관내용
        }
    },
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    computed : {
        btnOnOff() {
            return this.certAgrYn ? "" : "btn_off"
        }
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        // 화면 초기화
        initComponent(param = {}) {
            this.popId = param.popId || ""
            this.certAgrYn = param.certAgrYn || false
            this.stltTpc = param.stltTpc || ""
            this.sqno = param.sqno || ""

            this.getData()
        },
        getData() {
            const config = {
                url : "/co/at/02r01",
                data : {
                    mydtCusno : this.getUserInfo("mydtCusno"),
                    stltTpc : this.stltTpc,
                    sqno : this.sqno,
                }
            }
            apiService.call(config).then(response => {
                this.asetAmnStltTinm = response.asetAmnStltTinm || ""   // 약관제목
                this.asetAmnStltCntn = response.asetAmnStltCntn || ""   // 약관내용
            })
        },
        // 약관 팝업 오픈
        fn_openCertPopup(e) {
            e.target.checked = false
            this.chkYn = false

            const config = {
                component : COCO1135,
                params : {
                    asetAmnStltTinm : this.asetAmnStltTinm, // 약관제목
                    asetAmnStltCntn : this.asetAmnStltCntn, // 약관내용
                }
            }
            modalService.openPopup(config).then(response => {
                if(response === "true") {
                    e.target.checked = true
                    this.chkYn = true
                    this.certAgrYn = true
                } else {
                    e.target.checked = false
                    this.chkYn = false
                    this.certAgrYn = false
                }
            })
        },
        // 서비스 이용하기 버튼 클릭
        fn_useService(e) {
            if(e.target.className.indexOf("btn_off") > -1) return false

            const config = {
                url : "/co/co/00i02",
                data : {
                    mydtCusno       : this.getUserInfo("mydtCusno"),
                    ofrHdngC        : "000001",                         // 제공항목코드 (000001 : 카드/자동차, 000002 : 경제데이터)
                    agrYn           : "1",                              // 동의여부 ("1" : 동의, "0" : 미동의)
                    firEntPathVal   : this.getUserInfo('chnlGbn'),      // 유입채널구분.
                    lginInfVal      : this.getUserInfo('lginInfVal'),   // 로그인정보값(카드/자동차/경제 약관동의 처리시 필요) add 2021.11.12
                    lginDtm         : this.getUserInfo('lginDtm'),      // 로그인일시(14자리)(카드/자동차/경제 약관동의 처리시 필요) add 2021.11.12
                }
            }
            apiService.call(config).then(response => {
                if(response.rspC === "0000") {
                    this.close("true")
                }
            })
        },
        fn_closePopup() {
            if(this.popId === "COCA2101") this.closeAll()
            else if(this.popId === "PDCG0001") {
                this.close()
                routerService.movePrev()
            }
        }
        
    },
    components : {
    }
}
</script>