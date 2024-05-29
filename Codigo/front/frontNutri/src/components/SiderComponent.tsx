import { ReactNode, useEffect, useState } from "react";
import { Layout, Button, Badge, Drawer, notification } from "antd";
import { Logo } from "./Logo";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "../index.css";
import { MenuList } from "./MenuList";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  deleteNotification,
  getNotifications,
} from "../services/notification.service";
import { Notification } from "../interfaces/notification";
import { MdDeleteOutline } from "react-icons/md";

const { Header, Sider, Content } = Layout;

const StyledLayout = styled(Layout)`
  width: 100%;
  min-height: 100vh;
  position: fixed;
  max-height: 100vh;
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
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const loadNotifications = async () => {
      const { data, error } = await getNotifications();

      if (data) {
        setNotifications(data);
      }
      if (error) {
        notification.error({
          message: "Erro ao carregar notificações!",
        });
      }
    };
    loadNotifications();
  }, []);

  const deleteNotificationButton = async (id: number) => {
    await deleteNotification(id);
    setNotifications(
      notifications.filter(notification => notification.id !== id)
    );
};

  const toggleNotifications = () => {
    setNotificationsVisible(!notificationsVisible);
  };

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
              style={{ marginLeft: "16px" }}
            />
            <div>
              <Button
                type="text"
                icon={<SearchOutlined />}
                style={{
                  fontSize: "16px",
                  marginRight: "16px",
                  backgroundColor: "#cb6cec",
                  borderRadius: "30px",
                  boxShadow: "0 2px 4px",
                }}
              />
              <Button
                type="text"
                icon={
                  <Badge count={notifications.length}>
                    <BellOutlined />
                  </Badge>
                }
                style={{
                  fontSize: "16px",
                  backgroundColor: "#cb6cec",
                  borderRadius: "30px",
                  boxShadow: "0 2px 4px",
                }}
                onClick={toggleNotifications}
              />
            </div>
          </HeaderContent>
        </Header>
        <StyledContent>{children}</StyledContent>
      </Layout>
      <Drawer
        title="Notificações"
        placement="right"
        closable={true}
        onClose={toggleNotifications}
        open={notificationsVisible}
      >
        {notifications.map((consultation, index) => (
          <div key={index} style={{ marginBottom: "16px" }}>
            <h3>{consultation.title}</h3>
            <p>{consultation.description}</p>
            <p>
              <strong>
                {consultation.patient && (
                  <Link to={`/patients/${consultation.patient.id}`}>
                    {consultation.patient.name}
                  </Link>
                )}
              </strong>
            </p>
            <p>
              <Button icon={<MdDeleteOutline />} onClick={() => deleteNotificationButton(consultation.id)}></Button>
            </p>
          </div>
        ))}
      </Drawer>
    </StyledLayout>
  );
}

export default SiderComponent;
