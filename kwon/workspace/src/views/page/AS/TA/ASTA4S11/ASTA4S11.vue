<!--
/*************************************************************************
* @ 서비스경로 : 큰글모드 > 자산 > 부채 > 할부금융목록
* @ 페이지설명 : 큰글모드 > 자산 > 부채 > 할부금융목록
* @ 파일명     : src/views/page/AS/TA/ASTA4S11/ASTA4S11.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-02-24
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-25              CS541597               최초작성(ASIT2001 -> ASTA4S11)
*************************************************************************/
-->
<template>
	<!-- 전체 팝업 시작 -->
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>할부금융</h1>
		</div>	
		<div class="popup_content">
			<div class="assets_senior">

				<div class="board_box">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">할부금융<em>{{cptAcCn | numberFilter}}</em></span>
							<span class="num"><em>{{lnAcBactt | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
                                <li v-for="(item, idx) in cptAcList" :key="idx">
                                    <a href="javascript:void(0);" @click.prevent="openCptDetailPop(item)">
                                        <i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgCNm}}</span></i>
                                        <div>
                                            <strong class="org">{{item.istFncWrsnm}}</strong>
                                            <strong class="account">{{item.mydtAcno}}</strong>
                                        </div>
                                        <strong class="num"><em>{{item.lnAcBac | numberFilter}}</em>원</strong>
                                    </a>
                                </li>
							</ul>
							
							<div class="btns_wrap" v-if="cptAcCn > 3 && !isMoreCptAcYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore()">할부금융 더보기</button>
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
import {dateFormat} from '@/utils/date'

import ASLN2112 from '@/views/page/AS/LN/ASLN2112/ASLN2112'

export default {
    name : "ASTA4S11",
    data: () => {
        return {
            respInfo        : {},   // 할부금융조회 api 응답 원데이터
            mydtCusno       : "",   // 마이데이터고객번호
            acLnOgnAmtt     : "",   // 계좌대출원금액합계
            lnAcBactt       : "",   // 대출계좌잔액합계
            cptAcCn         : "",   // 할부금융계좌목록수
            cptAcList       : [],   // 할부금융계좌목록

            isMoreCptAcYn   : false,// 할부금융 목록더보기 여부

        }
    },
    computed : {
        
    },
    created() {
        
    },
    mounted() {
        this.initComponent()
        dateFormat()

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
            this.mydtCusno = this.getUserInfo('mydtCusno')
            this.getData()
        },
        getData() {
            // 실제구현
            const config = {
                url : '/as/ln/05r01',
                data : {
                    mydtCusno: this.mydtCusno
                }
            }
            apiService.call(config).then(response => {
                this.respInfo       = response
                this.mydtCusno      = response.mydtCusno || ''
                this.acLnOgnAmtt    = response.acLnOgnAmtt || 0
                this.lnAcBactt      = response.lnAcBactt || 0
                this.cptAcCn        = response.cptAcCn || 0
                this.cptAcList      = response.cptAcList || []

                this.cptAcList = this.cptAcCn > 3 && !this.isMoreCptAcYn ? this.cptAcList.slice(0, 3) : this.cptAcList
            })

        },

        /**
         * 할부금융 목록 더보기
         */
        fn_showMore() {
            this.cptAcList = this.respInfo.cptAcList
            this.isMoreCptAcYn = true
        },

        openCptDetailPop(obj) {
            const config = {
                component: ASLN2112,
                params : {
                    mydtCusno       : this.mydtCusno,
                    infOfrmnOrgC    : obj.infOfrmnOrgC,
                    mydtAcno        : obj.mydtAcno,
                    mydtScNo        : obj.mydtScNo,
                }
            }
            modalService.openPopup(config).then(() => {
                this.getData()
            })
        },
    },
    components : {
        
    }
}
</script>