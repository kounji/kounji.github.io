<!--
/*************************************************************************
* @ 서비스경로 : 큰글모드 > 자산 > 보험 > 인보험
* @ 페이지설명 : 큰글모드 > 자산 > 보험 > 인보험
* @ 파일명     : src/views/page/AS/TA/ASTA4S15/ASTA4S15.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-03-04
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-04              CS541597               최초작성(ASIS4001 -> ASTA4S15)
*************************************************************************/
-->
<template>
	<!-- 전체 팝업 시작 -->
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>인보험</h1>
		</div>	
		<div class="popup_content">
			<div class="assets_senior">
                <div class="board_box" v-if="insuCn > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item"><span>주계약자</span><span>인보험</span><em>{{insuCn | numberFilter}}</em></span>
							<span class="num"><em>{{mnTotPymIsrfe | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
                                <li v-for="(item, idx) in insuList" :key="item.insuDsc + '_' + idx">
                                    <a href="javascript:void(0);" @click.prevent="fn_openDtlPop(item)">
                                        <i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                        <div>
                                            <strong class="org">{{item.isrcoWrsnm}}</strong>
                                            <p class="status"><span class="account">{{item.isrSctsNo}}</span><span>{{item.isrPymFqNm}}</span></p>
                                        </div>
                                        <div>
                                            <strong class="num"><em>{{item.isrPymIsrfe | numberFilter}}</em>원</strong>
                                            <span v-show="fn_showStatus(item.isrCtrStsc)" :class="fn_getStatusClass(item.isrCtrStsc)">{{item.isrCtrStsnm}}</span>
                                        </div>
                                    </a>
                                </li>
							</ul>
							
							<div class="btns_wrap" v-if="(insuCn > 3) && !isMoreInsuYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('MCTR')">인보험 더보기</button>
							</div>
						</div>
					</details>
				</div>

                <div class="board_box" v-if="atisrInsuCn > 0">
                    <details class="assets_toggle" open="">
                        <summary>
                            <span class="item"><span>피보험계약자</span><span>인보험</span><em>{{atisrInsuCn | numberFilter}}</em></span>
                            <span class="num"><em>{{atMnTotPymIsrfe | numberFilter}}</em>원</span>
                        </summary>
                        <div class="cont">
                            <ul class="assets_list">
                                <li v-for="(item, idx) in atisrInsuList" :key="item.insuDsc + '_' + idx">
                                    <a href="javascript:void(0);" @click.prevent="fn_openDtlPop(item)">
                                        <i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                        <div>
                                            <strong class="org">{{item.isrcoWrsnm}}</strong>
                                            <p class="status"><span class="account">{{item.isrSctsNo}}</span><span>{{item.isrPymFqNm}}</span></p>
                                        </div>
                                        <div>
                                            <strong class="num"><em>{{item.isrPymIsrfe | numberFilter}}</em>원</strong>
                                            <span v-show="fn_showStatus(item.isrCtrStsc)" :class="fn_getStatusClass(item.isrCtrStsc)">{{item.isrCtrStsnm}}</span>
                                        </div>
                                    </a>
                                </li>
                            </ul>

                            <div class="btns_wrap" v-if="(atisrInsuCn > 3) && !isMoreAtInsuYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('ATISR')">인보험 더보기</button>
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

import ASIS4002 from '@/views/page/AS/IS/ASIS4002/ASIS4002'
import ASIS2006 from '@/views/page/AS/IS/ASIS2006/ASIS2006'
import ASIS2010 from '@/views/page/AS/IS/ASIS2010/ASIS2010'
import ASIS4012 from '@/views/page/AS/IS/ASIS4012/ASIS4012'
import ASIS4016 from '@/views/page/AS/IS/ASIS4016/ASIS4016'
import ASIS2018 from '@/views/page/AS/IS/ASIS2018/ASIS2018'
import ASIS2021 from '@/views/page/AS/IS/ASIS2021/ASIS2021'

export default {
    name : "ASTA4S15",
    data: () => {
        return {
            respInfo        : {},   // 응답 원데이터

            insuCn          : 0,    // 인보험개수
            mnTotPymIsrfe   : 0,    // 인보험월납입총보험료
            insuList        : [],   // 인보험리스트

            atMnTotPymIsrfe : 0,    // 피보험자 인보험월납입총보험료
            atisrInsuCn     : 0,    // 피보험자 보험목록건수
            atisrInsuList   : [],   // 피보험자 인보험리스트

            isMoreInsuYn    : false,// 주계약자 인보험 리스트 더보기 여부
            isMoreAtInsuYn  : false,// 피보험계약자 인보험 리스트 더보기 여부

            // 인보험 보험종류 코드
            insuIsrKdDsc    : ["01", "02", "03", "04", "05", "06", "07", "08", "11", "12", "16", "22", "99"], 
            // 물보험 보험종류 코드
            tngIsrKdDsc     : ["13", "14", "15", "18", "19", "20", "21", "23", "24", "25", "26", "27", "28", "29", "31", "32", "33", "97", "98"], 
            // 자동차보험 보험종류 코드
            carIsrKdDsc     : ["17"], 
            // 연금보험 보험종류 코드
            pensionIsrKdDsc : ["09", "10", "30"], 
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
            this.getData()
        },
        getData() {
            const config = {
                url : '/as/is/01r01',
                data : {
                    mydtCusno: this.getUserInfo('mydtCusno')
                }
            }
            apiService.call(config).then(response => {
                this.respInfo           = response || {}

                // 주계약자 인보험
                this.insuCn             = this.respInfo?.insuCn || 0
                this.mnTotPymIsrfe      = this.respInfo?.mnTotPymIsrfe || 0
                this.insuList           = this.respInfo?.insuList || []
                this.respInfo.insuList?.forEach(d => d.insuDsc = 'MCTR')

                // 피보험자 인보험
                this.atisrInsuCn        = this.respInfo?.atisrInsuCn || 0
                this.atMnTotPymIsrfe    = this.respInfo?.atMnTotPymIsrfe || 0
                this.atisrInsuList      = this.respInfo?.atisrInsuList || []
                this.respInfo.atisrInsuList?.forEach(d => d.insuDsc = 'ATISR')

                this.insuList = this.insuCn > 3 ? this.insuList.slice(0, 3) : this.insuList
                this.atisrInsuList = this.atisrInsuCn > 3 ? this.atisrInsuList.slice(0, 3) : this.atisrInsuList
            })
        },

        /**
         * 보험 상태에 따른 뱃지 노출 여부 설정
         */
        fn_showStatus(isrCtrStsc) {
            if(isrCtrStsc == '02' ||isrCtrStsc == '04' || isrCtrStsc == '05' || isrCtrStsc == '06') {
                return true
            }
            return false
        },
        /**
         * 보험 상태에 따른 배지 class 설정
         */
        fn_getStatusClass(isrCtrStsc) {
            // 정상
            if(isrCtrStsc == '02') {
                return ['pin', 'green']
            }else if(isrCtrStsc == '04') {
                return ['pin', 'yellow']
            // 만기
            }else if(isrCtrStsc == '05') {
                return ['pin', 'red']
            // 소멸
            }else if(isrCtrStsc == '06') {
                return ['pin', '']
            }
            return ''
        },

        /**
         * 더보기 선택 이벤트
         */
        fn_showMore(insuDsc) {
            if(insuDsc == 'MCTR') {
                this.isMoreInsuYn = true
                this.insuList = this.respInfo.insuList || []
            } else {
                this.isMoreAtInsuYn = true
                this.atisrInsuList = this.respInfo.atisrInsuList || []
            }
        },

        /**
         * 상세팝업오픈
         */
        fn_openDtlPop(insuInfo) {
            let compName = ''
            const type = insuInfo.insuDsc   // MCTR : 주계약자, ATISR : 피보험계약자
            if(type == 'MCTR') {
                if(this.insuIsrKdDsc.some(d => d == insuInfo.isrKdDsc)) {
                    insuInfo.btnType = ((insuInfo.isrCtrStsc === "02" || insuInfo.isrCtrStsc === "04") && 
                                        insuInfo.infOfrmnOrgC == 'B1AABF0000' && 
                                        this.getUserInfo('chnl') === '386') 
                                    ? true : false

                    compName = ASIS4002 // 상세내역(인보험 상세 납입정보탭)
                } else if(this.pensionIsrKdDsc.some(d => d == insuInfo.isrKdDsc)){
                    insuInfo.btnType = ((insuInfo.isrCtrStsc === "02" || insuInfo.isrCtrStsc === "04") && 
                                        insuInfo.infOfrmnOrgC == 'B1AABF0000' && 
                                        this.getUserInfo('chnl') === '386') 
                                    ? true : false

                    compName = ASIS4012 // 상세내역(연금저축보험 상세 납입정보탭)
                } else if(this.tngIsrKdDsc.some(d => d == insuInfo.isrKdDsc)) {
                    compName = ASIS2006 // 상세내역(물보험 상세 납입정보탭)
                } else {
                    compName = ASIS2010 // 상세내역(자동차 보험 상세)
                }
            } else {
                if(this.insuIsrKdDsc.some(d => d == insuInfo.isrKdDsc)) {
                    insuInfo.btnType = ((insuInfo.isrCtrStsc === "02" || insuInfo.isrCtrStsc === "04") && 
                                        insuInfo.infOfrmnOrgC == 'B1AABF0000' && 
                                        this.getUserInfo('chnl') === '386') 
                                    ? true : false

                    compName = ASIS4016 // 상세내역(피보험자 인보험 상세)
                } else if(this.pensionIsrKdDsc.some(d => d == insuInfo.isrKdDsc)) {
                    insuInfo.btnType = ((insuInfo.isrCtrStsc === "02" || insuInfo.isrCtrStsc === "04") && 
                                        insuInfo.infOfrmnOrgC == 'B1AABF0000' && 
                                        this.getUserInfo('chnl') === '386') 
                                    ? true : false
                                    
                    compName = ASIS4016 // 상세내역(피보험자 연금저축보험 상세)
                } else if(this.tngIsrKdDsc.some(d => d == insuInfo.isrKdDsc)) {
                    compName = ASIS2018 // 상세내역(피보험자 물보험 상세)
                } else {
                    compName = ASIS2021 // 상세내역(피보험자 자동차 보험 상세)
                }
            }

            const config = {
                component: compName,
                params: insuInfo
            }
            modalService.openPopup(config)
        }

        
    },
    components : {
        
    }
}
</script>