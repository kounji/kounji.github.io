<!--
/*************************************************************************
* @ 서비스경로 : 더보기>타기관 마이데이터 관리>마이데이터 가입·조회 및 관리>서비스 이용현황 > 데이터 수집
* @ 페이지설명 : 데이터 수집
* @ 파일명     : src/views/page/CO/OR/COOR2004/COOR2004.vue
* @ 작성자     : CS530689
* @ 작성일     : 2024-11-25
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2024-11-25              CS530689                 최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup renewal mydata2023 other_mydata" id="full_popup_01"><!-- 0803 .mydata2023 클래스 이동--><!-- 2024-11 : 타기관마이데이터 other_mydata 추가 -->
        <div class="popup_header">
			<h1></h1>
		</div>	
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="renewal_loading">
				<div class="dataLoadingArea mov">
					<div class="dataLoadingBox">
						<img src="@/assets_v40/images/loading/img_dataLoadingBg.png" class="front" alt="">
						<img src="@/assets_v40/images/loading/img_dataLoadingPaper03.png" class="paper3" alt="">
						<img src="@/assets_v40/images/loading/img_dataLoadingPaper02.png" class="paper2" alt="">
						<img src="@/assets_v40/images/loading/img_dataLoadingPaper01.png" class="paper1" alt="">
						<img src="@/assets_v40/images/loading/img_dataLoadingFront.png" alt="">
					</div>
				</div>
				<div class="loading_num">
					<strong class="counter_num txt_mint">120</strong><span>초</span>
				</div>
				<p class="loading_txt">데이터를 불러오는 중입니다.</p>
				<p class="loading_txt mt5">잠시만 기다려주세요 <span class="loading_dot"></span></p>
			</div>
		</div>
		<a href="javascript:void(0)" @click="close()" class="btn_close"><span class="blind">팝업닫기</span></a>
	</div>
</template>

<script>
    // import Page from '@/views/layout/Page.vue'

    import apiService from '@/service/apiService'
    import commonService from '@/service/commonService'
    import modalService from '@/service/modalService'
    import routerService from '@/service/routerService'
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'

    import {mapGetters} from 'vuex'
    
    // import _ from 'lodash'

    export default {
        name : "COOR2004",
        data: () => {
            return {
                intervalTimer : null
            }
        },
        computed: {
        },
        created() {
        },
        mounted() {

            this.initComponent()
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        methods: {
            initComponent() {
                this.timer()
                this.getData()
            },
            getData() {
                const config = {
                    url: '/co/or/01r02',
                    data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno'),
                    },
                    disableLoading : true,
                }

                apiService.call(config).then(res =>{
                    console.log('res : ', res)
                    // this.lastDt = res

                    clearInterval(this.timer)

                    this.close(res)
                })
            },
            timer() {
                let num = 120;

                this.timer = setInterval(function(){
                    num--;
                    
                    if(num < 0){
                        num = 120;
                        $('.loading_num .counter_num').text(num);
                    }else{
                        $('.loading_num .counter_num').text(num);
                    }
                },1000)
            },
            stopTimer() {
                clearInterval(this.timer)
                this.close()
            },

        },
        components : {
            // Page
        }
    }
</script>