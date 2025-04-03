<!--
/*************************************************************************
* @ 서비스경로 : 큰글모드 > 자산 > 부채 > 빌린돈목록
* @ 페이지설명 : 큰글모드 > 자산 > 부채 > 빌린돈목록
* @ 파일명     : src/views/page/AS/TA/ASTA4S14/ASTA4S14.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-02-26
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-26              CS541597               최초작성(ASBR2001 -> ASTA4S14)
*************************************************************************/
-->
<template>
	<!-- 전체 팝업 시작 -->
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>빌린돈</h1>
		</div>	
		<div class="popup_content">
			<div class="assets_senior">
                <div class="board_box borrow" v-for="(item, idx) in cashBorrowingOut" :key="'csh_'+idx" @click.prevent="openDetailSlidePop(item)">
                    <p class="name">
						<strong>{{item.trPatnnm}}</strong>
						<i class="ico_bubble money"></i>
					</p>
					<p class="date">빌린날 <span>{{item.stDt | dateFilter('YYYY.MM.DD')}}</span></p>
					<p class="price"><em class="num">{{item.prnAm | numberFilter}}</em>원</p>
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

import ASLN2115 from '@/views/page/AS/LN/ASLN2115/ASLN2115'

export default {
    name : "ASTA4S14",
    data: () => {
        return {
            mydtCusno           : '',       // 마이데이터고객번호
            ttCnt               : 0,        // 현금차용건수
            ttAmnt              : 0,        // 총현금차용금액
            cashBorrowingOut    : [],       // 현금차용Out 리스트
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
                url : '/as/ln/07r01',
                data : {
                    mydtCusno: this.mydtCusno
                }
            }
            apiService.call(config).then(response => {
                this.ttCnt              = response.ttCnt || 0
                this.ttAmnt             = response.ttAmnt || 0
                this.cashBorrowingOut   = response.cashBorrowingOut || []
            })

        },

        openDetailSlidePop(obj) {
            const config = {
                params : {
                    mydtCusno : this.mydtCusno,
                    cashData  : obj,
                },
                renderer : {
                    component : ASLN2115,
                }
            }
            modalService.openSlidePagePopup(config).then(response => {
                this.mydtCusno = response.mydtCusno
                if(response.uptCom) {
                    this.getData()
                }
            })
        },
    },
    components : {
        
    }
}
</script>