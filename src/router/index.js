import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example',
    name: 'Example',
    meta: { title: '医疗信息基本维护', icon: 'el-icon-s-platform' },
    children: [
      {
        path: 'medicine',
        name: 'Medicine',
        component: () => import('@/views/medicine'),
        meta: { title: '药品信息维护', icon: 'el-icon-s-order' }
      },
      {
        path: 'treat',
        name: 'Treat',
        component: () => import('@/views/treat'),
        meta: { title: '诊疗项目信息维护', icon: 'el-icon-s-order' }
      },
      {
        path: 'service',
        name: 'Service',
        component: () => import('@/views/service'),
        meta: { title: '服务设施项目维护', icon: 'el-icon-s-order' }
      },
      {
        path: 'disease',
        name: 'Disease',
        component: () => import('@/views/disease'),
        meta: { title: '病种信息维护', icon: 'el-icon-s-order' }
      },
      {
        path: 'institution',
        name: 'Institution',
        component: () => import('@/views/institution'),
        meta: { title: '定点医疗机构信息维护', icon: 'el-icon-s-order' }
      },
      {
        path: 'parameter',
        name: 'Parameter',
        component: () => import('@/views/parameter'),
        meta: { title: '医疗待遇计算参数维护', icon: 'el-icon-s-order' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system',
    name: 'System',
    meta: { title: '医疗待遇审批', icon: 'el-icon-s-check' },
    children: [
      {
        path: 'application',
        name: 'Application',
        component: () => import('@/views/application'),
        meta: { title: '人员就诊机构审批', icon: 'el-icon-s-custom' }
      },
      {
        path: 'special',
        name: 'Special',
        component: () => import('@/views/special'),
        meta: { title: '特检特治审批', icon: 'el-icon-s-ticket' }
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    redirect: '/report',
    name: 'Report',
    meta: { title: '医保中心报销', icon: 'el-icon-s-tools' },
    children: [
      {
        path: 'insurance',
        name: 'Insurance',
        component: () => import('@/views/insurance'),
        meta: { title: '中心报销', icon: 'el-icon-s-claim' }
      },
      {
        path: 'cancelInsurance',
        name: 'CancelInsurance',
        component: () => import('@/views/cancelInsurance'),
        meta: { title: '取消报销', icon: 'el-icon-s-release' }
      }
    ]
  },
  {
    path: '/research',
    component: Layout,
    redirect: '/research',
    name: 'Research',
    meta: { title: '综合查询', icon: 'el-icon-s-tools' },
    children: [
      {
        path: 'person-research',
        name: 'person-research',
        component: () => import('@/views/research'),
        meta: { title: '医疗人员费用查询', icon: 'el-icon-s-goods' }
      }
    ]
  },
  
  {
    path: '/public',
    component: Layout,
    redirect: '/public',
    name: 'Public',
    meta: { title: '公共业务', icon: 'el-icon-more' },
    children: [
      {
        path: 'company',
        name: 'Company',
        component: () => import('@/views/company'),
        meta: { title: '单位基本信息维护', icon: 'el-icon-s-data' }
      },
      {
        path: 'people',
        name: 'People',
        component: () => import('@/views/people'),
        meta: { title: '个人基本信息维护', icon: 'el-icon-user-solid' }
      }
    ]
  },


 // 404 page must be placed at the end !!!
 { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router