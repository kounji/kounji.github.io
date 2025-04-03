<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 손익분석 > 상각비 상세
* @ 페이지설명 : 상각비 상세
* @ 파일명     : src/views/page/SZ/FP/SZFP2105/SZFP2105.vue
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
			<h1>상각비 상세</h1>
		</div>
		<div class="popup_content com_bg_type00 com_no_bottom">
            <div class="com_inner com_line_type01">
                <div class="select_date m0 mt20">
                    <span class="num">{{inqYy}}</span>년
                    <!-- 20211007 삭제 요청 -->
                    <!-- <span class="num">{{Number(this.currentMonth)}}</span>월 -->
                </div>
                <div class="com_box_type01 mt15 new_mb15">
                    <div class="cate_wrap border">
                        <div class="cate">
                            <span class="title">카테고리</span>
                            <span class="content">생산비 <span class="depth"></span> 경영비 <span class="depth"></span> <strong>상각비</strong>
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
					<div class="tit"><span> 상각비 총액</span></div>
					<div class="total_price">
						<em class="num fs29">{{rdmTotAm | numberFilter}}</em>
						<span class="fs22">원</span>
					</div>
				</div>
            </div>
            <div class="com_inner">
                <div class="new_tit_area">
                    <div class="tit"><span>농기계 상각 목록</span></div><!-- 20210820 한별 텍스트 수정 -->
                </div>
                    <template v-if="inqList.length > 0">
                        <ul class="list_type_02 expand">
                            <li v-for="(inqListItem, idx) in this.inqList" :key="idx">
                                <!-- 서비스 측에서 이미 처분일자 당해년도만 노출되게 구현되여 있음. rmDate컬럼에 처분일자 한글과 날짜가 거나 내용연수가 혼합되여 화면상에서 구현하기는 어려움. -->
                                <a href="javascript:void(0);" @click.prevent="fn_rdmAmDtlPopup(inqListItem.fmachDsnm, inqListItem.sqno, inqListItem.rdmPrd)" role="button">
                                    <dl>
                                        <dt><em>{{inqListItem.fmachDsnm}}</em></dt>
                                        <dd v-show="inqListItem.mftConm != null"><span>{{inqListItem.mftConm}}</span></dd>
                                        <dd><span v-show="inqListItem.rdmPrd != null">상각기간: {{inqListItem.rdmPrd}}개월</span><span  v-show="inqListItem.dpsDt != ''">처분일자: {{inqListItem.dpsDt}}</span></dd>
                                        <dd><span v-show="inqListItem.cntnYrcn != null">내용년수(개월): {{inqListItem.cntnYrcn}}개월</span></dd>
                                        <dd class="kind">{{inqListItem.abiUgRto}}</dd>
                                        <!-- 20211103 추가 상각비 계산 :  -->
                                        <dd class="kind" v-show="inqListItem.rdmAmClc != null">상각비 계산: {{inqListItem.rdmAmClc}}</dd> 
                                        <dd class="kind" v-show="inqListItem.rdmAm != null">상각액: {{inqListItem.rdmAm  | numberFilter}}<em>원</em></dd> 
                                    </dl>
                                </a>
                                <!-- <div class="new_tit_area"></div> -->
                            </li>
                        </ul>   
                        <!-- 20211104 한별 수정 S -->
                        <ul class="bl_dot_list one_register_list mt0">
                            <!-- <li>농기계별 상각액 = (구입금액 ÷ 내용년수(개월)) × 상각기간(개월) × 품목별비율(%) (작목비율이 0%이 아닌 경우에만 상각비에 반영됨)</li> -->
                            <li>농기계별 상각액 = {구입금액 ÷ 내용년수(개월 수)}(소수점 첫째자리 반올림) × 상각기간(개월) × 작목별비율(%)</li>
                            <li>나의농장 선택 시 작목비율은 100%로 계산됩니다.</li>
                            <li>상각액은 원단위 미만 절사 계산이 적용된 값입니다.</li>
                        </ul>
                <!--// 20211104 한별 수정 E -->
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
		</div>
		<a href="javascript:void(0);" @click.prevent="close()" class="btn_close" role="button"><span class="blind">팝업닫기</span></a>	
	</div>
	<!--// full popup E -->
</template>
<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import SZFP2106 from '@/views/page/SZ/FP/SZFP2106/SZFP2106'

export default {
    name : "SZFP2105",
    data: () => {
        return {
            fmachDsnm       : "",   // 농기계구분명
            naWrsSclfnm     : "",   // 경제통합상품소분류명
            sqno            : "",   // 일련번호
            inqDsc          : "",   // 조회구분코드
			inqList         : [],   // 조회목록
			naWrsLclc 	    : "",	// 경제통합상품대분류코드
            naWrsMclc 	    : "",	// 경제통합상품중분류코드
			naWrsSclc 	    : "",	// 경제통합상품소분류코드
			rdmTotAm	    : 0,
            inqYy		    : "",   // 조회년도
            myfhsCtgrExpl   : "",
            currentMonth    : "",   // 현재 월
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
		getData(param = {}){
            this.fn_getRdmAmList(param)
            this.inqYy          =  param.inqYy
            this.sqno           =  param.sqno
            this.inqDsc         =  param.inqDsc
            this.naWrsLclc      =  param.naWrsLclc	// 경제통합상품대분류코드
            this.naWrsMclc      =  param.naWrsMclc	// 경제통합상품중분류코드
            this.naWrsSclc      =  param.naWrsSclc	// 경제통합상품소분류코드
            this.myfhsCtgrExpl  =  param.myfhsCtgrExpl	
            this.currentMonth   = param.currentMonth// 현재 월
            
		},
		// 상각비 상세 목록 조회
        fn_getRdmAmList(param = {}){

			const config = {
                url: '/sz/fp/05r01',
                data: param
            }

            // console.log("config=", config)
            apiService.call(config).then(response => {

                this.mydtCusno      = response.mydtCusno    // 마이데이터고객번호  
                this.naWrsSclfnm    = response.naWrsSclfnm  // 경제통합상품소분류명
                this.rdmTotAm       = response.rdmTotAm     // 상각비총금액        
                this.inqList        = response.inqList      // 조회목록        
            })
        },
        // 상각비 상세조회 팝업 호출
        fn_rdmAmDtlPopup(fmachDsnm, sqno, rdmPrd){
			//상세 팝업 호출
			const config = {
				component: SZFP2106, 
				params: { // 파라미터
					"mydtCusno" : this.getUserInfo("mydtCusno"),
                    "sqno"      : sqno,
                    "rdmPrd"    : rdmPrd,
                    "inqDsc"    : this.inqDsc,
                    "naWrsLclc" : this.naWrsLclc,
                    "naWrsMclc" : this.naWrsMclc,
                    "naWrsSclc" : this.naWrsSclc,
                    "fmachDsnm" : fmachDsnm
				}
            }
            
            // console.log("config=", config)
			modalService.openPopup(config)	
        }
	},
}
</script>