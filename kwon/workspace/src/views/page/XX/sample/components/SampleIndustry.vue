<template>
  <div>
		<table border=1>
            <tr>
                <th scope="row">은행코드</th>
                <th colspan="2">은행명</th>
            </tr>
            <tr v-for="(inqpl, index) in this.bankList" :key="index">
              <td scope="row">{{inqpl.orgCode}}</td>
              <td>{{inqpl.orgName}}</td>
              <td>
                <template v-if="inqpl.isSelected === true">
                <button type="button" class="cmm-btn-no" @click="deleteIndustry(inqpl.orgCode,inqpl.orgName)"><span>삭제</span></button>
                </template>
                <template v-else>
                <button type="button" class="cmm-btn-no" @click="addIndustry(inqpl.orgCode,inqpl.orgName)"><span>추가</span></button>
                </template>
              </td>
            </tr>
          </table>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'SampleIndustry',
		data: function() {
			return {
            imsi : null,
            industryCode: "bank",
            bankList: [
                        {orgCode:'kbank',             orgName:'K뱅크',         isSelected:false},
                        {orgCode:'kbstar',            orgName:'국민은행',       isSelected:false},
                        {orgCode:'kdb',               orgName:'산업은행',       isSelected:false},
                        {orgCode:'wooribank',         orgName:'우리은행',       isSelected:false},
                        {orgCode:'ibk',               orgName:'기업은행',       isSelected:false},
                        {orgCode:'standardchartered', orgName:'SC은행',         isSelected:false},
                        {orgCode:'citibank',          orgName:'한국씨티은행',    isSelected:false},
                        {orgCode:'hanabank',          orgName:'KEB하나은행',     isSelected:false},
                        {orgCode:'dgb',               orgName:'대구은행',        isSelected:false},
                        {orgCode:'suhyupbank',        orgName:'수협중앙회',      isSelected:false},
                        {orgCode:'busanbank',         orgName:'부산은행',        isSelected:false},
                        {orgCode:'nonghyup',          orgName:'농협은행',        isSelected:false},
                        {orgCode:'kjbank',            orgName:'광주은행',        isSelected:false},
                        {orgCode:'jejubank',          orgName:'제주은행',        isSelected:false},
                        {orgCode:'kfcc',              orgName:'새마을금고중앙회', isSelected:false},
                        {orgCode:'jbbank',            orgName:'전북은행',        isSelected:false},
                        {orgCode:'cu',                orgName:'신협중앙회',      isSelected:false},
                        {orgCode:'knbank',            orgName:'경남은행',        isSelected:false},
                        {orgCode:'epostbank',         orgName:'우체국',          isSelected:false},
                        {orgCode:'shinhan',           orgName:'신한은행',        isSelected:false},
                      ],
            sampleIndustry : [
                            {"industryCode":"bank", "orgCode":"kbank",             "orgName":"K뱅크"},
                            {"industryCode":"bank", "orgCode":"kbstar",            "orgName":"국민은행"},
                            {"industryCode":"bank", "orgCode":"kdb",               "orgName":"산업은행"},
                            {"industryCode":"bank", "orgCode":"wooribank",         "orgName":"우리은행"},
                            {"industryCode":"bank", "orgCode":"ibk",               "orgName":"기업은행"},
                            {"industryCode":"bank", "orgCode":"standardchartered", "orgName":"SC은행"},
                            {"industryCode":"bank", "orgCode":"citibank",          "orgName":"한국씨티은행"},
                            {"industryCode":"bank", "orgCode":"hanabank",          "orgName":"KEB하나은행"},
                            ]
      }
    },
    computed: {
      ...mapGetters('industry', [
        'industryListInfo', 'industrySelectList'
      ]),
      
    },    
    filters:{

    },
		mounted() {
      
    },
    methods: {
      initComponent() {
          this.getData()
      },
      getData() {
          for(let i=0; i< this.bankList.length; i++)
          {
              const found = this.industrySelectList(this.industryCode).findIndex(d => d.orgCode === this.bankList[i].orgCode ) 
              if (found != -1) {
                  this.bankList[i].isSelected = true
              }else{
                  this.bankList[i].isSelected = false
              }
          }
      },
      ...mapActions('industry', [
        'setIndustryInfo',
        'addIndustryInfo',
        'deleteIndustryInfo',
      ]),
      addIndustry(orgCode, orgName){
        const config = {
              industryCode : this.industryCode,
              orgCode : orgCode,
              orgName : orgName
        }
        this.addIndustryInfo(config)
        this.getData()
      },
      deleteIndustry(orgCode, orgName){
        const config = {
              industryCode : this.industryCode,
              orgCode : orgCode,
              orgName : orgName
        }
        this.deleteIndustryInfo(config)
        this.getData()
      },
      setIndustry(){ //테스트초기데이터
        const config = {
                        industryCode : this.industryCode,
                        data : this.sampleIndustry||[]
        }
        this.setIndustryInfo(config)
      }
    },
    created() {
      //this.setIndustry()
      this.initComponent()
    },
  }
</script>
