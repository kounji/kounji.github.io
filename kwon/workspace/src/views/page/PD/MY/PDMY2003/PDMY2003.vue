<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나의목표
* @ 페이지설명 : 금융과생활 > 나의목표 > 버킷리스트 만들기
* @ 파일명     : src\views\page\PD\MY\PDMY2003\PDMY2003.vue
* @ 작성자     : CS533453
* @ 작성일     : 2023-07-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-17              CS533453              최초작성
*************************************************************************/
-->


<template>
	<div class="mydata2023">
		<div class="dimmed" style="display: block;" @click="close()"></div>
		<div class="popup_box renewal">
			<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
				<div class="popup_header">
					<h1>금융목표 만들기</h1>          
				</div>
				<div class="popup_content">
					<ul class="list_link_type">
						<li>
							<a href="javascript:void(0);" class="spare" @click="openFinancePop('00')">
								<p>예산만큼 아껴쓰기</p>
								<span class="mint_badge" v-if="this.expenseYn === 'Y'">진행중</span>
							</a>
						</li>
						<li>
							<a href="javascript:void(0);" class="saving" @click="openFinancePop('01')">
								<p>차근차근 돈 모으기</p>
							</a>
						</li>
						<li>
							<a href="javascript:void(0);" class="investing" @click="openFinancePop('02')">
								<p>성공적인 투자 하기</p>
							</a>
						</li>
					</ul>
				</div>
				
				<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="">취소</span></a>
			</div>
		</div>
	</div>
</template>

<script>
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
// import modalService from '@/service/modalService'

import PDMY4032 from '@/views/page/PD/MY/PDMY4032/PDMY4032' // 지출목표 등록
import PDMY2038 from '@/views/page/PD/MY/PDMY2038/PDMY2038' // 돈모으기 등록
import PDMY2040 from '@/views/page/PD/MY/PDMY2040/PDMY2040' // 투자목표 등록

export default {
	name : "PDMY2003",
	props : {
		
    },
    data: () => {
        return {
			expenseYn : ""	// 지출목표 등록여부zzzz
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
			this.expenseYn = this.params.expenseYn == 'Y' ? 'Y' : 'N'
		},
		initComponent() {
			
			this.init();
            
		},
        openFinancePop(fncObtDsc) {
			var compName

			if(fncObtDsc == '00') compName = PDMY4032 // 지출목표 등록
            if(fncObtDsc == '01') compName = PDMY2038 // 돈모으기 등록
            if(fncObtDsc == '02') compName = PDMY2040 // 투자목표 등록

            var param = {}
            const config = {
                component: compName,
                params : param
			}
			this.close(config)
		}
    }
}
</script>