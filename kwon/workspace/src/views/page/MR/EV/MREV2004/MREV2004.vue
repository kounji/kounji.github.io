<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 금융자산 > 한번에 연결 > PASS 인증 확인
* @ 페이지설명 : 공통 > 자산연결 > 금융자산 > 한번에 연결 > PASS인증 휴대폰 번호 선택
* @ 파일명     : src/views/page/CO/AR/COAR2022/COAR2022.vue
* @ 작성자     : CS528051
* @ 작성일     : 2022-07-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-18              CS528051                 최초작성
*************************************************************************/
-->
<template>
	<div>
	<!-- slide popup S -->
		<div class="dimmed" style="display: block;"></div>
		<div class="popup_box renewal mydata2023">
			<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
				<div class="popup_header">
					<strong class="com_pop_tit01">휴대전화번호</strong>
				</div>
				<div class="popup_content">
					<div class="radio_list noLine">
						<div class="btn_radio">
							<input type="radio" name="radio03" id="radio3-1" @click.prevent="chngSelItem('010')">
							<label for="radio3-1">010</label>
						</div>
						<div class="btn_radio">
							<input type="radio" name="radio03" id="radio3-2" @click.prevent="chngSelItem('011')">
							<label for="radio3-2">011</label>
						</div>
						<div class="btn_radio">
							<input type="radio" name="radio03" id="radio3-3" @click.prevent="chngSelItem('016')">
							<label for="radio3-3">016</label>
						</div>
						<div class="btn_radio">
							<input type="radio" name="radio03" id="radio3-4" @click.prevent="chngSelItem('017')">
							<label for="radio3-4">017</label>
						</div>
						<div class="btn_radio">
							<input type="radio" name="radio03" id="radio3-5" @click.prevent="chngSelItem('018')">
							<label for="radio3-5">018</label>
						</div>
						<div class="btn_radio">
							<input type="radio" name="radio03" id="radio3-5" @click.prevent="chngSelItem('019')">
							<label for="radio3-5">019</label>
						</div>
					</div>
				</div>
				<div class="popup_footer">
				</div>
				
				<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
			</div>
		</div>
	<!--// slide popup E -->
	</div>
</template>
<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'

export default {
    name : "MREV2004",
    data: () => {
        return {
            chkNoSeeAssets: false,
            
            // 추가 
            flag    : '', // kimhc_20220713 임시 사용 향후 수정 필요 
            title   : "",
            url     : "",
            boxChecked : false
        }
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    computed : {

    },
    mounted() {
        this.initComponent(this.params);
        // PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name);
    },
    methods: {
        initComponent() {
            this.getData();
        },
        getData() {

        },
        chngSelItem(flag){
            this.close(flag);
        }
    }
}
</script>