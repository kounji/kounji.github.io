<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 금융자산 > 한번에 연결 > PASS 인증 확인
* @ 페이지설명 : 공통 > 자산연결 > 금융자산 > 한번에 연결 > PASS인증 동의 슬라이드 팝업
* @ 파일명     : src/views/page/CO/AR/COAR2012/COAR2012.vue
* @ 작성자     : CS533459
* @ 작성일     : 2023-07-11
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-11              CS533459              마이데이터 확대 개발 적용
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;" @click.prevent="close"></div>
        <div class="popup_box renewal mydata2023">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
			<div class="popup_header">
				<strong class="com_pop_tit01">PASS 인증을 위해<br>동의해 주세요</strong>
			</div>
			<div class="popup_content com_btn_bottom">
				<div class="custom_terms noBorder">
					<ul class="new_agree_list">
						<li>
							<span class="btn_check">
								<input type="checkbox" name="agree" id="check01" @change.prevent="fn_noCert($event)" :checked="this.boxChecked">
								<label for="check01">
									<span>개인정보 제3자 제공 동의</span>
								</label>
								<button type="button" class="btn_arrow" @click.prevent="fn_goPassSeeAssets()">상세보기</button>
							</span>
						</li>
					</ul>
				</div>
                <div class="com_txt_sub label wPc98 mauto"><span class="pointColor green">KT PASS</span> 인증 시 실제 연결 자산과 안내 문구(인증내역)가 다를 수 있습니다. <br /> <p class="mt5">※자세한 내용은 PASS 앱 공지사항 참고 바랍니다.</p></div>
			</div>
			<div class="popup_footer">
				<div class="btn_box">
					<a :class="btnMintOnOff"  @click.prevent="fn_open1025()">동의하고 다음</a>
				</div>
			</div>
			
			<a role="button" class="btn_close" @click.prevent="closeSlide()"><span class="">닫기</span></a>
		</div>

        </div>
        <!--// slide popup E -->
    </div>
</template>
<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import modalService from '@/service/modalService'
    import apiService from '@/service/apiService'

    // PASS 인증서 약관 동의서 팝업 UI-CO-AR-1024 호출
    import COAR2020 from '@/views/page/CO/AR/COAR2020/COAR2020' // PASS인증 동의서 상세 팝업
    // import COAR2021 from '@/views/page/CO/AR/COAR2021/COAR2021' // PASS인증 정보 입력

    export default {
        name : "COAR2012",
        data: () => {
            return {
                chkNoSeeAssets: false,
                
                // 추가 
                flag            : 1, // kimhc_20220713 임시 사용 향후 수정 필요 
                title           : "",
                url             : "",
                boxChecked      : false,

                certAgrYn       : false, //신용정보 선택 여부
                certSqNo        : 0,     //약관 상품서비스안내 sqNo
                certStltTpc     : '',    //약관 상품서비스안내 stltTpc

                btnMintOnOff    : "btn btn_mint",   
            }
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        computed : {

        },
        mounted() {

            console.log("COAR2012 this.params=", this.params);

            this.initComponent(this.params)
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)  //접근로그 주석 요청. 21.12.03
        },
        methods: {
            initComponent() {
                this.getData();
            },
            getData() {
                this.fn_setting(this.flag);  

                this.boxChecked = "checked";
                this.btnMintOnOff = "btn btn_mint";
                console.log("fn_noCert certAgrYn=", this.certAgrYn);
            },
            fn_noSeeAssets(){
                if (!this.chkNoSeeAssets)
                {
                    this.closeSlide()
                }else{
                    this.closeSlide('noSeeAssets')
                }
            },
            fn_prevAgr() {

            },
            fn_open1025(){// 동의 하고 다음

                //약관 동의 저장 처리
                // this.fn_saveCert("1");// 동의: 1
                console.log("PASS 약관 동의 저장 안함.") 

                this.boxChecked = true; // 이 방식으로 됨.
                // $(this).attr('aria-checked', true);
                // $("input:checkbox[name='allagree']").prop('aria-checked', true);
                // $("input:checkbox[name='allagree']").prop('checked', true);

                // const config = {
                //     component : COAR2021,
                //     params : {
                //         userAgreeInfo : this.params.userAgreeInfo,
                //         moduleList : this.params.moduleList,
                //     }
                // }
                // // 슬라이드팝업 -> 팝업 호출 시 필수코드
                // config.renderer = this.modalConfig.renderer
                // modalService.openPopup(config).then(response => {
                //     console.log(response)
                //     this.$nextTick(()=>{// PASS인증 동의 슬라이드 팝업 닫기
                //         this.close();
                //     })
                // })
                // this.close();

                this.close('agree')
            },
            fn_setting(flag){
                if(flag === 1){
                    this.title = "본인확인서비스 이용약관"
                    this.url="https://www.mydatacert.org/mydata/terms.html"                
                }else if(flag === 2){
                    this.title="개인정보 처리 동의"
                    this.url="https://www.mydatacert.org/mydata/privacy_agreement.html"
                }else{
                    this.title="고유식별정보 수집·이용 및 위탁 동의"
                    this.url="https://www.mydatacert.org/mydata/consignment_agreement.html"
                }
            },
            fn_goPassSeeAssets() {
                
                const config = {
                    component : COAR2020,
                    params : {
                        telco_tycd  : "",
                        phone_num   : "",   // 핸드폰 번호  
                    }
                }

                // 슬라이드팝업 -> 팝업 호출 시 필수코드
                config.renderer = this.modalConfig.renderer
                modalService.openPopup(config).then(response => {
                    console.log("COAR2020 response=", response);
                    if(response){

                        // 개인정보 제3자 제공 동의 체크 박스 체크 처리(계약서 동의 후 팝업 닫히 면서 체크 박스 체크)
                        this.$nextTick(()=>{
                            $("input:checkbox[name='allagree']").prop('checked', true);
                            this.btnMintOnOff = "btn btn_mint";
                            //this.boxChecked = true; // 이 방식으로 안됨.
                        })
                        
                    } else {
                        this.$nextTick(() => {
                            $("input:checkbox[name='allagree']").prop('checked', false);
                            this.btnMintOnOff = "btn btn_mint btn_off"
                        })
                    }
                         
                })
            },
            //약관 동의 여부 조회
            fn_getCert(){
                 // 정보제공동의여부 조회
                const config = {
                    url     : "/co/co/00r03",
                    data    : {
                        mydtCusno   : this.getUserInfo("mydtCusno"),
                        ofrHdngC    : "000003",  // 000001 : 카드/자동차, 000002 : 경제데이터, 000003 (상품·서비스안내)
                    }
                }
                console.log("fn_getCert /co/co/00r03 config=", config)
                apiService.call(config).then(response => {
                    console.log("fn_getCert /co/co/00r03 response=", response);
                    this.certAgrYn      = response.agrYn === "0" ? false : true // "0" : 미동의 , "1" : 동의
                    this.certSqNo       = response.sqno     //약관 상품서비스안내 sqNo
                    this.certStltTpc    = response.stltTpc  //약관 상품서비스안내 stltTpc
                    console.log("fn_getCert /co/co/00r03 this.certAgrYn=", this.certAgrYn);
                    if(this.certAgrYn) {
                        this.boxChecked = "checked";
                        this.$nextTick(()=>{// PASS인증 동의 슬라이드 팝업 닫기
                            this.btnMintOnOff = "btn btn_mint";
                        })
                    }else{
                        this.boxChecked = "";
                        this.$nextTick(()=>{// PASS인증 동의 슬라이드 팝업 닫기
                            this.btnMintOnOff = "btn btn_mint btn_off";
                        })
                    }

                    // default 전체 선택상태
                    this.$nextTick(() => {
                        if(!this.$refs.pass_checkall.checked) {
                            this.$refs.pass_checkall.click()
                        }
                    })
                })
            },
            //약관 동의 저장 처리
            fn_saveCert(agrYn){
                const config = {
                    url : "/co/co/00i02",
                    data : {
                        mydtCusno       : this.getUserInfo("mydtCusno"),
                        ofrHdngC        : "000003",                     // 제공항목코드 (000001 : 카드/자동차, 000002 : 경제데이터, 000003 : 상품정보) 
                        // agrYn           : agrYn?"1":"0",             // 동의여부 ("1" : 동의, "0" : 미동의)
                        agrYn           : agrYn,                        // 동의여부 ("1" : 동의, "0" : 미동의)
                        firEntPathVal   : this.getUserInfo('chnlgbn'),
                        lginInfVal      : this.getUserInfo('lginInfVal'),
                        lginDtm         : this.getUserInfo('lginDtm')
                    }
                }

                console.log("fn_nofn_saveCertCert /co/co/00i02 config=", config)
                apiService.call(config).then(response => {
                    console.log("fn_saveCert /co/co/00i02 response=", response)
                    if(response.rspC === "0000") {
                        if(agrYn=="1")
                        {
                            // modalService.alert("개인(신용)정보 수집ㆍ이용 동의서 선택이 완료 되었습니다.").then(() => {});
                            this.$nextTick(()=>{// PASS인증 동의 슬라이드 팝업 닫기
                                this.btnMintOnOff = "btn btn_mint";
                            })
                        }else{
                            // modalService.alert("개인(신용)정보 수집ㆍ이용 동의서 선택이 취소 되었습니다.").then(() => {});
                            this.$nextTick(()=>{// PASS인증 동의 슬라이드 팝업 닫기
                                this.btnMintOnOff = "btn btn_mint btn_off";
                            })
                        }

                        this.fn_getCert() //약관동의 재조회
                    }
                })
            },
            // 체크요소 카운트
            fn_noCert(e) {

                console.log("fn_noCert e.target.checked=", e.target.checked);
                console.log("fn_noCert this.boxChecked=", this.boxChecked);

                if(e.target.checked) {
                    //e.target.checked = true;
                    this.boxChecked = "checked";
                    this.btnMintOnOff = "btn btn_mint";
                }else{
                    // e.target.checked = false;
                    this.boxChecked = "";
                    this.btnMintOnOff = "btn btn_mint btn_off";
                    // this.fn_saveCert("0");
                }
            },
            /* 슬라이드 팝업 닫기 */
            closeSlide() {
                this.close()
            },
        }
    }
</script>