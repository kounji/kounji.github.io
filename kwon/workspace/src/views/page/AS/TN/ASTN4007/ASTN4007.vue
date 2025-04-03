<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 숨은 자산 > 은행선택
* @ 페이지설명 : 자산 > 숨은 자산 > 은행선택
* @ 파일명     : src/views/page/AS/TN/ASTN4007/ASTN4007.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-03-14
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-03-14              CS541599              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>은행선택</h1>
			<button type="button" class="prev"><span class="blind">이전</span></button>
		</div>

		<div class="popup_content">
            <section class="close_account">
                <p class="headline">잔액을 이체하실<br>은행을 선택해주세요.</p>

                <div class="gray_box">
                    <p>금융결제원 정책에 따라 실제 해당 기능(해지 및 잔고이전)을 제공하는 은행권 계좌에만 잔고를 이전할 수 있습니다. </p>
                </div>

                <ul class="sel_list">
                    <li>
                        <div class="radio round">
                            <input type="radio" name="bank" id="bank_01" v-model="selOrg" value="A1AABG0000">
                            <label for="bank_01">
                                <i class="ico_bank A1AABG0000"></i>
                                <strong class="bank_name">NH농협</strong>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="radio round">
                            <input type="radio" name="bank" id="bank_02" v-model="selOrg" value="A1AAAD0000">
                            <label for="bank_02">
                                <i class="ico_bank A1AAAD0000"></i>
                                <strong class="bank_name">산업은행</strong>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="radio round">
                            <input type="radio" name="bank" id="bank_03" v-model="selOrg" value="A1AAES0000">
                            <label for="bank_03">
                                <i class="ico_bank A1AAES0000"></i>
                                <strong class="bank_name">신한은행</strong>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="radio round">
                            <input type="radio" name="bank" id="bank_04" v-model="selOrg" value="A1AAEM0000">
                            <label for="bank_04">
                                <i class="ico_bank A1AAEM0000"></i>
                                <strong class="bank_name">우리은행</strong>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="radio round">
                            <input type="radio" name="bank" id="bank_05" v-model="selOrg" value="A1AAAK0000">
                            <label for="bank_05">
                                <i class="ico_bank A1AAAK0000"></i>
                                <strong class="bank_name">SC제일</strong>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="radio round">
                            <input type="radio" name="bank" id="bank_06" v-model="selOrg" value="A1AAEQ0000">
                            <label for="bank_06">
                                <i class="ico_bank A1AAEQ0000"></i>
                                <strong class="bank_name">기업은행</strong>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="radio round">
                            <input type="radio" name="bank" id="bank_07" v-model="selOrg" value="A1AAEO0000">
                            <label for="bank_07">
                                <i class="ico_bank A1AAEO0000"></i>
                                <strong class="bank_name">국민은행</strong>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="radio round">
                            <input type="radio" name="bank" id="bank_08" v-model="selOrg" value="A1AAES0000">
                            <label for="bank_08">
                                <i class="ico_bank A1AAES0000"></i>
                                <strong class="bank_name">하나은행</strong>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="radio round">
                            <input type="radio" name="bank" id="bank_09" v-model="selOrg" value="A1AAQE0000">
                            <label for="bank_09">
                                <i class="ico_bank A1AAQE0000"></i>
                                <strong class="bank_name">한국시티은행</strong>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="radio round">
                            <input type="radio" name="bank" id="bank_10" v-model="selOrg" value="A1AAHX0000">
                            <label for="bank_10">
                                <i class="ico_bank A1AAHX0000"></i>
                                <strong class="bank_name">수협은행</strong>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="radio round">
                            <input type="radio" name="bank" id="bank_11" v-model="selOrg" value="A1AAHS0000">
                            <label for="bank_11">
                                <i class="ico_bank A1AAHS0000"></i>
                                <strong class="bank_name">아이엠뱅크(대구은행)</strong>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="radio round">
                            <input type="radio" name="bank" id="bank_12" v-model="selOrg" value="A1AAII0000">
                            <label for="bank_12">
                                <i class="ico_bank A1AAII0000"></i>
                                <strong class="bank_name">부산은행</strong>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="radio round">
                            <input type="radio" name="bank" id="bank_13" v-model="selOrg" value="A1AAMW0000">
                            <label for="bank_13">
                                <i class="ico_bank A1AAMW0000"></i>
                                <strong class="bank_name">광주은행</strong>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="radio round">
                            <input type="radio" name="bank" id="bank_14" v-model="selOrg" value="A1AAIP0000">
                            <label for="bank_14">
                                <i class="ico_bank A1AAIP0000"></i>
                                <strong class="bank_name">제주은행</strong>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="radio round">
                            <input type="radio" name="bank" id="bank_15" v-model="selOrg" value="A1AAHP0000">
                            <label for="bank_15">
                                <i class="ico_bank A1AAHP0000"></i>
                                <strong class="bank_name">전북은행</strong>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="radio round">
                            <input type="radio" name="bank" id="bank_16" v-model="selOrg" value="A1AAIM0000">
                            <label for="bank_16">
                                <i class="ico_bank A1AAIM0000"></i>
                                <strong class="bank_name">경남은행</strong>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="radio round">
                            <input type="radio" name="bank" id="bank_17" v-model="selOrg" value="A1AAJB0000">
                            <label for="bank_17">
                                <i class="ico_bank A1AAJB0000"></i>
                                <strong class="bank_name">케이뱅크</strong>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="radio round">
                            <input type="radio" name="bank" id="bank_18" v-model="selOrg" value="A1AAHJ0000">
                            <label for="bank_18">
                                <i class="ico_bank A1AAHJ0000"></i>
                                <strong class="bank_name">카카오뱅크</strong>
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="radio round">
                            <input type="radio" name="bank" id="bank_19" v-model="selOrg" value="A1AAPF0000">
                            <label for="bank_19">
                                <i class="ico_bank A1AAPF0000"></i>
                                <strong class="bank_name">토스뱅크</strong>
                            </label>
                        </div>
                    </li>
                </ul>
            </section>
		</div>

        <div class="popup_footer fixed">
			
            <div class="btn_full_box">
				<button type="button" class="btns lg primary">확인</button>
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
    name : "ASTN4007",
    data: () => {
        return {
            selOrg      : [],  // 선택한 은행코드
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
            this.getData()
        },

        getData() {
            /*
            const config = {
                url: '/co/ct/01r02',
                data: {
                        cntzId : cntzId
                      }
            };

            apiService.call(config).then(response => {
                this.cntzCntn = response.cntzCntn
            })
            */
        }

    },
    components : {

    },
    destroyed() {
        this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>