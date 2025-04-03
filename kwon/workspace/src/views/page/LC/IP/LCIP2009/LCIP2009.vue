<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출분석
* @ 페이지설명 : 지출 > 지출분석 > 정기지출 추가
* @ 파일명     : src\views\page\LC\IP\LCIP2009\LCIP2009.vue
* @ 작성자     : CS533457
* @ 작성일     : 2023-08-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-10              CS533457              최초작성
*************************************************************************/
-->
<template>
	<div>
		<!-- 슬라이드 팝업 시작 -->
		<div class="dimmed" style="display: block;"></div>
		<div class="popup_box renewal mydata2023">
			<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
				<div class="popup_header">
					<strong class="com_pop_tit01">정기지출 추가</strong>
				</div>
				<div class="popup_content">
					<ul class="expenditure_link_list">
						<li><a href="javascript:void(0);" @click.prevent="openPop('LCIP2010')">최근 지출 내역에서 추가</a></li> <!--LCIP2010-->
						<li><a href="javascript:void(0);" @click.prevent="openPop('COAR2002')">새로운 자산에서 추가</a></li> <!--COAR2002 자산연결-->
					</ul>
				</div>
				<div class="popup_footer">
				</div>
				<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
			</div>
		</div>
		<!--// 슬라이드 팝업 종료 -->
	</div>
</template>

<script>
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import COAR2002 from '@/views/page/CO/AR/COAR2002/COAR2002'
import LCIP2010 from '@/views/page/LC/IP/LCIP2010/LCIP2010'

export default {
    name : "LCIP2009",
    data: () => {
        return {
            res: {},
			cusNb: '',              // 마이데이터고객번호
			basDt: null,            // 조회 기준일자 YYYYMMDD
        }
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    created() {
    },
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent(param) {
			this.cusNb = param.mydtCusno
			this.basDt = param.basDt
        },
        openPop(viewName) {
			let config = {}
			
			if (viewName == 'COAR2002') {
				config = {
					component: COAR2002,
					params : {}
				}
			}
			else if (viewName == 'LCIP2010') {
				config = {
					component: LCIP2010,
					params : {
                    "mydtCusno" : this.cusNb,
						"basDt" : this.basDt,
					}
				}
			}

            modalService.openPopup(config).then(response => {
				if(viewName == 'LCIP2010' && response === 'complete'){
					this.close(response)
				}
            })
		},
	},
    
}
</script>