<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 영농캘린더
* @ 페이지설명 : 수입지출 대상 조회(POP)
* @ 파일명     : src/views/page/SZ/FC/SZFC2110/SZFC2110.vue
* @ 작성자     : 
* @ 작성일     : 2021-06-15
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-15              		                 최초작성
*************************************************************************/
-->
<template>
<div>
    <div class="dimmed" style="display:block;"></div>
    <div class="popup_box">
		<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
			<!--[타이틀(Start)]-->
			<div class="popup_header">    
				<h1>{{popTitleTxt}}<span>{{trDt | dateFilter('YYYY.MM.DD')}}</span></h1>
			</div>
			<!--[타이틀(Emd)]-->

			<!--메인(Body)-->
			<div class="popup_content h1_type02">
				<div class="com_txt_type03">

				<template v-if="this.asetCn > 0">
					<dl v-for="(aset, index) in asetList" :key="index">
						<dt>
							<!--2021.11.09(화) 변경--> 
							<i :class="'infOfrmnOrgC'+index">
								<span class="blind">{{aset.titnm}}</span>
							</i>  <!--titnm 타이틀명-->
							<!--2021.11.09(화) 변경--> 

							<!-- <span class="bank_01"><em class="blind">{{aset.titnm}}</em></span>   -->
							<div class="com_name_type01"  v-on:click.prevent="fn_setRstInfo(index)">
								<!--2021.12.01(수) 변경-->
								<p>{{aset.titnm}}</p>  
								<!--2021.12.01(수) 변경-->
								<span class="com_number04" :value="aset.infOfrmnOrgC" :v-model="aset.infOfrmnOrgC"> 
									{{aset.subTitnm}}
								</span>   <!--infOfrmnOrgC 정보제공자기관코드 subTitnm  서브타이틀명 -->
							</div>
						</dt>
						<dd>
							<span class="com_number01">{{aset.tram | numberFilter}}</span>   <!--tram 거래금액-->
							<em>원</em>
						</dd>
					</dl>
				</template>
				<template v-else>
					<div class="no_data_box">
						<div class="no_data_list">
							<p>검색 결과가 없습니다.</p>
						</div>
					</div>
				</template>
				</div>	
			</div>
			<!--메인(Body)-->
			<a href="javascript:void(0);"  @click="close()" class="btn_close"><span class="">취소</span></a>	
		</div>
	</div>
</div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'

export default {
	name: 'SZFC2110',
	data: () => {
		return {
			popSel 		: "",    //pop선택			
            popTitleTxt : "",    //팝업 타이틀
			trDt : "",  
			asetAmnCusno  : "",  // 자산관리고객번호
			asetCtgrDsc    : "",   //자산카테고리구분코드

			asetCn   : 0,
			asetList : [] , 
			//asetList : {} , 
		}
	},

    mixins: [
            popupMixin,
            commonMixin
	],
	
    mounted() {
        this.initComponent(this.params);
		console.log("this.params", this.params)

		//PFM로그 처리 화면접속이력 등록 POST
		apiService.pfmLogSend(this.$options.name)     
    },

	methods: {
		initComponent() {

			this.asetAmnCusno = this.params.mydtCusno;     //(변수)자산관리고객번호     = 부모프로그램 변수(마이데이터고객번호)
			this.trDt 		  = this.params.trDt;   	   //(변수)거래일자 		   = 부모프로그램 변수(거래일자)
			this.asetCtgrDsc  = this.params.asetCtgrDsc;   //(변수)자산카테고리구분코드 = 부모프로그램 변수(자산카테고리구분코드)

            if (this.asetCtgrDsc === '1') {
                this.popTitleTxt = '수입내역'
            } else if (this.asetCtgrDsc === '2') {
                this.popTitleTxt = '지출내역'
			}

			//
			this.getSearchList();
		},

		getSearchList() {

           const config ={
				url:'/sz/fc/10r01',
				//url : "/co/at/01r01",
				data : {
					mydtCusno   : this.asetAmnCusno,  //자산관리고객번호 = userInfo  
					trDt		: this.trDt,		   //거래일자 = (변수)거래일자
					asetCtgrDsc : this.asetCtgrDsc,   //자산카테고리구분코드 = (변수)자산카테고리구분코드
				}
             }
             apiService.call(config).then(response => {
						
				this.asetCn   = (response.asetCn === undefined)?0:response.asetCn;       //(출력)자산수
				this.asetList = (response.asetList === undefined)?'':response.asetList || []; //자산목록  = (출력)자산목록
             })

		},

        //선택 시 부모창으로 넘겨줄 파라미터 설정
        fn_setRstInfo(index) {
            this.closeParam = {
                bsnDscnm   : this.asetList[index].bsnDscnm,  //업무구분코드명
                updateKey  : this.asetList[index].updateKey,  //updateKey
                coicTitnm  : this.asetList[index].coicTitnm,  //선택타이틀명
                // tram  : this.asetList[index].tram  //거래금액
            }
            this.close(this.closeParam)
        }

	}

}
</script>

