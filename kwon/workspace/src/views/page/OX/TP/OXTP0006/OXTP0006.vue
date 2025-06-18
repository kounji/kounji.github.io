<!--
/*************************************************************************
* @ 서비스경로 : 전체메뉴 > OX퀴즈
* @ 페이지설명 : 전체메뉴 > OX퀴즈 > 도전현황
* @ 파일명     : src\views\page\OX\TP\OXTP0006\OXTP0006.vue
* @ 작성자     : CS530689
* @ 작성일     : 2025-04-01
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-04-01              CS530689              최초작성
*************************************************************************/
-->
<template>
	<div class="full_popup oxquiz type" id="full_popup_01">
		<div class="popup_header">    
			<h1>OX퀴즈</h1>
		</div>
		<div class="popup_content" ref="quizRef">
			<div class="oxquiz_status">
				<div class="top_msg">
					<strong class="tit">매일매일 오늘의 OX퀴즈 풀기</strong>
					<p class="period">{{params.stDt | dateFilter('YYYY년 M월 D일')}} ~ {{params.edDt | dateFilter('YYYY년 M월 D일')}}</p>
				</div>
				<ul :class="stPageNo < 2 ? 'end' : !getDataCallYn ? 'reload' : ''"> <!-- [D] 이전 목록이 더이상 없을경우 class="end" 추가, reload 시 class="reload" 추가 -->
					<!-- <li>
						<button type="button" title="OX퀴즈 팝업 열기" class="btn"><span class="date">07/01</span><em>정답</em></button>
						<button type="button" title="OX퀴즈 팝업 열기" class="btn no"><span class="date">07/02</span><em>퀴즈보기</em></button>
						<button type="button" title="OX퀴즈 팝업 열기" class="btn"><span class="date">07/03</span><em class="error">오답</em></button>
					</li>
					<li>
						<button type="button" title="OX퀴즈 팝업 열기" class="btn"><span class="date">07/04</span><em class="error">오답</em></button>
						<button type="button" title="OX퀴즈 팝업 열기" class="btn"><span class="date">07/05</span><em class="error">오답</em></button>
						<button type="button" title="OX퀴즈 팝업 열기" class="btn"><span class="date">07/06</span><em class="error">오답</em></button>
					</li> -->
					<!-- <li>
						<button type="button" class="btn" disabled><span class="date">07/07</span></button>  미래에 오픈될 disabled
						<button type="button" class="btn" disabled><span class="date">07/08</span></button>
						<button type="button" class="btn" disabled><span class="date">07/09</span></button>
					</li>
					<li> -->
					<li v-for="(quiz, idx) in quizDays" :key="idx" :ref="'quiz_'+idx" :id="'quiz_'+idx">
						<button type="button" @click="showQuizPop(quiz[0].bltnDt)" v-if="quiz[0]" :title="quiz[0].quizStsc != 3 ? 'OX퀴즈 팝업 열기' : ''" :class="quiz[0].quizStsc == 2 ? 'btn no' : 'btn'" :disabled="quiz[0].quizStsc != 3 ? false : true"><span class="date">{{quiz[0].bltnDt | dateFilter('MM/DD')}}</span><em v-if="quiz[0].quizStsc != '3'" :class="quiz[0].quizStsc == 0 ? 'error' : ''">{{quiz[0].quizStsc == 0 ? '오답' : quiz[0].quizStsc == 1 ? '정답' : '퀴즈보기'}}</em></button>
						<button type="button" @click="showQuizPop(quiz[1].bltnDt)" v-if="quiz[1]" :title="quiz[1].quizStsc != 3 ? 'OX퀴즈 팝업 열기' : ''" :class="quiz[1].quizStsc == 2 ? 'btn no' : 'btn'" :disabled="quiz[1].quizStsc != 3 ? false : true"><span class="date">{{quiz[1].bltnDt | dateFilter('MM/DD')}}</span><em v-if="quiz[1].quizStsc != '3'" :class="quiz[1].quizStsc == 0 ? 'error' : ''">{{quiz[1].quizStsc == 0 ? '오답' : quiz[1].quizStsc == 1 ? '정답' : '퀴즈보기'}}</em></button>
						<button type="button" @click="showQuizPop(quiz[2].bltnDt)" v-if="quiz[2]" :title="quiz[2].quizStsc != 3 ? 'OX퀴즈 팝업 열기' : ''" :class="quiz[2].quizStsc == 2 ? 'btn no' : 'btn'" :disabled="quiz[2].quizStsc != 3 ? false : true"><span class="date">{{quiz[2].bltnDt | dateFilter('MM/DD')}}</span><em v-if="quiz[2].quizStsc != '3'" :class="quiz[2].quizStsc == 0 ? 'error' : ''">{{quiz[2].quizStsc == 0 ? '오답' : quiz[2].quizStsc == 1 ? '정답' : '퀴즈보기'}}</em></button>
                        <span class="seeyou" v-if="!quiz[1] || !quiz[2]"></span>
					</li>
                    <li>
                        <span class="seeyou" v-if="lastCnt"></span>
                    </li>
				</ul>
			</div>
		</div>

		<div class="popup_footer fixed" v-if="params.cntzUrlnm">
			<div class="btn_full_box">
				<button type="button" class="btns lg primary" @click="fnOpenContents"> 오늘의 퀴즈 관련 금융지식 보기</button>
			</div>
		</div>
		<a href="javascript:void(0);" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import {dateFormat} from '@/utils/date'
import _ from 'lodash'

import OXTP0007 from '@/views/page/OX/TP/OXTP0007/OXTP0007' // 퀴즈 보기
import COCT4011 from '@/views/page/CO/CT/COCT4011/COCT4011' // 금융지식 컨텐츠 상세

export default {
    name : "OXTP0006",
    data: () => {
        return {
            stPageNo : null,    //시작 페이지번호
            edPageNo : null,    //마지막 페이지번호
            quizDaysOri : [],   //퀴즈 리스트 원본
            quizDays : [],      //퀴즈 리스트 3묶음씩 튜닝
            startY : 0, // 터치 시작 위치
            scrollTopYn : false,    //스크롤 최상단 여부
            scrollBottomYn : false,    //스크롤 최하단 여부
            isTriggered : false,
            firstSearch : true,  //첫조회 여부(최초 스크롤 이동)
            getDataCallYn : false,
        }
    },
    computed: {
        lastCnt(){
            // let today = dateFormat(new Date(), 'YYYYMMDD')
        
            return this.quizDaysOri.length % 3 === 0 && this.quizDaysOri.some(item => item.bltnDt == this.params.edDt)
        }
    },
    mounted() {
	    //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

        this.initComponent()

        this.$nextTick(() => {
            window.addEventListener('touchstart', this.handleTouchStart)
            window.addEventListener('touchmove', this.handleTouchMove)
            window.addEventListener('touchend', this.handleTouchEnd)
            this.$refs.quizRef.addEventListener('wheel', this.handleWheel, {passive: false})
            this.$refs.quizRef.addEventListener('scroll', this.handleScroll) 
            // document.documentElement.style.overscrollBehavior = 'none'
            // document.body.style.overscrollBehavior = 'none'
        })
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    methods: {
        initComponent(param = {}) {
            this.getData()
            
        },
        getData() {
            if(!this.stPageNo && !this.edPageNo){

                let stdt = new Date(dateFormat(this.params.stDt, 'YYYY-MM-DD'))   //퀴즈 시작날짜
                let today = new Date()  //오늘날짜

                const diffTime = today.getTime() - stdt.getTime()

                const diffDays = Math.floor(diffTime / ( 1000 * 60 * 60 * 24))
                console.log('diffDays ::', diffDays)
                this.edPageNo = Math.trunc(diffDays / 15)

                if(diffDays === 0 || diffDays%15 > 0){
                    ++this.edPageNo
                }

                this.stPageNo = this.edPageNo
            }else{
                if(this.stPageNo > 0)--this.stPageNo
            }
            console.log('this.stPageNo ::', this.stPageNo)
            if(this.stPageNo > 0){
                //도전현황 조회
                const config = {
                    url: '/mr/ev/18r01', 
                    data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno'),
                        "stPageNo" : this.stPageNo,
                        "edPageNo" : this.edPageNo,
                    },
                }
                apiService.call(config).then(response =>{
                    console.log('response : ', response)
                    this.quizDaysOri = response.chlPsttList //원본저장
                    this.quizDays = response.chlPsttList.reduce((acc, item, index) => {
                        const groupIndex = Math.floor(index / 3)
                        if(!acc[groupIndex]){
                            acc[groupIndex] = []
                        }

                        acc[groupIndex].push(item)
                        return acc
                    }, [])
                    
                    console.log('this.firstSearch : ', this.firstSearch)
                    if(this.firstSearch){
                        let liIndex = -1

                        for(let i=0; i<this.quizDays.length; i++){
                            if(this.quizDays[i][0].quizStsc === "3" || this.quizDays[i][1].quizStsc === "3" || this.quizDays[i][2].quizStsc === "3"){
                                liIndex = i
                                break
                            }
                        }
                        
                        if(liIndex > 2){
                            let _this = this
                            setTimeout(function(){
                                _this.scrollQuiz(liIndex-3)
                            }, 400)
                        }

                        this.firstSearch = false
                    }

                    // if(this.quizDaysOri.length > 15){
                    //     this.scrollQuiz(7)
                    // }
                    this.getDataCallYn = false
                })
            }

            
		},
        showQuizPop(day){
            const config = {
                component: OXTP0007,
                params: {"bltnDt" : day}
            }
            modalService.openPopup(config).then((response) => {

            })
        },
        // 금융지식 컨텐츠 상세 팝업
        fnOpenContents() {
            const config = {
                component: COCT4011,
                params   : this.params.cntzUrlnm
            }
            
            modalService.openPopup(config).then(() => {})
        },
        handleTouchStart(e) {
            const scrollArea = this.$refs.quizRef
            const maxScroll = scrollArea.scrollHeight - scrollArea.clientHeight

            this.scrollTopYn = scrollArea.scrollTop === 0
            this.scrollBottomYn = scrollArea.scrollTop >= maxScroll

            if(this.scrollTopYn || this.scrollBottomYn){
                this.startY = e.touches[0].clientY
                this.isTriggered = false
            }
        },
        handleTouchMove(e) {
            if(this.isTriggered) return

            const currentY = e.touches[0].clientY
            const scrollArea = this.$refs.quizRef
            const maxScroll = scrollArea.scrollHeight - scrollArea.clientHeight

            if(this.scrollTopYn && currentY - this.startY > 50){
                console.log('최상단 스크롤 감지')
                this.isTriggered = true
                this.getDataCallYn = true
                
            }else if(this.scrollBottomYn && currentY - this.startY < -50){
                console.log('최하단 스크롤 감지')
                this.isTriggered = true
            }
        },
        handleTouchEnd(e) {
            if(this.getDataCallYn){
                this.getData()
            }
        },
        handleWheel(e) {
            if(this.isTriggered) return

            const scrollArea = this.$refs.quizRef
            const maxScroll = scrollArea.scrollHeight - scrollArea.clientHeight
            const delta = e.deltaY

            this.scrollTopYn = scrollArea.scrollTop === 0
            this.scrollBottomYn = scrollArea.scrollTop >= maxScroll

            if(this.scrollTopYn && delta < 0){
                console.log('최상단 스크롤 감지')
                this.isTriggered = true
                this.getData()

                setTimeout(() => {
                    this.isTriggered = false
                }, 300);
            }else if(this.scrollBottomYn && delta > 0){
                console.log('최하단 스크롤 감지')
                this.isTriggered = true
            }
        },
        handleScroll() {
            this.isTriggered = false
        },
        scrollQuiz(liIndex) {
            console.log('liIndex :', liIndex)
            this.$refs['quiz_'+liIndex][0].scrollIntoView({behavior: "smooth"})
        },

    },
    beforeDestroy(){
        window.removeEventListener('touchstart', this.handleTouchStart)
        window.removeEventListener('touchmove', this.handleTouchMove)
        window.removeEventListener('touchend', this.handleTouchEnd)
        window.removeEventListener('wheel', this.handleWheel)
        window.removeEventListener('scroll', this.handleScroll)
        // document.documentElement.style.overscrollBehavior = ''
        // document.body.style.overscrollBehavior = ''
    }
}
</script>