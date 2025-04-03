<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 자산연결 > 금융자산 > 연결 기관 선택
* @ 페이지설명 : 연결 기관 선택
* @ 파일명     : src/views/page/CO/AR/COAR2002/COAR2002.vue
* @ 작성자     : CS533459
* @ 작성일     : 2023-07-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2023-07-10              CS533459              마이데이터 확대개발 내용 적용
*************************************************************************/
-->
<template>
	<!-- full popup S -->
	<div class="full_popup renewal mydata2023" id="full_popup_01"> 
		<div class="popup_header">
			<h1>자산연결</h1>
			<a href="javascript:void(0);" class="btn_back" @click="close()"><span class="blind">이전화면</span></a>
		</div>
		
		<div class="popup_content custom_fixed_lnb" id="content_con"><!-- 하단 버튼 없을때 com_no_bottom -->
			<div class="com_inner progress_wrap">
				<strong class="com_pop_tit01">연결할 기관을 선택하세요</strong> 
				<span class="progress_num"><em class="pointColor green">1</em>/5</span>
				<div class="com_input_type02">
					<input type="search" id="txt01" class="inputClear" placeholder="기관명을 입력하세요" title="금융기관 찾기" v-model="srchKeyword">
					<a href="javascript:void(0);" role="button" class="com_btn_delete" @click.prevent="fn_resetList()"><span class="blind">삭제</span></a>
					<a href="javascript:void(0);" role="button" class="com_btn_search" @click.prevent="fn_srchKeyword()"><span class="blind">검색</span></a>
				</div>

				<div class="lnb lnb_filter" v-show="!isSrchYn" id="tab_scroll_coar2002">
					<input type="hidden" name="evtFlag" id="evtFlag" value="N"/>
					<input type="hidden" id="curActive" value="bank" @click="bindActiveTab"/>
					<div class="tablistBox">
						<ul role="tablist">
							<li class="on" ref="bankBtn" id="bank">
								<a href="#tit1" role="tab" :title=" curActive === 'bank'  ? '선택됨' : ''" :aria-selected="curActive === 'bank'  ? true : false" @click.prevent="fn_clickTab('bank')">은행 {{selectedBank.length > 0 ? selectedBank.length : ''}}</a>
							</li>
							<li ref="cardBtn" id="card">
								<a href="#tit2" role="tab" :title=" curActive === 'card'  ? '선택됨' : ''" :aria-selected="curActive === 'card'  ? true : false" @click.prevent="fn_clickTab('card')">카드 {{selectedCard.length > 0 ? selectedCard.length : ''}}</a>
							</li>
							<li ref="investBtn" id="invest">
								<a href="#tit3" role="tab" :title=" curActive === 'invest'  ? '선택됨' : ''" :aria-selected="curActive === 'invest'  ? true : false" @click.prevent="fn_clickTab('invest')">증권 {{selectedInvest.length > 0 ? selectedInvest.length : ''}}</a>
							</li>
							<li ref="insuBtn"  id="insu">
								<a href="#tit4" role="tab" :title=" curActive === 'insu'  ? '선택됨' : ''"  :aria-selected="curActive === 'insu'  ? true : false" @click.prevent="fn_clickTab('insu')">보험 {{selectedInsu.length > 0 ? selectedInsu.length : ''}}</a>
							</li>
							<li ref="efinBtn" id="efin">
								<a href="#tit5" role="tab" :title=" curActive === 'efin'  ? '선택됨' : ''" :aria-selected="curActive === 'efin'  ? true : false"  @click.prevent="fn_clickTab('efin')">페이 {{selectedEfin.length > 0 ? selectedEfin.length : ''}}</a>
							</li>
							<li ref="capitalBtn" id="capital">
								<a href="#tit6" role="tab"   :title=" curActive === 'capital'  ? '선택됨' : ''" :aria-selected="curActive === 'capital'  ? true : false"  @click.prevent="fn_clickTab('capital')">할부 {{selectedCapital.length > 0 ? selectedCapital.length : ''}}</a>
							</li>
							<li ref="telecomBtn" id="telecom">
								<a href="#tit8" role="tab"  :title=" curActive === 'telecom'  ? '선택됨' : ''" :aria-selected="curActive === 'telecom'  ? true : false" @click.prevent="fn_clickTab('telecom')">통신 {{selectedTelecom.length > 0 ? selectedTelecom.length : ''}}</a>
							</li>
							<li ref="usuryBtn" id="usury">
								<a href="#tit9" role="tab"  :title=" curActive === 'usury'  ? '선택됨' : ''" :aria-selected="curActive === 'usury'  ? true : false" @click.prevent="fn_clickTab('usury')">대부 {{selectedUsury.length > 0 ? selectedUsury.length : ''}}</a>
							</li>
							<li ref="p2pBtn" id="p2p">
								<a href="#tit11" role="tab"  :title=" curActive === 'p2p'  ? '선택됨' : ''" :aria-selected="curActive === 'p2p'  ? true : false"  @click.prevent="fn_clickTab('p2p')">P2P {{selectedP2p.length > 0 ? selectedP2p.length : ''}}</a>
							</li>
							<li ref="publicBtn" id="public">
								<a href="#tit12" role="tab"  :title=" curActive === 'public'  ? '선택됨' : ''" :aria-selected="curActive === 'public'  ? true : false"  @click.prevent="fn_clickTab('public')">공공 {{selectedPublic.length > 0 ? selectedPublic.length : ''}}</a>
							</li>

							<!-- <li ref="ginsuBtn" id="ginsu"><a href="#tit7">보증보험</a></li> -->
							<!-- <li ref="bondBtn" id="bond"><a href="#tit10">채권</a></li> -->
						</ul>		
					</div>
				</div>
			</div>

			<hr class="hr02">

			<!-- 연결기관선택 -->
			<div class="com_inner institution_list" v-show="!isSrchYn">
				<div class="recommend_check">
					<input type="checkbox" id="check_amnC" ref="chkAmnC" @click="fn_chkAmnCOrgYn($event)">
					<label for="check_amnC">추천 기관 선택</label>
				</div>

				<!-- 은행 -->
				<div class="custom_list">
					<div class="ipt_wrap custom_box flex_new_tit_area mt0 target_coar2002" id="bankDiv" v-if="bank_list.length > 0">
						<input type="checkbox" id="bankAllChk" ref="bankAll" @change="fn_chkAll($event, 'bank')">
						<label for="bankAllChk" class="new_tit_area" title="전체 선택">
							<div class="tit">
								<template v-if="selectedBank.length > 0">
									<span>은행 <em class="com_point_darkblue">{{selectedBank.length}}</em>개</span>
								</template>
								<template v-else>
									<span>은행 </span>
								</template>
							</div>
							<span class="state">
								<span class="on" v-if="selectedBank.length < 1">전체선택</span>
								<span class="off" v-else>선택해제</span>
							</span>
						</label>
					</div>
					<div class="ipt_wrap custom_box flex_new_tit_area mt0 target_coar2002" id="bankDiv" v-else>
						<div class="new_tit_area">
							<div class="tit">
								<span>은행 </span>
							</div>
						</div>
					</div>
					<ul class="list_type_01" v-if="bank_list.length > 0">
						<li v-for="(bankItem, bankIdx) in bank_list" :key="'bankOrg_'+bankIdx" >
							<div class="bank_state_che" v-if="bankItem.scrnMrkYn === '0'">
								<i :class="'ico_bank '+bankItem.orgC"></i>
								<div class="ipt_txt_flex">
									<strong class="bank_name">{{bankItem.orgnm}}</strong>
									<span class="icon_mint">준비중</span>
								</div>
							</div>
							<div class="ipt_wrap" v-else>
								<input type="checkbox" :readonly="bankItem.orgC === 'A4AAAZ0000' && !cbtType" :disabled="bankItem.orgC === 'A4AAAZ0000' && !cbtType" v-model="selectedBank" :value="bankItem" :id="'bankOrg_'+bankIdx" @click="fn_orgControl('01', bankItem, $event, 'bank')" ref="bank">
								<label :for="'bankOrg_'+bankIdx" class="bank_state_che">
									<i :class="'ico_bank '+bankItem.orgC"></i>
									<div class="ipt_txt_flex">
										<strong class="bank_name">{{bankItem.orgnm}}</strong>
										<span class="icon_mint" v-if="bankItem.colYn === '1'">연결됨</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
					<ul class="list_type_01" v-else>
						<li>
							<div class="no_data_box pt28 pb28">
								<div class="no_data_list">
									<p>연결 가능한 기관을 준비하고 있어요</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<!-- // 은행 -->
				<!-- 카드 -->
				<div class="custom_list">
					<div class="ipt_wrap custom_box flex_new_tit_area mt0 target_coar2002" id="cardDiv" v-if="card_list.length > 0">
						<input type="checkbox" id="cardAllChk" ref="cardAll" @change="fn_chkAll($event, 'card')">
						<label for="cardAllChk" class="new_tit_area" title="전체 선택">
							<div class="tit">
								<template v-if="selectedCard.length > 0">
									<span>카드 <em class="com_point_darkblue">{{selectedCard.length}}</em>개</span>
								</template>
								<template v-else>
									<span>카드 </span>
								</template>
							</div>
							<span class="state">
								<span class="on" v-if="selectedCard.length < 1">전체선택</span>
								<span class="off" v-else>선택해제</span>
							</span>
						</label>
					</div>
					<div class="ipt_wrap custom_box flex_new_tit_area mt0 target_coar2002" id="cardDiv" v-else>
						<div class="new_tit_area">
							<div class="tit">
								<span>카드 </span>
							</div>
						</div>
					</div>
					<ul class="list_type_01" v-if="card_list.length > 0">
						<li v-for="(cardItem, cardIdx) in card_list" :key="'cardOrg_'+cardIdx">
							<div class="bank_state_che" v-if="cardItem.scrnMrkYn === '0'">
								<i :class="'ico_bank '+cardItem.orgC"></i>
								<div class="ipt_txt_flex">
									<strong class="bank_name">{{cardItem.orgnm}}</strong>
									<span class="icon_mint">준비중</span>
								</div>
							</div>
							<div class="ipt_wrap" v-else>
								<input type="checkbox" v-model="selectedCard" :value="cardItem" :id="'cardOrg_'+cardIdx" @click="fn_orgControl('01', cardItem, $event, 'card')" ref="card" >
								<label :for="'cardOrg_'+cardIdx" class="bank_state_che">
									<i :class="'ico_bank '+cardItem.orgC"></i>
									<div class="ipt_txt_flex">
										<strong class="bank_name">{{cardItem.orgnm}}</strong>
										<span class="icon_mint" v-if="cardItem.colYn === '1'">연결됨</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
					<ul class="list_type_01" v-else>
						<li>
							<div class="no_data_box pt28 pb28">
								<div class="no_data_list">
									<p>연결 가능한 기관을 준비하고 있어요</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<!-- // 카드 -->
				<!-- 증권 -->
				<div class="custom_list">
					<div class="ipt_wrap custom_box flex_new_tit_area mt0 target_coar2002" id="investDiv" v-if="invest_list.length > 0">
						<input type="checkbox" id="investAllChk" ref="investAll" @change="fn_chkAll($event, 'invest')">
						<label for="investAllChk" class="new_tit_area" title="전체 선택">
							<div class="tit">
								<template v-if="selectedInvest.length > 0">
									<span>증권 <em class="com_point_darkblue">{{selectedInvest.length}}</em>개</span>
								</template>
								<template v-else>
									<span>증권 </span>
								</template>
							</div>
							<span class="state">
								<span class="on" v-if="selectedInvest.length < 1">전체선택</span>
								<span class="off" v-else>선택해제</span>
							</span>
						</label>
					</div>
					<div class="ipt_wrap custom_box flex_new_tit_area mt0 target_coar2002" id="investDiv" v-else>
						<div class="new_tit_area">
							<div class="tit">
								<span>증권 </span>
							</div>
						</div>
					</div>
					<ul class="list_type_01" v-if="invest_list.length > 0">
						<li v-for="(investItem, investIdx) in invest_list" :key="'investOrg_'+investIdx">
							<div class="bank_state_che" v-if="investItem.scrnMrkYn === '0'">
								<i :class="'ico_bank '+investItem.orgC"></i>
								<div class="ipt_txt_flex">
									<strong class="bank_name">{{investItem.orgnm}}</strong>
									<span class="icon_mint">준비중</span>
								</div>
							</div>
							<div class="ipt_wrap" v-else>
								<input type="checkbox" v-model="selectedInvest" :value="investItem" :id="'investOrg_'+investIdx" @click="fn_orgControl('01', investItem, $event, 'invest')" ref="invest">
								<label :for="'investOrg_'+investIdx" class="bank_state_che">
									<i :class="'ico_bank '+investItem.orgC"></i>
									<div class="ipt_txt_flex">
										<strong class="bank_name">{{investItem.orgnm}}</strong>
										<span class="icon_mint" v-if="investItem.colYn === '1'">연결됨</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
					<ul class="list_type_01" v-else>
						<li>
							<div class="no_data_box pt28 pb28">
								<div class="no_data_list">
									<p>연결 가능한 기관을 준비하고 있어요</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<!-- // 증권 -->
				<!-- 보험 -->
				<div class="custom_list">
					<div class="ipt_wrap custom_box flex_new_tit_area mt0 target_coar2002" id="insuDiv" v-if="insu_list.length > 0">
						<input type="checkbox" id="insuAllChk" ref="insuAll" @change="fn_chkAll($event, 'insu')">
						<label for="insuAllChk" class="new_tit_area" title="전체 선택">
							<div class="tit">
								<template v-if="selectedInsu.length > 0">
									<span>보험 <em class="com_point_darkblue">{{selectedInsu.length}}</em>개</span>
								</template>
								<template v-else>
									<span>보험 </span>
								</template>
							</div>
							<span class="state">
								<span class="on" v-if="selectedInsu.length < 1">전체선택</span>
								<span class="off" v-else>선택해제</span>
							</span>
						</label>
					</div>
					<div class="ipt_wrap custom_box flex_new_tit_area mt0 target_coar2002" id="insuDiv" v-else>
						<div class="new_tit_area">
							<div class="tit">
								<span>보험 </span>
							</div>
						</div>
					</div>
					<ul class="list_type_01" v-if="insu_list.length > 0">
						<li v-for="(insuItem, insuIdx) in insu_list" :key="'insuOrg_'+insuIdx">
							<div class="bank_state_che" v-if="insuItem.scrnMrkYn === '0'">
								<i :class="'ico_bank '+insuItem.orgC"></i>
								<div class="ipt_txt_flex">
									<strong class="bank_name">{{insuItem.orgnm}}</strong>
									<span class="icon_mint">준비중</span>
								</div>
							</div>
							<div class="ipt_wrap" v-else>
								<input type="checkbox" v-model="selectedInsu" :value="insuItem" :id="'insuOrg_'+insuIdx" @click="fn_orgControl('01', insuItem, $event, 'insu')" ref="insu">
								<label :for="'insuOrg_'+insuIdx" class="bank_state_che">
									<i :class="'ico_bank '+insuItem.orgC"></i>
									<div class="ipt_txt_flex">
										<strong class="bank_name">{{insuItem.orgnm}}</strong>
										<span class="icon_mint" v-if="insuItem.colYn === '1'">연결됨</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
					<ul class="list_type_01" v-else>
						<li>
							<div class="no_data_box pt28 pb28">
								<div class="no_data_list">
									<p>연결 가능한 기관을 준비하고 있어요</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<!-- // 보험 -->
				<!-- 페이 -->
				<div class="custom_list">
					<div class="ipt_wrap custom_box flex_new_tit_area mt0 target_coar2002" id="efinDiv" v-if="efin_list.length > 0">
						<input type="checkbox" id="efinAllChk" ref="efinAll" @change="fn_chkAll($event, 'efin')">
						<label for="efinAllChk" class="new_tit_area" title="전체 선택">
							<div class="tit">
								<template v-if="selectedEfin.length > 0">
									<span>페이 <em class="com_point_darkblue">{{selectedEfin.length}}</em>개</span>
								</template>
								<template v-else>
									<span>페이 </span>
								</template>
							</div>
							<span class="state">
								<span class="on" v-if="selectedEfin.length < 1">전체선택</span>
								<span class="off" v-else>선택해제</span>
							</span>
						</label>
					</div>
					<div class="ipt_wrap custom_box flex_new_tit_area mt0 target_coar2002" id="efinDiv" v-else>
						<div class="new_tit_area">
							<div class="tit">
								<span>페이 </span>
							</div>
						</div>
					</div>
					<ul class="list_type_01" v-if="efin_list.length > 0">
						<li v-for="(efinItem, efinIdx) in efin_list" :key="'efinOrg_'+efinIdx">
							<div class="bank_state_che" v-if="efinItem.scrnMrkYn === '0'">
								<i :class="'ico_bank '+efinItem.orgC"></i>
								<div class="ipt_txt_flex">
									<strong class="bank_name">{{efinItem.orgnm}}</strong>
									<span class="icon_mint">준비중</span>
								</div>
							</div>
							<div class="ipt_wrap" v-else>
								<input type="checkbox" v-model="selectedEfin" :value="efinItem"  :id="'efinOrg_'+efinIdx" @click="fn_orgControl('01', efinItem, $event, 'efin')" ref="efin">
								<label :for="'efinOrg_'+efinIdx" class="bank_state_che">
									<i :class="'ico_bank '+efinItem.orgC"></i>
									<div class="ipt_txt_flex">
										<strong class="bank_name">{{efinItem.orgnm}}</strong>
										<span class="icon_mint" v-if="efinItem.colYn === '1'">연결됨</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
					<ul class="list_type_01" v-else>
						<li>
							<div class="no_data_box pt28 pb28">
								<div class="no_data_list">
									<p>연결 가능한 기관을 준비하고 있어요</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<!-- // 페이 -->
				<!-- 할부금융 -->
				<div class="custom_list">
					<div class="ipt_wrap custom_box flex_new_tit_area mt0 target_coar2002" id="capitalDiv" v-if="capital_list.length > 0">
						<input type="checkbox" id="capitalAllChk" ref="capitalAll" @change="fn_chkAll($event, 'capital')">
						<label for="capitalAllChk" class="new_tit_area" title="전체 선택">
							<div class="tit">
								<template v-if="selectedCapital.length > 0">
									<span>할부금융 <em class="com_point_darkblue">{{selectedCapital.length}}</em>개</span>
								</template>
								<template v-else>
									<span>할부금융 </span>
								</template>
							</div>
							<span class="state">
								<span class="on" v-if="selectedCapital.length < 1">전체선택</span>
								<span class="off" v-else>선택해제</span>
							</span>
						</label>
					</div>
					<div class="ipt_wrap custom_box flex_new_tit_area mt0 target_coar2002" id="capitalDiv" v-else>
						<div class="new_tit_area">
							<div class="tit">
								<span>할부금융 </span>
							</div>
						</div>
					</div>
					<ul class="list_type_01" v-if="capital_list.length > 0">
						<li v-for="(capitalItem, capitalIdx) in capital_list" :key="'capitalOrg_'+capitalIdx">
							<div class="bank_state_che" v-if="capitalItem.scrnMrkYn === '0'">
								<i :class="'ico_bank '+capitalItem.orgC"></i>
								<div class="ipt_txt_flex">
									<strong class="bank_name">{{capitalItem.orgnm}}</strong>
									<span class="icon_mint">준비중</span>
								</div>
							</div>
							<div class="ipt_wrap" v-else>
								<input type="checkbox" v-model="selectedCapital" :value="capitalItem"  :id="'capitalOrg_'+capitalIdx" @click="fn_orgControl('01', capitalItem, $event, 'capital')" ref="capital">
								<label :for="'capitalOrg_'+capitalIdx" class="bank_state_che">
									<i :class="'ico_bank '+capitalItem.orgC"></i>
									<div class="ipt_txt_flex">
										<strong class="bank_name">{{capitalItem.orgnm}}</strong>
										<span class="icon_mint" v-if="capitalItem.colYn === '1'">연결됨</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
					<ul class="list_type_01" v-else>
						<li>
							<div class="no_data_box pt28 pb28">
								<div class="no_data_list">
									<p>연결 가능한 기관을 준비하고 있어요</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<!-- // 할부금융 -->
				<!-- 보증보험 (2023.06.26 수정) hidden 요청  -->
				<!-- <div class="custom_list">
					<div class="ipt_wrap target_coar2002" id="ginsuDiv" v-if="ginsu_list.length > 0">
						<input type="checkbox" id="ginsuAllChk" ref="ginsuAll" @change="fn_chkAll($event, 'ginsu')">
						<label for="ginsuAllChk" class="new_tit_area" title="전체 선택">
							<div class="tit">
								<template v-if="selectedGinsu.length > 0">
									<span>보증보험 <em class="com_point_darkblue">{{selectedGinsu.length}}</em>개</span>
								</template>
								<template v-else>
									<span>보증보험 </span>
								</template>
							</div>
							<span class="state">
								<span class="on">전체선택</span>
								<span class="off">선택해제</span>
							</span>
						</label>
					</div>
					<div class="ipt_wrap target_coar2002" id="ginsuDiv" v-else>
						<div class="new_tit_area">
							<div class="tit">
								<span>보증보험 </span>
							</div>
						</div>
					</div>
					<ul class="list_type_01" v-if="ginsu_list.length > 0">
						<li v-for="(ginsuItem, ginsuIdx) in ginsu_list" :key="'ginsuOrg_'+ginsuIdx">
							<div class="bank_state_che" v-if="ginsuItem.scrnMrkYn === '0'">
								<i :class="'ico_bank '+ginsuItem.orgC"></i>
								<div class="ipt_txt_flex">
									<strong class="bank_name">{{ginsuItem.orgnm}}</strong>
									<span class="icon_mint">준비중</span>
								</div>
							</div>
							<div class="ipt_wrap" v-else>
								<input type="checkbox" :id="'ginsuOrg_'+ginsuIdx" @click="fn_orgControl('01', ginsuItem, $event, 'ginsu')" ref="ginsu">
								<label :for="'ginsuOrg_'+ginsuIdx" class="bank_state_che">
									<i :class="'ico_bank '+ginsuItem.orgC"></i>
									<div class="ipt_txt_flex">
										<strong class="bank_name">{{ginsuItem.orgnm}}</strong>
										<span class="icon_mint" v-if="ginsuItem.colYn === '1'">연결됨</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
					<ul class="list_type_01" v-else>
						<li>
							<div class="no_data_box pt28 pb28">
								<div class="no_data_list">
									<p>연결 가능한 기관을 준비하고 있어요</p>
								</div>
							</div>
						</li>
					</ul>
				</div> -->
				<!-- // 보증보험 -->
				<!-- 통신 -->
				<div class="custom_list">
					<div class="ipt_wrap custom_box flex_new_tit_area mt0 target_coar2002" id="telecomDiv" v-if="telecom_list.length > 0">
						<input type="checkbox" id="telecomAllChk" ref="telecomAll" @change="fn_chkAll($event, 'telecom')">
						<label for="telecomAllChk" class="new_tit_area" title="전체 선택">
							<div class="tit">
								<template v-if="selectedTelecom.length > 0">
									<span>통신 <em class="com_point_darkblue">{{selectedTelecom.length}}</em>개</span>
								</template>
								<template v-else>
									<span>통신 </span>
								</template>
							</div>
							<span class="state">
								<span class="on" v-if="selectedTelecom.length < 1">전체선택</span>
								<span class="off" v-else>선택해제</span>
							</span>
						</label>
					</div>
					<div class="ipt_wrap target_coar2002" id="telecomDiv" v-else>
						<div class="new_tit_area">
							<div class="tit">
								<span>통신 </span>
							</div>
						</div>
					</div>
					<ul class="list_type_01" v-if="telecom_list.length > 0">
						<li v-for="(telecomItem, telecomIdx) in telecom_list" :key="'telecomOrg_'+telecomIdx">
							<div class="bank_state_che" v-if="telecomItem.scrnMrkYn === '0'">
								<i :class="'ico_bank '+telecomItem.orgC"></i>
								<div class="ipt_txt_flex">
									<strong class="bank_name">{{telecomItem.orgnm}}</strong>
									<span class="icon_mint">준비중</span>
								</div>
							</div>
							<div class="ipt_wrap" v-else>
								<input type="checkbox" v-model="selectedTelecom" :value="telecomItem" :id="'telecomOrg_'+telecomIdx" @click="fn_orgControl('01', telecomItem, $event, 'telecom')" ref="telecom">
								<label :for="'telecomOrg_'+telecomIdx" class="bank_state_che">
									<i :class="'ico_bank '+telecomItem.orgC"></i>
									<div class="ipt_txt_flex">
										<strong class="bank_name">{{telecomItem.orgnm}}</strong>
										<span class="icon_mint" v-if="telecomItem.colYn === '1'">연결됨</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
					<ul class="list_type_01" v-else>
						<li>
							<div class="no_data_box pt28 pb28">
								<div class="no_data_list">
									<p>연결 가능한 기관을 준비하고 있어요</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<!-- // 통신 -->
				<!-- 대부 -->
				<div class="custom_list">
					<div class="ipt_wrap custom_box flex_new_tit_area mt0 target_coar2002" id="usuryDiv" v-if="usury_list.length > 0">
						<input type="checkbox" id="usuryAllChk" ref="usuryAll" @change="fn_chkAll($event, 'usury')">
						<label for="usuryAllChk" class="new_tit_area" title="전체 선택">
							<div class="tit">
								<template v-if="selectedUsury.length > 0">
									<span>대부 <em class="com_point_darkblue">{{selectedUsury.length}}</em>개</span>
								</template>
								<template v-else>
									<span>대부 </span>
								</template>
							</div>
							<span class="state">
								<span class="on" v-if="selectedUsury.length < 1">전체선택</span>
								<span class="off" v-else>선택해제</span>
							</span>
						</label>
					</div>
					<div class="ipt_wrap custom_box flex_new_tit_area mt0 target_coar2002" id="usuryDiv" v-else>
						<div class="new_tit_area">
							<div class="tit">
								<span>대부 </span>
							</div>
						</div>
					</div>
					<ul class="list_type_01" v-if="usury_list.length > 0">
						<li v-for="(usuryItem, usuryIdx) in usury_list" :key="'usuryOrg_'+usuryIdx">
							<div class="bank_state_che" v-if="usuryItem.scrnMrkYn === '0'">
								<i :class="'ico_bank '+usuryItem.orgC"></i>
								<div class="ipt_txt_flex">
									<strong class="bank_name">{{usuryItem.orgnm}}</strong>
									<span class="icon_mint">준비중</span>
								</div>
							</div>
							<div class="ipt_wrap" v-else>
								<input type="checkbox" v-model="selectedUsury" :value="usuryItem"  :id="'usuryOrg_'+usuryIdx" @click="fn_orgControl('01', usuryItem, $event, 'usury')" ref="usury">
								<label :for="'usuryOrg_'+usuryIdx" class="bank_state_che">
									<i :class="'ico_bank '+usuryItem.orgC"></i>
									<div class="ipt_txt_flex">
										<strong class="bank_name">{{usuryItem.orgnm}}</strong>
										<span class="icon_mint" v-if="usuryItem.colYn === '1'">연결됨</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
					<ul class="list_type_01" v-else>
						<li>
							<div class="no_data_box pt28 pb28">
								<div class="no_data_list">
									<p>연결 가능한 기관을 준비하고 있어요</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<!-- // 대부 -->

				<!-- 채권 (2023.06.26 수정) hidden 요청  -->
				<!-- <div class="custom_list">
					<div class="ipt_wrap target_coar2002" id="bondDiv" v-if="bond_list.length > 0">
						<input type="checkbox" id="bondAllChk" ref="bond" @change="fn_chkAll($event, 'bond')">
						<label for="bondAllChk" class="new_tit_area" title="전체 선택">
							<div class="tit">
								<template v-if="selectedBond.length > 0">
									<span>채권 <em class="com_point_darkblue">{{selectedBond.length}}</em>개</span>
								</template>
								<template v-else>
									<span>채권 </span>
								</template>
							</div>
							<span class="state">
								<span class="on">전체선택</span>
								<span class="off">선택해제</span>
							</span>
						</label>
					</div>
					<div class="ipt_wrap target_coar2002" id="bondDiv" v-else>
						<div class="new_tit_area">
							<div class="tit">
								<span>채권 </span>
							</div>
						</div>
					</div>
					<ul class="list_type_01" v-if="bond_list.length > 0">
						<li v-for="(bondItem, bondIdx) in bond_list" :key="'bondOrg_'+bondIdx">
							<div class="bank_state_che" v-if="bondItem.scrnMrkYn === '0'">
								<i :class="'ico_bank '+bondItem.orgC"></i>
								<div class="ipt_txt_flex">
									<strong class="bank_name">{{bondItem.orgnm}}</strong>
									<span class="icon_mint">준비중</span>
								</div>
							</div>
							<div class="ipt_wrap" v-else>
								<input type="checkbox" :id="'bondOrg_'+bondIdx" @click="fn_orgControl('01', bondItem, $event, 'bond')" ref="bond">
								<label :for="'bondOrg_'+bondIdx" class="bank_state_che">
									<i :class="'ico_bank '+bondIdx.orgC"></i>
									<div class="ipt_txt_flex">
										<strong class="bank_name">{{bondItem.orgnm}}</strong>
										<span class="icon_mint" v-if="bondItem.colYn === '1'">연결됨</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
					<ul class="list_type_01" v-else>
						<li>
							<div class="no_data_box pt28 pb28">
								<div class="no_data_list">
									<p>연결 가능한 기관을 준비하고 있어요</p>
								</div>
							</div>
						</li>
					</ul>
				</div> -->
				<!-- // 채권 -->

				<!-- P2P -->
				<div class="custom_list">
					<div class="ipt_wrap custom_box flex_new_tit_area mt0 target_coar2002" id="p2pDiv" v-if="p2p_list.length > 0">
						<input type="checkbox" id="p2pAllChk" ref="p2pAll" @change="fn_chkAll($event, 'p2p')">
						<label for="p2pAllChk" class="new_tit_area" title="전체 선택">
							<div class="tit">
								<template v-if="selectedP2p.length > 0">
									<span>P2P <em class="com_point_darkblue">{{selectedP2p.length}}</em>개</span>
								</template>
								<template v-else>
									<span>P2P </span>
								</template>
							</div>
							<span class="state">
								<span class="on" v-if="selectedP2p.length < 1">전체선택</span>
								<span class="off" v-else>선택해제</span>
							</span>
						</label>
					</div>
					<div class="ipt_wrap custom_box flex_new_tit_area mt0 target_coar2002" id="p2pDiv" v-else>
						<div class="new_tit_area">
							<div class="tit">
								<span>P2P </span>
							</div>
						</div>
					</div>
					<ul class="list_type_01" v-if="p2p_list.length > 0">
						<li v-for="(p2pItem, p2pIdx) in p2p_list" :key="'p2pOrg_'+p2pIdx">
							<div class="bank_state_che" v-if="p2pItem.scrnMrkYn === '0'">
								<i :class="'ico_bank '+p2pItem.orgC"></i>
								<div class="ipt_txt_flex">
									<strong class="bank_name">{{p2pItem.orgnm}}</strong>
									<span class="icon_mint">준비중</span>
								</div>
							</div>
							<div class="ipt_wrap" v-else>
								<input type="checkbox" v-model="selectedP2p" :value="p2pItem"  :id="'p2pOrg_'+p2pIdx" @click="fn_orgControl('01', p2pItem, $event, 'p2p')" ref="p2p">
								<label :for="'p2pOrg_'+p2pIdx" class="bank_state_che">
									<i :class="'ico_bank '+p2pItem.orgC"></i>
									<div class="ipt_txt_flex">
										<strong class="bank_name">{{p2pItem.orgnm}}</strong>
										<span class="icon_mint" v-if="p2pItem.colYn === '1'">연결됨</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
					<ul class="list_type_01" v-else>
						<li>
							<div class="no_data_box pt28 pb28">
								<div class="no_data_list">
									<p>연결 가능한 기관을 준비하고 있어요</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<!-- // P2P -->

				<!-- 공공 -->
				<div class="custom_list">
					<div class="ipt_wrap custom_box flex_new_tit_area mt0 target_coar2002" id="publicDiv" v-if="public_list.length > 0">
						<input type="checkbox" id="publicAllChk" ref="publicAll" @change="fn_chkAll($event, 'public')">
						<label for="publicAllChk" class="new_tit_area" title="전체 선택">
						<div class="tit">
							<template v-if="selectedPublic.length > 0">
								<span>공공 <em class="com_point_darkblue">{{selectedPublic.length}}</em>개</span>
							</template>
							<template v-else>
								<span>공공 </span>
							</template>
						</div>
						<span class="state">
							<span class="on" v-if="selectedPublic.length < 1">전체선택</span>
							<span class="off" v-else>선택해제</span>
						</span>
						</label>
					</div>
					<div class="ipt_wrap custom_box flex_new_tit_area mt0 target_coar2002" id="publicDiv" v-else>
						<div class="new_tit_area">
							<div class="tit">
								<span>공공 </span>
							</div>
						</div>
					</div>
					<ul class="list_type_01" v-if="public_list.length > 0">
						<li v-for="(publicItem, publicIdx) in public_list" :key="'publicOrg_'+publicIdx">
							<div class="bank_state_che" v-if="publicItem.scrnMrkYn === '0'">
								<i :class="'ico_bank '+publicItem.orgC"></i>
								<div class="ipt_txt_flex">
									<strong class="bank_name">{{publicItem.orgnm}}</strong>
									<span class="icon_mint">준비중</span>
								</div>
							</div>
							<div class="ipt_wrap" v-else>
								<input type="checkbox"  v-model="selectedPublic" :value="publicItem"  :id="'publicOrg_'+publicIdx" @click="fn_orgControl('01', publicItem, $event, 'public')" ref="public">
								<label :for="'publicOrg_'+publicIdx" class="bank_state_che">
									<i :class="'ico_bank '+publicItem.orgC"></i>
									<div class="ipt_txt_flex">
										<strong class="bank_name">{{publicItem.orgnm}}</strong>
										<span class="icon_mint" v-if="publicItem.colYn === '1'">연결됨</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
					<ul class="list_type_01" v-else>
						<li>
							<div class="no_data_box pt28 pb28">
								<div class="no_data_list">
									<p>연결 가능한 기관을 준비하고 있어요</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<!-- // 공공 -->

			</div>
			<!-- //연결기관선택 -->
			<!-- //////////////////////////// 검색 결과 Start //////////////////////////// -->
			<!-- 검색결과 -->
			<div class="com_inner" v-show="isSrchYn">
				<div class="custom_list" v-if="bank_srch_list.length > 0">
					<div class="new_tit_area">
						<div class="tit">
							<span>은행</span>
						</div>
					</div>
					<ul class="list_type_01">
						<li v-for="(bankSrchItem, bankSrchIdx) in bank_srch_list" :key="'bank_srch_'+bankSrchIdx">
							<div class="bank_state_che" v-if="bankSrchItem.scrnMrkYn === '0'">
								<i :class="'ico_bank '+bankSrchItem.orgC"></i>
								<div class="ipt_txt_flex">
									<strong class="bank_name">{{bankSrchItem.orgnm}}</strong>
									<span class="icon_mint">준비중</span>
								</div>
							</div>
							<div class="ipt_wrap" v-else>
								<input type="checkbox" v-model="selectedBank" :value="bankSrchItem" :id="'bank_srch_'+bankSrchIdx" @click="fn_orgControl('02', bankSrchItem, $event, 'bank')" ref="bank_srch">
								<label :for="'bank_srch_'+bankSrchIdx" class="bank_state_che">
									<i :class="'ico_bank '+bankSrchItem.orgC"></i>
									<div class="ipt_txt_flex">
										<strong class="bank_name">{{bankSrchItem.orgnm}}</strong>
										<span class="icon_mint" v-if="bankSrchItem.colYn === '1'">연결됨</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
				</div>
				<div class="custom_list" v-if="card_srch_list.length > 0">
					<div class="new_tit_area">
						<div class="tit">
							<span>카드</span>
						</div>
					</div>
					<ul class="list_type_01">
						<li v-for="(cardSrchItem, cardSrchIdx) in card_srch_list" :key="'card_srch_'+cardSrchIdx">
							<div class="bank_state_che" v-if="cardSrchItem.scrnMrkYn === '0'">
								<i :class="'ico_bank '+cardSrchItem.orgC"></i>
								<div class="ipt_txt_flex">
									<strong class="bank_name">{{cardSrchItem.orgnm}}</strong>
									<span class="icon_mint">준비중</span>
								</div>
							</div>
							<div class="ipt_wrap" v-else>
								<input type="checkbox" v-model="selectedCard" :value="cardSrchItem" :id="'card_srch_'+cardSrchIdx" @click="fn_orgControl('02', cardSrchItem, $event, 'card')" ref="card_srch">
								<label :for="'card_srch_'+cardSrchIdx" class="bank_state_che">
									<i :class="'ico_bank '+cardSrchItem.orgC"></i>
									<div class="ipt_txt_flex">
										<strong class="bank_name">{{cardSrchItem.orgnm}}</strong>
										<span class="icon_mint" v-if="cardSrchItem.colYn === '1'">연결됨</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
				</div>
				<div class="custom_list" v-if="invest_srch_list.length > 0">
					<div class="new_tit_area">
						<div class="tit">
							<span>증권</span>
						</div>
					</div>
					<ul class="list_type_01">
						<li v-for="(investSrchItem, investSrchIdx) in invest_srch_list" :key="'invest_srch_'+investSrchIdx">
							<div class="bank_state_che" v-if="investSrchItem.scrnMrkYn === '0'">
								<i :class="'ico_bank '+investSrchItem.orgC"></i>
								<div class="ipt_txt_flex">
									<strong class="bank_name">{{investSrchItem.orgnm}}</strong>
									<span class="icon_mint">준비중</span>
								</div>
							</div>
							<div class="ipt_wrap" v-else>
								<input type="checkbox" v-model="selectedInvest" :value="investSrchItem" :id="'invest_srch_'+investSrchIdx" @click="fn_orgControl('02', investSrchItem, $event, 'invest')" ref="invest_srch">
								<label :for="'invest_srch_'+investSrchIdx" class="bank_state_che">
									<i :class="'ico_bank '+investSrchItem.orgC"></i>
									<div class="ipt_txt_flex">
										<strong class="bank_name">{{investSrchItem.orgnm}}</strong>
										<span class="icon_mint" v-if="investSrchItem.colYn === '1'">연결됨</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
				</div>
				<div class="custom_list" v-if="insu_srch_list.length > 0">
					<div class="new_tit_area">
						<div class="tit">
							<span>보험</span>
						</div>
					</div>
					<ul class="list_type_01">
						<li v-for="(insuSrchItem, insuSrchIdx) in insu_srch_list" :key="'insu_srch_'+insuSrchIdx">
							<div class="bank_state_che" v-if="insuSrchItem.scrnMrkYn === '0'">
								<i :class="'ico_bank '+insuSrchItem.orgC"></i>
								<div class="ipt_txt_flex">
									<strong class="bank_name">{{insuSrchItem.orgnm}}</strong>
									<span class="icon_mint">준비중</span>
								</div>
							</div>
							<div class="ipt_wrap" v-else>
								<input type="checkbox" v-model="selectedInsu" :value="insuSrchItem" :id="'insu_srch_'+insuSrchIdx" @click="fn_orgControl('02', insuSrchItem, $event, 'insu')" ref="insu_srch">
								<label :for="'insu_srch_'+insuSrchIdx" class="bank_state_che">
									<i :class="'ico_bank '+insuSrchItem.orgC"></i>
									<div class="ipt_txt_flex">
										<strong class="bank_name">{{insuSrchItem.orgnm}}</strong>
										<span class="icon_mint" v-if="insuSrchItem.colYn === '1'">연결됨</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
				</div>
				<div class="custom_list" v-if="efin_srch_list.length > 0">
					<div class="new_tit_area">
						<div class="tit">
							<span>페이</span>
						</div>
					</div>
					<ul class="list_type_01">
						<li v-for="(efinSrchItem, efinSrchIdx) in efin_srch_list" :key="'efin_srch_'+efinSrchIdx">
							<div class="bank_state_che" v-if="efinSrchItem.scrnMrkYn === '0'">
								<i :class="'ico_bank '+efinSrchItem.orgC"></i>
								<div class="ipt_txt_flex">
									<strong class="bank_name">{{efinSrchItem.orgnm}}</strong>
									<span class="icon_mint">준비중</span>
								</div>
							</div>
							<div class="ipt_wrap" v-else>
								<input type="checkbox"  v-model="selectedEfin" :value="efinSrchItem" :id="'efin_srch_'+efinSrchIdx" @click="fn_orgControl('02', efinSrchItem, $event, 'efin')" ref="efin_srch">
								<label :for="'efin_srch_'+efinSrchIdx" class="bank_state_che">
									<i :class="'ico_bank '+efinSrchItem.orgC"></i>
									<div class="ipt_txt_flex">
										<strong class="bank_name">{{efinSrchItem.orgnm}}</strong>
										<span class="icon_mint" v-if="efinSrchItem.colYn === '1'">연결됨</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
				</div>
				<div class="custom_list" v-if="capital_srch_list.length > 0">
					<div class="new_tit_area">
						<div class="tit">
							<span>할부금융</span>
						</div>
					</div>
					<ul class="list_type_01">
						<li v-for="(capiSrchItem, capiSrchIdx) in capital_srch_list" :key="'capital_srch_'+capiSrchIdx">
							<div class="bank_state_che" v-if="capiSrchItem.scrnMrkYn === '0'">
								<i :class="'ico_bank '+capiSrchItem.orgC"></i>
								<div class="ipt_txt_flex">
									<strong class="bank_name">{{capiSrchItem.orgnm}}</strong>
									<span class="icon_mint">준비중</span>
								</div>
							</div>
							<div class="ipt_wrap" v-else>
								<input type="checkbox"  v-model="selectedCapital" :value="capiSrchItem" :id="'capital_srch_'+capiSrchIdx" @click="fn_orgControl('02', capiSrchItem, $event, 'capital')" ref="capital_srch">
								<label :for="'capital_srch_'+capiSrchIdx" class="bank_state_che">
									<i :class="'ico_bank '+capiSrchItem.orgC"></i>
									<div class="ipt_txt_flex">
										<strong class="bank_name">{{capiSrchItem.orgnm}}</strong>
										<span class="icon_mint" v-if="capiSrchItem.colYn === '1'">연결됨</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
				</div>
				<!-- <div class="custom_list" v-if="ginsu_srch_list.length > 0">
					<div class="new_tit_area">
						<div class="tit">
							<span>보증보험</span>
						</div>
					</div>
					<ul class="list_type_01">
						<li v-for="(ginsuSrchItem, ginsuSrchIdx) in ginsu_srch_list" :key="'ginsu_srch_'+ginsuSrchIdx">
							<div class="bank_state_che" v-if="ginsuSrchItem.scrnMrkYn === '0'">
								<i :class="'ico_bank '+ginsuSrchItem.orgC"></i>
								<div class="ipt_txt_flex">
									<strong class="bank_name">{{ginsuSrchItem.orgnm}}</strong>
									<span class="icon_mint">준비중</span>
								</div>
							</div>
							<div class="ipt_wrap" v-else>
								<input type="checkbox" :id="'ginsu_srch_'+ginsuSrchIdx" @click="fn_orgControl('02', ginsuSrchItem, $event, 'ginsu')" ref="ginsu_srch">
								<label :for="'ginsu_srch_'+ginsuSrchIdx" class="bank_state_che">
									<i :class="'ico_bank '+ginsuSrchItem.orgC"></i>
									<div class="ipt_txt_flex">
										<strong class="bank_name">{{ginsuSrchItem.orgnm}}</strong>
										<span class="icon_mint" v-if="ginsuSrchItem.colYn === '1'">연결됨</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
				</div> -->
				<div class="custom_list" v-if="telecom_srch_list.length > 0">
					<div class="new_tit_area">
						<div class="tit">
							<span>통신</span>
						</div>
					</div>
					<ul class="list_type_01">
						<li v-for="(telSrchItem, telSrchIdx) in telecom_srch_list" :key="'telecom_srch_'+telSrchIdx">
							<div class="bank_state_che" v-if="telSrchItem.scrnMrkYn === '0'">
								<i :class="'ico_bank '+telSrchItem.orgC"></i>
								<div class="ipt_txt_flex">
									<strong class="bank_name">{{telSrchItem.orgnm}}</strong>
									<span class="icon_mint">준비중</span>
								</div>
							</div>
							<div class="ipt_wrap" v-else>
								<input type="checkbox"  v-model="selectedTelecom" :value="telSrchItem" :id="'telecom_srch_'+telSrchIdx" @click="fn_orgControl('02', telSrchItem, $event, 'telecom')" ref="telecom_srch">
								<label :for="'telecom_srch_'+telSrchIdx" class="bank_state_che">
									<i :class="'ico_bank '+telSrchItem.orgC"></i>
									<div class="ipt_txt_flex">
										<strong class="bank_name">{{telSrchItem.orgnm}}</strong>
										<span class="icon_mint" v-if="telSrchItem.colYn === '1'">연결됨</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
				</div>
				<div class="custom_list" v-if="usury_srch_list.length > 0">
					<div class="new_tit_area">
						<div class="tit">
							<span>대부</span>
						</div>
					</div>
					<ul class="list_type_01">
						<li v-for="(usuSrchItem, usuSrchIdx) in usury_srch_list" :key="'usury_srch_'+usuSrchIdx">
							<div class="bank_state_che" v-if="usuSrchItem.scrnMrkYn === '0'">
								<i :class="'ico_bank '+usuSrchItem.orgC"></i>
								<div class="ipt_txt_flex">
									<strong class="bank_name">{{usuSrchItem.orgnm}}</strong>
									<span class="icon_mint">준비중</span>
								</div>
							</div>
							<div class="ipt_wrap" v-else>
								<input type="checkbox" v-model="selectedUsury" :value="usuSrchItem"  :id="'usury_srch_'+usuSrchIdx" @click="fn_orgControl('02', usuSrchItem, $event, 'usury')" ref="usury_srch">
								<label :for="'usury_srch_'+usuSrchIdx" class="bank_state_che">
									<i :class="'ico_bank '+usuSrchItem.orgC"></i>
									<div class="ipt_txt_flex">
										<strong class="bank_name">{{usuSrchItem.orgnm}}</strong>
										<span class="icon_mint" v-if="usuSrchItem.colYn === '1'">연결됨</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
				</div>
				<!-- <div class="custom_list" v-if="bond_srch_list.length > 0">
					<div class="new_tit_area">
						<div class="tit">
							<span>채권</span>
						</div>
					</div>
					<ul class="list_type_01">
						<li v-for="(bondSrchItem, bondSrchIdx) in bond_srch_list" :key="'bond_srch_'+bondSrchIdx">
							<div class="bank_state_che" v-if="bondSrchItem.scrnMrkYn === '0'">
								<i :class="'ico_bank '+bondSrchItem.orgC"></i>
								<div class="ipt_txt_flex">
									<strong class="bank_name">{{bondSrchItem.orgnm}}</strong>
									<span class="icon_mint">준비중</span>
								</div>
							</div>
							<div class="ipt_wrap" v-else>
								<input type="checkbox" :id="'bond_srch_'+bondSrchIdx" @click="fn_orgControl('02', bondSrchItem, $event, 'bond')" ref="bond_srch">
								<label :for="'bond_srch_'+bondSrchIdx" class="bank_state_che">
									<i :class="'ico_bank '+bondSrchItem.orgC"></i>
									<div class="ipt_txt_flex">
										<strong class="bank_name">{{bondSrchItem.orgnm}}</strong>
										<span class="icon_mint" v-if="bondSrchItem.colYn === '1'">연결됨</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
				</div> -->
				<div class="custom_list" v-if="p2p_srch_list.length > 0">
					<div class="new_tit_area">
						<div class="tit">
							<span>P2P</span>
						</div>
					</div>
					<ul class="list_type_01">
						<li v-for="(p2pSrchItem, p2pSrchIdx) in p2p_srch_list" :key="'p2p_srch_'+p2pSrchIdx">
							<div class="bank_state_che" v-if="p2pSrchItem.scrnMrkYn === '0'">
								<i :class="'ico_bank '+p2pSrchItem.orgC"></i>
								<div class="ipt_txt_flex">
									<strong class="bank_name">{{p2pSrchItem.orgnm}}</strong>
									<span class="icon_mint">준비중</span>
								</div>
							</div>
							<div class="ipt_wrap" v-else>
								<input type="checkbox" v-model="selectedP2p" :value="p2pSrchItem"  :id="'p2p_srch_'+p2pSrchIdx" @click="fn_orgControl('02', p2pSrchItem, $event, 'p2p')" ref="p2p_srch">
								<label :for="'p2p_srch_'+p2pSrchIdx" class="bank_state_che">
									<i :class="'ico_bank '+p2pSrchItem.orgC"></i>
									<div class="ipt_txt_flex">
										<strong class="bank_name">{{p2pSrchItem.orgnm}}</strong>
										<span class="icon_mint" v-if="p2pSrchItem.colYn === '1'">연결됨</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
				</div>

				<!-- 공공 -->
				<div class="custom_list" v-if="public_srch_list.length > 0">
					<div class="new_tit_area">
						<div class="tit">
							<span>공공</span>
						</div>
					</div>
					<ul class="list_type_01">
						<li v-for="(publicSrchItem, publicSrchIdx) in public_srch_list" :key="'public_srch'+publicSrchIdx">
							<div class="bank_state_che" v-if="publicSrchItem.scrnMrkYn === '0'">
								<i :class="'ico_bank '+publicSrchItem.orgC"></i>
								<div class="ipt_txt_flex">
									<strong class="bank_name">{{publicSrchItem.orgnm}}</strong>
									<span class="icon_mint">준비중</span>
								</div>
							</div>
							<div class="ipt_wrap" v-else>
								<input type="checkbox" v-model="selectedPublic" :value="publicSrchItem"  :id="'public_srch'+publicSrchIdx" @click="fn_orgControl('02', publicSrchItem, $event, 'public')" ref="public_srch">
								<label :for="'public_srch'+publicSrchIdx" class="bank_state_che">
									<i :class="'ico_bank '+publicSrchItem.orgC"></i>
									<div class="ipt_txt_flex">
										<strong class="bank_name">{{publicSrchItem.orgnm}}</strong>
										<span class="icon_mint" v-if="publicSrchItem.colYn === '1'">연결됨</span>
									</div>
								</label>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<!-- //검색결과 -->
		</div>
		<div class="popup_footer fixed">
			<div class="btn_full_box">
				<a href="javascript:void(0);" role="button" class="btn btn_mint" aria-disabled="false" v-if="btnViewYn" @click.prevent="fn_openNextProcess()"><em>{{selAllCnt}}</em>개 기관 연결하기</a>
				<a href="javascript:void(0);" role="button" class="btn btn_off" aria-disabled="true" v-else>연결하기</a><!-- 비활성화 btn_off / 활성화 btn_mint -->
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click="fn_close()"><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->
</template>

<script>
/*eslint-disable */
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
import apiService from '@/service/apiService'
import commonService from '@/service/commonService'
import {mapGetters} from 'vuex'
import _ from 'lodash'

import COAR2003 from '@/views/page/CO/AR/COAR2003/COAR2003.vue'
import COAR2005 from '@/views/page/CO/AR/COAR2005/COAR2005.vue'
import COAR2007 from '@/views/page/CO/AR/COAR2007/COAR2007.vue'
import COAR2008 from '@/views/page/CO/AR/COAR2008/COAR2008.vue'





export default {
    name : "COAR2002",
    data: () => {
        return {
			evtFlag : false,

			curActive : '',

			bank_list 		: [],	// 은행리스트
			invest_list 	: [],	// 증권리스트
			card_list 		: [],	// 카드리스트
			insu_list 		: [],	// 보험리스트
			efin_list 		: [],	// 전자금융리스트
			capital_list 	: [],	// 할부금융리스트
			ginsu_list 		: [],	// 보증보험리스트
			telecom_list 	: [],	// 통신리스트
			usury_list 		: [],	// 대부리스트
			bond_list 		: [],	// 채권리스트
			p2p_list 		: [],	// p2p리스트
			public_list 	: [],	// 공공기관 리스트

			amnCOrgList		: [],	// 체크활성 & 많이이용하는기관 리스트

			bank_cnt		: 0,	// 은행업권 기관수
			invest_cnt		: 0, 	// 증권업권 기관수
			card_cnt 		: 0,	// 카드업권 기관수
			insu_cnt 		: 0,	// 보험업권 기관수
			efin_cnt 		: 0,	// 전금업권 기관수
			capital_cnt		: 0,	// 할부업권 기관수
			ginsu_cnt 		: 0,	// 보증보험업권 기관수
			telecom_cnt		: 0,	// 통신업권 기관수
			usury_cnt 		: 0,	// 대부업권 기관수
			bond_cnt 		: 0,	// 채권업권 기관수
			p2p_cnt 		: 0,	// p2p업권 기관수
			public_cnt 		: 0,	// 공공 기관수

			// 선택 기관 리스트
			selectedBank 	: [],	// 선택한 은행
			selectedInvest 	: [],	// 선택한 증권
			selectedCard 	: [],	// 선택한 카드
			selectedInsu 	: [],	// 선택한 보험
			selectedEfin 	: [],	// 선택한 전자금융
			selectedCapital : [],	// 선택한 할부금융
			selectedGinsu 	: [],	// 선택한 보증보험
			selectedTelecom : [],	// 선택한 통신
			selectedUsury 	: [],	// 선택한 대부
			selectedBond 	: [],	// 선택한 채권
			selectedP2p 	: [],	// 선택한 P2P
			selectedPublic  : [],   // 선택한 공공기관

			moduleList 	: [],	// 다음 프로세스 파라미터용 기관 목록

			///////////////// 검색 관련 파라미터 /////////////////
			srchKeyword : "",	// 검색 키워드
			isSrchYn 	: false,// 연결기관 검색 여부
			bank_srch_list 		: [],	// 은행 검색리스트
			invest_srch_list 	: [],	// 증권 검색리스트
			card_srch_list 		: [],	// 카드 검색리스트
			insu_srch_list 		: [],	// 보험 검색리스트
			efin_srch_list 		: [],	// 전자금융 검색리스트
			capital_srch_list 	: [],	// 할부금융 검색리스트
			ginsu_srch_list 	: [],	// 보증보험 검색리스트
			telecom_srch_list 	: [],	// 통신 검색리스트
			usury_srch_list 	: [],	// 대부 검색리스트
			bond_srch_list 		: [],	// 채권 검색리스트
			p2p_srch_list 		: [],	// p2p 검색리스트
			public_srch_list 	: [],	// 공공기관 검색리스트
			/////////////////////////////////////////////////////



			///////////////// 연결기관관리 팝업 파라미터 ///////////////// 
			isMramNew	: false,// '연결기관관리' 팝업에서 신규추가로 넘어온 여부
			isMramMod	: "",// '연결기관관리' 팝업에서 변경으로 넘어온 여부
			orgDsc		: '',	// 업권
			mramSelList : [],	// '연결기관관리'에서 선택한 기관 리스트
			////////////////////////////////////////////////////////////


			///////////////// 외부에서 연결요청 파라미터 (PDRT2005 : 노후준비 , PDTX200.. : 세금현황  등등)  /////////////
			isExternal	: false,
        }
	},
	beforeMount() {
		//commonMixin의 updated가 실행되지 않아 직접호출(=화면갱신이 안되는경우.)
		//웹접근성관련 호출
		this.callJQueryWebAccessibility()
	},
    mounted() {
		/*lnb-filter 버튼 클릭이벤트*/
		let _lnb = $('.lnb.lnb_filter'),
				_lnbCnt = _lnb.find('[role=tablist] > li').length, //탭전체 개수
				_ldx = _lnb.find('[role=tablist] > li.on').index(), //현재 선택된 탭 위치
				_width = _lnb.find('[role=tablist]').width(), //탭전체 넓이
				_totCnt = (_width/_lnbCnt)*_ldx; //선택된 탭을 이동할 위치
		_lnb.append('<button class="btn_lnb"><span class="blind">카테고리 펼치기</span></button>')

		$('.btn_lnb').on('click', function(){
			$(this).parent().toggleClass('is_open');
			$(this).toggleClass('open');

			_ldx = _lnb.find('[role=tablist] > li.on').index(); //현재 선택된 탭 위치
			_totCnt = (_width/_lnbCnt)*_ldx; //선택된 탭을 이동할 위치
			$('.tablistBox').animate({'scrollLeft':_totCnt},10); //접기 후 선택된 탭이동

			if($(this).hasClass('open')){
				$(this).children().text('카테고리 접기');
			} else {
				$(this).children().text('카테고리 펼치기');
			}
		});
		//탭선택 시 스크롤 옮기기
		// $('.lnb [role=tablist] > li').each(function(){
		// 	$(this).on('click', function(){
		// 		let scrollTo = $(this).position().left - 120;
		// 		$(this).parents().animate({'scrollLeft':scrollTo},500);
		// 		//console.log(scrollTo);
		// 	});
		// });


		// let institutionList = $('.institution_list')
		// $('.btn_lnb').on('click', function(){
		// 	institutionList.toggleClass('pt50');
		// 	if(!$('.custom_fixed_lnb').hasClass('custom_fixed_active')) {
		// 		institutionList.removeClass('pt50');
		// 	}
		// });
		// $('.custom_fixed_lnb').scroll(function(){				
		// 	if($(this).hasClass('custom_fixed_active') && _lnb.hasClass('is_open')) {
		// 		institutionList.addClass('pt50');
		// 	} else {
		// 		institutionList.removeClass('pt50');
		// 	}
		// });


		this.initComponent(this.params)
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)     
    },
    mixins: [
		commonMixin,
        popupMixin
	],
	computed:{
        ...mapGetters('myassets', [
            'myAssetsBzRgCnt'
		]),
		btnViewYn() {
			return this.selectedBank.length > 0 || this.selectedInvest.length > 0 || this.selectedCard.length > 0 || 
					this.selectedInsu.length > 0 || this.selectedEfin.length > 0 || this.selectedCapital.length > 0 ||
					this.selectedGinsu.length > 0 || this.selectedTelecom.length > 0 || this.selectedUsury.length > 0 ||
					this.selectedBond.length > 0 || this.selectedP2p.length > 0 || this.selectedPublic.length > 0
					? true : false
		},

		//선택한 기관 갯수 computed로 변경 (2023.06.28)
		selAllCnt() {
			return  this.selectedBank.length + this.selectedInvest.length + this.selectedCard.length + 
					this.selectedInsu.length + this.selectedEfin.length + this.selectedCapital.length +
					this.selectedGinsu.length + this.selectedTelecom.length + this.selectedUsury.length +
					this.selectedBond.length + this.selectedP2p.length + this.selectedPublic.length
		},
		cbtType(){
            return this.getUserInfo('tobeType') || false
        },
	},
    methods: {
        initComponent(param = {}) {

			this.fn_busReset()
			this.getData()
			// this.fn_scrollMove()
			
			this.orgDsc = param.orgDsc || ''
			this.isMramNew = param.isMramNew || false
			this.isMramMod = param.isMramMod || ""
			this.mramSelList = param.mramSelList || []
			this.isExternal = param.isExternal || false
			this.curActive  = param.orgDsc || 'bank'
			$('#curActive').val(this.curActive)
        },
        getData() {
			const config = {
				url : "/co/ar/02r01",
				data : {
					"mydtCusno" : this.getUserInfo("mydtCusno"),
					"ofrAttcMethC" : "01"
				}
			}
			apiService.call(config).then(response => {

				this.bank_list      = response.bank_org || []		// 은행업권 리스트
                this.invest_list    = response.invest_org  || []	// 증권업권 리스트
                this.card_list      = response.card_org || []		// 카드업권 리스트
                this.insu_list      = response.insu_org || []		// 보험업권 리스트
                this.efin_list      = response.efin_org || []		// 선불업권 리스트
                this.capital_list   = response.capi_org || []		// 할부금융업권 리스트
                this.ginsu_list     = response.ginsu_org || []		// 보증보험업권 리스트
                this.telecom_list   = response.tele_org || []		// 통신업권 리스트
                this.usury_list     = response.usury_org || []		// 대부업권 리스트
                this.bond_list      = response.bond_org || []		// 채권업권 리스트
				this.p2p_list       = response.p2p_org || []		// p2p업권 리스트
				this.public_list    = response.public_org || []		// 공공기관 리스트


				// 준비중 기관 기관 개수 제외
				this.bank_cnt      = this.fn_calcOrgCnt(this.bank_list)
				this.invest_cnt    = this.fn_calcOrgCnt(this.invest_list)
				this.card_cnt      = this.fn_calcOrgCnt(this.card_list)
				this.insu_cnt      = this.fn_calcOrgCnt(this.insu_list)
				this.efin_cnt      = this.fn_calcOrgCnt(this.efin_list)
				this.capital_cnt   = this.fn_calcOrgCnt(this.capital_list)
				this.ginsu_cnt     = this.fn_calcOrgCnt(this.ginsu_list)
				this.telecom_cnt   = this.fn_calcOrgCnt(this.telecom_list)
				this.usury_cnt     = this.fn_calcOrgCnt(this.usury_list)
				this.bond_cnt      = this.fn_calcOrgCnt(this.bond_list)
				this.p2p_cnt       = this.fn_calcOrgCnt(this.p2p_list)
				this.public_cnt    = this.fn_calcOrgCnt(this.public_cnt)

				// 체크 활성화 및 많이 이용하는 기관 필터링
				this.fn_filterAmnCOrgList()

				//농업협동조합중앙회 default 연결됨으로 처리
				if(this.bank_list.length > 0) {
					this.bank_list = this.bank_list.map(bankItem => { return  bankItem.orgC === 'A4AAAZ0000' ? {...bankItem , colYn : '1'} : {...bankItem }})
				}

				// 연결됨인 기관 상단 노출되도록 sort
				this.bank_list 		= this.sortArray(this.bank_list)
				this.invest_list 	= this.sortArray(this.invest_list)
				this.card_list 		= this.sortArray(this.card_list)
				this.insu_list 		= this.sortArray(this.insu_list)
				this.efin_list 		= this.sortArray(this.efin_list)
				this.capital_list 	= this.sortArray(this.capital_list)
				this.ginsu_list 	= this.sortArray(this.ginsu_list)
				this.telecom_list 	= this.sortArray(this.telecom_list)
				this.usury_list 	= this.sortArray(this.usury_list)
				this.bond_list 		= this.sortArray(this.bond_list)
				this.p2p_list 		= this.sortArray(this.p2p_list)
				this.public_list 	= this.sortArray(this.public_list)

				this.$nextTick(() => {

					this.fn_scrollMove()

					// '연결기관관리' 내의 신규 추가로 넘어올 경우
					if((!this.isNull(this.orgDsc) && this.isMramNew) || this.isExternal) {
						/* 변경 소스 (스크롤 애니메이션 제거 요청 반영) */
						var $menu 		= $("#tab_scroll_coar2002 li"),
							$contents 	= $(".target_coar2002"),
							$orgDoc		= $("[id='content_con']"),
							$doc 		= $($orgDoc[$orgDoc.length-1]),
							$target		= $(_.find($menu, d => d.id === this.orgDsc)),
							idx			= $target.index(),
							section		= $contents.eq(idx),
							offsetTop	= $("#content_con")[0].className.indexOf("custom_fixed_active") != -1 ? section[0].offsetTop - 80 : section[0].offsetTop - 100;

						$doc.scrollTop(offsetTop)

						// // 10.28) 접근성 관련 처리
						$("#"+this.orgDsc+"Div").attr('tabindex', -1).focus()


						/* 기존 소스 (버튼 클릭방식) */
						// this.$refs[this.orgDsc+'Btn'].click()
						// $(this.$refs[this.orgDsc+'Btn']).children()[0].click()
					}

					// '연결기관관리' 내의 변경으로 넘어올 경우
					if(this.mramSelList.length > 0) {
						this.fn_setCheckList(this.mramSelList)
					}
				})

			})
		},
		/**
		 * 기관별 연결됨 기관일 경우 상단 노출되도록 sort
		 */
		sortArray(objArray) {
			const list = objArray || []

			const result = _.chain(list)
				.orderBy('colYn', 'desc')
				.value()
			
			return result
		},

		/**
		 * 체크 활성화 및 많이 이용하는 기관 필터링
		 */
		fn_filterAmnCOrgList() {
			let tmpBankList 	= _.filter(this.bank_list	, (a => a.scrnMrkYn === '1', b => b.amnOrgCYn === '1')),
				tmpInvestList 	= _.filter(this.invest_list	, (a => a.scrnMrkYn === '1', b => b.amnOrgCYn === '1')),
				tmpCardList 	= _.filter(this.card_list	, (a => a.scrnMrkYn === '1', b => b.amnOrgCYn === '1')),
				tmpInsuList 	= _.filter(this.insu_list	, (a => a.scrnMrkYn === '1', b => b.amnOrgCYn === '1')),
				tmpEfinList 	= _.filter(this.efin_list	, (a => a.scrnMrkYn === '1', b => b.amnOrgCYn === '1')),
				tmpCapitalList 	= _.filter(this.capital_list, (a => a.scrnMrkYn === '1', b => b.amnOrgCYn === '1')),
				tmpGinsuList 	= _.filter(this.ginsu_list	, (a => a.scrnMrkYn === '1', b => b.amnOrgCYn === '1')),
				tmpTelecomList 	= _.filter(this.telecom_list, (a => a.scrnMrkYn === '1', b => b.amnOrgCYn === '1')),
				tmpUsuryList 	= _.filter(this.usury_list	, (a => a.scrnMrkYn === '1', b => b.amnOrgCYn === '1')),
				tmpBondList 	= _.filter(this.bond_list	, (a => a.scrnMrkYn === '1', b => b.amnOrgCYn === '1')),
				tmpP2pList 		= _.filter(this.p2p_list	, (a => a.scrnMrkYn === '1', b => b.amnOrgCYn === '1')),
				tmpPublicList 	= _.filter(this.public_list	, (a => a.scrnMrkYn === '1', b => b.amnOrgCYn === '1'))
				

			if(tmpBankList.length > 0) 		{ this.amnCOrgList.push(...tmpBankList) }
			if(tmpInvestList.length > 0) 	{ this.amnCOrgList.push(...tmpInvestList) }
			if(tmpCardList.length > 0) 		{ this.amnCOrgList.push(...tmpCardList) }
			if(tmpInsuList.length > 0) 		{ this.amnCOrgList.push(...tmpInsuList) }
			if(tmpEfinList.length > 0) 		{ this.amnCOrgList.push(...tmpEfinList) }
			if(tmpCapitalList.length > 0) 	{ this.amnCOrgList.push(...tmpCapitalList) }
			if(tmpGinsuList.length > 0) 	{ this.amnCOrgList.push(...tmpGinsuList) }
			if(tmpTelecomList.length > 0) 	{ this.amnCOrgList.push(...tmpTelecomList) }
			if(tmpUsuryList.length > 0) 	{ this.amnCOrgList.push(...tmpUsuryList) }
			if(tmpBondList.length > 0) 		{ this.amnCOrgList.push(...tmpBondList) }
			if(tmpP2pList.length > 0) 		{ this.amnCOrgList.push(...tmpP2pList) }
			if(tmpPublicList.length > 0) 	{ this.amnCOrgList.push(...tmpPublicList) }
		},

		/**
		 * 선택리스트, 많이 이용하는 기관 비교 후 '많이 이용하는 기관 한 번에 선택' 체크 활성화 결정
		 */
		fn_getAmnCOrgChk() {
			let tmpCnt = 0

			for(const selBank of this.selectedBank) 	{ if(_.findIndex(this.amnCOrgList, d => d.orgC === selBank.orgC) > -1) tmpCnt ++ }
			for(const selCard of this.selectedCard) 	{ if(_.findIndex(this.amnCOrgList, d => d.orgC === selCard.orgC) > -1) tmpCnt ++ }
			for(const selInve of this.selectedInvest) 	{ if(_.findIndex(this.amnCOrgList, d => d.orgC === selInve.orgC) > -1) tmpCnt ++ }
			for(const selInsu of this.selectedInsu) 	{ if(_.findIndex(this.amnCOrgList, d => d.orgC === selInsu.orgC) > -1) tmpCnt ++ }
			for(const selEfin of this.selectedEfin) 	{ if(_.findIndex(this.amnCOrgList, d => d.orgC === selEfin.orgC) > -1) tmpCnt ++ }
			for(const selCapi of this.selectedCapital) 	{ if(_.findIndex(this.amnCOrgList, d => d.orgC === selCapi.orgC) > -1) tmpCnt ++ }
			for(const selGins of this.selectedGinsu) 	{ if(_.findIndex(this.amnCOrgList, d => d.orgC === selGins.orgC) > -1) tmpCnt ++ }
			for(const selTele of this.selectedTelecom) 	{ if(_.findIndex(this.amnCOrgList, d => d.orgC === selTele.orgC) > -1) tmpCnt ++ }
			for(const selUsur of this.selectedUsury) 	{ if(_.findIndex(this.amnCOrgList, d => d.orgC === selUsur.orgC) > -1) tmpCnt ++ }
			for(const selBond of this.selectedBond) 	{ if(_.findIndex(this.amnCOrgList, d => d.orgC === selBond.orgC) > -1) tmpCnt ++ }
			for(const selP2p of this.selectedP2p) 		{ if(_.findIndex(this.amnCOrgList, d => d.orgC === selP2p.orgC) > -1) tmpCnt ++ }
			for(const selPublic of this.selectedPublic) { if(_.findIndex(this.amnCOrgList, d => d.orgC === selPublic.orgC) > -1) tmpCnt ++ }

			if(this.amnCOrgList.length > 0) {
				if(tmpCnt === this.amnCOrgList.length) this.$refs.chkAmnC.checked = true
				else this.$refs.chkAmnC.checked = false
			}
		},

		/**
		 * '연결기관관리'의 선택 리스트 체크 설정
		 */
		fn_setCheckList(list) {
			for(const item of list) {	// '연결기관관리'의 선택 목록 반복
				if(item.orgDiv === 'bank') {
					// 체크 선택 가능한 요소 목록 탐색
					let bankElements = $(this.$refs['bank']).siblings().find("i")
					
					for(let i=0; i<this.bank_list.length; i++) {
						// 기관목록 반복하며 선택목록 내 기관코드 일치하는 요소 존재 확인
						let isExist = this.bank_list[i].orgC === item.orgObj.infOfrmnOrgC

						if(isExist) {
							for(let j=0; j<bankElements.length; j++) {
								if(bankElements[j].className.indexOf(this.bank_list[i].orgC) > -1) {
									// 체크 요소 확인 후 click 이벤트 발생
									this.$refs['bank'][j].click()
								}
							}
						}
					}
				} else if(item.orgDiv === 'card') {
					let cardElements = $(this.$refs['card']).siblings().find("i")

					for(let i=0; i<this.card_list.length; i++) {
						let isExist = this.card_list[i].orgC === item.orgObj.infOfrmnOrgC

						if(isExist) {
							for(let j=0; j<cardElements.length; j++) {
								if(cardElements[j].className.indexOf(this.card_list[i].orgC) > -1) {
									this.$refs['card'][j].click()
								}
							}
						}
					}
				} else if(item.orgDiv === 'invest') {
					let investElements = $(this.$refs['invest']).siblings().find("i")

					for(let i=0; i<this.invest_list.length; i++) {
						let isExist = this.invest_list[i].orgC === item.orgObj.infOfrmnOrgC

						if(isExist) {
							for(let j=0; j<investElements.length; j++) {
								if(investElements[j].className.indexOf(this.invest_list[i].orgC) > -1) {
									this.$refs['invest'][j].click()
								}
							}
						}
					}
				} else if(item.orgDiv === 'insu') {
					let insuElements = $(this.$refs['insu']).siblings().find("i")

					for(let i=0; i<this.insu_list.length; i++) {
						let isExist = this.insu_list[i].orgC === item.orgObj.infOfrmnOrgC

						if(isExist) {
							for(let j=0; j<insuElements.length; j++) {
								if(insuElements[j].className.indexOf(this.insu_list[i].orgC) > -1) {
									this.$refs['insu'][j].click()
								}
							}
						}
					}
				} else if(item.orgDiv === 'efin') {
					let efinElements = $(this.$refs['efin']).siblings().find("i")

					for(let i=0; i<this.efin_list.length; i++) {
						let isExist = this.efin_list[i].orgC === item.orgObj.infOfrmnOrgC

						if(isExist) {
							for(let j=0; j<efinElements.length; j++) {
								if(efinElements[j].className.indexOf(this.efin_list[i].orgC) > -1) {
									this.$refs['efin'][j].click()
								}
							}
						}
					}
				} else if(item.orgDiv === 'capital') {
					let capiElements = $(this.$refs['capital']).siblings().find("i")

					for(let i=0; i<this.capital_list.length; i++) {
						let isExist = this.capital_list[i].orgC === item.orgObj.infOfrmnOrgC

						if(isExist) {
							for(let j=0; j<capiElements.length; j++) {
								if(capiElements[j].className.indexOf(this.capital_list[i].orgC) > -1) {
									this.$refs['capital'][j].click()
								}
							}
						}
					}
				} else if(item.orgDiv === 'ginsu') {
					let ginsuElements = $(this.$refs['ginsu']).siblings().find("i")

					for(let i=0; i<this.ginsu_list.length; i++) {
						let isExist = this.ginsu_list[i].orgC === item.orgObj.infOfrmnOrgC

						if(isExist) {
							for(let j=0; j<ginsuElements.length; j++) {
								if(ginsuElements[j].className.indexOf(this.ginsu_list[i].orgC) > -1) {
									this.$refs['ginsu'][j].click()
								}
							}
						}
					}
				} else if(item.orgDiv === 'telecom') {
					let teleElements = $(this.$refs['telecom']).siblings().find("i")

					for(let i=0; i<this.telecom_list.length; i++) {
						let isExist = this.telecom_list[i].orgC === item.orgObj.infOfrmnOrgC

						if(isExist) {
							for(let j=0; j<teleElements.length; j++) {
								if(teleElements[j].className.indexOf(this.telecom_list[i].orgC) > -1) {
									this.$refs['telecom'][j].click()
								}
							}
						}
					}
				} else if(item.orgDiv === 'usury') {
					let usuryElements = $(this.$refs['usury']).siblings().find("i")

					for(let i=0; i<this.usury_list.length; i++) {
						let isExist = this.usury_list[i].orgC === item.orgObj.infOfrmnOrgC

						if(isExist) {
							for(let j=0; j<usuryElements.length; j++) {
								if(usuryElements[j].className.indexOf(this.usury_list[i].orgC) > -1) {
									this.$refs['usury'][j].click()
								}
							}
						}
					}
				} else if(item.orgDiv === 'bond') {
					let bondElements = $(this.$refs['bond']).siblings().find("i")

					for(let i=0; i<this.bond_list.length; i++) {
						let isExist = this.bond_list[i].orgC === item.orgObj.infOfrmnOrgC

						if(isExist) {
							for(let j=0; j<bondElements.length; j++) {
								if(bondElements[j].className.indexOf(this.bond_list[i].orgC) > -1) {
									this.$refs['bond'][j].click()
								}
							}
						}
					}
				} else if(item.orgDiv === 'p2p') {
					let p2pElements = $(this.$refs['p2p']).siblings().find("i")

					for(let i=0; i<this.p2p_list.length; i++) {
						let isExist = this.p2p_list[i].orgC === item.orgObj.infOfrmnOrgC

						if(isExist) {
							for(let j=0; j<p2pElements.length; j++) {
								if(p2pElements[j].className.indexOf(this.p2p_list[i].orgC) > -1) {
									this.$refs['p2p'][j].click()
								}
							}
						}
					}
				} else if(item.orgDiv === 'public') {
					let publicElements = $(this.$refs['public']).siblings().find("i")

					for(let i=0; i<this.public_list.length; i++) {
						let isExist = this.public_list[i].orgC === item.orgObj.infOfrmnOrgC

						if(isExist) {
							for(let j=0; j<publicElements.length; j++) {
								if(publicElements[j].className.indexOf(this.public_list[i].orgC) > -1) {
									this.$refs['public'][j].click()
								}
							}
						}
					}
				}
			}
		},

		/**
		 * '준비중' 기관 제외 연결 가능 기관 count
		 */
		fn_calcOrgCnt(orgList) {
			let tmpVal = 0;
			for(let i=0; i<orgList.length; i++) {
				if(orgList[i].scrnMrkYn === '1') tmpVal++
			}

			return tmpVal
		},

		/**
		 * 체크박스 개별 선택 이벤트
		 */
		fn_orgControl(flag, obj, event, str) {
			// 선택 기관 개수 체크
			if(this.selAllCnt + 1 > 50 && event.target.checked) {
				modalService.alert("안전한 자산 연결을 위해<br> 최대 50개까지 선택 가능해요.").then(() => {
					this.fn_chkOff(flag,str,obj)
					return
				})
				return
			}
				
			

			// 전체선택 여부 확인 후 활성화 결정
			//this.fn_getCheckSum(str)

			// '많이 이용하는 기관' 체크 활성화 결정
			this.fn_getAmnCOrgChk()

		},

		/**
		 * 개별 선택시 선택 기관 valid
		 */
		fn_chkOff(flag, str , obj){
			let objIdx;
			switch(str) {
				case 'bank' :
					objIdx = this.selectedBank.indexOf(obj)
					if(objIdx > -1) this.selectedBank.splice(objIdx, 1)
				break;
				case 'invest' :
					objIdx = this.selectedInvest.indexOf(obj)
					if(objIdx > -1) this.selectedInvest.splice(objIdx, 1)
				break;
				case 'card' :
					objIdx = this.selectedCard.indexOf(obj)
					if(objIdx > -1) this.selectedCard.splice(objIdx, 1)
				break;
				case 'insu' :
					objIdx = this.selectedInsu.indexOf(obj)
					if(objIdx > -1) this.selectedInsu.splice(objIdx, 1)
				break;
				case 'efin' :
					objIdx = this.selectedEfin.indexOf(obj)
					if(objIdx > -1) this.selectedEfin.splice(objIdx, 1)
				break;
				case 'capital' :
					objIdx = this.selectedCapital.indexOf(obj)
					if(objIdx > -1) this.selectedCapital.splice(objIdx, 1)
				break;
				case 'ginsu' :
					objIdx = this.selectedGinsu.indexOf(obj)
					if(objIdx > -1) this.selectedGinsu.splice(objIdx, 1)
				break;
				case 'telecom' :
					objIdx = this.selectedTelecom.indexOf(obj)
					if(objIdx > -1) this.selectedTelecom.splice(objIdx, 1)
				break;
				case 'usury' :
					objIdx = this.selectedUsury.indexOf(obj)
					if(objIdx > -1) this.selectedUsury.splice(objIdx, 1)
				break;
				case 'bond' :
					objIdx = this.selectedBond.indexOf(obj)
					if(objIdx > -1) this.selectedBond.splice(objIdx, 1)
				break;
				case 'p2p' :
					objIdx = this.selectedP2p.indexOf(obj)
					if(objIdx > -1) this.selectedP2p.splice(objIdx, 1)
				break;
				case 'public' :
					objIdx = this.selectedPublic.indexOf(obj)
					if(objIdx > -1) this.selectedPublic.splice(objIdx, 1)
				break;
			}
		},
		
		/**
		 * 항목 '전체선택' 클릭
		 */
		fn_chkAll(event, type) {

			// 선택 기관 개수 체크
			if(this.selAllCnt + 1 > 50 && event.target.checked) {
				modalService.alert("안전한 자산 연결을 위해<br> 최대 50개까지 선택 가능해요.").then(() => {
					//event.target.checked = false
					return
				})
				return
			}

			switch(type) {
				case 'bank' :
					// 선택 기관 리스트 초기화
					if(this.selectedBank.length < 1) {	// 전체선택 시
						for(let i=0; i<this.bank_list.length; i++) {
							// 기관 리스트 내 준비중 기관은 체크박스 생성 하지 않음
							// 체크박스가 없는 리스트 요소 우회
							if(this.bank_list[i].scrnMrkYn === '0') continue
							if(this.bank_list[i].orgC === 'A4AAAZ0000') continue
							// 선택 기관 목록에 push
							this.selectedBank.push(this.bank_list[i])
							
							if(!this.fn_chkAllValid(event, type, this.selectedBank, i)) break;
						}
					} else {					// 전체선택 해제 시
						this.selectedBank = []
					}
					break;
				case 'card' :
					if(this.selectedCard.length < 1) {	// 전체선택 시
						for(let i=0; i<this.card_list.length; i++) {
							if(this.card_list[i].scrnMrkYn === '0') continue

							this.selectedCard.push(this.card_list[i])

							if(!this.fn_chkAllValid(event, type, this.selectedCard, i)) break;
						}
					} else {
						this.selectedCard = []
					}
					break;
				case 'invest' :
					if(this.selectedInvest.length < 1) {	// 전체선택 시
						for(let i=0; i<this.invest_list.length; i++) {
							if(this.invest_list[i].scrnMrkYn === '0') continue
							this.selectedInvest.push(this.invest_list[i])
							if(!this.fn_chkAllValid(event, type, this.selectedInvest, i)) break;
						}
					} else {
						this.selectedInvest = []
					}
					break;
			
				case 'insu' :
					
					if(this.selectedInsu.length < 1) {	// 전체선택 시
						for(let i=0; i<this.insu_list.length; i++) {
							if(this.insu_list[i].scrnMrkYn === '0') continue
							this.selectedInsu.push(this.insu_list[i])
							if(!this.fn_chkAllValid(event, type, this.selectedInsu, i)) break;
						}
					} else {
						this.selectedInsu = []
					}
					break;
				case 'efin' :
					if(this.selectedEfin.length < 1) {	// 전체선택 시
						for(let i=0; i<this.efin_list.length; i++) {
							if(this.efin_list[i].scrnMrkYn === '0') continue
							this.selectedEfin.push(this.efin_list[i])
							if(!this.fn_chkAllValid(event, type, this.selectedEfin, i)) break;
						}
					} else {
						this.selectedEfin = []
					}
					break;
				case 'capital' :
					if(this.selectedCapital.length < 1) {	// 전체선택 시
						for(let i=0; i<this.capital_list.length; i++) {
							if(this.capital_list[i].scrnMrkYn === '0') continue
							this.selectedCapital.push(this.capital_list[i])

							if(!this.fn_chkAllValid(event, type, this.selectedCapital, i)) break;
						}
					} else {
						this.selectedCapital = []
					}
					break;
				case 'ginsu' :
					this.selectedGinsu = []
					if(event.target.checked) {
						for(let i=0; i<this.ginsu_list.length; i++) {
							if(this.ginsu_list[i].scrnMrkYn === '0') continue
							this.selectedGinsu.push(this.ginsu_list[i])
							if(!this.fn_chkAllValid(event, type, this.selectedGinsu, i)) break;
						}
					} else {
						this.selectedGinsu = []
					}
					break;
				case 'telecom' :
					if(this.selectedTelecom.length < 1) {
						for(let i=0; i<this.telecom_list.length; i++) {
							if(this.telecom_list[i].scrnMrkYn === '0') continue
							this.selectedTelecom.push(this.telecom_list[i])
							if(!this.fn_chkAllValid(event, type, this.selectedTelecom, i)) break;
						}
					} else {
						this.selectedTelecom = []
					}
					break;
				case 'usury' :
					if(this.selectedUsury.length < 1) {
						for(let i=0; i<this.usury_list.length; i++) {
							if(this.usury_list[i].scrnMrkYn === '0') continue
							this.selectedUsury.push(this.usury_list[i])
							if(!this.fn_chkAllValid(event, type, this.selectedUsury, i)) break;
						}
					} else {
						this.selectedUsury = []
					}
					break;
				case 'bond' :
					if(this.selectedBond.length < 1) {
						for(let i=0; i<this.bond_list.length; i++) {
							if(this.bond_list[i].scrnMrkYn === '0') continue
							this.selectedBond.push(this.bond_list[i])
							if(!this.fn_chkAllValid(event, type, this.selectedBond, i)) break;
						}
					} else {
						this.selectedBond = []
					}
					break;
				case 'p2p' :
					if(this.selectedP2p.length < 1) {
						for(let i=0; i<this.p2p_list.length; i++) {
							if(this.p2p_list[i].scrnMrkYn === '0') continue
							this.selectedP2p.push(this.p2p_list[i])
							if(!this.fn_chkAllValid(event, type, this.selectedP2p, i)) break;
						}
					} else {
						this.selectedP2p = []
					}
					break;
				case 'public' :
					if(this.selectedPublic.length < 1) {
						for(let i=0; i<this.public_list.length; i++) {
							if(this.public_list[i].scrnMrkYn === '0') continue
							this.selectedPublic.push(this.public_list[i])
							if(!this.fn_chkAllValid(event, type, this.selectedPublic, i)) break;
						}
					} else {
						this.selectedPublic = []
					}
				break;
			}

			// '많이 이용하는 기관' 체크 활성화 결정
			this.fn_getAmnCOrgChk()
		},

		/**
		 * 전체선택 validation
		 */
		fn_chkAllValid(event, type, selList, idx) {

			if(this.selAllCnt > 50) {
				// 전체선택을 통해 체크할 경우 선택기관 50개 초과 시 마지막 체크 기관 선택 무효
				modalService.alert("안전한 자산 연결을 위해<br> 최대 50개까지 선택 가능해요.").then(() => {
					let lastIdx = selList.length - 1
					selList.splice(lastIdx, 1)
					return false
				})
				return false
			} else {
				return true
			}
		},

		/**
		 * 많이 이용하는 기관 한 번에 선택 체크
		 */
		fn_chkAmnCOrgYn(event) {
		
			// let bankCompList 	= this.$refs['bank'],
			// 	cardCompList 	= this.$refs['card'],
			// 	investCompList 	= this.$refs['invest'],
			// 	insuCompList 	= this.$refs['insu'],
			// 	efinCompList 	= this.$refs['efin'],
			// 	capitalCompList = this.$refs['capital'],
			// 	ginsuCompList 	= this.$refs['ginsu'],
			// 	telecomCompList = this.$refs['telecom'],
			// 	usuryCompList 	= this.$refs['usury'],
			// 	bondCompList 	= this.$refs['bond'],
			// 	p2pCompList 	= this.$refs['p2p'],
			// 	publicCompList 	= this.$refs['public']

			// let bankCompQList 		= $(bankCompList).siblings().find("i"),
			// 	cardCompQList 		= $(cardCompList).siblings().find("i"),
			// 	investCompQList 	= $(investCompList).siblings().find("i"),
			// 	insuCompQList 		= $(insuCompList).siblings().find("i"),
			// 	efinCompQList 		= $(efinCompList).siblings().find("i"),
			// 	capitalCompQList 	= $(capitalCompList).siblings().find("i"),
			// 	ginsuCompQList 		= $(ginsuCompList).siblings().find("i"),
			// 	telecomCompQList 	= $(telecomCompList).siblings().find("i"),
			// 	usuryCompQList 		= $(usuryCompList).siblings().find("i"),
			// 	bondCompQList 		= $(bondCompList).siblings().find("i"),
			// 	p2pCompQList 		= $(p2pCompList).siblings().find("i"),
			// 	publicCompQList 	= $(publicCompList).siblings().find("i")

			//많이 이용하는 기관만 필터
			let recBankList = this.bank_list.filter(item=> item.amnOrgCYn === '1' && item.scrnMrkYn === '1') 
			let recCardList = this.card_list.filter(item=> item.amnOrgCYn === '1' && item.scrnMrkYn === '1') 
			let recInvestList = this.invest_list.filter(item=> item.amnOrgCYn === '1' && item.scrnMrkYn === '1') 
			let recInsuList = this.insu_list.filter(item=> item.amnOrgCYn === '1' && item.scrnMrkYn === '1') 
			let recEfinList = this.efin_list.filter(item=> item.amnOrgCYn === '1' && item.scrnMrkYn === '1') 
			let recCapitalList = this.capital_list.filter(item=> item.amnOrgCYn === '1' && item.scrnMrkYn === '1') 
			let recGinsuList = this.ginsu_list.filter(item=> item.amnOrgCYn === '1' && item.scrnMrkYn === '1') 
			let recTelecomList = this.telecom_list.filter(item=> item.amnOrgCYn === '1' && item.scrnMrkYn === '1') 
			let recUsuryList = this.usury_list.filter(item=> item.amnOrgCYn === '1' && item.scrnMrkYn === '1') 
			let recBondList = this.bond_list.filter(item=> item.amnOrgCYn === '1' && item.scrnMrkYn === '1') 
			let recP2pList = this.p2p_list.filter(item=> item.amnOrgCYn === '1' && item.scrnMrkYn === '1')  
			let recPublicList = this.public_list.filter(item=> item.amnOrgCYn === '1' && item.scrnMrkYn === '1') 

			let recAllCnt = recBankList.length + recCardList.length + recInvestList.length + recInsuList.length + recEfinList.length
							+ recCapitalList.length + recGinsuList.length + recTelecomList.length + recUsuryList.length + recBondList.length + recP2pList.length + recPublicList.length
		

			if(event.target.checked) {	// 체크 on
				if(this.selAllCnt + recAllCnt > 50){
					modalService.alert("안전한 자산 연결을 위해<br> 최대 50개까지 선택 가능해요.").then(() => {
						this.$refs.chkAmnC.checked = false
						return
					})
					return
				}
			
				// ASIS 로직
				// for(const publicItem of this.public_list) {
				// 	if(publicItem.amnOrgCYn === '1') {
				// 		let tmpIdx = _.findIndex(publicCompQList, d => d.className.indexOf(publicItem.orgC) > -1)
						
				// 		if(!publicCompList[tmpIdx].checked) publicCompList[tmpIdx].click()
				// 	}
				// }
				//this.selectedBank.push(...recBankList)

				this.selectedBank.push(...recBankList.filter(recItem => !this.selectedBank.includes(recItem)))
				this.selectedCard.push(...recCardList.filter(recItem => !this.selectedCard.includes(recItem)))
				this.selectedInvest.push(...recInvestList.filter(recItem => !this.selectedInvest.includes(recItem)))
				this.selectedInsu.push(...recInsuList.filter(recItem => !this.selectedInsu.includes(recItem)))
				this.selectedEfin.push(...recEfinList.filter(recItem => !this.selectedEfin.includes(recItem)))
				this.selectedCapital.push(...recCapitalList.filter(recItem => !this.selectedCapital.includes(recItem)))
				this.selectedGinsu.push(...recGinsuList.filter(recItem => !this.selectedGinsu.includes(recItem)))
				this.selectedTelecom.push(...recTelecomList.filter(recItem => !this.selectedTelecom.includes(recItem)))
				this.selectedUsury.push(...recUsuryList.filter(recItem => !this.selectedUsury.includes(recItem)))
				this.selectedBond.push(...recBondList.filter(recItem => !this.selectedBond.includes(recItem)))
				this.selectedP2p.push(...recP2pList.filter(recItem => !this.selectedP2p.includes(recItem)))
				this.selectedPublic.push(...recPublicList.filter(recItem => !this.selectedPublic.includes(recItem)))
			} else {		// 체크 off
				
				//ASIS 로직
				// for(const cardItem of this.card_list) {
				// 	if(cardItem.amnOrgCYn === '1') {
				// 		let tmpIdx = _.findIndex(cardCompQList, d => d.className.indexOf(cardItem.orgC) > -1)
						
				// 		if(cardCompList[tmpIdx].checked) cardCompList[tmpIdx].click()
				// 	}
				// }

				//체크 해제시
				//추천을 제외한 기 선택  목록 필터 후 선택된 업권배열에 push
				let excludeRecBankList = this.selectedBank.filter(item=> item.amnOrgCYn !== '1')
				this.selectedBank = []
				this.selectedBank.push(...excludeRecBankList)

				let excludeRecCardList = this.selectedCard.filter(item=> item.amnOrgCYn !== '1')
				this.selectedCard = []
				this.selectedCard.push(...excludeRecCardList)

				let excludeRecInvestList = this.selectedInvest.filter(item=> item.amnOrgCYn !== '1')
				this.selectedInvest = []
				this.selectedInvest.push(...excludeRecInvestList)

				let excludeRecInsuList = this.selectedInsu.filter(item=> item.amnOrgCYn !== '1')
				this.selectedInsu = []
				this.selectedInsu.push(...excludeRecInsuList)

				let excludeRecEfinList = this.selectedEfin.filter(item=> item.amnOrgCYn !== '1')
				this.selectedEfin = []
				this.selectedEfin.push(...excludeRecEfinList)

				let excludeRecCapitalList = this.selectedCapital.filter(item=> item.amnOrgCYn !== '1')
				this.selectedCapital = []
				this.selectedCapital.push(...excludeRecCapitalList)

				let excludeRecGinsuList = this.selectedGinsu.filter(item=> item.amnOrgCYn !== '1')
				this.selectedGinsu = []
				this.selectedGinsu.push(...excludeRecGinsuList)

				let excludeRecTelecomList = this.selectedTelecom.filter(item=> item.amnOrgCYn !== '1')
				this.selectedTelecom = []
				this.selectedTelecom.push(...excludeRecTelecomList)

				let excludeRecUsuryList = this.selectedUsury.filter(item=> item.amnOrgCYn !== '1')
				this.selectedUsury = []
				this.selectedUsury.push(...excludeRecUsuryList)

				let excludeRecBondList = this.selectedBond.filter(item=> item.amnOrgCYn !== '1')
				this.selectedBond = []
				this.selectedBond.push(...excludeRecBondList)

				let excludeRecP2pList = this.selectedP2p.filter(item=> item.amnOrgCYn !== '1')
				this.selectedP2p = []
				this.selectedP2p.push(...excludeRecP2pList)

				let excludeRecPublicList = this.selectedPublic.filter(item=> item.amnOrgCYn !== '1')
				this.selectedPublic = []
				this.selectedPublic.push(...excludeRecPublicList)
			}
		},

		/**
		 * 프로세스 진행을 위한 moduleList 생성
		 */
		fn_makeModuleList() {
			this.moduleList = []
			//ASIS 로직
			// for(let i=0; i<this.bank_list.length; i++) {	// 기관 목록만큼 반복
			// 	for(const bankItem of this.selectedBank) {	// 선택한 기관 목록 루프
			// 		if(this.bank_list[i].orgC === bankItem.orgC) {
			// 			// 선택한 기관 목록과 기본 기관 목록의 기관코드 일치 시 moduleList in
			// 			this.moduleList.push(this.bank_list[i])
			// 		}
			// 	}
			// }
			if(this.selectedBank.length > 0) this.moduleList.push(...this.selectedBank)
			if(this.selectedCard.length > 0) this.moduleList.push(...this.selectedCard)
			if(this.selectedInvest.length > 0) this.moduleList.push(...this.selectedInvest)
			if(this.selectedInsu.length > 0) this.moduleList.push(...this.selectedInsu)
			if(this.selectedEfin.length > 0) this.moduleList.push(...this.selectedEfin)
			if(this.selectedCapital.length > 0) this.moduleList.push(...this.selectedCapital)
			if(this.selectedGinsu.length > 0) this.moduleList.push(...this.selectedGinsu)
			if(this.selectedTelecom.length > 0) this.moduleList.push(...this.selectedTelecom)
			if(this.selectedUsury.length > 0) this.moduleList.push(...this.selectedUsury)
			if(this.selectedBond.length > 0) this.moduleList.push(...this.selectedBond)
			if(this.selectedP2p.length > 0) this.moduleList.push(...this.selectedP2p)
			if(this.selectedPublic.length > 0) this.moduleList.push(...this.selectedPublic)
		},

		/**
		 * 검색버튼을 통한 기관 목록 필터링
		 */
		fn_srchKeyword() {
			if(this.isNull(this.srchKeyword)) {
				modalService.alert("기관명을 입력하세요.").then(() => {
					return
				})
				return false
			}

			// 기관 검색 리스트 초기화
			this.bank_srch_list 	= []	// 은행 검색 리스트
			this.card_srch_list 	= []	// 카드 검색 리스트
			this.invest_srch_list 	= []	// 증권 검색 리스트
			this.insu_srch_list 	= []	// 보험 검색 리스트
			this.efin_srch_list 	= []	// 전금 검색 리스트
			this.capital_srch_list 	= []	// 할부 검색 리스트
			this.ginsu_srch_list 	= []	// 보증보험 검색 리스트
			this.telecom_srch_list 	= []	// 통신 검색 리스트
			this.usury_srch_list 	= []	// 대부 검색 리스트
			this.bond_srch_list 	= []	// 채권 검색 리스트
			this.p2p_srch_list 		= []	// p2p 검색 리스트
			this.public_srch_list	= []    // 공공 검색 리스트

			// 검색 키워드를 통해 각 업권 목록 필터링
			let tmpKeyword = this.srchKeyword
			this.bank_srch_list 	= this.bank_list.filter(item => item.orgnm.includes(tmpKeyword.toLowerCase()) || item.orgnm.includes(tmpKeyword.toUpperCase()))
			this.card_srch_list 	= this.card_list.filter(item => item.orgnm.includes(tmpKeyword) || item.orgnm.includes(tmpKeyword.toUpperCase()))
			this.invest_srch_list 	= this.invest_list.filter(item => item.orgnm.includes(tmpKeyword) || item.orgnm.includes(tmpKeyword.toUpperCase()))
			this.insu_srch_list 	= this.insu_list.filter(item => item.orgnm.includes(tmpKeyword) || item.orgnm.includes(tmpKeyword.toUpperCase()))
			this.efin_srch_list 	= this.efin_list.filter(item => item.orgnm.includes(tmpKeyword) || item.orgnm.includes(tmpKeyword.toUpperCase()))
			this.capital_srch_list 	= this.capital_list.filter(item => item.orgnm.includes(tmpKeyword) || item.orgnm.includes(tmpKeyword.toUpperCase()))
			this.ginsu_srch_list 	= this.ginsu_list.filter(item => item.orgnm.includes(tmpKeyword) || item.orgnm.includes(tmpKeyword.toUpperCase()))
			this.telecom_srch_list 	= this.telecom_list.filter(item => item.orgnm.includes(tmpKeyword) || item.orgnm.includes(tmpKeyword.toUpperCase()))
			this.usury_srch_list 	= this.usury_list.filter(item => item.orgnm.includes(tmpKeyword) || item.orgnm.includes(tmpKeyword.toUpperCase()))
			this.bond_srch_list 	= this.bond_list.filter(item => item.orgnm.includes(tmpKeyword) || item.orgnm.includes(tmpKeyword.toUpperCase()))
			this.p2p_srch_list 		= this.p2p_list.filter(item => item.orgnm.includes(tmpKeyword) || item.orgnm.includes(tmpKeyword.toUpperCase()))
			this.public_srch_list 	= this.public_list.filter(item => item.orgnm.includes(tmpKeyword) || item.orgnm.includes(tmpKeyword.toUpperCase()))

			// 검색결과 유무 확인
			let tmpAllListCnt = this.bank_srch_list.length + this.card_srch_list.length + this.invest_srch_list.length + this.insu_srch_list.length
								+ this.efin_srch_list.length + this.capital_srch_list.length + this.ginsu_srch_list.length + this.telecom_srch_list.length
								+ this.usury_srch_list.length + this.bond_srch_list.length + this.p2p_srch_list.length + this.public_srch_list.length
			if(tmpAllListCnt === 0) {
				modalService.alert("검색 결과가 없습니다.").then(() => {
					return
				})
				return false
			}
			this.isSrchYn = true
		},

		/**
		 * 검색 전 리스트 복원
		 */
		fn_resetList() {
			// 검색 결과 목록에서 체크 요소 동기화 / 업권별 selectList 동기화
			// ---> fn_orgControl 에서 flag='02'를 통한 개별 처리
			this.srchKeyword = "";
			// 기관 검색 리스트 초기화
			this.bank_srch_list 	= []	// 은행 검색 리스트
			this.card_srch_list 	= []	// 카드 검색 리스트
			this.invest_srch_list 	= []	// 증권 검색 리스트
			this.insu_srch_list 	= []	// 보험 검색 리스트
			this.efin_srch_list 	= []	// 전금 검색 리스트
			this.capital_srch_list 	= []	// 할부 검색 리스트
			this.ginsu_srch_list 	= []	// 보증보험 검색 리스트
			this.telecom_srch_list 	= []	// 통신 검색 리스트
			this.usury_srch_list 	= []	// 대부 검색 리스트
			this.bond_srch_list 	= []	// 채권 검색 리스트
			this.p2p_srch_list 		= []	// p2p 검색 리스트
			this.public_srch_list	= []	// 공공기관 검색 리스트

			
			this.isSrchYn = false
		},

		/**
		 * 다음 프로세스 팝업 (인증방법 선택) 오픈
		 */
		fn_openNextProcess() {
			this.fn_makeModuleList()


			//연결 화면 분기
			this.fn_makeConnect()
		},

		/**
		 * 선택기관 유형 및 기존 연결 여부에 따른 연결 화면 분기
		 * 
		 * 기존 연결된 기관만 선택 => 자산정보 선택 [COAR2008]
		 * [추가] 240104, sungchul, 기존 연결된 기관 + 미연결 공공기관
		 * 기존 연결된 기관 외 선택 및 공공기관만 선택시 [COAR2005]
		 * 기존 연결된 기관 외 선택 및 혼합 선택시 [COAR2003]
		 */
		fn_makeConnect(){
			
			//선택 리스트 중 기존에 연결 안된(신규연결) 목록
			let existConnect = this.moduleList.filter(item => item.colYn !== '1').length

			//기존 연결된 기관 외 선택 및 공공기관만 선택 여부 체크용
			let onlyPublic = this.moduleList.filter(item => item.orgBzrgC !== 'public').length

			// 240104, sungchul, 연결된 기관 수 + 미연결된 공공기관 수
			let connOrg = this.moduleList.filter(item => item.orgBzrgC !== 'public' && item.colYn == '1').length
			let notConnPublic = this.moduleList.filter(item => item.orgBzrgC == 'public' && item.colYn == '0').length

			if ( onlyPublic < 1 ) {
				//COAR2005
				console.log('공공기관만 선택 시 [COAR2005]')
				const config = {
				component : COAR2005,
					params : {
						moduleList		: this.moduleList,		// 선택한 기관 목록
						isOnlyPublic	: true,					// 공공기관만 (1차인증 필요 x)
						isMramMod		: this.isMramMod,		// '연결기관 관리 변경'을 통해 넘어올 경우 falg 값 (1 : 연결자산관리 메인에서 변경, 2 : 만료예정 기관에서 만료일 변경)
					}
				}
				modalService.openPopup(config)
				
			} else if( existConnect > notConnPublic ) {
				//COAR2003
				console.log('기존 연결된 기관 외 선택 및 혼합 선택시 [COAR2003]')
				const config = {component : COAR2003, 	
								params : {isMramMod : this.isMramMod
										,isMramNew	: this.isMramNew
										,connectFlag : "aset"
										,moduleList : this.moduleList || []
										}
				}
				modalService.openPopup(config)
			} else if ( existConnect < 1 || connOrg > 0 || notConnPublic > 0 ) {
				console.log('기존 연결된 기관 및 연결 안된 공공기관 선택 => 자산정보 선택 [COAR2008]')
				const config = {
					component : COAR2007,
					params : {
						//moduleList 		 : this.moduleList,
						selectedCnt 	 : this.moduleList.length,
						isAlreadyConnect : true,
						alreadyConList   : JSON.stringify(this.moduleList.map(item => {
																return {"org_code": item.orgC
																		,"orgBzrgC" : item.orgBzrgC}
															}))
					}
				}
				modalService.openPopup(config).then(response => {
					console.log(response)
				})
			}
		},


		/**
		 * 스크롤 및 카테고리 선택 이벤트 동작
		 */
		fn_scrollMove() {
			// 카테고리 클릭 이벤트
			// $("#tab_scroll_coar2002 li").click(function(e){
			// 	e.preventDefault();
			// 	$(this).addClass('on');
			// 	$(this).siblings().removeClass('on');
			// });

			var $menu 		= $("#tab_scroll_coar2002 li"),
				$contents 	= $(".target_coar2002"),
				$orgDoc		= $("[id='content_con']"),
				$doc 		= $($orgDoc[$orgDoc.length-1])
			
			$menu.on("click", 'a', function(e) {
				e.preventDefault();
				$menu.removeClass('on');
				$(this).parent().addClass('on')
				$('#evtFlag').val('Y')

				var $target = $(this).parent(),
					idx = $target.index(),
					section = $contents.eq(idx),
					//offsetTop = $("#content_con")[0].className.indexOf("custom_fixed_active") != -1 ? section[0].offsetTop - 130 : section[0].offsetTop - 100;
					//offsetTop = $("#tab_scroll_coar2002").hasClass("is_open") ? section[0].offsetTop - 130 : section[0].offsetTop - 100;
					offsetTop = section[0].offsetTop - Math.ceil($('#tab_scroll_coar2002').height()) - 30


					//임시 예외처리 은행 탭(검색창이 보여진..)상태에서 타 업권 선택 시
					if($("#content_con")[0].className.indexOf("custom_fixed_active") === -1 ){
						offsetTop = offsetTop - 40 - Math.ceil($('#tab_scroll_coar2002').height()) 
					} 

				$doc.stop().animate({
					scrollTop : offsetTop
				}, 800, ()=> {
					$('#evtFlag').val('N')
				});
				
				// 접근성 포커스 관련 처리
				$(section).focus();
				//$("#"+section[0].id).attr('tabindex', -1).focus()

				return false
			})

			// 스크롤 동작 이벤트
			$("#content_con").scroll(function(){
				//메뉴 탭 클릭시 스크롤 이벤트 방지처리
				if($('#evtFlag').val() === 'Y') return
				
				var sclTop = $(this).parent().children("#content_con").scrollTop() +500;
				var calcScl_top = $(this).parent().children("#content_con").scrollTop();

				$.each($contents, function(idx){
					var $target = $contents.eq(idx),
						targetTop = $target[0].offsetTop - 10;
						targetTop = Math.floor(targetTop);

					if(calcScl_top == 0) {
						$menu.removeClass('on');
						$menu.eq(0).addClass('on');
					} else if(targetTop <= sclTop) {
						$menu.removeClass('on');
						$menu.eq(idx).addClass('on');
					}
					
				})	

				

				// 상단 카테고리 자동 스크롤
				$(".tablistBox > ul").each(function(){
					
					let $itemList = $(this).children()
					let index = 100

					for(let i=0; i<$itemList.length; i++) {
						if($itemList[i].className === 'on') {
							index = i
							$('#curActive').click();
						}
					}

					let width = $(this).width()
					let length = $(this).find("li").length
					//$("#tab_scroll_coar2002").scrollLeft((width/length) * index)
					$('.tablistBox').animate({'scrollLeft':((width/length) * index)},10);

				})

			})

		},

		// 접근토큰 리셋
		fn_busReset(){
			const config = {
				url:  "/co/ar/00r02",
				data : {
                    "mydtCusno" : this.getUserInfo('mydtCusno')
				}
			}
			apiService.call(config).then(response => {
				// 금융인증, PASS 인증 관련 구분값 초기화
				commonService.removeStorage("continueCert"+this.getUserInfo("mydtCusno"))
                console.log(response)
            })
		},

		// 자산연결 모달 팝업 닫기
		fn_close(){
			if(this.isExternal) this.close()
			else this.closeAll()
		},

		// 업권 탭 클릭 이벤트
		fn_clickTab(orgBzrgC){
			this.curActive = orgBzrgC
			$('#curActive').val(orgBzrgC)
		},

		bindActiveTab(){
			let param =  $('.lnb.lnb_filter').find('[role=tablist] > li.on').attr('id')
			this.fn_clickTab(param)
		}

		
    },
    components : {
    }
}


</script>