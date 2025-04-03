<template>
  <div>
    <p><button @click="post">Post</button></p>
    <p><button @click="put">Put</button></p>
    <p><button @click="error">Error</button></p>
    <p> - </p>
    <p><button @click="c.getCodeList()">공통코드목록전체조회</button></p>
    <p><button @click="c.getNoticeList()">공지사항목록조회</button></p>
    <p><button @click="c.getNoticeDetail({ofancId: 'NT0000000002'})">공지사항상세조회</button></p>
    <p><button @click="c.getTermsList({asetAmnStltAgrKdc: '01'})">약관동의목록조회</button></p>
    <p><button @click="c.getTermsDetail({stltAmnId: 'AG3'})">약관동의상세조회</button></p>
    <p><button @click="c.saveTermsAgree({asetAmnCusno: 'CS515003', stltAmnId: 'AG4', agrYn: 'Y'})">약관동의</button></p>
    <p><button @click="c.getTermsSearchList({})">약관검색목록조회</button></p>
    <p><button @click="errorTest()">errorTest</button></p>
    <p> - </p>
    <p><button @click="ajaxCall()">ajaxCall</button></p>
    <p><button @click="mdpAxoisCall()">mdpAxoisCall</button></p>
    <p><button @click="syncTest()">syncAxoisCall</button></p>
    <p> - </p>
    <p><button @click="loadingTest()">Loading Test</button></p>
  </div>
</template>

<script>
  import apiService from '@/service/apiService'
  import configService from '@/service/configService'
  import {mapGetters} from 'vuex'
  import store from '@/store'

  export default {
    name: 'SampleAxios',
		computed: {
      ...mapGetters('user', [
        'custNo',
      ]),
		},
    data: function() {
      return {
        c: configService,
      }
    },
    methods: {
      post() {
        const config = {
          // method: 'post', // post는 method 설정 안해도 됨 (기본값='post')
          url: '/as/0701r01',
          data: {
            asetAmnCusno: this.custNo
          }
        }
        apiService.call(config).then(response => {
          console.log(response) // something
        })
      },
      put() {
        const config = {
          method: 'put',
          url: '/as/0701r01',
          data: {
            asetAmnCusno: this.custNo
          }
        }
        apiService.call(config).then(response => {
          console.log(response) // something
        })
      },
      error() {

      },
      errorTest() {
        const config = {
          url: '/as/0001s03',
          data: {
            asetAmnCusno: '', // 자산관리고객번호
            fncAcDsc: '', // 금융계좌구분코드
            acno: '', // 계좌번호
          }
        }
        return apiService.call(config)
      },
      ajaxCall(){
                /*
                let param = {
                    "req_id"            : this.personalInfo.req_id,
                    "approve"           : "Approve", 
                    "mydt_cusno"        : this.personalInfo.mydt_cusno,
                    "client_id"         : this.personalInfo.client_id,
                    "serial_no"         : this.personalInfo.serial_no,
                    "req_consents"      : JSON.stringify(this.req_consents),
                    "account_list"      : JSON.stringify(this.send_account_list),
                }
                console.log("param : " + param);
                */
                $.ajax({
                        url : "http://19.24.144.168:6090/co/co/00r01",
                        type : "POST",
                        contentType : 'application/json;charset=UTF-8',
                        dataType : "json",
                        data : JSON.stringify({"comnCId": "GOLD_KDC"}),
                        beforSend:function(){
                            this.$store.dispatch('modal/addLoading')
                        },
                        done: function(response){
                            console.log(response)
                            this.$store.dispatch('modal/removeLoading')
                        },
                        fail: function(error){
                            console.log(error)
                            this.$store.dispatch('modal/removeLoading')
                        },
                    })        
      },
      mdpAxoisCall(){
        const config = {
          data: {
            cus: 'GvT2EqhiQaamI3Cqri/tJQ==', // 계좌번호
          }
        }
        return apiService.callMydata(config)
      },
      async syncTest(){
         const config = {
          url: '/as/ln/03r01',
          data: {
            mydtCusno : 'MYDTCUST01234567890', // 자산관리고객번호
            inqYm     : '202105', // 금융계좌구분코드
          }
        }
        await apiService.syncCall(config).then(response => {
          console.log ("sync response",  response)
        }) 
      },
      loadingTest() {
        console.log('addLoading!!!!!')
        store.dispatch('modal/addLoading')
      },
    }
  }
</script>