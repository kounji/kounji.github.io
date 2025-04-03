<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 영농캘린더 > 농축협 외상 조회
* @ 페이지설명 : 영농캘린더 농축협 외상 조회
* @ 파일명     : src/views/page/SZ/FC/SZFC2105/SZFC2105.vue
* @ 작성자     : 
* @ 작성일     : 2021-06-14
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-06-14              			           최초 작성
* 2021-06-26                                   수정 작업(기획/퍼블 변경)
* 2021-07-13                                   수정 작업(기획/퍼블 변경)
* 2021-07-14                                   수정 작업(기획/퍼블 변경)
* 2021-09-13                                   수정 작업
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<!--[타이틀(Start)]-->
		<div class="popup_header">    
			<h1>농축협 외상</h1>
			<a href="javascript:void(0);"  class="btn_close"  v-on:click.prevent="closePopup()"><span class="blind">팝업닫기</span></a>	
		</div>
		<!--[타이틀(End)]-->
			
		<!--메인(Body)-->	
		<div class="popup_content com_no_bottom com_bg_type00">
			<!--[상단(Start)]-->
			<div class="com_inner com_line_type01">
                <div class="top_info_box">
					<button class="select_date">
						총 외상금액
					</button>
					<div class="bill">
						<span class="num counter" data-count="450000">{{respTtAm | numberFilter}}</span>원  <!--합계금액--->
					</div>
				</div>
            </div>
			<!--[상단(End)]-->

			<!--[중단(Start)]-->
			<!--외상조회목록(crdInqList)-->
			<div class="com_inner com_boxarea_type03">

				<!--받을돈 합계금액이 존재 or 갚을돈 합계금액이 존재 2021/10/27(수)추가 -->
				<template v-if="resprevTtam > 0 || respxpsTtam > 0 ">  
				
					<!--받을돈 합계금액이 존재할 경우(Start)-->
					<template v-if="resprevTtam > 0">  
						<div class="toggle_list_box3">	
							<div data-ui-toggle="box" class="toggle_box_area active open">
							<!-- <div data-ui-toggle="box" class="toggle_box_area"> -->
								<button type="button" class="view_btn" aria-expanded="true">  <!-- aria-expanded="false" 접기 -->

									<!--2021.08.10(화) 수정-->		
									<div class="new_tit_area">
										<div class="tit"><span>받을돈</span></div>
										<div class="total_price">
											<span>합계</span><em class="num">{{resprevTtam | numberFilter}}</em><em class="unit">원</em>  <!--받을돈 합계금액--->
										</div>
									</div>
									<!--2021.08.10(화) 수정-->		

									<!-- <dl class="tit_list">
										<dt>
											<em>받을돈</em>
										</dt>
										<dd>
											<span class="cmm-price">
												<em class="num">{{resprevTtam | numberFilter}}</em> 
												<em class="unit">원</em>
											</span>
										</dd>
									</dl> -->
									<!--2021.11.09(화) 삭제-->
									<!-- <em class="open">열기</em>
									<em class="close">닫기</em> -->
									<!--2021.11.09(화) 삭제-->
								</button>
							</div>  		

							<!--받을돈 합계금액이 존재할 경우에만(Start)-->
							<template v-if="respcrdInqCn > 0 ">  <!--외상조회건수 > 0 이상인 경우-->
								<ul class="view_cont list_type_02" >
									<template v-for="(crdInq, idx1) in crdInqList">
										<!--외상수입지출코드1(수입)인 경우(Start)-->
										<template v-if="crdInq.crdRevXpsC === '1' "> 
											<li :key="'crd'+idx1">
												<dl class="com_bg_type02">
													<dt>
														<div><em>{{crdInq.crdDscnm}}</em></div> <!--외상구분코드명-->
													</dt>
													<dd>
														<span>
															<em class="num">{{crdInq.crdDscTtAm | numberFilter }}</em> <!--외상구분코드합계금액-->
															<em class="unit">원</em>
														</span>
													</dd>
												</dl>
											</li>
											<template v-if="crdInq.crdDscTtAm > 0"> <!--외상구분코드합계금액이 존재할 경우(2021.09.13(월) 추가-->
												<template v-for="(aset, idx11) in crdInq.asetList">
													<li :key="'ast_'+idx1+idx11 ">
														<dl>
															<dt>
																<!-- <div><em>{{aset.titnm}}{{idx11}}</em></div>  
																<span>{{aset.rpyPlaDt | dateFilter("YYYY.MM.DD")}}</span> -->
																<div><em>{{aset.titnm}}</em></div>  
																<template v-if="aset.rpyPlaDt !== STR_LST_YYYYMMDD ">  <!--상환예정일자가 99991231이 아닐 경우만~-->
																	<span>{{aset.rpyPlaDt | dateFilter("YYYY.MM.DD")}}</span>  <!--상환예정일자-->
																</template>
															</dt>
															<dd>
																<span>
																	<em class="num">{{aset.tram | numberFilter }}</em>  <!--거래금액--> 
																	<em class="unit">원</em>
																</span>
															</dd>
														</dl>
													</li>
												</template>
											</template>
										</template>
										<!--외상수입지출코드1(수입)인 경우(End)-->
									</template>
								</ul>
							</template>
							<template v-else>  <!-- 조회내역이 없을경우 -->
								<li>
									<div class="no_data_box">
										<div class="no_data_list">
											<p>조회된 정보가 없습니다.</p>
										</div>
									</div>	            
								</li>
							</template>
							<!--받을돈 합계금액이 존재할 경우에만(End)-->
						</div>
					</template>
					<!--받을돈 합계금액이 존재할 경우(End)-->

					<!--갚을돈 합계금액이 존재할 경우(Start)-->
					<template v-if="respxpsTtam > 0">  
						<div class="toggle_list_box3">
							<div data-ui-toggle="box" class="toggle_box_area active open">
							<!-- <div data-ui-toggle="box" class="toggle_box_area"> -->
								<button type="button" class="view_btn" aria-expanded="true">

									<!--2021.08.10(화) 수정-->		
									<div class="new_tit_area">
										<div class="tit"><span>갚을돈</span></div>
										<div class="total_price">
											<span>합계</span><em class="num">{{respxpsTtam | numberFilter}}</em><em class="unit">원</em><!--갚을돈 합계금액--->
										</div>
									</div>
									<!--2021.08.10(화) 수정-->		

									<!-- <dl class="tit_list">
										<dt>
											<em>갚을 돈</em>
										</dt>
										<dd>
											<span class="cmm-price">
												<em class="num">{{respxpsTtam | numberFilter}}</em>  
												<em class="unit">원</em>
											</span>
										</dd>
									</dl> -->
									<!--2021.11.09(화) 삭제-->
									<!-- <em class="open">열기</em>
									<em class="close">닫기</em> -->
									<!--2021.11.09(화) 삭제-->
								</button>
							</div>  	

							<!--갚을돈 합계금액이 존재할 경우에만(Start)-->
							<template v-if="respcrdInqCn > 0 ">  <!--외상조회건수 > 0 이상인 경우-->
								<ul class="view_cont list_type_02" >
									<template v-for="(crdInq, idx2) in crdInqList">
										<!--외상수입지출코드가 2(지출)인 경우(Start)-->
										<template v-if="crdInq.crdRevXpsC === '2' "> 
											<li :key="'crd'+idx2">
												<dl class="com_bg_type02">
													<dt>
														<div><em>{{crdInq.crdDscnm}}</em></div>  <!--외상구분코드명-->
													</dt>
													<dd>
														<span>
															<em class="num">{{crdInq.crdDscTtAm | numberFilter }}</em>   <!--외상구분코드합계금액-->
															<em class="unit">원</em>
														</span>
													</dd>
												</dl>
											</li>
											<template v-if="crdInq.crdDscTtAm > 0"> <!--외상구분코드합계금액이 존재할 경우(2021.09.13(월) 추가-->
												<template v-for="(aset, idx22) in crdInq.asetList">
													<li :key="'ast_'+idx2+idx22 ">
														<dl>
															<dt>
																<div><em>{{aset.titnm}}</em></div>  
																<template v-if="aset.rpyPlaDt !== STR_LST_YYYYMMDD ">  <!--상환예정일자가 99991231이 아닐 경우만~-->
																	<span>{{aset.rpyPlaDt | dateFilter("YYYY.MM.DD")}}</span>  <!--상환예정일자-->
																</template>
															</dt>
															<dd>
																<span>
																	<em class="num">{{aset.tram | numberFilter }}</em>    <!--거래금액-->
																	<em class="unit">원</em>
																</span>
															</dd>
														</dl>
													</li>
												</template>
											</template>
										</template>
										<!--외상수입지출코드가 2(지출)인 경우(End)-->
									</template>
								</ul>
							</template>
							<template v-else>  <!-- 조회내역이 없을경우 -->
								<li>
									<div class="no_data_box">
										<div class="no_data_list">
											<p>조회된 정보가 없습니다.</p>
										</div>
									</div>	            
								</li>
							</template>
							<!--갚을돈 합계금액이 존재할 경우에만(End)-->
						</div>  	
					</template>
					<!--갚을돈 합계금액이 존재할 경우(End)-->

				<!--받을돈 합계금액이 존재 or 갚을돈 합계금액이 존재 2021/10/27(수)추가 -->
				</template>
				<template v-else>  <!-- 조회내역이 없을경우 -->
					<li>
						<div class="no_data_box">
							<div class="no_data_list">
								<p>조회된 정보가 없습니다.</p>
							</div>
						</div>	            
					</li>
				</template>   
				<!--받을돈 합계금액이 존재 or 갚을돈 합계금액이 존재 2021/10/27(수)추가 -->

			</div>  		
		</div>
		<!--메인(Body)-->	
		
		<!--a class="btn_close" @click.prevent="closePopup()"><span class="blind">팝업닫기</span></!--a-->		

	</div>
</template>
<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
//import modalService from '@/service/modalService'

export default {
    name : "SZFC2105",
    data: () => {
        return {
			//sortCndC      : "",  //금액구분코드
			mydtCusno     : "",  //마이데이터고객번호
			respTtAm      : "",  //합계금액
			respcrdInqCn  : "", 
			respmydtCusno : "",  //마이데이터고객번호
			imgNumMinus   : "-",
			isbackYn 	  : false, 
			selItem       : "",     
            resprevTtam   : "",  //받을돈합계금액
            respxpsTtam   : "",  //갚을돈합계긍액

			crdInqList : [] , 
			//dtbyInqInfo : {}   //테스트
			popSel     : "",   

			STR_LST_YYYYMMDD : "99991231"
        }
    },

    mixins: [
		commonMixin,
        popupMixin
    ],
	
    mounted() {
		this.initComponent();
		
		//PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)     
    },
    methods: {
    
		initComponent() {
             this.getSearchList()
        },

        //**************
        // [조회]
        //***************/
		getSearchList() {

			this.mydtCusno  = this.params.mydtCusno;      //마이데이터고객번호
			this.popSel     = this.modalConfig.params.popSel;   	  //팝업선택		

			const config = {
					url: '/sz/fc/05r01',
					//url : "/co/at/01r01",
					data: {
						mydtCusno  : this.mydtCusno,  //(입력)마이데이타고객번호 = (변수)마이데이터고객번호
						//amDsc 	   : this.sortCndC,    //(입력)금액구분코드 = (변수)금액구분코드(1:받을돈(양수),2:줄돈(음수))   <<-- 필드는 있으나, 값은 넘기지 않아도 됨(김승호책임/2021.06.28)
					}
				}
				apiService.call(config).then(response => {
   
				//* 살제 자료 부분 */	
                this.respmydtCusno = response.mydtCusno;  //(response)마이데이터고객번호
                this.respTtAm      = response.ttAm;       //(response)합계금액
                this.resprevTtam   = response.revTtAm     //(response)받을돈합계금액
                this.respxpsTtam   = response.xpsTtAm     //(response)갚을돈합계긍액
                this.respcrdInqCn  = (response.crdInqCn === undefined)?0:response.crdInqCn    //(response)외상조회건수
				this.crdInqList    = (response.crdInqList === undefined)?'':response.crdInqList || [];    //(출력)외상조회목록

				//sync방식으로 인하여 api호출 후 mix의 jQuery 함수 재호출
				this.$nextTick(() => {
                    this.callJQueryFncExcute()
                })

			});    
				
        },

        //**************
        // [닫기]버튼 클릭
        //***************/
		closePopup() {

			this.reset('0') 
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