<!--
/*************************************************************************
* @ 서비스경로 : 금융통통 > 세금현황 > 지방세
* @ 페이지설명 : 
* @ 파일명     : src\views\page\PD\TX\PDTX2001\PDTX2001.vue
* @ 작성자     : CS533541
* @ 작성일     : 2023-08-22
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-22              CS533541              최초작성
*************************************************************************/
-->
<template>
	<div id="tab_01" role="tabpanel" class="cmm-tab-panel on"> 
		<!-- 체납 -->
		<div v-if="isLcTaxDlq" class="com_box_type01 toggle_list_box2 custom_list">
			<div data-ui-toggle="box" class="toggle_box_area open">
				<button type="button" class="view_btn" aria-expanded="true">
					<div class="new_tit_area">
						<div class="tit"><span>지방세 납세증명</span></div>
						<span class="badge_2023 soft_red">체납</span>
					</div>
					<em class="open">열기</em>
					<em class="close">닫기</em>
				</button>
			</div>
			<div class="view_cont">
				<ul class="tax_list">
					<li v-for="(item, index) in showLctxList" :key="`${item.ctfwKdC}_${index}`">
						<dl>
							<dt>과세연월</dt>
							<dd class="num">{{ item.txtYm | dateFilter('YYYY.MM') }}</dd>
						</dl>
						<dl>
							<dt>체납세목</dt>
							<dd>{{ item.dqlDtlsnm }}</dd>
						</dl>
						<dl>
							<dt>체납금액</dt>
							<dd><em class="num">{{ item.dlqAm | numberFilter }}</em>원</dd>
						</dl>	
					</li>
				</ul>
			</div>
		</div>

		<div v-else class="com_box_type01 toggle_list_box2 custom_list">
			<div data-ui-toggle="box" class="toggle_box_area open">
				<button type="button" class="view_btn" aria-expanded="true">
					<div class="new_tit_area">
						<div class="tit"><span>지방세 납세증명</span></div>
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

		<!-- gptxList 재산세 -->
		<div v-if="gptxList.length > 0" class="com_box_type01 toggle_list_box2 custom_list">
			<div data-ui-toggle="box" class="toggle_box_area open">
				<button type="button" class="view_btn" aria-expanded="true">
					<div class="new_tit_area">
						<div class="tit"><span>세목별 납세증명(재산세)</span></div>
					</div>
					<em class="open">열기</em>
					<em class="close">닫기</em>
				</button>
			</div>
			<div class="view_cont">
				<ul class="tax_list">
					<li v-for="(item, index) in gptxList" :key="`${item.ctfwKdC}_${index}`">
						<dl>
							<dt>납세기관</dt>
							<dd> {{ fn_getCodeNm(item) }}</dd>
						</dl>
						<dl>
							<dt>과세연월</dt>
							<dd class="num">{{ item.txtYm | dateFilter('YYYY.MM') }}</dd>
						</dl>
						<dl>
							<dt>세목</dt>
							<dd>{{ item.dtlsnm }}</dd>
						</dl>
						<dl>
							<dt>기분</dt>
							<dd>{{ item.txtFqVal }}</dd>
						</dl>
						<dl>
							<dt>세액</dt>
							<dd><em class="num">{{ item.gptxAm | numberFilter }}</em>원</dd>
						</dl>	
						<dl>
							<dt>가산세액</dt>
							<dd><em class="num">{{ item.adAm }}</em>원</dd>
						</dl>	
						<dl>
							<dt>상태</dt>
							<dd>{{ item.stsMknm }}</dd>
						</dl>
						<dl>
							<dt>과세대상</dt>
							<dd>{{ item.txtObjnm }}</dd>
						</dl>
					</li>
				</ul>

				<div class="tax_more_btn">
					<a href="javascript:void(0);" role="button" class="com_btn_more" @click="fn_moveJoinPop()">납세 기관 추가</a>
				</div>
			</div>
		</div>

		<div v-else class="com_box_type01 toggle_list_box2 custom_list">
			<div data-ui-toggle="box" class="toggle_box_area open">
				<button type="button" class="view_btn" aria-expanded="true">
					<div class="new_tit_area">
						<div class="tit"><span>세목별 납세증명(재산세)</span></div>
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

				<div class="tax_more_btn">
					<a href="javascript:void(0);" role="button" class="com_btn_more" @click="fn_moveJoinPop()">납세 기관 추가</a>
				</div>
			</div>
		</div>

		<!-- 자동차세 목록 -->
		<div v-if="carList.length > 0" class="com_box_type01 toggle_list_box2 custom_list">
			<div data-ui-toggle="box" class="toggle_box_area open">
				<button type="button" class="view_btn" aria-expanded="true">
					<div class="new_tit_area">
						<div class="tit"><span>세목별 납세증명(자동차세)</span></div>
						<span class="badge_2023 soft_red">체납</span>
					</div>
					<em class="open">열기</em>
					<em class="close">닫기</em>
				</button>
			</div>
			<div class="view_cont">
				<ul class="tax_list">
					<li v-for="(item, index) in carList" :key="`${item.ctfwKdC}_${index}`">
						<dl>
							<dt>과세연월</dt>
							<dd class="num">{{ item.txtYm | dateFilter('YYYY.MM') }}</dd>
						</dl>
						<dl>
							<dt>차량번호</dt>
							<dd class="num">{{ item.vhcno }}</dd>
						</dl>
						<dl>
							<dt>체납세목</dt>
							<dd>{{ item.dqlDtlsnm }}</dd>
						</dl>
						<dl>
							<dt>체납금액</dt>
							<dd><em class="num">{{ item.dlqAm | numberFilter }}</em>원</dd>
						</dl>	
					</li>
				</ul>
			</div>
		</div>

		<div v-else class="com_box_type01 toggle_list_box2 custom_list">
			<div data-ui-toggle="box" class="toggle_box_area open">
				<button type="button" class="view_btn" aria-expanded="true">
					<div class="new_tit_area">
						<div class="tit"><span>세목별 납세증명(자동차세)</span></div>
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
import COAR2005 from '@/views/page/CO/AR/COAR2005/COAR2005'

export default {
	data: () => {
		return {

			carList: [], // 자동차세 목록
			gptxList: [], // 재산세 목록
			lctxList: [], // 납세증명 목록

			codeList: [], // 공통코드 목록
			//stsMknm : "" //재산세 상태표시명
		}
	},
	computed: {
		// 체납 여부
		isLcTaxDlq() {
			let LcTaxDlqList = this.lctxList.filter(el => el.dlqAm > 0)
			console.log('LcTaxDlqList ## ', LcTaxDlqList)
			return LcTaxDlqList.length > 0
		},
		showLctxList() {
			return this.lctxList.filter(el => el.dlqAm > 0)
		}
	},
	mounted() {
		this.init()
		this.codeList = this.getCodeList("RP_SFGV_GRU_C");
	},
	methods: {
		init() {
			const config = {
                url: '/pd/tx/01r01', // PFMPDTX01R01, IF-MOB-PFM-PDTX01R01
                data: {
                    "mydtCusno" : this.getUserInfo('mydtCusno')
                }
            };
            apiService.call(config).then(response => {
				console.log('PDTX2004 response ### ', response)
				this.carList = response.carList
				this.gptxList = response.gptxList
				this.lctxList = response.lctxList

				//this.stsMknm = response.gptxList[0]?.stsMknm?.trim() || '';

				this.$emit('getLctxList', this.lctxList)
			})
		},
		fn_openPopup() {

			let compName = COAR2002;
			let param    = { isExternal : true , orgDsc : 'public'}

			let config = {
				component : compName,
				params : param
			}
			// const config_info = {
			// 	component : '',
			// }
			//if (pageId === 'COAR2003') {
			//	config_info.component = COAR2003
			//}
			// if (pageId === 'COAR2002') {
			// 	config_info.component = COAR2002
			// }
			modalService.openPopup(config).then(response => {
				console.log('response', response)
			})
		},

		fn_moveJoinPop() {

			let compName = COAR2005;

			let param = {}
			let moduleParam = {}
			let moduleList  = []
			
			moduleParam.orgC		= "PBAAVL0000"
			moduleParam.orgBzrgC	= "public"
			moduleParam.orgnm		= "행정안전부"
			moduleList.push(moduleParam)
			
			param.moduleList = moduleList
			param.isOnlyPublic = true

            const config = {
                component: compName,
                params : param
			}
			console.log(config)
			modalService.openPopup(config).then(() => {});
			
		},
		// 공통코드 코드명 조회
		fn_getCodeNm(item) {
			return this.codeList.find(code => item.rpSfgvGruC === code.comnCVal)?.comnCExpl || ''
		},
	},
	mixins: [
        commonMixin,
    ],
}
</script>