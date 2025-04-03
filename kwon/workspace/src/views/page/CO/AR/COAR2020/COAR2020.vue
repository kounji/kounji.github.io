<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 금융자산 > 한번에 연결 > PASS 인증 확인
* @ 페이지설명 : 공통 > 자산연결 > 금융자산 > 한번에 연결 > PASS인증 동의서 상세 팝업
* @ 파일명     : src/views/page/CO/AR/COAR2020/COAR2020.vue
* @ 작성자     : CS528051
* @ 작성일     : 2022-07-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-18              CS528051                 최초작성
*************************************************************************/
-->

<template>
    <!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>약관동의</h1>
			<!-- <a href="javascript:void(0);" role="button" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner com_line_type01 com_cont_tit01">
				<div class="tit">
					<strong>
						개인정보 제3자 제공 동의
					</strong>
				</div>
			</div>
			<div class="terms_view">
				<div>
					<div class="terms_cont">
						<p class="terms_txt">농업협동조합중앙회(이하 “회사”라 한다)는 PASS 인증서의 원활한 진행을 위해 다음과 같은 정보를 주식회사 아톤, SK텔레콤 주식회사, 주식회사 케이티, 주식회사 LG유플러스에 제공합니다. 취득한 개인정보는 “통신비밀보호법”, “전자통신사업법”, 전자서명법 및 “정보통신망 이용촉진 및 정보보호 등에 관한 법률” 등 정보통신서비스 제공자가 준수하여야 할 관련 법령 상의 개인정보 보호 규정을 준수합니다.</p>
						<dl>
							<dt>제공 받는 자</dt>
							<dd>(주)아톤, SK텔레콤(주), (주)KT, (주)LG유플러스</dd>
							<dt>제공 목적</dt>
							<dd>본인 확인을 통한 부정이용 방지(인증서 발급/재발급
								/삭제, 서비스 제공)
								</dd>
							<dt>제공하는 개인정보</dt>
							<dd>전화번호, 이름, 통신사</dd>
							<dt>보유기간</dt>
							<dd>본 서비스 해지 시 까지 또는 관계 법령에 따른 보관 의무
								기간 동안 보관</dd>
						</dl>
						<strong class="terms_bold">“서비스” 제공을 위해 필요한 최소한의 개인정보이므로
							동의를 해주셔야 “서비스” 이용이 가능합니다.</strong>
					</div>
				</div>
			</div>
		</div>
		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" role="button" class="btn btn_mint" @click.prevent="fn_certAgree($event)">동의</a>
			</div>
		</div>
		<a href="javascript:void(0);" role="button" class="btn_close txt_cancel" @click="close()"><span>취소</span></a>
	</div>
	<!--// full popup E -->
</template>
<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'

    export default {
        name : "COAT1103",
        data: () => {
            return {
                // kimhc_20220714 추가 
                isShowAgreeBtn   	: false,   	//동의버튼활성화여부

                certAgrYn       : false, //개인(신용)정보 수집·이용 동의서(상품·서비스안내) 선택여부

                chkCertAgrYn    : false, //신용정보 선택 여부
                certSqNo        : 0,     //약관 상품서비스안내 sqNo
                certStltTpc     : '',    //약관 상품서비스안내 stltTpc
            }
        },
        mounted() {
            this.initComponent()
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        methods: {
            initComponent() {
                this.getData();
            },
            getData() {
            
                // 동의버튼 활성화(임시로 화면로드시 바로 활성화 향후 수정 필요!!!)
                this.isShowAgreeBtn = true
            },
            // 약관내용 스크롤 이벤트
            stltCntnScroll() {
                let scrollHeight = this.$refs.stltCntn.scrollHeight
                let clientHeight = this.$refs.stltCntn.clientHeight
                let scrollTop    = this.$refs.stltCntn.scrollTop

                if(Math.ceil(clientHeight + scrollTop) >= scrollHeight) {
                    // 동의버튼 활성화
                    this.isShowAgreeBtn = true
                }
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
                apiService.call(config).then(response => {
                    this.certAgrYn      = response.agrYn === "0" ? false : true // "0" : 미동의 , "1" : 동의
                    this.certSqNo       = response.sqno     //약관 상품서비스안내 sqNo
                    this.certStltTpc    = response.stltTpc  //약관 상품서비스안내 stltTpc
                })
            },
            //약관 동의 저장 처리
            fn_saveCert(agrYn){
                const config = {
                    url : "/co/co/00i02",
                    data : {
                        mydtCusno       : this.getUserInfo("mydtCusno"),
                        ofrHdngC        : "000003",                     // 제공항목코드 (000001 : 카드/자동차, 000002 : 경제데이터, 000003 : 상품정보) 
                        agrYn           : agrYn?"1":"0",                // 동의여부 ("1" : 동의, "0" : 미동의)
                        firEntPathVal   : this.getUserInfo('chnlgbn'),
                        lginInfVal      : this.getUserInfo('lginInfVal'),
                        lginDtm         : this.getUserInfo('lginDtm')
                    }
                }
                apiService.call(config).then(response => {
                    if(response.rspC === "0000") {
                        if(agrYn)
                        {
                            modalService.alert("개인(신용)정보 수집ㆍ이용 동의서 선택이 완료 되었습니다.").then(() => {});
                        }else{
                            modalService.alert("개인(신용)정보 수집ㆍ이용 동의서 선택이 취소 되었습니다.").then(() => {});
                        }

                        this.fn_getCert() //약관동의 재조회
                    }
                })
            },
            // 약관 동의 버튼 클릭 이벤트
            fn_certAgree(e) {
                if(e.target.className.indexOf("btn_off") > -1) return;

                this.certAgrYn = "1";
                //약관 동의 저장 처리
                // this.fn_saveCert(this.certAgrYn);    
                console.log("PASS 약관 동의 저장 안함.")  
                this.close("true");
            },

            // 취소버튼 클릭
            fn_cancel(){
                this.close("false");
            }
        },
        components: {
            // Page
        }
    }
</script>