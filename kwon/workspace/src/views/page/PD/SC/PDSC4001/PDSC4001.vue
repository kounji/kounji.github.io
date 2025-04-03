<!--
/*************************************************************************
* @ 서비스경로 : 연금절세 > 노후준비
* @ 페이지설명 : 국민연금내역
* @ 파일명     : src\views\page\PD\SC\PDSC4001\PDSC4001.vue
* @ 작성자     : CS533453
* @ 작성일     : 2023-08-16
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-16              CS533453              최초작성
* 2025-01-06              CS541015              고도화 파일명, UI변경 및 고도화 개발(PDSC2001.vue -> PDSC4001.vue)
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	
	<div class="full_popup mydata2023" id="full_popup_01">
		<div class="popup_header">    
			<h1>연금가입 내역</h1>
		</div>

		<div class="popup_content">
			<div class="com_inner asset_info_box">
					<div class="asset_info">
						<strong>국민연금공단</strong>
						<div class="bank_icon">
							<i class="PBAAVM0000"><span class="blind"></span></i>
						</div>						
					</div>
					<ul class="list_type_2023">
						<li>
							<dl>
								<dt>총 납부금액</dt>
								<dd><span class="num">{{totPayAm | numberFilter}}</span>원</dd>
							</dl>
							<dl>
								<dt>납부기간</dt>
								<dd><span class="num">{{totPayYear}}</span>개월</dd>
							</dl>
						</li>
					</ul>
			</div>

			<hr class="hr02" />
				
			<div class="renewal financial_life">
				<div class="social_insurance">
					<div class="period_search">
						<ul class="layoutBox com_inner">
							<li class="left">
								<div class="com_btnselectbox_type01">
									<button type="button" class="com_btnselect_type01" :title="objYySt" @click="fnSetYearPop('1')"><span>{{objYySt}}년</span></button>
								</div>
							</li>
							<li class="center">
								<span>~</span>
							</li>
							<li class="right">
								<div class="com_btnselectbox_type01">
									<button type="button" class="com_btnselect_type01" :title="objYyEd" @click="fnSetYearPop('2')"><span>{{objYyEd}}년</span></button>
								</div>
							</li>
						</ul>
						<div class="com_btn_area com_inner">
							<a href="javascript:void(0);" class="com_btnround_type02" role="button" @click="getData()">조회</a>
						</div>
					</div>

					<template v-if="ntpsList.length > 0">
						<div class="shor_term mt20 com_inner">
							<div class="com_box_type01 toggle_list_box2 custom_list" v-for="(ntpsInfo, index) in ntpsList" :key="index">
								<div data-ui-toggle="box" class="toggle_box_area">
									<button type="button" class="view_btn" aria-expanded="true">
										<div class="new_tit_area">
											<div class="tit">
												<p class="bank">{{ntpsInfo.bzplnm}}</p>
												<p class="date">{{ntpsInfo.prdVal}}</p>
											</div>
										</div>
										<em class="open">열기</em>
										<em class="close">닫기</em>
									</button>
								</div>
								<div class="view_cont list_type_01">
									<dl>
										<dt>
											<p>납부한 보험료</p>
											<p>(개월)</p>
										</dt>
										<dd>
											<p><span class="num">{{ntpsInfo.pvpayAm | numberFilter}}</span>원</p>
											<p v-if="ntpsInfo.pvpayMtcn > 0">({{ntpsInfo.pvpayMtcn}}개월)</p>
										</dd>
									</dl>
									<dl>
										<dt>
											<p>납부하지 않은 보험료													
											<p>(개월)</p>
										</dt>
										<dd>
											<p><span class="num">{{ntpsInfo.npayAm | numberFilter}}</span>원</p>
											<p v-if="ntpsInfo.npayAm > 0">({{ntpsInfo.npayMtcn}}개월)</p>
										</dd>
									</dl>	
								</div>
							</div>
						</div>
					</template>
					<template v-else>
						<div class="no_data_box no_data_box01 grayExclamationType">
							<div class="no_data_list">
								<p class="txt_sub">납부 내역이 없어요</p>
							</div>
						</div>
					</template>
					<!--//납부내역이 없을 경우-->
				</div>
			</div>
		</div>
        
		<a href="#nolink" role="button" class="btn_close" @click="close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'

import PDSC4003 from '@/views/page/PD/SC/PDSC4003/PDSC4003' // 조회기간 선택(년도)
import COAR2005 from '@/views/page/CO/AR/COAR2005/COAR2005' // 개인신용정보제공동의

import {dateFormat} from '@/utils/date'
import {mapGetters} from 'vuex'
import Template from '../../../XX/template/template.vue'

export default {
    name : "PDSC4001",
    data: () => {
		return {
            // return info
			ntpsList			: [], // 국민연금 가입내역
			objYySt				: '', // 대상년도시작
			objYyEd				: '', // 대상년도종료
			inqYy				: '', // 조회년도
			cusnm				: '', // 고객명
			ntpsAssetYn			: '', // 자산연결여부(국민연금)
			totEntPrdVal		: 0,  // 총가입금액(국민연금)
			totEntPrdYear		: '', // 총가입개월(국민연금)
			totPayAm            : 0, // 조회결과 총가입금액
			totPayYear          : 0,// 조회결과 총가입개월
			isConnectedPb		: true, // 공공기관 연결 여부
			sInqCpl				: true // 조회 완료여부
        }
	},
	computed : {
		 ...mapGetters('myassets', [
             'myAssetsBzrgList'
		]),
    },
    methods: {
		init() {
			this.cusnm				= this.getUserInfo("cusnm")
			this.ntpsList			= []								// 국민연금 가입내역
			this.objYySt			= new Date().getFullYear() - 40		// 대상년도시작(default 대상년도시작-10년)
			this.objYyEd			= dateFormat(new Date, 'YYYY')		// 대상년도종료
			this.inqYy				= dateFormat(new Date, 'YYYY')		// 조회년도
        },

		initComponent() {
			this.ntpsAssetYn = 'N'
			if(typeof this.myAssetsBzrgList != "undefined") {
				let publicAsset = this.myAssetsBzrgList.filter(item => item.comnCVal === 'public') || []
				if(publicAsset.length > 0) {
					let publicAssetList = this.myAssetsBzrgList.find(item => item.comnCVal === 'public').orgList || []
					if(publicAssetList.length > 0){
						this.ntpsAssetYn = publicAssetList.find(item => item.infOfrmnOrgC === 'PBAAVM0000') ? 'Y' : 'N'		// 국민연금
					}
				}
			} else {
				this.ntpsAssetYn = 'N'
			}
			this.ntpsAssetYn == 'N' ? this.isConnectedPb = false : this.isConnectedPb = true

            this.init()
            this.getData()
        },

		getData() {
			this.ntpsList      = [] // 국민연금 가입내역
			this.totPayAm      = 0
			this.totPayYear    = 0;

			let setUrl      = ''
			let sObjYySt    =  new Date().getFullYear() - 40;
			let isObjYySt10 = false // 조회시작일자 10년이전 

			if(sObjYySt > Number(this.objYySt) && this.sInqCpl){ //자산연결시 10년전 데이터를 가져오나 10년이전 데이터 요청시 API호출
				isObjYySt10 = true;
			}

			console.log("objYySt ===" , this.objYySt);
            !isObjYySt10 ? setUrl = '/pd/sc/01r01' : setUrl = '/co/ma/01r04';

			let resultYear = Number(this.objYyEd) - Number(this.objYySt)
			// if(resultYear > 10) {
			// 	modalService.alert("최대 10년까지 조회 할 수 있어요.").then(() => {});
			// 	return
			// } else 
			if(resultYear < 0) {
				modalService.alert("조회시작년도가 종료년도보다 커요.").then(() => {});
				return
			}
			
            const config = {
                url: setUrl,
                data: {
					"mydtCusno": this.getUserInfo('mydtCusno') // 마이데이터고객번호
					,"objYySt" : this.objYySt					// 대상년도시작
					,"objYyEd" : this.objYyEd					// 대상년도종료
					,"inqYy" : this.inqYy						// 조회년도
					,"x_api_type" : "user-search"				//API 실시간 처리로 추가
					, "ctfwKdC"   : "L165"						//API 실시간 처리로 추가
					,"stYy" : this.objYySt						// 대상년도시작
					,"edYy" : this.objYyEd						// 대상년도종료
					}
			};
			
			console.log("config.data")
			console.log(config.data)

            apiService.call(config).then(response => {
				this.ntpsList = response.ntpsList?.map(el => {
					let prdVal = el.prdVal.trim().split('~')

					let prdVal1 = dateFormat(prdVal[0], 'YYYY.MM', 'YYYY.MM')
					let prdVal2 = dateFormat(prdVal[1], 'YYYY.MM', 'YYYY.MM')
					console.log('prdVal1', prdVal1, prdVal2)
					return {...el, prdVal: `${prdVal1} ~ ${prdVal2}`}
				}) || []

				if(this.ntpsList != null) {
					if(this.ntpsList.length > 0) {
						this.totEntPrdVal	= this.ntpsList[0].totEntPrdVal
						this.totEntPrdYear	= this.ntpsList[0].totEntPrdYear
					}
					this.sInqCpl = true;

					for(let i=0; i<this.ntpsList.length; i++){
						this.totPayAm += this.ntpsList[i].pvpayAm;
						this.totPayYear += this.ntpsList[i].pvpayMtcn;
					}
				}
				if(response != null && response.rsp_code === "CL000") {
					this.sInqCpl = false;
					this.getData();
				}
			});
		},
		fnSetYearPop(clf) {
			let toYear = ''
			toYear	= this.objYySt
			const config = {
                params: {
					"tabDsc": '1',
					"toYear": toYear,
					},
                renderer: {
					component: PDSC4003
                }
            };
            
            modalService.openSlidePagePopup(config).then(response => {
				if(response != null) {
			 		if(clf == '1') {
			 			this.objYySt = response.toYear
			 		} else if(clf == '2') {
			 			this.objYyEd = response.toYear
			 		}
			 	}
			})
		},
		fn_moveJoinPop() {
			let compName = COAR2005;

			let param = {}
			let moduleList = []
			let moduleParam = {}
			if(this.ntpsAssetYn == 'N') {

				moduleParam.orgC		= "PBAAVM0000"
				moduleParam.orgBzrgC	= "public"
				moduleParam.orgnm		= "국민연금공단"
				moduleList.push(moduleParam)

			}
			param.moduleList = moduleList
			param.isOnlyPublic = true

            const config = {
                component: compName,
                params : param
			}
			console.log(config)
            modalService.openPopup(config).then(response => {
                if(response == "reSelect") {
                    this.getData()
                }
            })
			
		}
	},
	mounted() {
		this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
	},
	mixins: [
        popupMixin,
        commonMixin
    ],
}

</script>