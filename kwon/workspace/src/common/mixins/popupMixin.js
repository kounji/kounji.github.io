/**
 * 팝업개발 Mixin script
 */
import modalService from '@/service/modalService'
import _ from 'lodash'

const commonMixin = {
  props: {
  },
  computed: {
    modalConfig() {
      return this.$store.state.modal.modalConfig || {}
    },
    params() {
      return this.modalConfig.params
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
  data: function() {
    return {
      focusElement: null, // 부모창에서 팝업 생성시 발생한 event
      subscribeList: [], // subscribe 되는 객체 리스트, destroy에 사용
    }
  },
  methods: {
    close(data) {
      const resolve = this.modalConfig.resolve
      if (resolve && data) {
        resolve(data)
      }
      this.$store.dispatch('modal/closeModal')
    },

    closeAll(data) {
      this.closeAllData(data)
    },

    closeAllData(data, flag = false) {
      let modalInfo = this.$store.state.modal.modalList
      let modalLength = this.$store.state.modal.modalList.length
      console.log("closeAllData", flag)
      // let isTobePage = this.$store.state.layout.isTobePage

      // if(!isTobePage) {
      //   // 연말정산탭 관련 closeAllData
      //   for(let i=0; i<modalLength; i++) {
      //     if(modalInfo[i].component.name !== '' && modalInfo[i].component.name !== null && modalInfo[i].component.name !== undefined) {
      //       if(modalInfo[i].component.name.indexOf("PDYT") !== -1) {
      //         this.closeAllDataForPDYT(data, modalInfo, flag)
      //         return
      //       }
      //     }
      //   }
      // }

      if(_.findIndex(modalInfo, d => d.component.name === "CORE2206") > -1 || _.findIndex(modalInfo, d => d.component.name === "CORE2201") > -1 ) {
        // 부동산 등록 프로세스 도중 대출계좌 연결 진행 시 closeAllData
        let isCORE2206  = false
        let isCORE2201 = false

        // 아파트 선택 대응
        if(modalInfo[modalLength-1].component.name !== '' && modalInfo[modalLength-1].component.name !== null && modalInfo[modalLength-1].component.name !== undefined) {
          isCORE2206  = 
            (_.findIndex(modalInfo, d => d.component.name === "CORE2206") > -1 && modalInfo[modalLength-1].component.name !== "CORE2206") ? true : false
        }

        // 직접입력 대응
        if(modalInfo[modalLength-1].component.name !== '' && modalInfo[modalLength-1].component.name !== null && modalInfo[modalLength-1].component.name !== undefined) {
          if(!isCORE2206) {
            /**
             * 아파트 선택(CORE2206)이 아닌 직접입력(CORE2201)일 경우
             *  - 마지막으로 띄운 팝업이 직접입력이 아님
             *  - 연결 프로세스 관련 팝업이 띄워진 상태
             */
            isCORE2201  =
              (_.findIndex(modalInfo, d => d.component.name === "CORE2201") > -1 
              && modalInfo[modalLength-1].component.name !== "CORE2201") 
              && (_.findIndex(modalInfo, d => d.component.name === "COAR1002") > -1 || _.findIndex(modalInfo, d => d.component.name === "COAR1010") > -1) ? true : false
          }
        }

        let isComplRest = false
        if(modalInfo[modalLength-1].component.name !== '' && modalInfo[modalLength-1].component.name !== null && modalInfo[modalLength-1].component.name !== undefined) {
          // 자산 등록 완료 팝업 오픈상태 시 
          isComplRest = _.findIndex(modalInfo, d => d.component.name === "COCO2201") > -1 ? true : false 
        }

        if((!isCORE2206 && !isCORE2201) || isComplRest) {
          // 일반 case (부동산 등록 도중 연결프로세스 오픈 상태가 아니거나 자산 등록 완료 팝업 오픈상태일 시)
          for (let i=0 ;i<modalLength-1; i++)
          {
            this.$store.dispatch('modal/closeModal')
          }
          this.close(data)
        } else {
          // 부동산 등록 프로세스 도중 연결 프로세스 진행 시 case
          this.closeAllLeftMain(data)
        }
      } else {
        // 원본

        for (let i=0 ;i<modalLength-1; i++)
        {
          this.$store.dispatch('modal/closeModal')
        }
        this.close(data)
      }


    },

    // 연말정산탭 관련 closeAllData
    closeAllDataForPDYT(data, modalInfo, flag = false) {
      let modalLength = modalInfo.length
      // isPDYT0003, isPDYT0005 : 연말정산 관련 팝업에서 타 팝업 오픈 시 close문제 대응하기위한 flag
      let isPDYT0003 = false  // 연말정산 메인 팝업 -> 타 팝업(자산등록) 오픈
      let isPDYT0005 = false  // 연말정산 상세(청약) 팝업 -> 타 팝업(금융목표) 오픈

      for(let i=0; i<modalLength; i++) {
        if(modalInfo[i].component.name === "PDYT1103") {
          isPDYT0003 = true
        } 
        if(modalInfo[i].component.name === "PDYT1105") {
          isPDYT0005 = true
        }
      }

      if(isPDYT0003 && !isPDYT0005) {       // 연말정산 메인 팝업 오픈 , 청약 상세 팝업 미오픈 상태일시
        this.closeAllLeftMain(data, flag)
      } else if(isPDYT0003 && isPDYT0005) { // 연말정산 메인 팝업 오픈 , 청약 상세 팝업 오픈 상태일시
        this.closeAllLeftN(data, 2)
      }
    },

    closeAllLeftMain(data, flag = false) {
      let modalInfo = this.$store.state.modal.modalList
      let modalLength = this.$store.state.modal.modalList.length
      console.log("closeAllLeftMain", flag)
      // let isTobePage = this.$store.state.layout.isTobePage

      // if(!isTobePage) {
      //   // 연말정산탭 관련 closeAllLeftMain
      //   for(let i=0; i<modalLength; i++) {
      //     if(modalInfo[i].component.name !== '' && modalInfo[i].component.name !== null && modalInfo[i].component.name !== undefined) {
      //       if(modalInfo[i].component.name.indexOf("PDYT") !== -1) {
      //         this.closeAllLeftMainForPDYT(data, modalInfo, flag)
      //         return
      //       }
      //     }
      //   }
      // }

      if(_.findIndex(modalInfo, d => d.component.name === "CORE2206") > -1 || _.findIndex(modalInfo, d => d.component.name === "CORE2201") > -1) {
        // 부동산 등록 프로세스 도중 대출계좌 연결 진행 시 closeAllLeftMain
        let isCORE2206  = _.findIndex(modalInfo, d => d.component.name === "CORE2206") > -1 ? true : false
        let isCORE2201  = _.findIndex(modalInfo, d => d.component.name === "CORE2201") > -1 ? true : false

        let isComplRest = _.findIndex(modalInfo, d => d.component.name === "COCO2201") > -1 ? true : false // 자산 등록 완료 팝업 오픈상태 시 

        if((!isCORE2206 && !isCORE2201) || isComplRest) {
          // 일반 case
          while (modalLength--){
            if(modalLength == 0) break
            const resolve = this.modalConfig.resolve
            if (resolve && data) {
              resolve(data)
            }
            this.$store.dispatch('modal/closeModal')
          }
        } else {
          // 부동산 등록 프로세스 도중 대출계좌 연결 진행 시 closeAllLeftMain
          while (modalLength--) {
            if(isCORE2206) {
              if(modalInfo[modalLength].component.name === "CORE2206") break
            }
            if(isCORE2201) {
              if(modalInfo[modalLength].component.name === "CORE2201") break
            }

            if(modalLength == 0) break
            const resolve = this.modalConfig.resolve
            if (resolve && data) {
              resolve(data)
            }
            this.$store.dispatch('modal/closeModal')
          }
        }
      } else {
        // 원본

        while (modalLength--){
          if(modalLength == 0) break
          const resolve = this.modalConfig.resolve
          if (resolve && data) {
            resolve(data)
          }
          this.$store.dispatch('modal/closeModal')
        }
      }
     },    

     // 연말정산탭 관련 closeAllLeftMain
     closeAllLeftMainForPDYT(data, modalInfo, flag = false) {
      let modalLength = modalInfo.length
      // isPDYTMain : 연말정산 메인 팝업에서 타 팝업 오픈시 close문제 대응하기위한 flag
      // isPDYTDtl : 연말정산 상세 팝업에서 타 팝업 오픈시 close문제 대응하기위한 flag
      let isPDYTMain        = false  // 연말정산 메인 팝업 -> 자산등록팝업 오픈
      let isPDYTDtl         = false  // 연말정산 상세 팝업 -> 자산등록팝업 오픈
      let isContainCOCO0009 = false // 자산등록 완료 팝업 포함 여부

      for(let i=0; i<modalLength; i++) {
        // 연말정산 메인 팝업에서 자산등록 호출 여부 확인
        if(modalInfo[i].component.name === "PDYT1103") {
          isPDYTMain = true
        }
        // 연말정산 상세 팝업 포함 여부 확인
        if(modalInfo[i].component.name === "PDYT1104" || modalInfo[i].component.name === "PDYT1106" || modalInfo[i].component.name === "PDYT1108") {
          isPDYTDtl = true
        }
        // 자산등록 완료 팝업 포함 여부 확인
        if(modalInfo[i].component.name === "COCO2201") {
          isContainCOCO0009 = true
        }
      }

      if(isPDYTMain) {
        if(isPDYTDtl && isContainCOCO0009) {

          // 연말정산 상세 팝업 오픈, 자산등록 완료 팝업 오픈 상태일시
          // flag : 자산등록완료 내에서 자산추가등록 버튼(false), 자산등록완료 버튼(true) 분기처리
          if(flag === true) this.closeAllLeftN(data, 2)
          else this.closeAllLeftN(data, 3)

        } else if(isPDYTDtl && !isContainCOCO0009) {

          // 연말정산 상세 팝업 오픈, 자산등록 완료 팝업 미오픈 상태일시 (자산등록 팝업에서 close버튼)
          this.closeAllLeftN(data, 2)

        } else if(!isPDYTDtl && isContainCOCO0009) {

          // 연말정산 상세 팝업 미오픈, 자산등록 완료 팝업 오픈 상태일시 (연말정산 메인에서 자산등록할 때)
          // flag : 자산등록완료 내에서 자산추가등록 버튼(false), 자산등록완료 버튼(true) 분기처리
          if(flag === true) this.closeAllLeftN(data, 1)
          else this.closeAllLeftN(data, 2)

        } else {

          // 연말정산 상세 팝업 미오픈, 자산등록 완료 팝업 미오픈 상태일시 (연말정산 메인 > 자산등록 팝업에서 close버튼)
          this.closeAllLeftN(data, 1)

        }
      }
     },

     closeAllLeftN(data, cnt) {
      let modalLength = this.$store.state.modal.modalList.length
      
      if(data === undefined) data = true

      if(cnt < 1 || cnt >= modalLength) return false

      while (modalLength--){
        if(modalLength == cnt-1) break
        const resolve = this.modalConfig.resolve
        if (resolve && data) {
          resolve(data)
        }
        this.$store.dispatch('modal/closeModal')
      }
     },    

    modalService() {
      return modalService
    },

    alert(...arg) {
      return modalService.alert(...arg)
    },

    confirm(...arg) {
      return modalService.confirm(...arg)
    },

    openModal(config) {
      return modalService.openModal(config)
    },

    openSelect(config) {
      return modalService.openSelect(config)
    },

    getCodeList(key) {
      const map = this.$store.state.config.code || {}
      return map.get(key) || []
    },

    /**
     * 고객 정보
     * @param {String} key : 값이 없으면 고객정보 object 리턴 있으면 그 값만 리턴
     * @return {Object | String}
     */
    getUserInfo(key) {
      const userInfo = this.$store.state.user.userInfo || {}
      return key ? userInfo[key] : userInfo
    },

    /**
     * 자산관리 고객번호
     * @return {String}
     */
    getAsetAmnCusno() {
      return this.getUserInfo('asetAmnCusno')
    },
  },
  mounted() {
    //////////////////////////////////////////////////////////////////////////
    // parent 스크롤 방지 style overflow hidden 처리
    //////////////////////////////////////////////////////////////////////////
    const modalLength = this.$store.state.modal.modalList.length
    if(modalLength == 1)
    {
      //슬라이드 팝업이 처음일 경우
      if(this.isMainPage)
      {
        //parent is Main
        const mainElement = document.getElementById('main_section')
        if(mainElement !== null) mainElement.style.overflow = "hidden"

      }else{
        //parent is not Main
        const mainElement = document.getElementById('content')
        if(mainElement !== null) mainElement.style.overflow = "hidden"

        //카테고리 및 서브카테고리 처리
        const categoryMenuElement = document.getElementById('category_menu')
        const categorySubMenuElement = document.getElementById('category_sub_menu')

        if(categoryMenuElement !== null) categoryMenuElement.style.overflow = "hidden"
        if(categorySubMenuElement !== null) categorySubMenuElement.style.overflow = "hidden"

      }

    }else if(modalLength > 1)
    {
      //팝업이 처음일 경우
      const modalElement = document.getElementById('modal_' + (modalLength -1) )
      const modalContentElement  = modalElement.querySelectorAll('.popup_content')
      if(modalContentElement.length > 0)
      {
        modalContentElement[0].style.overflow = "hidden"
      }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
   
    // 모달페이지의 최상단 포커스 처리
    if(document.getElementById('modal_' + this.$store.state.modal.modalList.length + '_i') !== null)
    {
      document.getElementById('modal_' + this.$store.state.modal.modalList.length + '_i').scrollIntoView()
    }else{
      //  // 닫기 버튼 포커스
      if(this.$el.querySelector('.btn_close') !== null)
      {
        this.$el.querySelector('.btn_close').focus()  
      }
    }
   

    //  // 닫기 버튼 포커스
    //this.$el.querySelector('.btn_close').focus()
    
    // // // focusElement 설정
    this.focusElement = this.$store.state.modal.modalConfig.target
  },
  created(){
        // 로그인 세션 연장
        // this.$store.dispatch('config/extendSession')
  },
  beforeDestroy() {
    // console.log(this.$store.state.modal.modalConfig)
  },
  destroyed() {
    //////////////////////////////////////////////////////////////////////////
    // parent 스크롤 방지 style overflow hidden 원복
    //////////////////////////////////////////////////////////////////////////
    const modalLength = this.$store.state.modal.modalList.length
    if(modalLength == 0)
    {
      //슬라이드 팝업이 처음일 경우
      if(this.isMainPage)
      {
        //parent is Main
        const mainElement = document.getElementById('main_section')
        if(mainElement !== null) mainElement.style.overflow = ""

      }else{
        //parent is not Main
        const mainElement = document.getElementById('content')
        if(mainElement !== null) mainElement.style.overflow = ""

        //카테고리 및 서브카테고리 처리
        const categoryMenuElement = document.getElementById('category_menu')
        const categorySubMenuElement = document.getElementById('category_sub_menu')

        if(categoryMenuElement !== null) categoryMenuElement.style.overflow = ""
        if(categorySubMenuElement !== null) categorySubMenuElement.style.overflow = ""
      }
    }else if(modalLength > 0)
    {
      //팝업이 처음일 경우
      const modalElement = document.getElementById('modal_' + modalLength )
      const modalContentElement  = modalElement.querySelectorAll('.popup_content')

      if(modalContentElement.length > 0)
      {
        modalContentElement[0].style.overflow = ""
      }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////


    // destroy subscribe
    this.subscribeList.forEach(d => d())
    // 부모창에 팝업 오픈한 element에 포커스
    this.focusElement && (this.focusElement.focus != undefined ? this.focusElement.focus() : '')
    
    // setTimeout(() => {
      // this.focusElement && this.focusElement.focus()
    // }, 1000)


    // $('#view-wrap').attr('aria-hidden','false')
    // $('.cmm-layer-wrap').attr('aria-hidden','true')
    // $('.btn-close').blur();
    // setTimeout(() => {
    //   // this.focusElement && this.focusElement.focus()
    //   $('#view-wrap').find('.ddd').focus().css('background','#ddd')
    // }, 1000)
  },
}
export default commonMixin