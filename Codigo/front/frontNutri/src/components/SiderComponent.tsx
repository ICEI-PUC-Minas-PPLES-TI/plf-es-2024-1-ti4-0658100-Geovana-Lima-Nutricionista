import { ReactNode, useState } from "react";
import { Layout, Button } from "antd";
import { Logo } from "./Logo";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import "../index.css";
import { MenuList } from "./MenuList";
import styled from "styled-components";

const { Header, Sider, Content } = Layout;

const StyledLayout = styled(Layout)`
  width: 100%;
  min-height: 100vh;
`;

const StyledContent = styled(Content)`
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: calc(100vh - 48px);
  overflow-y: auto;
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
      >
        <div className="logo">
          <Logo />
        </div>
        <MenuList />
      </Sider>
      <Layout>
        <Header className="header">
          <Button
            type="text"
            className="toggle"
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
        </Header>
        <StyledContent>{children}</StyledContent>
      </Layout>
    </StyledLayout>
  );
}

export default SiderComponent;
