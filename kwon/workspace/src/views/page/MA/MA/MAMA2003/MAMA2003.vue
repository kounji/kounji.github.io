<!--
/*************************************************************************
* @ 서비스경로 : PFM메인 > 메인
* @ 페이지설명 : PFM메인 > 메인 > 메인화면 설정
* @ 파일명     : src/views/page/MA/MAMA0005/MAMA0005.vue
* @ 작성자     : CS528063
* @ 작성일     : 2021-04-30
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-08-03              CS528063                 최초작성
*************************************************************************/
-->
<template>
    
	<div class="mydata2023">
        <!-- 슬라이드 팝업 시작 -->
		<div class="dimmed" style="display: block;" @click="close()"></div>
		<div class="popup_box renewal">
			<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
				<div class="popup_header">
					<strong class="titH3">자산 합계 편집</strong>
				</div>
				<div class="popup_content com_btn_bottom">
					<ul class="itemList" v-if="showList">
						<li>
							<em class="label">금융자산</em>
							<em class="num">{{ financeAssetAm | numberFilter }}원</em>
							<span class="cmm-switch sm">
								<input type="checkbox" id="check00" name="check00" disabled role="switch" checked>
								<label for="check00"><em class="blind">금융자산 합계반영</em></label>
							</span>
						</li>
						<li v-for="item in showList" :key="item.asetAmnDsc">
							<em class="label">{{ item.asetAmnDsnm }}</em>
							<em class="num">{{ Number((item.asetTotAm) || 0) | numberFilter }}원</em>
							<span class="cmm-switch sm">
								<input type="checkbox" :id="`check${item.asetAmnDsc}`" :name="`check${item.asetAmnDsc}`" role="switch" :value="item.asetAmnDsc" :checked="item.totYn === '1'" @change="fn_checkEvent($event, item)">
								<label :for="`check${item.asetAmnDsc}`"><em class="blind">{{item.asetAmnDsnm}} 합계반영</em></label>
							</span>
						</li>
					</ul>
				</div>
				<div class="popup_footer">
					<div class="btn_full_box">
						<a class="btn btn_mint" @click="fn_saveEvent()">확인</a>
					</div>
				</div>
				<a role="button" class="btn_close" @click="close()"><span class="">닫기</span></a>
			</div>
		</div>
		<!--// 슬라이드 팝업 종료 -->
    </div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
// import commonService from '@/service/commonService'
import {mapGetters} from 'vuex'
import _ from 'lodash'

export default {
    name : "MAMA2003",
    data : () =>{
        return {
			respInfo   : {},    //응답결과
			asetTotAm  : 0,     //총자산합계
			fnasTtAm   : 0,     //금융자산합계
			editCnt    : 0,     //편집대상건수

			showList   : [],    //노출대상리스트
			
			editList   : [],    //자산 합계 편집 리스트
        }
    },
    computed : {
        ...mapGetters('myassets', [
            'myAssetInfo',  //전체 자산 정보
        ]),

        mydtCusno(){
            return this.getUserInfo('mydtCusno')
        },
        crmCusno(){
            return this.getUserInfo('mydtCusno')
        },
        serviceType(){
            return import.meta.env.VITE_ENV
		},
		// 금융자산
		financeAssetAm() {
			return this.params?.asetFnAmSum || 0
		},
    },
    created() {
    },
    mounted() {
        this.initComponent()

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods : {
        initComponent() {
			console.log('initComponent');
            
            this.getData()

        },
        getData() {
			const config = {
				// url: '/ma/ma/02ra1',
				url: '/ma/ma/03r01',
				data: {
					"mydtCusno" : this.getUserInfo("mydtCusno")
				},
				disableLoading: true
			}
			apiService.call(config).then(response => {
				this.respInfo = response;

				this.editCnt   = this.respInfo.editCnt      //편집대상건수
				this.editList  = this.respInfo.editList || []    //편집대상목록

				//자산관리구분코드( 부채:01, 현금:02, 부동산:03, 자동차:04, 금:05, 기타:06)
				const assetMapper = {
					'01': this.params.dbtTotAm,
					'02': this.params.asetEtcCshAmSum,
					'03': this.params.asetRlthRlestAm,
					'04': this.params.asetRlthCarAm,
					'05': this.params.asetEtcGoldAm,
					'06': this.params.asetEtcEtcAm,
				}
				for(let i=0; i < this.editList.length; i++) {
					let asetAmnDsc = this.editList[i].asetAmnDsc    //자산관리구분코드
					this.editList[i].asetTotAm = assetMapper[asetAmnDsc]     //자산관리구분코드별 금액

					if(asetAmnDsc === "03") {
						this.showList.splice(1, 0, this.editList[i])
					} else if(asetAmnDsc === "04") {
						this.showList.splice(2, 0, this.editList[i])
					} else {
						this.showList.push(this.editList[i])
					}
				}
				// 기타자산 (현금 + 금 + 기타 를 기타자산으로 통합)
				let tempEtc = this.showList?.filter((el) => el.asetAmnDsc === "02" || el.asetAmnDsc === "05" || el.asetAmnDsc === "06") 
				if (tempEtc?.length > 0) {
					this.showList.push(tempEtc.reduce((acc, cur) => {
						acc.asetTotAm += Number(cur.asetTotAm)
						if (cur.totYn === '1') acc.totYn = '1'
						return acc
					}, {
						asetAmnDsc: "99",
						asetAmnDsnm: "기타자산",
						asetTotAm: 0,
						mydtCusno: this.showList[0].mydtCusno,
						totYn: "0",
					}))
					this.showList = this.showList.filter(el => el.asetAmnDsc !== "02" && el.asetAmnDsc !== "05" && el.asetAmnDsc !== "06")
				}
				console.log("show list :"+JSON.stringify(this.showList))
			})
		},
		/**
		* 자산편집 toogle 이벤트
		*/
		fn_checkEvent(e, o) {
			for(let i=0; i<this.editList.length; i++) {
				if(o.asetAmnDsc === this.editList[i].asetAmnDsc && o.asetAmnDsc !== '99') {
					if(e.target.checked === true) {
						this.editList[i].totYn = "1"    //선택
					} else {
						this.editList[i].totYn = "0"    //해제
					}
					// 기타자산 처리 로직(기타자산 = 현금 + 금 + 기타)
				} else if (o.asetAmnDsc === '99' && ['02', '05', '06'].includes(this.editList[i].asetAmnDsc)) {
					if(e.target.checked === true) {
						this.editList[i].totYn = "1"    //선택
					} else {
						this.editList[i].totYn = "0"    //해제
					}
				}
			}

			// toogle 변경시 총자산 금액 계산
			let sumAsetTotAm = _.sumBy(this.editList, item => {
				if(item.asetAmnDsc === '01') {  //부채
					return item.totYn === "1" ? Number(item.asetTotAm) * -1 : 0
				} else {
					return item.totYn === "1" ? Number(item.asetTotAm) : 0
				}
			})
			this.asetTotAm = Number(this.fnasTtAm) + sumAsetTotAm

		},
		/**
		 * 편집 내용 저장
		 */
		fn_saveEvent() {
			
			let checkList = []
			for(let i=0; i<this.editList.length; i++) {
				let obj = {}
				obj.mydtCusno  = this.editList[i].mydtCusno
				obj.asetAmnDsc = this.editList[i].asetAmnDsc
				obj.totYn      = this.editList[i].totYn
				checkList.push(obj)
			}

			if(checkList.length > 0){
				const config = {
					// url : '/ma/ma/02s01',
					url : '/ma/ma/03s01',
					data : {
						"editList" : checkList
					}
				}
				apiService.call(config).then(response => {
					if(response.rspC === "0000") {
						modalService.alert("저장되었습니다.").then((res) => {
							console.log('자산 편집 저장 res', res)
							this.close('reloadAsset');
						})
					}
				})
			}else{
				modalService.alert("다시 시도해 주세요").then(() => {
					this.close()
				})
			}
		}
		
    },

    mixins: [
        commonMixin,
        popupMixin
    ],
    components: {
    }
    
}

</script>