<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 투자 > P2P투자 상세
* @ 페이지설명 : 나의자산 > 자산 > 투자 > P2P투자 상세 > P2P투자
* @ 파일명     : src/views/page/AS/IV/ASIV2007/ASIV2007.vue
* @ 작성자     : CS533437
* @ 작성일     : 2023-08-28
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-28             CS533437         최초작성
*************************************************************************/
-->
<template>
	<!-- 전체 팝업 시작 -->
	<div class="full_popup mydata2023" id="full_popup_01"><!-- 0803 .mydata2023 클래스 이동-->
		<div class="popup_header">    
			<h1>P2P투자</h1>
		</div>	
		<div class="popup_content com_space_bottom com_bg_type00">
			<div class="asset_info_box">
				<div class="com_inner">
					<div class="asset_info_wrap">
						<div class="asset_info">
							<dl>
								<dt>{{p2PWrsTpcNm}}</dt>
								<dd>
									<span class="account_num">{{ivCtrno}}</span>
								</dd>
							</dl>							
							<div class="bank_icon">
								<i :class="infOfrmnOrgC"><span class="blind">{{infOfrmnOrgCNm}}</span></i>
							</div>
						</div>

						<div class="asset_price_wrap">
							<div class="amount">투자잔여금액</div>
							<div class="asset_price">
								<span class="num counter">{{rmAm | numberFilter}}</span>원
							</div>
							<!-- 0912 투자원금 추가 -->
							<div class="asset_price_list">
								<span>투자원금</span>
								<span class="price"><em class="num">{{ivCtrAm | numberFilter}}</em>원</span>
							</div>
							<!-- //0912 투자원금 추가 -->
							<div class="asset_price_list">
								<span>수익률</span>
								<template v-if="pftrt > 0">
									<span class="price pointColor red"><em class="num">+{{pftrt}}</em>%</span>
								</template>
								<template else v-if="pftrt < 0">
									<span class="price pointColor blue"><em class="num">-{{pftrt}}</em>%</span>
								</template>
								<template else v-if="pftrt === 0">
									<span class="price pointColor black"><em class="num">+{{pftrt}}</em>%</span>
								</template>

							</div>
						</div>
					</div>

					<div class="asset_detail">
						<ul class="list_type_2023">
							<li>
								<dl>
									<dt>지급받은 원금</dt>
									<dd><span class="num">{{pyPrnAm | numberFilter}}</span>원</dd>
								</dl>
								<!--
								<dl>
									<dt>남은 원금잔액</dt>
									<dd><span class="num">{{rmAm | numberFilter}}</span>원</dd>
								</dl>
								-->
								<dl>
									<dt>계약일</dt>
									<dd class="num">{{isuDt}}</dd>
								</dl>
								<dl>
									<dt>종료일</dt>
									<dd class="num">{{dueDt}}</dd>
								</dl>								
							</li>
						</ul>
					</div>
				</div>

				<button type="button" class="btn_view_detail">더보기</button><!-- 230720 상세보기에서 더보기로 수정 -->
			</div>

			<div class="com_inner">
				<div class="new_period_box">
					<div class="tit_area">
						<a href="javascript:void(0);" title="팝업열기" role="button"  @click.prevent="fn_openPeriodPop()" class="num" >{{inqStDt}}~{{inqEdDt}}</a>

					</div>				
				</div>
			</div>

			<div class="com_inner mt20" v-if="investTrList.length > 0">						
				<li v-for="(monthObj, mIdx) in investTrList" :key="'mon_'+mIdx">
					<div class="asset_more_list">
						<div class="list_month">
							{{monthObj.yyyyMM | dateFilter('YYYY')}}년{{monthObj.yyyyMM | dateFilter('MM')}}월
						</div>
						<ul class="p2p_investment">
							<ul :key="mIdx">
								<li v-for="(item, dIdx) in monthObj.monList" :key="'day_'+dIdx">
									<!-- <div class="title"></div> -->
									<dl class="price">
										<dt>{{item.pySc}}회차 회수 금액</dt>
										<dd class="num">{{item.mydtTram | numberFilter}}원</dd>
									</dl>
									<dl>
										<dt class="num">{{item.mydtTrDtm | dateFilter('DD일 HH:mm:ss')}}</dt>										
									</dl>
									<div class="list_gray_box">
										<dl>
											<dt>원금</dt>
											<dd><span class="num">{{item.tramOgnAm | numberFilter}}</span>원</dd>
										</dl>
										<dl>
											<dt>이자</dt>
											<dd><span class="num">{{item.tramIntAm | numberFilter}}</span>원</dd>
										</dl>
									</div>
								</li>
							</ul>
						</ul>					
					</div>
				</li>
			</div>
			<div class="no_data_box" v-else>
                <!-- 데이터 없을때 -->
                <div class="no_data_list">
                    <p>조회된 정보가 없습니다.</p>
                </div>
                <!--// 데이터 없을때 -->
            </div>

			

		</div>

		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>
	/*eslint-disable */
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
	import apiService from '@/service/apiService'
	import {dateFormat, monthAdd} from '@/utils/date'
	import modalService from '@/service/modalService'
    
	export default {
        name : "ASIV2007",
        data: () => {
            return {

				infOfrmnOrgC   : "", //정보제공자기관코드
				infOfrmnOrgCNm : "", //정보제공자기관코드명
				ivCtrno        : "", //투자계약번호
				p2PWrsTpcNm    : "", //P2P상품유형코드명
				ivCtrAm        : 0, //투자계약금액
				rmAm           : 0, //잔여금액
				pyPrnAm        : 0, //지급원금
				isuDt          : "", //발급일자
				dueDt          : "", //만기일자
				pftrt          : 0.0, //수익률

				inqStDt        : "", //조회시작일자
				inqEdDt        : "", //조회종료일자

                objAccInfo  : {}, //전달 파라미터
                respInfo    : {}, //응답헤더정보
                epyList     : [], //최종결과 리스트

                pageNum     : 0,  // 페이지번호
                lsPageYn    : "", // 다음페이지존재여부 '1':존재 , '0':미존재                 
				tranList    : [], // 임시 리스트
				investTrList: [], // 월별 리스트
            }
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        created() {
            //초기데이타 세팅
            this.objIvInfo = this.params.objIvInfo    //전달받은 파라미터

            this.pageNum     = 1  // 페이지번호
            
           
        },
        computed : {

        },
        mounted() {
            this.initComponent()
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        methods: {
            initComponent() {

				this.inqStDt = monthAdd(-6, dateFormat(new Date(), "YYYYMMDD"), "YYYY.MM.DD")

				this.inqEdDt = dateFormat(new Date(), "YYYY.MM.DD")

                this.getData()
                
            },
            getData() {
                
                ////////
                // 운용상품현황조회
                //
                const config = {
                    url: '/as/iv/07r01',
                    data: {
						"mydtCusno"     : this.getUserInfo('mydtCusno'),
						//, "infOfrmnOrgC" : this.objIvInfo.infOfrmnOrgC
						//, "ivCtrno"      : this.objIvInfo.mydtAcno

						"infOfrmnOrgC" : 'L1AAEL0000',
						"ivCtrno"      : '123456789000',
						
                        // , "mydtScNo"     : this.objIvInfo.mydtScNo 
                         "pageNum"      : this.pageNum ,   //페이지번호
                        // , "tswrsEpyAm"   : this.objIvInfo.tswrsEpyAm,                    
					}
                }
                apiService.call(config).then(response => {
					
					console.log('======= /as/iv/07r01 =======', response)
					
					this.infOfrmnOrgC   = response.infOfrmnOrgC;
					this.infOfrmnOrgCNm = response.infOfrmnOrgCNm;
					this.ivCtrno        = response.ivCtrno;
					this.p2PWrsTpcNm    = response.p2PWrsTpcNm;
					this.ivCtrAm        = response.ivCtrAm;
					this.rmAm           = response.rmAm;
					this.pyPrnAm        = response.pyPrnAm;
					this.isuDt          = dateFormat(response.isuDt, "YYYY.MM.DD");
					this.dueDt          = dateFormat(response.dueDt, "YYYY.MM.DD");
					this.pftrt          = response.pftrt;					


					
					this.respInfo   = response;

                    this.lsPageYn   = this.respInfo.lsPageYn || ""
					this.epyList    = this.fn_generateList(this.respInfo.epyList || [])
					
					$(document).ready(function(){
						$('.btn_view_detail').on('click',function(){
							$(this).siblings().children('.asset_detail').toggleClass('open');
							$(this).toggleClass('close');
							if($('.asset_detail').hasClass('open')) {
								$('.asset_detail').slideDown('slow');
								$('.btn_view_detail').text('접기');//230720 상세접기에서 접기로 수정
							}else {
								$('.asset_detail').slideUp('slow');
								$('.btn_view_detail').text('더보기');//230720 상세보기에서 더보기로 수정
							}
						});
					});

					this.fn_getDetailList('INIT');


                })
              
			},
			
						/*
            * 계좌 상세 거래내역조회
            */
            fn_getDetailList(mod) {

                // 날짜, 조건 변경시 
                // 페이지, 검색결과 초기화
                if(mod === 'INIT') {
                    this.pageNum  = 1
                    this.tranList = []
                }

				const config = {
					url: '/as/iv/07r02',
                    data: {
                        "mydtCusno"      : this.getUserInfo('mydtCusno')
                        , "infOfrmnOrgC" : this.infOfrmnOrgC
                        , "ivCtrno"      : this.ivCtrno
                        , "sqno"         : this.sqno
                        , "inqStDt"      : this.inqStDt.split(".").join("")  //시작일
                        , "inqEdDt"      : this.inqEdDt.split(".").join("")    //종료일                        
						, "pageNum"      : this.pageNum    //페이지번호						
						
                    }
				}
				apiService.call(config).then(response => {
				
				console.log('======= /as/iv/07r02 =======', response)
					this.respDtlInfo = response;
                    this.lsPageYn    = this.respDtlInfo.nxDataYn || ""
					// 조회된 결과 대상으로 이력이 존재하는 월별 배열 생성
                    this.investTrList = this.fn_generateList(this.respDtlInfo.investP2PTrbrkList || [])
				});
            },

            /*
            * 더보기
            */
            fn_showMoreList() {
                this.pageNum = this.pageNum + 1
                this.getData()
            },

            // /*
            // * 결과리스트 가공.
            // */
            // fn_generateList(objList) {
            //     for(let i=0; i < objList.length; i++) {
            //         this.tranList.push(objList[i])
            //     }

            //     return this.tranList
			// },

			/*
            * 결과리스트 가공.
            */
            fn_generateList(objList) {
                if(objList.length > 0) {
                    for(let i=0; i < objList.length; i++) {
                        if(objList[i].mydtTrDtm != "00000000000000"){
                            objList[i].yyyyMM = dateFormat(objList[i].mydtTrDtm, "YYYYMM")
                            this.tranList.push(objList[i])
                        }
                    }
                } else {
                    this.tranList = []  //응답결과 없을때 초기화처리.
                }
                
                // 거래일시 기준 정렬
                this.tranList = _.orderBy(this.tranList, 'mydtTrDtm', 'desc')

                //년월 기준 정렬
                let resultList = _.chain(this.tranList)
                            .uniqBy('yyyyMM')
                            .map(d => {
                                return {
                                    yyyyMM : d.yyyyMM,
                                    monList : _.filter(this.tranList, {yyyyMM : d.yyyyMM})
                                }
                            })
                            .orderBy('yyyyMM', 'desc')
                            .value()

                return resultList
			},
			
			/*
			* 검색조건(기간 선택) 팝업 - msha   
			*/
			fn_openPeriodPop() {
				console.log("2222222222222222")
				const config = {
					params: {
						title     : '기간 선택',
						startDate : this.inqStDt.split(".").join(""),
						endDate   : this.inqEdDt.split(".").join("")
					}
				}
				modalService.openSelectMonth(config).then(response => {
					this.inqStDt = dateFormat(response.startDate, "YYYY.MM.DD")
					this.inqEdDt   = dateFormat(response.endDate, "YYYY.MM.DD")
					this.fn_getDetailList('INIT')
				})
			},

        },
    }
	
	
    

</script>