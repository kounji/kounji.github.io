<!--
/*************************************************************************
* @ 서비스경로 : 자산등록 > 부동산
* @ 페이지설명 : 자산등록 > 부동산 > 부동산 면적/주거형태 선택
* @ 파일명     : src/views/page/CO/RE/CORE4203/CORE4203.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-01-13
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-01-13              CS541013              최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup renewal" id="full_popup_01"> 
		<div class="popup_header">
			<h1>부동산 등록/수정</h1>
			<a href="javascript:void(0);" @click.prevent="close()" class="btn_back" role="button"><span class="blind">이전화면</span></a>
		</div>

        
		
		<div class="popup_content">
			<div class="com_inner" v-if="isApt">
                <div>
                    <h1>면적 선택</h1>          
                </div>
                <div class="com_txt_type02">
                    <ul class="com_radio_type01">
                        <li v-for="(rlestItem, idx) in rlestInfo" :key="idx">
                            <span class="btn_radio">
                                <input type="radio" :id="rlestItem.aptHscxIdvdc + '_' + idx" :name="rlestItem.aptHscxIdvdc" :value="rlestItem.newPytpAreaCntn" v-model="selArea" @change="setRlestAreaInfo(rlestItem.aptHscxIdvdc, rlestItem.newPytpAreaCntn, rlestItem.aptHfisArea)" />
                                <label :for="rlestItem.aptHscxIdvdc + '_' + idx">{{rlestItem.newPytpAreaCntn}}㎡</label>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- v4.0 추가 start -->
            <div class="com_inner">      
                <div>
                    <h1>소유형태 선택</h1>          
                </div>
                <div class="com_txt_type02">
                    <ul class="com_radio_type01">
                        <li v-for="(rlestItem, idx) in rlestFormInfo" :key="idx">
                            <span class="btn_radio">
                                <input type="radio" :id="rlestItem.comnCVal + '_' + idx" name="rlestRadio" :value="rlestItem.comnCVal" v-model="selItem" @change="setRlestFormInfo(rlestItem.comnCVal, rlestItem.comnCExpl)" />
                                <label :for="rlestItem.comnCVal + '_' + idx">{{rlestItem.comnCExpl}}</label>
                            </span>
                        </li>
                    </ul>
                </div>
			</div>
            <!-- v4.0 추가 end -->

			<!-- <div class="com_inner">
				<div class="com_txt_type02">
					<strong class="com_pop_tit01">소유형태 선택</strong>
					<ul class="com_radio_type01 mt10">
						<li>
							<span class="btn_radio">
								<input type="radio" name="com_check02" id="com_check02_1" checked="checked">
								<label for="com_check02_1">
									<span>자가</span>
								</label>
							</span>
						</li>
						<li>
							<span class="btn_radio">
								<input type="radio" name="com_check02" id="com_check02_2">
								<label for="com_check02_2">
									<span>전세</span>
								</label>
							</span>
						</li>
						<li>
							<span class="btn_radio">
								<input type="radio" name="com_check02" id="com_check02_3">
								<label for="com_check02_3">
									<span>월세</span>
								</label>
							</span>
						</li>
					</ul>
				</div>
			</div> -->
		</div>

		<div class="popup_footer fixed">
            <div class="btn_full_box" v-if="isApt">
                <!-- <a href="javascript:void(0);" role="button" class="btn btn_mint" :class="btnOnOff" @click.prevent="setRlestAreaFormInfoBtn" :aria-disabled="btnOnOff == 'btn_off' ? true : false">다음</a> -->
				<a href="javascript:void(0);" role="button" class="btn btn_mint" @click.prevent="setRlestAreaFormInfoBtn">다음</a>
			</div>
			<div class="btn_full_box" v-else>
				<a href="javascript:void(0);" role="button" class="btn btn_mint" @click.prevent="setRlestAreaFormInfoBtn">다음</a>
			</div>
		</div>

		<a href="javascript:void(0);" @click.prevent="close()" class="btn_close"><span class="blind">팝업닫기</span></a>

	</div>
	<!--// full popup E -->
</template>

<script>
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'

import CORE2206 from '@/views/page/CO/RE/CORE2206/CORE2206' // 다음 넘어가서 아파트 시세 및 구입가격입력 단계

export default {
    name : "CORE4203",
    data: () => {
        return {
            isApt : true,
            rlestInfo : [],
            selArea : "",   // 면적 목록에서 기선택된 아이템
            rlestFormInfo : [],
            selItem : "",   // 주거형태 목록에서 기선택된 아이템

            closeAllParams : []     // v4.0 부모창으로 넘겨줄 파라미터(면적, 소유형태) 추가
        }
    },
    // computed: {
    //     btnOnOff() {
    //         return (this.selArea === "" && this.selItem === "") ? "btn_off" : ""
    //     }
    // },
    mixins: [
        popupMixin
    ],
    methods: {
        // 팝업화면 초기화
        popInit(popupParams) {
            // v4.0 추가 start
            // 아파트 확인 초기화
            this.isApt              = popupParams.isApt
            console.log("isApt ", this.isApt)

            // 소유형태 초기화
            this.rlestFormInfo  = popupParams.list
            this.selItem    = popupParams.selectVal
            // v4.0 추가 end

            // 면적 초기화
            this.rlestInfo = popupParams.rlestInfo
            this.selArea = popupParams.selArea

            // 부모창으로 넘겨줄 파라미터 초기화
            this.closeAllParams = {
                newPytpAreaCntn : popupParams.selArea,
                rlestTngDscVal : popupParams.selectVal,
                rlestTngDscNm : popupParams.selectNm
            }

            console.log("면적 목록 파라미터 ", popupParams)
            console.log("========== 소유형태 ============ ", this.selItem)
            console.log("========== 면적 ============ ", this.selArea)
            console.log("========== 면적 ============ ", popupParams.selectNm)

            this.getData()
        },
        getData() {

        },
        // Item 선택 시 부모창으로 넘겨줄 파라미터 설정
        setRlestAreaInfo(aptHscxIdvdc, newPytpAreaCntn, aptHfisArea) {
            this.closeParams = {
                aptHscxIdvdc : aptHscxIdvdc,        // 아파트단지 개별코드
                newPytpAreaCntn : newPytpAreaCntn,  // 면적
                aptHfisArea : aptHfisArea           // 아파트 분양 면적
            }
            console.log("----------------면적------------------ ", newPytpAreaCntn)
            // this.close(this.closeParams)

            // v4.0 추가 start
            this.closeAllParams = {
                ...this.closeAllParams,
                aptHscxIdvdc : aptHscxIdvdc,
                newPytpAreaCntn : newPytpAreaCntn,
                aptHfisArea : aptHfisArea,
            }

            this.selArea = newPytpAreaCntn
            // v4.0 추가 end
        },
        
        // 소유 형태 선택 시 부모창으로 넘겨줄 파라미터 설정
        setRlestFormInfo(val,name) {
            this.closeParams = {
                rlestTngDscVal: val,            // 부동산 유형(부동산물건구분코드)
                rlestTngDscNm : name            // 부동산 유형명
            }
            console.log("----------------소유형태------------------ ", val)
            console.log("----------------소유형태------------------ ", name)
            // this.close(this.closeParams)
            
            // v4.0 추가 start
            this.closeAllParams = {
                // 기존 closeAllParams에 병합
                ...this.closeAllParams,
                rlestTngDscVal: val,
                rlestTngDscNm : name
            }

            this.selItem = val
            // v4.0 추가 end
        },

        // v4.0 추가 start
        // 면접, 소유형태 선택 팝업에서 다음버튼
        setRlestAreaFormInfoBtn() {
                this.closeAllParams = {
                // 기존 closeAllParams에 병합
                ...this.closeAllParams
            }
            this.close(this.closeAllParams)
        }
        // v4.0 추가 end

    },
    mounted() {
        this.popInit(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)
    }
    
}
</script>
