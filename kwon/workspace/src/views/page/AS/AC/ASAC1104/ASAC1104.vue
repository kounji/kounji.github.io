<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 예금 > 적금상세
* @ 페이지설명 : 나의자산 > 자산 > 예금 > 적금상세
* @ 파일명     : src/views/page/AS/AC/ASAC1104/ASAC1104.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-06-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-17              CS515729                 최초작성
*************************************************************************/
-->
<template>
	<div class="full_popup mydata2023" id="full_popup_01"><!-- mydata2023 추가 -->
		<div class="popup_header">    
			<h1>적금</h1>			
		</div>
        <div class="popup_content com_no_bottom com_bg_type00 mydataAsisVer"><!-- mydataAsisVer 추가 -->
			<div class="com_inner">
				<div class="top_info_box_wrap">
					<div class="top_info_box type02 new_top_box fixBG hasdetail">
						<div class="box_head">
							<div class="info">
								<div class="ico">
                                    <i :class="respInfo.infOfrmnOrgC"><span class="blind">{{respInfo.infOfrmnOrgnm}}</span></i>
								</div>
								<div class="title">
									{{respInfo.acWrsnm}}
                                    <div class="num">{{respInfo.mydtAcno}}</div>
								</div>
							</div>
						</div>
                        <div class="text">이자율 <em>{{respInfo.aplItr | numberFilter('0,0.00', {precision: 2})}}%</em></div>
						<div class="bill">
							<span class="num counter">{{respInfo.acNowBac | numberFilter}}</span><span class="text fs25">원</span>
						</div>

                        <!-- 주택청약은 만기일 없음. 만기일 존재할때만 표시 2021.11.18 -->
                        <template v-if="respInfo.dueDt != null">
                            <cmm-progress :startDate="respInfo.acOpDt" :endDate="respInfo.dueDt" />
                        </template>
                        <template v-else>
                            <div class="box_toggle_wrap">
                                <div class="box_toggle">
                                    <div class="toggle-box">
                                        <div data-ui-toggle="box">									
                                            <div class="view-box" data-ui-toggle="view">
                                                <div class="info">
                                                    <div class="title">계좌개설일</div>
                                                    <div class="num">{{respInfo.acOpDt | dateFilter('YYYY.MM.DD')}}</div>
                                                </div>
                                            </div>
                                            <button type="button" class="view-btn" aria-expanded="false">
                                                <em class="open">열기</em><em class="close">닫기</em>
                                            </button>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </template>

					</div>
				</div>
			</div>
            <hr class="hr02 mb0"><!-- 신규 추가 -->
            <template v-if="trList.length > 0">
                <ul class="list_more_box">
                    <li>
                        <div class="com_inner">           
                            <ul class="list_type_02">
                                <li v-for="(item, idx) in trList" :key="idx">
                                    <dl>
                                        <dt>
                                            <div><em>{{item.trPymSc}}회차</em></div>
                                            <span>{{item.trDt | dateFilter('YYYY.MM.DD')}}</span>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num">{{item.dpzAcTram | numberFilter}}</em>
                                                <em class="unit">원</em>
                                            </span>
                                            <span class="com_price">
                                                <em class="num">{{item.acTrafBac | numberFilter}}</em>
                                                <em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </li>
                            </ul>
                        </div>
                        <div class="com_space_type01"></div>
                    </li>
                </ul>

                <div class="com_inner">
                    <div class="com_btn_area02">
                        <a href="javascript:void(0);" role="button" @click="fn_showMoreList()" class="com_btn_more" v-show="lsPageYn==='1'"><span>더보기</span></a>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="no_data_box grayExclamationType"><!-- grayExclamationType 추가 -->
                    <div class="no_data_list">
                        <p>조회된 정보가 없습니다.</p>
                    </div>
                </div>
            </template> 
		</div>

		<a href="javascript:void(0);" @click="close()" class="btn_close"><span class="blind">팝업닫기</span></a>	
	</div>
	<!--// full popup E -->
</template>


<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'
    import CmmProgress from '@/components/CmmProgress.vue'
    import {dateFormat} from '@/utils/date'
    import _ from 'lodash'

    export default {
        name : "ASAC1104",
        data : () => {
            return {
                objAccInfo  : {}, //전달파라미터
                respInfo    : {}, //응답헤더정보
                respDtlInfo : {}, //응답상세목록정보
                trList      : [], //최종결과 리스트
                today       : "", //현재일자
                endDay      : "", //조회종료일자

                pageNum     : 0,      // 페이지번호
                lsPageYn    : "",     // 다음페이지존재여부 '1':존재 , '0':미존재
                tranList    : [],     // 임시 리스트
            }
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        created() {
            //초기데이타 세팅
            this.objAccInfo = this.params.objAccInfo    //전달받은 파라미터
            this.today = new Date();
            this.endDay = dateFormat(this.today, "YYYYMMDD")

            this.pageNum  = 1   // 페이지번호
        },
        computed : {

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
                const config = {
					url: '/as/ac/03r01',
					data: {
                        "mydtCusno"      : this.objAccInfo.mydtCusno
                        , "infOfrmnOrgC" : this.objAccInfo.infOfrmnOrgC
                        , "mydtAcno"     : this.objAccInfo.mydtAcno
                        , "mydtScNo"     : this.objAccInfo.mydtScNo
                    }
                }
                apiService.call(config).then(response => {
                    this.respInfo = response
                    this.fn_getDetailList()
				})
            },
            
            /*
            * 계좌 상세내역조회
            */
            fn_getDetailList() {
                const config = {
					url: '/as/ac/03r02',
					data: {
                        "mydtCusno"      : this.objAccInfo.mydtCusno
                        , "infOfrmnOrgC" : this.objAccInfo.infOfrmnOrgC
                        , "mydtAcno"     : this.objAccInfo.mydtAcno
                        , "mydtScNo"     : this.objAccInfo.mydtScNo
                        , "inqStDt"      : this.objAccInfo.acOpDt //계좌개설일자
                        , "inqEdDt"      : this.endDay
                        , "pageNum"      : this.pageNum    //페이지번호
                    }
                }
                apiService.call(config).then(response => {
                    this.respDtlInfo = response
                    this.lsPageYn    = this.respDtlInfo.lsPageYn || ""

                    this.trList = this.fn_generateList(this.respDtlInfo.transactionList || [])
                })
            },

            /*
            * 결과리스트 가공.
            */
            fn_generateList(objList) {
                // for(let i=0; i < objList.length; i++) {
                //     this.tranList.push(objList[i])
                // }

                if(objList.length > 0) {
                    for(let i=0; i < objList.length; i++) {
                        if(objList[i].mydtTrDtm != "00000000000000"){
                            // objList[i].yyyyMM = dateFormat(objList[i].trDt, "YYYYMM")
                            this.tranList.push(objList[i])
                        }
                    }
                } else {
                    this.tranList = []  //응답결과 없을때 초기화처리.
                }

                return _.orderBy(this.tranList, 'mydtTrDtm', 'desc')
            },

            /*
            * 더보기
            */
            fn_showMoreList() {
                this.pageNum = this.pageNum + 1
                this.fn_getDetailList()
            },
        },
        components : {
            CmmProgress
        },
    }
</script>