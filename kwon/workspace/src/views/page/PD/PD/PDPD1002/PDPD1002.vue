<!--
/*************************************************************************
* @ 서비스경로 : 금융생활 > 상품추천
* @ 페이지설명 : 금융생활 > 상품추천 > 상품추천조회 동의
* @ 파일명     : src\views\page\PD\PD\PDPD1002\PDPD1002.vue
* @ 작성자     : CS528053
* @ 작성일     : 2022-10-14
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-10-14              CS528053              최초작성
*************************************************************************/
-->
<template>
    <div>
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box renewal">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_content com_btn_bottom">
                    <strong class="com_pop_tit01 costom_box_com_pop_tit02">조회를 위해 동의해 주세요</strong>
                    <div class="custom_terms custom_box_terms">	
                        <ul class="new_agree_list">
                            <li>
                                <span class="btn_check">
                                    <input type="checkbox" name="agree" id="check01" ref="agreeChk" :checked="isAgree" @change.prevent="agreeBtnEvt()">
                                    <label for="check01">
                                        <span>개인(신용)정보 수집&middot;이용 동의<br>(상품서비스안내)</span>
                                    </label>
                                    <button type="button" class="btn_arrow" @click.prevent="openStltPop()">상세보기</button>
                                </span>
                            </li>						
                        </ul>
                    </div>
                </div>
                <div class="popup_footer">
                    <div class="btn_box">
                        <a href="javascript:void(0);" class="btn btn_mint" :class="isAgree == 'checked'? '' : 'btn_off'" :aria-disabled="isAgree == 'checked'? false : true" @click.prevent="insStltAgree()">동의</a><!--비활설화시 btn_off 추가-->
                    </div>
                </div>			
                <a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
            </div>
        </div>
    </div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'

import MRAT1002 from '@/views/page/MR/AT/MRAT1002/MRAT1002'     // 약관 팝업

export default {
    name : "PDPD1002",
	data: () => {
        return {
            isAgree     : 'checked',    // 동의 여부
            stltList    : []            // 약관 목록
		}
	},
	props : {

    },
    mixins: [
        popupMixin
        ,commonMixin
	],
	mounted() {
		this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
		// 초기화
		initComponent() {
            this.isAgree = 'checked';
            this.getData();
        },

        // 약관 목록 조회
        getData() {
            const config = {
                url: '/co/at/01r01',
                data: {}
            }
            apiService.call(config).then(response => {
                this.stltList = response.stltList || [];
            })
        },
        
        // 약관 팝업 오픈
        openStltPop() {
            const wrsStlt = this.stltList.find((tmp) => tmp.stltTpc == 'PFM006') || [];
            const config = {
                component: MRAT1002,        // 약관 팝업
                params : {
                    "objStltInfo" : wrsStlt
                }
            }
            modalService.openPopup(config).then(() => {
            });
        },

        // 토글 동의 버튼 이벤트
        agreeBtnEvt() {
            if(this.isAgree == 'checked') {
                this.isAgree = "";
            } else {
                this.isAgree = "checked";
            }
        },

        // 동의 버튼 시 약관 동의 등록
        insStltAgree() {
            //modalService.alert("동의버튼 서비스 개발중입니다.").then(() => {});
            //const wrsStlt = this.stltList.find((tmp) => tmp.stltTpc == 'PFM006') || [];
            const config = {
                /* 동의여부가 0으로 들어간 경우도 있어서 update 필요 -> AS-IS API로 변경
                 * AS-IS : TB_MY_CO_FH_INF_OFR_AGR  => 1개의 테이블에만 insert/update 됨
                 * TO-BE : TB_MY_CO_FH_INF_OFR_AGR, TB_MY_CO_FM_STLT_AGR  => 2개의 테이블에 insert 됨
                 */
                // TO-BE 코드 주석
                /* url: '/pd/pd/01ia1',
                data: {
                    mydtCusno       : this.getUserInfo('mydtCusno'),            // 마이데이터 고객번호
                    firEntPathVal   : '',                                       // 최초가입경로값 (필요X)
                    infDpzAgrYn     : '',                                       // 정보수신동의여부 (필요X)
                    emailAdr        : '',                                       // 이메일 주소 (필요X)
                    stltAgrList     : [{                                        // 약관 목록
                        mydtCusno       : this.getUserInfo('mydtCusno'),        // 마이데이터 고객번호
                        stltTpc         : wrsStlt.stltTpc,                      // 약관 유형 코드
                        sqno            : wrsStlt.sqno,                         // 약관 일련번호
                        agrYn           : '1'                                   // 동의여부
                    }]
                } */
                // AS-IS 코드
                url : "/co/co/00i02",
                data : {
                    mydtCusno       : this.getUserInfo("mydtCusno"),            // 마이데이터 고객번호
                    ofrHdngC        : "000003",                                 // 제공항목코드 (000001 : 카드/자동차, 000002 : 경제데이터, 000003 : 상품정보) 
                    agrYn           : "1",                                      // 동의여부 ("1" : 동의, "0" : 미동의)
                    firEntPathVal   : this.getUserInfo('chnlgbn'),              // 최초가입경로
                    lginInfVal      : this.getUserInfo('lginInfVal'),           // 로그인정보
                    lginDtm         : this.getUserInfo('lginDtm')               // 로그인일시
                }
            }
            apiService.call(config).then(() => {
                this.close('refresh');
            })
        }
	}
}
</script>