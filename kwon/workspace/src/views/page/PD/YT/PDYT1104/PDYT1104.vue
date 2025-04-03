<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나를위한금융
* @ 페이지설명 : 금융과생활 > 나를위한금융 > 나의 연말정산 > 카드 소득공제
* @ 파일명     : src\views\page\PD\YT\PDYT1104\PDYT1104.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-08-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-26              CS515897              최초작성
*************************************************************************/
-->
<template>
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">    
			<h1>카드 소득공제</h1>
		</div>
		<div class="popup_content com_no_bottom com_bg_type00">
			<div class="com_inner com_line_type01 com_top_type02">
				<div class="com_box_type01 com_box_list01">
					<div class="list_type_box">
						<div class="new_tit_area">
							<div class="tit"><span>카드사용금액</span></div>
							<span class="total_price mint">
								<em class="num">{{cd_usSam | numberFilter}}</em><em class="unit">원</em>
							</span>
						</div>
						<ul class="list_type_02">
							<li>
								<dl>
									<dt>
										<div>
											<em>신용</em>
											<span class="com_icon_num">{{cd_ccdCn}}</span>
										</div>
									</dt>
									<dd>
										<span class="com_price">
											<em class="num ">{{cd_ccdUsAm | numberFilter}}</em><em class="unit">원</em>
										</span>
									</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt>
										<div>
											<em>체크</em>
											<span class="com_icon_num">{{cd_chkCdcn}}</span>
										</div>
									</dt>
									<dd>
										<span class="com_price">
											<em class="num ">{{cd_chkCdUsAm | numberFilter}}</em><em class="unit">원</em>
										</span>
									</dd>
								</dl>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="com_inner">
				<div class="card_info_box" v-if="cd_ovrYn !== '1'">
					<p class="txt_caution">카드사용금액 <span v-html="fn_numberToKorea(cd_minCdUsAm)"></span>이 넘어야<br>소득공제 받을 수 있습니다.</p>
				</div>
				<!-- 총소득 대비 카드사용금액이 25% 초과된 경우 문구 출력 -->
				<div class="card_info_box" v-else>
					<div class="txt_caution">
						최대 <span>{{cd_maxMadAm | numberFilter}}원</span>까지<br>소득공제 받을 수 있습니다.
						<div class="com_tooltip_type02 com_tooltip_type03">
							<a href="javascript:void(0);" class="com_btn_info">
								<em class="com_icon_info"><span class="blind">툴팁열기</span></em>                  
								<span class="arrow" ></span>
							</a>                          
							<div class="com_ballon_type01 com_ballon_type02">       
								<div>아래 총 소득에 따라 공제 한도가 적용됩니다.<br/>
									<p class="dot_msg mt5">300만원(7천만원 이하)</p>
									<p class="dot_msg">250만원(7천만원 ~ 1억2천만원)</p>
									<p class="dot_msg">200만원(1억2천만원 초과)</p>
									<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
								</div> <!-- 말풍선영역 -->
							</div>
						</div>
					</div>
						
				</div>
				<!-- //총소득 대비 카드사용금액이 25% 초과된 경우 문구 출력 -->
			</div>
			<div class="com_space_type01"></div>
			<div class="com_inner">
				<div class="new_tit_area">
					<div class="tit"><span>카드 소득공제율</span></div>
				</div>
				<ul class="list_type_02">
					<li>
						<dl>
							<dt>
								<div><em>신용카드</em></div>
							</dt>
							<dd>
								<span class="com_price">
									<em class="num">{{cd_ccdMadrt}}</em><em class="unit">%</em>
								</span>
							</dd>
						</dl>
					</li>
					<li>
						<dl>
							<dt>
								<div><em>직불(체크카드)</em></div>
							</dt>
							<dd>
								<span class="com_price">
									<em class="num">{{cd_chkCdMadrt}}</em><em class="unit">%</em>
								</span>
							</dd>
						</dl>
					</li>
				</ul>
			</div>
			<div class="com_space_type01"></div>
			<!-- 총소득 대비 카드사용금액이 25% 초과된 경우 문구 출력 -->
			<div class="info_over" v-if="cd_ovrYn === '1'">
				<p><span>체크카드</span>를 사용하면 소득공제를<br>더 많이 받을 수 있습니다.</p>
			</div>
			<!-- //총소득 대비 카드사용금액이 25% 초과된 경우 문구 출력 -->
			<div class="new_add_register"><a href="javascript:void(0);" @click.prevent="fn_openCOAR2001()"><span>더 연결할 자산이 있으신가요?</span></a></div>
			<div class="com_inner">
				<ul class="bl_dot_list one_register_list mt0">
					<li>총 소득의 25%를 넘게 사용한 금액부터 소득공제 금액으로 적용됩니다.</li>
					<li>전통시장/대중교통, 도서ㆍ공연비는 위의 최대 소득공제 금액과 별도로 추가 공제가 가능합니다.</li>
					<li>보험료 등 중복 공제 제외 대상 금액이 포함 된 금액으로 실제 공제 금액과 다를 수 있습니다.</li>
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
import modalService from '@/service/modalService'
import {numberFormat} from '@/utils/number'

import COAR2001 from '@/views/page/CO/AR/COAR2001/COAR2001'

export default {
    name : "PDYT1104",
    data: () => {
        return {
			totSalAm		: "",	// 연소득총액(재조회용)
			cd_maxMadAm 	: "",	// 최대공제금액
			cd_ovrYn 		: "",	// 25%초과여부
			cd_usSam 		: "",	// 이용금액합계
			cd_ccdCn 		: "",	// 신용카드수
			cd_ccdUsAm 		: "",	// 신용카드이용금액
			cd_chkCdcn 		: "",	// 체크카드수
			cd_chkCdUsAm 	: "",	// 체크카드이용금액
			cd_ccdMadrt 	: "",	// 신용카드공제율
			cd_chkCdMadrt 	: "",	// 체크카드공제율
			cd_minCdUsAm 	: "",	// 최소카드사용금액
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
			this.totSalAm		= param.totSalAm		|| 0	// 연소득총액(재조회용)
			this.cd_maxMadAm 	= param.cd_maxMadAm 	|| 0	// 최대공제금액
			this.cd_ovrYn 		= param.cd_ovrYn 		|| ""	// 25%초과여부
			this.cd_usSam 		= param.cd_usSam 		|| 0	// 이용금액합계
			this.cd_ccdCn 		= param.cd_ccdCn 		|| 0	// 신용카드수
			this.cd_ccdUsAm 	= param.cd_ccdUsAm 		|| 0	// 신용카드이용금액
			this.cd_chkCdcn 	= param.cd_chkCdcn 		|| 0	// 체크카드수
			this.cd_chkCdUsAm 	= param.cd_chkCdUsAm	|| 0	// 체크카드이용금액
			this.cd_ccdMadrt 	= param.cd_ccdMadrt 	|| 0	// 신용카드공제율
			this.cd_chkCdMadrt 	= param.cd_chkCdMadrt	|| 0	// 체크카드공제율
			this.cd_minCdUsAm 	= param.cd_minCdUsAm	|| 0	// 최소카드사용금액

            this.getData()
        },
        getData() {

		},
		fn_reGetData() {
			let date = new Date()
			// 현재 월이 1월이거나 2월일 경우 이전년도 연말정산
			let chkPastYear = (date.getMonth() + 1 < 3) ? true : false
			
			let basyy = (chkPastYear) ? date.getFullYear() - 1 : date.getFullYear()

			const config = {
				url : "/pd/yt/03r01",
				data : {
					mydtCusno : this.getUserInfo("mydtCusno"),
					basyy : basyy,
					totSalAm : this.totSalAm,
				}
			}
			apiService.call(config).then(response => {
				this.cd_maxMadAm 	= response.cdYendTx.maxMadAm 	|| 0	// 최대공제금액
				this.cd_ovrYn 		= response.cdYendTx.ovrYn 		|| ""	// 25%초과여부
				this.cd_usSam 		= response.cdYendTx.usSam 		|| 0	// 이용금액합계
				this.cd_ccdCn 		= response.cdYendTx.ccdCn 		|| 0	// 신용카드수
				this.cd_ccdUsAm 	= response.cdYendTx.ccdUsAm		|| 0	// 신용카드이용금액
				this.cd_chkCdcn 	= response.cdYendTx.chkCdcn		|| 0	// 체크카드수
				this.cd_chkCdUsAm 	= response.cdYendTx.chkCdUsAm	|| 0	// 체크카드이용금액
				this.cd_ccdMadrt 	= response.cdYendTx.ccdMadrt 	|| 0	// 신용카드공제율
				this.cd_chkCdMadrt 	= response.cdYendTx.chkCdMadrt 	|| 0	// 체크카드공제율
				this.cd_minCdUsAm 	= response.cdYendTx.minCdUsAm 	|| 0	// 최소카드사용금액

				// 카드연동여부확인
				// 신용/체크 카드 개수 > 0 -> true
				// 신용/체크 카드 개수 = 0 -> false
				let isCdConnect = (this.cd_ccdCn < 1 && this.cd_chkCdcn < 1) ? false : true

				// 카드연동이 되지않았을 경우 팝업 close
				if(!isCdConnect) this.close()
			})
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
		fn_openCOAR2001() {
			const config = {
				component : COAR2001,
			}
			modalService.openPopup(config).then(() => {
				this.fn_reGetData()
            })
		}
    }
}
</script>