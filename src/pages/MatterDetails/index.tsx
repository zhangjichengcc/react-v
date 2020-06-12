/*
 * @Author: zhangjicheng
 * @Date: 2020-05-14 11:46:01
 * @LastEditTime: 2020-05-25 17:24:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wechat-v\src\pages\index.tsx
 */ 
import React, { FC, useRef, useState, useEffect } from 'react';
import { Button, Modal, Upload, Radio, Input, message } from 'antd';
import { UploadOutlined, PlusOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import Ellipsis from '@/components/Ellipsis';
import Mask from '@/components/Mask';
import qyicon from '@/assets/svg/qy_icon.svg';
import pageLoading from '@/utils/pageLoading';
import { getMatterDetails, submitMatter, sphdUpload } from '@/services/Matter';
import { getUserId } from '@/utils/authorization';
import styles from './index.less';
import { connect, history } from 'umi';


const { TextArea } = Input;

// interface BasicListProps {
//   listAndbasicList: StateType;
//   dispatch: Dispatch<any>;
//   loading: boolean;
// }

// 图片转base64
const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// 事项标签类型转化
const sxtype = {
  1: '基础核查',
  2: '风险调查'
}

// 接收人身份类型转化
const jsrTypes = {
  1: '办税员',
  2: '法定代表人',
  3: '财务负责人',
  6: '购票员',
  10: '联络员',
}

const AudioInteractive = (props: any) => {
  const { location, matterList = [] } = props;
  const { id } = location.query;
  // 预览图片model
  const [previewVisible, setPreviewVisiable] = useState<boolean>(false);
  // 预览图片url
  const [previewUrl, setPreviewUrl] = useState<any>(null);
  // 截图图片列表
  const [cutPicFiles, setCutPicFiles] = useState<any>([]);
  // 上传文件列表
  const [uploadFiles, setUploadFiles] = useState<any>([]);
  // 编辑器内容
  const [editorValue, setEditorValue] = useState<string>('');
  // 当前事项
  const [matter, setMatter] = useState<any>({});
  // 事项详情
  const [matterDetails, setMatterDetails] = useState<any>({});
  // 事项列表
  const [matterListVisiable, setMatterListVisiable] = useState<boolean>(false);
  // 办结标志
  const [bjbz, setBjbz] = useState<string>('N');
  // 上传loading
  const [uploading, setUploading] = useState<boolean>(false);
  const uploadRef = useRef(null);

  // 生命周期 componentDidMount
  useEffect(() => {
    if(!matterList.length) history.goBack();
    initData();
    return () => {
      console.log('componentWillUnmount: 组件卸载， 做一些清理工作')
    }
  }, []);

  // 初始化数据
  const initData = () => {
    pageLoading(true);
    onMatterChange(id);
  }

  // 获取事项详情
  const fetchData = (id: string) => {
    const userId = getUserId();
    pageLoading(true);
    getMatterDetails({id, createby: userId}).then((res = {}) => {
      const { code, data } = res;
      pageLoading(false);
      setMatterListVisiable(false);
      if (code === 0) {
        setMatterDetails(data);
      } else {
        message.error('数据加载失败，请重试！');
      }
    }).catch(e => {
      message.error('数据加载失败，请重试！');
      pageLoading(false);
      setMatterListVisiable(false);
    })
  }

  // 切换事项
  const onMatterChange = (id: string) => {
    const newMatter = matterList.filter((item: { messageId: string; }) => item.messageId === id)[0] || {};
    setMatter(newMatter);
    fetchData(id);
  }

  // 图片预览
  const handlePreview = (e: any) => {
    const { url } = e;
    setPreviewUrl(url);
    setPreviewVisiable(true);
  }

  // 图片上传
  const onUploadPicFile = ({file = {}, fileList = []}: any) => {
    // 解决组件重复调用的问题
    if(!fileList.length || (file.uid !== [...fileList].pop().uid)) return;
    const proList = fileList.filter((item: { url: any; }) => item.url);
    const curList = fileList.filter((item: { url: any; }) => !item.url);
    const uploadPromise = (f: string | Blob) => {
      const formData = new FormData();
      formData.append('file', f);
      return sphdUpload(formData);
    }
    setUploading(true);
    const hide = message.loading('图片上传中...', 0);
    Promise.all([...curList].map(file => uploadPromise(file.originFileObj))).then(res => {
      const newCurList = [...curList].map((item: { size: any; originFileObj: any, uid: string }, idx: number) => {
        const { fileName: name, fileId, fileUrl: url1 } = res[idx].data || {};
        const { size, originFileObj, uid } = item;
        return {
          name,
          fileId,
          url1,
          size,
          wjlx: 'sphd03', // 税务人反馈的截图
          status: 'done',
          uid,
          originFileObj,
        }
      })
      Promise.all(newCurList.map((item: { originFileObj: any; }) => getBase64(item.originFileObj))).then(res => {
        const newList = newCurList.map((file: any, idx: number) => ({...file, url: res[idx]}));
        const resList = [...proList, ...newList]
        setCutPicFiles(resList);
        setUploading(false);
        hide();
        message.success('图片上传成功！');
      })
    }).catch(() => {
      setUploading(false);
      hide();
      message.error('文件上传失败，请重试');
    })
    
  }

  // 删除图片
  const onRemovePicFile = (file: any) => {
    const newFiles = cutPicFiles.filter((item: { fileId: any; }) => item.fileId !== file.fileId);
    setCutPicFiles(newFiles);
  }

  // 文件上传
  const onUploadFile = (e: any) => {
    const { files } = e.target;
    const uploadPromise = (f: string | Blob) => {
      const formData = new FormData();
      formData.append('file', f);
      return sphdUpload(formData);
    }
    setUploading(true);
    const hide = message.loading('文件上传中...', 0);
    Promise.all([...files].map(file => uploadPromise(file))).then(res => {
      const resList = [...files].map((item: { size: any; }, idx: number) => {
        const { fileName: name, fileId, fileUrl: url1 } = res[idx].data || {};
        const { size } = item;
        return {
          name,
          fileId,
          url1,
          size,
          wjlx: 'sphd01', // 税务人反馈的文件
          status: 'done',
          uid: fileId,
        }
      })
      const newFiles = [...uploadFiles, ...resList];
      setUploadFiles(newFiles);
      setUploading(false);
      hide();
      message.success('文件上传完成');
    }).catch(() => {
      setUploading(false);
      hide();
      message.error('文件上传失败，请重试');
    })
  }

  // 删除文件
  const onRemoveFile = (file: any) => {
    const newFiles = uploadFiles.filter((item: { fileId: string; }) => item.fileId !== file.fileId);
    setUploadFiles(newFiles);
  }

  // 提交事项
  const submit = () => {
    const { messageId } = matter;
    const attachs = [...cutPicFiles, ...uploadFiles].map((file: {name: string, fileId: string, url1: string, size: number | string, wjlx: string}) => {
      const { name = '', fileId = '', url1 = '', size = 0, wjlx = '' } = file;
      return { name, fileId, url1, size, wjlx, messageId };
    })
    const params = {
      msgId: messageId,
      bjzt: bjbz === 'Y' ? '1' : '0',
      nodeDesc: editorValue,
      attachs,
    }
    const hide = message.loading('数据提交中，请稍后...', 0);
    setUploading(true);
    submitMatter(params).then(res => {
      hide();
      message.success('提交成功');
      setUploading(false);
    }).catch(() => {
      hide();
      message.error('提交失败，请重试。');
      setUploading(false);
    })
  }

  // 编辑器
  const setEdit = (e: any) => {
    const { value } = e.target;
    setEditorValue(value);
  }

  const SxTitle: FC<{
    nsrmc: React.ReactNode;
    sxbq: React.ReactNode;
    sxnum: string;
  }> = ({ nsrmc, sxbq, sxnum }) => (
    <div className={styles.sx_table}>
      <span className={styles.sx_talbe_btn} onClick={() => setMatterListVisiable(!matterListVisiable)}>
        {matterListVisiable ? <>收起<UpOutlined /></> : <>展开<DownOutlined /></>}
      </span>
      <ul className={styles.sx_talbe_header}>
        <li>纳税人</li>
        <li>事项标签</li>
        <li>事项编号</li>
      </ul>
      <ul className={styles.sx_table_body}>
        <li>
          <span><Ellipsis tooltip lines={1}>{nsrmc}</Ellipsis></span>
        </li>
        <li><span>{sxbq}</span></li>
        <li className={styles.sx_table_body_sxbh}>
          <span><Ellipsis tooltip lines={1}>{sxnum}</Ellipsis></span>
        </li>
      </ul>
    </div>
  );

  const { nsrsbh = '', jsrType = '', jsrName, lcXbrJlDTOList = [] } = matterDetails;

  return (
    <div className={styles.view}>
      <input type="file" style={{display: 'none'}} multiple ref={uploadRef} accept="image/*,application/pdf,application/msword,application/vnd.ms-excel" onChange={onUploadFile} />
      <div className={styles.card}>
        <div className={styles.title}>
          <span className={styles.title_text}>选择事项</span>
        </div>
        <div className={classnames(styles.matter_list, matterListVisiable ? styles.active : '')} style={{marginTop: 24}}>
          <ul className={styles.matter_list_body}>
            {
              matterList.map((item: { nsrmc?: "" | undefined; sxbqlx?: "" | undefined; sxbh?: "" | undefined; messageId: string }, idx: number) => {
                const { nsrmc = '', sxbqlx = '', sxbh = '', messageId } = item || {};
                const keys = `sx_${idx + 1}`;
                return (
                  <li key={keys} onClick={() => onMatterChange(messageId)}>
                    <div>
                      <span><Ellipsis tooltip lines={1}>{nsrmc}</Ellipsis></span>
                    </div>
                    <div><span>{sxtype[sxbqlx]}</span></div>
                    <div className={styles.matter_list_body_sxbh}>
                      <span><Ellipsis tooltip lines={1}>{sxbh}</Ellipsis></span>
                      <Radio checked={messageId === matter['messageId']} />
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <SxTitle nsrmc={matter.nsrmc} sxbq={sxtype[matter.sxbqlx]} sxnum={matter.sxbh} />
      </div>
      <div className={styles.card}>
        <div className={styles.title}>
          <span className={styles.title_icon} style={{backgroundImage: `url(${qyicon})`}} />
          <span className={styles.title_text} style={{flex: 1}}>
            <Ellipsis tooltip lines={1}>{matter.nsrmc}</Ellipsis>
          </span>
          {/* <Button className={styles.title_btn} type="primary">结束会话</Button> */}
        </div>
        <div className={styles.msg_body}>
          <div>
            <span>统一社会信用代码</span>
            <span>{nsrsbh}</span>
          </div>
          <div>
            <span>接收人</span>
            <span>{jsrTypes[jsrType]}-{jsrName}</span>
          </div>
          <div className={styles.xbr_row}>
            <span>协办人</span>
            <span className={styles.xbr_row_item}>
              {
                lcXbrJlDTOList.map((item: { username?: string; deptName?: string; }, idx: any) => {
                  const { username = '', deptName = '' } = item;
                  const xbrStr = `${deptName ? `${deptName}-${username}` : username}`;
                  return <span key={`xbr_${idx + 1}`}>{xbrStr}</span>
                })
              }
            </span>
          </div>
        </div>
      </div>
      <div className={styles.card} style={{borderBottom: 0}}>
        <div className={styles.title} style={{justifyContent: 'left', alignItems: 'baseline'}}>
          <span className={styles.title_text}>视频通话截图</span>
          {/* <Button className={styles.title_btn} style={{marginLeft: 10}} onClick={cutPicture}>截取当前页</Button> */}
        </div>
        <div className={styles.cut_pic_content}>
          <Upload
            multiple
            listType="picture-card"
            accept="image/*"
            beforeUpload={() => false}
            customRequest={(e) => e}
            onChange={onUploadPicFile}
            fileList={cutPicFiles}
            onPreview={handlePreview}
            onRemove={onRemovePicFile}
          >
            <PlusOutlined />
          </Upload>
        </div>
        <div className={styles.title} style={{marginTop: 10}}>
          <span className={styles.title_text} style={{flex: 'none', marginRight: '10px'}}>纳税人报送文件</span>
          <Button className={styles.title_btn} icon={<UploadOutlined />} onClick={() => {
            const upload: any = uploadRef.current;
            upload.click();
          }}>上传文件</Button>
          <span style={{color: '#999', fontSize: 12, paddingLeft: 8, lineHeight: '14px', wordBreak: 'break-all'}}>支持上传图片/word/excel/pdf文件大小不超过10M</span>
        </div>
        <div className={styles.files_content}>
          {
            uploadFiles.length ? 
            <Upload
              onRemove={onRemoveFile}
              fileList={uploadFiles}
            /> :
            <span className={styles.defFile}>暂无上传文件</span>
          }
        </div>
        <div className={styles.title} style={{justifyContent: 'left', alignItems: 'baseline', marginTop: 10}}>
          <span className={styles.title_text}>处理意见</span>
          <span onClick={() => setBjbz('Y')} className={classnames(styles.title_btn_radio, bjbz === 'Y' ? styles.active : '')} style={{marginLeft: 10}}>办结</span>
          <span onClick={() => setBjbz('N')} className={classnames(styles.title_btn_radio, bjbz === 'N' ? styles.active : '')} style={{marginLeft: 8}}>未办结</span>
        </div>
        <div className={styles.reson_content}>
          <TextArea
            placeholder="请输入原因"
            autoSize={{ minRows: 1, maxRows: 3 }}
            onChange={setEdit}
          />
          <Button className={styles.title_btn} onClick={submit} style={{padding: '0 54px', lineHeight: '32px', height: '32px', marginLeft: '16px'}} type="primary">提交</Button>
        </div>
      </div>
      <Modal
        visible={previewVisible}
        title={null}
        footer={null}
        width="90%"
        onCancel={() => setPreviewVisiable(false)}
        bodyStyle={{padding: 5}}
      >
        <img alt="example" style={{width: '100%'}} src={previewUrl} />
      </Modal>
      <Mask visiable={uploading} />
    </div>
  );
}

export default connect(
  ({
    audioInteractive,
  }: {
    audioInteractive: any;
  }) => ({
    matterList: audioInteractive.matterList,
  }),
)(AudioInteractive)
