<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 숨은 자산 > 통신사 선택
* @ 페이지설명 : 자산 > 숨은 자산 > 통신사 선택
* @ 파일명     : src/views/page/AS/TN/ASTN4010/ASTN4010.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-03-25
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-03-25              CS541599              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <h1>통신사</h1>
                </div>
                <div class="popup_content">
                    <div class="radio_group">
                        <div class="radio">
                            <input type="radio" name="option_chk" id="option_chk1" v-model="selectTel" value="01">
                            <label for="option_chk1">SKT</label>
                        </div>
                        <div class="radio">
                            <input type="radio" name="option_chk" id="option_chk2" v-model="selectTel" value="04">
                            <label for="option_chk2">SKT 알뜰폰</label>
                        </div>
                        <div class="radio">
                            <input type="radio" name="option_chk" id="option_chk3" v-model="selectTel" value="02">
                            <label for="option_chk3">KT</label>
                        </div>
                        <div class="radio">
                            <input type="radio" name="option_chk" id="option_chk4" v-model="selectTel" value="05">
                            <label for="option_chk4">KT 알뜰폰</label>
                        </div>
                        <div class="radio">
                            <input type="radio" name="option_chk" id="option_chk5" v-model="selectTel" value="03">
                            <label for="option_chk5">LGU+</label>
                        </div>
                        <div class="radio">
                            <input type="radio" name="option_chk" id="option_chk6" v-model="selectTel" value="06">
                            <label for="option_chk6">LGU+ 알뜰폰</label>
                        </div>
                    </div>
                </div>
                <div class="popup_footer fixed">
                    <div class="btns_wrap">
                        <button type="button" class="btns lg primary" @click.prevent="fnSelect()">확인</button>
                    </div>
                </div>
                
                <a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
            </div>
        </div>
        <!--// slide popup E -->
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
    name : "ASTN4010",
    data: () => {
        return {
            telMapping : {},  // 통신사 매핑 객체
            selectTel  : "",  // 선택한 통신사
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
            this.getData(param)
        },

        getData(param) {
            this.telMapping = {'01':{pttelCd:'01', pttelNm:"SKT"},
                               '02':{pttelCd:'02', pttelNm:"KT"},
                               '03':{pttelCd:'03', pttelNm:"LGU+"},
                               '04':{pttelCd:'04', pttelNm:"SKT 알뜰폰"},
                               '05':{pttelCd:'05', pttelNm:"KT 알뜰폰"},
                               '06':{pttelCd:'06', pttelNm:"LGU+ 알뜰폰"}
                }
            this.selectTel = _.isEmpty(param.pttelCd) ? "01" : param.pttelCd
        },
        /* 통신사 선택 리턴 */
        fnSelect() {
            let rtn = this.telMapping[this.selectTel]

            this.close(rtn)
        },

    },
    components : {

    },
    destroyed() {
        this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>