<!--
/*************************************************************************
* @ 서비스경로 : 공통
* @ 페이지설명 : FAQ
* @ 파일명     : src/views/page/CO/CO/COCO1116/COCO1116.vue
* @ 작성자     : CS515731
* @ 작성일     : 2021-05-18
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-18             CS515729                 최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01">
		<div class="popup_header">    
			<h1>FAQ</h1>			
		</div>
	
        <div class="popup_content com_bg_type00">
            <div class="new_select_wrap com_line_type01">
                <button type="button" class="com_btn_select" v-on:click="openFaqGbnSlidePop" ref="faqGbnTitle">전체</button>
            </div>
            <ul class="new_sec_list_area qna">
                <li v-for="(faq, idx) in faqList" :key="idx">
                    <div class="sec_list_box">
                        <div data-ui-toggle="box" class="box" :class="idx===0 ? 'active open': '' ">
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
        name : "COCO1116",
        data: () => {
            return {
                faqList : [],   //faq 리스트
                faqGbnList : [], //FAQ 구분코드리스트
                faqDsc : ""
            }
        },
        mounted() {
            this.initComponent()
            //PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name)
        },
        mixins: [
            commonMixin,
            popupMixin
        ],
        methods: {
            initComponent() {
                this.getData();
            },
            getData() {
                this.faqDsc = ""    // "" 이면 전체조회

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
                        title : "FAQ 선택",  //slidepopup 타이틀
                        list : [],          //slidepopup 에 표시할 data. [{comnCnm : "내용", comnCId : "키값"}]
                        selectVal : this.faqDsc    //slidepopup 내 선택된값 표시위함.
                    }
                }

                this.faqGbnList = this.getCodeList("FAQ_DSC") || []
                this.faqGbnList = _.chain(this.faqGbnList).orderBy(['comnCVal'],['asc']).value()
                config.params.list.push({comnCnm : "전체", comnCId : ""})

                for (let i=0; i<this.faqGbnList.length; i++) {
                    let info = {}
                    info.comnCnm = this.faqGbnList[i].comnCExpl
                    info.comnCId = this.faqGbnList[i].comnCVal
                    config.params.list.push(info)
                }

                modalService.openSelectSingle(config).then(response=> {

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