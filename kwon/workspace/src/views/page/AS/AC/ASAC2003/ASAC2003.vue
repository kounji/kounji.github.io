<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 자산 > 예금 > 입출금상세 > 자동이체등록현황
* @ 페이지설명 : 나의자산 > 자산 > 예금 > 입출금상세 > 자동이체등록현황 슬라이드 팝업
* @ 파일명     : src/views/page/AS/AC/ASAC2003/ASAC2003.vue
* @ 작성자     : CS533039
* @ 작성일     : 2023-08-02
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-08-02             CS533039             마이데이터 확대개발 API2.0
*************************************************************************/
-->
<template>
    <div>
	<!-- 슬라이드 팝업 시작 -->
	<div class="dimmed" style="display:block;" v-on:click.prevent="close()"></div>  
    <div class="popup_box mydata2023">
		<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
			<div class="popup_header">
				<h1>자동이체 등록 현황</h1>
			</div>
			<div class="popup_content com_btn_bottom">
				<div class="gray_box_2023">
					총 <span class="pointColor green">{{objAccInfo.auttrCn}}개</span>의 자동이체가 등록 되어 있어요
				</div>

				<ul class="list_type_2023 list_type_line">
					<li v-for="(item, idx) in auttrList" :key="idx">
						<dl>
							<dt>은행명</dt>
							<dd class="bank_icon"><i :class="item.auttrOrgC"></i>{{item.auttrOrgCNm}}</dd>
						</dl>
						<dl>
							<dt>자동이체계좌번호</dt>
							<dd class="num">{{item.auttrRgAcno}}</dd>
						</dl>	
						<dl>
							<dt>자동이체금액</dt>
							<dd class="num">{{item.mydtAuttrAm | numberFilter}}원</dd>
						</dl>	
						<dl>
							<dt>자동이체일</dt>
							<dd class="num">{{item.auttrDt}}일</dd>
						</dl>	
						<dl>
							<dt>자동이체주기</dt>
							<dd>{{item.auttrFqcNm}}</dd>
						</dl>	
						<dl>
							<dt>적요</dt>
							<dd>{{item.trMemoCntn}}</dd> 
						</dl>	
					</li>
				</ul>
                <a href="javascript:void(0);" role="button" @click="fn_showMoreList()"  class="com_btn_more" v-show="lsPageYn==='1'"><span>더보기</span></a>
			</div>
			<div class="popup_footer">
				<div class="btn_group">
					<a href="javascript:void(0);" class="btn btn_mint" @click.prevent="close()">확인</a> 
				</div>
			</div>
			<a class="btn_close" @click.prevent="close()"><span class="">취소</span></a>
		</div>
    </div>
	<!-- 슬라이드 팝업 종료 -->
    </div>    
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import apiService from '@/service/apiService'
    
	export default {
        name : "ASAC2003",
        data: () => {
            return {
                objAccInfo  : {}, //전달 파라미터
                respInfo    : {}, //응답헤더정보
                auttrList      : [], //최종결과 리스트

                pageNum     : 0,  // 페이지번호
                lsPageYn    : "", // 다음페이지존재여부 '1':존재 , '0':미존재 
                auttrCn     : 0,  // 자동이체건수

                tranList   : [], // 임시 리스트
            }
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        created() {
            //초기데이타 세팅
            this.objAccInfo = this.params.objAccInfo    //전달받은 파라미터

            this.pageNum  = 1   // 페이지번호
            this.auttrCn  = this.objAccInfo.auttrCn // 자동이체건수
           
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
                
            },
            getData() {
                
                ////////
                // 자동이체등록현황조회
                //
                const config = {
                    url: '/as/ac/05r03',
                    data: {
                         "mydtCusno"     : this.objAccInfo.mydtCusno
                        , "infOfrmnOrgC" : this.objAccInfo.infOfrmnOrgC
                        , "mydtAcno"     : this.objAccInfo.mydtAcno
                        , "mydtScNo"     : this.objAccInfo.mydtScNo 
                        , "auttrCn"      : this.auttrCn    //자동이체건수
                        , "pageNum"      : this.pageNum    //페이지번호
                    }
                }
                apiService.call(config).then(response => {
                    this.respInfo   = response;

                    this.lsPageYn   = this.respInfo.lsPageYn || ""
                    this.auttrCn    = this.respInfo.auttrCn;         //자동이체건수
                    //this.auttrList  = this.respInfo.auttrList || []  //자동이체내역목록
                    this.auttrList = this.fn_generateList(this.respInfo.auttrList || [])
                })
              
            },

            /*
            * 더보기
            */
            fn_showMoreList() {
                this.pageNum = this.pageNum + 1
                this.getData()
            },

            /*
            * 결과리스트 가공.
            */
            fn_generateList(objList) {
                for(let i=0; i < objList.length; i++) {
                    this.tranList.push(objList[i])
                }

                return this.tranList
            },

        },
    }
 
</script>