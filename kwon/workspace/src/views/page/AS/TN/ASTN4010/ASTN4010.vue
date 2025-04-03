<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 숨은 자산 > 유의사항
* @ 페이지설명 : 자산 > 숨은 자산 > 유의사항
* @ 파일명     : src/views/page/AS/TN/ASTN4010/ASTN4010.vue
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
			<h1>계좌 해지 유의사항
			</h1>
		</div>

		<div class="popup_content">
            <section class="close_account">
				<!-- 25-03-10 문구수정 -->
				<div class="tit_area">
					<h2 class="headline" @click.prevent="openStlt()">
						해지 가능한 계좌입니다.<br>
						아래 항목을 꼭 확인해 주세요.
					</h2>
				</div>
				<!-- //25-03-10 문구수정 -->

                <div class="check_all">
                    <div class="checkbox border">
                        <input type="checkbox" name="allagree1" id="checkall1" required="" v-model="allChk" @change.prevent="fnSetAllChk($event)">
                        <label for="checkall1">전체선택</label>
                    </div>
                </div>

                <div class="view_cont check_group">
                    <div class="checkbox">
                        <input type="checkbox" name="close_account" required="" id="close_account1" v-model="chk" value="1" @change.prevent="fnSetChk($event)">
                        <label for="close_account1">계좌해지는 처리가 완료된 이후 취소가 불가능합니다.</label><!-- 25-03-10 문구수정 -->
                    </div>
                    <div class="checkbox">
                        <input type="checkbox" name="close_account" required="" id="close_account2" v-model="chk" value="2" @change.prevent="fnSetChk($event)">
                        <label for="close_account2">계좌정보 및 해지예상금액 관련 세부사항은 해당 금융회사에 문의하시기 바랍니다.</label><!-- 25-03-10 문구수정 -->
                    </div>
                    <div class="checkbox">
                        <input type="checkbox" name="close_account" required="" id="close_account3" v-model="chk" value="3" @change.prevent="fnSetChk($event)">
                        <label for="close_account3">다른 금융회사로 잔고이전 할 때에는 이체수수료가 발생할 수 있습니다.</label><!-- 25-03-10 문구수정 -->
                    </div>   
                    <div class="checkbox">
                        <input type="checkbox" name="close_account" required="" id="close_account4" v-model="chk" value="4" @change.prevent="fnSetChk($event)">
                        <label for="close_account4">계좌를 해지하는 경우 해당 계좌에 등록되어 있는 자동이체(신용&middot;체크카드 포함)가 해지됩니다.</label><!-- 25-03-10 문구수정 -->
                    </div>   
                    <div class="checkbox">
                        <input type="checkbox" name="close_account" required="" id="close_account5" v-model="chk" value="5" @change.prevent="fnSetChk($event)">
                        <label for="close_account5">압류 및 가압류 계좌로 잔고를 이전하실 경우 해당 계좌로 입금된 잔고는 되찾으실 수 없습니다.</label>
                    </div>   
                    <div class="checkbox">
                        <input type="checkbox" name="close_account" required="" id="close_account6" v-model="chk" value="6" @change.prevent="fnSetChk($event)">
                        <label for="close_account6">예금보험공사는 1개 금융회사에 있는 1명의 모든 예금보호 대상 금융상품의 원금과 소정의 이자를 합하여 1인당 최고 5천만원까지 보호합니다.</label><!-- 25-03-10 문구수정 -->
                    </div>
                </div>
            </section>
		</div>

        <div class="popup_footer fixed">
            <div class="btn_full_box">
				<button type="button" class="btns lg primary" :disabled="!allChk ? true : false" @click.prevent="fnNextPage()">다음</button><!-- 25-03-10 문구수정 -->
            </div>
        </div>

		<a href="#nolink" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
		
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
import {defineAsyncComponent} from 'vue'
import _ from 'lodash'

export default {
    name : "ASTN4010",
    data: () => {
        return {
            param           : {},          // 부모로부터 넘겨받은 파라미터
            allChk          : false,
            chk             : [],
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
            this.getData()
        },

        getData() {

        },
        // 전체선택 여부
        fnSetAllChk(e) {
            let flag = e.target.checked

            if(flag) {
                // 전체 선택
				this.chk = ["1", "2", "3", "4", "5", "6"]
            }
			else {
                // 전체 해제
				this.chk = [];
			}
        }, 
		fnSetChk(e) {
			if(this.chk.length < 6) this.allChk = false
			else this.allChk = true
		},

        fnNextPage() {
            if(this.allChk) { // 전체 동의 후 다음 버튼을 누른 경우
                this.close('sucess')
            } else {
                alert("전체 동의 안됨")
            }
        },

        openStlt() {
        }

    },
    components : {

    },
    destroyed() {
        this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>