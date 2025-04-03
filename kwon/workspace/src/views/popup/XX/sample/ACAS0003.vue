<template>
  <div>
	<!--
	<div id="wrap">
		<div>
			<a href="javascript:void(0);" class="btn_pop_view" aria-controls="full_popup_01">팝업보기</a>
		</div>
	</div>
	-->
	<!-- full popup S -->
	<div class="full_popup" id="full_popup_01" style="display:block;"> <!-- 개발시 style="display:block;" 삭제--> 
		<div class="popup_header">    
			<h1>계좌정보</h1>			
		</div>
        <div class="popup_content">
            <div class="top_area">
                <div class="top_box">
                    <div class="box_head">
                        <div class="info">
                            <div class="ico">
                                <p class="bank_01"><span class="blind">카카오뱅크</span></p><!-- 카카오뱅크 -->
                                <!-- <p class="bank_02"><span class="blind">국민은행</span></p>국민은행 -->
                            </div>
                            <div class="title">
                                주머니적금<div class="num">352210808677</div>
                            </div>
                        </div>
                        <button class="refresh">
                            <span class="refresh_ico"></span>
                        </button>
                    </div>
                    <div class="box_content">
                        <div class="price">
                            <div class="won"><span id="amt01" class="num counter" data-count="28000000000">28,000,000,000</span><span>원</span></div>
                        </div>
                    </div>
                    <div class="box_toggle_wrap">
                        <div class="box_toggle">
                            <div class="toggle-box">
                                <div data-ui-toggle="box">
                                    <button type="button" class="view-btn" aria-expanded="true">
                                        <em class="open">열기</em><em class="close">닫기</em>
                                    </button>
                                    <div class="view-box" data-ui-toggle="view">
                                        <div class="info">
                                            <div class="title">이자율</div>
                                            <div class="num">1.05%</div>
                                        </div>
                                        <div class="info">
                                            <div class="title">계좌개설일</div>
                                            <div class="num">2012.02.01</div>
                                        </div>
                                        <div class="info">
                                            <div class="title">출금가능금액</div>
                                            <div class="num">17,750,000원</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>               
                </div>
            </div>
            <div class="list_area">
                <div class="period_box">
                    <div class="tit_area">
                        <span class="tit">2012.01.30 ~ 2022.02.01</span>
                    </div>
                    <div class="checkbox_box">
                        <span class="cmm_radio">
                            <input type="radio" name="UI-AS-0102-1" id="UI-AS-0102-1" checked="checked">
                            <label for="UI-AS-0102-1">전체</label>
                        </span>
                        <span class="cmm_radio">
                            <input type="radio" name="UI-AS-0102-1" id="UI-AS-0102-2">
                            <label for="UI-AS-0102-2">입금만</label>
                        </span><span class="cmm_radio">
                            <input type="radio" name="UI-AS-0102-1" id="UI-AS-0102-3">
                            <label for="UI-AS-0102-3">출금만</label>
                        </span>
                    </div>
                </div>

                <div data-ui-toggle="box" class="list_box active open"><!-- active open 클래스 추가시 리스트 오픈 -->
                    <button type="button" class="view_btn" aria-expanded="true">
                        <span class="tit">2021년 4월</span>
                        <em class="open">열기</em><em class="close">닫기</em>
                    </button>
                    <ul data-ui-toggle="view" class="view_box">
                        <li>
                            <dl>
                                <dt>
                                    <em>홍길동</em>
                                    <span>12일 20:30:59</span>
                                </dt>
                                <dd>
                                    <span class="cmm-price">
                                        <em class="num">15,000</em>
                                        <em class="unit">원</em>
                                    </span>
                                    <span class="cmm-price">
                                        <em class="num">2,75,000</em>
                                        <em class="unit">원</em>
                                    </span>
                                </dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dt>
                                    <em>홍길동</em>
                                    <span>12일 20:30:59</span>
                                </dt>
                                <dd>
                                    <span class="cmm-price red">
                                        <em class="num">-15,000</em>
                                        <em class="unit">원</em>
                                    </span>
                                    <span class="cmm-price">
                                        <em class="num">2,75,000</em>
                                        <em class="unit">원</em>
                                    </span>
                                </dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dt>
                                    <em>홍길동</em>
                                    <span>12일 20:30:59</span>
                                </dt>
                                <dd>
                                    <span class="cmm-price">
                                        <em class="num">15,000</em>
                                        <em class="unit">원</em>
                                    </span>
                                    <span class="cmm-price">
                                        <em class="num">2,75,000</em>
                                        <em class="unit">원</em>
                                    </span>
                                </dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dt>
                                    <em>홍길동</em>
                                    <span>12일 20:30:59</span>
                                </dt>
                                <dd>
                                    <span class="cmm-price">
                                        <em class="num">15,000</em>
                                        <em class="unit">원</em>
                                    </span>
                                    <span class="cmm-price">
                                        <em class="num">2,75,000</em>
                                        <em class="unit">원</em>
                                    </span>
                                </dd>
                            </dl>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 데이터 없을때 -->
            <div class="no_data_list">
                <p>입출금 내역이 없습니다.</p>
            </div>
            <!--// 데이터 없을때 -->
        </div>


		<a class="btn_close" @click='close()'><span class="blind">팝업닫기</span></a>		
	</div>
	<!--// full popup E -->

	</div>
</template>
<script>
    import popupMixin from '@/common/mixins/popupMixin'
	import commonMixin from '@/common/mixins/commonMixin'
    import {amountCountAnimate} from '@/utils/jUtils'

	export default {
		name: 'ACAS0003',
		data: function() {
				return {

				}
		},
		mounted() {
			//총 금액 변경 이후 금액 Animate 처리 함수 호출
           amountCountAnimate("amt01", 28000000000)
		},
		methods: {
		
		},
		created(){
				//this.initComponents()
		},
		mixins: [
            popupMixin,
            commonMixin
		],
  }
</script>
