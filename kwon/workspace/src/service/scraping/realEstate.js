/**
 * 스크래핑 (부동산)
 */
import scrapingService from '@/service/scrapingService.js'

export default {

  /***********************************************************
   *
   * 비지니스 로직
   * 
   ***********************************************************/

  // 부동산주소목록조회
  getAddressList(searchName) {
    return new Promise((resolve, reject) => {
      const params = {
        module: 'kbstar_land',
        searchName: searchName
      }
      const jobs = [
        this.getAddressListJob(params), // 부동산주소목록조회
      ]
      return scrapingService.executeAll(jobs).then(
        response => {
          const result = this.parseOutputData(response, '부동산주소목록')
          resolve(result)
          console.log('부동산주소목록조회 res', result)
        },
        error => {
          console.log('부동산주소목록조회 error', error)
          reject(error)
        }
      )
    })
  },

  // 부동산시세조회
  getQuotesList(id) {
    return new Promise((resolve, reject) => {
      const params = {
        module: 'kbstar_land',
        id: id // 단지식별자
      }
      const jobs = [
        this.getQuotesJob(params), // 부동산시세조회
      ]
      return scrapingService.executeAll(jobs).then(
        response => {
          const result = response[0] || {}
          resolve(result.realEstate || [])
          console.log('부동산시세조회 res', result)
        },
        error => {
          console.log('부동산시세조회 error', error)
          reject(error)
        }
      )
    })
  },

  // 스크래핑 결과 parsing
  parseOutputData(response=[], jobName) {
    const res = response[0] || {}
    const job = res.job || {}
    const output = job.Output
    const result = output.Result || {}
    return result[jobName]
  },

  /***********************************************************
   *
   * api
   * 
   ***********************************************************/

  // 부동산주소목록조회
  getAddressListJob(params={}) {
    const data = {
      "Module": params.module,
      "Class": "공공정보조회",
      "Job": "부동산주소목록조회",
      "Input": {
        "조회구분": "3", // "1": 시도/구군 조회 "2": 읍면동, 단지식별자 추가조회 "3" : 검색어 조회
        "검색구분": "", // 아파트, 오피스텔 조회
        "시도": "",
        "구군": "",
        "검색어": params.searchName
      }
    }
    return data
  },

  // 부동산시세조회
  getQuotesJob(params={}) {
    const data = {
      "Module": params.module,
      "Class": "공공정보조회",
      "Job": "부동산시세조회",
      "Input": {
        "검색구분": "11", // 아파트, 오피스텔
        "읍면동코드": "",
        "단지식별자": params.id,
        "시세종류": ""
      }
    }
    return data
  },
}