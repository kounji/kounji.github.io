<!--
/*************************************************************************
* @ 서비스경로 : 큰글모드 > 자산 > 부채 > 학자금대출목록
* @ 페이지설명 : 큰글모드 > 자산 > 부채 > 학자금대출목록
* @ 파일명     : src/views/page/AS/TA/
* @ 작성자     : CS541597
* @ 작성일     : 2025-03-07
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-07              CS541597               최초작성
*************************************************************************/
-->
<template>
	<!-- 전체 팝업 시작 -->
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>학자금대출</h1>
		</div>	
		<div class="popup_content">
			<div class="assets_senior">

				<div class="board_box">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">학자금대출<em>{{edflnCnt}}</em></span>
							<span class="num"><em>{{edflnAmnt | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
                                <li v-for="(item, idx) in edflnOut" :key="(item.loanType == 'CREDIT_BANK' ? 'credit_' : 'mort_')+idx">
                                    <a href="javascript:void(0);" @click.prevent="fn_openDtlPop(item)">
                                        <i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgCNm}}</span></i>
                                        <div>
                                            <strong class="org">{{item.wrsnm}}</strong>
                                            <strong class="account">{{item.mydtAcno}}</strong>
                                        </div>
                                        <strong class="num"><em>{{item.bac | numberFilter}}</em>원</strong>
                                    </a>
                                </li>
							</ul>
                            <div class="btns_wrap" v-if="edflnCnt > 3 && !moreEdflnYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore">학자금대출 더보기</button>
							</div>
						</div>
					</details>
				</div>
			</div>	
		
		</div>

		<a href="javascript:void(0);" class="btn_close" @click="close"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>

/*eslint-disable */
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'

import ASLN2002 from '@/views/page/AS/LN/ASLN2002/ASLN2002'
import ASLN2003 from '@/views/page/AS/LN/ASLN2003/ASLN2003'
import ASLN2005 from '@/views/page/AS/LN/ASLN2005/ASLN2005'

export default {
    name : "ASTA4S17",
    data: () => {
        return {
            edflnAmnt       : 0,        // 학자금대출총액
            edflnCnt        : 0,        // 학자금대출건수
            edflnOut        : [],       // 학자금대출리스트

            creditOut       : [],       // 학자금 신용대출리스트
            mortagageOut    : [],       // 학자금 담보대출리스트

            respInfo        : [],       // 응답데이터 원본 저장
            moreEdflnYn     : false,    // 학자금대출 더보기 여부
        }
    },
    computed : {
        
    },
    created() {
        this.initComponent()
    },
    mounted() {
        // 자산수집 mutation 이벤트 감지 
        this.getGatheringListenSubscribe()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)    
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    methods: {
        initComponent() {
            this.mydtCusno  = this.getUserInfo('mydtCusno')
            this.getData()
        },
        // 초기 데이터 세팅
        getData() {
            // 실제 구현
            const config = {
                url: '/as/el/01r01',
                data: {
                    mydtCusno: this.getUserInfo('mydtCusno')
                }
            }
            
            apiService.call(config).then(response => {
                
                this.respInfo   = response  // 응답 원본데이터 저장

                this.edflnAmnt = this.respInfo.loanAmnt || 0    // 대출총액
                this.edflnCnt = this.respInfo.loanCnt || 0  // 대출총건수
                this.creditOut = this.respInfo.creditOut || []  // 신용대출목록
                this.mortagageOut = this.respInfo.mortagageOut || []    // 담보대출목록

                this.edflnOut = [...this.creditOut, ...this.mortagageOut]
                this.edflnOut = this.edflnCnt > 3 ? this.edflnOut.slice(0, 3) : this.edflnOut
            })
        },
        /**
         * 더보기 선택 이벤트
         */
        fn_showMore() {
            this.edflnOut = [...this.creditOut, ...this.mortagageOut]
            this.moreEdflnYn = true
        },

        /**
         * 항목별 일반상세팝업 연결
         */
        fn_openDtlPop(obj) {
            let popId = ''
            let params = {}

            switch(obj.loanType) {
                case 'CREDIT_BANK':
                case 'CREDIT_INSU':
                    popId = ASLN2005
                    params = {
                        mydtCusno       : this.getUserInfo('mydtCusno'),
                        infOfrmnOrgC    : obj.infOfrmnOrgC,
                        mydtAcno        : obj.mydtAcno,
                        mydtScNo        : obj.mydtScNo,
                        isrSctsNo       : obj.isrSctsNo,
                        loanType        : obj.loanType,
                    }
                    break
                case 'MORT_INSU':
                    popId = ASLN2003
                    params = {
                        mydtCusno       : this.getUserInfo('mydtCusno'),
                        infOfrmnOrgC    : obj.infOfrmnOrgC,
                        mydtAcno        : obj.mydtAcno,
                        mydtScNo        : obj.mydtScNo,
                        isrSctsNo       : obj.isrSctsNo,
                        loanType        : obj.loanType,
                    }
                    break
                case 'MORT_BANK':
                    popId = ASLN2002
                    params = {
                        mydtCusno       : this.getUserInfo('mydtCusno'),
                        infOfrmnOrgC    : obj.infOfrmnOrgC,
                        mydtAcno        : obj.mydtAcno,
                        mydtScNo        : obj.mydtScNo,
                        isrSctsNo       : obj.isrSctsNo,
                        loanType        : obj.loanType,
                    }
                    break
                default: return
            }

            const config = {
                component: popId,
                params: params
            }
            modalService.openPopup(config)
        },
    },
    components : {
        
    }
}
</script>