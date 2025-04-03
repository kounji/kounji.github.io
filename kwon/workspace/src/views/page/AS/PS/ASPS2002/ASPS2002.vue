<!--
/*************************************************************************
* @ 서비스경로 : 
* @ 페이지설명 : 
* @ 파일명     : src/views/page/AS/PS/ASPS2002/ASPS2002.vue
* @ 작성자     : 
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10                              최초작성
*************************************************************************/
-->
<template>
<div class="full_popup mydata2023" id="full_popup_01"> 
		<div class="popup_header">    
			<h1>퇴직연금</h1>
		</div>	
		<div class="popup_content com_space_bottom com_bg_type00">
				
			<div class="asset_info_box">
				<div class="com_inner">
					<div class="asset_info_wrap">
						<div class="asset_info">
							<dl>
								<dt>{{respInfo.idvdEpyWrsnm}}</dt>
								<dd>
									<span class="account_num">{{respInfo.wrsAmnno}}</span>
								</dd>
							</dl>
							<div class="bank_icon">
								<i :class = "respInfo.infOfrmnOrgC"><span class="blind">{{respInfo.infOfrmnOrgnm}}</span></i>
							</div>
						</div>

						<div class="asset_price_wrap">
							<div class="amount">평가금액</div>
							<div class="asset_price">
								<span class="num counter" :data-count="respInfo.acEvlam | numberFilter">{{respInfo.acEvlam | numberFilter}}</span>원
							</div>
							<div class="asset_price_list" v-if="respInfo.cusAcBac > 0">
								<span>계좌잔액</span>
								<span class="price"><em class="num">{{respInfo.cusAcBac | numberFilter}}</em>원</span>
							</div>
						</div>
					</div>

					<div class="asset_detail">
						<ul class="list_type_2023">
							<li v-if="dcDtlList.length > 0">
								<dl>
									<dt>개설일</dt>
									<dd class="num">{{respInfo.acOpDt | dateFilter('YYYY.MM.DD')}}</dd>
								</dl>
								<dl>
									<dt>운용상품 현황</dt> 
									<dd><a href="javascript:void(0)" v-on:click.prevent="fn_openSlidePopup(respInfo)" class="link_arrow">{{respInfo.wrsQt | numberFilter}}개</a></dd>
								</dl>	
								<dl>
									<dt>운용상품금액 합계</dt>
									<dd class="num">{{respInfo.acEvlamSum | numberFilter}}원</dd>
								</dl>	
							</li>
						</ul>
					</div>
				</div>

				<button type="button" class="btn_view_detail">더보기</button><!-- 230720 상세보기에서 더보기로 수정 -->
			</div>

			<template v-if="dcRtrpnsTrList.length > 0">
				<div class="com_inner pt0">
					<div class="asset_more_list">
						<ul>
							<li v-for="(item, idx) in dcRtrpnsTrList" :key="idx">
								<dl class="breakdown">
									<dt>{{item.dcRtrpnsTrDsnm}}</dt>
									<dd class="num">{{item.dcRtrpnsTram | numberFilter}}원</dd>
								</dl>
								<div class="date">{{item.mydtRtDtm | dateFilter('YYYY.MM.DD HH:mm:ss')}}</div>
							</li>
						</ul>
					</div>
				</div>

				<div class="com_inner">
					<a href="javascript:void(0);" role="button" class="com_btn_more" @click="fn_showMoreList()" v-show="lsPageYn==='1'">더보기</a>
				</div>
			</template>
            <template v-else>	
				<div class="no_data_box no_data_box01 grayExclamationType">
					<div class="no_data_list">
						<p>조회된 정보가 없습니다.</p> 
					</div>
				</div>
			</template>
			
			</div>

		<a class="btn_close" @click="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>
<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
	
	import ASPS2003 from '@/views/page/AS/PS/ASPS2003/ASPS2003'

export default {
		name : "ASPS2002",
        data: () => {
			return { 
				objAccInfo    : {} , // 전달 파라미터
				respInfo      : {} , // 응답헤더정보
				respDtlInfo   : {} , // 응답상세목록정보
				idvdEpyWrsnm  : "" , // 개인연금상품명
				wrsAmnno      : "" , // 상품관리번호
				infOfrmnOrgC  : "" , // 정보제공자기관코드
				infOfrmnOrgnm : "" , // 정보제공자기관명
				acEvlam       : 0  , // 계좌평가금액
				cusAcBac      : 0  , // 고객계좌잔액
				acOpDt        : "" , // 계좌개설일자
				wrsQt         : 0  , // 상품수량
				dcDtlList     : [] , // DC상세목록
				acEvlamSum    : 0  , // 평가금액합계

				pageNum       : 0  , // 페이지번호
				lsPageYn      : "" , // 다음페이지존재여부 '1':존재 , '0':미존재 
				isToolTip   : false, // tooltip

				dcRtrpnsTrList : [],  // DC퇴직연금 거래내역 목록	
				

			}
		},
		mixins: [
            popupMixin,
            commonMixin
		],
		created() {
			console.log('created')
			
			//초기데이타 세팅
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
			console.log('mydtCusno',this.objAccInfo.mydtCusno)
			console.log('infOfrmnOrgC',this.objAccInfo.infOfrmnOrgC)
			console.log('wrsAmnno',this.objAccInfo.wrsAmnno)
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
			
			getData() {
                ///////////////////////////////
                // 기본조회
                ///////////////////////////////
				const config = {
                    url: '/as/ps/02r01',
                    data: {
                        "mydtCusno"      : this.objAccInfo.mydtCusno
                        , "infOfrmnOrgC" : this.objAccInfo.infOfrmnOrgC
                        , "wrsAmnno"     : this.objAccInfo.wrsAmnno
                    }
                }
				apiService.call(config).then(response => {
                    this.respInfo = response;
                    this.dcDtlList = this.respInfo.dcDtlList || []
					this.fn_getDetailList('INIT');
					setTimeout(() => {
						this.initEvent()
					}, 10)
				})
			},
			/*
            * 계좌 상세내역조회
            */
            fn_getDetailList(mod) {
                if(mod === 'INIT') {
                    this.pageNum  = 1
                }

                var param = this.objAccInfo;
				param.pageNum = this.pageNum    //페이지번호

				const config = {
					url: '/as/ps/02r02',
                    data: {
                        "mydtCusno"      : this.objAccInfo.mydtCusno
                        , "infOfrmnOrgC" : this.objAccInfo.infOfrmnOrgC
                        , "wrsAmnno"     : this.objAccInfo.wrsAmnno
                        , "pageNum"      : this.pageNum    //페이지번호
                    }
                }
				apiService.call(config).then(response => {
                    this.respDtlInfo = response
                    this.lsPageYn    = this.respDtlInfo.lsPageYn || ""

                    this.dcRtrpnsTrList = this.fn_generateList(this.respDtlInfo.dcRtrpnsTrList || [])
                })
			},
			
			/*
            * 결과리스트 가공.
            */
            fn_generateList(objList) {
                for(let i=0; i < objList.length; i++) {
                    this.dcRtrpnsTrList.push(objList[i])
                }

				return this.dcRtrpnsTrList
            },

			/*
            * 더보기
            */
            fn_showMoreList() {
                this.pageNum = this.pageNum + 1
                this.fn_getDetailList()
			},

			/*
            * DC 퇴직연금 운용상품 팝업
            */
            fn_openSlidePopup(item) {
				console.log('dcDtlList',item);
				console.log('acEvlamSum',this.acEvlamSum);
				const config = {
                    params : {
						"dcDtlList" : this.dcDtlList,
						"acEvlamSum" : this.respInfo.acEvlamSum
                    },
                    renderer : {
                        component : ASPS2003
                    }
                }
                modalService.openSlidePagePopup(config).then(() => {
                })
            },

            /**
            * Tooltip 표시
            */
            fn_openToolTip() {
                this.isToolTip = !this.isToolTip
            }
		}
			
}
</script>