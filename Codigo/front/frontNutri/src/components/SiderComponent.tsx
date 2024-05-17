import { ReactNode, useState } from "react";
import { Layout, Button } from "antd";
import { Logo } from "./Logo";
import { MenuFoldOutlined, MenuUnfoldOutlined, BellOutlined, SearchOutlined } from "@ant-design/icons";
import "../index.css";
import { MenuList } from "./MenuList";
import styled from "styled-components";

const { Header, Sider, Content } = Layout;

const StyledLayout = styled(Layout)`
  width: 100%;
  min-height: 100vh;
  position: fixed;
  max-height: 100vh;
  }
`;

const StyledContent = styled(Content)`
  margin: 24px 16px;
  padding: 24px;
  min-height: calc(100vh - 48px);
  overflow-y: auto;

  @media (max-width: 992px) {
    margin-top: 0;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface SiderComponentProps {
  children: ReactNode;
}

function SiderComponent({ children }: SiderComponentProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <StyledLayout>
      <Sider
        className="sideBar"
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={(collapsed) => setCollapsed(collapsed)}
      >
        <div className="logo">
          <Logo />
        </div>
        <MenuList />
      </Sider>
      <Layout>
        <Header className="header">
          <HeaderContent>
            <Button
              type="text"
              className="toggle"
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              style={{ marginLeft: '16px' }}
            />
            <div>
              <Button
                type="text"
                icon={<SearchOutlined />}
                style={{ fontSize: '16px', marginRight: '16px', backgroundColor: '#cb6cec', borderRadius: '30px', boxShadow: '0 2px 4px' }}
              />
              <Button
                type="text"
                icon={<BellOutlined />}
                style={{ fontSize: '16px', backgroundColor: '#cb6cec', borderRadius: '30px', boxShadow: '0 2px 4px' }}
              />
            </div>
          </HeaderContent>
        </Header>
        <StyledContent>{children}</StyledContent>
      </Layout>
    </StyledLayout>
  );
}

export default SiderComponent;
