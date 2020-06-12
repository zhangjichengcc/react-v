/*
 * @Author: zhangjicheng
 * @Date: 2020-05-22 00:15:05
 * @LastEditTime: 2020-05-22 00:16:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wechat-v\src\utils\utils.ts
 */ 
// 获得url参数
const getUrlParam = (name: string) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`); // 构造一个含有目标参数的正则表达式对象
  const r = window.location.search.substr(1).match(reg); // 匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; // 返回参数值
};

export {
  getUrlParam,
}