<!--
/*************************************************************************
* @ 서비스경로 : 더보기 > NH콕부동산 > 부동산청약
* @ 페이지설명 : 더보기 > NH콕부동산 > 부동산청약 > 청약정보 모두보기
* @ 파일명     : src/views/page/AN/RE/ANRE4209/ANRE4209.vue
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
			<h1 class="">청약정보 모두보기</h1><!-- 25-03-13 문구수정-->
		</div>
		
		<div class="popup_content">
            <template v-for="(rlestSbp, idx) in rlestSbpList">
                <div class="com_inner" :key="idx">
                    <div class="apt_info">
                        <div class="tit">
                            <strong class="titH1">청약정보를<br> 모두 확인해주세요.</strong>
                        </div>
                        <div class="top_info">
                            <!-- badge 타입 구분
                                badge + type01 : 아파트, 무순위/잔여세대, 계약취소주택
                                badge + type02 : 도시형생활주택, 오피스텔, 민간임대, 공공지원민간임대
                                badge + type03 : 임의공급
                            -->
                            <div class="cate">
                                <span :class="typeMap[rlestSbp.hseKdDsc]">{{typeText[rlestSbp.hseKdDsc]}}</span>
                            </div>
                            <span class="date">{{convertToDate(rlestSbp.rcrtNtfyDt) }} 공고</span>				
                        </div>
                        <div class="info">
                            <p class="titH2">{{rlestSbp.hsenm}}</p>
                            <p class="area">{{rlestSbp.hseSpyAdr}}</p>
                            <button type="button" class="stdBtn innerType01" @click="openDetailPop(rlestSbp.rcrtNtfyDtlUrlCntn)">자세히 보기</button>
                        </div>
                        
                        <div class="price">분양가 <strong>
                            <template v-if="rlestSbp.hseDtlKdDsc === '04' || rlestSbp.hseDtlKdDsc === '06'"> <!-- [v4.0] 25-01-15 분양가 항목 추가 -->
                                {{numberToKorean(rlestSbp.maxAm * 10000)}}
                            </template>
                            <template v-else>
                                {{ numberToKorean(rlestSbp.minAm * 10000)}} ~ {{numberToKorean(rlestSbp.maxAm * 10000)}}
                            </template>
                            </strong>
                        </div>
                        <!-- //25-03-13 전체적으로 구조변경 -->
                        
                        <div class="list_type_01">
                            <strong class="titH5">청약정보</strong><!-- 25-03-13 문구수정 -->
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
                                <!-- 25-03-13 항목 추가 -->
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
                                <!-- //25-03-13 항목 추가 -->				
                            </ul>
                        </div>
                    </div>
                </div>

                <hr class="hr02" :key="'hr_'+idx" v-if="idx != rlestSbpList.length - 1">
            </template>
		</div>

        <!--TEST 더보기(Start)-->	
		<div class="com_inner">
			<div class="com_btn_area02"><a href="javascript:void(0);" role="button" class="com_btn_more" @click.prevent="showMoreList(pageNo)" :style="this.nxDataYn == 'N' ? 'display : none' : ''"><span>더보기</span></a></div>
		</div>
		<!--TEST 더보기(End)-->	

		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'

import ANRE4210 from '@/views/page/AN/RE/ANRE4210/ANRE4210'

export default {
    name : "ANRE4209",
	data: () => {
        return {
			rlestSbpList        : [],           // 청약 목록
            hseKdDsc            : [],           // 청약 주택종류 구분 코드
            hseSpyaaStaC        : [],           // 관심지역 리스트

            isApt               : false,        // 아파트 여부

            nxDataYn		    : "",		    // 다음페이지 존재여부
			pageNo			    : 1,		    // 페이지넘버(서비스에서 페이징 처리하기로 해서 페이지 넘버로 보냄, 최초 1)
            pageCount           : 5,            // 한번에 보여줄 목록 갯수

            typeMap: {'01':'badge type01',
					'09':'badge type01',
					'10':'badge type01',
					'04':'badge type01',
					'06':'badge type01',
					'02':'badge type02',
					'03':'badge type02',
					'11':'badge type03',
            },
            typeText: {'01':'아파트',
					'09':'아파트',
					'10':'아파트',
					'04':'아파트',
					'06':'아파트',
					'02':'도시형생활주택',
					'03':'도시형생활주택',
					'11':'임의공급',
            },
		}
	},
	created() {
        
    },
	mounted() {
         this.initComponent(this.params)
         //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
	computed: {
		
	},
	mixins: [
		popupMixin,
		commonMixin
    ],
	methods: {
        initComponent(params = {}) {
            this.rlestSbpList   = params.rlestSbpList;
            this.hseKdDsc       = params.hseKdDsc;
            this.hseSpyaaStaC   = params.hseSpyaaStaC;

            this.pageNo = 1
            this.getData()
        },
        getData() {
            this.rlestSbpList = []

            const config = {
                url : "/an/re/01r01",
                data : {
                    mydtCusno       : this.getUserInfo("mydtCusno"),
                    hseKdDsc        : this.hseKdDsc,
                    hseSpyaaStaC    : this.hseSpyaaStaC,
                    pageCount       : this.pageCount,
                    pageNo		    : this.pageNo,		    	 	// 페이지번호
                    inqDsc          : "N"                           // 상세조회
                }
            }
            apiService.call(config).then(response =>{
                console.log("========/an/re/01r01=======",response)
                this.rlestSbpList = []
                this.rlestSbpList = response.resultList || [];
                this.nxDataYn = response.nxDataYn || ''   //다음데이터여부
                console.log("@@@@@ 11", response.resultList)
                console.log("@@@@@ 22", this.rlestSbpList)
                console.log("@@@@@ 1133", response.nxDataYn)
                
                //다음데이터여부가 Y일 경우 페이지 Count
                if (this.nxDataYn === 'Y' ) {
                    this.pageNo += 1
                }
            });

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
                component: ANRE4210,
                params : {
                    url : url
                }
            }

            modalService.openPopup(config).then((response) => {
                
            })
        },
        showMoreList() {
            const config = {
                url : "/an/re/01r01",
                data : {
                    mydtCusno       : this.getUserInfo("mydtCusno"),
                    hseKdDsc        : this.hseKdDsc,
                    hseSpyaaStaC    : this.hseSpyaaStaC,
                    pageCount       : this.pageCount,
                    pageNo		    : this.pageNo,		    	 	// 페이지번호
                    inqDsc          : "N"                           // 상세조회
                }
            };
            apiService.call(config).then(response =>{
                console.log("========/an/re/01r01=======",response)
                this.nxDataYn	= response.nxDataYn || ''     // (변수)다음데이터여부
                
                for(let i = 0; i < response.resultList.length; i++) {
					this.rlestSbpList.push(response.resultList[i])
				}
                
                //다음데이터여부가 Y일 경우 페이지 Count
                if (this.nxDataYn === 'Y' ) {
                    this.pageNo += 1
                }
            });
        },

    },
}
</script>