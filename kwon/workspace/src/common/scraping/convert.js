const conversion = {
  convertKey : {
    수시전계좌조회 : {
      수시전계좌조회 : "demandAccountList",
      계좌번호 : "acno",
      예금명 : "acKdnm",
      신규일자 : "anwDt",
      통화코드 : "curc",
      잔액 : "acBac"
    },
    수시잔액조회 : {
      수시잔액조회 : "demandBalanceList",
      계좌번호 : "acno",
      예금명 : "acKdnm",
      통화코드 : "curc",
      잔액 : "acBac",
      출금가능금액 : "drwPsbAm"
    },
    예적금계좌조회 : {
      예적금계좌조회 : "depositAccountList",
      계좌번호 : "acno",
      예금종류 : "acKdnm",
      신규일자 : "anwDt",
      만기일자 : "dueDt",
      현재잔액 : "acBac",
      이자율 : "pmiIntrt",
      계좌번호확장 : "acScfCntn",
      약정액 : "pmiAm",
      월부금 : "dpzMmiam",
      최종거래일자 : "lsTrDt"
    },
    외화계좌조회 : {
      외화계좌조회 : "foreignAccountList",
      계좌번호 : "acno",
      예금종류 : "acKdnm",
      통화 : "curc",
      예금잔액 : "acBac",
      신규일자 : "anwDt",
      만기일자 : "dueDt"      
    },
    펀드계좌조회 : {
      펀드계좌조회 : "fundAccountList",
      계좌번호 : "acno",
      예금종류 : "acKdnm",
      신규일자 : "anwDt",
      만기일자 : "dueDt",
      수익률 : "fndPftrt",
      투자원금 : "ivPrn",
      평가금액 : "evlam",
      평가손익 : "evlPnl"
    },
    수시거래내역조회 : {
      isObject: true,
      objectKey: 'demandTransaction',
      계좌번호 : "acno",
      조회시작일 : "inqStDt",
      조회종료일 : "inqEdDt",
      내역정렬순서 : "inqSqC",
      거래내역조회 : {
        거래내역조회 : "demandTransactionDetailList",
        거래일자 : "trDt",
        거래시각 : "trTm",
        통화코드 : "curc",
        입금액 : "rvAm",
        출금액 : "drwAm",
        거래후잔액 : "trafBac",
        기재사항1 : "trCntn1",
        기재사항2 : "trCntn2",
        거래수단1 : "trDsnm1",
        거래수단2 : "trDsnm2",
        상대계좌번호 : "patnAcno",
        상대계좌예금주명 : "patnAcowrNm"
      },
      수시거래내역조회 : {
        수시거래내역조회 : "demandTransactionDetailList",
        거래일자 : "trDt",
        거래시각 : "trTm",
        통화코드 : "curc",
        입금액 : "rvAm",
        출금액 : "drwAm",
        거래후잔액 : "trafBac",
        기재사항1 : "trCntn1",
        기재사항2 : "trCntn2",
        거래수단1 : "trDsnm1",
        거래수단2 : "trDsnm2",
        상대계좌번호 : "patnAcno",
        상대계좌예금주명 : "patnAcowrNm"
      }
    },
    예적금거래내역조회 : {
      isObject: true,
      objectKey: 'depositTransaction',
      계좌번호 : "acno",
      조회시작일 : "inqStDt",
      조회종료일 : "inqEdDt",
      내역정렬순서 : "inqSqC",
      예적금거래내역조회 : {
        예적금거래내역조회 : "depositTransactionDetailList",
        거래일자 : "trDt",
        거래시각 : "trTm",
        거래회차 : "pymSc",
        거래월분 : "dpidpPymObjYmCntn",
        입금액 : "rvAm",
        출금액 : "drwAm",
        잔액 : "acBac",
        적요 : "snsCntn",
        취급점 : "brnm"
      }
    },
    외화거래내역조회 : {
      isObject: true,
      objectKey: 'foreignTransaction',
      계좌번호 : "acno",
      조회시작일 : "inqStDt",
      조회종료일 : "inqEdDt",
      통화 : "curc",
      내역정렬순서 : "inqSqC",
      외화거래내역조회 : {
        외화거래내역조회 : "foreignTransactionDetailList",
        거래일자 : "trDt",
        거래시간 : "trTm",
        통화 : "curc",
        입금액 : "rvAm",
        출금액 : "drwAm",
        잔액 : "acBac",
        적요 : "snsCntn",
        취급점 : "brnm",
        입금의뢰인명 : "rvClntnm",
        메모 : "memoCntn"
      }
    },
    카드목록조회 : {
      isObject: true,
      objectKey: 'cardHold',
      보유카드 : {
        보유카드 : "cardHoldDetailList",
        카드번호 : "mskCdNo",
        카드명 : "cdWrsnm",
        카드이미지 : "cdImgCntn",
        구분 : "bccdDsnm"
      },
      결제정보 : {
        결제정보 : "cardHoldSettlementList",
        결제일 : "stlDt",
        결제예정액 : "stlPlaAm",
        구분 : "bccdDsnm"
      }
    },
    결제예정금액 : {
      isObject: true,
      objectKey: 'cardSettlement',
      구분 : "bccdDsnm",
      내역정렬순서 : "inqSqC",
      합계 : "cdStlPlaTtAm",
      결제예정금액 : {
        결제예정금액 : "cardSettlementDetailList",
        구분 : "bccdDsnm",
        결제일 : "stlDt",
        이용일 : "cdUsDt",
        이용카드 : "cdWrsnm",
        이용가맹점 : "mchtHgnm",
        이용금액 : "cdUsAm",
        할인금액 : "rqsDcAm",
        청구금액 : "rqsAm",
        청구회차 : "rqsSc",
        잔여회차 : "rqsRmSc",
        청구원금 : "rqsOgnAm",
        수수료 : "mchtIstFee",
        연체료 : "rqsOvdAm",
        잔여원금 : "rqsAfBac",
        매출구분 : "cdSlDsnm",
        환율 : "apxcrt",
        할부개월 : "istPrdMtcn",
        취소금액 : "canAm"
      }
    },
    청구내역 : {
      isObject: true,
      objectKey: 'cardBilling',
      구분 : "bccdDsnm",
      결제일 : "rqsYm",
      월청구금액 : "tmmRqsAm",
      결제계좌은행 : "stlBnknm",
      결제계좌번호 : "stlAcno",
      내역정렬순서 : "inqSqC",
      청구내역조회 : {
        청구내역조회 : "cardBillingDetailList",
        카드번호 : "mskCdNo",
        이용대금 : "cdUsAm",
        이용일자 : "cdUsDt",
        청구금액 : "rqsAm",
        수수료 : "rqsFee",
        결제후잔액 : "cdRqsBac",
        결제일 : "stlDt",
        출금예정일 : "drwPlaDt",
        할부개월 : "istPrdMtcn",
        입금회차 : "istSc",
        가맹점명 : "mchtHgnm",
        가맹점사업자번호 : "mchtBzno",
        가맹점업종 : "mchtBzcnm",
        가맹점주소 : "mchtAdr",
        가맹점전화번호 : "mchtTelno",
        가맹점대표자명 : "mchtRepmnm",
        회원사 : "fncTupOrgnm",
        카드번호형식내용 : "cdNoFomCntn",
        청구내역포인트 : "rqsBrkPntCntn",
        명세서_이용기간_단기대출 : "scfwUsPrdShlnCntn",
        명세서_이용기간_일시불 : "scfwUsPrdOcepayCntn"
      }
    },
    승인내역 : {
      isObject: true,
      objectKey: 'cardApproval',
      구분 : "bccdDsnm",
      조회시작일 : "inqStDt",
      조회종료일 : "inqEdDt",
      승인금액합계 : "apvTtAm",
      국내승인금액합계 : "domeApvTtAm",
      해외승인금액합계 : "frApvTtAm",
      내역정렬순서 : "inqSqC",
      승인내역조회 : {
        승인내역조회 : "cardApprovalDetailList",
        카드번호 : "mskCdNo",
        승인번호 : "cdApvno",
        승인일자 : "cdApvDt",
        승인시간 : "cdApvTm",
        카드종류 : "cdWrsnm",
        매출종류 : "cdSlFormDsc",
        할부기간 : "istPrdMtcn",
        승인금액 : "cdApvAm",
        취소년월일 : "apvCanDt",
        결제예정일 : "stlPlaDt",
        통화코드 : "curc",
        국내외구분 : "dnfDsc",
        카드번호형식 : "cdNoFomCntn",
        부가세 : "addWthTxa",
        매입상태 : "slpByngStsCntn",
        가맹점명 : "mchtHgnm",
        가맹점사업자번호 : "mchtBzno",
        가맹점코드 : "asetAmnMchtNo",
        가맹점업종 : "mchtBzcnm",
        가맹점주소 : "mchtAdr",
        가맹점전화번호 : "mchtTelno",
        가맹점대표자명 : "mchtRepmnm"
      }
    },
    실적충족내역 : {
      실적충족내역 : "cardSatisfyList",
      기준년월 : "basYm",
      카드번호 : "mskCdNo",
      카드명 : "cdWrsnm",
      카드이미지URL : "cdImgUrlExpl",
      실적충족상세 : {
        arrayKey : "cardSatisfyDetailList",
        서비스명 : "cdRzsSvcCntn",
        실적시작일자 : "rzsStDt",
        실적종료일자 : "rzsEdDt",
        기준금액 : "cdSvcRkonBasAm",
        이용금액 : "cdSvcObjUsAm",
        부족금액 : "cdRzsLckAm",
        적용구간 : "cdRzsAplStnCntn",
        충족여부 : "cdRzsObtAchvYn"
      }
    },
    현금영수증사용내역조회 : {
      isObject: true,
      objectKey: 'cashReceipt',
      조회기간 : "inqDt",
      내역정렬순서 : "inqSqC",
      사용내역조회 : {
        사용내역조회 : "cashReceiptDetailList",
        거래일시 : "trDt",
        거래시간 : "trTm",
        승인번호 : "ntsApvno",
        가맹점명 : "mchtHgnm",
        지출증빙_사업장 : "mchtMtalnm",
        사용금액 : "cshRctwTrAm",
        신분확인수단 : "cshRctwScpzCnfCntn",
        거래구분 : "trDsnm",
        공제여부 : "cshRctwMadYn",
        발행구분 : "cshRctwPbcDsCntn"
      }
    },
    증권보유계좌조회 : {
      증권보유계좌조회 : "securitiesHoldList",
      계좌번호 : "acno",
      상품코드 : "ivWrsAcDsc",
      상품명 : "ivWrsAcDscnm"
    },
    위탁잔고조회 : {
      isObject: true,
      objectKey: 'securitiesTrust',
      계좌번호 : "acno",
      예수금 : "dncamBac",
      평가총액 : "ivWrsEvlAm",
      대용금 : "ivWrsDravlAm",
      잔고상세조회 : {
        잔고상세조회 : "securitiesBalanceDetailList",
        종목코드 : "ivItmC",
        상품명 : "itmnm",
        잔고수량 : "ivWrsBlcQt",
        현재가 : "ivWrsNowWthAm",
        매입단가 : "ivWrsByngUpr",
        매입금액 : "ivWrsByngAm",
        평가금액 : "ivWrsEvlAm",
        평가손익 : "ivWrsEvlPnlAm",
        수익률 : "ivWrsPftrt"
      }
    },
    펀드잔고조회 : {
      isObject: true,
      objectKey: 'securitiesFund',
      계좌번호 : "acno",
      예수금 : "dncamBac",
      평가총액 : "ivWrsEvlAm",
      대용금 : "ivWrsDravlAm",
      잔고상세조회 : {
        잔고상세조회 : "securitiesBalanceDetailList",
        종목코드 : "ivItmC",
        상품명 : "itmnm",
        잔고수량 : "ivWrsBlcQt",
        현재가 : "ivWrsNowWthAm",
        매입단가 : "ivWrsByngUpr",
        매입금액 : "ivWrsByngAm",
        평가금액 : "ivWrsEvlAm",
        평가손익 : "ivWrsEvlPnlAm",
        수익률 : "ivWrsPftrt"
      }
    },
    CMA잔고조회 : {
      isObject: true,
      objectKey: 'securitiesCma',
      계좌번호 : "acno",
      예수금 : "dncamBac",
      평가총액 : "ivWrsEvlAm",
      대용금 : "ivWrsDravlAm",
      잔고상세조회 : {
        잔고상세조회 : "securitiesBalanceDetailList",
        종목코드 : "ivItmC",
        상품명 : "itmnm",
        잔고수량 : "ivWrsBlcQt",
        현재가 : "ivWrsNowWthAm",
        매입단가 : "ivWrsByngUpr",
        매입금액 : "ivWrsByngAm",
        평가금액 : "ivWrsEvlAm",
        평가손익 : "ivWrsEvlPnlAm",
        수익률 : "ivWrsPftrt"
      }
    },
    계약내용조회 : {
      보험계약내용조회 : "insuranceList",
      증권번호 : "isrSctsNo",
      상품명 : "isrWrsnm",
      계약일자 : "isrCtrDt",
      만기일자 : "isrCtrDueDt",
      납입기간 : "insppdTpnm",
      납입주기 : "pymFqnm",
      최종납입월 : "lsPymYm",
      납입횟수 : "pymSc",
      잔여횟수 : "rmSc",
      계약상태 : "isrCtrStsCnm",
      피보험자 : "atIsrpnm",
      계약금액 : "ctrAm",
      보험료 : "pymIsrfe",
      납입보험료 : "totTtIsrfe",
      해지환급금 : "isrCloTrotAm",
      이체일자 : "auttrDtCntn",
      은행명 : "bnknm",
      계좌번호 : "acno",
      보험계약대출가능금액 : "lnPsbAm",
      정상대출이율 : "lnitrCntn",
      기대출금액 : "arlnAm",
      담당컨설턴트 : "isrcoChrrnm",
      지점명 : "bizonm",
      자동차보험여부 : "carIsrYn",
      보장기간시작일 : "isrStDt",
      보장기간종료일 : "isrEdDt",
      계약자 : "ctrmnm",
      수익자 : "bnfcnm",
      환급율 : "trotRto"
    },
    예상연금액조회 : {
      isObject: true,
      objectKey: 'pension',
      예상연금액조회 : {
        예상연금액조회 : "pensionBasicList",
        관계구분 : "pnsSpdmnExpl",
        지급기관 : "pnsPyOrgnm",
        상품명 : "pnsWrsnm",
        연령별예시연금액 : {
          arrayKey : "pensionDetailList",
          연령 : "agCntn",
          예상연금액 : "xpcPnsAm"
        }, 
      },
      예상연금액합계 : {
        예상연금액합계 : "pensionTotalList",
        연령 : "agCntn",
        예상연금액 : "xpcPnsAm"
      }
    },
    부동산시세조회 : {
      isObject: true,
      objectKey: 'realEstate',
      단지식별자 : "rlestHscxIdNo",
      시세정보 : {
        시세정보 : "realEstateDetailList",
        시세기준일 : "rlestMprUpdtDt",
        면적 : "rlestAreaOnm",
        단지명 : "rlestHcxnm",
        매매가_하위평균가 : "rlestDlLowAvgPr",
        매매가_일반평균가 : "rlestDlGenAvgPr",
        매매가_상위평균가 : "rlestDlUpAvgPr",
        전세가_하위평균가 : "rlestLeazLowAvgPr",
        전세가_일반평균가 : "rlestLeazGenAvgPr",
        전세가_상위평균가 : "rlestLeazUpAvgPr",
        월세가_보증금 : "rlestMmrGrnAm",
        월세가_월세 : "rlestMmrCntn",
        매매가_전주대비변동액 : "wek1BfCmprDlTmpVarPr",
        전세가_전주대비변동액 : "wek1BfCmprLeazTmpVarPr"
      }
    }
  },
  convert(obj, subConvertKey){
    try {
      if (!obj) return {}
      if (Array.isArray(obj) && !subConvertKey) return {}
      if (!obj.Job && !subConvertKey) return {}
      if (!obj.Job && !subConvertKey) return {}

      let convertData = subConvertKey ? subConvertKey : this.convertKey[obj.Job]
      let outPut = obj.Output || {}
      obj = outPut.Result || obj

      if (!subConvertKey && !outPut.Result) {
        return {}
      }

      console.log('스크래핑 conver.js', {convertData, obj}) 

      if (!convertData) {
        return {};
      }
      
      if (!obj) {
        return {};
      }

      let returnObj = {}
      let array = []
      if (Array.isArray(obj)) {
        for (let i=0; i<obj.length; i++) {
          let arrayObj = {}
          for (let key of Object.keys(obj[i])) {
            if (typeof convertData[key] !== "undefined") {
              if (Array.isArray(obj[i][key])) {
                arrayObj[convertData[key].arrayKey] = this.convert(obj[i][key], convertData[key])
              } else {
                arrayObj[convertData[key]] = obj[i][key]
              }
            }
          }

          array.push(arrayObj)
        }
        return array
      } else {
        for (let key of Object.keys(obj)) {
          if (convertData[key] === undefined) continue
          if (typeof obj[key] === "string") {
            returnObj[convertData[key]] = obj[key]
          } else {
            if (convertData.isObject) {
              returnObj[convertData[key][key]] = this.convert(obj[key], convertData[key])
            } else {
              returnObj[convertData[key]] = this.convert(obj[key], convertData)
            }
          }
          
        }
        return convertData.isObject !== undefined ? {[convertData.objectKey] : returnObj} : returnObj
      }
    } catch (e) {
      console.log(e)
      return {}
    }
  },
  korRemove(obj) {
    let test = Object.keys(obj).filter(key => !/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(key)).reduce((acc, key) => {
      if (typeof obj[key] === "object") {
        if (Array.isArray(obj[key])) {
          acc[key] = []
          for (let i=0; i<obj[key].length; i++) {
            acc[key][i] = this.korRemove(obj[key][i])
          }
        } else {
          acc[key] = this.korRemove(obj[key])
        }
      } else {
        acc[key] = obj[key]
      }
      return acc
    }, { })

    return test
  }
}

export default conversion