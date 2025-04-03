<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 금융자산 > 공공 > 공공 정보 연결 완료
* @ 페이지설명 : 공공 > 공공 정보 연결 완료
* @ 파일명     : src/views/page/CO/AR/COAR1031/COAR1031.vue
* @ 작성자     : CS528069
* @ 작성일     : 2022-09-05
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-09-05              CS528069              최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>공공 정보 연결</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner com_line_type01 com_top_type02">
				<div class="complete">
					<div class="secede_box2">
						<p class="txt">행정정보 연결이 완료 되었습니다</p>
					</div>
				</div>
			</div>
			<div class="com_inner">
				<div class="custom_list com_box_type01">
					<div class="new_tit_area">
						<div class="tit"><span>연결 성공 <em class="com_point_darkblue">{{selectList.length}}</em>개</span></div>
					</div>
					<div class="list_type_custom">
						<div class="list_item" v-for="(succItem, succIdx) in selectList" :key="'success_'+succIdx">
							<strong class="tit">{{succItem.orgnm}}</strong>
							<span class="ico_result suc">성공</span>
						</div>
						<!-- <div class="list_item">
							<strong class="tit">지방세세목별과세(납세)<br/>증명서(재산세)</strong>
							<span class="ico_result suc">성공</span>
						</div>
						<div class="list_item">
							<strong class="tit">연금산정용 가입내역확인서</strong>
							<span class="ico_result suc">성공</span>
						</div> -->
					</div>
				</div>
				<div class="custom_list com_box_type01" v-show="selectList.length < 1">
					<div class="new_tit_area">
						<div class="tit"><span>연결 실패 <em class="com_point_darkblue">2</em>개</span></div>
					</div>
					<div class="list_type_custom">
						<div class="list_item">
							<strong class="tit">공무원연금내역서</strong>
							<span class="ico_result fail">실패</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="com_btnhalfbox_type02">
				<a href="javascript:void(0);" role="button" class="btn btn_mint_gray" @click="fn_addConnect()">추가 연결</a>
				<a href="javascript:void(0);" role="button" class="btn btn_mint" @click="fn_moveMain()">확인</a>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click="closeAll"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import routerService from '@/service/routerService'
import {mapActions} from 'vuex'

import COAR2001 from '@/views/page/CO/AR/COAR2001/COAR2001'

export default {
    name : "COAR2031",
    data: () => {
        return {
			selectList : [],	// 임시) COAR1030의 selectList
        }
	},
    mounted() {
		this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)     
    },
    mixins: [
		commonMixin,
        popupMixin
	],
	computed:{
	},
    methods: {
		...mapActions('myassets', [
            'getMyBizRegInfo','getAllMyAssetInfo'
        ]),
        initComponent(param = {}) {
			this.selectList = param.selectList || []

            this.getData()
        },
        getData() {
			
		},

		// 추가연결 버튼 클릭
		fn_addConnect() {
			const config = {
				component : COAR2001,
				params : {}
			}
			modalService.openPopup(config)

			this.closeAll()
		},

		// 확인 버튼 클릭
		fn_moveMain() {
			routerService.moveMain()

			this.closeAll()
		}

    },
    components : {
	},
	destroyed() {
		this.getMyBizRegInfo()  //연결기관정보 조회/갱신
		this.getAllMyAssetInfo()
    }
}


</script>