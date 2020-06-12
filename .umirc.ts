/*
 * @Author: your name
 * @Date: 2020-05-14 11:46:01
 * @LastEditTime: 2020-06-11 16:53:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wechat-v\.umirc.ts
 */ 
import { defineConfig } from 'umi';
import routerConfig from './config/router';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/api/v1': {
      target: 'http://192.168.10.157:8020/', // 预生产
      changeOrigin: true,
      router: {
        '/api/v1/sqhd/sphd': "http://192.168.10.157:8020",
      },
    },
  },
  // treeShaking: true,
  routes: routerConfig,
});
