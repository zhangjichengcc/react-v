/*
 * @Author: your name
 * @Date: 2020-05-21 23:33:14
 * @LastEditTime: 2020-05-26 18:21:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wechat-v\src\services\Matter.ts
 */ 
import request from '@/utils/request';
import config from '@/config';

const {
  clientId,
  clientSecret,
} = config;

// 获取当期未申报逾期未申报
export async function getClientToken() {
  return request('/auth/publicAuth/getClientToken', {
    method: 'post',
    headers: {
      Authorization: '',
    },
    data: {
      clientId,
      clientSecret,
    }
  })
}