/*
 * @Author: your name
 * @Date: 2020-05-21 23:33:14
 * @LastEditTime: 2020-05-25 20:21:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wechat-v\src\services\Matter.ts
 */ 
import request from '@/utils/request';

// 获取事项列表
export async function getMatterList(params: {createby: string}) {
  return request('/sqhd/sphdzjyy/getMatterList', {
    method: 'get',
    params,
  })
}

// 获取事项详情
export async function getMatterDetails(params: {id: string, createby: string}) {
  return request('/sqhd/sphdzjyy/getMatterInfo', {
    method: 'get',
    params,
  })
}

// 上传附件
export async function sphdUpload(file: any) {
  return request('/sqhd/sphdzjyy/sphdUpload', {
    method: 'post',
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // },
    data: file,
  })
}

// 提交意见
interface SubmitMatterProps {
  msgId: string,
  bjzt: string, // 1: 已办结 0: 未办结
  nodeDesc: string,
  attachs: Array<{
    messageId: string,
    fileId: string,
    name: string,
    size: number | string,
    url1: string,
    wjlx: string, // sphd01: 税务人的反馈报送文件；sphd02: 纳税人的反馈报送文件；sphd03: 税务人的截图
  }>
}
export async function submitMatter(data: SubmitMatterProps) {
  return request('/sqhd/sphdzjyy/submission', {
    method: 'post',
    data: {
      isNsr: false,
      ...data,
    },
  })
}
