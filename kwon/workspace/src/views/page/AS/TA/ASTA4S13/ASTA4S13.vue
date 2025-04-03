<!--
/*************************************************************************
* @ 서비스경로 : 큰글모드 > 자산 > 부채 > 리스목록
* @ 페이지설명 : 큰글모드 > 자산 > 부채 > 리스목록
* @ 파일명     : src/views/page/AS/TA/ASTA4S13/ASTA4S13.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-02-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-26              CS541597               최초작성(ASLS2001 -> ASTA4S13)
*************************************************************************/
-->
<template>
	<!-- 전체 팝업 시작 -->
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>리스</h1>
		</div>	
		<div class="popup_content">
			<div class="assets_senior">

				<div class="board_box">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">리스<em>{{cptAcCn + cptEpyLeasCn | numberFilter}}</em></span>
							<span class="num"><em>{{lnAcBactt | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
                                <li v-for="(item, idx) in cptTotList" :key="idx">
                                    <a href="javascript:void(0);" @click.prevent="openDetailPop(item)">
                                        <i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgCNm}}</span></i>
                                        <div>
                                            <strong class="org">{{item.istFncWrsnm}}</strong>
                                            <!-- asis 운용리스 계좌번호, 금액 표기 없음 -->
                                            <!-- tobe 운용리스 계좌번호 표기 있음, 금액 표기 없음 -->
                                            <strong class="account">{{item.mydtAcno}}</strong>
                                        </div>
                                        <strong class="num" v-if="item.lsDsc == 'AC'"><em>{{item.lnAcBac | numberFilter}}</em>원</strong>
                                        <strong class="num" v-else></strong>
                                    </a>
                                </li>
							</ul>
							
							<div class="btns_wrap" v-if="(cptAcCn + cptEpyLeasCn > 3) && !isMoreLsYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore()">리스 더보기</button>
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

import ASLN2113 from '@/views/page/AS/LN/ASLN2113/ASLN2113'
import ASLN2114 from '@/views/page/AS/LN/ASLN2114/ASLN2114'

export default {
    name : "ASTA4S13",
    data: () => {
        return {
            respInfo        : {},   // 리스 조회 api 응답 원데이터
            mydtCusno       : "",   // 마이데이터고객번호
            acLnOgnAmtt     : 0,    // 대출계좌잔액합계
            lnAcBactt       : 0,    // 계좌대출원금액합계
            cptAcCn         : 0,    // 할부금융계좌목록수
            cptAcList       : [],   // 할부금융계좌목록(금융리스)
            epyLeasTramtt   : 0,    // 운용리스거래금액합계 -> 운용리스는 거래금액합계정보가 없다
            cptEpyLeasCn    : 0,    // 할부금융운용리스목록수
            cptEpyLeasList  : [],   // 할부금융운용리스목록(운용리스)

            cptTotList   : [],      // 금융리스, 운용리스 통합목록
            isMoreLsYn   : false,   // 리스 목록더보기 여부
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
                url : '/as/ln/06r01',
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
                this.epyLeasTramtt  = response.epyLeasTramtt || 0
                this.cptEpyLeasCn   = response.cptEpyLeasCn || 0
                this.cptAcList      = response.cptAcList || []
                this.cptEpyLeasList = response.cptEpyLeasList || []

                // 금융, 운용리스 구분값 생성
                this.cptAcList.forEach(d => d.lsDsc = 'AC')
                this.cptEpyLeasList.forEach(d => d.lsDsc = 'EPY')

                // 금융, 운용리스 통합목록 생성
                this.cptTotList = [...this.cptAcList, ...this.cptEpyLeasList]
                this.cptTotList = (this.cptAcCn + this.cptEpyLeasCn > 3) && !this.isMoreLsYn ? this.cptTotList.slice(0, 3) : this.cptTotList
            })

        },

        /**
         * 리스 목록 더보기
         */
        fn_showMore() {
            this.cptTotList = [...this.cptAcList, ...this.cptEpyLeasList]
            this.isMoreLsYn = true
        },

        openDetailPop(obj) {
            const config = {
                component: obj.lsDsc == 'AC' ? ASLN2113 : ASLN2114,
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