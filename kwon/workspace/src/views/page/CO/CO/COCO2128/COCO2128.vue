<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 금융캘린더 > 수입
* @ 페이지설명 : 금융캘린더 > 수입내역, 지출내역, 이체내역
* @ 파일명     : src/views/page/LC/FD/LCFD1102/LCFD1102.vue
* @ 작성자     : CS515901
* @ 작성일     : 2021-05-28
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-10              CS515901                 최초작성
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>숨김내역 보관함</h1>
		</div>
		<div class="popup_content com_bg_type00">
			<div class="com_list_type01 com_line_type01">
                <div class="new_top_box type02">
					<div class="box_head">
						<button class="select_date" @click.prevent="selectMonth()">
							<span class="num">{{year}}</span>년 <span class="num">{{month}}</span>월 <span class="caret"></span>
						</button>
					</div>     
				</div>
            </div>
			<div class="com_inner" v-if="hiddenList.length > 0">
                <template v-for="(item, index) in hiddenList">
                    <div class="new_tit_area" :key="index">
                        <div class="tit"><em>{{item.fncTrDt.substring(6,8)}}</em><span>일</span></div>
                    </div>              
                    <ul class="list_type_02" :key="'ul_'+index">
                        <li v-for="(array, idx) in item.list" :key="index + 'array_'+idx">
                            <dl>
                                <dt>
                                    <div>
                                        <span class="btn_checkbox">
                                            <input type="checkbox" name="check01" :id="'check_'+index+'_'+idx" v-model="selectedItem" :value="array" @change="btn_control()">
                                            <label :for="'check_'+index+'_'+idx">
                                                <em v-if="array.prcMchtnm">{{array.prcMchtnm}}</em>
                                                <span v-if="array.cdcoCdWrsnm">{{array.cdcoCdWrsnm}}</span>
                                            </label>
                                        </span>
                                    </div>
                                </dt>
                                <dd>
                                    <span class="com_point_red">
                                        <em class="num">-{{array.tram | numberFilter}}</em>
                                        <em class="unit">원</em>
                                    </span>
                                </dd>
                            </dl>
                        </li>
                    </ul>
                </template>
                <div class="com_space_type01"></div>
			</div>
			<div class="com_inner" v-else>
				<!-- 조회내역이 없을경우 S -->
				<div class="no_data_box">
					<div class="no_data_list">
						<p>조회된  정보가 없습니다.</p>
					</div>
				</div>
				<!--// 조회내역이 없을경우 E -->
			</div>
        </div>
		
        <div class="popup_footer fixed">
			<div class="btn_full_box">
				<!-- <a class="btn btn_mint" :class="{btn_off: btnViewYn}" @click.prevent="btnViewYn ? '' : disExps()">해제하기</a> -->
                <a class="btn btn_mint"  @click.prevent="disExps()">해제하기</a>
				<!-- btn_off 제거시 활성화 -->
			</div>
		</div>

		<a @click="close" class="btn_close"><span class="blind">팝업닫기</span></a>		
	</div>
</template>
<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'

import _ from 'lodash'

export default {
    name : "COCO2128",
    data: () => {
        return {

            year            : "",
            month           : "",
            selectedItem    : [],

            btnViewYn       : true,

            hiddenList      : [],       // 지출내역숨김 목록
            expsRelInqCn    : 0,        // 노출관련조회건수
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
    methods: {
        initComponent() {
			this.getData();
			
		},
        getData() {

            const date        = new Date()
            this.year         = date.getFullYear()   //현재년
            this.month        = ("0" + (date.getMonth() +1)).slice(-2)  //현재월 00

            this.getHideList()
		},
        getHideList(){
            this.hiddenList = []
            this.selectedItem = []
            this.btnViewYn = true
			const config = {
				url:  "/co/co/28r02",
				data : {
                    mydtCusno       : this.getUserInfo('mydtCusno')         // 마이데이터 고객번호
                    , rzsBasYm      : this.year + '' + this.month           // 실적기준년월
					, xpsBrkExpsYn  : "0"                                   // 지출내역노출여부 1:노출, 0:숨김
				}
			}
			apiService.call(config).then(response => {
                console.log(response)
                this.hiddenList = response.hiddenList || []

                if(this.hiddenList.length > 0){
                    this.hiddenList = this.sortArray(this.hiddenList)
                }

			})
        },
		sortArray(objArray){
            const list = objArray || []
            const result = _.chain(list)
                .uniqBy('fncTrDt')
                .map(d => {
                    return {
                        fncTrDt : d.fncTrDt,
                        list : _.filter(list, {fncTrDt : d.fncTrDt})
                    }
                })
                .orderBy('fncTrDt', 'desc')
                .value()
            return result
        },
        selectMonth(){
            const config = {
                params: {
                    title: '년월 선택',
                    yyyymm : this.year + '' + this.month,
                },
            }
            modalService.openSlideSelectMonth(config).then(response => {
                this.year = response.substring(0,4)
				this.month = response.substring(4,6)
				this.getHideList()				
			})
        },
        btn_control(){
            if(this.selectedItem.length > 0){
                this.btnViewYn = false
            }else{
                this.btnViewYn = true
            }
        },
        disExps(){
            if(!this.selectedItem.length > 0){
                // modalService.alert("해제할 내용이 없습니다.")
                const config_alert = {
                    content: ['해제할 내용이 없습니다.'],
                    buttons: [{text: "확인", class: 'btn btn_mint btn_no'}],
                }
                modalService.alert(config_alert)
                return false
            }
            let expsChgRqrList = []
            for(let i=0; i < this.selectedItem.length; i++){
                expsChgRqrList.push(
                    {
                        "asetCtgrDsc":this.selectedItem[i].asetCtgrDsc,
                        "dataSrcDsc":this.selectedItem[i].dataSrcDsc,
                        "inqKey":this.selectedItem[i].inqKey,
                        "xpsBrkExpsYn":"1"
                        // "revXpsBsnDsc":this.selectedItem[i].revXpsBsnDsc,
                        // "mydtCusno":this.getUserInfo('mydtCusno'),
                        // "infOfrmnOrgC":this.selectedItem[i].infOfrmnOrgC,
                        // "mydtCdIdVal":this.selectedItem[i].mydtCdIdVal,
                        // "mydtAcno":this.selectedItem[i].mydtAcno,
                        // "faceNo":this.selectedItem[i].faceNo,
                        // "mydtScNo":this.selectedItem[i].mydtScNo,
                        // "trDt":this.selectedItem[i].trDt,
                        // "apvDt":this.selectedItem[i].apvDt,
                        // "accIdVal":this.selectedItem[i].accIdVal,
                        // "cdApvno":this.selectedItem[i].cdApvno,
                        // "sqno":this.selectedItem[i].sqno,
                        
                    }
                )
            }

			const config = {
				url:  "/co/co/28u02",
				data : {
                    "expsChgRqrCn":this.selectedItem.length,
                    "expsChgRqrList":expsChgRqrList
				}
            }
            console.log(config)
			apiService.call(config).then(response => {
                console.log(response)
                if(response.totPrcCn > 0){
                    modalService.alert("해제 완료되었습니다.").then( ()=> {
                        this.getData()
                    })
                }else{
                    modalService.alert("해제 실패하였습니다.")
                }
			})            
            
        }
    }
}
</script>