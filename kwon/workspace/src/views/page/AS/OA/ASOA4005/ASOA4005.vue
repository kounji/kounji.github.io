<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 기타
* @ 페이지설명 : 나의자산 > 자산 > 기타 금
* @ 파일명     : src/views/page/AS/OA/ASOA2005/ASOA2005.vue
* @ 작성자     : CS516033
* @ 작성일     : 2021-05-27
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-27              CS516033              최초작성 
* 2022-07-20              CS528205              고도화 파일명, UI 변경 및 고도화 개발(ASRA1108.vue -> ASOA2005.vue)
* 2025-03-10              CS541015              상호금융 NH콕마이데이터 4.0 추진 개발 (ASOA2005 → ASOA4005)
*************************************************************************/
-->
<template>
    <div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1 class="">금</h1>
			<!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>
		
		<div class="popup_content"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner">
				<div class="new_top_box custom_card">
					<div class="box_head">
						<div class="info">
							<div class="title">
								<strong>{{goldKdc != "04" ? goldKdnm + "금" : goldKdnm}}</strong>
							</div>
						</div>
						<i :class="goldKdicnm"></i><!-- gold24 (24k) / gold18 (18k) / gold14 (14k) / gold_white (백금) -->
					</div>

					<div class="box_content">
						<div class="price">
							<div class="won">
								<span class="num">{{goldAsetQttt | numberFilter("0,0.00")}}</span>
								<span>그램</span>
								<div class="custom_tooltip">
									<div class="com_tooltip_type02 com_tooltip_type03">
										<a href="javascript:void(0);" class="com_btn_info">
											<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
											<!-- <span class="arrow" style="display:none"></span> -->
										</a>
									</div>
									<div class="com_ballon_type01 com_ballon_type02" style="display:none;">
										<div>
											보유한 금 자산의 총 중량을 그램으로 환산 후 최종 고시가격 기준으로 원화로 전환한 금액입니다.
											<p>* 1돈 = 3.75g</p>
											<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
										</div> <!-- 말풍선영역 -->
									</div>
								</div>
							</div>
							<a href="javascript:void(0);" role="button" class="com_btnround_type03 custom_co" @click.prevent="openGoldMprPopup('cal')">시세계산</a>
						</div>
                        <!-- [v4.0] 25-02-26 면책조항 툴팁 추가 -->
						<div class="period sub_price">
							<span><em>{{goldAsetAmtt | numberFilter}}</em><span>원</span></span>
							<div class="custom_tooltip">
								<div class="com_tooltip_type02 com_tooltip_type03">
									<a href="javascript:void(0);" class="com_btn_info" role="button">
										<em class="com_icon_info"><span class="blind">툴팁열기</span></em>
									</a>
									<div class="com_ballon_type01 com_ballon_type02" style="display:none;">
										<div>
											<div class="disclaimer_list">
												<strong class="h_tit03">면책조항</strong>
												<ul class="bl_dot_list">
													<li>농업협동조합중앙회가 제공하는 금시세정보는 금거래소의 정보를 토대로 제공되는 투자 참고 사항이며 오류가 발생하거나 지연될 수 있습니다.</li>
													<li>제공된 정보에 의한 투자 결과에 법적 책임을 지지 않습니다.</li>
													<li>실물 구입 시 부가가치세 10%가 부과될 수 있습니다.</li>
												</ul>
											</div>
											<a href="javascript:void(0);" class="com_btn_close"><span class="blind">툴팁닫기</span></a>
										</div> 
									</div>
								</div>
							</div>
						</div>
						<!-- //[v4.0] 25-02-26 면책조항 툴팁 추가 -->
					</div>
				</div>
				<!-- 단건 -->
				<div class="re_detail_list">
					<div class="new_tit_area">
						<div class="tit">
							<span>금 자산 등록 내역</span>
						</div>
					</div>
					<ul>
						<li v-for="(gldAst, idx) in gldAstList" :key="idx">
							<div v-if="gldAstCn > 1" class="re_flex">
								<strong class="text_info f_normal">{{gldAst.astnm}}</strong>
								<span class="list_price">
									<em>{{gldAst.goldAsetQt | numberFilterAuto('0,00.00', {precision: 2}, false)}}</em>{{gldAst.goldUntDsnm}}
								</span>
                                <a href="javascript:void(0);" class="com_btnwrite" @click.prevent="movePage(idx)">
									<span class="blind">수정</span>
								</a>
								<a href="javascript:void(0);" class="com_btn_delete" @click.prevent="fn_delBtn(gldAst.sqno)">
									<span class="blind">삭제</span>
								</a>
							</div>
                            <div v-else class="re_flex">
								<strong class="text_info f_normal">{{gldAst.astnm}}</strong>
								<span class="list_price">
									<em>{{gldAst.goldAsetQt | numberFilterAuto('0,00.00', {precision: 2}, false)}}</em>{{gldAst.goldUntDsnm}}
								</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="popup_footer fixed">
			<!-- 다건 -->
            <template v-if="gldAstCn > 1">
                <div class="btns_wrap">
                    <button type="button" class="btns lg primary" v-on:click.prevent="fn_allDelBtn()">자산 모두 삭제</button>
                </div>
            </template>
			<!-- //다건 -->
			<!-- 단건 -->
            <template v-else>
                <div class="btns_wrap">
                    <button type="button" class="btns lg" v-on:click.prevent="fn_allDelBtn()">삭제</button>
                    <button type="button" class="btns lg primary" v-on:click.prevent="movePage(0)">수정</button>
                </div>
            </template>
			<!-- //단건 -->
		</div>
		<a href="javascript:void(0);" @click.prevent="close(true)" class="btn_close"><span class="blind">팝업닫기</span></a>		
	</div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import COOA4004 from '@/views/page/CO/OA/COOA4004/COOA4004'
    import ASOA4006 from '@/views/page/AS/OA/ASOA4006/ASOA4006'
    import ASOA4007 from '@/views/page/AS/OA/ASOA4007/ASOA4007'

    export default {
        name : "ASOA4005",
        data: () => {
            return {
                goldKdc      : "", // 골드종류코드
                goldKdnm     : "", // 골드종류명
                goldKdicnm   : "", // 골드종류아이콘명
                goldAsetAmtt : 0,  // 골드자산금액합계
                goldAsetQttt : 0,  // 골드자산수량합계
                goldMpr      : 0,  // 골드살때시세
                goldMprBasDt : "", // 골드시세기준일자
                gldAstCn     : 0,  // 금자산건수
                gldAstList   : [], // 금자산목록

                goldMprDiff  : 0,  // 골드시세 차액

                goldMprList  : []  // 골드시세 리스트
            }
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        mounted() {
            this.initComponent(this.params);

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        methods: {
            initComponent(param) {
                this.goldKdc = param.goldKdc;
                this.getData();
            },
            getData() {
                // 금 상세 조회 v2
                const config = {
                    url: "/as/oa/05ra1",
					data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno'), // 고객번호
                        "goldKdc"   : this.goldKdc                   // 골드종류코드
                    }
                };
                apiService.call(config).then(response => {
                    this.goldKdc      = response.goldKdc;
                    this.goldKdnm     = response.goldKdnm;
                    this.goldAsetAmtt = response.goldAsetAmtt;
                    this.goldAsetQttt = response.goldAsetQttt;
                    this.goldMpr      = response.goldPucMpr;
                    this.goldMprBasDt = response.goldMprBasDt;
                    this.gldAstCn     = response.gldAstCn;
                    this.gldAstList   = response.gldAstList || [];

                    // 골드종류아이콘명
                    if (this.goldKdc == "01") {
                        this.goldKdicnm = "gold24"; // 24K
                    } else if (this.goldKdc == "02") {
                        this.goldKdicnm = "gold18"; // 18K
                    } else if (this.goldKdc == "03") {
                        this.goldKdicnm = "gold14"; // 14K
                    } else if (this.goldKdc == "04") {
                        this.goldKdicnm = "gold_white"; // 백금
                    }

                    this.getMprDiff();
                    // 금액 Animate 처리 함수 호출
                    // amountCountAnimate("goldAsetQt", this.goldAsetQt);
                    // amountCountAnimate("goldAsetAm", this.goldAsetAm);
                })
            },
            getMprDiff() {
                // 최신 금시세 조회
                const config = {
                    url: "/as/oa/05ra2"
                };

                apiService.call(config).then(response => {
                    this.goldMprList = response.gldMprList || [];
                    for (var i = 0; i < this.goldMprList.length; i++) {
                        if (this.goldMprList[i].goldKdc === this.goldKdc) {
                            this.goldMprDiff = this.goldMprList[i].goldPucMprDiff;// 골드살때시세_시세차액
                            break;
                        }
                    }
                });
            },
            movePage(astIdx) {
                const config = {
                    component : COOA4004,
                    params    : {
                        isUpt      : true,
                        goldMprBasDt : this.goldMprBasDt,               // 골드시세적용날짜
                        goldKdc    : this.goldKdc,                      // 골드종류코드
                        goldKdnm   : this.goldKdnm,                      // 골드종류명
                        goldMpr    : this.goldMpr,                      // 골드시세
                        sqno       : this.gldAstList[astIdx].sqno,       // 일련번호
                        goldUntDsc : this.gldAstList[astIdx].goldUntDsc, // 골드단위구분코드
                        goldAsetQt : this.gldAstList[astIdx].goldAsetQt, // 골드자산수량
                        astnm      : this.gldAstList[astIdx].astnm       // 자산명
                    }
                };
                
                modalService.openPopup(config).then((response) => {
                    if (response.uptCom == true) { // 수정완료
                        this.getData();
                    }
                });
            },
            // 개별 삭제
            fn_delBtn(sqno) {
                const config = {
                    content : ['등록된 자산을 삭제 하시겠습니까?'],
                    title   : ""
                };

                modalService.confirm(config).then(text => {
                    if(text == "예") {
                        this.fn_delGold(sqno);
                    }
                });
            },
            // 금 전체 삭제
            fn_allDelBtn() {
                const config = {
                    content : ['자산을 삭제하시면 더 이상 나의 자산 금액에 반영되지 않습니다.'],
                    title   : ""
                };

                modalService.confirm(config).then(text => {
                    if(text == "예") {
                        this.fn_delGold("ALL");
                    }
                });
            },
            fn_delGold(dsc) {
                const config = {
                    url  : '/co/oa/04s01',
                    data : {
                        mydtCusno : this.getUserInfo('mydtCusno'), // 마이데이터고객번호
                        goldKdc   : this.goldKdc,                  // 골드종류코드
                        sqno      : dsc != "ALL" ? dsc : "",       // 일련번호
                        trDsc     : dsc != "ALL" ? "3" : "4"       // 거래구분코드(1:저장, 2:수정, 3:삭제, 4:전체삭제)
                    }
                }
                
                apiService.call(config).then(response => {
                    if (response.rspC == '0000') {
                        modalService.alert("삭제되었습니다.").then(() => {
                            if (dsc != "ALL") {
                                this.getData();
                            } else {
                                this.closeAll(response.rspC);
                            }
                        });
                    } else {
                        modalService.alert("삭제 중 오류가 발생하였습니다.").then(() => {});
                    }
                });
            },
            openGoldMprPopup(mode) {
                var componentNm

                if (mode === 'cal') { // 계산기
                    componentNm = ASOA4007
                } else {// 시세 조회
                    componentNm = ASOA4006
                }
                
                const config = { 
                    renderer : {
                        component : componentNm
                    },
                    params : {
                        goldMprList : this.goldMprList,
                        goldKdc     : this.goldKdc
                    }
                }
                modalService.openSlidePagePopup(config);
            },
            getDiffCss(diff) {
                if (diff > 0)
                    return "raise"
                else if (diff == 0)
                    return "zero"
                else 
                    return "decrease"
            },
            getBlindStr(diff) {
                if (diff > 0)
                    return "상승"
                else if (diff == 0)
                    return "유지"
                else 
                    return "하락"
            }
        }
    }
</script>