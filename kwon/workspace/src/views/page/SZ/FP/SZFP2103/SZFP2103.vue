<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 손익분석 > 영농수익분석 상세(자가노동비상세)
* @ 페이지설명 : 영농수익분석 상세(자가노동비상세)
* @ 파일명     : src/views/page/SZ/FP/SZFP2103/SZFP2103.vue
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
	<div id="full_popup_01" class="full_popup" > 
		<div class="popup_header">    
			<h1>자가노동비 상세</h1>
		</div>
		<div class="popup_content com_bg_type00 com_no_bottom">
            <div class="com_inner">
                <div class="select_date m0 mt20">
                    <span class="num">{{inqYy}}</span>년
                </div>
                <div class="com_box_type01 mt15 mb0">
                    <div class="cate_wrap border">
                        <div class="cate">
                            <span class="title">카테고리</span>
                            <span class="content">생산비 <span class="depth"></span> <strong>자가노동비</strong> 
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
                                    <span v-html=pdcsHdngExpl></span>
                                    <span class="arrow" style="display:none"></span>
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
            </div>
            <template v-if="this.inqList.length > 0 && this.rowCnt > 0">
                <ul class="list_more_box">
                    <li v-for="(inqListItem, idx) in this.inqList" :key="idx">
                        <div class="com_inner">
                            <!-- 8월 -->
                            <div class="new_tit_area">
                                <div class="tit"><em>{{inqListItem.corMm}}</em><span>월</span></div>
                                <div class="total_price">
                                    <em class="num">{{inqListItem.mmLabrAmtt | numberFilter}}</em><em class="unit">원</em>
                                </div>
                            </div>
                            <template v-if="inqListItem.mmInqList.length > 0">
                                <ul class="list_type_02 list_type_etc" v-for="(mmInqListItem, idx2) in inqListItem.mmInqList" :key="idx2">
                                    <li>
                                        <strong>{{mmInqListItem.corDt | dateFilter('YYYY.MM.DD')}}</strong>
                                        <dl>
                                            <dt>
                                                <div>
                                                    <em>남자<span>({{mmInqListItem.maleLabrTm !=''? mmInqListItem.maleLabrTm : '0시간'}})</span></em>
                                                </div>
                                            </dt>
                                            <dd>
                                                <span class="com_price">
                                                    <em class="num ">{{mmInqListItem.maleLabrAm | numberFilter}}</em><em class="unit">원</em>
                                                </span>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt>
                                                <div>
                                                    <em>여자<span>({{mmInqListItem.femaleLabrTm !=''? mmInqListItem.femaleLabrTm : '0시간'}})</span></em>
                                                </div>
                                            </dt>
                                            <dd>
                                                <span class="com_price">
                                                    <em class="num ">{{mmInqListItem.femaleLabrAm  | numberFilter}}</em><em class="unit">원</em>
                                                </span>
                                            </dd>
                                        </dl>
                                    </li>
                                </ul>
                            </template>
                            <!-- 자가노동비 등록 정보가 없는 경우 : 당월 자가노동비 내역이 없습니다. 메시지 노출 -->
                            <template v-else>
                                <ul class="list_type_02 list_type_etc">
                                    <li>
                                        <div class="dot_space">
                                            <div class="dot_msg">당월 자가노동비 내역이 없습니다.</div>
                                        </div>
                                    </li>
                                </ul>
                                <!--// 8월 -->
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
                        <p>등록된 자가노동비가 없습니다.</p>
                    </div>
                </div>
                <!--// 조회내역이 없을경우 E -->
                <div class="info_box_bottom">
                    <strong>자가노동비 노출방법 </strong>
                    <ul>
                        <li>설정에서 자가노동비용을 설정 합니다.</li>
                        <li>영농일지 메뉴에서 일지등록 시 자가인력 정보를 입력해주세요.</li>
                    </ul>
                </div>
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
    name : "SZFP2103",
    data: () => {
        return {
            naWrsSclfnm     : "",   // 경제통합상품소분류명
            inqCn           : 0,    // 조회건수
			inqList         : [],   // 조회목록
            mmInqList       : [],   // 월조회목록
            inqYy           : "",
            naWrsLclc 	    : "",	// 경제통합상품대분류코드
            naWrsMclc 	    : "",	// 경제통합상품중분류코드
            naWrsSclc 	    : "",	// 경제통합상품소분류코드
            myfhsCtgrExpl   : "",
            pdcsHdngExpl    : "",
            currentMonth    : "",   // 현재 월
            rowCnt          : 0     // 조회 년수 일자별 건수
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
            this.fn_getMmLabrList(param)
            this.inqYy          =  param.inqYy
            this.naWrsLclc      =  param.naWrsLclc	// 경제통합상품대분류코드
            this.naWrsMclc      =  param.naWrsMclc	// 경제통합상품중분류코드
            this.naWrsSclc      =  param.naWrsSclc	// 경제통합상품소분류코드
            this.myfhsCtgrExpl  =  param.myfhsCtgrExpl	
            this.pdcsHdngExpl   =  param.pdcsHdngExpl
            this.currentMonth   =  param.currentMonth// 현재 월
        }, 
        // 자가노동비상세조회 월별 목록 조회
        fn_getMmLabrList(param){

			const config = {
                url: '/sz/fp/03r01',
                data: param
            }

            // console.log("config=", config)
            apiService.call(config).then(response => {
                this.naWrsSclfnm    = response.naWrsSclfnm  // 경제통합상품소분류명            
                this.inqCn          = response.inqCn        // 조회건수        
                this.inqList        = response.inqList      // 조회목록        
                this.mmInqList      = response.mmInqList    // 월별조회목록 
                
                // 해당년에 일별건수 존재 여부 확인 처리 추가
                for(let i=0; i<this.inqList.length; i++) {// rowCnt
                    this.mmInqList = this.inqList[i].mmInqList 
                    for(let j=0; j<this.mmInqList.length; j++) {
                        this.rowCnt++
                        // console.log("this.rowCnt=", this.rowCnt)
                    }
                }
            })
        }
	},
}
</script>