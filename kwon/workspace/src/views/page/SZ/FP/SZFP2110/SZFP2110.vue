<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 손익분석 > 카테고리별 상세(예:주산물/부산물/기타외 수익)
* @ 페이지설명 : 카테고리별 상세(예:주산물/부산물/기타외 수익)
* @ 파일명     : src/views/page/SZ/FP/SZFP2110/SZFP2110.vue
* @ 작성자     : CS523299
* @ 작성일     : 2021-11-15
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-11-15			  CS523299			    최초작성
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
                            <span class="content">총수입 <span class="depth"></span><strong>{{myFhsCtgrNm}}</strong>
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

            <!-- 월 선택 항목 추가 20211201_한윤석--> 
            <div class="com_inner">
                <div class="select_date  mt40">
                    <!--좌우 버튼에 disabled 클래스 추가 시 disabled 버튼 -->
                    <button  :disabled="this.monthDisabled_p==='disabled'" :class="'cal_btn cal_prev '+ this.monthDisabled_p" :title="this.monthDisabled_p=='disabled'? '선택 불가' : '선택 가능'"  @click.prevent="selectClamp('p')"  aria-label="한달 전 이동"></button>   
                    <a title="월선택" href="javascript:void(0);" class="year_month" @click.prevent="fn_selectMonth()"><span class="num">{{Number(this.corMm)}}</span>월</a>
                    <button :disabled="this.monthDisabled_n==='disabled'" :class="'cal_btn cal_next '+ this.monthDisabled_n" :title="this.monthDisabled_n=='disabled'? '선택 불가' : '선택 가능'" @click.prevent="selectClamp('n')" aria-label="한달 후 이동"></button>  <!--월 다음 선택-->  
                </div>
            </div>

            <template v-if="this.addInqList.length > 0">
                <ul class="list_more_box">
                    <li>
                        <div class="com_inner">
                            <template v-if="this.addInqList.length > 0">
                                <ul class="list_type_02" >
                                    <li v-for="(addInqListItem, idx2) in this.addInqList" :key="idx2">
                                        <dl>
                                            <dt>
                                                <div>
                                                    <em>{{addInqListItem.titnm}}</em>
                                                </div>
                                                <span>
                                                    <!-- 서비스 측에서 날짜와 업무구분명 조합하여 보내줌. -->
                                                    <!-- <span>{{mmInqListItem.trDt | dateFilter('YY.MM.DD')}}</span> -->
                                                    <span>{{addInqListItem.subTitnm}}</span>
                                                </span>
                                            </dt>
                                            <dd>
                                                <span class="com_price">
                                                    <em class="num ">{{addInqListItem.tram | numberFilter}}</em><em class="unit">원</em>
                                                </span>
                                            </dd>
                                        </dl>
                                    </li>
                                </ul>
                            </template>
                            <template v-else>
                                <!-- 당월 비료비 내역이 없을시 S -->
                                <div class="new_tit_area">
                                    <div class="tit"><em>{{addInqListItem.corMm}}</em><span>월</span></div>
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
                <div class="com_inner">
                    <div class="com_btn_area00"><a href="javascript:void(0);" role="button" @click="fn_getListNextPage()" class="com_btn_more" v-show="lsPageYn == '0'"><span>더보기</span></a></div>
                </div>
            </template>
            <template v-else>
                <!-- 조회내역이 없을경우 S -->
                <div class="no_data_box">
                    <div class="no_data_list">
                        <p>해당 월에 조회된 정보가 없습니다.</p>
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
import modalService from '@/service/modalService'

export default {
    name : "SZFP2110",
    data: () => {
        return {
            naWrsSclfnm     : "",   // 경제통합상품소분류명
            totTram         : 0,    // 총거래금액
            inqCn           : 0,    // 조회건수
			inqList         : [],   // 조회목록
            mmInqList       : [],   // 월조회목록
            myFhsCtgrNm     : "",
            inqYy           : "",
            currentMonth    : "",   // 현재 월
            naWrsLclc 	    : "",	// 경제통합상품대분류코드
            naWrsMclc 	    : "",	// 경제통합상품중분류코드
            naWrsSclc 	    : "",	// 경제통합상품소분류코드
            myfhsCtgrExpl   : "",
            monthDisabled_p : "",
            monthDisabled_n : "disabled", 
            preMonth        : "",   // 전 달
            nextMonth       : "",   // 다음달
            month           : "",   // 현재월(실제)
            addInqList      : [],
            corMm           : 0,    // 해당월
            lsPageYn        : 0,    // 최종페이지여부
            nextPageNum     : 0     // 다음페이지번호
        }
    },
    computed: {
        
    },
    mixins: [
		popupMixin,
		commonMixin
    ],
	created() {
        const date  = new Date()
        this.year   = date.getFullYear()    					// 년
		this.month  = ("0" + (date.getMonth() +1)).slice(-2)  	// 현재월(실제) 
    }, 
    mounted() {
        this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {

		initComponent(param = {}) {

            this.getData(param)

        },
        getData(param = {}){

            this.inqYy          = param.inqYy
            this.currentMonth   = param.currentMonth// 현재 월
            this.myFhsCtgrNm    = param.myFhsCtgrNm // 마이농가카테고리명
            this.inqDsc         = param.inqDsc      // 조회구분코드
            this.myFhsCtgrid    = param.myFhsCtgrid // 마이농가카테고리ID
            this.naWrsLclc      = param.naWrsLclc	// 경제통합상품대분류코드
            this.naWrsMclc      = param.naWrsMclc	// 경제통합상품중분류코드
            this.naWrsSclc      = param.naWrsSclc	// 경제통합상품소분류코드
            this.myfhsCtgrExpl  = param.myfhsCtgrExpl
            this.inqMm          = param.currentMonth
            this.corMm          = param.currentMonth
            this.pageNum        = 1
            this.fn_getPnlInfoList(param)

        }, 
        //[이전/이후 꺽쇠]선택시(추가 개발 부분)
        selectClamp(flag){

            //이전 꺽쇠 AND 월이 00인 경우,    
            if (flag === 'p') {

                this.monthDisabled_n = ""
                this.corMm = Number(this.corMm) - 1
                this.preMonth =  Number(this.corMm) - 1   

                if(this.corMm == "1"){

                    this.monthDisabled_p = "disabled" 
                    this.monthDisabled_n = ""

                }else{

                    this.monthDisabled_p = ""  

                }  

            } else if (flag === 'n') {

                this.monthDisabled_p = ""  
                this.corMm = Number(this.corMm)+ 1
                this.preMonth =  Number(this.corMm) - 1   
                
                if(this.corMm > this.month){

                    this.monthDisabled_n = "disabled"
                    this.corMm = this.month

                }else if(this.corMm == this.month){
                    
                    // param에 현재 조회 대상 월 corMm을 세팅 해줘야함.(인터페이스 정의서 컬럼 정의 되면 다시 확인하여 세팅명 변경) 
                    this.monthDisabled_n = "disabled"

                }else{

                    this.monthDisabled_n = ""  
                    
                }           
            } 

            this.pageNum    = 1         // 페이징 초기화 
            this.addInqList = []	    // 초기화           
            this.fn_getPnlInfoList()    // 해당 정보 조회 함수 호출

		},
        // 카테코리별 목록 조회
        fn_getPnlInfoList(){

            const config = {
                url: '/sz/fp/04r02',
                data: {
                    mydtCusno 	    : this.getUserInfo("mydtCusno"),	// 마이데이터고객번호
                    inqYy 		    : this.inqYy,						// 조회년도
                    inqMm           : this.corMm,                       // 조회월 
                    myFhsCtgrid     : this.myFhsCtgrid,                 // 마이농가카테고리ID
                    inqDsc 		    : this.inqDsc,						// 조회구분코드
                    naWrsLclc 	    : this.naWrsLclc,				    // 경제통합상품대분류코드
                    naWrsMclc 	    : this.naWrsMclc,				    // 경제통합상품중분류코드
                    naWrsSclc 	    : this.naWrsSclc,					// 경제통합상품소분류코드
                    pageNum         : this.pageNum                      // 페이지번호                 
                }
            }

            apiService.call(config).then(response => {

                this.naWrsSclfnm    = response.naWrsSclfnm  // 경제통합상품소분류명 
                this.totTram        = response.totTram      // 조회건수           
                this.inqCn          = response.inqCn        // 조회건수        
                this.inqList        = response.inqList      // 조회목록(월별)      
                this.lsPageYn       = response.lsPageYn     // 최종페이지여부
                this.nextPageNum    = response.nextPageNum  // 다음페이지번호
                this.lsPageYn	    = response.lsPageYn	    // 최종페이지여부 
                let tmpInqList 	    = response.inqList || []
				if(this.addInqList.length > 0) {
					for(let i=0; i< tmpInqList.length; i++) {
						this.addInqList.push(tmpInqList[i])
					}
				} else {
					this.addInqList = tmpInqList
                }

            }).then(()=>{
                this.callJQueryFncExcute()
            })

        },
        // 더보기
        fn_getListNextPage(){

            this.pageNum++
            this.fn_getPnlInfoList()

        },
        // 월 선택 팝업 호출
        fn_selectMonth(){

            // 년월선택
            const config1 = {
                params: {
                    title: '월 선택',
                    yyyymm : this.inqYy + '' + this.currentMonth,
                    isShowYearSelect : 'N',
                    limit  : this.month-1,
                },
            }

            const config2 = {
                params: {
                    title: '월 선택',
                    yyyymm : this.inqYy + '' + this.currentMonth,
                    isShowYearSelect : 'N'
                },
            }

            let config = {}
            if(this.year == this.inqYy){
                config = config1
            }else{
                config = config2
            }

            modalService.openSlideSelectMonth(config).then(response => {// openSelectMonth
                this.inqYy = response.substring(0,4)
                this.corMm = response.substring(4,6) != null?Number(response.substring(4,6)):response.substring(4,6)

                // 전월 버튼
                if(this.corMm == "01" || this.corMm == "1" ){

                    this.monthDisabled_p = "disabled" 
                    this.monthDisabled_n = ""

                }else{

                    this.monthDisabled_p = ""  

                } 

                // 다음달 버튼
                if(this.corMm > this.month){

                    this.monthDisabled_n = "disabled"
                    this.corMm = this.month

                }else if(this.corMm == this.month){
                    
                    // param에 현재 조회 대상 월 corMm을 세팅 해줘야함.(인터페이스 정의서 컬럼 정의 되면 다시 확인하여 세팅명 변경) 
                    this.monthDisabled_n = "disabled"

                }else{

                    this.monthDisabled_n = ""  

                } 

                this.pageNum    = 1         // 페이징 초기화 
                this.addInqList = []	    // 초기화       
                this.fn_getPnlInfoList()    // 조회
            })

        }
	},
}
</script>