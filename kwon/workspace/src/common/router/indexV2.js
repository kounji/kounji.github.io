
import PageNotFound from '@/views/page/CO/CO/COCO1127/COCO1127.vue'
let routes = []

//404 Error 페이지 처리 20210625
// 1차 서버단에서 처리
routes.push({
  title: "",
  desc : "PFM메인",
  name: "MAMA2001",
  path: "/MAMA2001",
  component : () => import("@/views/page/MA/MA/MAMA2001/MAMA2001.vue")
})

routes.push({
  title:"연결기관관리",
  desc:"전체메뉴 > 연결기관관리 > 연결기관목록",
  name:"MRAM2001",
  path:"/MRAM2001",
  component : () => import("@/views/page/MR/AM/MRAM2001/MRAM2001.vue")
})

 routes.push({
  title: "",
  desc : "서비스가입 > 서비스소개",
  name: "COAS2001",
  path: "/COAS2001",
  component : () => import("@/views/page/CO/AS/COAS2001/COAS2001.vue")
})
 routes.push({
  title: "",
  desc : "서비스가입 > 서비스소개 > 서비스 안내 및 필수 약관 재동의",
  name: "COAS2104",
  path: "/COAS2104",
  component : () => import("@/views/page/CO/AS/COAS2104/COAS2104.vue")
})
 routes.push({
  title: "",
  name: "COCO1125",
  path: "/COCO1125",
  disableHistory: true,
  desc : "서비스장애",
  component : () => import("@/views/page/CO/CO/COCO1125/COCO1125.vue")
})
 routes.push({
  title: "금융생활",
  name: "PDMY2001",
  path: "/PDMY2001",
  component : () => import("@/views/page/PD/MY/PDMY2001/PDMY2001.vue")
})

routes.push({
  title: "전체자산",
  desc : "나의자산 > 자산 > 전체 메인",
  name: "ASTA2001",
  path: "/ASTA2001",
  component : () => import("@/views/page/AS/TA/ASTA2001/ASTA2001.vue")
})

routes.push({
  title: "자산현황",
  desc : "나의자산 > 자산 > 예금(메인)",
  name: "ASAC2001",
  path: "/ASAC2001",
  disableHistory: false,
  component : () => import("@/views/page/AS/AC/ASAC2001/ASAC2001.vue")
})

routes.push({
  title: "자산현황",
  desc : "나의자산 > 자산 > 메인(투자)",
  name: "ASIV2001",
  path: "/ASIV2001",
  disableHistory: false,
  component : () => import("@/views/page/AS/IV/ASIV2001/ASIV2001.vue")
})

routes.push({
  title: "자산현황",
  desc : "자산현황 > 연금",
  name: "ASPS2001",
  path: "/ASPS2001",
  disableHistory: false,
  component : () => import("@/views/page/AS/PS/ASPS2001/ASPS2001.vue")
})

routes.push({
  title: "자산현황",
  desc : "나의자산 > 자산 > 포인트(메인)",
  name: "ASPT2001",
  path: "/ASPT2001",
  disableHistory: false,
  component : () => import("@/views/page/AS/PT/ASPT2001/ASPT2001.vue")
})

routes.push({
  title: "자산현황",
  desc : "나의자산 > 자산 > 메인(보험)",
  name: "ASIS2001",
  path: "/ASIS2001",
  disableHistory: false,
  component : () => import("@/views/page/AS/IS/ASIS2001/ASIS2001.vue")
})

routes.push({
  title: "자산현황",
  desc : "나의자산 > 자산 > 부동산 메인(상세)",
  name: "ASRE2001",
  path: "/ASRE2001",
  disableHistory: false,
  component : () => import("@/views/page/AS/RE/ASRE2001/ASRE2001.vue")
})

routes.push({
  title: "자산현황",
  name: "ASCA2001",
  path: "/ASCA2001",
  desc : "나의자산 > 자산 > 메인(자동차)",
  disableHistory: false,
  component : () => import("@/views/page/AS/CA/ASCA2001/ASCA2001.vue")
})

routes.push({
  title: "자산현황",
  desc : "나의자산 > 자산 > 기타(메인)",
  name: "ASOA2001",
  path: "/ASOA2001",
  disableHistory: false,
  component : () => import("@/views/page/AS/OA/ASOA2001/ASOA2001.vue")
})

routes.push({
  title: "자산현황",
  name: "ASLN2001",
  path: "/ASLN2001",
  desc : "나의자산 > 부채 > 메인(대출)",
  disableHistory: false,
  component : () => import("@/views/page/AS/LN/ASLN2001/ASLN2001.vue")
})

routes.push({
  title: "자산현황",
  name: "ASCD2001",
  path: "/ASCD2001",
  desc : "나의자산 > 부채 > 메인(카드)",
  disableHistory: false,
  component : () => import("@/views/page/AS/CD/ASCD2001/ASCD2001.vue")
})

routes.push({
  title: "자산현황",
  name: "ASIT2001",
  path: "/ASIT2001",
  desc : "나의자산 > 부채 > 메인(할부금융)",
  disableHistory: false,
  component : () => import("@/views/page/AS/IT/ASIT2001/ASIT2001.vue")
})

routes.push({
  title: "자산현황",
  name: "ASCL2001",
  path: "/ASCL2001",
  desc : "나의자산 > 부채 > 메인(자동차)",
  disableHistory: false,
  component : () => import("@/views/page/AS/CL/ASCL2001/ASCL2001.vue")
})

routes.push({
  title: "자산현황",
  name: "ASLS2001",
  path: "/ASLS2001",
  desc : "나의자산 > 부채 > 메인(리스)",
  disableHistory: false,
  component : () => import("@/views/page/AS/LS/ASLS2001/ASLS2001.vue")
})

routes.push({
  title: "자산현황",
  name: "ASBR2001",
  path: "/ASBR2001",
  desc : "나의자산 > 부채 > 메인(빌린돈)",
  disableHistory: false,
  component : () => import("@/views/page/AS/BR/ASBR2001/ASBR2001.vue")
})

routes.push({
  title: "나의자산",
  name: "ASLN2107",
  path: "/ASLN2107",
  desc : "나의자산 > 부채 > 메인(빌린돈)",
  disableHistory: true,
  component : () => import("@/views/page/AS/LN/ASLN2107/ASLN2107.vue")
})


routes.push({
  title: "나의자산",
  desc : "나의자산 > 자산 > 포인트(메인)",
  name: "ASAC1110",
  path: "/ASAC1110",
  component : () => import("@/views/page/AS/AC/ASAC1110/ASAC1110.vue")
})

routes.push({
  title: "나의자산",
  desc : "나의자산 > 전체(메인)",
  name: "ASAC1001",
  path: "/ASAC1001",
  component : () => import("@/views/page/AS/AC/ASAC1001/ASAC1001.vue")
})

 routes.push({
  title: "나의자산",
  desc : "나의자산 > 자산 > 자산진단",
  name: "ASIP2001",
  path: "/ASIP2001",
  component : () => import("@/views/page/AS/IP/ASIP2001/ASIP2001.vue")
})

 routes.push({
  title: "지출",
  desc : "지출 > 달력",
  name: "LCFD2001",
  path: "/LCFD2001",
  component : () => import("@/views/page/LC/FD/LCFD2001/LCFD2001.vue")
})
 routes.push({
  title: "지출",
  desc : "지출 > 지출내역",
  name: "LCLE2001",
  path: "/LCLE2001",
  component : () => import("@/views/page/LC/LE/LCLE2001/LCLE2001.vue")
})
 routes.push({
  title: "지출",
  desc : "지출 > 지출분석",
  name: "LCIP2001",
  path: "/LCIP2001",
  component : () => import("@/views/page/LC/IP/LCIP2001/LCIP2001.vue")
})
routes.push({
  title: "지출",
  desc : "지출 > 지출분석 > 정기지출",
  name: "LCIP2004",
  path: "/LCIP2004",
  component : () => import("@/views/page/LC/IP/LCIP2004/LCIP2004.vue")
})
 routes.push({
  title: "금융생활",
  desc : "금융생활 > 상품추천",
  name: "PDPD1001",
  path: "/PDPD1001",
  component : () => import("@/views/page/PD/PD/PDPD1001/PDPD1001.vue")
})

//20230728_PDYT1101 -> PDYT2002 변경
routes.push({
  title: "금융생활",
  desc : "금융생활 > 금융통통 > 연말정산",
  name: "PDYT2002",
  path: "/PDYT2002",
  component : () => import("@/views/page/PD/YT/PDYT2002/PDYT2002.vue")
})
//20230810_PDRT1001 -> PDRT2001변경
 routes.push({
  title: "금융생활",
  desc : "금융생활 > 금융통통 > 노후준비",
  name: "PDRT2001",
  path: "/PDRT2001",
  component : () => import("@/views/page/PD/RT/PDRT2001/PDRT2001.vue")
})
routes.push({
  title: "금융생활",
  desc : "금융생활 > 금융통통 > 사회보험",
  name: "PDSC2001",
  path: "/PDSC2001",
  component : () => import("@/views/page/PD/SC/PDSC2001/PDSC2001.vue")
})
 routes.push({
  title: "제휴서비스",
  desc : "제휴서비스 > 부동산서비스",
  name: "ANRE2201",
  path: "/ANRE2201",
  component : () => import("@/views/page/AN/RE/ANRE2201/ANRE2201.vue")
})
 routes.push({
  title: "제휴서비스",
  desc : "제휴서비스 > NH콕마이카",
  name: "ANCA2201",
  path: "/ANCA2201",
  component : () => import("@/views/page/AN/CA/ANCA2201/ANCA2201.vue")
})

 routes.push({
  title: "제휴서비스",
  desc : "제휴서비스 > 귀농귀촌 > 귀농귀촌 메인",
  name: "ANFM2001",
  path: "/ANFM2001",
  component : () => import("@/views/page/AN/FM/ANFM2001/ANFM2001.vue")
})
 routes.push({
  title: "제휴서비스",
  desc : "제휴서비스 > 영농달력 > 영농달력 메인",
  name: "SZFC2101",
  path: "/SZFC2101",
  component : () => import("@/views/page/SZ/FC/SZFC2101/SZFC2101.vue")
})

 routes.push({
  title: "제휴서비스",
  desc : "제휴서비스 > 영농일지 > 영농일지 메인",
  name: "ANSZ2002",
  path: "/ANSZ2002",
  component : () => import("@/views/page/AN/SZ/ANSZ2002/ANSZ2002.vue")
})

 routes.push({
  title: "제휴서비스",
  desc : "제휴서비스 > 농기계임대 > 농기계임대 메인",
  name: "SZFL2101",
  path: "/SZFL2101",
  component : () => import("@/views/page/SZ/FL/SZFL2101/SZFL2101.vue")
})
 routes.push({
  title: "제휴서비스",
  desc : "제휴서비스 > 손익분석 > 손익분석 메인",
  name: "SZFP2101",
  path: "/SZFP2101",
  component : () => import("@/views/page/SZ/FP/SZFP2101/SZFP2101.vue")
})
 routes.push({
  title: "제휴서비스",
  desc : "제휴서비스 > 정책자금 > 정책자금 메인",
  name: "SZPC2101",
  path: "/SZPC2101",
  component : () => import("@/views/page/SZ/PC/SZPC2101/SZPC2101.vue")
})
 routes.push({
  title: "제휴서비스",
  desc : "제휴서비스 > 농기계임대 > 농기계임대 메인",
  name: "SZUM2101",
  path: "/SZUM2101",
  component : () => import("@/views/page/SZ/UM/SZUM2101/SZUM2101.vue")
})
 routes.push({
  title: "제휴서비스",
  desc : "제휴서비스 > 농기계임대 > 농기계임대 메인",
  name: "SZST2101",
  path: "/SZST2101",
  component : () => import("@/views/page/SZ/ST/SZST2101/SZST2101.vue")
})

 routes.push({
  title: "금융생활",
  desc : "금융생활 > 나의 세금/사회보험료",
  name: "PDTX1001",
  path: "/PDTX1001",
  component : () => import("@/views/page/PD/TX/PDTX1001/PDTX1001.vue")
})
 routes.push({
  title: "금융생활",
  desc : "금융생활 > 공공 정보 미연결",
  name: "PDTX1002",
  path: "/PDTX1002",
  component : () => import("@/views/page/PD/TX/PDTX1002/PDTX1002.vue")
})
 routes.push({
  title: "",
  name: "COCO1114",
  path: "/COCO1114",
  disableHistory: true,
  desc : "서비스오류",
  component : () => import("@/views/page/CO/CO/COCO1114/COCO1114.vue")
})
 routes.push({
  title: "",
  name: "COCO1115",
  path: "/COCO1115",
  disableHistory: true,
  desc : "서비스준비중",
  component : () => import("@/views/page/CO/CO/COCO1115/COCO1115.vue")
})
 routes.push({
  title: "",
  name: "COCO1126",
  path: "/COCO1126",
  disableHistory: true,
  desc : "서비스점검",
  component : () => import("@/views/page/CO/CO/COCO1126/COCO1126.vue")
})
 routes.push({
  title: "본인인증 방식 선택",
  name: "PI0001",
  path: "/PI0001",
  component : () => import("@/views/page/XX/pilot/PI0001/PI0001.vue")
}) 
routes.push({
  title: "정보제공자 선택",
  name: "PI0002",
  path: "/PI0002",
  component : () => import("@/views/page/XX/pilot/PI0002/PI0002.vue")
}) 
routes.push({
  title: "",
  desc : "지방세 체납/납세 증명",
  name: "PDTX2001",
  path: "/PDTX2001",
  component : () => import("@/views/page/PD/TX/PDTX2001/PDTX2001.vue")
})
routes.push({
  title: "금융생활",
  desc : "금융생활 > 금융통통 > 세금현황",
  name: "PDTX2004",
  path: "/PDTX2004",
  component : () => import("@/views/page/PD/TX/PDTX2004/PDTX2004.vue")
})
routes.push({
  title: "",
  desc : "국세 체납/납세 증명",
  name: "PDRT2002",
  path: "/PDRT2002",
  component : () => import("@/views/page/PD/RT/PDRT2002/PDRT2002.vue")
}) 
routes.push({
  title: "",
  desc : "관세 체납/납세 증명",
  name: "PDRT2003",
  path: "/PDRT2003",
  component : () => import("@/views/page/PD/RT/PDRT2003/PDRT2003.vue")
}) 
routes.push({
  title: "",
  desc : "공공기관 미연결",
  name: "PDRT2004",
  path: "/PDRT2004",
  component : () => import("@/views/page/PD/RT/PDRT2004/PDRT2004.vue")
}) 
routes.push({
  title: "",
  desc : "금융브리핑",
  name: "PDBF2001",
  path: "/PDBF2001",
  component : () => import("@/views/page/PD/BF/PDBF2001/PDBF2001.vue")
}) 

routes.push({
  title: "조회",
  desc : "관리자 > 데이터 조회",
  name: "COCO9999",
  path: "/COCO9999",
  disableHistory: true,
  component : () => import("@/views/page/CO/CO/COCO9999/COCO9999.vue")
})

routes.push(
  {
    path: '*',
    component : PageNotFound
  }
)

//404 Error 페이지 처리를 위한 Main 추가 20210625
//1차 서버단에서 처리
routes.push(
  {
    path: '/',
  }
)

export default routes