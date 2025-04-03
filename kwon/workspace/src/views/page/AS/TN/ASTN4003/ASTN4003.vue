<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 숨은 자산 > 해지계좌목록
* @ 페이지설명 : 자산 > 숨은 자산 > 해지계좌목록
* @ 파일명     : src/views/page/AS/TN/ASTN4003/ASTN4003.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-03-10
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-03-10              CS541599              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_content">
            <section class="sleep_account">
                <p class="total">총 <em>3</em>건</p>

                 <!--계좌가 있을경우-->
                 <div class="board_box">
                    <ul class="assets_list">
                        <li>
                            <a href="#nolink">
                                <i class="ico_bank D1AAJB0000"></i>
                                <div>
                                    <strong class="org">K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크</strong>
                                    <div class="account">352222302032522 </div>
                                    <strong class="num">3,758,000원</strong>
                                    <span class="pin">해지일 2025.02.27</span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#nolink">
                                <i class="ico_bank D1AAJB0000"></i>
                                <div>
                                    <strong class="org">K뱅크K뱅크K뱅크K뱅크K뱅</strong>
                                    <div class="account">352222302032522 </div>
                                    <strong class="num">3,758,000원</strong>
                                    <span class="pin">해지일 2025.02.27</span>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#nolink">
                                <i class="ico_bank D1AAJB0000"></i>
                                <div>
                                    <strong class="org">K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K뱅크K</strong>
                                    <div class="account">352222302032522 </div>
                                    <strong class="num">3,758,000원</strong>
                                    <span class="pin">해지일 2025.02.27</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>

            </section>
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
import _ from 'lodash'

export default {
    name : "ASTN4003",
    data: () => {
        return {
            cntzCntn      : '' // 본문 내용
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