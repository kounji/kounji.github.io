<!--
/*************************************************************************
* @ 서비스경로 : 홈 > 로또복권 번호만들기
* @ 페이지설명 : 홈 > 로또복권 번호만들기
* @ 파일명     : src/views/page/CO/CO/COCO4351/COCO4351.vue
* @ 작성자     : CS541599
* @ 작성일     : 2025-02-10
************************** 수정이력 ****************************************
* 날짜                    작업자                변경내용
*_________________________________________________________________________
* 2025-02-10              CS541599              최초작성
*************************************************************************/
-->
<template>
    <!-- 전체 팝업 시작 -->
	<div class="full_popup" id="full_popup_01">
		<div class="popup_header">
			<h1>로또복권 번호만들기</h1>
			<!-- <a href="#nolink" class="btn_back"><span class="blind">이전화면</span></a> -->
		</div>	
		<div class="popup_content">
			<div class="lotto_gen">
				<div class="tit_area">
					<h2 class="headline"><strong>로또 번호 추천해 드릴게요!</strong></h2>
					<p class="sub_txt">로또 번호 추천은 하루 5번까지 가능해요.</p>
				</div>

				<div class="board_box">
					<div class="top_link">
						<a href="https://m.dhlottery.co.kr/gameResult.do?method=byWin" target="_blank">지난 회차 로또 번호 확인해볼까?</a>
					</div>

					<div class="lotteryStart">
                        <!-- 로또 로티애니매이션 -->
                        <lottie-animation :animationData="require('@/assets_v40/images/lottie/plz_lottery.json')" 
                                         ref="anim"
                                         :loop="true"
                                         :auto-play="true" 
                                         :speed="1"
                                         aria-hidden="true" 
                                         class="plz_lottery" 
                                         >
                        </lottie-animation>
						<p>로또 번호 추천 받기 버튼 눌러서<br>하루에 5번 로또 번호 받아보세요!</p>
						<button type="button" class="btns md primary play" @click.prevent="randomRecomd()">로또 번호 추천받기</button>
					</div>

					<div class="lotteryGames">
						<dl>
							<div>
								<dt>A</dt>
								<dd>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
								</dd>
							</div>
							<div>
								<dt>B</dt>
								<dd>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
								</dd>
							</div>
							<div>
								<dt>C</dt>
								<dd>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
								</dd>
							</div>
							<div>
								<dt>D</dt>
								<dd>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
								</dd>
							</div>
							<div>
								<dt>E</dt>
								<dd>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
								</dd>
							</div>
						</dl>
					</div>
				</div>

				<div class="gray_box">
					<p>로또복권 번호만들기는 로또 번호만 추천해 드립니다.<br>복권구매는 복권판매소에서 구매하셔야 합니다.</p>
					<a href="https://m.dhlottery.co.kr/store.do?method=sellerInfo645" target="_blank" class="btns md">판매점 찾기</a>
				</div>
				
			</div>
		</div>

		<div class="popup_footer fixed">
			<div class="btns_wrap">
				<button type="button" class="btns lg share" @click.prevent="shareLotto()">공유하기</button>
				<button type="button" class="btns lg primary play" ref="shareBtn" @click.prevent="randomRecomd()">로또 번호 추천 받기(<em class="conut">0</em>/5)</button>
				
			</div>
		</div>
		<a href="#nolink" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>


import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'

import WebSharePopup from '@/views/popup/common/WebSharePopup'

import apiService from '@/service/apiService'
import modalService from '@/service/modalService'
import commonService from '@/service/commonService'
import {mapActions} from 'vuex'
import _ from 'lodash'

import LottieAnimation from 'lottie-web-vue' // import lottie-web-vue

import plzLotteryJson from "@/assets_v40/images/lottie/plz_lottery.json"

export default {
    name : "MRLO4001",
    data: () => {
        return {
            lotteryString : "",       // 로또 문자열
            lottery       : {},       // 변환된 json
            tmpLottery    : [],       // 번호 생성용 데이터
            localKey      : {},       // 로컬 스토리지 key
        }
    },
	computed: {
    },
    mounted() {
        this.initComponent()
        //PFM로그 처리 화면접속이력 등록 POST
        apiService.pfmLogSend(this.$options.name)

    },
    mixins: [
        popupMixin,
        commonMixin
    ],
    methods: {
        ...mapActions('myassets', [
            'getMyBizRegInfo','getAllMyAssetInfo'
        ]),
        initComponent() {
            console.log("@@@ =>", this.getUserInfo('chnl'))
            this.localKey = "lottery" + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + "V4";
            this.lotteryString = commonService.getStorage(this.localKey);
            
            console.log("1 =>",this.lotteryString)

            if(Object.keys(this.lotteryString).length == 0) this.lotteryString = null;

            if(this.lotteryString === null){
                this.lottery = {
                    "count":0,
                    "games":[],
                    "date":''
                }
            }else{
                this.lottery =  this.lotteryString;

                let setDay = new Date(this.lottery.date);
                let nowDay = new Date();

                if(setDay.getFullYear() == nowDay.getFullYear() && setDay.getMonth() == nowDay.getMonth()){
                    if(nowDay.getDate() > setDay.getDate()){
                        this.lottery.count = 0;
                    }
                }else{
                    this.lottery.count = 0;
                }
            }

            if(this.lottery.count == 0){
                if(this.lottery.games.length == 5) {
                    $(".lotteryStart").hide();
                    $(".lotteryGames").show();

                    this.drawlottery(this.lottery.games);
                }else{
                    $(".lotteryStart").show();
                    $(".lotteryGames").hide();
                    $(".btns.share").attr("disabled", true);
                }
            }else{
                $(".lotteryStart").hide();
                $(".lotteryGames").show();

                $(".play em").text(this.lottery.count);
                
                if(this.lottery.count == 5){
                    $(".play").attr("disabled", true);
                }
                //저장된 번호 불러와서 그리기
                this.drawlottery(this.lottery.games);
            }
        },

        drawlottery(games) {
            let setColor = function(i){
                let color = "yellow"; // 10 미만
                if(i >=10 && i < 20){
                    color = "blue"
                }else if(i >=20 && i < 30){
                    color = "red"
                }else if(i >=30 && i < 40){
                    color = "gray"
                }else if(i >=40 && i < 50){
                    color = "green"
                }
                return color;
            }

            $(".btns.share").attr("disabled", true);
            $(".play").attr("disabled", true);

            $(".lotteryGames dl span").each(function(){
                $(this).text('').removeClass();
            })

            $(".lotteryGames dl > div").each(function(game){
                const _parent = $(this);

                setTimeout(function(){
                    $("span", _parent).each(function(num){
                        let _color = setColor(games[game][num]);
                        const _this = $(this);

                        setTimeout(function(){
                            _this.text(games[game][num]).addClass(_color);
                        }, 100 * num)
                    });

                }, 600 * game)
                
            })
            
            let $this = this;

            setTimeout(function(){
                $(".btns.share").attr("disabled", false);
                $(".play").attr("disabled", $this.lottery.count < 5 ? false : true);
            }, 3000)
        }, 
        
        generatelottery() {
            let tmplottery = [];
            let randomOverlap = [];

            for(let game = 0; game < 5; game++){
                tmplottery[game] = [];

                for(let num = 0; num < 6; num++){
                    let i = Math.floor(Math.random() * 45) + 1;

                    if(tmplottery[game].length > 0){
                        if(tmplottery[game].indexOf(i) === -1){//게임내에서 숫자와 겹침 비교
                            if(randomOverlap.length > 0){///overlap array와 비교
                                if(randomOverlap.indexOf(i) === -1){
                                    tmplottery[game].push(i);
                                }else{
                                    num--;
                                }
                            }else{
                                tmplottery[game].push(i);
                            }
                        }else{
                            num--;
                        }	
                    }else{
                        if(randomOverlap.length > 0){///overlap array와 비교
                            if(randomOverlap.indexOf(i) === -1){
                                tmplottery[game].push(i);
                            }else{
                                num--;
                            }
                        }else{
                            tmplottery[game].push(i);
                        }
                    }
                }
                
                //작은숫자부터 나열
                tmplottery[game].sort(function(comp1, comp2) {
                    return comp1 - comp2; 
                });
                
                //overlap array 등록
                let overlap = Math.floor(Math.random() * 6);
                randomOverlap.push(tmplottery[game][overlap]);
            }
            this.lottery.games = tmplottery;
            this.lottery.date = new Date();

            this.localKey = "lottery" + this.getUserInfo('chnl') + this.getUserInfo('mydtCusno') + "V4";
            commonService.setStorage(this.localKey, this.lottery);

            this.drawlottery(tmplottery);
        },
        // 로또 번호 추천 받기 클릭 이벤트
        randomRecomd() {
            $(".lotteryStart").hide();
            $(".lotteryGames").show();
            $(".btns.share").attr("disabled", true);
            
            if(this.lottery.count < 5){
                this.lottery.count++;
                
                $(".play em").text(this.lottery.count);

                if(this.lottery.count == 5) {
                    $(this).attr('disabled', true);
                }
            }
            /*번호생성*/
            this.generatelottery();
        },
        // 로또 번호 공유하기 클릭 이벤트
        shareLotto() {
            let txt = "";
            txt  = "[NH콕마이데이터 로또복권 추천번호]\n";
            txt += "NH콕뱅크 콕마이데이터 로또복권 번호만들기에서\n";
            txt += "받은 추천받은 번호입니다.\n\n";
            
            let abc = ['A','B','C','D','E'];
            let tmp = [];

            this.lottery.games.forEach(function (el, idx) {
                tmp.push([]);
                el.forEach(function (ell) {
                   tmp[idx].push(ell < 10 ? "0".concat(ell) : "".concat(ell));
                });
                txt += abc[idx] + "  " + tmp[idx].join(" ") + "\n";
            });

            txt += "\n로또복권 번호만들기는 로또 번호만 추천해 드립니다.\n";
            txt += "복권구매는 복권판매소에서 구매하셔야 합니다.";

            console.log(txt)

            const config = {
                params: { // 파라미터
                    title : "공유하기",
                    text  : txt
                },
            }
            
            modalService.webSharePopup(config).then(response => {

            })
            /*
            var a = this.$el.querySelectorAll('dd').forEach(function (el) {
                el.querySelectorAll('span').forEach(function (row) {
                    console.log(row.textContent)
                });
            });
            */

            //WebSharePopup
        },

    },
    components : {
        LottieAnimation
    },
    destroyed() {
        this.getMyBizRegInfo()  //연결기관정보 조회/갱신
    }
}

</script>