import Vue from 'vue'
import VueRouter from 'vue-router'
// import json from '@/assets/json/config.json'
import store from '@/store'

//import Main from '@/views/layout/Main.vue'

import indexV2 from '@/common/router/indexV2.js'
import indexV4 from '@/common/router/indexV4.js'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  //20250131 상호금융 NH콕마이데이터 4.0 추진 개발을 위한 라우터 Index 분리
  routes: [...indexV2
         , ...indexV4],
  scrollBehavior(to) { // to, from, savePosition
    console.log("scrollBehavior", to)
    // 로그인 세션 연장
    to.path !== '/' && store.dispatch('config/extendSession')

    // reset scroll position
    document.getElementById('view-wrap') && document.getElementById('view-wrap').scrollTo(0, 0) 
    document.body.scrollTop = 0
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  // console.log(' >>>> beforeEach to',to)
  // console.log(' >>>> beforeEach to.hash',to.hash)
  // console.log(' >>>> beforeEach from',from)
  // console.log(' >>>> beforeEach next',next)
  // if (to.hash.indexOf("#nolink") > -1) return false

  next()
})

router.onError(error => {
  console.log('router.onError ==> ', error)

  const pattern = /loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  const targetPath = router.history.pending.fullPath

  console.log('router.onError targetPath ==> ', targetPath)

  if (isChunkLoadFailed )
  {
    router.replace(targetPath)
  }
  
})

export default router