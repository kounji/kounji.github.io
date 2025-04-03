<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나를위한금융
* @ 페이지설명 : 금융과생활 > 나를위한금융 > 나의 연말정산 > 의료비 세액공제
* @ 파일명     : src\views\page\PD\YT\PDYT2107\PDYT2107.vue
* @ 작성자     : CS533541
* @ 작성일     : 2023-07-20
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-20              CS533541              최초작성(PDYT1107.vue -> PDYT2107.vue)
*************************************************************************/
-->
<template>
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">    
			<h1>의료비 세액공제</h1>
		</div>
		<div class="popup_content com_no_bottom com_bg_type00">
			<div class="com_inner bank_book_area">
				<div class="card_list_box bank_book_box">
					<ul class="list_type_01">
						<li>
							<div class="cont_box">
								<i class="ico_hospital"><span class="blind">의료비</span></i>
								<em>의료비</em>
								<span class="com_price">
									<em class="num">{{mdc_mdxpUsAm | numberFilter}}</em><em class="unit">원</em>
								</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
			
			<div class="com_inner">
				<div class="card_info_box">
					<div class="txt_caution">
						납입한 금액 중  <span>{{mdc_madAm | numberFilter}}원</span>을<br> 소득공제 받을 수 있습니다. 
						<div class="com_tooltip_type02 com_tooltip_type03">
							<a href="javascript:void(0);" class="com_btn_info">
								<em class="com_icon_info"><span class="blind">툴팁열기</span></em>                  
								<span class="arrow" ></span>
							</a>                          
							<div class="com_ballon_type01 com_ballon_type02">       
								<div>
									연결된 자산 기준으로 계산된 공제 예상 금액으로 실제 공제 금액과는 다를 수 있습니다.
									<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
								</div> <!-- 말풍선영역 -->
							</div>
						</div>
					</div>
					<div class="type_capsule">
						<ul>
							<li>
								<p>
									<span>공제대상금액</span>
									<em class="num">{{mdc_madObjAm | numberFilter}}</em><em class="unit">원</em>
								</p>
							</li>
							<li>
								<p>
									<span>공제예상금액</span>
									<em class="num">{{mdc_madAm | numberFilter}}</em><em class="unit">원</em>
								</p>
							</li>
						</ul>
					</div>
					<p class="com_txtinfo_type01">총 소득의 {{mdc_madBasRto}}%초과 사용한 의료비의 {{mdc_madRto}}% 공제</p>	
				</div>
			</div>
			<div class="com_space_type01"></div>
	
			<div class="com_inner mt30">
				<ul class="bl_dot_list one_register_list mt0">
					<li>의료비로 사용된 금액 중 보험금으로 수령한 금액, 진단서 발급비 등은 실제 공제시 제외됩니다.</li>
				</ul>
			</div>
        </div>

		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import {numberFormat} from '@/utils/number'

export default {
    name : "PDYT1107",
    data: () => {
        return {
			mdc_madAm 		: "",	// 공제금액
			mdc_mdxpUsAm 	: "",	// 의료비사용금액
			mdc_madObjAm 	: "",	// 공제대상금액
			mdc_madBasRto 	: "",	// 공제기준비율
			mdc_madRto 		: "",	// 공제비율
			mdc_midMdxpUsAm : "",	// 최소의료비사용금액
        }
    },
    mounted() {
		//PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

		this.initComponent(this.params)
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    methods: {
        initComponent(param = {}) {
			this.mdc_madAm 			= param.mdc_madAm 		|| 0	// 공제금액
			this.mdc_mdxpUsAm 		= param.mdc_mdxpUsAm 	|| 0	// 의료비사용금액
			this.mdc_madObjAm 		= param.mdc_madObjAm 	|| 0	// 공제대상금액
			this.mdc_madBasRto 		= param.mdc_madBasRto 	|| 0	// 금제기준비율
			this.mdc_madRto 		= param.mdc_madRto 		|| 0	// 공제비율
			this.mdc_midMdxpUsAm 	= param.mdc_midMdxpUsAm || 0	// 최소의료비사용금액

            this.getData()
        },
        getData() {

		},
		fn_numberToKorea(amt) {
			const unit = ['', '만', '억', '조', '경']
            const splitAmt = 10000
            const splitCnt = unit.length

            let resultArray = []
            let resultString = ""

            for(let i=0; i<splitCnt; i++) {
                let rst = (amt % Math.pow(splitAmt, i+1)) / Math.pow(splitAmt, i)
                rst = Math.floor(rst)

                if(rst > 0) {
                    resultArray[i] = rst
                }
            }

            let strIdx = 0  // 최초시작지점에 '원' 추가하기위함

            for(let j=0; j<resultArray.length; j++) {
                if(!resultArray[j]) {
                    strIdx++
                    continue
                }

                if(j === strIdx) {
                    resultString = String(numberFormat(resultArray[j])) + unit[j] + '원' + resultString
                } else {
                    resultString = String(numberFormat(resultArray[j])) + unit[j] + ' ' + resultString
                }
            }

            return resultString
		},
    }
}
</script>