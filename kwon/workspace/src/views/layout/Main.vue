<!--
/*************************************************************************
* @ 서비스경로  : 메인
* @ 페이지설명  : 메인
* @ 파일명      : src/views/page/Main.vue
* @ 작성자      : 
* @ 작성일      : 2020-10-16
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2020-10-16              류명훈                 최초작성
* 2021-04-15              배준성                 스크리핑제거
  2021-08-03              CS515731              자산수집 Vuex로 처리
  2021-08-31              CS515731              최초집입시 init 함수 변경 처리
                                                공통코드 조회 함수 분리
*************************************************************************/
-->
<template>
  <!-- class="mydata2023" -->
  <div id="page-area">
    <div id="wrap" class="sticky-scroll" :aria-hidden="wrapAriaHidden">
        <!-- Main Header Start -->
        <headers />
        <!-- Main Header End -->
        <router-view />
    </div>
      <modal-container />
  </div>
</template>

<script>
  import apiService from '@/service/apiService'
  import appService from '@/service/appService' //개발계 임시로 제거
  import Headers from '@/views/layout/HeadersV4.vue'
  import ModalContainer from '@/views/layout/ModalContainer.vue'
	import routerService from '@/service/routerService'
  import {mapActions, mapGetters} from 'vuex'
  import commonService from '@/service/commonService'
  import modalService from '@/service/modalService'
  import {granOpenDateCheck, checkMaintenanceTime} from '@/utils/date'
  import configService from '@/service/configService'

  import COAS2011 from '@/views/page/CO/AS/COAS2011/COAS2011.vue'
  //import COAS2012 from '@/views/page/CO/AS/COAS2012/COAS2012.vue' //상호금융 NH콕마이데이터 4.0 추진 개발로 인한 변경 OLD => NEW
  import COAS4012 from '@/views/page/CO/AS/COAS4012/COAS4012.vue'

  export default {
    name: 'Main',
    data: () => {
      return {
      }
    },
		computed: {
      ...mapGetters('modal', [
        'wrapAriaHidden'
      ]),
      ...mapGetters('user', [
        'userInfo',
        'isChildV4',
        'isNHAccountYn'
      ])
    },
    watch: {
      $route() {
        this.$nextTick(() => {
          // 25.03.20) 화면별 a태그 내 href # 포함 시 뒤로가기 동작 오류 방지
          var docs = document.querySelectorAll('a[href^="#"]')
          var d = [].forEach.call(docs, function(doc) {
            doc.addEventListener('click', function(e){
              e.preventDefault()
            })
          })
        })
      }
    },
    methods: {
      ...mapActions('user', [
        'initUserConfig'
      ]),
      ...mapActions('config', [
        'initAppConfig',
        'initCommonCodeList'
      ]),
      ...mapActions('myassets', [
        'initMyAssetGathering',
        'getMyBizRegInfo'
      ]),
      initApplication() {
        this.initAppConfig().then(()=>{

          //유입채널값 처리
          const params  = location.search.replace("?","")
          const list = params.split("&").filter(d => !!d)
          const paramObj = {}
          list.forEach(d => {
            const data = d.split('=')
            paramObj[data[0]] = decodeURIComponent(data[1])
          })

          const session = configService.getLoginSession() // session에 담겨있는 정보
          const userInfo = Object.assign(session, paramObj)
          //유입채널구분 (스뱅은 "001", 콕뱅 "002") --> 가입처리시 필요
          //20210831 채널정보 헤더 처리를 위한 서비스 요청
          userInfo.chnlGbn  = (userInfo.chnl === "385") ? "001" : "002"
          sessionStorage.setItem('userInfo', JSON.stringify(userInfo))

          if(userInfo.chnl === "385"){
            Kakao.init(import.meta.env.VITE_SB_KAKAO_APPKEY)
            console.log('sb 카카오 초기화 확인: ', Kakao.isInitialized())
          }else{
            Kakao.init(import.meta.env.VITE_CB_KAKAO_APPKEY)
            console.log('cb 카카오 초기화 확인: ', Kakao.isInitialized())
          }
          
          //GrandOpen Check
          if(granOpenDateCheck()) {
          
            if(userInfo.bypass !== undefined && userInfo.bypass === 'Y')
            {
              //내부사용자들을 위한 이동 처리
              if(checkMaintenanceTime()) {
                  const menu = {
                    name : "COCO1126",  // 서비스 준비중
                  }
                  commonService.movePage(menu)
              } else {
                this.initUserConfig().then(()=>{
                    this.initCommonCodeList() //공통코드 조회
                    this.moveLandingPage()
                },error => {
                  console.log('initUserConfig Error', error)
                  routerService.moveAppError(error)
                  apiService.removeLoading("App")
                })
                
              }              
            }else{
              //이용안내 페이지로 이동
                const menu = {
                  name : "COCO1118",  // 이용안내
                }
                commonService.movePage(menu)
            }
          }else{
            if(checkMaintenanceTime()) {
                const menu = {
                  name : "COCO1126",  // 서비스 준비중
                }
                commonService.movePage(menu)
            } else {

              this.initUserConfig().then(()=>{
                  this.initCommonCodeList() //공통코드 조회
                  this.moveLandingPage()
              },error => {
                console.log('initUserConfig Error', error)

                // 미성년자 alert add 2021.12.03
                if(error === "IS_CHILD") {
                  modalService
                  .alert("마이데이터 서비스는 만14세 이상만 가입이 가능합니다.", "", "확인")
                  .then(() => appService.moveMain(this.parseQueryString()))

                } else {
                  routerService.moveAppError(error)
                  apiService.removeLoading("App")
                }
              })
            }
          }
        },error => {
          console.log('init Application Error', error)
          routerService.moveAppError(error)
          apiService.removeLoading("App")
        })

      },
      moveLandingPage() {
        if (this.isChildV4) { //14세미만
            const menu = {
              //component : COAS2012
              component : COAS4012 //상호금융 NH콕마이데이터 4.0 추진 개발로 인한 변경 OLD => NEW
            }
            modalService.openPopup(menu)
        } else {

          //if(this.isNHAccountYn === false){
          if(this.userInfo.totAchldYn !== '1') {
            console.log('계좌없음')
            //미존재시 계좌가입안내 
              const menu = {
                component : COAS2011
              }
              modalService.openPopup(menu)
          } else {

            //자산 연결기관정보 2021.11.15
            if(this.userInfo.cusTpc === "4") {
              //연결기관정보 조회
              this.getMyBizRegInfo().then(()=>{

                // 스뱅/콕뱅 조합원메뉴 클릭시 조합원권한이 없는경우 add 2021.12.03
                if(this.userInfo.screen === "SZUM0001" && this.userInfo.macoAuthYn === "0") {
                  modalService.alert("해당메뉴는 조합원만 이용할 수 있습니다.").then(()=>{
                    const menu = {
                      // name: "MAMA1008"
                      //name: "MAMA2001"
                      name: "MAMA4001" //상호금융 NH콕마이데이터 4.0 추진 개
                    }
                    commonService.movePage(menu)
                  })

                } else {

                  const menu = {
                    name: routerService.getDefaultPage()
                  }
                  commonService.movePage(menu)
                }

              },error => {
                console.log('init getMyBizRegInfo Error', error)
                routerService.moveAppError(error)
                apiService.removeLoading("App")
              })
            } else {

              const menu = {
                name: routerService.getDefaultPage()
              }
              commonService.movePage(menu)
            }

          }
        }
      },
      parseQueryString() {
        const params  = location.search.replace("?","")
        const list = params.split("&").filter(d => !!d)
        const obj = {}
        list.forEach(d => {
          const data = d.split('=')
          obj[data[0]] = decodeURIComponent(data[1])
        })
        return obj
      },
    },
    components: {
      Headers,
      // HeadersV2,
      ModalContainer,
    },
    mounted() {
      this.initApplication()
      // this.moveLandingPage()
      // TODO: 로딩바 끄기 - 시점 수정 필요
      // appService.hideLoading()
    }
  }
</script>