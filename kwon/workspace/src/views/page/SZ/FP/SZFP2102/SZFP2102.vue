<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 손익분석 > 영농수익분석 상세
* @ 페이지설명 : 영농수익분석 상세
* @ 파일명     : src/views/page/SZ/FP/SZFP2102/SZFP2102.vue
* @ 작성자     : CS523299
* @ 작성일     : 2021-08-12
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-08-12			  CS523299			    최초작성
*************************************************************************/
-->
<template>
   <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>영농수익분석</h1>
		</div>
		<div class="popup_content com_bg_type00 com_no_bottom">
            <div class="com_inner com_boxarea_type03">
                <div class="com_box_type01 com_box_list02">
                    <div class="list_type_box toggle_list_box2">
                        <div class="com_boxshadow_type01 open"  data-ui-toggle="box">
                            <button type="button" class="view_btn" aria-expanded="true">
                                <dl class="tit_list">
                                    <dt><em>총수입</em></dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{totRevAm | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                                <!-- <em class="open">열기</em>
                                <em class="close">닫기</em> 20211108 한별 접근성 삭제 -->
                            </button>
                        </div>
                        <ul class="list_type_02 view_cont">
                            <!-- 주산물 / 부산물 / 기타외 수익 --> 
                            <li v-for="(revListItem, idx) in this.revList" :key="idx">
                                <a href="javascript:void(0);" @click.prevent="fn_ftlzAmPopup(revListItem.myfhsCtgrid, revListItem.myfhsCtgrnm, revListItem.myfhsCtgrExpl)" role="button">
                                    <dl>
                                        <dt>
                                            <div><em>{{revListItem.myfhsCtgrnm}}</em></div>
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                                <em class="num ">{{revListItem.am | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="com_box_type01 com_boxsub_type01">
                    <div class="list_type_box toggle_list_box2">
                        <div class="com_boxshadow_type01 open"  data-ui-toggle="box">
                            <button type="button" class="view_btn" aria-expanded="true">
                                <dl class="tit_list">
                                    <dt><em>생산비</em></dt>
                                    <dd>
                                        <span class="com_price">
                                            <em class="num">{{pdcsAm | numberFilter}}</em><em class="unit">원</em>
                                        </span>
                                    </dd>
                                </dl>
                                <!-- <em class="open">열기</em>
                                <em class="close">닫기</em> 20211108 한별 접근성 삭제 -->
                            </button>
                        </div>
                        <ul class="list_type_02 list_subtype01 view_cont">
                            <!-- 생산비목록(경영비 / 자가로동비) -->
                            <!-- 20210914 한별 class="link" 추가 S -->
                            <li class="link" v-for="(pdcsListItem, idx) in this.pdcsList" :key="idx">
                                <!-- 경영비 경우 pdcsHdngcd = 1 -->
                                <template v-if="pdcsListItem.pdcsHdngcd == '1'">
                                    <dl>
                                        <dt>
                                            <div><em>{{pdcsListItem.pdcsHdngnm}}</em></div>											
                                        </dt>
                                        <dd>
                                            <span class="com_price">
                                            <em class="num">{{pdcsListItem.pdcsHdngAmtt | numberFilter}}</em><em class="unit">원</em>
                                            </span>
                                        </dd>
                                    </dl>
                                    <ul class="depth_list3">
                                        <!-- 세부항목목록 13개(생략) -->
                                        <li v-for="(dtlHdngListItem, idx) in pdcsListItem.dtlHdngList" :key="idx">
                                            <a href="javascript:void(0);" @click.prevent="fn_ftlzAmPopup(dtlHdngListItem.myfhsCtgrid, dtlHdngListItem.myfhsCtgrnm, dtlHdngListItem.myfhsCtgrExpl)" role="button">
                                                <dl>
                                                    <dt>
                                                        <div><em>{{dtlHdngListItem.myfhsCtgrnm}}</em></div>
                                                    </dt>
                                                    <dd>
                                                        <span class="com_price">
                                                            <em class="num">{{dtlHdngListItem.am | numberFilter}}</em><em class="unit">원</em>
                                                        </span>
                                                    </dd>
                                                </dl>
                                            </a>
                                        </li>
                                    </ul>
                                </template>
                                <!-- 자가로동비 경우 pdcsHdngcd = 2 -->
                                <template v-else>
                                    <a href="javascript:void(0);" @click.prevent="fn_mmLabrPopup(pdcsListItem.pdcsHdngExpl)" role="button">
                                        <dl>
                                            <dt>
                                                <div><em>{{pdcsListItem.pdcsHdngnm}}</em></div>											
                                            </dt>
                                            <dd>
                                                <span class="com_price">
                                                <em class="num">{{pdcsListItem.pdcsHdngAmtt | numberFilter}}</em><em class="unit">원</em>
                                                </span>
                                            </dd>
                                        </dl>
                                    </a>
                                </template>
                            </li>
                        </ul>						
                    </div>
                </div>
                <div class="com_box_type01 com_boxsub_type01">
                    <div class="list_type_box">
                        <div class="com_boxshadow_type01">
                            <div class="new_tit_area">
                                <div class="tit"><span>순수익</span></div>
                                <span class="total_price mint">
                                    <em class="num">{{gupftAm | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                        </div>				
                    </div>
                </div>
                <div class="com_box_type01 com_boxsub_type01">
                    <div class="list_type_box">
                        <div class="com_boxshadow_type01">
                            <div class="new_tit_area">
                                <div class="tit"><span>소득</span></div>
                                <span class="total_price mint">
                                    <em class="num">{{icmAm | numberFilter}}</em><em class="unit">원</em>
                                </span>
                            </div>
                        </div>				
                    </div>
                </div>
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
import SZFP2103 from '@/views/page/SZ/FP/SZFP2103/SZFP2103'
import SZFP2104 from '@/views/page/SZ/FP/SZFP2104/SZFP2104'
import SZFP2105 from '@/views/page/SZ/FP/SZFP2105/SZFP2105'
import SZFP2110 from '@/views/page/SZ/FP/SZFP2110/SZFP2110'

export default {
    name : "SZFP2102",
    data: () => {
        return {
            mydtCusno       : "",   // 마이데이터고객번호    
            totRevAm        : 0,	// 총수입금액 
            revListCn       : 0,    // 수입목록건수
            revList         : [],   // 수입목록
            pdcsAm          : 0,    // 생산비금액
            pdcsListCn      : 0,    // 생산비목록건수
            pdcsList        : [],   // 생산비목록
            gupftAm         : 0,	// 순수익금액        
            icmAm           : 0,	// 소득금액       
            naWrsLclc 	    : "",	// 경제통합상품대분류코드
            naWrsMclc 	    : "",	// 경제통합상품중분류코드
            naWrsSclc 	    : "",	// 경제통합상품소분류코드
            currentMonth    : "",	// 현재 월
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
            this.getData(param)
        }, 
        getData(param){
            this.fn_getPnlInfoList(param)
            this.inqYy          = param.inqYy       // 조회년도
            this.currentMonth   = param.currentMonth// 현재 월
            this.inqDsc         = param.inqDsc      // 조회구분코드
            this.naWrsLclc      = param.naWrsLclc   // 경제통합상품대분류코드
            this.naWrsMclc      = param.naWrsMclc	// 경제통합상품중분류코드
            this.naWrsSclc      = param.naWrsSclc	// 경제통합상품소분류코드
        },
        fn_getPnlInfoList(param){
            const config = {
                url: '/sz/fp/02r01',
                data: param
            }

            // console.log("config=", config)
            apiService.call(config).then(response => {

                // 수익분석 상세 조회 인터페이스 변경(PFMSZFP02R01)
                this.mydtCusno      = response.mydtCusno    // 마이데이터고객번호
                this.totRevAm       = response.totRevAm     // 총수입금액
                this.revListCn      = response.revListCn    // 수입목록건수
                this.revList        = response.revList      // 수입목록
                this.pdcsAm         = response.pdcsAm       // 생산비금액
                this.pdcsListCn     = response.pdcsListCn   // 생산비목록건수
                this.pdcsList       = response.pdcsList     // 생산비목록
                this.gupftAm        = response.gupftAm      // 순수익금액        
                this.icmAm          = response.icmAm        // 소득금액  
            })
        },
        // 카테코리별 상세(예:비료비)
        fn_ftlzAmPopup(myFhsCtgrid, myFhsCtgrNm, myfhsCtgrExpl){
            if(myFhsCtgrid === 'SZ20000008'){
                // 상각비 팝업 호출
                this.fn_rdmAmPopup(myfhsCtgrExpl);
            }else if(myFhsCtgrid === '2'){
                // 자가노동비상세조회 팝업 호출
                this.fn_mmLabrPopup(myfhsCtgrExpl);
            }else{

                let str_myFhsCtgrid = ""
                if(myFhsCtgrid != null && myFhsCtgrid != ''){
                    str_myFhsCtgrid = myFhsCtgrid.substring(0,3)
                    // console.log("str_myFhsCtgrid=", str_myFhsCtgrid)
                }
                
                // 마이농가카테고리ID 첫3자리  SZ1: 수입 / SZ2: 지출
                if(str_myFhsCtgrid === "SZ1"){
                    // 총수입 상세 팝업 호출
                    const config_SZ1 = {
                        component : SZFP2110,
                        params : {
                            mydtCusno 	    : this.getUserInfo("mydtCusno"),	// 마이데이터고객번호
                            inqYy 		    : this.inqYy,						// 조회년도
                            myFhsCtgrid     : myFhsCtgrid,                      // 마이농가카테고리ID
                            myFhsCtgrNm     : myFhsCtgrNm,                      // 마이농가카테고리명
                            inqDsc 		    : this.inqDsc,						// 조회구분코드
                            naWrsLclc 	    : this.naWrsLclc,				    // 경제통합상품대분류코드
                            naWrsMclc 	    : this.naWrsMclc,				    // 경제통합상품중분류코드
                            naWrsSclc 	    : this.naWrsSclc,					// 경제통합상품소분류코드
                            myfhsCtgrExpl   : myfhsCtgrExpl,                    // 툴팁-카테코리별 상세(예:비료비)
                            currentMonth    : this.currentMonth                 // 현재 월
                        }
                    }
    
                    // console.log("config_SZ1=", config_SZ1)
                    modalService.openPopup(config_SZ1)
                }else{
    
                    // 경영비(상각비 제외) 상세 팝업 호출
                    const config_SZ2 = {
                        component : SZFP2104,
                        params : {
                            mydtCusno 	    : this.getUserInfo("mydtCusno"),	// 마이데이터고객번호
                            inqYy 		    : this.inqYy,						// 조회년도
                            myFhsCtgrid     : myFhsCtgrid,                      // 마이농가카테고리ID
                            myFhsCtgrNm     : myFhsCtgrNm,                      // 마이농가카테고리명
                            inqDsc 		    : this.inqDsc,						// 조회구분코드
                            naWrsLclc 	    : this.naWrsLclc,				    // 경제통합상품대분류코드
                            naWrsMclc 	    : this.naWrsMclc,				    // 경제통합상품중분류코드
                            naWrsSclc 	    : this.naWrsSclc,					// 경제통합상품소분류코드
                            myfhsCtgrExpl   : myfhsCtgrExpl,                    // 툴팁-카테코리별 상세(예:비료비)
                            currentMonth    : this.currentMonth                 // 현재 월
                        }
                    }
    
                    // console.log("config_SZ2=", config_SZ2)
                    modalService.openPopup(config_SZ2)
                }
            }
        },
        // 상각비 팝업 호출
        fn_rdmAmPopup(myfhsCtgrExpl){
            //상세 팝업 호출
             const config = {
				component : SZFP2105,
				params : {
					mydtCusno 	    : this.getUserInfo("mydtCusno"),	// 마이데이터고객번호
                    inqYy 		    : this.inqYy,						// 조회년도
					inqDsc 		    : this.inqDsc,						// 조회구분코드
					naWrsLclc 	    : this.naWrsLclc,				    // 경제통합상품대분류코드
					naWrsMclc 	    : this.naWrsMclc,				    // 경제통합상품중분류코드
                    naWrsSclc 	    : this.naWrsSclc,					// 경제통합상품소분류코드
                    myfhsCtgrExpl   : myfhsCtgrExpl,
                    currentMonth    : this.currentMonth                 // 현재 월
				}
			}
			modalService.openPopup(config)
        },
        // 자가노동비상세조회 팝업 호출
        fn_mmLabrPopup(pdcsHdngExpl){
			//상세 팝업 호출
            const config = {
				component : SZFP2103,
				params : {
					mydtCusno 	    : this.getUserInfo("mydtCusno"),	// 마이데이터고객번호
                    inqYy 		    : this.inqYy,						// 조회년도
					inqDsc 		    : this.inqDsc,						// 조회구분코드
					naWrsLclc 	    : this.naWrsLclc,				    // 경제통합상품대분류코드
					naWrsMclc 	    : this.naWrsMclc,				    // 경제통합상품중분류코드
                    naWrsSclc 	    : this.naWrsSclc,					// 경제통합상품소분류코드
                    pdcsHdngExpl    : pdcsHdngExpl,                     // 툴팁-자가로동비
                    currentMonth    : this.currentMonth                 // 현재 월
				}
			}
			modalService.openPopup(config)
        },
	}
}
</script>