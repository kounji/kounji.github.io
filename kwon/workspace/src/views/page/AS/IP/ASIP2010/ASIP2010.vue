<!--
/*************************************************************************
* @ 서비스경로 : 자산 > 자산진단
* @ 페이지설명 : 자산 > 자산진단 > 금융스타일 진단
* @ 파일명     : src\views\page\AS\IP\ASIP2010\ASIP2010.vue
* @ 작성자     : CS533437
* @ 작성일     : 2023-08-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________

* 2023-08-18              CS533437              최초작성
*************************************************************************/
-->
<template>
    <!-- 전체 팝업 시작 -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"><!-- 0803 .mydata2023 클래스 이동-->
		<div class="popup_header">
			<h1>금융스타일 진단</h1>
			<!-- <a href="#nolink" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
		<div class="popup_content com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner mt20">
				<!-- 김농협님의 금융스타일은? -->
				<div class="finance_style">
					<strong class="titH2">{{cusnm}}님의 금융스타일은?</strong>

					<div class="yellow_box">
						<p><strong class="pointColor green">#{{prdStyCdNm}}</strong>이 강한 <strong class="pointColor green">#{{finStyCdNm}}</strong></p>
					</div>
				</div>
				<!-- //김농협님의 금융스타일은? -->

				<!-- 보유 상품 유형 -->
				<div class="finance_style_box have_product">
					<!-- <strong class="titH3">보유 상품 유형</strong> -->
                    <!-- 0913 툴팁 추가 -->
					<div class="customTooltipBox">
						<strong class="titH3">보유 상품 유형</strong>
						<div class="custom_tooltip">
							<div class="com_tooltip_type02 com_tooltip_type03">
								<a href="javascript:void(0);" class="com_btn_info" role="button">
									<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
								</a>
								<div class="com_ballon_type01 com_ballon_type02" style="display:none;">
									<div>
										<p>{{hldWrsToolTipMsg}}</p>
										<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
									</div> 
								</div>
							</div>
						</div>
					</div>		
					<!-- //0913 툴팁 추가 -->		

					<div class="line_box_2023 mt20">
                        <template v-if="ivRto > 0 || svRto > 0"> 
                            <div id="chartHolder" role="img" aria-label="저축, 투자 중 보유한 상품 유형의 비중을 안내합니다." aria-hidden="true"></div>
                                <div class="right">
                                <p>
                                    {{prdStyDtlPhr1}}
                                    <br>                                    
                                    <strong class="pointColor green">#{{prdStyCdNm}}</strong> 
                                </p>
                                <div class="item_list">
                                    <dl class="item save">
                                        <dt>저축</dt>
                                        <dd><span class="num">{{svRto}}</span>%</dd>
                                    </dl>
                                    <dl class="item invest">
                                        <dt>투자</dt>
                                        <dd><span class="num">{{ivRto}}</span>%</dd>
                                    </dl>
                                </div>
                            </div>
                        </template> 
                        <template v-else>
                            <div id="" class="noData" role="img" aria-label="데이터 없음" aria-hidden="true"></div>
                            <div class="right">
							<p>
								저축 상품 비중이 높은<br>
								<strong class="pointColor green">#저축성향형</strong><!-- 0904 선호형 삭제 및 문구 수정 -->
							</p>
							<div class="item_list">
								<dl class="item save">
									<dt>저축</dt>
									<dd><span class="num">0</span>%</dd>
								</dl>
								<dl class="item invest">
									<dt>투자</dt>
									<dd><span class="num">0</span>%</dd>
								</dl>
							</div>
						</div>
                        </template>
						<!-- <div class="right">
							<p>
								{{prdStyDtlPhr1}}
                                <br>                                
								<strong class="pointColor green">#{{prdStyCdNm}}</strong> 
							</p>
							<div class="item_list">
								<dl class="item save">
									<dt>저축</dt>
									<dd><span class="num">{{svRto}}</span>%</dd>
								</dl>
								<dl class="item invest">
									<dt>투자</dt>
									<dd><span class="num">{{ivRto}}</span>%</dd>
								</dl>
							</div>
						</div> -->
					</div>
				</div>
				<!-- //보유 상품 유형 -->

				<!-- 금융 활동 유형 -->
				
				<div class="finance_style_box finance_activities">
					<!-- <strong class="titH3">금융 활동 유형</strong> -->
                    <!-- 0913 툴팁 추가 -->
					<div class="customTooltipBox">
						<strong class="titH3">금융 활동 유형</strong>
						<div class="custom_tooltip">
							<div class="com_tooltip_type02 com_tooltip_type03">
								<a href="javascript:void(0);" class="com_btn_info" role="button">
									<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
								</a>
								<div class="com_ballon_type01 com_ballon_type02" style="display:none;">
									<div>
										<p>{{fncAcvToolTipMsg}}</p>
										<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
									</div> 
								</div>
							</div>
						</div>
					</div>
					<!-- //0913 툴팁 추가 -->
					<!-- case 01 노후준비형 -->
					<div class="line_box_2023 01">
						<div class="left">
							<div class="progressBar">
								<div class="bar">
									<div class="popover_wrap">
										<span class="popover bg_white">
											<em class="percent num">{{finIdx}}</em>{{progressBarTyp}}
											<span class="arrow"></span>
										</span>
									</div>
								</div>
							</div>

							<p class="item finance">{{finStyBarNm}}</p>
						</div>
						<div class="right">
							<p>								
                                {{finStyDtlPhr1}}
                                <br>                                                               
								<strong class="pointColor green">#{{finStyCdNm}}</strong>
                            </p>
							
						</div>
					</div>
					<!-- //case 01 노후준비형 -->

					<!-- case 02 금융전문가 -->
					<div class="line_box_2023 02">
						<div class="left master">
							<img src="../../../../../../src/assets_v40/images/img/finance_style_02.png" alt="금융전문가 이미지">
						</div>
						<div class="right">
							<p>
								<!-- 효율적으로 균형잡힌	금융 생활을 하는<br>			
								<strong class="pointColor green">#금융전문가</strong> -->
                                {{finStyDtlPhr1}}
                                <br>                                                               
								<strong class="pointColor green">#{{finStyCdNm}}</strong>
							</p>
						</div>
					</div>
					<!-- //case 02 금융전문가 -->

					<!-- case 03 현금보유형 -->
					<div class="line_box_2023 03">
						<div class="left">
							<div class="progressBar">
								<div class="bar high">
									<div class="popover_wrap">
										<span class="popover bg_white">
											<em class="num">{{finIdx}}</em>{{progressBarTyp}}
											<em class="percent blind" aria-hidden="true">70</em><!-- 임시 퍼센트 -->
											<span class="arrow"></span>
										</span>
									</div>
								</div>
							</div>

							<p class="item finance">{{finStyBarNm}}</p>
						</div>
						<div class="right">
							<p>
                                <template v-if="finStyDtlCd === 'FSDTL03'">
                                    {{finStyDtlPhr1}}
                                    <br>                                    
                                </template>
                                <template v-else>
                                    {{finStyDtlPhr1}}<span class="num">{{finStyApptVal}}</span>{{finStyDtlPhr2}}
                                    <br>
                                </template>
								<strong class="pointColor green">#{{finStyCdNm}}</strong>
							</p>
						</div>
					</div>
					<!-- //case 03 현금보유형 -->
				</div>
				<!-- //금융 활동 유형 -->
			</div>
		</div>
		
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>	
	</div>
	<!--// 전체 팝업 종료 -->    
</template>

<script>
/*eslint-disable */ 
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'

import ASIP2010 from '@/views/page/AS/IP/ASIP2010/ASIP2010'
import {dateFormat, monthAdd} from '@/utils/date'
// import {dateFormat} from '@/utils/date'

export default {
    name : "ASIP2010",
    data: () => {
        return {
            
            cusnm           : '',
            basYmd          : null, // 조회 기준년월 YYYYMMDD

            finStyCd        : '',   // 금융스타일코드
            finStyCdNm      : '',   // 금융스타일코드명
            finStyDtlCd     : '',   // 금융스타일상세코드
            finStyDtlPhr1   : '',   // 금융스타일상세문구1
            finStyDtlPhr2   : '',   // 금융스타일상세문구2            
            finStyValCd     : '',   // 금융스타일값코드
            finStyValCdNm   : '',   // 금융스타일값코드명
            finStyBarNm     : '',   // 금융활동유형 바 이름
            finIdx          : 10,   // 금융지표값
            prdStyCd        : '',   // 보유스타일코드
            prdStyCdNm      : '',   // 보유스타일코드명
            prdStyDtlCd     : '',   // 보유스타일상세코드
            prdStyDtlPhr1   : '',   // 보유스타일문구1
            prdStyDtlPhr2   : '',   // 보유스타일문구2
            svRto           : '',   // 저축비율
            ivRto           : '',   // 투자비율
            finStyApptVal   : 0,    // 연령별값
            progressBarTyp  : '%',  // 바 타입

            hldWrsToolTipMsg : '',   // 보유상품툴팁
            fncAcvToolTipMsg : '',   // 금융활동툴팁

            

            prodType        : '',
            detailProd      : '',   
  
        }
    },
    computed : {
    },
    created() {

        this.mydtCusno = this.getUserInfo("mydtCusno")
        this.cusnm     = this.getUserInfo("cusnm")        
        //this.basYmd    = this.params.basYmd                                 // 선택된 년월일

    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent() {
            this.basYmd = dateFormat(new Date(), "YYYYMMDD")
            this.getData();
            
        },
        getData() {

            this.getFinStyleDGS();          

        },

        getFinStyleDGS() {

            const config = {
                url: '/as/ip/10r01', // 인터페이스ID: IF-MOB-PFM-ASIP10R01, 서비스코드: PFMASIP10R01
                data: {
                    "mydtCusno"  : this.getUserInfo('mydtCusno'),	
                    "basYmd"     : this.basYmd
                }
            }

            console.log('======= config =======', config)

            apiService.call(config).then(response =>{

                console.log('======= /as/ip/10r01 =======', response)
                
                this.finStyCd       = response.finStyCd;
                this.finStyDtlCd    = response.finStyDtlCd;
                this.finStyValCd    = response.finStyValCd;
                this.finIdx         = response.finIdx;
                this.prdStyCd       = response.prdStyCd;
                this.prdStyDtlCd    = response.prdStyDtlCd;
                this.svRto          = response.svRto;
                this.ivRto          = response.ivRto;
                this.finStyApptVal  = response.finStyApptVal;

                if(this.prdStyCd === 'PS01')
                {   
                    this.prdStyCdNm = '분산관리성향'    
                    this.hldWrsToolTipMsg = "저축성 상품과 투자성 상품을 각각 1개 이상 보유하며, 자산을 다양하게 분산해서 관리하는 성향"
            
                
                }
                else if(this.prdStyCd === 'PS02')
                {   
                    this.prdStyCdNm = '투자성향'    
                    this.hldWrsToolTipMsg = "저축성 상품은 없지만 투자성 상품은 가진, 수익을 추구하는 성향"
                }
                else 
                {   
                    this.prdStyCdNm = '저축성향'    
                    this.hldWrsToolTipMsg = "저축성 상품은 있지만, 투자성 상품은 없는, 안전 지향적인 성향"
                }


                if(this.prdStyDtlCd === 'PSDTL01')
                {   
                    this.prdStyDtlPhr1 = '저축 및 투자 상품을 최소 1개씩 보유한'  
                    // this.prdStyDtlPhr2 = ''  
                }
                else if(this.prdStyDtlCd === 'PSDTL02')
                {   
                    this.prdStyDtlPhr1 = '투자 상품 비중이 높은'                                    
                }
                else 
                {   this.prdStyDtlPhr1 = '저축 상품 비중이 높은'                 }


                if(this.finStyValCd === 'TOT_ASET_AM')
                { this.finStyValCdNm = '총자산' }
                else if(this.finStyValCd === 'DCYR_RSV_SV_AM')
                { this.finStyValCdNm = '노후준비저축액' }
                else if(this.finStyValCd === 'GRNTP_ISRFE')
                { this.finStyValCdNm = '보장성보험료' }
                else if(this.finStyValCd === 'CSM_LFE_DBT_RPY_AM')
                { this.finStyValCdNm = '소비생활부채상환액' }
                else if(this.finStyValCd === 'TOT_DBT_BDN_IX')
                { this.finStyValCdNm = '부채부담지수' }
                else if(this.finStyValCd === 'TOT_XPS_AM')
                { this.finStyValCdNm = '총지출' }
                else if(this.finStyValCd === 'DPZ_AM')
                { this.finStyValCdNm = '요구불금액' }
                else 
                { this.finStyValCdNm = '' }


                
                if(this.finStyCd === 'FS01')
                {   
                    this.finStyCdNm =  '금융새내기형'  
                    this.progressBarTyp  = '만원'; 
                    this.finStyBarNm     = '보유 금융자산';
                    $(".line_box_2023.02").hide(); 
                    $(".line_box_2023.03").hide(); 
                    this.finIdx = Math.round(this.finIdx/10000)            
                    this.fncAcvToolTipMsg = "아직 자산 규모가 작거나 금융생활에 필수적인 상품들을 가지고 있지 않은 새내기 유형";                    
                }
                else if(this.finStyCd === 'FS02')
                {   
                    this.finStyCdNm =  '현금중심형'  
                    this.progressBarTyp  = '만원'; 
                    this.finStyBarNm     = '입출금 운용자금';
                    $(".line_box_2023.01").hide(); 
                    $(".line_box_2023.02").hide(); 
                    this.finIdx = Math.round(this.finIdx/10000)
                    this.fncAcvToolTipMsg = "입출금 계좌 잔액이 적정 기준보다 많고 추가로 저축이나 투자를 할 여력이 있는 유형";                    
                }
                else if(this.finStyCd === 'FS03')
                {                       
                    this.finStyCdNm =  '지출과다형'  
                    this.finStyBarNm     = '총지출';
                    this.progressBarTyp  = '만원'; 
                    $(".line_box_2023.01").hide(); 
                    $(".line_box_2023.02").hide(); 
                    this.finIdx = Math.round(this.finIdx/10000)
                    this.fncAcvToolTipMsg = "월 지출 금액이 적정 기준보다 높아 과소비를 주의해야 할 유형";
                }
                else if(this.finStyCd === 'FS04')
                {   
                    this.finIdx = Math.round(this.finIdx * 100)
                    this.finStyCdNm =  '부채과다형'  
                    this.finStyBarNm     = '총부채 비중';
                    this.progressBarTyp  = '%'; 
                    $(".line_box_2023.02").hide(); 
                    $(".line_box_2023.03").hide();  
                    this.fncAcvToolTipMsg = "자산 대비 부채 비중이 높아 부채 상황에 대한 점검이 필요한 유형";   
                }
                else if(this.finStyCd === 'FS05')
                {                       
                    this.finStyCdNm =  '부채위험형'  
                    this.finStyBarNm     = '월 부채 상환액';
                    this.progressBarTyp  = '만원';                     
                    $(".line_box_2023.01").hide(); 
                    $(".line_box_2023.02").hide(); 
                    this.finIdx = Math.round(this.finIdx/10000)   
                    this.fncAcvToolTipMsg = "소비생활부채상환액이 적정 기준보다 많아 일상생활에서 대출 가입을 경계해야 할 유형";  
                                   
                }
                else if(this.finStyCd === 'FS06')
                {   
                    this.finIdx = Math.round(this.finIdx * 100)
                    this.finStyCdNm =  '보장준비형'                        
                    this.finStyBarNm     = '보장성 보험료';
                    this.progressBarTyp  = '%'; 
                    $(".line_box_2023.02").hide(); 
                    $(".line_box_2023.03").hide();                     
                    this.fncAcvToolTipMsg = "보장성보험료로 납부하는 금액이 적정 기준에 충족하여 생명 관련 위험에 대비를 잘 하고 있는 유형";
                }
                else if(this.finStyCd === 'FS07')
                {   
                    this.finStyCdNm =  '노후준비형'  
                    this.progressBarTyp  = '만원'; 
                    this.finStyBarNm     = '노후대비 저축';
                    $(".line_box_2023.01").hide(); 
                    $(".line_box_2023.02").hide();    
                    this.finIdx = Math.round(this.finIdx/10000)                
                    this.fncAcvToolTipMsg = "노후대비를 위해 저축하는 금액이 적정 기준을 충족하여 은퇴 라이프를 잘 준비하고 있는 유형";                    
                }
                else
                {   
                    this.finStyCdNm =  '금융전문가형' 
                    $(".line_box_2023.01").hide(); 
                    $(".line_box_2023.03").hide();   
                    this.fncAcvToolTipMsg = "자산/부채/지출 규모가 모두 적정 수준이며 균형 잡힌 금융생활을 하는 유형";
                }


                if(this.finStyDtlCd === 'FSDTL01')
                {   
                    this.finStyDtlPhr1 =  '보유 금융자산이 150만원 미만인'                    
                }
                else if(this.finStyDtlCd === 'FSDTL02')
                {   
                    this.finStyDtlPhr1 =  '입출금 계좌 잔액이 적정('  
                    this.finStyDtlPhr2 =  '만원)보다 많은'  
                }
                else if(this.finStyDtlCd === 'FSDTL03')
                {   
                    this.finStyDtlPhr1 =  '월 지출금액이 적정(1,200만원) 보다 많은'                      
                }
                else if(this.finStyDtlCd === 'FSDTL04')
                {   
                    this.finStyDtlPhr1 =  '금융자산 대비 부채 비중이 40% 이상인'                      
                }
                else if(this.finStyDtlCd === 'FSDTL05')
                {   
                    this.finStyDtlPhr1 =  '생활부채 상환액이 적정('  
                    this.finStyDtlPhr2 =  '만원)보다 많은'                      
                }
                else if(this.finStyDtlCd === 'FSDTL06')
                {   
                    this.finStyDtlPhr1 =  '보장성보험료 납입액이 적정(8~10%) 기준인'                      
                }
                else if(this.finStyDtlCd === 'FSDTL07')
                {   
                    this.finStyDtlPhr1 =  '노후준비저축액이 적정 ('  
                    this.finStyDtlPhr2 =  '만원)보다 많은'  
                }
                else
                {   
                    this.finStyDtlPhr1 =  '효율적이고 균형잡힌 금융 생활을 하는'  
                }
               
                this.$nextTick(()=>{
                        if (this.executeCnt == 1) infoToolipHandler() // 툴팁 클릭이벤트 생성                         
                        if (this.ivRto > 0 || this.svRto > 0)
                        {
                            this.getChart3() // 나의 신용정보 차트
                        }
                        fn_scrollProgressAni();
                    })                

            })
        },      

        // 신용 차트 
        getChart3() {    
            // -----------------------차트 설정 시작-----------------------

            // rMateChart 를 생성합니다.
            // 파라메터 (순서대로)
            //  1. 차트의 id ( 임의로 지정하십시오. )
            //  2. 차트가 위치할 div 의 id (즉, 차트의 부모 div 의 id 입니다.)
            //  3. 차트 생성 시 필요한 환경 변수들의 묶음인 chartVars
            //  4. 차트의 가로 사이즈 (생략 가능, 생략 시 100%)
            //  5. 차트의 세로 사이즈 (생략 가능, 생략 시 100%)
            rMateChartH5.create("chart1", "chartHolder", "", "130px", "130rem");
            
            // 스트링 형식으로 레이아웃 정의.
            var layoutStr =
            '<rMateChart backgroundColor="#FFFFFF" borderStyle="none">'
                    +'<Pie2DChart innerRadius="0.55" showDataTips="false" selectionMode="single">'
                    /*
                    Doughnut2D 차트 생성시에 필요한 Pie2DChart 정의합니다
                    showDataTips : 데이터에 마우스를 가져갔을 때 나오는 Tip을 보이기/안보이기 속성입니다.
                    innerRadius : PieChart 가운데에 빈 공간을 만듭니다. 유효값 0.1 ~ 0.9 0은 PieChart 1은 차트 사라짐
                    */
                            +'<series>'
                                    +'<Pie2DSeries nameField="expenditure" field="Profit" startAngle="135" renderDirection="clockwise" color="#fff">'
                                            +'<fills>'
                                                    +'<SolidColor color="#fd9d2c"/>' /* 저축 */
                                                    +'<SolidColor color="#fbd82f"/>' /* 투자 */
                                            +'</fills>'
                                            /* Pie2DChart 정의 후 Pie2DSeries labelPosition="inside"정의합니다 */
                                            +'<showDataEffect>'
                                            /* 차트 생성시에 Effect를 주고 싶을 때 shoDataEffect정의합니다 */
                                                    +'<SeriesZoom duration="1000" relativeTo="chart" horizontalFocus="right" />'
                                                    /*
                                                    SeriesZoom 효과는 시리즈 데이터가 데이터로 표시될 때 특정 지점에서 점점 확대되어지며 나타나는 효과를 적용합니다
                                                    - 공통속성 -
                                                    elementOffset : effect를 지연시키는 시간을 지정합니다 default:20
                                                    minimumElementDuration : 각 엘리먼트의 최소 지속 시간을 설정합니다 default:0
                                                                            이 값보다 짧은 시간에 effect가 실행되지 않습니다
                                                    offset : effect개시의 지연시간을 설정합니다 default:0
                                                    perElementOffset : 각 엘리먼트의 개시 지연시간을 설정합니다
                                                    - SeriesZoom속성 -
                                                    relativeTo : 이펙트의 기준을 어디로 잡을지에 대한 속성입니다. 유효값 : chart, series
                                                    horizontalFocus : relativeTo를 기준으로 수평선 방향의 기준을 정합니다. 유효값 : left, center, right
                                                    verticalFocus : relativeTo를 기준으로 수직선 방향의 기준을 정합니다. 유효값 : top, middle, bottom
                                                    */
                                            +'</showDataEffect>'
                                    +'</Pie2DSeries>'
                            +'</series>'
                            +'<backgroundElements>'

                            +'</backgroundElements>'
                    +'</Pie2DChart>'
            +'</rMateChart>';

            // 차트 데이터
            var chartData = [
                {"expenditure":"저축", "Profit":+ (this.svRto)},
                {"expenditure":"투자", "Profit":+ (this.ivRto)},
            ];
            
            // rMateChartH5.calls 함수를 이용하여 차트의 준비가 끝나면 실행할 함수를 등록합니다.
            //
            // argument 1 - rMateChartH5.create시 설정한 차트 객체 아이디 값
            // argument 2 - 차트준비가 완료되면 실행할 함수 명(key)과 설정될 전달인자 값(value)
            // 
            // 아래 내용은 
            // 1. 차트 준비가 완료되면 첫 전달인자 값을 가진 차트 객체에 접근하여
            // 2. 두 번째 전달인자 값의 key 명으로 정의된 함수에 value값을 전달인자로 설정하여 실행합니다.
            rMateChartH5.calls("chart1", {
                    "setLayout" : layoutStr,
                    "setData" : chartData
            });

            rMateChartH5.registerTheme(rMateChartH5.themes);
		
		/**
		 * 샘플 내의 테마 버튼 클릭 시 호출되는 함수입니다.
		 * 접근하는 차트 객체의 테마를 변경합니다.
		 * 파라메터로 넘어오는 값
		 * - simple
		 * - cyber
		 * - modern
		 * - lovely
		 * - pastel
		 * - default
		 *
		 * default : 테마를 적용하기 전 기본 형태를 출력합니다.
		 */
		function rMateChartH5ChangeTheme(theme){
				document.getElementById("chart1").setTheme(theme);
        }            
            
        },
              
        // 농축협 상품 제외 버튼 처리
        fn_checkboxChange(obj){
            this.chkBoxFlag = obj.target.checked
            console.log("======= fn_checkboxChange =======", this.chkBoxFlag)
            
        },
        // 링크 연결
		connectLink(pageId) {
            if(pageId == 'PDPD1001') {	// 맞춤상품추천
				const config = {
					name: pageId
				}
                commonService.movePage(config);
				this.closeAll();
            }else if(pageId == 'ANCA2201'){// NH콕마이카 화면 UI-AN-CA-1001 연결
                const config = {
					name: pageId
				}
                commonService.movePage(config);
                // modalService.openPopup(config).then(() => {
				// });
				this.closeAll();
            }
        },
        getCodeName(grpCd, cd) {
            let ret = ''
            let codeList = this.getCodeList(grpCd)
            for (let i = 0; i < codeList.length; i++) {
                if (cd == codeList[i].comnCVal) {
                    ret = codeList[i].comnCExpl
                    break
                }
            }
            return ret
        }
    },
    mixins: [
        commonMixin,
        popupMixin
    ]
}

function fn_scrollProgressAni() {

        var progressBar = $('.progressBar .bar');
			

        progressBar.each(function(){
            var progressNum = $(this).children().find('.popover .percent').text();
            var popoverWrap = $(this).children('.popover_wrap');            

            if(progressNum >= 100) {
                progressNum = 100;
                popoverWrap.css('transform','translateX(-100%)');// 230721 -100%로 수정
                popoverWrap.animate({
                    left: progressNum + "%"
                },2000,function(){
                    popoverWrap.addClass('full');
                });
            } else if(progressNum == 0) {
                popoverWrap.addClass('zero');
            } else {
                popoverWrap.animate({
                    left: progressNum +'%'
                },2000);
                // popoverWrap.css('transform','translateX(-'+transformXWidth+'rem)');
            }

            progressBar.css('width','0');
            popoverWrap.css('left','0');				
            $(this).animate({					
                width: progressNum + '%',
            },2000);
        
        });

}
</script>