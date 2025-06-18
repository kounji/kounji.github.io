<!--
/*************************************************************************
* @ 서비스경로 : 콕마이데이터설정 > 대면상담 일회성동의
* @ 페이지설명 : 콕마이데이터설정 > 대면상담 일회성동의 > 최신자산 업데이트
* @ 파일명     : src/views/page/CO/OR/COOR4207/COOR4207.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-05-12
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-05-12              CS541013              최초작성
*************************************************************************/
-->
<template>
    <div>
		<!-- 전체 팝업 시작 -->
		<!-- slide popup S -->
		<div class="dimmed" style="display: block;"></div>
		<div class="popup_box">
			<div aria-hidden="false" class="slide_popup">
				<div class="popup_header">
					<h1>최신 자산 업데이트</h1>
				</div>
				<div class="popup_content">
					<div class="asset_update">
						<p class="txt">최신 정보로 업데이트 받으시면 보다 정확한 NH콕마이데이터 대면서비스를 받으실 수 있어요.</p>
						<div class="gray_box">
							<ul class="dash_list">
								<li><strong>업데이트 :</strong> 기존에 연결한 기관과 계좌의 최신정보를 업데이트 합니다.</li>
								<li><strong>자산연결 :</strong> 새로운 기관과 계좌를 연결할 수 있습니다.</li>
							</ul>
						</div>
					</div>
				</div>

				<div class="popup_footer">
					<div class="btn_group">
						<button type="button" class="btns lg" @click.prevent="fn_refreshApiCall()">업데이트</button>
						<button type="button" class="btns lg primary" @click.prevent="fn_openCOAR4002()">자산연결</button>
					</div>
				</div>
				<a href="javascript:void(0);" class="btn_close" @click.prevent="fnMoveToMain()"><span class="blind">닫기</span></a>
			</div>
		</div>
		<!--// 전체 팝업 종료 -->
	</div>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from '@/views/layout/FootersV2.vue'
import modalService from '@/service/modalService'
import commonMixin from '@/common/mixins/commonMixin'
import commonService from '@/service/commonService'
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import routerService from '@/service/routerService'
import {defineAsyncComponent} from 'vue'

import {mapGetters, mapActions} from 'vuex'

import COAR4002 from '@/views/page/CO/AR/COAR4002/COAR4002'

export default {
    name : "COOR4207",
	data: () => {
        return {
            
		}
	},
	computed: {
		...mapGetters('myassets', [
            'myAssetsBzRgCnt',
			'myAssetsBzrgList',
            'isMyAssetGathering',
            'lastUpdateDtm'
		]),
	},
	mixins: [
        commonMixin,
        popupMixin
    ],
	methods: {
		...mapActions('myassets', [
            'getMyBizRegInfo','getAllMyAssetInfo'
        ]),
		// 수집갱신 처리
        async fn_refreshApiCall() {
            // 20220422 두번 클릭 방지 
            if(!this.isMyAssetGathering){
                this.getAllMyAssetInfo()
            }

			this.fnMoveToMain()
        },
		fn_openCOAR4002() {
			let popId = defineAsyncComponent(() => import("@/views/page/CO/AR/COAR4002/COAR4002"))
                                
			let popParams = {
				orgDsc : 'rec',
				isExternal : true,
			}

			const popConfig = {
                params : popParams,
            	component : popId
            }

			popConfig.renderer = this.modalConfig.renderer

			modalService.openPopup(popConfig).then(() => {
				
			})
		},
		fnMoveToMain() {
			this.close()
			routerService.moveMain()
		},
	},
    watch: {
        
    },
	components: {
		Page,
        FootersV2
	}
}
</script>