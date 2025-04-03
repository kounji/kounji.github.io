<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 숨은 자산 > 인증방법선택
* @ 페이지설명 : 자산 > 숨은 자산 > 인증방법선택
* @ 파일명     : src/views/page/AS/TN/ASTN4012/ASTN4012.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-03-18
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-03-18              CS541599              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01">

		<div class="popup_header">
			<h1>인증서</h1>
		</div>

		<div class="popup_content">

			<div class="certi_cont">
				<h2 class="headline">
					계좌해지를 위해<br>
					<strong>인증 방법을 선택해 주세요.</strong>
				</h2>

				<ul class="certi_list">
					<li>
						<a href="#nolink" class="item finance" @click.prevent="fnAuthPage()">
							<p class="title">금융인증서</p>
						</a>
					</li>
				</ul>
			</div>

		</div>

		<a href="#nolink" role="button" class="btn_close"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'
import {mapActions} from 'vuex'
import _ from 'lodash'

export default {
    name : "ASTN4012",
    data: () => {
        return {
            param      : {}
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
            this.param = param
        },
        fnAuthPage() {
            // 금융인증서 모듈 호출
            //callback
            //this.close('success')
        },
    },
    components : {

    },
    destroyed() {
        this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>