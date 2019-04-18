import React from 'react';
import { Layout, Menu } from 'antd';
import {Link,Route,Switch,withRouter, Redirect} from 'react-router-dom'
import './layout.css';
import Report from '../Report/index'
import Station from '../Station/index'
import Uploads from '../Uploads/index'
import PlanTask from '../PlanTask/index'
import Resource from '../Resource/index'

const { Header, Sider, Content } = Layout;

@withRouter
class HomeLayout extends React.Component{
    state = {
        collapsed: false
    }
    toggle = () => {
      this.setState({
        collapsed: !this.state.collapsed
      });
    }
    render(){
      return(
         <div className="layout-wrap">
            <Layout>
              <Sider>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                  <Menu.Item key="1">
                    <Link to="/report">
                      <span className="icon iconfont icon-baogaoliebiao"></span>
                      <span>报告列表</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/station">
                      <span className="icon iconfont icon-gongcanshangchuan"></span>
                      <span>工参上传</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to="/uploads">
                      <span className="icon iconfont icon-mobanshangchuan"></span>
                      <span>报告模板上传</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <Link to="/plan">
                      <span className="icon iconfont icon-jihuarenwu"></span>
                      <span>计划任务</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="5">
                    <Link to="/resource">
                      <span className="icon iconfont icon-ziyuanwenjianshangchuan"></span>
                      <span>资源文件上传</span>
                    </Link>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout>
                <Header style={{ background: '#001529', padding: 0 }}></Header>
                <Content style={{ margin: '24px 16px', background: '#fff', }}>
                  <Switch>
                      <Route path="/report" component={Report} />
                      <Route path="/station" component={Station} />
                      <Route path="/uploads" component={Uploads} />
                      <Route path="/plan" component={PlanTask} />
                      <Route path="/resource" component={Resource} />
                      <Redirect exact from='/' to='/report'/>
                  </Switch>
                </Content>
              </Layout>
            </Layout>
         </div>
      );
    }
}

export default HomeLayout;