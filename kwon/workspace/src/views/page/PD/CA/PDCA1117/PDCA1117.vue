<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 차계부
* @ 페이지설명 : 금융과생활 > 차계부 > 지출내역조회
* @ 파일명     : src\views\page\PD\CA\PDCA1117\PDCA1117.vue
* @ 작성자     : CS516029
* @ 작성일     : 2021-09-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-09-10              CS516029                 최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>지출내역 조회</h1>
		</div>

        <div class="popup_content com_bg_type00 com_no_bottom">
			<div class="com_inner com_line_type01 com_inputarea_type07">
				<div class="com_btnselectbox_type01">
					<em>조회기간</em>
					<button type="button" class="com_btnselect_type01" @click.prevent="fn_openPeriodPop()" title="조회기간 선택"><span>{{inqStDt}} ~ {{inqEdDt}}</span></button>
				</div>
                <div class="com_btnselectbox_type01 new_mb25">
					<em>결제수단</em>
					<button type="button" class="com_btnselect_type01" @click.prevent="fn_openStlMnsDscPop" title="결제수단 선택"><span>{{stlMnsDsc == '' || stlMnsDsc == '9' ? '전체' : stlMnsDsNm}}</span></button>
				</div>
				<div class="com_input_type02">
					<label for="PDCA1117_txt01"></label>
					<input type="search" id="PDCA1117_txt01" :value="PDCA1117_srchKwrd" ref="PDCA1117_srchKwrd" @keyup="fn_checkWord($event, 40)" @keyup.enter="fn_search()" @keyup.delete="fn_infoClear()" placeholder="가맹점명 또는 별칭을 검색하세요." title="가맹점명 또는 별칭을 검색하세요.">
					<a v-show="PDCA1117_srchKwrd.length > 0" @click.prevent="fn_del('PDCA1117_srchKwrd')" class="com_btn_delete" href="javascript:void(0);"><span class="blind">삭제</span></a>
					<a @click.prevent="fn_search" class="com_btn_search" href="javascript:void(0);"><span class="blind">검색</span></a>
				</div>
			</div>

			<template v-if="xpsBrkList.length > 0">
				<div class="com_inner com_box_list01">
					<ul class="list_type_01 list_type_etc">
						<li v-for="(xpsBrkInfo, idx) in xpsBrkList" :key="idx">
							<a @click.prevent="fn_returnXpsBrkInfo(xpsBrkInfo)" href="javascript:void(0);">
								<dl>
									<dt>
										<div>
											<i :class="xpsBrkInfo.asetAmnCtgrId"><span class="blind">{{xpsBrkInfo.ctgrnm}}</span></i>
											<em>{{xpsBrkInfo.prcMchtnm}}</em>
											<span>
												<span v-if="xpsBrkInfo.cdcoCdWrsnm != null">{{xpsBrkInfo.cdcoCdWrsnm}}</span>
												<span v-if="xpsBrkInfo.allIstSc > 0">{{'할부(' + xpsBrkInfo.allIstSc + '개월)'}}</span>
											</span>
										</div>
									</dt>
									<dd>
										<span class="com_price">
											<em class="num">{{xpsBrkInfo.tram | numberFilter}}</em><em class="unit">원</em>
										</span>
									</dd>
								</dl>
							</a>
						</li>
					</ul>
				</div>
				<div class="com_inner" v-if="nxDataYn === 'Y'">
					<div class="com_btn_area00"><a @click.prevent="fn_moreList()" class="com_btn_more" href="javascript:void(0);"><span>더보기</span></a></div>
				</div>
			</template>
			<template v-else-if="isSrch">
				<div class="no_data_box">
					<div class="no_data_list">
						<p>조회된 정보가 없습니다.</p>
					</div>
				</div>
			</template>

        </div>

		<a class="btn_close" @click.prevent="close()" href="javascript:void(0);"><span class="blind">팝업닫기</span></a>
    </div>
</template>
<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import PDCA1119 from '@/views/page/PD/CA/PDCA1119/PDCA1119'
import {checkWord} from '@/utils/data'
import {dateFormat, monthAdd} from '@/utils/date'

export default {
    name : "PDCA1117",
    data: () => {
		return {
			// input
			mydtCusno:"", // 마이데이터고객번호
			inqStDt:"",   // 조회시작일자
			inqEdDt:"",   // 조회종료일자
			stlMnsDsc:"", // 결제수단구분코드(1:카드, 2:선불, 3:현금, 9:전체)
			stlMnsDsNm:"",// 결제수단구분명
			mchtnm:"",    // 가맹점명
			pageNo:1,     // 페이지번호
			isSrch	: false,	  // 검색유무flag
			PDCA1117_srchKwrd:"", // 검색어

			// output
			nxDataYn:"",  // 다음데이터여부
			xpsBrkCn:"",  // 지출내역건수
			xpsBrkList:[] // 지출내역목록
        }
    },
    methods: {
        initComponent() {
			this.mydtCusno = this.getUserInfo('mydtCusno')
			this.stlMnsDsc = this.stlMnsDsc || '9'
			this.pageNo = 1

			// 화면로드시 기본 1달
			// ex)1달전날짜 ~ 현재일자
            let today = new Date();
            this.inqEdDt = dateFormat(today, "YYYY.MM.DD");
			this.inqStDt = monthAdd(-1, this.inqEdDt, 'YYYY.MM.DD')
			
			// 화면로드 후 조회
			this.fn_search()
		},
		fn_search() {

			this.mchtnm = this.PDCA1117_srchKwrd || ''
			this.pageNo = 1

			const config = {
				url : "/pd/ca/19r01",
				data : {
					"mydtCusno" : this.mydtCusno,
					"inqStDt"   : this.inqStDt.split(".").join(""),
					"inqEdDt"   : this.inqEdDt.split(".").join(""),
					"stlMnsDsc" : this.stlMnsDsc,
					"mchtnm"    : this.mchtnm,
					"pageNo"    : this.pageNo,
				}
			}

			apiService.call(config).then(response => {

				this.isSrch = true
				this.nxDataYn   = response.nxDataYn   || ''
				this.xpsBrkCn   = response.xpsBrkCn   || 0
				this.xpsBrkList = response.xpsBrkList || []

				this.$refs.PDCA1117_srchKwrd.blur()
			});
		},
		// 더보기 버튼 클릭
		fn_moreList() {
			this.pageNo = this.pageNo + 1
			
			const config = {
				url : "/pd/ca/19r01",
				data : {
					"mydtCusno" : this.mydtCusno,
					"inqStDt"   : this.inqStDt.split(".").join(""),
					"inqEdDt"   : this.inqEdDt.split(".").join(""),
					"stlMnsDsc" : this.stlMnsDsc,
					"mchtnm"    : this.mchtnm,
					"pageNo"    : this.pageNo,
				}
			}
			apiService.call(config).then(response => {
				this.isSrch 	= true
				this.nxDataYn 	= response.nxDataYn
				this.pagePerRowCn = response.pagePerRowCn || 0
				let tmpList 	= response.xpsBrkList || []

				if(this.xpsBrkList.length === 0) {
					this.xpsBrkList = tmpList
				} else {
					for(let i=0; i < tmpList.length ; i++) {
						this.xpsBrkList.push(tmpList[i])
					}
				}
			})
		},
		fn_openStlMnsDscPop() {
			const popConfig = {
				params : {
					val : this.stlMnsDsc
				},
				renderer : {
					component : PDCA1119
				}
			}

			modalService.openSlidePagePopup(popConfig).then(response => {

				this.stlMnsDsc = response.stlMnsDsc
				this.stlMnsDsNm = response.stlMnsDsNm

				// 콤보선택후 조회
				this.fn_search()
			});
		},
        // 글자수 체크
        fn_checkWord(event, maxByte) {
            let rtnObj = checkWord(event.target.value, maxByte)

            if(rtnObj.flag) {this.$refs.PDCA1117_srchKwrd.blur()}   // 알럿 중복 방지

            event.target.value = rtnObj.value
            this.PDCA1117_srchKwrd = event.target.value
		},
		fn_infoClear() {
			this.nxDataYn = ''
			this.pagePerRowCn = ''
			this.xpsBrkList = []
			this.isSrch 	= false
		},
		fn_del(colNm) {
			if(colNm == 'PDCA1117_srchKwrd') {
				this.PDCA1117_srchKwrd = ''
				this.nxDataYn = ''
				this.pagePerRowCn = ''
				this.xpsBrkList = []
				this.isSrch 	= false
			}
		},
		fn_returnXpsBrkInfo(xpsBrkInfo) {
			this.close(xpsBrkInfo)
		},
		/*
		* 검색조건(기간 선택) 팝업
		*/
		fn_openPeriodPop() {
			const config = {
				params: {
					title     : '기간 선택',
					startDate : this.inqStDt.split(".").join(""),
					endDate   : this.inqEdDt.split(".").join("")
				}
			}
			modalService.openSelectMonth(config).then(response => {
				this.inqStDt = dateFormat(response.startDate, "YYYY.MM.DD")
				this.inqEdDt = dateFormat(response.endDate, "YYYY.MM.DD")

				// 날짜 변경후 조회
				this.fn_search()
			})
		},
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    mounted() {
        this.initComponent();

        // PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name);
		
		/*
		setTimeout(() => {
			this.$refs.PDCA1117_srchKwrd.focus()
		}, 100)
		*/
    },
}
</script>