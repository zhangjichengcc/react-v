/*
 * @Author: your name
 * @Date: 2020-06-11 16:52:30
 * @LastEditTime: 2020-06-11 16:53:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wechat-v\config\router.ts
 */ 

 export default [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      {
        path: '/',
        component: '@/pages/Login',
        title: '登陆中'
      },
      {
        path: '/matterList',
        component: '@/pages/MatterList',
        title: '事项列表'
      },
      { 
        path: '/matterDetails',
        component: '@/pages/MatterDetails',
        title: '关联事项'
      },
    ],
  }
]
