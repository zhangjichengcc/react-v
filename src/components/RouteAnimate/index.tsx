import React, { FC, useRef, useState, useEffect } from 'react';
import { CopyrightOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { message } from 'antd';
import { history } from 'umi';
import { getUrlParam } from '@/utils/utils';
// import { getClientToken } from '@/services/login';
// import config from '@/config';
import { setToken, setUserId, getCode } from '@/utils/authorization';
import styles from './index.less';

const RouteAnimate = (props: { children: any; }) => {
  const { children } = props;
  const [animate, setAnimate] = useState<boolean>(false);

  // 生命周期
  useEffect(() => {
    setAnimate(true);
    return () => {
      setAnimate(false);
    }
  }, []);

  return (
    <TransitionGroup className={styles.router_wapper}>
      <CSSTransition
        key={location.pathname}
        timeout={10000}
        classNames="page"
        // unmountOnExit
      >
        <div className={styles.animate_page}>
          {children}
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default RouteAnimate;