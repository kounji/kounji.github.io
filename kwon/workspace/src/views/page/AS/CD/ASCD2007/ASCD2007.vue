<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부채 > 카드목록 > 단기대출
* @ 페이지설명 : 나의자산 > 부채 > 카드목록 > 단기대출 상세조회
* @ 파일명     : src/views/page/AS/CD/ASCD2007/ASCD2007.vue
* @ 작성자     : 채찬영
* @ 작성일     : 2021-05-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-10              채찬영                 최초작성
* 2021-05-13              CS515937              수정(장기대출상세로 변경)
* 2023-07-28              CS533457              상호금융 마이데이터 확대 개발 AS/LN/ASLN1109/ASLN1109.vue -> AS/CD/ASCD2007/ASCD2007.vue 변경
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal mydata2023" id="full_popup_01">
		<div class="popup_header">    
			<h1>단기신용대출</h1>
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
								<span class="num counter" data-count="">{{totShlnBac | numberFilter}}</span>원
							</div>
						</div>
					</div>

					<div class="asset_detail">
						<ul class="list_type_2023">
							<li>
								<dl>
									<dt>단기대출 총 잔액</dt>
									<dd><em class="num">{{totShlnBac | numberFilter}}</em>원</dd>
								</dl>
								<dl>
									<dt>단기대출 전체 이용기간</dt>
									<dd class="num">{{minLnDt | dateFilter('YYYY.MM.DD')}}~{{maxStlPlaDt | dateFilter('YYYY.MM.DD')}}</dd>
								</dl>
								<dl>
									<dt>총 단기대출 이용건</dt>
									<dd><em class="num">{{totCnt | numberFilter}}</em>건</dd>
								</dl>
								<dl>
									<dt>총 이용금액</dt>
									<dd class="num">{{totLnUsAm | numberFilter}}원</dd>
								</dl>	
							</li>
						</ul>
					</div>
				</div>

				<button type="button" class="btn_view_detail">더보기</button><!-- 230720 상세보기에서 더보기로 수정 -->
			</div>
			<div class="com_inner renewal shor_term" v-if="shortTermSubOut.length > 0">
				<div class="com_box_type01 toggle_list_box2 custom_list" v-for="(item, index) in shortTermSubOut" :key="index" >
					<div data-ui-toggle="box" class="toggle_box_area open">
						<button type="button" class="view_btn" aria-expanded="true">
							<div class="new_tit_area">
								<div class="tit"><span>{{item.lnDtm | dateFilter('YYYY.MM.DD HH:MM:SS')}}</span></div>
								<span class="total_price">
									<em class="num">{{item.lnUsAm | numberFilter}}</em><em class="unit">원</em>
								</span>
							</div>
							<em class="open">열기</em>
							<em class="close">닫기</em>
						</button>
					</div>
					<div class="view_cont list_type_01">
						<dl>
							<dt>단기대출 잔액</dt>
							<dd><em class="num">{{item.shlnBac | numberFilter}}</em>원</dd>
						</dl>
						<dl>
							<dt>결제예정일</dt>
							<dd class="num">{{item.stlPlaDt | dateFilter('YYYY.MM.DD')}}</dd>
						</dl>
						<dl>
							<dt>이자율</dt>
							<dd><em class="num">{{item.pmiIntrt | numberFilter('0,0.00', {precision: 2})}}</em>%</dd>
						</dl>	
						<dl v-if="item.lnrpyOrgCNm != null">
							<dt>상환기관</dt>
							<dd>{{item.lnrpyOrgCNm}}</dd>
						</dl>	
						<dl v-if="item.lnrpyAcno != null">
							<dt>상환계좌번호</dt>
							<dd class="num">{{item.lnrpyAcno}}</dd>
						</dl>
					</div>
				</div>
				<a href="javascript:void(0);" role="button" class="com_btn_more mt30" @click.prevent="showMoreList()" :style="noMoreList">더보기</a>
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
    name : "ASCD2007",
    data: () => {
        return {
            mydtCusno       : "",           // 마이데이터고객번호
            infOfrmnOrgC    : "",           // 정보제공자기관코드
            infOfrmnOrgCNm  : "",           // 정보제공자기관코드명
            lnDt            : "",           // 대출일자          
            sqno            : 0,            // 일련번호          
            rcnInqDtm       : "",           // 최근조회일시      
            lnDtm           : "",           // 대출일시          
            lnUsAm          : 0,            // 대출이용금액      
            shlnBac         : 0,            // 단기대출잔액      
            stlPlaDt        : "",           // 결제예정일자      
            pmiIntrt        : 0,            // 약정이자율        
            lnrpyOrgC       : "",           // 대출상환기관코드  
			lnrpyOrgCNm     : "",           // 대출상환기관코드명
            lnrpyAcno       : "",           // 대출상환계좌번호
            pageNo          : 1,            // 페이지번호
            nxDataYn        : "",           // 다음데이터여부
            intCn           : 0,            // 이자목록수  
            lnDsc           : "",           // 대출구분코드
            totShlnBac      : 0,            // 총단기대출잔액
            minLnDt         : "",           // 시작대출일자
            maxStlPlaDt     : "",           // 최근결제예정일자
            totCnt          : 0,            // 총이용건
            totLnUsAm       : 0,            // 총대출이용금액
            
            shortTermSubOut : [], // 단기대출정보Out
            // 모든 대출 거래내역의 정렬기준은 거래일시 내림차순
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
                url : '/as/cd/07r01',
                data : {
                    mydtCusno       : this.mydtCusno,
                    infOfrmnOrgC    : this.infOfrmnOrgC,
                    pageNo          : this.pageNo,
                }
            }
            apiService.call(config).then(response => {
				console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.config" + config)
                this.totShlnBac     = response.totShlnBac || 0
                this.minLnDt        = response.minLnDt || ''
                this.maxStlPlaDt    = response.maxStlPlaDt || ''
                this.totCnt         = response.totCnt || 0
                this.totLnUsAm      = response.totLnUsAm || 0
				this.shortTermSubOut = response.shortTermSubOut || []
                this.nxDataYn       = response.nxDataYn || 'N'

                this.callJQueryFncExcute()

				setTimeout(() => {
					this.initEvent()
				}, 10)	
            });
        },

        // 더보기
        showMoreList() {
            this.pageNo += 1
            const config = {
                url : '/as/cd/07r01',
                data : {
                    mydtCusno       : this.mydtCusno,
                    infOfrmnOrgC    : this.infOfrmnOrgC,
                    pageNo          : this.pageNo,
                }
            }

            apiService.call(config).then(response => {
                this.nxDataYn	= response.nxDataYn || 'N'
                for(let i=0;i<response.shortTermSubOut.length;i++) {
                    this.shortTermSubOut.push(response.shortTermSubOut[i])
                }
            })
        },
        
		initEvent() {
			$('.btn_view_detail').on('click',function(){
				$(this).siblings().children('.asset_detail').toggleClass('open');
				$(this).toggleClass('close');
				if($('.asset_detail').hasClass('open')) {
					$('.asset_detail').slideDown('slow');
					$('.btn_view_detail').text('접기');//230720 상세접기에서 접기로 수정
				}else {
					$('.asset_detail').slideUp('slow');
					$('.btn_view_detail').text('더보기');//230720 상세보기에서 더보기로 수정
				}
			});
		},
    },
}
</script>