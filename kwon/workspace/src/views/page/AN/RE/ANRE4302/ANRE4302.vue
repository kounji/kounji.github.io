<!--
/*************************************************************************
* @ 서비스경로 : 더보기 > NH콕부동산 > 부동산청약
* @ 페이지설명 : 더보기 > NH콕부동산 > 부동산청약 > 청약정보 모두보기
* @ 파일명     : src/views/page/AN/RE/ANRE4302/ANRE4302.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-03-10
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-03-10              CS541013              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> 
		<div class="popup_header">
			<h1 class="">APT 분양정보</h1>
		</div>
		
		<div class="popup_content">
            <template v-for="(rlestSbp, idx) in rlestSbpList">
                <div class="com_inner" :key="idx">
                    <div class="apt_info">
                        <div class="top_info">
                            <div class="company">{{rlestSbp.conrcoNm}}</div>
                            <div><button type="button" class="stdBtn innerType01" @click="openDetailPop(rlestSbp.rcrtNtfyDtlUrlCntn)">자세히 보기</button></div>
                        </div>

                        <div class="area">{{rlestSbp.hseSpyAdr}}(<span class="date">{{convertToDate(rlestSbp.rcrtNtfyDt)}}</span>공고)</div>
                        <div class="price">분양가 <strong>{{ numberToKorean(rlestSbp.minAm * 10000)}} ~ {{numberToKorean(rlestSbp.maxAm * 10000)}}</strong></div><!-- [v4.0] 25-01-15 분양가 항목 추가 -->
                        <div class="titH1">{{rlestSbp.hsenm}}</div>
                        <div class="address">{{rlestSbp.hseSpyAdr}}</div>
                        <div class="list_type_01">
                            <strong class="titH5">청약일정</strong>
                            <ul class="list_type_2023">
                                <li>
                                    <dl>
                                        <template v-if="rlestSbp.hseKdDsc === '01' ||  rlestSbp.hseKdDsc === '09' || rlestSbp.hseKdDsc === '10'">
                                            <dt>1순위(해당지역)</dt>
                                            <dd>{{convertToDate(rlestSbp.ord1CorRgnRcStDt)}} ~ {{convertToDate(rlestSbp.ord1CorRgnRcEdDt)}}</dd>
                                        </template>
                                        <template v-else>
                                            <dt>청약접수일</dt>
                                            <dd>{{convertToDate(rlestSbp.sbprcStDt)}} ~ {{convertToDate(rlestSbp.sbprcEdDt)}}</dd>
                                        </template>
                                    </dl>
                                </li>
                                <li>
                                    <dl>
                                        <template v-if="rlestSbp.hseKdDsc === '01' ||  rlestSbp.hseKdDsc === '09' || rlestSbp.hseKdDsc === '10'">
                                            <dt>2순위(해당지역)</dt>
                                            <dd>{{convertToDate(rlestSbp.ord2CorRgnRcStDt)}} ~ {{convertToDate(rlestSbp.ord2CorRgnRcEdDt)}}</dd>
                                        </template>
                                        <template v-else>
                                            <dt>계약시작일</dt>
                                            <dd>{{convertToDate(rlestSbp.ctrStDt)}} ~ {{convertToDate(rlestSbp.ctrEdDt)}}</dd>
                                        </template>
                                    </dl>
                                </li>
                                <li>
                                    <dl>
                                        <dt>당첨자발표일</dt>
                                        <dd>{{convertToDate(rlestSbp.przmnAnncDt)}}</dd>
                                    </dl>
                                </li>
                                <li>
                                    <dl>
                                        <dt>입주예정월</dt>
                                        <dd>{{convertToDate(rlestSbp.mvinPlaYm)}}</dd>
                                    </dl>
                                </li>
                                <li>
                                    <dl>
                                        <dt>규모</dt>
                                        <dd>{{rlestSbp.hseSpyScl}}세대</dd>
                                    </dl>
                                </li>
                                <li v-if="rlestSbp.hseKdDsc === '01' ||  rlestSbp.hseKdDsc === '09' || rlestSbp.hseKdDsc === '10'">
                                    <dl>
                                        <dt>시공사</dt>
                                        <dd>{{rlestSbp.conrcoNm}}</dd>
                                    </dl>
                                </li>				
                            </ul>
                        </div>
                    </div>
                    <hr class="hr02">
                </div>

                <!-- <hr class="hr02"> -->
            </template>
		</div>


		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'

import ANRE4303 from '@/views/page/AN/RE/ANRE4303/ANRE4303'

export default {
    name : "ANRE4302",
	data: () => {
        return {
			rlestSbpList        : [],           // 청약 목록

            isApt               : false,        // 아파트 여부
		}
	},
	created() {
        
    },
	mounted() {
         this.initComponent(this.params)
    },
	computed: {
		
	},
	mixins: [
		popupMixin,
		commonMixin
    ],
	methods: {
        initComponent(params = {}) {
            this.rlestSbpList = params.rlestSbpList;
        },
        convertToDate(dateStr) {
            if(!dateStr) return '';
            
            let result;
            if(dateStr.length === 8){
                const year = dateStr.slice(0, 4);
                const month = dateStr.slice(4, 6);
                const day = dateStr.slice(6, 8);
                
                result = year + "." + month + "." + day;
            } else if(dateStr.length === 6) {
                const year = dateStr.slice(0, 4);
                const month = dateStr.slice(4, 6);
                
                result = year + "." + month
            }

			return result;
        },
        // 입력받은 금액을 한글로 변환
		numberToKorean(num) {
			if(!num) return '';
			
			const units = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
			const levels = ['', '십', '백', '천'];
			let number = Number(num);
			let result = '';
			let temp = '';
			let level = 0;
			
            number = Math.round(number / (100 * 10000)) * 100 * 10000;

            number /= 10000;
			if(number >= 10000){	// 억 이상 단위
				let tempNumber = Math.floor(number / 10000);
				
				while(tempNumber){
					if(tempNumber % 10){
						temp = (tempNumber % 10) + levels[level] + temp;
					}

					tempNumber = Math.floor(tempNumber / 10);
					level++;
				}
				temp += '억'

				result += temp;
				number %= 10000;
			}

			temp = '';
			level = 0;

			if(number){
				let tempNumber = number;

				while(tempNumber){
					if(tempNumber % 10){
						temp = (tempNumber % 10) + levels[level] + temp;
					}

					tempNumber = Math.floor(tempNumber / 10);
					level++;
				}
				temp += '만'

				result += temp;
			}

			result += '원';
			return result;
        },
        openDetailPop(url) {
            const config = {
                component: ANRE4303,
                params : {
                    url : url
                }
            }

            modalService.openPopup(config).then((response) => {
                
            })
        }
    },
}
</script>