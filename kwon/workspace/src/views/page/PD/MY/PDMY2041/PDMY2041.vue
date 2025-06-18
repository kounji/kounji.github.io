<!--
/*************************************************************************
* @ 서비스경로 : 금융과생활 > 나의목표 > 투자목표
* @ 페이지설명 : 금융과생활 > 나의목표 > 투자목표 > 투자목표(상세조회)
* @ 파일명     : src/views/page/PD/MY/PDMY2041/PDMY2041.vue
* @ 작성자     : CS516029
* @ 작성일     : 2021-08-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-08-10              CS516029                 최초작성
* 2023-08-04              CS533453              고도화 파일명 변경(PDMY1110.vue -> PDMY2041.vue)
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>투자목표</h1>
			<!-- <a class="btn_back" @click.prevent="close()" href="javascript:void(0);"><span class="blind">이전화면</span></a> -->
			<a class="btn_close" @click.prevent="closeAll('reSelect')" href="javascript:void(0);"><span class="blind">팝업닫기</span></a>
		</div>
        <div class="popup_content com_bg_type00">
			<div class="new_goal_box new_goal_box_detail goal_done">
				<div class="head_wrap">
					<div class="head">
						<p><span class="icon graph_ico"></span>{{obtnm}}</p>
					</div>

					<!-- 종료일경우 -->
					<template v-if="prgStsCd == '2'">
						<div class="goal_done" :class="fncObtAchvYn == '1' ? 'success' : 'fail'">
							<span class="img">
								<template v-if="fncObtAchvYn == '1'">달성</template>
								<template v-else>실패</template>
							</span>
						</div>
					</template>
					<!-- 종료일경우 -->

				</div>
				<div class="content_wrap">
					<div class="title">
						<template v-if="fncObtAchvYn != '1' && prgStsCd == '1'">
							오늘까지 <br/>
							<span class="num">{{acNowBacTotAm | numberFilter}}</span>원 모으고 있어요.
						</template>
						<template v-else>
							목표기간까지 <br/>
							<span class="num">{{acNowBacTotAm | numberFilter}}</span>원 모았어요.
						</template>
					</div>
					<div class="new_box_footer mt30 p0side pb0">
						<div class="progressBar">
							<div class="bar" :class="fncObtAchvYn == '0' && prgStsCd == '2' ? 'fail_bar' : ''" :style="setProgressBar">
								<div class="popover_wrap">
									<span class="popover roboto">{{setRound(obtPer)}}%<span class="arrow"></span></span>
								</div>
							</div>
						</div>
					</div>
					<template v-if="fncObtAchvYn != '1' && prgStsCd == '1'">
						<div class="cost_notice">
							<div class="cost"><p class="gray">남은 금액</p><span class="num">{{bacAm | numberFilter}}</span>원</div>
							<span class="bar"></span>
							<div class="cost"><p class="gray">남은 기간</p><span class="num">D-{{bacDt}}</span>일</div>
						</div>

						<!-- 남은금액이 존재하는 경우 -->
						<template v-if="bacAm > 0">
							<p class="com_pop_tit01 mt30"><b>{{obtDt | dateFilter('YYYY년 MM월 DD일')}}</b>까지<br/>
								<span class="num bold">{{fncObtAm | numberFilter}}</span>원을 모으려면</p>
							<p class="com_txt_sub01">매 월 <span class="com_point_blue bold">{{dayAm | numberFilter}}원</span>씩 모으면 가능해요!</p>
						</template>

					</template>
					<template v-else>
						<a @click.prevent="goPerposePage" href="javascript:void(0);">
							<div class="com_box_type06 mt30 bg01" v-if="fncObtAchvYn == '1'">
								<div class="text">목표를 이루셨네요!<br> <span class="color">다른 목표를 도전해보실까요?</span></div>
							</div>
							<div class="com_box_type06 mt30 bg03" v-else>
								<div class="text ">아쉬운 도전이었어요!<br> <span class="color">새로운 목표를 달성해볼까요?</span></div>
							</div>
						</a>
					</template>
				</div>
			</div>
			<div class="com_inner">
				<template v-if="subList.length > 0">
					<div class="com_box_type01 com_box_list"><!-- 20210810 한별 com_box_list 클래스 수정 -->
						<div class="new_tit_area">
							<div class="tit"><span>연결된 계좌</span></div>
						</div>
						<ul class="list_type_02">
							<li v-for="(subInfo, index) in subList" :key="index">
								<dl>
									<dt>
										<em>{{subInfo.acWrsnm}}</em>
									</dt>
									<dd>
										<span class="com_price">
											<span class="unit">평가금액</span>
											<em class="num">{{subInfo.acNowBac | numberFilter}}</em>
											<em class="unit">원</em>
										</span>
									</dd>
								</dl>
							</li>
						</ul>
					</div>
				</template>
				<template v-else>
					<div class="no_account_box" v-if="prgStsCd == '1'">
						<strong class="com_pop_tit01">연결된 계좌</strong>
						<a @click.prevent="goExpensePerpose()" href="javascript:void(0);">
							<div class="com_box_banner alert">
								<div class="text">연결된 계좌가 없네요!<br> <span class="color">고객님 계좌를 다시 선택해주세요!</span></div>
							</div>
						</a>
					</div>
				</template>
			</div>
        </div>
		<div class="popup_footer fixed">
			<div :class="prgStsCd == '1' ? 'com_btnhalfbox_type02' : 'btn_full_box'">
				<a @click.prevent="deleteExpensePerpose()" class="btn btn_grey" href="javascript:void(0);">삭제</a>
				<a @click.prevent="goExpensePerpose()" class="btn btn_mint" href="javascript:void(0);" v-if="prgStsCd == '1'">목표수정</a>
				<!-- btn_off 제거시 활성화 -->
			</div>
		</div>
    </div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import {dateFormat, dayDiff} from '@/utils/date'
import PDMY2040 from '@/views/page/PD/MY/PDMY2040/PDMY2040'
import PDMY4005 from '@/views/page/PD/MY/PDMY4005/PDMY4005'
import {round} from '@/utils/number'
import _ from 'lodash'

    export default {
        name : "PDMY2041",
        data: () => {
            return {
				mydtCusno:"", // 마이데이터고객번호
				fncObtDsc:"", // 01:돈모으기 02:투자목표
				sqno:0,       // 일련번호(상세조회시 필수)
				prgStsCd:"",  // 진행상태

				obtnm:"",          // 목표명
				fncObtAm:0,        // 금융목표금액
				obtDt:"",          // 목표일자
				fncObtAchvYn:"",   // 금융목표달성여부
				acNowBacTotAm:0,   // 계좌현재잔액총액
				subList:[],        // 연결계좌내역목록
				setProgressBar:{}, // width Per style
				obtPer:0,          // 목표대비 성과비율
                bacAm:0,           // 잔액(남은금액)
				bacDt:0,           // 잔액(남은기간)
				curDt:"",          // 현재일자
				dayAm:0            // 남은 기간 기준 입금가능금액
            }
        },
        props : {

        },
        mixins: [
            popupMixin
           ,commonMixin
        ],
        methods: {
            initComponent(param) {
				this.mydtCusno = this.getUserInfo('mydtCusno')
				this.fncObtDsc = param.fncObtDsc
				this.sqno = param.sqno
				this.prgStsCd = param.prgStsCd
				this.curDt = dateFormat(new Date(), 'YYYYMMDD')

				// 상세조회
				this.getData()
			},
			getData() {

				const config = {
					url: '/pd/my/40r01',
					data: {
							"mydtCusno": this.mydtCusno // 마이데이터고객번호
							,"fncObtDsc" : this.fncObtDsc
							,"sqno" : this.sqno
						}
				};
				
				apiService.call(config).then(response => {

					this.respInfo = response;

					this.obtnm         = this.respInfo.obtnm
					this.fncObtAm      = this.respInfo.fncObtAm
					this.obtDt         = this.respInfo.obtDt
					this.fncObtAchvYn  = this.respInfo.fncObtAchvYn
					this.subList       = this.respInfo.subList || []
					this.acNowBacTotAm = _.sumBy(this.subList, item => {return item.acNowBac }) // 계좌현재잔액총액
                    this.bacAm = this.fncObtAm - this.acNowBacTotAm // 남은금액
					this.bacDt = Number(dayDiff(dateFormat(this.obtDt, 'YYYYMMDD'), this.curDt) + 1) // 남은일자
					
                    //목표금액 도달시 목표달성처리
                    if(this.acNowBacTotAm >= this.fncObtAm){
                        this.fncObtAchvYn = "1"
                    }
                    
					// 남은기간이 30일 이하일경우에는 남은금액으로 노출
					if(this.bacDt > 30) {
						this.dayAm = this.bacAm / (this.bacDt / 30)
					} else {
						this.dayAm = this.bacAm
					}

					let widthCal
                    if(typeof this.fncObtAm == "undefined" || this.fncObtAm == 0) {
						this.obtPer = 0
                        this.setProgressBar = {'width':'0%'}
                    } else {
						widthCal = round((this.acNowBacTotAm / this.fncObtAm) * 100, 1)
						
						this.obtPer = widthCal
                        this.setProgressBar = {'width':widthCal + '%'}
                    }
				});
			},
			// 목표삭제
			deleteExpensePerpose() {

				const configConfirm = {
					content: ['투자목표를 삭제하시겠습니까?'],
					title  : "",
				}

				modalService.confirm(configConfirm).then(text => {
					if(text == "예") {

						const config = {
							url: '/pd/my/40d01',		// /pd/my/03d01
							data: {
									"mydtCusno": this.mydtCusno // 마이데이터고객번호
									,"fncObtDsc" : this.fncObtDsc
									,"sqno" : this.sqno
								}
						};
						
						apiService.call(config).then(response => {

							if(response.rspCd == '0000'){
								modalService.alert("목표가 삭제되었습니다.").then(() => {
									// 전체페이지 닫기
									this.closeAllData('reSelect')
								});
							} else {
								modalService.alert("삭제 중 오류가 발생하였습니다.").then(() => {
									//this.close(response);
								})
							}
						});
					}
				})
			},
			goExpensePerpose() {
				var compName = PDMY2040

				var param = {"fncObtDsc":this.fncObtDsc, "sqno": this.sqno, "prgStsCd":this.prgStsCd}

				const config = {
					component: compName,
					params : param
				}
				modalService.openPopup(config).then(() => {

				})
			},
            setRound(val) {
                return round(val, 1)
            },
			// 목표등록화면으로 이동
			goPerposePage() {
				var compName = PDMY4005

				var param = {}

				const config = {
					component: compName,
					params : param
				}
				modalService.openPopup(config).then(() => {

				})
			}
        },
        mounted() {
            this.initComponent(this.params)

            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
    }
</script>