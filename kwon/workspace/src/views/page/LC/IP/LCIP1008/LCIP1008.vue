<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출분석
* @ 페이지설명 : 지출 > 지출분석 > 지출 금액 TOP10
* @ 파일명     : src\views\page\LC\IP\LCIP1008\LCIP1008.vue
* @ 작성자     : CS529599
* @ 작성일     : 2022-10-12
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-10-12              CS529599              최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal" id="full_popup_01" style="display:block;"> <!-- 개발시 style="display:block;" 삭제--> 
		<div class="popup_header">    
			<h1>지출 금액 TOP10</h1>
		</div>
		<div class="popup_content com_no_bottom">
			<div class="com_inner">
				<!-- 쇼핑 AS20000001 / 병원 AS20000010 / 관리비 AS20000014 / 모임 AS20000016 / 영상 AS20000009 / 식당 AS20000003 / 마켓 AS20000005 -->
				<ol class="spend_list icon_ty" v-for="(mchtByAmtInfo, idx) in mchtByAmtList" :key="idx">
					<li>
						<template v-if="idx > 0">
							<i class="ranking_label"><em>{{idx+1}}</em>위</i>
						</template>
						<template v-else>
							<i class="ranking_label top"><em>{{idx+1}}</em>위</i>
						</template>
						<div class="spend_item">
							<strong class="spend_name">{{mchtByAmtInfo.prcMchtnm}}</strong>
							<span class="spend_price"><em>{{mchtByAmtInfo.xpsAm | numberFilter}}</em>원</span>
							<i :class="'icons ' + getIconClass(mchtByAmtInfo.xpsCtgrC)"></i>
						</div>
					</li>
					<!--
					<li>
						<i class="ranking_label top"><em>1</em>위</i>
						<div class="spend_item">
							<strong class="spend_name">현대쇼핑몰</strong>
							<span class="spend_price"><em>1,250,500</em>원</span>
							<i class="icons AS20000001"></i>
						</div>
					</li>
					<li>
						<i class="ranking_label"><em>2</em>위</i>
						<div class="spend_item">
							<strong class="spend_name">김안과 의원</strong>
							<span class="spend_price"><em>1,250,500</em>원</span>
							<i class="icons AS20000010"></i>
						</div>
					</li>
					<li>
						<i class="ranking_label"><em>3</em>위</i>
						<div class="spend_item">
							<strong class="spend_name">관리비</strong>
							<span class="spend_price"><em>1,250,500</em>원</span>
							<i class="icons AS20000014"></i>
						</div>
					</li>
					<li>
						<i class="ranking_label"><em>4</em>위</i>
						<div class="spend_item">
							<strong class="spend_name">모임</strong>
							<span class="spend_price"><em>1,250,500</em>원</span>
							<i class="icons AS20000016"></i>
						</div>
					</li>
					<li>
						<i class="ranking_label"><em>5</em>위</i>
						<div class="spend_item">
							<strong class="spend_name">넷플릭스</strong>
							<span class="spend_price"><em>1,250,500</em>원</span>
							<i class="icons AS20000009"></i>
						</div>
					</li>
					<li>
						<i class="ranking_label"><em>6</em>위</i>
						<div class="spend_item">
							<strong class="spend_name">식당</strong>
							<span class="spend_price"><em>1,250,500</em>원</span>
							<i class="icons AS20000003"></i>
						</div>
					</li>
					<li>
						<i class="ranking_label"><em>7</em>위</i>
						<div class="spend_item">
							<strong class="spend_name">마켓</strong>
							<span class="spend_price"><em>1,250,500</em>원</span>
							<i class="icons AS20000005"></i>
						</div>
					</li>
					<li>
						<i class="ranking_label"><em>8</em>위</i>
						<div class="spend_item">
							<strong class="spend_name">현대쇼핑몰</strong>
							<span class="spend_price"><em>1,250,500</em>원</span>
							<i class="icons AS20000001"></i>
						</div>
					</li>
					<li>
						<i class="ranking_label"><em>9</em>위</i>
						<div class="spend_item">
							<strong class="spend_name">현대쇼핑몰</strong>
							<span class="spend_price"><em>1,250,500</em>원</span>
							<i class="icons AS20000001"></i>
						</div>
					</li>
					<li>
						<i class="ranking_label"><em>10</em>위</i>
						<div class="spend_item">
							<strong class="spend_name">현대쇼핑몰</strong>
							<span class="spend_price"><em>1,250,500</em>원</span>
							<i class="icons AS20000001"></i>
						</div>
					</li>
					-->
				</ol>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'

export default {
    name : "LCIP1008",
    data: () => {
        return {
			cusNb: '',              // 마이데이터고객번호
			basYm: '',            	// 조회 기준년월 YYYYMM

			mchtByAmtList: []
        }
    },
    computed : {
    },
    created() {
		this.cusNb = this.getUserInfo("mydtCusno")
		this.basYm = this.params.pBasYm
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
                url: '/lc/ip/08ra1', // 인터페이스ID: IF-MOB-PFM-LCA08, 서비스코드: PFMLCIP08RA1
                data: {
                    "mydtCusno" : this.cusNb,
                    "basYm" : this.basYm
                }
            }
            apiService.call(config).then(response =>{
				// console.log('response', JSON.parse(JSON.stringify(response)))				
				this.mchtByAmtList = response.mchtByAmtList || []
			})
		},
		getIconClass(xpsCtgrC) {
			return xpsCtgrC != 'AS29999999' ? xpsCtgrC : 'AS20000000'
		}
    },
    mixins: [
        commonMixin,
        popupMixin
    ]
}
</script>