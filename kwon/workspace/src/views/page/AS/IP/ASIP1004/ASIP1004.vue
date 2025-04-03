<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 자산진단
* @ 페이지설명 : 자산 > 자산진단 > 또래 선택
* @ 파일명     : src\views\page\AS\IP\ASIP1004\ASIP1004.vue
* @ 작성자     : CS529599
* @ 작성일     : 2022-10-24
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-10-24              CS529599              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box renewal">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <h1>또래 선택</h1>
                    <!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
                </div>
                <div class="popup_content com_btn_bottom">
                    <div class="custom_check_list custom_check_list02">
                        <!-- 연령 -->
                        <strong class="com_cont_tit01">연령</strong>
                        <ul class="com_radio_type03">
                            <template v-for="(peerAgStnCInfo, idx) in peerAgStnCList">
                                <li :key="idx">
                                    <div class="btn_radio">
                                        <input type="radio" v-model="selectedAgStnC" name="radio01" :id="peerAgStnCInfo.comnCVal" :value="peerAgStnCInfo.comnCVal">
                                        <label :for="peerAgStnCInfo.comnCVal">
                                            <!--<span>{{peerAgStnCInfo.comnCExpl.split("#").join("")}}</span>-->
                                            <span>{{peerAgStnCInfo.refCntn1}}</span>
                                        </label>
                                    </div>
                                </li>
                            </template>
                            <!--
                            <li>
                                <div class="btn_radio">
                                    <input type="radio" name="radio01" id="radio2-1">
                                    <label for="radio2-1">
                                        <span>20대 미만</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input type="radio" name="radio01" id="radio2-2">
                                    <label for="radio2-2">
                                        <span>20대 초반</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input type="radio" name="radio01" id="radio2-3">
                                    <label for="radio2-3">
                                        <span>25~34세</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input type="radio" name="radio01" id="radio2-4" checked='checked'>
                                    <label for="radio2-4">
                                        <span>30대 후반</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input type="radio" name="radio01" id="radio2-5">
                                    <label for="radio2-5">
                                        <span>40대 초반</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input type="radio" name="radio01" id="radio2-6">
                                    <label for="radio2-6">
                                        <span>45~54세</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input type="radio" name="radio01" id="radio2-7">
                                    <label for="radio2-7">
                                        <span>50대 후반</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input type="radio" name="radio01" id="radio2-8">
                                    <label for="radio2-8">
                                        <span>60세 이상</span>
                                    </label>
                                </div>
                            </li>
                            -->
                        </ul>
                        <!-- //연령 -->
                        <!-- 직업 -->
                        <strong class="com_cont_tit01">직업</strong>
                        <ul class="com_radio_type03">
                            <template v-for="(peerJobgrCInfo, idx) in peerJobgrCList">
                                <li :key="idx">
                                    <div class="btn_radio">
                                        <input type="radio" v-model="selectedJobgrC" name="radio02" :id="peerJobgrCInfo.comnCVal" :value="peerJobgrCInfo.comnCVal">
                                        <label :for="peerJobgrCInfo.comnCVal">
                                            <!--<span>{{peerJobgrCInfo.comnCExpl.split("#").join("")}}</span>-->
                                            <span>{{peerJobgrCInfo.refCntn1}}</span>
                                        </label>
                                    </div>
                                </li>
                            </template>
                            <!--
                            <li>
                                <div class="btn_radio">
                                    <input type="radio" name="radio02" id="radio3-1">
                                    <label for="radio3-1">
                                        <span>농축업</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input type="radio" name="radio02" id="radio3-2">
                                    <label for="radio3-2">
                                        <span>공무원</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input type="radio" name="radio02" id="radio3-3" checked='checked'>
                                    <label for="radio3-3">
                                        <span>급여소득</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input type="radio" name="radio02" id="radio3-4">
                                    <label for="radio3-4">
                                        <span>학생</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input type="radio" name="radio02" id="radio3-5">
                                    <label for="radio3-5">
                                        <span>개인사업</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input type="radio" name="radio02" id="radio3-6">
                                    <label for="radio3-6">
                                        <span>기타소득</span>
                                    </label>
                                </div>
                            </li>
                            <li>
                                <div class="btn_radio">
                                    <input type="radio" name="radio02" id="radio3-7">
                                    <label for="radio3-7">
                                        <span>무직</span>
                                    </label>
                                </div>
                            </li>
                            -->
                        </ul>
                        <!-- //직업 -->
                    </div>
                </div>
                <div class="popup_footer">
                    <div class="btn_full_box2">
                        <a href="javascript:void(0);" role="button" class="btn btn_mint" @click.prevent="peerApply()">또래 적용</a>
                    </div>
                </div>
                
                <a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="">취소</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'

export default {
    name : "ASIP1004",
    data: () => {
        return {
            pPeerNo: '',            // 선택된 또래번호

            selectedAgStnC: '',     // 선택된 연령코드
            selectedJobgrC: '',     // 선택된 직업코드
            selectedAsetStnC: '',   // 선택된 자산코드
            selectedAgStnCnm: '',   // 선택된 연령명칭
            selectedJobgrCnm: '',   // 선택된 직업명칭

            peerAgStnCList: [],     // 또래 연령목록
            peerJobgrCList: [],     // 또래 직업목록


        }
    },
    computed : {
    },
    created() {
        this.pPeerNo = this.params.peerNo                               // 선택된 또래번호

        this.selectedAgStnC = this.pPeerNo.length >= 2 ? this.pPeerNo.substr(0, 2) : ''                 // 선택된 연령코드
        this.selectedJobgrC = this.pPeerNo.length >= 4 ? this.pPeerNo.substr(2, 2) : ''                 // 선택된 직업코드
        this.selectedAsetStnC = this.pPeerNo.length >= 6 ? this.pPeerNo.substr(4, 2) : ''               // 선택된 자산코드
        
        this.peerAgStnCList = this.getCodeList('PEER_AG_STN_C')         // 또래 연령목록
        this.peerJobgrCList = this.getCodeList('PEER_JOBGR_C')          // 또래 직업목록
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent() {
            this.getData();
        },
        getData() {
            
            console.log("======= this.peerAgStnCList  ======= ", this.peerAgStnCList )
            console.log("======= this.peerJobgrCList  ======= ", this.peerJobgrCList )

        },
        // 또래 적용
        peerApply() {
            let peerNo = this.params.peerNo
            let selectedPeerNo = this.selectedAgStnC + this.selectedJobgrC + this.selectedAsetStnC
            let selectedAgStnC = this.selectedAgStnC         // 선택된 연령코드
            let selectedJobgrC = this.selectedJobgrC         // 선택된 직업코드            
            let selectedAsetStnC = this.selectedAsetStnC     // 선택된 자산코드

            let selectedAgStnCnm = this.getCodeName(this.peerAgStnCList, this.selectedAgStnC)   // 선택된 연령명칭
            let selectedJobgrCnm = this.getCodeName(this.peerJobgrCList, this.selectedJobgrC)   // 선택된 직업명칭

            let resData = { peerNo, selectedPeerNo, selectedAgStnC, selectedJobgrC, selectedAsetStnC, selectedAgStnCnm, selectedJobgrCnm }
            console.log('peerApply', resData)
            this.close(resData)
        },
		getCodeName(codeList, cd) {
			let ret = ''
			for (let i = 0; i < codeList.length; i++) {
				if (cd == codeList[i].comnCVal) {
					ret = codeList[i].comnCExpl
					break
				}
			}
			return ret
		},
    },
    mixins: [
        commonMixin,
        popupMixin
    ]
}
</script>