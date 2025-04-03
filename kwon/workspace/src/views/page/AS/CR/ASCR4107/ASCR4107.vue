<!--
/*************************************************************************
* @ 서비스경로 : 나의 신용점수 올리기 > 신용정보
* @ 페이지설명 : 나의 신용점수 올리기 > 신용정보 메인 > 신용정보관리팁
* @ 파일명     : src/views/page/AS/CR/ASCR4107/ASCR4107.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-02-06
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-06              CS541013              최초작성
*************************************************************************/
-->
<template>
<div class="full_popup" id="full_popup_01">
    <!--[타이틀(Start)]-->
    <div class="popup_header">    
        <h1>신용정보관리</h1> 
		<a href="javascript:void(0);" class="btn_close" v-on:click.prevent="closePopup"><span class="blind">팝업닫기</span></a>	
    </div>
    <!--[타이틀(End)]-->

    <!--메인(Body)-->	
    <div class="popup_content com_no_bottom com_bg_type00">
        <div class="com_inner com_line_type01">
            <strong class="com_cont_tit01">신용점수 이렇게 관리하면 올릴수 있어요.</strong>
        </div>
        <div class="com_inner">
            <div class="tex_sec_box">
                <div class="txt_sec">
                    <div class="sec_l">
                        <div class="tit">내 신용점수 꾸준히 확인하기</div>
                        <div class="photo"><img src="@/assets_v40/images/sub/img_credit_04.png" alt="비금융권 대출은 지양하기 이미지"></div>
                        <div class="txt">신용점수는 여러 번 조회해도 내 신용점수에 영향이 없으니 자주 확인하고 꾸준히 관리하는 습관이 필요합니다.
                            <span>2011년 10월 이후부터 신용조회 기록이 신용평가에 반영되지 않도록 개선되었습니다.</span>
                        </div>
                    </div>
                </div>

                <div class="txt_sec">
                    <div class="sec_r">
                        <div class="tit">비금융권 대출은 지양하기</div>
                        <div class="photo"><img src="@/assets_v40/images/sub/img_credit_01.png" alt="비금융권 대출은 지양하기 이미지"></div>
                        <div class="txt">신용평가에서는 어디에서 대출을 
                            받았는지도 중요한 요소로 작용하기 
                            때문에 금융권 저리 대출을 이용하고
                            금융권(카드론, 저축은행 등), 
                            비금융권은 지양하는 것이 좋습니다.</div>
                    </div>
                </div>

                <div class="txt_sec">
                    <div class="sec_l">
                        <div class="tit">대출상환은 유리한 순서대로 하기</div>
                        <div class="photo"><img src="@/assets_v40/images/sub/img_credit_02.png" alt="대출상환은 유리한 순서대로 하기 이미지"></div>
                        <div class="txt">대출 이후 하락한 신용점수를 
                            올리기 위해서는 오래된 대출, 
                            금액이 큰 대출을 가장 먼저 
                            상환 하는 것이 좋습니다.</div>
                    </div>
                </div>
                <div class="txt_sec">
                    <div class="sec_r">
                        <div class="tit">소액, 단기라도 연체하지 않기</div>
                        <div class="photo"><img src="@/assets_v40/images/sub/img_credit_03.png" alt="비금융권 대출은 지양하기 이미지"></div>
                        <div class="txt">단기 연체가 발생하면 상환을 하더라도 
                            1년간 연체 기록이 신용평가에 남게되고, 
                            연체 경험이 있다면 추후에도 
                            연체할 가능성이 크다고 
                            판단하기 때문에 소액, 단기라도 
                            연체가 되지 않도록 조심하는 것이 좋습니다.</div>
                    </div>
                </div>
                <div class="txt_sec">
                    <div class="sec_l">
                        <div class="tit">신용거래는 오랜기간 꾸준히 하기</div>
                        <div class="photo"><img src="@/assets_v40/images/sub/img_credit_05.png" alt="대출상환은 유리한 순서대로 하기 이미지"></div>
                        <div class="txt">신용카드는 오래되고 한도가 클수록 신용점수를 올리는데 유리하며, 한도의 25% 이내로 사용하는 것이 좋습니다. 성실히 신용관리를 하고 오랜 기간 꾸준히 거래할 수록 신용점수에 긍정적으로 작용합니다.</div>
                    </div>
                </div>
            </div> <!--tex_sec_box(end)-->
        </div> <!--com_inner(End)-->
    </div>
    <!--메인(Body)-->	
    
    <a href="javascript:void(0);" class="btn_close" v-on:click.prevent="closePopup"><span class="blind">팝업닫기</span></a>		
 </div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'

    export default {
        name : "ASCR4107",
        data: () => {
            return {
            }
        },

        mixins: [
            popupMixin,
            commonMixin
        ],

        mounted() {
            this.initComponent();

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },

        methods: {
            initComponent() {
                this.getData();
            },
            
            getData() {
            },

            //[닫기]버튼 클릭
            closePopup() {

                this.reset('9')
            },

            reset(flag) {
                
                if (flag === '9') {   
                    this.close('complete')
                }
            },
        },
    }
</script>