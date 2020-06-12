/*
 * @Author: your name
 * @Date: 2020-05-21 22:30:44
 * @LastEditTime: 2020-05-25 17:38:54
 * @LastEditors: Please set LastEditors
 * @Description: 默认请求方法
 * @FilePath: \wechat-v\src\utils\request.ts
 */ 
/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { history } from 'umi';
import { getToken } from '@/utils/authorization';
import config from '../config';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    console.error(`Error message: 请求错误 ${status} url ${url}`);
    console.error(`Error description: ${errorText}`);
    if (status === 401) {
      history.replace({
        pathname: '/',
      })
    }
  } else if (!response) {
    console.error('您的网络发生异常，无法连接服务器');
  }
  throw response;
};

/**
 * @description: 配置request请求时的默认参数
 */
const request = extend({
  prefix: config.apiPrefix,
  credentials: 'include', // 默认请求是否带上cookie
  timeout: 60000,
  headers: {
    'Authorization': getToken(),
  },
  errorHandler, // 默认错误处理
});

/**
 * @description: 拦截器，处理返回response
 */
request.interceptors.response.use(async (response: Response) => {
  const data = await response.clone().json();
  const { code } = data;
  if (code === 0) {
    return response;
  } else {
    // const error = new Error();
    // error.name = 'serviceError';
    // error.message = data;
    // throw error;
    throw new Error();
  }
});

export default request;