<!--
/*************************************************************************
* @ 서비스경로 : 연금절세 > 연말정산공제금액
* @ 페이지설명 : 연금절세 > 연말정산공제금액 > 연금 세액공제
* @ 파일명     : src\views\page\PD\YT\PDYT4106\PDYT4106.vue
* @ 작성자     : CS533541
* @ 작성일     : 2023-07-20
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-20              CS533541              최초작성(PDYT1106.vue -> PDYT2106.vue)
* 2025-03-26              CS541015              상호금융 NH콕마이데이터 4.0 추진 개발(PDYT2106.vue -> PDYT4106.vue)
*************************************************************************/
-->
<template>
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">    
			<h1>연금 세액공제</h1>
		</div>
		<div class="popup_content com_no_bottom com_bg_type00">
			<div class="com_inner bank_book_area">
				<div class="card_list_box bank_book_box">
					<ul class="list_type_01">
						<li>
							<div class="cont_box">
								<i class="pension"><span class="blind">연금상품개수</span></i>
								<em>보유한 연금상품 <span>{{irp_irpCn}}</span>개</em>
								<div>
									<span>납입금액</span> <span>{{irp_pymAm | numberFilter}}</span>원
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			
			<div class="com_inner">
				<div class="card_info_box">
					<div class="txt_caution">
						납입한 금액 중  <span>{{irp_madAm | numberFilter}}원</span>을<br> 소득공제 받을 수 있습니다. 
						<div class="com_tooltip_type02 com_tooltip_type03">
							<a href="javascript:void(0);" class="com_btn_info">
								<em class="com_icon_info"><span class="blind">툴팁열기</span></em>                  
								<span class="arrow" ></span>
							</a>                          
							<div class="com_ballon_type01 com_ballon_type02">       
								<div>
									연결된 계좌 기준으로 계산된 공제 예상 금액으로 실제 공제 금액과는 다를 수 있습니다.
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
									<em class="num">{{irp_madObjAm | numberFilter}}</em><em class="unit">원</em>
								</p>
							</li>
							<li>
								<p>
									<span>공제예상금액</span>
									<em class="num">{{irp_madAm | numberFilter}}</em><em class="unit">원</em>
								</p>
							</li>
						</ul>
					</div>
					<p class="com_txtinfo_type01">공제한도: {{fn_numberToKorea(irp_madLmtAm)}} 한도 내 {{irp_madRto}}%</p>	
				</div>
			</div>
			<div class="com_space_type01"></div>

			<div class="info_payment_deducation">
				<p v-if="irp_adtMadPymAm > 0">{{irp_adtMadPymAm | numberFilter}}원을 추가 납입하면<span><br>{{irp_adtMadAm | numberFilter}}원</span>을 더 공제 받을 수 있습니다.</p>
				<p v-else>올해 청약 소득공제 가능한<br>금액을 모두 받을 수 있습니다.</p>
			</div>
			
			<div class="new_add_register"><a href="javascript:void(0);" @click.prevent="fn_openCOAR4001()"><span>더 연결할 자산이 있으신가요?</span></a></div>
	
			<div class="com_inner">
				<ul class="bl_dot_list one_register_list mt0">
					<li>IRP에 한해 계산된 금액이며 연금저축이 있는 경우 보유 금액을 포함하여 한도가 적용됩니다.</li>
					<li>연금 개시 전 중도 해지 시 16.5%의 기타소득세가 부과됩니다. </li>
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

import COAR4001 from '@/views/page/CO/AR/COAR4001/COAR4001'

export default {
    name : "PDYT4106",
    data: () => {
        return {
			totSalAm		: "",	// 연소득총액(재조회용)
			irp_madAm 		: "",	// 공제금액
			irp_irpCn 		: "",	// IRP건수
			irp_pymAm 		: "",	// 납입금액
			irp_madObjAm 	: "",	// 공제대상금액
			irp_madLmtAm 	: "",	// 공제한도금액
			irp_madRto 		: "",	// 공제비율
			irp_adtMadPymAm : "",	// 추가공제납입금액
			irp_adtMadAm 	: "",	// 추가공제금액
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
			this.totSalAm			= param.totSalAm		|| 0	// 연소득총액(재조회용)
			this.irp_madAm 			= param.irp_madAm 		|| 0	// 공제금액
			this.irp_irpCn 			= param.irp_irpCn 		|| 0	// IRP건수
			this.irp_pymAm 			= param.irp_pymAm 		|| 0	// 납입금액
			this.irp_madObjAm 		= param.irp_madObjAm 	|| 0	// 공제대상금액
			this.irp_madLmtAm 		= param.irp_madLmtAm 	|| 0	// 공제한도금액
			this.irp_madRto 		= param.irp_madRto 		|| 0	// 공제비율
			this.irp_adtMadPymAm	= param.irp_adtMadPymAm || 0	// 추가공제납입금액
			this.irp_adtMadAm 		= param.irp_adtMadAm 	|| 0	// 추가공제금액

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
				this.irp_madAm 			= response.irpYendTx.madAm 		 || 0	// 공제금액
				this.irp_irpCn 			= response.irpYendTx.irpCn 		 || 0	// IRP건수
				this.irp_pymAm 			= response.irpYendTx.pymAm 		 || 0	// 납입금액
				this.irp_madObjAm 		= response.irpYendTx.madObjAm 	 || 0	// 공제대상금액
				this.irp_madLmtAm 		= response.irpYendTx.madLmtAm 	 || 0	// 공제한도금액
				this.irp_madRto 		= response.irpYendTx.madRto 	 || 0	// 공제비율
				this.irp_adtMadPymAm 	= response.irpYendTx.adtMadPymAm || 0	// 추가공제납입금액
				this.irp_adtMadAm 		= response.irpYendTx.adtMadAm 	 || 0	// 추가공제금액

				// 연금연동여부확인
				// IRP건수 > 0 	-> true
				// IRP건수 == 0 -> false
				let isIrpConnect = (this.irp_irpCn < 1) ? false : true

				if(!isIrpConnect) this.close()
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
		fn_openCOAR4001() {
			const config = {
				component : COAR4001,
			}
			modalService.openPopup(config).then(() => {
				this.fn_reGetData()
            })
		}
    }
}
</script>