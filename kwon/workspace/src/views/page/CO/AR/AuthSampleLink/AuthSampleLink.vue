<!--
/*************************************************************************

* !!!!!!!!!!!!!!!!!!!!!!!!!!!!! 임시화면
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>인증화면 샘플</h1>
		</div>
		<div class="popup_content com_no_bottom com_bg_type00">
			<div class="com_box_type01">
				<ul class="com_radio_type01">
					<li>
						<span class="btn_radio">
							<input type="radio" name="com_check" id="0" aria-hidden="true" @click.prevent="goPopup_sel()">
							<label for="0" aria-checked="false" role="radio">
								<span>
									COAR2003 (인증방법선택화면)
								</span>
							</label>
						</span>
					</li>
					<li>
						<span class="btn_radio">
							<input type="radio" name="com_check" id="3" aria-hidden="true" @click.prevent="goPopup('COAR2016', 'union')">
							<label for="3" aria-checked="false" role="radio">
								<span>
									COAR2006 (공동인증서선택)
								</span>
							</label>
						</span>
					</li>
					<li>
						<span class="btn_radio">
							<input type="radio" name="com_check" id="1" aria-hidden="true" @click.prevent="goPopup('COAR2019', 'indv')">
							<label for="1" aria-checked="false" role="radio">
								<span>
									COAR2019 (개별인증 - 개인(신용)정보 수집.이용 동의)
								</span>
							</label>
						</span>
					</li>
					<li>
						<span class="btn_radio">
							<input type="radio" name="com_check" id="2" aria-hidden="true" @click.prevent="goPopup('COAR2020', 'indv')">
							<label for="2" aria-checked="false" role="radio">
								<span>
									COAR2020 (개별인증 - 개인(신용)정보 제공 동의)
								</span>
							</label>
						</span>
					</li>
					<li>
						<span class="btn_radio">
							<input type="radio" name="com_check" id="4" aria-hidden="true" @click.prevent="goEvt()">
							<label for="4" aria-checked="false" role="radio">
								<span>
									COET1003 (부동산 이벤트 응모 화면)
								</span>
							</label>
						</span>
					</li>

					<li>
						<span class="btn_radio">
							<input type="radio" name="com_check" id="5" aria-hidden="true" @click.prevent="goSlide()">
							<label for="5" aria-checked="false" role="radio">
								<span>
									COCO1002 (계좌연결 슬라이드)
								</span>
							</label>
						</span>
					</li>
				</ul>
			</div>
		</div>
		<a href="javascript:void(0);" role="button" class="btn_close" @click="close(true)"><span class="blind">팝업닫기</span></a>		
		
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'

import apiService from '@/service/apiService'

import COAR2003 from '@/views/page/CO/AR/COAR2003/COAR2003.vue'
import COAR2006 from '@/views/page/CO/AR/COAR2006/COAR2006.vue'
import COAR2019 from '@/views/page/CO/AR/COAR2019/COAR2019.vue'
import COAR2020 from '@/views/page/CO/AR/COAR2020/COAR2020.vue'
import COET1003 from '@/views/page/CO/ET/COET1003/COET1003.vue'
import COCO1002 from '@/views/page/CO/CO/COCO1002/COCO1002'

export default {
    name : "AuthSampleLink",
    data: () => {
        return {
            indvSelList : []
        }
	},
    mounted() {
		this.initComponent()
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)     
    },
    mixins: [
		commonMixin,
        popupMixin
	],
	computed:{
	},
    methods: {
        initComponent() {
            this.getData();
        },
        getData() {
		},

		goPopup(dsc, type) {
			let compName = ""
			let param = {}

			if(type === 'indv') {	// 개별인증
				this.test_indv()
				param = {
					indvSelList : this.indvSelList
				}
			}

			if(dsc === 'COAR2006') {
				param = {
					localTestData : this.test_joint_get()
				}
			}

			switch(dsc) {
				case 'COAR2019' :
					compName = COAR2019
					break;
				case 'COAR2020' :
					compName = COAR2020
					break;
				case 'COAR2006' :
					compName = COAR2006
					break;
			}

			const config = {
				component: compName,
				params : param
			}
			modalService.openPopup(config).then(response => {
				console.log(response)
			})
		},

		goSlide() {
			const config = {
				renderer : {
					component : COCO1002
				}
			}
			modalService.openSlidePagePopup(config).then(() => {

			})
		},

		// 인증방법선택 팝업 오픈
		goPopup_sel() {
			this.test_indv()

			const config = {
				component : COAR2003,
				params : {
					moduleList : this.indvSelList
				}
			}
			modalService.openPopup(config)
		},

		// 부동산 이벤트 용 임시 연결
		goEvt() {
			const config = {
				component : COET1003,
				params : {}
			}
			modalService.openPopup(config)
		},

		test_indv() {
			//// test 데이터 ////
			this.indvSelList = [
				{// 은행
					adr:"(07237) 서울특별시 영등포구 의사당대로 13 국민은행 여의도전산센터",
					apiSvrDmnnm:"https://dev-api.mydata.kbstar.com:8443",
					colYn:"0",
					delYn:"0",
					infDpamnYn:"0",
					lschgDtm:"Mon Aug 01 10:24:56 KST 2022",
					lschgPgmnm:"SynPtlOrgJob",
					mydtOrgBzmnRgNo:"201-81-68693",
					mydtOrgCopno:"1101112365321",
					mydtOutsOrgDsc:"01",
					mydtRlyOrgC:"ZWAAEA0000",
					ofrAttcMethC:"03",
					orgBzrgC:"bank",
					orgC:"A1AAEO0000",
					orgnm:"주식회사 국민은행 (은행테스트)",
					scrnMrkYn:"1",
					tlsAtoaSriNo:"201-81-68693",
					trCseGblId:"20220801102454261952546631b45fa2"
				},
				{// 투자
					adr:"서울특별시 영등포구 여의나루로 4길 18 키움 상세주소",
					apiSvrDmnnm:"https://imsi.com:8443",
					colYn:"0",
					delYn:"0",
					infDpamnYn:"0",
					lschgDtm:"Mon Aug 01 10:24:56 KST 2022",
					lschgPgmnm:"SynPtlOrgJob",
					mydtOrgBzmnRgNo:"107-81-76756",
					mydtOrgCopno:"1101111867948",
					mydtOutsOrgDsc:"01",
					mydtRlyOrgC:"ZWAACP0000",
					ofrAttcMethC:"03",
					orgBzrgC:"invest",
					orgC:"C1AABR0000",
					orgnm:"키움증권 (투자테스트)",
					scrnMrkYn:"1",
					tlsAtoaSriNo:"-",
					trCseGblId:"20220801102454261952546631b45fa2"
				},
				{// 카드
					adr:"00서울특별시 종로구 종로1길 50, A동 (중학동, 더케이트윈타워)",
					apiSvrDmnnm:"http://temp.com",
					colYn:"0",
					delYn:"0",
					infDpamnYn:"1",
					lschgDtm:"Mon Aug 01 10:24:57 KST 2022",
					lschgPgmnm:"SynPtlOrgJob",
					mydtOrgBzmnRgNo:"101-86-79070",
					mydtOrgCopno:"1101115101839",
					mydtOutsOrgDsc:"01",
					mydtRlyOrgC:"ZWAAAA0000",
					ofrAttcMethC:"03",
					orgBzrgC:"card",
					orgC:"D1AAAH0000",
					orgnm:"주식회사 우리카드 (카드테스트)",
					scrnMrkYn:"1",
					tlsAtoaSriNo:"11",
					trCseGblId:"20220801102454261952546631b45fa2"
				},
				{// 보험
					adr:"(0000) 서울특별시 종로구 새문안로 68 흥국생명빌딩 0001",
					apiSvrDmnnm:"https://oapid.heungkuklife.co.kr",
					colYn:"0",
					delYn:"0",
					infDpamnYn:"1",
					lschgDtm:"Mon Aug 01 10:24:56 KST 2022",
					lschgPgmnm:"SynPtlOrgJob",
					mydtOrgBzmnRgNo:"104-81-18586",
					mydtOrgCopno:"1101110018443",
					mydtOutsOrgDsc:"01",
					mydtRlyOrgC:"ZWAAAA0000",
					ofrAttcMethC:"03",
					orgBzrgC:"insu",
					orgC:"B1AAAO0000",
					orgnm:"흥국생명보험주식회사 (보험테스트)",
					scrnMrkYn:"1",
					tlsAtoaSriNo:"110111-0018443",
					trCseGblId:"20220801102454261952546631b45fa2"
				},
				{// 전자금융
					adr:"경기도 성남시 분당구 판교로 264(삼평동)",
					apiSvrDmnnm:"https://mdsdev.skp-mydata.co.kr:443",
					colYn:"0",
					delYn:"0",
					infDpamnYn:"0",
					lschgDtm:"Mon Aug 01 10:24:57 KST 2022",
					lschgPgmnm:"SynPtlOrgJob",
					mydtOrgBzmnRgNo:"104-86-36968",
					mydtOrgCopno:"1101114699794",
					mydtOutsOrgDsc:"01",
					mydtRlyOrgC:"ZWAACP0000",
					ofrAttcMethC:"03",
					orgBzrgC:"efin",
					orgC:"E1AABE0000",
					orgnm:"에스케이 플래닛 (전금 테스트)",
					scrnMrkYn:"1",
					tlsAtoaSriNo:"110111-4699794",
					trCseGblId:"20220801102454261952546631b45fa2"
				},
				{// 할부금융
					adr:"서울특별시 종로구 새문안로3길 30(내수동) 00",
					apiSvrDmnnm:"https://test-mydata.kbcard.com",
					colYn:"0",
					delYn:"0",
					infDpamnYn:"0",
					lschgDtm:"Mon Aug 01 10:24:57 KST 2022",
					lschgPgmnm:"SynPtlOrgJob",
					mydtOrgBzmnRgNo:"101-86-61717",
					mydtOrgCopno:"1101114546523",
					mydtOutsOrgDsc:"01",
					mydtRlyOrgC:"ZWAAAA0000",
					ofrAttcMethC:"03",
					orgBzrgC:"capital",
					orgC:"D3AAAF0000",
					orgnm:"㈜KB국민카드 (할부 테스트)",
					scrnMrkYn:"1",
					tlsAtoaSriNo:"110111-4546523",
					trCseGblId:"20220801102454261952546631b45fa2"
				},
				// {// 보증보험
				// 	adr:"14520서울특별시 종로구 김상옥로 29 9층",
				// 	colYn:"0",
				// 	delYn:"0",
				// 	infDpamnYn:"1",
				// 	lschgDtm:"Mon Aug 01 10:24:56 KST 2022",
				// 	lschgPgmnm:"SynPtlOrgJob",
				// 	mydtOrgBzmnRgNo:"120-81-13002",
				// 	mydtOrgCopno:"1101110099774",
				// 	mydtOutsOrgDsc:"02",
				// 	mydtRlyOrgC:"ZWAAAA0000",
				// 	ofrAttcMethC:"01",
				// 	orgBzrgC:"ginsu",
				// 	orgC:"B4AADL0000",
				// 	orgnm:"[215]서울보증보험(주) (보증보험 테스트)",
				// 	scrnMrkYn:"1",
				// 	tlsAtoaSriNo:"1208113002",
				// 	trCseGblId:"20220801102454261952546631b45fa2"
				// },
				{// 통신
					// adr:"15045서울특별시 중구 청계천로 14 111",
					// colYn:"0",
					// delYn:"0",
					// infDpamnYn:"1",
					// lschgDtm:"Mon Aug 01 10:24:57 KST 2022",
					// lschgPgmnm:"SynPtlOrgJob",
					// mydtOrgBzmnRgNo:"101-81-45105",
					// mydtOrgCopno:"1101111549041",
					// mydtOutsOrgDsc:"02",
					// mydtRlyOrgC:"ZWAALV0000",
					// ofrAttcMethC:"01",
					// orgBzrgC:"telecom",
					// orgC:"F1AAAB0000",
					// orgnm:"케이디디아이코리아 (통신 테스트)",
					// scrnMrkYn:"1",
					// tlsAtoaSriNo:"1018145105",
					// trCseGblId:"20220801102454261952546631b45fa2"
					adr: "(07237) 서울특별시 영등포구 의사당대로 13 국민은행 여의도전산센터",
					apiSvrDmnnm: "https://dev-api.mydata.kbstar.com:8443",
					colYn: "0",
					delYn: "0",
					infDpamnYn: "0",
					lschgDtm: "Mon Aug 01 10:24:57 KST 2022",
					lschgPgmnm: "SynPtlOrgJob",
					mydtOrgBzmnRgNo: "201-81-68693",
					mydtOrgCopno: "1101112365321",
					mydtOutsOrgDsc: "01",
					mydtRlyOrgC: "ZWAAEA0000",
					ofrAttcMethC: "03",
					orgBzrgC: "telecom",
					orgC: "F1AAEO0000",
					orgnm: "주식회사 국민은행 (통신 테스트)",
					scrnMrkYn: "1",
					tlsAtoaSriNo: "201-81-68693",
					trCseGblId: "20220801102454261952546631b45fa2",
				}
			]
		},

		test_joint_get() {
			let tmp = {
				"rsp_code": "00000",
				"rsp_msg": "성공",
				"irp_cnt": 5,
				"irp_list": [
					{
						"prod_name": "개인형 IRP",
						"account_num": "0900026915311",
						"is_consent": "false",
						"org_code": "A1AABG0000",
						"org_biz_code": "bank",
						"scope": "bank.irp"
					},
					{
						"prod_name": "개인형IRP",
						"account_num": "15902012792310",
						"is_consent": "false",
						"org_code": "A1AAAD0000",
						"org_biz_code": "bank",
						"scope": "bank.irp"
					},
					{
						"prod_name": "개인형IRP",
						"account_num": "15934009032760",
						"is_consent": "false",
						"org_code": "A1AAAD0000",
						"org_biz_code": "bank",
						"scope": "bank.irp"
					},
					{
						"prod_name": "개인형IRP",
						"account_num": "15953001484312",
						"is_consent": "false",
						"org_code": "A1AAAD0000",
						"org_biz_code": "bank",
						"scope": "bank.irp"
					},
					{
						"prod_name": "퇴직연금 적립IRP",
						"account_num": "48803627394002",
						"is_consent": "false",
						"org_code": "A1AAEQ0000",
						"org_biz_code": "bank",
						"scope": "bank.irp"
					}
				],
				"bank_cnt": 14,
				"bank_list": [
					{
						"account_num": "3521686212043",
						"is_consent": "false",
						"seqno": "",
						"is_foreign_deposit": "false",
						"prod_name": "자립예탁금",
						"is_minus": "false",
						"account_type": "1001",
						"account_status": "01",
						"org_code": "A4AAAZ0000",
						"org_biz_code": "bank",
						"scope": "bank.deposit"
					},
					{
						"account_num": "0770000588193",
						"is_consent": "false",
						"seqno": "",
						"prod_name": "키움고배당에이스30증권자투자신탁제1호[채권혼합] Class C1",
						"account_type": "2001",
						"account_status": "01",
						"org_code": "A4AAAZ0000",
						"org_biz_code": "bank",
						"scope": "bank.invest"
					},
					{
						"account_num": "0770000588363",
						"is_consent": "false",
						"seqno": "",
						"prod_name": "키움장대트리플플러스증권투자신탁1호[채권혼합] Class C",
						"account_type": "2001",
						"account_status": "01",
						"org_code": "A4AAAZ0000",
						"org_biz_code": "bank",
						"scope": "bank.invest"
					},
					{
						"account_num": "0770000588403",
						"is_consent": "false",
						"seqno": "",
						"prod_name": "삼성당신을위한코리아대표그룹30증권투자신탁제1호[채권혼합] C",
						"account_type": "2001",
						"account_status": "01",
						"org_code": "A4AAAZ0000",
						"org_biz_code": "bank",
						"scope": "bank.invest"
					},
					{
						"account_num": "0770000659583",
						"is_consent": "false",
						"seqno": "",
						"prod_name": "NH-Amundi 개인MMF1호[국공채] Class C",
						"account_type": "2001",
						"account_status": "01",
						"org_code": "A4AAAZ0000",
						"org_biz_code": "bank",
						"scope": "bank.invest"
					},
					{
						"account_num": "0612108634833",
						"is_consent": "false",
						"seqno": "",
						"prod_name": "(가계일반)일반대출-가계자금",
						"account_type": "3220",
						"account_status": "01",
						"org_code": "A4AAAZ0000",
						"org_biz_code": "bank",
						"scope": "bank.loan"
					},
					{
						"account_num": "0610905567143",
						"is_consent": "false",
						"seqno": "",
						"prod_name": "(가계일반)일반대출-가계자금",
						"account_type": "3230",
						"account_status": "01",
						"org_code": "A4AAAZ0000",
						"org_biz_code": "bank",
						"scope": "bank.loan"
					},
					{
						"account_num": "3010205633911",
						"is_consent": "false",
						"seqno": "",
						"is_foreign_deposit": "false",
						"prod_name": "NH성공파트너통장",
						"is_minus": "true",
						"account_type": "1001",
						"account_status": "01",
						"org_code": "A1AABG0000",
						"org_biz_code": "bank",
						"scope": "bank.deposit bank.loan"
					},
					{
						"account_num": "3020458184411",
						"is_consent": "false",
						"seqno": "",
						"is_foreign_deposit": "false",
						"prod_name": "채움공직자우대통장",
						"is_minus": "false",
						"account_type": "1001",
						"account_status": "01",
						"org_code": "A1AABG0000",
						"org_biz_code": "bank",
						"scope": "bank.deposit"
					},
					{
						"account_num": "73002042154",
						"is_consent": "false",
						"seqno": "",
						"is_foreign_deposit": "false",
						"prod_name": "국민주통장",
						"is_minus": "false",
						"account_type": "1001",
						"account_status": "01",
						"org_code": "A1AABG0000",
						"org_biz_code": "bank",
						"scope": "bank.deposit"
					},
					{
						"account_num": "0280182899271",
						"is_consent": "false",
						"seqno": "",
						"is_foreign_deposit": "false",
						"prod_name": "NH All100플랜 연금저축펀드계좌",
						"is_minus": "false",
						"account_type": "2001",
						"account_status": "01",
						"org_code": "A1AABG0000",
						"org_biz_code": "bank",
						"scope": "bank.invest"
					},
					{
						"account_num": "0280267780541",
						"is_consent": "false",
						"seqno": "",
						"is_foreign_deposit": "false",
						"prod_name": "NH-Amundi코리아2배레버리지증권투자신탁[주식-파생형]ClassCe",
						"is_minus": "false",
						"account_type": "2001",
						"account_status": "01",
						"org_code": "A1AABG0000",
						"org_biz_code": "bank",
						"scope": "bank.invest"
					},
					{
						"account_num": "0280450302271",
						"is_consent": "false",
						"seqno": "",
						"is_foreign_deposit": "false",
						"prod_name": "한국투자중소밸류증권자투자신탁[주식]ClassC-e",
						"is_minus": "false",
						"account_type": "2001",
						"account_status": "01",
						"org_code": "A1AABG0000",
						"org_biz_code": "bank",
						"scope": "bank.invest"
					},
					{
						"account_num": "0114200785311",
						"is_consent": "false",
						"seqno": "",
						"is_foreign_deposit": "false",
						"prod_name": "(주택자금)중앙본부승인 단체대출-구입자금전환대출(당행)",
						"is_minus": "false",
						"account_type": "3290",
						"account_status": "01",
						"org_code": "A1AABG0000",
						"org_biz_code": "bank",
						"scope": "bank.loan"
					},
					// {
					// 	"account_num": "722100535010101",
					// 	"is_consent": "false",
					// 	"seqno": "0",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "주택구입자금(3년)",
					// 	"is_minus": "false",
					// 	"account_type": "3290",
					// 	"account_status": "01",
					// 	"org_code": "A1AAAD0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "721315531010101",
					// 	"is_consent": "false",
					// 	"seqno": "0",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "신탁(가계한도자금-자동대출)",
					// 	"is_minus": "true",
					// 	"account_type": "3210",
					// 	"account_status": "01",
					// 	"org_code": "A1AAAD0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "721110802010101",
					// 	"is_consent": "false",
					// 	"seqno": "0",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "신탁(가계한도자금-자동대출)",
					// 	"is_minus": "true",
					// 	"account_type": "3210",
					// 	"account_status": "01",
					// 	"org_code": "A1AAAD0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "622106090002501",
					// 	"is_consent": "false",
					// 	"seqno": "0",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "산은 예적금담보대출",
					// 	"is_minus": "true",
					// 	"account_type": "3200",
					// 	"account_status": "01",
					// 	"org_code": "A1AAAD0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "15144000846821",
					// 	"is_consent": "false",
					// 	"seqno": "0",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "개인연금신탁",
					// 	"is_minus": "false",
					// 	"account_type": "1003",
					// 	"account_status": "01",
					// 	"org_code": "A1AAAD0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "03292003132820",
					// 	"is_consent": "false",
					// 	"seqno": "0",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "데일리플러스 자유적금",
					// 	"is_minus": "false",
					// 	"account_type": "1003",
					// 	"account_status": "01",
					// 	"org_code": "A1AAAD0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "27475506476332",
					// 	"is_consent": "false",
					// 	"seqno": "0",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "KDBbond 온라인 산업금융채권",
					// 	"is_minus": "false",
					// 	"account_type": "1002",
					// 	"account_status": "01",
					// 	"org_code": "A1AAAD0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "02044013688821",
					// 	"is_consent": "false",
					// 	"seqno": "0",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "KDBdream 다모아 Account",
					// 	"is_minus": "false",
					// 	"account_type": "1001",
					// 	"account_status": "02",
					// 	"org_code": "A1AAAD0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "02044012365821",
					// 	"is_consent": "false",
					// 	"seqno": "0",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "KDBdream Account",
					// 	"is_minus": "false",
					// 	"account_type": "1001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAAD0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "02002433996310",
					// 	"is_consent": "false",
					// 	"seqno": "0",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "KDBdream 다모아 Account",
					// 	"is_minus": "false",
					// 	"account_type": "1001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAAD0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "02002250590310",
					// 	"is_consent": "false",
					// 	"seqno": "0",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "KDBdream 다모아 Account",
					// 	"is_minus": "true",
					// 	"account_type": "1001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAAD0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit bank.loan"
					// },
					// {
					// 	"account_num": "08204196802019",
					// 	"is_consent": "false",
					// 	"seqno": "0",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "저축예금(IBK급여통장)",
					// 	"is_minus": "false",
					// 	"account_type": "1001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAEQ0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "48803627301019",
					// 	"is_consent": "false",
					// 	"seqno": "0",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "보통예금",
					// 	"is_minus": "false",
					// 	"account_type": "1001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAEQ0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "48803627301026",
					// 	"is_consent": "false",
					// 	"seqno": "0",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "보통예금",
					// 	"is_minus": "false",
					// 	"account_type": "1001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAEQ0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "48803627301041",
					// 	"is_consent": "false",
					// 	"seqno": "0",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "보통예금",
					// 	"is_minus": "false",
					// 	"account_type": "1001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAEQ0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "67402465414001",
					// 	"is_consent": "false",
					// 	"seqno": "0",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "IBK D-day적금",
					// 	"is_minus": "false",
					// 	"account_type": "1003",
					// 	"account_status": "01",
					// 	"org_code": "A1AAEQ0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "67402465401012",
					// 	"is_consent": "false",
					// 	"seqno": "0",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "보통예금",
					// 	"is_minus": "true",
					// 	"account_type": "1001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAEQ0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit bank.loan"
					// },
					// {
					// 	"account_num": "16512408796001",
					// 	"is_consent": "false",
					// 	"seqno": "0",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "KTB글로벌4차산업1등주증권(주식)Ce",
					// 	"is_minus": "false",
					// 	"account_type": "2001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAEQ0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.invest"
					// },
					// {
					// 	"account_num": "6740246543200036",
					// 	"is_consent": "false",
					// 	"seqno": "0",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "IBK장기고정주택담보대출",
					// 	"is_minus": "false",
					// 	"account_type": "3220",
					// 	"account_status": "01",
					// 	"org_code": "A1AAEQ0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "511201026628",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "정기예금(직장인우대예금)",
					// 	"is_minus": "false",
					// 	"account_type": "1002",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHS0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "532111297899",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "true",
					// 	"prod_name": "외화보통예금(글로벌외화종합통장)",
					// 	"is_minus": "false",
					// 	"account_type": "1999",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHS0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "595119809878",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "유리글로벌거래소증권투자신탁1호(주식)A",
					// 	"is_minus": "false",
					// 	"account_type": "2001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHS0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.invest"
					// },
					// {
					// 	"account_num": "595119809996",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "유리글로벌거래소증권투자신탁1호(주식)A",
					// 	"is_minus": "false",
					// 	"account_type": "2001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHS0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.invest"
					// },
					// {
					// 	"account_num": "595119811401",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "DGB공모주플러스증권투자신탁1호(채권혼합)A",
					// 	"is_minus": "false",
					// 	"account_type": "2001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHS0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.invest"
					// },
					// {
					// 	"account_num": "595119811685",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "한국투자네비게이터증권투자신탁1호(주식)A",
					// 	"is_minus": "false",
					// 	"account_type": "2001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHS0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.invest"
					// },
					// {
					// 	"account_num": "595301000490",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "KB스타미국나스닥100인덱스증권자투자신탁(주식-파생형)C",
					// 	"is_minus": "false",
					// 	"account_type": "2001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHS0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.invest"
					// },
					// {
					// 	"account_num": "641130366997",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"prod_name": "일반자금대출(주택담보대출)",
					// 	"account_type": "3100",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHS0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "641130367025",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"prod_name": "일반자금대출(주택담보대출)",
					// 	"account_type": "3100",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHS0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "641130367032",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"prod_name": "일반자금대출(주택담보대출)",
					// 	"account_type": "3100",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHS0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "641130367049",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"prod_name": "기타가계일반자금대출",
					// 	"account_type": "3100",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHS0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "641992739618",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"prod_name": "기타가계일반자금대출",
					// 	"account_type": "3100",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHS0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "641992824858",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"prod_name": "직장인e로운대출",
					// 	"account_type": "3100",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHS0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "641992903470",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"prod_name": "DGB하이브리드모기지론",
					// 	"account_type": "3220",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHS0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "02602296631",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "샐러리맨리치예금(저축예금-어민사랑예금)",
					// 	"is_minus": "true",
					// 	"account_type": "1001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHX0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit bank.loan"
					// },
					// {
					// 	"account_num": "001028185327",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "자동이체우대통장(저축예금)",
					// 	"is_minus": "false",
					// 	"account_type": "1001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHX0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "102015697982",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "달려라-2030통장(저축예금)",
					// 	"is_minus": "false",
					// 	"account_type": "1001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHX0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "02603043890",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "스페셜플러스예금",
					// 	"is_minus": "false",
					// 	"account_type": "1001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHX0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "103004900968",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "Sh해우리패키지통장(스페셜플러스-해양수산인우대-예치기간별-전환)",
					// 	"is_minus": "true",
					// 	"account_type": "1001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHX0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit bank.loan"
					// },
					// {
					// 	"account_num": "103006157902",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "Sh내가만든통장(스페셜플러스예금)",
					// 	"is_minus": "false",
					// 	"account_type": "1001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHX0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "180000470322",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "true",
					// 	"prod_name": "Sh외화레인지예금",
					// 	"is_minus": "false",
					// 	"account_type": "1001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHX0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "120014699621",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "주택청약예금",
					// 	"is_minus": "false",
					// 	"account_type": "1002",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHX0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "120047075595",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "헤이(Hey)정기예금",
					// 	"is_minus": "false",
					// 	"account_type": "1002",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHX0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "140008621011",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "Sh보고싶다!명태야적금2(정액적립식-개인)",
					// 	"is_minus": "false",
					// 	"account_type": "1003",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHX0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "140009510191",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "더플러스정액적금",
					// 	"is_minus": "false",
					// 	"account_type": "1003",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHX0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "141013781070",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "Sh월복리자유적금",
					// 	"is_minus": "false",
					// 	"account_type": "1003",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHX0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "190001811207",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"prod_name": "한국밸류10년투자증권투자신탁1호(주식)C",
					// 	"account_type": "2001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHX0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.invest"
					// },
					// {
					// 	"account_num": "190001817535",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"prod_name": "신영밸류고배당증권투자신탁(주식)C",
					// 	"account_type": "2001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHX0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.invest"
					// },
					// {
					// 	"account_num": "190002526878",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"prod_name": "신영 밸류우선주 증권자투자신탁(주식)Ce형",
					// 	"account_type": "2001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHX0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.invest"
					// },
					// {
					// 	"account_num": "190002526882",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"prod_name": "NH-Amundi 1.5배레버리지인덱스증권[주식-파생형]Ce",
					// 	"account_type": "2001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHX0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.invest"
					// },
					// {
					// 	"account_num": "190002684225",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"prod_name": "NH-Amundi 1.5배레버리지인덱스증권[주식-파생형]Ce",
					// 	"account_type": "2001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHX0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.invest"
					// },
					// {
					// 	"account_num": "190002716946",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"prod_name": "한국투자베트남그로스증권자[주식]C-e",
					// 	"account_type": "2001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAHX0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.invest"
					// },
					// {
					// 	"account_num": "100164447909",
					// 	"is_consent": "false",
					// 	"seqno": "0",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "듀얼K  입출금통장",
					// 	"is_minus": "false",
					// 	"account_type": "1001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAJB0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "110217597998",
					// 	"is_consent": "false",
					// 	"seqno": "0",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "코드K자유적금",
					// 	"is_minus": "false",
					// 	"account_type": "1003",
					// 	"account_status": "01",
					// 	"org_code": "A1AAJB0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "120145337971",
					// 	"is_consent": "false",
					// 	"seqno": "0",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "코드K정기예금",
					// 	"is_minus": "false",
					// 	"account_type": "1002",
					// 	"account_status": "01",
					// 	"org_code": "A1AAJB0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "451120011977",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "자립예탁금",
					// 	"is_minus": "false",
					// 	"account_type": "1001",
					// 	"account_status": "01",
					// 	"org_code": "A4AAGC0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "451310233889",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "정기예탁금",
					// 	"is_minus": "false",
					// 	"account_type": "1002",
					// 	"account_status": "01",
					// 	"org_code": "A4AAGC0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "451210023257",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "정기적금",
					// 	"is_minus": "false",
					// 	"account_type": "1003",
					// 	"account_status": "01",
					// 	"org_code": "A4AAGC0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "120730016967",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "일반대출",
					// 	"account_type": "3100",
					// 	"account_status": "01",
					// 	"org_code": "A4AAGC0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "120730016986",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "일반대출",
					// 	"account_type": "3100",
					// 	"account_status": "01",
					// 	"org_code": "A4AAGC0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "120730016999",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "일반대출",
					// 	"account_type": "3100",
					// 	"account_status": "01",
					// 	"org_code": "A4AAGC0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "120710025609",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "정기예탁금범위내대출(개인)",
					// 	"account_type": "3200",
					// 	"account_status": "01",
					// 	"org_code": "A4AAGC0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "401730011455",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "일반대출",
					// 	"account_type": "3220",
					// 	"account_status": "01",
					// 	"org_code": "A4AAGC0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "301730013833",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "일반대출",
					// 	"account_type": "3230",
					// 	"account_status": "01",
					// 	"org_code": "A4AAGC0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "401730009004",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "일반대출",
					// 	"account_type": "3230",
					// 	"account_status": "01",
					// 	"org_code": "A4AAGC0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "401730015041",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "일반대출",
					// 	"account_type": "3230",
					// 	"account_status": "01",
					// 	"org_code": "A4AAGC0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "401730019996",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "일반대출",
					// 	"account_type": "3230",
					// 	"account_status": "01",
					// 	"org_code": "A4AAGC0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "301730015598",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "일반대출",
					// 	"account_type": "3240",
					// 	"account_status": "01",
					// 	"org_code": "A4AAGC0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "301730019649",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "일반대출(서민금융-전자보증)",
					// 	"account_type": "3240",
					// 	"account_status": "01",
					// 	"org_code": "A4AAGC0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "401540001215",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "농특회계융자금(여신)",
					// 	"account_type": "3240",
					// 	"account_status": "01",
					// 	"org_code": "A4AAGC0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "2010102010000421",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "2010년 1학기 취업후상환학자금_등록금",
					// 	"account_type": "3150",
					// 	"account_status": "01",
					// 	"org_code": "A1AAOV0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "2010201010042838",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "2010년 2학기 일반상환학자금_등록금",
					// 	"account_type": "3150",
					// 	"account_status": "01",
					// 	"org_code": "A1AAOV0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "2012101010660729",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "2012년 1학기 일반상환학자금_등록금",
					// 	"account_type": "3150",
					// 	"account_status": "01",
					// 	"org_code": "A1AAOV0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "100030131294",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "토스뱅크 통장",
					// 	"is_minus": "false",
					// 	"account_type": "1001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAPF0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit"
					// },
					// {
					// 	"account_num": "100030180641",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "토스뱅크 통장",
					// 	"is_minus": "true",
					// 	"account_type": "1001",
					// 	"account_status": "01",
					// 	"org_code": "A1AAPF0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.deposit bank.loan"
					// },
					// {
					// 	"account_num": "800000014886",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "신용대출",
					// 	"is_minus": "false",
					// 	"account_type": "3100",
					// 	"account_status": "01",
					// 	"org_code": "A1AAPF0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "800000101801",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "신용대출",
					// 	"is_minus": "false",
					// 	"account_type": "3100",
					// 	"account_status": "01",
					// 	"org_code": "A1AAPF0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// },
					// {
					// 	"account_num": "800000103723",
					// 	"is_consent": "false",
					// 	"seqno": "",
					// 	"is_foreign_deposit": "false",
					// 	"prod_name": "신용대출",
					// 	"is_minus": "false",
					// 	"account_type": "3100",
					// 	"account_status": "01",
					// 	"org_code": "A1AAPF0000",
					// 	"org_biz_code": "bank",
					// 	"scope": "bank.loan"
					// }
				],
				"card_cnt": 3,
				"card_list": [
					{
						"card_id": "1234561234561234",
						"card_num": "test_card_1",
						"is_consent": "false",
						"card_name": "테스트카드1",
						"card_member": "",
						"card_type": "",
						"org_code": "D1AAAF0000",
						"org_biz_code": "card",
						"scope": "card.card"
					},
					{
						"card_id": "0987650987650987",
						"card_num": "test_card_2",
						"is_consent": "false",
						"card_name": "테스트카드2",
						"card_member": "",
						"card_type": "",
						"org_code": "D1AAAH0000",
						"org_biz_code": "card",
						"scope": "card.card"
					},
					{
						"card_id": "1010101010101010",
						"card_num": "test_card_3",
						"is_consent": "false",
						"card_name": "테스트카드3",
						"card_member": "",
						"card_type": "",
						"org_code": "D1AAAH0000",
						"org_biz_code": "card",
						"scope": "card.card"
					},
				],
				"invest_cnt": 1,
				"invest_list": [
					{
						"account_num": "123412341234",
						"account_name": "테스트증권1",
						"org_code": "C1AABQ0000",
						"org_biz_code": "invest"
					}
				],
				"isr_cnt": 1,
				"isr_list": [
					{
						"insu_num": "101010101010",
						"prod_name": "테스트보험1",
						"org_code": "B1AAAI0000",
						"org_biz_code": "insu"
					}
				],
				"isr_loan_cnt": 0,
				"isr_loan_list": [

				],
				"efin_ppy_cnt": 0,
				"efin_ppy_list": [

				],
				"efin_acc_cnt": 0,
				"efin_acc_list": [

				],
				"capital_cnt": 0,
				"capital_list": [

				],
				"gi_cnt": 0,
				"gi_list": [

				],
				"telecom_cnt": 0,
				"telecom_list": [

				],
				"bond_cnt": 0,
				"bond_list": [

				],
				"prepaid_cnt": 0,
				"prepaid_list": [

				],
				"p2p_cnt": 0,
				"p2p_list": [

				],
				"success_cnt": 8,
				"success_org_list": [
					{
						"org_code": "A4AAAZ0000",
						"org_name": "농업협동조합중앙회"
					},
					{
						"org_code": "A1AABG0000",
						"org_name": "농협은행 주식회사"
					},
					{
						"org_code": "A1AAAD0000",
						"org_name": "한국산업은행"
					},
					{
						"org_code": "A1AAEQ0000",
						"org_name": "중소기업은행"
					},
					// {
					// 	"org_code": "A1AAHS0000",
					// 	"org_name": "㈜대구은행"
					// },
					// {
					// 	"org_code": "A1AAHX0000",
					// 	"org_name": "수협은행"
					// },
					// {
					// 	"org_code": "A1AAJB0000",
					// 	"org_name": "주식회사 케이뱅크은행"
					// },
					// {
					// 	"org_code": "A4AAGC0000",
					// 	"org_name": "산림조합중앙회"
					// },
					// {
					// 	"org_code": "A1AAOV0000",
					// 	"org_name": "한국장학재단"
					// },
					// {
					// 	"org_code": "A1AAPF0000",
					// 	"org_name": "토스뱅크 주식회사"
					// },
					//// 여기부터 임의 데이터
					{
						"org_code": "D1AAAF0000",
						"org_name": "㈜KB국민카드"
					},
					{
						"org_code": "D1AAAH0000",
						"org_name": "주식회사 우리카드"
					},
					{
						"org_code": "C1AABQ0000",
						"org_name": "이베스트투자증권"
					},
					{
						"org_code": "B1AAAI0000",
						"org_name": "교보생명보험"
					}
				]
			}

			return tmp
		}
    },
    components : {
    }
}


</script>