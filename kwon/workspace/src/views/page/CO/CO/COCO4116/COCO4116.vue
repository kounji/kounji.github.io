<!--
/*************************************************************************
* @ 서비스경로 : 공통
* @ 페이지설명 : FAQ
* @ 파일명     : src/views/page/CO/CO/COCO4116/COCO4116.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-03-24
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-03-24             CS541013                 최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01">
		<div class="popup_header">    
			<h1>자주하는 질문</h1>			
		</div>
	
        <div class="popup_content com_bg_type00">
            <div class="new_select_wrap com_line_type01">
                <button type="button" class="com_btn_select" title="질문 카테고리 선택" v-on:click="openFaqGbnSlidePop" ref="faqGbnTitle">{{faqTitle}}</button>
            </div>
            <ul class="new_sec_list_area qna">
                <li v-for="(faq, idx) in faqList" :key="idx">
                    <div class="sec_list_box">
                        <div data-ui-toggle="box" class="box" :class="faqSqno === 0 ? (idx===0 ? 'active open': '') : (faq.faqSqno === faqSqno) ? 'active open': '' ">
                            <button type="button" class="view_btn" :aria-expanded="idx===0 ? 'true': 'false' ">
                                <div class="tit_wrap">
                                    <span class="tit"><em class="qna_badge quest">Q</em>{{faq.qstCntn}}</span>
                                    <span class="cmm-price"></span>
                                </div>
                                <em class="open">열기</em><em class="close">닫기</em>
                            </button>
                        </div>
                        <ul class="view_box view_basic_list">
                            <li>
                                <div class="answer_wrap">
                                    <div class="tit_wrap">
                                        <!-- <span class="tit" ><em class="qna_badge answer">A</em>일상생활에서 건전한 금융생활을 통해 신용등급을 올려보세요.</span> -->
                                        <span class="tit"><em class="qna_badge answer">A</em><span v-html="faq.answCntn"></span></span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>

        <a href="javascript:void(0);" @click="close()" class="btn_close"><span class="blind">팝업닫기</span></a>		
    </div>
</template>
<script>
    import commonMixin from '@/common/mixins/commonMixin'
    import popupMixin from '@/common/mixins/popupMixin'
    import apiService from '@/service/apiService'
    import modalService from '@/service/modalService'
    import _ from 'lodash'

    export default {
        name : "COCO4116",
        data: () => {
            return {
                faqList : [],   //faq 리스트
                faqGbnList : [], //FAQ 구분코드리스트
                faqDsc : "",
                faqTitle : "",          // FAQ 구분명
                
                isCredInfo  : false,    // 신용정보 메인 화면에서 넘어왔는지 여부 확인
                faqSqno     : 0,       // FAQ일련번호
            }
        },
        mounted() {
            this.initComponent(this.params)
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        methods: {
            initComponent(param) {
                this.faqTitle = "전체"

                if(param != null && param.faqDsc == '08') {     // 신용정보 화면에서 들어온 경우
                    this.isCredInfo = true;
                    this.faqTitle = "신용정보";
                    this.faqSqno = param.faqSqno === 1 ? 157 : param.faqSqno === 2 ? 155 : 154;
                }

                this.getData(param);
            },
            getData(sqno) {
                this.faqDsc = ""    // "" 이면 전체조회
                if(sqno != null) this.faqDsc = "08"

                const config = {
                    url: '/co/co/16r01',
                    data: {"faqDsc" : this.faqDsc}
                }
                apiService.call(config).then(response => {
                    this.respInfo = response;
                    this.faqList = this.respInfo.faqList || []

                    this.$nextTick(() => {
                        this.callJQueryFncExcute()
                    })
                })
            },
            openFaqGbnSlidePop() {
                const config = {
                    params : {
                        title : "자주하는 질문 선택",  //slidepopup 타이틀
                        list : [],          //slidepopup 에 표시할 data. [{comnCnm : "내용", comnCId : "키값"}]
                        selectVal : this.faqDsc    //slidepopup 내 선택된값 표시위함.
                    }
                }

                this.faqGbnList = this.getCodeList("FAQ_DSC") || []
                // NH콕마이데이터4.0) 공통코드 정렬순서 기준 카테고리 정렬
                // this.faqGbnList = _.chain(this.faqGbnList).orderBy(['comnCVal'],['asc']).value()
                this.faqGbnList = _.chain(this.faqGbnList).orderBy(['sortSq'],['asc']).value()
                config.params.list.push({comnCnm : "전체", comnCId : ""})

                for (let i=0; i<this.faqGbnList.length; i++) {
                    let info = {}
                    info.comnCnm = this.faqGbnList[i].comnCExpl
                    info.comnCId = this.faqGbnList[i].comnCVal
                    config.params.list.push(info)
                }

                modalService.openSelectSingle(config).then(response=> {

                    this.isCredInfo = false
                    this.faqTitle = ""
                    this.faqSqno = 0

                    if (typeof response.comnCnm !== "undefined") {
                        let title = this.$refs["faqGbnTitle"]
                        title.innerText = response.comnCnm

                        this.faqDsc = String(response.comnCId)

                        this.faqList = []   //초기화

                        const config = {
                            url : '/co/co/16r01',
                            data : {"faqDsc" : this.faqDsc}
                        }
                        apiService.call(config).then(response => {
                            
                            this.faqList = response.faqList || []
                            
                            this.$nextTick(() => {
                                this.callJQueryFncExcute()
                            })
                        })
                    }
                })
            }
        }
    }
</script>