/**
 * 로그인한 사용자의 세션 세팅 및 정보를 얻기위한 스크립트.
 */
import configService from '@/service/configService'
// import routerService from '@/service/routerService'
import commonService from '@/service/commonService'
import store from '@/store'
import {makeErrorMessage} from '@/utils/data' 
import {isTolda} from '@/utils/date' 

export default {
  
  /**
   * 화면 최초 진입시 자산 관리 사용자 정보 조회
   * 20210827 사용자 정보 체크시 InterFace 로직 수정
   */
  initUserInfo() {
    return new Promise((resolve, reject) => {
      // 파라미터 셋팅 (스뱅에서 받은 queryString)
      // const params = {
      //   isOutAcc // 상호 계좌 유무
      //   uid // uid
      //   cus // 고객번호
      //   cnm // 고객명
      //   chnl // 유입채널  => 스뱅 : 385, 콕뱅 : 386
      //   screen / 로그인 후 이동할 메뉴
      //   lginInfVal // 스뱅/콕뱅 로그인방식
      //   lginDtm  // 스뱅/콕뱅 로그인일시
      // }
      const params = this.parseQueryString()  // url 에 넘어온 정보
      const session = this.getLoginSession() // session에 담겨있는 정보
      const userInfo = Object.assign(session, params)

      //유입채널구분 (스뱅은 "001", 콕뱅 "002") --> 가입처리시 필요
      //20210831 채널정보 헤더 처리를 위한 서비스 요청
      userInfo.chnlGbn  = (userInfo.chnl === "385") ? "001" : "002"
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo))

      // 고객번호 체크
      if (userInfo.cus === undefined || userInfo.cus === '') {
        reject(makeErrorMessage('USERINFO', '고객번호를 확인하세요.'))
      }

      // ==========================================================================================
      // =========================== (TOBE) getMydataUserInfoTobe START ===========================
      // ==========================================================================================
      
      configService.getMydataUserInfoTobe(userInfo.cus, userInfo.chnlGbn)
      .then(res => {
            console.log('getMydataUserInfoTobe Response ------------------------------------>> ' , res)
            // 청소년 테스트
            // res.birth = '20100202'
            if( Object.keys(res).length > 0 && res.mydtCusno !== undefined && res.mydtCusno !== ""){
                userInfo.mydtCusno      = res.mydtCusno     // 마이데이타고객번호 
                userInfo.mydtCusStsc    = res.mydtCusStsc   // 마이데이타고객상태코드/
                userInfo.cusnm          = res.name          // 성명
                userInfo.fsrgDtm        = res.fsrgDtm       // 최초등록일시
                userInfo.firEntDt       = res.firEntDt      // 최초가입일자
                userInfo.crmCusno       = res.crmCusno      // CRM 고객번호
                userInfo.svcClientId    = res.svcClientId

                // 임시 우회
                // userInfo.mydtCusno = '200 0003756'
                // userInfo.cusnm = '남병천'
                // userInfo.mydtCsuStsc = '1'

                // 마데가입 조회시 미성년자(14세 미만)일때 강제 exception 발생. add 2021.12.03
                if(res.rsp_code === "30102") {
                    throw("IS_CHILD")
                } 

                //////////////////////////////////////////////////////
                // cusTpc : 고객구분코드
                // 1 : 신규고객
                // 2 : 기존고객, 약관동의필요 고객 (=> 약관을 재동의 받아야하는 고객)===>(사용안함. 2021.10.22)
                // 3 : 기존고객, 일부약관동의필요 고객 (=> 재동의 하였으나 추가약관 동의 필요 고객)
                // 4 : 기존고객, 약관동의완료 고객. (정상)
                //////////////////////////////////////////////////////
                // 청소년모드 진입 테스트
                //res.birth = '20110101'

                userInfo.cusTpc       = res.cusTpc  //고객구분코드
                userInfo.macoYn       = res.macoYn  //조합원여부 "0":일반, "1":조합원
                userInfo.usrBirth     = res.birth   //생년월일
                userInfo.sexDsc       = res.sexDsc    //성별 "0":여자, "1":남자
                userInfo.macoAuthYn   = res.macoAuthYn  //조합원권한여부 "0":없음, "1":있음(별도TABLE에 관리자등록)
                userInfo.mydtSvcEntDtm  = res.mydtSvcEntDtm // 마이데이터서비스가입일시

                //API KEY 추가
                userInfo.apiKey       = res.pwizeKeyVal // apiKey
                
                userInfo.tolda        = isTolda(res.birth) || false // 청소년(만14~만18세 여부)
                if(userInfo.tolda) {
                  // 청소년 모드 기본 설정
                  const localKey = 'scrmode' + userInfo.chnl + userInfo.mydtCusno + 'V4'
      
                  commonService.setStorage(localKey, {mode: 'C'})
                }
            } else {

                console.log('강제 ERROR 발생! -> COCO1125페이지로 이동')
                //강제 ERROR 발생
                if (['30001', '30002', '30003'].includes(res.rsp_code)){
                    throw(res)
                }else{
                    throw('')
                }
                
            }
        },error =>{
            console.error("getMydataUserInfoTobe Error", error)
            reject(error)
        }
    ).then(()=>{
        configService.getTestMyDtNo().then( rst => {
            console.log('테스트고객 확인 ',rst)
            if(rst.mydtCusNoList){
                for(let i=0; i<rst.mydtCusNoList.length; i++){
                if(userInfo.mydtCusno === rst.mydtCusNoList[i]){
                    userInfo.tobeType = true
                    break
                }else{
                    userInfo.tobeType = false
                }
                }
            }
        }).then(() => {
            // 농축협계좌보유여부 조회
            configService.getNHAccountInfo(userInfo.mydtCusno).then(
                res => {
                    userInfo.totAchldYn = res.totAchldYn || 0 //총 계좌보유수
                    // session storage에 사용자 정보 저장
                    this.setLoginSession(userInfo)
                    resolve(userInfo)
                }, error => {
                    console.error("getNHAccountInfo Error", error)
                    reject(error)
                }
            )
        })

        }).catch(error => {
            console.log('userService getMydataUserInfoTobe catch!!!!!')
            reject(error)
        })
      // ==========================================================================================
      // ============================ (TOBE) getMydataUserInfoTobe END ============================
      // ==========================================================================================


      /*
      // ==========================================================================================
      // ============================= (ASIS) getMydataUserInfo START =============================
      // ==========================================================================================
      configService.getMydataUserInfo(userInfo.cus, userInfo.chnlGbn)
      .then(res=>{
            if( Object.keys(res).length > 0 && res.mydtCusno !== undefined && res.mydtCusno !== ""){ 
              userInfo.mydtCusno      = res.mydtCusno     // 마이데이타고객번호 
              userInfo.mydtCusStsc    = res.mydtCusStsc   // 마이데이타고객상태코드
              userInfo.cusnm          = res.name          // 성명
              userInfo.birth          = res.birth         // 생년월일
              userInfo.fsrgDtm        = res.fsrgDtm       // 최초등록일시
              userInfo.firEntDt       = res.firEntDt      // 최초가입일자
              userInfo.crmCusno       = res.crmCusno      // CRM 고객번호
              userInfo.svcClientId    = res.svcClientId

              // 임시 우회
              // userInfo.mydtCusno = '2000003756'
              // userInfo.cusnm = '남병천'
              // userInfo.mydtCsuStsc = '1'

              // 마데가입 조회시 미성년자일때 강제 exception 발생. add 2021.12.03
              if(res.rsp_code === "30102") {
                throw("IS_CHILD")
              } else {
                resultCheck = true
              }

            } else {
              //강제 ERROR 발생
              throw('')
            }

          },error =>{
            console.error("getMydataUserInfo Error", error)
            resultCheck = false
            reject(error)
      }).then(()=>{
            console.log('getMydataUserInfo After')
            if (resultCheck)
            {
              configService.getAssetUserInfo(userInfo.mydtCusno, userInfo.chnlGbn, userInfo.lginInfVal, userInfo.lginDtm)
              .then(res => {
                    //////////////////////////////////////////////////////
                    // cusTpc : 고객구분코드
                    // 1 : 신규고객
                    // 2 : 기존고객, 약관동의필요 고객 (=> 약관을 재동의 받아야하는 고객)===>(사용안함. 2021.10.22)
                    // 3 : 기존고객, 일부약관동의필요 고객 (=> 재동의 하였으나 추가약관 동의 필요 고객)
                    // 4 : 기존고객, 약관동의완료 고객. (정상)
                    //////////////////////////////////////////////////////
                    userInfo.cusTpc       = res.cusTpc  //고객구분코드
                    userInfo.macoYn       = res.macoYn  //조합원여부 "0":일반, "1":조합원
                    userInfo.usrBirth     = res.birth   //생년월일
                    userInfo.sexDsc       = res.sexDsc    //성별 "0":여자, "1":남자
                    userInfo.macoAuthYn   = res.macoAuthYn  //조합원권한여부 "0":없음, "1":있음(별도TABLE에 관리자등록)
                    userInfo.mydtSvcEntDtm  = res.mydtSvcEntDtm // 마이데이터서비스가입일시

                    //API KEY 추가
                    userInfo.apiKey       = res.pwizeKeyVal // apiKey

                    resultCheck = true
                  }
                  ,error =>{
                    console.error("getAssetUserInfo Error", error)
                    resultCheck = false
                    reject(error)
                }).then(()=>{
                  configService.getTestMyDtNo().then( rst => {
                    console.log('테스트고객 확인 ',rst)
                    if(rst.mydtCusNoList){
                      for(let i=0; i<rst.mydtCusNoList.length; i++){
                        if(userInfo.mydtCusno === rst.mydtCusNoList[i]){
                          userInfo.tobeType = true
                          break
                        }else{
                          userInfo.tobeType = false
                        }
                      }
                    }
                  }).then(() => {
                    console.log('getAssetUserInfo After')
                    if (resultCheck)
                    {
                      // 농축협계좌보유여부 조회
                      configService.getNHAccountInfo(userInfo.mydtCusno).then(
                        res => {
                          userInfo.totAchldYn = res.totAchldYn || 0 //총 계좌보유수
                          // session storage에 사용자 정보 저장
                          this.setLoginSession(userInfo)
                          resolve(userInfo)
                        }, error => {
                          console.error("getNHAccountInfo Error", error)
                          reject(error)
                        }
                      )
                    }
                  })

                })
            }
      }).catch(error => {
        console.log('userService getMydataUserInfo catch!!!!!')
        reject(error)
      })
      // ==========================================================================================
      // ============================== (ASIS) getMydataUserInfo END ==============================
      // ==========================================================================================
      */
    })
  }, 
  

  /**
   * 가입후 사용자 정보 재 조회 (COAS0002, COAS0005 에서 호출)
   */
  setUserInfo() {
    const userInfo = store.state.user.userInfo || {}

    return new Promise((resolve, reject) => {
      configService
      .getAssetUserInfo(userInfo.mydtCusno, userInfo.chnlGbn)
      .then(
        res => {
          //////////////////////////////////////////////////////
          // cusTpc : 고객구분코드
          // 1 : 신규고객
          // 2 : 기존고객, 약관동의필요 고객 (=> 약관을 재동의 받아야하는 고객)===>(사용안함. 2021.10.22)
          // 3 : 기존고객, 일부약관동의필요 고객 (=> 재동의 하였으나 추가약관 동의 필요 고객)
          // 4 : 기존고객, 약관동의완료 고객. (정상)
          //////////////////////////////////////////////////////
          userInfo.cusTpc       = res.cusTpc  //고객구분코드
          userInfo.macoYn       = res.macoYn  //조합원여부 "0" :일반, "1" : 조합원
          userInfo.usrBirth     = res.birth   //생년월일
          userInfo.sexDsc       = res.sexDsc    //성별 "0":여자, "1":남자
          userInfo.macoAuthYn   = res.macoAuthYn  //조합원권한여부 "0" : 없음, "1" : 있음(별도TABLE에 관리자등록)
          userInfo.mydtSvcEntDtm  = res.mydtSvcEntDtm // 마이데이터서비스가입일시

          //API KEY 추가
          userInfo.apiKey  = res.pwizeKeyVal // apiKey
                                                  
          // session storage에 사용자 정보 저장
          this.setLoginSession(userInfo)
  
          resolve(userInfo)
        }, error => {
          reject(error) // TODO: 에러 났을때 처리 필요
        }
      )
    })
  },

  /**
   * 화면 최초 진입시 자산 관리 사용자 정보 조회
   */


  // url queryString [{kye, value}] 로 변환
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

  /**
   * 로그인 할지 말지 체크 (테스트 기간에만 임시로 사용)
   */
  checkLogin() {
    const sessionInfo = this.getLoginSession() // 테스트 기간에 임시 사용
    const userInfo = store.state.user.userInfo || {}
    const isLogin = !userInfo.cus && !sessionInfo.cus // 스뱅 아이디가 없으면 로그인
    return isLogin
  },

  /**
   * 임시로 사용 (테스트 기간에만 임시로 사용)
   */
  setLoginSession(value) {
    // const hasSession = this.getLoginSession().mydtCusno
    // if (hasSession) { // 최초 로그인이 아닌경우 screen 값 null로 바꿔준다.
    //   value.screen = null
    // }
    sessionStorage.setItem('userInfo', JSON.stringify(value))
  },

  /**
   * 임시로 사용 (테스트 기간에만 임시로 사용)
   */
  getLoginSession() {
    try {
			return JSON.parse(sessionStorage.getItem('userInfo')) || {}
		} catch (e) {
			console.error(e)
			return {}
		}
  },

  /**
   * cbt관리자 (임시로 사용)
   */
  getCbtUsers() {
    return [
            '1001029609'  //이원*
            ,'2000013013' //장지*
            ,'2007129446' //김영*
            ,'2008434107' //구본*
            ,'2011780153' //정승*
            ,'2011894213' //한성*
            ,'2016882709' //최준*
            ,'2024235798' //유태*
            ,'2025049978' //이승*
            ,'1000773625' //조혜*
            ,'2007129446' //김영*
          ]
    }
}
