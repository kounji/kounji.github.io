<!--
/*************************************************************************
* @ 서비스경로 : 자산등록 > 부동산
* @ 페이지설명 : 자산등록 > 부동산 > step 1-2. 주소찾기(아파트 검색)
* @ 파일명     : src/views/page/CO/RE/CORE1202/CORE1202.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-05-18
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-05-18              CS515897              최초작성
* 2022-07-06 			  CS528053              고도화 파일명 변경(CO/CO/COCO1110/COCO1110.vue -> CO/RE/CORE1202/CORE1202.vue)
* 2023-08-04              CS533453              고도화 파일명 변경(PDMY1012.vue -> PDMY2045.vue)
*************************************************************************/
-->
<template>
    <div class="full_popup renewal" id="full_popup_01">
        <div class="popup_header">    
			<h1>아파트 검색</h1>
            <a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>	
        </div>
        <div class="popup_content com_no_bottom">
			<div class="com_inner com_line_type01 com_top_type02">
				<div class="com_input_type02">
					<!-- <label for="txt01"></label> -->
					<input type="search" id="txt01" placeholder="아파트를 검색하세요" title="아파트를 검색하세요" :value="srchKwrd" ref="srchKwrd" @input="fn_checkWord($event, 20)" @keyup.enter="getData">
					<a href="javascript:void(0);" class="com_btn_delete" :class="srchKwrd != '' && srchKwrd != null ? 'btnDeleteShow' : ''" v-show="srchKwrd.length>0" @click.prevent="del('srchKwrd')"><span class="blind">삭제</span></a>
					<a href="javascript:void(0);" class="com_btn_search" @click.prevent="getData"><span class="blind">검색</span></a>
				</div>
			</div>
			<template v-if="aptList.length > 0">
				<div>
					<ul class="search_list">
						<li v-for="(list, idx) in aptList" :key="'aptData_'+idx" @change="selComplete(idx, $event)" @click="selComplete(idx, $event)">
							<input type="radio" name="area" :id="'CO-CO-10-'+idx" :value="idx">
							<label :for="'CO-CO-10-'+idx">
								<dl>
									<dt>{{list.aptHcxnm}}</dt>
									<dd>{{list.provnm + ' ' + list.cwnm + ' ' + list.dgnm}}</dd>
								</dl>
							</label>
						</li>
					</ul>
				</div>
			</template>
			<div class="com_btn_area02" v-if="nxDataYn === 'Y'"><a href="javascript:void(0);" @click.prevent="moreList()" class="com_btn_more"><span>더보기</span></a></div>
			<template v-if="isSrch && aptList.length == 0 && nxDataYn != 'Y'">
				<div class="no_data_box mt150">
					<div class="no_data_list">
						<p>조회된 정보가 없습니다.</p>
					</div>
				</div>
			</template>

            <!-- 아파트 조회 전까지 관심아파트 보여줌 -->
            <template v-if="!isSrch">
				<div class="com_inner">
					<strong class="com_pop_tit01">관심 아파트에서 선택하기</strong>
				</div>
                <template v-if="inteRlestList.length > 0">
                    <ul class="search_list">
                        <li v-for="(inteRlest, idx) in inteRlestList" :key="'inteRlest'+idx" @change="selInteComplete(idx, $event)" @click="selInteComplete(idx, $event)">
                            <a href="javascript:void(0);"></a>
                            <input type="radio" name="area" id="area_01">
                            <label for="area_01">
                                <dl>
                                    <dt>{{inteRlest.aptHcxnm}}</dt>
                                    <dd>{{inteRlest.provnm || ''}} {{inteRlest.cwnm || ''}} {{inteRlest.dgnm || ''}}</dd>
                                </dl>
                            </label>
                        </li>
                    </ul>
                </template>
                <template v-else>
                    <div class="no_data_box mt150">
                        <div class="no_data_list">
                            <p>관심아파트 정보가 없습니다.</p>
                        </div>
                    </div>
                </template>
            </template>
			
		</div>
		<!-- <div class="popup_footer fixed">
			<div class="btn_full_box">
				<a class="btn btn_mint" :class="btnOnOff" @click.prevent="selComplete">선택 완료</a>
			</div>
		</div> -->
    </div>
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import {checkWord} from '@/utils/data'

import CORE1203 from '@/views/page/CO/RE/CORE1203/CORE1203'

export default {
    name : "PDMY2045",
    data: () => {
        return {
			srchKwrd 		: "",		// 검색키워드
			arrSrchKwrd		: "",		// 검색키워드(split)
			pageNo			: "",		// 페이지번호
			bfKwrd			: "",		// 이전 검색키워드

			// 조회된 데이터
			nxDataYn		: "",		// 다음 데이터 존재여부
			aptList			: [],		// 아파트 목록
			aptHscxIdvdc	: "",		// 아파트단지개별코드
			aptHcxnm		: "",		// 아파트단지명
			provnm			: "",		// 시도명
			cwnm			: "",		// 시구명
			dgnm			: "",		// 동명

			newPytpAreaCntn : "",		// 신평형면적

			rtnIdx 	        : "",		// 화면에 넘겨줄 리스트 내 인덱스
            isSrch	        : false,	// 검색유무flag
            
            // 관심부동산 조회
            inteRlestList   : []        // 관심 부동산 목록
        }
	},
	computed: {
		
	},
    mounted() {
		this.initComponent(this.params)

		//PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)

		setTimeout(() => {
			this.$refs.srchKwrd.focus()
		}, 100)
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        initComponent(param) {
			this.pageNo = 1
			this.srchKwrd = param.srchKwrd
			this.srchKwrd = this.srchKwrd.trim()
            this.getInteRlestList();            // 관심부동산 목록 조회
			if(this.srchKwrd.length > 0) {
				this.getData()
			}
        },
        getData() {
			this.srchKwrd = this.srchKwrd.trim()
			if(this.srchKwrd.length < 1) {
				modalService.alert("동 또는 단지명을 입력해주세요.")
				this.$refs.srchKwrd.blur()
				return false
			}

			this.arrSrchKwrd =this.srchKwrd.split(' ')

			this.pageNo = 1
			const config = {
				url : "/co/re/02r01",
				data: {
					srchKwrd 	: this.arrSrchKwrd[0],
					pageNo		: this.pageNo,
				}
			}
			apiService.call(config).then(response => {
				this.isSrch     = true
				this.nxDataYn 	= response.nxDataYn
				let aptList 	= response.aptList || []

				for (let i = 1; i < this.arrSrchKwrd.length; i++) {
					let searchKey = this.arrSrchKwrd[i] || ''
					searchKey = searchKey.trim().toUpperCase()
					if (!searchKey) continue

					aptList = aptList.filter(item => {
						let aptHcxnm = item.aptHcxnm.toUpperCase()
						let dgnm = item.dgnm.toUpperCase()
						return aptHcxnm.indexOf(searchKey) > -1 || dgnm.indexOf(searchKey) > -1
					})
				}

				this.aptList = aptList

				this.$refs.srchKwrd.blur()

				// 재검색시 check표시 초기화
				if(this.bfKwrd != "") {
					this.$nextTick(() => {
						const inputs = Array.from(this.$el.querySelectorAll('input[type="radio"]'))
						for(let i=0; i<inputs.length; i++) {
							inputs[i].checked = false
						}
					})
				}

				this.bfKwrd 	= this.srchKwrd	// 검색키워드 저장
			})
		},
		// 더보기 버튼 클릭
		moreList() {
			this.pageNo = this.pageNo + 1
			
			const config = {
				url : "/co/re/02r01",
				data: {
					srchKwrd 	: this.arrSrchKwrd[0],
					pageNo		: this.pageNo,
				}
			}
			apiService.call(config).then(response => {
				this.isSrch 	= true
				this.nxDataYn 	= response.nxDataYn
				let tmpList 	= response.aptList || []

				for (let i = 1; i < this.arrSrchKwrd.length; i++) {
					let searchKey = this.arrSrchKwrd[i] || ''
					searchKey = searchKey.trim().toUpperCase()
					if (!searchKey) continue

					tmpList = tmpList.filter(item => {
						let aptHcxnm = item.aptHcxnm.toUpperCase()
						let dgnm = item.dgnm.toUpperCase()
						return aptHcxnm.indexOf(searchKey) > -1 || dgnm.indexOf(searchKey) > -1
					})
				}

				if(this.aptList.length === 0) {
					this.aptList = tmpList
				} else {
					for(let i=0; i < tmpList.length ; i++) {
						this.aptList.push(tmpList[i])
					}
				}
			})
		},
		// 주소 아이템 선택
		selComplete(idx, e) {
			if(e.target.checked == true) return

			this.aptHcxnm		= this.aptList[idx].aptHcxnm
			this.aptHscxIdvdc 	= this.aptList[idx].aptHscxIdvdc

			this.fn_openRlestAreaPop()
		},
		// 검색 텍스트 삭제
		del(type) {
			if(type === 'srchKwrd') {
				this.srchKwrd = ""
			}
		},
		// 면적 선택 레이어 팝업 오픈
		fn_openRlestAreaPop() {
            let rlestInfo = []
            // 면적 리스트
            const config0 = {
                url : "/co/re/03ra1",
                data : {
                    aptHscxIdvdc : this.aptHscxIdvdc
                }
            }
            apiService.call(config0).then(response => {
                console.log("면적 리스트 API 결과 ", response)
                if(response.pytpAreaList != null && response.pytpAreaList != undefined) {
                    if(response.pytpAreaList.length > 0) {
                        rlestInfo = response.pytpAreaList;
                    }
                }
                
                const config1 = {
                    params : {
                        rlestInfo : rlestInfo,
                        selArea : this.newPytpAreaCntn,
                    },
                    renderer : {
                        component : CORE1203
                    }
                }
                modalService.openSlidePagePopup(config1).then(response => {
                    this.newPytpAreaCntn = response.newPytpAreaCntn
					this.aptHfisArea = response.aptHfisArea

					const rtnParam = {
						aptNm : this.aptHcxnm,
						aptHscxIdvdc : this.aptHscxIdvdc,
						newPytpAreaCntn : this.newPytpAreaCntn,
						aptHfisArea : this.aptHfisArea
					}
					this.close(rtnParam)
                })
            })
		},
		// 글자수 세기
		fn_checkWord(event, maxByte) {
			let rtnObj = checkWord(event.target.value, maxByte)

            if(rtnObj.flag) {this.$refs.srchKwrd.blur()}   // 알럿 중복 방지

            event.target.value = rtnObj.value
			this.srchKwrd = event.target.value
        },
        // 관심부동산 목록 조회
        getInteRlestList() {
            this.inteRlestList = [];
            this.inteCurrIdx = 0;

            const config = {
                url : "/an/re/02ra1",
				data: {
                    "mydtCusno"         : this.getUserInfo('mydtCusno'),        // 마이데이터고객번호
                    "aptHscxIdvdc"      : '',                                   // 아파트단지개별코드(다건 조회 시 생략)
                    "newPytpAreaCntn"   : ''                                    // 신평형면적내용(다건 조회 시 생략)
				}
            };
            apiService.call(config).then(response =>{
                this.inteRlestList = response.inteRlestList || [];
                console.log("관심부동산 목록 ", this.inteRlestList)
            });
        },
        // 관심부동산 주소 아이템 선택
		selInteComplete(idx, e) {
			if(e.target.checked == true) return

			this.aptHcxnm		= this.inteRlestList[idx].aptHcxnm
			this.aptHscxIdvdc 	= this.inteRlestList[idx].aptHscxIdvdc

			this.fn_openRlestAreaPop()
		},
    },
    components : {
    }
}
</script>