<!--
/*************************************************************************
* @ 서비스경로 : 자산등록 > 등록완료(자산)
* @ 페이지설명 : 자산등록 > 등록완료(자산)
* @ 파일명     : src/views/page/CO/CO/COCO2201/COCO2201.vue
* @ 작성자     : CS528069
* @ 작성일     : 2021-06-02
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2022-07-26              CS528069              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup renewal complete" id="full_popup_01"> 
		<div class="popup_header">
			<h1>{{titlTxt}}</h1>
			<!--
			<a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a>
			-->			
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="secede_box2">
				<p class="txt" v-if="stsDsc == 'I'">{{subTxt}} 자산을 추가했어요</p>
                <p class="txt" v-else-if="stsDsc == 'U'">{{subTxt}} 자산을 수정했어요</p>
			</div>
			<div class="btn_wrap">
				<a href="javascript:void(0);" role="button" class="com_btn_round" @click.prevent="addAset(popId, assetId)"><span class="btn_plus black">{{subTxt}} 자산추가</span></a>
			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" role="button" class="btn btn_mint" @click.prevent="closeComPop">확인</a>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click.prevent="closeComPop"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

import apiService from '@/service/apiService'
import {mapActions} from 'vuex'
import _ from 'lodash'

export default {
    name : "COCO2201",
    data: () => {
        return {
            titlTxt     : "",       // Title header
            subTxt      : "",       // 내용
            
            popId       : "",       // 부모창에서 띄운 팝업창id(추가등록용)
            assetId     : "",       // 자산 id
            //////// 추가등록 사용 시 모창 파라미터 자산 id ////////
            // 부동산 : Rlest
            // 자동차 : Car
            // 현금 : Cash
            // 외화 : Curr
            // 금 : Gold
            // 기타 : Etc
            // 빌린돈 : Loan
            // 농기계 : Agri
            /////////////////////////////////////////////////////
            stsDsc      : "",       // 등록, 수정 구분 (등록 : I, 수정 : U)

        }
    },
	computed: {
    },
    mounted() {
        this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        ...mapActions('myassets', [
            'getMyBizRegInfo','getAllMyAssetInfo'
        ]),
        initComponent(param) {
            /* 
                1) COAR2001을 통해 등록되는 경우 파라미터
                    :: popId = '', assetId = 해당자산코드
                2) COAR2001이 아닌 해당 자산의 메인을 통해 오픈되었을 경우
                    :: popId = response로 받을 파라미터

                ** 수정일 경우 반드시 popId가 값을 가지고있어야함
            */
            // v4 사용자 업데이트 외 자동수집 금지
            // this.getAllMyAssetInfo() // vuex 수집갱신 처리

            setTimeout(() => {
                this.titlTxt    = param.titlTxt || ""
                this.subTxt     = param.subTxt || ""
                
                this.popId      = param.popId || ""
                this.assetId    = param.assetId || ""
                this.stsDsc     = param.stsDsc || ""

            }, 100);
        },
        // 해당 자산 추가 버튼 클릭 이벤트
        addAset(popId, assetId) {
            if((this.assetId === "Rlest" && this.popId === "Rlest") || this.assetId === "Car" || this.assetId === "Cash" || this.assetId === "Curr" || this.assetId === "Gold" || this.assetId === "Agri") {
                // 자산등록 메인만 남기고 모든 팝업 close, 해당 자산 팝업 재오픈 방식 (COAR2001을 통해 넘어올 경우)
                this.closeAllLeftN({assetId : this.assetId, dsc : "add"}, 1)
            } else {
                // 해당 자산 메뉴를 통해 직접 오픈하였을 경우
                this.closeAll(popId)
            }
        },
        // 수정, 등록 여부 확인 후 팝업 닫기 방식 분기처리
        closeComPop() {
            
            /**
             * 오픈된 팝업 중 "농기계 상각 관리"가 존재하는지 확인 후
             * 존재할 시 "농기계 상각 관리"팝업만 남기고 close
             * 존재하지 않을 시 전체 팝업 close
             */
            let modalList = this.$store.state.modal.modalList
            let isSZST2108 = _.findIndex(modalList, d => d.component.name === "SZST2108") > -1 ? true : false

            if(isSZST2108) {
                this.closeAllLeftMain('refresh')
            } else {
                if((this.assetId === "Rlest" && this.popId === "Rlest") || this.assetId === "Car" || this.assetId === "Cash" || this.assetId === "Curr" || this.assetId === "Gold" || this.assetId === "Agri") {
                    this.closeAllLeftN({assetId : this.assetId, dsc : "subMain"}, 1)
                } else {
                    this.closeAllData('refresh')
                }
            }
        },
    },
    components : {

    },
    destroyed() {
        this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>