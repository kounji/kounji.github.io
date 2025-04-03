<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 금융건강도 > 신용정보
* @ 페이지설명 : 나의자산 > 금융건강도 > 신용정보 올리기
* @ 파일명     : src/views/page/AS/CR/ASCR1112/ASCR1112.vue
* @ 작성자     : CS516033
* @ 작성일     : 2021-09-29
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-09-29              CS516033              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01">
        <div class="popup_header">
            <h1>신용정보올리기</h1>
        </div>

        <div class="popup_content com_bg_type00">
            <div class="com_inner com_top_type03">
                <strong class="com_pop_tit01 com_center mt15">공공마이데이터를 제출하여<br>신용점수를 올릴 수 있습니다.</strong>
                <div class="market_price_pointbox mt35">
                    <span class="com_point_blue num f36">{{psnCrdevlScrVal}}</span>점
                </div>
            </div>
            <div class="com_inner">
                <div class="com_box_type01 com_box_list">
                    <div class="new_tit_area">
                        <div class="tit"><span>서비스 안내</span></div>
                    </div>
                    <ul class="list_dot_type_01 point">
                        <li>‘신용 올리기’ 서비스는 신용평가기관(KCB)
                            에 비금융 성실납부 내역 및 경제활동을 증명
                            하는 정보를 제출하여 신용점수에 가산점을
                            받을 수 있도록 지원하는 서비스이며, 공공마
                            이데이터를 통하여 정보를 수집/제출 합니다.</li>
                        <li>성실 납부내역이 가점에 반영되기 위해서는
                            최근 12개월 이내에 납부내역이 존재해야 하
                            며, 연체 없는 연속적인 납부내역이 최소 12개
                            월 이상 있어야 합니다.</li>
                        <li>성실납부 내역은 기간이 길수록 가점을 차등
                            부여하며, 최대 36개월 충족 시 최대 가점 조
                            건을 충족하게 됩니다.</li>
                        <li>다른 KCB 제휴 서비스를 이용한 경우, 이미 가
                            산점이 반영되어 신용점수가 변동되지 않을수
                            있습니다.</li>
                        <li>제출한 내역이 신용평가 반영에 충분하지 않
                            거나, 이와는 별개로 연체 등 신용에 부정적인
                            요인이 발생하면 가산점을 받을 수 없습니다.</li>
                        <li>가산점 및 신용점수 변동 사유는 KCB 올크레
                            딧 고객센터 02-708-1000 로 연락하시면 해
                            당 안내를 받으실 수 있습니다.
                            영업시간은 평일(공휴일 제외) 09시부터 18시
                            까지 입니다.</li>
                    </ul>
                </div>

            </div>
        </div>

        <div class="popup_footer fixed">
            <div class="btn_full_box">
                <a href="javascript:void(0);" class="btn btn_mint" v-on:click.prevent="fn_nextStep()">제출하기</a>
            </div>
        </div>
        <a href="javascript:void(0);" class="btn_close" v-on:click.prevent="close()"><span class="blind">팝업닫기</span></a>
    </div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'

    // import IframePopup from '@/views/popup/common/IframePopup'
    import IframePopupAuth from '@/views/popup/common/IframePopupAuth'

    //import COAR0020 from '@/views/page/CO/AR/COAR0020/COAR0020'

    export default {
        name : "ASCR1112",
        data: () => {
            return {
                psnCrdevlScrVal : "" // 개인신용평가점수값
            }
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        mounted() {
            this.initComponent(this.params);

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        methods: {
            initComponent(param) {
                this.psnCrdevlScrVal = param.psnCrdevlScrVal;
            },
            fn_nextStep() {
                /* const config = {
                    component : COAR0020 // 본인인증 (인증서선택 공동/사설) 이동
                };

                modalService.openPopup(config).then((response) => {
                    // 본인인증 완료 후 KCB웹뷰 호출
                    if (response) {
                        this.fn_openIframePopup();
                    }
                }); */
            },			
			fn_openIframePopup() {
				const config = {
					component: IframePopupAuth,
					params: {
						title : '테스트',
						url   : 'https://crosscert.com/mydata/privacy_agreement.html'
					}
				}
				modalService.openPopup(config).then(response => {
					console.log(response)
				})
			}
        }
    }
</script>