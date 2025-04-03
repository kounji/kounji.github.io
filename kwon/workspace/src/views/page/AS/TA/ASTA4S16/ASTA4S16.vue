<!--
/*************************************************************************
* @ 서비스경로 : 큰글모드 > 자산 > 보험 > 물보험
* @ 페이지설명 : 큰글모드 > 자산 > 보험 > 물보험
* @ 파일명     : src/views/page/AS/TA/ASTA4S16/ASTA4S16.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-03-04
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-04              CS541597               최초작성(ASIS4001 -> ASTA4S16)
*************************************************************************/
-->
<template>
	<!-- 전체 팝업 시작 -->
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>물보험</h1>
		</div>	
		<div class="popup_content">
			<div class="assets_senior">
				<div class="board_box" v-if="tngInsuCn + carInsuCn > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item"><span>주계약자</span><span>물보험</span><em>{{tngInsuCn + carInsuCn}}</em></span>
							<span class="num"><em>{{tngTotPymIsrfe | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
                                <li v-for="(item, idx) in totTngInsuList" :key="idx">
                                    <a href="javascript:void(0);" @click.prevent="fn_openDtlPop(item)">
                                        <i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                        <template v-if="!item.insuDsc.includes('CAR')">
                                            <div>
                                                <strong class="org">{{item.isrcoWrsnm}}</strong>
                                                <p class="status"><span class="account">{{item.isrSctsNo}}</span><span>{{item.isrPymFqNm}}</span></p>
                                            </div>
                                            <div>
                                                <strong class="num"><em>{{item.isrPymIsrfe | numberFilter}}</em>원</strong>
                                                <span v-show="fn_showStatus(item.isrCtrStsc)" :class="fn_getStatusClass(item.isrCtrStsc)">{{item.isrCtrStsnm}}</span>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div>
                                                <strong class="org">{{item.isrcoWrsnm}}</strong>
                                                <p class="car_license">{{item.isrVhcno}}</p>
                                                <p class="status"><span class="account">{{item.isrSctsNo}}</span></p>
                                            </div>
                                            <div>
                                                <strong class="num"><em>{{item.tcarIsrIsrfe | numberFilter}}</em>원</strong>
                                                <span v-show="fn_showStatus(item.isrCtrStsc)" :class="fn_getStatusClass(item.isrCtrStsc)">{{item.isrCtrStsnm}}</span>
                                            </div>
                                        </template>
                                    </a>
                                </li>
							</ul>
							
							<div class="btns_wrap" v-if="(tngInsuCn + carInsuCn > 3) && !isMoreTngInsuYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('MCTR')">물보험 더보기</button>
							</div>
						</div>
					</details>
				</div>

                <div class="board_box" v-if="atisrTngInsuCn + atisrCarInsuCn > 0">
                    <details class="assets_toggle" open="">
                        <summary>
							<span class="item"><span>피보험계약자</span><span>물보험</span><em>{{atisrTngInsuCn + atisrCarInsuCn}}</em></span>
							<span class="num"><em>{{atTngTotPymIsrfe | numberFilter}}</em>원</span>
						</summary>
                        <div class="cont">
                            <ul class="assets_list">
                                <li v-for="(item, idx) in totTngAtInsuList" :key="idx">
                                    <a href="javascript:void(0);" @click.prevent="fn_openDtlPop(item)">
                                        <i class="ico_bank" :class="item.infOfrmnOrgC"><span class="blind">{{item.infOfrmnOrgnm}}</span></i>
                                        <template v-if="!item.insuDsc.includes('CAR')">
                                            <div>
                                                <strong class="org">{{item.isrcoWrsnm}}</strong>
                                                <p class="status"><span class="account">{{item.isrSctsNo}}</span><span>{{item.isrPymFqNm}}</span></p>
                                            </div>
                                            <div>
                                                <strong class="num"><em>{{item.isrPymIsrfe | numberFilter}}</em>원</strong>
                                                <span v-show="fn_showStatus(item.isrCtrStsc)" :class="fn_getStatusClass(item.isrCtrStsc)">{{item.isrCtrStsnm}}</span>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div>
                                                <strong class="org">{{item.isrcoWrsnm}}</strong>
                                                <p class="car_license">{{item.isrVhcno}}</p>
                                                <p class="status"><span class="account">{{item.isrSctsNo}}</span></p>
                                            </div>
                                            <div>
                                                <strong class="num"><em>{{item.tcarIsrIsrfe | numberFilter}}</em>원</strong>
                                                <span v-show="fn_showStatus(item.isrCtrStsc)" :class="fn_getStatusClass(item.isrCtrStsc)">{{item.isrCtrStsnm}}</span>
                                            </div>
                                        </template>
                                    </a>
                                </li>
                            </ul>

                            <div class="btns_wrap" v-if="(atisrTngInsuCn + atisrCarInsuCn > 3) && !isMoreAtTngInsuYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('ATISR')">물보험 더보기</button>
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
import ASIS2012 from '@/views/page/AS/IS/ASIS2012/ASIS2012'
import ASIS4016 from '@/views/page/AS/IS/ASIS4016/ASIS4016'
import ASIS2018 from '@/views/page/AS/IS/ASIS2018/ASIS2018'
import ASIS2021 from '@/views/page/AS/IS/ASIS2021/ASIS2021'

export default {
    name : "ASTA4S16",
    data: () => {
        return {
            respInfo            : {},   // 응답 원데이터

            // 주계약자
            tngInsuCn           : 0,    // 물보험개수
            tngTotPymIsrfe      : 0,    // 물보험월납입총보험료
            tngInsuList         : [],   // 물보험리스트

            // 피보험계약자
            atTngTotPymIsrfe    : 0,    // 물보험월납입총보험료
            atisrTngInsuCn      : 0,    // 물보험목록건수
            atisrTngInsuList    : [],   // 물보험리스트

            // 자동차보험
            carInsuCn           : 0,    // 자동차보험개수
            carInsuList         : [],   // 자동차보험목록

            // 피보험자 자동차보험
            atisrCarInsuCn      : 0,    // 피보험자동차보험개수
            atisrCarInsuList    : [],   // 피보험자동차보험목록

            totTngInsuList      : [],   // 주계약 물보험통합리스트
            totTngAtInsuList    : [],   // 피보험계약 물보험통합리스트

            isMoreTngInsuYn     : false,// 주계약자 물보험 리스트 더보기 여부
            isMoreAtTngInsuYn   : false,// 피보험계약자 물보험 리스트 더보기 여부

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
                    // mydtCusno: '1000162385'
                }
            }
            apiService.call(config).then(response => {
                this.respInfo           = response || {}

                // 주계약자 물보험
                this.respInfo?.tngInsuList?.forEach(d => d.insuDsc = 'MCTR')
                this.tngInsuCn          = this.respInfo.tngInsuCn || 0
                this.tngTotPymIsrfe     = this.respInfo.tngTotPymIsrfe
                this.tngInsuList        = this.respInfo.tngInsuList || []

                // 피보험자 물보험
                this.respInfo?.atisrTngInsuList?.forEach(d => d.insuDsc = 'ATISR')
                this.atTngTotPymIsrfe   = this.respInfo.atTngTotPymIsrfe
                this.atisrTngInsuCn     = this.respInfo.atisrTngInsuCn || 0
                this.atisrTngInsuList   = this.respInfo.atisrTngInsuList || []

                // 주계약자 자동차보험
                this.respInfo?.carInsuList?.forEach(d => d.insuDsc = 'MCTR_CAR')
                this.carInsuCn          = this.respInfo.carInsuCn || 0
                this.carInsuList        = this.respInfo.carInsuList || []

                // 피보험자 자동차보험
                this.respInfo?.atisrCarInsuList?.forEach(d => d.insuDsc = 'ATISR_CAR')
                this.atisrCarInsuCn     = this.respInfo.atisrCarInsuCn || 0
                this.atisrCarInsuList   = this.respInfo.atisrCarInsuList || []

                this.totTngInsuList = [...this.tngInsuList, ...this.carInsuList]
                this.totTngAtInsuList = [...this.atisrTngInsuList, ...this.atisrCarInsuList]
                console.log('>>> ', this.tngInsuCn + this.carInsuCn)
                this.totTngInsuList = (this.tngInsuCn + this.carInsuCn) > 3 ? this.totTngInsuList.slice(0, 3) : this.totTngInsuList
                this.totTngAtInsuList = (this.atisrTngInsuCn + this.atisrCarInsuCn) > 3 ? this.totTngAtInsuList.slice(0, 3) : this.totTngAtInsuList
            })
        },

        /**
         * 보험 상태에 따른 배지 노출 여부 설정
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
                return ['pin', 'orange']
            // 만기
            }else if(isrCtrStsc == '05') {
                return ['pin', 'red']
            // 소멸
            }else if(isrCtrStsc == '06') {
                return ['pin', 'gray']
            }
            return ''
        },

        /**
         * 더보기 선택 이벤트
         */
        fn_showMore(insuDsc) {
            if(insuDsc == 'MCTR') {
                this.isMoreTngInsuYn = true
                this.totTngInsuList = [...this.tngInsuList, ...this.carInsuList]
            } else {
                this.isMoreAtTngInsuYn = true
                this.totTngAtInsuList = [...this.atisrTngInsuList, ...this.atisrCarInsuList]
            }
        },

        /**
         * 상세팝업오픈
         */
        fn_openDtlPop(insuInfo) {
            let compName = ''
            const type = insuInfo.insuDsc   // MCTR : 주계약자, ATISR : 피보험계약자
            if(type.includes('MCTR')) {
                if(this.insuIsrKdDsc.some(d => d == insuInfo.isrKdDsc)) {
                    insuInfo.btnType = (insuInfo.infOfrmnOrgC == 'B1AABF0000' && this.getUserInfo('chnl') != '385') ? true : false
                    compName = ASIS4002 // 상세내역(인보험 상세 납입정보탭)
                } else if(this.pensionIsrKdDsc.some(d => d == insuInfo.isrKdDsc)){
                    compName = ASIS2012 // 상세내역(연금저축보험 상세 납입정보탭)
                } else if(this.tngIsrKdDsc.some(d => d == insuInfo.isrKdDsc)) {
                    compName = ASIS2006 // 상세내역(물보험 상세 납입정보탭)
                } else {
                    compName = ASIS2010 // 상세내역(자동차 보험 상세)
                }
            } else {
                if(this.insuIsrKdDsc.some(d => d == insuInfo.isrKdDsc)) {
                    insuInfo.btnType = (insuInfo.infOfrmnOrgC == 'B1AABF0000' && this.getUserInfo('chnl') != '385') ? true : false
                    compName = ASIS4016 // 상세내역(피보험자 인보험 상세)
                } else if(this.pensionIsrKdDsc.some(d => d == insuInfo.isrKdDsc)) {
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
            modalService.openPopup(config).then(() => {
                this.getData()
            })
        }

        
    },
    components : {
        
    }
}
</script>