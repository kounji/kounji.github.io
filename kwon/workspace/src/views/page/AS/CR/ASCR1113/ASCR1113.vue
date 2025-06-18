<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 금융건강도 > KCB신용점수 올리기 시작페이지
* @ 페이지설명 : 나의자산 > 금융건강도 > KCB신용점수 올리기 시작페이지
* @ 파일명     : src/views/page/AS/CR/ASCR1113/ASCR1113.vue
* @ 작성자     : CS515901
* @ 작성일     : 2022-09-06
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-09-06              CS515901              최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>신용점수 올리기</h1>
		</div>
			
		<div class="popup_content">
			<div class="grade_box fixed">
				<div class="g_cont_box">
					<div class="tit"><p>숨은 신용점수를 찾아보세요<strong>간편 신용점수 올리기</strong></p></div>
					<div class="visual"><img src="@/assets_v40/images/sub/bg_grade06.png" title="NH마이데이터 자산관리 화면 이미지"></div>
					<div class="inner_box">
						<div class="icon_box">
							<div class="icon_wrap">
								<div>
									<p><span>1</span><strong>올려보세요</strong></p>
									신용평가사에<br />성실 납부내역과<br />소득 정보를<br />제출해서<br />신용점수를<br />올릴 수 있어요.
								</div>
								<div>
									<p><span>2</span><strong>편리해요</strong></p>
									마이데이터를<br />통해 별도의 서류<br />발급 없이<br />간편하게 정보를<br />제출할 수 있어요.
								</div>
								<div>
									<p><span>3</span><strong>신속해요</strong></p>
									제출한 내역이<br />인정되면,<br />실시간으로<br />신용점수가<br />올라갈 수 있어요.
								</div>
							</div>
						</div>
						<div class="g_btn_box fixed">
							<div class="btn_full_box">
								<a href="javascript:void(0);" class="btn btn_mint" @click.prevent="fn_openKcbWebWiew()">시작하기</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>


		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    // import modalService from '@/service/modalService'
    import appService from '@/service/appService'

    export default {
        name : "ASCR1113",
        data: () => {
            return {
            }
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        mounted() {
            this.initComponent(this.params);
            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        methods: {
            initComponent(param) {
                console.log(param)
                this.getData();
            },
            getData() {
            },
            /**
             * 신용점수올리기 KCB 웹뷰호출
             */
            fn_openKcbWebWiew(){
                const config = {
                    url: '/co/co/99s02',
                    data: {
                        mydtCusno : this.getUserInfo('mydtCusno'), // 고객번호
                        menuDsc   : '470M01'
                    }
                }
                apiService.call(config).then(response =>{
                    console.log(response)
                    let json = {"url" : response.url}
                    
                    if(import.meta.env.VITE_ENV !== 'R' && !response.url){
                      json = {"url" : "https://finance.naver.com"}
                    }else if(import.meta.env.VITE_ENV === 'R' && !response.url){
                      modalService.alert("이미 다 제출하여 올릴 신용점수가 없습니다.")
                      return
                    }
                    
                    if(this.getUserInfo('chnl') === '385'){
                        appService.openPopupWebView(json).then(rst => {
                            console.log("스뱅 웹뷰다녀온 후 데이터 확인 :: ",rst)
                            this.close(rst.result.resultCallback.status)
                        })
                    }else{
                        appService.cokBankOpenPopupWebView(json).then(rst => {
                            console.log("콕뱅 웹뷰다녀온 후 데이터 확인 :: ",rst)
                            this.close(JSON.parse(rst.result).resultCallback.status)
                        }) 
                    }
                });
            },
            /**
             * 신용점수올리기 데이터받아온후 작업
             */
            fn_openCreditRaise(){
                const config = {
                    url: '/co/co/99s03',
                    data: {
                        mydtCusno : this.getUserInfo('mydtCusno'), // 고객번호
                    }
                }
                apiService.call(config).then(response =>{
                    console.log(response)
                    this.rstObj = response
                    if(this.rstObj.success === 'true'){
                        // 성공
                    }else{ 
                        // 실패
                    }
                });
            },

        }
    }
</script>