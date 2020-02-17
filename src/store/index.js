import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//创建一个 store(仓库)
const store = new Vuex.Store({
    state: {
      userId: ''
    },
    mutations: {  //必须是同步的，不能发请求
      setUserId (state,id) {
        state.userId = id
      }
    },
    actions: {  //可以执行异步请求
      setUserIdFun(context,id){
            context.commit('setUserId',id)
        }
    }
  })
//可以通过 store.state 来获取状态对象，以及通过 store.commit 方法触发状态变更：
//store.commit('increment')    console.log(store.state.count) // -> 1

  export default store