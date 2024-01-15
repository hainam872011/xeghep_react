import {
  BarChartOutlined, HistoryOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined, UnorderedListOutlined,
} from '@ant-design/icons';
import {Button, Layout, Menu, theme} from 'antd';
import {useState} from 'react';
import Logo from '../../src/assets/images/Logo_TTK.png'
import BackgroundBottom from '../../src/assets/images/bg_bot.jpeg'
import {Footer} from "antd/es/layout/layout";

const {Header, Sider, Content} = Layout;
const MenuLayout = ({children}) => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: {colorBgContainer},
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Header>
        <div className="logo">
          <img src={Logo} style={{width: "60px", height: "40px"}}/>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={[
          {
            key: 'list',
            icon: <UnorderedListOutlined />,
            label: (<a href="/list">Danh sách</a>),
          },
          {
            key: 'history',
            icon: <HistoryOutlined />,
            label: (<a href="/history">Lịch sử</a>),
          },
        ]}
        />
      </Header>
      <Content
        style={{
          // padding: '0 50px',
        }}
      >
        {/*<Breadcrumb*/}
        {/*  style={{*/}
        {/*    margin: '16px 0',*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
        {/*  <Breadcrumb.Item>List</Breadcrumb.Item>*/}
        {/*  <Breadcrumb.Item>App</Breadcrumb.Item>*/}
        {/*</Breadcrumb>*/}
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer
        style={{textAlign: 'center'}}
      >
        Xeghephaiduong ©2023 Created by HN
      </Footer>
    </Layout>
  );
};
export default MenuLayout;
