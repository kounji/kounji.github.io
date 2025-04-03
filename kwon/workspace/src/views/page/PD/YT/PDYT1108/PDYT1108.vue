<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나를위한금융
* @ 페이지설명 : 금융과생활 > 나를위한금융 > 나의 연말정산 > 보험료 세액공제
* @ 파일명     : src\views\page\PD\YT\PDYT1108\PDYT1108.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-09-03
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-09-03              CS515897              최초작성
*************************************************************************/
-->
<template>
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">    
			<h1>보험료 세액공제</h1>
		</div>
		<div class="popup_content com_no_bottom com_bg_type00">
			<div class="com_inner bank_book_area">
				<div class="card_list_box bank_book_box">
					<ul class="list_type_01">
						<li>
							<div class="cont_box">
								<i class="one_sel_04"><span class="blind">농협</span></i>
								<em>보유한 보험상품 <span>{{insu_isrCn}}</span>개</em>
								<div>
									<span>납입금액</span> <span>{{insu_pymAm | numberFilter}}</span>원
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			
			<div class="com_inner">
				<div class="card_info_box">
					<div class="txt_caution">
						납입한 금액 중  <span>{{insu_madAm | numberFilter}}원</span>을<br> 소득공제 받을 수 있습니다. 
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
									<em class="num">{{insu_madObjAm | numberFilter}}</em><em class="unit">원</em>
								</p>
							</li>
							<li>
								<p>
									<span>공제예상금액</span>
									<em class="num">{{insu_madAm | numberFilter}}</em><em class="unit">원</em>
								</p>
							</li>
						</ul>
					</div>
					<p class="com_txtinfo_type01">공제한도: {{fn_numberToKorea(insu_madLmtAm)}} 한도 내 {{insu_madRto}}%</p>	
				</div>
			</div>
			<div class="com_space_type01"></div>
			
			<div class="new_add_register"><a href="javascript:void(0);" @click.prevent="fn_openCOAR2001()"><span>더 연결할 자산이 있으신가요?</span></a></div>
	
			<div class="com_inner">
				<ul class="bl_dot_list one_register_list mt0">
					<li>일반 보장성보험 기준으로 계산 되었으며, 장애인 전용 보험 또는 저축성 보험이 포함된 경우 실제 공제 금액과 다를 수 있습니다.</li>
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
    name : "PDYT1108",
    data: () => {
        return {
			totSalAm		: "",	// 연소득총액(재조회용)
			insu_madAm 		: "",	// 공제금액
			insu_pymAm 		: "",	// 납입금액
			insu_madObjAm 	: "",	// 공제대상금액
			insu_madLmtAm 	: "",	// 공제한도금액
			insu_madRto 	: "",	// 공제비율
			insu_isrCn 		: "",	// 보험건수
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
			this.totSalAm		=	param.totSalAm		|| 0	// 연소득총액(재조회용)
			this.insu_madAm 	=	param.insu_madAm 	|| 0	// 공제금액
			this.insu_pymAm 	=	param.insu_pymAm 	|| 0	// 납입금액
			this.insu_madObjAm 	=	param.insu_madObjAm || 0	// 공제대상금액
			this.insu_madLmtAm 	=	param.insu_madLmtAm || 0	// 공제한도금액
			this.insu_madRto 	=	param.insu_madRto 	|| 0	// 공제비율
			this.insu_isrCn 	=	param.insu_isrCn 	|| 0	// 보험건수

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
				this.insu_madAm 	= response.insuYendTx.madAm 	|| 0 	// 공제금액
				this.insu_pymAm 	= response.insuYendTx.pymAm		|| 0	// 납입금액
				this.insu_madObjAm 	= response.insuYendTx.madObjAm	|| 0	// 공제대상금액
				this.insu_madLmtAm 	= response.insuYendTx.madLmtAm	|| 0	// 공제한도금액
				this.insu_madRto 	= response.insuYendTx.madRto	|| 0	// 공제비율
				this.insu_isrCn 	= response.insuYendTx.isrCn		|| 0	// 보험건수

				// 보험연동여부확인
				// 보험건수 > 0		-> true
				// 보험건수 == 0 	-> false
				let isInsuConnect = (this.insu_isrCn > 0) ? true : false

				if(!isInsuConnect) this.close()
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