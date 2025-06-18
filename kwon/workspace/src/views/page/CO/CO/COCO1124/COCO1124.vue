<!--
/*************************************************************************
* @ 서비스경로 : 대출/보험관련 슬라이드 팝업
* @ 페이지설명 : 대출/보험관련 슬라이드 팝업
* @ 파일명     : src/views/page/CO/CO/COCO1124/COCO1124.vue
* @ 작성자     : CS515897
* @ 작성일     : 2021-05-17
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2021-05-17              CS515897              최초작성
*************************************************************************/
-->
<template>
<div>
  <div class="dimmed" style="display:block;"></div>
  <div class="popup_box">
    <div aria-hidden="false" class="slide_popup" id="slide_popup_01" style="display:block;">
        <div class="popup_header">
          <h1>{{cdata.title}}</h1>          
        </div>

        <div class="popup_content com_btn_bottom" @scroll="handleScroll">
          <div class="com_inner com_txt_type02">
            <template v-for="(currentDataListObj, index) in currentDataList" :data="currentDataList">
              <template v-if=" currentDataList.length > 1 ">
                <h2 :key="index">{{currentDataListObj.contentTitle}}</h2>
              </template>
              <template v-else>
                <h2 :key="index"></h2>
              </template>
              <template v-if="currentDataListObj.contentData.length>0">
                <ul class="list_type_01 chk_list_type_01" :key="currentDataListObj.contentGubn">
                      <template v-for="(currentDataubListObj, key) in currentDataListObj.contentData" :data="currentDataListObj.contentData">
                      <li :key="key">
                      <span class="btn_radio">
                        <input type="checkbox" :name="currentDataubListObj.goodsCode" :id="currentDataubListObj.goodsCode+key" :checked="currentDataubListObj.checked" @click="()=>selectContent(currentDataubListObj.goodsCode, currentDataubListObj.scNo)" />
                        <label :for="currentDataubListObj.goodsCode+key">
                          <dl>
                            <dt>
                              <div>
                                <i :class="currentDataubListObj.orgC"><span class="blind">{{currentDataubListObj.orgNm}}</span></i>
                                <em>{{currentDataubListObj.goodsName}}</em>
                                <span>{{currentDataubListObj.goodsCode}}</span>
                              </div>
                            </dt>
                            <dd>
                              <template v-if=" currentDataubListObj.hasOwnProperty('goodsPrice') ">
                              <span class="com_price">
                                <em class="num">{{currentDataubListObj.goodsPrice | numberFilter}}</em>
                                <em class="unit">원</em>
                              </span>
                              </template>
                            </dd>
                          </dl>
                        </label>
                      </span>
                        </li>
                      </template>
                </ul>
              </template>
              <template v-else>
                <div class="no_data_box" :key="currentDataListObj.contentGubn">
                    <div class="no_data_list">
                        <p>조회된 정보가 없습니다.</p>
                    </div>
                </div>
              </template>
            </template>
          </div>
        </div>
        <div class="popup_footer">
          <div class="btn_full_box">
            <a href="javascript:void(0);" class="btn btn_mint" :class="btnOnOff" :aria-disabled="btnOnOff == 'btn_off' ? true : false" @click='complete()'>{{isContentExist}}</a>
            <!-- btn_off 제거시 활성화 -->
          </div>
        </div>
        <a href="javascript:void(0);" class="btn_close" @click='close()'><span class="">취소</span></a>
    </div>
  </div>  
</div>
</template>

<script>
  import popupMixin from '@/common/mixins/popupMixin'
  import commonMixin from '@/common/mixins/commonMixin'
  import apiService from '@/service/apiService'
  //import modalService from '@/service/modalService'
  //import _ from 'lodash'
  
  export default {
    name: 'COCO1124',
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
    data() {
      return {
        currentDataList: [],
        selectGoodsList: [],
        purposeYn:'', // 화면구분(금융생활-목표등록)
        fncObtAm:0    // 목표금액(비교금액)
      }
    },
    computed: {
          isContentExist(){
            return ( this.currentDataList.length > 0 && this.currentDataList[0].contentData.length>0 ) ? '선택완료' : '확인'
          },
          // 대출 미선택시 선택 버튼 비활성화
          btnOnOff() {
            if(this.selectGoodsList.length <= 0) return "btn_off"
            for(let i = 0; i < this.selectGoodsList.length; i++) {
              if(this.selectGoodsList[i].checked) return "btn_on"
            }
            return "btn_off"
          },
    },
    methods: {
      initComponent() {
     
      },
      getData(){

      },
      complete(){

        // 금융생활(목표등록)시 선택한계좌의 잔액합계가 목표금액보다 큰경우 alert처리
        if(this.purposeYn == 'Y') {

            /*
            let sumAmt = _.sumBy(this.selectGoodsList, item => {
                if(item.checked === true) {
                    return item.goodsPrice
                }
            })

            if(sumAmt >= this.fncObtAm) {
              modalService.alert("계좌 잔액이 목표 금액을 초과하였습니다.<BR>연결계좌를 다시 선택하세요").then(() => {});
              return;
            }
            */
        }

        this.close(this.selectGoodsList)
      },
      selectContent(goodsCode, scNo){
        //console.log(this.selectGoodsList)
        for(let i=0; i < this.selectGoodsList.length; i++ )
        {
            if(this.selectGoodsList[i].goodsCode === goodsCode && this.selectGoodsList[i].scNo === scNo)
            {
              if(this.selectGoodsList[i].checked == true)
              {
                this.selectGoodsList[i].checked = false
              }else{
                this.selectGoodsList[i].checked = true
              }
            }
        }

      },
      handleScroll(evnt){ //스크롤 BOTTOM 이벤트
        if((evnt.target.offsetHeight + evnt.target.scrollTop) >= evnt.target.scrollHeight){
            console.log("scroll End")
        }
      },
      
    },
    created(){
    },
    mounted(){

        this.currentDataList = this.cdata.contentList || []
        this.purposeYn = this.cdata.purposeYn || '' // 화면구분(금융생활-목표등록)
        this.fncObtAm  = this.cdata.fncObtAm  || 0  // 목표금액(비교금액)
        
        for(let i=0; i<this.currentDataList.length;i++)
        {
            const contentData = this.currentDataList[i].contentData
            for(let j=0; j < contentData.length; j++)
            {
              const tmpArray = {
                "contentGubn" : this.currentDataList[i].contentGubn, 
                'goodsCode'   : contentData[j].goodsCode, 
                'checked'     : contentData[j].checked, 
                'goodsPrice'  : contentData[j].goodsPrice, 
                'goodsName'   : contentData[j].goodsName,
                'orgC'        : contentData[j].orgC,
                'orgNm'       : contentData[j].orgNm, /* 기관명 */
                'scNo'        : contentData[j].scNo
              }
              this.selectGoodsList.push(tmpArray)
            }
        }

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
  }
</script>
