<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 숨은 자산 > 약관동의상세
* @ 페이지설명 : 자산 > 숨은 자산 > 약관동의상세
* @ 파일명     : src/views/page/AS/TN/ASTN4005/ASTN4005.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-03-13
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-03-13              CS541599              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">
			<h1>약관동의</h1>
			<!-- <button type="button" class="prev"><span class="blind">이전</span></button> -->
		</div>		
		<div class="popup_content"  id="terms_popup">
			<div class="terms_view slide">
				<div v-for="(item, idx) in stltArray" :key="idx">
					<strong class="terms_tit">{{item.stltTinm}}</strong>
					<div class="terms_cont" v-html="item.stltCntn"></div>
				</div>
			</div>
		</div>
		<div class="popup_footer fixed">
			<!-- 복수 : 전체동의 -->
			<div class="btns_wrap"  v-if="allYn" @click.prevent="fnAgreeTerm('all')">
				<button type="button" class="btns lg primary">전체 동의</button>
			</div>
			<!-- //복수 : 전체동의 -->
			<!-- 개별 -->
			<div class="btns_wrap" v-else @click.prevent="fnAgreeTerm(stltArray[0].stltSqno)">
				<a href="#nolink" class="btns lg primary">동의</a>
			</div>
			<!-- //개별 -->
		</div>
		<a href="#nolink" class="btn_close" @click.prevent="close({agreeYn:'N'})"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'
import {mapGetters, mapActions} from 'vuex'
import _ from 'lodash'

export default {
    name : "ASTN4005",
    data: () => {
        return {
            allYn         : false,
            isAgree       : false, // 동의 버튼 활성화 여부

            stltArray     : [],      // 약관목록 array

            agreeCheckYn  : false,   // 필수약관 모두 동의여부
        }
    },
	computed: {
        ...mapGetters('user', [
            'userTermsAgreeList',
            'userTermsInvtInfo',
            'userRecvInfo'
        ]),
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
            this.stltArray = param.stltArray
            this.getData()

            if(param.flag == 'all') {
                this.allYn = true
                this.$nextTick(() => {
                    this.fnSlick()
                })
            }
        },

        getData() {

        },
        /* 동의 버튼 */
        fnAgreeTerm(sqno) {
            let param = {
                agreeYn : 'Y',
                sqno    : sqno
            }
            this.close(param)
        },

        fnSlick() {
            $('.terms_view.slide').slick({
                dots:true, // [v4.0] dot nav 추가
                slidesToShow: 1,
                infinite: false,
                adaptiveHeight:true,
                height:'auto',
                customPaging:function(slider,i){
                    return '<button type="button">총'+slider.$slides.length+'개의 슬라이드중 '+ (i+1) +'번째 슬라이드</button>';
                }
            });
        }


    },
    components : {

    },
    destroyed() {
        this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>