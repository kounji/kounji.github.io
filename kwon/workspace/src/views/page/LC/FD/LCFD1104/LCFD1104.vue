<!--
/*************************************************************************
* @ 서비스경로 : 하단메뉴 > 지출분석 > 금융달력 > 수입/지출/이체 상세내역 > 카테고리설정
* @ 페이지설명 : 하단메뉴 > 지출분석 > 금융달력 > 수입/지출/이체 상세내역 > 수입,지출 카테고리설정
* @ 파일명     : src/views/page/LC/FD/LCFD1104/LCFD1104.vue
* @ 작성자     : CS515901
* @ 작성일     : 2021-06-09
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-09              CS515901                 최초작성
*************************************************************************/
-->
<template>
	<div>
		<!-- slide popup S -->
		<div class="dimmed" style="display:block;" @click.prevent="close()"></div>
		<div class="popup_box">
			<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
				<div class="popup_header">
					<h1>{{titleAsetCtgrDsc}}  카테고리 설정</h1>
				</div>
				<div class="popup_content">
					<!-- 지출일 경우 동일한 거래처의 지출 모두 선택한 카테고리로 변경 처리 적용-->
					<template v-if="xpsYn">
						<span class="btn_checkbox mt25">
							<cmm-check-box  :checked="xpsAllYn"
								id="chkXps"
								name="동일 거래처 지출을 선택 카테고리로 모두 변경"
								v-model="xpsAllYn"
							/>
						</span>
					</template>
					<div class="com_txt_type01">
						<ul class="com_slide_check_type03">
							
							<li v-for="(item, idx) in CategoryList" :key="idx" >
								<div class="btn_chk">
									<input type="radio" name="rdoCategory" v-model="selItem" :value="item.asetAmnCtgrId" :id="'rdoCategory_'+idx" @click="selectComplete(item)">
									<label :for="'rdoCategory_'+idx">
										<i :class="item.asetAmnCtgrId"><span class="blind">{{item.ctgrnm}}</span></i>	
										<!-- <i class="category_00"><span class="blind">미분류</span></i> -->
										<span>{{item.ctgrnm}}</span>
									</label>
								</div>
							</li>

							<!-- <li @click.prevent="setSelItem($event, '999')">
								<div class="btn_radio">
									<input type="radio" name="rdoCategory" v-model="selItem" value="999" id="rdoAdd">
									<label for="rdoAdd">
										<span class="logo"><img :src="require('@/assets/images/icon/icon_btn_plus.png')" alt=""></span>
										<span></span>
									</label>
								</div>	
							</li>							 -->
						</ul>			
					</div>
				</div>

			<a href="javascript:void(0);" class="btn_close"  @click.prevent="close()"><span class="">취소</span></a>
			</div>
		</div>
		<!--// slide popup E -->
	</div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'

import CmmCheckBox from '@/components/CmmCheckBox'
import LCFD1105 from '@/views/page/LC/FD/LCFD1105/LCFD1105'

export default {
    name : "LCFD1104",
    data: () => {
        return {
			CategoryList : []  ,  // 카테고리리스트
			xpsAllYn	 : false, // 지출 일괄처리여부
			selItem      : 0,     // 선택카테고리
			asetCtgrLclc : "",	//자산카테고리대분류코드 1:지출, 2:마이농가
			asetCtgrDsc	 : "",	//자산카테고리구분코드   1:수입, 2:지출, 3:이체
			reqPage 	 : "",
        }
	},
    props: {
          cdata: {
            type: Object,
            default: () => ({})
          },
    },	
    computed: {
		titleAsetCtgrDsc(){
			//asetCtgrLclc 자산카테고리대분류코드 1:지출, 2:마이농가
			//asetCtgrDsc  자산카테고리구분코드   1:수입, 2:지출, 3:이체
			if(this.asetCtgrDsc === "1")
			{
				return '수입'
			}else if(this.asetCtgrDsc === "2")
			{
				return '지출'
			}else{
				return '이체'
			}
		},
        xpsYn() {
            return (this.asetCtgrLclc === "1" && this.asetCtgrDsc === "2" && this.reqPage==='LCFD1103') ? true : false
        }
    },
    mixins: [
        commonMixin,
        popupMixin
	],
    components: {
      CmmCheckBox,
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

			console.log('params cdata ', this.cdata)

			this.asetCtgrLclc = this.cdata.asetCtgrLclc || ''		//자산카테고리대분류코드 1:지출, 2:마이농가
			this.asetCtgrDsc  = this.cdata.asetCtgrDsc	 || ''	//자산카테고리구분코드   1:수입, 2:지출, 3:이체
			this.reqPage	  = this.cdata.reqPage	 || ''	
			this.selItem = this.cdata.asetAmnCtgrId || ''

			const config = {
				url: '/lc/fd/04r01',
				data:	{
					asetCtgrLclc : this.asetCtgrLclc ,	//자산카테고리대분류코드 1:지출, 2:마이농가
					asetCtgrDsc  : this.asetCtgrDsc		//자산카테고리구분코드   1:수입, 2:지출, 3:이체
				}
			}
			apiService.call(config).then(response => {
				console.log(response)
				this.CategoryList = response.CategoryList || []
			})
		},
		setSelItem(evt, selItem){
			this.selItem = selItem
			if(this.selItem === "999")
			{
				this.openModalLCFD1105()
			}
		},
		delSelItem(evt, selItem){
			this.selItem = selItem
			console.log("delSelItem", selItem)
		},		
		openModalLCFD1105() {
				// console.log('------', event)
				const config = {
					component: LCFD1105,
					params: { // 파라미터
								asetCtgrLclc : this.asetCtgrLclc ,	//자산카테고리대분류코드 1:지출, 2:마이농가
								asetCtgrDsc  : this.asetCtgrDsc		//자산카테고리구분코드   1:수입, 2:지출, 3:이체
							}
				}
				//슬라이드팝업에서 풀팝업을 부르기 위한 오류 수정 (필수)
				config.renderer = this.modalConfig.renderer
				modalService.openPopup(config).then(response => {
					console.log("openModalLCFD1105" ,response)
				})
		},
		selectComplete(item){
			item.smTrplXpsCtgrChgYn = this.xpsAllYn
			console.log(item)
			this.close(item)
		}

    }
}
</script>