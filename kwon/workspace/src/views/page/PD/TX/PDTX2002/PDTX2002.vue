<!--
/*************************************************************************
* @ 서비스경로 : 금융통통 > 세금현황 > 국세
* @ 페이지설명 : 
* @ 파일명     : src\views\page\PD\TX\PDTX2002\PDTX2002.vue
* @ 작성자     : CS533541
* @ 작성일     : 2023-08-21
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-21              CS533541              최초작성
*************************************************************************/
-->
<template>
	<div id="tab_02" role="tabpanel" class="cmm-tab-pane on">
		<div v-show="prtoDsc =='15'" class="com_box_type01 toggle_list_box2 custom_list">
			<div data-ui-toggle="box" class="toggle_box_area open">
				<button type="button" class="view_btn" aria-expanded="true">
					<div class="new_tit_area">
						<div class="tit"><span>국세 납세증명</span></div>
						<span class="badge_2023 soft_navy">유예</span>
					</div>
					<em class="open">열기</em>
					<em class="close">닫기</em>
				</button>
			</div>
			<div class="view_cont">
				<ul class="tax_list">
					<li v-for="(item, index) in lctxList" :key="index">

						<dl>
							<dt>유예종류</dt>
							<dd>{{item.ptxCtfPponKdnm}}</dd>
						</dl>
						<dl>
							<dt>유예기간</dt>
							<dd class="num"> {{item.pponPrdnm}}</dd>
						</dl>
						<dl>
							<dt>과세연도</dt>
							<dd class="num">{{item.txtYy}}</dd>
						</dl>
						<dl>
							<dt>세목</dt>
							<dd>{{item.dtlsnm}}</dd>
						</dl>
						<dl>
							<dt>세액</dt>
							<dd><em class="num">{{item.ptxCtfTxa | numberFilter}}</em>원</dd>
						</dl>	
						<dl>
							<dt>가산금</dt>
							<dd><em class="num">{{item.addamAm}}</em>원</dd>
						</dl>	
						<dl>
							<dt>납부기한</dt>
							<dd class="num">{{item.payTerNm | dateFilter('YYYY.MM.DD')}}</dd>
						</dl>	
					</li>
				</ul>
			</div>
		</div>

		<div v-show="prtoDsc =='12'" class="com_box_type01 toggle_list_box2 custom_list">
			<div data-ui-toggle="box" class="toggle_box_area open">
				<button type="button" class="view_btn" aria-expanded="true">
					<div class="new_tit_area">
						<div class="tit"><span>국세 납세증명</span></div>
						<span class="badge_2023 soft_mint">정상</span>
					</div>
					<em class="open">열기</em>
					<em class="close">닫기</em>
				</button>
			</div>
			<div class="view_cont">
				<div class="nodata_small">
					<div class="nodata_list">
						<p class="txt_sub">체납된 세금이 없어요.</p>
					</div>
				</div>
			</div>
		</div>

		<div v-show="prtoDsc =='99'" class="com_box_type01 toggle_list_box2 custom_list">
			<div data-ui-toggle="box" class="toggle_box_area open">
				<button type="button" class="view_btn" aria-expanded="true">
					<div class="new_tit_area">
						<div class="tit"><span>국세 납세증명</span></div>
						<span class="badge_2023 soft_red">체납</span>
					</div>
					<em class="open">열기</em>
					<em class="close">닫기</em>
				</button>
			</div>
			<div class="view_cont">
				<div class="nodata_small">
					<div class="nodata_list">
						<p class="txt_sub">체납 중인 세금이 있어요.</p>
					</div>
				</div>

				<div class="tax_more_btn">
					<a href="javascript:void(0);" @click.prevent="openWebBrowser('https://mob.hometax.go.kr')" role="button" class="com_btn_more">체납세금 확인</a>
					<!-- https://mob.hometax.go.kr  -->
				</div>
			</div>
		</div>

		<div v-show="prtoDsc =='14'" class="com_box_type01 toggle_list_box2 custom_list">
			<div data-ui-toggle="box" class="toggle_box_area open">
				<button type="button" class="view_btn" aria-expanded="true">
					<div class="new_tit_area">
						<div class="tit"><span>국세 납세증명</span></div>
					</div>
					<em class="open">열기</em>
					<em class="close">닫기</em>
				</button>
			</div>
			<div class="view_cont">
				<div class="nodata_small">
					<div class="nodata_list">
						<p class="txt_sub">납부한 세금이 없어요.</p>
					</div>
				</div>
			</div>
		</div>

		<div v-show="prtoDsc =='13'" class="com_box_type01 toggle_list_box2 custom_list">
			<div data-ui-toggle="box" class="toggle_box_area open">
				<button type="button" class="view_btn" aria-expanded="true">
					<div class="new_tit_area">
						<div class="tit"><span>국세 납세증명</span></div>
					</div>
					<em class="open">열기</em>
					<em class="close">닫기</em>
				</button>
			</div>
			<div class="view_cont">
				<div class="nodata_small">
					<div class="nodata_list">
						<p class="txt_sub">납세 정보를 가져올 수 없어요.</p>
					</div>
				</div>
			</div>
		</div>

		<div v-if="prtoDscFt == 'Y'"   class="com_box_type01 toggle_list_box2 custom_list">
			<div data-ui-toggle="box" class="toggle_box_area open">
				<button type="button" class="view_btn" aria-expanded="true">
					<div class="new_tit_area">
						<div class="tit"><span>납세사실증명</span></div>
					</div>
					<em class="open">열기</em>
					<em class="close">닫기</em>
				</button>
			</div>
			<div class="view_cont">
				<ul class="tax_list">
					<li v-for="(item, index) in lctxFtList" :key="index">
						<dl>
							<dt>귀속년도</dt>
							<dd class="num">{{item.rvrsYy}}</dd>
						</dl>
						<dl>
							<dt>납부일자</dt>
							<dd class="num">{{item.paydtVal}}</dd>
						</dl>
						<dl>
							<dt>세목</dt>
							<dd>{{item.dtlsnm}}</dd>
						</dl>
						<dl>
							<dt>세액합계</dt>
							<dd><em class="num">{{item.ttAm | numberFilter}}</em>원</dd>
						</dl>	
						<dl>
							<dt>내국세</dt>
							<dd><em class="num">{{item.ittx | numberFilter}}</em>원</dd>
						</dl>	
						<dl>
							<dt>교육방위세</dt>
							<dd><em class="num">{{item.eduDtx | numberFilter}}</em>원</dd>
						</dl>	
						<dl>
							<dt>농어촌특별세</dt>
							<dd><em class="num">{{item.fafvSptx | numberFilter}}</em>원</dd>
						</dl>	
						<dl>
							<dt>가산금</dt>
							<dd><em class="num">{{item.addamAm | numberFilter}}</em>원</dd>
						</dl>	
					</li>
				</ul>
			</div>
		</div>

		<div v-else class="com_box_type01 toggle_list_box2 custom_list">
			<div data-ui-toggle="box" class="toggle_box_area open">
				<button type="button" class="view_btn" aria-expanded="true">
					<div class="new_tit_area">
						<div class="tit"><span>납세사실증명</span></div>
					</div>
					<em class="open">열기</em>
					<em class="close">닫기</em>
				</button>
			</div>
			<div class="view_cont">
				<div class="nodata_small">
					<div class="nodata_list">
						<p class="txt_sub">납부한 세금이 없어요.</p>
					</div>
				</div>
			</div>
		</div>

		<div class="new_add_register">
			<a href="javascript:void(0);" role="button" @click="fn_openPopup()"><span>더 확인할 세금이 있나요?</span></a>
		</div>
	</div>
</template>

<script>
/*eslint-disable */
import COAR2002 from '@/views/page/CO/AR/COAR2002/COAR2002'
import commonService from '@/service/commonService'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import {dateFormat} from '@/utils/date'

export default {
	data: () => {
		return {

			prtoDsc	  : "",	//납세증명 조건값에 따른 레이아웃 출력여부 변수
			prtoDscFt : "N",	//납세사실증명 조건값에 따른 레이아웃 출력여부 변수
			lctxList  : [], // 납세증명 목록
			lctxFtList: [] // 납세사실증명 목록
		}
	},
	computed: {

	},
	mounted() {
		this.init()
	},
	methods: {
		init() {
			const config = {
                url: '/pd/tx/02r01', // PFMPDTX02R01, IF-MOB-PFM-PDTX02R01
                data: {
                    "mydtCusno" : this.getUserInfo('mydtCusno'),
                }
            };
            apiService.call(config).then(response => {
				console.log('PDTX2002 response ### ', response)
				this.lctxList 	= response.lctxList // 납세증명
				this.lctxFtList = response.lctxFtList // 납세사실증명
				
				if(response.lctxList!= undefined){

					if( response.lctxList.length > 0){

						let sIsuVldPrdPrcrztC = response.lctxList[0].isuVldPrdPrcrztC; //발급유효기간처리결과코드
						let sDtlsnm = response.lctxList[0].dtlsnm; 					  //세목명
						console.log('PDTX2002 sIsuVldPrdPrcrztC ### ', sIsuVldPrdPrcrztC) 
						console.log('PDTX2002 sDtlsnm ### ', sDtlsnm) 

						if(sIsuVldPrdPrcrztC == '15' && sDtlsnm != '' && sDtlsnm !=undefined){// 유예	
							this.prtoDsc = '15';
						}else if(sIsuVldPrdPrcrztC == '15' && sDtlsnm == undefined){ //체납
							this.prtoDsc = '99';	
						}else if(sIsuVldPrdPrcrztC == '12' && sDtlsnm == undefined){
							this.prtoDsc = '12';		

						}else if(sIsuVldPrdPrcrztC == '13'){
							this.prtoDsc = '13';		
						}else{
							this.prtoDsc = '14';		
						}
					}
				}

				if(response.lctxFtList!= undefined){

					if( response.lctxFtList.length > 0){
						this.prtoDscFt = "Y";
					}
				}
				console.log('PDTX2002 prtoDsc ### ', this.prtoDsc) 

				this.$emit('getNatxPrtoDsc ', this.prtoDsc)

			})
		},

		fn_openPopup() {

			let compName = COAR2002;
			let param    = { isExternal : true , orgDsc : 'public'}

			let config = {
				component : compName,
				params : param
			}
			modalService.openPopup(config).then(response => {
				console.log('response', response)
			})
		},
		/**
		 * 외부 브라우저 열기
		 */
		openWebBrowser(url) {
			if (this.getUserInfo('chnl') === '385') {
				appService.executeBrowser(url);
			} else {
				appService.cokBankOpenPopupWebBrowser(url);
			}
		},

	},
	mixins: [
        commonMixin,
    ],
}
</script>
