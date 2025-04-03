<!--
/*************************************************************************
* @ 서비스경로 : 금융생활 > NH콕마이카
* @ 페이지설명 : 금융생활 > NH콕마이카 > 조건검색(slide, 중고차)
* @ 파일명     : src\views\page\AN\CA\ANCA2213\ANCA2213.vue
* @ 작성자     : CS528043
* @ 작성일     : 2022-08-08
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-10-17              CS528043              최초작성(신규)
*************************************************************************/
-->

<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;" @click="close()"></div>
        <div class="popup_box renewal">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <h1>조건 검색</h1>
                    <!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
                </div>
                <div class="popup_content com_btn_bottom">
                    <div class="custom_check_list">
                        <!-- 주행거리구분코드 -->
                        <template v-if="odmtrDistDscList.length > 0">
                            <strong class="com_cont_tit01">주행거리</strong>
                            <ul class="com_radio_type03">
                                <li v-for="(odmtrDistInfo, idx1) in odmtrDistDscList" :key="idx1">
                                    <div class="btn_radio">
                                            <input type="checkbox" :name="'odmtrDist_' + odmtrDistInfo.comnCVal" :id="'odmtrDist_' + odmtrDistInfo.comnCVal"  v-model="odmtrDistDscArr" v-bind:true-value="odmtrDistInfo.comnCVal" :value="odmtrDistInfo.comnCVal" @change="fn_odmtrDistDscSet(odmtrDistInfo.comnCVal)">
                                            <label :for="'odmtrDist_' + odmtrDistInfo.comnCVal">
                                                <span>{{odmtrDistInfo.comnCExpl}}</span>
                                            </label>
                                    </div>
                                </li>
                            </ul>
                        </template>
                        <!-- 금액구분코드 -->
                        <template v-if="ncarAmDscList.length > 0">
                            <strong class="com_cont_tit01">금액</strong>
                            <ul class="com_radio_type03">
                                <li v-for="(ncarAmInfo, idx2) in ncarAmDscList" :key="idx2">
                                    <div class="btn_radio">
                                            <input type="checkbox" :name="'ncarAm_' + ncarAmInfo.comnCVal" :id="'ncarAm_' + ncarAmInfo.comnCVal"  v-model="ncarAmArr" v-bind:true-value="ncarAmInfo.comnCVal" :value="ncarAmInfo.comnCVal" @change="fn_ncarAmSet(ncarAmInfo.comnCVal)">
                                            <label :for="'ncarAm_' + ncarAmInfo.comnCVal">
                                                <span>{{ncarAmInfo.comnCExpl}}</span>
                                            </label>
                                    </div>
                                </li>
                            </ul>
                        </template>	
                    </div>
                </div>
                <div class="popup_footer fixed">
                    <div class="com_btnhalfbox_type02">
                        <a href="javascript:void(0);" role="button" class="btn btn_mint_gray" @click="fn_selectClear()">초기화</a>
                        <a href="javascript:void(0);" role="button" class="btn btn_mint" @click="fn_apply()">적용</a>
                    </div>
                </div>
                <a href="javascript:void(0);" role="button" class="btn_close" @click="close()"><span class="">취소</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>

<script>

import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'

export default {
    name : "ANCA2213",
    data: () => {
		return {      
            // 공통코드
            ncarAmDscList    : [],  // 금액구분코드
            odmtrDistDscList : [],  // 주행거리구분코드

            // Return
            ncarAmArr        : [],  // 신차금액구분 선택
            odmtrDistDscArr  : [],  // 주행거리구분 선택
        }
	},
    mixins: [
        popupMixin
        ,commonMixin
	],
	created() {
	},	
    mounted() {
		this.initComponent(this.params)
		
        //PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent(params) {
            /* 공통코드는 호출화면에서 넘김 */            
            console.log('화면에서 넘어온 코드 : ', params)

            // 화면에서 넘어온 파라미터 셋팅
            // 공통코드 List
            this.ncarAmDscList    = params.ncarAmDscList     // 금액구분코드
            this.odmtrDistDscList = params.odmtrDistDscList  // 주행거리구분코드

            // 기 Set된 조회조건
            this.ncarAmArr       = params.pNcarAmArr       || []  // 금액구분    (조건param)
            this.odmtrDistDscArr = params.pOdmtrDistDscArr || []  // 주행거리구분 (조건param)          
        },

        // 적용버튼
        fn_apply() {           
            console.log('ncarAmArr     : ', this.ncarAmArr)

            let rtnData = {}

            // return
            if(this.ncarAmArr.length > 0 || this.odmtrDistDscArr.length > 0){
                rtnData = {
                    ncarAmArr       : this.ncarAmArr,      // 금액구분코드
                    odmtrDistDscArr : this.odmtrDistDscArr // 주행거리구분코드
                }
            }else{
                rtnData = {}
            }
            
            console.log('rtnInfo : ', {"rtnData" : rtnData})

            // 팝업닫기
            this.close({"rtnData" : rtnData})
        },
        // 초기화버튼
        fn_selectClear(){
            this.ncarAmArr       = [] // 신차금액구분 초기화
            this.odmtrDistDscArr = [] // 주행거리구분코드            
        },
        fn_ncarAmSet(ncarAmDsc){
            // 기존 값 초기화(금액구분)
            this.ncarAmArr = []
            this.ncarAmArr.push(ncarAmDsc)
        },
        fn_odmtrDistDscSet(odmtrDistDsc){
            // 기존 값 초기화(주행거리구분)
            this.odmtrDistDscArr = []
            this.odmtrDistDscArr.push(odmtrDistDsc)
        }        
	},
	computed : {						
	}
}

</script>