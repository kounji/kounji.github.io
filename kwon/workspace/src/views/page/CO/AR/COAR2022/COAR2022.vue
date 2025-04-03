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
	<div class="popup_box renewal">
		<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
			<div class="popup_header">
				<h1>휴대폰 번호 앞자리 선택</h1>
				<!-- <a href="javascript:void(0);" role="button" class="btn_back"><span class="blind">이전화면</span></a> -->
			</div>
			<div class="popup_content">
				<div class="com_txt_type02">
					<ul class="com_radio_type01">
						<li>
							<span class="btn_radio">
								<input type="radio" name="com_check" id="com_check01" checked="checked" v-on:click.prevent="chngSelItem('010')">
								<label for="com_check01">
									<span>010</span>
								</label>
							</span>
						</li>
						<li>
							<span class="btn_radio">
								<input type="radio" name="com_check" id="com_check02" v-on:click.prevent="chngSelItem('011')">
								<label for="com_check02">
									<span>011</span>
								</label>
							</span>
						</li>
						<li>
							<span class="btn_radio">
								<input type="radio" name="com_check" id="com_check03" v-on:click.prevent="chngSelItem('016')">
								<label for="com_check03">
									<span>016</span>
								</label>
							</span>
						</li>
						<li>
							<span class="btn_radio">
								<input type="radio" name="com_check" id="com_check04" v-on:click.prevent="chngSelItem('017')">
								<label for="com_check04">
									<span>017</span>
								</label>
							</span>
						</li>
						<li>
							<span class="btn_radio">
								<input type="radio" name="com_check" id="com_check05" v-on:click.prevent="chngSelItem('018')">
								<label for="com_check05">
									<span>018</span>
								</label>
							</span>
						</li>
						<li>
							<span class="btn_radio">
								<input type="radio" name="com_check" id="com_check06" v-on:click.prevent="chngSelItem('019')">
								<label for="com_check06">
									<span>019</span>
								</label>
							</span>
						</li>
					</ul>
				</div>
			</div>
			
			<a href="javascript:void(0);" role="button" class="btn_close" v-on:click.prevent="close()"><span class="">취소</span></a>
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
    name : "COAR2022",
    data: () => {
        return {
            chkNoSeeAssets: false,
            
            // 추가 
            flag    : 1, // kimhc_20220713 임시 사용 향후 수정 필요 
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
            console.log("COAR2022 flag=", flag);
            this.close(flag);
        }
    }
}
</script>