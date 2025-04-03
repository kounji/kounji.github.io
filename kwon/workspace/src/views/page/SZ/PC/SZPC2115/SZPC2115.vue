<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 정책자금 > 복지지원금
* @ 페이지설명 : 마이농가 > 정책자금 > 복지지원금 상세
* @ 파일명     : src/views/page/SZ/PC/SZPC2115/SZPC2115.vue
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
			<h1>복지지원금 상세</h1>
		</div>
		<div class="popup_content com_bg_type00 com_no_bottom">
            <div class=" com_line_type01 com_bg_type00 com_top_type01">
                <div class="com_inner com_bg_type00">
                    <div class="card_list_type reuse_card_list_type pb0">
                        <div class="com_box_type01 clear">
                            <div class="card_list_box"> 
                                <div class="tit">{{plyCptnm}}</div>
                                <span class="level" v-for="(kwrd, idx) in kwrdList" :key="idx">{{kwrd.inteKwrdCntn}}</span>
                            </div>
                        </div>
                        <div class="com_box_type01 padder new_mb10">
                            <div class="card_list_box">
                                <dl class="add_info m0">
                                    <dt>접수기간</dt>
                                    <dd>{{rgDt}}</dd>
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
                            <span>{{wfeSvcCntn}}</span>
                        </li>
                        <li>
                            <em>소관부처</em>
                            <span>{{wfeJrdtDeptnm}}</span>
                        </li>
                        <li>
                            <em>소관조직명</em>
                            <span>{{jrdtOrgznm}}</span>
                        </li>
                        <li>
                            <em>출처</em>
                            <a href="javascript:void(0);" @click.prevent="fn_openBrowser(dtlUrlnm)">복지로</a>
                        </li>
                    </ul>
                </div>
            </div>
		</div>
		<a href="javascript:void(0);" @click.prevent="close()" class="btn_close"><span class="blind">팝업닫기</span></a>
	</div>
</template>

<script>
    import popupMixin from '@/common/mixins/popupMixin'
    import commonMixin from '@/common/mixins/commonMixin'
    import modalService from '@/service/modalService'
    import apiService from '@/service/apiService'
    import appService from '@/service/appService'

    export default {
        name : "SZPC2115",
        data: () => {
            return {
                svcid         : "", // 서비스ID
                kwrdList      : [], // 키워드목록
                plyCptnm      : "", // 정책자금명
                wfeJrdtDeptnm : "", // 복지소관부서명
                jrdtOrgznm    : "", // 소관조직명
                wfeSvcCntn    : "", // 복지서비스내용
                dtlUrlnm      : "", // 상세URL명
                rgDt          : "", // 등록일자
                inqNt         : 0   // 조회횟수
            }
        },
        mounted() {
            this.initComponent(this.params);

            // PFM로그 처리 화면접속이력 등록 POST
            apiService.pfmLogSend(this.$options.name);
        },
        mixins: [
            popupMixin,
            commonMixin
        ],
        methods: {
            initComponent(param) {
                this.svcid = param.svcid;

                this.getData();
            },
            getData() {
                const config = {
                    url: '/sz/pc/15r01',
                    data: {
                        svcid : this.svcid // 서비스ID
                    }
                };

                apiService.call(config).then(response => {
                    if (response.rspRztDsc == '0') {
                        this.kwrdList      = response.kwrdList;
                        this.plyCptnm      = response.plyCptnm;
                        this.wfeJrdtDeptnm = response.wfeJrdtDeptnm;
                        this.jrdtOrgznm    = response.jrdtOrgznm;
                        this.wfeSvcCntn    = response.wfeSvcCntn;
                        this.dtlUrlnm      = response.dtlUrlnm;
                        this.rgDt          = response.rgDt;
                        this.inqNt         = response.inqNt;
                    } else {
                        let msg = response.rspMsg[0].rspMsgCntn;
                        modalService.alert(msg).then(() => {
                        });
                    }
                });
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
        }
    }
</script>