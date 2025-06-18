<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 숨은 자산 > 계좌 선택
* @ 페이지설명 : 자산 > 숨은 자산 > 계좌 선택
* @ 파일명     : src/views/page/AS/TN/ASTN4008/ASTN4008.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-03-24
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-03-24              CS541599              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup">
                <div class="popup_header">
                    <h1>계좌선택</h1>
                </div>
                <div class="popup_content">
                    <section class="close_account">
                        <div class="gray_box">
                            <!-- <p>NH콕 마이데이터에 연결된 내 계좌 목록이에요.</p> -->
                            <p>NH콕 마이데이터에 연결된 계좌 중</p>
                            <p>금융결제원 정책에 따라 실제 해당 기능(해지 및 잔고이전)을</p>
                            <p>제공하는 은행권 계좌에만 잔고를 이전할 수 있습니다.</p>
                        </div>
                        <ul class="sel_list radio_group sel_acc">
                            <li v-for="(item, idx) in rndaAcList" :key="idx">
                                <div class="radio">
                                    <input type="radio" name="bank" :id="'bank_'+idx" :value="item.mydtAcno" v-model="chkValue" @change.prevent="fnSelect(item)">
                                    <label :for="'bank_'+idx">
                                        <strong class="bank_name">{{item.infOfrmnOrgnm}} {{item.acWrsnm}}</strong>
                                        <span class="prod_num">{{item.mydtAcno}}</span>
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
import {dayDiff, dateFormat} from '@/utils/date'
import _ from 'lodash'

export default {
    name : "ASTN4008",
    data: () => {
        return {
            bnkList      : [],  // 은행코드목록
            rndaAcList   : [],  // 입출금계좌목록
            chkValue     : "",  // 선택한 계좌번호
            text         : "",
            b            : 0
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
            const config1 = {
                url: '/as/tn/01r03',
                data: {
                    inqDsc  : '3'    // 1:기관코드->은행코드, 2:은행코드->기관코드, 3:은행코드전체목록
                }
            }
            apiService.call(config1).then(response =>{
                this.bnkList = response.bnkList
            })

            this.getData()
        },

        getData() {
            /* 내 입출금계좌목록 가져오기 */
            const config = {
                url: '/as/tn/08r01',
                data: {
                        mydtCusno : this.getUserInfo("mydtCusno")   // 마이데이터고객번호
                      }
            };

            apiService.call(config).then(response => {
                if(!_.isEmpty(response)) {
                    this.rndaAcList = response.rndaAcList             // 입출금계좌목록
                    if(this.rndaAcList.length > 0) {
                        this.chkValue   = this.rndaAcList[0].mydtAcno // 맨 처음 계좌 체크
                    }
                }
            })
        },
        fnSelect(item) {
            this.chkValue = item.mydtAcno
        },
        // 계좌 선택하기
        fnCallBack() {
            if(_.isEmpty(this.chkValue)) {
                modalService.alert("계좌를 선택해주세요.")
                return
            }
            
            let row = this.rndaAcList.find(el=> el.mydtAcno == this.chkValue) 
            let bnkInfo = this.bnkList.find(el => el.infOfrmnOrgC == row.infOfrmnOrgC)

            let param = {
                recvBankCode   : bnkInfo.repNbnkC,   // 은행코드
                recvBankCodeNm : bnkInfo.repNbnkCNm, // 은행코드명
                recvAccountNum : row.mydtAcno
            }
            this.close(param)
            
        },
        /*  */
        fnChgBnk(code, flag) {
            let row = {}
            if(flag == '1') {  // 은행 -> 기관
                row = this.bnkList.find(el => el.repNbnkC)[0]
            } else {           // 기관 -> 은행
                row = this.bnkList.find(el => el.infOfrmnOrgC)[0]
            }
            

            return row
        },
    },
    components : {

    },
    destroyed() {
        this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>