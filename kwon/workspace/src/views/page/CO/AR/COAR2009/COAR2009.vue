<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 금융자산 > 한번애 > 상세정보 전송요구 및 개인(신용)정보 수집ㆍ이용 동의(상세)
* @ 페이지설명 : 한번에 > 상세정보 전송요구 및 개인(신용)정보 수집ㆍ이용 동의(상세)
* @ 파일명     : src/views/page/CO/AR/COAR2009/COAR2009.vue
* @ 작성자     : CS533459
* @ 작성일     : 2023-07-28
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-28              CS533459              상호금융 마이데이터 확대 개발 적용
*************************************************************************/
-->
<template>
	<!-- 전체 팝업 시작 -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1>{{isMramMod === '' ? "자산연결" : "연결 변경"}}</h1>
		</div>		
		<div class="popup_content" id="term_scroll" ref="term_scroll"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner progress_wrap">
				<strong class="titH1">자산 관리를 위해<br>아래 내용에 동의해 주세요.</strong>
				<span class="progress_num"><em class="pointColor green">5</em>/5</span>
			</div>
			<div class="terms_view">
				<div>
					<div class="terms_cont">
						<strong class="terms_tit">상세정보 전송요구 및<br>개인(신용)정보 수집&middot;이용 동의</strong>
						<p class="terms_txt">농업협동조합중앙회는 신용정보의 이용 및 보호에 관한 법률, 개인정보 보호법 등 관련 법령에 따라 다음과 같이 고객님의 개인(신용)정보를 처리합니다.</p>
						<dl>
							<dt>정보를 보내는 곳</dt>
							<dd>{{fn_setOrgnm()}}</dd>
							<dt>정보를 받는 곳</dt>
							<dd>농업협동조합중앙회</dd>
							<dt>목적</dt>
							<dd>전송 요구를 통한 본인신용정보 통합 조회, 데이터분석 서비스의 이용</dd>
							<dt>보유 및 이용기간</dt>
							<dd>
								<strong class="terms_txt_point">서비스 이용 종료시 또는 삭제 요구시 까지</strong>
							</dd>
							<dt>거부할 권리 및 불이익</dt>
							<dd>귀하는 개인(신용)정보 수집&middot;이용에 관한 동의를 거부하실 수 있습니다. 다만, “필수 항목에 대한 수집&middot;이용에 관한 동의”는 본인신용정보 통합 조회, 데이터분석 서비스의 이용을 위한 필수적 사항 이므로 동의를 거부하실 경우 본인신용정보 통합 조회, 데이터분석 서비스의 이용이 제한될 수 있으며, “선택 항목에 대한 수집&middot;이용에 관한 동의”는 거부하실 경우 해당 선택 항목에 대한 본인신용정보 통합 조회, 데이터분석 서비스의 이용이 제한될 수 있습니다.</dd>
							<dt>전송을 요구하는 개인신용정보</dt>
							<dd>
								<ul class="bl_dot_list">
									<li v-show="viewBank">
										은행 : 계좌(수신/펀드/신탁/ISA/대출) 목록, 퇴직연금(개인형IRP/DC형) 목록 및 선불카드 목록, 수신계좌 정보, 펀드상품 정보, 대출상품 정보, 신탁/ISA상품 정보, 개인형IRP 정보, DB/DC형 퇴직연금 정보, 선불카드 정보
									</li>
									<li v-show="viewCard">
										카드 : 카드 목록 및 선불 카드 목록, 카드 정보, 선불카드 정보, 포인트 정보, 청구/결제 정보 및 리볼빙 정보, 대출상품 정보
									</li>
									<li v-show="viewInvest">
										증권(금융투자) : 계좌 목록 및 퇴직연금(개인형IRP/DC형) 목록, 계좌 정보, 개인형IRP 정보, DB/DC형 퇴직연금 정보
									</li>
									<li v-show="viewInsu">
										보험 : (계약자/피보험자)보험증권 목록, (계약자) 대출계좌 목록, (계약자) 퇴직연금(개인형IRP/DC형) 목록, 보험 정보, 대출상품 정보, 피보험자 정보, 개인형IRP 정보, DB/DC형 퇴직연금 정보
									</li>
									<li v-show="viewEfin">
										페이(전자금융) : 선불전자지급수단 목록 및 계정 목록, 선불전자지급수단 정보, 결제정보
									</li>
									<li v-show="viewCapital">
										할부금융 : 대출상품 또는 운용리스 정보
									</li>
									<li v-show="viewGinsu">
										보증보험 : 보증보험 정보
									</li>
									<li v-show="viewTelecom">
										통신 : 통신 계약 목록, 통신 정보
									</li>
									<li v-show="viewUsury">
										대부 : 인수채권/금전대부 정보
									</li>
									<li v-show="viewBond">
										인수채권 : 인수채권/금전대부 정보
									</li>
									<li v-show="viewP2p">
										P2P : P2P 대출 정보
									</li>
									<li v-show="viewPublic">
										공공기관 : {{selPublicCertList}}
									</li>
								</ul>
							</dd>

							<dt>수집&middot;이용 정보</dt>
							<dd>
								<ul class="bl_dot_list">
									<li>
										<strong>개인식별정보 <span class="txt_gray">(필수항목)</span></strong>
										<div class="sub_box">전자서명, 접근토큰, 인증서, 전송요구서</div>
									</li>
									<li>
										<strong>신용거래정보 <span class="txt_gray">(필수항목)</span></strong>
										<div class="com_box_type01 toggle_list_box2" v-if="viewBank">
											<div data-ui-toggle="box" class="toggle_box_area"><!-- 활성화 class open -->
												<button type="button" class="view_btn" aria-expanded="false">
													<div class="new_tit_area">
														<div class="tit"><span>은행</span></div>
														<p class="top_sub_txt">수신계좌 정보</p>
													</div>
													<em class="open">열기</em>
													<em class="close">닫기</em>
												</button>
											</div>
											<ul class="view_cont list_type_info">
												<li>
													<p class="sub_box">기본정보(통화코드, 저축방법, 계좌개설일자, 만기일, 약정액, 월 납입액), 추가정보(통화코드, 현재잔액, 출금 가능액, 계약금리, 최종납입회차), 거래내역(거래일시, 거래번호, 거래유형, 거래구분, 통화코드, 거래금액, 거래 후 잔액, 납입회차) 계좌지정 자동이체 등록정보(자동이체기관(코드), 자동이체계좌번호, 자동이체금액, 자동이체주기, 자동이체주기 상세, 적요)</p>
												</li>
												<li>
													<strong>펀드상품 정보</strong>
													<p class="sub_box">기본정보(표준펀드코드, 납입유형, 개설일, 만기일), 추가정보(통화코드, 잔액, 평가금액, 투자원금, 보유좌수), 거래내역(거래일시, 거래번호, 거래유형, 통화코드, 기준가, 거래좌수, 거래금액, 거래 후 잔고평가금액)</p>
												</li>
													<li>
													<strong>대출상품 정보</strong>
													<p class="sub_box">기본정보(대출일, 만기일, 최종적용금리, 월상환일, 상환방식, 자동이체 기관, 상환계좌번호(자동이체), 거치기간), 잔액정보(통화코드, 대출잔액, 대출원금, 다음 이자 상환일), 거래내역(거래일시, 거래번호, 거래유형, 통화코드, 거래금액, 거래 후 대출잔액, 거래금액 중 원금, 거래금액 중 이자, 환출이자, 이자적용수, 이자적용시작일, 이자적용종료일, 적용이율, 이자금액, 이자종류</p>
												</li>
													<li>
													<strong>DB형 퇴직연금 정보</strong>
													<p class="sub_box">기본정보(보유여부)</p>
												</li>
													<li>
													<strong>DC형 퇴직연금 정보</strong>
													<p class="sub_box">기본정보(계좌잔액, 계좌평가금액, 개설일), 거래내역(거래일시, 거래번호, 거래구분, 거래금액), 개별운용상품 정보(개별운용상품명, 상품가입번호, 상품유형, 평가금액, 납입(투자)원금, 보유좌수, 신규일, 만기일, 약정이자율)</p>
												</li>
												<li>
													<strong>개인형IRP 정보</strong>
													<p class="sub_box">기본정보(계좌잔액, 계좌평가금액, 사용자부담금, 가입자부담금, 개설일, 최초입금일, 최초 제도 가입일, 연금개시 시작(예정)일, 거래내역(거래일시, 거래번호, 거래구분, 거래금액), 개별운용상품 정보(개별운용상품명, 상품가입번호, 상품유형, 평가금액, 납입(투자)원금, 보유좌수, 신규일, 만기일, 약정이자율</p>
												</li>
												<li>
													<strong>선불카드 정보</strong>
													<p class="sub_box">잔액정보(총잔액, 충전포인트 잔액, 적립포인트 잔액, 적립예정, 소멸예정), 거래내역(거래유형, 거래일시, 거래번호, 거래금액, 거래 후 잔액, 거래상대기관, 거래상대 식별값), 결제내역(승인번호, 승인일시, 결제상태, 정정 또는 승인취소 일시, 가맹점명, 가맹점 사업자등록번호, 이용금액, 정정 후 금액, 전체할부회차)</p>
												</li>
											</ul>
										</div>

										<div class="com_box_type01 toggle_list_box2" v-if="viewCard">
											<div data-ui-toggle="box" class="toggle_box_area"><!-- 활성화 class open -->
												<button type="button" class="view_btn" aria-expanded="false">
													<div class="new_tit_area">
														<div class="tit"><span>카드</span></div>
														<p class="top_sub_txt">카드 정보</p>
													</div>
													<em class="open">열기</em>
													<em class="close">닫기</em>
												</button>
											</div>
											<ul class="view_cont list_type_info">
												<li>
													<p class="sub_box">
														카드 목록(카드번호, 카드식별자, 카드상품명, 본인/가족 구분(코드), 카드구분(코드)), 카드기본정보(교통 기능(여부), 현금카드기능(여부), 결제은행(코드), 결제계좌번호, 카드브랜드(코드), 상품 연회비, 발급일자)
													</p>
												</li>
												<li>
													<strong>포인트</strong>
													<p class="sub_box">
														포인트정보(포인트명, 잔여 포인트, M+2월 소멸예정포인트)
													</p>
												</li>
												<li>
													<strong>청구 결제 및 리볼빙 </strong>
													<p class="sub_box">
														월별 청구정보(결제순번, 월별 청구금액, 결제일, 청구년월, 결제년월일), 월별 청구 상세정보(사용일시 또는 사용일자, 카드식별자, 거래번호, 이용금액, 통화코드(이용금액), 가맹점명, (국내승인)가맹점 사업자등록번호, 신용판매 수수료, 전체 할부회차, 현재 할부회차, 할부 결제 후 잔액, 상품구분(코드)), 결제기본정보(일별 카드 이용정보)(리볼빙 약정여부, 결제순번, 결제예정일, 결제예정금액, 일시불, 할부, 단기대출(현금서비스), 리볼빙, 장기대출(카드론), 연회비 및 기타), 리볼빙 정보(일별 카드 이용정보)(리볼빙약정시작일, 리볼빙약정종료일, 리볼빙약정해지일자, 최소결제비율, 최소결제금액, 약정결제비율, 약정결제금액, 리볼빙 이월잔액), 승인 상세정보(건별 카드 이용정보)(승인번호, 결제상태, 사용구분(신용/체크), 승인일시, 정정 또는 승인취소 일시, 가맹점명, (국내승인)가맹점 사업자등록번호, 이용금액, 정정 후 금액, (국내승인)전체 할부회차, (해외승인)결제(승인)국가코드, (해외승인)결제(승인)시 통화코드, (해외승인)원화), 카드매입취소 정보(매입번호, 매입일자, 매출(취소)일자, 원승인번호, 원승인일시, 원승인금액, (해외매입)원승인금액 통화코드, (해외매입)원승인금액 원화, 사용구분(신용/체크), 가맹점명, (국내매입)가맹점 사업자번호, (해외매입)결제(매입)국가코드, (해외매입)결제(매입)통화코드, 이용금액, (국내매입)전체 할부 회차, (해외매입)원화
													</p>
												</li>
												<li>
													<strong>대출상품</strong>
													<p class="sub_box">
														단기대출 이용정보(이용일시, 이용금액(취급앱), 단기대출잔액, 결제예정일, 이자율, 상환기관(코드), 상환계좌번호), 장기대출 이용정보(대출번호, 대출일시 또는 대출일자, 일자의 대출회차, 대출종류, 상품명, 이용금액, 이자율, 만기일, 장기대출 잔액, 상환방법(코드), 상환액 중 이자, 상환기관(코드), 상환 계쫘번호), 장기대출 거래내역 정보(거래일시 또는 거래일자, 거래번호, 거래유형, 통화코드, 거래금액, 거래 후 대출잔액, 거래금액 중 원금, 거래금액 중 이자
													</p>
												</li>
											</ul>
										</div>

										<div class="com_box_type01 toggle_list_box2" v-if="viewInvest">
											<div data-ui-toggle="box" class="toggle_box_area"><!-- 활성화 class open -->
												<button type="button" class="view_btn" aria-expanded="false">
													<div class="new_tit_area">
														<div class="tit"><span>증권(금융투자)</span></div>
														<p class="top_sub_txt">계좌 정보</p>
													</div>
													<em class="open">열기</em>
													<em class="close">닫기</em>
												</button>
											</div>
											<ul class="view_cont list_type_info">
												<li>
													<p class="sub_box">
														계좌목록(계좌번호, 계좌명, 계좌종류(코드), 계좌개설일, 세제혜택 적용여부(계좌), CMA상품포함여부, 주식거래가능여부, 은행예수금방식계좌여부), 잔액정보(기준일자, 통화코드, 예수금, 신용 융자, 대출금, 출금가능금액), 거래내역(종목명(상품명), 종목코드(상품코드), 거래일시 또는 거래일자, 거래번호, 거래종류(코드), 거래종류 상세, 거래수량, 수량단위명, 거래단가, 거래금액, 정산금액, 거래후잔액, 통화코드, 적요, 거래소코드)
													</p>
												</li>
												<li>
													<strong>상품</strong>
													<p class="sub_box">
														개별상품 기본정보(기준일자, 상품종류(코드), 상품종류 상세, 종목코드(상품코드), 종목명, 거래소코드, 파생상품포지션구분(코드), 신용구분(코드), 세제혜택적용여부(상품), 매입금액, 보유수량, 수량단위명, 평가금액, 체결기준여부, 통화코드), 연금계좌 추가정보(연금가입일, 납부총액, 기출금액, 최종납입일, 연금기수령액, 연금개시(예정)일, 금년납입금, 통화코드), 계좌지정 자동이체 등록정보(자동이체기관(코드), 자동이체계좌번호, 자동이체금액, 자동이체주기, 자동이체주기 상세, 적요)
													</p>
												</li>
												<li>
													<strong>DB형 퇴직연금 정보</strong>
													<p class="sub_box">
														기본정보(보유여부)
													</p>
												</li>
												<li>
													<strong>DC형 퇴직연금 정보</strong>
													<p class="sub_box">
														기본정보(계좌잔액, 계좌평가금액, 개설일), 거래내역(거래일시, 거래번호, 거래구분, 거래금액), 개별운용상품 정보(개별운용상품명, 상품가입번호, 상품유형, 평가금액, 납입(투자)원금, 보유좌수, 신규일, 만기일, 약정이자율)
													</p>
												</li>
												<li>
													<strong>개인형 IRP</strong>
													<p class="sub_box">
														기본정보(계좌잔액, 계좌평가금액, 사용자부담금, 가입자부담금, 개설일, 최초입금일, 최초 제도 가입일, 연금개시 시작(예정)일, 거래내역(거래일시, 거래번호, 거래구분, 거래금액), 개별운용상품 정보(개별운용상품명, 상품가입번호, 상품유형, 평가금액, 납입(투자)원금, 보유좌수, 신규일, 만기일, 약정이자율
													</p>
												</li>
											</ul>
										</div>

										<div class="com_box_type01 toggle_list_box2" v-if="viewInsu">
											<div data-ui-toggle="box" class="toggle_box_area"><!-- 활성화 class open -->
												<button type="button" class="view_btn" aria-expanded="false">
													<div class="new_tit_area">
														<div class="tit"><span>보험</span></div>
														<p class="top_sub_txt">보험 정보</p>
													</div>
													<em class="open">열기</em>
													<em class="close">닫기</em>
												</button>
											</div>
											<ul class="view_cont list_type_info">
												<li>
													<p class="sub_box">
														보험료납입 기본정보(납입기간구분, 납입주기, 총 납입 횟 수, 납입기관, 납입계좌번호, 납입일자, 납입종료일자, 납입 보험료, 통화코드, 자동대출납입 신청 여부), 납입내역(납입 일자, 납입연월, 납입회차, 실납입 보험료, 통화코드, 수금방법)
													</p>
												</li>
												<li>
													<strong>장기인 보험정보(계약자)</strong>
													<p class="sub_box">
														보험계약정보(갱신여부, 계약체결일, 만기일자, 통화코드, 보험가입금액, 변액보험 여부, 유니버셜 여부, 연금개시일, 연금수령주기, 대출실행 가능 상품 여부, 피보험자수, 피보 험자번호, 피보험자명, 주피보험자 여부), 특약정보(특약명, 특약의 상태, 특약만기일자, 특약가입금액, 통화코드, 특약 의 유형), 증권별 보장정보(계약관계자구분, 피보험자계약 자관계, 담보, 담보특성, 회사담보일렬번호, 회사담보명, 담 보상태, 담보금액, 담보기간시작일자, 담보기간종료일자)
													</p>
												</li>
												<li>
													<strong>장기인 보험정보(피보험자)</strong>
													<p class="sub_box">
														보험계약정보(갱신여부, 계약체결일, 만기일자, 통화코드, 보험가입금액, 변액보험 여부, 유니버셜 여부, 계약자명, 주 피보험자 여부), 특약정보(특약명, 특약의 상태, 특약만기일 자, 특약가입금액, 통화코드, 특약의 유형), 증권별 보장정보 (계약관계자구분, 피보험자계약자관계, 담보, 담보특성, 회 사담보일렬번호, 회사담보명, 담보상태, 담보금액, 담보기간시작일자, 담보기간종료일자)
													</p>
												</li>
													<li>
													<strong>물및일반 보험정보(계약자)</strong>
													<p class="sub_box">
														보험계약정보(갱신여부, 계약체결일, 만기일자, 통화코드, 보험가입금액, 목적물수, 인/물 구분코드, 피보험인/물 번 호, 피보험인/물명, 주피보험자 여부, 소재지, 물건구분, 목 적물), 특약정보(특약명, 특약의 상태, 특약만기일자, 특약 가입금액, 통화코드, 특약의 유형), 증권별 보장정보(계약관 계자구분, 피보험자계약자관계, 담보, 담보특성, 회사담보 일렬번호, 회사담보명, 담보상태, 담보금액, 담보기간시작 일자, 담보기간종료일자)
													</p>
												</li>
												<li>
													<strong>물및일반 보험정보(피보험자)</strong>
													<p class="sub_box">
														보험계약정보(갱신여부, 계약체결일, 만기일자, 통화코드, 보험가입금액, 계약자명, 목적물수, 인/물 구분코드, 피보험 인/물 번호, 피보험인/물명, 주피보험자 여부, 소재지, 물건 구분, 목적물), 특약정보(특약명, 특약의 상태, 특약만기일 자, 특약가입금액, 통화코드, 특약의 유형), 증권별 보장정보 (계약관계자구분, 피보험자계약자관계, 담보, 담보특성, 회 사담보일렬번호, 회사담보명, 담보상태, 담보금액, 담보기 간시작일자, 담보기간종료일자)
													</p>
												</li>
												<li>
													<strong>자동차 보험정보(계약자)</strong>
													<p class="sub_box">
														계약정보(차량번호, 자동차보험 구분, 계약자 차량명, 보험 시기, 보험종기, 연령특약, 운전자한정특약, 자기차량손해, 자기부담금 구분, 자기부담금 금액), 납입정보(거래일시, 거 래번호, 자동차보험 보험료, 납입회차, 실납입 보험료, 수금 방법, 납입기관, 납입계좌번호)
													</p>
												</li>
												<li>
													<strong>자동차 보험정보(피보험자)</strong>
													<p class="sub_box">
														계약정보(차량번호, 자동차보험 구분, 계약자 차량명, 보험 시기, 보험종기, 연령특약, 운전자한정특약, 자기차량손해, 자기부담금 구분, 자기부담금 금액)
													</p>
												</li>
												<li>
													<strong>보험대출상품정보</strong>
													<p class="sub_box">
														기본정보(대출일, 만기일, 상환방식, 증권번호, 납입기관, 납 입계좌번호, 월상환일), 잔액정보(통화코드, 대출잔액, 대출 원금, 다음 이자 상환일), 이자 납입 및 대출원금 상환내역 (거래일시, 거래번호, 통화코드, 대출원금상환액, 이자납입 액, 이자적용시작일, 이자적용종료일, 적용이율, 이자종류)
													</p>
												</li>
												<li>
													<strong>DB형 퇴직연금 정보</strong>
													<p class="sub_box">
														기본정보(보유여부)
													</p>
												</li>
												<li>
													<strong>DC형 퇴직연금 정보</strong>
													<p class="sub_box">
														기본정보(계좌잔액, 계좌평가금액, 개설일), 거래내역(거래일시, 거래번호, 거래구분, 거래금액), 개별운용상품 정보(개별운용상품명, 상품가입번호, 상품유형, 평가금액, 납입(투자)원금, 보유좌수, 신규일, 만기일, 약정이자율)
													</p>
												</li>
												<li>
													<strong>개인형IRP 정보</strong>
													<p class="sub_box">
														기본정보(계좌잔액, 계좌평가금액, 사용자부담금, 가입자부담금, 개설일, 최초입금일, 최초 제도 가입일, 연금개시 시작(예정)일, 거래내역(거래일시, 거래번호, 거래구분, 거래금액), 개별운용상품 정보(개별운용상품명, 상품가입번호, 상품유형, 평가금액, 납입(투자)원금, 보유좌수, 신규일, 만기일, 약정이자율
													</p>
												</li>
											</ul>
										</div>

										<div class="com_box_type01 toggle_list_box2" v-if="viewEfin">
											<div data-ui-toggle="box" class="toggle_box_area"><!-- 활성화 class open -->
												<button type="button" class="view_btn" aria-expanded="false">
													<div class="new_tit_area">
														<div class="tit"><span>페이(전자금융)</span></div>
														<p class="top_sub_txt">선불발행정보</p>
													</div>
													<em class="open">열기</em>
													<em class="close">닫기</em>
												</button>
											</div>
											<ul class="view_cont list_type_info">
												<li>
													<p class="sub_box">
														선불잔액정보(총잔액, 충전포인트 잔액, 적립포인트 잔액, 출금가능액, 적립예정, 소멸예정), 자동충전정보(충전지불 수단 기관, 충전지불수단 식별키, 충전조건, 기준날짜, 기준 금액, 충전금액)
													</p>
												</li>
												<li>
													<strong>거래내역 정보</strong>
													<p class="sub_box">
														선불거래내역(거래유형, 거래일시, 거래번호, 거래금액, 거 래 후 잔액, 거래상대기관, 거래상대 식별키, 주문번호, 거래 메모, 가맹점명, 가맹점사업자등록번호, 상품(구매) 제목, 상 품(구매)분류, 결제방법, 정기결제여부)
													</p>
												</li>
												<li>
													<strong>결제수단 등록정보</strong>
													<p class="sub_box">
														결제수단 기관, 결제수단 식별코드, 결제수단 식별키, Primary 여부
													</p>
												</li>
												<li>
													<strong>결제내역 정보</strong>
													<p class="sub_box">
														결제유형, 주문번호, 결제일시, 결제번호, 통화코드, 결제금 액, 결제수단 기관, 결제수단 식별코드, 결제수단 식별키, 카 드승인번호, 카드명, 할부개월, 거래메모, 가맹점명, 가맹점 사업자등록번호, 상품제목, 상품분류, 결제방법
													</p>
												</li>
											</ul>
										</div>

										<div class="com_box_type01 toggle_list_box2" v-if="viewCapital">
											<div data-ui-toggle="box" class="toggle_box_area"><!-- 활성화 class open -->
												<button type="button" class="view_btn" aria-expanded="false">
													<div class="new_tit_area">
														<div class="tit"><span>할부금융</span></div>
														<p class="top_sub_txt">대출상품</p>
													</div>
													<em class="open">열기</em>
													<em class="close">닫기</em>
												</button>
											</div>
											<ul class="view_cont list_type_info">
												<li>
													<p class="sub_box">
														계좌정보(계좌번호,회차번호,상품명,계좌구분(코드),계좌상태(코드)), 기본정보(대출일,만기일,최종적용금리,월상환일,상환방식(코드),자동이체 기관(코드),상환계좌번호(자동이체)), 잔액정보(통화코드,대출잔액,대출원금,다음 이자 상환일), 거래내역(거래일시,거래번호,거래유형(코드),통화코드,거래금액,거래 후 대출잔액,거래금액 중 원금,거래금액 중 이자,환출이자,이자적용수,이자적용목록,이자적용시작일,이자적용종료일,적용이율,이자금액,이자종류(코드))
													</p>
												</li>
												<li>
													<strong>운용리스</strong>
													<p class="sub_box">
														기본정보(대출일,만기일,월상환일,상환방식(코드),자동이체 기관(코드),상환계좌번호(자동이체),다음 납입예정일), 거래내역(거래일시,거래번호,거래유형(코드),거래금액)
													</p>
												</li>
											</ul>
										</div>

										<div class="com_box_type01 toggle_list_box2" v-if="viewTelecom">
											<div data-ui-toggle="box" class="toggle_box_area"><!-- 활성화 class open -->
												<button type="button" class="view_btn" aria-expanded="false">
													<div class="new_tit_area">
														<div class="tit"><span>통신</span></div>
														<p class="top_sub_txt">통신 정보</p>
													</div>
													<em class="open">열기</em>
													<em class="close">닫기</em>
												</button>
											</div>
											<ul class="view_cont list_type_info">
												<li>
													<p class="sub_box">
														기본정보(계약관리번호,가입번호,통신구분 (코드),가입구분 (코드)), 청구정보(청구년월,청구금액,납부예정일자), 납부정보(납부년월,납부금액,납부수단 (코드)), 결제정보(이용일시,결제금액,가맹점명,결제상품명)
													</p>
												</li>
											</ul>
										</div>

										<div class="com_box_type01 toggle_list_box2" v-if="viewUsury">
											<div data-ui-toggle="box" class="toggle_box_area"><!-- 활성화 class open -->
												<button type="button" class="view_btn" aria-expanded="false">
													<div class="new_tit_area">
														<div class="tit"><span>대부</span></div>
														<p class="top_sub_txt">금전대부 정보</p>
													</div>
													<em class="open">열기</em>
													<em class="close">닫기</em>
												</button>
											</div>
											<ul class="view_cont list_type_info">
												<li>
													<p class="sub_box">
														기본정보(채권번호,기관분류(코드),채권인수일/특수채권편입일/최초대출일,최초대출기관), 잔액정보(직전채권인계기관,채무조정여부,상환방식(코드),대출잔액,대출원금),  거래내역(거래일시 또는 거래일자,거래번호,거래금액,거래 후 대출잔액,거래금액 중 이자,거래금액 중 원금)
													</p>
												</li>
											</ul>
										</div>

										<div class="com_box_type01 toggle_list_box2" v-if="viewP2p">
											<div data-ui-toggle="box" class="toggle_box_area"><!-- 활성화 class open -->
												<button type="button" class="view_btn" aria-expanded="false">
													<div class="new_tit_area">
														<div class="tit"><span>P2P</span></div>
														<p class="top_sub_txt">P2P 대출 정보</p>
													</div>
													<em class="open">열기</em>
													<em class="close">닫기</em>
												</button>
											</div>
											<ul class="view_cont list_type_info">
												<li>
													<p class="sub_box">
														목록정보(대출계약번호,상품유형(코드),대출계약금액,대출일), 기본정보(보만기일,대출금리,상환방식(코드),부동산담보LTV 비율), 잔액정보(대출잔액,다음 상환회차,다음 상환일,예정원금,예정이자),  거래내역(상환일시,상환 회차,상환유형(코드),상환금액,상환금액 중 원금,상환금액 중 이자)
													</p>
												</li>
											</ul>
										</div>
										
									</li>
								</ul>
							</dd>
							<dt>정기적 전송여부</dt>
							<dd>
								<span>금융자산은 주1회, 공공정보는 월1회</span>
								<ul class="com_radio_chk free">
									<li v-for="(item , idx) in schduledItem" :key="idx">
										<div class="btn_radio">
											<input type="radio" v-model="selectScheduledItem" :value="item" name="yn" :id="'yn'+idx">
											<label :for="'yn'+idx" role="radio" :aria-checked="item.isScheduled === selectScheduledItem.isScheduled ? true : false">
												<span>{{item.scheduledTxt}}</span>
											</label>
										</div>
									</li>
								</ul>
							</dd>
							<dt>전송요구 유효기간</dt>
							<dd>
								<ul class="com_radio_chk free">
									<li v-for="(item,idx) in expDateItem" :key="idx">
										<div class="btn_radio">
											<input type="radio" v-model="selectExpDate" :value="item" name="radio1" :id="'radio1'+idx">
											<label :for="'radio1'+idx" role="radio" :aria-checked="item.expDateValue ===  selectExpDate.expDateValue ? true : false">
												<span>{{item.expDateTxt}}</span>
											</label>
										</div>
									</li>
								</ul>
							</dd>
							<!-- 20230703 재산세 납세 기관 추가 jlee -->
							<template v-if="viewL161Item">
								<dt>재산세 납세 기관</dt>
								<dd>
									<ul class="layoutBox">
										<li class="left">
											<div class="com_btnselectbox_type01 custom_box">
												<button type="button" class="com_btnselect_type01" style="color:#666" title="시/도 선택" @click="openCityPopup">{{selectCityName || '시/도 선택'}}</button>
											</div>
										</li>
										<li class="center"></li>
										<li class="right">
											<div class="com_btnselectbox_type01 custom_box">
												<button type="button" class="com_btnselect_type01" style="color:#666" title="구/군 선택" @click="openCityCountryPopup()">{{selectCityCountryName || '구/군 선택'}}</button>
											</div>
										</li>
									</ul>
								</dd>
							</template>
							<template v-if="viewBank || viewEfin || viewCard || viewTelecom || viewInvest">
								<!--// 20230703 재산세 납세 기관 추가 jlee -->
								<dt>선택 정보의 전송 동의</dt>
								<dd>
									<div ref="agreeChoiceInfo" class="custom_terms inTxt mt10" v-if="viewBank || viewEfin || viewInvest"><!-- 20230630 구분class inTxt추가 jlee -->
										<div class="new_check_all">
											<span class="btn_check">
												<input type="checkbox" name="allagree" id="check03" v-model="agreeAccountSummary">
												<label for="check03">
													<span>적요 또는 거래메모 </span>
												</label>
											</span>
										</div>
										<div class="new_agree_list">
											<p class="custom_terms_txt">송금인/수취인명 정보 등 본인의 사생활 및 경제활동 등에 관련된 상세한 정보가 포함되어 있습니다</p>
										</div>
									</div>
									<div class="custom_terms inTxt" v-if="viewCard || viewEfin || viewTelecom"> <!-- 20230630 구분class inTxt추가 jlee -->
										<div class="new_check_all">
											<span class="btn_check">
												<input type="checkbox" name="allagree" id="check01" v-model="agreeFranchiseInfo">
												<label for="check01">
													<span>가맹점명 및 사업자등록번호</span>
												</label>
											</span>
										</div>
										<div class="new_agree_list">
											<p class="custom_terms_txt">본인의 소비생활 등에 관련된 상세한 정보가 포함되어 있습니다.</p>
										</div>
									</div>
									<div class="custom_terms inTxt" v-if="viewEfin"> 
										<div class="new_check_all">
											<span class="btn_check">
												<input type="checkbox" name="allagree" id="check02" v-model="agreeCategory">
												<label for="check02">
													<span>상품구매 카테고리 </span>
												</label>
											</span>
										</div>
										<div class="new_agree_list">
											<p class="custom_terms_txt">실제 구매한 상품이 아닌 해당 상품의 13가지 항목의 카테고리가 포함되어 있습니다.</p>
										</div>
									</div>
								</dd>
							</template>
						</dl>
					</div>
					<div class="custom_terms error mt30" :class="fn_chkEssentialAgr" ref="essentialAgr"><!-- 필수입력 미체크시 class error -->
						<div class="new_check_all">
							<span class="btn_check">
								<input type="checkbox" name="allagreeAll" id="checkall" v-model="agreePersonalInfo" @change="fn_isEssentialChk()">
								<label for="checkall">
									<span>[필수] 개인(신용)정보 수집ㆍ이용 동의</span>
								</label>
							</span>
							<div class="error_message" aria-live="polite" >
								<em class="blind">개인(신용)정보 수집 이용 동의</em><!-- 10/05 jlee 접근성 수정 -->
								<p>체크해 주세요</p>
							</div>
						</div>
					</div>
					<p class="error_meg" aria-live="assertive" role="alert" v-if="!this.chkEssentialAgr && !this.isFirstChk">동의가 꼭 필요해요</p>
				</div>
			</div>
			
		</div>
		<div class="popup_footer fixed last_move">
			<div class="btn_full_box">
				<a class="btn btn_mint btn_move_hide" id="term_btn"><span class="btn_down_arrow">끝까지 내려 보기</span></a>
				<a class="btn btn_mint" @click="fn_moveNext()">동의하고 다음</a>
			</div>
		</div>
		<a class="btn_close" @click="fn_close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// 전체 팝업 종료 -->
</template>
<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import appService from '@/service/appService'
import modalService from '@/service/modalService'
import moment from 'moment'
import store from '@/store'
import _ from 'lodash'
import {dateFormat, monthAdd} from '@/utils/date'

import COAR2003 from '@/views/page/CO/AR/COAR2003/COAR2003.vue'	//인증 방법 선택
//import COAR2011 from '@/views/page/CO/AR/COAR2011/COAR2011.vue'
import COAR2013 from '@/views/page/CO/AR/COAR2013/COAR2013.vue' //선택정보 수집ㆍ이용 동의 재확인 팝업

import COAR2015 from '@/views/page/CO/AR/COAR2015/COAR2015.vue' //시/도 선택
import COAR2016 from '@/views/page/CO/AR/COAR2016/COAR2016.vue' //시/군구 선택

import COAR2007 from '@/views/page/CO/AR/COAR2007/COAR2007.vue'
import COAR2021 from '@/views/page/CO/AR/COAR2021/COAR2021.vue'

import COAR2006 from '@/views/page/CO/AR/COAR2006/COAR2006.vue'

export default {
    name : "COAR2009",
    data: () => {
        return {
			userAgreeInfo	: {},	// 사용자 동의 정보
			orgTotScopeList	: [],	// 기관 통합 스코프 리스트
			selOrgAsetList	: [],	// 선택 기관 내 전체 자산 리스트
			org_fail_list	: [],	// 연결 실패 기관 리스트
			selectList		: [],	// '기관연결 완료 및 금융자산 선택' 팝업 내 자산 선택 리스트
			selectedCnt		: 0,	// 자산 선택 리스트 길이
			certDsc			: "",	// 인증방법구분 (공동인증 : joint, 금융인증 : finance, 패스인증 : pass)
			attcC			: "",	// 인증코드(NonceCode)
			attcCext		: "",	// 인증코드(NonceCode)
			signListOne     : [],
			signListTwo     : [],
			signedDataList	: [],
			caOrgOne		: "",
			caOrgTwo		: "",

			isMramMod		: "",
			isBckYn			: false,
			moduleList		: [],
			asetJson		: {},
			bank_list 		: [],
			card_list 		: [],
			invest_list 	: [],
			insu_list 		: [],
			efin_list 		: [],
			capital_list 	: [],
			ginsu_list 		: [],
			telecom_list 	: [],
			usury_list 		: [],
			bond_list 		: [],
			p2p_list 		: [],
			maxCnt			: 99,	// 직접 선택가능한 최대 자산 개수

			sortList : [],

			today 			: dateFormat(new Date(), "YYYY-MM-DD"),
			defExpDate 		: dateFormat(moment().add('365', 'days'), 'YYYY-MM-DD'),	// 기본 전송요구 유효기간 설정 (1년)

			expDateItem : [],		// 전송요구 목록
			selectExpDate : {},		// 선택한 전송요구 기한
			

			ca_org_type		: "",
			ca_org_name		: "",

			btnViewYn    	: true,
			dateShowYn		: false,


			schduledItem 	: [],		// 정기적 전송 여부 목록
			isScheduled		: "",		// 정기적 전송 여부 (true : 주1회, false : 전송하지않음)
			isScheduledTxt	: "",		// 정기적 전송 여부에 따른 텍스트
			selectScheduledItem : {},  //선택한 정기적 전송 여부

			checkedList		: [],

			viewBank 			: false,	// 은행업권 신용거래정보 영역
			viewInvest 			: false,	// 증권업권 신용거래정보 영역
			viewCard 			: false,	// 카드업권 신용거래정보 영역
			viewInsu 			: false,	// 보험업권 신용거래정보 영역
			viewEfin 			: false,	// 전자금융업권 신용거래정보 영역
			viewCapital 		: false,	// 할부업권 신용거래정보 영역
			viewGinsu 			: false,	// 보증보험업권 신용거래정보 영역
			viewTelecom 		: false,	// 통신업권 신용거래정보 영역
			viewUsury 			: false,	// 대부업권 신용거래정보 영역
			viewBond 			: false,	// 채권업권 신용거래정보 영역
			viewP2p 			: false,	// P2P업권 신용거래정보 영역
			viewPublic			: false, // 공공업권 신용거래정보 영역

			viewL161Item		: false, //공공업권 중 지방세세목별과세(납세)증명서(재산세) 선택 여부 체크용
			selectCity 				: "" ,   // L161 재산세 선택 시 선택한 시도 코드
			selectCityName 			: "" ,   // L161 재산세 선택 시 선택한 시도 명

			selectCityCountry 		: "" ,   // L161 재산세 선택 시 선택한 시군구 코드
			selectCityCountryName 	: "" ,   // L161 재산세 선택 시 선택한 시군구 명

			selPublicCertList   : "",   //사용자가 선택한 증명서 목록

			agreePersonalInfo 	: null,	// 개인(신용정보) 수집.이용 동의
			agreeAccountSummary : null,	// '적요 또는 거래메모' 수집동의
			agreeFranchiseInfo	: null,	// '가맹점명 및 사업자등록번호' 수집동의
			agreeCategory 		: null,	// '상품구매 카테고리' 수집동의

			chkEssentialAgr : null,	// 필수 동의정보 체크여부
			isFirstChk		: true,	// 다음버튼 첫 클릭 여부

			// 세션 체크 타이머
			sessionTimerAuthor : null,

			consentArray 	: [],	// PASS인증용 파라미터
        }
	},
    mounted() {
		this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)     
    },
    mixins: [
		commonMixin,
        popupMixin
	],
	computed:{
		fn_chkEssentialAgr() {
			return !this.chkEssentialAgr && !this.isFirstChk ? 'error' : ''
		}
	},
    methods: {
        initComponent(param = {}) {
			this.userAgreeInfo 		= param.userAgreeInfo || {}
			this.orgTotScopeList 	= param.orgTotScopeList || []
			this.selOrgAsetList		= param.selOrgAsetList || []
			this.org_fail_list		= param.org_fail_list || []
			this.selectList 		= param.selectList || []			
			this.selectedCnt 		= param.selectedCnt || 0
			this.ca_org_type		= param.ca_org_type || ""
			this.ca_org_name		= param.ca_org_name || ""
			this.attcC				= param.attcC || ""
			this.attcCext			= param.attcCext || " "
			this.certDsc			= param.certDsc || ""

			this.isMramMod			= param.isMramMod || ""
			this.isBckYn			= param.isBckYn ? true : false

			if(this.isMramMod === '2' && this.isBckYn) {
				// '연결기관관리' -> 만료일 수정으로 넘어오고 기관별 백업데이터가 모두 존재할 경우
				// this.moduleList 	= param.moduleList || []

				// this.getArrayMRAM()
			}


			//// 전송요구 유효기간 DATASET ////
			this.expDateItem = [
				{expDateValue : monthAdd(6, this.today, "YYYY-MM-DD"),expDateTxt : '6개월'}   					// 현재일 기준 6개월 후 년월일
				,{expDateValue : monthAdd(9, this.today, "YYYY-MM-DD") ,expDateTxt : '9개월'}					// 현재일 기준 9개월 후 년월일
				,{expDateValue : dateFormat(moment().add('365', 'days'), 'YYYY-MM-DD') ,expDateTxt : '1년' }    // 현재일 기준 1년 후 년월일
			],

			//// 정기적 전송여부 DATASET ////
			this.schduledItem = [
				{scheduledTxt : '아니오' , isScheduled : false}
				,{scheduledTxt : '예' , isScheduled : true}
			],
			
			Object.assign(this.selectExpDate,  {expDateValue : dateFormat(moment().add('365', 'days'), 'YYYY-MM-DD') ,expDateTxt : '1년' }) //Default 세팅
			Object.assign(this.selectScheduledItem,  {scheduledTxt : '예' , isScheduled : true}) //Default 세팅

            this.getData()
        },
        getData() {
			// 리스트 내 업권 별 신용거래정보 영역 보이기 여부 컨트롤
			for(const selItem of this.selectList) {
				switch(selItem.org_biz_code) {
					case "bank" 	: this.viewBank 	= true; break;	// 은행
					case "card" 	: this.viewCard 	= true; break;	// 카드
					case "invest" 	: this.viewInvest 	= true; break;	// 투자
					case "insu" 	: this.viewInsu 	= true; break;	// 보험
					case "ginsu" 	: this.viewGinsu 	= true; break;	// 보증보험
					case "efin" 	: this.viewEfin 	= true; break;	// 전자금융
					case "capital" 	: this.viewCapital 	= true; break;	// 할부금융
					case "telecom" 	: this.viewTelecom 	= true; break;	// 통신
					case "usury" 	: this.viewUsury 	= true; break;	// 대부
					case "bond" 	: this.viewBond 	= true; break;	// 채권
					case "p2p" 		: this.viewP2p 		= true; break;	// P2P
					case "public" 	: this.viewPublic 	= true; break;	// 공공
					default : break;
				}
			}

			if(this.viewPublic) this.fn_getCertList(this.selectList.filter(item=> item.org_biz_code === 'public'));


			this.$nextTick(() => {
				this.callJQueryFncExcute()
			})
		},

		//사용자가 선택한 공공기관 증명서 목록 추출 및  L161 - 지방세 세목별과세(납세)증명서(재산세) 보유 여부 확인
		fn_getCertList(publicList){
			this.viewL161Item = publicList.find(item => item.key === 'L161') ? true : false
			this.selPublicCertList = publicList.map(item => {return item.cert_nm}).join(",")
		},

		// 시/도 선택 팝업 open
		openCityPopup(){
			const config = {
				renderer : {
					component : COAR2015
				}
			}
			modalService.openSlidePagePopup(config).then(res => {
				this.selectCity = res.comnCVal
				this.selectCityName = res.comnCExpl
				if(this.selectCity) this.openCityCountryPopup(this.selectCity)
			})
		},

		// 시/군/구 선택 팝업 open
		openCityCountryPopup(param){

			if(!this.selectCity) {
				modalService.alert('시/도 지역부터 선택해주세요.');
				return;
			}

			const config = {
				renderer : {
					component : COAR2016
				},
				params : {
					selectCity : param || this.selectCity
				}
			}
			modalService.openSlidePagePopup(config).then(res => {
				this.selectCityCountry = res.comnCVal
				this.selectCityCountryName = res.comnCExpl
			})

		},


		// 선택 기관명 set
		fn_setOrgnm() {
			let tmpOrgnm = ""
			let cnt = 0
			for(const item of this.orgTotScopeList) {
				if(item.org_name === undefined || item.org_name === "" || item.org_name === null) continue
				if(cnt !== 0) {
					tmpOrgnm += ", " + item.org_name
				} else if (cnt === 0){
					tmpOrgnm += item.org_name
				}
				cnt++
			}

			return tmpOrgnm
		},

		// 필수 동의 정보 체크 여부 확인
		fn_isEssentialChk() {
			if(this.agreePersonalInfo) {
				this.chkEssentialAgr = true
			}
		},
		
		// 다음버튼 클릭
		fn_moveNext() {
			// 첫 클릭 여부 false 변경
			this.isFirstChk = false

			//재산세 납세 기관 요청 필수 값 체크
			if(this.viewL161Item){
				if(!this.selectCity) {
					modalService.alert('시/도 지역을 선택해주세요.');
					return;
				}

				if(!this.selectCityCountry) {
					modalService.alert('시/군/구 지역을 선택해주세요.');
					return;
				}

			}
			// 필수 동의 여부 확인
			if(!this.agreePersonalInfo) {
				this.chkEssentialAgr = false

				// 포커스 및 스크롤 이동
				this.$nextTick(() => {
					let scrollHeight = this.$refs.term_scroll.scrollHeight
					let clientHeight = this.$refs.term_scroll.clientHeight
					let scrollTop = this.$refs.term_scroll.scrollTop

					if(Math.ceil(clientHeight + scrollTop) <= scrollHeight) {
						let $cont = $("[id='term_scroll']")
						let $conIdx = $cont.length - 1

						$($cont[$conIdx]).animate({scrollTop : scrollHeight - clientHeight}, 500)
					}

					this.$refs.essentialAgr.focus()
				})
			} else {
				if(this.viewBank || this.viewEfin || this.viewCard || this.viewTelecom) {
					// 선택정보의 전송동의를 체크해야하는 경우 (은행, 전금, 카드, 통신 업권 중 하나라도 포함할 경우)
					console.log("적요 :: ", this.agreeAccountSummary)
					console.log("가맹점 :: ", this.agreeFranchiseInfo)
					console.log("카테고리 :: ", this.agreeCategory)
					console.log("선택 기관 내 전체 자산 리스트 :: ", this.selOrgAsetList)
					// 선택 정보의 전송동의 각각의 사용여부와 체크여부 확인
					let isAccSummYn = (this.viewBank || this.viewEfin || this.viewInvest) && !this.agreeAccountSummary ? true : false,
						isFranchInfoYn = (this.viewCard || this.viewEfin || this.viewTelecom) && !this.agreeFranchiseInfo ? true : false,
						isCateYn = (this.viewEfin) && !this.agreeCategory ? true : false

					if(isAccSummYn || isFranchInfoYn || isCateYn) {
						const config = {
							params : {
								isAccSummYn : isAccSummYn,
								isFranchInfoYn : isFranchInfoYn,
								isCateYn : isCateYn
							},
							renderer : {
								component : COAR2013
							}
						}
						modalService.openSlidePagePopup(config).then(response => {
							if(response !== 'no') {	// 슬라이드팝업 내 '선택 정보 동의'로 리턴될 경우
								if(this.viewBank || this.viewEfin || this.viewInvest) this.agreeAccountSummary = response.agreeAccountSummary || null
								if(this.viewCard || this.viewEfin || this.viewTelecom) this.agreeFranchiseInfo = response.agreeFranchiseInfo || null
								if(this.viewEfin) this.agreeCategory = response.agreeCategory || null

								// 인증했던 방법 확인 후 다음 프로세스로 진행
								this.chkCertWay()
							} else {	
								// 슬라이드팝업 내 '아니오'로 리턴될 경우
								// 인증했던 방법 확인 후 다음 프로세스로 진행
								this.chkCertWay()
							}
						})
					} else {
						// 모두 동의하였을 경우 다음 프로세스로 진행
						//1차인증 방법 없는 경우 (공공기관만 선택 , 기 연결된 기관만 선택한 CASE)
						this.chkCertWay()
						
					}
				} else {
					// 선택정보의 전송동의를 체크하지않을 경우 (은행, 전금, 카드, 통신 업권을 포함하지 않을 경우)
					// 다음 프로세스 바로 진행
					
					//1차인증 방법 없는 경우 (공공기관만 선택 , 기 연결된 기관만 선택한 CASE)
					this.chkCertWay()
					
				}
			}
		},


		chkCertWay(){
			if(!this.certDsc){
				//1차 인증 방법 미 선택 시 인증 방법 선택창 open
				const config = {component : COAR2003, 	
								params : {isJustSelectCert : true}
							}
				modalService.openPopup(config).then((response) => {
					this.certDsc = response
					this.fn_runNextProcess()
				})
			}else{
				this.fn_runNextProcess()
			}
		},


		// 다음 프로세스 진행
		fn_runNextProcess() {
			console.log("종료시점 :: ", this.selectExpDate.expDateValue, "정기전송 :: ", this.selectScheduledItem.isScheduled)

			// 정기적 전송여부 및 전송요구 유효기간 insert
			for(let i=0; i<this.orgTotScopeList.length; i++) {
				this.orgTotScopeList[i].end_period = this.selectExpDate.expDateValue.split("-").join("")
				this.orgTotScopeList[i].is_scheduled = this.selectScheduledItem.isScheduled ? "true" : "false"
			}

			// asis) COAR0012 내 동의정보 in 메소드 포함
			// 적요 또는 거레메모 관련 동의정보
			if(this.viewBank || this.viewEfin || this.viewInvest) {
				for(let i=0; i<this.orgTotScopeList.length; i++) {
					if(this.orgTotScopeList[i].org_biz_code === 'bank' || this.orgTotScopeList[i].org_biz_code === 'efin' || this.orgTotScopeList[i].org_biz_code === 'invest') {
						Object.assign(this.orgTotScopeList[i] , {is_consent_trans_memo : (!this.agreeAccountSummary || this.agreeAccountSummary === null) ? "false" : "true" })
						//this.orgTotScopeList[i].is_consent_trans_memo = (!this.agreeAccountSummary || this.agreeAccountSummary === null) ? "false" : "true"
					}
				}
			}

			// 가맹점명 및 사업자등록번호 관련 동의정보
			if(this.viewCard || this.viewEfin || this.viewTelecom) {
				for(let i=0; i<this.orgTotScopeList.length; i++) {
					if(this.orgTotScopeList[i].org_biz_code === 'card' || this.orgTotScopeList[i].org_biz_code === 'efin' || this.orgTotScopeList[i].org_biz_code === 'telecom') {
						Object.assign(this.orgTotScopeList[i] , {is_consent_merchant_name_regno : (!this.agreeFranchiseInfo || this.agreeFranchiseInfo === null) ? "false" : "true" })
						//this.orgTotScopeList[i].is_consent_merchant_name_regno = (!this.agreeFranchiseInfo || this.agreeFranchiseInfo === null) ? "false" : "true"
					}
				}
			}

			// 상품구매 카테고리 관련 동의정보
			if(this.viewEfin) {
				for(let i=0; i<this.orgTotScopeList.length; i++) {
					if(this.orgTotScopeList[i].org_biz_code === 'efin') {
						Object.assign(this.orgTotScopeList[i] , {is_consent_trans_category : (!this.agreeCategory || this.agreeCategory === null) ? "false" : "true"})
						//this.orgTotScopeList[i].is_consent_trans_category = (!this.agreeCategory || this.agreeCategory === null) ? "false" : "true"
					}
				}
			}

			if(this.certDsc === "joint") {
				if(this.isMramMod === '' || !this.isBckYn) {
					// 공동인증서 약관 동의 완료 후 2차인증 시작
					const config_2 = {
						component : COAR2006,
						params : {
							userAgreeInfo 	: this.userAgreeInfo,
							orgTotScopeList : this.orgTotScopeList,
							selOrgAsetList	: this.selOrgAsetList,
							org_fail_list	: this.org_fail_list,
							selectList 		: this.selectList,
							end_period 		: dateFormat(this.selectExpDate.expDateValue, "YYYYMMDD"),
							selectedCnt		: _.uniqBy(this.selectList , 'org_code').length,
							ca_org_name 	: this.ca_org_name,
							isFirstStepYn 	: false,					// 2차인증 flag
							isMramMod		: this.isMramMod,
							isBckYn			: this.isBckYn,
							selectCityCountry : this.selectCityCountry,
						}

					}
					modalService.openPopup(config_2).then(response => {
						console.log(response)
					})
					
				} else {
					// 변경 인증 프로세스 간소화의 경우 공동인증동의정보 슬라이드 띄우지 않고 공동인증서 선택 화면으로
					const config_2 = {
						component : COAR2006,
						params : {
							userAgreeInfo 	: this.userAgreeInfo,
							orgTotScopeList : this.orgTotScopeList,
							selOrgAsetList	: this.selOrgAsetList,
							org_fail_list	: this.org_fail_list,
							selectList 		: this.selectList,
							end_period 		: dateFormat(this.selectExpDate.expDateValue, "YYYYMMDD"),
							selectedCnt		: _.uniqBy(this.selectList , 'org_code').length,
							ca_org_name 	: this.ca_org_name,
							isFirstStepYn 	: false,					// 2차인증 flag
							isMramMod		: this.isMramMod,
							isBckYn			: this.isBckYn,
						}
					}
					modalService.openPopup(config_2).then(response => {
						console.log(response)
					})
				}
			} else if(this.certDsc === "finance" || this.certDsc === "pass"){
				// 금융인증 경우 별도 약관없이 2차인증 시작
				// 마이데이터사업자 통합인증 인증코드 생성
				const config = {
					url : "/co/ar/05r01",
					data : {
						svcnm 	: "서비스명",
						orgC 	: ""
					}
				}
				apiService.call(config).then(response => {
					console.log('금융인증 or PASS 전 nonce값 확인', response)
					this.attcC 		= response.attcC || ''
					this.attcCext 	= response.attcCext || ''
					this.fn_financeSign()
				})
			}
		},

		// 금융인증 & PASS인증 2차 프로세스
		fn_financeSign() {
			// 사설인증 웹뷰 세션 연장 처리
			this.startSessionTimerAuth()

			console.log("금융인증 전자서명 전")
			let consent = {}
			let content = []
			for(let i=0; i<this.orgTotScopeList.length; i++) {
				consent = {}
				if(this.orgTotScopeList[i].is_scheduled === "true") {
					// 정기적전송여부 true
					if(this.orgTotScopeList[i].org_biz_code === 'bank') {
						// 은행업권
						consent = {
							"snd_org_code" : this.orgTotScopeList[i].snd_org_code
							, "rcv_org_code" : "ZVAAAZ0000"
							, "is_scheduled" : "true"
							, "fnd_cycle" : "1/w"
							, "add_cycle" : "1/w"
							, "end_date" : this.orgTotScopeList[i].end_period
							, "purpose" : "전송요구를 통한 본인신용정보 통합조회 서비스의 이용"
							, "period" : "99991231"
							, "target_info" : this.orgTotScopeList[i].target_info
							, "is_consent_trans_memo" : this.orgTotScopeList[i].is_consent_trans_memo
						}
					} else if(this.orgTotScopeList[i].org_biz_code === 'card' || this.orgTotScopeList[i].org_biz_code === 'telecom') {
						// 카드업권, 통신업권
						consent = {
							"snd_org_code" : this.orgTotScopeList[i].snd_org_code
							, "rcv_org_code" : "ZVAAAZ0000"
							, "is_scheduled" : "true"
							, "fnd_cycle" : "1/w"
							, "add_cycle" : "1/w"
							, "end_date" : this.orgTotScopeList[i].end_period
							, "purpose" : "전송요구를 통한 본인신용정보 통합조회 서비스의 이용"
							, "period" : "99991231"
							, "target_info" : this.orgTotScopeList[i].target_info
							, "is_consent_merchant_name_regno" : this.orgTotScopeList[i].is_consent_merchant_name_regno
						}
					} else if(this.orgTotScopeList[i].org_biz_code === 'efin') {
						// 전금업권
						consent = {
							"snd_org_code" : this.orgTotScopeList[i].snd_org_code
							, "rcv_org_code" : "ZVAAAZ0000"
							, "is_scheduled" : "true"
							, "fnd_cycle" : "1/w"
							, "add_cycle" : "1/w"
							, "end_date" : this.orgTotScopeList[i].end_period
							, "purpose" : "전송요구를 통한 본인신용정보 통합조회 서비스의 이용"
							, "period" : "99991231"
							, "target_info" : this.orgTotScopeList[i].target_info
							, "is_consent_trans_memo" : this.orgTotScopeList[i].is_consent_trans_memo
							, "is_consent_merchant_name_regno" : this.orgTotScopeList[i].is_consent_merchant_name_regno
							, "is_consent_trans_category" : this.orgTotScopeList[i].is_consent_trans_category
						}
					}else if (this.orgTotScopeList[i].org_biz_code === 'public'){

						//요청 공공기관 증명서 중  지방세세목별과세(납세)증명서(재산세) 포함 시
						if(this.orgTotScopeList[i].target_info.length < 1) continue
						for(const asetItem of this.orgTotScopeList[i].target_info[0].asset_list){
							if(asetItem.asset === 'L161' && this.selectCityCountry){
								asetItem.rpSfgvGruC = this.selectCityCountry
							}
						}

						// 공공업권
						consent = {
							"snd_org_code" : this.orgTotScopeList[i].snd_org_code
							, "rcv_org_code" : "ZVAAAZ0000"
							, "is_scheduled" : "true"
							, "fnd_cycle" : "1/m"
							, "add_cycle" : "1/m"
							, "end_date" : this.orgTotScopeList[i].end_period
							, "purpose" : "전송요구를 통한 공공마이데이터 통합조회 서비스의 이용"
							, "period" : "99991231"
							, "target_info" : this.orgTotScopeList[i].target_info
							, "orgBzrgC"  : "public"
						}
					} else {
						// 그 외
						consent = {
							"snd_org_code" : this.orgTotScopeList[i].snd_org_code
							, "rcv_org_code" : "ZVAAAZ0000"
							, "is_scheduled" : "true"
							, "fnd_cycle" : "1/w"
							, "add_cycle" : "1/w"
							, "end_date" : this.orgTotScopeList[i].end_period
							, "purpose" : "전송요구를 통한 본인신용정보 통합조회 서비스의 이용"
							, "period" : "99991231"
							, "target_info" : this.orgTotScopeList[i].target_info
						}
					}
				} else {
					// 정기적전송여부 false
					if(this.orgTotScopeList[i].org_biz_code === 'bank') {
						// 은행업권
						consent = {
							"snd_org_code" : this.orgTotScopeList[i].snd_org_code
							, "rcv_org_code" : "ZVAAAZ0000"
							, "is_scheduled" : "false"
							// , "fnd_cycle" : "1/w"
							// , "add_cycle" : "1/w"
							, "end_date" : this.orgTotScopeList[i].end_period
							, "purpose" : "전송요구를 통한 본인신용정보 통합조회 서비스의 이용"
							, "period" : "99991231"
							, "target_info" : this.orgTotScopeList[i].target_info
							, "is_consent_trans_memo" : this.orgTotScopeList[i].is_consent_trans_memo
						}
					} else if(this.orgTotScopeList[i].org_biz_code === 'card' || this.orgTotScopeList[i].org_biz_code === 'telecom') {
						// 카드업권, 통신업권
						consent = {
							"snd_org_code" : this.orgTotScopeList[i].snd_org_code
							, "rcv_org_code" : "ZVAAAZ0000"
							, "is_scheduled" : "false"
							// , "fnd_cycle" : "1/w"
							// , "add_cycle" : "1/w"
							, "end_date" : this.orgTotScopeList[i].end_period
							, "purpose" : "전송요구를 통한 본인신용정보 통합조회 서비스의 이용"
							, "period" : "99991231"
							, "target_info" : this.orgTotScopeList[i].target_info
							, "is_consent_merchant_name_regno" : this.orgTotScopeList[i].is_consent_merchant_name_regno
						}
					} else if(this.orgTotScopeList[i].org_biz_code === 'efin') {
						// 전금업권
						consent = {
							"snd_org_code" : this.orgTotScopeList[i].snd_org_code
							, "rcv_org_code" : "ZVAAAZ0000"
							, "is_scheduled" : "false"
							// , "fnd_cycle" : "1/w"
							// , "add_cycle" : "1/w"
							, "end_date" : this.orgTotScopeList[i].end_period
							, "purpose" : "전송요구를 통한 본인신용정보 통합조회 서비스의 이용"
							, "period" : "99991231"
							, "target_info" : this.orgTotScopeList[i].target_info
							, "is_consent_trans_memo" : this.orgTotScopeList[i].is_consent_trans_memo
							, "is_consent_merchant_name_regno" : this.orgTotScopeList[i].is_consent_merchant_name_regno
							, "is_consent_trans_category" : this.orgTotScopeList[i].is_consent_trans_category
						}
					}else if (this.orgTotScopeList[i].org_biz_code === 'public'){
						
						if(this.orgTotScopeList[i].target_info.length < 1) continue
						//요청 공공기관 증명서 중  지방세세목별과세(납세)증명서(재산세) 포함 시
						for(const asetItem of this.orgTotScopeList[i].target_info[0].asset_list){
							if(asetItem.asset === 'L161' && this.selectCityCountry){
								asetItem.rpSfgvGruC = this.selectCityCountry
							}
						}
						// 공공업권
						consent = {
							"snd_org_code" : this.orgTotScopeList[i].snd_org_code
							, "rcv_org_code" : "ZVAAAZ0000"
							, "is_scheduled" : "false"
							, "end_date" : this.orgTotScopeList[i].end_period
							, "purpose" : "전송요구를 통한 공공마이데이터 통합조회 서비스의 이용"
							, "period" : "99991231"
							, "target_info" : this.orgTotScopeList[i].target_info
							, "orgBzrgC"  : "public"
						}
					}else {
						// 그 외
						consent = {
							"snd_org_code" : this.orgTotScopeList[i].snd_org_code
							, "rcv_org_code" : "ZVAAAZ0000"
							, "is_scheduled" : "false"
							// , "fnd_cycle" : "1/w"
							// , "add_cycle" : "1/w"
							, "end_date" : this.orgTotScopeList[i].end_period
							, "purpose" : "전송요구를 통한 본인신용정보 통합조회 서비스의 이용"
							, "period" : "99991231"
							, "target_info" : this.orgTotScopeList[i].target_info
						}
					}
				}
				// 저렇게 표현....
				content.push(
					{
						"orgCode" : this.orgTotScopeList[i].snd_org_code,
						"ucpidRequestInfo" : {
							"ucpidNonce" : this.attcC, 
							"userAgreement" : "금융분야 마이데이터 통합인증을 위한 인증서 본인확인서비스 이용약관, 개인정보처리, 고유식별정보 수집·이용 및 위탁에 동의합니다.", 
							"ispUrlInfo": import.meta.env.VITE_API_URL,
							"userAgreeInfo":{
								realName : true,
								gender : true,
								nationalInfo: true,
								birthDate : true,
								ci : true
							}
						},
						"consentInfo" : {
							"consentNonce":this.attcCext,
							"consent" : consent
						}
					}
				)

				// 22.09.20 PASS 인증
				//if(this.certDsc === "pass") this.consentArray.push(consent)

				// 23.08.16 금융인증도 공공 마이데이터 수집 목록 적재를 위해 PUSH 추가
				this.consentArray.push(consent)
			}
			// 파라미터 필수
			const config = {
				"content"	: content,
				"orgCode"	: import.meta.env.VITE_PRIVATE_ORGCODE,
				"apiKey" 	: import.meta.env.VITE_PRIVATE_APIKEY
			}
			this.signListOne = []
			this.signListTwo = []
			if( window.location.host.indexOf('localhost') > -1 ) {
				// local 환경에서 금융인증 과정 스킵
				this.fn_financeFinish()

			} else {
				if(this.certDsc === "finance") {
					if(this.getUserInfo("chnl") === "385") {
						// 스뱅
						appService.openPFMOFPFinCert(config).then(response => {
							console.log("스뱅 금융인증 웹뷰 호출", response)
							this.signedDataList = response.result.signedDataList || []
							for(let i=0; i<this.signedDataList.length; i++) {
								this.signListOne.push({"orgCode":this.signedDataList[i].orgCode, "signedPersonInfoReq":this.signedDataList[i].signedPersonInfoReq})
								this.signListTwo.push({"orgCode":this.signedDataList[i].orgCode,"signedConsent":this.signedDataList[i].signedConsent})
							}
							this.caOrgOne = response.result.caOrg || ''
							this.caOrgTwo = response.result.caOrg || ''
							this.fn_financeFinish()
						})
						.catch(error => {
							console.log(error)
							modalService.alert(error)
						})
					} else {
						// 콕뱅
						appService.cokBankOpenPFMOFPFinCert(config).then(response => {
							console.log('콕뱅 금융인증 웹뷰 호출 [COAR2009]',  response)
							if(response.errorMessage !== undefined) {
								// 에러상황
								console.log("콕뱅 사설인증 웹뷰 호출 후 에러 발생 ::: ", response.errorMessage)
								return false
							}
							this.signedDataList = JSON.parse(response.result).signedDataList || []
							for(let i=0; i<this.signedDataList.length; i++) {
								this.signListOne.push({"orgCode":this.signedDataList[i].orgCode, "signedPersonInfoReq":this.signedDataList[i].signedPersonInfoReq})
								this.signListTwo.push({"orgCode":this.signedDataList[i].orgCode,"signedConsent":this.signedDataList[i].signedConsent})
							}
							this.caOrgOne = JSON.parse(response.result).caOrg || ''
							this.caOrgTwo = JSON.parse(response.result).caOrg || ''
							this.fn_financeFinish()
						})
					}
				} else if(this.certDsc === "pass") {
					const config = {
						component : COAR2021,
						params : {
							userAgreeInfo	: this.userAgreeInfo,
							orgTotScopeList : this.orgTotScopeList,
							selectList		: this.selectList,
							end_period		: dateFormat(this.selectExpDate.expDateValue, "YYYYMMDD"),
							selectedCnt		: this.selectedCnt,
							ca_org_name		: this.ca_org_name,
							isFirstStepYn	: false,				// 2차 인증 구분 flag
							selOrgAsetList	: this.selOrgAsetList,	// 선택 전체 자산 백업용 리스트
							attcC			: this.attcC,
							attcCext		: this.attcCext,
							consentArray	: this.consentArray,
							isMramMod		: this.isMramMod,
							
						}
					}
					modalService.openPopup(config).then(response => {
						console.log(response)
					})
				}
			}
		},

		// 금융인증) 완료 프로세스 진행
		fn_financeFinish() {
			clearInterval(this.sessionTimerAuthor)

			const config = {
				component : COAR2007,
				params : {
					isFirstStepYn 	: false,
					certDsc			: this.certDsc,
					signListOne		: this.signListOne,
					signListTwo		: this.signListTwo,
					caOrgOne		: this.caOrgOne,
					caOrgTwo		: this.caOrgTwo,
					attcC			: this.attcC,
					attcCext		: this.attcCext,
					end_period		: dateFormat(this.selectExpDate.expDateValue, "YYYYMMDD"),
					orgTotScopeList	: this.orgTotScopeList,
					selOrgAsetList	: this.selOrgAsetList,
					org_fail_list	: this.org_fail_list,
					selectList		: this.selectList,
					selectedCnt		: this.selectedCnt,
					isMramMod		: this.isMramMod,
					consentArray	: this.consentArray,
				}
			}
			modalService.openPopup(config).then(response => {
				if(response === "completeMod") {
					this.close("completeMod")
				}
			})
		},

		// 금융인증 세션 연장 처리
		startSessionTimerAuth(){
			//인터벌로 변경 처리
			this.sessionTimerAuthor = setInterval(() => {

				// if(this.getUserInfo('chnl') === '385'){
				// 	// 스뱅 로그인 연장 처리
				// 	this.$store.dispatch('config/extendSession')
				// }else{
				// 	// 콕뱅 로그인 연장 처리
				// }
				
				// 스뱅/콕뱅 로그인 연장 처리
				this.$store.dispatch('config/extendSession')

				//pfm 로그인 연장을 위한 더미 API콜 처리
				const config = {
					url: '/co/co/00r06', // /co/co/00r02
					data: {
					"mydtCusno" : this.getUserInfo('mydtCusno'),
					},
					disableLoading : true,
				}
				apiService.call(config).then(() =>{
					//알람 더미 체크
				})

			}, 30*1000);
		} ,

		fn_close() {
			sessionStorage.removeItem('conFailInfo')

			/**
			 * isMramMod
			 * ''	: 신규연결
			 * '1'	: 연결변경
			 * '2'	: 만료예정기관 만료일변경
			 */
			if(this.isMramMod === '' || this.isMramMod === '1') {
				// 신규연결 or 연결기관변경일 경우
				if(this.isMramMod === '1' && !this.isBckYn) {
					// 연결변경으로 넘어오고 자산백업데이터없어 1차인증부터 진행하였을 경우
					// 전체 팝업 close && 연결기관관리 페이지 재조회
					this.closeAll('completeMod')
				} else {
					// 그 외 case
					const currentPage = store.getters['layout/pageInfo']
					if(currentPage.name.indexOf("MRAM") > -1) {
						// 연결기관관리페이지를 통해 넘어온 경우
						this.closeAll('completeMod')
					} else {
						this.closeAllLeftMain()
					}
				}
			} else {
				this.closeAll('completeMod')
			}
		},
		
    },
    components : {
	},
	destroyed(){
		clearInterval(this.sessionTimerAuthor)
	}
}


</script>
