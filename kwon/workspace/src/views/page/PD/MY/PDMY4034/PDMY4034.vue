<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > 도전목표챌린지 > 금융목표 > 지출목표
* @ 페이지설명 : 전체메뉴 > 도전목표챌린지 > 금융목표 > 지출목표 > 지출목표 수정 안내 팝업
* @ 파일명     : src\views\page\PD\MY\PDMY4034\PDMY4034.vue
* @ 작성자     : CS533453
* @ 작성일     : 2023-07-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-17              CS533453              최초작성
* 2025-02-04              CS541015              고도화 파일명, 연결화면 변경(PDMY2034.vue -> PDMY4034.vue)
*************************************************************************/
-->

<template>
	<div class="mydata2023">
		<div class="dimmed" style="display: block;"></div>
		<div class="popup_box renewal">
			<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
				<div class="popup_content com_no_top com_btn_bottom">
					<div class="com_txt_type06 cont_center">
						<p class="cont_title">지난달 지출목표 금액</p>
						<p class="cont_price">{{this.xpsObtAm | numberFilter}}원</p>
						<p class="cont_subtext">이달의 지출목표로 적용하시겠습니까?</p>
					</div>
				</div>
				<div class="popup_footer">
					<div class="com_btnhalfbox_type02">
							<a href="javascript:void(0);" class="btn btn_grey" @click="openExpensePop();">수정</a>
							<a href="javascript:void(0);" class="btn btn_mint" @click="setMaintain();">유지</a>
					</div>
				</div>

				<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="">취소</span></a>
			</div>
		</div>
	</div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'

import PDMY4032 from '@/views/page/PD/MY/PDMY4032/PDMY4032' // 지출목표 수정

export default {
    name : "PDMY4034",
    data: () => {
        return {
			stYm: "",
			xpsObtAm: 0,
			mydtCusno: ""
        }
    },
    mixins: [
        popupMixin
    ],
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
	},
    methods: {
		init() {
			this.stYm		= this.params.stYm
			this.xpsObtAm	= this.params.xpsObtAm
			this.mydtCusno  = this.getUserInfo("mydtCusno")
		},
        initComponent() {
            this.init()
		},
        getData() {
            
		},
		openExpensePop() {
			var compName = PDMY4032	// 지출목표 수정

            var param = {
				stYm : this.stYm,
				xpsObtAm : this.xpsObtAm
			}
            const config = {
                component: compName,
                params : param
            }
            modalService.openPopup(config).then(() => {

			})
		},
		setMaintain() {
			const config = {
                url: '/pd/my/34s01',  // 'pd/my/01ra2',
                data: {
						"mydtCusno": this.mydtCusno,
                        "stYm": this.stYm,
                        "xpsObtAm" : this.xpsObtAm
                        }
            };
            
            apiService.call(config).then(response => {
				if(response.rspCd == '0000'){
					modalService.alert("저장되었습니다.").then(() => {
						
						// 전체페이지 닫기
						if(this.bannerPopYn == "Y") {
							this.closeAllLeftMain('reSelect')
						} else {
							this.closeAllData('reSelect')
						}
					});
				} else {
					modalService.alert("저장 중 오류가 발생하였습니다.").then(() => {
						//this.close(response);
					})
				}
			})
		}
    }
}
</script>