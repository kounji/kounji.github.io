<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 투자 > 신탁/ISA상세
* @ 페이지설명 : 나의자산 > 자산 > 투자 > 신탁/ISA상세 > 운용상품현황
* @ 파일명     : src/views/page/AS/IV/ASIV2006/ASIV2006.vue
* @ 작성자     : CS533039
* @ 작성일     : 2023-08-16
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-16             CS533039         최초작성
*************************************************************************/
-->
<template>
<div>
    <!-- 슬라이드 팝업 시작 -->
	<div class="dimmed" style="display:block;"></div>
	<div class="popup_box mydata2023">
		<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
			<div class="popup_header">
				<h1>운용상품 현황</h1>          
			</div>
			<div class="popup_content com_btn_bottom">
				<div class="gray_box_2023">
					평가금액 합계 <span class="total_price">{{this.tswrsEpyAm | numberFilter}}원</span>
				</div>

				<ul class="list_type_2023 list_type_line">
					<li v-for="(item, idx) in epyList" :key="idx">
						<dl>
							<dt>상품명</dt>
							<dd>{{item.idvdEpyWrsnm}}</dd>
						</dl>
						<dl>
							<dt>평가금액</dt>
							<dd><span class="pointColor Blue num">{{item.mydtEvlam | numberFilter}}원</span></dd>
						</dl>	
						<dl>
							<dt>투자원금</dt>
							<dd class="num">{{item.mydtIvPrn | numberFilter}}원</dd>
						</dl>	
						<dl>
							<dt>상품유형</dt>
							<dd>{{item.idvdEpyWrsTpcNm}}</dd>
						</dl>	
						<dl>
							<dt>보유좌수</dt>
							<dd>{{item.mydtHldAcn | numberFilter}}</dd>
						</dl>	
						<dl>
							<dt>신규일</dt>
							<dd class="num">{{item.anwDt | dateFilter("YYYY.MM.DD")}}</dd>
						</dl>	
						<dl>
							<dt>만기일</dt>
							<dd class="num">{{item.dueDt | dateFilter("YYYY.MM.DD")}}</dd>
						</dl>	
						<dl>
							<dt>약정이자율</dt>
							<dd class="num"><em>{{item.pmiIntrt | numberFilter('0,0.00', {precision: 2})}}</em>%</dd>
                            
						</dl>	
					</li>
				</ul>
			</div>
			<div class="popup_footer">
				<div class="btn_group">
					<a href="javascript:void(0);" class="btn btn_mint" @click.prevent="close()">확인</a> 
				</div>
			</div>
			<a class="btn_close" @click.prevent="close()"><span class="">취소</span></a>
		</div>
        </div>
        <!-- 슬라이드 팝업 종료 -->
	</div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'
    
	export default {
        name : "ASIV2006",
        data: () => {
            return {
                objAccInfo  : {}, //전달 파라미터
                respInfo    : {}, //응답헤더정보
                epyList     : [], //최종결과 리스트

                pageNum     : 0,  // 페이지번호
                lsPageYn    : "", // 다음페이지존재여부 '1':존재 , '0':미존재 
                tswrsEpyAm  : 0,  // 운용상품평가금액합계
                tranList    : [], // 임시 리스트
            }
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        created() {
            //초기데이타 세팅
            this.objIvInfo = this.params.objIvInfo    //전달받은 파라미터

            this.pageNum     = 1  // 페이지번호
            this.tswrsEpyCn  = 0  // 운용상품건수
            this.tswrsEpyAm  = this.objIvInfo.tswrsEpyAm  // 운용상품평가금액합계
           
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
                this.getData()
                
            },
            getData() {
                
                ////////
                // 운용상품현황조회
                //
                const config = {
                    url: '/as/iv/33r01',
                    data: {
                         "mydtCusno"     : this.objIvInfo.mydtCusno
                        , "infOfrmnOrgC" : this.objIvInfo.infOfrmnOrgC
                        , "mydtAcno"     : this.objIvInfo.mydtAcno
                        , "mydtScNo"     : this.objIvInfo.mydtScNo 
                        , "pageNum"      : this.pageNum    //페이지번호
                        , "tswrsEpyAm"   : this.objIvInfo.tswrsEpyAm,                    }
                }
                apiService.call(config).then(response => {
                    this.respInfo   = response;

                    this.lsPageYn   = this.respInfo.lsPageYn || ""
                    this.epyList    = this.fn_generateList(this.respInfo.epyList || [])
                })
              
            },

            /*
            * 더보기
            */
            fn_showMoreList() {
                this.pageNum = this.pageNum + 1
                this.getData()
            },

            /*
            * 결과리스트 가공.
            */
            fn_generateList(objList) {
                for(let i=0; i < objList.length; i++) {
                    this.tranList.push(objList[i])
                }

                return this.tranList
            },

        },
    }
 
</script>