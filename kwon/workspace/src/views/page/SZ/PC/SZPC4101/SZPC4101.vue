<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > NH지역정보 > 슬기로운영농생활 > 정책자금 > 메인
* @ 페이지설명 : 정책자금 메인
* @ 파일명     : src/views/page/SZ/PC/SZPC4101/SZPC4101.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-06-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-10              CS515897              최초작성
* 2025-03-04              CS540683              상호금융 NH콕마이데이터 4.0 추진 개발 SZPC2101 → SZPC4101 
*************************************************************************/
-->

<template>
<!-- kimhc_20220922 수정-->
    <!-- <page class="content-view"> -->
    <page class="content-view hasLNB">
    <!-- <sz-category-v2 type="PC"></sz-category-v2> -->
    <!--
    <an-category-v2 type="SZFC"></an-category-v2>
    -->
    <an-sub-category-v4 type="PC"></an-sub-category-v4>
    <!-- content S -->
    <div id="content" class="com_sub_type02 slider_layout">
        <div class="com_submainbox_type01 com_submainbox_type01-08 mb0 ui-sz-pc-01 com_line_type01">
            <div class="toptitle">
                <div class="left">
                    정책자금
                    <button class="caution_ico" @click="showInfo"><span class="blind">정책자금 설명</span></button>
                </div>
                <div class="right">
                    <a href="javascript:void(0);" class="com_btnround_type07" @click.prevent="openAgrcPlyFd">
                        <span>농업금융컨설팅</span>
                    </a>
                </div>
            </div>
            <div class="linkbox_wrap">
                <div class="box">
                    <a href="javascript:void(0);" role="button" @click="openSetPop('1')">
                        <span class="ico ico01"></span>
                        <template v-if="estYn1 === 'true'">
                            <div class="tt">
                                정책자금<br/>맞춤 재설정
                            </div>
                        </template>
                        <template v-else>
                            <div class="tt">
                                정책자금<br/>맞춤 설정
                            </div>
                        </template>
                    </a>
                </div>
                <div class="box">
                    <a href="javascript:void(0);" role="button" @click="openSetPop('2')">
                        <span class="ico ico02"></span>
                        <template v-if="estYn2 === 'true'">
                            <div class="tt">
                                복지지원금<br/>맞춤 재설정
                            </div>
                        </template>
                        <template v-else>
                            <div class="tt">
                                복지지원금<br/>맞춤 설정
                            </div>
                        </template>
                    </a>
                </div>
            </div>
            <div class="submain_list_wrap sm_list mt10">
                <div class="list">
                    <div class="title">정책자금</div>
                    <div class="content">
                        <template v-if="estYn1 === 'true'">
                            <span class="num"><b>{{inqCn1}}</b>건 / {{ttcn1}}건</span>
                        </template>
                        <template v-else>
                            <span class="num"><b>{{ttcn1}}</b>건</span>
                        </template>
                    </div>
                </div>
                <div class="list">
                    <div class="title">복지지원금</div>
                    <div class="content">
                        <template v-if="estYn2 === 'true'">
                            <span class="num"><b>{{inqCn2}}</b>건 / {{ttcn2}}건</span>
                        </template>
                        <template v-else>
                            <span class="num"><b>{{ttcn2}}</b>건</span>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class="com_inner card_list_wrap">
            <!-- 지원정책자금 S -->
            <div class="new_tit_area">
                <a href="javascript:void(0);" role="button" @click="openSptPlyFd">
                    <template v-if="estYn1 === 'true'">
                        <div class="tit"><span>맞춤 정책자금</span></div>
                        <div class="total_price">
                            <span>총</span>
                            <em class="num">{{inqCn1}}</em>
                            <span>건</span>
                        </div>
                    </template>
                    <template v-else>
                        <div class="tit"><span>정책자금</span></div>
                        <div class="total_price">
                            <span>총</span>
                            <em class="num">{{ttcn1}}</em>
                            <span>건</span>
                        </div>
                    </template>
                </a>
            </div>
            <div class="card_list_type">
                <div class="com_box_type01" v-for="(item1, idx1) in sptPlyFdList" :key="'sptPlyFd_'+idx1">
                    <div class="card_list_box">
                        <a href="javascript:void(0);" role="button" @click="openDetailPop(item1, '1')">
                            <div class="tit">
                                {{item1.bbrdTinm}}
                            </div>
                            <span class="level" v-for="(subItem, subIdx) in item1.sptKwrdList" :key="'sptDvs_'+subIdx">{{subItem.inteKwrdCntn}}</span>
                            <dl class="add_info">
                                <dt>접수기간</dt>
                                <dd>{{item1.aplprdCntn}}</dd>
                            </dl>
                        </a>
                    </div>
                </div>
            </div>
            <!-- // 지원정책자금 E -->
            <!-- 복지지원금 S -->
            <div class="new_tit_area">
                <a href="javascript:void(0);" role="button" @click="openWfeFd">
                    <template v-if="estYn2 === 'true'">
                        <div class="tit"><span>맞춤 복지지원금</span></div>
                        <div class="total_price">
                            <span>총</span>
                            <em class="num">{{inqCn2}}</em>
                            <span>건</span>
                        </div>
                    </template>
                    <template v-else>
                        <div class="tit"><span>복지지원금</span></div>
                        <div class="total_price">
                            <span>총</span>
                            <em class="num">{{ttcn2}}</em>
                            <span>건</span>
                        </div>
                    </template>
                </a>
            </div>
            <div class="card_list_type">
                <div class="com_box_type01" v-for="(item2, idx2) in wfeFdList" :key="'wfeFd_'+idx2">
                    <div class="card_list_box">
                        <a href="javascript:void(0);" role="button" @click="openDetailPop(item2, '2')">
                            <div class="tit">
                                {{item2.bbrdTinm}}
                            </div>
                            <span class="level" v-for="(subItem, subIdx) in item2.wfeKwrdList" :key="'lifeFq_'+subIdx">{{subItem.inteKwrdCntn}}</span>
                            <dl class="add_info">
                                <dt>접수기간</dt>
                                <dd>{{item2.aplprdCntn}}</dd>
                            </dl>
                        </a>
                    </div>
                </div>
            </div>
            <!-- // 복지지원금 E -->
        </div>
    </div>
    <!--// content E -->

    <footersV2 type="sz" />
</page>
</template>

<script>
import Page from '@/views/layout/Page.vue'
import FootersV2 from "@/views/layout/FootersV2.vue"
import commonMixin from '@/common/mixins/commonMixin'
//import SzCategoryV2 from '@/components/category/SzCategoryV2.vue'
//import AnCategoryV2 from '@/components/category/AnCategoryV2.vue'
import AnSubCategoryV4 from '@/components/category/AnSubCategoryV4.vue'	

import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import SZPC2102 from '@/views/page/SZ/PC/SZPC2102/SZPC2102'
import SZPC2108 from '@/views/page/SZ/PC/SZPC2108/SZPC2108'
import SZPC2109 from '@/views/page/SZ/PC/SZPC2109/SZPC2109'
import SZPC2110 from '@/views/page/SZ/PC/SZPC2110/SZPC2110'
import SZPC2114 from '@/views/page/SZ/PC/SZPC2114/SZPC2114'
import SZPC2115 from '@/views/page/SZ/PC/SZPC2115/SZPC2115'
import SZPC2116 from '@/views/page/SZ/PC/SZPC2116/SZPC2116'
import SZPC2118 from '@/views/page/SZ/PC/SZPC2118/SZPC2118'

export default {
    name : "SZPC4101",
    data : () => {
        return {
            // 지원정책자금
            estYn1          : "",   // 지원정책자금설정여부
            ttcn1           : 0,    // 지원정책자금총건수
            inqCn1          : 0,    // 지원정책자금조회건수
            pagePerRowCn1   : 0,    // 지원정책자금페이지당행개수
            sptPlyFdList    : [],   // 지원정책자금목록

            // 복지지원자금
            estYn2          : "",   // 복지지원금설정여부
            ttcn2           : 0,    // 복지지원금총건수
            inqCn2          : 0,    // 복지지원금조회건수
            pagePerRowCn2   : 0,    // 복지지원금페이지당행개수
            wfeFdList       : [],   // 복지지원금목록
        }
    },
    mixins: [
        commonMixin,
    ],
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
            const config = {
                url : '/sz/pc/01r01',
                data : {
                    mydtCusno : this.getUserInfo('mydtCusno'),
                }
            }
            apiService.call(config).then(response => {
                // 정책자금 response
                this.estYn1         = response.estYn1 || ""
                this.ttcn1          = response.ttcn1 || 0
                this.inqCn1         = response.inqCn1 || 0
                this.pagePerRowCn1  = response.pagePerRowCn1 || 0
                this.sptPlyFdList   = response.sptPlyFdList || []

                // 복지지원금 response
                this.estYn2         = response.estYn2 || ""
                this.ttcn2          = response.ttcn2 || 0
                this.inqCn2         = response.inqCn2 || 0
                this.pagePerRowCn2  = response.pagePerRowCn2 || 0
                this.wfeFdList      = response.wfeFdList || []
            })
        },
        // 농업정책자금 목록 팝업 오픈
        openAgrcPlyFd() {
            const config = {
                component : SZPC2116,
            }
            modalService.openPopup(config)
        },
        // 맞춤설정 팝업 오픈
        openSetPop(dsc) {
            const comp = dsc === '1' ? SZPC2102 : SZPC2110
            const config = {
                component : comp,
            }
            modalService.openPopup(config).then(response => {
                if(response === '0000') this.initComponent()
            })
        },
        // 상세팝업 오픈
        openDetailPop(listData, dsc) {
            let config = {}
            if(dsc === '1') {
                config = {
                    component : SZPC2109,
                    params : {
                        pycpOrnDsc  : listData.pycpOrnDsc,
                        dataRflDt   : listData.dataRflDt,
                        sqno        : listData.sqno,
                    }
                }
            } else {
                config = {
                    component   : SZPC2115,
                    params      : listData
                }
            }
            modalService.openPopup(config).then(response => {
                if(response) this.initComponent()
            })
        },
        // 도움말보기 슬라이드팝업 오픈
        showInfo() {
            const config = {
                renderer : {
                    component : SZPC2118
                },
                params : {
                    infoTitl    : "정책자금", // 도움말 타이틀
                    infoSubTitl : "정책자금", // 도움말 서브 타이틀
                    infoCn      : "특정한 <span class='com_point_darkblue'>정책목적을 가지고 특정부문에 각종 기금이나 정부 예산에서 지원해주는 대출자금</span>입니다.<br>대출기간이 비교적 길고 금리가 시중 금리보다 낮은편입니다. ",
                }
            }
            modalService.openSlidePagePopup(config)
        },
        // 지원정책자금목록 open
        openSptPlyFd() {
            const config = {
                component : SZPC2108,
            }
            modalService.openPopup(config).then(response => {
                if(response === '0000' || response) {
                    this.initComponent()
                }
            })
        },
        // 복지지원자금목록 open
        openWfeFd() {
            const config = {
                component : SZPC2114,
            }
            modalService.openPopup(config).then(response => {
                if(response === '0000') {
                    this.initComponent()
                }
            })
        }
    },
    components : {
        Page,
        FootersV2,
        // SzCategoryV2
        //AnCategoryV2,
        AnSubCategoryV4,
    }
}
</script>