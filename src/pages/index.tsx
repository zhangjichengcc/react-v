/*
 * @Author: zhangjicheng
 * @Date: 2020-05-14 11:46:01
 * @LastEditTime: 2020-05-25 09:37:47
 * @LastEditors: Please set LastEditors
 * @Description: 默认登陆加载页面
 * @FilePath: \wechat-v\src\pages\index.tsx
 */ 
import React, { useEffect } from 'react';

const HomePage = () => {
  
  // 生命周期
  useEffect(() => {
    console.log('componentDidMount: 组件加载后')
    return () => {
      console.log('componentWillUnmount: 组件卸载， 做一些清理工作')
    }
  }, []);

  return (
    <div>
      <h2>home page</h2>
    </div>
  );
}

export default HomePage;
