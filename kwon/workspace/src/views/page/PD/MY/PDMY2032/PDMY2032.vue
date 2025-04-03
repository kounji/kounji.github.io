<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나의목표 > 목표등록 > 지출목표
* @ 페이지설명 : 금융과생활 > 나의목표 > 목표등록 > 지출목표 등록
* @ 파일명     : src/views/page/PD/MY/PDMY2032/PDMY2032.vue
* @ 작성자     : CS516029
* @ 작성일     : 2021-05-28
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-28              CS516029                 최초작성
* 2022-07-13              CS528053                 고도화 파일명, UI 변경 및 고도화 개발(PDMY1103.vue -> PDMY2032.vue)
*************************************************************************/
-->

<template>
    <div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1>지출목표</h1>
		</div>
		<div class="popup_content fixed_mygoal_top"><!-- 하단 버튼 없을때 com_no_bottom -->
			<!-- <div class="com_inner"> -->
				<div class="mygoal_top_wrap">
					<div class="mygoal_top">
						<p class="pointColor green">{{currMm}}월 지출목표</p>
						<p class="mygoal_price"><span class="num">{{xpsObtAm | numberFilter}}</span>만원</p>
					</div>

					<p class="subtext">최근 3개월 평균 지출<span class="num">{{avgXpsObtAm | numberFilter}}</span>원</p>

					<div class="gray_box_m" v-if="unClfYn == 'Y'">
						<a href="javascript:void(0);" class="link_arrow icon_notice" @click="movePopup('1')">미분류 지출의 카테고리를 지정해 주세요</a>
					</div>
				</div>
			<!-- </div> -->

			<hr class="hr02">

			<div class="com_inner">
				<div class="mygoal_cont_title">
					<strong class="com_box_tit">카테고리 별 지출</strong>
					<!-- <a href="javascript:void(0);" class="link_arrow" @click="movePopup('2')">정기지출 관리</a> -->

					<div class="custom_tooltip">
						<div class="com_tooltip_type02 com_tooltip_type03">
							<a href="javascript:void(0);" class="com_btn_info" role="button">
								<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
							</a>
							<div class="com_ballon_type01 com_ballon_type02" style="display:none;">
								<div>
									<p>정기지출 금액은 지출분석 화면에서 설정 가능합니다.</p>
									<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
								</div> 
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="com_inner mygoal_cont_wrap">
				
				<!-- 카테고리 -->
				<div class="mygoal_cont" v-for="(ctrgInfo, index) in categoryList" :key="index">
					<p class="sub_title" :class="ctrgInfo.asetAmnCtgrId">{{ctrgInfo.asetAmnCtgrNm}}</p>
					
					<dl class="regular">
						<dt>정기지출</dt>
						<dd><span class="num">{{ctrgInfo.ctgrFxtmXpsAm | numberFilter}}</span>만원</dd>
					</dl>

					<div class="com_input_type01 input_title_type">					
						<label for="varXpsAm">변동지출</label>
						<input type="tel" ref="varXpsAm" class="com_txtright_type01" v-model="ctrgInfo.ctgrVarXpsAm" placeholder="0" title="변동지출금액 입력" @keyup="addComma(index, $event)">
						<div class="del_txt type01"><!-- 추후 사용을 위해 삭제하지 않음 신규코드에도 삽입 jlee -->
							<a href="javascript:void(0);" class="com_btn_delete2 blur"><span class="blind">삭제</span></a>
							<span class="com_inputtxtright2">만원</span>
						</div>
					</div>

					<dl class="gray_box_m">
						<dt>지난달 <span class="num">{{ctrgInfo.ctgrBefXpsAm | numberFilter}}</span>만원</dt>
						<dd><span class="num">{{ctrgInfo.ctgrXpsObtAm | numberFilter}}</span>만원</dd>
					</dl>
				</div>
			
			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="btn_group">
				<a @click.prevent="insertExpensePerpose()" class="btn btn_mint" href="javascript:void(0);">
					<template v-if="insYn === 'C'">등록</template>
					<template v-else>수정</template>
				</a>
			</div>
		</div>
		
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close('reSelect')"><span class="blind">팝업닫기</span></a>
	</div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import {keyupNumFormat} from '@/utils/number'

import LCIP2005 from '@/views/page/LC/IP/LCIP2005/LCIP2005' // 지출 카테고리 변경
// import LCIP2007 from '@/views/page/LC/IP/LCIP2007/LCIP2007' // 정기지출 관리

import {dateFormat} from '@/utils/date'
// import _ from 'lodash'

export default {
    name : "PDMY2032",
    data: () => {
        return {
			categoryList: [],		// 카테고리목록
			detailListIn: [],		// 카테고리 저장 목록
			varXpsAm: 0,			// 변동지출금액
			unClfYn: 'N',			// 미분류 여부
			currMm: "",				// 현재월
			// xpsObtAm: 0,			// 지출목표금액(최근3개월 평균, 미분류 제외)
			avgXpsObtAm: 0,			// 최근3개월 평균 지출목표금액(미분류 포함)
			unClfAm: 0,				// 미분류 금액
			mydtCusno: "",			// 고객번호
			insYn:"",				// 등록, 수정
			stYm:"",				// 조회월
        }
    },
    mixins: [
        popupMixin
	],
	computed : {
        xpsObtAm() {
			return this.categoryList.reduce((acc, cur) => {
				cur.ctgrXpsObtAm = Number(cur.ctgrFxtmXpsAm) + Number(cur.ctgrVarXpsAm)
				return acc + cur.ctgrXpsObtAm
			}, 0)
		}
    },
    mounted() {

		if($('body').find('div').hasClass('fixed_mygoal_top')){
			$('.fixed_mygoal_top').scroll(function(){
				var _thisS = $(this).scrollTop()
				if(200 <= _thisS){
					$(this).addClass('fixed_active')
				}else{
					$(this).removeClass('fixed_active')
				}
			})
		}

		$('.com_ballon_type01').hide();
		$('.com_tooltip_type02 a > .arrow,.com_tooltip_type02 button > .arrow').hide();
		$('.com_btn_info').on('click',function(){
			$('.com_ballon_type01').hide();
			$('.com_tooltip_type02 a > .arrow,.com_tooltip_type02 button > .arrow').hide();		
			$(this).parent().next('.com_ballon_type01').show()	
			$(this).next('.com_ballon_type01').show()			
			$(this).children('.arrow').show();			
		});
		$('.com_ballon_type01 .com_btn_close').on('click',function(){
			$('.com_ballon_type01').hide();
			$('.com_tooltip_type02 a > .arrow,.com_tooltip_type02 button > .arrow').hide();		
		});
		
		this.initComponent(this.params)
		
		//PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent(param) {

			this.stYm = dateFormat(new Date(), 'YYYYMM')
			this.currMm = dateFormat(new Date(), "M")   //현재월 10월이전 1자리, 10월부턴 2자리

			this.getData(param)	
			
        },
        getData(param) {
            // 카테고리별 최근3개월 평균 조회
			this.getCategoryAvgList()

			console.log(param)
			console.log(param)
			console.log(param)

			if (param !== undefined && param !== null && param.modifyYn == 'Y' && param.stYm !== null)
			{
				this.insYn = "U" // 수정
				this.stYm = param.stYm
			}
			else
			{
				this.subListIn = []
				this.insYn = "C" // 등록
			}
		},
		// 카테고리별 최근3개월 평균 조회
		getCategoryAvgList() {
			const config = {

				url: '/pd/my/33r02',
				data: {
					mydtCusno: this.getUserInfo('mydtCusno') // 마이데이터고객번호
				}
			};

			apiService.call(config).then(response => {
				console.log(response)
				let tempCategoryList = response.subList || []

				let result = []
				tempCategoryList.reduce(function(res, value) {
					if(!res[value.xpsCtgrC]) {
						res[value.xpsCtgrC] = { xpsCtgrC : value.xpsCtgrC, xpsCtgrNm : value.xpsCtgrNm, avgFxtmAm: 0, avgVarAm: 0, avgXpsAm: 0, xpsAm: 0, xpsBf1mAm: 0 }
						result.push(res[value.xpsCtgrC])
					}

					res[value.xpsCtgrC].avgFxtmAm	+= value.avgFxtmAm		// 평균3개월정기지출금액
					res[value.xpsCtgrC].avgVarAm	+= value.avgVarAm		// 평균3개월변동지출금액
					res[value.xpsCtgrC].avgXpsAm	+= value.avgXpsAm		// 평균3개월지출금액
					res[value.xpsCtgrC].xpsAm		+= value.xpsAm			// 당월지출금액
					res[value.xpsCtgrC].xpsBf1mAm	+= value.xpsBf1mAm		// 전월지출금액

					return res
				}, {})

				for(let i=0; i < result.length; i++){
					if(result[i].xpsCtgrC == 'AS60000000') {						
						this.unClfYn = 'Y'
						this.unClfAm = Number(result[i].avgXpsAm)	// 미분류 지출금액
					} else {
						var inputObj = {};
						inputObj.asetAmnCtgrId  = result[i].xpsCtgrC		// 카테고리ID
						inputObj.asetAmnCtgrNm  = result[i].xpsCtgrNm		// 카테고리명
						inputObj.ctgrFxtmXpsAm	= Math.round(Number(result[i].avgFxtmAm) / 10000)		// 정기지출금액
						inputObj.ctgrVarXpsAm	= Math.round(Number(result[i].avgVarAm) / 10000)		// 변동지출금액
						inputObj.ctgrXpsObtAm	= Math.round(Number(result[i].avgXpsAm) / 10000)		// 지출금액(정기지출금액+변동지출금액)
						inputObj.ctgrBefXpsAm   = Math.round(Number(result[i].xpsBf1mAm) / 10000) 		// 이전달지출금액

						this.categoryList.push(inputObj)
					}
				}

				this.avgXpsObtAm	= Number(response.avgXpsTotAmt)		// 지출목표금액(미분류 포함)

				console.log("this.unClfAm : ", this.unClfAm)
				console.log("this.categoryList")
				console.log(this.categoryList)
			});
		},
		// 카테고리별지출목표 등록
        insertExpensePerpose() {

            this.detailListIn = []

			for(let i=0; i<this.categoryList.length; i++){

				var inputObj = {};
				inputObj.mydtCusno = this.getUserInfo('mydtCusno')
				inputObj.stYm = this.stYm
				inputObj.asetAmnCtgrId = this.categoryList[i].asetAmnCtgrId
				inputObj.xpsObtAm = Number(this.removeComma(this.categoryList[i].ctgrXpsObtAm)) * 10000
				inputObj.varXpsAm = Number(this.removeComma(this.categoryList[i].ctgrVarXpsAm)) * 10000
				inputObj.fxtmXpsAm = Number(this.removeComma(this.categoryList[i].ctgrFxtmXpsAm)) * 10000

				this.detailListIn.push(inputObj)
			}
			console.log("this.detailListIn")
			console.log(this.detailListIn)

            let inputXpsObtAm
            if(this.flag == '1') {
                inputXpsObtAm = Number(this.removeComma(this.xpsObtAm)) * 10000
            } else {
                // 지출목표금액보다 카테고리금액 합산금액이 적을 경우 지출목표금액은 입력한데로ㅓ..
                // 지출목표금액보다 카테고리금액 합산금액이 클경우 카테고리 합산금액 == 지출목표금액
                if(this.cdTotUsAm > this.xpsObtAm) {
                    inputXpsObtAm = Number(this.removeComma(this.cdTotUsAm)) * 10000
                } else {
                    inputXpsObtAm = Number(this.removeComma(this.xpsObtAm)) * 10000
                }
            }

            let config_url = ''
            let alertMsg
            if(this.insYn == "C") {
                config_url = '/pd/my/32s01'
                alertMsg = '지출목표를 등록하시겠습니까?'
            } else {
                config_url = '/pd/my/32u01'
                alertMsg = '지출목표를 수정하시겠습니까?'
            }

            const configConfirm = {
                content: [alertMsg],
                title  : "",
			}
			
            modalService.confirm(configConfirm).then(text => {
                if(text == "예") {

                    const config = {
                        url: config_url,
                        //data: {"mydtCusno": this.getUserInfo('asetAmnCusno')} // 마이데이터고객번호

                        data: {"mydtCusno": this.getUserInfo('mydtCusno')
                            ,"stYm" : this.stYm
                            ,"xpsObtAm" : inputXpsObtAm
                            ,"detailListIn" : this.detailListIn}
                    };
                    
                    apiService.call(config).then(response => {

                        if(response.rspCd == '0000'){
                            modalService.alert("저장되었습니다.").then(() => {
                                // 전체페이지 닫기
                                //this.closeAll('reSelect')
                                this.closeAllData('reSelect')
                            });
                        } else {
                            modalService.alert("저장 중 오류가 발생하였습니다.").then(() => {
                                //this.close(response);
                            })
                        }
                    });
                }
            })
		},
		addComma(idx) {
			const varXpsAms = this.$refs.varXpsAm[idx]
			const selectionStartPos = varXpsAms.selectionStart
			const selectionEndPos = varXpsAms.selectionEnd

			if(varXpsAms.value.length >= 1 && varXpsAms.value == 0 || varXpsAms.value == "") {
				varXpsAms.value = 0
			} else {
				varXpsAms.value = varXpsAms.value.replace(/[^0-9]/g,'').replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g,'')
				varXpsAms.value = varXpsAms.value.split(",").join("")
				this.categoryList[idx].ctgrVarXpsAm = varXpsAms.value
				// varXpsAms.value = keyupNumFormat(varXpsAms.value)
				this.$nextTick(()=>{
					varXpsAms.value = keyupNumFormat(varXpsAms.value)
				})
			}

			if(event.keyCode === 8) {
				this.$nextTick(()=>{
					varXpsAms.focus()
					varXpsAms.setSelectionRange(selectionStartPos,selectionEndPos)
				})
			}
		},
		removeComma(value) {
            return (typeof value === "string") ? value.split(",").join("") : value
        },
		// 자산카테고리 명칭 세팅
		// setAsetAmnCtgrNm(asetAmnCtgrId) {

		// 	let asetAmnCtgrInfo = _.find(this.categoryList, {"asetAmnCtgrId":asetAmnCtgrId})
		// 	if(typeof asetAmnCtgrInfo !== 'undefined') {
		// 		return asetAmnCtgrInfo.ctgrnm
		// 	}
		// },
		// 팝업 호출
		movePopup(clf) {
			let compName
			let today = dateFormat(new Date(), 'YYYYMMDD')
			if(clf == '1') {
				compName = LCIP2005
			} 
			// else if(clf == '2') {
			// 	compName = LCIP2007
			// }

			let param = {
				basDt : today
				, pBasYm : this.stYm
			}

            const config = {
                component: compName,
                params : param
            }
            modalService.openPopup(config).then(response => {
                if(response == "reSelect") {
                    this.getCategoryList()
                }
            })
		}
    },
    updated() {
        // if($('body').find('div').hasClass('fixed_mygoal_top')){
        //     $('.fixed_mygoal_top').scroll(function(){
        //         var _thisS = jQuery(this).scrollTop();
        //         // console.log(_thisS)
        //         if(200 <= _thisS){
        //             $(this).addClass('fixed_active');
        //         }else{
        //             $(this).removeClass('fixed_active');
        //         };
        //     });
        // }
    }
}
</script>