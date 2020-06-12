/*
 * @Author: your name
 * @Date: 2020-05-20 14:42:01
 * @LastEditTime: 2020-05-22 18:57:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wechat-v\src\pages\model\index.ts
 */ 
import { Reducer, Effect } from 'umi';
// import { CurrentUser, ListItemDataType } from './data.d';
// import { queryCurrent, queryFakeList } from './service';

export interface ModalState {
  // currentUser: Partial<CurrentUser>;
  // list: ListItemDataType[];
  matterList: any;
}

export interface ModelType {
  namespace: string;
  state: ModalState;
  // effects: {
  //   fetchCurrent: Effect;
  //   fetch: Effect;
  // };
  reducers: {
    saveMatterList: Reducer<any>;
  };
}

const Model: ModelType = {
  namespace: 'audioInteractive',
  state: {
    matterList: [],
  },

  // effects: {
  //   *fetch({ payload }, { call, put }) {
  //     const response = yield call(queryFakeList, payload);
  //     yield put({
  //       type: 'queryList',
  //       payload: Array.isArray(response) ? response : [],
  //     });
  //   },
  // },

  reducers: {
    saveMatterList(state: ModalState, action: any) {
      return {
        ...(state as ModalState),
        matterList: action.payload || [],
      };
    },
  },
};

export default Model;
