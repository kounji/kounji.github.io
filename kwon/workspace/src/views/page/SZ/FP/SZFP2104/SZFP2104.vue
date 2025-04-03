<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 손익분석 > 카테코리별 상세(예:비료비)
* @ 페이지설명 : 카테코리별 상세(예:비료비)
* @ 파일명     : src/views/page/SZ/FP/SZFP2104/SZFP2104.vue
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
			<h1>{{myFhsCtgrNm}} 상세</h1>
		</div>
		<div class="popup_content com_bg_type00 com_no_bottom">
            <div class="com_inner com_line_type01">
                <div class="select_date m0 mt20">
                    <span class="num">{{inqYy}}</span>년
                </div>
                <div class="com_box_type01 mt15 new_mb15">
                    <div class="cate_wrap border">
                        <div class="cate">
                            <span class="title">카테고리</span>
                            <span class="content">생산비 <span class="depth"></span> 경영비 <span class="depth"></span> <strong>{{myFhsCtgrNm}}</strong>
                            <!---20210817 한별 툴팁 아이콘 크기 및 정렬 수정 S--->
                            <div class="com_tooltip_type02 com_tooltip_type03">
                                <a href="javascript:void(0);" class="com_btn_info">
                                    <em class="com_icon_info3"><span class="blind">툴팁열기</span></em>                  
                                    <!--!!!!!!!!!!!툴팁 화살표 관련 : 툴팁 클릭시 display : block 
                                        , 툴팁 닫을 때 display : none 처리 부탁드립니다!!!!!!!!!-->
                                    <span class="arrow" style="display:none"></span>
                                    <!--!!!!!!!!!!!툴팁 화살표 관련 : 툴팁 클릭시 display : block 
                                        , 툴팁 닫을 때 display : none 처리 부탁드립니다!!!!!!!!!-->
                                </a>                          
                                <div class="com_ballon_type01 com_ballon_type02" style="display:none;">       
                                    <div>
                                        <!-- {{myfhsCtgrExpl}} -->
                                        <span v-html=myfhsCtgrExpl></span>
                                        <a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
                                    </div> <!-- 말풍선영역 -->
                                </div>
                            </div>  
                        <!---20210817 한별 툴팁 아이콘 크기 및 정렬 수정 E--->
                        </span>
                        </div>
                        <div class="cate mt10">
                            <span class="title">작&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;목</span>
                            <span class="content">{{naWrsSclfnm}}</span>
                        </div>
                    </div>
                </div>
				<div class="new_tit_area no-stroke mb25">
					<div class="tit"><span> {{myFhsCtgrNm}} 총액</span></div>
					<div class="total_price">
						<em class="num fs29">{{totTram | numberFilter}}</em>
						<span class="fs22">원</span>
					</div>
				</div>
            </div>
            <template v-if="this.inqList.length > 0">
                <ul class="list_more_box">
                    <li v-for="(inqListItem, idx) in this.inqList" :key="idx">
                        <div class="com_inner">

                            <div class="new_tit_area">
                                <div class="tit"><em>{{inqListItem.corMm}}</em><span>월</span></div>
                                <div class="total_price">
                                    <em class="num">{{inqListItem.mmTramtt | numberFilter}}</em><em class="unit">원</em>
                                </div>
                            </div>
                            <template v-if="inqListItem.mmInqList.length > 0">
                                <ul class="list_type_02" v-for="(mmInqListItem, idx2) in inqListItem.mmInqList" :key="idx2">
                                    <li>
                                        <dl>
                                            <dt>
                                                <div>
                                                    <em>{{mmInqListItem.titnm}}</em>
                                                </div>
                                                <span>
                                                    <!-- 서비스 측에서 날짜와 업무구분명 조합하여 보내줌. -->
                                                    <!-- <span>{{mmInqListItem.trDt | dateFilter('YY.MM.DD')}}</span> -->
                                                    <span>{{mmInqListItem.subTitnm}}</span>
                                                </span>
                                            </dt>
                                            <dd>
                                                <span class="com_price">
                                                    <em class="num ">{{mmInqListItem.tram | numberFilter}}</em><em class="unit">원</em>
                                                </span>
                                            </dd>
                                        </dl>
                                    </li>
                                </ul>
                            </template>
                            <template v-else>
                                <!-- 당월 비료비 내역이 없을시 S -->
                                <div class="new_tit_area">
                                    <div class="tit"><em>{{inqListItem.corMm}}</em><span>월</span></div>
                                </div>
                                <ul class="list_type_02">
                                    <li>
                                        <div class="dot_space">
                                            <div class="dot_msg">당월 비료비 내역이 없습니다.</div>
                                        </div>
                                    </li>
                                </ul>
                                <!--// 당월 비료비 내역이 없습니다. E -->
                            </template>
                        </div>
                        <div class="com_space_type01"></div>
                    </li>
                </ul>
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
		<a href="javascript:void(0);" @click.prevent="close()" class="btn_close" role="button"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>
<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'

export default {
    name : "SZFP2104",
    data: () => {
        return {
            naWrsSclfnm : "",   // 경제통합상품소분류명
            totTram     : 0,    // 총거래금액
            inqCn       : 0,    // 조회건수
			inqList     : [],   // 조회목록
            mmInqList   : [],   // 월조회목록
            myFhsCtgrNm : "",
            inqYy       : "",
            currentMonth: "",   // 현재 월
            naWrsLclc 	: "",	// 경제통합상품대분류코드
            naWrsMclc 	: "",	// 경제통합상품중분류코드
            naWrsSclc 	: "",	// 경제통합상품소분류코드
            myfhsCtgrExpl: "",
        }
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
            this.getData(param)
        },
        getData(param){
            this.fn_getPnlInfoList(param)
            this.inqYy          = param.inqYy
            this.currentMonth   = param.currentMonth// 현재 월
            this.myFhsCtgrNm    = param.myFhsCtgrNm // 마이농가카테고리명
            this.naWrsLclc      = param.naWrsLclc	// 경제통합상품대분류코드
            this.naWrsMclc      = param.naWrsMclc	// 경제통합상품중분류코드
            this.naWrsSclc      = param.naWrsSclc	// 경제통합상품소분류코드
            this.myfhsCtgrExpl  = param.myfhsCtgrExpl
        }, 
        // 카테코리별 목록 조회
        fn_getPnlInfoList(param){
            const config = {
                url: '/sz/fp/04r01',
                data: param
            }

            // console.log("config=", config)
            apiService.call(config).then(response => {

                this.naWrsSclfnm    = response.naWrsSclfnm  // 경제통합상품소분류명 
                this.totTram        = response.totTram      // 조회건수           
                this.inqCn          = response.inqCn        // 조회건수        
                this.inqList        = response.inqList      // 조회목록        
                this.mmInqList      = response.mmInqList    // 월별조회목록  
            })
        },
	},
}
</script>