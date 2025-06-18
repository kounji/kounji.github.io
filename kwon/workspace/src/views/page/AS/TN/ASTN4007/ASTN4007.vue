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
    <div>
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup">
                <div class="popup_header">
                    <h1>은행선택</h1>
                </div>
                <div class="popup_content">
                    <section class="close_account">
                        <div class="gray_box">
                            <p>금융결제원 정책에 따라 실제 해당 기능(해지 및 잔고이전)을 제공하는 은행권 계좌에만 이체 할 수 있습니다.</p>
                        </div>
        
                        <ul class="sel_list radio_group">
                            <li v-for="(item, idx) in bnkInfo" :key="idx" :ref="'bank_'+item.repNbnkC">
                                <div class="radio">
                                    <input type="radio" name="bank" :id="'bank_'+idx" v-model="chkValue" :value="item.repNbnkC" @change.prevent="fnSelect(item)">
                                    <label :for="'bank_'+idx">
                                        <i :class="'ico_bank '+item.infOfrmnOrgC"></i>
                                        <strong class="bank_name">{{item.repNbnkCNm}}</strong>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </section>
                </div>

                <div class="popup_footer">
                    <div class="btn_group">
                        <button type="button" class="btns lg primary" @click.prevent="fnCallBack()">확인</button>
                    </div>
                </div>
                <a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
            </div>
            
        </div>
        <!-- slide popup E -->
    </div>
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
            bnkInfo     : [],  // 은행 목록
            chkValue    : "",  // 선택한 은행코드
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
            this.bnkInfo = param.bnkList
            this.getData(param)
        },

        getData(param) {
            if(!_.isEmpty(param.repNbnkC)) {
                this.chkValue = param.repNbnkC
            } else {
                this.chkValue = this.bnkInfo[0].repNbnkC
            }

            this.$nextTick(() => {
                let rf = 'bank_'.concat('',this.chkValue)

                if(rf != 'bank_'+this.bnkInfo[0].repNbnkC) {
                    this.$refs[rf][0].scrollIntoView({behavior: "smooth"})
                }
            })
        },

        fnSelect(item) {
            this.chkValue = item.repNbnkC
        },

        fnCallBack() {
            let idx = this.bnkInfo.findIndex(el => el.repNbnkC == this.chkValue)

            let param = {
                recvBankCode   : this.bnkInfo[idx].repNbnkC,   // 은행코드
                recvBankCodeNm : this.bnkInfo[idx].repNbnkCNm  // 은행코드명
            }
            
            this.close(param)
        },

    },
    components : {

    },
    destroyed() {
        this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>