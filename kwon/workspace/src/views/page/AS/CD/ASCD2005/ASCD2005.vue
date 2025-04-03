<!--
/*************************************************************************
* @ 서비스경로 : 나의자산 > 부채 > 카드 > 청구상세
* @ 페이지설명 : 나의자산 > 부채 > 카드 > 조회할 청구서 카드 선택
* @ 파일명     : src/views/page/AS/CD/ASCD2005/ASCD2005.vue
* @ 작성자     : CS528061
* @ 작성일     : 2022-07-06
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2022-07-06              CS528061              최초작성
*************************************************************************/
-->
<template>
    <div>
	<!-- 슬라이드 팝업 시작 -->
	<div class="dimmed" style="display: block;"></div>
	<div class="popup_box renewal">
		<div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display: block;">
			<div class="popup_header">
				<strong class="com_pop_tit01">카드 선택</strong>
			</div>
			<div class="popup_content">
				<div class="radio_list noLine">
					<div class="btn_radio">
                        <input type="radio" name="com_check" id="com_check_ALL" :checked="cardPkAll" @click="selectComplete('ALL')">
                        <label for="com_check_ALL">
                            <span>전체카드</span>
                        </label>
					</div>

                    <li v-for="(item, index) in cardList" :key="index">                    
					<div class="btn_radio">
                        <input type="radio" name="com_check" :id="'com_check_' + index" :checked="item.mydtCdIdVal === cardPkSub?'checked':''" @click="selectComplete(item)">
                        <label :for="'com_check_' + index">{{item.cdcoCdWrsnm}}</label>                        
					</div>                    
                    </li>
				</div>
			</div>
			<div class="popup_footer">
			</div>			
			<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="">취소</span></a>
		</div>
	</div>
	<!--// 슬라이드 팝업 종료 -->        
    </div>
</template>

<script>
import apiService from '@/service/apiService'
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

export default {
    name : "ASCD2005",
    data: () => {
        return {
            mydtCusno       : "",   // 마이데이터고객번호
            infOfrmnOrgC    : "",   // 정보제공자기관코드


            cardList     : [] ,  // 카드 목록
            selectCheck     : "",
            cardPkAll       : "",
            cardPkSub       : "",
        }
    },
    props: {
          cdata: {
            type: Object,
            default: () => ({})
          },
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    computed : {
        
    },
    mounted() {
        this.initComponent()
        // PFM 로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name);
    },
    methods : {
        initComponent() {
            this.getData();
        },
        getData() {
            this.cardList = this.cdata.cardList;
            this.cardPkSub  = this.cdata.cardPk;

            if(this.cdata.cardPk === "ALL"){
                this.cardPkAll = "checked";
            }
        },
        selectComplete(item){
            if(item === 'ALL'){
                let closeParam = {
                    mydtCdIdVal : 'ALL',
                    cdcoCdWrsnm : '전체카드',
                }
                this.close(closeParam);
            }else{
                this.close(item);
            }
			
        }
    }
}
</script>