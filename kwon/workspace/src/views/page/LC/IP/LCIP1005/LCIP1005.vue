<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 지출분석
* @ 페이지설명 : 지출 > 지출분석 > 카테고리별 지출 - 상세 지출 비교
* @ 파일명     : src\views\page\LC\IP\LCIP1005\LCIP1005.vue
* @ 작성자     : CS529599
* @ 작성일     : 2022-10-12
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-10-12              CS529599              최초작성
*************************************************************************/
-->
<template>
    <div>
        <!-- slide popup S -->
        <div class="dimmed" style="display: block;"></div>
        <div class="popup_box renewal">
            <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
                <div class="popup_header">
                    <h1>{{ctgrInfo.xpsCtgrNm}} 지출 비교</h1>
                    <!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
                </div>
                <div class="popup_content">
                    <div class="gray_spend_box">
                        <div>
                            <strong class="present_month"><em>{{basMm}}</em>월 총 <em>{{ctgrInfo.xpsCnt | numberFilter}}</em>회<em class="ml">{{ctgrInfo.xpsAm | numberFilter}}</em>원</strong>
                            <p class="">지난달 지출<em class="ml">{{ctgrInfo.bmmXpsAm | numberFilter}}</em>원</p>
                        </div>
                        <span role="text">
                            <em>{{ctgrInfo.bmmCmprXpsAm | numberFilter}}</em>원
                            <span :class="'price_sub_txt ' + ctgrInfo.vary"><span class="blind">{{ctgrInfo.varyNm}}</span></span>
                            <!-- <span class="price_sub_txt decrease"><span class="blind">하락</span></span> -->
                        </span>
                    </div>
                    <strong class="com_pop_tit01">지난달에 비해 이렇게 썼어요</strong>
                    <ol class="spend_list">
                        <li v-for="(ctgrDtlInfo, idx) in ctgrDtlList" :key="idx">
                            <i class="ranking_label top"><em>{{idx+1}}</em>위</i>
                            <div class="spend_item">
                                <strong class="spend_name">{{ctgrDtlInfo.xpsCtgrDtlNm}}</strong>
                                <span class="spend_price"><em>{{ctgrDtlInfo.xpsAm | numberFilter}}</em>원</span>
                                <span :class="'price_sub_txt ' + ctgrDtlInfo.vary" role="text"><span class="blind">{{ctgrDtlInfo.varyNm}}</span><em>{{ctgrDtlInfo.bmmCmprXpsAm | numberFilter}}</em>원</span>
                            </div>
                        </li>
                        <!--
                        <li>
                            <i class="ranking_label top"><em>1</em>위</i>
                            <div class="spend_item">
                                <strong class="spend_name">현대쇼핑몰</strong>
                                <span class="spend_price"><em>1,250,500</em>원</span>
                                <span class="price_sub_txt raise"><span class="blind">상승</span><em>1,250,500</em>원</span>
                            </div>
                        </li>
                        <li>
                            <i class="ranking_label"><em>2</em>위</i>
                            <div class="spend_item">
                                <strong class="spend_name">김안과 의원</strong>
                                <span class="spend_price"><em>51,250,500</em>원</span>
                                <span class="price_sub_txt decrease"><span class="blind">하락</span><em>21,250,500</em>원</span>
                            </div>
                        </li>
                        <li>
                            <i class="ranking_label"><em>3</em>위</i>
                            <div class="spend_item">
                                <strong class="spend_name">관리비</strong>
                                <span class="spend_price"><em>1,250,000,000</em>원</span>
                                <span class="price_sub_txt"><span class="blind">유지</span><em>1,250</em>원</span>
                            </div>
                        </li>
                        <li>
                            <i class="ranking_label"><em>4</em>위</i>
                            <div class="spend_item">
                                <strong class="spend_name">모임</strong>
                                <span class="spend_price"><em>100,250,500</em>원</span>
                                <span class="price_sub_txt decrease"><span class="blind">하락</span><em>21,250,500</em>원</span>
                            </div>
                        </li>
                        <li>
                            <i class="ranking_label"><em>5</em>위</i>
                            <div class="spend_item">
                                <strong class="spend_name">넷플릭스</strong>
                                <span class="spend_price"><em>1,250,500</em>원</span>
                                <span class="price_sub_txt"><span class="blind">유지</span><em>1,250,500</em>원</span>
                            </div>
                        </li>
                        -->
                    </ol>
                </div>
                
                <a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="">닫기</span></a>
            </div>
        </div>
        <!--// slide popup E -->
    </div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import {dateFormat} from '@/utils/date'

export default {
    name : "LCIP1005",
    data: () => {
        return {
            cusNb: '', // 마이데이터고객번호
            basYm: '', // 기준년월 YYYYMM
            basMm: '', // 기준월   M
            ctgrInfo: {},
            ctgrDtlList: []
        }
    },
    computed : {
    },
    created() {
        this.cusNb = this.getUserInfo("mydtCusno")
        this.basYm = this.params.basYm
        this.basMm = dateFormat(this.basYm, "M")
        this.ctgrInfo = this.params.ctgrInfo
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        initComponent() {
            this.getData();
        },
        getData() {
            const config = {
                url: '/lc/ip/05ra1', // 인터페이스ID: IF-MOB-PFM-LCA05, 서비스코드: PFMLCIP05RA1
                data: {
                    "mydtCusno": this.cusNb,
					"basYm": this.basYm,
					"xpsCtgrC": this.ctgrInfo.xpsCtgrC
                }
            }
            apiService.call(config).then(response =>{
                // console.log('response', JSON.parse(JSON.stringify(response)))
                let ctgrDtlList = response.ctgrDtlList || []
                
                for (let i = 0; i < ctgrDtlList.length; i++) {
					let vary = ''
					let varyNm = ''
					if (ctgrDtlList[i].bmmCmprXpsAm > 0) {
						vary = 'raise'
						varyNm = '상승'
					} else if (ctgrDtlList[i].bmmCmprXpsAm < 0) {
						vary = 'decrease'
						varyNm = '하락'
					} else {
						vary = ''
						varyNm = '유지'
					}
					ctgrDtlList[i].vary = vary
					ctgrDtlList[i].varyNm = varyNm
				}

                this.ctgrDtlList = ctgrDtlList
            })
        }
    },
    mixins: [
        commonMixin,
        popupMixin
    ]
}
</script>