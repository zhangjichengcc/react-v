/*
 * @Author: your name
 * @Date: 2020-05-15 10:26:24
 * @LastEditTime: 2020-05-15 10:46:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wechat-v\src\app.ts
 */ 
const resizeFontSize = () => {
  //获取根元素
  const docEl = document.documentElement;
  //获取设备宽度
  const {clientWidth} = docEl;
  //若未获取到设备宽度，则终止函数执行
  if (!clientWidth) return ;
  //计算rem基础配置：设计图以750px为准时，px rem比例为1：100
  const fs= 100 * (clientWidth / 750);
  //为根元素字体赋值
  docEl.style.fontSize = `${fs}px`;
}

// window.onresize = resizeFontSize;
// window.onload = resizeFontSize;