<!--
/*************************************************************************
* @ 서비스경로 : 자산현황 > 연금 > IRP
* @ 페이지설명 : 자산현황 > 연금 > IRP
* @ 파일명     : src/views/page/AS/AC/ASPS2004/ASPS2004.vue
* @ 작성자     : CS515729
* @ 작성일     : 2021-06-17
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-15              CS533033                 최초작성
*************************************************************************/
-->
<template>
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>퇴직연금</h1>			
		</div>
        <div class="popup_content com_space_bottom com_bg_type00">

			<div class="asset_info_box">
				<div class="com_inner">
					<div class="asset_info_wrap">
						<div class="asset_info">
							<dl>
                                <dt>{{respInfo.acWrsnm}}</dt>
                                <dd>
                                    <span class="num">{{respInfo.mydtAcno}}</span>
                                 </dd>
							</dl>
							<div class="bank_icon">
								<i :class="respInfo.infOfrmnOrgC"><span class="blind">{{respInfo.infOfrmnOrgnm}}</span></i>
							</div>
                        </div>

                        <div class="asset_price_wrap">
                            <div class="amount">평가금액</div>
                            <div class="asset_price">
                                <span class="num counter">{{respInfo.acEvlam | numberFilter}}</span>원
                            </div>
                            <div class="asset_price_list">
                                <span>계좌잔액</span>
                                <span class="price"><em class="num">{{respInfo.acRvgAm | numberFilter}}</em></span>원
                            </div>
                        </div>
                    </div>
						
					<div class="asset_detail">
						<ul class="list_type_2023">								
							<li>
								<dl>
                                     <dt class="title">사용자부담금</dt>
                                     <dd class="num">{{respInfo.usrBdnAm | numberFilter}}원</dd>
                                 </dl>
                                 <dl>
                                     <dt class="title">가입자부담금</dt>
                                     <dd class="num">{{respInfo.entmnBdnAm | numberFilter}}원</dd>
                                 </dl>
                                 <dl>
                                     <dt class="title">개설일</dt>
                                     <dd class="num">{{respInfo.mydtOpDt | dateFilter('YYYY.MM.DD')}}</dd>
                                 </dl>
                                 <dl v-if="respInfo.firRvDt">
                                     <dt class="title">최초입금일</dt>
                                     <dd class="num">{{respInfo.firRvDt | dateFilter('YYYY.MM.DD')}}</dd>
                                 </dl>
                                 <dl v-if="respInfo.pnsStrtStDt">
                                     <dt class="title">연금개시시작일</dt>
                                     <dd class="num">{{respInfo.pnsStrtStDt | dateFilter('YYYY.MM.DD')}}</dd>
                                 </dl>
                                 <dl>
                                     <dt class="title">운용상품 현황</dt>
                                     <dd><a href="javascript:void(0)" @click="fn_openSlidePopup(respInfo)" class="link_arrow">{{respInfo.irpDtlCnt | numberFilter}}개</a></dd>
                                 </dl>
                                 <dl>
                                     <dt class="title">운용상품금액 합계</dt>
                                     <dd class="num">{{respInfo.acEvlamSum | numberFilter}}원</dd>
                                 </dl>	
							</li>
                        </ul>
                    </div>
                </div>

                <button type="button" class="btn_view_detail">더보기</button><!-- 230720 상세보기에서 더보기로 수정 -->
            </div>

            <template v-if="accTrList.length > 0">
				<div class="com_inner pt0">
                    <div class="asset_more_list">
                        <ul>
                            <li v-for="(item, idx) in accTrList" :key="idx">
                                <dl class="breakdown">
                                    <dt>{{item.irpAcTrDscNm }}</dt>
                                    <dd class="num">{{item.irpAcTram | numberFilter}}원</dd>
                                </dl>
                                <div class="date">{{item.trDt | dateFilter('YYYY.MM.DD HH:mm:ss')}}</div>
                            </li>
                        </ul>
                    </div>
                </div>    

                <div class="com_inner" >
                    <a href="javascript:void(0);" role="button" class="com_btn_more" @click="fn_showMoreList()" v-show="lsPageYn==='1'">더보기</a>
                </div>
            </template>
            <!-- 조회내역이 없을경우 S -->
            <template v-else>	
				<div class="no_data_box no_data_box01 grayExclamationType">
                    <div class="no_data_list">
                        <p>조회된 정보가 없습니다.</p>
                    </div>
                </div>
            </template>
            <!--// 조회내역이 없을경우 E -->
        </div>
        <a class="btn_close" @click="close()"><span class="blind">팝업닫기</span></a>
	</div>
    
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'

    import ASPS2005 from '@/views/page/AS/PS/ASPS2005/ASPS2005'

    export default {
        name : "ASPS2004",
        data: () => {
            return {
                objAccInfo  : {}, //전달 파라미터
                respInfo    : {}, //응답헤더정보
                respDtlInfo : {}, //응답상세목록정보
                irpDtlList  : [],     // 개별운용상품리스트
                pageNum     : 0,      // 페이지번호
                lsPageYn    : "",     // 다음페이지존재여부 '1':존재 , '0':미존재 
                isToolTip   : false,    //tooltip

                accTrList   : [],     // 최종 결과 리스트
            }	
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        created() {
            //초기데이타 세팅
            console.log(this.params)
            this.objAccInfo = this.params.objAccInfo    //전달받은 파라미터

            this.pageNum  = 1   // 페이지번호
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
                this.getData()
                console.log('mydtCusno', this.objAccInfo.mydtCusno);
                console.log('infOfrmnOrgC', this.objAccInfo.infOfrmnOrgC);
                console.log('mydtAcno', this.objAccInfo.mydtAcno);

            },
            getData() {
                ///////////////////////////////
                // 기본조회
                ///////////////////////////////
				const config = {
                    url: '/as/ps/04r01',
                    data: {
                        "mydtCusno"      : this.objAccInfo.mydtCusno
                        , "infOfrmnOrgC" : this.objAccInfo.infOfrmnOrgC
                        , "mydtAcno"     : this.objAccInfo.mydtAcno
                    }
                }
				apiService.call(config).then(
                    (response) => {
                        this.respInfo = response;
                        this.irpDtlList = this.respInfo.irpDtlList || []
                        this.fn_getDetailList('INIT');

                        setTimeout(() => {
                            this.initEvent()
                        }, 10)
                    }
                )
            },

            /*
            * 계좌 상세내역조회
            */
            fn_getDetailList(mod) {
                // 날짜 변경시 검색결과 초기화
                if(mod === 'INIT') {
                    this.pageNum  = 1
                }

                var param = this.objAccInfo;
                param.pageNum = this.pageNum    //페이지번호
				const config = {
					url: '/as/ps/04r02',
                    data: {

                        "mydtCusno"      : this.objAccInfo.mydtCusno
                        , "infOfrmnOrgC" : this.objAccInfo.infOfrmnOrgC
                        , "mydtAcno"     : this.objAccInfo.mydtAcno
                        , "pageNum"      : this.pageNum    //페이지번호
                    }

                }
				apiService.call(config).then(response => {
                    this.respDtlInfo = response
                    this.lsPageYn    = this.respDtlInfo.lsPageYn || ""

                    // 조회된 결과 대상으로 이력이 존재하는 월별 배열 생성
                    this.accTrList = this.fn_generateList(this.respDtlInfo.irpAccTrList || [])
                })
            },
            /*
            * 결과리스트 가공.
            */
            fn_generateList(objList) {
                for(let i=0; i < objList.length; i++) {
                    this.accTrList.push(objList[i])
                }

				return this.accTrList
            },

            /*
            * 더보기
            */
            fn_showMoreList() {
                this.pageNum = this.pageNum + 1
                this.fn_getDetailList()
            },

            /*
            * IRP 개별운용상품 팝업
            */
            fn_openSlidePopup(item) {
                console.log('irpDtlInfo', item)
                const config = {
                    params : {
                        "irpDtlList" : this.irpDtlList,
                        "acEvlamSum" : this.respInfo.acEvlamSum
                    },
                    renderer : {
                        component : ASPS2005
                    }
                }
                modalService.openSlidePagePopup(config).then(() => {
                })
            },

            initEvent() {
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
            },

            closePop() {
                console.log('closePop #### ')
                this.close()
            }
        },
    }
</script>