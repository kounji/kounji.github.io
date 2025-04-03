<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 정책자금
* @ 페이지설명 : 마이농가 > 정책자금 > 정책자금 목록 > 정책자금 상세
* @ 파일명     : src/views/page/SZ/PC/SZPC2109/SZPC2109.vue
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
			<h1>정책자금 상세</h1>
		</div>
			
		<div class="popup_content com_bg_type00 com_no_bottom">
            <div class=" com_line_type01 com_bg_type00 com_top_type01">
                <div class="com_inner com_bg_type00">
                    <div class="card_list_type reuse_card_list_type pb0">
                        <div class="com_box_type01 clear">
                            <div class="card_list_box">
                                    <div class="tit">{{bbrdTinm}}                 
                                    </div>
                                    <span class="level" v-for="(item,idx) in kwrdList" :key="'inte_'+idx">{{item.inteKwrdCntn}}</span>
                            </div>
                        </div>
                        <div class="com_box_type01 padder new_mb10">
                            <div class="card_list_box">
                                    <dl class="add_info m0">
                                        <dt>접수기간</dt>
                                        <dd>{{aplprdCntn}}</dd>
                                    </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 

            <div class="com_inner com_bg_type00">
                <div class="list_basic_type_03">
                    <ul class="bl_dot_list">
                        <li>
                            <em>사업개요</em>
                            <span v-html="bzBrfCntn"></span>
                        </li>
                        <li>
                            <em>지원대상</em>
                            <span>{{objnm}}</span>
                        </li>
                        <li>
                            <em>기업형태</em>
                            <span>{{coprFormnm}}</span>
                        </li>
                        <li>
                            <em>지원지역</em>
                            <span>{{xrgRgnnm}}</span>
                        </li>
                        <li>
                            <em>사업수행기관</em>
                            <span>{{pycpEfctOrgnm}}</span>
                        </li>
                        <li>
                            <em>접수기관</em>
                            <dl>
                                <dt>접수기관</dt>
                                <dd>{{pycpRcOrgnm}}</dd>
                            </dl>
                            <dl>
                                <dt>담당부서</dt>
                                <dd>{{chrgDeptnm}}</dd>
                            </dl>
                            <dl>
                                <dt>전화번호</dt>
                                <dd>{{ctcplExpl}}</dd>
                            </dl>
                            <dl>
                                <dt>이{{'\xa0\xa0'}}메{{'\xa0\xa0'}}일</dt>
                                <dd>{{chrrEmailAdr}}</dd>
                            </dl>
                        </li>
                        <li>
                            <em>출처</em>
                            <a href="javascript:void(0);" @click.prevent="fn_openBrowser(urlPathnm)">{{pycpOrnDscnm}}</a>
                        </li>
                    </ul>
                </div>
            </div>
		</div>

        <a href="javascript:void(0);" @click.prevent="close(true)" class="btn_close"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>

import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

import apiService from '@/service/apiService'
import appService from '@/service/appService'
import _ from 'lodash'

export default {
    name : "SZPC2109",
    data: () => {
        return {
            bbrdTinm        : "",  // 게시물제목명(정책자금명)
            kwrdList      : [],  // 관심키워드목록
            aplprdCntn      : "",  // 적용기간내용(접수기간)
            bzBrfCntn       : "",  // 사업개요내용(사업개요)
            objnm           : "",  // 대상명(지원대상)
            coprFormnm      : "",  // 기업형태명(기업형태)
            xrgRgnnm        : "",  // 전담지역명(지원지역)
            pycpEfctOrgnm   : "",  // 기관명(사업수행기관)
            pycpRcOrgnm     : "",  // 접수기관명(접수기관)
            chrgDeptnm      : "",  // 담당부서명(담당부서)
            ctcplExpl       : "",  // 연락처설명(전화번호)
            chrrEmailAdr    : "",  // 담당자이메일주소(이메일)
            urlPathnm       : "",  // URL경로명(출처URL)


            pycpOrnDscnm    : "",  // 정책자금출처명
        }
    },
    mounted() {
        this.initComponent(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        initComponent(param) {
			this.getData(param)
        },
        getData(param) {
            const config = {
                url : "/sz/pc/09r01",
                data : {
                    pycpOrnDsc  : param.pycpOrnDsc,  // 정책자금출처구분코드
                    dataRflDt   : param.dataRflDt,   // 자료반영일자
                    sqno        : param.sqno,        // 일련번호
                }
            }
            apiService.call(config).then(response => {
                this.bbrdTinm       = response.bbrdTinm || ""                                                                   // 게시물제목명(정책자금명)
                this.kwrdList       = response.kwrdList || []                                                                   // 관심키워드목록
                this.aplprdCntn     = response.aplprdCntn || ""                                                                 // 적용기간내용(접수기간)
                this.bzBrfCntn      = response.bzBrfCntn!=null ? response.bzBrfCntn.split(/(?:\r\n|\r|\n)/g).join("<br/>") : "" // 사업개요내용(사업개요)
                this.objnm          = response.objnm!=null ? response.objnm.split('@').join(', ') : ""                          // 대상명(지원대상)
                this.coprFormnm     = response.coprFormnm!=null ? response.coprFormnm.split('@').join(', ') : ""                // 기업형태명(기업형태)
                this.xrgRgnnm       = response.xrgRgnnm!=null ? response.xrgRgnnm.split('@').join(', ') : ""                    // 전담지역명(지원지역)
                this.pycpEfctOrgnm  = response.pycpEfctOrgnm || ""                                                              // 기관명(사업수행기관)
                this.pycpRcOrgnm    = response.pycpRcOrgnm || ""                                                                // 접수기관명(접수기관)
                this.chrgDeptnm     = response.chrgDeptnm || ""                                                                 // 담당부서명(담당부서)
                this.ctcplExpl      = response.ctcplExpl || ""                                                                  // 연락처설명(전화번호)
                this.chrrEmailAdr   = response.chrrEmailAdr || ""                                                               // 담당자이메일주소(이메일)
                this.urlPathnm      = response.urlPathnm || ""                                                                  // URL경로명(출처URL)

                // 목록 화면에서 넘어온 구분값에 따라 정책자금출처명 가져옴
                const pycpOrnList = this.getCodeList("PYCP_ORN_DSC")
                this.pycpOrnDscnm = typeof _.find(pycpOrnList, {"comnCVal":param.pycpOrnDsc}) !== 'undefined' ? _.find(pycpOrnList, {"comnCVal":param.pycpOrnDsc}).comnCExpl : ""
                
                if(this.pycpOrnDscnm === "") {
                    if(this.urlPathnm.indexOf("bizinfo") != -1) {
                        this.pycpOrnDscnm = "비즈마당"
                    } else if(this.urlPathnm.indexOf("k-startup") != -1) {
                        this.pycpOrnDscnm = "창업넷"
                    }
                }
            })
        },
        fn_openBrowser(url) {
            // 외부 브라우저 링크 오픈
            // chnl : 385 -> 스마트뱅크 , 386 -> 콕뱅크
            if (this.getUserInfo('chnl') === '385') {
                appService.executeBrowser(url);
            } else {
                appService.cokBankOpenPopupWebBrowser(url);
            }
        }
    },
    components : {

    }
}

</script>