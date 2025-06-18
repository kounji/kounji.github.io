<!--
/*************************************************************************
* @ 서비스경로 : 큰글모드 > 자산 > 자산 > 기타자산목록
* @ 페이지설명 : 큰글모드 > 자산 > 자산 > 기타자산목록
* @ 파일명     : src/views/page/AS/TA/ASTA4S08/ASTA4S08.vue
* @ 작성자     : CS541597
* @ 작성일     : 2025-02-27
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-27              CS541597               최초작성(ASOA2001 -> ASTA4S08)
*************************************************************************/
-->
<template>
	<!-- 전체 팝업 시작 -->
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>기타</h1>
		</div>	
		<div class="popup_content">
			<div class="assets_senior">
				<div class="board_box" v-if="cshAstCn > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">현금<em>{{cshAstCn}}</em></span>
							<span class="num"><em>{{cshAsetAmtt | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
                                <li v-for="(cshAst, idx) in cshAstList" :key="'csh_'+idx">
                                    <a href="javascript:void(0);" @click.prevent="fn_openDetailPop('1', cshAst)">
                                        <i class="ico_assets_etc cash"></i>
                                        <div>
                                            <strong class="org">{{cshAst.astnm}}</strong>
                                        </div>
                                        <strong class="num"><em>{{cshAst.asetAm | numberFilter}}</em>원</strong>
                                    </a>
                                </li>
							</ul>
                            <div class="btns_wrap" v-if="cshAstCn > 3 && !isMoreCshYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('csh')">현금 더보기</button>
							</div>
						</div>
					</details>
				</div>

				<div class="board_box" v-if="fcCshAstCn > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">외화<em>{{fcCshAstCn}}</em></span>
							<span class="num"><em>{{fcAsetAmtt | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
                                <li v-for="(fcCshAst, idx) in fcCshAstList" :key="'fcCsh_'+idx">
                                    <a href="javascript:void(0);" @click.prevent="fn_openDetailPop('2', fcCshAst)">
                                        <i class="ico_assets_etc foreign"></i>
                                        <div>
                                            <strong class="org">{{fcCshAst.curc}}</strong>
                                        </div>
                                        <strong class="num"><em>{{Math.floor(fcCshAst.krwAm) | numberFilter}}</em>원</strong>
                                    </a>
                                </li>
							</ul>
                            <div class="btns_wrap" v-if="fcCshAstCn > 3 && !isMoreFcYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('fc')">외화 더보기</button>
							</div>
						</div>
					</details>
				</div>

				<div class="board_box" v-if="gldAstCn > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">금<em>{{gldAstCn}}</em></span>
							<span class="num"><em>{{goldAsetAmtt | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
                                <li v-for="(gldAst, idx) in gldAstList" :key="'gld_'+idx">
                                    <a href="javascript:void(0);" @click.prevent="fn_openDetailPop('3', gldAst)">
                                        <i class="ico_assets_etc goldbar"></i>
                                        <div>
                                            <strong class="org">{{gldAst.goldKdc != "04" ? gldAst.goldKdnm + "금" : gldAst.goldKdnm}}</strong>
                                        </div>
                                        <strong class="num"><em>{{Math.floor(gldAst.goldAsetAm) | numberFilter}}</em>원</strong>
                                    </a>
                                    <!-- [v4.0] API 데이터 추가 / 25-02-03 링크형태로 변경, 위치변경 -->
                                    <a href="javascript:void(0);" role="button" class="data_status" @click.prevent="fn_openSlide(gldAst)">
                                        <em class="date">({{gldAst.goldMprBasDt | dateFilter("YYYY.MM.DD")}} 기준)</em>
                                        <em class="price"><i class="blind">종가(원/g)</i><em> {{gldAst.goldPucAm | numberFilter}}원</em>/1g</em>
                                    </a>
                                    <!-- [v4.0] API 데이터 추가 / 25-02-03 링크형태로 변경, 위치변경 -->
                                </li>
							</ul>
                            <div class="btns_wrap" v-if="gldAstCn > 3 && !isMoreGldYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('gld')">금 더보기</button>
							</div>
						</div>
                        <div class="disclaimer_list">
							<strong class="txt_info">면책조항</strong>
							<ul class="bl_dot_list">
								<li>농업협동조합중앙회가 제공하는 금시세정보는 금거래소의 정보를 토대로 제공되는 투자 참고 사항이며 오류가 발생하거나 지연될 수 있습니다.</li>
								<li>제공된 정보에 의한 투자 결과에 법적 책임을 지지 않습니다.</li>
								<li>실물 구입 시 부가가치세 10%가 부과될 수 있습니다.</li>
							</ul>
						</div>
					</details>
				</div>

				<div class="board_box" v-if="fmachAstCn > 0">
					<details class="assets_toggle" open="">
						<summary>
							<span class="item">농기계<em>{{fmachAstCn}}</em></span>
							<span class="num"><em>{{fmachAsetAmtt | numberFilter}}</em>원</span>
						</summary>
						<div class="cont">
							<ul class="assets_list">
                                <li v-for="(fmachAst, idx) in fmachAstList" :key="'fmach_'+idx">
                                    <a href="javascript:void(0);" @click.prevent="fn_openDetailPop('5', fmachAst)">
                                        <i class="ico_assets_etc machin"></i>
                                        <div>
                                            <strong class="org">{{fmachAst.astnm}}</strong>
                                        </div>
                                        <strong class="num"><em>{{fmachAst.asetAm | numberFilter}}</em>원</strong>
                                    </a>
                                </li>
							</ul>
							<div class="btns_wrap" v-if="fmachAstCn > 3 && !isMoreFmachYn">
								<button type="button" class="btn_more_txt" @click.prevent="fn_showMore('fmach')">농기계 더보기</button>
							</div>
						</div>
					</details>
				</div>
			</div>
		</div>

		<a href="javascript:void(0);" class="btn_close" @click.prevent="close"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>

/*eslint-disable */
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'

import ASRA2106 from '@/views/page/AS/RA/ASRA2106/ASRA2106'
import ASRA2107 from '@/views/page/AS/RA/ASRA2107/ASRA2107'
import ASOA4005 from '@/views/page/AS/OA/ASOA4005/ASOA4005'
import ASOA2009 from '@/views/page/AS/OA/ASOA2009/ASOA2009'
import ASOA4006 from '@/views/page/AS/OA/ASOA4006/ASOA4006'

export default {
    name : "ASTA4S08",
    data: () => {
        return {
            respInfo        : {},   // 기타자산 조회 api 응답 원데이터
            asetCn          : 0,    // 자산총건수
            asetAmtt        : 0,    // 자산금액합계
            cshAsetAmtt     : 0,    // 현금자산금액합계
            cshAstCn        : 0,    // 현금자산목록건수
            cshAstList      : [],   // 현금자산목록
            fcAsetAmtt      : 0,    // 외화자산금액합계
            fcCshAstCn      : 0,    // 외화현금자산건수
            fcCshAstList    : [],   // 외화현금자산목록
            goldAsetAmtt    : 0,    // 금자산금액합계
            gldAstCn        : 0,    // 금자산건수
            gldAstList      : [],   // 금자산목록
            etcAsetAmtt     : 0,    // 기타자산금액합계
            etcAstCn        : 0,    // 기타자산건수
            etcAstList      : [],   // 기타자산목록
            fmachAsetAmtt   : 0,    // 농기계자산금액합계
            fmachAstCn      : 0,    // 농기계자산건수
            fmachAstList    : [],   // 농기계자산목록

            isMoreCshYn     : false,    // 현금자산 더보기 여부
            isMoreFcYn      : false,    // 외화자산 더보기 여부
            isMoreGldYn     : false,    // 금자산 더보기 여부
            isMoreEtcYn     : false,    // 기타자산 더보기 여부
            isMoreFmachYn   : false,    // 농기계 더보기 여부
        }
    },
    computed : {
        
    },
    created() {
        
    },
    mounted() {
        this.initComponent()

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
            // 기타자산 통합조회 v2
            const config = {
                url : '/as/oa/01r02',
                data : {
                    mydtCusno: this.getUserInfo('mydtCusno')
                }
            }
            apiService.call(config).then(response => {
                this.respInfo      = response
                this.asetCn        = response.asetCn || 0
                this.asetAmtt      = Math.floor(response.asetAmtt)
                this.cshAsetAmtt   = response.cshAsetAmtt || 0
                this.cshAstCn      = response.cshAstCn || 0
                this.cshAstList    = response.cshAstList || []
                this.fcAsetAmtt    = response.fcAsetAmtt || 0
                this.fcCshAstCn    = response.fcCshAstCn || 0
                this.fcCshAstList  = response.fcCshAstList || []
                this.goldAsetAmtt  = response.goldAsetAmtt || 0
                this.gldAstCn      = response.gldAstCn || 0
                this.gldAstList    = response.gldAstList || []
                this.etcAsetAmtt   = response.etcAsetAmtt || 0
                this.etcAstCn      = response.etcAstCn || 0
                this.etcAstList    = response.etcAstList || []
                this.fmachAsetAmtt = response.fmachAsetAmtt || 0
                this.fmachAstCn    = response.fmachAstCn || 0
                this.fmachAstList  = response.fmachAstList || []

                // 목록 페이징 처리
                this.cshAstList = this.cshAstCn > 3 && !this.isMoreCshYn ? this.cshAstList.slice(0, 3) : this.cshAstList
                this.fcCshAstList = this.fcCshAstCn > 3 && !this.isMoreFcYn ? this.fcCshAstList.slice(0, 3) : this.fcCshAstList
                this.gldAstList = this.gldAstCn > 3 && !this.isMoreGldYn ? this.gldAstList.slice(0, 3) : this.gldAstList
                this.fmachAstList = this.fmachAstCn > 3 && !this.isMoreFmachYn ? this.fmachAstList.slice(0, 3) : this.fmachAstList
            })

        },

        /**
         * 더보기 선택 이벤트
         */
        fn_showMore(type) {
            switch(type) {
                case 'csh':
                    this.isMoreCshYn = true
                    this.cshAstList = this.respInfo.cshAstList || []
                    break
                case 'fc':
                    this.isMoreFcYn = true
                    this.fcCshAstList = this.respInfo.fcCshAstList || []
                    break
                case 'gld':
                    this.isMoreGldYn = true
                    this.gldAstList = this.respInfo.gldAstList || []
                    break
                case 'fmach':
                    this.isMoreFmachYn = true
                    this.fmachAstList = this.respInfo.fmachAstList || []
                    break
                default: return
            }
        },

        fn_openDetailPop(type, astInfo) {
            let compName = "";
            if (type == "1") {
                compName = ASRA2106; // 현금
            } else if (type == "2") {
                compName = ASRA2107; // 외화
            } else if (type == "3") {
                compName = ASOA4005; // 금
            } else if (type == "5") {     // 농기계
                compName = ASOA2009
            } else if (type == "4") {
                compName = ASRA2109; // 그밖에
            }

            const config = {
                component : compName,
                params    : astInfo
            };

            modalService.openPopup(config).then(() => {
                this.getData();
            })
        },

        /**
         * 금 시세정보 슬라이드 팝업
         */
        fn_openSlide(obj) {
            const config = {
                params : {
                    selectedGoldMprList : obj
                },
                renderer: {
                    component: ASOA4006,
                }
            }
            modalService.openSlidePagePopup(config)
        },
    },
    components : {
        
    }
}
</script>