import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/view/HelloWorld'
import Homepage from '@/view/Homepage'  
import reviewRealName from '@/components/reviewRealName'
import grantBadge from '@/components/grantBadge'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/Homepage',
      component:Homepage,
      children:[
        {
          path:'reviewRealName',
          name:'reviewRealName',
          component:reviewRealName
        },
        {
          path:'grantBadge',
          name:'grantBadge',
          component:grantBadge
        }
      ]
    }
  ]
})
