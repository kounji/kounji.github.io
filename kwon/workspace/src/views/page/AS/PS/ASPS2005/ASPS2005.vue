<!--
/*************************************************************************
* @ 서비스경로 : 자산현황 > 연금 > IRP > IRP상세
* @ 페이지설명 : 자산현황 > 연금 > IRP > IRP상세
* @ 파일명     : src/views/page/AS/PS/ASPS2005/ASPS2005.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-06-21
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-15              CS533033                 최초작성
*************************************************************************/
-->
<template>
	<div>
		<div class="dimmed" style="display: block;"></div>
        <div class="popup_box">
            <div aria-hidden="false" class="slide_popup renewal mydata2023" id="slide_popup_01" style="display: block;">
				<div class="popup_header">
					<h1>운용상품 현황</h1>          
				</div>
                <div class="popup_content com_btn_bottom">
					<div class="gray_box_2023">
						평가금액 합계 <span class="total_price">{{this.acEvlamSum | numberFilter}}원</span>
					</div>

                    <ul class="list_type_2023 list_type_line">
						<li v-for="(item, index) in irpDtlList" :key="index">
                            <dl>
                                <dt>상품명</dt>
                                <dd class="bank_icon">
									<!--20231024 비노출처리 <i :class= "item.infOfrmnOrgC"></i> -->
									{{item.acWrsnm}}</dd>
                            </dl>
                            <!--20231024 비노출처리 <dl v-if="item.wrsEntNo">
                                <dt>상품가입번호</dt>
                                <dd class="num">{{item.wrsEntNo}}</dd>
                            </dl> -->
							<dl>
								<dt>평가금액</dt>
								<dd><span class="pointColor Blue num">{{item.acEvlam | numberFilter}}원</span></dd>
							</dl>
							<dl>
								<dt>투자원금</dt>
								<dd class="num">{{item.irpIvOgnAm | numberFilter}}원</dd>
							</dl>	
							<dl>
								<dt>상품유형</dt>
								<dd>{{item.psntpIrpWrsTpcNm}}</dd>
							</dl>
							<dl v-if="item.mydtHldAcn">
								<dt>보유좌수</dt>
								<dd>{{item.mydtHldAcn | numberFilter}}</dd>
							</dl>
							<dl v-if="item.anwDt">
								<dt>신규일</dt>
								<dd class="num">{{item.anwDt | dateFilter("YYYY.MM.DD")}} </dd>
							</dl>
							<dl v-if="item.dueDt">
								<dt>만기일</dt>
								<dd class="num">{{item.dueDt | dateFilter("YYYY.MM.DD")}}</dd>
							</dl>
							<dl v-if="item.pmiIntrt">
								<dt>약정이자율</dt>
								<dd class="num">{{item.pmiIntrt | numberFilter('0,0.00', {precision: 2}) }}%</dd>
							</dl>
						</li>
					</ul>
                </div>
				<div class="popup_footer">
					<div class="btn_group">
						<a href="javascript:void(0);" class="btn btn_mint" @click="close()">확인</a>
					</div>
				</div>
				<a href="#nolink" class="btn_close" @click="close()"><span class="">취소</span></a>
			</div>	
		</div>
	</div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'

    export default {
        name : "ASPS2005",
        data: () => {
            return {
				irpDtlList : {}, //전달파라미터
				acEvlamSum : 0
            }	
		},
        mixins: [
            popupMixin,
            commonMixin
        ],
		computed : {
        },
        mounted() {
			this.irpDtlList = this.params.irpDtlList    //전달받은 파라미터
			this.acEvlamSum = this.params.acEvlamSum
            //PFM로그 처리 화면접속이력 등록 POST
			apiService.pfmLogSend(this.$options.name)
			console.log('test #### ', this.params.irpDtlList)
			console.log('test #### ', this.params.irpDtlList.length)
			console.log('irpDtlList ### ', this.params.irpDtlList[0].acWrsnm)
        },
        methods: {

        }
    }
</script>