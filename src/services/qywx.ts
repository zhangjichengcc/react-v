/*
 * @Author: your name
 * @Date: 2020-05-21 23:33:14
 * @LastEditTime: 2020-05-25 20:19:14
 * @LastEditors: Please set LastEditors
 * @Description: 企业微信接口请求方式
 * @FilePath: \wechat-v\src\services\Matter.ts
 */ 
import request from '@/utils/requestQywx';

// 获取企业微信用户信息
export async function getClientToken(params: {code: string, suite_access_token: string}) {
  return request('/service/getuserinfo3rd', {
    method: 'get',
    params,
  })
}
