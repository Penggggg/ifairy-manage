import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import './app.page.less'
import * as DMenu from 'antd/lib/menu/index.d';


const SubMenu = Menu.SubMenu;
const { Header, Content, Footer, Sider } = Layout;


export default class AppPage extends React.PureComponent< IProps, IState > {

    constructor( ) {
        super( );
        this.state = {
            collapsed: false,
            mode: 'inline'
        }
    }

    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
   }

   onSelect = ({ key }: DMenu.SelectParam ) => {
       this.props.router.push(`/${key}`)
   }

    render( ) {
        return <Layout className="app-page">
             <Sider collapsible  collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <div style={{ textAlign: 'center', padding: '30px 0 10px' }}>
                    <img src="/static/ifairy.jpg" alt="" style={{ width: '80px', height: '80px', borderRadius: '50%' }}/>
                </div>
                <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={['6']} onSelect={this.onSelect}>
                    <SubMenu key="sub1"
                        title={<span><Icon type="api" /><span className="nav-text">单品</span></span>}>
                        <Menu.Item key="product-list">单品列表</Menu.Item>
                        <Menu.Item key="product-new">新增单品</Menu.Item>
                    </SubMenu>
                    <SubMenu  key="sub2"
                        title={<span><Icon type="heart" /><span className="nav-text">仙女</span></span>}>
                        <Menu.Item key="fairy-list">仙女管理</Menu.Item>
                        <Menu.Item key="fairy-new">新增仙女</Menu.Item>
                    </SubMenu>
                    <SubMenu  key="sub3"
                        title={<span><Icon type="picture" /><span className="nav-text">专题</span></span>}>
                        <Menu.Item key="topic-list">专题列表</Menu.Item>
                        <Menu.Item key="topic-new">新增专题</Menu.Item>
                    </SubMenu>
                    <SubMenu  key="sub4"
                        title={<span><Icon type="star" /><span className="nav-text">排行榜</span></span>}>
                        <Menu.Item key="recommend-day">每日推荐</Menu.Item>
                        <Menu.Item key="top-fairy">最美仙女</Menu.Item>
                        <Menu.Item key="top-sale">爆款热销</Menu.Item>
                    </SubMenu>
                    <SubMenu  key="sub5"
                        title={<span><Icon type="appstore" /><span className="nav-text">分类</span></span>}>
                        <Menu.Item key="classify-list">分类列表</Menu.Item>
                        <Menu.Item key="classify-new">新增分类</Menu.Item>
                        <Menu.Item key="classify-recommend">分类互推</Menu.Item>
                    </SubMenu>
                    <SubMenu  key="sub6"
                        title={<span><Icon type="setting" /><span className="nav-text">系统配置</span></span>}>
                        <Menu.Item key="system-analys">数据分析</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout>
                <Content style={{ margin: '15px' }}>
                    <div className="app-content-block" style={{ padding: 24, background: '#fff', height: 580, borderRadius: '10px', overflow: 'scroll' }}>
                        { this.props.children }
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center', padding: '10px 50px' }}>
                    iFairy ©2017 Created by HeZhuoPeng
                </Footer>
            </Layout>
        </Layout>
    }
}

interface IState {
    collapsed: boolean
    mode: 'inline' | 'vertical'
}

interface IProps extends RouteComponentProps<{},{}> {

}