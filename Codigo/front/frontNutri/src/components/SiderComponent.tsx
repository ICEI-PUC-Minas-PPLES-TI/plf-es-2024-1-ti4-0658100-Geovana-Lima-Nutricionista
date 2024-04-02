import { useState } from 'react';
import { Layout, Button } from 'antd';
import { Logo } from './Logo';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
const { Header, Sider } = Layout;
import '../index.css';
import { MenuList } from './MenuList';



function SiderComponent() {
  const [collapsed, setCollapsed] = useState(false)

  return (
      <Layout className='layout' style={{ width: '100vw', minHeight: '100vh' }}>
        <Sider 
          collapsed={collapsed}
          collapsible
          trigger={null}
          className='sidebar'
        >
          <Logo />
          <MenuList />
        </Sider>
        <Layout>
          <Header className="header" style={{ padding: 0, borderRadius: '0 15px 15px 0'}}>
            <Button type='text'
              className='toggle'
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? 
                <MenuUnfoldOutlined /> : 
                <MenuFoldOutlined />
              } 
            />
          </Header>
        </Layout>
      </Layout>
  )
}

export default SiderComponent;
