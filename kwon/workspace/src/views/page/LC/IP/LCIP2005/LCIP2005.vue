<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출분석 > 유형별 지출
* @ 페이지설명 : 지출 > 지출분석 > 유형별 지출 > 카테고리 변경
* @ 파일명     : src\views\page\LC\IP\LCIP2005\LCIP2005.vue
* @ 작성자     : 
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10              CSXXXXXX              최초작성
*************************************************************************/
-->
<template>
	<!-- 전체 팝업 시작 -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"><!-- 0803 .mydata2023 클래스 이동-->
		<div class="popup_header">
			<h1>카테고리 변경</h1>
		</div>
		<div class="popup_content com_btn_bottom">
			<div class="com_inner">
				<strong class="titH1">분류가 필요한 지출 <span class="pointColor green"><em class="num">{{unClfXpsCnt}}</em>개</span></strong>
				<div class="remove_expenditure">
					<!-- 6월 3일 -->
					<div class="custom_list" v-for="(unClfXpsDay, index1) in unClfXpsDayList" :key="index1" >
						<div class="custom_box flex_new_tit_area mt0">
							<div class="list_type_box">
								<div class="new_tit_area">
									<div class="tit"><span>{{unClfXpsDay.dtForList | dateFilter('M월 D일')}}</span></div>
								</div>
							</div>	
						</div>
						<ul class="list_type_01">
							<li v-for="(list, index2) in unClfXpsDay.list" :key="'list_' + index2">
								<div class="ipt_wrap">
									<input type="checkbox" :id="'checkbox'+index1+'-'+index2" v-model="selectCtgrList" :value="list.inqKey+'#'+list.dataSrcDsc+'#'+list.prcMchtnm" @change="fn_modChkItem()">
									<label for="'checkbox'+index1+'-'+index2" class="bank_state_che">
                                        <i :class="'ico_bank expIcon ' + list.xpsCtgrC"></i>
										<div class="ipt_txt_flex">
											<strong class="bank_name">{{list.prcMchtnm}}</strong>
											<p class="price"><span class="num">{{list.xpsAm | numberFilter}}</span>원</p>
										</div>
									</label>
								</div>
							</li>
						</ul>
					</div>
					<!-- //6월 3일 -->					
				</div>
			</div>	
		</div>
		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" role="button" class="btn btn_mint" @click.prevent="openPop('LCFD2004')"><em>{{chkCnt}}</em>개 카테고리 변경</a>
			</div>
		</div>		
		<!-- <a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a> -->
		<a href="javascript:void(0);" class="btn_close" @click.prevent="fn_closePop()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import {dateFormat} from '@/utils/date'

import {getDayDowCName} from '@/utils/date'
import _ from 'lodash'
import LCFD2004 from '@/views/page/LC/FD/LCFD2004/LCFD2004'

export default {
    name : "LCIP2005",
    data: () => {
        return {
			viewIndex: 0,
			viewYN: '',
            res: {},
            cusNb: '',              // 마이데이터고객번호
            monPrev: false,         // 이전달 조회
            monNext: false,         // 다음달 조회
            basYm: null,            // 조회 기준년월 YYYYMM
            basYy: null,            // 조회 기준년도 YYYY
            basMm: null,            // 조회 기준월   MM
            befBasYm: null,         // 조회 기준년월 YYYYMM (현재년월의 지난달)
            befBasYy: null,         // 조회 기준년도 YYYY   (현재년월의 지난달)
			befBasMm: null,         // 조회 기준월   MM     (현재년월의 지난달)
			initBasYm: '',          // 초기 기준년월
			todayBasYm: '',         // 현재년월
			basDt : '',				// 기준일자
			basDt2 : '',

			unClfXpsList : [],      // 미분류목록
			unClfXpsDayList : [],   // 미분류목록
			selectList : [],        // 선택목록
			inqKeyList : [],        // 선택목록
			selectCtgrList : [],    // 선택목록 v-model
            unClfXpsCnt: 0,
        }
    },
    computed : {
		chkCnt() {
			return  this.selectCtgrList.length
		},        
    },
    created() {
		this.cusNb = this.getUserInfo("mydtCusno")
		this.basDt = this.modalConfig.params.basDt
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent() {
			this.basYm = this.params ? this.params.pBasYm : ''
			this.basDt2 = dateFormat(new Date(), "YYYYMMDD")
			this.getData()
        },

        getData() {
            const config = {
                url: '/lc/ip/05r02',
                data: {
                    "mydtCusno" : this.cusNb,
                    "basDt" : this.basDt
                }
            }
            apiService.call(config).then(response =>{
				console.log('response', JSON.parse(JSON.stringify(response)))
				
                this.unClfXpsList = response.unClfXpsList || []
				
				this.unClfXpsCnt =  this.unClfXpsList.length
				
				this.viewYN = this.unClfXpsList.length > 0 ? 'Y' : 'N'

				this.unClfXpsDayList = this.modifyList(this.unClfXpsList)

				this.selectCtgrList = []

				//this.chkCnt = 0
			});		
		},
        openPop(viewName) { 
			let config = {}

			if (this.chkCnt < 1 )
			{
				modalService.alert('미분류 지출항목을 선택해주세요.')
				return false;
			}
			
			if (viewName == 'LCFD2004') {
				config = {
					component: LCFD2004,
					params : {
						asetCtgrLclc    : '1',	            // 자산카테고리대분류코드 1:지출, 2:마이농가
						asetCtgrDsc     : '2',	            // 자산카테고리구분코드   1:수입, 2:지출
						ctgrFxtmDsc		: '1',           	// 카테고리정기지출구분	  1:카테고리, 2:정기지출
						selectList      : this.selectList,  // inqKey : 조회키
						reqPage		    : 'LCIP2005',
						asetAmnCtgrId   : ''
					}
				}
			}
			
			console.log('[LCIP2005]selectList===',this.selectList)
			modalService.openPopup(config).then(response => {
				if(response === 'complete') {
					this.getData()
				}
			});
		},
        // 일자별 내림차순 정렬
        modifyList(objArray){
            // 정렬기준이 되는 필드(날짜와 요일) 새로 만들어 정렬
            // 정정이 있는 경우 정정일자와 요일, 그외엔 승인일자와 요일
            let list = []
            for(var i=0;i<objArray.length;i++){
                list.push(objArray[i])

                list[i].dtForList   = objArray[i].trDt
                list[i].dowForList  = getDayDowCName(objArray[i].trDt)
            }
            let result = _.chain(list)
                .uniqBy('dtForList')
                .map(d => {
                    return {
                        dtForList   : d.dtForList,
                        dowForList  : d.dowForList,
                        list		: _.filter(list, {dtForList : d.dtForList})
                    }
                })
                .orderBy('dtForList', 'desc')
                .value()
            return result
        },
		fn_modChkItem() {
			let temp = event.target.value.split('#')
			if(event.target.checked) {
                this.selectList.push({inqKey : temp[0], dataSrcDsc : temp[1], prcMchtnm : temp[2]})
			} 
			else {
				const idx = this.selectList.indexOf(_.find(this.selectList, {"inqKey":temp[0]}))
				this.selectList.splice(idx, 1)
			}
			console.log('this.selectList===',this.selectList)
        },
		fn_closePop(){
			this.close('complete')
		}
    },
    mixins: [
        commonMixin,
        popupMixin,
    ],
    components: {      
        //LCIP1010
    }
}
</script>