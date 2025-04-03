<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 영농캘린더 > [팝업]수입/지출 내역조회
* @ 페이지설명 : [팝업]수입/지출 내역조회
* @ 파일명     : src/views/page/SZ/FC/SZFC2104/SZFC2104.vue
* @ 작성자     : 
* @ 작성일     : 2021-06-11
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-06-11                                  퍼블리싱 적용
* 2021-09-09                                  수정 작업
*************************************************************************/
-->
<template>
<div class="full_popup" id="full_popup_01">
    <!--[타이틀(Start)]-->
    <div class="popup_header">    
        <h1>{{popTitleTxt}}</h1> 
        <a href="javascript:void(0);"  class="btn_close"  v-on:click.prevent="closePopup()"><span class="blind">팝업닫기</span></a>
    </div>
    <!--[타이틀(End)]-->
        
    <div class="popup_content com_no_bottom com_bg_type00">
        <!--[상단(Start)]-->
        <div class="com_inner com_line_type01">
            <div>
                <!--2021.11.10(수) 변경-->
                <div class="top_info_box">
					<div class="select_date">
						<button class="cal_btn cal_prev" aria-label="한달 전 이동" title="한달 전 이동" v-on:click.prevent="fn_bfraftClamp('p')"></button>  <!--년월 이전(<) 선택-->  
                        <a title="년월선택" class="year_month"  @click.prevent="selectMonth()">
                           <span class="num">{{year}}</span>년 <span class="num">{{month}}</span>월 
                        </a>
                        <template v-if="prv_ena_yn === 'n' "> 
                            <button class="cal_btn cal_next disabled" disabled="disabled"  title="선택불가" aria-label="한달 후 이동"></button>         
                        </template> 
                        <template v-else> 
                            <button class="cal_btn cal_next" aria-label="한달 후 이동" title="한달 후 이동" v-on:click.prevent="fn_bfraftClamp('n')"></button> 
                        </template> 
					</div>
					<div class="bill">
						<span class="num counter" data-count="1200000">{{respTtAm | numberFilter}}</span>원
					</div>
				</div>
                <!--2021.11.10(수) 변경-->
            </div>
        </div>
        <!--[상단(End)]-->

        <!--메인(Body-Start)-->	
        <div class="com_inner">
            <!--2021.09.09(목) 변경-->
            <template v-if="dtbyInqCn > 0">   <!--일자별 조회건수가 존재할 경우-->
                <template v-for="(dtbyInq, index) in dtbyInqList" > 
                    <div class="new_tit_area" :key="index" > 
                        <div class="tit"><em>{{dtbyInq.trDay}}</em><span>일({{fn_getDayName(respInqYm+dtbyInq.trDay)}})</span></div> <!--거래일-->
                    </div>

                    <template v-if="dtbyInq.asetCn > 0">   <!--자산수가 존재할 경우-->
                        <template v-for="(aset, idx2) in dtbyInq.asetList" >       
                            <ul class="list_type_01" :key="'dl'+index+'ase_'+idx2"> 
                                <li>
                                    <dl>
                                        <dt>
                                            <div>
                                                <i :class="aset.iconFlnm !== '' ? aset.iconFlnm: '' "><span class="blind">{{aset.subTitnm}}</span></i> <!--서브타이틀명--->
                                                <em>{{aset.subTitnm}}</em>  <!--타이틀명-->
                                                <span>
                                                    <span>{{aset.titnm}}</span> <!--서브타이틀명--->
                                                </span>
                                            </div>        
                                        </dt>
                                        <dd>
                                            <!--2021/10/20(수) 변경-->
                                            <span class="com_price"> 
                                                <em class="num">{{aset.tram | numberFilter}}</em><em class="unit">원</em> <!--거래금액-->
                                            </span>
                                            <!--2021/10/20(수) 변경-->
                                        </dd>
                                    </dl> 
                                </li>
                            </ul> 
                        </template>  <!--template(end)-->    
                    </template>  <!--template(end)-->       
                    
                </template> <!--template(end)-->          
            </template>        
            <!--2021.09.09(목) 변경-->
            <template v-else>  <!-- 조회내역이 없을경우 -->
                <div class="no_data_box">
                    <div class="no_data_list">
                        <p>조회된 정보가 없습니다.</p>
                    </div>
                </div>	            
            </template>
            <!--2021.09.09 변경-->
        </div>  
        <!--메인(Body)-->	
    </div>
    <!--a class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></!--a-->		
</div>
</template>
<script>
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
//import SelectPopupCardRenderer from '@/components/renderer/SelectPopupCardRenderer'
import {getDayDowCName} from '@/utils/date'   //공통추가(2021.06.16)
import {monthAdd} from '@/utils/date'

export default {
    name : "SZFC2104",
    data: () => {
        return {
            popSel      :  "",    //pop선택
            popTitleTxt :  "",    //팝업 타이틀
            year        : "",     //년도
            month       : "",     //월
            inqDsc      :  "",    //조회구분코드
            asetCtgrDsc :  "",    //자산카테고리구분코드
            mydtCusno   :  "",    //마이데이터고객번호
            inqYm       :  "",    //조회년월
            naWrsLclc   :  "",    //경제통합상품대분류코드
            naWrsMclc   :  "",    //경제통합상품중분류코드
            naWrsSclc   :  "",    //경제통합상품소분류코드
            //
            respInqYm : "",       //조회년월
            respAsetCtgrDsc: "",  //자산카테고리구분코드
            respTtAm  : "",       //계금액
			isbackYn : false, 
            restMsg : "",
            selItem : "",
            rszYYYYMM      : '',
            nowYYYYMM      : '',
            //currentYear    : '',  //현재년
            //currentMonth   : '',  //현재월 00

            dtbyInqCn : 0,
			dtbyInqList : [] , 
			//dtbyInqInfo : {}   //테스트

            prv_ena_yn     : '', 

        }
    },

    mixins: [
		commonMixin,
        popupMixin
	],

    computed:{

	},
    
    created() {
      const date        = new Date()

      this.year  = date.getFullYear()   //년
      this.month = ("0" + (date.getMonth() +1)).slice(-2)  //월 
      //this.currentDay   = ("0" + date.getDate()).slice(-2)   //일
      this.rszYYYYMM    = this.year+this.month   //년월
      this.nowYYYYMM    = this.year+this.month   //현재일자

    }, 
    mounted() {
        this.initComponent();
        
		//PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)     
    },

	methods: {

		initComponent() {

            if (this.rszYYYYMM.substring(0,4)  === this.nowYYYYMM.substring(0,4)) {

                if (this.rszYYYYMM.substring(4,6) ===  this.nowYYYYMM.substring(4,6)) {
                     this.prv_ena_yn = 'n'  //날짜 prev 진행여부 n(nexxt)
                }    
            } 
            console.log("[SZFC2101]initComponent/날짜 prev 진행여부 (prv_ena_yn)=>> ", this.prv_ena_yn)    

            this.getData();
        },

        getData() {
            this.year       = this.modalConfig.params.year;           //년
            this.month      = this.modalConfig.params.month;          //월
            this.popSel     = this.modalConfig.params.popSel;   	  //팝업선택	
            this.inqDsc     = this.modalConfig.params.inqDsc;    	  //조회구분코드(마이농장;1,세부작목;2)
            this.mydtCusno  = this.modalConfig.params.mydtCusno;      //마이데이터고객번호
            this.inqYm      = this.modalConfig.params.inqYm;    	  //조회년월
            this.naWrsLclc  = this.modalConfig.params.naWrsLclc;      //경제통합상품대분류코드
            this.naWrsMclc  = this.modalConfig.params.naWrsMclc;      //경제통합상품중분류코드
            this.naWrsSclc  = this.modalConfig.params.naWrsSclc;      //경제통합상품소분류코드

            console.log('[SZFC2104](변수)년=>>'+this.year);	
            console.log('[SZFC2104](변수)월=>>'+this.month);	
            console.log('[SZFC2104](변수)팝업선택=>>'+this.popSel);	
            console.log('[SZFC2104](변수)조회구분코드=>>'+this.inqDsc);	
            console.log('[SZFC2104](변수)마이데이터고객번호=>>'+this.mydtCusno);	
            console.log('[SZFC2104](변수)조회년월=>>'+this.inqYm);	
            console.log('[SZFC2104](변수)경제통합상품대분류코드=>>'+this.naWrsLclc);	
            console.log('[SZFC2104](변수)경제통합상품중분류코드=>>'+this.naWrsMclc);	
            console.log('[SZFC2104](변수)경제통합상품소분류코드=>>'+this.naWrsSclc);	

            if (this.popSel === '1') {
              this.popTitleTxt = '수입내역'
              this.asetCtgrDsc = '1'    //1:수입, 2:지출
            } else if (this.popSel === '2') {
              this.popTitleTxt = '지출내역'
              this.asetCtgrDsc = '2'    //1:수입, 2:지출
            }

            console.log('[SZFC2104](변수)팝업 타이틀=>>'+this.popTitleTxt);	
            console.log('[SZFC2104](변수)자산카테고리구분코드=>>'+this.asetCtgrDsc);	

            //조회구분코드(마이농장일 경우-1,세부작목일 경우-2)  
            if (this.inqDsc === '1') {
               this.naWrsLclc  = ''   //경제통합상품대분류코드
               this.naWrsMclc  = ''   //경제통합상품중분류코드
               this.naWrsSclc  = ''   //경제통합상품소분류코드
            }  
            this.getSearchList()
            
        },
        /*
        * [달력] 선택
        */
        selectMonth(){

            const config = {
                params: {
                    title: '년월 선택',
                    yyyymm : this.year + '' + this.month,
                    limit  : 60
                },
            }
            modalService.openSlideSelectMonth(config).then(response => {
                this.year = response.substring(0,4)
                this.month = response.substring(4,6)
                this.rszYYYYMM = this.year + '' + this.month

                //선택년월의 년도 = 현재년월의 년도 인 경우    
                if (this.rszYYYYMM.substring(0,4)  === this.nowYYYYMM.substring(0,4)) {
                    
                    if (this.rszYYYYMM.substring(4,6) ===  this.nowYYYYMM.substring(4,6)) {
                        this.prv_ena_yn = 'n'   //날짜 prev 진행여부 n(nexxt)
                    } else {
                         this.prv_ena_yn = 'y'  //날짜 prev 진행여부 y(prev)
                    }  
                } else {
                   this.prv_ena_yn = 'y'  //날짜 prev 진행여부 y(prev)
                }

                this.getSearchList()
            })
        },        

        /*
        * [이전/이후 꺽쇠] 선택
        */
        fn_bfraftClamp(flag){
            let add = (flag === "p") ? -1 : 1

            this.rszYYYYMM = monthAdd(add, this.rszYYYYMM, "YYYYMM")
            this.year = this.rszYYYYMM.substring(0,4)
            this.month = this.rszYYYYMM.substring(4,6)
     
            this.rszYYYYMM = this.year + '' + this.month

            //선택년월의 년도 = 현재년월의 년도 인 경우    
            if (this.rszYYYYMM.substring(0,4)  === this.nowYYYYMM.substring(0,4)) {

                if (this.rszYYYYMM.substring(4,6) ===  this.nowYYYYMM.substring(4,6)) {
                    this.prv_ena_yn = 'n'  //날짜 prev 진행여부 n(nexxt)
                } else {
                    this.prv_ena_yn = 'y'  //날짜 prev 진행여부 y(prev)
                }   
            } 
           
            //*        
            this.getSearchList()

        },        

        //**************
        // [조회]
        //***************/
		getSearchList() {
			const config ={
				url: '/sz/fc/04r01',
				data: {
                    mydtCusno   : this.getUserInfo('mydtCusno')  ,    //(입력)마이데이타고객번호 = (변수)마이데이타고객번호
                    inqYm       : this.year + '' + this.month       ,    //(입력)조회년월=(변수)조회년월
                    asetCtgrDsc : this.asetCtgrDsc,    //(입력)자산카테고리구분코드=(변수)자산카테고리구분코드
                    inqDsc      : this.inqDsc     ,    //(입력)조회구분코드=(변수)조회구분코드
                    naWrsLclc   : this.naWrsLclc  ,    //(입력)경제통합상품대분류코드=(변수)경제통합상품대분류코드
                    naWrsMclc   : this.naWrsMclc  ,    //(입력)경제통합상품중분류코드=(변수)경제통합상품중분류코드
                    naWrsSclc   : this.naWrsSclc  ,    //(입력)경제통합상품소분류코드=(변수)경제통합상품소분류코드
				}
			} 

            apiService.call(config).then(response => {
                //* 살제 자료 부분 */						
                 this.respInqYm = response.inqYm;    //(출력)조회년월
                 this.respTtAm  = response.ttAm;    //(출력)합계금액

                console.log("[SZFC2104](변수)조회년월=>> "+this.respInqYm)
                console.log("[SZFC2104](변수)합계금액=>> "+this.respTtAm )
                //
                this.dtbyInqCn  = (response.dtbyInqCn === undefined)?0:response.dtbyInqCn;    //(출력)일자별 조회건수
                this.dtbyInqList = (response.dtbyInqList === undefined)?'':response.dtbyInqList || [];    //(출력)일자별조회목록
                console.log("[SZFC2104](변수)일자별 조회건수=>> "+this.dtbyInqCn )
                console.log("[SZFC2104]this.dtbyInqList=>>"+JSON.stringify(this.dtbyInqList))
            })
        },

        //**************
        // [닫기]버튼 클릭
        //***************/
        closePopup() {

        console.log('>>> [SZFC2104]닫기 <<<');	
           this.reset('0') 
        },

        //공통추가(2021.06.16)
        fn_getDayName(yyyymmdd){
            return getDayDowCName(yyyymmdd)
        },

        //**************
        // [취소]버튼 클릭
        //***************/
        reset(flag) {
			this.selItem = flag

            if (this.selItem === '0' ) { 
                
                this.close('complete')
			}
        },		

     },

    components : {
    }
}   
</script>