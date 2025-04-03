<template>
  <div class="inner-wrap full">
    <div class="header">
      <button
        type="button"
        class="btn-close"
        @click="close()"
      >
        <span>닫기</span>
      </button>
      <h1>팝업 타이틀</h1>
    </div>
    <div class="content-wrap">
      <div class="content">
        <div class="cmm-list-wrap">
          <div class="cmm-top-box">
            <button type="button" class="cmm-btn-select" data-popup="popup_02"><span><em>2020</em>년 <em>8</em>월</span></button>
            <div class="cmm-price">
              <em class="num">3,000,000</em>
              <em class="unit">원</em>
            </div>
            <div class="cmm-date">
              <em class="unit">최종 업데이트</em>
              <em class="num">2020.08.18</em>
              <em class="num">10:44:31</em>
            </div>
            <div class="btn-group">
              <a class="cmm-icon-refresh" @click="closeWidthParams"><span>새로고침</span></a>
            </div>
            <div class="bottom">
              <span class="cmm-total">
                <em class="unit">총</em>
                <em class="num">137</em>
                <em class="unit">건</em>
              </span>
              <button type="button" class="cmm-btn-select" data-popup="popup_03" @click="openCardSelect"><span>전체카드</span></button>
            </div>
          </div>
          <div class="list-box">
            <dl>
              <dt>
                <div>
                  <span class="tit">8월 21일</span>
                  <span class="cmm-price">
                      <em class="num">18,750</em>
                      <em class="unit">원</em>
                  </span>
                </div>
              </dt>
              <dd>
                <a href="#" data-popup="popup_05">
                  <span class="tit">이디야 신상도초교점</span>
                  <span class="txt">NH농협 올바른 MYPICK카드</span>
                  <span class="cmm-price">
                    <em class="num">13,500</em>
                    <em class="unit">원</em>
                  </span>
                </a>
              </dd>
              <dd>
                <a href="#">
                  <span class="tit">컴포즈커피 성대시장점</span>
                  <span class="txt">NH농협 올바른 MYPICK카드</span>
                  <span class="cmm-price">
                    <em class="num">5,250</em>
                    <em class="unit">원</em>
                  </span>
                </a>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
    <button 
			type="button"
			class="btn-close"
			@click="close()"
		>
			팝업닫기
		</button>
  </div>
</template>

<script>
	import popupMixin from '@/common/mixins/popupMixin'
  import apiService from '@/service/apiService'
  
  export default {
    name: 'NormalPopup',
    data: function() {
      return {
      }
    },
    methods: {
      openCardSelect() {
        const config = {
          params: {
            title: '기관 선택',
            code: '0051' // 기관구분코드
          },
        }
        this.openSelect(config).then(response => {
          console.log('선택된 카드 정보', response)
        })
      },
      closeWidthParams() {
        const items = [{value: 1}]
        this.close(items)
      },
      test() {
        console.log('test', this.params)
      },
      post() {
        const config = {
          method: 'post',
          url: '/as/0001s01',
          data: {
            name: 'aaaaaa'
          }
        }
        apiService.call2(config).then(response => {
          console.log(response) // something
        })
      },
    },
    mounted() {
      // console.log('normalPopup : mounted', this.params)
      // console.log(find(this))
      this.$store.dispatch('modal/addLoading')
      setTimeout(() => {
        this.$store.dispatch('modal/removeLoading')
      }, 2000)
    },
    components: {
    },
		mixins: [
			popupMixin
		],
  }
</script>