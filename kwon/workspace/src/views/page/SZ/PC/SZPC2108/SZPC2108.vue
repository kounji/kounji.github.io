<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 정책자금 > 정책자금 목록
* @ 페이지설명 : 마이농가 > 정책자금 > 정책자금 목록
* @ 파일명     : src/views/page/SZ/PC/SZPC2108/SZPC2108.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-06-03
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-06-03              CS515897              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>정책자금</h1>
		</div>
			
		<div class="popup_content com_bg_type00 com_no_bottom" ref="popup_content">
            <div class="com_inner com_line_type01">
				<div class="top_info_box_wrap new_mb40">
					<div class="top_info_box type02 hasdetail new_top_box noBG">
						<div class="box_head">
							<div class="info">
								<div class="title">
									맞춤정책자금
								</div>
							</div>
							<button class="restore" @click.prevent="resetSetting">
								초기화
							</button>
						</div>
						<div class="btn_half_box2 mt20 restore_wrap">
                            <template v-if="cusintCnt == 0">
                                <a href="javascript:void(0);" role="button" @click.prevent="setCusInte" class="btn full restore_big_btn">정책자금 맞춤 설정</a>
                            </template>
                            <template v-else>
                                <a href="javascript:void(0);" role="button" @click.prevent="setCusInte" class="btn full restore_big_btn">정책자금 맞춤 재설정</a>
                            </template>
						</div>
						<div class="box_toggle_wrap restore_list_wrap">
							<div class="box_toggle">
								<div class="toggle-box">
									<div data-ui-toggle="box">									
										<div class="view-box">
											<div class="info">
												<div class="title">지원분야</div>
												<div class="text">
                                                    {{getDscText('01')}}
                                                </div>
											</div>
											<div class="info">
												<div class="title">지역</div>
												<div class="text">
                                                    {{getDscText('02')}}
                                                </div>
											</div>
											<div class="info">
												<div class="title">업종</div>
												<div class="text">
                                                    {{getDscText('03')}}
                                                </div>
											</div>
											<div class="info">
												<div class="title">기업형태</div>
												<div class="text">
                                                    {{getDscText('04')}}
                                                </div>
											</div>
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
					<input type="search" id="txt01" placeholder="검색어를 입력해주세요." :value="srchTxt" @keyup="fn_ValidChk, fn_checkWord($event, 40)" @keyup.enter="srchForTxt" ref="srchTxt" title="검색어를 입력해주세요.">
					<a href="javascript:void(0);" role="button" @click.prevent="srchForTxt" class="com_btn_search"><span class="blind">검색</span></a>
				</div>

                <template v-if="pplrtKwrdList.length > 0">
                    <div class="com_btnarea_type02">
                        <strong class="com_box_tit03">인기 검색어</strong>
                        <a href="javascript:void(0);" role="button" class="com_btn_txtsearch" v-for="(item, idx) in pplrtKwrdList" :key="idx" @click.prevent="setText(item.inteKwrdCntnExpl)">
                            <span>{{item.inteKwrdCntnExpl}}</span>
                        </a>
                    </div>
                </template>
			</div>

            <div class="com_inner com_bg_type00">
                <div class="com_total_type01">
                    <template v-if="totDsc && !srchDsc">    <!-- 맞춤 설정이 되지 않은 경우 -->
                        <strong class="com_myfarm_tit01">전체 정책자금</strong>
                        <span class="txt_total">총<em>{{ttcn}}</em>건</span>
                    </template>
                    <template v-else-if="!totDsc && !srchDsc">  <!-- 맞춤 설정이 되어있고 검색어를 통해 검색하지 않은경우 -->
                        <strong class="com_myfarm_tit01">맞춤 정책자금</strong>
                        <span class="txt_total">총<em>{{inqCn}}</em>건</span>
                    </template>
                    <template v-else-if="srchDsc">  <!-- 검색어로 검색한 경우 -->
                        <strong class="com_myfarm_tit01">맞춤 정책자금</strong>
                        <span class="txt_total">총<em>{{inqCn}}</em>건</span>
                    </template>
				</div>

				<div class="card_list_type" ref="list">
                    <template v-if="sptPlyFdList.length > 0">
                        <template v-for="(item, idx) in sptPlyFdList">
                            <div class="com_box_type01" :key="'list_'+idx">
                                <div class="card_list_box">
                                    <a href="javascript:void(0);" role="button" @click.prevent="openDetailPop(item)">
                                        <div class="tit">
                                            {{item.bbrdTinm}}
                                        </div>
                                        <span class="level" v-for="(kwrdList, listIdx) in item.kwrdList" :key="'sptDvs_'+listIdx">
                                            {{kwrdList.inteKwrdCntn}}
                                        </span>
                                        <dl class="add_info">
                                            <dt>접수기간</dt>
                                            <dd>{{item.aplprdCntn}}</dd>
                                        </dl>
                                    </a>
                                </div>
                            </div>
                        </template>
                        <div class="com_btn_area02">
                            <a href="javascript:void(0);" role="button" class="com_btn_more" @click.prevent="showMore" v-show="nxDataYn === 'Y'"><span>더보기</span></a>
                        </div>
                    </template>
                    <template v-else>
                        <div class="no_data_box">
                            <div class="no_data_list">
                                <p>{{noListMsg}}</p>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
		</div>

        <a href="javascript:void(0);" role="button" @click.prevent="closePop" class="btn_close"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import {checkWord} from '@/utils/data'
import SZPC2109 from '@/views/page/SZ/PC/SZPC2109/SZPC2109'
import SZPC2102 from '@/views/page/SZ/PC/SZPC2102/SZPC2102'

export default {
    name : "SZPC2108",
    data: () => {
        return {
            srchTxt : "",
            // 지원정책자금 설정
            cusintCnt       : 0,   // 고객관심키워드 개수(화면단)
            cusIntKwrdList  : [],  // 고객관심키워드목록
            pplrtCnt        : 0,   // 인기키워드 개수(화면단)
            pplrtKwrdList   : [],  // 인기키워드목록
                
            // 지원정책자금 통합
            ttcn            : 0,    // 총건수 
            inqCn           : 0,    // 조회건수(맞춤설정)
            sptPycpCn       : 0,    // 지원정책자금건수
            sptPlyFdList    : [],   // 지원정책자금목록
                
            // 목록 필터
            listA : [],     // 지원분야 목록
            listB : [],     // 지역 목록
            listC : [],     // 업종 목록
            listD : [],     // 기업형태 목록

            totDsc      : false,    // 전체 정책자금(true) or 맞춤 정책자금(false) 구분
            srchDsc     : false,    // 검색어 이용구분
            lstSrchTxt  : "",       // 검색어로 검색한 최종 텍스트
            setModYn    : false,    // 맞춤설정변경여부
            noListMsg   : "",       // 리스트 조회 결과 없을시 메시지

            pageNo      : 1,        // 페이지번호
            nxDataYn    : 'N',      // 다음페이지 여부
        }
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        initComponent() {
            this.totDsc     = false
            this.srchDsc    = false
            this.lstSrchTxt = ""
            this.setModYn   = false
            this.noListMsg  = "조회된 정보가 없습니다."

            this.pageNo = 1

            this.getData()
        },
        getData() {
            const mydtCusno = this.getUserInfo('mydtCusno')

            // 지원정책자금 설정항목 및 인기키워드 조회
            const config_0 = {
                url : '/sz/pc/08r02',
                data : {
                    'mydtCusno' : mydtCusno,    // 마이데이터고객번호
                    'cptDsc'    : '1',          // 자금구분코드
                }
            }
            apiService.call(config_0).then(response => {
                this.pplrtKwrdList  = response.pplrtKwrdList || []  // 인기키워드목록
                this.cusIntKwrdList = response.cusIntKwrdList || [] // 고객관심키워드목록
                this.cusintCnt      = this.cusIntKwrdList.length

                this.listA = this.cusIntKwrdList.filter(d => d.pycpInteKwrdDsc === '01')    // 지원분야
                this.listB = this.cusIntKwrdList.filter(d => d.pycpInteKwrdDsc === '02')    // 지역
                this.listC = this.cusIntKwrdList.filter(d => d.pycpInteKwrdDsc === '03')    // 업종
                this.listD = this.cusIntKwrdList.filter(d => d.pycpInteKwrdDsc === '04')    // 기업형태
            })

            // 지원정책자금 목록 조회
            const config_1 = {
                url : '/sz/pc/08r01',
                data : {
                    'mydtCusno'     : mydtCusno,    // 마이데이터고객번호
                    "pageNo"        : this.pageNo
                }
            }
            apiService.call(config_1).then(response => {
                this.sptPlyFdList   = response.sptPlyFdList || []
                this.ttcn           = response.ttcn
                this.inqCn          = response.inqCn
                this.nxDataYn       = response.nxDataYn || 'N'

                // 전체, 맞춤설정 구분
                this.totDsc         = response.estYn === 'true' ? false : true
                this.srchDsc = false    // 검색어로 검색 유무
            })
        },
        // 정책자금 맞춤 텍스트 리턴
        getDscText(type) {
            let target
            if (type === '01') target = this.listA
            if (type === '02') target = this.listB
            if (type === '03') target = this.listC
            if (type === '04') target = this.listD

            const list = target || []
            const first = list[0] || {}
            const size = list.length
            let text = first.inteKwrdCntnExpl
            
            if(size > 1) {
                for(let i=1; i<size; i++) {
                    text += ' · ' + list[i].inteKwrdCntnExpl
                }
            }
            
            return size === 0 ? '설정없음' : text
        },
        // 맞춤설정버튼 클릭
        setCusInte() {
            const config = {
                component : SZPC2102,
                
            }
            modalService.openPopup(config).then(response => {
                if(response === '0000') {
                    this.setModYn = true
                    this.srchTxt = ""
                    this.initComponent()
                }
            })
        },
        // 인기 검색어 클릭시 검색창에 텍스트 set
        setText(txt) {
            this.srchTxt = txt
            
            this.srchForTxt()
        },
        // 검색어로 정책자금 검색
        srchForTxt() {
            if(this.srchTxt != "") {
                // 지원정책자금 목록 조회
                this.pageNo = 1

                const config = {
                    url : '/sz/pc/08r01',
                    data : {
                        'mydtCusno'     : this.getUserInfo('mydtCusno'),
                        'pageNo'        : this.pageNo,
                        'srchKwrd'      : this.srchTxt,
                    }
                }
                apiService.call(config).then(response => {
                    this.sptPlyFdList   = response.sptPlyFdList || []
                    this.ttcn           = response.ttcn || ""
                    this.inqCn          = response.inqCn || 0
                    this.nxDataYn       = response.nxDataYn || 'N'

                    // 전체, 맞춤설정 구분
                    this.totDsc         = response.estYn === 'true' ? false : true
                    this.srchDsc = true // 검색어 조회 

                    // 검색결과 없을 시 메시지 설정
                    this.noListMsg = this.inqCn > 0 ? "" : "검색결과가 없습니다."

                    // 검색어 변경 후 검색없이 더보기 클릭시 변경 전 검색어로 더보기
                    this.lstSrchTxt = this.srchTxt
                })
            } else {
                this.initComponent()
            }
        },
        // 더보기
        showMore() {
            this.pageCnt        = this.pageCnt + 1
            let scroll          = this.$refs.list.offsetHeight  // 버튼 클릭 전 스크롤 위치 저장

            this.pageNo = this.pageNo + 1

            const config = {
                url : '/sz/pc/08r01',
                data : {
                    'mydtCusno'     : this.getUserInfo('mydtCusno'),
                    'pageNo'        : this.pageNo,
                    'srchKwrd'      : this.lstSrchTxt
                }
            }
            apiService.call(config).then(response => {
                for(let i=0; i<response.sptPlyFdList.length; i++) {
                    this.sptPlyFdList.push(response.sptPlyFdList[i])
                }
                this.ttcn = response.ttcn || ""
                this.inqCn = response.inqCn || ""
                this.nxDataYn = response.nxDataYn || 'N'
                
                // 스크롤 위치 조정
                this.$nextTick(() => {
                    this.$refs.popup_content.scrollTop = scroll
                })
            })
        },
        // 정책자금상세
        openDetailPop(listData) {
            const config = {
                component : SZPC2109,
                params : {
                    pycpOrnDsc  : listData.pycpOrnDsc,
                    dataRflDt   : listData.dataRflDt,
                    sqno        : listData.sqno,
                }
            }
            modalService.openPopup(config).then(() => {})
        },
        // 설정 초기화
        resetSetting() {
            const config_confirm = {
                content: ['초기화하시겠습니까?'],
            }
            modalService.confirm(config_confirm).then(text => {
                if(text === '예') {
                    const config_save = {
                        url : '/sz/pc/02s01',
                        data : {
                            'cptDsc'            : '1',                              // 자금구분코드
                            'mydtCusno'         : this.getUserInfo('mydtCusno'),    // 마이데이터고객번호
                            'cusInteKwrdList'   : [],                               // 고객관심키워드목록
                        }
                    }
                    apiService.call(config_save).then(response => {
                        if(response.rspC === '0000') {
                            this.setModYn = true
                            this.srchTxt = ""
                            this.initComponent()
                        }
                    })
                }
            })
        },
        // 맞춤설정 변경 여부 확인 후 팝업close
        closePop() {
            if(this.setModYn) {
                this.close('0000')
            } else {
                this.close(true)
            }
        },
        // 글자수 세기
        fn_checkWord(event, maxByte) {
            let rtnObj = checkWord(event.target.value, maxByte)

            if(rtnObj.flag) {this.$refs.srchTxt.blur()}   // 알럿 중복 방지

            event.target.value = rtnObj.value
            this.srchTxt = event.target.value
        },
        // 입력필드에서 맨 앞 띄어쓰기 제거
        fn_ValidChk() {
            if(this.srchTxt.length === 1 && this.srchTxt.search(/\s/) === 0) {
                this.srchTxt = ""
            }
        },
    },
    components : {

    }
}

</script>