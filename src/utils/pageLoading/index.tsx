/*
 * @Author: zhangjicheng
 * @Date: 2019-12-23 15:47:06
 * @LastEditTime: 2020-05-20 11:14:44
 * @LastEditors: Please set LastEditors
 * @Description: 首页loading
 */
import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.less';

// 记录动画过程若存在则不重复执行
let timer: any = null;

// 全局loading
export default (key = false) => {
  const loadingPage = document.getElementById('pageLoading_page');
  if (key) {
    if(loadingPage) return;
    const loadingDom = document.createElement('dev');
    loadingDom.setAttribute('id', 'pageLoading_page');
    loadingDom.setAttribute('style', 'opacity: 1; transform: scale(1); transition: all ease .3s');
    const Dom: FC<{}> = () => (
      <div className={styles.pageLoading}>
        <div className={styles.ballContent}>
          <i /><i /><i />
        </div>
        <p>
          数据载入中
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </p>
      </div>
    );
    document.body.appendChild(loadingDom);
    ReactDOM.render(<Dom />, loadingDom);
  } else {
    if (!loadingPage || timer) return;
    loadingPage.setAttribute('style', 'opacity: 0; transform: scale(1.5); transition: all ease .3s');
    timer = setTimeout(() => {
      document.body.removeChild(loadingPage);
      clearTimeout(timer);
      timer = false;
    }, 300);
  }
};
