<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 정책자금 > 복지지원금
* @ 페이지설명 : 마이농가 > 정책자금 > 복지지원금 목록
* @ 파일명     : src/views/page/SZ/PC/SZPC2114/SZPC2114.vue
* @ 작성자     : CS516033
* @ 작성일     : 2021-06-01
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-01              CS516033              최초작성
*************************************************************************/
-->
<template>
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>복지지원금</h1>
		</div>
		<div class="popup_content com_bg_type00 com_no_bottom" ref="popup_content">
            <div class="com_inner com_line_type01">
				<div class="top_info_box_wrap new_mb40">
					<div class="top_info_box type02 hasdetail new_top_box noBG">
						<div class="box_head">
							<div class="info">
								<div class="title">
									맞춤복지지원금
								</div>
							</div>
							<button class="restore" @click.prevent="reset()">
								초기화
							</button>
						</div>
						<div class="btn_half_box2 mt20 restore_wrap">
							<a href="javascript:void(0);" role="button" @click.prevent="openResetPop()" class="btn full restore_big_btn" v-if="estYn == 'true'">복지지원금 맞춤 재설정</a>
							<a href="javascript:void(0);" role="button" @click.prevent="openResetPop()" class="btn full restore_big_btn" v-else>복지지원금 맞춤 설정</a>
						</div>
						<div class="box_toggle_wrap restore_list_wrap">
							<div class="box_toggle">
								<div class="toggle-box">
									<div data-ui-toggle="box">									
										<div class="view-box" data-ui-toggle="view">
											<div class="info">
												<div class="title">생애주기</div>
												<div class="text">{{getCusIntKwrd('11')}}</div>
											</div>
											<!-- 2021.12.16 대상특성 부분 주석처리 하기로 함
                                            <div class="info">
												<div class="title">특성</div>
												<div class="text">{{getCusIntKwrd('12')}}</div>
											</div> -->
										</div>
										<button type="button" class="view-btn" aria-expanded="false">
											<!-- <em class="open">열기</em><em class="close">닫기</em> -->
										</button>
									</div>
								</div>
							</div> 
						</div>  
					</div>
				</div>
			</div>
            <div class="com_inner com_inputbox_type01">
				<div class="com_input_type02">
					<label for="txt01"></label>
					<input type="search" id="txt01" placeholder="검색어를 입력해주세요." v-model="srchKwrd" title="검색어를 입력해주세요." @keyup="fn_ValidChk()" @keyup.enter="getSrchKwrd()">
					<a href="javascript:void(0);" role="button" class="com_btn_search" @click.prevent="getSrchKwrd()"><span class="blind">검색</span></a>
				</div>
                <div class="com_btnarea_type02" v-if="pplrtCnt > 0">
                    <strong class="com_box_tit03">인기 검색어</strong>
                    <template v-for="(pplrtKwrd, idx) in pplrtKwrdList">
                        <a href="javascript:void(0);" role="button" class="com_btn_txtsearch" v-if="idx < 4" :key="idx" @click.prevent="setPplrtKwrd(pplrtKwrd.inteKwrdCntnExpl)">
                            <span>{{pplrtKwrd.inteKwrdCntnExpl}}</span>
                        </a>
                    </template>
                </div>
			</div>
            <div class="com_inner com_bg_type00">
                <div class="com_total_type01">
                    <template v-if="estYn == 'true'">
                        <strong class="com_myfarm_tit01">맞춤 복지지원금</strong>
                        <span class="txt_total">총<em>{{inqCn}}</em>건</span>
                    </template>
                    <template v-else-if="kwrdSrchYn">
                        <strong class="com_myfarm_tit01">복지지원금</strong>
                        <span class="txt_total">총<em>{{inqCn}}</em>건</span>
                    </template>
                    <template v-else>
                        <strong class="com_myfarm_tit01">복지지원금</strong>
                        <span class="txt_total">총<em>{{ttcn}}</em>건</span>
                    </template>
				</div>
                <div class="card_list_type" ref="list">
                    <template v-if="wfeFdList.length > 0">
                        <div class="com_box_type01" v-for="(wfeFd, idx) in wfeFdList" :key="idx">
                            <div class="card_list_box">
                                <a href="javascript:void(0);" role="button" @click.prevent="openDetailPop(wfeFd)">
                                    <div class="tit">{{wfeFd.bbrdTinm}}</div>
                                    <span class="level" v-for="(kwrd, idx2) in wfeFd.kwrdList" :key="'kwrd_'+idx2">{{kwrd.inteKwrdCntn}}</span>
                                    <dl class="add_info">
                                        <dt>접수기간</dt>
                                        <dd>{{wfeFd.aplprdCntn}}</dd>
                                    </dl>
                                </a>
                            </div>
                        </div>
                        <div class="com_btn_area02">
                            <a href="javascript:void(0);" role="button" class="com_btn_more" @click="showMore" v-show="btnShowYn"><span>더보기</span></a>
                        </div>
                    </template>
                    <template v-else>
                        <div class="no_data_box">
                            <div class="no_data_list">
                                <p>조회된 정보가 없습니다.</p>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
		</div>
		<a href="javascript:void(0);" role="button" @click.prevent="close('0000')" class="btn_close"><span class="blind">팝업닫기</span></a>
	</div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import modalService from '@/service/modalService'
    import apiService from '@/service/apiService'

    import SZPC2110 from '@/views/page/SZ/PC/SZPC2110/SZPC2110'
    import SZPC2115 from '@/views/page/SZ/PC/SZPC2115/SZPC2115'

    export default {
        name : "SZPC2114",
        data: () => {
            return {
                pageNo         : 1,    // 페이지수
                btnShowYn      : true, // 더보기 버튼 표시여부
                kwrdSrchYn     : false,// 키워드검색여부
                srchKwrd       : "",   // 검색키워드
                lstSrchKwrd    : "",   // 최종검색키워드
                estYn          : "",   // 맞춤설정여부
                ttcn           : 0,    // 전체 건수
                inqCn          : 0,    // 맞춤설정 조회 결과 전체 건수
                nxDataYn       : "",   // 다음데이터여부
                wfeFdCn        : 0,    // 지원정책자금건수
                wfeFdList      : [],   // 복지지원금목록
                cusIntCnt      : 0,    // 고객관심키워드 개수
                cusIntKwrdList : [],   // 고객관심키워드목록
                pplrtCnt       : 0,    // 인기키워드 개수
                pplrtKwrdList  : []    // 인기키워드목록
            }
        },
        mounted() {
            this.initComponent();

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        methods: {
            initComponent() {
                this.srchKwrd    = "";
                this.lstSrchKwrd = "";

                this.getData();     // 복지지원금 설정항목 및 인기키워드 조회
                this.getSrchKwrd(); // 복지지원금 목록 조회
            },
            getData() {
                const config = {
                    url: '/sz/pc/14r02',
                    data: {
                        mydtCusno : this.getUserInfo('mydtCusno'), // 고객번호
                        cptDsc    : "2"                            // 자금구분코드 - 2:복지지원금
                    }
                };

                apiService.call(config).then(response => {
                    this.cusIntKwrdList = response.cusIntKwrdList || [];
                    this.pplrtKwrdList  = response.pplrtKwrdList || [];

                    this.cusIntCnt = this.cusIntKwrdList.length;
                    this.pplrtCnt  = this.pplrtKwrdList.length;
                });
            },
            getSrchKwrd() {
                this.pageNo    = 1;
                this.btnShowYn = true;

                const config = {
                    url: '/sz/pc/14r01',
                    data: {
                        mydtCusno    : this.getUserInfo('mydtCusno'), // 고객번호
                        srchKwrd     : this.srchKwrd,                 // 검색키워드
                        pageNo       : this.pageNo
                    }
                };

                apiService.call(config).then(response => {
                    this.lstSrchKwrd = this.srchKwrd;
                    this.estYn       = response.estYn;
                    this.ttcn        = response.ttcn;
                    this.inqCn       = response.inqCn;
                    this.nxDataYn    = response.nxDataYn;
                    this.wfeFdCn     = response.wfeFdCn;
                    this.wfeFdList   = response.wfeFdList || [];
                    this.kwrdSrchYn  = this.srchKwrd != null && this.srchKwrd != "" ? true : false;
                    
                    // 더보기 버튼 표시여부
                    this.setBtnShowYn();
                });
            },
            getCusIntKwrd(kwrdDsc) {
                let list = this.cusIntKwrdList.filter(d => d.pycpInteKwrdDsc == kwrdDsc);
                let kwrd = "";

                if (list.length > 0) {
                    for (var i=0; i<list.length; i++) {
                        if (kwrd.length > 0) {
                            kwrd += " · ";
                        }
                        kwrd += list[i].inteKwrdCntnExpl;
                    }
                } else {
                    kwrd = "설정없음";
                }

                return kwrd;
            },
            setPplrtKwrd(kwrd) {
                this.srchKwrd = kwrd;
                this.getSrchKwrd();
            },
            // 더보기
            showMore() {
                this.pageNo = this.pageNo + 1;
                let scroll  = this.$refs.list.offsetHeight; // 버튼 클릭 전 스크롤 위치 저장

                const config = {
                    url: '/sz/pc/14r01',
                    data: {
                        mydtCusno    : this.getUserInfo('mydtCusno'), // 고객번호
                        srchKwrd     : this.lstSrchKwrd,              // 최종검색키워드
                        pageNo       : this.pageNo
                    }
                };

                apiService.call(config).then(response => {
                    for (let i=0; i<response.wfeFdList.length; i++) {
                        this.wfeFdList.push(response.wfeFdList[i]);
                    }
                    this.ttcn     = response.ttcn;
                    this.inqCn    = response.inqCn;
                    this.nxDataYn = response.nxDataYn;
                    
                    // 더보기 버튼 표시여부
                    this.setBtnShowYn();

                    // 스크롤 위치 조정
                    this.$nextTick(() => {
                        this.$refs.popup_content.scrollTop = scroll;
                    })
                })
            },
            setBtnShowYn() {
                if (this.nxDataYn == "Y") {
                    this.btnShowYn = true;
                } else {
                    this.btnShowYn = false;
                }
            },
            reset() {
                const config = {
                    content: ['초기화하시겠습니까?']
                };

                modalService.confirm(config).then(text => {
                    if(text == "예") {
                        const config = {
                            url: '/sz/pc/10s01',
                            data: {
                                cptDsc          : '2',                           // 자금구분코드 - 2:복지지원금
                                mydtCusno       : this.getUserInfo('mydtCusno'), // 고객번호
                                cusInteKwrdList : []                             // 고객관심키워드목록
                            }
                        };

                        apiService.call(config).then(response => {
                            if(response.rspC === '0000') {
                                this.initComponent();
                            }
                        })
                    }
                });
            },
            openResetPop() {
                const config = {
                    component : SZPC2110
                };
                
                modalService.openPopup(config).then((response) => {
                    if (response == "0000") { // 저장 성공
                        this.initComponent();
                    }
                });
            },
            openDetailPop(wfeFdInfo) {
                const config = {
                    component : SZPC2115,
                    params    : wfeFdInfo
                };

                modalService.openPopup(config).then(() => {
                });
            },
            // 입력필드에서 맨 앞 띄어쓰기 제거
            fn_ValidChk() {
                if(this.srchKwrd.length === 1 && this.srchKwrd.search(/\s/) === 0) {
                    this.srchKwrd = ""
                }
            }
        }
    }
</script>