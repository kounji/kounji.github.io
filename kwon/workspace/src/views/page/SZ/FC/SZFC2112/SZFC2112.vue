<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 영농캘린더 > [팝업]서비스 이용동의
* @ 페이지설명 : [팝업]서비스 이용동의
* @ 파일명     : src/views/page/SZ/FC/SZFC2112/SZFC2112.vue
* @ 작성자     : 
* @ 작성일     : 2021-11-04
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-11-04                                 
*************************************************************************/
-->
<template>
<div class="full_popup" id="full_popup_01">

    <!--타이틀(Start)-->
	<div class="popup_header">    
		<h1>서비스 이용 동의</h1>
	</div>
    <!--타이틀(End)-->

    <!--본문(Start)-->
	<div class="popup_content com_bg_type00">
		<div class="com_inner com_line_type01 com_top_type04">
          <div class="secede_box_service myfarm">
              <p class="txt">나의 슬기로운 영농생활</p>
              <p class="txt_sub">나의  매입/매출 정보를 달력과<br>영농일지로 관리 할 수 있어요!</p>
          </div>
        </div>  

        <div class="com_inner">
          <p class="dot_msg mt30"><strong class="mb15">선택동의 항목입니다.</strong>
             미선택 시 영농캘린더와 영농일지에 경제데이터(매입/매출등) 연계가 불가능합니다.
          </p>

          <ul class="new_agree_list mt15">
              <li>
                  <span class="btn_check">
                      <input type="checkbox" name="agree" id="check01" @click.prevent="fn_openCertPopup($event)" :checked="culplAreaUntC==='1' " >
                      <label for="check01">
                          <span>서비스 개인(신용)정보조회동의서</span>
                      </label>
                  </span>							
              </li>
          </ul>
          <p class="dot_msg mt35">다시 보지 않기 후 약관 동의를 원할 경우 메인의 ‘약관 및 동의서’메뉴를 확인해주세요.</p>
		</div>           
    </div>
    <!--본문(End)-->
		
    <!--하단(Start)-->
    <div class="popup_footer fixed">
        <div class="btn_full_box">
            <a href="javascript:void(0);" v-on:click.prevent="fn_saveAgreeNext($event)" 
                class="btn btn_mint btn_on">서비스 이용하기
            </a>
        </div>

        <div class="noview service">
            <span class="btn_checkbox02">
                <input type="checkbox" name="check02" id="check02"> 
                <label for="check02"> 
                       <span><a href="javascript:void(0);" class="btn_checkbox02" v-on:click.prevent="fn_agreeChk()">다시 보지 않기</a></span>
                </label> 
             </span>
        </div>

    </div>
    <!--하단(End)-->

    <!--X이미지 선택(Start)-->
    <a href="javascript:void(0);" class="btn_close event" v-on:click.prevent="closePopup()">
      <span class="blind">팝업닫기</span>
    </a>		
    <!--X이미지 선택(End)-->
</div>
</template>
<script>
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
//import userService from '@/service/userService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
//import routerService from '@/service/routerService
import {dateFormat} from '@/utils/date'

import COAS2103 from '@/views/page/CO/AS/COAS2103/COAS2103'

export default {

    name : "SZFC2112",
    data: () => {
        return {

          popId    : "",     // call 페이지 ID
          agrYn    : "",     //동의여부
          stltTpc  : "",     //약관유형코드
          sqno     : "",     //일련번호
          asetAmnStltTinm  : "",  //자산관리약관제목명
          ofrHdngC1 : "",    //제공항목코드1
          ofrHdngC2 : "",    //제공항목코드2

          chkNoSeeAssets: false,           
          culplAreaUntC : "0",   // 동의여부

          today : dateFormat(new Date(), "YYYY-MM-DD")  //현재일자
        }
    },

    mixins: [
        commonMixin,
        popupMixin
    ],

    computed:{
        // btnOnOff() {
        //     return this.certAgrYn ? "" : "btn_off"
        // }      
    },

    mounted() {
      this.initComponent(this.params)
        
      //PFM로그 처리 화면접속이력 등록 POST
      apiService.pfmLogSend(this.$options.name)     
    },

    methods: {

        initComponent(param = {}) {
            this.popId   = param.popId || ""
            this.certAgrYn = param.certAgrYn || false
            this.stltTpc = param.stltTpc || ""
            this.sqno    = param.sqno || ""
            this.ofrHdngC = param.ofrHdngC || ""

            console.log(">>> [SZFC2112]initComponent(Start) <<< " )    

            console.log("[SZFC2112]initComponent()/today=>> "+this.today)

            console.log("[SZFC2112]initComponent()/(param)프로그램ID=>> "+param.popId)
            console.log("[SZFC2112]initComponent()/(param)동의여부=>> "+param.certAgrYn)
            console.log("[SZFC2112]initComponent()/(param)약관유형코드=>> "+param.stltTpc)
            console.log("[SZFC2112]initComponent()/(param)일련번호=>> "+param.sqno)
            console.log("[SZFC2112]initComponent()/(param)제공항목코드=>> "+param.ofrHdngC)

            console.log(">>> [SZFC2112]initComponent(End) <<< " )    
        },

        /*
        * 선택동의 선택
        */
        fn_openCertPopup() {

            console.log(">>> [SZFC2112]fn_openCertPopup(선택동의 선택시)-Start <<< " )    

            console.log("[SZFC2112]fn_openCertPopup/(변수)stltTpc=>> ", this.stltTpc )    
            console.log("[SZFC2112]fn_openCertPopup/(변수)sqno=>> ", this.sqno )    
            console.log("[SZFC2112]fn_openCertPopup/(변수)asetAmnStltTinm=>> ", this.asetAmnStltTinm )    

            const config = {
                component: COAS2103, 
                params: { // 파라미터
                    "flag"            : "each",
                    "stltTpc"         : this.stltTpc,   //선택한 약관번호
                    "sqno"            : this.sqno,      //일련번호
                    "asetAmnStltTinm" : this.asetAmnStltTinm //자산관리약관제목명
                }
            }
            modalService.openPopup(config).then(response => {

              console.log("[SZFC2112]fn_openCertPopup/(response)agreeYn=>> ", response.agreeYn)    

              this.culplAreaUntC = (response.agreeYn === "Y") ? '1': '0'   //response.동의여부 = Y인 경우, true값을, N인 경우 false값을...
              console.log("[SZFC2112]fn_openCertPopup/(변수)culplAreaUntC=>> ", this.culplAreaUntC)    

           })

           console.log(">>> [SZFC2112]fn_openCertPopup(선택동의 선택시)-End <<< " )    

        },    

        //정보제공동의 저장~ 
        fn_openCertSave() {
            console.log(">>> [SZFC2112]fn_openCertSave(Start) <<< " )    

            console.log("[SZFC2112]fn_openCertSave/(변수)마이데이타고객번호(mydtCusno)=>> "+this.getUserInfo("mydtCusno"))
            console.log("[SZFC2112]fn_openCertSave/(변수)제공항목코드(ofrHdngC)=>> "+this.ofrHdngC)
            console.log("[SZFC2112]fn_openCertSave/(변수)동의여부(culplAreaUntC)=>> "+this.culplAreaUntC)
            console.log("[SZFC2112]fn_openCertSave/(변수)최초가입경로값(firEntPathVal)=>> "+this.getUserInfo("chnlGbn"))
            console.log("[SZFC2112]fn_openCertSave/(변수)로그인정보값(lginInfVal)=>> "+this.getUserInfo("lginInfVal"))
            console.log("[SZFC2112]fn_openCertSave/(변수)현재일자(today)+시분=>> "+ this.getUserInfo('lginDtm'))

            const config2 = {
                url : "/co/co/00i02",
                data : {
                    mydtCusno     : this.getUserInfo("mydtCusno"),      //마이데이타고객번호
                    ofrHdngC      : this.ofrHdngC,                      //제공항목코드(000001:카드/자동차, 000002:경제데이터) = (변수)제공항목코드
                    agrYn         : this.culplAreaUntC,                 //동의여부 (1:동의,0:미동의) = (변수)동의여부
                    //*2021.11.22(월) 변경 
                    firEntPathVal : this.getUserInfo("chnlGbn"),        //최초가입경로값
                    lginInfVal    : this.getUserInfo("lginInfVal"),     //로그인정보값
                    lginDtm       : this.getUserInfo('lginDtm') ,       //로그인일시 = (변수)현재일자+시분
                    //*2021.11.22(월) 변경 
                }
            }
            apiService.call(config2).then(response => {
                 console.log("[SZFC2112]fn_openCertSave/response.rspC=>> ", response.rspC)    
                if(response.rspC === "0000") {
                   this.close('goSeemyChkFarm')
                   //*2021.12.03(금) 추가
                   //this.close('goAgreement')
                   //*2021.12.03(금) 추가
                }
            })

            console.log(">>> [SZFC2112]fn_openCertSave(End) <<< " )    
        },

        //**************
        // [닫기]버튼 클릭
        //***************/
        closePopup() {

            console.log(">>> [SZFC2112]closePopup(Start) <<< " )    

            console.log("[SZFC2112]closePopup/!this.chkNoSeeAssets(true)!!!!!")
            //this.close()
            this.close('goSeemyFarm')

            console.log(">>> [SZFC2112]closePopup(End) <<< " )    
        }, 
        
        //**************
        // [다시보지 않기]버튼 클릭
        //***************/
        fn_agreeChk()  {

            console.log(">>> [SZFC2112]fn_agreeChk(Start) <<< " )    
    
            this.close('noSeemyFarm')

            console.log(">>> [SZFC2112]fn_agreeChk(End) <<< " )    
        },

        //**************
        // [서비스이용하기]버튼 클릭
        //***************/
        fn_saveAgreeNext() {

            console.log(">>> [SZFC2112]fn_saveAgreeNext(Start) <<< " )    

            console.log("[SZFC2112]fn_saveAgreeNext/(변수)동의여부(culplAreaUntC)=>> "+this.culplAreaUntC)

            //(변수)동의여부 = 1인 경우 
            if (this.culplAreaUntC === '1' ) {
                 console.log(">>> [SZFC2112]fn_openCertPopup/동의 <<<< ")    
                 this.fn_openCertSave()  //정보제공동의 저장~ 
            } else {
                 console.log(">>> [SZFC2112]fn_openCertPopup/미동의 <<<< ")    
                 //*2021.12.06(월) 추가
                 this.close('goSeemyNonChkFarm')
                 //*2021.12.06(월) 추가
            } 
            console.log(">>> [SZFC2112]fn_saveAgreeNext(End) <<< " )    
        },
       
    },  

    components : {
    }
}   
</script>