/**
 * 화면개발 공통 Mixin script
 */
import store from '@/store'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'

import appService from '@/service/appService'
import {mapGetters, mapActions} from 'vuex'
import {jQueryFncExcute, jQueryWebAccessibility} from '@/utils/jUtils'
import {isTolda, dateFormat, dayAdd, dayDiff} from '@/utils/date'
import * as XLSX from 'xlsx'


import {ex_lcfd4009, ex_sample} from '@/utils/excel'

const commonMixin = {
  props: {
  },
  data: function() {
    return {
      subscribeList: [], // subscribe 되는 객체 리스트, destroy에 사용
    }
  },
  computed: {
    ...mapGetters('layout', [
      'pageInfo',
    ]),

    /**
     * 페이지 이동시 전달 받은 parameter
     * @return {Object}
     */
    routeParams() {
      return this.pageInfo.params || {}
      // return this.$route.params || {}
    },
    
    /**
     * subscribe
     */
    subscribe: {
      get () {
        return this.subscribeList
      },
      set (value) {
        this.subscribeList.push(value)
      }
    }
  },
  methods: {
    ...mapActions('user', [
      'setUserMode'
    ]),
    /**
     * 고객 정보
     * @param {String} key : 값이 없으면 고객정보 object 리턴 있으면 그 값만 리턴
     * @return {Object | String}
     */
    getUserInfo(key) {
      const userInfo = store.state.user.userInfo || {}
      return key ? userInfo[key] : userInfo
    },
    
    /**
     * 자산관리 고객번호
     * @return {String}
     */
    getAsetAmnCusno() {
      return this.getUserInfo('asetAmnCusno')
    },
    
    getMydataCusno() {
      return this.getUserInfo('mydtCusno')
    },

    getUserName() {
      return this.getUserInfo('name')
    },    

    alert(...arg) {
      return modalService.alert(...arg)
    },
    
    confirm(...arg) {
      return modalService.confirm(...arg)
    },

    getCodeList(key) {
      const map = store.state.config.code || {}
      return map.get(key) || []
    },

    openSelect(...arg) {
      modalService.openSelect(...arg)
    },

    isNull(value) {
      return !value || String(value).trim().length === 0
    },

    isNotNull(value) {
      return this.isNull(value)
    },
    //Jquery 함수 Call
    callJQueryFncExcute(){
      jQueryFncExcute()
    },
    callJQueryWebAccessibility(){
      const modalLength = this.$store.state.modal.modalList.length
      jQueryWebAccessibility(modalLength)  //웹접근성 처리 fnc 호출
    },
    removeComma(value) {
      return (typeof value === "string") ? value.split(",").join("") : value
    },
    removeDot(value) {
      return (typeof value === "string") ? value.split(".").join("") : value
    },    

    // 네이티브 "이동", "돋보기" 키 입력시 다음 항목 이동 함수
    moveNextTag(e){
      if(e.target.type === undefined || e.target.type === null) return false

      if(e.target.type === 'button')
      {
          const inputs = Array.from(this.$el.querySelectorAll('button,input[type="text"],input[type="tel"],input[type="date"],input[type="radio"],input[type="checkbox"],textarea'))
          const index  = inputs.indexOf(e.target)
          if (index < inputs.length){
            if(inputs[index +1] === undefined || inputs[index +1] === null) return false

            if(inputs[index +1].type === 'button' || inputs[index +1].type === 'date')
            {
              inputs[index +1].click()
              e.target.blur()
            }else{
              inputs[index +1].focus()
            }
          }
      }else{
        if (e.keyCode === 13){
          const inputs = Array.from(this.$el.querySelectorAll('button,input[type="text"],input[type="tel"],input[type="date"],input[type="radio"],input[type="checkbox"],textarea'))
          const index  = inputs.indexOf(e.target)
          if (index < inputs.length){
            if(inputs[index +1] === undefined || inputs[index +1] === null) return false

            if(inputs[index +1].type === 'button' || inputs[index +1].type === 'date')
            {
              inputs[index +1].click()
              e.target.blur()
            }else{
              inputs[index +1].focus()
            }
          }
        }
      }
    },
    //달력팝업 기능 추가 20211015
    calendarPopup(...arg) {
      return modalService.calendarPopup(...arg)
    },
    // 자산수집 mutation 이벤트 감지 
    getGatheringListenSubscribe() {
      this.subscribe = this.$store.subscribe((mutation, state) => {
          const isMyAssetGathering = mutation.type === 'myassets/completeMyAssetGatherData'
          // 예금 전체조회
          if (isMyAssetGathering) {
              console.log('getGatheringListenSubscribe 자산수집 subscribe #########', mutation, state)
              setTimeout(() => {
                  this.getData()
              }, 1000)
          }
      })
    },
    scrollCheck() {
        var scrollTop = $(".sticky-scroll #content").scrollTop();
        if (scrollTop > 55){
            $("#wrap").addClass("responsive");
        }
        else{
            $("#wrap").removeClass("responsive");
        }
    },
    /*
    * 음성인식
    * 2025.03.17, sungchul, 권한 및 음성TEXT 앱단에서 처리 후 리턴
    * params{}
    * return{code: String, msg: String}
    */
    showVoice(){
      return new Promise((resolve, reject) => {
        if(this.getUserInfo('chnl') === "385"){ //스마트뱅크
            console.log("commonMixin:::showVoice called TO 스마트뱅킹")

            apiService.addLoading("voice")

            appService.showVoice().then(res => {
              apiService.removeLoading("voice")
              resolve(res.result)
            }).catch( error => {
              apiService.removeLoading("voice")
              reject(error)
            })
        }else{
            //콕뱅크
            console.log("commonMixin:::showVoice called TO 콕뱅킹")

            apiService.addLoading("voice")

            appService.cokBankShowVoice().then( res => {
              apiService.removeLoading("voice")
              resolve(res)
            }).catch(error => {
              modalService.alert("음성인식을 위해 마이크 권한 허용 해주세요.", error)
              apiService.removeLoading("voice")
              reject(error)
            })
        }
    })
    },
    /*
    * [deprecated] 음성인식 마이크 권한확인
    * params{}
    * return{}
    */
    voicePermission(){
      return new Promise((resolve, reject) => {
          if(this.getUserInfo('chnl') === "385"){ //스마트뱅크
              appService.requestPermission().then(res => {
                  console.log('음성인식 권한 resonpse: ', res)
                  let jsonRes = res.result
                  if(jsonRes.success === "1"){
                      resolve(this.voice())
                  }else{
                      modalService.alert("음성인식을 위해 마이크 권한 허용 해주세요.")
                      reject('마이크 권한 오류')
                  }
              }).catch(error => {
                  console.log('마이크 권한 오류:', error)
              })     
          }else{
              //콕뱅크
              appService.cokBankRequestPermission().then(res => {
                  console.log('음성인식 권한 response: ', res)
                  let jsonRes = JSON.parse(res.result)
                  if(jsonRes.success === "1"){
                      resolve(this.voice())
                  }else{
                      modalService.alert("음성인식을 위해 마이크 권한 허용 해주세요.")
                      reject('마이크 권한 오류')
                  }
              }).catch(error => {
                  console.log('마이크 권한 오류:', error)
              })   
          }
      })
    },
    /*
    * [deprecated] 음성인식
    * params{}
    * return{}
    */
    voice(){        
        return new Promise((resolve, reject)=>{
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
            let reco = new SpeechRecognition()
            reco.lang = 'ko-KR'
            
            // reco.interimResults = true
            // reco.continuous = true
            // reco.maxAlternatives = 1
            
            apiService.addLoading("voice")

            reco.onstart = () => {
                console.log('음성인식 시작')
            }

            reco.onresult = (e) => {
                apiService.removeLoading("voice")
                console.log('음성인식 성공 : ', e)
                let result = {'success': '1', 'msg': e.results[0][0].transcript}
                resolve(result)
            }

            reco.onerror = (e) => {
                apiService.removeLoading("voice")
                console.log('음성인식 오류 : ', e)
                let result = {'success': '0', 'msg': e}
                resolve(result)
            }

            reco.onend = () => {
                console.log('음성인식 종료')
            }

            reco.start()
        })
    },
    /*
    * 카카오톡 공유하기
    * params{title:String, description:String, img:String, screen:String}
    * return{}
    */
    shareKakao(data){
        console.log('shareKakao')
        if(!Kakao.isInitialized()){
          if(this.getUserInfo('chnl') === "385"){
            Kakao.init(import.meta.env.VITE_SB_KAKAO_APPKEY)
            console.log('sb 카카오 초기화 확인: ', Kakao.isInitialized())
          }else{
            Kakao.init(import.meta.env.VITE_CB_KAKAO_APPKEY)
            console.log('cb 카카오 초기화 확인: ', Kakao.isInitialized())
          }
        }
        
        let url = location.href.substr(0, location.href.lastIndexOf('/'))
        
        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: data.title,
                description: data.description,
                imageUrl: url + '/assets/images/' + data.img,
                link: {
                    mobileWebUrl: url + '/?cus=' + this.getUserInfo('cus') + '&chnl=' + this.getUserInfo('chnl') + '&screen=' + data.screen,
                    webUrl: url + '/?' + this.getUserInfo('cus') + '&chnl=' + this.getUserInfo('chnl') + data.screen,
                }       
            }
        })
    },
  
    /**
    * 엑셀다운로드
    * 엑셀 내역에 따라 레이아웃이 다르므로 excel.js함수를 통하여 해당 레이아웃을 받음
    * @param {String} 엑셀 레이아웃 호출 함수
    * @param {Json Data} data 엑셀 레이아웃을 만들기위한 데이터
    * @param {Number = null} toast 저장여부 alert toast로 띄울지 여부 (0인 경우는 modal alert로 따로 처리)
    * EX )
    * excelExport(exec_lcfd4009, data ) 샘플
    * exgbn = exec_lcfd4009 // excel.js 호츌 함수
    * data = {
                  header : {
                              title:String, 
                              tr_from:String,
                              tr_to :String,
                              tr_gbn :String 
                            } , 
                  data:[{array}]
                } 
     * @return 
     */
    excelExport(exgbn ,data, toast){

      //리턴받을 워크쉬트
      let worksheet;
      
      if ( exgbn == "exec_lcfd4009") {
        worksheet = ex_lcfd4009(data);
      } else if ( exgbn == "sample") {
        worksheet = ex_sample(data);
      }
      
      //신규 워크북 필수 생성
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

      const excelFileName = (data.header.title || "excelDownload") + ".xlsx"

      //로컬호스트일 경우
      if ( window.location.host.indexOf('localhost') > -1 ) {
        XLSX.writeFile(workbook, excelFileName)
      } else {
        const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'base64'})
        const result = {
          "title": excelFileName,
          "data" : excelBuffer,
          "toastYn":  toast || "1"   //저장여부 alert toast로 띄울지 여부 (0인 경우는 modal alert로 따로 처리)
        }
        console.log("excel result => ", result)

        if(this.getUserInfo('chnl') === "385") {
          appService.exportExcel(result).then(res => {
            if(toast === "0"){
              if(res.success === "1"){
                modalService.alert("저장되었습니다.")
              }else{
                modalService.alert("저장 실패하였습니다.")
              }
            }
          })
        } else {
            appService.cokBankExportExcel(result).then(res => {
              if(toast === "0"){
                if(JSON.parse(res).success === "1"){
                  modalService.alert("저장되었습니다.")
                }else{
                  modalService.alert("저장 실패하였습니다.")
                }
              }
            })
        }
      }
      
    },

    /*
    * 금융지식 목록 가져오기
    * params{scrnPsnEstCntn:게시위치:String}
    * return{klList:게시위치에 해당되는 금융지식 목록}
    */
    getFinanInfo(scrnPsnEstCntn, rowCnt, flag) {
      return new Promise((resolve, reject) => {
        let scrMode = this.getScrmode(); // 화면모드(U 둘러보기/N 일반모드/S 큰글씨/C 청소년)
        
        const config = {
          url: '/co/ct/01r03',
          data: {
                  cntzTpc        : Object.keys(scrMode).length < 1 ? "N": scrMode.mode, // 화면모드
                  scrnPsnEstCntn : scrnPsnEstCntn,  // 게시위치
                  rowCnt         : rowCnt,
                  ageDsc         : flag ? "Y" : "",          // 연령별구분여부코드
                }
        };

        apiService.call(config).then(response => {
          resolve(response.klList)
        })
      })
      
    },

    //////////////////////////////////////////////
    // NH콕마이데이터 4.0
    // 로컬스토리지 설정 공통 작업
    //////////////////////////////////////////////
    /**
     * 화면 모드 로컬스토리지 set
     * @param {String} mode: N(일반), U(미가입자), S(큰글), C(청소년)
     */
    setScrmode(mode) {
      if(this.isNull(this.getUserInfo('mydtCusno')) || this.isNull(this.getUserInfo('chnl'))) return

      // 25.03.18) 로컬스토리지 사용 V4 통합
      // const localKey = 'scrmode' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'V4'
      const localKey = 'usrInfoSet' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'V4'
      
      // state mode값 변경
      this.setUserMode(mode)

      // 로컬스토리지 모드설정 변경
      let usrSetObj = commonService.getStorage(localKey)
      if(JSON.stringify(usrSetObj) == '{}' || usrSetObj == null || typeof usrSetObj == 'undefined') {
        // 호출한 사용자 설정값이 없을경우 (앱 첫 진입 시 로컬스토리지 화면모드 설정)
        commonService.setStorage(localKey, {scrMode: {mode: mode}})

        return
      } else {
        let scrModeObj = usrSetObj?.scrMode
        if(typeof scrModeObj == 'undefined' || scrModeObj == null) {
          usrSetObj.scrMode = {mode: mode}
          commonService.setStorage(localKey, usrSetObj)

          return
        }

        // 호출한 사용자 설정값이 있을경우
        scrModeObj.mode = mode
        commonService.setStorage(localKey, usrSetObj)
      }
    },
    /**
     * 화면 모드 로컬스토리지 get
     */
    getScrmode() {
      if(this.isNull(this.getUserInfo('mydtCusno')) || this.isNull(this.getUserInfo('chnl'))) return

      // 25.03.18) 로컬스토리지 사용 V4 통합
      // const localKey = 'scrmode' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'V4'
      const localKey = 'usrInfoSet' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'V4'

      let scrObj = commonService.getStorage(localKey)?.scrMode
      if(JSON.stringify(scrObj) == '{}' || scrObj == null || typeof scrObj == 'undefined') {
        // 로컬스토리지 내 키에 해당하는 값 없는경우
        // 미가입자 및 청소년 디폴트 모드 설정 필요
        if(this.getUserInfo('cusTpc') == '1') {
          // 1. 미가입자 모드 설정
          this.setScrmode('U')
        } else if(isTolda(this.getUserInfo('usrBirth'))) {
          // 2. 청소년 디폴트 모드 설정
          this.setScrmode('C')
        } else {
          this.setScrmode('N')
        }
      }

      return commonService.getStorage(localKey)?.scrMode
    },

    /**
     * 금액 show/hide 로컬스토리지 set
     * @param {String} category: 화면 내 숨김/보기처리할 항목
     * @param {String} hiddenYn: 숨김/보기 flag 값 (default false)
     * @return
     */
    setSecretAmInfo(category, hiddenYn=false) {
      if(this.isNull(this.getUserInfo('mydtCusno')) || this.isNull(this.getUserInfo('chnl'))) return

      // 호출한 화면이 팝업인지 확인 후 ID 설정
      let scrid = ''
      const currentPage = store.getters['layout/pageInfo']
      const modalInfo = store.getters['modal/modalList']
			const modalLength = modalInfo.length

      scrid = modalLength > 0 ? modalInfo[modalLength-1].component.name : currentPage.name

      // 25.03.18) 로컬스토리지 사용 V4 통합
      // const localKey = 'secret' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'V4'
      const localKey = 'usrInfoSet' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'V4'
      let usrSetObj = commonService.getStorage(localKey)
      let scrObj = usrSetObj?.secret
      let tmpHiddenObj = scrObj.find(d => d.scrid == scrid).hiddenObj

      if(!hiddenYn) {
        // 스토리지 내 제거
        tmpHiddenObj = tmpHiddenObj.filter(d => d != category)
        scrObj.find(d => d.scrid == scrid).hiddenObj = tmpHiddenObj
      } else {
        // 스토리지 내 추가
        tmpHiddenObj.push(category)
        scrObj.find(d => d.scrid == scrid).hiddenObj = [...new Set(tmpHiddenObj)]
      }

      usrSetObj.secret = scrObj

      commonService.setStorage(localKey, usrSetObj)
    },
    /**
     * 금액 show/hide 로컬스토리지 get
     * @return {Array} hiddenObj (화면 내 숨김처리한 항목 배열)
     */
    getSecretAmInfo() {
      if(this.isNull(this.getUserInfo('mydtCusno')) || this.isNull(this.getUserInfo('chnl'))) return

      // 호출한 화면이 팝업인지 확인 후 ID 설정
      let scrid = ''
      const currentPage = store.getters['layout/pageInfo']
      const modalInfo = store.getters['modal/modalList']
			const modalLength = modalInfo.length
      
      scrid = modalLength > 0 ? modalInfo[modalLength-1].component.name : currentPage.name

      // 25.03.18) 로컬스토리지 사용 V4 통합
      // const localKey = 'secret' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'V4'
      const localKey = 'usrInfoSet' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'V4'
      let usrSetObj = commonService.getStorage(localKey)
      let scrObj = usrSetObj?.secret
      let tmpObj = null

      if(JSON.stringify(scrObj) == '{}' || scrObj == null || typeof scrObj == 'undefined') {
        // 지정된 로컬스토리지 키 없을 경우 생성 후 반환
        tmpObj = [{scrid: scrid, hiddenObj: []}]
        usrSetObj.secret = tmpObj
        commonService.setStorage(localKey, usrSetObj)
      } else {
        tmpObj = scrObj.find(d => d.scrid == scrid)
        
        if(tmpObj == null || typeof tmpObj == 'undefined') {
          // 지정된 로컬스토리지 키 오브젝트가 있으나 화면ID에 해당하는 데이터 없을경우
          tmpObj = {scrid: scrid, hiddenObj: []}
          scrObj.push(tmpObj)
          usrSetObj.secret = scrObj

          commonService.setStorage(localKey, usrSetObj)
        }
      }

      return !tmpObj.hiddenObj ? tmpObj.find(d => d.scrid == scrid).hiddenObj : tmpObj.hiddenObj
    },

    /**
     * 관심지역 사용여부 로컬스토리지 설정
     * @param {String} rgnDsc : 지역구분코드 (01:지역정보, 03:청약)
     * @param {String} useYn : 사용여부(1:여, 0:부)
     * @param {String} desc : 설명
     */
    setInteRgnInfo(rgnDsc="01", useYn="1", desc=""){
      if(this.isNull(this.getUserInfo('mydtCusno')) || this.isNull(this.getUserInfo('chnl'))) return

      // 25.03.18) 로컬스토리지 사용 V4 통합
      // const localKey = 'nhInteRgn' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'V4'
      const localKey = 'usrInfoSet' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'V4'
      let usrSetObj = commonService.getStorage(localKey)
      let inteRgnObj = usrSetObj?.nhInteRgn

      if(this.isNull(desc)) desc = rgnDsc == '01' ? "지역정보" : "청약"

      if(JSON.stringify(inteRgnObj) == '{}' || inteRgnObj == null || typeof inteRgnObj == 'undefined') {
        usrSetObj.nhInteRgn = [{'rgnDsc': rgnDsc, 'desc': desc, 'useYn': useYn}]

        commonService.setStorage(localKey, usrSetObj)
      } else {
        inteRgnObj = inteRgnObj.filter(d => d.rgnDsc != rgnDsc)
        inteRgnObj.push({'rgnDsc': rgnDsc, 'desc': desc, 'useYn': useYn})

        // rgn 오름차순 정렬
        if(inteRgnObj.every(d => !isNaN(d.rgnDsc))) {
          inteRgnObj = inteRgnObj.sort((a,b) => Number(a.rgnDsc) - Number(b.rgnDsc))
        }

        usrSetObj.nhInteRgn = inteRgnObj

        commonService.setStorage(localKey, usrSetObj)
      }
    },
    /**
     * 관심지역 사용여부 로컬스토리지 조회
     * @param {String} rgnDsc : 지역구분코드
     * @return {String} useYn : 사용여부(1:여/0:부)
     */
    getInteRgnInfo(rgnDsc="01") {
      if(this.isNull(this.getUserInfo('mydtCusno')) || this.isNull(this.getUserInfo('chnl'))) return '0'

      // 25.03.18) 로컬스토리지 사용 V4 통합
      // const localKey = 'nhInteRgn' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'V4'
      const localKey = 'usrInfoSet' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'V4'

      let usrSetObj = commonService.getStorage(localKey)
      const inteRgnObj = usrSetObj?.nhInteRgn
      let rtnStrObj = ''

      if(JSON.stringify(inteRgnObj) == '{}' || inteRgnObj == null || typeof inteRgnObj == 'undefined') {
        return '0'
      } else {
        rtnStrObj = inteRgnObj.find(d => d.rgnDsc == rgnDsc)
      }

      return !!rtnStrObj ? rtnStrObj.useYn : '0'
    },

    /**
     * 자산 탭 순서 변경 설정
     * @param {Array} tabs: 탭 설정값
     */
    setAsetMain(tabs) {
      if(this.isNull(this.getUserInfo('mydtCusno')) || this.isNull(this.getUserInfo('chnl'))) return

      const localKey = 'usrInfoSet' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'V4'

      let usrSetObj = commonService.getStorage(localKey)
      let asetTabs = usrSetObj?.asetMain

      if(JSON.stringify(usrSetObj) == '{}' || usrSetObj == null || typeof usrSetObj == 'undefined') {
        commonService.setStorage(localKey, {asetMain: tabs})
      } else {
        asetTabs = tabs
        usrSetObj.asetMain = asetTabs

        commonService.setStorage(localKey, usrSetObj)
      }
    },
    /**
     * 자산 탭 순서 변경 조회
     * @return {Array} tabs: 탭 설정값
     */
    getAsetMain() {
      if(this.isNull(this.getUserInfo('mydtCusno')) || this.isNull(this.getUserInfo('chnl'))) return []

      const localKey = 'usrInfoSet' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'V4'

      return commonService.getStorage(localKey)?.asetMain || []
    },

    /**
     * 메인 캐릭터 설정
     * @param {String} avatarId
     */
    setMyAvatar(avatarId) {
      if(this.isNull(this.getUserInfo('mydtCusno')) || this.isNull(this.getUserInfo('chnl'))) return

      const localKey = 'usrInfoSet' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'V4'
      let usrSetObj = commonService.getStorage(localKey)

      if(JSON.stringify(usrSetObj) == '{}' || usrSetObj == null || typeof usrSetObj == 'undefined') {
        commonService.setStorage(localKey, {myAvatarId: avatarId})
      } else {
        usrSetObj.myAvatarId = avatarId

        commonService.setStorage(localKey, usrSetObj)
      }
    },
    /**
     * 메인 캐릭터 조회
     * @return {String} avatarId
     */
    getMyAvatar() {
      if(this.isNull(this.getUserInfo('mydtCusno')) || this.isNull(this.getUserInfo('chnl'))) return

      const localKey = 'usrInfoSet' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'V4'

      return commonService.getStorage(localKey)?.myAvatarId || ""
    },

    /**
     * 메인 화면노출 순서 변경 설정
     * @param {Array} tabs: 탭 설정값
     */
    setMainTabs(tabs) {
      if(this.isNull(this.getUserInfo('mydtCusno')) || this.isNull(this.getUserInfo('chnl'))) return

      const localKey = 'usrInfoSet' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'V4'

      let usrSetObj = commonService.getStorage(localKey)
      let asetTabs = usrSetObj?.mainTab

      if(JSON.stringify(usrSetObj) == '{}' || usrSetObj == null || typeof usrSetObj == 'undefined') {
        commonService.setStorage(localKey, {mainTab: tabs})
      } else {
        asetTabs = tabs
        usrSetObj.mainTab = asetTabs

        commonService.setStorage(localKey, usrSetObj)
      }
    },
    /**
     * 메인 화면노출 순서 변경 조회
     * @return {Array} tabs: 탭 설정값
     */
    getMainTabs() {
      if(this.isNull(this.getUserInfo('mydtCusno')) || this.isNull(this.getUserInfo('chnl'))) return []

      const localKey = 'usrInfoSet' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'V4'

      return commonService.getStorage(localKey)?.mainTab || []
    },

    /**
     * 주요자산 변동내역 노출 목록 저장
     * @param {Array} wrsArr: 저장할 변동내역목록
     */
    setMyAssetWrs(wrsArr) {
      if(this.isNull(this.getUserInfo('mydtCusno')) || this.isNull(this.getUserInfo('chnl'))) return

      const localKey = 'usrInfoSet' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'V4'
      let usrSetObj = commonService.getStorage(localKey)
      let wrsArrObj = usrSetObj?.myAssetWrs

      if(JSON.stringify(usrSetObj) == '{}' || usrSetObj == null || typeof usrSetObj == 'undefined') {
        commonService.setStorage(localKey, {myAssetWrs: wrsArr})
      } else {
        wrsArrObj = wrsArr
        usrSetObj.myAssetWrs = wrsArrObj

        commonService.setStorage(localKey, usrSetObj)
      }
    },
    /**
     * 메인 화면노출 순서 변경 조회
     * @return {Array} wrsArr: 노출할 변동내역목록
     */
    getMyAssetWrs() {
      if(this.isNull(this.getUserInfo('mydtCusno')) || this.isNull(this.getUserInfo('chnl'))) return []

      const localKey = 'usrInfoSet' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'V4'

      return commonService.getStorage(localKey)?.myAssetWrs || []
    },

    /**
     * 플로팅배너 노출여부 설정
     * @param {String} dateDsc: 미노출기간구분(D:하루, W:일주일)
     * @param {String} bnnrDsc: 배너 분류구분
     */
    setNoSeeFloat(dateDsc='D', bnnrDsc="") {
      if(this.isNull(this.getUserInfo('mydtCusno')) || this.isNull(this.getUserInfo('chnl'))) return

      const today = dateFormat(new Date(), 'YYYYMMDD')
      
      // 호출한 화면이 팝업인지 확인 후 ID 설정
      let scrId = ''
      const currentPage = store.getters['layout/pageInfo']
      // const modalInfo = store.getters['modal/modalList']
			// const modalLength = modalInfo.length

      // scrId = modalLength > 0 ? modalInfo[modalLength-1].component.name : currentPage.name
      scrId = currentPage.name

      const localKey = 'usrInfoSet' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'V4'
      let usrSetObj = commonService.getStorage(localKey)
      let noSeeObj = usrSetObj?.noSeeFloat
      let tmpObj = {}

      //////////////////////////////////////////////////////////////////////////////////////
      // usrInfoSet로 설정된 로컬스토리지 key 또는 usrInfoSet 내 noSeeFloat value 가 없을경우
      //////////////////////////////////////////////////////////////////////////////////////
      if(JSON.stringify(noSeeObj) == '{}' || noSeeObj == null || typeof noSeeObj == 'undefined') {
        // 설정된 키 오브젝트 없을 경우
        tmpObj = {
          scrId: scrId,
          dateDsc: dateDsc,
          bnnrDsc: bnnrDsc,
          date: today
        }

        if(JSON.stringify(usrSetObj) == '{}' || usrSetObj == null || typeof usrSetObj == 'undefined') {
          commonService.setStorage(localKey, {noSeeFloat: [tmpObj]})
        } else {
          usrSetObj.noSeeFloat = [tmpObj]

          commonService.setStorage(localKey, usrSetObj)
        }
        return
      }

      ////////////////////////////////////////////////////////
      // noSeeFloat 내 value 신규 추가 또는 기존 값 업데이트
      ////////////////////////////////////////////////////////
      let targetObj = noSeeObj.find(d => d.scrId == scrId && (this.isNull(bnnrDsc) ? true : d.bnnrDsc == bnnrDsc))
      if(typeof targetObj != 'undefined' && targetObj != null) {
        // 현재 화면 명칭 및 구분으로 등록된 오브젝트가 존재할 경우 일자 업데이트
        targetObj.date = today
        targetObj.dateDsc = dateDsc

        commonService.setStorage(localKey, usrSetObj)
      } else {
        tmpObj = {
          scrId: scrId,
          dateDsc: dateDsc,
          bnnrDsc: bnnrDsc,
          date: today
        }
        noSeeObj.push(tmpObj)
        commonService.setStorage(localKey, usrSetObj)
      }
    },
    /**
     * 플로팅배너 노출여부 조회 (true: 미노출, false: 노출)
     * @return {boolean}
     */
    getNoSeeFloat(bnnrDsc="") {
      if(this.isNull(this.getUserInfo('mydtCusno')) || this.isNull(this.getUserInfo('chnl'))) return

      // 호출한 화면이 팝업인지 확인 후 ID 설정
      let scrId = ''
      const currentPage = store.getters['layout/pageInfo']
      const modalInfo = store.getters['modal/modalList']
			const modalLength = modalInfo.length

      scrId = modalLength > 0 ? modalInfo[modalLength-1].component.name : currentPage.name

      const localKey = 'usrInfoSet' + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + 'V4'
      let usrSetObj = commonService.getStorage(localKey)
      let noSeeObj = usrSetObj?.noSeeFloat
      //////////////////////////////////////////////////////////////////////////////////////
      // usrInfoSet로 설정된 로컬스토리지 key 또는 usrInfoSet 내 noSeeFloat value 가 없을경우
      //////////////////////////////////////////////////////////////////////////////////////
      if(JSON.stringify(noSeeObj) == '{}' || noSeeObj == null || typeof noSeeObj == 'undefined') return false

      //////////////////////////////////
      // noSeeFloat 내 화면ID 해당값 탐색
      //////////////////////////////////
      let targetObj = noSeeObj.find(d => d.scrId == scrId && (this.isNull(bnnrDsc) ? true : d.bnnrDsc == bnnrDsc))
      if(targetObj == null || typeof targetObj == 'undefined') {
        return false
      }

      const today = dateFormat(new Date(), 'YYYYMMDD')
      // const today = '20250327'
      let compDate = dayDiff(today, targetObj.date)
      let rtn = false

      ///////////////////////////////////
      // 기간구분자별 기능 분기처리
      ///////////////////////////////////
      if(!this.isNull(targetObj.dateDsc)) {
        // D: 하루, W: 일주일
        if(targetObj.dateDsc == 'W' ? compDate > 7 : compDate > 0) {
          // 설정일자 이후일 경우 로컬스토리지 값 제거 이후 false 리턴
          noSeeObj = noSeeObj.filter(d => d.scrId != scrId || d.dateDsc != targetObj.dateDsc)
          usrSetObj.noSeeFloat = noSeeObj

          commonService.setStorage(localKey, usrSetObj)

          rtn = false
        } else {
          rtn = true
        }
      } else {
        rtn = false
      }

      return rtn
    },
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    //////////////////////////////////////////////
    //////////////////////////////////////////////
  },
  created() {
    //console.log('common mixin created')
  },
  mounted() {
    console.log('common mixin mounted')
    this.callJQueryFncExcute()
    this.scrollCheck()
  },
  updated() {
    console.log('common mixin updated')
    this.callJQueryWebAccessibility()
  },
  destroyed() {
    // destroy subscribe
    this.subscribeList && this.subscribeList.forEach(d => d())
  },
}
export default commonMixin