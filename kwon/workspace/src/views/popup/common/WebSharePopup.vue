<!--
/*************************************************************************
* @ 서비스경로 : 공통
* @ 페이지설명 : 공유하기
* @ 파일명     : src/views/popup/common/WebSharePopup.vue
* @ 작성자     : CS540683
* @ 작성일     : 2025-01-31
* @ 비고       : 
************************** 수정이력 ****************************************
* 날짜                    작업자                 변경내용
  2025-01-31              CS540683              최초작성
*************************************************************************/
-->
<template>
<div>
<!-- 전체 팝업 시작 -->
	<!-- slide popup S -->
	<div class="dimmed" style="display: block;"></div>
	<div class="popup_box">
		<div aria-hidden="false" class="slide_popup">
			<div class="popup_header">
				<h1>공유하기</h1>
			</div>
			<div class="popup_content">
				
				<ul class="share_list">
					<li>
						<button type="button" class="item kakao" @click="kakao()">카카오톡</button>
					</li>
					<li>
						<button type="button" class="item url" @click="cpClipBoard()">URL 복사</button>
					</li>
				</ul>

			</div>

			<a href="#nolink" class="btn_close"  @click="close()"><span class="">닫기</span></a>
		</div>
	</div>
</div>
	<!--// 전체 팝업 종료 -->
</template>

<script>
import popupMixin from '@/common/mixins/popupMixin'
import commonMixin from '@/common/mixins/commonMixin'
import modalService from '@/service/modalService'
import {mapGetters} from 'vuex'
export default {
    name: 'WebSharePopup',
    computed: {
      ...mapGetters('modal', [
        'modalList',
				'modalComponent',
				'modalAriaHidden'
      ]),
      renderer() {
        return this.modalConfig.renderer && this.modalConfig.renderer.component
      },
    },    
    data: () => {
      return {
             
      }
    },
    props: {      
      data: {        
        type: Object,
        default: () => ({})
      }
    },
		mixins: [ 
      popupMixin,
      commonMixin
    ],    
    
    created() {
      
    },
    computed : {
     
    },
    mounted(){
        this.initComponent()
    },
    methods: {
      initComponent() {
        //CommonMix Web Share Api Check
      },

    //Web Share Api URL공유 2025-02-03
    callWebShare(params) {
      if ( !navigator.canShare ) {
        return modalService.alert("공유하기가 지원되지 않는 브라우저 입니다.");
      }
      
      if ( navigator.share ) {
        try {
          navigator.share(
            {
              title : params.title,
              text  : params.text,
              url : params.url
            }
          )
        } catch(err) {
          return modalService.alert("공유시 오류가 발생했습니다." +  err);
        }
      } else {
        //Web Share Api 사용불가시
        return modalService.alert("공유하기가 지원되지 않는 브라우저 입니다.");
      }
    }, 

    kakao() {
      this.shareKakao(this.params)
      this.close()
    },
    cpClipBoard() {
      let url = 'https://nhcokbank.nonghyup.com/service/html/cbgateway.html?WEB=Y&SRV_ID=CBCOP9997R&screenId='  
                  + this.params.screenId
                  + '&cus=' + this.getUserInfo('cus')
                  + '&mydtEvtSqno=0'
                  + '&chnl=' + this.getUserInfo('chnl')

      // 친구 카테고리인 경우 초대코드 포함
      if (this.params.category == 2) {
        url = url + '&inviteCd=' + this.params.inviteCd
      }

      console.log('복사 URL')
      console.log(url)

      navigator.clipboard.writeText(url)
      modalService.toast("복사되었습니다.")

      this.close()
    },

    //Web Share Api File 공유 2025-02-03
    callWebShareFile(params, files) {
      if ( !navigator.canShare ) {
        return modalService.alert("파일 공유하기가 지원되지 않는 브라우저 입니다.");
      }
      
      if ( navigator.canShare({files})) {
        try {
          navigator.share(
            {
              files,
              title : params.title,
              text  : params.text,
              url : params.url
            }
          )
        } catch(err) {
          return modalService.alert("파일 공유시 오류가 발생했습니다." +  err);
        }
      } else {
        //Web Share Api 사용불가시
        return modalService.alert("파일 공유하기가 지원되지 않는 브라우저 입니다.");
      }
    }
      
    }
  }
</script>
