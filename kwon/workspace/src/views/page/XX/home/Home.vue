<template>
  <page class="btn-num01">
    <div class="cmm-form-wrap">
      <div class="form-box">
        <dl>
          <dd>
            <span class="cmm-input">
              <input
                type="text"
                v-model="pageName"
                @keyup.enter="enterHandler"
                placeholder="화면 아이디 입력 후 엔터를 누르세요">
            </span>
          </dd>
        </dl>
      </div>
    </div>
    <div class="cmm-table">
			<table>
				<caption>업무권한설정</caption>
				<colgroup>
					<col style="width:6%">
					<col style="">
					<col style="width:14%">
					<col style="width:14%">
					<col style="width:14%">
					<col style="width:10%">
					<col style="width:10%">
				</colgroup>
				<thead>
					<tr>
						<th class="col" colspan="2">화면정보</th>
						<th class="col" colspan="2">개발</th>
						<th class="col" colspan="3">UI/UX</th>
					</tr>
						<tr>
							<th class="col">No.</th>
						<th class="col">
							<strong>화면아이디</strong> <span>화면이름</span>
					</th>
						<th class="col">개발데이타</th>
						<th class="col">퍼블적용</th>
						<th class="col">퍼블</th>
						<th class="col">디자인</th>
						<th class="col">기획</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(item, index) in pages"
						:key="index"
						class="view-box"
					>
						<td>{{ index }}</td>
						<td class="t-left">
              <a class="link" @click="movePage(item.screenID)" target="_blank">
                {{ item.screenID }}
                <span>{{ item.subName }}</span>
              </a>
						</td>
						<td>{{ item.devState }}</td>
						<td>-</td>
						<td>{{ item.pubState }}</td>
						<td>{{ item.desgState }}</td>
						<td>{{ item.planState }}</td>
					</tr>
					<!-- <tr class="view-box">
							<td>1</td>
						<td class="t-left">
              <a class="link" @click="movePage('PGAS0001')" target="_blank">
                PGAS0001
                <span>자산 메인</span>
              </a>
						</td>
						<td>서버</td>
						<td>디자인적용예정</td>
						<td>디자인적용예정</td>
						<td>완료</td><td>완료</td>
					</tr> -->
				</tbody>
			</table>
		</div>
    <!-- <footers type="as" /> -->
  </page>
</template>

<script>
  import Page from '@/views/layout/Page.vue'
  import json from '@/assets/json/config.json'
	import commonService from '@/service/commonService'
	// import Footers from '@/views/layout/Footers.vue'

  export default {
    name: 'Home',
    data: function() {
      return {
        pageList: null,
        pageName: null,
				rowIndex: 1,
				pages: this.getPages()
      }
    },
    methods: {
      movePage(name) {
				const config = {
					name: name,
				}
				commonService.movePage(config)
      },
      enterHandler() {
        const name = this.pageName.toUpperCase().includes('PG') ? this.pageName.toUpperCase() : this.pageName
        const page = [...json.pages, ...json.sample].find(d => d.name === name)
        if (page) {
          this.movePage(page.name)
        } else {
          alert('페이지 정보 없음')
        }
			},
			getPages() {
				const list = [
{IANum:"1",cateName:"공통",cateID:"CO",menuName:"가입",menuID:"00",subName:"서비스소개",subID:"01",pageID:"0",screenID:"UI-CO-0001",pageName:"서비스소개",planName:"한승희",desgName:"조혜민",pubName:"김은옥",pubPlan:"2020-11-13",pubEnd:"예정",devName:"유홍식",planState:"예정",desgState:"예정",pubState:"예정",devState:"예정",rework:""},
{IANum:"2",cateName:"공통",cateID:"CO",menuName:"가입",menuID:"01",subName:"이용약관동의",subID:"01",pageID:"약관동의",screenID:"UI-CO-0101",pageName:"약관동의목록",planName:"한승희",desgName:"구지운",pubName:"김은옥",pubPlan:"2020-11-13",pubEnd:"2020-11-13",devName:"유홍식",planState:"완료",desgState:"완료",pubState:"완료",devState:"예정",rework:""},
{IANum:"3",cateName:"공통",cateID:"CO",menuName:"가입",menuID:"01",subName:"이용약관동의",subID:"02",pageID:"약관상세",screenID:"UI-CO-0102",pageName:"약관동의상세",planName:"한승희",desgName:"구지운",pubName:"김은옥",pubPlan:"2020-11-13",pubEnd:"2020-11-13",devName:"유홍식",planState:"완료",desgState:"예정",pubState:"예정",devState:"예정",rework:""},
{IANum:"4",cateName:"공통",cateID:"CO",menuName:"가입",menuID:"01",subName:"이용약관동의",subID:"03",pageID:"직원/사번검색",screenID:"UI-CO-0103",pageName:"직원명검색",planName:"한승희",desgName:"구지운",pubName:"김은옥",pubPlan:"1900-01-00",pubEnd:"예정",devName:"유홍식",planState:"완료",desgState:"완료",pubState:"완료",devState:"예정",rework:""},
{IANum:"5",cateName:"공통",cateID:"CO",menuName:"가입",menuID:"01",subName:"이용약관동의",subID:"04",pageID:"직원/사번검색",screenID:"UI-CO-0104",pageName:"사번검색",planName:"한승희",desgName:"구지운",pubName:"김은옥",pubPlan:"1900-01-00",pubEnd:"예정",devName:"유홍식",planState:"완료",desgState:"완료",pubState:"완료",devState:"예정",rework:""},
{IANum:"6",cateName:"공통",cateID:"CO",menuName:"가입",menuID:"01",subName:"이용약관동의",subID:"05",pageID:"영업점검색",screenID:"UI-CO-0105",pageName:"영업점검색",planName:"한승희",desgName:"구지운",pubName:"김은옥",pubPlan:"1900-01-00",pubEnd:"예정",devName:"한승희",planState:"완료",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"7",cateName:"공통",cateID:"CO",menuName:"가입",menuID:"01",subName:"이용약관동의",subID:"06",pageID:"조합원이용약관동의",screenID:"UI-CO-0106",pageName:"조합원이용약관동의",planName:"한승희",desgName:"0",pubName:"0",pubPlan:"1900-01-00",pubEnd:"1900-01-00",devName:"0",planState:"완료",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"8",cateName:"공통",cateID:"CO",menuName:"404에러",menuID:"03",subName:"0",subID:"06",pageID:"0",screenID:"UI-CO-0306",pageName:"서비스장애",planName:"김수연",desgName:"조혜민",pubName:"김은옥",pubPlan:"2020-11-13",pubEnd:"2020-11-13",devName:"유홍식",planState:"완료",desgState:"완료",pubState:"예정",devState:"Dummy",rework:""},
{IANum:"9",cateName:"공통",cateID:"CO",menuName:"서비스오류",menuID:"03",subName:"0",subID:"02",pageID:"0",screenID:"UI-CO-0302",pageName:"서비스오류",planName:"한승희",desgName:"조혜민",pubName:"김은옥",pubPlan:"2020-11-24",pubEnd:"1900-01-00",devName:"0",planState:"완료",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"9",cateName:"공통",cateID:"CO",menuName:"시스템점검",menuID:"03",subName:"0",subID:"03",pageID:"0",screenID:"UI-CO-0303",pageName:"서비스오류",planName:"한승희",desgName:"조혜민",pubName:"김은옥",pubPlan:"2020-11-24",pubEnd:"1900-01-00",devName:"0",planState:"완료",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"10",cateName:"공통",cateID:"CO",menuName:"서비스준비중",menuID:"04",subName:"0",subID:"01",pageID:"0",screenID:"UI-CO-0401",pageName:"서비스준비중",planName:"김수연",desgName:"조혜민",pubName:"김은옥",pubPlan:"2020-11-13",pubEnd:"예정",devName:"유홍식",planState:"완료",desgState:"완료",pubState:"예정",devState:"Dummy",rework:""},
{IANum:"11",cateName:"공통",cateID:"CO",menuName:"자산관리전체메뉴",menuID:"05",subName:"목록",subID:"01",pageID:"0",screenID:"UI-CO-0501",pageName:"자산관리전체메뉴",planName:"한승희",desgName:"0",pubName:"0",pubPlan:"1900-01-00",pubEnd:"1900-01-00",devName:"0",planState:"완료",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"12",cateName:"자산현황",cateID:"AS",menuName:"메인",menuID:"00",subName:"0",subID:"01",pageID:"0",screenID:"UI-AS-0001",pageName:"자산메인",planName:"이우진",desgName:"오세진",pubName:"김은옥",pubPlan:"2020-10-08",pubEnd:"2020-10-08",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"13",cateName:"자산현황",cateID:"AS",menuName:"메인",menuID:"0",subName:"나의자산선택",subID:"0",pageID:"0",screenID:"UI-AS-0002",pageName:"나의자산선택",planName:"이우진",desgName:"구지운",pubName:"김은옥",pubPlan:"2020-11-25",pubEnd:"1900-01-00",devName:"류명훈",planState:"완료",desgState:"예정",pubState:"예정",devState:"예정",rework:""},
{IANum:"14",cateName:"자산현황",cateID:"AS",menuName:"예금",menuID:"01",subName:"목록",subID:"01",pageID:"0",screenID:"UI-AS-0101",pageName:"예금",planName:"이우진",desgName:"오세진",pubName:"김은옥",pubPlan:"2020-10-08",pubEnd:"2020-10-08",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"15",cateName:"자산현황",cateID:"AS",menuName:"예금",menuID:"01",subName:"예금상세",subID:"02",pageID:"0",screenID:"UI-AS-0102",pageName:"예금상세",planName:"이우진",desgName:"오세진",pubName:"김은옥",pubPlan:"2020-10-08",pubEnd:"2020-10-08",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"예정",devState:"서버",rework:""},
{IANum:"16",cateName:"자산현황",cateID:"AS",menuName:"예금",menuID:"01",subName:"예금상세",subID:"03",pageID:"예금관리",screenID:"UI-AS-0103",pageName:"예금관리",planName:"이우진",desgName:"오세진",pubName:"김은옥",pubPlan:"2020-10-20",pubEnd:"2020-10-14",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"예정",devState:"서버",rework:""},
{IANum:"17",cateName:"자산현황",cateID:"AS",menuName:"예금",menuID:"01",subName:"예금편집",subID:"04",pageID:"0",screenID:"UI-AS-0104",pageName:"예금편집",planName:"이우진",desgName:"오세진",pubName:"김은옥",pubPlan:"2020-10-20",pubEnd:"2020-10-15",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"예정",devState:"서버",rework:""},
{IANum:"18",cateName:"자산현황",cateID:"AS",menuName:"현금",menuID:"02",subName:"목록",subID:"01",pageID:"0",screenID:"UI-AS-0201",pageName:"현금",planName:"이우진",desgName:"오세진",pubName:"김은옥",pubPlan:"2020-10-20",pubEnd:"2020-10-14",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"19",cateName:"자산현황",cateID:"AS",menuName:"현금",menuID:"02",subName:"현금상세",subID:"02",pageID:"0",screenID:"UI-AS-0202",pageName:"현금상세",planName:"이우진",desgName:"오세진",pubName:"김은옥",pubPlan:"2020-10-20",pubEnd:"2020-10-14",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"20",cateName:"자산현황",cateID:"AS",menuName:"현금",menuID:"02",subName:"현금편집",subID:"03",pageID:"0",screenID:"UI-AS-0203",pageName:"현금편집",planName:"이우진",desgName:"오세진",pubName:"김은옥",pubPlan:"2020-10-20",pubEnd:"2020-10-15",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"예정",devState:"서버",rework:""},
{IANum:"21",cateName:"자산현황",cateID:"AS",menuName:"카드",menuID:"03",subName:"청구내역(TAB)",subID:"01",pageID:"0",screenID:"UI-AS-0301",pageName:"카드",planName:"이우진",desgName:"오세진",pubName:"김은옥",pubPlan:"2020-10-30",pubEnd:"2020-10-28",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"완료",devState:"Dummy",rework:""},
{IANum:"22",cateName:"자산현황",cateID:"AS",menuName:"카드",menuID:"03",subName:"청구내역(TAB)",subID:"02",pageID:"청구내역상세",screenID:"UI-AS-0302",pageName:"청구내역상세",planName:"이우진",desgName:"오세진",pubName:"김은옥",pubPlan:"2020-10-30",pubEnd:"2020-10-28",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"완료",devState:"Dummy",rework:""},
{IANum:"23",cateName:"자산현황",cateID:"AS",menuName:"카드",menuID:"03",subName:"이용내역(TAB)",subID:"03",pageID:"0",screenID:"UI-AS-0303",pageName:"카드",planName:"이우진",desgName:"오세진",pubName:"김은옥",pubPlan:"2020-10-23",pubEnd:"2020-10-21",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"완료",devState:"Dummy",rework:""},
{IANum:"24",cateName:"자산현황",cateID:"AS",menuName:"카드",menuID:"03",subName:"이용내역(TAB)",subID:"04",pageID:"이용내역상세",screenID:"UI-AS-0304",pageName:"이용내역상세",planName:"이우진",desgName:"오세진",pubName:"김은옥",pubPlan:"2020-10-23",pubEnd:"2020-10-23",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"완료",devState:"Dummy",rework:""},
{IANum:"25",cateName:"자산현황",cateID:"AS",menuName:"카드",menuID:"03",subName:"이용내역(TAB)",subID:"05",pageID:"[팝업]내역상세",screenID:"UI-AS-0305",pageName:"[팝업]내역상세",planName:"이우진",desgName:"오세진",pubName:"김은옥",pubPlan:"2020-10-23",pubEnd:"2020-10-23",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"완료",devState:"Dummy",rework:""},
{IANum:"26",cateName:"자산현황",cateID:"AS",menuName:"카드",menuID:"03",subName:"카드편집",subID:"06",pageID:"0",screenID:"UI-AS-0306",pageName:"카드편집",planName:"이우진",desgName:"오세진",pubName:"김은옥",pubPlan:"2020-10-23",pubEnd:"2020-10-21",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"예정",devState:"Dummy",rework:""},
{IANum:"27",cateName:"자산현황",cateID:"AS",menuName:"대출",menuID:"04",subName:"목록",subID:"01",pageID:"0",screenID:"UI-AS-0401",pageName:"대출",planName:"이우진",desgName:"구지운",pubName:"김은옥",pubPlan:"2020-10-20",pubEnd:"2020-10-14",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"28",cateName:"자산현황",cateID:"AS",menuName:"대출",menuID:"04",subName:"대출상세",subID:"02",pageID:"0",screenID:"UI-AS-0402",pageName:"대출상세",planName:"이우진",desgName:"구지운",pubName:"김은옥",pubPlan:"2020-10-20",pubEnd:"2020-10-14",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"30",cateName:"자산현황",cateID:"AS",menuName:"투자",menuID:"05",subName:"목록",subID:"01",pageID:"0",screenID:"UI-AS-0501",pageName:"투자",planName:"이우진",desgName:"구지운",pubName:"김은옥",pubPlan:"2020-10-20",pubEnd:"2020-10-16",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"예정",devState:"서버",rework:""},
{IANum:"31",cateName:"자산현황",cateID:"AS",menuName:"투자",menuID:"05",subName:"투자상세",subID:"02",pageID:"0",screenID:"UI-AS-0502",pageName:"투자상세",planName:"이우진",desgName:"구지운",pubName:"김은옥",pubPlan:"2020-10-20",pubEnd:"2020-10-16",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"32",cateName:"자산현황",cateID:"AS",menuName:"연금",menuID:"06",subName:"목록",subID:"01",pageID:"0",screenID:"UI-AS-0601",pageName:"연금",planName:"이우진",desgName:"오세진",pubName:"김은옥",pubPlan:"2020-11-06",pubEnd:"2020-10-23",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"33",cateName:"자산현황",cateID:"AS",menuName:"연금",menuID:"06",subName:"연금상세",subID:"02",pageID:"0",screenID:"UI-AS-0602",pageName:"연금상세",planName:"이우진",desgName:"오세진",pubName:"김은옥",pubPlan:"2020-11-13",pubEnd:"2020-10-23",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"34",cateName:"자산현황",cateID:"AS",menuName:"보험",menuID:"07",subName:"목록",subID:"01",pageID:"0",screenID:"UI-AS-0701",pageName:"보험",planName:"이우진",desgName:"오세진",pubName:"김은옥",pubPlan:"2020-11-13",pubEnd:"2020-10-23",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"완료",devState:"Dummy",rework:""},
{IANum:"35",cateName:"자산현황",cateID:"AS",menuName:"보험",menuID:"07",subName:"보험상세",subID:"02",pageID:"0",screenID:"UI-AS-0702",pageName:"보험상세",planName:"이우진",desgName:"오세진",pubName:"김은옥",pubPlan:"2020-11-13",pubEnd:"2020-10-23",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"완료",devState:"Dummy",rework:""},
{IANum:"36",cateName:"자산현황",cateID:"AS",menuName:"부동산",menuID:"08",subName:"목록",subID:"01",pageID:"0",screenID:"UI-AS-0801",pageName:"부동산",planName:"이우진",desgName:"오세진",pubName:"김은옥",pubPlan:"2020-11-13",pubEnd:"2020-11-13",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"37",cateName:"자산현황",cateID:"AS",menuName:"부동산",menuID:"08",subName:"부동산상세",subID:"02",pageID:"0",screenID:"UI-AS-0802",pageName:"부동산상세",planName:"이우진",desgName:"오세진",pubName:"김은옥",pubPlan:"2020-11-13",pubEnd:"2020-11-05",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"완료",devState:"서버/예정",rework:""},
{IANum:"40",cateName:"자산현황",cateID:"AS",menuName:"금",menuID:"09",subName:"목록",subID:"01",pageID:"0",screenID:"UI-AS-0901",pageName:"금",planName:"이우진",desgName:"오세진",pubName:"김은옥",pubPlan:"2020-10-20",pubEnd:"2020-10-14",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"41",cateName:"자산현황",cateID:"AS",menuName:"금",menuID:"09",subName:"금상세",subID:"02",pageID:"0",screenID:"UI-AS-0902",pageName:"금상세",planName:"이우진",desgName:"오세진",pubName:"김은옥",pubPlan:"2020-10-20",pubEnd:"2020-10-14",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"42",cateName:"자산현황",cateID:"AS",menuName:"금",menuID:"09",subName:"금편집",subID:"03",pageID:"0",screenID:"UI-AS-0903",pageName:"금편집",planName:"이우진",desgName:"오세진",pubName:"김은옥",pubPlan:"2020-10-20",pubEnd:"2020-10-15",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"예정",devState:"서버",rework:""},
{IANum:"43",cateName:"자산현황",cateID:"AS",menuName:"자산추가",menuID:"10",subName:"자산선택",subID:"01",pageID:"0",screenID:"UI-AS-1001",pageName:"자산선택",planName:"이우진",desgName:"구지운",pubName:"김은옥",pubPlan:"2020-10-20",pubEnd:"2020-10-15",devName:"유홍식",planState:"완료",desgState:"완료",pubState:"예정",devState:"서버",rework:""},
{IANum:"44",cateName:"자산현황",cateID:"AS",menuName:"자산추가",menuID:"10",subName:"예금",subID:"02",pageID:"0",screenID:"UI-AS-1002",pageName:"예금추가",planName:"이우진",desgName:"구지운",pubName:"김은옥",pubPlan:"2020-10-20",pubEnd:"2020-10-15",devName:"유홍식",planState:"완료",desgState:"완료",pubState:"완료",devState:"Dummy",rework:""},
{IANum:"45",cateName:"자산현황",cateID:"AS",menuName:"자산추가",menuID:"10",subName:"카드",subID:"03",pageID:"0",screenID:"UI-AS-1003",pageName:"카드추가",planName:"이우진",desgName:"구지운",pubName:"김은옥",pubPlan:"2020-10-20",pubEnd:"2020-10-15",devName:"유홍식",planState:"완료",desgState:"완료",pubState:"완료",devState:"Dummy",rework:""},
{IANum:"46",cateName:"자산현황",cateID:"AS",menuName:"자산추가",menuID:"10",subName:"현금",subID:"04",pageID:"0",screenID:"UI-AS-1004",pageName:"현금추가",planName:"이우진",desgName:"구지운",pubName:"김은옥",pubPlan:"2020-10-20",pubEnd:"2020-10-15",devName:"유홍식",planState:"완료",desgState:"완료",pubState:"완료",devState:"Dummy",rework:""},
{IANum:"47",cateName:"자산현황",cateID:"AS",menuName:"자산추가",menuID:"10",subName:"투자",subID:"05",pageID:"0",screenID:"UI-AS-1005",pageName:"투자추가",planName:"이우진",desgName:"구지운",pubName:"김은옥",pubPlan:"2020-10-20",pubEnd:"2020-10-15",devName:"유홍식",planState:"완료",desgState:"완료",pubState:"완료",devState:"Dummy",rework:""},
{IANum:"48",cateName:"자산현황",cateID:"AS",menuName:"자산추가",menuID:"10",subName:"연금",subID:"06",pageID:"연동하기",screenID:"UI-AS-1006",pageName:"연동하기",planName:"이우진",desgName:"구지운",pubName:"김은옥",pubPlan:"2020-10-23",pubEnd:"2020-10-21",devName:"유홍식",planState:"완료",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"49",cateName:"자산현황",cateID:"AS",menuName:"자산추가",menuID:"10",subName:"연금",subID:"07",pageID:"가입하기",screenID:"UI-AS-1007",pageName:"가입하기",planName:"이우진",desgName:"구지운",pubName:"김은옥",pubPlan:"2020-10-23",pubEnd:"2020-10-21",devName:"유홍식",planState:"완료",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"50",cateName:"자산현황",cateID:"AS",menuName:"자산추가",menuID:"10",subName:"보험",subID:"08",pageID:"0",screenID:"UI-AS-1008",pageName:"보험추가",planName:"이우진",desgName:"구지운",pubName:"김은옥",pubPlan:"2020-10-23",pubEnd:"2020-10-23",devName:"유홍식",planState:"완료",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"51",cateName:"자산현황",cateID:"AS",menuName:"자산추가",menuID:"10",subName:"RKDLQ",subID:"09",pageID:"0",screenID:"UI-AS-1009",pageName:"부동산추가",planName:"이우진",desgName:"구지운",pubName:"김은옥",pubPlan:"2020-10-20",pubEnd:"2020-10-16",devName:"유홍식",planState:"완료",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"52",cateName:"자산현황",cateID:"AS",menuName:"자산추가",menuID:"10",subName:"부동산",subID:"10",pageID:"부동산상세",screenID:"UI-AS-1010",pageName:"부동산상세",planName:"이우진",desgName:"오세진",pubName:"김은옥",pubPlan:"2020-10-20",pubEnd:"2020-10-16",devName:"유홍식",planState:"완료",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"53",cateName:"자산현황",cateID:"AS",menuName:"자산추가",menuID:"10",subName:"자동차",subID:"11",pageID:"0",screenID:"UI-AS-1011",pageName:"자동차추가",planName:"이우진",desgName:"구지운",pubName:"TBD2",pubPlan:"2020-10-23",pubEnd:"삭제",devName:"TBD",planState:"삭제",desgState:"삭제",pubState:"0",devState:"삭제",rework:""},
{IANum:"54",cateName:"자산현황",cateID:"AS",menuName:"자산추가",menuID:"10",subName:"자동차",subID:"12",pageID:"자동차상세",screenID:"UI-AS-1012",pageName:"자동차상세",planName:"이우진",desgName:"구지운",pubName:"TBD2",pubPlan:"2020-10-23",pubEnd:"삭제",devName:"TBD",planState:"삭제",desgState:"삭제",pubState:"0",devState:"삭제",rework:""},
{IANum:"55",cateName:"자산현황",cateID:"AS",menuName:"자산추가",menuID:"10",subName:"연동정보입력",subID:"13",pageID:"아이디방식(TAB)",screenID:"UI-AS-1013",pageName:"연동하기",planName:"이우진",desgName:"구지운",pubName:"김은옥",pubPlan:"2020-10-23",pubEnd:"2020-10-23",devName:"유홍식",planState:"완료",desgState:"완료",pubState:"완료",devState:"Dummy",rework:""},
{IANum:"56",cateName:"자산현황",cateID:"AS",menuName:"자산추가",menuID:"10",subName:"연동정보입력",subID:"14",pageID:"공인인증서(TAB)",screenID:"UI-AS-1014",pageName:"연동하기",planName:"이우진",desgName:"구지운",pubName:"김은옥",pubPlan:"2020-10-23",pubEnd:"2020-10-23",devName:"유홍식",planState:"완료",desgState:"완료",pubState:"완료",devState:"Dummy",rework:""},
{IANum:"57",cateName:"자산현황",cateID:"AS",menuName:"자산추가",menuID:"10",subName:"금",subID:"16",pageID:"0",screenID:"UI-AS-1016",pageName:"금추가",planName:"이우진",desgName:"구지운",pubName:"김은옥",pubPlan:"2020-10-23",pubEnd:"2020-10-23",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"58",cateName:"자산현황",cateID:"AS",menuName:"편집",menuID:"11",subName:"0",subID:"01",pageID:"0",screenID:"UI-AS-1101",pageName:"자산편집",planName:"이우진",desgName:"구지운",pubName:"김은옥",pubPlan:"2020-10-23",pubEnd:"2020-10-23",devName:"류명훈",planState:"완료",desgState:"완료",pubState:"예정",devState:"서버/예정",rework:""},
{IANum:"59",cateName:"지출분석",cateID:"IE",menuName:"메인",menuID:"00",subName:"0",subID:"01",pageID:"0",screenID:"UI-IE-0001",pageName:"지출분석메인",planName:"김수연",desgName:"오세진",pubName:"이운학",pubPlan:"2020-10-14",pubEnd:"2020-10-14",devName:"이순규",planState:"예정",desgState:"완료",pubState:"예정",devState:"서버",rework:""},
{IANum:"60",cateName:"지출분석",cateID:"IE",menuName:"월(일자별)리스트",menuID:"01",subName:"목록",subID:"01",pageID:"0",screenID:"UI-IE-0101",pageName:"지출내역리스트",planName:"김수연",desgName:"오세진",pubName:"이운학",pubPlan:"2020-10-14",pubEnd:"2020-10-14",devName:"이순규",planState:"예정",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"61",cateName:"지출분석",cateID:"IE",menuName:"월(일자별)리스트",menuID:"01",subName:"내역상세",subID:"02",pageID:"0",screenID:"UI-IE-0102",pageName:"내역상세",planName:"김수연",desgName:"오세진",pubName:"이운학",pubPlan:"2020-10-14",pubEnd:"2020-10-14",devName:"이순규",planState:"완료",desgState:"완료",pubState:"예정",devState:"서버",rework:""},
{IANum:"62",cateName:"지출분석",cateID:"IE",menuName:"월(일자별)리스트",menuID:"01",subName:"내역상세",subID:"03",pageID:"지출카테고리선택레이어",screenID:"UI-IE-0103",pageName:"지출카테고리선택(레이어)",planName:"김수연",desgName:"오세진",pubName:"이운학",pubPlan:"2020-10-20",pubEnd:"2020-10-16",devName:"이순규",planState:"완료",desgState:"완료",pubState:"예정",devState:"Dummy",rework:""},
{IANum:"63",cateName:"지출분석",cateID:"IE",menuName:"월(일자별)리스트",menuID:"01",subName:"내역상세",subID:"04",pageID:"지출카테고리편집",screenID:"UI-IE-0104",pageName:"지출,수입,이체카테고리편집",planName:"김수연",desgName:"오세진",pubName:"이운학",pubPlan:"2020-10-20",pubEnd:"2020-10-16",devName:"이순규",planState:"예정",desgState:"완료",pubState:"예정",devState:"Dummy",rework:""},
{IANum:"64",cateName:"지출분석",cateID:"IE",menuName:"월(일자별)리스트",menuID:"01",subName:"내역상세",subID:"05",pageID:"지출카테고리추가",screenID:"UI-IE-0105",pageName:"지출카테고리설정(추가)",planName:"김수연",desgName:"오세진",pubName:"이운학",pubPlan:"2020-10-20",pubEnd:"2020-10-20",devName:"이순규",planState:"완료",desgState:"완료",pubState:"완료",devState:"Dummy",rework:""},
{IANum:"65",cateName:"지출분석",cateID:"IE",menuName:"월(일자별)리스트",menuID:"01",subName:"내역상세",subID:"06",pageID:"수입,이체카테고리선택레이어",screenID:"UI-IE-0106",pageName:"수입,이체카테고리선택(레이어)",planName:"김수연",desgName:"오세진",pubName:"이운학",pubPlan:"2020-10-23",pubEnd:"2020-10-23",devName:"이순규",planState:"완료",desgState:"완료",pubState:"예정",devState:"Dummy",rework:""},
{IANum:"66",cateName:"지출분석",cateID:"IE",menuName:"월(일자별)리스트",menuID:"01",subName:"내역상세",subID:"07",pageID:"수입,이체카테고리편집",screenID:"UI-IE-0107",pageName:"지출,수입카테고리편집",planName:"김수연",desgName:"오세진",pubName:"이운학",pubPlan:"2020-10-23",pubEnd:"2020-10-23",devName:"이순규",planState:"완료",desgState:"완료",pubState:"예정",devState:"Dummy",rework:""},
{IANum:"67",cateName:"지출분석",cateID:"IE",menuName:"월(일자별)리스트",menuID:"01",subName:"내역상세",subID:"08",pageID:"수입,이체카테고리추가",screenID:"UI-IE-0108",pageName:"수입,이체카테고리설정(추가)",planName:"김수연",desgName:"오세진",pubName:"이운학",pubPlan:"2020-10-23",pubEnd:"2020-10-23",devName:"이순규",planState:"완료",desgState:"완료",pubState:"완료",devState:"Dummy",rework:""},
{IANum:"68",cateName:"지출분석",cateID:"IE",menuName:"월(일자별)리스트",menuID:"01",subName:"내역상세",subID:"09",pageID:"마이농가카테고리선택레이어",screenID:"UI-IE-0109",pageName:"마이농가카테고리선택(레이어)",planName:"김수연",desgName:"오세진",pubName:"이운학",pubPlan:"2020-10-23",pubEnd:"2020-10-23",devName:"이순규",planState:"완료",desgState:"완료",pubState:"예정",devState:"Dummy",rework:""},
{IANum:"69",cateName:"지출분석",cateID:"IE",menuName:"마이농가일괄추가",menuID:"01",subName:"0",subID:"10",pageID:"0",screenID:"UI-IE-0110",pageName:"마이농가일괄추가",planName:"김수연",desgName:"오세진",pubName:"이운학",pubPlan:"2020-10-30",pubEnd:"2020-10-23",devName:"이순규",planState:"완료",desgState:"완료",pubState:"예정",devState:"Dummy",rework:""},
{IANum:"70",cateName:"지출분석",cateID:"IE",menuName:"월(일자별)리스트",menuID:"01",subName:"내역상세",subID:"11",pageID:"지출카테고리추가",screenID:"UI-IE-0111",pageName:"지출카테고리추가아이콘선택",planName:"김수연",desgName:"오세진",pubName:"이운학",pubPlan:"2020-11-23",pubEnd:"2020-11-23",devName:"이순규",planState:"완료",desgState:"완료",pubState:"예정",devState:"0",rework:""},
{IANum:"71",cateName:"지출분석",cateID:"IE",menuName:"퀵메뉴/월(일자별)리스트",menuID:"02",subName:"내역추가",subID:"01",pageID:"0",screenID:"UI-IE-0201",pageName:"내역추가",planName:"김수연",desgName:"오세진",pubName:"이운학",pubPlan:"2020-10-20",pubEnd:"2020-10-16",devName:"이순규",planState:"완료",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"72",cateName:"지출분석",cateID:"IE",menuName:"고정지출/변동지출요약",menuID:"03",subName:"고정지출/변동지출요약",subID:"01",pageID:"0",screenID:"UI-IE-0301",pageName:"이번달요약",planName:"김수연",desgName:"오세진",pubName:"이운학",pubPlan:"2020-10-20",pubEnd:"2020-10-16",devName:"이순규",planState:"예정",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"73",cateName:"지출분석",cateID:"IE",menuName:"고정지출/변동지출요약",menuID:"03",subName:"고정지출/변동지출요약",subID:"02",pageID:"고정지출상세",screenID:"UI-IE-0302",pageName:"내역상세",planName:"김수연",desgName:"오세진",pubName:"이운학",pubPlan:"2020-10-20",pubEnd:"2020-10-20",devName:"이순규",planState:"완료",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"75",cateName:"지출분석",cateID:"IE",menuName:"카테고리별지출요약",menuID:"04",subName:"0",subID:"01",pageID:"0",screenID:"UI-IE-0401",pageName:"카테고리별",planName:"김수연",desgName:"구지운",pubName:"이운학",pubPlan:"2020-10-23",pubEnd:"2020-10-23",devName:"이순규",planState:"완료",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"76",cateName:"지출분석",cateID:"IE",menuName:"카테고리별지출요약",menuID:"04",subName:"카테고리별지출내역",subID:"02",pageID:"0",screenID:"UI-IE-0402",pageName:"카테고리별지출내역",planName:"김수연",desgName:"구지운",pubName:"이운학",pubPlan:"2020-10-23",pubEnd:"2020-10-23",devName:"이순규",planState:"완료",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"77",cateName:"지출분석",cateID:"IE",menuName:"달력",menuID:"05",subName:"목록",subID:"01",pageID:"0",screenID:"UI-IE-0501",pageName:"달력메인",planName:"김수연",desgName:"오세진",pubName:"이운학",pubPlan:"2020-10-23",pubEnd:"2020-10-23",devName:"이순규",planState:"예정",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"78",cateName:"지출분석",cateID:"IE",menuName:"달력",menuID:"05",subName:"메인(날짜선택)",subID:"01",pageID:"일간내역,월간할부내역",screenID:"UI-IE-0501",pageName:"달력메인(날짜선택)",planName:"김수연",desgName:"오세진",pubName:"이운학",pubPlan:"2020-10-30",pubEnd:"2020-10-23",devName:"이순규",planState:"예정",desgState:"완료",pubState:"예정",devState:"서버",rework:""},
{IANum:"79",cateName:"지출분석",cateID:"IE",menuName:"예산",menuID:"06",subName:"0",subID:"01",pageID:"0",screenID:"UI-IE-0601",pageName:"예산설정",planName:"김수연",desgName:"오세진",pubName:"이운학",pubPlan:"2020-10-30",pubEnd:"2020-10-23",devName:"이순규",planState:"완료",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"80",cateName:"지출분석",cateID:"IE",menuName:"예산",menuID:"06",subName:"설정",subID:"02",pageID:"0",screenID:"UI-IE-0602",pageName:"예산관리",planName:"김수연",desgName:"오세진",pubName:"이운학",pubPlan:"2020-10-30",pubEnd:"2020-10-28",devName:"이순규",planState:"완료",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"81",cateName:"지출분석",cateID:"IE",menuName:"예산",menuID:"06",subName:"설정",subID:"03",pageID:"카테고리예산설정",screenID:"UI-IE-0603",pageName:"카테고리예산설정",planName:"김수연",desgName:"오세진",pubName:"이운학",pubPlan:"2020-11-06",pubEnd:"2020-11-03",devName:"이순규",planState:"완료",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"82",cateName:"지출분석",cateID:"IE",menuName:"예산",menuID:"06",subName:"월별그외예산지출내역",subID:"04",pageID:"0",screenID:"UI-IE-0604",pageName:"월별그외예산지출내역",planName:"김수연",desgName:"오세진",pubName:"이운학",pubPlan:"2020-10-23",pubEnd:"2020-10-23",devName:"이순규",planState:"완료",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"83",cateName:"지출분석",cateID:"IE",menuName:"지출내역숨김해제",menuID:"07",subName:"0",subID:"01",pageID:"0",screenID:"UI-IE-0701",pageName:"숨긴내역보관함",planName:"김수연",desgName:"오세진",pubName:"이운학",pubPlan:"2020-11-06",pubEnd:"2020-10-23",devName:"이순규",planState:"완료",desgState:"완료",pubState:"완료",devState:"서버",rework:""},
{IANum:"84",cateName:"마이농가",cateID:"SZ",menuName:"수익관리",menuID:"00",subName:"메인",subID:"01",pageID:"0",screenID:"UI-SZ-0001",pageName:"메인",planName:"이은주",desgName:"구지운",pubName:"김경민",pubPlan:"2020-10-14",pubEnd:"2020-10-14",devName:"김성진",planState:"예정",desgState:"완료",pubState:"예정",devState:"Dummy",rework:""},
{IANum:"85",cateName:"마이농가",cateID:"SZ",menuName:"수익관리",menuID:"01",subName:"기간별",subID:"01",pageID:"0",screenID:"UI-SZ-0101",pageName:"기간별",planName:"이은주",desgName:"구지운",pubName:"김경민",pubPlan:"2020-10-14",pubEnd:"2020-10-14",devName:"김성진",planState:"예정",desgState:"완료",pubState:"예정",devState:"Dummy",rework:""},
{IANum:"86",cateName:"마이농가",cateID:"SZ",menuName:"수익관리",menuID:"01",subName:"지난해비교",subID:"02",pageID:"0",screenID:"UI-SZ-0102",pageName:"지난해비교",planName:"이은주",desgName:"구지운",pubName:"김경민",pubPlan:"2020-10-20",pubEnd:"2020-10-20",devName:"김성진",planState:"완료",desgState:"완료",pubState:"예정",devState:"Dummy",rework:""},
{IANum:"87",cateName:"마이농가",cateID:"SZ",menuName:"수익관리",menuID:"01",subName:"수입/지출내역",subID:"03",pageID:"0",screenID:"UI-SZ-0103",pageName:"수입/지출내역",planName:"이은주",desgName:"구지운",pubName:"김경민",pubPlan:"2020-10-23",pubEnd:"2020-10-23",devName:"김성진",planState:"예정",desgState:"완료",pubState:"완료",devState:"Dummy",rework:""},
{IANum:"88",cateName:"마이농가",cateID:"SZ",menuName:"수익관리",menuID:"01",subName:"수입/지출내역(카테고리변경)",subID:"07",pageID:"0",screenID:"UI-SZ-0107",pageName:"카테고리변경",planName:"이은주",desgName:"0",pubName:"김경민",pubPlan:"1900-01-00",pubEnd:"예정",devName:"김성진",planState:"예정",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"89",cateName:"마이농가",cateID:"SZ",menuName:"수익관리",menuID:"01",subName:"카테고리선택(카테고리변경)",subID:"08",pageID:"0",screenID:"UI-SZ-0108",pageName:"카테고리선택",planName:"이은주",desgName:"0",pubName:"김경민",pubPlan:"1900-01-00",pubEnd:"예정",devName:"김성진",planState:"예정",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"90",cateName:"마이농가",cateID:"SZ",menuName:"수익관리",menuID:"01",subName:"수입/지출추가",subID:"09",pageID:"0",screenID:"UI-SZ-0109",pageName:"내역추가",planName:"이은주",desgName:"0",pubName:"김경민",pubPlan:"1900-01-00",pubEnd:"예정",devName:"김성진",planState:"예정",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"91",cateName:"마이농가",cateID:"SZ",menuName:"수익관리",menuID:"01",subName:"수입/지출내역상세",subID:"10",pageID:"0",screenID:"UI-SZ-0110",pageName:"내역상세",planName:"이은주",desgName:"0",pubName:"김경민",pubPlan:"1900-01-00",pubEnd:"예정",devName:"김성진",planState:"완료",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"92",cateName:"마이농가",cateID:"SZ",menuName:"수익관리",menuID:"01",subName:"카테고리선택",subID:"11",pageID:"0",screenID:"UI-SZ-0111",pageName:"카테고리선택",planName:"이은주",desgName:"0",pubName:"김경민",pubPlan:"1900-01-00",pubEnd:"예정",devName:"김성진",planState:"예정",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"93",cateName:"마이농가",cateID:"SZ",menuName:"수익관리",menuID:"01",subName:"카테고리편집(지출/수입탭)",subID:"12",pageID:"0",screenID:"UI-SZ-0112",pageName:"카테고리편집",planName:"이은주",desgName:"0",pubName:"김경민",pubPlan:"1900-01-00",pubEnd:"예정",devName:"김성진",planState:"완료",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"94",cateName:"마이농가",cateID:"SZ",menuName:"수익관리",menuID:"01",subName:"카테고리편집(지출)",subID:"13",pageID:"0",screenID:"UI-SZ-0113",pageName:"카테고리편집",planName:"이은주",desgName:"0",pubName:"김경민",pubPlan:"1900-01-00",pubEnd:"예정",devName:"김성진",planState:"예정",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"95",cateName:"마이농가",cateID:"SZ",menuName:"수익관리",menuID:"01",subName:"카테고리편집(수입)",subID:"14",pageID:"0",screenID:"UI-SZ-0114",pageName:"카테고리편집",planName:"이은주",desgName:"0",pubName:"김경민",pubPlan:"1900-01-00",pubEnd:"예정",devName:"김성진",planState:"예정",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"96",cateName:"마이농가",cateID:"SZ",menuName:"수익관리",menuID:"01",subName:"카테고리추가",subID:"15",pageID:"0",screenID:"UI-SZ-0115",pageName:"카테고리추가",planName:"이은주",desgName:"0",pubName:"김경민",pubPlan:"1900-01-00",pubEnd:"예정",devName:"김성진",planState:"예정",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"97",cateName:"마이농가",cateID:"SZ",menuName:"수익관리",menuID:"01",subName:"기간설정",subID:"04",pageID:"0",screenID:"UI-SZ-0104",pageName:"기간설정",planName:"이은주",desgName:"구지운",pubName:"김경민",pubPlan:"2020-10-23",pubEnd:"2020-10-23",devName:"김성진",planState:"완료",desgState:"완료",pubState:"예정",devState:"Dummy",rework:""},
{IANum:"98",cateName:"마이농가",cateID:"SZ",menuName:"수익관리",menuID:"01",subName:"영농수익계산",subID:"05",pageID:"0",screenID:"UI-SZ0105",pageName:"영농수익계산",planName:"이은주",desgName:"구지운",pubName:"김경민",pubPlan:"2020-10-30",pubEnd:"2020-10-23",devName:"김성진",planState:"완료",desgState:"완료",pubState:"완료",devState:"Dummy",rework:""},
{IANum:"99",cateName:"마이농가",cateID:"SZ",menuName:"수익관리",menuID:"01",subName:"영농자금대출",subID:"06",pageID:"0",screenID:"UI-SZ0106",pageName:"영농자금대출",planName:"이은주",desgName:"구지운",pubName:"김경민",pubPlan:"2020-10-30",pubEnd:"2020-10-23",devName:"김성진",planState:"예정",desgState:"완료",pubState:"완료",devState:"Dummy",rework:""},
{IANum:"100",cateName:"마이농가",cateID:"SZ",menuName:"정책자금",menuID:"02",subName:"농업정책자금",subID:"01",pageID:"0",screenID:"UI-SZ-0201",pageName:"농업정책자금",planName:"이은주",desgName:"구지운",pubName:"김경민",pubPlan:"2020-10-30",pubEnd:"2020-10-28",devName:"김성진",planState:"완료",desgState:"예정",pubState:"완료",devState:"서버",rework:""},
{IANum:"101",cateName:"마이농가",cateID:"SZ",menuName:"정책자금",menuID:"02",subName:"농업정책자금상세",subID:"02",pageID:"0",screenID:"UI-SZ-0202",pageName:"농업정책자금상세",planName:"이은주",desgName:"오세진",pubName:"김경민",pubPlan:"2020-10-30",pubEnd:"2020-10-28",devName:"김성진",planState:"예정",desgState:"예정",pubState:"예정",devState:"서버",rework:""},
{IANum:"103",cateName:"마이농가",cateID:"SZ",menuName:"정책자금",menuID:"03",subName:"정책자금",subID:"01",pageID:"0",screenID:"UI-SZ-0301",pageName:"정책자금",planName:"이은주",desgName:"구지운",pubName:"김경민",pubPlan:"2020-10-30",pubEnd:"2020-10-28",devName:"TBD",planState:"예정",desgState:"완료",pubState:"예정",devState:"서버",rework:""},
{IANum:"104",cateName:"마이농가",cateID:"SZ",menuName:"정책자금",menuID:"03",subName:"맞춤정책자금",subID:"02",pageID:"0",screenID:"UI-SZ-0302",pageName:"맞춤정책자금",planName:"이은주",desgName:"구지운",pubName:"김경민",pubPlan:"2020-10-30",pubEnd:"2020-10-28",devName:"TBD",planState:"예정",desgState:"완료",pubState:"예정",devState:"서버",rework:""},
{IANum:"105",cateName:"마이농가",cateID:"SZ",menuName:"정책자금",menuID:"03",subName:"정책자금상세",subID:"03",pageID:"0",screenID:"UI-SZ-0303",pageName:"정책자금상세",planName:"이은주",desgName:"구지운",pubName:"김경민",pubPlan:"2020-11-06",pubEnd:"2020-11-06",devName:"TBD",planState:"예정",desgState:"완료",pubState:"예정",devState:"서버",rework:""},
{IANum:"107",cateName:"마이농가",cateID:"SZ",menuName:"정책자금",menuID:"03",subName:"맞춤검색",subID:"06",pageID:"0",screenID:"UI-SZ-0306",pageName:"맞춤검색",planName:"이은주",desgName:"구지운",pubName:"김경민",pubPlan:"2020-11-06",pubEnd:"2020-11-06",devName:"TBD",planState:"완료",desgState:"완료",pubState:"예정",devState:"서버",rework:""},
{IANum:"108",cateName:"마이농가",cateID:"SZ",menuName:"정책자금",menuID:"03",subName:"정책자금카테고리",subID:"08",pageID:"0",screenID:"UI-SZ-0308",pageName:"정책자금카테고리",planName:"이은주",desgName:"구지운",pubName:"김경민",pubPlan:"2020-11-20",pubEnd:"예정",devName:"TBD",planState:"예정",desgState:"완료",pubState:"예정",devState:"Dummy",rework:""},
{IANum:"109",cateName:"마이농가",cateID:"SZ",menuName:"정책자금",menuID:"03",subName:"정책자금카테고리상세",subID:"07",pageID:"0",screenID:"UI-SZ-0307",pageName:"정책자금카테고리상세",planName:"이은주",desgName:"구지운",pubName:"김경민",pubPlan:"2020-11-06",pubEnd:"2020-11-06",devName:"TBD",planState:"예정",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"110",cateName:"마이농가",cateID:"SZ",menuName:"정책자금",menuID:"03",subName:"복지지원금카테고리",subID:"09",pageID:"0",screenID:"UI-SZ-0309",pageName:"복지지원금카테고리",planName:"이은주",desgName:"구지운",pubName:"김경민",pubPlan:"2020-11-20",pubEnd:"예정",devName:"TBD",planState:"완료",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"111",cateName:"마이농가",cateID:"SZ",menuName:"정책자금",menuID:"03",subName:"복지지원금카테고리상세",subID:"10",pageID:"0",screenID:"UI-SZ-0310",pageName:"복지지원금카테고리상세",planName:"이은주",desgName:"구지운",pubName:"김경민",pubPlan:"2020-11-20",pubEnd:"예정",devName:"TBD",planState:"완료",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"112",cateName:"마이농가",cateID:"SZ",menuName:"자금설계",menuID:"04",subName:"검색",subID:"01",pageID:"목록",screenID:"UI-SZ-0401",pageName:"농기계검색",planName:"한승희",desgName:"조혜민",pubName:"TBD",pubPlan:"2020-11-06",pubEnd:"2020-11-13",devName:"TBD",planState:"예정",desgState:"예정",pubState:"예정",devState:"예정",rework:""},
{IANum:"113",cateName:"마이농가",cateID:"SZ",menuName:"자금설계",menuID:"04",subName:"검색",subID:"04",pageID:"검색필터",screenID:"UI-SZ-0404",pageName:"검색필터",planName:"한승희",desgName:"구지운",pubName:"TBD",pubPlan:"2020-11-20",pubEnd:"2020-11-13",devName:"TBD",planState:"완료",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"114",cateName:"마이농가",cateID:"SZ",menuName:"자금설계",menuID:"04",subName:"검색",subID:"05",pageID:"농기계검색",screenID:"UI-SZ-0405",pageName:"농기계기종검색",planName:"한승희",desgName:"조혜민",pubName:"TBD",pubPlan:"2020-11-20",pubEnd:"예정",devName:"TBD",planState:"완료",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"116",cateName:"마이농가",cateID:"SZ",menuName:"자금설계",menuID:"04",subName:"검색",subID:"07",pageID:"대출한도검색",screenID:"UI-SZ-0407",pageName:"대출한도검색",planName:"한승희",desgName:"구지운",pubName:"TBD",pubPlan:"2020-11-20",pubEnd:"예정",devName:"TBD",planState:"완료",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"117",cateName:"마이농가",cateID:"SZ",menuName:"자금설계",menuID:"04",subName:"검색",subID:"08",pageID:"업체검색",screenID:"UI-SZ-0408",pageName:"업체검색",planName:"한승희",desgName:"조혜민",pubName:"TBD",pubPlan:"2020-11-20",pubEnd:"예정",devName:"TBD",planState:"완료",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"118",cateName:"마이농가",cateID:"SZ",menuName:"자금설계",menuID:"04",subName:"검색",subID:"02",pageID:"대출설계",screenID:"UI-SZ-0402",pageName:"농기계구입자금대출설계",planName:"한승희",desgName:"조혜민",pubName:"TBD",pubPlan:"2020-11-13",pubEnd:"2020-11-13",devName:"TBD",planState:"완료",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"119",cateName:"마이농가",cateID:"SZ",menuName:"자금설계",menuID:"04",subName:"검색",subID:"03",pageID:"적금설계",screenID:"UI-SZ-0403",pageName:"농기계구입자금적금설계",planName:"한승희",desgName:"조혜민",pubName:"TBD",pubPlan:"2020-11-13",pubEnd:"예정",devName:"TBD",planState:"완료",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"120",cateName:"마이농가",cateID:"SZ",menuName:"면세유현황",menuID:"05",subName:"유종별",subID:"01",pageID:"0",screenID:"UI-SZ-0501",pageName:"유종별",planName:"이은주",desgName:"구지운",pubName:"김경민",pubPlan:"2020-11-06",pubEnd:"2020-11-06",devName:"정준혁",planState:"완료",desgState:"완료",pubState:"예정",devState:"Dummy",rework:""},
{IANum:"121",cateName:"마이농가",cateID:"SZ",menuName:"면세유현황",menuID:"05",subName:"기기별",subID:"02",pageID:"0",screenID:"UI-SZ-0502",pageName:"기기별",planName:"이은주",desgName:"구지운",pubName:"김경민",pubPlan:"2020-11-06",pubEnd:"2020-11-06",devName:"정준혁",planState:"완료",desgState:"완료",pubState:"예정",devState:"Dummy",rework:""},
{IANum:"122",cateName:"마이농가",cateID:"SZ",menuName:"면세유현황",menuID:"05",subName:"월별",subID:"03",pageID:"0",screenID:"UI-SZ-0503",pageName:"월별",planName:"이은주",desgName:"오세진",pubName:"김경민",pubPlan:"2020-11-06",pubEnd:"2020-11-03",devName:"정준혁",planState:"완료",desgState:"완료",pubState:"예정",devState:"Dummy",rework:""},
{IANum:"123",cateName:"마이농가",cateID:"SZ",menuName:"출자/배당금",menuID:"06",subName:"0",subID:"01",pageID:"0",screenID:"UI-SZ-0601",pageName:"출자/배당금",planName:"이은주",desgName:"오세진",pubName:"김경민",pubPlan:"2020-11-06",pubEnd:"2020-11-03",devName:"정준혁",planState:"예정",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"124",cateName:"금융상품",cateID:"PD",menuName:"메인",menuID:"00",subName:"0",subID:"01",pageID:"0",screenID:"UI-PD-0001",pageName:"금융상품",planName:"한승희",desgName:"오세진",pubName:"김은옥",pubPlan:"2020-11-06",pubEnd:"2020-11-05",devName:"정준혁",planState:"예정",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"125",cateName:"더보기",cateID:"MR",menuName:"메인",menuID:"00",subName:"0",subID:"01",pageID:"0",screenID:"UI-MR-0001",pageName:"더보기",planName:"김수연",desgName:"구지운",pubName:"정다정",pubPlan:"2020-10-30",pubEnd:"2020-10-28",devName:"정준혁",planState:"완료",desgState:"완료",pubState:"완료",devState:"예정",rework:""},
{IANum:"126",cateName:"더보기",cateID:"MR",menuName:"프로필",menuID:"01",subName:"메인",subID:"01",pageID:"0",screenID:"UI-MR-0101",pageName:"금융프로필",planName:"이우진",desgName:"구지운",pubName:"정다정",pubPlan:"2020-10-30",pubEnd:"2020-10-28",devName:"정준혁",planState:"완료",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"128",cateName:"더보기",cateID:"MR",menuName:"프로필",menuID:"01",subName:"관심사등록/변경",subID:"03",pageID:"0",screenID:"UI-MR-0103",pageName:"관심사설정",planName:"이우진",desgName:"구지운",pubName:"TBD2",pubPlan:"2020-10-23",pubEnd:"2020-10-23",devName:"정준혁",planState:"완료",desgState:"완료",pubState:"완료",devState:"Dummy",rework:""},
{IANum:"129",cateName:"더보기",cateID:"MR",menuName:"자산기관관리",menuID:"60",subName:"목록",subID:"01",pageID:"0",screenID:"UI-MR-6001",pageName:"자산기관관리목록",planName:"이우진",desgName:"구지운",pubName:"정다정",pubPlan:"2020-11-13",pubEnd:"2020-11-13",devName:"정준혁",planState:"완료",desgState:"완료",pubState:"완료",devState:"예정",rework:""},
{IANum:"130",cateName:"더보기",cateID:"MR",menuName:"알림",menuID:"02",subName:"목록",subID:"01",pageID:"0",screenID:"UI-MR-0201",pageName:"알림",planName:"한승희",desgName:"구지운",pubName:"정다정",pubPlan:"2020-10-20",pubEnd:"2020-10-20",devName:"정준혁",planState:"예정",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"131",cateName:"더보기",cateID:"MR",menuName:"신용정보",menuID:"80",subName:"메인",subID:"01",pageID:"0",screenID:"UI-MR-8001",pageName:"메인",planName:"이은주",desgName:"오세진",pubName:"정다정",pubPlan:"2020-10-14",pubEnd:"2020-10-14",devName:"TBD",planState:"완료",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"132",cateName:"더보기",cateID:"MR",menuName:"신용정보",menuID:"80",subName:"조회내역",subID:"02",pageID:"0",screenID:"UI-MR-8002",pageName:"조회내역",planName:"이은주",desgName:"오세진",pubName:"정다정",pubPlan:"2020-10-20",pubEnd:"2020-10-20",devName:"TBD",planState:"완료",desgState:"완료",pubState:"완료",devState:"예정",rework:""},
{IANum:"133",cateName:"더보기",cateID:"MR",menuName:"신용정보",menuID:"80",subName:"변동내역",subID:"03",pageID:"0",screenID:"UI-MR-8003",pageName:"변동내역",planName:"이은주",desgName:"오세진",pubName:"정다정",pubPlan:"2020-10-20",pubEnd:"2020-10-20",devName:"TBD",planState:"완료",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"134",cateName:"더보기",cateID:"MR",menuName:"신용정보",menuID:"80",subName:"신용점수도움말",subID:"04",pageID:"0",screenID:"UI-MR-8004",pageName:"신용점수도움말",planName:"이은주",desgName:"조혜민",pubName:"정다정",pubPlan:"2020-11-06",pubEnd:"2020-11-03",devName:"TBD",planState:"완료",desgState:"완료",pubState:"예정",devState:"Dummy",rework:""},
{IANum:"135",cateName:"더보기",cateID:"MR",menuName:"신용정보",menuID:"80",subName:"대출",subID:"05",pageID:"0",screenID:"UI-MR-8005",pageName:"대출",planName:"이은주",desgName:"조혜민",pubName:"정다정",pubPlan:"2020-11-13",pubEnd:"2020-11-13",devName:"TBD",planState:"예정",desgState:"완료",pubState:"완료",devState:"예정",rework:""},
{IANum:"136",cateName:"더보기",cateID:"MR",menuName:"신용정보",menuID:"80",subName:"대출",subID:"06",pageID:"도움말",screenID:"UI-MR-8006",pageName:"대출도움말",planName:"이은주",desgName:"조혜민",pubName:"정다정",pubPlan:"2020-11-13",pubEnd:"2020-11-05",devName:"TBD",planState:"완료",desgState:"완료",pubState:"예정",devState:"Dummy",rework:""},
{IANum:"137",cateName:"더보기",cateID:"MR",menuName:"신용정보",menuID:"80",subName:"연체",subID:"07",pageID:"0",screenID:"UI-MR-8007",pageName:"연체",planName:"이은주",desgName:"조혜민",pubName:"정다정",pubPlan:"2020-11-13",pubEnd:"2020-11-13",devName:"TBD",planState:"예정",desgState:"완료",pubState:"완료",devState:"예정",rework:""},
{IANum:"138",cateName:"더보기",cateID:"MR",menuName:"신용정보",menuID:"80",subName:"연체",subID:"08",pageID:"도움말",screenID:"UI-MR-8008",pageName:"연체도움말",planName:"이은주",desgName:"조혜민",pubName:"정다정",pubPlan:"2020-11-13",pubEnd:"2020-11-05",devName:"TBD",planState:"완료",desgState:"완료",pubState:"예정",devState:"Dummy",rework:""},
{IANum:"139",cateName:"더보기",cateID:"MR",menuName:"신용정보",menuID:"80",subName:"카드",subID:"09",pageID:"0",screenID:"UI-MR-8009",pageName:"카드",planName:"이은주",desgName:"조혜민",pubName:"정다정",pubPlan:"2020-11-13",pubEnd:"2020-11-13",devName:"TBD",planState:"완료",desgState:"완료",pubState:"예정",devState:"Dummy",rework:""},
{IANum:"140",cateName:"더보기",cateID:"MR",menuName:"신용정보",menuID:"80",subName:"카드",subID:"10",pageID:"도움말",screenID:"UI-MR-8010",pageName:"카드도움말",planName:"이은주",desgName:"조혜민",pubName:"정다정",pubPlan:"2020-11-13",pubEnd:"2020-11-05",devName:"TBD",planState:"완료",desgState:"완료",pubState:"예정",devState:"Dummy",rework:""},
{IANum:"141",cateName:"더보기",cateID:"MR",menuName:"신용정보",menuID:"80",subName:"신용점수관리팁",subID:"11",pageID:"0",screenID:"UI-MR-8011",pageName:"신용점수관리팁",planName:"이은주",desgName:"조혜민",pubName:"정다정",pubPlan:"2020-11-20",pubEnd:"2020-11-13",devName:"TBD",planState:"완료",desgState:"완료",pubState:"예정",devState:"예정",rework:""},
{IANum:"142",cateName:"더보기",cateID:"MR",menuName:"신용정보",menuID:"80",subName:"신용조회이용약관",subID:"12",pageID:"0",screenID:"UI-MR-8012",pageName:"신용조회이용약관",planName:"이은주",desgName:"조혜민",pubName:"정다정",pubPlan:"2020-11-18",pubEnd:"2020-11-18",devName:"TBD",planState:"예정",desgState:"완료",pubState:"예정",devState:"0",rework:""},
{IANum:"143",cateName:"더보기",cateID:"MR",menuName:"자주묻는질문",menuID:"04",subName:"목록",subID:"01",pageID:"0",screenID:"UI-MR-0401",pageName:"자주묻는질문",planName:"이은주",desgName:"구지운",pubName:"정다정",pubPlan:"2020-11-13",pubEnd:"2020-11-13",devName:"TBD",planState:"완료",desgState:"완료",pubState:"완료",devState:"Dummy",rework:""},
{IANum:"145",cateName:"더보기",cateID:"MR",menuName:"공지사항",menuID:"05",subName:"목록",subID:"01",pageID:"0",screenID:"UI-MR-0501",pageName:"공지사항",planName:"김수연",desgName:"구지운",pubName:"정다정",pubPlan:"2020-10-23",pubEnd:"2020-10-23",devName:"정준혁",planState:"완료",desgState:"완료",pubState:"완료",devState:"Dummy",rework:""},
{IANum:"146",cateName:"더보기",cateID:"MR",menuName:"공지사항",menuID:"05",subName:"상세",subID:"02",pageID:"",screenID:"UI-MR-0502",pageName:"공지사항상세",planName:"김수연",desgName:"구지운",pubName:"정다정",pubPlan:"2020-10-23",pubEnd:"2020-10-23",devName:"정준혁",planState:"완료",desgState:"완료",pubState:"완료",devState:"Dummy",rework:""},
{IANum:"147",cateName:"더보기",cateID:"MR",menuName:"이용약관",menuID:"06",subName:"목록",subID:"01",pageID:"0",screenID:"UI-MR-0601",pageName:"약관목록",planName:"김수연",desgName:"구지운",pubName:"정다정",pubPlan:"2020-10-23",pubEnd:"2020-10-23",devName:"정준혁",planState:"완료",desgState:"완료",pubState:"완료",devState:"Dummy",rework:""},
{IANum:"148",cateName:"더보기",cateID:"MR",menuName:"이용약관",menuID:"06",subName:"상세",subID:"02",pageID:"0",screenID:"UI-MR-0602",pageName:"약관상세",planName:"김수연",desgName:"구지운",pubName:"정다정",pubPlan:"2020-10-28",pubEnd:"예정",devName:"정준혁",planState:"예정",desgState:"완료",pubState:"완료",devState:"예정",rework:""},
{IANum:"149",cateName:"더보기",cateID:"MR",menuName:"개인정보처리방침",menuID:"08",subName:"상세",subID:"01",pageID:"0",screenID:"UI-MR-0801",pageName:"개인정보처리방침",planName:"한승희",desgName:"구지운",pubName:"정다정",pubPlan:"2020-10-23",pubEnd:"2020-10-23",devName:"정준혁",planState:"완료",desgState:"완료",pubState:"예정",devState:"Dummy",rework:""},
{IANum:"150",cateName:"더보기",cateID:"MR",menuName:"서비스해지",menuID:"07",subName:"서비스해지안내",subID:"01",pageID:"0",screenID:"UI-MR-0701",pageName:"서비스해지안내",planName:"김수연",desgName:"구지운",pubName:"정다정",pubPlan:"2020-10-23",pubEnd:"2020-10-23",devName:"정준혁",planState:"완료",desgState:"완료",pubState:"완료",devState:"예정",rework:""},
{IANum:"153",cateName:"더보기",cateID:"MR",menuName:"제3자정보제공동의설정",menuID:"09",subName:"상세",subID:"01",pageID:"0",screenID:"UI-MR-0901",pageName:"제3자정보제공동의설정",planName:"한승희",desgName:"조혜민",pubName:"정다정",pubPlan:"2020-11-20",pubEnd:"예정",devName:"정준혁",planState:"완료",desgState:"완료",pubState:"완료",devState:"예정",rework:""},
				].map(d => {
					return {
						...d,
						screenID: String(d.screenID || '')
							.replace('UI','PG')
							.replace('-', '')
							.replace('-', '')
					}
				})

				list.unshift({cateID:"MR",menuName:"sample",menuID:"10",subName:"샘플",subID:"01",pageID:"0",screenID:"sample",pageName:"sample",planName:"한승희",desgName:"구지운",pubName:"정다정",pubPlan:"2020-11-20",pubEnd:"-",devName:"정준혁",planState:"-",desgState:"-",pubState:"-",devState:"-",rework:""},)
				return list
			}
    },
    components: {
			Page,
			// Footers
    },
    mounted() {
    }
  }
</script>

<style>
</style>