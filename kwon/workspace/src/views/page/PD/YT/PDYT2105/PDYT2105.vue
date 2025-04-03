<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나를위한금융
* @ 페이지설명 : 금융과생활 > 나를위한금융 > 나의 연말정산 > 청약 소득공제
* @ 파일명     : src\views\page\PD\YT\PDYT2105\PDYT2105.vue
* @ 작성자     : CS533541
* @ 작성일     : 2023-07-20
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-20              CS533541              최초작성(PDYT1105.vue -> PDYT2105.vue)
*************************************************************************/
-->
<template>
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">    
			<h1>청약 소득공제</h1>
		</div>
		<div class="popup_content com_no_bottom com_bg_type00">
			<div class="com_inner bank_book_area">
				<div class="card_list_box bank_book_box">
					<ul class="list_type_01">
						<li>
							<div class="cont_box">
								<i :class="hse_infOfrmnOrgC"><span class="blind">은행아이콘</span></i>
								<em>{{hse_acWrsnm}}</em>
								<div>
									<span>납입금액</span> <span>{{hse_pymAm | numberFilter}}</span>원
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			
			<div class="com_inner">
				<div class="card_info_box">
					<div class="txt_caution">
						납입한 금액 중  <span>{{hse_madAm | numberFilter}}원</span>을<br> 소득공제 받을 수 있습니다. 
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
									<em class="num">{{hse_madObjAm | numberFilter}}</em><em class="unit">원</em>
								</p>
							</li>
							<li>
								<p>
									<span>공제예상금액</span>
									<em class="num">{{hse_madAm | numberFilter}}</em><em class="unit">원</em>
								</p>
							</li>
						</ul>
					</div>
					<p class="com_txtinfo_type01">공제한도: {{fn_numberToKorea(hse_madLmtAm)}} 한도 내 {{hse_madRto}}%</p>	
				</div>
			</div>
			<div class="com_space_type01"></div>

			<div class="info_payment_deducation">
				<p v-if="hse_adtMadPymAm > 0">{{hse_adtMadPymAm | numberFilter}}원을 추가 납입하면<span><br>{{hse_adtMadAm | numberFilter}}원</span>을 더 공제 받을 수 있습니다.</p>
				<p v-else>올해 청약 소득공제 가능한<br>금액을 모두 받을 수 있습니다.</p>
			</div>
			
			<div class="com_inner">
				<a href="javascript:void(0);" @click.prevent="fn_openPDMY2005()">
					<div class="com_box_type03 mt25 bg03">
						<div class="text">내 집 마련의 꿈<br> <span class="color">목표를 시작으로 현실로! </span></div>
					</div>
				</a>
			</div>
	
			<div class="com_inner mt40">
				<ul class="bl_dot_list one_register_list mt0">
					<li>청약 소득공제는 <span class="red">연 7천만원 이하의 무주택 근로소득자 대상</span>입니다.</li>
					<li>소득공제를 받기 위해서는 무주택확인서를 제출하셔야 합니다.</li>
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
import commonService from '@/service/commonService'

import PDMY2005 from '@/views/page/PD/MY/PDMY2005/PDMY2005'

export default {
    name : "PDYT1105",
    data: () => {
        return {
			totSalAm		: "",	// 연소득총액(재조회용)
			hse_madAm 		: "",	// 공제금액
			hse_infOfrmnOrgC: "",	// 정보제공자기관코드
			hse_acWrsnm 	: "",	// 계좌상품명
			hse_pymAm 		: "",	// 납입금액
			hse_madObjAm 	: "",	// 공제대상금액
			hse_madLmtAm 	: "",	// 공제한도금액
			hse_madRto 		: "",	// 공제비율
			hse_adtMadPymAm : "",	// 추가공제납입금액
			hse_adtMadAm 	: "",	// 추가공제금액
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
			this.totSalAm			= param.totSalAm			|| 0	// 연소득총액(재조회용)
			this.hse_madAm 			= param.hse_madAm 			|| 0	// 공제금액
			this.hse_infOfrmnOrgC	= param.hse_infOfrmnOrgC	|| ""	// 정보제공자기관코드
			this.hse_acWrsnm 		= param.hse_acWrsnm 		|| ""	// 계좌상품명
			this.hse_pymAm 			= param.hse_pymAm 			|| 0	// 납입금액
			this.hse_madObjAm 		= param.hse_madObjAm 		|| 0	// 공제대상금액
			this.hse_madLmtAm 		= param.hse_madLmtAm 		|| 0	// 공제한도금액
			this.hse_madRto 		= param.hse_madRto 			|| 0	// 공제비율
			this.hse_adtMadPymAm	= param.hse_adtMadPymAm		|| 0	// 추가공제납입금액
			this.hse_adtMadAm 		= param.hse_adtMadAm 		|| 0	// 추가공제금액

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
				this.hse_madAm 			= response.hseDpYendTx.madAm 		|| 0	// 공제금액
				this.hse_infOfrmnOrgC	= response.hseDpYendTx.infOfrmnOrgC || ""	// 정보제공자기관코드
				this.hse_acWrsnm 		= response.hseDpYendTx.acWrsnm 		|| ""	// 계좌상품명
				this.hse_pymAm 			= response.hseDpYendTx.pymAm 		|| 0	// 납입금액
				this.hse_madObjAm 		= response.hseDpYendTx.madObjAm 	|| 0	// 공제대상금액
				this.hse_madLmtAm 		= response.hseDpYendTx.madLmtAm 	|| 0	// 공제한도금액
				this.hse_madRto 		= response.hseDpYendTx.madRto 		|| 0	// 공제비율
				this.hse_adtMadPymAm 	= response.hseDpYendTx.adtMadPymAm 	|| 0	// 추가공제납입금액
				this.hse_adtMadAm 		= response.hseDpYendTx.adtMadAm 	|| 0	// 추가공제금액

				// 청약연동여부확인
				// 계좌상품명 != null -> true
				// 계좌상품명 == null -> false
				let isHseConnect = (this.hse_acWrsnm === "") ? false : true

				if(!isHseConnect) this.close()
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
		fn_openPDMY2005() {
			const config = {
				component : PDMY2005,
				params : {}
			}
			modalService.openPopup(config).then(response => {
				// 배너이미지를 통하여 목표등록을 하였을 경우
				// 나의목표로 이동
				if(response == 'reSelect') {

					this.closeAll()

					const menu = {
						name: 'PDMY2001',
						params : {}
					}
					commonService.movePage(menu)
				}
			})
		}
    }
}
</script>