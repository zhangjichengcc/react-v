/*
 * @Author: zhangjicheng
 * @Date: 2020-03-26 18:08:36
 * @LastEditTime: 2020-05-30 14:53:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wechat-revenue-m\src\components\RenderInBody\index.js
 */


import React, { FC, useState, useEffect } from 'react';
import RenderInBody from '@/components/RenderInBody';
import styles from './index.less';

interface markProps {
  onClick?: VoidFunction,
  visiable: boolean,
  color?: string,
}

const Mark: FC<markProps> = (props) => {
  const [display, setDisplay] = useState<string>('none');
  const { onClick, visiable = false, color = 'rgba(0, 0, 0, 0.5)' } = props;
  const opacity = visiable ? 1 : 0;
  useEffect(() => {
    if(!visiable) {
      setTimeout(() => {
        setDisplay('none')
      }, 300)
    } else {
      setDisplay('block')
    }
  }, [visiable]);
  
  
  return (
    <RenderInBody>
      <div
        className={styles.mark}
        style={{backgroundColor: color, opacity, display}}
        onClick={() => {if(onClick) onClick()}}
      />
    </RenderInBody>
  )
}

export default Mark;