<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 금융건강도 > KCB신용점수 올리기 완료페이지
* @ 페이지설명 : 나의자산 > 금융건강도 > KCB신용점수 올리기 완료페이지
* @ 파일명     : src/views/page/AS/CR/ASCR1114/ASCR1114.vue
* @ 작성자     : CS515901
* @ 작성일     : 2022-09-06
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-09-06              CS515901              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
    <div class="full_popup" id="full_popup_01" style="display:block;">
		<div class="popup_header">    
			<h1>신용점수 올리기</h1>
		</div>

        <div class="popup_content com_bg_type02">
            <!-- 신용점수가 올랐을 때 S-->
            <template v-if="rstStatus === '1'">
                <div class="secede_box grade type01">
                    <p class="txt"><strong>{{userNm}}님</strong> 신용점수가<br><strong>{{addScore}}점</strong> 올랐어요.</p>
                </div>
            </template>
            <!--// 신용점수가 올랐을 때 E -->

            <!-- 신용점수가 내려갔을 때 S -->
            <template v-else-if="rstStatus === '2'">
                <div class="secede_box grade type02">
                    <p class="txt"><strong>{{userNm}}님</strong> 신용점수가<br><strong>{{addScore}}점</strong> 내려갔어요.</p>
                </div>
            </template>
            <!-- 신용점수가 내려갔을 때 E-->

            <!-- 신용점수가 변동없을 때 S -->
            <template v-else>
                <div class="secede_box grade type03">
                    <p class="txt"><strong>{{userNm}}님</strong> 아쉽지만<br>신용점수가 오르지 않았어요.</p>
                </div>
            </template>
            <!-- 신용점수가 변동없을 때 E-->
            
            <div class="grade_info">
				<p class="dot_msg">신용점수 올리기로 반영 된 신용점수는 마이데이터의 내 신용점수와 시점의 차이가 있을 수 있습니다.</p>
                <p class="dot_msg">최근 6개월 내 다른 KCB제휴 서비스를 이용하셨거나 연체 등의 부정적인 요인이 발생한 경우, KCB내부 기준에 따라 신용점수가 변동되지 않을 수 있습니다.</p>
                <p class="dot_msg">문의: KCB올크레딧 고객센터 02-708-1000<br/>(상담가능 시간 평일 09시~18시, 공휴일 제외)</p>
            </div>
        </div>
        <div class="popup_footer fixed com_bg_type02">
			<div class="btn_full_box">
				<a href="javascript:void(0);" class="btn btn_mint" @click.prevent="close('true')">완료</a>
			</div>
		</div>
        
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close('false')"><span class="blind">팝업닫기</span></a>		
	</div>
    <!--// full popup E -->
</template>

<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    // import modalService from '@/service/modalService'
    // import appService from '@/service/appService'

    export default {
        name : "ASCR1114",
        data: () => {
            return {
                result      : {},   // api다녀온후 데이터 
                addScore    : 0,
                userNm      : '',
                rstStatus   : '',   // 1:오름, 2:내려감, 3:변동없음
            }
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        mounted() {
            this.initComponent(this.params);
            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        methods: {
            initComponent(param) {
                console.log("완료 페이지 접근 시 데이터 param :: ",param)
                this.userNm = this.getUserInfo('cusnm') || ''
                this.result = param || {}
                this.getData();
            },
            getData() {
                this.addScore = (this.result.scoreInfo.addScore || 0) * 1
                console.log('값확인 :: ', this.addScore)
                if(this.addScore > 0){
                    this.rstStatus = '1'
                }else if(this.addScore === 0){
                    this.rstStatus = '3'
                }else{
                    this.rstStatus = '2'
                    this.addScore = this.addScore * (-1)
                }
            },

        }
    }
</script>