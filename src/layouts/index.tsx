/*
 * @Author: your name
 * @Date: 2020-05-15 09:56:27
 * @LastEditTime: 2020-06-15 11:54:48
 * @LastEditors: Please set LastEditors
 * @Description: 参考https://www.jianshu.com/p/98fb143ac719
 * @FilePath: \wechat-v\src\layouts\index.tsx
 */ 
import React, { FC, useRef, useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './index.less';



const BasicLayout: React.FC = (props: any) => {
  const { children } = props;
  
  // 生命周期
  useEffect(() => {
    console.log('componentDidMount: 组件加载后')
    return () => {
      console.log('componentWillUnmount: 组件卸载， 做一些清理工作');
    }
  }, []);


  return (
    <TransitionGroup
      className={styles.router_wapper}
      childFactory={child => React.cloneElement(
        child,
      )}
    >
      <CSSTransition
        key={location.pathname}
        timeout={20000}
        classNames="page"
        unmountOnExit
      >
        <div className={styles.animate_page}>
          {children}
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default BasicLayout;
