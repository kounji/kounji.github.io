<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 손익분석 > 들어올 돈 내역
* @ 페이지설명 : 들어올 돈 내역
* @ 파일명     : src/views/page/SZ/FP/SZFP2109/SZFP2109.vue
* @ 작성자     : CS523299
* @ 작성일     : 2021-08-27
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-08-27			  CS523299			    최초작성
*************************************************************************/
-->
<template>
   <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>{{inqDscNm}} 내역</h1>
		</div>
		<div class="popup_content com_bg_type00 com_no_bottom">
            <div class="com_inner com_line_type01">
                <div class="top_info_box">
					<div class="fs18 bold">
						<span class="num">{{nextYear}}</span>년 <span class="num">{{nextMonth}}</span>월
					</div>
					<p class="txt fs18 bold mt15">
						{{inqDscNm}}
					</p>
					<div class="bill">
						<span class="num counter" :data-count="trSam">{{trSam | numberFilter}}</span>원
                        <!-- <span class="num counter" v-if="Number.isInteger(trSam)">{{trSam | numberFilter}}</span>원 -->
					</div>
				</div>
            </div>
            <template v-if="crdInqCn > 0">
                <ul class="list_more_box">
                    <li v-for="(crdInqListItem, idx) in this.crdInqList" :key="idx">
                        <div class="com_inner">
                            <div class="new_tit_area">
                                <div class="tit"><span>{{crdInqListItem.crdDscnm}}</span></div>
                                <div class="total_price">
                                    <em class="num">{{crdInqListItem.crdDscTtAm | numberFilter}}</em><em class="unit">원</em>
                                </div>
                            </div>
                            <template v-if="crdInqListItem.asetCn > 0">
                                <ul class="list_type_02">
                                    <li v-for="(asetListItem, idx2) in crdInqListItem.asetList" :key="idx2">
                                        <dl>
                                            <dt>
                                                <div>
                                                    <em>{{asetListItem.titnm}}</em>
                                                </div>
                                                <span>
                                                    <span>{{asetListItem.rpyPlaDt | dateFilter('YY.MM.DD')}}</span>
                                                </span>
                                            </dt>
                                            <dd>
                                                <span class="com_price">
                                                    <em class="num ">{{asetListItem.tram | numberFilter}}</em><em class="unit">원</em>
                                                </span>
                                            </dd>
                                        </dl>
                                    </li>
                                </ul>
                            </template>
                            <div class="com_space_type01"></div>
                        </div>
                    </li>
                </ul>
                <!-- 나갈 돈 경우만(영농자금대출) -->
                <template v-if="this.inqDsc=='2'">
                    <!-- 20211015 한별 문구 추가 S -->
                    <div class="com_inner">
                        <p class="dot_msg mt18">영농자금대출 금액은 이자가 포함되지 않은 대출원금에 대한 월 상환액을 보여주고 있습니다. 자세한 사항은 영업점에 문의 바랍니다.</p>
                    </div>
                </template>
            </template>
            <template v-else>
                <!-- 조회내역이 없을경우 S -->
                <div class="no_data_box">
                    <div class="no_data_list">
                        <p>조회된 정보가 없습니다.</p>
                    </div>
                </div>
                <!--// 조회내역이 없을경우 E -->
            </template>
		</div>
		<a href="javascript:void(0);" role="button" @click.prevent="close()" class="btn_close"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>
<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'

export default {
    name : "SZFP2109",
    data: () => {
        return {
            // 초기값
            inqDsc      : "",   // 1 : 들어올 돈, 2: 나갈 돈
            inqDscNm    : "",   // 구분명
            year        : "",   // 현재년
            month       : "",   // 현재월 
            trSam       : "",   // 거래금액합계 
            crdInqCn    : 0,    // 외상조회건수    
            crdInqList  : [],   // 외상조회목록    
            asetList    : [],   // 자산목록  
            nextMonth   : "",   // 다음달
            nextYear    : "",   // 다음달에 해당하는 년
        }
    },
    created() {
      const date        = new Date()
      this.year         = date.getFullYear()    //현재년
      this.month        = date.getMonth() +1    //현재월 
    },
    computed: {
        
    },
    mixins: [
		popupMixin,
		commonMixin
    ],
    mounted() {
        this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
		initComponent(param = {}) {
            // console.log("param=", param)
            this.inqDsc     = param.inqDsc;
            this.nextMonth  = param.nextMonth;
            this.nextYear   = param.nextYear;
            if(this.inqDsc == "1"){
                this.inqDscNm = "들어올 돈";
            }else{
                this.inqDscNm = "나갈 돈";
            }
            
            this.getData(param)
        },
        getData(param){
            this.fn_getCrdInqList(param)
        }, 
        // 채권채무상세조회
        fn_getCrdInqList(param){

			const config = {
                url: '/sz/fp/09r01',
                data: param
            }

            apiService.call(config).then(response => {

                this.trSam      = response.trSam        // 거래금액합계         
                this.crdInqCn   = response.crdInqCn     // 외상조회건수        
                this.crdInqList = response.crdInqList   // 외상조회목록        
                this.asetList   = response.asetList     // 자산목록    
            })
        }
	},
}
</script>