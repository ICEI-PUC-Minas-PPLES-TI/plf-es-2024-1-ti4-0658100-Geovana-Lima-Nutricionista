import { ReactNode, useState } from 'react';
import { Layout, Button } from 'antd';
import { Logo } from './Logo';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import theme from '../styles/theme';
import { CustomHeader } from './Header';

const { Header, Sider } = Layout;
import '../index.css';
import { MenuList } from './MenuList';



function SiderComponent() {
  const [collapsed, setCollapsed] = useState(false)

  return (
      <Layout style={{ backgroundColor: theme.primaryColor, width: '100vw', minHeight: '100vh' }}>
        <Sider 
          collapsed={collapsed}
          collapsible
          trigger={null}
          className='sidebar'
          style={{ backgroundColor: theme.primaryColor }}
        >
          <Logo />
          <MenuList />
        </Sider>
        <Layout>
          <Header style={{backgroundColor: theme.backgroundColor, padding: 0, borderRadius: '0 15px 15px 0'}}>
            {/* <CustomHeader /> */}
            <Button type='text'
              style={{color: theme.primaryColor}}
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
