import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login'
import Homepage from '@/view/Homepage'  
import EducationReview from '@/components/EducationReview/EducationReview.vue'
import grantBadge from '@/components/GrantBadge/GrantBadge.vue'
import PositionReview from '@/components/PositionReview/PositionReview.vue'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path:'/Homepage',
      component:Homepage,
      redirect: '/Homepage/EducationReview',
      children:[
        {
          path:'EducationReview',
          name:'EducationReview',
          component:EducationReview
        },
        {
          path:'PositionReview',
          name:'PositionReview',
          component:PositionReview 
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
