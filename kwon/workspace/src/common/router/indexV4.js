let routes = []


///////////////////////////////////////////////////////////////////////
// PFM메인 2024 상호금융 NH콕마이데이터 4.0 추진 개발
///////////////////////////////////////////////////////////////////////
routes.push({
  title: "",
  desc : "PFM메인",
  name: "MAMA4001",
  path: "/MAMA4001",
  component : () => import("@/views/page/MA/MA/MAMA4001/MAMA4001.vue")
})

///////////////////////////////////////////////////////////////////////
// 자산현황 > 자산 2024 상호금융 NH콕마이데이터 4.0 추진 개발
///////////////////////////////////////////////////////////////////////
routes.push({
  title: "나의자산",
  desc : "나의자산 > 자산 > 자산서브메인",
  name: "ASTA4001",
  path: "/ASTA4001",
  disableHistory: false,
  component : () => import("@/views/page/AS/TA/ASTA4001/ASTA4001.vue")
})

routes.push({
  title: "자산현황",
  desc : "나의자산 > 자산 > 예금(메인)",
  name: "ASAC4001",
  path: "/ASAC4001",
  disableHistory: false,
  component : () => import("@/views/page/AS/AC/ASAC4001/ASAC4001.vue")
})

routes.push({
  title: "자산현황",
  desc : "나의자산 > 자산 > 메인(투자)",
  name: "ASIV4001",
  path: "/ASIV4001",
  disableHistory: false,
  component : () => import("@/views/page/AS/IV/ASIV4001/ASIV4001.vue")
})


routes.push({
  title: "자산현황",
  desc : "나의자산 > 자산 > 연금",
  name: "ASPS4001",
  path: "/ASPS4001",
  disableHistory: false,
  component : () => import("@/views/page/AS/PS/ASPS4001/ASPS4001.vue")
})

routes.push({
  title: "자산현황",
  desc : "나의자산 > 자산 > 페이/포인트",
  name: "ASPT4001",
  path: "/ASPT4001",
  disableHistory: false,
  component : () => import("@/views/page/AS/PT/ASPT4001/ASPT4001.vue")
})

routes.push({
  title: "자산현황",
  desc : "나의자산 > 자산 > 보험",
  name: "ASIS4001",
  path: "/ASIS4001",
  disableHistory: false,
  component : () => import("@/views/page/AS/IS/ASIS4001/ASIS4001.vue")
})

routes.push({
  title: "자산현황",
  desc : "나의자산 >자산 > 부동산",
  name: "ASRE4001",
  path: "/ASRE4001",
  disableHistory: false,
  component : () => import("@/views/page/AS/RE/ASRE4001/ASRE4001.vue")
})

routes.push({
  title: "자산현황",
  desc : "나의자산 >자산 > 자동차",
  name: "ASCA4001",
  path: "/ASCA4001",
  disableHistory: false,
  component : () => import("@/views/page/AS/CA/ASCA4001/ASCA4001.vue")
})


///////////////////////////////////////////////////////////////////////
// 자산현황 > 부채 상호금융 NH콕마이데이터 4.0 추진 개발
///////////////////////////////////////////////////////////////////////

routes.push({
  title: "부채관리",
  name: "ASCD4001",
  path: "/ASCD4001",
  desc : "나의자산 > 부채 > 메인(카드)",
  disableHistory: false,
  component : () => import("@/views/page/AS/CD/ASCD4001/ASCD4001.vue")
})

routes.push({
  title: "부채관리",
  name: "ASLN4001",
  path: "/ASLN4001",
  desc : "나의자산 > 부채 > 메인(대출)",
  disableHistory: false,
  component : () => import("@/views/page/AS/LN/ASLN4001/ASLN4001.vue")
})

routes.push({
  title: "부채관리",
  desc : "나의자산 > 부채 > 학자금대출",
  name: "ASEL4001",
  path: "/ASEL4001",
  disableHistory: false,
  component : () => import("@/views/page/AS/EL/ASEL4001/ASEL4001.vue")
})

routes.push({
  title: "부채관리",
  desc : "나의자산 > 부채 > 할부금융",
  name: "ASIT4001",
  path: "/ASIT4001",
  disableHistory: false,
  component : () => import("@/views/page/AS/IT/ASIT4001/ASIT4001.vue")
})

routes.push({
  title: "부채관리",
  desc : "나의자산 > 부채 > 자동차할부",
  name: "ASCL4001",
  path: "/ASCL4001",
  disableHistory: false,
  component : () => import("@/views/page/AS/CL/ASCL4001/ASCL4001.vue")
})

routes.push({
  title: "부채관리",
  desc : "나의자산 > 부채 > 리스",
  name: "ASLS4001",
  path: "/ASLS4001",
  disableHistory: false,
  component : () => import("@/views/page/AS/LS/ASLS4001/ASLS4001.vue")
})

routes.push({
  title: "부채관리",
  desc : "나의자산 > 부채 > 빌린돈",
  name: "ASBR4001",
  path: "/ASBR4001",
  disableHistory: false,
  component : () => import("@/views/page/AS/BR/ASBR4001/ASBR4001.vue")
})



routes.push({
  title: "자산현황",
  desc : "자산 > 기타",
  name: "ASOA4001",
  path: "/ASOA4001",
  disableHistory: false,
  component : () => import("@/views/page/AS/OA/ASOA4001/ASOA4001.vue")
})

///////////////////////////////////////////////////////////////////////
// 자산진단 상호금융 NH콕마이데이터 4.0 추진 개발
///////////////////////////////////////////////////////////////////////
routes.push({
  title: "자산현황",
  desc : "나의자산 > 자산진단",
  name: "ASIP4001",
  path: "/ASIP4001",
  disableHistory: false,
  component : () => import("@/views/page/AS/IP/ASIP4001/ASIP4001.vue")
})


///////////////////////////////////////////////////////////////////////
// 지출 상호금융 NH콕마이데이터 4.0 추진 개발
///////////////////////////////////////////////////////////////////////
routes.push({
  title: "지출",
  desc : "지출 > 서브메인",
  name: "LCTA4001",
  path: "/LCTA4001",
  disableHistory: false,
  component : () => import("@/views/page/LC/TA/LCTA4001/LCTA4001.vue")
})

routes.push({
  title: "금융달력",
  desc : "지출 > 달력",
  name: "LCFD4001",
  path: "/LCFD4001",
  disableHistory: false,
  component : () => import("@/views/page/LC/FD/LCFD4001/LCFD4001.vue")
})

routes.push({
  title: "지출내역",
  desc : "지출 > 지출내역",
  name: "LCLE4001",
  path: "/LCLE4001",
  disableHistory: false,
  component : () => import("@/views/page/LC/LE/LCLE4001/LCLE4001.vue")
})

routes.push({
  title: "지출분석",
  desc : "지출 > 지출분석",
  name: "LCIP4001",
  path: "/LCIP4001",
  disableHistory: false,
  component : () => import("@/views/page/LC/IP/LCIP4001/LCIP4001.vue")
})


///////////////////////////////////////////////////////////////////////
// 연금절세 상호금융 NH콕마이데이터 4.0 추진 개발
///////////////////////////////////////////////////////////////////////
/* 연금절세 */
routes.push({
  title: "나의 연금/절세",
  desc : "연금절세 > 서브메인",
  name: "PDTA4001",
  path: "/PDTA4001",
  component : () => import("@/views/page/PD/TA/PDTA4001/PDTA4001.vue")
})

routes.push({
  title: "나의 노후준비",
  desc : "연금절세 > 나의 노후준비",
  name: "PDRT4001",
  path: "/PDRT4001",
  disableHistory: false,
  component : () => import("@/views/page/PD/RT/PDRT4001/PDRT4001.vue")
})

routes.push({
  title: "연말정산 공제금액",
  desc : "연금절세 > 연말정산 공제금액",
  name: "PDYT4002",
  path: "/PDYT4002",
  disableHistory: false,
  component : () => import("@/views/page/PD/YT/PDYT4002/PDYT4002.vue")
})

routes.push({
  title: "세금 납부 확인",
  desc : "연금절세 > 세금 납부 확인",
  name: "PDTX4004",
  path: "/PDTX4004",
  disableHistory: false,
  component : () => import("@/views/page/PD/TX/PDTX4004/PDTX4004.vue")
})

routes.push({
  title: "건강보험 가입내역",
  desc : "연금절세 > 건강보험가입내역",
  name: "PDSC4004",
  path: "/PDSC4004",
  disableHistory: false,
  component : () => import("@/views/page/PD/SC/PDSC4004/PDSC4004.vue")
})

routes.push({
  title: "데일리 금융 브리핑",
  desc : "연금절세 > 금융브리핑",
  name: "PDBF4001",
  path: "/PDBF4001",
  disableHistory: false,
  component : () => import("@/views/page/PD/BF/PDBF4001/PDBF4001.vue")
})

routes.push({
  title: "맞춤 상품추천",
  desc : "연금절세 > 맞춤 상품추천",
  name: "PDPD4001",
  path: "/PDPD4001",
  disableHistory: false,
  component : () => import("@/views/page/PD/PD/PDPD4001/PDPD4001.vue")
})

routes.push({
  title: "대출이자 계산기",
  desc : "연금절세 > 대출이자계산기",
  name: "PDPD4051",
  path: "/PDPD4051",
  disableHistory: false,
  component : () => import("@/views/page/PD/PD/PDPD4051/PDPD4051.vue")
})

routes.push({
  title: "대출한도 계산기",
  desc : "연금절세 > 대출 한도계산기",
  name: "PDPD4061",
  path: "/PDPD4061",
  disableHistory: false,
  component : () => import("@/views/page/PD/PD/PDPD4061/PDPD4061.vue")
})

routes.push({
  title: "대출한도 계산기",
  desc : "연금절세 > 대출 한도계산기 > 계산결과보기",
  name: "PDPD4063",
  path: "/PDPD4063",
  disableHistory: false,
  component : () => import("@/views/page/PD/PD/PDPD4063/PDPD4063.vue")
})


///////////////////////////////////////////////////////////////////////
// 도전목표챌린지 상호금융 NH콕마이데이터 4.0 추진 개발
///////////////////////////////////////////////////////////////////////
/* 버킷리스트&금융목표 */
routes.push({
  title: "버킷리스트",
  desc : "전체메뉴 > 도전목표챌린지",
  name: "PDMY4001",
  path: "/PDMY4001",
  disableHistory: false,
  component : () => import("@/views/page/PD/MY/PDMY4001/PDMY4001.vue")
})

///////////////////////////////////////////////////////////////////////
// NH콕부동산 상호금융 NH콕마이데이터 4.0 추진 개발
///////////////////////////////////////////////////////////////////////
routes.push({
  title: "NH콕부동산",
  desc : "전체메뉴 > NH콕부동산",
  name: "ANRE4201",
  path: "/ANRE4201",
  disableHistory: false,
  component : () => import("@/views/page/AN/RE/ANRE4201/ANRE4201.vue")
})

///////////////////////////////////////////////////////////////////////
// NH콕마이카 상호금융 NH콕마이데이터 4.0 추진 개발
///////////////////////////////////////////////////////////////////////
routes.push({
  title: "NH콕마이카",
  desc : "전체메뉴 > NH콕마이카",
  name: "ANCA4201",
  path: "/ANCA4201",
  disableHistory: false,
  component : () => import("@/views/page/AN/CA/ANCA4201/ANCA4201.vue")
})



///////////////////////////////////////////////////////////////////////
// 지역정보 - 상호금융 NH콕마이데이터 4.0 추진 개발
///////////////////////////////////////////////////////////////////////
routes.push({
  title:"농촌여행",
  desc:"NH 지역정보 > 농촌여행",
  name:"RGAT4001",
  path:"/RGAT4001",
  disableHistory: false,
  component : () => import("@/views/page/RG/AT/RGAT4001/RGAT4001.vue")
})

/* NH지역정보 */
routes.push({
  title: "NH지역정보",
  desc : "전체메뉴 > 지역정보",
  name: "RGTA4001",
  path: "/RGTA4001",
  disableHistory: false,
  component : () => import("@/views/page/RG/TA/RGTA4001/RGTA4001.vue")
})


/* 지역축제 */
routes.push({
  title: "지역축제",
  desc : "전체메뉴 >  NH지역정보 > 지역축제",
  name: "RGFT4001",
  path: "/RGFT4001",
  disableHistory: false,
  component : () => import("@/views/page/RG/FT/RGFT4001/RGFT4001.vue")
})

/* 지역문화 */
routes.push({
  title: "지역문화",
  desc : "전체메뉴 >  NH지역정보 > 지역문화",
  name: "RGCL4001",
  path: "/RGCL4001",
  disableHistory: false,
  component : () => import("@/views/page/RG/CL/RGCL4001/RGCL4001.vue")
})

/* 지역문화 */
routes.push({
  title: "자전거길 국토종주",
  desc : "전체메뉴 >  NH지역정보 > 국토종주 자전거길 > 자전거길 국토종주",
  name: "RGBM4001",
  path: "/RGBM4001",
  disableHistory: false,
  component : () => import("@/views/page/RG/BM/RGBM4001/RGBM4001.vue")
})

/* 전국 둘레길 */
routes.push({
  title: "전국 둘레길",
  desc : "전체메뉴 >  NH지역정보 > 전국 둘레길",
  name: "RGDM4001",
  path: "/RGDM4001",
  disableHistory: false,
  component : () => import("@/views/page/RG/DM/RGDM4001/RGDM4001.vue")
})

/* 군장병TMO */
routes.push({
  title: "군장병TMO안내",
  desc : "전체메뉴 >  NH지역정보 > 군장병TMO안내",
  name: "RGMM4001",
  path: "/RGMM4001",
  disableHistory: false,
  component : () => import("@/views/page/RG/MM/RGMM4001/RGMM4001.vue")
})

/* 귀농귀촌 */
routes.push({
  title: "귀농귀촌",
  desc : "전체메뉴 >  NH지역정보 > 귀농귀촌",
  name: "ANFM4001",
  path: "/ANFM4001",
  disableHistory: false,
  component : () => import("@/views/page/AN/FM/ANFM4001/ANFM4001.vue")
})

/* 마이농가(슬기로운영농생활) */
routes.push({
  title: "슬기로운영농생활",
  desc : "전체메뉴 > NH지역정보 > 슬기로운영농생활 > 영농달력",
  name: "SZFC4101",
  path: "/SZFC4101",
  disableHistory: false,
  component : () => import("@/views/page/SZ/FC/SZFC4101/SZFC4101.vue")
})

/* 마이농가(슬기로운영농생활) */
routes.push({
  title: "슬기로운영농생활",
  desc : "전체메뉴 > NH지역정보 > 슬기로운영농생활 > 영농일지",
  name: "ANSZ4002",
  path: "/ANSZ4002",
  disableHistory: false,
  component : () => import("@/views/page/AN/SZ/ANSZ4002/ANSZ4002.vue")
})

/* 마이농가(슬기로운영농생활) */
routes.push({
  title: "슬기로운영농생활",
  desc : "전체메뉴 > NH지역정보 > 슬기로운영농생활 > 농기계임대",
  name: "SZFL4101",
  path: "/SZFL4101",
  disableHistory: false,
  component : () => import("@/views/page/SZ/FL/SZFL4101/SZFL4101.vue")
})

/* 마이농가(슬기로운영농생활) */
routes.push({
  title: "슬기로운영농생활",
  desc : "전체메뉴 > NH지역정보 > 슬기로운영농생활 > 손익분석",
  name: "SZFP4101",
  path: "/SZFP4101",
  disableHistory: false,
  component : () => import("@/views/page/SZ/FP/SZFP4101/SZFP4101.vue")
})


/* 마이농가(슬기로운영농생활) */
routes.push({
  title: "슬기로운영농생활",
  desc : "전체메뉴 > NH지역정보 > 슬기로운영농생활 > 정책자금",
  name: "SZPC4101",
  path: "/SZPC4101",
  disableHistory: false,
  component : () => import("@/views/page/SZ/PC/SZPC4101/SZPC4101.vue")
})

/* 마이농가(슬기로운영농생활) */
routes.push({
  title: "슬기로운영농생활",
  desc : "전체메뉴 > NH지역정보 > 슬기로운영농생활 > 조합원",
  name: "SZST4101",
  path: "/SZST4101",
  disableHistory: false,
  component : () => import("@/views/page/SZ/ST/SZST4101/SZST4101.vue")
})

///////////////////////////////////////////////////////////////////////
// 추천 - 상호금융 NH콕마이데이터 4.0 추진 개발
///////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////
// 전체메뉴 - 상호금융 NH콕마이데이터 4.0 추진 개발
///////////////////////////////////////////////////////////////////////
routes.push({
  title:"전체메뉴",
  desc:"전체메뉴",
  name:"MRMR4001",
  path:"/MRMR4001",
  disableHistory: false,
  component : () => import("@/views/page/MR/MR/MRMR4001/MRMR4001.vue")
})

routes.push({
  title:"통합검색",
  desc:"통합검색",
  name:"COCO4301",
  path:"/COCO4301",
  disableHistory: false,
  component : () => import("@/views/page/CO/CO/COCO4301/COCO4301.vue")
})

routes.push({
  title:"음성검색",
  desc:"음성검색",
  name:"COCO4303",
  path:"/COCO4303",
  disableHistory: false,
  component : () => import("@/views/page/CO/CO/COCO4303/COCO4303.vue")
})

routes.push({
  title:"검색결과",
  desc:"검색결과",
  name:"COCO4304",
  path:"/COCO4304",
  disableHistory: false,
  component : () => import("@/views/page/CO/CO/COCO4304/COCO4304.vue")
})

///////////////////////////////////////////////////////////////////////
// 큰글씨모드관련 메뉴 - 상호금융 NH콕마이데이터 4.0 추진 개발
///////////////////////////////////////////////////////////////////////
routes.push({
  title:"큰글씨메인",
  desc:"큰글씨메인",
  name:"MAMA4S01",
  path:"/MAMA4S01",
  disableHistory: false,
  component : () => import("@/views/page/MA/MA/MAMA4S01/MAMA4S01.vue")
})

routes.push({
  title:"큰글씨전체메뉴",
  desc:"큰글씨전체메뉴",
  name:"MRMR4S01",
  path:"/MRMR4S01",
  disableHistory: false,
  component : () => import("@/views/page/MR/MR/MRMR4S01/MRMR4S01.vue")
})

routes.push({
  title:"큰글씨자산메인",
  desc:"큰글씨자산메인",
  name:"ASTA4S01",
  path:"/ASTA4S01",
  disableHistory: false,
  component : () => import("@/views/page/AS/TA/ASTA4S01/ASTA4S01.vue")
})

routes.push({
  title:"큰글씨지출메인",
  desc:"큰글씨지출메인",
  name:"LCTA4S01",
  path:"/LCTA4S01",
  disableHistory: false,
  component : () => import("@/views/page/LC/TA/LCTA4S01/LCTA4S01.vue")
})

routes.push({
  title:"큰글씨연금절세",
  desc:"큰글씨연금절세",
  name:"PDTA4S01",
  path:"/PDTA4S01",
  disableHistory: false,
  component : () => import("@/views/page/PD/TA/PDTA4S01/PDTA4S01.vue")
})

///////////////////////////////////////////////////////////////////////
// 청소년모드관련 메뉴 - 상호금융 NH콕마이데이터 4.0 추진 개발
///////////////////////////////////////////////////////////////////////
routes.push({
  title:"청소년메인",
  desc:"청소년메인",
  name:"MAMA4C01",
  path:"/MAMA4C01",
  disableHistory: false,
  component : () => import("@/views/page/MA/MA/MAMA4C01/MAMA4C01.vue")
})

routes.push({
  title:"청소년전체메뉴",
  desc:"청소년전체메뉴",
  name:"MRMR4C01",
  path:"/MRMR4C01",
  disableHistory: false,
  component : () => import("@/views/page/MR/MR/MRMR4C01/MRMR4C01.vue")
})

routes.push({
  title:"청소년자산메인",
  desc:"청소년자산메인",
  name:"ASTA4C01",
  path:"/ASTA4C01",
  disableHistory: false,
  component : () => import("@/views/page/AS/TA/ASTA4C01/ASTA4C01.vue")
})

routes.push({
  title:"청소년지출메인",
  desc:"청소년지출메인",
  name:"LCTA4C01",
  path:"/LCTA4C01",
  disableHistory: false,
  component : () => import("@/views/page/LC/TA/LCTA4C01/LCTA4C01.vue")
})

///////////////////////////////////////////////////////////////////////
// 미가입자모드관련 메뉴 - 상호금융 NH콕마이데이터 4.0 추진 개발
///////////////////////////////////////////////////////////////////////
routes.push({
  title:"미가입자메인",
  desc:"미가입자메인",
  name:"MAMA4U01",
  path:"/MAMA4U01",
  disableHistory: false,
  component : () => import("@/views/page/MA/MA/MAMA4U01/MAMA4U01.vue")
})
routes.push({
  title:"미가입자자산",
  desc:"미가입자자산",
  name:"ASTA4U01",
  path:"/ASTA4U01",
  disableHistory: false,
  component : () => import("@/views/page/AS/TA/ASTA4U01/ASTA4U01.vue")
})
routes.push({
  title:"미가입자지출",
  desc:"미가입자지출",
  name:"LCTA4U01",
  path:"/LCTA4U01",
  disableHistory: false,
  component : () => import("@/views/page/LC/TA/LCTA4U01/LCTA4U01.vue")
})
routes.push({
  title:"미가입자연금/절세",
  desc:"미가입자연금/절세",
  name:"PDTA4U01",
  path:"/PDTA4U01",
  disableHistory: false,
  component : () => import("@/views/page/PD/TA/PDTA4U01/PDTA4U01.vue")
})

///////////////////////////////////////////////////////////////////////
// 자산연결 - 상호금융 NH콕마이데이터 4.0 추진 개발
///////////////////////////////////////////////////////////////////////

/* 연결기관관리 */
routes.push({
  title:"연결기관관리",
  desc:"자산연결 > 연결기관관리",
  name:"MRAM4001",
  path:"/MRAM4001",
  disableHistory: false,
  component : () => import("@/views/page/MR/AM/MRAM4001/MRAM4001.vue")
})

// 금융지식 - 상호금융 NH콕마이데이터 4.0 추진 개발
///////////////////////////////////////////////////////////////////////
/* 금융지식  */
routes.push({
  title:"금융지식조건별조회",
  desc:"금융지식조건별조회",
  name:"COCT4001",
  path:"/COCT4001",
  disableHistory: false,
  component : () => import("@/views/page/CO/CT/COCT4001/COCT4001.vue")
})

///////////////////////////////////////////////////////////////////////
// 추천메인 - 상호금융 NH콕마이데이터 4.0 추진 개발
///////////////////////////////////////////////////////////////////////
/* 추천메인  */
routes.push({
  title:"추천 서브메인",
  desc:"추천 서브메인",
  name:"RETA4001",
  path:"/RETA4001",
  disableHistory: false,
  component : () => import("@/views/page/RE/TA/RETA4001/RETA4001.vue")
})

///////////////////////////////////////////////////////////////////////


export default routes
