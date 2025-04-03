<!--
/*************************************************************************
* @ 서비스경로 : 마이농가 > 조합원 > 조합원
* @ 페이지설명 : 조합원 메인-조합원현황(POP)
* @ 파일명     : src/views/page/SZ/UM/SZUM2102/SZUM2102.vue
* @ 작성자     : 
* @ 작성일     : 2021-06-02
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2021-06-02              		                 최초작성
*************************************************************************/
-->
<template>
    <div class="full_popup" id="full_popup_01"> 
        <div class="popup_header">    
            <h1>조합원 현황</h1>
        </div>
            
        <div class="popup_content com_bg_type00 com_no_bottom">
            <div class="com_inner">
                <!--조회내역이 존재할 경우-->
                <template v-if="inqData.length > 0 "> 
                    <template v-for="(inqDataObj, idx) in inqData" :data="inqDataObj"  >
                        <div class="pop_tit" :key="idx">
                            <span>{{inqDataObj.brnm}}</span>
                        </div>
                        <!-- <table class="com_tbl" :key="+idx"> -->
                        <table class="com_tbl" :key="'indo_'+idx">   <!--2021/10/25(월) 변경-->
                            <colgroup>
                                <!--2021/10/22(금) 변경-->
                                <col style="width:14rem">
                                <col style="width:*">
                                <!--2021/10/22(금) 변경-->

                                <!-- <col style="width:50%">
                                <col style="width:50%"> -->
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>가입조합</th>
                                    <th class="txt_r">
                                        <span class="roboto">({{inqDataObj.brc}})</span> <!--사무소코드-->
                                        <em>{{inqDataObj.brnm}}</em>  <!--사무소명-->
                                    </th> 
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>조합원번호</td>
                                    <td class="txt_r">{{inqDataObj.macono}}</td>
                                </tr>
                                <tr>
                                    <td>최초납입일자</td>
                                    <td class="txt_r roboto">{{inqDataObj.firPymDt | dateFilter('YYYY-MM-DD')}}</td>
                                </tr>
                                <tr>
                                    <td>출자금</td>
                                    <td class="txt_r">
                                        <!--2021.09.28(화) 변경-->
                                        <template v-if="inqDataObj.tnivaInqYN === 'Y' ">   <!--회전출자금조회여부 = Y 인경우, 정상 출자금값을... -->
                                             <span class="roboto">{{inqDataObj.pymAm |numberFilter}}</span>
                                        </template>  
                                        <template v-else>  <!--회전출자금조회여부 = N 인 경우, 0값을... -->                                                       
                                            <span class="roboto">{{NUM_ZERO}}</span> 
                                        </template>  
                                        <!--2021.09.28(화) 변경-->
                                        <em class="won">원</em>
                                    </td>
                                </tr>
                                <!--tr>
                                    <td :class="inqDataObj.macoDsc == '1' ? '출자금액'  : '가입금액' "></td>
                                    <td class="txt_r"><span class="roboto">{{inqDataObj.pymAm |numberFilter}}</span><em class="won">원</em></td>
                                </tr-->
                                <tr>
                                    <td>영농회</td>
                                    <td class="txt_r"><span>{{inqDataObj.faganm}}</span></td>  
                                </tr>
                            </tbody>
                        </table>
                    </template>
                </template>
                <!--조회내역이 없을경우-->
                <template v-else> 
                    <div class="no_data_box">
                        <div class="no_data_list">
                            <p>조회된 정보가 없습니다.</p>
                        </div>
                    </div>
                </template> 
                <!--조회내역이 없을경우-->                
            </div>
        </div>		
        <a href="javascript:void(0);"  @click="close()" class="btn_close"><span class="blind">팝업닫기</span></a>	
    </div>		
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'

export default {
	name: 'SZUM2106',
	data: () => {
		return {
            inqData   : [],
            NUM_ZERO  : 0,
		}
	},

    mixins: [
        popupMixin,
        commonMixin
	],
    
    mounted() {
        this.initComponent();
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },

	methods: {
		initComponent() {
			this.getData();
        },
        
        //**************
        // [조회]
        //***************/
		getData() {
            const config ={
                url: '/sz/um/02r01',
                data: {
                    mydtCusno : this.getUserInfo("mydtCusno")
                }
			}
			apiService.call(config).then(response => {

                this.inqData = (response.detailList === undefined)?'':response.detailList || []; //조합원정보(EA) 상세 리스트
            }) 
            
		},
	}
}
</script>