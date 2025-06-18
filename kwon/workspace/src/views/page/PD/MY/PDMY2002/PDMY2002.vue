<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나의목표
* @ 페이지설명 : 금융과생활 > 나의목표 > 버킷리스트 만들기
* @ 파일명     : src\views\page\PD\MY\PDMY2002\PDMY2002.vue
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
					<h1>버킷리스트 만들기</h1>          
				</div>
				<div class="popup_content">
					<ul class="list_link_type">
						<li>
							<a href="javascript:void(0);" class="home" @click="openBckPop('03')">
								<p>꿈꾸던 내 집</p>
							</a>
						</li>
						<li>
							<a href="javascript:void(0);" class="car" @click="openBckPop('05')">
								<p>드림카 구입</p>
							</a>
						</li>
						<li>
							<a href="javascript:void(0);" class="travel" @click="openBckPop('04')">
								<p>설레는 여행</p>
							</a>
						</li>
						<li>
							<a href="javascript:void(0);" class="leisure" @click="openBckPop('06')">
								<p>힐링 여가생활</p>
							</a>
						</li>
						<li>
							<a href="javascript:void(0);" class="self" @click="openBckPop('07')">
								<p>자기계발 도전</p>
							</a>
						</li>
						<li>
							<a href="javascript:void(0);" class="pet" @click="openBckPop('08')">
								<p>반려동물 입양</p>
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
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'

import PDMY4023 from '@/views/page/PD/MY/PDMY4023/PDMY4023' // 내집마련 등록
import PDMY4025 from '@/views/page/PD/MY/PDMY4025/PDMY4025' // 여행목표 등록
import PDMY4024 from '@/views/page/PD/MY/PDMY4024/PDMY4024' // 내차사기 등록
import PDMY4006 from '@/views/page/PD/MY/PDMY4006/PDMY4006' // 여가생활 등록
import PDMY4015 from '@/views/page/PD/MY/PDMY4015/PDMY4015' // 자기계발 등록
import PDMY4020 from '@/views/page/PD/MY/PDMY4020/PDMY4020' // 반려동물 등록

export default {
    name : "PDMY2002",
    data: () => {
        return {

        }
    },
    mixins: [
        popupMixin
    ],
    mounted() {
        this.initComponent()

		// PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent() {
            
        },
        getData() {
            
		},
		openBckPop(fncObtDsc) {
			var compName

			if(fncObtDsc == '03') compName = PDMY4023 // 버킷-내집마련
            if(fncObtDsc == '04') compName = PDMY4025 // 버킷-여행목표
            if(fncObtDsc == '05') compName = PDMY4024 // 버킷-내차사기
            if(fncObtDsc == '06') compName = PDMY4006 // 버킷-여가생활
            if(fncObtDsc == '07') compName = PDMY4015 // 버킷-자기계발
            if(fncObtDsc == '08') compName = PDMY4020 // 버킷-반려동물

            var param = {}
            const config = {
				component: compName,
				params : param,
			}
			
			this.close(config)
		}
    }
}
</script>