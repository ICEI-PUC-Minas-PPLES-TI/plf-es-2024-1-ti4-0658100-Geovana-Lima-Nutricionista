import { ReactNode, useState } from 'react';
import { Layout, Button } from 'antd';
import { Logo } from './Logo';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import '../index.css';
import { MenuList } from './MenuList';

const { Header, Sider, Content } = Layout;
interface SiderComponentProps {
  children: ReactNode;
}

function SiderComponent({ children }: SiderComponentProps) {
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
          <Content style={{ margin: '24px 16px', padding: 24, background: '#F4EFEC', minHeight: 280 }}>
          {children}
        </Content>
        </Layout>
      </Layout>
  )
}

export default SiderComponent;
