import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login'
import Homepage from '@/view/Homepage'  
import EducationReview from '@/components/EducationReview/EducationReview.vue'
import grantBadge from '@/components/GrantBadge/GrantBadge.vue'
import PositionReview from '@/components/PositionReview/PositionReview.vue' 
import showdata from '@/components/GrantBadge/ShowdataArticleAnswer.vue'
import test from '@/components/GrantBadge/TestGrantBadge.vue'
import AccountManage from '@/components/AccountManage/AccountManage.vue' 
import StopAccount from '@/components/AccountManage/StopAccount.vue' 

Vue.use(Router)

export default new Router({
  // mode:'history',
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
        },
        {
          path:'AccountManage',
          name:'AccountManage',
          component:AccountManage,
          redirect: '/Homepage/AccountManage/StopAccount',
          children:[
            {
              path:'StopAccount',
              name:'StopAccount',
              component:() => import('@/components/AccountManage/StopAccount.vue')
            },
            {
              path:'StartAccount',
              name:'StartAccount',
              component:() => import('@/components/AccountManage/StartAccount.vue')
            }]
        },
        {
          path:'LabelManage',
          name:'LabelManage',
          component:()=> import('@/components/LabelManage/LabelManage.vue')
        },
        {
          path:'BadgeManage',
          name:'BadgeManage',
          component:()=> import('@/components/BadgeManage/BadgeManage.vue')
        },
        {
          path:'ArticleManage',
          name:'ArticleManage',
          component:()=> import('@/components/ArticleManage/ArticleManage.vue'),
          meta: {
            keepAlive: false  // 需要缓存
            }
        },
        {
          path:'ArticleManage/Comment',
          name:'ArticleManage/Comment',
          component:()=> import('@/components/ArticleManage/Comment.vue'),
        },
        {
          path:'ArticleSticky',
          name:'ArticleSticky',
          component:()=> import('@/components/ArticleSticky/ArticleSticky.vue')
        },
        {
          path:'ArticleDelete',
          name:'ArticleDelete',
          component:()=> import('@/components/ArticleDelete/ArticleDelete.vue')
        },
      ]
    }
  ]
})
