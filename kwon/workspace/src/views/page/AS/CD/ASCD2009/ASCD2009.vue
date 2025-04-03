<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부채 > 카드목록 > 리볼빙
* @ 페이지설명 : 나의자산 > 부채 > 카드목록 > 리볼빙 상세조회
* @ 파일명     : src/views/page/AS/CD/ASCD2009/ASCD2009.vue
* @ 작성자     : CS533457
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-28              CS533457              상호금융 마이데이터 확대 개발 
*************************************************************************/
-->
<template>
    <!-- full popup S -->
    <div class="full_popup renewal mydata2023" id="full_popup_01">
        <div class="popup_header">    
            <h1>리볼빙</h1>
        </div>	
        <div class="popup_content com_space_bottom com_bg_type00">
                
            <div class="asset_info_box">
                <div class="com_inner">
                    <div class="asset_info_wrap">
                        <div class="asset_info">
                            <dl>
                                <dt>{{infOfrmnOrgCNm}}</dt>
                            </dl>
                            <div class="bank_icon">
                                <i :class="infOfrmnOrgC"><span class="blind">{{infOfrmnOrgCNm}}</span></i>
                            </div>
                        </div>

                        <div class="asset_price_wrap">
                            <div class="asset_price">
                                <span class="num counter" data-count="">{{totRvvCrovBac | numberFilter}}</span>원
                            </div>
                        </div>
                    </div>

                    <div class="asset_detail asset_detail_revolving">
                        <ul class="list_type_2023">
                            <li>
                                <dl>
                                    <dt>리볼빙 이월 총 잔액</dt>
                                    <dd><em class="num">{{totRvvCrovBac | numberFilter}}</em>원</dd>
                                </dl>
                                <dl>
                                    <dt>리볼빙 전체 이용기간</dt>
                                    <dd class="num">{{minRqDt | dateFilter('YYYY.MM.DD')}}~{{maxCloDt | dateFilter('YYYY.MM.DD')}}</dd>
                                </dl>
                                <dl>
                                    <dt>총 리볼빙 이용건</dt>
                                    <dd><em class="num">{{totCnt | numberFilter}}</em>건</dd>
                                </dl>
                                <dl>
                                    <dt>총 약정 결제금액</dt>
                                    <dd class="num">{{totPmiStlAm | numberFilter}}원</dd>
                                </dl>	
                            </li>
                        </ul>
                    </div>
                </div>
                <button type="button" class="btn_view_detail btn_view_detail_revolving">더보기</button><!-- 230720 상세보기에서 더보기로 수정 -->
            </div>

            <div class="com_inner" v-if="rvvSubOut.length > 0">
                <ul class="list_type_2023 list_type_line">
                    <li v-for="(item, index) in rvvSubOut" :key="index">
                        <dl class="revolving_period">
                            <dt>{{item.rqDt | dateFilter('YYYY.MM.DD')}}~{{item.rvvCloDt | dateFilter('YYYY.MM.DD')}}</dt>
                        </dl>
                        <dl v-if="item.rvvCloDt != null">
                            <dt>리볼빙 해지일자</dt>
                            <dd class="num">{{item.rvvCloDt | dateFilter('YYYY.MM.DD')}}</dd>
                        </dl>
                        <dl>
                            <dt>최소결제비율</dt>
                            <dd><em class="num">{{item.minStlRto | numberFilter('0,0.00', {precision: 2})}}</em>%</dd>
                        </dl>
                        <dl>
                            <dt>최소결제금액</dt>
                            <dd><em class="num">{{item.minStlAm | numberFilter}}</em>원</dd>
                        </dl>
                        <dl v-if="item.pmiStlRto != 0">
                            <dt>약정결제비율</dt>
                            <dd><em class="num">{{item.pmiStlRto | numberFilter('0,0.00', {precision: 2})}}</em>%</dd>
                        </dl>
                        <dl v-if="item.pmiStlAm != 0">
                            <dt>약정결제금액</dt>
                            <dd><em class="num">{{item.pmiStlAm | numberFilter}}</em>원</dd>
                        </dl>
                        <dl>
                            <dt>리볼빙 이월잔액</dt>
                            <dd><em class="num">{{item.rvvCrovBac | numberFilter}}</em>원</dd>
                        </dl>
                    </li>
                </ul>

                <a href="javascript:void(0);" role="button" class="com_btn_more" @click.prevent="showMoreList()" :style="noMoreList">더보기</a>
            </div>

            <!-- 조회내역이 없을경우 S -->
            <!-- <div class="no_data_box no_data_box01 grayExclamationType" v-else>
                <div class="no_data_list">
                    <p class="txt_sub">조회된 정보가 없습니다.</p>
                </div>
            </div> -->
            <!--// 조회내역이 없을경우 E -->
        </div>

        <a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
    </div>
    <!--// full popup E -->
</template>
<script>
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

export default {
    name : "ASCD2009",
    data: () => {
        return {
            mydtCusno       : "",           // 마이데이터고객번호
            infOfrmnOrgC    : "",           // 정보제공자기관코드
            infOfrmnOrgCNm  : "",           // 정보제공자기관코드명
            rqDt            : "",           // 신청일자
            rcnInqDtm       : "",           // 최근조회일시
            minStlRto       : 0,            // 최소결제비율
            minStlAm        : 0,            // 최소결제금액
            pmiStlRto       : 0,            // 약정결제비율
            pmiStlAm        : 0,            // 약정결제금액
            rvvCrovBac      : 0,            // 리볼빙이월잔액
            pmiEdDt         : "",           // 약정종료일자
            cloDt           : "",           // 해지일자
            pageNo          : 1,            // 페이지번호
            nxDataYn        : "",           // 다음데이터여부
            intCn           : 0,            // 이자목록수  
            lnDsc           : "",           // 대출구분코드
            totRvvCrovBac   : 0,            // 총리볼빙이월잔액
            minRqDt         : "",           // 시작신청일자
            maxCloDt        : "",           // 최근해지일자
            totCnt          : 0,            // 총이용건
            totPmiStlAm     : 0,            // 총약정결제금액
            rvvCloDt        : "",           // 리볼빙해지일자

            rvvSubOut : [], // 리볼빙정보Out
            // 모든 거래내역의 정렬기준은 거래일시 내림차순
        }	
    },
    computed : {
        noMoreList() {
            return (this.nxDataYn == 'Y')?"":"display : none"
        },
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    mounted() {
        this.initComponent(this.params)
        
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent(param) {
            this.mydtCusno      = param.mydtCusno || ''
			this.infOfrmnOrgC   = param.infOfrmnOrgC || ''
            this.infOfrmnOrgCNm = param.infOfrmnOrgCNm || ''
			this.lnDsc          = param.lnDsc || ''
			
            this.getData();
        },
        getData() {
            const config = {
                url : '/as/cd/09r01',
                data : {
                    mydtCusno       : this.mydtCusno,
                    infOfrmnOrgC    : this.infOfrmnOrgC,
                    pageNo          : this.pageNo,
                }
            }
            apiService.call(config).then(response => {
                this.totRvvCrovBac = response.totRvvCrovBac || 0
                this.minRqDt       = response.minRqDt || ''
                this.maxCloDt      = response.maxCloDt || ''
                this.totCnt        = response.totCnt || 0
                this.totPmiStlAm   = response.totPmiStlAm || 0
				this.rvvSubOut     = response.rvvSubOut || []
                this.nxDataYn      = response.nxDataYn || 'N'

                this.callJQueryFncExcute()

                //리볼빙해지일자(rvvCloDt) = 해지일자(cloDt) 없으면 약정종료일자(pmiEdDt)로 세팅
                if(this.cloDt === null || this.cloDt === '') {
                    this.rvvCloDt = this.pmiEdDt
                }
                else {
                    this.rvvCloDt = this.cloDt
                }

				setTimeout(() => {
					this.initEvent()
				}, 10)	
            });
        },

        // 더보기
        showMoreList() {
            this.pageNo += 1
            const config = {
                url : '/as/cd/09r01',
                data : {
                    mydtCusno       : this.mydtCusno,
                    infOfrmnOrgC    : this.infOfrmnOrgC,
                    pageNo          : this.pageNo,
                }
            }

            apiService.call(config).then(response => {
                this.nxDataYn	= response.nxDataYn || 'N'
                for(let i=0;i<response.rvvSubOut.length;i++) {
                    this.rvvSubOut.push(response.rvvSubOut[i])
                }
            })
        },
        
		initEvent() {
			$('.btn_view_detail_revolving').on('click',function(){
				$(this).siblings().children('.asset_detail_revolving').toggleClass('open');
				$(this).toggleClass('close');
				if($('.asset_detail_revolving').hasClass('open')) {
					$('.asset_detail_revolving').slideDown('slow');
					$('.btn_view_detail_revolving').text('접기');//230720 상세접기에서 접기로 수정
				}else {
					$('.asset_detail_revolving').slideUp('slow');
					$('.btn_view_detail_revolving').text('더보기');//230720 상세보기에서 더보기로 수정
				}
			});
		},
    },
}
</script>