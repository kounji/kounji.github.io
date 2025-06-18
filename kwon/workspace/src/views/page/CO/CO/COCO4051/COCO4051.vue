<!--
/*************************************************************************
* @ 서비스경로 : 공통 > 모드변경
* @ 페이지설명 : 공통 > 모드변경
* @ 파일명     : src/views/page/CO/CO/COCO4051/COCO4051.vue
* @ 작성자     : CS541013
* @ 작성일     : 2025-02-10
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
*_________________________________________________________________________
* 2025-02-10              CS541013              최초작성
* 2025-03-06              CS541597              스크립트작성
*************************************************************************/
-->
<template>
    <!-- full popup S -->
	<div class="full_popup" id="full_popup_01"> <!--[v4.0] 2025-03-06 풀팝업으로 변경 -->
		<div class="popup_header">
			<h1>모드 바꾸기</h1>
		</div>
		<div class="popup_content">

			<div class="mode_change">
				<div class="head">
					<h2><em>내게 맞는 모드</em>를 선택해 주세요.</h2>
				</div>

				<!-- 청소년(만14~17세)일 경우 노출 -->
				<div class="head youth" v-if="this.getUserInfo('tolda')">
					<h2><em>지금은</em> 청소년모드만 볼 수 있어요.</h2>
					<p>만18세부터 일반모드도 볼 수 있어요.</p>
				</div>

				<div class="board_box">
					<ul role="tablist" class="inner_tab">
                        <li :class="ntSelMode == 'N' ? 'on' : ''"><button type="button" role="tab" :aria-selected="ntSelMode == 'N' ? 'true' : 'false'" @click.prevent="changeMode('N')">일반모드</button></li>
                        <li :class="ntSelMode == 'S' ? 'on' : ''"><button type="button" role="tab" :aria-selected="ntSelMode == 'S' ? 'true' : 'false'" @click.prevent="changeMode('S')">큰글모드</button></li>
                        <li :class="ntSelMode == 'C' ? 'on' : ''"><button type="button" role="tab" :aria-selected="ntSelMode == 'C' ? 'true' : 'false'" @click.prevent="changeMode('C')">청소년모드</button></li>
					</ul>
					<div class="img_wrap">
						
					</div>
				</div>
			</div>
			
		</div>

		<div class="popup_footer fixed">
			<div class="btn_group">
				<!-- 청소년(만14~17세)일 경우 button에 disabled 추가 -->
				<button type="button" class="btns lg primary" @click.prevent="saveMode" :disabled="chkIsDisable">모드 저장</button>
			</div>
		</div>

		<a href="javascript:void(0);" role="button" class="btn_close" @click.prevent="close()"><span class="blind">팝업닫기</span></a>
	</div>
	<!--// full popup E -->
</template>

<script>
import commonMixin from '@/common/mixins/commonMixin'
import popupMixin from '@/common/mixins/popupMixin'
import routerService from '@/service/routerService'
import modalService from '@/service/modalService'
import {mapActions} from 'vuex'

export default {
    name : "COCO4051",
    data: () => {
        return {
            ntMode : '',    // 현재 모드 (로컬스토리지 저장값)
            ntSelMode : '', // 선택된 모드
        }
    },
    mixins: [
        commonMixin,
        popupMixin
    ],
    mounted() {
        this.initComponent()

    },
    computed: {
        chkIsDisable() {
            return (this.getUserInfo('tolda') && (this.ntSelMode == 'N' || this.ntSelMode == 'S')) || this.ntSelMode == 'C'
        }
    },
    methods: {
        ...mapActions('layout', [
            'removeAllPage'
        ]),
        initComponent() {
            const ntModeData = this.getScrmode().mode || 'N'
            this.ntMode = ntModeData

            this.ntSelMode = this.ntMode
        },
        /**
         * 탭 선택 이벤트
         */
        changeMode(mode) {
            this.ntSelMode = mode
        },
        /**
         * 모드 저장
         */
        saveMode() {
            // 선택 모드 저장
            this.setScrmode(this.ntSelMode)

            let modeStr = this.ntSelMode === 'N' ? '일반' : this.ntSelMode === 'S' ? '큰글' : '청소년'
            modalService.toast(modeStr + ' 모드로 설정했어요.')
            
            // 팝업 닫기
            this.closeAll()
            
            routerService.moveMain()
        }
    }
}
</script>
