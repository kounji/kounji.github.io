<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 조합원 > 조합원
* @ 페이지설명 : 조합원 메인-면세유현황(유종별)-월별사용량(POP)
* @ 파일명     : src/views/page/SZ/UM/SZUM2106/SZUM2106.vue
* @ 작성자     : 
* @ 작성일     : 2021-06-01
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-01              		                최초작성
* 2021-06-25                                    프로그램 재작성 
*************************************************************************/
-->
<template>
<div class="full_popup" id="full_popup_01"> 
	<div class="popup_header">    
		<h1>월별 사용현황</h1>
	</div>
		
	<!--BODY(Start)-->	
	<div class="popup_content com_bg_type00 com_no_bottom">
		<div class="com_inner com_line_type01 com_top_type01">
			<button type="button" class="com_btn_select" title="유종검색" v-on:click="selectMonthList">
				<span ref="itemName">검색할 유종을 설정해 주세요.</span>
			</button>
		</div>
		<div class="com_inner" v-bind:id="detailList.fltynm">
			<div class="tbl_tit_unit">
				<strong class="tit">배정량 : {{extxol2.byrAsgqt | numberFilter}}</strong> <!--연간배정량(총배정량)-->
				<span class="unit">단위: 리터</span>
			</div>
			<table class="com_tbl com_tbl2">
				<caption>배당내역의 구분, 금차배당대상여부, 본인 배당금액에 대한 내용을 제공합니다.</caption>
				<colgroup>
					<col style="width:15%">
					<col style="width:30%">
					<col style="width:30%">
					<col style="width:25%">
				</colgroup>
				<thead>
					<tr>
						<th>구분</th>
						<th>사용량</th>
						<th>누적사용량</th>
						<th>잔량</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1월</td>
						<td>{{extxol2.janUgqt | numberFilter}}</td>
						<td>{{extxol2.janAcmUgqt | numberFilter}}</td>
						<td>{{extxol2.janRmqy | numberFilter}}</td>
					</tr>
					<tr>
						<td>2월</td>
						<td>{{extxol2.febUgqt | numberFilter}}</td>
						<td>{{extxol2.febAcmUgqt | numberFilter}}</td>
						<td>{{extxol2.febRmqy | numberFilter}}</td>
					</tr>
					<tr>
						<td>3월</td>
						<td>{{extxol2.marUgqt | numberFilter}}</td>
						<td>{{extxol2.marAcmUgqt | numberFilter}}</td>
						<td>{{extxol2.marRmqy | numberFilter}}</td>
					</tr>
					<tr>
						<td>4월</td>
						<td>{{extxol2.aprUgqt | numberFilter}}</td>
						<td>{{extxol2.aprAcmUgqt | numberFilter}}</td>
						<td>{{extxol2.aprRmqy | numberFilter}}</td>
					</tr>
					<tr>
						<td>5월</td>
						<td>{{extxol2.mayUgqt | numberFilter}}</td>
						<td>{{extxol2.mayAcmUgqt | numberFilter}}</td>
						<td>{{extxol2.mayRmqy | numberFilter}}</td>
					</tr>
					<tr>
						<td>6월</td>
						<td>{{extxol2.junUgqt | numberFilter}}</td>
						<td>{{extxol2.junAcmUgqt | numberFilter}}</td>
						<td>{{extxol2.junRmqy | numberFilter}}</td>
					</tr>
					<tr>
						<td>7월</td>
						<td>{{extxol2.julUgqt | numberFilter}}</td>
						<td>{{extxol2.julAcmUgqt | numberFilter}}</td>
						<td>{{extxol2.julRmqy | numberFilter}}</td>
					</tr>
					<tr>
						<td>8월</td>
						<td>{{extxol2.augUgqt | numberFilter}}</td>
						<td>{{extxol2.augAcmUgqt | numberFilter}}</td>
						<td>{{extxol2.augRmqy | numberFilter}}</td>
					</tr>
					<tr>
						<td>9월</td>
						<td>{{extxol2.sepUgqt | numberFilter}}</td>
						<td>{{extxol2.sepAcmUgqt | numberFilter}}</td>
						<td>{{extxol2.sepRmqy | numberFilter}}</td>
					</tr>
					<tr>
						<td>10월</td>
						<td>{{extxol2.octUgqt | numberFilter}}</td>
						<td>{{extxol2.octAcmUgqt | numberFilter}}</td>
						<td>{{extxol2.octRmqy | numberFilter}}</td>
					</tr>
					<tr>
						<td>11월</td>
						<td>{{extxol2.novUgqt | numberFilter}}</td>
						<td>{{extxol2.novAcmUgqt | numberFilter}}</td>
						<td>{{extxol2.novRmqy | numberFilter}}</td>
					</tr>
					<tr>
						<td>12월</td>
						<td>{{extxol2.decUgqt | numberFilter}}</td>
						<td>{{extxol2.decAcmUgqt | numberFilter}}</td>
						<td>{{extxol2.decRmqy | numberFilter}}</td>
					</tr>
				</tbody>
			</table>       
		</div>
	</div>		

    <a href="javascript:void(0);"  @click="close()" class="btn_close"><span class="blind">팝업닫기</span></a>	
</div>		
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import SelectPopupCardRenderer from '@/components/renderer/SelectPopupCardRenderer'
import modalService from '@/service/modalService'

export default {
	name: 'SZUM2106',
	data: () => {
		return {
            detailList : [],	//월별사용량 결과리스트
			extxol2    : {},	//해당유종의 월별사용량
			selectVal  : "",	//선택한유종
		}
	},

    mixins: [
		popupMixin,
		commonMixin
	],
    mounted() {
		this.initComponent();
		//PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
    },
	methods: {
		initComponent() {
			this.getData();
		},
		getData() {
			const config ={
				url: '/sz/um/06r01',
				data: {
					mydtCusno : this.getUserInfo("mydtCusno")
				}
			}
			apiService.call(config).then(response => {
				this.detailList = response.detailList|| [] //면세유 리스트
			}) 
		},   

		//유종명 생성
		selectMonthList() {
			let detailList = this.detailList
		
			//자료가 존재하지 않을 경우	
			if (detailList === null || typeof detailList === "undefined") {
				return;
			}

			//자료가 존재할 경우		
			if (detailList.length > 0) {

				const config = {
					params: {
						title: '유종 선택',
						list : []
					},
					renderer: {
						component: SelectPopupCardRenderer,
						labelFiled: 'comnCnm'
					}
				}

				for (let i=0; i < detailList.length; i++) {
					let value = {}
					value.comnCnm = detailList[i].fltynm   //유종명
					value.value = i
					value.comnCId = String(i)

					config.params.list.push(value)
				}

				config.params.selectVal = String(this.selectVal)

				modalService.openSelectSingle(config).then(response => 
				{

					if (typeof response.value !== "undefined") {
						this.selectVal = String(response.value)
						this.$refs["itemName"].innerText = response.comnCnm    //명
						this.extxol2 = this.detailList[response.value]
					}
				})
			}
		}
	}
}
</script>

