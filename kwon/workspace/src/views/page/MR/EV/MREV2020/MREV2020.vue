<!--
/*************************************************************************
* @ 서비스경로 : 더보기 > 도움말(이벤트) > 이벤트 > 룰렛 이벤트 응모
* @ 페이지설명 : 룰렛 이벤트 응모
* @ 파일명     : src/views/page/MR/EV/MREV2020/MREV2020.vue
* @ 작성자     : CS530689
* @ 작성일     : 2024-01-29
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2024-01-29              CS530689              최초작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
    <div class="full_popup mydata2023 openEvent event" id="full_popup_01"> 
        <div class="popup_header">
            <h1>룰렛 이벤트</h1>
            <!-- <a href="javascript:void(0);" class="btn_back"><span class="blind">이전화면</span></a> -->
        </div>
        
        <div class="popup_content">
            <div v-html="vHtml" @click="roulette"></div>
			<!-- <div class="ev_rl">
				<div class="rl_top">
					<div class="inner">
						<div class="logo"><span>NH콕뱅크X마이데이터</span> <span>NH농협</span></div>
						<div class="tit">
							<span class="lucky">Lucky</span>
							<em class="tit">룰렛찬스!</em>
							<span>내가 <em>연결한 자산 갯수</em> 만큼<br /><em>룰렛 참여의 기회</em>가!</span>
						</div>
						<div class="vs">
							<div class="left_y"><p><span>내가 연결한<br /><strong>자산 갯수</strong></span><em>15</em></p></div>
							<div class="right_y"><p><span>내게 남은<br /><strong>룰렛 기회</strong></span><em>03</em></p></div>
						</div>
					</div>
					<div class="rl_btm">
						<div class="rouletter">
							<div class="rouletter-arrow"></div>
							<div class="rouletter-bg">
								<div class="rouletter-wacu"></div>
							</div>
							<button class="rouletter-btn" id="start" @click="roulette"></button>
						</div>
					</div>
				</div>
			</div> -->
		</div>
        <a href="javascript:void(0);" class="btn_close" @click.prevent="closePage"><span class="blind">팝업닫기</span></a>
    </div>
    <!--// full popup E -->
</template>
<script>
import apiService from '@/service/apiService'
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import modalService from '@/service/modalService'
// import {keyupNumFormat} from '@/utils/number'
// import {checkWord} from '@/utils/data'
import {dateFormat} from '@/utils/date'

import MREV2005 from '@/views/page/MR/EV/MREV2005/MREV2005'     //이용약관 동의



export default {
    name : "MREV2020",
    data: () => {
        return {
            evtSqno : 0,    //이벤트 일련번호
            evtInfo : [],   //이벤트 정보
            itemList : 0,   //룰렛 항목정보
            setNum : 1,     //당첨 index
            num : 1,    //회전 바퀴수    
            timer : null,   //setTimeout 저장 변수
            name : '',   //이름
            telNo : '',  //전화번호
            psnInfAgrYn : false,     //서비스 동의여부
            vHtml : ''
        }
    },
    computed: {
    },
    created: () => {
        
    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    mounted() {

        this.popInit(this.params)

        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)
    },
    methods: {
        popInit(param = {}) {
            console.log('param : ', param)
            this.mydtEvtSqno = param.mydtEvtSqno
            this.getData()
        },
        getData(){
            this.getEvtInfo()
            this.getRouletteInfo()
        },
        //이벤트 정보 조회
        getEvtInfo(){
            const config = {
                url: '/mr/ev/11r01', 
                data: {
                    "mydtCusno" : this.getUserInfo('mydtCusno'),
                    "mydtEvtSqno" : this.mydtEvtSqno,
                },
            }
            apiService.call(config).then(res =>{
                console.log('evtInfo res: ', res)
                this.evtInfo = res

                const today = dateFormat(new Date(), "YYYYMMDDhhmm")
		
				if(res.evtStsc == "0" || today > (res.edDt + res.edHr)){
					modalService.alert("종료된 이벤트 입니다.").then(()=>{this.close()})
				}
            })
        },
        //룰렛 정보 조회
        getRouletteInfo(){
            const config = {
                url: '/mr/ev/14r01', 
                data: {
                    "mydtEvtSqno" : this.mydtEvtSqno,
                },
            }
            apiService.call(config).then(res =>{
                console.log('rouletteInfo res: ', res)
                if(res.rsp_code !== '0000'){
                    modalService.alert("룰렛정보 오류[" + res.rsp_code + "]").then(() => {});
                }else{
                    this.itemList = res.rouletteEst
                }

            //     this.vHtml = '<div class="ev_rl">'
            //     this.vHtml +=    '<div class="rl_top">'
            //     this.vHtml +=        '<div class="inner">'
            //     this.vHtml +=            '<div class="logo"><span>NH콕뱅크X마이데이터</span> <span>NH농협</span></div>'
            //     this.vHtml +=            '<div class="tit">'
            //     this.vHtml +=                '<span class="lucky">Lucky</span>'
            //      this.vHtml +=               '<em class="tit">룰렛찬스!</em>'
            //     this.vHtml +=                '<span>내가 <em>연결한 자산 갯수</em> 만큼<br /><em>룰렛 참여의 기회</em>가!</span>'
            //     this.vHtml +=            '</div>'
            //     this.vHtml +=            '<div class="vs">'
            //      this.vHtml +=               '<div class="left_y"><p><span>내가 연결한<br /><strong>자산 갯수</strong></span><em>15</em></p></div>'
            //      this.vHtml +=               '<div class="right_y"><p><span>내게 남은<br /><strong>룰렛 기회</strong></span><em>03</em></p></div>'
            //     this.vHtml +=            '</div>'
            //      this.vHtml +=       '</div>'
            //      this.vHtml +=       '<div class="rl_btm">'
            //       this.vHtml +=          '<div class="rouletter">'
            //       this.vHtml +=              '<div class="rouletter-arrow"></div>'
            //       this.vHtml +=              '<div class="rouletter-bg">'
            //       this.vHtml +=                  '<div class="rouletter-wacu"></div>'
            //       this.vHtml +=              '</div>'
            //       this.vHtml +=              '<button class="rouletter-btn" id="start"></button>'
            //       this.vHtml +=          '</div>'
            //      this.vHtml +=       '</div>'
            //      this.vHtml +=   '</div>'
            //    this.vHtml += '</div>'
            })
        },
        //서비스 이용동의 팝업
        agreePopup(){
            const config = {
                component : MREV2005,
                params : {}
            }
            modalService.openPopup(config).then((res) => {
                console.log('res ::::', res)
                
                if(res.agreePersonalInfo){
                    this.name = res.name
                    this.telNo = res.telNo
                    this.psnInfAgrYn = (res.agreePersonalInfo ? '1' : '0')
                    this.roulette()
                }
            });
        },
        //룰렛 서비스 호출
        // roulette(e){
        roulette(){

            // if(e.target.tagName == "BUTTON"){
            // this.rRotate(2);
            // this.rReset(document.getElementById("start"));
            // }
            // this.rRotate(this.setNum);
            // this.rReset(document.querySelector(".rouletter-btn"));
            if(this.evtInfo.evtStsc === '0'){
                modalService.alert("종료된 이벤트 입니다.").then(() => {});
            }else{
                const config = {
                    url: '/mr/ev/11s01', 
                    data: {
                        "mydtCusno" : this.getUserInfo('mydtCusno'),
                        "mydtEvtSqno" : this.mydtEvtSqno,
                        "name" : this.name,
                        "telNo" : this.telNo,
                        "psnInfAgrYn" : this.psnInfAgrYn
                    },
                    disableLoading : true,
                }
                apiService.call(config).then(response =>{
                    console.log('response: ', response)

                    if(response.rsp_code == "0000"){
                        this.setNum = response.rankOrd-1
                        if(response.pzwnYn == "0"){
                            this.setNum = this.itemList.length-1
                        }
                        this.rRotate(this.setNum);
                        this.rReset(document.getElementById("start"));
                    }else if(response.rsp_code === '9991'){
                        modalService.alert('응모 횟수가 초과 되었습니다').then(() => {})
                    }else if(response.rsp_code === '9992'){
                        modalService.alert('당일 응모건이 존재합니다.').then(() => {})
                    }else{   //9998 : 없는 응모방식/로직오류, 9999:응모에러
                        modalService.alert("오류가 발생하였습니다.").then(() => {});
                    }
                })
            }
        },
        //룰렛 돌리기
        rRotate() {
            let panel = document.querySelector(".rouletter-wacu");
            let btn = document.querySelector(".rouletter-btn");
            let deg = [];

            //룰렛 각도 설정
            for(let i=1, len = this.itemList.length; i<=len; i++){
                deg.push((360 / len) * i);
            }

            let start = 0;    
            let ani = setInterval(() => {
                start++;
                panel.style.transform = "rotate(" + ((360 * this.num * 8)+deg[this.setNum]) + "deg)";
                btn.disabled = true;
                btn.style.pointerEvents = "none"

                if(start === 70){
                    clearInterval(ani);
                }
            }, 50)
        },
        //룰렛 결과
        rReset(ele){
            this.timer = setTimeout(() => {
                ele.disabled = false;
                ele.style.pointerEvents = "auto";

                modalService.alert(this.itemList[this.setNum].gvn).then(() => {});

                this.num++;
            }, 7000)
        },

        closePage() {
            clearTimeout(this.timer)    //돌리는 도중 닫기시 타이머 함수 호출 취소
            this.close()
        }
        
    },
}
</script>