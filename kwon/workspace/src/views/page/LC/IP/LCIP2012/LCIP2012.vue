<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출분석
* @ 페이지설명 : 지출 > 지출분석 > 또래 지출 비교
* @ 파일명     : src\views\page\LC\IP\LCIP2012\LCIP2012.vue
* @ 작성자     : CS533045
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10              CS533045              최초작성
*************************************************************************/
-->
<template>
    <!-- 전체 팝업 시작 -->
    <div class="full_popup renewal mydata2023" id="full_popup_01"><!-- 0803 .mydata2023 클래스 이동-->
        <div class="popup_header">
            <h1>또래 지출 비교</h1>
        </div>
        <div class="popup_content com_no_bottom"><!-- 하단 버튼 없을때 com_no_bottom -->
            <div class="com_inner">
                <div class="custom_box_chart peer_compare">
                    <div class="text">
                        <div class="titH1">{{cmprXpsTxt}}</div>
                        <p>#{{xpsPeer.agStnNm}} #{{xpsPeer.jobgrNm}}</p>
                    </div>

                    <div class="compare_chart_wrap"><!-- 1004 접근성 반영 -->
                        <div class="chart">
                            <div class="bar_wrap">
                                <div class="bars">
                                    <div class="bar bar01" :style="{height: xpsPeer.peerXpsRto + '%'}">
                                        <div class="chart_tooltip_wrap">
                                            <span class="chart_tooltip"><em class="num">{{xpsPeer.peerXpsAm | numberFilter}}</em>원</span>
                                        </div>
                                        <span class="bar_title">또래</span>
                                    </div>
                                    <div class="bar bar02" :style="{height: xpsPeer.xpsRto + '%'}">
                                        <div class="chart_tooltip_wrap">
                                            <span class="chart_tooltip"><em class="num">{{xpsPeer.xpsAm | numberFilter}}</em>원</span>
                                        </div>
                                        <span class="bar_title">나</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>	

            <hr class="hr02">

            <div class="com_inner">
                <div class="custom_box_chart peer">
                    <div class="text">
                        <div class="titH1" v-html="cmprMethdXpsTxt"></div>
                    </div>

                    <div class="compare_chart_wrap"><!-- 1004 접근성 반영 -->
                        <div class="chart">
                            <div class="bg"></div>
                            <div class="bar_wrap">
                                <div class="bars bar_card" v-for="(item, idx) in peerStlList" :key="'prd_' + idx">
                                    <div class="bar bar01" :style="{height: item.peerXpsRto + '%'}"></div>
                                    <div class="bar bar02" :style="{height: item.xpsRto + '%'}">
                                        <div class="chart_tooltip_wrap" v-if="topXpsWrsTpnm == item.xpsWrsTpnm">
                                            <span class="chart_tooltip"><em class="">{{item.xpsWrsTpnm}}</em><em class="num">{{item.xpsRto}}</em>%</span>
                                        </div>
                                    </div>
                                    <div class="title">{{item.xpsWrsTpnm}}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="legend_item"><!-- 1006 접근성 반영 -->
                        <span class="peer">또래</span>
                        <span class="me">나</span>
                    </div>

                </div> 
            </div>

            <hr class="hr02">

            <div class="com_inner">
                <strong class="titH1">카테고리별 지출</strong>

                <ul class="category_info_list">
                    <li :class="item.indDsc" v-for="(item, idx) in peerCtgrList" :key="'ctgr_' + idx">
                        <template v-if="idx < peerCtgrListDspSize">
                            <p class="title">{{item.xpsCtgrNm}}</p>

                            <div class="progressBar_wrapper">
                                <div class="progressBar">
                                    <div class="bar" :style="{width: item.maxRto + '%'}"></div>
                                </div>
                            </div>

                            <div class="compare_text">
                                <dl>
                                    <dt>또래</dt>
                                    <dd><em class="num">{{item.peerXpsAm | numberFilter}}</em>원</dd>
                                </dl>
                                <dl>
                                    <dt>나</dt>
                                    <dd><em class="num">{{item.xpsAm | numberFilter}}</em>원</dd>
                                </dl>
                            </div>
                        </template>
                    </li>
                </ul>

                <div class="com_btn_area mt30">
                    <a href="javascript:void(0);" role="button" class="com_btn_more" @click.prevent="showMoreList()" :style="noMoreList">더보기</a>
                </div>
            </div>			
        </div>
        <a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
    </div>

    <!--// 전체 팝업 종료 -->	
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import {dateFormat} from '@/utils/date'
import {numberFormat} from '@/utils/number'
import apiService from '@/service/apiService'

export default {
    name : "LCIP2012",
    data: () => {
        return {
            cusNb: '',                      // 마이데이터고객번호
            basYm: null,                    // 조회 기준년월 YYYYMM
            basDt: null,                    // 조회 기준일자 YYYYMMDD

            xpsPeer: {},                    // 또래정보

            topXpsWrsTpnm       : '',       // 가장 많은 결제수단명
            cmprXpsWrsTpnm      : '',       // 또래와 비교 결제수단명
            cmprRto             : 0,        // 또래와 비교 지출비율
            peerStlList         : [],       // 결제수단별 지출 목록
            
            peerCtgrList        : [],       // 카테고리별 지출 목록
            peerCtgrListDspSize : 6         // 카테고리별 지출 목록 출력 개수
        }
    },
    computed : {
        cmprXpsTxt() {
            const compr = this.xpsPeer.xpsAm - this.xpsPeer.peerXpsAm
            if(compr == 0) {
                return "또래와 지출이 같아요"
            }else if(compr > 0) {
                return "또래 보다 " + numberFormat(compr) + "원 더 썼어요"
            }else{
                return "또래 보다 " + numberFormat(compr * -1) + "원 덜 썼어요"
            }
        },
        cmprMethdXpsTxt() {
            if(this.cmprRto == 0) {
                return "또래와 비슷하게 쓰고 있어요"
            }else if(this.cmprRto > 0) {
                return "나는 " + this.topXpsWrsTpnm + " 지출이 가장 많고<br>또래 보다 " + this.cmprXpsWrsTpnm + "에 " + this.cmprRto + "% 더 썼어요"
            }else{
                return "나는 " + this.topXpsWrsTpnm + " 지출이 가장 많고<br>또래 보다 " + this.cmprXpsWrsTpnm + "에 " + (this.cmprRto * -1) + "% 덜 썼어요"
            }
        },
        noMoreList() {
            if(this.peerCtgrList){
                return (this.peerCtgrListDspSize < this.peerCtgrList.length)?"":"display : none"
            }
            return "none"
        }
    },
    created() {
        this.cusNb = this.getUserInfo("mydtCusno")
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent() {
            this.basYm = this.params ? this.params.pBasYm : ''
            this.basDt      = dateFormat(new Date(), "YYYYMMDD")
            this.getData()
        },

        getData() {
            const config = {
                url: '/lc/ip/12r01',
                data: {
                    "mydtCusno" : this.cusNb,
                    "basDt" : this.basDt
                }
            }
            apiService.call(config).then(response =>{
                console.log('response', JSON.parse(JSON.stringify(response)))

                this.xpsPeer = response.xpsPeer

                this.topXpsWrsTpnm = response.topXpsWrsTpnm
                this.cmprXpsWrsTpnm = response.cmprXpsWrsTpnm
                this.cmprRto = response.cmprRto
                this.peerStlList = response.peerStlList                
                this.peerCtgrList = response.peerCtgrList

                // for (let i=0 ; i < this.peerStlList.length; i++){
                   
                //     if (this.peerStlList[i].xpsOrd == 1) {
                //         this.topXpsWrsTpnm = this.peerStlList[i].prdTypNm  
                //         this.cmprXpsWrsTpnm = this.peerStlList[i].prdTypNm  
                //         this.cmprRto = this.peerStlList[i].cmprRto                
                //     }
                // } 

            });
        },
        // 더보기
        showMoreList() {
            this.peerCtgrListDspSize += 6
        }
    },
    mixins: [
        commonMixin,
        popupMixin,
    ],
    components: {      
        //LCIP1010
    }
}
</script>