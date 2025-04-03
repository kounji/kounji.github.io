<!--
/*************************************************************************
* @ 서비스경로 : 공통
* @ 페이지설명 : 약관/동의 > 이용약관 > 상세(팝업)
* @ 파일명     : src/views/page/CO/AT/COAT1101/COAT1101.vue
* @ 작성자     : CS515731
* @ 작성일     : 2021-05-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-18             CS515729                 최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>이용약관</h1>		
		</div>
        <div class="com_bg_type00 popup_content separate_scroll" :class="{com_space_bottom : callGbn === 'list'} ">
			<div class="com_inner com_line_type01">
				<div class="pop_tit"><span>{{stltTinm}}</span></div>
            </div>

			<div class="terms_text_wrap">
				<!--셀렉트박스 필요 없을시 select_wrapper전체 제거--->
				<div class="select_wrapper" v-if="callGbn === 'list'">
					<button class="select_date" @click="selectStltVerClick()">
						<span class="num">{{selectEfocDt}} 시행</span><span class="caret"></span>
					</button>
				</div>
				<div class="content" v-html="stltCntn"></div>

				<!--영업점 노출 필요 없을 시 store_notice_wrap전체 제거-->
				<div class="store_notice_wrap" v-if="callGbn === 'list' && mobrList.length > 0">
					<div class="head">영업점</div>
					<div class="content">{{getMobrList}}</div>
				</div>

				<!-- 제3자동의설정화면에서 호출시-->
				<div class="store_notice_wrap" v-if="callGbn === 'third' && thirdMobrList.length > 0">
					<div class="head">영업점</div>
					<div class="content">{{getThirdMobrList}}</div>
				</div>

            </div>

        </div>

		<div class="popup_footer fixed" v-if="callGbn === 'third'">
			<div class="btn_full_box">
				<a href="javascript:void(0);" class="btn btn_mint" @click="fn_close('done')">동의</a>
			</div>
		</div>
		<a href="javascript:void(0);" @click="fn_close()" class="btn_close"><span class="blind">닫기</span></a>
	</div>
	<!--// full popup E -->
</template>
<script>
	import commonMixin from '@/common/mixins/commonMixin'
	import popupMixin from '@/common/mixins/popupMixin'
	import apiService from '@/service/apiService'
	import modalService from '@/service/modalService'
	import {dateFormat} from '@/utils/date'
	import _ from 'lodash'

	export default {
		name : "COAT1102",
		data: () => {
			return {
				objStltInfo : {},	//전달파라미터
				respInfo    : {},
				respVerInfo : {},
				stltTinm    : "",	//약관제목
				stltCntn    : "",	//약관내용
				stltAplCntn    : "",
				mobrList    : [],	//제3자동의의경우 지점목록
				stltVerList : [],	//변경이력
				callGbn     : "",	//호출구분 (list:목록, third : 제3자)
				thirdMobrList   : [],	//제3자동의설정 호출시 선택 영업점

				selectStltTpc : "",	//약관유형코드
				selectSqno    : "",	//일련번호
				selectEfocDt  : ""
			}
		},
		mounted() {
			this.objStltInfo     = this.params.objStltInfo	//전달파라미터
			this.callGbn         = this.params.callGbn	//호출구분
			this.thirdMobrList   = this.params.mobrList || []

			this.selectStltTpc = this.objStltInfo.stltTpc	//약관유형코드
			this.selectSqno    = this.objStltInfo.sqno	//일련번호

			this.initComponent()
			//PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
		},
		mixins: [
			commonMixin,
			popupMixin
		],
		methods: {
			initComponent() {
				this.getData()	// 상세조회
				if(this.callGbn === "list") {
					this.getStltVerList()	//이력조회
				}
			},
			getData() {
				////////////////
				// 약관상세조회
				///////
				const config = {
					url : '/co/at/02r01',
					data : {
						"stltTpc"   : this.selectStltTpc,
						"sqno"      : this.selectSqno,
						"mydtCusno" : this.getUserInfo('mydtCusno'),
					}
				}
				apiService.call(config).then(response => {
					this.respInfo = response
					this.stltTinm = this.respInfo.asetAmnStltTinm || ""
					this.stltCntn = this.respInfo.asetAmnStltCntn || ""

					let efocDt = this.respInfo.efocDt || ""	//조회된 약관의 시행일자
					this.selectEfocDt = dateFormat(efocDt, "YYYY.MM.DD")
					this.mobrList = this.respInfo.mobrList || []	//[{mobrC, mobrnm}] 모점코드,모점명
				})
			},
			getStltVerList() {
				////////////////
				// 약관변경이력
				///////
				const config2 = {
					url : '/co/at/02r02',
					data : {
						"stltTpc" : this.objStltInfo.stltTpc,	//약관유형코드
					}
				}
				apiService.call(config2).then(response => {
					this.respVerInfo = response
					this.stltVerList = this.respVerInfo.stltVerList
					this.stltVerList = _.chain(this.stltVerList).orderBy(['efocDt'],['desc']).value()
				})
			},
			selectStltVerClick() {
				const config = {
					params : {
						title : "시행날짜",
						list : [], 
						selectVal : this.selectStltTpc + "_" + this.selectSqno
					}
				}

				for (let i=0; i<this.stltVerList.length; i++) {
					let info={}
					info.comnCnm = dateFormat(this.stltVerList[i].efocDt)
					info.comnCId = this.stltVerList[i].stltTpc + "_" + this.stltVerList[i].sqno
					config.params.list.push(info)
				}

				modalService.openSelectSingle(config).then(response => {
					if (typeof response.comnCId !== "undefined") {
						let comnCId = response.comnCId.split("_")

						this.selectStltTpc = comnCId[0]	//약관유형코드
						this.selectSqno    = comnCId[1]	//일련번호
						
						this.getData()

					}
				})
			},
			fn_close(param) {
				if(this.callGbn === "third") {
					if(typeof param === 'undefined') {
						this.close("cancel")
					} else {
						this.close("agree")
					}
				} else {
					this.close()
				}
			}
		},
		computed: {
			getMobrList () {
				let mobrNms = ""
				for(let i=0; i < this.mobrList.length; i++) {
					mobrNms += this.mobrList[i].mobrnm + ","
				}
				return mobrNms.slice(0, -1)
			},
			getThirdMobrList () {
				let mobrNms = ""
				for(let i=0; i < this.thirdMobrList.length; i++) {
					mobrNms += this.thirdMobrList[i].mobrnm + ","
				}
				return mobrNms.slice(0, -1)
			}
		}
	}
</script>