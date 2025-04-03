<!--
/*************************************************************************
* @ 서비스경로 : 
* @ 페이지설명 : 
* @ 파일명     : src/views/page/AS/PS/ASPS2003/ASPS2003.vue
* @ 작성자     : 
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10                              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
	<div class="dimmed mydata2023" style="display:block;"></div> 
	<div class="popup_box mydata2023">
		<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
			<div class="popup_header">
				<h1>운용상품 현황</h1>          
			</div>
			<div class="popup_content com_btn_bottom">
				<div class="gray_box_2023">
					평가금액 합계 <span class="total_price">{{this.acEvlamSum | numberFilter}}원</span>
				</div>

				<ul class="list_type_2023 list_type_line">
					<li v-for="(item, idx) in dcDtlList" :key="idx">
						<dl>
							<dt>상품명</dt>
							<dd class="bank_icon">
								<!--20231024 CI 비노출  <i :class= "item.infOfrmnOrgC"></i> -->
								{{item.idvdEpyWrsnm}}</dd>
						</dl>
						<!--20231024 비노출  <dl v-if="item.wrsEntNo">
							<dt>상품가입번호</dt>
							<dd class="num">{{item.wrsEntNo}}</dd>
						</dl>	 -->
						<dl>
							<dt>평가금액</dt>
							<dd><span class="pointColor Blue num">{{item.acEvlam | numberFilter}}원</span></dd>
						</dl>	
						<dl>
							<dt>투자원금</dt>
							<dd class="num">{{item.mydtIvPrn | numberFilter}}원</dd>
						</dl>	
						<dl>
							<dt>상품유형</dt>
							<dd>{{item.idvdEpyWrsTpnm}}</dd>
						</dl>	
						<dl v-if="item.mydtHldAcn > 0">
							<dt>보유좌수</dt>
							<dd>{{item.mydtHldAcn | numberFilter}}</dd>
						</dl>	
						<dl v-if="item.anwDt">
							<dt>신규일</dt>
							<dd class="num">{{item.anwDt | dateFilter("YYYY.MM.DD")}}</dd>
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
					<a href="javascript:void(0);" @click="close()" class="btn btn_mint">확인</a>
				</div>
			</div>
			<a href="javascript:void(0);" @click="close()" class="btn_close"><span class="">취소</span></a>
		</div>
	</div>
	<!--// slide popup E -->
	</div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
	import apiService from '@/service/apiService'
	
    export default {
		name : "ASPS2003",
        data: () => {
            return {
				dcDtlList : {} , //전달파라미터
				acEvlamSum : 0

            }	
		},
		mixins: [
            popupMixin,
            commonMixin
		],
		mounted() {
			this.dcDtlList = this.params.dcDtlList    //전달받은 파라미터
			this.acEvlamSum = this.params.acEvlamSum
			console.log('@@dcDtlList',this.dcDtlList)
			console.log('@@acEvlamSum',this.acEvlamSum)
			console.log('@@params',this.params)


			//console.log('@@acEvlamSum',this.dcDtlListacEvlamSum)
			//PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        methods: {

        }
    
    }
</script>