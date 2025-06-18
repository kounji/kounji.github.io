<template>
  <div>
    <p> - </p>
    <br>
    <p><button @click="testBxi()">OpenApi Bxi return</button></p>
    <br>
    <p> - </p>
    <p><button @click="testOpenApi('https://infuser.odcloud.kr/oas/docs?namespace=15137045/v1/uddi:97928e33-6479-4452-84d2-d572192b1928')">OpenApi Axios/Ajax Select</button></p>
    <p> - </p>
    <p><button @click="testOpenApi('https://infuser.odcloud.kr/oas/docs?namespace=15137045/v1')">OpenApi Axios/Ajax Select (no uddi)</button></p>
    <br>
    <p><button @click="testRSS1('https://www.mafra.go.kr/bbs/home/791/rssList.do?row=50')">Axios/Ajax Select</button></p>
    <p> - </p>
    <p> - </p>
    <p><button @click="testRSS2('https://www.mafra.go.kr/bbs/home/791/rssList.do?row=50')">RequestHeader set</button></p>
    <p> - </p>
    <p> - </p>
    <p><button @click="testRSS3('https://www.mafra.go.kr/bbs/home/791/rssList.do?row=50')">CrossDomain set</button></p>
    <p> - </p>
  </div>
</template>

<script>
  import axios from 'axios'
  import apiService from '@/service/apiService'
  import modalService from '@/service/modalService'
  import configService from '@/service/configService'

  export default {
    name: 'SampleAxios',
		computed: {
     
		},
    data: function() {
      return {
        c: configService,
      }
    },
    mounted() {
   
    },
    beforeDestroy(){
     
    },    
    methods: {
      testBxi() {
        const config = {
          url: "/pd/bf/05r01",
          data: {
            page: '1',
            perPage: '10'
          }
        }
        apiService.call(config).then(response => {
          console.log('>>>>> green magazine >>> ', response)
        })
      },
      testOpenApi(url) {
        let alertMsg = "OpenApi call test"
        const confirm_config = {
          content: [alertMsg],
          title: "",
          ALERT_CONFIRM_TEXT: "axios",
          ALERT_CANCEL_TEXT: "ajax"
        }
        modalService.confirm(confirm_config).then(text => {
          const config1 = {
            url: url,
            data: {
              page: 1,
              perPage: 10,
              returnType: "JSON"
            }
          }
          if(text == 'axios') {
              this.callRSS(config1).then(response => {
                  console.log("axios RSS response 농림축산 >>>>>>>>>>> ", response)
              })
          } else {
              this.callRSSAjax(config1).then(response => {
                  console.log("ajax RSS response 농림축산 >>>>>>>>>>> ", response)
              })
          }
        })
      },
      testRSS1(url) {
        let alertMsg = "RSS call test"
        const confirm_config = {
            content 			: [alertMsg],
            title				: "",
            ALERT_CONFIRM_TEXT 	: "axios",
            ALERT_CANCEL_TEXT 	: "ajax"	
        }
        modalService.confirm(confirm_config).then(text => {
            const config1 = {
                url: url,
                data: {}
            }
            if(text == 'axios') {
                this.callRSS(config1).then(response => {
                    console.log("axios RSS response 농림축산 >>>>>>>>>>> ", response)
                })
            } else {
                this.callRSSAjax(config1).then(response => {
                    console.log("ajax RSS response 농림축산 >>>>>>>>>>> ", response)
                })
            }
        })
      },
      
      testRSS2(url) {
        this.callRSSAjax2(url).then(response => {
                    console.log("ajax RSS 2 response >>>>>>>>>>> ", response)
        })
      },  
      testRSS3(rssUrl) {
          $.ajax({
            url: rssUrl, 
            Type: "GET",
            crossDomain : true,
            success: function(response) {
              console.log('success >> ', response)
            },
            fail: function(error){
              console.log('error >> ', error)
            }
        })
      },

      /**
       * NH콕마이데이터4.0 신규
       * ajax RSS 호출
       * @param {Object} userConfig : 사용자가 설정한 config
       * @return {Promise}
       */
      callRSSAjax(userConfig) {
        return new Promise((resolve, reject) => {
          $.ajax({
            url: userConfig.url, 
            type: "GET",
            data: userConfig.data,
            dataType: "JSON",
            success: function(response) {
              console.log('success >> ', response)
              alert("응답\n" + response);
              resolve(this.xmlToJson(response))
            },
            fail: function(error){
              console.log('error >> ', error)
              alert("오류\n" + response);
              reject(error)
            }
          })

        })
      },

        /**
       * NH콕마이데이터4.0 신규
       * ajax RSS 호출
       * @param {Object} userConfig : 사용자가 설정한 config
       * @return {Promise}
       */
      callRSSAjax2(userUrl) {
          console.log("window.location.origin", window.location.origin);
          return new Promise((resolve, reject) => {
            $.ajax({
                url: userUrl, 
                //dataType: "jsonp",
                crossDomain : true,
                beforSend : function (xhr) {
                  xhr.setRequestHeader( "Content-Type","application/xml")
                  xhr.setRequestHeader( "withCredentials", true)
                },
                success: function(response) {
                  console.log('success >> ', response)
                  //resolve(this.xmlToJson(response))
                  resolve(response)
                },
                fail: function(error){
                  console.log('error >> ', error)
                  reject(error)
                }
            })
          })
      },

      /**
       * NH콕마이데이터4.0 신규
       * axios RSS 호출
       * @param {Object} userConfig : 사용자가 설정한 config
       * @return {Promise}
       */
      callRSS(userConfig) {
        return new Promise(async (resolve, reject) => {

          userConfig = apiService.mergeDefaultConfig(userConfig)

          await axios(userConfig).then(
          response => {
            console.log('RSS original resonse >>> ', response)
            resolve(this.xmlToJson(response))
          },
          error => {
            console.log('error config >>> ', error)
            reject(error)
          }).catch(error => {
            console.log('error catch!!')
            if(error.response)
            {
              console.error("api call Response Error :",error.response.data)
              console.error("api call Response Error :",error.response.status)
              console.error("api call Response Error :",error.response.headers)
              if(error.response.status === '404') {
                routerService.moveServiceReadyError(error.response)
                reject(error.response)
              } else {
                routerService.moveServiceError(error.response)
                reject(error.response)
              }
            }
            else if(error.request)
            {
              console.error("api call Request Error :",error.request)
              routerService.moveServiceError(error.request)
            }
            else
            {
              console.log("api call Error ",error)
              routerService.moveServiceError(error.response)
              reject(error.response)
            }
          })
        })
      },
    }
  }
</script>