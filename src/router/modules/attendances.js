/*
 * @Author: your name
 * @Date: 2021-07-20 23:00:11
 * @LastEditTime: 2021-07-21 23:56:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hrsaas\src\router\modules\attendances.js
 */
// 导出属于员工的路由规则
import Layout from '@/layout'
//  {  path: '', component: '' }
// 每个子模块 其实 都是外层是layout  组件位于layout的二级路由里面
export default {
  path: '/attendances',
  name: 'attendances',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/attendances'),
    meta: {
      title: '考勤',
      icon: 'skill'
    }
  }]
}

