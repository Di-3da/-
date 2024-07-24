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
        path: 'classes',
        name: 'Classes',
        component: () => import('@/views/classes'),
        meta: { title: '药品信息维护', icon: 'el-icon-s-order' }
      },
      {
        path: 'student',
        name: 'Student',
        component: () => import('@/views/classes1'),
        meta: { title: '诊疗项目信息维护', icon: 'el-icon-s-order' }
      },
      {
        path: 'service',
        name: 'service',
        component: () => import('@/views/classes'),
        meta: { title: '服务设施项目维护', icon: 'el-icon-s-order' }
      },
      {
        path: 'disease',
        name: 'disease',
        component: () => import('@/views/classes'),
        meta: { title: '病种信息维护', icon: 'el-icon-s-order' }
      },
      {
        path: 'mechanism',
        name: 'mechanism',
        component: () => import('@/views/classes'),
        meta: { title: '定点医疗机构信息维护', icon: 'el-icon-s-order' }
      },
      {
        path: 'treatment',
        name: 'treatment',
        component: () => import('@/views/classes'),
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
        path: 'dept',
        name: 'Dept',
        component: () => import('@/views/person-approval'),
        meta: { title: '人员就诊机构审批', icon: 'el-icon-s-custom' }
      },
      {
        path: 'emp',
        name: 'Emp',
        component: () => import('@/views/emp'),
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
        path: 'emp-report',
        name: 'emp-report',
        component: () => import('@/views/emp-report'),
        meta: { title: '中心报销', icon: 'el-icon-s-claim' }
      },
      {
        path: 'student-report',
        name: 'student-report',
        component: () => import('@/views/student-report'),
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
        component: () => import('@/views/emp-report'),
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
        path: 'unit-information',
        name: 'unit-information',
        component: () => import('@/views/emp'),
        meta: { title: '单位基本信息维护', icon: 'el-icon-s-data' }
      },
      {
        path: 'person-information',
        name: 'person-information',
        component: () => import('@/views/person-information'),
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