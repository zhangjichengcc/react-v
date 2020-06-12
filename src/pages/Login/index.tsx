/*
 * @Author: zhangjicheng
 * @Date: 2020-05-14 11:46:01
 * @LastEditTime: 2020-06-12 15:45:57
 * @LastEditors: Please set LastEditors
 * @Description: 默认登陆加载页面
 * @FilePath: \wechat-v\src\pages\index.tsx
 */ 
import React, { FC, useRef, useState, useEffect } from 'react';
import { CopyrightOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';
import RouteAnimate from '@/components/RouteAnimate';
import { message } from 'antd';
import { history } from 'umi';
import { getUrlParam } from '@/utils/utils';
// import { getClientToken } from '@/services/login';
// import config from '@/config';
import { setToken, setUserId, getCode } from '@/utils/authorization';
import styles from './index.less';


// interface BasicListProps {
//   listAndbasicList: StateType;
//   dispatch: Dispatch<any>;
//   loading: boolean;
// }

const Login = (props: any) => {
  
  // 生命周期
  useEffect(() => {
    initData();
    console.log('componentDidMount: 组件加载后')
    return () => {
      console.log('componentWillUnmount: 组件卸载， 做一些清理工作')
    }
  }, []);


  const initData = () => {
    const code = getUrlParam('code') || false;
    // 已消费code不再请求初始化接口
    if (code) {
      // initUserInfo();
      console.log(code)
      doLogin();
    } else {
      // 若无code,则调用微信授权获取code
      // getCode();
    }

  }

  // for debug
  const getUserId = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('liwenbin');
      }, 100000)
    })
  }

  // 开始调用登陆接口
  const doLogin = () => {
    Promise.all([getUserId()]).then(res => {
      // const [res1, res2] = res;
      // const { code, data } = res1;
      // const userId = res2;
      // if (code === 0) {
      //   const { client_token } = data;
      //   setToken(client_token);
      //   setUserId(userId);
      //   history.push('/matterList');
      // } else {
      //   message.error('登陆失败，请重试！');
      // }
    })
  }

  const BgSquare: FC<{style: any}> = (props) => {
    const data = [];
    for (let i = 0; i < 12; i += 1) {
      const item = [];
      for(let j = 0; j < 12; j += 1) {
        item.push({});
      }
      data.push(item);
    }
    return (
      <ul className={styles.view_bg_3} { ...props } >
        { data.map((item, idx) => (
          <li key={`${idx + 1}`}>
            {item.map((_items, idxs) => (
              <span key={`${idx + 1}_${idxs + 1}`} />
            ))}
          </li>
        )) }
      </ul>
    )
  }

  const openView = () => {
    history.push('/matterList');
  }

  return (
    <RouteAnimate>
      <div className={styles.view}>
        <div className={styles.view_bg}>
          <div className={styles.view_bg_1}>@</div>
          <div className={styles.view_bg_2} />
          <BgSquare style={{left: '7vw', top: '25vh'}} />
          <BgSquare style={{right: '7vw', bottom: '25vh'}} />
        </div>
        <div className={styles.view_content}>
          <span className={styles.banner_title} onClick={openView}>@深税</span>
          <span className={styles.text_title}>视频互动平台</span>
          <div className={styles.loading_box}>
            <div className={styles.loaderInner}><i /><i /><i /></div>
            <span className={styles.text}>身份认证中...</span>
          </div>
          <span className={styles.copyright}>Copyright <CopyrightOutlined />2020 veigar</span>
        </div>
      </div>
    </RouteAnimate>
  );
}

export default Login;
