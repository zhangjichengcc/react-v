/*
 * @Author: 张吉成
 * @Date: 2020-03-26 18:08:36
 * @LastEditTime: 2020-05-30 17:16:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wechat-revenue-m\src\components\RenderInBody\index.js
 */

import { Component } from 'react';
import ReactDom from 'react-dom';

export default class RenderInBody extends Component<any, any> {

  static defaultProps = {
    children: null,
  };

  constructor(props: any) {
    super(props);
    this.state = {
      content: null,
    };
  }


  componentDidMount() {
    this.createDom();
  }

  componentWillReceiveProps(nextProps: { children: any; }) {
    const { children } = nextProps;
    this.renderLayer(children);
  }

  componentWillUnmount() {
    this.removeDom();
  }

  createDom = () => {
    const { children } = this.props;
    const content = document.createElement('div');
    content.setAttribute('style', 'width: 0; height: 0;')
    document.body.appendChild(content);
    this.setState({content}, () => {
      this.renderLayer(children)
    })
  }

  removeDom = () => {
    const { content } = this.state;
    if(content) document.body.removeChild(content);
  }

  renderLayer = (children: any) => {
    const { content } = this.state;
    if(content) ReactDom.render(children, content);
  }

  render() {
    return null;
  }
}
