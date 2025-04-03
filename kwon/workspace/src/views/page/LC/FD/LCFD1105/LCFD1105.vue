<!--
/*************************************************************************
* @ 서비스경로 : 지출 > 금융캘린더 > 수입, 지출, 이체
* @ 페이지설명 : 금융캘린더 > 수입상세, 지출상세, 이체상세
* @ 파일명     : src/views/page/LC/FD/LCFD1105/LCFD1105.vue
* @ 작성자     : CS515901
* @ 작성일     : 2021-05-28
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-05-10              CS515901                 최초작성
*************************************************************************/
-->
<template>
	<div>
<!-- full popup S -->
		<div class="full_popup" id="full_popup_01">
		<div class="popup_header">    
			<h1>카테고리 추가</h1>
			<a href="javascript:void(0);" class="btn_close" @click="lcdf0005Close"><span class="blind">팝업닫기</span></a>	
		</div>			
		<div class="popup_content com_bg_type00">
				<div class="cate_wrap02 inner com_space_type01">
					<div class="pop_tit"><span>카테고리명  입력</span></div>
					<div class="com_input_type01">
						<input type="text" id="com_input01" class="" name="" value="" required="" placeholder="예) 보너스">
					</div>
				</div>
				<div class="com_inner">               
					<div class="list cate_wrap02_list">
						<strong class="com_box_tit02">아이콘 선택</strong>
						<ul class="com_radio_type03 com_radio_type03-01">
							<li>
								<div class="btn_radio">
									<input type="radio" name="house" id="radio01">
									<label for="radio01">
										<i class="icon icon01"></i>
									</label>	
								</div>	
							</li>
							<li>
								<div class="btn_radio">
									<input type="radio" name="house" id="radio02">
									<label for="radio02">
										<i class="icon icon01"></i>
									</label>	
								</div>	
							</li>
							<li>
								<div class="btn_radio">
									<input type="radio" name="house" id="radio03">
									<label for="radio03">
										<i class="icon icon01"></i>
									</label>	
								</div>	
							</li>
							<li>
								<div class="btn_radio">
									<input type="radio" name="house" id="radio04">
									<label for="radio04">
										<i class="icon icon01"></i>
									</label>	
								</div>	
							</li>
							<li>
								<div class="btn_radio">
									<input type="radio" name="house" id="radio05">
									<label for="radio05">
										<i class="icon icon01"></i>
									</label>	
								</div>	
							</li>
							<li>
								<div class="btn_radio">
									<input type="radio" name="house" id="radio06">
									<label for="radio06">
										<i class="icon icon01"></i>
									</label>	
								</div>	
							</li>
							<li>
								<div class="btn_radio">
									<input type="radio" name="house" id="radio07">
									<label for="radio07">
										<i class="icon icon01"></i>
									</label>	
								</div>	
							</li>
							<li>
								<div class="btn_radio">
									<input type="radio" name="house" id="radio08">
									<label for="radio08">
										<i class="icon icon01"></i>
									</label>	
								</div>	
							</li>
							<li>
								<div class="btn_radio">
									<input type="radio" name="house" id="radio09">
									<label for="radio09">
										<i class="icon icon01"></i>
									</label>	
								</div>	
							</li>
							<li>
								<div class="btn_radio">
									<input type="radio" name="house" id="radio10">
									<label for="radio10">
										<i class="icon icon01"></i>
									</label>	
								</div>	
							</li>
							<li>
								<div class="btn_radio">
									<input type="radio" name="house" id="radio11">
									<label for="radio11">
										<i class="icon icon01"></i>
									</label>	
								</div>	
							</li>
							<li>
								<div class="btn_radio">
									<input type="radio" name="house" id="radio12">
									<label for="radio12">
										<i class="icon icon01"></i>
									</label>	
								</div>	
							</li>
							<li>
								<div class="btn_radio">
									<input type="radio" name="house" id="radio13">
									<label for="radio13">
										<i class="icon icon01"></i>
									</label>	
								</div>	
							</li>
							<li>
								<div class="btn_radio">
									<input type="radio" name="house" id="radio14">
									<label for="radio14">
										<i class="icon icon01"></i>
									</label>	
								</div>	
							</li>
							<li>
								<div class="btn_radio">
									<input type="radio" name="house" id="radio15">
									<label for="radio15">
										<i class="icon icon01"></i>
									</label>	
								</div>	
							</li>
						</ul>
					</div>
				</div>    
			</div>
			<div class="popup_footer fixed">
				<div class="btn_half_box">
					<a href="javascript:void(0);" class="btn btn_grey">취소</a>
					<a href="javascript:void(0);" class="btn btn_mint">저장</a>
					<!-- btn_off 제거시 활성화 -->
				</div>
			</div>
			<!-- <a href="javascript:void(0);" class="btn_close"><span class="blind">팝업닫기</span></a>-->
		</div>
		<!--// full popup E -->
	</div>
</template>

<script>
import lcdf0005_commonMixin from '@/common/mixins/commonMixin'
import lcdf0005_popupMixin from '@/common/mixins/popupMixin'
//import apiService from '@/service/apiService'

export default {
    name : "LCFD1105",
    data: () => {
        return {
			lcdf0005_categoryList : []  ,  	// 카테고리리스트
			lcdf0005_xpsAllYn	  : false, 	// 지출 일괄처리여부
			lcdf0005_selItem      : 0,     	// 선택카테고리
			lcdf0005_asetCtgrLclc : "",		// 자산카테고리대분류코드 1:지출, 2:마이농가
			lcdf0005_aasetCtgrDsc : "",		// 자산카테고리구분코드   1:수입, 2:지출, 3:이체
        }
    },
    mounted() {
			this.initComponent()
    },
    mixins: [
        lcdf0005_commonMixin,
        lcdf0005_popupMixin
    ],
    methods: {
        initComponent() {
            this.getData();
        },
        getData() {
				
				this.lcdf0005_aasetCtgrLclc = this.params.asetCtgrLclc 	|| ''	//자산카테고리대분류코드 1:지출, 2:마이농가
				this.lcdf0005_aasetCtgrDsc  = this.params.asetCtgrDsc 	|| ''	//자산카테고리구분코드   1:수입, 2:지출, 3:이체

				const config = {
					url: '/lc/fd/05r01',
					data:	{
								asetCtgrLclc : this.lcdf0005_aasetCtgrLclc ,	//자산카테고리대분류코드 1:지출, 2:마이농가
								asetCtgrDsc  : this.lcdf0005_aasetCtgrDsc		//자산카테고리구분코드   1:수입, 2:지출, 3:이체
							}
				}
				console.log(config)

				

		},
		lcdf0005Close(){
			this.close('lcdf0005Close')
		}
    }
}
</script>