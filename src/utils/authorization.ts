/*
 * @Author: zhangjicheng
 * @Date: 2020-05-22 01:30:35
 * @LastEditTime: 2020-05-25 17:37:59
 * @LastEditors: Please set LastEditors
 * @Description: 全局鉴权相关方法
 * @FilePath: \wechat-v\src\utils\authorization.ts
 */ 
import config from '@/config';
// import { getUrlParam } from '@/utils/utils';
const { corpid, suiteid } = config;

// 获取授权code
const getCode = () => {
  const backUrl = `${window.location.host}/login`;
  // 构造第三方应用oauth2链接
  window.location.replace(
    `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${suiteid}&redirect_uri=${backUrl}&response_type=code&scope=snsapi_userinfo&state=STATE1#wechat_redirect`
  );
}

/**
 * @description: 设置userId
 */
const setUserId = (id: any) => {
  return window.localStorage.setItem('userId', id);
}

/**
 * @description: 获取userId
 */
const getUserId = () => {
  return window.localStorage.getItem('userId') || '';
}

/**
 * @description: 删除userId
 */
const removeUserId = () => {
  return window.localStorage.removeItem('userId');
}

/**
 * @description: 设置token
 */
const setToken = (token: string) => {
  return window.localStorage.setItem('Authorization', token);
}

/**
 * @description: 获取token
 */
const getToken = () => {
  return window.localStorage.getItem('Authorization') || '';
}

/**
 * @description: 删除token
 */
const removeToken = () => {
  return window.localStorage.removeItem('Authorization');
}



export {
  getCode,
  setUserId,
  getUserId,
  removeUserId,
  setToken,
  getToken,
  removeToken,
}