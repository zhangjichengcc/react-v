/*
 * @Author: zhangjicheng
 * @Date: 2020-05-19 16:15:05
 * @LastEditTime: 2020-06-15 10:29:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wechat-v\src\pages\Matter\index.tsx
 */ 

import React, { useEffect, useState } from 'react';
import { history, connect } from 'umi';
import { message } from 'antd';
import Ellipsis from '@/components/Ellipsis';
import pageLoading from '@/utils/pageLoading';
import { getMatterList } from '@/services/Matter';
import { getUserId } from '@/utils/authorization';
import styles from './index.less';

export default connect()((props: any) => {

  const { dispatch } = props;
  const [ matterList, setMatterList ] = useState<(Array<any>)>([]);
  const sxtype = {
    1: '基础核查',
    2: '风险调查'
  }
    
  // 生命周期
  useEffect(() => {
    fetchData();
  }, []);

  // 初始化获取数据
  const fetchData = () => {
    const userId = getUserId();
    // pageLoading(true);
    getMatterList({createby: userId}).then(res => {
      const { code, data = [] } = res;
      if (code === 0) {
        setMatterList(data);
        dispatch({
          type: 'audioInteractive/saveMatterList',
          payload: data,
        });
        pageLoading(false);
      } else {
        message.error('获取数据失败，请刷新重试！');
        pageLoading(false);
      }
    }).catch(() => {
      message.error('获取数据失败，请刷新重试！');
      pageLoading(false);
    })
  }

  // 跳转详情页
  const openView = (obj: any) => {
    const { messageId } = obj
    history.push({
      pathname: '/matterDetails',
      query: {
        id: messageId,
      }
    })
  }

  return (
    <div className={styles.view}>
      <div className={styles.card}>
        <div className={styles.title}>
          <span className={styles.title_text}>选择事项</span>
        </div>
        <div className={styles.sx_table}>
          <ul className={styles.sx_talbe_header}>
            <li>纳税人</li>
            <li>事项标签</li>
            <li>事项编号</li>
          </ul>
          <ul className={styles.sx_table_body}>
            {
              matterList.map((item, idx) => {
                const { nsrmc = '', sxbqlx = '', sxbh = '' } = item;
                const keys = `sx_${idx + 1}`;
                return (
                  <li key={keys} onClick={() => openView(item)}>
                    <div>
                      <span><Ellipsis tooltip lines={1}>{nsrmc}</Ellipsis></span>
                    </div>
                    <div><span>{sxtype[sxbqlx]}</span></div>
                    <div className={styles.sx_table_body_sxbh}>
                      <span><Ellipsis tooltip lines={1}>{sxbh}</Ellipsis></span>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
})
